/* Blätter als SVG, per Code gezeichnet: Umriss (Bezier-Halbkontur), Zähnung, Adern.
   Alle Blätter haben dieselbe Farbe, damit man auf Form und Rand achtet, nicht auf das Grün. */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var A = (W.art = W.art || {});

  var GREEN = '#6f9a3c', EDGE = '#3d6324', VEIN = '#d6e8b0', STEM = '#5b7a2c';

  /* ---------- Geometrie-Helfer ---------- */
  function bez(p0, c1, c2, p3, t) {
    var u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1]
    ];
  }
  /** segs: [[p0,c1,c2,p3], ...] → Punktliste */
  function sampleChain(segs, k) {
    var pts = [];
    segs.forEach(function (s, i) {
      for (var j = i === 0 ? 0 : 1; j <= k; j++) pts.push(bez(s[0], s[1], s[2], s[3], j / k));
    });
    return pts;
  }
  function dist(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
  /** Punktliste gleichmäßig nach Bogenlänge neu verteilen */
  function resample(pts, n) {
    var cum = [0];
    for (var i = 1; i < pts.length; i++) cum.push(cum[i - 1] + dist(pts[i - 1], pts[i]));
    var total = cum[cum.length - 1], out = [], j = 1;
    for (var s = 0; s <= n; s++) {
      var target = total * s / n;
      while (j < cum.length - 1 && cum[j] < target) j++;
      var seg = cum[j] - cum[j - 1] || 1, f = (target - cum[j - 1]) / seg;
      out.push([pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * f, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * f]);
    }
    return out;
  }
  /** Rechte Hälfte (Basis → Spitze) mit Zähnen versehen. style: 'glatt' | 'wellig' | 'gesaegt' | 'doppelt' */
  function edge(half, style, teeth, depth, skipStart, skipEnd) {
    if (style === 'glatt') return half;
    var pts = resample(half, teeth * (style === 'wellig' ? 4 : 1));
    var out = [pts[0]];
    var n = pts.length - 1;
    for (var i = 0; i < n; i++) {
      var a = pts[i], b = pts[i + 1];
      var dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
      var nx = -dy / len, ny = dx / len; // rechts der Laufrichtung = außen
      var t = i / n;
      var active = t > skipStart && t < 1 - skipEnd;
      if (style === 'wellig') {
        var w = active ? Math.sin(i / 4 * Math.PI * 2) * depth : 0;
        out.push([b[0] + nx * w, b[1] + ny * w]);
        continue;
      }
      if (!active) { out.push(b); continue; }
      var d = depth;
      if (style === 'doppelt') d = (i % 3 === 0) ? depth * 1.9 : depth * 0.8;
      // Zahn lehnt sich Richtung Blattspitze
      out.push([a[0] + dx * 0.72 + nx * d, a[1] + dy * 0.72 + ny * d]);
      out.push(b);
    }
    return out;
  }
  function mirror(pts, sx) { return pts.map(function (p) { return [-p[0] * (sx || 1), p[1]]; }); }
  function polyD(pts) {
    return 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L') + 'Z';
  }
  /** geschlossene Kontur aus rechter Hälfte (Basis→Spitze) */
  function fullOutline(rightHalf, leftScale) {
    var left = mirror(rightHalf, leftScale).reverse();
    return rightHalf.concat(left.slice(1));
  }
  function rot(pts, deg, ox, oy) {
    var r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    return pts.map(function (p) { return [ox + p[0] * c - p[1] * s, oy + p[0] * s + p[1] * c]; });
  }
  function rotP(p, deg, ox, oy) { return rot([p], deg, ox, oy)[0]; }

  /** Seitenadern: von der Mittelrippe schräg nach außen zum Rand der rechten Hälfte */
  function sideVeins(halfSmooth, L, count, from, to, lean, sx) {
    var d = '';
    var pts = resample(halfSmooth, 60);
    for (var i = 0; i < count; i++) {
      var t = from + (to - from) * (count === 1 ? 0 : i / (count - 1));
      var y0 = -L * t;
      // Randpunkt etwas weiter oben suchen
      var targetY = y0 - L * lean;
      var best = pts[0], bd = 1e9;
      pts.forEach(function (p) { var dd = Math.abs(p[1] - targetY); if (dd < bd && p[0] > 1) { bd = dd; best = p; } });
      var ex = best[0] * 0.86, ey = best[1] + (y0 - best[1]) * 0.1;
      d += 'M0 ' + y0.toFixed(1) + 'Q' + (ex * 0.5).toFixed(1) + ' ' + ((y0 + ey) / 2 - 2).toFixed(1) + ' ' + ex.toFixed(1) + ' ' + ey.toFixed(1);
      d += 'M0 ' + y0.toFixed(1) + 'Q' + (-ex * 0.5 * (sx || 1)).toFixed(1) + ' ' + ((y0 + ey) / 2 - 2).toFixed(1) + ' ' + (-ex * (sx || 1)).toFixed(1) + ' ' + ey.toFixed(1);
    }
    return d;
  }

  /* ---------- einfache Blätter aus Halbkonturen ---------- */
  var SIMPLE = {
    buche: {
      L: 104, stem: 16, style: 'wellig', teeth: 5, depth: 0.9, veins: [7, 0.12, 0.82, 0.12],
      half: [[[0, 0], [20, 2], [36, -20], [36, -46]], [[36, -46], [36, -72], [16, -94], [0, -104]]]
    },
    hainbuche: {
      L: 112, stem: 12, style: 'doppelt', teeth: 26, depth: 2.2, veins: [12, 0.08, 0.86, 0.1],
      half: [[[0, 0], [16, 0], [29, -18], [29, -44]], [[29, -44], [29, -72], [14, -96], [0, -112]]]
    },
    birke: {
      L: 96, stem: 30, style: 'doppelt', teeth: 20, depth: 2.4, veins: [6, 0.1, 0.7, 0.14],
      half: [[[0, 0], [12, -4], [30, -14], [38, -24]], [[38, -24], [30, -40], [12, -62], [0, -96]]]
    },
    linde: {
      L: 96, stem: 26, style: 'gesaegt', teeth: 24, depth: 2.2, veins: [5, 0.1, 0.72, 0.14], leftScale: 0.9,
      half: [[[0, 0], [8, 9], [34, 12], [42, -12]], [[42, -12], [48, -38], [30, -66], [8, -84]], [[8, -84], [4, -88], [2, -92], [0, -96]]]
    }
  };

  function simpleLeaf(def) {
    var smooth = sampleChain(def.half, 30);
    var toothed = edge(smooth, def.style, def.teeth, def.depth, 0.1, 0.06);
    var outline = fullOutline(toothed, def.leftScale);
    var v = def.veins;
    return {
      body: polyD(outline),
      veins: 'M0 0L0 ' + (-def.L * 0.97).toFixed(1) + sideVeins(smooth, def.L, v[0], v[1], v[2], v[3], def.leftScale),
      stem: 'M0 0L0 ' + def.stem
    };
  }

  /* ---------- Eiche: Lappen per Sinuswelle über einer Hüllform ---------- */
  function eiche() {
    var L = 110, pts = [], n = 4.3, ph = -0.12, depth = 0.72;
    function envAt(t) { return 47 * Math.pow(Math.sin(Math.PI * Math.min(1, Math.pow(t, 0.72))), 0.8) * (0.62 + 0.45 * t); }
    for (var i = 0; i <= 200; i++) {
      var t = i / 200;
      var lob = 1 - depth * (0.5 - 0.5 * Math.cos(2 * Math.PI * (n * t + ph)));
      var x = envAt(t) * lob;
      // Lappen zeigen leicht nach vorn
      var y = -L * t - 4 * (lob - 0.6) * Math.sin(Math.PI * t);
      if (t < 0.07) x = Math.max(x, 7 * Math.sin(t / 0.07 * Math.PI)); // kleine "Öhrchen" am Grund
      pts.push([x, y]);
    }
    pts[pts.length - 1] = [0, -L];
    var veins = 'M0 0L0 ' + (-L * 0.96);
    for (var k = 1; k < 5; k++) {
      var ta = (k - ph) / n; // Lappenspitze
      if (ta > 0.9) break;
      var xa = envAt(ta) * 0.8, ya = -L * ta - 2, y0 = ya + 9;
      veins += 'M0 ' + y0.toFixed(1) + 'Q' + (xa * 0.45).toFixed(1) + ' ' + (y0 - 2).toFixed(1) + ' ' + xa.toFixed(1) + ' ' + ya.toFixed(1);
      veins += 'M0 ' + y0.toFixed(1) + 'Q' + (-xa * 0.45).toFixed(1) + ' ' + (y0 - 2).toFixed(1) + ' ' + (-xa).toFixed(1) + ' ' + ya.toFixed(1);
    }
    return { body: polyD(fullOutline(pts)), veins: veins, stem: 'M0 0L0 6' };
  }

  /* ---------- Ahorn: polare Kontur mit fünf spitzen Lappen ---------- */
  function ahorn() {
    var cx = 0, cy = -46, pts = [];
    var lobes = [
      { a: 0, r: 54, w: 40 }, { a: 58, r: 52, w: 38 }, { a: -58, r: 52, w: 38 },
      { a: 116, r: 36, w: 30 }, { a: -116, r: 36, w: 30 },
      // spitze Seitenzähne an den Lappen
      { a: 22, r: 40, w: 8 }, { a: -22, r: 40, w: 8 }, { a: 80, r: 38, w: 8 }, { a: -80, r: 38, w: 8 },
      { a: 36, r: 36, w: 7 }, { a: -36, r: 36, w: 7 }
    ];
    for (var i = 0; i <= 720; i++) {
      var th = -180 + i / 2; // 0 = nach oben
      var r = 22;
      lobes.forEach(function (l) {
        var d = Math.abs(th - l.a);
        if (d < l.w) r = Math.max(r, 22 + (l.r - 22) * Math.pow(1 - d / l.w, 1.25));
      });
      if (Math.abs(Math.abs(th) - 180) < 26) r = Math.min(r, 8 + Math.abs(Math.abs(th) - 180) * 0.55); // Bucht am Stiel
      var rad = th * Math.PI / 180;
      pts.push([cx + Math.sin(rad) * r, cy - Math.cos(rad) * r]);
    }
    var vein = '';
    [0, 52, -52, 112, -112].forEach(function (a) {
      var rad = a * Math.PI / 180, R = a === 0 ? 46 : (Math.abs(a) > 90 ? 28 : 44);
      vein += 'M0 ' + cy + 'L' + (Math.sin(rad) * R).toFixed(1) + ' ' + (cy - Math.cos(rad) * R).toFixed(1);
    });
    return { body: polyD(pts), veins: 'M0 -40L0 ' + cy + vein, stem: 'M0 -40L0 34' };
  }

  /* ---------- zusammengesetzte Blätter ---------- */
  function leaflet(L, Wd, teeth, depth) {
    // verkehrt eiförmig (oben breiter), sitzend
    var half = [[[0, 0], [3, -L * 0.1], [Wd, -L * 0.45], [Wd, -L * 0.7]], [[Wd, -L * 0.7], [Wd, -L * 0.88], [Wd * 0.5, -L * 0.98], [0, -L]]];
    var smooth = sampleChain(half, 24);
    return { outline: fullOutline(edge(smooth, 'gesaegt', teeth, depth, 0.15, 0.04)), L: L };
  }
  function lanceolate(L, Wd, teeth, depth) {
    var half = [[[0, 0], [Wd * 0.8, -L * 0.05], [Wd, -L * 0.3], [Wd, -L * 0.5]], [[Wd, -L * 0.5], [Wd, -L * 0.72], [Wd * 0.4, -L * 0.9], [0, -L]]];
    var smooth = sampleChain(half, 20);
    return { outline: fullOutline(edge(smooth, 'gesaegt', teeth, depth, 0.12, 0.08)), L: L };
  }

  function kastanie() {
    var body = '', veins = '', origin = [0, -10];
    var spec = [[0, 78, 14], [30, 72, 13], [-30, 72, 13], [60, 58, 11.5], [-60, 58, 11.5], [90, 40, 9], [-90, 40, 9]];
    spec.forEach(function (s) {
      var lf = leaflet(s[1], s[2], 18, 1.5);
      body += polyD(rot(lf.outline, s[0], origin[0], origin[1]));
      var tip = rotP([0, -lf.L * 0.95], s[0], origin[0], origin[1]);
      veins += 'M' + origin[0] + ' ' + origin[1] + 'L' + tip[0].toFixed(1) + ' ' + tip[1].toFixed(1);
    });
    return { body: body, veins: veins, stem: 'M0 -10L0 46' };
  }

  function esche() {
    var body = '', veins = '', rachisTop = -118;
    var pairs = [-14, -42, -70, -96];
    pairs.forEach(function (y, i) {
      var lf = lanceolate(44 - i * 2, 7.5, 13, 1.2);
      [56, -56].forEach(function (ang) {
        body += polyD(rot(lf.outline, ang, 0, y));
        var tip = rotP([0, -lf.L * 0.92], ang, 0, y);
        veins += 'M0 ' + y + 'L' + tip[0].toFixed(1) + ' ' + tip[1].toFixed(1);
      });
    });
    var term = lanceolate(44, 8, 13, 1.2);
    body += polyD(rot(term.outline, 0, 0, rachisTop + 4));
    veins += 'M0 ' + (rachisTop + 4) + 'L0 ' + (rachisTop + 4 - 40);
    return { body: body, veins: veins, stem: 'M0 ' + (rachisTop + 4) + 'L0 24' };
  }

  var cache = {};
  function geom(id) {
    if (cache[id]) return cache[id];
    var g;
    if (SIMPLE[id]) g = simpleLeaf(SIMPLE[id]);
    else if (id === 'eiche') g = eiche();
    else if (id === 'ahorn') g = ahorn();
    else if (id === 'kastanie') g = kastanie();
    else if (id === 'esche') g = esche();
    return (cache[id] = g);
  }

  var VIEW = {
    buche: '-50 -112 100 136', hainbuche: '-42 -118 84 136', birke: '-48 -102 96 138', linde: '-54 -102 108 134',
    eiche: '-56 -118 112 130', ahorn: '-60 -106 120 144', kastanie: '-64 -96 128 146', esche: '-46 -166 92 194'
  };

  /** Blatt als SVG-Markup. opts: {title, cls} */
  A.leaf = function (id, opts) {
    opts = opts || {};
    var g = geom(id);
    if (!g) return '';
    var title = opts.title ? '<title>' + opts.title + '</title>' : '';
    return '<svg class="blatt ' + (opts.cls || '') + '" viewBox="' + VIEW[id] + '" role="img"' + (opts.title ? '' : ' aria-hidden="true"') + '>' + title +
      '<path d="' + g.stem + '" stroke="' + STEM + '" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
      '<path d="' + g.body + '" fill="' + GREEN + '" stroke="' + EDGE + '" stroke-width="1.1" stroke-linejoin="round"/>' +
      '<path d="' + g.veins + '" stroke="' + VEIN + '" stroke-width="1" fill="none" opacity=".8" stroke-linecap="round"/>' +
      '</svg>';
  };

  A.LEAF_IDS = Object.keys(VIEW);

  /* ---------- kleine Merkmalsbilder für den Schlüssel (bewusst abstrakt) ---------- */
  var M = { f: '#8fb35a', s: '#3d6324' };
  function ico(inner, vb) {
    return '<svg class="merkmal" viewBox="' + (vb || '0 0 64 64') + '" aria-hidden="true">' + inner + '</svg>';
  }
  function blob(d) { return '<path d="' + d + '" fill="' + M.f + '" stroke="' + M.s + '" stroke-width="1.5" stroke-linejoin="round"/>'; }
  function line(d, w) { return '<path d="' + d + '" fill="none" stroke="' + M.s + '" stroke-width="' + (w || 2) + '" stroke-linecap="round"/>'; }
  var oval = 'M32 56C18 50 14 30 18 20C22 10 28 6 32 4C36 6 42 10 46 20C50 30 46 50 32 56Z';
  var small = function (x, y, r, a) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r * 0.45 + '" ry="' + r + '" transform="rotate(' + a + ' ' + x + ' ' + y + ')" fill="' + M.f + '" stroke="' + M.s + '" stroke-width="1.3"/>';
  };
  function sawEdge(n, d, y) {
    var s = 'M4 ' + y;
    for (var i = 0; i < n; i++) { var x = 4 + (i + 1) * (56 / n); s += 'L' + (x - 56 / n * 0.3).toFixed(1) + ' ' + (y - d) + 'L' + x.toFixed(1) + ' ' + y; }
    return s;
  }
  var PICS = {
    zusammengesetzt: line('M32 60L32 18') + small(32, 14, 10, 0) + small(22, 30, 9, -50) + small(42, 30, 9, 50) + small(22, 46, 8, -55) + small(42, 46, 8, 55),
    einfach: line('M32 62L32 56') + blob(oval),
    gefingert: line('M32 62L32 40') + [-70, -35, 0, 35, 70].map(function (a) { var r = a * Math.PI / 180; return small(32 + Math.sin(r) * 18, 38 - Math.cos(r) * 18, 11, a); }).join(''),
    gefiedert: line('M32 62L32 6') + [14, 28, 42].map(function (y) { return small(22, y, 8, -60) + small(42, y, 8, 60); }).join('') + small(32, 6, 7, 0),
    gelappt: line('M32 62L32 56') + blob('M32 56C28 54 22 56 18 52C20 48 14 46 12 42C16 38 12 34 14 30C20 30 18 24 20 20C24 22 26 14 32 6C38 14 40 22 44 20C46 24 44 30 50 30C52 34 48 38 52 42C50 46 44 48 46 52C42 56 36 54 32 56Z'),
    ungelappt: line('M32 62L32 56') + blob(oval),
    'lappen-rund': blob('M2 50C2 34 14 30 20 38C22 22 34 18 38 32C42 18 56 20 58 34C62 42 62 50 62 50Z'),
    'lappen-spitz': blob('M2 54L10 34L18 44L30 8L40 40L52 24L62 54Z'),
    ganzrandig: '<rect x="0" y="0" width="64" height="64" rx="10" fill="#eef5df"/>' + blob('M4 60L4 30Q32 22 60 30L60 60Z'),
    gesaegt: '<rect x="0" y="0" width="64" height="64" rx="10" fill="#eef5df"/>' + blob(sawEdge(9, 6, 30) + 'L60 60L4 60Z'),
    herz: line('M32 62L32 50') + blob('M32 50C24 58 6 54 8 36C10 20 26 12 32 4C38 12 54 20 56 36C58 54 40 58 32 50Z'),
    nichtherz: line('M32 62L32 56') + blob(oval),
    raute: line('M32 62L32 54') + blob('M32 54L12 34L32 4L52 34Z'),
    parallel: line('M32 62L32 56') + blob(oval) + line('M32 54L32 6', 1.4) + [14, 22, 30, 38, 46].map(function (y) { return line('M32 ' + (y + 6) + 'L' + (y < 20 ? 40 : 46) + ' ' + y + 'M32 ' + (y + 6) + 'L' + (y < 20 ? 24 : 18) + ' ' + y, 1.2); }).join('')
  };
  A.merkmal = function (id) { return PICS[id] ? ico(PICS[id]) : ''; };

  // Für Tests
  A._geom = geom;
})();
