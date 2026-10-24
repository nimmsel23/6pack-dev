// Shared Track projection: unfinished workouts remain current. Only rest days
// advance by date; never forecast a workout as completed.
export const shiftDate = (date, days) => {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10);
};
const restDay = day => [3, 7].includes(((day - 1) % 7) + 1);
export function trainingDates(program, today, count = 60) {
  const result = [];
  let day = Math.max(1, Number(program.currentDay) || 1);
  let restDate = program.restDate;
  let lastCompletedOn = program.lastCompletedOn;
  for (let offset = 0; offset < count; offset++) {
    const date = shiftDate(today, offset);
    while (restDay(day)) {
      const rest = restDate || (lastCompletedOn ? shiftDate(lastCompletedOn, 1) : today);
      if (rest >= date) { restDate = rest; break; }
      day++;
      lastCompletedOn = rest;
      restDate = null;
    }
    if (!restDay(day) && lastCompletedOn !== date && day <= 56) result.push({ day, date, offset });
  }
  return result;
}

export function nextCalendarWorkout(program, timeZone, now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(now).map(p => [p.type, p.value]));
  const today = `${parts.year}-${parts.month}-${parts.day}`;
  const time = program.settings?.reminder?.time || '18:00';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw Object.assign(new Error('Ungültige Erinnerungszeit.'), { permanent: true });
  const next = trainingDates(program, today, 14).find(item => item.date > today || time > `${parts.hour}:${parts.minute}`);
  if (!next) return null;
  const start = `${next.date}T${time}:00`;
  const end = new Date(new Date(`${start}Z`).getTime() + 15 * 60000).toISOString().slice(0, 19);
  return {
    summary: `6Pack · Woche ${Math.floor((next.day - 1) / 7) + 1} · Tag ${((next.day - 1) % 7) + 1}`,
    description: 'Nächstes Workout aus deinem 6Pack-Track. Wird nach Abschluss automatisch auf das nächste Training verschoben.\nhttps://vos-6pack.web.app/',
    start: { dateTime: start, timeZone }, end: { dateTime: end, timeZone },
    reminders: { useDefault: false, overrides: [{ method: 'popup', minutes: 0 }] },
    transparency: 'transparent', status: 'confirmed',
  };
}
