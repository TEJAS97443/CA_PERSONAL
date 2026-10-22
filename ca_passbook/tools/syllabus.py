#!/usr/bin/env python3
"""Compile content/syllabus/syllabus.txt into a validated tree (see the grammar at the top of that file).

    python3 -I tools/syllabus.py            validate and print a summary
    from syllabus import load              -> {"subjects": [...], "topics": {...}, "nodes": {...}}

Output tree:  subject {id,name,area,short,hue,marks (int: the paper's marks, e.g. 100 or 50),paper ('P4', 'P6A' ...),official,topics:[...]}
              topic   {id,name,syl,status,subject,subtopics:[...]}
              sub     {id,name,tier,status,topic,subject}
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "content" / "syllabus" / "syllabus.txt"
TIERS = {"c": "core", "s": "standard", "a": "advanced"}
STATUS = ("in", "legacy", "extra")


def load(path: Path = SRC) -> dict:
    subjects: list[dict] = []
    topics: dict[str, dict] = {}
    nodes: dict[str, dict] = {}
    cur_s = cur_t = None
    for n, raw in enumerate(path.read_text().splitlines(), 1):
        line = raw.rstrip()
        if not line.strip() or line.lstrip().startswith("#") and not line.startswith("##"):
            continue
        if line.startswith("@subject"):
            parts = [p.strip() for p in line[len("@subject"):].split("|")]
            sid, name = parts[0], parts[1]
            kv = dict(p.split("=", 1) for p in parts[2:] if "=" in p)
            marks = kv.get("marks", "")
            if marks and not re.fullmatch(r"\d+", marks):
                raise SystemExit(f"{path.name}:{n}: marks must be a whole number (the paper's marks), got {marks!r}")
            cur_s = {"id": sid, "name": name, "area": kv.get("area", name), "short": kv.get("short", sid.upper()),
                     "hue": int(kv.get("hue", 220)), "marks": int(marks) if marks else 0, "paper": kv.get("paper", ""),
                     "official": "", "topics": []}
            subjects.append(cur_s)
            cur_t = None
        elif line.startswith("official:"):
            cur_s["official"] = line[len("official:"):].strip()
        elif line.startswith("## "):
            parts = [p.strip() for p in line[3:].split("|")]
            tid, name = parts[0], parts[1]
            syl, status = "", "in"
            for p in parts[2:]:
                if p.startswith("syl="):
                    syl = p[4:]
                elif p in STATUS:
                    status = p
            if not tid.startswith(cur_s["id"] + "."):
                raise SystemExit(f"{path.name}:{n}: topic {tid} must start with {cur_s['id']}.")
            if tid in nodes:
                raise SystemExit(f"{path.name}:{n}: duplicate id {tid}")
            cur_t = {"id": tid, "name": name, "syl": syl, "status": status, "subject": cur_s["id"], "subtopics": []}
            cur_s["topics"].append(cur_t)
            topics[tid] = cur_t
            nodes[tid] = cur_t
        elif line.startswith("- "):
            parts = [p.strip() for p in line[2:].split("|")]
            if len(parts) < 3:
                raise SystemExit(f"{path.name}:{n}: subtopic needs `id | name | tier`")
            sid, name, tier = parts[0], parts[1], parts[2]
            if tier not in TIERS:
                raise SystemExit(f"{path.name}:{n}: tier must be c/s/a, got {tier!r}")
            status = parts[3] if len(parts) > 3 else cur_t["status"]
            if status not in STATUS:
                raise SystemExit(f"{path.name}:{n}: bad status {status!r}")
            if not sid.startswith(cur_t["id"] + "."):
                raise SystemExit(f"{path.name}:{n}: subtopic {sid} must start with {cur_t['id']}.")
            if sid in nodes:
                raise SystemExit(f"{path.name}:{n}: duplicate id {sid}")
            node = {"id": sid, "name": name, "tier": TIERS[tier], "status": status, "topic": cur_t["id"], "subject": cur_s["id"]}
            cur_t["subtopics"].append(node)
            nodes[sid] = node
        elif line.startswith("@") or line.startswith("official"):
            raise SystemExit(f"{path.name}:{n}: cannot parse: {line[:60]}")
    for s in subjects:
        if not s["topics"] or not s["official"]:
            raise SystemExit(f"subject {s['id']} needs an `official:` line and at least one topic")
        for t in s["topics"]:
            if not t["subtopics"]:
                raise SystemExit(f"topic {t['id']} has no subtopics")
    return {"subjects": subjects, "topics": topics, "nodes": nodes}


if __name__ == "__main__":
    d = load()
    print(f"{len(d['subjects'])} subjects, {len(d['topics'])} topics, {len(d['nodes']) - len(d['topics'])} subtopics")
    for s in d["subjects"]:
        subs = [x for t in s["topics"] for x in t["subtopics"]]
        by = {}
        for x in subs:
            by[x["status"]] = by.get(x["status"], 0) + 1
        print(f"  {s['id']:5s} {s.get('paper') or '':4s} {s['name']:36s} marks={s['marks']:3d} topics={len(s['topics']):2d} subtopics={len(subs):3d} {by}")
