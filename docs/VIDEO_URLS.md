# Video-URLs für 6Pack-Übungen

Der Runner zeigt bei Übungen einen stumm startenden Video-Loop mit Bedienelementen.
Pausen haben keinen Videobereich.

## Schnell im Runner testen

1. Workout starten und die gewünschte Übung öffnen.
2. Im Feld **„Video-URL für …“** die direkte Adresse einer Videodatei eintragen,
   etwa `https://example.org/videos/jackknifes.mp4`.
3. Der Player lädt den Clip sofort und spielt ihn in Schleife.

Die Eingabe liegt unter `fitness-sixpack-video-urls-v1` im `localStorage` des
Browsers. Sie gilt nur auf diesem Gerät und überschreibt die Katalog-URL.
Eine YouTube-Seitenadresse oder ein Einbettungslink ist keine direkt abspielbare
Datei für dieses Video-Feld.

## Dauerhaft im Katalog hinterlegen

Im passenden YAML unter `catalog/6pack/` das Feld `video_url` **innerhalb des
Übungseintrags** ergänzen:

```yaml
exercises:
- exercise_id: jackknifes
  id: jackknifes
  name: Jackknifes
  video_url: "https://example.org/videos/jackknifes.mp4"
```

Danach `npm run build:data` oder `npm run build` ausführen. Der Generator
schreibt daraus `videoUrl` in `sixpackData.generated.js`; die generierte Datei
nicht von Hand ändern. Für einen mitgelieferten Clip die Datei unter
`public/videos/jackknifes.mp4` ablegen und
`video_url: "/videos/jackknifes.mp4"` verwenden. Vite kopiert `public/` beim
Build nach `dist/`.

Die Fitness-Kopie hat eine eigene KB unter
`fitness-dev/fitness/catalog/kb/exercises/6pack/`. `npm run publish:fitness`
kopiert nur Laufzeitcode, keine YAMLs oder Videodateien. Für dieselbe Übung
die URL daher auch im Fitness-YAML eintragen und dort
`npm run build:sixpack-data` sowie den Firebase-Build ausführen.

## Fehlersuche und lokale Eingaben zurücksetzen

- Akzeptiert werden `https://…` und Pfade ab der Site-Wurzel wie
  `/videos/jackknifes.mp4`. `http://`, `file://` und Daten-URLs werden nicht
  geladen.
- Bei „Video konnte nicht geladen werden“ die URL direkt im Browser öffnen:
  Sie muss ein vom Browser abspielbares Video statt einer HTML-Seite liefern.
- Auch ein geleertes Eingabefeld überschreibt derzeit die Katalog-URL. Um
  **alle** lokalen Überschreibungen zu löschen, in den Browser-Entwicklertools
  `localStorage.removeItem('fitness-sixpack-video-urls-v1')` ausführen und die
  Seite neu laden.
