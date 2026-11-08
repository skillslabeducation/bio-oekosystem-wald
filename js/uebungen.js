/* Übungs-Bausteine: Zuordnen, Reihenfolge, Lückentext, Fragen, Wirkungskette, Blatt-Detektiv, Erklär-Training.
   Alles per Tippen bedienbar; Kärtchen lassen sich zusätzlich ziehen. */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var h = W.h;
  var X = (W.ex = {});

  /* ---------- gemeinsamer Rahmen ---------- */
  function frame(ex, ctx) {
    var status = h('span', { class: 'uebung__status' });
    var rueck = h('div', { class: 'rueck', 'aria-live': 'polite' });
    var aktionen = h('div', { class: 'uebung__aktionen' });
    var body = h('div', { class: 'uebung__body' });
    var el = h('section', { class: 'uebung uebung--' + ex.type, id: 'ex-' + ex.id },
      h('div', { class: 'uebung__kopf' }, h('h3', null, ex.h), status),
      ex.task ? h('p', { class: 'uebung__auftrag' }, ex.task) : null,
      body, h('div', { class: 'uebung__fuss' }, aktionen, rueck));

    function showStatus() {
      var r = W.state.data.ex[ex.id];
      status.innerHTML = r ? W.art.icon('eichel', 'ico--klein') + ' ' + W.logic.acornsFor(r.best) + ' von 10' : '';
      el.classList.toggle('uebung--erledigt', !!r);
    }
    showStatus();

    return {
      el: el, body: body, rueck: rueck, aktionen: aktionen,
      say: function (html, kind) {
        rueck.className = 'rueck' + (kind ? ' rueck--' + kind : '');
        rueck.innerHTML = html;
      },
      buttons: function (list) {
        aktionen.innerHTML = '';
        list.forEach(function (b) { if (b) aktionen.appendChild(b); });
      },
      finish: function (score) {
        var gain = W.state.recordExercise(ex.id, score);
        showStatus();
        if (gain > 0) W.toast('+' + gain + ' Eicheln', 'eichel');
        if (ctx && ctx.onDone) ctx.onDone(ex.id, score);
      }
    };
  }

  function btn(label, cls, fn) {
    return h('button', { class: 'knopf ' + (cls || ''), type: 'button', onclick: fn }, label);
  }

  function lobText(score) {
    if (score >= 1) return 'Alles richtig beim ersten Versuch. Stark!';
    if (score >= 0.8) return 'Fast alles auf Anhieb richtig.';
    if (score >= 0.5) return 'Gut, und jetzt sitzt es.';
    return 'Geschafft. Diese Übung lohnt sich, noch einmal zu machen.';
  }

  /* ---------- Ziehen mit Finger oder Maus ---------- */
  function enableDrag(chip, canDrag, onDrop) {
    var suppress = false;
    chip.addEventListener('click', function (e) { if (suppress) { e.stopImmediatePropagation(); e.preventDefault(); suppress = false; } }, true);
    chip.addEventListener('pointerdown', function (e) {
      if (!canDrag() || e.button > 0) return;
      var sx = e.clientX, sy = e.clientY, ghost = null, rect = chip.getBoundingClientRect(), over = null;
      function target(x, y) {
        var el = document.elementFromPoint(x, y);
        if (!el) return null;
        return el.closest('[data-drop]');
      }
      function move(ev) {
        if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
          ghost = chip.cloneNode(true);
          ghost.classList.add('kaertchen--geist');
          ghost.style.width = rect.width + 'px';
          document.body.appendChild(ghost);
          chip.classList.add('kaertchen--zieht');
        }
        if (ghost) {
          ev.preventDefault();
          ghost.style.transform = 'translate(' + (ev.clientX - rect.width / 2) + 'px,' + (ev.clientY - rect.height / 2) + 'px) rotate(-2deg)';
          var t = target(ev.clientX, ev.clientY);
          if (t !== over) { if (over) over.classList.remove('drop--ueber'); over = t; if (over) over.classList.add('drop--ueber'); }
        }
      }
      function end(ev) {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', end);
        window.removeEventListener('pointercancel', end);
        if (over) over.classList.remove('drop--ueber');
        if (ghost) {
          ghost.remove();
          chip.classList.remove('kaertchen--zieht');
          suppress = true;
          setTimeout(function () { suppress = false; }, 50);
          if (ev.type === 'pointerup') {
            var t = target(ev.clientX, ev.clientY);
            if (t) onDrop(t.getAttribute('data-drop'));
          }
        }
      }
      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', end);
      window.addEventListener('pointercancel', end);
    });
  }

  function chipContent(it) {
    if (it.leaf) {
      var wrap = h('span', { class: 'kaertchen__bild' });
      wrap.innerHTML = W.art.leaf(it.leaf, { title: it.label });
      return [wrap, h('span', { class: 'kaertchen__name' }, it.label)];
    }
    return it.label;
  }

  /* =========================================================
     Zuordnen (sort)
     ========================================================= */
  X.sort = function (ex, ctx) {
    var F = frame(ex, ctx);
    var placement = {}, locked = {}, selected = null, first = null, finished = false;
    var chips = {};
    var pool = h('div', { class: 'ablage', 'data-drop': '__pool' });
    var faecher = h('div', { class: 'faecher faecher--' + ex.buckets.length + (ex.visual ? ' faecher--bild' : '') });
    var lists = {};

    pool.addEventListener('click', function (e) {
      if (e.target.closest('.kaertchen')) return;
      if (selected && placement[selected]) place(selected, null);
    });

    ex.buckets.forEach(function (b) {
      var list = h('div', { class: 'fach__liste' });
      var fach = h('div', { class: 'fach', 'data-drop': b.id, role: 'button', tabindex: '0', 'aria-label': 'Fach ' + b.label },
        h('div', { class: 'fach__name' }, b.label), list);
      function act(e) { if (e.target.closest('.kaertchen')) return; if (selected) place(selected, b.id); }
      fach.addEventListener('click', act);
      fach.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(e); } });
      lists[b.id] = list;
      faecher.appendChild(fach);
    });

    W.shuffle(ex.items).forEach(function (it) {
      var c = h('button', { class: 'kaertchen' + (it.leaf ? ' kaertchen--bild' : ''), type: 'button', dataset: { id: it.id } }, chipContent(it));
      c.addEventListener('click', function () {
        if (locked[it.id] || finished) return;
        if (selected === it.id) { select(null); return; }
        select(it.id);
      });
      enableDrag(c, function () { return !locked[it.id] && !finished; }, function (drop) {
        place(it.id, drop === '__pool' ? null : drop);
      });
      chips[it.id] = c;
      pool.appendChild(c);
    });

    function select(id) {
      if (selected && chips[selected]) chips[selected].classList.remove('kaertchen--gewaehlt');
      selected = id;
      if (id) chips[id].classList.add('kaertchen--gewaehlt');
      F.el.classList.toggle('uebung--waehlt', !!id);
    }
    function place(id, bucket) {
      chips[id].classList.remove('kaertchen--falsch');
      placement[id] = bucket;
      (bucket ? lists[bucket] : pool).appendChild(chips[id]);
      select(null);
      update();
    }
    function allPlaced() { return ex.items.every(function (it) { return placement[it.id]; }); }
    function update() {
      var left = ex.items.filter(function (it) { return !placement[it.id]; }).length;
      pool.classList.toggle('ablage--leer', left === 0);
      if (finished) return;
      checkBtn.disabled = !allPlaced();
      if (!allPlaced()) F.say(left === ex.items.length ? '' : 'Noch ' + left + ' Kärtchen übrig.');
      else F.say('Alle Kärtchen liegen. Prüfe deine Zuordnung.');
    }

    var checkBtn = btn('Prüfen', 'knopf--primaer', check);
    function check() {
      var res = W.logic.gradeSort(ex.items, placement);
      if (first === null) first = res.score;
      res.correct.forEach(function (id) { locked[id] = true; chips[id].classList.add('kaertchen--richtig'); chips[id].classList.remove('kaertchen--falsch'); });
      res.wrong.forEach(function (id) { chips[id].classList.add('kaertchen--falsch'); });
      if (!res.wrong.length) return done();
      F.say('<b>' + res.correct.length + ' von ' + ex.items.length + ' richtig.</b> Die rot umrandeten Kärtchen gehören in ein anderes Fach.', 'fehler');
      F.buttons([btn('Falsche zurücklegen', 'knopf--primaer', retry), btn('Lösung zeigen', 'knopf--leise', solve)]);
    }
    function retry() {
      ex.items.forEach(function (it) { if (!locked[it.id]) place(it.id, null); });
      F.buttons([checkBtn]);
      update();
    }
    function solve() {
      var tips = [];
      ex.items.forEach(function (it) {
        if (!locked[it.id]) {
          tips.push('<li><b>' + W.esc(it.label) + ':</b> ' + W.esc(it.why || '') + '</li>');
          place(it.id, [].concat(it.bucket)[0]);
          locked[it.id] = true;
          chips[it.id].classList.add('kaertchen--geloest');
        }
      });
      done(tips);
    }
    function done(tips) {
      finished = true;
      F.say((tips && tips.length ? '<p>So gehört es:</p><ul class="gruende">' + tips.join('') + '</ul>' : '') + '<p class="lob">' + lobText(first) + '</p>', 'gut');
      F.buttons([btn('Nochmal üben', 'knopf--leise', function () { ctx.redo(); })]);
      F.finish(first);
    }

    F.body.appendChild(pool);
    F.body.appendChild(faecher);
    F.buttons([checkBtn]);
    update();
    return F.el;
  };

  /* =========================================================
     Reihenfolge (order)
     ========================================================= */
  X.order = function (ex, ctx) {
    var F = frame(ex, ctx);
    var n = ex.items.length;
    var slots = new Array(n).fill(null), locked = new Array(n).fill(false), first = null, finished = false;
    var chips = {};
    var pool = h('div', { class: 'ablage' });
    var reihe = h('ol', { class: 'reihe' + (ex.arrows ? ' reihe--kette' : '') + (ex.bottomUp ? ' reihe--aufwaerts' : '') });
    var slotEls = [];

    for (var i = 0; i < n; i++) {
      (function (k) {
        var s = h('li', { class: 'reihe__platz' }, h('span', { class: 'reihe__nr' }, String(k + 1)));
        s.addEventListener('click', function () {
          if (slots[k] && !locked[k] && !finished) unplace(k);
        });
        slotEls.push(s);
        reihe.appendChild(s);
        if (ex.arrows && k < n - 1) reihe.appendChild(h('li', { class: 'reihe__pfeil', 'aria-hidden': 'true' }, h('span', null, 'wird gefressen von')));
      })(i);
    }

    var byId = {};
    ex.items.forEach(function (it) { byId[it.id] = it; });
    var order = ex.items.map(function (it) { return it.id; });
    var rest = ex.fixedFirst ? order.slice(1) : order;
    W.shuffleNot(rest).forEach(function (id) {
      var c = h('button', { class: 'kaertchen', type: 'button' }, byId[id].label);
      c.addEventListener('click', function () {
        if (finished) return;
        var at = slots.indexOf(id);
        if (at >= 0) { if (!locked[at]) unplace(at); return; }
        var free = slots.indexOf(null);
        if (free >= 0) put(free, id);
      });
      chips[id] = c;
      pool.appendChild(c);
    });

    var checkBtn = btn('Prüfen', 'knopf--primaer', check);
    if (ex.fixedFirst) {
      var c0 = h('div', { class: 'kaertchen kaertchen--fest' }, byId[order[0]].label);
      chips[order[0]] = c0;
      put(0, order[0]);
      locked[0] = true;
    }

    function put(k, id) {
      slots[k] = id;
      slotEls[k].appendChild(chips[id]);
      slotEls[k].classList.add('reihe__platz--voll');
      update();
    }
    function unplace(k) {
      var id = slots[k];
      slots[k] = null;
      chips[id].classList.remove('kaertchen--falsch');
      slotEls[k].classList.remove('reihe__platz--voll', 'reihe__platz--falsch');
      pool.appendChild(chips[id]);
      update();
    }
    function update() {
      var full = slots.indexOf(null) < 0;
      pool.classList.toggle('ablage--leer', full);
      if (finished) return;
      checkBtn.disabled = !full;
      F.say(full ? 'Alles gelegt. Prüfe die Reihenfolge.' : '');
    }
    function check() {
      var res = W.logic.gradeOrder(order, slots);
      if (first === null) first = (ex.fixedFirst ? (res.score * n - 1) / (n - 1) : res.score);
      res.slots.forEach(function (ok, k) {
        if (ok) { locked[k] = true; slotEls[k].classList.add('reihe__platz--richtig'); chips[slots[k]].classList.add('kaertchen--richtig'); }
        else { slotEls[k].classList.add('reihe__platz--falsch'); chips[slots[k]].classList.add('kaertchen--falsch'); }
      });
      if (res.score === 1) return done(false);
      var wrong = res.slots.filter(function (x) { return !x; }).length;
      F.say('<b>' + wrong + (wrong === 1 ? ' Platz stimmt' : ' Plätze stimmen') + ' noch nicht.</b> Die grünen bleiben liegen.', 'fehler');
      F.buttons([btn('Falsche zurücklegen', 'knopf--primaer', retry), btn('Lösung zeigen', 'knopf--leise', solve)]);
    }
    function retry() {
      for (var k = 0; k < n; k++) if (!locked[k] && slots[k]) unplace(k);
      F.buttons([checkBtn]);
      update();
    }
    function solve() {
      for (var k = 0; k < n; k++) if (!locked[k] && slots[k]) unplace(k);
      order.forEach(function (id, k) { if (!locked[k]) { put(k, id); chips[id].classList.add('kaertchen--geloest'); locked[k] = true; } });
      done(true);
    }
    function done(solved) {
      finished = true;
      F.say((solved ? '<p>So ist die richtige Reihenfolge.</p>' : '') + '<p class="lob">' + lobText(first) + '</p>', 'gut');
      F.buttons([btn('Nochmal üben', 'knopf--leise', function () { ctx.redo(); })]);
      F.finish(Math.max(0, first));
    }

    if (ex.bottomUp) {
      F.body.appendChild(pool);
      F.body.appendChild(h('p', { class: 'reihe__hinweis' }, '▲ ganz oben'));
      F.body.appendChild(reihe);
      F.body.appendChild(h('p', { class: 'reihe__hinweis' }, '▼ ganz unten (im Boden)'));
    } else {
      F.body.appendChild(reihe);
      F.body.appendChild(pool);
    }
    F.buttons([checkBtn]);
    update();
    return F.el;
  };

  /* =========================================================
     Lückentext (cloze)
     ========================================================= */
  X.cloze = function (ex, ctx) {
    var F = frame(ex, ctx);
    var parts = ex.text.split(/\{([^}]+)\}/);
    var gaps = [], gapEls = [];
    var text = h('p', { class: 'lueckentext' });
    parts.forEach(function (p, i) {
      if (i % 2 === 0) { text.appendChild(document.createTextNode(p)); return; }
      var k = gaps.length;
      gaps.push(p);
      var g = h('button', { class: 'luecke', type: 'button', 'aria-label': 'Lücke ' + (k + 1) }, ' ');
      g.addEventListener('click', function () { tapGap(k); });
      gapEls.push(g);
      text.appendChild(g);
    });
    var filled = new Array(gaps.length).fill(null), locked = new Array(gaps.length).fill(false);
    var active = 0, first = null, finished = false;
    var words = gaps.map(function (g) { return g.split('|')[0]; }).concat(ex.extra || []);
    var bank = h('div', { class: 'wortbank' });
    var wordEls = [];
    W.shuffle(words.map(function (w, i) { return { w: w, i: i }; })).forEach(function (o) {
      var b = h('button', { class: 'kaertchen kaertchen--wort', type: 'button' }, o.w);
      b.addEventListener('click', function () { tapWord(o.i); });
      wordEls[o.i] = b;
      bank.appendChild(b);
    });
    var used = {}; // wordIndex -> gap

    function setActive(k) {
      active = k;
      gapEls.forEach(function (g, i) { g.classList.toggle('luecke--aktiv', i === k && !finished); });
    }
    function nextEmpty(from) {
      for (var j = 0; j < gaps.length; j++) {
        var k = (from + j) % gaps.length;
        if (!filled[k]) return k;
      }
      return -1;
    }
    function tapWord(wi) {
      if (finished || used[wi] != null) return;
      if (active < 0 || locked[active]) active = nextEmpty(0);
      if (active < 0) return;
      if (filled[active] != null) release(active);
      filled[active] = wi;
      used[wi] = active;
      gapEls[active].textContent = words[wi];
      gapEls[active].classList.add('luecke--voll');
      gapEls[active].classList.remove('luecke--falsch');
      wordEls[wi].classList.add('kaertchen--benutzt');
      wordEls[wi].disabled = true;
      setActive(nextEmpty(active + 1));
      update();
    }
    function release(k) {
      var wi = filled[k];
      if (wi == null) return;
      delete used[wi];
      filled[k] = null;
      wordEls[wi].classList.remove('kaertchen--benutzt');
      wordEls[wi].disabled = false;
      gapEls[k].textContent = ' ';
      gapEls[k].classList.remove('luecke--voll', 'luecke--falsch');
    }
    function tapGap(k) {
      if (finished || locked[k]) return;
      if (filled[k] != null) release(k);
      setActive(k);
      update();
    }
    function update() {
      var left = filled.filter(function (x) { return x == null; }).length;
      if (finished) return;
      checkBtn.disabled = left > 0;
      F.say(left ? 'Noch ' + left + (left === 1 ? ' Lücke.' : ' Lücken.') : 'Alle Lücken gefüllt. Prüfe deinen Text.');
    }
    var checkBtn = btn('Prüfen', 'knopf--primaer', check);
    function check() {
      var given = filled.map(function (wi) { return wi == null ? '' : words[wi]; });
      var res = W.logic.gradeCloze(gaps, given);
      if (first === null) first = res.score;
      res.gaps.forEach(function (ok, k) {
        if (ok) { locked[k] = true; gapEls[k].classList.add('luecke--richtig'); }
        else gapEls[k].classList.add('luecke--falsch');
      });
      if (res.score === 1) return done(false);
      var wrong = res.gaps.filter(function (x) { return !x; }).length;
      F.say('<b>' + wrong + (wrong === 1 ? ' Lücke ist' : ' Lücken sind') + ' noch falsch.</b>', 'fehler');
      F.buttons([btn('Falsche leeren', 'knopf--primaer', retry), btn('Lösung zeigen', 'knopf--leise', solve)]);
    }
    function retry() {
      gaps.forEach(function (g, k) { if (!locked[k]) release(k); });
      setActive(nextEmpty(0));
      F.buttons([checkBtn]);
      update();
    }
    function solve() {
      gaps.forEach(function (g, k) { if (!locked[k]) release(k); });
      gaps.forEach(function (g, k) {
        if (locked[k]) return;
        var wi = words.indexOf(g.split('|')[0]);
        filled[k] = wi; used[wi] = k;
        gapEls[k].textContent = words[wi];
        gapEls[k].classList.add('luecke--voll', 'luecke--geloest');
        wordEls[wi].classList.add('kaertchen--benutzt'); wordEls[wi].disabled = true;
        locked[k] = true;
      });
      done(true);
    }
    function done(solved) {
      finished = true;
      setActive(-1);
      F.say((solved ? '<p>Die gelb markierten Wörter waren noch falsch. Lies den Text einmal ganz durch.</p>' : '') + '<p class="lob">' + lobText(first) + '</p>', 'gut');
      F.buttons([btn('Nochmal üben', 'knopf--leise', function () { ctx.redo(); })]);
      F.finish(first);
    }

    F.body.appendChild(text);
    F.body.appendChild(bank);
    F.buttons([checkBtn]);
    setActive(0);
    update();
    return F.el;
  };

  /* =========================================================
     Einzelne Frage (für Stations-Quiz und Försterprüfung)
     ========================================================= */
  X.question = function (q, onAnswered) {
    var wrap = h('div', { class: 'frage' });
    var fb = h('div', { class: 'frage__rueck', 'aria-live': 'polite' });
    wrap.appendChild(h('p', { class: 'frage__text' }, q.q));
    if (q.leaf) {
      var pic = h('div', { class: 'frage__bild' });
      pic.innerHTML = W.art.leaf(q.leaf, { title: 'Blatt, das bestimmt werden soll' });
      wrap.appendChild(pic);
    }
    var opts = h('div', { class: 'optionen' + (q.kind === 'tf' || q.kind === 'binary' ? ' optionen--zwei' : '') });
    var answered = false;

    function feedback(ok) {
      answered = true;
      fb.className = 'frage__rueck ' + (ok ? 'frage__rueck--gut' : 'frage__rueck--fehler');
      fb.innerHTML = '<b>' + (ok ? 'Richtig!' : 'Nicht ganz.') + '</b> ' + W.esc(q.why || '');
      onAnswered(ok);
    }

    if (q.kind === 'tf' || q.kind === 'binary') {
      var labels = q.kind === 'tf' ? ['Stimmt', 'Stimmt nicht'] : q.labels;
      var right = q.kind === 'tf' ? (q.answer ? 0 : 1) : q.answer;
      labels.forEach(function (lab, i) {
        var b = h('button', { class: 'option option--' + (i === 0 ? 'ja' : 'nein'), type: 'button' }, lab);
        b.addEventListener('click', function () {
          if (answered) return;
          Array.prototype.forEach.call(opts.children, function (o, j) {
            o.disabled = true;
            if (j === right) o.classList.add('option--richtig');
          });
          if (i !== right) b.classList.add('option--falsch');
          feedback(i === right);
        });
        opts.appendChild(b);
      });
    } else if (q.kind === 'multi') {
      var chosen = {};
      var idx = q.options.map(function (o, i) { return i; });
      idx.forEach(function (i) {
        var b = h('button', { class: 'option option--multi', type: 'button', 'aria-pressed': 'false' }, h('span', { class: 'option__box', 'aria-hidden': 'true' }), q.options[i]);
        b.addEventListener('click', function () {
          if (answered) return;
          chosen[i] = !chosen[i];
          b.classList.toggle('option--an', chosen[i]);
          b.setAttribute('aria-pressed', chosen[i] ? 'true' : 'false');
          go.disabled = !Object.keys(chosen).some(function (k) { return chosen[k]; });
        });
        b.dataset.i = i;
        opts.appendChild(b);
      });
      var go = h('button', { class: 'knopf knopf--primaer frage__los', type: 'button', disabled: true }, 'Antwort prüfen');
      go.addEventListener('click', function () {
        if (answered) return;
        var picked = Object.keys(chosen).filter(function (k) { return chosen[k]; }).map(Number);
        Array.prototype.forEach.call(opts.children, function (o) {
          var i = +o.dataset.i;
          o.disabled = true;
          var should = q.answer.indexOf(i) >= 0;
          if (should) o.classList.add('option--richtig');
          else if (chosen[i]) o.classList.add('option--falsch');
        });
        go.remove();
        feedback(W.logic.sameSet(picked, q.answer));
      });
      wrap.appendChild(h('p', { class: 'frage__hinweis' }, 'Mehrere Antworten können richtig sein.'));
      wrap.appendChild(opts);
      wrap.appendChild(go);
      wrap.appendChild(fb);
      return wrap;
    } else {
      var order = q.keep ? q.options.map(function (o, i) { return i; }) : W.shuffle(q.options.map(function (o, i) { return i; }));
      order.forEach(function (i) {
        var b = h('button', { class: 'option', type: 'button' }, q.options[i]);
        b.dataset.i = i;
        b.addEventListener('click', function () {
          if (answered) return;
          Array.prototype.forEach.call(opts.children, function (o) {
            o.disabled = true;
            if (+o.dataset.i === q.answer) o.classList.add('option--richtig');
          });
          if (i !== q.answer) b.classList.add('option--falsch');
          feedback(i === q.answer);
        });
        opts.appendChild(b);
      });
    }
    wrap.appendChild(opts);
    wrap.appendChild(fb);
    return wrap;
  };

  /* =========================================================
     Stations-Quiz (quiz)
     ========================================================= */
  X.quiz = function (ex, ctx) {
    var F = frame(ex, ctx);
    var i = 0, right = 0, firsts = [];
    var stage = h('div', { class: 'quizbuehne' });
    var zaehler = h('p', { class: 'quiz__zaehler' });
    F.body.appendChild(zaehler);
    F.body.appendChild(stage);

    function show() {
      stage.innerHTML = '';
      F.say('');
      zaehler.textContent = 'Frage ' + (i + 1) + ' von ' + ex.questions.length;
      F.buttons([]);
      stage.appendChild(X.question(ex.questions[i], function (ok) {
        if (ok) right++;
        firsts.push(ok);
        var last = i === ex.questions.length - 1;
        F.buttons([btn(last ? 'Auswertung' : 'Nächste Frage', 'knopf--primaer', function () {
          if (last) end(); else { i++; show(); }
        })]);
      }));
    }
    function end() {
      var score = right / ex.questions.length;
      stage.innerHTML = '';
      zaehler.textContent = '';
      F.say('<p><b>' + right + ' von ' + ex.questions.length + ' richtig.</b></p><p class="lob">' + lobText(score) + '</p>', score >= 0.6 ? 'gut' : 'fehler');
      F.buttons([btn('Nochmal üben', 'knopf--leise', function () { ctx.redo(); })]);
      F.finish(score);
    }
    show();
    return F.el;
  };

  /* =========================================================
     Wirkungskette (chain): + oder − vorhersagen
     ========================================================= */
  X.chain = function (ex, ctx) {
    var F = frame(ex, ctx);
    var results = {}; // scenarioId -> [bool]
    var tabs = h('div', { class: 'szenarien', role: 'tablist' });
    var stage = h('div', { class: 'szenario' });
    var current = null;

    ex.scenarios.forEach(function (sc, k) {
      var t = h('button', { class: 'szenarien__tab', type: 'button', role: 'tab' }, 'Fall ' + (k + 1));
      t.addEventListener('click', function () { open(sc, t); });
      sc._tab = t;
      tabs.appendChild(t);
    });

    function badge(dir) { return h('span', { class: 'wirk wirk--' + (dir === '+' ? 'plus' : 'minus') }, dir === '+' ? '+' : '−'); }

    function open(sc, tab) {
      current = sc;
      Array.prototype.forEach.call(tabs.children, function (t) { t.setAttribute('aria-selected', t === tab ? 'true' : 'false'); });
      stage.innerHTML = '';
      F.say('');
      var netz = h('div', { class: 'wirkkette' },
        h('div', { class: 'wirkkette__glied wirkkette__glied--start' }, sc.start.who, badge(sc.start.dir)));
      stage.appendChild(h('p', { class: 'szenario__titel' }, sc.title));
      stage.appendChild(netz);
      var askBox = h('div', { class: 'szenario__frage' });
      stage.appendChild(askBox);
      var answers = [];
      var step = 0;
      function ask() {
        askBox.innerHTML = '';
        if (step >= sc.steps.length) return finishScenario();
        var st = sc.steps[step];
        var fb = h('p', { class: 'frage__rueck', 'aria-live': 'polite' });
        var plus = h('button', { class: 'option option--plus', type: 'button' }, h('b', null, '+'), ' mehr');
        var minus = h('button', { class: 'option option--minus', type: 'button' }, h('b', null, '−'), ' weniger');
        function pick(dir, b) {
          plus.disabled = minus.disabled = true;
          var ok = dir === st.answer;
          answers.push(ok);
          (st.answer === '+' ? plus : minus).classList.add('option--richtig');
          if (!ok) b.classList.add('option--falsch');
          fb.className = 'frage__rueck ' + (ok ? 'frage__rueck--gut' : 'frage__rueck--fehler');
          fb.innerHTML = '<b>' + (ok ? 'Genau.' : 'Andersherum.') + '</b> ' + W.esc(st.why);
          netz.appendChild(h('div', { class: 'wirkkette__pfeil', 'aria-hidden': 'true' }));
          netz.appendChild(h('div', { class: 'wirkkette__glied' }, st.who, badge(st.answer)));
          askBox.appendChild(h('div', { class: 'uebung__aktionen' }, btn(step === sc.steps.length - 1 ? 'Fall abschließen' : 'Weiter', 'knopf--primaer', function () { step++; ask(); })));
        }
        plus.addEventListener('click', function () { pick('+', plus); });
        minus.addEventListener('click', function () { pick('-', minus); });
        askBox.appendChild(h('p', { class: 'frage__text' }, 'Was passiert mit: ', h('b', null, st.who), '?'));
        askBox.appendChild(h('div', { class: 'optionen optionen--zwei' }, plus, minus));
        askBox.appendChild(fb);
      }
      function finishScenario() {
        if (!results[sc.id]) results[sc.id] = answers;
        sc._tab.classList.add('szenarien__tab--fertig');
        var right = answers.filter(Boolean).length;
        askBox.innerHTML = '';
        var remaining = ex.scenarios.filter(function (s) { return !results[s.id]; });
        F.say('<b>' + right + ' von ' + answers.length + ' Vorhersagen richtig.</b> ' +
          (remaining.length ? 'Weiter mit dem nächsten Fall.' : 'Alle Fälle geschafft. Das biologische Gleichgewicht pendelt sich nach jeder Störung wieder ein.'), right === answers.length ? 'gut' : '');
        if (remaining.length) {
          F.buttons([btn('Nächster Fall', 'knopf--primaer', function () { var nx = remaining[0]; open(nx, nx._tab); F.buttons([]); })]);
        } else {
          var all = [].concat.apply([], ex.scenarios.map(function (s) { return results[s.id]; }));
          var score = all.filter(Boolean).length / all.length;
          F.buttons([btn('Nochmal üben', 'knopf--leise', function () { ctx.redo(); })]);
          F.finish(score);
        }
      }
      ask();
    }

    F.body.appendChild(tabs);
    F.body.appendChild(stage);
    open(ex.scenarios[0], ex.scenarios[0]._tab);
    return F.el;
  };

  /* =========================================================
     Blatt-Detektiv (keywalk)
     ========================================================= */
  X.keywalk = function (ex, ctx) {
    var F = frame(ex, ctx);
    var trees = W.shuffle(Object.keys(W.TREES)).slice(0, ex.rounds || 5);
    var round = 0, right = 0;
    var stage = h('div', { class: 'detektiv' });
    F.body.appendChild(stage);

    function play() {
      var tree = trees[round];
      var path = [], at = W.KEY_START;
      stage.innerHTML = '';
      F.say('');
      F.buttons([]);
      var fund = h('figure', { class: 'detektiv__fund', dataset: { baum: tree } });
      fund.innerHTML = W.art.leaf(tree, { title: 'Fundstück ' + (round + 1) });
      fund.appendChild(h('figcaption', null, 'Fundstück ' + (round + 1) + ' von ' + trees.length));
      var spur = h('ol', { class: 'detektiv__spur', 'aria-label': 'Dein Weg durch den Schlüssel' });
      var frage = h('div', { class: 'detektiv__frage' });
      stage.appendChild(fund);
      stage.appendChild(h('div', { class: 'detektiv__rechts' }, spur, frage));

      function render() {
        spur.innerHTML = '';
        path.forEach(function (p) {
          spur.appendChild(h('li', null, p.nr + p.c));
        });
        frage.innerHTML = '';
        var node = W.KEY[at];
        frage.appendChild(h('p', { class: 'detektiv__nr' }, 'Frage ' + node.nr));
        frage.appendChild(h('p', { class: 'frage__text' }, node.frage));
        var wahl = h('div', { class: 'schluesselwahl' });
        ['a', 'b'].forEach(function (c) {
          var o = node[c];
          var b = h('button', { class: 'schluesselwahl__option', type: 'button' }, h('span', { class: 'schluesselwahl__bst' }, c));
          var pic = h('span', { class: 'schluesselwahl__bild' });
          pic.innerHTML = W.art.merkmal(o.bild);
          b.appendChild(pic);
          b.appendChild(h('span', { class: 'schluesselwahl__text' }, o.text));
          b.addEventListener('click', function () {
            path.push({ q: at, nr: node.nr, c: c });
            if (o.result) return result(o.result);
            at = o.next;
            render();
          });
          wahl.appendChild(b);
        });
        frage.appendChild(wahl);
        if (path.length) {
          frage.appendChild(h('div', { class: 'uebung__aktionen' }, btn('Einen Schritt zurück', 'knopf--leise', function () {
            var last = path.pop(); at = last.q; render();
          })));
        }
      }
      function result(id) {
        var ok = id === tree;
        if (ok) right++;
        var t = W.TREES[tree];
        frage.innerHTML = '';
        spur.innerHTML = '';
        path.forEach(function (p) { spur.appendChild(h('li', null, p.nr + p.c)); });
        var msg;
        if (ok) {
          msg = '<p class="detektiv__ergebnis">' + W.esc(t.name) + '</p><p><b>Richtig bestimmt!</b> ' + W.esc(t.merkmale) + '. Früchte: ' + W.esc(t.frucht) + '.</p>';
        } else {
          var good = W.logic.pathTo(W.KEY, W.KEY_START, tree);
          var wrongAt = null;
          for (var k = 0; k < path.length; k++) {
            if (!good[k] || good[k].c !== path[k].c) { wrongAt = k; break; }
          }
          var g = good[wrongAt], node = W.KEY[g.q];
          msg = '<p>Dein Ergebnis: <b>' + W.esc(W.TREES[id].name) + '</b>. Das Fundstück ist aber eine <b>' + W.esc(t.name) + '</b>.</p>' +
            '<p>Bei Frage ' + node.nr + ' („' + W.esc(node.frage) + '“) passt <b>' + g.c + '</b>: ' + W.esc(node[g.c].text) + '</p>';
        }
        frage.innerHTML = msg;
        F.say(ok ? '' : 'Schau dir das Fundstück noch einmal genau an.', ok ? 'gut' : 'fehler');
        var last = round === trees.length - 1;
        F.buttons([btn(last ? 'Auswertung' : 'Nächstes Fundstück', 'knopf--primaer', function () {
          if (last) end(); else { round++; play(); }
        })]);
      }
      render();
    }
    function end() {
      var score = right / trees.length;
      stage.innerHTML = '';
      F.say('<p><b>' + right + ' von ' + trees.length + ' Blättern richtig bestimmt.</b></p><p class="lob">' + lobText(score) + '</p>', score >= 0.6 ? 'gut' : 'fehler');
      F.buttons([btn('Neue Fundstücke', 'knopf--leise', function () { ctx.redo(); })]);
      F.finish(score);
    }
    play();
    return F.el;
  };

  /* =========================================================
     Erklär-Training
     ========================================================= */
  X.explain = function (pr, ctx) {
    var st = W.state.explainState(pr.id);
    var opInfo = h('p', { class: 'operator__info', hidden: true }, W.OPERATOREN[pr.op] || '');
    var opBtn = h('button', { class: 'operator', type: 'button', 'aria-expanded': 'false' }, pr.op, h('span', { class: 'operator__frage', 'aria-hidden': 'true' }, '?'));
    opBtn.addEventListener('click', function () {
      opInfo.hidden = !opInfo.hidden;
      opBtn.setAttribute('aria-expanded', opInfo.hidden ? 'false' : 'true');
    });
    var ta = h('textarea', { class: 'erklaer__feld', rows: '5', placeholder: 'Schreib deine Antwort hier hin, oder sag sie laut und schreib sie auf einen Zettel.', 'aria-label': 'Deine Antwort' });
    ta.value = st.text || '';
    var timer;
    ta.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { W.state.saveExplain(pr.id, { text: ta.value }); }, 400);
    });
    var hilfe = h('details', { class: 'hilfe' }, h('summary', null, 'Satzanfänge als Hilfe'),
      h('ul', null, pr.starter.map(function (s) { return h('li', null, s); })));

    var loesung = h('div', { class: 'loesung', hidden: true });
    var fazit = h('p', { class: 'loesung__fazit', 'aria-live': 'polite' });
    var checks = pr.points.map(function (p, i) {
      var cb = h('input', { type: 'checkbox' });
      cb.checked = !!(st.points && st.points[i]);
      cb.addEventListener('change', function () {
        var cur = W.state.explainState(pr.id);
        var pts = (cur.points || []).slice();
        var before = !!cur.earned && cur.earned[i];
        pts[i] = cb.checked;
        var earned = (cur.earned || []).slice();
        if (cb.checked && !before) { earned[i] = true; W.state.addAcorns(2); W.toast('+2 Eicheln', 'eichel'); }
        W.state.saveExplain(pr.id, { points: pts, earned: earned });
        sumUp();
      });
      return h('li', null, h('label', { class: 'check' }, cb, h('span', null, p)));
    });
    function sumUp() {
      var n = checks.filter(function (li) { return li.querySelector('input').checked; }).length;
      var all = pr.points.length;
      fazit.textContent = n + ' von ' + all + ' Punkten abgehakt. ' +
        (n === all ? 'Vollständig, so gibt es in der Arbeit volle Punkte.' : n >= all / 2 ? 'Gut. Ergänze die fehlenden Punkte in deiner Antwort.' : 'Lies die Musterlösung und versuch es danach noch einmal mit eigenen Worten.');
    }
    var modelBox = h('div', { class: 'loesung__text' });
    modelBox.innerHTML = pr.model;
    loesung.appendChild(h('p', { class: 'loesung__titel' }, 'Musterlösung'));
    loesung.appendChild(modelBox);
    loesung.appendChild(h('p', { class: 'loesung__titel' }, 'Hake ab, was in deiner Antwort vorkommt:'));
    loesung.appendChild(h('ul', { class: 'checkliste' }, checks));
    loesung.appendChild(fazit);

    var show = h('button', { class: 'knopf knopf--primaer', type: 'button' }, 'Musterlösung zeigen');
    show.addEventListener('click', function () {
      loesung.hidden = false;
      show.hidden = true;
      if (!W.state.explainState(pr.id).shown) {
        W.state.saveExplain(pr.id, { shown: true });
        W.state.save();
        if (ctx && ctx.onDone) ctx.onDone(pr.id, 1);
      }
      sumUp();
    });
    if (st.shown) { loesung.hidden = false; show.hidden = true; sumUp(); }

    return h('article', { class: 'erklaer', id: 'ex-' + pr.id },
      h('div', { class: 'erklaer__kopf' }, opBtn),
      opInfo,
      h('p', { class: 'erklaer__auftrag' }, pr.task),
      hilfe, ta,
      h('div', { class: 'uebung__aktionen' }, show),
      loesung);
  };

  /** Übung nach Typ bauen */
  X.render = function (ex, ctx) {
    var fn = X[ex.type];
    if (!fn) return h('p', null, 'Unbekannte Übung: ' + ex.type);
    return fn(ex, ctx);
  };
})();
