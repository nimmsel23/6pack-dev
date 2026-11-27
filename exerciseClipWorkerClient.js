// Verarbeitung außerhalb des UI-Threads. Kein stiller Main-Thread-Fallback.
export function cutExerciseClip(file, start, end, onProgress, { signal } = {}) {
  return new Promise((resolve, reject) => {
    let worker;
    let timer;
    const finish = (error, result) => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', abort);
      worker?.terminate();
      if (error) reject(error);
      else resolve(result);
    };
    const abort = () => finish(new DOMException('Schnitt abgebrochen.', 'AbortError'));
    if (signal?.aborted) { abort(); return; }
    try {
      worker = new Worker(new URL('./exerciseClipWorker.js', import.meta.url), { type: 'module' });
      worker.onmessage = ({ data }) => {
        if (data.type === 'progress') onProgress?.(data.ratio);
        else if (data.type === 'done') finish(null, data.result);
        else if (data.type === 'error') finish(new Error(data.message));
      };
      worker.onerror = (event) => {
        event.preventDefault?.();
        finish(new Error('Die Videoverarbeitung konnte nicht gestartet werden.'));
      };
      signal?.addEventListener('abort', abort, { once: true });
      timer = setTimeout(() => finish(new Error('Die Videoverarbeitung dauert zu lange. Bitte einen kürzeren Clip versuchen.')), 180000);
      worker.postMessage({ file, start, end });
    } catch (error) {
      finish(error);
    }
  });
}
