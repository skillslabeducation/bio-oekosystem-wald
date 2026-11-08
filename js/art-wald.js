/* Wald-Illustration (Karte), Spechte und Symbole – alles selbst gezeichnetes SVG. */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var A = (W.art = W.art || {});

  function n(x) { return Math.round(x * 10) / 10; }

  /* ---------- Pflanzen-Bausteine ---------- */
  function fern(x, y, s, ang, col) {
    // Farnwedel: gebogene Mittelrippe mit Fiedern
    var out = '', len = 70 * s, steps = 11;
    var a0 = (ang || 0) * Math.PI / 180;
    for (var i = 0; i < steps; i++) {
      var t = i / steps;
      var bend = t * t * 0.9;
      var px = x + Math.sin(a0 + bend) * len * t, py = y - Math.cos(a0 + bend) * len * t;
      var fl = (1 - t) * 15 * s + 3 * s;
      var dir = a0 + bend;
      [-1, 1].forEach(function (side) {
        var la = dir + side * 1.15;
        out += '<path d="M' + n(px) + ' ' + n(py) + 'Q' + n(px + Math.sin(la) * fl * 0.6) + ' ' + n(py - Math.cos(la) * fl * 0.6 - 3 * s) + ' ' + n(px + Math.sin(la) * fl) + ' ' + n(py - Math.cos(la) * fl) + '" stroke="' + col + '" stroke-width="' + n(4.2 * s) + '" stroke-linecap="round" fill="none"/>';
      });
    }
    var tipx = x + Math.sin(a0 + 0.9) * len, tipy = y - Math.cos(a0 + 0.9) * len;
    out += '<path d="M' + x + ' ' + y + 'Q' + n(x + Math.sin(a0 + 0.2) * len * 0.6) + ' ' + n(y - Math.cos(a0 + 0.2) * len * 0.6) + ' ' + n(tipx) + ' ' + n(tipy) + '" stroke="' + col + '" stroke-width="' + n(2.2 * s) + '" fill="none" stroke-linecap="round"/>';
    return out;
  }
  function fernClump(x, y, s) {
    return fern(x, y, s, -60, '#4e8a3e') + fern(x, y, s * 1.1, -25, '#5d9a48') + fern(x, y, s * 1.15, 5, '#4e8a3e') + fern(x, y, s, 35, '#5d9a48') + fern(x, y, s * 0.9, 62, '#4e8a3e');
  }
  function baerlauch(x, y) {
    var out = '';
    [-14, -5, 6, 15].forEach(function (dx, i) {
      out += '<path d="M' + (x + dx) + ' ' + y + 'Q' + (x + dx * 1.6) + ' ' + (y - 18) + ' ' + (x + dx * 1.2 + (i % 2 ? 4 : -4)) + ' ' + (y - 30) + '" stroke="#5f9a44" stroke-width="5" stroke-linecap="round" fill="none"/>';
    });
    out += '<path d="M' + x + ' ' + y + 'L' + x + ' ' + (y - 34) + '" stroke="#6aa04c" stroke-width="1.6"/>';
    for (var k = 0; k < 7; k++) {
      var a = k / 7 * Math.PI * 2;
      out += '<circle cx="' + n(x + Math.cos(a) * 5) + '" cy="' + n(y - 37 + Math.sin(a) * 4) + '" r="2.3" fill="#fbfbf2"/>';
    }
    return out;
  }
  function pilz(x, y, s, rot) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-5 0L-4 -16L4 -16L5 0Z" fill="#f3efe2"/>' +
      '<path d="M-17 -14C-16 -30 16 -30 17 -14Z" fill="' + (rot ? '#c8372d' : '#9a6b3c') + '"/>' +
      (rot ? '<circle cx="-8" cy="-20" r="2.2" fill="#fbfbf2"/><circle cx="2" cy="-24" r="2" fill="#fbfbf2"/><circle cx="9" cy="-18" r="1.8" fill="#fbfbf2"/><circle cx="-1" cy="-17" r="1.4" fill="#fbfbf2"/>' : '') +
      '</g>';
  }
  function busch(cx, cy, r, c1, c2) {
    var out = '';
    var blobs = [[-0.9, 0.15, 0.62], [0.9, 0.2, 0.6], [-0.45, -0.35, 0.72], [0.45, -0.38, 0.7], [0, -0.7, 0.62], [0, 0.1, 0.85]];
    blobs.forEach(function (b, i) {
      out += '<circle cx="' + n(cx + b[0] * r) + '" cy="' + n(cy + b[1] * r) + '" r="' + n(b[2] * r) + '" fill="' + (i % 2 ? c1 : c2) + '"/>';
    });
    return out;
  }
  function beeren(cx, cy) {
    var out = '';
    for (var i = 0; i < 9; i++) out += '<circle cx="' + n(cx + (i % 3) * 5 - 5 + (i > 5 ? 2 : 0)) + '" cy="' + n(cy + Math.floor(i / 3) * 4.5) + '" r="2.4" fill="#33263f"/>';
    return out;
  }
  function dolde(cx, cy) {
    var out = '';
    for (var i = 0; i < 8; i++) { var a = i / 8 * Math.PI * 2; out += '<circle cx="' + n(cx + Math.cos(a) * 6) + '" cy="' + n(cy + Math.sin(a) * 3) + '" r="2.2" fill="#f6f2da"/>'; }
    return out + '<circle cx="' + cx + '" cy="' + cy + '" r="2.4" fill="#f6f2da"/>';
  }

  /* ---------- Tiere ---------- */
  A.specht = function (art, opts) {
    opts = opts || {};
    var g = art === 'gruen';
    var C = g
      ? { back: '#6e9a3a', tail: '#4f6e2b', belly: '#d8deb8', cheek: '#cfd8b5', beak: '#3b3b38' }
      : { back: '#1d1d1b', tail: '#1d1d1b', belly: '#f2eee2', cheek: '#f2eee2', beak: '#4a4a48' };
    var tongue = '';
    if (opts.zunge) {
      tongue = g
        ? '<path d="M110 47Q134 58 130 92Q128 104 120 108" stroke="#e38b98" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="120" cy="108" r="2.2" fill="#e38b98"/>'
        : '<path d="M108 46L122 47" stroke="#e38b98" stroke-width="2.2" stroke-linecap="round"/><path d="M118 44L122 47L118 50" stroke="#e38b98" stroke-width="1.4" fill="none"/>';
    }
    return '<svg class="specht" viewBox="0 0 ' + (opts.zunge && g ? 140 : 124) + ' 172" role="img" aria-label="' + (g ? 'Grünspecht' : 'Buntspecht') + '">' +
      '<path d="M46 116L30 168L42 163L48 170L58 122Z" fill="' + C.tail + '"/>' +
      '<path d="M52 58C30 68 30 120 46 132C58 140 74 126 76 100C78 80 72 62 62 58Z" fill="' + C.back + '"/>' +
      '<path d="M64 62C78 70 80 100 74 120C70 128 62 132 56 126C66 106 66 80 60 64Z" fill="' + C.belly + '"/>' +
      (g
        ? '<path d="M44 112C40 122 44 128 52 128C50 122 50 116 50 110Z" fill="#d6cd48"/>'
        : '<path d="M55 118C62 122 68 124 72 119C70 128 62 134 54 129Z" fill="#c8372d"/>' +
          '<ellipse cx="48" cy="82" rx="7" ry="15" fill="#f2eee2"/>' +
          '<circle cx="40" cy="100" r="2" fill="#f2eee2"/><circle cx="46" cy="106" r="2" fill="#f2eee2"/><circle cx="40" cy="112" r="2" fill="#f2eee2"/><circle cx="46" cy="118" r="1.8" fill="#f2eee2"/>') +
      '<circle cx="66" cy="44" r="19" fill="' + (g ? C.back : '#1d1d1b') + '"/>' +
      '<ellipse cx="71" cy="50" rx="13" ry="10" fill="' + C.cheek + '"/>' +
      (g
        ? '<path d="M50 40C50 26 62 22 74 26C80 28 82 34 82 38C72 34 60 34 50 40Z" fill="#c8372d"/>' +
          '<path d="M66 38C70 34 80 36 83 42C82 47 76 49 70 47C66 45 64 41 66 38Z" fill="#1d1d1b"/>' +
          '<path d="M82 52L64 60" stroke="#1d1d1b" stroke-width="4.5" stroke-linecap="round"/><path d="M78 54L70 57" stroke="#c8372d" stroke-width="2.4" stroke-linecap="round"/>'
        : '<path d="M48 40C49 34 53 32 56 34C55 39 53 43 49 44Z" fill="#c8372d"/>' +
          '<path d="M83 53L60 60L54 52" stroke="#1d1d1b" stroke-width="4" fill="none" stroke-linecap="round"/>') +
      '<path d="M82 ' + (g ? '43L114 47L82 50' : '42L110 46L82 51') + 'Z" fill="' + C.beak + '"/>' +
      (g
        ? '<circle cx="74" cy="42" r="4" fill="#f4f2e6"/><circle cx="74.5" cy="42" r="2" fill="#1d1d1b"/>'
        : '<circle cx="73" cy="42" r="3.4" fill="#1d1d1b"/><circle cx="74" cy="41" r="1" fill="#fff"/>') +
      '<path d="M62 122l9 4M60 113l10 3" stroke="#6b6b66" stroke-width="2.4" stroke-linecap="round"/>' +
      tongue + '</svg>';
  };

  function minispecht(x, y, s, flip) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -s : s) + ' ' + s + ')">' +
      '<path d="M-6 18L-12 38L-6 36L-2 20Z" fill="#1d1d1b"/>' +
      '<ellipse cx="0" cy="10" rx="8" ry="16" fill="#1d1d1b"/><path d="M3 -2C9 4 9 18 5 24L1 22C4 14 4 4 1 -2Z" fill="#f2eee2"/>' +
      '<ellipse cx="-3" cy="6" rx="2.6" ry="6" fill="#f2eee2"/><path d="M1 22C4 26 7 26 8 22C6 28 2 29 0 26Z" fill="#c8372d"/>' +
      '<circle cx="3" cy="-8" r="7.5" fill="#1d1d1b"/><ellipse cx="5" cy="-6" rx="5" ry="4" fill="#f2eee2"/><path d="M-4 -10C-3 -12 -1 -12 0 -11L-2 -7Z" fill="#c8372d"/>' +
      '<path d="M9 -9L20 -8L9 -6Z" fill="#4a4a48"/><circle cx="5" cy="-9" r="1.3" fill="#1d1d1b"/></g>';
  }
  function reh(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-26 -30C-30 -42 -18 -48 6 -46C20 -46 26 -40 26 -32C26 -24 18 -22 6 -22L-18 -22C-24 -22 -26 -26 -26 -30Z" fill="#a8743f"/>' +
      '<path d="M-28 -34C-32 -32 -32 -28 -28 -26" fill="#f4ecd8"/><ellipse cx="-25" cy="-31" rx="4" ry="6" fill="#f4ecd8"/>' +
      '<path d="M-20 -24L-22 0M-12 -24L-11 0M14 -24L16 0M21 -25L24 0" stroke="#8a5d31" stroke-width="3.6" stroke-linecap="round"/>' +
      '<path d="M18 -42C22 -54 26 -64 30 -70L38 -68C36 -60 32 -50 28 -40Z" fill="#a8743f"/>' +
      '<path d="M28 -70C30 -76 40 -78 46 -72C48 -68 46 -66 40 -64L32 -62Z" fill="#a8743f"/>' +
      '<path d="M45 -71L49 -69L46 -66Z" fill="#2a2018"/><circle cx="38" cy="-71" r="1.4" fill="#2a2018"/>' +
      '<path d="M32 -76L28 -86M34 -76L38 -84" stroke="#8a5d31" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M29 -88L27 -94M30 -88L33 -93M38 -85L41 -90" stroke="#8a5d31" stroke-width="2" stroke-linecap="round"/></g>';
  }
  function eichhoernchen(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M-6 0C-26 -2 -32 -22 -24 -36C-18 -46 -6 -44 -8 -34C-10 -26 -18 -24 -14 -14C-12 -8 -8 -6 -6 -4Z" fill="#c0652a"/>' +
      '<ellipse cx="2" cy="-10" rx="9" ry="12" fill="#c87534"/><circle cx="7" cy="-24" r="6.5" fill="#c87534"/>' +
      '<path d="M3 -29L4 -36L7 -30Z" fill="#c87534"/><circle cx="10" cy="-25" r="1.3" fill="#2a2018"/>' +
      '<path d="M6 -14C8 -12 8 -8 6 -6" stroke="#f1d6b0" stroke-width="3" fill="none"/></g>';
  }
  function bussard(x, y, s) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<path d="M0 0C-12 -8 -30 -10 -48 -4C-36 -2 -24 2 -14 6L-6 8L0 14L6 8L14 6C24 2 36 -2 48 -4C30 -10 12 -8 0 0Z" fill="#6b4b33"/>' +
      '<path d="M-4 8L0 20L4 8Z" fill="#7d5a3e"/><circle cx="0" cy="-1" r="3.4" fill="#6b4b33"/></g>';
  }
  function hochsitz(x, y) {
    var c = '#7a5534', l = '#8d6743';
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      '<path d="M-24 0L-14 -120M24 0L14 -120M-20 -40L20 -40M-17 -80L17 -80" stroke="' + c + '" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M-6 0L-2 -116M6 0L10 -116" stroke="' + l + '" stroke-width="3"/>' +
      [-14, -30, -46, -62, -78, -94, -108].map(function (yy) { return '<path d="M-5 ' + yy + 'L9 ' + yy + '" stroke="' + l + '" stroke-width="2.6"/>'; }).join('') +
      '<path d="M-26 -120L26 -120L26 -150L-26 -150Z" fill="#8d6743"/><path d="M-30 -150L0 -170L30 -150Z" fill="#5d4029"/>' +
      '<path d="M-18 -144L18 -144L18 -132L-18 -132Z" fill="#2c2117"/></g>';
  }

  /* ---------- Die Karte ---------- */
  A.forest = function () {
    var s = '';
    s += '<defs>' +
      '<linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0e2"/><stop offset=".7" stop-color="#e6f1d8"/><stop offset="1" stop-color="#eef3dc"/></linearGradient>' +
      '<linearGradient id="boden" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f4f34"/><stop offset="1" stop-color="#3f2b1c"/></linearGradient>' +
      '<linearGradient id="strahl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8d6" stop-opacity=".55"/><stop offset="1" stop-color="#fff8d6" stop-opacity="0"/></linearGradient>' +
      '<radialGradient id="sonnenglanz"><stop offset="0" stop-color="#fff3b8"/><stop offset="1" stop-color="#fff3b8" stop-opacity="0"/></radialGradient>' +
      '</defs>';
    s += '<rect width="1000" height="640" fill="url(#himmel)"/>';
    s += '<circle cx="96" cy="78" r="120" fill="url(#sonnenglanz)"/><circle cx="96" cy="78" r="40" fill="#f6c445"/>';
    // ferner Wald
    var far = 'M0 520L0 372';
    for (var x = 0; x <= 1000; x += 38) {
      var h = 360 + ((x * 37) % 50);
      far += 'L' + (x + 12) + ' ' + (h + 30) + 'L' + (x + 19) + ' ' + (h - 20) + 'L' + (x + 26) + ' ' + (h + 30);
    }
    s += '<path d="' + far + 'L1000 372L1000 520Z" fill="#b4cfa2"/>';
    s += '<path d="M0 520L0 430C80 410 140 440 220 420C320 396 400 432 500 418C600 404 700 436 800 420C880 408 940 428 1000 418L1000 520Z" fill="#a1c28e"/>';

    // Baumschicht
    s += '<g class="lay lay-baum" data-layer="baum">';
    // Buche
    s += '<path d="M222 520L226 300C226 260 214 236 196 214L206 208C224 228 234 248 236 268L238 160L250 160L252 262C256 240 268 222 286 206L294 214C276 232 262 258 262 300L266 520Z" fill="#9a9890"/>';
    s += '<path d="M232 500L233 330M254 480L253 360" stroke="#86847c" stroke-width="2"/>';
    s += '<ellipse cx="244" cy="160" rx="158" ry="96" fill="#3d7a3b"/><ellipse cx="150" cy="196" rx="82" ry="58" fill="#4a8a44"/><ellipse cx="338" cy="190" rx="88" ry="62" fill="#468541"/>' +
      '<ellipse cx="236" cy="96" rx="112" ry="58" fill="#579b4b"/><ellipse cx="190" cy="120" rx="40" ry="24" fill="#6aab58" opacity=".7"/><ellipse cx="300" cy="118" rx="36" ry="20" fill="#6aab58" opacity=".6"/>';
    // Fichte
    s += '<path d="M640 520L643 110L651 110L655 520Z" fill="#6a4a33"/>';
    for (var i = 0; i < 8; i++) {
      var ty = 60 + i * 52, w = 34 + i * 20;
      s += '<path d="M647 ' + (ty - 46) + 'L' + (647 - w) + ' ' + (ty + 26) + 'Q647 ' + (ty + 12) + ' ' + (647 + w) + ' ' + (ty + 26) + 'Z" fill="' + (i % 2 ? '#2b5b3e' : '#326647') + '"/>';
    }
    // Eiche
    s += '<path d="M826 520L832 330C820 300 800 284 776 272L784 262C808 272 826 288 836 306L838 250L860 250L862 300C872 282 892 268 918 262L922 272C896 282 878 300 870 330L874 520Z" fill="#6e5038"/>';
    s += '<path d="M840 500L842 360M858 470L857 380" stroke="#5c412c" stroke-width="2.4"/>';
    [[852, 176, 100], [770, 212, 62], [934, 206, 64], [810, 128, 58], [900, 130, 58], [852, 236, 70]].forEach(function (c, k) {
      s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '" fill="' + (k % 2 ? '#5a8436' : '#4d7a2e') + '"/>';
    });
    s += '<circle cx="820" cy="150" r="24" fill="#6b9744" opacity=".7"/><circle cx="890" cy="170" r="20" fill="#6b9744" opacity=".6"/>';
    s += '</g>';

    // Lichtstrahlen
    s += '<path d="M120 60L470 520L560 520L170 40Z" fill="url(#strahl)" opacity=".7"/><path d="M150 50L760 520L800 520L175 44Z" fill="url(#strahl)" opacity=".5"/>';

    // Strauchschicht
    s += '<g class="lay lay-strauch" data-layer="strauch">';
    s += busch(470, 450, 62, '#5e9446', '#6fa552') + busch(560, 470, 44, '#6fa552', '#5e9446');
    s += busch(740, 462, 50, '#5a8f43', '#6aa04d');
    s += beeren(450, 420) + beeren(500, 440) + beeren(752, 436) + dolde(430, 452) + dolde(530, 418) + dolde(770, 470);
    s += '</g>';

    // Krautschicht
    s += '<g class="lay lay-kraut" data-layer="kraut">';
    s += fernClump(70, 516, 0.9) + fernClump(600, 516, 0.75) + fernClump(960, 516, 0.85);
    s += baerlauch(300, 516) + baerlauch(332, 518) + baerlauch(380, 516) + baerlauch(690, 518);
    s += '</g>';

    // Moosschicht
    s += '<g class="lay lay-moos" data-layer="moos">';
    var moos = 'M0 522L0 508';
    for (var mx = 0; mx <= 1000; mx += 24) moos += 'Q' + (mx + 12) + ' ' + (496 + (mx * 7) % 9) + ' ' + (mx + 24) + ' ' + (507 + (mx % 3));
    s += '<path d="' + moos + 'L1000 522Z" fill="#7d9e3a"/>';
    for (var d = 8; d < 1000; d += 17) s += '<circle cx="' + d + '" cy="' + (510 + (d * 13) % 8) + '" r="1.6" fill="#5f7f2a"/>';
    s += pilz(356, 514, 1, true) + pilz(378, 517, 0.7, true) + pilz(560, 516, 0.8, false) + pilz(980, 516, 0.7, false);
    s += '</g>';

    // Wurzelschicht
    s += '<g class="lay lay-wurzel" data-layer="wurzel">';
    s += '<rect y="520" width="1000" height="120" fill="url(#boden)"/>';
    s += '<path d="M0 520L1000 520L1000 530C900 534 800 528 700 532C600 536 500 528 400 533C300 537 200 529 100 534C60 536 30 532 0 534Z" fill="#8a5a2f"/>';
    function wurzel(x0, dirs) {
      return dirs.map(function (d) {
        return '<path d="M' + x0 + ' 524C' + (x0 + d[0] * 0.3) + ' ' + (540 + d[1] * 0.3) + ' ' + (x0 + d[0] * 0.7) + ' ' + (548 + d[1] * 0.6) + ' ' + (x0 + d[0]) + ' ' + (524 + d[1]) + '" stroke="#a07a52" stroke-width="' + d[2] + '" fill="none" stroke-linecap="round"/>';
      }).join('');
    }
    s += wurzel(244, [[-110, 70, 7], [-50, 96, 6], [30, 100, 6], [120, 66, 7], [-170, 40, 3], [180, 46, 3]]);
    s += wurzel(648, [[-70, 74, 5], [10, 96, 5], [80, 70, 5]]);
    s += wurzel(850, [[-120, 64, 8], [-40, 100, 6], [50, 96, 6], [130, 60, 7]]);
    s += '<ellipse cx="420" cy="600" rx="18" ry="9" fill="#857867"/><ellipse cx="560" cy="580" rx="11" ry="7" fill="#958978"/><ellipse cx="90" cy="610" rx="14" ry="7" fill="#857867"/>';
    s += '<path d="M470 572C480 562 492 582 504 572C514 564 522 580 532 574" stroke="#d98c8c" stroke-width="5" fill="none" stroke-linecap="round"/>';
    s += '<path d="M120 584C126 578 134 586 140 580" stroke="#d98c8c" stroke-width="4" fill="none" stroke-linecap="round"/>';
    s += '</g>';

    // Tiere und Hochsitz
    s += minispecht(272, 286, 1.1, true);
    s += eichhoernchen(800, 270, 1.1);
    s += reh(620, 520, 0.8);
    s += bussard(520, 96, 0.8);
    s += hochsitz(952, 522);
    return '<svg class="karte-svg" viewBox="0 0 1000 640" role="img" aria-label="Querschnitt durch einen Wald mit Wurzel-, Moos-, Kraut-, Strauch- und Baumschicht">' + s + '</svg>';
  };

  /* ---------- Försterin Lind (Brustbild) ---------- */
  A.foersterin = function (stimmung) {
    var mund = stimmung === 'froh'
      ? '<path d="M52 77Q60 86 68 77" stroke="#7a3b2e" stroke-width="2.6" fill="#c9564a" stroke-linecap="round"/>'
      : stimmung === 'hm'
        ? '<path d="M53 80Q60 77 67 80" stroke="#7a3b2e" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
        : '<path d="M53 77Q60 83 67 77" stroke="#7a3b2e" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    return '<svg class="foersterin" viewBox="0 0 120 130" role="img" aria-label="Försterin Lind">' +
      '<path d="M14 130C16 104 34 94 60 94C86 94 104 104 106 130Z" fill="#4c6b3a"/>' +
      '<path d="M48 96L60 112L72 96Z" fill="#e9e2c8"/><path d="M60 112L56 130M60 112L64 130" stroke="#3a5229" stroke-width="2"/>' +
      '<rect x="24" y="108" width="16" height="10" rx="3" fill="#a07853"/><rect x="80" y="108" width="16" height="10" rx="3" fill="#a07853"/>' +
      '<path d="M30 70C24 52 30 40 44 38L76 38C90 40 96 52 90 70C88 84 82 92 60 92C38 92 32 84 30 70Z" fill="#8a5a36"/>' +
      '<ellipse cx="60" cy="66" rx="24" ry="27" fill="#f1c9a5"/>' +
      '<circle cx="36" cy="68" r="5" fill="#eab995"/><circle cx="84" cy="68" r="5" fill="#eab995"/>' +
      '<path d="M36 52C40 44 50 40 60 40C70 40 80 44 84 52C76 48 66 47 60 50C54 47 44 48 36 52Z" fill="#7a4e2e"/>' +
      '<circle cx="51" cy="64" r="3" fill="#2a2018"/><circle cx="69" cy="64" r="3" fill="#2a2018"/>' +
      '<circle cx="52" cy="63" r="1" fill="#fff"/><circle cx="70" cy="63" r="1" fill="#fff"/>' +
      '<path d="M46 57Q51 54 55 57M65 57Q69 54 74 57" stroke="#6a4226" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<circle cx="45" cy="73" r="4" fill="#ef9f8f" opacity=".5"/><circle cx="75" cy="73" r="4" fill="#ef9f8f" opacity=".5"/>' + mund +
      '<path d="M22 40C22 32 40 30 60 30C80 30 98 32 98 40C98 44 82 44 60 44C38 44 22 44 22 40Z" fill="#2f5a3a"/>' +
      '<path d="M36 34C36 18 46 10 60 10C74 10 84 18 84 34Z" fill="#3b6e47"/>' +
      '<path d="M36 33L84 33" stroke="#a07853" stroke-width="4"/>' +
      '<path d="M78 30C86 18 94 14 100 12C96 20 90 28 80 33Z" fill="#6f9a3c"/>' +
      '</svg>';
  };

  /* ---------- Dein Baum: vier Wachstumsstufen ---------- */
  A.baumStufe = function (stufe) {
    var boden = '<path d="M6 112Q60 100 114 112L114 120L6 120Z" fill="#7d9e3a"/><path d="M6 116L114 116L114 120L6 120Z" fill="#6f4f34"/>';
    var s = [
      // Keimling
      '<path d="M60 112L60 92" stroke="#6a8f3a" stroke-width="3" stroke-linecap="round"/><path d="M60 96C50 92 46 84 48 80C56 82 60 88 60 96Z" fill="#7fb04a"/><path d="M60 94C70 90 74 82 72 78C64 80 60 86 60 94Z" fill="#8cbc52"/>',
      // Setzling
      '<path d="M60 112L60 66" stroke="#7a5534" stroke-width="4" stroke-linecap="round"/><path d="M60 86L48 76M60 78L72 70" stroke="#7a5534" stroke-width="2.4" stroke-linecap="round"/>' +
      '<ellipse cx="46" cy="74" rx="9" ry="6" fill="#7fb04a" transform="rotate(-30 46 74)"/><ellipse cx="74" cy="68" rx="9" ry="6" fill="#8cbc52" transform="rotate(25 74 68)"/><ellipse cx="60" cy="62" rx="8" ry="10" fill="#7fb04a"/>',
      // Jungbaum
      '<path d="M57 112L58 56L62 56L63 112Z" fill="#7a5534"/><circle cx="60" cy="50" r="22" fill="#5a9a4c"/><circle cx="44" cy="60" r="14" fill="#4d8a44"/><circle cx="76" cy="60" r="14" fill="#4d8a44"/>',
      // Waldriese
      '<path d="M54 112L56 50L64 50L66 112Z" fill="#6e5038"/><path d="M58 80L42 66M62 74L80 60" stroke="#6e5038" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="60" cy="34" r="28" fill="#3d7a3b"/><circle cx="36" cy="50" r="20" fill="#4a8a44"/><circle cx="84" cy="50" r="20" fill="#4a8a44"/><circle cx="60" cy="22" r="18" fill="#579b4b"/>' +
      '<circle cx="48" cy="30" r="3" fill="#c58a3e"/><circle cx="74" cy="44" r="3" fill="#c58a3e"/><circle cx="40" cy="54" r="3" fill="#c58a3e"/>'
    ][Math.max(0, Math.min(3, stufe))];
    return '<svg class="baumstufe" viewBox="0 0 120 120" aria-hidden="true">' + boden + s + '</svg>';
  };

  /* ---------- Symbole (48×48, flach) ---------- */
  var I = {
    eichel: '<path d="M14 20C14 33 19 42 24 44C29 42 34 33 34 20Z" fill="#c58a3e"/><path d="M10 20C10 12 16 8 24 8C32 8 38 12 38 20Z" fill="#7a5230"/><path d="M14 14L34 14M12 18L36 18" stroke="#5f3e22" stroke-width="1.4"/><path d="M24 8L25 3" stroke="#5f3e22" stroke-width="3" stroke-linecap="round"/>',
    sonne: '<circle cx="24" cy="24" r="10" fill="#f4b83a"/>' + [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { var r = a * Math.PI / 180; return '<path d="M' + n(24 + Math.cos(r) * 14) + ' ' + n(24 + Math.sin(r) * 14) + 'L' + n(24 + Math.cos(r) * 20) + ' ' + n(24 + Math.sin(r) * 20) + '" stroke="#f4b83a" stroke-width="3" stroke-linecap="round"/>'; }).join(''),
    baum: '<path d="M21 46L22 28L26 28L27 46Z" fill="#7a5534"/><circle cx="24" cy="18" r="13" fill="#4d8a44"/><circle cx="15" cy="24" r="8" fill="#5a9a4c"/><circle cx="33" cy="24" r="8" fill="#5a9a4c"/>',
    fichte: '<path d="M23 46L23 38L25 38L25 46Z" fill="#7a5534"/><path d="M24 2L12 18L18 18L8 30L16 30L6 40L42 40L32 30L40 30L30 18L36 18Z" fill="#2f6244"/>',
    reh: '<path d="M8 22C8 16 14 14 26 14C34 14 36 18 36 22C36 26 32 27 26 27L13 27C10 27 8 25 8 22Z" fill="#a8743f"/><path d="M12 26L11 40M17 26L17 40M29 26L30 40M33 25L35 40" stroke="#8a5d31" stroke-width="2.6" stroke-linecap="round"/><path d="M31 16L36 6L41 7L36 17Z" fill="#a8743f"/><path d="M36 6C38 3 43 3 45 6L40 9Z" fill="#a8743f"/><path d="M37 4L35 0M39 4L41 0" stroke="#8a5d31" stroke-width="1.6" stroke-linecap="round"/>',
    pilz: '<path d="M19 44L20 26L28 26L29 44Z" fill="#efe9d8"/><path d="M6 28C6 12 42 12 42 28Z" fill="#c8372d"/><circle cx="16" cy="21" r="2.6" fill="#fbfbf2"/><circle cx="27" cy="17" r="2.4" fill="#fbfbf2"/><circle cx="34" cy="23" r="2" fill="#fbfbf2"/>',
    wurm: '<path d="M6 34C12 22 18 40 24 30C30 20 36 36 42 26" stroke="#d98c8c" stroke-width="6" fill="none" stroke-linecap="round"/>',
    mineral: '<path d="M10 40L14 30L22 30L26 40Z" fill="#9fb4c4"/><path d="M22 40L27 24L35 24L40 40Z" fill="#b9cbd8"/><path d="M16 26L19 18L25 18L27 26Z" fill="#8aa1b3"/>',
    laub: '<path d="M10 38C8 22 22 10 40 8C40 26 28 40 10 38Z" fill="#b5762f"/><path d="M10 38L32 16" stroke="#7a4c1c" stroke-width="2"/><path d="M14 30C20 34 26 34 30 30" stroke="#7a4c1c" stroke-width="1.2" fill="none"/>',
    kaefer: '<ellipse cx="24" cy="28" rx="10" ry="13" fill="#5a3b22"/><path d="M24 15L24 41" stroke="#3a2412" stroke-width="1.6"/><circle cx="24" cy="13" r="5" fill="#3a2412"/><path d="M14 22L6 18M14 30L6 30M14 37L7 41M34 22L42 18M34 30L42 30M34 37L41 41M21 9L18 4M27 9L30 4" stroke="#3a2412" stroke-width="2" stroke-linecap="round"/>',
    specht: '<g transform="translate(22 22) scale(1.05)">' + '<path d="M-6 18L-12 30L-6 28L-2 20Z" fill="#1d1d1b"/><ellipse cx="0" cy="8" rx="8" ry="14" fill="#1d1d1b"/><path d="M3 -3C9 3 9 16 5 21L1 19C4 12 4 3 1 -3Z" fill="#f2eee2"/><ellipse cx="-3" cy="5" rx="2.6" ry="5.5" fill="#f2eee2"/><path d="M1 19C4 23 7 23 8 19C6 25 2 26 0 23Z" fill="#c8372d"/><circle cx="3" cy="-9" r="7.5" fill="#1d1d1b"/><ellipse cx="5" cy="-7" rx="5" ry="4" fill="#f2eee2"/><path d="M-4 -11C-3 -13 -1 -13 0 -12L-2 -8Z" fill="#c8372d"/><path d="M9 -10L20 -9L9 -7Z" fill="#4a4a48"/><circle cx="5" cy="-10" r="1.3" fill="#1d1d1b"/></g>',
    habicht: '<path d="M24 22C16 14 8 12 2 14C8 18 14 22 18 26L22 30L24 40L26 30L30 26C34 22 40 18 46 14C40 12 32 14 24 22Z" fill="#6b5a4a"/><circle cx="24" cy="20" r="4" fill="#6b5a4a"/><path d="M24 20L27 22L24 23Z" fill="#e0b13a"/>',
    blatt: '<path d="M24 44L24 38" stroke="#5b7a2c" stroke-width="2.4"/><path d="M24 38C10 34 8 18 24 4C40 18 38 34 24 38Z" fill="#6f9a3c"/><path d="M24 36L24 10" stroke="#d6e8b0" stroke-width="1.4"/>',
    raupe: '<circle cx="10" cy="30" r="5" fill="#7fb04a"/><circle cx="18" cy="28" r="5.5" fill="#8cbc52"/><circle cx="26" cy="27" r="5.5" fill="#7fb04a"/><circle cx="34" cy="28" r="5.5" fill="#8cbc52"/><circle cx="41" cy="25" r="5.5" fill="#6a9a3c"/><circle cx="43" cy="24" r="1.2" fill="#1d1d1b"/>',
    meise: '<ellipse cx="22" cy="28" rx="13" ry="10" fill="#f0d24a"/><path d="M10 26C14 18 26 16 32 22C28 22 20 22 10 26Z" fill="#6f9fc4"/><circle cx="32" cy="18" r="8" fill="#f6f4ea"/><path d="M26 13C30 9 36 10 38 14C34 13 30 13 26 13Z" fill="#3d7bb8"/><path d="M30 18L40 19M30 18L26 21" stroke="#1d2d3d" stroke-width="2" stroke-linecap="round"/><path d="M40 18L45 19L40 21Z" fill="#2c2c2c"/><path d="M9 28L2 33L9 32Z" fill="#3d7bb8"/>',
    sperber: '<path d="M24 22C16 14 6 13 1 16C8 19 14 23 18 27L22 30L24 42L26 30L30 27C34 23 40 19 47 16C42 13 32 14 24 22Z" fill="#5d6b78"/><circle cx="24" cy="20" r="4" fill="#5d6b78"/><path d="M24 20L27 22L24 23Z" fill="#e0b13a"/>',
    stockwerke: '<path d="M22 46L23 30L25 30L26 46Z" fill="#7a5534"/><circle cx="24" cy="18" r="13" fill="#4d8a44"/><path d="M4 30L44 30M4 37L44 37M4 44L44 44" stroke="#c9b48a" stroke-width="2" stroke-dasharray="3 3"/>',
    kreislauf: '<path d="M24 8A16 16 0 0 1 40 24" stroke="#4d8a44" stroke-width="4" fill="none"/><path d="M40 24A16 16 0 0 1 24 40" stroke="#a8743f" stroke-width="4" fill="none"/><path d="M24 40A16 16 0 0 1 8 24" stroke="#7a5230" stroke-width="4" fill="none"/><path d="M8 24A16 16 0 0 1 24 8" stroke="#f4b83a" stroke-width="4" fill="none"/><path d="M36 14L41 22L32 22Z" fill="#4d8a44"/><path d="M14 34L7 26L16 26Z" fill="#7a5230"/>',
    waage: '<path d="M24 8L24 42M14 42L34 42M8 16L40 16" stroke="#6a4a33" stroke-width="3" stroke-linecap="round"/><path d="M8 16L2 30L14 30Z" fill="none" stroke="#6a4a33" stroke-width="2"/><path d="M40 16L34 30L46 30Z" fill="none" stroke="#6a4a33" stroke-width="2"/><path d="M2 30C4 34 12 34 14 30Z" fill="#a8743f"/><path d="M34 30C36 34 44 34 46 30Z" fill="#1d1d1b"/><circle cx="24" cy="8" r="3" fill="#6a4a33"/>',
    konkurrenz: '<g transform="translate(13 22) scale(.65)"><path d="M-6 18L-12 30L-6 28L-2 20Z" fill="#1d1d1b"/><ellipse cx="0" cy="8" rx="8" ry="14" fill="#1d1d1b"/><circle cx="3" cy="-9" r="7.5" fill="#1d1d1b"/><path d="M-4 -11L0 -12L-2 -8Z" fill="#c8372d"/><path d="M9 -10L20 -9L9 -7Z" fill="#4a4a48"/></g><g transform="translate(35 22) scale(-.65 .65)"><path d="M-6 18L-12 30L-6 28L-2 20Z" fill="#4f6e2b"/><ellipse cx="0" cy="8" rx="8" ry="14" fill="#6e9a3a"/><circle cx="3" cy="-9" r="7.5" fill="#6e9a3a"/><path d="M-4 -15C0 -18 6 -17 8 -13Z" fill="#c8372d"/><path d="M9 -10L22 -9L9 -7Z" fill="#3b3b38"/></g>',
    nische: '<path d="M8 14L20 14C20 8 28 8 28 14L40 14L40 26C46 26 46 34 40 34L40 44L8 44L8 34C14 34 14 26 8 26Z" fill="#6f9a3c"/><path d="M16 30L22 36L32 24" stroke="#fbfbf2" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
    lupe: '<circle cx="20" cy="20" r="13" fill="#e8f2d8" stroke="#6a4a33" stroke-width="3.4"/><path d="M29 29L42 42" stroke="#6a4a33" stroke-width="5" stroke-linecap="round"/><path d="M20 30C12 27 12 17 20 10C28 17 28 27 20 30Z" fill="#6f9a3c"/>',
    rucksack: '<path d="M18 16C18 9 30 9 30 16" stroke="#6a4a33" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M12 22C12 15 36 15 36 22L37 41C37 44 35 45 32 45L16 45C13 45 11 44 11 41Z" fill="#a0683a"/><path d="M12 21C18 27 30 27 36 21L36 29C30 33 18 33 12 29Z" fill="#7d5030"/><rect x="17" y="34" width="14" height="8" rx="2.5" fill="#c58a3e"/><circle cx="24" cy="29" r="2.2" fill="#f2b632"/>',
    diplom: '<path d="M8 10L40 10L40 38L8 38Z" fill="#fbf6e4" stroke="#a8743f" stroke-width="2"/><path d="M14 18L34 18M14 24L30 24M14 30L26 30" stroke="#a8743f" stroke-width="2" stroke-linecap="round"/><circle cx="34" cy="34" r="7" fill="#c8372d"/><path d="M30 40L28 47L34 44L40 47L38 40" fill="#c8372d"/>',
    feldbuch: '<path d="M8 6L36 6C38 6 40 8 40 10L40 42L12 42C10 42 8 40 8 38Z" fill="#5d7f3a"/><path d="M12 6L12 42" stroke="#3d5a24" stroke-width="2"/><path d="M18 14L34 14M18 20L32 20" stroke="#e7efd2" stroke-width="2" stroke-linecap="round"/><path d="M40 10L44 10L44 46L14 46L14 42" fill="none" stroke="#3d5a24" stroke-width="2"/>'
  };
  A.icon = function (id, cls) {
    if (!I[id]) return '';
    return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 48 48" aria-hidden="true">' + I[id] + '</svg>';
  };
  A.ICON_IDS = Object.keys(I);
})();
