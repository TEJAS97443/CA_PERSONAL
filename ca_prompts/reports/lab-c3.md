# lab-c3 report: process, joint, recon (Paper 4)

All three labs are `ready` in content/labs.json (set with tools/lab_status.py). Their own tests pass (process 28, joint 26, recon 14). The shared `labs-` tests pass with all three included (a scratch copy limited to these labs: 40/40; the full run: 122/122). `build.py --check` is clean and `build.py` has written data. Files I own: `app/js/labs/{process,joint,recon}.js`, `tests/lab-{process,joint,recon}.test.js`, and three blocks in `app/css/labs.css` (`/* lab: process */`, `/* lab: joint */`, `/* lab: recon */`). No index.html or build.py lines were needed, because the labs view loads `app/js/labs/<id>.js` by id.

## 1. process: Process Costing Lab (cma.proc)

**What it does.** It has two modes.
- **Process accounts.** A chain of 1 to 4 processes. The account is posted debit line by debit line. Then come normal loss (credited at scrap value), the cost per normal unit formula as a Quantity/Formula/Value table, abnormal loss or abnormal gain (valued like good units), and the transfer to the next process or to finished stock. Partial transfers are supported: "To next" units, with the rest going to finished stock, as in PYQ May 2024. A tree shows where the units went (input → good output / abnormal loss / normal loss, with % edges). At the end come the Normal Loss, Abnormal Loss and Abnormal Gain accounts, with the net amounts to the Costing P&L.
- **WIP and EU.** FIFO or weighted average, in five steps:
  1. Physical flow, row by row.
  2. Statement of equivalent production, row by row, with "EU (% done)" cells per element.
  3–4. Statement of cost and cost per EU, one element at a time.
  5. Statement of evaluation (FIFO: opening WIP completion + its b/f cost, then fresh units; abnormal loss and closing WIP element-wise), and then the process account.

**Controls**
- Mode (seg).
- Process accounts: a cost-lines table [process, item, units, ₹] and a processes table [process, NL %, scrap ₹, output, to next].
- WIP and EU:
  - method, opening WIP, units introduced, units completed, closing WIP, normal loss %
  - normal-loss base (fresh input, or fresh + opening WIP)
  - scrap ₹ a unit
  - a cost-elements table [element, opening WIP ₹, this period ₹]
  - opening % and closing % lists ("100, 40, 40")
  - abnormal-loss completion: 100 %, as closing WIP, or your own %.
- Conventions: round the cost per unit (exact, 2, 3 or 4 dp) and round amounts to the rupee.

**Presets (11)**
- Tapri: premix (one process, abnormal loss); samosa line (two processes, abnormal gain); kulhad glaze (FIFO).
- SM Ch. 10: Illustrations 2, 3, 4 and 5; Practical Problem 4.
- **ICAI past paper May 2024 Q4(a)**.
- **ICAI past paper Sep 2024 Case Scenario I**.
- **ICAI MTP March 2026 Series I Case Scenario 1**.

**Tests**
- SM Examples 1–4: 4,063 / 92,437; 2,032 / 98,532; Abnormal Gain A/c 1,832.
- SM Illustration 2: exact to the rupee (286, 55,714, 1,337, 91,051, 6,364, 1,10,687; 487.5 → 488 units).
- SM Illustration 3: the income statement's 6,322 and 18,459. Account lines are within ₹1, because ICAI makes the abnormal loss the balancing figure.
- SM Illustrations 4/5 at ICAI's 2-dp rate: 84,352 / 1,94,352 / 16,87,040 / 21,088 / 1,26,528 and 18,82,620 / 20,918 / 1,25,508.
- SM Practical Problems 1–5 and MCQs 2 and 3.
- PYQ May 2024 Q4(a): every figure (104, 20,800, 7,17,600, 2,39,200, 158, 30,020, 10,11,200; Abnormal Loss A/c 1,000 / 19,800; Abnormal Gain A/c 1,520 / 28,500).
- PYQ Sep 2024 MCQs 1–5: 72,770 @ 6.50; 74,079 @ 9.00; 2,176; 12,72,800; 30,940.
- MTP Mar 2026: 5,100, 4,860, ₹58 / 65 / 36.
- Invariants:
  - 2,000 random chains: every account balances in units and ₹; costs in + gains = scrap + losses + finished stock; abnormal loss = the textbook formula.
  - 3,000 random WIP problems: input = output; the account balances; **EU(avg) − EU(FIFO) = opening WIP × its % done**; full cost recovery to the paisa.
- Also: bad input, the phone twins, and 300 challenge problems per mode.

**Challenge.** Find the cost per normal unit, the abnormal loss or gain, the transfer, closing WIP, the value transferred, or the material cost per EU. All answers are whole rupees by construction. The test picture shows only the given data.

## 2. joint: Joint and By-Products Lab (cma.joint)

**What it does.** It has three modes.
- **Apportion.** A split-off tree, plus the method's statement built row by row (products across, Total column). The final frame puts every usable method side by side: physical units (= average unit cost), sales value at split-off, NRV (less further cost, selling costs and an optional normal profit margin), sales after further processing, constant gross margin %, contribution margin, and technical estimates. Methods that cannot apply are named, with the reason.
- **Sell or process further?** Product by product: incremental revenue, then incremental cost (further cost + selling costs after − at split-off), then the verdict. A paired bar plot compares the two, and three plans are compared (all at split-off / all further / best).
- **By-product.** First its NRV, then three treatments: other income, NRV credited to the joint cost, and as a joint product.

**Controls**
- Mode (select).
- Joint cost and method; the variable part of the joint cost (contribution margin); technical weights; normal profit margin %.
- A products table [product, units, split-off price (0 = no market), selling ₹].
- A further-processing table [product, cost ₹, units out (0 = same), price after, selling ₹].
- Other fixed costs; by-product name, units, price and own costs; rupee rounding.

**Presets (14)**
- Tapri: chai blends (NRV); chai blends (process further?); samosa crumbs (by-product).
- SM Ch. 11: Illustration 4, Illustration 3, the Case Scenario (Pokemon), Practical Problem 4.
- **ICAI past paper May 2025 Q(b)**.
- **ICAI past paper May 2024 Q1(b)** and its part (ii).
- **ICAI RTP January 2026 Q15**.
- **ICAI past paper May 2026 Q3(a)**.
- **ICAI past paper Jan 2026 Q1(b)**, both the by-product part and the further-processing part.

**Tests**
- SM Examples 1–3.
- SM Illustrations 1–4. Illustration 1 is within ICAI's tonne rounding of the wastage.
- The Pokemon case: all five answers, including GM 8 % and 2,21,587.50 / 4,90,912.50.
- SM Practical Problems 1–6, e.g. Sun-moon: 26,25,000 … 9,45,000; profits 6,30,000 / 13,00,000 / 13,30,000.
- PYQ May 2024: 20,000 / 40,000; contribution 22,500 / 37,500; −1,440.
- PYQ Jan 2025 MCQ 12: ₹6.00, key (D).
- PYQ May 2025: 1,25,000 / 2,25,000 / 2,50,000, ratio 5:9:10, profits 75,000 / 1,35,000 / 1,50,000.
- PYQ Jan 2026: NRV 2,100; 1,00,800 / 43,200; 2,16,000; +16,800 / −1,800.
- PYQ May 2026: 17,04,000 / 11,36,000; 9,72,000 − 5,32,000 = 4,40,000.
- RTP Jan 2026 Q15: 6,30,000 / 2,80,000 / 3,78,000 and +2,16,000 / −50,000 / +3,24,000.
- Invariants:
  - 3,000 random processes: shares add up exactly; ratio methods stay proportional; constant gross margin leaves an equal margin on every product.
  - 2,000 random decisions: the best plan = a brute force over all 2ⁿ plans and is never worse than either extreme; a different joint cost never changes a decision.
  - The NRV credit lowers the main products' total by exactly the NRV.
- Also: bad input and 300 challenge problems per mode. The yes/no split of "process further?" is about 50/50.

**Challenge.** A product's share under a method, the share after the by-product credit, or "process further?" (yes/no buttons, or the signed incremental profit).

## 3. recon: Cost-Financial Reconciliation Lab (cma.sys.recon)

**What it does.** Items are entered as questions give them: kind E (expense or charge), I (income), OS (opening stock) or CS (closing stock), with the amount in the cost accounts and in the financial accounts (0 where absent). The statement is built item by item in ICAI's layout: start, Add group with its total, subtotal, Less group in brackets, end. Each caption names the cause of the difference (only in financial accounts; only in cost accounts / notional; under- or over-absorbed; valued higher in one set of accounts) and so the sign. A sideways waterfall (start → each item green or rose with +/− labels → end) grows with it.

**Layouts**
- From costing profit.
- From financial profit (the signs reverse, and the captions say why).
- Memorandum Reconciliation Account (two-sided, balancing "To Net Profit / By Net Loss as per Financial Accounts").

**Presets (11)**
- Tapri: the same seven items in all three layouts.
- SM Ch. 7: Illustrations 6, 7 and 8; Practical Problem 5 (memorandum account).
- **ICAI MTP Jan 2026 S-I Q3(b)**.
- **ICAI MTP Sep 2024 S-I**.
- **ICAI MTP May 2026 S-II**.
- **ICAI MTP Jan 2025 S-II Q4(c)**.

**Tests**
- SM Illustration 6: 1,10,000, with each item in ICAI's column.
- SM Illustration 7: 20,000. ICAI calls the ₹23,000 "over absorbed", but its own Overhead Control A/c shows it under-absorbed. The lab says under-absorbed; the test records the slip.
- SM Illustration 8: 12,90,000, and selling overheads give no adjustment.
- SM Practical Problem 5: −4,16,000; account totals 4,54,000.
- MTP Jan 2026: −3,70,000; totals 4,18,000.
- MTP Sep 2024: 30,400; opening stock overvaluation +23,000 and closing −9,500; totals 1,92,200.
- MTP May 2026: −1,190.
- MTP Jan 2025: 6,28,000.
- Invariants, over 3,000 random cases: two P&L accounts are built independently from scratch, and the lab must reach each profit from the other; the memorandum account's debits equal its credits.
- Also: bad input and 400 challenge problems per layout.

**Challenge.** The reconciled profit, or the signed effect of one item.

## Screenshots checked (Read tool)
- process:
  - /tmp/process.png, -d (dark), -m (390 px)
  - /tmp/process-wip.png and -wip-m
  - intermediate frames via a scratch harness: losses, tree, abnormal gain, EU statement, evaluation
  - compact embeds
  - the test state
- joint:
  - /tmp/joint.png, -d, -m
  - -f (further), -b (by-product)
  - intermediate frames
  - compact embed
  - the test state
- recon:
  - /tmp/recon.png, -d, -m
  - -memo, -memo-m
  - intermediate memo frame
  - compact embeds

Fixes made from looking:
- The unit bar was replaced by a tree.
- The EU and evaluation tables were compacted.
- The completion % moved to text fields.
- Two-sided accounts got a phone twin (stacked Dr then Cr) under 600 px.
- 3-option segmented controls became selects.
- The waterfall axis was zoomed and given round ticks.
- Input-table column widths were set in my CSS blocks.

## Recommended embeds (not added; for the lesson writers)

**cma.proc.accounts**
- *How it works* (after normal and abnormal loss are explained): `::: lab process {"mode":"loss"}`
- *Worked examples* (abnormal gain): `::: lab process {"mode":"loss","processes":[["Blend",5,6,9600,0]]}`
- *Exam angle* (PYQ May 2024 Q4(a)): `::: lab process {"mode":"loss","costLines":[["P","Material",10000,800000],["P","Wages",0,52000],["P","Direct expenses",0,8600],["P","Production overheads",0,120000],["Q","Wages",0,78000],["Q","Direct expenses",0,11100],["Q","Production overheads",0,180000]],"processes":[["P",6,5,9200,6900],["Q",10,8,6400,0]]}`

**cma.proc.eu**
- *How it works*: `::: lab process {"mode":"wip","method":"fifo"}`, then `::: lab process {"mode":"wip","method":"avg"}`
- *Exam angle* (PYQ Sep 2024 case): `::: lab process {"mode":"wip","method":"fifo","openUnits":12000,"introduced":74500,"completed":82000,"closeUnits":2600,"nlPct":2,"nlBase":"total","scrap":2,"abBasis":"own","abPct":"100, 70, 70","wipElements":[["Material",166200,476465],["Labour",0,370395],["Overheads",0,296316]],"openPct":"100, 80, 80","closePct":"100, 60, 60"}`

**cma.joint.apportion**
- *How it works*: `::: lab joint {"mode":"apportion","method":"nrv"}`
- *Worked examples*: `::: lab joint {"mode":"apportion","method":"sales","jointCost":100000,"products":[["Caustic Soda",1200,50,0],["Chlorine",800,75,0]],"further":[["Chlorine",20000,500,200,0]]}`
- *Under the hood*: `::: lab joint {"mode":"apportion","method":"cgm"}`

**cma.joint.further**
- *How it works*: `::: lab joint {"mode":"further"}`
- *Exam angle* (RTP Jan 2026 Q15): `::: lab joint {"mode":"further","jointCost":1288000,"products":[["P",18000,50,0],["Q",10000,40,0],["C",54000,10,0]],"further":[["P",180000,0,72,0],["Q",150000,0,50,0],["C",108000,0,18,0]]}`

**cma.joint.byprod**
- *How it works*: `::: lab joint {"mode":"byprod","method":"nrv"}`
- *Worked examples* (PYQ Jan 2026): `::: lab joint {"mode":"byprod","method":"sales","jointCost":146100,"byName":"Cotton Linters","byUnits":300,"byPrice":10,"byCost":900,"products":[["Cotton Fibre",2800,90,0],["Cotton Seed",1800,60,0]],"further":[]}`

**cma.sys.recon**
- These are 4-item configs: the 7-item default is clipped in the compact embed.
- *How it works*: `::: lab recon {"layout":"cost","costProfit":1250000,"items":[["Works overheads (absorbed vs actual)","E",840000,905000],["Notional rent of the owned factory","E",120000,0],["Interest on bank loan","E",0,72000],["Closing stock of premix","CS",465000,440000]]}`
- *Formats and formulas*: the same with `"layout":"memo"`.
- *Under the hood*: `{"layout":"fin","finProfit":1208000, same items}`.

## Framework gaps hit
1. **The lab host has no lab id** (no `data-lab` or class). Per-lab CSS can only be scoped by control ids (`.field[data-c="…"]`), so I used distinctive ids.
2. **Table controls have no column widths.** Four or five numeric columns in the 300 px inputs column clip amounts. I set widths and paddings in my CSS blocks; a per-column `width` key would be cleaner.
3. **Phone layouts need hand-made twins.** A two-sided account needs a phone layout. I return two `{html}` views (rendered with `GA.diagram.render` inside compute) and toggle them with CSS. Also, `.tc-*` cell colours are scoped to `.dg`, so those tables had to be wrapped in `<figure class="dg">`. A spec-level `{wide, narrow}` view pair would remove this.
4. **`challenge.tol` is a single value.** It cannot differ per question (₹ amounts vs rates). I made every challenge answer a whole rupee instead.
5. **A segmented control overflows.** With three medium labels, a `seg` overflows the inputs column; I used selects.
6. **No waterfall or horizontal-bar primitive in `plot`.** I built one from `regions` with `yticks` labels.
