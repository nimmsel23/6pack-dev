# TODO — 6pack-dev


- [x] Selfies mit bestehendem Firebase-Login über Firestore geräteübergreifend synchronisieren; Offline-Queue beibehalten.

- [x] Bestehende Photo-Auth/Galerie, Fitness-API und Cloud-Sync zu einem Ablauf zusammenführen; geschützten Altbestand importieren.

- [x] AGENTS.md mit Dateizuständigkeiten, finalem Foto-Vertrag und Dev/Fitness/Release-Ablauf anlegen; alte CLAUDE-Deploy-Aussagen korrigieren.

- [x] 2026-10-17: Reales Handy → Laptop Selfie-Sync vom Nutzer bestätigt; Abnahme und verbleibende Testgrenzen dokumentieren.

- [x] 2026-10-17: Übungen vor Workout-Start öffnen: Muskelgrafik, Anleitung, Video und Rückkehr zur Liste.
- [x] 2026-10-20: Deutlichen zweistufigen Piep-Tüt-Ton am Ende jeder Runner-Übung ergänzen.
- [x] 2026-10-20: Englische Abschlussansage nach dem Workout ergänzen.
- [x] 2026-10-22: Aktuelle Runner-Übung wiederholen können und Audio-Mix vor jeder Ansage/jedem Piep erneut setzen.
- [ ] Wöchentlich: eine weitere Woche des 6 Pack Promise-Programms mit verifizierten Workouts ergänzen. (Woche 2 Tag 1/2/4/5/6 erledigt 2026-10-23; Woche 3 offen.)
- [ ] Verlässliche öffentliche Demos für Rolling Jackknifes und die seitliche Accordian-Crunch-Variante sind noch nicht bestätigt. Ein generisches Accordion-Video ist nicht als seitliche Variante verifiziert und bleibt unverknüpft; Sprinter Tuck Planks / Canoe Crunch haben nur Näherungs-Videos.
- [ ] Video-Loops von YouTube/Vimeo sind nicht offline cachebar — bei Bedarf als eigene MP4-Dateien hosten.
- [ ] Autoplay/Video-Cache im Runner am Handy abnehmen (kein Geräte-Test bisher).
- [ ] Passende öffentliche Demo für Any Ball BTB Pass ergänzen.
- [ ] Neue Übungsdetails am Handy inklusive Video-Wiedergabe abnehmen.
- [x] 2026-10-23: Drehplan für die 9 offenen bzw. unsicheren Woche-2-Videos mit Priorität, Bewegungshinweisen und Dateinamen erstellt (`docs/VIDEO-DREHPLAN-WOCHE-2.md`).
- [x] 2026-10-20: 6Pack-dev-Pilot: In-App-Changelog mit den Commits des Deploy-Pushes.
- [ ] In-App-Changelog nach erfolgreichem 6Pack-Pilot auf die weiteren Apps ausrollen.

- [x] Offline-Cache über App-Updates erhalten: gemeinsame SW-Strategie, API-Migration, vollständiges Asset-Precache und sichere Installation.

- [x] 2026-10-21: Pilot durch gemeinsamen VitalOS-Changelog ersetzen; Bestätigungsschlüssel erhalten.

- [x] 2026-10-21: Im Shell-Betrieb einen gemeinsamen VitalOS-Changelog mit App-Änderungen und zentraler Bestätigung nutzen.

- [x] 2026-10-24: Push-Registrierungsfehler sichtbar machen, bestehende Geräte erneut registrieren und verspäteten App-Start-Timer entfernen.
- [x] 2026-10-24: Native Android-/iOS-Projekte mit lokal geplanten Workout-Remindern aus dem Track ergänzen.
- [ ] Native Builds in Android/Xcode bzw. manuellem Native-CI-Workflow ausführen; iPhone signieren und Offline-Reminder auf beiden Geräten abnehmen (siehe docs/NATIVE-REMINDERS.md).

- [x] 2026-10-24: Genau einen kommenden 6Pack-Termin im vorhandenen Google-Kalender „Fitness“ nach Programm-Abschluss serverseitig aktualisieren; keine Terminserie/kein Kalender-Spam.
- [x] 2026-10-24: Kalender-OAuth/Secret und Calendar-Functions in Production einrichten; alle vier Functions ACTIVE und Live-Auth-Sperren geprüft.
- [ ] Google Kalender in den App-Einstellungen verbinden und echten nächsten Workout-Termin/Handy-Reminder abnehmen (docs/GOOGLE-CALENDAR.md).
- [ ] 2026-10-28: Vorgefertigte Audio-Clips für die Ansagen (Übungsnamen, Zahlen, "begin in", "Switch sides", Equipment …) erzeugen und per Web Audio abspielen, damit iOS-Musik (Spotify) durchläuft — speechSynthesis pausiert sie. Bis dahin: Sprache standardmäßig an, im Settings-Tab abschaltbar (nur Pieptöne, Musik läuft).
