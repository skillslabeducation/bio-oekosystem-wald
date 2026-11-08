/* Station: Ökologische Nische (Quelle: AB "Die Ökologische Nische" – Bäckerei-Vergleich) */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  W.stations = W.stations || [];

  W.stations.push({
    id: 'nische',
    title: 'Die ökologische Nische',
    short: 'Ökologische Nische',
    kompetenz: 'Ich kann erläutern, was man unter einer ökologischen Nische versteht.',
    intro: 'Jedes Tier braucht einen „Beruf“, mit dem es überleben kann. Finde heraus, was das mit Bäckereien zu tun hat.',
    learn: [
      {
        t: 'text', h: 'Ein Beruf zum Überleben',
        p: [
          'Menschen brauchen Berufe, um ihr Überleben zu sichern. Ein Beruf funktioniert aber nur, wenn es genug Kundschaft gibt. In einem kleinen Dorf mit schon zwei Bäckereien eine dritte zu eröffnen, wäre keine gute Idee.',
          'Du müsstest dir einen anderen Beruf suchen, oder du müsstest dauerhaft besser sein als die anderen und ihnen die Kundschaft abwerben, zum Beispiel mit besonders leckerem Biobrot. Und selbst dann brauchst du noch einen Platz zum Wohnen.'
        ]
      },
      { t: 'widget', w: 'analogie' },
      {
        t: 'merke',
        html: 'Die Gesamtheit dessen, was ein Lebewesen zum Leben benötigt, nennt man seine <b>ökologische Nische</b>. Dazu gehört auch, <b>wie</b> es seine Umwelt nutzt: was es frisst, wo und wann es jagt, wo es schläft und brütet. Jede Art hat ihre eigene <b>Überlebensstrategie</b>.'
      },
      {
        t: 'fact', h: 'Vorsicht, Falle!',
        html: 'Die ökologische Nische ist <b>kein Ort</b> und kein Versteck. Merksatz: <b>Der Lebensraum ist die Adresse, die Nische ist der Beruf.</b>'
      },
      {
        t: 'text', h: 'Jede Art hat ihre Strategie',
        p: ['Alle Tiere brauchen zum Überleben Nahrung sowie Schlaf- und Nistplätze. Je nach Art kommen weitere Bedingungen hinzu. Tippe auf die Karten.']
      },
      { t: 'widget', w: 'nischen' },
      {
        t: 'text', h: 'Wie eine Art zu ihrer Nische kommt',
        p: ['Im Laufe der Evolution hat sich jede Art so entwickelt, dass sie ihre spezielle Nische gefunden hat. Dabei wurden entweder <b>andere Arten verdrängt</b>, oder die Tiere haben sich <b>Lebensräume gesucht, die für die meisten anderen unbewohnbar sind</b>. Kamele zum Beispiel brauchen wenig Wasser, können es gut speichern und deshalb in der Wüste überleben, Pferde nicht.']
      },
      {
        t: 'reveal',
        q: 'Können zwei Arten mit genau derselben Nische dauerhaft nebeneinander leben?',
        a: 'Nein. Sie wären ständig Konkurrenten um genau dieselben Dinge. Auf Dauer verdrängt eine Art die andere, oder eine der beiden spezialisiert sich anders. Bunt- und Grünspecht können zusammen in einem Park leben, <b>weil</b> sie verschiedene Nischen haben.'
      }
    ],
    practice: [
      {
        id: 'ni-lueckentext', type: 'cloze', h: 'Das Arbeitsblatt als Lückentext',
        task: 'Fülle die Lücken. Tippe ein Wort an, es landet in der markierten Lücke.',
        text: 'Jeder Mensch muss einen Beruf finden, in dem er ausreichend {Geld} verdienen kann. Es ist nicht sinnvoll, in einem kleinen Dorf eine Bäckerei zu eröffnen, wenn es dort schon zwei {Bäckereien} gibt. Man muss sich einen anderen Beruf suchen oder den anderen Bäckereien die {Kundschaft} abwerben. Alle Tiere brauchen zum Überleben {Nahrung}, Schlaf- und {Nistplätze}. Wildschweine brauchen Schlammsuhlen, um ihre Haut von {Parasiten|Ungeziefer} zu befreien. Kaninchen brauchen Verstecke, um sich vor {Fressfeinden} zu schützen. Die Gesamtheit dessen, was Tiere zum Leben benötigen, nennt man ihre {ökologische Nische}. Kamele brauchen wenig {Wasser} und können deshalb in der {Wüste} überleben.',
        extra: ['Lebensraum', 'Freunde', 'Wald']
      },
      {
        id: 'ni-wer', type: 'sort', h: 'Wer braucht was?',
        task: 'Jedes Lebewesen hat seine eigene Überlebensstrategie. Ordne zu.',
        buckets: [
          { id: 'wildschwein', label: 'Wildschwein' },
          { id: 'kaninchen', label: 'Kaninchen' },
          { id: 'kamel', label: 'Kamel' },
          { id: 'gruenspecht', label: 'Grünspecht' },
          { id: 'buntspecht', label: 'Buntspecht' },
          { id: 'liane', label: 'Liane' },
          { id: 'fruehbluher', label: 'Frühblüher' }
        ],
        items: [
          { id: 'w1', label: 'Schlammsuhle gegen Parasiten', bucket: 'wildschwein', why: 'Im Schlamm befreit das Wildschwein seine Haut von Parasiten.' },
          { id: 'w2', label: 'Verstecke vor Fressfeinden', bucket: 'kaninchen', why: 'Kaninchen schützen sich in Verstecken und Bauen.' },
          { id: 'w3', label: 'kommt mit wenig Wasser aus', bucket: 'kamel', why: 'Darum kann das Kamel in der Wüste leben.' },
          { id: 'w4', label: 'Ameisen am Boden', bucket: 'gruenspecht', why: 'Der Grünspecht sucht Ameisen auf Wiesen.' },
          { id: 'w5', label: 'Larven aus der Borke', bucket: 'buntspecht', why: 'Der Buntspecht hämmert Larven aus der Baumrinde.' },
          { id: 'w6', label: 'klettert an Bäumen empor zum Licht', bucket: 'liane', why: 'Lianen nutzen die Bäume als Kletterhilfe, um ans Licht zu kommen.' },
          { id: 'w7', label: 'blüht vor dem Blattaustrieb der Bäume', bucket: 'fruehbluher', why: 'Frühblüher nutzen das Licht im Frühling, bevor das Kronendach dicht ist.' }
        ]
      },
      {
        id: 'ni-check', type: 'quiz', h: 'Nischen-Check',
        task: 'Stimmt die Aussage?',
        questions: [
          { kind: 'tf', q: 'Die ökologische Nische ist das Versteck eines Tieres.', answer: false, why: 'Falsch. Die Nische ist kein Ort, sondern die Art und Weise, wie ein Lebewesen lebt und seine Umwelt nutzt (der „Beruf“).' },
          { kind: 'tf', q: 'Auch Pflanzen haben eine ökologische Nische.', answer: true, why: 'Richtig. Beispiele: Lianen klettern zum Licht, Frühblüher blühen vor dem Laubaustrieb.' },
          { kind: 'tf', q: 'Bunt- und Grünspecht haben dieselbe ökologische Nische.', answer: false, why: 'Falsch. Sie nutzen verschiedene Nahrung an verschiedenen Orten und haben deshalb verschiedene Nischen.' },
          { kind: 'tf', q: 'Zwei Arten mit genau derselben Nische können auf Dauer nicht zusammenleben.', answer: true, why: 'Richtig. Eine würde die andere verdrängen.' },
          { kind: 'single', q: 'Welcher Satz passt am besten zur ökologischen Nische?', options: ['Der Lebensraum ist die Adresse, die Nische ist der Beruf.', 'Die Nische ist das Nest eines Vogels.', 'Die Nische ist der Ort, an dem ein Tier geboren wurde.', 'Eine Nische haben nur Tiere in der Wüste.'], answer: 0, why: 'Die Nische beschreibt, wie ein Lebewesen lebt und überlebt, nicht wo genau es wohnt.' }
        ]
      }
    ],
    explain: [
      {
        id: 'ni-e1', op: 'Erläutere',
        task: 'Erläutere, was man unter einer ökologischen Nische versteht. Nutze dabei ein Beispiel.',
        model: 'Die ökologische Nische ist die <b>Gesamtheit dessen, was ein Lebewesen zum Leben braucht</b>, und die Art, wie es seine Umwelt nutzt: seine Nahrung, wie und wo es sie findet, seine Schlaf- und Nistplätze und wie es sich schützt. Man kann sie mit dem <b>Beruf</b> eines Menschen vergleichen, oder auch als <b>Überlebensstrategie</b> bezeichnen. Die Nische ist kein Ort.<br><b>Beispiel:</b> Die Nische des Grünspechts: Er sucht mit seiner langen, klebrigen Zunge am Boden nach Ameisen, ist durch sein grünes Gefieder auf Wiesen getarnt und übernachtet in Baumhöhlen.',
        points: [
          'Gesamtheit dessen, was ein Lebewesen zum Leben braucht.',
          'Dazu gehört, wie es seine Umwelt nutzt (Nahrung, Schlaf- und Nistplatz, Schutz).',
          'Vergleich mit einem Beruf oder einer Überlebensstrategie; kein Ort.',
          'Ein passendes Beispiel, genau beschrieben.'
        ],
        starter: ['Unter einer ökologischen Nische versteht man …', 'Man kann sie mit … vergleichen.', 'Ein Beispiel ist …']
      },
      {
        id: 'ni-e2', op: 'Erkläre',
        task: 'Erkläre den Vergleich zwischen dem Beruf eines Menschen und der ökologischen Nische eines Tieres.',
        model: 'Ein Mensch braucht einen Beruf, um Geld zu verdienen und zu überleben. Ein Tier braucht eine Art, an seine <b>Nahrung</b> zu kommen. Gibt es zu viele gleiche Berufe an einem Ort, fehlt die Kundschaft. Bei Tieren heißt das: Zu viele Tiere mit derselben Nahrung stehen in <b>Konkurrenz</b>. Man kann ausweichen (einen anderen Beruf wählen) oder besser sein als die anderen (Biobrot). Tiere <b>spezialisieren</b> sich, zum Beispiel der Grünspecht mit seiner langen Zunge auf Ameisen. Und wie der Mensch eine Wohnung braucht, braucht das Tier <b>Schlaf- und Nistplätze</b>.',
        points: [
          'Beruf ↔ Art, an Nahrung zu kommen.',
          'Zu viele gleiche Berufe ↔ Konkurrenz um dieselbe Nahrung.',
          'Anderer Beruf oder besser sein ↔ Spezialisierung bzw. Ausweichen.',
          'Wohnung ↔ Schlaf- und Nistplatz.'
        ],
        starter: ['So wie ein Mensch …, braucht ein Tier …', 'Gibt es zu viele …', 'Deshalb …']
      },
      {
        id: 'ni-e3', op: 'Erkläre',
        task: 'Frühblüher wie das Buschwindröschen blühen schon im März und April. Erkläre, warum das eine geschickte Nische ist.',
        model: 'Pflanzen brauchen <b>Licht</b> für die Fotosynthese. Im Frühling haben die Bäume noch keine Blätter. Dann fällt viel Sonnenlicht auf den Waldboden. Die Frühblüher nutzen diese Zeit zum Wachsen und Blühen. Im Sommer ist das Kronendach dicht, am Boden wird es dunkel. So weichen die Frühblüher der <b>Konkurrenz um Licht</b> mit den großen Bäumen aus.',
        points: [
          'Pflanzen brauchen Licht.',
          'Im Frühling: noch keine Blätter an den Bäumen, viel Licht am Boden.',
          'Im Sommer: dichtes Kronendach, dunkel am Boden.',
          'Sie weichen so der Konkurrenz um Licht aus.'
        ],
        starter: ['Pflanzen brauchen …', 'Im Frühling …', 'So können sie …']
      }
    ],
    merke: [
      '<b>Ökologische Nische</b> = die Gesamtheit dessen, was ein Lebewesen zum Leben braucht, und wie es seine Umwelt nutzt (seine „Überlebensstrategie“).',
      'Merksatz: Der Lebensraum ist die Adresse, die Nische ist der Beruf. Die Nische ist kein Ort!',
      'Bäckerei-Vergleich: zu viele gleiche Berufe → zu wenig Kundschaft (Konkurrenz) → anderen Beruf suchen oder besser sein (Spezialisierung).',
      'Beispiele: Wildschwein (Schlammsuhle gegen Parasiten), Kaninchen (Verstecke), Kamel (Wüste, wenig Wasser), Liane (klettert zum Licht), Frühblüher (blühen vor dem Laubaustrieb).',
      'Verschiedene Nischen = wenig Konkurrenz (Bunt- und Grünspecht).'
    ]
  });
})();
