# Lab embeds to add (collected from lab reports; the embed job adds them after the lessons are reviewed)
See reports/lab-*.md "Recommended embeds" sections. Done labs so far: lab-c5 (cvp, key-factor).
Known shared test failure (not lab-c5): labs- blurb-length test (npa 121 chars; dividend, leverage earlier) — owners to fix; recheck in QA.
lab-c4 done (variance, budget).
lab-a2 done (audit-opinion, threats, npa).
lab-s1 done (bcg-ge, ansoff-adl, five-forces, spot-strategy).
lab-f1 done (capbud, wacc, dividend).
lab-a1 done (audit-risk, sampling, audit-journey).
lab-c1 done (eoq, stores-ledger, incentives). QA: labs- shared test reported dividend shows answer while asking; capbud/wacc blurbs (fixed?)
lab-c3 done (process, joint, recon).
lab-f2 done (leverage, cap-structure, working-capital, ratios). QA: insights.test.js 'no global hook' failure reported.
lab-c2 done (oh-distribution, abc, cost-sheet). ALL 30 LABS READY 2026-10-20 ~04:40.
## Framework follow-ups (lab-kit job, integration phase)
- data-lab="<id>" on the mounted lab root for CSS scoping (labs styled tables by control name and clashed)
- per-challenge tolerance / answer kinds (₹ total vs rate; amount + F/A)
- challenge.gen(rng, values) should receive current values/mode
- embeds: scroll the highlighted row into view in tall tables; a route/tool to preview an embed (shot of /l/<id> with labs mounted)
- shot.sh: open a given frame / test state via URL
- preset citations recognise ICAI ids (build says "0 cite a past paper")
- Given line: Indian digit grouping; answer-leak check with Indian grouping
- flow: edge colours, shared end nodes overlap, 3-line labels overflow; tree multi-line notes overlap; seq long text on first lane
- plot: free text labels, bubble sizes, reversed axis, stacked/horizontal bars, more point-label positions
- shot.sh/app: param to open all answer folds for phone checks; flows: process boxes wider than labels on phones
- lint: detect wrongly nested containers (renders raw text); waterfall chart type; 5-col tables overflow at 390px
- accounts: cols halves only ~267px inside example answers on desktop; consider a T-account renderer or breakout width (lesson column) — QA
- cols accounts: Dr/Cr totals don't align when sides have different row counts (T-account renderer)
- QA: phone-check cma.abc.*, cma.sys.* (r-c09 died before its final phone check)
- cast: 'Tapri Express' used for two things (delivery app in a lesson vs railway kiosks in spot-strategy lab); 'Kulhad Crafts Ltd' figures differ across FM lessons — QA consistency
- QA ORIGINALITY SWEEP: automated similarity check of every lesson example/quiz vs ICAI question texts (numbers multiset + 6-gram overlap), then agents fix flagged near-copies (many found in early batches)
- cast: Pinky's firm 'Mehra Masala Traders' (basics, SA 510) vs 'Mehra Mithai & Sons' (aud.ethics.sa210): unify in QA
- build.py writes no data when any lesson errors; shot.sh then silently shows a fallback page: make build failure visible / per-lesson isolation (kit/QA)
- shot.sh probe times out on full-length pages: raise its time limit (QA)
- QA: home 'question of the day' test (P3-46) fails (reads PYQ data)
- QA: n-p5-pyq-may2026.md marked checked but check.py showed one marks mismatch (09:10) — re-run check.py on all checked files in QA
- app: unpublished-answer papers show source footer 'Suggested Answers' for the question scan — QA wording fix
## From the embed job (done 10:40: 157 embeds in 77 lessons, all 30 labs)
- word count includes `::: lab` JSON lines (diagrams are skipped): skip lab blocks in the lesson word counter (aud.bank.advances 6,065)
- full `node tests/run.js` crashes: tests/diagram.test.js loads tools/lint_content.js which resets the shared app object for later test files
- smoke: n-p4-pyq-sep2026-m1 (unpublished answers) shows no answer after Show answer: the app must say "ICAI has not published the answers yet"
- exemplars cma.mc.bep and aud.report.sa705 had no reviewer job: consider a review (QA spot check)
- check.py: MARKS_SUM should accept '(1 + 3 Marks)' without '= N'; lone first-line number in a fraction treated as page number (send to bank-tools)
- bank figures: data/figs/<doc>/ now built (checked 12:05); BUT the question card shows a figure with where: answer in the question area (its alt text shows before the answer is opened) -> qcard must honour `where`
- side navigator truncates long labels ("1(b), part 1 of 2"); an OR alternative can point at only one item (P5 Q6(c) OR replaces two sub-parts: scoring keeps (c)(ii) in the maximum)
- check.py: MARKS_N should accept '(5 x 2 Marks = 10 Marks)' (n-p4-mtp-sep2025-s1 exits 1 only for this); build's backtick rule vs ICAI's stray backtick; seg.py turns every backtick into ₹; app shows backslash of '\`'
- app md: numbered list restarts at 1. when an item has indented follow-on paragraphs; follow-on lines render outside their bullet (bank answers)
- app wording: marking panel for an MTP item without marks says 'RTPs print no marks' (fix text: 'ICAI prints no marks for this item')

## From old-scheme transcribers (2026-10-20, tx-34/35)
- `choice:` cannot express a choice inside one question ("Q6: answer any four of five 5-mark parts", "Q1: any seven of eight"), so such old P3/P6 papers are practice only (not sittable). Possible extension: `choice: q1; any 4 of q2-q6; q6: any 4 of a-e`.
- check.py does not strip running heads in group-compilation PDFs (few pages per paper) nor page headers with page numbers; transcribers accept them by hand.
- Old Paper 8 (FM section only) sitting time: build now prorates 108 min (bank.py); not printed by ICAI.
- tx-38: same intra-question choice in old P3 Q6 and both old P6 papers (any 7 of (a)-(h)); seg.py left fi/ff ligatures unexpanded in o-p6-pyq-nov2023 text (fixed by hand).
- Lead ruling 2026-10-20: old P8 risk analysis in capital budgeting (expected NPV, CE, sensitivity, RADR, SD/CV, decision trees, lease vs buy) = oos with tag fm.capbud.npv; o-p8-pyq-nov2019 q1b set oos by lead. o-p8-pyq-may2023 q1c (scenario NPVs only) left in by tx-34: QA may revisit.
- Lead ruling 2026-10-20 (2): scenario / best-worst NPV and RADR-only items also oos: o-p8-pyq-may2023 q1c, o-p8-pyq-jul2021 q1c, o-p8-mtp-jul2021-s2 q2a set oos by lead. Mixed items (one part in syllabus) keep their tag, e.g. o-p8-pyq-dec2021 q4.
- tx-69: check.py running-head match should treat '&' and 'AND' as equal (o-p8-rtp-nov2020).
- tx-62: accept: covers a number's largest shortfall in one page group, not its total (can hide a real miss); long MCQ labels make wide navigator buttons.
