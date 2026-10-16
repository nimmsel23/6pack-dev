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

function Root() {
  const [state, setState] = useState({ user: null, pending: 0 });
  useEffect(() => subscribeSync(setState), []);
  return (
    <main className="max-w-xl mx-auto py-4">
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
