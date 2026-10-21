import { mkdir, writeFile } from 'node:fs/promises';
import { readVosReleaseInfo } from './mini-app-shell/vos-release-info.mjs';

const release = readVosReleaseInfo();
if (release) {
  await mkdir('public', { recursive: true });
  await writeFile('public/release-info.json', JSON.stringify(release, null, 2) + '\n');
}
