# 6Pack Dev

Eigenständig baubare 6Pack-App. Der Fitness-Tab nutzt eine veröffentlichte Kopie
von Oberfläche, Theme und Daten-Adapter unter `fitness-dev/6pack/`.

## Lokal

```sh
npm install
npm run dev
npm run build
```

**Eat** öffnet Fuel direkt im selben Tab: auf Firebase-Hosts (`*.web.app`,
`*.firebaseapp.com`) unter `https://fuel-vos.web.app/`, im lokalen Betrieb
unter dem aktuellen Hostnamen auf Port `7000` (z. B. `http://127.0.0.1:7000/`).

**Favorites** speichert ganze Tages- und Shuffle-Workouts über den Stern in
der jeweiligen Workout-Ansicht. Übungen, Reihenfolge, Zeiten und Pausen bleiben
im Browser gespeichert und lassen sich dort wieder starten oder entfernen.
Das Wiederholen eines Favoriten verändert den Fortschritt im Tagesprogramm nicht.

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

**Automatisch** (sobald `ci/deploy.yml` nach `.github/workflows/` verschoben ist): Jeder Push auf `dev` deployt per GitHub Action
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


## Fortschrittsfotos (Firebase Cloud-Sync)

Selfies werden mit Firebase-ID-Token direkt in Firestore unter
`users/{uid}/sixpackPhotos/{photoId}` gespeichert. Standalone und Fitness verwenden
dasselbe Projekt `fitness-aos` und denselben Login. Auch im lokalen Fitness-Build
kann man sich direkt im Selfies-Screen mit Google anmelden. Kein Laptop-Server,
Tailscale oder Storage-Bucket erforderlich. Die bestehenden Regeln in
`~/vitalos/firestore.rules` erlauben dem Eigentümer und Coach Zugriff; andere
Nutzer und anonyme Requests haben keinen Zugriff.

Fotos werden für den Sync zu JPEG verkleinert (längste Kante maximal 1600 px,
Data-URL maximal 700000 Zeichen). Originale bleiben auf dem Gerät. HEIC/HEIF
funktioniert nur, wenn der Browser es decodieren kann; andernfalls erscheint eine
Fehlermeldung. Mehrfachauswahl ist möglich. Die Galerie lädt beim Öffnen und bei
erneuter Verbindung; der Sync-Button lädt ebenfalls neu.

Fehlgeschlagene Uploads bleiben pro Nutzer unter
`fitness-sixpack-selfies-pending-v2:<uid>` im Browser. Beim Öffnen, Online-Ereignis
oder manueller Synchronisierung werden sie erneut gesendet; dieselbe Foto-ID
verhindert Duplikate. Erst die Serverbestätigung entfernt einen Queue-Eintrag.
Bestehende zugeordnete Browser-Queues werden mit demselben Login übernommen.
Nicht zugeordnete v1-Queues und lokale Server-Fotos werden weder gelöscht noch
automatisch einem Konto zugeordnet. Bereits auf dem Laptop gespeicherte Originale
können über „Fotos auswählen“ hochgeladen werden.

Prüfung: `node scripts/test-selfie-cloud.mjs` und `npm run build`.
Firebase REST-Auth: https://firebase.google.com/docs/firestore/use-rest-api
