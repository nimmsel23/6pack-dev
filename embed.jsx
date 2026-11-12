import SixPackPromiseCard from './SixPackApp.jsx';
import { enableSixpackPush } from './push.js';

// Einstieg für die VitalOS-Shell (Submodule 6pack-app).
// embedded ist der Default: kein documentElement, kein theme-color, kein
// location.hash. Die Shell bildet route auf #sixpack/<route> ab.
// onWorkoutComplete erhält das Workout unverändert, inklusive stabilem runId.
export function SixPackEmbed({
  uid,
  embedded = true,
  route = '',
  onRouteChange,
  onNavigate,
  onWorkoutComplete,
  loadRemoteProgram,
  saveRemoteProgram,
  firebaseApp,
  enablePush,
  localReminders,
  setupContent,
  onSubNav,
  coachingNotes,
}) {
  const push = enablePush || (firebaseApp ? (id) => enableSixpackPush(id, { firebaseApp }) : undefined);
  const routeChange = (next) => {
    onRouteChange?.(next);
    // Alte Hosts hören auf den Skills-Subtab statt auf den Route-String.
    if (onSubNav && (next === 'skills' || String(next).startsWith('skills/'))) onSubNav('skills');
  };
  const navigate = (target) => {
    if (onNavigate) return onNavigate(target);
    onSubNav?.(target);
  };
  return (
    <SixPackPromiseCard
      uid={uid}
      embedded={embedded}
      route={route}
      onRouteChange={embedded ? routeChange : onRouteChange}
      onNavigate={navigate}
      onWorkoutComplete={onWorkoutComplete}
      loadRemoteProgram={loadRemoteProgram}
      saveRemoteProgram={saveRemoteProgram}
      enablePush={push}
      localReminders={localReminders}
      setupContent={setupContent}
      onSubNav={onSubNav}
      coachingNotes={coachingNotes}
    />
  );
}

export default SixPackEmbed;
