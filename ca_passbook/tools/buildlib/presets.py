"""The past-paper questions the lab examples cite (audit P1-38; docs/ARCHITECTURE.md §10.11).

A lab example (a preset in app/js/labs/<lab>.js) names its question(s) in a structured way, `pyq: 'cs-2015-3:CS36'` (or a list), or in a
leading tag, '[cs-2015-3:CS36] Address · …', the two forms app/js/labs/framework.js reads. A structured citation must name a question the bank
ships (`build.py --check` fails otherwise); an id written anywhere else in a label is an older, unstructured citation and only warns, with a
hint when the paper numbers its questions CS/GA rather than Q.
tools/buildlib/lab_presets.js loads the lab files in Node and prints every preset as JSON for `dump()`.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

QID = re.compile(r"\b(cs-\d{4}(?:-\d)?:(?:CS|GA|Q)\d{1,3})\b")
# PassBook's labs name the ICAI document in words ('PYQ May 2024 Q5(b)', 'RTP September 2025 MCQ 5', 'MTP Sep 2026 Series I Q3(a)'): counted as
# citing a past paper (not checked against the bank, which keys items by document id)
ICAI_CITE = re.compile(r"\b(?:PYQ|Exam|RTP|MTP)\b[^·:\]]{0,40}?\b(?:Jan(?:uary)?|May|June?|July?|Sep(?:t(?:ember)?)?|Nov(?:ember)?|Dec(?:ember)?)\s+20\d\d\b")


def dump(root: Path, node: str | None, errors: list[str]) -> list[dict] | None:
    """[{lab, i, label, pyq: [ids] | None, tag: [ids] | None}] from the lab files; None when Node is not available"""
    script = root / "tools" / "buildlib" / "lab_presets.js"
    if not node or not script.exists():
        return None
    r = subprocess.run([node, str(script)], capture_output=True, text=True, cwd=root)
    try:
        doc = json.loads(r.stdout)
    except ValueError:
        errors.append("tools/buildlib/lab_presets.js crashed: " + (r.stderr or r.stdout)[-400:])
        return None
    for e in doc.get("errors") or []:
        errors.append(f"app/js/labs/{e}")
    return doc.get("presets") or []


def classify(presets: list[dict], qids: set[str], errors: list[str], warnings: list[str]) -> dict:
    """check every citation against the bank; returns {presets, cited, structured} counts for the build summary"""
    n = {"presets": 0, "cited": 0, "structured": 0}
    for p in presets:
        n["presets"] += 1
        structured = list(dict.fromkeys((p.get("tag") or []) + (p.get("pyq") or [])))
        loose = [x for x in dict.fromkeys(QID.findall(p.get("label") or "")) if x not in structured]
        if structured or loose or ICAI_CITE.search(p.get("label") or ""):
            n["cited"] += 1
        if structured:
            n["structured"] += 1
        for x, strict in [(x, True) for x in structured] + [(x, False) for x in loose]:
            if x in qids:
                continue
            hint = ""
            m = re.match(r"^(cs-\d{4}(?:-\d)?):Q(\d+)$", x)
            if m:
                alt = [f"{m.group(1)}:{s}{m.group(2)}" for s in ("CS", "GA") if f"{m.group(1)}:{s}{m.group(2)}" in qids]
                hint = f" (did you mean {alt[0]}?)" if alt else ""
            (errors if strict and qids else warnings).append(f"app/js/labs/{p.get('lab')}.js example {int(p.get('i') or 0) + 1} cites {x}, which is not "
                                                    f"in the question bank{hint}: “{(p.get('label') or '')[:70]}”")
    return n


def check(root: Path, node: str | None, qids: set[str], errors: list[str], warnings: list[str]) -> dict:
    presets = dump(root, node, errors)
    return {} if presets is None else classify(presets, qids, errors, warnings)
