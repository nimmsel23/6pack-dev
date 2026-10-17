import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { createCloudPhotoClient, prepareSelfie } from '../selfieCloud.js';
import { createPhotoClient, transferLegacyPhotos, photoApiBase } from '../photoClient.mjs';
globalThis.crypto ||= webcrypto;
const jpeg = 'data:image/jpeg;base64,eA==';
let active = true;
const refresh = [], requests = [];
let mode = 'ok';
const client = createCloudPhotoClient({
  uid: 'alice', projectId: 'test', isCurrentUser: () => active,
  getIdToken: async force => { refresh.push(force); return 'token'; },
  fetchImpl: async (url, options) => {
    requests.push({ url, options });
    assert.equal(options.headers.Authorization, 'Bearer token');
    assert.equal(options.cache, 'no-store');
    if (mode === 'offline') throw Error('offline');
    if (mode === 'expired' && refresh.at(-1) === false) return { ok: false, status: 401 };
    if (mode === 'forbidden') return { ok: false, status: 403 };
    return { ok: true, json: async () => mode === 'pages'
      ? { documents: [{ name: 'photos/id', fields: { date: { stringValue: '2026-10-17' } } }], ...(url.includes('pageToken') ? {} : { nextPageToken: 'next' }) }
      : url.includes('/photos/id') && !options.method ? { fields: { dataUrl: { stringValue: jpeg } } } : {} };
  },
});
active = false;
await assert.rejects(() => client.list(), /Konto gewechselt/);
assert.equal(requests.length, 0);
active = true;
await assert.rejects(() => client.uploadData('../bad', '2026', jpeg));
await assert.rejects(() => client.uploadData('id', 'bad-date', jpeg));
await assert.rejects(() => client.uploadData('id', '2026', jpeg + 'x'.repeat(700000)));
await client.uploadData('id', '2026-10-17', jpeg);
await client.uploadData('id', '2026-10-17', jpeg);
assert.equal(requests[0].url, requests[1].url);
assert.equal(requests[0].options.method, 'PATCH');
assert.match(requests[0].url, /sixpackSelfies\/alice\/photos\/id$/);
mode = 'expired';
await client.list();
assert.deepEqual(refresh.slice(-2), [false, true]);
mode = 'pages';
assert.equal((await client.list()).photos.length, 2);
assert.match(requests.at(-1).url, /mask.fieldPaths=date/);
mode = 'ok';
assert.equal(await (await client.image('id')).text(), 'x');
mode = 'forbidden';
await assert.rejects(() => client.list(), err => err.status === 403 && !err.retryable);
mode = 'offline';
await assert.rejects(() => client.list(), err => err.retryable);
// Reuse the original authenticated archive client, with no hard-coded Funnel.
assert.equal(photoApiBase(), '');
assert.throws(() => createPhotoClient({ uid: 'alice', base: 'http://public.invalid' }), /HTTPS/);
assert.throws(() => createPhotoClient({ uid: 'alice', base: 'https://u:p@example.com' }), /HTTPS/);
const archive = createPhotoClient({ uid: 'alice', base: 'https://archive.invalid/fitness', getIdToken: async () => 'token', fetchImpl: async (url, opts) => {
  assert.equal(opts.headers.Authorization, 'Bearer token');
  assert.equal(opts.redirect, 'error');
  assert.match(url, /\/fitness\/api\/sixpack\/photos$/);
  return { ok: true, headers: new Headers({ 'Content-Type': 'application/json' }), json: async () => ({ ok: true, uid: 'bob', photos: [] }) };
} });
await assert.rejects(() => archive.list(), /Ungültige Antwort/);
const imported = new Map();
const cloud = { uid: 'alice', list: async () => ({ photos: [...imported.keys()].map(id => ({ id })) }), uploadData: async (id, date, dataUrl) => { imported.set(id, { date, dataUrl }); } };
let downloads = 0;
const legacy = { list: async () => ({ photos: [{ filename: 'one.jpg', date: '2026-10-01' }, { filename: 'two.jpg', date: '2026-10-02' }] }), image: async () => { downloads++; return new Blob(['x']); } };
await transferLegacyPhotos({ cloud, legacy, prepare: async () => jpeg });
await transferLegacyPhotos({ cloud, legacy, prepare: async () => jpeg });
assert.equal(imported.size, 2);
assert.equal(downloads, 2, 'repeated import skips already confirmed photos');
await assert.rejects(() => transferLegacyPhotos({ cloud, legacy, prepare: async () => jpeg, isActive: () => false }), /Konto oder Ansicht/);
let revoked = false;
URL.createObjectURL = () => 'blob:test';
URL.revokeObjectURL = () => { revoked = true; };
globalThis.Image = class { async decode() { throw Error('unsupported'); } };
await assert.rejects(() => prepareSelfie(new Blob()), /unsupported/);
assert(revoked);
console.log('Cloud/legacy sync: account guard, token refresh, bounds, retries, pagination, authenticated images, errors and resumable import passed.');
