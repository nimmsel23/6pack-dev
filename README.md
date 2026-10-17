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


## Selfies: ein gemeinsamer Cloud-Sync

Standalone und Fitness verwenden denselben Firebase-Login und dieselbe Galerie.
`photoAuth.js` übernimmt den vorhandenen Host-Login (Google oder E-Mail/Passwort),
`SelfiesGallery.jsx` Kamera/Mehrfachauswahl und Warteschlange, `PrivatePhoto.jsx`
authentifizierte Bildabrufe mit kurzlebigen Blob-URLs. Kein Token steht in einer
Bild-URL; Konto-Wechsel entfernt die vorherige Galerie.

Der normale Sync speichert ausschließlich nach Firestore:
`sixpackSelfies/{uid}/photos/{photoId}`. Die SSOT-Regeln in
`~/vitalos/firestore.rules` erlauben nur dem Eigentümer Zugriff, auch Coach-Rechte
geben keinen Zugriff auf fremde Selfies. Rules und Index-Ausnahme für `dataUrl`
müssen vor dem Client veröffentlicht werden. Kein Laptop-Server wird zum
normalen Synchronisieren benötigt; es gibt keinen automatischen Server-Fallback.

`selfieCloud.js` nutzt Firebase-ID-Token, erneuert nach HTTP 401 einmal, lädt die
Galerie-Metadaten seitenweise ohne Bilddaten und ruft Bilder getrennt ab. Das Bild
wird zu JPEG verkleinert (maximal 1600 px an der langen Kante und 700000 Zeichen
als Data-URL). Originale bleiben erhalten. HEIC/HEIF setzt Browser-Decodierung
voraus, sonst wird die Datei ausdrücklich als nicht gespeichert gemeldet.

Vor jedem Upload wird das vorbereitete Foto in der bestehenden UID-Queue
`fitness-sixpack-selfies-pending-v2:<uid>` gespeichert. Erst eine bestätigte
Cloud-Antwort entfernt den Eintrag. Wiederholungen verwenden dieselbe Foto-ID.
Beim Öffnen, bei erneuter Verbindung, beim Zurückkehren zur App und manuell wird
synchronisiert. Bei vollem oder beschädigtem Browserspeicher wird kein Erfolg
behauptet; Original behalten. Nicht zugeordnete v1-Daten bleiben unangetastet.

### Vorhandene Laptop-Fotos übernehmen

„Vorhandene Server-Fotos übernehmen“ importiert den angemeldeten eigenen
Altbestand einmalig in die Cloud. Optional `VITE_SIXPACK_API_BASE` oder die
HTTPS-Adresse im Import-Feld setzen; lokal ist auch HTTP auf localhost erlaubt.
Kein fest eingebauter Funnel-Host. Der vorhandene `photoClient.mjs` liest nur
Liste/Bilder über `api/sixpack/photos` / `api/sixpack-photos/{uid}/{filename}` mit
Bearer-Token. Die Fitness-FastAPI muss den zusammengeführten Auth-Router enthalten.
Node reicht diese Requests über seinen allgemeinen `/api/*`-Proxy unverändert
weiter. Ein UID-Header allein ist niemals eine Anmeldung.

Der Import erhält das gespeicherte Datum und verwendet eine stabile ID aus UID
und Dateiname. Bestätigte Bilder werden bei Wiederholung übersprungen; Originale
werden weder verändert noch gelöscht. Unzugeordnete `local`-Ordner werden nicht
einem Konto zugeschlagen. Die alten tokengeprüften FastAPI-Upload-Routen bleiben
für ältere Clients kompatibel, sind aber nicht Teil des neuen Sync-Ablaufs.

### Tests und Veröffentlichung

- `node scripts/test-selfie-cloud.mjs`: Client, Auth, Fehler und Import-Wiederholung.
- `scripts/test-selfie-emulator.mjs`: Upload/Liste/Download sowie Abweisung von
  fremden Nutzern, Coaches und anonymen Requests gegen echte lokale Rules.
  Nur `FIRESTORE_EMULATOR_HOST=127.0.0.1:<port>`, Projekt `demo-sixpack` erlaubt.
- Fitness: `scripts/test-sixpack-selection.mjs`, `scripts/test-sixpack-photos.mjs`,
  `fitness.api.tests.test_sixpack_photos`; lokale und Firebase-Builds.
- Erst Rules/Index aus VitalOS per CI, danach Client dev pushen und den
  `fitness`-Integrationsbranch samt Fitness-Gitlink übernehmen. Production-Release
  in VitalOS erfolgt über den bestehenden Release-Workflow.

Architekturgrundlagen: https://firebase.google.com/docs/firestore/use-rest-api
und https://firebase.google.com/docs/firestore/quotas .
