// Shared build-time contract for all catalog workout weeks.
export function validateWorkoutProgram(doc, exercises, file) {
  const fail = message => { throw new Error(`${file}: ${message}`); };
  if (!/^week[1-9]\d*_workouts\.yml$/.test(file)) fail('expected weekN_workouts.yml');
  if (!doc?.program_id || !doc.source) fail('program_id and source are required');
  const days = doc.verified_days;
  if (!days || !Object.keys(days).length) fail('verified_days is empty');
  const rest = doc.rest_days;
  if (!Array.isArray(rest) || new Set(rest).size !== rest.length) fail('invalid rest_days');
  for (const day of rest) if (!Number.isInteger(day) || day < 1 || day > 7 || days[day]) fail(`invalid/conflicting rest day ${day}`);
  const unverified = doc.unverified_days || [];
  if (!Array.isArray(unverified) || new Set(unverified).size !== unverified.length) fail('invalid unverified_days');
  for (const day of unverified) if (!Number.isInteger(day) || day < 1 || day > 7 || days[day] || rest.includes(day)) fail(`invalid/conflicting unverified day ${day}`);
  for (const [day, workout] of Object.entries(days)) {
    if (!/^[1-7]$/.test(day)) fail(`invalid day ${day}`);
    if (!Array.isArray(workout.items) || !workout.items.length) fail(`day ${day}: no items`);
    let total = 0;
    for (const item of workout.items) {
      if (!['exercise', 'rest'].includes(item.type)) fail(`day ${day}: invalid block type`);
      if (!Number.isInteger(item.duration_seconds) || item.duration_seconds <= 0) fail(`day ${day}: invalid duration`);
      if (item.type === 'exercise' && !Object.hasOwn(exercises, item.exercise_id)) fail(`day ${day}: unknown exercise ${item.exercise_id}`);
      if (item.type === 'rest' && item.exercise_id) fail(`day ${day}: rest has exercise_id`);
      total += item.duration_seconds;
    }
    if (workout.total_seconds !== total) fail(`day ${day}: total_seconds ${workout.total_seconds} != sum ${total}`);
  }
  for (let day = 1; day <= 7; day++) if (!days[day] && !rest.includes(day) && !unverified.includes(day)) fail(`day ${day}: missing workout or rest designation`);
}
