/* PassBook — Ansoff and ADL Lab (ansoff-adl): Ansoff's product-market growth matrix and the Arthur D. Little (ADL) strategic condition matrix,
   from ICAI's Strategic Management Study Material, chapter 4: 4.2.2.3 (Table 3, the product-market expansion grid), 4.4.1 and 4.4.2
   (printed pages 4.8-4.9 and 4.23-4.27).
   Pure part: classifyMove(product, market), adlCell(position, stage), parseNewness(text) and compute(values). UI: register() at the bottom.
   The ADL cells (their strategies and their colours) are copied from the figure on page 4.26, read from the rendered page because the text
   layer scrambles the table. The figure colours the cells green, orange and red without naming the colours. */
(function (g) {
  'use strict';
  const GA = (g.GA = g.GA || {});
  let lastMode = 'ansoff';

  /* ================================================================ Ansoff */
  const ANS = {
    pen: { key: 'pen', name: 'Market penetration', p: 'existing', m: 'existing', cell: [0, 0], color: 'ok',
      def: 'selling **existing products into existing markets**: more sales to present customers without changing the product in any major way, often through greater spending on advertising or personal selling, pricing that makes the market unattractive for competitors, or more usage by existing customers',
      grid: 'increase market share · increase product usage · increase the frequency used · increase the quantity used · find new applications for current users' },
    md: { key: 'md', name: 'Market development', p: 'existing', m: 'new', cell: [0, 1], color: 'a',
      def: 'selling **existing products into new markets**: new geographical markets, new product dimensions or packaging, new distribution channels or different pricing to attract different customers or create new segments',
      grid: 'expand geographically · target new segments' },
    pd: { key: 'pd', name: 'Product development', p: 'new', m: 'existing', cell: [1, 0], color: 'warn',
      def: 'offering **new or modified products to existing markets**; it may need new competencies and products modified to appeal to the current customers',
      grid: 'add product features, product refinement · develop a new-generation product · develop a new product for the same market' },
    div: { key: 'div', name: 'Diversification', p: 'new', m: 'new', cell: [1, 1], color: 'bad',
      def: 'marketing **new products in new markets**, by starting up or acquiring businesses outside the current products and markets. It is the **risky** quadrant: it relies on neither the company\'s successful product nor its position in established markets',
      grid: 'related or unrelated diversification' }
  };
  const ANS_KEYS = ['pen', 'pd', 'md', 'div'];
  const U_ = w => w.charAt(0).toUpperCase() + w.slice(1);
  const NEWNESS = { existing: 'existing', exist: 'existing', e: 'existing', current: 'existing', present: 'existing', old: 'existing', same: 'existing',
    new: 'new', n: 'new', modified: 'new', changed: 'new', different: 'new' };
  /** 'existing' | 'new' | '?' (a problem being asked) | null */
  function parseNewness(t) {
    const s = String(t == null ? '' : t).trim().toLowerCase();
    if (s === '?') return '?';
    return NEWNESS[s] || null;
  }
  function classifyMove(product, market) {
    const p = parseNewness(product), m = parseNewness(market);
    if (p !== 'existing' && p !== 'new') throw new Error(`Type the product as "existing" or "new" (got "${product}").`);
    if (m !== 'existing' && m !== 'new') throw new Error(`Type the market as "existing" or "new" (got "${market}").`);
    return p === 'existing' ? (m === 'existing' ? 'pen' : 'md') : (m === 'existing' ? 'pd' : 'div');
  }

  /* a bank of cases, each a move a firm makes with whether its product and market are new to that firm. ICAI's own cases carry their source */
  const CASES = [
    { id: 'sm-toothpaste', short: 'Toothpaste: brush twice a day', text: 'A leading producer of tooth paste advises its customers to brush teeth twice a day to keep breath fresh.', p: 'existing', m: 'existing', src: 'SM Test Your Knowledge, Descriptive Q4(i)', why: 'The same toothpaste is sold to the same customers; the company only wants them to use more of it (increase the frequency used).' },
    { id: 'sm-hotel', short: 'Hotel giant enters dairy', text: 'A business giant in hotel industry decides to enter into dairy business.', p: 'new', m: 'new', src: 'SM Test Your Knowledge, Descriptive Q4(ii)', why: 'Dairy products are new to a hotel company and so are dairy buyers: a new product in a new market.' },
    { id: 'sm-uv', short: 'UV maker goes abroad', text: 'One of India\'s premier utility vehicles manufacturing company ventures to foray into foreign markets.', p: 'existing', m: 'new', src: 'SM Test Your Knowledge, Descriptive Q4(iii)', why: 'The utility vehicles are the ones it already makes; the foreign markets are new to it.' },
    { id: 'sm-scooter', short: 'Auto maker: ungeared scooters', text: 'A renowned auto manufacturing company launches ungeared scooters in the market.', p: 'new', m: 'existing', src: 'SM Test Your Knowledge, Descriptive Q4(iv)', why: 'Ungeared scooters are a new product for the company, sold to the two-wheeler market it already serves.' },
    { id: 'sm-gucci-1', short: 'Gucci: new designs in Europe', text: 'Gucci, a luxury clothing brand, sells its luxury clothing in European markets with new designs.', p: 'existing', m: 'existing', src: 'Study Material 4.4.1 (example)', why: 'New designs of the same luxury clothing are not a new product line, and Europe is Gucci\'s existing market: the Study Material calls this market penetration.' },
    { id: 'sm-gucci-2', short: 'Gucci: luxury clothing in China', text: 'Gucci, a luxury clothing brand, sells its luxury clothing in Chinese markets.', p: 'existing', m: 'new', src: 'Study Material 4.4.1 (example)', why: 'The same luxury clothing goes to a market that is new to Gucci.' },
    { id: 'sm-gucci-3', short: 'Gucci: casual clothing in Europe', text: 'Gucci, a luxury clothing brand, sells casual clothing in European markets.', p: 'new', m: 'existing', src: 'Study Material 4.4.1 (example)', why: 'Casual clothing is a new product for a luxury brand, sold in its existing European market.' },
    { id: 'sm-gucci-4', short: 'Gucci: casual clothing in China', text: 'Gucci, a luxury clothing brand, sells casual clothing in Chinese markets.', p: 'new', m: 'new', src: 'Study Material 4.4.1 (example)', why: 'A new product (casual clothing) in a new market (China).' },
    { id: 'rtp-sep25-phone', short: 'Phone maker: discounts at home', text: 'A mobile phone company already has a strong customer base in its home country. To grow further, it focuses on increasing sales of its existing phones by offering promotional discounts, ramping up advertising and partnering with more local retailers for better distribution.', p: 'existing', m: 'existing', src: 'RTP September 2025 MCQ 5', why: 'Existing phones, existing home-country customers: more sales through promotion, advertising and distribution is market penetration (option (a)).' },
    { id: 'tapri-dubai', short: 'Tapri premix in Dubai', text: 'Tapri Tea Co. starts selling its existing chai premix in supermarkets in Dubai, where it has never sold before.', p: 'existing', m: 'new', why: 'The premix is unchanged; the Gulf is a new geographical market.' },
    { id: 'tapri-refill', short: 'Tapri refill-pack offer', text: 'Tapri offers its regular café customers a second kulhad chai at half price after 4 p.m. to raise the number of cups each visitor buys.', p: 'existing', m: 'existing', why: 'Same chai, same customers, more quantity used per visit.' },
    { id: 'tapri-coldbrew', short: 'Tapri cold-brew tea', text: 'Tapri launches a bottled cold-brew masala tea in its own kulhad cafés for the same young office crowd that already visits them.', p: 'new', m: 'existing', why: 'A new product for Tapri, offered to customers it already serves.' },
    { id: 'tapri-ev', short: 'Tapri builds e-scooters', text: 'Kesar announces that Tapri will build electric scooters and sell them through car dealers.', p: 'new', m: 'new', why: 'Scooters have nothing to do with tea and car-dealer buyers are not Tapri\'s customers: new product, new market.' },
    { id: 'tapri-hostel', short: 'Tapri premix for hostels', text: 'Tapri sells its present chai premix in bulk packs to college hostels and hospital canteens, institutions it has never supplied.', p: 'existing', m: 'new', why: 'The same premix reaches a new segment of buyers (institutions): market development.' }
  ];
  const CASE_BY = Object.fromEntries(CASES.map(c => [c.id, c]));

  const W = 5, H = 3.2;
  function ansoffFigure(moves, opt) {
    const o = opt || {}, show = o.show || [], items = [], blank = !!o.blank;
    ANS_KEYS.forEach(k => {
      const A = ANS[k], [ci, ri] = A.cell, x = ci * W, y = (1 - ri) * H;
      items.push({ kind: 'rect', at: [x, y], w: W, h: H, fill: blank ? 'mute' : A.color, color: 'mute', width: 1 });
      if (!blank) items.push({ kind: 'text', at: [x + 0.2, y + H - 0.36], t: A.name, anchor: 'start', size: 13.5, color: A.color });
    });
    if (o.hlCol != null) items.push({ kind: 'rect', at: [o.hlCol * W + 0.06, 0.06], w: W - 0.12, h: 2 * H - 0.12, color: 'h', dash: true, width: 2.4 });
    if (o.hlRow != null) items.push({ kind: 'rect', at: [0.06, (1 - o.hlRow) * H + 0.06], w: 2 * W - 0.12, h: H - 0.12, color: 'h', dash: true, width: 2.4 });
    if (o.hlCell) { const A = ANS[o.hlCell], [ci, ri] = A.cell; items.push({ kind: 'rect', at: [ci * W + 0.08, (1 - ri) * H + 0.08], w: W - 0.16, h: H - 0.16, color: A.color, width: 3 }); }
    items.push({ kind: 'text', at: [W / 2, 2 * H + 0.4], t: 'Existing products', size: 13 }, { kind: 'text', at: [1.5 * W, 2 * H + 0.4], t: 'New products', size: 13 });
    items.push({ kind: 'text', at: [-0.2, 1.5 * H + 0.2], t: 'Existing', anchor: 'end', size: 13 }, { kind: 'text', at: [-0.2, 1.5 * H - 0.32], t: 'markets', anchor: 'end', size: 13 },
      { kind: 'text', at: [-0.2, 0.5 * H + 0.2], t: 'New', anchor: 'end', size: 13 }, { kind: 'text', at: [-0.2, 0.5 * H - 0.32], t: 'markets', anchor: 'end', size: 13 });
    const per = {};
    show.forEach(mv => {
      const A = ANS[mv.key], [ci, ri] = A.cell, k = (per[mv.key] = (per[mv.key] || 0) + 1) - 1;
      const x = ci * W + 0.62 + (k % 5) * 0.92, y = (1 - ri) * H + H - 1.2 - Math.floor(k / 5) * 0.86;
      items.push({ kind: 'circle', c: [x, y], r: 0.34, fill: A.color, solid: true, color: A.color });
      items.push({ kind: 'text', at: [x, y], t: String(mv.n), size: 13 });
    });
    return { type: 'shapes', alt: 'Ansoff\'s product-market growth matrix: products across (existing, new), markets down (existing, new)' + (show.length ? '; moves ' + show.map(m => `${m.n} in ${ANS[m.key].name}`).join(', ') : ''), u: 34, w: 460, items };
  }
  const legend = (list, upto) => ({ type: 'table', title: 'The moves', head: ['#', 'Move', 'Product', 'Market', 'Strategy'], align: ['center', 'left', 'left', 'left', 'left'],
    rows: list.map((m, i) => (i < upto ? [String(m.n), m.name, m.p, m.m, ANS[m.key].name] : i === upto ? [String(m.n), m.name, '…', '…', '…'] : null)).filter(Boolean) });

  function computeAnsoff(v) {
    let rows = Array.isArray(v.moves) ? v.moves : [];
    const quiz = v.quiz && CASE_BY[v.quiz];
    if (quiz && rows.length === 1 && String(rows[0][1]).trim() === '?' && String(rows[0][2]).trim() === '?') rows = [[quiz.short, quiz.p, quiz.m]];
    if (!rows.length) throw new Error('Add at least one move.');
    if (rows.length > 8) throw new Error('At most 8 moves fit on the grid.');
    const list = rows.map((r, i) => {
      const name = String(r[0] == null ? '' : r[0]).trim() || 'Move ' + (i + 1);
      let key;
      try { key = classifyMove(r[1], r[2]); } catch (e) { throw new Error(`${name}: ${e.message}`); }
      return { n: i + 1, name, p: ANS[key].p, m: ANS[key].m, key, src: quiz && rows.length === 1 ? quiz : null };
    });
    const fig = o => ansoffFigure(list, o);
    const frames = [{ caption: 'Ansoff\'s product-market growth matrix asks two questions about every growth move: **is the product new to the firm, and is the market new to it?** Two answers, four cells: penetration, product development, market development, diversification. Risk grows as you move away from the top-left cell.', view: [fig({}), legend(list, -1)] }];
    const shown = [];
    list.forEach((mv, i) => {
      frames.push({ caption: `**Move ${mv.n}: ${mv.name}.** First question: is the product new to the firm? **${mv.p === 'new' ? 'Yes, it is new (or substantially modified)' : 'No, it already sells it'}**, so the move sits in the **${mv.p} products** column.`, view: [fig({ show: shown.slice(), hlCol: mv.p === 'new' ? 1 : 0 }), legend(list, i)] });
      frames.push({ caption: `Second question: is the market new to the firm? **${mv.m === 'new' ? 'Yes, new customers or a new place' : 'No, the customers it already serves'}**, so the **${mv.m} markets** row.`, view: [fig({ show: shown.slice(), hlCol: mv.p === 'new' ? 1 : 0, hlRow: mv.m === 'new' ? 1 : 0 }), legend(list, i)] });
      shown.push(mv);
      const A = ANS[mv.key], why = mv.src ? ' ' + mv.src.why : '';
      frames.push({ caption: `${mv.p === 'new' ? 'New' : 'Existing'} product + ${mv.m} market = **${A.name}**: ${A.def}.${why}`, view: [fig({ show: shown.slice(), hlCell: mv.key }), legend(list, i + 1)] });
    });
    const grid = { type: 'table', title: 'Product-market expansion grid (Study Material, Table 3)', head: ['Cell', 'Typical moves'], align: ['left', 'left'],
      rows: ANS_KEYS.map(k => [`**${ANS[k].name}**`, `${U_(ANS[k].p)} products, ${ANS[k].m} markets: ${ANS[k].grid}`]) };
    const count = k => list.filter(m => m.key === k).length;
    frames.push({ caption: `${list.length === 1 ? 'The move is' : 'All ' + list.length + ' moves are'} placed. A firm may pursue several cells at once, and shifts between them as markets change: when its present market is fully saturated it may have no choice but to pursue a new market. The grid lists the typical moves in each cell.`, view: [fig({ show: list }), grid] });
    return {
      frames, sim: { mode: 'ansoff', list },
      stats: ANS_KEYS.map(k => ({ label: ANS[k].name, value: String(count(k)), hint: (ANS[k].p === 'new' ? 'new' : 'existing') + ' products, ' + ANS[k].m + ' markets', tone: k === 'div' && count(k) ? 'warn' : '' })),
      table: { head: ['#', 'Move', 'Product', 'Market', 'Strategy'], rows: list.map(m => [String(m.n), m.name, m.p, m.m, ANS[m.key].name]) },
      note: '**Conventions.** "New" means new to this firm, not new to the world. A substantially modified product counts as a new product (product development); new designs inside the same product line do not (the Study Material\'s Gucci example of market penetration). A new segment, channel or region counts as a new market.'
    };
  }

  /* ================================================================ ADL matrix (figure on page 4.26) */
  const POS = ['dominant', 'strong', 'favourable', 'tenable', 'weak'], STAGE = ['embryonic', 'growth', 'mature', 'ageing'];
  const POS_NAME = { dominant: 'Dominant', strong: 'Strong', favourable: 'Favourable', tenable: 'Tenable', weak: 'Weak' };
  const STAGE_NAME = { embryonic: 'Embryonic', growth: 'Growth', mature: 'Mature', ageing: 'Ageing' };
  const POS_DEF = {
    dominant: 'a comparatively rare position, in many cases due to a monopoly or a strong and protected technological leadership',
    strong: 'the firm has a considerable degree of freedom over its choice of strategies and can often act without its market position being unduly threatened by its competitors',
    favourable: 'the industry is fragmented and no one competitor stands out clearly, which gives the market leaders a reasonable degree of freedom',
    tenable: 'the firm performs satisfactorily and can justify staying in the industry, but is vulnerable to increased competition from stronger and more proactive companies',
    weak: 'performance is generally unsatisfactory, although opportunities for improvement do exist'
  };
  const STAGE_DEF = {
    embryonic: 'the industry is just being born: the start of its life cycle',
    growth: 'demand for the industry\'s products expands rapidly and competition increases',
    mature: 'growth slows down and the market stabilises; competition gets tough',
    ageing: 'the industry is in decline: sales drift downward as newer products replace it'
  };
  const ADL = {
    dominant: { embryonic: ['Fast grow', 'Build barriers', 'Act offensively'], growth: ['Fast grow', 'Attend cost leadership', 'Renew', 'Defend position', 'Act offensively'],
      mature: ['Defend position', 'Attend cost leadership', 'Renew', 'Fast grow', 'Act offensively'], ageing: ['Defend position', 'Renew', 'Focus', 'Consider withdrawal'] },
    strong: { embryonic: ['Differentiate', 'Fast grow'], growth: ['Differentiate', 'Lower cost', 'Attack small firms'], mature: ['Lower cost', 'Focus', 'Differentiate', 'Grow with industry'],
      ageing: ['Find niche', 'Hold niche', 'Harvest'] },
    favourable: { embryonic: ['Differentiate', 'Focus', 'Fast grow'], growth: ['Focus', 'Differentiate', 'Defend'],
      mature: ['Focus', 'Differentiate', 'Harvest', 'Find niche', 'Hold niche', 'Turnaround', 'Grow with industry', 'Hit smaller firms'], ageing: ['Harvest', 'Turnaround'] },
    tenable: { embryonic: ['Grow with industry', 'Focus'], growth: ['Hold niche', 'Turnaround', 'Focus', 'Grow with industry', 'Withdraw'], mature: ['Turnaround', 'Hold niche', 'Retrench'],
      ageing: ['Divest', 'Retrench'] },
    weak: { embryonic: ['Find niche', 'Catch-up', 'Grow with industry'], growth: ['Turnaround', 'Retrench', 'Niche or withdraw'], mature: ['Withdraw', 'Divest'], ageing: ['Withdraw'] }
  };
  /* the figure's colours, cell by cell */
  const ADL_COLOR = {
    dominant: { embryonic: 'green', growth: 'green', mature: 'green', ageing: 'green' },
    strong: { embryonic: 'green', growth: 'green', mature: 'green', ageing: 'orange' },
    favourable: { embryonic: 'green', growth: 'green', mature: 'orange', ageing: 'red' },
    tenable: { embryonic: 'green', growth: 'orange', mature: 'red', ageing: 'red' },
    weak: { embryonic: 'orange', growth: 'red', mature: 'red', ageing: 'red' }
  };
  const ZONE = { green: { cls: 'ok', say: 'green', mean: 'the growth and defence strategies of a firm that can develop freely' },
    orange: { cls: 'hl', say: 'orange', mean: 'selective strategies: find or hold a niche, harvest, focus' },
    red: { cls: 'b', say: 'red', mean: 'turnaround, retrenchment, divestment or withdrawal' } };
  function adlCell(pos, stage) {
    if (!ADL[pos]) throw new Error('Choose a competitive position: dominant, strong, favourable, tenable or weak.');
    if (!ADL[pos][stage]) throw new Error('Choose a stage of industry maturity: embryonic, growth, mature or ageing.');
    return { pos, stage, strategies: ADL[pos][stage].slice(), color: ADL_COLOR[pos][stage] };
  }
  const cellTxt = (p, s) => ADL[p][s].join(' · ');
  function adlTable(opt) {
    const o = opt || {}, cells = {};
    const pi = o.pos ? POS.indexOf(o.pos) : -1, si = o.stage ? STAGE.indexOf(o.stage) : -1;
    if (o.col && si >= 0) POS.forEach((p, r) => (cells[r + ',' + (si + 1)] = 'd'));
    if (o.row && pi >= 0) { cells[pi + ',0'] = 'd'; STAGE.forEach((s, c) => (cells[pi + ',' + (c + 1)] = 'd')); }
    if (o.cell && pi >= 0 && si >= 0) cells[pi + ',' + (si + 1)] = ZONE[ADL_COLOR[o.pos][o.stage]].cls;
    if (o.zones) POS.forEach((p, r) => STAGE.forEach((s, c) => (cells[r + ',' + (c + 1)] = ZONE[ADL_COLOR[p][s]].cls)));
    return { type: 'table', title: 'Arthur D. Little strategic condition matrix: stage of industry maturity across, competitive position down', head: ['Position'].concat(STAGE.map(s => STAGE_NAME[s])),
      rowLabels: true, cells, rows: POS.map(p => [POS_NAME[p]].concat(STAGE.map(s => (o.blank ? '' : o.zones ? ADL_COLOR[p][s] : cellTxt(p, s))))) };
  }
  function computeADL(v) {
    const pos = String(v.pos || '').toLowerCase(), stage = String(v.stage || '').toLowerCase();
    const C = adlCell(pos, stage), unit = String(v.unit == null ? '' : v.unit).trim() || 'The business', Z = ZONE[C.color];
    const frames = [
      { caption: 'The **ADL matrix** (Arthur D. Little) is a portfolio technique based on the **product life cycle**. Across: the **stage of industry maturity**, an environmental measure (embryonic, growth, mature, ageing). Down: the firm\'s **competitive position**, a measure of business strength (dominant, strong, favourable, tenable, weak). A four by five matrix: 20 cells, each with its own strategies.', view: [adlTable({})] },
      { caption: `**${unit}**: the industry is **${STAGE_NAME[stage].toLowerCase()}** (${STAGE_DEF[stage]}), so read the **${STAGE_NAME[stage]}** column.`, view: [adlTable({ col: true, stage })] },
      { caption: `Its competitive position is **${POS_NAME[pos].toLowerCase()}**: ${POS_DEF[pos]}. So read the **${POS_NAME[pos]}** row.`, view: [adlTable({ row: true, pos, stage })] },
      { caption: `Where the row meets the column: **${POS_NAME[pos]} × ${STAGE_NAME[stage]}**. The strategies the Study Material gives for this cell are: **${C.strategies.join(', ')}**.`, view: [adlTable({ cell: true, pos, stage })] },
      { caption: `The figure colours this cell **${Z.say}**: ${Z.mean}. Strategy options open widely in the top-left (a dominant firm in a young industry) and close towards the bottom-right (a weak firm in an ageing industry, where the only strategy is to withdraw).`,
        view: [{ type: 'table', title: `${unit}: ${POS_NAME[pos]} position, ${STAGE_NAME[stage].toLowerCase()} industry`, head: ['#', 'Strategy option (Study Material)'], align: ['center', 'left'], rows: C.strategies.map((s, i) => [String(i + 1), s]) }, adlTable({ cell: true, pos, stage })] }
    ];
    return {
      frames, sim: { mode: 'adl', cell: C, unit },
      stats: [{ label: 'Competitive position', value: POS_NAME[pos], hint: POS_DEF[pos] }, { label: 'Industry maturity', value: STAGE_NAME[stage], hint: STAGE_DEF[stage] },
        { label: 'Strategy options', value: String(C.strategies.length), hint: C.strategies.join(', ') }, { label: 'Colour in the figure', value: Z.say, hint: Z.mean, tone: C.color === 'green' ? 'ok' : C.color === 'red' ? 'bad' : 'warn' }],
      table: { head: ['Competitive position', 'Stage of industry maturity', 'Strategies (Study Material figure)'], rows: [[POS_NAME[pos], STAGE_NAME[stage], C.strategies.join(', ')]] },
      note: '**Conventions.** The strategies and colours are those of the ADL figure in the Study Material (page 4.26); the figure does not name its colours. The stage of industry maturity follows the product life cycle (introduction, growth, maturity, decline), named embryonic, growth, mature and ageing in the matrix.'
    };
  }

  function compute(v) {
    const r = v.mode === 'adl' ? computeADL(v) : computeAnsoff(v);
    lastMode = v.mode === 'adl' ? 'adl' : 'ansoff';
    return r;
  }

  /* ================================================================ presets and the challenge */
  const SM_Q4 = CASES.slice(0, 4).map(c => [c.short, c.p, c.m]);
  const TAPRI_MOVES = ['tapri-refill', 'tapri-dubai', 'tapri-coldbrew', 'tapri-ev', 'tapri-hostel'].map(id => [CASE_BY[id].short, CASE_BY[id].p, CASE_BY[id].m]);
  const presets = [
    { label: 'Tapri\'s five growth moves', values: { mode: 'ansoff', moves: TAPRI_MOVES } },
    { label: 'SM Test Your Knowledge, Descriptive Q4 · the four growth cases (toothpaste, hotel, utility vehicles, scooters)', values: { mode: 'ansoff', moves: SM_Q4 } },
    { label: 'Study Material 4.4.1 · Gucci in four cells', values: { mode: 'ansoff', moves: CASES.slice(4, 8).map(c => [c.short, c.p, c.m]) } },
    { label: 'RTP September 2025 MCQ 5 · a phone maker grows in its home country', values: { mode: 'ansoff', moves: [[CASE_BY['rtp-sep25-phone'].short, 'existing', 'existing']] } },
    { label: 'PYQ September 2025 MCQ 14 · Bio Cure: a leading position in a maturing diagnostics industry', values: { mode: 'adl', unit: 'Bio Cure', pos: 'strong', stage: 'mature' } },
    { label: 'MTP May 2026 Series II · InnovateCo\'s EV division, "Dominant" under ADL', values: { mode: 'adl', unit: 'InnovateCo EV division', pos: 'dominant', stage: 'growth' } },
    { label: 'Tapri\'s samosa factory: tenable in an ageing frozen-snacks line', values: { mode: 'adl', unit: 'Samosa factory', pos: 'tenable', stage: 'ageing' } },
    { label: 'Tapri\'s kulhad cafés: favourable in a growing café industry', values: { mode: 'adl', unit: 'Kulhad cafés', pos: 'favourable', stage: 'growth' } }
  ];

  const ALL_STRATS = Array.from(new Set(POS.flatMap(p => STAGE.flatMap(s => ADL[p][s]))));
  /* strategies close enough in meaning that one cannot be the wrong answer when the other is in the cell */
  const KIN = [['Withdraw', 'Niche or withdraw', 'Consider withdrawal'], ['Defend', 'Defend position'], ['Find niche', 'Hold niche', 'Niche or withdraw', 'Focus'],
    ['Lower cost', 'Attend cost leadership'], ['Attack small firms', 'Hit smaller firms'], ['Divest', 'Retrench', 'Withdraw']];
  const kin = (a, b) => a === b || KIN.some(k => k.includes(a) && k.includes(b));
  const clearlyNot = cell => ALL_STRATS.filter(s => !cell.some(c => kin(c, s)));
  const ADL_CASES = [
    { id: 'biocure', text: 'Bio Cure is a pioneer in low-cost rapid diagnostic kits and commands strong brand loyalty in Tier-2 and Tier-3 cities. It holds a leading competitive position, thanks to its proprietary technology and wide distribution network. However, the rapid diagnostic industry is maturing, with new regulations, consolidation and slowing growth rates.', pos: 'strong', stage: 'mature', src: 'PYQ September 2025 MCQ 14' },
    { id: 'tapri-samosa', text: 'Tapri\'s frozen-samosa line performs satisfactorily and can justify staying in the business, but bigger snack companies are squeezing it, and frozen-snack sales have been falling for three years as air-fryer brands replace them.', pos: 'tenable', stage: 'ageing' },
    { id: 'monopoly-grid', text: 'PowerGrid Labs holds the only licence and the patents for a new grid-scale battery technology that the industry has only just started to use.', pos: 'dominant', stage: 'embryonic' }
  ];
  const pick = (r, a) => a[Math.floor(r() * a.length) % a.length];
  const shuffle = (r, a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)) % (i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const challenge = {
    title: 'Name the strategy',
    gen(r) {
      if (lastMode === 'adl') {
        if (r() < 0.3) {
          const c = pick(r, ADL_CASES), wrong = shuffle(r, POS.flatMap(p => STAGE.map(s => [p, s])).filter(([p, s]) => !(p === c.pos && s === c.stage))).slice(0, 3);
          const opts = shuffle(r, [[c.pos, c.stage]].concat(wrong)).map(([p, s]) => `${POS_NAME[p]} position, ${STAGE_NAME[s].toLowerCase()} industry`);
          return { mode: 'adl', unit: 'The firm', pos: c.pos, stage: c.stage, ask: 'cell', adlCase: c.id, opts };
        }
        const pos = pick(r, POS), stage = pick(r, STAGE), inCell = ADL[pos][stage];
        const right = pick(r, inCell), wrong = shuffle(r, clearlyNot(inCell)).slice(0, 3);
        return { mode: 'adl', unit: 'The firm', pos, stage, ask: 'strategy', opts: shuffle(r, [right].concat(wrong)) };
      }
      const c = pick(r, CASES);
      return { mode: 'ansoff', quiz: c.id, moves: [[c.short, '?', '?']] };
    },
    prompt(v, res) {
      if (res.sim.mode === 'adl') {
        if (v.ask === 'cell') { const c = ADL_CASES.find(x => x.id === v.adlCase); return `${c.text} Where is the firm placed on the ADL matrix?`; }
        return `A firm's competitive position is **${POS_NAME[v.pos].toLowerCase()}** (${POS_DEF[v.pos]}) and its industry is **${STAGE_NAME[v.stage].toLowerCase()}**. Which of these is one of the strategies the ADL matrix gives for that cell?`;
      }
      const c = CASE_BY[v.quiz];
      return `${c.text} Which growth strategy of Ansoff's matrix is this?`;
    },
    solve(res, v) {
      if (res.sim.mode === 'adl') {
        const C = res.sim.cell;
        if (v.ask === 'cell') return `${POS_NAME[C.pos]} position, ${STAGE_NAME[C.stage].toLowerCase()} industry`;
        return (v.opts || []).find(o => C.strategies.includes(o));
      }
      return ANS[res.sim.list[0].key].name;
    },
    kind: 'choice',
    choices: (v, res) => (res && res.sim.mode === 'adl' ? v.opts : ANS_KEYS.map(k => ANS[k].name)),
    view(res, v) {
      if (res.sim.mode === 'adl') return [adlTable({ blank: true })];
      return [ansoffFigure([], { blank: true })];
    },
    explain(res, v) {
      if (res.sim.mode === 'adl') {
        const C = res.sim.cell;
        return `${POS_NAME[C.pos]} × ${STAGE_NAME[C.stage]}: the Study Material's cell lists **${C.strategies.join(', ')}**.${v.ask === 'cell' ? ' ' + 'The position is read from the firm\'s strength (' + POS_DEF[C.pos] + '); the column from the industry (' + STAGE_DEF[C.stage] + ').' : ''}`;
      }
      const c = CASE_BY[v.quiz], A = ANS[res.sim.list[0].key];
      return `Product: **${c.p}**; market: **${c.m}**. So it is **${A.name}**. ${c.why}${c.src ? ` (${c.src}.)` : ''}`;
    }
  };

  const def = {
    id: 'ansoff-adl', title: 'Ansoff and ADL Lab',
    blurb: 'Place growth moves on Ansoff\'s grid and find the ADL strategies for a competitive position and industry stage.',
    controls: [
      { id: 'mode', type: 'seg', label: 'Matrix', value: 'ansoff', options: [['ansoff', 'Ansoff growth grid'], ['adl', 'ADL matrix']] },
      { id: 'moves', type: 'table', label: 'Growth moves (product and market: existing or new to the firm)', short: 'Moves', max: 8, rows: TAPRI_MOVES, show: v => v.mode !== 'adl',
        cols: [{ id: 'move', label: 'Move', type: 'text', auto: n => 'Move ' + (n + 1) }, { id: 'p', label: 'Product', type: 'text', auto: () => 'existing' }, { id: 'm', label: 'Market', type: 'text', auto: () => 'new' }],
        help: 'For each move, type whether the product is "existing" or "new" to the firm, and whether the market is "existing" or "new" to it.' },
      { id: 'unit', type: 'text', label: 'Business', value: 'Kulhad cafés', show: v => v.mode === 'adl' },
      { id: 'pos', type: 'select', label: 'Competitive position', value: 'favourable', options: POS.map(p => [p, POS_NAME[p]]), show: v => v.mode === 'adl', help: 'Dominant is rare (a monopoly or protected technology); weak means unsatisfactory performance with room to improve.' },
      { id: 'stage', type: 'select', label: 'Stage of industry maturity', value: 'growth', options: STAGE.map(s => [s, STAGE_NAME[s]]), show: v => v.mode === 'adl' }
    ],
    presets, compute, challenge
  };
  if (GA.lab) GA.lab.register(def);
  if (typeof module !== 'undefined' && module.exports) module.exports = { classifyMove, parseNewness, adlCell, compute, def, ANS, ADL, ADL_COLOR, CASES, ADL_CASES, POS, STAGE, kin };
  g.__lab_def_ansoff_adl = def;
})(typeof window !== 'undefined' ? window : globalThis);
