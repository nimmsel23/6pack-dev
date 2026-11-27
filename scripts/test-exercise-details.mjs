import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import * as esbuild from 'esbuild';
import * as data from '../sixpackData.generated.js';
import { MUSCLE_GEOMETRY } from '../muscleGeometry.js';
import { videoDescriptor, loadVideoUrls } from '../exerciseMedia.js';
import * as exerciseVideo from '../exerciseVideo.js';

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
const workoutEquipment = await import('../workoutEquipment.js');
async function compile(file, extra = '', requireExtra = {}) {
  const path = new URL(file, import.meta.url);
  // Vite 8 dropped the bundled esbuild re-export; transform JSX via esbuild directly.
  const { code } = await esbuild.transform((await readFile(path, 'utf8')) + extra, { loader: 'jsx', format: 'cjs', jsxFactory: 'h', jsxFragment: 'Fragment' });
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, h, Fragment: 'fragment', window, Notification: { permission: 'granted' },
    require: name => requireExtra[name] || (name === './workoutEquipment.js' ? workoutEquipment : name === 'react' ? React : name === './sixpackData.js' ? data : name === './ExerciseDetailScreen.jsx' ? { __esModule: true, default: Detail } : name === './exerciseMedia.js' ? { loadVideoUrls, videoDescriptor } : name === './exerciseVideo.js' ? exerciseVideo : name === './muscleGeometry.js' ? { MUSCLE_GEOMETRY } : name === './storeBuild.js' ? { IS_STORE_BUILD: false, storeText: original => original } : name === './reminder.js' ? reminder : name === './programSync.js' ? programSync : { __esModule: true, default: () => null }),
  });
  return module.exports;
}
function nodes(tree, match) {
  if (!tree || typeof tree !== 'object') return [];
  return [...(match(tree) ? [tree] : []), ...(tree.children || []).flat(Infinity).flatMap(child => nodes(child, match))];
}
const app = await compile('../SixPackApp.jsx', '\nexport { DayScreen, ShuffleScreen, FavoritesScreen, WorkoutExerciseRow, SettingsScreen, needsTransition, advanceRunnerState, createRunnerState, workoutTotalSeconds, blockSpeech, TRANSITION_SECONDS };');
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
const detailButton = nodes(row, node => node.type === 'button' && node.props['aria-label']?.startsWith('Details zu'))[0];
assert(detailButton);
detailButton.props.onClick();
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
const ownUrl = 'https://firebasestorage.googleapis.com/v0/b/fitness-aos.firebasestorage.app/o/exerciseVideos%2Fjackknifes%2Fabc?alt=media&token=1';
rendered = drawDetail({
  exercise: jackknife,
  ownVideos: { jackknifes: { status: 'pending', url: ownUrl, clipStart: 1, clipEnd: 4 } },
  onBack() {},
});
const ownPlayer = nodes(rendered, node => node.type === 'video')[0];
assert.equal(ownPlayer.props.src, ownUrl);
assert.equal(ownPlayer.props.loop, false);
assert.equal(typeof ownPlayer.props.onTimeUpdate, 'function');
assert.equal(nodes(rendered, node => node.type === 'iframe').length, 0, 'own video replaces the catalog embed');
rendered = drawDetail({ exercise: { name: 'Old saved exercise' }, onBack() {} });
assert.equal(nodes(rendered, node => node.type === 'iframe' || node.type === 'video').length, 0);
assert.equal(videoDescriptor('https://'), null);
assert.equal(videoDescriptor('https://youtu.be/invalid'), null);
console.log('Actual detail rendering: instructions, embedded/file media, failed media and missing catalog data passed.');

const uploadModule = await compile('../ExerciseVideoUpload.jsx');
states.length = 0;
cursor = 0;
const uploadTree = uploadModule.default({ exerciseId: 'jackknifes', exerciseName: 'Jackknifes', signedIn: false, onUpload() { return { done: Promise.resolve() }; } });
const fileInputs = nodes(uploadTree, node => node.type === 'input' && node.props.type === 'file');
assert.equal(fileInputs.length, 3);
assert.equal(fileInputs.filter(node => node.props.capture === 'environment' && node.props.accept === 'video/*').length, 1);
assert.equal(fileInputs.filter(node => node.props.accept === 'video/*' && !node.props.capture).length, 1);
assert(nodes(uploadTree, node => node.type === 'button').some(node => String(node.children).includes('Mit Kamera aufnehmen')));
assert(nodes(uploadTree, node => node.type === 'button').some(node => String(node.children).includes('Aus Galerie')));
nodes(uploadTree, node => node.type === 'button').find(node => String(node.children).includes('Mit Kamera aufnehmen')).props.onClick();
cursor = 0;
const blocked = uploadModule.default({ exerciseId: 'jackknifes', exerciseName: 'Jackknifes', signedIn: false, onUpload() { return { done: Promise.resolve() }; } });
assert(nodes(blocked, node => node.props.role === 'alert').some(node => String(node.children).includes('anmelden')));

assert(fileInputs.some(node => node.props['aria-label'] === 'Video aus Dateien wählen'));
states.length = 0; cursor = 0;
let released = false;
const reuseTree = uploadModule.default({
  exerciseId: 'jackknifes', exerciseName: 'Jackknifes', signedIn: true,
  videoSource: { file: { name: 'training.mov' } },
  onVideoSourceChange(value) { released = value === null; },
});
assert(nodes(reuseTree, node => node.type === 'button').some(node => String(node.children).includes('Weiteren Clip schneiden')));
nodes(reuseTree, node => node.type === 'button').find(node => String(node.children).includes('Quelldatei freigeben')).props.onClick();
assert.equal(released, true);
console.log('Exercise video upload: camera, gallery, files and reusable source controls passed.');


const editorModule = await compile('../ExerciseClipEditor.jsx');
const trimChanges = [];
const editor = editorModule.default({
  url: 'blob:clip',
  duration: 12,
  start: 1,
  end: 4,
  busy: false,
  progress: null,
  status: '',
  error: '',
  onChange(next) { trimChanges.push(next); },
  onCancel() {},
  onUpload() {},
});
const timeFields = nodes(editor, node => node.type === 'input' && node.props.type === 'number');
assert.equal(timeFields.length, 2);
timeFields[0].props.onChange({ target: { value: '8' } });
assert.deepEqual(trimChanges.pop(), { start: 8, end: 8.5 });
const editorButtons = nodes(editor, node => node.type === 'button');
assert(editorButtons.some(node => String(node.children).includes('Hochladen')));
assert(editorButtons.some(node => String(node.children).includes('Abbrechen')));
assert(editorButtons.some(node => String(node.children).includes('Clip abspielen')));
const editorVideo = nodes(editor, node => node.type === 'video')[0];
assert.equal(editorVideo.props.muted, true);
assert.equal(editorVideo.props.playsInline, true);
assert.equal(editorVideo.props.controls, undefined);
const handles = nodes(editor, node => node.type?.name === 'TrimHandle');
assert.deepEqual(handles.map(node => node.props.label), ['Anfang des Clips', 'Ende des Clips']);
assert.equal(nodes(editor, node => node.props.role === 'dialog')[0].props['aria-label'], 'Clip ausschneiden');
const endHandle = handles.find(node => node.props.label === 'Ende des Clips').type(handles.find(node => node.props.label === 'Ende des Clips').props);
assert.equal(endHandle.props['aria-label'], 'Ende des Clips');
endHandle.props.onKeyDown({ key: 'ArrowRight', shiftKey: false, preventDefault() {} });
assert.deepEqual(trimChanges[0], { start: 1, end: 4.1 });
console.log('Clip editor: full-screen trim handles, muted preview, upload and cancel.');

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
function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (typeof node === 'object') return textOf(node.children);
  return '';
}
assert.doesNotMatch(textOf(settings), /Version\s+\d/);
console.log('Settings show no build version.');

delete globalThis.Notification;

// Eigene Clips: public/videos/<id>.mp4 ersetzt die Katalog-Demo, explizites video_url bleibt vorrangig,
// der Inhalts-Hash in der URL verhindert veraltete Cache-Treffer, und der Video-Cache nimmt sie an.
{
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { exerciseContent, ownClipUrl } = await import('../catalogContent.mjs');
  const { isCacheableVideo } = await import('../videoCache.js');
  const dir = mkdtempSync(join(tmpdir(), 'sixpack-clips-'));
  assert.equal(ownClipUrl('marching_planks', dir), null);
  assert.equal(exerciseContent({ id: 'marching_planks' }, {}, dir).videoUrl, data.SIXPACK_EXERCISE_DETAILS.marching_planks.videoUrl, 'ohne Clip bleibt die Katalog-Demo');
  writeFileSync(join(dir, 'marching_planks.mp4'), 'clip-a');
  const first = exerciseContent({ id: 'marching_planks' }, {}, dir);
  assert.match(first.videoUrl, /^\.\/videos\/marching_planks\.mp4\?v=[0-9a-f]{8}$/);
  assert.equal(first.videoSource, undefined, 'eigener Clip hat keine Fremdquelle');
  writeFileSync(join(dir, 'marching_planks.mp4'), 'clip-b');
  assert.notEqual(exerciseContent({ id: 'marching_planks' }, {}, dir).videoUrl, first.videoUrl, 'neuer Inhalt = neue URL');
  assert.equal(exerciseContent({ id: 'marching_planks', video_url: 'https://example.com/x.mp4' }, {}, dir).videoUrl, undefined, 'explizites video_url bleibt vorrangig');
  assert.equal(videoDescriptor(first.videoUrl).kind, 'file');
  assert(isCacheableVideo(first.videoUrl) && isCacheableVideo('/videos/x.mp4') && isCacheableVideo('https://a.example/x.mp4'));
  assert(!isCacheableVideo('//evil.example/x.mp4') && !isCacheableVideo('http://a.example/x.mp4') && !isCacheableVideo('data:video/mp4;base64,AA'));
  console.log('Own clips: public/videos overrides catalog demo, hash busts cache, video cache accepts same-origin clips.');
}

// Original Week 3 screenshots, supplied 2026-11-27. Missing demos never replace exercises.
const week3 = {
  15: [330, ['heels_to_the_heavens',30], ['the_kobe_crunch',30], ['drunken_mountain_climbers',30], ['rest',30], ['accordian_crunches',60], ['accordian_crunches',60], ['frog_crunches',30], ['russian_v_tuck_twists',60]],
  16: [300, ['physioball_knee_tucks',30], ['physioball_ball_passes',30], ['side_plank_lifts',30], ['side_plank_lifts',30], ['rest',30], ['scissors',60], ['physioball_levitation_crunches',60], ['twisted_t_planks',30]],
  18: [330, ['physioball_reverse_crunches',60], ['scissor_v_ups',30], ['legs_straight_windshield_wipers',30], ['rest',30], ['physioball_corkscrews',30], ['prayer_crunch',30], ['any_ball_btb_pass',60], ['any_ball_btb_pass',60]],
  19: [330, ['physioball_knee_tucks',30], ['physioball_roll_outs',30], ['cross_knee_planks',60], ['rest',30], ['side_crunches',30], ['side_crunches',30], ['jackknifes',60], ['canoe_crunch',60]],
  20: [270, ['iso_reverse_crunches',60], ['x_man_crunch',30], ['bent_knee_windshield_wipers',30], ['rest',30], ['physioball_corkscrews',30], ['physioball_levitation_crunches',30], ['standing_ab_twists',60]],
};
for (const [day, [total, ...items]] of Object.entries(week3)) {
  const workout = data.SIXPACK_VERIFIED_WORKOUTS[day];
  assert.equal(workout.totalSeconds, total);
  assert.deepEqual(workout.items.map(item => [item.exerciseId || 'rest', item.seconds]), items, `Day ${day}: screenshot sequence`);
  assert.equal(workout.items.reduce((sum, item) => sum + item.seconds, 0), total);
}
for (const day of [17, 21]) assert(!data.SIXPACK_VERIFIED_WORKOUTS[day], `Week 3 day ${day} is a rest day`);

// 5s zwischen jedem Block, 30/45-s-Pause bleibt ein eigener Block, davor und danach wieder 5s mit Ansage.
{
  const exercise = (name, seconds) => ({ type: 'exercise', name, seconds });
  const rest = (seconds) => ({ type: 'rest', name: 'Rest', seconds });
  const items = [exercise('Crunches', 2), rest(3), exercise('Plank', 2), exercise('Plank', 2)];
  assert.equal(app.TRANSITION_SECONDS, 5);
  for (let index = 0; index < items.length - 1; index += 1) {
    assert.equal(app.needsTransition(items, index), true, `5s nach Block ${index}`);
  }
  assert.equal(app.needsTransition(items, items.length - 1), false, 'nach dem letzten Block keine Pause');
  assert.equal(app.workoutTotalSeconds(items), 2 + 5 + 3 + 5 + 2 + 5 + 2);

  const workout = { items };
  let state = { ...app.createRunnerState(workout), running: true };
  const phases = [];
  const note = (next) => {
    const key = next.done ? 'done' : next.transition ? `gap-${next.itemIndex}` : `block-${next.itemIndex}`;
    const last = phases.at(-1);
    if (!last || last.key !== key) {
      phases.push({
        key,
        ticks: 0,
        type: next.done ? 'done' : next.transition ? 'transition' : items[next.itemIndex].type,
        seconds: next.done ? 0 : next.transition ? app.TRANSITION_SECONDS : items[next.itemIndex].seconds,
      });
    }
    phases.at(-1).ticks += 1;
  };
  note(state);
  for (let guard = 0; !state.done && guard < 100; guard += 1) {
    state = app.advanceRunnerState(state, workout);
    note(state);
  }
  assert.equal(state.done, true);
  assert.deepEqual(phases.map((phase) => [phase.type, phase.ticks, phase.seconds]), [
    ['exercise', 2, 2],
    ['transition', 5, 5],
    ['rest', 3, 3],
    ['transition', 5, 5],
    ['exercise', 2, 2],
    ['transition', 5, 5],
    ['exercise', 2, 2],
    ['done', 1, 0],
  ]);

  assert.equal(app.blockSpeech(rest(45)), '45 seconds rest');
  assert.equal(app.blockSpeech(rest(30)), '30 seconds rest');
  assert.equal(app.blockSpeech(exercise('Crunches', 30), { spoken: 'Crunches' }), 'Crunches for 30 seconds');
  assert.equal(app.blockSpeech(exercise('Crunches', 30), { spoken: 'Crunches', countdown: true }), 'Crunches for 30 seconds, begin in');
  assert.equal(app.blockSpeech(exercise('Side Plank', 30), { sideSwitch: true }), 'Switch sides');
  assert.equal(app.blockSpeech(rest(45), { countdown: true }), '45 seconds rest, begin in');

  for (const workout of Object.values(data.SIXPACK_VERIFIED_WORKOUTS)) {
    workout.items.forEach((item, index) => {
      if (item.type !== 'rest') return;
      assert.ok(item.seconds === 30 || item.seconds === 45, `Pausenblock ${item.seconds}s`);
      assert.equal(app.needsTransition(workout.items, index - 1), true, '5s vor dem Pausen-Block');
      if (workout.items[index + 1]) assert.equal(app.needsTransition(workout.items, index), true, '5s nach dem Pausen-Block');
      assert.equal(app.blockSpeech(item), `${item.seconds} seconds rest`);
    });
  }
  console.log('Runner: 5s with voice before and after every 30/45s rest block; rest keeps its own duration.');
}
