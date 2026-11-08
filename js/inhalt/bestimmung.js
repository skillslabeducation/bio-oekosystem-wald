/* Station: Blätter bestimmen mit einem Bestimmungsschlüssel
   (Die Kopie aus dem Lernzeitband fehlt; eigener dichotomer Schlüssel für typische Waldbäume.) */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  W.stations = W.stations || [];

  W.TREES = {
    kastanie: { name: 'Rosskastanie', merkmale: 'zusammengesetzt, gefingert: 5 bis 7 große Blättchen an einem Punkt, Rand gesägt', frucht: 'Kastanien in einer stacheligen Hülle' },
    esche: { name: 'Gemeine Esche', merkmale: 'zusammengesetzt, gefiedert: 9 bis 15 Blättchen paarweise an einer Mittelachse, Rand gesägt', frucht: 'geflügelte Nüsschen' },
    eiche: { name: 'Stieleiche', merkmale: 'einfach, gelappt mit abgerundeten Lappen, Blattstiel sehr kurz', frucht: 'Eicheln an langen Stielen' },
    ahorn: { name: 'Ahorn', merkmale: 'einfach, handförmig gelappt mit meist 5 spitzen Lappen, Blattstiel lang', frucht: 'Propeller-Früchte („Nasenzwicker“)' },
    buche: { name: 'Rotbuche', merkmale: 'einfach, eiförmig, Rand glatt (ganzrandig) und leicht gewellt', frucht: 'Bucheckern' },
    linde: { name: 'Winterlinde', merkmale: 'einfach, herzförmig, am Grund oft schief, Rand gesägt', frucht: 'Nüsschen an einem Flugblatt' },
    birke: { name: 'Hängebirke', merkmale: 'einfach, dreieckig bis rautenförmig, lang zugespitzt, doppelt gesägt', frucht: 'winzige geflügelte Nüsschen' },
    hainbuche: { name: 'Hainbuche', merkmale: 'einfach, eiförmig-länglich, doppelt gesägt, Seitenadern auffällig parallel', frucht: 'Nüsschen mit dreilappigem Flügel' }
  };

  /* Dichotomer Schlüssel: jede Frage hat genau zwei Möglichkeiten (a, b). */
  W.KEY_START = 'f1';
  W.KEY = {
    f1: {
      nr: 1, frage: 'Wie ist das Blatt gebaut?',
      a: { text: 'Das Blatt besteht aus mehreren einzelnen Blättchen (zusammengesetzt).', bild: 'zusammengesetzt', next: 'f2' },
      b: { text: 'Das Blatt hat eine einzige, zusammenhängende Blattfläche (einfach).', bild: 'einfach', next: 'f3' }
    },
    f2: {
      nr: 2, frage: 'Wie sitzen die Blättchen am Stiel?',
      a: { text: 'Alle Blättchen entspringen an einem Punkt, wie die Finger einer Hand (gefingert).', bild: 'gefingert', result: 'kastanie' },
      b: { text: 'Die Blättchen sitzen paarweise links und rechts an einer Mittelachse (gefiedert).', bild: 'gefiedert', result: 'esche' }
    },
    f3: {
      nr: 3, frage: 'Ist das Blatt gelappt?',
      a: { text: 'Ja: Das Blatt ist tief eingebuchtet und hat Lappen (gelappt).', bild: 'gelappt', next: 'f4' },
      b: { text: 'Nein: Das Blatt hat keine Lappen.', bild: 'ungelappt', next: 'f5' }
    },
    f4: {
      nr: 4, frage: 'Wie sehen die Lappen aus?',
      a: { text: 'Die Lappen sind abgerundet. Der Blattstiel ist sehr kurz.', bild: 'lappen-rund', result: 'eiche' },
      b: { text: 'Die Lappen laufen spitz zu, meist sind es 5 wie bei einer Hand. Der Blattstiel ist lang.', bild: 'lappen-spitz', result: 'ahorn' }
    },
    f5: {
      nr: 5, frage: 'Wie sieht der Blattrand aus?',
      a: { text: 'Der Rand ist glatt, höchstens leicht gewellt (ganzrandig).', bild: 'ganzrandig', result: 'buche' },
      b: { text: 'Der Rand hat viele kleine Zähnchen (gesägt).', bild: 'gesaegt', next: 'f6' }
    },
    f6: {
      nr: 6, frage: 'Ist das Blatt herzförmig?',
      a: { text: 'Ja: Das Blatt ist herzförmig, am Grund oft etwas schief.', bild: 'herz', result: 'linde' },
      b: { text: 'Nein: Das Blatt ist nicht herzförmig.', bild: 'nichtherz', next: 'f7' }
    },
    f7: {
      nr: 7, frage: 'Welche Form hat das Blatt?',
      a: { text: 'Klein, dreieckig bis rautenförmig, mit langer Spitze.', bild: 'raute', result: 'birke' },
      b: { text: 'Eiförmig-länglich. Die Seitenadern laufen auffällig parallel, das Blatt wirkt wie gefaltet.', bild: 'parallel', result: 'hainbuche' }
    }
  };

  W.stations.push({
    id: 'bestimmung',
    title: 'Blätter bestimmen',
    short: 'Blätter bestimmen',
    kompetenz: 'Ich weiß, wie man mit einem Bestimmungsschlüssel ein Blatt bestimmt.',
    intro: 'Werde zur Blatt-Detektivin oder zum Blatt-Detektiv: Mit dem Bestimmungsschlüssel findest du jeden Baum.',
    learn: [
      {
        t: 'text', h: 'Wie ein Detektiv',
        p: [
          'Mit einem <b>Bestimmungsschlüssel</b> findest du heraus, von welchem Baum ein Blatt stammt. Du beginnst bei Frage 1. Jede Frage hat <b>zwei Möglichkeiten</b>. Du liest beide, vergleichst sie mit deinem Blatt und wählst die passende. Sie führt dich zur nächsten Frage, bis am Ende ein Name steht.',
          'Dafür musst du die Fachwörter kennen, mit denen man Blätter beschreibt.'
        ]
      },
      { t: 'widget', w: 'blattteile' },
      { t: 'widget', w: 'begriffe' },
      {
        t: 'text', h: 'Der Schlüssel im Überblick',
        p: ['So ist der Schlüssel aufgebaut. Du musst ihn nicht auswendig lernen. Wichtig ist, dass du ihn benutzen kannst.']
      },
      { t: 'widget', w: 'schluessel' },
      {
        t: 'merke',
        html: 'So gehst du vor: <b>1.</b> Bei Frage 1 beginnen. <b>2.</b> Immer <b>beide</b> Möglichkeiten lesen. <b>3.</b> Genau hinschauen und die passende wählen. <b>4.</b> Dem Hinweis zur nächsten Frage folgen, bis ein Name erscheint. <b>5.</b> Das Ergebnis mit einem Bild oder der Beschreibung vergleichen.'
      },
      {
        t: 'fact', h: 'Wusstest du?',
        html: 'Die <b>Hainbuche</b> ist trotz ihres Namens gar keine Buche. Sie ist mit der Birke verwandt. Beim Blatt erkennst du den Unterschied sofort: Die Rotbuche hat einen glatten Rand, die Hainbuche einen doppelt gesägten.'
      }
    ],
    practice: [
      {
        id: 'be-begriffe', type: 'sort', h: 'Fachwörter-Training',
        task: 'Welche Beschreibung passt zu welchem Blatt? Ordne jedes Blatt zu.',
        visual: true,
        buckets: [
          { id: 'gefingert', label: 'zusammengesetzt: gefingert' },
          { id: 'gefiedert', label: 'zusammengesetzt: gefiedert' },
          { id: 'gelappt', label: 'einfach: gelappt' },
          { id: 'ganzrandig', label: 'einfach: ohne Lappen, Rand glatt (ganzrandig)' },
          { id: 'gesaegt', label: 'einfach: ohne Lappen, Rand gesägt' }
        ],
        items: [
          { id: 'b1', label: 'Blatt A', leaf: 'kastanie', bucket: 'gefingert', why: 'Rosskastanie: Die Blättchen entspringen an einem Punkt.' },
          { id: 'b2', label: 'Blatt B', leaf: 'esche', bucket: 'gefiedert', why: 'Esche: Die Blättchen sitzen paarweise an einer Achse.' },
          { id: 'b3', label: 'Blatt C', leaf: 'eiche', bucket: 'gelappt', why: 'Eiche: tiefe Buchten, runde Lappen.' },
          { id: 'b4', label: 'Blatt D', leaf: 'ahorn', bucket: 'gelappt', why: 'Ahorn: handförmig mit spitzen Lappen.' },
          { id: 'b5', label: 'Blatt E', leaf: 'buche', bucket: 'ganzrandig', why: 'Buche: glatter, leicht gewellter Rand.' },
          { id: 'b6', label: 'Blatt F', leaf: 'linde', bucket: 'gesaegt', why: 'Linde: herzförmig mit gesägtem Rand.' },
          { id: 'b7', label: 'Blatt G', leaf: 'birke', bucket: 'gesaegt', why: 'Birke: doppelt gesägter Rand.' }
        ]
      },
      {
        id: 'be-detektiv', type: 'keywalk', h: 'Blatt-Detektiv',
        task: 'Bestimme fünf Blätter mit dem Schlüssel. Schau dir das Fundstück genau an und wähle bei jeder Frage eine Möglichkeit.',
        rounds: 5
      },
      {
        id: 'be-quiz', type: 'quiz', h: 'Schlüssel-Fragen',
        task: 'Vier Fragen zum Bestimmen.',
        questions: [
          { kind: 'single', q: 'Wie viele Möglichkeiten gibt es bei jeder Frage eines Bestimmungsschlüssels?', options: ['eine', 'zwei', 'drei', 'so viele wie Bäume'], answer: 1, why: 'Ein Bestimmungsschlüssel stellt immer zwei Möglichkeiten gegenüber.' },
          { kind: 'single', q: 'Ein Blatt ist gelappt. Was musst du als Nächstes klären, um Eiche und Ahorn zu unterscheiden?', options: ['Ob die Lappen rund oder spitz sind', 'Ob das Blatt grün ist', 'Wie alt der Baum ist', 'Ob das Blatt gefiedert ist'], answer: 0, why: 'Runde Lappen und kurzer Stiel: Eiche. Spitze Lappen und langer Stiel: Ahorn.' },
          { kind: 'single', q: 'Ein Blatt besteht aus sieben Blättchen, die alle an einem Punkt entspringen. Welcher Baum ist es?', options: ['Esche', 'Rosskastanie', 'Linde', 'Buche'], answer: 1, why: 'Gefingert mit 5 bis 7 Blättchen: Rosskastanie.' },
          { kind: 'tf', q: 'Wenn ein Blatt gesägt ist, ist es auf jeden Fall eine Birke.', answer: false, why: 'Falsch. Linde, Hainbuche, Kastanie und Esche haben auch gesägte Ränder. Du musst den Schlüssel bis zum Ende durchgehen.' }
        ]
      }
    ],
    explain: [
      {
        id: 'be-e1', op: 'Beschreibe',
        task: 'Beschreibe, wie man mit einem Bestimmungsschlüssel ein Blatt bestimmt.',
        model: 'Man beginnt immer bei <b>Frage 1</b>. Jede Frage bietet <b>zwei Möglichkeiten</b>. Man liest beide genau durch und vergleicht sie mit dem Blatt, zum Beispiel ob es einfach oder zusammengesetzt ist. Dann wählt man die passende Möglichkeit und geht zu der <b>Frage, auf die sie verweist</b>. Das wiederholt man so lange, bis ein <b>Name</b> erscheint. Zum Schluss vergleicht man das Ergebnis mit einer Abbildung oder Beschreibung.',
        points: [
          'Bei Frage 1 beginnen.',
          'Immer beide Möglichkeiten lesen und mit dem Blatt vergleichen.',
          'Die passende wählen und zur angegebenen Frage weitergehen.',
          'Wiederholen, bis ein Name erscheint, und das Ergebnis überprüfen.'
        ],
        starter: ['Zuerst …', 'Dann …', 'Das macht man so lange, bis …']
      },
      {
        id: 'be-e2', op: 'Erkläre',
        task: 'Ein Mitschüler sagt: „Das Blatt ist gelappt, also ist es eine Eiche.“ Erkläre, warum das nicht reicht.',
        model: 'Nicht nur die Eiche hat gelappte Blätter, sondern zum Beispiel auch der <b>Ahorn</b>. Ein einziges Merkmal reicht deshalb nicht aus. Man muss weitere Merkmale vergleichen: Bei der Eiche sind die Lappen <b>abgerundet</b> und der Stiel ist sehr kurz, beim Ahorn sind die Lappen <b>spitz</b> und der Stiel ist lang. Darum sollte man den Bestimmungsschlüssel immer <b>bis zum Ende</b> durchgehen.',
        points: [
          'Auch andere Bäume (z. B. Ahorn) haben gelappte Blätter.',
          'Weitere Merkmale nötig: Lappen rund oder spitz, Stiel kurz oder lang.',
          'Den Schlüssel immer bis zum Ende durchgehen.'
        ],
        starter: ['Das reicht nicht, weil …', 'Man muss außerdem …']
      }
    ],
    merke: [
      '<b>Bestimmungsschlüssel:</b> Schritt für Schritt zwischen zwei Möglichkeiten entscheiden, bis der Name erscheint. Immer beide Möglichkeiten lesen!',
      'Blattteile: Blattspreite (Blattfläche), Blattstiel, Blattrand, Mittelrippe und Blattadern.',
      'Fachwörter: <b>einfach</b> oder <b>zusammengesetzt</b> (gefingert, gefiedert); Rand <b>ganzrandig</b>, <b>gesägt</b> oder <b>gelappt</b>; Formen: herz-, ei-, rautenförmig.',
      'Rosskastanie: gefingert. Esche: gefiedert. Eiche: runde Lappen. Ahorn: spitze Lappen. Buche: glatter Rand. Linde: herzförmig. Birke: rautenförmig, doppelt gesägt. Hainbuche: doppelt gesägt, parallele Adern.'
    ]
  });
})();
