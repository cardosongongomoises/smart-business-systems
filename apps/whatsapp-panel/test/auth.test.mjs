import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SESSION_TTL_MS,
  clearSessionCookie,
  constantTimeStringEqual,
  createSessionToken,
  makeSessionCookie,
  readCookie,
  verifySessionToken,
} from '../auth.mjs';

const PASSWORD = 'local-test-password-not-for-production';

test('compares password strings without accepting different values', () => {
  assert.equal(constantTimeStringEqual(PASSWORD, PASSWORD), true);
  assert.equal(constantTimeStringEqual(PASSWORD, 'wrong-password'), false);
  assert.equal(constantTimeStringEqual(undefined, PASSWORD), false);
});

test('accepts a valid signed session until its expiration', () => {
  const now = 1_800_000_000_000;
  const token = createSessionToken(PASSWORD, now);
  assert.equal(verifySessionToken(token, PASSWORD, now + SESSION_TTL_MS - 1), true);
  assert.equal(verifySessionToken(token, PASSWORD, now + SESSION_TTL_MS), false);
});

test('rejects tampered tokens and tokens signed with another password', () => {
  const token = createSessionToken(PASSWORD, 1_800_000_000_000);
  assert.equal(verifySessionToken(`${token}x`, PASSWORD, 1_800_000_000_001), false);
  assert.equal(verifySessionToken(token, 'another-password', 1_800_000_000_001), false);
  assert.equal(verifySessionToken('not-a-token', PASSWORD), false);
});

test('sets HttpOnly, SameSite and production Secure cookie attributes', () => {
  const cookie = makeSessionCookie('signed.token');
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Strict/);
  assert.match(cookie, /Secure/);
  assert.match(clearSessionCookie(), /Max-Age=0/);
});

test('reads the session cookie without parsing other cookie values', () => {
  assert.equal(readCookie('other=a; wa_panel_session=abc.def; theme=light'), 'abc.def');
  assert.equal(readCookie('other=a; theme=light'), '');
});
