import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { build } from 'esbuild';
import { JSDOM } from 'jsdom';
import { act } from 'react';

const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'http://localhost:5173/video-control.html' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true });
Object.defineProperty(globalThis, 'navigator', { configurable: true, value: dom.window.navigator });
dom.window.HTMLMediaElement.prototype.pause = () => {};
const calls = [];
let authListener;
let snapshots;
let snapshotError;
const records = [
  { id: 'bent_knee_windshield_wipers', uploaderUid: 'owner', valid: true, status: 'pending', storagePath: 'exerciseVideos/bent_knee_windshield_wipers/owner', duration: 20.93, sizeBytes: 27004536, contentType: 'video/mp4', createdAt: '2026-11-27T09:55:23Z' },
  { id: 'jackknifes', uploaderUid: 'team', valid: true, status: 'approved', storagePath: 'exerciseVideos/jackknifes/team', duration: 10, sizeBytes: 10000, contentType: 'video/mp4' },
];
globalThis.__videoControlTest = {
  watchPhotoUser(callback) { authListener = callback; callback(null); return () => {}; },
  loginGoogle: async () => {}, loginEmail: async () => {}, logoutPhotos: async () => authListener(null),
  canManageTeam: async () => false,
  watchVideos(callback, onError) { snapshots = callback; snapshotError = onError; callback(records, { fromCache: false }); return () => calls.push('unsubscribe'); },
  videoUrl: async record => `https://example.invalid/${record.id}.mp4`,
  setVideoClip: async (record, start, end) => { calls.push(['clip', record.id, start, end]); },
  setVideoStatus: async (id, status) => { calls.push(['status', id, status]); },
  deleteExerciseVideo: async id => { calls.push(['delete', id]); },
  uploadExerciseVideo: () => { throw new Error('No real uploads in tests'); },
};
const modules = {
  '../photoAuth.js': ['watchPhotoUser', 'loginGoogle', 'loginEmail', 'logoutPhotos'],
  './cloud.js': ['canManageTeam', 'watchVideos', 'videoUrl', 'setVideoStatus', 'setVideoClip'],
  '../exerciseVideoCloud.js': ['deleteExerciseVideo', 'uploadExerciseVideo'],
};
const output = await build({ entryPoints: ['video-control/main.jsx'], bundle: true, write: false, platform: 'node', format: 'cjs', packages: 'external', jsx: 'automatic', loader: { '.css': 'empty' }, plugins: [{ name: 'isolated-firebase', setup(builder) {
  builder.onResolve({ filter: /photoAuth\.js$|\.\/cloud\.js$|exerciseVideoCloud\.js$/ }, args => ({ path: args.path, namespace: 'fake' }));
  builder.onLoad({ filter: /.*/, namespace: 'fake' }, args => ({ contents: modules[args.path].map(name => `export const ${name} = (...args) => globalThis.__videoControlTest.${name}(...args);`).join('\n') }));
} }] });
await act(async () => {
  vm.runInThisContext(`(function(require, module, exports) { ${output.outputFiles[0].text}\n})`)(createRequire(import.meta.url), { exports: {} }, {});
});
const text = () => document.body.textContent;
const click = async label => {
  const button = [...document.querySelectorAll('button')].find(item => item.textContent.trim() === label);
  assert.ok(button, `Button missing: ${label}`);
  await act(async () => button.click());
};
assert.match(text(), /Mit deinem 6Pack-Konto anmelden/);
assert.doesNotMatch(text(), /owner/);
await act(async () => authListener({ uid: 'owner', email: 'test@example.invalid' }));
assert.match(text(), /Live mit Firebase verbunden/);
assert.match(text(), /Bent Knee Windshield Wipers/);
assert.equal(document.querySelector('video').getAttribute('src'), 'https://example.invalid/bent_knee_windshield_wipers.mp4');
assert.match(text(), /auch bei „pending“/);
await click('Ausschnitt bearbeiten');
assert.match(text(), /Ausschnitt speichern/);
await click('Ausschnitt speichern');
assert.deepEqual(calls.at(-1), ['clip', 'bent_knee_windshield_wipers', 0, 20.93]);
await click('Freigeben');
assert.deepEqual(calls.at(-1), ['status', 'bent_knee_windshield_wipers', 'approved']);
await click('Entfernen …');
assert.equal(calls.some(call => Array.isArray(call) && call[0] === 'delete'), false, 'Opening confirmation must not delete');
await click('Behalten');
assert.equal(calls.some(call => Array.isArray(call) && call[0] === 'delete'), false);
const teamButton = [...document.querySelectorAll('.row-link')].find(button => button.textContent.includes('Jackknifes'));
assert.ok(teamButton);
await act(async () => teamButton.click());
assert.equal([...document.querySelectorAll('button')].some(button => button.textContent.trim() === 'Freigeben'), false, 'Non-owner must not see edit actions');
await act(async () => {
  globalThis.__videoControlTest.videoUrl = async () => { throw { code: 'storage/unauthorized' }; };
});
await click('Datei erneut prüfen');
assert.match(document.querySelector('[role="alert"]').textContent, /Zugriff verweigert/);
await act(async () => snapshotError({ code: 'permission-denied' }));
assert.match(text(), /Zugriff verweigert/);
await act(async () => snapshots([], { fromCache: false }));
assert.match(text(), /Noch keine Videos vorhanden/);
await click('Abmelden');
assert.match(text(), /Mit deinem 6Pack-Konto anmelden/);
assert.doesNotMatch(text(), /test@example.invalid/);
assert.ok(calls.includes('unsubscribe'));
console.log('Video-Control: login gate, live list, preview, approval, delete confirmation, owner boundary, errors, empty state and logout passed.');

await import('./test-video-control-cloud.mjs');
await import('./test-video-timeline.mjs');
