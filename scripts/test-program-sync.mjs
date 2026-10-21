import assert from 'node:assert/strict';
import { mergePrograms, setTrackerDay } from '../programSync.js';

const base = { currentDay: 4, completedDays: [1, 2, 3], completedOn: { 1: 'a' }, lastCompletedOn: 'x', restDate: null, workouts: { 1: { n: 1 } }, updatedAt: 10 };
assert.equal(mergePrograms(base, null), base);

const remote = { ...base, currentDay: 6, completedDays: [2, 3, 4, 5], completedOn: { 4: 'b' }, workouts: { 4: { n: 4 } }, updatedAt: 20 };
const m = mergePrograms(base, remote);
assert.equal(m.currentDay, 6);
assert.deepEqual(m.completedDays, [1, 2, 3, 4, 5]);
assert.deepEqual(Object.keys(m.workouts), ['1', '4']);
assert.equal(m.updatedAt, 20);
// lokal neuer → lokal gewinnt currentDay (manuelles Zurücksetzen bleibt)
assert.equal(mergePrograms({ ...base, currentDay: 2, updatedAt: 30 }, remote).currentDay, 2);

const t = setTrackerDay(base, 3, true, '2026-10-21', 99);
assert.deepEqual([t.currentDay, t.restDate, t.lastCompletedOn, t.updatedAt], [3, '2026-10-21', 'x', 99]);
const t2 = setTrackerDay(base, 5, false, '2026-10-21', 99);
assert.deepEqual([t2.currentDay, t2.restDate, t2.lastCompletedOn], [5, null, null]);
console.log('program sync ok');
