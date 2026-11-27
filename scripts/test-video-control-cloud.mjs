import assert from 'node:assert/strict';
import vm from 'node:vm';
import { build } from 'esbuild';
const writes = [];
const uploads = [];
const originalTimestamp = { seconds: 12345 };
let existing = { exists: () => true, data: () => ({ uploaderUid: 'owner', createdAt: originalTimestamp }) };
globalThis.__videoControlCloudTest = {
  getApps: () => [{ name: '[DEFAULT]' }],
  getAuth: () => ({ currentUser: { uid: 'owner' }, authStateReady: async () => {} }),
  getFirestore: () => ({}), getStorage: () => ({}), doc: (...parts) => parts, ref: (...parts) => parts,
  getDoc: async () => existing,
  serverTimestamp: () => 'NEW_TIMESTAMP',
  setDoc: async (_, data) => writes.push(data),
  uploadBytesResumable: () => {
    uploads.push(true);
    return { snapshot: { ref: 'uploaded' }, on(_, progress, _error, done) { progress({ bytesTransferred: 100, totalBytes: 100 }); done(); }, cancel() {} };
  },
  getDownloadURL: async () => 'https://example.invalid/clip.mp4',
};
const compiled = await build({ entryPoints: ['exerciseVideoCloud.js'], bundle: true, write: false, format: 'cjs', platform: 'node', plugins: [{ name: 'fake-firebase', setup(builder) {
  builder.onResolve({ filter: /^firebase\// }, args => ({ path: args.path, namespace: 'fake' }));
  builder.onLoad({ filter: /.*/, namespace: 'fake' }, args => {
    const names = {
      'firebase/app': ['getApps'], 'firebase/auth': ['getAuth'],
      'firebase/firestore': ['collection', 'deleteDoc', 'doc', 'getDoc', 'getFirestore', 'onSnapshot', 'serverTimestamp', 'setDoc'],
      'firebase/storage': ['deleteObject', 'getDownloadURL', 'getStorage', 'ref', 'uploadBytesResumable'],
    }[args.path];
    return { contents: names.map(name => `export const ${name} = (...args) => globalThis.__videoControlCloudTest.${name}(...args);`).join('\n') };
  });
} }] });
const module = { exports: {} };
vm.runInThisContext(`(function(module, exports) { ${compiled.outputFiles[0].text}\n})`)(module, module.exports);
const { uploadExerciseVideo } = module.exports;
const request = { exerciseId: 'jackknifes', file: new File(['video'], 'clip.mp4', { type: 'video/mp4' }), durationSeconds: 5 };
await uploadExerciseVideo(request).done;
assert.equal(writes[0].createdAt, originalTimestamp, 'Replacement preserves immutable createdAt required by Rules');
existing = { exists: () => false };
await uploadExerciseVideo(request).done;
assert.equal(writes[1].createdAt, 'NEW_TIMESTAMP');
let finishPreflight;
globalThis.__videoControlCloudTest.getDoc = () => new Promise(resolve => { finishPreflight = resolve; });
const cancelled = uploadExerciseVideo(request);
await Promise.resolve();
cancelled.cancel();
finishPreflight({ exists: () => false });
await assert.rejects(cancelled.done, { code: 'storage/canceled' });
assert.equal(uploads.length, 2, 'Cancel during ownership check must not start a transfer');
assert.equal(writes.length, 2);
console.log('Video-Control cloud: replacement timestamp, new upload timestamp and pre-transfer cancellation passed.');
