import assert from 'node:assert/strict';
import { cutExerciseClip } from '../exerciseClipWorkerClient.js';
const workers = [];
globalThis.Worker = class {
  constructor(url, options) {
    assert.match(String(url), /exerciseClipWorker.js$/);
    assert.equal(options.type, 'module');
    workers.push(this);
  }
  postMessage(data) { this.input = data; }
  terminate() { this.terminated = true; }
};
const source = new File(['video'], 'source.mp4');
const updates = [];
const pending = cutExerciseClip(source, 1, 3, ratio => updates.push(ratio));
const first = workers.at(-1);
assert.equal(first.input.file, source);
first.onmessage({ data: { type: 'progress', ratio: 0.5 } });
const result = { file: new File(['clip'], 'clip.mp4'), durationSeconds: 2 };
first.onmessage({ data: { type: 'done', result } });
assert.equal(await pending, result);
assert.deepEqual(updates, [0.5]);
assert.equal(first.terminated, true);
const controller = new AbortController();
const cancelled = cutExerciseClip(source, 0, 1, null, { signal: controller.signal });
const second = workers.at(-1);
controller.abort();
await assert.rejects(cancelled, { name: 'AbortError' });
assert.equal(second.terminated, true);
const failed = cutExerciseClip(source, 0, 1);
workers.at(-1).onmessage({ data: { type: 'error', message: 'Ungültiges Video' } });
await assert.rejects(failed, /Ungültiges Video/);
assert.equal(workers.at(-1).terminated, true);
const alreadyCancelled = workers.length;
await assert.rejects(cutExerciseClip(source, 0, 1, null, { signal: controller.signal }), { name: 'AbortError' });
assert.equal(workers.length, alreadyCancelled);
console.log('Clip worker: progress, result, errors and cancellation passed.');
