# lab-a1 report: audit-risk, sampling, audit-journey (Paper 5)

All three labs are built, tested and marked `ready` in content/labs.json (through tools/lab_status.py). `build.py --check` passes, and
`build.py` writes data. My tests: 18 + 22 + 10. The shared lab tests (`node tests/run.js labs-`) end at 121 passed, 0 failed.

Files: `app/js/labs/{audit-risk,sampling,audit-journey}.js`, `tests/lab-{audit-risk,sampling,audit-journey}.test.js`, and one CSS rule in
`app/css/labs.css` under `/* lab: sampling */`. No lessons were touched and no script lists changed (labs load lazily).

## 1. audit-risk — Audit Risk and Materiality Lab (aud.risk)

**What it does.** It has three modes, chosen in the first select.
- **Audit risk model.** The Study Material's chart (p. 3.9) is drawn as a tree, and fills in step by step: inherent risk, then control
  risk, then a 3 × 3 grid giving the risk of material misstatement (RoMM). The grid then flips to the acceptable detection risk, the
  classic grid running Highest to Lowest. Next comes an illustrative curve, DR = AR ÷ RoMM, with the point on it. The last frame is the
  SA 330 response table: how persuasive the evidence must be, tests of controls, substantive procedures, extent and team.
  - An optional **event** moves one component and the chain re-runs. The events are ICAI and Study Material cases.
  - For an inherent or control risk event, the grid cell moves and the point slides down the curve.
  - For a detection risk event, RoMM stays put. The point sits above the curve, and the lab gives the fix (a larger sample, attend the
    count).
- **With numbers (illustrative).** Builds the formula table for AR = IR × CR × DR (SM p. 3.10), solves it for DR and shows the curve. An
  optional "control risk after a change" moves the point along the curve.
- **Materiality and misstatements.**
  - Steps through the benchmark and why it suits the entity (SA 320 text), then materiality = % × benchmark, then performance materiality,
    then an optional clearly trivial amount.
  - Each misstatement then becomes a bar against those lines. A Note column can mark an item fixed or material by its nature.
  - A final bar shows the uncorrected total, with the SA 450 → SA 705 verdict.

**Controls.**
- Mode select.
- Model mode: inherent risk and control risk (low / moderate / high segments) and an event select.
- Numbers mode: audit risk %, inherent risk %, control risk %, and control risk after the change (0 = no change).
- Materiality mode: benchmark select, amount, percentage, performance materiality %, clearly trivial %, and a misstatements table
  (Item / Rupees / Note).

**Presets (11).**
- Tapri cafés (the default)
- MTP Sep 2024 Series I, Q1(b) (gross profit ratio 14% → 24%)
- MTP May 2024 Series I, MCQ 1 (the NGO)
- SM TYU 1 / MTP May 2025 Series II, Q1(a) (the stubble start-up)
- MTP Jan 2026 Series II, Q11 (unauthorised access)
- SM TYU 3 (revenue procedures: detection risk)
- Two illustrative numeric presets
- MTP Sep 2024 Series II, Q6 (Cheap Cost: PBT ₹5 crore at 5%)
- RTP Jan 2026, Q3 (5% of ₹15 lakh)
- Tapri Foundation (1% of expenses)

**Tests (18).**
- The grid matches the classic grid and is monotone.
- The illustrative percentages agree with the grid: the same rank gives the same DR, and IR × CR × DR = 5% exactly.
- AR = IR × CR × DR holds on 3,000 random inputs.
- ICAI keys checked:
  - MTP Sep 2024 S1 Q1(b): detection risk kept low.
  - MTP May 2024 S1 MCQ 1 (c): audit risk high.
  - MTP May 2025 S2 Q1(a)(i)–(iii): inherent, control, detection risk.
  - MTP Jan 2026 S2 Q11 (a): control risk.
  - MTP May 2025 S1 Q5 (c): control risk.
  - MTP Sep 2024 S2 Q6 (b): ₹10 lakh + ₹20 lakh is material against ₹25 lakh.
  - RTP Jan 2026 Q3 (c): materiality ₹75,000, performance materiality below it.
  - MTP Sep 2024 S1 Q7: profit before tax as the benchmark.
  - SM p. 3.21: 5% of PBT, 1% of revenue or expenses.
- The SA 330 rows are right: tests of controls only when the assessment relies on controls; substantive procedures always.
- On 2,000 random materiality cases the aggregate and the verdict hold.
- Bars grow one per frame.
- Plain-language errors.
- Challenge answers match an independent calculation, and every question kind occurs.

**The challenge** follows the mode being explored. It asks:
- which component an event concerns, or the acceptable detection risk grade;
- an illustrative DR %;
- materiality in rupees, or "material in aggregate?" (yes / no; never within 10% of materiality).

## 2. sampling — Audit Sampling Lab (aud.evid)

**What it does.** Three modes.
- **Pick the sample.** The vouchers are drawn as a grid of at most 10 × 10: one cell per voucher up to 100, bands beyond that, up to 2,000
  vouchers. The picks are animated one by one.
  - **Random:** a random number table read in d-digit numbers (00 = 100 when the population is a power of ten). The table can be typed or
    generated. Out-of-range numbers and repeats are skipped, with the reason shown.
  - **Systematic:** interval = population ÷ sample size. The start can be given or random, with 1–4 random starts. An optional hidden
    pattern (every k-th voucher from one café) shows the Study Material's warning: one start gives all or none of the café's vouchers.
  - **Monetary unit:** the bars are voucher amounts, with the interval as a line. A table of selection points shows the cumulative range
    each rupee falls in. Vouchers at or above the interval are always picked.
  - **Haphazard:** clearly labelled as not for statistical sampling.
  - **Block:** contiguous blocks.
- **What changes the sample size.** The SA 530 Appendix factors from the Study Material (pp. 4.57–4.60) are revealed row by row, for tests
  of controls or tests of details. Then the chosen factor and its direction are highlighted, with a direction-only bar.
- **Stratify.** Groups of balances, a share-of-items vs share-of-value bar chart, and the items examined per group (rounded up), with
  totals.

**Presets (16).**
- Selection methods:
  - PYQ May 2026 Q1(b) (Ocean Ltd: 1,000 accounts / 100, from 5)
  - MTP Sep 2025 Series I, Q4–5 (100 / 20, every 5th)
  - MTP May 2025 Series II, Q3 (550 creditors, every 11th)
  - The pattern pair (one start, then two starts)
  - Monetary unit sampling on Tapri's ledger
  - RTP May 2025 Q3 (haphazard)
  - PYQ Sep 2024 Q1(b)(ii) (50 consecutive cheques)
  - PYQ May 2026 Q1(b)(iii) (the first 150 accounts)
- Sample size:
  - PYQ Jan 2026 Q2 (tolerable misstatement ₹1 lakh → ₹2 lakh)
  - MTP Sep 2024 Series I, Q8 (₹5 lakh → ₹10 lakh)
  - PYQ May 2026 Q3(a) (expected deviation 6% vs 2%)
  - PYQ Sep 2025 Q5 (reliance on controls)
- Stratify:
  - SM pp. 4.61–4.62, five groups. The counts, the values and the missing fourth-group percentage are illustrative and labelled so.
  - PYQ Sep 2024 Q1(b)(i), three groups.
- Plus a Tapri default.

**Tests (22).**
- ICAI keys checked:
  - PYQ May 2026 Q1(b): interval 10, picks 5, 15 … 995.
  - MTP Sep 2025 S1 Q5 (a): 100, 5, 20.
  - MTP May 2025 S2 Q3 (b): every 11th of 550.
  - MTP Sep 2024 S2 Q1(b): interval 10.
  - RTP Jan 2025 Q1 (c): the four methods.
  - RTP May 2025 Q3 (c): haphazard.
  - PYQ Sep 2024 Q1(b): stratified and block.
  - PYQ Jan 2026 Q2 (B) and MTP Sep 2024 S1 Q8 (a): a higher tolerable misstatement decreases the sample.
  - PYQ May 2026 Q3(a)(ii): Beta needs the larger sample.
  - PYQ Sep 2025 Q5 (C): more reliance on controls increases the sample.
- Every factor matches the Study Material, and reversing a factor reverses its effect.
- Brute-force and invariant checks:
  - Random selection is uniform over 4,000 draws.
  - 3,000 random systematic cases.
  - 1,500 random monetary unit cases, checked against a linear scan; items at or above the interval are always picked.
  - 2,000 random stratification cases.
- Block-selection errors: overlapping blocks, a block running past the end, a sample that does not divide.
- Forgiving amounts, e.g. "12,500" and "1,20,000".
- The grid never exceeds 10 × 10.
- Challenge answers match an independent working in each mode.

**The challenge** follows the mode and method being explored:
- the k-th systematic pick;
- the k-th pick from a given random number table;
- the voucher holding the k-th monetary-unit point;
- the last voucher of a block;
- the effect of a factor (three buttons);
- the total balances examined across the groups.

## 3. audit-journey — Audit Journey Lab (aud.plan, aud.complete, aud.report)

**What it does.**
- The engagement is a gantt timeline with six lanes: Acceptance, Plan and risk, Response and evidence, Completion, Report, Throughout.
  It builds a staircase with one block per Standard: SQC 1 · SA 220 → 210 → 300 → 315 → 320 → 330 → 500 → 520 → 530 → 610 → 501 → 505
  → 510 → 550 → 450 → 560 → 570 → 580 → 260 · 265 → 700 → 705 → 701 → 706 → 710 → SA 230 file (within 60 days).
- The SA 230 working-papers bar grows underneath the whole way, and a dashed mark names the current Standard.
- A "journey so far" list shows the newest step highlighted.
- Each caption gives what the auditor does and, in italics, the rule examiners test.
- SA 200 frames the opening frame.
- Steps appear only when they apply:
  - SA 510 for a first audit;
  - SA 610 with an internal audit function;
  - SA 701 for a listed company;
  - SA 705 for a modified opinion;
  - SA 706 for an emphasis of matter.
- Going concern (SM pp. 7.21–7.22): a material uncertainty that is adequately disclosed gets the separate section and an unmodified
  opinion. One not adequately disclosed forces at least a qualified opinion; the reason is stated.

**Controls.**
- Show the journey up to: a phase, or the whole journey.
- Listed / first-year audit / internal audit function / emphasis of matter toggles.
- Going concern select and opinion select.

**Presets (8).**
- Tapri, listed, the whole engagement
- PYQ Jan 2026 Q1 (a new auditor)
- PYQ Jan 2026 Q11 (a going-concern uncertainty not adequately disclosed)
- A material uncertainty adequately disclosed
- MTP May 2024 Series I, Q3.2 (up to SA 330)
- Planning only
- An emphasis of matter
- A qualified opinion

**Tests (10).**
- Order of the engagement as the spec gives it.
- The set of Standards equals exactly the January 2027 Paper 5 list (APPLICABILITY.md §3, SQC 1 included).
- Conditional steps appear only when they apply.
- The SA 570 → SA 705 logic (PYQ Jan 2026 Q11 key B).
- The rules the Suggested Answers rely on:
  - SA 580 dating (PYQ May 2026 Q1(c));
  - the SA 560 new-report date (PYQ Sep 2024 Q1(a));
  - SA 230's 60 days and 7 years (PYQ Jan 2026 Q10, SM p. 6.16);
  - SA 300 documentation of changes (RTP Jan 2026 Q1 d);
  - where Basis for Opinion goes (PYQ May 2026 Q3(b)).
- Each frame lights exactly one more block, and the documentation bar runs underneath.
- The bank of 42 scenes:
  - every answer is its step's Standard;
  - each scene has four distinct in-scope choices;
  - no scene text names its answer;
  - every in-scope Standard has a scene;
  - 14 scenes are cited to ICAI papers, and each carries the Standard of the Suggested Answer.
- The challenge picture hides the Standard numbers.

**The challenge** asks "Which Standard governs this step?" for one of 42 scenes, with four buttons. The distractors were chosen so that
no wrong option is also defensible: I checked each against the Study Material, e.g. SA 501 vs SA 315 for an inquiry of legal counsel.

## Screenshots checked

For each lab I looked at the desktop page (1440, light), dark and phone (390) shots, plus frame-by-frame previews of every mode. The
previews were made by rendering the frames' specs through tools/preview_lesson.py from a scratch file in $TMPDIR.

Fixed after looking:
- a three-option segment that overflowed (now a select);
- y axes with odd ticks (now round lakh / crore ticks);
- crowded table-control headers;
- a 10-column grid that scrolled on phones (narrow-cell rule plus no header);
- duplicate result tables;
- a gantt block label that did not fit.

## Recommended lesson embeds (not added)

**aud.risk.model**
- "How it works", after the components of audit risk:
  `::: lab audit-risk {"mode":"model","ir":"moderate","cr":"low","event":"access"}`
- "Under the hood", the formula with numbers:
  `::: lab audit-risk {"mode":"numeric","ar":5,"irp":80,"crp":50,"crp2":80}`

**aud.risk.sa320**
- "Worked examples", or "How it works" after performance materiality:
  `::: lab audit-risk {"mode":"mat","bench":"pbt","base":50000000,"pct":5,"pmPct":75,"ctPct":0,"mis":[["Repairs of machinery capitalised",1000000,""],["Work in progress overstated",2000000,""]]}`

**aud.risk.sa330**
- "How it works", at "obtain more persuasive evidence the higher the risk":
  `::: lab audit-risk {"mode":"model","ir":"high","cr":"moderate","event":"none"}`

**aud.evid.sa530**
- "How it works", selection methods:
  `::: lab sampling {"mode":"select","method":"systematic","pop":1000,"n":100,"start":5}`
- "How it works", sample-size factors:
  `::: lab sampling {"mode":"size","test":"tod","factorD":"tolerable","change":"up"}`
- "How it works" or "Under the hood", stratification:
  `::: lab sampling {"mode":"strata"}`

**aud.nature.sa200**
- "How it works":
  `::: lab audit-journey {"upto":"file"}`

**aud.plan.sa300**
- "How it works":
  `::: lab audit-journey {"upto":"plan"}`

**aud.doc.sa230**
- "How it works":
  `::: lab audit-journey {"upto":"file","initial":false}`
  The bar runs underneath every step, then the final file appears within 60 days.

**aud.report.sa700**
- "How it works":
  `::: lab audit-journey {"upto":"report","listed":true,"opinion":"unmodified"}`

## Framework gaps I hit

1. **Screenshots show only the last frame.** There is no URL parameter for a frame or for the test state, so I rendered frames through the
   lesson previewer instead. A `?frame=n` or `?test=seed` would help agents.
2. **Gantt lane order.** Lanes come only from blocks, so I used zero-width placeholder blocks to fix the lane order from frame 0; each
   draws a thin coloured tab. A `lanes: [...]` order option would be cleaner.
3. **Gantt labels.** Block labels drop silently when narrow. I used a `marks` label to name the current step.
4. **Segments overflow.** A three-option segment with long labels scrolls invisibly in the 264 px inputs column.
5. **Table controls.** Four columns crowd their headers; there is no column-width option.
6. **No dense table option.** Diagram tables have 12 px cell padding, so a 10-column grid scrolls on a phone. I added a `rowClass` hook
   with one rule in labs.css. A `dense: true` table option would avoid lab CSS.
7. **Inputs stay visible while testing.** So "name the method" questions are impossible when the method is an input; the questions ask
   for computed items instead.
8. **`challenge.gen(rng)` gets no values.** Following the explored mode needs a module-level `lastMode` set in `compute`. The framework
   header mentions this but LAB_GUIDE.md does not.
9. **The leak test reads table numbers.** Any test view with voucher numbers in cells counts as a leak, so challenge views avoid numbered
   grids (null or neutral views).
