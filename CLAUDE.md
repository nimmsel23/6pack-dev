# CLAUDE.md — 6pack-dev

## Arbeitsregeln

Die gemeinsame Arbeitsanleitung für alle Agents steht in **AGENTS.md**:
Dateizuständigkeiten, Foto-Sync, Branches, Tests und Integration in Fitness.

Die alte Beschreibung „dev-Push = Live-Deploy“ ist überholt: der aktive
`.github/workflows/deploy.yml` veröffentlicht einen 24h-Preview-Channel.
Production läuft über den freigegebenen `vitalos`-Release-Checkout. Vor einem
Push Build/Tests ausführen und danach den tatsächlichen CI-Ausgang prüfen.

## Runner (`SixPackPromiseCard.jsx` → `RunnerScreen`) — Anforderungen aus Gym-Tests

- 5s-Wechsel zwischen direkt aufeinanderfolgenden Übungen (`TRANSITION_SECONDS`).
- Start jeder Übung/Pause: hoher kurzer Piep, Ende: tiefer langer Tüt.
- Alle Sprachansagen **komplett Englisch** (en-US, User-Vorgabe 2026-10-16): Ansage mit Dauer ("Crunches" … "30 seconds", "Rest, 45 seconds"), "Switch sides" beim Seitenwechsel, "10 seconds left" 10 s vor Ende einer Übung; der
  5s-Wechsel selbst wird nicht angesagt.
- Screen darf während des Workouts nicht ausgehen (Screen Wake Lock).
- Musik anderer Apps darf nicht unterbrochen werden (iOS:
  `navigator.audioSession.type = 'ambient'`; Videos immer `muted`).

## Start-Intro, Musik, Finisher (User-Vorgaben 2026-10-16)

- **Start-Intro:** Beim ersten Start eines Workouts: "Welcome to 6Pack. Let's go." → "<Übung>[, left side]. Begin in" → "3, 2, 1" → langer Ton → dann läuft die Zeit.
  "left side" nur bei einseitigen Übungen (dieselbe Übung zweimal direkt hintereinander; die zweite Hälfte sagt weiter "Switch sides"). Tippen während des Intros bricht ab.
- **Musik darf nie pausieren** — weder beim Öffnen der App noch beim Übungsstart: `keepMusicPlaying()` setzt `navigator.audioSession.type = 'ambient'` schon beim Laden des Moduls, vor jedem Audio-Start und nach jeder Rückkehr in die App (iOS). Videos immer `muted`. Nichts Audio-Relevantes vor dem ersten Tap erzeugen.
- **6Pack-Session (2026-10-23):** Bleibt eine Kraft-Session (`sessionMode: 'strength'`, wie Calisthenics), aber ohne Sets/Reps/Weight: Übungen stehen schlank als `{ name, duration }` (Sekunden, `setsArray: []`); entscheidend ist die Dauer. Zusätzlich `activity` = Core HIIT (`type: 'hiit'`, `muscleTarget: 'core'`, `duration` = tatsächliche Workout-Länge in Minuten, min. 1; `coreHiitActivity()` in `SixPackApp.jsx`).
- **30-s-Ansage:** Bei 30 s Restzeit einer Übung (nur wenn sie länger als 30 s dauert) "30 seconds left"; bei 10 s weiter "10 seconds left". Beide bleiben reine Sprachansagen.


## Runner-Videos (2026-10-23)

- Loops starten automatisch (stumm, Loop): Datei-Videos per `autoPlay`+`play()`, Embeds mit `autoplay=1&loop=1`.
- Datei-Videos (https, nicht YouTube/Vimeo) werden von `videoCache.js` in Cache Storage `sixpack-videos-v1` geladen und als Blob-URL abgespielt. Cache-Name ohne SW-Präfix, damit der Shell-SW ihn nicht räumt. Embeds sind nicht cachebar.
- Videos stehen in `catalog/exercise-videos.yml` (ID = Katalog-ID); nur geprüfte, öffentliche Demos eintragen.

- **Update 2026-10-24:** Embeds (YouTube/Vimeo) starten NICHT mehr automatisch (kein `autoplay`/`loop`, kein `allow="autoplay"`): Verdacht, dass autoplay-Iframes auf iOS die Audio-Session an sich ziehen und damit Sprachansagen/Töne des Runners verstummen (seit `12c5e53`, 2026-10-23). Nicht auf Gerät verifiziert. Datei-Videos bleiben Autoplay-Loops. `beep()` weckt einen unterbrochenen AudioContext per `resume()` auf. Videos dürfen den Runner nie blockieren: kein Bulk-Vorladen, Cache nur für das aktuelle Video 5 s nach Laufbeginn.
- **Autostart (2026-10-24):** "Start Workout" startet Intro + Timer direkt (`autoStart`, Audio wird im Tap per `primeAudio()` freigeschaltet). Vimeo-Link von `bent_knee_windshield_wipers` deaktiviert (Einbettung gesperrt).
- **Runner-Bedienung (2026-10-29):** Keine manuelle Pause. Workout startet über "Start Workout"; "Wiederholen" setzt die aktuelle Übung zurück und läuft direkt weiter.
- **Töne (User-Vorgabe 2026-10-29):** Nur ein langer hoher Ton (1000 Hz, 0,8 s) beim Start einer Übung und ein langer tiefer Ton (700 Hz, 0,8 s) beim Ende einer Übung. Keine Töne bei 30/10-s-Ansagen oder Pausen.
- **Video-Cache (User-Vorgabe 2026-10-26, ersetzt "5 s nach Laufbeginn"):** Videos müssen vor dem Workout-Start im Cache liegen: das heutige Workout wird beim Öffnen der App, jedes geöffnete Tages-/Shuffle-/Favoriten-Workout sofort nacheinander im Hintergrund gecacht (`cacheVideos`, sequentiell, `workoutVideoSources()`); im Runner läuft kein Cache-Timer mehr (der Runner wird nie aufgehalten), fehlende Videos spielen direkt von der Quelle. YouTube/Vimeo-Embeds sind nicht cachebar.

- **Eigene Clips (2026-10-24):** `public/videos/<exercise_id>.mp4` ersetzt beim Build die Katalog-Demo (`catalogContent.mjs`, URL mit `?v=<Hash>`); `videoCache.js` cached same-origin-Clips wie https-Videos. Import/Status: `node scripts/own-clips.mjs` (Details: `docs/VIDEO_URLS.md`, Abschnitt „Eigene Clips“). Tag 1 = 6 Clips, noch keine geliefert.

- **Intro, Wechsel, Töne (User-Vorgabe 2026-10-24, ersetzt Start-Intro-Ablauf und "letzte 3 s Pieps"):**
  - Intro: "Welcome to Six Pack Promise." → 650 ms Pause → immer "Today's workout will require the following pieces of equipment"; danach entweder die Equipment-Liste oder nach einer weiteren Satzpause "No equipment required for this workout." → kurze Satzpause → Übungsansage in normalem Tempo plus "begin in" → 5, 4, 3, 2, 1 → Timer startet und unmittelbar danach der erste lange Startton. Kein vorgelagerter Countdown und kein zusätzliches "go".
  - 5s-Wechsel: Übungsansage in normalem Sprechtempo; nach Ende der Ansage volle 5 s mit 2, 1, "go". Die Ansage verlängert den Countdown nicht.
  - Keine Pieps in den letzten 3 s; Töne nur bei Start und Ende einer Übung. 30/10-s-Hinweise bleiben Sprachansagen ohne Ton.
  - Sprechname: Namen mit Ziffer/`/`/`"` nehmen den ersten sprechbaren Katalog-Alias (`spokenName` aus `build-data.mjs`, z. B. "90/90 Crunch" → "Ninety Ninety Crunch"); "ISO" wird als "I-S-O" buchstabiert. Nicht auf Gerät gehört.
  - Seitenwechsel (dieselbe Übung direkt nochmal, User-Vorgabe 2026-10-24): statt Name + Dauer nur "Switch sides, begin in 2, 1, go".

## Offline-first (User-Vorgabe 2026-10-26)

- Die App muss ohne Netz vollständig laufen: Shell + gehashte Assets werden vom generierten `sw.js` vorab gecacht (`pnpm build` stempelt ihn; `npx vite build` allein erzeugt keinen SW). Programm/Favoriten liegen in localStorage, Workouts gehen über die Outbox, Firestore hat Persistent Cache. Videos vorab in `sixpack-videos-v1` (siehe Video-Cache).
- Navigation: Netz zuerst, aber nur `navTimeoutMs` = 400 (`mini-app.json`), danach Cache. Updates kommen trotzdem an: der Browser prüft `sw.js` selbst, der neue SW precacht die Shell. Splash: `minMs` 0, Update-Fenster 800 ms. Keine künstlichen Wartezeiten beim Start einbauen.
- Runner-Video: Cache zuerst — solange die Cache-Abfrage läuft, ist keine Quelle gesetzt; gecachte Dateien gehen nie ans Netz.
- Neue Funktionen dürfen nie auf eine Netzantwort warten, bevor der Runner/Start bedienbar ist; Netzfehler still abfangen.
- Updates (User-Vorgabe 2026-10-26): wie die anderen Apps erst im Nachhinein melden — `mini-app.json` `register: { expose: true }` feuert `sw-update-available`, `UpdateBanner` in `main.jsx` zeigt "Update verfügbar · Neu laden". Kein Auto-Reload: `register.reloadWindowMs: 0` in `mini-app.json` (Option im Paket `~/vitalos/packages/mini-app-shell` ergänzt, hier nur `stamp.mjs` vendored; die übrige Vendor-Drift wurde bewusst nicht übernommen).
