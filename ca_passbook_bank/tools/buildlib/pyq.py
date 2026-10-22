"""Assemble the shippable question bank from pyq/parsed/*.json (transcribed + verified) and pyq/meta/*.json (tags, solutions).

Paper rows carry their provenance: src.qp and src.key = {url, wayback, sha256, retrieved, page?, note?} and keySrc = 'file' (a separate key
PDF), 'paper' (the key is printed inside the question-paper PDF: same file, same SHA-256, opened at its first key page) or null (no key was
published). Question index rows carry flag bits (FLAG below; app/js/core/data.js reads the same table). The drawings in worked solutions are
checked like a lesson's (P3-14: each parses and has an accessible name; check_solution_diagrams).
"""
from __future__ import annotations

import json
import re
from pathlib import Path

from . import search as search_mod

TYPE_IDX = {"MCQ": 0, "MSQ": 1, "NAT": 2}
DIFF_IDX = {"easy": 0, "medium": 1, "hard": 2}
STOP = search_mod.STOP
# question flag bits (the manifest's pyq.rows `flags` column; data.js FLAG)
FLAG = {"FIG": 1, "SOL": 2, "KEY": 4, "SPECIAL": 8, "REVIEW": 16, "GROUP": 32, "LEGACY": 64,
        "MTA": 128,          # the official key gave marks to all: never in a generated pool (P0-04)
        "CHECKED": 256,      # keyed: our independent solution matched the official key; unkeyed: our worked answer exists (P2-77 badge)
        "DISPUTE": 512}      # our independent solution questions the official key ('key questioned', P2-77)


def load_papers(root: Path, syl: dict, include_auto: bool, dev_tags: bool, errors: list[str], warnings: list[str]):
    parsed, meta_dir = root / "pyq" / "parsed", root / "pyq" / "meta"
    manifest = json.loads((root / "pyq" / "sources" / "manifest.json").read_text())["papers"]
    fetched = json.loads((root / "pyq" / "sources" / "fetched.json").read_text())
    sets_per_year: dict[int, int] = {}
    for pid, m in manifest.items():
        sets_per_year[m["year"]] = sets_per_year.get(m["year"], 0) + 1
    papers, questions = [], []
    devtag = None
    if dev_tags:
        from . import devtag as devtag   # noqa: F811
    for pid in sorted(manifest):
        f = parsed / f"{pid}.json"
        if not f.exists():
            continue
        doc = json.loads(f.read_text())
        m = manifest[pid]
        meta = {}
        mf = meta_dir / f"{pid}.json"
        if mf.exists():
            meta = json.loads(mf.read_text())
        qs = []
        counts = {"verified": 0, "needs-review": 0, "auto": 0}
        for q in doc["questions"]:
            st = (q.get("transcription") or {}).get("status", "auto")
            counts[st] = counts.get(st, 0) + 1
            if st == "auto" and not include_auto:
                continue
            qs.append(q)
        if not qs:
            continue
        year = m["year"]
        label = f"GATE {year} CS" + (f" · Set {m['set']}" if sets_per_year[year] > 1 else "")
        keyed = sum(1 for q in qs if q.get("answer"))
        src = {}
        for kind in ("qp", "key"):
            recs = [r for r in fetched.values() if r["paper"] == pid and r["kind"] == kind]
            if recs:
                r = recs[0]
                src[kind] = {"url": r["url"], "wayback": r.get("wayback"), "sha256": r["sha256"], "retrieved": r["retrieved"][:10]}
        key_src = "file" if "key" in src else None
        inpaper = [k for k in m.get("key") or [] if k.get("same_file_pages")]
        if "key" not in src and inpaper and "qp" in src:
            pages = sorted(int(x) for x in inpaper[0]["same_file_pages"])
            if inpaper[0].get("url") and inpaper[0]["url"] != src["qp"]["url"]:
                errors.append(f"{pid}: key 'same_file_pages' names {inpaper[0]['url']}, not the question-paper file {src['qp']['url']}")
            span = f"p. {pages[0]}" if len(pages) == 1 else f"pp. {pages[0]}\u2013{pages[-1]}"
            src["key"] = dict(src["qp"], page=pages[0], note=f"key on {span}")
            key_src = "paper"
        if keyed and not key_src:
            errors.append(f"{pid}: {keyed} keyed question(s) but no answer-key source in pyq/sources (fetched.json, or same_file_pages)")
        if not keyed:
            key_src = None
        key_note = paper_key_note(pid, m, year, keyed, errors)
        papers.append({"id": pid, "year": year, "set": m["set"], "label": label, "organiser": m["organiser"],
                       "n": len(qs), "ga": sum(1 for q in qs if q["section"] == "GA"), "cs": sum(1 for q in qs if q["section"] == "CS"),
                       "marks": sum(q.get("marks") or 0 for q in qs), "minutes": 180, "keyed": keyed,
                       "verified": counts["verified"], "review": counts["needs-review"], "pending": counts["auto"],
                       "numbering": doc.get("numbering", "global"), "src": src, "keySrc": key_src,
                       **({"keyNote": key_note} if key_note else {})})
        for q in qs:
            mt = meta.get(q["id"], {})
            subj, topic, sub = mt.get("subject"), mt.get("topic"), mt.get("subtopic")
            if not subj and devtag:
                text = (q.get("stem") or "") + " " + " ".join(q.get("options") or [])
                subj, topic = devtag.tag(text)
                if q["section"] == "GA":
                    subj, topic = "ga", None
            if subj:
                if subj not in syl["subjects_by_id"]:
                    errors.append(f"{q['id']}: unknown subject {subj}")
                if topic and topic not in syl["nodes"]:
                    errors.append(f"{q['id']}: unknown topic {topic}")
                if sub and sub not in syl["nodes"]:
                    errors.append(f"{q['id']}: unknown subtopic {sub}")
                if topic and syl["nodes"].get(topic, {}).get("subject") != subj:
                    errors.append(f"{q['id']}: topic {topic} is not in subject {subj}")
                if sub and syl["nodes"].get(sub, {}).get("topic") != topic:
                    errors.append(f"{q['id']}: subtopic {sub} is not in topic {topic}")
            rec = dict(q)
            rec["paper"] = pid
            rec["year"] = year
            rec["subject"], rec["topic"], rec["subtopic"] = subj, topic, sub
            rec["difficulty"] = mt.get("difficulty")
            rec["solution"] = named_solution(q["id"], mt.get("solution"), warnings)
            rec["check"] = mt.get("check")
            questions.append(rec)
    return papers, questions


def paper_key_note(pid: str, m: dict, year: int, keyed: int, errors: list[str]) -> str | None:
    """the line an unkeyed paper shows after 'No official key.' (P2-28): pyq/sources/manifest.json's key_note with {organiser} and {year}
    filled in, so GATE 2008 names IISc Bangalore, not 'the IIT organisers'; an institute other than the paper's organiser is an error"""
    note = m.get("key_note")
    if not note or keyed:
        return None
    try:
        note = note.format(organiser=m["organiser"], year=year)
    except (KeyError, IndexError, ValueError) as e:
        errors.append(f"{pid}: key_note in pyq/sources/manifest.json has a bad placeholder ({e}); use {{organiser}} and {{year}}")
        return None
    for inst in ("IIT", "IISc"):
        if re.search(rf"\b{inst}\b", note) and not m["organiser"].startswith(inst):
            errors.append(f"{pid}: key_note names {inst}, but GATE {year} was organised by {m['organiser']}")
    return note


# P2-24: the key notes in pyq/parsed are build logs ("key.json row GA 10 is empty (the tick-icon decoder ..."). The card shows the learner
# one short sentence under "How we read the key" instead: where in the official key the answer was read and, when it matters, how.
INTERNAL = re.compile(r"key\.json|\bOCR\b|decoder|machine-parsed|normal form|kind '?single|tools/pyq|validate\.py|multi \[", re.I)


def reader_key_note(q: dict) -> str | None:
    """the learner's version of q['key_note'] (None when there is no note, or when no rule matches: the build then warns and ships it as is)"""
    note = " ".join(str(q.get("key_note") or "").split())
    if not note:
        return None
    m = re.fullmatch(r"code ([A-D]), key page (\d+)", note)
    if m:
        return f"From page {m.group(2)} of the official key, under paper code {m.group(1)}, the code of the question paper transcribed here."
    pm = re.search(r"\b(?:page|p\.)\s*(\d+)", note)
    page = f"page {pm.group(1)} of the official key" if pm else "the official key"
    ans = q.get("answer") or {}
    if ans.get("kind") == "multi" and len(ans.get("value") or []) == 1 and re.search(r"\bMSQ\b", note):
        where = f" (page {pm.group(1)})" if pm else ""
        return f"The official key{where} lists one correct option for this MSQ: select {ans['value'][0]} only."
    if ans.get("kind") == "oneof" and re.search(r"either is accepted|\bOR\b", note):
        return f"Checked by hand against {page}, which accepts either answer."
    if INTERNAL.search(note):
        return f"Checked by hand against {page}."
    return None


# P3-14: a drawing in a worked solution needs an accessible name, like a lesson's (CONTENT_GUIDE §4): title="…" after ```diagram, or a
# title, caption or alt in its spec (a table is HTML and reads out cell by cell, so it needs none). Without one a screen reader hears only
# "graph". The names below are for the three solution drawings written before the rule; the build applies them (pyq/meta, which no
# package of the audit owns, is untouched) and warns once pyq/meta names the drawing itself, so the entry can go.
SOLUTION_DIAGRAM_NAMES = {
    "cs-2008:Q19": "The question's graph, BFS starting at Q (blue)",
    "cs-2009:Q41": "The DFA from the question",
    "cs-2011:Q27": "The parse tree of 7 ↓ 3 ↑ 4 ↑ 3 ↓ 2",
}
SOL_DIAGRAM = re.compile(r"^(?P<fence>`{3,}|~{3,})[ \t]*diagram\b(?P<info>[^\n]*)\n(?P<body>.*?)\n(?P=fence)[ \t]*$"
                         r"|^(?P<colons>:{3,})[ \t]*diagram\b(?P<head>[^\n]*)\n(?P<cbody>.*?)\n(?P=colons)[ \t]*$", re.M | re.S)


def solution_diagrams(text: str | None) -> list[dict]:
    """the drawings of a worked solution (```diagram fences, as md.js draws them, and ::: diagram blocks), in order:
    [{"span": (start, end) of the JSON, "spec": dict or None when it does not parse, "type", "named": has an accessible name or needs none}]"""
    out = []
    for m in SOL_DIAGRAM.finditer(text or ""):
        fence = m.group("fence") is not None
        key = "body" if fence else "cbody"
        title = re.search(r'title="([^"]+)"', m.group("info") or "") if fence else None
        head = (title.group(1) if title else "") if fence else (m.group("head") or "").strip()
        try:
            spec = json.loads(m.group(key))
        except ValueError:
            spec = None
        spec = spec if isinstance(spec, dict) else None
        typ = str((spec or {}).get("type") or "diagram")
        named = bool(head) or typ == "table" or bool(spec and any(str(spec.get(k) or "").strip() for k in ("title", "caption", "alt")))
        out.append({"span": m.span(key), "spec": spec, "type": typ, "named": named})
    return out


def named_solution(qid: str, text: str | None, warnings: list[str]) -> str | None:
    """the worked solution as shipped: SOLUTION_DIAGRAM_NAMES[qid] becomes the title of its first unnamed drawing"""
    name = SOLUTION_DIAGRAM_NAMES.get(qid)
    if not text or not name:
        return text
    for d in solution_diagrams(text):
        if not d["named"] and d["spec"] is not None:
            a, b = d["span"]
            i = text.index("{", a)
            rest = text[i + 1:b].strip()
            return text[:i + 1] + '"title": ' + json.dumps(name, ensure_ascii=False) + ("" if rest.startswith("}") else ", ") + text[i + 1:]
    warnings.append(f"{qid}: its worked solution names every drawing itself now; remove its entry from SOLUTION_DIAGRAM_NAMES (tools/buildlib/pyq.py)")
    return text


def check_solution_diagrams(questions, errors: list[str], warnings: list[str]) -> int:
    """P3-14: every drawing a shipped worked solution holds parses (else the card shows 'Diagram error') and has an accessible name;
    returns the number of drawings checked"""
    n, broken, unnamed = 0, [], []
    for q in questions:
        for d in solution_diagrams(q.get("solution")):
            n += 1
            if d["spec"] is None:
                broken.append(q["id"])
            elif not d["named"]:
                unnamed.append(f"{q['id']} ({d['type']})")
    if broken:
        errors.append(f"{len(broken)} drawing(s) in worked solutions are not valid JSON objects, so the card shows 'Diagram error': {', '.join(broken[:6])} (pyq/meta)")
    if unnamed:
        warnings.append(f"{len(unnamed)} drawing(s) in worked solutions have no title, caption or alt, so screen readers hear only the type: "
                        f"{', '.join(unnamed[:6])} (add title=\"…\" after ```diagram in pyq/meta, or a title, caption or alt in the spec)")
    return n


def tokens(text: str) -> set[str]:
    """the indexable words of a text (one normalisation with the runtimes: tools/buildlib/textnorm.py)"""
    return search_mod.index_words(text)


def flags_of(q: dict, syl: dict) -> int:
    topic_status = syl["nodes"].get(q["subtopic"] or q["topic"] or "", {}).get("status", "in")
    kind = (q.get("answer") or {}).get("kind")
    chk = q.get("check") or {}
    checked = bool(chk.get("agrees")) if q.get("answer") else bool(chk.get("blind"))
    return ((FLAG["FIG"] if q.get("figures") else 0) | (FLAG["SOL"] if q.get("solution") else 0) | (FLAG["KEY"] if q.get("answer") else 0) |
            (FLAG["SPECIAL"] if kind in ("mta", "oneof") else 0) |
            (FLAG["REVIEW"] if (q.get("transcription") or {}).get("status") == "needs-review" else 0) |
            (FLAG["GROUP"] if q.get("group") else 0) | (FLAG["LEGACY"] if topic_status in ("legacy", "extra") else 0) |
            (FLAG["MTA"] if kind == "mta" else 0) | (FLAG["CHECKED"] if checked and not chk.get("dispute") else 0) |
            (FLAG["DISPUTE"] if chk.get("dispute") else 0))


def index_rows(papers, questions, syl):
    pidx = {p["id"]: i for i, p in enumerate(papers)}
    rows = []
    for q in questions:
        rows.append([q["id"], pidx[q["paper"]], 0 if q["section"] == "GA" else 1, q["no"], q.get("marks") or 0,
                     TYPE_IDX.get(str(q["type"]).upper(), 0), q["subject"], q["topic"], q["subtopic"],
                     DIFF_IDX.get(q.get("difficulty") or "", -1), flags_of(q, syl)])
    return rows


def search_postings(questions, syl=None):
    """data/search-pyq.js: word -> [index into the manifest's question rows] (tools/buildlib/search.py)"""
    return search_mod.postings(questions, (syl or {}).get("nodes") or {})
