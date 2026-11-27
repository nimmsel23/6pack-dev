// Zeit- und Frame-Logik des Schnittfensters. Ohne DOM, damit testbar.
import { MAX_VIDEO_SECONDS, MIN_CLIP_SECONDS } from '../exerciseVideo.js';

// Gespeichert wird auf 1/100 s (normalizeClip). Kleiner Puffer, damit
// das Runden die Mindestlänge nicht unterschreitet.
const MIN_SPAN = MIN_CLIP_SECONDS + 0.02;

// Letzter Frame, der zum Zeitpunkt t schon sichtbar ist.
export function frameIndexAt(frames, t) {
  let lo = 0;
  let hi = frames.length - 1;
  let best = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (frames[mid] <= t + 1e-6) { best = mid; lo = mid + 1; } else hi = mid - 1;
  }
  return best;
}

// Ersatz-Raster, wenn die Container-Zeitstempel nicht lesbar sind.
export function gridFrames(duration, fps) {
  const count = Math.max(1, Math.ceil(duration * fps - 1e-6));
  return Array.from({ length: count }, (_, index) => index / fps);
}

export function estimateFps(frames) {
  if (frames.length < 2) return 30;
  const span = frames[frames.length - 1] - frames[0];
  return span > 0 ? (frames.length - 1) / span : 30;
}

// MM:SS:FF (FF = Frame innerhalb der Sekunde), wie im Schnittprogramm.
export function timecode(seconds, fps) {
  const t = Math.max(0, Number(seconds) || 0);
  const rate = Math.max(1, Math.round(fps));
  let whole = Math.floor(t + 1e-6);
  let frame = Math.floor((t - whole) * rate + 1e-4);
  if (frame >= rate) { whole += 1; frame = 0; }
  const pad = value => String(value).padStart(2, '0');
  return `${pad(Math.floor(whole / 60))}:${pad(whole % 60)}:${pad(frame)}`;
}

// Frame-Anfang für den Anfangspunkt, Frame-Ende (= nächster Frame) für Out.
export function frameStart(frames, index) {
  return frames[Math.max(0, Math.min(frames.length - 1, index))];
}

export function frameEnd(frames, index, duration) {
  return index + 1 < frames.length ? frames[index + 1] : duration;
}

// Letzter Frame im Ausschnitt (Out ist inklusiv).
export function outFrameOf(frames, end) {
  return frameIndexAt(frames, end - 1e-3);
}

// Anfang aufrunden auf 1/100 s, aber im selben Frame bleiben.
function storableStart(value, next, duration) {
  const up = Math.ceil(value * 100 - 1e-7) / 100;
  if (up > duration) return Math.floor(duration * 100) / 100;
  return next != null && up >= next ? value : up;
}

// Ende (exklusiv) abrunden, aber hinter dem Anfang des letzten Frames bleiben.
function storableEnd(value, lastFrame) {
  const down = Math.floor(value * 100 + 1e-7) / 100;
  return lastFrame != null && down - 1e-3 < lastFrame ? value : down;
}

// edge: 'start' | 'end' | 'move'. Liefert gespeicherte, framegenaue Werte.
export function clampRange(edge, start, end, duration, frames) {
  const maxSpan = Math.min(MAX_VIDEO_SECONDS, duration);
  let s = start;
  let e = end;
  if (duration <= MIN_SPAN) return { start: 0, end: Math.floor(duration * 100) / 100 };
  if (edge === 'move') {
    const span = Math.min(maxSpan, Math.max(MIN_SPAN, e - s));
    s = Math.max(0, Math.min(s, duration - span));
    e = s + span;
  } else if (edge === 'start') {
    s = Math.max(0, Math.min(s, duration - MIN_SPAN));
    if (e - s < MIN_SPAN) e = s + MIN_SPAN;
    if (e - s > maxSpan) e = s + maxSpan;
  } else {
    e = Math.min(duration, Math.max(e, MIN_SPAN));
    if (e - s < MIN_SPAN) s = e - MIN_SPAN;
    if (e - s > maxSpan) s = e - maxSpan;
  }
  e = Math.min(duration, e);
  s = Math.max(0, s);
  if (frames?.length) {
    const si = frameIndexAt(frames, s);
    s = frames[si];
    const ei = frameIndexAt(frames, e - 1e-4);
    let boundary = frameEnd(frames, ei, duration);
    // Einrasten darf die Grenzen nicht verletzen.
    if (boundary - s < MIN_SPAN) boundary = frameEnd(frames, Math.min(frames.length - 1, ei + 1), duration);
    if (boundary - s > maxSpan) boundary = frames[ei];
    e = boundary;
    return {
      start: storableStart(s, frames[si + 1], duration),
      end: storableEnd(e, frames[frameIndexAt(frames, e - 1e-3)]),
    };
  }
  return { start: storableStart(s, null, duration), end: storableEnd(e, null) };
}

// Linealschritte: Haupt-Raster mit Beschriftung, feines Raster ohne.
export function rulerSteps(pxPerSecond, fps) {
  const rate = Math.max(1, Math.round(fps));
  const candidates = [1, 2, 5, 10].map(n => n / rate).concat([0.5, 1, 2, 5, 10, 15, 30, 60]);
  const major = candidates.find(step => step * pxPerSecond >= 72) ?? 60;
  const divides = step => Math.abs(major / step - Math.round(major / step)) < 1e-6;
  const minor = candidates.find(step => step < major && divides(step) && step * pxPerSecond >= 8) ?? major;
  return { major, minor };
}
