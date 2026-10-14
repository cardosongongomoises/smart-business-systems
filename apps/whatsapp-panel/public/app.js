const loginCard = document.getElementById('login-card');
const panelCard = document.getElementById('panel-card');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const statusText = document.getElementById('status-text');
const statusDot = document.getElementById('status-dot');
const qrArea = document.getElementById('qr-area');
const qrImage = document.getElementById('qr-image');
const expiryText = document.getElementById('expiry-text');
const qrButton = document.getElementById('qr-button');
const actionMessage = document.getElementById('action-message');
const logoutButton = document.getElementById('logout-button');

let authenticated = false;
let lastQrUpdate = '';
let pollTimer;
let expiryTimer;

function showLogin(error = '') {
  authenticated = false;
  loginCard.hidden = false;
  panelCard.hidden = true;
  qrArea.hidden = true;
  qrImage.removeAttribute('src');
  loginError.textContent = error;
  loginError.hidden = !error;
  if (pollTimer) clearInterval(pollTimer);
  if (expiryTimer) clearInterval(expiryTimer);
}

function showPanel() {
  authenticated = true;
  loginCard.hidden = true;
  panelCard.hidden = false;
  loginError.hidden = true;
}

async function api(path, options = {}) {
  return fetch(path, {
    credentials: 'same-origin',
    cache: 'no-store',
    ...options,
  });
}

function displayExpiry(expiry) {
  if (expiryTimer) clearInterval(expiryTimer);
  if (!expiry) {
    expiryText.textContent = '';
    return;
  }
  const update = () => {
    const seconds = Math.max(0, Math.ceil((Date.parse(expiry) - Date.now()) / 1000));
    expiryText.textContent = seconds > 0
      ? `Este QR expira em ${seconds} s.`
      : 'QR expirado. Gere outro quando estiver pronto.';
  };
  update();
  expiryTimer = setInterval(update, 1000);
}

async function refreshStatus() {
  if (!authenticated) return;
  try {
    const response = await api('/api/status');
    if (response.status === 401) {
      showLogin();
      return;
    }
    if (!response.ok) throw new Error('Não foi possível consultar o estado.');
    const data = await response.json();

    statusText.textContent = data.status;
    statusDot.classList.toggle('is-connected', data.connected);
    qrButton.disabled = data.connected || Boolean(data.pairingActive);
    qrButton.textContent = data.connected
      ? 'Ligação ativa'
      : (data.hasQr ? 'QR temporário ativo' : (data.pairingActive ? 'A preparar QR…' : 'Gerar QR temporário'));

    if (data.hasQr && data.qrExpiresAt) {
      qrArea.hidden = false;
      if (lastQrUpdate !== data.updatedAt) {
        lastQrUpdate = data.updatedAt;
        qrImage.src = `/api/qr.svg?v=${encodeURIComponent(data.updatedAt)}`;
      }
      displayExpiry(data.qrExpiresAt);
    } else {
      qrArea.hidden = true;
      qrImage.removeAttribute('src');
      lastQrUpdate = '';
      displayExpiry(null);
    }
  } catch {
    statusText.textContent = 'Estado indisponível; a tentar novamente…';
  }
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginError.hidden = true;
  const submit = loginForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  try {
    const response = await api('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: passwordInput.value }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Não foi possível iniciar sessão.');
    passwordInput.value = '';
    showPanel();
    await refreshStatus();
    if (pollTimer) clearInterval(pollTimer);
    pollTimer = setInterval(refreshStatus, 2500);
  } catch (error) {
    showLogin(error.message || 'Não foi possível iniciar sessão.');
  } finally {
    submit.disabled = false;
  }
});

qrButton.addEventListener('click', async () => {
  qrButton.disabled = true;
  actionMessage.hidden = true;
  actionMessage.textContent = '';
  try {
    const response = await api('/api/qr/start', { method: 'POST' });
    const data = await response.json();
    if (response.status === 401) {
      showLogin();
      return;
    }
    if (!response.ok) throw new Error(data.error || 'Não foi possível gerar o QR.');
    actionMessage.textContent = 'Solicitação enviada; o QR vai aparecer em instantes.';
    actionMessage.hidden = false;
    await refreshStatus();
  } catch (error) {
    actionMessage.textContent = error.message || 'Não foi possível gerar o QR.';
    actionMessage.hidden = false;
    qrButton.disabled = false;
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    await api('/api/logout', { method: 'POST' });
  } finally {
    showLogin();
  }
});

async function initialize() {
  const response = await api('/api/status');
  if (response.status === 401) {
    showLogin();
    return;
  }
  if (!response.ok) {
    showLogin('O painel está temporariamente indisponível.');
    return;
  }
  showPanel();
  await refreshStatus();
  pollTimer = setInterval(refreshStatus, 2500);
}

void initialize();
