# NEXT — 6pack-dev
- Eigene Clips Tag 1 liefern: `hands_back_tucks`, `marching_planks`, `side_plank_lifts`, `seated_ab_circles`, `ninety_ninety_crunch`, `russian_v_tuck_twists` → `node scripts/own-clips.mjs import <id> <datei>`, `sync ~/fitness-dev`, Daten neu bauen, committen (Clips mit committen — noch nicht bestätigt). Wiedergabe auf dem Handy ungeprüft.
- Fitness-Tab-Runner ist älter als der in 6pack-dev (kein `videoCache.js`, kein Autostart/Gym-Timer-Töne) — Nachziehen ist offen, Entscheidung beim User.
- Track-Tab (Tag antippen = aktiv + Übungsliste) und Vollbreiten-Layout am Handy bzw. im Browser ansehen; auf breiten Desktop-Fenstern ggf. großzügige Breitenobergrenze setzen (bisher nicht visuell geprüft).
- `completedDays` wird im UI nicht mehr angezeigt — prüfen, ob die Logik in Sync/Fortschritt weiterhin gebraucht wird.

**Gemini-Review (potenzielle blinde Flecken, 2026-10-23):**
*   **Ungetestete Funktionalität in Produktion:** Die `RESULTS.md`-Zusammenfassung erwähnt nicht, dass der "Gerätetest für Autoplay und Cache" aussteht und die entsprechende Funktionalität ungetestet in Produktion gegangen ist, obwohl dies im Verlauf explizit kommuniziert wurde.
*   **Verschwiegenes Prozesshindernis:** Die Selbstzusammenfassung lässt unerwähnt, dass der Release-Befehl (`~/vitalos/bin/fitness-release --yes`) vom Classifier blockiert wurde und der Benutzer ihn manuell ausführen musste.
