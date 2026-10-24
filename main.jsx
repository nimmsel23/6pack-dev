import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SixPackPromiseCard from './SixPackPromiseCard.jsx';
import { subscribeSync, signInGoogle, signOutUser, submitWorkout, loadProgram, saveProgram, enableSixpackPush } from './standaloneSync.js';
import './styles.css';
import { loginEmail } from './photoAuth.js';
import { isNativeApp, nativeReminderDelivery, watchNativeResume } from './nativeReminders.js';

// Login nur für den Workout-Sync: dieselbe Firebase-uid wie in der Fitness-App,
// damit dort das hier geloggte Workout am selben Tag gelesen wird.
function SyncBar({ state }) {
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
    <>
    <div className="flex items-center justify-between gap-3 px-4 pb-3 text-[11px] font-semibold" style={{ color: 'var(--dim, #888)' }}>
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
    {loginOpen && !user && <form onSubmit={submitLogin} className="px-4 pb-4 flex flex-col gap-2">
      <label>E-Mail<input name="email" type="email" autoComplete="username" required className="block w-full bg-black text-white border p-2" /></label>
      <label>Passwort<input name="password" type="password" autoComplete="current-password" required className="block w-full bg-black text-white border p-2" /></label>
      <button type="submit" disabled={busy}>{busy ? 'Anmelden …' : 'Mit E-Mail anmelden'}</button>
      {loginError && <p role="alert">{loginError}</p>}
    </form>}
    </>
  );
}

function Root() {
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
    <main className="w-full">
      <SyncBar state={state} />
      <SixPackPromiseCard uid={state.user?.uid || 'local'} onWorkoutComplete={submitWorkout} loadRemoteProgram={loadProgram} saveRemoteProgram={saveProgram} enablePush={isNativeApp ? undefined : enableSixpackPush} localReminders={nativeReminderDelivery} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
