#!/usr/bin/env node
import { copyFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceDir = fileURLToPath(new URL('.', import.meta.url));
const targetDir = process.argv[2] ? resolve(process.argv[2]) : null;

if (!targetDir || !existsSync(join(targetDir, 'sixpackData.js'))) {
  console.error('Aufruf: npm run publish:fitness -- /pfad/zu/fitness-dev/6pack');
  process.exit(1);
}

for (const name of ['SixPackPromiseCard.jsx', 'sixpack.css', 'sixpackData.js']) {
  copyFileSync(join(sourceDir, name), join(targetDir, name));
  console.log(`6Pack veröffentlicht: ${name}`);
}

console.log('Im Fitness-Repo danach Build, Diff und Commit prüfen. KB-Daten bleiben dort lokal generiert.');
