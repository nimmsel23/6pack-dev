# Native 6Pack: Android und iPhone

Die gemeinsame Oberfläche bleibt `SixPackApp.jsx`. Capacitor bündelt dieselbe
App lokal; es wird keine Website von einem laufenden Server geladen.
`nativeReminders.js` verwendet Betriebssystem-Benachrichtigungen statt FCM.
Login und Internet sind für die lokale Erinnerung nicht nötig.

## Verhalten

- Einstellungen → tägliche Benachrichtigung einschalten, Uhrzeit wählen und
  Geräte-Berechtigungen erlauben. Android benötigt auch „Alarme & Erinnerungen“.
- `localReminderPlan.js` plant bis zu 60 Tage voraus, unterhalb des iOS-Limits
  von 64 ausstehenden Benachrichtigungen. App-Nutzung erneuert den Horizont.
- Heute erledigt → heute kein Reminder. Aktueller Ruhetag → heute kein Reminder,
  danach Erinnerung für den folgenden Trainingstag. Ein verpasstes Workout
  bleibt aktuell; zukünftige Trainingserfolge werden nicht angenommen.
- Workout-Abschluss, manuelles Track-Wechseln, Ein-/Ausschalten, Uhrzeitänderung
  und Wiederaufnahme der App ersetzen den Geräteplan. Kalenderarithmetik erhält
  die lokale Uhrzeit über Sommer-/Winterzeitwechsel.
- Native Apps registrieren keine neuen FCM-Tokens. Bereits unabhängig
  installierte Browser-/PWA-Versionen haben eigene Einstellungen/Push-Abos.
- Änderungen auf einem anderen Gerät können einen offline geplanten Geräteplan
  erst ändern, sobald diese App den neuen Track synchronisiert hat.
- Nach 60 Tagen ohne erneutes Öffnen endet der vorberechnete Plan. Nicht-stören,
  entzogene Berechtigungen, Android „Stopp erzwingen“ und Deinstallation können
  Benachrichtigungen verhindern. Ein echter Gerätetest bleibt erforderlich.

## Bauen

Voraussetzungen: Node ≥22, pnpm aus `package.json`, Android Studio/SDK 36 und
JDK 21 für Android; macOS mit Xcode ≥26 für iOS.

```sh
pnpm install --frozen-lockfile
pnpm run test:reminders
pnpm run native:sync
pnpm run native:android
# oder auf macOS:
pnpm run native:ios
```

Android-Debug-APK nach `native:sync`:

```sh
cd android
./gradlew assembleDebug
# app/build/outputs/apk/debug/app-debug.apk
```

iPhone: In Xcode das Projekt `ios/App/App.xcodeproj` öffnen, ein eigenes Signing
Team wählen und auf das angeschlossene iPhone installieren. TestFlight/App-Store
benötigen Apple-Signierung; keine Zertifikate oder Schlüssel ins Repository legen.

Der manuell startbare Workflow `native-build.yml` baut eine installierbare
Android-Debug-APK und eine unsignierte iOS-Simulator-App. Er veröffentlicht nichts
in Stores und erstellt keine auf iPhones installierbare IPA.

Native Anmeldung nutzt den bestehenden Firebase-E-Mail-/Passwort-Login. Die
Google-Popup-Anmeldung bleibt im Browser verfügbar; natives Google-OAuth ist
nicht Bestandteil dieses Wrappers. Ohne Login funktionieren Track und Reminder
lokal. Bestehende Browser-Daten werden nicht automatisch in die App übertragen.

## Geräteabnahme

1. Erinnerung auf zwei Minuten später stellen, Berechtigungen erlauben.
2. Flugmodus aktivieren, App schließen und Bildschirm sperren: Reminder prüfen.
3. Workout vor Reminder abschließen: heutige Meldung muss entfallen.
4. Ruhetag auswählen: heute keine Meldung, nächster Trainingstag korrekt.
5. Uhrzeit ändern/ausschalten: alter Termin muss entfernt sein.
6. Android neu starten: gespeicherte Alarme prüfen; genaue Alarme einmal
   entziehen/wieder erlauben und die sichtbare Fehlermeldung prüfen.

## Web-Version

Der bestehende Scheduler `scheduledSixpackReminders` in Fitness Functions
bleibt zuständig. Am 2026-10-24 in Firebase `fitness-aos` als ACTIVE verifiziert.
Die UI erneuert Geräte-Registrierungen nach Login/Netzrückkehr, zeigt Fehler
und bestätigt keinen lokalen Timer als Push-Erfolg. FCM-Vordergrund-Nachrichten
werden zusätzlich sichtbar angezeigt. Die Web-Version benötigt für Zustellung
Internet; sie bietet keine lokal geplanten Betriebssystem-Alarme.

## Prüfung in dieser Umgebung (2026-10-24)

- Reminder-/Track-Tests einschließlich DST und nativer Bridge sowie bestehende
  Exercise-, Program- und Selfie-Cloud-Tests bestanden.
- Web-/Native-JavaScript-Build und Capacitor-Sync für beide Projekte geprüft.
- Kein nativer Android-/Xcode-Build und kein Geräte-Test: Android-SDK sowie
  macOS/Xcode fehlen hier. Der neue CI-Workflow ist noch nicht ausgeführt.
- `vendor:check` meldet bereits vorhandene Drift in vier Shell-Dateien; das
  vendorte Paket wurde für diese Aufgabe nicht geändert.
