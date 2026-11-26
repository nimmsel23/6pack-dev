import { subscribeSync, submitWorkout, loadProgram, saveProgram, enableSixpackPush } from '../sixpackCloud.js';
import { useEffect, useState } from 'react';
import { SkillsEmbed } from './embed.jsx';
import PersistenceStatus from './PersistenceStatus.jsx';
import DesignSwitcher from './designs/DesignSwitcher.jsx';
import { readDesign, saveDesign } from './designs/index.js';
import { SixPackEmbed } from '../embed.jsx';
import { isNativeApp, nativeReminderDelivery, watchNativeResume } from '../nativeReminders.js';

export function readRoute(hash) {
  const raw = hash.replace(/^#\/?/, '');
  const [path, query] = raw.split('?');
  const skill = new URLSearchParams(query).get('skill');
  if (skill) return skill;
  if (path === 'setup') return 'settings';
  return path.replace(/^skills\/?/, '');
}

// 6Pack keeps its complete UI and durable workout/program storage.
// Optional kontrolliert (Einbettung in Fitness): route/onRouteChange statt location.hash, onClose = Zurück.
export default function CoreSkills({ uid: hostUid, route: controlledRoute, onRouteChange, onWorkoutComplete, onClose, onNavigate } = {}) {
  const controlled = controlledRoute !== undefined;
  const [hashRoute, setRoute] = useState(() => controlled ? '' : readRoute(location.hash));
  const route = controlled ? controlledRoute : hashRoute;
  const [design, setDesign] = useState(readDesign);
  const [sync, setSync] = useState({ user: null });
  useEffect(() => subscribeSync(setSync), []);
  useEffect(() => {
    let disposed = false, stop;
    watchNativeResume(() => document.dispatchEvent(new Event('visibilitychange'))).then(cleanup => { if (disposed) cleanup(); else stop = cleanup; });
    return () => { disposed = true; stop?.(); };
  }, []);
  useEffect(() => {
    if (controlled) return;
    const read = () => setRoute(readRoute(location.hash));
    window.addEventListener('hashchange', read);
    return () => window.removeEventListener('hashchange', read);
  }, []);
  const navigate = (next) => { if (controlled) onRouteChange?.(next); else location.hash = next; };
  const uid = hostUid !== undefined ? hostUid : sync.user?.uid || 'local';
  const complete = onWorkoutComplete || submitWorkout;
  const settings = route === 'settings' || route === 'setup';
  const sixpack = settings || route === 'sixpack' || route.startsWith('sixpack/');
  return <main data-theme="skills" className="core-skills min-h-dvh">
    {onClose && <button type="button" onClick={onClose} className="m-3 rounded-xl px-4 py-2" aria-label="Zurück zu Fitness">Zurück zu Fitness</button>}
    {sixpack ? <div className="core-skills-sixpack core-skills-content">
      <SixPackEmbed key={uid} uid={uid} route={settings ? 'settings' : route.replace(/^sixpack\/?/, '')}
        onRouteChange={next => navigate(next.startsWith('skills') ? next.replace(/^skills\/?/, '') : next === 'settings' ? 'settings' : `sixpack/${next}`)}
        onWorkoutComplete={complete} loadRemoteProgram={loadProgram} saveRemoteProgram={saveProgram}
        enablePush={isNativeApp || controlled ? undefined : enableSixpackPush} localReminders={nativeReminderDelivery}
        setupContent={<><PersistenceStatus /><DesignSwitcher value={design} onChange={id => { saveDesign(id); setDesign(id); }} /></>}
        onNavigate={target => { if (onNavigate) return onNavigate(target); if (target === 'fuel') window.location.assign('https://fuel-vos.web.app'); }} />
    </div> : <SkillsEmbed uid={uid} onWorkoutComplete={complete} route={route} onRouteChange={navigate} design={design} />}
  </main>;
}
