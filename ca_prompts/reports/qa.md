# qa: final QA of PassBook (report, 2026-10-20)

All eight steps are done. Everything is in `~/CA_PERSONAL/ca_passbook`, which is not a git repository. Backups of the sources taken before any edit:

- `/tmp/qa/backup/pre_qa_1117.tgz`
- `/tmp/qa/map.css.bak`, `/tmp/qa/bank.py.bak2`
- `/tmp/qa/lesson_backup/`, `/tmp/qa/exemplar_backup/`
- `/tmp/qa/o-p8-mtp-nov2020-s1.md.bak`

## Real counts (final `build.py --check`)

- **Lessons:** 181 (P4 66, P5 62, P6A 32, P6B 21), 2,012 flashcards.
- **Labs:** 30 ready, with 157 embeds in 77 lessons. There are 378 lab examples, and 160 of them cite an ICAI question; the build used to
  say "0 cite a past paper" because it only recognised GATE ids.
- **ICAI bank: 238 documents, 6,568 items.**
  - 2,099 MCQs and 4,469 descriptive items; 6,434 carry ICAI's answer or key; 393 are out of syllabus.
  - New scheme: 24 past papers, 48 MTPs, 24 RTPs.
  - Old scheme (old P3, P6, P7 and P8): 39 past papers, 65 MTPs, 38 RTPs.
  - By status: 163 checked, 75 imported. 165 can be sat. 63 are exam papers.
  - The bank was still growing while I worked (transcribers): 132 documents at the start, 238 at the end.
- **Hostable copy** `_site/`: 548 files, 28.1 MB (about 8.1 MB gzip).

## Final suites

| Suite | Result |
|---|---|
| `build.py` (full) and `--check` | exit 0. The only warning is a transcriber's new file: `n-p6-mtp-sep2025-s2.fm.md` choice max 40 vs 50 printed. The aud.bank.advances word warning is gone. |
| `node tests/run.js` (all) | **1,590 passed, 1 failed.** The failure was `build-data` P1-58, a race: a transcriber's build rewrote `data/` while the test read it. Run again on its own, 13/13 pass. The full run no longer crashes. |
| `python3 -I -m unittest discover -s tests/py` | 74 OK |
| `node tools/lint_content.js` (181 lessons) | 0 errors, 0 warnings |
| `tools/smoke.py` | 342 passed, 0 failed at 14:2x |
| `tools/smoke.py demo` | 339 passed, 1 failed at 14:3x. The failure was the nav-fit timeout. |

**The final smoke runs did not finish.** With the load average at about 200, Chrome passed smoke.py's 420 s wall-clock limit:

- The main pass's output was complete: **287 PASS, 0 FAIL**, "no uncaught JS errors". The touch pass returned nothing.
- I re-ran the app's own `?selftest=1` over CDP with no wall-clock cap:
  - demo profile: **287 PASS, 0 FAIL**;
  - touch pass, with smoke.py's coarse-pointer flags: **22 PASS, 0 FAIL**.
- The nav-fit pass's only failures in this session were "did not finish" timeouts at 704 and 764 px.

## What I fixed

### 1. Suites (all at the root)

- **Full `node tests/run.js` crash.** `tools/lint_content.js` keeps a host's `GA` (`globalThis.GA = globalThis.GA || {}`), so
  `tests/diagram.test.js` no longer wipes `GA.util` for later test files.
- **Home "question of the day" (P3-46): two real bugs.**
  - `qotdValue` dropped today's id from the earlier days' list when an old pick repeated, so saving the pick moved the day's order.
  - Most ICAI MCQs are too long for the card (stem over 360 characters, long options), so a 5-file walk could find none. The build now sets
    a `LONG` flag (bank.py `too_long`, which mirrors `isShort`; data.js decodes it), and `isCandidate` leaves those questions out.
- **Settings "keyed papers" test.** It assumed GATE-shaped papers (`src.key`). It is adapted, with a comment: ICAI documents are checked for
  a question PDF and its fingerprint instead.
- **Smoke "document search".** The self-test picked `papers[0]` (an MTP: six MTPs share "mtp september 2026"). It now searches one RTP
  within its subject.
- **Lesson word count.** `::: lab` blocks are skipped like diagrams, in both `lessons.py words()` and `lesson.js readWords`.
- **Unpublished answers.**
  - These items already showed "ICAI has not published its answers…". I also fixed the answering hint, which said "ICAI's key gives no
    single option" for an unpublished key.
  - The source footer of an unpublished past paper now says "question paper", not "Suggested Answers".
- **Exemplar spot checks against the Study Material.**
  - **cma.mc.bep:** no errors in about 11 formulas, 3 definitions, 3 worked examples, 5 quiz items and 11 cards. Two loose attributions were
    reworded under the lock: a quoted paraphrase of Illustration 9, and "its most used method" → "a generally used method".
  - **aud.report.sa705:** 5 fixes.
    - Two SM page citations: 8.95 → 8.50 / 8.54, twice.
    - A non-verbatim quote, now "possible effects on the financial statements of undetected misstatements".
    - Quote marks removed from a paraphrased May 2026 MCQ 4 option.
    - "factory is 61% of assets" → "factory and the cold-chain division are 61%".

### 2. Bank and ICAI screens

- **The question card already honoured `where: answer`** (sm-bank-fix). I verified it on n-p6-mtp-may2024-s2-fm-q4b: no figure and no alt
  text in the question area, and the figure loads inside ICAI's answer.
- **Navigator.**
  - Long labels such as "1(b), part 1 of 2" span 2 to 4 cells (`pyqLib.cellWide`), in the question page's navigator and the runner's
    palette.
  - Palette rows are all the same height, and wide cells keep the status shapes in px.
- **An OR that replaces two sub-parts.** `scoring.orSet` treats P5 Jan 2025 Q6(c) OR as standing for (c)(i) and (c)(ii), so the OR is
  counted once against both. It no longer adds 6 marks out of 4, and the replaced parts are not "skipped". There is a new test in
  `tests/bank.test.js`.
- **Result page maxima.** Parts, papers and types now use ICAI's choice: the result showed "Part II of 88" and "11 / 118" next to a
  headline "/ 100", and now shows of 70 and / 100. The new pieces are `applyChoice` `maxBy`, `TG.choiceMaxima` and `TG.paperChoice`.
- **Case tables in the runner had zero cell padding.** map.css's `.xm th/td` (the exam matrix) also matched the runner's root `.xm`. Those
  rules are now scoped to `.xm:where(table)`, with the same specificity.
- **The marking panel said "RTPs print no marks" for MTP and past-paper items.** It now says "ICAI prints no marks for this item". The
  "no marks (RTP)" labels on lessons and sittings are corrected the same way.
- **md lists** (bank answers and 42 places in lessons):
  - a numbered list no longer restarts at "1." after a blank line;
  - indented follow-on paragraphs and lists stay inside their item;
  - `<ol start>` is kept;
  - `\`` renders as a literal backtick.
- **`answers: unavailable`** is a new value, used for answers that are lost, not just unpublished. It is supported in bank.py (validation,
  `answers` on the paper), ICAI_BANK.md and the app: "ICAI's answers to this paper are no longer available online". It is treated like
  unpublished: not sittable, and no "Suggested Answers" label. `o-p8-mtp-nov2020-s1`'s header line is switched (that line only) and passes
  check.py.
  - No other document older than the newest attempt has `answers: unpublished`. Only the Sep 2026 ones do: n-p4/p5 pyq-sep2026,
    n-p6-pyq-sep2026 .fm and .sm.

### 3. Screens (GATE-era assumptions, layouts)

- **Paper pages.**
  - The ICAI hero shows the paper's own facts: 100 marks, its share of Group II, the exam day, chapters, sub-topics and the pass mark.
  - It adds a reconciled bank line: "992 ICAI questions to practise: 277 from 10 exam papers · 482 from 16 MTPs · 233 from 8 RTPs". This
    matches the "Practise N questions" button.
  - Gone: the near-zero 2018–23 bars, "100.0 marks", "8/36 papers asked it" and the wrapping "1st of 4".
  - "Year by year" is hidden on an ICAI bank. Its "share of the paper" mixed every paper of the group, RTPs and MTPs included, and showed an
    MCQ/MSQ/NAT box. The hero button and old `?tab=weight` links go to "Where the marks are".
- **Paper denominators.** `insights.papersOfSubject` counts a subject's papers from its own ICAI paper. The fix covers "10 of 47 papers" →
  "of 16", lab cards, the lab page (now "exam papers"), syllabus reasons and the home hook ticks: 191 ticks → 17.
  - The cross-paper "65% of question marks in 2 of 4 papers" hook is gone for ICAI, because the weights are ICAI's fixed marks.
- **Phones.**
  - The flashcards CTA overflowed its card by 87 px (`min-width: 0`).
  - On home, the paper names and exam days were cut off.
  - The bank's "with ICAI's ans…" subtitle was cut off.
  - The sticky lesson bar now shows the sub-heading alone, so it is no longer clipped (sa705: 355 px into 302 px).
  - The tests hub's blueprint tiles now have one column per part (GATE's three left a third empty).
  - Phone-checked cma.abc.* and cma.sys.*: no page overflow; wide tables scroll inside `.tw` by design.
- **Tests hub.** Unsittable documents no longer show the items' raw sum ("114 marks" for a 100-mark paper) and say why they cannot be sat.
- **Home strip.** "papers sat" now counts against the documents that can be sat.

### 4. Wording

- **About page.**
  - It said "176 ICAI papers" and that every file carries a SHA-256, but showed "—". The table now lists each ICAI document with its
    question and answer PDFs, fingerprints, fetch date and status. Its toggle and headline say documents and items.
- **Other wording fixes.**
  - Search empty state: "page replacement / os / 2019 cs 37 / banker" → joint products, SA 705, rtp sep 2026 q5, materiality.
  - "past questions" → "ICAI questions" in settings, the planner and plan, and the bank.
  - SRS fallback text: "after GATE" → "after your exam".
  - Web manifest: "224 ICAI past papers, RTPs and MTPs".
  - The build summary now reads "ICAI documents, items (N with ICAI's answer or key)".
- **Left alone.** The remaining MSQ/NAT/GATE strings sit in GATE-only code paths that an ICAI bank never reaches (advHtml → advIcai, the
  GATE hub, the GATE marking text), plus internal identifiers and comments.

### 5–6. README and site

- **README.md** is rewritten for the student: what it is, how to open it, what is inside with the counts above, the accuracy rules, the
  develop commands and the known limits.
- **`build.py --site`** worked, and `--check site` reports the copy sealed.
  - `_site/index.html` was opened from `file://` with the network emulated offline. All 12 routes rendered (home, syllabus, a paper page, a
    lesson, a lab, the bank, a question, tests, flashcards, formula sheets, map, settings), with 0 exceptions and 0 network requests.
  - Nothing was published or served.
- **PDFs:** I regenerated all 16 PDFs in `pdf/` (`.venv/bin/python -I tools/pdf/make_pdfs.py`, 433 s, every check OK) after the list fix
  and the exemplar edits. Lists continue their numbering now: P6B Full Lessons p. 199 runs 1–7, where it used to restart at 1.

## Screens checked

- **Every main route, in four variants** (1440 and 390 px, light and dark, fresh and seeded demo): home (first run and demo), learn/syllabus,
  the four paper pages, map, three lessons (Quick cma.mc.bep, Exam aud.report.sa705, Deep fm.capbud.npv), the labs gallery and 4 labs
  (cvp, audit-opinion, wacc, bcg-ge), bank, a descriptive question, an MCQ, tests, flashcards, formula sheets, progress, settings, search,
  about, planner, notebook and Wrapped.
  - The PNGs and probe reports are in `/tmp/qa/shots2/`.
- **Flows, at 1440 light and 390 dark** (in `/tmp/qa/flow/`):
  - bank filters (aud MTPs);
  - descriptive item: Show ICAI's answer, then Partly, which is stored and goes to the notebook;
  - MCQ checked;
  - "ICAI asked this" on cma.mc.bep (61 items), aud.report.sa705 (29) and sm.ext.porter (84);
  - P5 Jan 2025 sitting: briefing → runner → submit → self-marking → result.
- **About 50 images viewed**, as crops and contact sheets.

## Still open (for the lead)

- **check.py on checked files:** 98 of 99 pass. `n-p4-mtp-sep2025-s1` fails only because `MARKS_N` does not read
  "(5 x 2 Marks = 10 Marks)", a tool limit (bank-tools). Not edited.
- **Imported SM items with 15 marks on one MCQ** (probably the group's total): `o-p7-mtp-nov2019-s1-sm-q1xv`, `o-p7-mtp-may2019-s1-sm-q1xv`,
  `o-p7-mtp-may2019-s2-sm-q1xv`.
- **`o-p8-mtp-nov2020-s1`:** its note line still says "answers: unpublished (the format's only value …)". I changed only the header line, as
  instructed.
- **From the exemplar checks, not changed:**
  - Tapri's inventories are ₹38 crore in sa705 but ₹54 crore in aud.items.equity.
  - sa705 cites SM 7.22 where the sentence starts on 7.21.
  - "the division's debtors" with two divisions.
- **From consist, still yours:** the aud.nature.sa200 syllabus title (judgement); the FM vs Audit profit scales.
- **Map:** across papers, its treemap is sized by the banked exam-paper marks (it is labelled so), not ICAI's fixed 100 / 100 / 50 / 50.
- **EMBEDS items not in this brief and not done:**
  - the kit follow-ups (flow/plot/lint/T-accounts);
  - shot.sh probe and URL-state tweaks;
  - per-lesson build isolation;
  - check.py `MARKS_SUM` and backtick rules (bank-tools).
- **Test harness:** smoke.py's 420 s wall-clock limits are too short on this machine at its current load. Its results above come from the
  app's own self-test run without a cap.
