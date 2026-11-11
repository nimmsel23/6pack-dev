# CI-Agent — offener Betriebspunkt

- [ ] Repo-Secrets `SYNC_TOKEN` (Contents/Actions/Pull requests write) und `GEMINI_API_KEY` prüfen/setzen; danach einen roten Check bis Reparatur, Check, Promote und Deploy durchbeobachten.
- [ ] Gmail-Agentenkanal konkretisieren: strukturierte 6Pack-Diagnose als Mail an Betta/Alpha zustellen und eine `[ci:betta]`-Eingangsmail bis zur korrekten Agenten-/Repo-Routing-Übergabe nachweisen. Noch keine Gmail-Zustellung aus der Cloud-Pipeline eingerichtet.

# NEXT — 6pack-dev
- ~~Shell-Theme-Diebstahl~~: `onSubNav` skippt documentElement-Theme; nach Promote Shell-Pin (`vos-release 6pack` / Meta-Bump) prüfen — Sidebar darf nicht mehr rot werden (2026-11-10).
- ~~Pages/Gemini Checkout fail (`.worktrees/agents-thin` Gitlink)~~: `5ac3c580`; Pages `42757607664` + Deploy `42757607824` success (2026-11-10 AL).
- ~~Blackscreen vos-6pack (Vite 8 Preload)~~: Fix + Docs + Live `index-CunHDZLw.js` ohne `[]<hash>` (2026-11-10). Hard-Reload falls alter SW klebt.
- ~~Auto-Promote-Lag (2026-11-09)~~: mit Push-Check `42588657873` → Promote `42588696137` erledigt (master=`28546bb1`).
- ~~PR #38 vite 8~~: gemergt; Alpha `transformWithEsbuild`→`esbuild` (`5d97253`/`8d7e200`); Check/Promote/Deploy grün. Hit `a80cb883` (falsche modules-Diagnose) closed.
- ~~feat 72571775 Musik-Modus~~: AL-Empfehlung 2026-11-09 **parken** (Freeze); Branch `vos-al/musik-mode-72571775` belassen — Publish nur nach Owner-Gate. Beleg: inbox `6pack-dev-2026-11-09.md`, Task `081ca422` done.
- ~~lokaler master / e08fa339~~: Empfehlung **verwerfen**; dangling; master 0 ahead / 2 behind origin/master.
- ~~PR #24 gradle-wrapper 8.14.3 → 9.8.2~~: MERGED `2026-11-06` (`f9527880` / `4dc53069`); `android/gradle/wrapper` = Gradle 9.8.2 auf `dev`/`master` (AL 2026-11-10 Nachmittag).
- ~~`scripts/own-clips.mjs status`~~: läuft (2026-11-10) — Tag 1: 0/6 eigene Clips; Import der 6 Dateien nach `public/videos/` weiter offen.
- **Live-Abnahme `aa6006dc`:** Tailwind-4-Themes, lucide-react 1.64 (Icon-Rendering) und den js-yaml-Datenbuild auf dem Handy bzw. im Browser ansehen. Bisher nichts davon gesehen.
- **`deploy-shell`-Trigger:** Der Push auf Meta-`master` (`69f11ae`) hat keinen automatischen Lauf ausgelöst, Ursache ungeklärt. Beim nächsten Meta-Push prüfen, sonst `gh workflow run deploy-shell.yml --repo nimmsel23/vitalos --ref master`.
- ~~`6pack-app-debug.apk`~~: nicht mehr im Checkout; `*.apk` in `.gitignore` (AL 2026-11-11).
- Eigene Clips Tag 1 liefern: `hands_back_tucks`, `marching_planks`, `side_plank_lifts`, `seated_ab_circles`, `ninety_ninety_crunch`, `russian_v_tuck_twists` → `node scripts/own-clips.mjs import <id> <datei>`, `sync ~/fitness-dev`, Daten neu bauen, committen (Clips mit committen — noch nicht bestätigt). Wiedergabe auf dem Handy ungeprüft.
- Fitness-Tab-Runner ist älter als der in 6pack-dev (kein `videoCache.js`, kein Autostart/Gym-Timer-Töne) — Nachziehen ist offen, Entscheidung beim User.
- Track-Tab (Tag antippen = aktiv + Übungsliste) und Vollbreiten-Layout am Handy bzw. im Browser ansehen; auf breiten Desktop-Fenstern ggf. großzügige Breitenobergrenze setzen (bisher nicht visuell geprüft).
- `completedDays` wird im UI nicht mehr angezeigt — prüfen, ob die Logik in Sync/Fortschritt weiterhin gebraucht wird.
- Runner-Fixes (Autostart, Gym-Timer-Töne, Sprachansagen, Video-Cache) auf dem Handy prüfen — nichts davon wurde gehört/getestet. Fehlen die Sprachansagen weiter, nächster Kandidat: `cancel()` direkt vor `speak()` unter iOS.
- `bent_knee_windshield_wipers` hat kein Video, bis ein einbettbarer Clip (oder eigener Clip) vorliegt.
- Jakob hat auf die „live, App neu öffnen, Day 2 testen“-Nachricht noch nicht geantwortet.
- Vollflächige Screens (Runner, Home, Day usw.), kürzeren Splash und den Fitness-Tab (`SixPackFrame.jsx`, Runner-Portal) am Handy prüfen; falls die Höhe im Fitness-Tab nicht passt, in `SixPackFrame.jsx` nachjustieren. Exercise-Detail und Selfies sind nicht auf Vollhöhe umgebaut; Learn/Settings/lange Workouts scrollen weiterhin intern.

**Gemini-Review (potenzielle blinde Flecken, 2026-10-23):**
*   **Ungetestete Funktionalität in Produktion:** Die `RESULTS.md`-Zusammenfassung erwähnt nicht, dass der "Gerätetest für Autoplay und Cache" aussteht und die entsprechende Funktionalität ungetestet in Produktion gegangen ist, obwohl dies im Verlauf explizit kommuniziert wurde.
*   **Verschwiegenes Prozesshindernis:** Die Selbstzusammenfassung lässt unerwähnt, dass der Release-Befehl (`~/vitalos/bin/fitness-release --yes`) vom Classifier blockiert wurde und der Benutzer ihn manuell ausführen musste.

**Gemini-Review (potenzielle blinde Flecken, 2026-10-24):**
*   **Ungeprüfte Annahme zum Live-Stand von `vos-6pack.web.app`:** Claude nimmt an, dass seine Fixes im Commit `9ae576c3` enthalten sind, da dieser auf `60ae8d7` aufbaut, hat dies aber nicht explizit verifiziert (z.B. durch `grep` im Bundle oder Überprüfung der Commit-Historie von `9ae576c3`).
*   **Partielle Problembehebung "Pause-Button sinnlos":** Claude adressierte "Wiederholen auch bei Rest", aber es ist unklar, ob die gesamte Problematik des "sinnlosen Pause-Buttons" vollständig verstanden und behoben wurde oder ob andere Aspekte der "Sinnlosigkeit" bestehen bleiben.
*   **Ignorierte Python-Deprecation-Warnung:** Im `git push`-Output erschien eine `FutureWarning` bezüglich des End-of-Life von Python 3.11.15 und der Notwendigkeit eines Upgrades auf 3.12+ für Google API-Bibliotheken, die von Claude nicht beachtet wurde.

**Gemini-Review (potenzielle blinde Flecken, 2026-10-25):**
*   **Komplexe Höhenberechnung ungetestet:** Die `SixPackFrame`-Höhenberechnung (`calc(100dvh - ...`) ist komplex und anfällig für Umgebungsfaktoren (`top`, `--mobile-nav-height`, `1rem`-Offset), was ohne visuelle Prüfung zu Layout-Fehlern führen kann.
*   **Inkonsistente Vollbild-UX:** Nur der Runner und die Hauptkarte der 6pack-App wurden für die Vollbild-Einbettung angepasst; andere Screens (Exercise-Detail, Selfies) bleiben unberücksichtigt, was die UX inkonsistent macht.
*   **Ungeprüfte Z-Index-Annahme:** Die `z-[100]`-Erhöhung für den Runner ist eine Annahme, die ohne Kenntnis des Host-App-Z-Index-Stacks zu Überlappungen führen kann.


## Gemini CI-Agent — verbleibende Betriebsprüfung

- [ ] Einen echten roten, code-behebbaren CI-Lauf beobachten und bestätigen, dass Reparatur-Commit, grüner Check und vorgesehener Promote/Deploy enden.
- [ ] Fehler außerhalb des Codes (fehlende Deploy-Credentials, externe Dienste, Runner-Ausfälle) separat als Diagnose melden; keine ungeprüften Änderungen an Secrets oder Deploy-Konfiguration.
- ~~GitHub Pages~~: aktiv `source.branch=master` + `path=/docs`, `status=built`; Live `https://nimmsel23.github.io/6pack-dev/` + `Index.html` HTTP 200 (AL 2026-11-11, API `repos/.../pages`).
- [ ] Gemini-Reparaturpfad nach dem Feld-Fix anhand eines isolierten roten Checks verifizieren: Diagnose, Commit, Check-Neustart und nachgelagerter Deploy.
