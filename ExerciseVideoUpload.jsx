import { useEffect, useRef, useState } from 'react';
import ExerciseClipEditor from './ExerciseClipEditor.jsx';
import {
  MAX_SOURCE_VIDEO_BYTES,
  contentTypeForFile,
  initialTrim,
  normalizeClip,
  planExerciseClipUpload,
  trimCoversFile,
  validateExerciseVideo,
} from './exerciseVideo.js';

const FILE_INPUT_STYLE = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

function readDuration(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    let settled = false;
    const finish = (error, duration) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      URL.revokeObjectURL(url);
      video.removeAttribute('src');
      video.load?.();
      if (error) reject(error);
      else resolve(duration);
    };
    const timeout = window.setTimeout(() => finish(new Error('Die Videolänge konnte nicht gelesen werden.')), 8000);
    const accept = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) finish(new Error('Die Videolänge konnte nicht gelesen werden.'));
      else finish(null, duration);
    };
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    video.onloadedmetadata = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) accept();
      else {
        const onTime = () => {
          video.removeEventListener('timeupdate', onTime);
          try { video.currentTime = 0; } catch { /* Zurückspulen ist nur für die Länge nötig. */ }
          accept();
        };
        video.addEventListener('timeupdate', onTime);
        try { video.currentTime = 1e101; } catch { accept(); }
      }
    };
    video.onerror = () => finish(new Error('Die Videodatei konnte nicht gelesen werden.'));
    video.src = url;
  });
}

// Bildschirm bleibt an, solange geschnitten, hochgeladen oder entfernt wird:
// geht er aus, pausiert iOS die Seite und der Upload hängt.
function useWakeLock(active) {
  useEffect(() => {
    if (!active || typeof navigator === 'undefined' || !navigator.wakeLock?.request) return undefined;
    let lock = null;
    let stopped = false;
    const acquire = () => {
      if (stopped || document.visibilityState !== 'visible') return;
      navigator.wakeLock.request('screen').then((next) => {
        if (stopped) next.release?.().catch(() => {});
        else lock = next;
      }).catch(() => {});
    };
    acquire();
    document.addEventListener('visibilitychange', acquire);
    return () => {
      stopped = true;
      document.removeEventListener('visibilitychange', acquire);
      lock?.release?.().catch(() => {});
    };
  }, [active]);
}

export default function ExerciseVideoUpload({ exerciseId, exerciseName, signedIn, onUpload, ownership = 'none', onDelete, videoSource, onVideoSourceChange }) {
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
  const filesRef = useRef(null);
  const previewRef = useRef('');
  const uploadRef = useRef(null);
  const requestRef = useRef(0);
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const [phase, setPhase] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [prepNote, setPrepNote] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  useWakeLock(phase === 'editing' || phase === 'cutting' || phase === 'uploading' || phase === 'deleting');

  useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    requestRef.current += 1;
    uploadRef.current?.cancel?.();
  }, []);

  function clearPreview() {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = '';
    setPreviewUrl('');
  }

  function discard() {
    requestRef.current += 1;
    uploadRef.current?.cancel?.();
    uploadRef.current = null;
    clearPreview();
    setFile(null);
    setDuration(null);
    setTrimStart(0);
    setTrimEnd(0);
    setProgress(0);
    setError('');
    setPhase('idle');
  }

  function openPicker(input) {
    if (!signedIn) {
      setError('Bitte anmelden, um ein Übungsvideo hochzuladen.');
      return;
    }
    setConfirmDelete(false);
    input.current?.click();
  }

  async function onPick(event) {
    const next = event.target.files?.[0];
    event.target.value = '';
    if (!next) return;
    await selectSource(next);
  }

  async function selectSource(next) {
    const request = ++requestRef.current;
    uploadRef.current?.cancel?.();
    uploadRef.current = null;
    clearPreview();
    setFile(null);
    setDuration(null);
    setTrimStart(0);
    setTrimEnd(0);
    setProgress(0);
    setError('');
    setPhase('idle');
    if (!next) return;
    if (!signedIn) {
      setError('Bitte anmelden, um ein Übungsvideo hochzuladen.');
      return;
    }
    const contentType = contentTypeForFile(next);
    if (!contentType) {
      setError('Nur Videodateien können hochgeladen werden.');
      return;
    }
    if (!Number.isInteger(next.size) || next.size <= 0 || next.size > MAX_SOURCE_VIDEO_BYTES) {
      setError('Bitte eine Videodatei bis 1 GiB wählen.');
      return;
    }
    setPhase('checking');
    try {
      const seconds = await readDuration(next);
      if (request !== requestRef.current) return;
      onVideoSourceChange?.({ file: next });
      const url = URL.createObjectURL(next);
      const trim = initialTrim(seconds);
      previewRef.current = url;
      setPreviewUrl(url);
      setFile(next);
      setDuration(seconds);
      setTrimStart(trim.start);
      setTrimEnd(trim.end);
      setPhase('editing');
    } catch (err) {
      if (request !== requestRef.current) return;
      setError(err.message || 'Die Videodatei konnte nicht gelesen werden.');
      setPhase('idle');
    }
  }

  async function confirmClip() {
    if (!file || duration == null) return;
    if (!signedIn || typeof onUpload !== 'function') {
      setError('Bitte anmelden, um ein Übungsvideo hochzuladen.');
      return;
    }
    const wholeFile = trimCoversFile(duration, trimStart, trimEnd);
    if (!wholeFile) {
      const clip = normalizeClip(duration, trimStart, trimEnd);
      if (clip.error) {
        setError(clip.error);
        return;
      }
    }
    const request = ++requestRef.current;
    setError('');
    // Nur die stumme MP4 hochladen; bei fehlgeschlagenem Schnitt abbrechen.
    let cut = null;
    setProgress(0);
    setPrepNote(wholeFile ? 'Video wird vorbereitet …' : 'Clip wird geschnitten …');
    setPhase('cutting');
    try {
      const { cutExerciseClip } = await import('./exerciseClipCut.js');
      cut = await cutExerciseClip(file, wholeFile ? 0 : trimStart, wholeFile ? duration : trimEnd, (ratio) => {
        if (request === requestRef.current) setProgress(Math.round((ratio || 0) * 100));
      });
    } catch {
      cut = null;
    }
    if (request !== requestRef.current) return;
    const plan = planExerciseClipUpload({ durationSeconds: duration, start: trimStart, end: trimEnd, cut });
    if (!plan.ok) {
      setPhase('editing');
      setError(plan.error);
      return;
    }
    const uploadFile = plan.file;
    const check = validateExerciseVideo({
      exerciseId,
      contentType: contentTypeForFile(uploadFile),
      sizeBytes: uploadFile.size,
      durationSeconds: plan.durationSeconds,
      clipStart: plan.clipStart,
      clipEnd: plan.clipEnd,
    });
    if (!check.ok) {
      setPhase('editing');
      setError(check.error);
      return;
    }
    setProgress(0);
    setPhase('uploading');
    try {
      const handle = onUpload({
        exerciseId,
        file: uploadFile,
        durationSeconds: check.duration,
        clipStart: check.clipStart,
        clipEnd: check.clipEnd,
        onProgress: (update) => {
          if (request === requestRef.current) setProgress(Math.round((update?.ratio || 0) * 100));
        },
      });
      uploadRef.current = handle;
      const result = await handle?.done;
      if (request !== requestRef.current) return;
      if (!result?.exerciseId) throw new Error('Upload fehlgeschlagen. Erneut versuchen.');
      setPhase('done');
      setProgress(100);
      clearPreview();
      setFile(null);
    } catch (err) {
      if (request !== requestRef.current) return;
      if (err?.code === 'storage/canceled') {
        setPhase('editing');
        setError('');
        return;
      }
      setPhase('editing');
      setError(err?.message || 'Upload fehlgeschlagen. Erneut versuchen.');
    } finally {
      if (request === requestRef.current) uploadRef.current = null;
    }
  }

  async function removeVideo() {
    if (typeof onDelete !== 'function') return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    const request = ++requestRef.current;
    setConfirmDelete(false);
    setError('');
    setPhase('deleting');
    try {
      await onDelete(exerciseId);
      if (request === requestRef.current) setPhase('deleted');
    } catch (err) {
      if (request !== requestRef.current) return;
      setPhase('idle');
      setError(err?.message || 'Entfernen fehlgeschlagen. Erneut versuchen.');
    }
  }

  function cancelEditor() {
    if (phase === 'uploading') {
      uploadRef.current?.cancel?.();
      return;
    }
    discard();
  }

  if (ownership === 'other') {
    return (
      <p className="text-xs mt-3" style={{ color: 'var(--dim)' }}>
        Für {exerciseName || 'diese Übung'} hat schon ein anderes Konto ein Video hinterlegt.
      </p>
    );
  }

  const mine = ownership === 'mine';
  const editing = file && duration != null && (phase === 'editing' || phase === 'cutting' || phase === 'uploading');
  const percent = Math.max(0, Math.min(100, progress));
  return (
    <div className="mt-3" aria-label={`Eigenes Video für ${exerciseName || 'diese Übung'}`}>
      <p className="text-xs mb-2" style={{ color: 'var(--dim)' }}>
        {mine ? `Dein Video für ${exerciseName}. Neu aufnehmen oder eine andere Datei wählen ersetzt es.` : `Eigenes Video für ${exerciseName}. Kamera, Galerie oder Dateien, Quelle bis 1 GiB.`}
        {' '}Danach Anfang und Ende wählen. Der Clip darf höchstens 60 Sekunden lang sein, höchstens 100 MB haben und wird ohne Ton hochgeladen.
        {!signedIn && ' Dafür anmelden.'}
      </p>
      <div className="flex gap-2">
        <button type="button" className="min-h-12 flex-1 rounded-xl text-sm font-black" style={{ background: '#e2001a', color: '#fff' }} onClick={() => openPicker(cameraRef)} disabled={phase === 'deleting'}>
          {mine ? 'Neu aufnehmen' : 'Mit Kamera aufnehmen'}
        </button>
        <button type="button" className="min-h-12 flex-1 rounded-xl text-sm font-black" style={{ background: 'var(--bg2, #1a1a1a)', color: 'var(--text, #fff)', border: '1px solid var(--line, #333)' }} onClick={() => openPicker(galleryRef)} disabled={phase === 'deleting'}>
          {mine ? 'Andere Datei' : 'Aus Galerie'}
        </button>
      </div>
      <button type="button" className="mt-2 min-h-12 w-full rounded-xl text-sm font-bold" onClick={() => openPicker(filesRef)} disabled={phase === 'deleting'}>Aus Dateien wählen</button>
      <input ref={filesRef} type="file" accept="video/*,.mp4,.mov" aria-label="Video aus Dateien wählen" style={FILE_INPUT_STYLE} onChange={onPick} />
      {videoSource?.file && (
        <div className="mt-2">
          <p className="text-xs break-all">{videoSource.file.name}</p>
          <button type="button" className="min-h-12 w-full rounded-xl text-sm font-bold" onClick={() => selectSource(videoSource.file)}>Weiteren Clip schneiden</button>
          <button type="button" className="min-h-11 w-full text-sm" onClick={() => { discard(); onVideoSourceChange?.(null); }}>Quelldatei freigeben</button>
          <p className="text-xs" style={{ color: 'var(--dim)' }}>Öffne für den nächsten Clip die gewünschte Übung. Die Quelle bleibt bis zum Kontowechsel oder Schließen der App verfügbar.</p>
        </div>
      )}
      <input ref={cameraRef} type="file" accept="video/*" capture="environment" aria-label="Video mit der Kamera aufnehmen" style={FILE_INPUT_STYLE} onChange={onPick} />
      <input ref={galleryRef} type="file" accept="video/*" aria-label="Video aus der Galerie wählen" style={FILE_INPUT_STYLE} onChange={onPick} />
      {mine && typeof onDelete === 'function' && phase !== 'deleted' && (
        <div className="mt-2 flex gap-2">
          <button type="button" className="min-h-11 flex-1 rounded-xl text-sm font-bold" style={{ background: 'transparent', color: confirmDelete ? '#e2001a' : 'var(--dim)', border: `1px solid ${confirmDelete ? '#e2001a' : 'var(--line, #333)'}` }} onClick={removeVideo} disabled={phase === 'deleting'}>
            {phase === 'deleting' ? 'Wird entfernt …' : confirmDelete ? 'Wirklich entfernen' : 'Mein Video entfernen'}
          </button>
          {confirmDelete && (
            <button type="button" className="min-h-11 flex-1 rounded-xl text-sm font-bold" style={{ background: 'transparent', color: 'var(--text, #fff)', border: '1px solid var(--line, #333)' }} onClick={() => setConfirmDelete(false)}>
              Behalten
            </button>
          )}
        </div>
      )}
      {phase === 'checking' && <p className="text-xs mt-2" style={{ color: 'var(--dim)' }}>Video wird geprüft …</p>}
      {editing && (
        <ExerciseClipEditor
          url={previewUrl}
          duration={duration}
          start={trimStart}
          end={trimEnd}
          busy={phase === 'cutting' || phase === 'uploading'}
          progress={phase === 'editing' ? null : percent}
          status={phase === 'cutting' ? prepNote : ''}
          exerciseName={exerciseName}
          error={error}
          onChange={({ start, end }) => { setTrimStart(start); setTrimEnd(end); }}
          onCancel={cancelEditor}
          onUpload={confirmClip}
        />
      )}
      {phase === 'done' && <p className="text-sm mt-3" role="status">Video ist dieser Übung zugeordnet.</p>}
      {phase === 'deleted' && <p className="text-sm mt-3" role="status">Dein Video ist entfernt. Es läuft wieder das Standardvideo.</p>}
      {error && phase !== 'editing' && phase !== 'cutting' && phase !== 'uploading' && (
        <p className="text-sm mt-2" role="alert" style={{ color: '#e2001a' }}>{error}</p>
      )}
    </div>
  );
}
