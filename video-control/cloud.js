import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getFirestore, onSnapshot, updateDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { config } from '../firebaseConfig.js';
import { EXERCISE_VIDEO_COLLECTION, parseExerciseVideoRecord, normalizeClip } from '../exerciseVideo.js';

// photoAuth initialisiert dieselbe Default-App vor dem Aufruf dieser Funktionen.
export async function canManageTeam(user) {
  const token = await user.getIdTokenResult();
  if (token.claims.coach === true || user.uid === '59ole36uNpNwml5H6VDYCXyCME92') return true;
  const role = await getDoc(doc(getFirestore(getApp()), 'roles', user.uid));
  return role.exists() && role.data()?.role === 'coach';
}

export function watchVideos(onChange, onError) {
  return onSnapshot(collection(getFirestore(getApp()), EXERCISE_VIDEO_COLLECTION), { includeMetadataChanges: true }, snapshot => {
    onChange(snapshot.docs.map(item => {
      const data = item.data();
      const parsed = parseExerciseVideoRecord(item.id, data);
      return { ...data, id: item.id, valid: Boolean(parsed), createdAt: data.createdAt?.toDate?.()?.toISOString() || '' };
    }), { fromCache: snapshot.metadata.fromCache });
  }, onError);
}

export function videoUrl(record) {
  if (!record.valid) return Promise.reject(new Error('Ungültige Zuordnung. Übungs-ID und Speicherpfad prüfen.'));
  const storage = getStorage(getApp(), `gs://${config.storageBucket}`);
  return getDownloadURL(ref(storage, record.storagePath));
}

export async function setVideoStatus(id, status) {
  if (!getAuth(getApp()).currentUser) throw new Error('Bitte erneut anmelden.');
  if (!['pending', 'approved'].includes(status)) throw new Error('Ungültiger Status.');
  await updateDoc(doc(getFirestore(getApp()), EXERCISE_VIDEO_COLLECTION, id), { status });
}

export async function setVideoClip(record, start, end) {
  const user = getAuth(getApp()).currentUser;
  if (!user || user.uid !== record.uploaderUid) throw new Error('Nur eigene Videos können geschnitten werden.');
  const clip = normalizeClip(record.duration, start, end);
  if (clip.error || clip.start == null || clip.end == null) throw new Error(clip.error || 'Ungültiger Ausschnitt.');
  await updateDoc(doc(getFirestore(getApp()), EXERCISE_VIDEO_COLLECTION, record.id), {
    clipStart: clip.start, clipEnd: clip.end,
  });
}
