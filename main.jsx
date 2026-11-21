import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';
import { SixPackEmbed } from './embed.jsx';
import { subscribeSync, signInGoogle, signOutUser, submitWorkout, loadProgram, saveProgram, enableSixpackPush } from './sixpackCloud.js';
import './styles.css';
import { loginEmail } from './photoAuth.js';
import { isNativeApp, nativeReminderDelivery, watchNativeResume } from './nativeReminders.js';

// Login nur für den Workout-Sync: dieselbe Firebase-uid wie in der Fitness-App,
// damit dort das hier geloggte Workout am selben Tag gelesen wird.
function SyncSettings({ state }) {
  const { user, pending } = state;
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submitLogin(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setBusy(true);
    setLoginError('');
    try { await loginEmail(fields.get('email'), fields.get('password')); setLoginOpen(false); }
    catch { setLoginError('Anmeldung fehlgeschlagen. Bitte E-Mail und Passwort prüfen.'); }
    finally { setBusy(false); }
  }
  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between gap-3 text-[11px] font-semibold" style={{ color: 'var(--dim, #888)' }}>
        <span>
          {user ? `Sync: ${user.email || user.uid}` : 'Nicht angemeldet — Workouts bleiben auf diesem Gerät'}
          {pending > 0 && ` · ${pending} wartet`}
        </span>
        <button
          onClick={() => {
            if (isNativeApp && !user) return setLoginOpen(open => !open);
            (user ? signOutUser() : signInGoogle()).catch((e) => console.warn('[sixpack] Auth:', e));
          }}
          className="underline"
        >
          {user ? 'Abmelden' : 'Anmelden'}
        </button>
      </div>
      {loginOpen && !user && <form onSubmit={submitLogin} className="pt-3 flex flex-col gap-2">
        <label>E-Mail<input name="email" type="email" autoComplete="username" required className="block w-full bg-black text-white border p-2" /></label>
        <label>Passwort<input name="password" type="password" autoComplete="current-password" required className="block w-full bg-black text-white border p-2" /></label>
        <button type="submit" disabled={busy}>{busy ? 'Anmelden …' : 'Mit E-Mail anmelden'}</button>
        {loginError && <p role="alert">{loginError}</p>}
      </form>}
    </div>
  );
}

const subscribeRoute = cb => { window.addEventListener('hashchange', cb); return () => window.removeEventListener('hashchange', cb); };
function Root() {
  const route = useSyncExternalStore(subscribeRoute, () => location.hash.replace(/^#\/?/, '').replace(/^setup$/, 'settings'), () => '');
  const [state, setState] = useState({ user: null, pending: 0 });
  useEffect(() => subscribeSync(setState), []);
  useEffect(() => {
    let disposed = false;
    let stop;
    watchNativeResume(() => document.dispatchEvent(new Event('visibilitychange'))).then(cleanup => {
      if (disposed) cleanup(); else stop = cleanup;
    });
    return () => { disposed = true; stop?.(); };
  }, []);
  return (
    <main data-theme="sixpack" className="flex w-full flex-col overflow-hidden" style={{ width: '100%', maxWidth: 'none', height: '100dvh', minHeight: '100dvh', margin: 0, background: '#0a0a0a' }}>
      <SixPackEmbed onNavigate={target => { if (target === 'fuel') window.location.assign('https://fuel-vos.web.app'); }} route={route} onRouteChange={next => { location.hash = next; }} uid={state.user?.uid || 'local'} setupContent={<SyncSettings state={state} />} onWorkoutComplete={submitWorkout} loadRemoteProgram={loadProgram} saveRemoteProgram={saveProgram} enablePush={isNativeApp ? undefined : enableSixpackPush} localReminders={nativeReminderDelivery} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
