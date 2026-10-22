"""Official results (audit P2-35, decision D11): pyq/sources/results.json -> manifest.results.

Each record names an exam and paper ('GATE 2026', 'CS'), the bank's papers it applies to, the official qualifying marks per category out of
`outOf`, and its source (the organising institute's page: url, a byte-identical Wayback snapshot, the SHA-256 as retrieved). The app draws a
qualifying-mark line from it and nothing else: no predicted score, no rank estimate.
"""
from __future__ import annotations

import datetime
import json
import re
from pathlib import Path

SHA = re.compile(r"^[0-9a-f]{64}$")
WAYBACK = re.compile(r"^\d{14}$")


def load(root: Path, papers: list[dict], errors: list[str], warnings: list[str]) -> list[dict]:
    path = root / "pyq" / "sources" / "results.json"
    if not path.exists():
        return []
    try:
        doc = json.loads(path.read_text())
    except ValueError as e:
        errors.append(f"pyq/sources/results.json: not valid JSON ({e})")
        return []
    recs = doc.get("results") if isinstance(doc, dict) else None
    if not isinstance(recs, list):
        errors.append("pyq/sources/results.json: needs a \"results\" list")
        return []
    by_id = {p["id"]: p for p in papers}
    out, seen, n0 = [], set(), len(errors)
    for i, r in enumerate(recs):
        at = f"pyq/sources/results.json: record {i + 1}"
        if not isinstance(r, dict):
            errors.append(f"{at} is not an object")
            continue
        at += f" ({r.get('exam')} {r.get('paper')})"
        m = re.match(r"^GATE (\d{4})$", str(r.get("exam") or ""))
        if not m:
            errors.append(f"{at}: exam must read 'GATE <year>'")
            continue
        year = int(m.group(1))
        if (r.get("exam"), r.get("paper")) in seen:
            errors.append(f"{at}: duplicate record")
        seen.add((r.get("exam"), r.get("paper")))
        if r.get("paper") != "CS":
            errors.append(f"{at}: paper must be 'CS' (the bank holds CS papers only)")
        ids = r.get("papers")
        if not isinstance(ids, list) or not ids:
            errors.append(f"{at}: needs the bank's paper ids it applies to")
            ids = []
        for pid in ids:
            p = by_id.get(pid)
            if not p:
                errors.append(f"{at}: paper {pid!r} is not in the bank")
            elif p["year"] != year:
                errors.append(f"{at}: paper {pid} is from {p['year']}, not {year}")
        out_of = r.get("outOf")
        if not isinstance(out_of, (int, float)) or out_of <= 0:
            errors.append(f"{at}: outOf must be the paper's maximum marks")
            out_of = 100
        for pid in ids:
            p = by_id.get(pid)
            if p and p.get("marks") and p["marks"] != out_of:
                errors.append(f"{at}: paper {pid} carries {p['marks']} marks, not {out_of}")
        qual = r.get("qualifying")
        if not isinstance(qual, dict) or not qual:
            errors.append(f"{at}: needs qualifying marks per category")
        else:
            for k, v in qual.items():
                if not isinstance(v, (int, float)) or not 0 < v <= out_of:
                    errors.append(f"{at}: qualifying mark for {k!r} must be a number in (0, {out_of}]")
            if "General" not in qual:
                errors.append(f"{at}: the 'General' category is the app's default and must be present")
        src = r.get("source")
        if not isinstance(src, dict):
            errors.append(f"{at}: needs a source")
        else:
            if not str(src.get("url") or "").startswith("https://"):
                errors.append(f"{at}: source.url must be the organising institute's https:// page")
            if src.get("wayback") is not None and not WAYBACK.match(str(src["wayback"])):
                errors.append(f"{at}: source.wayback must be a 14-digit Wayback timestamp or null")
            if not SHA.match(str(src.get("sha256") or "")):
                errors.append(f"{at}: source.sha256 must be the 64-hex SHA-256 of the page as retrieved")
        for k in ("checked",):
            try:
                datetime.date.fromisoformat(str(r.get(k)))
            except ValueError:
                errors.append(f"{at}: {k} must be an ISO date")
        out.append({k: r[k] for k in ("exam", "paper", "papers", "organiser", "outOf", "qualifying", "registered", "appeared", "source", "checked")
                    if k in r})
    if len(errors) > n0:
        return []
    return sorted(out, key=lambda r: r["exam"], reverse=True)
