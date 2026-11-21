import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  MAX_VIDEO_BYTES,
  MAX_VIDEO_SECONDS,
  buildExerciseVideoRecord,
  clipLoopHandlers,
  contentTypeForFile,
  exerciseVideoStoragePath,
  mapUploadError,
  parseExerciseVideoRecord,
  resolveExercisePlayback,
  validateExerciseVideo,
} from '../exerciseVideo.js';

const uid = 'friend';
const path = exerciseVideoStoragePath('jackknifes', uid);
const base = {
  exerciseId: 'jackknifes',
  contentType: 'video/mp4',
  sizeBytes: 8 * 1024 * 1024,
  durationSeconds: 12.2,
};

const accepted = validateExerciseVideo(base);
assert.equal(accepted.ok, true);
assert.equal(accepted.duration, 12.2);
assert.equal(accepted.clipStart, null);

const clip = validateExerciseVideo({ ...base, clipStart: 1.25, clipEnd: 9.2 });
assert.equal(clip.ok, true);
assert.deepEqual([clip.clipStart, clip.clipEnd], [1.25, 9.2]);

assert.equal(validateExerciseVideo({ ...base, exerciseId: '../jackknifes' }).ok, false);
assert.equal(validateExerciseVideo({ ...base, exerciseId: 'Jackknifes' }).ok, false);
assert.match(validateExerciseVideo({ ...base, contentType: 'image/jpeg' }).error, /Video/);
assert.match(validateExerciseVideo({ ...base, contentType: '' }).error, /Video/);
assert.match(validateExerciseVideo({ ...base, sizeBytes: MAX_VIDEO_BYTES + 1 }).error, /100 MB/);
assert.match(validateExerciseVideo({ ...base, sizeBytes: 12.5 }).error, /100 MB/);
assert.match(validateExerciseVideo({ ...base, durationSeconds: MAX_VIDEO_SECONDS + 0.01 }).error, /60 Sekunden/);
assert.match(validateExerciseVideo({ ...base, durationSeconds: 0 }).error, /60 Sekunden/);
assert.match(validateExerciseVideo({ ...base, clipStart: 8, clipEnd: 3 }).error, /außerhalb/);
assert.match(validateExerciseVideo({ ...base, clipStart: 1 }).error, /Sekunden/);
assert.match(validateExerciseVideo({ ...base, clipStart: 1, clipEnd: 1.2 }).error, /kurz/);

assert.equal(contentTypeForFile({ type: '', name: 'take.MOV' }), 'video/quicktime');
assert.equal(contentTypeForFile({ type: 'video/webm', name: 'x.bin' }), 'video/webm');
assert.equal(contentTypeForFile({ type: 'application/octet-stream', name: 'notes.txt' }), '');
assert.equal(exerciseVideoStoragePath('jackknifes', '../secret'), null);
assert.equal(exerciseVideoStoragePath('jackknifes', `${'a'.repeat(128)}`), `exerciseVideos/jackknifes/${'a'.repeat(128)}`);
assert.equal(exerciseVideoStoragePath('jackknifes', 'a'.repeat(129)), null);
assert.equal(path, `exerciseVideos/jackknifes/${uid}`);

const built = buildExerciseVideoRecord({
  ...base,
  storagePath: path,
  uploaderUid: 'friend',
  clipStart: clip.clipStart,
  clipEnd: clip.clipEnd,
});
assert.equal(built.ok, true);
assert.equal(built.data.status, 'pending');
assert.equal(built.data.uploaderUid, 'friend');
assert.equal(built.data.storagePath, path);
assert.equal(buildExerciseVideoRecord({ ...base, storagePath: 'exerciseVideos/other/abc', uploaderUid: 'friend' }).ok, false);
assert.equal(buildExerciseVideoRecord({ ...base, storagePath: exerciseVideoStoragePath('jackknifes', 'other'), uploaderUid: 'friend' }).ok, false);
assert.equal(buildExerciseVideoRecord({ ...base, storagePath: path, uploaderUid: 'friend', status: 'draft' }).ok, false);

const parsed = parseExerciseVideoRecord('jackknifes', built.data);
assert.equal(parsed.exerciseId, 'jackknifes');
assert.equal(parsed.clipStart, 1.25);
assert.equal(parseExerciseVideoRecord('other', built.data), null);
assert.equal(parseExerciseVideoRecord('jackknifes', { ...built.data, status: 'rejected' }), null);
assert.equal(parseExerciseVideoRecord('jackknifes', { ...built.data, uploaderUid: 'other' }), null);

const ownUrl = 'https://firebasestorage.googleapis.com/v0/b/fitness-aos.firebasestorage.app/o/exerciseVideos%2Fjackknifes%2Fabc?alt=media';
const fallback = 'https://www.youtube.com/watch?v=Z5Ry2pvbGag';
const own = resolveExercisePlayback({
  exerciseId: 'jackknifes',
  ownVideos: { jackknifes: { ...parsed, url: ownUrl } },
  fallbackUrl: fallback,
});
assert.equal(own.source, 'own');
assert.equal(own.url, ownUrl);
assert.deepEqual(own.clip, { start: 1.25, end: 9.2 });
assert.equal(own.status, 'pending');

const approved = resolveExercisePlayback({
  exerciseId: 'jackknifes',
  ownVideos: { jackknifes: { status: 'approved', url: ownUrl } },
  fallbackUrl: fallback,
});
assert.equal(approved.source, 'own');
assert.equal(approved.clip, null);

assert.equal(resolveExercisePlayback({ exerciseId: 'jackknifes', ownVideos: {}, fallbackUrl: fallback }).url, fallback);
assert.equal(resolveExercisePlayback({
  exerciseId: 'jackknifes',
  ownVideos: { jackknifes: { status: 'pending', url: 'http://insecure.example/a.mp4' } },
  fallbackUrl: fallback,
}).source, 'fallback');
assert.equal(resolveExercisePlayback({ exerciseId: '', ownVideos: { jackknifes: { status: 'approved', url: ownUrl } }, fallbackUrl: '' }).source, 'fallback');

const handlers = clipLoopHandlers({ start: 2, end: 5 });
let time = 0;
const element = {
  get currentTime() { return time; },
  set currentTime(value) { time = value; },
  play() { return Promise.resolve(); },
};
handlers.onTimeUpdate({ currentTarget: element });
assert.equal(time, 2);
time = 4.96;
handlers.onTimeUpdate({ currentTarget: element });
assert.equal(time, 2);
assert.deepEqual(clipLoopHandlers(null), {});

assert.match(mapUploadError({ code: 'storage/unauthorized' }), /anmelden/i);
assert.match(mapUploadError({ code: 'storage/canceled' }), /abgebrochen/i);
assert.match(mapUploadError({ code: 'storage/bucket-not-found' }), /nicht aktiv/);
assert.match(mapUploadError({ code: 'storage/retry-limit-exceeded' }), /Netz/);
assert.equal(mapUploadError({ message: 'token leaked in the error' }), 'Upload fehlgeschlagen. Erneut versuchen.');

const storageRules = readFileSync(new URL('../storage.exercise-videos.rules', import.meta.url), 'utf8');
const firestoreRules = readFileSync(new URL('../firestore.exercise-videos.rules', import.meta.url), 'utf8');
const cloud = readFileSync(new URL('../exerciseVideoCloud.js', import.meta.url), 'utf8');
for (const rules of [storageRules, firestoreRules]) {
  assert.match(rules, /request\.auth != null/);
  assert.match(rules, /video\/\.\+/);
  assert.match(rules, /100 \* 1024 \* 1024/);
  assert.doesNotMatch(rules, /allow read: if true/);
  assert.doesNotMatch(rules, /delete: if false/);
}
assert.match(storageRules, /fileName == request\.auth\.uid/);
assert.match(storageRules, /'uploaderUid' in request\.resource\.metadata/);
assert.match(storageRules, /'uploaderUid' in resource\.metadata/);
assert.match(storageRules, /request\.resource\.metadata\.uploaderUid == request\.auth\.uid/);
assert.match(storageRules, /resource\.metadata\.uploaderUid == request\.auth\.uid/);
assert.match(storageRules, /allow create: if videoUpload\(exerciseId, fileName\)/);
assert.match(storageRules, /allow update: if videoUpload\(exerciseId, fileName\)/);
assert.match(storageRules, /allow delete: if request\.auth != null/);
assert.doesNotMatch(storageRules, /allow update, delete: if false/);
assert.match(firestoreRules, /allow create: if resource == null/);
assert.match(firestoreRules, /allow update: if resource != null/);
assert.match(firestoreRules, /allow delete: if resource != null/);
assert.match(firestoreRules, /videoData\(\)\.uploaderUid == request\.auth\.uid/);
assert.match(firestoreRules, /resource\.data\.uploaderUid == request\.auth\.uid/);
assert.match(firestoreRules, /request\.resource\.data\.uploaderUid == resource\.data\.uploaderUid/);
assert.match(firestoreRules, /isCoach\(\)/);
assert.doesNotMatch(firestoreRules, /function isCoach\(/);
assert.match(firestoreRules, /exerciseVideos\/' \+ exerciseId \+ '\/' \+ videoData\(\)\.uploaderUid/);
assert.match(firestoreRules, /'pending', 'approved'/);
assert.match(firestoreRules, /duration <= 60/);
assert.equal(MAX_VIDEO_SECONDS, 60);
assert.equal(MAX_VIDEO_BYTES, 100 * 1024 * 1024);
assert.match(firestoreRules, /Nicht allein deployen/);
assert.match(cloud, /exerciseVideoStoragePath\(exerciseId,\s*uid\)/);
assert.match(cloud, /customMetadata:\s*\{\s*uploaderUid:\s*uid\s*\}/);
assert.doesNotMatch(cloud, /newVideoFileId/);

console.log('Exercise video mapping: validation, path, clip, fallback preference and rules limits passed.');
