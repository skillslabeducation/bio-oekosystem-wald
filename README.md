# Expedition Wald – Lern- und Übungsseite Ökosystem Wald (Klasse 7)

Interaktive Lernseite zur Vorbereitung auf eine Biologie-Klassenarbeit, optimiert für Tablets.

**Online:** https://skillslabeducation.github.io/bio-oekosystem-wald/

## Inhalt

Sechs Stationen auf einer illustrierten Waldkarte, jeweils mit *Entdecken*, *Üben* und *Erklären*:

1. **Stockwerke des Waldes**: Wurzel-, Moos-, Kraut-, Strauch- und Baumschicht, Höhen, typische Pflanzen und Tiere
2. **Wer frisst wen? Der Stoffkreislauf**: Produzenten, Konsumenten, Destruenten, Fotosynthese, Nahrungskette und -netz
3. **Biologisches Gleichgewicht**: Räuber-Beute-Simulator (Borkenkäfer und Buntspecht), Pfeilschema, Wirkungsketten
4. **Konkurrenz**: Buntspecht und Grünspecht im Vergleich
5. **Ökologische Nische**: der Bäckerei-Vergleich, Überlebensstrategien
6. **Blätter bestimmen**: Bestimmungsschlüssel für acht heimische Laubbäume, Blatt-Detektiv

Dazu: Försterprüfung (15 gemischte Fragen, Walddiplom ab 80 %), Feldbuch mit allen Merksätzen zum Ausdrucken, Operatoren-Übersicht und Lernplan.

Damit es spannend bleibt: Försterin Lind führt mit Aufträgen durch die Stationen, der Simulator hat eine echte Mission, falsch beantwortete Prüfungsfragen landen im Fehler-Rucksack, der eigene Baum wächst mit jedem Stempel vom Keimling zum Waldriesen, und gesammelte Eicheln schalten Wald-Geheimnisse frei.

## Technik

- Reines HTML, CSS und JavaScript, ohne Build-Schritt und ohne externe Dienste.
- Alle Illustrationen sind selbst gezeichnetes SVG (Blätter werden per Code erzeugt).
- Fortschritt, Eicheln und Antworten werden nur lokal im Browser gespeichert (localStorage).
- Schriften: Alegreya und Alegreya Sans (SIL Open Font License), lokal in `fonts/`.
- Auf dem iPad: In Safari „Teilen → Zum Home-Bildschirm“ wählen, dann startet die Seite wie eine App.

## Tests

```
node tests/inhalt.test.js
```

Prüft unter anderem, dass jede Übung eine gültige Lösung hat, jeder Baum im Bestimmungsschlüssel genau einmal erreichbar ist und das Räuber-Beute-Modell stabil schwingt.
