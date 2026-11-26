// Upload und Abo für eigene Übungsvideos. Dateien liegen in Firebase Storage,
// die Zuordnung in Firestore. Die bestehende App-Instanz wird wiederverwendet.

import { getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { config } from './firebaseConfig.js';
import {
  EXERCISE_VIDEO_COLLECTION,
  buildExerciseVideoRecord,
  contentTypeForFile,
  exerciseVideoStoragePath,
  mapDeleteError,
  mapUploadError,
  parseExerciseVideoRecord,
} from './exerciseVideo.js';

const BUCKET = `gs://${config.storageBucket}`;

function hostApp() {
  const apps = getApps();
  return apps.find(app => app.name === '[DEFAULT]') || apps[0] || null;
}

function services() {
  const app = hostApp();
  if (!app) return null;
  return { app, db: getFirestore(app), storage: getStorage(app, BUCKET), auth: getAuth(app) };
}

export function watchExerciseVideos(onChange) {
  const live = services();
  if (!live) {
    onChange({});
    return () => {};
  }
  let ticket = 0;
  return onSnapshot(collection(live.db, EXERCISE_VIDEO_COLLECTION), (snap) => {
    const mine = ++ticket;
    Promise.all(snap.docs.map(async (docSnap) => {
      const record = parseExerciseVideoRecord(docSnap.id, docSnap.data());
      if (!record) return null;
      try {
        const url = await getDownloadURL(ref(live.storage, record.storagePath));
        return [record.exerciseId, { ...record, url }];
      } catch {
        // Ohne URL spielt der Fallback; die Zuordnung bleibt für die Besitzprüfung.
        return [record.exerciseId, { ...record, url: '' }];
      }
    })).then((entries) => {
      if (mine !== ticket) return;
      onChange(Object.fromEntries(entries.filter(Boolean)));
    }).catch(() => {
      if (mine === ticket) onChange({});
    });
  }, () => onChange({}));
}

function waitForTask(task, onProgress) {
  return new Promise((resolve, reject) => {
    task.on('state_changed', (snapshot) => {
      const total = snapshot.totalBytes || 0;
      onProgress?.({
        loaded: snapshot.bytesTransferred,
        total,
        ratio: total > 0 ? snapshot.bytesTransferred / total : 0,
      });
    }, reject, () => resolve(task.snapshot));
  });
}

// Resumable Upload. `cancel` bricht den laufenden Task ab.
// Pfad ist exerciseVideos/{exerciseId}/{uid}: höchstens ein Objekt pro Konto
// und Übung. Ein erneuter Upload überschreibt dieses Objekt.
export function uploadExerciseVideo({
  exerciseId, file, durationSeconds, clipStart, clipEnd, onProgress,
} = {}) {
  let task = null;
  let cancelled = false;
  const done = (async () => {
    const contentType = contentTypeForFile(file);
    const sizeBytes = Number.isInteger(file?.size) ? file.size : 0;
    const live = services();
    if (!live) {
      const error = new Error('Firebase ist in dieser Ansicht nicht bereit.');
      error.code = 'storage/unauthenticated';
      throw error;
    }
    if (live.auth.authStateReady) await live.auth.authStateReady();
    if (cancelled) {
      const error = new Error('Upload abgebrochen.');
      error.code = 'storage/canceled';
      throw error;
    }
    const uid = live.auth.currentUser?.uid;
    if (!uid) {
      const error = new Error('Bitte anmelden und erneut versuchen.');
      error.code = 'storage/unauthenticated';
      throw error;
    }
    // Vor dem Upload: gehört die Zuordnung schon einem anderen Konto, lehnen
    // die Rules das Dokument ab. Dann gar nicht erst hochladen.
    const docRef = doc(live.db, EXERCISE_VIDEO_COLLECTION, exerciseId);
    const existing = await getDoc(docRef).catch(() => null);
    const previousUid = existing?.exists?.() ? existing.data()?.uploaderUid : null;
    if (previousUid && previousUid !== uid) {
      const error = new Error('Für diese Übung hat schon ein anderes Konto ein Video hinterlegt.');
      error.code = 'exercise-video/taken';
      throw error;
    }
    const storagePath = exerciseVideoStoragePath(exerciseId, uid);
    const built = buildExerciseVideoRecord({
      exerciseId,
      storagePath,
      uploaderUid: uid,
      contentType,
      sizeBytes,
      durationSeconds,
      clipStart,
      clipEnd,
      status: 'pending',
    });
    if (!built.ok) {
      const error = new Error(built.error);
      error.code = 'exercise-video/invalid';
      throw error;
    }
    task = uploadBytesResumable(ref(live.storage, storagePath), file, {
      contentType,
      customMetadata: { uploaderUid: uid },
    });
    await waitForTask(task, onProgress);
    const payload = { ...built.data, createdAt: serverTimestamp() };
    try {
      await setDoc(docRef, payload);
    } catch (error) {
      // Neue Datei ohne Zuordnung nicht liegen lassen. Eine ersetzte Datei
      // bleibt, die bisherige Zuordnung zeigt weiter auf denselben Pfad.
      if (!previousUid) await deleteObject(task.snapshot.ref).catch(() => {});
      throw error;
    }
    const url = await getDownloadURL(task.snapshot.ref);
    return { exerciseId, url, status: 'pending', storagePath };
  })().catch((error) => {
    const wrapped = new Error(mapUploadError(error));
    wrapped.code = error?.code || 'exercise-video/failed';
    throw wrapped;
  });
  return {
    done,
    cancel() {
      cancelled = true;
      try { task?.cancel(); } catch { /* Der Task ist schon fertig. */ }
    },
  };
}

// Entfernt die eigene Zuordnung und die Datei. Erst das Dokument, damit
// Detailansicht und Runner sofort zum Fallback zurückkehren.
export async function deleteExerciseVideo(exerciseId) {
  try {
    const live = services();
    if (!live) {
      const error = new Error('Firebase ist in dieser Ansicht nicht bereit.');
      error.code = 'storage/unauthenticated';
      throw error;
    }
    if (live.auth.authStateReady) await live.auth.authStateReady();
    const uid = live.auth.currentUser?.uid;
    const storagePath = uid ? exerciseVideoStoragePath(exerciseId, uid) : null;
    if (!storagePath) {
      const error = new Error('Bitte anmelden und erneut versuchen.');
      error.code = 'storage/unauthenticated';
      throw error;
    }
    const docRef = doc(live.db, EXERCISE_VIDEO_COLLECTION, exerciseId);
    const existing = await getDoc(docRef);
    if (existing.exists()) {
      if (existing.data()?.uploaderUid !== uid) {
        const error = new Error('Dieses Video gehört einem anderen Konto.');
        error.code = 'exercise-video/taken';
        throw error;
      }
      await deleteDoc(docRef);
    }
    await deleteObject(ref(live.storage, storagePath)).catch((error) => {
      if (error?.code !== 'storage/object-not-found') throw error;
    });
    return { exerciseId };
  } catch (error) {
    const wrapped = new Error(mapDeleteError(error));
    wrapped.code = error?.code || 'exercise-video/failed';
    throw wrapped;
  }
}
