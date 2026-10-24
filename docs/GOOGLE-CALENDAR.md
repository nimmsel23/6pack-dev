# 6Pack → Google Kalender „Fitness“

## Verhalten

- Verwendet ausschließlich den vorhandenen, beschreibbaren Kalender mit dem
  exakten Namen **Fitness**. Kein neuer Kalender, kein Fallback auf „primary“.
- Genau **ein kommender 6Pack-Termin pro Konto**, keine Terminserie und keine
  vorausgefüllten Wochen. Nach Abschluss eines Programm-Workouts verschiebt
  die App denselben Termin auf den nächsten Trainingstag gemäß Track.
- Ruhetage werden übersprungen. Ein bereits heute erledigtes Workout erzeugt
  keinen weiteren heutigen Termin. Vergangene Tage gelten nicht automatisch
  als erfolgreich trainiert. Nach dem letzten Programm-Tag wird der Termin entfernt.
- Die Uhrzeit aus den 6Pack-Einstellungen gilt auch bei ausgeschaltetem Push.
  Der Kalendereintrag dauert 15 Minuten, blockiert keine Verfügbarkeit und hat
  einen Popup-Reminder direkt zum Start. Die Zeitzone wird beim Verbinden vom Gerät übernommen.
- Einstellungen → **Google Kalender verbinden** → einmal die Google-Freigabe
  für Kalenderliste und Termine erlauben. Die Google-Identität muss zur bereits
  angemeldeten Firebase-Identität gehören. Kein zweites Firebase-Projekt/Login.
- Nach einem Workout löst das Speichern von `users/{uid}/meta/sixpack` die
  serverseitige Aktualisierung aus. Danach muss die App nicht geöffnet bleiben.
  Offline abgeschlossene Workouts aktualisieren Google nach dem nächsten Sync.
- Google Calendar auf dem Handy muss den Kalender **Fitness** synchronisieren
  und Benachrichtigungen erlauben. Bereits auf das Gerät synchronisierte Termine
  können dort unabhängig vom geöffneten 6Pack-Fenster erinnern.
- „Verbindung trennen und Termin entfernen“ entfernt ausschließlich den eigenen
  kommenden 6Pack-Termin und die serverseitig gespeicherte Kalenderfreigabe.
  Andere Fitness-Termine bleiben erhalten. Googles Konto-Freigabe lässt sich
  zusätzlich in den Google-Kontoeinstellungen widerrufen.

## Aufbau und Zuständigkeit

`CalendarReminderSettings.jsx` und `googleCalendarClient.js` verwenden die bereits
initialisierte Firebase-Instanz des jeweiligen Hosts. Die gemeinsame UI enthält
die Einstellung deshalb auch bei direktem Fitness-Import. Für die bestehende
native App erfolgt die Erstverbindung über die Web-App; synchronisierte native
Programm-Abschlüsse lösen denselben Server-Trigger aus.

Die neuen Firebase Functions liegen hier in `functions/`, Codebase
`sixpack-calendar`, Region `europe-west1`:

- `sixpackCalendarBegin`: authentifizierter Start, einmaliger State, PKCE.
- `sixpackCalendarCallback`: OAuth-Code austauschen, Google-Konto prüfen,
  vorhandenen Fitness-Kalender auswählen, ersten Termin aktualisieren.
- `sixpackCalendarOnTrack`: Firestore-Trigger, liest stets den neuesten Track.
- `sixpackCalendarDisconnect`: eigenen Termin entfernen und Token vergessen.

Refresh-Tokens liegen ausschließlich in `_sixpackCalendarPrivate/{uid}`;
kurzlebige OAuth-Zustände in `_sixpackCalendarOAuth/{stateHash}`. Die bestehenden
VitalOS-Rules verweigern beide Pfade für Browser, Eigentümer und Coaches. Keine
neuen Rules erforderlich. Client-lesbarer Status ohne Tokens:
`users/{uid}/meta/sixpackCalendar`. Client-Status wird nie als Zugriffsberechtigung
verwendet. Server-Lease und vor dem Google-Insert gespeicherte deterministische
Event-ID verhindern Duplikate durch Wiederholungen oder konkurrierende Trigger.

## Einmalige Production-Einrichtung

**Ein reiner Hosting-/Firebase-Web-Release genügt noch nicht.** Die Functions und
Google-OAuth-Konfiguration müssen vor der ersten Kalenderverbindung eingerichtet
sein. Stand 2026-10-24: Calendar API, Secret Manager sowie Cloud Run/Eventarc/
Pub/Sub sind aktiviert. Der vorhandene Google-Login-Webclient wird wiederverwendet;
sein Secret liegt in Secret Manager, die öffentliche Client-ID ist als GitHub-
Variable hinterlegt. Die zusätzliche Redirect-URI wurde vom Nutzer bestätigt.
Die eigene OAuth-State-Collection hat eine TTL-Policy.

6Pack ist auf `https://vos-6pack.web.app` mit den Kalender-Einstellungen live;
6Pack- und Fitness-Preview-CI sowie 6Pack-Production-CI sind erfolgreich. Das
Kalender-Backend ist ebenfalls live: alle vier Functions sind **ACTIVE**, der
[Deploy-Lauf 40082517530](https://github.com/nimmsel23/6pack-dev/actions/runs/40082517530)
ist erfolgreich. Die drei erforderlichen projektweiten Service-Agent-Bindings
wurden nach ausdrücklicher Nutzerfreigabe gesetzt. Ebenso wurden ausschließlich
die drei neuen Browser-/OAuth-HTTP-Endpunkte nach ausdrücklicher Freigabe aufrufbar
gemacht; Begin/Disconnect prüfen weiterhin Firebase Auth, Callback den einmaligen
OAuth-State. Live geprüft: anonyme Begin-/Disconnect-Anfragen ergeben HTTP 401,
Callback ohne State HTTP 400. Der interne Track-Trigger bleibt geschützt.

**Jetzt in der App:** Einstellungen → Google Kalender verbinden → Google-Freigabe
abschließen. Anschließend wird genau ein eigener kommender Termin in **Fitness**
verwaltet. Ein echter Google-Konto-/Handytest muss mit dieser Nutzerfreigabe noch
erfolgen; der Agent hat keine persönlichen Kalendertermine angelegt.

Für reproduzierbare Functions-Builds enthält das isolierte Functions-Paket eine
pnpm-Build-Freigabe für `protobufjs` und eine explizite, versionsgenau gepinnte
Functions-Framework-Abhängigkeit. CI prüft vor dem Deploy auch den tatsächlichen
Framework-Start und die anonymen Auth-/OAuth-Sperren.

1. Im Google-Cloud-Projekt `fitness-aos` einen OAuth-Webclient verwenden oder
   anlegen. Den bestehenden Google-Login-Webclient kann man wiederverwenden.
   Als **Authorized redirect URI** exakt hinzufügen:

   ```text
   https://europe-west1-fitness-aos.cloudfunctions.net/sixpackCalendarCallback
   ```

2. OAuth-Consent für die Scopes `openid`,
   `https://www.googleapis.com/auth/calendar.calendarlist.readonly` und
   `https://www.googleapis.com/auth/calendar.events` konfigurieren.
   Im OAuth-Testmodus nur Testnutzer; Google kann Refresh-Tokens dort nach
   sieben Tagen ablaufen lassen. Für dauerhafte Nutzung den passenden
   Publishing-/Verifizierungsstatus in Google Auth Platform herstellen.
3. Secret Manager aktivieren, falls noch nicht geschehen, und den OAuth-Client-
   Secret direkt als Firebase Secret speichern (keine Tokens/Secrets ins Repo):

   ```sh
   gcloud services enable secretmanager.googleapis.com --project fitness-aos
   firebase functions:secrets:set SIXPACK_CALENDAR_CLIENT_SECRET --project fitness-aos
   ```

4. Die öffentliche Client-ID als GitHub-Repository-Variable
   `SIXPACK_CALENDAR_CLIENT_ID` setzen. Der manuelle Workflow
   `.github/workflows/calendar-functions.yml` schreibt daraus die ignorierte
   Functions-Umgebung und deployt ausschließlich `functions:sixpack-calendar`.
   Das Deploy-Konto braucht die üblichen Functions-/Eventarc-/Service-Account-
   Berechtigungen und Zugriff auf das Secret.
5. Optional TTL für `expiresAt` in Collection Group `_sixpackCalendarOAuth`
   aktivieren, damit nicht abgeschlossene Anmeldeversuche automatisch bereinigt
   werden. Die Gültigkeit von zehn Minuten wird unabhängig davon serverseitig geprüft.
6. Danach den regulär freigegebenen 6Pack-Web-Release durchführen und mit einem
   Testkonto verbinden. Es muss genau ein beschreibbarer Kalender **Fitness**
   vorhanden sein. Bei fehlendem oder mehrdeutigem Namen wird kein Kalender angelegt.

## Prüfungen

```sh
pnpm run test:calendar
pnpm run test:reminders
node scripts/test-exercise-details.mjs
pnpm run build
```

Backend-/Rules-Test: lokalen Firestore-Emulator im Projekt **demo-sixpack** mit
`~/vitalos/firestore.rules` starten, dann mit dessen Loopback-Adresse ausführen:

```sh
FIRESTORE_EMULATOR_HOST=127.0.0.1:8089 node scripts/test-selfie-emulator.mjs
FIRESTORE_EMULATOR_HOST=127.0.0.1:8089 node scripts/test-calendar-rules.mjs
FIRESTORE_EMULATOR_HOST=127.0.0.1:8089 node scripts/test-calendar-backend.mjs
```

Die Backend-Tests verwenden echte lokale Firestore-Transaktionen und simulierte
Google-Antworten: Kontowechsel, State-Replay, PKCE, verspätete/gleichzeitige
Trigger, Wiederholungen, Token-Abschirmung und Disconnect. Sie verändern keine
persönlichen Kalender oder Fotos. Ein echter Google-Consent-/Handy-Test nach der
Production-Einrichtung steht noch aus.

Quellen: [Google Web-Server OAuth](https://developers.google.com/identity/protocols/oauth2/web-server),
[Calendar Scopes](https://developers.google.com/workspace/calendar/api/auth),
[Calendar Events API](https://developers.google.com/workspace/calendar/api/v3/reference/events).
