import { useEffect, useMemo, useState } from 'react';
import BackHeader from './BackHeader.jsx';
import SelfiesGallery from './SelfiesGallery.jsx';
import { createPhotoClient, photoApiBase } from './photoClient.mjs';
import { watchPhotoUser, loginGoogle, loginEmail, logoutPhotos } from './photoAuth.js';

export default function SelfiesScreen({ onBack }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    try {
      return watchPhotoUser(value => { setUser(value); setReady(true); }, err => { setError(err.message); setReady(true); });
    } catch (err) { setError(err.message); setReady(true); }
  }, []);
  const client = useMemo(() => user ? createPhotoClient({
    uid: user.uid, getIdToken: force => user.getIdToken(force),
    base: photoApiBase({ configured: import.meta.env.VITE_SIXPACK_API_BASE || import.meta.env.VITE_API_BASE || '' }),
  }) : null, [user]);
  async function login(action) {
    setBusy(true); setError('');
    try { await action(); }
    catch { setError('Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen oder erneut versuchen.'); }
    finally { setBusy(false); }
  }
  if (user) return <div>
    <div className="flex justify-between px-4 py-2 text-xs">
      <span>{user.email || 'Angemeldet'}</span>
      <button onClick={() => login(logoutPhotos)} disabled={busy}>Abmelden</button>
    </div>
    {error && <p role="alert">{error}</p>}
    <SelfiesGallery key={user.uid} onBack={onBack} uid={user.uid} client={client} />
  </div>;
  return <div>
    <BackHeader label="Selfies" onBack={onBack} />
    <div className="p-4 space-y-3">
      <p>{ready ? 'Melde dich mit deinem Fitness-Konto an, um deine privaten Fotos zu öffnen.' : 'Anmeldung wird geprüft …'}</p>
      {error && <p role="alert">{error}</p>}
      <button className="w-full py-3 bg-red-700 text-white" disabled={!ready || busy} onClick={() => login(loginGoogle)}>Mit Google anmelden</button>
      <form className="space-y-2" onSubmit={event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login(() => loginEmail(data.get('email'), data.get('password')));
      }}>
        <input className="w-full p-2 text-black" name="email" type="email" autoComplete="username" placeholder="E-Mail" aria-label="E-Mail" required />
        <input className="w-full p-2 text-black" name="password" type="password" autoComplete="current-password" placeholder="Passwort" aria-label="Passwort" required />
        <button className="w-full py-2" disabled={!ready || busy}>Mit E-Mail anmelden</button>
      </form>
    </div>
  </div>;
}
