/* Kleine Helfer: DOM bauen, mischen, lokal speichern. Kein Framework. */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var SVGNS = 'http://www.w3.org/2000/svg';

  function append(el, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) { child.forEach(function (c) { append(el, c); }); return; }
    if (typeof child === 'string' || typeof child === 'number') { el.appendChild(document.createTextNode(String(child))); return; }
    el.appendChild(child);
  }

  function setAttrs(el, attrs, isSvg) {
    if (!attrs) return;
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === 'class') el.setAttribute('class', v);
      else if (k === 'html') el.innerHTML = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (k === 'dataset') Object.keys(v).forEach(function (d) { el.dataset[d] = v[d]; });
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    });
  }

  /** h('div', {class:'x', onclick: fn}, kind1, kind2) */
  W.h = function (tag, attrs) {
    var el = document.createElement(tag);
    setAttrs(el, attrs, false);
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  };

  W.s = function (tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    setAttrs(el, attrs, true);
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  };

  /** HTML-String aus SVG-Markup in ein Element verwandeln */
  W.frag = function (html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  };

  W.shuffle = function (arr, rnd) {
    rnd = rnd || Math.random;
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  /** Mischen, aber nie die Ausgangsreihenfolge zurückgeben (sonst ist eine Ordnungsaufgabe schon gelöst). */
  W.shuffleNot = function (arr, rnd) {
    if (arr.length < 2) return arr.slice();
    var a;
    var guard = 0;
    do { a = W.shuffle(arr, rnd); guard++; } while (guard < 20 && a.every(function (x, i) { return x === arr[i]; }));
    return a;
  };

  W.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  W.store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    set: function (key, val) {
      try { window.localStorage.setItem(key, JSON.stringify(val)); return true; } catch (e) { return false; }
    },
    remove: function (key) {
      try { window.localStorage.removeItem(key); } catch (e) { /* egal */ }
    }
  };

  W.reducedMotion = function () {
    try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
  };

  /** Kurzer Hinweis unten am Bildschirm (z. B. "+8 Eicheln") */
  W.toast = function (text, kind) {
    var host = document.getElementById('toast');
    if (!host) return;
    var t = W.h('div', { class: 'toast' + (kind ? ' toast--' + kind : '') }, text);
    host.appendChild(t);
    setTimeout(function () { t.classList.add('toast--weg'); }, 2200);
    setTimeout(function () { t.remove(); }, 2700);
  };
})();
