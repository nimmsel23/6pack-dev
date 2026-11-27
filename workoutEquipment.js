// Keep equipment keys stable across catalog labels, Shuffle and persisted choices.
const ALIASES = { swiss_ball: 'physioball', stability_ball: 'physioball', exercise_ball: 'physioball', fitness_band: 'resistance_band', band: 'resistance_band', pullup_bar: 'pull_up_bar' };
const LABELS = { bodyweight: 'Ohne Equipment', physioball: 'Gymnastikball', ball: 'Ball', tennis_ball: 'Tennisball', resistance_band: 'Fitnessband', pull_up_bar: 'Klimmzugstange' };
export const equipmentKey = key => ALIASES[key] || key;
export const equipmentLabel = key => LABELS[equipmentKey(key)] || String(key).replaceAll('_', ' ');
export function requiredEquipment(coaching) {
  return [...new Set((coaching?.equipment || []).map(equipmentKey).filter(key => key !== 'bodyweight'))];
}
export function availableExercises(categories, details, coaching, available) {
  const allowed = new Set(available.map(equipmentKey));
  const byName = Object.fromEntries(Object.values(details).map(exercise => [exercise.name, exercise]));
  return categories.map(category => ({ ...category, exercises: category.exercises.filter(name => {
    const exercise = byName[name];
    return exercise && requiredEquipment(coaching[exercise.id]).every(key => allowed.has(key));
  }) })).filter(category => category.exercises.length);
}
export function createShuffleWorkout(categories, random = Math.random) {
  const items = [];
  categories.forEach((category, index) => {
    items.push({ type: 'exercise', category: category.label, name: category.exercises[Math.floor(random() * category.exercises.length)], seconds: random() < 0.5 ? 30 : 60 });
    if (index < categories.length - 1 && random() < 0.5) items.push({ type: 'rest', name: 'Rest', seconds: random() < 0.5 ? 30 : 45 });
  });
  return { rest: false, items };
}
