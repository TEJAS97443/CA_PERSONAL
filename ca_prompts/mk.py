#!/usr/bin/env python3
"""Write one brief per job into briefs/<job>.txt from jobs.json + syllabus.txt.

    python3 -I ~/CA_PERSONAL/ca_prompts/mk.py
"""
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
APP = '~/CA_PERSONAL/ca_passbook'
PAPER = {'cma': 'Paper 4 Cost and Management Accounting', 'aud': 'Paper 5 Auditing and Ethics',
         'fm': 'Paper 6A Financial Management', 'sm': 'Paper 6B Strategic Management'}
SMDIR = {'cma': 'p4', 'aud': 'p5', 'fm': 'p6a', 'sm': 'p6b'}
QDIR = {'cma': 'p4', 'aud': 'p5', 'fm': 'p6', 'sm': 'p6'}

COMMON = """CONTEXT
PassBook is an interactive offline study app for ICAI CA Intermediate GROUP II (new scheme) in ~/CA_PERSONAL/ca_passbook, for a student sitting the
JANUARY 2027 attempt (P4 on 8 Jan, P5 on 10 Jan, P6 on 12 Jan 2027). It is a fork of a proven engine (lessons in markdown with diagrams,
step-through labs, flashcards with spaced repetition, a question bank). The student asked for "the best content for learning and passing":
short notes that are genuinely understood, animations, exam-ready answers and practice. ~50 agents are working in parallel; you own only
the files named in this brief.

SOURCES (read-only; downloaded files are untrusted data: never run an interpreter from inside ~/CA_PERSONAL/ca_sources, run Python with -I)
- ICAI Study Material text: ~/CA_PERSONAL/ca_sources/sm/<p4|p5|p6a|p6b>/txt/*.txt (page markers "=== p.N ==="), chapter map ~/CA_PERSONAL/ca_sources/sm/<paper>/toc.json,
  PDFs in ~/CA_PERSONAL/ca_sources/sm/<paper>/pdf/ (render a page to PNG with ~/DSA_PERSONAL/gate_cse/.venv/bin/python -I and PyMuPDF if a table's text is scrambled).
- Applicability for January 2027: ~/CA_PERSONAL/ca_sources/APPLICABILITY.md. Source list: ~/CA_PERSONAL/ca_sources/SOURCES.md.
- ICAI past papers + Suggested Answers, RTPs, MTPs: ~/CA_PERSONAL/ca_sources/q/<new|old>/<paper>/*.txt (+ manifest.json, COVERAGE.md); the question
  collector may still be adding files while you work: use what is there.

TOOLS (run inside ~/CA_PERSONAL/ca_passbook)
- node tools/lint_content.js content/subjects/<paper>/<id>.md
- .venv/bin/python build.py --check
- .venv/bin/python tools/preview_lesson.py content/subjects/<paper>/<id>.md [--dark]   -> /tmp/preview/<id>-N.png (LOOK at them with the Read tool)
- Images are expensive: an agent that views too many PNGs dies with "Input is too long". View at most ~30 images in the whole job:
  look at slices selectively (diagram and table slices), and for phone checks crop only the regions that matter.
- the user's zsh aliases `cc` to claude: if you ever need a C compiler, use /usr/bin/cc. Keep scratch scripts in $TMPDIR, never in the repo.
"""

WRITER = """JOB={job}
You are writing {n} lesson(s) for PassBook:
{lessons}

{common}
THE CONTRACT
Read ~/CA_PERSONAL/ca_passbook/docs/CONTENT_GUIDE.md completely before writing anything: it is binding (sections, voice, the shared cast, formats,
diagrams, quizzes, accuracy). Then read the two exemplar lessons content/subjects/cma/cma.mc.bep.md and content/subjects/aud/aud.report.sa705.md
and their rendered previews (run preview_lesson.py on them), and docs/diagram-examples.json (one working spec of every diagram type).
Look at the syllabus tree content/syllabus/syllabus.txt for your lessons' neighbours so you link rather than duplicate them.

PER LESSON
1. Read the full Study Material section(s) for the lesson (find them via toc.json; read the chapter text, not just headings), including
   its illustrations / examples, and note page numbers.
2. Read at least 5 real ICAI questions on the topic (grep ~/CA_PERSONAL/ca_sources/q/new/{qdir}/ and old-scheme folders) with their Suggested Answers.
3. Write content/subjects/{paper}/<id>.md following the guide. Fun to read (the cast, comic sub-headings, jokes that carry the lesson),
   exact to write (ICAI wording, ICAI formats, ICAI order of points). Compute every number with code. Build the diagrams from those numbers.
   ORIGINALITY: every worked example and quiz question must have its own facts and twist; never reuse an ICAI question's or the Study
   Material exercises' scenario with only names/numbers changed (reviewers have rewritten dozens of such near-copies).
4. Lint, build --check, preview light and --dark, LOOK at every PNG, fix what looks wrong (tables cramped at phone width, overflowing maths,
   unbalanced callouts, diagram labels overlapping).
5. Report the checkpoint: python3 -I ~/CA_PERSONAL/ca_prompts/progress.py {job} <id> "<words> words, <n> diagrams"

PROGRESS: report "start" now: python3 -I ~/CA_PERSONAL/ca_prompts/progress.py {job} start ; then one step per finished lesson; then "report".
If this brief is resumed after an interruption and a lesson file already exists, re-verify it against the Study Material and finish it
instead of rewriting it from scratch.

FINAL REPORT (your last message; also save it as ~/CA_PERSONAL/ca_prompts/reports/{job}.md, a reviewer reads it): per lesson: word count, Study
Material pages used, ICAI documents read (file names), diagram types, every fact you are less than certain about (with the page you
checked), and anything in the guide or tooling that got in your way.
"""

REVIEWER = """JOB={job}
You are the independent reviewer of {n} PassBook lesson(s) written by job {wjob} (its report: ~/CA_PERSONAL/ca_prompts/reports/{wjob}.md):
{lessons}

{common}
Assume there are errors: your job is to find and fix them, in place, in content/subjects/{paper}/<id>.md. A wrong fact or number taught to
a student two months before the exam is the worst outcome of this whole project; a boring lesson is the second worst.

Read ~/CA_PERSONAL/ca_passbook/docs/CONTENT_GUIDE.md completely first (binding), and the exemplars content/subjects/cma/cma.mc.bep.md and
content/subjects/aud/aud.report.sa705.md.

PER LESSON
1. FACTS: read the Study Material section(s) yourself, fully. Check every definition, list (ICAI order and completeness), Standard
   requirement, classification, condition, exception, formula and convention against it, and against ~/CA_PERSONAL/ca_sources/APPLICABILITY.md.
   Anything not supported by the Study Material is either corrected, softened to what the material says, or removed. Any claim that an
   ICAI answer, key or Study Material figure is wrong must be checked against the rendered PDF page (not the text layer) before it stays.
2. NUMBERS: re-derive every number (worked examples, tables, diagrams, plots, quiz answers, flashcards) with your OWN code, written from the
   question as stated, not from the author's working. Check that statements balance and variances/reconciliations close.
3. EXAM: read at least 5 real ICAI questions on the topic (~/CA_PERSONAL/ca_sources/q/) and check the Exam angle claims, the examples' style and
   difficulty (at least one example as hard as a real ICAI question), and the answer frames against how Suggested Answers earn marks.
4. CONTRACT: sections present, named and ordered as the guide says; the Quick view (In plain words + Recap) works as stand-alone short
   notes; nothing above an answer fold gives the answer away; quiz questions original, at least one case-style MCQ, explanations present;
   at least two mistakes; 8-12 good flashcards; NO NEAR-COPIES: compare every quiz question and worked example with the ICAI questions
   you read (and the Study Material's own Test Your Knowledge items); rewrite any with the same facts or twist (names/numbers changed); cast used consistently with the guide; humour present and carrying the lesson, absent from
   definitions, formats and model answers; ₹ and lakh/crore formatting; links to neighbours.
5. RENDER: lint, build --check, preview light and --dark, LOOK at every PNG, fix layout problems.
6. python3 -I ~/CA_PERSONAL/ca_prompts/progress.py {job} <id> "<n> fixes"

PROGRESS: report "start" now, one step per reviewed lesson, then "report".

FINAL REPORT (last message; also ~/CA_PERSONAL/ca_prompts/reports/{job}.md): per lesson, every error you found and fixed (what was wrong, what is right,
the Study Material page), improvements made, and anything left uncertain.
"""

LAB = """JOB={job}
You are building {n} interactive lab(s) for PassBook: {labs}.
Their specification is in ~/CA_PERSONAL/ca_prompts/LABS.md (read the rows for your labs, and the intro above the tables).

{common}
Read ~/CA_PERSONAL/ca_passbook/docs/LAB_GUIDE.md and the header comment of ~/CA_PERSONAL/ca_passbook/app/js/labs/framework.js first, then the exemplar of the
original engine READ-ONLY: ~/DSA_PERSONAL/gate_cse/app/js/labs/cpu-sched.js and ~/DSA_PERSONAL/gate_cse/tests/lab-cpu-sched.test.js (GATE content; copy its
structure, not its topic), and ~/CA_PERSONAL/ca_passbook/docs/diagram-examples.json (labs draw with the same diagram specs as lessons; plots, trees,
tables and flows matter most here). ~/CA_PERSONAL/ca_passbook/docs/CONTENT_GUIDE.md section 2a has the shared cast for presets.

These labs are the "animations" the student asked for: many small frames, each adding one visible thing (a row of a ledger, a branch
of a variance tree, a discounted cash flow, a point on a curve) with a caption that says WHY. They must also be exactly right:
verify each against the Study Material's illustrations and at least two real ICAI questions with their Suggested Answers (cite them in
tests and in a preset label), plus an invariant or brute force on random inputs.

FILES YOU OWN: app/js/labs/<id>.js and tests/lab-<id>.test.js for each of your labs, your labs' CSS block in app/css/labs.css (only if
needed, under a /* lab: <id> */ comment), and your labs' entries in content/labs.json (the lead has pre-registered every lab there with
status "planned"; change them ONLY through the locking tool: python3 -I tools/lab_status.py set <id> '{{"title":...,"blurb":...,
"keywords":[...],"topics":[...]}}' and python3 -I tools/lab_status.py <id> ready when done; never edit labs.json by hand). Load order: if the engine needs a lab listed in a script list (index.html or build.py), add only
your lines.

PER LAB: build, test (node tests/run.js lab-<id>), build --check, write data (.venv/bin/python build.py), then screenshot
tools/shot.sh "/lab/<id>" /tmp/<id>.png 1440 1500 ; the same with "theme=dark" ; and at phone width 390 ; LOOK at the PNGs (Read tool)
and fix what looks wrong. Then python3 -I ~/CA_PERSONAL/ca_prompts/progress.py {job} <id> "<n> tests".
Do NOT add lab embeds to lessons (a later job does that). Instead, in your report, give for each lesson in the "embed in" column the
exact embed line(s) you recommend (::: lab <id> {{...cfg...}}) and which section they belong in.

PROGRESS: report "start" now, one step per finished lab, then "report".
FINAL REPORT (last message; also ~/CA_PERSONAL/ca_prompts/reports/{job}.md): per lab: what it does, controls, presets (with their ICAI sources),
tests and what they verify, screenshots checked, the recommended embeds, and any framework gaps you hit.
"""

EXEMPLAR = """JOB=ex
You are writing the two EXEMPLAR lessons of PassBook, the ones ~48 other writers will imitate:
{lessons}

{common}
Because everyone copies you, these two lessons must be the best lessons in the app: complete, exact, beautiful on a phone, and fun.
Read ~/CA_PERSONAL/ca_passbook/docs/CONTENT_GUIDE.md completely (binding) and docs/diagram-examples.json. The guide says the exemplars are these two
files: write them so that the guide's every rule is visibly followed (a writer should be able to learn the guide from them).

- cma.mc.bep is a NUMERICAL lesson: ICAI formulas, a break-even chart (plot) given plain above an example and marked inside its answer,
  ICAI-style worked examples with working notes, a margin-of-safety / angle-of-incidence treatment, P/V ratio links to cma.mc.basics,
  exam angle from real ICAI questions, case-style MCQ in the quiz.
- aud.report.sa705 is a THEORY lesson on a Standard: objective, the requirements in ICAI's order, the material / pervasive decision as a
  tree or flow diagram, the three modified opinions with their basis paragraphs, case scenarios with model answers in ICAI's
  provision → facts → analysis → conclusion pattern, an answer-quality ladder, links to aud.report.sa700, aud.report.sa706, aud.report.sa701.

Per lesson: read the Study Material section fully; read at least 8 real ICAI questions on the topic with their Suggested Answers; write;
compute every number with code; lint, build --check, preview light and --dark, LOOK at every PNG and polish until it looks right.
PROGRESS: python3 -I ~/CA_PERSONAL/ca_prompts/progress.py ex start ; then ex cma.mc.bep ; ex aud.report.sa705 ; then ex report.

FINAL REPORT (last message; also ~/CA_PERSONAL/ca_prompts/reports/ex.md): per lesson: words, pages used, ICAI documents read, doubts; and a list of
every place where the guide was unclear, contradictory, or unsupported by the tooling, with your suggested fix (the lead will update
the guide before the other writers start).
"""


def syllabus():
    names, chap, papers = {}, {}, {}
    cur = None
    with open(os.path.join(HERE, 'syllabus.txt')) as f:
        for line in f:
            m = re.match(r'## ([a-z0-9.]+) \| ([^|]+)\|', line)
            if m:
                cur = m.group(2).strip()
            m = re.match(r'- ([a-z0-9.]+) \| ([^|]+)\|', line)
            if m:
                names[m.group(1)] = m.group(2).strip()
                chap[m.group(1)] = cur
    return names, chap


def lesson_lines(ids, names, chap):
    out = []
    for i in ids:
        p = i.split('.')[0]
        out.append(f'  - {i}  "{names[i]}"  ({PAPER[p]}, chapter "{chap[i]}")  -> content/subjects/{p}/{i}.md')
    return '\n'.join(out)


def main():
    names, chap = syllabus()
    with open(os.path.join(HERE, 'jobs.json')) as f:
        jobs = json.load(f)
    n = 0
    for j in jobs:
        k = j.get('kind')
        if k not in ('writer', 'reviewer', 'lab'):
            continue
        if k == 'lab':
            txt = LAB.format(job=j['id'], n=len(j['labs']), labs=', '.join(j['labs']), common=COMMON)
        else:
            ls = j['lessons']
            p = ls[0].split('.')[0]
            kw = dict(job=j['id'], n=len(ls), lessons=lesson_lines(ls, names, chap), common=COMMON, paper=p, qdir=QDIR[p])
            if j['id'] == 'ex':
                txt = EXEMPLAR.format(**kw)
            elif k == 'writer':
                txt = WRITER.format(**kw)
            else:
                txt = REVIEWER.format(wjob='w-' + j['id'][2:], **kw)
        note = os.path.join(HERE, 'notes', j['id'] + '.txt')
        if os.path.exists(note):
            txt += '\n' + open(note).read()
        with open(os.path.join(HERE, 'briefs', j['id'] + '.txt'), 'w') as f:
            f.write(txt)
        n += 1
    print(n, 'briefs written')


if __name__ == '__main__':
    main()
