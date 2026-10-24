import assert from 'node:assert/strict';
import { nextCalendarWorkout } from '../functions/trackSchedule.mjs';
import { createCalendarApi, eventBaseId, isManagedEvent } from '../functions/calendarApi.mjs';
import { syncNextWorkout } from '../functions/calendarSync.mjs';

const uid = 'calendar-test-alice';
const zone = 'Europe/Vienna';
const base = { currentDay: 1, settings: { reminder: { enabled: false, time: '18:00' } } };
const now = new Date('2026-10-24T10:00:00Z');
assert.equal(nextCalendarWorkout(base, zone, now).start.dateTime, '2026-10-24T18:00:00');
assert.equal(nextCalendarWorkout(base, zone, new Date('2026-10-24T17:00:00Z')).start.dateTime, '2026-10-25T18:00:00');
assert.equal(nextCalendarWorkout({ ...base, currentDay: 3, lastCompletedOn: '2026-10-24' }, zone, now).start.dateTime, '2026-10-26T18:00:00');
assert.equal(nextCalendarWorkout({ ...base, currentDay: 57 }, zone, now), null);
assert.equal(nextCalendarWorkout(base, 'America/Los_Angeles', new Date('2026-10-25T00:30:00Z')).start.dateTime, '2026-10-24T18:00:00');
assert.throws(() => nextCalendarWorkout(base, 'invalid/zone', now));
assert.match(eventBaseId(uid), /^[0-9a-v]{5,1024}$/); // Google event IDs use base32hex

const events = new Map();
let connection = { enabled: true, calendarId: 'fitness@example.org', timeZone: zone };
let inserts = 0;
let lostResponse = false;
const urls = [];
const fetchImpl = async (url, options) => {
  urls.push(url);
  assert.equal(options.headers.Authorization, 'Bearer ephemeral-token');
  assert(!url.includes('ephemeral-token'));
  const parsed = new URL(url);
  const parts = parsed.pathname.split('/');
  const body = options.body ? JSON.parse(options.body) : null;
  const reply = (status, value) => ({ ok: status >= 200 && status < 300, status, json: async () => value });
  if (parsed.pathname.endsWith('/calendarList')) {
    assert.equal(parsed.searchParams.get('minAccessRole'), 'writer');
    if (!parsed.searchParams.has('pageToken')) return reply(200, { items: [{ id: 'private', summary: 'Personal' }], nextPageToken: 'page-2' });
    return reply(200, { items: [{ id: connection.calendarId, summary: 'Fitness' }] });
  }
  assert.equal(decodeURIComponent(parts[4]), connection.calendarId);
  const id = parts[6];
  if (options.method === 'GET') return events.has(id) ? reply(200, events.get(id)) : reply(404, {});
  if (options.method === 'POST') {
    if (events.has(body.id)) return reply(409, {});
    inserts++;
    events.set(body.id, { ...body, htmlLink: `https://calendar.google.com/event?eid=${body.id}` });
    if (lostResponse) { lostResponse = false; throw new Error('network response lost'); }
    return reply(200, events.get(body.id));
  }
  if (options.method === 'PATCH') {
    events.set(id, { ...events.get(id), ...body });
    return reply(200, events.get(id));
  }
  if (options.method === 'DELETE') { events.delete(id); return reply(204); }
  throw new Error('unexpected request');
};
const api = createCalendarApi('ephemeral-token', fetchImpl);
const sync = program => syncNextWorkout({ uid, connection: { ...connection }, program, api, now,
  saveConnection: async update => { connection = { ...connection, ...update }; } });

await sync(base);
assert.equal(events.size, 1);
const firstId = connection.eventId;
const repeated = await sync(base);
assert.equal(inserts, 1);
assert.equal(events.size, 1);
assert.equal(repeated.connected, true);
assert.equal(events.get(firstId).recurrence, undefined, 'no recurring series');
assert.equal(events.get(firstId).reminders.overrides[0].minutes, 0);
await sync({ ...base, currentDay: 2, lastCompletedOn: '2026-10-24' });
assert.equal(events.size, 1);
assert.equal(connection.eventId, firstId, 'advance the same upcoming event');
assert.equal(events.get(firstId).start.dateTime, '2026-10-25T18:00:00');
await sync({ ...base, currentDay: 3, lastCompletedOn: '2026-10-24' });
assert.equal(events.size, 1);
assert.equal(events.get(firstId).start.dateTime, '2026-10-26T18:00:00');
await sync({ ...base, settings: { reminder: { time: '19:30' } } });
assert.equal(events.get(firstId).start.dateTime, '2026-10-24T19:30:00');
await sync({ ...base, currentDay: 57 });
assert.equal(events.size, 0);

// Google may keep tombstones after deletion: generation changes only when the
// prior event is confirmed gone; uncertain requests keep the persisted ID.
connection = { ...connection, eventId: null, eventCreated: false, generation: 0 };
lostResponse = true;
await assert.rejects(sync(base), /network response lost/);
assert.equal(events.size, 1);
const retryId = connection.eventId;
await sync(base);
assert.equal(events.size, 1);
assert.equal(connection.eventId, retryId);
assert(isManagedEvent(events.get(retryId), uid));
assert(!isManagedEvent(events.get(retryId), 'bob'));
await assert.rejects(api.remove(connection.calendarId, retryId, 'bob'), /Fremder/);
assert.equal(events.size, 1);
await api.remove(connection.calendarId, retryId, uid);
assert.equal(events.size, 0);
assert(urls.every(url => !url.includes('/calendars/primary/')));
console.log('Calendar: one Fitness event, completion/rest/time updates, no recurrence, pagination, DST/zone handling, stable retry IDs, account ownership and removal passed.');

for (const items of [[], [{ id: 'a', summary: 'Fitness' }, { id: 'b', summary: 'Fitness' }]]) {
  const invalid = createCalendarApi('mock', async () => ({ ok: true, status: 200, json: async () => ({ items }) }));
  await assert.rejects(invalid.fitnessCalendar(), error => error.permanent === true);
}
console.log('Calendar selection: missing or ambiguous Fitness calendars fail without creating a calendar.');
