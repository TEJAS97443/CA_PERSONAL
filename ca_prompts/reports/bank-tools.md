# bank-tools report (2026-10-20)

Job: improve `tools/bank/check.py` of the ICAI bank (~/CA_PERSONAL/ca_passbook) without loosening any real check, while transcribers used it.
Brief items 1-3 plus the lead's later cases are all done and installed. Installs were 3-way merges with the live file each time
(git merge-file against the version I last merged with), written to a temp file beside it and renamed, so the transcribers' own
fixes stay in: OR marks, repeated MCQ totals, "(5 MCQs x 2 Marks each)", "carries 2 Marks each", "any n of", marks-first
"(5 Marks x 4)", the n x m flip, their ligature map, Paper 6 shared pages, the OCR-scan marks branch. The command line is unchanged.

## Files changed
- `tools/bank/check.py`: everything below.
- `tests/py/test_bank.py`: 12 new tests (31 in all).
- `docs/ICAI_BANK.md` §9.3c: what check.py now expects without `accept:`, what the new `info: accept:` line means, and how far
  an accept reaches. §10: the note on imported files.

## What check.py does now
1. **Past papers** (Suggested Answers that print "Question N" once, before the question, and head the answer only "Answer"): the
   question number counts once, on the page where "Question N" stands. Each item's first `q:` page must sit under its own
   "Question N", so a wrong qno is still caught. "Question N" is never treated as a running head. The title's paper number
   ("PAPER – 4: …", "PAPER 6A :", "8A: FINANCIAL MANAGEMENT") is expected, not flagged.
2. **Case headings and labels**: a case's `label:` ("Case Scenario 1 [MCQs 1-3]") counts on the case's pages. It counts again on
   the first answer page that prints it. The digit that is the case's own qno is not counted twice. `part:` numbers ((c)(1), (4))
   count where the question page prints them at a line start. Answer-side labels and the sub-number of `label: MCQ 1.4` (printed
   "4." or "1.4") only fill a number that is missing. A `label:` with no digits (MCQ (i)) means ICAI prints no number, so the qno is
   not counted, but a roman label must agree with the qno.
3. **Ligatures** (ﬁ ﬂ ﬀ ﬃ ﬄ ﬅ ﬆ) are read as letters on both sides of the word check. A transcriber had landed the same map minutes
   earlier; I kept theirs.
4. **Furniture** that no block reproduces is expected, not flagged:
   - MTP header lines (Mock Test Paper - Series …, Date/Time of Paper, MOCK TEST PAPER 1, Test Series: …);
   - an answers file's reprinted "Time Allowed" / "Maximum Marks".
   If a block does reproduce furniture, the comparison is digit-blind, so a reproduced title with a wrong number is still caught.
5. **Running heads**:
   - variants count as one head: case, punctuation, spacing, "&"/"AND", and a page number beside the text are ignored;
   - in compilation PDFs, heads are also read on the pages the document spans;
   - a line with no letter is never a head (1,13,778 / 0.907 / 3.).
6. **Page numbers**: the page sequence is learnt from the head and foot lines, and only the page's own number is dropped (12, (12),
   - 12 -). A stacked fraction's lone number on a first or last line stays.
7. **Numbers and marks**:
   - "Rs.1,70,000" is read whole;
   - subscripts (P₁) and an equation's bold digits are read;
   - a superscript after a bracket (the square in "(…)²") is read; one right after a digit (a footnote mark, "500¹") runs into that
     number, as the text layer prints it;
   - numbers the text layer splits ("₹ 6, 00, 000", "1,50, 000", "Rs.1 0,000") are paired with the transcribed whole number;
   - marks notes "(1 + 3 Marks)", "(5 x 2 Marks = 10 Marks)" and "[2 Marks]" are read.
8. A new `info: accept: …` line lists accepted numbers that no difference uses any more.

## Verification
- `python3 -I -m unittest discover -s tests/py -p test_bank.py`: 31 tests, OK.
- `node tests/run.js bank`: 13 passed, 0 failed.
- `.venv/bin/python build.py --check`: green.
- **Every checked file (194)**, old tool = check.py as it stood just before my first install (transcribers' fixes included):
  - passing: 168 before, 194 now;
  - no file went from pass to fail, and no file has more flags;
  - flags with accepts ignored: 3,210 → 674; accepted-flag lines: 2,338 → 564.
  - In 4 files (still passing, all accepted) an existing accepted difference changed form:
    - n-p4-mtp-jan2025-s2: bold digits now read as 4,444;
    - o-p3-mtp-may2023-s2: a fraction numerator is no longer dropped, which exposes a 1;
    - n-p5-pyq-sep2026: the booklet page numbers (3), (4)… are now dropped correctly, which exposes a 3;
    - o-p6-mtp-may2020-s1: "2." and 100 are now kept.
- **Mutation test**: 2,264 wrong numbers, wrong qnos and wrong labels were injected into copies of the 194 checked files.
  - **Accepts ignored**: the new tool catches 151 that the old one missed. It misses 6 that the old one "caught". In each of those
    6, the injected number cancels a difference of the same number that the old tool already showed in that page group and the file
    already accepts (only the count changed).
  - **Unneeded accepts removed** (the state once the list below is applied): the new tool catches 372 more and misses 3. Two of the
    3 come from how far an accept reaches (below); one is a cancellation like the 6 above.

## All bank files (270: 194 checked, 75 imported, 1 draft)
- **Pass: 199.** All 194 checked files pass, plus 5 others.
- **Fail: 71.** 70 are imported SM files and 1 is the draft n-p6-pyq-may2025.sm.md:
  - 557 missing-number lines: the SM import does not transcribe headings and section instructions ("Answer Question No. 5 which
    is compulsory …", "1." before "(A)"), and §10 says these are not import errors. Earlier these numbers were hidden by the
    spurious answer-side qno token;
  - 13 extra-number lines;
  - 4 marks mismatches (o-p7-mtp-may2022-s1, o-p7-mtp-nov2018-s1, o-p7-pyq-nov2023, the draft);
  - 1 page citation: o-p7-pyq-may2023 item q9a, `q: 12-15` starts under "Question 8".
- bank/items/new/p6/n-p6-mtp-jan2025-s1.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-jan2025-s2.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-jan2026-s1.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-jan2026-s2.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-may2024-s1.sm.md (imported): 4 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-may2025-s1.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-may2025-s2.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-may2026-s1.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-may2026-s2.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-sep2024-s1.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-sep2024-s2.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-sep2025-s1.sm.md (imported): 4 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-sep2025-s2.sm.md (imported): 4 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-sep2026-s1.sm.md (imported): 4 missing, 0 extra
- bank/items/new/p6/n-p6-mtp-sep2026-s2.sm.md (imported): 5 missing, 0 extra
- bank/items/new/p6/n-p6-pyq-jan2025.sm.md (imported): 9 missing, 2 extra
- bank/items/new/p6/n-p6-pyq-jan2026.sm.md (imported): 35 missing, 1 extra
- bank/items/new/p6/n-p6-pyq-may2024.sm.md (imported): 4 missing, 0 extra
- bank/items/new/p6/n-p6-pyq-may2025.sm.md (draft): 4 missing, 10 extra; marks: the PDF's marks lines give [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5] but the items' marks: give [1, 
- bank/items/new/p6/n-p6-pyq-may2026.sm.md (imported): 20 missing, 0 extra
- bank/items/new/p6/n-p6-pyq-sep2024.sm.md (imported): 12 missing, 0 extra
- bank/items/new/p6/n-p6-pyq-sep2025.sm.md (imported): 21 missing, 0 extra
- bank/items/new/p6/n-p6-pyq-sep2026.sm.md (imported): 24 missing, 0 extra
- bank/items/new/p6/n-p6-rtp-jan2025.sm.md (imported): 11 missing, 0 extra
- bank/items/new/p6/n-p6-rtp-jan2026.sm.md (imported): 7 missing, 0 extra
- bank/items/new/p6/n-p6-rtp-may2024.sm.md (imported): 11 missing, 0 extra
- bank/items/new/p6/n-p6-rtp-may2025.sm.md (imported): 11 missing, 0 extra
- bank/items/new/p6/n-p6-rtp-may2026.sm.md (imported): 11 missing, 0 extra
- bank/items/new/p6/n-p6-rtp-sep2025.sm.md (imported): 10 missing, 0 extra
- bank/items/new/p6/n-p6-rtp-sep2026.sm.md (imported): 11 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-dec2021-s1.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-dec2021-s2.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-jul2021-s1.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-jul2021-s2.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-may2019-s1.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-may2019-s2.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-may2020-s1.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-may2022-s1.sm.md (imported): 10 missing, 0 extra; marks: the PDF's marks lines give [1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 5, 5, 5, 5, 5, 5, 5, 5] but the items' marks: give [1, 1, 1, 1, 1, 1, 1, 2, 
- bank/items/old/p7/o-p7-mtp-may2022-s2.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-may2023-s1.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-may2023-s2.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-nov2018-s1.sm.md (imported): 2 missing, 0 extra; marks: the PDF's marks lines give [2, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7] but the items' marks: give [3, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7] (PD
- bank/items/old/p7/o-p7-mtp-nov2018-s2.sm.md (imported): 1 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-nov2019-s1.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-nov2020-s1.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-nov2022-s1.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-nov2022-s2.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-nov2023-s1.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-mtp-nov2023-s2.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-dec2021.sm.md (imported): 1 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-jul2021.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-may2018.sm.md (imported): 1 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-may2019.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-may2022.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-may2023.sm.md (imported): 4 missing, 0 extra; item q9a: qno 9, but its first question page (p.12) is under ICAI's 'Question 8' (the qno or the q: pages are wrong)
- bank/items/old/p7/o-p7-pyq-nov2019.sm.md (imported): 1 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-nov2020.sm.md (imported): 1 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-nov2022.sm.md (imported): 4 missing, 0 extra
- bank/items/old/p7/o-p7-pyq-nov2023.sm.md (imported): 4 missing, 0 extra; marks: the PDF's marks lines give [1, 1, 1, 1, 1, 2, 2, 4, 4, 4, 4, 5, 5, 5, 5, 5] but the items' marks: give [5, 5, 5, 5, 5, 5, 5, 5, 5] (PD
- bank/items/old/p7/o-p7-rtp-dec2021.sm.md (imported): 14 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-jul2021.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-may2018.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-may2019.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-may2020.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-may2022.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-may2023.sm.md (imported): 14 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-nov2018.sm.md (imported): 8 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-nov2019.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-nov2020.sm.md (imported): 11 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-nov2022.sm.md (imported): 9 missing, 0 extra
- bank/items/old/p7/o-p7-rtp-nov2023.sm.md (imported): 21 missing, 0 extra

## Accept entries no longer needed (not edited; your decision)
166 of the 194 checked files; 1,631 accepted numbers in all.
- In 112 files every accepted number is unneeded.
- In 54 files part of the accept list is still needed.
Until these are removed, they can hide a real difference of the same number. Each file's check.py output prints the same list
(`info: accept: …`). One line per file, the numbers check.py says are unused:
- bank/items/new/p4/n-p4-mtp-jan2025-s1.md: 2, 4, 5, 21, 2,024, 2,024
- bank/items/new/p4/n-p4-mtp-jan2025-s2.md: 2, 4, 5, 12, 2,024, 2,024
- bank/items/new/p4/n-p4-mtp-jan2026-s1.md: 1, 4, 10, 24, 2,025, 2,025
- bank/items/new/p4/n-p4-mtp-jan2026-s2.md: 1, 4, 10, 12, 2,025, 2,025
- bank/items/new/p4/n-p4-mtp-may2024-s1.md: 2, 4, 5, 12, 2,024, 2,024, 2,024
- bank/items/new/p4/n-p4-mtp-may2024-s2.md: 1, 4, 10, 16, 2,024, 2,024
- bank/items/new/p4/n-p4-mtp-may2025-s1.md: 1, 4, 5, 10, 15, 2,025, 2,025
- bank/items/new/p4/n-p4-mtp-may2025-s2.md: 1, 2, 3, 4, 10, 2,025, 2,025
- bank/items/new/p4/n-p4-mtp-may2026-s1.md: 1, 1, 2, 4, 10, 23, 2,026, 2,026
- bank/items/new/p4/n-p4-mtp-may2026-s2.md: 1, 2, 4, 8, 10, 2,026, 2,026
- bank/items/new/p4/n-p4-mtp-sep2024-s1.md: 1, 2, 4, 5, 2,024, 2,024
- bank/items/new/p4/n-p4-mtp-sep2024-s2.md: 2, 4, 5, 21, 2,024, 2,024
- bank/items/new/p4/n-p4-mtp-sep2025-s1.md: 1, 1, 2, 2, 2, 4, 5, 5, 10, 10, 10, 24, 2,025, 2,025
- bank/items/new/p4/n-p4-mtp-sep2025-s2.md: 1, 1, 2, 4, 7, 10, 2,025, 2,025
- bank/items/new/p4/n-p4-mtp-sep2026-s1.md: 1, 1, 2, 4, 10, 31, 2,026, 2,026
- bank/items/new/p4/n-p4-mtp-sep2026-s2.md: 1, 1, 2, 4, 10, 14, 2,026, 2,026
- bank/items/new/p4/n-p4-pyq-jan2025.md: 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6
- bank/items/new/p4/n-p4-pyq-jan2026.md: 1, 2, 3, 4, 5, 6
- bank/items/new/p4/n-p4-pyq-may2024.md: 1, 2, 3, 4, 5, 6
- bank/items/new/p4/n-p4-pyq-may2025.md: 0, 0, 0, 1, 2, 3, 4, 5, 6, 25, 40, 50, 25,000, 40,000, 50,000
- bank/items/new/p4/n-p4-pyq-may2026.md: 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 18, 54, 18,000, 3,00,000, 6,00,000, 54,00,000
- bank/items/new/p4/n-p4-pyq-sep2024.md: 1, 2, 3, 4, 4, 5, 6
- bank/items/new/p4/n-p4-pyq-sep2025.md: 1, 2, 3, 4, 4, 5, 6
- bank/items/new/p4/n-p4-pyq-sep2026.md: 12
- bank/items/new/p4/n-p4-rtp-jan2025.md: 4, 2,025, 2,025, 2,025
- bank/items/new/p4/n-p4-rtp-jan2026.md: 0, 0, 0, 4, 5, 5, 12, 40, 80, 88, 5,40,000, 5,40,000, 12,88,000
- bank/items/new/p4/n-p4-rtp-may2024.md: 3, 3, 3, 4, 30,000
- bank/items/new/p4/n-p4-rtp-may2025.md: 4, 120
- bank/items/new/p4/n-p4-rtp-may2026.md: 4
- bank/items/new/p4/n-p4-rtp-sep2024.md: 4, 7
- bank/items/new/p4/n-p4-rtp-sep2025.md: 4, 2,025, 2,025
- bank/items/new/p4/n-p4-rtp-sep2026.md: 4
- bank/items/new/p5/n-p5-mtp-jan2025-s1.md: 1, 2, 2, 3, 5, 5, 22, 2,024, 2,024
- bank/items/new/p5/n-p5-mtp-jan2025-s2.md: 1, 2, 2, 3, 5, 5, 13, 2,024, 2,024
- bank/items/new/p5/n-p5-mtp-jan2026-s1.md: 1, 1, 1, 2, 3, 5, 5, 6, 9, 10, 10, 12, 26, 2,025, 2,025
- bank/items/new/p5/n-p5-mtp-jan2026-s2.md: 1, 1, 1, 2, 3, 5, 5, 6, 9, 10, 10, 12, 15, 2,025, 2,025
- bank/items/new/p5/n-p5-mtp-may2024-s1.md: 1, 2, 5, 5, 14, 1.1, 1.2, 1.3, 1.4, 1.5, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 2,024, 2,024
- bank/items/new/p5/n-p5-mtp-may2024-s2.md: 2, 5, 5, 12, 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 2,024, 2,024
- bank/items/new/p5/n-p5-mtp-may2025-s1.md: 1, 1, 2, 3, 5, 10, 17, 2,025, 2,025
- bank/items/new/p5/n-p5-mtp-may2025-s2.md: 1, 1, 2, 3, 5, 5, 10, 2,025, 2,025
- bank/items/new/p5/n-p5-mtp-may2026-s1.md: 1, 1, 1, 2, 3, 3, 4, 5, 7, 8, 10, 12, 25, 2,026, 2,026
- bank/items/new/p5/n-p5-mtp-may2026-s2.md: 1, 1, 1, 2, 3, 4, 5, 7, 8, 10, 10, 12, 2,026, 2,026
- bank/items/new/p5/n-p5-mtp-sep2024-s1.md: 1, 2, 2, 2, 3, 5, 5, 2,024, 2,024
- bank/items/new/p5/n-p5-mtp-sep2024-s2.md: 1, 2, 2, 3, 5, 5, 22, 2,024, 2,024
- bank/items/new/p5/n-p5-mtp-sep2025-s1.md: 1, 1, 1, 2, 3, 5, 5, 6, 9, 10, 10, 12, 25, 2,025, 2,025
- bank/items/new/p5/n-p5-mtp-sep2025-s2.md: 1, 1, 1, 2, 3, 4, 5, 5, 8, 8, 9, 10, 12, 2,025, 2,025
- bank/items/new/p5/n-p5-mtp-sep2026-s1.md: 1, 1, 1, 2, 3, 3, 3, 4, 5, 7, 8, 10, 12, 2,026, 2,026
- bank/items/new/p5/n-p5-mtp-sep2026-s2.md: 1, 1, 3, 5, 6, 10, 17, 100, 202, 2,026, 2,026
- bank/items/new/p5/n-p5-pyq-jan2025.md: 1, 2, 3, 4, 5, 6
- bank/items/new/p5/n-p5-pyq-jan2026.md: 2, 3, 4, 5, 6
- bank/items/new/p5/n-p5-pyq-may2024.md: 1, 2, 3, 4, 5, 6
- bank/items/new/p5/n-p5-pyq-may2025.md: 1, 2, 3, 4, 5, 6
- bank/items/new/p5/n-p5-pyq-may2026.md: 1, 2, 3, 4, 5, 6
- bank/items/new/p5/n-p5-pyq-sep2024.md: 1, 1, 2, 2, 3, 3, 4, 5, 5, 5, 6
- bank/items/new/p5/n-p5-pyq-sep2025.md: 1, 2, 3, 4, 5, 6
- bank/items/new/p5/n-p5-pyq-sep2026.md: 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
- bank/items/new/p5/n-p5-rtp-may2024.md: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4
- bank/items/new/p5/n-p5-rtp-may2025.md: 5
- bank/items/new/p5/n-p5-rtp-sep2026.md: 1, 5
- bank/items/new/p6/n-p6-mtp-jan2025-s1.fm.md: 2, 5, 6, 6, 23, 2,024, 2,024
- bank/items/new/p6/n-p6-mtp-jan2025-s2.fm.md: 2, 5, 6, 6, 13, 14, 2,024, 2,024
- bank/items/new/p6/n-p6-mtp-jan2026-s1.fm.md: 1, 6, 6, 10, 28, 2,025, 2,025
- bank/items/new/p6/n-p6-mtp-jan2026-s2.fm.md: 1, 6, 6, 10, 17, 365, 2,025, 2,025
- bank/items/new/p6/n-p6-mtp-may2024-s1.fm.md: 2, 5, 6, 6, 16, 2,024, 2,024
- bank/items/new/p6/n-p6-mtp-may2024-s2.fm.md: 2, 2, 3, 4, 5, 5, 6, 6, 15, 2,024, 2,024
- bank/items/new/p6/n-p6-mtp-may2025-s1.fm.md: 1, 6, 6, 10, 19, 2,025, 2,025
- bank/items/new/p6/n-p6-mtp-may2025-s2.fm.md: 1, 6, 6, 7, 10, 2,025, 2,025
- bank/items/new/p6/n-p6-mtp-may2026-s1.fm.md: 1, 6, 6, 10, 27, 2,026, 2,026
- bank/items/new/p6/n-p6-mtp-may2026-s2.fm.md: 1, 6, 6, 10, 13, 2,026, 2,026
- bank/items/new/p6/n-p6-mtp-sep2024-s1.fm.md: 2, 3, 5, 6, 6, 2,024, 2,024
- bank/items/new/p6/n-p6-mtp-sep2024-s2.fm.md: 2, 5, 6, 6, 23, 2,024, 2,024
- bank/items/new/p6/n-p6-mtp-sep2025-s1.fm.md: 1, 2, 5, 6, 6, 7, 8, 10, 26, 2,025, 2,025
- bank/items/new/p6/n-p6-mtp-sep2025-s2.fm.md: 1, 6, 6, 10, 11, 2,025, 2,025
- bank/items/new/p6/n-p6-mtp-sep2026-s1.fm.md: 1, 5, 6, 6, 10, 2,026, 2,026
- bank/items/new/p6/n-p6-mtp-sep2026-s2.fm.md: 1, 6, 6, 10, 19, 2,026, 2,026
- bank/items/new/p6/n-p6-pyq-jan2025.fm.md: 1, 2, 3, 4, 6, 2,025, 2,025, 2,025
- bank/items/new/p6/n-p6-pyq-jan2026.fm.md: 1, 2, 3, 4, 6, 10
- bank/items/new/p6/n-p6-pyq-may2024.fm.md: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 3, 4, 6, 25, 25, 25, 43, 75, 75, 91, 113, 151, 13,250, 25,000, 25,000, 91,00,000, 1,13,75,000, 1,25,00,000, 1,32,50,000, 1,43,75,000, 1,51,00,000
- bank/items/new/p6/n-p6-pyq-may2025.fm.md: 1, 2, 3, 4, 6
- bank/items/new/p6/n-p6-pyq-may2026.fm.md: 1, 2, 3, 4, 6
- bank/items/new/p6/n-p6-pyq-sep2024.fm.md: 1, 1, 3, 4, 6, 6, 43,500, 2,43,500
- bank/items/new/p6/n-p6-pyq-sep2025.fm.md: 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 6, 8, 20, 20, 20, 20, 50, 55, 20,20,000, 20,20,000, 50,00,000, 55,00,000
- bank/items/new/p6/n-p6-pyq-sep2026.fm.md: 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 7
- bank/items/new/p6/n-p6-rtp-jan2025.fm.md: 6, 6, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025
- bank/items/new/p6/n-p6-rtp-jan2026.fm.md: 2, 6, 6
- bank/items/new/p6/n-p6-rtp-may2024.fm.md: 0, 0, 0, 1, 4, 4, 5, 6, 6, 20, 80, 80, 750, 1,00,000, 4,80,000, 4,80,000, 5,20,000, 7,50,000
- bank/items/new/p6/n-p6-rtp-may2025.fm.md: 6, 6
- bank/items/new/p6/n-p6-rtp-may2026.fm.md: 2, 2, 6, 6, 11
- bank/items/new/p6/n-p6-rtp-sep2024.fm.md: 6, 6, 2,024, 2,024, 2,024, 2,024
- bank/items/new/p6/n-p6-rtp-sep2025.fm.md: 6, 6, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025, 2,025
- bank/items/new/p6/n-p6-rtp-sep2026.fm.md: 6, 6, 2,026, 2,026, 2,026, 2,026, 2,026, 2,026
- bank/items/old/p3/o-p3-mtp-dec2021-s2.md: 2, 2, 3, 3, 2,021, 2,021
- bank/items/old/p3/o-p3-mtp-jul2021-s1.md: 1, 3, 2,021
- bank/items/old/p3/o-p3-mtp-jul2021-s2.md: 3, 3, 2,021, 2,021
- bank/items/old/p3/o-p3-mtp-may2020-s1.md: 1, 1, 3, 3, 2,020, 2,020
- bank/items/old/p3/o-p3-mtp-may2022-s1.md: 1, 1, 2, 3, 3, 202, 2,022
- bank/items/old/p3/o-p3-mtp-may2022-s2.md: 2, 2, 3, 202, 2,022
- bank/items/old/p3/o-p3-mtp-may2023-s1.md: 1, 1, 3, 3, 2,023, 2,023
- bank/items/old/p3/o-p3-mtp-may2023-s2.md: 2, 2, 3, 3, 202, 2,023
- bank/items/old/p3/o-p3-mtp-nov2022-s1.md: 1, 3, 2,022
- bank/items/old/p3/o-p3-mtp-nov2022-s2.md: 2, 2, 3, 3, 2,022, 2,022
- bank/items/old/p3/o-p3-mtp-nov2023-s1.md: 1, 3, 3, 3, 2,023
- bank/items/old/p3/o-p3-mtp-nov2023-s2.md: 2, 3, 20, 23, 2,023
- bank/items/old/p3/o-p3-pyq-dec2021.md: 1, 2, 3, 4, 5, 6
- bank/items/old/p3/o-p3-pyq-jan2021.md: 1, 2, 3, 4, 5, 6
- bank/items/old/p3/o-p3-pyq-jul2021.md: 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 5, 6, 51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73, 75, 500
- bank/items/old/p3/o-p3-pyq-may2022.md: 1, 2, 3, 3, 4, 5, 6, 8
- bank/items/old/p3/o-p3-pyq-may2023.md: 1, 2, 3, 3, 4, 5, 6
- bank/items/old/p3/o-p3-pyq-nov2019.md: 0, 1, 2, 3, 3, 4, 5, 6, 12, 12,000
- bank/items/old/p3/o-p3-pyq-nov2020.md: 1, 2, 3, 3, 4, 5, 6, 125
- bank/items/old/p3/o-p3-pyq-nov2022.md: 1, 2, 3, 3, 4, 5, 6
- bank/items/old/p3/o-p3-pyq-nov2023.md: 1, 2, 3, 4, 5, 6
- bank/items/old/p3/o-p3-rtp-nov2023.md: 1, 2, 3, 4, 400, 500, 600, 700, 4,003, 5,001, 6,004, 7,002
- bank/items/old/p6/o-p6-mtp-dec2021-s1.md: 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 2,021
- bank/items/old/p6/o-p6-mtp-dec2021-s2.md: 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 2,021
- bank/items/old/p6/o-p6-mtp-jul2021-s1.md: 1, 1, 1, 2, 2, 3, 3, 4, 5, 6, 9, 2,021
- bank/items/old/p6/o-p6-mtp-jul2021-s2.md: 1, 1, 2, 2, 2, 3, 3, 4, 4, 5, 5, 6, 29, 2,021
- bank/items/old/p6/o-p6-mtp-may2020-s1.md: 1, 1, 2, 2, 3, 3, 4, 4, 5, 5
- bank/items/old/p6/o-p6-mtp-may2022-s1.md: 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 2,022
- bank/items/old/p6/o-p6-mtp-may2022-s2.md: 2, 6, 2,022
- bank/items/old/p6/o-p6-mtp-may2023-s1.md: 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 2,023
- bank/items/old/p6/o-p6-mtp-may2023-s2.md: 2, 2, 6, 2,023
- bank/items/old/p6/o-p6-mtp-nov2020-s1.md: 1, 2, 2, 3, 3, 5
- bank/items/old/p6/o-p6-mtp-nov2022-s1.md: 1, 6, 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2,022
- bank/items/old/p6/o-p6-mtp-nov2022-s2.md: 2, 6, 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2,022
- bank/items/old/p6/o-p6-mtp-nov2023-s1.md: 1, 6, 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2,023
- bank/items/old/p6/o-p6-mtp-nov2023-s2.md: 2, 6, 1.1, 2.1, 2.2, 2.3, 2.4, 2.5, 2,023
- bank/items/old/p6/o-p6-pyq-dec2021.md: 1, 2, 3, 4, 5, 6, 6
- bank/items/old/p6/o-p6-pyq-jan2021.md: 1, 1, 2, 3, 3, 4, 4, 5, 5, 6
- bank/items/old/p6/o-p6-pyq-jul2021.md: 1, 2, 3, 4, 5, 6, 6, 6, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 2,021, 2,021, 2,021, 2,021
- bank/items/old/p6/o-p6-pyq-may2022.md: 1, 2, 3, 4, 5, 6, 6
- bank/items/old/p6/o-p6-pyq-may2023.md: 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6
- bank/items/old/p6/o-p6-pyq-nov2019.md: 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 6, 6
- bank/items/old/p6/o-p6-pyq-nov2020.md: 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 6
- bank/items/old/p6/o-p6-pyq-nov2022.md: 1, 1, 2, 3, 3, 4, 4, 5, 5, 6, 6, 19, 192
- bank/items/old/p6/o-p6-pyq-nov2023.md: 1, 1, 2, 2, 3, 4, 4, 5, 5, 6
- bank/items/old/p6/o-p6-rtp-dec2021.md: 1, 1, 2, 2, 3, 4, 5
- bank/items/old/p6/o-p6-rtp-jul2021.md: 1, 1, 2, 2, 3, 4, 5
- bank/items/old/p6/o-p6-rtp-may2022.md: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5
- bank/items/old/p6/o-p6-rtp-nov2022.md: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5
- bank/items/old/p6/o-p6-rtp-nov2023.md: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5
- bank/items/old/p8/o-p8-mtp-dec2021-s1.md: 1, 8, 8, 2,021
- bank/items/old/p8/o-p8-mtp-dec2021-s2.md: 2, 8, 8, 2,021
- bank/items/old/p8/o-p8-mtp-jul2021-s1.md: 0.5, 0.5, 0.7, 0.7, 0.13, 0.19, 0.19, 0.24, 0.75, 2.75, 2.75, 0.864, 0.907, 1.000, 1.161, 2.046, 3.605, 3.605, 5.651, 5.651, 6.812, 1,02,000, 1,05,000, 1,13,778, 1,20,000, 1,26,000, 1,43,220, 2,52,350, 2,52,350, 2,70,400, 6,48,000, 7,50,000, 9,52,350, 9,69,920, 10,00,000, 10,00,000, 10,00,000, 10,48,230, 10,65,000, 11,18,920, 14,68,320, 15,00,000, 15,00,000, 15,26,120, 16,00,000, 19,20,778, 45,31,678
- bank/items/old/p8/o-p8-mtp-jul2021-s2.md: 8, 8, 2,021
- bank/items/old/p8/o-p8-mtp-may2022-s1.md: 1, 8, 8, 2,022
- bank/items/old/p8/o-p8-mtp-may2022-s2.md: 8, 8, 2,022
- bank/items/old/p8/o-p8-mtp-may2023-s1.md: 1, 8, 8, 2,023, 1,27,500, 1,35,000, 4,00,000, 4,90,000, 7,50,000, 9,75,000, 20,00,000
- bank/items/old/p8/o-p8-mtp-may2023-s2.md: 2, 8, 8, 2,023
- bank/items/old/p8/o-p8-mtp-nov2019-s1.md: 0.08, 0.52, 0.751, 0.826, 11.80, 0.0125, 0.0833, 0.1457, 0.1490
- bank/items/old/p8/o-p8-mtp-nov2020-s1.md: 8, 2,020
- bank/items/old/p8/o-p8-mtp-nov2022-s1.md: 1, 8, 8, 2,022
- bank/items/old/p8/o-p8-mtp-nov2022-s2.md: 0, 0, 0, 0, 2, 2, 8, 8, 8, 20, 2,000, 2,022, 20,00,000, 20,00,000, 2,08,00,000
- bank/items/old/p8/o-p8-mtp-nov2023-s1.md: 0, 0, 0, 1, 8, 8, 2,023, 70,000, 1,70,000, 90,00,000, 1,90,00,000
- bank/items/old/p8/o-p8-mtp-nov2023-s2.md: 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 4, 4, 4, 4, 8, 8, 8, 8, 20, 20, 66, 80, 80, 80, 80, 210, 2,023, 20,000, 20,000, 2,10,000, 2,66,000, 3,00,000, 3,80,000, 4,00,000, 4,00,000, 4,80,000, 4,80,000, 8,00,000, 8,00,000, 8,80,000, 40,00,000
- bank/items/old/p8/o-p8-pyq-dec2021.md: 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 80, 360
- bank/items/old/p8/o-p8-pyq-jan2021.md: 1, 1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 8, 8, 8, 8, 9, 11, 13, 100
- bank/items/old/p8/o-p8-pyq-jul2021.md: 1, 1, 2, 4, 5, 6, 8, 8, 8, 8, 8, 8, 12, 15, 31, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 2,021, 2,021, 2,021, 2,021, 2,021
- bank/items/old/p8/o-p8-pyq-may2022.md: 1, 2, 3, 4, 5, 6, 8
- bank/items/old/p8/o-p8-pyq-may2023.md: 1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 2,023, 2,023, 2,023, 2,023
- bank/items/old/p8/o-p8-pyq-nov2019.md: 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 9, 11, 13, 15, 17, 19
- bank/items/old/p8/o-p8-pyq-nov2020.md: 1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 8, 8, 8, 9, 11, 13
- bank/items/old/p8/o-p8-pyq-nov2022.md: 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 150, 1,50,000
- bank/items/old/p8/o-p8-pyq-nov2023.md: 1, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 2,023, 2,023, 2,023, 2,023
- bank/items/old/p8/o-p8-rtp-nov2020.md: 3, 5, 7, 9, 11, 13, 15, 17, 19
- bank/items/old/p8/o-p8-rtp-nov2023.md: 3, 5, 7, 9, 11, 13, 15, 17

Files whose accept lines are wholly unnecessary (112): see the list above. In these the whole `accept:` line (and its
note's check.py part) can go.

## How far an accept reaches (tx-62)
`accept: 1` covers a shortfall of one `1` in each page group, not one in the whole file. I tried counting accepts against the
file-wide total, but 24 checked files fail that way: n-p4-pyq-sep2026, n-p5-mtp-may2024-s1/-s2, n-p5-pyq-sep2026, n-p5-rtp-jan2025,
n-p5-rtp-may2024, n-p5-rtp-sep2025, n-p6-pyq-may2025.fm, o-p3-mtp-may2023-s2, o-p6-mtp-may2022-s2, o-p6-mtp-may2023-s2,
o-p6-mtp-nov2022-s1/-s2, o-p6-mtp-nov2023-s1/-s2, o-p6-rtp-jul2021, -may2020, -may2022, -may2023, -nov2019, -nov2020, -nov2022,
-nov2023 and o-p8-pyq-nov2019. So the reach is unchanged and documented in ICAI_BANK.md §9.3c. Switching needs those files'
accept lists repeated per occurrence first.

## Left as it is
- **Answer-side part labels**: they only fill a missing number, so an extra number equal to such a dropped label can cancel it.
  Making them full tokens would correctly raise n-p6-mtp-may2024-s2 from 2 to 3 extra 1s (its note says three) and fail that file.
- **Paper 6 FM files**: the shared answer-key page also prints the SM MCQs 9-16. Their numbers are still accepted in those files.
- A multiset diff cannot place a number on a page. An inserted number equal to a difference that is already reported will always
  cancel it.
