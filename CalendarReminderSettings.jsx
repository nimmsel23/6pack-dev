import { useEffect, useState } from 'react';
import { watchCalendar, connectCalendar, disconnectCalendar } from './googleCalendarClient.js';

export default function CalendarReminderSettings({ uid }) {
  const [state, setState] = useState({ connected: false });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const loggedIn = !!uid && uid !== 'local';
  const native = typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.();
  useEffect(() => {
    setState({ connected: false });
    setNotice('');
    if (!loggedIn) return undefined;
    let cancelled = false;
    try {
      const stop = watchCalendar(uid, value => { if (!cancelled) setState(value); }, () => {
        if (!cancelled) setNotice('Kalenderstatus konnte nicht geladen werden.');
      });
      return () => { cancelled = true; stop(); };
    } catch { setNotice('Kalender-Anbindung ist in diesem Host noch nicht verfügbar.'); }
  }, [uid, loggedIn]);

  const eventUrl = /^https:\/\/(calendar\.google\.com\/|www\.google\.com\/calendar\/)/.test(state.eventUrl || '') ? state.eventUrl : '';

  async function act(disconnect = false) {
    setBusy(true);
    setNotice('');
    try {
      if (disconnect) await disconnectCalendar(uid);
      else {
        await connectCalendar(uid);
        setNotice('Bitte die Kalenderfreigabe im Google-Fenster abschließen.');
      }
    } catch (error) {
      setNotice(error?.code === 'functions/not-found' || error?.code === 'functions/internal'
        ? 'Die Kalender-Anbindung ist auf dem Server noch nicht eingerichtet.'
        : error.message || 'Kalender-Verbindung fehlgeschlagen.');
    } finally { setBusy(false); }
  }

  return <div className="px-4 py-4" style={{ background: '#111', borderTop: '1px solid #333' }}>
    <h2 className="text-sm font-bold text-white">Google Kalender · Fitness</h2>
    <p className="pt-2 text-[11px]" style={{ color: 'var(--dim)' }}>
      Genau ein kommender Workout-Termin in deinem vorhandenen Kalender „Fitness“.
      Nach jedem abgeschlossenen Workout wird er auf das nächste Training verschoben; Ruhetage werden übersprungen.
      Die Uhrzeit oben gilt auch für den Kalender, unabhängig vom Push-Schalter.
    </p>
    {!loggedIn && <p className="pt-2 text-[11px]">Bitte mit deinem Google-Konto anmelden.</p>}
    {native && !state.connected && <p className="pt-2 text-[11px]">Den Kalender einmal in der Web-App verbinden. Danach aktualisieren auch hier synchronisierte Workouts den Termin.</p>}
    {loggedIn && <div role="status" className="pt-2 text-[11px]">
      {state.connected ? state.nextStart ? `Nächstes Training: ${state.nextStart.replace('T', ' ')} (${state.timeZone || ''})` : 'Verbunden. Der nächste Termin wird anhand deines Tracks geplant.' : 'Noch nicht verbunden.'}
      {eventUrl && <a className="block underline pt-1" href={eventUrl} target="_blank" rel="noreferrer">Termin in Google Kalender öffnen</a>}
      {(state.error || notice) && <p className="pt-2" style={{ color: '#f87171' }}>{state.error || notice}</p>}
    </div>}
    <div className="flex gap-4 pt-3">
      {loggedIn && !native && <button type="button" disabled={busy} onClick={() => act()} className="text-sm underline">
        {busy ? 'Bitte warten …' : state.connected ? 'Google-Freigabe erneuern' : 'Google Kalender verbinden'}
      </button>}
      {loggedIn && state.connected && <button type="button" disabled={busy} onClick={() => act(true)} className="text-sm underline">Verbindung trennen und Termin entfernen</button>}
    </div>
  </div>;
}
