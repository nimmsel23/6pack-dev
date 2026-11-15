// Firebase-Zugang des 6Pack-Web-Einstiegs (main.jsx). Fitness bindet die UI ein
// und speichert über @db; dieser direkte Firebase-Zugang bleibt dem Web-Einstieg vorbehalten.
//
// Meldet abgeschlossene Workouts im gemeinsamen Format (workoutDoc.js) nach
// fitness/{uid}/sessions/{date}__{source}-{runId}. Ohne Login/offline landen sie
// in einer localStorage-Outbox und werden beim nächsten Login nachgeschickt
// (deterministische Doc-ID → erneutes Senden ist idempotent).
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as fbSignOut } from 'firebase/auth';
import { buildWorkoutDoc } from './workoutDoc.js';
import { serializeProgram } from './programSync.js';
import { enableSixpackPush as registerSixpackPush, isSixpackPushSupported, listenForSixpackPush } from './push.js';

// Gleiches Firebase-Projekt wie die Fitness-App (fitness-aos). Web-Config ist öffentlich.
import { isNativeApp } from './nativeReminders.js';
import { config } from './firebaseConfig.js';

const OUTBOX_KEY = 'fitness-sixpack-outbox-v1';

const existingApp = getApps().some(app => app.name === '[DEFAULT]');
const app = existingApp ? getApp() : initializeApp(config);
const db = existingApp ? getFirestore(app) : initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  ignoreUndefinedProperties: true,
});
const auth = getAuth(app);

let currentUser = null;
const listeners = new Set();

function readOutbox() {
  try {
    const items = JSON.parse(window.localStorage.getItem(OUTBOX_KEY) || '[]');
    return Array.isArray(items) ? items : [];
  } catch (err) {
    console.warn('[sixpack] Outbox ist nicht lesbar; vorhandener Inhalt bleibt erhalten:', err);
    return [];
  }
}
function writeOutbox(items) {
  try {
    const stored = window.localStorage.getItem(OUTBOX_KEY);
    if (stored && !Array.isArray(JSON.parse(stored))) return false;
    window.localStorage.setItem(OUTBOX_KEY, JSON.stringify(items));
    return true;
  } catch (err) {
    console.warn('[sixpack] Outbox konnte nicht gespeichert werden:', err);
    return false;
  }
}
function pendingFor(uid = currentUser?.uid) {
  return readOutbox().filter(item => {
    const ownerUid = item.ownerUid ?? item.data?.userId ?? null;
    return ownerUid === null || ownerUid === uid;
  }).length;
}
function emit() {
  const state = { user: currentUser, pending: pendingFor() };
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
    const items = readOutbox();
    for (const item of items) {
      const ownerUid = item.ownerUid ?? item.data?.userId ?? null;
      // Guest-Workouts werden beim Login übernommen; fremde Konten bleiben getrennt.
      if (ownerUid !== null && ownerUid !== uid) continue;
      try {
        await writeToFirestore(uid, item);
        writeOutbox(readOutbox().filter((i) => i.docId !== item.docId));
      } catch (err) {
        console.warn('[sixpack] Outbox-Eintrag bleibt liegen:', item.docId, err);
        break;
      }
    }
    emit();
  })().finally(() => { flushing = null; });
  return flushing;
}

// Coach-Klientenliste liest nur fitness/{uid}/profile/metadata. Wer sich nur hier einloggt,
// fehlte dort bisher. Einmalig anlegen; vorhandene Felder (z. B. clientStatus) bleiben unberührt.
async function ensureCoachProfile(user) {
  try {
    const ref = doc(db, 'fitness', user.uid, 'profile', 'metadata');
    if ((await getDoc(ref)).exists()) return;
    await setDoc(ref, {
      displayName: user.displayName || user.email || '',
      email: user.email || '',
      clientStatus: 'friend',
      updated_at: serverTimestamp(),
    }, { merge: true });
  } catch (err) { console.warn('[sixpack] Coach-Profil nicht angelegt:', err); }
}

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  emit();
  if (user) { flushOutbox(); ensureCoachProfile(user); }
});

export function subscribeSync(fn) {
  listeners.add(fn);
  fn({ user: currentUser, pending: pendingFor() });
  return () => listeners.delete(fn);
}

export const signInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOutUser = () => fbSignOut(auth);

// Handler für SixPackPromiseCard.onWorkoutComplete
export function submitWorkout(workout) {
  const built = buildWorkoutDoc({
    ...workout,
    source: workout.source || 'sixpack',
    app: 'sixpack',
    modality: workout.modality || 'core',
    userId: currentUser?.uid || null,
  });
  const item = { docId: built.docId, data: built.data, ownerUid: currentUser?.uid || null };
  const saved = writeOutbox([...readOutbox().filter((i) => i.docId !== item.docId), item]);
  emit();
  if (!saved) {
    if (!currentUser) return Promise.reject(new Error('Workout konnte offline nicht gespeichert werden.'));
    return writeToFirestore(currentUser.uid, item).then(emit);
  }
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

// 6Pack-eigene Push-Registrierung über push.js (dieselbe Funktion wie die Shell).
// Token liegen in users/{uid}/meta/sixpackPush. Die Cloud Function
// scheduledSixpackReminders (functions/index.js) liest dort.
export function enableSixpackPush(uid) {
  return registerSixpackPush(uid, { firebaseApp: app, db, auth });
}

// FCM leitet Nachrichten bei sichtbarer App an die Seite weiter. Der Empfang
// braucht dann denselben sichtbaren Hinweis wie der Hintergrund-Service-Worker.
let stopPushMessages = null;
let pushUserVersion = 0;
onAuthStateChanged(auth, async (user) => {
  const version = ++pushUserVersion;
  stopPushMessages?.();
  stopPushMessages = null;
  if (!user || isNativeApp) return;
  try {
    if (!(await isSixpackPushSupported()) || version !== pushUserVersion) return;
    stopPushMessages = listenForSixpackPush({ firebaseApp: app, auth, uid: user.uid });
  } catch (err) { console.warn('[sixpack] Push-Empfang nicht verfügbar:', err); }
});
