# Ietjes core oefeningen

Dagelijkse core-training van 15 minuten met een 6-weken opbouw, als installeerbare PWA.

## Online

De app staat in de map `ietje/` van de Setboek-repo en is bereikbaar op
**https://grenburg.github.io/Setboek/ietje/**

De service worker van Setboek slaat deze map over, en beide apps ruimen alleen hun eigen cache op.

## Installeren op de telefoon

- **Android (Chrome):** open de link en kies in het menu ⋮ **App installeren** (of **Toevoegen aan startscherm**).
- **iPhone (Safari):** open de link, tik op Delen en kies **Zet op beginscherm**.

Na de eerste keer openen werkt de app ook zonder internet.

## Updates

Pas `index.html` aan en verhoog `VERSION` in `sw.js` (bijvoorbeeld naar `ietje-core-v2`). De telefoon haalt de nieuwe versie op bij de volgende keer openen met internet.

## Bestanden

| Bestand | Wat het doet |
|---|---|
| `index.html` | De hele app: schema, oefeningen en timer |
| `manifest.webmanifest` | Naam, kleuren en icoontjes voor installatie |
| `sw.js` | Service worker voor offline gebruik |
| `icons/` | App-icoontjes (192, 512, maskable, Apple) |

Voortgang wordt opgeslagen in de browser van de telefoon zelf. De app verwijderen of de sitegegevens wissen zet de voortgang terug op nul.
