#!/usr/bin/env python3
"""Build the CA Inter Strategic Management question bank HTML from data/*.json.

No third-party deps. Tolerant of partial data so it can be run while sourcing
is still in progress. See SPEC.md for the record schema.

Usage: python3 build.py
Output: site/index.html  (then make-pdf.js turns it into the PDF)
"""
from __future__ import annotations

import html
import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
SITE = ROOT / "site"
ASSETS = ROOT / "assets"

CHAPTERS = [
    (1, "Introduction to Strategic Management"),
    (2, "Strategic Analysis: External Environment"),
    (3, "Strategic Analysis: Internal Environment"),
    (4, "Strategic Choices"),
    (5, "Strategy Implementation and Evaluation"),
]
CH_NAME = dict(CHAPTERS)

# source type -> (label, css suffix, long description, sort rank within a chapter)
TYPES = {
    "PYQ": ("Past Exam", "pyq", "Asked in a real ICAI examination", 0),
    "RTP": ("RTP", "rtp", "ICAI Revision Test Paper", 1),
    "MTP": ("MTP", "mtp", "ICAI Mock Test Paper", 2),
}

MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July",
               "August", "September", "October", "November", "December"]

MONTHS = {
    "january": 1, "jan": 1, "february": 2, "feb": 2, "march": 3, "mar": 3,
    "april": 4, "apr": 4, "may": 5, "june": 6, "jun": 6, "july": 7, "jul": 7,
    "august": 8, "aug": 8, "september": 9, "sept": 9, "sep": 9,
    "october": 10, "oct": 10, "november": 11, "nov": 11, "december": 12, "dec": 12,
}

E = html.escape

# ---------------------------------------------------------------- sanitation
# ICAI's own running heads and the next chapter's heading often bleed into an
# extracted question or answer. Strip those artefacts wherever they appear.

JUNK = [
    re.compile(r"\s*Chapter\s*\d+\s*[-–—:]\s*(?:Introduction to Strategic Management|"
               r"Strategic Analysis\s*:?\s*(?:External|Internal) Environment|Strategic Choices|"
               r"Strategy Implementation and Evaluation)\s*", re.I),
    re.compile(r"\s*SECTION\s*[–-]?\s*[AB]\s*:?\s*(?:FINANCIAL MANAGEMENT|STRATEGIC MANAGEMENT|"
               r"ENTERPRISE INFORMATION SYSTEMS|INFORMATION TECHNOLOGY)\s*", re.I),
    re.compile(r"\s*PAPER\s*[–-]?\s*\d+[AB]?\s*:?\s*(?:FINANCIAL MANAGEMENT|STRATEGIC MANAGEMENT)"
               r"(?:\s*&\s*STRATEGIC MANAGEMENT)?\s*", re.I),
    re.compile(r"\s*(?:REVISION TEST PAPER|MOCK TEST PAPER|SUGGESTED ANSWERS?/?\s*HINTS?)\s*", re.I),
    re.compile(r"\s*INTERMEDIATE\s*:?\s*GROUP\s*[–-]?\s*I*\s*", re.I),
    re.compile(r"\s*Descriptive Questions\s*", re.I),
    re.compile(r"^\s*\d{1,3}\s*$", re.M),            # bare page numbers
]


# words the PDF text layer split in two (kerning gaps, watermark removal). Each one was
# checked in context; genuine pairs such as "to ward off" are deliberately not here.
SPLIT_WORDS = [
    "for mulate", "s trategy", "intellec tual", "managem ent", "proa ctive", "sustain ed",
    "Org anization", "se rvices", "custom ers", "p rivacy", "busines s", "i nstead",
    "he alth", "g rowth", "af ter", "imp lemented", "panoram ic", "Whic h", "regiona l",
    "ma rket", "e ntails", "entr epreneur", "cert ain", "St rategic", "ni che",
    "developm ent", "proj ected", "beg inning", "c onsistent", "orga nization",
    "pr oblems", "manag ers", "o pportunities", "diversi fication", "mark et",
    "retrenc hment", "liquidatio n", "Welln ow", "organizatio ns", "Commo n", "pres s",
    "c omplex", "pre sence", "ameni ties", "inves tments", "ma jor", "ma rketing",
    "res tructure", "system s", "in vestments", "administratio n", "perf ormance", "s uch",
    "ac hieving", "an alysis", "b igger", "busi ness", "c ontrolling", "c reating",
    "comp any", "compa ny", "competenc ies", "d efine", "d efined", "diversif ication",
    "e nterprise", "enterin g", "existi ng", "f emales", "fo llow", "fre e", "g iving",
    "identi fy", "impl emented", "l ot", "manuf acturers", "marke ting", "matri x",
    "mea ningful", "medic ine", "n ew", "organizat ion", "p lanned", "peopl e",
    "pla nning", "pr ofitability", "processe s", "roo t", "str ategy", "strateg ies",
    "strateg y", "structu re", "t ime", "te chnologies", "the ir", "yout h",
]
SPLIT_RX = re.compile("|".join(
    r"\b" + re.escape(a) + r"[ \t]*\n?[ \t]*" + re.escape(b) + r"\b"
    for a, b in (w.split(" ") for w in SPLIT_WORDS)))


def sanitize(t: str) -> str:
    if not t:
        return ""
    for rx in JUNK:
        t = rx.sub(" ", t)
    t = SPLIT_RX.sub(lambda m: re.sub(r"\s+", "", m.group(0)), t)
    # ICAI's Wingdings/Symbol bullets come through as private-use code points with no
    # glyph; ♦ ➢ ● are the other bullet marks ICAI uses
    t = re.sub(r"[\uf0a7\uf0a8\uf0b7\uf0d8\uf0fc\uf076\u2666\u27a2\u25cf]", "•", t)
    t = "\n".join(ln if is_table_row(ln) else re.sub(r"[ \t]+•[ \t]+(?=\S)", "\n• ", ln)
                  for ln in t.split("\n"))                 # inline bullet -> its own line
    # a hyphen left dangling by a line break belongs to a compound ("cross- functional",
    # "pan- India"): close the gap but keep the hyphen. Leave suspended hyphens alone
    # ("business- and IT-related").
    t = re.sub(r"([A-Za-z])-[ \t]*\n?[ \t]*(?!(?:and|or|to)\b)([A-Za-z])", r"\1-\2", t)
    t = re.sub(r"[ \t]{2,}", " ", t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()


# ---------------------------------------------------------------- topic vocabulary
# Detected from the question text so tags are consistent across every attempt,
# rather than relying on each extractor's ad-hoc keywords.

def _p(*alts: str) -> re.Pattern:
    return re.compile("|".join(alts), re.I)


# (topic, home chapter per ICAI's 2023 syllabus, detection pattern).
# Chapters come from syllabus.json's verified per-chapter topic lists — note that ICAI puts
# value chain in Ch 2, Porter's generic strategies in Ch 3 and the portfolio matrices in Ch 4.
CANON: list[tuple[str, object, re.Pattern]] = [
    # --- Chapter 1
    ("vision", 1, _p(r"\bvision\b")),
    ("mission", 1, _p(r"\bmission statement", r"\bmission\b")),
    ("objectives and goals", 1, _p(r"goals? (?:and|&) objectives", r"objectives? (?:and|&) goals", r"characteristics of (?:good |ideal )?objectives", r"\bwhat are ['‘’]?objectives", r"meaningful objectives", r"strategic objectives", r"setting (?:of )?objectives", r"ideal objectives")),
    ("values", 1, _p(r"\bcore values\b")),
    ("strategic intent", 1, _p(r"strategic intent")),
    ("levels of strategy", 1, _p(r"corporate level", r"business level", r"functional level",
                                 r"network level", r"levels? (?:of|in) strateg")),
    ("limitations of strategic management", 1, _p(r"limitation")),
    ("nature of strategic management", 1, _p(r"nature of strategic management",
                                             r"concept of strategy", r"business policy")),
    ("proactive and reactive strategy", 1, _p(r"proactive", r"reactive")),
    # --- Chapter 2
    ("PESTLE analysis", 2, _p(r"\bpestle\b", r"\bpest\b")),
    ("macro environment", 2, _p(r"macro.{0,12}environment", r"micro.{0,12}environment",
                                r"external environment")),
    ("internationalisation", 2, _p(r"globali[sz]ation", r"internationali[sz]ation",
                                   r"international environment")),
    ("product life cycle", 2, _p(r"product life cycle", r"\bplc\b", r"industry life cycle")),
    ("value chain analysis", 2, _p(r"value chain")),
    ("Porter's five forces", 2, _p(r"five forces", r"porter'?s? five")),
    ("industry attractiveness", 2, _p(r"industry analysis", r"industry attractiveness",
                                      r"industry environment")),
    ("experience curve", 2, _p(r"experience curve")),
    ("customer analysis", 2, _p(r"customer analysis", r"customer behaviour", r"understanding customer")),
    ("competitive landscape", 2, _p(r"competitive landscape", r"competitor analysis",
                                    r"competitive intelligence")),
    ("key factors for competitive success", 2, _p(r"key (?:success )?factors? for competitive",
                                                  r"key success factor", r"critical success factor")),
    # --- Chapter 3
    ("Mendelow's matrix", 3, _p(r"mendelow", r"stakeholder (?:mapping|analysis|management|matrix)", r"key stakeholders", r"power.{0,12}interest")),
    ("strategic group mapping", 3, _p(r"strategic group")),
    ("strategic drivers", 3, _p(r"strategic driver")),
    ("strategic marketing techniques", 3, _p(r"demarketing", r"augmented marketing",
                                             r"social marketing", r"synchro.?marketing",
                                             r"concentrated marketing", r"differential marketing",
                                             r"relationship marketing", r"person marketing",
                                             r"place marketing", r"organi[sz]ation marketing",
                                             r"direct marketing")),
    ("core competence", 3, _p(r"core competenc")),
    ("resources and capabilities", 3, _p(r"resources? and capabilit", r"\btangible\b",
                                         r"\bintangible\b")),
    ("SWOT analysis", 3, _p(r"\bswot\b", r"\btows\b")),
    ("competitive advantage", 3, _p(r"competitive advantage")),
    ("cost leadership", 3, _p(r"cost leadership")),
    ("differentiation strategy", 3, _p(r"differentiation(?! between)(?! of )")),
    ("focus strategy", 3, _p(r"focus(?:ed)? (?:strategy|low.cost|differentiation)", r"\bniche\b")),
    ("best-cost provider strategy", 3, _p(r"best.cost provider")),
    # --- Chapter 4
    ("stability strategy", 4, _p(r"stability strateg")),
    ("expansion strategy", 4, _p(r"expansion strateg", r"growth strateg")),
    ("market penetration", 4, _p(r"market penetration")),
    ("market development", 4, _p(r"market development")),
    ("product development", 4, _p(r"product development")),
    ("diversification", 4, _p(r"diversif", r"concentric", r"conglomerate")),
    ("vertical integration", 4, _p(r"vertical integration", r"backward integration",
                                   r"forward integration")),
    ("horizontal integration", 4, _p(r"horizontal integration")),
    ("mergers and acquisitions", 4, _p(r"\bmerger", r"acquisition", r"takeover")),
    ("strategic alliance", 4, _p(r"strategic alliance", r"joint venture")),
    ("innovation", 4, _p(r"\binnovation as\b", r"innovation strateg")),
    ("turnaround strategy", 4, _p(r"turnaround")),
    ("retrenchment", 4, _p(r"retrenchment")),
    ("divestment and liquidation", 4, _p(r"divest", r"liquidat")),
    ("combination strategy", 4, _p(r"combination strateg")),
    ("Ansoff matrix", 4, _p(r"\bansoff\b", r"product.market growth")),
    ("ADL matrix", 4, _p(r"\badl\b", r"arthur d\.? little")),
    ("BCG matrix", 4, _p(r"\bbcg\b", r"boston consulting", r"growth.share matrix",
                         r"cash cow", r"question mark")),
    ("GE matrix", 4, _p(r"nine.cell", r"\bge matrix\b", r"general electric", r"stop.?light")),
    # --- Chapter 5
    ("strategic management process", 5, _p(r"strategic management process",
                                           r"stages in strategic management")),
    ("formulation versus implementation", 5, _p(r"formulation (?:vs|versus|and) implementation",
                                                r"strategy implementation", r"implementing strateg")),
    ("strategic change", 5, _p(r"strategic change", r"change management")),
    ("digital transformation", 5, _p(r"digital transformation")),
    ("McKinsey 7S framework", 5, _p(r"\b7.?s\b", r"mckinsey 7", r"shared values")),
    ("organisation structure", 5, _p(r"organi[sz]ational? structure", r"\bsbu\b",
                                     r"matrix structure", r"divisional structure",
                                     r"functional structure", r"network structure",
                                     r"hourglass", r"simple structure")),
    ("organisational culture", 5, _p(r"organi[sz]ation(?:al)? culture", r"\bculture\b")),
    ("strategic leadership", 5, _p(r"strategic leader", r"transformational leader",
                                   r"transactional leader")),
    ("strategic control", 5, _p(r"strategic control", r"premise control", r"implementation control",
                                r"strategic surveillance", r"special alert", r"operational control")),
    ("strategic performance measures", 5, _p(r"performance measure")),
    # --- dropped from the 2023 syllabus
    ("business process reengineering", "OOS", _p(r"reengineering", r"\bbpr\b")),
    ("benchmarking", "OOS", _p(r"benchmark")),
    ("Six Sigma", "OOS", _p(r"six sigma")),
    ("total quality management", "OOS", _p(r"total quality", r"\btqm\b")),
    ("balanced scorecard", "OOS", _p(r"balanced scorecard")),
    ("supply chain and logistics strategy", "OOS", _p(r"supply chain", r"logistics manage")),
    ("marketing mix", "OOS", _p(r"marketing mix", r"\bfour p'?s\b", r"\b4 p'?s\b")),
    ("functional strategy", "OOS", _p(r"functional strateg", r"financial strateg",
                                      r"production strateg", r"\bhr strateg",
                                      r"research and development strateg")),
    ("strategy audit", "OOS", _p(r"strategy audit")),
]

TOPIC_CH = {name: ch for name, ch, _ in CANON}


BAD_TAG = re.compile(r"^(?:mcq|mcqs|question|answer|case|scenario|sm|strategic management|n/?a)$", re.I)


def detect_topics(q: dict, limit: int = 4) -> list[str]:
    """Canonical topics found in the question; topics found only in the answer are kept
    just when they belong to the question's own chapter (answers mention many concepts
    in passing)."""
    qt = q.get("question") or ""
    at = (q.get("answer") or "")[:700]
    ch = norm_chapter(q.get("chapter"))
    own = "OOS" if ch == "OOS" else (int(ch) if ch.isdigit() else None)
    hits_q = [name for name, _ch, rx in CANON if rx.search(qt)]
    if len(hits_q) >= 2 or own is None:
        hits = hits_q
    else:
        hits = hits_q + [n for n, c, rx in CANON
                         if n not in hits_q and c == own and rx.search(at)]
    if not hits:
        hits = [str(t).strip().lower() for t in (q.get("topic_tags") or [])
                if str(t).strip() and not BAD_TAG.match(str(t).strip())]
    return hits[:limit]


# ---------------------------------------------------------------- case scenarios
# The first sub-question of a case set carries the whole scenario; the rest carry only a
# compiler-written pointer such as "[Shared case scenario — see question 1(i).]".
# Re-link every sub-question to its scenario so a sub-question mapped to another chapter
# still shows its case, and drop the pointer (it is not ICAI's text).

REF_NOTE = re.compile(
    r"^\s*[\[(]\s*(?:shared case scenario|based on the shared|refer to the (?:shared )?case|"
    r"see the (?:shared )?case|case scenario (?:as )?(?:given|set out))[^\n]*(?:\n|$)\s*",
    re.I)


def link_scenarios(qs: list[dict], src_key: str) -> None:
    group = None
    n = 0
    for q in qs:
        if (q.get("kind") or "") != "case-mcq":
            group = None
            continue
        text = q.get("question") or ""
        m = REF_NOTE.match(text)
        if m and group is not None:
            q["question"] = text[m.end():].strip()
            q["_scenario"], q["_scen_id"] = group
            continue
        if m:                                      # pointer with no scenario seen yet
            q["question"] = text[m.end():].strip()
            continue
        # a scenario-bearing record: split the case from its own sub-question
        cut = text.rfind("\n\n")
        if cut < 0:
            cut = text.rfind("\n")
        head, tail = (text[:cut].strip(), text[cut:].strip()) if cut > 0 else ("", text)
        if len(head) >= 300 and 8 <= len(tail) <= 700:
            n += 1
            group = (head, f"{src_key}#{n}")
            q["question"] = tail
            q["_scenario"], q["_scen_id"] = group
        else:
            group = None


# ---------------------------------------------------------------- loading

def attempt_key(rec: dict) -> tuple[int, int]:
    """(year, month) for sorting. Falls back to parsing the attempt string."""
    s = (rec.get("attempt_sort") or "").strip()
    m = re.match(r"(\d{4})-(\d{1,2})", s)
    if m:
        return int(m.group(1)), int(m.group(2))
    a = (rec.get("attempt") or "").lower()
    ym = re.search(r"(19|20)\d{2}", a)
    year = int(ym.group(0)) if ym else 0
    month = 0
    for name, num in MONTHS.items():
        if re.search(rf"\b{name}\b", a):
            month = num
            break
    return year, month


def load() -> tuple[list[dict], list[dict]]:
    """Returns (questions, sources). Each question carries its source inline."""
    questions: list[dict] = []
    sources: list[dict] = []
    if not DATA.exists():
        return questions, sources
    for f in sorted(DATA.glob("*.json")):
        try:
            doc = json.loads(f.read_text())
        except Exception as exc:                       # noqa: BLE001
            print(f"  !! skipping unreadable {f.name}: {exc}")
            continue
        src = doc.get("source") or {}
        if not src.get("type"):
            print(f"  !! skipping {f.name}: no source.type")
            continue
        src["_file"] = f.name
        src["_year"], src["_month"] = attempt_key(src)
        if src["_year"] and src["_month"]:       # one spelling per attempt ("Nov"/"November")
            src["_attempt_raw"] = src.get("attempt")
            src["attempt"] = f"{MONTH_NAMES[src['_month']]} {src['_year']}"
        qs = doc.get("questions") or []
        src["_count"] = len(qs)
        link_scenarios(qs, f.stem)
        sources.append(src)
        for k, q in enumerate(qs):
            q["_ord"] = k
            q["question"] = sanitize(q.get("question") or "")
            q["answer"] = sanitize(q.get("answer") or "")
            if q.get("_scenario"):
                q["_scenario"] = sanitize(q["_scenario"])
            if len(substance(q)) < 25:
                continue
            q["_src"] = src
            q["_topics"] = detect_topics(q)
            questions.append(q)
    return questions, sources


def substance(q: dict) -> str:
    """The question as a reader sees it. ICAI sometimes prints a one-word MCQ stem
    ("Mission") and puts the substance in the options, so count those too."""
    opts = " ".join(sorted((o.get("text") or "") for o in (q.get("options") or [])
                           if isinstance(o, dict)))
    return ((q.get("question") or "") + " " + opts).strip()


TYPE_RANK = {"PYQ": 0, "RTP": 1, "MTP": 2}


# ICAI words the same question slightly differently from paper to paper: a stem split
# off as "Distinguish between the following:", "organisation" in one and "organization"
# in the next. Normalise those for matching only; the text shown is never changed.
STEM_NORM = [
    (re.compile(r"^\s*(?:distinguish|differentiate)\s+between\s+(?:the\s+following\s*)?"
                r"(?:[:\-–]\s*)?", re.I), "distinguish between "),
    (re.compile(r"^\s*write\s+(?:a\s+)?short\s+notes?\s+on\s+(?:the\s+following\s*)?"
                r"(?:[:\-–]\s*)?", re.I), "short note on "),
]


def dedupe_key(q: dict) -> str:
    t = substance(q)
    for rx, rep in STEM_NORM:
        t = rx.sub(rep, t, count=1)
    t = ((q.get("_scenario") or "")[:240] + " " + t).lower()
    t = re.sub(r"is(ation|ations|e|ed|es|ing)\b", r"iz\1", t)     # British / American
    key = re.sub(r"\W+", "", t)[:380]
    return key or f"_id:{id(q)}"


def dedupe(questions: list[dict]) -> tuple[list[dict], int]:
    """Collapse the same question appearing in several ICAI documents into one entry.

    Keeps the most authoritative sighting (past exam > RTP > MTP, newest first), keeps the
    fullest answer found anywhere in the group, and records the other sightings so the
    reader can see the question has been asked repeatedly.
    """
    groups: dict[str, list[dict]] = defaultdict(list)
    order: list[str] = []
    for q in questions:
        key = dedupe_key(q)
        if not key:
            key = f"_u{len(order)}"
        if key not in groups:
            order.append(key)
        groups[key].append(q)

    out: list[dict] = []
    merged = 0
    for key in order:
        grp = groups[key]
        grp.sort(key=lambda q: (TYPE_RANK.get((q["_src"].get("type") or "").upper(), 9),
                                -q["_src"]["_year"], -q["_src"]["_month"]))
        keep = grp[0]
        if len(grp) > 1:
            merged += len(grp) - 1
            best = max(grp, key=lambda q: len((q.get("answer") or "")))
            if len(best.get("answer") or "") > len(keep.get("answer") or ""):
                keep["answer"] = best["answer"]
            keep["_also"] = [q["_src"] for q in grp[1:]]
            # a chapter ICAI tagged itself beats a mapped one
            icai = next((q for q in grp if q.get("chapter_source") == "icai"), None)
            if icai is not None and keep.get("chapter_source") != "icai":
                keep["chapter"] = icai.get("chapter")
                keep["chapter_source"] = "icai"
        out.append(keep)
    return out, merged


def norm_chapter(v) -> str:
    """Normalise the chapter field to '1'..'5' | 'MCQ' | 'OOS'."""
    if v is None:
        return "MCQ"
    s = str(v).strip().upper()
    if s.startswith("OUT") or s == "OOS":
        return "OOS"
    if s in {"MCQ", "MCQS", "CASE", "CASE-MCQ"}:
        return "MCQ"
    m = re.search(r"[1-5]", s)
    return m.group(0) if m else "MCQ"


# ---------------------------------------------------------------- tiny markdown

BOLD = re.compile(r"\*\*(?=\S)(.+?)(?<=\S)\*\*", re.S)
ITAL = re.compile(r"(?<![\*\w])\*(?=[^\s*])(.+?)(?<=[^\s*])\*(?!\*)", re.S)


def inline(t: str) -> str:
    t = E(t)
    t = BOLD.sub(r"<strong>\1</strong>", t)
    t = ITAL.sub(r"<em>\1</em>", t)
    return t


def is_table_row(ln: str) -> bool:
    return ln.strip().startswith("|") and ln.count("|") >= 2


def is_sep_row(ln: str) -> bool:
    s = ln.strip()
    return bool(s) and set(s) <= set("|-: ") and "-" in s


# ICAI's own sub-point labels: (i) (ii) … (a) (b) … 1. 2. … i. ii. — kept verbatim
MARK = re.compile(r"\s*(\((?:[ivxIVX]{1,5}|[a-zA-Z]|\d{1,2})\)|(?:[ivx]{1,5}|[a-h]|\d{1,2})[.)])"
                  r"\s+(\S.*)$")
ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii",
         "xiv", "xv"]
ALPHA = list("abcdefghijklmn")
BULLET = re.compile(r"\s*([-•*•▪●◦])\s+(.*)$")
# a label sitting mid-line after a full stop / colon / semicolon: "... done. (ii) Next"
INLINE_MARK = re.compile(r"(?<=[.:;?!”\"’)])[ \t]+\(([ivx]{1,4}|[a-n])\)[ \t]+(?=\S)")


def _succ(tok: str) -> set[str]:
    out = set()
    if tok in ROMAN and ROMAN.index(tok) + 1 < len(ROMAN):
        out.add(ROMAN[ROMAN.index(tok) + 1])
    if tok in ALPHA and ALPHA.index(tok) + 1 < len(ALPHA):
        out.add(ALPHA[ALPHA.index(tok) + 1])
    return out


def split_inline_marks(ln: str) -> list[str]:
    """Re-break a run of sub-points that lost its line breaks in extraction. Only a
    consecutive run is split ((i) then (ii) then (iii) …), so a stray "(ii) above"
    reference stays where it is. Words are never changed, only line breaks added."""
    hits = list(INLINE_MARK.finditer(ln))
    if not hits:
        return [ln]
    lead = re.match(r"\s*\(([ivx]{1,4}|[a-n])\)\s", ln)
    expect = _succ(lead.group(1)) if lead else set()
    cuts: list[int] = []
    for k, h in enumerate(hits):
        tok = h.group(1)
        if tok in expect:
            cuts.append(h.start())
            expect = _succ(tok)
        elif not expect and tok in ("i", "a") and any(
                x.group(1) in _succ(tok) for x in hits[k + 1:]):
            cuts.append(h.start())
            expect = _succ(tok)
    if not cuts:
        return [ln]
    parts, prev = [], 0
    for c in cuts:
        parts.append(ln[prev:c])
        prev = c
    parts.append(ln[prev:])
    return [p.strip() for p in parts if p.strip()]


SENT_END = re.compile(r"[.:;?!)][\"”’]?\s*$")


def md(text: str) -> str:
    """Render the small markdown subset that appears in extracted answers."""
    if not (text or "").strip():
        return ""
    lines = [l.rstrip() for l in text.replace("\r\n", "\n").split("\n")]
    lines = [p for l in lines for p in (split_inline_marks(l) if l.strip() else [l])]

    # Most extractors joined wrapped lines, so a single newline is a real paragraph
    # break. One kept the PDF's line wraps; there a line only ends a paragraph when it
    # ends a sentence and stops short of the full line width.
    prose = [l for l in lines if l.strip() and not is_table_row(l)]
    wrapped = len(prose) >= 3 and sum(
        1 for l in prose[:-1] if not SENT_END.search(l)) > 0.3 * (len(prose) - 1)
    full = sorted(len(l) for l in prose)[len(prose) // 2] if prose else 0

    def para_ends(j: int) -> bool:
        """Does lines[j] close its paragraph?"""
        ln = lines[j]
        nxt = lines[j + 1].lstrip() if j + 1 < len(lines) else ""
        if not SENT_END.search(ln) and nxt[:1].islower():
            return False                                  # mid-sentence wrap
        return not wrapped or (bool(SENT_END.search(ln)) and len(ln) < 0.8 * full)
    out: list[str] = []
    i, n = 0, len(lines)
    while i < n:
        ln = lines[i]
        if not ln.strip():
            i += 1
            continue

        # pipe table
        if is_table_row(ln) and i + 1 < n and is_sep_row(lines[i + 1]):
            def cells(row: str) -> list[str]:
                r = row.strip().strip("|")
                return [c.strip() for c in r.split("|")]
            head = cells(ln)
            i += 2
            body = []
            while i < n and is_table_row(lines[i]):
                body.append(cells(lines[i]))
                i += 1
            # a cell's last words can spill out under the table (page break in the PDF):
            # rejoin them when exactly one cell of the last row stops mid-sentence
            if body and i < n and lines[i].strip()[:1].islower():
                open_cells = [k for k, c in enumerate(body[-1]) if c and not SENT_END.search(c)]
                if len(open_cells) == 1:
                    body[-1][open_cells[0]] += " " + lines[i].strip()
                    i += 1
            def cell(c: str) -> str:
                return re.sub(r"\s*•\s+", "<br>• ", inline(c)).removeprefix("<br>")
            th = "".join(f"<th>{cell(c)}</th>" for c in head)
            rows = "".join(
                "<tr>" + "".join(f"<td>{cell(c)}</td>" for c in r) + "</tr>" for r in body
            )
            out.append(f"<table><thead><tr>{th}</tr></thead><tbody>{rows}</tbody></table>")
            continue

        # labelled sub-point: keep ICAI's own label, hang the text after it
        mk = MARK.match(ln)
        if mk:
            body = [mk.group(2)]
            i += 1
            while i < n and not para_ends(i - 1) and lines[i].strip() \
                    and not MARK.match(lines[i]) and not is_table_row(lines[i]) \
                    and not BULLET.match(lines[i]):
                body.append(lines[i].strip())
                i += 1
            out.append(f'<p class="mi"><span class="mk">{E(mk.group(1))}</span>'
                       f'{inline(" ".join(body))}</p>')
            continue

        # bullets
        if BULLET.match(ln):
            items: list[str] = []
            while i < n:
                b = BULLET.match(lines[i])
                if b:
                    items.append(b.group(2))
                    i += 1
                elif items and lines[i].strip() and not MARK.match(lines[i]) \
                        and not is_table_row(lines[i]) \
                        and (lines[i].startswith(("   ", "\t")) or not para_ends(i - 1)):
                    items[-1] += " " + lines[i].strip()
                    i += 1
                else:
                    break
            lis = "".join(f"<li>{inline(x)}</li>" for x in items)
            out.append(f"<ul>{lis}</ul>")
            continue

        # paragraph
        buf = [lines[i].strip()]          # this line starts the paragraph, whatever it is
        i += 1
        if para_ends(i - 1):
            out.append(f"<p>{inline(buf[0])}</p>")
            continue
        while i < n and lines[i].strip() and not is_table_row(lines[i]) \
                and not BULLET.match(lines[i]) and not MARK.match(lines[i]):
            buf.append(lines[i].strip())
            i += 1
            if para_ends(i - 1):
                break
        out.append(f"<p>{inline(' '.join(buf))}</p>")
    return "".join(out)


# ---------------------------------------------------------------- pieces

def reader_note(t: str) -> str:
    """Mapping notes are written for the build log; tidy them for a reader."""
    t = t or ""
    t = re.sub(r"\s*\([^()]*(?:syllabus\.json|SPEC|section \d)[^()]*\)", "", t, flags=re.I)
    t = re.sub(r"\s*(?:per|see) SPEC\b[^;.,]*", "", t, flags=re.I)
    t = re.sub(r"\bsyllabus\.json\b", "the current syllabus", t)
    t = re.sub(r"\s{2,}", " ", t).strip(" ;,-—")
    return t


def src_label(s: dict) -> str:
    bits = [s.get("attempt") or "—"]
    if s.get("series"):
        bits.append(f"Series {s['series']}")
    return " · ".join(bits)


_LAST_SCEN = {"id": None}


def scenario_box(q: dict) -> str:
    sid = q.get("_scen_id")
    if not sid or sid == _LAST_SCEN["id"]:
        return ""
    _LAST_SCEN["id"] = sid
    s = q["_src"]
    t = (s.get("type") or "").upper()
    label = TYPES.get(t, TYPES["RTP"])[0]
    return (f'<aside class="scenario"><div class="scen-head"><span class="scen-lbl">'
            f'Case scenario</span><span class="scen-src">{E(label)} · {E(src_label(s))}</span>'
            f'</div>{md(q["_scenario"])}</aside>')


def reset_scenarios() -> None:
    _LAST_SCEN["id"] = None


def render_question(q: dict, idx: int) -> str:
    s = q["_src"]
    t = (s.get("type") or "RTP").upper()
    label, cls, _desc, _ = TYPES.get(t, TYPES["RTP"])
    ch = norm_chapter(q.get("chapter"))

    head = [f'<span class="badge">{E(label)}</span>',
            f'<span class="src">{E(src_label(s))}</span>']
    if q.get("qno"):
        head.append(f'<span class="qno">Q{E(str(q["qno"]))}</span>')
    if q.get("marks"):
        head.append(f'<span class="pill marks">{E(str(q["marks"]))} marks</span>')
    if (s.get("scheme") or "").lower() == "old":
        head.append('<span class="pill">old scheme</span>')
    if q.get("chapter_source") == "mapped" and ch not in ("OOS", "MCQ"):
        head.append('<span class="pill mapped">chapter mapped</span>')
    notes = (s.get("notes") or "").lower()
    if "scan" in notes and ("transcrib" in notes or "image" in notes) and \
            not (q.get("answer") or "").strip():
        head.append('<span class="pill scan">transcribed from scan</span>')

    if not q.get("_scen_id"):
        _LAST_SCEN["id"] = None
    parts = [scenario_box(q), f'<article class="q t-{cls}">', '<div class="q-head">',
             "".join(head), "</div>"]

    if ch == "OOS":
        why = reader_note(q.get("mapping_note") or "") or "this topic is not part of the current syllabus"
        parts.append(f'<p class="oos-flag">Not in the current syllabus — {E(why)}</p>')

    parts.append(f'<div class="q-text">{md(q.get("question", ""))}</div>')

    opts = q.get("options")
    if isinstance(opts, list) and opts:
        lis = []
        for o in opts:
            if isinstance(o, dict):
                lab, txt = o.get("label", ""), o.get("text", "")
            else:
                lab, txt = "", str(o)
            lis.append(f'<li><span class="ol">({E(str(lab))})</span><span>{inline(str(txt))}</span></li>')
        parts.append(f'<ul class="q-opts">{"".join(lis)}</ul>')

    ans = (q.get("answer") or "").strip()
    key = q.get("mcq_answer")
    if ans or key:
        parts.append('<div class="ans"><span class="ans-lbl">ICAI suggested answer</span>')
        if key:
            ktxt = ""
            for o in (opts if isinstance(opts, list) else []):
                if isinstance(o, dict) and str(o.get("label", "")).strip().lower() == \
                        str(key).strip().strip("()").lower():
                    ktxt = str(o.get("text", "")).strip()
                    break
            # skip the option text if the answer field already reproduces it
            if ktxt and ktxt.lower()[:60] in (ans or "").lower():
                ktxt = ""
            parts.append(f'<p class="mcq-key">Correct option: ({E(str(key).strip("()"))})'
                         + (f' — {inline(ktxt)}' if ktxt else "") + "</p>")
        if ans:
            parts.append(md(ans))
        parts.append("</div>")
    else:
        parts.append('<p class="ans-missing">ICAI has not published a suggested answer for this '
                     'question. Question text is reproduced as published.</p>')

    also = q.get("_also") or []
    if also:
        trail = " · ".join(
            f'{(a.get("type") or "").upper()} {src_label(a)}' for a in also[:6])
        parts.append(f'<p class="also"><span class="also-lbl">Asked again in</span> {E(trail)}</p>')

    tags = q.get("_topics") or []
    if tags:
        chips = "".join(f'<span class="tag">{E(str(t))}</span>' for t in tags)
        parts.append(f'<div class="tags"><span class="tl">Topic</span>{chips}</div>')

    parts.append("</article>")
    return "".join(parts)


def coverage_table(sources: list[dict]) -> str:
    """attempt x doc-type grid, so the reader sees exactly what is and isn't inside."""
    have: dict[tuple, set[str]] = defaultdict(set)
    meta: dict[tuple, dict] = {}
    for s in sources:
        k = (s["_year"], s["_month"])
        meta.setdefault(k, {"attempt": s.get("attempt"), "scheme": s.get("scheme")})
        t = (s.get("type") or "").upper()
        if t == "MTP" and s.get("series"):
            have[k].add(f"MTP-{s['series']}")
        elif t:
            have[k].add(t)
    rows = []
    for k in sorted(meta, reverse=True):
        if k == (0, 0):
            continue
        h = have[k]
        mtp = "I+II" if {"MTP-I", "MTP-II"} <= h else (
            "I" if "MTP-I" in h else ("II" if "MTP-II" in h else ("yes" if "MTP" in h else "")))
        def cell(ok, txt="✓"):
            return f'<td class="ctr yes">{txt}</td>' if ok else '<td class="ctr no">–</td>'
        scheme = "New" if (meta[k].get("scheme") or "").lower() == "new" else "Old"
        rows.append(
            f'<tr><td>{E(str(meta[k]["attempt"]))}</td><td class="ctr">{scheme}</td>'
            + cell("PYQ" in h) + cell("RTP" in h) + cell(bool(mtp), mtp or "✓") + "</tr>")
    return (
        '<table class="compact"><caption>Attempt coverage — what this book contains</caption>'
        '<thead><tr><th>Attempt</th><th class="ctr">Scheme</th><th class="ctr">Past exam</th>'
        '<th class="ctr">RTP</th><th class="ctr">MTP</th></tr></thead>'
        f"<tbody>{''.join(rows)}</tbody></table>")


def chapter_counts_table(by_ch: dict[str, list]) -> str:
    rows = []
    for n, name in CHAPTERS:
        qs = by_ch.get(str(n), [])
        c = Counter((q["_src"].get("type") or "").upper() for q in qs)
        rows.append(
            f'<tr><td class="ctr">{n}</td><td>{E(name)}</td>'
            f'<td class="num">{c.get("PYQ", 0)}</td><td class="num">{c.get("RTP", 0)}</td>'
            f'<td class="num">{c.get("MTP", 0)}</td><td class="num"><b>{len(qs)}</b></td></tr>')
    for key, label in (("MCQ", "Case-scenario &amp; standalone MCQs"),
                       ("OOS", "Out of current syllabus (appendix)")):
        qs = by_ch.get(key, [])
        if qs:
            c = Counter((q["_src"].get("type") or "").upper() for q in qs)
            rows.append(
                f'<tr><td class="ctr">—</td><td>{label}</td>'
                f'<td class="num">{c.get("PYQ", 0)}</td><td class="num">{c.get("RTP", 0)}</td>'
                f'<td class="num">{c.get("MTP", 0)}</td><td class="num"><b>{len(qs)}</b></td></tr>')
    return (
        '<table><caption>Questions by chapter</caption><thead><tr><th class="ctr">Ch</th>'
        '<th>Chapter</th><th class="num">Exam</th><th class="num">RTP</th>'
        '<th class="num">MTP</th><th class="num">Total</th></tr></thead>'
        f"<tbody>{''.join(rows)}</tbody></table>")


def priority_table(questions: list[dict]) -> str:
    """Most repeated topics — what to revise first."""
    freq: dict[str, set] = defaultdict(set)
    chs: dict[str, Counter] = defaultdict(Counter)      # chapters ICAI itself tagged
    chs_any: dict[str, Counter] = defaultdict(Counter)  # fallback: any numbered chapter
    for q in questions:
        ch = norm_chapter(q.get("chapter"))
        if ch == "OOS":
            continue
        # every document the question appeared in counts, including merged repeats
        docs = {(d.get("type"), d.get("attempt"), d.get("series"))
                for d in [q["_src"], *(q.get("_also") or [])]}
        for t in q.get("_topics") or []:
            freq[t] |= docs
            if ch.isdigit():
                chs_any[t][ch] += 1
                if q.get("chapter_source") == "icai":
                    chs[t][ch] += 1
    ranked = sorted(freq.items(), key=lambda kv: -len(kv[1]))[:28]
    if not ranked:
        return ""
    rows = []
    for topic, apps in ranked:
        home = TOPIC_CH.get(topic)
        if isinstance(home, int):
            ch_lbl = f"Ch {home}"
        elif home == "OOS":
            ch_lbl = "dropped"
        else:
            pick = chs.get(topic) or chs_any.get(topic)
            ch_lbl = f"Ch {pick.most_common(1)[0][0]}" if pick else "—"
        topic = topic if topic[:1].isupper() else topic.capitalize()
        rows.append(f'<tr><td>{E(topic)}</td><td class="ctr">{ch_lbl}</td>'
                    f'<td class="num"><b>{len(apps)}</b></td></tr>')
    return ('<table class="compact"><caption>Most repeated topics — revise these first</caption>'
            '<thead><tr><th>Topic</th><th class="ctr">Chapter</th>'
            '<th class="num">Times asked</th></tr></thead>'
            f"<tbody>{''.join(rows)}</tbody></table>")


def render_chapter(n: int, name: str, qs: list[dict], syllabus: dict) -> str:
    topics = ""
    for c in (syllabus.get("chapters") or []):
        if c.get("n") != n:
            continue
        items = c.get("syllabus_items") or c.get("topics") or []
        if items:
            lbl = ("ICAI syllabus" if c.get("syllabus_items") else "Syllabus coverage")
            topics = (f'<div class="ch-topics"><span class="lbl">{lbl}</span>'
                      + E(" · ".join(str(t) for t in items)) + "</div>")
        break
    cnt = Counter((q["_src"].get("type") or "").upper() for q in qs)
    attempts = len({(q["_src"]["_year"], q["_src"]["_month"]) for q in qs})
    head = (f'<section class="chapter"><div class="chapter-head">'
            f'<div class="ch-no">Chapter {n}</div><h2>{E(name)}</h2>'
            f'<div class="ch-stats">'
            f'<div><b>{len(qs)}</b>questions</div>'
            f'<div><b>{cnt.get("PYQ", 0)}</b>from past exams</div>'
            f'<div><b>{cnt.get("RTP", 0)}</b>from RTPs</div>'
            f'<div><b>{cnt.get("MTP", 0)}</b>from MTPs</div>'
            f'<div><b>{attempts}</b>attempts</div>'
            f'</div></div>{topics}<div class="chapter-body">')
    body = []
    for t in ("PYQ", "RTP", "MTP"):
        group = [q for q in qs if (q["_src"].get("type") or "").upper() == t]
        if not group:
            continue
        group.sort(key=lambda q: (-q["_src"]["_year"], -q["_src"]["_month"],
                                  q["_src"].get("_file") or "", q.get("_ord", 0)))
        label, cls, desc, _ = TYPES[t]
        reset_scenarios()
        body.append(f'<div class="group-head g-{cls}"><h3>{E(label)}</h3>'
                    f'<span class="muted small">{E(desc)}</span>'
                    f'<span class="cnt">{len(group)} questions</span></div>')
        body += [render_question(q, i) for i, q in enumerate(group)]
    if not body:
        body.append('<p class="muted">No questions sourced for this chapter yet.</p>')
    return head + "".join(body) + "</div></section>"


# ---------------------------------------------------------------- main

def main() -> None:
    SITE.mkdir(exist_ok=True)
    syllabus = {}
    sp = ROOT / "syllabus.json"
    if sp.exists():
        try:
            syllabus = json.loads(sp.read_text())
        except Exception as exc:                        # noqa: BLE001
            print(f"  !! syllabus.json unreadable: {exc}")

    questions, sources = load()
    questions, merged = dedupe(questions)
    by_ch: dict[str, list] = defaultdict(list)
    for q in questions:
        by_ch[norm_chapter(q.get("chapter"))].append(q)

    n_total = len(questions)
    n_oos = len(by_ch.get("OOS", []))
    n_live = n_total - n_oos
    attempts = sorted({(s["_year"], s["_month"], s.get("attempt")) for s in sources
                       if s["_year"]}, reverse=True)
    assert len({a[:2] for a in attempts}) == len(attempts), "attempt spelt two ways"
    n_attempts = len(attempts)
    span = ""
    if attempts:
        span = f"{attempts[-1][2]} – {attempts[0][2]}"
    with_ans = sum(1 for q in questions
                   if (q.get("answer") or "").strip() or q.get("mcq_answer"))
    n_repeat = sum(1 for q in questions if q.get("_also"))

    today = date.today().strftime("%d %B %Y")

    # ---- cover
    cover = f"""<section class="cover">
<div class="cover-rule"></div>
<div class="cover-kicker">CA Intermediate · Paper 6B</div>
<h1>Strategic Management<br>Question Bank</h1>
<p class="sub">Every ICAI Revision Test Paper, Mock Test Paper and past examination
question for Strategic Management, arranged chapter by chapter, each with ICAI's own
suggested answer.</p>
<div class="cover-contents">
  <span class="cc-lbl">Contents</span>
  <ol>
    <li><span>Introduction to Strategic Management</span></li>
    <li><span>Strategic Analysis: External Environment</span></li>
    <li><span>Strategic Analysis: Internal Environment</span></li>
    <li><span>Strategic Choices</span></li>
    <li><span>Strategy Implementation and Evaluation</span></li>
  </ol>
  <p class="cc-foot">Case-scenario MCQs follow the chapters. Questions on topics the 2023
  syllabus dropped are kept in an appendix at the back.</p>
</div>
<div class="cover-meta">
  <div><div class="k">Questions</div><div class="v">{n_total}<small>{with_ans} with ICAI answers</small></div></div>
  <div><div class="k">Attempts</div><div class="v">{n_attempts}<small>{E(span)}</small></div></div>
  <div><div class="k">Chapters</div><div class="v">5<small>2023 syllabus</small></div></div>
  <div><div class="k">Repeated</div><div class="v">{n_repeat}<small>asked more than once</small></div></div>
</div>
<p class="cover-note">All questions and suggested answers are the copyright of
the Institute of Chartered Accountants of India and are reproduced here verbatim from
ICAI's published Revision Test Papers, Mock Test Papers and Suggested Answers for study
purposes. Compiled {E(today)}. Nothing in this book is written by the compiler except the
chapter arrangement, the topic labels and the syllabus notes.</p>
</section>"""

    # ---- how to use
    how = f"""<section class="fm"><h2>How to use this book</h2>
<p class="lede">Questions are grouped by the five chapters of the current (2023) syllabus.
Within each chapter, real examination questions come first, then Revision Test Papers,
then Mock Test Papers — newest attempt first in each group.</p>
<div class="legend">
  <div class="legend-card lg-pyq"><h4>Past Exam</h4><p>Actually asked in an ICAI
  examination. These carry the most weight — do them first. Marks are shown where ICAI
  printed them.</p></div>
  <div class="legend-card lg-rtp"><h4>RTP</h4><p>Revision Test Paper, issued by ICAI
  before each attempt. ICAI tags these to chapters itself in the current scheme.</p></div>
  <div class="legend-card lg-mtp"><h4>MTP</h4><p>Mock Test Paper, Series I and II.
  Closest in format to the real paper.</p></div>
  <div class="legend-card lg-oos"><h4>Out of syllabus</h4><p>Old-scheme questions on
  topics the 2023 syllabus dropped. Moved to an appendix at the back so they never waste
  your revision time.</p></div>
</div>
<div class="callout warn"><h4>The syllabus changed in 2023 — read this once</h4>
<p>Until November 2023, Strategic Management was Section B of Paper 7 (with Enterprise
Information Systems). From May 2024 it is Section B of Paper 6 (with Financial Management),
and the chapters were restructured from eight into the five used here.</p>
<p>Questions from 2018–2023 are marked <strong>old scheme</strong>. They are still
excellent practice, but ICAI did not tag them to today's chapters — so where you see
<strong>chapter mapped</strong>, the chapter is the compiler's judgement, not ICAI's.
Anything no longer examinable sits in the appendix.</p></div>
<div class="callout"><h4>Repeated questions are merged</h4>
<p>ICAI often reuses a question across a Revision Test Paper, a Mock Test Paper and then the
real examination. Where that happens the question appears once here, under the most
authoritative source, with an <strong>Asked again in</strong> line listing the others. A long
trail there is the strongest possible hint to learn that question properly.</p></div>
<div class="callout"><h4>A sensible order of work</h4>
<p>Start with the <em>Most repeated topics</em> table overleaf: those topics have been
asked across the largest number of attempts. Within a chapter, work the Past Exam group
under timed conditions, then use the RTP and MTP groups for coverage.</p></div>
</section>"""

    inside = (f'<section class="fm"><h2>What is inside</h2>'
              f'<p class="lede">Sourced from {len(sources)} ICAI documents across '
              f'{n_attempts} attempts. The grid below is an honest record — a dash means '
              f'ICAI did not publish that document for that attempt, or it could not be '
              f'obtained.</p>'
              + chapter_counts_table(by_ch) + coverage_table(sources) + "</section>")

    # ---- what the 2023 syllabus changed (verified, from syllabus.json)
    changed_sec = ""
    dropped = [d for d in (syllabus.get("dropped_from_old_scheme") or [])
               if (d.get("status") or "").lower() == "dropped"]
    reduced = [d for d in (syllabus.get("dropped_from_old_scheme") or [])
               if (d.get("status") or "").lower() == "reduced"]
    retained = [d for d in (syllabus.get("dropped_from_old_scheme") or [])
                if (d.get("status") or "").lower() == "retained"]
    brand_new = syllabus.get("new_in_2023_scheme") or []
    if dropped or retained or brand_new:
        def names(xs):
            return E(" · ".join(str(x.get("topic") or x) for x in xs))
        blocks = []
        if dropped:
            blocks.append(
                '<div class="callout warn"><h4>Dropped in 2023 — do not study these</h4>'
                f'<p>{names(dropped)}</p>'
                '<p class="small">Old-scheme questions on these topics are kept only in the '
                'appendix at the back, clearly marked.</p></div>')
        if retained:
            blocks.append(
                '<div class="callout"><h4>Still examinable — do not skip these</h4>'
                f'<p>{names(retained)}</p>'
                '<p class="small">These look like old-scheme leftovers but survive in the current '
                'syllabus, sometimes under a new name or moved to a different chapter. The '
                'marketing techniques, for example, moved into Chapter 3 rather than being '
                'removed.</p></div>')
        if reduced:
            blocks.append('<div class="callout"><h4>Cut back, but not gone</h4>'
                          f'<p>{names(reduced)}</p></div>')
        if brand_new:
            nn = brand_new if isinstance(brand_new, list) else [brand_new]
            blocks.append(
                '<div class="callout"><h4>New in 2023 — no old paper can help you</h4>'
                f'<p>{names(nn)}</p>'
                '<p class="small">These entered the syllabus with the new scheme, so practice for '
                'them exists only from May 2024 onwards.</p></div>')
        srcs = syllabus.get("verified_against") or []
        changed_sec = (
            '<section class="fm"><h2>What the 2023 syllabus changed</h2>'
            '<p class="lede">Checked topic by topic against ICAI\'s own study material for both '
            'schemes, so you know exactly what to skip and what still counts.</p>'
            + "".join(blocks)
            + (f'<p class="end">Verified against {len(srcs)} ICAI sources, including the official '
               f'syllabus and detailed contents pages of both the 2017 and 2023 study material.</p>'
               if srcs else "")
            + "</section>")

    prio = priority_table(questions)
    prio_sec = (f'<section class="fm"><h2>Most repeated topics</h2>'
                f'<p class="lede">Ranked by how many separate ICAI documents have asked '
                f'about the topic. Out-of-syllabus questions are excluded.</p>{prio}</section>'
                if prio else "")

    chapters_html = "".join(
        render_chapter(n, name, by_ch.get(str(n), []), syllabus) for n, name in CHAPTERS)

    reset_scenarios()
    mcqs = by_ch.get("MCQ", [])
    mcq_sec = ""
    if mcqs:
        mcqs.sort(key=lambda q: (-q["_src"]["_year"], -q["_src"]["_month"],
                                 TYPE_RANK.get((q["_src"].get("type") or "").upper(), 9),
                                 q["_src"].get("_file") or "", q.get("_ord", 0)))
        mcq_sec = ('<section class="chapter"><div class="chapter-head">'
                   '<div class="ch-no">Multiple choice</div>'
                   '<h2>Case scenarios &amp; standalone MCQs</h2>'
                   f'<div class="ch-stats"><div><b>{len(mcqs)}</b>questions</div></div></div>'
                   '<div class="chapter-body">'
                   + "".join(render_question(q, i) for i, q in enumerate(mcqs))
                   + "</div></section>")

    reset_scenarios()
    oos = by_ch.get("OOS", [])
    oos_sec = ""
    if oos:
        oos.sort(key=lambda q: (-q["_src"]["_year"], -q["_src"]["_month"],
                                q["_src"].get("_file") or "", q.get("_ord", 0)))
        oos_sec = ('<section class="chapter"><div class="chapter-head">'
                   '<div class="ch-no">Appendix</div>'
                   '<h2>Questions no longer in the syllabus</h2>'
                   f'<div class="ch-stats"><div><b>{len(oos)}</b>questions</div></div></div>'
                   '<div class="chapter-body">'
                   '<div class="callout warn"><h4>Read for interest, not for the exam</h4>'
                   '<p>These old-scheme questions cover topics the 2023 syllabus dropped or '
                   'cut right back. They are kept only so the archive from 2018 is complete. '
                   'Skip this appendix when you are short of time.</p></div>'
                   + "".join(render_question(q, i) for i, q in enumerate(oos))
                   + "</div></section>")

    # ---- sources
    srows = []
    for s in sorted(sources, key=lambda s: (-s["_year"], -s["_month"], s.get("type") or "")):
        url = s.get("pdf_url") or ""
        mirror = " <em>(mirror of the ICAI file)</em>" if s.get("source_is_mirror") else ""
        srows.append(f'<li><strong>{E((s.get("type") or "").upper())} · '
                     f'{E(src_label(s))}</strong> — {s["_count"]} questions{mirror}<br>{E(url)}</li>')
    src_sec = ('<section class="fm"><h2>Sources</h2>'
               '<p class="lede">Every document this book was built from. Open any of these to '
               'check a question against the original.</p>'
               f'<ol class="srclist">{"".join(srows)}</ol>'
               '<p class="end">Compiled for personal study. Questions and suggested answers '
               '&copy; The Institute of Chartered Accountants of India. Where ICAI has not yet '
               'published a suggested answer, the question is reproduced with the answer left '
               'blank rather than filled in by the compiler.</p></section>')

    doc = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>CA Intermediate · Strategic Management Question Bank</title>
<link rel="stylesheet" href="styles.css"></head>
<body>{cover}{how}{inside}{changed_sec}{prio_sec}{chapters_html}{mcq_sec}{oos_sec}{src_sec}</body></html>"""

    (SITE / "index.html").write_text(doc)
    css = ASSETS / "styles.css"
    if css.exists():
        (SITE / "styles.css").write_text(css.read_text())

    print(f"  sources   : {len(sources)}")
    print(f"  questions : {n_total}  ({with_ans} with answers, {n_oos} out of syllabus)")
    print(f"  merged    : {merged} duplicate sightings collapsed, {n_repeat} repeated questions")
    for n, name in CHAPTERS:
        print(f"    ch {n}: {len(by_ch.get(str(n), [])):4d}  {name}")
    print(f"    MCQ : {len(by_ch.get('MCQ', [])):4d}")
    print(f"    OOS : {n_oos:4d}")
    print(f"  output    : {SITE / 'index.html'}")


if __name__ == "__main__":
    main()
