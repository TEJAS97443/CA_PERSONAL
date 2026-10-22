/* GA.reveal pure helpers: the count-up must end on exactly the number the page states, in the same format. */
globalThis.GA = globalThis.GA || {};
const R = require('../app/js/core/reveal.js');

test('reveal: parseCount reads grouped integers, decimals, prefixes and suffixes', () => {
  assert.deepEqual(R.parseCount('1,985'), { prefix: '', value: 1985, decimals: 0, grouped: true, suffix: '' });
  assert.deepEqual(R.parseCount('60%'), { prefix: '', value: 60, decimals: 0, grouped: false, suffix: '%' });
  assert.deepEqual(R.parseCount('~4.5 h'), { prefix: '~', value: 4.5, decimals: 1, grouped: false, suffix: ' h' });
  assert.deepEqual(R.parseCount('2007–2026'), { prefix: '', value: 2007, decimals: 0, grouped: false, suffix: '–2026' });
  assert.equal(R.parseCount('no number'), null);
  assert.equal(R.parseCount(''), null);
});

test('reveal: formatCount round-trips the target text', () => {
  for (const t of ['1,985', '334', '12,345,678', '60%', '~4.5 h', '0.25', '191 embeds', '+18']) {
    const p = R.parseCount(t);
    assert.equal(R.formatCount(p, p.value), t, t);
  }
});

test('reveal: countAt starts at 0, ends at the value, is monotonic and keeps integers whole', () => {
  const p = R.parseCount('1,985');
  assert.equal(R.countAt(p, 0), 0);
  assert.equal(R.countAt(p, 1), 1985);
  assert.equal(R.countAt(p, 2), 1985);
  let prev = -1;
  for (let i = 0; i <= 50; i++) { const v = R.countAt(p, i / 50); assert.ok(v >= prev); assert.equal(v, Math.round(v)); prev = v; }
  assert.equal(R.formatCount(p, R.countAt(p, 0.5)).includes(','), true);
  const d = R.parseCount('4.5');
  assert.ok(Math.abs(R.countAt(d, 1) - 4.5) < 1e-9);
});

test('reveal: Node build exposes inert DOM functions', () => {
  let called = 0;
  R.scan(); R.auto();
  R.whenVisible({}, () => called++);
  assert.equal(called, 1);
  assert.equal(R.reduced(), false);
});

test('reveal: whenVisible margins accept px numbers and CSS lengths, and fall back safely', () => {
  assert.equal(R.marginOf(600), '600px');
  assert.equal(R.marginOf(12.6), '13px');
  assert.equal(R.marginOf('250px'), '250px');
  assert.equal(R.marginOf('10% 0px'), '10% 0px');
  assert.equal(R.marginOf('0px 0px -6% 0px'), '0px 0px -6% 0px');
  assert.equal(R.marginOf('300'), '300px');
  assert.equal(R.marginOf('2em'), '250px');
  assert.equal(R.marginOf(undefined), '250px');
  assert.equal(R.marginOf(NaN), '250px');
});
