# Übungsdetails und Videos

Vor „Start Workout“ öffnet ein Tipp auf eine Übung deren Detailansicht. Das gilt
für Tages-Workouts, Shuffle und gespeicherte Workouts sowie die Learn-Liste.
Zurück/Escape führt zur vorherigen Liste; Shuffle wird dabei nicht neu gewürfelt.
Die Ansicht zeigt Haupt-/Nebenmuskeln, Körpergrafik, deutsche Ausführungshinweise,
häufige Fehler und einen Video-Player. Pausen bleiben einfache Listeneinträge.

## Gemeinsame Datenquelle

`catalog/exercise-videos.yml` ordnet öffentliche Autor-Demos nach Übungs-ID zu.
`catalogContent.mjs` wird von beiden Generatoren verwendet; keine zweite
Video-Zuordnung in Fitness pflegen. Ein explizites `video_url` am KB-Eintrag hat
Vorrang. Stand 2026-10-17: 20 von 21 Übungen haben eine Demo. Für
`any_ball_btb_pass` fehlt eine verlässlich passende öffentliche Demo; die UI
meldet das und bietet eine Videosuche. Keine fremde Übung als Ersatz zuordnen.
Bei Iso Reverse Crunches zeigt die Demo die Grundbewegung; die Haltephase steht
in der Anleitung. Videos sind externe Einbettungen/Dateien, keine offline
mitgelieferten Clips. Verfügbarkeit und Einbettbarkeit können sich ändern.

Muskel-IDs und `viz.body_muscles` kommen aus der Fitness-KB. Standalone verwendet
die sechs benötigten Snapshots in `catalog/muscles/`; Fitness liest direkt aus
`fitness/catalog/kb/muscles/`. Nach KB-Änderungen Snapshots aktualisieren.
`muscleGeometry.js` enthält unveränderte Geometrie aus body-muscles 1.0.0;
Lizenz und NOTICE liegen unter `public/licenses/`. Die Farbzuordnung kommt aus
den KB-Regionen. Tief liegende Muskeln werden über ihrer Körperregion markiert.

## Eigene Videos

Im Runner unter „Video-URL für …“ eine HTTPS-Datei, YouTube- oder Vimeo-Adresse
eintragen. Diese gerätelokale Vorgabe unter `fitness-sixpack-video-urls-v1`
überschreibt auch die Vorschau. Ein leerer Eintrag blendet das Katalogvideo aus.
Dateien starten im Runner stumm in Schleife; eingebettete Videos und die
Vorschau starten per Play. Zum Zurücksetzen alle lokalen Vorgaben mit
`localStorage.removeItem('fitness-sixpack-video-urls-v1')` löschen und neu laden.

Dauerhafte Dateien können über `video_url` innerhalb des Übungseintrags
hinterlegt werden. Relative Pfade wie `./videos/jackknifes.mp4` erhalten den
Mount-Prefix. HTTPS, relative und Site-Wurzel-Pfade werden unterstützt;
`http:`, `file:`, `data:` und Protokoll-relative URLs werden abgewiesen.
Nach Datenänderungen `node build-data.mjs` und
`node scripts/test-exercise-details.mjs` ausführen; generierte JS-Dateien nicht
manuell ändern. Fitness verwendet `scripts/build-sixpack-data.mjs`.
`publish-fitness.mjs` ist kein vollständiger Integrationsweg: das direkte
6pack-Submodule aktualisieren und den Fitness-Gitlink committen.

## Prüfung

Regressionstests prüfen Listen-Navigation, Rückkehr, unveränderten Shuffle,
expliziten Workout-Start, KB-Muskelregionen, Anleitungen, Medienarten und
fehlende/fehlerhafte Medien. Ein Build beweist keine Wiedergabe auf dem Handy;
ein realer Gerätecheck der neuen Detailansicht steht noch aus.
