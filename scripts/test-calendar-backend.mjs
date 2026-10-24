import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { CALENDAR_SCOPES } from '../functions/calendarApi.mjs';
import { nextCalendarWorkout } from '../functions/trackSchedule.mjs';
if (!/^127\.0\.0\.1:\d+$/.test(process.env.FIRESTORE_EMULATOR_HOST || '')) throw Error('An isolated loopback Firestore emulator is required.');
process.env.GCLOUD_PROJECT = 'demo-sixpack';
process.env.SIXPACK_CALENDAR_CLIENT_ID = 'mock-client-id';
process.env.SIXPACK_CALENDAR_CLIENT_SECRET = 'mock-client-secret';
const require = createRequire(new URL('../functions/package.json', import.meta.url));
const { getFirestore } = require('firebase-admin/firestore');
const { getAuth } = require('firebase-admin/auth');
const { getApp, deleteApp } = require('firebase-admin/app');
const handlers = await import('../functions/index.js');
const db = getFirestore();
getAuth().getUser = async uid => ({ uid, email: 'alice@example.invalid', providerData: [{ providerId: 'google.com', uid: 'google-alice' }] });
const uid = 'calendar-backend-test-alice';
const programRef = db.doc(`users/${uid}/meta/sixpack`);
const privateRef = db.doc(`_sixpackCalendarPrivate/${uid}`);
const publicRef = db.doc(`users/${uid}/meta/sixpackCalendar`);
const program = { currentDay: 1, settings: { reminder: { time: '18:00' } } };
const events = new Map();
let googleSub = 'google-alice';
let challenge;
let holdRefresh;
let refreshEntered;
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options = {}) => {
  const reply = (status, value) => ({ ok: status >= 200 && status < 300, status, json: async () => value });
  if (url === 'https://oauth2.googleapis.com/token') {
    const params = options.body;
    assert.equal(params.get('client_secret'), 'mock-client-secret');
    if (params.get('grant_type') === 'authorization_code') {
      assert.equal(createHash('sha256').update(params.get('code_verifier')).digest('base64url'), challenge);
    } else if (holdRefresh) { refreshEntered(); await holdRefresh; }
    return reply(200, { access_token: 'mock-google-access', refresh_token: 'mock-google-refresh', scope: CALENDAR_SCOPES.join(' ') });
  }
  if (url === 'https://openidconnect.googleapis.com/v1/userinfo') return reply(200, { sub: googleSub });
  const parsed = new URL(url);
  if (parsed.pathname.endsWith('/calendarList')) return reply(200, { items: [{ id: 'fitness-calendar', summary: 'Fitness' }] });
  const parts = parsed.pathname.split('/');
  assert.equal(parts[4], 'fitness-calendar');
  const body = options.body ? JSON.parse(options.body) : null;
  const id = parts[6];
  if (options.method === 'GET') return events.has(id) ? reply(200, events.get(id)) : reply(404, {});
  if (options.method === 'POST') {
    if (events.has(body.id)) return reply(409, {});
    events.set(body.id, { ...body, htmlLink: 'https://calendar.google.com/mock-event' });
    return reply(200, events.get(body.id));
  }
  if (options.method === 'PATCH') { events.set(id, { ...events.get(id), ...body }); return reply(200, events.get(id)); }
  if (options.method === 'DELETE') { events.delete(id); return reply(204); }
  throw Error(`Unexpected mock request: ${url}`);
};
const beginRequest = { auth: { uid }, data: { timeZone: 'Europe/Vienna' }, rawRequest: { headers: { origin: 'https://vos-6pack.web.app' } } };
async function begin() {
  const { url } = await handlers.sixpackCalendarBegin.run(beginRequest);
  const params = new URL(url).searchParams;
  challenge = params.get('code_challenge');
  assert.equal(params.get('access_type'), 'offline');
  return params.get('state');
}
async function callback(state) {
  const response = { statusCode: 200, set() { return this; }, type() { return this; }, status(code) { this.statusCode = code; return this; }, send(body) { this.body = body; return this; } };
  await handlers.sixpackCalendarCallback({ headers: {}, query: { state, code: 'mock-oauth-code' } }, response);
  return response;
}
const snapshot = data => ({ data: () => data });
try {
  await programRef.set(program);
  await assert.rejects(handlers.sixpackCalendarBegin.run({}), error => error.code === 'unauthenticated');
  await assert.rejects(handlers.sixpackCalendarBegin.run({ ...beginRequest, rawRequest: { headers: { origin: 'https://untrusted.invalid' } } }), error => error.code === 'permission-denied');
  const wrongState = await begin();
  googleSub = 'google-bob';
  assert.equal((await callback(wrongState)).statusCode, 400);
  assert.equal((await privateRef.get()).exists, false);
  googleSub = 'google-alice';
  const state = await begin();
  assert.equal((await callback(state)).statusCode, 200);
  assert.equal((await callback(state)).statusCode, 400, 'OAuth state is one-use');
  assert.equal(events.size, 1);
  const eventId = (await privateRef.get()).data().eventId;

  // Read the latest Track instead of using the potentially stale event payload.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Vienna' }).format(new Date());
  const latest = { ...program, currentDay: 3, lastCompletedOn: today };
  await programRef.set(latest);
  const trigger = { params: { uid }, data: { before: snapshot(program), after: snapshot({ ...program, currentDay: 2 }) } };
  let release;
  holdRefresh = new Promise(resolve => { release = resolve; });
  const entered = new Promise(resolve => { refreshEntered = resolve; });
  const first = handlers.sixpackCalendarOnTrack.run(trigger);
  await entered;
  await assert.rejects(handlers.sixpackCalendarOnTrack.run(trigger), /läuft bereits/);
  release();
  await first;
  holdRefresh = null;
  await handlers.sixpackCalendarOnTrack.run(trigger);
  assert.equal(events.size, 1, 'duplicate/concurrent delivery must keep one upcoming event');
  assert.equal((await privateRef.get()).data().eventId, eventId);
  assert.equal(events.get(eventId).start.dateTime, nextCalendarWorkout(latest, 'Europe/Vienna').start.dateTime);
  const status = (await publicRef.get()).data();
  assert.equal(status.connected, true);
  assert(!JSON.stringify(status).includes('mock-google'), 'OAuth credentials must never enter client-readable status');
  await handlers.sixpackCalendarDisconnect.run({ auth: { uid } });
  assert.equal(events.size, 0);
  const forgotten = (await privateRef.get()).data();
  assert.equal(forgotten.enabled, false);
  assert.equal(forgotten.refreshToken, undefined);
  assert.equal((await publicRef.get()).data().connected, false);
  console.log('Calendar backend: same-account OAuth+PKCE, one-use state, automatic latest-Track trigger, concurrent/retried delivery, private credentials and disconnect passed.');
} finally {
  globalThis.fetch = originalFetch;
  await db.terminate();
  await deleteApp(getApp());
}
