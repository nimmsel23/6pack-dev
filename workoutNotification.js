import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

// Benachrichtigung während des Workouts. Die App läuft als PWA (Firebase Hosting) → Web-Weg ist der Standard,
// der native Capacitor-Weg (Android, ongoing) greift nur in einem nativen Build.
// ID liegt außerhalb des Reminder-Bereichs (localReminderPlan: 620000+), damit syncNativeReminders sie nie abräumt.
const NOTIFICATION_ID = 610000;
const CHANNEL_ID = 'sixpack-workout-live';
const WEB_TAG = 'sixpack-workout-live';
const native = Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
let ready = null;

function ensureNativeReady() {
  if (!ready) {
    ready = (async () => {
      let permission = await LocalNotifications.checkPermissions();
      if (permission.display !== 'granted') permission = await LocalNotifications.requestPermissions();
      if (permission.display !== 'granted') return false;
      // Niedrige Wichtigkeit = lautlos: Töne und Ansagen kommen vom Runner, nicht von der Notification.
      await LocalNotifications.createChannel({ id: CHANNEL_ID, name: 'Workout läuft', importance: 2, visibility: 1 });
      return true;
    })().catch(() => false);
  }
  return ready;
}

// Direkt im Tap auf "Start Workout" aufrufen: Browser verlangen für die Berechtigungsfrage eine Nutzergeste.
export async function requestWorkoutNotificationPermission() {
  try {
    if (native) return await ensureNativeReady();
    if (typeof Notification === 'undefined') return false;
    if (Notification.permission === 'default') await Notification.requestPermission();
    return Notification.permission === 'granted';
  } catch {
    return false;
  }
}

// Der Service Worker, der die Seite kontrolliert, muss die Notification zeigen (Android-Chrome erlaubt
// `new Notification()` nicht). Ohne aktiven Worker nicht ewig warten.
async function webRegistration() {
  if (!('serviceWorker' in navigator)) return null;
  return Promise.race([
    navigator.serviceWorker.ready,
    new Promise(resolve => window.setTimeout(() => resolve(null), 1500)),
  ]);
}

// Gleiche ID/Tag = vorhandene Benachrichtigung wird ersetzt, nicht gestapelt.
export async function showWorkoutNotification({ title, body }) {
  try {
    if (native) {
      if (!(await ensureNativeReady())) return;
      await LocalNotifications.schedule({
        notifications: [{ id: NOTIFICATION_ID, title, body, channelId: CHANNEL_ID, ongoing: true, autoCancel: false, extra: { app: 'sixpack', kind: 'workout-live' } }],
      });
      return;
    }
    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const registration = await webRegistration();
    // silent: keine Töne/Vibration; requireInteraction: bleibt stehen, bis sie geschlossen wird (Android/Desktop).
    if (registration?.showNotification) await registration.showNotification(title, { body, tag: WEB_TAG, icon: '/icon-192.png', silent: true, renotify: false, requireInteraction: true });
  } catch {
    // Die Benachrichtigung ist optional — der Runner läuft auch ohne.
  }
}

export async function clearWorkoutNotification() {
  try {
    if (native) {
      await LocalNotifications.cancel({ notifications: [{ id: NOTIFICATION_ID }] });
      return;
    }
    const registration = await webRegistration();
    (await registration?.getNotifications?.({ tag: WEB_TAG }))?.forEach(n => n.close());
  } catch {
    // nichts zu entfernen
  }
}
