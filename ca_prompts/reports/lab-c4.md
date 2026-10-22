# lab-c4 report: Variance Analysis Lab and Budget Lab

Both labs are **ready** in `content/labs.json` (set with `tools/lab_status.py`). Their own tests pass (variance 32, budget 19). The shared
framework tests (`node tests/run.js labs-`) pass for both labs, including the 40-problems-per-mode answer-leak check. The full suite is
1,411 passed and 1 failed; the failure is the `wacc` lab's 256-character blurb, which belongs to another job. `build.py --check` is clean
for these labs and `build.py` wrote the data.

Files: `app/js/labs/variance.js`, `tests/lab-variance.test.js`, `app/js/labs/budget.js`, `tests/lab-budget.test.js`. No CSS, no
index.html or build.py lines (labs load by id).

## 1. Variance Analysis Lab (`variance`, topics cma.std)

**What it does.** The variance tree grows one branch per frame. Each node holds its name, its amount with F/A, and its formula; green
means F, rose means A, grey means nil, and every caption also says F or A in words. A check frame shows that the children add up to the
parent. Beside the tree, the ICAI working table (SQ, SP, SQ×SP, AQ, AP, AQ×AP, then RSQ) fills column by column. Every caption gives the
reason and the per-material or per-grade arithmetic. Every variance is standard minus actual, so a positive amount is F (SM 13.12).
Modes:
- **Material**: cost → price, usage → mix, yield. Yield is cross-checked on the output basis in the caption. **Price-variance basis
  (lead's ruling, SM 13.15):** an optional Purchases table (material, qty purchased, price paid; behind "Purchases are given
  separately") makes the **quantity purchased** the default basis, with "quantity used (the SM's worked answers)" kept as an option.
  With no purchases entered, the basis falls back to the quantity used. On the purchases basis, the check frames say plainly that price
  + usage no longer equals the cost variance, and why.
- **Labour**: cost → rate (hours paid), idle time, efficiency (hours worked) → mix (gang), yield (sub-efficiency).
- **Variable overhead**: cost → expenditure, efficiency, with a "Quantity | Formula | Value" basics table. With no hours, the lab shows
  only the cost variance.
- **Fixed overhead**: cost → expenditure, volume → efficiency, capacity, calendar. When days are given, capacity is measured against the
  revised budgeted hours (SM 13.41). With no hours, it shows calendar plus "capacity + efficiency (not split)".
- **All four**: the top of Fig 13.1 (total cost → material, labour, VOH, FOH), a standard-against-actual summary, and a reconciliation
  statement (standard cost + adverse − favourable = actual cost) that closes to the rupee.

**Controls.** Mode; actual output; output of the standard mix (1 = standard per unit); the standard mix table (material, std qty, std
price); the actual table (material, qty used, price, bought) matched to the standard by name; price variance on used or bought; output
the standard hours are for; standard gang (grade, std hours, std rate); actual labour (grade, hours paid, idle hours, rate); budgeted
output, budgeted hours (0 = none), actual hours; budgeted and actual VOH and FOH; budgeted days (0 = none) and actual days.

**Presets (21).** Each one's tiles reproduce the source's answer:
- Tapri chai premix: all four elements, material only, and labour only (cast, default).
- ICAI PYQ September 2024 Q4(a) (BG company): materials A and B (₹10,500 A; mix ₹5,000 A; yield ₹13,000 A); labour with 5% of time
  paid lost (₹38,000 A; rate ₹30,000 A; idle time ₹10,000 A; efficiency ₹2,000 F).
- ICAI PYQ May 2026 Q1(b) (EXA Ltd): material (₹2,95,000 A, ₹1,75,000 A, ₹1,20,000 A) and labour (rate ₹24,000 A; efficiency
  ₹50,000 A).
- ICAI MTP May 2025 Series I Q2: three grades in weeks (mix ₹76,800 F; revised efficiency ₹1,29,600 A).
- ICAI PYQ May 2026 Q3(b) (Alpha Ltd): FOH over 28 days (₹6,000 F; calendar ₹72,000 F).
- ICAI PYQ May 2025 Q4(b): FOH with days but no hours (calendar ₹3,840 F), and VOH ₹720 A.
- SM Illustrations 3, 7, 8, 9, 11 and 13.
- Consumption-basis presets, which select "used" explicitly and are labelled "the SM's answer uses consumption": SM Illustration 4
  (₹376.25 F), Novell & Co. PP6 (₹7,600 A) and J.K. Ltd PP13 (₹3,000 A). The price frame's caption says this is the basis of the SM's
  worked answers and that SM 13.15 prefers purchases.
- Novell & Co. on the quantity purchased, SM 13.15's rule (₹8,000 A). Switching J.K. Ltd to purchases gives ₹2,200 A, the SM note's
  figure.

**Tests (30, `tests/lab-variance.test.js`).**
- SM Illustrations 1–11 and 13, figure by figure, including the per-material and per-grade amounts.
- SM practical problems 6 (Novell & Co.) and 13 (J.K. Ltd) on both bases; Illustration 4 on purchases as well (₹400 F).
- The default switching to purchases when purchases are entered, the fallback to used, and the labels of the consumption-basis presets.
- Five ICAI papers: PYQ Sep 2024, PYQ May 2026 (twice), MTP May 2025 S-I, PYQ May 2025.
- The presets' tiles, frame by frame tree growth and colours, and the Tapri reconciliation.
- Name matching between the two tables, and plain-language errors.
- 3,000 random cases: price + usage = cost; mix + yield = usage; the output-basis yield equals the yield; and an independent
  recomputation through the SM's "standard cost of …" column-total forms. Also the labour splits, VOH, FOH (eff + cap + cal = volume,
  revised hours × rate = budget for the actual days), and 500 random all-four problems whose leaves add up and whose statement closes.
- 200 challenge problems per mode: whole-rupee, signed answers that the shared answer box accepts.

**Challenge.** "Find the <variance> from the data shown". It draws fresh data for the current mode with whole-rupee answers. Type F as
positive and A with a minus sign; tolerance ₹1. The test state shows only the given data tables.

**Screenshots checked.** Full page at 1440 in light and dark, and at 390 on a phone, for every mode. Compact embeds at 760 for material,
total and FOH (dark), using a scratch harness in $TMPDIR. The J.K. Ltd purchases view was checked in light, dark and on a phone after the follow-up. Fixed after looking: six-column input tables
were unreadable, so each became a standard table and an actual table; formula notes under parent nodes crossed the edges, so formulas moved inside the boxes; the default
opened on the long reconciliation, so it now opens on the material tree; option labels were shortened.

**Recommended embeds.** These are container blocks, closed with `:::`:

- **cma.std.material**, section *How it works*:

  ```
  ::: lab variance {"mode":"material"}
  :::
  ```
- **cma.std.material**, section *Worked examples*:

  ```
  ::: lab variance {"mode":"material","out":1600,"stdOut":1,"mStd":[["A",4,50],["B",8,40]],"mAct":[["A",7000,40],["B",12500,45]]}
  :::
  ```
- **cma.std.labour**, section *How it works*:

  ```
  ::: lab variance {"mode":"labour"}
  :::
  ```
- **cma.std.labour**, section *Worked examples*:

  ```
  ::: lab variance {"mode":"labour","out":1800,"lStdOut":50,"lStd":[["Skilled",32,3],["Semi-skilled",12,2],["Unskilled",6,1]],"lAct":[["Skilled",1120,0,4],["Semi-skilled",720,0,3],["Unskilled",160,0,2]]}
  :::
  ```
- **cma.std.voh**, section *How it works*:

  ```
  ::: lab variance {"mode":"voh","out":5900,"budOut":6000,"budHrs":12000,"actHrs":11600,"vBud":120000,"vAct":122000}
  :::
  ```
- **cma.std.foh**, section *How it works*:

  ```
  ::: lab variance {"mode":"foh"}
  :::
  ```
- **cma.std.foh**, section *Worked examples*:

  ```
  ::: lab variance {"mode":"foh","out":315000,"budOut":300000,"budHrs":300000,"actHrs":350000,"fBud":600000,"fAct":624000,"budDays":25,"actDays":28}
  :::
  ```
- **cma.std.recon**, section *Formats and formulas*:

  ```
  ::: lab variance {"mode":"total"}
  :::
  ```

## 2. Budget Lab (`budget`, topics cma.bud)

**What it does.**
- **Flexible budget.** The table fills one cost line per frame across the chosen levels. Each caption says how the line behaves and
  shows any split: semi-variable by fixed share, fixed amount or **high-low** (SM 15.28), with the working. Step costs show the blocks
  needed at each level; fixed costs can step up or move in slabs. Then come total cost, cost per unit, sales and profit, and a chart of
  total cost against activity (fixed-cost floor, steps, the budgeted levels). Optionally, actual costs are compared with the budget
  flexed to the actual activity, line by line, F/A (budgetary control, SM Illustration 3).
- **Cash budget.** One receipt or payment per frame. When the flow has a lag, its working note shows which earlier month pays what into
  which budget month (ICAI's WN layout). Captions explain the pattern, bad debts (what is left of 100%) and cash discount. Then come
  totals, one month's opening → closing per frame, and the shortfall below the minimum balance or the overdraft. A short balances table
  leads those frames so lesson embeds show it.
- **Production and purchases.** Production = sales + closing − opening (per product); usage = production × material per unit (one
  product per frame); purchases = usage + closing (table or % of usage) − opening, valued at price.

**Controls.**
- Flexible: activity unit, capacity, base level (where the given costs apply), levels (`60%, 80%, 100%` or `300 600 900`), price, a
  textarea of cost lines, actual activity.
- Cash: months (history first), months before the budget, a textarea of flows, opening balance (may be negative), minimum balance.
- Production and purchases: products table, material-per-unit table, materials table, closing material as % of usage.

The cost lines and flows are written one per line, and the box help explains the format. Cost lines look like `Power: semi 800, 875 at
10000`, `fixed 2000, 3000 above 300`, `step 6500 per 50`, `2% of sales`, `, actual 600`. Flows look like `Credit sales: in 22,50,000 …;
collected 0 80 10 8`, `Tax: out Mar 1,00,000`, `collected 20 (2% discount) 50 28`. Indian grouping is read. Errors name the line and
say what to write.

**Presets (11).** Each one's tiles reproduce the source's answer:
- Tapri flexible, cash and production budgets (cast).
- ICAI PYQ September 2024 Q3(b) (Savi Ltd): ₹44,16,800 / ₹51,46,400 / ₹58,76,000; profit ₹85,24,000 at 100%.
- ICAI PYQ May 2025 Q5(c), college trip: ₹1,27,200 … ₹4,98,000; ₹424 … ₹415 a student.
- ICAI MTP May 2025 Series II Q5(b) (Bricks & Cement): closing ₹2,97,000 / ₹2,07,000 / ₹1,71,000.
- ICAI MTP January 2025 Series I Q4(b) (Anu Ltd): closing ₹4,00,000 → (₹15,60,000) → ₹2,65,000. The production-lagged amounts are
  pre-computed in the preset.
- ICAI MTP May 2025 Series I Q4(b): X 66,000 and Y 1,08,000; purchases ₹10,00,94,400.
- SM Illustration 1 (step-ups above 85% and 95%), SM Illustration 3 (flexible ₹4,705 vs actual ₹4,990, ₹285 A), SM practical problem
  3 (K Ltd, ₹9,46,80,000).

**Tests (19, `tests/lab-budget.test.js`).**
- SM Illustrations 1, 2, 3 and 5, and practical problem 3, figure by figure (SM Illustration 2 is test-only: a % of sales budget).
- Five ICAI papers: PYQ Sep 2024 Q3(b), PYQ May 2025 Q5(c), MTP May 2025 S-II Q5(b) with its working note row by row, MTP Jan 2025
  S-I Q4(b) for all six months of every line, and MTP May 2025 S-I Q4(b).
- The Tapri August month worked by hand, discount and bad-debt arithmetic, parser and error cases.
- 2,000 random flexible budgets: every split reproduces the given costs, totals are the sum of the lines, and the slope equals the sum
  of the variable rates.
- 2,000 random cash budgets: closing = opening + receipts − payments, and each flow is checked against an independent forward spreading.
- Frame-by-frame growth, all presets on the tiles, and 200 challenge problems per mode.

**Challenge.**
- Flexible: total cost, a semi-variable line, or cost per unit at a level.
- Cash: the closing balance of a month (signed), or cash received from sales.
- Production and purchases: production, quantity to buy, or purchase cost.

The test state shows only the given lines and tables.

**Screenshots checked.** Full page in all three modes at 1440 in light and dark, and at 390 for flexible and cash. Compact embeds for
flexible, cash (light and dark) and production. Fixed after looking: the chart's odd ticks (now round ticks with Indian grouping);
colliding point labels on phones (only the lowest and highest levels are labelled now); clipped cash embeds (now led by a balances
summary); "—" for empty months, as ICAI prints "-"; signed closings in the results table so the column right-aligns; the production
embed's final view now matches its caption.

**Recommended embeds:**

- **cma.bud.flexible**, section *How it works*:

  ```
  ::: lab budget {"mode":"flexible"}
  :::
  ```
- **cma.bud.flexible**, section *Worked examples*:

  ```
  ::: lab budget {"mode":"flexible","unit":"units","cap":120000,"base":96000,"levels":"60%, 80%, 100%","price":120,"lines":"Direct variable cost: variable 20\nFactory overheads: semi 8,40,000, 20% fixed\nAdministrative overheads: fixed 20,60,000\nSales commission: 2% of sales\nTransportation: step 4000 per 4000"}
  :::
  ```
- **cma.bud.flexible**, section *Worked examples*:

  ```
  ::: lab budget {"mode":"flexible","unit":"units","cap":0,"base":8000,"levels":"6000 8000 10000","price":0,"actLevel":6000,"lines":"Salary of foreman: fixed 1000, actual 1000\nIndirect labour: variable 720 in total, actual 600\nIndirect material: variable 800 in total, actual 700\nRepairs and maintenance: semi 600, 650 at 10000, actual 600\nPower: semi 800, 875 at 10000, actual 740\nTools consumed: variable 320 in total, actual 300\nRates and taxes: fixed 150, actual 150\nDepreciation: fixed 800, actual 800\nInsurance: fixed 100, actual 100"}
  :::
  ```
- **cma.bud.cash**, section *How it works*:

  ```
  ::: lab budget {"mode":"cash"}
  :::
  ```
- **cma.bud.cash**, section *Worked examples*:

  ```
  ::: lab budget {"mode":"cash","months":"Apr May Jun Jul Aug Sep","hist":3,"open":135000,"minBal":0,"flows":"Cash sales: in 5,40,000 5,40,000 5,85,000 6,75,000 7,20,000 8,10,000\nCredit sales: in 22,50,000 22,50,000 22,50,000 23,40,000 23,40,000 25,20,000; collected 0 80 10 8\nCredit purchases: out 15,30,000 16,20,000 16,20,000 18,00,000 18,00,000 18,00,000; paid 0 75 25\nOther operating costs: out 8,10,000 8,10,000 8,10,000 10,98,000 11,07,000 11,07,000\nPallet jacks: out Jul 9,00,000; paid 0 25 25 25 25"}
  :::
  ```
- **cma.bud.functional**, section *How it works*:

  ```
  ::: lab budget {"mode":"functional"}
  :::
  ```
- **cma.bud.functional**, section *Worked examples*:

  ```
  ::: lab budget {"mode":"functional","fProd":[["X",64000,0,2000],["Y",112000,4000,0]],"fBom":[["A","X",24],["A","Y",12],["B","X",12],["B","Y",9]],"fMat":[["A",18.75,180000,0],["B",27,120000,0]],"fClosePct":5}
  :::
  ```

## 3. Framework gaps hit

1. **Table controls in the 280-px inputs column** read badly beyond 4 columns, with cramped headers and cut-off values. I worked around
   it by splitting each table in two, matched by name. A `wide: true` table option (horizontal scroll, or full-width under the stage)
   would help other labs.
2. **No per-lab hook for CSS.** The lab root carries no `data-lab` id, so a `/* lab: id */` block can only key on control ids, which
   can collide across labs. I added no CSS.
3. **Citing ICAI documents.** `presetInfo` and the "From the papers" machinery only understand GATE ids (`cs-YYYY:Q…`). CA presets name
   the paper in plain text, as the guide says, so `build.py` reports "0 cite a past paper" until a CA question bank exists.
4. **Tree notes under a parent sit on its edges.** I put formulas inside the node boxes as a third line instead.
5. **Plots with explicit ticks** lose the automatic Indian grouping. I pass `[value, "label"]` pairs; this is documented in the examples
   but easy to miss.
6. **`tools/preview_lesson.py` does not mount `::: lab` embeds**, so compact mode cannot be previewed with the tool. I used a scratch
   harness in $TMPDIR that loads the app's CSS and scripts and calls `GA.lab.mount(..., {compact: true})`.
7. **Answer kinds.** A variance is "amount plus F/A". The lab uses a signed number (F positive), stated in every prompt. An
   "amount + F/A" answer kind would match how ICAI asks.
8. **Not built: cost increases on cost lines.** Some flexible-budget questions add price increases (SM practical problems 2 and 4: +8%
   material, +10% fixed). The current lines have no per-line increase clause; adding `+8% variable` / `+10% fixed` clauses would cover
   them.
