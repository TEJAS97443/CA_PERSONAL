# fork — PassBook engine fork (report, 2026-10-20)

`~/CA_PERSONAL/ca_passbook` is a working fork of `~/DSA_PERSONAL/gate_cse` (left untouched; only read). Build, lint, preview, screenshots, the lab framework and every
test suite run green on the CA content tree.

## State at the end
- `node tests/run.js`: **1526 passed, 0 failed**. This includes the 19 lessons and 29 lab files the writers had shipped by then.
- `.venv/bin/python -I -m unittest discover -s tests/py`: **55 OK**.
- `python3 -I tools/smoke.py`: **266 passed, 0 failed**; `python3 -I tools/smoke.py demo`: **270 passed, 0 failed**.
- `build.py --check`: 0 errors at the end. Earlier, a writer's lesson (`cma.sheet.mfg`, a broken formula) and a lab blurb (`wacc`) failed; their owners fixed them.
- `.venv`: a real venv (pip had network), with PyMuPDF and Pillow.
- Exam dates come from ICAI's own announcement: No. 13-CA (EXAM)/JANUARY/2027, 23 Sep 2026, "Schedule of Intermediate & Foundation Examinations, January 2027".
  - URL: https://resource.cdn.icai.org/94359exam-aps6372-stu-iff-jan2027.pdf (listed on https://www.icai.org/category/announcements); sha256 64f07db5…c189; checked 2026-10-20.
  - It says: Group II on 8, 10 and 12 January 2027, 2 PM to 5 PM IST, 15 minutes' reading time from 1.45 PM.
  - **It gives the group's days, not the paper on each day.** The P4 / P5 / P6 order follows ICAI's usual Group II sequence (your brief). `content/exam.json` says so in its note ("verify on icai.org and your admit card").

## Commands writers use (all in ~/CA_PERSONAL/ca_passbook)
```
node tools/lint_content.js content/subjects/<paper>/<id>.md
.venv/bin/python build.py --check            # or without --check to write data/
.venv/bin/python tools/preview_lesson.py content/subjects/<paper>/<id>.md [--dark]   # /tmp/preview/<id>-N.png
tools/shot.sh "/l/<id>" /tmp/x.png 1440 1500 ["theme=dark"]      # also "/lab/<id>", width 390 for phones
node tests/run.js lab-<id>    and    node tests/run.js labs-       # a lab's own tests, then the shared framework tests
python3 -I tools/lab_status.py list | add '<json>' | set <id> '<json fields>' | <id> ready|planned    # content/labs.json, locked
python3 -I tools/smoke.py [demo]
```
Lesson files go in `content/subjects/<paper>/<lesson-id>.md`, with `<paper>` one of cma, aud, fm, sm. The build rejects any other place.

## What was removed
- The 29 GATE labs and their tests, the per-lab CSS blocks, and `tests/labs-figures.test.js`. `content/labs.json` started empty; the lead has since registered 30 labs as planned.
- `tools/pyq/` (the GATE import tools), `docs/PYQ_IMPORT.md`, `tests/py/test_pyq_tools.py` and all GATE PYQ data. `pyq/sources/manifest.json` and `fetched.json` are empty stubs so the build runs.
- GATE-content tests: PYQ, paper and figure assertions, key notes, results, hooks, GATE dates, and GATE lesson ids.
  - Logic tests that needed content now run on `tests/fixtures/catalogue.js` until the shipped catalogue is big enough. It has every CA sub-topic as a lesson with 3 cards, plus a synthetic bank of 128 multiple-choice questions.
  - Other fixtures: `tests/fixtures/lesson-sample.md`, `fixture-bep.js` (a minimal break-even lab) and `practice-catalogue.js` (fork B).
- The card-id ledger was reset.

## What was renamed or changed
- **Names**: PassBook; the mascot is now Tick, redrawn as a tick mark, and is now actually loaded (GATE's `index.html` never loaded `mascot.js`); PassBook Wrapped; the tab "PYQs" is now "Questions"; the logo and icons are a tick. Title, PWA manifest, footer, about page, settings, onboarding, empty states and the keyboard help are all rebranded.
- **Storage**: keys are `passbook:<profile>`, so progress never mixes with GATE Ascent's `gate-ascent:` keys, which share one store on `file://`. Backups are tagged `app: 'passbook'`; the service-worker cache is `pb-files`.
- **Syllabus**: re-copied after your update (181 sub-topics). `tools/syllabus.py` reads `paper=` and whole-number `marks=`. Subjects are weighted by paper marks (100/100/50/50) everywhere: the Home ranking, the planner's shares, the labs order and the map.
- **Lesson sections**: the list lives in `content/sections.json` (order, required, `oneOf` [Formats and formulas | Answer frame], depth levels, the Quick / Exam / Deep labels, and word, quiz and card targets).
  - The build, the lesson page (`D.sections`) and the formula sheets all read it. Your names are the ones in the file.
  - Required blocks: analogy, example, exam, mistake, quiz. Diagram and key give warnings only.
- **Exam logic**:
  - `GA.stats.exam()` counts to the first paper still ahead (basis `'official paper day'`), then rolls on to Paper 5 and Paper 6. It returns `paper {code, name, day}`; `GA.stats.paperDays(D)` gives each paper's day.
  - The countdown reads "80 days to Paper 4". The review cap, seasons, eve and exam day, planner phases and the streak bridge all use these days.
- **Rendering**:
  - Dialogue lines (`> **Kesar:** …`) are separate paragraphs.
  - `₹` is accepted in KaTeX.
  - Plot ticks use Indian grouping, with a wider margin for long labels.
  - `U.nf` / `U.inr` use en-IN grouping. `U.medName` gives Costing / Audit / FM / SM.
  - `::: trick` is labelled "Trick".
  - Six CA examples were added to `docs/diagram-examples.json` and the gallery.
- **Lab registry**: `tools/lab_status.py` gained locked `add`, `set` and `list`. `build.py --check` validates each entry's paper, topics and status. A planned lab without a file gives one summary warning and shows as a "Coming soon" card.
- **Docs**: `docs/CONTENT_GUIDE.md` is your guide, copied as it stood after your update. `docs/LAB_GUIDE.md`, `README.md` and `content/README.md` are rewritten for CA. `docs/ARCHITECTURE.md` has fork notes at its top.

## Hidden until data exists
- **No ICAI questions**: `/pyq`, `/q/:id`, `/test` (every `?new=` link) and lesson practice show "ICAI past papers, RTPs and MTPs are being added" (`GA.ui.bankEmptyCard`), and no test is ever created.
  - `GA.stats.nextStep` never names a test, a mock or a question count.
  - With no lessons at all, the next step is "Open the syllabus".
  - `::: pyq` blocks are optional; unknown ids give a warning.
- **Home**: the question of the day, the tests card and "What the papers say" wait for questions. "Try a lab" waits for ready labs.
- **Number strips**: they show only counts above zero.
- **Paper pages**: "Where the marks are" and "Year by year" wait for questions. **Map**: the exam lens and marks sizing wait too. **Progress**: test analytics.
- **Wrapped**: no question slides until there are answers.

## Where the ICAI bank plugs in (for the later job)
- Build: `tools/buildlib/pyq.py` `load_papers` writes `manifest.papers` and `manifest.pyq` (rows: id, paper index, sec, no, marks, type, subject, topic, subtopic, diff, flags). `data.js` `buildCatalogue` turns these into `D.papers` and `D.questions`.
- Loaders: `GA.data.paper`, `question`, `questions` and `solution` read `data/pyq/<paper>.js` and `data/sol/<subject>.js`.
- Gates to remove once questions ship: `GA.ui.bankIsEmpty`, `GA.pyqLib.isEmpty`, `C.bank` in stats and planner, and `bankOn` in lesson.js and selftest.js.
- To replace (all GATE-shaped):
  - `scoring.js` (MCQ/MSQ/NAT, negative marking);
  - `testgen.js` blueprints (`TG.mock`: 65 questions, 100 marks);
  - `qcard.js` `markingNote` and the hint text;
  - the lab framework's `pyqLabel` and the `cs-YYYY:` id regex in `lab_presets.js`, `presets.py` and `pyqlib.parseQuery`;
  - the insights hook templates (taken out of the hook order).
- Lesson embeds: `::: pyq <ids>` already render as an "ICAI questions" list once the ids exist.

## GATE leftovers kept on purpose
- Internal identifiers that never show: `gate*` exam-day functions, `eng.gate`, `section 'CS'`, `PYQ_XP_MODES`, the `/pyq` route path, `pyq/` folder names, the `GA` global, the `GAD` registry, and the results module (inert without `results.json`).
- The question machinery described above, unreachable while the bank is empty.
- `docs/ARCHITECTURE.md` and the `FRONTEND*_SPEC.md` files still describe the GATE screens; the fork notes say what changed.

## Notes for the lead
- `tools/shot.sh`: Home's hero looks faded in 6-second headless shots because its entrance animation does not finish under the time budget. GATE does the same, so it is not a bug. For a clean Home shot run Chrome with `--force-prefers-reduced-motion`.
- Everything `docs/CONTENT_GUIDE.md` describes is supported.
  - The word-count warning range is 900–3,600, wider than the guide's 1,200–2,800, so your exemplar (3,458 words) passes.
  - The build cannot tell numerical lessons from theory lessons. A lesson with neither Formats and formulas nor Answer frame gets a warning, not an error.
- The build stops writing `data/` while any lesson or lab file has an error. One writer's broken file freezes `data/` for everyone's screenshots, while `--check` and `preview_lesson.py` keep working. This is the engine's original behaviour.
