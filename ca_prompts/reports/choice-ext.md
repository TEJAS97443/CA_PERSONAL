# choice-ext report (2026-10-20)

## The syntax

A choice inside one question is a **part choice** clause at the end of the `choice:` rule, one per question:

    choice: q1; any 4 of q2-q6; q1: any 7 of (a)-(h)        old P6 past paper: Q1 "(Answer any seven)"
    choice: q1; any 4 of q2-q6; q6: any 4 of (a)-(e)        old P3: Q6 "Answer any four of the following:"
    choice: q1; any 4 of q2-q6; q1: any 7 of (i)-(viii)     old P6 MTP: Q1 "(Attempt any 7 out of 8)"
    choice: all; q1: any 2 of (a)-(c); q2: any 2 of (a)-(c) old P7 May 2018 MTP Section B "Attempt any two parts"

- `qN: any K of <parts>`. The parts are written the way `part:` prints them: `(a)-(h)`, `(i)-(viii)` (roman), or a list such as `(a), (c), (e)`. Brackets are optional.
- A part choice only says which K of question N's named parts count. Whether question N counts at all is still decided by the earlier clauses (compulsory, `any n of`, `all`).
- **Why this form.** It is backward compatible: no existing rule contains `qN:`, so every old string parses to the same value. It names the parts and how many count. It reads in ICAI's own order ("Question 6: answer any four of (a)–(e)"). It works with compulsory questions, groups and `all`.
- An item belongs to its first-level part, so `(c)(i)` counts as part (c). An OR alternative belongs to the part it replaces. A part's marks count its OR pair once.
- **Maximum.** A question with a part choice is worth its K largest named parts, plus any parts the rule does not name.
- **Scoring.** The first K parts answered count, in paper order; parts answered after them are "excess". This is the rule ICAI's old past papers print: "only the requisite number of questions first answered in the answer book shall be valued". It is also how `any n of` already worked. The brief said "best n". I read that as the maximum (the K largest parts) and did not score by self-marks, which would contradict the documented excess rule.
- **Documented** in `docs/ICAI_BANK.md`: the `choice` row in §3.1, §4 validation, §7 sittings, and §9.1 with two real examples (`o-p6-pyq-nov2023`, `o-p3-pyq-dec2021`). §10 notes that `o-p7-mtp-may2018-s1` can now be written. §12 lists the tests.

## Build (`tools/buildlib/bank.py`)

- `parse_choice` reads part clauses and returns `parts: [{q, n, of, span}]`. It rejects: K ≥ the number of parts, a part named twice, two part choices for one question, a part choice with no questions' rule before it, `all` mixed with groups, and unreadable or backwards ranges.
- `check_file` checks that each part choice's question has descriptive items and that every named part has an item. The error lists the parts the question does have.
- `choice_max(items, choice)` mirrors the app's count. A new warning fires when a sitting's maximum differs from the `Maximum Marks` printed in the file's Instructions. `check.py` shows it too. Before this job that warning was documented but did not exist in the code.
- `choice_row` ships the paper row's rule with `parts: [{no, n, of, span, ids: [[item ids per part]]}]`, so the app needs no label parsing. A rule without part choices ships exactly as before.

## App

- `scoring.js`: new `partsOf` and `questionMax`. `applyChoice` now:
  - counts the first K parts answered and marks the rest `excess` (keys like `1(h)`);
  - uses the part-choice maximum inside groups;
  - keeps OR pairs working inside a part;
  - falls back to printed labels for a hand-made rule without `ids`.
- `testgen.js`: `choiceWords` moved here from the view so it can be tested. It now adds parts in ICAI's words ("Question 1 is compulsory; answer any 4 of Questions 2–6; in Question 1, answer any 7 of (a)–(h)"). The excess note now says "questions or parts".
- `views/test.js`:
  - The briefing's Part tiles now show the marks the choices count (Part II 70, where the items added up to 90; this also fixes the old 84-for-70 display on every paper with a choice). The Part II tile shows ICAI's rule.
  - Dashes in rules no longer wrap at a line end.
  - The runner header's shortened rule shows in full as a tooltip.
  - The marking page's "not counted" text now says "questions or parts".
- `views/qcard.js`: the same "questions or parts" wording.

## Files updated: 37, now sittable (check.py: 0 errors and 0 number problems on every one)

`choice:` was added before `q:`, with a doc-note entry "choice: added by choice-ext from ICAI's printed instruction (2026-10-20) …". The entry quotes the file's own printed line and says the earlier "No choice rule" sentence predates the syntax. Before writing, I confirmed each printed line in the PDFs.

- **Old P3 ×14, `q1; any 4 of q2-q6; q6: any 4 of (a)-(e)`, maximum 100** (was 105):
  - MTPs: o-p3-mtp-may2022-s1, -may2022-s2, -may2023-s1, -nov2020-s1, -nov2022-s1
  - Past papers: o-p3-pyq-dec2021, -jan2021, -jul2021, -may2022, -may2023, -nov2019, -nov2020, -nov2022, -nov2023
- **Old P6 MTPs ×15, `q1; any 4 of q2-q6; q1: any 7 of (i)-(viii)`, maximum 100** (was 102):
  - dec2021-s1/s2, jul2021-s1/s2, may2020-s1, may2022-s1/s2, may2023-s1/s2, nov2019-s1, nov2020-s1, nov2022-s1/s2, nov2023-s1/s2
- **Old P6 past papers ×8, `q1; any 4 of q2-q6; q1: any 7 of (a)-(h)`, maximum 70** (the Part II booklet prints "Maximum Marks - 70"):
  - dec2021, jan2021, jul2021, may2022, may2023, nov2020, nov2022, nov2023

Sittable old-scheme MTPs and past papers: 98 of 104 (165 sittable in all).

## Left for the lead

- **o-p6-pyq-nov2019** (checked) stays practice only. The Suggested Answers print Q5(d) as 4 marks but the scan prints 3. With the file's 4, Q5 totals 15 and the rule gives 71, not ICAI's 70. If q5d is set to 3, then `choice: q1; any 4 of q2-q6; q1: any 7 of (a)-(h)` gives 70.
- **o-p7-mtp-may2018-s1** (imported, so not touched). Its rule would be `all; q1: any 2 of (a)-(c); q2: any 2 of (a)-(c)`, which gives 50, matching the printed "Maximum Marks – 50".
- **o-p7-pyq-jul2021 and o-p7-pyq-nov2020** (imported): no choice rule found in the PDF text. This is not a part-choice problem.
- **n-p4-mtp-sep2026-s1 and -s2**: ICAI prints no Part II choice rule (see tx-01/tx-03). Unchanged.

## Existing old-scheme `choice:` lines

- **Match the printed total:**
  - old P3 ×10 (100 = "Maximum Marks – 100")
  - old P8 ×24 (60 = "SECTION – A Marks : 60")
  - old P7 MTPs ×19 (50 = "Maximum Marks – 50")
- **Could not be confirmed:** the old P7 past papers' Suggested Answers print no Section B total. dec2021, may2019, may2022, nov2019, nov2022 and nov2023 give 35, which is 50 minus the 15-mark Part I not in the files. may2018 and nov2018 give 50.
- **To look at:**
  - **o-p7-pyq-jan2021** `all` gives 45 (Q6 5 + Q7–Q10 10 each, under "any four from the rest" with only four printed). There is no printed total to check it against.
  - **o-p7-pyq-may2023**: every descriptive item is `marks: none`, so its maximum is 0 and it cannot be sat. The hub wrongly says "ICAI's choice of questions is not printed".
- **New warnings on new-scheme files** (`marks: none` MCQs make the maximum short, though both stay sittable):
  - n-p5-mtp-may2024-s1: 76 against a printed 100
  - n-p6-mtp-sep2025-s2.fm: 40 against a printed 50

## Tests added

- **tests/py/test_bank.py ChoiceTest:**
  - `test_parse_part_choice`: ranges, roman, lists, `all` with parts, 7 error cases
  - `test_part_choice_validation_and_maximum`: missing part, missing question, K too big, OR in a part, sub-parts, the printed-maximum warning
  - `test_paper_row_ships_part_choice_ids`
  - an assertion in `test_parse_choice` that old rules parse unchanged
- **tests/bank.test.js, 3 tests:**
  - old P6 Q1 any 7: excess (h), maximum 72, fewer parts tried
  - a part choice inside a group, an OR inside a part, a rule without ids, and `all` with two part choices
  - `choiceWords`, `icaiRecord` (score 26, maximum 72, note), and `paperChoice` re-applying the rule

## Verify

- `build.py` and `--check` exit 0 (2 warnings, both above).
- `node tests/run.js`: 1594 passed.
- Python tests: 85 OK.
- `tools/smoke.py`:
  - before the view tweaks: 342/342
  - after them: the first run failed 3 nav-fit checks with "did not finish" while 48 Chrome processes from other agents were running; a re-run on a quieter machine passed 342/342.
- **Sat in headless Chrome**, using a driver page in /tmp/cx/sit:
  - o-p6-pyq-nov2023, all of Q1(a)–(h) and Q2–Q6 answered: the briefing shows "Part II · 70 marks" with the rule; the marking page shows Q1(h) "not counted"; the result is 69/70, with Q1(h) and Q6 not counted and the note "questions or parts".
  - o-p3-pyq-dec2021 with all of Q6(a)–(e) answered: 100/100, Q6(e) not counted.
