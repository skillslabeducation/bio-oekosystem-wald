/* Försterin Lind: Aufträge pro Station, Sprüche, Wald-Geheimnisse (mit Eicheln freischalten). */
(function () {
  'use strict';
  var W = (window.W = window.W || {});

  W.AUFTRAG = {
    stockwerke: 'Willkommen in meinem Wald! Er ist gebaut wie ein Hochhaus. Dein Auftrag: Finde heraus, was in jedem der fünf Stockwerke wächst und wer dort wohnt.',
    nahrung: 'Hier dreht sich alles ums Fressen und Gefressenwerden. Dein Auftrag: Finde heraus, warum in meinem Wald ohne Sonne und ohne Zersetzer gar nichts laufen würde.',
    gleichgewicht: 'Letzten Sommer waren die Borkenkäfer los! Dein Auftrag: Löse im Simulator die Mission und bring den Wald zurück ins Gleichgewicht.',
    konkurrenz: 'Im Park wohnen ein Buntspecht und ein Grünspecht. Streiten die beiden ums Futter? Dein Auftrag: Vergleiche sie und fälle ein begründetes Urteil.',
    nische: 'Jedes Tier in meinem Wald hat einen Beruf. Dein Auftrag: Finde heraus, was ein Wildschwein mit einer Bäckerei zu tun hat.',
    bestimmung: 'Auf meinem Schreibtisch liegt ein Haufen Blätter, und ich weiß nicht mehr, von welchen Bäumen sie sind. Dein Auftrag: Bestimme sie mit dem Schlüssel.'
  };

  W.SPRUCH = {
    ueben: 'Jetzt bist du dran! Jede Übung bringt bis zu 10 Eicheln. Fehler sind erlaubt, dafür gibt es Tipps.',
    erklaeren: 'In der Klassenarbeit zählen ganze Sätze. Schreib erst selbst, dann vergleiche mit der Musterlösung.',
    richtig: ['Stark!', 'Genau so!', 'Das sitzt.', 'Prima, weiter so!', 'Richtig, gut aufgepasst!'],
    falsch: ['Knapp daneben. Lies dir die Erklärung durch.', 'Nicht schlimm, die Frage kommt in deinen Rucksack.', 'Hm, fast. Das merkst du dir jetzt.'],
    serie: 'Drei richtige hintereinander! Bonus-Eichel für dich.'
  };

  /* Wald-Geheimnisse: Eicheln schalten sie frei (es werden keine Eicheln verbraucht). */
  W.GEHEIMNISSE = [
    { ab: 30, icon: 'specht', titel: 'Der Trommler', text: 'Ein Buntspecht trommelt bis zu 20-mal pro Sekunde gegen einen Ast. So zeigt er anderen Spechten: Das ist mein Revier. Andere Vögel singen dafür.' },
    { ab: 60, icon: 'baum', titel: 'Vergessliche Gärtner', text: 'Eichhörnchen verstecken im Herbst unzählige Nüsse und Samen als Wintervorrat. Viele Verstecke finden sie nie wieder. Daraus wachsen neue Bäume.' },
    { ab: 90, icon: 'pilz', titel: 'Der Riese unter der Erde', text: 'Das größte bekannte Lebewesen der Erde ist ein Pilz: Ein Hallimasch in den USA wächst unterirdisch auf fast 10 Quadratkilometern. Das sind über 1000 Fußballfelder.' },
    { ab: 120, icon: 'kaefer', titel: 'Der Buchdrucker', text: 'Der häufigste Borkenkäfer in Fichtenwäldern heißt Buchdrucker. Seine Fraßgänge unter der Rinde sehen aus wie Schriftzeichen in einem Buch.' },
    { ab: 160, icon: 'laub', titel: 'Fleißige Ameisen', text: 'Ein großes Volk der Roten Waldameise kann an einem Tag bis zu 100 000 Insekten und Larven erbeuten. Darum stehen Ameisenhügel unter Schutz.' },
    { ab: 200, icon: 'konkurrenz', titel: 'Der lachende Specht', text: 'Der Grünspecht trommelt kaum. Er ruft lieber: Sein lautes „Klü-klü-klü“ klingt wie ein Lachen.' },
    { ab: 240, icon: 'blatt', titel: 'Geduldige Buchen', text: 'Eine Rotbuche kann über 300 Jahre alt werden. Bucheckern trägt sie erst, wenn sie etwa 40 bis 50 Jahre alt ist.' },
    { ab: 280, icon: 'wurm', titel: 'Darwins Würmer', text: 'Der berühmte Forscher Charles Darwin hat jahrzehntelang Regenwürmer untersucht. Er fand heraus: Sie graben den Boden um und machen ihn fruchtbar.' }
  ];
})();
