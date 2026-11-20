import { useEffect, useRef, useState } from 'react';
import { contentTypeForFile, validateExerciseVideo } from './exerciseVideo.js';

const FILE_INPUT_STYLE = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

function readDuration(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    const finish = (error, duration) => {
      URL.revokeObjectURL(url);
      video.removeAttribute('src');
      video.load?.();
      if (error) reject(error);
      else resolve(duration);
    };
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) finish(new Error('Die Videolänge konnte nicht gelesen werden.'));
      else finish(null, duration);
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
  const [file, setFile] = useState(null);
  const [duration, setDuration] = useState(null);
  const [clipStart, setClipStart] = useState('');
  const [clipEnd, setClipEnd] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [phase, setPhase] = useState('idle');
  const [progress, setProgress] = useState(0);
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
    uploadRef.current?.cancel?.();
    uploadRef.current = null;
    clearPreview();
    setFile(null);
    setDuration(null);
    setClipStart('');
    setClipEnd('');
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
    if (!Number.isInteger(next.size) || next.size <= 0 || next.size > 100 * 1024 * 1024) {
      setError('Das Video ist größer als 100 MB.');
      return;
    }
    setPhase('checking');
    try {
      const seconds = await readDuration(next);
      const check = validateExerciseVideo({
        exerciseId, contentType, sizeBytes: next.size, durationSeconds: seconds,
      });
      if (!check.ok) {
        setError(check.error);
        setPhase('idle');
        return;
      }
      const url = URL.createObjectURL(next);
      previewRef.current = url;
      setPreviewUrl(url);
      setFile(next);
      setDuration(check.duration);
      setPhase('ready');
    } catch (err) {
      setError(err.message || 'Die Videodatei konnte nicht gelesen werden.');
      setPhase('idle');
    }
  }

  async function startUpload() {
    if (!file || duration == null) return;
    if (!signedIn || typeof onUpload !== 'function') {
      setError('Bitte anmelden, um ein Übungsvideo hochzuladen.');
      return;
    }
    const check = validateExerciseVideo({
      exerciseId,
      contentType: contentTypeForFile(file),
      sizeBytes: file.size,
      durationSeconds: duration,
      clipStart,
      clipEnd,
    });
    if (!check.ok) {
      setError(check.error);
      return;
    }
    setError('');
    setProgress(0);
    setPhase('uploading');
    const handle = onUpload({
      exerciseId,
      file,
      durationSeconds: check.duration,
      clipStart: check.clipStart,
      clipEnd: check.clipEnd,
      onProgress: (update) => setProgress(Math.round((update?.ratio || 0) * 100)),
    });
    uploadRef.current = handle;
    try {
      const result = await handle?.done;
      if (!result?.exerciseId) throw new Error('Upload fehlgeschlagen. Erneut versuchen.');
      setPhase('done');
      setProgress(100);
    } catch (err) {
      if (err?.code === 'storage/canceled') {
        setPhase('ready');
        setError('');
        return;
      }
      setPhase('ready');
      setError(err?.message || 'Upload fehlgeschlagen. Erneut versuchen.');
    } finally {
      uploadRef.current = null;
    }
  }

  const percent = Math.max(0, Math.min(100, progress));
  return (
    <div className="mt-3" aria-label={`Eigenes Video für ${exerciseName || 'diese Übung'}`}>
      <p className="text-xs mb-2" style={{ color: 'var(--dim)' }}>
        Eigenes Video für {exerciseName}. Kamera oder ein Clip aus der Galerie, höchstens 60 Sekunden und 100 MB.
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
      {file && duration != null && (
        <div className="mt-3">
          {previewUrl && <video src={previewUrl} controls muted playsInline preload="metadata" className="w-full aspect-video rounded-xl bg-black object-contain" />}
          <p className="text-xs mt-2" style={{ color: 'var(--dim)' }}>{file.name || 'Video'} · {duration} s · {Math.ceil(file.size / (1024 * 1024))} MB</p>
          <div className="flex gap-2 mt-2">
            <label className="flex-1 text-xs" style={{ color: 'var(--dim)' }}>
              Start (s)
              <input type="number" inputMode="decimal" min="0" max={duration} step="0.1" value={clipStart} aria-label="Ausschnitt Start in Sekunden" onChange={event => setClipStart(event.target.value)} className="block w-full mt-1 rounded-lg px-2 py-2 text-sm" style={{ background: '#111', color: 'var(--text, #fff)', border: '1px solid var(--line, #333)' }} />
            </label>
            <label className="flex-1 text-xs" style={{ color: 'var(--dim)' }}>
              Ende (s)
              <input type="number" inputMode="decimal" min="0" max={duration} step="0.1" value={clipEnd} aria-label="Ausschnitt Ende in Sekunden" onChange={event => setClipEnd(event.target.value)} className="block w-full mt-1 rounded-lg px-2 py-2 text-sm" style={{ background: '#111', color: 'var(--text, #fff)', border: '1px solid var(--line, #333)' }} />
            </label>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--dim)' }}>Leer lassen, um das ganze Video zu verwenden.</p>
        </div>
      )}
      {phase === 'uploading' && (
        <div className="mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Upload-Fortschritt">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#333' }}>
            <div className="h-full" style={{ width: `${percent}%`, background: '#e2001a' }} />
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--dim)' }}>{percent} %</p>
          <button type="button" className="mt-2 text-xs underline" style={{ color: 'var(--dim)' }} onClick={() => uploadRef.current?.cancel?.()}>Abbrechen</button>
        </div>
      )}
      {file && phase !== 'uploading' && phase !== 'done' && (
        <button type="button" className="mt-3 min-h-12 w-full rounded-xl text-sm font-black" style={{ background: '#e2001a', color: '#fff' }} onClick={startUpload}>
          Dieser Übung zuordnen und hochladen
        </button>
      )}
      {phase === 'done' && <p className="text-sm mt-3" role="status">Video ist dieser Übung zugeordnet.</p>}
      {error && <p className="text-sm mt-2" role="alert" style={{ color: '#e2001a' }}>{error}</p>}
    </div>
  );
}
