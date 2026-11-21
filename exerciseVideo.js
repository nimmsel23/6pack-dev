// Zuordnung und Prüfung eigener Übungsvideos. Kein Firebase, keine Dateien:
// der Upload und die Rules verwenden dieselben Grenzen.

export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
export const MAX_VIDEO_SECONDS = 60;
export const EXERCISE_VIDEO_COLLECTION = 'exerciseVideos';
export const VIDEO_STATUSES = ['pending', 'approved'];

const EXERCISE_ID = /^[a-z][a-z0-9_]{0,63}$/;
// Dateiname ist die UID des Uploaders (Firebase Auth: höchstens 128 Zeichen).
const FILE_ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,127}$/;
const CONTENT_TYPE = /^video\/.+/;

export function isExerciseId(value) {
  return typeof value === 'string' && EXERCISE_ID.test(value);
}

export function exerciseVideoStoragePath(exerciseId, fileId) {
  if (!isExerciseId(exerciseId) || typeof fileId !== 'string' || !FILE_ID.test(fileId)) return null;
  return `${EXERCISE_VIDEO_COLLECTION}/${exerciseId}/${fileId}`;
}

function roundSeconds(value) {
  return Math.round(value * 100) / 100;
}

function asSeconds(value) {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

// Ohne Start und Ende spielt das ganze Video. Sonst muss der Ausschnitt im Clip liegen.
export function normalizeClip(durationSeconds, clipStart, clipEnd) {
  const blank = (value) => value === undefined || value === null || value === '';
  if (blank(clipStart) && blank(clipEnd)) return { start: null, end: null };
  const start = asSeconds(clipStart);
  const end = asSeconds(clipEnd);
  if (start === null || end === null) return { error: 'Start und Ende müssen Sekunden sein.' };
  if (start < 0 || end <= start || end > durationSeconds + 0.05) {
    return { error: 'Der Ausschnitt liegt außerhalb des Videos.' };
  }
  if (end - start < 0.5) return { error: 'Der Ausschnitt ist zu kurz.' };
  if (end - start > MAX_VIDEO_SECONDS) return { error: 'Der Ausschnitt darf höchstens 60 Sekunden lang sein.' };
  const startRounded = roundSeconds(start);
  const endRounded = roundSeconds(Math.min(end, durationSeconds));
  if (endRounded <= startRounded) return { error: 'Der Ausschnitt ist zu kurz.' };
  return { start: startRounded, end: endRounded };
}

export function contentTypeForFile(file) {
  const type = typeof file?.type === 'string' ? file.type : '';
  if (CONTENT_TYPE.test(type)) return type;
  const name = typeof file?.name === 'string' ? file.name : '';
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'mp4' || ext === 'm4v') return 'video/mp4';
  if (ext === 'mov') return 'video/quicktime';
  if (ext === 'webm') return 'video/webm';
  return '';
}

export function validateExerciseVideo({ exerciseId, contentType, sizeBytes, durationSeconds, clipStart, clipEnd }) {
  if (!isExerciseId(exerciseId)) return { ok: false, error: 'Unbekannte Übung.' };
  if (typeof contentType !== 'string' || !CONTENT_TYPE.test(contentType)) {
    return { ok: false, error: 'Nur Videodateien können hochgeladen werden.' };
  }
  if (!Number.isInteger(sizeBytes) || sizeBytes <= 0 || sizeBytes > MAX_VIDEO_BYTES) {
    return { ok: false, error: 'Das Video ist größer als 100 MB.' };
  }
  const duration = asSeconds(durationSeconds);
  const roundedDuration = duration === null ? null : roundSeconds(duration);
  if (roundedDuration === null || roundedDuration <= 0 || duration > MAX_VIDEO_SECONDS) {
    return { ok: false, error: 'Das Video darf höchstens 60 Sekunden lang sein.' };
  }
  const clip = normalizeClip(duration, clipStart, clipEnd);
  if (clip.error) return { ok: false, error: clip.error };
  return {
    ok: true,
    duration: roundedDuration,
    contentType,
    sizeBytes,
    clipStart: clip.start,
    clipEnd: clip.end,
  };
}

export function buildExerciseVideoRecord({
  exerciseId, storagePath, uploaderUid, contentType, sizeBytes, durationSeconds, clipStart, clipEnd, status = 'pending',
}) {
  const check = validateExerciseVideo({ exerciseId, contentType, sizeBytes, durationSeconds, clipStart, clipEnd });
  if (!check.ok) return check;
  if (!VIDEO_STATUSES.includes(status)) return { ok: false, error: 'Ungültiger Status.' };
  if (typeof uploaderUid !== 'string' || !uploaderUid || uploaderUid.length > 128) {
    return { ok: false, error: 'Kein angemeldetes Konto.' };
  }
  const fileId = String(storagePath || '').split('/').pop();
  const expected = exerciseVideoStoragePath(exerciseId, fileId);
  if (!expected || storagePath !== expected || fileId !== uploaderUid) {
    return { ok: false, error: 'Ungültiger Speicherpfad.' };
  }
  const data = {
    exerciseId,
    storagePath,
    uploaderUid,
    duration: check.duration,
    status,
    contentType: check.contentType,
    sizeBytes: check.sizeBytes,
  };
  if (check.clipStart != null && check.clipEnd != null) {
    data.clipStart = check.clipStart;
    data.clipEnd = check.clipEnd;
  }
  return { ok: true, data };
}

export function parseExerciseVideoRecord(id, data) {
  if (!data || typeof data !== 'object' || data.exerciseId !== id || !isExerciseId(id)) return null;
  if (!VIDEO_STATUSES.includes(data.status)) return null;
  const fileId = typeof data.storagePath === 'string' ? data.storagePath.split('/').pop() : '';
  if (data.storagePath !== exerciseVideoStoragePath(id, fileId) || fileId !== data.uploaderUid) return null;
  const record = {
    exerciseId: id,
    storagePath: data.storagePath,
    uploaderUid: typeof data.uploaderUid === 'string' ? data.uploaderUid : '',
    duration: data.duration,
    status: data.status,
    contentType: typeof data.contentType === 'string' ? data.contentType : '',
    sizeBytes: data.sizeBytes,
  };
  if (Number.isFinite(data.clipStart) && Number.isFinite(data.clipEnd) && data.clipEnd > data.clipStart) {
    record.clipStart = data.clipStart;
    record.clipEnd = data.clipEnd;
  }
  return record;
}

// Eigenes Video schlägt den bisherigen Fallback (Katalog, localStorage, Bundle-Clip).
export function resolveExercisePlayback({ exerciseId, ownVideos, fallbackUrl }) {
  const own = exerciseId && ownVideos ? ownVideos[exerciseId] : null;
  const url = typeof own?.url === 'string' ? own.url.trim() : '';
  if (own && VIDEO_STATUSES.includes(own.status) && /^https:\/\//i.test(url)) {
    const clip = Number.isFinite(own.clipStart) && Number.isFinite(own.clipEnd) && own.clipEnd > own.clipStart
      ? { start: own.clipStart, end: own.clipEnd }
      : null;
    return { url, clip, source: 'own', status: own.status };
  }
  return { url: typeof fallbackUrl === 'string' ? fallbackUrl : '', clip: null, source: 'fallback', status: null };
}

export function clipLoopHandlers(clip) {
  if (!clip) return {};
  const seek = (element) => {
    if (element.currentTime < clip.start || element.currentTime >= clip.end - 0.05) {
      element.currentTime = clip.start;
    }
  };
  return {
    onLoadedMetadata(event) { seek(event.currentTarget); },
    onTimeUpdate(event) { seek(event.currentTarget); },
    onEnded(event) {
      const element = event.currentTarget;
      element.currentTime = clip.start;
      element.play?.().catch(() => {});
    },
  };
}

export function mapUploadError(error) {
  const code = error?.code || '';
  if (code === 'storage/canceled') return 'Upload abgebrochen.';
  if (code === 'storage/unauthenticated' || code === 'storage/unauthorized') {
    return 'Bitte anmelden und erneut versuchen.';
  }
  if (code === 'storage/quota-exceeded') return 'Der Speicher ist voll.';
  if (code === 'storage/retry-limit-exceeded') return 'Das Netz hat den Upload unterbrochen. Erneut versuchen.';
  const message = String(error?.message || '');
  if (code === 'storage/bucket-not-found' || /bucket|not found/i.test(message)) {
    return 'Firebase Storage ist für dieses Projekt noch nicht aktiv.';
  }
  if (message && message.length < 180 && !/key|token|secret/i.test(message)) return message;
  return 'Upload fehlgeschlagen. Erneut versuchen.';
}
