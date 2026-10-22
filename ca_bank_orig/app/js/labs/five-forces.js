/* PassBook — Five Forces Lab (five-forces): Porter's five forces of ICAI's Strategic Management Study Material, chapter 2, 2.5.1 and 2.5.2
   (printed pages 2.26-2.35). The drivers of each force are the Study Material's own lists (barriers to entry (i)-(vii), buyers' and suppliers'
   bargaining power, the conditions of cut-throat rivalry, substitutes), each phrased as a fact that ADDS pressure (for new entrants: a
   barrier that is LOW). Pure part: rateForces(present, unknown) and compute(values); UI: register() at the bottom.
   The Study Material rates each force "fierce, strong, moderate to normal, or weak" (Step 2) without a formula; the lab's rule (stated in
   every note): the share of a force's drivers present: none → weak, up to a fifth → moderate, up to half → strong, more → fierce. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});

  const FORCES = [
    { id: 'entrants', name: 'Threat of new entrants', box: 'New entrants', what: 'threat', sm: 'I. The threat of new entrants',
      drivers: [
        ['e_cap', 'Little capital is needed to enter', 'capital requirements'], ['e_scale', 'No big economies of scale protect the incumbents', 'economies of scale'],
        ['e_diff', 'Products are alike, so there is little differentiation to overcome', 'product differentiation'], ['e_switch', 'Buyers can switch to a newcomer at little cost', 'switching costs'],
        ['e_brand', 'The incumbents have no strong brand identity', 'brand identity'], ['e_channel', 'A newcomer can reach the distribution channels easily', 'access to distribution channels'],
        ['e_retal', 'The incumbents are unlikely to retaliate aggressively', 'possibility of aggressive retaliation'], ['e_patent', 'No patents or licences protect the incumbents', 'patents (ICAI\'s RTP September 2024 answer)'],
        ['e_big', 'A large, well-funded firm is entering', 'the bigger the new entrant, the more severe the competitive effect']] },
    { id: 'buyers', name: 'Bargaining power of buyers', box: 'Buyers', what: 'power', sm: 'II. Bargaining power of buyers',
      drivers: [
        ['b_know', 'Buyers have full knowledge of the sources of the product and its substitutes', '(i) full knowledge'], ['b_big', 'Buyers spend a lot on the product: they are big buyers', '(ii) big buyers'],
        ['b_noncrit', 'The product is not critical to the buyers\' needs', '(iii) not critical'], ['b_conc', 'Buyers are more concentrated than the firms supplying the product', '(iii) concentrated buyers'],
        ['b_switch', 'Buyers can easily switch to the substitutes available', '(iii) easy switching'], ['b_group', 'Buyers come together in groups or cartels to press the producer', 'groups or cartels of buyers']] },
    { id: 'suppliers', name: 'Bargaining power of suppliers', box: 'Suppliers', what: 'power', sm: 'III. Bargaining power of suppliers',
      drivers: [
        ['s_crucial', 'The suppliers\' product is crucial to the buyer and has no substitute', '(i) crucial, no substitutes'], ['s_switch', 'Changing suppliers is costly (high switching costs)', '(ii) high switching costs'],
        ['s_conc', 'Suppliers are few: more concentrated than their buyers', '(iii) concentrated, limited in number'], ['s_spec', 'The supplier\'s offering is specialised', 'specialised offering']] },
    { id: 'rivalry', name: 'Rivalry among existing firms', box: 'Rivalry', what: 'rivalry', sm: 'IV. The nature of rivalry in the industry',
      drivers: [
        ['r_leader', 'No strong industry leader disciplines prices', '(i) industry leader'], ['r_many', 'There are many competitors', '(ii) number of competitors'],
        ['r_fixed', 'Fixed costs are high, so firms cut prices to fill capacity', '(iii) fixed costs'], ['r_exit', 'Exit barriers are high: specialised assets keep weak rivals in', '(iv) exit barriers'],
        ['r_commod', 'Products are undifferentiated, so firms compete on price', '(v) product differentiation'], ['r_slow', 'Industry growth is slow', '(vi) slow growth']] },
    { id: 'substitutes', name: 'Threat of substitutes', box: 'Substitutes', what: 'threat', sm: 'V. Threat of substitutes',
      drivers: [
        ['x_price', 'Substitutes offer the buyer a price advantage', 'price advantage'], ['x_perf', 'Substitutes offer a performance improvement', 'performance improvement'],
        ['x_rnd', 'Substantial investment in R&D is creating alternatives', 'where substantial R&D is taking place']] }
  ];
  const DRIVERS = FORCES.flatMap(F => F.drivers.map(([id, label, sm]) => ({ id, label, sm, force: F.id })));
  const DRIVER = Object.fromEntries(DRIVERS.map(d => [d.id, d]));
  const FORCE = Object.fromEntries(FORCES.map(F => [F.id, F]));
  const LEVELS = [{ id: 'weak', pts: 0, color: 'ok' }, { id: 'moderate', pts: 1, color: 'warn' }, { id: 'strong', pts: 2, color: 'bad' }, { id: 'fierce', pts: 3, color: 'bad' }];
  const levelOf = f => (f <= 0 ? LEVELS[0] : f <= 0.2 + 1e-9 ? LEVELS[1] : f <= 0.5 + 1e-9 ? LEVELS[2] : LEVELS[3]);

  /** present: Set (or array) of driver ids; unknown: force ids the case does not describe → {rows: [...per force], strongest: [force ids], mean, verdict} */
  function rateForces(present, unknown) {
    const P = new Set(present || []), U = new Set(unknown || []);
    const rows = FORCES.map(F => {
      if (U.has(F.id)) return { id: F.id, known: false, n: 0, of: F.drivers.length, frac: null, level: null };
      const n = F.drivers.filter(d => P.has(d[0])).length, frac = n / F.drivers.length, L = levelOf(frac);
      return { id: F.id, known: true, n, of: F.drivers.length, frac, level: L.id, pts: L.pts };
    });
    const known = rows.filter(r => r.known);
    if (!known.length) throw new Error('Describe at least one force (every force is marked "not stated").');
    const top = Math.max(...known.map(r => r.frac)), strongest = top > 0 ? known.filter(r => Math.abs(r.frac - top) < 1e-12).map(r => r.id) : [];
    const mean = known.reduce((s, r) => s + r.pts, 0) / known.length;
    const fierce = known.some(r => r.level === 'fierce'), strongish = known.some(r => r.level === 'strong' || r.level === 'fierce');
    const verdict = fierce || mean >= 1.5 - 1e-12 ? 'unattractive' : mean < 1 - 1e-12 && !strongish ? 'attractive' : 'moderately attractive';
    return { rows, strongest, mean, verdict };
  }

  /* ---------------------------------------------------------------- the cases: each driver present with the case's own words */
  const CASES = {
    cafes: { label: 'Tapri vs BrewBucks: cafés in Indian cities', industry: 'the café industry in Tapri\'s cities',
      yes: { e_cap: 'A kulhad café needs a small shop, a stove and a few lakh rupees.', e_channel: 'Any newcomer can rent the same high-street shops and list on the same delivery apps.',
        e_big: 'BrewBucks, a global coffee chain with deep pockets, is opening in Tapri\'s cities.', b_know: 'Delivery apps show every café\'s menu and prices side by side.',
        r_many: 'Every busy street has several cafés and roadside tapris.', r_fixed: 'Rent and staff cost the same whether a café sells 100 cups or 1,000.',
        r_leader: 'No chain is big enough to discipline prices across the cities.', x_price: 'Home-made chai and office tea machines cost a fraction of a café cup.' },
      no: { e_brand: 'Tapri\'s own brand is well known, which slows newcomers.', s_conc: 'Tea, milk and clay cups come from many small suppliers.', s_crucial: 'Every input has many alternative sources.' } },
    airlines: { label: 'Indian airlines', industry: 'the Indian airline industry',
      yes: { e_switch: 'Passengers can change airline with one click.', b_know: 'Fare aggregators show every fare on a route in seconds.',
        b_switch: 'On short routes passengers easily switch to trains and buses.', b_big: 'Corporate travel desks buy thousands of tickets a year and negotiate.',
        s_conc: 'Two aircraft makers supply almost every large jet.', s_crucial: 'Aircraft and jet fuel are crucial and have no substitute.',
        s_switch: 'Changing aircraft type means retraining pilots and engineers.', s_spec: 'Engines and spares are highly specialised.',
        r_fixed: 'Aircraft leases, crews and parking are paid whether seats fill or not.', r_exit: 'Specialised aircraft and long leases keep loss-making airlines flying.',
        r_commod: 'Most passengers simply pick the cheapest fare.', x_price: 'Trains and buses are cheaper on short routes.', x_perf: 'Video calls now replace many business trips.' },
      no: { e_cap: 'Aircraft, airport slots and licences need huge capital.', e_scale: 'Large fleets have much lower costs per seat.', r_leader: 'The market leader is big enough to discipline fares.' } },
    vacuum: { label: 'Vacuum cleaners (Rajiv Arya\'s company)', industry: 'domestic vacuum cleaners', src: 'RTP September 2024 Q10',
      yes: { r_leader: 'Four other manufacturers achieve comparable sales volumes: no single firm dominates.', r_many: 'The market is competitive, with four other manufacturers of similar size.',
        r_commod: 'All of them offer similar products, so customers can easily shift from one to another.', x_price: 'House maids, available at low cost, do the same job (ICAI\'s answer).' },
      no: { e_patent: 'The rival firms hold several patents on vacuum cleaner technology.', s_conc: 'The supplier base for raw materials is extensive, with multiple suppliers.' },
      unknown: ['buyers'] },
    swift: { label: 'Same-day delivery (SwiftDeliver Logistics)', industry: 'same-day delivery in metro cities', src: 'RTP September 2026 Q9',
      yes: { e_big: 'Many e-commerce firms are building in-house delivery capabilities.', s_crucial: 'Fuel prices have risen 18% in the past year; fuel is a key input for logistics.',
        x_rnd: 'Drone-based last-mile delivery start-ups are attracting significant venture capital funding; the technology may offer faster, cheaper delivery.',
        b_big: 'Large e-commerce clients place bulk orders and contribute significantly to revenue.', b_conc: 'Large e-commerce clients negotiate aggressively on delivery rates; a few of them bring a large part of the revenue.' },
      no: {}, unknown: ['rivalry'] },
    scooters: { label: 'Budget scooters (EcoRide)', industry: 'the budget scooter market', src: 'RTP May 2026 Q1(iii)',
      yes: { r_many: 'EcoRide met intense competition from many budget scooter makers.', r_commod: 'Budget scooters are much alike, so margins are thin and price decides.' },
      no: {}, unknown: ['entrants', 'buyers', 'suppliers', 'substitutes'] }
  };
  const CASE_IDS = Object.keys(CASES);

  /** the drivers present and the forces not stated, for these values (a case, or the custom toggles) */
  function inputs(v) {
    const C = CASES[v.case];
    if (C) return { present: Object.keys(C.yes), unknown: C.unknown || [], C };
    return { present: DRIVERS.filter(d => !!v[d.id]).map(d => d.id), unknown: [], C: null };
  }
  /* the case select and the driver toggles agree (P2: a lab may normalise its values in show()): choosing a case copies its drivers into
     the toggles; changing a toggle while a case is chosen turns the case into "your own industry"; a test problem hides the toggles */
  function sync(v) {
    const C = CASES[v.case];
    if (v.quiz && (v.case !== 'custom' || DRIVERS.some(d => !!v[d.id] !== (v.quiz.on || []).includes(d.id)))) delete v.quiz;
    if (C) {
      if (v._case !== v.case) { DRIVERS.forEach(d => (v[d.id] = d.id in C.yes)); v._case = v.case; }
      else if (DRIVERS.some(d => !!v[d.id] !== d.id in C.yes)) { v.case = 'custom'; v._case = 'custom'; }
    } else v._case = v.case;
    return true;
  }

  /* ---------------------------------------------------------------- the drawing */
  const BOX = { entrants: [4.1, 5.7], suppliers: [0, 3.0], rivalry: [4.1, 3.0], buyers: [8.2, 3.0], substitutes: [4.1, 0.3] }, BW = 3.6, BH = 1.8;
  function figure(R, opt) {
    const o = opt || {}, rated = o.rated || {}, items = [];
    const arrows = [[[5.9, 5.7], [5.9, 4.85]], [[5.9, 2.1], [5.9, 2.95]], [[3.6, 3.9], [4.05, 3.9]], [[8.2, 3.9], [7.75, 3.9]]];
    arrows.forEach(a => items.push({ kind: 'line', pts: a, color: 'mute', width: 1.6, arrow: 'end' }));
    FORCES.forEach(F => {
      const [x, y] = BOX[F.id], r = R.rows.find(q => q.id === F.id), on = rated[F.id], L = on && r.known ? LEVELS.find(l => l.id === r.level) : null;
      const fill = L ? L.color : 'mute', hl = o.focus === F.id;
      items.push({ kind: 'rect', at: [x, y], w: BW, h: BH, r: 0.18, fill, color: hl ? 'h' : L && L.id === 'fierce' ? 'bad' : 'mute', width: hl ? 3 : L && L.id === 'fierce' ? 3 : 1.2, dash: hl && !L });
      items.push({ kind: 'text', at: [x + BW / 2, y + BH - 0.42], t: F.box, size: 13.5 });
      const line2 = !on ? (o.focus === F.id ? 'rating…' : 'not rated yet') : !r.known ? 'not stated' : `${F.what}: ${r.level}`;
      items.push({ kind: 'text', at: [x + BW / 2, y + BH - 0.94], t: line2, size: 12.5, bold: false });
      if (on && r.known) items.push({ kind: 'text', at: [x + BW / 2, y + 0.38], t: `${r.n} of ${r.of} drivers`, size: 12.5, bold: false });
    });
    return { type: 'shapes', alt: 'Porter\'s five forces: new entrants above, substitutes below, suppliers left and buyers right of the rivalry among existing firms; ' +
      FORCES.map(F => { const r = R.rows.find(q => q.id === F.id); return `${F.box}: ${!rated[F.id] ? 'not rated' : r.known ? r.level : 'not stated'}`; }).join(', '), u: 33, w: 420, items };
  }
  const tick = '✓', dash = '—';
  /** the force's drivers as a table: `seen` ticked (with the case's words); `final` also dashes the absent ones and gives what holds them back */
  function driverTable(F, I, seenList, final) {
    const C = I.C, seen = new Set(seenList || []);
    return { type: 'table', title: `${F.name}: the drivers in the Study Material (${F.sm})`, head: ['Driver', 'Here?', 'In this case'], align: ['left', 'center', 'left'],
      cells: Object.fromEntries(F.drivers.map((d, i) => [i + ',1', seen.has(d[0]) ? 'b' : '']).filter(x => x[1])),
      rows: F.drivers.map(([id, label]) => [label, seen.has(id) ? tick : final ? dash : '', seen.has(id) ? (C ? C.yes[id] : 'set in the inputs') : final && C && C.no[id] ? C.no[id] : '']) };
  }

  function compute(v) {
    const I = inputs(v), R = rateForces(I.present, I.unknown), P = new Set(I.present);
    const ind = I.C ? I.C.industry : 'your industry';
    const rated = {};
    const frames = [{ caption: `Porter's five forces for **${ind}**. The state of competition is a composite of pressures from five areas: rivalry among existing firms, the threat of new entrants, the threat of substitutes, and the bargaining power of suppliers and of buyers. Step 1: identify the pressures in each force. Step 2: evaluate how strong each is. Step 3: decide whether their collective strength leaves room for attractive profits.`, view: [figure(R, {})] }];
    FORCES.forEach(F => {
      const r = R.rows.find(q => q.id === F.id);
      if (!r.known) {
        rated[F.id] = true;
        frames.push({ caption: `**${F.name}**: the case gives no information about this force, so it is marked **not stated** and left out of the overall rating (an exam answer says so in one line).`, view: [figure(R, { rated: Object.assign({}, rated), focus: F.id })] });
        return;
      }
      const here = F.drivers.filter(d => P.has(d[0])).map(d => d[0]), seen = [];
      if (!here.length) frames.push({ caption: `**${F.name}**: none of its drivers is present here.`, view: [figure(R, { rated: Object.assign({}, rated), focus: F.id }), driverTable(F, I, [], false)] });
      here.forEach(id => {
        seen.push(id);
        const d = DRIVER[id], ev = I.C ? ` *${I.C.yes[id]}*` : '';
        frames.push({ caption: `**${F.name}** · ${d.label.charAt(0).toLowerCase() + d.label.slice(1)} (Study Material: ${d.sm}).${ev} This adds pressure.`, view: [figure(R, { rated: Object.assign({}, rated), focus: F.id }), driverTable(F, I, seen.slice(), false)] });
      });
      rated[F.id] = true;
      const absent = F.drivers.filter(d => !P.has(d[0]) && I.C && I.C.no[d[0]]).map(d => I.C.no[d[0]]);
      frames.push({ caption: `${r.n} of ${F.drivers.length} drivers present, so the **${F.name.toLowerCase()}** is **${r.level}**.${absent.length ? ' What holds it back: ' + absent.join(' ') : ''}`,
        view: [figure(R, { rated: Object.assign({}, rated) }), driverTable(F, I, here, true)] });
    });
    const names = R.strongest.map(id => FORCE[id].name.toLowerCase()), nKnown = R.rows.filter(r => r.known).length;
    const strong = !names.length ? 'No force shows any pressure.' : names.length === 1 ? `The strongest force is the **${names[0]}**.` : `The strongest forces, level with each other, are the **${names.join('** and the **')}**.`;
    const verdictTxt = { attractive: 'the forces leave room for **attractive profits**: an **attractive** industry', 'moderately attractive': 'some forces are strong, so profits are possible but under pressure: **moderately attractive**', unattractive: 'the collective pressure squeezes profits: an **unattractive** industry for an average firm' }[R.verdict];
    const summary = { type: 'table', title: 'Step 2 and Step 3: each force rated, then the collective strength', head: ['Force', 'Drivers', 'Strength (points)'], align: ['left', 'center', 'left'],
      cells: Object.fromEntries(R.rows.map((r, i) => [i + ',2', !r.known ? 'mute' : r.level === 'weak' ? 'ok' : r.level === 'moderate' ? 'hl' : 'b'])),
      rows: R.rows.map(r => [FORCE[r.id].box, r.known ? `${r.n} of ${r.of}` : dash, r.known ? `${r.level} (${r.pts})` : 'not stated']) };
    frames.push({ caption: `${strong} Taken together (an average of ${(Math.round(R.mean * 100) / 100).toFixed(2)} points out of 3 over ${nKnown === 1 ? 'the one force the case describes' : nKnown + ' rated forces'}), ${verdictTxt}. Attractiveness is relative: an industry unattractive to weak competitors may be attractive to strong ones.`,
      view: [figure(R, { rated: Object.fromEntries(FORCES.map(F => [F.id, true])) }), summary] });
    const nStrong = R.rows.filter(r => r.known && (r.level === 'strong' || r.level === 'fierce')).length;
    return {
      frames, sim: R,
      stats: [{ label: 'Strongest force', value: R.strongest.length ? R.strongest.map(id => FORCE[id].box).join(' + ') : 'none', hint: 'the force with the largest share of its drivers present' },
        { label: 'Industry', value: R.verdict.charAt(0).toUpperCase() + R.verdict.slice(1), hint: 'Step 3: is the collective strength conducive to attractive profits?', tone: R.verdict === 'attractive' ? 'ok' : R.verdict === 'unattractive' ? 'bad' : 'warn' },
        { label: 'Average points (0–3)', value: (Math.round(R.mean * 100) / 100).toFixed(2), hint: 'weak 0, moderate 1, strong 2, fierce 3, over the forces the case states' },
        { label: 'Forces strong or fierce', value: String(nStrong), hint: 'Step 2' }],
      table: { head: ['Force', 'Drivers present (Study Material)', 'Strength'], rows: R.rows.map(r => [FORCE[r.id].name, r.known ? FORCE[r.id].drivers.filter(d => P.has(d[0])).map(d => d[1]).join('; ') || dash : 'not stated in the case', r.known ? r.level : dash]) },
      note: '**Conventions.** The drivers are the Study Material\'s (2.5.1), each phrased as a fact that adds pressure; for new entrants a barrier that is low counts as a driver, and patents are added from ICAI\'s RTP answer of September 2024. The Study Material rates a force as weak, moderate to normal, strong or fierce without a formula; this lab uses the share of the force\'s drivers present: none is weak, up to a fifth moderate, up to half strong, more than half fierce. Points run from 0 (weak) to 3 (fierce). The industry is unattractive when any force is fierce or the average reaches 1.5, attractive when the average is below 1 and no force is strong, and moderately attractive otherwise. A force the case does not describe is marked not stated and left out.'
        + (I.C && I.C.src ? ` **Source:** ${I.C.src}, from ICAI's Suggested Answer.` : '')
    };
  }

  /* ---------------------------------------------------------------- presets and the challenge */
  const presets = [
    { label: 'Tapri vs BrewBucks: the café industry', values: { case: 'cafes' } },
    { label: 'Indian airlines', values: { case: 'airlines' } },
    { label: 'RTP September 2024 Q10 · Rajiv Arya\'s vacuum cleaner company: the significant forces', values: { case: 'vacuum' } },
    { label: 'RTP September 2026 Q9 · SwiftDeliver: the relevant force for each observation', values: { case: 'swift' } },
    { label: 'RTP May 2026 MCQ 1(iii) · EcoRide in the budget scooter market', values: { case: 'scooters' } },
    { label: 'Your own industry: start from no drivers', values: { case: 'custom' } }
  ];
  /* facts for "which force is this?": the cases' own words (ICAI's SwiftDeliver mapping among them) and the Study Material's examples */
  /* drivers whose facts read just as well as another force (switching to a newcomer or to substitutes, products alike, price-led buying) stay
     out of the "which force?" quiz; they are still rated in their cases */
  const AMBIGUOUS = new Set(['e_switch', 'e_diff', 'b_switch', 'airlines.r_commod']);
  const FACTS = [].concat(...CASE_IDS.map(id => Object.entries(CASES[id].yes).filter(([d]) => !AMBIGUOUS.has(d) && !AMBIGUOUS.has(id + '.' + d))
      .map(([d, t]) => ({ text: t, driver: d, force: DRIVER[d].force, src: CASES[id].src || '', from: id }))),
    [{ text: 'Coir suffered at the hands of synthetic fibre.', driver: 'x_perf', force: 'substitutes', src: 'Study Material 2.5.1' },
      { text: 'Users of an industrial product come together, formally or informally, and press the producer for lower prices and better service.', driver: 'b_group', force: 'buyers', src: 'Study Material 2.5.1' },
      { text: 'Real estate, insurance, bonds and bank deposits are alternative ways to invest the funds that would go into common stocks.', driver: 'x_price', force: 'substitutes', src: 'Study Material 2.5.1' },
      { text: 'A few large component makers control the supply of specialised OLED screens and there are no viable alternative suppliers.', driver: 's_crucial', force: 'suppliers', src: 'RTP May 2026 MCQ 3' }]);
  const CHOICES = FORCES.map(F => F.name);
  const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
  const shuffle = (r, a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)) % (i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const factsHtml = (title, list) => `<div><p><b>${title}</b></p><ul>${list.map(t => `<li>${String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;')}</li>`).join('')}</ul></div>`;
  const challenge = {
    title: 'Name the force',
    gen(r) {
      const off = Object.fromEntries(DRIVERS.map(d => [d.id, false]));
      if (r() < 0.6) {
        const f = pick(r, FACTS), d = f.driver;
        return Object.assign(off, { case: 'custom', _case: 'custom', [d]: true, quiz: { type: 'fact', text: f.text, force: f.force, src: f.src, on: [d] } });
      }
      // one force clearly strongest: more than half of its drivers; every other force at most a fifth (0 or 1 driver)
      const F = pick(r, FORCES), on = shuffle(r, F.drivers.map(d => d[0])).slice(0, Math.floor(F.drivers.length / 2) + 1 + Math.floor(r() * Math.ceil(F.drivers.length / 2 - 0.5)));
      FORCES.filter(G => G !== F && G.drivers.length >= 5).forEach(G => { if (r() < 0.6) on.push(pick(r, G.drivers)[0]); });
      on.forEach(id => (off[id] = true));
      return Object.assign(off, { case: 'custom', _case: 'custom', quiz: { type: 'strongest', order: shuffle(r, on), on: on.slice() } });
    },
    prompt(v) {
      const q = v.quiz || {};
      if (q.type === 'fact') return 'Which of Porter\'s five forces does this observation point to?';
      return 'The facts shown describe one industry. Which force is the strongest?';
    },
    solve(res, v) {
      const q = v.quiz || {};
      if (q.type === 'fact') return FORCE[q.force].name;
      return res.sim.strongest.length === 1 ? FORCE[res.sim.strongest[0]].name : null;
    },
    kind: 'choice',
    choices: () => CHOICES,
    view(res, v) {
      const q = v.quiz || {};
      if (q.type === 'fact') return [{ html: factsHtml('Observation', [q.text]) }];
      return [{ html: factsHtml('Facts about the industry', (q.order || []).map(id => DRIVER[id].label + '.')) }];
    },
    explain(res, v) {
      const q = v.quiz || {};
      if (q.type === 'fact') return `This is about the **${FORCE[q.force].name.toLowerCase()}**${q.src ? ` (${q.src})` : ''}. The Study Material's drivers for it: ${FORCE[q.force].drivers.map(d => d[2]).join('; ')}.`;
      const top = res.sim.rows.find(r => r.id === res.sim.strongest[0]);
      return `Sort the facts by force: ${res.sim.rows.filter(r => r.n).map(r => `${FORCE[r.id].box} ${r.n} of ${r.of}`).join(', ')}. More than half of the **${FORCE[top.id].name.toLowerCase()}**'s drivers are present (${top.n} of ${top.of}), so it is **${top.level}**; every other force has at most a fifth of its drivers.`;
    }
  };

  const toggles = DRIVERS.map(d => ({ id: d.id, type: 'toggle', label: `${FORCE[d.force].box}: ${d.label}`, short: d.label, value: false, show: v => v.case === 'custom' && !v.quiz }));
  const def = {
    id: 'five-forces', title: 'Five Forces Lab',
    blurb: 'Work out how strong each of Porter\'s five forces is from its drivers, find the strongest and judge the industry.',
    controls: [{ id: 'case', type: 'select', label: 'Industry', value: 'cafes', options: CASE_IDS.map(id => [id, CASES[id].label + (CASES[id].src ? ` (${CASES[id].src})` : '')]).concat([['custom', 'Your own industry (set the drivers below)']]),
      show: sync, help: 'Pick a case, or choose "Your own industry" to switch the drivers on and off: it starts from the drivers of the case you were looking at.' }].concat(toggles),
    presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { rateForces, compute, def, FORCES, DRIVERS, CASES, FACTS, sync, levelOf, AMBIGUOUS };
  g.__lab_def_five_forces = def;
})(typeof window !== 'undefined' ? window : globalThis);
