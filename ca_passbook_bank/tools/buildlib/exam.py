"""Exam calendar (docs/ARCHITECTURE.md §10.5): content/exam.json -> manifest.exam = {cycles: [cycle, ...]}.

cycle = {id, label, organiser, group, days: [every exam day of the group, sorted], papers: {<paper code>: [its day(s)]} (P4, P5, P6),
         time: {start, end, reading, zone} | absent, result: day | null, source: url, sha256?, listed?, checked: day, note}
`build.py --check` rejects a malformed or unsorted calendar and warns when the newest cycle has ended (time to add the next one).
Only official, sourced dates go in (ICAI's own announcement); a paper whose day is not out yet is left out of `papers`.
"""
from __future__ import annotations

import datetime
import json
import re
from pathlib import Path

ISO = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _day(v, where: str, errors: list[str]) -> datetime.date | None:
    if not isinstance(v, str) or not ISO.match(v):
        errors.append(f"content/exam.json: {where} {v!r} is not an ISO date (YYYY-MM-DD)")
        return None
    try:
        return datetime.date.fromisoformat(v)
    except ValueError:
        errors.append(f"content/exam.json: {where} {v!r} is not a real calendar day")
        return None


def load(root: Path, errors: list[str], warnings: list[str], today: datetime.date | None = None) -> dict | None:
    """manifest.exam, validated; None when content/exam.json is absent (the app then uses its built-in fallback cycle)"""
    path = root / "content" / "exam.json"
    if not path.exists():
        warnings.append("content/exam.json is missing: the app falls back to its built-in January 2027 calendar")
        return None
    try:
        doc = json.loads(path.read_text())
    except ValueError as e:
        errors.append(f"content/exam.json: not valid JSON ({e})")
        return None
    cycles = doc.get("cycles") if isinstance(doc, dict) else None
    if not isinstance(cycles, list) or not cycles:
        errors.append("content/exam.json: needs a non-empty \"cycles\" list")
        return None
    out, ids, firsts, n0 = [], set(), [], len(errors)
    for i, c in enumerate(cycles):
        at = f"cycle {i + 1}" + (f" ({c.get('id')})" if isinstance(c, dict) and c.get("id") else "")
        if not isinstance(c, dict):
            errors.append(f"content/exam.json: {at} is not an object")
            continue
        for k in ("id", "label", "organiser", "source", "checked"):
            if not isinstance(c.get(k), str) or not c[k].strip():
                errors.append(f"content/exam.json: {at} needs a non-empty \"{k}\"")
        if c.get("id") in ids:
            errors.append(f"content/exam.json: duplicate cycle id {c.get('id')!r}")
        ids.add(c.get("id"))
        if isinstance(c.get("source"), str) and not c["source"].startswith("https://"):
            errors.append(f"content/exam.json: {at} source must be an https:// URL of ICAI's own announcement")
        days = c.get("days")
        if not isinstance(days, list) or not days:
            errors.append(f"content/exam.json: {at} needs a non-empty \"days\" list")
            continue
        ds = [_day(d, f"{at} day", errors) for d in days]
        if None in ds:
            continue
        if ds != sorted(ds) or len(set(ds)) != len(ds):
            errors.append(f"content/exam.json: {at} days must be sorted and distinct: {days}")
        papers = c.get("papers", {})
        if not isinstance(papers, dict) or not all(isinstance(v, list) for v in papers.values()):
            errors.append(f"content/exam.json: {at} \"papers\" must be {{\"<paper code>\": [days]}}, e.g. {{\"P4\": [\"2027-01-08\"]}}")
            papers = {}
        for code, pd in papers.items():
            if not re.fullmatch(r"P\d[A-B]?", code):
                errors.append(f"content/exam.json: {at} paper code {code!r} is not like P4, P5, P6 or P6A")
            for d in pd:
                if d not in days:
                    errors.append(f"content/exam.json: {at} {code} day {d!r} is not one of its exam days")
            if pd != sorted(pd):
                errors.append(f"content/exam.json: {at} {code} days must be sorted")
        tm = c.get("time")
        if tm is not None and not (isinstance(tm, dict) and all(re.fullmatch(r"\d{2}:\d{2}", str(tm.get(k, ""))) for k in ("start", "end"))):
            errors.append(f"content/exam.json: {at} \"time\" must be {{\"start\": \"HH:MM\", \"end\": \"HH:MM\", \"reading\": \"HH:MM\", \"zone\": \"IST\"}}")
        res = c.get("result")
        if res is not None:
            r = _day(res, f"{at} result", errors)
            if r and r <= ds[-1]:
                errors.append(f"content/exam.json: {at} result day {res} is not after the last exam day {days[-1]}")
        _day(c.get("checked"), f"{at} checked", errors)
        firsts.append((ds[0], ds[-1], c.get("id")))
        rec = {"id": c.get("id"), "label": c.get("label"), "organiser": c.get("organiser"), "days": list(days),
               "papers": {k: list(v) for k, v in papers.items()}, "result": res, "source": c.get("source"), "checked": c.get("checked"),
               "note": c.get("note") or "Dates as announced by ICAI; verify on icai.org"}
        for k in ("group", "time", "sha256", "listed"):
            if c.get(k) is not None:
                rec[k] = c[k]
        out.append(rec)       # (a cycle with a missing field is reported above, never shipped)
    if len(errors) > n0:
        return None
    if [f[0] for f in firsts] != sorted(f[0] for f in firsts):
        errors.append("content/exam.json: cycles must be sorted by their first exam day")
        return None
    for a, b in zip(firsts, firsts[1:]):
        if b[0] <= a[1]:
            errors.append(f"content/exam.json: cycle {b[2]} starts before cycle {a[2]} ends")
    today = today or datetime.date.today()
    if firsts and firsts[-1][1] < today:
        warnings.append(f"content/exam.json: the newest cycle ({firsts[-1][2]}) ended on {firsts[-1][1].isoformat()}: add the next attempt once "
                        "ICAI announces its dates")
    return {"cycles": out}
