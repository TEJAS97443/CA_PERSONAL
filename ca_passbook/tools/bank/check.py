#!/usr/bin/env python3
"""Check one ICAI bank document file against the build's rules and against the PDF it cites (docs/ICAI_BANK.md §8, §9).

    python3 -I tools/bank/check.py bank/items/new/p4/n-p4-rtp-sep2026.md [--quiet] [--words]

1. The build's validation of this file alone (format, keys, provenance, tags, tables, maths, MCQ options and keys).
2. Numbers: every number in the transcription against the numbers in the PDF text of the pages it cites, as a multiset diff. Pages
   are grouped where blocks share them; inside a group a number present in the PDF but not in the transcription ("missing") or in the
   transcription but not in the PDF ("extra") is reported with its page and block. Running heads, footers and page numbers are left out
   (lines repeated on many pages, punctuation, spacing and a page number beside the text aside; in a compilation PDF also lines
   repeated on the pages the document spans; never "Question N"), and so are the marks lines, which are compared separately with the
   items' marks:. When a file numbers its pages only the page's own number is dropped, so a fraction's lone number on a first or last
   line stays. Question numbers (qno) count once per side where ICAI prints them (not when label: shows ICAI prints another number,
   'MCQ (i)'), and a past paper's MCQ answer-key table is matched by the MCQ numbers. ICAI's past-paper layout (Suggested Answers that
   print "Question N" once, before the question, and head the answer only "Answer") counts a question number once, where "Question N"
   stands, and each item's first question page must be under its own "Question N". A case's label: (ICAI's heading, "Case Scenario 1
   [MCQs 1-3]") counts on the case's pages, and again on the first answer page that prints the same heading; a part: number
   ('(c)(1)') where the question page prints it at a line start. Document furniture that no block reproduces is expected, not flagged: the title's paper number ("PAPER –
   4: COST AND …", when 4 is this document's paper), an MTP's header lines ("Mock Test Paper - Series I: July, 2026", "Date of
   Paper: …", "Time of Paper: …") and an answers file's reprint of "Time Allowed – 3 Hours" / "Maximum Marks – 100". A number the
   layout wraps across two lines, or whose grouping commas the PDF text spaces out ("₹ 6, 00, 000"), is paired with the
   transcription's whole number. An accept: number that no difference uses any more is listed (info: accept: …): take it out.
3. MCQ keys: an Answer that starts with an option letter must agree with key:.
4. Words (with --words, or when numbers are clean): each block's text against its pages as 3-word shingles; a block with under 80 %
   of its shingles in the PDF is listed (it may not be verbatim; tables count less, their cells are re-ordered by the layout). The
   PDF's ligature glyphs (ﬁ ﬂ ﬀ ﬃ ﬄ) are read as their letters on both sides.
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

NUM = re.compile(r"(?<!\d)(?<!\d\.)\d[\d,]*(?:\.\d+)?")     # after a decimal point never a new number; after 'Rs.' or 'No.' one ('Rs.1,70,000')
# subscript digits ('nP₀', 'P₁') and superscript digits after anything but a digit (a square, '(62,500 – 76,250)²', which the text
# layer prints '…)2'): read as digits, apart from what they follow; a superscript right after a digit (ICAI's footnote mark '500¹',
# a power '10²') runs into that number, as the text layer prints it ('5,001'); an equation's mathematical digits ('𝟒,𝟒𝟒𝟒' in a bold
# font) are ordinary digits in place
SUPERS = "\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079"
SMALL_DIGITS = re.compile(f"[\\u2080-\\u2089{SUPERS}]+")
GLUED_SUPER = re.compile(f"(?<=\\d)[{SUPERS}]+")
SMALL_MAP = {**{0x2080 + d: str(d) for d in range(10)}, **{ord(c): str(d) for d, c in enumerate(SUPERS)}}
MATH_DIGITS = {0x1D7CE + k: str(k % 10) for k in range(50)}
MARKS_N = re.compile(r"[(\[]\s*(\d+)\s*(?:MCQs?\s*)?[x×*]\s*(\d+)\s*(?:marks?\s+each\s*)?(?:marks?\s*)?(?:=\s*(\d+)\s*)?marks?\s*[)\]]", re.I)   # '(5 x 2 = 10 Marks)', also '(5 x 2 Marks)' (MTP Jan 2026 S1) and '(5 MCQs x 2 Marks each = 10 Marks)' (MTP May 2024 S2, Paper 5); old-scheme MTPs print square brackets, '[4 × 5 Marks = 20 Marks]' (old P3 MTP May 2023 S2)
MARKS_MN = re.compile(r"[(\[]\s*(\d+)\s*marks?\s*[x×*]\s*(\d+)\s*(?:=\s*\d+\s*marks?\s*)?[)\]]", re.I)   # marks first: '(5 Marks × 4 = 20 Marks)' (old P3 MTP Oct 2021 Series I, Q1): four 5-mark questions
MARKS_1 = re.compile(r"[(\[]\s*(\d+)\s*marks?\s*[)\]]", re.I)     # '(5 Marks)', and '[10 Marks]' (old-scheme MTPs)
MARKS_SUM = re.compile(r"[(\[]\s*(\d+(?:\s*\+\s*\d+)+)\s*(?:marks?\s*)?(?:=\s*(\d+)\s*)?marks?\s*[)\]]", re.I)   # '(2 + 3 = 5 Marks)', also '(1 + 3 Marks)': marks per requirement
TEX_CMD = re.compile(r"\\[a-zA-Z]+")
SPACED = re.compile(r"(?<![\d,])(?<!\d\.)\d{1,3}(?:(?:, ?| )\d{1,3})+(?!\d|,\d|\.\d)")     # '6, 00, 000', 'Rs.1 0,000': digit groups the text layer spaces
# ICAI's past-paper layout: the Suggested Answers print 'Question 3' on its own line before the question and head its answer with a
# bare 'Answer' line, so the question number is printed once, at the question
Q_HEAD = re.compile(r"(?m)^[ \t]*Question[ \t]+(\d{1,2})[ \t]*$")
A_HEAD = re.compile(r"(?m)^[ \t]*Answer[ \t]*$")
A_HEAD_N = re.compile(r"(?m)^[ \t]*Answer[ \t]+(\d{1,2})\b")
# document furniture (§9.3c): the paper title 'PAPER – 4: COST AND MANAGEMENT ACCOUNTING' / 'PAPER 6A : FINANCIAL MANAGEMENT' (its
# paper number), an MTP's header lines, and the 'Time Allowed' / 'Maximum Marks' line an answers file reprints from the question paper
TITLE = re.compile(r"^PAPER\s*[-–—−]?\s*(\d{1,2})\s*[AB]?\s*(?=[:\-–—−]|$)")
MTP_HEAD = re.compile(r"^(?:Mock\s+Test\s+Paper\s*(?:[-–—]\s*)?(?:Series\b|\d{1,2}\s*$)|Test\s+Series\s*:|Date\s+of\s+Paper\s*:|"
                      r"Time\s+of\s+Paper\s*:)", re.I)      # also the old scheme's 'MOCK TEST PAPER 1' and 'Test Series: September 2023'
SECTION_TITLE = re.compile(r"^(\d{1,2})\s*[AB]\s*:\s*[A-Z][A-Z &]+$")      # '8A: FINANCIAL MANAGEMENT', '6A: FINANCIAL MANAGEMENT'
TIME_MARKS = re.compile(r"^(?:Time\s+Allowed|Maximum\s+Marks)\s*[-–—:]", re.I)


def nums(text: str) -> list[str]:
    """the numbers of a text, normalised: Indian grouping commas dropped ('18,20,000' -> '1820000'), a trailing comma or point dropped"""
    t = TEX_CMD.sub(" ", (text or "").replace("{,}", ","))
    t = GLUED_SUPER.sub(lambda m: m.group(0).translate(SMALL_MAP), t.translate(MATH_DIGITS))
    t = SMALL_DIGITS.sub(lambda m: " " + m.group(0).translate(SMALL_MAP) + " ", t)
    out = []
    for m in NUM.finditer(t):
        s = m.group(0).rstrip(",.")
        s = s.replace(",", "")
        if s:
            out.append(s.lstrip("0") or "0" if "." not in s else s)
    return out


PART_LINE = re.compile(r"(?<!\()\bpart\s*[-–]?\s*(?:i{1,3}|iv|[1-4])\b|maximum\s+marks|total\s+marks", re.I)   # "PART I – … (30 Marks)", never "part of" nor a bracketed "(Part I)" ("Schedule III (Part I) … (5 Marks)")


def strip_marks(text: str, sums: list | None = None) -> tuple[str, list[int]]:
    """the text without '(5 Marks)' / '(5 x 2 = 10 Marks)' and the marks those lines give, one per question ((5 x 2) -> five 2s); a marks note
    on a line that names a Part or the maximum ('PART I - Case Scenario based MCQs (30 Marks)') is a total, never a question's marks.
    '(2 + 3 = 5 Marks)' (or '(1 + 3 Marks)', printed without its total) gives its parts (one per requirement, the items of a split
    question); each such line is also added to sums as (parts, total), since a question ICAI answers in one run is one item of the total
    (§9.3b)"""
    marks: list[int] = []
    out = []
    for line in (text or "").split("\n"):
        total = bool(PART_LINE.search(line))

        def plus(m):
            if not total:
                parts = [int(x) for x in re.findall(r"\d+", m.group(1))]
                marks.extend(parts)
                if sums is not None:
                    sums.append((parts, int(m.group(2)) if m.group(2) else sum(parts)))
            return " "

        def many(m):
            if not total:
                marks.extend([int(m.group(2))] * int(m.group(1)))
            return " "

        def one(m):
            if not total:
                marks.append(int(m.group(1)))
            return " "

        def many_mn(m):
            if not total:
                marks.extend([int(m.group(1))] * int(m.group(2)))
            return " "
        out.append(MARKS_1.sub(one, MARKS_N.sub(many, MARKS_MN.sub(many_mn, MARKS_SUM.sub(plus, line)))))
    return "\n".join(out), marks


def lone_number(ln: str) -> int | None:
    """the number of a line that holds only a page-number-like number ('12', '(12)', '12.', '- 12 -'), else None ('1,13,778' and
    '0.907' are not page numbers)"""
    m = re.fullmatch(r"[\s(\[\-–—]*(\d{1,4})[\s)\].\-–—]*", ln or "")
    return int(m.group(1)) if m else None


def page_numbers(texts: dict[int, str]) -> dict[int, set[int]]:
    """{page: the page numbers it may print} when the file numbers its pages: a number standing alone on one of a page's last 3 or
    first 2 lines, or set apart (3 spaces or more) at the start or end of one of them beside a running head ('35      COST AND
    MANAGEMENT ACCOUNTING'), minus the physical page, is an offset; every offset seen on 15 % of the pages (and 2 or more) is the
    file's numbering (a file of two parts may number them apart; a fraction's lone number near a foot is not). {} when no such
    sequence shows (then a lone last line is still taken for the page number)"""
    offs = collections.Counter()
    for p, t in texts.items():
        lines = [ln.strip() for ln in t.split("\n") if ln.strip()]
        got = set()
        for ln in lines[-3:] + lines[:2]:
            m = re.match(r"(\d{1,4})\s{3,}\D", ln) or re.search(r"\D\s{3,}(\d{1,4})$", ln)
            v = lone_number(ln) if lone_number(ln) is not None else (int(m.group(1)) if m else None)
            if v is not None:
                got.add(v - p)
        offs.update(got)
    valid = {o for o, k in offs.items() if k >= max(2, 0.15 * len(texts))}
    return {p: {p + o for o in valid} for p in texts} if valid else {}


def line_shape(ln: str, pn: set[int] | None = None) -> str:
    """a line's shape (digits as #, spaces collapsed); with pn, a page number (one of pn) that opens or closes a line holding text is left
    out, so a running head printed with the page number on odd pages and without it on even ones ('71   JANUARY 2025 EXAMINATION' /
    'JANUARY 2025 EXAMINATION', its number on the next line) is one shape"""
    s = ln.strip()
    if pn:
        m = re.fullmatch(r"(\d{1,4})\s+(\D.*)", s)
        if m and int(m.group(1)) in pn:
            s = m.group(2)
        m = re.fullmatch(r"(.*\D)\s+(\d{1,4})", s)
        if m and int(m.group(2)) in pn:
            s = m.group(1)
    return re.sub(r"\s+", " ", re.sub(r"\d+", "#", s)).strip()


def shape_key(shape: str) -> str:
    """a shape without its punctuation, case and 'and' / '&', so that a running head ICAI prints with small variations ('NOVEMBER,
    2023' on some pages, 'NOVEMBER 2023' on others; 'PAPER – 8 :' / 'PAPER 8:'; '… MANAGEMENT & STRATEGIC …' / '… MANAGEMENT AND
    STRATEGIC …') is one head; a shape of fewer than two words keeps its punctuation"""
    ws = [w.lower() for w in re.findall(r"[^\W\d_]+|#", shape) if w.lower() != "and"]
    return " ".join(ws) if sum(1 for w in ws if w != "#") >= 2 else shape


def heads(texts: dict[int, str]) -> set[str]:
    """running heads and footers: line shapes (digits as #, a page number beside the text left out, punctuation aside) found on at
    least 40 % of the pages (and 3 or more): the set holds each such shape as printed and its key (shape_key); a line holding only a
    marks note ('(5 Marks)' on its own line, on most pages of a short MTP question paper: MTP May 2025 S1, Paper 6A) is never a head,
    nor a line holding no letter"""
    pns = page_numbers(texts)
    seen = collections.Counter()
    forms = collections.defaultdict(set)
    for p, t in texts.items():
        keys = set()
        for ln in t.split("\n"):
            if ln.strip():
                sh = line_shape(ln, pns.get(p))
                keys.add(shape_key(sh))
                forms[shape_key(sh)].add(sh)
        seen.update(keys)
    n = len(texts)
    only_marks = lambda s: bool(re.fullmatch(r"(?:[(\[]\s*#[^()\[\]]*marks?\s*[)\]]\s*)+", s, re.I))    # noqa: E731
    out = set()
    for k, c in seen.items():
        # 'Question #' is ICAI's past-paper question heading (content, compared with the qno), never a running head, even in a short file
        # nor a line without a letter ('1,13,778', '0.907', '3.' on many pages are content; a page number goes by the sequence)
        if (c >= max(3, 0.4 * n) and k.lower() != "question #" and not any(only_marks(s) for s in forms[k])
                and re.search(r"[^\W\d_]", k)):
            out |= forms[k] | {k}
    return out


def clean_page(t: str, hd: set[str], pn: set[int] | None = None) -> str:
    """the page without its running heads and footers and its page number. pn (from page_numbers) is the page's possible printed
    numbers: then a lone number among the last 3 or first 2 lines left is dropped only when it is one of them (a page number on a line
    of its own, below or above a running foot), and any other lone number stays, first or last line alike (a stacked fraction: '8'
    over '45' opening P6 Sep 2025 p.10). Without pn only a lone last line is dropped. Never a lone number inside the page."""
    shape = lambda ln: line_shape(ln, pn)     # noqa: E731
    head = lambda ln: shape(ln) != "#" and (shape(ln) in hd or shape_key(shape(ln)) in hd)     # noqa: E731
    # the page-number shape "#" is a running foot on every page, but a lone number inside the page is content (a stacked fraction's
    # denominator): drop the other running heads and feet first, then the page number
    lines = [ln for ln in t.split("\n") if ln.strip() and not head(ln)]
    n = len(lines)
    cand = [k for k, ln in enumerate(lines) if pn and (k < 2 or k >= n - 3) and lone_number(ln) in pn]
    if cand:
        foot = [k for k in cand if k >= n - 3]
        drop = {foot[-1]} if foot else set(cand[:1])
    else:
        # the page shows no lone page number of the sequence: a lone last line is its page number, as ICAI prints it, unless the page
        # prints its number beside a running head ('48      COST AND …'), when that lone line is content
        raw = [ln for ln in t.split("\n") if ln.strip()]
        beside = pn and any(int(m.group(1)) in pn for ln in raw[:2] + raw[-3:]
                            for m in [re.match(r"\s*(\d{1,4})\s{3,}\D", ln) or re.search(r"\D\s{3,}(\d{1,4})\s*$", ln)] if m)
        drop = {n - 1} if lines and shape(lines[-1]) == "#" and not beside else set()
    return "\n".join(ln for k, ln in enumerate(lines) if k not in drop)


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


def pair_spaced(missing: collections.Counter, extra: collections.Counter, text: str) -> None:
    """a number the text layer breaks with spaces ('₹ 6, 00, 000' and '18, 000 units' in an equation object, 'Rs.1 0,000'; the rendered
    page reads 6,00,000 and 10,000) shows as pieces: pair an extra transcription number with the pieces of such a run (or of a stretch of
    it) in the group's PDF text, when the stretch without its spaces is that very number in Indian (…, 2-digit groups, a 3-digit last
    group) or international grouping (in place)"""
    grouped = re.compile(r"\d{1,2}(?:,\d{2})*,\d{3}|\d{1,3}(?:,\d{3})+")
    for m in SPACED.finditer(text or ""):
        run = m.group(0)
        cuts = [0] + [k + 1 for k, ch in enumerate(run) if ch == " "] + [len(run) + 1]     # piece starts after each space
        done = False
        for i in range(len(cuts) - 1):
            for j in range(len(cuts) - 1, i + 1, -1):
                part = run[cuts[i]:cuts[j] - 1].strip().rstrip(",")
                if " " not in part or not grouped.fullmatch(part.replace(" ", "")):
                    continue
                whole = part.replace(" ", "").replace(",", "").lstrip("0") or "0"
                pieces = collections.Counter(nums(part))
                if extra.get(whole, 0) > 0 and all(missing.get(x, 0) >= k for x, k in pieces.items()):
                    missing.subtract(pieces)
                    extra[whole] -= 1
                    done = True
                    break
            if done:
                break
    for c in (missing, extra):
        for k in [k for k, v in c.items() if v <= 0]:
            del c[k]


def question_heads(text: str) -> set[int]:
    """the question numbers a file prints only as 'Question N' before the question, its answers being headed by a bare 'Answer' line
    (ICAI's past-paper Suggested Answers): such a number is never printed at the answer. Empty for any other layout."""
    if not A_HEAD.search(text or ""):
        return set()
    return {int(m.group(1)) for m in Q_HEAD.finditer(text)} - {int(m.group(1)) for m in A_HEAD_N.finditer(text)}


def furniture(page: str, paper: int, answers_file: bool) -> list[tuple[str, list[str]]]:
    """[(text, its numbers)] for the furniture on a page (a layout line is cut into its columns first): the paper title gives its
    paper number only when it is this document's paper; an MTP's header lines all their numbers; 'Time Allowed – 3 Hours' and
    'Maximum Marks – 100' only in an answers file (in the question paper they are the Instructions, transcribed)"""
    out = []
    for ln in (page or "").split("\n"):
        for part in re.split(r"\s{3,}", ln.strip()):
            m = TITLE.match(part) or SECTION_TITLE.match(part)
            if m:
                if int(m.group(1)) == paper:
                    out.append((part, nums(m.group(1))))
            elif MTP_HEAD.match(part) or (answers_file and TIME_MARKS.match(part)):
                out.append((part, nums(part)))
    return out


def prints_line(page: str, phrase: str) -> bool:
    """the page prints the phrase on one line (its words in order, case and punctuation aside)"""
    want = words_of(phrase)
    if not want:
        return False
    for ln in (page or "").split("\n"):
        ws = words_of(ln)
        if any(ws[i:i + len(want)] == want for i in range(len(ws) - len(want) + 1)):
            return True
    return False


def letters_of(text: str) -> str:
    """the text's words without their digits, space-joined ('PAPER 6A: FINANCIAL' -> 'paper a financial')"""
    return " ".join(w for w in (re.sub(r"\d+", "", x) for x in words_of(text)) if w)


LIGATURES = str.maketrans({"ﬀ": "ff", "ﬁ": "fi", "ﬂ": "fl", "ﬃ": "ffi", "ﬄ": "ffl", "ﬅ": "st", "ﬆ": "st"})


def words_of(text: str) -> list[str]:
    """the words of a text for the WORDS check; the PDF text keeps ICAI's ligatures ('ﬁnancial'), which the transcription expands (§9.2)"""
    t = re.sub(r"\$[^$]*\$", " ", text or "")
    t = t.translate(LIGATURES).lower().replace("₹", " ")
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
    file_texts: dict[str, dict[int, str]] = {}

    def texts_of(f: str) -> dict[int, str]:
        if f not in file_texts:
            fp, fe, _ = seg.resolve(f)
            file_texts[f] = seg.page_texts(fp, fe, list(range(1, seg.page_count(fp, fe) + 1)))
        return file_texts[f]
    blocks = []      # (name, side, pages, text, qnos)
    for c in r["cases"].values():
        blocks.append((f"case {c['key']}", "q", c["q"], c["stem"], []))
        if c["answer"]:
            blocks.append((f"case {c['key']} answer", "a", c["a"], c["answer"], []))
        # the case's heading (label:, ICAI's 'Case Scenario 1 [MCQs 1-3]'): its numbers are printed above the case, and again on the
        # first of the case's answer pages that prints the same heading (an MTP's answers file)
        lab = nums(c["label"] or "")
        if re.fullmatch(r"\d+", str(c.get("qno") or "")) and str(int(c["qno"])) in lab:
            lab.remove(str(int(c["qno"])))     # 'Case Scenario 1' heading question 1: its number is the qno, counted below
        if lab and c["q"]:
            blocks.append((f"case {c['key']} label", "q", c["q"], "", lab))
            a_pg = sorted(set(bank_mod._pages(c["a"]) if c["a"] else []) |
                          {p for it in r["items"] if it["case"] == c["key"] and it["a"] for p in bank_mod._pages(it["a"])})
            if files.get("a") and a_pg:
                if files["a"] == files["q"]:
                    a_pg = [p for p in a_pg if p not in bank_mod._pages(c["q"])]
                hit = next((p for p in a_pg if prints_line(texts_of(files["a"]).get(p, ""), c["label"])), None)
                if hit:
                    blocks.append((f"case {c['key']} label (answer)", "a", str(hit), "", lab))
    if r["instructions"] and r["ipages"]:
        blocks.append(("instructions", "q", r["ipages"], r["instructions"], []))
    for it in r["items"]:
        qtext = it["text"] + "\n" + "\n".join(f"({k}) {v}" for k, v in (it["options"] or {}).items())
        blocks.append((f"item {it['key']}", "q", it["q"], qtext, []))
        if it["answer"]:
            blocks.append((f"item {it['key']} answer", "a", it["a"], it["answer"], []))
    # question numbers: once per side, where ICAI prints them (the first block of each qno on that side carries it)
    seen_q = set()
    # ICAI's past-paper layout ('Question N' before the question, a bare 'Answer' before the answer, both in the one Suggested
    # Answers file): the number is printed once, at the question
    q_once = question_heads("\n".join(texts_of(files["q"]).values())) if files.get("q") and files.get("a") == files["q"] else set()
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
            if it["label"] and not re.search(r"\d", it["label"]):
                continue          # ICAI prints no number for it (label: 'MCQ (i)'): the qno is ours, nothing to compare
            seen_q.add(kk)
            # a past paper's MCQ without an answer text is still numbered in the answer-key table on its a: page
            if side == "a" and not it["answer"] and it["type"] == "mcq" and not it["a"]:
                continue
            if kk[1] == "q" and it["qno"] in q_once:
                if side == "a":
                    continue
                # ... where 'Question N' stands: the heading may close the page before the question's first page
                p0 = bank_mod._pages(pg)[0]
                hp = max((p for p, t in texts_of(files["q"]).items() if p <= p0 and any(int(m.group(1)) == it["qno"] for m in
                                                                                       Q_HEAD.finditer(t))), default=None)
                if hp and hp != p0 and hp in {p for b in blocks if b[1] == "q" and b[2] for p in bank_mod._pages(b[2])}:
                    pg = str(hp)
            blocks.append((f"qno {it['qno']} ({'answer' if side == 'a' else 'question'})", side, pg, "", [str(it["qno"])]))
    # a part's own printed number ('(c)(1)', '(4)', '(A)1': ICAI's sub-part label, kept in part: and left out of the text, §9.3b)
    # counts where the PDF prints it at the start of a line of the item's first question page; on its first answer page, where an
    # answer may number its workings alike, the label only answers a number the PDF has and the transcription lacks (optional)
    optional = []      # (side, pages, number)
    for it in r["items"]:
        for side, txt in (("q", it["text"] or ""), ("a", it["answer"] or "")):
            if not files.get(side) or not it[side]:
                continue
            p0 = bank_mod._pages(it[side])[0]
            if side == "a" and files["a"] == files["q"] and p0 in bank_mod._pages(it["q"]):
                continue
            # ... or the sub-number of a label 'MCQ 1.4' (qno 1, ICAI's MCQ 4 of question 1, printed '4.' on a line of its own: optional)
            sub = re.fullmatch(r"\s*MCQ\s+(\d+)\.(\d+)\s*", it["label"] or "") if not it["part"] else None
            if sub and int(sub.group(1)) == it["qno"] and re.search(rf"(?m)^[ \t]*{sub.group(1)}\.{sub.group(2)}(?![\d.])",
                                                                    texts_of(files[side]).get(p0, "")):
                optional.append((side, p0, nums(f"{sub.group(1)}.{sub.group(2)}")[0]))     # printed '1.4' whole, read as a decimal
            for d in re.findall(r"\d+", it["part"] or "") or ([sub.group(2)] if sub and int(sub.group(1)) == it["qno"] else []):
                if re.match(rf"\s*(?:\*\*)?\(?{d}[).]", txt):
                    continue          # the transcription kept the label in the text
                if re.search(rf"(?m)^[ \t]*(?:\([A-Za-z]{{1,5}}\)[ \t]*)*\(?{d}[).](?!\d)", texts_of(files[side]).get(p0, "")):
                    if side == "q" and it["part"]:
                        blocks.append((f"item {it['key']} part", "q", str(p0), "", [d]))
                    else:      # an answer's label, or a label's sub-number (the page may print another question's '4.' alike)
                        optional.append((side, p0, d))
    # marks: what the items say, per side q
    item_marks = [it["marks"] for it in r["items"] if it["marks"] and not it["alt"]]
    # ---------------------------------------------------------------- the PDF pages
    bad = 0
    report = []
    need = collections.Counter()      # how many of each accepted number the report uses
    # an item ICAI numbers only in roman (label: 'MCQ (ii)'): its qno is ours and has no number to compare in the PDF, so it must at
    # least agree with the label
    for it in r["items"]:
        lm = re.search(r"\(([ivxl]+)\)", it["label"] or "", re.I) if it["label"] and not re.search(r"\d", it["label"]) else None
        if lm:
            val, prev = 0, 0
            for ch in reversed(lm.group(1).lower()):
                v = {"i": 1, "v": 5, "x": 10, "l": 50}[ch]
                val, prev = (val - v, prev) if v < prev else (val + v, v)
            if val != it["qno"]:
                report.append((False, f"item {it['key']}: qno {it['qno']}, but its label: '{it['label']}' numbers it {val}"))
                bad += 1
    if q_once:
        # that layout says which question a page belongs to: an item's question starts under the last 'Question N' before its first
        # page or under one printed on that page; its qno must be that N (the number is compared once only, so check where it sits)
        qt = texts_of(files["q"])
        hpos = sorted((p, m.start(), int(m.group(1))) for p, t in qt.items() for m in Q_HEAD.finditer(t) if int(m.group(1)) in q_once)
        for it in r["items"]:
            if it["key"].startswith("m") or not it["q"] or not hpos:
                continue
            p0 = bank_mod._pages(it["q"])[0]
            before = [n for p, _, n in hpos if p < p0]
            under = set(before[-1:]) | {n for p, _, n in hpos if p == p0}
            if under and it["qno"] not in under:
                report.append((False, f"item {it['key']}: qno {it['qno']}, but its first question page (p.{p0}) is under ICAI's "
                                      f"'Question {' / '.join(map(str, sorted(under)))}' (the qno or the q: pages are wrong)"))
                bad += 1
    marks_pdf: list[int] = []
    sums_pdf: list[tuple[list[int], int]] = []
    many_pdf: list[tuple[int, int]] = []      # the '(n x m = t Marks)' lines of the question pages, as (n, m)
    # Paper 6: a page that both section files cite (the FM / SM boundary, a shared MCQ answer key) also prints the other section's
    # marks lines; the other file's items whose question ends on that page account for them
    sib_marks: dict[int, collections.Counter] = collections.defaultdict(collections.Counter)
    sec = r["head"].get("section")
    sib = False
    if sec in ("fm", "sm") and path.name.endswith(f".{sec}.md"):
        other = path.with_name(path.name[: -len(f".{sec}.md")] + (".sm.md" if sec == "fm" else ".fm.md"))
        if other.exists():
            sib = True
            r2 = bank_mod.check_file(other, ROOT, syl, sources, True, [], [])
            if r2 and r2["head"].get("qfile") == files["q"]:
                for it in r2["items"]:
                    if it["marks"] and it["q"]:
                        sib_marks[bank_mod._pages(it["q"])[-1]][it["marks"]] += 1
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
        pnums = page_numbers(all_texts)
        mine = [b for b in blocks if b[1] in sides and b[2]]
        cited = sorted({p for b in mine for p in bank_mod._pages(b[2])})
        # a compilation (one paper on a few pages of a group's PDF): its own running heads may be on too few of the file's pages, so the
        # pages from the first to the last this document cites are read for heads (and page numbers) too
        if cited and 3 <= cited[-1] - cited[0] + 1 <= 0.5 * n:
            span = {p: all_texts.get(p, "") for p in range(cited[0], cited[-1] + 1)}
            hd = hd | {h for h in heads(span) if re.search(r"[^\W\d_]", h)}     # heads with words: a lone '(#)' stays the file's call
            sp_num = page_numbers(span)
            pnums = {p: pnums.get(p, set()) | sp_num.get(p, set()) for p in set(pnums) | set(sp_num)}
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
        q_cited = {p for b in mine if b[1] == "q" for p in bank_mod._pages(b[2])}
        page_nums = {}
        page_fur = {}
        page_txt = {}
        paper_no = int(r["paper"][1:])
        for p in cited:
            # Paper 6: a page this file cites for answers only (an MCQ answer key page that also prints the other section's MCQs,
            # e.g. May 2025, whose SM half is cited from the separate 6B PDF) holds marks lines of questions this file does not hold
            mq = "q" in sides and not (sib and p not in q_cited)
            t, mk = strip_marks(seg.rupee(clean_page(all_texts.get(p, ""), hd, pnums.get(p)))[0], sums_pdf if mq else None)
            page_nums[p] = nums(t)
            page_fur[p] = furniture(t, paper_no, f != files["q"])
            page_txt[p] = t
            if mq:
                if f == files["q"] and sib_marks.get(p):
                    mk = list((collections.Counter(mk) - sib_marks[p]).elements())
                marks_pdf.extend(mk)
                many_pdf.extend((int(x.group(1)), int(x.group(2))) for ln in all_texts.get(p, "").split("\n")
                                if not PART_LINE.search(ln) for x in MARKS_N.finditer(ln))
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
            # furniture no block of the group reproduces (its words, numbers aside, so that a reproduced title with a wrong number
            # is still compared): its numbers are expected in the PDF only
            tr_words = " " + " ".join(letters_of(b[3]) for b in mine if set(bank_mod._pages(b[2])) & gs) + " "
            for p in g:
                for part, ns in page_fur[p]:
                    if " " + letters_of(part) + " " not in tr_words:
                        pdf_c.subtract(ns)
            pdf_c = +pdf_c
            missing = pdf_c - tr_c
            extra = tr_c - pdf_c
            pair_spaced(missing, extra, "\n".join(page_txt[p] for p in g))
            pair_splits(missing, extra)
            for sd, p, x in optional:
                if sd in sides and p in gs and missing.get(x, 0) > 0:
                    missing[x] -= 1
            missing = +missing
            span = f"p.{g[0]}" if len(g) == 1 else f"pp.{g[0]}-{g[-1]}"
            for x, k in sorted(missing.items(), key=lambda kv: (len(kv[0]), kv[0])):
                pg = [p for p in g if x in page_nums[p]]
                ok = accepted[x] >= k
                if ok:
                    need[x] = max(need[x], k)
                report.append((ok, f"{Path(f).name} {span}: {fmt(x)} is in the PDF (p.{', '.join(map(str, pg))}) {k}x more than in the transcription"))
                bad += 0 if ok else 1
            for x, k in sorted(extra.items(), key=lambda kv: (len(kv[0]), kv[0])):
                ok = accepted[x] >= k
                if ok:
                    need[x] = max(need[x], k)
                report.append((ok, f"{Path(f).name} {span}: {fmt(x)} is in the transcription ({', '.join(sorted(set(where[x])))}) {k}x more than in the PDF"))
                bad += 0 if ok else 1
        uncited = [p for p in range(1, n + 1) if p not in cited and len(nums(clean_page(all_texts.get(p, ""), hd, pnums.get(p)))) > 3]
        if uncited and not quiet:
            print(f"info: {Path(f).name}: pages with numbers that no block cites: {compress(uncited)} (instructions, Hindi pages or something missed?)")
    # ---------------------------------------------------------------- marks and keys
    q_entry = seg.resolve(files["q"])[1] if files.get("q") else None
    if r["kind"] != "rtp" and not marks_pdf and item_marks and q_entry and q_entry.get("text") == "ocr":
        # a scanned question-paper booklet prints each question's marks as a bare number in the margin, never '(5 Marks)': there is
        # nothing to compare; the bare numbers show up as missing numbers (read them on the page images, accept them with a note)
        print("info: marks: the OCR text of this scan has no '(N Marks)' notes (the booklet prints marks as bare margin numbers): "
              "marks: not compared, check them on the page images")
    elif (r["kind"] != "rtp" and not marks_pdf and item_marks and r["head"].get("paperfile")
          and (seg.resolve(r["head"]["paperfile"])[1] or {}).get("text") == "ocr"):
        # Suggested Answers that print no '(N Marks)' note at all (May 2024 Paper 4): the marks are ICAI's, read from the question-paper
        # scan (paperfile), which prints them as bare margin numbers: nothing in the qfile to compare with (say the scan's pages in a note)
        print("info: marks: the qfile prints no '(N Marks)' notes; the items' marks come from the question-paper scan (paperfile), "
              "printed as bare margin numbers: marks: not compared, check them on the scan's page images")
    elif r["kind"] != "rtp":
        item_c = collections.Counter(item_marks)
        # an OR alternative's marks count once (item_marks leaves it out), but ICAI may print them beside the OR as well as beside
        # the question it replaces: a PDF marks line equal to an OR item's marks is that print, not a missing item
        alt_c = collections.Counter(it["marks"] for it in r["items"] if it["marks"] and it["alt"])
        # '(2 + 3 = 5 Marks)' is one item per requirement (its parts) or one item of the total (a question ICAI answers in one run,
        # or an OR of that total): each such line is read the way that leaves the fewest differences
        plain = collections.Counter(marks_pdf) - collections.Counter(x for parts, _ in sums_pdf for x in parts)

        def marks_diff(bits: int, base=None):
            pdf_c = collections.Counter(plain if base is None else base)
            for k, (parts, tot) in enumerate(sums_pdf):
                if bits >> k & 1:
                    pdf_c[tot] += 1
                else:
                    pdf_c.update(parts)
            dm = pdf_c - item_c - alt_c
            di = item_c - pdf_c
            return sum(dm.values()) + sum(di.values()), dm, di

        def best_diff(base=None):
            if len(sums_pdf) <= 12:
                return min((marks_diff(b, base) for b in range(1 << len(sums_pdf))), key=lambda x: x[0])
            bits = 0
            for k in range(len(sums_pdf)):
                if marks_diff(bits | 1 << k, base)[0] < marks_diff(bits, base)[0]:
                    bits |= 1 << k
            return marks_diff(bits, base)

        def settle(base, many):
            """the differences left once every reading rule below has had its say, for a base Counter and the (n, m) lines"""
            _, diff_m, diff_i = best_diff(base)
            # an MTP may print Part I's marks once, in its instruction ("All MCQs are compulsory and carry 2 Marks each"), and none
            # against each MCQ: MCQ items with exactly those marks are covered by that line
            if diff_i and files.get("q"):
                qp, qe, _ = seg.resolve(files["q"])
                qall = " ".join(seg.page_texts(qp, qe, list(range(1, seg.page_count(qp, qe) + 1))).values())
                each = re.search(r"carr(?:y|ies)\s+(\d+)\s+marks?\s+each", qall, re.I)     # ICAI also prints "carries 2 Marks each" (MTP May 2025 S2)
                if each:
                    n_each = int(each.group(1))
                    diff_i[n_each] -= min(diff_i[n_each], sum(1 for it in r["items"] if it["type"] == "mcq" and it["marks"] == n_each))
                    diff_i = +diff_i
                # "General MCQs (3 MCQs x 2 Marks each = 6 Marks)" (MTP May 2024 S1, Paper 5): covers that many MCQ items of those marks
                for mm in re.finditer(r"(\d+)\s+MCQs?\s*[x×*]\s*(\d+)\s+marks?\s+each", qall, re.I):
                    n_q, m_q = int(mm.group(1)), int(mm.group(2))
                    diff_i[m_q] -= min(diff_i[m_q], n_q, sum(1 for it in r["items"] if it["type"] == "mcq" and it["marks"] == m_q))
                    diff_i = +diff_i
            # a case of n MCQs may print each MCQ's own '(2 Marks)' and then the case's total once more, '(5 x 2 = 10 Marks)' (MTP Sep
            # 2026 Series II, Paper 6A): when the PDF has n more marks of m than the items and a case holds exactly n MCQ items of m marks,
            # that '(n x m = t Marks)' line is the repeated total, not n missing items
            for n_rep, m_rep in many:
                per_case = collections.Counter(it["case"] for it in r["items"] if it["case"] and it["type"] == "mcq" and it["marks"] == m_rep)
                if diff_m[m_rep] >= n_rep and n_rep in per_case.values():
                    diff_m[m_rep] -= n_rep
            diff_m = +diff_m
            # a question that asks for "any n" of its k parts prints '(n x m = t Marks)' once for its k items of m marks (old Paper 3 May
            # 2023 Q6 "Answer any four of the following" (a)-(e); old Paper 6 Nov 2023 Q1 "(Answer any seven)" of eight statements): when
            # the question pages of one question's items say "any n", its k - n items beyond the line's n are ICAI's choice, not extra items
            if diff_i and many and files.get("q"):
                qp, qe, _ = seg.resolve(files["q"])
                qt = seg.page_texts(qp, qe, list(range(1, seg.page_count(qp, qe) + 1)))
                word = {2: "two", 3: "three", 4: "four", 5: "five", 6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten"}
                used = set()
                for n_rep, m_rep in many:
                    by_q = collections.defaultdict(list)
                    for it in r["items"]:
                        if it["marks"] == m_rep and not it["alt"] and it["q"]:
                            by_q[it["qno"]].append(it)
                    for qno, its in by_q.items():
                        if qno in used or len(its) <= n_rep or not diff_i.get(m_rep):
                            continue
                        text = " ".join(qt.get(p, "") for p in sorted({p for it in its for p in bank_mod._pages(it["q"])}))
                        if re.search(rf"\bany\s+(?:{n_rep}|{word.get(n_rep, 'none')})\b", text, re.I):
                            diff_i[m_rep] -= min(diff_i[m_rep], len(its) - n_rep)
                            used.add(qno)
                            break
                diff_i = +diff_i
            return diff_m, diff_i
        diff_m, diff_i = settle(plain, many_pdf)
        # ICAI sometimes prints '(n x m = t Marks)' marks first: old Paper 6 Dec 2021 Q1 '(2 x 7 = 14 Marks)' for its seven 2-mark
        # statements (also old P6 Jul 2021, May 2022, Nov 2020, Nov 2019): a line with n != m is read the other way round (m questions
        # of n marks) when that, after all the rules above, leaves fewer differences
        for k, (n_x, m_x) in enumerate(many_pdf):
            left = sum(diff_m.values()) + sum(diff_i.values())
            if not left or n_x == m_x:
                continue
            flipped = plain - collections.Counter({m_x: n_x}) + collections.Counter({n_x: m_x})
            many_f = many_pdf[:k] + [(m_x, n_x)] + many_pdf[k + 1:]
            res_m, res_i = settle(flipped, many_f)
            if sum(res_m.values()) + sum(res_i.values()) < left:
                plain, many_pdf = flipped, many_f
                diff_m, diff_i = res_m, res_i
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
    spare = accepted - need
    if spare and not quiet:
        print("info: accept: " + ", ".join(fmt(x) for x in sorted(spare.elements(), key=lambda v: (len(v), v))) + " no longer "
              "match(es) any difference: take them out of the accept: lines (and their notes), or they could hide a real one")
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
                # the PDF's own text holds no $maths$: a '$' there is OCR noise ('31$ March' for 31st), never a delimiter to strip between
                pdf_sh = set(shingles(words_of(seg.rupee(" ".join(texts.get(p, "") for p in bank_mod._pages(b[2])))[0].replace("$", " "))))
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
