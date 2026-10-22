#!/usr/bin/env python3
"""PassBook PDFs: phone-friendly (110 x 196 mm) and A4 PDFs of the lessons, generated from content/ so they stay in sync.

    .venv/bin/python -I tools/pdf/make_pdfs.py                    all 16 PDFs into pdf/ (6 to 10 minutes; about 0.6 GB of scratch)
    .venv/bin/python -I tools/pdf/make_pdfs.py --papers fm,sm --kinds notes,cards
    options: --papers cma,aud,fm,sm   --kinds notes,full-a4,full-phone,cards   --keep (keep the HTML and pass-1 PDFs; prints where)
             --par N (Chrome tabs printing at once, default 3)

Per paper (P4 cma, P5 aud, P6A fm, P6B sm):
    "<Paper> - Short Notes.pdf"            phone: per lesson the key idea, Formats and formulas, Answer frame, Common mistakes (title + fix), Recap
    "<Paper> - Full Lessons (A4).pdf"      the Exam view (every section except Under the hood), answers open, quiz + answer key per lesson
    "<Paper> - Full Lessons (phone).pdf"   the same on the phone page
    "<Paper> - Revision Cards.pdf"         phone: every flashcard by chapter, question then answer
How: tools/pdf/build_html.js renders the lessons with the app's renderer (md.js + KaTeX + the diagram kit) and stylesheets plus
tools/pdf/print.css; tools/pdf/print_pdf.js prints with the system's headless Chrome over the DevTools pipe after tools/pdf/fit.js has
fitted wide tables, formulas and figures. Two passes: the first print's outline gives each chapter's and lesson's page, the second print
fills them into the contents. Then PyMuPDF writes clean bookmark titles and the metadata, and the checks run (contents numbers = link
targets = outline, no blank pages, no text past the right margin); exit status 1 if any check fails. Needs node, Google Chrome
(CHROME=<path> to override) and PyMuPDF (the project's .venv). Nothing is fetched from the network.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

import pymupdf

TOOLS = Path(__file__).resolve().parent
ROOT = TOOLS.parents[1]
OUT = ROOT / "pdf"
PAPERS = ["cma", "aud", "fm", "sm"]
KINDS = {"notes": ("notes", "phone", "Short Notes"), "full-a4": ("full", "a4", "Full Lessons (A4)"),
         "full-phone": ("full", "phone", "Full Lessons (phone)"), "cards": ("cards", "phone", "Revision Cards")}


def node(*args: str) -> dict:
    r = subprocess.run(["node", *args], capture_output=True, text=True, cwd=ROOT)
    if r.returncode:
        raise SystemExit(f"node {' '.join(args)} failed:\n{r.stderr[-3000:]}")
    return json.loads(r.stdout.strip().splitlines()[-1])


def print_all(jobs: list[dict], tmp: Path, par: int) -> dict[str, dict]:
    jf = tmp / f"jobs-{int(time.time() * 1000)}.json"
    jf.write_text(json.dumps(jobs))
    env = dict(os.environ, PDF_PAR=str(par))
    r = subprocess.run(["node", str(TOOLS / "print_pdf.js"), str(jf)], capture_output=True, text=True, cwd=ROOT, env=env)
    res = {}
    for line in r.stdout.splitlines():
        try:
            d = json.loads(line)
        except ValueError:
            continue
        res[d["pdf"]] = d
    bad = [d for d in res.values() if d.get("error")] + [{"pdf": j["pdf"], "error": "no result"} for j in jobs if j["pdf"] not in res]
    if bad or r.returncode:
        raise SystemExit("printing failed:\n" + "\n".join(f"{b['pdf']}: {b.get('error')}" for b in bad) + "\n" + r.stderr[-2000:])
    return res


def outline_pages(pdf: Path, outline: list[dict]) -> dict[str, int]:
    """{chapter or lesson id: page} by matching the PDF's level 1-2 bookmarks (Chrome's, from the h1/h2) to the build's outline, in order"""
    with pymupdf.open(pdf) as d:
        toc = [t for t in d.get_toc() if t[0] <= 2]
    want = [o for o in outline if o["level"] <= 2]
    if len(toc) != len(want) or any(t[0] != o["level"] for t, o in zip(toc, want)):
        raise SystemExit(f"{pdf.name}: the PDF outline ({len(toc)} entries) does not match the build's ({len(want)})")
    return {o["id"]: t[2] for t, o in zip(toc, want)}


def plain(md: str) -> str:
    s = re.sub(r"\$([^$]+)\$", r"\1", md)
    s = re.sub(r"\*\*|__|`|==|~~", "", s)
    s = re.sub(r"\\([a-zA-Z]+)", r"\1", s)
    return re.sub(r"\s+", " ", s).strip()


def finish(src: Path, dst: Path, summary: dict, kind_name: str) -> dict:
    """clean bookmark titles (Chrome joins wrapped lines without a space), metadata, then the checks; returns the check report"""
    d = pymupdf.open(src)
    toc = d.get_toc(simple=False)
    out = summary["outline"]
    if len(toc) != len(out):
        raise SystemExit(f"{src.name}: {len(toc)} bookmarks for {len(out)} outline entries")
    no = {}
    new = []
    for t, o in zip(toc, out):
        title = plain(o["title"])
        if o["level"] == 1:
            no["c"] = no.get("c", 0) + 1
            no["l"] = 0
            title = f"{no['c']}. {title}"
        elif o["level"] == 2:
            no["l"] = no.get("l", 0) + 1
            title = f"{no['c']}.{no['l']} {title}"
        dest = dict(t[3]) if len(t) > 3 and isinstance(t[3], dict) else {}
        dest.pop("collapse", None)
        new.append([o["level"], title, t[2], dest] if dest else [o["level"], title, t[2]])
    d.set_toc(new, collapse=1)
    d.set_metadata({"title": f"{summary['label']} · {kind_name}", "author": "PassBook", "subject": f"ICAI CA Intermediate Group II · {kind_name}",
                    "keywords": "PassBook, CA Intermediate, Group II, January 2027", "creator": "PassBook tools/pdf (headless Chrome)",
                    "producer": d.metadata.get("producer") or ""})
    rep = check(d, summary)
    tmp = dst.with_suffix(".part.pdf")
    d.save(tmp, garbage=4, deflate=True, use_objstms=1)      # object streams: about 40 % smaller than Chrome's file
    d.close()
    os.replace(tmp, dst)
    return rep


def check(d: pymupdf.Document, summary: dict) -> dict:
    pages = {}
    level12 = [t for t in d.get_toc() if t[0] <= 2]
    want = [o for o in summary["outline"] if o["level"] <= 2]
    for t, o in zip(level12, want):
        pages[o["id"]] = t[2]
    problems: list[str] = []
    # the contents pages: every row is a link; the number printed at its right end must be where the link goes, and the outline's page
    first_ch = min(pages.values()) if pages else 2
    toc_rows = 0
    for pno in range(1, first_ch - 1):
        p = d[pno]
        for ln in p.get_links():
            if ln.get("kind") != pymupdf.LINK_GOTO and not ln.get("nameddest"):
                continue
            words = p.get_text("words", clip=ln["from"])
            if not words:
                continue
            num = words[-1][4]
            target = ln.get("page", -1) + 1
            toc_rows += 1
            if not num.isdigit() or int(num) != target:
                problems.append(f"contents p{pno + 1}: row says {num!r}, link goes to page {target}")
    if toc_rows != len(want):
        problems.append(f"contents: {toc_rows} linked rows for {len(want)} chapters and lessons")
    # blank pages (nothing but the footer) and text past the right margin (cut off on paper)
    W, H = d[0].rect.width, d[0].rect.height
    right = W - summary["size"]["ms"] * 72 / 25.4 + 1.5
    blank, cut = [], []
    for i, p in enumerate(d):
        words = p.get_text("words")
        txt = [w for w in words if w[1] < H - 28]
        if not txt and not [g for g in p.get_drawings() if g["rect"].y1 < H - 28] and not p.get_images():
            blank.append(i + 1)
        over = [w for w in words if w[2] > right and w[4].strip()]
        if over:
            cut.append(f"p{i + 1} {over[0][4][:20]!r} +{over[0][2] - right + 1.5:.1f}pt")
    if blank:
        problems.append(f"blank pages: {blank[:20]}")
    if cut:
        problems.append(f"text past the right margin on {len(cut)} page(s): {'; '.join(cut[:8])}")
    return {"pages": d.page_count, "contents_rows": toc_rows, "problems": problems, "page_of": pages}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--papers", default=",".join(PAPERS))
    ap.add_argument("--kinds", default=",".join(KINDS))
    ap.add_argument("--keep", action="store_true")
    ap.add_argument("--par", type=int, default=3)
    a = ap.parse_args()
    papers = [p for p in a.papers.split(",") if p]
    kinds = [k for k in a.kinds.split(",") if k]
    for p in papers:
        if p not in PAPERS:
            raise SystemExit(f"unknown paper {p} (one of {', '.join(PAPERS)})")
    for k in kinds:
        if k not in KINDS:
            raise SystemExit(f"unknown kind {k} (one of {', '.join(KINDS)})")
    t0 = time.time()
    OUT.mkdir(exist_ok=True)
    tmp = Path(tempfile.mkdtemp(prefix="pb-pdf-"))
    date = time.strftime("%Y-%m-%d")
    os.environ["PDF_DATE"] = date
    targets = []
    for p in papers:
        for k in kinds:
            kind, size, kname = KINDS[k]
            key = f"{p}-{k}"
            targets.append({"key": key, "paper": p, "kind": kind, "size": size, "kname": kname})
    # pass 1: contents numbers are placeholders (fixed-width slots, so pass 2 lays out the same)
    for t in targets:
        t["html"] = tmp / f"{t['key']}.html"
        t["sum"] = node(str(TOOLS / "build_html.js"), t["paper"], t["kind"], t["size"], str(t["html"]))
        if t["sum"]["missing"]:
            print(f"  note: {t['key']}: no lesson file for {', '.join(t['sum']['missing'])}")
    def jobs(n: int) -> list[dict]:
        return [dict(html=str(t["html"]), pdf=str(tmp / f"{t['key']}-{n}.pdf"), label=f"{t['sum']['label']} · {t['kname']}", **t["sum"]["size"])
                for t in targets]
    res = print_all(jobs(1), tmp, a.par)
    print(f"pass 1: {len(targets)} PDFs in {time.time() - t0:.0f} s")
    for t in targets:
        t["pages"] = outline_pages(tmp / f"{t['key']}-1.pdf", t["sum"]["outline"])
        if not a.keep:
            (tmp / f"{t['key']}-1.pdf").unlink()          # only its outline was needed (the disk is shared: keep the scratch small)
    # pass 2 (and 3 if a page moved): the real numbers
    todo = targets
    for n in (2, 3, 4):
        for t in todo:
            pj = tmp / f"{t['key']}-pages.json"
            pj.write_text(json.dumps(t["pages"]))
            t["sum"] = node(str(TOOLS / "build_html.js"), t["paper"], t["kind"], t["size"], str(t["html"]), str(pj))
        js = [j for j in jobs(n) if any(j["html"] == str(t["html"]) for t in todo)]
        res.update(print_all(js, tmp, a.par))
        moved = []
        for t in todo:
            t["final"] = tmp / f"{t['key']}-{n}.pdf"
            t["fit"] = res[str(t["final"])].get("fit") or {}
            again = outline_pages(t["final"], t["sum"]["outline"])
            if again != t["pages"]:
                t["pages"] = again
                moved.append(t)
                if not a.keep:
                    t["final"].unlink()
        print(f"pass {n}: {len(js)} PDFs, {len(moved)} moved, {time.time() - t0:.0f} s")
        todo = moved
        if not todo:
            break
    if todo:
        raise SystemExit("page numbers did not settle: " + ", ".join(t["key"] for t in todo))
    # finish: bookmarks, metadata, checks; write pdf/
    report = []
    for t in targets:
        name = f"{t['sum']['label']} - {t['kname']}.pdf"
        dst = OUT / name
        chk = finish(t["final"], dst, t["sum"], t["kname"])
        if not a.keep:
            t["final"].unlink()
        fit = t["fit"]
        row = {"file": name, "pages": chk["pages"], "kb": dst.stat().st_size // 1024, "lessons": t["sum"]["lessons"], "cards": t["sum"]["cards"],
               "problems": chk["problems"] + [f"still too wide: {x}" for x in fit.get("over", [])] + [f"fit error: {x}" for x in fit.get("errors", [])],
               "fit": {"figures redrawn": fit.get("relaid", 0), "figures under 75%": fit.get("scaled", []), "tables as cards": fit.get("cards", 0),
                       "tables zoomed": len(fit.get("zoomed", [])), "smallest table zoom": min([int(z.split()[-1].rstrip("%")) for z in fit.get("zoomed", [])] or [100]),
                       "formulas zoomed": len(fit.get("maths", [])), "smallest formula zoom": min([int(z.split()[-1].rstrip("%")) for z in fit.get("maths", [])] or [100])}}
        report.append(row)
        flag = "OK" if not row["problems"] else f"{len(row['problems'])} PROBLEM(S)"
        print(f"  {name}: {row['pages']} pages, {row['kb'] / 1024:.1f} MB  {flag}")
        for pr in row["problems"][:10]:
            print(f"      {pr}")
    (tmp / "report.json").write_text(json.dumps(report, indent=1, ensure_ascii=False))
    if a.keep:
        print(f"kept the HTML, pass PDFs and report.json in {tmp}")
    else:
        shutil.rmtree(tmp, ignore_errors=True)
    print(json.dumps(report, ensure_ascii=False))
    print(f"done in {time.time() - t0:.0f} s -> {OUT}")
    return 1 if any(r["problems"] for r in report) else 0


if __name__ == "__main__":
    sys.exit(main())
