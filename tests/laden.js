/* Lädt die Browser-Skripte (ohne app.js) in einen Node-Kontext. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const FILES = [
  'js/util.js', 'js/logic.js', 'js/state.js',
  'js/inhalt/operatoren.js', 'js/inhalt/stockwerke.js', 'js/inhalt/nahrung.js', 'js/inhalt/gleichgewicht.js',
  'js/inhalt/konkurrenz.js', 'js/inhalt/nische.js', 'js/inhalt/bestimmung.js', 'js/inhalt/pruefung.js',
  'js/art-blaetter.js', 'js/art-wald.js', 'js/uebungen.js', 'js/bausteine.js', 'js/ansichten.js'
];

module.exports = function laden() {
  const store = {};
  const ctx = {
    console,
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
      removeItem: (k) => { delete store[k]; }
    },
    matchMedia: () => ({ matches: false })
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  FILES.forEach((f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f }));
  return ctx.W;
};
