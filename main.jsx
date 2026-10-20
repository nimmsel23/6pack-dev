import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SixPackPromiseCard from './SixPackPromiseCard.jsx';
import { subscribeSync, signInGoogle, signOutUser, submitWorkout } from './standaloneSync.js';
import './styles.css';

// Login nur für den Workout-Sync: dieselbe Firebase-uid wie in der Fitness-App,
// damit dort das hier geloggte Workout am selben Tag gelesen wird.
function SyncBar({ state }) {
  const { user, pending } = state;
  return (
    <div className="flex items-center justify-between gap-3 px-4 pb-3 text-[11px] font-semibold" style={{ color: 'var(--dim, #888)' }}>
      <span>
        {user ? `Sync: ${user.email || user.uid}` : 'Nicht angemeldet — Workouts bleiben auf diesem Gerät'}
        {pending > 0 && ` · ${pending} wartet`}
      </span>
      <button
        onClick={() => (user ? signOutUser() : signInGoogle()).catch((e) => console.warn('[sixpack] Auth:', e))}
        className="underline"
      >
        {user ? 'Abmelden' : 'Anmelden'}
      </button>
    </div>
  );
}

function UpdateNotes() {
  const [release, setRelease] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch('./release-info.json', { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : null))
      .then((info) => {
        if (!info?.id || cancelled) return;
        const key = 'sixpack:seen-release';
        if (localStorage.getItem(key) === info.id) return;
        localStorage.setItem(key, info.id);
        setRelease(info);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  if (!release) return null;
  const repo = release.repository || 'https://github.com/nimmsel23/6pack-dev';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="presentation">
      <section
        aria-labelledby="release-notes-title"
        aria-modal="true"
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/15 bg-[#171717] p-6 text-white shadow-2xl"
        role="dialog"
      >
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-red-400">6Pack Update</p>
        <h2 id="release-notes-title" className="mb-4 text-2xl font-black">Neu in diesem Update</h2>
        <ul className="mb-6 space-y-3 text-sm leading-relaxed text-white/85">
          {release.commits?.map((commit) => (
            <li key={commit.sha} className="flex gap-2">
              <span aria-hidden="true" className="text-red-400">•</span>
              <span>
                {commit.message}{' '}
                <a className="text-red-300 underline" href={`${repo}/commit/${commit.sha}`} rel="noreferrer" target="_blank">
                  {commit.sha.slice(0, 7)}
                </a>
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-4">
          <a className="text-sm text-white/60 underline" href={`${repo}/commits`} rel="noreferrer" target="_blank">
            Alle Commits ansehen
          </a>
          <button
            autoFocus
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-500"
            onClick={() => setRelease(null)}
            type="button"
          >
            Weiter
          </button>
        </div>
      </section>
    </div>
  );
}

function Root() {
  const [state, setState] = useState({ user: null, pending: 0 });
  useEffect(() => subscribeSync(setState), []);
  return (
    <main className="max-w-xl mx-auto py-4">
      <UpdateNotes />
      <SyncBar state={state} />
      <SixPackPromiseCard uid={state.user?.uid || 'local'} onWorkoutComplete={submitWorkout} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
