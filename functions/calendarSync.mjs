import { nextCalendarWorkout } from './trackSchedule.mjs';
import { eventBaseId } from './calendarApi.mjs';

// Called under the server's per-user lease. Persist the event ID BEFORE Google
// insert, so retries and lost responses cannot create a second upcoming event.
export async function syncNextWorkout({ uid, connection, program, api, saveConnection, now = new Date() }) {
  const calendar = await api.fitnessCalendar();
  if (calendar.id !== connection.calendarId) throw Object.assign(new Error('Der Kalender „Fitness“ hat sich geändert. Bitte die Verbindung prüfen.'), { permanent: true });
  const next = program ? nextCalendarWorkout(program, connection.timeZone, now) : null;
  if (!next) {
    if (connection.eventId) await api.remove(connection.calendarId, connection.eventId, uid);
    return { connected: true, nextStart: null, eventUrl: null, error: '' };
  }
  let generation = connection.generation || 0;
  let eventId = connection.eventId || `${eventBaseId(uid)}${generation.toString(16)}`;
  const existing = await api.get(connection.calendarId, eventId);
  // Google keeps tombstones for deleted IDs. Only allocate a replacement after
  // confirming the previous event is deleted, never after an ambiguous failure.
  if (existing?.status === 'cancelled' || (!existing && connection.eventId && connection.eventCreated)) {
    generation++;
    eventId = `${eventBaseId(uid)}${generation.toString(16)}`;
  }
  await saveConnection({ eventId, generation, eventCreated: false });
  const result = await api.put(connection.calendarId, eventId, next, eventId === connection.eventId ? existing : null, uid);
  await saveConnection({ eventId, generation, eventCreated: true });
  return { connected: true, nextStart: next.start.dateTime, timeZone: connection.timeZone, eventUrl: result.htmlLink || '', error: '' };
}
