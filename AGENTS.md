# 6Pack — Arbeitsanleitung für Agents

## Zuständigkeit und Checkouts

Dieses Repo ist die Source of Truth für die gemeinsame 6Pack-Oberfläche.
Der Code liegt überwiegend im Repo-Root; es gibt keinen `src/`-Ordner.

| Checkout | Rolle |
| --- | --- |
| `~/6pack-dev`, Branch `dev` | Standalone-Entwicklung und gemeinsame UI |
| `~/fitness-dev/6pack`, Branch `fitness` | Direkt importiertes Git-Submodule für den Fitness-Build |
| `~/fitness-dev/.worktrees/antigravity` | Fitness-Arbeitsbaum; dessen `.agents/AGENTS.md` beachten |
| `~/vitalos/6pack-app`, Branch `vitalos` | Separater Production-Release-Checkout |

Vor Änderungen `git status -sb`, `git worktree list`, Branches und Gitlinks prüfen.
Vorhandene Arbeitsstände lesen, bevor ein weiterer Branch oder Worktree entsteht.
Die früheren Photo-Auth-/Local-Sync-/Cloud-Sync-Arbeiten wurden am 2026-10-17
zusammengeführt. Sie sind keine parallel weiterzuentwickelnden Lösungen.
Fremde Änderungen und persönliche Daten erhalten.

## Wo gehört eine Änderung hin?

| Datei/Bereich | Aufgabe |
| --- | --- |
| `main.jsx` | Standalone-Einstieg und Login-/Workout-Sync-Anzeige |
| `SixPackPromiseCard.jsx` | Stabiler Export-Einstieg für Fitness; kein zweiter App-Code |
| `SixPackApp.jsx` | Screens, Programm, Workout-Runner, Audio und Navigation |
| `SelfiesScreen.jsx` | Login und Account-Grenze der Foto-Oberfläche |
| `photoAuth.js` | Bestehenden Firebase-Login nutzen; Google/E-Mail, Logout |
| `SelfiesGallery.jsx` | Kamera, Mehrfachauswahl, Offline-Queue und expliziter Altbestand-Import |
| `PrivatePhoto.jsx` | Geschützter Bildabruf, Blob-URL und deren Aufräumen |
| `selfieCloud.js` | Normaler Foto-Sync nach Firestore und JPEG-Aufbereitung |
| `photoClient.mjs` | Authentifizierter Import vorhandener Server-Fotos; kein normaler Sync-Transport |
| `standaloneSync.js`, `workoutDoc.js` | Workout-Outbox und gemeinsames Session-Format |
| `firebaseConfig.js` | Gemeinsame öffentliche Firebase-Web-Konfiguration; keine Admin-Zugangsdaten |
| `catalog/`, `build-data.mjs` | Datenquelle und Generator für die Standalone-App |
| `sixpack.css`, `styles.css` | Gemeinsames Theme bzw. Standalone-Styles |
| `mini-app.json` | Splash-/Service-Worker-Konfiguration |

Fitness importiert dieses Submodule direkt. Keine zweite UI-Kopie anlegen.
`publish-fitness.mjs` kopiert nur drei alte Einstieg-/Style-Dateien und ist
**kein vollständiger Integrationsweg** für die heutige App.

## Finaler Foto-Sync-Vertrag

- Ein Login, eine Galerie, ein normales Speicherziel: Firebase Auth + Firestore.
- Pfad: `sixpackSelfies/{uid}/photos/{photoId}` im Projekt `fitness-aos`.
  Nur der Eigentümer hat Zugriff; Coach-Rechte erlauben keine fremden Selfies.
- Die Firebase-Instanz des Hosts wiederverwenden. Kein zweites Firebase-Projekt,
  keine zusätzliche Login-Instanz. `local` und UID-Header sind keine Anmeldung.
- ID-Token nur als Bearer-Header, nie in Bild-URLs. Konto-Wechsel muss Galerie
  und laufenden Sync des vorherigen Kontos beenden. Keine privaten Bilder im SW-Cache.
- JPEG-Sync-Kopie: längste Kante höchstens 1600 px, Data-URL höchstens 700000 Zeichen.
  Originale bleiben erhalten. Nicht decodierbare HEIC-Dateien als Fehler melden.
- Vor Upload in `fitness-sixpack-selfies-pending-v2:<uid>` sichern; erst nach
  Cloud-Bestätigung entfernen. Stabile IDs für Wiederholungen verwenden.
  Speicher-/Auth-/Netzfehler dürfen keinen falschen Speichererfolg anzeigen.
- Der normale Sync benötigt weder Laptop, Funnel noch einen eigenen Foto-Dienst.
  Kein stiller Fallback auf die lokale API.
- Server-Altbestand nur explizit und mit demselben angemeldeten Konto importieren.
  Datum erhalten, stabile Import-IDs verwenden, Originale nicht löschen.
  Unzugeordnete `local`-/v1-Daten nicht automatisch einem Konto zuordnen.

Die geschützte Archiv-API gehört zu Fitness Python:
`fitness/api/routers/sixpack_photos.py`, Routen `api/sixpack/photos` und
`api/sixpack-photos/{uid}/{filename}`. Node verwendet ausschließlich seinen
allgemeinen `/api/*`-Proxy. Keine eigenen Node-Fotorouten oder Pfadumschreibungen.

Firestore-Rules/Indexes haben ihre einzige deploybare Source of Truth in
`~/vitalos/firestore.rules` und `~/vitalos/firestore.indexes.json`.
Neue Rules vor einem davon abhängigen Client veröffentlichen; der erlaubte
Production-Weg ist VitalOS-CI (`deploy-firestore-rules.yml`), kein direkter Agent-Deploy.

## Build, Tests und generierte Dateien

Paketmanager: **pnpm**, Version aus `package.json`.

```sh
node scripts/test-selfie-cloud.mjs
pnpm run build
pnpm run vendor:check
```

Bei Auth-/Rules-Änderungen zusätzlich `scripts/test-selfie-emulator.mjs` gegen
isoliertes Projekt `demo-sixpack` und einen lokalen Firestore-Emulator ausführen;
die echten VitalOS-Rules laden. Keine persönlichen Fotos für Tests verwenden.
Bei Fitness-Integration zusätzlich die Galerie-/API-Tests und beide Fitness-
Build-Modi prüfen; Details in `~/fitness-dev/docs/6pack-integration.md`.

`sixpackData.generated.js` wird erzeugt, nicht manuell editiert. Fitness erzeugt
seine Daten mit `scripts/build-sixpack-data.mjs` aus der eigenen KB.
`dist/` und `node_modules/` sind keine Source-Dateien.

`scripts/mini-app-shell/` ist vendored. Änderungen zuerst in
`~/vitalos/packages/mini-app-shell` machen, dann mit dessen CLI aktualisieren.
Vite-`base` bleibt `./`; API-Aufrufe bleiben relativ. Interaktive/lang laufende
Dev-Prozesse über `aos-kitty-launch` starten.

## Git, Integration und Veröffentlichung

- Aufgaben in `TODO.md`, Ergebnisse mit Datum in `RESULTS.md` festhalten.
- Abgeschlossene Änderungen scoped committen; Push-/Merge-Freigabe der Session beachten.
- Bei freigegebenem Push: `dev` veröffentlichen, anschließend den Stand im
  `fitness`-Integrationsbranch übernehmen und **vor** dem Fitness-Gitlink pushen.
  Dann den Fitness-Gitlink scoped committen und in `fitness-dev/dev` integrieren.
  Divergierende Branches prüfen; kein Reset oder Force-Push als Abkürzung.
- `6pack/dev` erzeugt aktuell einen **24h-Preview-Channel**, keinen Production-Release.
  Maßgeblich ist `.github/workflows/deploy.yml`, nicht alte Log-/Kommentartexte.
- Fitness-`dev`-Push baut lokal und aktualisiert bei Backend-Änderungen Staging
  (`fitness-preview.service`, Port 8100); außerdem gibt es Fitness-Preview-CI.
- Production über den ausdrücklich freigegebenen VOS-Release-Workflow.
  Kein automatischer Merge nach `vitalos`, kein Meta-Repo-Push als Nebenwirkung.
- Nach Push/Deploy tatsächlichen CI-Ausgang und relevante HTTP-Routen prüfen.
  Build-Erfolg ersetzt keinen angemeldeten Geräte-/Kamera-Test.

Runner-Anforderungen (englische Ansagen, Intro, 30s/10s-Cues, Wake Lock,
Musik-Mischung und Finisher) stehen ergänzend in `CLAUDE.md` und bleiben erhalten.
