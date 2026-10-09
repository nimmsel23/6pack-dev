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

**Automatisch:** Jeder Push auf `dev` deployt per GitHub Action
(`.github/workflows/deploy.yml`) live. Benötigtes Repo-Secret:
`FIREBASE_SERVICE_ACCOUNT_FITNESS_AOS` (Service-Account-JSON mit Rolle
„Firebase Hosting Admin“), optional `TELEGRAM_TO`/`TELEGRAM_TOKEN`.
Lokal prüft `.githooks/pre-push` vor dem Push den Build
(einmalig: `git config core.hooksPath .githooks`).

**Manuell:**

```sh
npm run deploy
```

Das Ziel ist `https://vos-6pack.web.app` — eine eigene Hosting-Site, getrennt
von `fitness-aos.web.app`. Einmalig vor dem ersten Deploy (CLI angemeldet):

```sh
firebase hosting:sites:create vos-6pack --project fitness-aos
firebase target:apply hosting sixpack vos-6pack --project fitness-aos  # schon in .firebaserc
```

Die App ist eine installierbare Web-App (`public/manifest.webmanifest`,
Icons in `public/`): auf dem iPhone in Safari öffnen → Teilen → „Zum
Home-Bildschirm“. `index.html` und das Manifest werden mit `no-cache`
ausgeliefert, gehashte Dateien unter `/assets/` dauerhaft gecacht — ein neuer
Deploy kommt also beim nächsten Öffnen an.

Sprachausgabe und Tonsignale benötigen Browser-Unterstützung. Audio wird nach
dem ersten Start-Tap aktiviert; bei gesperrtem Bildschirm hängt die Wiedergabe
vom Browser und Betriebssystem ab.

Video-Anleitung: [Video-URLs einrichten](docs/VIDEO_URLS.md).
