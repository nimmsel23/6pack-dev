# Übungsvideos hochladen

Stand: 2026-11-26, Implementierung ab `cd6ed992`.

Ein Trainingsvideo kann als Quelle für mehrere Übungsclips dienen. Geschnitten
wird auf dem Gerät. Erst nach ausdrücklicher Bestätigung wird der erzeugte,
stumme MP4-Clip zu Firebase hochgeladen. Das Original bleibt lokal.

## Bedienung

1. Anmelden und die gewünschte Übung öffnen.
2. **Mit Kamera aufnehmen**, **Aus Galerie** oder **Aus Dateien wählen**.
3. Im Vollbild-Editor Anfang und Ende über die Griffe oder die Sekundenfelder
   festlegen. Die angezeigte Übung ist das Ziel des Uploads.
4. Mit **Clip abspielen** den gewählten Bereich stumm ansehen.
5. Mit **Hochladen** die Verarbeitung und anschließend den Upload bestätigen.
   Erst nach bestätigtem Erfolg erscheint „Video ist dieser Übung zugeordnet“.
6. Für den nächsten Clip den Editor verlassen, eine andere Übung öffnen und
   **Weiteren Clip schneiden** wählen. Die Quelldatei muss nicht erneut gewählt
   werden. Jeder Clip wird einzeln zugeordnet und bestätigt.

Die Quelle bleibt als Datei im App-Sitzungsspeicher. **Quelldatei freigeben**,
Kontowechsel oder Neuladen/Schließen der App geben sie frei. Es gibt keine
persistente Clip-Warteschlange und keine automatische Zerlegung eines Trainings.
Abbrechen im Editor beendet die aktuelle Auswahl; die wiederverwendbare Quelle
bleibt erhalten. Während eines Uploads bricht Abbrechen den Upload ab.

## Grenzen und Formate

| Bereich | Grenze oder Verhalten |
| --- | --- |
| Quelldatei | Höchstens 1 GiB (1.073.741.824 Bytes); darf länger als 60 Sekunden sein |
| Erzeugter Clip | Höchstens 60 Sekunden und 100 MiB (104.857.600 Bytes) |
| Auswahl | Normalerweise mindestens 0,5 Sekunden; kürzere Gesamtdateien sind möglich |
| Verarbeitung | MP4/MOV-Eingang; vorhandene Videopakete werden kopiert, ohne Neukodierung |
| Ausgabe | MP4 mit Index am Dateianfang und ohne Tonspur |
| Schnittgrenzen | Abhängig von Schlüsselbildern; der erzeugte Clip kann etwas vom gewählten Bereich abweichen |
| Qualität und Größe | Keine Auflösungs- oder Bitratenreduktion; starke Kompression wird nicht garantiert |

Auch ein vollständig gewähltes kurzes Video wird vor dem Upload neu verpackt
und von der Tonspur befreit. Die Ausgabe wird auf fehlende Audiospuren und eine
lesbare Dauer geprüft. Passt die erzeugte Datei nicht in die Clip-Grenzen oder
scheitert die Verarbeitung, wird nichts hochgeladen. Es gibt keinen Fallback
auf das Original oder auf bloße Abspielgrenzen einer vollständig hochgeladenen
Quelldatei. Dann eine kompatible MP4/MOV-Datei oder einen kürzeren Ausschnitt
versuchen.

Die Auswahlgrenze von 1 GiB ist keine Gerätegarantie. Verarbeitung und Ausgabe
benötigen Arbeitsspeicher. Besonders große HEVC-/MOV-Dateien müssen auf dem
Zielgerät geprüft werden. MP4 ist ein Container: Ein HEVC-Video bleibt bei der
Paketkopie HEVC; die Wiedergabefähigkeit hängt weiter vom Gerät ab.

## Google Drive

Es gibt keine direkte Drive-API, keine Eingabe eines Freigabelinks und keinen
serverseitigen Download. **Aus Dateien wählen** öffnet den Dateidialog des
Geräts. Wenn dort Google Drive als Anbieter verfügbar ist, kann die Datei darüber
gewählt werden. Andernfalls das Video zuerst auf das Gerät herunterladen und
anschließend auswählen. Bei Cloud-Dateien muss das Gerät die Quelle zunächst
bereitstellen; die App verarbeitet anschließend die ausgewählte Datei.

## Ersetzen, Entfernen und Konten

- Die Zuordnung gilt pro Übung, nicht als persönliche Sammlung mehrerer Clips.
- **Neu aufnehmen**, **Andere Datei** oder ein weiterer Clip für dieselbe Übung
  ersetzt das eigene Video.
- **Mein Video entfernen** verlangt eine Bestätigung. Danach verwendet die
  Übung wieder das Standardvideo.
- Hat ein anderes Konto die Übung bereits belegt, blendet die Ansicht die
  Upload-Steuerung aus. Der Upload prüft den Besitz zusätzlich vor dem Transfer;
  Firebase-Rules bleiben die verbindliche Zugriffskontrolle.
- Neue Uploads erhalten den Status `pending`. Eine Coach-Oberfläche für die
  Freigabe als `approved` fehlt noch.
- Ein verfügbarer Screen Wake Lock wird beim Bearbeiten, Schneiden, Hochladen
  und Entfernen angefordert. Geräte können ihn ablehnen oder bei Wechsel in den
  Hintergrund aussetzen; die App für den Vorgang im Vordergrund lassen.

## Speicher und Fehlerverhalten

Die bestehende Firebase-App und deren Anmeldung werden wiederverwendet.

| Speicher | Pfad |
| --- | --- |
| Firebase Storage | `exerciseVideos/{exerciseId}/{uid}` |
| Firestore-Zuordnung | `exerciseVideos/{exerciseId}` |

Der Transfer verwendet Firebase `uploadBytesResumable` mit Fortschrittsanzeige.
Das ist keine dauerhafte Offline-Outbox: Nach Neuladen wird ein abgebrochener
Vorgang nicht automatisch fortgesetzt.

Wird beim erstmaligen Upload das Firestore-Dokument abgelehnt, versucht die App,
die gerade hochgeladene Datei wieder zu löschen. Das Aufräumen kann bei
Netz-/Berechtigungsfehlern ebenfalls scheitern. Beim Ersetzen wird dasselbe
Storage-Objekt überschrieben; Datei und Firestore-Zuordnung sind keine atomare
Transaktion. Eine fehlgeschlagene Ersetzung stellt die vorherige Datei nicht
automatisch wieder her.

Deploybare Rules liegen zentral in VitalOS: `firestore.rules` und
`storage.rules`. Die Rules-Dateien in diesem Repo sind Testfragmente. Änderungen
an diesem Ablauf haben keine Firebase-Rules geändert.

## Zuständige Dateien

| Datei | Aufgabe |
| --- | --- |
| `SixPackApp.jsx` | Quelldatei während der Sitzung halten und bei Kontowechsel verwerfen |
| `ExerciseDetailScreen.jsx` | Zielübung und Konto an den Upload übergeben |
| `ExerciseVideoUpload.jsx` | Dateiauswahl, Verarbeitung, Bestätigung, Upload und Entfernen |
| `ExerciseClipEditor.jsx` | Vorschau, Griffe, Sekundenfelder und Zielübung |
| `exerciseClipCut.js` | Lokale Paketkopie mit Mediabunny, MP4-Ausgabe und Tonentfernung |
| `exerciseVideo.js` | Grenzen, Auswahlprüfung und Upload-Plan ohne Original-Fallback |
| `exerciseVideoCloud.js` | Besitzprüfung, Firebase-Transfer und Zuordnung |

Ältere Datensätze mit `clipStart`/`clipEnd` bleiben beim Abspielen unterstützt.
Der neue Editor erzeugt solche Bereichs-Fallbacks nicht mehr.

## Prüfung und Veröffentlichung

Für `cd6ed992` bestanden Video-, Übungsdetail-, Selfie-Cloud-, Kalender-,
Embed-/Update-Tests und der Build. GitHub Check und dev-Preview-Deploy waren grün;
die ausgelieferte Preview meldete den Build `0.1.0+cd6ed99`.
Der lokale Vendor-Check meldete eine bestehende Abweichung in
`scripts/mini-app-shell/sw-template.js`; diese Datei wurde nicht geändert.
Fitness-Gitlink und VitalOS-Meta-Pointer wurden in dieser Runde nicht aktualisiert.

Relevante lokale Prüfungen:

```sh
node scripts/test-exercise-video.mjs
node scripts/test-exercise-details.mjs
node --test scripts/test-embed.mjs scripts/test-app-update.mjs
./scripts/pnpm-cloud.sh run build
```

Noch auf einem angemeldeten iPhone prüfen, jeweils in Safari, PWA und Shell:

- Große MOV-/HEVC-Quelle öffnen und mehrere Clips verschiedenen Übungen zuordnen.
- Tonfreiheit bei ganzem Video und Ausschnitt sowie tatsächliche Schnittgrenzen.
- Sekundenfelder, Griffe, Vorschau und Bedienung bei eingeblendeter Tastatur.
- Ersetzen, Entfernen, Abbrechen und Fehler bei unterbrochener Verbindung.
- Kontowechsel während Auswahl/Verarbeitung/Upload.
- Dateiauswahl über Google Drive, falls als Anbieter eingerichtet.
- Speicherverbrauch, Wiedergabe und Verhalten bei Hintergrund-/Bildschirmsperre.
