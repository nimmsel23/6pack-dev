# CLAUDE.md — 6pack-dev

## Arbeitsregeln (vom User festgelegt)

- **Alles immer committen und pushen** (Branch `dev`), ohne nachzufragen —
  jede abgeschlossene Änderung sofort. Ein Push nach `dev` deployt nichts;
  Deploy (`npm run deploy`) weiterhin nur nach expliziter Bestätigung.

## Runner (`SixPackPromiseCard.jsx` → `RunnerScreen`) — Anforderungen aus Gym-Tests

- 5s-Wechsel zwischen direkt aufeinanderfolgenden Übungen (`TRANSITION_SECONDS`).
- Start jeder Übung/Pause: hoher kurzer Piep, Ende: tiefer langer Tüt.
- Ansage mit Dauer ("Crunches" … "30 Sekunden", "Pause, 45 Sekunden"); der
  5s-Wechsel selbst wird nicht angesagt.
- Screen darf während des Workouts nicht ausgehen (Screen Wake Lock).
- Musik anderer Apps darf nicht unterbrochen werden (iOS:
  `navigator.audioSession.type = 'ambient'`; Videos immer `muted`).
