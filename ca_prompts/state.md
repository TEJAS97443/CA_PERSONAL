# PassBook (CA Inter Group II) — lead state
Started 2026-10-20 by lead session (Opus 5.5). App: ~/CA_PERSONAL/ca_passbook (fork of ~/DSA_PERSONAL/gate_cse engine). Sources: ~/ca_sources. Briefs/progress: ~/ca_prompts.
## Agents
| job | agent id | started | status |
|---|---|---|---|
| src-sm | a4c761d4fa3742ec1 | 2026-10-20 | running |
| src-q | a9568a8898b6f1476 | 2026-10-20 | running |
| fork | a7941b5ec987e40c4 | 2026-10-20 | running |

## Lead decisions on bank-core questions (2026-10-20 ~08:45)
1. RTPs print no marks: practice only, never sat. YES.
2. "What the papers say" counts exam papers only (not RTPs/MTPs): YES (honest).
3. SM import: a later "sm-bank-fix" job finishes the 7 drafts and gives sub-topic tags to the 176 chapter-only items; full page re-read not needed (verbatim import from the verified sm-qbank pipeline).
4. Part I MCQ marks: never infer. If the question paper (or its instructions) prints the marks per MCQ, use that with its page; otherwise marks: none.
5. May 2025 P6 (6B MCQs inside the 6A answers file): leave as draft for now.
2026-10-20 ~09:40: 9 transcribers stalled at once (API stream watchdog); resumed via SendMessage
- bank: n-p4-mtp-sep2026-s2 has no printed choice rule -> left unsittable (lead: do not invent a rule)
2026-10-20 ~11:30: AWS 403 "security token invalid" killed agents (tx-33, qa, tx-32, bank-tools so far; expect all). Need credential refresh, then resume each via SendMessage (transcripts survive). Running jobs at the time: see next.py status.
Tue Oct 20 13:55:21 IST 2026: resumed 11 jobs after AWS outage (user said START AGAIN)
