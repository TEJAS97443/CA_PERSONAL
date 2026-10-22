# CA Intermediate — Strategic Management Question Bank

A chapter-wise PDF of every ICAI **RTP**, **MTP** and **past examination** question for
Strategic Management from 2018 to date, each with ICAI's own suggested answer.

**Read this:** `CA-Inter-SM-QuestionBank.pdf` (A4, bookmarked by chapter).
A phone-sized edition is `CA-Inter-SM-QuestionBank-phone.pdf` if it was generated.

## What it contains

- Questions grouped under the **five chapters of the current (2023) syllabus**.
- Within a chapter: **past exam questions first**, then RTPs, then MTPs — newest attempt first.
- Every question carries its source (type, attempt, series, question number) and marks where
  ICAI printed them.
- Questions ICAI reused across documents appear **once**, with an *Asked again in* trail.
- A **most repeated topics** table ranks topics by how many separate ICAI documents asked
  about them — the fastest guide to what to revise first.
- Old-scheme questions on topics the 2023 syllabus dropped sit in an **appendix**, clearly
  marked, so they never waste revision time.

## Honest limits

- Nothing is written by the compiler except the chapter arrangement and the syllabus notes.
  Questions and answers are verbatim ICAI. Where ICAI has not published an answer, the
  question is shown with the answer left blank.
- Old-scheme (2018 – Nov 2023) questions were tagged to the current chapters **by judgement**,
  because ICAI did not use these chapters then. Those carry a *chapter mapped* pill.
- The *Attempt coverage* table in the front matter is an honest record: a dash means ICAI did
  not publish that document for that attempt (Jan 2021 RTP/MTP — ICAI reused the Nov 2020
  ones; May 2020 exam — cancelled; MTP Series II for May 2018, Nov 2019, May 2020, Nov 2020 —
  only one series ran). The `manifest-*.json` files record the reason for each.
- ICAI has deleted most pre-Nov-2022 PDFs from its CDN. Those were taken from mirror copies
  of the official files (checked by MD5 / identical text against ICAI originals where both
  exist); `source.notes` in each data file names the dead ICAI URL and the mirror.
- September 2026: ICAI has not published Suggested Answers yet, and the question paper is an
  image-only scan, so its 18 questions were transcribed and carry a *transcribed from scan*
  pill. Re-check them against the PDF if a wording matters.
- `build.py` repairs only extraction artefacts at render time — words the PDF text layer split
  in two (`SPLIT_WORDS`, each checked in context), symbol-font bullets, lost line breaks before
  ICAI's (i)/(a) labels. `fidelity.py` proves no word is added, dropped or reordered.

## Rebuilding

```sh
python3 verify.py          # quality gate (SPEC §8); --fix-oos also moves dropped-topic Qs
python3 provenance.py      # every question/answer is in its ICAI source PDF (5-word shingles)
python3 fidelity.py        # rendering adds layout only: every word survives, in order
python3 build.py           # data/*.json  ->  site/index.html
NODE_PATH=~/nexora-automation/node_modules node make-pdf.js     # -> _full.pdf, _cover.pdf
python3 merge-pdf.py       # stitch clean cover + add bookmarks -> CA-Inter-SM-QuestionBank.pdf
NODE_PATH=~/nexora-automation/node_modules node make-pdf.js --phone
python3 merge-pdf.py CA-Inter-SM-QuestionBank-phone.pdf          # 110 x 196 mm edition
```

## Layout

| Path | What |
|---|---|
| `SPEC.md` | binding spec: hard rules, chapters, attempts, record schema, quality gate |
| `syllabus.json` | ICAI's current 5-chapter topic list + verified dropped/retained/new topics |
| `raw/` | downloaded ICAI PDFs and their `-layout` text dumps (never edited) |
| `data/*.json` | extracted questions, one file per source document |
| `manifest-*.json` | per-slice record of every source: url, status, counts |
| `build.py` | HTML generator: sanitation, topic detection, dedupe, typesetting |
| `verify.py` | quality gate and coverage report |
| `provenance.py` | checks every record's text against its source PDF |
| `fidelity.py` | checks the renderer changes layout only |
| `assets/styles.css` | print stylesheet (A4, ink-on-paper) |

`build.py` holds two pieces of domain data worth knowing about:

- `JUNK` — regexes that strip ICAI running heads and the next chapter's heading, which bleed
  into extracted text.
- `CANON` / `TOPIC_CH` — ~70 canonical SM topics, each with its **home chapter taken from
  ICAI's verified syllabus**. Note ICAI puts value chain in Ch 2, Porter's generic strategies
  in Ch 3 and the portfolio matrices (BCG, GE, ADL, Ansoff) in Ch 4 — not where intuition
  suggests. This map drives both the topic chips and the priority table.

Questions and suggested answers © The Institute of Chartered Accountants of India,
reproduced for personal study.
