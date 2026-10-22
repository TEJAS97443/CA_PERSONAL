#!/usr/bin/env python3
"""The transcription plan: every ICAI document of the manifest, its estimated item count, and batches of about 45 minutes of work
(docs/ICAI_BANK.md §11).

    python3 -I tools/bank/plan.py [--out ~/CA_PERSONAL/ca_prompts/bank_batches.json] [--minutes 45] [--list]

One document = the manifest files of one (scheme, paper, kind, attempt, series): an RTP's qa file, an MTP's q + a files, a past paper's
question-paper scan + Suggested Answers. Paper 6 (new scheme) is planned for its 6A Financial Management part only: its 6B Strategic
Management part comes from the SM import (tools/bank/smimport.py). Documents already in bank/items (any status but draft) are left out.

The item estimate reads the PDF text: ICAI's marks lines ("(5 Marks)", "(5 x 2 = 10 Marks)": one item each) in the pages of the part
being planned, plus the MCQs a past paper's Suggested Answers print without marks (lines of a fourth option '(d) …' after a '(c) …'), and
for an RTP (no marks at all) the question numbers it prints times 1.7 (the pilot: 16 questions, 28 items). For Paper 6 the SM import's
file gives the 6B part's real item count (left out of the estimate) and its first page (an RTP's 6A part ends there). Minutes = items x 1.5 for the numeric papers (Costing, FM: tables and working
notes), x 0.9 for Audit, plus 0.3 a page and 8 for the document's setup and check.py; a batch holds whole documents (one document is
never split between two people) up to the target, newest attempts and the new scheme first.
"""
from __future__ import annotations

import collections
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
sys.path.insert(0, str(ROOT / "tools" / "bank"))
from buildlib import bank as bank_mod      # noqa: E402
import seg                                 # noqa: E402

MARKS_N = re.compile(r"\(\s*(\d+)\s*[x×*]\s*(\d+)\s*=\s*\d+\s*marks?\s*\)", re.I)
MARKS_1 = re.compile(r"\(\s*\d+(?:\s*\+\s*\d+)*(?:\s*=\s*\d+)?\s*marks?\s*\)", re.I)
TOTAL = re.compile(r"\bpart\s*[-–]?\s*(?:i{1,3}|[12])\b|maximum\s+marks|total\s+marks", re.I)
QNUM = re.compile(r"^\s{0,10}(?:question\s+)?(\d{1,2})[.)]?\s{1,6}(?:\(?[a-z]\)\s*)?[A-Z(‘'\"]", re.M)
SM_HEAD = re.compile(r"(?m)^\s*(?:paper\s*[-–]?\s*6b|section\s*[-–]?\s*b\s*[:–-]?\s*strategic|6b\s*[:–-]\s*strategic|strategic\s+management\s*$)", re.I)
ECO_HEAD = re.compile(r"(?m)^\s*(?:section\s*[-–]?\s*b\b.*economics|.*economics\s+for\s+finance\s*$)", re.I)
ANS_HEAD = re.compile(r"(?m)^\s*(?:suggested\s+answers?(?:\s*/\s*hints)?|answers?\s*$)", re.I)
NUMERIC = {("new", "p4"), ("new", "p6"), ("old", "p3"), ("old", "p8")}
PAPER_NAME = {("new", "p4"): "P4 Cost and Management Accounting", ("new", "p5"): "P5 Auditing and Ethics", ("new", "p6"): "P6A Financial Management",
              ("old", "p3"): "old P3 Cost and Management Accounting", ("old", "p6"): "old P6 Auditing and Assurance",
              ("old", "p8"): "old P8A Financial Management"}


def docs_of(S: dict) -> dict:
    out = collections.defaultdict(dict)
    for f, e in S.items():
        if e.get("origin") == "sm-qbank" or (e.get("scheme"), e.get("paper")) not in PAPER_NAME:
            continue
        sid = "n" if e["scheme"] == "new" else "o"
        doc = f"{sid}-{e['paper']}-{e['kind']}-{e['attempt']}" + (f"-{e['series']}" if e.get("series") else "")
        out[doc][e.get("part") or "qa"] = f
    return out


def scope_pages(texts: dict[int, str], scheme: str, paper: str) -> list[int]:
    """the pages of the part being planned: Paper 6 before its 6B section; old Paper 8 before its Economics section"""
    ps = sorted(texts)
    cut = None
    if (scheme, paper) == ("new", "p6"):
        cut = next((p for p in ps if p > 1 and SM_HEAD.search(texts[p])), None)
    elif (scheme, paper) == ("old", "p8"):
        cut = next((p for p in ps if p > 1 and ECO_HEAD.search(texts[p])), None)
    return [p for p in ps if cut is None or p < cut]


def count_items(texts: dict[int, str], pages: list[int], kind: str) -> tuple[int, str]:
    marks, mcq, qnos = 0, 0, set()
    for p in pages:
        lines = texts[p].split("\n")
        for k, ln in enumerate(lines):
            if TOTAL.search(ln):
                continue
            mn = MARKS_N.search(ln)
            if mn:
                marks += int(mn.group(1))
            elif MARKS_1.search(ln):
                marks += 1
            if re.match(r"^\s*\(d\)\s+\S", ln) and not MARKS_1.search(ln) and any(re.match(r"^\s*\(c\)\s+\S", x) for x in lines[max(0, k - 4):k]):
                mcq += 1
        qnos.update(int(m.group(1)) for m in QNUM.finditer(texts[p]) if 1 <= int(m.group(1)) <= 40)
    if kind == "rtp" or marks < 3:
        n = round(len(qnos) * 1.7)
        return max(n, 1), f"{len(qnos)} question numbers x 1.7"
    return marks + (mcq if kind == "pyq" else 0), f"{marks} marks lines" + (f" + {mcq} MCQs without marks" if kind == "pyq" and mcq else "")


def sm_part(doc: str) -> tuple[int, int | None]:
    """(items, first page) of the SM import's file for a Paper 6 document: the 6B part, to leave out of the 6A estimate"""
    f = ROOT / "bank" / "items" / "new" / "p6" / f"{doc}.sm.md"
    if not f.exists():
        return 0, None
    t = f.read_text()
    items = len(re.findall(r"(?m)^item:\s", t))
    pages = [int(x) for x in re.findall(r"(?m)^q:\s*(\d+)", t)]
    return items, (min(pages) if pages else None)


def main(argv: list[str]) -> int:
    out = Path(argv[argv.index("--out") + 1]).expanduser() if "--out" in argv else Path.home() / "CA_PERSONAL/ca_prompts" / "bank_batches.json"
    target = int(argv[argv.index("--minutes") + 1]) if "--minutes" in argv else 45
    S = bank_mod.load_sources(ROOT)
    done = set()
    for f in (ROOT / "bank" / "items").rglob("*.md"):
        head = f.read_text().split("\n---", 2)
        txt = f.read_text()
        st = re.search(r"(?m)^status:\s*(\S+)", txt)
        sec = f.name.split(".")[1] if f.name.count(".") == 2 else None
        if st and st.group(1) != "draft" and sec != "sm":
            done.add(f.name.split(".")[0])
    plan = []
    for doc, parts in sorted(docs_of(S).items()):
        if doc in done:
            continue
        m = bank_mod.DOC_ID.match(doc)
        scheme, paper, kind = bank_mod.SCHEMES[m.group("s")], m.group("paper"), m.group("kind")
        textfile = parts.get("qa") or (parts.get("a") or parts.get("a-6a") if kind == "pyq" else parts.get("q")) or next(iter(parts.values()))
        e = S[textfile]
        try:
            pdf = seg.path_of(textfile, e)
            n = seg.page_count(pdf, e)
            texts = {p: seg.rupee(t)[0] for p, t in seg.page_texts(pdf, e, list(range(1, n + 1))).items()}
        except SystemExit:
            texts, n = {}, e.get("pages") or 0
        pages = scope_pages(texts, scheme, paper) if texts else []
        sm_n, sm_p = sm_part(doc) if (scheme, paper) == ("new", "p6") else (0, None)
        if sm_n and kind == "rtp" and sm_p:
            pages = [p for p in sorted(texts) if p < sm_p]            # an RTP prints 6A (questions, answers), then 6B
        elif sm_n:
            pages = sorted(texts)                                     # the whole paper, less the SM import's real count
        if kind == "rtp" and texts:
            # an RTP prints its questions first, then the answers: number the question pages only
            ans = next((p for p in pages if p > 2 and ANS_HEAD.search(texts[p])), None)
            qpages = [p for p in pages if ans is None or p < ans]
            items, how = count_items(texts, qpages, kind)
        else:
            items, how = count_items(texts, pages, kind) if texts else (0, "no text")
            if sm_n:
                items, how = max(1, items - sm_n), how + f" - {sm_n} SM items imported"
                if items < 0.6 * sm_n:
                    # the Suggested Answers print no marks for some Part I MCQs: the 6A half is about the size of the 6B half
                    items, how = sm_n, how + f"; set to the 6B half's {sm_n}"
        npages = sum(S[f].get("pages") or 0 for f in parts.values())
        if (scheme, paper) == ("new", "p6"):
            npages = round(npages * len(pages) / max(1, n)) if texts else npages // 2
        rate = 1.5 if (scheme, paper) in NUMERIC else 0.9
        minutes = round(items * rate + npages * 0.3 + 8)
        att = m.group("attempt")
        plan.append({"doc": doc, "files": sorted(parts.values()), "scheme": scheme, "paper": paper, "kind": kind, "attempt": att,
                     "part": "6A FM only" if (scheme, paper) == ("new", "p6") else "Section A FM only" if (scheme, paper) == ("old", "p8") else None,
                     "est_items": items, "how": how, "pages": npages, "est_minutes": minutes,
                     "ord": (0 if scheme == "new" else 1, {"pyq": 0, "mtp": 1, "rtp": 2}[kind], -int(att[3:]), -bank_mod.MONTHS[att[:3]], doc)})
    plan.sort(key=lambda d: d["ord"])
    batches, cur, mins = [], [], 0
    for d in plan:
        if cur and mins + d["est_minutes"] > target * 1.15:
            batches.append(cur)
            cur, mins = [], 0
        cur.append(d)
        mins += d["est_minutes"]
    if cur:
        batches.append(cur)
    res = []
    for i, b in enumerate(batches, 1):
        res.append({"id": f"t-{i:02d}", "docs": [f for d in b for f in d["files"]], "bank_docs": [d["doc"] for d in b],
                    "est_items": sum(d["est_items"] for d in b), "est_minutes": sum(d["est_minutes"] for d in b),
                    "papers": sorted({PAPER_NAME[(d["scheme"], d["paper"])] for d in b}),
                    "note": "; ".join(f"{d['doc']}: {d['est_items']} items ({d['how']})" + (f", {d['part']}" if d["part"] else "") for d in b)})
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(res, indent=1, ensure_ascii=False) + "\n")
    if "--list" in argv:
        for d in plan:
            print(f"{d['doc']:24s} {d['est_items']:4d} items {d['pages']:4d} pp {d['est_minutes']:4d} min  {d['how']}")
    by = collections.Counter()
    for d in plan:
        by[PAPER_NAME[(d["scheme"], d["paper"])]] += d["est_items"]
    print(f"{len(plan)} documents to transcribe, about {sum(d['est_items'] for d in plan):,} items and "
          f"{sum(d['est_minutes'] for d in plan) / 60:.0f} hours, in {len(res)} batches of about {target} minutes -> {out}")
    for k, v in sorted(by.items()):
        print(f"  {k}: about {v:,} items")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
