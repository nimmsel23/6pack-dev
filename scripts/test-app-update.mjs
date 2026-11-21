import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import * as esbuild from 'esbuild';
import {
  applyAppUpdate,
  checkForAppUpdate,
  currentBuildLabel,
  fetchRemoteBuild,
  startAppUpdateWatch,
  versionUrlFor,
} from '../appUpdate.js';

const flush = () => new Promise(resolve => setTimeout(resolve, 0));

function jsonResponse(body, { ok = true, type = 'application/json' } = {}) {
  return {
    ok,
    headers: { get: () => type },
    json: async () => body,
  };
}

test('viewport-fit=cover stays in the document and the build id stays internal', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /name="viewport"[^>]*viewport-fit=cover/);
  assert.equal(currentBuildLabel(), 'dev');
  const app = await readFile(new URL('../SixPackApp.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /Version \{currentBuildLabel/);
});

test('dev build and matching builds do not count as an update', async () => {
  const fetchImpl = async () => jsonResponse({ build: '0.1.0+bbbbbbb' });
  const dev = await checkForAppUpdate({
    build: 'dev',
    fetchImpl,
    versionUrl: 'https://vos-6pack.web.app/version.json',
    registration: { update() { return Promise.resolve(); } },
    serviceWorker: {},
    readVersion: async () => null,
  });
  assert.equal(dev.update, false);

  const same = await checkForAppUpdate({
    build: '0.1.0+aaaaaaa',
    fetchImpl: async () => jsonResponse({ build: '0.1.0+aaaaaaa' }),
    versionUrl: 'https://vos-6pack.web.app/version.json',
    registration: { update() { return Promise.resolve(); } },
    serviceWorker: {},
    readVersion: async () => 'vos-6pack-v1',
    seenSwVersion: 'vos-6pack-v1',
  });
  assert.equal(same.update, false);
  assert.equal(currentBuildLabel(), 'dev');
});

test('version.json, a waiting worker and a changed service-worker version request an update', async () => {
  const updates = [];
  const remote = await checkForAppUpdate({
    build: '0.1.0+aaaaaaa',
    fetchImpl: async () => jsonResponse({ build: '0.1.0+bbbbbbb' }),
    versionUrl: 'https://vos-6pack.web.app/version.json',
    registration: { update() { updates.push('sw'); return Promise.resolve(); } },
    serviceWorker: { controller: {} },
    readVersion: async () => 'vos-6pack-v1',
  });
  assert.equal(remote.update, true);
  assert.deepEqual(remote.reasons, ['version.json']);
  assert.equal(updates[0], 'sw');
  assert.equal(remote.seenSwVersion, 'vos-6pack-v1');

  const waiting = await checkForAppUpdate({
    build: '0.1.0+aaaaaaa',
    fetchImpl: async () => jsonResponse({ build: '0.1.0+aaaaaaa' }),
    versionUrl: 'https://vos-6pack.web.app/version.json',
    registration: { waiting: {}, update() { return Promise.resolve(); } },
    serviceWorker: { controller: {} },
    readVersion: async () => 'vos-6pack-v1',
    seenSwVersion: 'vos-6pack-v1',
  });
  assert.deepEqual(waiting.reasons, ['waiting']);

  const changed = await checkForAppUpdate({
    build: 'dev',
    registration: { update() { return Promise.resolve(); } },
    serviceWorker: { controller: {} },
    readVersion: async () => 'vos-6pack-v2',
    seenSwVersion: 'vos-6pack-v1',
  });
  assert.deepEqual(changed.reasons, ['sw-version']);
});

test('a failed or HTML version.json does not throw or count as an update', async () => {
  assert.equal(await fetchRemoteBuild(async () => { throw new Error('offline'); }, 'https://vos-6pack.web.app/version.json').catch(error => error.message), 'offline');
  assert.equal(await fetchRemoteBuild(async () => jsonResponse('<html>', { type: 'text/html' }), 'https://vos-6pack.web.app/version.json'), null);
  const result = await checkForAppUpdate({
    build: '0.1.0+aaaaaaa',
    fetchImpl: async () => { throw new Error('offline'); },
    versionUrl: 'https://vos-6pack.web.app/version.json',
    registration: { update() { return Promise.reject(new Error('offline')); } },
    serviceWorker: {},
    readVersion: async () => { throw new Error('no worker'); },
  });
  assert.equal(result.update, false);
});

test('version.json is resolved against the document base', () => {
  const href = versionUrlFor({ baseURI: 'https://vos-6pack.web.app/index.html' });
  const url = new URL(href);
  assert.equal(url.origin + url.pathname, 'https://vos-6pack.web.app/version.json');
  assert.ok(url.searchParams.get('t'));
});

test('watch checks on start, foreground return, interval and the service-worker event', async () => {
  const docEvents = new Map();
  const winEvents = new Map();
  const doc = {
    visibilityState: 'visible',
    baseURI: 'https://vos-6pack.web.app/',
    addEventListener(type, fn) { docEvents.set(type, fn); },
    removeEventListener(type) { docEvents.delete(type); },
  };
  let intervalFn;
  const win = {
    addEventListener(type, fn) { winEvents.set(type, fn); },
    removeEventListener(type) { winEvents.delete(type); },
    setInterval(fn) { intervalFn = fn; return 7; },
    clearInterval() { intervalFn = null; },
  };
  const listeners = new Set();
  const registration = {
    waiting: null,
    update() { return Promise.resolve(); },
  };
  const sw = {
    controller: {
      postMessage() {
        for (const fn of listeners) fn({ data: { type: 'VERSION', version: 'vos-6pack-v1' } });
      },
    },
    getRegistration: async () => registration,
    addEventListener(type, fn) { if (type === 'message') listeners.add(fn); },
    removeEventListener(type, fn) { if (type === 'message') listeners.delete(fn); },
  };
  const fetches = [];
  const seen = [];
  const stop = startAppUpdateWatch({
    build: '0.1.0+aaaaaaa',
    onUpdate: () => seen.push('update'),
    document: doc,
    window: win,
    fetchImpl: async (url) => {
      fetches.push(url);
      return jsonResponse({ build: '0.1.0+bbbbbbb' });
    },
    serviceWorker: sw,
  });
  await flush();
  assert.equal(seen.length, 1);
  assert.equal(new URL(fetches[0]).pathname, '/version.json');

  doc.visibilityState = 'hidden';
  docEvents.get('visibilitychange')();
  await flush();
  assert.equal(seen.length, 1);

  doc.visibilityState = 'visible';
  docEvents.get('visibilitychange')();
  await flush();
  assert.equal(seen.length, 2);

  intervalFn();
  await flush();
  assert.equal(seen.length, 3);

  winEvents.get('focus')();
  await flush();
  assert.equal(seen.length, 4);

  winEvents.get('sw-update-available')();
  assert.equal(seen.length, 5);
  stop();
  assert.equal(intervalFn, null);
  assert.equal(docEvents.has('visibilitychange'), false);
});

test('apply sends SKIP_WAITING and reloads after the new worker takes control', async () => {
  const messages = [];
  let onChange;
  const sw = {
    controller: {},
    addEventListener(type, fn) { if (type === 'controllerchange') onChange = fn; },
    removeEventListener() {},
    getRegistration: async () => ({
      waiting: {
        postMessage(message) {
          messages.push(message);
          onChange();
        },
      },
    }),
  };
  let reloaded = 0;
  await applyAppUpdate({
    serviceWorker: sw,
    location: { reload() { reloaded += 1; } },
    timeoutMs: 50,
  });
  assert.deepEqual(messages, [{ type: 'SKIP_WAITING' }]);
  assert.equal(reloaded, 1);
});

test('apply reloads when the new worker is already active', async () => {
  let updated = 0;
  const sw = {
    controller: {},
    addEventListener() {},
    removeEventListener() {},
    getRegistration: async () => ({
      update() { updated += 1; return Promise.resolve(); },
    }),
  };
  let reloaded = 0;
  await applyAppUpdate({
    serviceWorker: sw,
    location: { reload() { reloaded += 1; } },
    timeoutMs: 20,
  });
  assert.equal(updated, 1);
  assert.equal(reloaded, 1);
});

test('the prompt shows Jetzt aktualisieren and calls apply', async () => {
  const states = [];
  const refs = [];
  const effects = [];
  let cursor = 0;
  let refCursor = 0;
  let effectCursor = 0;
  const React = {
    useState(initial) {
      const index = cursor++;
      if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial;
      return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
    },
    useRef(initial) {
      const index = refCursor++;
      if (!refs[index]) refs[index] = { current: initial };
      return refs[index];
    },
    useEffect(fn) { effects.push(fn); },
  };
  let started = false;
  let applied = 0;
  const body = { nodeType: 1 };
  const document = { body };
  const { code } = await esbuild.transform(await readFile(new URL('../UpdatePrompt.jsx', import.meta.url), 'utf8'), {
    loader: 'jsx',
    format: 'cjs',
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  });
  const module = { exports: {} };
  const h = (type, props, ...children) => ({ type, props: props || {}, children });
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    h,
    Fragment: 'fragment',
    document,
    window: {},
    require: (name) => {
      if (name === 'react') return React;
      if (name === 'react-dom') return { createPortal: (node) => ({ portal: node }) };
      if (name === './appUpdate.js') {
        return {
          startAppUpdateWatch(options) { started = true; options.onUpdate(); return () => {}; },
          applyAppUpdate() { applied += 1; return Promise.resolve(); },
        };
      }
      throw new Error(name);
    },
  });
  const render = () => {
    cursor = refCursor = effectCursor = 0;
    return module.exports.default();
  };
  assert.equal(render(), null);
  for (const effect of effects) effect();
  assert.equal(started, true);
  const tree = render();
  assert.equal(tree.portal.props.role, 'dialog');
  const nodes = [];
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(walk); return; }
    nodes.push(node);
    walk(node.children);
    walk(node.portal);
  };
  walk(tree);
  const button = nodes.find(node => node.type === 'button' && node.children?.includes('Jetzt aktualisieren'));
  assert.ok(button);
  const overlay = nodes.find(node => node.props?.role === 'dialog');
  assert.equal(overlay.props.style.width, '100%');
  assert.equal(overlay.props.style.maxWidth, 'none');
  assert.match(overlay.props.style.paddingTop, /safe-area-inset-top/);
  assert.equal(nodes.some(node => node.props?.className?.includes('max-w-')), false);
  await button.props.onClick();
  assert.equal(applied, 1);
});
