/* Station: Produzenten, Konsumenten, Destruenten – Nahrungskette und Stoffkreislauf
   (Ersatz für das fehlende AB "Die Stufen der Nahrungskette ergeben einen Stoffkreislauf";
   Stand Klasse 7, ergänzt um die Notizen vom Lernzettel: Fotosynthese, Sonnenenergie, Reste/Kot/Leichen) */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  W.stations = W.stations || [];

  W.stations.push({
    id: 'nahrung',
    title: 'Wer frisst wen? Der Stoffkreislauf',
    short: 'Wer frisst wen?',
    kompetenz: 'Ich weiß, was Produzenten, Konsumenten und Destruenten sind und was ihre jeweilige „Aufgabe“ ist.',
    intro: 'Pflanzen stellen Nahrung her, Tiere fressen sie, Zersetzer räumen auf. Zusammen bilden sie einen Kreislauf.',
    learn: [
      {
        t: 'text', h: 'Alles beginnt mit der Sonne',
        p: [
          'Grüne Pflanzen können etwas, das kein Tier kann: Sie stellen ihre Nahrung <b>selbst</b> her. Mit der Energie des Sonnenlichts bauen sie in ihren Blättern aus Wasser und Kohlenstoffdioxid <b>Traubenzucker</b> auf. Dabei entsteht <b>Sauerstoff</b>, den Menschen und Tiere zum Atmen brauchen.',
          'Diesen Vorgang nennt man <b>Fotosynthese</b>. Das Wasser holen die Pflanzen mit den Wurzeln aus dem Boden, das Kohlenstoffdioxid nehmen sie aus der Luft auf.'
        ]
      },
      { t: 'widget', w: 'fotosynthese' },
      {
        t: 'text', h: 'Drei Gruppen, drei Aufgaben',
        p: ['Jedes Lebewesen im Wald gehört zu einer von drei Gruppen. Die Namen verraten ihre Aufgabe: <i>produzieren</i> heißt herstellen, <i>konsumieren</i> heißt verbrauchen, und das lateinische <i>destruere</i> heißt zerstören oder abbauen.']
      },
      { t: 'widget', w: 'rollen' },
      {
        t: 'fact', h: 'Vorsicht, Falle!',
        html: '<b>Pilze sind keine Pflanzen.</b> Sie haben kein Blattgrün und können keine Fotosynthese betreiben. Im Wald gehören sie zu den Destruenten.<br><b>Nicht jedes Tier ist ein Konsument.</b> Regenwürmer, Asseln und Tausendfüßer sind Tiere, fressen aber tote Reste. Deshalb zählen sie zu den Destruenten.'
      },
      {
        t: 'text', h: 'Die Nahrungskette',
        p: [
          'Wer frisst wen? Das zeigt eine <b>Nahrungskette</b>. Sie beginnt <b>immer mit einem Produzenten</b>, denn nur Pflanzen stellen Nahrung selbst her. Die Glieder einer Kette nennt man <b>Nahrungsstufen</b>.',
          'Pflanzenfresser sind <b>Konsumenten 1. Ordnung</b>. Wer Pflanzenfresser frisst, ist ein <b>Konsument 2. Ordnung</b>, und so weiter. Am Ende steht der <b>Endkonsument</b>: In dieser Kette wird er von keinem anderen Tier mehr gefressen. Die Destruenten verwerten die Reste aller Stufen.'
        ]
      },
      { t: 'widget', w: 'kette' },
      {
        t: 'merke',
        html: 'Der Pfeil in einer Nahrungskette bedeutet <b>„wird gefressen von“</b>. Er zeigt vom Futter zum Fresser, also in die Richtung, in die Stoffe und Energie weitergegeben werden.'
      },
      {
        t: 'text', h: 'Von der Kette zum Netz',
        p: ['Die meisten Tiere fressen mehr als eine Sorte Futter: Der Buntspecht frisst Borkenkäfer, aber auch Spinnen, Ameisen und im Winter Samen. Darum hängen viele Nahrungsketten zusammen. Sie bilden ein <b>Nahrungsnetz</b>.']
      },
      {
        t: 'text', h: 'Der Stoffkreislauf',
        p: ['Tippe auf die Stationen im Kreis. Verfolge, welchen Weg die Stoffe nehmen.']
      },
      { t: 'widget', w: 'kreislauf' },
      {
        t: 'merke',
        html: 'Die Stoffe wandern im Kreis: <b>Produzenten → (Konsumenten) → Destruenten → Mineralstoffe, Wasser und Kohlenstoffdioxid → Produzenten</b>. Laub und Totholz gelangen auch direkt zu den Destruenten. Deshalb spricht man von einem <b>Stoffkreislauf</b>. Die Energie dafür liefert die Sonne.'
      },
      {
        t: 'fact', h: 'Auch die Luft gehört dazu',
        html: 'Tiere und Zersetzer atmen Sauerstoff ein und geben Kohlenstoffdioxid ab. Die Pflanzen nehmen das Kohlenstoffdioxid für die Fotosynthese wieder auf und geben Sauerstoff ab. Auch hier schließt sich ein Kreis.'
      },
      {
        t: 'reveal',
        q: 'Was wäre, wenn es keine Destruenten gäbe?',
        a: 'Laub, Totholz, Kot und tote Tiere würden einfach liegen bleiben und sich Jahr für Jahr höher stapeln. Die Pflanzen bekämen keine Mineralstoffe mehr aus dem Boden und könnten nicht mehr wachsen. Ohne Pflanzen hätten auch die Tiere nichts mehr zu fressen. Der ganze Kreislauf würde zusammenbrechen.'
      },
      {
        t: 'fact', h: 'Wusstest du?',
        html: 'Bei den Destruenten gibt es eine Arbeitsteilung: Regenwürmer, Asseln und Tausendfüßer <b>zerkleinern</b> das Laub. Pilze und Bakterien bauen die Reste dann <b>vollständig</b> zu Mineralstoffen ab.'
      }
    ],
    practice: [
      {
        id: 'na-pkd', type: 'sort', h: 'Produzent, Konsument oder Destruent?',
        task: 'Ordne jedes Lebewesen seiner Gruppe zu.',
        buckets: [
          { id: 'p', label: 'Produzenten (Erzeuger)' },
          { id: 'k', label: 'Konsumenten (Verbraucher)' },
          { id: 'd', label: 'Destruenten (Zersetzer)' }
        ],
        items: [
          { id: 'n1', label: 'Buche', bucket: 'p', why: 'Die Buche ist eine grüne Pflanze und betreibt Fotosynthese.' },
          { id: 'n2', label: 'Moos', bucket: 'p', why: 'Moose sind grüne Pflanzen, also Produzenten.' },
          { id: 'n3', label: 'Farn', bucket: 'p', why: 'Farne sind grüne Pflanzen, also Produzenten.' },
          { id: 'n4', label: 'Bärlauch', bucket: 'p', why: 'Bärlauch ist eine grüne Pflanze, also ein Produzent.' },
          { id: 'n5', label: 'Reh', bucket: 'k', why: 'Das Reh frisst Pflanzen: Konsument 1. Ordnung.' },
          { id: 'n6', label: 'Borkenkäfer', bucket: 'k', why: 'Der Borkenkäfer frisst die Bastschicht unter der Rinde lebender Fichten. Er ist ein Pflanzenfresser, also Konsument 1. Ordnung.' },
          { id: 'n7', label: 'Buntspecht', bucket: 'k', why: 'Der Buntspecht frisst Insekten: Konsument.' },
          { id: 'n8', label: 'Fuchs', bucket: 'k', why: 'Der Fuchs frisst andere Tiere: Konsument.' },
          { id: 'n9', label: 'Regenwurm', bucket: 'd', why: 'Der Regenwurm frisst totes Laub und zersetzt es: Destruent.' },
          { id: 'n10', label: 'Bakterien', bucket: 'd', why: 'Bakterien bauen tote Reste zu Mineralstoffen ab: Destruenten.' },
          { id: 'n11', label: 'Pilze an totem Holz', bucket: 'd', why: 'Pilze sind keine Pflanzen und betreiben keine Fotosynthese. Diese Pilze zersetzen Totholz: Destruenten.' },
          { id: 'n12', label: 'Tausendfüßer', bucket: 'd', why: 'Tausendfüßer zerkleinern Laub: Destruenten.' }
        ]
      },
      {
        id: 'na-kette', type: 'order', h: 'Bau eine Nahrungskette',
        task: 'Tippe die Lebewesen in der richtigen Reihenfolge an. Beginne mit dem Produzenten.',
        arrows: true,
        items: [
          { id: 'eb', label: 'Eichenblatt' },
          { id: 'ra', label: 'Raupe' },
          { id: 'bm', label: 'Blaumeise' },
          { id: 'sp', label: 'Sperber' }
        ]
      },
      {
        id: 'na-quiz', type: 'quiz', h: 'Kettenfragen',
        task: 'Fünf Fragen zu Nahrungsketten und Fotosynthese.',
        questions: [
          { kind: 'single', q: 'Womit beginnt jede Nahrungskette?', options: ['Mit einem Pflanzenfresser', 'Mit einem Produzenten (grüne Pflanze)', 'Mit einem Destruenten', 'Mit dem größten Tier'], answer: 1, why: 'Nur grüne Pflanzen stellen ihre Nahrung selbst her. Deshalb stehen sie immer am Anfang.' },
          { kind: 'single', q: 'Bucheckern → Rötelmaus → Waldkauz. Was ist der Waldkauz?', options: ['Produzent', 'Konsument 1. Ordnung', 'Konsument 2. Ordnung', 'Destruent'], answer: 2, why: 'Er frisst einen Pflanzenfresser (die Rötelmaus). Damit ist er Konsument 2. Ordnung.' },
          { kind: 'single', q: 'Was bedeutet der Pfeil in „Fichte → Borkenkäfer“?', options: ['frisst', 'wird gefressen von', 'wohnt neben', 'ist größer als'], answer: 1, why: 'Der Pfeil zeigt vom Futter zum Fresser: Die Fichte wird vom Borkenkäfer gefressen.' },
          { kind: 'single', q: 'Was entsteht bei der Fotosynthese?', options: ['Traubenzucker und Sauerstoff', 'Wasser und Kohlenstoffdioxid', 'Mineralstoffe und Humus', 'Licht und Wärme'], answer: 0, why: 'Aus Kohlenstoffdioxid und Wasser entstehen mit Licht Traubenzucker und Sauerstoff.' },
          { kind: 'tf', q: 'Destruenten bauen tote Reste zu Mineralstoffen ab, die die Pflanzen wieder aufnehmen.', answer: true, why: 'Richtig. So schließt sich der Stoffkreislauf.' }
        ]
      },
      {
        id: 'na-kreis', type: 'cloze', h: 'Der Stoffkreislauf als Lückentext',
        task: 'Tippe auf ein Wort unten. Es landet in der markierten Lücke. Tippst du eine gefüllte Lücke an, wird sie wieder frei.',
        text: 'Grüne Pflanzen sind {Produzenten}. Mithilfe von {Sonnenlicht} stellen sie aus Wasser und {Kohlenstoffdioxid} Traubenzucker her. Dabei entsteht {Sauerstoff}. Tiere, die lebende Pflanzen oder andere Tiere fressen, sind {Konsumenten}. Laub, Totholz, Kot und tote Tiere werden von {Destruenten} wie Bakterien, Pilzen und Regenwürmern abgebaut. Dabei entstehen {Mineralstoffe}, die die Pflanzen mit ihren {Wurzeln} wieder aufnehmen. So schließt sich der {Kreislauf}.',
        extra: ['Mondlicht', 'Blüten', 'Fleischfresser']
      }
    ],
    explain: [
      {
        id: 'na-e1', op: 'Erkläre',
        task: 'Erkläre, was Produzenten, Konsumenten und Destruenten sind und welche Aufgabe sie im Wald haben.',
        model: '<b>Produzenten</b> (Erzeuger) sind die grünen Pflanzen. Sie stellen mithilfe von Sonnenlicht durch Fotosynthese Traubenzucker her und geben dabei Sauerstoff ab. Damit erzeugen sie die Nahrung für alle anderen.<br><b>Konsumenten</b> (Verbraucher) sind Tiere, die lebende Pflanzen oder andere Tiere fressen. Sie können keine Nahrung selbst herstellen.<br><b>Destruenten</b> (Zersetzer) sind z. B. Bakterien, Pilze, Regenwürmer und Tausendfüßer. Sie bauen tote Reste wie Laub, Totholz, Kot und tote Tiere zu Mineralstoffen ab. Diese nehmen die Pflanzen wieder auf.',
        points: [
          'Produzenten = grüne Pflanzen; stellen mit Sonnenlicht durch Fotosynthese Nährstoffe her und geben Sauerstoff ab.',
          'Konsumenten = Tiere, die lebende Pflanzen oder andere Tiere fressen.',
          'Destruenten = Bakterien, Pilze, Regenwürmer …; bauen tote Reste zu Mineralstoffen ab.',
          'Die Mineralstoffe nehmen die Pflanzen wieder auf.'
        ],
        starter: ['Produzenten sind …', 'Konsumenten dagegen …', 'Destruenten …']
      },
      {
        id: 'na-e2', op: 'Erläutere',
        task: 'Erläutere, warum man von einem Stoffkreislauf spricht.',
        model: 'Die Stoffe werden im Wald immer wieder verwendet. Die <b>Produzenten</b> bauen mit Sonnenlicht aus Wasser, Kohlenstoffdioxid und Mineralstoffen ihren Körper auf. <b>Konsumenten</b> fressen die Pflanzen oder andere Tiere und nehmen die Stoffe so auf. Laub und Totholz, Kot und tote Tiere werden von den <b>Destruenten</b> zu Mineralstoffen, Wasser und Kohlenstoffdioxid abgebaut. Die Pflanzen nehmen die Mineralstoffe mit ihren Wurzeln wieder auf. Damit ist der Kreis geschlossen.<br>Beispiel: Ein Buchenblatt fällt im Herbst zu Boden, Regenwürmer und Bakterien zersetzen es, und die Mineralstoffe daraus helfen im nächsten Jahr der Buche beim Wachsen.',
        points: [
          'Produzenten bauen aus einfachen Stoffen Nährstoffe auf.',
          'Konsumenten nehmen die Stoffe über die Nahrung auf.',
          'Destruenten bauen tote Reste zu Mineralstoffen ab.',
          'Pflanzen nehmen die Mineralstoffe wieder auf: Der Kreis schließt sich.',
          'Ein passendes Beispiel (z. B. Buchenblatt).'
        ],
        starter: ['Man spricht von einem Kreislauf, weil …', 'Zuerst …', 'Danach …', 'Zum Beispiel …']
      },
      {
        id: 'na-e3', op: 'Begründe',
        task: 'Begründe, warum jede Nahrungskette mit einer Pflanze beginnt.',
        model: 'Nur grüne Pflanzen können ihre Nahrung <b>selbst herstellen</b>. Mit der Energie des Sonnenlichts machen sie durch Fotosynthese aus Wasser und Kohlenstoffdioxid Traubenzucker. Tiere können das nicht. Sie müssen Pflanzen oder andere Tiere fressen. Jede Nahrung lässt sich deshalb am Ende auf eine Pflanze zurückführen.',
        points: [
          'Nur Pflanzen stellen ihre Nahrung selbst her (Fotosynthese).',
          'Tiere müssen fressen, um an Nährstoffe zu kommen.',
          'Die Energie stammt ursprünglich von der Sonne.'
        ],
        starter: ['Jede Nahrungskette beginnt mit einer Pflanze, weil …']
      }
    ],
    merke: [
      '<b>Produzenten</b> (Erzeuger) = grüne Pflanzen. Sie stellen mit Sonnenlicht durch <b>Fotosynthese</b> Traubenzucker her und geben Sauerstoff ab.',
      'Zusatzwissen Fotosynthese: Kohlenstoffdioxid + Wasser → (Licht, Blattgrün) → Traubenzucker + Sauerstoff.',
      '<b>Konsumenten</b> (Verbraucher) = Tiere, die lebende Pflanzen oder andere Tiere fressen. Pflanzenfresser = 1. Ordnung, wer Pflanzenfresser frisst = 2. Ordnung usw. Der Endkonsument steht am Ende der Kette.',
      '<b>Destruenten</b> (Zersetzer) = Bakterien, Pilze, Regenwürmer, Tausendfüßer, Asseln. Sie bauen tote Reste (Laub, Totholz, Kot, tote Tiere) zu Mineralstoffen ab. Pilze sind keine Pflanzen!',
      'Nahrungskette: Die Glieder heißen Nahrungsstufen. Pfeil = „wird gefressen von“. Viele verknüpfte Ketten = Nahrungsnetz.',
      '<b>Stoffkreislauf:</b> Produzenten → (Konsumenten) → Destruenten → Mineralstoffe → Produzenten. Laub und Totholz gehen direkt zu den Destruenten. Die Energie liefert die Sonne.'
    ]
  });
})();
