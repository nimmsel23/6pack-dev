import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { localReminderPlan, isLocalReminder } from '../localReminderPlan.js';

const base = { currentDay: 1, settings: { reminder: { enabled: true, time: '18:00' } } };
const now = new Date(2026, 9, 24, 17);
let plan = localReminderPlan(base, now);
assert.equal(plan.length, 60);
assert.equal(plan[0].schedule.at.getHours(), 18);
assert(plan.every(n => n.extra.day === 1)); // missing a workout never advances Track
assert.equal(new Set(plan.map(n => n.id)).size, plan.length);
assert(plan.every(isLocalReminder));
assert.equal(isLocalReminder({ id: 99 }), false);
assert.equal(localReminderPlan({ ...base, settings: { reminder: { enabled: false, time: '18:00' } } }, now).length, 0);
assert.equal(localReminderPlan({ ...base, settings: { reminder: { enabled: true, time: '25:00' } } }, now).length, 0);
assert.equal(localReminderPlan(base, new Date(2026, 9, 24, 19))[0].schedule.at.getDate(), 25);
plan = localReminderPlan({ ...base, currentDay: 2, lastCompletedOn: '2026-10-24' }, now);
assert.equal(plan[0].schedule.at.getDate(), 25); // today's completion cancels today's reminder
plan = localReminderPlan({ ...base, currentDay: 3, restDate: '2026-10-24' }, now);
assert.equal(plan[0].schedule.at.getDate(), 25);
assert.equal(plan[0].extra.day, 4);
plan = localReminderPlan({ ...base, currentDay: 7, lastCompletedOn: '2026-10-23' }, now);
assert.equal(plan[0].schedule.at.getDate(), 25);
assert.equal(plan[0].extra.day, 8);
assert(plan.every(n => n.schedule.at.getHours() === 18)); // includes DST change in Europe/Vienna

let background;
const events = {};
const shown = [];
let opened;
const self = {
  registration: { scope: 'https://example.org/apps/6pack/sixpack-push/', showNotification: async (...args) => shown.push(args) },
  location: { origin: 'https://example.org' },
  clients: { matchAll: async () => [], openWindow: async url => { opened = url; } },
  addEventListener: (type, callback) => { events[type] = callback; },
};
vm.runInNewContext(await readFile(new URL('../public/sixpack-messaging-sw.js', import.meta.url), 'utf8'), {
  self, URL,
  importScripts: () => assert(events.notificationclick, 'click handler must precede Firebase imports'),
  firebase: { initializeApp() {}, messaging: () => ({ onBackgroundMessage: callback => { background = callback; } }) },
});
await background({ data: { app: 'sixpack', body: 'Workout' } });
assert.equal(shown.length, 1);
assert.equal(shown[0][1].data.link, 'https://example.org/apps/6pack/');
await background({ data: { app: 'fitness' } });
await background({ data: { app: 'sixpack' }, notification: { title: 'Auto-displayed by FCM' } });
assert.equal(shown.length, 1, 'do not double-display notification payloads');
let completion;
events.notificationclick({ notification: { close() {} }, waitUntil: promise => { completion = promise; } });
await completion;
assert.equal(opened, 'https://example.org/apps/6pack/');
console.log('Reminders: offline Track scheduling, completion/rest suppression, DST, background receipt, duplicate suppression and closed-app click passed.');

// Exercise the actual native bridge against a fake OS, including replacement
// ordering and disabled reminders. No personal account, server or device data.
const { transformWithEsbuild } = await import('vite');
const { code } = await transformWithEsbuild(await readFile(new URL('../nativeReminders.js', import.meta.url), 'utf8'), 'nativeReminders.js', { format: 'cjs' });
const calls = [];
let permission = 'granted';
const plugin = {
  requestPermissions: async () => ({ display: permission }),
  checkPermissions: async () => ({ display: permission }),
  getPending: async () => ({ notifications: [{ id: 620000 }, { id: 123 }] }),
  cancel: async options => { calls.push(['cancel', options]); },
  schedule: async options => { calls.push(['schedule', options]); },
};
const nativeModule = { exports: {} };
vm.runInNewContext(code, {
  module: nativeModule, exports: nativeModule.exports, JSON,
  require: name => ({
    '@capacitor/core': { Capacitor: { isNativePlatform: () => true, getPlatform: () => 'ios' } },
    '@capacitor/local-notifications': { LocalNotifications: plugin },
    '@capacitor/app': { App: {} },
    './localReminderPlan.js': { localReminderPlan, isLocalReminder },
  })[name],
});
await nativeModule.exports.syncNativeReminders(base, true);
assert.equal(calls[0][0], 'cancel');
assert.equal(calls[0][1].notifications.length, 1); // preserve unrelated notifications
assert.equal(calls[0][1].notifications[0].id, 620000);
assert.equal(calls[1][0], 'schedule');
permission = 'denied';
await assert.rejects(nativeModule.exports.syncNativeReminders(base), /Benachrichtigungen/);
assert.equal(calls.length, 2, 'permission failure must not report or overwrite a successful plan');
await nativeModule.exports.syncNativeReminders({ ...base, settings: {} });
assert.equal(calls.length, 3); // cancellation works even with permission denied
assert.equal(calls[2][0], 'cancel');
console.log('Native bridge: permission errors, OS plan replacement and disabling passed.');

const { waitForActiveWorker } = await import('../reminder.js');
const active = { active: {} };
assert.equal(await waitForActiveWorker(active), active);
const listeners = new Set();
const installing = {
  state: 'installing',
  addEventListener: (_, listener) => listeners.add(listener),
  removeEventListener: (_, listener) => listeners.delete(listener),
};
const registration = { installing };
const activation = waitForActiveWorker(registration);
installing.state = 'activated';
for (const listener of listeners) listener();
assert.equal(await activation, registration);
assert.equal(listeners.size, 0);
installing.state = 'redundant';
await assert.rejects(waitForActiveWorker(registration), /aktiviert/);
assert.equal(listeners.size, 0);
await assert.rejects(waitForActiveWorker({}), /nicht verfügbar/);
console.log('Push registration: waits for worker activation and reports failed installation.');
