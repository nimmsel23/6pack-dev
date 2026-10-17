import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Exercise the real REST client without accessing personal accounts or photos.
let uid = 'alice';
globalThis.__selfieApp = { options: { projectId: 'test-project' } };
globalThis.__selfieAuth = { get currentUser() { return uid ? { uid, getIdToken: async () => 'test-token' } : null; } };
const source = (await readFile(new URL('../selfieCloud.js', import.meta.url), 'utf8'))
  .replace("import { getApp } from 'firebase/app';", 'const getApp = () => globalThis.__selfieApp;')
  .replace("import { getAuth } from 'firebase/auth';", 'const getAuth = () => globalThis.__selfieAuth;');
const { uploadSelfie, listSelfies, prepareSelfie } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const calls = [];
globalThis.fetch = async (url, options) => {
  calls.push({ url, options });
  assert.equal(options.headers.Authorization, 'Bearer test-token');
  return { ok: true, json: async () => ({}) };
};
await assert.rejects(() => listSelfies('bob'), /anmelden/);
uid = null;
await assert.rejects(() => listSelfies('alice'), /anmelden/);
uid = 'alice';
assert.equal(calls.length, 0);
await assert.rejects(() => uploadSelfie('alice', '../bad', '2026', 'data:image/jpeg;base64,eA=='));
await assert.rejects(() => uploadSelfie('alice', 'id', '2026', 'data:image/jpeg;base64,' + 'x'.repeat(700000)));
await uploadSelfie('alice', 'id', '2026-10-17', 'data:image/jpeg;base64,eA==');
await uploadSelfie('alice', 'id', '2026-10-17', 'data:image/jpeg;base64,eA==');
assert.equal(calls[0].url, calls[1].url); // retries update the same document
assert.equal(calls[0].options.method, 'PATCH');
assert.equal(JSON.parse(calls[0].options.body).fields.date.stringValue, '2026-10-17');
let page = 0;
globalThis.fetch = async (url) => {
  if (page++) assert.match(url, /pageToken=next/);
  return { ok: true, json: async () => ({
    documents: [{ name: `photos/${page}`, fields: { date: { stringValue: `2026-10-${page}` }, dataUrl: { stringValue: 'data:image/jpeg;base64,eA==' } } }],
    ...(page === 1 ? { nextPageToken: 'next' } : {}),
  }) };
};
assert.equal((await listSelfies('alice'))[0].id, '2');
globalThis.fetch = async () => ({ ok: false, status: 403 });
await assert.rejects(() => uploadSelfie('alice', 'id', '2026', 'data:image/jpeg;base64,eA=='), /403/);
// Decode failure must release the object URL and must not upload an original.
let revoked = false;
URL.createObjectURL = () => 'blob:test';
URL.revokeObjectURL = () => { revoked = true; };
globalThis.Image = class { async decode() { throw new Error('unsupported'); } };
await assert.rejects(() => prepareSelfie(new Blob()), /unsupported/);
assert.equal(revoked, true);
console.log('Selfie cloud: auth isolation, payload bounds, idempotent retry, pagination, denial and decode failure passed.');
