import { useEffect, useRef, useState } from 'react';
import ExerciseClipEditor from './ExerciseClipEditor.jsx';
import {
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

export default function ExerciseVideoUpload({ exerciseId, exerciseName, signedIn, onUpload }) {
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
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
  const [rangeNote, setRangeNote] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => () => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
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
    setRangeNote(false);
    setError('');
    setPhase('idle');
  }

  function openPicker(input) {
    if (!signedIn) {
      setError('Bitte anmelden, um ein Übungsvideo hochzuladen.');
      return;
    }
    input.current?.click();
  }

  async function onPick(event) {
    const next = event.target.files?.[0];
    event.target.value = '';
    requestRef.current += 1;
    uploadRef.current?.cancel?.();
    uploadRef.current = null;
    clearPreview();
    setFile(null);
    setDuration(null);
    setTrimStart(0);
    setTrimEnd(0);
    setProgress(0);
    setRangeNote(false);
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
    if (!Number.isInteger(next.size) || next.size <= 0 || next.size > 100 * 1024 * 1024) {
      setError('Das Video ist größer als 100 MB.');
      return;
    }
    setPhase('checking');
    try {
      const seconds = await readDuration(next);
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
    let cut = null;
    if (!wholeFile) {
      setProgress(0);
      setPhase('cutting');
      try {
        const { cutExerciseClip } = await import('./exerciseClipCut.js');
        cut = await cutExerciseClip(file, trimStart, trimEnd, (ratio) => {
          if (request === requestRef.current) setProgress(Math.round((ratio || 0) * 100));
        });
      } catch {
        cut = null;
      }
    }
    if (request !== requestRef.current) return;
    const plan = planExerciseClipUpload({ durationSeconds: duration, start: trimStart, end: trimEnd, cut });
    if (!plan.ok) {
      setPhase('editing');
      setError(plan.error);
      return;
    }
    const uploadFile = plan.mode === 'cut' ? plan.file : file;
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
    setRangeNote(plan.mode === 'range');
    setProgress(0);
    setPhase('uploading');
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
    try {
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

  function cancelEditor() {
    if (phase === 'uploading') {
      uploadRef.current?.cancel?.();
      return;
    }
    discard();
  }

  const editing = file && duration != null && (phase === 'editing' || phase === 'cutting' || phase === 'uploading');
  const percent = Math.max(0, Math.min(100, progress));
  return (
    <div className="mt-3" aria-label={`Eigenes Video für ${exerciseName || 'diese Übung'}`}>
      <p className="text-xs mb-2" style={{ color: 'var(--dim)' }}>
        Eigenes Video für {exerciseName}. Kamera oder Galerie, höchstens 100 MB.
        Danach Anfang und Ende wählen. Der Clip darf höchstens 60 Sekunden lang sein.
        {!signedIn && ' Dafür anmelden.'}
      </p>
      <div className="flex gap-2">
        <button type="button" className="min-h-12 flex-1 rounded-xl text-sm font-black" style={{ background: '#e2001a', color: '#fff' }} onClick={() => openPicker(cameraRef)}>
          Mit Kamera aufnehmen
        </button>
        <button type="button" className="min-h-12 flex-1 rounded-xl text-sm font-black" style={{ background: 'var(--bg2, #1a1a1a)', color: 'var(--text, #fff)', border: '1px solid var(--line, #333)' }} onClick={() => openPicker(galleryRef)}>
          Aus Galerie
        </button>
      </div>
      <input ref={cameraRef} type="file" accept="video/*" capture="environment" aria-label="Video mit der Kamera aufnehmen" style={FILE_INPUT_STYLE} onChange={onPick} />
      <input ref={galleryRef} type="file" accept="video/*" aria-label="Video aus der Galerie wählen" style={FILE_INPUT_STYLE} onChange={onPick} />
      {phase === 'checking' && <p className="text-xs mt-2" style={{ color: 'var(--dim)' }}>Video wird geprüft …</p>}
      {editing && (
        <ExerciseClipEditor
          url={previewUrl}
          duration={duration}
          start={trimStart}
          end={trimEnd}
          busy={phase === 'cutting' || phase === 'uploading'}
          progress={phase === 'editing' ? null : percent}
          status={phase === 'cutting' ? 'Clip wird geschnitten …' : (rangeNote ? 'Der Ausschnitt wird beim Abspielen verwendet.' : '')}
          error={error}
          onChange={({ start, end }) => { setTrimStart(start); setTrimEnd(end); }}
          onCancel={cancelEditor}
          onUpload={confirmClip}
        />
      )}
      {phase === 'done' && <p className="text-sm mt-3" role="status">Video ist dieser Übung zugeordnet.</p>}
      {error && phase !== 'editing' && phase !== 'cutting' && phase !== 'uploading' && (
        <p className="text-sm mt-2" role="alert" style={{ color: '#e2001a' }}>{error}</p>
      )}
    </div>
  );
}
