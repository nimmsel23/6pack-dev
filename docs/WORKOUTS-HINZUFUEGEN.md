# Neue 6Pack-Workouts hinzufügen

Die Datenquelle ist `catalog/6pack/`. Keine zweite UI oder manuell gepflegte JS-Workoutliste anlegen.

1. Originalbilder lesen und App-Tag, Namen, Reihenfolge, jede Dauer, Pausen und angezeigte Gesamtdauer transkribieren. Bei mehreren Screenshots desselben Tages Überlappungen über die gesamte Blockfolge abgleichen und nur einmal übernehmen; echte doppelte Blöcke erhalten. Seiten nur benennen, wenn die Quelle sie belegt. Fehlende Tage nicht erfinden.
2. Vorhandene Übungs-IDs über `rg 'name:|aliases:' catalog/6pack` zuordnen. Neue Übungen als eigene YAML-Datei nach dem Katalogformat anlegen (stabile `id` und `exercise_id`, Name, Equipment, Tags, Anatomie und Coaching). Ungeprüfte Technik als `review_state.status: needs_review` kennzeichnen. Keine ähnliche Übung als Ersatz verwenden, nur weil ein Video fehlt. Nur verifizierte Videos verknüpfen.
3. `catalog/6pack/weekN_workouts.yml` anlegen oder vorhandenen vorläufigen Stand ersetzen. `source: user_screenshots`, Herkunft/Datum und App-Tage in `notes` dokumentieren. Wocheninterne Tage 1–7: App-Tag = `(N - 1) * 7 + Tag`. `rest_days` explizit aufführen. Bei unvollständigen Quellen fehlende Trainingstage explizit unter `unverified_days` aufführen (kein Ruhetag). Nur vollständige Tage unter `verified_days` aufnehmen. Sichtbare Teile unvollständiger Tage mit Quellsumme und Restdifferenz unter `catalog/workout-imports/` sichern; diese werden nicht gebaut. Unleserliche Dauern bestätigen lassen.

```yaml
program_id: sixpack_promise_week4
name: 6 Pack Promise Week 4
source: user_screenshots
verified_days:
  1: # App-Tag 22; weitere belegte Tage ergänzen
    total_seconds: 60
    items:
    - type: exercise
      exercise_id: heels_to_the_heavens
      duration_seconds: 30
    - type: rest
      duration_seconds: 30
# rest_days aus der belegten Wochenstruktur ergänzen, nicht aus diesem Beispiel ableiten.
```

4. Gesamtdauer = Summe aller abgebildeten Blöcke inklusive Pausen. Intro und zusätzliche Runner-Wechsel zählen nicht zur Quellsumme. Widersprüche zur angezeigten Summe vor Übernahme klären. Der Generator prüft IDs, positive ganzzahlige Dauern, Blocktypen, Summen und vollständige, konfliktfreie Wochentage (`scripts/workout-validation.mjs`).
5. In `scripts/test-exercise-details.mjs` die erwartete Folge direkt gegen die Bilder festhalten, unabhängig von der YAML-Datei. So fallen auch versehentliche Umordnungen und Ersetzungen auf.
6. Prüfen:

```sh
node build-data.mjs
node --test scripts/test-workout-validation.mjs
node scripts/test-exercise-details.mjs
./scripts/pnpm-cloud.sh run build
./scripts/pnpm-cloud.sh run vendor:check
```

7. Im Tagesbild Reihenfolge, Equipment, Details und Runner prüfen; fehlende Video-/Technikprüfung offen dokumentieren. `TODO.md` und `RESULTS.md` aktualisieren und nur aufgabenbezogene Dateien committen. Generierte Datei nicht manuell bearbeiten. Push und Veröffentlichung nach `AGENTS.md` und Session-Freigabe; Fitness-Gitlink und Shell-Pin sind eigene Integrationsschritte.
