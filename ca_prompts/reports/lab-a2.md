# lab-a2 report: audit-opinion, threats, npa (Paper 5)

All three labs are `ready` in content/labs.json (set through tools/lab_status.py). Tests: lab-audit-opinion 27, lab-threats 12, lab-npa 24, all passing; the shared labs-* tests pass for all three. `build.py --check` is clean and data has been written.

The full suite is 1411 passed, 1 failed. The one failure is the blurb-length test (P2-59), on `wacc` (another job's lab, 256 characters); earlier in the run `dividend` failed the same test.

Files (mine only):
- `app/js/labs/audit-opinion.js`, `tests/lab-audit-opinion.test.js`
- `app/js/labs/threats.js`, `tests/lab-threats.test.js`
- `app/js/labs/npa.js`, `tests/lab-npa.test.js`
- `app/css/labs.css`: three lines under `/* lab: threats */` (clue `<mark>`) and `/* lab: audit-opinion and threats */` (case card flush with the stage)

## 1. audit-opinion: Audit Opinion Lab (aud.report)

**What it does.** A case is walked down ICAI's decision tree one node per frame. The path lights up in a `tree` diagram, with edge colours tracing the route. There is one tree per kind of matter:
- SA 705 misstatement: material? → pervasive?
- Inability to obtain evidence: alternative procedures? → possible effects material? → pervasive?
- SA 705 para 5.5 management-imposed limitation: removed when requested? → tell TCWG and try alternative procedures → pervasive? → qualified, or withdraw/disclaim. This follows the Study Material's own p. 8.42 diagram.
- SA 570: going concern basis appropriate? → material uncertainty? → adequately disclosed? → pervasive?
- No going concern assessment from management → qualified or disclaimer.
- Multiple uncertainties → disclaimer.

After the tree:
- SA 705's 2×2 table, with the cell highlighted.
- The report additions, one row per frame: MU section (SA 570), EOM (SA 706), KAM (SA 701, including the bar on KAM with a disclaimer and the "except for the matter in the Basis…" wording), OM (SA 706).
- The report outline section by section, in the opinion's own words: "except for the effects" or "except for the possible effects", "do not give a true and fair view", "were engaged to audit". For a disclaimer it shows the omitted sufficiency statement and the amended auditor's-responsibilities section.
- The communications with TCWG.

The results table is the decision trail (question, answer, why), and ICAI's own answer appears as a remark.

**Controls.**
- Explore: Case cards / Your own facts.
- Case card: 25 cases grouped Study Material / ICAI papers / Tapri, plus random practice cases with a case number.
- Own-facts toggles: nature, imposed, removed, alternative procedures work, going concern basis, material uncertainty, disclosed, opinion formable, material, pervasive, withdrawal possible, fundamental disclosed matter, matter outside the financial statements, listed, matters of most significance, "that matter is a KAM". Each toggle shows only when it matters.

**Presets and cases (sources).**

| Group | Cases |
|---|---|
| Study Material (Ch 8) | Illustrations 9, 10, 11 and 14; TYU 3 (= RTP May 2024 Q19) |
| ICAI questions | PYQ Sep 2024 CS3 Q11 (key C) and Q12 (key A), CS1 Q1 (key D); PYQ Jan 2025 Q3(c); PYQ Jan 2026 Q11 (key B) and Q3(a); RTP Sep 2024 Q16; RTP May 2024 Q19 (withdraw); MTP Jan 2026 S1 Q15 (key b); PYQ May 2026 Q6(b) |
| Tapri cast | 11 cases: expired premix, capitalised repairs (the Study Material's ₹5 lakh example), gift-card revenue, flooded stores, Kesar's confirmation ban, cold-chain going concern disclosed / wound up, BrewBucks litigation, branch auditors (OM), listed: app goodwill (KAM), fire that became a KAM |

Cases whose ICAI answer leaves the choice open are kept out of Test yourself: "qualified or adverse", "disclaimer or qualified", and Rubber Industries (its stem states the answer).

**Challenge.** "Which opinion?" (four buttons) or "Which paragraph?" (EOM / OM / KAM / MU section).
- About 45% of problems are generated Tapri cases: total assets, materiality, an item, and a spread (immaterial / confined / substantial proportion ≥ 50% of total assets / many accounts).
- The rest are drawn from the fixed cards.
- While testing, the test view is the case card only.

**Tests verify:**
- Every illustration and ICAI answer above.
- SA 705's table.
- SA 570 §2.11 rules.
- SA 706 / SA 701 rules: an EOM that is a KAM goes to KAM; no KAM with a disclaimer; KAM only for listed entities; "no (other) KAM" wording.
- The opinion wording for scope vs misstatement, the disclaimer's omissions, and OM placed after the auditor's responsibilities.
- Brute force over all 7 × 2^14 input combinations against an independent re-statement of the rules, plus invariants: pervasive never gives a milder opinion; withdraw only when the limitation is imposed and pervasive; MU section ⇒ unmodified.
- Every path is a real root-to-leaf path of the drawn tree.
- 600 generated cases: the opinion follows the numbers, and the facts never contain the answer words.
- 400 challenge seeds; every non-excluded fixed card is reachable, and excluded ones are never drawn.
- Bad input fails with plain messages.

**Screenshots checked** (1440 light, 1440 dark, 390 phone), plus mid-frame renders of the imposed-limitation and going-concern trees.
- Fixed after looking: the results table showed raw `**`, and it duplicated the stage, so it became the decision trail.
- The KAM "not listed" wording was made explicit.

## 2. threats: Independence Threats Lab (aud.ethics)

**What it does.** A deck of scenario cards is sorted one card per frame:
- Threats mode: into the five threats to independence. The caption gives the reason in the Study Material's words and the safeguard.
- Principles mode: into the five fundamental principles.

Each frame shows the card with its clue words marked (tint plus weight) and the bins table with the new card highlighted. The opening frame shows the Study Material's definition of each bin. The last frame shows all bins plus a safeguard-per-card table, and the Study Material's general rule (desist / eliminate / safeguards recorded / otherwise do not accept; SQC 1 / SA 220: or withdraw).

Safeguards are the Study Material's, made specific the way its answers make them:
- sell the shares before accepting (TYU 3 answer)
- remove the person, or a different partner leads (Case Study Q1 answer c)
- drop the non-audit service / disposal of the interest / removal of personnel / withdrawal (MTP May 2026 S1 Q4(b))
- rotation of auditors for familiarity
- refuse gifts
- document, consult the firm and tell TCWG (SA 220 18B; MTP Sep 2026 S2 Q11 facts)
- tell TCWG the fees and safeguards (SA 260)

**Controls.** Sort into: Threats / Principles. Deck: Study Material set 1, Study Material set 2, ICAI papers, Iyer & Associates at Tapri. Show one card only.

**Presets and cards (sources).** 39 threat cards and 25 principle cards; each card cites its source.

| Source | Threat cards | Principle cards |
|---|---|---|
| Study Material | TYU 3, 4, 5; Case Study Q2 and Q5; every example in §6's five lists | TYU 1 and 2; Case Study Q3 and Q4; the §4 definitions |
| ICAI questions | PYQ Jan 2025 Q2(b)(i)–(vi); PYQ Sep 2024 CS1 Q5 (key C); RTP Jan 2025 Q7 (b); RTP May 2025 Q7 (b); PYQ Jan 2026 CS2 Q9 (key B: familiarity and self-interest respectively); MTP Sep 2026 S2 Q11 (key D) | PYQ May 2024 Q5(c)(1)–(3); RTP Jan 2026 Q20(i)–(iii); PYQ Sep 2024 CS1 Q4 (A) and Q6(b); PYQ Jan 2026 CS1 Q1 (B); MTP May 2025 S1 Q9 (a); MTP Sep 2024 S2 Q10 (b) |
| Tapri cast | 8 cards | 5 cards |

**Challenge.**
- Threats mode: name the threat (five buttons) or, on 40% of problems, pick the safeguard. The safeguard question has 3–4 options; the wrong ones always belong to other threats (each safeguard declares the threats it answers, and cards list acceptable alternatives).
- Principles mode: name the principle.

**Tests verify:**
- Every Study Material and ICAI classification above.
- Data invariants: unique ids, clues present in the text, no card names its own answer, each card's safeguard answers its threat.
- Every deck has ≥ 4 cards, each bin has ≥ 3 cards, and the ICAI deck covers all five threats and all five principles.
- Frame count n + 2; the bins add up; clues are marked.
- 400 challenge seeds per mode: one right button; wrong safeguards answer other threats; the problem is the drawn card.

**Screenshots checked** (light, dark, phone).
- Fixed: the mode labels were clipped, so they are now "Threats" / "Principles".
- Fixed: the browser-yellow `<mark>`, now a theme tint plus weight.
- Fixed: a 3-column bins table cramped on phones, split into definitions (frame 0) and bins.
- Fixed: a duplicate card id (`sm-court` in both modes).

## 3. npa: Bank Advances Lab (aud.bank)

**What it does.** An advance's irregularity is dated and walked on a one-lane Gantt timeline (days since day 1, a block per status, NPA and as-on marks), with a history table that fills one row per frame:
- day 1 → SMA-0
- day 31 → SMA-1
- day 61 → SMA-2
- NPA (sub-standard): income only on receipt, unrealised interest reversed
- +12 months → D1, +24 months → D2, +48 months → D3

Captions carry the auditor's point at each stage. Then:
- One frame per special rule from the Study Material:
  - advances against TD / NSC / KVP / IVP / life policies with adequate margin
  - Central Government guarantee: standard, but NPA for income recognition
  - State Government guarantee: no relief
  - borrower-wise classification, with the other loan's own timeline
  - erosion: security < 10% of the outstanding → loss; < 50% of the earlier value → straight to doubtful
  - loss identified
- The auditor's checks frame (§12.6 and §14).
- The final frame: the provision on the secured and unsecured portions (sub-standard 15%; D1 / D2 / D3 25% / 40% / 100% of secured + 100% of unsecured; loss 100%; standard: "the Study Material gives no rate").

Facility kinds:
- term loan, bill: overdue for more than 90 days
- cash credit / OD out of order: continuously above the limit or drawing power, no credits for 90 days, or credits not covering the interest debited
- crop loans: two crop seasons (short duration) / one crop season (long duration, season > 12 months, validated)

**Day count (stated in "How this lab counts").** RBI's convention: the due date, or the first day in excess, is day 1, so a term loan is an NPA on day 91. This reproduces the RBI 12 Nov 2021 example: due 31.03 → SMA-1 30.04, SMA-2 30.05, NPA 29.06.

For "no credits continuously for 90 days" (the Study Material's wording) the day after the last credit is day 1, and the account is out of order on day 90. This matches MTP Sep 2024 S1 Q6(a): last credit 31.12.2023 → NPA on 30.03.2024.

**Controls.**
- Kind of advance; classify-as-on date.
- Out-of-order test (CC), and its own date field per test: unpaid due on, above the limit since, last credit on, or credits short since.
- Interest and credits (CC); crop season.
- Outstanding, unsecured toggle, realisable security, value assessed earlier.
- Same borrower's other loan (overdue since).
- Against deposits; government guarantee; loss identified.

**Presets.**
- MTP Sep 2024 S1 Q6(a) Sun Industries
- PYQ Jan 2026 Q6(a)(i) JT Mills (D1, ₹80 lakh) and (ii) Z Pvt Ltd (loss)
- RTP Sep 2026 Q19 Crest Infrastructure (D2, ₹128 lakh)
- SM Case Study Q5 / MTP Jan 2025 S2 Q7 (car loan 60 days and housing loan 120 days → both NPA)
- SM Case Study Q1 (KCC paddy → standard)
- MTP Sep 2024 S1 Q2 (Central guarantee, 95 days)
- Three Tapri / "Malwa Bank" cases: erosion → D1; cash credit above drawing power; a D3 loan

Where a question gives only ages ("doubtful for 30 months"), the preset reconstructs dates that match, and its label says so.

**Challenge.** One problem kind per kind of advance. The question is the classification (six buttons), or on 30% of problems the provision in ₹ lakh. Dates are chosen at least 4 days away from every boundary, so the day-count convention never decides an answer. Erosion twists are added.

**Tests verify:**
- Date parsing and month clamping; RBI's example.
- Every category boundary (sub-standard to D1 to D2 to D3 at +12 / +24 / +48 months) and the provisioning table.
- ICAI questions: MTP Sep 2024 S1 Q2, Q4, Q6(a); PYQ Sep 2024 Q3(c); PYQ Jan 2025 Q12; PYQ Jan 2026 Q6(a)(i)(ii); PYQ May 2026 Q12; RTP Jan 2025 Q19; RTP May 2024 Q23; RTP Jan 2026 Q19; RTP Sep 2025 Q8 and Q19; RTP Sep 2026 Q19 (all five borrowers); MTP Jan 2025 S2 Q6–Q9; MTP Sep 2025 S1 Q6 and S2 Q3(c); MTP May 2026 S1 Q8 and S2 Q2(b); MTP Sep 2026 S2 Q4(a); MTP Jan 2026 S1 Q2(b).
- Brute force: 3,000 random loans against an independent day-by-day Date reference; a later date is never a milder category.
- Provision is monotone in the category.
- Frame structure; the lab opens on the answer.
- 300 challenge problems per kind of advance, with the answer robust to ±3 days.
- Bad input fails with plain messages.

**Screenshots checked** (light, dark, phone; a borrower-wise preset).
- Fixed: the lab first opened on the checks table, so the provision and answer are now the last frame.
- Fixed: the history highlighted SMA-1 while the answer was sub-standard; the final table now lists the rule rows.
- Fixed: the date mark label was clipped on phones, so it now reads "as on".

**ICAI vs Study Material discrepancies (for the lesson writers).**
- MTP Jan 2026 S1 Q2(b) Neem Tree: ICAI says doubtful, but ₹80 lakh realisable against ₹10 crore outstanding is 8%, so the Study Material's 10% rule gives loss. The lab gives loss, and the test documents this.
- MTP Sep 2025 S1 Q6's reasoning ("crop cycle exceeds 6 months") is not the Study Material's test. The lab still reaches ICAI's answer (standard).
- RTP Sep 2025 Q19's 50:50 guarantee answer is muddled; the lab does not use it.
- Other ICAI oddities reported by the research agents, not used:
  - PYQ Jan 2025 MCQ 15's going concern key looks wrong: basis "not suitable" yet keyed to the MU section.
  - PYQ Jan 2025 Q4(c) gives two alternative answers.
  - PYQ Jan 2025 Q6(b) mixes comparative-statement and corresponding-figure wording.

## Recommended embeds (the later embed job adds them; I did not edit lessons)

The syntax is `::: lab <id> {cfg}` + optional caption line + `:::`.

**aud.report.sa705**
- How it works: `::: lab audit-opinion {"mode":"case","case":"sm-loans"}`
- How it works (para 5.5): `::: lab audit-opinion {"mode":"case","case":"sm-sarasbhai"}`
- Worked examples: `::: lab audit-opinion {"mode":"own","nature":"scope","material":true,"pervasive":true}`

**aud.report.sa706**
- How it works (EOM): `::: lab audit-opinion {"mode":"case","case":"sm-fire"}`
- How it works (OM): `::: lab audit-opinion {"mode":"case","case":"pyq-sun"}`

**aud.report.sa700**
- How it works: `::: lab audit-opinion {"mode":"case","case":"tapri-repairs"}`

**Also useful (not in the "embed in" column)**
- aud.report.sa701, How it works: `::: lab audit-opinion {"mode":"case","case":"tapri-firekam"}`
- aud.complete.sa570, How it works: `::: lab audit-opinion {"mode":"case","case":"pyq-megapower"}`

**aud.ethics.independence**
- How it works: `::: lab threats {"mode":"threats","deck":"sm-a"}`
- Exam angle: `::: lab threats {"mode":"threats","deck":"icai"}`

**aud.ethics.principles**
- How it works: `::: lab threats {"mode":"principles","deck":"sm-a"}`
- Exam angle: `::: lab threats {"mode":"principles","deck":"icai"}`

**aud.bank.advances**
- How it works: `::: lab npa {"facility":"term","asof":"31.03.2026","due":"15.09.2024","outstanding":140,"security":80}`
- How it works (cash credit): `::: lab npa {"facility":"cc","ccTest":"nocredit","asof":"31.03.2024","lastCredit":"31.12.2023","outstanding":24.754,"security":30}`
- Worked examples (borrower-wise): `::: lab npa {"facility":"term","asof":"31.03.2024","due":"01.02.2024","outstanding":6,"security":5,"otherSince":"03.12.2023"}`
- Under the hood (erosion): `::: lab npa {"facility":"term","asof":"31.03.2026","due":"10.07.2025","outstanding":1000,"security":240,"assessed":600}`
- Under the hood (crop loan): `::: lab npa {"facility":"agriS","asof":"31.03.2024","due":"02.01.2024","season":4,"outstanding":20,"security":25}`

All of these configs were computed and checked.

## Framework gaps hit

1. **`flow`** cannot colour edges, and a decision with one leaf child draws an awkward jog. I used `tree` with `edgeColor` to trace the path, which works well.
2. **`gantt`** colours blocks by `p`, which is also the lane key. So one lane cannot show status colours, and a two-facility timeline needs two charts.
3. **`challenge.gen(rng)`** gets no current values. The labs keep a module-level "last mode" set in `compute` (the framework computes the current values first), so Test yourself follows the explored mode.
4. **A control's label is static and select options cannot depend on another control.** NPA uses one date field per cash-credit test, and the threats decks share names across modes.
5. **The lesson `.ex` box carries flow margins inside a stage, and `<mark>` has no lab styling.** Each needed one CSS line.
6. **There is no URL parameter to open a lab on a given frame.** I checked mid frames with a scratch renderer kept in `$TMPDIR`.
