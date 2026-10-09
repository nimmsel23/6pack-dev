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
- Ansage mit Dauer ("Crunches" … "30 Sekunden", "Pause, 45 Sekunden"); der
  5s-Wechsel selbst wird nicht angesagt.
- Screen darf während des Workouts nicht ausgehen (Screen Wake Lock).
- Musik anderer Apps darf nicht unterbrochen werden (iOS:
  `navigator.audioSession.type = 'ambient'`; Videos immer `muted`).
