# lab-c2 report: oh-distribution, abc, cost-sheet (Paper 4)

All three labs are built, tested and marked `ready` in content/labs.json (through tools/lab_status.py). `build.py --check` passes and
`build.py` writes data. My tests: 21 (oh-distribution) + 16 (abc) + 18 (cost-sheet). The shared lab tests (`node tests/run.js labs-`) end
at 128 passed, 0 failed.

Files: `app/js/labs/{oh-distribution,abc,cost-sheet}.js` and `tests/lab-{oh-distribution,abc,cost-sheet}.test.js`. No CSS, no lessons and
no script lists were touched (labs load lazily by id). The cost-sheet file was developed in $TMPDIR and copied in only once it parsed and
passed, as the lead asked.

Conventions common to the three labs:
- Amounts are typed the Indian way (12,50,000), and lists of figures are separated by spaces.
- Each lab's `note` opens with **Conventions.**
- Stats stay within 6 tiles, and every lab keeps to 120 frames or fewer.
- A lab's first control gives its test-yourself modes.

## 1. oh-distribution — Overhead Distribution Lab (cma.oh)

**What it does.** It plays up to three phases (the *Show* select can pick one).

1. **Primary distribution.** Allocated overheads go in as given. Each item is then apportioned on its basis, filling the table one cell at a
   time.
   - Each caption explains the basis ("it is spent on space, so …") and works the share, e.g. ₹1,20,000 × 3,000 ⁄ 6,000.
   - Product bases such as "HP × Machine hours" work, as in SM Illustration 4.
   - A column-totals frame closes the phase.
2. **Secondary distribution**, by any of five methods, in ICAI's statement layout. The amount leaving a department is shown in brackets,
   receivers are highlighted, and a live "Balance now" row runs along the bottom.
   - **Direct re-distribution:** production departments only.
   - **Step method:** the order is as listed, or the department serving the most other service departments first, or the largest cost
     first. A closed department takes nothing back.
   - **Repeated distribution:** round after round. A balance below the stop amount (₹100 by default, which reproduces ICAI's rows) goes to
     production only, as ICAI's closing step does.
   - **Simultaneous equations:** the equations, the substitution worked in full for two departments, the totals, and then the production
     shares. A share to another service department appears in [brackets] and is not added twice.
   - **Trial and error:** service-to-service passes, then the totals. The caption states how much is never passed on, which is why this
     method falls short of the simultaneous answer.
3. **Absorption rates.** Each department gets its machine or labour hour rate, or "Larger base per department" (ICAI's "most appropriate
   rate"). An optional job then absorbs overhead at those rates.

**Rounding.** Whole rupees by largest remainder, so every row adds up exactly. On ICAI's data this reproduces its rows to the rupee where
ICAI rounds consistently. A toggle switches to exact arithmetic.

**Controls.**
- Method; Show; step order; stop amount; whole-rupee toggle; absorption rate.
- Tables:
  - **Departments:** name, P/S, allocated ₹.
  - **Bases:** one figure per department. Rows named Machine hours and Labour hours also set the rates.
  - **Overheads:** item, amount, basis — or "allocated" with one amount per department.
  - **Service shares:** a % or ratio list, or a basis name.
- Job hours.

**Presets (12).**
- Tapri premix plant: repeated distribution (the default), and the same data by simultaneous equations.
- Tapri samosa factory: step method with three service departments.
- SM Illustrations 4 and 5 (Sanz Ltd): primary, repeated, machine hour rates.
- SM Illustration 4: trial and error.
- **RTP Sep 2026 Q1** (Apex Mobility): primary, step, rates, Job AMS-101.
- **MTP May 2026 Series I Q3(b)** (Union Ltd): primary, then simultaneous.
- **Exam Sep 2025 Q2(b)** (S1/S2 simultaneous).
- **MTP Sep 2025 Series II Q2(a)** (IOT Solutions: Finance and IT, fixed costs).
- SM Practical Problem 3 (Deccan: step ladder with four service departments, labour hour rates).
- SM Illustration 1 (XL Ltd: direct).
- SM Practical Problem 1 (ABC Company: primary, repeated).

**Tests (21).**
- **Input parsing:** Indian commas, ratios, % lists, dashes.
- **The largest-remainder rule:** it reproduces ICAI rows (SM Ill. 5; RTP Sep 2026 plant insurance and depreciation), plus 2,000 random
  splits that each add up and stay within ₹1 of exact.
- **SM Illustrations 1, 2, 3 and 4 (primary and trial and error) and 5:** every row and total, and the MHRs 848.18 / 325.27 / 187.82. The
  repeated totals land within ₹2 of ICAI's, whose own rounding is inconsistent.
- **SM PP1, PP2 and PP3:** all figures. The tests record ICAI's slip in PP2: 9,233.8 ÷ 3,070 is printed as 3.00.
- **RTP Sep 2026 Q1:** the primary distribution to the rupee, the maintenance step and the MCQ keys (i), (ii), (iii), (iv) and (v).
  - The question prints store requisitions 4,000 : 2,000, but ICAI's answer shares stores 5:2.
  - The tests check ICAI's 42,42,764 / 21,37,236 with 5:2.
  - They also show that the printed data still picks the same MCQ options.
- **MTP May 2026 S1 Q3(b), Exam Sep 2025 Q2(b), and MTP Sep 2025 S2 Q2(a):** the last covers direct, step and simultaneous for both the
  fixed and the variable costs, and the dual-rate totals. All match to the rupee.
- **Brute force on 400 random factories:**
  - Every method leaves all the overheads in production.
  - Rows move money and never make it.
  - A closed department takes nothing back.
  - Simultaneous equals a long exact repeated distribution, and its equations hold.
  - Trial and error is short by exactly the amount it never passed on.
- **Primary-distribution identity** (300 random cases).
- **Animation:** ≤ 120 frames, captions, the closing step, and the Show filter.
- **Bad-input messages:** 10 cases.
- **Challenge:** 300 problems per method, including that the given table never shows the answer.

**Challenge.** It asks a production department's total after secondary distribution, or the overhead a job absorbs (₹, tol ₹3). Problems
use the direct, step or simultaneous method.

## 2. abc — Activity Based Costing Lab (cma.abc)

**What it does.** It follows the SM's stages, one small frame at a time.
1. **Overheads to activity cost pools** (optional). The table matches ICAI's WN layout. A **support activity** (driver "support") is
   spread over the primary activities.
2. **For each pool:** a pool → products flow (nest diagram) with the cost, driver, volume and rate. Then one frame per product adds its
   charge, alongside a growing table of ABC charges.
   - Drivers can be given per unit, per batch (batches = units ÷ batch size, rounded up) or in total.
   - "… of 50,000" sets the rate on capacity or a company-wide total. The amount not charged is shown (SM Ill. 2's unused capacity).
3. **The ABC cost statement,** in ICAI's per-unit layout (each line to paise) or its total layout.
4. **Traditional absorption** on one labour or machine hour rate.
5. **The comparison,** product by product. Each product is under- or over-costed, and the caption names the activity behind it (e.g.
   "Frozen samosas use 40% of the batches but only 19% of the labour hours").
6. **A close-out frame.** "Same overheads, divided differently" checks that ABC and traditional absorb the same total.

**Controls.**
- Compare with: labour hour rate / machine hour rate / ABC only.
- Cost statement layout (per unit / totals).
- Driver-rate rounding: exact / 3 / 2 decimals. The 2-decimal option reproduces BABYSOFT.
- **Product lines** table: product, units.
- **Product data** table: rows read by name (Direct material ₹, Direct labour ₹, Labour hours or labour minutes, Machine hours, Batch
  size, and any driver row). The scope comes from the name: "per batch", "(total)", "p.a.".
- **Cost pools** table: activity, cost, driver.
- **Overheads to activities** table: amount and shares, or a blank amount to spread a support activity.
- Traditional overheads and hours (company-wide figures).

**Presets (11).**
- Tapri plant (premix packs, elaichi sachets, frozen samosas) against a labour hour rate (the default) and against a machine hour rate.
- SM Illustrations 1, 2, 3 and 4.
- SM PP1 (Woolmark), SM PP5 (BABYSOFT).
- **Exam Jan 2025 Case Scenario I** (ABC Company, MCQs 1–5).
- **Exam Sep 2024 Q3(a)** (GST Ltd: support activity, company-wide drivers and hours).
- **MTP Sep 2026 Series I Q3(a)** (Silver Star: four products).

**Tests (16).**
- Row recognition and driver scopes.
- **SM Ill. 1:** 25.09 / 28.97 / 30.16; 21.50 / 32.25 / 33.00; totals 1,00,360 / 86,910 / 48,256.
- **SM Ill. 2:** rates ₹4 and ₹30; unused capacity ₹20,000 + ₹30,000.
- **SM Ill. 3:** 936.38 / 1,298.50 and 976.80 / 1,266.16; distortions 40.42 and 32.34.
- **SM Ill. 4:** 50 / 30 / 60.
- **Woolmark:** 427.00 / 425.00 / 335.20 and 230 / 428 / 364.
- **BABYSOFT:** 192.48 / 243.70 / 285.72 and 189.00 / 244.17 / 291.50.
- **Exam Jan 2025:** MCQ keys (A) 29.60, (D) 15.44, (A) 280, (B) 15,360, (B) 2,94,905.
- **Exam Sep 2024:** WN2 1,15,200 / 1,36,800 / 18,000; rates 20 / 19 / 25; 90,611 / 64,082 (10.07 / 8.90); traditional 86,600 / 60,950
  (9.62 / 8.47).
- **MTP Sep 2026:** pools 62,500 / 40,500 / 27,000 / 3,500; rates 625 / 168.75 / 270 / 14; all totals and per-unit figures; the
  differences (30.08) (3.18) 17.48 31.63.
  - The question says "220 orders"; ICAI's answer uses 80+65+50+55 = 250 (batches of 10), and the preset follows the answer.
- **Brute force on 500 random factories:** charges equal an independent re-computation; ABC charges every rupee; traditional absorbs the
  same total; the layouts are consistent.
- **Capacity:** charges + unused = pool, and unused is never negative.
- **Animation, the Tapri distortions, bad input (8), and the challenge** (300 problems per mode; computed rates and costs never shown
  while asking).

**Challenge.** It asks the ABC cost per unit of a product or a driver rate (₹, two decimals, tol 0.02).

## 3. cost-sheet — Cost Sheet Lab (cma.sheet)

**Cost sheet mode.** The ICAI specimen cost sheet (SM ch. 6 §4.1) builds line by line:
- Materials consumed (stock adjustments) → labour → direct expenses → **prime cost**.
- → works overheads → **gross works cost**, ± WIP → **works cost**.
- → QC, process R&D, production administration, less scrap, primary packing → **cost of production**.
- ± finished goods → **COGS**.
- → general administration, selling, distribution, secondary packing, interest (a separate item, §4.2(iv)) → **cost of sales** → profit
  → sales.

How it works:
- There is a per-unit column: per unit produced up to COP, per unit sold from COGS (ICAI Ill. 1).
- Closing finished goods, when not given, are valued by FIFO at this period's COP per unit, rounded to paise (ICAI PP2, Exam Jan 2026).
- **Every item is classified by its words.** The rules follow SM §3/§4.2 and the chapter MCQs, and they reproduce ICAI's classification of
  all 45 items of SM Illustration 3. A head in [brackets] overrides the rule.
- **GST with ITC, penalties, fines and abnormal costs are left out.** A frame lists them with the reason.
- **Long sheets fold.** A finished block folds into its total line, and the building frames show a rolling window of the newest lines with
  a "⋮ n earlier lines, up to …" row, so the current line stays in view in a lesson embed. The final frame shows the whole (folded) sheet.

**Quotation mode.** An estimated cost sheet for an order.
- Rates come from last period (the items table) or are given: works overheads on direct labour, prime cost or materials; administration
  on works cost or prime cost; S&D on cost of production or works cost.
- Optional % changes in the overheads, and rates rounded to 3 or 2 decimals of a % as an answer does.
- The order's items: materials (less returns), labour, direct expenses, "works" items (e.g. a normal rectification), and its own direct
  selling costs.
- Profit as a % on cost, on price, or "the same % as last period".

**Controls.**
- Mode.
- Items table (item [head], amount).
- Units produced, units sold, opening FG units.
- Quotation settings: rate source, three bases, three given %, three changes %, rounding, the order table.
- Profit basis and %.

**Presets (9).**
- Tapri samosa factory: the month's sheet (the default), and a railway-caterer quotation.
- SM Illustrations 1, 2 and 3 (Arnav: 45 items).
- **Exam Jan 2026 Q2(a)** (Dhol Makers: FIFO closing stock, profit 20% on sales).
- **Exam Jan 2025 Q4(b)** (LMN Foods quotation).
- **MTP Sep 2026 Series I Q2(a)** (Job No. 707: given rates, normal rectification).
- **RTP Jan 2026 Q13** (rates −10% / +20%, profit % as last year).

**Tests (18).**
- **Classifier:** Ill. 3's 45 items exactly as ICAI; the MCQ cases (GST with or without credit, bad debts, canteen, royalty, audit fee …).
- **SM Ill. 1, 2 and 3:** every line.
- **SM PP2:** 41,68,120 / 1,51,70,280 / 1,85,89,280; profit 32,80,461.
- **SM PP4:** COGS 6,02,750; administration 18,870; S&D 92,400; net profit 35,980.
- **SM Case Scenario 1:** keys (d) (c) (a) (b).
- **Exam Jan 2026 Dhol Makers:** prime 24,15,000 … sales 42,00,000.
- **LMN Foods:** ₹7,70,500.
- **Job 707:** ₹1,22,364.
- **RTP Jan 2026:** 52.806% / 19.251% / 26.952% / 20.755%, price ₹11,31,479; with exact rates, within ₹3 of that.
- **Brute force on 500 random sheets:** every line is the sum of its parts; cost of sales is the signed sum of every costed item; profit +
  cost = sales; profit % on cost and on sales.
- **FIFO and per-unit identities** (300 cases).
- **Quotation identities:** price = total × (1 + p) and total ÷ (1 − p). Past rates re-price the last period exactly.
- **Animation:** ICAI's order of subtotals; excluded items shown.
- **Bad input** (8 cases).
- **Challenge:** 300 problems per mode; problems follow the mode being explored.

**Challenge.** It asks a line of the sheet (prime cost, works cost, COP, COGS, cost of sales, profit), or the price to quote (₹, tol 1).

## Screenshots checked

I checked each lab at 1440 px in light and dark, at 390 px, and as a compact lesson embed. I also checked intermediate frames, rendered
through the real framework and CSS in a scratch page in $TMPDIR.

**oh-distribution.**
- The department table had five cramped columns. I moved the hours into the bases table and cut it to three.
- I shortened the selects.
- Percentages now show unsimplified, as ICAI prints them, e.g. (45:15:30:—:10).
- A spurious "no hours" frame no longer appears.
- I added the Show phases so each lesson embed ends on its own phase.

**abc.**
- One preset-conversion regex had mangled a table header. I found it on screen and repaired it.
- I shortened the product rows of the flow boxes and dropped an arrow label that overlapped them.
- The comparison table is down to four columns for phones.
- Unit words are cleaner (no "per total").
- Rate tiles were reformatted.
- I added scope words (per batch / total) to the data names, which cut the tables to 2–3 columns.

**cost-sheet.**
- Single-item lines read "Head (item)".
- The head moved into the item text as [brackets], making a two-column table.
- Blocks fold into their totals, with a rolling window while building, so the compact embed always shows the line being added.
- Per-unit deductions show in brackets.
- The per-unit figure moved into the tile labels.

## Recommended embeds (not added; for the lesson job)

Lessons that exist now: cma.oh.primary, cma.oh.secondary, cma.abc.concept, cma.abc.compute, cma.sheet.mfg, cma.sheet.quote. There is no
cma.oh.absorb yet. Each config below was checked to compute when merged over the defaults, as the embed does.

- **cma.oh.primary**, section *How it works*:

  ```
  ::: lab oh-distribution {"part":"primary"}
  Watch Tapri's premix plant charge rent, power, depreciation and the canteen subsidy to four departments, one cell at a time; change a basis and see the shares move.
  :::
  ```
- **cma.oh.primary**, section *Worked examples*:

  ```
  ::: lab oh-distribution {"part":"primary","method":"simultaneous","depts":[["Machine shop","P",""],["Packing","P",""],["General plant","S",""],["Stores","S",""]],"bases":[["Floor space","2,000 800 400 1,600"],["Radiator sections","45 90 30 60"],["Employees","20 12 4 8"],["Investment","8,00,000 2,40,000 80,000 1,60,000"],["HP hours","3,500 500 - 1,000"]],"overheads":[["Indirect labour","8,000 6,000 4,000 11,000","allocated"],["Maintenance material","3,400 1,600 2,100 2,800","allocated"],["Misc. supplies","1,500 2,900 900 600","allocated"],["Supervisor's salary","0 0 16,000 0","allocated"],["Cost & payroll salary","0 0 80,000 0","allocated"],["Power","78,000","HP hours"],["Rent","72,000","Floor space"],["Fuel and heat","60,000","Radiator sections"],["Insurance","12,000","Investment"],["Taxes","8,400","Investment"],["Depreciation","1,20,000","Investment"]],"service":[["Stores","50 20 30 -"],["General plant","Employees"]],"rate":"mh","job":""}
  MTP May 2026 Series I Q3(b) (Union Ltd): the allocated items, then six items apportioned on HP hours, floor space, radiator sections and investment.
  :::
  ```
- **cma.oh.secondary**, section *How it works*:

  ```
  ::: lab oh-distribution {"part":"secondary","method":"repeated"}
  Press play to watch the service balances shrink round after round until ICAI's closing step; switch the method to compare direct, step, simultaneous and trial and error on the same data.
  :::
  ```
- **cma.oh.secondary**, section *Worked examples*:

  ```
  ::: lab oh-distribution {"part":"secondary","method":"simultaneous","depts":[["P1","P","0"],["P2","P","0"],["P3","P","0"],["S1","S","1,60,000"],["S2","S","2,40,000"]],"bases":[],"overheads":[],"service":[["S1","25 35 20 - 20"],["S2","35 30 25 10 -"]],"rate":"mh","job":""}
  Exam Sep 2025 Q2(b): S1 and S2 serve each other; see the two equations, the substitution, and why S1's 20% to S2 is not added twice.
  :::
  ```
- **cma.oh.secondary**, section *Worked examples*:

  ```
  ::: lab oh-distribution {"part":"secondary","method":"step","depts":[["MD","P","0"],["DS","P","0"],["Finance","S","22,96,800"],["IT","S","30,30,500"]],"bases":[],"overheads":[],"service":[["Finance","4,500 2,250 - 750"],["IT","67,500 75,000 7,500 -"]],"rate":"mh","job":""}
  MTP Sep 2025 Series II Q2(a): Finance and IT, fixed costs on budgeted hours. Switch the method to see direct, step and simultaneous side by side.
  :::
  ```
- **cma.oh.absorb**, section *How it works*:

  ```
  ::: lab oh-distribution {"part":"rates","rate":"more"}
  Each production department on its larger base (machine or labour hours), then a job's overhead at those rates.
  :::
  ```
- **cma.oh.absorb**, section *Worked examples*:

  ```
  ::: lab oh-distribution {"part":"rates","method":"step","depts":[["X","P","1,93,000"],["Y","P","64,000"],["Z","P","83,000"],["P","S","45,000"],["Q","S","75,000"],["R","S","1,05,000"],["S","S","30,000"]],"bases":[["Employees","100 125 85 10 50 40 50"],["Area (sq m)","3,000 1,500 1,500 500 1,500 1,000 1,000"],["Labour hours","4,000 3,000 4,000 1,000 5,000 6,000 3,000"]],"overheads":[],"service":[["P","Employees"],["Q","Labour hours"],["R","Area"],["S","Labour hours"]],"rate":"lh","job":""}
  SM Practical Problem 3 (Deccan): after the step ladder, ₹75, ₹45 and ₹40 per labour hour.
  :::
  ```
- **cma.abc.concept**, section *How it works*:

  ```
  ::: lab abc {"base":"none"}
  Follow each activity's cost pool to its driver rate and into the three products, one product at a time.
  :::
  ```
- **cma.abc.compute**, section *Worked examples*:

  ```
  ::: lab abc {"base":"lh"}
  Tapri's premix, sachets and samosas: ABC beside one labour-hour rate, and which product each method under-costs, and why.
  :::
  ```
- **cma.abc.compute**, section *Worked examples*:

  ```
  ::: lab abc {"base":"lh","layout":"total","rates":"exact","productLines":[["X","16,000"],["Y","17,000"],["Z","15,000"]],"productData":[["Direct material ₹ (3, 4, 5 kg × ₹2)","6 8 10"],["Direct labour ₹ (hours × ₹20)","2 3 4"],["Labour hours","0.10 0.15 0.20"],["Machine hours","0.5 0.7 0.9"],["Production runs p.a.","50 65 60"],["Purchase orders p.a.","5 10 15"],["Orders shipped p.a.","25 35 32"]],"pools":[["Machine set-up","49,000","Production runs"],["Machine running","64,128","Machine hours"],["Purchasing","52,050","Purchase orders"],["Delivery","46,460","Orders shipped"]],"resources":[]}
  Exam Jan 2025 Case Scenario I (MCQs 1–5): the traditional rate ₹29.60, the set-up rate ₹280 and Z's total cost ₹2,94,905.
  :::
  ```
- **cma.sheet.mfg**, section *Formats and formulas*:

  ```
  ::: lab cost-sheet {}
  Watch Tapri's samosa factory's cost sheet build in ICAI's order, every item going to its head, GST with credit and a penalty left out.
  :::
  ```
- **cma.sheet.mfg**, section *Worked examples*:

  ```
  ::: lab cost-sheet {"mode":"sheet","produced":0,"sold":0,"fgOpenUnits":0,"profitOn":"sales","profitPct":"","sheetItems":[["Opening stock of raw materials","60,000"],["Purchase of raw materials","4,80,000"],["Closing stock of raw materials","50,000"],["Wages paid [labour]","2,40,000"],["Factory overheads","1,00,000"],["Opening work-in-process","12,000"],["Closing work-in-process","15,000"],["Administration overheads (related to production)","50,000"],["Opening stock of finished goods","90,000"],["Closing stock of finished goods","1,10,000"],["Selling and distribution overheads","25,000"],["Sales","10,00,000"]]}
  SM Illustration 2 (ABC Corporation): stocks of raw materials, work-in-process and finished goods, line by line.
  :::
  ```
- **cma.sheet.quote**, section *Worked examples*:

  ```
  ::: lab cost-sheet {"mode":"quote","rates":"past","fohBase":"dl","admBase":"works","sdBase":"cop","adjFoh":0,"adjAdm":0,"adjSd":0,"profitOn":"sales","profitPct":"20","pctDp":"exact","sheetItems":[["Opening inventory of raw materials","2,00,000"],["Raw material purchases","12,00,000"],["Closing inventory of raw materials","2,50,000"],["Labour costs [labour]","5,00,000"],["Production overheads [factory]","2,50,000"],["Marketing and distribution expenses [selling]","1,52,000"]],"order":[["Estimated raw material cost [materials]","3,00,000"],["Estimated labour cost [labour]","1,50,000"],["Packaging and transportation [selling direct]","49,400"]],"produced":0,"sold":0}
  Exam Jan 2025 Q4(b) (LMN Foods): rates from 2023 (50% of labour, 8% of production cost), then the bulk order priced at 20% profit on sales.
  :::
  ```

## Framework gaps and notes for the lead

- **Shared control-id CSS.** Other labs' CSS keys on `.field[data-c="items"]` (recon) and `[data-c="products"]` (joint), and that styled my
  tables too: the amount column of `items` was squeezed to 13%. I renamed my table controls to `overheads`, `productLines`/`productData`
  and `sheetItems`/`order`. The general cure is a lab id on the mount (e.g. `data-lab` on the host) so a lab's CSS can be scoped.
- **Static challenge tolerance.** `challenge.tol` is one number per lab, so a lab cannot ask a ₹ total (tol ₹1–3) and a rate per hour (tol
  0.01) in the same challenge. I ask "the overhead a job absorbs" instead of a bare machine hour rate. A `tol(values, result)` function
  would fix this.
- **gen() never sees the explored values.** I followed the framework's own hint (compute runs first): the cost-sheet lab remembers its
  last mode. Passing the values to `gen(rng, values)` would be cleaner.
- **Tall stage tables in embeds.** The compact budget is about five table rows, and nothing scrolls the highlighted row into view, so
  tall tables clip the line being animated. I worked around it in cost-sheet with a rolling window. A framework "scroll to the highlighted
  cell" would help every table-based lab.
- **ICAI inconsistencies I found (kept out of the presets, noted in tests).**
  - RTP Sep 2026 Q1 prints stores requisitions 4,000:2,000, but the answer uses 5:2.
  - MTP Sep 2026 S1 Q3(a) says 220 orders, but the answer uses 250.
  - SM PP2 prints P1's rate as 3.00 instead of 3.01.
  - RTP Sep 2026's canteen row sums to 4,99,999.
  - In repeated distribution, ICAI rounds ad hoc, so its totals there differ from the lab's (and from exact) by ₹1–2.
