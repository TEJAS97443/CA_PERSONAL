/* PassBook — test fixture lab (not shipped): a tiny break-even simulator that exercises the lab framework in Node tests
   (tests/labs-*.test.js) while content/labs.json has no real lab. It follows docs/LAB_GUIDE.md exactly, so it is also the smallest
   complete example of a lab: pure compute(values) -> {frames, stats, table, note}, declarative controls, presets and a challenge.
   Real labs live in app/js/labs/<id>.js and are registered in content/labs.json (tools/lab_status.py add …). */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  const r2 = x => Math.round(x * 100) / 100;
  const inr = n => (GA.util && GA.util.inr ? GA.util.inr(n) : String(Math.round(n)));

  /** the break-even numbers for a price, a variable cost per unit and the period's fixed cost */
  function breakEven(price, vc, fixed, sales) {
    if (!(price > vc)) throw new Error('The selling price must be higher than the variable cost per unit, or no volume breaks even.');
    const c = price - vc, bep = fixed / c, pv = c / price;
    const mos = sales != null ? sales - bep : null;
    return { contribution: c, pv, bepUnits: bep, bepSales: bep * price, mosUnits: mos, mosPct: sales ? mos / sales : null, profit: sales != null ? sales * c - fixed : null };
  }

  function compute(v) {
    const price = +v.price, vc = +v.vc, fixed = +v.fixed, sales = +v.sales;
    const B = breakEven(price, vc, fixed, sales);
    const top = Math.max(sales, B.bepUnits) * 1.25, xmax = Math.ceil(top / 100) * 100;
    const plot = (upTo, mark) => ({ type: 'plot', alt: 'Break-even chart', x: [0, xmax], y: [0, Math.ceil(price * xmax / 1000) * 1000], xlabel: 'units', ylabel: 'amount',
      series: [{ label: 'sales', fn: price + '*x' }].concat(upTo > 0 ? [{ label: 'total cost', fn: fixed + '+' + vc + '*x' }] : []),
      points: mark ? [{ x: r2(B.bepUnits), y: r2(B.bepSales), label: 'break-even' }] : [] });
    const frames = [
      { caption: `Sales rise by ${inr(price)} for every unit sold.`, view: [plot(0, false)] },
      { caption: `Total cost starts at the fixed cost (${inr(fixed)}) and rises by ${inr(vc)} a unit, so each unit adds a contribution of ${inr(B.contribution)}.`, view: [plot(1, false)] },
      { caption: `The lines cross where the contributions have paid the fixed cost: **${r2(B.bepUnits)} units**.`, view: [plot(1, true)] }
    ];
    return {
      frames,
      stats: [{ label: 'Contribution per unit', value: inr(B.contribution), hint: 'selling price − variable cost' },
        { label: 'P/V ratio', value: r2(B.pv * 100) + '%', hint: 'contribution / sales' },
        { label: 'Break-even (units)', value: String(r2(B.bepUnits)), hint: 'fixed cost / contribution per unit' },
        { label: 'Margin of safety', value: r2(B.mosPct * 100) + '%', hint: '(sales − break-even sales) / sales' }],
      table: { head: ['Measure', 'Value'], rows: [['Break-even sales', inr(B.bepSales)], ['Profit at the given sales', inr(B.profit)]] },
      note: 'Conventions: one product, a constant price and variable cost, fixed cost for the period.',
      sim: B
    };
  }

  const def = {
    id: 'fixture-bep', title: 'Break-even fixture', blurb: 'A test fixture: break-even point, P/V ratio and margin of safety for one product.',
    controls: [
      { id: 'price', type: 'number', label: 'Selling price per unit', value: 100, min: 1, max: 100000 },
      { id: 'vc', type: 'number', label: 'Variable cost per unit', value: 60, min: 0, max: 100000 },
      { id: 'fixed', type: 'number', label: 'Fixed cost for the period', value: 200000, min: 0, max: 1e9 },
      { id: 'sales', type: 'number', label: 'Units sold', value: 8000, min: 1, max: 1e7 }
    ],
    presets: [
      { label: 'Lesson example (₹100, ₹60, ₹2,00,000)', values: { price: 100, vc: 60, fixed: 200000, sales: 8000 } },
      { label: 'Thin margin', values: { price: 50, vc: 45, fixed: 100000, sales: 25000 } },
      { label: 'High fixed cost', values: { price: 200, vc: 80, fixed: 1200000, sales: 12000 } }
    ],
    compute,
    challenge: {
      title: 'Find the break-even point',
      gen(r) { const vc = 20 + 5 * Math.floor(r() * 10), c = 10 * (1 + Math.floor(r() * 6)); return { price: vc + c, vc, fixed: c * 1000 * (1 + Math.floor(r() * 9)), sales: 12000 }; },
      prompt: v => `Price ₹${v.price}, variable cost ₹${v.vc} a unit, fixed cost ₹${v.fixed}. How many units break even?`,
      solve: res => res.sim.bepUnits, tol: 0.5, unit: 'units', kind: 'num',
      view: () => null,
      explain: (res, v) => `Contribution = ${v.price} − ${v.vc} = ${res.sim.contribution}; break-even = ${v.fixed} / ${res.sim.contribution} = ${res.sim.bepUnits} units.`
    }
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { breakEven, compute, def };
  g.__lab_def_fixture_bep = def;
})(typeof window !== 'undefined' ? window : globalThis);
