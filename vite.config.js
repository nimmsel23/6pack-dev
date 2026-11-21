import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vosChangelog } from './scripts/mini-app-shell/vos-changelog-vite.mjs';

// Gleiches Schema wie Journal (vite.config.cjs): Paketversion + kurzer Git-Stand.
// Liegt im Bundle (globalThis.__SIXPACK_BUILD__) und in dist/version.json.
function appBuildId() {
  const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
  let rev = process.env.GITHUB_SHA || process.env.GIT_COMMIT || '';
  if (!rev) {
    try {
      rev = execFileSync('git', ['rev-parse', '--short=7', 'HEAD'], { encoding: 'utf8' }).trim();
    } catch {
      rev = 'local';
    }
  }
  return `${pkg.version}+${String(rev).slice(0, 7)}`;
}

const APP_BUILD = appBuildId();

function sixpackVersionJson(build) {
  return {
    name: 'sixpack-version-json',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: `${JSON.stringify({ app: '6pack', build }, null, 2)}\n`,
      });
    },
  };
}

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
  define: {
    'globalThis.__SIXPACK_BUILD__': JSON.stringify(APP_BUILD),
  },
  plugins: [
    react(),
    vosChangelog({ appId: 'sixpack', appName: '6Pack', accent: '#f87171' }),
    fixRolldownPreloadMarker(),
    sixpackVersionJson(APP_BUILD),
  ],
  server: { proxy: { '/sixpack': `http://127.0.0.1:${process.env.FITNESS_NODE_PORT || 9100}` } },
});
