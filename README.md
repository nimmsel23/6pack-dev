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


## Fortschrittsfotos (lokaler Server)

`Session` übergibt die UID des aktiven DB-Adapters. Upload, Liste und Bilder
nutzen relative URLs am App-Server; `VITE_API_BASE` kann einen anderen Server
angeben. Vite leitet `/sixpack*` an Node (`FITNESS_NODE_PORT`, Standard 9100)
weiter. Firebase allein hat diesen lokalen Endpunkt nicht; ohne explizit
konfigurierten erreichbaren Server bleiben neue Fotos in der Offline-Queue.

`server/routes/sixpack-photos.mjs` im Fitness-Repository speichert neue Fotos unter
`~/.aos/fitness/users/<uid>/sixpack-photos/`, außerhalb der Build-Assets.
`FITNESS_SIXPACK_PHOTOS_DIR` überschreibt den übergeordneten Nutzerordner.
Die Routen gehören zum lokalen, vertrauenswürdigen Server: Die UID dient zur
Zuordnung, nicht als Authentifizierung für einen öffentlichen Foto-Dienst.

Fehlgeschlagene Uploads landen unter
`fitness-sixpack-selfies-pending-v2:<uid>` im Browser. Synchronisierung erfolgt
beim Öffnen, beim Online-Ereignis oder per „Jetzt synchronisieren“.
Dateiformat und Aufnahmedatum bleiben erhalten; eine stabile Upload-ID verhindert
Duplikate bei Wiederholungen. JPG/PNG/WebP/HEIC/HEIF bis 20 MB sind erlaubt;
HEIC-Anzeige hängt vom Browser ab. Bei vollem oder gesperrtem Browserspeicher
erscheint eine Fehlermeldung statt einer falschen Speicherbestätigung.

Alte unzugeordnete Browser-Einträge (`fitness-sixpack-selfies-v1`,
`fitness-sixpack-selfies-pending-v1`) und Dateien unter `public/sixpack-photos/`
werden nicht automatisch verschoben, gelöscht oder einem Nutzer zugeordnet.
Sie sind in der neuen Galerie nicht eingebunden; eine Migration braucht eine
explizite Nutzerzuordnung. Google-Drive-Sync bleibt ein separater TODO-Punkt.

API-Regressionstest (isolierte temporäre Dateien):
`node scripts/test-sixpack-photos.mjs` im Fitness-Repository.


`SixPackPromiseCard.jsx` ist der stabile Barrel-Einstieg: Default-Export aus
`SixPackApp.jsx`, benannter Export `SelfiesScreen`. Die Foto-Oberfläche liegt in
`SelfiesScreen.jsx`, der geteilte Zurück-Header in `BackHeader.jsx`.
Foto-Requests benötigen eine explizite UID (kein Server-Owner-Fallback).
Ohne angemeldete UID bleibt die Foto-Oberfläche gesperrt; der lokale DB-Adapter
liefert ausdrücklich `local`. „Fotos auswählen“ öffnet Galerie/Dateien ohne Kamera-Zwang und erlaubt Mehrfachauswahl. Beide Eingaben nutzen denselben UID-gebundenen Upload-/Offline-Ablauf; jede Datei erhält eine eigene Statusmeldung.
