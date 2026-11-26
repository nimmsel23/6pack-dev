# Skills in der gemeinsamen 6Pack-Codebasis

Stand: 2026-11-26. Übernommen aus skills-dev/dev, Commit 72649c10.
Der dortige uncommittete Stand von scripts/portal.mjs wurde nicht übernommen.

## Zuständigkeit

Skills-Produktcode liegt ab jetzt hier unter skills/. Neue Skills-Funktionen
werden in 6pack-dev/dev entwickelt. Der Root bleibt der bestehende 6Pack-Code.
Die Quellmigration erhält die Skills-Datenmodelle, IndexedDB-Schlüssel,
Firestore-Pfade, Übungsnamen, Designs und Runner. Es werden keine Nutzerdaten
kopiert, migriert oder gelöscht. Rules-Fragmente sind Referenz/Testquellen;
die deploybaren Rules bleiben zentral in VitalOS.

## Einstieg und Builds

- `CoreSkills.jsx` im Repo-Root exportiert die vollständige Core-Skills-App und
  `SkillsEmbed`. Der Host kann diese Dateien direkt aus einem Submodul importieren.
- `embed.jsx` im Root bleibt der bisherige `SixPackEmbed`-Vertrag.
- `skills/embed.jsx` bleibt der reine Skills-Einstieg für Hosts mit eigener Navigation.
- `pnpm run build` erzeugt weiterhin Standalone-6Pack in dist/.
- `pnpm run build:skills` erzeugt Core Skills in dist-skills/.
- `pnpm run dev:skills` startet den Skills-Einstieg; keine zweite Repo-Abhängigkeit.
- `pnpm run test:skills` führt die bisherigen Skills-Standardregressionen aus.

React und Firebase werden gemeinsam aufgelöst; die Skills-Imports zu 6Pack
sind relative Imports und benötigen keinen Alias des Hosts.
Skills verwendet weiterhin skillsUsers/{uid}/events und seine bestehenden
lokalen Speicher. 6Pack behält seinen Speichervertrag.

## Video

Die 6Pack-Seite von Core Skills nutzt den vorhandenen gemeinsamen Upload und
Clip-Editor (siehe ../VIDEOUPLOAD.md). Die Skills-Progressionen verwenden noch
ihren bisherigen Demo-/Tutorial-Player. Das Zusammenlegen führt nicht automatisch
eigene Videos in Skills ein: dafür fehlen noch die ausdrückliche Zuordnung von
Skills-Stufen zu stabilen Video-IDs und der Anschluss an den gemeinsamen Upload.
Keine Zuordnung allein nach ähnlichen Namen ergänzen.

## Downstream und Umstellung

skills-dev bleibt vorerst als Kompatibilitäts-/Release-Einstieg erhalten; sein
CoreSkills-Einstieg verweist auf die gemeinsame Implementierung. Keine neuen
Produktfunktionen in den alten Skills-Dateien entwickeln.
Fitness kann später diese gemeinsame Quelle als ein Submodul verwenden oder
über einen dokumentierten Upstream/Downstream-Weg übernehmen. Seine bestehenden
Callbacks für Workout-Abschluss, Programm, Navigation und Host-Auth bleiben der
Integrationsvertrag. Diese Migration ändert keine Fitness-Gitlinks.

VitalOS-Hosts, die noch direkt skills-app/SkillsEmbed, PersistenceStatus oder
Design-Dateien importieren, müssen zusammen mit einem passenden 6pack-app-Pin
auf 6pack-app/skills/... umgestellt werden. Der separate skills-app-Pointer darf
erst nach Prüfung aller Verbraucher entfernt werden. Kein Repo wird hier gelöscht.

## Prüfung

Check-CI prüft beide Builds sowie Skills- und 6Pack-Regressionen.
Builds ersetzen keine angemeldete Browser-/iPhone-Abnahme. Die zusätzliche,
bisher nicht im Skills-Standardtest enthaltene embed.test.mjs hängt lokal nach
dem ersten Test; sie wurde deshalb nicht neu zum Standardtest hinzugefügt.
Die bestehenden CoreSkills-Callback-Tests sind Bestandteil des Standardtests.

## Fitness-Host-Vertrag (2026-11-26)

CoreSkills akzeptiert optional uid, onWorkoutComplete und onClose vom Host.
Die Host-UID hat Vorrang vor der Standalone-Anzeige; beide Trainingsbereiche
melden Abschlüsse über denselben Host-Callback. Fehler werden unverändert an
den Runner weitergegeben. Ohne Host-Callback bleibt der Standalone-Speicherweg.
Ein übergebenes onClose zeigt die Rückkehr zu Fitness an.
