# 6Pack Dev

Eigenständig baubare 6Pack-App. Der Fitness-Tab nutzt eine veröffentlichte Kopie
von Oberfläche, Theme und Daten-Adapter unter `fitness-dev/6pack/`.

## Lokal

```sh
npm install
npm run dev
npm run build
```

`catalog/6pack/` und `catalog/calisthenics/` sind die Datenquelle dieser App.
`npm run build:data` erzeugt `sixpackData.generated.js` daraus. Die Datei wird
nicht committed. `video_url` im Übungs-YAML versorgt den Runner mit einem
direkt abspielbaren Clip. Eine im Runner eingetragene Video-URL gilt nur für
den jeweiligen Browser und überschreibt den Katalogwert dort.

## Fitness-Kopie

Nach geprüften Änderungen die drei Laufzeitdateien in den gewünschten
Fitness-Checkout kopieren:

```sh
npm run publish:fitness -- /home/alpha/fitness-dev/6pack
```

Der Fitness-Checkout behält seinen eigenen KB-Generator. Änderungen an
Übungen oder Workouts müssen zusätzlich in seine KB übernommen und dort
gebaut werden. Der Publish-Befehl committed und deployt nichts.

## Firebase Hosting

`.firebaserc` bindet das Hosting-Ziel `sixpack` im Projekt `fitness-aos` an die
Site `vos-6pack`. `firebase.json` veröffentlicht ausschließlich `dist`.

```sh
npm run deploy
```

Die Site muss zuvor im Firebase-Projekt existieren und die Firebase-CLI muss
angemeldet sein. Das Ziel ist `https://vos-6pack.web.app`.

Sprachausgabe und Tonsignale benötigen Browser-Unterstützung. Audio wird nach
dem ersten Start-Tap aktiviert; bei gesperrtem Bildschirm hängt die Wiedergabe
vom Browser und Betriebssystem ab.

Video-Anleitung: [Video-URLs einrichten](docs/VIDEO_URLS.md).
