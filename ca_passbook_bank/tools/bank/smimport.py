#!/usr/bin/env python3
"""Import ~/CA_PERSONAL/sm-qbank's verbatim ICAI Strategic Management questions into the bank (docs/ICAI_BANK.md §10).

    python3 -I tools/bank/smimport.py [--dry] [--only rtp-sep2026] [--report out.json]

~/CA_PERSONAL/sm-qbank (its SPEC.md) holds every ICAI RTP, MTP and past-paper SM question from 2018 to Sep 2026 with ICAI's suggested answer, one
JSON file per ICAI document (data/*.json), its words checked against the PDF by its provenance.py. This tool turns each file into one
bank file:

  new scheme  bank/items/new/p6/n-p6-<kind>-<attempt>[-sN].sm.md   (section: sm of Paper 6; the PDFs are the ~/CA_PERSONAL/ca_sources/q manifest's)
  old scheme  bank/items/old/p7/o-p7-<kind>-<attempt>[-sN].sm.md   (Paper 7 Section B; the PDFs are sm-qbank's own raw/ copies, added to
                                                                    bank/sources.json with "origin": "sm-qbank" and their sha256)

What it does to ICAI's text: nothing to the words. It drops sm-qbank's own pointer lines ("[Shared case scenario — see question 1(i).]"),
splits a shared case scenario from its first MCQ (the case becomes a case block), drops the printed sub-question label that 'part:'
carries ("(ii) "), writes the options' letters as capitals (§9.4), turns each extracted line into a Markdown paragraph (bullets stay a list, tables stay tables, a line starting "2." is
escaped so it is not renumbered) and escapes Markdown's * and _ . An MCQ keeps ICAI's key (key: B); sm-qbank's reconstructed answer line
("(b) <option text>") is not ICAI's print and is left out.

What it adds (ours): page citations (q: / a:, found by matching each block's 4-word runs against the PDF's text, page by page), tags
(sm.* sub-topics from ICAI's chapter heading or sm-qbank's chapter mapping plus keyword rules adapted from sm-qbank's build.py CANON
table; a chapter id with a note where no sub-topic is clear), oos: yes with a note for sm-qbank's OUT_OF_SYLLABUS questions, and the
choice rule of a mock or past paper read from ICAI's printed instruction ("Question No. 1 is compulsory. Attempt any two ...").

Status: 'imported' (ships; converted, not re-read by a person) when the file validates, every block's pages were found (at least 60 % of
its word runs on the cited pages) and no number of the text is missing from its pages; otherwise 'draft' (never ships) with the reasons in
the document note, for a person to finish.
"""
from __future__ import annotations

import collections
import datetime
import hashlib
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools"))
sys.path.insert(0, str(ROOT / "tools" / "bank"))
import syllabus as syl_mod                 # noqa: E402
from buildlib import bank as bank_mod      # noqa: E402
import seg                                 # noqa: E402
import check as check_mod                  # noqa: E402

SMQ = Path(os.environ.get("SM_QBANK", str(Path.home() / "CA_PERSONAL/sm-qbank")))
SOURCES = ROOT / "bank" / "sources.json"
MON = {1: "jan", 5: "may", 6: "jun", 7: "jul", 9: "sep", 11: "nov", 12: "dec"}
MON_NAME = {"jan": "January", "may": "May", "jun": "June", "jul": "July", "sep": "September", "nov": "November", "dec": "December"}
WORDS = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7}
CHAPTER = {"1": "sm.intro", "2": "sm.ext", "3": "sm.int", "4": "sm.choice", "5": "sm.impl"}
TODAY = datetime.date.today().isoformat()

# ------------------------------------------------------------------------------------------------ tags (ours)
# (sub-topic, pattern): adapted from sm-qbank build.py CANON (topic, home chapter per ICAI's 2023 syllabus, pattern), re-pointed at
# PassBook's sm.* sub-topics. The sub-topic's chapter is its id's second part.


def _p(*alts: str) -> re.Pattern:
    return re.compile("|".join(alts), re.I)


RULES: list[tuple[str, re.Pattern]] = [
    ("sm.intro.intent", _p(r"\bvision\b", r"\bmission\b", r"goals? (?:and|&) objectives", r"objectives? (?:and|&) goals",
                           r"characteristics of (?:good |ideal )?objectives", r"meaningful objectives", r"strategic objectives",
                           r"setting (?:of )?objectives", r"\bcore values\b", r"strategic intent")),
    ("sm.intro.levels", _p(r"corporate level", r"business level", r"functional level", r"network level", r"levels? (?:of|in) strateg")),
    ("sm.intro.meaning", _p(r"limitations? of strategic", r"nature of strategic management", r"concept of strategy", r"business policy",
                            r"\bproactive\b", r"\breactive\b", r"importance of strategic management", r"define strategic management",
                            r"meaning of strategic management", r"benefits of strategic management")),
    ("sm.ext.pestle", _p(r"\bpestle?\b", r"macro.{0,12}environment", r"micro.{0,12}environment", r"external environment",
                         r"globali[sz]ation", r"internationali[sz]ation", r"international environment")),
    ("sm.ext.industry", _p(r"product life cycle", r"\bplc\b", r"industry life cycle", r"value chain", r"experience curve",
                           r"defining the industry", r"industry analysis")),
    ("sm.ext.porter", _p(r"five forces", r"porter'?s? five", r"threat of (?:new entrants|substitutes)", r"bargaining power")),
    ("sm.ext.markets", _p(r"customer analysis", r"customer behaviour", r"consumer behaviour", r"understanding customer",
                          r"competitive landscape", r"competitor analysis", r"competitive intelligence",
                          r"key (?:success )?factors? for competitive", r"key success factor", r"critical success factor",
                          r"strategic group", r"industry attractiveness", r"market segment")),
    ("sm.int.stakeholders", _p(r"mendelow", r"stakeholder (?:mapping|analysis|management|matrix)", r"key stakeholders",
                               r"power.{0,12}interest")),
    ("sm.int.drivers", _p(r"strategic driver")),
    ("sm.int.resources", _p(r"core competenc", r"resources? and capabilit", r"\btangible\b", r"\bintangible\b",
                            r"competitive advantage", r"\bvrio\b", r"capabilit")),
    ("sm.int.swot", _p(r"\bswot\b", r"\btows\b")),
    ("sm.int.generic", _p(r"cost leadership", r"differentiation(?! between)(?! of )", r"focus(?:ed)? (?:strategy|low.cost|differentiation)",
                          r"\bniche\b", r"best.cost provider", r"generic strateg")),
    ("sm.choice.retrench", _p(r"stability strateg", r"turnaround", r"retrenchment", r"divest", r"liquidat")),
    ("sm.choice.ansoff", _p(r"\bansoff\b", r"product.market growth", r"market penetration", r"market development",
                            r"product development", r"\badl\b", r"arthur d\.? little")),
    ("sm.choice.portfolio", _p(r"\bbcg\b", r"boston consulting", r"growth.share matrix", r"cash cow", r"question mark", r"nine.cell",
                               r"\bge matrix\b", r"general electric", r"stop.?light", r"portfolio")),
    ("sm.choice.growth", _p(r"expansion strateg", r"growth strateg", r"diversif", r"concentric", r"conglomerate", r"vertical integration",
                            r"backward integration", r"forward integration", r"horizontal integration", r"\bmerger", r"acquisition",
                            r"takeover", r"strategic alliance", r"joint venture", r"combination strateg", r"innovation strateg")),
    ("sm.impl.matrix", _p(r"strategic management process", r"stages in strategic management",
                          r"formulation (?:vs|versus|and) implementation", r"strategy implementation", r"implementing strateg",
                          r"strategy formulation")),
    ("sm.impl.digital", _p(r"strategic change", r"change management", r"digital transformation", r"\bunfreez", r"refreez",
                           r"kurt lewin")),
    ("sm.impl.structure", _p(r"\b7.?s\b", r"mckinsey", r"shared values", r"organi[sz]ational? structure", r"\bsbu\b",
                             r"matrix structure", r"divisional structure", r"functional structure", r"network structure", r"hourglass",
                             r"simple structure", r"organi[sz]ation(?:al)? culture", r"\bculture\b")),
    ("sm.impl.leadership", _p(r"strategic leader", r"transformational", r"transactional", r"\bleadership\b")),
    ("sm.impl.control", _p(r"strategic control", r"premise control", r"implementation control", r"strategic surveillance",
                           r"special alert", r"operational control", r"management control", r"performance measure")),
    ("sm.int.stakeholders", _p(r"mede?low")),
    ("sm.ext.porter", _p(r"rivalry", r"existing competitors", r"switching costs?", r"barriers? to entry", r"entry barrier")),
    ("sm.intro.intent", _p(r"\bcore values?\b")),
    ("sm.int.generic", _p(r"cost.cutting", r"lower pric", r"low.cost")),
    ("sm.int.resources", _p(r"internal analysis", r"internal environment")),
    ("sm.ext.markets", _p(r"customer (?:behavio|preference)", r"distribution", r"e.commerce", r"dealership", r"market presence")),
]
# used only where no rule above matches: broad words that name a chapter's field, not a sub-topic
FALLBACK: list[tuple[str, re.Pattern]] = [
    ("sm.intro.meaning", _p(r"flexib", r"resilien", r"\bagil", r"uncertain", r"disrupt", r"strategic management")),
    ("sm.ext.markets", _p(r"marketing", r"customers?\b", r"competitors?\b")),
]


def hits_of(text: str, rules: list | None = None) -> list[str]:
    """sub-topics whose patterns occur in the text, in the order they first occur"""
    out = []
    for sub, rx in rules or RULES:
        m = rx.search(text or "")
        if m:
            out.append((m.start(), sub))
    seen, res = set(), []
    for _, s in sorted(out):
        if s not in seen:
            seen.add(s)
            res.append(s)
    return res


def tags_for(q: dict, stem: str, answer_hint: str) -> tuple[list[str], str | None]:
    """(tags, note) for one item: the chapter (ICAI's heading or sm-qbank's mapping) bounds the sub-topics; the stem (and an MCQ's correct
    option) is read first, the start of the answer only where the stem names nothing"""
    ch = str(q.get("chapter"))
    top = CHAPTER.get(ch)
    found = hits_of(stem)
    if top:
        inch = [s for s in found if s.startswith(top + ".")]
        if not inch:
            inch = [s for s in hits_of(answer_hint[:700]) if s.startswith(top + ".")]
        if inch:
            return inch[:3], None
        return [top], "sub-topic tagging still needed (the chapter is " + ("ICAI's heading" if q.get("chapter_source") == "icai" else "sm-qbank's mapping") + ")"
    if not found:
        found = hits_of(answer_hint[:700])
    if not found:
        found = hits_of(" ".join(str(t) for t in q.get("topic_tags") or []))
    if not found:
        found = hits_of(stem, FALLBACK) or hits_of(" ".join(str(t) for t in q.get("topic_tags") or []), FALLBACK)
    if found:
        prim = found[0].rsplit(".", 1)[0]
        return [s for s in found if s.startswith(prim + ".")][:3], "chapter and sub-topic from keywords (ICAI prints no chapter for this MCQ); check the tags"
    return [], "tagging still needed: ICAI prints no chapter for this MCQ and no keyword rule matched"


# ------------------------------------------------------------------------------------------------ text
REF_NOTE = re.compile(r"^\s*[\[(]\s*(?:shared case scenario|based on the shared|refer to the (?:shared )?case|see the (?:shared )?case|"
                      r"case scenario (?:as )?(?:given|set out))[^\n]*(?:\n|$)\s*", re.I)
BULLET = re.compile(r"^\s*(?:[•●◆♦▪■➢►✓]|-)\s+")
NUMLINE = re.compile(r"^(\d+)\.(\s)")


def esc_inline(s: str) -> str:
    s = s.replace("\\", "\\\\").replace("*", "\\*").replace("_", "\\_").replace("`", "'")
    s = s.replace("$", "\\$")
    return s


def md_of(text: str) -> str:
    """sm-qbank's extracted text -> the bank's Markdown: one paragraph per extracted line, bullet runs as one list, table runs kept"""
    lines = (text or "").replace("\r", "").split("\n")
    blocks: list[tuple[str, list[str]]] = []
    for raw in lines:
        ln = raw.rstrip()
        if not ln.strip():
            blocks.append(("blank", []))
            continue
        if ln.lstrip().startswith("|"):
            kind, body = "table", ln.strip()
        elif BULLET.match(ln):
            kind, body = "list", "- " + esc_inline(BULLET.sub("", ln).strip())
        else:
            t = esc_inline(ln.strip())
            t = NUMLINE.sub(r"\1\\.\2", t)
            if t.startswith("#") or t.startswith(">") or t.startswith("+ "):
                t = "\\" + t
            kind, body = "para", t
        if blocks and blocks[-1][0] == kind and kind in ("table", "list"):
            blocks[-1][1].append(body)
        else:
            blocks.append((kind, [body]))
    out = []
    for kind, body in blocks:
        if kind == "blank" or not body:
            continue
        out.append("\n".join(body))
    return "\n\n".join(out).strip()


def strip_label(text: str, part: str) -> str:
    """'(ii) EcoForge’s …' -> 'EcoForge’s …' when part: carries '(ii)'"""
    t = text.lstrip()
    for lab in re.findall(r"\([^)]+\)|\b[ivx]+\b|\d+", part or "")[-1:]:
        lab = lab if lab.startswith("(") else f"({lab})"
        if t.lower().startswith(lab.lower()):
            return t[len(lab):].lstrip(" .\t")
    return text


def split_case(text: str) -> tuple[str, str]:
    """(scenario, own stem) of the first MCQ of a case set (sm-qbank puts the scenario at the start of its question): the stem is the text
    after the last blank line (else the last line break), as sm-qbank's own build.py splits it"""
    cut = text.rfind("\n\n")
    if cut < 0:
        cut = text.rfind("\n")
    head, tail = (text[:cut].strip(), text[cut:].strip()) if cut > 0 else ("", text)
    if len(head) >= 300 and 8 <= len(tail) <= 700:
        return head, tail
    return "", text


# ------------------------------------------------------------------------------------------------ pages (ours)
def plain(md: str) -> str:
    return re.sub(r"\\(.)", r"\1", md)


class Pages:
    """one PDF's pages as 4-word-run sets, to cite the pages a block is printed on"""

    def __init__(self, f: str, entry: dict):
        pdf = seg.path_of(f, entry)
        self.file, self.n = f, seg.page_count(pdf, entry)
        texts = seg.page_texts(pdf, entry, list(range(1, self.n + 1)))
        self.text = {p: seg.rupee(t)[0] for p, t in texts.items()}
        self.sh = {p: set(check_mod.shingles(check_mod.words_of(t), 4)) for p, t in self.text.items()}
        self.nums = {p: collections.Counter(check_mod.nums(t)) for p, t in self.text.items()}

    def locate(self, text: str, start: int = 1) -> tuple[str | None, float]:
        # word runs inside each paragraph, never across a table (pdftotext interleaves a table's columns), as check.py reads them
        # (each extracted line and each option on its own: ICAI sets options in columns, so runs never cross from one to the next)
        paras = [ln for ln in plain(text).split("\n") if ln.strip() and not ln.lstrip().startswith("|")]
        sh = [x for para in paras for x in check_mod.shingles(check_mod.words_of(para), 4)]
        self.tabular = len(sh) < 6 and any(ln.lstrip().startswith("|") for ln in plain(text).split("\n"))
        if self.tabular:                      # mostly a table: each cell's own 3-word runs (the layout wraps a cell across lines)
            cells = [c for ln in plain(text).split("\n") if ln.strip().startswith("|") for c in ln.split("|")]
            sh = [x for c in cells for x in check_mod.shingles(check_mod.words_of(c), 3)]
            self.sh3 = getattr(self, "sh3", None) or {p: set(check_mod.shingles(check_mod.words_of(t), 3)) for p, t in self.text.items()}
        if not sh:
            return None, 0.0
        pages = self.sh3 if self.tabular else self.sh
        hits = {p: sum(1 for s in sh if s in S) for p, S in pages.items() if p >= start}
        if not hits or max(hits.values()) == 0:
            return None, 0.0
        best = max(hits, key=lambda p: (hits[p], -p))
        thr = max(2, 0.08 * len(sh))
        lo = hi = best
        while lo - 1 in hits and hits[lo - 1] >= thr:
            lo -= 1
        while hi + 1 in hits and hits[hi + 1] >= thr:
            hi += 1
        cov = min(1.0, sum(hits[p] for p in range(lo, hi + 1)) / len(sh))
        return (str(lo) if lo == hi else f"{lo}-{hi}"), cov

    def missing_nums(self, text: str, pages: str | None) -> list[str]:
        """numbers of the text not on its pages (a page break may split one: the neighbour pages count)"""
        if not pages:
            return []
        ps = bank_mod._pages(pages)
        pool = collections.Counter()
        for p in range(max(1, ps[0] - 1), min(self.n, ps[-1] + 1) + 1):
            pool.update(self.nums.get(p, {}))
        need = collections.Counter(check_mod.nums(plain(text)))
        return sorted(k for k, v in need.items() if pool[k] < 1)


# ------------------------------------------------------------------------------------------------ sources
def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as fh:
        for chunk in iter(lambda: fh.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def pdf_pages(p: Path) -> int:
    r = subprocess.run(["pdfinfo", str(p)], capture_output=True, text=True)
    m = re.search(r"^Pages:\s+(\d+)", r.stdout, re.M)
    return int(m.group(1)) if m else 0


def has_text(p: Path) -> bool:
    r = subprocess.run(["pdftotext", "-l", "3", str(p), "-"], capture_output=True, text=True)
    return len(re.findall(r"[A-Za-z]{3,}", r.stdout)) > 30


def doc_of(src: dict) -> dict:
    y, m = re.match(r"(\d{4})-(\d{1,2})", src["attempt_sort"]).groups()
    att = MON[int(m)] + y
    scheme = src["scheme"]
    paper = "p6" if scheme == "new" else "p7"
    kind = src["type"].lower()
    series = {"I": "s1", "II": "s2"}.get(src.get("series") or "", None)
    doc = f"{'n' if scheme == 'new' else 'o'}-{paper}-{kind}-{att}" + (f"-{series}" if series else "")
    return {"doc": doc, "scheme": scheme, "paper": paper, "kind": kind, "attempt": att, "series": series}


def files_for(d: dict, src: dict, S: dict, new_entries: dict) -> dict:
    """{qfile, afile, paperfile} (manifest files) for one document; old-scheme files are sm-qbank's, added to sources.json"""
    out: dict[str, str] = {}
    if d["scheme"] == "new":
        fs = {}
        for f, e in S.items():
            if e.get("scheme") == "new" and e.get("paper") == "p6" and e.get("kind") == d["kind"] and e.get("attempt") == d["attempt"] \
                    and (e.get("series") or None) == d["series"] and e.get("origin") != "sm-qbank":
                fs[e.get("part") or "qa"] = f
        if d["kind"] == "rtp" and "qa" in fs:
            out = {"qfile": fs["qa"], "afile": fs["qa"]}
        elif d["kind"] == "mtp" and "q" in fs:
            out = {"qfile": fs["q"]}
            if "a" in fs:
                out["afile"] = fs["a"]
        elif d["kind"] == "pyq":
            a = fs.get("a-6b") or fs.get("a")
            if a:
                out = {"qfile": a, "afile": a}
                if "q" in fs:
                    out["paperfile"] = fs["q"]
            elif "q" in fs:
                out = {"qfile": fs["q"]}
        if out:
            return out
    # sm-qbank's own copies (the old scheme, or a new-scheme file the manifest lacks)
    def add(local: str, part: str, url: str | None) -> str:
        p = SMQ / local
        key = "sm-qbank/" + local
        if key not in S and key not in new_entries:
            new_entries[key] = {"scheme": d["scheme"], "paper": d["paper"], "kind": d["kind"], "attempt": d["attempt"],
                                "attempt_label": f"{MON_NAME[d['attempt'][:3]]} {d['attempt'][3:]}", "series": d["series"], "part": part,
                                "url": url, "listing": None, "source": "mirror" if src.get("source_is_mirror") else "icai",
                                "fetched": src.get("retrieved"), "sha256": sha256(p), "bytes": p.stat().st_size, "pages": pdf_pages(p),
                                "text": "pdf" if has_text(p) else "ocr", "txt": None,
                                "notes": "From ~/CA_PERSONAL/sm-qbank (" + local + "). " + re.sub(r"\s+", " ", src.get("notes") or "").strip(),
                                "origin": "sm-qbank"}
        return key
    lf, la = src.get("local_file"), src.get("local_answers_file")
    if d["kind"] == "mtp":
        out["qfile"] = add(lf, "q", src.get("pdf_url"))
        if la:
            out["afile"] = add(la, "a", src.get("answers_url"))
    else:
        part = "qa" if d["kind"] == "rtp" else "a"
        f = add(lf, part, src.get("pdf_url"))
        out = {"qfile": f, "afile": f}
    return out


# ------------------------------------------------------------------------------------------------ one document
def key_of(qno: str, mcq_pyq: bool) -> tuple[str, int, str, bool]:
    """sm-qbank qno -> (item key, qno, part, is an OR alternative): '1(A)(i)' -> q1a-i; '4(b) (OR)' -> q4b-or; past-paper MCQ '9' -> m9"""
    m = re.match(r"\s*(\d+)\s*(.*)$", qno)
    num, rest = int(m.group(1)), m.group(2).strip()
    toks = [t.lower() for t in re.findall(r"[A-Za-z]+|\d+", rest)]
    alt = bool(toks) and toks[-1] == "or"
    key = ("m" if mcq_pyq else "q") + str(num)
    if toks:
        key += toks[0] + "".join("-" + t for t in toks[1:])
    part = re.sub(r"\s*[-(]*\bOR\b\)?\s*$", "", rest, flags=re.I).strip()
    if alt:
        part = (part + " OR").strip()
    return key, num, part, alt


CHOICE_C = re.compile(r"questions?\s*(?:no\.?\s*)?(\d+)(?:\s*(?:and|&)\s*(\d+))?\s*(?:which\s*)?(?:is|are)\s*compulsory", re.I)
CHOICE_N = re.compile(r"any\s+(\w+)\s+(?:questions?\s+)?(?:out\s+of|out|of|from)\s+(?:the\s+)?(?:remaining|rest)(?:\s+of\s+the)?(?:\s+(\w+))?", re.I)


def choice_of(pg: Pages, desc_nos: list[int], first_page: int) -> tuple[str | None, int | None]:
    """ICAI's printed rule nearest before the first descriptive SM question: 'q1; any 2 of q2-q4' (and its page)"""
    num = lambda w: WORDS.get(w.lower(), int(w) if w.isdigit() else None)   # noqa: E731
    for p in range(first_page, 0, -1):
        t = re.sub(r"\s+", " ", pg.text.get(p, ""))
        for mc in reversed(list(CHOICE_C.finditer(t))):
            mn = CHOICE_N.search(t, mc.end())
            if not mn:
                continue
            if mn.start() - mc.end() > 80:
                continue
            comp = [int(mc.group(1))] + ([int(mc.group(2))] if mc.group(2) else [])
            c, k = max(comp), num(mn.group(1))
            n = num(mn.group(2)) if mn.group(2) and num(mn.group(2)) else len([x for x in desc_nos if x > c])
            if not k or not n or k >= n:
                continue
            rng = set(comp) | set(range(c + 1, c + n + 1))
            if set(desc_nos) <= rng:
                comp = [x for x in comp if x in desc_nos]          # 'Question 1 and 2 are compulsory' where Q1 is the MCQs
                return "; ".join(([", ".join("q%d" % x for x in comp)] if comp else []) + [f"any {k} of q{c + 1}-q{c + n}"]), p
    return None, None


def convert(path: Path, S: dict, new_entries: dict, syl: dict) -> dict:
    data = json.loads(path.read_text())
    src, qs = data["source"], data["questions"]
    d = doc_of(src)
    files = files_for(d, src, dict(S, **new_entries), new_entries)
    allS = dict(S, **new_entries)
    pq = Pages(files["qfile"], allS[files["qfile"]])
    pa = Pages(files["afile"], allS[files["afile"]]) if files.get("afile") else None
    if pa and files.get("afile") == files["qfile"]:
        pa = pq
    unpub = not files.get("afile") or not any((q.get("answer") or "").strip() for q in qs if q["kind"] == "descriptive")
    problems: list[str] = []
    notes_item: dict[str, str] = {}
    blocks: list[str] = []
    cases: dict[str, dict] = {}
    items: list[dict] = []
    keys = set()
    cur_case = None
    for q in qs:
        is_mcq = q["kind"] in ("mcq", "case-mcq")
        key, num, part, alt = key_of(q["qno"], is_mcq and d["kind"] == "pyq")
        if key in keys:
            problems.append(f"item key {key} twice (qno {q['qno']})")
            key += "-2"
        keys.add(key)
        text = q.get("question") or ""
        pointer = REF_NOTE.match(text)
        if pointer:
            text = text[pointer.end():]
        case_key = None
        if q["kind"] == "case-mcq":
            if not pointer:
                head, tail = split_case(text)
                if head:
                    ml = re.match(r"\(([A-Z])\)", part or "")
                    ck = "c" + str(num) + (ml.group(1).lower() if ml else "")
                    while ck in cases:
                        ck += "x"
                    cases[ck] = {"key": ck, "qno": num, "text": head}
                    cur_case = ck
                    text = tail
            case_key = cur_case
        else:
            cur_case = None
        text = strip_label(text, part)
        opts = q.get("options") or []
        if is_mcq and [o["label"].lower() for o in opts] != ["a", "b", "c", "d"]:
            problems.append(f"{key}: options are {[o['label'] for o in opts]}, not (a)-(d)")
        kq = (q.get("mcq_answer") or "").strip().upper()
        ans = (q.get("answer") or "").strip() if not is_mcq else ""
        right = next((o["text"] for o in opts if o["label"].lower() == kq.lower()), "") if is_mcq else ""
        tags, tnote = tags_for(q, text + "\n" + right, ans or "")
        oos = str(q.get("chapter")) == "OUT_OF_SYLLABUS"
        note_bits = []
        if oos:
            note_bits.append("Out of the 2023 syllabus by sm-qbank's judgement" + (f": {q['mapping_note']}" if q.get("mapping_note") else ""))
        elif q.get("chapter_source") == "mapped" and q.get("mapping_note"):
            note_bits.append("Chapter mapped by sm-qbank: " + q["mapping_note"])
        if tnote and not oos:
            note_bits.append(tnote)
        items.append({"key": key, "qno": num, "part": part, "alt": key[:-3] if alt else None, "type": "mcq" if is_mcq else "descriptive",
                      "marks": q.get("marks"), "key_letter": kq or None, "text": md_of(text),
                      "options": [(o["label"].lower(), md_of(o["text"]).replace("\n\n", " ")) for o in opts] if is_mcq else None,
                      "answer": md_of(ans) if ans else "", "tags": tags, "oos": oos, "note": "; ".join(note_bits) or None,
                      "case": case_key, "sm_id": q["id"]})
    # pages
    qstart = 1
    for c in cases.values():
        c["q"], c["cov"] = pq.locate(c["text"])
    for it in items:
        qtext = it["text"] + ("\n" + "\n".join(t for _, t in it["options"]) if it["options"] else "")
        it["q"], it["qcov"] = pq.locate(qtext)
        if it["q"] is None and it["case"] and cases.get(it["case"], {}).get("q"):
            it["q"], it["qcov"] = cases[it["case"]]["q"], 1.0       # a one-line stem printed with its case
        it["a"], it["acov"] = (pa.locate(it["answer"], start=1) if it["answer"] and pa else (None, 1.0))
        it["atab"] = bool(it["answer"] and pa and pa.tabular)
        for side, cov, txt, pg in (("question", it["qcov"], qtext, pq), ("answer", it["acov"], it["answer"], pa)):
            if not txt or pg is None:
                continue
            nw = len(check_mod.words_of(plain(txt)))
            short = nw < 8
            # a short sub-question sm-qbank prefixed with its question's shared line ("Distinguish between the following: …", printed once
            # above (a), (b) …) has few runs that survive the label between them: 30 % is enough to place it
            need = 0.3 if (side == "answer" and it["atab"]) or nw < 16 else 0.5 if it["type"] == "mcq" else 0.6
            if (it["q"] if side == "question" else it["a"]) is None:
                problems.append(f"{it['key']}: {side} not found in {pg.file}")
            elif cov < need and not short:
                problems.append(f"{it['key']}: only {int(cov * 100)} % of the {side}'s word runs are on its pages")
            miss = pg.missing_nums(txt, it["q"] if side == "question" else it["a"])
            if miss:
                problems.append(f"{it['key']}: {side} numbers not on its pages: {', '.join(miss[:6])}")
    # a block whose pages were not found (a draft): the pages between its located neighbours, so the file still validates; the person who
    # finishes the draft confirms them
    seq = [("q", it) for it in items]
    known = [i for i, (_, it) in enumerate(seq) if it["q"]]
    for i, (_, it) in enumerate(seq):
        if it["q"] is None:
            lo = max([bank_mod._pages(seq[j][1]["q"])[0] for j in known if j < i] or [1])
            hi = min([bank_mod._pages(seq[j][1]["q"])[-1] for j in known if j > i] or [pq.n])
            it["q"] = str(lo) if lo >= hi else f"{lo}-{hi}"
            it["note"] = "; ".join(x for x in [it["note"], "q: pages estimated by the import (text not matched): confirm them"] if x)
        if it["answer"] and it["a"] is None and pa is not None:
            it["a"] = it["q"]
            it["note"] = "; ".join(x for x in [it["note"], "a: pages estimated by the import (text not matched): confirm them"] if x)
    for c in cases.values():
        if c["q"] is None:
            first = next((it for it in items if it["case"] == c["key"]), None)
            c["q"] = first["q"] if first else "1"
            problems.append(f"case {c['key']}: not found in {pq.file}")
        elif c["cov"] < 0.6:
            problems.append(f"case {c['key']}: only {int(c['cov'] * 100)} % of its word runs are on its pages")
    # marks
    if d["kind"] != "rtp":
        # sm-qbank leaves marks null only where the document it read prints none (a past paper's Suggested Answers print no marks for the
        # Part I MCQs, whose OMR paper is separate; a few answers files omit them): 'marks: none' says so, with a note
        for it in items:
            if not it["marks"]:
                it["marks"] = "none"
                it["note"] = "; ".join(x for x in [it["note"], "ICAI's " + ("Suggested Answers print" if d["kind"] == "pyq" else "paper prints")
                                                    + " no marks for this question"] if x)
    else:
        for it in items:
            it["marks"] = None
    # tags
    untagged = [it["key"] for it in items if not it["tags"] and not it["oos"]]
    if untagged:
        problems.append(f"untagged: {', '.join(untagged)}")
    # choice
    choice, cpage = None, None
    desc = [it for it in items if it["type"] == "descriptive" and it["q"]]
    if d["kind"] in ("mtp", "pyq") and desc:
        first = min(bank_mod._pages(it["q"])[0] for it in desc)
        choice, cpage = choice_of(pq, sorted({it["qno"] for it in desc}), first)
    # ------------------------------------------------------------------------- write
    status = "imported" if not problems else "draft"
    note = (f"Imported by tools/bank/smimport.py from ~/CA_PERSONAL/sm-qbank/{path.relative_to(SMQ).as_posix()} (ICAI's text, its words matched to "
            f"the PDF by sm-qbank's provenance.py; paragraph breaks follow sm-qbank's extraction). Pages, tags, oos and the choice rule are "
            f"ours. sm-qbank: " + re.sub(r"\s+", " ", src.get("notes") or "").strip())
    if problems:
        note += " | TO FINISH: " + " / ".join(problems[:12]) + (f" (+{len(problems) - 12} more)" if len(problems) > 12 else "")
    if d["kind"] in ("mtp", "pyq") and desc and not choice:
        note += " | No choice rule found in the PDF text: add 'choice:' from ICAI's instructions before this paper can be sat."
    head = [f"doc: {d['doc']}", f"paper: {d['paper']}", f"kind: {d['kind']}", f"attempt: {d['attempt']}"]
    if d["series"]:
        head.append(f"series: {d['series']}")
    head.append("section: sm")
    head.append(f"qfile: {files['qfile']}")
    if files.get("afile") and not unpub:
        head.append(f"afile: {files['afile']}")
    if files.get("paperfile"):
        head.append(f"paperfile: {files['paperfile']}")
    if unpub:
        head.append("answers: unpublished")
    if choice:
        head.append(f"choice: {choice}")
    head += [f"status: {status}", "by: sm-import", f"date: {TODAY}", "note: " + note.replace("\n", " ")]
    out = ["<!-- PassBook ICAI bank: docs/ICAI_BANK.md. Text under Instructions, Case, Question, Options and Answer is ICAI's, verbatim. "
           "Generated by tools/bank/smimport.py from ~/CA_PERSONAL/sm-qbank: fix the source or the tool, or take the file over by hand "
           "(then drop 'by: sm-import'). -->", "---", *head, "---", ""]
    written_cases = set()
    for it in items:
        if it["case"] and it["case"] not in written_cases:
            c = cases[it["case"]]
            written_cases.add(c["key"])
            out += ["---", f"case: {c['key']}", f"qno: {c['qno']}"] + ([f"q: {c['q']}"] if c["q"] else []) + ["---", "#### Case", c["text_md"] if "text_md" in c else md_of(c["text"]), ""]
        hb = [f"item: {it['key']}"]
        if it["case"]:
            hb.append(f"case: {it['case']}")
        hb.append(f"qno: {it['qno']}")
        if it["part"]:
            hb.append(f"part: {it['part']}")
        if it["marks"]:
            hb.append(f"marks: {it['marks']}")         # a number, or 'none' where ICAI prints none
        hb.append(f"type: {it['type']}")
        if it["type"] == "mcq":
            hb.append(f"key: {it['key_letter'] if it['key_letter'] in ('A', 'B', 'C', 'D') else 'unpublished'}")
        if it["alt"]:
            hb.append(f"alt: {it['alt']}")
        if it["tags"]:
            hb.append("tags: " + ", ".join(it["tags"]))
        if it["oos"]:
            hb.append("oos: yes")
        if it["note"]:
            hb.append("note: " + it["note"])
        if it["q"]:
            hb.append(f"q: {it['q']}")
        if it["a"] and it["answer"] and not unpub:
            hb.append(f"a: {it['a']}")
        out += ["---", *hb, "---"]
        if it["text"]:
            out += ["#### Question", it["text"]]
        if it["options"]:
            out += ["#### Options"] + [f"({lab.upper()}) {t}" for lab, t in it["options"]]      # capitals, as the guide writes them (§9.4)
        if it["answer"] and not unpub:
            out += ["#### Answer", it["answer"]]
        out.append("")
    folder = ROOT / "bank" / "items" / d["scheme"] / d["paper"]
    target = folder / f"{d['doc']}.sm.md"
    return {"doc": d["doc"], "target": target, "text": "\n".join(out).rstrip() + "\n", "status": status, "problems": problems,
            "items": len(items), "cases": len(cases), "choice": choice, "src": path.name, "kind": d["kind"], "scheme": d["scheme"],
            "tagged_sub": sum(1 for it in items if it["tags"] and it["tags"][0].count(".") == 2),
            "tagged_ch": sum(1 for it in items if it["tags"] and it["tags"][0].count(".") == 1), "oos": sum(1 for it in items if it["oos"])}


def main(argv: list[str]) -> int:
    dry = "--dry" in argv
    only = argv[argv.index("--only") + 1] if "--only" in argv else None
    rep = argv[argv.index("--report") + 1] if "--report" in argv else None
    syl = syl_mod.load()
    S = json.loads(SOURCES.read_text())
    files = S["files"]
    new_entries: dict = {}
    results = []
    for f in sorted((SMQ / "data").glob("*.json")):
        if only and only not in f.stem:
            continue
        r = convert(f, files, new_entries, syl)
        results.append(r)
        print(f"{r['doc']:28s} {r['items']:3d} items {r['cases']} cases  {r['status']:8s} choice={r['choice'] or '-':22s} "
              f"{len(r['problems'])} problem(s){': ' + r['problems'][0] if r['problems'] else ''}")
    if not dry:
        if new_entries:
            S["files"] = dict(sorted(dict(files, **new_entries).items()))
            tmp = SOURCES.with_suffix(".tmp")
            tmp.write_text(json.dumps(S, ensure_ascii=False, indent=1) + "\n")
            os.replace(tmp, SOURCES)
        for r in results:
            # a file a person has taken over ('by:' is no longer sm-import) is theirs: never overwritten
            if r["target"].exists() and not re.search(r"(?m)^by:\s*sm-import\s*$", r["target"].read_text()):
                print(f"kept {r['target'].name}: taken over by hand")
                continue
            r["target"].parent.mkdir(parents=True, exist_ok=True)
            tmp = r["target"].with_suffix(".tmp")
            tmp.write_text(r["text"])
            os.replace(tmp, r["target"])
    tot = collections.Counter()
    for r in results:
        tot["items"] += r["items"]
        tot[r["status"]] += 1
        tot["sub"] += r["tagged_sub"]
        tot["ch"] += r["tagged_ch"]
        tot["oos"] += r["oos"]
    print(f"{len(results)} documents, {tot['items']} items: {tot['imported']} imported, {tot['draft']} draft | tags: {tot['sub']} by sub-topic, "
          f"{tot['ch']} by chapter only, {tot['oos']} out of syllabus | {len(new_entries)} sm-qbank files added to bank/sources.json")
    if rep:
        Path(rep).write_text(json.dumps([{k: v for k, v in r.items() if k not in ("text", "target")} for r in results], indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
