# Runner: Start-Intro, Musik-Sicherung, Auto-Finisher (2026-10-16)

- Start-Intro (Welcome + erste Übung [+ left side] + "begin in 3, 2, 1" + langer Ton) vor dem ersten Zeitlauf; abbrechbar, abgebrochene Intros bleiben wirkungslos (Token).
- Musik pausiert nie: Audio Session `ambient` ab Modul-Load, vor jedem Audio-Start und bei Rückkehr in die App.
- Nach Workout-Abschluss wird automatisch `Core HIIT` 5 min als `activity` geloggt (`workoutDoc.js` neues optionales `activity`; Fitness-App und Standalone schreiben es über `buildWorkoutDoc` mit). Geprüft: Doc + Index-Eintrag (`activity: {type:'hiit', duration:5}`).
- NICHT auf dem Gerät getestet (iOS-Audio/Sprachausgabe: Musik-Mischung, Intro-Timing, Aussprache) — vor Release einmal real durchlaufen.

# Runner: alle Sprachansagen komplett Englisch (2026-10-16)

- `SixPackApp.jsx`: "Pause/Sekunden/Seitenwechsel/Noch 10 Sekunden" → "Rest, 45 seconds" / "30 seconds" / "Switch sides" / "10 seconds left", alle en-US (`secondsText()` mit Singular).
- Befund zum Warnton: einen **30-Sekunden-Cue gab es in der gesamten Git-Historie nie** (`git log --all -S"Noch 30"` leer) — nicht durch einen Merge verloren, der Agent hat ihn nie gebaut. Der 10-s-Cue (`921f42f`, Merge `20d71aa`) ist intakt. 30-s-Cue ist offen.

# ~/6pack-dev aufgeräumt: wieder auf dev (2026-10-16)

- Die WIP von `agent/photo-auth` (private Fotos mit Firebase-Auth: `PrivatePhoto`, `SelfiesGallery`, `photoAuth`/`photoClient`, umgebauter Selfies-Screen) ist als Commit `926e8a1` gesichert; `dev` wurde in den Branch gemergt (`f27e538`; `main.jsx` → dev-Stand mit Sync-Root, `.gitignore` beide Zeilen). Build auf dem Merge grün.
- `agent/photo-auth` ist **nicht** nach `dev` gemergt (unfertig; Push auf `dev` = Live-Deploy). `~/6pack-dev` steht wieder auf `dev`.
- Paketmanager: **pnpm** (Entscheidung User 2026-10-16). `origin/vitalos` in `dev` gemergt (`49d3a3e`): `package.json` = pnpm-Basis + Stamp-Build + vendor:check, `pnpm-workspace.yaml` mit `allowBuilds` (pnpm 11 bricht sonst mit ERR_PNPM_IGNORED_BUILDS ab), GitHub Action nutzt `pnpm/action-setup` + `pnpm install --ignore-scripts` + `pnpm run build`. In frischem Klon geprüft (install + build grün). `vos-release 6pack`-Preflight jetzt konfliktfrei.

# 6Pack: Splash, sw.js und SW-Register aus @vos/mini-app-shell (2026-10-16)

- Splash, Service Worker und SW-Register kommen aus `@vos/mini-app-shell` (SSOT `~/vitalos/packages/mini-app-shell`, hier vendored unter `scripts/mini-app-shell/` — nicht editieren; Aktualisieren/Drift: `node ~/vitalos/packages/mini-app-shell/cli.mjs vendor scripts/mini-app-shell [--check]`; Konfig `mini-app.json`).
- `npm run build` = `vite build` + `stamp dist --app 6pack`; `index.html` ohne Inline-Splash/-Register, alter `public/sw.js` → `docs/archive/sw.static-v1.js`.
- Aktivierung räumt nur Caches mit Präfix `vos-6pack-`. Commits `34a2c8c`, `7049696` auf `dev`. Nicht gepusht — Push auf `dev` = Live-Deploy.

# 2026-10-13 — Selfies: lokale Synchronisierung und Fotoauswahl

- Barrel-Einstieg und getrenntes Selfies-Modul auf den aktuellen 6Pack-Stand
  portiert; bestehende Workout-Favoriten und Runner-Funktionen erhalten.
- Kamera und Mehrfachauswahl aus Galerie/Dateien; Ergebnis pro Datei,
  UID-gebundene Offline-Queue, Wiederholung und Runtime-Upload über Fitness.
- Standalone nutzt ausdrücklich UID `local`; Fitness übergibt die aktive
  DB-UID. Kein fest kodierter persönlicher Nutzer. Neue Backend-Routen liegen
  im Fitness-Repository. Bestehende unzugeordnete Browserfotos bleiben erhalten.

# Results

- 2026-10-09: Eat öffnet Fuel direkt: Firebase-Hosts führen zu `fuel-vos.web.app`, lokale Hosts zu Port `7000`. Die bisherige Eat-Platzhalterseite entfällt.
- 2026-10-09: Favorites speichert vollständige Tages- und Shuffle-Workouts mit Übungen, Reihenfolge, Zeiten und Pausen. Favoriten können wieder gestartet und entfernt werden; Wiederholungen verändern den Programmfortschritt nicht. Bisherige Übungsfavoriten bleiben unter ihrem alten Speicherschlüssel erhalten.

- 2026-10-11: Merge von origin/dev aufgelöst: Fuel-Link und Workout-Favoriten bleiben erhalten; Timer-Übergänge, Audio, Wake Lock, kalenderbasierter Fortschritt und PWA-Hosting übernommen. Tagesansicht berechnet die Dauer inklusive Übergängen.
