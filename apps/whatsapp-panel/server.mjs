import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import makeWASocket, { DisconnectReason, useMultiFileAuthState } from '@whiskeysockets/baileys';
import pino from 'pino';
import QRCode from 'qrcode';
import {
  SESSION_TTL_MS,
  SESSION_COOKIE,
  clearSessionCookie,
  constantTimeStringEqual,
  createSessionToken,
  makeSessionCookie,
  readCookie,
  verifySessionToken,
} from './auth.mjs';

const APP_DIR = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const HOST = '0.0.0.0';
const PRODUCTION = process.env.NODE_ENV === 'production';
const PANEL_PASSWORD = process.env.PANEL_PASSWORD || '';
const AUTH_DIR = path.resolve(process.env.BAILEYS_AUTH_DIR || path.join(APP_DIR, '.baileys-auth'));
const QR_WINDOW_MS = 120_000;
const LOGIN_WINDOW_MS = 15 * 60_000;
const LOGIN_MAX_FAILURES = 8;
const PAIR_WINDOW_MS = 60 * 60_000;
const PAIR_MAX_STARTS = 5;

if (!PANEL_PASSWORD || (PRODUCTION && Buffer.byteLength(PANEL_PASSWORD, 'utf8') < 20)) {
  throw new Error('Configure PANEL_PASSWORD; production values must contain at least 20 bytes.');
}
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error('PORT must be a valid TCP port.');
}

const BASE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  Pragma: 'no-cache',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'; object-src 'none'",
  ...(PRODUCTION ? { 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains' } : {}),
};

const ASSET_FILES = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/app.js': ['app.js', 'text/javascript; charset=utf-8'],
  '/style.css': ['style.css', 'text/css; charset=utf-8'],
};
const ASSETS = new Map();
for (const [urlPath, [fileName, contentType]] of Object.entries(ASSET_FILES)) {
  ASSETS.set(urlPath, {
    body: await readFile(path.join(APP_DIR, 'public', fileName)),
    contentType,
  });
}

const state = {
  status: 'Desconectado. Gere um QR temporário quando quiser.',
  connected: false,
  qrSvg: null,
  qrExpiresAt: null,
  updatedAt: new Date().toISOString(),
};
const loginFailures = new Map();
const qrStarts = new Map();
const revokedSessions = new Map();

let socket;
let socketGeneration = 0;
let socketStarting = false;
let reconnectEnabled = false;
let reconnectTimer;
let pairingActive = false;
let pairingDeadline = 0;
let pairingTimer;

function updateState(patch) {
  Object.assign(state, patch, { updatedAt: new Date().toISOString() });
}

function send(res, statusCode, body = '', contentType = 'text/plain; charset=utf-8', extraHeaders = {}) {
  res.writeHead(statusCode, {
    ...BASE_HEADERS,
    'Content-Type': contentType,
    ...extraHeaders,
  });
  res.end(body);
}

function sendJson(res, statusCode, value, extraHeaders = {}) {
  send(res, statusCode, JSON.stringify(value), 'application/json; charset=utf-8', extraHeaders);
}

function trustedOrigin(req) {
  const originHeader = req.headers.origin;
  const hostHeader = req.headers.host;
  if (!originHeader || !hostHeader) return false;
  try {
    const origin = new URL(originHeader);
    return origin.host.toLowerCase() === hostHeader.toLowerCase()
      && (origin.protocol === 'https:' || origin.protocol === 'http:');
  } catch {
    return false;
  }
}

function secureCookie() {
  return PRODUCTION || process.env.COOKIE_SECURE === 'true';
}

function authenticated(req) {
  const token = readCookie(req.headers.cookie || '', SESSION_COOKIE);
  if (!verifySessionToken(token, PANEL_PASSWORD)) return false;
  const fingerprint = createHash('sha256').update(token, 'utf8').digest('hex');
  const revokedUntil = revokedSessions.get(fingerprint);
  if (!revokedUntil) return true;
  if (revokedUntil <= Date.now()) {
    revokedSessions.delete(fingerprint);
    return true;
  }
  return false;
}

function revokeSession(token) {
  if (!verifySessionToken(token, PANEL_PASSWORD)) return;
  const now = Date.now();
  for (const [fingerprint, expiresAt] of revokedSessions) {
    if (expiresAt <= now) revokedSessions.delete(fingerprint);
  }
  const fingerprint = createHash('sha256').update(token, 'utf8').digest('hex');
  revokedSessions.set(fingerprint, now + SESSION_TTL_MS);
}

function clientKey(req) {
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimited(map, key, maxCount, windowMs) {
  const now = Date.now();
  let entry = map.get(key);
  if (!entry || now - entry.startedAt >= windowMs) {
    entry = { startedAt: now, count: 0 };
    map.set(key, entry);
  }
  if (entry.count >= maxCount) return true;
  entry.count += 1;
  return false;
}

async function readJson(req) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > 4096) {
      const error = new Error('Request body too large.');
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  if (total === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('Invalid JSON.');
    error.statusCode = 400;
    throw error;
  }
}

function currentQrAvailable() {
  return Boolean(state.qrSvg && state.qrExpiresAt && Date.now() < pairingDeadline && pairingActive);
}

function clearPairingTimer() {
  if (pairingTimer) clearTimeout(pairingTimer);
  pairingTimer = undefined;
}

function stopCurrentSocket(reason) {
  const oldSocket = socket;
  socket = undefined;
  socketGeneration += 1;
  socketStarting = false;
  if (oldSocket) {
    try {
      oldSocket.end(new Error(reason));
    } catch {
      // The service is already ending; no credentials or QR payloads are logged.
    }
  }
}

function scheduleReconnect() {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = undefined;
    void openSocket();
  }, 1500);
  reconnectTimer.unref?.();
}

async function handleConnectionUpdate(update, generation) {
  if (generation !== socketGeneration) return;
  const { connection, lastDisconnect, qr } = update;

  if (qr) {
    if (pairingActive && Date.now() < pairingDeadline) {
      try {
        const svg = await QRCode.toString(qr, {
          type: 'svg',
          margin: 2,
          width: 360,
          errorCorrectionLevel: 'M',
        });
        if (generation === socketGeneration && pairingActive && Date.now() < pairingDeadline) {
          updateState({
            qrSvg: svg,
            status: 'QR temporário pronto. Escaneie-o no WhatsApp do celular.',
          });
        }
      } catch {
        updateState({ qrSvg: null, status: 'Não foi possível preparar o QR. Tente gerar outro.' });
      }
    }
  }

  if (connection === 'connecting') {
    updateState({
      status: pairingActive ? 'A preparar o QR temporário…' : 'A reconectar a sessão WhatsApp…',
    });
  }

  if (connection === 'open') {
    reconnectEnabled = true;
    pairingActive = false;
    pairingDeadline = 0;
    clearPairingTimer();
    if (reconnectTimer) clearTimeout(reconnectTimer);
    reconnectTimer = undefined;
    updateState({
      connected: true,
      qrSvg: null,
      qrExpiresAt: null,
      status: 'WhatsApp conectado.',
    });
    console.log('whatsapp:connected');
  }

  if (connection === 'close') {
    const code = lastDisconnect?.error?.output?.statusCode;
    const loggedOut = code === DisconnectReason.loggedOut;
    socket = undefined;
    socketStarting = false;
    updateState({ connected: false, qrSvg: null, qrExpiresAt: null });

    if (loggedOut) {
      reconnectEnabled = false;
      pairingActive = false;
      pairingDeadline = 0;
      clearPairingTimer();
      updateState({ status: 'Sessão terminada no WhatsApp. Gere um novo QR para vincular novamente.' });
      return;
    }

    if ((pairingActive && Date.now() < pairingDeadline) || reconnectEnabled) {
      updateState({ status: pairingActive ? 'A renovar o QR temporário…' : 'Ligação interrompida; a reconectar…' });
      scheduleReconnect();
    } else {
      updateState({ status: 'Desconectado. Gere um QR temporário quando quiser.' });
    }
  }
}

async function openSocket() {
  if (socket || socketStarting) return;
  socketStarting = true;
  const generation = ++socketGeneration;
  try {
    await mkdir(AUTH_DIR, { recursive: true, mode: 0o700 });
    const { state: authState, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    if (generation !== socketGeneration) return;

    const newSocket = makeWASocket({
      auth: authState,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false,
      markOnlineOnConnect: false,
      syncFullHistory: false,
    });
    socket = newSocket;
    newSocket.ev.on('creds.update', saveCreds);
    newSocket.ev.on('connection.update', (update) => {
      void handleConnectionUpdate(update, generation);
    });
  } catch (error) {
    if (generation === socketGeneration) {
      updateState({
        connected: false,
        qrSvg: null,
        qrExpiresAt: null,
        status: 'Falha ao iniciar a ligação WhatsApp. Tente novamente mais tarde.',
      });
      console.error('baileys:start-failed', error?.name || 'Error');
    }
  } finally {
    socketStarting = false;
  }
}

async function startPairing() {
  if (state.connected) return 'already-connected';
  if (pairingActive && Date.now() < pairingDeadline) return 'already-active';

  if (reconnectTimer) clearTimeout(reconnectTimer);
  reconnectTimer = undefined;
  reconnectEnabled = false;
  pairingActive = true;
  pairingDeadline = Date.now() + QR_WINDOW_MS;
  updateState({
    connected: false,
    qrSvg: null,
    qrExpiresAt: new Date(pairingDeadline).toISOString(),
    status: 'A preparar o QR temporário…',
  });
  clearPairingTimer();
  pairingTimer = setTimeout(() => {
    pairingActive = false;
    pairingDeadline = 0;
    stopCurrentSocket('QR window expired');
    updateState({
      connected: false,
      qrSvg: null,
      qrExpiresAt: null,
      status: 'QR expirado. Clique para gerar um novo.',
    });
  }, QR_WINDOW_MS);
  pairingTimer.unref?.();

  if (socket || socketStarting) stopCurrentSocket('Starting a fresh QR window');
  await openSocket();
  return 'started';
}

async function hasRegisteredCredentials() {
  try {
    const raw = await readFile(path.join(AUTH_DIR, 'creds.json'), 'utf8');
    const credentials = JSON.parse(raw);
    return credentials.registered === true;
  } catch {
    return false;
  }
}

async function handleRequest(req, res) {
  const pathname = new URL(req.url || '/', 'http://127.0.0.1').pathname;

  if (req.method === 'GET' && pathname === '/healthz') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if ((req.method === 'GET' || req.method === 'HEAD') && ASSETS.has(pathname)) {
    const asset = ASSETS.get(pathname);
    res.writeHead(200, { ...BASE_HEADERS, 'Content-Type': asset.contentType });
    res.end(req.method === 'HEAD' ? undefined : asset.body);
    return;
  }

  if (req.method === 'POST' && pathname === '/api/login') {
    if (!trustedOrigin(req)) {
      sendJson(res, 403, { error: 'Origem não autorizada.' });
      return;
    }
    const ip = clientKey(req);
    if (rateLimited(loginFailures, ip, LOGIN_MAX_FAILURES, LOGIN_WINDOW_MS)) {
      sendJson(res, 429, { error: 'Muitas tentativas. Aguarde antes de tentar novamente.' });
      return;
    }
    const body = await readJson(req);
    if (!constantTimeStringEqual(body.password, PANEL_PASSWORD)) {
      sendJson(res, 401, { error: 'Senha incorreta.' });
      return;
    }
    loginFailures.delete(ip);
    const token = createSessionToken(PANEL_PASSWORD);
    sendJson(res, 200, { ok: true }, { 'Set-Cookie': makeSessionCookie(token, { secure: secureCookie() }) });
    return;
  }

  if (pathname.startsWith('/api/')) {
    if (!authenticated(req)) {
      sendJson(res, 401, { error: 'Autenticação necessária.' });
      return;
    }
    if (req.method !== 'GET' && !trustedOrigin(req)) {
      sendJson(res, 403, { error: 'Origem não autorizada.' });
      return;
    }

    if (req.method === 'POST' && pathname === '/api/logout') {
      revokeSession(readCookie(req.headers.cookie || '', SESSION_COOKIE));
      sendJson(res, 200, { ok: true }, { 'Set-Cookie': clearSessionCookie({ secure: secureCookie() }) });
      return;
    }

    if (req.method === 'GET' && pathname === '/api/status') {
      sendJson(res, 200, {
        status: state.status,
        connected: state.connected,
        hasQr: currentQrAvailable(),
        pairingActive: pairingActive && Date.now() < pairingDeadline,
        qrExpiresAt: currentQrAvailable() ? state.qrExpiresAt : null,
        updatedAt: state.updatedAt,
      });
      return;
    }

    if (req.method === 'GET' && pathname === '/api/qr.svg') {
      if (!currentQrAvailable()) {
        sendJson(res, 410, { error: 'QR indisponível ou expirado.' });
        return;
      }
      send(res, 200, state.qrSvg, 'image/svg+xml; charset=utf-8');
      return;
    }

    if (req.method === 'POST' && pathname === '/api/qr/start') {
      if (state.connected) {
        sendJson(res, 409, { error: 'A sessão já está conectada.' });
        return;
      }
      const ip = clientKey(req);
      if (rateLimited(qrStarts, ip, PAIR_MAX_STARTS, PAIR_WINDOW_MS)) {
        sendJson(res, 429, { error: 'Limite de geração de QR atingido. Tente mais tarde.' });
        return;
      }
      const result = await startPairing();
      sendJson(res, result === 'already-active' ? 200 : 202, { ok: true, status: result });
      return;
    }
  }

  if (pathname.startsWith('/api/')) {
    sendJson(res, 404, { error: 'Rota não encontrada.' });
    return;
  }
  send(res, 404, 'Not found');
}

await mkdir(AUTH_DIR, { recursive: true, mode: 0o700 });
const server = createServer((req, res) => {
  void handleRequest(req, res).catch((error) => {
    const status = Number.isInteger(error?.statusCode) ? error.statusCode : 500;
    if (!res.headersSent) {
      sendJson(res, status, { error: status === 500 ? 'Erro interno.' : error.message });
    } else {
      res.destroy();
    }
    if (status === 500) console.error('http:request-failed', error?.name || 'Error');
  });
});

await new Promise((resolve, reject) => {
  server.once('error', reject);
  server.listen(PORT, HOST, resolve);
});
console.log(`panel:listening:${HOST}:${PORT}`);

if (await hasRegisteredCredentials()) {
  reconnectEnabled = true;
  updateState({ status: 'A reconectar a sessão WhatsApp guardada…' });
  void openSocket();
}

async function shutdown() {
  clearPairingTimer();
  if (reconnectTimer) clearTimeout(reconnectTimer);
  pairingActive = false;
  reconnectEnabled = false;
  stopCurrentSocket('Service shutdown');
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 3000).unref?.();
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
