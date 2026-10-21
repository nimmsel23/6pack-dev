## 2026-10-21 — Zentraler Changelog im Shell-Betrieb

Gemeinsame Quelle aktualisiert: Im Shell-Dokument und in Frames zeigt
6Pack keinen eigenen Dialog. VitalOS sammelt seine Änderungen zentral.
Standalone-Verhalten und Bestätigungsschlüssel bleiben erhalten. Gemeinsame
Browserprüfung bei 320/390px, Metadaten-Tests und Vendor-Parität erfolgreich.
Kein Push/Deployment.

## 2026-10-21 — Gemeinsamer Changelog statt Pilot-Kopie

UpdateNotes aus main.jsx durch den universellen VitalOS-Vite-Plugin ersetzt.
Gemeinsame Quelle in VitalOS, bestehende Mini-App-Shell-Kopie aktualisiert;
sixpack:seen-release bleibt erhalten. Metadaten werden an den Build gebunden;
der alte Writer delegiert für ältere Aufrufer an die gemeinsame Funktion.

Vite-Build und Vendor-Parität erfolgreich. Gemeinsamer Dialog im isolierten
Browser bei 320/390px geprüft, einschließlich Escape, Fokus, Bestätigung und
blockiertem Speicher. Kein Push, Merge, Pointer-Bump oder Deployment.

## 2026-10-17 — Übungsdetails vor dem Workout

- Tagesliste, Shuffle und gespeicherte Workouts öffnen eine gemeinsame Detailansicht; Learn verwendet dieselbe Ansicht. Start bleibt eine eigene Aktion.
- Rückkehr erhält die ausgewählte Liste und den Shuffle-Zustand; Tastaturfokus wird wiederhergestellt, Escape führt zurück.
- Muskelgrafik und deutsche Muskelnamen aus kanonischen KB-Regionen, Ausführung und Fehler aus vorhandenen Coaching-Daten. Gemeinsamer Generator-Helper für Standalone und Fitness.
- 20/21 öffentliche Demo-Zuordnungen, HTTPS-Dateien und YouTube/Vimeo-Einbettungen; lokale Runner-Vorgaben gelten auch für Details. Any Ball BTB Pass ist offen und wird als fehlend angezeigt. Externe Player-Verfügbarkeit nicht auf allen Geräten geprüft.
- Geprüft: Standalone-Produktionsbuild, Regressionstest für Navigation/Start/Shuffle/Learn, alle 21 Muskel-/Anleitungsdatensätze, tatsächliches Detail-Rendering und fehlende/defekte Medien. Gerätetest offen. Details: docs/VIDEO_URLS.md.

# Geräte-Abnahme: Selfie-Sync funktioniert (2026-10-17)

- Nutzer hat ein Bild am Handy in 6Pack hochgeladen und die erfolgreiche Anzeige am Laptop mit demselben Konto bestätigt. Der echte angemeldete Zwei-Geräte-Ablauf ist damit bestätigt, zusätzlich zu den automatisierten Client-/Emulator-Tests.
- Veröffentlicht: 6pack 21c804d; VitalOS-Shell-Fix 42e1168 übernimmt den bestehenden Login und bindet die Galerie an user.uid. Production-CI für Shell und Standalone erfolgreich (39028533456 / 39028533446); tatsächliche Bundles geprüft.
- Verbindlicher Speicherpfad: `sixpackSelfies/{uid}/photos/{photoId}`, Eigentümer-Zugriff, kein impliziter Coach-Zugriff. Frühere Log-Einträge zum users-Pfad/Coach-Zugriff beschreiben den verworfenen Zwischenstand.
- Nutzer-Abnahme belegt Upload/Anzeige Handy → Laptop. Offline-Wiederanlauf, alte Server-Fotos und HEIC/Kamera-Varianten sind damit nicht zusätzlich auf realen Geräten geprüft. Persönliche Bilddateien oder Tokens wurden nicht ausgelesen.

# Repo-Anleitung und Veröffentlichung (2026-10-17)

- AGENTS.md erklärt Root-Dateien, direkte Fitness-Integration, den vereinigten Foto-Sync, Auth-/Queue-/Import-Grenzen, Tests und Release-Wege. CLAUDE.md verweist darauf; veraltete Aussagen über dev als Live-Deploy korrigiert.
- Code dev/fitness gepusht. Foto-Regeln/Index per VitalOS-CI erfolgreich veröffentlicht (Run 39026791319); 6Pack-Preview erfolgreich (Run 39026861873), ausgeliefertes Bundle per HTTP geprüft. Fitness-Merge f6fdb70 auf dev gepusht; Staging :8100 aktiv, private API ohne Token HTTP 401.

# Photo-Sync-Arbeitsstände zusammengeführt (2026-10-17)

- `agent/photo-auth` tatsächlich gemergt: dessen photoAuth (Google/E-Mail), SelfiesGallery, PrivatePhoto und tokengeprüfter photoClient werden weiterverwendet. Finale Speicherung über den Cloud-Client statt separater konkurrierender Login-/Galerie-Implementierung.
- Privater Firestore-Pfad `sixpackSelfies/{uid}/photos/{id}` mit Eigentümer-Regeln statt Coach-lesbarem users-Pfad. Bilder getrennt von paginierter Metadaten-Liste; 401-Refresh, Account-Guard, bestätigte persistente Queue.
- Authentifizierter Altbestand-Import über vorhandene Fitness-API: ursprüngliches Datum, deterministische Import-ID, bestätigte Einträge überspringen; Originale bleiben erhalten. Kein hardcodierter Funnel oder stiller Laptop-Fallback.
- Geprüft: Cloud/Import-Client-Regression, Standalone-Build, echter isolierter Firestore-Emulator mit Upload/List/Download und Verweigerung für fremde Nutzer/Coach/anonyme Requests sowie fehlerhafte/zu große Daten. Geräte-Kamera bleibt ein physischer Gerätetest.

# Selfies: Firebase Cloud-Sync (2026-10-17)

- Lokale Foto-API im Client durch Firestore REST mit Firebase-ID-Token ersetzt; keine Laptop-Abhängigkeit. Gemeinsamer Pfad `users/{uid}/sixpackPhotos/{id}` für Standalone und Fitness. Bestehende Regeln erlauben Eigentümer und Coach.
- Google-Login direkt im Selfies-Screen auch für lokale Fitness-Builds. Gemeinsame Firebase-Konfiguration; bestehende Host-Instanz wird wiederverwendet. Fremde ausgewählte UID wird abgewiesen, Konto-Wechsel remountet die Galerie und ihre Queue.
- JPEG maximal 1600 px / 700000 Data-URL-Zeichen; Originale bleiben erhalten. UID-Queue, bestätigte Uploads, deterministische IDs, paginierte Galerie. Keine automatische Übertragung alter Laptop-Dateien oder unzugeordneter v1-Queues.
- Geprüft: Standalone Vite-Build und isolierte REST-Client-Regression (Auth/UID-Isolation, Payload-Grenzen, Wiederholung, Pagination, 403, Decode-Fehler). Angemeldeter echter Geräte-Sync ist noch nicht geprüft. Kein Push/Deploy.

# 6pack live: Runner-Update ausgeliefert (2026-10-16)

- `vos-release 6pack` (675def9) hat NICHTS deployt: der Pre-Push-Hook löste nur bei `src/`, `public/` usw. aus, 6pack hat den Code im Repo-Root. Manuell deployt (`pnpm run deploy` in `~/vitalos/6pack-app`), Live-Bundle geprüft: enthält Intro, 30s/10s-Cues, Core-HIIT-Finisher, `ambient`.
- Hook-Trigger erweitert (`32ddd53`, geht mit dem nächsten Release in `vitalos` ein): Root-`*.jsx/*.js/*.mjs/*.css`, `catalog/`, `mini-app.json`, `scripts/mini-app-shell/`.
- Beim Release-Lauf bricht `vos-release` nach dem Push noch an fremden Änderungen im Meta-Repo ab — jetzt nur noch Warnung.

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

- 2026-10-20: Runner spielt am Ende jeder Übung einen deutlichen zweistufigen Piep-Tüt-Ton; Lautstärke der Web-Audio-Cues angehoben. Kein Geräte-Audio-Test ausgeführt.
- 2026-10-20: Nach dem Workout-Ende sagt der Runner einmal „Congratulations. You've completed today's workout.“ auf Englisch.
- 2026-10-09: Eat öffnet Fuel direkt: Firebase-Hosts führen zu `fuel-vos.web.app`, lokale Hosts zu Port `7000`. Die bisherige Eat-Platzhalterseite entfällt.
- 2026-10-09: Favorites speichert vollständige Tages- und Shuffle-Workouts mit Übungen, Reihenfolge, Zeiten und Pausen. Favoriten können wieder gestartet und entfernt werden; Wiederholungen verändern den Programmfortschritt nicht. Bisherige Übungsfavoriten bleiben unter ihrem alten Speicherschlüssel erhalten.

- 2026-10-11: Merge von origin/dev aufgelöst: Fuel-Link und Workout-Favoriten bleiben erhalten; Timer-Übergänge, Audio, Wake Lock, kalenderbasierter Fortschritt und PWA-Hosting übernommen. Tagesansicht berechnet die Dauer inklusive Übergängen.

## 2026-10-17 — Offline-Cache bei Updates
Gemeinsame mini-app-shell erweitert bzw. aktualisiert: versionsunabhängiger öffentlicher API-Cache mit Migration, Asset-Precache standardmäßig aktiv, fehlgeschlagene Installation ersetzt bestehenden Worker nicht. IndexedDB/localStorage bleiben unverändert. Geprüft: 13 Shell-/Update-Tests, Private-Request-Test, Vendor-Parität. Kein Push/Release; kein physischer Geräte-Test.

## 2026-10-21 — Track: Firestore-Fortschritt + manueller Tracker
- Programm-Fortschritt wird pro User nach `users/{uid}/meta/sixpack` synchronisiert (`programSync.js`, Merge nach `updatedAt`, erledigte Tage vereinigt). Rules: durch `users/{uid}/{document=**}` gedeckt.
- Standalone verdrahtet (`standaloneSync.js::loadProgram/saveProgram`); Fitness-Host muss `loadRemoteProgram`/`saveRemoteProgram` an `SixPackPromiseCard` übergeben (offen).
- Track: Flag-Button pro Tag setzt den Tracker manuell; alle 8 Wochen sichtbar; nach Abschluss springt der Tracker auf den Folgetag des erledigten Tags.

## 2026-10-21 — Settings-Zahnrad + Erinnerung
- Zahnrad im Home-Header (neben dem Tageszähler) öffnet `SettingsScreen`: Switch + Uhrzeit für die tägliche Erinnerung.
- Einstellung liegt in `program.settings.reminder` und wird mit `users/{uid}/meta/sixpack` synchronisiert (`reminder.js`).
- Zustellung lokal (App/SW aktiv). Echte Hintergrund-Push bräuchte einen Server-Scheduler auf dieses Feld — offen.
