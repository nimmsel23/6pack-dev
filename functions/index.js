import { randomBytes, createHash } from 'node:crypto';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { onCall, onRequest, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { getMessaging } from 'firebase-admin/messaging';
import { defineString, defineSecret } from 'firebase-functions/params';
import { CALENDAR_SCOPES, createCalendarApi } from './calendarApi.mjs';
import { syncNextWorkout } from './calendarSync.mjs';
import { sixpackReminderDecision, sixpackReminderText, getLocalDateParts } from './sixpackReminder.mjs';

initializeApp();
const db = getFirestore();
const region = 'europe-west1';
const clientId = defineString('SIXPACK_CALENDAR_CLIENT_ID');
const clientSecret = defineSecret('SIXPACK_CALENDAR_CLIENT_SECRET');
const privateRef = uid => db.collection('_sixpackCalendarPrivate').doc(uid);
const publicRef = uid => db.doc(`users/${uid}/meta/sixpackCalendar`);
const callbackUrl = () => `https://${region}-${process.env.GCLOUD_PROJECT}.cloudfunctions.net/sixpackCalendarCallback`;
const hash = value => createHash('sha256').update(value).digest('hex');
const uidFor = request => {
  if (!request.auth?.uid) throw new HttpsError('unauthenticated', 'Bitte mit deinem Google-Konto anmelden.');
  return request.auth.uid;
};
const safeOrigin = origin => {
  try {
    const url = new URL(origin);
    const hosts = ['vos-6pack', 'fitness-aos', 'vitalos'];
    if (url.protocol === 'https:' && hosts.some(host => [host + '.web.app', host + '.firebaseapp.com'].includes(url.hostname)
      || (url.hostname.startsWith(host + '--') && url.hostname.endsWith('.web.app')))) return url.origin;
    if (process.env.FUNCTIONS_EMULATOR === 'true' && ['localhost', '127.0.0.1'].includes(url.hostname)) return url.origin;
  } catch { /* rejected below */ }
  throw new HttpsError('permission-denied', 'Diese App-Adresse ist für die Kalender-Anbindung nicht freigegeben.');
};
const publish = (uid, state) => publicRef(uid).set({ ...state, calendarName: 'Fitness', updatedAt: FieldValue.serverTimestamp() }, { merge: true });

async function googleToken(fields) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', body: new URLSearchParams({ client_id: clientId.value(), client_secret: clientSecret.value(), ...fields }),
    signal: AbortSignal.timeout(15000),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    const error = new Error('Google Kalender bitte erneut verbinden.');
    error.permanent = data.error === 'invalid_grant' || data.error === 'invalid_client';
    throw error;
  }
  return data;
}

// Events can arrive twice or out of order. A server-side lease serializes writes
// and each run reads the latest Track, rather than replaying a stale event body.
async function withConnection(uid, fn) {
  const ref = privateRef(uid);
  const lease = randomBytes(16).toString('hex');
  const connection = await db.runTransaction(async tx => {
    const snap = await tx.get(ref);
    const data = snap.data();
    if (!data?.enabled) return null;
    if (data.leaseUntil > Date.now()) throw new Error('Kalender-Synchronisierung läuft bereits.');
    tx.update(ref, { lease, leaseUntil: Date.now() + 180000 });
    return data;
  });
  if (!connection) return;
  try { return await fn(connection, ref); }
  finally {
    await db.runTransaction(async tx => {
      const snap = await tx.get(ref);
      if (snap.data()?.lease === lease) tx.update(ref, { lease: FieldValue.delete(), leaseUntil: FieldValue.delete() });
    });
  }
}

async function sync(uid) {
  return withConnection(uid, async (connection, ref) => {
    try {
      const tokens = await googleToken({ grant_type: 'refresh_token', refresh_token: connection.refreshToken });
      const program = (await db.doc(`users/${uid}/meta/sixpack`).get()).data();
      const state = await syncNextWorkout({ uid, connection, program,
        api: createCalendarApi(tokens.access_token), saveConnection: update => ref.set(update, { merge: true }) });
      await publish(uid, { ...state, needsReconnect: false });
    } catch (error) {
      const permanent = error.permanent || ([401, 403, 404].includes(error.status) && !['rateLimitExceeded', 'userRateLimitExceeded'].includes(error.reason));
      await publish(uid, { error: error.message, needsReconnect: !!permanent });
      if (!permanent) throw error;
    }
  });
}

export const sixpackCalendarBegin = onCall({ region }, async request => {
  const uid = uidFor(request);
  const user = await getAuth().getUser(uid);
  const googleUid = user.providerData.find(provider => provider.providerId === 'google.com')?.uid;
  if (!googleUid) throw new HttpsError('failed-precondition', 'Bitte dein Google-Konto für die Anmeldung verwenden.');
  const origin = safeOrigin(request.rawRequest.headers.origin);
  const timeZone = String(request.data?.timeZone || '');
  try { new Intl.DateTimeFormat('en', { timeZone }).format(); }
  catch { throw new HttpsError('invalid-argument', 'Ungültige Zeitzone.'); }
  const state = randomBytes(32).toString('base64url');
  const verifier = randomBytes(32).toString('base64url');
  await db.collection('_sixpackCalendarOAuth').doc(hash(state)).set({ uid, googleUid, origin, timeZone, verifier, expiresAt: new Date(Date.now() + 10 * 60000) });
  const params = new URLSearchParams({ client_id: clientId.value(), redirect_uri: callbackUrl(),
    response_type: 'code', scope: CALENDAR_SCOPES.join(' '), access_type: 'offline', prompt: 'consent',
    login_hint: user.email || '', state, code_challenge: createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256' });
  return { url: `https://accounts.google.com/o/oauth2/v2/auth?${params}` };
});

export const sixpackCalendarCallback = onRequest({ region, timeoutSeconds: 120, secrets: [clientSecret] }, async (request, response) => {
  response.set('Cache-Control', 'no-store');
  response.set('Referrer-Policy', 'no-referrer');
  let session;
  try {
    const state = String(request.query.state || '');
    if (!state || state.length > 100) throw new Error('Ungültige Kalender-Anfrage.');
    const ref = db.collection('_sixpackCalendarOAuth').doc(hash(state));
    session = await db.runTransaction(async tx => {
      const snap = await tx.get(ref);
      if (!snap.exists || snap.data().expiresAt.toMillis() < Date.now()) throw new Error('Kalender-Anfrage ist abgelaufen. Bitte erneut verbinden.');
      tx.delete(ref);
      return snap.data();
    });
    if (request.query.error) throw new Error('Kalenderfreigabe wurde nicht erteilt.');
    if (typeof request.query.code !== 'string') throw new Error('Google hat keinen Anmeldecode geliefert.');
    const tokens = await googleToken({ grant_type: 'authorization_code', code: request.query.code, redirect_uri: callbackUrl(), code_verifier: session.verifier });
    const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }, signal: AbortSignal.timeout(15000),
    });
    const profile = await profileResponse.json();
    if (!profileResponse.ok || profile.sub !== session.googleUid) throw new Error('Bitte dasselbe Google-Konto wie in 6Pack verwenden.');
    const scopes = new Set(String(tokens.scope || '').split(' '));
    if (!CALENDAR_SCOPES.filter(scope => scope !== 'openid').every(scope => scopes.has(scope))) throw new Error('Bitte die angefragte Kalenderfreigabe vollständig erlauben.');
    const calendar = await createCalendarApi(tokens.access_token).fitnessCalendar();
    await db.runTransaction(async tx => {
      const ref = privateRef(session.uid);
      const existing = (await tx.get(ref)).data();
      if (existing?.leaseUntil > Date.now()) throw new Error('Kalender wird gerade aktualisiert. Bitte erneut verbinden.');
      if (existing?.calendarId && existing.calendarId !== calendar.id) throw new Error('Bitte die bisherige Kalender-Verbindung zuerst trennen.');
      const refreshToken = tokens.refresh_token || existing?.refreshToken;
      if (!refreshToken) throw new Error('Google hat keine dauerhafte Kalenderfreigabe geliefert. Bitte erneut verbinden.');
      tx.set(ref, { enabled: true, calendarId: calendar.id, refreshToken, googleUid: profile.sub, timeZone: session.timeZone }, { merge: true });
    });
    await publish(session.uid, { connected: true, needsReconnect: false, error: '' });
    await sync(session.uid);
    response.type('html').send('<!doctype html><meta charset="utf-8"><title>6Pack Kalender</title><p>Kalender „Fitness“ verbunden. Du kannst zu 6Pack zurückkehren.</p><script>window.close()</script>');
  } catch (error) {
    if (session) await publish(session.uid, { error: error.message });
    // Fixed text: neither codes, tokens nor Google responses enter HTML/logs.
    response.status(400).type('html').send('<!doctype html><meta charset="utf-8"><title>6Pack Kalender</title><p>Kalender konnte nicht verbunden werden. Bitte zu 6Pack zurückkehren und den Hinweis in den Einstellungen prüfen.</p>');
  }
});

export const sixpackCalendarDisconnect = onCall({ region, timeoutSeconds: 120, secrets: [clientSecret] }, async request => {
  const uid = uidFor(request);
  try {
    await withConnection(uid, async (connection, ref) => {
      const tokens = await googleToken({ grant_type: 'refresh_token', refresh_token: connection.refreshToken });
      if (connection.eventId) await createCalendarApi(tokens.access_token).remove(connection.calendarId, connection.eventId, uid);
      // Keep OAuth permission at Google separate from Firebase sign-in. Forget
      // server credentials after removing only this app's pending event. Keep the
      // event tombstone ID so reconnecting cannot collide with a deleted ID.
      await ref.set({ enabled: false, refreshToken: FieldValue.delete() }, { merge: true });
    });
    await publish(uid, { connected: false, nextStart: null, eventUrl: null, needsReconnect: false, error: '' });
    return { connected: false };
  } catch { throw new HttpsError('unavailable', 'Kalender konnte nicht getrennt werden. Bitte erneut versuchen; der letzte Termin bleibt bis dahin bestehen.'); }
});

export const sixpackCalendarOnTrack = onDocumentWritten({ region, timeoutSeconds: 120, document: 'users/{uid}/meta/sixpack', retry: true, secrets: [clientSecret] }, async event => {
  const relevant = data => JSON.stringify(data ? { day: data.currentDay, last: data.lastCompletedOn, rest: data.restDate, time: data.settings?.reminder?.time || '18:00' } : null);
  if (relevant(event.data?.before.data()) === relevant(event.data?.after.data())) return;
  await sync(event.params.uid);
});

// Trainings-Erinnerung per Push. Uhrzeit/An-Aus: users/{uid}/meta/sixpack (settings.reminder),
// Geräte: users/{uid}/meta/sixpackPush (tokens[], von der 6Pack-App registriert).
// Dedup pro Tag über lastReminderDate im sixpackPush-Dokument (das Programm-Dokument wird
// vom Client komplett überschrieben). Tag "sixpack-reminder" = wie die lokale Erinnerung.
export const scheduledSixpackReminders = onSchedule({ region, schedule: 'every 5 minutes', timeZone: 'Europe/Berlin' }, async () => {
  const local = getLocalDateParts();
  let sentCount = 0;
  let failureCount = 0;
  // listDocuments() findet auch Parent-Docs ohne eigene Felder.
  for (const userRef of await db.collection('users').listDocuments()) {
    const metaRef = userRef.collection('meta');
    const programSnap = await metaRef.doc('sixpack').get();
    if (!programSnap.exists) continue;
    const program = programSnap.data() || {};
    if (!program.settings?.reminder?.enabled) continue;

    const pushSnap = await metaRef.doc('sixpackPush').get();
    const push = pushSnap.exists ? pushSnap.data() || {} : null;
    const decision = sixpackReminderDecision({ program, push, local });
    if (!decision.send) continue;

    const text = sixpackReminderText(decision.vars);
    const response = await getMessaging().sendEachForMulticast({
      data: { app: 'sixpack', title: text.title, body: text.body, tag: 'sixpack-reminder' },
      tokens: push.tokens,
    });
    sentCount += response.successCount;
    failureCount += response.failureCount;

    // Ungültige Tokens (Gerät abgemeldet/App deinstalliert) entfernen.
    const dead = push.tokens.filter((_, i) => {
      const code = response.responses[i]?.error?.code;
      return code === 'messaging/registration-token-not-registered' || code === 'messaging/invalid-registration-token';
    });
    const update = {};
    if (response.successCount > 0) update.lastReminderDate = local.date;
    if (dead.length > 0) update.tokens = FieldValue.arrayRemove(...dead);
    if (Object.keys(update).length > 0) await pushSnap.ref.set(update, { merge: true });
  }
  console.log(`6Pack reminders: ${sentCount} sent, ${failureCount} failed`);
});
