import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { applyAppUpdate, startAppUpdateWatch } from './appUpdate.js';

const SNOOZE_MS = 10 * 60 * 1000;

// Liegt über dem Runner (z-100) und über der Shell-Navigation.
export default function UpdatePrompt() {
  const [available, setAvailable] = useState(false);
  const [snoozeUntil, setSnoozeUntil] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const [applying, setApplying] = useState(false);
  const buttonRef = useRef(null);
  const open = available && now >= snoozeUntil;

  useEffect(() => startAppUpdateWatch({ onUpdate: () => setAvailable(true) }), []);

  useEffect(() => {
    if (!available) return undefined;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [available]);

  useEffect(() => {
    if (open) buttonRef.current?.focus?.();
  }, [open]);

  if (!open || typeof document === 'undefined' || !document.body) return null;

  async function updateNow() {
    setApplying(true);
    try {
      await applyAppUpdate();
    } finally {
      setApplying(false);
    }
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sixpack-update-title"
      className="fixed inset-0 flex items-end justify-center px-4"
      style={{
        zIndex: 400,
        background: 'rgba(0,0,0,0.78)',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
      }}
    >
      <div className="w-full max-w-sm rounded-3xl p-5" style={{ background: '#1a1a1a', border: '2px solid #e2001a' }}>
        <div id="sixpack-update-title" className="text-lg font-black" style={{ color: '#fff' }}>Neue Version</div>
        <p className="mt-2 text-sm font-semibold leading-relaxed" style={{ color: '#eee' }}>
          Ein Update von 6Pack ist da. Jetzt aktualisieren lädt die neue Version und aktiviert sie.
        </p>
        <button
          ref={buttonRef}
          type="button"
          disabled={applying}
          onClick={updateNow}
          className="mt-4 w-full min-h-12 rounded-2xl text-sm font-black"
          style={{ background: '#e2001a', color: '#fff' }}
        >
          {applying ? 'Wird geladen …' : 'Jetzt aktualisieren'}
        </button>
        <button
          type="button"
          disabled={applying}
          onClick={() => setSnoozeUntil(Date.now() + SNOOZE_MS)}
          className="mt-2 w-full min-h-10 text-xs font-bold"
          style={{ color: '#aaa' }}
        >
          Später
        </button>
      </div>
    </div>,
    document.body,
  );
}
