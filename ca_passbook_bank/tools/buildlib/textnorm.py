"""One normalisation for the search index and the query (audit P1-26).

`norm()` is a faithful port of `norm()` in app/js/core/pyqlib.js and app/js/core/search.js, so a word the build indexes is exactly the word the
bank and the palette look up: LR(1) -> lr1, banker's -> banker, go-back-n -> go back n, L'Hôpital -> lhopital, ε -> epsilon, B+ tree -> bplus tree.
tests/build-data.test.js checks the port against the JS original on every question text.
"""
from __future__ import annotations

import re
import unicodedata

_A = re.ASCII          # JS regexes: \b, \d and \s are ASCII there


def norm(s) -> str:
    s = "" if s is None else str(s)
    s = s.lower().replace("ε", " epsilon ")
    s = "".join(c for c in unicodedata.normalize("NFD", s) if not "\u0300" <= c <= "\u036f")
    s = re.sub(r"[’‘`´]", "'", s)
    s = re.sub(r"([a-z0-9])'s\b", r"\1", s, flags=_A)
    s = s.replace("'", "")
    s = re.sub(r"([a-z]+)\s*\((\d+)\)", r"\1\2", s, flags=_A)        # LR(1) -> lr1, LL(1) -> ll1
    s = re.sub(r"\b([a-z])\+", r"\1plus ", s, flags=_A)              # B+ tree -> bplus tree
    return re.sub(r"[^a-z0-9]+", " ", s).strip()


def words(s) -> list[str]:
    n = norm(s)
    return n.split(" ") if n else []
