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
- [ ] Offline-Video-Clips (Katalogprüfung 2026-10-29): YouTube/Vimeo-Embeds sind nicht im App-Cache speicherbar. Für Offline-Wiedergabe eigene MP4s unter `public/videos/<exercise_id>.mp4` erstellen und in den Build aufnehmen:
  - [ ] `twenty_one_crunch` — "21" Crunch
  - [ ] `v_ups` — "V" Ups
  - [ ] `ninety_ninety_crunch` — 90/90 Crunch
  - [ ] `canoe_crunch` — Canoe Crunch
  - [ ] `cross_knee_planks` — Cross Knee Planks
  - [ ] `crunch_and_twists` — Crunch and Twists
  - [ ] `drunken_mountain_climbers` — Drunken Mountain Climbers
  - [ ] `flutter_kicks` — Flutter Kicks
  - [ ] `frog_crunches` — Frog Crunches
  - [ ] `hands_back_tucks` — Hands Back Tucks
  - [ ] `heels_to_the_heavens` — Heels to the Heavens
  - [ ] `jackknifes` — Jackknifes
  - [ ] `legs_straight_windshield_wipers` — Legs Straight Windshield Wipers
  - [ ] `marching_planks` — Marching Planks
  - [ ] `mountain_climbers` — Mountain Climbers
  - [ ] `prayer_crunch` — Prayer Crunch
  - [ ] `scissors` — Scissors
  - [ ] `side_crunches` — Side Crunches
  - [ ] `side_plank_lifts` — Side Plank Lifts
  - [ ] `sprinter_tuck_planks` — Sprinter Tuck Planks
  - [ ] `standing_ab_twists` — Standing Ab Twists
  - [ ] `starfish_crunch` — Starfish Crunch
  - [ ] `tuck_planks` — Tuck Planks
  - [ ] `upper_circle_crunches` — Upper Circle Crunches
- [ ] Keine Video-URL vorhanden: `accordian_crunches` (Accordian Crunches), `bent_knee_windshield_wipers` (Bent Knee Windshield Wipers), `rolling_jackknifes` (Rolling Jackknifes), `any_ball_btb_pass` (The "Any Ball" BTB Pass). Eigene MP4s ergänzen, falls für diese Übungen Video-Abdeckung gewünscht ist.
- [ ] Cache-Prüfung: für die vier bereits vorhandenen MP4-Quellen CORS-/Cache-Antworten im Browser verifizieren; der Cloud-Checkout konnte deren Host wegen DNS-Ausfall nicht erreichen. Cache-Fehler werden derzeit still behandelt.
- [ ] Video-Cache auf echtem iPhone online vorladen, danach Flugmodus aktivieren und mehrere Workout-Wechsel abnehmen; insbesondere Cache-Einträge und Playback prüfen.
- [ ] Vom Nutzer gemeldet: iPhone-Mitteilungsfeld dimmt den Bildschirm; Workout-Timer läuft im Hintergrund weiter, Voice/Töne bleiben dabei stumm. Verhalten und Wiederaufnahme mit iOS/PWA auf Gerät prüfen.
- [ ] Vom Nutzer gemeldet: beim Workout-Start erscheinen zwei Push-/Runner-Benachrichtigungen, eine beim Workout-Intro und eine beim Beginn der ersten Übung. Auf iPhone reproduzieren und Ursache/Ersetzung durch denselben Tag prüfen.
- [ ] Passende öffentliche Demo für Any Ball BTB Pass ergänzen.
- [ ] Neue Übungsdetails am Handy inklusive Video-Wiedergabe abnehmen.
- [x] 2026-10-23: Drehplan für die 9 offenen bzw. unsicheren Woche-2-Videos mit Priorität, Bewegungshinweisen und Dateinamen erstellt (`docs/VIDEO-DREHPLAN-WOCHE-2.md`).
- [x] 2026-10-20: 6Pack-dev-Pilot: In-App-Changelog mit den Commits des Deploy-Pushes.
- [ ] In-App-Changelog nach erfolgreichem 6Pack-Pilot auf die weiteren Apps ausrollen.

- [x] Offline-Cache über App-Updates erhalten: gemeinsame SW-Strategie, API-Migration, vollständiges Asset-Precache und sichere Installation.

- [x] 2026-10-21: Pilot durch gemeinsamen VitalOS-Changelog ersetzen; Bestätigungsschlüssel erhalten.

- [x] 2026-10-21: Im Shell-Betrieb einen gemeinsamen VitalOS-Changelog mit App-Änderungen und zentraler Bestätigung nutzen.

- [x] 2026-10-24: Push-Registrierungsfehler sichtbar machen, bestehende Geräte erneut registrieren und verspäteten App-Start-Timer entfernen.
- [x] 2026-10-29: Runner-Intro mit Satzpause; Übungsansage in natürlichem Tempo und danach voller 5-Sekunden-Countdown; Wiederholen startet sofort weiter, manuelle Start-/Pause-Buttons entfernt.
- [x] 2026-10-29: Welcome nicht abbrechen; Equipment-Einleitung immer sprechen; danach Übungsansage + 5–1 und erst nach Timerstart den ersten Ton.
- [x] 2026-10-29: Runner-Töne nur bei Übungsstart/-ende; 30/10-Sekunden-Hinweise bleiben Sprachansagen ohne Töne.
- [x] 2026-10-29: Cloud-Dev-pnpm-Wrapper für beschreibbare XDG-Locks/-Stores ohne Laptop- oder Host-Pfad-Abhängigkeit.
- [x] 2026-10-24: Native Android-/iOS-Projekte mit lokal geplanten Workout-Remindern aus dem Track ergänzen.
- [ ] Native Builds in Android/Xcode bzw. manuellem Native-CI-Workflow ausführen; iPhone signieren und Offline-Reminder auf beiden Geräten abnehmen (siehe docs/NATIVE-REMINDERS.md).

- [x] 2026-10-24: Genau einen kommenden 6Pack-Termin im vorhandenen Google-Kalender „Fitness“ nach Programm-Abschluss serverseitig aktualisieren; keine Terminserie/kein Kalender-Spam.
- [x] 2026-10-24: Kalender-OAuth/Secret und Calendar-Functions in Production einrichten; alle vier Functions ACTIVE und Live-Auth-Sperren geprüft.
- [ ] Google Kalender in den App-Einstellungen verbinden und echten nächsten Workout-Termin/Handy-Reminder abnehmen (docs/GOOGLE-CALENDAR.md).
