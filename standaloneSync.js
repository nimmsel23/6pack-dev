// NUR für die Standalone-6Pack-App (main.jsx). Die Fitness-App importiert diese
// Datei nie — dort schreibt logExternalWorkout.js über @db, und ein zweites
// Firebase-Bundle würde die App-Instanz doppeln.
//
// Meldet abgeschlossene Workouts im gemeinsamen Format (workoutDoc.js) nach
// fitness/{uid}/sessions/{date}__{source}-{runId}. Ohne Login/offline landen sie
// in einer localStorage-Outbox und werden beim nächsten Login nachgeschickt
// (deterministische Doc-ID → erneutes Senden ist idempotent).
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as fbSignOut } from 'firebase/auth';
import { buildWorkoutDoc } from './workoutDoc.js';

// Gleiches Firebase-Projekt wie die Fitness-App (fitness-aos). Web-Config ist öffentlich.
import { config } from './firebaseConfig.js';

const OUTBOX_KEY = 'fitness-sixpack-outbox-v1';

const app = getApps().length ? getApp() : initializeApp(config);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() }),
  ignoreUndefinedProperties: true,
});
const auth = getAuth(app);

let currentUser = null;
const listeners = new Set();

function readOutbox() {
  try { return JSON.parse(window.localStorage.getItem(OUTBOX_KEY) || '[]'); } catch { return []; }
}
function writeOutbox(items) {
  try { window.localStorage.setItem(OUTBOX_KEY, JSON.stringify(items)); } catch { /* voll/privat — dann bleibt nur der Direktversuch */ }
}
function emit() {
  const state = { user: currentUser, pending: readOutbox().length };
  listeners.forEach((fn) => fn(state));
}

async function writeToFirestore(uid, item) {
  await setDoc(
    doc(db, 'fitness', uid, 'sessions', item.docId),
    { ...item.data, userId: uid, saved_at: serverTimestamp() },
  );
}

let flushing = null;
export function flushOutbox() {
  if (!currentUser) return Promise.resolve();
  if (flushing) return flushing;
  flushing = (async () => {
    const uid = currentUser.uid;
    let items = readOutbox();
    for (const item of items) {
      try {
        await writeToFirestore(uid, item);
        items = readOutbox().filter((i) => i.docId !== item.docId);
        writeOutbox(items);
      } catch (err) {
        console.warn('[sixpack] Outbox-Eintrag bleibt liegen:', item.docId, err);
        break;
      }
    }
    emit();
  })().finally(() => { flushing = null; });
  return flushing;
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  emit();
  if (user) flushOutbox();
});

export function subscribeSync(fn) {
  listeners.add(fn);
  fn({ user: currentUser, pending: readOutbox().length });
  return () => listeners.delete(fn);
}

export const signInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOutUser = () => fbSignOut(auth);

// Handler für SixPackPromiseCard.onWorkoutComplete
export function submitWorkout(workout) {
  const built = buildWorkoutDoc({
    ...workout,
    source: workout.source || 'sixpack',
    app: 'sixpack-standalone',
    modality: workout.modality || 'core',
    userId: currentUser?.uid || null,
  });
  const item = { docId: built.docId, data: built.data };
  writeOutbox([...readOutbox().filter((i) => i.docId !== item.docId), item]);
  emit();
  return flushOutbox();
}
