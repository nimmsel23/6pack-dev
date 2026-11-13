// 6Pack-Push auf einer bestehenden Firebase-App.
// Kein initializeApp: die Shell übergibt ihre App (oder eine Messaging-Instanz),
// die Standalone-App ihre bereits initialisierte Instanz aus standaloneSync.js.
import { getAuth } from 'firebase/auth';
import { arrayUnion, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { getMessaging, getToken, isSupported as isMessagingSupported, onMessage } from 'firebase/messaging';
import { VAPID_KEY } from './firebaseConfig.js';
import { waitForActiveWorker } from './reminder.js';

export function isSixpackPushSupported() {
  return isMessagingSupported();
}

function resolveMessaging({ firebaseApp, messaging }) {
  if (messaging) return messaging;
  if (!firebaseApp) {
    throw new Error('6Pack-Push braucht die Firebase-App des Hosts (firebaseApp) oder eine Messaging-Instanz.');
  }
  return getMessaging(firebaseApp);
}

function resolveDb({ firebaseApp, db }) {
  if (db) return db;
  if (!firebaseApp) {
    throw new Error('6Pack-Push braucht die Firebase-App des Hosts (firebaseApp) oder eine Firestore-Instanz.');
  }
  return getFirestore(firebaseApp);
}

function resolveAuth({ firebaseApp, auth }) {
  if (auth) return auth;
  if (!firebaseApp) return null;
  return getAuth(firebaseApp);
}

// Token nach users/{uid}/meta/sixpackPush. Die Cloud Function
// scheduledSixpackReminders liest dort. serviceWorkerUrl/Scope haben die
// Standalone-Defaults; die Shell setzt ihre eigenen Pfade.
export async function enableSixpackPush(uid, {
  firebaseApp,
  messaging,
  db,
  auth,
  vapidKey = VAPID_KEY,
  serviceWorkerUrl = './sixpack-messaging-sw.js',
  serviceWorkerScope = './sixpack-push/',
} = {}) {
  if (!uid || uid === 'local') throw new Error('Bitte zuerst anmelden.');
  if (typeof Notification === 'undefined' || !('serviceWorker' in navigator) || !(await isMessagingSupported())) {
    throw new Error('Push wird auf diesem Gerät/Browser nicht unterstützt.');
  }
  if (Notification.permission !== 'granted') throw new Error('Benachrichtigungen sind blockiert.');
  const registration = await navigator.serviceWorker.register(serviceWorkerUrl, { scope: serviceWorkerScope });
  await waitForActiveWorker(registration);
  const token = await getToken(resolveMessaging({ firebaseApp, messaging }), {
    vapidKey,
    serviceWorkerRegistration: registration,
  });
  if (!token) throw new Error('Kein Push-Token erhalten.');
  const userAuth = resolveAuth({ firebaseApp, auth });
  if (!userAuth || userAuth.currentUser?.uid !== uid) {
    throw new Error('Das angemeldete Konto hat sich geändert. Bitte erneut versuchen.');
  }
  await setDoc(doc(resolveDb({ firebaseApp, db }), 'users', uid, 'meta', 'sixpackPush'), {
    tokens: arrayUnion(token),
    updated_at: serverTimestamp(),
  }, { merge: true });
  return token;
}

// Vordergrund-Empfang: gleiche Anzeige wie der Standalone-Service-Worker.
// Gibt die Abmeldefunktion von onMessage zurück.
export function listenForSixpackPush({
  firebaseApp,
  messaging,
  auth,
  uid,
  serviceWorkerScope = './sixpack-push/',
} = {}) {
  return onMessage(resolveMessaging({ firebaseApp, messaging }), async (payload) => {
    if (auth?.currentUser?.uid !== uid || payload?.data?.app !== 'sixpack') return;
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    try {
      const registration = await navigator.serviceWorker.getRegistration(new URL(serviceWorkerScope, window.location.href).href);
      if (!registration || auth?.currentUser?.uid !== uid) return;
      await registration.showNotification(payload.data.title || '6Pack', {
        body: payload.data.body || 'Zeit fürs Training',
        icon: new URL('./icon-192.png', window.location.href).href,
        tag: 'sixpack-reminder',
        data: { link: new URL('./', window.location.href).href },
      });
    } catch (err) { console.warn('[sixpack] Push anzeigen fehlgeschlagen:', err); }
  });
}
