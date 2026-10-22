# PassBook

PassBook is an offline study app for **ICAI CA Intermediate, Group II (new scheme), January 2027**:

| Paper | | Marks | Exam day (2 PM to 5 PM IST, reading time from 1.45 PM) |
|---|---|---|---|
| Paper 4 | Cost and Management Accounting | 100 | Fri 8 Jan 2027 |
| Paper 5 | Auditing and Ethics | 100 | Sun 10 Jan 2027 |
| Paper 6A | Financial Management | 50 | Tue 12 Jan 2027 (Paper 6) |
| Paper 6B | Strategic Management | 50 | Tue 12 Jan 2027 (Paper 6) |

The days come from ICAI's Important Announcement No. 13-CA (EXAM)/JANUARY/2027 of 23 September 2026. ICAI gives the Group II days; the paper
on each day follows ICAI's usual Group II order, so check it against your admit card. To pass the group you need 40 in each paper and
150 of the 300 marks in aggregate.

It teaches every sub-topic of the syllabus in plain words, lets you step through the methods in interactive labs, and gives you ICAI's own
past papers, RTPs and MTPs with ICAI's answers word for word. You can practise them one at a time, or sit a paper on ICAI's clock and mark
your written answers against ICAI's. Flashcards, a planner and an error notebook keep you revising until the exam.

## How to open it

**Open `index.html` in a browser** (Chrome, Edge, Firefox or Safari; double-click it). That is all: there is no server, no account and no
network. Your progress stays in that browser, so use *Settings → Export backup* now and then, and *Import backup* to move to another browser.

- **On a phone:** phones cannot open an app from a folder. Use the PDFs in `pdf/` (below), or build the hostable copy (`HOSTING.md`). That
  copy is only written to a folder; publishing it is your decision.
- **To look around with sample progress:** `index.html?profile=demo&seeddemo=1`. The demo profile never touches your real progress.
- **Keys:** `/` or `Ctrl/Cmd+K` to search, `t` for dark or light, `?` for every shortcut.

## What is inside

These counts are from the build of 20 October 2026. The ICAI bank is still growing as documents are transcribed.

| | |
|---|---|
| **Lessons** | **181**, one per syllabus sub-topic: Paper 4 66, Paper 5 62, Paper 6A 32, Paper 6B 21. Each has In plain words, How it works, the ICAI formats and formulas or an answer frame, worked examples, the exam angle, common mistakes, practice questions and a recap. You can read it at three depths: Quick, Exam and Deep. |
| **Labs** | **30** interactive labs, for example break-even and CVP, variances, process costing, the cost sheet, NPV and IRR, WACC, leverage, working capital, the audit opinion tree, audit sampling, NPAs, BCG and GE matrices and the five forces. 157 of them are built into 77 lessons. The labs have 378 worked examples, and 160 of those name the ICAI question they come from. Each lab has a *Test yourself* mode. |
| **ICAI question bank** | **238 ICAI documents** with **6,568 items**: 2,099 MCQs and 4,469 descriptive questions, 2018 to September 2026. **New scheme:** 24 past papers, 48 MTPs and 24 RTPs. **Old scheme**, kept where its chapters are still in the syllabus: 39 past papers, 65 MTPs and 38 RTPs (old Papers 3, 6, 7 and 8). 6,434 items carry ICAI's answer or key, and 393 are marked out of syllabus. |
| **Sittings** | **165 documents can be sat** as timed papers, with ICAI's choice of questions applied. The others are practised in ICAI's order, for one of four reasons: RTPs print no marks; the Sep 2026 exam papers' answers are not published yet; one old MTP's answers are no longer online; or ICAI's choice of questions is not printed. |
| **Flashcards** | **2,012**, taken from the lessons. Spaced repetition schedules every review to come back before your first paper. |
| **Also** | Formula sheets for each paper (`#/rev`); the syllabus map with an exam-marks lens; a day-by-day planner; an error notebook; your progress; PassBook Wrapped. |
| **PDFs** (`pdf/`) | For each paper: Short Notes (phone), Full Lessons (A4 and phone) and Revision Cards (phone), made from the same lesson files; and the **ICAI Question Bank** (phone and A4): every ICAI past-paper, RTP and MTP item of the bank, chapter by chapter and sub-topic by sub-topic, with ICAI's answer word for word (exact repeats printed once, out-of-syllabus items in an appendix). |

## How accuracy is kept

- **Source:** the ICAI Study Material, **July 2024 edition, Reprint August 2025**, which ICAI lists as applicable for the January 2027
  examination. ICAI's applicability notice for the attempt is in the source list.
  - Definitions, Standards on Auditing, lists, formats and formulas follow ICAI's wording and order.
  - Anything that depends on the version (sections, rules, thresholds) carries a note to check it against the Study Material and the
    Statutory Update for your attempt.
- **ICAI's questions are verbatim:** each ICAI question and answer is transcribed word for word from ICAI's PDF.
  - Every item names the PDF and page it came from, and the PDF's SHA-256 is recorded (*Sources & method* in the app).
  - Checked documents are compared number by number against the PDF (`tools/bank/check.py`).
  - Anything PassBook adds is labelled: tags, difficulty and the "How to approach" note ("PassBook's note, not ICAI's").
- **Original teaching material:** worked examples, lab examples, quizzes and flashcards are PassBook's own, built on its own cast and
  companies and modelled on how ICAI asks. Every number in them is computed, not typed in.
- **Independent review:** every lesson was checked by someone other than its writer, against the Study Material, for facts, numbers and
  ICAI wording.
  - For 179 lessons this was a full reviewer pass. The two exemplar lessons (`cma.mc.bep` and `aud.report.sa705`) had a fact and number
    spot check in the final QA instead; it fixed five citations and wordings in SA 705 and two loose attributions in break-even.
  - A cross-lesson consistency pass (one name for one company or person, the same figures across lessons) followed.
  - Originality sweeps then compared the lessons' examples and quizzes with ICAI's question texts.
- **What PassBook never does:** it never predicts your score or invents a number. A screen with no real data says so instead.

## Develop and rebuild

Everything below runs from this folder. Python tools use the project's `.venv/` (PyMuPDF and Pillow); the app itself needs only a browser.

```
.venv/bin/python build.py                      # validate everything and write data/ (lessons, labs, cards, the ICAI bank)
.venv/bin/python build.py --check              # validate only
node tools/lint_content.js [content/subjects/<paper>/<id>.md]   # deep lint of lessons (maths, diagrams, quizzes, containers)
.venv/bin/python tools/preview_lesson.py content/subjects/<paper>/<id>.md [--dark]   # PNG slices of one lesson in /tmp/preview/
tools/shot.sh "/route" /tmp/x.png 1440 1000 "theme=dark"     # screenshot any route (width < 500 = a phone frame; SHOT_CALM=1 for reduced motion)
python3 -I tools/bank/check.py bank/items/<new|old>/<paper>/<doc>.md   # one ICAI document against its PDF
node tests/run.js [pattern]                    # JavaScript unit tests
python3 -I -m unittest discover -s tests/py    # build-tool tests
python3 -I tools/smoke.py [demo]               # headless-Chrome self-test of the whole app
.venv/bin/python -I tools/pdf/make_pdfs.py     # rebuild the PDFs in pdf/
.venv/bin/python -I tools/pdf/make_qbank.py    # the ICAI Question Bank PDFs in pdf/ (after build.py; --papers sm --sizes phone for one)
.venv/bin/python build.py --site               # the hostable copy in _site/ (HOSTING.md); nothing is uploaded
```

Where things live:

- **Lessons:** `content/subjects/<cma|aud|fm|sm>/<lesson-id>.md`, written to `docs/CONTENT_GUIDE.md`. Their sections are listed in
  `content/sections.json`.
- **Syllabus and exam days:** the syllabus tree is `content/syllabus/syllabus.txt`. The exam calendar is `content/exam.json` (ICAI's
  announcement, with its URL and SHA-256).
- **Labs:** the code is `app/js/labs/<id>.js` and the registry is `content/labs.json` (edit it with `tools/lab_status.py`). See
  `docs/LAB_GUIDE.md`.
- **ICAI bank:** one Markdown file per ICAI document in `bank/items/`, described in `docs/ICAI_BANK.md`. The source PDFs are listed in
  `bank/sources.json`.
- **Engine:** PassBook is a fork of the GATE Ascent engine. `docs/ARCHITECTURE.md` still describes the GATE screens; its fork notes say
  what changed.

## Known limits

- **The bank is incomplete.**
  - Old-scheme papers are being added.
  - 75 documents are `imported`: converted from the earlier SM question bank and not yet re-read against the PDF by a person.
  - Some old-scheme items carry chapter tags only, without a sub-topic.
- **Answers PassBook cannot give.** The September 2026 exam papers have no ICAI answers yet. One old-scheme MTP (`o-p8-mtp-nov2020-s1`) has
  questions only, because its answers are no longer online. Past papers' Part I MCQs often print no marks, so they add nothing to a
  sitting's maximum.
- **Marking is yours.** Descriptive answers are marked by you against ICAI's answer (Got it, Partly, Missed, or marks out of the
  question's). PassBook does not grade your writing.
- **Exam patterns mean exam papers only.** The patterns ("what the papers say", the exam map) count ICAI's exam papers only. Their spread
  across papers reflects which papers are in the bank so far, not ICAI's fixed weights (100 / 100 / 50 / 50), which the app shows separately.
- **Exam days.** The paper on each day follows ICAI's Group II order. Check it against your admit card, and set your own date in
  *Settings* if it differs.
- **Storage.** Progress lives in one browser's local storage (about 5 MB is shared by every local page). Clearing site data deletes it, so
  export backups.
- **Copyright.** The syllabus, Study Material, question papers, RTPs, MTPs and suggested answers are © The Institute of Chartered
  Accountants of India. PassBook is not affiliated with or endorsed by ICAI.
