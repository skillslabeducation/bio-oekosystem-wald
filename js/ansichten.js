/* Bildschirme: Karte, Station, Försterprüfung, Feldbuch, Diplom. */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var h = W.h, A = W.art;
  var V = (W.views = {});

  var ICON = { stockwerke: 'stockwerke', nahrung: 'kreislauf', gleichgewicht: 'waage', konkurrenz: 'konkurrenz', nische: 'nische', bestimmung: 'lupe' };
  /* Wegweiser auf der Karte: Fußpunkt in Prozent der Karte */
  var POS = { stockwerke: [24, 21], gleichgewicht: [26, 66], nahrung: [49, 80], nische: [64, 41], konkurrenz: [86, 33], bestimmung: [11, 81] };
  V.ICON = ICON;

  function svg(markup) { var d = h('div'); d.innerHTML = markup; return d.firstElementChild; }
  function station(id) { return W.stations.filter(function (s) { return s.id === id; })[0]; }
  function go(hash) { location.hash = hash; }

  function stempel(st, klein) {
    var el = h('span', { class: 'stempel' + (klein ? ' stempel--klein' : '') });
    el.innerHTML = A.icon(ICON[st.id]);
    el.appendChild(h('span', { class: 'stempel__text' }, st.short));
    return el;
  }

  /* =========================================================
     Karte
     ========================================================= */
  V.karte = function (root) {
    var d = W.state.data;
    var stamps = W.state.stamps();
    var next = W.stations.filter(function (s) { return !W.state.stationProgress(s).stamp; })[0];

    var intro = h('div', { class: 'karte-intro' },
      h('h1', { class: 'karte-intro__titel' }, d.name ? 'Hallo, ' + d.name + '!' : 'Willkommen im Wald!'),
      h('p', { class: 'karte-intro__text' }, stamps
        ? 'Du hast ' + stamps + ' von ' + W.stations.length + ' Stempeln. ' + (next ? 'Die nächste Station wartet schon.' : 'Alle Stationen geschafft. Jetzt ab auf den Hochsitz zur Försterprüfung!')
        : 'Sechs Stationen warten im Wald. Sammle an jeder einen Stempel und hol dir in der Försterprüfung am Hochsitz das Walddiplom.'),
      next
        ? h('p', { class: 'karte-intro__weiter' }, h('button', { class: 'knopf knopf--primaer', type: 'button', onclick: function () { go('#/station/' + next.id); } }, stamps ? 'Weiter: ' + next.short : 'Los geht’s: ' + next.short))
        : h('p', { class: 'karte-intro__weiter' }, h('button', { class: 'knopf knopf--primaer', type: 'button', onclick: function () { go('#/pruefung'); } }, 'Zur Försterprüfung')));

    var map = h('div', { class: 'karte' });
    var art = svg(A.forest());
    map.appendChild(art);
    if (!V._grown && !W.reducedMotion()) { map.classList.add('karte--waechst'); V._grown = true; }

    W.stations.forEach(function (st, i) {
      var p = W.state.stationProgress(st);
      var pos = POS[st.id];
      var sign = h('button', {
        class: 'schild' + (p.stamp ? ' schild--fertig' : '') + (next && next.id === st.id ? ' schild--naechstes' : '') + (pos[0] > 75 ? ' schild--rechts' : pos[0] < 20 ? ' schild--links' : ''),
        type: 'button',
        style: { left: pos[0] + '%', top: pos[1] + '%', animationDelay: (1.7 + i * 0.08) + 's' },
        'aria-label': st.title + (p.stamp ? ', Stempel erhalten' : ', ' + p.done + ' von ' + p.total + ' Übungen')
      },
        h('span', { class: 'schild__brett' }, svg(A.icon(ICON[st.id], 'schild__ico')), h('span', { class: 'schild__name' }, st.short),
          p.stamp ? h('span', { class: 'schild__haken', 'aria-hidden': 'true' }, '✓') : null),
        h('span', { class: 'schild__pfahl', 'aria-hidden': 'true' }));
      sign.addEventListener('click', function () { go('#/station/' + st.id); });
      map.appendChild(sign);
    });
    var hoch = h('button', { class: 'schild schild--pruefung schild--rechts', type: 'button', style: { left: '89%', top: '62%', animationDelay: '2.3s' }, 'aria-label': 'Försterprüfung am Hochsitz' },
      h('span', { class: 'schild__brett' }, svg(A.icon('diplom', 'schild__ico')), h('span', { class: 'schild__name' }, 'Prüfung')),
      h('span', { class: 'schild__pfahl', 'aria-hidden': 'true' }));
    hoch.addEventListener('click', function () { go('#/pruefung'); });
    map.appendChild(hoch);

    // Liste unter der Karte
    var list = h('ul', { class: 'stationsliste' });
    W.stations.forEach(function (st) {
      var p = W.state.stationProgress(st);
      var pct = Math.round((p.done + Math.min(p.explDone, 1)) / (p.total + 1) * 100);
      list.appendChild(h('li', null, h('a', { class: 'station-karte' + (p.stamp ? ' station-karte--fertig' : ''), href: '#/station/' + st.id },
        p.stamp ? stempel(st, true) : svg(A.icon(ICON[st.id], 'station-karte__ico')),
        h('span', { class: 'station-karte__text' },
          h('b', null, st.title),
          h('span', null, st.intro),
          h('span', { class: 'fortschritt', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': 'Fortschritt' }, h('span', { class: 'fortschritt__balken', style: { width: pct + '%' } }))))));
    });

    var extra = h('div', { class: 'karte-extra' },
      h('a', { class: 'kachel kachel--pruefung', href: '#/pruefung' }, svg(A.icon('diplom', 'kachel__ico')),
        h('span', null, h('b', null, 'Försterprüfung'), h('span', null, d.quiz.best ? 'Bestes Ergebnis: ' + Math.round(d.quiz.best * 100) + ' %' : '15 Fragen aus allen Stationen. Ab 80 % gibt es das Walddiplom.'))),
      h('a', { class: 'kachel kachel--feldbuch', href: '#/feldbuch' }, svg(A.icon('feldbuch', 'kachel__ico')),
        h('span', null, h('b', null, 'Feldbuch'), h('span', null, 'Alle Merksätze auf einen Blick, deine Stempel und der Lernplan.'))));

    root.appendChild(intro);
    root.appendChild(map);
    if (V.pendingFeier) {
      var pf = station(V.pendingFeier);
      V.pendingFeier = null;
      if (pf) setTimeout(function () { feiern(pf, true); }, map.classList.contains('karte--waechst') ? 2400 : 500);
    }
    root.appendChild(h('div', { class: 'seite seite--breit' },
      h('h2', { class: 'abschnitt' }, 'Die Stationen'), list, extra));
  };

  /* =========================================================
     Station
     ========================================================= */
  V.station = function (root, id, tab) {
    var st = station(id);
    if (!st) { go('#/'); return; }
    W.state.markSeen(id);
    tab = tab || 'entdecken';
    var before = W.state.stationProgress(st).stamp;

    var p = W.state.stationProgress(st);
    var tabs = [
      ['entdecken', 'Entdecken', ''],
      ['ueben', 'Üben', p.done + '/' + p.total],
      ['erklaeren', 'Erklären', p.explDone + '/' + p.explTotal]
    ];
    var nav = h('nav', { class: 'reiter', 'aria-label': 'Teile der Station' }, tabs.map(function (t, i) {
      return h('a', { class: 'reiter__tab' + (t[0] === tab ? ' reiter__tab--an' : ''), href: '#/station/' + id + '/' + t[0], 'aria-current': t[0] === tab ? 'page' : null },
        h('span', { class: 'reiter__nr' }, String(i + 1)), t[1], t[2] ? h('small', null, t[2]) : null);
    }));

    var kopf = h('header', { class: 'station-kopf' },
      svg(A.icon(ICON[id], 'station-kopf__ico')),
      h('div', null, h('h1', null, st.title), h('p', { class: 'station-kopf__ziel' }, h('b', null, 'Das sollst du können: '), st.kompetenz)));

    var seite = h('div', { class: 'seite' });
    var body = h('div', { class: 'station-body' });

    function onDone() {
      var now = W.state.stationProgress(st);
      // Reiter-Zähler aktualisieren
      nav.children[1].querySelector('small').textContent = now.done + '/' + now.total;
      nav.children[2].querySelector('small').textContent = now.explDone + '/' + now.explTotal;
      if (now.stamp && !before) {
        before = true;
        if (tab === 'erklaeren') {
          // Nicht über die Musterlösung legen: Der Stempel wartet auf der Karte.
          V.pendingFeier = st.id;
          body.insertBefore(h('aside', { class: 'stempel-hinweis', role: 'status' }, stempel(st, true),
            h('p', null, h('b', null, 'Stempel verdient! '), 'Lies in Ruhe die Musterlösung. Dein Stempel wartet auf der Karte.')), body.firstChild);
        } else {
          setTimeout(function () { feiern(st); }, 700);
        }
      }
    }

    if (tab === 'entdecken') {
      st.learn.forEach(function (b) { body.appendChild(block(b)); });
      body.appendChild(weiter('Weiter zum Üben', '#/station/' + id + '/ueben'));
    } else if (tab === 'ueben') {
      st.practice.forEach(function (ex) {
        var holder = h('div');
        var ctx = {
          onDone: onDone,
          redo: function () { var fresh = W.ex.render(ex, ctx); holder.replaceChild(fresh, holder.firstChild); fresh.scrollIntoView({ behavior: W.reducedMotion() ? 'auto' : 'smooth', block: 'start' }); }
        };
        holder.appendChild(W.ex.render(ex, ctx));
        body.appendChild(holder);
      });
      body.appendChild(weiter('Weiter zum Erklären', '#/station/' + id + '/erklaeren'));
    } else {
      body.appendChild(h('div', { class: 'erklaer-intro' },
        h('p', null, 'In der Klassenarbeit musst du Dinge in ganzen Sätzen erklären. Hier übst du genau das. Schreib zuerst deine eigene Antwort, dann vergleiche sie mit der Musterlösung und hake ab, was du schon drin hattest.'),
        h('p', null, 'Tippe auf das grüne Wort (z. B. ', h('b', null, 'Erkläre'), '), um zu sehen, was die Aufgabe genau von dir will.')));
      st.explain.forEach(function (pr) { body.appendChild(W.ex.explain(pr, { onDone: onDone })); });
      var idx = W.stations.indexOf(st);
      var nx = W.stations[idx + 1];
      body.appendChild(nx ? weiter('Nächste Station: ' + nx.short, '#/station/' + nx.id) : weiter('Zur Försterprüfung', '#/pruefung'));
    }

    seite.appendChild(kopf);
    seite.appendChild(nav);
    seite.appendChild(body);
    root.appendChild(seite);
  };

  function weiter(label, href) {
    return h('div', { class: 'weiter' }, h('a', { class: 'knopf knopf--primaer knopf--gross', href: href }, label));
  }

  function block(b) {
    if (b.t === 'text') {
      return h('section', { class: 'lern' }, b.h ? h('h2', null, b.h) : null, b.p.map(function (p) { return h('p', { html: p }); }));
    }
    if (b.t === 'merke') {
      return h('aside', { class: 'merke' }, h('p', { class: 'merke__titel' }, 'Merke'), h('p', { html: b.html }));
    }
    if (b.t === 'fact') {
      return h('aside', { class: 'fakt' }, h('p', { class: 'fakt__titel' }, b.h), h('p', { html: b.html }));
    }
    if (b.t === 'reveal') {
      var ans = h('div', { class: 'denk__antwort', hidden: true }, h('p', { html: b.a }));
      var bt = h('button', { class: 'knopf knopf--leise', type: 'button' }, 'Erst überlegen, dann aufdecken');
      bt.addEventListener('click', function () { ans.hidden = false; bt.remove(); });
      return h('aside', { class: 'denk' }, h('p', { class: 'denk__titel' }, 'Denk mit'), h('p', { class: 'denk__frage' }, b.q), bt, ans);
    }
    if (b.t === 'widget') {
      var fn = W.widgets[b.w];
      return fn ? fn(b) : h('p', null, 'Fehlender Baustein: ' + b.w);
    }
    return h('div');
  }

  /* Station geschafft: Stempel-Moment */
  function rangText(stamps) {
    var rank = W.logic.rankFor(stamps);
    var next = W.logic.RANKS.filter(function (r) { return r.min > stamps; })[0];
    return h('p', { class: 'feier__rang' }, 'Dein Rang: ', h('b', null, rank.name), ' (' + rank.layer + ')',
      next ? h('span', { class: 'feier__naechster' }, 'Noch ' + (next.min - stamps) + (next.min - stamps === 1 ? ' Stempel' : ' Stempel') + ' bis ' + next.name + '.') : null);
  }
  V.rangText = rangText;

  function feiern(st, aufKarte) {
    var layer = h('div', { class: 'feier', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Station geschafft' });
    var stamp = stempel(st);
    stamp.classList.add('stempel--gross');
    var stamps = W.state.stamps();
    var ok = h('button', { class: 'knopf knopf--primaer', type: 'button' }, aufKarte ? 'Super!' : 'Weiter lernen');
    var map = aufKarte ? null : h('button', { class: 'knopf knopf--leise', type: 'button' }, 'Zur Karte');
    layer.appendChild(h('div', { class: 'feier__karte' },
      h('p', { class: 'feier__titel' }, 'Station geschafft!'),
      stamp,
      h('p', null, 'Der Stempel ist in deinem Feldbuch. Du hast jetzt ' + stamps + ' von ' + W.stations.length + ' Stempeln.'),
      rangText(stamps),
      h('div', { class: 'feier__knoepfe' }, ok, map)));
    function close() { layer.remove(); }
    ok.addEventListener('click', close);
    if (map) map.addEventListener('click', function () { close(); go('#/'); });
    layer.addEventListener('click', function (e) { if (e.target === layer) close(); });
    document.body.appendChild(layer);
    ok.focus();
  }

  /* =========================================================
     Försterprüfung
     ========================================================= */
  V.pruefung = function (root) {
    var seite = h('div', { class: 'seite' });
    root.appendChild(seite);
    var d = W.state.data;

    function start() {
      seite.innerHTML = '';
      var chips = h('div', { class: 'themenwahl' });
      W.stations.forEach(function (st) {
        chips.appendChild(h('button', { class: 'knopf knopf--leise', type: 'button', onclick: function () { run(st.id); } }, st.short));
      });
      seite.appendChild(h('header', { class: 'station-kopf' }, svg(A.icon('diplom', 'station-kopf__ico')),
        h('div', null, h('h1', null, 'Försterprüfung'), h('p', { class: 'station-kopf__ziel' }, 'Oben auf dem Hochsitz prüft die Försterin, ob du den Wald verstanden hast.'))));
      seite.appendChild(h('section', { class: 'lern' },
        h('p', null, h('b', null, '15 Fragen'), ' aus allen sechs Stationen, gemischt. Nach jeder Frage siehst du sofort, ob du richtig lagst, und warum.'),
        h('p', null, 'Ab ', h('b', null, '12 richtigen Antworten (80 %)'), ' bekommst du das Walddiplom.'),
        d.quiz.best ? h('p', null, 'Dein bisher bestes Ergebnis: ', h('b', null, Math.round(d.quiz.best * 100) + ' %')) : null,
        h('div', { class: 'uebung__aktionen' }, h('button', { class: 'knopf knopf--primaer knopf--gross', type: 'button', onclick: function () { run(null); } }, 'Prüfung starten'))));
      seite.appendChild(h('section', { class: 'lern' },
        h('h2', null, 'Nur ein Thema üben'),
        h('p', null, 'Acht Fragen zu einer einzigen Station. Das zählt nicht fürs Diplom.'), chips));
      if (d.diplom) seite.appendChild(diplom(d.diplom));
    }

    function run(only) {
      var qs = W.logic.drawQuiz(W.QUIZ, only ? 8 : 15, Math.random, only);
      var i = 0, right = 0, wrong = [], by = {};
      seite.innerHTML = '';
      var spur = h('ol', { class: 'spur', 'aria-label': 'Fortschritt' }, qs.map(function () { return h('li'); }));
      var stage = h('div', { class: 'pruefung' });
      var foot = h('div', { class: 'uebung__aktionen' });
      seite.appendChild(h('header', { class: 'pruefung__kopf' },
        h('h1', null, only ? 'Themen-Training: ' + station(only).short : 'Försterprüfung'),
        h('button', { class: 'knopf knopf--leise', type: 'button', onclick: function () { if (confirm('Prüfung abbrechen? Dein Fortschritt in dieser Runde geht verloren.')) start(); } }, 'Abbrechen')));
      seite.appendChild(spur);
      seite.appendChild(stage);
      seite.appendChild(foot);

      function show() {
        stage.innerHTML = '';
        foot.innerHTML = '';
        var q = qs[i];
        spur.children[i].classList.add('spur--jetzt');
        stage.appendChild(h('p', { class: 'quiz__zaehler' }, 'Frage ' + (i + 1) + ' von ' + qs.length + ' · ' + station(q.station).short));
        stage.appendChild(W.ex.question(q, function (ok) {
          by[q.station] = by[q.station] || { r: 0, n: 0 };
          by[q.station].n++;
          spur.children[i].classList.remove('spur--jetzt');
          spur.children[i].classList.add(ok ? 'spur--gut' : 'spur--fehler');
          if (ok) { right++; by[q.station].r++; } else wrong.push(q);
          var last = i === qs.length - 1;
          foot.appendChild(h('button', { class: 'knopf knopf--primaer knopf--gross', type: 'button', onclick: function () { if (last) end(); else { i++; show(); window.scrollTo(0, 0); } } }, last ? 'Ergebnis ansehen' : 'Nächste Frage'));
          foot.lastChild.focus({ preventScroll: true });
          setTimeout(function () { foot.scrollIntoView({ block: 'nearest', behavior: W.reducedMotion() ? 'auto' : 'smooth' }); }, 40);
        }));
      }
      function end() {
        var pct = right / qs.length;
        var run = { date: new Date().toISOString(), score: right, n: qs.length, only: only || null };
        W.state.recordQuiz(run);
        W.state.addAcorns(right * 2);
        var earned = !only && pct >= 0.8;
        var neuesDiplom = earned && !W.state.data.diplom;
        if (earned) { W.state.data.diplom = { date: new Date().toISOString(), score: Math.max(right, (W.state.data.diplom || {}).score || 0), n: qs.length }; W.state.save(); }
        var fehlt = Math.ceil(qs.length * 0.8) - right;
        seite.innerHTML = '';
        seite.appendChild(h('header', { class: 'station-kopf' }, svg(A.icon('diplom', 'station-kopf__ico')),
          h('div', null, h('h1', null, right + ' von ' + qs.length + ' richtig'),
            h('p', { class: 'station-kopf__ziel' }, h('b', null, '+' + right * 2 + ' Eicheln. '),
              earned ? 'Bestanden! Das Walddiplom gehört dir.' : only ? 'Themen-Training beendet.'
                : fehlt === 1 ? 'Nur eine einzige Antwort hat zum Diplom gefehlt! Gleich nochmal?'
                  : pct >= 0.6 ? 'Gut! Für das Diplom fehlen noch ' + fehlt + ' richtige Antworten.'
                    : 'Wiederhole die Stationen unten, dann klappt es beim nächsten Mal.'))));
        if (earned) seite.appendChild(diplom(W.state.data.diplom));
        var rows = h('ul', { class: 'auswertung' });
        W.stations.map(function (s) { return s.id; }).filter(function (sid) { return by[sid]; }).forEach(function (sid) {
          var b = by[sid], st = station(sid), ok = b.r === b.n;
          rows.appendChild(h('li', { class: ok ? 'auswertung--gut' : '' },
            h('span', null, st.short), h('span', { class: 'auswertung__wert' }, b.r + '/' + b.n),
            ok ? h('span', { class: 'auswertung__tipp' }, 'sitzt') : h('a', { class: 'knopf knopf--klein', href: '#/station/' + sid + '/ueben' }, 'Nochmal üben')));
        });
        seite.appendChild(h('section', { class: 'lern' }, h('h2', null, 'Nach Stationen'), rows));
        if (wrong.length) {
          seite.appendChild(h('section', { class: 'lern' }, h('h2', null, 'Das lohnt sich nachzulesen'),
            h('ul', { class: 'fehlerliste' }, wrong.map(function (q) {
              return h('li', null, h('p', null, q.q), h('p', null, h('b', null, 'Richtig: '), W.ex.answerText(q).replace(/\.$/, '') + '. ', W.ex.whyText(q)));
            }))));
        }
        if (neuesDiplom) setTimeout(function () { diplomFeier(); }, 300);
        seite.appendChild(h('div', { class: 'weiter' },
          h('button', { class: 'knopf knopf--primaer knopf--gross', type: 'button', onclick: function () { run(only); } }, 'Neue Runde'),
          h('a', { class: 'knopf knopf--leise', href: '#/' }, 'Zur Karte')));
        window.scrollTo(0, 0);
      }
      show();
    }
    start();
  };

  /* Großer Moment: das Diplom zuerst, mit fallenden Blättern */
  function diplomFeier() {
    var layer = h('div', { class: 'feier feier--diplom', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Walddiplom erhalten' });
    var regen = h('div', { class: 'blattregen', 'aria-hidden': 'true' });
    if (!W.reducedMotion()) {
      for (var k = 0; k < 18; k++) {
        var leaf = svg(A.leaf(A.LEAF_IDS[k % A.LEAF_IDS.length]));
        leaf.style.left = (k * 5.6 + Math.random() * 4) + '%';
        leaf.style.animationDelay = (Math.random() * 1.6) + 's';
        leaf.style.animationDuration = (2.6 + Math.random() * 1.8) + 's';
        regen.appendChild(leaf);
      }
    }
    var ok = h('button', { class: 'knopf knopf--primaer knopf--gross', type: 'button' }, 'Juhu!');
    var karte = h('div', { class: 'feier__karte feier__karte--diplom' }, diplom(W.state.data.diplom), h('div', { class: 'feier__knoepfe' }, ok));
    layer.appendChild(regen);
    layer.appendChild(karte);
    ok.addEventListener('click', function () { layer.remove(); });
    document.body.appendChild(layer);
    ok.focus();
  }

  function diplom(info) {
    var name = W.state.data.name || '';
    var date = new Date(info.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
    var el = h('section', { class: 'diplom', 'aria-label': 'Walddiplom' },
      h('p', { class: 'diplom__oben' }, 'Urkunde'),
      h('h2', { class: 'diplom__titel' }, 'Walddiplom'),
      name ? h('p', { class: 'diplom__fuer' }, name) : null,
      h('p', null, (name ? 'hat' : 'Die Inhaberin oder der Inhaber dieser Urkunde hat') + ' die Försterprüfung mit ' + info.score + ' von ' + info.n + ' richtigen Antworten bestanden und kennt sich aus mit Stockwerken, Stoffkreislauf, Gleichgewicht, Konkurrenz, Nischen und Blättern.'),
      h('p', { class: 'diplom__datum' }, date),
      svg(A.icon('eichel', 'diplom__siegel')),
      h('div', { class: 'uebung__aktionen diplom__druck' }, h('button', { class: 'knopf knopf--leise', type: 'button', onclick: function () { document.body.classList.add('druck-diplom'); window.print(); setTimeout(function () { document.body.classList.remove('druck-diplom'); }, 500); } }, 'Diplom drucken')));
    return el;
  }

  /* =========================================================
     Feldbuch
     ========================================================= */
  V.feldbuch = function (root) {
    var d = W.state.data;
    var seite = h('div', { class: 'seite feldbuch' });
    seite.appendChild(h('header', { class: 'station-kopf' }, svg(A.icon('feldbuch', 'station-kopf__ico')),
      h('div', null, h('h1', null, 'Feldbuch'), h('p', { class: 'station-kopf__ziel' }, 'Dein Lernzettel für den Abend vor der Arbeit.'))));

    var stamps = h('div', { class: 'stempelfeld' });
    W.stations.forEach(function (st) {
      var p = W.state.stationProgress(st);
      stamps.appendChild(p.stamp ? stempel(st) : h('a', { class: 'stempel stempel--leer', href: '#/station/' + st.id }, h('span', { class: 'stempel__text' }, st.short)));
    });
    seite.appendChild(h('section', { class: 'lern', id: 'rang' }, h('h2', null, 'Stempel und Rang'), stamps,
      rangText(W.state.stamps()),
      h('p', null, 'Dein Rang wächst wie ein Baum durch die Stockwerke: ', h('b', null, 'Keimling'), ' (Moosschicht) → ', h('b', null, 'Setzling'), ' (Krautschicht, ab 2 Stempeln) → ', h('b', null, 'Jungbaum'), ' (Strauchschicht, ab 4) → ', h('b', null, 'Waldriese'), ' (Baumschicht, alle 6).'),
      h('p', null, 'Gesammelt: ', h('b', null, W.state.data.acorns + ' Eicheln'), '. Eicheln gibt es für jede Übung, jeden abgehakten Punkt beim Erklären und jede richtige Prüfungsfrage.')));
    if (d.diplom) seite.appendChild(diplom(d.diplom));

    seite.appendChild(h('div', { class: 'uebung__aktionen nicht-drucken' },
      h('button', { class: 'knopf knopf--primaer', type: 'button', onclick: function () { window.print(); } }, 'Lernzettel drucken')));

    W.stations.forEach(function (st) {
      seite.appendChild(h('section', { class: 'lern lernzettel' },
        h('h2', null, svg(A.icon(ICON[st.id], 'lernzettel__ico')), st.title),
        h('p', { class: 'lernzettel__ziel' }, st.kompetenz),
        h('ul', null, st.merke.map(function (m) { return h('li', { html: m }); }))));
    });

    var ops = h('dl', { class: 'operatoren' });
    Object.keys(W.OPERATOREN).forEach(function (k) { ops.appendChild(h('dt', null, k)); ops.appendChild(h('dd', null, W.OPERATOREN[k])); });
    seite.appendChild(h('section', { class: 'lern lernzettel' }, h('h2', null, 'Was will die Aufgabe? Die Operatoren'), ops));

    seite.appendChild(h('section', { class: 'lern nicht-drucken' }, h('h2', null, 'So kannst du lernen'),
      h('ol', { class: 'lernplan' },
        h('li', null, h('b', null, 'Tag 1: '), 'Stockwerke und Wer frisst wen? (Entdecken und Üben)'),
        h('li', null, h('b', null, 'Tag 2: '), 'Biologisches Gleichgewicht. Spiel mit dem Simulator, bis du die Kurven erklären kannst.'),
        h('li', null, h('b', null, 'Tag 3: '), 'Konkurrenz und ökologische Nische'),
        h('li', null, h('b', null, 'Tag 4: '), 'Blätter bestimmen und alle Erklär-Aufgaben, die du noch nicht gemacht hast'),
        h('li', null, h('b', null, 'Tag 5: '), 'Försterprüfung, Fehler nachlesen, Feldbuch lesen. Früh schlafen!')),
      h('p', null, 'Tipp: Erkläre jemandem aus der Familie das biologische Gleichgewicht mit dem Simulator. Wer etwas erklären kann, hat es verstanden.')));

    var reset = h('button', { class: 'knopf knopf--leise knopf--gefahr', type: 'button' }, 'Fortschritt löschen');
    reset.addEventListener('click', function () {
      if (confirm('Wirklich alles löschen? Stempel, Eicheln und Antworten gehen verloren.')) { W.state.reset(); go('#/'); location.reload(); }
    });
    var nameBtn = h('button', { class: 'knopf knopf--leise', type: 'button', onclick: function () { V.nameDialog(true); } }, 'Namen ändern');
    seite.appendChild(h('section', { class: 'lern nicht-drucken' }, h('h2', null, 'Einstellungen'),
      h('p', null, 'Dein Fortschritt wird nur auf diesem Gerät gespeichert. Nichts wird ins Internet geschickt.'),
      h('div', { class: 'uebung__aktionen' }, nameBtn, reset)));
    root.appendChild(seite);
  };

  /* =========================================================
     Name beim ersten Start
     ========================================================= */
  V.nameDialog = function (force) {
    var d = W.state.data;
    if (!force && (d.name || W.store.get('expedition-wald-ohne-name', false))) return;
    var input = h('input', { type: 'text', class: 'eingabe', maxlength: '30', autocomplete: 'off', 'aria-label': 'Dein Vorname', placeholder: 'Vorname' });
    input.value = d.name || '';
    var layer = h('div', { class: 'feier', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'name-titel' });
    function ok() {
      if (!input.value.trim()) { skip(); return; }
      W.state.setName(input.value); layer.remove(); W.app.render();
    }
    function skip() { W.store.set('expedition-wald-ohne-name', true); layer.remove(); }
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') ok(); });
    layer.appendChild(h('div', { class: 'feier__karte feier__karte--name' },
      svg(A.icon('feldbuch', 'feier__ico')),
      h('p', { class: 'feier__titel', id: 'name-titel' }, 'Willkommen im Wald'),
      h('p', null, 'Wie heißt du? Dein Name steht dann in deinem Feldbuch und auf dem Diplom. Er bleibt nur auf diesem Gerät.'),
      input,
      h('div', { class: 'feier__knoepfe' },
        h('button', { class: 'knopf knopf--primaer', type: 'button', onclick: ok }, 'Expedition starten'),
        force ? null : h('button', { class: 'knopf knopf--leise', type: 'button', onclick: skip }, 'Ohne Namen weiter'))));
    document.body.appendChild(layer);
    setTimeout(function () { input.focus(); }, 50);
  };
})();
