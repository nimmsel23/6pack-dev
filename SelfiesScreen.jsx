import { useEffect, useRef, useState } from 'react';
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { config } from './firebaseConfig.js';
import BackHeader from './BackHeader.jsx';
import { listSelfies, prepareSelfie, uploadSelfie } from './selfieCloud.js';

// Fotos werden direkt hochgeladen; nur fehlgeschlagene Uploads landen in der
// nutzergebundenen Browser-Queue. Alte, unzugeordnete Queues bleiben unberührt.
const SIXPACK_PENDING_KEY = 'fitness-sixpack-selfies-pending-v2';
function loadPendingQueue(uid) {
  try {
    const queue = JSON.parse(window.localStorage.getItem(`${SIXPACK_PENDING_KEY}:${uid}`) || '[]');
    return Array.isArray(queue) ? queue : [];
  } catch { return []; }
}
function savePendingQueue(uid, queue) {
  window.localStorage.setItem(`${SIXPACK_PENDING_KEY}:${uid}`, JSON.stringify(queue));
}

export default function SelfiesScreen({ onBack, uid }) {
  const [auth] = useState(() => getAuth(getApps().length ? getApp() : initializeApp(config)));
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState('');
  useEffect(() => onAuthStateChanged(auth, setUser), [auth]);
  if (!user) return (
    <div>
      <BackHeader label="Selfies" onBack={onBack} />
      <p className="p-4">Melde dich mit demselben Konto wie auf deinem anderen Gerät an.</p>
      <button className="p-4 underline" onClick={() => signInWithPopup(auth, new GoogleAuthProvider()).catch(e => setError(e.message))}>Mit Google anmelden</button>
      {error && <p role="alert" className="p-4">{error}</p>}
    </div>
  );
  if (uid && uid !== 'local' && uid !== user.uid) return (
    <div><BackHeader label="Selfies" onBack={onBack} /><p className="p-4">Selfies sind nur für das eigene angemeldete Konto verfügbar.</p></div>
  );
  return <SelfieGallery key={user.uid} uid={user.uid} onBack={onBack} />;
}

function SelfieGallery({ onBack, uid }) {
  const [serverPhotos, setServerPhotos] = useState([]);
  const [pending, setPending] = useState(() => loadPendingQueue(uid));
  const [serverOk, setServerOk] = useState(null); // null = unbekannt, true/false
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [selectionResults, setSelectionResults] = useState([]);

  const busy = useRef(false);
  const hasUid = uid !== 'local' && typeof uid === 'string' && /^[\w-]{1,128}$/.test(uid);

  /** Loads the signed-in user’s cloud gallery. */
  async function fetchServerPhotos() {
    try {
      const photos = await listSelfies(uid);
      setServerOk(true);
      setServerPhotos(photos);
      return true;
    } catch {
      setServerOk(false);
      return false;
    }
  }

  async function uploadPending() {
    if (!hasUid || busy.current) return;
    busy.current = true;
    setUploading(true);
    try {
      for (const item of loadPendingQueue(uid)) {
        const dataUrl = item.dataUrl.startsWith('data:image/jpeg;base64,') && item.dataUrl.length <= 700000
          ? item.dataUrl : await prepareSelfie(await (await fetch(item.dataUrl)).blob());
        await uploadSelfie(uid, item.id, item.date, dataUrl);
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
            item.dataUrl = await prepareSelfie(file);
            await uploadSelfie(uid, item.id, item.date, item.dataUrl);
            saved++;
            message = 'Gespeichert';
          } catch {
            setServerOk(false);
            try {
              if (!item.dataUrl) throw new Error('Bildformat nicht lesbar.');
              const queue = [...loadPendingQueue(uid), item];
              savePendingQueue(uid, queue);
              setPending(queue);
              message = 'Offline gespeichert – Synchronisierung ausstehend';
            } catch {
              message = 'Nicht gespeichert: Bild nicht lesbar oder Browserspeicher voll. Bitte Original behalten.';
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
    ...pending.filter(p => !serverPhotos.some(s => s.id === p.id)).map(p => ({ date: p.date, dataUrl: p.dataUrl, source: 'pending' })),
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
            ? `🟢 Cloud verbunden — ${serverPhotos.length} Foto${serverPhotos.length !== 1 ? 's' : ''} gespeichert`
            : `🟡 Cloud nicht erreichbar — ${pending.length} Foto${pending.length !== 1 ? 's' : ''} ausstehend`
          )}
        </div>
      )}

      {(
        <button className="w-full py-2 text-sm" onClick={() => { setStatusMsg(''); uploadPending(); }} disabled={uploading}>
          Jetzt synchronisieren{pending.length > 0 ? ` (${pending.length})` : ''}
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
              <img
                src={photo.source === 'server' ? photo.url : photo.dataUrl}
                alt={new Date(photo.date).toLocaleDateString('de-AT')}
                className="w-full h-full object-cover"
              />
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


