import assert from 'node:assert/strict';
import { clampRange, estimateFps, frameIndexAt, gridFrames, outFrameOf, rulerSteps, timecode } from '../video-control/timeline.js';
import { normalizeClip } from '../exerciseVideo.js';

const grid = gridFrames(10, 30);
assert.equal(grid.length, 300);
assert.equal(frameIndexAt(grid, 0), 0);
assert.equal(frameIndexAt(grid, 1 / 30), 1);
assert.equal(frameIndexAt(grid, 0.999), 29);
assert.equal(Math.round(estimateFps(grid)), 30);
// Handy-VFR: unregelmäßige Abstände werden exakt getroffen.
const vfr = [0, 0.016, 0.034, 0.05, 0.083, 0.1];
assert.equal(frameIndexAt(vfr, 0.06), 3);
assert.equal(timecode(0, 30), '00:00:00');
assert.equal(timecode(61.5, 30), '01:01:15');
assert.equal(timecode(1.999, 30), '00:01:29');
// Gespeicherte Werte bleiben im gewählten Frame und bestehen normalizeClip.
const sixty = gridFrames(20, 60);
for (const frame of [1, 7, 59, 123, 600]) {
  const range = clampRange('start', sixty[frame], 15, 20, sixty);
  assert.equal(frameIndexAt(sixty, range.start), frame, `start frame ${frame}`);
  const clip = normalizeClip(20, range.start, range.end);
  assert.equal(clip.error, undefined);
  assert.equal(frameIndexAt(sixty, clip.start), frame, `stored frame ${frame}`);
}
const out = clampRange('end', 2, sixty[300 + 1], 20, sixty);
assert.equal(outFrameOf(sixty, out.end), 300);
// Mindest- und Höchstlänge.
const tiny = clampRange('end', 5, 5.1, 20, sixty);
assert.ok(tiny.end - tiny.start >= 0.5);
const long = clampRange('end', 0, 80, 90, gridFrames(90, 30));
assert.ok(long.end - long.start <= 60);
const moved = clampRange('move', 18, 23, 20, sixty);
assert.ok(moved.end <= 20 && Math.abs(moved.end - moved.start - 5) < 0.05);
const steps = rulerSteps(30 * 40, 30);
assert.ok(steps.major * 1200 >= 72 && steps.minor <= steps.major);
console.log('Video-Timeline: Frame-Suche, VFR, Timecode, framegenaues Speichern, Grenzen und Lineal passed.');
for (const frame of [120, 300, 900]) {
  const range = clampRange('end', 0.5, sixty[frame + 1], 20, sixty);
  const clip = normalizeClip(20, range.start, range.end);
  assert.equal(outFrameOf(sixty, clip.end), frame, `stored out frame ${frame}`);
}
console.log('Video-Timeline: Out-Punkt bleibt nach dem Speichern im gewählten Frame.');
