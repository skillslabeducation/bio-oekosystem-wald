/* Interaktive Lern-Bausteine für den Teil "Entdecken". */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var h = W.h, A = W.art;
  var B = (W.widgets = {});

  function svgEl(markup) { var d = h('div'); d.innerHTML = markup; return d.firstElementChild; }
  function ico(id, cls) { return svgEl(A.icon(id, cls)); }

  /* ---------- Stockwerke als Hochhaus ---------- */
  var CROP = { baum: '0 30 1000 300', strauch: '0 372 1000 112', kraut: '0 442 1000 78', moos: '0 486 1000 38', wurzel: '0 518 1000 122' };
  B.layers = function () {
    var info = h('div', { class: 'schicht-info', 'aria-live': 'polite' });
    var haus = false, current = null;
    var rows = [];
    var stack = h('div', { class: 'schichten' });
    W.LAYERS.slice().reverse().forEach(function (L) {
      var strip = h('div', { class: 'schicht__bild' });
      strip.innerHTML = A.forest()
        .replace('viewBox="0 0 1000 640"', 'viewBox="' + CROP[L.id] + '" preserveAspectRatio="xMidYMid slice"')
        .replace(/role="img" aria-label="[^"]*"/, 'aria-hidden="true" focusable="false"')
        .replace('class="karte-svg"', 'class="schicht__svg"');
      var row = h('button', { class: 'schicht schicht--' + L.id, type: 'button', 'aria-pressed': 'false' },
        strip,
        h('span', { class: 'schicht__name' }, L.name),
        h('span', { class: 'schicht__hoehe' }, L.hoehe),
        h('span', { class: 'schicht__haus' }, L.haus));
      row.addEventListener('click', function () { pick(L, row); });
      rows.push(row);
      stack.appendChild(row);
    });
    function pick(L, row) {
      current = L.id;
      rows.forEach(function (r) { r.setAttribute('aria-pressed', r === row ? 'true' : 'false'); });
      stack.classList.add('schichten--auswahl');
      info.innerHTML = '';
      info.appendChild(h('h4', null, L.name, h('span', { class: 'schicht-info__hoehe' }, L.hoehe)));
      info.appendChild(h('dl', null,
        h('dt', null, 'Besteht aus'), h('dd', null, L.besteht),
        h('dt', null, 'Typische Tiere'), h('dd', null, L.tiere),
        h('dt', null, 'Wichtig'), h('dd', null, L.info),
        h('dt', null, 'Im Haus'), h('dd', null, L.haus)));
    }
    var toggle = h('button', { class: 'knopf knopf--leise', type: 'button', 'aria-pressed': 'false' }, 'Haus-Vergleich zeigen');
    toggle.addEventListener('click', function () {
      haus = !haus;
      stack.classList.toggle('schichten--haus', haus);
      toggle.setAttribute('aria-pressed', haus ? 'true' : 'false');
      toggle.textContent = haus ? 'Haus-Vergleich ausblenden' : 'Haus-Vergleich zeigen';
    });
    info.appendChild(h('p', { class: 'schicht-info__leer' }, 'Tippe auf ein Stockwerk.'));
    return h('div', { class: 'baustein baustein--schichten' }, h('div', { class: 'schichten__wrap' }, stack, info), h('div', { class: 'baustein__leiste' }, toggle));
  };

  /* ---------- Fotosynthese ---------- */
  B.fotosynthese = function () {
    var fig = h('figure', { class: 'foto' });
    fig.innerHTML =
      '<svg viewBox="0 0 640 316" class="foto__svg" role="img" aria-label="Fotosynthese im Blatt">' +
      '<defs><marker id="pf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#6a4a33"/></marker></defs>' +
      '<g class="foto__sonne"><circle cx="70" cy="64" r="34" fill="#f4b83a"/>' +
      [0, 40, 80, 120, 160, 200, 240, 280, 320].map(function (a) { var r = a * Math.PI / 180; return '<path d="M' + (70 + Math.cos(r) * 42) + ' ' + (64 + Math.sin(r) * 42) + 'L' + (70 + Math.cos(r) * 54) + ' ' + (64 + Math.sin(r) * 54) + '" stroke="#f4b83a" stroke-width="4" stroke-linecap="round"/>'; }).join('') +
      '<path class="foto__licht" d="M110 90L240 140" stroke="#e2a420" stroke-width="5" stroke-dasharray="10 8" marker-end="url(#pf)"/></g>' +
      '<g transform="translate(320 168) scale(1.25)">' + A.leaf('buche').replace(/^<svg[^>]*>/, '').replace('</svg>', '').replace('<title></title>', '') + '</g>' +
      '<g class="foto__ein"><path d="M40 210L250 180" stroke="#6a4a33" stroke-width="3" marker-end="url(#pf)"/><text x="24" y="236" class="foto__lab">Kohlenstoffdioxid</text><text x="24" y="256" class="foto__klein">aus der Luft</text>' +
      '<path d="M320 310L320 222" stroke="#3d7bb8" stroke-width="3" marker-end="url(#pf)"/><text x="334" y="282" class="foto__lab">Wasser</text><text x="334" y="300" class="foto__klein">aus dem Boden</text></g>' +
      '<g class="foto__aus"><path d="M390 120L560 70" stroke="#4d8a44" stroke-width="3" marker-end="url(#pf)"/><text x="470" y="56" class="foto__lab">Sauerstoff</text><text x="470" y="40" class="foto__klein">in die Luft</text>' +
      '<path d="M392 190L560 220" stroke="#c58a3e" stroke-width="3" marker-end="url(#pf)"/><text x="468" y="252" class="foto__lab">Traubenzucker</text><text x="468" y="270" class="foto__klein">Nahrung für die Pflanze</text></g>' +
      '<text x="128" y="134" class="foto__lab">Licht</text>' +
      '</svg>';
    var gl = h('p', { class: 'gleichung' },
      h('span', null, 'Kohlenstoffdioxid'), ' + ', h('span', null, 'Wasser'),
      h('span', { class: 'gleichung__pfeil' }, h('small', null, 'Licht, Blattgrün'), '→'),
      h('span', null, 'Traubenzucker'), ' + ', h('span', null, 'Sauerstoff'));
    var aus = false;
    var cap = h('figcaption', { 'aria-live': 'polite' }, 'Mit Sonnenlicht stellt das Blatt Traubenzucker her.');
    var t = h('button', { class: 'knopf knopf--leise', type: 'button', 'aria-pressed': 'false' }, 'Sonne verdecken');
    t.addEventListener('click', function () {
      aus = !aus;
      fig.classList.toggle('foto--dunkel', aus);
      t.textContent = aus ? 'Sonne scheinen lassen' : 'Sonne verdecken';
      t.setAttribute('aria-pressed', aus ? 'true' : 'false');
      cap.textContent = aus ? 'Ohne Licht keine Fotosynthese: Es entstehen weder Traubenzucker noch Sauerstoff.' : 'Mit Sonnenlicht stellt das Blatt Traubenzucker her.';
    });
    fig.appendChild(cap);
    return h('div', { class: 'baustein' }, fig, gl, h('div', { class: 'baustein__leiste' }, t));
  };

  /* ---------- drei Rollen ---------- */
  B.rollen = function () {
    var R = [
      { id: 'p', icon: 'baum', name: 'Produzenten', alt: 'Erzeuger', tun: 'stellen mit Sonnenlicht durch Fotosynthese Nährstoffe her und geben Sauerstoff ab', bsp: 'Buche, Fichte, Farn, Moos, Bärlauch' },
      { id: 'k', icon: 'reh', name: 'Konsumenten', alt: 'Verbraucher', tun: 'sind Tiere, die lebende Pflanzen (1. Ordnung) oder andere Tiere (2., 3. Ordnung) fressen', bsp: 'Reh, Borkenkäfer, Buntspecht, Fuchs, Habicht' },
      { id: 'd', icon: 'pilz', name: 'Destruenten', alt: 'Zersetzer', tun: 'bauen tote Reste (Laub, Totholz, Kot, tote Tiere) zu Mineralstoffen ab', bsp: 'Bakterien, Pilze (keine Pflanzen!), Regenwurm, Tausendfüßer, Assel' }
    ];
    return h('div', { class: 'rollen' }, R.map(function (r) {
      return h('div', { class: 'rolle rolle--' + r.id },
        ico(r.icon, 'rolle__ico'),
        h('h4', null, r.name, h('small', null, r.alt)),
        h('p', null, r.tun + '.'),
        h('p', { class: 'rolle__bsp' }, h('b', null, 'Beispiele: '), r.bsp));
    }));
  };

  /* ---------- Nahrungskette ---------- */
  var KETTEN = [
    { name: 'Nadelwald', glieder: [['fichte', 'Fichte', 'Produzent'], ['kaefer', 'Borkenkäfer', 'Konsument 1. Ordnung'], ['specht', 'Buntspecht', 'Konsument 2. Ordnung'], ['habicht', 'Habicht', 'Konsument 3. Ordnung, Ende dieser Kette']] },
    { name: 'Laubwald', glieder: [['blatt', 'Eichenblatt', 'Produzent'], ['raupe', 'Raupe', 'Konsument 1. Ordnung'], ['meise', 'Blaumeise', 'Konsument 2. Ordnung'], ['sperber', 'Sperber', 'Konsument 3. Ordnung, Ende dieser Kette']] }
  ];
  B.kette = function () {
    var box = h('div', { class: 'kette' });
    var tabs = h('div', { class: 'szenarien', role: 'tablist' });
    function show(k) {
      box.innerHTML = '';
      Array.prototype.forEach.call(tabs.children, function (t, i) { t.setAttribute('aria-selected', i === k ? 'true' : 'false'); });
      KETTEN[k].glieder.forEach(function (g, i) {
        if (i) box.appendChild(h('div', { class: 'kette__pfeil' }, h('span', null, 'wird gefressen von')));
        box.appendChild(h('div', { class: 'kette__glied kette__glied--' + i }, ico(g[0], 'kette__ico'), h('b', null, g[1]), h('small', null, g[2])));
      });
    }
    KETTEN.forEach(function (k, i) {
      var t = h('button', { class: 'szenarien__tab', type: 'button', role: 'tab' }, k.name);
      t.addEventListener('click', function () { show(i); });
      tabs.appendChild(t);
    });
    show(0);
    return h('div', { class: 'baustein' }, tabs, box);
  };

  /* ---------- Stoffkreislauf ---------- */
  var KREIS = [
    { id: 'sonne', ico: 'sonne', name: 'Sonne', text: 'Die Sonne liefert die Energie. Sie ist nicht Teil des Kreislaufs der Stoffe, sondern treibt ihn an.' },
    { id: 'p', ico: 'baum', name: 'Produzenten', a: 55, text: 'Grüne Pflanzen bauen mit Sonnenlicht aus Wasser, Kohlenstoffdioxid und Mineralstoffen Traubenzucker und ihren Körper auf.' },
    { id: 'k', ico: 'reh', name: 'Konsumenten', a: 125, text: 'Tiere fressen Pflanzen oder andere Tiere. So gelangen die Stoffe in ihren Körper.' },
    { id: 'reste', ico: 'laub', name: 'tote Reste', a: 180, text: 'Auf dem Waldboden landen Laub und Totholz (direkt von den Pflanzen, gestrichelter Pfeil) sowie Kot und tote Tiere (von den Konsumenten).' },
    { id: 'd', ico: 'pilz', name: 'Destruenten', a: 235, text: 'Regenwürmer, Asseln und Tausendfüßer zerkleinern die Reste. Pilze und Bakterien bauen sie vollständig ab.' },
    { id: 'm', ico: 'mineral', name: 'Mineralstoffe', a: 305, text: 'Übrig bleiben Mineralstoffe, Wasser und Kohlenstoffdioxid. Die Pflanzen nehmen die Mineralstoffe mit ihren Wurzeln wieder auf, das Kohlenstoffdioxid (das auch alle Tiere ausatmen) mit den Blättern. Der Kreis ist geschlossen.' }
  ];
  var KC = { x: 50, y: 56, r: 35 };
  function kpos(a) { var r = a * Math.PI / 180; return [KC.x + KC.r * Math.sin(r), KC.y - KC.r * Math.cos(r)]; }
  B.kreislauf = function () {
    var wrap = h('div', { class: 'kreis' });
    var info = h('p', { class: 'kreis__info', 'aria-live': 'polite' }, 'Tippe auf eine Station oder lass den Kreislauf ablaufen.');
    var arcs = '';
    var ring = KREIS.slice(1);
    ring.forEach(function (k, i) {
      var a1 = k.a + 17, a2 = (i === ring.length - 1 ? ring[0].a + 360 : ring[i + 1].a) - 19;
      var p1 = kpos(a1), p2 = kpos(a2);
      arcs += '<path d="M' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2) + 'A' + KC.r + ' ' + KC.r + ' 0 0 1 ' + p2[0].toFixed(2) + ' ' + p2[1].toFixed(2) + '" class="kreis__bogen" marker-end="url(#kp)"/>';
    });
    var pP = kpos(55), pR = kpos(180);
    // Laub und Totholz fallen direkt von den Pflanzen zu Boden
    arcs += '<path d="M' + (pP[0] - 6).toFixed(1) + ' ' + (pP[1] + 8).toFixed(1) + 'Q56 62 ' + (pR[0] + 3).toFixed(1) + ' ' + (pR[1] - 10).toFixed(1) + '" class="kreis__bogen kreis__bogen--direkt" marker-end="url(#kp)"/>';
    var svg = svgEl('<svg class="kreis__ring" viewBox="0 0 100 100" aria-hidden="true"><defs><marker id="kp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#8a6a4a"/></marker>' +
      '<marker id="ke" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#e2a420"/></marker></defs>' + arcs +
      '<path d="M57 10Q' + (pP[0] - 2) + ' 12 ' + (pP[0] - 4).toFixed(1) + ' ' + (pP[1] - 9).toFixed(1) + '" class="kreis__energie" marker-end="url(#ke)"/></svg>');
    wrap.appendChild(svg);
    var nodes = [];
    KREIS.forEach(function (k, i) {
      var p = k.a == null ? [50, 7] : kpos(k.a);
      var b = h('button', { class: 'kreis__knoten' + (k.id === 'sonne' ? ' kreis__knoten--sonne' : ''), type: 'button', style: { left: p[0].toFixed(1) + '%', top: p[1].toFixed(1) + '%' } }, ico(k.ico, 'kreis__ico'), h('span', null, k.name));
      b.addEventListener('click', function () { stop(); on(i); });
      nodes.push(b);
      wrap.appendChild(b);
    });
    function on(i) {
      nodes.forEach(function (n, j) { n.classList.toggle('kreis__knoten--an', j === i); });
      info.innerHTML = '<b>' + KREIS[i].name + ':</b> ' + KREIS[i].text;
    }
    var timer = null;
    function stop() { if (timer) { clearInterval(timer); timer = null; play.textContent = 'Kreislauf ablaufen lassen'; } }
    var play = h('button', { class: 'knopf knopf--leise', type: 'button' }, 'Kreislauf ablaufen lassen');
    play.addEventListener('click', function () {
      if (timer) return stop();
      var i = 1;
      on(i);
      play.textContent = 'Anhalten';
      timer = setInterval(function () {
        i = i % 5 + 1; // 1..5, Sonne bleibt außen vor
        on(i);
      }, 3200);
    });
    return h('div', { class: 'baustein' }, wrap, info, h('div', { class: 'baustein__leiste' }, play));
  };

  /* ---------- Räuber-Beute-Simulator ---------- */
  B.simulator = function () {
    var L = W.logic, P = L.SIM;
    var Kstar = P.m / P.ba, Sstar = P.r / P.a;
    var hist, netz = false, missionStart = null;
    function reset() { hist = [{ K: P.K0, S: P.S0 }]; missionStart = null; }
    reset();

    /* Mission der Försterin */
    var missionText = h('p', { class: 'mission__text', 'aria-live': 'polite' });
    var missionFig = h('div', { class: 'mission__fig' });
    var mission = h('div', { class: 'mission' }, missionFig, h('div', { class: 'mission__blase' }, h('p', { class: 'mission__titel' }, 'Mission der Försterin'), missionText));
    function missionShow(stimmung, html) {
      missionFig.innerHTML = A.foersterin(stimmung);
      missionText.innerHTML = html;
    }
    function missionIntro() {
      var done = W.state.data.missionen && W.state.data.missionen.sim;
      missionShow(done ? 'froh' : '', (done ? '<b>Mission schon geschafft!</b> Du kannst sie trotzdem nochmal spielen. ' : '') +
        '1. Tippe auf <b>Warmer Sommer</b>: Die Käfer vermehren sich massenhaft. 2. Bring den Wald in höchstens ' + L.MISSION.jahre +
        ' Jahren zurück ins Gleichgewicht: drei Jahre hintereinander nahe am Mittelwert. Tipp: Ein Schalter unten hilft.');
    }
    function missionCheck() {
      if (missionStart == null) return;
      var r = L.simMission(hist, missionStart);
      if (r.status === 'geschafft') {
        missionStart = null;
        var first = !(W.state.data.missionen && W.state.data.missionen.sim);
        W.state.data.missionen = Object.assign({}, W.state.data.missionen, { sim: true });
        if (first) { W.state.addAcorns(15); W.toast('+15 Eicheln: Mission geschafft!', 'eichel'); } else W.state.save();
        missionShow('froh', '<b>Mission geschafft nach ' + r.jahre + ' Jahren!</b> ' + (netz
          ? 'Das Netz aus vielen Beziehungen hat die Käferplage gebremst. Genau das meint der Merksatz: Je mehr Wechselbeziehungen, desto stabiler das Gleichgewicht.'
          : 'Der Wald hat sich wieder eingependelt.'));
      } else if (r.status === 'verpasst') {
        missionStart = null;
        missionShow('hm', '<b>Die ' + L.MISSION.jahre + ' Jahre sind um.</b> Ohne Hilfe schwanken Käfer und Spechte zu stark. Versuch es nochmal: Tippe auf <b>Neu starten</b> und dann auf <b>Warmer Sommer</b>. Welcher Schalter könnte helfen?');
      } else {
        missionShow('', '<b>Mission läuft: Jahr ' + r.jahre + ' von ' + L.MISSION.jahre + '.</b> ' + (netz ? 'Das Netz ist an. Spul weiter und beobachte die Kurven.' : 'Spul weiter. Schwanken die Kurven noch stark?'));
      }
    }
    missionIntro();

    var story = h('p', { class: 'sim__story', 'aria-live': 'polite' }, 'Jahr 0: Im Wald leben viele Borkenkäfer und einige Buntspechte.');
    var chartK = h('div', { class: 'sim__chart' });
    var chartS = h('div', { class: 'sim__chart' });
    var waage = h('div', { class: 'sim__waage' });
    var tip = h('div', { class: 'sim__tip', hidden: true });

    function chart(el, key, title, unit, color, mean) {
      var data = hist.map(function (d) { return d[key]; });
      var n = data.length, win = 25, start = Math.max(0, n - win);
      var shown = data.slice(start);
      var max = Math.max(mean * 2, Math.max.apply(null, shown) * 1.1);
      var step = max > 150 ? 50 : max > 60 ? 20 : 10;
      max = Math.ceil(max / step) * step;
      var Wd = 600, Ht = 150, pl = 40, pr = 12, pt = 10, pb = 24;
      var x = function (i) { return pl + (i - start) / (win - 1) * (Wd - pl - pr); };
      var y = function (v) { return pt + (1 - v / max) * (Ht - pt - pb); };
      var grid = '';
      for (var g = 0; g <= max; g += step) grid += '<path d="M' + pl + ' ' + y(g) + 'H' + (Wd - pr) + '" class="sim__gitter"/><text x="' + (pl - 6) + '" y="' + (y(g) + 4) + '" class="sim__achse" text-anchor="end">' + g + '</text>';
      var xt = '';
      for (var j = start; j < start + win; j += 5) xt += '<text x="' + x(j) + '" y="' + (Ht - 6) + '" class="sim__achse" text-anchor="middle">' + j + '</text>';
      var d = shown.map(function (v, i) { return (i ? 'L' : 'M') + x(start + i).toFixed(1) + ' ' + y(v).toFixed(1); }).join('');
      var last = shown[shown.length - 1];
      el.innerHTML = '<p class="sim__titel">' + title + ' <span class="sim__wert">' + Math.round(last) + ' ' + unit + '</span></p>' +
        '<svg viewBox="0 0 ' + Wd + ' ' + Ht + '" class="sim__svg" role="img" aria-label="' + title + ' über die Jahre">' + grid + xt +
        '<path d="M' + pl + ' ' + y(mean) + 'H' + (Wd - pr) + '" class="sim__mittel"/><text x="' + (Wd - pr) + '" y="' + (y(mean) - 5) + '" class="sim__achse" text-anchor="end">Mittelwert</text>' +
        '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>' +
        '<circle cx="' + x(n - 1) + '" cy="' + y(last) + '" r="5" fill="' + color + '" stroke="#fbfbf4" stroke-width="2"/>' +
        '<rect x="' + pl + '" y="0" width="' + (Wd - pl - pr) + '" height="' + Ht + '" fill="transparent" class="sim__fang"/></svg>';
      var svg = el.querySelector('svg');
      svg.addEventListener('pointermove', function (e) { hover(e, svg, start, win, pl, pr, Wd); });
      svg.addEventListener('pointerdown', function (e) { hover(e, svg, start, win, pl, pr, Wd); });
      svg.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') tip.hidden = true; });
    }
    function hover(e, svg, start, win, pl, pr, Wd) {
      var r = svg.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width * Wd;
      var i = Math.round(start + (px - pl) / (Wd - pl - pr) * (win - 1));
      if (i < 0 || i >= hist.length) { tip.hidden = true; return; }
      tip.hidden = false;
      tip.textContent = 'Jahr ' + i + ': ' + Math.round(hist[i].K) + ' Tausend Borkenkäfer, ' + Math.round(hist[i].S) + ' Spechte';
    }
    function drawWaage() {
      var last = hist[hist.length - 1];
      var diff = last.K / Kstar - last.S / Sstar;
      var ang = Math.max(-16, Math.min(16, diff * 14));
      var kN = Math.max(1, Math.min(9, Math.round(last.K / 15)));
      var sN = Math.max(1, Math.min(6, Math.round(last.S / 6)));
      var dots = function (nn, kind) {
        var s = '';
        for (var i = 0; i < nn; i++) {
          var cx = (i % 3) * 13 - 13, cy = -6 - Math.floor(i / 3) * 11;
          s += kind === 'k'
            ? '<ellipse cx="' + cx + '" cy="' + cy + '" rx="4.5" ry="5.5" fill="#5a3b22"/>'
            : '<g transform="translate(' + cx + ' ' + (cy - 4) + ') scale(.42)"><ellipse cx="0" cy="10" rx="8" ry="14" fill="#1d1d1b"/><circle cx="3" cy="-8" r="7" fill="#1d1d1b"/><path d="M-4 -10L0 -11L-2 -7Z" fill="#c8372d"/></g>';
        }
        return s;
      };
      // Geometrie direkt berechnen: links (Käfer) sinkt, wenn es verhältnismäßig mehr Käfer gibt
      var rad = ang * Math.PI / 180, px = 110, py = 34, half = 80;
      var lx = px - half * Math.cos(rad), ly = py + half * Math.sin(rad);
      var rx = px + half * Math.cos(rad), ry = py - half * Math.sin(rad);
      var pan = function (x, y, inner) {
        return '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"><path d="M0 0L-22 40M0 0L22 40" stroke="#a0805e" stroke-width="1.5"/>' +
          '<path d="M-26 40L26 40C24 48 -24 48 -26 40Z" fill="#a0805e"/><g transform="translate(0 40)">' + inner + '</g></g>';
      };
      waage.innerHTML = '<svg viewBox="0 0 220 150" role="img" aria-label="Waagemodell: Borkenkäfer links, Spechte rechts">' +
        '<path d="M110 34L110 142M80 142L140 142" stroke="#6a4a33" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M' + lx.toFixed(1) + ' ' + ly.toFixed(1) + 'L' + rx.toFixed(1) + ' ' + ry.toFixed(1) + '" stroke="#6a4a33" stroke-width="5" stroke-linecap="round"/>' +
        pan(lx, ly, dots(kN, 'k')) + pan(rx, ry, dots(sN, 's')) +
        '<circle cx="110" cy="34" r="5" fill="#6a4a33"/>' +
        '<text x="' + lx.toFixed(1) + '" y="' + (ly + 66).toFixed(1) + '" text-anchor="middle" class="sim__achse">Käfer</text>' +
        '<text x="' + rx.toFixed(1) + '" y="' + (ry + 66).toFixed(1) + '" text-anchor="middle" class="sim__achse">Spechte</text></svg>';
    }
    function draw() {
      chart(chartK, 'K', 'Borkenkäfer', 'Tausend', '#8a5a2f', Kstar);
      chart(chartS, 'S', 'Buntspechte', 'Spechte', '#b8322a', Sstar);
      drawWaage();
    }
    function year(nYears) {
      for (var i = 0; i < nYears; i++) {
        var prev = hist[hist.length - 1];
        hist.push(L.simYear(prev, netz));
        missionCheck();
      }
      var a = hist[hist.length - 2], b = hist[hist.length - 1];
      if (nYears === 1) {
        story.textContent = 'Jahr ' + (hist.length - 1) + ': ' + L.simStory(a, b);
      } else {
        var last = hist.slice(-nYears);
        var ks = last.map(function (d) { return d.K; }), ss = last.map(function (d) { return d.S; });
        var kMin = Math.round(Math.min.apply(null, ks)), kMax = Math.round(Math.max.apply(null, ks));
        var sMin = Math.round(Math.min.apply(null, ss)), sMax = Math.round(Math.max.apply(null, ss));
        story.textContent = (kMax - kMin < 12 && sMax - sMin < 5)
          ? 'Jahr ' + (hist.length - 1) + ': Die Kurven liegen fast auf dem Mittelwert. Das Gleichgewicht ist stabil.'
          : 'Jahr ' + (hist.length - 1) + ': In ' + nYears + ' Jahren schwankten die Käfer zwischen ' + kMin + ' und ' + kMax + ' Tausend, die Spechte zwischen ' + sMin + ' und ' + sMax + '. Beide pendeln um ihren Mittelwert.';
      }
      draw();
    }
    function event(fn, text) {
      var last = hist[hist.length - 1];
      var e = fn({ K: last.K, S: last.S });
      hist[hist.length - 1] = e;
      story.textContent = text;
      draw();
    }
    var b1 = h('button', { class: 'knopf knopf--primaer', type: 'button' }, 'Ein Jahr weiter');
    b1.addEventListener('click', function () { year(1); });
    var b10 = h('button', { class: 'knopf', type: 'button' }, '10 Jahre');
    b10.addEventListener('click', function () { year(10); });
    var e1 = h('button', { class: 'knopf knopf--ereignis', type: 'button' }, 'Warmer Sommer: viele Käfer');
    e1.addEventListener('click', function () {
      event(function (s) { return { K: s.K * 1.8, S: s.S }; }, 'Ein warmer, trockener Sommer: Die Borkenkäfer vermehren sich explosionsartig. Was machen die Spechte? Spul vor.');
      missionStart = hist.length - 1;
      missionCheck();
    });
    var e2 = h('button', { class: 'knopf knopf--ereignis', type: 'button' }, 'Krankheit bei Spechten');
    e2.addEventListener('click', function () { event(function (s) { return { K: s.K, S: s.S * 0.5 }; }, 'Eine Krankheit: Die Hälfte der Spechte stirbt. Was passiert jetzt mit den Käfern? Spul vor.'); });
    var e3 = h('button', { class: 'knopf knopf--ereignis', type: 'button' }, 'Kalter, nasser Sommer');
    e3.addEventListener('click', function () { event(function (s) { return { K: s.K * 0.55, S: s.S }; }, 'Ein kalter, nasser Sommer: Die Borkenkäfer bekommen wenig Nachwuchs. Was bedeutet das für die Spechte?'); });
    var netzBox = h('input', { type: 'checkbox', class: 'schalter__box' });
    netzBox.addEventListener('change', function () {
      netz = netzBox.checked;
      story.textContent = netz
        ? 'Netz an: Buntkäfer fressen Borkenkäfer, Schlupfwespen legen ihre Eier in die Käferlarven, und die Spechte haben auch andere Beute. Spul 10 Jahre vor und vergleiche die Kurven.'
        : 'Netz aus: Nur Specht und Borkenkäfer. Die Zahlen schwanken stark.';
    });
    var netzLab = h('label', { class: 'schalter' }, netzBox, h('span', { class: 'schalter__bahn', 'aria-hidden': 'true' }), h('span', null, 'Netz aus vielen Beziehungen'));
    var neu = h('button', { class: 'knopf knopf--leise', type: 'button' }, 'Neu starten');
    neu.addEventListener('click', function () { reset(); missionIntro(); story.textContent = 'Jahr 0: Im Wald leben viele Borkenkäfer und einige Buntspechte.'; draw(); });

    draw();
    return h('div', { class: 'baustein sim' },
      mission,
      h('div', { class: 'sim__oben' }, h('div', { class: 'sim__charts' }, chartK, chartS, tip), waage),
      story,
      h('div', { class: 'sim__steuer' }, b1, b10, neu),
      h('div', { class: 'sim__ereignisse' }, h('span', { class: 'sim__label' }, 'Ereignis auslösen:'), e1, e2, e3),
      h('div', { class: 'sim__netz' }, netzLab));
  };

  /* ---------- Pfeilschema ---------- */
  B.pfeile = function () {
    var info = h('div', { class: 'pfeile__info', 'aria-live': 'polite' }, h('p', null, 'Tippe auf den Plus- oder den Minuspfeil.'));
    var fig = h('div', { class: 'pfeile' });
    var kaefer = h('div', { class: 'pfeile__tier' }, ico('kaefer', 'pfeile__ico'), h('span', null, 'Borkenkäfer'));
    var specht = h('div', { class: 'pfeile__tier' }, ico('specht', 'pfeile__ico'), h('span', null, 'Buntspecht'));
    var plus = h('button', { class: 'pfeil pfeil--plus', type: 'button', 'aria-label': 'Pluspfeil vom Borkenkäfer zum Buntspecht' }, h('span', { class: 'pfeil__zeichen' }, '+'));
    var minus = h('button', { class: 'pfeil pfeil--minus', type: 'button', 'aria-label': 'Minuspfeil vom Buntspecht zum Borkenkäfer' }, h('span', { class: 'pfeil__zeichen' }, '−'));
    function zeige(which) {
      plus.classList.toggle('pfeil--an', which === 'plus');
      minus.classList.toggle('pfeil--an', which === 'minus');
      info.innerHTML = which === 'plus'
        ? '<p class="pfeile__regel">+ heißt: <b>je mehr, desto mehr</b></p><ul><li>Je <b>mehr</b> Borkenkäfer, desto <b>mehr</b> Futter, desto <b>mehr</b> Spechte.</li><li>Und umgekehrt: Je <b>weniger</b> Käfer, desto <b>weniger</b> Spechte.</li></ul>'
        : '<p class="pfeile__regel">− heißt: <b>je mehr, desto weniger</b></p><ul><li>Je <b>mehr</b> Spechte, desto mehr Käfer werden gefressen, desto <b>weniger</b> Käfer.</li><li>Und umgekehrt: Je <b>weniger</b> Spechte, desto <b>mehr</b> Käfer.</li></ul>';
    }
    plus.addEventListener('click', function () { zeige('plus'); });
    minus.addEventListener('click', function () { zeige('minus'); });
    fig.appendChild(kaefer);
    fig.appendChild(h('div', { class: 'pfeile__mitte' }, plus, minus));
    fig.appendChild(specht);
    return h('div', { class: 'baustein' }, fig, info);
  };

  /* ---------- Specht-Vergleich ---------- */
  B.spechte = function () {
    var S = W.SPECHTE, zunge = false;
    var bildB = h('div', { class: 'spechte__bild' }), bildG = h('div', { class: 'spechte__bild' });
    function bilder() {
      bildB.innerHTML = A.specht('bunt', { zunge: zunge });
      bildG.innerHTML = A.specht('gruen', { zunge: zunge });
    }
    bilder();
    var table = h('table', { class: 'vergleich' },
      h('thead', null, h('tr', null, h('th', { scope: 'col' }, 'Merkmal'), h('th', { scope: 'col' }, 'Buntspecht'), h('th', { scope: 'col' }, 'Grünspecht'))),
      h('tbody', null, S.merkmale.map(function (m, i) {
        return h('tr', null, h('th', { scope: 'row' }, m), h('td', null, S.bunt[i]), h('td', null, S.gruen[i]));
      })));
    var t = h('button', { class: 'knopf knopf--leise', type: 'button', 'aria-pressed': 'false' }, 'Zungen zeigen');
    t.addEventListener('click', function () {
      zunge = !zunge; bilder();
      t.textContent = zunge ? 'Zungen verstecken' : 'Zungen zeigen';
      t.setAttribute('aria-pressed', zunge ? 'true' : 'false');
    });
    return h('div', { class: 'baustein' },
      h('div', { class: 'spechte' },
        h('figure', null, bildB, h('figcaption', null, 'Buntspecht')),
        h('div', { class: 'spechte__vs', 'aria-hidden': 'true' }, 'Konkurrenz?'),
        h('figure', null, bildG, h('figcaption', null, 'Grünspecht'))),
      h('div', { class: 'baustein__leiste' }, t),
      h('div', { class: 'tabelle-scroll' }, table));
  };

  /* ---------- Beruf ↔ Nische ---------- */
  B.analogie = function () {
    var P = [
      ['einen Beruf haben', 'eine Art, an Nahrung zu kommen'],
      ['Kundschaft', 'Nahrung'],
      ['zu viele Bäckereien im Dorf', 'zu viele Tiere mit derselben Nahrung: Konkurrenz'],
      ['besonderes Biobrot backen', 'sich spezialisieren, z. B. lange klebrige Zunge für Ameisen'],
      ['eine Wohnung', 'Schlaf- und Nistplatz']
    ];
    var list = h('div', { class: 'analogie' },
      h('div', { class: 'analogie__kopf' }, h('span', null, 'Mensch'), h('span', null, 'Tier')));
    P.forEach(function (p) {
      var right = h('button', { class: 'analogie__tier', type: 'button' }, h('span', { class: 'analogie__verdeckt' }, 'aufdecken'));
      right.addEventListener('click', function () { right.textContent = p[1]; right.classList.add('analogie__tier--offen'); right.disabled = true; });
      list.appendChild(h('div', { class: 'analogie__zeile' }, h('span', { class: 'analogie__mensch' }, p[0]), h('span', { class: 'analogie__gleich', 'aria-hidden': 'true' }, '='), right));
    });
    return h('div', { class: 'baustein' }, list);
  };

  /* ---------- Nischen-Karten ---------- */
  B.nischen = function () {
    var N = [
      ['Wildschwein', 'braucht Schlammsuhlen, um seine Haut von Parasiten zu befreien.'],
      ['Kaninchen', 'braucht Verstecke, um sich vor Fressfeinden zu schützen.'],
      ['Wolf', 'hat scharfe Zähne zum Jagen und zum Schutz.'],
      ['Kamel', 'braucht wenig Wasser, kann es gut speichern und lebt deshalb in der Wüste.'],
      ['Liane', 'wächst an Bäumen empor, um ans Licht zu kommen.'],
      ['Frühblüher', 'blühen im Frühling, bevor die Bäume Blätter haben, und nutzen so das Licht.'],
      ['Buntspecht', 'hämmert Larven aus der Borke, mit Meißelschnabel und Widerhaken-Zunge.'],
      ['Grünspecht', 'sucht Ameisen am Boden, mit langer, klebriger Zunge.']
    ];
    return h('div', { class: 'klappkarten' }, N.map(function (n) {
      var k = h('button', { class: 'klappkarte', type: 'button', 'aria-pressed': 'false' },
        h('span', { class: 'klappkarte__vorn' }, h('b', null, n[0]), h('small', null, 'Was ist die Strategie?')),
        h('span', { class: 'klappkarte__hinten' }, h('b', null, n[0]), ' ' + n[1]));
      k.addEventListener('click', function () {
        var open = k.classList.toggle('klappkarte--offen');
        k.setAttribute('aria-pressed', open ? 'true' : 'false');
      });
      return k;
    }));
  };

  /* ---------- Blattteile ---------- */
  B.blattteile = function () {
    var leaf = A.leaf('buche').replace(/^<svg[^>]*>/, '').replace('</svg>', '');
    var lab = function (x1, y1, x2, y2, text, anchor) {
      return '<path d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 + '" class="teil__linie"/><circle cx="' + x1 + '" cy="' + y1 + '" r="1.8" class="teil__punkt"/><text x="' + (x2 + (anchor === 'end' ? -3 : 3)) + '" y="' + (y2 + 3.5) + '" text-anchor="' + (anchor || 'start') + '" class="teil__text">' + text + '</text>';
    };
    var fig = h('figure', { class: 'teile' });
    fig.innerHTML = '<svg viewBox="-150 -116 300 146" role="img" aria-label="Aufbau eines Blattes mit Beschriftung">' + leaf +
      lab(0, -104, 60, -108, 'Blattspitze') +
      lab(33, -60, 60, -72, 'Blattrand') +
      lab(14, -36, 60, -36, 'Blattspreite (Blattfläche)') +
      lab(-17, -49, -60, -60, 'Seitenader', 'end') +
      lab(0, -76, -60, -88, 'Mittelrippe', 'end') +
      lab(-6, -4, -60, -12, 'Blattgrund', 'end') +
      lab(0, 10, 60, 14, 'Blattstiel') +
      '</svg>';
    return h('div', { class: 'baustein' }, fig);
  };

  /* ---------- Fachwörter ---------- */
  B.begriffe = function () {
    var T = [
      ['einfach', 'einfach', 'eine einzige, zusammenhängende Blattfläche'],
      ['zusammengesetzt', 'zusammengesetzt', 'aus mehreren einzelnen Blättchen'],
      ['gefingert', 'gefingert', 'alle Blättchen an einem Punkt, wie Finger'],
      ['gefiedert', 'gefiedert', 'Blättchen paarweise an einer Achse, wie eine Feder'],
      ['gelappt', 'gelappt', 'tief eingebuchtet, mit Lappen'],
      ['ganzrandig', 'ganzrandig', 'Rand glatt, ohne Zähnchen'],
      ['gesaegt', 'gesägt', 'Rand mit Zähnchen wie eine Säge; doppelt gesägt: große und kleine Zähne im Wechsel'],
      ['herz', 'herzförmig', 'wie ein Herz, am Stiel eingebuchtet'],
      ['raute', 'rautenförmig', 'wie eine Raute, mit Ecken']
    ];
    return h('div', { class: 'baustein' }, h('div', { class: 'begriffe' }, T.map(function (t) {
      var pic = h('span', { class: 'begriff__bild' });
      pic.innerHTML = A.merkmal(t[0]);
      return h('div', { class: 'begriff' }, pic, h('b', null, t[1]), h('span', null, t[2]));
    })));
  };

  /* ---------- Schlüssel im Überblick ---------- */
  B.schluessel = function () {
    var ol = h('ol', { class: 'schluessel' });
    Object.keys(W.KEY).forEach(function (k) {
      var q = W.KEY[k];
      function ziel(o) {
        return o.result ? h('b', { class: 'schluessel__name' }, W.TREES[o.result].name) : h('span', { class: 'schluessel__weiter' }, 'weiter bei ' + W.KEY[o.next].nr);
      }
      ol.appendChild(h('li', { class: 'schluessel__frage' },
        h('p', { class: 'schluessel__titel' }, h('span', { class: 'schluessel__nr' }, String(q.nr)), q.frage),
        h('p', { class: 'schluessel__opt' }, h('span', { class: 'schluessel__bst' }, q.nr + 'a'), h('span', null, q.a.text), ziel(q.a)),
        h('p', { class: 'schluessel__opt' }, h('span', { class: 'schluessel__bst' }, q.nr + 'b'), h('span', null, q.b.text), ziel(q.b))));
    });
    return h('div', { class: 'baustein' }, ol);
  };
})();
