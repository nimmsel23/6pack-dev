import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vosChangelog } from './scripts/mini-app-shell/vos-changelog-vite.mjs';

export default defineConfig({
  base: './',
  plugins: [react(), vosChangelog({ appId: 'sixpack', appName: '6Pack', accent: '#f87171' })],
  server: { proxy: { '/sixpack': `http://127.0.0.1:${process.env.FITNESS_NODE_PORT || 9100}` } },
});
