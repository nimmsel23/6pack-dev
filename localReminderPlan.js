import { trainingDates } from './functions/trackSchedule.mjs';
// Same Track rules as SixPackApp: incomplete workouts stay current; only rest
// days advance with the calendar. Never assume tomorrow's workout was completed.
export const LOCAL_REMINDER_FIRST_ID = 620000;
export const LOCAL_REMINDER_DAYS = 60; // below iOS's 64 pending-notification limit
const dateKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export function localReminderPlan(program, now = new Date()) {
  const reminder = program?.settings?.reminder;
  if (!reminder?.enabled || !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminder.time)) return [];
  const [hour, minute] = reminder.time.split(':').map(Number);
  const notifications = [];
  for (const { day, offset } of trainingDates(program, dateKey(now), LOCAL_REMINDER_DAYS)) {
    // Calendar arithmetic preserves the chosen wall-clock time across DST.
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, hour, minute);
    if (at <= now) continue;
    notifications.push({
      id: LOCAL_REMINDER_FIRST_ID + offset,
      title: '6Pack',
      body: `Zeit fürs Training — Woche ${Math.floor((day - 1) / 7) + 1} · Tag ${((day - 1) % 7) + 1}`,
      schedule: { at, allowWhileIdle: true },
      channelId: 'sixpack-workout',
      isExactNotification: true,
      isExactMandatory: true,
      extra: { app: 'sixpack', day },
    });
  }
  return notifications;
}

export const isLocalReminder = notification => notification.id >= LOCAL_REMINDER_FIRST_ID
  && notification.id < LOCAL_REMINDER_FIRST_ID + LOCAL_REMINDER_DAYS;
