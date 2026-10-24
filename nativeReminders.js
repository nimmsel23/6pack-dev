import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { App } from '@capacitor/app';
import { localReminderPlan, isLocalReminder } from './localReminderPlan.js';

export const isNativeApp = Capacitor.isNativePlatform();
let queue = Promise.resolve();

// Serialize replacements so an old Track snapshot cannot overwrite a newer one.
export function syncNativeReminders(program, requestPermission = false) {
  const snapshot = JSON.parse(JSON.stringify(program));
  const operation = queue.catch(() => {}).then(async () => {
    if (snapshot.settings?.reminder?.enabled) {
      const permission = requestPermission
        ? await LocalNotifications.requestPermissions()
        : await LocalNotifications.checkPermissions();
      if (permission.display !== 'granted') throw new Error('Bitte Benachrichtigungen für 6Pack in den Geräteeinstellungen erlauben.');
      if (Capacitor.getPlatform() === 'android') {
        await LocalNotifications.createChannel({ id: 'sixpack-workout', name: 'Workout Reminder', importance: 4, visibility: 1 });
        let exact = await LocalNotifications.checkExactNotificationSetting();
        if (exact.exact_alarm !== 'granted' && requestPermission) exact = await LocalNotifications.changeExactNotificationSetting();
        if (exact.exact_alarm !== 'granted') throw new Error('Bitte für 6Pack „Alarme & Erinnerungen“ erlauben, damit die gewählte Uhrzeit eingehalten wird.');
      }
    }
    const pending = await LocalNotifications.getPending();
    const old = pending.notifications.filter(isLocalReminder).map(({ id }) => ({ id }));
    if (old.length) await LocalNotifications.cancel({ notifications: old });
    const notifications = localReminderPlan(snapshot);
    if (notifications.length) await LocalNotifications.schedule({ notifications });
  });
  queue = operation;
  return operation;
}

export const nativeReminderDelivery = isNativeApp ? { sync: syncNativeReminders } : null;

export async function watchNativeResume(callback) {
  if (!isNativeApp) return () => {};
  const listener = await App.addListener('appStateChange', ({ isActive }) => { if (isActive) callback(); });
  return () => listener.remove();
}
