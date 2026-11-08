/* Station: Konkurrenz (Quelle: AB "Jedes Tier hat seinen Platz" – Buntspecht und Grünspecht) */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  W.stations = W.stations || [];

  W.SPECHTE = {
    merkmale: ['Größe', 'Schnabelform', 'Zunge', 'Nahrungsspektrum', 'Lebensraum', 'bevorzugtes Jagdrevier'],
    bunt: [
      '20–25 cm',
      'meißelartig: hämmert Löcher in die Borke',
      'mit Widerhaken am Ende',
      'Spinnen, Käferlarven und weitere Insekten aus der Borke; im Herbst und Winter Samen',
      'Wälder, aber auch Parks',
      'am Baumstamm, in der Borke'
    ],
    gruen: [
      '28–32 cm',
      'spitz',
      'klebrig, bis zu 10 cm lang',
      'vor allem Ameisen; zu geringen Teilen andere Insekten, Schnecken, Obst',
      'Waldränder, Parks, städtische Brachflächen; besonders Streuobstwiesen',
      'am Boden, auf Wiesen'
    ]
  };

  W.stations.push({
    id: 'konkurrenz',
    title: 'Konkurrenz: Jedes Tier hat seinen Platz',
    short: 'Konkurrenz',
    kompetenz: 'Ich weiß, was man unter „Konkurrenz“ der Lebewesen versteht (Specht-Beispiel).',
    intro: 'Buntspecht gegen Grünspecht: Kämpfen die beiden ums Futter? Vergleiche die zwei und entscheide.',
    learn: [
      {
        t: 'text', h: 'Was ist Konkurrenz?',
        p: [
          'Unter <b>Konkurrenz</b> versteht man, dass mehrere Lebewesen <b>dasselbe</b> haben wollen oder brauchen, zum Beispiel Nahrung, einen Nistplatz oder Licht. Oft gibt es in so einem „Konkurrenzkampf“ einen Gewinner und einen Verlierer.',
          'Bei Spechten denkst du sicher sofort an das Klopfen des Buntspechts. Es gibt aber verschiedene Spechtarten, und jede stellt eigene Ansprüche an ihren Lebensraum.'
        ]
      },
      { t: 'widget', w: 'spechte' },
      {
        t: 'text', h: 'Konkurrenten? Kaum!',
        p: [
          'Beide Spechte fressen Insekten, beide schlafen in Baumhöhlen, und beide kommen in Parks vor. Trotzdem kommen sie sich kaum in die Quere.',
          'Der <b>Buntspecht</b> holt mit seinem meißelartigen Schnabel und der Widerhaken-Zunge Larven und Käfer <b>aus der Borke</b>. Der <b>Grünspecht</b> sucht mit seiner langen, klebrigen Zunge <b>am Boden</b> nach Ameisen. Sie nutzen also <b>unterschiedliche Nahrung an unterschiedlichen Orten</b>.'
        ]
      },
      {
        t: 'merke',
        html: 'Zwischen Bunt- und Grünspecht gibt es <b>nur wenig Konkurrenz</b>. Sie fressen zwar teilweise dieselbe Nahrung (Insekten), sind aber an <b>unterschiedliche Nahrung und Jagdreviere</b> angepasst. So vermeiden sie Konkurrenz.'
      },
      {
        t: 'text', h: 'Auch Pflanzen konkurrieren',
        p: ['Pflanzen konkurrieren vor allem um <b>Licht</b>, Wasser und Mineralstoffe. Große Bäume beschatten den Boden. Frühblüher wie das Buschwindröschen weichen aus: Sie blühen im Frühling, bevor die Bäume Blätter bekommen.']
      },
      {
        t: 'fact', h: 'Vorsicht, Falle!',
        html: 'Wenn ein Fuchs eine Maus jagt, ist das <b>keine</b> Konkurrenz, sondern eine <b>Räuber-Beute-Beziehung</b>. Konkurrenz heißt: Beide wollen <b>dasselbe</b>. Fuchs und Mäusebussard, die beide Mäuse jagen, sind Konkurrenten.'
      },
      {
        t: 'reveal',
        q: 'Wo ist die Konkurrenz am größten: zwischen zwei Buntspechten oder zwischen Bunt- und Grünspecht?',
        a: 'Zwischen <b>zwei Buntspechten</b>. Sie brauchen genau dieselbe Nahrung, dasselbe Jagdrevier und dieselben Bruthöhlen. Je ähnlicher die Ansprüche, desto größer die Konkurrenz.'
      }
    ],
    practice: [
      {
        id: 'ko-steckbrief', type: 'sort', h: 'Steckbrief-Puzzle',
        task: 'Gehört das Merkmal zum Buntspecht oder zum Grünspecht?',
        buckets: [
          { id: 'bunt', label: 'Buntspecht' },
          { id: 'gruen', label: 'Grünspecht' }
        ],
        items: [
          { id: 'k1', label: 'meißelartiger Schnabel', bucket: 'bunt', why: 'Der Buntspecht hämmert mit seinem Meißelschnabel Löcher in die Borke.' },
          { id: 'k2', label: 'spitzer Schnabel', bucket: 'gruen', why: 'Der Grünspecht stochert mit dem spitzen Schnabel im Boden nach Ameisen.' },
          { id: 'k3', label: 'Zunge mit Widerhaken', bucket: 'bunt', why: 'Mit den Widerhaken zieht der Buntspecht Larven aus der Borke.' },
          { id: 'k4', label: 'klebrige Zunge, bis 10 cm lang', bucket: 'gruen', why: 'An der klebrigen Zunge des Grünspechts bleiben Ameisen hängen.' },
          { id: 'k5', label: 'frisst vor allem Ameisen', bucket: 'gruen', why: 'Ameisen sind die Hauptnahrung des Grünspechts.' },
          { id: 'k6', label: 'Käferlarven und Spinnen aus der Borke', bucket: 'bunt', why: 'Das ist die Nahrung des Buntspechts.' },
          { id: 'k7', label: 'im Winter auch Samen', bucket: 'bunt', why: 'Im Herbst und Winter weicht der Buntspecht auf Samen aus.' },
          { id: 'k8', label: 'jagt am Boden', bucket: 'gruen', why: 'Der Grünspecht verbringt die meiste Zeit des Tages am Boden.' },
          { id: 'k9', label: 'liebt Streuobstwiesen', bucket: 'gruen', why: 'Auf Streuobstwiesen fühlt sich der Grünspecht besonders wohl.' },
          { id: 'k10', label: '20–25 cm groß', bucket: 'bunt', why: 'Der Buntspecht ist der kleinere der beiden.' },
          { id: 'k11', label: '28–32 cm groß', bucket: 'gruen', why: 'Der Grünspecht ist etwas größer.' },
          { id: 'k12', label: 'grünliches Gefieder als Tarnung', bucket: 'gruen', why: 'Auf Wiesen ist er durch sein Gefieder gut getarnt.' }
        ]
      },
      {
        id: 'ko-ja-nein', type: 'quiz', h: 'Konkurrenz oder nicht?',
        task: 'Entscheide bei jeder Situation.',
        questions: [
          { kind: 'binary', labels: ['Konkurrenz', 'Keine Konkurrenz'], q: 'Zwei Buntspechte suchen im selben Wald nach Käferlarven.', answer: 0, why: 'Konkurrenz: Beide brauchen genau dieselbe Nahrung am selben Ort.' },
          { kind: 'binary', labels: ['Konkurrenz', 'Keine Konkurrenz'], q: 'Ein Fuchs jagt eine Maus.', answer: 1, why: 'Keine Konkurrenz: Das ist eine Räuber-Beute-Beziehung. Fuchs und Maus wollen nicht dasselbe.' },
          { kind: 'binary', labels: ['Konkurrenz', 'Keine Konkurrenz'], q: 'Fuchs und Mäusebussard jagen beide Mäuse auf derselben Wiese.', answer: 0, why: 'Konkurrenz: Beide wollen dieselbe Beute.' },
          { kind: 'binary', labels: ['Konkurrenz', 'Kaum Konkurrenz'], q: 'Ein Buntspecht hämmert am Stamm, ein Grünspecht sucht auf der Wiese nach Ameisen.', answer: 1, why: 'Kaum Konkurrenz: andere Nahrung, anderes Jagdrevier.' },
          { kind: 'binary', labels: ['Konkurrenz', 'Keine Konkurrenz'], q: 'Junge Buchen und Kräuter wachsen im Sommer unter dem dichten Kronendach.', answer: 0, why: 'Konkurrenz um Licht: Unter dem Kronendach ist es dunkel, alle wollen das wenige Licht.' },
          { kind: 'binary', labels: ['Konkurrenz', 'Keine Konkurrenz'], q: 'Eichhörnchen und Buntspecht fressen im Winter beide Fichtensamen.', answer: 0, why: 'Konkurrenz: Im Winter weicht der Buntspecht auf Samen aus, die auch das Eichhörnchen frisst.' }
        ]
      },
      {
        id: 'ko-quiz', type: 'quiz', h: 'Gut aufgepasst?',
        task: 'Drei Fragen zum Arbeitsblatt.',
        questions: [
          { kind: 'single', q: 'Warum gibt es zwischen Bunt- und Grünspecht kaum Konkurrenz?', options: ['Sie leben auf verschiedenen Kontinenten.', 'Sie suchen verschiedene Nahrung an verschiedenen Orten.', 'Der Grünspecht frisst nur Obst.', 'Der Buntspecht ist größer und stärker.'], answer: 1, why: 'Buntspecht: Larven aus der Borke. Grünspecht: Ameisen am Boden.' },
          { kind: 'single', q: 'Was bedroht den Grünspecht in einem kalten, schneereichen Winter?', options: ['Er findet keine Ameisen, weil der Boden gefroren oder mit Schnee bedeckt ist.', 'Seine Zunge friert fest.', 'Die Buntspechte vertreiben ihn.', 'Er kann im Winter nicht fliegen.'], answer: 0, why: 'Seine Nahrung liegt im Boden. Bei Frost und Schnee kommt er nicht heran.' },
          { kind: 'multi', q: 'Wovon hängt laut Arbeitsblatt ab, wie viele Grünspechte es gibt? Wähle alle richtigen Antworten.', options: ['vom Winterklima', 'vom Angebot an Höhlenbäumen', 'vom Pestizideinsatz des Menschen', 'von der Zahl der Buntspechte'], answer: [0, 1, 2], why: 'Winterklima, Höhlenbäume und Pestizide. Die Buntspechte spielen kaum eine Rolle, weil die beiden wenig konkurrieren.' }
        ]
      }
    ],
    explain: [
      {
        id: 'ko-e1', op: 'Begründe',
        task: 'Überlege, ob es sich bei Bunt- und Grünspecht um Konkurrenten handelt, und begründe deine Einschätzung.',
        model: 'Konkurrenz bedeutet, dass mehrere Lebewesen dasselbe haben wollen oder brauchen. Bunt- und Grünspecht haben <b>Gemeinsamkeiten</b>: Beide fressen Insekten, beide nutzen Baumhöhlen, und beide kommen in Parks vor. Deshalb kann es <b>manchmal ein wenig</b> Konkurrenz geben.<br>Sie unterscheiden sich aber deutlich: Der <b>Buntspecht</b> holt mit meißelartigem Schnabel und Widerhaken-Zunge Larven und Spinnen <b>aus der Borke</b> von Bäumen. Der <b>Grünspecht</b> sucht mit seiner langen, klebrigen Zunge <b>am Boden</b> nach Ameisen, vor allem auf Streuobstwiesen.<br>Weil sie <b>verschiedene Nahrung</b> in <b>verschiedenen Jagdrevieren</b> suchen, gibt es zwischen ihnen <b>kaum Konkurrenz</b>.',
        points: [
          'Definition: Konkurrenz = beide wollen oder brauchen dasselbe.',
          'Gemeinsamkeiten nennen (Insekten, Baumhöhlen, Parks).',
          'Unterschiede nennen: Buntspecht Borke/Larven, Grünspecht Boden/Ameisen.',
          'Schnabel und Zunge sind unterschiedlich angepasst.',
          'Fazit mit Begründung: kaum Konkurrenz, weil Nahrung und Jagdrevier verschieden sind.'
        ],
        starter: ['Konkurrenz bedeutet …', 'Beide Spechte …', 'Der Buntspecht …, der Grünspecht dagegen …', 'Deshalb …']
      },
      {
        id: 'ko-e2', op: 'Erläutere',
        task: 'Die Bestandsentwicklung (wie viele Spechte es gibt und in Zukunft geben wird) des Grünspechts hängt vom Winterklima, dem Angebot an Höhlenbäumen und dem Pestizideinsatz des Menschen ab. Erläutere diese Aussagen.',
        model: '<b>Winterklima:</b> Der Grünspecht sucht seine Nahrung, die Ameisen, am Boden. In kalten, schneereichen Wintern ist der Boden gefroren oder mit Schnee bedeckt. Dann findet er keine Nahrung, und viele Grünspechte verhungern.<br><b>Höhlenbäume:</b> Grünspechte übernachten und brüten in Baumhöhlen, die sie in morsche Stämme schlagen. Werden alte, morsche Bäume gefällt, fehlen ihnen Schlaf- und Brutplätze.<br><b>Pestizide:</b> Pestizide sind Gifte gegen Insekten. Sie töten auch Ameisen und andere Insekten, also die Nahrung des Grünspechts. Weniger Nahrung bedeutet weniger Grünspechte.',
        points: [
          'Winter: gefrorener Boden oder Schnee, Ameisen sind nicht erreichbar, Spechte verhungern.',
          'Höhlenbäume: Er braucht alte, morsche Bäume zum Schlafen und Brüten.',
          'Pestizide töten Insekten und Ameisen, also seine Nahrung.',
          'Folge jeweils: Es gibt weniger Grünspechte.'
        ],
        starter: ['Im Winter …', 'Der Grünspecht braucht Höhlenbäume, weil …', 'Pestizide …']
      },
      {
        id: 'ko-e3', op: 'Erkläre',
        task: 'Erkläre, warum die Konkurrenz zwischen zwei Buntspechten größer ist als zwischen einem Bunt- und einem Grünspecht.',
        model: 'Zwei Buntspechte haben <b>genau dieselben Ansprüche</b>: dieselbe Nahrung (Larven aus der Borke), dasselbe Jagdrevier und dieselbe Art von Bruthöhle. Sie wollen also genau dasselbe. Bunt- und Grünspecht dagegen nutzen verschiedene Nahrung an verschiedenen Orten. Je ähnlicher die Ansprüche zweier Lebewesen sind, desto größer ist die Konkurrenz.',
        points: [
          'Gleiche Art = gleiche Nahrung, gleiches Jagdrevier, gleiche Bruthöhlen.',
          'Bunt- und Grünspecht nutzen Verschiedenes.',
          'Je ähnlicher die Ansprüche, desto größer die Konkurrenz.'
        ],
        starter: ['Zwei Buntspechte …', 'Bunt- und Grünspecht dagegen …', 'Je ähnlicher …']
      }
    ],
    merke: [
      '<b>Konkurrenz:</b> Mehrere Lebewesen wollen oder brauchen dasselbe (Nahrung, Nistplatz, Licht …). Oft gibt es dabei Gewinner und Verlierer.',
      '<b>Buntspecht</b> (20–25 cm): meißelartiger Schnabel, Zunge mit Widerhaken, Larven und Spinnen aus der Borke, im Winter Samen; Wälder und Parks.',
      '<b>Grünspecht</b> (28–32 cm): spitzer Schnabel, klebrige Zunge bis 10 cm, vor allem Ameisen am Boden; Waldränder, Parks, Streuobstwiesen.',
      'Kaum Konkurrenz zwischen den beiden, weil sie verschiedene Nahrung an verschiedenen Orten suchen. Je ähnlicher die Ansprüche, desto größer die Konkurrenz.',
      'Grünspecht in Gefahr durch: kalte Winter (Ameisen unerreichbar), fehlende Höhlenbäume, Pestizide.',
      'Räuber und Beute sind keine Konkurrenten.'
    ]
  });
})();
