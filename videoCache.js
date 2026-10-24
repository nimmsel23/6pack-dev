// Offline-Cache für Übungs-Loops (Datei-Videos). Cache Storage statt localStorage/IndexedDB:
// speichert Responses effizient als Blobs; Quota-sicher. Eigener Cache-Name ohne SW-Präfix,
// damit der Shell-Service-Worker ihn beim Update nicht räumt. YouTube/Vimeo-Embeds sind
// cross-origin-iframes und lassen sich nicht cachen.
const VIDEO_CACHE = 'sixpack-videos-v1';
const inflight = new Map();

function supported() {
  return typeof caches !== 'undefined' && typeof fetch === 'function';
}

// https-Dateien und eigene Clips derselben Origin (./videos/…, /videos/…); nicht protokoll-relativ (//).
export function isCacheableVideo(url) {
  return typeof url === 'string' && (/^https:\/\//i.test(url) || /^(\/(?!\/)|\.\.?\/)/.test(url));
}

// Cache-Schlüssel: https-URLs unverändert (bestehende Einträge bleiben gültig), relative gegen die
// aktuelle Seite aufgelöst, damit der Schlüssel nicht vom Routen-Pfad abhängt.
function cacheKey(url) {
  if (/^https:\/\//i.test(url)) return url;
  try { return new URL(url, globalThis.location?.href).href; } catch { return url; }
}

async function openCache() {
  return supported() ? caches.open(VIDEO_CACHE) : null;
}

// Liefert eine Blob-URL aus dem Cache oder null, wenn (noch) nicht gecacht.
export async function getCachedVideoBlobUrl(url) {
  try {
    const cache = await openCache();
    const hit = cache && await cache.match(cacheKey(url));
    return hit ? URL.createObjectURL(await hit.blob()) : null;
  } catch { return null; }
}

// Lädt ein Video einmalig in den Cache (CORS, ohne Credentials). Fehler sind still:
// dann spielt der Runner einfach direkt von der Quelle.
export function cacheVideo(url) {
  if (!isCacheableVideo(url) || !supported()) return Promise.resolve(false);
  if (inflight.has(url)) return inflight.get(url);
  const job = (async () => {
    try {
      const cache = await openCache();
      const key = cacheKey(url);
      if (await cache.match(key)) return true;
      const res = await fetch(key, { mode: 'cors', credentials: 'omit' });
      if (!res.ok) return false;
      await cache.put(key, res);
      return true;
    } catch { return false; } finally { inflight.delete(url); }
  })();
  inflight.set(url, job);
  return job;
}

// Nacheinander statt parallel, damit das Laden den Runner und das laufende Video nicht ausbremst.
export async function cacheVideos(urls) {
  for (const url of new Set(urls)) await cacheVideo(url);
}
