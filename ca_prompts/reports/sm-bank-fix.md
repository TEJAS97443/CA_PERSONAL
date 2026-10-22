# sm-bank-fix: the Strategic Management part of PassBook's ICAI bank (report, 2026-10-20)

I finished six of the seven SM drafts and left one as a draft on purpose (below). Every SM item now has a sub-topic tag unless it is out of syllabus. I also fixed 83 tags the importer had got wrong. No ICAI question or answer was invented or reworded. The only text changes repair extraction damage, as §9.2 allows: line breaks re-joined, split words re-joined, a broken table rebuilt from the rendered page, and two diagrams that had been turned into tables replaced by figures cut from the PDF.

## 1. Drafts: 7 documents, 111 items

Six are finished. Each is taken over (`by: sm-bank-fix`, `status: imported`), and its document `note` says what changed and which numbers are accepted, and why.

| Document | Why it was a draft | What I did |
|---|---|---|
| `n-p6-mtp-may2024-s2` | MCQ 1(A)(i) had no tag | Tagged it `sm.ext.industry` (the product life cycle); 2(b) got its sub-topic. Fixed MCQ 1(B)(ii)'s pages (10-11). Accepted the heading numbers. **0 number problems.** |
| `n-p6-rtp-sep2024` | MCQ 1(v) had no tag | Tagged it `sm.choice.growth` (strategic partnerships). Fixed the case's pages (31-33: its last sentence is on p.33) and 1(iv)'s pages (33-34). Accepted the heading numbers. **0 number problems.** |
| `o-p7-mtp-may2018-s1` | 1(a) was too short for the page matcher | Cited 1(a) at p.3. **Marks:** ICAI prints "(2 × 2 = 4 Marks)" and "attempt any two parts" for Q1 and Q2, so each part is 2 marks (the import had none, none, 4). **Choice:** the import had read Section A's rule. Section B says "All questions are compulsory. Choices, if any, are available within question.", and `choice:` cannot express "any two parts", so I removed the rule: this paper is now practice only. **Q6's "Or"** is now its own item, `q6-or` (`alt: q6`). Re-joined the layout's line breaks and split words, and turned bullet glyphs into a list. Fixed 4 tags. Now 15 items. One `check.py` marks line remains: it reads "(2 × 2 = 4)" as two parts, but ICAI sets three. |
| `o-p7-mtp-nov2018-s2` | 6(b) was too short for the matcher | Split 2(a) into (i) and (ii), 2 marks each. I marked (ii) out of syllabus myself: it is the old marketing chapter, which sm-qbank's own list says was dropped. Rebuilt the 4(a) Entrepreneur/Intrapreneur table from the rendered pages (sm-qbank's rows were scrambled). Re-joined paragraphs and split words. Fixed 3 tags. **0 number problems.** |
| `o-p7-pyq-jan2021` | 10(b) and its OR were not matched; no choice rule | Both are on q p.17 (answers on pp.18 and 19). `choice: all`: "answer any four from the rest", and the rest are exactly four. Fixed 3 tags. **0 number problems.** |
| `o-p7-pyq-nov2018` | 7(b)'s answer was not matched | 7(b)'s answer is a diagram; sm-qbank had made a table of its boxes. It is now ICAI's heading plus a figure. 9(a)'s organisation chart (on p.14) is now a figure too: the table had put Marketing's three sub-units under other departments. Fixed the answer pages of 9(a) (13-14) and 11(a) (15-16), and dropped a wrong keyword tag on an out-of-syllabus item. **0 number problems.** |

**Left as a draft: `n-p6-pyq-may2025`.**
- **Why:** its Section B MCQs (Case Scenario II, MCQs 9-16) and their answer key are printed only in the 6A Suggested Answers file (pp.4-7). A section file names one `qfile` and one `afile`, and the build requires the FM and SM files of a document to name the same ones. It cannot ship until the format allows a per-block file, or you decide otherwise.
- **Done anyway:** the MCQ text matches the 6A pages word for word. The keys are ICAI's answer key (B A C A A A D C), and the marks are as printed. Q5-Q8 match the 6B file. Every item is tagged (4 tags fixed). The note explains all of this.

## 2. Tags

The 176 chapter-only items and the 2 untagged MCQs now have sub-topics. I read each question with ICAI's answer, and checked against where the answer's own words sit in the Study Material. Where the two differ, the PassBook lesson decides: strategic group mapping goes to `sm.int.drivers`, the experience curve to `sm.ext.porter`, strategic uncertainty to `sm.impl.matrix`.

Counts by primary tag:

| Sub-topic | Items |
|---|---|
| `sm.int.drivers` | 35 |
| `sm.intro.meaning` | 33 |
| `sm.impl.matrix` | 31 |
| `sm.ext.porter` | 13 |
| `sm.intro.levels` | 11 |
| `sm.choice.growth` | 10 |
| `sm.ext.industry` | 7 |
| `sm.impl.control` | 7 |
| `sm.intro.intent` | 7 |
| `sm.ext.pestle` | 6 |
| `sm.impl.structure` | 6 |
| `sm.choice.retrench` | 3 |
| `sm.int.swot` | 3 |
| `sm.choice.portfolio` | 2 |
| `sm.ext.markets` | 2 |
| `sm.impl.digital` | 1 |
| `sm.int.generic` | 1 |
| **Total** | **178** |

How tags are stored:
- I did not take the imported files over. Hand tags live in the new `tools/bank/sm_tags.json` (229 entries), which `smimport.py` now reads instead of its keyword rules, so a re-run keeps them.
- I re-ran the import. Only `tags:` and `note:` lines changed in the imported files (checked line by line).
- The drafts carry their tags in the file itself.

Importer tags corrected: 83 in all.
- **Spot check:** 40 picked at random (seed 20261020); **12 were wrong**. 5 had the wrong primary tag: Lewin's change model as control, strategy execution as structure, channels as resources, the experience curve as industry, value chain as resources. 7 had a wrong secondary tag or the wrong order.
- **Follow-up:** that error rate led me to compare every importer tag against the Study Material sections and its typical bad tag pairs. That found **49 more** clear errors: Ansoff questions led by growth, BCG questions led by growth, CEO-role questions tagged intent, channels, differentiation tagged as core competence.
- **Keyword rule:** I pointed the experience-curve rule at `sm.ext.porter`, which re-tagged 9 items.
- **Drafts:** 13 tags fixed while finishing them.

## 3. Code and docs (all in ~/CA_PERSONAL/ca_passbook)
- **`tools/bank/smimport.py`:** reads `sm_tags.json`, warns about hand tags that name no syllabus id or match no item, and has the experience-curve rule fix.
- **`tools/buildlib/figures.py`:** the build now ships `bank/figs/<doc>/*.png`. It used to read only `pyq/figs`, so no bank figure could ship. This also makes an FM transcriber's answer figure ship (`n-p6-mtp-sep2026-s2` fm-q4b).
- **`app/js/views/qcard.js`:** a figure with `where: answer` now shows inside ICAI's answer fold. Before, it appeared in the question body, giving the answer away.
- **`docs/ICAI_BANK.md` §9.6 and §10:** updated to match.
- **New files:** `tools/bank/sm_tags.json` and `bank/figs/o-p7-pyq-nov2018/{q7b-1,q9a-1}.png`.

## 4. Verification
- **`check.py` on all 76 SM files:** 0 errors.
  - The five finished drafts listed with 0 number problems above are clean.
  - `o-p7-mtp-may2018-s1` has the one marks line explained above.
  - The May 2025 draft lists its MCQ numbers, because they are cited from the 6A file. That is the citation problem, not the text.
- **`build.py --check`:** green. A full build has been written.
- **`node tests/run.js bank`:** 9 passed. `test_bank.py`: 19 OK.
- **Full suite:** it crashes in `lab-ansoff-adl.test.js` after 11 failures (`GA` globals undefined in the flash, insights, home and lab tests). Run one file at a time, only `home` (question of the day) and `settings` (keyed papers) fail. All of these fail the same way with my `qcard.js` change reverted, and `home` and `settings` also with the bank as it was before this job. So none of it comes from this job.
- **In the app**, light and dark: `o-p7-pyq-nov2018-sm-q7b` (the diagram inside ICAI's answer), `o-p7-mtp-may2018-s1-sm-q6-or` (re-joined paragraphs, the "Q6 OR" label) and `n-p6-rtp-sep2024-sm-q1v` (the key check).

## 5. Open questions
1. **Wrong tags:** 30 % of the sampled importer tags were wrong. I fixed every case I found, but the 262 keyword-tagged MCQs (notes saying "check the tags") were not all re-read. Do you want a full pass over them?
2. **Out-of-syllabus judgements:** sm-qbank marks "worth of a business" out of syllabus in `o-p7-mtp-may2018-s1` 5(a), but treats it as in syllabus in `o-p7-pyq-nov2019` 9(b), which I tagged `sm.choice.growth`. I left sm-qbank's calls as they are; which way should both go?
3. **Choppy paragraphs:** the other 19 old-scheme MTP files still show one paragraph per PDF line (about 1,800 breaks). The words are right but the answers read badly. The PDF-geometry re-join I used could be added to `smimport.py`. Shall I add it?
4. **Same faults likely elsewhere:** the imported files probably share the faults I fixed in the drafts — MCQ options cited on the wrong page, and diagrams turned into tables. I only checked the drafts. Do you want them checked across all the files?
5. **Part-level choices:** "any two parts" choices cannot be expressed in `choice:`, so `o-p7-mtp-may2018-s1` cannot be sat. Should the choice format support parts?
