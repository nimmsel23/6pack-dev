# Video-Drehplan — 6 Pack Promise, Woche 2

Stand: 2026-10-23. Woche 2 enthält 26 verschiedene Übungen. Dieser Plan priorisiert die 9 Aufnahmen, die die bekannten Videolücken und unsicheren Zuordnungen schließen.

## Aufnahmen

| Erledigt | Prio | Workout-Tag | Übung / Dateiname | Im Clip klar zeigen |
| --- | --- | --- | --- | --- |
| [ ] | 1 | Tag 1 | **Rolling Jackknifes** — `rolling_jackknifes.mp4` | Kontrolliert über den oberen Rücken rollen, Knie und Oberkörper zur V-Position führen und ohne Schwung zurückkommen. Das Gewicht bleibt auf dem oberen Rücken, nicht auf Kopf oder Nacken. |
| [ ] | 1 | Tag 4, linke und rechte Runde | **Accordian Crunches (seitlich)** — `accordian_crunches.mp4` | Seitlage auf dem Unterarm, Schulter/Rippen/Becken gestapelt; oberen Ellbogen und Knie zusammenführen und wieder strecken. Beide Seiten nacheinander filmen. |
| [ ] | 1 | Tag 5, beide Runden | **Any Ball BTB Pass** — `any_ball_btb_pass.mp4` | Rumpf angehoben halten und den Ball sichtbar hinter dem Körper von Hand zu Hand geben. Eine vollständige Übergabe in beide Richtungen zeigen. |
| [ ] | 2 | Tag 5 | **Canoe Crunch** — `canoe_crunch.mp4` | Sitz mit angehobenen Füßen; den Oberkörper abwechselnd nach links und rechts drehen, als würde ein Paddel durchs Wasser geführt. Beine und Brust bleiben oben. |
| [ ] | 2 | Tag 6 | **Sprinter Tuck Planks** — `sprinter_tuck_planks.mp4` | Hohe Plank mit langem Rücken; Knie abwechselnd schnell zur Brust ziehen und die Füße kontrolliert/leise absetzen. Becken bleibt stabil. |
| [ ] | 3 | Tag 1 und 4 | **Drunken Mountain Climbers** — `drunken_mountain_climbers.mp4` | Aus der hohen Plank die Knie abwechselnd diagonal zur jeweils gegenüberliegenden Schulter führen; Becken und Rumpf bleiben stabil. |
| [ ] | 3 | Tag 1 und 5 | **Prayer Crunch** — `prayer_crunch.mp4` | Hände vor der Brust wie zum Gebet halten, den Oberkörper kontrolliert zu den Knien einrollen und oben ausatmen. |
| [ ] | 3 | Tag 1 | **Standing Ab Twists** — `standing_ab_twists.mp4` | Aufrechter Stand, abwechselnder Kniehub mit klarer Rumpfrotation zu jeder Seite; beide Seiten und eine stabile Standposition zeigen. |
| [ ] | 3 | Tag 6 | **„21“ Crunch** — `twenty_one_crunch.mp4` | Eine vollständige Folge demonstrieren: 7 kurze Wiederholungen unten, 7 oben, 7 über den vollen Bewegungsbereich. Übergänge sichtbar trennen. |

**Priorität 1** schließt fehlende passende Demos. **Priorität 2** ersetzt Näherungsclips. **Priorität 3** ersetzt zugeordnete Clips, deren Bewegungsübereinstimmung noch nicht geprüft ist.

## Einheitlicher Drehstandard

- Querformat 16:9, MP4/H.264, 720p bei 30 fps, Kamera fest; Körper, Hände und Füße bleiben während der ganzen Bewegung im Bild. Ziel: höchstens etwa 8 MB pro Clip, damit Laden und Offline-Cache handlich bleiben.
- Pro Übung eine saubere Einstellung: kurz die Startposition zeigen, dann 3–5 kontrollierte Wiederholungen. Für „21“ Crunch die gesamte 7/7/7-Folge filmen.
- Bei seitlichen oder abwechselnden Übungen beide Seiten zeigen. Bei Any Ball BTB Pass den Ball während der Übergabe sichtbar halten.
- Ruhiger, kontrastreicher Hintergrund; keine Musik oder eingeblendeten Anweisungen nötig. Der Player läuft standardmäßig stumm.
- Die Clips sollen die Bewegungsschleife zeigen, nicht eine Workout-Runde in Echtzeit nachspielen.

## Ins Repo übernehmen

1. Eigene Clips unter `public/videos/week2/<dateiname>` ablegen.
2. Im passenden Übungseintrag unter `catalog/6pack/<exercise_id>.yml` `video_url: ./videos/week2/<dateiname>` setzen. Der lokale Clip überschreibt dann die bisherige Katalogzuordnung und kann vom Runner offline vorgeladen werden.
3. `Any Ball BTB Pass` hat aktuell keinen passenden öffentlichen Katalogclip; für diese Übung den neuen Eintrag ebenfalls dort ergänzen.

Bereits gegen die Bewegung geprüft und daher nicht in der Aufnahmepflicht: **Starfish Crunch**, **Cross Knee Planks** und **Frog Crunches**. Die übrigen Übungen der Woche haben bereits verknüpfte Demos; für sie ist in dieser Liste kein bekannter Video-Fehler dokumentiert.
