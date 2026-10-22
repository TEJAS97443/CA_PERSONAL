# sm-tags: Strategic Management paragraphs, tags and syllabus calls (report, 2026-10-20)

All three asks are done, and every check passes. No ICAI question or answer was invented or reworded. The only text change is re-joining line breaks the PDF layout had put inside a paragraph. In six places that also re-joined a word the layout had split at its hyphen (`well-` + `defined`).

## 1. Paragraphs

**What changed in the importer:**
- The new `tools/bank/paras.py` is the PDF-geometry method used on the drafts, now built into `smimport.py`. It uses `pdftotext -bbox`, so the import still runs under plain `python3 -I`.
- It joins a text line to the line before it only when the PDF shows both are one paragraph:
  - the two printed lines come one after the other, at normal line spacing (ICAI leaves 1.25 lines or more between paragraphs), or the first ends a page and the second starts the next;
  - the first line is full;
  - the second has no label ("(ii)", "2.", a bullet) and starts at the same column;
  - neither line is a row of a two-column table.
- Running heads, page numbers, the "(5 Marks)" notes and the castudynotes watermark are ignored when lines are matched.
- ICAI's Wingdings bullets (which extract as unreadable glyphs) now become `- ` list items.

**Re-run results:**
- 2,015 joins in the files the import writes. 1,980 of them are in the 18 old-scheme MTPs, 65 to 148 per file.
- In those 18 files, paragraphs that break off mid-sentence fell from 1,863 to 25.
- I checked joins against the rendered pages and every join I checked was right. That covers 8 random joins, all 35 joins outside the old MTPs, and a set of suspicious-looking ones.
- Two kinds of wrong join turned up while I was building it, and I fixed both before the final run:
  - paragraphs only 1.25 lines apart were being merged, so the spacing limit is now tighter;
  - a page-break rule was misfiring, so it now applies only to text that sm-qbank extracted line by line.

**What did not change:**
- The words, compared file by file, are the same apart from the six hyphen joins.
- The `check.py` report for each of the 76 SM files is identical before and after the paragraph re-join and the tag re-import.
- The hand tags in `sm_tags.json` survived the re-import.

**Left as it was:** a two-column "Strategy Formulation | Strategy Implementation" table that sm-qbank had interleaved, in `o-p7-mtp-dec2021-s1`, `-jul2021-s1` and `-may2023-s1`. It is still garbled, exactly as before. Rebuilding it would mean taking those three files over by hand.

## 2. Tags: a full pass

**Scope:** I re-read every item whose tags still came from the keyword rules: 1,089 items (889 distinct questions).
- 229 of them are the MCQs whose notes said "check the tags".
- 761 are items whose sub-topic had been picked by keywords within the chapter, both descriptive questions and MCQs.
- 99 are items in the hand-finished files.

**How:** each item was read with ICAI's answer, or its key for an MCQ, against one written guide.
- The guide maps each sub-topic to its Study Material sections.
- It includes the previous job's boundary decisions (for example, strategic group mapping goes to `sm.int.drivers`).
- Where two sub-topics competed, the lesson that teaches the concept decides.
- Ten reviewers worked in parallel. I then checked every change, a random sample of 40 unchanged items (all 40 correct) and every pair of near-duplicate questions (they now agree).

**Result:** 147 items changed (103 in their primary tag, 44 in a secondary tag only) and 942 were confirmed.

The most common moves of the primary tag:

| From | To | Items | Why |
|---|---|---:|---|
| `sm.ext.markets` | `sm.int.drivers` | 12 | strategic group mapping, and ICAI's list of marketing strategies (augmented, synchro-, enlightened, relationship) |
| `sm.intro.intent` | `sm.intro.levels` | 8 | the CEO's role, the strategic manager's tasks, the network of relationships between levels |
| `sm.int.resources` | `sm.int.generic` | 8 | "Explain competitive advantage", which is taught with the generic strategies |
| `sm.intro.intent` | `sm.intro.meaning` | 5 | benefits and limitations of strategic management |

Ansoff-quadrant items also gained `sm.choice.growth` as a second tag, and 7S items now lead with structure, not leadership.

**Where the tags are stored:**
- Every reviewed item is now in `tools/bank/sm_tags.json` (1,321 entries), with a short reason. A changed item also keeps its old tags, so a re-import keeps the new ones.
- The 8 changed items in the hand-finished files were edited in the files themselves, with a note on each.
- No SM item is tagged by keywords any more. The notes that said "check the tags" now say "tags by sm-tags".

**Counts per sub-topic, all items in the syllabus** (before = start of this job; the totals differ by one because of the syllabus calls in section 3):

| Sub-topic | Primary before | Primary after | Change | Any tag before | Any tag after |
|---|---:|---:|---:|---:|---:|
| `sm.intro.meaning` | 113 | 115 | +2 | 123 | 124 |
| `sm.intro.intent` | 110 | 100 | -10 | 112 | 103 |
| `sm.intro.levels` | 58 | 73 | +15 | 59 | 80 |
| `sm.ext.pestle` | 30 | 35 | +5 | 34 | 36 |
| `sm.ext.industry` | 39 | 42 | +3 | 40 | 42 |
| `sm.ext.porter` | 75 | 83 | +8 | 77 | 84 |
| `sm.ext.markets` | 61 | 38 | -23 | 65 | 38 |
| `sm.int.stakeholders` | 25 | 26 | +1 | 25 | 26 |
| `sm.int.drivers` | 50 | 67 | +17 | 50 | 67 |
| `sm.int.resources` | 56 | 39 | -17 | 62 | 40 |
| `sm.int.swot` | 23 | 22 | -1 | 23 | 22 |
| `sm.int.generic` | 107 | 112 | +5 | 109 | 119 |
| `sm.choice.growth` | 121 | 108 | -13 | 134 | 139 |
| `sm.choice.retrench` | 70 | 76 | +6 | 70 | 78 |
| `sm.choice.ansoff` | 35 | 40 | +5 | 36 | 43 |
| `sm.choice.portfolio` | 42 | 40 | -2 | 42 | 41 |
| `sm.impl.matrix` | 57 | 60 | +3 | 63 | 61 |
| `sm.impl.digital` | 37 | 34 | -3 | 38 | 35 |
| `sm.impl.structure` | 110 | 112 | +2 | 113 | 114 |
| `sm.impl.leadership` | 45 | 37 | -8 | 48 | 37 |
| `sm.impl.control` | 54 | 58 | +4 | 56 | 58 |
| **Total** | **1,318** | **1,317** | **-1** | **1,379** | **1,387** |

## 3. Syllabus calls

The test was the one you set: a topic is in if the January 2027 Study Material teaches it, out otherwise. Each call covers every item on the topic.

**Out** (6 items moved out):
- **Evaluating the worth of a business:** not in the Study Material. `o-p7-pyq-nov2019` 9(b) is now out, like `o-p7-mtp-may2018-s1` 5(a) and `o-p7-rtp-may2020` 13.
- **Strategic management in not-for-profit and government organisations:** not taught; the chapter 1 summary only mentions nonprofit users in one sentence. sm-qbank already had five items out, and four more now follow: `o-p7-rtp-may2019` 2, `o-p7-rtp-may2018` 5, `o-p7-rtp-may2020` 2 and `o-p7-mtp-may2019-s2` 1(ii).
- **The HR manager's role in building core competency:** from the old HR-strategy section, which is not taught. `o-p7-pyq-may2018` 8(b) is now out, like the other HR-manager items.

**In** (5 items moved in, previously marked out):
- **Inbound and outbound logistics:** taught as value-chain activities (SM 2.4.2, p.2.25, almost word for word). `o-p7-rtp-may2018` 4(a) is now in, tagged `sm.ext.industry`.
- **Why higher-level strategies are broken into functional strategies:** SM 1.6 (p.1.26) teaches the functional level and what functional strategies are for, and two copies of the same question were already in. `o-p7-rtp-nov2018` 15, `o-p7-rtp-jul2021` 17, `o-p7-rtp-may2019` 12 and `o-p7-rtp-may2020` 12 are now in, tagged `sm.intro.levels`.

Every other topic sm-qbank marked out (marketing mix, logistics strategy and supply chain management, BPR, benchmarking, strategy audit, financial, R&D and HR strategy, entrepreneurship) was out consistently; its in-syllabus mentions are only story settings or wrong options. Out of syllabus: 159 items before, 160 now.

How the calls are stored: `sm_tags.json` gained `oos` / `in` fields, plus `syl_by` for who made the call. `smimport.py` now lets these override sm-qbank's call, and each item's note says whose call it is and why.

## 4. Verification
- **`check.py` on all 76 SM files:** 0 errors, and the reports are the same as before this job.
- **`build.py --check`:** green. A full build has also been written.
- **`node tests/run.js bank`:** 10 passed.
- **`test_bank.py`:** 20 OK, including a new test for the paragraph re-join.
- **In the app:** I opened three items.
  - `o-p7-mtp-may2022-s1-sm-q2`: its answer now reads in ICAI's paragraphs.
  - `n-p6-rtp-sep2025-sm-q3`: the SWOT MCQ now links to the SWOT lesson, not markets.
  - `o-p7-rtp-may2018-sm-q4a`: now in the syllabus, linked to the value-chain lesson, with the note explaining the call.

## 5. Files (in ~/CA_PERSONAL/ca_passbook)
- **New:** `tools/bank/paras.py`.
- **Changed:**
  - `tools/bank/smimport.py`: the re-join, bullet glyphs, and the syllabus override.
  - `tools/bank/sm_tags.json`.
  - `docs/ICAI_BANK.md` §10.
  - `tests/py/test_bank.py`.
- **Re-imported:** the 69 imported SM files. Only paragraph breaks, tag lines, notes and `oos:` lines changed.
- **Edited by hand** (tags and notes only): `n-p6-mtp-may2024-s2`, `n-p6-rtp-sep2024`, `n-p6-pyq-may2025` (still a draft), `o-p7-mtp-may2018-s1` and `o-p7-mtp-nov2018-s2`.

## 6. Open questions
1. **Other possibly out-of-syllabus topics:** these are not in the January 2027 Study Material, but sm-qbank never marked them out, so they were not in this job's brief. I left them in.
   - "driving forces" that change an industry: `o-p7-mtp-may2023-s1` 3(a), `o-p7-rtp-nov2019` 4 and `o-p7-rtp-may2023` 10;
   - the TOWS matrix: `o-p7-pyq-nov2022` 9(a);
   - the Jauch & Glueck definition and dimensions of strategic decisions: `o-p7-mtp-may2018-s1` 4(b), `o-p7-mtp-nov2018-s2` 6(a), and the first half of `o-p7-mtp-nov2019-s1` 4(a), `o-p7-mtp-nov2023-s1` 4(b), `o-p7-rtp-nov2020` 12 and `o-p7-rtp-nov2023` 13;
   - the segment, target and position sequence: `o-p7-rtp-jul2021` 1(v).

   Shall I apply the same test to them?
2. **The interleaved two-column table:** the formulation/implementation table in the three old MTPs above is still garbled. Rebuilding it from the PDF means taking those files over. Do you want that?
3. **A possibly wrong ICAI key:** in `o-p7-mtp-may2019-s1` 1(viii), ICAI keys the structure "most small businesses follow" as (D) Matrix, but the Study Material (SM 5.29) says small firms are functionally structured. I left ICAI's key as printed; a note is possible.

## Addendum: the lead's three answers (2026-10-20)

**1. Four more syllabus calls.** I searched every chapter of the January 2027 Study Material: the text files, the raw PDF text, and the OCR supplement for figures. I also checked the rendered pages (1.3-1.4, 2.33-2.34, 2.39-2.40, 2.45 and 3.22-3.24). Each call is recorded in `sm_tags.json` with `syl_by: sm-tags` and a reason, and near-duplicates now agree.

**Out: 13 items, topic absent.**
- **Definition and dimensions of strategic decisions (Jauch and Glueck): 9 items.** The Study Material cites Glueck and Jauch only for the environment (SM 2.11) and the four generic strategies (SM 4.3), and nowhere lists the dimensions. The items are:
  - `o-p7-mtp-may2020-s1` 5(a)
  - `o-p7-mtp-may2022-s1` 1(d)
  - `o-p7-mtp-may2023-s1` 4(a)
  - `o-p7-pyq-jul2021` 7(b)
  - `o-p7-pyq-nov2023` 8(b)
  - `o-p7-rtp-dec2021` 11
  - `o-p7-rtp-may2019` 1(vi)
  - `o-p7-mtp-may2018-s1` 4(b) and `o-p7-mtp-nov2018-s2` 6(a): both in hand-finished files, so the change is made in the files.
- **Driving forces that change an industry: 3 items.** The term appears only in passing, at SM 2.34 and 2.45; nothing says what driving forces are. The items are `o-p7-rtp-may2023` 10, `o-p7-mtp-may2023-s1` 3(a) and `o-p7-rtp-nov2019` 4.
- **The TOWS matrix: 1 item.** It is not in the SWOT section (SM 3.22-3.24) or anywhere else. The item is `o-p7-pyq-nov2022` 9(a).

**Kept in, with a note: 12 items.**
- **"Strategic decision making + the strategic manager's tasks": 4 items.** The tasks are the corporate-level role in SM 1.24-1.25; only the Jauch and Glueck definition in the first half is missing. The items are:
  - `o-p7-mtp-nov2019-s1` 4(a)
  - `o-p7-mtp-nov2023-s1` 4(b)
  - `o-p7-rtp-nov2020` 12
  - `o-p7-rtp-nov2023` 13
- **Cases that ask where the decision-maker sits, or which decisions the owner should take, then list the dimensions: 7 items.** Placing them at the top level is SM 1.24. The items are:
  - the Alok Kumar case, ×4 including the "owner" variant: `o-p7-mtp-dec2021-s2` 3(a), `o-p7-mtp-jul2021-s1` 4(a), `o-p7-mtp-may2019-s2` 4(a), `o-p7-rtp-may2019` 6
  - the Rohit Seth case, ×2: `o-p7-rtp-may2018` 9, `o-p7-rtp-may2020` 6
  - the Mr. Batra case: `o-p7-rtp-may2023` 12
- **Segmentation, targeting and positioning: 1 item.** SM 2.6.2 names all three as parts of customer analysis, though not their order. The item is `o-p7-rtp-jul2021` 1(v).

Out of syllabus: 160 before this addendum, 173 now.

**2. The formulation/implementation table.**
- Rebuilt in `o-p7-mtp-dec2021-s1` 6(b), `o-p7-mtp-jul2021-s1` 6(b) and `o-p7-mtp-may2023-s1` 5(a), word for word from the rendered pages of the mirror copies (answers p.10, p.9 and p.9; all three print the same table).
- It is now a two-column Markdown table with ICAI's four bulleted rows per column. The 12 stray Wingdings glyphs inside it are gone.
- **How it survives a re-import:** the repair lives in the new `tools/bank/sm_text.json`, which `smimport.py` reads. The import replaces sm-qbank's interleaved run from its first line to the end of the answer, adds a note naming the source page, and warns if sm-qbank's text changes so the repair no longer fits. The three files stay owned by the import.
- I checked it in the app on `o-p7-mtp-dec2021-s1-sm-q6b`.

**3. ICAI's key for `o-p7-mtp-may2019-s1` 1(viii).**
- On the rendered page the key table (answers p.6) gives "(viii) d", and option (d) on question p.5 is "Matrix structure".
- The key stays as printed. The item now has this note, added through a new `note` field in `sm_tags.json`: "ICAI's key: (D) Matrix structure (answers p.6, checked on the rendered page). SM 5.29 describes the functional structure as the one small firms tend to use ("Small firms tend to be functionally structured")."

**Checks.**
- I re-ran the import. Only the three table answers changed in their text; elsewhere only `note:` and `oos:` lines changed.
- `check.py` on the 24 touched files: 0 errors, and each report is identical to the one before.
- `build.py --check` is green and a full build is written. `node tests/run.js bank`: 10 passed. `test_bank.py`: 20 OK.
- Documentation: `docs/ICAI_BANK.md` §10 now describes `sm_text.json`, the `note` field and the second-round calls.
