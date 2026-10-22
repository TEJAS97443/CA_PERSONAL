#!/usr/bin/env python3
"""Re-join the layout's line breaks in sm-qbank's text where the PDF's own line geometry shows one paragraph (docs/ICAI_BANK.md §9.2, §10).

    python3 -I tools/bank/paras.py <bank file .sm.md | bank/sources.json file> [--show]   the printed lines the import matches against
                                                                                       (--show lists them: page, x, right edge / margin)

sm-qbank extracted some ICAI documents (most old-scheme MTPs) one PDF line per text line, so the bank showed one paragraph per printed
line. The words are ICAI's; only the layout broke them. A text line B continues the line A before it when, in the PDF (word boxes from
`pdftotext -bbox`):

  * A's last printed line and B's first printed line are consecutive body lines (running heads, footers and page numbers skipped), on
    the same page at the normal line pitch (a paragraph gap is a break), or A's line ends one page and B's line starts the next;
  * A's line was wrapped: B's first word would not have fitted after it before the right margin;
  * B's line has no label ("(ii)", "2.", "a.", a bullet) and starts at A's text column (an indented first line or an outdent is ICAI's
    paragraph break, so a paragraph whose first line is indented keeps that line's break: a missed join, never a wrong one);
  * neither line is a row of two columns (a comparison table set as text: a gap far wider than a justified line's spaces).

A mirror copy's diagonal watermark (short words in tall or very wide boxes) is dropped first. Nothing else is changed: the words, their order and the remaining breaks stay as sm-qbank extracted them.
"""
from __future__ import annotations

import collections
import re
import subprocess
import sys
import unicodedata
from pathlib import Path

LABEL_TOK = re.compile(r"^(?:\(?\d{1,2}[.)]|\(?[a-zA-Z][.)]|\((?:[a-zA-Z]|[ivxIVX]{1,5}|\d{1,2})\)|\(?[ivxIVX]{1,5}[.)]|[•●◆♦▪■➢►✓\-–]|[-])$")
# a label at the start of a text line: '(ii) ', '2. ', 'a) ', a bullet glyph (ICAI's Wingdings bullets extract as private-use glyphs)
LABEL_TXT = re.compile(r"^\s*(?:\(?\d{1,2}[.)]|\(?[a-zA-Z][.)]|\((?:[a-zA-Z]|[ivxIVX]{1,5}|\d{1,2})\)|\(?[ivxIVX]{1,5}[.)]|[•●◆♦▪■➢►✓\-–]|[-])\s+")
MARKS_TAIL = re.compile(r"^\(\s*\d+\s*(?:[x×]\s*\d+\s*=\s*\d+\s*)?marks?\s*\)$", re.I)


def norm(s: str) -> str:
    """letters and digits only, lower case, ligatures unfolded, '(5 Marks)' dropped: the key that matches a text line to a printed line"""
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"\\(.)", r"\1", s)
    s = re.sub(r"\(\s*\d+\s*(?:[x×]\s*\d+\s*=\s*\d+\s*)?marks?\s*\)", "", s, flags=re.I)
    return re.sub(r"[^a-z0-9]+", "", s.lower())


def strip_labels(s: str) -> str:
    for _ in range(3):
        m = LABEL_TXT.match(s)
        if not m:
            break
        s = s[m.end():]
    return s


class Line:
    __slots__ = ("pdf", "page", "idx", "x", "x1", "lab", "cw", "y", "pitch", "margin", "key", "first", "cols")

    def __repr__(self):
        return f"<p.{self.page} #{self.idx} x={self.x:.1f}-{self.x1:.1f}/{self.margin:.1f} lab={self.lab} {self.key[:30]}>"


def _words(pdf: Path) -> list[tuple[float, float, list]]:
    """[(page width, page height, [(x0, y0, x1, y1, text)])] from pdftotext -bbox"""
    r = subprocess.run(["pdftotext", "-bbox", str(pdf), "-"], capture_output=True, text=True)
    pages = []
    for pm in re.finditer(r'<page width="([\d.]+)" height="([\d.]+)">(.*?)</page>', r.stdout, re.S):
        ws = []
        for m in re.finditer(r'<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</word>', pm.group(3)):
            t = (m.group(5).replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"')
                 .replace("&apos;", "'").replace("&#39;", "'"))
            ws.append((float(m.group(1)), float(m.group(2)), float(m.group(3)), float(m.group(4)), t))
        # a mirror's diagonal watermark ('www.castudynotes.com' set in two-letter pieces down the page): short words in boxes much
        # taller than the body text's, which would otherwise sit inside the printed lines they cross
        hs = sorted(w[3] - w[1] for w in ws)
        cws = sorted((w[2] - w[0]) / len(w[4]) for w in ws if len(w[4]) >= 4)
        if hs and cws:
            med, mcw = hs[len(hs) // 2], cws[len(cws) // 2]
            ws = [w for w in ws if not (len(w[4]) <= 4 and (w[3] - w[1] > 1.35 * med or (w[2] - w[0]) / len(w[4]) > 3 * mcw))]
        pages.append((float(pm.group(1)), float(pm.group(2)), ws))
    return pages


def _visual_lines(ws: list) -> list[list]:
    """words grouped into printed lines (same baseline band), each sorted left to right"""
    ws = sorted(ws, key=lambda w: ((w[1] + w[3]) / 2, w[0]))
    lines: list[list] = []
    for w in ws:
        yc, h = (w[1] + w[3]) / 2, w[3] - w[1]
        if lines:
            L = lines[-1]
            lyc = sum((v[1] + v[3]) / 2 for v in L) / len(L)
            lh = min(v[3] - v[1] for v in L)
            if abs(yc - lyc) < 0.45 * min(h, lh):
                L.append(w)
                continue
        lines.append([w])
    for L in lines:
        L.sort(key=lambda w: w[0])
    return lines


class Geometry:
    """the printed lines of one or more PDFs, indexed by the end and the start of their text"""

    def __init__(self, pdfs: list[Path]):
        self.lines: list[Line] = []
        self.by_end: dict[str, list[Line]] = collections.defaultdict(list)
        for pdf in pdfs:
            self._add(pdf)

    def _add(self, pdf: Path):
        pages = _words(pdf)
        raw = []                                             # (page no, words of a printed line)
        for pno, (_, _, ws) in enumerate(pages, 1):
            for L in _visual_lines(ws):
                raw.append((pno, L))
        # running heads and footers: the same text on three or more pages (or on most pages of a short file)
        seen = collections.defaultdict(set)
        for pno, L in raw:
            seen[norm(" ".join(w[4] for w in L))].add(pno)
        rep = max(3, (len(pages) + 1) // 2) if len(pages) < 6 else 3
        body = []
        for pno, L in raw:
            k = norm(" ".join(w[4] for w in L))
            if not k or k.isdigit() or len(k) <= 3 or len(seen[k]) >= rep or "castudynotes" in k:
                continue
            body.append((pno, L))
        start = len(self.lines)
        per_page: dict[int, list[Line]] = collections.defaultdict(list)
        for pno, L in body:
            ws = list(L)
            # a far-right tail that is no part of the sentence: ICAI's marks note '(5 Marks)' / '(2 x 5 = 10 Marks)', or a watermark piece
            for n in (4, 3, 2, 1):
                if len(ws) > n and MARKS_TAIL.match(" ".join(w[4] for w in ws[-n:])) and ws[-n][0] - ws[-n - 1][2] > 12:
                    del ws[-n:]
                    break
            while len(ws) > 2 and ws[-1][0] - ws[-2][2] > 18 and len(ws[-1][4]) <= 3:
                ws.pop()
            i, lab = 0, False
            while i < len(ws) - 1 and i < 3 and (LABEL_TOK.match(ws[i][4]) or re.match(r"^\d{1,2}$", ws[i][4]) and ws[i + 1][0] - ws[i][2] > 8):
                lab, i = True, i + 1                         # '(a)', '2.', a bullet; a bare question number set apart ('5   (a)')
            text = " ".join(w[4] for w in ws[i:])
            ln = Line()
            ln.pdf, ln.page, ln.idx = str(pdf), pno, 0
            ln.x, ln.x1, ln.lab = ws[i][0], ws[-1][2], lab
            nch = sum(len(w[4]) for w in ws[i:]) + (len(ws) - i - 1)
            ln.cw = (ws[-1][2] - ws[i][0]) / max(1, nch)
            ln.y = min(w[1] for w in ws)
            ln.key = norm(text)
            ln.first = ws[i][4]
            # a row of two columns (a comparison table set as text): a gap far wider than a justified line's spaces
            ln.cols = any(b[0] - a[2] > max(15.0, 3.5 * ln.cw) for a, b in zip(ws[i:], ws[i + 1:]))
            per_page[pno].append(ln)
            self.lines.append(ln)
        for pno, ls in per_page.items():
            x1s = sorted(l.x1 for l in ls if len(l.key) >= 40)
            margin = x1s[int(len(x1s) * 0.9)] if len(x1s) > 4 else (x1s[-1] if x1s else 0)
            ys = sorted(l.y for l in ls)
            gaps = sorted(b - a for a, b in zip(ys, ys[1:]) if 4 < b - a < 30)
            pitch = gaps[len(gaps) // 3] if gaps else 12.0
            for l in ls:
                l.margin, l.pitch = margin, pitch
        for i in range(start, len(self.lines)):
            l = self.lines[i]
            l.idx = i
            if len(l.key) >= 8:
                self.by_end[l.key[-8:]].append(l)

    def last_line(self, text: str) -> list[Line]:
        """the printed lines a text line ends with"""
        k = norm(text)
        if len(k) < 8:
            return []
        return [l for l in self.by_end.get(k[-8:], []) if k.endswith(l.key)]

    def next_line(self, A: Line, text: str) -> "Line | None":
        """the printed line after A when the text line starts with it (its labels stripped)"""
        if A.idx + 1 >= len(self.lines):
            return None
        B = self.lines[A.idx + 1]
        k = norm(strip_labels(text))
        if B.pdf != A.pdf or not k or not B.key or not (k.startswith(B.key) or B.key.startswith(k)):
            return None
        return B

    def continues(self, A: Line, B: Line, w1: int) -> bool:
        if B.pdf != A.pdf or B.idx != A.idx + 1 or B.lab or A.cols or B.cols:
            return False
        if A.x1 + A.cw * (1 + w1) <= A.margin - 1.5:                 # A's line was not full: B's first word would have fitted
            return False
        if B.page == A.page:
            if not 0 < B.y - A.y < A.pitch * 1.2:                    # a paragraph gap (ICAI sets one at 1.25-1.5 lines)
                return False
        elif B.page != A.page + 1:
            return False
        return abs(B.x - A.x) < 3.0                                  # an indented or outdented line starts a paragraph


def joinable_text(a: str, b: str) -> bool:
    """text-level vetoes: tables, lists, headings and labelled lines are never joined"""
    if not a.strip() or not b.strip():
        return False
    if a.lstrip().startswith("|") or b.lstrip().startswith("|"):
        return False
    if LABEL_TXT.match(b) or re.match(r"^\s*(?:or|OR|Or)\s*$", b) or re.match(r"^\s*(?:or|OR|Or)\s*$", a):
        return False
    return True


def join2(a: str, b: str) -> str:
    a, b = a.rstrip(), b.lstrip()
    if re.search(r"[A-Za-z]-$", a) and not re.search(r"\s-$", a):       # 'long-' + 'term' -> 'long-term' (a hyphen at the line end)
        return a + b
    return a + " " + b


def rejoin(text: str, geo: "Geometry | None", log: list | None = None) -> str:
    """sm-qbank's extracted text with the layout's line breaks inside a printed paragraph re-joined (blank lines are kept)"""
    if not geo or not text or "\n" not in text:
        return text
    out: list[str] = []
    last_raw = ""                                   # the last extracted line itself (before any join)
    for ln in text.split("\n"):
        # sm-qbank leaves a blank line where a page ends in a text it extracted line by line: a paragraph that runs on to the next
        # page is joined across it (only there: in a text extracted paragraph by paragraph a blank line is ICAI's paragraph break)
        gap = len(out) >= 2 and not out[-1].strip() and out[-2].strip()
        prev = out[-2] if gap else out[-1] if out else ""
        if prev.strip() and ln.strip() and joinable_text(prev, ln):
            first = strip_labels(ln.strip()).split()
            w1 = len(unicodedata.normalize("NFKC", first[0])) if first else 0
            ok = any(B is not None and geo.continues(A, B, w1) and (not gap or B.page == A.page + 1 and norm(strip_labels(last_raw)) == A.key)
                     for A in geo.last_line(prev) for B in [geo.next_line(A, ln)])
            if ok:
                if log is not None:
                    log.append((prev[-60:], ln[:60]))
                if gap:
                    out.pop()
                out[-1] = join2(out[-1], ln)
                last_raw = ln
                continue
        out.append(ln)
        if ln.strip():
            last_raw = ln
    return "\n".join(out)


def main(argv: list[str]) -> int:
    import json
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    import seg
    root = Path(__file__).resolve().parents[2]
    S = json.loads((root / "bank" / "sources.json").read_text())["files"]
    target = argv[0]
    if target.endswith(".md"):
        head = dict(re.findall(r"(?m)^(qfile|afile): (.+)$", Path(target).read_text().split("\n---\n")[0]))
        files = list(dict.fromkeys(head.values()))
    else:
        files = [target]
    geo = Geometry([seg.path_of(f, S.get(f)) for f in files])
    print(f"{len(geo.lines)} printed lines in {', '.join(files)}")
    if "--show" in argv:
        for l in geo.lines:
            print(l)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
