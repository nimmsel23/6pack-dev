# 6Pack Dev

Eigenständig baubare 6Pack-App (`main.jsx`, Hosting `vos-6pack.web.app`).
VitalOS bettet dieselbe Oberfläche ein: das Meta-Repo `nimmsel23/vitalos`
führt dieses Repo als Submodule `6pack-app` und mountet `embed.jsx`
(`SixPackEmbed`). Es gibt keine zweite Kopie unter `fitness-dev/6pack/`.

## Entwicklung in Cloud Dev

CI verwendet pnpm 12. Lokal kann die verfügbare pnpm-12-Version laufen. In
Cloud-Dev-Sitzungen pnpm über den Wrapper starten; er verwendet vorhandene
beschreibbare XDG-Verzeichnisse und legt Runtime-Lock sowie Paketdaten bei
Bedarf in ignorierten Repo-Verzeichnissen ab. So hängt der Build weder von
einem Laptop noch von beschreibbaren Host-Verzeichnissen ab.

```sh
./scripts/pnpm-cloud.sh install --frozen-lockfile
./scripts/pnpm-cloud.sh run build
```

Die Cache-Verzeichnisse `.pnpm-cloud/` sind workspace-lokal und nicht Teil des
Commits. Außerhalb von Cloud Dev funktionieren die üblichen `pnpm`-Befehle
weiterhin.

## Lokal

```sh
npm install
npm run dev
npm run build
```

**Eat** bleibt in der Standalone-App im gleichen Dokument (iframe unter
`public/eat/`). In der Shell ruft Eat `onNavigate('fuel')` auf. Der bisherige
Host, der nur `onSubNav` übergibt, verlinkt weiter über `getFuelUrl()`:
Firebase-Hosts (`*.web.app`, `*.firebaseapp.com`) auf
`https://fuel-vos.web.app/`, sonst derselbe Hostname auf Port `7000`.

**Favorites** speichert ganze Tages- und Shuffle-Workouts über den Stern in
der jeweiligen Workout-Ansicht. Übungen, Reihenfolge, Zeiten und Pausen bleiben
im Browser gespeichert und lassen sich dort wieder starten oder entfernen.
Das Wiederholen eines Favoriten verändert den Fortschritt im Tagesprogramm nicht.

`catalog/6pack/` und `catalog/calisthenics/` sind die Datenquelle dieser App.
`npm run build:data` erzeugt `sixpackData.generated.js` daraus. Die Datei wird
nicht committed. `video_url` im Übungs-YAML versorgt den Runner mit einem
direkt abspielbaren Clip. Eine im Runner eingetragene Video-URL gilt nur für
den jeweiligen Browser und überschreibt den Katalogwert dort.

## VitalOS-Embed

`embed.jsx` exportiert `SixPackEmbed` (auch als Default). Die Shell hängt die
Route an ihren Hash: `#sixpack/<route>`.

| Prop | Bedeutung |
| --- | --- |
| `uid` | Firebase-uid des angemeldeten Kontos |
| `embedded` | Default `true`. Kein Schreiben auf `document.documentElement` (Attribute, Klassen), `meta[name=theme-color]`, `html.style`, `location.hash` oder `history` |
| `route` | Screen-Pfad: `''` (Home), `skills`, `skills/<skillId>`, oder ein bestehender Screen (`track`, `learn`, `settings`, `favorites`, `shuffle`, `selfies`, `day/<n>`, …) |
| `onRouteChange(route)` | Navigation innerhalb von 6Pack. Ein Skill aus Learn meldet `skills/<skillId>` statt `history.replaceState` |
| `onNavigate(target)` | Wechsel in eine andere Shell-App. Eat ruft `onNavigate('fuel')` |
| `onWorkoutComplete(workout)` | Abgeschlossenes Workout, unverändert inklusive stabilem `runId` |
| `loadRemoteProgram`, `saveRemoteProgram` | Programm unter `users/{uid}/meta/sixpack` |
| `firebaseApp` | Bestehende Firebase-App der Shell. Ohne eigenes `enablePush` registriert das Embed darüber |
| `enablePush` | Optionale Registrierung `(uid) => Promise`. Hat Vorrang vor `firebaseApp` |
| `localReminders` | Native Erinnerungen (Capacitor), sonst Web-Push |
| `setupContent` | Konto-Bereich in den Einstellungen |
| `onSubNav`, `coachingNotes` | Bestehende Props. `onSubNav('skills')` wird aus Skill-Routen aufgerufen; der Hash bleibt in der Einbettung unangetastet |

`push.js` registriert 6Pack-Push auf der übergebenen App und legt selbst kein
Firebase an:

```js
import { enableSixpackPush } from './push.js';

enableSixpackPush(uid, {
  firebaseApp,          // oder messaging
  db,                   // optional, sonst getFirestore(firebaseApp)
  auth,                 // optional, sonst getAuth(firebaseApp)
  serviceWorkerUrl,     // Default ./sixpack-messaging-sw.js
  serviceWorkerScope,   // Default ./sixpack-push/
});
```

Die Standalone-App (`standaloneSync.js`) ruft dieselbe Funktion mit ihrer
bereits initialisierten App auf. Vordergrund-Nachrichten:
`listenForSixpackPush({ firebaseApp, auth, uid })`.

Beispiel in der Shell:

```jsx
import SixPackEmbed from '../../6pack-app/embed.jsx';

<SixPackEmbed
  uid={uid}
  route={route}
  onRouteChange={setRoute}
  onNavigate={navigate}
  onWorkoutComplete={onWorkoutComplete}
  loadRemoteProgram={loadProgram}
  saveRemoteProgram={saveProgram}
  firebaseApp={app}
  enablePush={(id) => enableSixpackPush(id, { firebaseApp: app, db, serviceWorkerUrl, serviceWorkerScope })}
/>
```

`SixPackPromiseCard` bleibt der bisherige Einstieg. Ein Host, der nur
`onSubNav` übergibt und `embedded` nicht setzt, schreibt den Skill weiter in
den Hash und verlinkt Eat über `getFuelUrl()`. `publish-fitness.mjs` kopiert
nur drei alte Dateien und ist kein Einbettungsweg.

Der Runner liegt als Portal auf `document.body` mit `fixed inset-0 z-[100]`
(Abbruch-Dialog `z-[120]`) und überdeckt damit die Shell-Navigation. Das ist
bewusst so belassen.

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
npm run build
npm run firebase
```

`npm run firebase` veröffentlicht ausschließlich den vorhandenen `dist/`-Ordner
und startet keinen Build. Für Production den Release-Workflow aus dem VitalOS-
Meta-Repo verwenden.

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

**Vite 8 / Rolldown:** Ohne das Plugin `fixRolldownPreloadMarker` in
`vite.config.js` erzeugt der Production-Build ungültiges JS
(`[]` + Content-Hash hinter dem Preload-Marker) und die Live-Site bleibt auf dem
Splash (Blackscreen). Details: `AGENTS.md` und `docs/NATIVE-REMINDERS.md`.

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

### Im Alltag

1. In VitalOS oder 6Pack mit demselben Firebase-Konto anmelden.
2. In 6Pack → Selfies ein Foto aufnehmen oder Dateien auswählen.
3. „In der Cloud gespeichert“ bedeutet bestätigten Upload. Vorgemerkte Fotos
   brauchen noch Synchronisierung; bei Fehlern das Original behalten.
4. Am anderen Gerät Selfies öffnen und bei Bedarf „Jetzt synchronisieren“ drücken.
   Der Laptop muss keinen eigenen Foto-Server betreiben.

**Geräte-Abnahme 2026-10-17:** Der Nutzer hat ein Foto am Handy hochgeladen und
den erfolgreichen Abruf am Laptop bestätigt. Dieser Upload-/Lese-Ablauf ist
praktisch geprüft. Offline-Wiederanlauf, Altbestand-Import und HEIC/Kamera-Varianten
bleiben separate Gerätetests; die Abnahme behauptet dafür keinen zusätzlichen Test.

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
