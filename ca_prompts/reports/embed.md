# embed report: lab embeds in PassBook lessons (2026-10-20)

**157 embeds in 77 lessons, covering all 30 labs.** Every lesson in the ten lab reports' recommendations is now embedded, and none is
pending. While the job ran, the reviewers of the last open batches reported done: r-a02, r-a15, r-a16, r-f03, r-f09, r-s01 and r-s02.
I took the per-lesson lock for every edit and dropped it after lint.

How each embed is written:
- `::: lab <id> {cfg}` + **one** caption sentence + `:::`. The caption is the line the lesson page shows under the lab's name.
- It is placed right after the paragraph, table or diagram it illustrates, as a top-level block, never inside an example or answer.
- The front-matter `labs:` line lists the ids used, and it agrees with the body in all 77 lessons.
- No other text in any lesson was changed.

## Lessons embedded (lesson → labs, number of embeds)

| Paper 4 | labs | n |
|---|---|---|
| cma.mat.eoq | eoq | 2 |
| cma.mat.levels | eoq | 2 |
| cma.mat.issues | stores-ledger | 2 |
| cma.mat.receipts | stores-ledger | 2 |
| cma.emp.incentives | incentives | 2 |
| cma.emp.turnover | incentives | 2 |
| cma.oh.primary | oh-distribution | 2 |
| cma.oh.secondary | oh-distribution | 3 |
| cma.oh.absorb | oh-distribution | 2 |
| cma.abc.concept | abc | 1 |
| cma.abc.compute | abc | 2 |
| cma.sheet.mfg | cost-sheet | 2 |
| cma.sheet.quote | cost-sheet | 1 |
| cma.proc.accounts | process | 3 |
| cma.proc.eu | process | 3 |
| cma.joint.apportion | joint | 3 |
| cma.joint.further | joint | 2 |
| cma.joint.byprod | joint | 2 |
| cma.sys.recon | recon | 3 |
| cma.std.material | variance | 2 |
| cma.std.labour | variance | 2 |
| cma.std.voh | variance | 1 |
| cma.std.foh | variance | 2 |
| cma.std.recon | variance | 1 |
| cma.bud.flexible | budget | 3 |
| cma.bud.cash | budget | 2 |
| cma.bud.functional | budget | 2 |
| cma.mc.basics | cvp | 1 |
| cma.mc.bep | cvp | 2 |
| cma.mc.charts | cvp | 3 |
| cma.mc.multiproduct | cvp | 2 |
| cma.mc.absorb | cvp | 2 |
| cma.mc.keyfactor | key-factor | 2 |
| cma.mc.decisions | key-factor | 2 |

| Paper 5 | labs | n |
|---|---|---|
| aud.risk.model | audit-risk | 2 |
| aud.risk.sa320 | audit-risk | 1 |
| aud.risk.sa330 | audit-risk | 1 |
| aud.evid.sa530 | sampling | 3 |
| aud.nature.sa200 | audit-journey | 1 |
| aud.plan.sa300 | audit-journey | 1 |
| aud.doc.sa230 | audit-journey | 1 |
| aud.report.sa700 | audit-journey, audit-opinion | 2 |
| aud.report.sa705 | audit-opinion | 3 |
| aud.report.sa706 | audit-opinion | 2 |
| aud.report.sa701 | audit-opinion | 1 |
| aud.complete.sa570 | audit-opinion | 1 |
| aud.ethics.independence | threats | 2 |
| aud.ethics.principles | threats | 2 |
| aud.bank.advances | npa | 3 |

| Paper 6A | labs | n |
|---|---|---|
| fm.capbud.payback | capbud | 2 |
| fm.capbud.npv | capbud | 2 |
| fm.capbud.irr | capbud | 3 |
| fm.coc.debt | wacc | 3 |
| fm.coc.equity | wacc | 2 |
| fm.coc.wacc | wacc | 2 |
| fm.div.models | dividend | 3 |
| fm.lev.leverage | leverage | 3 |
| fm.cs.ebiteps | leverage | 2 |
| fm.cs.theories | cap-structure | 3 |
| fm.wc.basics | working-capital | 2 |
| fm.wc.estimate | working-capital | 2 |
| fm.wc.receivables | working-capital | 2 |
| fm.wc.cash | working-capital | 1 |
| fm.ratio.liquidity | ratios | 2 |
| fm.ratio.activity | ratios | 1 |
| fm.ratio.profit | ratios | 3 |
| fm.ratio.prepare | ratios | 2 |

| Paper 6B | labs | n |
|---|---|---|
| sm.choice.portfolio | bcg-ge | 3 |
| sm.choice.ansoff | ansoff-adl | 3 |
| sm.choice.growth | ansoff-adl, spot-strategy | 2 |
| sm.choice.retrench | spot-strategy | 3 |
| sm.ext.porter | five-forces | 3 |
| sm.ext.industry | spot-strategy | 1 |
| sm.int.generic | spot-strategy | 2 |
| sm.int.stakeholders | spot-strategy | 2 |
| sm.int.swot | spot-strategy | 1 |
| sm.intro.levels | spot-strategy | 1 |

## Lessons pending

None.

- **Exemplars.** The two exemplar lessons, cma.mc.bep and aud.report.sa705, have no reviewer job. They are embedded because their writer
  job (ex) is done and no agent held their locks. Re-run me if you meant them to wait for a review.
- **Optional embeds.** The labs' "also useful" recommendations were added too: aud.report.sa701, aud.complete.sa570, sm.choice.growth
  (spot-strategy), sm.intro.levels and sm.ext.industry.

## Configs

**No config was changed.** All 165 recommended configs were computed in Node the way an embed mounts them (`L.prepare(def, defaults ∪ cfg)`
then `def.compute`). Every one computes, and none has a key that is not a control id.

**Not used**, because a lesson takes at most 3 embeds:
- fm.cs.theories: the NI, NOI and MM 1958 configs. I kept traditional, arbitrage and MM with tax; the mode select still reaches the rest.
- aud.bank.advances: borrower-wise and crop loan. I kept cash credit (MTP Sep 2024), the term-loan ladder (Jan 2026) and erosion.
- sm.choice.portfolio: GE default. I kept BCG, Soorya Ltd. and the RTP Sep 2026 EcoBuild trap.
- sm.ext.porter: airlines. I kept cafés plus the two ICAI RTP cases.

**Placed outside the report's suggested section**, where the lesson's own paragraph is:
- recon "fin" layout: Under the hood, as suggested.
- npa erosion and the Mendelow GST move: How it works, beside the lesson's erosion and quadrant-move text (suggested: Under the hood).
- Soorya: Under the hood, after the lesson's Soorya discussion (suggested: Worked examples).
- key-factor make-or-buy and shut-down: after the lesson's own make-or-buy and shut-down worked examples.
- spot-strategy g-budget: Practice, after the quiz.

**Captions.** They name the ICAI question where a config reproduces one ("Here is May 2024 Q4(a)…"). I added no "the lab's preset …"
sentences to worked examples.

## Checks

- **In the real app** (a CDP script mounts each embed in `index.html#/l/<id>` at Deep depth, `?fold=open`): all **157 embeds** at **390
  and 1440 px**.
  - Every one mounted in compact mode, with no "Lab not found" and no lab error.
  - Each opens on its **final frame** (scrubber at max).
  - Nothing is wider than the lesson column.
  - The probe's only "clipped" item on any page is the sticky section-bar title, which is meant to be ellipsed.
- **Screenshots.** I looked at 19 crops across all four papers (ledger, overheads, process, variance tree, CVP chart, sampling grid, opinion
  tree, NPA, threats, cap-structure, EBIT-EPS, ratios build, NPV profiles, BCG, five forces, spot-strategy). All were correct, legible and
  matched the ICAI figures.
- **Lint and build.** Lint is clean on all 77 lessons, `build.py --check` gives 0 errors, and `build.py` writes data.

## Problems and warnings

1. **Word-count warning on aud.bank.advances: 6,065 words against the 6,000 cap.** The lesson was at 5,989 before. `words()` in
   tools/buildlib/lessons.py strips `::: diagram` blocks but counts the JSON keys of a `::: lab` line, so even one embed pushes this lesson
   over. One-line fix for the owner: skip `::: lab` containers in `words()` as diagrams are.
2. **The originality sweep dropped two of my embeds, and I restored them.** osweep-c1 rewrote the worked examples they followed:
   - cma.mat.eoq: the PYQ May 2024 discount embed;
   - cma.joint.apportion: the Study Material Illustration 4 embed.

   Sweeps are still editing aud/fm/sm lessons. Please tell sweep agents to keep `::: lab` blocks. I re-counted at the end and all 157 were
   present: `/tmp/embedjob/count.sh` (expected counts in `/tmp/embedjob/expected.txt`).
3. **Tests.**
   - `node tests/run.js` (all) **crashes** at lab-ansoff-adl. The kit job's new test in tests/diagram.test.js (the lint container-fence test)
     requires tools/lint_content.js, whose top line sets `globalThis.GA = {}`. That wipes `GA.util` for every later test file in the same
     process.
   - Run file by file: 1,601 passed, 2 failed. Both failures are bank-data tests, not lessons or labs: home P3-46 (question of the day) and
     settings "keyed papers".
4. **Smoke.** tools/smoke.py: 339 passed, 2 failed, both "open states: n-p4-pyq-sep2026-m1 shows its ICAI answer (no answer fold)". This is
   a September 2026 question with no published answer (bank-core). Every lab check passes.
5. **Things that look odd but work as designed.**
   - Most compact embeds clip their drawing under "Show the whole drawing". This is the framework's 700 px embed budget.
   - The EcoBuild "exam note" sits under "Show the numbers", and its caption says so.

**Tool for re-checks:** `node --experimental-websocket /tmp/embedjob/embedshot.js <width> <outdir> <lesson ids…>`. It mounts every embed in
the real app, reports mounted / final frame / overflow / probe, and writes one PNG crop per embed.
