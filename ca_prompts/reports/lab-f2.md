# lab-f2 report: leverage, cap-structure, working-capital, ratios

All four labs are built, tested and marked **ready** in content/labs.json (changed through tools/lab_status.py only).
- Shared lab tests: `node tests/run.js labs-` → 128 passed, 0 failed.
- `build.py --check` passes, and `build.py` has written data/.
- The full suite has one failure, `insights.test.js` ("no global hook"). It is not a lab test and none of these files are involved.

I built leverage, working-capital and ratios myself. A fork built cap-structure; a second fork could not start (subagent limit).
- Blurbs: leverage 115, cap-structure 114, working-capital 114 and ratios 112 characters, all within the 120-character limit.
- The ratios lab was developed in $TMPDIR and copied into the repo only once its tests passed, as the lead asked.

Viewing tools (in $TMPDIR/labtools, not in the repo):
- `frames.js` renders any frame of a lab to HTML.
- `embed.js` mounts compact lesson embeds on a scratch page.
- `shoot.sh` screenshots either of them.

---

## 1. leverage — Leverage and EBIT-EPS Lab (fm.lev, fm.cs)

**What it does.** The first control has two modes.
- **Leverages.** The ICAI profitability statement is built one line per frame: sales → VC → contribution → fixed cost → EBIT → interest → EBT → tax → PAT → [preference dividend → earnings] → shares → EPS. Then:
  - DOL = C ÷ EBIT, with margin of safety = 1 ÷ DOL.
  - The SM's DOL curve (undefined at break-even sales, negative below it).
  - DFL = EBIT ÷ [EBT − Dp ÷ (1 − t)].
  - The SM's DFL curve with the financial break-even point.
  - DCL = DOL × DFL.
  - A % change in sales is passed down to EBIT and then EPS as growing bars, and the statement is redone at the new sales to check it.
- **EBIT-EPS plans.** For 2–4 financing plans on top of an existing structure:
  - The EPS table is filled row by row: interest, tax, preference dividend, shares = existing + amount ÷ issue price, EPS, MPS = EPS × P/E, financial BEP.
  - The EBIT-EPS chart is drawn one line per frame, each line starting at its financial BEP.
  - Every pair's indifference point is marked (none when both plans have the same number of shares; any EBIT when the plans are identical).
  - It ends with the best plan on EPS and on MPS.

**Controls:**
- Mode; sales given as units × price or as a total with VC %; fixed cost; debt and rate; preference capital and rate; shares; tax.
- Change in sales to test.
- Existing shares, debt and preference; expected EBIT; a plans table (equity ₹, issue price, debt ₹, rate, preference ₹, rate, P/E).

**Presets (10):**
- ICAI questions: PYQ Jan 2025 Q1(b) (EXIM Ltd); PYQ May 2024 Q1(b) (Alpha Ltd, sales fall 15%); PYQ Jan 2025 MCQs 1–5 (Coral Ltd); MTP May 2025 Series I Q3(a) (Perfact Ltd).
- Study Material Illustrations 3 and 11.
- Four Tapri Tea Co. presets: the premix line (the default), a bad year below break-even, with preference shares, and three ways to fund cafés (EPS against MPS).

**Tests (29, `tests/lab-leverage.test.js`)**
- **Study Material ch. 6:** Examples 1 and 2; the no-fixed-cost, positive-leverage and DFL situations; Illustrations 1–5; Practical Problem 1; DFL with preference dividend.
- **ICAI answers:** EXIM (EPS ₹136.5, DOL 1.363, DFL 1.128, DCL 1.538); Alpha (EPS 604 → 424 / 364, −29.80% / −39.73%, DOL 1.875 / 2.22 / 2.40); Coral (all five MCQ keys: 3.90 / 4.10, 46.80 / 61.50, ₹13,60,000 / ₹15,08,571, ₹34,40,000, ₹1.30); Perfact (₹5,98,000, ₹1,26,000, ₹2,04,666).
- **SM ch. 5:** Illustrations 11 and 12; answers to Practical Problems 1, 3, 4, 5 and 6 (indifference points, financial BEPs, "no indifference point" between B and C).
- **Random checks:** 3,000 statements (%ΔEBIT = DOL × %Δsales and %ΔEPS = DCL × %Δsales exactly, DCL = DOL × DFL, MOS = 1/DOL); 2,000 plan pairs (EPS is 0 at the financial BEP, the EPS are equal at the indifference point, a brute-force scan finds the crossing there, and the plan with fewer shares wins above it).
- **Page and challenge:** frames and labels; plain-language errors; 400 challenge problems per mode.

**Challenge.** It asks DOL, DFL, DCL, EPS, the % change in EBIT or EPS, the indifference EBIT, a plan's EPS or its financial BEP.
- Numbers are generated so that leverages end in at most three decimals.
- Rupee answers are asked in ₹ lakh, to two decimals.
- In the test state the picture is the empty statement, never a computed amount.

**Screenshots checked:**
- `/tmp/leverage.png`, `-d.png`, `-m.png`.
- `/tmp/leverage-e.png` and `-ed.png` (EBIT-EPS mode, light and dark), `-em.png` (EBIT-EPS on a phone).
- Frames `/tmp/lev-f.png`, `/tmp/lev-e*.png`; embeds `/tmp/lev-embed.png`.

**Fixes made from the screenshots:**
- Overlapping BEP labels and three plans crossing at a single point (the Tapri plan rates were changed).
- Phone tick labels on the bar chart.
- The squashed 8-column plans table: added a `/* lab: leverage */` CSS block (min-width + sideways scroll).
- Six tiles wrapping onto a second row.
- The answer views now come first so lesson embeds show them.

**Recommended embeds:**
- fm.lev.leverage, "How it works" (after DOL / DFL / DCL are defined):
```
::: lab leverage {"mode":"lev","change":10}
:::
```
- fm.lev.leverage, "Exam angle" (PYQ Jan 2025 Q1(b)):
```
::: lab leverage {"mode":"lev","change":0,"pref":0,"prate":0,"firm":"EXIM Ltd","input":"total","sales":20000000,"vcr":70,"fixed":1600000,"debt":4000000,"rate":12.5,"tax":30,"shares":20000}
:::
```
- fm.lev.leverage, "Worked examples" (PYQ May 2024 Q1(b), sales fall 15%):
```
::: lab leverage {"mode":"lev","change":-15,"pref":0,"prate":0,"firm":"Alpha Ltd","input":"unit","units":5000000,"price":20,"vcu":12.5,"fixed":17500000,"debt":7500000,"rate":15,"tax":20,"shares":25000}
:::
```
- fm.cs.ebiteps, "How it works" (PYQ Jan 2025 MCQs 1–5):
```
::: lab leverage {"mode":"ebiteps","xpref":0,"xprate":0,"xshares":1000000,"xdebt":3000000,"xrate":15,"tax":30,"ebit":7600000,"plans":[["Plan I",3000000,25,7000000,13,0,0,12],["Plan II",1000000,25,5000000,13,4000000,7.15,15]]}
:::
```
- fm.cs.ebiteps, "Under the hood" or "Worked examples" (EPS against MPS):
```
::: lab leverage {"mode":"ebiteps","xpref":0,"xprate":0,"xshares":1000000,"xdebt":10000000,"xrate":10,"tax":25,"ebit":12000000,"plans":[["All equity",20000000,50,0,0,0,0,16],["Half and half",10000000,50,10000000,11,0,0,15],["All debt",0,50,20000000,13,0,0,12]]}
:::
```

---

## 2. cap-structure — Capital Structure Theories Lab (fm.cs), built by the fork

**What it does.** Six modes: NI, NOI, Traditional, MM 1958, MM 1963 (with tax), Arbitrage.
- NI, NOI and both MM modes build the working line by line, then vary D/V from 0 to 80%, one level per frame, plotting Ke, Kd, Ko and V with captions.
- Traditional works down a debt / Kd / Ke schedule, on market values or book weights, and marks the optimum. A switch can compare it with MM's Ke.
- Arbitrage animates sell → borrow or lend in proportion → buy → income → gain, in ICAI's two variants ("invests all" and "keeps the income").

**Presets (19):**
- ICAI questions: PYQ May 2024 Q2(b) (both methods); RTP May 2024 Q3 (= MTP Sep 2026 Series I Q1(a)); PYQ May 2025 Q3(b); RTP May 2026 Q6(a) and (b) (= RTP Sep 2024 Q7); RTP Sep 2024 Q6; MTP May 2025 Series II Q2(b).
- Study Material: Illustrations 1, 3, 4, 5, 8, 9, 10 and Practical Problems 7 and 9.
- Two Tapri presets.

**Tests (31).**
- Study Material Illustrations 1–10 and the ICAI answers above (for example ₹405 gain and ₹3,240 surplus; ₹1,490 lakh, 19.06%, 16.91%).
- Two places where ICAI's printed figure rounds parts are allowed for.
- Random checks (10,000+): NOI and MM keep V and Ko flat; VL = Vu + tD; the arbitrage gain is ≥ 0 and matches its closed form; the traditional optimum matches a brute-force minimum.
- 150 problems per mode.

**Screenshots:** `/tmp/cap-structure*.png`, including arbitrage, tax, traditional, phone and three compact embeds.

**Recommended embeds (fm.cs.theories, one per theory section):**
- `::: lab cap-structure {"mode":"ni","ebit":500000,"kd":10,"ke":16,"debt":2000000}`
- `::: lab cap-structure {"mode":"noi","ebit":500000,"kd":10,"ko":15,"debt":1500000}`
- `::: lab cap-structure {"mode":"trad","basis":"book","ebit":500000,"cap":5000000,"mmcmp":true,"sched":[[0,0,10],[500000,6,10.5],[1000000,6,11],[1500000,6.2,11.3],[2000000,7,12.4],[2500000,7.5,13.5],[3000000,8,16]]}`
- `::: lab cap-structure {"mode":"mm","ebit":1800000,"kd":12,"ko":18,"debt":5400000}`
- `::: lab cap-structure {"mode":"mmtax","unit":"lakh","start":"vu","vu":1400,"keu":18,"kd":12,"tax":30,"debt":300}`
- `::: lab cap-structure {"mode":"arb","ebit":25000,"debtLev":75000,"kd":8,"keLev":12.5,"keUnlev":12.5,"hold":12,"switch":"all"}`

Each one is followed by a closing `:::` line.

---

## 3. working-capital — Working Capital Lab (fm.wc)

**What it does.** Four modes, chosen in a select.
- **Operating cycle.** A cycle diagram opens it. Each stage then adds one Gantt block and one formula row: R = average stock ÷ daily consumption, W, F, D, C. Averages are (opening + closing) ÷ 2, or days are used as given. Then come the net cycle R + W + F + D − C (a "cash tied up" lane), the number of cycles, and working capital = annual operating cost ÷ cycles, with an optional contingency. ICAI rounding is a toggle: whole days, cycles to two decimals.
- **WC estimate.** The SM statement is filled line by line, each with its working (amount × period ÷ 12 / 52 / 360): RM; WIP (full material plus x% of conversion cost); FG; debtors; prepaid; cash → gross WC; creditors; wages, overheads, admin and selling payable → NWC; safety margin (on NWC, or grossed up on the final requirement) → requirement. Notes:
  - The basis is total cost, cash cost (depreciation excluded) or debtors at selling price. A closing table compares all three bases.
  - Amounts can be per unit times the units a year, and periods can be in months, weeks or days.
- **Credit policy.** The SM total-approach or incremental-approach table is filled one policy column per frame (bad debts, discount, tax, investment = cost × days ÷ 360, extra supplier credit, opportunity cost, net benefit), with a "gain over present" bar chart and a recommendation.
- **Cash models.** Baumol: the transaction, carrying and total cost curves, then C* = √(2UP ÷ S), and U worked back from a known C*. Then Miller-Orr is run on seeded made-up daily flows: invest h − z at the upper limit, sell back to z at the lower limit. It is **labelled illustrative**, because SM §11.2 gives the rule but no formula for the limits.

**Presets (16):**
- Operating cycle: SM Illustration 2; PYQ Sep 2024 Q1(b) (SK Ltd); MTP Sep 2025 Series I Q1(c) (Wint Ltd); a Tapri preset.
- WC estimate: SM Illustration 3 (Naureen); SM Illustration 4 (cash cost); RTP Jan 2026 Q1 (= MTP May 2024 Series II, PPW Ltd); Tapri per-unit, 52 weeks.
- Credit policy: SM Illustrations 12 and 14; PYQ Sep 2024 Q3(a) (AB Enterprises, extra creditor days); MTP May 2025 Series I Q2(b) (ABC Pvt); Tapri incremental.
- Cash models: SM Illustration 10; PYQ Jan 2026 MCQ 7; RTP Jan 2025 Q1(i).

**Tests (28, `tests/lab-working-capital.test.js`)**
- **Operating cycle:** the §6 example (120 days); Illustration 2 (30 / 22 / 18 / 45 / 30 → 85 days, 4.23 cycles; ICAI truncates 4.235); SK (120 days, 3 cycles, ₹6,25,000); Wint (53 / 35 / 45 / 77 / 63, 147 days, 2.48, ₹1,703.63 lakh + 10% = ₹1,874 lakh).
- **WC estimate:** Naureen (every component, ₹1,66,250); Illustration 4 (₹9,10,000 / ₹3,10,000 / ₹6,00,000 / ₹7,20,000); PPW (₹18,30,000 (C), ₹16,33,000 (A), current ratio 4.46 (A)); PYQ Jan 2025 MCQ 8 (₹60 lakh (B)); RTP Sep 2024 (10% contingency grossed up by 1/9 → ₹4,99,769).
- **Credit policy:** Illustration 12 in both approaches, including expected returns of 44.49% / 30.70% / 23.45% / 12.22%; Illustration 13; Illustration 14 (₹8,190 / ₹7,280, ₹38,990); AB Enterprises (₹9,66,667 / ₹10,64,500 / ₹10,54,583); ABC (₹11,75,000 / ₹12,20,000 / ₹11,81,250).
- **Cash models:** Baumol ₹25,100, ₹18,00,000 and ₹24,495.
- **Random checks:** cycle identities; estimate totals, cash ≤ total ≤ sales basis, per-unit equals annual, months equal 30-day periods; incremental net benefit = difference of net benefits (so both approaches pick the same policy); Baumol is minimal on a grid, monthly equals annual; the Miller-Orr rule holds on 200 seeds.
- **Page and challenge:** 300 problems per mode, including a choice-type answer for "which policy".

**Screenshots checked:**
- `/tmp/working-capital.png`, `-d.png`, `-m.png`.
- `/tmp/working-capital-estimate.png`, `-em.png` (estimate on a phone), `-credit.png`, `-cash.png`.
- Frames `/tmp/wc-*.png`; embeds `/tmp/wc-embed.png`.

**Fixes made from the screenshots:**
- The mode seg overflowed the inputs column, so it is now a select.
- The squashed stages and policies tables: added a `/* lab: working-capital */` CSS block.
- A stage formula that printed the base amount where its name belonged.
- Flat net-benefit bars, replaced by "gain over present".
- Miller-Orr seeds that now show both kinds of transfer.

**Recommended embeds:**
- fm.wc.basics, "How it works" (operating cycle):
```
::: lab working-capital {"mode":"cycle"}
:::
```
- fm.wc.basics, "Exam angle" (PYQ Sep 2024 Q1(b)):
```
::: lab working-capital {"mode":"cycle","ydays":360,"round":true,"margin":0,"marginOn":"nwc","opcost":1875000,"stages":[["Raw material",0,0,0,65],["Work-in-progress",94600,0,1548000,0],["Finished goods",243500,0,1461000,0],["Receivables",0,0,0,36],["Payables",0,0,0,63]]}
:::
```
- fm.wc.estimate, "Formats and formulas" (SM Illustration 3):
```
::: lab working-capital {"mode":"estimate","ydays":360,"pu":"months","units":1,"credit":100,"dep":0,"admin":0,"selling":0,"rmP":2,"wipP":1,"conv":50,"fgP":3,"drP":3,"crP":2,"wageLag":1,"mfgLag":1,"adminLag":0,"sellLag":0,"sellAdv":0,"cash":20000,"basis":"total","margin":0,"marginOn":"nwc","sales":300000,"materials":180000,"wages":30000,"mfg":60000}
:::
```
- fm.wc.estimate, "Exam angle" (cash cost basis, RTP Jan 2026 Q1):
```
::: lab working-capital {"mode":"estimate","ydays":360,"pu":"months","units":1,"credit":100,"dep":0,"admin":360000,"selling":120000,"rmP":2,"wipP":0,"conv":50,"fgP":2,"drP":3,"crP":2,"wageLag":1,"mfgLag":1,"adminLag":1,"sellLag":0,"sellAdv":1,"cash":100000,"basis":"cash","margin":15,"marginOn":"nwc","sales":4800000,"materials":1200000,"wages":960000,"mfg":1200000}
:::
```
- fm.wc.receivables, "How it works" (SM Illustration 12):
```
::: lab working-capital {"mode":"credit","ydays":360,"bdAs":"pct","vcBasis":"unit","fixed":50000,"tax":0,"kPre":false,"costBasis":"total","xcred":0,"approach":"total","price":3,"vcu":2,"k":20,"policies":[["Present",600000,30,1,0,0],["A",630000,40,1.5,0,0],["B",648000,50,2,0,0],["C",675000,60,3,0,0],["D",690000,75,4,0,0]]}
:::
```
- fm.wc.receivables, "Exam angle" (PYQ Sep 2024 Q3(a)):
```
::: lab working-capital {"mode":"credit","ydays":360,"bdAs":"pct","vcBasis":"unit","fixed":500000,"tax":0,"kPre":false,"costBasis":"total","xcred":15,"approach":"total","price":100,"vcu":50,"k":20,"policies":[["Present",3000000,30,0,0,0],["A",3300000,45,1,0,0],["B",3500000,60,3.5,0,0]]}
:::
```
- fm.wc.cash, "How it works" (Baumol, then Miller-Orr):
```
::: lab working-capital {"mode":"cash","find":"c","period":"year","disb":1260000,"tcost":20,"yield":8,"mo":true,"moLow":0,"moZ":25000,"moH":75000,"moDays":60,"moSwing":9000,"moSeed":36}
:::
```

---

## 4. ratios — Ratio Analysis Lab (fm.ratio)

**What it does.** The givens are typed one per line as equations in words, for example:
- `sales = 150 lakh`, `credit sales = 80% of sales`
- `current ratio = 1.5 : 1`, `stock turnover = 6`, `collection period = 2 months`
- `fixed assets / current assets = 5/7`

How the lab handles them:
- A small parser turns each line into a linear equation.
- Ratio names such as current ratio, debt equity ratio, ROE and EPS can stand on the left.
- A label before a colon is kept for the captions.
- The solver adds the accounting identities, makes conditional assumptions (all sales on credit, average = closing when no opening balance is given), and sets unmentioned interest, tax, preference capital and dividend, and other current items to nil.
- It fixes one item per step, and solves two or more equations together (Gauss-Jordan) when no single line has a lone unknown, as with the current and quick ratios.
- Contradictory data are flagged.

Three modes read the same lines:
- **Ratio dashboard.** 37 SM ratios in five groups (liquidity, capital structure and coverage, activity, profitability, market), one per frame, each with its formula, the working and a one-line reading.
  - It can be filtered to one group for lesson embeds.
  - A ratio that rests on a nil interest or tax says so.
- **DuPont.** The tree grows branch by branch, ROE = NPM × asset turnover × equity multiplier, and the caption shows how much of ROE comes from borrowing.
- **Build from ratios.** The balance sheet (two-column ICAI layout) and income statement fill in step by step.
  - Each caption names the line or identity it used.
  - It shows ICAI's "balancing figure" rows and ends with the balance check, or a list of what is still open.

**Presets (11):**
- ICAI questions: PYQ Jan 2025 MCQs 6–7 (VP Ltd); PYQ Sep 2024 Q1(c) (MNP Ltd); MTP Sep 2025 Series I Q1(b) (Gagan Pvt. Ltd, which needs a simultaneous solve).
- Study Material: Illustrations 1, 2, 4 and 5, and Example 1 (DuPont).
- Three Tapri presets (dashboard, DuPont, "Kesar lost the balance sheet").

**Tests (19, `tests/lab-ratios.test.js`)**
- **Parser:** amounts, lakh, % of, a : b, fractions, months, labels, ratio names; unreadable lines give plain errors.
- **Study Material:** Illustration 1, both years (20.3% / 21.3%, 15.2% / 16.3%, 5.08% / 5%, 2.54 / 3, 3.87 / 4.72, 16.24% / 15%, 70.44 / 67.6 days); Illustration 5 (11 ratios); Example 1 DuPont (14.39%, 1.0455, 2.0621, 31.02% rounded / 31.03% exact); Alpha Ltd (whole balance sheet and P&L); Aebece (opening stock 80,000, purchases 27,20,000, operating expenses 1,60,000, the 52 lakh balancing figure, liabilities 64 lakh).
- **ICAI answers:** Gagan (quick 0.8, fixed assets turnover 3.67, proprietary 0.58, EPS ₹4.25, plus every intermediate figure); VP (₹20 lakh + ₹20 lakh (A); ₹60 lakh and ₹40 lakh (C)); MNP (the whole balance sheet).
- **Data checks:** a contradiction is flagged; too little data never invents figures.
- **Round trips:** 500 random businesses, statements → ratios → the same balance sheet, which balances; DuPont product = ROE; operating ratio + operating profit ratio = 100%; quick ≤ current.
- **Page and challenge:** 300 problems per mode. "Build" problems are generated from a hidden balance sheet and checked for consistency.

**Screenshots checked:**
- `/tmp/ratios.png`, `-d.png`, `-m.png`.
- `/tmp/ratios-MNP.png`, `-Example1.png`, `-vp-d.png` (VP Ltd build, dark).
- Frames `/tmp/ra-b.png`; embeds `/tmp/ra-embed.png`.

**Fixes made from the screenshots:**
- DuPont notes printed on the tree edges (the formulas moved to the captions).
- A duplicate tile.
- A wrong "rests on nil" warning caused by nil other current assets.
- Payables ratios that appeared from an assumption.
- The leak test was set off by the row-number column.

**Recommended embeds:**
- fm.ratio.liquidity, "How it works": the liquidity group, then the capital-structure group:
```
::: lab ratios {"mode":"dash","group":"liq"}
:::
::: lab ratios {"mode":"dash","group":"lev"}
:::
```
- fm.ratio.activity, "How it works":
```
::: lab ratios {"mode":"dash","group":"act"}
:::
```
- fm.ratio.profit, "How it works": the profitability group, then DuPont in the DuPont section, then the market group:
```
::: lab ratios {"mode":"dash","group":"prof"}
:::
::: lab ratios {"mode":"dupont"}
:::
::: lab ratios {"mode":"dash","group":"mkt"}
:::
```
- fm.ratio.prepare, "Worked examples" (PYQ Sep 2024 Q1(c)), then "Exam angle" (PYQ Jan 2025 MCQs 6–7):
```
::: lab ratios {"mode":"build","group":"all","ydays":360,"given":"equity share capital = 6,00,000\nreserves and surplus = 3,00,000\ncreditors = 3,00,000\ninventory turnover = 7.5\ntotal assets turnover = 2.5\nlong term debt / shareholders funds = 0.6\ncollection period = 30 days\ngross profit ratio = 25%\ncurrent ratio = 2.9"}
:::
::: lab ratios {"mode":"build","group":"all","ydays":360,"given":"sales = 150 lakh\ncredit sales = 80% of sales\ncurrent ratio = 1.5 : 1\nquick ratio = 1 : 1\ninventory turnover = 6\ncollection period = 2 months\ngross profit ratio = 20%"}
:::
```

---

## Framework gaps hit (all worked around; nothing in the framework was edited)

1. **Answer tolerance.** `challenge.tol` is one static number per lab. Every answer is therefore stated "to two decimals" in a given unit (₹ lakh for rupee amounts), or generated to come out whole.
2. **`gen(rng)` gets no values.**
   - leverage and working-capital generate inputs for every mode at once.
   - ratios keeps the last computed mode in a module variable, as the framework's `problem()` comment implies.
3. **Given line.** It prints raw numbers (`Debt: 20000000`) without Indian grouping. Labels carry "(0 = none)" so zero inputs drop out of it.
4. **Wide table controls.** These get squashed in the ~280 px inputs column. Two `/* lab: … */` CSS blocks key on `.field[data-c="plans|stages|policies"]`, because the lab container has no lab-id class (a possible clash with other labs' control ids).
5. **`reshow` on a number control.** It redraws the fields and loses focus while typing, so fields that depend on a typed value (such as an interest rate shown only when debt > 0) are not possible.
6. **Leak checker and Indian grouping.** It only partly strips grouped numbers ("25,00,000" → "25,00000"), so a ₹25 lakh sales figure counted as showing a 25% answer. Fixed with `challenge.view`: blank statements and given-only tables.
7. **Tree notes.** A note under a node with children is drawn over its edges (DuPont), so the formulas went into the captions.
8. **Sequence diagram (from the fork).** It cannot re-layout on a phone and scrolls sideways.
