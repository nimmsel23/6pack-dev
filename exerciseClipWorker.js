import { cutExerciseClip } from './exerciseClipCut.js';

self.onmessage = async ({ data: { file, start, end } }) => {
  try {
    let last = -1;
    const result = await cutExerciseClip(file, start, end, (ratio) => {
      const percent = Math.floor(ratio * 100);
      if (percent === last) return;
      last = percent;
      self.postMessage({ type: 'progress', ratio });
    });
    self.postMessage({ type: 'done', result });
  } catch (error) {
    self.postMessage({ type: 'error', message: error?.message || 'Der Clip konnte nicht geschnitten werden.' });
  }
};
