/* Start, Kopfzeile und Navigation über den Hash (#/station/stockwerke/ueben). */
(function () {
  'use strict';
  var W = (window.W = window.W || {});
  var h = W.h, A = W.art;

  function svg(markup) { var d = h('div'); d.innerHTML = markup; return d.firstElementChild; }

  function kopf() {
    var host = document.getElementById('kopf');
    var d = W.state.data;
    var rank = W.logic.rankFor(W.state.stamps());
    var route = location.hash || '#/';
    host.innerHTML = '';
    var start = route === '#/' || route === '#' || route === '';
    host.appendChild(h('div', { class: 'kopf__innen' },
      start
        ? h('a', { class: 'kopf__marke', href: '#/' }, svg(A.icon('baum', 'kopf__logo')), h('span', null, 'Expedition Wald'))
        : h('a', { class: 'kopf__zurueck', href: '#/' }, h('span', { 'aria-hidden': 'true' }, '‹'), ' Zur Karte'),
      h('nav', { class: 'kopf__nav', 'aria-label': 'Hauptmenü' },
        h('a', { class: 'kopf__link' + (route.indexOf('#/feldbuch') === 0 ? ' kopf__link--an' : ''), href: '#/feldbuch' }, svg(A.icon('feldbuch', 'kopf__ico')), h('span', null, 'Feldbuch')),
        h('a', { class: 'kopf__link' + (route.indexOf('#/pruefung') === 0 ? ' kopf__link--an' : ''), href: '#/pruefung' }, svg(A.icon('diplom', 'kopf__ico')), h('span', null, 'Prüfung'))),
      h('div', { class: 'kopf__stand' },
        h('a', { class: 'rang', href: '#/feldbuch', title: 'Dein Rang wächst mit jedem Stempel', 'aria-label': 'Rang: ' + rank.name + '. Mehr im Feldbuch' }, h('span', { class: 'rang__name' }, rank.name)),
        h('span', { class: 'eicheln', 'aria-label': d.acorns + ' Eicheln' }, svg(A.icon('eichel', 'eicheln__ico')), h('b', { class: 'eicheln__zahl' }, String(d.acorns))))));
  }

  function render() {
    var main = document.getElementById('inhalt');
    var parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
    main.innerHTML = '';
    var toasts = document.getElementById('toast');
    if (toasts) toasts.innerHTML = '';
    Array.prototype.forEach.call(document.querySelectorAll('.feier'), function (f) { f.remove(); });
    document.body.dataset.ansicht = parts[0] || 'karte';
    if (parts[0] === 'station') W.views.station(main, parts[1], parts[2]);
    else if (parts[0] === 'pruefung') W.views.pruefung(main);
    else if (parts[0] === 'feldbuch') W.views.feldbuch(main, parts[1]);
    else W.views.karte(main);
    kopf();
    var titles = { station: function () { var s = W.stations.filter(function (x) { return x.id === parts[1]; })[0]; return s ? s.short : ''; }, pruefung: function () { return 'Försterprüfung'; }, feldbuch: function () { return 'Feldbuch'; } };
    document.title = (titles[parts[0]] ? titles[parts[0]]() + ' · ' : '') + 'Expedition Wald';
  }

  W.app = { render: render };

  function boot() {
    W.state.load();
    var geheim = W.state.geheimnisse();
    W.state.on(function () {
      var g = W.state.geheimnisse();
      if (g > geheim) { geheim = g; setTimeout(function () { W.toast('Neues Wald-Geheimnis im Feldbuch!', 'geheim'); }, 600); }
      var z = document.querySelector('.eicheln__zahl');
      if (z) {
        z.textContent = String(W.state.data.acorns);
        var e = z.parentNode;
        e.classList.remove('eicheln--plus');
        void e.offsetWidth;
        e.classList.add('eicheln--plus');
      }
    });
    window.addEventListener('hashchange', function () { render(); window.scrollTo(0, 0); });
    render();
    W.views.nameDialog(false);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
