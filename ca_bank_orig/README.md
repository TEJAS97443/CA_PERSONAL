# PassBook

An offline study app for **ICAI CA Intermediate, Group II (new scheme)**: Paper 4 Cost and Management Accounting (100 marks), Paper 5
Auditing and Ethics (100), Paper 6A Financial Management (50) and Paper 6B Strategic Management (50; 6A and 6B are one 100-mark Paper 6).
Built for the **January 2027** attempt: Paper 4 on Fri 8 Jan, Paper 5 on Sun 10 Jan, Paper 6 on Tue 12 Jan 2027, each 2 to 5 PM IST with
reading time from 1.45 PM (ICAI's Important Announcement No. 13-CA (EXAM)/JANUARY/2027 of 23 September 2026). To pass: 40 in each paper and
50% (150 of 300) in the group aggregate.

Open `index.html` in a browser. That's all: it is a static app (no server, works from `file://`). Progress is saved in your browser under its
own keys (`passbook:`); *Settings -> Export* backs it up.

PassBook is a fork of the engine of GATE Ascent (`~/DSA_PERSONAL/gate_cse`): the same static, hash-routed single-page app, the same lesson dialect, diagram
kit, lab framework, flashcards with spaced repetition, planner, progress, streak and XP, and the approved "Cobalt Pop" look (top nav, phone
tab bar, one coral button per screen). The content, names and exam logic are CA Inter's.

* Try it with synthetic data: `index.html?profile=demo&seeddemo=1` (never touches your real progress).
* Dark / light: `t`. Search: `/` or `Ctrl/Cmd+K`. Shortcuts: `?`.

## What is in it

| | |
|---|---|
| Syllabus | the ICAI Group II tree: 4 papers, 40 chapters, 176 lesson-sized sub-topics (`content/syllabus/syllabus.txt`); coverage in `docs/COVERAGE.md` (generated) |
| Lessons | one per sub-topic, written to `docs/CONTENT_GUIDE.md`: plain words, how it works, ICAI formats and formulas, worked examples and case scenarios, the exam angle, answer frames, common mistakes, practice, recap and flashcards; Quick / Exam / Deep reading depths |
| Labs | step-through simulators with a challenge mode (break-even, variances, process costing, capital budgeting, audit opinion ...), embedded in lessons. Authoring: `docs/LAB_GUIDE.md` |
| ICAI questions | **not built yet**: a later job designs the ICAI bank (descriptive questions with sub-parts, ICAI suggested answers, the MCQ parts of Papers 5 and 6). Until then every question screen says "ICAI past papers, RTPs and MTPs are being added" |
| Retention | flashcards capped before the first paper day, an error notebook, revision reminders |
| Planner, progress, streak, XP, PassBook Wrapped | as in the engine, counting to the first Group II paper day and then to each next paper |

## Develop

```
.venv/bin/python build.py                 # validate everything and write data/ (add --check to validate only)
node tools/lint_content.js content/subjects/<paper>/<id>.md      # deep lint of one lesson (maths, diagrams, quizzes)
.venv/bin/python tools/preview_lesson.py content/subjects/<paper>/<id>.md [--dark]   # PNG slices in /tmp/preview/<id>-N.png
tools/shot.sh "/route" /tmp/x.png 1440 1000 "theme=dark"          # screenshot any route (widths below 500 are phone frames)
python3 -I tools/lab_status.py list | add '<json>' | set <id> '<json>' | <id> ready    # content/labs.json, locked for parallel agents
node tests/run.js [pattern]               # unit tests (JS); tests/fixtures/ holds the fixture catalogue, lesson and lab
.venv/bin/python -I -m unittest discover -s tests/py     # unit tests (build tooling)
python3 -I tools/smoke.py                 # headless-Chrome end-to-end self-test (add "demo" for the demo profile)
.venv/bin/python build.py --site          # the hostable copy in _site/ (HOSTING.md); nothing is published
```

Lessons live in `content/subjects/<paper>/<lesson-id>.md` with `<paper>` one of `cma`, `aud`, `fm`, `sm`; their `##` sections are the list in
`content/sections.json` (the build, the lesson page and the formula sheets all read it). The exam calendar is `content/exam.json`
(ICAI's own announcement, with its URL, SHA-256 and the day it was checked).

Python tooling uses PyMuPDF and Pillow (`.venv/`). The app itself needs nothing but a browser.

Architecture: `docs/ARCHITECTURE.md` (written for the GATE engine; the fork notes at its top say what changed).
