// Service Worker von 6Pack Videos.
// - Shell: Netz zuerst (kurz), sonst Cache, damit die App auch ohne Netz startet.
// - Gehashte Assets: Cache zuerst.
// - Teilen-Ziel: POST ./share legt das geteilte Video im Cache ab und öffnet ./?share=1.
const SHELL = 'vc-shell-v1';
const SHARE = 'vc-share';
const SHARE_KEY = './shared-video';
const scope = new URL(self.registration.scope);

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const name of await caches.keys()) if (name.startsWith('vc-shell-') && name !== SHELL) await caches.delete(name);
  await self.clients.claim();
})()));

async function share(request) {
  const form = await request.formData();
  const file = form.getAll('video').find(item => item && typeof item === 'object' && item.size > 0);
  if (file) {
    const cache = await caches.open(SHARE);
    await cache.put(new URL(SHARE_KEY, scope).href, new Response(file, {
      headers: { 'Content-Type': file.type || 'video/mp4', 'X-File-Name': encodeURIComponent(file.name || 'video.mp4') },
    }));
  }
  return Response.redirect(new URL(file ? './?share=1' : './', scope).href, 303);
}

async function fresh(request, timeoutMs) {
  const cache = await caches.open(SHELL);
  const network = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });
  const timeout = new Promise(resolve => setTimeout(resolve, timeoutMs));
  const first = await Promise.race([network.catch(() => null), timeout]);
  if (first) return first;
  return (await cache.match(request)) || network;
}

async function cached(request) {
  const cache = await caches.open(SHELL);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin !== scope.origin || !url.href.startsWith(scope.href)) return;
  if (request.method === 'POST' && url.pathname.endsWith('/share')) { event.respondWith(share(request)); return; }
  if (request.method !== 'GET') return;
  if (request.mode === 'navigate') { event.respondWith(fresh(request, 800)); return; }
  if (url.pathname.includes('/assets/')) { event.respondWith(cached(request)); return; }
  if (/\.(png|webmanifest)$/.test(url.pathname)) event.respondWith(fresh(request, 800));
});
