/* node tests/inhalt.test.js  –  prüft Inhalte und Logik. */
const assert = require('assert');
const W = require('./laden')();
const L = W.logic;

let n = 0;
function test(name, fn) {
  try { fn(); n++; console.log('  ok   ' + name); }
  catch (e) { console.log('  FEHLER ' + name + '\n       ' + e.message); process.exitCode = 1; }
}

console.log('Inhalte');

test('sechs Stationen in fester Reihenfolge', () => {
  assert.deepStrictEqual(Array.from(W.stations, (s) => s.id), ['stockwerke', 'nahrung', 'gleichgewicht', 'konkurrenz', 'nische', 'bestimmung']);
});

test('alle IDs sind eindeutig', () => {
  const ids = [];
  W.stations.forEach((s) => { s.practice.forEach((e) => ids.push(e.id)); s.explain.forEach((e) => ids.push(e.id)); });
  W.QUIZ.forEach((q) => ids.push(q.id));
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  assert.deepStrictEqual(dup, []);
});

test('jede Station hat Lernteil, Übungen, Erklär-Aufgaben und Merksätze', () => {
  W.stations.forEach((s) => {
    assert.ok(s.learn.length >= 4, s.id + ' learn');
    assert.ok(s.practice.length >= 3, s.id + ' practice');
    assert.ok(s.explain.length >= 2, s.id + ' explain');
    assert.ok(s.merke.length >= 3, s.id + ' merke');
    assert.ok(s.kompetenz && s.title && s.short && s.intro, s.id + ' Texte');
  });
});

test('Widgets im Lernteil existieren', () => {
  W.stations.forEach((s) => s.learn.filter((b) => b.t === 'widget').forEach((b) => assert.ok(W.widgets[b.w], s.id + ': ' + b.w)));
});

test('Zuordnen: jedes Kärtchen hat ein gültiges Fach und eine Begründung', () => {
  W.stations.forEach((s) => s.practice.filter((e) => e.type === 'sort').forEach((e) => {
    const b = e.buckets.map((x) => x.id);
    e.items.forEach((it) => {
      [].concat(it.bucket).forEach((x) => assert.ok(b.includes(x), e.id + '/' + it.id + ' → ' + x));
      assert.ok(it.why && it.why.length > 10, e.id + '/' + it.id + ' why');
      if (it.leaf) assert.ok(W.TREES[it.leaf], it.leaf);
    });
    const labels = e.items.map((i) => i.label);
    assert.strictEqual(new Set(labels).size, labels.length, e.id + ' doppelte Kärtchen');
  }));
});

test('Lückentexte: Antworten eindeutig, Ablenker keine Lösungen', () => {
  W.stations.forEach((s) => s.practice.filter((e) => e.type === 'cloze').forEach((e) => {
    const gaps = (e.text.match(/\{([^}]+)\}/g) || []).map((g) => g.slice(1, -1).split('|')[0]);
    assert.ok(gaps.length >= 6, e.id + ' zu wenige Lücken');
    assert.strictEqual(new Set(gaps).size, gaps.length, e.id + ' doppelte Antwort');
    (e.extra || []).forEach((x) => assert.ok(!gaps.includes(x), e.id + ' Ablenker = Lösung: ' + x));
  }));
});

test('Fragen in Stationen gültig', () => {
  W.stations.forEach((s) => s.practice.filter((e) => e.type === 'quiz').forEach((e) => e.questions.forEach((q) => checkQ(q, e.id))));
});

function checkQ(q, where) {
  assert.ok(q.q && q.why, where + ' Text/why');
  if (q.kind === 'tf') assert.strictEqual(typeof q.answer, 'boolean', where);
  else if (q.kind === 'binary') { assert.strictEqual(q.labels.length, 2, where); assert.ok(q.answer === 0 || q.answer === 1, where); }
  else if (q.kind === 'multi') { assert.ok(Array.isArray(q.answer) && q.answer.length >= 1, where); q.answer.forEach((i) => assert.ok(i >= 0 && i < q.options.length, where)); }
  else if (q.kind === 'single') { assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, where + ': ' + q.q); assert.strictEqual(new Set(q.options).size, q.options.length, where + ' doppelte Option'); }
  else assert.fail('unbekannte Art ' + q.kind + ' in ' + where);
}

test('Wirkungsketten: nur + oder −', () => {
  W.stations.forEach((s) => s.practice.filter((e) => e.type === 'chain').forEach((e) => e.scenarios.forEach((sc) => {
    assert.ok(['+', '-'].includes(sc.start.dir));
    sc.steps.forEach((st) => { assert.ok(['+', '-'].includes(st.answer), sc.id); assert.ok(st.why); });
  })));
});

test('Reihenfolgen haben mindestens 4 Schritte', () => {
  W.stations.forEach((s) => s.practice.filter((e) => e.type === 'order').forEach((e) => assert.ok(e.items.length >= 4, e.id)));
});

test('Erklär-Aufgaben: Operator bekannt, Punkte und Satzanfänge vorhanden', () => {
  W.stations.forEach((s) => s.explain.forEach((p) => {
    assert.ok(W.OPERATOREN[p.op], p.id + ' Operator ' + p.op);
    assert.ok(p.points.length >= 3, p.id + ' Punkte');
    assert.ok(p.starter.length >= 1, p.id + ' Satzanfänge');
    assert.ok(p.task.toLowerCase().includes(p.op.toLowerCase()), p.id + ' Operator steht in der Aufgabe');
  }));
});

test('Prüfungspool: 8 Fragen je Station, alle gültig', () => {
  W.stations.forEach((s) => assert.strictEqual(W.QUIZ.filter((q) => q.station === s.id).length, 8, s.id));
  W.QUIZ.forEach((q) => { checkQ(q, q.id); if (q.leaf) assert.ok(W.TREES[q.leaf], q.id); });
});

test('Prüfung ziehen: 15 verschiedene Fragen, jede Station mindestens 2-mal', () => {
  for (let k = 0; k < 50; k++) {
    const qs = L.drawQuiz(W.QUIZ, 15);
    assert.strictEqual(qs.length, 15);
    assert.strictEqual(new Set(qs.map((q) => q.id)).size, 15);
    W.stations.forEach((s) => assert.ok(qs.filter((q) => q.station === s.id).length >= 2, s.id));
  }
  const only = L.drawQuiz(W.QUIZ, 8, Math.random, 'nische');
  assert.strictEqual(only.length, 8);
  assert.ok(only.every((q) => q.station === 'nische'));
});

console.log('Bestimmungsschlüssel');

test('jeder Baum ist genau einmal erreichbar', () => {
  const found = [];
  Object.values(W.KEY).forEach((q) => ['a', 'b'].forEach((c) => {
    if (q[c].result) found.push(q[c].result);
    else assert.ok(W.KEY[q[c].next], 'Verweis ins Leere: ' + q[c].next);
  }));
  assert.deepStrictEqual(found.slice().sort(), Object.keys(W.TREES).sort());
});

test('pathTo + walkKey führen zum richtigen Baum', () => {
  Object.keys(W.TREES).forEach((t) => {
    const p = L.pathTo(W.KEY, W.KEY_START, t);
    const r = L.walkKey(W.KEY, W.KEY_START, p.map((x) => x.c));
    assert.ok(r.done && r.result === t, t);
  });
});

test('jedes Merkmalsbild existiert', () => {
  Object.values(W.KEY).forEach((q) => ['a', 'b'].forEach((c) => assert.ok(W.art.merkmal(q[c].bild), q[c].bild)));
});

test('alle Blätter lassen sich zeichnen (kein NaN)', () => {
  Object.keys(W.TREES).forEach((t) => {
    const svg = W.art.leaf(t);
    assert.ok(svg.length > 500, t);
    assert.ok(!/NaN|undefined/.test(svg), t + ' enthält NaN');
  });
});

test('Wald-Illustration ohne NaN', () => {
  const s = W.art.forest();
  assert.ok(!/NaN|undefined/.test(s));
  ['wurzel', 'moos', 'kraut', 'strauch', 'baum'].forEach((l) => assert.ok(s.includes('data-layer="' + l + '"'), l));
});

console.log('Logik');

test('Bewerten: Zuordnen, Reihenfolge, Lückentext', () => {
  const r = L.gradeSort([{ id: 'a', bucket: 'x' }, { id: 'b', bucket: ['x', 'y'] }], { a: 'x', b: 'y' });
  assert.strictEqual(r.score, 1);
  assert.strictEqual(L.gradeOrder(['a', 'b', 'c'], ['a', 'c', 'b']).score, 1 / 3);
  assert.ok(L.gapOk('Parasiten|Ungeziefer', 'ungeziefer'));
  assert.ok(!L.gapOk('Wüste', 'Wald'));
  assert.ok(L.sameSet([2, 0, 1], [0, 1, 2]));
  assert.ok(!L.sameSet([0, 1], [0, 1, 2]));
});

test('Räuber-Beute: schwankt dauerhaft, keiner stirbt aus', () => {
  let st = { K: L.SIM.K0, S: L.SIM.S0 };
  let minK = 1e9, maxK = 0, minS = 1e9, maxS = 0;
  for (let y = 0; y < 80; y++) {
    st = L.simYear(st, false);
    minK = Math.min(minK, st.K); maxK = Math.max(maxK, st.K); minS = Math.min(minS, st.S); maxS = Math.max(maxS, st.S);
  }
  assert.ok(minK > 15 && maxK < 200, 'Käfer ' + minK + '–' + maxK);
  assert.ok(minS > 5 && maxS < 60, 'Spechte ' + minS + '–' + maxS);
  assert.ok(maxK - minK > 40, 'Käfer schwanken zu wenig');
});

test('Räuber-Beute: Netz macht das Gleichgewicht stabiler', () => {
  function spread(netz) {
    let st = { K: L.SIM.K0, S: L.SIM.S0 };
    const ks = [];
    for (let y = 0; y < 30; y++) { st = L.simYear(st, netz); if (y >= 20) ks.push(st.K); }
    return Math.max(...ks) - Math.min(...ks);
  }
  assert.ok(spread(true) < spread(false) / 3, 'mit Netz: ' + spread(true) + ', ohne: ' + spread(false));
});

test('Räuber-Beute: Spechte reagieren verzögert auf Käfer', () => {
  let st = { K: 100, S: 20 };
  const next = L.simYear(st, false);
  assert.ok(next.S > st.S, 'viele Käfer → mehr Spechte');
});

test('Simulator-Mission: mit Netz lösbar, ohne Netz nicht', () => {
  [{ K: 60, S: 20 }, { K: 100, S: 20 }, { K: 35, S: 15 }, { K: 45, S: 28 }, { K: 80, S: 12 }].forEach((from) => {
    ['netz', 'ohne'].forEach((mode) => {
      const hist = [{ K: from.K * 1.8, S: from.S }];
      let r;
      for (let y = 0; y < 20; y++) { hist.push(L.simYear(hist[hist.length - 1], mode === 'netz')); r = L.simMission(hist, 0); if (r.status !== 'laeuft') break; }
      assert.strictEqual(r.status, mode === 'netz' ? 'geschafft' : 'verpasst', mode + ' ab ' + JSON.stringify(from));
    });
  });
});

test('Försterin: Auftrag für jede Station, Geheimnisse aufsteigend', () => {
  W.stations.forEach((s) => assert.ok(W.AUFTRAG[s.id] && W.AUFTRAG[s.id].length > 40, s.id));
  const ab = W.GEHEIMNISSE.map((g) => g.ab);
  assert.deepStrictEqual(ab.slice(), ab.slice().sort((a, b) => a - b));
  W.GEHEIMNISSE.forEach((g) => assert.ok(W.art.icon(g.icon), g.icon));
});

test('Rucksack und Kapitel merken sich den Stand', () => {
  W.state.load();
  W.state.rucksackAdd('q-sw1'); W.state.rucksackAdd('q-sw1'); W.state.rucksackAdd('q-na2');
  assert.strictEqual(W.state.data.rucksack.length, 2);
  W.state.rucksackRemove('q-sw1');
  assert.deepStrictEqual(Array.from(W.state.data.rucksack), ['q-na2']);
  W.state.setKapitel('nahrung', 3); W.state.setKapitel('nahrung', 2);
  assert.strictEqual(W.state.kapitel('nahrung'), 3);
  W.state.reset();
});

test('Ränge wachsen mit den Stempeln', () => {
  assert.strictEqual(L.rankFor(0).name, 'Keimling');
  assert.strictEqual(L.rankFor(3).name, 'Setzling');
  assert.strictEqual(L.rankFor(5).name, 'Jungbaum');
  assert.strictEqual(L.rankFor(6).name, 'Waldriese');
});

test('Eicheln nur für Verbesserungen', () => {
  W.state.load();
  const a = W.state.recordExercise('test-x', 0.5);
  const b = W.state.recordExercise('test-x', 0.4);
  const c = W.state.recordExercise('test-x', 1);
  assert.deepStrictEqual([a, b, c], [5, 0, 5]);
  W.state.reset();
});

console.log('\n' + n + ' Tests bestanden' + (process.exitCode ? ', aber es gab Fehler.' : '.'));
