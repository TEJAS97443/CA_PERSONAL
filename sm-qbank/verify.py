#!/usr/bin/env python3
"""Quality gate for the question bank (SPEC §8). Run before the final build.

python3 verify.py            report only
python3 verify.py --fix-oos  also move old-scheme questions whose topic was dropped
                             from the 2023 syllabus into the appendix
"""
from __future__ import annotations

import json
import re
import sys
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build import (CANON, TOPIC_CH, attempt_key, detect_topics, norm_chapter,  # noqa: E402
                   sanitize, substance)

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
FIX = "--fix-oos" in sys.argv

# every attempt SPEC §3 expects
OLD = ["May 2018", "Nov 2018", "May 2019", "Nov 2019", "May 2020", "Nov 2020", "Jan 2021",
       "July 2021", "Dec 2021", "May 2022", "Nov 2022", "May 2023", "Nov 2023"]
NEW = ["May 2024", "Sep 2024", "Jan 2025", "May 2025", "Sep 2025", "Jan 2026", "May 2026",
       "Sep 2026"]


def norm_attempt(a: str) -> str:
    a = (a or "").strip()
    a = re.sub(r"\bSept\b", "Sep", a, flags=re.I)
    a = re.sub(r"\bNovember\b", "Nov", a, flags=re.I)
    a = re.sub(r"\bJanuary\b", "Jan", a, flags=re.I)
    a = re.sub(r"\bSeptember\b", "Sep", a, flags=re.I)
    a = re.sub(r"\bDecember\b", "Dec", a, flags=re.I)
    a = re.sub(r"\bJul\b", "July", a, flags=re.I)
    return a


def not_published() -> dict[tuple, str]:
    """(scheme, attempt, doc) -> reason, for documents the manifests record ICAI never issued."""
    out: dict[tuple, str] = {}
    for f in sorted(ROOT.glob("manifest*.json")):
        m = json.loads(f.read_text())
        items = m if isinstance(m, list) else m.get("attempts") or []
        for e in items:
            if (e.get("status") or "") != "not_published":
                continue
            t = (e.get("type") or "").upper()
            doc = f"MTP-{e['series']}" if t == "MTP" and e.get("series") else t
            out[((e.get("scheme") or "").lower(), norm_attempt(e.get("attempt", "")), doc)] = \
                (e.get("note") or "").strip()
    return out


def main() -> None:
    errors: list[str] = []
    warns: list[str] = []
    files = sorted(DATA.glob("*.json"))
    if not files:
        sys.exit("no data/*.json yet")

    have: dict[tuple, set] = defaultdict(set)
    per_type = Counter()
    per_ch = Counter()
    total = 0
    no_ans = 0
    fixed = 0
    all_q: list[tuple[str, str, str]] = []   # (file, qid, question)

    for f in files:
        try:
            doc = json.loads(f.read_text())
        except Exception as exc:                                  # noqa: BLE001
            errors.append(f"{f.name}: will not parse — {exc}")
            continue
        src = doc.get("source") or {}
        for k in ("type", "attempt", "scheme"):
            if not src.get(k):
                errors.append(f"{f.name}: source.{k} missing")
        t = (src.get("type") or "?").upper()
        attempt = norm_attempt(src.get("attempt", ""))
        scheme = (src.get("scheme") or "").lower()
        if t == "MTP" and src.get("series"):
            have[(scheme, attempt)].add(f"MTP-{src['series']}")
        else:
            have[(scheme, attempt)].add(t)
        if not src.get("pdf_url"):
            warns.append(f"{f.name}: no pdf_url recorded")

        qs = doc.get("questions") or []
        if not qs:
            warns.append(f"{f.name}: zero questions")
        seen_ids: set[str] = set()
        seen_q: set[str] = set()
        changed = False
        for q in qs:
            total += 1
            per_type[t] += 1
            qt = sanitize(q.get("question") or "")
            at = sanitize(q.get("answer") or "")
            qid = q.get("id") or ""
            ch = norm_chapter(q.get("chapter"))
            per_ch[ch] += 1

            if len(sanitize(substance(q))) < 25:
                errors.append(f"{f.name} [{qid}]: question under 25 chars")
            if qid and qid in seen_ids:
                errors.append(f"{f.name} [{qid}]: duplicate id")
            seen_ids.add(qid)
            key = re.sub(r"\W+", "", qt.lower())[:140]
            if key and key in seen_q:
                errors.append(f"{f.name} [{qid}]: duplicate question inside one source")
            seen_q.add(key)
            if ch not in {"1", "2", "3", "4", "5", "MCQ", "OOS"}:
                errors.append(f"{f.name} [{qid}]: bad chapter {q.get('chapter')!r}")
            if not at and not q.get("mcq_answer"):
                no_ans += 1
            elif at and qt and SequenceMatcher(None, qt[:300].lower(),
                                               at[:300].lower()).ratio() > 0.92:
                errors.append(f"{f.name} [{qid}]: answer merely repeats the question")
            if q.get("marks") is not None and not isinstance(q["marks"], int):
                warns.append(f"{f.name} [{qid}]: marks not an integer ({q['marks']!r})")
            if ch == "OOS" and not (q.get("mapping_note") or "").strip():
                warns.append(f"{f.name} [{qid}]: flagged out of syllabus with no reason given")
            if scheme == "old" and q.get("chapter_source") == "icai":
                warns.append(f"{f.name} [{qid}]: old scheme cannot have an ICAI chapter tag")

            # safety net: old-scheme question whose only topic was dropped in 2023
            if scheme == "old" and ch != "OOS":
                tops = detect_topics(q)
                if tops and all(TOPIC_CH.get(x) == "OOS" for x in tops):
                    msg = (f"{f.name} [{qid}]: old-scheme question on a dropped topic "
                           f"({', '.join(tops)}) is not flagged out of syllabus")
                    if FIX:
                        q["chapter"] = "OUT_OF_SYLLABUS"
                        note = (q.get("mapping_note") or "").strip()
                        q["mapping_note"] = (
                            note + ("; " if note else "")
                            + f"{tops[0]} was dropped from the 2023 syllabus").strip()
                        changed = True
                        fixed += 1
                    else:
                        warns.append(msg)
            all_q.append((f.name, qid, qt))

        if changed:
            f.write_text(json.dumps(doc, indent=2, ensure_ascii=False))

    # cross-source repeats are useful signal, not an error
    repeats = 0
    seen: dict[str, str] = {}
    for fn, qid, qt in all_q:
        key = re.sub(r"\W+", "", qt.lower())[:140]
        if not key:
            continue
        if key in seen and seen[key].split("-")[0] != fn.split("-")[0]:
            repeats += 1
        seen.setdefault(key, fn)

    # coverage against SPEC §3
    missing: list[str] = []
    explained: list[str] = []
    np_ = not_published()
    for scheme, attempts in (("old", OLD), ("new", NEW)):
        for a in attempts:
            h = have.get((scheme, a), set())
            for doc in ("RTP", "PYQ", "MTP-I", "MTP-II"):
                if doc in h or (doc == "MTP-I" and "MTP" in h):
                    continue
                if (scheme, a, doc) in np_:
                    explained.append(f"{scheme} {a} {doc}")
                else:
                    missing.append(f"{scheme} {a}: missing {doc}")

    print(f"files          : {len(files)}")
    print(f"questions      : {total}")
    print(f"  by type      : " + ", ".join(f"{k} {v}" for k, v in sorted(per_type.items())))
    print(f"  by chapter   : " + ", ".join(f"{k} {per_ch[k]}" for k in
                                           ("1", "2", "3", "4", "5", "MCQ", "OOS")))
    print(f"without answer : {no_ans}")
    print(f"cross-source repeats (ICAI reusing a question): {repeats}")
    if FIX:
        print(f"moved to appendix: {fixed}")
    print(f"\nerrors   : {len(errors)}")
    for e in errors[:40]:
        print("  ✗", e)
    if len(errors) > 40:
        print(f"  … and {len(errors) - 40} more")
    print(f"warnings : {len(warns)}")
    for w in warns[:25]:
        print("  !", w)
    if len(warns) > 25:
        print(f"  … and {len(warns) - 25} more")
    print(f"\ncoverage gaps vs SPEC §3 : {len(missing)}")
    for m in missing:
        print("  –", m)
    print(f"not published by ICAI (manifest-recorded): {len(explained)}")
    for m in explained:
        print("  ·", m)
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
