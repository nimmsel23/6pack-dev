// Zuordnung und Prüfung eigener Übungsvideos. Kein Firebase, keine Dateien:
// der Upload und die Rules verwenden dieselben Grenzen.

export const MAX_SOURCE_VIDEO_BYTES = 1024 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;
export const MAX_VIDEO_SECONDS = 60;
export const MIN_CLIP_SECONDS = 0.5;
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
  if (end - start < MIN_CLIP_SECONDS) return { error: 'Der Ausschnitt ist zu kurz.' };
  if (end - start > MAX_VIDEO_SECONDS) return { error: 'Der Ausschnitt darf höchstens 60 Sekunden lang sein.' };
  const startRounded = roundSeconds(start);
  const endRounded = roundSeconds(Math.min(end, durationSeconds));
  if (endRounded <= startRounded) return { error: 'Der Ausschnitt ist zu kurz.' };
  return { start: startRounded, end: endRounded };
}

// Anfang der Auswahl. Ein Video über 60 Sekunden startet mit den ersten 60.
export function initialTrim(durationSeconds) {
  const duration = asSeconds(durationSeconds);
  if (duration == null || duration <= 0) return { start: 0, end: 0 };
  return { start: 0, end: roundSeconds(Math.min(duration, MAX_VIDEO_SECONDS)) };
}

// Die Auswahl ist das ganze Video, nicht ein Ausschnitt.
export function trimCoversFile(durationSeconds, start, end) {
  const duration = asSeconds(durationSeconds);
  const rangeStart = asSeconds(start);
  const rangeEnd = asSeconds(end);
  if (duration == null || rangeStart == null || rangeEnd == null || duration <= 0) return false;
  return rangeStart <= 0.02 && Math.abs(rangeEnd - duration) <= 0.02;
}

// Ein Griff zieht das Fenster mit. Die Länge bleibt zwischen 0,5 und 60 Sekunden.
export function moveTrimHandle(durationSeconds, start, end, edge, rawValue) {
  const duration = asSeconds(durationSeconds);
  let rangeStart = asSeconds(start);
  let rangeEnd = asSeconds(end);
  const raw = asSeconds(rawValue);
  if (duration == null || duration <= 0 || rangeStart == null || rangeEnd == null || raw == null) {
    return initialTrim(durationSeconds);
  }
  if (duration <= MIN_CLIP_SECONDS) return { start: 0, end: roundSeconds(duration) };
  const maxSpan = Math.min(MAX_VIDEO_SECONDS, duration);
  const minSpan = MIN_CLIP_SECONDS;
  const next = Math.min(duration, Math.max(0, raw));
  if (edge === 'start') {
    rangeStart = Math.min(next, duration - minSpan);
    rangeEnd = Math.max(rangeEnd, rangeStart + minSpan);
    if (rangeEnd - rangeStart > maxSpan) rangeEnd = rangeStart + maxSpan;
    if (rangeEnd > duration) {
      rangeEnd = duration;
      rangeStart = Math.max(0, rangeEnd - maxSpan);
    }
  } else {
    rangeEnd = Math.max(next, minSpan);
    rangeStart = Math.min(rangeStart, rangeEnd - minSpan);
    if (rangeEnd - rangeStart > maxSpan) rangeStart = rangeEnd - maxSpan;
    if (rangeStart < 0) {
      rangeStart = 0;
      rangeEnd = Math.min(duration, maxSpan);
    }
  }
  rangeStart = Math.max(0, Math.min(rangeStart, duration));
  rangeEnd = Math.max(0, Math.min(rangeEnd, duration));
  if (rangeEnd - rangeStart < minSpan) {
    if (edge === 'start') rangeStart = Math.max(0, rangeEnd - minSpan);
    else rangeEnd = Math.min(duration, rangeStart + minSpan);
  }
  return { start: roundSeconds(rangeStart), end: roundSeconds(rangeEnd) };
}

export function formatTrimSeconds(seconds) {
  const value = asSeconds(seconds);
  const safe = value == null ? 0 : Math.max(0, value);
  return `${roundSeconds(safe).toFixed(1).replace('.', ',')} s`;
}

// Nur die erzeugte stumme Datei darf hochgeladen werden.
export function planExerciseClipUpload({ durationSeconds, start, end, cut } = {}) {
  const duration = asSeconds(durationSeconds);
  const roundedDuration = duration == null ? null : roundSeconds(duration);
  if (roundedDuration == null || roundedDuration <= 0) {
    return { ok: false, error: 'Die Videolänge konnte nicht gelesen werden.' };
  }
  const rangeStart = asSeconds(start);
  const rangeEnd = asSeconds(end);
  if (rangeStart == null || rangeEnd == null) {
    return { ok: false, error: 'Start und Ende müssen Sekunden sein.' };
  }
  const whole = trimCoversFile(duration, rangeStart, rangeEnd);
  let clip = { start: null, end: null };
  if (!whole) {
    clip = normalizeClip(duration, rangeStart, rangeEnd);
    if (clip.error) return { ok: false, error: clip.error };
  }
  // Auch das ganze Video muss als neu verpackte MP4 vorliegen:
  // ohne Tonspur, Index vorn, damit es sofort abspielt.
  if (cut?.file) {
    const cutDuration = asSeconds(cut.durationSeconds);
    const roundedCut = cutDuration == null ? null : roundSeconds(cutDuration);
    if (roundedCut == null || roundedCut <= 0 || roundedCut > MAX_VIDEO_SECONDS + 0.05) {
      return { ok: false, error: 'Der Ausschnitt darf höchstens 60 Sekunden lang sein.' };
    }
    return {
      ok: true,
      mode: 'cut',
      file: cut.file,
      clipStart: null,
      clipEnd: null,
      durationSeconds: Math.min(roundedCut, MAX_VIDEO_SECONDS),
    };
  }
  return { ok: false, error: 'Der Clip konnte auf diesem Gerät nicht geschnitten werden. Es wurde nichts hochgeladen. Bitte eine MP4-/MOV-Datei oder einen kürzeren Ausschnitt versuchen.' };
}

// Wem gehört die Zuordnung der Übung? 'none', 'mine' oder 'other'.
// Ein fremdes Konto kann sie laut Rules weder anlegen noch ändern.
export function exerciseVideoOwnership({ exerciseId, ownVideos, uid } = {}) {
  const record = exerciseId && ownVideos ? ownVideos[exerciseId] : null;
  if (!record) return 'none';
  return typeof uid === 'string' && uid && record.uploaderUid === uid ? 'mine' : 'other';
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
  if (code === 'permission-denied' || code === 'firestore/permission-denied') {
    return 'Keine Berechtigung: Für diese Übung ist schon ein Video eines anderen Kontos hinterlegt.';
  }
  if (code === 'storage/retry-limit-exceeded') return 'Das Netz hat den Upload unterbrochen. Erneut versuchen.';
  const message = String(error?.message || '');
  if (code === 'storage/bucket-not-found' || /bucket|not found/i.test(message)) {
    return 'Firebase Storage ist für dieses Projekt noch nicht aktiv.';
  }
  if (message && message.length < 180 && !/key|token|secret/i.test(message)) return message;
  return 'Upload fehlgeschlagen. Erneut versuchen.';
}

export function mapDeleteError(error) {
  const code = error?.code || '';
  if (code === 'storage/unauthenticated' || code === 'storage/unauthorized' || code === 'unauthenticated') {
    return 'Bitte anmelden und erneut versuchen.';
  }
  if (code === 'exercise-video/taken' || code === 'permission-denied' || code === 'firestore/permission-denied') {
    return 'Dieses Video gehört einem anderen Konto.';
  }
  if (code === 'unavailable' || code === 'storage/retry-limit-exceeded') {
    return 'Kein Netz. Entfernen später erneut versuchen.';
  }
  return 'Entfernen fehlgeschlagen. Erneut versuchen.';
}
