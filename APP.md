# 6Pack App

## In-App-Update-Changelog

Beim ersten Start und nach einer neuen Release-ID erscheint der gemeinsame
VitalOS-Changelog mit Commit-Texten, GitHub-Links und der gesamten Historie.
„Weiter“ oder Escape bestätigt die Version in `sixpack:seen-release`; der
bisherige Schlüssel bleibt erhalten. Die Bestätigung wird erst beim Schließen
gespeichert. Der Dialog hält den Tastaturfokus und funktioniert ohne Tailwind.

Quelle: `~/vitalos/packages/mini-app-shell/vos-changelog-screen.mjs`.
Die vorhandene vendorte Shell unter `scripts/mini-app-shell/` enthält Screen,
Git-Metadaten und Vite-Plugin. Änderungen dort zuerst in VitalOS vornehmen
und über `node ~/vitalos/packages/mini-app-shell/cli.mjs vendor scripts/mini-app-shell`
übernehmen; `pnpm run vendor:check` prüft die Kopie.

Der Vite-Plugin erzeugt die Daten in jedem Build und bindet sie direkt in den
App-Stand ein. Zusätzlich entsteht `release-info.json`. Passende GitHub-Push-
Events liefern die Commit-Liste, sonst die letzten zehn Nicht-Merge-Commits
des App-Repos. Parent-CI-Metadaten werden nicht mit App-Releases vermischt.
Der ältere `scripts/write-release-info.mjs` bleibt als Kompatibilitätsaufruf
verfügbar und verwendet dieselbe gemeinsame Metadaten-Funktion.

## Änderungen

- 2026-10-21: Pilot-Dialog durch den gemeinsamen VitalOS-Changelog ersetzt.
