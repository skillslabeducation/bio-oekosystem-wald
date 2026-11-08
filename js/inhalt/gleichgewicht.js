/* Station: Biologisches Gleichgewicht (Quelle: Kopie "Das biologische Gleichgewicht – ein Räuber-Beute-Verhältnis",
   Abbildungen Waagemodell / Pfeilschema / Lebensgemeinschaft Wald + Lernzettel) */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  W.stations = W.stations || [];

  W.stations.push({
    id: 'gleichgewicht',
    title: 'Das biologische Gleichgewicht',
    short: 'Gleichgewicht',
    kompetenz: 'Ich kann erläutern, was man unter dem „biologischen Gleichgewicht“ versteht.',
    intro: 'Borkenkäfer und Buntspecht: Warum stirbt keiner von beiden aus? Spiel es im Simulator durch.',
    learn: [
      {
        t: 'text', h: 'Warum sterben die Borkenkäfer nicht aus?',
        p: [
          'Borkenkäfer haben viele Feinde: Spechte, Buntkäfer und Schlupfwespen. Die Schlupfwespe legt sogar ihre Eier in die Larven der Käfer. Trotzdem gibt es Borkenkäfer seit Millionen von Jahren. Und auch die Spechte verhungern nicht.',
          'Schau dir an, wie das zusammenhängt. Tippe im Simulator auf <b>Ein Jahr weiter</b> und beobachte beide Kurven.'
        ]
      },
      { t: 'widget', w: 'simulator' },
      {
        t: 'text', h: 'Ein Räuber-Beute-Verhältnis',
        p: [
          'Gibt es <b>viele Borkenkäfer</b>, finden die Spechte reichlich Nahrung. Sie können mehr Junge großziehen. Im nächsten Jahr gibt es also <b>mehr Spechte</b>, und die fressen mehr Käfer. Die <b>Käfer werden weniger</b>.',
          'Jetzt finden die Spechte weniger Nahrung und ziehen weniger Junge groß. Die <b>Spechte werden weniger</b>, und die Käfer können sich wieder vermehren. Alles beginnt von vorn.',
          'Über lange Zeit schwanken die Zahlen von Käfern und Spechten. Trotzdem bleiben Räuber und Beute erhalten.'
        ]
      },
      {
        t: 'merke',
        html: '<b>Biologisches Gleichgewicht:</b> Die Anzahl der Lebewesen einer Art schwankt. Über einen längeren Zeitraum betrachtet bleibt sie aber ungefähr gleich. Sie pendelt um einen <b>Mittelwert</b> (Durchschnittswert).'
      },
      {
        t: 'text', h: 'Das Pfeilschema',
        p: ['Im Arbeitsblatt wird die Beziehung mit zwei Pfeilen gezeigt. Tippe auf einen Pfeil, um ihn zu verstehen.']
      },
      { t: 'widget', w: 'pfeile' },
      {
        t: 'text', h: 'Ein Netz hält besser',
        p: [
          'Das Modell mit nur zwei Arten ist stark vereinfacht. In Wirklichkeit fressen Spechte nicht nur Borkenkäfer, und Borkenkäfer haben noch weitere Feinde. Spechte haben selbst Feinde, zum Beispiel den Habicht. Und in einem kalten, nassen Jahr bekommen die Käfer viel weniger Nachwuchs.',
          'So entsteht ein <b>vielfältiges Netzwerk</b> aus Beziehungen. Durch viele Feinde wird eine Übervermehrung der Käfer noch schneller rückgängig gemacht, als wenn es nur einen Feind gäbe. Probier es im Simulator aus: Schalte das <b>Netz aus vielen Beziehungen</b> ein.'
        ]
      },
      {
        t: 'merke',
        html: 'Je mehr Wechselbeziehungen es gibt, desto <b>stabiler</b> bleibt das biologische Gleichgewicht.'
      },
      {
        t: 'reveal',
        q: 'Im Waagemodell hängen Käfer und Spechte an einer Waage. Was passiert, wenn auf einer Seite plötzlich viel mehr ist?',
        a: 'Die Waage kippt, aber nur für eine Weile. Viele Käfer bedeuten viel Futter, also werden die Spechte mehr. Dann werden die Käfer weniger, und die Waage pendelt zurück. Sie steht nie ganz still, schwankt aber immer um die Mitte.'
      }
    ],
    practice: [
      {
        id: 'gg-reihe', type: 'order', h: 'Die Geschichte von Käfer und Specht',
        task: 'Der erste Satz steht schon. Tippe die übrigen Sätze in der richtigen Reihenfolge an.',
        fixedFirst: true,
        items: [
          { id: 'a', label: 'Es gibt sehr viele Borkenkäfer.' },
          { id: 'b', label: 'Die Spechte finden viel Nahrung und ziehen viele Junge groß.' },
          { id: 'c', label: 'Im nächsten Jahr gibt es mehr Spechte.' },
          { id: 'd', label: 'Die vielen Spechte fressen viele Käfer. Die Käfer werden weniger.' },
          { id: 'e', label: 'Die Spechte finden weniger Nahrung und ziehen weniger Junge groß.' },
          { id: 'f', label: 'Die Zahl der Spechte sinkt.' },
          { id: 'g', label: 'Die Käfer haben weniger Feinde und vermehren sich wieder stark.' }
        ]
      },
      {
        id: 'gg-kette', type: 'chain', h: 'Was passiert dann?',
        task: 'Im Wald ändert sich plötzlich etwas. Sag für jedes Lebewesen voraus, ob es mehr (+) oder weniger (−) wird.',
        scenarios: [
          {
            id: 'fuchs', title: 'Eine Krankheit lässt viele Füchse sterben.', start: { who: 'Füchse', dir: '-' },
            steps: [
              { who: 'Mäuse', frage: 'den Mäusen', answer: '+', why: 'Die Mäuse haben weniger Fressfeinde. Mehr Mäuse überleben.' },
              { who: 'Mäusebussarde', frage: 'den Mäusebussarden', answer: '+', why: 'Es gibt mehr Mäuse und weniger Konkurrenz durch den Fuchs. Die Bussarde finden mehr Nahrung.' },
              { who: 'Bucheckern und andere Samen', frage: 'den Bucheckern und anderen Samen am Boden', answer: '-', why: 'Die vielen Mäuse fressen mehr Samen. Es bleiben weniger übrig, aus denen junge Bäume keimen können.' },
              { who: 'Mäuse (einige Jahre später)', frage: 'den Mäusen einige Jahre später', answer: '-', why: 'Jetzt gibt es mehr Bussarde und weniger Futter. Die Zahl der Mäuse sinkt wieder. Das Gleichgewicht pendelt sich ein.' }
            ]
          },
          {
            id: 'mast', title: 'Ein Mastjahr: Fichten und Haselsträucher tragen besonders viele Zapfen und Nüsse.', start: { who: 'Zapfen und Nüsse', dir: '+' },
            steps: [
              { who: 'Eichhörnchen', frage: 'den Eichhörnchen', answer: '+', why: 'Eichhörnchen finden reichlich Futter und ziehen mehr Junge groß.' },
              { who: 'Mäuse', frage: 'den Mäusen', answer: '+', why: 'Auch Mäuse fressen Samen und Nüsse. Sie vermehren sich stark.' },
              { who: 'Füchse und Bussarde (im Jahr danach)', frage: 'den Füchsen und Bussarden im Jahr danach', answer: '+', why: 'Mehr Beute bedeutet mehr Nachwuchs bei den Räubern.' },
              { who: 'Mäuse (zwei Jahre später)', frage: 'den Mäusen zwei Jahre später', answer: '-', why: 'Jetzt gibt es mehr Räuber und wieder normal viel Futter. Die Zahl der Mäuse sinkt. Das Gleichgewicht pendelt sich ein.' }
            ]
          },
          {
            id: 'gift', title: 'Im Wald und auf den Wiesen werden viele Pestizide gegen Insekten gespritzt.', start: { who: 'Insekten und Ameisen', dir: '-' },
            steps: [
              { who: 'Buntspechte', frage: 'den Buntspechten', answer: '-', why: 'Sie finden weniger Käferlarven und Spinnen und ziehen weniger Junge groß.' },
              { who: 'Grünspechte', frage: 'den Grünspechten', answer: '-', why: 'Ihre Hauptnahrung, die Ameisen, wird weniger.' },
              { who: 'Waldeidechsen', frage: 'den Waldeidechsen', answer: '-', why: 'Waldeidechsen fressen Insekten und Spinnen. Ihnen fehlt die Nahrung.' }
            ]
          }
        ]
      },
      {
        id: 'gg-quiz', type: 'quiz', h: 'Stimmt das?',
        task: 'Entscheide bei jeder Aussage.',
        questions: [
          { kind: 'tf', q: 'Im biologischen Gleichgewicht bleibt die Zahl jeder Art jedes Jahr genau gleich.', answer: false, why: 'Falsch. Die Zahlen schwanken, pendeln aber um einen Mittelwert.' },
          { kind: 'tf', q: 'Wenn es weniger Spechte gibt, gibt es bald mehr Borkenkäfer.', answer: true, why: 'Richtig. Weniger Fressfeinde, mehr Käfer überleben (−Pfeil: je weniger, desto mehr).' },
          { kind: 'tf', q: 'Ein Wald mit vielen verschiedenen Arten ist stabiler als ein Wald mit wenigen Arten.', answer: true, why: 'Richtig. Je mehr Wechselbeziehungen, desto stabiler das Gleichgewicht.' },
          { kind: 'single', q: 'Der +Pfeil vom Borkenkäfer zum Specht bedeutet …', options: ['je mehr Käfer, desto mehr Spechte', 'je mehr Käfer, desto weniger Spechte', 'je mehr Spechte, desto mehr Käfer', 'Spechte und Käfer sind gleich viele'], answer: 0, why: 'Mehr Käfer heißt mehr Futter, also mehr Nachwuchs bei den Spechten.' },
          { kind: 'single', q: 'Der −Pfeil vom Specht zum Borkenkäfer bedeutet …', options: ['je mehr Spechte, desto mehr Käfer', 'je mehr Spechte, desto weniger Käfer', 'je weniger Spechte, desto weniger Käfer', 'Spechte fressen keine Käfer'], answer: 1, why: 'Mehr Spechte fressen mehr Käfer, also werden die Käfer weniger.' }
        ]
      }
    ],
    explain: [
      {
        id: 'gg-e1', op: 'Erkläre',
        task: 'Erkläre in eigenen Worten, was man unter dem biologischen Gleichgewicht versteht.',
        model: 'Im biologischen Gleichgewicht <b>schwankt</b> die Anzahl der Lebewesen einer Art zwar immer wieder, über einen <b>längeren Zeitraum</b> bleibt sie aber <b>ungefähr gleich</b>. Sie pendelt um einen Mittelwert.<br>Ein Beispiel ist das Räuber-Beute-Verhältnis von Buntspecht und Borkenkäfer: Gibt es viele Käfer, finden die Spechte viel Nahrung und bekommen mehr Junge. Dann fressen mehr Spechte mehr Käfer, und die Käfer werden weniger. Danach finden die Spechte weniger Nahrung und werden auch weniger. Jetzt können sich die Käfer wieder vermehren. So bleiben beide Arten erhalten.',
        points: [
          'Die Anzahl der Lebewesen schwankt.',
          'Über einen längeren Zeitraum bleibt sie ungefähr gleich (pendelt um einen Mittelwert).',
          'Beispiel Räuber und Beute (Buntspecht und Borkenkäfer) mit dem Ablauf mehr/weniger.',
          'Beide Arten bleiben erhalten.'
        ],
        starter: ['Biologisches Gleichgewicht bedeutet, dass …', 'Zum Beispiel …', 'Wenn es viele Borkenkäfer gibt, …']
      },
      {
        id: 'gg-e2', op: 'Erkläre',
        task: 'Im Pfeilschema bedeutet der +Pfeil „je mehr, desto mehr“ und der −Pfeil „je mehr, desto weniger“. Erkläre, was damit ausgedrückt wird.',
        model: 'Der <b>+Pfeil</b> zeigt vom Borkenkäfer zum Buntspecht: Je mehr Käfer es gibt, desto mehr Nahrung haben die Spechte und desto mehr Spechte gibt es. Umgekehrt gilt auch: Je weniger Käfer, desto weniger Spechte.<br>Der <b>−Pfeil</b> zeigt vom Buntspecht zum Borkenkäfer: Je mehr Spechte es gibt, desto mehr Käfer werden gefressen und desto weniger Käfer gibt es. Umgekehrt: Je weniger Spechte, desto mehr Käfer.<br>Beide Pfeile zusammen bilden einen <b>Kreislauf</b>, der die Zahlen von Räuber und Beute immer wieder ausgleicht.',
        points: [
          '+Pfeil: mehr Käfer → mehr Nahrung → mehr Spechte (und weniger Käfer → weniger Spechte).',
          '−Pfeil: mehr Spechte → mehr Käfer gefressen → weniger Käfer (und weniger Spechte → mehr Käfer).',
          'Zusammen gleichen die Pfeile die Zahlen immer wieder aus (Kreislauf).'
        ],
        starter: ['Der +Pfeil bedeutet, dass …', 'Der −Pfeil bedeutet, dass …', 'Zusammen …']
      },
      {
        id: 'gg-e3', op: 'Beschreibe',
        task: 'In einem Jahr vermehren sich die Eichhörnchen sehr stark, weil es viele Fichtenzapfen und Haselnüsse gibt. Beschreibe, wie sich das auf andere Lebewesen der Lebensgemeinschaft auswirkt. Kennzeichne Zunahme mit + und Abnahme mit −.',
        model: 'Eichhörnchen <b>+</b>: Sie finden viel Futter.<br>Räuber wie der Fuchs (und gelegentlich der Mäusebussard) <b>+</b>: Sie finden mehr Beute und ziehen mehr Junge groß.<br>Keimlinge und junge Fichten und Haseln <b>−</b>: Die vielen Eichhörnchen fressen mehr Samen, also keimen weniger.<br>Eichhörnchen später <b>−</b>: Mehr Räuber und weniger Futter lassen ihre Zahl wieder sinken. Das Gleichgewicht pendelt sich wieder ein.',
        points: [
          'Eichhörnchen + (viel Futter).',
          'Räuber wie der Fuchs + (mehr Beute).',
          'Keimlinge und junge Bäume − (mehr Samen werden gefressen).',
          'Später wieder weniger Eichhörnchen: Das Gleichgewicht stellt sich wieder ein.'
        ],
        starter: ['Zuerst …', 'Dadurch …', 'Nach einiger Zeit …']
      }
    ],
    merke: [
      '<b>Biologisches Gleichgewicht:</b> Die Zahl der Lebewesen einer Art schwankt, bleibt aber über einen längeren Zeitraum ungefähr gleich (pendelt um einen Mittelwert).',
      'Räuber-Beute: viele Käfer → mehr Spechte → weniger Käfer → weniger Spechte → wieder mehr Käfer …',
      '+Pfeil: je mehr, desto mehr (je weniger, desto weniger). −Pfeil: je mehr, desto weniger (je weniger, desto mehr).',
      'Je mehr Wechselbeziehungen es gibt, desto stabiler ist das biologische Gleichgewicht.'
    ]
  });
})();
