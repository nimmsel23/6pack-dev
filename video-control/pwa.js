// PWA-Teile von Video-Control: Service Worker, geteiltes Video, Handy-Layout.
import { useEffect, useState } from 'react';

const SHARE = 'vc-share';
const SHARE_KEY = './shared-video';

export function registerWorker() {
  if (import.meta.env?.DEV || typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// Holt das per Teilen-Ziel abgelegte Video einmalig ab (sw.js legt es in den Cache).
export async function takeSharedVideo() {
  const params = new URLSearchParams(location.search);
  if (!params.has('share') || !('caches' in self)) return null;
  history.replaceState(null, '', location.pathname);
  const cache = await caches.open(SHARE);
  const key = new URL(SHARE_KEY, location.href).href;
  const response = await cache.match(key);
  if (!response) return null;
  const blob = await response.blob();
  const name = decodeURIComponent(response.headers.get('X-File-Name') || 'video.mp4');
  await cache.delete(key);
  return new File([blob], name, { type: blob.type || 'video/mp4' });
}

// Touch-Schnitt auf dem Handy, NLE-Schnittfenster mit Maus/großem Bildschirm.
const TOUCH_QUERY = '(pointer: coarse) and (max-width: 900px)';
export function useTouchLayout() {
  const [touch, setTouch] = useState(() => typeof matchMedia === 'function' && matchMedia(TOUCH_QUERY).matches);
  useEffect(() => {
    if (typeof matchMedia !== 'function') return undefined;
    const query = matchMedia(TOUCH_QUERY);
    const update = () => setTouch(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return touch;
}
