# The ICAI question bank

PassBook's question bank holds ICAI's own questions for CA Intermediate Group II (new scheme): Paper 4 Cost and Management
Accounting, Paper 5 Auditing and Ethics, Paper 6A Financial Management and Paper 6B Strategic Management. The sources are ICAI's past
papers with Suggested Answers, Revision Test Papers (RTPs) and Mock Test Papers (MTPs), May 2024 to September 2026. Old-scheme
documents (November 2019 to November 2023: old Paper 3 Cost, old Paper 6 Audit, old Paper 8 FM) are included where their topics are
still in the syllabus. This document is the contract between the transcription agents, the build and the app.

**The hard rule.** We never invent or paraphrase an ICAI question or answer. Questions, options, ICAI's Suggested Answers and the RTP
and MTP answers are transcribed **verbatim**, in Markdown, with tables as Markdown tables. Every item says where it came from: the ICAI
document, the pages, the URL and the SHA-256 of the PDF (`~/CA_PERSONAL/ca_sources/q/manifest.json`, vendored as `bank/sources.json`). Anything we
add (tags, a short "how to approach" note, a difficulty estimate, notes) is marked as ours, in the data and on screen.

Contents: 1 the item model · 2 ids · 3 the file format · 4 the build · 5 the app · 6 marking and self-grading · 7 paper sittings ·
8 tools · 9 the transcription guide · 10 SM import · 11 the document list and batches · 12 tests.

## 1. The item model

**One bank item = the smallest independently answerable unit ICAI gives marks for.** Usually that is a lettered sub-part, e.g. Q3(a)
(5 marks). Rules of thumb:

* A question whose sub-parts are separate questions (Q6 (a) explain X, (b) distinguish Y, (c) a short case) gives one item per sub-part.
* A numerical problem whose requirements (a) EOQ, (b) re-order level, (c) maximum level ... all work on the same data and that ICAI
  answers as one connected solution is **one item** (its requirements stay inside the question text). If ICAI prints separate marks for
  the requirements *and* its answer can be split cleanly at each requirement, make one item per requirement under a shared case.
* A case scenario with five MCQs is **one case + five MCQ items**. Each item keeps the case's text as its shared stem.
* An "OR" alternative is its own item, linked to the item it replaces (`alt:`).
* RTPs print no marks: their items have no marks (`marks:` left out). MTPs and past papers always print marks.

| field | meaning |
|---|---|
| `id` | `<doc id>-<item key>`, e.g. `n-p4-rtp-sep2026-q3a` (§2). Never changes once shipped (progress is keyed by it). |
| `scheme` | `new` or `old` (from the document) |
| `paper` | `p4`, `p5`, `p6` (new); `p3`, `p6`, `p8` (old) |
| `section` | `fm` or `sm` for Paper 6 (new) items; derived for the rest. The PassBook subject is `cma` (P4, old P3), `aud` (P5, old P6), `fm`/`sm` (P6), `fm` (old P8, Section A only) |
| `kind` | `pyq` (an exam paper with ICAI's Suggested Answers), `rtp`, `mtp` |
| `attempt` | `may2024` … `sep2026` (old: `nov2019` … `nov2023`) |
| `series` | `s1` / `s2` for an MTP |
| `qno` | ICAI's printed question number |
| `part` | ICAI's printed sub-part label: `(a)`, `(ii)`, `(a)(ii)`; none for an undivided question |
| `marks` | the marks ICAI prints (integer); none for RTPs |
| `type` | `mcq` or `descriptive` |
| `stem` | the shared case text (Markdown, verbatim), from the item's case |
| `text` | the item's own question text (Markdown, verbatim) |
| `options`, `key` | MCQ only: the four options (A)–(D) and ICAI's key (`B`; `B/C` when ICAI's key gives either; `none` when ICAI's key says no option) |
| `answer` | ICAI's answer (Markdown, verbatim). For MCQs: the key and any working or explanation ICAI gives. A case can carry a shared answer (ICAI's working for the whole case), shown with each of its items |
| `figures` | cropped images, only where a picture cannot be text (a chart, a diagram) |
| `tags` | PassBook sub-topic ids from `content/syllabus/syllabus.txt` (a chapter id when the item spans the chapter); the first is primary. **Ours.** |
| `source` | `{file, pages, url, sha256}` for the question and for the answer: from the document's files and the item's page numbers |
| `ours` | `{approach?, difficulty?}`: a short "how to approach" note and `easy` / `medium` / `hard`. **Ours**, labelled so in the app |
| `flags` | `oos: true` when ICAI marks it out of syllabus or the topic left the syllabus (old scheme); `note`: our notes (old-scheme mapping, an irregular key) |

## 2. Ids

* **Document id**: `<n|o>-<paper>-<kind>-<attempt>[-<series>]`: `n-p4-rtp-sep2026`, `n-p5-mtp-jan2026-s2`, `n-p6-pyq-may2025`,
  `o-p8-pyq-nov2022`. One document = one ICAI publication; a past paper's question-paper scan and its Suggested Answers are one document.
* **Item key** (written in the file): `q` + ICAI's question number + its sub-part labels, lower case, brackets dropped: Q3(a) → `q3a`,
  Q16(d) → `q16d`, Q1 (ii) of an RTP case → `q1ii`. A second sub-part level is joined with a hyphen: Q1(a)(ii) → `q1a-ii`. An OR
  alternative adds `-or`: `q6c-or`. Where ICAI numbers the Part I MCQs separately from Part II (past papers and MTPs: MCQ 1 to 15, then
  Question 1 to 6), MCQs use `m`: MCQ 3 → `m3`. A case: `c` + its order in the document: `c1`, `c2`.
* **Item id** = document id + `-` + (Paper 6: the section, `fm` or `sm`, + `-`) + item key: `n-p4-rtp-sep2026-q3a`,
  `n-p6-mtp-sep2026-s1-fm-q2a`.
* Ids are lower case `[a-z0-9-]`. The build rejects duplicates.

## 3. The file format

One file per ICAI document (Paper 6: one per section) at `bank/items/<scheme>/<paper>/<doc id>.md` (Paper 6: `<doc id>.fm.md` and
`<doc id>.sm.md`). A file is a sequence of blocks; each block is a front-matter header between two `---` lines (flat `key: value`
lines), followed by its body. The first block describes the document; then cases and items in ICAI's order. The body is divided by
`####` headings with fixed names. A bare `---` line can therefore never appear inside a body (use `***` if ICAI prints a rule).

```markdown
<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. -->
---
doc: n-p4-rtp-sep2026
paper: p4
kind: rtp
attempt: sep2026
qfile: new/p4/rtp-sep2026-qa.pdf
afile: new/p4/rtp-sep2026-qa.pdf
status: checked
by: bank-core
date: 2026-10-20
---

---
case: c1
qno: 1
q: 1-3
a: 20-22
---
#### Case
Apex Mobility Systems Ltd. manufactures smart airport luggage carts ...

| Department | Amount (₹) |
|---|---|
| Fabrication | 18,20,000 |

#### Answer
**Working Note:**
...

---
item: q1i
case: c1
qno: 1
part: (i)
type: mcq
key: B
tags: cma.oh.secondary
difficulty: medium
q: 3
a: 21
---
#### Question
Total overhead allocated from Stores Department to production Department is:
#### Options
(A) ₹ 2,53,099
(B) ₹ 5,43,669
(C) ₹ 5,06,197
(D) ₹ 5,01,486
#### Answer
(B) ₹ 5,43,669

Total overhead allocated from Stores Department = ₹ 5,43,669
#### Approach
Do the primary distribution first, then the step method: Maintenance is closed first because it serves Stores.
```

### 3.1 Keys

Unknown keys are build errors. Values are plain text; lists are comma-separated.

| block | key | required | value |
|---|---|---|---|
| document | `doc` | yes | the document id; equals the file name (without `.fm` / `.sm`) |
| | `paper` | yes | `p4` `p5` `p6` (new) / `p3` `p6` `p8` (old); must match the folder |
| | `section` | P6 | `fm` or `sm`: the section this file holds (new Paper 6 only) |
| | `kind` | yes | `pyq` `rtp` `mtp` |
| | `attempt` | yes | `may2024` …; must match the id |
| | `series` | MTP | `s1` `s2` |
| | `qfile` | yes | the manifest `file` the question text was transcribed from (a past paper: its Suggested Answers file, which reproduces the questions; the question-paper scan only where no answers exist yet) |
| | `afile` | when answers exist | the manifest `file` of ICAI's answers (for an RTP the same file as `qfile`) |
| | `paperfile` | no | the question-paper scan of a past paper, linked as a second source |
| | `answers` | no | `unpublished` when ICAI has not published answers yet (Sep 2026 past papers); `unavailable` when ICAI published them once but no copy is online any more (old-scheme `o-p8-mtp-nov2020-s1`). Both ship the questions only, are never sat for a score, and the app says which ("ICAI has not published the answers yet" / "ICAI's answers to this paper are no longer available online") |
| | `choice` | papers | the Part II choice rule for sittings, `;`-separated clauses: `all`, or `q1; any 4 of q2-q6` (compulsory questions, then `any N of` a range of questions), then any **part choices**, one per question that chooses inside itself: `q1: any 7 of (a)-(h)` (only 7 of Q1's parts (a) to (h) count; also `(i)-(viii)`, or a list `(a), (c), (e)`). A part choice never decides whether the question counts (the first clauses do): `q1; any 4 of q2-q6; q6: any 4 of (a)-(e)`, `all; q1: any 2 of (a)-(c); q2: any 2 of (a)-(c)`. Part I is always compulsory. An MTP or past paper is sittable only when every file with descriptive items has one (else its maximum would count questions or parts a candidate may leave out); its maximum must be the one ICAI prints (§9.1) |
| | `minutes` | no | sitting time; default 180 (P6 / old P7: 180 for both sections, 90 while the bank holds one section's file) |
| | `status` | yes | `draft` (in progress: never shipped) · `imported` (converted by a tool from a verified bank, the SM import §10: ships, not yet re-read by a person) · `checked` (complete, `check.py` clean, re-read against the PDF) · `reviewed` (a second agent compared it with the PDF) |
| | `by`, `date` | yes | the transcriber's job id and the date |
| | `note` | no | ours: anything a reviewer should know |
| case | `case` | yes | `c1` … |
| | `qno` | yes | ICAI's question number the case belongs to (past papers: the MCQ range, e.g. `1-5`) |
| | `label` | no | ICAI's own heading when it has one (`Case Scenario - II`) |
| | `q`, `a` | yes / with answers | PDF page numbers (1-based physical pages of `qfile` / `afile`: `3`, `20-22`, `3, 5`) |
| | `figure` | no | `<file> \| <where> \| <alt text>` (§9.6); repeatable |
| item | `item` | yes | the item key (§2) |
| | `case` | no | the case it belongs to |
| | `qno`, `part` | yes / when printed | ICAI's numbering |
| | `label` | no | only when the printed number is unusual (`1(A)(iii)`); the app derives it otherwise |
| | `marks` | when printed | integer 1–20; `none` (with a `note`) where ICAI's document prints no marks for it (a past paper's Suggested Answers for Part I MCQs, whose OMR paper is separate). An MTP or past-paper item needs one of the two |
| | `type` | yes | `mcq` or `descriptive` |
| | `key` | MCQ | `A`–`D`, `B/C` (ICAI accepts either), `none` (ICAI's key gives no option), `unpublished` |
| | `tags` | imported, checked, reviewed docs | sub-topic ids (or a chapter id), first = primary |
| | `alt` | no | the item key this one is an OR alternative to |
| | `oos` | no | `yes` when out of syllabus (needs `note`) |
| | `difficulty` | no | ours: `easy` `medium` `hard` |
| | `q`, `a` | yes / with answers | PDF pages, as for a case |
| | `figure`, `note` | no | as above; `note` is ours |

### 3.2 Body sections

| block | `####` heading | content |
|---|---|---|
| document | `Instructions` | optional: ICAI's printed instructions (time, marks, "Question No. 1 is compulsory …"), verbatim |
| case | `Case` | the case text, verbatim |
| | `Answer` | optional: ICAI's working for the whole case (when ICAI answers the case before its MCQs), verbatim |
| item | `Question` | the item's own text, verbatim (an MCQ: the question without its options) |
| | `Options` | MCQ: four lines `(A) …` to `(D) …` (an option may continue on the next lines) |
| | `Answer` | ICAI's answer, verbatim; may be empty for a past-paper MCQ whose only answer is the key table |
| | `Approach` | optional, **ours**: 1–3 sentences on how to attack it (never the answer itself) |

## 4. The build

`tools/buildlib/bank.py` reads `bank/items/**/*.md` and `bank/sources.json`; `build.py` ships what it returns next to the (empty) GATE
loader, so every existing reader keeps working.

**Validation** (errors stop the build; drafts are skipped unless `--include-auto`):
* the format: blocks, known keys, known headings, one document block first, file name = `doc`, folder = scheme and paper;
* provenance: `qfile` / `afile` / `paperfile` are files in `bank/sources.json` of the same scheme and paper; every item and case has page
  numbers inside the PDF's page count (answers too, unless `answers: unpublished` or `unavailable`);
* items: unique ids, `qno`, `type`; MCQs have exactly four options (A)–(D) and a key; marks are integers 1–20; `alt` and `case` point at
  real blocks; a descriptive item of a published document has an answer;
* tags: every tag is a syllabus id of the item's subject; an `imported`, `checked` or `reviewed` document has tags on every item
  (out-of-syllabus items excepted);
* Markdown: every table has a header row, a separator row and the same number of cells in each row ("unbalanced tables"); `$` maths is
  balanced; figures exist under `bank/figs/<doc id>/`;
* `choice` parses and names real questions, and each part choice names parts its question has (an item's first-level `part:` label;
  an OR alternative counts as the part it replaces); a sitting's maximum under the rule (`choice_max`, the app's count) equals the
  `Maximum Marks` the file's Instructions print (a warning: a past paper's file may hold only Part II, and `marks: none` items lower it).

**Output.** Each document becomes a paper row (`manifest.papers`): `{id, kind, scheme, attempt, attemptLabel, series, label, year, set,
subjects, paperCode, n, marks, minutes, keyed, choice, parts, sittable, answers, src: {q, a, paper: {file, url, sha256, listing}}}`.
Each item becomes a row of `manifest.pyq` (columns `id paper sec no marks type subject topic subtopic diff flags label tags case alt`:
`sec` 0 = Part I MCQ, 1 = Part II; `type` 0 = MCQ, 3 = descriptive) and a record in `data/pyq/<doc id>.js` with the full text:
`{id, section, no, label, marks, type, stem, options, answer (the key: {kind: 'single', value} | {kind: 'oneof'} | null), key_raw,
group: {kind: 'case', id, label, context, answer}, ans, ours, figures, pg: {q, a}, oos, note}`. Flag bits add `OOS` 1024 and `ANS` 2048
(ICAI's answer is published). The search index covers the text of every item.

## 5. The app

The GATE screens are adapted, not replaced; the v3 look stays.

* **Bank** `#/pyq`: filters for paper (P4, P5, P6A, P6B: the subject row), chapter and sub-topic (`topic`, `sub`), kind (`kind=rtp|mtp|pyq`),
  attempt (`attempt=sep2026`), scheme (`scheme=new|old`), type (`type=MCQ|DESC`), document (`paper=<doc id>`), status (`status=new|missed|got`,
  plus bookmarked, noted, learned). Rows read "RTP Sep 2026 · Q5(a) · Costing · Material Cost · 5 marks · Descriptive". Practise 10 and
  Make a test work on any filter. With few items every count is real and empty states say what is coming.
* **Question page** `#/q/<id>`: the case (stem), the question, the options for an MCQ; for a descriptive item a box for your own answer
  (optional, kept on this device), **Show ICAI's answer**, then **Got it · Partly · Missed**. An MCQ is checked against ICAI's key. The
  answer fold is titled "ICAI's answer" (RTP / MTP: "ICAI's answer (RTP)" etc.) and shows the case working first; our approach note is the
  Hint, labelled "PassBook's note". The source line links the PDF at its page.
* **Lesson page**: the Practice section lists the ICAI items tagged to the lesson: "ICAI asked this: 6 items · RTP Sep 2026, MTP Jan 2026
  Series II, May 2025 exam", rows with their state, and Practise these.
* **Subject and chapter pages**: ICAI item counts per chapter and sub-topic, which attempts asked them.
* **Tests** `#/test`: sit any MTP or past paper as a timed 3-hour paper (§7); MCQ drills and filtered tests from the bank.

## 6. Marking and self-grading

* **MCQs** auto-grade with ICAI's key: the marks if right, 0 if wrong or skipped. **No negative marking** (ICAI has none). `B/C`: either
  scores; `none` and `unpublished`: practice only, not scored.
* **Descriptive items**: the learner writes or thinks an answer, opens ICAI's answer and marks **Got it**, **Partly** or **Missed**.
  * Got it is a right answer; Partly and Missed are misses: the item enters the error notebook and comes back on the review schedule
    (Missed: the next day, then SM-2 "again"; Partly: SM-2 "hard"). A Got it three or more study days after the last miss resolves it.
  * Mastery (lesson, chapter, paper) counts Got it as 1, Partly as ½ and Missed as 0 of the item's latest outcome.
  * XP: as for MCQs (a first Got it 10, a later one 3, Partly or Missed 1).
* The attempt log row is `[time, id, ok, ms, mode, flag]` with `flag = 'pt'` for Partly; `q[id].g` holds the last grade (`got`, `partly`,
  `missed`) and `q[id].mine` the learner's own answer text (at most 4,000 characters, on this device only).

## 7. Paper sittings

Any document with marks (an MTP or a past paper) whose answers are published can be sat as a paper (`#/test?new=paper&paper=<doc id>`;
Paper 6 also by section).
* The paper keeps ICAI's order and parts: **Part I** (MCQs, 30 marks; P6: 15 per section) and **Part II** (descriptive, 70; P6: 35), on
  ICAI's clock (3 hours; one P6 section 90 minutes) with the navigator and pause of the GATE runner.
* ICAI's choices are honoured: the `choice` rule ("Question No. 1 is compulsory; answer any four of the rest"; "Question 1: answer any 7
  of (a)–(h)") is shown in Part II; an OR pair counts once. If more questions (or more parts of a question with a part choice) are
  answered than the paper allows, PassBook counts the first ones in paper order and says so on the result page. This is the rule ICAI's
  old-scheme past papers print ("only the requisite number of questions first answered in the answer book shall be valued"); the maximum
  counts a group's (or a part choice's) largest questions (parts), which ICAI gives equal marks.
* A descriptive item in the runner has a box for the answer and an "I answered this on paper" tick (either makes it attempted).
* **Submit → self-marking → result.** MCQs are marked at once. Each attempted descriptive item is then shown with your answer and ICAI's
  answer, and you give yourself marks out of its marks (0 to the item's marks in halves; Full / Half / Zero shortcuts). The result counts
  only what the choice rule allows: score out of 100 (P6 section: 50), Part I and Part II, by chapter, time per question.
* Self-marked items also feed the notebook and SRS: full marks = Got it, more than 0 = Partly, 0 = Missed.

## 8. Tools (`tools/bank/`)

| command | what |
|---|---|
| `python3 -I tools/bank/seg.py <doc id or manifest file> [pages]` | the PDF text of a page range with layout (`pdftotext -layout`, the Rupee font's backtick as ₹, `=== p.N ===` page marks); `--find "words"` lists the pages that contain them |
| `.venv/bin/python -I tools/bank/seg.py <doc> --png 21 [--clip x0,y0,x1,y1] [-o out.png]` | renders a page (or a region, in PDF points) to PNG for checking a table or cutting a figure |
| `python3 -I tools/bank/check.py bank/items/new/p4/<doc>.md` | validates one document file with the build's rules, then compares every number in the transcription with the numbers in the PDF text of the cited pages (a multiset diff, page by page), flagging any number present in one but not the other, plus marks and MCQ keys against the PDF |
| `python3 -I tools/bank/sources.py` | refreshes `bank/sources.json` from `~/CA_PERSONAL/ca_sources/q/manifest.json` |
| `python3 -I tools/bank/smimport.py` | the SM import (§10) |
| `python3 -I tools/bank/plan.py` | the document list with estimated item counts and the transcription batches (§11) |

## 9. The transcription guide

This is what each transcription agent follows. Read §1–§3 first.

### 9.1 The job, step by step
1. Look up your documents in `~/CA_PERSONAL/ca_prompts/bank_batches.json`. For each: `python3 -I tools/bank/seg.py <doc id> --info` names the files,
   their pages and notes (e.g. "questions pp.1-19, answers pp.20-49").
2. Create `bank/items/<scheme>/<paper>/<doc id>.md` (P6: `.fm.md`; Strategic Management comes from the SM import, never transcribe it)
   with the document block, `status: draft`.
3. Work page by page with `seg.py <doc> <pages>`. Copy ICAI's words into the blocks, in ICAI's order, repairing **only** extraction
   damage (below). Render any table or formula you are unsure of with `--png` and read the image.
4. Tag every item (§9.5), add `difficulty`, and an `Approach` note where it helps.
5. `python3 -I tools/bank/check.py <file>` until it reports no errors; read every number it flags against the PDF and fix the
   transcription (never the PDF's text). A flagged number that is really ICAI's (a page number inside a sentence, a typo ICAI printed)
   is accepted with a line in the document's `note`.
6. Set `status: checked`, run `.venv/bin/python build.py --check` (it must stay green for everyone), then a full
   `.venv/bin/python build.py` (`--check` writes nothing, so a new document shows "Question not found" until data/ is rebuilt), open one item in the app
   (`SHOT_CALM=1 tools/shot.sh "/q/<id>?shot=answer" /tmp/x.png 1440 2400`: `?shot=answer` opens ICAI's answer, `?shot=B` picks an
   MCQ option) and report.

Document blocks for MTPs and past papers: `qfile` is the question paper (MTP `…-q.pdf`; a past paper's Suggested Answers `…-a.pdf`,
which reproduces the questions), `afile` the answers file. Transcribe ICAI's printed instructions (time, marks, "Question No. 1 is
compulsory. Attempt any four …") under `#### Instructions` with `q:` = their page, and set `choice:` from them
(`choice: q1; any 4 of q2-q6`; `choice: all` when every question is compulsory): without it the paper cannot be sat. **A choice inside a
question** (old P6 "State with reasons … (Answer any seven)" over eight 2-mark statements, old P3 "Answer any four of the following:" over
five 5-mark parts, old P7 "Attempt any two parts") is a part choice at the end of the rule, read from ICAI's printed line, which the file
keeps (the question's lead-in as its case, or quoted in the `note`):
* `o-p6-pyq-nov2023`: Instructions "Question No.1 is compulsory. Attempt any four questions from the remaining five questions."; Q1's
  case "State with reasons whether the following statements are correct or incorrect. (Answer any seven)" over (a)–(h), "(7 x 2 = 14
  Marks)" → `choice: q1; any 4 of q2-q6; q1: any 7 of (a)-(h)` (Part II: 14 + 4 × 14 = 70).
* `o-p3-pyq-dec2021`: Instructions "Question No. 1 is compulsory. Attempt any four questions out of the remaining five questions."; Q6's case "Answer any four of the following:" over (a)–(e), "(4 x 5 = 20 Marks)"
  → `choice: q1; any 4 of q2-q6; q6: any 4 of (a)-(e)` (20 + 4 × 20 = 100).
The parts are named as `part:` prints them (`(a)-(h)`, `(i)-(viii)`, `(a), (c), (e)`). The rule's maximum must equal the marks ICAI prints
(the Instructions' `Maximum Marks`, Part II's total): `check.py` and the build warn when it does not. Each part stays its own item with its
printed marks. If the printed line is missing or unclear, leave `choice:` out (the paper stays practice only) and say why in the `note`. Every MTP and
past-paper item has `marks:`; where the document prints none for it (a past paper's Suggested Answers often print no marks for the Part I
MCQs, whose OMR paper is separate) write `marks: none` and say so in a `note` (never infer 2 marks). Item keys: Part I MCQs `m1` … (their
own numbering), Part II `q1a`, `q2b` … (§2).

### 9.2 Verbatim rules
* **Copy, never rewrite.** Same words, same order, same numbers, ICAI's spelling and typos (write `[sic]` nowhere; note it in `note`).
* Repair only what extraction broke: re-join words and lines split by the layout, drop running heads, footers and page numbers, restore
  the rupee sign (`₹`; ICAI's font prints a backtick), restore table columns, turn bullet glyphs into `- ` lists, fix ligatures.
* Keep ICAI's emphasis that matters: capitalised instruction verbs stay capitalised (CALCULATE, PREPARE); headings ICAI prints in bold
  become `**bold**` lines; numbered lists stay numbered (`1.`, `(i)`).
* Marks lines ("(5 Marks)", "(5 x 2 = 10 Marks)") go into `marks:`, not the text. Question numbers and sub-part labels go into `qno` /
  `part`, not the text (a list *inside* a question keeps its labels).
* Formulas: plain text where ICAI's text is plain (`42,42,764/35,00,000`); a stacked fraction or a root may be written in KaTeX
  (`$\sqrt{\dfrac{2AO}{C}}$`, `$\dfrac{2,54,500}{116}$`) with exactly ICAI's symbols and numbers.
* Never add an answer ICAI did not give, never complete a working ICAI shortened, never correct ICAI's arithmetic. If ICAI's text is
  unreadable, write `[illegible in the PDF]` and add a `note`.

### 9.3 Tables
Every table becomes a Markdown table: a header row, a separator row (`|---|---|`) and the same number of cells in every row
(`check.py` and the build reject an unbalanced table). Rebuild columns from the rendered page (`--png`), not from the text dump.
* A multi-line cell is one cell (join its lines with a space). Bulleted lines inside one cell: `• first<br>• second`.
* **A table with no header row** (ICAI often prints a list of particulars and amounts in a box): an empty header row,
  `| | |` then `|---|---:|`. The app draws no empty head.
* **Merged (two-level) headers**: the first header row carries the group names in their first column and leaves the columns they
  span empty; the second level is the first body row, in bold. ICAI's
  "Production Department (Fabrication, Assembly) | Service Departments (Stores, Maintenance)" becomes
  `| Particulars | Basis | Production Department | | Service Departments | |` + separator +
  `| | | **Fabrication** | **Assembly** | **Stores** | **Maintenance** |`. A third level is a second bold body row.
* Right-align number columns (`---:`). Bold the rows ICAI prints in bold (totals) with `**…**` in each cell.
* Empty cells stay empty; ICAI's dashes stay (`—`, `---`, `--`); brackets for negatives stay (`(5,06,197)`).
* An account (T-format ledger) becomes a table with columns `Particulars | ₹ | Particulars | ₹` (Dr. left, Cr. right), or with the
  Units columns ICAI prints (`Particulars | Units | ₹ | Particulars | Units | ₹`).
* A stacked fraction inside a cell is written inline with a slash, exactly ICAI's numbers: `(2,54,500/116 x 24/60/32)`.
* Numbers keep ICAI's Indian grouping (`18,20,000`), ICAI's typos included (`36,01330`).

### 9.3a Markdown details
* A line that would start a list by accident: escape it. `\* 28,000 × …` (ICAI's footnote asterisk), `2\. = …` (a number that is not a
  list item). `**\*** (Material …)` is a bold asterisk.
* Lists ICAI numbers keep their labels as text paragraphs: `(a) Economic Order Quantity` on its own line with a blank line between
  them (Markdown would renumber a `1.` list only when ICAI's numbering is 1, 2, 3 …, which is fine).
* Maths: `$…$` is KaTeX. Inside it, write a comma as `{,}` (`$\dfrac{2 \times 14{,}600 \times 200}{14}$`), words as
  `\text{hours}`; `$\sqrt{\dfrac{2 \times A \times O}{C}}$` for EOQ. Outside maths, plain text.
* Headings ICAI prints in bold inside an answer (`Working Note:`, `Statement of …`) are `**bold**` paragraphs, never `#` headings.

### 9.3b Splitting ICAI's answers between items
ICAI often answers a case's MCQs (or a question's parts) in one run. Split the run, never re-order it: the working ICAI prints *before*
the first item's label goes in the case's `Answer`; then each item's `Answer` is ICAI's text from its own label (`(i) (B) ₹ 5,43,669`)
up to the next item's label; anything after the last label belongs to the last item. Reading the case's Answer and the items' Answers in
order reproduces ICAI's text exactly. Drop only the label itself (`(i)`, it is in `part:`).
A question whose parts ICAI marks separately but answers in one indivisible working stays one item (marks = their sum, and a `note`
saying so). RTP Part II chapter headings (`Material Cost`, `Cost Sheet` …) are headings, not question text: leave them out.

### 9.3c check.py: reading its report
* `NUMBERS: … 9 is in the PDF (p.7) 1x more than in the transcription`: a number on the cited page you have not transcribed (or a page
  cited by mistake). `… in the transcription (item q5 answer) 1x more than in the PDF`: a typo, or a number that is not on the cited pages.
* A number the layout breaks across two lines (`(150:100:4` / `0:20)`) is paired automatically, and so is a number whose grouping
  commas the text layer spaces out or splits with a space (an equation object's `₹ 6, 00, 000`, `Rs.1 0,000`, against
  your `6,00,000`, `10,000`).
* 2026-10-20 (lead): after the new check.py, 1,434 accepted numbers it no longer needs were removed from 166 checked files (each file re-checked clean); document notes may still describe numbers that are no longer on an `accept:` line.
* What check.py expects without any `accept:` (bank-tools, 2026-10-20):
  - **Past papers** (Suggested Answers that print `Question N` once, before the question, and head the answer only `Answer`): the
    question number counts once, where `Question N` stands; an item whose first `q:` page lies under another `Question M` is reported
    (its qno or its pages are wrong). A qno ICAI does not print (`label: MCQ (i)` for qno 1) is not counted.
  - **Headings and labels**: a case's `label:` (`Case Scenario 1 [MCQs 1-3]`) counts on the case's pages and on the first answer page
    that prints it again; a `part:` number (`(c)(1)`, `(4)`) counts where the question page prints it at a line start (and answers
    a missing number on the item's first answer page); so does the sub-number of `label: MCQ 1.4` (ICAI's `4.` or `1.4`), as an answer
    to a missing number only.
  - **Furniture no block reproduces**: the title's paper number (`PAPER – 4: COST AND …` in a P4 document, `PAPER 6A :` in P6), an
    MTP's header lines (`Mock Test Paper - Series I: July, 2026`, `Date of Paper: …`, `Time of Paper: …`) and an answers file's
    reprint of `Time Allowed – 3 Hours` / `Maximum Marks – 100`. Transcribe them anyway and they are compared.
  - **Running heads and page numbers**: a head or foot printed in variants (`PAPER – 8 : …` / `PAPER 8: …`, `NOVEMBER, 2023` /
    `NOVEMBER 2023`, with the page number on the line on some pages and on a line of its own on others) is one head; in a compilation
    PDF (one paper on a few pages of a group's file) heads are also read on the pages the document spans; a `Question N` line is
    never a head, nor is a line holding no letter (`1,13,778`, `0.907`, `3.`), and `&` / `AND` and letter case are aside. When a file
    numbers its pages only the page's own number (`12`, `(12)`, `- 12 -`) is dropped, so a stacked fraction's lone number on a page's
    first or last line stays.
  - Marks notes `(1 + 3 Marks)` (no total), `(5 x 2 Marks = 10 Marks)` and an MTP's `[2 Marks]`; `Rs.1,70,000` read whole;
    subscript digits (`nP₀`, `P₁`), a square's `²` after a bracket and an equation's bold digits read as digits (a superscript
    right after a digit, ICAI's footnote mark `500¹`, runs into it as the text layer prints it, `5,001`); the old scheme's `MOCK TEST
    PAPER 1`, `Test Series: September 2023` and `8A: FINANCIAL MANAGEMENT` as furniture; ligatures (ﬁ ﬂ ﬀ ﬃ ﬄ) in the word check.
  - A roman label (`label: MCQ (ii)`) must agree with the item's qno (it is reported otherwise).
* A number that is genuinely ICAI's and cannot match (a page number inside a sentence, a formula image with no text layer) is
  accepted with `accept: 4` on the block (or the document block) **and** a `note:` saying what it is. Never accept a number you have
  not looked at. `info: accept: … no longer match(es) any difference` lists accepted numbers nothing needs: take them out (and their
  note), since an unused accept hides the next real difference of that number anywhere in the file. **How far an accept reaches**:
  `accept: 1` covers a difference of one `1` in *each* page group, not one in the whole file (a number accepted once covers its
  largest shortfall in any one group), so an accepted number can hide a real miss of the same number in another group. Counting
  accepts against the file-wide total would be stricter, but 24 checked files (2026-10-20) rely on the per-group reading; until
  their accept lines are completed, list a number as many times as it differs across the file (`accept: 1, 1, 1`) when you can.
* `marks:` lines: the PDF's `(5 Marks)` / `(5 x 2 = 10 Marks)` notes are compared with your items' `marks:` (Part totals such as
  `PART I … (30 Marks)` are ignored). Paper 6: a page a section file cites for answers only (an MCQ Answer Key page that also
  prints the other section's MCQs, as in May 2025's 6A PDF) gives no marks lines to that file.
* `WORDS:` lines: a block whose word runs are not found on its pages: re-read it (a paraphrase, a skipped sentence or wrong pages).
* `info: pages with numbers that no block cites`: usually the instructions or Hindi pages; otherwise something is missing.

### 9.4 MCQs
* The options go under `#### Options` as `(A) …` to `(D) …` (ICAI prints (A)–(D) or (a)–(d): always write capitals).
* `key:` is ICAI's: from the RTP/MTP answer, or from the past paper's "Answer Key" table (its row for that MCQ). An irregular key is
  written as ICAI gives it (`B/C`, `none`) with a `note` quoting ICAI.
* The `Answer` is ICAI's text for that MCQ (the option it gives and any working). A working ICAI prints once for a whole case goes in
  the case's `Answer`. A past paper whose MCQ answer is only the key table leaves `Answer` empty.

### 9.5 Tags, difficulty, approach (ours)
* `tags:` the PassBook sub-topic(s) the item examines, most important first: ids from `content/syllabus/syllabus.txt` (e.g.
  `cma.mat.eoq`). Use a chapter id (`cma.mat`) only when the item genuinely spans the chapter. Tag by what is asked, not by where the
  question sits in the document. `grep -n "<word>" content/syllabus/syllabus.txt` finds candidates.
* `difficulty:` easy (one idea, direct), medium (two or three steps or ideas), hard (long, multi-step or subtle). It is our estimate.
* `#### Approach`: optional, at most three sentences, the first move a good student makes ("Close Maintenance first: it serves Stores").
  Never the answer, never a number from the answer.

### 9.6 Figures
Only where a picture cannot be text (a chart, a diagram, a graph; never a table or a formula). Render with
`seg.py <doc> --png <page> --clip x0,y0,x1,y1 -o bank/figs/<doc id>/<item key>-1.png`, then add to the block
`figure: q8-1.png | question | A break-even chart with … (alt text that says what the figure shows)`. `where` is `case`, `question`,
`answer` or `option:A`. The build ships `bank/figs/<doc id>/*.png` as WebP next to the GATE `pyq/figs` (`tools/buildlib/figures.py`), and
the card shows an `answer` figure inside ICAI's answer fold, after the item's answer, never in the question above it (a diagram that is
ICAI's whole answer, e.g. `o-p7-pyq-nov2018` 7(b)).

### 9.7 Old scheme
Old-scheme papers (`o-p3-…` Cost, `o-p6-…` Audit, `o-p8-…` FM, Section A only, never Economics) are transcribed the same way. Tag
by the new syllabus. Where the topic is no longer in the new syllabus (e.g. old P3 uniform costing, old P6 company audit sections that
moved, old P8 topics now outside 6A), set `oos: yes` and a `note` naming the topic and why; `tags` may then name the nearest chapter or be
left out.

### 9.8 Status and review
`draft` files never ship. `imported` = converted by the SM import (§10), shipped, not yet re-read by a person. `checked` = complete,
`check.py` clean, every page re-read against the PDF. `reviewed` = a second agent read
the rendered PDF pages against the transcription (a reviewer fixes, never rewrites, and adds `note` lines for anything accepted).

## 10. SM import

`~/CA_PERSONAL/sm-qbank` (its `SPEC.md`) holds every ICAI Strategic Management question of the RTPs, MTPs and past papers from May 2018 to Sep 2026
with ICAI's answer: 76 JSON files, one per ICAI document, 1,476 records (1,177 distinct questions: ICAI reuses questions across
documents and sm-qbank's PDF prints each once; the bank keeps every document whole). Its words were matched to the PDFs by its
`provenance.py` (5-word runs). `tools/bank/smimport.py` turns each file into one bank file:

| sm-qbank | bank file | PDFs (`qfile` / `afile` / `paperfile`) |
|---|---|---|
| new scheme, Paper 6B | `bank/items/new/p6/n-p6-<kind>-<attempt>[-sN].sm.md` (`section: sm`) | the `~/CA_PERSONAL/ca_sources/q` manifest's own files (RTP qa; MTP q + a; past paper: Suggested Answers as `qfile` and `afile` (`a-6b` for May 2025), the scan as `paperfile`) |
| old scheme, Paper 7 Section B | `bank/items/old/p7/o-p7-<kind>-<attempt>[-sN].sm.md` | sm-qbank's own copies (`raw/`), added to `bank/sources.json` as `sm-qbank/raw/…` with `"origin": "sm-qbank"`, their sha256, page count, ICAI URL and sm-qbank's source note (mirror copies say so) |

What the tool does to ICAI's text: nothing to the words. It drops sm-qbank's pointer lines ("[Shared case scenario — see question
1(i).]"), splits a shared case from its first MCQ into a case block (the text after the last line break is the MCQ's own stem, as
sm-qbank's build splits it), drops the printed label that `part:` carries ("(ii) "), re-joins the layout's line breaks inside a printed
paragraph (below), makes each remaining extracted line a paragraph (bullets, including ICAI's Wingdings bullets that extract as
private-use glyphs, stay a list; tables stay tables; `2.` at a line start is escaped) and escapes `*`, `_`, `$`. An MCQ keeps ICAI's key; sm-qbank's answer line
"(b) <option text>" is its reconstruction (ICAI prints only the letter) and is left out. Item keys follow §2: `1(A)(i)` → `q1a-i`,
`4(b) (OR)` → `q4b-or` with `alt: q4b`, a past paper's MCQ 9 → `m9`.

What it adds (ours, said in the document `note`): page citations (each block's 4-word runs matched to the PDF text page by page; a
table's cells by 3-word runs), tags, `oos: yes` with sm-qbank's reason for its OUT_OF_SYLLABUS questions, `marks: none` where sm-qbank
found none printed, and the choice rule read from ICAI's printed instruction ("Answer Question No. 5 which is compulsory and any 2 out of
the remaining 3 questions" → `q5; any 2 of q6-q8`; "Question 1 and 2 are compulsory" where Q1 is the MCQs → `q2; …`). Tags: the
chapter is ICAI's printed heading (new-scheme RTPs) or sm-qbank's mapping (MTPs, past papers and the whole old scheme, by judgement); the
sub-topic comes from keyword rules adapted from sm-qbank's `CANON` table, read in the stem (and an MCQ's right option), then the start of
the answer; where no rule fits inside the chapter the item is tagged by its chapter with the note "sub-topic tagging still needed". An MCQ
ICAI prints outside any chapter is tagged by keywords with the note "check the tags".

**Status.** `imported` when the file validates, every block's pages were found (60 % of its word runs on the cited pages; 50 % for an MCQ
whose options ICAI sets in columns; 30 % for a short sub-question or a table) and no number of the text is missing from its pages;
otherwise `draft` (never ships) with the reasons after "TO FINISH:" in the note, pages estimated from the neighbouring blocks. The run of
2026-10-20: 69 documents imported (1,365 items), 7 drafts (111 items): `n-p6-pyq-may2025` (its Part I MCQs are printed in the 6A
Suggested Answers, a second file this format cannot cite), `n-p6-mtp-may2024-s2` and `n-p6-rtp-sep2024` (one MCQ each with no tag),
`o-p7-mtp-may2018-s1`, `o-p7-mtp-nov2018-s2`, `o-p7-pyq-jan2021`, `o-p7-pyq-nov2018` (a block whose text was not matched). Tags: 1,231
items by sub-topic, 176 by chapter only, 159 out of syllabus.

**sm-bank-fix (2026-10-20).** Six of the drafts were finished from their PDFs and taken over (`by: sm-bank-fix`, `status: imported`; each
document `note` says what changed): pages confirmed; the old-scheme MTPs' layout line breaks re-joined where the PDF's line geometry shows
one paragraph; words the layout split re-joined; OR alternatives and separately marked sub-parts made their own items (`o-p7-mtp-may2018-s1`
`q6-or`, `o-p7-mtp-nov2018-s2` `q2a-i`/`q2a-ii`); sm-qbank's pipe tables of two diagrams replaced by figures (`o-p7-pyq-nov2018` 7(b),
9(a)) and a broken table rebuilt (`o-p7-mtp-nov2018-s2` 4(a)); choice rules corrected (`o-p7-pyq-jan2021`: `all`; `o-p7-mtp-may2018-s1`:
none, because its Section B asks for any two parts of Q1 and Q2, which `choice:` cannot express, so it is practice only; choice-ext
(2026-10-20) made it expressible, `all; q1: any 2 of (a)-(c); q2: any 2 of (a)-(c)`, left to the lead because the file is `imported`).
`n-p6-pyq-may2025` stays a draft: its MCQs are verified against the 6A file and tagged, but cannot be cited until the format allows a
per-block file. All 176 chapter-only items now have sub-topics, and a spot check of the importer's keyword tags (40 at random, 12 wrong)
led to more corrections. Every SM item now has a sub-topic tag unless it is out of syllabus.

**Paragraphs** (`tools/bank/paras.py`, run by the import). sm-qbank extracted most old-scheme MTPs one printed line per text line, so the
bank showed one paragraph per PDF line. The import now re-joins a text line to the one before it where the PDF's own geometry (word boxes
from `pdftotext -bbox`) shows one paragraph: the two printed lines are consecutive body lines (running heads, footers, page numbers and a
mirror's diagonal watermark skipped) at the normal line pitch on one page (ICAI's paragraph gap is 1.25 lines or more), or the first ends
a page and the second starts the next; the first line is full (the next word would not have fitted); the second has no label and starts
at the same text column; neither is a row of two columns. A blank line sm-qbank left at a page break is crossed only in a text it
extracted line by line. Nothing else changes: the words and their order stay sm-qbank's (a hyphen at a line end joins without a space:
`well-` + `defined`). sm-tags (2026-10-20): 2,015 joins in the files the import writes, 1,980 of them in the 18 old-scheme MTPs (65 to
148 each); in those 18, paragraphs that end mid-sentence before a lower-case line fell from 1,863 to 25 (the rest: a two-column
formulation/implementation table sm-qbank interleaved, in `o-p7-mtp-dec2021-s1`, `-jul2021-s1` and `-may2023-s1`, since rebuilt from the
rendered pages in `sm_text.json` (below), and a few lines whose PDF text differs from sm-qbank's). Every `check.py` report on the 76 files
is unchanged.

**Hand tags** (`tools/bank/sm_tags.json`, ours): `{"<doc id>:<item key>": {"tags": [...], "by": job, "why": ..., "was": [...], "oos" | "in":
reason, "syl_by": job}}`. The import uses these instead of its keyword rules, and notes "tags by <job> from the question and ICAI's
answer", so re-tagging an imported file never takes it over and a re-run keeps the tags. `was` keeps the tags a change replaced. `oos` /
`in` is a person's syllabus call (decided by the January 2027 Study Material: in if it teaches the topic, out otherwise); it replaces
sm-qbank's, with a note saying whose call it is and why (an `in` on an item sm-qbank already had in records a checked borderline call).
`note` is ours and is added to the item's note (e.g. on a doubtful ICAI key). `smimport.py` warns about a hand tag that names no syllabus
id or no item.

**Text repairs** (`tools/bank/sm_text.json`, ours): extraction damage the import cannot repair itself (a two-column table sm-qbank
interleaved line by line), copied verbatim from the rendered ICAI page: `{"<doc id>:<item key>": {"field": "answer", "from": "<Markdown
where the damaged run starts>", "text": "<ICAI's text as Markdown>", "by", "why", "source": "<file> p.N"}}`. The import replaces the field
from `from` to its end, adds a note naming the source page, and warns when `from` is no longer found (sm-qbank's text changed: re-check
the repair). So an imported file keeps the repair without being taken over. The keyword rule for the
experience curve now points at `sm.ext.porter` (SM 2.5.3, the lesson that teaches it), not `sm.ext.industry`.

**sm-tags (2026-10-20).** Every item whose tags still came from the keyword rules was re-read with ICAI's answer or key (1,089 items in
the import's files and the hand-finished ones; 889 distinct questions, ten reviewers on one guide, then a lead check of every change, a
40-item sample of the unchanged ones and the near-duplicate questions): 147 changed (103 primary, 44 secondary only), 942 confirmed.
All are in `sm_tags.json` (`by: sm-tags`); the hand-finished files carry theirs in the file, with a note. No SM item is tagged by
keywords any more. Syllabus calls, applied to every copy of the topic: evaluating the worth of a business, strategic management in
not-for-profit and government organisations, and the human resource manager's role in core competence are out (not taught); inbound
and outbound logistics (the value chain, SM 2.4.2) and why higher-level strategies are broken into functional strategies (SM 1.6) are in.
Second round (the lead's answers): the definition and dimensions of strategic decisions (Jauch and Glueck), the driving forces that
change an industry and the TOWS matrix are out (absent from the text of every chapter, checked on the rendered pages; 13 items);
items whose other half is taught stay in with a note (the strategic manager's tasks, SM 1.24-1.25; placing the decision-maker at the
top level, SM 1.24), and so does the segmentation-targeting-positioning MCQ (SM 2.6.2 names all three). The formulation/implementation
table of `o-p7-mtp-dec2021-s1` 6(b), `o-p7-mtp-jul2021-s1` 6(b) and `o-p7-mtp-may2023-s1` 5(a) is rebuilt in `sm_text.json`.

Run it again after sm-qbank changes (`python3 -I tools/bank/smimport.py`, `--dry` to see the result first): it rewrites only the files
that still say `by: sm-import`. A person who finishes a draft or changes an imported file's text takes it over by setting `by:` to their
job id (and `status: checked` once it is re-read against the PDF); the import then leaves it alone. Re-tagging goes in `sm_tags.json`. `check.py` on an imported file lists the PDF's numbers it does not transcribe (the section's instruction "Answer Question
No. 5 which is compulsory …", "1." before "(A)") as missing numbers: they are not errors of the import.

## 11. The document list and batches

`tools/bank/plan.py` lists every ICAI document in the manifest (193 to transcribe: P4, P5, P6A FM; old P3, old P6, old P8A FM; the pilot
is done, old P7 is the SM import's) with an estimated item count and writes the batches to `~/CA_PERSONAL/ca_prompts/bank_batches.json`:
`[{"id": "t-01", "docs": [<manifest files>], "bank_docs": [<doc ids>], "est_items": N, "est_minutes": M, "papers": [...], "note": ...}]`.
The estimate counts ICAI's marks lines in the pages being planned (one item each; "(5 x 2 = 10 Marks)" five), plus a past paper's MCQs
printed without marks; an RTP (no marks) its question numbers x 1.7 (the pilot: 16 questions, 28 items). Paper 6 is planned for 6A only:
the SM import's file gives the 6B count to leave out and, for an RTP, the page where 6A ends. Minutes = items x 1.5 (Costing, FM) or x 0.9
(Audit) + 0.3 a page + 8. A batch is whole documents up to about 45 minutes: most documents take 30 to 70 minutes alone, so a batch is
usually one document (a document is never split between two people: one file each). Order: the new scheme first (past papers, then MTPs,
then RTPs, newest first), then the old scheme. The 2026-10-20 plan: 192 batches, about 4,700 items and 155 hours; P4 about 830 items,
P5 about 870, P6A about 560, old P3 about 590, old P6 about 1,440, old P8A about 440. Re-run it to drop finished documents.

## 12. Tests

* `node tests/run.js bank` (`tests/bank.test.js`): self-marking (skipped, pending, Got it / Partly / Missed, marks in halves and
  clamped), no negative marking for ICAI MCQs, the choice rule (compulsory, `any n of`, excess answers, OR pairs, the maximum; part
  choices: the first n parts answered count, an OR pair inside a part, the maximum, a part choice inside a group and under `all`), sittings
  (`icaiPaper`: order, clock, one Paper 6 section), `icaiRecord` (states, pending marks, excess), drills (`icaiDrill`: MCQs, no
  out-of-syllabus items, unseen first), the actions (a grade is an attempt; Partly and Missed open the notebook; the `pt` log row;
  `markTest` re-scores a sitting), and on the shipped data the kind / attempt / type filters, the search words "rtp sep 2026 q5", the Part
  groups and the exam-only insights view. It also runs the Python tests.
* `python3 -I -m unittest discover -s tests/py -p test_bank.py` (`tests/py/test_bank.py`): the format and every validation rule
  (provenance, unknown keys, keys, status, tags, tables, options, marks and `marks: none`, `imported`), `parse_choice` (part choices:
  ranges, roman parts, lists, errors), the part-choice validation, `choice_max` and the printed-maximum warning, `check.py`'s
  numbers, marks lines (a Part's total and "part of" are not marks), split numbers, running heads, the SM import's item keys, Markdown,
  case split, labels, tags and choice wording, and the plan's estimate.
* `python3 -I tools/smoke.py` (and `demo`): the self-test walks the ICAI screens (the descriptive card, Partly into the notebook, the
  bank's filters, the lesson's "ICAI asked this", an MCQ drill, a paper sitting through self-marking to its result).
