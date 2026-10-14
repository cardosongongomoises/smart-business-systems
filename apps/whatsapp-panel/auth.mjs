import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'wa_panel_session';
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

export function constantTimeStringEqual(candidate, expected) {
  if (typeof candidate !== 'string' || typeof expected !== 'string') return false;
  const left = createHash('sha256').update(candidate, 'utf8').digest();
  const right = createHash('sha256').update(expected, 'utf8').digest();
  return timingSafeEqual(left, right);
}

export function createSessionToken(password, now = Date.now()) {
  if (typeof password !== 'string' || password.length === 0) {
    throw new TypeError('A session signing key is required.');
  }
  const payload = Buffer.from(
    JSON.stringify({ exp: now + SESSION_TTL_MS, nonce: randomBytes(18).toString('base64url') }),
    'utf8',
  ).toString('base64url');
  const signature = createHmac('sha256', password).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifySessionToken(token, password, now = Date.now()) {
  if (typeof token !== 'string' || typeof password !== 'string' || password.length === 0) {
    return false;
  }
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) return false;

  const [payload, signature] = parts;
  const expected = createHmac('sha256', password).update(payload).digest('base64url');
  if (!constantTimeStringEqual(signature, expected)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number.isFinite(parsed.exp) && parsed.exp > now && typeof parsed.nonce === 'string';
  } catch {
    return false;
  }
}

export function makeSessionCookie(token, { secure = true } = {}) {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}${secure ? '; Secure' : ''}`;
}

export function clearSessionCookie({ secure = true } = {}) {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure ? '; Secure' : ''}`;
}

export function readCookie(header = '', name = SESSION_COOKIE) {
  for (const segment of header.split(';')) {
    const separator = segment.indexOf('=');
    if (separator < 0) continue;
    const key = segment.slice(0, separator).trim();
    if (key === name) return segment.slice(separator + 1).trim();
  }
  return '';
}
