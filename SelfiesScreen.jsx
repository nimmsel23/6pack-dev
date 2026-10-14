import { useEffect, useRef, useState } from 'react';
import BackHeader from './BackHeader.jsx';

// Fotos werden direkt hochgeladen; nur fehlgeschlagene Uploads landen in der
// nutzergebundenen Browser-Queue. Alte, unzugeordnete Queues bleiben unberührt.
const SIXPACK_PENDING_KEY = 'fitness-sixpack-selfies-pending-v2';
const LOCAL_SERVER = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
const photoUrl = (route) => `${LOCAL_SERVER ? `${LOCAL_SERVER}/` : ''}${route.replace(/^\//, '')}`;

function loadPendingQueue(uid) {
  try {
    const queue = JSON.parse(window.localStorage.getItem(`${SIXPACK_PENDING_KEY}:${uid}`) || '[]');
    return Array.isArray(queue) ? queue : [];
  } catch { return []; }
}
function savePendingQueue(uid, queue) {
  window.localStorage.setItem(`${SIXPACK_PENDING_KEY}:${uid}`, JSON.stringify(queue));
}

// Backend (fitness/api/routers/sixpack_photos.py) erwartet den Content-Type passend
// zur Dateiendung — nicht file.type verwenden (iOS/HEIC liefert teils leer/anders).
const IMAGE_TYPES = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  heic: 'image/heic', heif: 'image/heif',
};
const contentTypeFor = (name) => IMAGE_TYPES[String(name).split('.').pop().toLowerCase()] || null;

class AuthError extends Error {}

/** Foto mit Authorization laden (<img src> kann keine Header senden) → Blob-URL. */
function AuthImage({ route, getHeaders, alt }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let stale = false;
    let objectUrl = null;
    (async () => {
      try {
        const res = await fetch(photoUrl(route), { headers: await getHeaders(), signal: AbortSignal.timeout(15000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        objectUrl = URL.createObjectURL(await res.blob());
        if (stale) URL.revokeObjectURL(objectUrl); else setSrc(objectUrl);
      } catch { if (!stale) setFailed(true); }
    })();
    return () => { stale = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [route]);
  if (failed) return <div className="w-full h-full flex items-center justify-center text-[10px]" style={{ color: 'var(--dim)' }}>nicht ladbar</div>;
  if (!src) return <div className="w-full h-full" />;
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
}

/** Konvertiert eine DataURL in ein File-Objekt (Offline-Queue → Upload) */
function dataUrlToFile(dataUrl, filename) {
  const [header, data] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bytes = atob(data);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new File([arr], filename, { type: mime });
}

/**
 * Auth: mit getIdToken (Firebase-Build) → Authorization: Bearer <ID-Token>; ohne Token
 * (Local-Modus, Standalone) → x-fitness-uid — das akzeptiert das Backend nur lokal mit
 * FITNESS_SIXPACK_DEV_UID_AUTH=1 und nie hinter einem Proxy/Funnel.
 */
export default function SelfiesScreen({ onBack, uid, getIdToken }) {
  const [serverPhotos, setServerPhotos] = useState([]);
  const [pending, setPending] = useState(() => loadPendingQueue(uid));
  const [serverOk, setServerOk] = useState(null); // null = unbekannt, true/false
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [selectionResults, setSelectionResults] = useState([]);

  const busy = useRef(false);
  const hasUid = typeof uid === 'string' && /^[\w-]{1,128}$/.test(uid);

  /** Auth-Header pro Request frisch holen (ID-Token läuft nach ~1h ab, SDK erneuert es). */
  async function authHeaders() {
    const token = getIdToken ? await getIdToken().catch(() => null) : null;
    return token ? { Authorization: `Bearer ${token}` } : { 'x-fitness-uid': uid };
  }

  /** Holt die Foto-Liste vom Server (uid kommt serverseitig aus dem Token bzw. Dev-Header). */
  async function fetchServerPhotos() {
    try {
      const res = await fetch(photoUrl('sixpack/photos'), {
        headers: await authHeaders(),
        signal: AbortSignal.timeout(5000),
      });
      if (res.status === 401 || res.status === 403) throw new AuthError(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.ok || !Array.isArray(data.photos) || typeof data.uid !== 'string') throw new Error('Invalid photo response');
      setServerOk(true);
      setStatusMsg(msg => (msg.startsWith('Anmeldung') ? '' : msg));
      setServerPhotos(data.photos.map(p => ({
        ...p,
        route: `sixpack-photos/${encodeURIComponent(data.uid)}/${encodeURIComponent(p.filename)}`,
      })));
      return true;
    } catch (err) {
      setServerOk(false);
      if (err instanceof AuthError) setStatusMsg('Anmeldung erforderlich bzw. abgelaufen – Fotos bleiben lokal vorgemerkt.');
      return false;
    }
  }

  /** Raw-Binary-Upload (kein Multipart): Metadaten als Query, Content-Type nach Endung. */
  async function upload(file, id, date) {
    const type = contentTypeFor(file.name);
    if (!type) throw new Error('Unsupported image type');
    const query = new URLSearchParams({ filename: file.name, id, date });
    const res = await fetch(photoUrl(`sixpack/photos?${query}`), {
      method: 'POST',
      headers: { ...(await authHeaders()), 'Content-Type': type },
      body: file,
      signal: AbortSignal.timeout(30000),
    });
    if (res.status === 401 || res.status === 403) throw new AuthError(`HTTP ${res.status}`);
    if (!res.ok || !(await res.json()).ok) throw new Error('Upload failed');
  }

  async function uploadPending() {
    if (!hasUid || busy.current) return;
    busy.current = true;
    setUploading(true);
    try {
      for (const item of loadPendingQueue(uid)) {
        await upload(dataUrlToFile(item.dataUrl, item.name), item.id, item.date);
        // Read fresh storage so photos queued elsewhere are retained.
        const remaining = loadPendingQueue(uid).filter(p => p.id !== item.id);
        savePendingQueue(uid, remaining);
        setPending(remaining);
      }
      await fetchServerPhotos();
    } catch {
      setServerOk(false);
      setStatusMsg('Synchronisierung ausstehend – bitte erneut versuchen.');
    } finally {
      busy.current = false;
      setUploading(false);
    }
  }

  useEffect(() => {
    if (!hasUid) return;
    let cancelled = false;
    async function init() {
      const ok = await fetchServerPhotos();
      if (!cancelled && ok) await uploadPending();
    }
    init();
    window.addEventListener('online', init);
    return () => { cancelled = true; window.removeEventListener('online', init); };
  }, []);

  async function onFile(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!hasUid || !files.length || busy.current) return;
    busy.current = true;
    setUploading(true);
    setStatusMsg('');
    setSelectionResults([]);
    let saved = 0;
    try {
      for (const [index, file] of files.entries()) {
        setStatusMsg(`Foto ${index + 1} von ${files.length} wird verarbeitet …`);
        let message;
        if (!file.size || file.size > 20 * 1024 * 1024 || !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
          message = 'Nicht gespeichert: JPG, PNG, WebP oder HEIC/HEIF bis 20 MB erforderlich.';
        } else {
          const item = { id: crypto.randomUUID(), date: new Date().toISOString(), name: file.name };
          try {
            await upload(file, item.id, item.date);
            saved++;
            message = 'Gespeichert';
          } catch {
            setServerOk(false);
            try {
              item.dataUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
              const queue = [...loadPendingQueue(uid), item];
              savePendingQueue(uid, queue);
              setPending(queue);
              message = 'Offline gespeichert – Synchronisierung ausstehend';
            } catch {
              message = 'Nicht gespeichert: Browserspeicher voll oder nicht verfügbar. Bitte Original behalten.';
            }
          }
        }
        setSelectionResults(results => [...results, { name: file.name, message }]);
      }
      if (saved) await fetchServerPhotos();
      setStatusMsg(`${files.length} Foto${files.length === 1 ? '' : 's'} verarbeitet.`);
    } finally {
      busy.current = false;
      setUploading(false);
    }
  }

  if (!hasUid) return <div><BackHeader label="Selfies" onBack={onBack} /><p>Bitte zuerst anmelden, um deine Fotos zu öffnen.</p></div>;

  // Alle sichtbaren Fotos: Server-Fotos zuerst, dann ausstehende LocalStorage-Fotos
  const allPhotos = [
    ...serverPhotos.map(p => ({ ...p, source: 'server' })),
    ...pending.map(p => ({ date: p.date, dataUrl: p.dataUrl, source: 'pending' })),
  ];

  return (
    <div>
      <BackHeader label="Selfies" onBack={onBack} />

      {/* Upload-Button */}
      <label
        className="block px-4 py-3 text-center text-sm font-black uppercase tracking-[0.12em]"
        style={{ background: uploading ? '#a01010' : '#e2001a', color: '#fff', cursor: uploading ? 'wait' : 'pointer' }}
      >
        {uploading ? 'Uploading…' : 'Foto aufnehmen'}
        <input type="file" accept="image/*" capture="environment" className="hidden" onChange={onFile} disabled={uploading} />
      </label>

      <label
        className="block px-4 py-3 text-center text-sm font-black uppercase tracking-[0.12em]"
        style={{ background: '#222', color: '#fff', cursor: uploading ? 'wait' : 'pointer' }}
      >
        Fotos auswählen
        <input type="file" accept="image/*" multiple className="hidden" onChange={onFile} disabled={uploading} />
      </label>
      {selectionResults.length > 0 && (
        <ul className="px-4 py-2 text-xs space-y-1" aria-live="polite">
          {selectionResults.map((result, index) => <li key={index}>{result.name}: {result.message}</li>)}
        </ul>
      )}

      {/* Status-Zeile */}
      {(statusMsg || serverOk !== null) && (
        <div
          className="px-4 py-2 text-xs text-center font-bold"
          style={{ color: serverOk ? '#4ade80' : '#facc15', background: '#0e0e0e' }}
        >
          {statusMsg || (serverOk
            ? `🟢 Server online — ${serverPhotos.length} Foto${serverPhotos.length !== 1 ? 's' : ''} gespeichert`
            : `🟡 Server offline — ${pending.length} Foto${pending.length !== 1 ? 's' : ''} ausstehend`
          )}
        </div>
      )}

      {pending.length > 0 && (
        <button className="w-full py-2 text-sm" onClick={() => { setStatusMsg(''); uploadPending(); }} disabled={uploading}>
          Jetzt synchronisieren ({pending.length})
        </button>
      )}

      {/* Galerie */}
      {allPhotos.length === 0 ? (
        <div className="p-6 text-center text-sm" style={{ color: 'var(--dim)' }}>Noch keine Fortschrittsfotos.</div>
      ) : (
        <div className="grid grid-cols-3 gap-px p-px" style={{ background: 'var(--line)' }}>
          {allPhotos.map((photo, i) => (
            <div
              key={i}
              className="aspect-square relative"
              style={{ background: '#000' }}
            >
              {photo.source === 'server' ? (
                <AuthImage
                  route={photo.route}
                  getHeaders={authHeaders}
                  alt={new Date(photo.date).toLocaleDateString('de-AT')}
                />
              ) : (
                <img
                  src={photo.dataUrl}
                  alt={new Date(photo.date).toLocaleDateString('de-AT')}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Pending-Indikator */}
              {photo.source === 'pending' && (
                <div
                  className="absolute top-1 right-1 text-[9px] font-black px-1 rounded"
                  style={{ background: '#facc15', color: '#000' }}
                >
                  ↑
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


