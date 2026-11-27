import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RefreshCw, Video, ExternalLink, Check, Trash2 } from 'lucide-react';
import { loginEmail, loginGoogle, logoutPhotos, watchPhotoUser } from '../photoAuth.js';
import { deleteExerciseVideo, uploadExerciseVideo } from '../exerciseVideoCloud.js';
import ExerciseVideoUpload from '../ExerciseVideoUpload.jsx';
import { SIXPACK_EXERCISE_DETAILS } from '../sixpackData.generated.js';
import { canManageTeam, setVideoStatus, videoUrl, watchVideos } from './cloud.js';
import '../styles.css';
import './style.css';

const nameOf = id => SIXPACK_EXERCISE_DETAILS[id]?.name || id;
const formatDate = value => value ? new Date(value).toLocaleString('de-AT') : 'Zeitstempel fehlt';
function problem(error) {
  if (error?.code?.includes('permission-denied') || error?.code === 'storage/unauthorized') return 'Zugriff verweigert. Anmeldung und Kontorechte prüfen.';
  if (error?.code === 'storage/object-not-found') return 'Die Zuordnung existiert, aber die Videodatei fehlt im Storage.';
  if (error?.code === 'auth/unauthorized-domain') return 'Diese Adresse ist für die Anmeldung nicht freigeschaltet. Bitte http://localhost:5173/video-control.html öffnen.';
  return error?.message || 'Laden fehlgeschlagen. Bitte erneut versuchen.';
}

function Login() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function signIn(action) {
    setBusy(true); setError('');
    try { await action(); } catch (err) { setError(problem(err)); } finally { setBusy(false); }
  }
  return <section className="login">
    <h2>Mit deinem 6Pack-Konto anmelden</h2>
    <p>Du siehst dieselben Übungsvideos wie in der App. Änderungen werden direkt in Firebase gespeichert.</p>
    <button disabled={busy} className="primary" onClick={() => signIn(loginGoogle)}>Mit Google anmelden</button>
    <form onSubmit={event => {
      event.preventDefault(); const fields = new FormData(event.currentTarget);
      signIn(() => loginEmail(fields.get('email'), fields.get('password')));
    }}>
      <label>E-Mail<input name="email" type="email" autoComplete="username" required /></label>
      <label>Passwort<input name="password" type="password" autoComplete="current-password" required /></label>
      <button disabled={busy} type="submit">{busy ? 'Anmeldung läuft …' : 'Mit E-Mail anmelden'}</button>
    </form>
    {error && <p role="alert" className="error">{error}</p>}
  </section>;
}

function Inspector({ record, user, teamManager }) {
  const [attempt, setAttempt] = useState(0);
  const [media, setMedia] = useState({ phase: 'loading', url: '', error: '' });
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const mine = user.uid === record.uploaderUid;
  useEffect(() => {
    let active = true;
    setMedia({ phase: 'loading', url: '', error: '' });
    const timer = setTimeout(() => {
      if (active) setMedia({ phase: 'error', url: '', error: 'Storage antwortet noch nicht. Verbindung prüfen und erneut laden.' });
    }, 20000);
    videoUrl(record).then(url => {
      if (active) setMedia({ phase: 'ready', url, error: '' });
    }, error => {
      if (active) setMedia({ phase: 'error', url: '', error: problem(error) });
    }).finally(() => clearTimeout(timer));
    return () => { active = false; clearTimeout(timer); };
  }, [record.id, record.storagePath, record.valid, attempt]);
  async function change(action, success) {
    setBusy(true); setNotice('');
    try { await action(); setNotice(success); } catch (error) { setNotice(problem(error)); } finally { setBusy(false); }
  }
  return <aside className="inspector" aria-label="Videodetails">
    <h2>{nameOf(record.id)}</h2>
    <p className="muted">{record.id}</p>
    {media.phase === 'loading' && <div className="preview-placeholder" role="status">Videodatei wird geprüft …</div>}
    {media.url && <video key={media.url} src={media.url} controls muted playsInline preload="metadata"
      onLoadedMetadata={event => {
        const video = event.currentTarget;
        if (Number.isFinite(record.clipStart)) video.currentTime = record.clipStart;
        setMedia(current => ({ ...current, error: '' }));
      }}
      onTimeUpdate={event => {
        if (Number.isFinite(record.clipEnd) && event.currentTarget.currentTime >= record.clipEnd) event.currentTarget.pause();
      }}
      onError={event => setMedia(current => ({ ...current, error: `Der Player kann das Video nicht laden (Medienfehler ${event.currentTarget.error?.code || 'unbekannt'}). Datei-Link separat testen.` }))} />}
    {media.error && <p role="alert" className="error">{media.error}</p>}
    <div className="actions">
      <button onClick={() => setAttempt(value => value + 1)}><RefreshCw size={15} /> Datei erneut prüfen</button>
      {media.url && <a className="button" href={media.url} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Datei öffnen</a>}
    </div>
    <dl>
      <dt>Zuordnung</dt><dd className={record.valid ? '' : 'error'}>{record.valid ? 'Vom App-Client lesbar' : 'Ungültiger Datensatz'}</dd>
      <dt>Status</dt><dd>{record.status || 'Fehlt'}</dd>
      <dt>Sichtbarkeit</dt><dd>Angemeldete Konten; auch bei „pending“</dd>
      <dt>Dauer / Größe</dt><dd>{Number(record.duration || 0).toFixed(2)} s · {(Number(record.sizeBytes || 0) / 1048576).toFixed(1)} MiB</dd>
      <dt>Format</dt><dd>{record.contentType || 'Unbekannt'}</dd>
      <dt>Hochgeladen</dt><dd>{formatDate(record.createdAt)}</dd>
      <dt>Konto</dt><dd>{record.uploaderUid}{mine ? ' (du)' : ''}</dd>
      <dt>Storage-Pfad</dt><dd>{record.storagePath || 'Fehlt'}</dd>
      {record.clipStart != null && <><dt>Abspielbereich</dt><dd>{record.clipStart} – {record.clipEnd} s</dd></>}
    </dl>
    {(mine || teamManager) && record.valid && <div className="actions">
      <button disabled={busy} className="primary" onClick={() => change(() => setVideoStatus(record.id, record.status === 'approved' ? 'pending' : 'approved'), 'Status gespeichert.')}>
        <Check size={15} />{record.status === 'approved' ? 'Auf ausstehend setzen' : 'Freigeben'}
      </button>
      {mine && <button disabled={busy} onClick={() => setConfirmDelete(value => !value)}><Trash2 size={15} /> Entfernen …</button>}
    </div>}
    {confirmDelete && <div className="confirmation">
      <p>Dein Video und die Zuordnung zu dieser Übung entfernen? Danach läuft wieder das Standardvideo.</p>
      <button className="danger" disabled={busy} onClick={() => change(() => deleteExerciseVideo(record.id), 'Video entfernt.')}>Video endgültig entfernen</button>
      <button disabled={busy} onClick={() => setConfirmDelete(false)}>Behalten</button>
    </div>}
    {notice && <p role="status">{notice}</p>}
    <p className="muted small">Freigeben ändert den Prüfstatus. Es behebt keine Lade- oder Verbindungsfehler auf anderen Geräten.</p>
  </aside>;
}

export function VideoControlPanel() {
  const [session, setSession] = useState({ ready: false, user: null });
  const [teamManager, setTeamManager] = useState(false);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromCache, setFromCache] = useState(true);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState('bent_knee_windshield_wipers');
  const [uploadId, setUploadId] = useState('');
  const [source, setSource] = useState(null);
  useEffect(() => watchPhotoUser(user => {
    setSession({ ready: true, user }); setRecords([]); setSource(null); setUploadId('');
  }, err => { setError(problem(err)); setSession({ ready: true, user: null }); }), []);
  useEffect(() => {
    setTeamManager(false);
    if (!session.user) return undefined;
    let active = true;
    setLoading(true); setError('');
    canManageTeam(session.user).then(value => { if (active) setTeamManager(value); }).catch(() => {});
    const stop = watchVideos((next, metadata) => {
      if (!active) return;
      setRecords(next); setFromCache(metadata.fromCache); setLoading(false);
    }, err => { if (active) { setError(problem(err)); setLoading(false); } });
    return () => { active = false; stop(); };
  }, [session.user, retry]);
  const videos = records.filter(record => {
    const matches = `${nameOf(record.id)} ${record.id} ${record.uploaderUid}`.toLowerCase().includes(query.toLowerCase());
    return matches && (filter === 'all' || (filter === 'invalid' ? !record.valid : filter === 'mine' ? record.uploaderUid === session.user?.uid : record.status === filter));
  }).sort((a, b) => nameOf(a.id).localeCompare(nameOf(b.id)));
  const record = videos.find(item => item.id === selected) || videos[0];
  return <main>
    <header><div><h1><Video size={27} /> Video-Control</h1><p>6Pack · Übungsvideos verwalten</p></div>
      <a href="https://vos-6pack.web.app" target="_blank" rel="noreferrer">Standalone-App öffnen <ExternalLink size={14} /></a>
    </header>
    {!session.ready ? <p role="status">Anmeldung wird geprüft …</p> : !session.user ? <Login /> : <>
      <section className="account" aria-label="Angemeldetes Konto"><span>{session.user.email || session.user.uid}<small>{teamManager ? 'Coach · Teamstatus bearbeiten' : 'Eigene Videos bearbeiten · Teamvideos ansehen'}</small></span>
        <button onClick={() => logoutPhotos().catch(err => setError(problem(err)))}>Abmelden</button>
      </section>
      <div className="toolbar">
        <label className="search">Suche<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Übung, ID oder Konto" /></label>
        <label>Auswahl<select value={filter} onChange={event => setFilter(event.target.value)}><option value="all">Alle Videos</option><option value="pending">Ausstehend</option><option value="approved">Freigegeben</option><option value="mine">Meine Videos</option><option value="invalid">Ungültige Zuordnung</option></select></label>
        <button onClick={() => setRetry(value => value + 1)}><RefreshCw size={16} /> Aktualisieren</button>
      </div>
      <p className="sync" role="status">{loading ? 'Videoliste wird geladen …' : `${videos.length} von ${records.length} Videos · ${fromCache ? 'Lokaler Cache · Serverbestätigung steht aus' : 'Live mit Firebase verbunden'}`}</p>
      {error && <p role="alert" className="error">{error}</p>}
      <div className="workspace">
        <section aria-label="Videoliste" className="list">
          {videos.length ? <table><thead><tr><th>Übung</th><th>Status</th><th>Dauer</th></tr></thead><tbody>{videos.map(item => <tr key={item.id} data-selected={item.id === record?.id}>
            <td><button className="row-link" aria-pressed={item.id === record?.id} onClick={() => setSelected(item.id)}>{nameOf(item.id)}<small>{item.uploaderUid === session.user.uid ? 'Dein Video' : 'Teamvideo'} · {(Number(item.sizeBytes || 0) / 1048576).toFixed(1)} MiB</small></button></td>
            <td><span className={`badge ${!item.valid ? 'invalid' : item.status}`}>{!item.valid ? 'Ungültig' : item.status === 'approved' ? 'Freigegeben' : 'Ausstehend'}</span></td>
            <td>{Number(item.duration || 0).toFixed(1)} s</td>
          </tr>)}</tbody></table> : !loading && <p className="empty">{records.length ? 'Keine Videos für diese Suche. Filter ändern oder Suche leeren.' : 'Noch keine Videos vorhanden. Unten eine Übung wählen und den ersten Clip hochladen.'}</p>}
        </section>
        {record && <Inspector key={`${session.user.uid}:${record.id}`} record={record} user={session.user} teamManager={teamManager} />}
      </div>
      <section className="upload"><h2>Video hochladen oder ersetzen</h2>
        <label>Zielübung<select value={uploadId} onChange={event => setUploadId(event.target.value)}><option value="">Übung wählen …</option>{Object.values(SIXPACK_EXERCISE_DETAILS).sort((a,b) => a.name.localeCompare(b.name)).map(exercise => <option key={exercise.id} value={exercise.id}>{exercise.name}</option>)}</select></label>
        {uploadId && <ExerciseVideoUpload key={`${session.user.uid}:${uploadId}`} exerciseId={uploadId} exerciseName={nameOf(uploadId)} signedIn
          ownership={records.some(item => item.id === uploadId) ? records.find(item => item.id === uploadId).uploaderUid === session.user.uid ? 'mine' : 'other' : 'none'}
          onUpload={uploadExerciseVideo} onDelete={deleteExerciseVideo} videoSource={source} onVideoSourceChange={setSource} />}
      </section>
    </>}
    <footer>Firebase-Projekt fitness-aos · Lokales Werkzeug · Keine Admin-Zugangsdaten im Browser</footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<VideoControlPanel />);
