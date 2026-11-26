import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { formatTrimSeconds, moveTrimHandle } from './exerciseVideo.js';

function valueFromTrack(track, clientX, duration) {
  const rect = track?.getBoundingClientRect();
  if (!rect || rect.width <= 0) return 0;
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  return ratio * duration;
}

function TrimHandle({ label, edge, seconds, percent, duration, onDrag, onKey }) {
  return (
    <button
      type="button"
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={duration}
      aria-valuenow={seconds}
      aria-valuetext={formatTrimSeconds(seconds)}
      className="absolute top-0 h-12 w-12 rounded-full"
      style={{
        left: `${percent}%`,
        transform: 'translateX(-50%)',
        touchAction: 'none',
        background: '#fff',
        border: '3px solid #e2001a',
      }}
      onPointerDown={(event) => {
        event.preventDefault();
        try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch { /* Der Zug gilt auch ohne Capture. */ }
        onDrag(edge, event.clientX);
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture?.(event.pointerId)) return;
        onDrag(edge, event.clientX);
      }}
      onKeyDown={(event) => onKey(edge, event)}
    />
  );
}

export default function ExerciseClipEditor({
  url, duration, start, end, busy = false, progress = null, status = '', error = '',
  onChange, onCancel, onUpload, exerciseName,
}) {
  const videoRef = useRef(null);
  const trackRef = useRef(null);
  const playingRef = useRef(false);
  const startRef = useRef(start);
  startRef.current = start;
  const span = duration > 0 ? duration : 1;
  const startPct = (start / span) * 100;
  const endPct = (end / span) * 100;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const showStart = () => {
      try { video.currentTime = startRef.current; } catch { /* iOS setzt die Zeit erst nach den Metadaten. */ }
    };
    if (video.readyState >= 1) showStart();
    else video.addEventListener('loadedmetadata', showStart, { once: true });
    return () => {
      video.removeEventListener('loadedmetadata', showStart);
      video.pause?.();
    };
  }, [url]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const onTime = () => {
      if (!playingRef.current) return;
      if (video.currentTime >= end - 0.05) {
        playingRef.current = false;
        video.pause();
      }
    };
    video.addEventListener('timeupdate', onTime);
    return () => video.removeEventListener('timeupdate', onTime);
  }, [end]);

  function drag(edge, clientX) {
    const video = videoRef.current;
    playingRef.current = false;
    video?.pause?.();
    const next = moveTrimHandle(duration, start, end, edge, valueFromTrack(trackRef.current, clientX, duration));
    onChange(next);
    try { if (video) video.currentTime = edge === 'start' ? next.start : next.end; } catch { /* Vorschau springt beim nächsten Bild. */ }
  }

  function nudge(edge, event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const step = event.shiftKey ? 1 : 0.1;
    const current = edge === 'start' ? start : end;
    const delta = event.key === 'ArrowLeft' ? -step : step;
    const next = moveTrimHandle(duration, start, end, edge, current + delta);
    onChange(next);
    const video = videoRef.current;
    playingRef.current = false;
    video?.pause?.();
    try { if (video) video.currentTime = edge === 'start' ? next.start : next.end; } catch { /* Pfeiltasten nur, wenn die Zeit schon steht. */ }
  }

  function playClip() {
    const video = videoRef.current;
    if (!video || busy) return;
    playingRef.current = true;
    const begin = () => { video.play?.().catch(() => { playingRef.current = false; }); };
    if (Math.abs(video.currentTime - start) < 0.05) begin();
    else {
      const onSeeked = () => {
        video.removeEventListener('seeked', onSeeked);
        begin();
      };
      video.addEventListener('seeked', onSeeked);
      try { video.currentTime = start; } catch { video.removeEventListener('seeked', onSeeked); begin(); }
    }
  }

  const percent = progress == null ? null : Math.max(0, Math.min(100, progress));
  const dialog = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Clip ausschneiden"
      className="fixed inset-0 flex flex-col"
      style={{
        zIndex: 250,
        background: '#000',
        height: '100dvh',
        touchAction: 'none',
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <video ref={videoRef} src={url} muted playsInline preload="metadata" className="min-h-0 w-full flex-1 bg-black object-contain" />
      <div className="px-4 pt-3 pb-4" style={{ background: '#111', overflowY: 'auto', touchAction: 'pan-y' }}>
        <p className="text-center text-sm font-bold" style={{ color: '#fff' }}>{exerciseName}</p>
        <div className="flex gap-2 mt-2">
          {[['start', 'Anfang', start], ['end', 'Ende', end]].map(([edge, label, value]) => (
            <label key={edge} className="flex-1 text-xs" style={{ color: '#aaa' }}>{label} (Sekunden)
              <input type="number" min="0" max={duration} step="0.1" value={value} disabled={busy}
                className="block min-h-11 w-full rounded-lg px-2" style={{ background: '#222', color: '#fff' }}
                onChange={event => { if (event.target.value !== '') {
                  const next = moveTrimHandle(duration, start, end, edge, Number(event.target.value));
                  onChange(next);
                  playingRef.current = false;
                  videoRef.current?.pause?.();
                  try { if (videoRef.current) videoRef.current.currentTime = next.start; } catch {}
                } }} />
            </label>
          ))}
        </div>
        <p className="text-center text-sm font-bold" style={{ color: '#fff' }}>
          {formatTrimSeconds(start)} bis {formatTrimSeconds(end)}
          <span style={{ color: '#aaa' }}> · Länge {formatTrimSeconds(Math.max(0, end - start))}</span>
        </p>
        <div className="relative mt-3 h-12" style={{ touchAction: 'none' }}>
          <div ref={trackRef} className="absolute left-6 right-6 top-5 h-2 rounded-full" style={{ background: '#333' }} />
          <div
            className="absolute top-5 h-2"
            style={{ left: `calc(1.5rem + (100% - 3rem) * ${startPct / 100})`, width: `calc((100% - 3rem) * ${(endPct - startPct) / 100})`, background: '#e2001a' }}
          />
          <div className="absolute left-6 right-6 top-0 h-12">
            <TrimHandle label="Anfang des Clips" edge="start" seconds={start} percent={startPct} duration={duration} onDrag={drag} onKey={nudge} />
            <TrimHandle label="Ende des Clips" edge="end" seconds={end} percent={endPct} duration={duration} onDrag={drag} onKey={nudge} />
          </div>
        </div>
        <button type="button" className="mt-3 min-h-12 w-full rounded-xl text-sm font-black" style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #333' }} onClick={playClip} disabled={busy}>
          Clip abspielen
        </button>
        {status && <p className="mt-2 text-center text-xs" style={{ color: '#aaa' }}>{status}</p>}
        {percent != null && (
          <div className="mt-2" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Fortschritt">
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: '#333' }}>
              <div className="h-full" style={{ width: `${percent}%`, background: '#e2001a' }} />
            </div>
          </div>
        )}
        {error && <p className="mt-2 text-sm" role="alert" style={{ color: '#e2001a' }}>{error}</p>}
        <div className="mt-3 flex gap-2">
          <button type="button" className="min-h-12 flex-1 rounded-xl text-base font-black" style={{ background: '#1a1a1a', color: '#fff', border: '1px solid #333' }} onClick={onCancel}>
            Abbrechen
          </button>
          <button type="button" className="min-h-12 flex-1 rounded-xl text-base font-black" style={{ background: '#e2001a', color: '#fff' }} onClick={onUpload} disabled={busy}>
            Hochladen
          </button>
        </div>
      </div>
    </div>
  );
  if (typeof document === 'undefined' || !document.body) return dialog;
  return createPortal(dialog, document.body);
}
