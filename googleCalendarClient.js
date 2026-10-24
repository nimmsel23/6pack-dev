import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

function host(uid) {
  const app = getApp(); // reuse the initialized Standalone/Fitness host, never initialize a second app
  if (!uid || uid === 'local' || getAuth(app).currentUser?.uid !== uid) throw new Error('Bitte zuerst mit deinem Google-Konto anmelden.');
  return app;
}
export function watchCalendar(uid, callback, onError) {
  return onSnapshot(doc(getFirestore(host(uid)), 'users', uid, 'meta', 'sixpackCalendar'),
    snapshot => callback(snapshot.data() || { connected: false }), onError);
}
export async function connectCalendar(uid) {
  const app = host(uid);
  // Open synchronously from the button gesture; the authenticated server then
  // supplies the OAuth URL. No Firebase ID/access token appears in any URL.
  const popup = window.open('about:blank', '_blank', 'popup,width=520,height=720');
  if (!popup) throw new Error('Bitte das Google-Anmeldefenster für diese App erlauben.');
  try {
    const result = await httpsCallable(getFunctions(app, 'europe-west1'), 'sixpackCalendarBegin')({ timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    const url = new URL(result.data.url);
    if (url.origin !== 'https://accounts.google.com') throw new Error('Ungültige Google-Anmeldeadresse.');
    if (getAuth(app).currentUser?.uid !== uid) throw new Error('Das angemeldete Konto hat sich geändert.');
    popup.location.replace(url.href);
  } catch (error) { popup.close(); throw error; }
}
export async function disconnectCalendar(uid) {
  return httpsCallable(getFunctions(host(uid), 'europe-west1'), 'sixpackCalendarDisconnect')({});
}
