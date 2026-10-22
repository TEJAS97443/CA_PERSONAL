# consist: cross-lesson consistency pass (2026-10-20)

Scope: all 181 lessons. 95 lessons edited, every edit made under `tools/lock.sh`. The Costing lessons were edited last, after
osweep-c1 and osweep-c2 had finished. `build.py --check` is green. Its only lesson warning is aud.bank.advances at 6,065 words,
which was already over the limit before this pass. `lint_content.js` is clean on all 95 lessons.
Canonical entity list: `~/CA_PERSONAL/ca_passbook/docs/CAST.md` (new).

## 1. Cast and entities (rule: one name = one entity)

| Lesson | Change | Why |
|---|---|---|
| aud.ethics.sa210 | Pinky Mehra / Mehra Mithai & Sons → Kesar's neighbour **Pammi Arora**, **Arora Mithai & Sons** (heading, dialogue, example) | Pinky is canonically the spice trader (Mehra Masala Traders); her mother is a sleeping partner there, so the four-working-partner firm had to be a different entity |
| aud.bank.advances | Pinky Mehra → **Rohit Mehra** (his firm Mehra Kulhad Works; he/his) | cma.sys.recon already has Rohit Mehra running Mehra Kulhad Works |
| aud.entities.firms | Sole trader "Pinky / Pinky Packaging" → **Dolly / Dolly Packaging** | Pinky's firm is a partnership |
| sm.intro.meaning | Pinky Mehra's Mehra Mithai Bhandar → **Shalini Khurana** (Kesar's school friend), **Khurana Mithai Bhandar** | Clashed with both Pinky and Mehra Mithai Ltd |
| aud.items.current | Mehra Masala Pvt Ltd → **Mehra Spices Pvt Ltd**, run by cousin **Sunil Mehra**; "40 cafés" → "cafés in 40 cities"; "Chai Junction franchise" → **Chai Adda** franchise | Partnership vs company clash with Mehra Masala Traders; city/café confusion; Chai Junction is the brother-in-law's distributor |
| aud.report.caro | Kesar: "my cousin **Sunil's** spice company"; private-company table "Chai Express" → **Tapri Namkeen**, "Kulhad Kraft" → **Saancha Moulds**; "Chai Express Logistics Pvt Ltd" → **Tapri Cold Chain Pvt Ltd** | Kulhad Kraft is an LLP in aud.entities.firms (CARO cannot apply to it); Chai Express Ltd is a listed company in FM |
| aud.items.contingent | Chai Junction Pvt Ltd (franchisee) → **Chai Adda Pvt Ltd** | Same as above |
| aud.risk.model, aud.nature.sa200, aud.items.ppe, aud.nature.assurance, cma.abc.abm, fm.intro.agency | Delivery app "Tapri Express" / "Tapri Go" → **TapriNow** (and TapriNow Pvt Ltd). In risk.model and items.ppe the wording changed from "launched in 2025-26" to "earned …" / "a new version … launched 1 August 2025" | Seven SM lessons call the app TapriNow, about three years old. Tapri Express is the railway-kiosk chain in the spot-strategy lab |
| aud.nature.assurance | (d) TapriNow Pvt Ltd "is converting into a public company for a public issue"; the refund-controls engagement is done by Iyer & Associates instead of Mehta & Rao (and "Bunty, on loan to Mehta & Rao" removed); the hockey-stick forecast is about Tapri's **highway cafés** | A private company cannot make a public issue; Bunty is Iyer's article assistant; 160 cafés in 2025-26 contradicted Tapri's ~300 cafés |
| fm.intro.objectives | "Chai Express kiosks at 60 railway stations" → "60 more **Tapri Express** kiosks at railway stations"; quiz Kulhad Kraft Ltd → **Kulhad Crafts Ltd** | Matches the lab's Tapri Express (600 stations); one pottery-supplier name |
| cma.svc.transport, cma.sys.recon, fm.lev.leverage, fm.sources.long, sm.intro.intent, sm.impl.control, sm.impl.leadership | Chai Express Logistics (Pvt) Ltd / Tapri Logistics Pvt Ltd → **Tapri Cold Chain Pvt Ltd** | Four names for "Tapri's cold-chain subsidiary". Also fixed a broken possessive ("Tapri Cold Chain's") |
| fm.sources.short | Surplus-cash subsidiary → **Tapri Premix Ltd** | The removed Chai Express Logistics name |
| aud.report.sa705 | Liquidating subsidiary → **Chai Cargo Pvt Ltd** | Tapri Cold Chain is a going business everywhere else |
| fm.cs.theories, fm.ratio.profit | Tapri Cold Chain **Ltd** → **Pvt Ltd**; cs.theories "the market values the company" → "the company is worth" | Legal form clash (Audit and Costing use Pvt Ltd); an unlisted company has no market price |
| fm.div.models | MM example: Tapri Cold Chain Ltd (quoted shares) → **Sheetal Cold Chain Ltd**, a listed refrigerated-transport company; Kulhad Kraft Ltd → **Chulha Foods Ltd** | Quoted shares need a listed company; Kulhad Kraft is an LLP elsewhere |
| fm.div.basics | Kulhad Kraft Ltd → **Dona Packaging Ltd** | Same name clash |
| fm.coc.wacc | Thanda Logistics Ltd "Tapri's cold-chain subsidiary" → "a listed cold-chain company that carries Tapri's frozen snacks" | Its shares are quoted, and the subsidiary is Tapri Cold Chain |
| fm.cs.ebiteps | Tapri Cafés Ltd → **Tapri Kulhad Cafés Ltd** | Two names for the café subsidiary |
| aud.ethics.qc, aud.report.sa706 | "Kulhad Crafts Ltd (unlisted)" → **Gwalior Kulhad Works Pvt Ltd** / **Morena Clay Products Ltd** | Kulhad Crafts is listed in FM (share prices, CAPM) |
| aud.items.liabilities, aud.items.expenses, aud.report.sa705 | Ujjain Kulhad Works **Pvt Ltd** → **Ltd** | aud.report.companies gives it a section 177 audit committee, so it is a public company; three other lessons already say Ltd |
| aud.evid.sa610, aud.items.liabilities, fm.wc.estimate, fm.ratio.liquidity, sm.choice.growth | "the company that makes Tapri's clay cups" / "the kulhad supplier" → "a … supplier" / "some of the cups" | Ten different firms were "the" maker of Tapri's cups |
| aud.evid.sa610 | CA Harish Bhatt → **CA Hemant Bhatt** | Harish Bhatt is the CEO of Tapri Cold Chain (sm.impl.leadership) |
| sm.intro.levels | "Rohan, Bunty's cousin, runs KulhadKraft" → **Sameer**, **MugMitti** | Rohan is Kesar's nephew with KulhadKart (FM) |
| sm.choice.retrench | TapriNow's turnaround head Farah Siddiqui → **Zoya Siddiqui** | CA Farah Siddiqui is an auditor in two Audit lessons |
| sm.intro.intent | New CEO Farhan Qureshi → **Nikhil Sood** | CA Farhan Qureshi is an auditor in two Audit lessons |
| aud.bank.auditor | Narmada Bank of India is now "Tapri's main bank"; Malwa Commercial Bank is where Tapri "has just opened a salary account" | Tapri's current account, ₹45 crore limits and term loan are all with Narmada Bank |
| cma.std.voh, cma.std.foh, cma.std.recon, cma.svc.basics, cma.mat.procure | Bunty preparing Tapri's cost drafts, variance reports and pre-payment checks → **Ritu's intern**; cma.std.foh example now "On an audit visit, Bunty …" | Bunty is Iyer & Associates' article assistant and does no cost work for Tapri |
| cma.intro.install | "As the consultant, Ritu …" → "Ritu, sent from Tapri to set up the costing there, …" | Ritu is Tapri's employee |
| cma.emp.turnover | "Tapri's cafés grew from 480 to 520" → "café staff" | The figures are staff on roll; Tapri has ~300 cafés |

Checked and consistent: Kesar (MD), Dev (CFO, never runs a division), Lakshmi (engagement partner), Ananya (head of strategy),
BrewBucks (global/American chain), Tapri listed since 2024, FY ending 31 March, 40 cities, Iyer & Associates as auditors,
Mehra Mithai Ltd (sa570 and fm.cs.planning agree: ₹20 crore debentures). Bunty in Costing, FM and SM appears only on audit
visits, in conversations or in "Hall of Shame" mistakes.

## 2. Figures

| Lesson | Change | Why |
|---|---|---|
| aud.risk.sa320 | Tapri 2025-26 materiality ₹1.70 crore → **₹1.50 crore**, rebuilt from PBT of ₹30.40 / 31.60 / **28.00** crore (average 30.00; both charts, the table and the captions updated). PM ₹1.20 → ₹1.05 crore. Misstatements 0.34 + 0.41 + 0.37 = 1.12; with the prior-year 0.31 the total is 1.43 (still ₹0.07 crore below materiality). Quizzes: ₹1.50 → ₹1.30 crore, PM ₹1.05 → ₹0.90 crore; ₹1.38 crore against ₹1.50 crore. The cold-chain disposal example is now marked "Suppose instead". Revenue ₹412 → ₹560 crore became ₹660 → ₹900 crore (1% of revenue = ₹9.00 crore). Arithmetic checked | Ten Audit lessons use ₹1.50 crore. aud.complete.sa450 gives Tapri's actual 2024-25 PBT as ₹28.00 crore (SA 320 had ₹36.90 crore). FM gives 2025-26 sales as ₹900 crore. As written, the disposal example would have revised materiality to ₹1.30 crore, which the completion lessons contradict |
| aud.items.liabilities | Materiality ₹5 crore → ₹1.50 crore (example and quiz); the analysis still holds (each misstatement below ₹1.50 crore) | Canon |
| aud.items.revenue | Revenue ₹860 → ₹900 crore; materiality ₹5 crore → ₹1.50 crore (text, caption, conclusion; ₹6.80 crore is still under 1% of revenue) | Canon |
| aud.report.sa701 | App revenue line: "Tapri app, about 3.2 crore orders a year" → "TapriNow delivery app, about 31 lakh orders a year" | aud.risk.model and aud.nature.sa200 give 31 lakh orders |
| aud.evid.sa520 | "Tapri's 40 cafés" → "40 flagship cafés" (as in aud.evid.sa530) | Tapri has cafés in 40 cities, about 300 cafés |
| sm.intro.intent | Café revenue ₹400 → ₹800 crore became ₹260 → ₹520 crore (targets recomputed: 298.7 and 343.1; the 14.87% rate is unchanged); same change in the Hall of Shame line | sm.choice.portfolio gives 2025-26 café revenue as ₹260 crore |

Cross-references checked and correct: fm.capbud.irr against fm.capbud.npv (₹10 lakh project; NPVs of ₹62,300, ₹18,300 and −₹1,800; IRR 14.9%; MIRR 13.70%, recomputed);
fm.ratio.activity against the fm.ratio.liquidity balance sheet (505 / 435 / 355 / 150 / 80).
**Not reconciled (needs a lead decision):** FM's 2025-26 profit after tax is ₹90 crore, but the Audit materiality base is a PBT of about ₹30 crore. FM's café subsidiary sells ₹50 crore a year against SM's ₹260 crore of café revenue. Both are noted in CAST.md as self-contained scales.

## 3. Links

All `[[id|label]]` links resolve and carry labels (no bare links). Added, each by turning an existing mention into a link or adding one sentence:
- **aud.report.sa705** "Where other Standards send you": the table now links SA 501, 505, 510, 560, 570, 580 and 710 (these are back-links).
- aud.report.sa700 → SA 706 (one sentence after the 14 elements); aud.report.sa706 → SA 700 and SA 705; aud.report.sa710 → SA 510 and SA 580, plus a bullet for SA 700/705.
- aud.evid.sa505 → SA 705 and the trade-payables lesson; aud.items.contingent → SA 705; aud.items.liabilities → SA 260 and SA 705; aud.complete.sa260 → SA 705 and SA 700; aud.evid.sa510 → SA 706; aud.report.sa701 → SA 260; aud.risk.sa315 → the audit-risk lesson; aud.risk.ic → SA 315; aud.evid.sa530 → aud.risk.testing; aud.evid.sa501 → aud.items.current (one bullet).
- cma.sheet.mfg → cma.oh.absorb and cma.mc.absorb; cma.mc.absorb → cma.sheet.mfg; cma.oh.absorb → cma.mc.absorb; cma.std.foh → cma.bud.flexible; cma.mat.techniques → fm.wc.inventory; cma.mc.decisions → cma.sheet.quote and fm.capbud.cashflows; fm.wc.basics → wc.inventory, receivables, payables and cash.
- Already two-way, no change needed: cma.mat.eoq ↔ fm.wc.inventory; cma.bud.cash ↔ fm.wc.cash; cma.mat.levels and cma.mat.ratios ↔ FM; cma.mc.bep ↔ fm.lev.leverage; cma.sheet.mfg ↔ cma.oh.ads; aud.risk.sa320 ↔ aud.complete.sa450.

## 4. Terms

- **judgment** (the Study Material's SA 200 spelling: 34 "professional judgment" against 12 "judgement" in the P5 SM): 251 "judgement" changed to "judgment" in 34 lessons (31 Audit, 2 Costing, 1 SM), plus the aud.nature.sa200 summary and tags. Its title still says "judgement" because it mirrors `syllabus.txt`, which I may not edit. **Lead: change the syllabus line for aud.nature.sa200.**
- **Costing Profit and Loss Account** / **Costing P&L** capitalised (55 lower-case forms in 10 Costing lessons; front-matter tags left as search words). ICAI's own quoted "Costing Profit & Loss Account" in cma.mat.ratios is left as quoted.
- aud.evid.trail: "study material update" → "Study Material update".
- Checked and consistent (no change): "P/V ratio"; "Key Audit Matters" for the section and heading with "key audit matters" in running text (the SM's convention); "those charged with governance"; "Emphasis of Matter" and "Other Matter"; "CARO 2020"; "SQC 1"; "skepticism"; ₹ with lakh/crore grouping (no Rs/INR, no western grouping in prose). "Breakeven" survives only inside ICAI definitions, and "break even" only as a verb.
- Three flashcard fronts changed (judgment/Costing P&L); the build moves their review history to the new ids.

## 5. UI (build, then screenshots; 20 images viewed)

Shots in /tmp/consist/shots: aud.report.sa705, aud.risk.sa320, cma.sheet.mfg, cma.std.voh, fm.div.models and sm.intro.intent at 390 and 1440; /syllabus at 1440 and 390; /s/cma, /s/aud, /s/fm, /s/sm at 1440 and /s/aud at 390. At 390 the probe found no page overflow anywhere. Edited parts render correctly: the SA 705 table links (stacked cards on phones), the SA 320 charts and working, Next door, the intern example and the renamed SM example.
Possible problems (not fixed, nothing redesigned):
1. Paper pages (/s/cma, /s/aud): the "share of the paper, by year" chart has near-zero bars for 2018–2023 and tall ones for 2024–2026. The hero says "239 ICAI questions" (Audit 310) next to a "Practise 566 questions" (Audit 673) button, with nothing saying why they differ. "100.0 marks in the paper" shows a needless ".0". "8/36 papers asked it" reads oddly for a whole paper. At 1440 "33.3% of Group II's marks · 1st of 4" wraps, leaving "4" alone on a line.
2. aud.report.sa705 at 390: the probe reports `clipped=1` on the sticky lesson-bar title span (`span.lsn-sbar-t`, 304 px inside a 302 px box with overflow hidden). Probably meant as truncation, but the probe flags it.
3. Wide working tables (4 columns) at 390 scroll sideways with the hint (cma.std.voh). This is by design.
4. Screenshot tool problems, not app bugs:
   - Desktop (direct-Chrome) shots of `#/l/<id>#<heading>` come out blank; the iframe path (`fold=open`) works.
   - With `fold=open`, anchored shots land below the target because the folds open after the scroll.
   - Without `SHOT_CALM=1`, scroll-reveal leaves unpainted bands in long captures.

## Notes
- No lab files or shared code were touched. The spot-strategy lab's "Tapri Express" (railway kiosks) is now the canonical meaning.
- Open items for the lead: the aud.nature.sa200 title in the syllabus; the cross-paper profit scale (§2).
