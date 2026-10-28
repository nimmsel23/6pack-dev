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
- **30-s-Warnton:** Bei 30 s Restzeit einer Übung (nur wenn sie länger als 30 s dauert): kurzer Ton (660 Hz) + "30 seconds left"; bei 10 s weiter "10 seconds left".


## Runner-Videos (2026-10-23)

- Loops starten automatisch (stumm, Loop): Datei-Videos per `autoPlay`+`play()`, Embeds mit `autoplay=1&loop=1`.
- Datei-Videos (https, nicht YouTube/Vimeo) werden von `videoCache.js` in Cache Storage `sixpack-videos-v1` geladen und als Blob-URL abgespielt. Cache-Name ohne SW-Präfix, damit der Shell-SW ihn nicht räumt. Embeds sind nicht cachebar.
- Videos stehen in `catalog/exercise-videos.yml` (ID = Katalog-ID); nur geprüfte, öffentliche Demos eintragen.

- **Update 2026-10-24:** Embeds (YouTube/Vimeo) starten NICHT mehr automatisch (kein `autoplay`/`loop`, kein `allow="autoplay"`): Verdacht, dass autoplay-Iframes auf iOS die Audio-Session an sich ziehen und damit Sprachansagen/Töne des Runners verstummen (seit `12c5e53`, 2026-10-23). Nicht auf Gerät verifiziert. Datei-Videos bleiben Autoplay-Loops. `beep()` weckt einen unterbrochenen AudioContext per `resume()` auf. Videos dürfen den Runner nie blockieren: kein Bulk-Vorladen, Cache nur für das aktuelle Video 5 s nach Laufbeginn.
- **Autostart (2026-10-24):** "Start Workout" startet Intro + Timer direkt (`autoStart`, Audio wird im Tap per `primeAudio()` freigeschaltet). Vimeo-Link von `bent_knee_windshield_wipers` deaktiviert (Einbettung gesperrt).
- **Töne = Gym-Timer (User-Vorgabe 2026-10-24, ersetzt "hoher Piep / tiefer Tüt"):** Rechteckwelle; letzte 3 s jeder Übung/Pause/Wechsel kurze Pieps (1000 Hz, 0,12 s); an jeder Grenze ein langer Ton (0,8 s): hoch (1000 Hz) beim Start einer Übung/Pause, tiefer (700 Hz) beim Wechsel/Ende; 30-s-Warnung = Doppel-Piep + Ansage. Nicht auf Gerät gehört.
- **Video-Cache (User-Vorgabe 2026-10-26, ersetzt "5 s nach Laufbeginn"):** Videos müssen vor dem Workout-Start im Cache liegen: das heutige Workout wird beim Öffnen der App, jedes geöffnete Tages-/Shuffle-/Favoriten-Workout sofort nacheinander im Hintergrund gecacht (`cacheVideos`, sequentiell, `workoutVideoSources()`); im Runner läuft kein Cache-Timer mehr (der Runner wird nie aufgehalten), fehlende Videos spielen direkt von der Quelle. YouTube/Vimeo-Embeds sind nicht cachebar.

- **Eigene Clips (2026-10-24):** `public/videos/<exercise_id>.mp4` ersetzt beim Build die Katalog-Demo (`catalogContent.mjs`, URL mit `?v=<Hash>`); `videoCache.js` cached same-origin-Clips wie https-Videos. Import/Status: `node scripts/own-clips.mjs` (Details: `docs/VIDEO_URLS.md`, Abschnitt „Eigene Clips“). Tag 1 = 6 Clips, noch keine geliefert.

- **Intro, Wechsel, Töne (User-Vorgabe 2026-10-24, ersetzt Start-Intro-Ablauf und "letzte 3 s Pieps"):**
  - Intro (Equipment, User-Vorgabe 2026-10-26): "Welcome to Six Pack Promise. Today's workout will require the following pieces of equipment: <z. B. a tennis ball>" bzw. "…Promise. no equipment required for this workout" (`equipmentSpeech()` liest `equipment` der Katalog-Übungen, `bodyweight` zählt nicht; Namen in `SPOKEN_EQUIPMENT`) → 5, 4, 3, 2, 1 → langer Ton → "<Übung>[, left side] for 30 seconds, begin in" → 2, 1, "go" + langer Ton → Zeit läuft (zweiter Teil = 5 s wie ein Wechsel).
  - 5s-Wechsel: dieselbe Abfolge für die nächste Übung; Ansage per Sprechtempo (`LEAD_IN_SPEECH_SECONDS`) vor dem "2" fertig, "2"/"1" bei Restzeit 2/1, "go" beim Start. Der Wechsel wird nie verlängert.
  - Keine Pieps in den letzten 3 s mehr; nur der lange Ton bei Zeitende (`endBeep`) und beim Start (`startBeep`). 30-s-Warnung bleibt.
  - Sprechname: Namen mit Ziffer/`/`/`"` nehmen den ersten sprechbaren Katalog-Alias (`spokenName` aus `build-data.mjs`, z. B. "90/90 Crunch" → "Ninety Ninety Crunch"); "ISO" wird als "I-S-O" buchstabiert. Nicht auf Gerät gehört.
  - Seitenwechsel (dieselbe Übung direkt nochmal, User-Vorgabe 2026-10-24): statt Name + Dauer nur "Switch sides, begin in 2, 1, go".

## Offline-first (User-Vorgabe 2026-10-26)

- Die App muss ohne Netz vollständig laufen: Shell + gehashte Assets werden vom generierten `sw.js` vorab gecacht (`pnpm build` stempelt ihn; `npx vite build` allein erzeugt keinen SW). Programm/Favoriten liegen in localStorage, Workouts gehen über die Outbox, Firestore hat Persistent Cache. Videos vorab in `sixpack-videos-v1` (siehe Video-Cache).
- Navigation: Netz zuerst, aber nur `navTimeoutMs` = 1500 (`mini-app.json`), danach Cache. Nicht kleiner stellen: kommt die Netzantwort nach dem Timeout, speichert der SW sie nicht, Updates kämen sonst nie an.
- Neue Funktionen dürfen nie auf eine Netzantwort warten, bevor der Runner/Start bedienbar ist; Netzfehler still abfangen.

## Gym-Test 2026-10-28 (User-Vorgabe, ersetzt Intro-/Wechsel-Details oben)

- **Intro ohne 5-4-3-2-1:** "Welcome to Six Pack Promise. <Equipment>" → langer Ton → "<Übung>[, left side] for 30 seconds, begin in" → 2, 1, go (`INTRO_LEAD_IN_SECONDS` = 7 s). Vorher gab es zwei Countdowns hintereinander (Ansage wirkte doppelt und dauerte zu lang).
- **5s-Wechsel ohne Beschleunigung:** Ansage immer im normalen Sprechtempo (kein `rate` > 1 mehr); im Wechsel wird "for N seconds" nur gesagt, wenn die Dauer der nächsten Übung von der aktuellen abweicht. Der Wechsel bleibt genau 5 s.
- **Abschluss:** Auf dem "Workout fertig"-Screen öffnet "Selfie aufnehmen" direkt die Kamera (`<input capture="user">` im Tap); das Foto geht als `initialFiles` an `SelfiesGallery` (Cloud-Sync wie gehabt, vorher Login falls nötig). Nicht auf Gerät getestet.
- **Musik/Sprache auf iOS (User-Vorgabe 2026-10-28):** `speechSynthesis` pausiert Spotify bei jeder Ansage (auch mit `audioSession = 'ambient'`). **Update 2026-10-28 (User: "lieber keine Musik als keine Sprachansagen"):** Standard ist wieder Sprache an, auch auf iOS; der Schalter bleibt für "nur Pieptöne". Ohne Sprache gilt: nur Pieptöne (kein Piep im 5s-Wechsel; bei 10 s Rest nur die Ansage, nie ein Piep; langer Ton bei Start/Ende); Schalter "Sprachansagen" im Settings-Tab (`speechOn()`, localStorage `sixpack-speech`). Sprache auf Android/Desktop unverändert. Eigentliche Lösung = vorgefertigte Audio-Clips (siehe TODO.md). Nicht auf Gerät getestet.
- **Musik-Modus (Sprache aus, User-Vorgabe 2026-10-28, ersetzt die Piep-Angaben im iOS-Absatz oben):** Statt Ansagen nur Töne: Start einer Übung langer hoher Tüt (1000 Hz), Ende/Wechsel langer tiefer Tüt (700 Hz), im 5s-Wechsel kurzer Piep bei 2 und 1, 30 s Rest Doppel-Piep, 10 s Rest dreifacher Piep. Mit Sprache an gibt es bei 2/1/10 s nur die Ansage, keinen Piep.
