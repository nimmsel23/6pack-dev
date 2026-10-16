# CLAUDE.md — 6pack-dev

## Arbeitsregeln (vom User festgelegt)

- **Alles immer committen und pushen** (Branch `dev`), ohne nachzufragen —
  jede abgeschlossene Änderung sofort.
- **Push auf `dev` = Live-Deploy** nach https://vos-6pack.web.app (GitHub
  Action `.github/workflows/deploy.yml`, vom User so gewünscht). Deshalb vor
  jedem Push `npm run build` laufen lassen — ein roter Build blockiert den
  Deploy. Nach dem Push den Action-Lauf prüfen.
  **Stand:** Workflow liegt noch unter `ci/deploy.yml` — Cloud-Sessions dürfen
  nichts unter `.github/workflows/` pushen (fehlender `workflow`-Scope). Der
  User muss ihn einmal lokal nach `.github/workflows/deploy.yml` verschieben
  und pushen; bis dahin deployt ein Push noch nichts.
- Lokaler `.githooks/pre-push` = nur Build-Check (aktiv nach
  `git config core.hooksPath .githooks`), kein Deploy.

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
- **Activity Finisher:** Nach jedem abgeschlossenen Workout wird automatisch `Core HIIT` (5 min, `FINISHER_MINUTES` in `SixPackApp.jsx`) als `activity` im Session-Dokument mitgeloggt (Fitness-Activity-Format `type: 'hiit'`, `muscleTarget: 'core'`); `workoutDoc.js::buildWorkoutDoc` nimmt dafür ein optionales `activity`.
- **30-s-Warnton:** Bei 30 s Restzeit einer Übung (nur wenn sie länger als 30 s dauert): kurzer Ton (660 Hz) + "30 seconds left"; bei 10 s weiter "10 seconds left".

