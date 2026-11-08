/* Reine Logik ohne DOM: Bewerten, Prüfung zusammenstellen, Räuber-Beute-Modell, Ränge.
   Wird auch von den Node-Tests geladen. */
(function (root) {
  'use strict';
  var W = (root.W = root.W || {});
  var L = (W.logic = {});

  L.norm = function (s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[„“"'.,!?]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  /** Zuordnen: items [{id, bucket}] (bucket darf ein Array erlaubter Fächer sein), placement {itemId: bucketId} */
  L.gradeSort = function (items, placement) {
    var correct = [], wrong = [];
    items.forEach(function (it) {
      var ok = [].concat(it.bucket);
      (ok.indexOf(placement[it.id]) >= 0 ? correct : wrong).push(it.id);
    });
    return { correct: correct, wrong: wrong, score: items.length ? correct.length / items.length : 0 };
  };

  /** Reihenfolge: richtige ids vs. gelegte ids → je Platz true/false */
  L.gradeOrder = function (correctIds, givenIds) {
    var res = correctIds.map(function (id, i) { return givenIds[i] === id; });
    var n = res.filter(Boolean).length;
    return { slots: res, score: correctIds.length ? n / correctIds.length : 0 };
  };

  /** Lückentext: answer "Parasiten|Ungeziefer" */
  L.gapOk = function (answer, given) {
    return String(answer).split('|').some(function (a) { return L.norm(a) === L.norm(given); });
  };

  L.gradeCloze = function (gaps, given) {
    var res = gaps.map(function (g, i) { return L.gapOk(g, given[i]); });
    var n = res.filter(Boolean).length;
    return { gaps: res, score: gaps.length ? n / gaps.length : 0 };
  };

  /** Mehrfachauswahl: richtig nur, wenn genau die richtigen gewählt sind */
  L.sameSet = function (a, b) {
    if (a.length !== b.length) return false;
    var s = a.slice().sort().join('|');
    return s === b.slice().sort().join('|');
  };

  /** Prüfung ziehen: möglichst gleich viele Fragen je Station, gemischt. */
  L.drawQuiz = function (pool, n, rnd, onlyStation) {
    rnd = rnd || Math.random;
    var src = onlyStation ? pool.filter(function (q) { return q.station === onlyStation; }) : pool;
    var groups = {};
    src.forEach(function (q) { (groups[q.station] = groups[q.station] || []).push(q); });
    var keys = Object.keys(groups);
    keys.forEach(function (k) { groups[k] = shuffle(groups[k], rnd); });
    keys = shuffle(keys, rnd);
    var out = [];
    var round = 0;
    while (out.length < n) {
      var added = false;
      for (var i = 0; i < keys.length && out.length < n; i++) {
        var g = groups[keys[i]];
        if (g[round]) { out.push(g[round]); added = true; }
      }
      if (!added) break;
      round++;
    }
    return shuffle(out, rnd);
  };

  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- Räuber-Beute-Modell (Borkenkäfer und Buntspecht) ----------
     Lotka-Volterra, pro Jahr mit kleinen Schritten gerechnet.
     K = Borkenkäfer in Tausend, S = Buntspechte.
     Ohne "Netz" schwingen beide Zahlen dauerhaft um ihren Mittelwert.
     Mit "Netz" (weitere Feinde und Beutetiere) werden die Schwankungen kleiner. */
  L.SIM = {
    r: 0.9,      // Vermehrung der Käfer
    a: 0.045,    // Fressrate der Spechte
    ba: 0.0091667, // Wie gut Käfer zu Specht-Nachwuchs werden
    m: 0.55,     // Sterblichkeit der Spechte
    netz: 0.006, // Dämpfung durch zusätzliche Beziehungen
    K0: 100,
    S0: 20
  };

  L.simDeriv = function (K, S, netz, p) {
    p = p || L.SIM;
    var Kstar = p.m / p.ba;
    // Netz: Weitere Feinde (Buntkäfer, Schlupfwespen) greifen umso stärker zu, je mehr Käfer es gibt.
    // Der Mittelwert bleibt gleich, die Schwankungen werden kleiner.
    var dK = p.r * K - p.a * K * S - (netz ? p.netz * K * (K - Kstar) : 0);
    var dS = p.ba * K * S - p.m * S;
    return [dK, dS];
  };

  /** Ein Jahr weiterrechnen (RK4, 20 Teilschritte) */
  L.simYear = function (state, netz, p) {
    var K = state.K, S = state.S, dt = 0.05;
    for (var i = 0; i < 20; i++) {
      var k1 = L.simDeriv(K, S, netz, p);
      var k2 = L.simDeriv(K + dt / 2 * k1[0], S + dt / 2 * k1[1], netz, p);
      var k3 = L.simDeriv(K + dt / 2 * k2[0], S + dt / 2 * k2[1], netz, p);
      var k4 = L.simDeriv(K + dt * k3[0], S + dt * k3[1], netz, p);
      K += dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
      S += dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
      K = Math.max(K, 0.5); S = Math.max(S, 0.5);
    }
    return { K: K, S: S };
  };

  /** Was passiert gerade? Kurzer Satz für die Erzählung im Simulator. */
  L.simStory = function (prev, cur) {
    var kUp = cur.K > prev.K, sUp = cur.S > prev.S;
    if (kUp && !sUp) return 'Wenige Spechte, also wenige Feinde: Die Borkenkäfer vermehren sich wieder.';
    if (kUp && sUp) return 'Viele Käfer: Die Spechte finden viel Nahrung und ziehen mehr Junge groß.';
    if (!kUp && sUp) return 'Viele Spechte fressen viele Käfer: Die Käfer werden weniger.';
    return 'Wenig Käfer, wenig Nahrung: Die Spechte ziehen weniger Junge groß und werden weniger.';
  };

  /** Simulator-Mission: drei Jahre hintereinander nahe am Mittelwert, höchstens 12 Jahre nach dem Käfer-Sommer. */
  L.MISSION = { jahre: 15, kMin: 48, kMax: 72, sMin: 16, sMax: 24 };
  L.simMission = function (hist, startIdx) {
    var M = L.MISSION;
    var since = hist.length - 1 - startIdx;
    if (startIdx == null || since < 3) return { status: 'laeuft', jahre: Math.max(0, since) };
    var last = hist.slice(-3);
    var ok = last.every(function (d) { return d.K >= M.kMin && d.K <= M.kMax && d.S >= M.sMin && d.S <= M.sMax; });
    if (ok && since <= M.jahre) return { status: 'geschafft', jahre: since };
    if (since >= M.jahre) return { status: 'verpasst', jahre: since };
    return { status: 'laeuft', jahre: since };
  };

  /* ---------- Ränge: wie ein Baum, der durch alle Stockwerke wächst ---------- */
  L.RANKS = [
    { min: 0, name: 'Keimling', layer: 'Moosschicht' },
    { min: 2, name: 'Setzling', layer: 'Krautschicht' },
    { min: 4, name: 'Jungbaum', layer: 'Strauchschicht' },
    { min: 6, name: 'Waldriese', layer: 'Baumschicht' }
  ];
  L.rankFor = function (stamps) {
    var r = L.RANKS[0];
    L.RANKS.forEach(function (x) { if (stamps >= x.min) r = x; });
    return r;
  };

  /** Eicheln für eine Übung: max 10, nur Verbesserungen zählen. */
  L.acornsFor = function (score) { return Math.round(Math.max(0, Math.min(1, score)) * 10); };

  /* ---------- Bestimmungsschlüssel ---------- */
  /** Folgt den Entscheidungen ("a"/"b") ab Frage start. Liefert {done, result, at, path}. */
  L.walkKey = function (key, start, choices) {
    var at = start, path = [];
    for (var i = 0; i < choices.length; i++) {
      var node = key[at];
      if (!node) return { done: false, error: 'unbekannt: ' + at };
      var opt = node[choices[i]];
      path.push({ q: at, c: choices[i] });
      if (opt.result) return { done: true, result: opt.result, path: path };
      at = opt.next;
    }
    return { done: false, at: at, path: path };
  };

  /** Der richtige Weg zu einem Baum (für Rückmeldung "hier bist du falsch abgebogen") */
  L.pathTo = function (key, start, treeId) {
    function dfs(at, acc) {
      var node = key[at];
      if (!node) return null;
      var opts = ['a', 'b'];
      for (var i = 0; i < 2; i++) {
        var o = node[opts[i]];
        var step = acc.concat([{ q: at, c: opts[i] }]);
        if (o.result === treeId) return step;
        if (o.next) { var r = dfs(o.next, step); if (r) return r; }
      }
      return null;
    }
    return dfs(start, []);
  };
})(typeof window !== 'undefined' ? window : globalThis);
