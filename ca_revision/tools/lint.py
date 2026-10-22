"""lint: check a PassBook, Out Loud episode against ~/CA_PERSONAL/ca_revision/SPEC.md (flowing Hinglish prose, the Tapri storyline).

    python3 ~/CA_PERSONAL/ca_revision/tools/lint.py ~/CA_PERSONAL/ca_revision/script/P4-01.txt [more files]

Errors must be fixed (the TTS engine reads exactly what is written; the 8-hour total depends on the word budget).
"""
import re
import sys
from pathlib import Path

EMO = set("affection amusement awe contemplation contentment determination enthusiasm fear helplessness pride relief "
          "sadness surprise confusion".split())
PROS = {"speed_slow", "expressive_high", "pause", "long_pause"}
SFX = {"laughter", "sigh"}
TAG = re.compile(r"<\|([a-z_]+):([a-z_]+)\|>")
SYMBOLS = re.compile(r"[%/=<>*&#@_+|\\{}\[\]~^$₹]")
DEVA = re.compile(r"[ऀ-ॿ]")
EPS = [f"P4-{n:02d}" for n in range(1, 16)] + [f"P5-{n:02d}" for n in range(1, 12)] + \
      [f"P6A-{n:02d}" for n in range(1, 10)] + [f"P6B-{n:02d}" for n in range(1, 6)]
T, LO, HI = 1700, 1450, 1750
NEED = ("Introduction", "Exam angle", "Summary")
STALE = re.compile(r"Kirana|किराना|ShowSpot|अदिति|Hall of Shame|तुम |तुम्हारा|तुम्हें")
CLOCK = re.compile(r"(?<![ऀ-ॿ])(बजे|बजकर|सुबह|रात|शाम|दोपहर)(?![ऀ-ॿ])")
LONG = {"P4-01", "P4-03", "P4-14", "P5-03", "P5-04", "P5-05", "P5-08", "P6A-09"}
ABBR = re.compile(r"\b(Ltd|Pvt|Co)\b\.?|&")
LATIN_RUN = re.compile(r"(?:[A-Za-z][A-Za-z'’,.-]*\s+){16,}[A-Za-z]")
THINK = "Audio रोक के सोचो"


def lint(path: Path):
    errs, warns = [], []
    raw = path.read_text()
    lines = raw.splitlines()
    ep = path.stem
    if ep not in EPS:
        errs.append("file must be named P4-01.txt … P6B-05.txt")
    chapters, spoken, emos = [], [], []
    counts = {"surprise": 0, "laughter": 0, "sigh": 0}
    total = tagged = 0
    para, paras = 0, []
    first_chapter_text = []
    for n, ln in enumerate(lines, 1):
        s = ln.strip()
        if not s:
            if para: paras.append((n, para)); para = 0
            continue
        if s.startswith("# ") or s == "#":
            continue
        if s.startswith("## "):
            if para: paras.append((n, para)); para = 0
            chapters.append(s[3:]); continue
        if re.fullmatch(r"\[pause [\d.]+\]|\[chime\]", s):
            continue
        if s.startswith("#"):
            errs.append(f"L{n}: '#' line that is neither a comment nor a chapter"); continue
        if "<|" in s.replace("|>", "") and len(TAG.findall(s)) != s.count("<|"):
            errs.append(f"L{n}: malformed tag: {s[:60]}")
        lead = re.match(r"^((?:<\|[a-z_]+:[a-z_]+\|>)*)", s).group(1)
        lead_tags = TAG.findall(lead)
        for cat, val in TAG.findall(s):
            inline = (cat, val) not in lead_tags
            if cat == "emotion":
                if val not in EMO: errs.append(f"L{n}: unknown emotion '{val}'")
                if inline: errs.append(f"L{n}: emotion tag must be at the start of the line")
                if val == "surprise": counts["surprise"] += 1
            elif cat == "prosody":
                if val not in PROS: errs.append(f"L{n}: unknown prosody '{val}'")
            elif cat == "sfx":
                if val not in SFX: errs.append(f"L{n}: unknown sfx '{val}'")
                counts[val] = counts.get(val, 0) + 1
                if not re.search(r"<\|sfx:%s\|>[A-Za-zऀ-ॿ]" % val, s):
                    errs.append(f"L{n}: sfx tag must be followed directly by its sound word")
            else:
                errs.append(f"L{n}: unknown tag category '{cat}'")
        emo = next((v for c, v in lead_tags if c == "emotion"), None)
        text = re.sub(r"\s+", " ", TAG.sub(" ", s)).strip()
        words = len(text.split())
        total += words
        tagged += bool(emo)
        emos.append(emo)
        para += 1
        if len(chapters) == 1:
            first_chapter_text.append(text)
        if words < 8: errs.append(f"L{n}: {words} words — a fragment; write one or two complete sentences: {text[:60]}")
        elif words < 11: warns.append(f"L{n}: only {words} words — merge with a neighbour if it is not a full thought")
        if words > 34: errs.append(f"L{n}: {words} words (max 32): {text[:60]}…")
        elif words > 32: warns.append(f"L{n}: {words} words (aim for 32 or fewer)")
        if not re.search(r"[।?!.]$", text): warns.append(f"L{n}: line does not end like a sentence: …{text[-30:]}")
        if re.search(r"\d", text): errs.append(f"L{n}: digits must be written as words: {text[:60]}")
        mm = SYMBOLS.search(text)
        if mm: errs.append(f"L{n}: symbol '{mm.group(0)}' will be read oddly: {text[:60]}")
        if not DEVA.search(text): warns.append(f"L{n}: no Hindi (Devanagari) in this line: {text[:60]}")
        if ABBR.search(text): errs.append(f"L{n}: spell abbreviations out (Company Limited, Private Limited, and): {text[:60]}")
        if LATIN_RUN.search(text): warns.append(f"L{n}: a run of 17+ English words; split the list over two lines: {text[:60]}")
        if STALE.search(text): errs.append(f"L{n}: off-series element (another course's story, Hall of Shame, or तुम instead of आप): {text[:60]}")
        if THINK in text: counts["think"] = counts.get("think", 0) + 1
        spoken.append(text)
    if para: paras.append((len(lines), para))
    for n, p in paras:
        if p > 8: warns.append(f"paragraph ending near L{n} has {p} lines (aim 3–6)")
    singles = sum(1 for _, p in paras if p == 1)
    if singles > 4: warns.append(f"{singles} one-line paragraphs (aim for paragraphs of 3–6 lines)")
    if CLOCK.search(" ".join(first_chapter_text)):
        errs.append("the Introduction must not open with a time-of-day scene (सुबह / रात / … बजे)")
    run = 1
    for a, b in zip(emos, emos[1:]):
        run = run + 1 if (a and a == b) else 1
        if run == 4: warns.append(f"4+ lines in a row with emotion '{a}'")
    for k in ("surprise", "laughter", "sigh"):
        if counts.get(k, 0) > 1: errs.append(f"{k} used {counts[k]} times (max 1)")
    if counts.get("think", 0) > 1: errs.append("more than one pause-and-think break (v2 allows at most one)")
    hi_ = 1850 if ep in LONG else HI
    if not LO <= total <= hi_: errs.append(f"{total} spoken words (allowed {LO}–{hi_}, aim 1550–{1850 if ep in LONG else T})")
    elif total < 1550: warns.append(f"{total} spoken words (aim 1550–{T})")
    ratio = tagged / max(1, len(spoken))
    if ratio > 0.5: errs.append(f"{ratio:.0%} of lines tagged (v2 is calm: aim 25–35 %, max 50 %)")
    elif not 0.2 <= ratio <= 0.4: warns.append(f"{ratio:.0%} of lines tagged (aim 25–35 %)")
    for nd in NEED:
        if not any(c.lower().startswith(nd.lower()) for c in chapters):
            errs.append(f"missing chapter '## {nd}: …'")
    if chapters and not chapters[0].lower().startswith("introduction"):
        errs.append("first chapter must be '## Introduction: …'")
    if chapters and not chapters[-1].lower().startswith("summary"):
        errs.append("last chapter must be '## Summary: …'")
    core = [c for c in chapters if not any(c.lower().startswith(nd.lower()) for nd in NEED)]
    if not 2 <= len(core) <= 4: errs.append(f"{len(core)} topic chapters (need 2–4)")
    if chapters and len(chapters) >= 2 and not chapters[-2].lower().startswith("exam angle"):
        errs.append("'## Exam angle: …' must come just before the Summary")
    if not any("PassBook, Out Loud" in s for s in spoken): errs.append("must name the show 'PassBook, Out Loud'")
    if not any("Arjun" in s for s in spoken): errs.append("must name the host 'Arjun'")
    if not any("Tapri" in s for s in spoken): errs.append("the Tapri storyline is missing")
    if not re.match(r"^# P(4|5|6A|6B)-\d\d · [a-z0-9-]+ · .+", lines[0] if lines else ""):
        errs.append("first line must be '# <EP> · <slug> · <Hindi title>'")
    return total, len(spoken), len(chapters), len(paras), ratio, errs, warns


if __name__ == "__main__":
    bad = 0
    for f in sys.argv[1:]:
        total, nl, nc, npara, ratio, errs, warns = lint(Path(f))
        print(f"{f}: {total} words · {nl} lines · {npara} paragraphs · {nc} chapters · {ratio:.0%} tagged")
        for e in errs: print("  ERROR", e)
        for w in warns: print("  warn ", w)
        print(f"  {len(errs)} errors, {len(warns)} warnings")
        bad += len(errs)
    sys.exit(1 if bad else 0)
