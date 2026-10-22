"""The PYQ search index and the search vocabulary that ships with it (audit P1-26; docs/ARCHITECTURE.md §10.11).

data/search-pyq.js   word -> [question index]: the words of the stem, options, linked-pair context and figure descriptions (maths removed),
                     plus the words of the question's topic and sub-topic names, all through textnorm.norm, so alphanumeric tokens survive
                     (lr1, ll1, 2pl, 3nf, ipv4, ieee 754 -> ieee, 754). Words of 3+ characters only (1-2 letter words are matched by the
                     runtimes through topic names and subject codes), never a STOP word, never a word in more than MAX_POSTINGS questions.
manifest.search      {alias: {shorthand: [what the lessons and papers write]}, stop: [STOP]}: the alias table is derived from the content
                     ('Translation Lookaside Buffer (TLB)' in a lesson -> tlb: ['translation lookaside buffer']) plus a short curated list;
                     the runtimes merge it into their own tables (core/search.js, core/pyqlib.js).
"""
from __future__ import annotations

import re
from collections import Counter, defaultdict

from .textnorm import norm, words

# the build's stop list: never in the postings (the runtimes keep a copy as BUILD_STOP and read this one from manifest.search.stop)
STOP = set("the and for that this with from are was were which following what given have has not but all any can will one two out into than then "
           "its their there these those each between under over only also about more most such when where while whose they them been being does "
           "did our your you let consider shown below above following statements statement true false correct incorrect option options number "
           "value values".split())
MAX_POSTINGS = 600
MATH = re.compile(r"\$\$[\s\S]*?\$\$|\$[^$]*\$")

# shorthand the content never spells out next to its expansion (the derived table covers 'Full Name (ACR)'); values are normalised phrases
CURATED = {
    "kmap": ["karnaugh"], "kmaps": ["karnaugh"], "k map": ["karnaugh"],
    "dp": ["dynamic programming"], "mst": ["spanning tree"], "bst": ["binary search tree"],
    "lru": ["least recently used"], "fifo": ["first in first out"], "lifo": ["last in first out"],
    "gbn": ["go back n"], "2pl": ["two phase locking"], "ieee754": ["ieee 754"],
    "lr1": ["clr1"], "clr": ["clr1"], "lalr": ["lalr1"], "slr": ["slr1"], "ll": ["ll1"],
    "fcfs": ["first come first served"], "sjf": ["shortest job first"], "srtf": ["shortest remaining"], "rr": ["round robin"],
    "cfg": ["context free grammar"], "cfl": ["context free"], "pda": ["pushdown"], "tm": ["turing machine"],
    "fd": ["functional dependenc"], "fds": ["functional dependenc"], "mvd": ["multivalued dependenc"], "er": ["entity relationship"],
    "bankers": ["banker"], "dijkstras": ["dijkstra"], "kruskals": ["kruskal"], "prims": ["prim"],
    "vm": ["virtual memory"],          # the lessons spell out 'Virtual Machine (VM)'; in GATE questions VM is usually virtual memory
}
# acronyms that are also ordinary English words (or too vague to expand): never aliased from the content
NOT_ALIAS = set("am me got car ref eat id ls lc ic ub bw ca ef ei eo ea alg it at as an on in is or if do go no so up us we be by of to "
                "re".split())
SMALL = {"of", "and", "the", "a", "an", "to", "in", "for", "on", "with", "by", "per", "at", "or"}
_PAREN_ACR = re.compile(r"\([ \t]*([A-Z]{2,6})s?[ \t]*\)")                          # '… Lookaside Buffer (TLB)'
_ACR_PAREN = re.compile(r"\b([A-Z]{2,6})s?[ \t]*\([ \t]*([A-Za-z][\w’'\- \t]{3,80}?)[ \t]*\)")   # 'TLB (translation lookaside buffer)'
_WORD = re.compile(r"[A-Za-z][\w’'\-]*$")


def question_text(q: dict) -> str:
    return " ".join([q.get("stem") or "", " ".join(q.get("options") or []), (q.get("group") or {}).get("context") or "",
                     " ".join(f.get("describe", "") for f in q.get("figures") or [])])


def index_words(text: str) -> set[str]:
    """the indexable words of a text: maths removed, normalised, 3+ characters, not a STOP word"""
    return {w for w in words(MATH.sub(" ", text)) if len(w) >= 3 and w not in STOP}


def question_tokens(q: dict, nodes: dict) -> set[str]:
    toks = index_words(question_text(q))
    for nid in (q.get("topic"), q.get("subtopic")):
        if nid and nid in nodes:
            toks |= index_words(nodes[nid].get("name") or "")
    return toks


def postings(questions: list[dict], nodes: dict) -> dict[str, list[int]]:
    post: dict[str, list[int]] = {}
    for i, q in enumerate(questions):
        for t in sorted(question_tokens(q, nodes)):
            post.setdefault(t, []).append(i)
    return {t: v for t, v in sorted(post.items()) if len(v) <= MAX_POSTINGS}


def _initials_match(full_words: list[str], acr: str) -> list[str] | None:
    """the shortest run of trailing words whose initials (small words skipped) spell the acronym, else None"""
    letters = list(acr.lower())
    for k in range(1, min(len(full_words), 9) + 1):
        cand = full_words[-k:]
        if cand[0].lower() in SMALL or cand[-1].lower() in SMALL:
            continue
        ini = [w[0].lower() for w in cand if w.lower() not in SMALL]
        if ini == letters:
            return cand
    return None


def derived_aliases(texts: list[str]) -> dict[str, list[str]]:
    """'Full Name (ACR)' and 'ACR (full name)' pairs found in the content, keyed by the normalised acronym; the expansions a learner would
    otherwise miss (most used first, at most three). Maths is removed first; the initials must spell the acronym exactly."""
    found: dict[str, Counter] = defaultdict(Counter)

    def add(acr: str, phrase_words: list[str]) -> None:
        a, ph = norm(acr), norm(" ".join(phrase_words))
        if not a or a in NOT_ALIAS or len(a) < 2 or not ph or len(ph.split()) < 2 or a in ph.split():
            return
        found[a][ph] += 1

    for t in texts:
        t = MATH.sub(" ", t)
        for m in _PAREN_ACR.finditer(t):
            line = re.sub(r"[*_=`]", "", t[max(0, m.start() - 160):m.start()].split("\n")[-1])
            tail: list[str] = []
            for w in reversed([w for w in re.split(r"[ \t\-]+", line) if w]):
                if not _WORD.match(w) or len(tail) == 9:
                    break
                tail.insert(0, w)
            hit = _initials_match(tail, m.group(1)) if tail else None
            if hit:
                add(m.group(1), hit)
        for m in _ACR_PAREN.finditer(re.sub(r"[*_=`]", "", t)):
            ws = [w for w in re.split(r"[ \t\-]+", m.group(2)) if w]
            if [w[0].lower() for w in ws if w.lower() not in SMALL] == list(m.group(1).lower()):
                add(m.group(1), ws)
    return {a: [p for p, _ in c.most_common(3)] for a, c in sorted(found.items())}


def search_meta(texts: list[str], reserved: set[str] = frozenset()) -> dict:
    """manifest.search: the alias table (derived from the content, then the curated shorthand) and the build's stop words. `reserved` are the
    subject codes and short names: the runtimes read those as a subject ('os' lists exactly the OS questions), so they are never aliased."""
    alias: dict[str, list[str]] = {}
    for src in (derived_aliases(texts), CURATED):
        for k, v in src.items():
            nk = norm(k)
            if nk in reserved:
                continue
            cur = alias.setdefault(nk, [])
            for x in v:
                if x not in cur:
                    cur.append(x)
    return {"alias": dict(sorted(alias.items())), "stop": sorted(STOP)}
