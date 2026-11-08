/* Fortschritt: nur lokal im Browser gespeichert. */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var KEY = 'expedition-wald-v1';

  function fresh() {
    return { v: 1, name: '', acorns: 0, ex: {}, explain: {}, seen: {}, quiz: { best: 0, runs: [] }, diplom: null, rucksack: [], kapitel: {}, missionen: {} };
  }

  var S = (W.state = {
    data: fresh(),

    load: function () {
      var d = W.store.get(KEY, null);
      S.data = d && d.v === 1 ? Object.assign(fresh(), d) : fresh();
      return S.data;
    },
    save: function () { W.store.set(KEY, S.data); emit(); },
    reset: function () { S.data = fresh(); W.store.remove(KEY); emit(); },

    setName: function (n) { S.data.name = String(n || '').trim().slice(0, 30); S.save(); },

    addAcorns: function (n) {
      if (n <= 0) return 0;
      S.data.acorns += n;
      S.save();
      return n;
    },

    /** Ergebnis einer Übung speichern; Eicheln gibt es nur für Verbesserungen. */
    recordExercise: function (id, score) {
      var prev = S.data.ex[id];
      var before = prev ? W.logic.acornsFor(prev.best) : 0;
      var best = prev ? Math.max(prev.best, score) : score;
      S.data.ex[id] = { best: best, tries: (prev ? prev.tries : 0) + 1, first: prev ? prev.first : score };
      var gain = W.logic.acornsFor(best) - before;
      if (gain > 0) S.data.acorns += gain;
      S.save();
      return gain;
    },

    exerciseDone: function (id) { return !!S.data.ex[id]; },

    explainState: function (id) {
      return S.data.explain[id] || { text: '', points: [], shown: false };
    },
    saveExplain: function (id, patch) {
      var cur = S.explainState(id);
      S.data.explain[id] = Object.assign({}, cur, patch);
      W.store.set(KEY, S.data);
    },

    markSeen: function (stationId) {
      if (!S.data.seen[stationId]) { S.data.seen[stationId] = true; S.save(); }
    },

    /** Fortschritt einer Station: Übungen erledigt? Erklär-Aufgaben angeschaut? */
    stationProgress: function (st) {
      var done = st.practice.filter(function (e) { return S.exerciseDone(e.id); }).length;
      var expl = st.explain.filter(function (e) { return S.explainState(e.id).shown; }).length;
      return {
        done: done, total: st.practice.length,
        explDone: expl, explTotal: st.explain.length,
        stamp: done === st.practice.length && expl >= 1
      };
    },

    stamps: function () {
      return (W.stations || []).filter(function (st) { return S.stationProgress(st).stamp; }).length;
    },

    /* Fehler-Rucksack: falsch beantwortete Prüfungsfragen */
    rucksackAdd: function (id) {
      if (S.data.rucksack.indexOf(id) < 0) { S.data.rucksack.push(id); S.save(); }
    },
    rucksackRemove: function (id) {
      var i = S.data.rucksack.indexOf(id);
      if (i >= 0) { S.data.rucksack.splice(i, 1); S.save(); }
    },

    /* Entdecken: wie viele Kapitel einer Station schon aufgedeckt sind */
    kapitel: function (stationId) { return S.data.kapitel[stationId] || 1; },
    setKapitel: function (stationId, n) {
      if (n > S.kapitel(stationId)) { S.data.kapitel[stationId] = n; W.store.set(KEY, S.data); }
    },

    /* Wald-Geheimnisse, freigeschaltet durch Eicheln */
    geheimnisse: function () {
      return (W.GEHEIMNISSE || []).filter(function (g) { return S.data.acorns >= g.ab; }).length;
    },

    recordQuiz: function (run) {
      S.data.quiz.runs.push(run);
      if (S.data.quiz.runs.length > 20) S.data.quiz.runs.shift();
      if (!run.only) S.data.quiz.best = Math.max(S.data.quiz.best || 0, run.score / run.n);
      S.save();
    }
  });

  var listeners = [];
  W.state.on = function (fn) { listeners.push(fn); };
  function emit() { listeners.forEach(function (fn) { try { fn(S.data); } catch (e) { /* weiter */ } }); }
})();
