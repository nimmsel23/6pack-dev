import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import * as esbuild from 'esbuild';
import * as data from '../sixpackData.generated.js';
import * as exerciseMedia from '../exerciseMedia.js';
import * as programSync from '../programSync.js';
import * as reminder from '../reminder.js';

const mutations = [];
const location = {
  hostname: 'shell.web.app',
  protocol: 'https:',
  href: 'https://shell.web.app/#sixpack',
  _hash: '#sixpack',
  get hash() { return this._hash; },
  set hash(value) {
    mutations.push(['hash', value]);
    this._hash = value;
  },
};
let replaceStateCount = 0;
const history = {
  replaceState(_state, _title, url) {
    replaceStateCount += 1;
    mutations.push(['replaceState', url]);
    if (typeof url === 'string') location.hash = url;
  },
  pushState() {
    mutations.push(['pushState']);
  },
};
const themeMeta = {
  name: 'theme-color',
  _content: '#112233',
  get content() { return this._content; },
  set content(value) {
    mutations.push(['theme-color', value]);
    this._content = value;
  },
  getAttribute(name) {
    if (name === 'content') return this._content;
    if (name === 'name') return 'theme-color';
    return null;
  },
  setAttribute(name, value) {
    if (name === 'content') this.content = value;
  },
};
const documentElement = {
  _attrs: {},
  _className: '',
  style: new Proxy({}, {
    set(target, key, value) {
      mutations.push(['html.style', String(key), value]);
      target[key] = value;
      return true;
    },
  }),
  get className() { return this._className; },
  set className(value) {
    mutations.push(['documentElement.class', value]);
    this._className = String(value);
  },
  classList: {
    add: (...tokens) => mutations.push(['classList.add', ...tokens]),
    remove: (...tokens) => mutations.push(['classList.remove', ...tokens]),
    toggle: (...tokens) => mutations.push(['classList.toggle', ...tokens]),
  },
  getAttribute(name) { return Object.prototype.hasOwnProperty.call(this._attrs, name) ? this._attrs[name] : null; },
  setAttribute(name, value) {
    mutations.push(['documentElement', name, value]);
    this._attrs[name] = String(value);
  },
  removeAttribute(name) {
    mutations.push(['documentElement.remove', name]);
    delete this._attrs[name];
  },
};
function listenTarget() {
  const listeners = new Map();
  return {
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type).add(fn);
    },
    removeEventListener(type, fn) { listeners.get(type)?.delete(fn); },
  };
}
const documentListeners = listenTarget();
const windowListeners = listenTarget();
const stored = new Map();
const document = {
  ...documentListeners,
  documentElement,
  visibilityState: 'visible',
  body: {},
  querySelector(selector) {
    return String(selector).includes('theme-color') ? themeMeta : null;
  },
};
const window = {
  ...windowListeners,
  location,
  history,
  document,
  localStorage: {
    getItem: key => stored.get(key) ?? null,
    setItem: (key, value) => stored.set(key, value),
  },
  setInterval,
  clearInterval,
  setTimeout,
  clearTimeout,
};

const states = [];
const refs = [];
const effectSlots = [];
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
  useEffect(fn, deps) {
    const index = effectCursor++;
    const previous = effectSlots[index];
    const changed = !previous || deps === undefined || previous.deps === undefined
      || deps.length !== previous.deps.length
      || deps.some((dep, i) => !Object.is(dep, previous.deps[i]));
    effectSlots[index] = { fn, deps, changed, cleanup: previous?.cleanup };
  },
  useCallback: callback => callback,
  useMemo: callback => callback(),
};
function resetHarness() {
  for (const slot of effectSlots) {
    if (typeof slot?.cleanup === 'function') slot.cleanup();
  }
  states.length = 0;
  refs.length = 0;
  effectSlots.length = 0;
  cursor = refCursor = effectCursor = 0;
  mutations.length = 0;
  replaceStateCount = 0;
  location._hash = '#sixpack';
  themeMeta._content = '#112233';
  documentElement._attrs = {};
  documentElement._className = '';
  stored.clear();
}
function flushEffects() {
  for (const slot of effectSlots) {
    if (!slot?.changed) continue;
    if (typeof slot.cleanup === 'function') slot.cleanup();
    const cleanup = slot.fn();
    slot.cleanup = typeof cleanup === 'function' ? cleanup : undefined;
    slot.changed = false;
  }
}
const h = (type, props, ...children) => ({ type, props: props || {}, children });
function nodes(tree, match) {
  if (!tree || typeof tree !== 'object') return [];
  const nested = Array.isArray(tree) ? tree : [tree];
  return nested.flat(Infinity).flatMap(node => {
    if (!node || typeof node !== 'object') return [];
    return [...(match(node) ? [node] : []), ...nodes(node.children, match)];
  });
}
function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (typeof node === 'object') return textOf(node.children);
  return '';
}
const pushes = [];
const pushModule = {
  enableSixpackPush(uid, options) {
    pushes.push({ uid, options });
    return Promise.resolve('token');
  },
};
function moduleStub(named = {}) {
  return new Proxy({ __esModule: true, default: () => null, ...named }, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return () => null;
    },
  });
}
async function compile(file, requireExtra = {}) {
  const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
  const { code } = await esbuild.transform(source, { loader: 'jsx', format: 'cjs', jsxFactory: 'h', jsxFragment: 'Fragment' });
  const module = { exports: {} };
  const sandbox = {
    module, exports: module.exports, h, Fragment: 'fragment', window, document, history, location, URL, URLSearchParams, console, Notification: { permission: 'default' },
    require: name => requireExtra[name] || (name === 'react' ? React : name === './sixpackData.js' ? data : name === './exerciseMedia.js' ? exerciseMedia : name === './programSync.js' ? programSync : name === './reminder.js' ? reminder : name === './push.js' ? pushModule : name === './videoCache.js' ? { cacheVideos: () => Promise.resolve(), getCachedVideoBlobUrl: async () => null, isCacheableVideo: () => false } : moduleStub()),
  };
  vm.runInNewContext(code, sandbox);
  return module.exports;
}

const app = await compile('SixPackApp.jsx');
const embedModule = await compile('embed.jsx', { './SixPackApp.jsx': app, './push.js': pushModule });
const Embed = embedModule.SixPackEmbed;

function renderEmbed(props) {
  cursor = 0;
  refCursor = 0;
  effectCursor = 0;
  const element = Embed(props);
  return element.type(element.props);
}
function renderCard(props) {
  cursor = 0;
  refCursor = 0;
  effectCursor = 0;
  return app.default(props);
}
function homeTree(tree) {
  const home = nodes(tree, node => node.type?.name === 'HomeScreen')[0];
  assert(home, 'home screen');
  return home.type(home.props);
}
function clickLabel(tree, label) {
  const button = nodes(tree, node => (node.type === 'button' || node.type === 'a') && textOf(node) === label)[0];
  assert(button, label);
  return button;
}

test('screenFromRoute reads shell paths', () => {
  const route = value => JSON.parse(JSON.stringify(app.screenFromRoute(value)));
  assert.deepEqual(route(''), { screen: 'home', day: null, skillId: null, routeKind: 'home' });
  assert.deepEqual(route('track'), { screen: 'track', day: null, skillId: null, routeKind: 'track' });
  assert.deepEqual(route('skills/planche'), { screen: 'learn', day: null, skillId: 'planche', routeKind: 'skills' });
  assert.equal(route('day/4').day, 4);
});

test('embed leaves document, theme-color and hash alone; Eat calls onNavigate(fuel)', () => {
  resetHarness();
  const routes = [];
  const targets = [];
  let tree = renderEmbed({
    uid: 'user-1',
    route: '',
    onRouteChange: route => routes.push(route),
    onNavigate: target => targets.push(target),
  });
  flushEffects();
  const home = homeTree(tree);
  const eat = clickLabel(home, 'Eat');
  assert.equal(eat.props.href, undefined);
  assert.equal(eat.type, 'button');
  eat.props.onClick();
  assert.deepEqual(targets, ['fuel']);
  clickLabel(home, 'Learn').props.onClick();
  tree = renderEmbed({
    uid: 'user-1',
    route: '',
    onRouteChange: route => routes.push(route),
    onNavigate: target => targets.push(target),
  });
  flushEffects();
  const learn = nodes(tree, node => node.type?.name === 'LearnScreen')[0];
  learn.props.onOpenSkill('planche');
  assert.deepEqual(routes, ['learn', 'skills/planche']);
  assert.equal(location.hash, '#sixpack');
  assert.equal(replaceStateCount, 0);
  assert.equal(themeMeta.content, '#112233');
  assert.equal(documentElement.getAttribute('data-theme'), null);
  assert.deepEqual(mutations, []);
});

test('embed opens the screen from route without writing the hash', () => {
  resetHarness();
  const tree = renderEmbed({ uid: 'user-1', route: 'skills/planche', onRouteChange() {}, onNavigate() {} });
  flushEffects();
  assert.equal(nodes(tree, node => node.type?.name === 'LearnScreen').length, 1);
  assert.equal(nodes(tree, node => node.type?.name === 'HomeScreen').length, 0);
  resetHarness();
  const tracked = renderEmbed({ uid: 'user-1', route: 'track', onRouteChange() {}, onNavigate() {} });
  flushEffects();
  assert.equal(nodes(tracked, node => node.type?.name === 'TrackScreen').length, 1);
  assert.equal(location.hash, '#sixpack');
  assert.deepEqual(mutations, []);
});

test('shell route changes update the view and do not echo onRouteChange', () => {
  resetHarness();
  const routes = [];
  const props = { uid: 'user-1', onRouteChange: route => routes.push(route), onNavigate() {} };
  renderEmbed({ ...props, route: '' });
  flushEffects();
  renderEmbed({ ...props, route: 'shuffle' });
  flushEffects();
  const tree = renderEmbed({ ...props, route: 'shuffle' });
  assert.equal(nodes(tree, node => node.type?.name === 'ShuffleScreen').length, 1);
  assert.deepEqual(routes, []);
  assert.deepEqual(mutations, []);
});

test('legacy onSubNav host still writes the skill hash and links Eat to Fuel', () => {
  resetHarness();
  const subs = [];
  let tree = renderCard({ uid: 'user-1', onSubNav: id => subs.push(id) });
  flushEffects();
  const home = homeTree(tree);
  const eat = clickLabel(home, 'Eat');
  assert.equal(eat.type, 'a');
  assert.equal(eat.props.href, 'https://fuel-vos.web.app/');
  clickLabel(home, 'Learn').props.onClick();
  tree = renderCard({ uid: 'user-1', onSubNav: id => subs.push(id) });
  const learn = nodes(tree, node => node.type?.name === 'LearnScreen')[0];
  learn.props.onOpenSkill('planche');
  assert.deepEqual(subs, ['skills']);
  assert.equal(replaceStateCount, 1);
  assert.equal(location.hash, '#sixpack?skill=planche');
  assert.equal(documentElement.getAttribute('data-theme'), null);
});

test('standalone keeps the document theme and in-app Eat', () => {
  resetHarness();
  let tree = renderCard({ uid: 'local' });
  flushEffects();
  assert.equal(documentElement.getAttribute('data-theme'), 'sixpack');
  const home = homeTree(tree);
  const eat = clickLabel(home, 'Eat');
  assert.equal(eat.type, 'button');
  assert.equal(eat.props.href, undefined);
  eat.props.onClick();
  tree = renderCard({ uid: 'local' });
  flushEffects();
  assert.equal(nodes(tree, node => node.type?.name === 'EatScreen').length, 1);
  assert.equal(location.hash, '#sixpack');
});

test('firebaseApp registers push through the shared module', async () => {
  resetHarness();
  pushes.length = 0;
  globalThis.Notification = { permission: 'granted' };
  try {
    const appHandle = { name: 'shell-app' };
    const tree = renderEmbed({ uid: 'user-1', firebaseApp: appHandle, route: '' });
    const home = homeTree(tree);
    const settingsButton = nodes(home, node => node.props?.['aria-label'] === 'Einstellungen')[0];
    assert(settingsButton, 'settings button');
    settingsButton.props.onClick();
    const settingsTree = renderEmbed({ uid: 'user-1', firebaseApp: appHandle, route: '' });
    const settings = nodes(settingsTree, node => node.type?.name === 'SettingsScreen')[0];
    const screen = settings.type(settings.props);
    await nodes(screen, node => node.props?.role === 'switch')[0].props.onClick();
    assert.equal(pushes.length, 1);
    assert.equal(pushes[0].uid, 'user-1');
    assert.equal(pushes[0].options.firebaseApp, appHandle);
  } finally {
    delete globalThis.Notification;
  }
});

test('push.js uses the caller Firebase app and does not initialize one', async () => {
  const source = await readFile(new URL('../push.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /initializeApp\s*\(/);
  assert.match(source, /firebaseApp/);
  assert.match(source, /getMessaging/);
  const standalone = await readFile(new URL('../standaloneSync.js', import.meta.url), 'utf8');
  assert.match(standalone, /registerSixpackPush\(uid, \{ firebaseApp: app/);
  assert.match(standalone, /initializeApp\(config\)/);
});

test.afterEach(() => {
  resetHarness();
});
