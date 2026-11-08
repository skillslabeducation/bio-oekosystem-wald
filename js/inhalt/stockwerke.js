/* Station: Stockwerke des Waldes (Quelle: Infografik 4.2 "Stockwerke des Waldes" + Lernzettel) */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  W.stations = W.stations || [];

  W.LAYERS = [
    {
      id: 'wurzel', name: 'Wurzelschicht', hoehe: 'im Boden', haus: 'Keller',
      besteht: 'Wurzeln der Bäume und anderen Pflanzen, dazu Humus und Mineralstoffe.',
      tiere: 'Zersetzer (Destruenten): Bakterien, Pilze, Regenwürmer, Tausendfüßer',
      info: 'Die Zersetzer bauen abgestorbenes Material wie Laub und Totholz ab. Dadurch stehen den Pflanzen wichtige Mineralstoffe zur Verfügung.'
    },
    {
      id: 'moos', name: 'Moosschicht', hoehe: 'bis 20 cm', haus: 'Erdgeschoss',
      besteht: 'Moose, Pilze und niedrig wachsende Blütenpflanzen.',
      tiere: 'Spinnen, Insekten, Waldeidechse, Rötelmaus',
      info: 'Die Moosschicht bietet vielen kleinen Tieren Nahrung und Schutz. Moos speichert außerdem viel Wasser.'
    },
    {
      id: 'kraut', name: 'Krautschicht', hoehe: 'bis 1,5 m', haus: 'Erdgeschoss',
      besteht: 'Kräuter wie Bärlauch und Waldmeister, Farne und aufkeimende junge Bäume.',
      tiere: 'zahlreiche Insekten, zum Beispiel Schmetterlinge und Käfer',
      info: 'Die Krautschicht ist vor allem eine Nahrungsquelle für zahlreiche Insekten.'
    },
    {
      id: 'strauch', name: 'Strauchschicht', hoehe: 'bis 5 m', haus: '1. Etage',
      besteht: 'Sträucher wie Holunder, Hasel und Weißdorn.',
      tiere: 'Vögel (Nistplatz), Reh, Haselmaus',
      info: 'Das dichte Geflecht aus Ästen und Zweigen bietet Tieren Schutz und vor allem Vögeln einen sicheren Nistplatz. Blätter, Blüten und Früchte sind Nahrung für Rehe oder die Haselmaus.'
    },
    {
      id: 'baum', name: 'Baumschicht', hoehe: 'bis 40 m', haus: 'obere Etagen und Dach',
      besteht: 'Die Kronen der großen Bäume, zum Beispiel Buche, Eiche, Fichte.',
      tiere: 'Insekten, Spinnen, Vögel (z. B. Buntspecht, Mäusebussard), Säugetiere (z. B. Eichhörnchen)',
      info: 'Die Baumkronen bilden das Dach des Waldes. Wie dicht dieses Kronendach ist, bestimmt, wie viel Licht in die Schichten darunter fällt.'
    }
  ];

  W.stations.push({
    id: 'stockwerke',
    title: 'Die Stockwerke des Waldes',
    short: 'Stockwerke',
    kompetenz: 'Ich kann die Stockwerke des Waldes benennen und einzeichnen, beschreiben, woraus sie bestehen, und typische Lebewesen nennen.',
    intro: 'Der Wald ist gebaut wie ein Hochhaus. Lerne seine fünf Stockwerke kennen und wer darin wohnt.',
    learn: [
      {
        t: 'text', h: 'Ein Hochhaus aus Pflanzen',
        p: [
          'Von Weitem sieht der Wald aus wie eine grüne Wand. Erst von Nahem erkennst du: Hier wachsen nicht nur hohe Bäume, sondern auch Sträucher, Kräuter und Moose. Sie sind unterschiedlich hoch und bilden <b>fünf Schichten</b>, die Stockwerke des Waldes.',
          'Tippe auf ein Stockwerk, um zu sehen, was dort wächst und wer dort lebt.'
        ]
      },
      { t: 'widget', w: 'layers' },
      {
        t: 'merke',
        html: '<b>Von unten nach oben:</b> Wurzelschicht, Moosschicht (bis 20 cm), Krautschicht (bis 1,5 m), Strauchschicht (bis 5 m), Baumschicht (bis 40 m).<br><span class="eselsbruecke">Eselsbrücke: <b>W</b>ilde <b>M</b>äuse <b>k</b>auen <b>s</b>üße <b>B</b>eeren.</span>'
      },
      {
        t: 'text', h: 'Der Vergleich mit dem Haus',
        p: [
          'Die Wurzelschicht ist der <b>Keller</b>. Moos- und Krautschicht bilden zusammen das <b>Erdgeschoss</b>. Die Strauchschicht ist die <b>1. Etage</b>. Die Baumschicht umfasst mehrere Etagen, und die Baumkronen sind das <b>Dach</b>.'
        ]
      },
      {
        t: 'reveal',
        q: 'Im Frühling blühen am Waldboden viele Blumen, im Sommer kaum noch. Woran liegt das?',
        a: 'Am <b>Licht</b>. Im Frühling tragen die Bäume noch keine Blätter, und das Sonnenlicht erreicht den Boden. Frühblüher wie Buschwindröschen und Bärlauch nutzen genau diese Zeit. Im Sommer schließt sich das Kronendach, und am Boden wird es dunkel.'
      },
      {
        t: 'fact', h: 'Wusstest du?',
        html: '<b>Baumstumpf:</b> In 10 bis 15 Jahren verwandelt sich ein Baumstumpf in Humus. Daran arbeiten unzählige Zersetzer.<br><b>Ameisenhügel:</b> Die Kleine Rote Waldameise frisst vor allem Forstschädlinge. Darum stehen ihre Hügel unter Schutz.'
      }
    ],
    practice: [
      {
        id: 'sw-reihe', type: 'order', h: 'Bau den Wald auf',
        task: 'Tippe die Stockwerke nacheinander an. Der Wald wächst von unten nach oben: Das erste Kärtchen landet ganz unten.',
        bottomUp: true,
        items: [
          { id: 'w', label: 'Wurzelschicht' },
          { id: 'm', label: 'Moosschicht' },
          { id: 'k', label: 'Krautschicht' },
          { id: 's', label: 'Strauchschicht' },
          { id: 'b', label: 'Baumschicht' }
        ]
      },
      {
        id: 'sw-pflanzen', type: 'sort', h: 'Was wächst wo?',
        task: 'Ordne jede Pflanze ihrem Stockwerk zu. Tippe erst ein Kärtchen an, dann das Stockwerk. Du kannst die Kärtchen auch ziehen.',
        buckets: [
          { id: 'wurzel', label: 'Wurzelschicht' },
          { id: 'moos', label: 'Moosschicht' },
          { id: 'kraut', label: 'Krautschicht' },
          { id: 'strauch', label: 'Strauchschicht' },
          { id: 'baum', label: 'Baumschicht' }
        ],
        items: [
          { id: 'p1', label: 'Baumwurzeln', bucket: 'wurzel', why: 'Wurzeln stecken im Boden, also in der Wurzelschicht.' },
          { id: 'p2', label: 'Moose', bucket: 'moos', why: 'Moose sind die Namensgeber der Moosschicht (bis 20 cm).' },
          { id: 'p3', label: 'Bärlauch', bucket: 'kraut', why: 'Bärlauch ist ein Kraut der Krautschicht.' },
          { id: 'p4', label: 'Waldmeister', bucket: 'kraut', why: 'Waldmeister ist ein typisches Kraut der Krautschicht.' },
          { id: 'p5', label: 'Farn', bucket: 'kraut', why: 'Farne gehören zur Krautschicht (bis 1,5 m).' },
          { id: 'p6', label: 'Holunder', bucket: 'strauch', why: 'Holunder ist ein Strauch (bis 5 m).' },
          { id: 'p7', label: 'Hasel', bucket: 'strauch', why: 'Die Hasel ist ein typischer Strauch.' },
          { id: 'p8', label: 'Weißdorn', bucket: 'strauch', why: 'Weißdorn ist ein typischer Strauch.' },
          { id: 'p9', label: 'Buche', bucket: 'baum', why: 'Die Krone einer ausgewachsenen Buche gehört zur Baumschicht.' },
          { id: 'p10', label: 'Fichte', bucket: 'baum', why: 'Die Fichte ist ein hoher Baum der Baumschicht.' }
        ]
      },
      {
        id: 'sw-tiere', type: 'sort', h: 'Wer wohnt wo?',
        task: 'In welchem Stockwerk findet das Tier vor allem Nahrung oder Schutz?',
        buckets: [
          { id: 'wurzel', label: 'Wurzelschicht' },
          { id: 'moos', label: 'Moosschicht' },
          { id: 'kraut', label: 'Krautschicht' },
          { id: 'strauch', label: 'Strauchschicht' },
          { id: 'baum', label: 'Baumschicht' }
        ],
        items: [
          { id: 't1', label: 'Regenwurm', bucket: 'wurzel', why: 'Der Regenwurm lebt im Boden und zersetzt Laub.' },
          { id: 't2', label: 'Tausendfüßer', bucket: 'wurzel', why: 'Tausendfüßer sind Zersetzer in der Wurzelschicht.' },
          { id: 't3', label: 'Waldeidechse', bucket: 'moos', why: 'Die Waldeidechse findet in der Moosschicht Nahrung und Schutz.' },
          { id: 't4', label: 'Rötelmaus', bucket: 'moos', why: 'Die Rötelmaus lebt in der Moosschicht.' },
          { id: 't5', label: 'Schmetterling an Waldblumen', bucket: 'kraut', why: 'Die Krautschicht ist eine Nahrungsquelle für zahlreiche Insekten.' },
          { id: 't6', label: 'Haselmaus', bucket: 'strauch', why: 'Die Haselmaus frisst Blüten und Früchte der Sträucher.' },
          { id: 't7', label: 'Reh', bucket: 'strauch', why: 'Laut Infografik sind Blätter, Blüten und Früchte der Sträucher wichtige Nahrung für Rehe.' },
          { id: 't8', label: 'Eichhörnchen', bucket: 'baum', why: 'Das Eichhörnchen lebt in den Baumkronen.' },
          { id: 't9', label: 'Buntspecht', bucket: 'baum', why: 'Der Buntspecht hämmert an Baumstämmen und lebt in der Baumschicht.' }
        ]
      },
      {
        id: 'sw-quiz', type: 'quiz', h: 'Schnell gefragt',
        task: 'Fünf kurze Fragen zu den Stockwerken.',
        questions: [
          { kind: 'single', q: 'Wie hoch wird die Krautschicht?', options: ['bis 20 cm', 'bis 1,5 m', 'bis 5 m', 'bis 40 m'], answer: 1, why: 'Krautschicht: bis 1,5 m. Moosschicht bis 20 cm, Strauchschicht bis 5 m, Baumschicht bis 40 m.' },
          { kind: 'single', q: 'Welches Stockwerk entspricht im Haus-Vergleich dem Keller?', options: ['Moosschicht', 'Wurzelschicht', 'Krautschicht', 'Strauchschicht'], answer: 1, why: 'Die Wurzelschicht liegt unter der Erde, wie ein Keller.' },
          { kind: 'single', q: 'Was bestimmt vor allem, wie viel Licht in die unteren Schichten fällt?', options: ['Die Dichte des Kronendachs', 'Die Zahl der Regenwürmer', 'Die Höhe der Moose', 'Die Farbe der Pilze'], answer: 0, why: 'Je dichter das Kronendach der Baumschicht, desto weniger Licht kommt unten an.' },
          { kind: 'tf', q: 'Die Strauchschicht bietet vor allem Vögeln einen sicheren Nistplatz.', answer: true, why: 'Richtig: Das dichte Geflecht aus Ästen und Zweigen schützt die Nester.' },
          { kind: 'tf', q: 'In der Wurzelschicht leben keine Tiere, weil es dort dunkel ist.', answer: false, why: 'Falsch: Dort leben viele Zersetzer, zum Beispiel Regenwürmer, Tausendfüßer, Pilze und Bakterien.' }
        ]
      }
    ],
    explain: [
      {
        id: 'sw-e1', op: 'Erkläre',
        task: 'Erkläre, warum ein Baum im Laufe seines Lebens allen Schichten des Waldes angehört.',
        model: 'Ein Baum wächst von ganz klein nach ganz groß. Als Keimling ist er nur wenige Zentimeter hoch und gehört zur <b>Moosschicht</b>. Als junges Bäumchen wächst er in der <b>Krautschicht</b> (bis 1,5 m), danach in der <b>Strauchschicht</b> (bis 5 m). Erst wenn er ausgewachsen ist, reicht seine Krone in die <b>Baumschicht</b>. Seine Wurzeln stecken die ganze Zeit in der <b>Wurzelschicht</b>.',
        points: [
          'Der Baum wächst im Laufe seines Lebens von klein nach groß.',
          'Als Keimling gehört er zur Moosschicht, als junges Bäumchen zur Krautschicht.',
          'Später gehört er zur Strauchschicht, ausgewachsen zur Baumschicht.',
          'Seine Wurzeln liegen immer in der Wurzelschicht.'
        ],
        starter: ['Ein Baum wächst …', 'Als Keimling …', 'Wenn er ausgewachsen ist, …', 'Seine Wurzeln …']
      },
      {
        id: 'sw-e2', op: 'Stelle eine Vermutung auf',
        task: 'Die Pflanzen der Moos- und Krautschicht wachsen je nach Jahreszeit unterschiedlich stark. Stelle eine Vermutung auf, was der Grund dafür sein könnte.',
        model: 'Ich vermute, dass es am <b>Licht</b> liegt. Pflanzen brauchen Licht zum Wachsen. Im <b>Frühling</b> haben die Bäume noch keine Blätter, deshalb fällt viel Sonnenlicht auf den Boden, und die Pflanzen dort wachsen und blühen stark (Frühblüher). Im <b>Sommer</b> ist das Kronendach dicht. Dann kommt kaum noch Licht unten an, und die Pflanzen der Moos- und Krautschicht wachsen weniger.',
        points: [
          'Pflanzen brauchen Licht zum Wachsen.',
          'Im Frühling haben die Bäume noch keine Blätter: viel Licht am Boden.',
          'Im Sommer ist das Kronendach dicht: wenig Licht am Boden.',
          'Frühblüher nutzen die helle Zeit vor dem Laubaustrieb.'
        ],
        starter: ['Ich vermute, dass …', 'Im Frühling …', 'Im Sommer dagegen …']
      },
      {
        id: 'sw-e3', op: 'Beschreibe',
        task: 'Beschreibe die Strauchschicht: Woraus besteht sie, und welche Bedeutung hat sie für Tiere?',
        model: 'Die Strauchschicht wird <b>bis zu 5 m</b> hoch. Typische Pflanzen sind <b>Holunder, Hasel und Weißdorn</b>. Das dichte Geflecht aus Ästen und Zweigen bietet vielen Tieren <b>Schutz</b> und vor allem Vögeln einen sicheren <b>Nistplatz</b>. Blätter, Blüten und Früchte sind eine wichtige <b>Nahrungsquelle</b>, zum Beispiel für Rehe oder die Haselmaus.',
        points: [
          'Höhe: bis 5 m.',
          'Typische Pflanzen: Holunder, Hasel, Weißdorn.',
          'Dichtes Geflecht: Schutz und sicherer Nistplatz für Vögel.',
          'Blätter, Blüten, Früchte: Nahrung für z. B. Reh und Haselmaus.'
        ],
        starter: ['Die Strauchschicht ist …', 'Dort wachsen …', 'Für Tiere ist sie wichtig, weil …']
      }
    ],
    merke: [
      'Der Wald hat fünf Stockwerke: <b>Wurzel-, Moos-, Kraut-, Strauch- und Baumschicht</b>. Eselsbrücke: <i>Wilde Mäuse kauen süße Beeren.</i>',
      'Höhen: Moosschicht bis 20 cm, Krautschicht bis 1,5 m, Strauchschicht bis 5 m, Baumschicht bis 40 m.',
      'Wurzelschicht: Wurzeln und Zersetzer (Bakterien, Pilze, Regenwürmer, Tausendfüßer). Moosschicht: Moose, Pilze, niedrige Blütenpflanzen; Waldeidechse, Rötelmaus. Krautschicht: Bärlauch, Waldmeister, Farne; viele Insekten. Strauchschicht: Holunder, Hasel, Weißdorn; Vögel, Reh, Haselmaus. Baumschicht: Baumkronen; Vögel, Eichhörnchen, Insekten.',
      'Das Kronendach bestimmt, wie viel Licht in die unteren Schichten fällt.'
    ]
  });
})();
