import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateWorkoutProgram } from './workout-validation.mjs';
const valid = () => ({program_id:'example', source:'user_screenshots', verified_days:{1:{total_seconds:60,items:[{type:'exercise',exercise_id:'crunch',duration_seconds:30},{type:'rest',duration_seconds:30}]}},rest_days:[2,3,4,5,6,7]});
const check = doc => validateWorkoutProgram(doc, {crunch:{}}, 'week4_workouts.yml');
test('valid week permits exercises without demo videos', () => check(valid()));
for (const [name, mutate] of [
  ['unknown exercise', d => d.verified_days[1].items[0].exercise_id='typo'],
  ['wrong total', d => d.verified_days[1].total_seconds=90],
  ['negative duration', d => d.verified_days[1].items[0].duration_seconds=-30],
  ['invalid block', d => d.verified_days[1].items[0].type='other'],
  ['conflicting rest', d => d.rest_days.push(1)],
  ['missing day', d => d.rest_days.pop()],
  ['out of range', d => d.rest_days.push(8)],
]) test(`rejects ${name}`, () => { const doc=valid(); mutate(doc); assert.throws(() => check(doc)); });

test('partial weeks explicitly reserve unverified days without fabricating workouts', () => {
  const doc=valid(); doc.rest_days=[3,7]; doc.unverified_days=[2,4,5,6]; check(doc);
  doc.unverified_days.push(1); assert.throws(() => check(doc));
});
