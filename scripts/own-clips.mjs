#!/usr/bin/env node
/* eslint-env node */
// Eigene Übungs-Clips: Stand pro Tag prüfen und Handy-Aufnahmen app-tauglich importieren.
//   node scripts/own-clips.mjs status [--day N]          (Standard: Tag 1)
//   node scripts/own-clips.mjs import <exercise_id> <datei>
//   node scripts/own-clips.mjs sync <pfad-zu-fitness-dev>   (Clips in den Fitness-Tab kopieren)
// Clips liegen als public/videos/<exercise_id>.mp4 (siehe docs/VIDEO_URLS.md, „Eigene Clips“).
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const CLIPS = join(ROOT, 'public/videos');
const ARCHIVE = join(ROOT, 'video-downloads'); // gitignoriert, nicht öffentlich ausgeliefert
const MAX_MB = 4;

function dayExerciseIds(day) {
  const week = Math.floor((day - 1) / 7) + 1;
  const dayInWeek = ((day - 1) % 7) + 1;
  const file = join(ROOT, `catalog/6pack/week${week}_workouts.yml`);
  if (!existsSync(file)) throw new Error(`Kein Programm für Tag ${day} (${file} fehlt)`);
  const items = yaml.load(readFileSync(file, 'utf8')).verified_days?.[dayInWeek]?.items;
  if (!items) throw new Error(`Tag ${day} ist nicht im Programm hinterlegt`);
  return [...new Set(items.filter(i => i.type === 'exercise').map(i => i.exercise_id))];
}

function probe(file) {
  try {
    const out = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-print_format', 'json', '-show_streams', '-show_format', file], { encoding: 'utf8' }));
    const v = out.streams.find(s => s.codec_type === 'video');
    return {
      codec: v?.codec_name, pixFmt: v?.pix_fmt, size: v ? `${v.width}x${v.height}` : '?',
      seconds: Number(out.format.duration || 0), audio: out.streams.some(s => s.codec_type === 'audio'),
    };
  } catch { return null; }
}

function status(day) {
  const ids = dayExerciseIds(day);
  let present = 0;
  console.log(`Tag ${day}: ${ids.length} Übungen`);
  for (const id of ids) {
    const file = ['mp4', 'webm'].map(ext => join(CLIPS, `${id}.${ext}`)).find(existsSync);
    if (!file) { console.log(`  ✗ ${id}  (fehlt → public/videos/${id}.mp4)`); continue; }
    present++;
    const mb = statSync(file).size / 1048576;
    const info = probe(file);
    const warn = [];
    if (mb > MAX_MB) warn.push(`${mb.toFixed(1)} MB > ${MAX_MB} MB`);
    if (info) {
      if (!['h264', 'vp9'].includes(info.codec)) warn.push(`Codec ${info.codec} (iPhone/Android spielen H.264 sicher)`);
      if (info.pixFmt && info.pixFmt !== 'yuv420p') warn.push(`Pixelformat ${info.pixFmt}`);
      if (info.audio) warn.push('hat Ton (Runner spielt stumm, Ton nur unnötige MB)');
    }
    const detail = info ? `${info.size}, ${info.seconds.toFixed(1)} s, ${mb.toFixed(1)} MB` : `${mb.toFixed(1)} MB (ffprobe nicht lesbar)`;
    console.log(`  ${warn.length ? '!' : '✓'} ${id}  ${detail}${warn.length ? `  ← ${warn.join('; ')}` : ''}`);
  }
  console.log(`${present}/${ids.length} eigene Clips vorhanden, Rest bleibt bei der bisherigen Demo.`);
}

function importClip(id, input) {
  if (!id || !input) throw new Error('Aufruf: import <exercise_id> <datei>');
  if (!existsSync(join(ROOT, `catalog/6pack/${id}.yml`))) throw new Error(`Unbekannte Übung "${id}" (catalog/6pack/${id}.yml fehlt)`);
  if (!existsSync(input)) throw new Error(`Datei nicht gefunden: ${input}`);
  mkdirSync(CLIPS, { recursive: true });
  const target = join(CLIPS, `${id}.mp4`);
  if (existsSync(target)) {
    mkdirSync(ARCHIVE, { recursive: true });
    const old = join(ARCHIVE, `${id}.${new Date().toISOString().replace(/[:.]/g, '-')}.mp4`);
    renameSync(target, old); // nie löschen, nur archivieren
    console.log(`Vorheriger Clip archiviert: ${old}`);
  }
  // 720p max., H.264/yuv420p, ohne Ton, faststart (Wiedergabe beginnt vor Downloadende), gerade Pixelmaße.
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', input,
    '-vf', "scale='min(720,iw)':-2", '-c:v', 'libx264', '-crf', '26', '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart', target], { stdio: 'inherit' });
  const mb = statSync(target).size / 1048576;
  console.log(`✓ ${target} (${mb.toFixed(1)} MB)${mb > MAX_MB ? `  ← über ${MAX_MB} MB, Clip kürzen` : ''}`);
}

// Fitness hat ein eigenes public/ (eigene Hosting-Origin): dieselben Clips dorthin spiegeln.
function sync(target) {
  if (!target) throw new Error('Aufruf: sync <pfad-zu-fitness-dev>');
  const dest = join(resolve(target), 'public/videos');
  if (!existsSync(join(resolve(target), 'scripts/build-sixpack-data.mjs'))) throw new Error(`${target} sieht nicht nach fitness-dev aus`);
  mkdirSync(dest, { recursive: true });
  const clips = readdirSync(CLIPS).filter(f => /\.(mp4|webm)$/.test(f));
  for (const f of clips) {
    const same = existsSync(join(dest, f)) && readFileSync(join(dest, f)).equals(readFileSync(join(CLIPS, f)));
    if (!same) copyFileSync(join(CLIPS, f), join(dest, f));
    console.log(`${same ? '=' : '→'} ${f}`);
  }
  console.log(`${clips.length} Clip(s) nach ${dest}. Dort: Daten neu bauen (predev/prebuild), committen.`);
}

const [cmd, ...args] = process.argv.slice(2);
try {
  if (cmd === 'status') {
    const i = args.indexOf('--day');
    status(i >= 0 ? Number(args[i + 1]) : 1);
  } else if (cmd === 'import') importClip(args[0], args[1]);
  else if (cmd === 'sync') sync(args[0]);
  else { console.error('Aufruf: status [--day N] | import <exercise_id> <datei> | sync <fitness-dev>'); process.exitCode = 1; }
} catch (error) { console.error(`Fehler: ${error.message}`); process.exitCode = 1; }
