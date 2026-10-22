# bank-core — PassBook's ICAI question bank (report, 2026-10-20)

The ICAI question bank is built and live in `~/CA_PERSONAL/ca_passbook`. It has a file format, a build validator, transcription tools, a transcribed pilot, the Strategic Management import, the app screens, tests, a transcription guide and a batch plan. Every design decision and the guide for transcribers are in `docs/ICAI_BANK.md`.

I did the work in a scratch copy (`~/CA_PERSONAL/ca_passbook_bank`) and ported it at the end. Only two files had been edited in live in the meantime: `app/css/lesson.css` and `app/js/core/md.js` (a writer's `::: cols` title). Both merged cleanly with `git merge-file`.

## State at the end (live)
- `build.py --check`: 0 errors. It ships 70 ICAI documents and 1,393 items, next to the writers' 170+ lessons.
- `tools/smoke.py` and `tools/smoke.py demo`: 342 passed, 0 failed each.
- `python3 -I -m unittest discover -s tests/py -p test_bank.py`: 19 OK.
- `node tests/run.js`: 1,576 passed, 4 failed. This includes `tests/bank.test.js` (9 tests). None of the four failures comes from the bank:
  - **css ratchet**: `lesson.css` has 115 px font sizes against a limit of 114. The extra one is a writer's new `.cols-t` rule, which was already in live before my port.
  - **home bestDiagram, lesson speakMd and lesson levelMinutes**: these test the lessons themselves (their diagrams, a heading with maths, and `aud.bank.advances` being edited while the tests ran).
  - The same suite on my scratch copy with live's content: 1,576 passed, and the same two content failures.
- **Second round of fixes.** Once the bank met the writers' 170 lessons, some assertions about the shipped catalogue no longer held. I made the code and the tests count the ICAI bank:
  - `lesson.js`: the practice link and its set count every tagged item; the "why it matters" line keeps the count of later lessons that build on it.
  - `planner.js`: practice rows count descriptive items with ICAI's answer and secondary tags.
  - `stats.js`: the ICAI warm-up opens the hub's 10-MCQ timed drill.
  - `tests/lesson`, `home` and `next`: the expectations now say what an ICAI bank shows.

## Formats
- **One file per ICAI document**: `bank/items/<new|old>/<paper>/<doc id>.md`.
  - Paper 6 is split into `.fm.md` and `.sm.md`.
  - Old-scheme Paper 7 (SM) is `.sm.md`.
- **Document id**: `<n|o>-<paper>-<pyq|rtp|mtp>-<attempt>[-s1|-s2]`, for example `n-p4-rtp-sep2026`.
- **Item key**: `q5`, `q1a-ii`, `q4b-or` (with `alt: q4b`), and `m9` for a past paper's MCQ 9.
  - A full id is the document id plus the key; Paper 6 adds a section prefix, for example `n-p6-mtp-sep2026-s1-sm-q1a`.
- **Blocks**: front matter of flat `key: value` lines, then a body under `#### Instructions` / `Case` / `Question` / `Options` / `Answer` / `Approach`.
  - The text under Instructions, Case, Question, Options and Answer is ICAI's, word for word.
  - Tags, difficulty, `Approach` and `note` are ours.
- **Provenance**: every document names manifest files (`qfile` / `afile` / `paperfile`) from `bank/sources.json`, which is vendored from `~/CA_PERSONAL/ca_sources/q/manifest.json` with sha256 and URL. Every case and item cites PDF pages (`q:` / `a:`).
- **Statuses**:
  - `draft` never ships.
  - `imported` is new: converted by the SM import, shipped, but not yet re-read by a person.
  - `checked` and `reviewed` are as in the brief.
- **Two additions since the design step**:
  - `marks: none` (with a note) for items where ICAI's document prints no marks, such as a past paper's Part I MCQs in the Suggested Answers.
  - An MTP or past paper can be sat only when every section with descriptive items has a `choice:` rule. Otherwise its maximum would count questions a candidate may leave out.
- **Build validation**: unknown keys, missing provenance, pages outside the PDF, bad or foreign tags, untagged items in a shipped document, unbalanced tables, unbalanced `$` maths, four options (A)–(D), MCQ keys, marks, `alt`/`case` references, and the choice rule.

## Tools (in `tools/bank/`)
- **`seg.py <doc> [pages] | --info | --find | --png N --clip | --words N`**: page text with ICAI's Rupee-font backtick shown as ₹, OCR text for scans, page renders. It resolves `sm-qbank/…` files under `~/CA_PERSONAL/sm-qbank`.
- **`check.py <file>`**: the build's validation of one file plus a multiset diff of numbers per page group against the PDF.
  - It removes running heads and pairs numbers that a line break split.
  - It accepts a number only through `accept:` with a note.
  - It also compares marks lines, checks MCQ keys against answers, and gives an advisory word-run check.
  - I fixed one bug today: a line containing "part of" was being read as a Part's total.
- **`sources.py`**: vendors the manifest and keeps the SM import's entries.
- **`smimport.py`**: the SM import (below). It never overwrites a file whose `by:` is no longer `sm-import`.
- **`plan.py`**: item estimates and the batch file (below).

## The app
- **Bank**: filters for kind, attempt, document, type (MCQ or descriptive), scheme, status (new/missed/partly/got) and out-of-syllabus. Search understands words like "rtp sep 2026 q5". ICAI labels are shown everywhere, never "0 marks".
- **Question card**: MCQs are auto-marked with no negative marking. Descriptive items have an answer box kept on the device, "Show ICAI's answer", then Got it / Partly / Missed.
  - Partly and Missed open a notebook entry and go into review (Partly as SM-2 'hard', Missed as 'again').
  - Mastery counts Partly as half.
  - Our approach note is labelled "PassBook's note".
- **Lesson**: an "ICAI asked this" block with its items and the documents they come from, plus "Practise these N".
- **Tests hub**: the next sittable paper, Sit it / 6A only / 6B only / Practise in order, an MCQ drill (MCQs only, descriptive items optional), and "waiting for your marks".
- **Sitting**: briefing, ICAI's clock (3 h, or 90 min for one Paper 6 section), navigator, Submit, then self-marking at `/test/mark/:id` (−/+, Full/Half/Zero; Got it/Partly/Missed for items without marks), then the result with ICAI's choices applied.
- **Subject page, syllabus, map, progress, notebook and home count the whole bank.**
  - Insights ("what the papers say") count ICAI's exam papers only, through `GA.insights.examView`.
  - The map sizes by questions when no exam paper prints marks; its exam lens says honestly when there is no exam paper.

## Pilot (P4 RTP Sep 2026, transcribed by me)
- `bank/items/new/p4/n-p4-rtp-sep2026.md`: 28 items (12 MCQs + 16 descriptive) in 3 cases, from 49 PDF pages. Status `checked`.
- `check.py`: 0 errors, 0 number problems. 4 numbers are accepted with a note (the paper title's "4").
- Two ICAI oddities are kept with notes:
  - Q2(iv): ICAI's answer ₹ 2,45,500 is not the value of option A (₹ 2,34,100).
  - Q15: the labels XYX/XYZ and C/P are printed as ICAI has them.

## SM import (`tools/bank/smimport.py`, from `~/CA_PERSONAL/sm-qbank`)
- ~/CA_PERSONAL/sm-qbank has 76 documents and 1,476 records; your brief said 1,177. Records repeat because ICAI reuses questions across documents (sm-qbank's PDF prints each repeat once). The bank keeps every document whole.
- Result:
  - **69 documents imported**, 1,365 items shipped, 46 of them sittable with ICAI's choice read from the printed instruction.
  - **7 documents left as drafts** (111 items), each with "TO FINISH:" notes:
    - `n-p6-pyq-may2025`: its Part I MCQs are printed in the 6A Suggested Answers, a second file the format cannot cite.
    - `n-p6-mtp-may2024-s2` and `n-p6-rtp-sep2024`: one untagged MCQ each.
    - `o-p7-mtp-may2018-s1`, `o-p7-mtp-nov2018-s2`, `o-p7-pyq-jan2021`, `o-p7-pyq-nov2018`: a block whose text was not found in the PDF.
- Tags:
  - 1,231 items by sm.* sub-topic.
  - 176 by chapter only, marked "sub-topic tagging still needed".
  - 159 out of syllabus (`oos: yes`, with sm-qbank's reason).
  - MCQs that ICAI prints outside any chapter are tagged by keywords and marked "check the tags".
- Provenance:
  - New-scheme documents cite the manifest's own PDFs.
  - Old-scheme Paper 7 documents cite sm-qbank's `raw/` copies, added to `bank/sources.json` (64 files, `"origin": "sm-qbank"`, sha256, ICAI URL, and a mirror note where sm-qbank used a mirror).
  - Pages were found by matching each block's text to the PDF, page by page.

## Batch plan
`~/CA_PERSONAL/ca_prompts/bank_batches.json` has **192 batches covering 193 documents**: about 4,700 items and 155 hours. Paper 6 is planned for the 6A FM part only.

| Paper | Estimated items |
|---|---|
| P4 | about 830 |
| P5 | about 870 |
| P6A | about 560 |
| old P3 | about 590 |
| old P6 | about 1,440 |
| old P8A | about 440 |

- Each entry has `id`, `docs` (manifest files), `bank_docs`, `est_items`, `est_minutes`, `papers` and `note`.
- Most documents take 30–70 minutes on their own, and a document is never split across two people, so a batch is usually one document.
- Order: new scheme first (exam papers, then MTPs, then RTPs, newest first), then the old scheme.
- Re-running `plan.py` drops finished documents.

## Screens checked (tools/shot.sh: light, `theme=dark`, 390 px)
- Bank list: light, dark and phone, with the SM filter.
- MCQ card: light and dark.
- Descriptive card with ICAI's answer open: light, dark and phone.
- Lesson with "ICAI asked this": light and phone.
- Tests hub: light, dark and phone.
- Result: light, dark and phone.
- Subject page: cma and sm in light; sm in phone.
- Also in light: syllabus, map (syllabus lens and exam lens), progress, notebook and home (demo).
- I fixed what these showed:
  - "0 marks" and "DESC" labels on the notebook, search and home.
  - "15 chapters, 0 asked" and "no ICAI question yet" on subject pages.
  - Map sized by 0 marks.
  - P6 maxima ignoring ICAI's choice: rows now carry their section, so 6B MTPs are 50, not 60.
  - An empty type table on the result page.
  - Demo sittings longer than the clock.
- One dev-tool artifact remains: `?shot=B` scrolls, so the PNG shows a blank band. The app itself is fine.

## Open questions for the lead
1. **RTPs**: they print no marks, so they are practice only (never sat), and drills time an RTP MCQ as 2 marks. Is that OK?
2. **Insights**: "what the papers say" counts exam papers only, because RTPs and MTPs are practice material. Is that OK?
3. **`imported` status**: the SM import ships without a person re-reading each page. Do you want a review pass (the guide's `reviewed`) assigned? Also, the 7 SM drafts and the 176 chapter-only tags need a person.
4. **Part I MCQ marks**: past papers' Suggested Answers often print no marks for the Part I MCQs, and the OMR question paper is not in the manifest. These items carry `marks: none` and add nothing to a sitting's maximum. Should the Part I papers be fetched?
5. **May 2025 Paper 6**: ICAI split the answers into 6A and 6B PDFs, and the 6B MCQs are printed in the 6A file. This needs a per-block file override, or the document stays a draft.
6. **Subagents**: launching them failed ("concurrent subagent limit reached"), so I did all the work myself.

## Files (all in ~/CA_PERSONAL/ca_passbook)
- **New**:
  - `docs/ICAI_BANK.md`
  - `tools/buildlib/bank.py`
  - `tools/bank/{seg,check,sources,smimport,plan}.py`
  - `bank/sources.json`
  - `bank/items/new/p4/n-p4-rtp-sep2026.md`
  - `bank/items/new/p6/*.sm.md` (32 files)
  - `bank/items/old/p7/*.sm.md` (44 files)
  - `tests/bank.test.js`
  - `tests/py/test_bank.py`
- **Changed**:
  - `build.py`
  - `app/js/core/{actions,data,demo,insights,mapviz,md,planner,pyqlib,scoring,search,srs,stats,store,testgen,ui}.js`
  - `app/js/views/{home,lesson,map,notebook,progress,pyq,qcard,syllabus,test}.js`
  - `app/js/{selftest,shell}.js`
  - `app/css/{bank,lesson,tests}.css`
  - `tools/{shot.sh,smoke.py}`
  - `tests/{insights,mapviz,practice,pyq,store,syllabus,lesson,home,next}.test.js` (assertions that assumed an empty or GATE-shaped bank)
