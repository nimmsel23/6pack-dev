import { createHash } from 'node:crypto';
const permanentError = message => Object.assign(new Error(message), { permanent: true });
export const CALENDAR_SCOPES = ['openid', 'https://www.googleapis.com/auth/calendar.calendarlist.readonly', 'https://www.googleapis.com/auth/calendar.events'];
export const eventBaseId = uid => `6ac${createHash('sha256').update(uid).digest('hex').slice(0, 32)}`;
export const isManagedEvent = (event, uid) => event?.extendedProperties?.private?.sixpackOwner === uid
  && event?.extendedProperties?.private?.sixpackKind === 'next-workout';

export function createCalendarApi(accessToken, fetchImpl = fetch) {
  async function request(path, method = 'GET', body) {
    const response = await fetchImpl(`https://www.googleapis.com/calendar/v3/${path}`, {
      method, headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(15000),
    });
    const data = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(response.status === 401 ? 'Google-Kalender bitte erneut verbinden.' : 'Google Kalender konnte nicht aktualisiert werden.');
      error.status = response.status;
      error.reason = data?.error?.errors?.[0]?.reason || '';
      throw error;
    }
    return data;
  }
  const eventPath = (calendarId, eventId) => `calendars/${encodeURIComponent(calendarId)}/events${eventId ? `/${encodeURIComponent(eventId)}` : ''}`;
  return {
    async fitnessCalendar() {
      const matches = [];
      let pageToken;
      do {
        const query = new URLSearchParams({ minAccessRole: 'writer', showHidden: 'true', maxResults: '250' });
        if (pageToken) query.set('pageToken', pageToken);
        const page = await request(`users/me/calendarList?${query}`);
        matches.push(...(page.items || []).filter(c => c.summary === 'Fitness' && !c.deleted));
        pageToken = page.nextPageToken;
      } while (pageToken);
      if (matches.length !== 1) throw permanentError(matches.length ? 'Mehrere Kalender heißen „Fitness“. Bitte einen eindeutigen Namen verwenden.' : 'Kein beschreibbarer Kalender „Fitness“ gefunden. Bitte in Google Kalender prüfen.');
      return matches[0];
    },
    async get(calendarId, eventId) {
      try { return await request(eventPath(calendarId, eventId)); }
      catch (error) { if ([404, 410].includes(error.status)) return null; throw error; }
    },
    async put(calendarId, eventId, event, existing, uid) {
      const body = { ...event, extendedProperties: { private: { sixpackOwner: uid, sixpackKind: 'next-workout' } } };
      if (existing && !isManagedEvent(existing, uid)) throw permanentError('Der Kalender-Termin gehört nicht zu dieser 6Pack-Verbindung.');
      if (existing) return request(eventPath(calendarId, eventId), 'PATCH', body);
      try { return await request(eventPath(calendarId), 'POST', { ...body, id: eventId }); }
      catch (error) {
        // A successful insert may have lost its HTTP response. Reuse its ID.
        if (error.status !== 409) throw error;
        const found = await this.get(calendarId, eventId);
        if (!isManagedEvent(found, uid) || found.status === 'cancelled') throw error;
        return this.put(calendarId, eventId, event, found, uid);
      }
    },
    async remove(calendarId, eventId, uid) {
      const event = await this.get(calendarId, eventId);
      if (!event || event.status === 'cancelled') return;
      if (!isManagedEvent(event, uid)) throw permanentError('Fremder Kalender-Termin wird nicht verändert.');
      await request(eventPath(calendarId, eventId), 'DELETE');
    },
  };
}
