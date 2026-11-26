// Schneidet den bestätigten Ausschnitt als eigene MP4, ohne neu zu kodieren.
// Auf dem iPhone (Safari, PWA, iframe) fällt alles andere aus:
// ffmpeg.wasm braucht SharedArrayBuffer und sprengt den Speicher,
// MediaRecorder und captureStream liefern dort oft ein Standbild,
// WebCodecs-Neukodierung von HEVC ist auf dem Gerät nicht verlässlich.
// Stattdessen werden die vorhandenen Pakete kopiert (H.264 oder HEVC, auch MOV).
// Geht das nicht, wirft diese Funktion und der Aufrufer speichert clipStart/clipEnd.
// Die Tonspur fällt weg: Übungsvideos laufen immer stumm, Gespräche im Studio
// sollen nicht mit hochgehen, und die Datei wird kleiner.

import { MAX_VIDEO_BYTES } from './exerciseVideo.js';

function unavailable() {
  const error = new Error('Der Clip konnte auf diesem Gerät nicht geschnitten werden.');
  error.code = 'clip-cut-unavailable';
  return error;
}

export async function cutExerciseClip(file, start, end, onProgress) {
  const {
    Input, Output, Conversion, Mp4OutputFormat, BufferTarget, BlobSource, BufferSource, MP4, QTFF,
  } = await import('mediabunny');
  const input = new Input({ source: new BlobSource(file), formats: [MP4, QTFF] });
  try {
    const target = new BufferTarget();
    const output = new Output({
      format: new Mp4OutputFormat({ fastStart: 'in-memory' }),
      target,
    });
    const conversion = await Conversion.init({
      input,
      output,
      tracks: 'primary',
      audio: { discard: true },
      trim: { start, end },
      copy: { mode: 'forced', boundaryPolicy: 'expand', shiftTolerance: 0 },
      showWarnings: false,
    });
    const videoKept = conversion.utilizedTracks.some((track) => track.isVideoTrack());
    if (!conversion.isValid || !videoKept) throw unavailable();
    conversion.onProgress = (ratio) => onProgress?.(ratio);
    await conversion.execute();
    const buffer = target.buffer;
    if (!buffer || buffer.byteLength <= 0 || buffer.byteLength > MAX_VIDEO_BYTES) throw unavailable();
    let durationSeconds = Math.max(0, end - start);
    const check = new Input({ source: new BufferSource(buffer), formats: [MP4, QTFF] });
    try {
      const measured = await check.computeDuration();
      if (Number.isFinite(measured) && measured > 0) durationSeconds = measured;
    } catch {
      // Die Auswahl bleibt die Länge, wenn die neue Datei sie nicht nennt.
    } finally {
      check.dispose();
    }
    const clip = new File([buffer], 'clip.mp4', { type: 'video/mp4' });
    return { file: clip, durationSeconds };
  } finally {
    input.dispose();
  }
}
