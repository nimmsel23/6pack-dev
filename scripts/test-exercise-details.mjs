import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { transformWithEsbuild } from 'vite';
import * as data from '../sixpackData.generated.js';
import { MUSCLE_GEOMETRY } from '../muscleGeometry.js';
import { videoDescriptor, loadVideoUrls } from '../exerciseMedia.js';

const states = [];
let cursor = 0;
const React = {
  useState(initial) {
    const index = cursor++;
    if (!(index in states)) states[index] = typeof initial === 'function' ? initial() : initial;
    return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
  },
  useEffect() {}, useCallback: callback => callback, useMemo: callback => callback(), useRef: current => ({ current }),
};
const stored = new Map();
const window = { localStorage: { getItem: key => stored.get(key) || null, setItem: (key, value) => stored.set(key, value) } };
const Detail = function ExerciseDetailScreen() {};
const h = (type, props, ...children) => ({ type, props: props || {}, children });
const reminder = await import('../reminder.js');
const programSync = await import('../programSync.js');
async function compile(file, extra = '', requireExtra = {}) {
  const path = new URL(file, import.meta.url);
  const { code } = await transformWithEsbuild((await readFile(path, 'utf8')) + extra, path.pathname, { loader: 'jsx', format: 'cjs', jsxFactory: 'h', jsxFragment: 'Fragment' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, h, Fragment: 'fragment', window, Notification: { permission: 'granted' },
    require: name => requireExtra[name] || (name === 'react' ? React : name === './sixpackData.js' ? data : name === './ExerciseDetailScreen.jsx' ? { __esModule: true, default: Detail } : name === './exerciseMedia.js' ? { loadVideoUrls, videoDescriptor } : name === './muscleGeometry.js' ? { MUSCLE_GEOMETRY } : name === './reminder.js' ? reminder : name === './programSync.js' ? programSync : { __esModule: true, default: () => null }),
  });
  return module.exports;
}
function nodes(tree, match) {
  if (!tree || typeof tree !== 'object') return [];
  return [...(match(tree) ? [tree] : []), ...(tree.children || []).flat(Infinity).flatMap(child => nodes(child, match))];
}
const app = await compile('../SixPackApp.jsx', '\nexport { DayScreen, ShuffleScreen, FavoritesScreen, WorkoutExerciseRow, SettingsScreen };');
const render = () => { cursor = 0; return app.default({ uid: 'test' }); };
let tree = render();
const home = nodes(tree, node => node.type?.name === 'HomeScreen')[0];
home.props.onOpenToday();
tree = render();
const day = nodes(tree, node => node.type === app.DayScreen)[0];
assert(day);
let dayTree = app.DayScreen(day.props);
const rows = nodes(dayTree, node => node.type === app.WorkoutExerciseRow);
const exerciseRow = rows.find(node => node.props.item.type === 'exercise');
const before = JSON.stringify(day.props.workout);
const row = app.WorkoutExerciseRow(exerciseRow.props);
assert.equal(row.type, 'button');
assert.match(row.props['aria-label'], /Details zu/);
row.props.onClick();
tree = render();
const detail = nodes(tree, node => node.type === Detail)[0];
assert(detail.props.exercise?.id);
assert.equal(detail.props.backLabel, 'Workout');
assert.equal(detail.props.item.seconds, exerciseRow.props.item.seconds);
assert.equal(nodes(tree, node => node.type?.name === 'RunnerScreen').length, 0, 'opening details never starts the workout');
assert(nodes(tree, node => node.type === app.DayScreen).length, 'preview stays mounted');
detail.props.onBack();
tree = render();
assert.equal(JSON.stringify(nodes(tree, node => node.type === app.DayScreen)[0].props.workout), before);
const rest = app.WorkoutExerciseRow({ item: { type: 'rest', name: 'Rest', seconds: 30 }, onOpen: () => { throw Error('rest opened'); } });
assert.equal(rest.type, 'div');
let starts = 0;
dayTree = app.DayScreen({ ...day.props, onStart: () => { starts++; } });
nodes(dayTree, node => node.type === 'button' && node.children.includes('Start Workout'))[0].props.onClick();
assert.equal(starts, 1);
// Shuffle remains mounted while its detail screen is open (no re-randomization).
render(); home.props.onNav('shuffle'); tree = render();
const shuffle = nodes(tree, node => node.type === app.ShuffleScreen)[0];
shuffle.props.onOpenExercise({ type: 'exercise', name: 'Jackknifes', seconds: 30 });
tree = render();
assert.equal(nodes(tree, node => node.type === app.ShuffleScreen).length, 1);
const shuffleDetail = nodes(tree, node => node.type === Detail)[0];
shuffleDetail.props.onBack();
assert.equal(nodes(render(), node => node.type === app.ShuffleScreen).length, 1);
// Existing Learn entry returns to Learn, rather than to a workout.
home.props.onNav('learn'); tree = render();
nodes(tree, node => node.type?.name === 'LearnScreen')[0].props.onOpenExercise('jackknifes');
const learnDetail = nodes(render(), node => node.type === Detail)[0];
assert.equal(learnDetail.props.backLabel, 'Learn');
learnDetail.props.onBack();
assert.equal(nodes(render(), node => node.type?.name === 'LearnScreen').length, 1);
// All anatomy geometry comes from KB region IDs, not a handwritten ID mapping.
const regionIds = new Set(MUSCLE_GEOMETRY.map(part => part.id));
for (const exercise of Object.values(data.SIXPACK_EXERCISE_DETAILS)) {
  assert(exercise.primaryMuscles.length, `${exercise.id}: primary muscles`);
  for (const muscle of [...exercise.primaryMuscles, ...exercise.secondaryMuscles]) {
    assert(muscle.regions.length, `${muscle.id}: missing KB visualization`);
    for (const id of muscle.regions) assert(regionIds.has(id), id);
  }
  assert(data.SIXPACK_EXERCISE_COACHING[exercise.id].coachingNotes.length);
  if (exercise.videoUrl) assert(videoDescriptor(exercise.videoUrl));
}
assert.equal(videoDescriptor('javascript:alert(1)'), null);
assert.equal(videoDescriptor('//untrusted.invalid/x.mp4'), null);
assert.equal(videoDescriptor('https://www.youtube.com/watch?v=Z5Ry2pvbGag').kind, 'embed');
assert.match(videoDescriptor('https://vimeo.com/469637746').src, /player.vimeo.com/);
assert.equal(videoDescriptor('https://media.invalid/demo.mp4').kind, 'file');
const muscles = await compile('../ExerciseMuscles.jsx');
const highlights = muscles.muscleHighlights(data.SIXPACK_EXERCISE_DETAILS.jackknifes);
assert.equal(highlights['abs-upper-left'], 2, 'primary wins over secondary/deep shared region');
console.log('Exercise details: preview click/back, no accidental start, stable Shuffle, Learn return, KB anatomy and video sources passed.');

// Render the actual detail component, including each media and missing-data branch.
const detailModule = await compile('../ExerciseDetailScreen.jsx');
const drawDetail = props => { states.length = 0; cursor = 0; return detailModule.default(props); };
const jackknife = data.SIXPACK_EXERCISE_DETAILS.jackknifes;
let rendered = drawDetail({ exercise: jackknife, coaching: data.SIXPACK_EXERCISE_COACHING.jackknifes, onBack() {} });
assert.equal(nodes(rendered, node => node.type === 'iframe').length, 1);
assert(nodes(rendered, node => node.type === 'ol')[0].children.flat(Infinity).length > 0);
rendered = drawDetail({ exercise: { ...jackknife, videoUrl: 'https://media.invalid/clip.mp4' }, onBack() {} });
const filePlayer = nodes(rendered, node => node.type === 'video')[0];
assert(filePlayer.props.controls && filePlayer.props.muted && filePlayer.props.playsInline);
filePlayer.props.onError(); cursor = 0;
rendered = detailModule.default({ exercise: { ...jackknife, videoUrl: 'https://media.invalid/clip.mp4' }, onBack() {} });
assert.equal(nodes(rendered, node => node.type === 'video').length, 0);
assert(nodes(rendered, node => node.type === 'a').some(node => node.props.href.includes('search_query=')));
rendered = drawDetail({ exercise: { name: 'Old saved exercise' }, onBack() {} });
assert.equal(nodes(rendered, node => node.type === 'iframe' || node.type === 'video').length, 0);
assert.equal(videoDescriptor('https://'), null);
assert.equal(videoDescriptor('https://youtu.be/invalid'), null);
console.log('Actual detail rendering: instructions, embedded/file media, failed media and missing catalog data passed.');

// Enabling the switch must not silently fall back to an app-open timer.
globalThis.Notification = { permission: 'granted' };
states.length = 0;
cursor = 0;
const reminderChanges = [];
const settingsProps = {
  reminder: { enabled: false, time: '18:00' },
  onChange: value => reminderChanges.push(value),
  enablePush: async () => { throw new Error('Kein Push-Token'); },
  pushState: { status: 'idle', error: '' },
};
let settings = app.SettingsScreen(settingsProps);
await nodes(settings, node => node.props.role === 'switch')[0].props.onClick();
assert.equal(reminderChanges.length, 0);
cursor = 0;
settings = app.SettingsScreen(settingsProps);
assert(nodes(settings, node => node.children?.includes('Kein Push-Token')).length);
cursor = 0;
settings = app.SettingsScreen({ ...settingsProps, enablePush: async () => {} });
await nodes(settings, node => node.props.role === 'switch')[0].props.onClick();
assert.equal(reminderChanges[0].enabled, true);
console.log('Reminder settings: failed registration stays disabled; confirmed registration enables reminders.');

delete globalThis.Notification;
