# lab-c1 report: eoq, stores-ledger, incentives

All three labs are `ready` in content/labs.json (set with tools/lab_status.py). They pass their own tests, the shared `labs-` tests and `build.py --check`. No CSS was added, and nothing outside the files I own was edited.

| lab | file | tests |
|---|---|---|
| eoq | app/js/labs/eoq.js | tests/lab-eoq.test.js: 39 pass |
| stores-ledger | app/js/labs/stores-ledger.js | tests/lab-stores-ledger.test.js: 27 pass |
| incentives | app/js/labs/incentives.js | tests/lab-incentives.test.js: 26 pass |

The shared `labs-` run has failures, but none are mine: `dividend` fails the leak test, and `capbud` / `wacc` fail the blurb-length test.

## 1. EOQ and Stock Levels Lab (`eoq`)

**What it does.** It has three modes (first control):
- **EOQ.** Plots ordering, carrying and total relevant cost frame by frame, and marks the EOQ where ordering = carrying. It shows the cost at the EOQ, and optionally against another order size (ICAI's "saving by EOQ / extra cost of ROQ").
- **Discounts.** Prices the EOQ at the list price, then each break's smallest order, then any band's own EOQ that falls inside its band. Rows are added one per frame in ICAI's table (price, orders, purchase, ordering, carrying, total). A total-cost curve per price band is drawn and the best size is highlighted.
- **Stock levels.** Builds ROL, minimum, maximum, average and danger levels one by one on a stock control chart:
  - two normal sawtooth cycles;
  - a worst-case branch (maximum usage × maximum lead time), which ends at 0. This shows *why* ROL = max × max.
  - a best-case branch, which reaches the maximum level.

**Controls**
- Shared: unit; A, O, price; carrying cost as % of price **plus** ₹ per unit (ICAI mixes them, e.g. "1% a month + ₹2").
- EOQ mode: compare-with size.
- Discounts mode: price-break table (₹ price or "2%").
- Levels mode:
  - period; usage basis (min/avg/max, min–max with the midpoint, or average + max with min = 2·avg − max as in SM Ill. 6);
  - lead times (average = midpoint toggle); emergency lead time; danger at minimum usage;
  - ROL basis (max × max / safety stock + avg × avg / given); ROQ = EOQ or given;
  - shelf-life cap (SM Case Scenario 1); average formula.
- ICAI conventions as switches, both on by default: EOQ rounded to whole units; orders rounded up (13 for 12.5). Every ICAI answer checked does both.

**Presets (19).**
- Tapri ×3 (milk powder: EOQ against Kesar's quarterly order; 2% at 12,000 kg against 2.5% at 30,000 kg; daily levels).
- SM: Ill. 4, 5, 6; Practical 1, 2, 5(a); Case Scenario 1.
- ICAI:
  - PYQ Jan 2026 MCQs 6–10 (OC);
  - MTP Sep 2025 S-II Q3(a), for both EOQ and levels;
  - RTP Sep 2025 Q7;
  - PYQ May 2024 Q1(a), for both discount and ROL with safety stock;
  - MTP May 2024 S-II Q1(b);
  - RTP Sep 2026 Q5(h) and Q5.

**Tests**
- SM: Ill. 3, 4(i)(ii), 5 (A and B), 6; Practical 1, 2, 3, 4 (all four parts, both average formulas), 5(a) (the SM's rows 500/1,000/2,000/3,000 to the rupee) and 5(b), 6, 7; Case Scenario 1.
- ICAI Suggested Answers:
  - PYQ May 2024 Q1(a): 6,000; 51,500; ₹8,65,44,000 against ₹8,50,39,200.
  - PYQ Jan 2026 MCQs 6–10: 200; 250; 16; ₹81,00,000; ₹81,02,500.
  - PYQ Jan 2025 Q1(c) (stated ROL and maximum).
  - MTP May 2024 S-II: 371, 33 orders, ₹2,09,58,332.40 against ₹2,04,33,480.
  - MTP Sep 2025 S-II (₹440); MTP Sep 2026 S-I (1,434 / 676 / 1,690 / 318 / ₹24,95,063).
  - RTP Sep 2025 (₹4,500, ₹16,125, 896 / 2,848 / 524); RTP Sep 2026 (646, 450 / 946 / 170 / 558, ₹14,69,122 against ₹14,96,462).
  - RTP May 2025 (₹1,00,000 / ₹1,24,980).
- Invariants and brute force:
  - 2,000 random cases: ordering = carrying, relevant cost = √(2AOC), and no whole order size beats the EOQ.
  - Discount optimum equals a brute force over every whole order size, 300 random price lists.
  - A day-by-day random-usage simulation never runs out and never passes the maximum level.
  - The sawtooth's time-average equals min + ½ ROQ.
- Also: every preset renders, bad input gives a plain message, and 150 challenge problems per mode work.

**Challenge.** EOQ, orders a year, or saving against an order size (EOQ mode); the best order size with a clear winner (discount mode); any level (levels mode).

## 2. Stores Ledger Lab (`stores-ledger`)

**What it does**
- **Ledger mode.** Posts a priced stores ledger one entry per frame in ICAI's columns (receipts / issues / balance with qty, rate, ₹). FIFO/LIFO balances list each lot on its own line, as the SM prints them.
  - Above the ledger, a stack of the lots in stock shows the units each issue takes from the end they leave.
  - Captions give the reason ("FIFO takes the oldest lot first: 30 @ ₹1,500 + 350 @ ₹1,560").
  - The last frame compares FIFO / LIFO / simple average / weighted average on the same entries.
- **Cost of a receipt mode** (for cma.mat.receipts). Takes an invoice line by line with the SM's treatment table:
  - trade/quantity discount deducted; cash discount ignored; GST left out unless "no credit";
  - customs, toll, freight, insurance and commission added; containers added; returnable containers shortfall only; demurrage/penalty excluded;
  - other expenses as % of total grossed up (× p ÷ (100 − p));
  - then the quantity (normal shortage %, deterioration provision, abnormal shortage to Costing P&L) and the rate.

**Controls**
- Method (select); unit.
- Transactions textarea, one line each: "6-9 receipt 50 @ 5.75", "value 162.50", "return to vendor 10", "return from dept 5", "shortage 2", "normal loss 300", "transfer 5"; brackets and # are comments.
- Return-from-department treatment: SM §9.2 first way, kept apart and issued first (Practical 8); or second way, fresh receipt (Illustration 14).
- Average-rate rounding (₹0.01 / ₹0.10 / ₹1 / none) and round amounts to the rupee. ICAI uses all three roundings in different answers.
- Receipt mode: invoice textarea, quantity, normal shortage (units or %), deterioration %, abnormal shortage.

**Conventions (stated in the note)**
- Return to vendor at the purchase price of its lot (latest receipt by default).
- Return from a department at the latest issue's price unless a rate is given.
- Shortage written off at the method's price (§9.3).
- Normal loss absorbed: quantity falls, value stays (Ill. 14). For FIFO/LIFO the lot next in line carries it; this rule is mine, as there is no ICAI ledger example for FIFO/LIFO.
- Simple average = average of the rates of lots still in stock, with units leaving first-in-first-out.

**Presets (17).**
- Tapri ×2: a cardamom store with every entry type; a cardamom invoice.
- SM: Practical 8 (AT Ltd, FIFO); Ill. 14 (WA); Ill. 13 (LIFO); Practical 9; §8.1 FIFO lots; §8.2 Example 1 (an issue is added to show the ₹12 price); Ill. 1 and 2.
- ICAI: PYQ Jan 2026 MCQ 14; MTP Sep 2025 S-I MCQ 1; PYQ Sep 2024 MCQs 6 and 10; PYQ Sep 2026 MCQ 13; old-scheme MTP Nov 2022 S-II Q5(b); MTP May 2024 S-I Q2(b); RTP Sep 2024 Q1.

**Tests**
- SM:
  - Practical 8: every balance, the 26-9 issue ₹59.25, shortage ₹12.20.
  - Ill. 14: every rate, amount and balance to the rupee; closing ₹19,46,112 at ₹294.87.
  - Ill. 13 (both methods); Practical 9 (three methods); §8.1; Examples 1 and 2.
  - Simple average drops a used-up lot.
- ICAI:
  - PYQ Jan 2026 MCQ 14 ₹83,100; MTP Sep 2025 S-I ₹40,000; PYQ Sep 2024 MCQs 6 and 10 ₹5,100 and ₹2,04,000.
  - PYQ Sep 2026 MCQ 13 ₹15,270 (option C). The Sep 2026 Suggested Answers are not yet published, so this one is checked against the options only.
  - Old-scheme MTP Nov 2022 S-II: the whole rate sequence rounded to ₹0.10, closing ₹1,09,810; old-scheme PYQ May 2023 FIFO.
  - Receipts: Ill. 2 ₹4.25; Ill. 1 ₹12.04 / ₹15.43; MTP May 2024 S-I ₹125.20; RTP Sep 2024 ₹78.50 (₹22,500 cash discount, ₹6,280 other expenses); PYQ Sep 2024 receipt cost.
- Brute force and identities:
  - A unit-by-unit queue/stack prices every FIFO/LIFO issue exactly, 1,000 random ledgers.
  - Value in = issues + returns + write-offs + closing, and quantities balance: every method, both return treatments, all roundings, 800 random ledgers with returns, shortages and losses.
  - Equal lot prices make all methods agree; a weighted-average issue rate never leaves the range of the lot rates.
- Also: bad input names the line to fix, every preset renders, and 150 challenge problems per mode work.

**Challenge.** The value of a given issue or of the closing stock under a random method (simple-average cases with a negative balance are never asked); the rate per unit of a receipt.

## 3. Incentive Plans Lab (`incentives`)

**What it does**
- **Plans mode.** Works out time rate, piece rate, Halsey (any share, default 50%) and Rowan earnings plan by plan, with the formula and its reason.
  - Then the SM's Ill. 9 statement (8 rows of time taken, with this job's row marked).
  - A bonus vs time-saved plot: Halsey's bonus is a straight line, Rowan's a parabola peaking at 50% saving, with the meeting point at T = share × S.
  - An effective-hourly-rate plot: Rowan never reaches 2 × the rate.
  - Optional material + overhead per hour gives factory cost (SM Ill. 8).
  - The final frame shows both plots and the verdict.
- **Turnover mode**, two ways in:
  - From the numbers: start/end (end can be worked out from the flows, as in PYQ Sep 2024), left, discharged, replaced, new joinings. Gives separation, replacement, flux (S + R), new-recruitment and flux with accessions (S + A).
  - Work back from the rates (ICAI's favourite): the average comes from replaced ÷ rate, separated ÷ rate, or is given. Then counts, with accessions = flux × average − separations.
  - Both ways give equivalent annual rates (× 12 ÷ months or × 365 ÷ days) and a bar chart.

**Presets (16).**
- Tapri ×2: premix packing; café turnover.
- SM: Ill. 6/7, 9, 8 (workman A), 10 (= MTP May 2024 S-II Q1(c)), 14.
- ICAI: PYQ Jan 2025 Q2(b); PYQ May 2025 Q2(b) and Q1(c); PYQ Sep 2024 MCQs 13 and 14; PYQ May 2026 Q4(b); RTP Sep 2024 Q8; MTP Jan 2025 S-I MCQ 11; old-scheme RTP May 2020 Q2.

**Tests**
- SM:
  - Ill. 6/7: ₹420 / ₹450.
  - Ill. 9: the whole statement, and the lab's table rows equal it.
  - Ill. 9(a): equality at T = S/2.
  - Ill. 8: factory cost ₹3,490 / ₹3,600.
  - Ill. 10: T = 3 solved, Halsey ₹105 at ₹35 an hour.
  - Ill. 11: ₹3.75 / ₹5 / ₹3.75 / ₹10.50.
  - Ill. 14: 600 / 42 / 18; annual 40 / 20 / 12%.
- ICAI:
  - PYQ Jan 2025: ₹187.50 / ₹200.
  - PYQ May 2025: ₹8,52,750 and ₹9,06,854.40; ₹33.31 and ₹35.424 an hour; ₹68.22 and ₹72.55 a unit; efficiency 122.07%.
  - PYQ Sep 2024 MCQ 13: ₹3,780, and Bhuvan's rate solves to ₹28. PYQ Sep 2026 MCQ 12: 48 h (answers not yet published).
  - Turnover: PYQ May 2026 (900 / 72 / 36); RTP Sep 2024 (450 / 36 / 27); MTP Jan 2025 (30 / 18 / 42); PYQ May 2025 (800, 9.75%, 13.25%); PYQ Sep 2024 MCQ 14 (25%); old RTP May 2020 (4.33 / 4.06 / 5.41 / 13.80%).
- Invariants, 3,000 random jobs:
  - Halsey = Rowan at T = pS; Rowan pays more before that point and less after it.
  - No saving pays the time wage.
  - The Rowan rate is below 2R and its bonus is at most SR/4.
  - Halsey 50% earnings = (S + T)/2 × R.
  - A whole-hour brute force puts the Rowan peak at S/2.
- Invariants, 2,000 random workforces:
  - flux = separation + replacement; flux with joinings = flux + new recruitment;
  - working back from the rates returns the original counts;
  - the annualising formulas hold.
- Also: over-standard jobs, bad input, every preset renders, and 150 challenge problems per mode.

**Challenge.** Halsey or Rowan earnings, either effective rate, or the time at which they pay the same (plans mode); a turnover rate, or average / separations / accessions worked back (turnover mode).

## Screenshots checked (Read tool)

- **Full lab pages.** Every lab at 1440 light, 1440 dark and 390 phone, plus each non-default mode via `?cfg=` (EOQ discounts and levels in light, dark and phone; ledger WA preset; receipt mode; turnover counts and work-back in dark).
- **Intermediate ledger frames.** Rendered on a scratch page, since `shot.sh` shows only the last frame.
- **Compact embeds.** All six recommended configs, mounted with `GA.lab.mount(..., {compact: true})`.
- **Fixed after looking.**
  - Overflowing seg labels.
  - An 11-column ledger that was too tall: changed to one row per entry with lots on lines inside the cell, as in the SM.
  - The returned lot listed last although it is issued first.
  - Colliding plot labels.
  - Legend overlap.
  - A sixth tile wrapping onto its own row.
  - Paise formatting.

## Recommended embeds (not added; a later job does that)

**cma.mat.eoq**
- "How it works":
  ```
  ::: lab eoq {"mode":"eoq"}
  Watch ordering cost fall and carrying cost rise; the EOQ is where they cross.
  :::
  ```
- "Worked examples" (after the quantity-discount example):
  ```
  ::: lab eoq {"mode":"discount","unit":"units","A":360000,"O":1200,"price":240,"pct":10,"rup":0,"tiers":[[30000,"2%"]]}
  PYQ May 2024: is 2% off for 30,000 locks worth it?
  :::
  ```

**cma.mat.levels**
- "How it works":
  ```
  ::: lab eoq {"mode":"levels"}
  Each level appears on the stock control chart with the case it plans for.
  :::
  ```
- "Worked examples":
  ```
  ::: lab eoq {"mode":"levels","unit":"units","per":"week","ubasis":"all","umin":25,"uavg":50,"umax":75,"lmin":4,"lmax":6,"ltMid":true,"lemerg":0,"rolFrom":"max","roqFrom":"given","roq":300,"shelf":0,"avgF":"mid"}
  Study Material Illustration 5, component A.
  :::
  ```

**cma.mat.issues**
- "How it works":
  ```
  ::: lab stores-ledger {"method":"fifo"}
  Every kind of entry, posted row by row; switch the method to compare.
  :::
  ```
- "Worked examples":
  ```
  ::: lab stores-ledger {"method":"lifo","unit":"units","txns":"1-4 opening 100 @ 5\n5-4 receipt 300 @ 6\n6-4 issue 250\n8-4 receipt 500 @ 7\n10-4 issue 400\n12-4 receipt 600 @ 8\n14-4 issue 500"}
  Study Material Illustration 13 under LIFO; switch to FIFO for the other half.
  :::
  ```

**cma.mat.receipts**
- "How it works":
  ```
  ::: lab stores-ledger {"mode":"receipt"}
  Each invoice item, added, deducted or left out, with the Study Material's reason.
  :::
  ```
- "Exam angle": load the MTP May 2024 S-I preset from the full lab, or use
  ```
  ::: lab stores-ledger {"mode":"receipt","unit":"units","inv":"listed price 5,00,000\ntrade discount 10%\ngst 18% no credit\ncash discount 10%\ntoll tax 1,800\nfreight and insurance 36,000\ndemurrage 5,000\ncommission and brokerage 10,000\nreturnable containers 30,000 refund 26,000\nother expenses 2% of total","rqty":5000,"rshort":"5%"}
  :::
  ```

**cma.emp.incentives**
- "How it works":
  ```
  ::: lab incentives {}
  :::
  ```
  The final frame shows the bonus and hourly-rate plots.
- "Worked examples":
  ```
  ::: lab incentives {"units":1,"std":8,"taken":4,"rate":8}
  Study Material Illustration 9: step to the statement frame.
  :::
  ```

**cma.emp.turnover**
- "How it works":
  ```
  ::: lab incentives {"mode":"turnover"}
  :::
  ```
- "Exam angle":
  ```
  ::: lab incentives {"mode":"turnover","tbasis":"rates","period":"quarter"}
  Work back from the three rates, as in Study Material Illustration 14 and PYQ May 2026.
  :::
  ```

## Framework gaps hit

1. **Table cells.** They have no line breaks except `<br>` inside a cell (it works through `md.inline`, but isn't documented in diagram-examples.json). There is also no grouped header (Receipts / Issues / Balance over three columns each), so the ledger uses "Rec. qty · Rate · ₹".
2. **Plots.** There is no vertical or horizontal reference-line primitive; I used two-point dashed series with `legend:false`. There is no label per horizontal line; I used named `yticks` and merged labels that sat too close together.
3. **Table controls.** Columns have no select type, so the ledger and the invoice are textareas with a small keyword language. It is forgiving (aliases, commas, ₹, bracketed references) and every error names its line.
4. **`challenge.gen(rng)`.** It cannot see the current mode, so each lab keeps a module-level `lastMode` set by `compute`. The framework's comment implies this, but it isn't spelled out.
5. **Screenshots.** `shot.sh` can show only the final frame. A `frame=` query parameter would help to check intermediate frames; I used a scratch page instead.
