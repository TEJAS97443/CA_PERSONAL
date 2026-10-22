# lab-s1 report: bcg-ge, ansoff-adl, five-forces, spot-strategy

All four labs are **ready** in content/labs.json. Each has its own test file, and each passes the shared `labs-` tests: the only failure there is
the blurb-length check, and it is caused by other jobs' labs (dividend, wacc, capbud). `build.py --check` and `build.py` are clean for my files.
Screenshots checked for every lab: desktop 1440 light, dark, and phone 390. I also checked lesson-embed (compact) mode with a harness page
that mounts `GA.lab.mount(..., {compact: true})`, because tools/preview_lesson.py does not mount labs.

Files: app/js/labs/{bcg-ge,ansoff-adl,five-forces,spot-strategy}.js and tests/lab-{bcg-ge,ansoff-adl,five-forces,spot-strategy}.test.js.
The only CSS is one block in app/css/labs.css under `/* lab: spot-strategy */`. It uses tokens only, so the CSS ratchet still passes.

## 1. bcg-ge — Portfolio Matrices Lab (21 tests)
- **What it does.** BCG mode puts SBUs on the matrix as bubbles sized by revenue. High share is on the left, as in the SM figure, on a log
  scale around the cut-off. Each SBU gets two frames: first its relative share is worked out (own share ÷ largest rival's share) and its
  growth is compared with the line, with dashed guides; then it is placed in its quadrant with the strategy and the reason. The last
  frame shows the whole portfolio and how cash flows between the quadrants. GE mode is the nine-cell stop-light grid exactly as the SM
  figure on p. 4.31. Each SBU's row is highlighted, then its cell, with the zone wording from SM 4.4.4.
- **Controls.** Matrix (BCG / GE); share given as own and rival % or as a relative share (×); SBU table; high-growth line (default 10%);
  high-share line (default 1×). For GE: SBUs with attractiveness and strength as words or as 1–5 scores (in thirds), plus revenue.
- **Presets.** Tapri's four businesses (BCG and GE); SM Test Your Knowledge Descriptive Q2 (Soorya Ltd., data); BrewBucks with relative
  shares; RTP January 2025 Q13 (InnovaTech); RTP September 2026 Q14 (EcoBuild); scores-based Tapri ideas.
- **Tests.**
  - BCG answers: Soorya A/B/C/D (SM answer p. 4.47; the split holds for any growth line from −9% to +10%); Coufix is a Star (SM p. 4.29);
    PYQ January 2025 Q5(c) "Say no to Sugar" is a Star, Build or Hold; strategy pairing from RTP May 2026 Q14 / MTP January 2025 Series II;
    RTP May 2026 MCQ 1(iv); RTP May 2024 Q13; MTP May 2026 Series II MCQ (A)(i).
  - GE answers: all nine SM cells; PYQ September 2025 MCQ 16; PYQ May 2026 MCQ 16 (the two dimensions); RTP January 2025 Q13.
  - Brute force: 2,000 random portfolios, where the quadrant matches an independent rule and every bubble is drawn on the correct side of
    both lines; % and × modes agree. GE: the zone equals the rule "row + column ≤ 1 green, 2 yellow, ≥ 3 red" on every cell and on 1,000
    random scores, and every bubble lands inside its cell.
  - Also checked: frame counts, forgiving inputs ("1,250", "₹ 420"), error messages, and that challenge problems have one answer and a
    blank test picture.
- **Two ICAI points the lab states openly.**
  - The SM lists Build/Hold/Harvest/Divest without pairing them with quadrants. The lab uses ICAI's pairing: Question marks → **Hold**
    (as in the suggested answers), and the caption adds the SM line about turning question marks into Stars.
  - **RTP September 2026 Q14 conflicts with the SM figure.** For medium strength with low attractiveness, the RTP answer says "Yellow
    Zone", but in the SM figure that cell is red Harvest/Divest. The lab draws the SM cell and shows an "Exam note" remark.
- **Embeds** (block form `::: lab … {…}` then `:::`).
  - sm.choice.portfolio, *How it works* (BCG): `::: lab bcg-ge {"mode":"bcg"}`
  - Same lesson, *Worked examples* (Soorya): `::: lab bcg-ge {"mode":"bcg","shareMode":"pct","cutGrowth":10,"cutShare":1,"units":[["A",6,80,20,15],["B",4,40,60,10],["C",2,60,40,-20],["D",0.5,5,95,-10]]}`
  - Same lesson, *How it works* (GE part): `::: lab bcg-ge {"mode":"ge"}`
  - Same lesson, *Exam angle* (the RTP trap): `::: lab bcg-ge {"mode":"ge","geUnits":[["EcoBuild division","Low","Average",0]]}`

## 2. ansoff-adl — Ansoff and ADL Lab (15 tests)
- **What it does.**
  - Ansoff: each move takes three frames: the product question (column highlighted), the market question (row highlighted), then the
    move as a numbered dot in its cell, with the SM definition and a legend table that fills row by row. The last frame adds SM Table 3
    (the product-market expansion grid).
  - ADL: the full 4 × 5 strategic condition matrix, copied from the SM figure on p. 4.26. I read it from the rendered PDF page because the
    text layer scrambles it. Frames go: the matrix, the stage column, the position row (with the SM definition), the cell in its figure
    colour, then the strategy list. The list comes before the matrix so that lesson embeds show it.
- **Controls.** Matrix (Ansoff / ADL); a moves table (move, product existing/new, market existing/new); business name; competitive
  position; stage of industry maturity.
- **Presets.** Tapri's five moves; SM Test Your Knowledge Descriptive Q4 (four cases); SM 4.4.1 Gucci ×4; RTP September 2025 MCQ 5;
  PYQ September 2025 MCQ 14 (Bio Cure); MTP May 2026 Series II (InnovateCo EV, "Dominant"); two Tapri ADL cases.
- **Tests.**
  - ICAI answers: SM Descriptive Q4 answers (p. 4.49); Gucci ×4 including "new designs = penetration"; RTP September 2025 MCQ 5 (a);
    PYQ September 2025 MCQ 14 (B), Strong × Mature; MTP May 2026 Series II (A)(ii) (b).
  - ADL cells match the figure, with strategy counts checked cell by cell. The colours follow an exact rule: green if position index +
    stage index ≤ 3, orange at 4, red from 5.
  - Brute force: 1,000 random move lists, and every dot lands in the right quadrant.
  - Challenge: one right choice per problem, and ADL distractors are never near-synonyms of a correct strategy (for example Withdraw vs
    "Niche or withdraw", Defend vs "Defend position"). The Ansoff test inputs show "?" rather than the answer.
- **Embeds.**
  - sm.choice.ansoff, *How it works*: `::: lab ansoff-adl {"mode":"ansoff"}`
  - Same lesson, ADL part: `::: lab ansoff-adl {"mode":"adl","unit":"Bio Cure","pos":"strong","stage":"mature"}`
  - Same lesson, *Worked examples*: `::: lab ansoff-adl {"mode":"ansoff","moves":[["Toothpaste: brush twice a day","existing","existing"],["Hotel giant enters dairy","new","new"],["UV maker goes abroad","existing","new"],["Auto maker: ungeared scooters","new","existing"]]}`
  - sm.choice.growth, *How it works* (intensification, Table 3): `::: lab ansoff-adl {"mode":"ansoff","moves":[["Gucci: new designs in Europe","existing","existing"],["Gucci: luxury clothing in China","existing","new"],["Gucci: casual clothing in Europe","new","existing"],["Gucci: casual clothing in China","new","new"]]}`

## 3. five-forces — Five Forces Lab (18 tests)
- **What it does.**
  - The five-forces diagram is drawn as the SM figure: entrants above, substitutes below, suppliers left, buyers right.
  - Each force's SM drivers are ticked one per frame, using the case's own words, and a table fills in as they are ticked. Then the force
    is rated, with "what holds it back" for the drivers that are absent.
  - Last frame: Step 2 and Step 3. A summary table, the strongest force, and the industry verdict, with the SM line that attractiveness
    is relative.
  - A force the case does not describe is marked "not stated" and left out of the rating. This follows ICAI's own "no information
    relating to …" answers.
- **Rating convention (stated in the note).** The SM rates forces "fierce, strong, moderate to normal, weak" without a formula, so the lab
  uses the share of a force's drivers present: none → weak, up to a fifth → moderate, up to half → strong, more → fierce. The industry is
  unattractive if any force is fierce or the average is ≥ 1.5; attractive if the average is < 1 and nothing is strong; moderately
  attractive otherwise. Patents were added as an entry barrier because ICAI's RTP September 2024 answer uses them.
- **Controls.** An industry case select. "Your own industry" reveals 28 driver toggles, prefilled from the last case viewed.
- **Presets.** Tapri vs BrewBucks cafés; Indian airlines; RTP September 2024 Q10 (Rajiv Arya's vacuum cleaners); RTP September 2026 Q9
  (SwiftDeliver); RTP May 2026 MCQ 1(iii) (EcoRide budget scooters); an empty custom industry.
- **Tests.**
  - Driver lists: the five areas (PYQ January 2026 Q8(a)); the seven barriers (PYQ September 2024 Q8(a), MTP January 2026 Series II);
    the six rivalry conditions (PYQ January 2025 Q8(a), RTP January 2026 Q10).
  - Case results: SwiftDeliver's four observations map to entrants, suppliers, substitutes and buyers; buyers and suppliers come out
    strong, and the verdict is "unattractive", matching ICAI's "highly competitive". Rajiv Arya: rivalry is the strongest force,
    entrants and suppliers are weak, buyers are not stated.
  - ICAI MCQs: EcoRide (c); RTP May 2026 MCQ 3, OLED screens → suppliers (c). The SM substitute examples (coir, alternatives to stocks)
    are also checked.
  - Brute force: 3,000 random driver sets checked against an independent re-implementation of the rule. Monotonicity: adding a driver
    never weakens a force or improves the verdict.
  - Also checked: the case/toggle sync, and the challenge. In the challenge, "which force?" facts leave out ambiguous drivers, and
    "strongest" sets are unambiguous on any scale (more than half for one force, at most a fifth for the others).
- **Embeds.**
  - sm.ext.porter, *How it works*: `::: lab five-forces {"case":"cafes"}`
  - Same lesson, *Worked examples*: `::: lab five-forces {"case":"vacuum"}` and `::: lab five-forces {"case":"swift"}`
  - Same lesson, *Exam angle*: `::: lab five-forces {"case":"airlines"}`

## 4. spot-strategy — Spot the Strategy Lab (9 tests, each looping over all 66 cases)
- **What it does.** A case card with clue words marked one by one, the newest ringed, and a caption saying what each clue tells you. The
  last frame gives the answer, the reason and the source, plus an options table with the SM's own definitions and the answer
  highlighted. There are 10 families: generic strategies, Ansoff, integration/diversification, corporate strategies, retrenchment,
  Mendelow, strategy levels, PLC, SWOT and BCG. **TOWS is not in the current Study Material, so I used SWOT quadrants instead.**
- **Controls.** Concept (any, or one family); case, grouped by family (choosing either list keeps the other in step).
- **Cases.** 66 in total; 50 are ICAI's: 31 from RTPs, MTPs and past papers, 19 from the SM's own examples and Test Your Knowledge. The
  other 16 use the Tapri cast. Every ICAI answer is pinned in the test against its source, for example RTP September 2026 Q13 Elite
  Motors (focused differentiation), PYQ May 2026 Q5(b) Pearl India and Q5(c) MM tyres, MTP May 2025 Series II (EcoTrend, BudgetBazaar,
  VogueVista), PYQ May 2025 Q5(c) MaAi 2023/2024, RTP September 2026 MCQs 1(ii), 2 and 5, PYQ September 2025 MCQ 13, and RTP September
  2025 MCQs 2, 4, 5 and 6.
- **Presets.** Eight: five from ICAI papers, three Tapri cases.
- **Tests.**
  - Every clue phrase is really in its text, and no two clues overlap.
  - No case text or title names its answer.
  - The marks never change the words, and HTML is escaped.
  - Frames: plain card, then one per clue, then the answer table.
  - The family and case lists stay in sync.
  - Challenge: every family draws only its own cases, with one right choice and an unmarked card.
- **Embeds.**
  - sm.int.generic, *Worked examples*: `::: lab spot-strategy {"fam":"generic","case":"g-elite"}`
  - Same lesson, *Practice*: `::: lab spot-strategy {"fam":"generic","case":"g-budget"}`
  - sm.int.stakeholders, *Worked examples*: `::: lab spot-strategy {"fam":"mendelow","case":"m-green"}`
  - Same lesson, *Under the hood* (quadrant moves): `::: lab spot-strategy {"fam":"mendelow","case":"m-gst"}`
  - sm.int.swot, *How it works*: `::: lab spot-strategy {"fam":"swot","case":"s-brand"}`
  - sm.choice.retrench, *Worked examples*: `::: lab spot-strategy {"fam":"retrench","case":"r-maai23"}` and `::: lab spot-strategy {"fam":"retrench","case":"r-maai24"}`
  - Same lesson, *Worked examples* (stability): `::: lab spot-strategy {"fam":"corporate","case":"c-mm"}`
  - Optional, not in the "embed in" column: sm.intro.levels `{"fam":"level","case":"l-rohan"}`; sm.ext.industry `{"fam":"plc","case":"p-intro"}`;
    sm.choice.growth `{"fam":"integration","case":"i-gho"}`; sm.choice.portfolio *Practice* `{"fam":"bcg","case":"b-sugar"}`.

## Framework gaps I hit (worked around, not fixed)
1. `plot` has no bubble size and no reversed axis. I drew BCG, GE, Ansoff and five forces with `shapes`. Those are not re-laid-out on
   phones, so I sized them to about 410 px to fit a 390 px phone at GA.fit's 80% floor.
2. The table cell classes `tc-*` also make text bold, so highlighting a whole row or column turns it bold. There is no amber `tc-warn`;
   I used `hl`.
3. The locked inputs stay visible during a test and can give the answer away. I worked around it by hiding toggles while a problem is
   asked (five-forces) and using "?" placeholders (ansoff). A framework option to hide inputs in the test state would help.
4. A select cannot filter its options by another control, so I keep the family and case lists in step through `show()`.
5. `notesOf` splits a sentence after an abbreviation such as "Arthur D. Little". I reworded around it.
6. tools/preview_lesson.py does not mount labs, so compact embeds can only be checked with a custom harness.
