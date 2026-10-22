"""Lesson loading and validation (content/subjects/<subject>/<lesson-id>.md)."""
from __future__ import annotations

import hashlib
import re
from dataclasses import dataclass, field
from pathlib import Path

SECTIONS_FILE = Path(__file__).resolve().parents[2] / "content" / "sections.json"


def sections_config(path: Path = SECTIONS_FILE) -> dict:
    """content/sections.json: the one list of lesson sections (order, required, oneOf, level, depths, role, words, quiz, cards)"""
    import json
    cfg = json.loads(path.read_text())
    cfg.setdefault("oneOf", [])
    cfg.setdefault("level", {})
    cfg.setdefault("role", {})
    return cfg


_CFG = sections_config()
ORDER = list(_CFG["order"])
REQUIRED = list(_CFG["required"])
OPTIONAL = [h for h in ORDER if h not in REQUIRED and h != "Flashcards"]
LEVEL = {h: {1: "beginner", 3: "advanced"}.get(_CFG["level"].get(h, 2), "core") for h in ORDER if h != "Flashcards"}
WORDS = tuple(_CFG.get("words") or (700, 3600))
FM = re.compile(r"\A---\n(.*?)\n---\n", re.S)


@dataclass
class Lesson:
    id: str
    title: str
    subject: str
    topic: str
    minutes: int
    summary: str
    tier: str
    status: str
    needs: list[str] = field(default_factory=list)
    tags: list[str] = field(default_factory=list)
    labs: list[str] = field(default_factory=list)
    body: str = ""
    cards: list[dict] = field(default_factory=list)
    words: int = 0
    pyq_ids: list[str] = field(default_factory=list)
    path: str = ""


def words(md: str) -> int:
    md = re.sub(r"```.*?```", " ", md, flags=re.S)
    md = re.sub(r"::: *(?:diagram|lab)\b[\s\S]*?\n:::", " ", md)     # diagrams and lab embeds (their JSON config) are not words
    md = re.sub(r"\$\$[\s\S]*?\$\$|\$[^$\n]+\$", " x ", md)
    return len(re.findall(r"[A-Za-z][A-Za-z'’-]*", md))


def extract_cards(sec: str, lid: str) -> list[dict]:
    cards = []
    for m in re.finditer(r"^Q::\s*(.+?)\n+A::\s*(.+?)(?=\n\s*\n|\nQ::|\Z)", sec, re.S | re.M):
        q, a = m.group(1).strip(), m.group(2).strip()
        cid = f"{lid}#{hashlib.sha1(q.encode()).hexdigest()[:8]}"
        cards.append({"id": cid, "front": q, "back": a})
    return cards


def slug(h: str) -> str:
    """md.js's heading id"""
    return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", h.lower()))


def sections_manifest() -> dict:
    """manifest.sections: what the lesson page and the formula sheets need (names, depth levels by heading id, depth labels, roles)"""
    return {"order": ORDER, "required": REQUIRED, "level": {slug(h): v for h, v in _CFG["level"].items()},
            "depths": _CFG.get("depths") or [], "role": {k: slug(v) for k, v in _CFG["role"].items()},
            "names": {slug(h): h for h in ORDER}}


PYQ_ID = re.compile(r"[A-Za-z0-9][A-Za-z0-9_.\-]*:[A-Za-z0-9][A-Za-z0-9_.\-]*")


def pyq_block_ids(body: str) -> list[str]:
    """the question ids named in the lesson's `::: pyq` blocks (on the opening line or inside), in order"""
    ids: list[str] = []
    for m in re.finditer(r"^(:{3,}) *pyq\b([^\n]*)\n?([\s\S]*?)^\1\s*$", body, re.M):
        ids += PYQ_ID.findall(m.group(2) + " " + m.group(3))
    return list(dict.fromkeys(ids))


def check_containers(body: str, rel: str, errors: list[str]) -> None:
    """`:::` containers nest by colon count: an inner container opened with the SAME number of colons as the one around it closes the outer one early."""
    stack: list[tuple[int, str, int]] = []
    in_code = False
    for n, ln in enumerate(body.split("\n"), 1):
        if ln.strip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        m = re.match(r"^(:{3,})\s*([a-z][a-z0-9-]*)?", ln)
        if not m:
            continue
        cnt, name = len(m.group(1)), m.group(2)
        if name:
            if stack and stack[-1][0] == cnt:
                errors.append(f"{rel}: body line {n}: `{':' * cnt} {name}` is opened inside `{stack[-1][1]}` (line {stack[-1][2]}) with the same number of colons; give the OUTER container more colons")
            stack.append((cnt, name, n))
        elif stack and stack[-1][0] == cnt:
            stack.pop()


def load_all(root: Path, syl: dict, pyq_ids: set[str], labs: set[str], errors: list[str], warnings: list[str],
             ship: bool = False, ready_labs: set[str] | None = None) -> dict[str, Lesson]:
    out: dict[str, Lesson] = {}
    for p in sorted(root.glob("*/*.md")):
        rel = str(p.relative_to(root.parent.parent))
        raw = p.read_text()
        m = FM.match(raw)
        if not m:
            errors.append(f"{rel}: missing --- frontmatter")
            continue
        meta: dict[str, str] = {}
        for ln in m.group(1).split("\n"):
            if ":" in ln:
                k, _, v = ln.partition(":")
                v = v.strip()
                if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
                    v = v[1:-1]                      # YAML-style quotes around a value are not part of the value
                meta[k.strip()] = v
        body = raw[m.end():].strip()
        lid = meta.get("id", "")
        node = syl["nodes"].get(lid)
        if not node or "topic" not in node:
            errors.append(f"{rel}: id {lid!r} is not a sub-topic in syllabus.txt")
            continue
        if p.stem != lid or p.parent.name != node["subject"]:
            errors.append(f"{rel}: file must be content/subjects/{node['subject']}/{lid}.md")
        if lid in out:
            errors.append(f"{rel}: duplicate lesson {lid}")
            continue
        for k in ("title", "summary", "minutes"):
            if not meta.get(k):
                errors.append(f"{rel}: frontmatter needs `{k}`")
        lst = lambda k: [x.strip() for x in meta.get(k, "").split(",") if x.strip()]   # noqa: E731
        les = Lesson(id=lid, title=meta.get("title", lid), subject=node["subject"], topic=node["topic"],
                     minutes=int(meta.get("minutes", "10") or 10), summary=meta.get("summary", ""),
                     tier=node["tier"], status=node["status"], needs=lst("needs"), tags=lst("tags"), labs=lst("labs"), path=rel)
        check_containers(body, rel, errors if ship else warnings)
        # headings
        heads = re.findall(r"^## (.+?)\s*$", body, re.M)
        missing = [h for h in REQUIRED if h not in heads]
        if missing:
            errors.append(f"{rel}: missing section(s): {', '.join(missing)}")
        for grp in _CFG["oneOf"]:
            if heads and not any(h in heads for h in grp):
                warnings.append(f"{rel}: has none of {' / '.join(grp)} (a numerical lesson needs {grp[0]}, a theory lesson {grp[-1]}; CONTENT_GUIDE §1)")
        unknown = [h for h in heads if h not in ORDER]
        if unknown:
            errors.append(f"{rel}: unknown section(s): {', '.join(unknown)} (allowed: {', '.join(ORDER)})")
        pos = [ORDER.index(h) for h in heads if h in ORDER]
        if pos != sorted(pos):
            errors.append(f"{rel}: sections out of order; expected {', '.join(h for h in ORDER if h in heads)}")
        # flashcards section is lifted out of the reading text
        fm = re.search(r"^## Flashcards\s*\n(.*?)(?=^## |\Z)", body, re.S | re.M)
        if fm:
            les.cards = extract_cards(fm.group(1), lid)
            body = body[:fm.start()] + body[fm.end():]
        elif len(heads) and "Flashcards" not in heads:
            warnings.append(f"{rel}: no ## Flashcards section")
        les.body = body.strip()
        les.words = words(les.body)
        if not WORDS[0] <= les.words <= WORDS[1]:
            warnings.append(f"{rel}: {les.words} words (target {WORDS[0]}-{WORDS[1]})")
        # required teaching elements
        def count(pat): return len(re.findall(pat, les.body, re.M))
        need = {"analogy": r"^:{3,} *analogy", "worked example": r"^:{3,} *example", "exam (how ICAI examines it)": r"^:{3,} *exam\b",
                "common mistake": r"^:{3,} *mistake", "quiz": r"^:{3,} *quiz", "diagram": r"^:{3,} *diagram", "key idea": r"^:{3,} *key\b"}
        hard = ("analogy", "worked example", "exam (how ICAI examines it)", "common mistake", "quiz")
        for what, pat in need.items():
            if not count(pat):
                (errors if what in hard else warnings).append(f"{rel}: no {what} block")
        if count(r"^:{3,} *example") < 2:
            warnings.append(f"{rel}: fewer than 2 worked examples")
        if count(r"^:{3,} *mistake") < 2:
            warnings.append(f"{rel}: fewer than 2 common mistakes")
        qn = sum(len(re.findall(r"^Q\d*[:.]\s*", m.group(2), re.M)) for m in re.finditer(r"^(:{3,})\s*quiz[^\n]*\n([\s\S]*?)^\1\s*$", les.body, re.M))
        lo, hi = _CFG.get("quiz") or (3, 6)
        if qn and not lo <= qn <= hi:
            warnings.append(f"{rel}: {qn} self-check question(s) (target {lo}-{hi})")
        lo, hi = _CFG.get("cards") or (6, 12)
        if les.cards and not lo <= len(les.cards) <= hi:
            warnings.append(f"{rel}: {len(les.cards)} flashcard(s) (target {lo}-{hi})")
        # `::: pyq` blocks are optional (the ICAI bank is not built yet): every id is listed, an id the bank does not hold is a warning
        les.pyq_ids = pyq_block_ids(les.body)
        for qid in les.pyq_ids:
            if qid not in pyq_ids:
                (errors if ship and pyq_ids else warnings).append(f"{rel}: question {qid} in a ::: pyq block is not in the question bank (yet); "
                                                                  "it is shown as 'being added' until it is")
        for lab in les.labs:
            if lab not in labs:
                errors.append(f"{rel}: lab {lab!r} not in content/labs.json")
            elif ship and ready_labs is not None and lab not in ready_labs:
                errors.append(f"{rel}: lab {lab!r} is embedded but still marked 'planned' in content/labs.json")
        out[lid] = les
    # cross references
    for les in out.values():
        for n in les.needs:
            if n not in syl["nodes"]:
                errors.append(f"{les.path}: needs {n!r} is not a syllabus id")
        for ref in re.findall(r"\[\[([a-z0-9_.\-]+)(?:\|[^\]]+)?\]\]", les.body):
            if ref not in syl["nodes"]:
                errors.append(f"{les.path}: [[{ref}]] is not a syllabus id")
    return out
