# AGENTS.md — tiefsee-baum

Übergeordnet: `~/Development/harness/AGENTS.md`. Dies hier ist die Projekt-Init: gilt für jede Session.

**Projekt:** "Der Baum — eine Reise in die Tiefe". Scrollytelling, Baum versinkt vom Wasserspiegel bis ins Challenger-Tief (10.935 m).
**Stack (fix):** Vanilla HTML/CSS/JS, kein Build, kein Framework, keine neuen Abhängigkeiten.
**Start:** `python3 -m http.server 8765` → http://localhost:8765

| Datei | Inhalt |
|---|---|
| `index.html` | Struktur, Zonen, Lebewesen (SVG-Linienzeichnungen) |
| `styles.css` | Tokens (Akzent, Zonenfarben), Gestaltung, Filmkorn, Responsive, Reduced Motion |
| `tree.js` | Durchsichtiger Baum (prozedural, fester Seed), Blätter, Wurzeln, 1 Gefühl/Zone |
| `app.js` | Scroll→Tiefe, Ozean-Canvas, Lichtabsorption, ROV-Lampe, HUD, Navigation, Modal |
| `data.js` | Gefühle (DE/AR, eins pro Zone) + wissenschaftliche Fakten |

Branch `variant/fotos`: Alternative mit echten Fotos (Wikimedia/NOAA) statt SVG.

## Nordstern (wichtiger als jedes Feature)

Die Seite lässt etwas FÜHLEN, sie informiert nicht: Stille, Einsamkeit, Druck, Ehrfurcht, am Ende Trost.
Der Baum ist ein Leben, das langsam loslässt. Jede Zone hat genau EINE Emotion (in `data.js`, DE/AR);
Licht, Farbe, Ton, Tempo und Textlänge dienen nur ihr.

<!-- TODO Ahmad: konkrete Kernemotion eintragen (z.B. Trauer, Loslassen, Demut) — stärkster Hebel -->

## Dramaturgie (Scroll = Zeit)

- Tempo: oben schneller/heller, mit jeder Zone langsamer, weniger Text, mehr Leere.
- Pausen nach starken Momenten: leerer Raum (nur Dunkel + Atem).
- Maximal 1–2 kurze Sätze pro Moment; Fakten als Gegengewicht (Zahl + ein Satz), kein Lexikon.
- Finale (10.935 m): ruhiger, ehrlicher Schlusssatz. Kein Kitsch, kein CTA, keine Social-Buttons.
- Sound optional: nur nach Klick, stumm als Default, Lautstärke sinkt mit Tiefe, Quellen CC0/PD oder Web-Audio-Synthese, Lizenz notieren.

## Look (verbindlich)

- Echte Texturen/Fotografie, wissenschaftlich korrekt: Lichtabfall nach Tiefe (~200 m / ~1000 m), Farbverlust Rot→Orange→Gelb→Grün→Blau, Druck/Temperatur nur mit realen Werten.
- Keine "KI-Ästhetik": keine Glas-/Glow-Effekte, keine dekorativen Verläufe, kein Neon. Einzige Ausnahme: Biolumineszenz als echtes Phänomen, sparsam, punktuell, nur wo das Tier sie wirklich hat.
- Verboten: Pink/Rosa, Orange, Gelb als Fläche, Ticker. Edle Stein-/Tiefseetöne.
- Akzent + Zonenfarben als zentrale CSS-Variablen.
- Typografie ruhig, groß, viel Weißraum; Arabisch (RTL) gleichwertig gesetzt.

## Qualität

- `prefers-reduced-motion` respektiert, Kontrast AA, Tastatur-Nav, Mobile 390px = vollwertiges Erlebnis.
- Performance: Bilder lazy + WebP/AVIF wo möglich, Canvas drosselt bei Tab-Wechsel, 60 fps, kein Layout-Shift.
- Quellen/Lizenzen der Fotos sichtbar im Abspann.

## Arbeitsweise (Token sparen)

1. Lies nur: `README.md`, `data.js`, Skills `frontend-design`, `frontend-review`, `performance-optimization`. Nichts darüber hinaus laden.
2. Bei größeren Änderungen zuerst ein "Emotionsprotokoll": pro Zone 1 Zeile (Emotion, Licht, Tempo, Text-Idee), max. 15 Zeilen, dann direkt umsetzen ohne Freigabe-Warten.
3. Gezielt ändern, keine Refactorings außerhalb des Scopes, keine Sub-Agents (scheitern hier), unabhängige Tool-Calls bündeln.
4. Alternativen (z.B. anderer Ton/Look) als Git-Branch, nie überschreiben.
5. Fragen nur bei echter Blockade; sonst Default wählen und im Bericht nennen.
6. Commit-Identität: "Ahmad Al Zoubi" <48965704+aazoubi@users.noreply.github.com>; vorher Credentials-Scan.

## Verifikation (einmal, selbst im Browser)

Headless-Browser: Screenshots bei 0 m / 200 m / 1000 m / 4000 m / 10.935 m in 390px und 1440px, einmal komplett durchscrollen (Console-Errors, Ruckeln), RTL-Check, Reduced-Motion-Check. Fehler sofort beheben, kein Deploy ohne Freigabe.

## Abschluss

Bericht max. 15 Zeilen: emotionale Änderungen, gewählte Defaults, offene Punkte.
