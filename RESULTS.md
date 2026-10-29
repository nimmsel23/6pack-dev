# 2026-10-25 — Vollflächige Screens, kürzerer Splash, Fitness-Wrapper, Releases

Auf User-Wunsch („die App soll die ganze Bildschirmfläche nutzen, ohne scrollen zu müssen“, „Splashscreen darf nicht so lange laden“, „Fitness-Wrapper anpassen“) umgebaut und zweimal veröffentlicht. Commits auf `dev`: `ac5cb26`, `bf5a0fa`, `4831162`, `4b5f729`. Neue Arbeitsregel: in 6pack-dev direkt committen (Feedback-Memory `always-commit`), Push separat.

- **`SixPackApp.jsx` / `index.html` (Runner):** Runner belegt den ganzen sichtbaren Bildschirm, das Video füllt den Platz zwischen Timer und Buttons (statt festem 16:9); gilt für Übungs- und Wechsel-Ansicht. `viewport-fit=cover`, Abstand zu Notch und Home-Indikator (`ac5cb26`). Später wird der Runner per Portal an `document.body` gehängt, weil transformierte Eltern im Fitness-Shell `fixed` einsperren; Einbettung füllt die vorgegebene Höhe (`h-full`) (`4b5f729`).
- **`SixPackApp.jsx` (übrige Screens):** Home mit `h-dvh`, Today’s-Workout-Karte wächst, Menü mit sechs Buttons unten. Track, Day, Learn, Favorites, Shuffle, Settings, Note: Header bleibt stehen, bei Day/Shuffle auch „Start Workout“, nur der Bereich dazwischen scrollt (`4831162`). Nur Standalone-App; in der Fitness-Einbettung (`onSubNav`) unverändert. Exercise-Detail und Selfies nicht gezielt angepasst.
- **`mini-app.json` (Splash):** Mindestanzeige 700 → 250 ms, Update-Loader bis 10 → 3 s, Failsafe 12 → 4 s. Hauptursache war „Update wird geladen …“ nach jedem Release (`bf5a0fa`); gemeinsame Shell `scripts/mini-app-shell/` unberührt.
- **fitness-dev (`SixPackFrame.jsx`, neu in `src/views/Session/`):** Wrapper gibt der 6Pack-Karte feste Höhe bis zur Mobile-Nav; `Session/index.jsx` nutzt ihn im Timer-Tab (`cd0e4ea`). Submodul `6pack` auf `4b5f729` gehoben (`dc31730`); Branch `fitness` in 6pack-dev per Fast-Forward auf `4b5f729`.
- **Releases:** `6pack-release --yes` (User): `ac5cb26` live auf `vos-6pack.web.app`, später `4831162` inkl. Splash-Fix (Parent-Bump `a8e3158`). Danach Fitness-Release (`vitalos`-Merge `bce6522..003d888`, Parent-Bump `c8b5fb4`), `fitness-aos.web.app` mit `4b5f729` + `SixPackFrame`, Deploy fehlerfrei.
- **`vos-release`:** Syntaxfehler „Zeile 634“ nach „release flow complete“ ist harmlos (Skript wurde während des Laufs durch Commit `6082eae` überschrieben); `bash -n` sauber.
- **Nicht geprüft:** Alles nur per Build/Deploy-Ausgabe; auf dem Handy oder im Browser nichts angesehen (Runner ohne Scrollen, Splash-Dauer, Fitness-Tab bis über die Mobile-Nav).

---

# 2026-10-24 — Runner-Fixes nach Gym-Test (Jakob), Release

Jakob meldete per WhatsApp Fehler im Runner der 6Pack-App; der User ergänzte eine Mängelliste (Videos blockieren die App, Workout startet nicht automatisch, Töne unpassend, Wiederholen bei Rest fehlt, Pause-Button sinnlos, Sprachansagen weg). Fixes auf `dev` (`fba285f`, `b682690`, `e7e83e8`, `dc52a08`, `7622cf6`), danach veröffentlicht.

- **`SixPackPromiseCard.jsx` (Runner):** Timer holt Drosselung im Hintergrund nach; Video-Fehler blockieren den Runner nicht mehr. „Start Workout“ startet Intro + Timer direkt (`autoStart`, Audio per `primeAudio()` im Tap freigeschaltet), Videos laden nur im Hintergrund. „Wiederholen“ auch bei Rest (startet die Pause von vorn).
- **Embeds:** YouTube/Vimeo ohne `autoplay`/`loop` (Verdacht: iOS-Audio-Session wird von Autoplay-Iframes gezogen und verstummt die Ansagen); `beep()` weckt einen unterbrochenen AudioContext per `resume()`. Vimeo-Link von `bent_knee_windshield_wipers` deaktiviert (Einbettung gesperrt) — die Übung hat bis zu einem einbettbaren Clip kein Video.
- **Töne = Gym-Timer:** Rechteckwelle, letzte 3 s kurze Pieps (1000 Hz), langer Ton (0,8 s) an jeder Grenze (hoch 1000 Hz zum Start, tief 700 Hz beim Wechsel/Ende), 30-s-Warnung als Doppel-Piep + Ansage.
- **`videoCache.js`:** Alle Datei-Videos des Workouts werden 5 s nach Laufbeginn nacheinander im Hintergrund gecacht (`cacheVideos`).
- **Release:** `dev` gepusht und nach `vitalos` gemergt (`60ae8d7`), „6pack PWA“-Deploy grün, `vos-6pack.web.app` lieferte `60ae8d7`. Gitlink `6pack` in fitness-dev auf `60ae8d7` gezogen; Fitness-Tab (`fitness-aos.web.app`) enthält die Fixes nach manuellem Deploy. Spätere Standalone-Version ist `9ae576c` (inkl. Clips-Arbeit). Jakob wurde als „fitness-agent“ informiert.
- **Nicht geprüft:** Alles nur per Build/CI und `release-info.json`; auf dem Handy nichts gehört oder getestet (Sprachansagen, Töne, Autostart, Video-Cache).

---

# 2026-10-24 — Eigene Übungs-Clips (Vorbereitung Tag 1)

Eigene Aufnahmen sollen die fremden Katalog-Demos pro Übung ersetzen, ohne Code- oder Katalogänderung. Vorbereitet für Tag 1 (6 Clips, noch keine geliefert). Commits `5f021e9` und `d858d6f` auf `dev`, nicht gepusht, nichts deployt.

- **`catalogContent.mjs`:** `public/videos/<exercise_id>.mp4` (alternativ `.webm`) ersetzt beim Build die Katalog-Demo aus `catalog/exercise-videos.yml`; explizites `video_url` behält Vorrang. URL trägt `?v=<Inhalts-Hash>`, damit ersetzte Clips nicht aus dem alten Cache kommen.
- **`videoCache.js`:** cached same-origin-Clips wie https-Videos (Offline im Runner).
- **`firebase.json`:** Cache-Header für `/videos/**`; `public/videos/.gitkeep` angelegt.
- **`scripts/own-clips.mjs` (neu):** `status [--day N]` (Stand Tag 1, warnt bei falschem Codec, Ton, >4 MB), `import <exercise_id> <datei>` (Handyvideo → H.264, 720 px breit, ohne Ton, faststart; vorhandener Clip wird nach `video-downloads/` archiviert), `sync <fitness-dev-pfad>` (spiegelt Clips in den Fitness-Tab, kopiert nur Geändertes, lehnt Ziele ab, die nicht nach fitness-dev aussehen).
- **`scripts/test-exercise-details.mjs`:** neue Tests für Vorrang, Hash und Cache-Annahme; grün.
- **`docs/VIDEO_URLS.md` / `CLAUDE.md`:** Abschnitt „Eigene Clips“ mit Aufnahmetipps und Workflow.
- **Fitness-Tab (fitness-dev, `03134ab`):** Übernahme von `catalogContent.mjs`, `public/videos` im Build-Skript, Header nur im Target `client`.
- **Geprüft:** Import/Build/Datenmodell mit künstlichem HEVC-Testclip, danach entfernt und `dist/` neu gebaut. Wiedergabe auf dem Handy nicht getestet.

---

# 2026-10-23 — Track-Tab vereinfacht, volle Bildschirmbreite, Release

Der Track-Tab war mit Flag-Button und Done-Haken überladen. Die aktive Position sagt bereits alles (alles vor dem aktiven Tag ist erledigt, alles danach steht aus). Zusätzlich nutzt die App jetzt die volle Bildschirmbreite.

- **`SixPackApp.jsx` (Track-Tab):** Flag-Button pro Tag, `Flag`-Icon, `onSetCurrent`-Prop und `setCurrentDay` entfernt; Done-Kreis/-Haken entfernt. Pro Tag bleibt nur „Day N“ (aktiv rot, Ruhetage „Rest“). Neue Funktion `openTrackDay`: Antippen setzt den Tag per `setTrackerDay` (`programSync.js`) aktiv, sofern er nicht schon aktuell ist, und öffnet via `openDay` die Übungsliste. `completedDays` bleibt intern für Sync/Fortschritt erhalten. Commit `6340633`.
- **`main.jsx` / `SixPackApp.jsx` (Layout):** Breitenbegrenzung `max-w-xl`, Zentrierung, vertikales Padding und abgerundeter Karten-Rahmen entfernt; Screens laufen bis an den Rand. Commit `3e508b3`. Nur Build geprüft, nicht im Browser.
- **Release:** `dev` gepusht (`origin/dev`), per Fast-Forward nach `fitness` (`3c78698..3e508b3`), Gitlink in fitness-dev (`1c48b97`). Danach `~/vitalos/bin/fitness-release --yes` (vom User gestartet): `dev` in `vitalos` gemergt (`403e2f1..d8b44af`), Submodul `6pack` auf `5fb8588`, Pointer-Commit `14f56d8` auf `vitalos/master`. „Live Deploy (Fitness vitalos)“ (Run `39941425368`) erfolgreich; HTTP-Routen nicht geprüft.

---

# 2026-10-22 — Runner-Wiederholen und Audio-Mix

- Im Runner setzt „Wiederholen“ den Timer der aktuellen Übung zurück und startet sie erneut; während des 5-Sekunden-Wechsels kann die vorherige Übung zurückgeholt werden.
- Vor jeder Sprachansage und jedem Signalton wird die Audio-Session erneut auf `ambient` gesetzt, damit Musik anderer Apps weiterlaufen kann.
- Kein Build- oder Gerätetest ausgeführt.

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

## 2026-10-23 — Woche 2, Finisher-Dauer, Runner-Videos
- Woche 2 aus WhatsApp-Screenshots (App-Tage 8, 9, 11, 12, 13 = Woche 2 Tag 1, 2, 4, 5, 6) in `catalog/6pack/week2_workouts.yml`; 11 neue Übungs-YAMLs. Bei der Nachprüfung wurden Starfish Crunch und Rolling Jackknifes sprachlich korrigiert, Accordion-Seitenhinweise ergänzt und fehlende Learn-Kategorien gesetzt. Muskelzuordnungen der übrigen neuen Einträge sind weiterhin nicht einzeln fachlich geprüft.
- Activity Finisher: Dauer = tatsächliche Workout-Länge (`coreHiitFinisher()`), nicht mehr fix 5 min.
- Workout-Liste zeigt Übungsnotizen (z. B. „Tuck Planks (opposite sides)“).
- Videos: 9 neue YouTube-Demos in `catalog/exercise-videos.yml`. Starfish Crunch, Cross Knee Plank und Frog Crunch wurden inhaltlich gegen ihre Demos geprüft. Für Rolling Jackknifes und die seitliche Accordian-Variante wurde kein verlässlicher passender Clip bestätigt; Sprinter Tuck Planks und Canoe Crunch bleiben Näherungs-Videos. Für die übrigen Zuordnungen ist die Bewegungsübereinstimmung noch nicht geprüft.
- Runner: Autoplay/Loop für Datei-Videos und YouTube/Vimeo-Embeds; Datei-Videos werden in Cache Storage (`sixpack-videos-v1`, `videoCache.js`) vorgeladen und offline abgespielt. Embeds nicht cachebar. Kein physischer Geräte-Test.

## 2026-10-23 — Drehplan für Woche-2-Videos
- Konkrete Aufnahmeliste für neun offene oder unsichere Demos erstellt: drei fehlende passende Clips, zwei Näherungsclips und vier noch ungeprüfte Bewegungszuordnungen. Enthält Workout-Tage, Priorität, Bewegungshinweise, Dateinamen und den Repo-Pfad zur Einbindung: `docs/VIDEO-DREHPLAN-WOCHE-2.md`.

## 2026-10-24 — Native Offline-Reminder und Web-Push-Reparatur

- Auf Nutzerwunsch Android und iPhone: Capacitor-Projekte bündeln die bestehende UI; lokale Betriebssystem-Benachrichtigungen folgen dem Track, ohne Login/Internet. 60-Tage-Plan, Ruhetage, Abschluss-Unterdrückung, DST, Neuplanung nach Track-/Uhrzeitänderung und Resume; Android prüft genaue Alarme. Native Anmeldung über vorhandenen Firebase-E-Mail-Login.
- Web: kein stiller Timer-Fallback mehr; Fehlerstatus/Retry, automatische Geräte-Registrierung nach Login/Netzrückkehr, Aktivierung des Messaging-Workers abwarten, sichtbarer FCM-Vordergrund-Empfang. Notification-Klick öffnet den richtigen App-Pfad.
- Bestehenden Firebase-Scheduler `scheduledSixpackReminders` live lesend als ACTIVE bestätigt; kein Server-Deploy nötig/veranlasst.
- Geprüft: `pnpm run build`, `pnpm run build:native`, Capacitor-Sync Android/iOS; Reminder-/native-Bridge-/Worker-/Settings-Tests sowie Exercise-Details, Selfie-Cloud und Program-Sync grün. `vendor:check` meldet vorhandene Drift in vier unveränderten Shell-Dateien.
- Noch offen: native Android-/Xcode-Builds (hier kein Android-SDK bzw. macOS/Xcode), Apple-Signierung und Offline-Abnahme auf beiden Geräten. Manueller CI-Build-Workflow vorbereitet, noch nicht ausgeführt. Kein Push/Release, keine Store-Veröffentlichung. Anleitung: `docs/NATIVE-REMINDERS.md`.

## 2026-10-24 — Ein kommender 6Pack-Termin im Google-Kalender Fitness

- Nutzerpräzisierung umgesetzt: vorhandener Kalender `Fitness`, genau ein eigener kommender Termin, keine Serie/keine Vorrats-Termine. Nach synchronisiertem Programm-Abschluss wird derselbe Termin auf den nächsten Trainingstag verschoben; Ruhetage, erledigter heutiger Tag und Programmende berücksichtigt. Uhrzeit bleibt auch ohne Push einstellbar.
- Gemeinsame Settings-UI mit Google-Verbindung/Status/Disconnect; vorhandene Firebase-Host-Instanz wiederverwendet. Kalender-Functions als isolierte Codebase `sixpack-calendar`: Google-OAuth mit PKCE/einmaligem State und Kontogleichheit, dauerhafte serverseitige Freigabe, Firestore-Trigger auf den neuesten Track, Lease + stabile Event-ID gegen Duplikate. Nur eigene Events werden geändert/entfernt. Keine Kalender-Anlage und kein Fallback auf `primary`.
- OAuth-Tokens ausschließlich in privaten Admin-Collections; bestehende VitalOS-Rules verweigern Benutzern und Coaches Zugriff. Gemeinsame Track-Projektion für lokale und Kalender-Reminder; initialer unveränderter Track wird nach Login ebenfalls synchronisiert.
- Geprüft: Calendar-/Reminder-/Exercise-/Selfie-Cloud-/Program-Tests und Firebase-Web-Build; isolierter `demo-sixpack`-Emulator mit echten VitalOS-Rules: Foto-E2E, OAuth-Abschirmung sowie Kalender-Backend mit simuliertem Google (Kontogrenze, State-Replay, PKCE, verspätete/konkurrierende Trigger, Disconnect) grün. Vendor-Check meldet unveränderte vorhandene Shell-Drift.
- Noch nicht live: OAuth-Webclient/Callback + Client-Secret und Kalender-Functions-Deploy erforderlich; Calendar API ist im Projekt bereits aktiviert, Secret Manager noch nicht. Manueller CI-Deploy vorbereitet; konkrete Einrichtung in `docs/GOOGLE-CALENDAR.md`. Keine echten Kalendertermine, kein Push/Production-Deploy.

## 2026-10-24 — Push, Fitness-Handoff, 6Pack Production und Kalender-Cloud-Einrichtung

- 6Pack `dev` und `fitness` auf `ba13f79` veröffentlicht; anschließend zwei kleine CI-Korrekturen auf `dev` (`aff99d5`, `6140930`: öffentliche Deploy-Konto-Diagnose und explizite Bestätigung der idempotenten Trigger-Retry-Policy). 6Pack-Preview-CI `40079290086` erfolgreich, HTTP 200/Release-ID geprüft.
- Fitness-Gitlink scoped auf veröffentlichtem `origin/dev` als `55836ea` gepusht und lokal in `fitness-dev/dev` integriert. Die fremden unveröffentlichten Katalog-Commits wurden nicht mit gepusht; neue parallele Fitness-Arbeiten erhalten. Fitness-Preview-CI `40079514111` erfolgreich und HTTP 200 bestätigt.
- Auf ausdrücklichen Wunsch 6Pack `vitalos` nach erfolgreichem VOS-Release-Dry-run auf `ba13f79` fast-forwarded, frisch gebaut und gepusht. Hosting-Deploy und Production-CI `40079856609` erfolgreich; `https://vos-6pack.web.app/release-info.json` liefert `ba13f79`. VitalOS-Parent-Gitlink scoped als `947e50f` committed, Meta-Repo nicht gepusht.
- Mit freigegebenem gcloud-Setup: Secret Manager/Cloud Run/Eventarc/PubSub aktiviert, vorhandenen Google-OAuth-Client geprüft, Client-Secret ohne Ausgabe direkt nach Secret Manager übernommen, öffentliche GitHub-Client-ID gesetzt, OAuth-State-TTL konfiguriert. Nutzer hat Callback-URI ergänzt und Kalender-Functions-Live-Deploy ausdrücklich erlaubt. Secret-Metadatenleserecht für tatsächliches CI-Konto und Secret-Zugriff für Gen-2-Runtime auf genau dieses Secret gesetzt.
- Noch offen: Firebase verlangt drei projektweite Service-Agent-Bindings für den neuen Gen-2-Trigger. Auto-Review hat deren Vergabe abgelehnt; explizite Freigabe angefragt. Kalender-Deploy-Lauf `40080114710` daran gescheitert; Kalender-Automatik noch nicht live. Keinen echten Google-Kalendertermin angelegt. Konkreter Stand in `docs/GOOGLE-CALENDAR.md`.

## 2026-10-24 — Kalender-Backend vollständig live

- Nach expliziter Freigabe die drei von Firebase verlangten IAM-Bindings für Pub/Sub-Service-Agent und Compute-Runtime gesetzt. Eventarc-Service-Agent-Rolle und aktive OAuth-State-TTL verifiziert.
- Functions-Build isoliert repariert: `edcb651` ergänzt die pnpm-Build-Freigabe für protobufjs; `60ae8d7` pinnt das Functions Framework und prüft dessen echten Produktionsstart vor CI-Deploy. Frische Produktionsinstallation, Kalender-Tests und Runtime/Auth-Smoke bestanden. Fehlgeschlagenen, noch unbenutzbaren Erstdeploy des Track-Triggers nach bestätigtem FAILED-Zustand neu angelegt; keine Nutzer-/Kalenderdaten gelöscht.
- Kalender-Deploy `40082517530` erfolgreich: `sixpackCalendarBegin`, `sixpackCalendarCallback`, `sixpackCalendarDisconnect`, `sixpackCalendarOnTrack` in europe-west1 alle ACTIVE. Live-Trigger filtert `users/{uid}/meta/sixpack`, RETRY_POLICY_RETRY; GCLOUD_PROJECT korrekt `fitness-aos`.
- Nach ausdrücklicher separater Freigabe nur die drei neuen HTTP-Services per service-lokalem `roles/run.invoker` für Browser/Google-OAuth erreichbar gemacht. Live: Begin/Disconnect anonym HTTP 401 mit UNAUTHENTICATED, Callback ohne State HTTP 400. Internen Track-Trigger nicht öffentlich gemacht.
- Nutzer muss jetzt in 6Pack unter Einstellungen einmal „Google Kalender verbinden“ und die Google-Kalenderfreigabe bestätigen. Danach hält der Server genau einen kommenden eigenen Workout-Termin im vorhandenen Kalender Fitness aktuell. Echter Kalender-/Handytest noch offen; keine persönlichen Termine durch den Agenten angelegt. Parallele Runner-/Gitignore-/Clips-Arbeitsstände erhalten.
# 2026-10-29 — Runner-Voice und Bedienung

- Startintro spricht „Welcome to Six Pack Promise.“ und nach 650 ms die Equipment-Zeile als eigenen Satz.
- Übungsname und Dauer werden mit normalem Sprechtempo angesagt. Erst danach läuft der volle 5-Sekunden-Countdown bis „go“, sowohl beim Workout-Start als auch bei Übungswechseln.
- „Wiederholen“ setzt die Übung zurück und lässt den Runner direkt weiterlaufen. Die manuellen Start-/Pause-Buttons sind entfernt.
- `pnpm run build` scheiterte am schreibgeschützten pnpm-Store-Lock; der vorhandene Vite-Build plus Shell-Stamp lief erfolgreich.
# 2026-10-29 — Cloud-Dev-pnpm-Laufzeit

- `scripts/pnpm-cloud.sh` prüft Schreibbarkeit der XDG-Runtime-/Datenpfade. Falls sie gesperrt sind, nutzt pnpm ignorierte `.pnpm-cloud/runtime`- und `.pnpm-cloud/data`-Verzeichnisse im Workspace.
- README und AGENTS.md dokumentieren den Cloud-Dev-Aufruf; keine `.npmrc`-Store-Option, da pnpm 11/12 diese Einstellungen aus YAML liest.
- Mit pnpm 11.3.0: `./scripts/pnpm-cloud.sh run build` erfolgreich, inklusive Daten- und Shell-Stamp-Build. Die Sandbox brauchte für den Zugriff auf ihren vorhandenen Cloud-XDG-Store eine Ausführungsfreigabe.

# 2026-10-29 — Startansage und Runner-Startton

- Welcome wird nicht mehr nach 1,5 Sekunden abgebrochen. Der Intro-Ablauf bleibt linear: Welcome → Equipment-Einleitung; ohne Equipment folgt nach weiterer Satzpause ausdrücklich „No equipment required for this workout.“
- Danach folgen Übungsansage + „begin in“ und 5, 4, 3, 2, 1. Kein zusätzlicher Countdown davor und kein gesprochenes „go“.
- Nach der 1 startet der Runner-Timer; der erste lange Startton erklingt erst anschließend.

# 2026-10-29 — Runner-Töne auf Übungsgrenzen beschränkt

- Doppelpieps bei 30 Sekunden entfernt; „30 seconds left“ und „10 seconds left“ bleiben reine Sprachansagen.
- Lange Töne erklingen nur beim Start und Ende einer Übung, nicht bei Pausen.

# 2026-10-29 — Abbruchschutz und Offline-Video-Befund

- Runner-Abbruch fragt jetzt in einem barrierearmen Dialog nach; „Weiter trainieren“, Escape und Fokus auf der sicheren Aktion schließen den Dialog ohne abzubrechen.
- Video-Cache-Befund aus `sixpackData.generated.js`: 24 Übungs-Demos sind YouTube/Vimeo-Embeds und werden vom Datei-Cache ausgeschlossen; vier sind direkte MP4-URLs, vier Übungen haben keine URL. Die eingebetteten Videos können so nicht offline verfügbar sein.
- Die CDN-/CORS-Antworten der vier MP4-Quellen und das Playback im Flugmodus konnten hier nicht verifiziert werden: DNS-Auflösung zum Medienhost schlug in der Cloud-Umgebung fehl. Der Cache fängt diese Fehler außerdem still ab.
- Weitere vom Nutzer gemeldete, hier nicht auf Gerät behobene Punkte stehen als konkrete Abnahmen in `TODO.md`: doppelte Benachrichtigung am Anfang sowie gedimmtes iPhone-Mitteilungsfeld und stummes Runner-Audio im Hintergrund.

# 2026-10-29 — Runner-Benachrichtigung und iOS-Audio-Wiederaufnahme

- Statusbenachrichtigungen werden nicht mehr im Workout-Intro erzeugt, sondern erst nach dem tatsächlichen Timerstart; pro Runner-Schritt wird nur eine Benachrichtigung angefordert.
- Bei Rückkehr der Seite in den Vordergrund setzt der Runner einen suspendierten AudioContext und pausierte Sprachsynthese fort.
- iOS dimmt den Inhalt hinter dem Mitteilungsfeld selbst; Screen Wake Lock ist nur für sichtbare Dokumente vorgesehen. Eine PWA kann Audio im Hintergrund nicht zuverlässig erzwingen. Fortlaufende Hintergrundansagen erfordern eine native Audio-Session; iPhone-Abnahme bleibt offen.

# Runner: Rest-Ansage umgestellt (2026-10-29)

- Die Pausenansage nennt jetzt zuerst die Dauer, z. B. „45 seconds rest“ statt „Rest, 45 seconds“; der optionale Countdown-Zusatz bleibt erhalten.

# Runner: Countdown in der 5-Sekunden-Übergangspause (2026-10-29)

- Zwischen direkt aufeinanderfolgenden Übungen läuft weiterhin eine volle 5-Sekunden-Pause. Im letzten Abschnitt werden die aktuell verbleibenden 3, 2 und 1 Sekunden angesagt; nach verzögerten Ticks wird die tatsächlich verbleibende Zahl verwendet.
