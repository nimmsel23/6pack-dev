// Same Track rules as SixPackApp: incomplete workouts stay current; only rest
// days advance with the calendar. Never assume tomorrow's workout was completed.
export const LOCAL_REMINDER_FIRST_ID = 620000;
export const LOCAL_REMINDER_DAYS = 60; // below iOS's 64 pending-notification limit
const dateKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const restDay = day => [3, 7].includes(((day - 1) % 7) + 1);
const addDay = key => {
  const [y, m, d] = key.split('-').map(Number);
  return dateKey(new Date(y, m - 1, d + 1));
};

export function localReminderPlan(program, now = new Date()) {
  const reminder = program?.settings?.reminder;
  if (!reminder?.enabled || !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminder.time)) return [];
  const [hour, minute] = reminder.time.split(':').map(Number);
  const notifications = [];
  let day = Math.max(1, Number(program.currentDay) || 1);
  let restDate = program.restDate;
  let lastCompletedOn = program.lastCompletedOn;
  for (let offset = 0; offset < LOCAL_REMINDER_DAYS; offset++) {
    // Calendar arithmetic preserves the chosen wall-clock time across DST.
    const at = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset, hour, minute);
    const today = dateKey(at);
    while (restDay(day)) {
      const rest = restDate || (lastCompletedOn ? addDay(lastCompletedOn) : today);
      if (rest >= today) { restDate = rest; break; }
      day++;
      lastCompletedOn = rest;
      restDate = null;
    }
    if (at <= now || restDay(day) || lastCompletedOn === today) continue;
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
