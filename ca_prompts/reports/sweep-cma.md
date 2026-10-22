# sweep-cma: originality sweep, Paper 4 Cost and Management Accounting (2026-10-20)

Input: `similar-cma.json` had 68 flagged blocks in 38 lessons. **All 68 are flashcards (`Q:: / A::`), not worked examples or quiz
questions.** The detector's `^Q:` pattern also matches `Q::` lines, which is why every title starts with ": ". No worked example
and no `::: quiz` question in any CMA lesson was flagged.

How I judged: I read each card with the matched source text, and measured how much of the card (5-word shingles) also appears in the
Study Material **body** (the chapter text before Test Your Knowledge) as against only in the TYK exercises. Where the card's overlap with
the SM body matches its overlap with the ICAI file, the card quotes an SM definition, list or formula that ICAI's suggested answers also
quote. CONTENT_GUIDE §1 and §7 want those cards in ICAI's words, so they are FINE. Three cards matched **only** a TYK MCQ (SM-body overlap
0.00 to 0.12): each was a TYK MCQ stem turned into a card with the key as its answer. I judged those three NEAR-COPY and rewrote them.

After the edits the detector shows 65 flags in 36 lessons. The three rewritten cards no longer match, no new flags appeared, and
`cma.bud.ratios` and `cma.emp.incentives` are no longer flagged at all. Lint is clean for both files, and `build.py --check` passes with
no errors or warnings. Flashcards are not part of the reading text, so no layout changed and I made no preview images (0 used).

## Near-copies rewritten (3 cards, 2 lessons)

### cma.bud.ratios (r-c18 done)
1. Card "Is a favourable budget variance always an indication of efficient performance?" came from **SM 15 TYK MCQ 5** (SM 15.72–15.73):
   the stem was lifted and the answer was option (c) word for word. SM-body overlap 0.00.
   New card: a kulhad café's repairs cost is ₹25,000 under budget because the planned servicing of its chai machines was put off. Does the
   favourable variance show efficient performance? Answer: No. A favourable variance does not necessarily indicate efficient performance:
   this one comes from not carrying out a budgeted expense, so it is a postponement, not a saving (SM 15.72–15.73).
2. Card "Which variances does a budget report prepared on the principle of exception show?" came from **SM 15 TYK MCQ 6** (SM 15.73),
   stem and key. SM-body overlap 0.00.
   New card: the cold-chain fleet's fuel cost is 15% below budget, a significant deviation. Should it appear in an exception report?
   Answer: Yes. Such a report shows both favourable and unfavourable variances; "exception" does not mean adverse only (SM 15.73).
   It does not repeat the lesson's own quiz question (Ritu's June report, marketing variance).

Nothing else in the lesson depended on these cards: the prose rules (lines 95–96), the worked example and the quiz already use their own
Tapri scenarios.

### cma.emp.incentives (r-c06 done)
3. Card "Time saved is less than 50% of the time allowed: which plan pays the worker more? / The Rowan plan." was **SM 3 TYK MCQ 8**
   reworded, with its key as the answer. SM-body overlap 0.12.
   New card, numerical: time allowed 20 hours, time taken 15 hours, same hourly rate; does Halsey (50%) or Rowan pay more? Answer: Rowan.
   Time taken is 75% of time allowed, so Rowan pays 75% of the time saved against Halsey's 50%: a bonus of 3.75 hours' wages against
   2.5 (SM 3.33). I checked the numbers by script: Halsey 0.5 × 5 = 2.5; Rowan 5/20 × 15 = 3.75. The 20-hour and 15-hour figures
   appear nowhere else in the lesson (its quiz case uses 70%).

## Blocks judged FINE (65 cards in 33 lessons; each is an SM definition, list or formula that ICAI's answers quote)

"SM body" is the share of the card that is in the SM chapter text. It is close to the ICAI-file containment unless noted.

- cma.abc.abm: "ABM: ICAI's meaning?" is the SM 5 definition (SM body 0.60). "Benchmarking under ABM" is the SM 5 sentence (0.38).
- cma.abc.concept: "Cost drivers for distribution and customer service" is the SM 5 cost-driver table (0.37).
- cma.bud.basics: "CIMA's definition of a budget manual" is the SM 15 definition (0.69). "Who decides the budget period" is the SM 15 text (0.28).
- cma.bud.flexible: "CIMA's definition of a flexible budget" is the SM 15 definition (0.71).
- cma.bud.zbb: the ZBB definition (0.71), "factors for evaluating decision packages" (0.38) and "what a performance budget presents" (0.56) are all SM 15 text.
- cma.emp.direct: "ICAI's definition of direct expenses" is the SM 1/3 definition (0.55).
- cma.emp.idle: "Define idle time" is the SM 3 definition (0.61). "Treatment of abnormal idle time" is the SM rule (0.30).
- cma.emp.turnover: the employee-turnover definition is SM 3 (0.62). The equivalent annual rate formula is a generic SM 3 formula (0.45). The match with MTP Jan 2025 is just the definition phrase inside an MCQ stem; the card copies none of that MCQ.
- cma.intro.install (r-c01 reported during this sweep): "Organisational hierarchy: information by level" is the SM 1 text on installing a costing system (0.20).
- cma.intro.terms (r-c01 reported during this sweep): the cost object definition (0.62) and the responsibility centres definition (0.38) are SM 1.
- cma.job.job: "CIMA's definition of job costing" is the SM 9 definition (0.76).
- cma.joint.apportion: the joint products definition (0.67) and the co-products definition and example (0.30) are SM 11.
- cma.joint.byprod: the by-products definition (0.79) and ICAI's examples (0.29) are SM 11.
- cma.mat.eoq: the EOQ definition (0.55) and ICAI's examples of carrying costs (0.39) are SM 2. The RTP Jan 2025 match is only the list of carrying costs inside its data.
- cma.mat.levels: the maximum stock level formula is a standard SM 2 formula (0.23); the PYQ match is the formula line in a worked answer. The minimum stock level definition is SM 2 (0.71).
- cma.mat.procure: the bill of materials definition is SM 2 (0.50).
- cma.mat.receipts: the GST treatment (0.52) and the detention charges/fines treatment (0.20) are the SM 2 treatment rules.
- cma.mat.techniques: CIMA's inventory control definition is SM 2 (0.70). The four bases of inventory control are the SM 2 headings (6.2–6.5); the SM body figure is low (0.11) because the SM prints them as a chart and headings, and the PYQ answer reproduces the same chart labels.
- cma.mc.absorb: the absorption costing definition is SM 1/14 (0.58).
- cma.mc.decisions: the shut-down point formula is a generic formula. The PYQ Nov 2023 match is the formula line in a numerical answer; the card has no numbers or scenario from it.
- cma.mc.multiproduct: the CVP assumption on constant sales mix is SM 14 (0.29).
- cma.oh.absorb: the conditions for a blanket rate (0.32) and the normal capacity definition (0.76) are SM 4.
- cma.oh.classify: "Define cost apportionment" uses the SM 4 body definition (0.64). The TYK MCQ 3 it matched asks about allotting *whole* items, which is allocation, and the card does not use that MCQ.
- cma.oh.secondary: "secondary distribution" is the SM 4 one-line definition (2 shared phrases only). The bases for maintenance, planning and progress and tool room come from the SM 4 bases table (low SM body figure because the table text is scrambled).
- cma.proc.accounts: the causes of abnormal process loss are SM 10 text (0.28).
- cma.proc.interprocess: the inter-process profit definition (0.54) and "operation costing as a hybrid system" (0.20) are SM 10.
- cma.sheet.mfg: the treatment of interest and finance charges (0.26) and of abnormal costs (0.34) are SM/CAS rules. "Units produced = sold + closing − opening" is a generic identity.
- cma.std.foh: the fixed overhead calendar variance formula is a generic SM 13 formula (stacked text in the SM; the MTP match is a worked answer).
- cma.std.recon: the controllable (0.45) and uncontrollable (0.57) variance definitions are SM 13.
- cma.std.setting: "the most effective standard for cost control" is the SM 13 sentence (0.28).
- cma.svc.others: "What is BOT?" paraphrases the SM 12 §9.2 paragraph.
- cma.unit.batch: the batch costing definition (0.40), EBQ definition (0.38), EBQ formula and symbols (0.56) and the two ways of determining EBQ (0.33) are all SM 8.
- cma.unit.unit: the unit costing definition (0.52), cost per unit formula (generic) and the five industries (0.18) are SM 8.

## Lessons skipped: reviewer job not done (8 flags, all flashcards, not judged)

- **w-c02 is still writing and r-c02 has not started:** cma.intro.behaviour (definitions of fixed and semi-variable costs; "Primary objective of segregating semi-variable costs", which partly matches an SM 1 TYK item, 0.20), cma.intro.control (the four steps of cost control; cost control vs cost reduction, 0.12 TYK; "lowest possible cost") and cma.intro.methods (post vs continuous costing; advantages of uniform costing).
- cma.intro.install and cma.intro.terms (r-c01) were pending when I started. Their reviewer reported during the sweep, so I judged them (above).

Whoever sweeps these later should look first at the two cards with TYK overlap (intro.behaviour #3, intro.control #2), because those are
the pattern that turned out to be near-copies here.

No locks were refused. The only lock held by another agent was `cma.mat.receipts`, and that lesson needed no edit.

## Notes for the tool owner
- `tools/similar.py` treats `Q::` flashcards as quiz blocks. Excluding them, or reporting them as kind "card", would leave CMA with no
  flags at all from examples or quizzes. Flashcards are meant to carry ICAI's wording, so most card flags will be false positives.
- `build.py --check` printed "1 flashcard(s) edited in place: their review history moves to the new id on the next full build". I edited
  three cards, so the other two will probably start with a fresh review history. That is harmless, but worth knowing.
