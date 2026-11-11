import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vosChangelog } from './scripts/mini-app-shell/vos-changelog-vite.mjs';

// Vite 8 / Rolldown appends a content-hash to the `__VITE_PRELOAD__` marker
// (`__VITE_PRELOAD__50b3…`). Vite's import-analysis then replaces only the
// 16-char marker, leaving `[]50b3…` — invalid JS (black screen on vos-6pack).
function fixRolldownPreloadMarker() {
  return {
    name: 'fix-rolldown-preload-marker',
    renderChunk(code) {
      if (!code.includes('__VITE_PRELOAD__')) return null;
      const next = code.replace(/__VITE_PRELOAD__[a-f\d]{8,}/g, '__VITE_PRELOAD__');
      return next === code ? null : { code: next, map: null };
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), vosChangelog({ appId: 'sixpack', appName: '6Pack', accent: '#f87171' }), fixRolldownPreloadMarker()],
  server: { proxy: { '/sixpack': `http://127.0.0.1:${process.env.FITNESS_NODE_PORT || 9100}` } },
});
