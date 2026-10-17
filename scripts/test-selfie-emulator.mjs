import assert from 'node:assert/strict';
import { createCloudPhotoClient } from '../selfieCloud.js';

const host = process.env.FIRESTORE_EMULATOR_HOST;
if (!/^127\.0\.0\.1:\d+$/.test(host || '')) throw Error('Only an isolated loopback Firestore emulator is allowed.');
const projectId = 'demo-sixpack';
const endpoint = `http://${host}/v1`;
const token = (uid, extra = {}) => {
  const now = Math.floor(Date.now() / 1000);
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  return `${encode({ alg: 'none', typ: 'JWT' })}.${encode({ iss: `https://securetoken.google.com/${projectId}`, aud: projectId, sub: uid, user_id: uid, iat: now, exp: now + 3600, auth_time: now, firebase: { sign_in_provider: 'custom', identities: {} }, ...extra })}.`;
};
const create = (uid, authUid = uid, extra = {}) => createCloudPhotoClient({ uid, projectId, endpoint, getIdToken: async () => token(authUid, extra), isCurrentUser: () => true });
const alice = create('test-alice');
const bob = create('test-bob');
const jpeg = 'data:image/jpeg;base64,eA==';
await alice.uploadData('first', '2026-10-17T12:00:00Z', jpeg);
await alice.uploadData('first', '2026-10-17T12:00:00Z', jpeg);
assert.equal((await alice.list()).photos.length, 1);
assert.equal(await (await alice.image('first')).text(), 'x');
assert.equal((await bob.list()).photos.length, 0);
for (const reader of [create('test-alice', 'test-bob'), create('test-alice', 'coach', { coach: true }), create('test-alice', '59ole36uNpNwml5H6VDYCXyCME92')]) {
  await assert.rejects(() => reader.list(), error => error.status === 403);
  await assert.rejects(() => reader.image('first'), error => error.status === 403);
  await assert.rejects(() => reader.uploadData('first', '2026', jpeg), error => error.status === 403);
}
const base = `${endpoint}/projects/${projectId}/databases/(default)/documents/sixpackSelfies/test-alice/photos`;
assert.equal((await fetch(base)).status, 403);
for (const dataUrl of ['not-an-image', 'data:image/jpeg;base64,' + 'x'.repeat(700000)]) {
  const response = await fetch(`${base}/invalid`, { method: 'PATCH', headers: { Authorization: `Bearer ${token('test-alice')}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ fields: { date: { stringValue: '2026' }, dataUrl: { stringValue: dataUrl } } }) });
  assert.equal(response.status, 403);
}
console.log('Firestore E2E: authenticated upload/list/download, idempotent retry, other-user/coach/anonymous denial and server payload rules passed.');
