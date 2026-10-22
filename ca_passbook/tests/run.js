#!/usr/bin/env node
/* Minimal test runner: node tests/run.js [pattern]. Each tests/*.test.js exports nothing; it calls test(name, fn) from the global. */
const fs = require('fs'), path = require('path');
const pat = process.argv[2] || '';
const results = { pass: 0, fail: 0 };
global.test = (name, fn) => {
  try { fn(); results.pass++; if (process.env.V) console.log('  ok   ' + name); }
  catch (e) { results.fail++; console.log('  FAIL ' + name + '\n       ' + String(e && e.stack || e).split('\n').slice(0, 4).join('\n       ')); }
};
global.assert = require('assert');
global.approx = (a, b, eps = 1e-9) => { if (Math.abs(a - b) > eps) throw new Error(`expected ${b}, got ${a}`); };
for (const f of fs.readdirSync(__dirname).filter(f => f.endsWith('.test.js') && f.includes(pat)).sort()) {
  console.log('# ' + f);
  require(path.join(__dirname, f));
}
console.log(`\n${results.pass} passed, ${results.fail} failed`);
process.exit(results.fail ? 1 : 0);
