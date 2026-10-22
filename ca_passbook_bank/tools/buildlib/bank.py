"""The ICAI question bank: bank/items/<scheme>/<paper>/<doc id>[.fm|.sm].md -> paper rows and question records (docs/ICAI_BANK.md).

A bank file is a sequence of blocks. Each block is a front-matter header between two '---' lines (flat 'key: value' lines) and a body
divided by '#### <Heading>' lines with fixed names. The first block describes the ICAI document; cases and items follow in ICAI's order.
Everything under Instructions, Case, Question, Options and Answer is ICAI's text, verbatim; tags, difficulty, Approach and note are ours.

    parse_text(text, name)          -> (blocks, problems)          the format only (tools/bank/check.py uses it too)
    load(root, syl, include_draft, errors, warnings) -> (papers, questions)   what build.py ships
    DOC_ID, ITEM_KEY, SUBJECT_OF     the id grammar and the paper -> PassBook subject map
"""
from __future__ import annotations

import json
import re
from pathlib import Path

# ---------------------------------------------------------------------------------------------------------------- the grammar
DOC_ID = re.compile(r"^(?P<s>[no])-(?P<paper>p\d)-(?P<kind>pyq|rtp|mtp)-(?P<attempt>(?:jan|may|jun|jul|sep|nov|dec)\d{4})(?:-(?P<series>s[12]))?$")
ITEM_KEY = re.compile(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")
CASE_KEY = re.compile(r"^c\d+[a-z]?$")
TAG_LIST = re.compile(r"^[a-z0-9.]+(?:\s*,\s*[a-z0-9.]+)*$")
PAGES = re.compile(r"^\d+(?:\s*-\s*\d+)?(?:\s*,\s*\d+(?:\s*-\s*\d+)?)*$")
MONTHS = {"jan": 1, "may": 5, "jun": 6, "jul": 7, "sep": 9, "nov": 11, "dec": 12}
MONTH_NAME = {"jan": "January", "may": "May", "jun": "June", "jul": "July", "sep": "September", "nov": "November", "dec": "December"}
MON3 = {"jan": "Jan", "may": "May", "jun": "Jun", "jul": "Jul", "sep": "Sep", "nov": "Nov", "dec": "Dec"}
KIND_NAME = {"pyq": "Exam", "rtp": "RTP", "mtp": "MTP"}
SCHEMES = {"n": "new", "o": "old"}
# (scheme, paper, section) -> PassBook subject; old P7 is the old-scheme EIS & SM paper (its SM half comes from the SM import)
SUBJECT_OF = {("new", "p4", None): "cma", ("new", "p5", None): "aud", ("new", "p6", "fm"): "fm", ("new", "p6", "sm"): "sm",
              ("old", "p3", None): "cma", ("old", "p6", None): "aud", ("old", "p8", None): "fm", ("old", "p7", "sm"): "sm"}
PAPER_CODE = {("new", "p4"): "P4", ("new", "p5"): "P5", ("new", "p6"): "P6", ("old", "p3"): "Old P3", ("old", "p6"): "Old P6",
              ("old", "p8"): "Old P8", ("old", "p7"): "Old P7"}
SECTIONED = {("new", "p6"), ("old", "p7")}          # papers whose files hold one section each (fm / sm)

DOC_KEYS = {"doc", "paper", "section", "kind", "attempt", "series", "qfile", "afile", "paperfile", "answers", "choice", "minutes",
            "status", "by", "date", "note", "title", "q", "accept"}
CASE_KEYS = {"case", "qno", "label", "q", "a", "figure", "note", "section", "accept"}
ITEM_KEYS = {"item", "case", "qno", "part", "label", "marks", "type", "key", "tags", "alt", "oos", "difficulty", "q", "a", "figure",
             "note", "section", "accept"}
REPEATABLE = {"figure"}
HEADINGS = {"doc": {"Instructions"}, "case": {"Case", "Answer"}, "item": {"Question", "Options", "Answer", "Approach"}}
STATUSES = ("draft", "imported", "checked", "reviewed")    # imported: converted by a tool from a verified bank (the SM import), not yet re-read by a person
DIFFS = ("easy", "medium", "hard")
TYPE_IDX = {"MCQ": 0, "MSQ": 1, "NAT": 2, "DESC": 3}
DIFF_IDX = {"easy": 0, "medium": 1, "hard": 2}
# flag bits: the GATE ones (tools/buildlib/pyq.py FLAG) plus the bank's own
FLAG = {"FIG": 1, "SOL": 2, "KEY": 4, "SPECIAL": 8, "REVIEW": 16, "GROUP": 32, "LEGACY": 64, "MTA": 128, "CHECKED": 256, "DISPUTE": 512,
        "OOS": 1024, "ANS": 2048}
OPT = re.compile(r"^\(([A-Da-d])\)\s?(.*)$")
RUPEE_TICK = re.compile(r"`\s?\d")                  # ICAI's Rupee font prints ₹ as a backtick: never left in a transcription


def _pages(spec: str) -> list[int]:
    out: list[int] = []
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            a, b = (int(x) for x in part.split("-"))
            out.extend(range(a, b + 1))
        elif part:
            out.append(int(part))
    return out


def attempt_label(attempt: str, short: bool = False) -> str:
    m = re.fullmatch(r"([a-z]{3})(\d{4})", attempt or "")
    if not m:
        return attempt or ""
    return f"{(MON3 if short else MONTH_NAME)[m.group(1)]} {m.group(2)}"


# ---------------------------------------------------------------------------------------------------------------- parsing
def parse_text(text: str, name: str = "<bank file>"):
    """the blocks of a bank file -> (blocks, problems). A block = {kind: 'doc' | 'case' | 'item' | '?', line, head: {key: value | [values]},
    body: {Heading: text}, order: [Heading]}. problems = [(line, message)] for the format only (keys and values are checked by load())."""
    lines = text.split("\n")
    problems: list[tuple[int, str]] = []
    blocks: list[dict] = []
    i, n = 0, len(lines)
    # a leading HTML comment and blank lines are allowed before the first block
    while i < n and (not lines[i].strip() or lines[i].lstrip().startswith("<!--")):
        if lines[i].lstrip().startswith("<!--") and "-->" not in lines[i]:
            while i < n and "-->" not in lines[i]:
                i += 1
        i += 1
    if i < n and lines[i].strip() != "---":
        problems.append((i + 1, "a bank file starts with a '---' front-matter block (the document block)"))
    while i < n:
        if lines[i].strip() != "---":
            if lines[i].strip():
                problems.append((i + 1, f"text outside a block: {lines[i].strip()[:60]!r}"))
            i += 1
            continue
        start = i + 1
        i += 1
        head: dict = {}
        while i < n and lines[i].strip() != "---":
            ln = lines[i]
            if ln.strip():
                m = re.match(r"^([a-z][a-z_]*)\s*:\s?(.*)$", ln)
                if not m:
                    problems.append((i + 1, f"a front-matter line is 'key: value', got {ln.strip()[:60]!r}"))
                else:
                    k, v = m.group(1), m.group(2).strip()
                    if k in REPEATABLE:
                        head.setdefault(k, []).append(v)
                    elif k in head:
                        problems.append((i + 1, f"key {k!r} given twice in one block"))
                    else:
                        head[k] = v
            i += 1
        if i >= n:
            problems.append((start, "front matter not closed by a '---' line"))
            break
        i += 1
        body_start = i
        body_lines = []
        while i < n and lines[i].strip() != "---":
            body_lines.append(lines[i])
            i += 1
        kind = "doc" if not blocks else "case" if "case" in head and "item" not in head else "item" if "item" in head else "?"
        if kind == "?":
            problems.append((start, "a block needs 'item:' or 'case:' (only the first block is the document block)"))
        body, order = {}, []
        cur = None
        for k, ln in enumerate(body_lines):
            m = re.match(r"^####\s+(.+?)\s*$", ln)
            if m:
                cur = m.group(1)
                if cur in body:
                    problems.append((body_start + k + 1, f"heading '#### {cur}' twice in one block"))
                body[cur] = []
                order.append(cur)
                continue
            if cur is None:
                if ln.strip():
                    problems.append((body_start + k + 1, f"text before the first '#### ' heading: {ln.strip()[:60]!r}"))
                continue
            body[cur].append(ln)
        body = {h: "\n".join(v).strip("\n") for h, v in body.items()}
        blocks.append({"kind": kind, "line": start, "head": head, "body": body, "order": order, "body_line": body_start})
    return blocks, problems


def options_of(text: str):
    """the four options of an '#### Options' section -> ({'A': text, …}, problems)"""
    opts: dict[str, list[str]] = {}
    order: list[str] = []
    probs: list[str] = []
    cur = None
    for ln in (text or "").split("\n"):
        m = OPT.match(ln.strip())
        if m:
            cur = m.group(1).upper()
            if cur in opts:
                probs.append(f"option ({cur}) given twice")
            opts[cur] = [m.group(2)]
            order.append(cur)
        elif ln.strip():
            if cur is None:
                probs.append(f"text before option (A): {ln.strip()[:50]!r}")
            else:
                opts[cur].append(ln)
    if order != ["A", "B", "C", "D"]:
        probs.append(f"an ICAI MCQ has four options (A) to (D) in order, got {', '.join(order) or 'none'}")
    return {k: "\n".join(v).strip() for k, v in opts.items()}, probs


# ---------------------------------------------------------------------------------------------------------------- Markdown checks
def _cells(row: str) -> list[str]:
    s = row.strip()
    if s.startswith("|"):
        s = s[1:]
    if s.endswith("|") and not s.endswith("\\|"):
        s = s[:-1]
    return re.split(r"(?<!\\)\|", s)


def table_problems(text: str) -> list[str]:
    """unbalanced Markdown tables: every table needs a header row, a separator row and the same number of cells in each row"""
    out = []
    lines = (text or "").split("\n")
    i = 0
    while i < len(lines):
        if lines[i].lstrip().startswith("|"):
            j = i
            while j < len(lines) and lines[j].lstrip().startswith("|"):
                j += 1
            rows = lines[i:j]
            head = _cells(rows[0])
            first = rows[0].strip()[:50]
            if len(rows) < 2 or not all(re.fullmatch(r"\s*:?-{3,}:?\s*", c) for c in _cells(rows[1])):
                out.append(f"table at {first!r}: the second row must be the separator (|---|---|)")
            for r in rows[1:]:
                if len(_cells(r)) != len(head):
                    out.append(f"table at {first!r}: a row has {len(_cells(r))} cells, the header {len(head)}: {r.strip()[:60]!r}")
                    break
            i = j
        else:
            i += 1
    return out


def math_problems(text: str) -> list[str]:
    t = re.sub(r"`[^`]*`", "", text or "")
    n = len(re.findall(r"(?<!\\)\$", t))
    return [] if n % 2 == 0 else ["unbalanced $ maths (an odd number of $ signs)"]


def text_problems(text: str) -> list[str]:
    out = table_problems(text) + math_problems(text)
    if RUPEE_TICK.search(text or ""):
        out.append("a backtick before a number: ICAI's Rupee font prints ₹ as a backtick, write ₹")
    return out


# ---------------------------------------------------------------------------------------------------------------- choice rules
def parse_choice(spec: str):
    """'all' | 'q1; any 4 of q2-q6' | 'q1, q2; any 2 of q3-q5' -> {compulsory: [nos], groups: [{n, of: [nos]}]} (raises ValueError)"""
    s = (spec or "").strip().lower()
    if not s or s == "all":
        return {"all": True, "compulsory": [], "groups": []}
    comp: list[int] = []
    groups = []
    for part in [p.strip() for p in s.split(";") if p.strip()]:
        m = re.fullmatch(r"any\s+(\d+)\s+of\s+q(\d+)\s*-\s*q(\d+)", part)
        if m:
            k, a, b = int(m.group(1)), int(m.group(2)), int(m.group(3))
            if b <= a or k >= b - a + 1:
                raise ValueError(f"'{part}': choose fewer than the questions in the range")
            groups.append({"n": k, "of": list(range(a, b + 1))})
            continue
        nos = re.findall(r"q(\d+)", part)
        if not nos or re.sub(r"[q\d,\s]", "", part):
            raise ValueError(f"cannot read '{part}' (write 'q1; any 4 of q2-q6' or 'all')")
        comp += [int(x) for x in nos]
    return {"all": False, "compulsory": comp, "groups": groups}


# ---------------------------------------------------------------------------------------------------------------- loading
def load_sources(root: Path) -> dict:
    p = root / "bank" / "sources.json"
    return json.loads(p.read_text()).get("files", {}) if p.exists() else {}


def check_file(path: Path, root: Path, syl: dict, sources: dict, include_draft: bool, errors: list[str], warnings: list[str]):
    """one bank file -> (doc header, cases, items) or None when it is not shipped (draft) or broken. Appends problems to errors / warnings."""
    rel = path.relative_to(root).as_posix()
    text = path.read_text()
    blocks, probs = parse_text(text, rel)
    err0 = len(errors)
    E = lambda line, msg: errors.append(f"{rel}:{line}: {msg}")          # noqa: E731
    W = lambda line, msg: warnings.append(f"{rel}:{line}: {msg}")        # noqa: E731
    for ln, msg in probs:
        E(ln, msg)
    if not blocks:
        E(1, "empty bank file")
        return None
    d = blocks[0]
    h = d["head"]
    for k in h:
        if k not in DOC_KEYS:
            E(d["line"], f"unknown document key {k!r}")
    for k in ("doc", "paper", "kind", "attempt", "qfile", "status", "by", "date"):
        if not h.get(k):
            E(d["line"], f"the document block needs '{k}:'")
    status = h.get("status", "")
    if status and status not in STATUSES:
        E(d["line"], f"status is one of {', '.join(STATUSES)}, got {status!r}")
    doc = h.get("doc", "")
    m = DOC_ID.match(doc)
    parts = path.name.split(".")
    stem, fsec = parts[0], parts[1] if len(parts) == 3 else None
    if not m:
        E(d["line"], f"doc id {doc!r} is not <n|o>-<paper>-<pyq|rtp|mtp>-<attempt>[-s1|-s2] (docs/ICAI_BANK.md §2)")
        return None
    scheme = SCHEMES[m.group("s")]
    if stem != doc:
        E(d["line"], f"the file is named {path.name}, so doc must be {stem!r} (got {doc!r})")
    folder = path.parent.relative_to(root / "bank" / "items").as_posix()
    if folder != f"{scheme}/{m.group('paper')}":
        E(d["line"], f"a {scheme}-scheme {m.group('paper')} document lives in bank/items/{scheme}/{m.group('paper')}/, not {folder}/")
    for k, want in (("paper", m.group("paper")), ("kind", m.group("kind")), ("attempt", m.group("attempt"))):
        if h.get(k) and h[k] != want:
            E(d["line"], f"{k}: {h[k]} disagrees with the doc id ({want})")
    if (h.get("series") or None) != (m.group("series") or None):
        E(d["line"], f"series: {h.get('series') or '(none)'} disagrees with the doc id ({m.group('series') or 'none'})")
    sectioned = (scheme, m.group("paper")) in SECTIONED
    section = h.get("section") or None
    if sectioned:
        if section not in ("fm", "sm"):
            E(d["line"], "a Paper 6 file holds one section: 'section: fm' or 'section: sm'")
        if fsec != section:
            E(d["line"], f"a {section or '?'} file is named {doc}.{section or '<fm|sm>'}.md")
    elif section or fsec:
        E(d["line"], "only Paper 6 files carry a section")
    subject = SUBJECT_OF.get((scheme, m.group("paper"), section if sectioned else None))
    if not subject:
        E(d["line"], f"no PassBook subject for {scheme} {m.group('paper')} {section or ''}".strip())
        return None
    unpublished = h.get("answers") == "unpublished"
    if h.get("answers") and not unpublished:
        E(d["line"], "answers: is 'unpublished' or left out")
    # provenance: the files are in bank/sources.json, of this scheme and paper
    srcs = {}
    for k in ("qfile", "afile", "paperfile"):
        f = h.get(k)
        if not f:
            continue
        e = sources.get(f)
        if not e:
            E(d["line"], f"{k}: {f} is not in bank/sources.json (the vendored ~/CA_PERSONAL/ca_sources/q/manifest.json; run tools/bank/sources.py)")
            continue
        if e.get("scheme") != scheme or e.get("paper") != m.group("paper") or e.get("kind") != m.group("kind") or e.get("attempt") != m.group("attempt") \
                or (e.get("series") or None) != (m.group("series") or None):
            E(d["line"], f"{k}: {f} is a different document ({e.get('scheme')} {e.get('paper')} {e.get('kind')} {e.get('attempt')} {e.get('series') or ''})")
        srcs[k] = dict(e, file=f)
    if not unpublished and not h.get("afile"):
        E(d["line"], "afile: names ICAI's answers (or set 'answers: unpublished')")
    choice = None
    if h.get("choice"):
        try:
            choice = parse_choice(h["choice"])
        except ValueError as ex:
            E(d["line"], f"choice: {ex}")
    minutes = None
    if h.get("minutes"):
        if re.fullmatch(r"\d{2,3}", h["minutes"]):
            minutes = int(h["minutes"])
        else:
            E(d["line"], "minutes: a whole number")
    if d["body"].get("Instructions", "").strip() and not h.get("q"):
        E(d["line"], "'q:' gives the page(s) of qfile that print the Instructions")
    for hd in d["order"]:
        if hd not in HEADINGS["doc"]:
            E(d["body_line"], f"the document block's body has only '#### Instructions', not '#### {hd}'")
    if status == "draft" and not include_draft:
        # drafts never ship; their format is still checked so a transcriber hears about problems early
        pass

    nodes = syl["nodes"]
    pages_of = lambda k: (srcs.get(k) or {}).get("pages") or 0     # noqa: E731

    def check_pages(b, key, src_key, need):
        v = b["head"].get(key)
        if not v:
            if need:
                E(b["line"], f"'{key}:' gives the {'question' if key == 'q' else 'answer'} pages in {h.get(src_key) or src_key}")
            return None
        if not PAGES.match(v):
            E(b["line"], f"{key}: {v!r} is not page numbers like 3 or 20-22 or 3, 5")
            return None
        ps = _pages(v)
        mx = pages_of(src_key)
        if mx and any(p < 1 or p > mx for p in ps):
            E(b["line"], f"{key}: {v} is outside the {mx} pages of {h.get(src_key)}")
        return v

    def check_figs(b):
        out = []
        for spec in b["head"].get("figure") or []:
            bits = [x.strip() for x in spec.split("|")]
            if len(bits) != 3 or not all(bits):
                E(b["line"], f"figure: '<file> | <where> | <alt text>', got {spec!r}")
                continue
            fn, where, alt = bits
            if not (where in ("case", "question", "answer") or re.fullmatch(r"option:[A-D]", where)):
                E(b["line"], f"figure where is case, question, answer or option:A-D, got {where!r}")
            if not (root / "bank" / "figs" / doc / fn).exists():
                E(b["line"], f"figure file bank/figs/{doc}/{fn} does not exist")
            out.append({"file": fn, "where": "opt:" + where[-1] if where.startswith("option:") else where, "alt": alt})
        return out

    cases: dict[str, dict] = {}
    items: list[dict] = []
    keys_seen: set[str] = set()
    for b in blocks[1:]:
        hb = b["head"]
        if b["kind"] == "case":
            for k in hb:
                if k not in CASE_KEYS:
                    E(b["line"], f"unknown case key {k!r}")
            ck = hb.get("case", "")
            if not CASE_KEY.match(ck):
                E(b["line"], f"case key {ck!r} is c1, c2 …")
            if ck in cases:
                E(b["line"], f"case {ck} given twice")
            if not hb.get("qno"):
                E(b["line"], "a case needs 'qno:' (ICAI's question number, or the MCQ range like 1-5)")
            for hd in b["order"]:
                if hd not in HEADINGS["case"]:
                    E(b["body_line"], f"a case's body has '#### Case' and optionally '#### Answer', not '#### {hd}'")
            if not b["body"].get("Case", "").strip():
                E(b["line"], f"case {ck}: '#### Case' is empty")
            for t in ("Case", "Answer"):
                for p in text_problems(b["body"].get(t, "")):
                    E(b["line"], f"case {ck} {t}: {p}")
            cases[ck] = {"key": ck, "accept": hb.get("accept") or "", "qno": hb.get("qno"), "label": hb.get("label") or None, "stem": b["body"].get("Case", ""),
                         "answer": b["body"].get("Answer", "") or None, "q": check_pages(b, "q", "qfile", True),
                         "a": check_pages(b, "a", "afile", bool(b["body"].get("Answer", "").strip())), "figures": check_figs(b), "line": b["line"]}
            continue
        if b["kind"] != "item":
            continue
        for k in hb:
            if k not in ITEM_KEYS:
                E(b["line"], f"unknown item key {k!r}")
        ik = hb.get("item", "")
        if not ITEM_KEY.match(ik):
            E(b["line"], f"item key {ik!r} is like q3a, m4, q1a-ii, q6c-or (docs/ICAI_BANK.md §2)")
        if ik in keys_seen:
            E(b["line"], f"item {ik} given twice")
        keys_seen.add(ik)
        if hb.get("section") and hb["section"] != section:
            E(b["line"], f"item {ik}: section {hb['section']} differs from the file's ({section})")
        typ = hb.get("type", "")
        if typ not in ("mcq", "descriptive"):
            E(b["line"], f"item {ik}: type is mcq or descriptive, got {typ!r}")
        qno = hb.get("qno", "")
        if not re.fullmatch(r"\d{1,2}", qno):
            E(b["line"], f"item {ik}: qno is ICAI's question number (1-99), got {qno!r}")
        marks = None
        if hb.get("marks") == "none":
            # the document ICAI published prints no marks for this question (a past paper's Suggested Answers for Part I MCQs, whose
            # OMR paper is separate): said, never guessed
            if not hb.get("note") and not h.get("note"):
                E(b["line"], f"item {ik}: marks: none needs a note saying what ICAI prints")
        elif hb.get("marks"):
            if re.fullmatch(r"\d{1,2}", hb["marks"]) and 1 <= int(hb["marks"]) <= 20:
                marks = int(hb["marks"])
            else:
                E(b["line"], f"item {ik}: marks is a whole number 1-20 (or 'none' where ICAI prints none), got {hb['marks']!r}")
        elif m.group("kind") != "rtp":
            E(b["line"], f"item {ik}: marks: (MTPs and exam papers print marks; only RTPs have none)")
        if hb.get("case") and hb["case"] not in cases:
            E(b["line"], f"item {ik}: case {hb['case']} is not defined above it")
        for hd in b["order"]:
            if hd not in HEADINGS["item"]:
                E(b["body_line"], f"item {ik}: unknown heading '#### {hd}' (Question, Options, Answer, Approach)")
        qtext = b["body"].get("Question", "")
        if not qtext.strip() and not hb.get("case"):
            E(b["line"], f"item {ik}: '#### Question' is empty")
        options, key, key_raw = None, None, None
        if typ == "mcq":
            options, oprobs = options_of(b["body"].get("Options", ""))
            for p in oprobs:
                E(b["line"], f"item {ik}: {p}")
            kr = (hb.get("key") or "").strip()
            key_raw = kr
            if not kr:
                E(b["line"], f"item {ik}: an MCQ needs ICAI's key ('key: B'; 'B/C', 'none' or 'unpublished' when ICAI's key says so)")
            elif re.fullmatch(r"[A-D]", kr):
                key = {"kind": "single", "value": kr}
            elif re.fullmatch(r"[A-D](?:/[A-D])+", kr):
                key = {"kind": "oneof", "alts": [{"kind": "single", "value": x} for x in kr.split("/")]}
            elif kr in ("none", "unpublished"):
                key = None
                if kr == "none" and not hb.get("note"):
                    E(b["line"], f"item {ik}: key: none needs a note quoting ICAI's key")
            else:
                E(b["line"], f"item {ik}: key {kr!r} is A-D, B/C, none or unpublished")
        elif b["body"].get("Options", "").strip():
            E(b["line"], f"item {ik}: only an MCQ has '#### Options'")
        elif hb.get("key"):
            E(b["line"], f"item {ik}: only an MCQ has a key")
        ans = b["body"].get("Answer", "")
        if typ == "descriptive" and not unpublished and not ans.strip():
            E(b["line"], f"item {ik}: '#### Answer' is empty (ICAI's answer, verbatim; or 'answers: unpublished' on the document)")
        for t in ("Question", "Options", "Answer", "Approach"):
            for p in text_problems(b["body"].get(t, "")):
                E(b["line"], f"item {ik} {t}: {p}")
        # tags (ours): syllabus ids of this subject, first = primary
        tags = []
        if hb.get("tags"):
            if not TAG_LIST.match(hb["tags"]):
                E(b["line"], f"item {ik}: tags is a comma list of syllabus ids, got {hb['tags']!r}")
            else:
                tags = [t.strip() for t in hb["tags"].split(",")]
                for t in tags:
                    nd = nodes.get(t)
                    if not nd:
                        E(b["line"], f"item {ik}: tag {t!r} is not an id in content/syllabus/syllabus.txt")
                    elif nd.get("subject") != subject:
                        E(b["line"], f"item {ik}: tag {t} belongs to {nd.get('subject')}, not {subject} ({PAPER_CODE.get((scheme, m.group('paper')))})")
        oos = (hb.get("oos") or "").strip()
        if oos and oos != "yes":
            E(b["line"], f"item {ik}: oos is 'yes' or left out")
        if oos and not hb.get("note"):
            E(b["line"], f"item {ik}: an out-of-syllabus item needs a note saying why")
        if not tags and status in ("imported", "checked", "reviewed") and not oos:
            E(b["line"], f"item {ik}: a {status} document tags every item ('tags: cma.mat.eoq')")
        diff = hb.get("difficulty") or None
        if diff and diff not in DIFFS:
            E(b["line"], f"item {ik}: difficulty is easy, medium or hard")
        if hb.get("accept") and not hb.get("note"):
            E(b["line"], f"item {ik}: accept: needs a note saying why the PDF text differs")
        items.append({"key": ik, "accept": hb.get("accept") or "", "case": hb.get("case") or None, "qno": int(qno) if qno.isdigit() else 0, "part": hb.get("part") or None,
                      "label": hb.get("label") or None, "marks": marks, "type": typ, "text": qtext, "options": options, "key_obj": key,
                      "key_raw": key_raw, "answer": ans or None, "approach": b["body"].get("Approach", "") or None, "tags": tags,
                      "alt": hb.get("alt") or None, "oos": bool(oos), "difficulty": diff, "note": hb.get("note") or None,
                      "q": check_pages(b, "q", "qfile", True), "a": check_pages(b, "a", "afile", bool(ans.strip())),
                      "figures": check_figs(b), "line": b["line"]})
    keyset = {it["key"] for it in items}
    for it in items:
        if it["alt"] and it["alt"] not in keyset:
            E(it["line"], f"item {it['key']}: alt {it['alt']} is not an item of this file")
    if choice and not choice.get("all"):
        nos = {it["qno"] for it in items if it["type"] == "descriptive"}
        named = set(choice["compulsory"]) | {x for g in choice["groups"] for x in g["of"]}
        missing = sorted(named - nos)
        if missing and status != "draft":
            E(d["line"], f"choice names question(s) {', '.join(map(str, missing))} that have no descriptive item")
    if not items:
        (W if status == "draft" else E)(d["line"], "no items yet")
    if len(errors) > err0:
        return None
    return {"head": h, "doc": doc, "scheme": scheme, "paper": m.group("paper"), "kind": m.group("kind"), "attempt": m.group("attempt"),
            "series": m.group("series"), "section": section, "subject": subject, "srcs": srcs, "choice": choice, "minutes": minutes,
            "status": status, "unpublished": unpublished, "cases": cases, "items": items, "file": rel,
            "instructions": d["body"].get("Instructions") or None, "ipages": h.get("q") or None}


def load(root: Path, syl: dict, include_draft: bool, errors: list[str], warnings: list[str]):
    """every bank file -> (papers, questions) in the shapes build.py ships (docs/ICAI_BANK.md §4)"""
    base = root / "bank" / "items"
    if not base.exists():
        return [], []
    sources = load_sources(root)
    files = sorted(base.rglob("*.md"))
    parsed = []
    for f in files:
        r = check_file(f, root, syl, sources, include_draft, errors, warnings)
        if r and (r["status"] != "draft" or include_draft):
            parsed.append(r)
    by_doc: dict[str, list[dict]] = {}
    for r in parsed:
        by_doc.setdefault(r["doc"], []).append(r)
    papers, questions = [], []
    all_ids: set[str] = set()
    for doc in sorted(by_doc, key=lambda d: doc_sort_key(d)):
        parts = sorted(by_doc[doc], key=lambda r: ("fm", "sm").index(r["section"]) if r["section"] else 0)
        r0 = parts[0]
        for r in parts[1:]:
            for k in ("kind", "attempt", "series", "qfile", "afile", "paperfile", "answers"):
                if (r["head"].get(k) or None) != (r0["head"].get(k) or None):
                    errors.append(f"{r['file']}: {k} differs from {r0['file']} (one ICAI document)")
        qs = []
        for r in parts:
            prefix = f"{doc}-{r['section']}-" if r["section"] else f"{doc}-"
            ord_base = len(qs)
            for k, it in enumerate(r["items"]):
                qid = prefix + it["key"]
                if qid in all_ids:
                    errors.append(f"{r['file']}: duplicate item id {qid}")
                all_ids.add(qid)
                qs.append(record(r, it, qid, prefix, ord_base + k, syl))
        year = int(r0["attempt"][3:])
        mon = MONTHS[r0["attempt"][:3]]
        sno = int(r0["series"][1]) if r0["series"] else 0
        code = PAPER_CODE.get((r0["scheme"], r0["paper"]), r0["paper"].upper())
        marks = sum(q["marks"] or 0 for q in qs if not q.get("alt"))
        sub_marks = {}
        for q in qs:
            if not q.get("alt"):
                sub_marks[q["subject"]] = sub_marks.get(q["subject"], 0) + (q["marks"] or 0)
        kindn = KIND_NAME[r0["kind"]]
        att = attempt_label(r0["attempt"], short=True)
        label = (f"{kindn} {att}" + (f" · Series {'I' * sno}" if sno else "")) if r0["kind"] != "pyq" else f"{att} exam"
        unpub = any(r["unpublished"] for r in parts)
        # a sitting needs ICAI's choice rule for every section with descriptive questions ('choice: all' where ICAI sets no choice), so a
        # paper's maximum is never the sum of questions the candidate may leave out
        sittable = r0["kind"] in ("mtp", "pyq") and marks > 0 and not unpub and any(q["type"] == "DESC" for q in qs) \
            and all(r["choice"] for r in parts if any(it["type"] == "descriptive" for it in r["items"]))
        src = {}
        for k, name in (("qfile", "q"), ("afile", "a"), ("paperfile", "paper")):
            e = r0["srcs"].get(k)
            if e:
                src[name] = {"file": e["file"], "url": e.get("url"), "listing": e.get("listing"), "sha256": e.get("sha256"),
                             "pages": e.get("pages"), "fetched": e.get("fetched"), "origin": e.get("source")}
        papers.append({
            "id": doc, "year": year, "set": mon * 10 + sno, "label": label, "organiser": "ICAI", "kind": r0["kind"], "scheme": r0["scheme"],
            "attempt": r0["attempt"], "attemptLabel": attempt_label(r0["attempt"]), "series": r0["series"], "paperCode": code,
            "title": r0["head"].get("title") or f"{code} · {label}", "subjects": [r["subject"] for r in parts],
            "n": len(qs), "ga": 0, "cs": len(qs), "marks": marks, "subMarks": sub_marks,
            # ICAI's clock: 3 hours; a Paper 6 (old: Paper 7) document with one section in the bank so far is sat as that section, 90 minutes
            "minutes": r0["minutes"] or (90 if (r0["scheme"], r0["paper"]) in SECTIONED and len(parts) == 1 else 180), "keyed": sum(1 for q in qs if q.get("answer")), "verified": len(qs), "review": 0, "pending": 0,
            "numbering": "icai", "status": min((r["status"] for r in parts), key=STATUSES.index),
            "sectioned": (r0["scheme"], r0["paper"]) in SECTIONED,       # Paper 6 (old: 7): items carry their section ('fm' / 'sm') for its choice rule
            "choice": {r["section"] or "all": r["choice"] for r in parts if r["choice"]} or None,
            "instructions": {r["section"] or "all": r["instructions"] for r in parts if r["instructions"]} or None,
            "answers": "unpublished" if unpub else "published", "sittable": sittable,
            "src": src, "keySrc": "file" if src.get("a") else None, "files": [r["file"] for r in parts]})
        questions.extend(qs)
    return papers, questions


def doc_sort_key(doc: str):
    m = DOC_ID.match(doc)
    if not m:
        return (0, 0, doc)
    return (-int(m.group("attempt")[3:]), -MONTHS[m.group("attempt")[:3]], doc)


def printed_label(it: dict) -> str:
    """'Q5(a)', 'Q1(ii)', 'MCQ 3', or the file's own label"""
    if it.get("label"):
        return it["label"]
    if it["key"].startswith("m"):
        return f"MCQ {it['qno']}"
    return f"Q{it['qno']}" + (it.get("part") or "")


def record(r: dict, it: dict, qid: str, prefix: str, ordn: int, syl: dict) -> dict:
    """one item as the build's question record (the GATE shape plus the bank's fields)"""
    nodes = syl["nodes"]
    prim = it["tags"][0] if it["tags"] else None
    nd = nodes.get(prim) if prim else None
    if nd and nd.get("topic"):            # a sub-topic
        topic, sub = nd["topic"], prim
    elif nd:                              # a chapter id
        topic, sub = prim, None
    else:
        topic = sub = None
    case = r["cases"].get(it["case"]) if it["case"] else None
    typ = "MCQ" if it["type"] == "mcq" else "DESC"
    rec = {
        "id": qid, "paper": r["doc"], "section": "I" if typ == "MCQ" else "II", "no": it["qno"], "ord": ordn,
        "label": printed_label(it), "part": it.get("part"), "marks": it["marks"], "type": typ,
        "stem": it["text"], "subject": r["subject"], "topic": topic, "subtopic": sub, "tags": it["tags"],
        "difficulty": it["difficulty"], "year": int(r["attempt"][3:]), "sub": r["section"],
        "solution": None, "check": None, "transcription": {"status": "verified" if r["status"] in ("checked", "reviewed") else "auto"},
    }
    if typ == "MCQ":
        rec["options"] = [it["options"].get(k, "") for k in "ABCD"] if it["options"] else []
        rec["answer"] = it["key_obj"]
        rec["key_raw"] = it["key_raw"]
    else:
        rec["answer"] = None
    if case:
        rec["group"] = {"kind": "case", "id": prefix + case["key"], "label": case["label"], "context": case["stem"],
                        **({"answer": case["answer"]} if case["answer"] else {})}
        rec["case"] = prefix + case["key"]
    if it["answer"]:
        rec["ans"] = it["answer"]
    ours = {k: v for k, v in (("approach", it["approach"]), ("difficulty", it["difficulty"])) if v}
    if ours:
        rec["ours"] = ours
    figs = (case["figures"] if case else []) + it["figures"]
    if figs:
        rec["figures"] = [{"file": f["file"], "where": "stem" if f["where"] in ("case", "question") else f["where"], "alt": f["alt"],
                           "describe": f["alt"], "at": f["where"]} for f in figs]
    pg = {k: v for k, v in (("q", it["q"] or (case and case["q"])), ("a", it["a"] or (case and case["a"]))) if v}
    if case and case.get("q") and it.get("q") and case["q"] != it["q"]:
        pg["cq"] = case["q"]
    if case and case.get("a") and it.get("a") and case["a"] != it["a"]:
        pg["ca"] = case["a"]
    rec["pg"] = pg
    if it["alt"]:
        rec["alt"] = prefix + it["alt"]
    if it["oos"]:
        rec["oos"] = True
    if it["note"]:
        rec["note"] = it["note"]
    return rec


def flags_of(q: dict, syl: dict) -> int:
    st = syl["nodes"].get(q.get("subtopic") or q.get("topic") or "", {}).get("status", "in")
    return ((FLAG["FIG"] if q.get("figures") else 0) | (FLAG["KEY"] if q.get("answer") else 0) |
            (FLAG["SPECIAL"] if (q.get("answer") or {}).get("kind") == "oneof" else 0) |
            (FLAG["REVIEW"] if (q.get("transcription") or {}).get("status") == "needs-review" else 0) |
            (FLAG["GROUP"] if q.get("group") else 0) | (FLAG["LEGACY"] if st in ("legacy", "extra") else 0) |
            (FLAG["OOS"] if q.get("oos") else 0) | (FLAG["ANS"] if q.get("ans") or (q.get("group") or {}).get("answer") or q.get("answer") else 0))


def index_rows(papers, questions, syl):
    """manifest.pyq rows for bank questions: id paper sec no marks type subject topic subtopic diff flags label tags case alt ord"""
    pidx = {p["id"]: i for i, p in enumerate(papers)}
    rows = []
    for q in questions:
        tags = q.get("tags") or []
        rows.append([q["id"], pidx[q["paper"]], q["section"], q["no"], q.get("marks") or 0, TYPE_IDX.get(q["type"], 0), q["subject"],
                     q["topic"], q["subtopic"], DIFF_IDX.get(q.get("difficulty") or "", -1), flags_of(q, syl), q.get("label"),
                     tags[1:] if len(tags) > 1 else 0, q.get("case") or 0, q.get("alt") or 0, q.get("ord", 0)])
    return rows
