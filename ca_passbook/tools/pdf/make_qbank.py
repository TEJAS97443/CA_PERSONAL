#!/usr/bin/env python3
"""PassBook PDFs: the ICAI Question Bank of each paper, chapter-wise, phone (110 x 196 mm) and A4, from the built bank (run build.py first).

    .venv/bin/python -I tools/pdf/make_qbank.py                     all 8 PDFs into pdf/
    .venv/bin/python -I tools/pdf/make_qbank.py --papers sm --sizes phone
    options: --papers cma,aud,fm,sm   --sizes phone,a4   --keep (keep the HTML and pass PDFs; prints where)   --par N (Chrome tabs, default 3)

Writes "<Paper> - ICAI Question Bank (phone).pdf" and "... (A4).pdf". tools/pdf/qbank_html.js lays out the book (see its header for what is
ICAI's and what is PassBook's); printing, page-number passes, bookmarks and the checks are make_pdfs.py's (contents numbers = link targets =
outline, no blank pages, no text past the right margin). Exit status 1 if any check fails.
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import sys
import tempfile
import time
from pathlib import Path

import pymupdf

TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
import make_pdfs as mp  # noqa: E402

PAPERS = ["cma", "aud", "fm", "sm"]
SIZES = {"phone": "phone", "a4": "A4"}
KIND = "ICAI Question Bank"


def build(t: dict, pages: Path | None = None) -> dict:
    args = [str(TOOLS / "qbank_html.js"), t["paper"], t["size"], str(t["html"])] + ([str(pages)] if pages else [])
    return mp.node(*args)


def retitle(pdf: Path, outline: list[dict]) -> None:
    """finish() numbers every level 1-2 bookmark; the appendix entries keep their own titles ("A.1 ...")"""
    d = pymupdf.open(pdf)
    toc = d.get_toc(simple=False)
    k = 0
    for t, o in zip(toc, outline):
        if o.get("raw"):
            if o["level"] == 1:
                t[1] = mp.plain(o["title"])
            else:
                k += 1
                t[1] = f"A.{k} {mp.plain(o['title'])}"
    d.set_toc([x[:3] + ([x[3]] if len(x) > 3 and isinstance(x[3], dict) else []) for x in toc], collapse=1)
    tmp = pdf.with_suffix(".part.pdf")
    d.save(tmp, garbage=4, deflate=True, use_objstms=1)
    d.close()
    os.replace(tmp, pdf)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("--papers", default=",".join(PAPERS))
    ap.add_argument("--sizes", default=",".join(SIZES))
    ap.add_argument("--keep", action="store_true")
    ap.add_argument("--par", type=int, default=3)
    a = ap.parse_args()
    papers = [p for p in a.papers.split(",") if p]
    sizes = [s for s in a.sizes.split(",") if s]
    for p in papers:
        if p not in PAPERS:
            raise SystemExit(f"unknown paper {p} (one of {', '.join(PAPERS)})")
    for s in sizes:
        if s not in SIZES:
            raise SystemExit(f"unknown size {s} (one of {', '.join(SIZES)})")
    t0 = time.time()
    mp.OUT.mkdir(exist_ok=True)
    tmp = Path(tempfile.mkdtemp(prefix="pb-qbank-"))
    os.environ["PDF_DATE"] = time.strftime("%Y-%m-%d")
    targets = [{"key": f"{p}-{s}", "paper": p, "size": s, "kname": f"{KIND} ({SIZES[s]})"} for p in papers for s in sizes]
    for t in targets:
        t["html"] = tmp / f"{t['key']}.html"
        t["sum"] = build(t)

    def jobs(n: int, todo: list[dict]) -> list[dict]:
        return [dict(html=str(t["html"]), pdf=str(tmp / f"{t['key']}-{n}.pdf"), label=f"{t['sum']['label']} · {KIND}", **t["sum"]["size"]) for t in todo]

    res = mp.print_all(jobs(1, targets), tmp, a.par)
    print(f"pass 1: {len(targets)} PDFs in {time.time() - t0:.0f} s", flush=True)
    for t in targets:
        t["pages"] = mp.outline_pages(tmp / f"{t['key']}-1.pdf", t["sum"]["outline"])
        if not a.keep:
            (tmp / f"{t['key']}-1.pdf").unlink()
    todo = targets
    for n in (2, 3, 4):
        for t in todo:
            pj = tmp / f"{t['key']}-pages.json"
            pj.write_text(json.dumps(t["pages"]))
            t["sum"] = build(t, pj)
        res.update(mp.print_all(jobs(n, todo), tmp, a.par))
        moved = []
        for t in todo:
            t["final"] = tmp / f"{t['key']}-{n}.pdf"
            t["fit"] = res[str(t["final"])].get("fit") or {}
            again = mp.outline_pages(t["final"], t["sum"]["outline"])
            if again != t["pages"]:
                t["pages"] = again
                moved.append(t)
                if not a.keep:
                    t["final"].unlink()
        print(f"pass {n}: {len(todo)} PDFs, {len(moved)} moved, {time.time() - t0:.0f} s", flush=True)
        todo = moved
        if not todo:
            break
    if todo:
        raise SystemExit("page numbers did not settle: " + ", ".join(t["key"] for t in todo))
    report = []
    for t in targets:
        name = f"{t['sum']['label']} - {t['kname']}.pdf"
        dst = mp.OUT / name
        chk = mp.finish(t["final"], dst, t["sum"], KIND)
        retitle(dst, t["sum"]["outline"])
        if not a.keep:
            t["final"].unlink()
        fit = t["fit"]
        row = {"file": name, "pages": chk["pages"], "kb": dst.stat().st_size // 1024, "counts": t["sum"]["counts"],
               "problems": chk["problems"] + [f"still too wide: {x}" for x in fit.get("over", [])] + [f"fit error: {x}" for x in fit.get("errors", [])],
               "fit": {"tables as cards": fit.get("cards", 0), "tables zoomed": len(fit.get("zoomed", [])),
                       "smallest table zoom": min([int(z.split()[-1].rstrip("%")) for z in fit.get("zoomed", [])] or [100]),
                       "formulas zoomed": len(fit.get("maths", []))}}
        report.append(row)
        flag = "OK" if not row["problems"] else f"{len(row['problems'])} PROBLEM(S)"
        print(f"  {name}: {row['pages']} pages, {row['kb'] / 1024:.1f} MB  {flag}", flush=True)
        for pr in row["problems"][:10]:
            print(f"      {pr}")
    (tmp / "report.json").write_text(json.dumps(report, indent=1, ensure_ascii=False))
    if a.keep:
        print(f"kept the HTML, pass PDFs and report.json in {tmp}")
    else:
        shutil.rmtree(tmp, ignore_errors=True)
    print(json.dumps(report, ensure_ascii=False))
    print(f"done in {time.time() - t0:.0f} s -> {mp.OUT}")
    return 1 if any(r["problems"] for r in report) else 0


if __name__ == "__main__":
    sys.exit(main())
