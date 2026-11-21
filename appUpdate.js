// Update-Erkennung nach Journal (src/components/UpdateManager.jsx):
// registration.update() beim Start, bei visibilitychange, bei focus/pageshow
// und alle 10 Minuten. Übernahme aus Fuel (registerSW.js / VersionCard.jsx):
// „Jetzt aktualisieren“ schickt SKIP_WAITING und lädt neu.
// Zusätzlich version.json: der 6Pack-Worker ruft skipWaiting schon im Install
// auf, der waiting-Zustand ist dann weg und das einmalige sw-update-available
// kann vor dem UI verloren gehen. Der Build-Hash bleibt der Nachweis.

export const UPDATE_CHECK_MS = 10 * 60 * 1000;
const SW_VERSION_TIMEOUT_MS = 400;

export function readAppBuild() {
  const value = globalThis.__SIXPACK_BUILD__;
  return typeof value === 'string' && value.trim() ? value.trim() : 'dev';
}

export function currentBuildLabel() {
  return readAppBuild();
}

export function versionUrlFor(doc = globalThis.document) {
  const base = doc?.baseURI;
  if (!base) return null;
  try {
    const url = new URL('version.json', base);
    url.searchParams.set('t', String(Date.now()));
    return url.href;
  } catch {
    return null;
  }
}

export function remoteBuildFromPayload(payload) {
  const build = payload && typeof payload === 'object' ? payload.build : null;
  return typeof build === 'string' && build.trim() ? build.trim() : null;
}

export async function fetchRemoteBuild(fetchImpl, versionUrl) {
  const response = await fetchImpl(versionUrl, {
    cache: 'no-store',
    headers: { Accept: 'application/json' },
  });
  if (!response?.ok) return null;
  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType.includes('text/html')) return null;
  return remoteBuildFromPayload(await response.json());
}

export function readSwVersion(serviceWorker, timeoutMs = SW_VERSION_TIMEOUT_MS) {
  const controller = serviceWorker?.controller;
  if (!controller || typeof controller.postMessage !== 'function' || typeof serviceWorker.addEventListener !== 'function') {
    return Promise.resolve(null);
  }
  return new Promise(resolve => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      serviceWorker.removeEventListener('message', onMessage);
      resolve(value);
    };
    const onMessage = (event) => {
      if (event?.data?.type !== 'VERSION') return;
      const version = event.data.version;
      finish(typeof version === 'string' && version ? version : null);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);
    serviceWorker.addEventListener('message', onMessage);
    try {
      controller.postMessage({ type: 'GET_VERSION' });
    } catch {
      finish(null);
    }
  });
}

export async function checkForAppUpdate({
  build = readAppBuild(),
  fetchImpl,
  versionUrl,
  registration,
  serviceWorker,
  seenSwVersion = null,
  readVersion = readSwVersion,
} = {}) {
  const reasons = [];
  if (registration?.waiting && serviceWorker?.controller) reasons.push('waiting');
  if (typeof registration?.update === 'function') {
    try {
      Promise.resolve(registration.update()).catch(() => {});
    } catch { /* Sync-Fehler beim Update-Check bleiben still. */ }
  }

  let remote = null;
  let version = null;
  try {
    [version, remote] = await Promise.all([
      Promise.resolve()
        .then(() => readVersion(serviceWorker))
        .catch(() => null),
      build && build !== 'dev' && versionUrl && typeof fetchImpl === 'function'
        ? fetchRemoteBuild(fetchImpl, versionUrl).catch(() => null)
        : Promise.resolve(null),
    ]);
  } catch {
    version = null;
    remote = null;
  }

  let nextSeen = seenSwVersion ?? null;
  if (version) {
    if (nextSeen && version !== nextSeen) reasons.push('sw-version');
    if (!nextSeen) nextSeen = version;
  }
  if (remote && build && build !== 'dev' && remote !== build) reasons.push('version.json');
  return { update: reasons.length > 0, seenSwVersion: nextSeen, reasons };
}

export function waitForControllerChange(serviceWorker, timeoutMs = 1500) {
  if (typeof serviceWorker?.addEventListener !== 'function') return Promise.resolve(false);
  return new Promise(resolve => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      serviceWorker.removeEventListener('controllerchange', onChange);
      resolve(value);
    };
    const onChange = () => finish(true);
    const timer = setTimeout(() => finish(false), timeoutMs);
    serviceWorker.addEventListener('controllerchange', onChange);
  });
}

export async function applyAppUpdate({
  serviceWorker = globalThis.navigator?.serviceWorker,
  location = globalThis.location,
  timeoutMs = 1500,
} = {}) {
  const reload = () => location?.reload?.();
  let registration = null;
  try {
    registration = typeof serviceWorker?.getRegistration === 'function' ? await serviceWorker.getRegistration() : null;
  } catch {
    registration = null;
  }
  const incoming = registration?.waiting || registration?.installing;
  if (incoming && typeof incoming.postMessage === 'function') {
    const pending = waitForControllerChange(serviceWorker, timeoutMs);
    try { incoming.postMessage({ type: 'SKIP_WAITING' }); } catch { /* Reload folgt trotzdem. */ }
    await pending;
    reload();
    return;
  }
  let found = false;
  const onFound = () => { found = true; };
  registration?.addEventListener?.('updatefound', onFound);
  if (typeof registration?.update === 'function') {
    try { await registration.update(); } catch { /* Offline: Reload nutzt den bereits aktiven Worker. */ }
  }
  registration?.removeEventListener?.('updatefound', onFound);
  const next = registration?.waiting || registration?.installing;
  if (next && typeof next.postMessage === 'function') {
    const pending = waitForControllerChange(serviceWorker, timeoutMs);
    try { next.postMessage({ type: 'SKIP_WAITING' }); } catch { /* Reload folgt trotzdem. */ }
    await pending;
  } else if (found) {
    await waitForControllerChange(serviceWorker, timeoutMs);
  }
  reload();
}

export function startAppUpdateWatch({
  onUpdate,
  build = readAppBuild(),
  intervalMs = UPDATE_CHECK_MS,
  document: doc = globalThis.document,
  window: win = globalThis.window,
  fetchImpl = globalThis.fetch?.bind?.(globalThis),
  serviceWorker = globalThis.navigator?.serviceWorker,
} = {}) {
  if (typeof onUpdate !== 'function') return () => {};
  let stopped = false;
  let running = false;
  let seenSwVersion = null;
  const notify = () => { if (!stopped) onUpdate(); };

  const check = async () => {
    if (stopped || running) return;
    running = true;
    try {
      let registration = null;
      try {
        registration = typeof serviceWorker?.getRegistration === 'function' ? await serviceWorker.getRegistration() : null;
      } catch {
        registration = null;
      }
      const result = await checkForAppUpdate({
        build,
        fetchImpl,
        versionUrl: versionUrlFor(doc),
        registration,
        serviceWorker,
        seenSwVersion,
      });
      seenSwVersion = result.seenSwVersion;
      if (result.update) notify();
    } finally {
      running = false;
    }
  };

  const onVisible = () => {
    if (doc?.visibilityState && doc.visibilityState !== 'visible') return;
    check();
  };
  const onPageShow = () => check();
  const onSwEvent = () => notify();
  const onController = () => notify();
  let controllerListener = null;
  if (typeof serviceWorker?.addEventListener === 'function') {
    if (serviceWorker.controller) {
      controllerListener = onController;
    } else {
      controllerListener = () => {
        serviceWorker.removeEventListener('controllerchange', controllerListener);
        controllerListener = onController;
        serviceWorker.addEventListener('controllerchange', controllerListener);
      };
    }
    serviceWorker.addEventListener('controllerchange', controllerListener);
  }

  win?.addEventListener?.('sw-update-available', onSwEvent);
  win?.addEventListener?.('focus', onVisible);
  win?.addEventListener?.('pageshow', onPageShow);
  doc?.addEventListener?.('visibilitychange', onVisible);
  const timer = win?.setInterval?.(() => { check(); }, intervalMs);
  check();

  return () => {
    stopped = true;
    win?.removeEventListener?.('sw-update-available', onSwEvent);
    win?.removeEventListener?.('focus', onVisible);
    win?.removeEventListener?.('pageshow', onPageShow);
    doc?.removeEventListener?.('visibilitychange', onVisible);
    if (controllerListener) serviceWorker?.removeEventListener?.('controllerchange', controllerListener);
    if (timer != null) win?.clearInterval?.(timer);
  };
}
