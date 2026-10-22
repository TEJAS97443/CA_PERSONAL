# lab-c5 report: CVP Lab (`cvp`) and Key Factor Lab (`key-factor`)

Both labs are built, tested and marked **ready** in content/labs.json (set through tools/lab_status.py; topics `cma.mc`, plus a
`subtopics` list from LABS.md). `build.py --check` and `build.py` pass.

Files: `app/js/labs/cvp.js`, `app/js/labs/key-factor.js`, `tests/lab-cvp.test.js` (34 tests), `tests/lab-key-factor.test.js` (18 tests),
and two CSS blocks in `app/css/labs.css` (`/* lab: cvp */`, `/* lab: key-factor */`). These blocks give the input tables' name columns
room, and let the six-column tables scroll sideways. No script list needed changing: labs load on demand.

## CVP Lab (`cvp`)

**What it does.** Three modes, picked with the first control `mode`:

1. **`bep`, break-even for one product.**
   - Pick a chart: break-even, contribution break-even or P/V.
   - Frames draw it one feature at a time: sales line → fixed-cost (or variable-cost) line → total-cost line → BEP → loss and profit
     areas → angle of incidence (a θ wedge) → margin-of-safety arrow → cash BEP → target-profit point.
   - The P/V chart has sales in ₹ on the x-axis, so the slope of its profit line is the P/V ratio.
   - Four what-if sliders change price, VC, fixed cost and volume by %. The old lines stay dashed, and a Before / After / Change table
     is shown.
   - Target profit can be ₹ or % of sales, before or after tax.
2. **`multi`, sales mix.**
   - The mix can be in units or in sales value.
   - Each product's row is added one at a time, then the composite contribution per unit and per batch (or the composite P/V ratio).
   - The composite BEP is split by product, then a check row shows contribution at BEP = fixed cost.
   - With expected sales, it draws the SM Illustration 6 profit graph: products in descending P/V order, with the dashed line for
     the whole mix.
3. **`absorb`, marginal vs absorption profit.**
   - Up to 6 periods, with opening stock and FIFO stock layers.
   - The absorption rate is set on normal capacity (with under/over-absorption) or on actual output.
   - For each period:
     - stock movement;
     - the ICAI absorption income statement, built line by line;
     - the marginal statement;
     - the reconciliation.
   - A summary bar chart and table close the mode.

**Controls.**
- `bep`: `chart`, `price`, `vc`, `fixed`, `dep` (non-cash), `units`, `uname`, `target`, `tkind`, `tax`, `dPrice`, `dVc`, `dFixed`, `dUnits`.
- `multi`: `mfixed`, `basis`, `mixProducts` table, `mixUnits` / `mixValue`.
- `absorb`: `aprice`, `vcp`, `vcs`, `fop`, `basisA`, `normal`, `fos`, `open`, `absPeriods` table.

**Presets (18).**
- Tapri lesson examples: premix break-even; the premix / chai / samosa mix; the samosa factory over four quarters; a premix case with
  opening stock and the rate on actual output.
- Study Material: Ex 3 ABC Ltd; Illus 1 MNP cash BEP; Illus 2 (P/V chart); Problem 20 Prisha Ltd; Illus 14 Wonder Ltd ZEST.
- ICAI papers:
  - PYQ Sep 2025 Case Scenario II (JMS Ltd).
  - RTP May 2024 Q11 (A Ltd).
  - RTP May 2025 Q18 (Gourmet: after-tax target, then the price-cut plan on the sliders).
  - RTP May 2025 Q7 (PR Ltd pens, batches).
  - RTP Sep 2024 Q17(ii) (RS Ltd).
  - RTP Sep 2026 Q15 (XYX Ltd, existing and proposed mix).
  - MTP May 2025 S1 Q5(a) (RN Ltd).
  - MTP May 2024 S1 Q4(a) (AB Ltd, three months).

**Tests (34): what they check.**
- **Study Material illustrations:** Ex 3, Illus 1, 2, 3, 5, 7, 8, 11(i)/(ii), Ex 4, Illus 6, Illus 14, and Problems 13, 16, 17 and 20.
- **ICAI answers, matched exactly:**
  - JMS Ltd: BES ₹19,50,000 and ₹1,15,200 (MCQ options D and A).
  - Gourmet: 61,539 and 80,769 cartons, and ₹16,000.
  - PR Ltd pens: 800 batches = 4,000 + 2,400.
  - RS Ltd: 64,000 units = 40,000 + 24,000.
  - XYX Ltd: 47% / ₹3,82,979 / ₹1,02,000, and 50% / ₹3,60,000 / ₹1,40,000.
  - RN Ltd: ₹2,20,000 and ₹1,54,000.
  - AB Ltd: absorption profits 22,59,000 / 24,10,000 / 29,19,000 and marginal profits 22,19,000 / 24,20,000 / 28,89,000.
  - RTP Sep 2025 Q6.
- **RTP May 2024 Q11 does not match ICAI to the rupee.** The lab gives BES ₹6,90,941, while ICAI prints ₹6,90,882 because it rounds the
  P/V ratio to 53.41%. The test documents this (the lab is within 0.01%).
- **Identities on random inputs:**
  - 3,000 products: profit = MoS × P/V; BES × P/V = F; target sales reach the target, including % targets with tax.
  - 2,000 mixes: contribution at BEP = F; profit = MoS × P/V.
  - 2,000 absorption runs: the difference equals the change in fixed overhead held in stock, every period and in total.
- **Other checks:** bad inputs give clear errors; every preset renders all its frames within 120.

## Key Factor Lab (`key-factor`)

**What it does.** Three modes:

1. **`mix`, product mix under one key factor.**
   - Columns are added one per frame: contribution per unit → key factor for full demand (is it really limiting?) → contribution per
     unit of the key factor → rank.
   - Minimum commitments are filled first. Then each product takes the key factor in rank order. A horizontal bar of the key factor
     fills up, beside an allocation table. Part units are dropped, as ICAI does.
   - The last frame is a profit statement in rank order. It also says how much ranking by contribution per unit would lose (₹56,000
     in the Tapri example; ₹4,50,000 for N.P. Ltd).
2. **`makebuy`, make or buy.**
   - The relevant cost of making is variable cost plus any fixed cost that making adds. The saving per unit of the key factor sets the
     rank.
   - Parts that cannot be bought (buy price 0) are made first. The parts that remain are made in rank order.
   - A fixed cost of making is checked exactly over every choice of parts to make, and the indifference quantity is shown.
   - The last frame is a cost-of-plan table, with the saving against buying everything.
3. **`shutdown`, shut down or continue.**
   - A continue-vs-shut statement built line by line, then the decision.
   - Two lines on a chart cross at the shut-down point, also shown as % of capacity.

**Controls.**
- `mix`: `kfName`, `avail`, `kfProducts` table (Name, Price, VC, KF, Max, Min), `fixed`, `whole`.
- `makebuy`: `kfName`, `kfParts` table (Name, Need, VC, Buy, KF, Fixed), `bavail` (0 = no limit), `whole`.
- `shutdown`: `sprice`, `svc`, `sunits`, `suname`, `cap`, `sfixed`, `keep`, `extra`.

**Presets (13).**
- Tapri lesson examples: kiln, samosa factory, café.
- Study Material: Problem 9(iii) Mr. X.
- ICAI papers:
  - RTP Sep 2025 Q16 (N.P. Ltd).
  - PYQ Sep 2025 Q3(b) (SM Ltd).
  - PYQ May 2023 old scheme Q4(c) (MNP Co.).
  - PYQ Nov 2022 old scheme Q4(a) (crops on hectares, with minimum areas).
  - MTP Sep 2025 S1 Q4(a) (Apex Electronics).
  - MTP Nov 2023 S2 old scheme Q5(b) (P, Q, R, S).
  - RTP Jan 2026 Q17 (Jupiter Ltd EXE cans).
  - PYQ Nov 2023 old scheme Q4(b) (R Ltd Noida).
  - MTP Nov 2023 S2 old scheme Q1(b) (T Ltd).

**Tests (18): what they check.** Every figure of those answers is checked exactly:
- **N.P. Ltd:** Q 1,00,000 + P 30,000; ₹21,10,000 / ₹11,50,000.
- **SM Ltd:** ₹35,90,000 / ₹29,90,000.
- **MNP Co.:** ₹2,85,000.
- **Crops:** 150 / 50 / 10 ha; ₹25,75,000 / ₹4,30,000.
- **SM Illus 12:** 6,666 units and ₹1,79,982 vs ₹1,62,500.
- **Apex:** make 3,333 and buy 667, as in the answer.
- **P, Q, R, S:** buy 36,200 of R; contribution ₹66,14,760; profit ₹19,30,760.
- **EXE cans:** ₹0.6375 a can, ₹95,625; buy 25,000 or 75,000; making pays above 2,00,000 extra cans.
- **Shut-down points:** 75,000 units; 1,02,500 units (86.32%); ₹1,37,500.

Brute force:
- 3,000 random mixes are compared with an independent LP solved by vertex enumeration, plus exhaustive integer search on small cases.
- 3,000 random make-or-buy problems are compared with an independent search over every vertex, fixed costs included.
- 5,000 random plants are checked for equal results at the shut-down point, and for a decision that flips across it.

## Screenshots checked

- Both labs: desktop 1440 light and dark, and phone 390, in every mode.
- Lesson-embed (compact) previews, rendered from a scratch page in $TMPDIR.

Fixes made after looking at them:
- point labels moved so they don't overlap;
- the mode control is a select, because seg labels were cut off;
- each mode has its own price and fixed-cost fields (the shared defaults gave odd numbers);
- shorter result tiles;
- a three-column profit statement, so the totals stay visible on phones;
- the input tables scroll sideways instead of cutting numbers off.

## Recommended embeds (not added; for the later embed job)

- **cma.mc.basics**, section on contribution and the P/V ratio:
  `::: lab cvp {"mode":"bep","price":100,"vc":60,"fixed":200000,"units":8000,"uname":"boxes","target":0}`
- **cma.mc.bep**, section on BEP, margin of safety and target profit:
  `::: lab cvp {"mode":"bep","price":100,"vc":60,"fixed":200000,"units":8000,"uname":"boxes","target":100000}`
- **cma.mc.bep**, what-if / sensitivity section:
  `::: lab cvp {"mode":"bep","price":24,"vc":11,"fixed":800000,"units":70000,"uname":"cartons","target":0,"dPrice":-6.25,"dFixed":18.75,"dUnits":20}`
- **cma.mc.charts**, break-even chart / angle of incidence section:
  `::: lab cvp {"mode":"bep","chart":"be","price":500,"vc":300,"fixed":200000,"units":1700,"uname":"units","target":0}`
- **cma.mc.charts**, contribution chart section: the same with `"chart":"contrib"`.
- **cma.mc.charts**, P/V chart section: `::: lab cvp {"mode":"bep","chart":"pv","price":30,"vc":15,"fixed":150000,"units":0,"uname":"units","target":20000}`
- **cma.mc.multiproduct**, composite BEP section: `::: lab cvp {"mode":"multi"}`
- **cma.mc.multiproduct**, value-mix section:
  `::: lab cvp {"mode":"multi","basis":"value","mfixed":180000,"mixProducts":[["A",30,15,35],["B",40,20,35],["C",20,12,30]],"mixValue":600000}`
- **cma.mc.absorb**, profit difference section:
  `::: lab cvp {"mode":"absorb","absPeriods":[["Q1",12000,9000],["Q2",9000,11000]]}`
- **cma.mc.absorb**, reconciliation section:
  `::: lab cvp {"mode":"absorb","aprice":2000,"vcp":800,"vcs":400,"fop":40000,"normal":200,"fos":60000,"absPeriods":[["Quarter 1",220,160]]}`
- **cma.mc.keyfactor**, ranking and product mix section: `::: lab key-factor {"mode":"mix"}`
- **cma.mc.keyfactor**, minimum commitments: the crops data,
  `::: lab key-factor {"mode":"mix","kfName":"hectares","avail":210,"fixed":2145000,"kfProducts":[["Wheat",40000,28000,1,160,100],["Rice",20000,6500,1,50,40],["Maize",25000,15000,1,60,10]]}`
- **cma.mc.decisions**, make or buy section: `::: lab key-factor {"mode":"makebuy","kfName":"oven hours"}`
- **cma.mc.decisions**, shut down section: `::: lab key-factor {"mode":"shutdown"}`

## Framework gaps hit

1. **Narrow table controls.** Table controls have no per-column width or minimum-width hint, so tables with six or more columns cut
   their numbers off in the 280 px inputs column. I worked around this with lab-scoped CSS keyed on unique control ids, as the
   process and leverage labs do.
2. **Seg controls don't wrap.** A seg control cuts off long option labels instead of wrapping them. I used a select instead.
3. **No free-standing plot text.** Plot specs can't place text on their own, so labels sit on region centroids. I used an unfilled,
   zero-area region to place the "profit" label.
4. **Results tables are plain text.** They escape their cells, so they can't show markdown bold for subtotal rows.
5. **No embed preview route.** The app has no route that shows a compact embed outside a lesson, so I checked embeds on a scratch
   page in $TMPDIR.

**Sources.** The old-scheme papers in ~/CA_PERSONAL/ca_sources/q/old/p3 are PDFs only; I read them as text extracted into $TMPDIR, with PyMuPDF
run with -I.

**Shared tests owned by other labs.** At my last run, `labs-presets` had a blurb-length failure that belongs to the `npa` lab (earlier
it was `dividend`). Earlier, `dividend` and `leverage` also had answer-leak failures. None of these involve cvp or key-factor.
