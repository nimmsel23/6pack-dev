// Regeln für eigene Übungsvideos gegen den lokalen Emulator.
// Ohne laufenden Emulator startet das Skript einen isolierten demo-sixpack
// (nur 127.0.0.1) und prüft sich dort selbst. isCoach() im Fragment ist die
// vorhandene Prüfung aus vitalos/firestore.rules; hier nur ein Test-Double.

import { spawn } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { deleteDoc, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { deleteObject, getMetadata, ref, uploadBytes } from 'firebase/storage';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const projectId = 'demo-sixpack';
const loopback = /^127\.0\.0\.1:\d+$/;
const firestoreHost = process.env.FIRESTORE_EMULATOR_HOST || '';
const storageHost = process.env.FIREBASE_STORAGE_EMULATOR_HOST || '';

if (loopback.test(firestoreHost) && loopback.test(storageHost)) {
  await run();
} else if (firestoreHost || storageHost) {
  throw new Error(`Only an isolated loopback emulator is allowed (firestore=${firestoreHost}, storage=${storageHost}).`);
} else {
  process.exit(await startEmulator());
}

function emulatorFirestoreRules(fragment) {
  const marker = 'match /databases/{database}/documents {';
  if (!fragment.includes(marker) || fragment.includes('function isCoach(')) {
    throw new Error('Firestore-Fragment lässt sich nicht mit dem isCoach-Double laden.');
  }
  return fragment.replace(marker, `${marker}
    function isCoach() {
      return request.auth != null
        && 'coach' in request.auth.token
        && request.auth.token.coach == true;
    }`);
}

function record(uid, extra = {}) {
  return {
    exerciseId: 'jackknifes',
    storagePath: `exerciseVideos/jackknifes/${uid}`,
    uploaderUid: uid,
    duration: 12.2,
    status: 'pending',
    contentType: 'video/mp4',
    sizeBytes: 1024,
    clipStart: 1.25,
    clipEnd: 9.2,
    createdAt: serverTimestamp(),
    ...extra,
  };
}

async function run() {
  const firestoreRules = emulatorFirestoreRules(readFileSync(join(root, 'firestore.exercise-videos.rules'), 'utf8'));
  const storageRules = readFileSync(join(root, 'storage.exercise-videos.rules'), 'utf8');
  const testEnv = await initializeTestEnvironment({
    projectId,
    firestore: { rules: firestoreRules },
    storage: { rules: storageRules },
  });
  try {
    await checkFirestore(testEnv);
    await checkStorage(testEnv);
    console.log('Exercise video rules: foreign account denied, uploader and coach allowed, signed-out denied.');
  } finally {
    await testEnv.cleanup();
  }
}

async function checkFirestore(testEnv) {
  const alice = testEnv.authenticatedContext('alice');
  const bob = testEnv.authenticatedContext('bob');
  const coach = testEnv.authenticatedContext('coachuser', { coach: true });
  const anon = testEnv.unauthenticatedContext();
  const path = (context) => doc(context.firestore(), 'exerciseVideos', 'jackknifes');

  await assertFails(getDoc(path(anon)));
  await assertFails(setDoc(path(anon), record('alice')));
  await assertFails(setDoc(path(alice), record('alice', { storagePath: 'exerciseVideos/jackknifes/bob' })));
  await assertFails(setDoc(path(alice), record('bob')));
  await assertSucceeds(setDoc(path(alice), record('alice')));
  await assertSucceeds(getDoc(path(bob)));
  await assertFails(setDoc(path(bob), record('bob')));
  await assertFails(deleteDoc(path(bob)));
  await assertFails(setDoc(path(alice), record('bob')));
  await assertSucceeds(setDoc(path(alice), record('alice', { status: 'approved' })));
  await assertSucceeds(deleteDoc(path(alice)));
  await assertSucceeds(setDoc(path(alice), record('alice')));
  await assertSucceeds(setDoc(path(coach), record('alice', { status: 'approved' })));
  await assertFails(setDoc(path(coach), record('coachuser')));
  await assertFails(deleteDoc(path(anon)));
  await assertSucceeds(deleteDoc(path(coach)));
}

async function checkStorage(testEnv) {
  const alice = testEnv.authenticatedContext('alice');
  const bob = testEnv.authenticatedContext('bob');
  const anon = testEnv.unauthenticatedContext();
  const bytes = new Uint8Array([1, 2, 3, 4]);
  const own = (context, uid) => ref(context.storage(), `exerciseVideos/jackknifes/${uid}`);
  const meta = (uid) => ({ contentType: 'video/mp4', customMetadata: { uploaderUid: uid } });

  await assertFails(uploadBytes(own(anon, 'alice'), bytes, meta('alice')));
  await assertFails(getMetadata(own(anon, 'alice')));
  await assertFails(uploadBytes(own(alice, 'alice'), new Uint8Array(), meta('alice')));
  await assertFails(uploadBytes(own(alice, 'alice'), bytes, { contentType: 'image/jpeg', customMetadata: { uploaderUid: 'alice' } }));
  await assertFails(uploadBytes(own(alice, 'alice'), bytes, { contentType: 'video/mp4', customMetadata: { uploaderUid: 'bob' } }));
  await assertFails(uploadBytes(own(alice, 'alice'), bytes, { contentType: 'video/mp4' }));
  await assertSucceeds(uploadBytes(own(alice, 'alice'), bytes, meta('alice')));
  await assertSucceeds(uploadBytes(own(alice, 'alice'), new Uint8Array([5, 6, 7, 8]), meta('alice')));
  await assertSucceeds(getMetadata(own(bob, 'alice')));
  await assertFails(uploadBytes(own(bob, 'alice'), bytes, meta('bob')));
  await assertFails(uploadBytes(ref(bob.storage(), 'exerciseVideos/jackknifes/bob-extra'), bytes, meta('bob')));
  await assertFails(deleteObject(own(bob, 'alice')));
  await assertFails(deleteObject(own(anon, 'alice')));
  await assertSucceeds(uploadBytes(own(bob, 'bob'), bytes, meta('bob')));
  await assertSucceeds(deleteObject(own(alice, 'alice')));
  await assertSucceeds(deleteObject(own(bob, 'bob')));
}

function startEmulator() {
  const dir = mkdtempSync(join(tmpdir(), 'exercise-video-rules-'));
  const fragment = readFileSync(join(root, 'firestore.exercise-videos.rules'), 'utf8');
  writeFileSync(join(dir, 'firestore.rules'), emulatorFirestoreRules(fragment));
  writeFileSync(join(dir, 'storage.exercise-videos.rules'), readFileSync(join(root, 'storage.exercise-videos.rules')));
  writeFileSync(join(dir, 'firebase.json'), JSON.stringify({
    firestore: { rules: 'firestore.rules' },
    storage: { rules: 'storage.exercise-videos.rules' },
    emulators: {
      firestore: { host: '127.0.0.1', port: 8765 },
      storage: { host: '127.0.0.1', port: 9198 },
      hub: { host: '127.0.0.1', port: 4408 },
      logging: { host: '127.0.0.1', port: 4508 },
      ui: { enabled: false },
    },
  }));
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', [
      '--package', 'firebase-tools@15.34.0',
      'dlx', 'firebase',
      'emulators:exec',
      '--only', 'firestore,storage',
      '--project', projectId,
      `${process.execPath} ${fileURLToPath(import.meta.url)}`,
    ], {
      cwd: dir,
      stdio: 'inherit',
      env: { ...process.env, CI: '1' },
    });
    const timer = setTimeout(() => {
      child.kill('SIGTERM');
      reject(new Error('Emulator-Test hat das Zeitlimit überschritten.'));
    }, 8 * 60 * 1000);
    child.on('error', (error) => {
      clearTimeout(timer);
      rmSync(dir, { recursive: true, force: true });
      reject(error);
    });
    child.on('exit', (code) => {
      clearTimeout(timer);
      rmSync(dir, { recursive: true, force: true });
      resolve(code ?? 1);
    });
  });
}
