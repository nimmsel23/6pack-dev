# NEXT — 6pack-dev
- Eigene Clips Tag 1 liefern: `hands_back_tucks`, `marching_planks`, `side_plank_lifts`, `seated_ab_circles`, `ninety_ninety_crunch`, `russian_v_tuck_twists` → `node scripts/own-clips.mjs import <id> <datei>`, `sync ~/fitness-dev`, Daten neu bauen, committen (Clips mit committen — noch nicht bestätigt). Wiedergabe auf dem Handy ungeprüft.
- Fitness-Tab-Runner ist älter als der in 6pack-dev (kein `videoCache.js`, kein Autostart/Gym-Timer-Töne) — Nachziehen ist offen, Entscheidung beim User.
- Track-Tab (Tag antippen = aktiv + Übungsliste) und Vollbreiten-Layout am Handy bzw. im Browser ansehen; auf breiten Desktop-Fenstern ggf. großzügige Breitenobergrenze setzen (bisher nicht visuell geprüft).
- `completedDays` wird im UI nicht mehr angezeigt — prüfen, ob die Logik in Sync/Fortschritt weiterhin gebraucht wird.
- Runner-Fixes (Autostart, Gym-Timer-Töne, Sprachansagen, Video-Cache) auf dem Handy prüfen — nichts davon wurde gehört/getestet. Fehlen die Sprachansagen weiter, nächster Kandidat: `cancel()` direkt vor `speak()` unter iOS.
- `bent_knee_windshield_wipers` hat kein Video, bis ein einbettbarer Clip (oder eigener Clip) vorliegt.
- Jakob hat auf die „live, App neu öffnen, Day 2 testen“-Nachricht noch nicht geantwortet.

**Gemini-Review (potenzielle blinde Flecken, 2026-10-23):**
*   **Ungetestete Funktionalität in Produktion:** Die `RESULTS.md`-Zusammenfassung erwähnt nicht, dass der "Gerätetest für Autoplay und Cache" aussteht und die entsprechende Funktionalität ungetestet in Produktion gegangen ist, obwohl dies im Verlauf explizit kommuniziert wurde.
*   **Verschwiegenes Prozesshindernis:** Die Selbstzusammenfassung lässt unerwähnt, dass der Release-Befehl (`~/vitalos/bin/fitness-release --yes`) vom Classifier blockiert wurde und der Benutzer ihn manuell ausführen musste.

**Gemini-Review (potenzielle blinde Flecken, 2026-10-24):**
*   **Ungeprüfte Annahme zum Live-Stand von `vos-6pack.web.app`:** Claude nimmt an, dass seine Fixes im Commit `9ae576c3` enthalten sind, da dieser auf `60ae8d7` aufbaut, hat dies aber nicht explizit verifiziert (z.B. durch `grep` im Bundle oder Überprüfung der Commit-Historie von `9ae576c3`).
*   **Partielle Problembehebung "Pause-Button sinnlos":** Claude adressierte "Wiederholen auch bei Rest", aber es ist unklar, ob die gesamte Problematik des "sinnlosen Pause-Buttons" vollständig verstanden und behoben wurde oder ob andere Aspekte der "Sinnlosigkeit" bestehen bleiben.
*   **Ignorierte Python-Deprecation-Warnung:** Im `git push`-Output erschien eine `FutureWarning` bezüglich des End-of-Life von Python 3.11.15 und der Notwendigkeit eines Upgrades auf 3.12+ für Google API-Bibliotheken, die von Claude nicht beachtet wurde.
