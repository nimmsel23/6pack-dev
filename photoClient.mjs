const FUNNEL_BASE = 'https://ideapad.tail7a15d6.ts.net/fitness';
export function photoApiBase({ configured = '', location = globalThis.location } = {}) {
  if (configured) return configured.replace(/\/+$/, '');
  if (!location) return '';
  if (['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) return '';
  if (location.hostname === 'ideapad.tail7a15d6.ts.net') {
    return `${location.origin}/${location.pathname.startsWith('/fitness-dev/') ? 'fitness-dev' : 'fitness'}`;
  }
  return FUNNEL_BASE;
}

function failure(message, { status, retryable = false } = {}) {
  return Object.assign(new Error(message), { status, retryable });
}
export function createPhotoClient({ uid, getIdToken, base = '', fetchImpl = fetch }) {
  const mime = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', heic: 'image/heic', heif: 'image/heif' };
  async function request(route, options = {}) {
    for (let attempt = 0; attempt < 2; attempt++) {
      let token;
      try { token = await getIdToken(attempt > 0); }
      catch { throw failure('Anmeldung abgelaufen. Bitte erneut anmelden.', { status: 401 }); }
      if (!token) throw failure('Bitte zuerst anmelden.', { status: 401 });
      let response;
      try {
        response = await fetchImpl(`${base ? `${base}/` : ''}${route}`, {
          ...options, headers: { ...options.headers, Authorization: `Bearer ${token}` },
          cache: 'no-store', redirect: 'error', signal: options.signal || AbortSignal.timeout(15000),
        });
      } catch (error) {
        if (error.name === 'AbortError') throw error;
        throw failure('Foto-Server nicht erreichbar. Bitte Verbindung prüfen.', { retryable: true });
      }
      if (response.status === 401 && attempt === 0) continue;
      if (response.status === 401) throw failure('Anmeldung abgelaufen. Bitte erneut anmelden.', { status: 401 });
      if (response.status === 403) throw failure('Kein Zugriff auf diese Fotos.', { status: 403 });
      if (!response.ok) throw failure(`Foto-Server meldet Fehler ${response.status}.`, { status: response.status, retryable: response.status >= 500 });
      return response;
    }
  }
  async function json(route, options) {
    const response = await request(route, options);
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw failure('Foto-API fehlt auf diesem Server (HTML statt JSON). Bitte Server aktualisieren.', { retryable: true });
    }
    const data = await response.json();
    if (!data.ok || data.uid !== uid) throw failure('Ungültige Antwort des Foto-Servers.');
    return data;
  }
  return {
    list: () => json('sixpack/photos'),
    upload: (file, id, date) => json(`sixpack/photos?${new URLSearchParams({ filename: file.name, id, date })}`, {
      method: 'POST', body: file, headers: { 'Content-Type': mime[file.name.split('.').pop().toLowerCase()] || file.type },
    }),
    async image(filename, signal) {
      const response = await request(`sixpack-photos/${encodeURIComponent(uid)}/${encodeURIComponent(filename)}`, { signal });
      if (!response.headers.get('content-type')?.startsWith('image/')) throw failure('Foto-Server liefert kein Bild.');
      return response.blob();
    },
  };
}
