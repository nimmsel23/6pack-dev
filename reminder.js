// Tägliche Trainings-Erinnerung (Settings). Einstellungen liegen im Programm-Dokument
// (`program.settings.reminder`), werden also mit users/{uid}/meta/sixpack synchronisiert.
// Auslieferung über scheduledSixpackReminders (Fitness Functions) und FCM.
// Die UI plant keine Benachrichtigungen mit einem Timer beim App-Start.

export const DEFAULT_REMINDER = { enabled: false, time: '18:00' };
const LAST_KEY = 'fitness-sixpack-reminder-last-v1';

export function getReminder(program) {
  const r = program?.settings?.reminder || {};
  return { enabled: !!r.enabled, time: /^\d{2}:\d{2}$/.test(r.time) ? r.time : DEFAULT_REMINDER.time };
}

// Fällig: aktiviert, Uhrzeit erreicht, heute noch nicht trainiert/erinnert, kein Ruhetag.
export function reminderDue({ reminder, now, today, trainedToday, restToday, lastSent }) {
  if (!reminder.enabled || trainedToday || restToday || lastSent === today) return false;
  const [h, m] = reminder.time.split(':').map(Number);
  return now.getHours() * 60 + now.getMinutes() >= h * 60 + m;
}

export function reminderSupported() {
  return typeof Notification !== 'undefined';
}

export async function requestReminderPermission() {
  if (!reminderSupported()) return 'unsupported';
  if (Notification.permission !== 'default') return Notification.permission;
  try { return await Notification.requestPermission(); } catch { return 'denied'; }
}

export function readLastSent() {
  try { return window.localStorage.getItem(LAST_KEY); } catch { return null; }
}
export function writeLastSent(day) {
  try { window.localStorage.setItem(LAST_KEY, day); } catch { /* privat/voll */ }
}

export async function showReminder(title, body) {
  const options = { body, icon: '/icon-192.png', tag: 'sixpack-reminder' };
  try {
    const reg = await navigator.serviceWorker?.ready;
    if (reg?.showNotification) return reg.showNotification(title, options);
  } catch { /* Fallback unten */ }
  new Notification(title, options);
}

// A newly registered messaging worker is still installing while its Firebase
// scripts load. PushManager.subscribe requires an active worker in THIS scope.
export function waitForActiveWorker(registration, timeoutMs = 20000) {
  if (registration.active) return Promise.resolve(registration);
  const worker = registration.installing || registration.waiting;
  if (!worker) return Promise.reject(new Error('Push-Service-Worker ist nicht verfügbar. Bitte erneut versuchen.'));
  return new Promise((resolve, reject) => {
    const finish = error => {
      clearTimeout(timer);
      worker.removeEventListener('statechange', check);
      if (error) reject(error); else resolve(registration);
    };
    const check = () => {
      if (worker.state === 'activated') finish();
      else if (worker.state === 'redundant') finish(new Error('Push-Service-Worker konnte nicht aktiviert werden.'));
    };
    const timer = setTimeout(() => finish(new Error('Push-Aktivierung dauert zu lange. Bitte mit Internet erneut versuchen.')), timeoutMs);
    worker.addEventListener('statechange', check);
    check();
  });
}
