#!/usr/bin/env python3
"""Check one ICAI bank document file against the build's rules and against the PDF it cites (docs/ICAI_BANK.md §8, §9).

    python3 -I tools/bank/check.py bank/items/new/p4/n-p4-rtp-sep2026.md [--quiet] [--words]

1. The build's validation of this file alone (format, keys, provenance, tags, tables, maths, MCQ options and keys).
2. Numbers: every number in the transcription against the numbers in the PDF text of the pages it cites, as a multiset diff. Pages
   are grouped where blocks share them; inside a group a number present in the PDF but not in the transcription ("missing") or in the
   transcription but not in the PDF ("extra") is reported with its page and block. Running heads, footers and page numbers are left out
   (lines repeated on many pages), and so are the marks lines, which are compared separately with the items' marks:. Question numbers
   (qno) count once per side where ICAI prints them, and a past paper's MCQ answer-key table is matched by the MCQ numbers.
3. MCQ keys: an Answer that starts with an option letter must agree with key:.
4. Words (with --words, or when numbers are clean): each block's text against its pages as 3-word shingles; a block with under 80 %
   of its shingles in the PDF is listed (it may not be verbatim; tables count less, their cells are re-ordered by the layout).
Exit status 0 when there are no errors (missing / extra numbers count as errors: fix the transcription, or accept a real ICAI oddity
with a 'note:' line and it is reported as accepted).
"""
from __future__ import annotations

import collections
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
sys.path.insert(0, str(ROOT / "tools" / "bank"))
import syllabus as syl_mod                 # noqa: E402
from buildlib import bank as bank_mod      # noqa: E402
import seg                                 # noqa: E402

NUM = re.compile(r"(?<![\d.])\d[\d,]*(?:\.\d+)?")
MARKS_N = re.compile(r"\(\s*(\d+)\s*[x×*]\s*(\d+)\s*=\s*(\d+)\s*marks?\s*\)", re.I)
MARKS_1 = re.compile(r"\(\s*(\d+)\s*marks?\s*\)", re.I)
TEX_CMD = re.compile(r"\\[a-zA-Z]+")


def nums(text: str) -> list[str]:
    """the numbers of a text, normalised: Indian grouping commas dropped ('18,20,000' -> '1820000'), a trailing comma or point dropped"""
    t = TEX_CMD.sub(" ", (text or "").replace("{,}", ","))
    out = []
    for m in NUM.finditer(t):
        s = m.group(0).rstrip(",.")
        s = s.replace(",", "")
        if s:
            out.append(s.lstrip("0") or "0" if "." not in s else s)
    return out


PART_LINE = re.compile(r"\bpart\s*[-–]?\s*(?:i{1,3}|iv|[1-4])\b|maximum\s+marks|total\s+marks", re.I)   # "PART I – … (30 Marks)", never "part of"


def strip_marks(text: str) -> tuple[str, list[int]]:
    """the text without '(5 Marks)' / '(5 x 2 = 10 Marks)' and the marks those lines give, one per question ((5 x 2) -> five 2s); a marks note
    on a line that names a Part or the maximum ('PART I - Case Scenario based MCQs (30 Marks)') is a total, never a question's marks"""
    marks: list[int] = []
    out = []
    for line in (text or "").split("\n"):
        total = bool(PART_LINE.search(line))

        def many(m):
            if not total:
                marks.extend([int(m.group(2))] * int(m.group(1)))
            return " "

        def one(m):
            if not total:
                marks.append(int(m.group(1)))
            return " "
        out.append(MARKS_1.sub(one, MARKS_N.sub(many, line)))
    return "\n".join(out), marks


def heads(texts: dict[int, str]) -> set[str]:
    """running heads and footers: line shapes (digits as #) found on at least 40 % of the pages (and 3 or more)"""
    seen = collections.Counter()
    for t in texts.values():
        shapes = {re.sub(r"\s+", " ", re.sub(r"\d+", "#", ln)).strip() for ln in t.split("\n") if ln.strip()}
        seen.update(shapes)
    n = len(texts)
    return {s for s, c in seen.items() if c >= max(3, 0.4 * n)}


def clean_page(t: str, hd: set[str]) -> str:
    """the page without its running heads and footers; a line holding only a number is dropped only as the page's first or last line
    (a page number), never inside the page, where it is usually a stacked fraction's denominator"""
    lines = [ln for ln in t.split("\n") if ln.strip()]
    out = []
    for k, ln in enumerate(lines):
        shape = re.sub(r"\s+", " ", re.sub(r"\d+", "#", ln)).strip()
        if shape in hd or (shape == "#" and (k == 0 or k == len(lines) - 1)):
            continue
        out.append(ln)
    return "\n".join(out)


def pair_splits(missing: collections.Counter, extra: collections.Counter) -> None:
    """a number the layout wrapped across two lines ('(150:100:4' / '0:20)') shows as two PDF numbers: pair an extra transcription number
    with two missing PDF pieces that concatenate to it (in place)"""
    for x in sorted(extra, key=len, reverse=True):
        while extra[x] > 0:
            hit = None
            for a in missing:
                if missing[a] > 0 and x.startswith(a) and len(a) < len(x):
                    b = x[len(a):]
                    if missing.get(b, 0) > (1 if b == a else 0) - 1 and missing.get(b, 0) > 0 and (b != a or missing[a] > 1):
                        hit = (a, b)
                        break
            if not hit:
                break
            missing[hit[0]] -= 1
            missing[hit[1]] -= 1
            extra[x] -= 1
    for c in (missing, extra):
        for k in [k for k, v in c.items() if v <= 0]:
            del c[k]


def words_of(text: str) -> list[str]:
    t = re.sub(r"\$[^$]*\$", " ", text or "")
    t = t.lower().replace("₹", " ")
    return re.findall(r"[a-z0-9]+", t)


def shingles(ws: list[str], k: int = 3) -> list[tuple]:
    return [tuple(ws[i:i + k]) for i in range(len(ws) - k + 1)]


def main(argv: list[str]) -> int:
    args = [a for a in argv if not a.startswith("--")]
    quiet, want_words = "--quiet" in argv, "--words" in argv
    if not args:
        print(__doc__)
        return 2
    path = Path(args[0]).resolve()
    syl = syl_mod.load()
    syl["subjects_by_id"] = {s["id"]: s for s in syl["subjects"]}
    errors: list[str] = []
    warnings: list[str] = []
    sources = bank_mod.load_sources(ROOT)
    r = bank_mod.check_file(path, ROOT, syl, sources, True, errors, warnings)
    rel = path.relative_to(ROOT).as_posix() if str(path).startswith(str(ROOT)) else str(path)
    for w in warnings:
        print("warning:", w)
    for e in errors:
        print("ERROR:", e)
    if r is None:
        print(f"{rel}: {len(errors)} format error(s); fix them first (numbers are compared once the file parses)")
        return 1
    # numbers a transcriber accepted (accept: lines, each explained in a note): ICAI's own oddities the PDF text does not show alike
    accepted = collections.Counter(nums(" ".join([r["head"].get("accept") or ""] + [it.get("accept") or "" for it in r["items"]] +
                                                 [c.get("accept") or "" for c in r["cases"].values()])))
    # ---------------------------------------------------------------- the transcription by (file, page group)
    files = {"q": r["head"].get("qfile"), "a": r["head"].get("afile")}
    blocks = []      # (name, side, pages, text, qnos)
    for c in r["cases"].values():
        blocks.append((f"case {c['key']}", "q", c["q"], c["stem"], []))
        if c["answer"]:
            blocks.append((f"case {c['key']} answer", "a", c["a"], c["answer"], []))
    if r["instructions"] and r["ipages"]:
        blocks.append(("instructions", "q", r["ipages"], r["instructions"], []))
    for it in r["items"]:
        qtext = it["text"] + "\n" + "\n".join(f"({k}) {v}" for k, v in (it["options"] or {}).items())
        blocks.append((f"item {it['key']}", "q", it["q"], qtext, []))
        if it["answer"]:
            blocks.append((f"item {it['key']} answer", "a", it["a"], it["answer"], []))
    # question numbers: once per side, where ICAI prints them (the first block of each qno on that side carries it)
    seen_q = set()
    for side in ("q", "a"):
        for it in r["items"]:
            case = r["cases"].get(it["case"]) if it["case"] else None
            # a case numbered like its items ('14.' before the case text) prints the number at the case; a past paper's case of MCQs
            # 1-5 prints each MCQ's own number
            on_case = side == "q" and case and str(case.get("qno")) == str(it["qno"])
            pg = (case or {}).get("q") if on_case else it[side] or ((case or {}).get(side) if case else None)
            if not pg:
                continue
            kk = (side, "m" if it["key"].startswith("m") else "q", it["qno"])
            if kk in seen_q:
                continue
            seen_q.add(kk)
            # a past paper's MCQ without an answer text is still numbered in the answer-key table on its a: page
            if side == "a" and not it["answer"] and it["type"] == "mcq" and not it["a"]:
                continue
            blocks.append((f"qno {it['qno']} ({'answer' if side == 'a' else 'question'})", side, pg, "", [str(it["qno"])]))
    # marks: what the items say, per side q
    item_marks = [it["marks"] for it in r["items"] if it["marks"] and not it["alt"]]
    # ---------------------------------------------------------------- the PDF pages
    bad = 0
    report = []
    marks_pdf: list[int] = []
    for side, f in files.items():
        if not f:
            continue
        if side == "a" and f == files["q"]:
            continue          # an RTP: one file holds both sides
        sides = ("q", "a") if f == files.get("a") and f == files.get("q") else (side,)
        pdf, entry, _ = seg.resolve(f)
        n = seg.page_count(pdf, entry)
        all_texts = seg.page_texts(pdf, entry, list(range(1, n + 1)))
        hd = heads(all_texts)
        mine = [b for b in blocks if b[1] in sides and b[2]]
        cited = sorted({p for b in mine for p in bank_mod._pages(b[2])})
        # page groups: pages joined by the blocks that span them
        parent = {p: p for p in cited}

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x
        for b in mine:
            ps = bank_mod._pages(b[2])
            for p in ps[1:]:
                parent[find(p)] = find(ps[0])
        groups = collections.defaultdict(list)
        for p in cited:
            groups[find(p)].append(p)
        page_nums = {}
        for p in cited:
            t, mk = strip_marks(seg.rupee(clean_page(all_texts.get(p, ""), hd))[0])
            page_nums[p] = nums(t)
            if "q" in sides:
                marks_pdf.extend(mk)
        for g in sorted(groups.values()):
            gs = set(g)
            pdf_c = collections.Counter(x for p in g for x in page_nums[p])
            tr_c = collections.Counter()
            where = collections.defaultdict(list)
            for b in mine:
                if set(bank_mod._pages(b[2])) & gs:
                    t, _ = strip_marks(b[3])
                    for x in nums(t) + b[4]:
                        tr_c[x] += 1
                        where[x].append(b[0])
            missing = pdf_c - tr_c
            extra = tr_c - pdf_c
            pair_splits(missing, extra)
            span = f"p.{g[0]}" if len(g) == 1 else f"pp.{g[0]}-{g[-1]}"
            for x, k in sorted(missing.items(), key=lambda kv: (len(kv[0]), kv[0])):
                pg = [p for p in g if x in page_nums[p]]
                ok = accepted[x] >= k
                report.append((ok, f"{Path(f).name} {span}: {fmt(x)} is in the PDF (p.{', '.join(map(str, pg))}) {k}x more than in the transcription"))
                bad += 0 if ok else 1
            for x, k in sorted(extra.items(), key=lambda kv: (len(kv[0]), kv[0])):
                ok = accepted[x] >= k
                report.append((ok, f"{Path(f).name} {span}: {fmt(x)} is in the transcription ({', '.join(sorted(set(where[x])))}) {k}x more than in the PDF"))
                bad += 0 if ok else 1
        uncited = [p for p in range(1, n + 1) if p not in cited and len(nums(clean_page(all_texts.get(p, ""), hd))) > 3]
        if uncited and not quiet:
            print(f"info: {Path(f).name}: pages with numbers that no block cites: {compress(uncited)} (instructions, Hindi pages or something missed?)")
    # ---------------------------------------------------------------- marks and keys
    if r["kind"] != "rtp":
        diff_m = collections.Counter(marks_pdf) - collections.Counter(item_marks)
        diff_i = collections.Counter(item_marks) - collections.Counter(marks_pdf)
        if diff_m or diff_i:
            report.append((False, f"marks: the PDF's marks lines give {sorted(marks_pdf)} but the items' marks: give {sorted(item_marks)} "
                                  f"(PDF only: {dict(diff_m)}, items only: {dict(diff_i)})"))
            bad += 1
    for it in r["items"]:
        if it["type"] == "mcq" and it["answer"]:
            m = re.match(r"^\s*(?:\*\*)?\(?([A-Da-d])\)", it["answer"])
            if m and it["key_raw"] and re.fullmatch(r"[A-D]", it["key_raw"]) and m.group(1).upper() != it["key_raw"]:
                report.append((False, f"item {it['key']}: key: {it['key_raw']} but its Answer starts with ({m.group(1).upper()})"))
                bad += 1
    for ok, line in report:
        if not quiet or not ok:
            print(("accepted: " if ok else "NUMBERS: ") + line)
    # ---------------------------------------------------------------- words
    if want_words or not bad:
        low = []
        for side, f in files.items():
            if not f or (side == "a" and f == files["q"]):
                continue
            sides = ("q", "a") if f == files.get("a") and f == files.get("q") else (side,)
            pdf, entry, _ = seg.resolve(f)
            n = seg.page_count(pdf, entry)
            texts = seg.page_texts(pdf, entry, list(range(1, n + 1)))
            for b in blocks:
                if b[1] not in sides or not b[2] or not b[3].strip():
                    continue
                # word runs inside each paragraph (never across a table, a blank line or a formula), so layout alone costs nothing
                paras = [p for chunk in re.split(r"\n\s*\n", b[3]) for p in re.split(r"(?m)^\s*\|.*$", chunk)]
                sh = [x for para in paras if len(words_of(para)) >= 6 for x in shingles(words_of(para))]
                if len(sh) < 12:
                    continue
                pdf_sh = set(shingles(words_of(seg.rupee(" ".join(texts.get(p, "") for p in bank_mod._pages(b[2])))[0])))
                hit = sum(1 for s in sh if s in pdf_sh) / len(sh)
                if hit < 0.8:
                    low.append(f"{b[0]} ({int(hit * 100)} % of its word runs are on its pages {b[2]})")
        for x in low:
            print("WORDS: " + x)
        if low:
            print(f"{len(low)} block(s) to re-read against the PDF (a low share means words differ, are missing or the pages are wrong)")
    n_items = len(r["items"])
    print(f"{rel}: {n_items} items, {len(r['cases'])} cases, status {r['status']} | {len(errors)} errors, {bad} number problem(s)")
    return 1 if errors or bad else 0


def fmt(x: str) -> str:
    if "." in x or len(x) <= 3:
        return x
    s = x[-3:]
    rest = x[:-3]
    while rest:
        s = rest[-2:] + "," + s
        rest = rest[:-2]
    return s


def compress(ps: list[int]) -> str:
    out, i = [], 0
    while i < len(ps):
        j = i
        while j + 1 < len(ps) and ps[j + 1] == ps[j] + 1:
            j += 1
        out.append(str(ps[i]) if i == j else f"{ps[i]}-{ps[j]}")
        i = j + 1
    return ", ".join(out)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
