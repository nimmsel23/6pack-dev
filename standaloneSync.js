// NUR für die Standalone-6Pack-App (main.jsx). Die Fitness-App importiert diese
// Datei nie — dort schreibt logExternalWorkout.js über @db, und ein zweites
// Firebase-Bundle würde die App-Instanz doppeln.
//
// Meldet abgeschlossene Workouts im gemeinsamen Format (workoutDoc.js) nach
// fitness/{uid}/sessions/{date}__{source}-{runId}. Ohne Login/offline landen sie
// in einer localStorage-Outbox und werden beim nächsten Login nachgeschickt
// (deterministische Doc-ID → erneutes Senden ist idempotent).
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentSingleTabManager, doc, setDoc, getDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as fbSignOut } from 'firebase/auth';
import { getMessaging, getToken, isSupported as isMessagingSupported } from 'firebase/messaging';
import { buildWorkoutDoc } from './workoutDoc.js';
import { serializeProgram } from './programSync.js';

// Gleiches Firebase-Projekt wie die Fitness-App (fitness-aos). Web-Config ist öffentlich.
import { config, VAPID_KEY } from './firebaseConfig.js';

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

// Programm-Fortschritt (Track-View) pro User: users/{uid}/meta/sixpack.
export async function loadProgram(uid) {
  const snap = await getDoc(doc(db, 'users', uid, 'meta', 'sixpack'));
  return snap.exists() ? snap.data() : null;
}
export function saveProgram(uid, program) {
  return setDoc(doc(db, 'users', uid, 'meta', 'sixpack'), { ...serializeProgram(program), saved_at: serverTimestamp() });
}

// 6Pack-eigene Push-Registrierung: Token liegen in users/{uid}/meta/sixpackPush
// (getrennt vom Fitness-Push-Panel). Die Cloud Function scheduledSixpackReminders liest dort.
export async function enableSixpackPush(uid) {
  if (!uid || uid === 'local') throw new Error('Bitte zuerst anmelden.');
  if (typeof Notification === 'undefined' || !('serviceWorker' in navigator) || !(await isMessagingSupported())) {
    throw new Error('Push wird auf diesem Gerät/Browser nicht unterstützt.');
  }
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') throw new Error('Benachrichtigungen sind blockiert.');
  const registration = await navigator.serviceWorker.register('./sixpack-messaging-sw.js', { scope: './sixpack-push/' });
  const token = await getToken(getMessaging(app), { vapidKey: VAPID_KEY, serviceWorkerRegistration: registration });
  if (!token) throw new Error('Kein Push-Token erhalten.');
  await setDoc(doc(db, 'users', uid, 'meta', 'sixpackPush'), {
    tokens: arrayUnion(token),
    updated_at: serverTimestamp(),
  }, { merge: true });
  return token;
}
