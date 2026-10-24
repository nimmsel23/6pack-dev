import assert from 'node:assert/strict';
const host = process.env.FIRESTORE_EMULATOR_HOST;
if (!/^127\.0\.0\.1:\d+$/.test(host || '')) throw Error('Only an isolated loopback emulator is allowed.');
const endpoint = `http://${host}/v1/projects/demo-sixpack/databases/(default)/documents`;
const token = (uid, coach = false) => {
  const now = Math.floor(Date.now() / 1000);
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ iss: 'https://securetoken.google.com/demo-sixpack', aud: 'demo-sixpack', sub: uid, user_id: uid, iat: now, exp: now + 3600, auth_time: now, coach, firebase: { sign_in_provider: 'custom', identities: {} } })}.`;
};
for (const uid of ['calendar-test-alice', 'calendar-test-bob', 'coach']) {
  const headers = { Authorization: `Bearer ${token(uid, uid === 'coach')}`, 'Content-Type': 'application/json' };
  for (const path of ['_sixpackCalendarPrivate/calendar-test-alice', '_sixpackCalendarOAuth/mock-state']) {
    assert.equal((await fetch(`${endpoint}/${path}`, { headers })).status, 403, `${uid} must not read server OAuth data`);
    assert.equal((await fetch(`${endpoint}/${path}`, { method: 'PATCH', headers, body: JSON.stringify({ fields: { refreshToken: { stringValue: 'fake-test-token' } } }) })).status, 403, `${uid} must not write OAuth data`);
  }
}
console.log('Calendar rules: OAuth state and refresh tokens denied to users, other accounts and coaches.');
