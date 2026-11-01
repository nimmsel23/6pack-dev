// 6Pack-Training-Erinnerung (Push) — rein, ohne Firebase.
// Quellen:
//   users/{uid}/meta/sixpack      → Programm-Fortschritt + settings.reminder {enabled, time}
//   users/{uid}/meta/sixpackPush  → tokens[] (von der 6Pack-App registriert), lastReminderDate
// Gleiche Regeln wie die lokale Erinnerung in der App (reminder.js).

const REST_DAYS_IN_WEEK = [3, 7];
const DAYS_PER_WEEK = 7;
export const WINDOW_MINUTES = 5;

export const dayInWeek = (day) => ((day - 1) % DAYS_PER_WEEK) + 1;
export const weekOf = (day) => Math.floor((day - 1) / DAYS_PER_WEEK) + 1;

function toMinutes(text) {
  const match = /^(\d{2}):(\d{2})$/.exec(String(text || ''));
  if (!match) return null;
  const minutes = Number(match[1]) * 60 + Number(match[2]);
  return minutes < 24 * 60 ? minutes : null;
}

// Datum und Minuten seit Mitternacht in der angegebenen Zeitzone.
export function getLocalDateParts(date = new Date(), timeZone = 'Europe/Berlin') {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(date);
  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    date: `${byType.year}-${byType.month}-${byType.day}`,
    minutes: Number(byType.hour) * 60 + Number(byType.minute),
  };
}

// Entscheidet, ob jetzt eine 6Pack-Erinnerung rausgehen soll.
// `push` = Dokument sixpackPush; `local` = { date: "YYYY-MM-DD", minutes } (getLocalDateParts).
export function sixpackReminderDecision({ program, push, local }) {
  const no = (why) => ({ send: false, why });
  const reminder = program?.settings?.reminder;
  if (!reminder?.enabled) return no('aus');
  if (!Array.isArray(push?.tokens) || push.tokens.length === 0) return no('keine-geraete');

  const target = toMinutes(reminder.time);
  if (target == null) return no('zeit-ungueltig');
  const delta = local.minutes - target;
  if (delta < 0 || delta >= WINDOW_MINUTES) return no('nicht-faellig');

  if (push.lastReminderDate === local.date) return no('schon-gesendet');
  if (program.lastCompletedOn === local.date) return no('heute-trainiert');

  const currentDay = Number(program.currentDay) || 1;
  if (REST_DAYS_IN_WEEK.includes(dayInWeek(currentDay))) return no('ruhetag');

  return { send: true, why: 'ok', vars: { week: weekOf(currentDay), day: dayInWeek(currentDay) } };
}

export function sixpackReminderText({ week, day }) {
  return { title: '6Pack', body: `Zeit fürs Training — Woche ${week} · Tag ${day}` };
}
