#!/usr/bin/env python3
"""Build the data layer of PassBook (CA Intermediate Group II).

    .venv/bin/python build.py                 validate everything, write data/*.js and docs/COVERAGE.md
    .venv/bin/python build.py --check         validate only (no files written)
    .venv/bin/python build.py --ship          release build: verified questions only, and every one must be tagged (errors otherwise)
    .venv/bin/python build.py --include-auto  also ship machine-scaffold PYQs that are not yet verified (development only)
    .venv/bin/python build.py --dev-tags      fill missing PYQ subject tags with a keyword baseline (development only)
    .venv/bin/python build.py --site [DIR]    the build, then the hostable copy in DIR (default _site/): service worker, versioned files, web
                                              manifest and icons, _headers (tools/hosted.py; HOSTING.md). Nothing is published.
    .venv/bin/python build.py --check site [DIR]   --check, plus the hosted-copy rules and, when DIR holds one, that site build

Inputs : content/syllabus/syllabus.txt, content/subjects/*/*.md, content/labs.json, content/exam.json, content/card-ids.json,
         pyq/parsed/<paper>.json (transcribed), pyq/meta/<paper>.json (tags + solutions), pyq/figs/<paper>/*.png,
         pyq/sources/{manifest,fetched,results}.json, the lab examples in app/js/labs/*.js (their cited question ids are checked),
         index.html and app/css/base.css (checked only: the first-paint colours must equal --bg)
Outputs: data/boot.js, data/manifest.js, data/lessons/<subject>/<lesson id>.js (one file per lesson), data/cards/<subject>.js,
         data/pyq/<paper>.js, data/sol/<subject>.js, data/figs/<paper>/*.webp, data/search-pyq.js, docs/COVERAGE.md, content/card-ids.json
The whole data/ tree is written to a staging directory and swapped in atomically, so the app and the tests never read a half-built tree;
figures are re-encoded only when their PNG changed. The app is plain static files; open index.html. Generated files are never edited by hand.
"""
from __future__ import annotations

import datetime
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / "tools"))
import hosted as site_mod                     # noqa: E402
import syllabus as syl_mod                    # noqa: E402
from buildlib import boot as boot_mod          # noqa: E402
from buildlib import cards as cards_mod        # noqa: E402
from buildlib import exam as exam_mod          # noqa: E402
from buildlib import figures as figures_mod    # noqa: E402
from buildlib import lessons as lessons_mod    # noqa: E402
from buildlib import output as out_mod         # noqa: E402
from buildlib import presets as presets_mod    # noqa: E402
from buildlib import pyq as pyq_mod            # noqa: E402
from buildlib import results as results_mod    # noqa: E402
from buildlib import search as search_mod      # noqa: E402

DATA = ROOT / "data"
NODE = shutil.which("node")
js = out_mod.js
# words the runtimes read as a subject (core/pyqlib.js and core/search.js SUBJ, plus every subject id and short name): never aliased
SUBJECT_WORDS = set("dbms rdbms daa ada ds dsa co flat automata compiler compilers networks networking de calculus probability statistics "
                    "aptitude discrete cs q set".split())       # (cs, q, set: the parsers' paper words: 'cs 37', 'q37', 'set 3')


def main(argv: list[str]) -> int:
    check_only = "--check" in argv
    include_auto = "--include-auto" in argv
    dev_tags = "--dev-tags" in argv
    errors: list[str] = []
    warnings: list[str] = []

    syl = syl_mod.load()
    syl["subjects_by_id"] = {s["id"]: s for s in syl["subjects"]}
    labs = json.loads((ROOT / "content" / "labs.json").read_text())
    lab_ids = {l["id"] for l in labs}
    check_labs(labs, syl, errors, warnings)

    ship = "--ship" in argv
    if ship and (include_auto or dev_tags):
        errors.append("--ship cannot be combined with --include-auto / --dev-tags (a release ships verified, really-tagged questions only)")
    site_out = site_mod.site_dir(argv, ROOT)          # P1-58 / D13: --site [DIR] writes the hosted copy; --check site [DIR] checks it
    make_site = site_out is not None and not check_only
    if make_site and (include_auto or dev_tags):
        errors.append("--site cannot be combined with --include-auto / --dev-tags (a hosted copy ships verified, really-tagged questions only)")
    papers, questions = pyq_mod.load_papers(ROOT, syl, include_auto, dev_tags, errors, warnings)
    qids = {q["id"] for q in questions}
    untagged = [q["id"] for q in questions if not q["subject"] or not q.get("difficulty")]
    if untagged:
        (errors if ship else warnings).append(f"{len(untagged)} shipped question(s) lack subject/difficulty tags, e.g. {', '.join(untagged[:4])} (pyq/CLASSIFY.md)")
    nsol = sum(1 for q in questions if q.get("solution"))
    pyq_mod.check_solution_diagrams(questions, errors, warnings)     # P3-14: solution drawings parse and have an accessible name
    disputed = [q["id"] for q in questions if (q.get("check") or {}).get("dispute")]
    unread = [q["id"] for q in questions if q.get("key_note") and not pyq_mod.reader_key_note(q)]
    if unread:   # P2-24: the card shows the learner's version of each key note
        warnings.append(f"{len(unread)} key note(s) match no rule of reader_key_note (tools/buildlib/pyq.py), so the card shows the build log: {', '.join(unread[:5])}")
    if ship and disputed:
        warnings.append(f"{len(disputed)} solution(s) carry an unresolved dispute with the official key: {', '.join(disputed[:6])}")
    lessons = lessons_mod.load_all(ROOT / "content" / "subjects", syl, qids, lab_ids, errors, warnings,
                                    ship=ship, ready_labs={l["id"] for l in labs if l.get("status") != "planned"})

    # ---------------------------------------------------------------- deep lint in Node (markdown, math, diagrams)
    if NODE and lessons and (ROOT / "tools" / "lint_content.js").exists():
        r = subprocess.run([NODE, str(ROOT / "tools" / "lint_content.js")], capture_output=True, text=True, cwd=ROOT)
        for ln in r.stdout.splitlines():
            (errors if ln.startswith("ERROR") else warnings).append(ln) if ln.strip() else None
        if r.returncode not in (0, 1):
            errors.append("lint_content.js crashed: " + r.stderr[-400:])

    # ---------------------------------------------------------------- data the views read (audit: P1-46, P2-35, P1-38, P3-51)
    exam = exam_mod.load(ROOT, errors, warnings)
    boot_mod.check(ROOT, errors, warnings)          # P2-78: index.html's first-paint colours equal base.css's --bg
    results = results_mod.load(ROOT, papers, errors, warnings)
    preset_n = presets_mod.check(ROOT, NODE, qids, errors, warnings)
    card_now = {l.id: [c["id"] for c in l.cards] for l in lessons.values()}
    ledger, new_aliases = cards_mod.update(cards_mod.load(ROOT, errors), card_now, warnings)
    card_ids = {c for ids in card_now.values() for c in ids}
    fig_sizes = figures_mod.sizes(ROOT, questions, warnings)     # P3-38: each figure's pixel size, so its card keeps the box before it loads
    site_line = site_mod.check(ROOT, site_out if check_only else None, errors, warnings)   # the hosted-copy rules (index.html, sw.js; a site build)

    topic_marks: dict[str, int] = {}
    for q in questions:
        for k in {q["topic"], q["subtopic"]} - {None}:
            topic_marks[k] = topic_marks.get(k, 0) + (q.get("marks") or 0)

    for w in warnings[:40]:
        print("warning:", w)
    if len(warnings) > 40:
        print(f"... and {len(warnings) - 40} more warnings")
    for e in errors:
        print("ERROR:", e)
    print(f"{len(syl['subjects'])} subjects, {len(syl['topics'])} topics, {len(syl['nodes']) - len(syl['topics'])} sub-topics | "
          f"{len(lessons)} lessons, {sum(len(l.cards) for l in lessons.values())} flashcards | "
          f"{len(papers)} papers, {len(questions)} questions ({nsol} with solutions) | {len(labs)} labs"
          + (f", {preset_n['presets']} lab examples ({preset_n['cited']} cite a past paper)" if preset_n else ""))
    if new_aliases:
        print(f"{len(new_aliases)} flashcard(s) edited in place: their review history moves to the new id"
              + (" on the next full build" if check_only else ""))
    if errors:
        print(f"{len(errors)} errors — data not written")
        return 1
    if check_only:
        if site_line:
            print(site_line)
        return 0

    stage = out_mod.Stage(DATA)
    try:
        write_data(stage, syl, labs, lessons, papers, questions, topic_marks, exam, results, ledger, card_ids, fig_sizes, warnings)
        stage.commit()
    except BaseException:
        stage.abort()
        raise
    write_coverage(syl, lessons, questions, labs, papers)
    if cards_mod.save(ROOT, ledger):
        print("content/card-ids.json updated")
    files = sum(1 for _ in DATA.rglob("*.js"))
    print("data written:", files, "files,", round(sum(f.stat().st_size for f in DATA.rglob("*") if f.is_file()) / 1e6, 1), "MB")
    if make_site:
        s_err: list[str] = []
        s_warn: list[str] = []
        rep = site_mod.build_site(ROOT, site_out, s_err, s_warn)
        for w in s_warn:
            print("warning:", w)
        for e in s_err:
            print("ERROR:", e)
        if s_err:
            print(f"{len(s_err)} errors — hosted copy not written")
            return 1
        print(site_mod.describe(rep, site_out.resolve()))
    return 0


def check_labs(labs, syl, errors, warnings) -> None:
    """content/labs.json: every entry names a paper and topics from the syllabus, and a ready lab has its file (docs/LAB_GUIDE.md §2)"""
    if not isinstance(labs, list):
        errors.append("content/labs.json must be a list of lab entries")
        return
    seen, waiting = set(), []
    for i, l in enumerate(labs):
        at = f"content/labs.json entry {i + 1}" + (f" ({l.get('id')})" if isinstance(l, dict) and l.get("id") else "")
        if not isinstance(l, dict) or not l.get("id"):
            errors.append(f"{at}: needs an id")
            continue
        if l["id"] in seen:
            errors.append(f"{at}: duplicate id")
        seen.add(l["id"])
        for k in ("title", "blurb"):
            if not l.get(k):
                errors.append(f"{at}: needs a {k}")
        if l.get("subject") not in syl["subjects_by_id"]:
            errors.append(f"{at}: subject {l.get('subject')!r} is not a paper id ({', '.join(syl['subjects_by_id'])})")
        for t in l.get("topics") or []:
            if t not in syl["nodes"]:
                errors.append(f"{at}: topic {t!r} is not a syllabus id")
        if l.get("status", "ready") not in ("ready", "planned"):
            errors.append(f"{at}: status is \"ready\" or \"planned\"")
        f = ROOT / "app" / "js" / "labs" / f"{l['id']}.js"
        if not f.exists():
            if l.get("status") == "planned":
                waiting.append(l["id"])         # pre-registered, its lab agent has not shipped the file yet: normal, one summary line below
            else:
                errors.append(f"{at}: app/js/labs/{l['id']}.js does not exist (a ready lab needs its file)")
    if waiting:
        warnings.append(f"content/labs.json: {len(waiting)} planned lab(s) without a file yet (fine until their owners ship them): "
                        + ", ".join(waiting[:8]) + (" …" if len(waiting) > 8 else ""))


def write_data(stage, syl, labs, lessons, papers, questions, topic_marks, exam, results, ledger, card_ids, fig_sizes, warnings) -> None:
    """every data/ file, into the staging tree"""
    stage.write("boot.js", "/* generated by build.py */\nwindow.GAD = window.GAD || { reg(ns, key, val) { (this[ns] = this[ns] || {})[key] = val; } };\n")

    # figures -> webp (re-encoded only when the PNG is newer than the last build's copy) and their dark-mode tone
    made, reused = figures_mod.write_webp(ROOT, DATA, stage.dir, warnings)
    tones = figures_mod.tones(ROOT, questions, warnings)
    ext = ".webp" if made + reused and any(stage.dir.glob("figs/*/*.webp")) else ".png"

    # lessons: one file per lesson (P1-60: a hosted copy downloads one lesson, not its subject); cards per subject (the decks are per subject)
    cards_idx = []
    for s in syl["subjects"]:
        for l in lessons.values():
            if l.subject == s["id"]:
                stage.reg(f"lessons/{s['id']}/{l.id}.js", "lesson", l.id, {"id": l.id, "title": l.title, "md": l.body})
        cs = [{"id": c["id"], "lesson": l.id, "front": c["front"], "back": c["back"]} for l in lessons.values() if l.subject == s["id"] for c in l.cards]
        if cs:
            stage.reg(f"cards/{s['id']}.js", "cards", s["id"], cs)
    for l in lessons.values():
        for c in l.cards:
            cards_idx.append([c["id"], l.id])

    # PYQ per paper
    for p in papers:
        qs = []
        for q in questions:
            if q["paper"] != p["id"]:
                continue
            fig = []
            for f in q.get("figures") or []:
                rf = {**f, "file": f"{p['id']}/{f['file'].rsplit('.', 1)[0]}{ext}", "tone": tones.get((p["id"], f["file"]), "mono")}
                wh = fig_sizes.get((p["id"], f["file"]))
                if wh and figures_mod.sized(f.get("where")):      # P3-38: w, h = the image's pixel size (option figures: see figures.py)
                    rf["w"], rf["h"] = wh
                fig.append(rf)
            rec = {k: q[k] for k in ("id", "section", "no", "printed", "marks", "type", "stem") if k in q}
            for k in ("options", "group", "answer", "key_raw"):
                if q.get(k):
                    rec[k] = q[k]
            if q.get("key_note"):     # P2-24: one short sentence for 'How we read the key', not the build log in pyq/parsed
                rec["key_note"] = pyq_mod.reader_key_note(q) or q["key_note"]
            if fig:
                rec["figures"] = fig
            if (q.get("transcription") or {}).get("status") == "needs-review":
                rec["review"] = (q["transcription"].get("notes") or "flagged for review")
            qs.append(rec)
        stage.reg(f"pyq/{p['id']}.js", "pyq", p["id"], qs)
    by_subject: dict[str, dict] = {}
    for q in questions:
        if q.get("solution") and q["subject"]:
            by_subject.setdefault(q["subject"], {})[q["id"]] = {"s": q["solution"], "d": q.get("difficulty"), "c": q.get("check")}
    for subj, sol in by_subject.items():
        stage.reg(f"sol/{subj}.js", "sol", subj, sol)
    stage.reg("search-pyq.js", "search", "pyq", pyq_mod.search_postings(questions, syl))

    # the search vocabulary: aliases derived from the lessons, the syllabus and the papers, plus the curated shorthand (P1-26)
    texts = [l.body for l in lessons.values()] + [n.get("name") or "" for n in syl["nodes"].values()] + \
            [search_mod.question_text(q) for q in questions]
    reserved = SUBJECT_WORDS | {s["id"] for s in syl["subjects"]} | {str(s.get("short") or "").lower() for s in syl["subjects"]}

    # manifest
    lesson_rows = [{"id": l.id, "title": l.title, "subject": l.subject, "topic": l.topic, "minutes": l.minutes, "summary": l.summary,
                    "tier": l.tier, "status": l.status, "needs": l.needs, "tags": l.tags, "labs": l.labs, "cards": len(l.cards),
                    "words": l.words, "pyq": l.pyq_ids} for l in lessons.values()]
    manifest = {
        "built": datetime.date.today().isoformat(),
        "syllabus": {"subjects": syl["subjects"], "source": "ICAI CA Intermediate syllabus (new scheme), Group II",
                     "url": "https://www.icai.org/post/syllabus-intermediate-course-new-scheme",
                     "group": "Group II", "pass": {"paper": 40, "aggregate": 50}},
        "sections": lessons_mod.sections_manifest(),
        "lessons": lesson_rows, "cards": cards_idx, "papers": papers,
        "pyq": {"cols": ["id", "paper", "sec", "no", "marks", "type", "subject", "topic", "subtopic", "diff", "flags"],
                "rows": pyq_mod.index_rows(papers, questions, syl)},
        "topicMarks": topic_marks, "labs": labs, "stats": manifest_stats(lessons, questions),
        "lessonFiles": "split",
        "search": search_mod.search_meta(texts, reserved),
        "results": results,
        "cardAliases": cards_mod.shipped(ledger, card_ids),
    }
    if exam:
        manifest["exam"] = exam
    # content stamps (P1-58): every file the app can request, then one stamp over them and the manifest
    files = {**out_mod.hash_tree(ROOT / "app", "app"), **stage.files("data"), **out_mod.hash_tree(ROOT / "vendor", "vendor")}
    manifest["files"] = files
    manifest["ver"] = out_mod.stamp(manifest, files)
    stage.reg("manifest.js", "manifest", "main", manifest)
    print(f"figures: {made} encoded, {reused} reused · manifest ver {manifest['ver']} over {len(files)} files")


def manifest_stats(lessons, questions) -> dict:
    """Small manifest block for figures the lesson rows do not carry (read by app/js/core/insights.js): per lesson the number of diagrams,
    self-check quiz questions and the lab embeds (one entry per `::: lab` block), plus the ids of questions whose key is disputed. Zero entries are omitted."""
    out = {"diagrams": {}, "quiz": {}, "embeds": {}, "disputes": [q["id"] for q in questions if (q.get("check") or {}).get("dispute")]}
    for l in lessons.values():
        d = len(re.findall(r"^:{3,}\s*diagram", l.body, re.M))
        qz = sum(len(re.findall(r"^Q\d*[:.]\s*", m.group(2), re.M)) for m in re.finditer(r"^(:{3,})\s*quiz[^\n]*\n([\s\S]*?)^\1\s*$", l.body, re.M))
        em = re.findall(r"^:{3,}\s*lab\s+([a-z0-9-]+)", l.body, re.M)
        for k, v in (("diagrams", d), ("quiz", qz), ("embeds", em)):
            if v:
                out[k][l.id] = v
    return out


def write_coverage(syl, lessons, questions, labs, papers) -> None:
    """docs/COVERAGE.md — the syllabus coverage checklist, regenerated on every build."""
    qn: dict[str, int] = {}
    for q in questions:
        for k in {q["topic"], q["subtopic"]} - {None}:
            qn[k] = qn.get(k, 0) + 1
    out = ["# Syllabus coverage checklist", "",
           f"_Generated by `build.py` on {datetime.date.today().isoformat()} — do not edit by hand._", "",
           "Scope follows the **ICAI CA Intermediate syllabus (new scheme), Group II**: Paper 4 Cost and Management Accounting, Paper 5 Auditing "
           "and Ethics, Paper 6A Financial Management and Paper 6B Strategic Management. Status: `in` = named in the ICAI syllabus.", "",
           "Legend: ✅ lesson written · ⬜ planned · numbers are ICAI questions tagged to that node (none until the ICAI bank is built).", ""]
    tot = {"nodes": 0, "done": 0}
    for s in syl["subjects"]:
        nodes = [n for t in s["topics"] for n in t["subtopics"]]
        done = sum(1 for n in nodes if n["id"] in lessons)
        tot["nodes"] += len(nodes)
        tot["done"] += done
        out += [f"## {s.get('paper') or ''} {s['name']} ({s.get('marks') or '?'} marks) — {done}/{len(nodes)} lessons · "
                f"{qn.get(s['id'], 0) or sum(1 for q in questions if q['subject'] == s['id'])} questions", "",
                f"> {s['official']}", "", "| Chapter / sub-topic | Status | Lesson | Questions | Cards |", "|---|---|---|---|---|"]
        for t in s["topics"]:
            out.append(f"| **{t['name']}** — _{t['syl']}_ | {t['status']} | | {qn.get(t['id'], '')} | |")
            for n in t["subtopics"]:
                les = lessons.get(n["id"])
                out.append(f"| &nbsp;&nbsp;{n['name']} | {n['status']} | {'✅ ' + str(les.words) + ' words' if les else '⬜'} | {qn.get(n['id'], '')} | {len(les.cards) if les else ''} |")
        out.append("")
    count = lambda pat: sum(len(re.findall(pat, l.body, re.M)) for l in lessons.values())   # noqa: E731
    embeds = count(r"^:{3,}\s*lab\s")
    ready = sum(1 for l in labs if l.get("status") != "planned")
    head = [f"**Lessons:** {tot['done']} of {tot['nodes']} sub-topics written · **Flashcards:** {sum(len(l.cards) for l in lessons.values())} · "
            f"**Diagrams:** {count(r'^:{3,}\s*diagram')} · **Labs:** {len(labs)} ({ready} ready), embedded {embeds} times in "
            f"{sum(1 for l in lessons.values() if re.search(r'^:{3,}\s*lab\s', l.body, re.M))} lessons · **Papers:** {len(papers)} · "
            f"**Questions:** {len(questions)} ({sum(1 for q in questions if q.get('solution'))} with worked solutions)", ""]
    out[4:4] = head
    # scope notes: sub-topics outside the ICAI syllabus text (status legacy / extra); each such lesson says so in its opening paragraph
    off = [(s["name"], n) for s in syl["subjects"] for t in s["topics"] for n in t["subtopics"] if n["status"] in ("legacy", "extra")]
    if off:
        out += ["## Outside the ICAI syllabus text", "",
                "These sub-topics are status `legacy` or `extra`. Their lessons say so in the opening paragraph.", "",
                "| Paper | Sub-topic | id | status | Lesson |", "|---|---|---|---|---|"]
        out += [f"| {sn} | {n['name']} | `{n['id']}` | {n['status']} | {'✅' if n['id'] in lessons else '⬜'} |" for sn, n in off]
    # answer-key disputes recorded in the bank (pyq/meta check.dispute); the app shows a "key questioned" badge on each
    disp = [q for q in questions if (q.get("check") or {}).get("dispute")]
    out += [] if not disp else ["", "## Answer-key disputes", "",
            f"{len(disp)} question(s) where this project's independent solution disagrees with, or qualifies, the official key. The official key is still what the "
            "app scores against; the question shows a *key questioned* badge and the solution explains both readings.", ""]
    clip = lambda t: t if len(t) <= 230 else t[:230].rsplit(" ", 1)[0] + " …"   # noqa: E731
    out += [f"* `{q['id']}`: {clip(' '.join(str(q['check']['dispute']).split()))}" for q in disp]
    out.append("")
    out_mod.write_atomic(ROOT / "docs" / "COVERAGE.md", "\n".join(out))


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
