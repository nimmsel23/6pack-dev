// Schnittfenster für Video-Control (Desktop, :9150/videos/).
// Aufbau wie im NLE: Viewer, Transport, Lineal, In/Out-Spur, Filmstreifen.
// Framegenau über die Container-Zeitstempel (media.js), sonst über ein fps-Raster.
// Gleiche Props wie ExerciseClipEditor, damit beide austauschbar sind.
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft, ChevronRight, Maximize2, Pause, Play, Repeat, Scissors, SkipBack, SkipForward, X, ZoomIn, ZoomOut,
} from 'lucide-react';
import {
  clampRange, estimateFps, frameEnd, frameIndexAt, gridFrames, outFrameOf, rulerSteps, timecode,
} from './timeline.js';
import { decodeThumbs, openMedia, seekThumbs } from './media.js';

const THUMB_H = 60;
const GRID_FPS = [24, 25, 30, 50, 60];
const MAX_CACHE = 800;
const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : fn => setTimeout(() => fn(Date.now()), 16);
const caf = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const Thumb = memo(function Thumb({ source, left, width }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !source) return;
    canvas.width = source.width;
    canvas.height = source.height;
    try { canvas.getContext('2d')?.drawImage(source, 0, 0); } catch { /* Bild fehlt, Kachel bleibt dunkel. */ }
  }, [source]);
  return <canvas ref={ref} className="pce-thumb" style={{ left, width }} aria-hidden="true" />;
});

export default function ProClipEditor({
  url, duration, start, end, busy = false, progress = null, status = '', error = '',
  onChange, onCancel, onUpload, exerciseName, submitLabel = 'Hochladen',
}) {
  const videoRef = useRef(null);
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);
  const dragRef = useRef(null);
  const reverseRef = useRef(0);
  const rangeRef = useRef(false);
  const pendingScroll = useRef(null);
  const cacheRef = useRef(new Map());
  const live = useRef({});

  const [media, setMedia] = useState({ phase: 'loading', exact: false, frames: null, aspect: 16 / 9, sink: null });
  const [gridFps, setGridFps] = useState(30);
  const [thumbs, setThumbs] = useState([]);
  const [cacheVersion, setCacheVersion] = useState(0);
  const [t, setT] = useState(start || 0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [loop, setLoop] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [viewW, setViewW] = useState(0);

  const frames = useMemo(
    () => (media.exact ? media.frames : gridFrames(duration || 1, gridFps)),
    [media.exact, media.frames, duration, gridFps],
  );
  const fps = media.exact ? estimateFps(frames) : gridFps;
  const span = duration > 0 ? duration : 1;
  const fitPx = viewW > 0 ? (viewW - 2) / span : 40;
  const maxZoom = Math.max(1, (fps * 28) / fitPx);
  const px = fitPx * zoom;
  const totalW = span * px;
  const fi = frameIndexAt(frames, t);
  const inFrame = frameIndexAt(frames, start);
  const outFrame = outFrameOf(frames, end);
  const baseCount = Math.min(150, Math.max(24, Math.ceil(span * 3)));
  live.current = { px, viewW, start, end, loop, duration: span };

  // Medien öffnen: echte Frames + Vorschaubilder, sonst Fallback.
  useEffect(() => {
    let cancelled = false;
    let opened = null;
    const isCancelled = () => cancelled;
    const times = Array.from({ length: baseCount }, (_, index) => ((index + 0.5) * span) / baseCount);
    const collected = new Array(baseCount).fill(null);
    let flush = 0;
    const onThumb = (index, canvas) => {
      collected[index] = canvas;
      if (++flush % 6 === 0 || index === baseCount - 1) setThumbs(collected.slice());
    };
    setThumbs([]);
    cacheRef.current = new Map();
    openMedia(url).then(async (result) => {
      if (cancelled) { result.dispose(); return; }
      opened = result;
      setMedia({ phase: 'ready', exact: true, frames: result.frames, aspect: result.aspect, sink: result.sink });
      if (result.sink) await decodeThumbs(result, times, onThumb, isCancelled);
      else await seekThumbs(url, times, onThumb, isCancelled);
    }).catch(async () => {
      if (cancelled) return;
      setMedia(current => ({ ...current, phase: 'grid', exact: false, frames: null, sink: null }));
      try { await seekThumbs(url, times, onThumb, isCancelled); } catch { /* Ohne Bilder bleibt die Spur grau. */ }
    }).finally(() => { if (!cancelled) setThumbs(collected.slice()); });
    return () => { cancelled = true; opened?.dispose(); };
  }, [url, span, baseCount]);

  // Viewer-Ereignisse.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const showStart = () => { try { video.currentTime = (start || 0) + 0.001; } catch { /* folgt beim ersten Bild */ } };
    const onSeeked = () => setT(video.currentTime);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    if (video.readyState >= 1) showStart(); else video.addEventListener('loadedmetadata', showStart, { once: true });
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('loadedmetadata', showStart);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.pause?.();
      caf(reverseRef.current);
    };
    // Nur beim Wechsel der Datei neu an den Anfang springen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  // Playhead folgt der Wiedergabe; Bereich und Loop.
  useEffect(() => {
    if (!playing) return undefined;
    let id;
    const tick = () => {
      const video = videoRef.current;
      if (!video) return;
      const now = video.currentTime;
      const { start: s, end: e, loop: looping } = live.current;
      if ((looping || rangeRef.current) && now >= e && now - e < 0.5) {
        if (looping) { video.currentTime = s + 0.001; }
        else { video.pause(); rangeRef.current = false; setSpeed(0); }
      }
      setT(video.currentTime);
      follow(video.currentTime);
      id = raf(tick);
    };
    id = raf(tick);
    return () => caf(id);
  }, [playing]);

  // Breite messen.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    const measure = () => setViewW(scroller.clientWidth);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  // Mausrad: horizontal scrollen, mit Strg/Alt zoomen.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    const onWheel = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) {
        event.preventDefault();
        zoomBy(event.deltaY < 0 ? 1.25 : 0.8, event.clientX);
      } else if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        scroller.scrollLeft += event.deltaY;
      }
    };
    scroller.addEventListener('wheel', onWheel, { passive: false });
    return () => scroller.removeEventListener('wheel', onWheel);
  });

  useLayoutEffect(() => {
    if (pendingScroll.current == null || !scrollerRef.current) return;
    scrollerRef.current.scrollLeft = Math.max(0, pendingScroll.current);
    pendingScroll.current = null;
  }, [zoom]);

  // Tastatur wie im Schnittprogramm.
  useEffect(() => {
    const onKey = (event) => {
      const tag = event.target?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;
      const key = event.key;
      const lower = key.length === 1 ? key.toLowerCase() : key;
      const step = event.shiftKey ? Math.max(1, Math.round(fps)) : 1;
      const actions = {
        ' ': () => (playing || speed !== 0 ? shuttle(0) : shuttle(1)),
        k: () => shuttle(0),
        l: () => shuttle(speed <= 0 ? 1 : Math.min(8, speed * 2)),
        j: () => shuttle(speed >= 0 ? -1 : Math.max(-8, speed * 2)),
        ArrowLeft: () => seekFrame(fi - step),
        ArrowRight: () => seekFrame(fi + step),
        ArrowUp: () => seekFrame(inFrame),
        ArrowDown: () => seekFrame(outFrame),
        Home: () => seekFrame(0),
        End: () => seekFrame(frames.length - 1),
        i: () => (event.shiftKey ? seekFrame(inFrame) : markIn()),
        o: () => (event.shiftKey ? seekFrame(outFrame) : markOut()),
        p: () => playRange(),
        '+': () => zoomBy(1.5),
        '=': () => zoomBy(1.5),
        '-': () => zoomBy(1 / 1.5),
        '0': () => zoomTo(1),
        '\\': () => zoomTo(1),
        Enter: () => { if (!busy) onUpload?.(); },
        Escape: () => { if (!busy) onCancel?.(); },
      };
      const action = actions[lower];
      if (!action || (busy && lower !== 'Escape')) return;
      event.preventDefault();
      action();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Exakte Vorschaubilder für sichtbare Kacheln beim Hineinzoomen.
  const tileW = Math.max(32, Math.round(THUMB_H * (media.aspect || 16 / 9)));
  const tileCount = Math.max(1, Math.ceil(totalW / tileW));
  const firstTile = clamp(Math.floor(scrollLeft / tileW) - 1, 0, tileCount - 1);
  const lastTile = clamp(Math.ceil((scrollLeft + (viewW || 800)) / tileW) + 1, 0, tileCount - 1);
  const wantsExact = Boolean(media.sink) && tileW / px < span / baseCount;
  const tiles = [];
  for (let index = firstTile; index <= lastTile; index += 1) {
    const center = Math.min(span, ((index + 0.5) * tileW) / px);
    const frame = frameIndexAt(frames, center);
    const exact = wantsExact ? cacheRef.current.get(frame) : null;
    const base = thumbs[clamp(Math.round((center / span) * baseCount - 0.5), 0, baseCount - 1)] || null;
    tiles.push({ index, frame, source: exact || base, missing: wantsExact && !exact });
  }
  const missingKey = tiles.filter(tile => tile.missing).map(tile => tile.frame).join(',');
  useEffect(() => {
    if (!missingKey || !media.sink) return undefined;
    let cancelled = false;
    const timer = setTimeout(async () => {
      const wanted = [...new Set(missingKey.split(',').map(Number))].sort((a, b) => a - b);
      const times = wanted.map(index => frames[index] + 0.0005);
      try {
        let position = 0;
        for await (const wrapped of media.sink.canvasesAtTimestamps(times)) {
          if (cancelled) return;
          if (wrapped?.canvas) cacheRef.current.set(wanted[position], wrapped.canvas);
          position += 1;
        }
        while (cacheRef.current.size > MAX_CACHE) cacheRef.current.delete(cacheRef.current.keys().next().value);
        if (!cancelled) setCacheVersion(value => value + 1);
      } catch { /* Fällt auf die Grundbilder zurück. */ }
    }, 120);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [missingKey, media.sink, frames]);
  void cacheVersion;

  function follow(time) {
    const scroller = scrollerRef.current;
    if (!scroller || dragRef.current) return;
    const x = time * live.current.px;
    const width = live.current.viewW || scroller.clientWidth;
    if (x < scroller.scrollLeft || x > scroller.scrollLeft + width - 24) scroller.scrollLeft = Math.max(0, x - width * 0.2);
  }

  function seekTo(time) {
    const video = videoRef.current;
    const next = clamp(time, 0, span);
    try { if (video) video.currentTime = next; } catch { /* Zeit folgt nach den Metadaten. */ }
    setT(next);
    follow(next);
  }

  function stopAll() {
    caf(reverseRef.current);
    rangeRef.current = false;
    videoRef.current?.pause?.();
    setSpeed(0);
  }

  function seekFrame(index) {
    stopAll();
    const idx = clamp(index, 0, frames.length - 1);
    const frameTime = frames[idx];
    seekTo(frameTime + Math.min(0.001, (frameEnd(frames, idx, span) - frameTime) / 4));
  }

  function shuttle(next) {
    const video = videoRef.current;
    caf(reverseRef.current);
    if (!video) return;
    setSpeed(next);
    if (next === 0) { video.pause(); rangeRef.current = false; return; }
    if (next > 0) {
      video.playbackRate = next;
      video.play?.()?.catch?.(() => setSpeed(0));
      return;
    }
    video.pause();
    let last = performance.now();
    const step = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      const target = video.currentTime + delta * next;
      if (target <= 0) { video.currentTime = 0; setT(0); setSpeed(0); return; }
      video.currentTime = target;
      setT(target);
      follow(target);
      reverseRef.current = raf(step);
    };
    reverseRef.current = raf(step);
  }

  function playRange() {
    const video = videoRef.current;
    if (!video || busy) return;
    stopAll();
    rangeRef.current = true;
    const begin = () => { video.playbackRate = 1; setSpeed(1); video.play?.()?.catch?.(() => { rangeRef.current = false; setSpeed(0); }); };
    const onSeeked = () => { video.removeEventListener('seeked', onSeeked); begin(); };
    video.addEventListener('seeked', onSeeked);
    try { video.currentTime = start + 0.001; } catch { video.removeEventListener('seeked', onSeeked); begin(); }
    setT(start);
  }

  function markIn() {
    onChange(clampRange('start', frames[fi], end, span, frames));
  }

  function markOut() {
    onChange(clampRange('end', start, frameEnd(frames, fi, span), span, frames));
  }

  function zoomTo(next, anchorClientX) {
    const scroller = scrollerRef.current;
    const z = clamp(next, 1, maxZoom);
    if (scroller) {
      const rect = scroller.getBoundingClientRect();
      const anchorX = anchorClientX != null ? anchorClientX - rect.left : clamp(t * px - scroller.scrollLeft, 0, viewW);
      const anchorT = (scroller.scrollLeft + anchorX) / px;
      pendingScroll.current = anchorT * fitPx * z - anchorX;
    }
    setZoom(z);
  }

  function zoomBy(factor, anchorClientX) {
    zoomTo(zoom * factor, anchorClientX);
  }

  function timeAt(clientX) {
    const rect = innerRef.current?.getBoundingClientRect();
    if (!rect || px <= 0) return 0;
    return clamp((clientX - rect.left) / px, 0, span);
  }

  function applyDrag(clientX) {
    const drag = dragRef.current;
    if (!drag) return;
    const time = timeAt(clientX);
    if (drag.mode === 'scrub') { seekFrame(frameIndexAt(frames, time)); return; }
    let next;
    if (drag.mode === 'start') next = clampRange('start', time, end, span, frames);
    else if (drag.mode === 'end') next = clampRange('end', start, time, span, frames);
    else next = clampRange('move', drag.s0 + time - drag.t0, drag.e0 + time - drag.t0, span, frames);
    onChange(next);
    const show = drag.mode === 'end' ? outFrameOf(frames, next.end) : frameIndexAt(frames, next.start);
    seekFrame(show);
  }

  function onPointerDown(event) {
    if (busy || event.button > 0) return;
    const mode = event.target.closest?.('[data-drag]')?.dataset.drag || 'scrub';
    event.preventDefault();
    try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch { /* Zug läuft ohne Capture weiter. */ }
    stopAll();
    dragRef.current = { mode, t0: timeAt(event.clientX), s0: start, e0: end };
    applyDrag(event.clientX);
  }

  // Lineal: nur der sichtbare Abschnitt.
  const steps = rulerSteps(px, fps);
  const visibleFrom = scrollLeft / px;
  const visibleTo = (scrollLeft + (viewW || 800)) / px;
  const ticks = [];
  if (steps.minor > 0) {
    const first = Math.max(0, Math.floor(visibleFrom / steps.minor));
    for (let n = first; n * steps.minor <= Math.min(span, visibleTo) + 1e-9 && ticks.length < 600; n += 1) {
      const time = n * steps.minor;
      const major = Math.abs(time / steps.major - Math.round(time / steps.major)) < 1e-6;
      ticks.push({ time, major });
    }
  }
  const frameW = (frameEnd(frames, fi, span) - frames[fi]) * px;
  const inFrames = Math.max(0, outFrame - inFrame + 1);
  const percent = progress == null ? null : clamp(progress, 0, 100);
  const shuttleLabel = speed === 0 ? (playing ? '1×' : 'Stopp') : `${speed > 0 ? '▶' : '◀'} ${Math.abs(speed)}×`;

  const dialog = (
    <div className="pce" role="dialog" aria-modal="true" aria-label="Clip schneiden">
      <header className="pce-head">
        <div className="pce-title"><Scissors size={18} /> <strong>{exerciseName}</strong>
          <span className="pce-meta">
            {media.phase === 'loading' ? 'Frames werden gelesen …' : media.exact
              ? `${fps.toFixed(2)} fps · ${frames.length} Frames · framegenau`
              : <>Raster <select aria-label="Bildrate" value={gridFps} onChange={event => setGridFps(Number(event.target.value))}>
                  {GRID_FPS.map(rate => <option key={rate} value={rate}>{rate} fps</option>)}
                </select> · Datei-Zeitstempel nicht lesbar</>}
          </span>
        </div>
        <button type="button" className="pce-icon" aria-label="Schließen" onClick={() => { if (!busy) onCancel?.(); }}><X size={18} /></button>
      </header>

      <div className="pce-viewer">
        <video ref={videoRef} src={url} muted playsInline preload="auto" onClick={() => (playing ? shuttle(0) : shuttle(1))} />
        <div className="pce-tc" aria-live="off">
          <span className="pce-tc-main">{timecode(t, fps)}</span>
          <span>Frame {fi + 1} / {frames.length}</span>
        </div>
      </div>

      <div className="pce-bar">
        <div className="pce-points">
          <button type="button" className="pce-point" onClick={() => seekFrame(inFrame)} title="Zum In springen (⇧I / ↑)">
            <small>In</small>{timecode(frames[inFrame], fps)}
          </button>
          <button type="button" className="pce-point" onClick={() => seekFrame(outFrame)} title="Zum Out springen (⇧O / ↓)">
            <small>Out</small>{timecode(frames[outFrame], fps)}
          </button>
          <span className="pce-point pce-static"><small>Dauer</small>{timecode(end - start, fps)} · {inFrames} F</span>
        </div>
        <div className="pce-transport" role="group" aria-label="Wiedergabe">
          <button type="button" className="pce-icon" title="Zum In (⇧I)" aria-label="Zum In" onClick={() => seekFrame(inFrame)}><SkipBack size={17} /></button>
          <button type="button" className="pce-icon" title="Frame zurück (←, ⇧← = 1 s)" aria-label="Frame zurück" onClick={() => seekFrame(fi - 1)}><ChevronLeft size={19} /></button>
          <button type="button" className="pce-icon pce-play" title="Abspielen / Stopp (Leertaste, J/K/L)" aria-label={playing ? 'Stopp' : 'Abspielen'} onClick={() => (playing || speed !== 0 ? shuttle(0) : shuttle(1))}>
            {playing || speed < 0 ? <Pause size={19} /> : <Play size={19} />}
          </button>
          <button type="button" className="pce-icon" title="Frame vor (→, ⇧→ = 1 s)" aria-label="Frame vor" onClick={() => seekFrame(fi + 1)}><ChevronRight size={19} /></button>
          <button type="button" className="pce-icon" title="Zum Out (⇧O)" aria-label="Zum Out" onClick={() => seekFrame(outFrame)}><SkipForward size={17} /></button>
          <span className="pce-speed">{shuttleLabel}</span>
        </div>
        <div className="pce-marks" role="group" aria-label="Schnitt">
          <button type="button" onClick={markIn} disabled={busy} title="In am Playhead setzen (I)">In setzen <kbd>I</kbd></button>
          <button type="button" onClick={markOut} disabled={busy} title="Out am Playhead setzen (O)">Out setzen <kbd>O</kbd></button>
          <button type="button" onClick={playRange} disabled={busy} title="Bereich In bis Out abspielen (P)">Bereich <kbd>P</kbd></button>
          <button type="button" className="pce-icon" aria-pressed={loop} data-on={loop} title="Loop im Bereich" aria-label="Loop" onClick={() => setLoop(value => !value)}><Repeat size={16} /></button>
        </div>
      </div>

      <div className="pce-zoom">
        <button type="button" className="pce-icon" aria-label="Herauszoomen" title="Herauszoomen (−)" onClick={() => zoomBy(1 / 1.5)}><ZoomOut size={16} /></button>
        <input type="range" aria-label="Zoom" min="0" max="1000"
          value={maxZoom > 1 ? Math.round((Math.log(zoom) / Math.log(maxZoom)) * 1000) : 0}
          onChange={event => zoomTo(Math.exp((Number(event.target.value) / 1000) * Math.log(maxZoom)))} />
        <button type="button" className="pce-icon" aria-label="Hineinzoomen" title="Hineinzoomen (+)" onClick={() => zoomBy(1.5)}><ZoomIn size={16} /></button>
        <button type="button" className="pce-icon" aria-label="Ganzes Video" title="Ganzes Video (0)" onClick={() => zoomTo(1)}><Maximize2 size={15} /></button>
        <span className="pce-meta">{frameW >= 4 ? 'Frame-Ansicht' : `${Math.round(zoom * 10) / 10}×`}</span>
      </div>

      <div className="pce-scroller" ref={scrollerRef} onScroll={event => setScrollLeft(event.currentTarget.scrollLeft)}>
        <div className="pce-track" ref={innerRef} style={{ width: totalW }}
          onPointerDown={onPointerDown}
          onPointerMove={event => { if (dragRef.current) applyDrag(event.clientX); }}
          onPointerUp={() => { dragRef.current = null; }}
          onPointerCancel={() => { dragRef.current = null; }}>
          <div className="pce-ruler">
            {frameW >= 4 && <div className="pce-cell" style={{ left: frames[fi] * px, width: frameW }} />}
            {ticks.map(tick => (
              <div key={tick.time} className={tick.major ? 'pce-tick major' : 'pce-tick'} style={{ left: tick.time * px }}>
                {tick.major && <span>{timecode(tick.time, fps)}</span>}
              </div>
            ))}
          </div>
          <div className="pce-lane">
            <div className="pce-range" data-drag="move" style={{ left: start * px, width: Math.max(2, (end - start) * px) }} title="Ziehen verschiebt den ganzen Bereich">
              <span>{timecode(end - start, fps)}</span>
            </div>
          </div>
          <div className="pce-strip" style={{ height: THUMB_H }}>
            {tiles.map(tile => tile.source
              ? <Thumb key={tile.index} source={tile.source} left={tile.index * tileW} width={tileW} />
              : <div key={tile.index} className="pce-thumb pce-empty" style={{ left: tile.index * tileW, width: tileW }} />)}
            <div className="pce-dim" style={{ left: 0, width: start * px }} />
            <div className="pce-dim" style={{ left: end * px, width: Math.max(0, totalW - end * px) }} />
            <div className="pce-handle in" data-drag="start" style={{ left: start * px }} role="slider" aria-label="In-Punkt"
              aria-valuemin={0} aria-valuemax={span} aria-valuenow={start} aria-valuetext={timecode(start, fps)} />
            <div className="pce-handle out" data-drag="end" style={{ left: end * px }} role="slider" aria-label="Out-Punkt"
              aria-valuemin={0} aria-valuemax={span} aria-valuenow={end} aria-valuetext={timecode(end, fps)} />
          </div>
          <div className="pce-playhead" style={{ left: t * px }}><i /></div>
        </div>
      </div>

      <footer className="pce-foot">
        <p className="pce-keys">
          <kbd>Leertaste</kbd> Play · <kbd>J</kbd><kbd>K</kbd><kbd>L</kbd> Shuttle · <kbd>←</kbd><kbd>→</kbd> Frame · <kbd>⇧</kbd>+<kbd>←</kbd><kbd>→</kbd> 1 s ·
          {' '}<kbd>I</kbd><kbd>O</kbd> In/Out · <kbd>↑</kbd><kbd>↓</kbd> springen · <kbd>Strg</kbd>+Rad Zoom · <kbd>Enter</kbd> Speichern · <kbd>Esc</kbd> Abbrechen
        </p>
        {busy && <p role="status" className="pce-status">{status} {percent != null && `${percent} %`}</p>}
        {percent != null && <div className="pce-progress" role="progressbar" aria-label="Fortschritt" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><i style={{ width: `${percent}%` }} /></div>}
        {error && <p role="alert" className="error">{error}</p>}
        <div className="pce-actions">
          <button type="button" onClick={onCancel} disabled={busy}>Abbrechen</button>
          <button type="button" className="primary" onClick={onUpload} disabled={busy}>{busy ? 'Wird verarbeitet …' : submitLabel}</button>
        </div>
      </footer>
    </div>
  );
  if (typeof document === 'undefined' || !document.body) return dialog;
  return createPortal(dialog, document.body);
}
