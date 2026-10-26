// Holt den Fuel-Schnelleinstieg "Shutter" (Kamera → Foto → Mahlzeit loggen) als fertigen Build nach public/eat/.
// Der Eat-Screen bettet ihn same-origin per iframe ein, damit der Firebase-Login von 6Pack gilt (kein Sandbox-Browser).
// Aufruf: node scripts/import-fuel-eat.mjs [--no-build]   (FUEL_DIR überschreibt ~/fuel-dev)
// Die Ausgabe wird committet, weil CI/Release-Checkout kein fuel-dev daneben haben.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fuel = process.env.FUEL_DIR || resolve(homedir(), 'fuel-dev');
const out = resolve(root, 'public/eat');
const dist = resolve(fuel, 'dist-solo-log-shutter');

if (!process.argv.includes('--no-build')) {
  execFileSync('pnpm', ['run', 'build:solo:log:shutter'], { cwd: fuel, stdio: 'inherit' });
}
if (!existsSync(resolve(dist, 'index.html'))) {
  console.error(`❌ ${dist}/index.html fehlt — Fuel-Build nötig`);
  process.exit(1);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(resolve(dist, 'assets'), resolve(out, 'assets'), { recursive: true });
cpSync(resolve(dist, 'offline-queue.js'), resolve(out, 'offline-queue.js'));
// Eigenes Manifest/Icons/SW gehören der Fuel-App, nicht dem Einbettungsrahmen.
const html = readFileSync(resolve(dist, 'index.html'), 'utf8')
  .replace(/\s*<link rel="(?:manifest|icon|apple-touch-icon)"[^>]*>/g, '');
writeFileSync(resolve(out, 'index.html'), html);
console.log(`✓ public/eat aus ${dist}`);
