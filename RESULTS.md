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
