---
id: aud.risk.digital
title: Digital audit and data analytics
minutes: 18
needs: aud.risk.it
tags: data analytics, CAATs, IDEA, ACL, digital audit, journal entry analysis, artificial intelligence
labs:
summary: How auditors use data analytics and CAATs (spreadsheets, IDEA, ACL) on a client's electronic records, the seven uses ICAI lists, and what "digital audit" means from planning to opinion.
---

## In plain words

### Bunty and the eighteen lakh invoices

Tapri's delivery app raised 18,42,316 sales invoices in 2025-26. Bunty has a plan, a pencil and his famous tick.

> **Bunty:** Ma'am, I will vouch 200 invoices. My fastest tick takes four seconds.
> **Lakshmi:** And the other eighteen lakh? Load the file. Let the software read every line; you read the exceptions.
> **Bunty:** It can find duplicate payments too?
> **Lakshmi:** In seconds. Deciding what they mean is still your job.

Companies now hold enormous amounts of data in their IT systems. **Data analytics** is the set of processes, tools and techniques used to dig meaningful information out of that data. Businesses use it to sell more and run better; auditors use the same ideas. The auditor's tools are called **CAATs** (Computer Assisted Auditing Techniques): spreadsheets and specialised audit software such as **IDEA** and **ACL**. With them the auditor can check that a data file is complete, pick samples, rebuild balances from transactions, redo calculations such as depreciation, analyse journal entries, investigate fraud and measure what a weak control has cost.

**Digital audit** goes one step wider: the auditor uses artificial intelligence, data analytics and other new technology all through the audit, from planning to the final opinion, to understand the business better and spot risks sooner.

::: analogy The rice and the thali
Checking a sack of rice for stones by tasting one spoonful is sampling. Spreading the whole sack on a thali under a bright lamp is data analytics: every grain is seen. But someone still has to look at each dark grain and decide whether it is a stone or just a burnt grain of rice. That someone is the auditor.
:::

::: key
Data analytics lets the auditor work through large volumes of electronic records, but its results are only as good as the completeness of the data it is run on, and every exception still needs the auditor's judgment and follow-up.
:::

## How it works

### 1. Data analytics

::: definition Data analytics
"The combination of processes, tools and techniques that are used to tap vast amounts of electronic data to obtain meaningful information" (SM 3.61).
:::

In today's digital age companies rely more and more on IT systems and networks, and the data in them is enormous. Companies benefit from data analytics through increased profitability, better customer service, competitive advantage and more efficient operations; **auditors can use similar tools and techniques in the audit process and obtain good results** (SM 3.61).

### 2. CAATs and their seven uses

::: definition Computer Assisted Auditing Techniques (CAATs)
The tools and techniques that auditors use in applying the principles of data analytics (SM 3.62).
:::

Data analytics can be used in testing electronic records and data residing in IT systems, using **spreadsheets and specialised audit tools viz. IDEA and ACL**, to perform the following, in ICAI's order (SM 3.62):

| Use | At Tapri, for example |
|---|---|
| 1. Check completeness of data and population used in either tests of controls or substantive audit tests | Total the sales extract and agree it to the revenue ledger before testing it |
| 2. Selection of audit samples: random sampling, systematic sampling | Pick 60 invoices from 18,42,316 by a fixed interval from a random start |
| 3. Re-computation of balances: reconstruction of trial balance from transaction data | Rebuild trade receivables from opening balance, sales, receipts and credit notes |
| 4. Reperformance of mathematical calculations: depreciation, bank interest calculation | Recompute depreciation on every asset in the register |
| 5. Analysis of journal entries | List manual entries posted on Sundays, by unusual users, or back-dated |
| 6. Fraud investigation | Find vendors paid twice for the same invoice |
| 7. Evaluating impact of control deficiencies | Find every entry posted through a leaver's login |

::: diagram An illustrative CAAT run
{"type": "flow", "w": 420, "nodes": [{"id": "g", "kind": "start", "label": "Obtain data from\nthe client's system"}, {"id": "c", "kind": "process", "label": "Check completeness\nagainst the ledger"}, {"id": "d", "kind": "decision", "label": "Agrees?"}, {"id": "f", "kind": "end", "label": "Resolve the gap\nbefore any test", "color": "bad"}, {"id": "t", "kind": "process", "label": "Run the tests\n(uses 2 to 7)"}, {"id": "x", "kind": "process", "label": "Investigate\nexceptions"}, {"id": "e", "kind": "end", "label": "Conclude and\ndocument", "color": "ok"}], "edges": [["g", "c"], ["c", "d"], ["d", "f", "no"], ["d", "t", "yes"], ["t", "x"], ["x", "e"]], "caption": "The uses are ICAI's (SM 3.62); the order of a run is illustrative. Rose end: no test starts until the population is complete, because every later test relies on it and system data that cannot be relied on must be tested for completeness and accuracy (SM 3.56, 3.61). Green end: the work concludes."}
:::

Two links to other topics:

- **Sampling.** Systematic selection divides the number of sampling units in the population by the sample size to get an interval, picks a starting point within the first interval and then every interval-th unit after it; a computerised random number generator makes the start more truly random (SM 4.62). See [[aud.evid.sa530|SA 530]].
- **Analytical procedures.** Predictive analytical procedures using data analytics can be used to address completeness, valuation or measurement, and occurrence (SM 4.107). See [[aud.evid.sa520|SA 520]].

### 3. Digital audit

Entities are embracing digitisation to keep pace with changing times; new technologies help them revamp operations and rethink how business is done, and companies are restructuring their business models driven by technology. **Automation is key to digitisation** (SM 3.62). In such an environment (SM 3.62):

- auditors use digital technology ==right from planning to the expression of the final opinion==;
- they use **artificial intelligence, data analytics and other latest technologies** to understand business processes better;
- with such tools, they can conduct the audit better and **devote more attention to areas requiring greater focus**; and
- digital audit helps auditors **better identify risks** using technology.

::: diagram Digital technology through the audit (SM 3.62)
{"type": "layers", "layers": [{"label": "Planning", "note": "AI and analytics to understand business processes"}, {"label": "Risk assessment", "note": "technology helps identify risks better"}, {"label": "Responses", "note": "more attention to areas needing greater focus"}, {"label": "Procedures", "note": "CAATs on the electronic records"}, {"label": "Opinion", "note": "digital use runs up to the final opinion"}], "side": [{"label": "from planning to opinion", "arrow": "down"}], "caption": "The notes are the Study Material's points; placing each at a stage of the audit is illustrative."}
:::

### 4. Reliable data, audit trails and competence

- **The data must be reliable first.** If IT risks are not mitigated, system data, information and reports have to be tested thoroughly for completeness and accuracy (SM 3.56); testing in an automated environment includes assessing the reliability of source data and the completeness of the population (SM 3.61). See [[aud.risk.it|internal control in an IT environment]].
- **Large volumes, quickly.** Audit trails throw up large volumes of data, and automated tools can be used to analyse them (SM 4.28); see [[aud.evid.trail|audit trail]].
- **Competence.** SQC 1 requires that, before accepting an engagement, the firm considers its competence (including capabilities, time and resources) to perform it: a firm with no experience and no trained personnel should not accept audits that require extensive use of technology and data analytics (SM 11.35, 11.44; [[aud.ethics.qc|SQC 1 and SA 220]]).

## Worked examples

:::: example "The software will sign the report"
Tapri has digitised its operations: orders, billing, inventory and payroll now run on the ERP and the delivery app, and its business model has been rebuilt around them. At the planning meeting for 2025-26, Kesar has an idea.

> **Kesar:** Lakshmi-ji, we are fully digital now. Feed our data to your software, let it print the opinion, and send the team home. Sab adjust ho jayega.
> **Lakshmi:** The software will read every line, Kesar-ji. The opinion stays with me.

Comment on Kesar's view, explaining (i) the use of digital technology in the conduct of an audit and (ii) the functions an auditor can perform using data analytics tools and techniques.

::: answer Model answer
**(i) Digital technology in the audit.** Entities are embracing digitisation as part of their operations to keep pace with changing times; companies are restructuring their business models driven by technology, and automation is key to digitisation. In such a business environment, use of digital technology is being made by auditors right from planning to the expression of the final opinion. Auditors use artificial intelligence, data analytics and other latest technologies to understand business processes better; with such tools they can conduct the audit in a better way and devote more attention to areas requiring greater focus. Digital audit helps auditors to better identify risks making use of technology.

**(ii) Data analytics.** The combination of processes, tools and techniques used to tap vast amounts of electronic data to obtain meaningful information is called data analytics. The tools and techniques that auditors use in applying its principles are Computer Assisted Auditing Techniques (CAATs). Data analytics can be used in testing electronic records and data residing in IT systems, using spreadsheets and specialised audit tools viz. IDEA and ACL, to:

1. check completeness of data and population used in either tests of controls or substantive audit tests;
2. select audit samples: random sampling, systematic sampling;
3. re-compute balances: reconstruction of the trial balance from transaction data;
4. reperform mathematical calculations: depreciation, bank interest calculation;
5. analyse journal entries;
6. investigate fraud; and
7. evaluate the impact of control deficiencies.

**Analysis.** Tapri's digitised, high-volume operations are exactly where these tools help: Iyer & Associates can test whole populations of electronic records and direct their attention to the areas of greater risk. But the tools assist the auditor: the exceptions they find must be investigated, the data must first be checked for completeness, and the judgements, the evaluation of the audit evidence and the opinion remain the auditor's.

**Conclusion.** Kesar's view is not correct. Digital technology changes how Tapri is audited, from planning to the final opinion; it does not replace the audit or the auditor.
:::
::::

:::: example Bunty's CAAT run
Bunty runs IDEA on Tapri's 2025-26 data. His results:

| No. | Test | Result |
|---|---|---|
| 1 | Total of the sales extract against the revenue ledger | Extract ₹4,12,36,48,210; ledger ₹4,12,41,02,610 |
| 2 | 60 invoices selected from 18,42,316 | Interval 30,705, random start |
| 3 | Trade receivables rebuilt from transactions (₹ crore): opening 38.20 + credit sales 165.40 − receipts 158.92 − credit notes 2.14 | Rebuilt ₹42.54 crore; ledger ₹42.54 crore |
| 4 | Depreciation on delivery e-bikes: opening WDV ₹2,40,00,000, no additions or disposals, policy rate 25% WDV | ERP charged ₹72,00,000 |
| 5 | Interest on a ₹5 crore fixed deposit at 7.25% for 9 months | Booked ₹27,18,750 |
| 6 | Same vendor, invoice number and amount paid twice | 4 pairs: ₹2,18,400, ₹1,96,000, ₹3,04,700, ₹2,15,500 |
| 7 | Manual journal entries to revenue, back-dated into March after the year-end close | 7 entries, ₹1.86 crore |

Required: (i) Identify the use of data analytics in each test. (ii) Comment on the results and the auditor's next steps.

::: answer Model answer
| No. | Use of data analytics | Comment and next step |
|---|---|---|
| 1 | Check completeness of data and population | The extract is short by ₹4,54,400. The population is incomplete: resolve the gap with Tapri before any test relies on it |
| 2 | Selection of audit samples (systematic) | 18,42,316 ÷ 60 = 30,705 (rounded down); ensure the invoices are not ordered in a pattern matching the interval |
| 3 | Re-computation of balances | 38.20 + 165.40 − 158.92 − 2.14 = 42.54: agrees with the ledger |
| 4 | Reperformance of calculations | 25% of ₹2,40,00,000 = ₹60,00,000, so depreciation is overstated by ₹12,00,000 (the ERP applied 30%): a misstatement, and a question about the rate master and program change controls |
| 5 | Reperformance of calculations | ₹5,00,00,000 × 7.25% × 9 ÷ 12 = ₹27,18,750: agrees |
| 6 | Fraud investigation | Duplicate payments of ₹9,34,600: recover, investigate for fraud, test the duplicate-invoice control |
| 7 | Analysis of journal entries | Back-dated revenue entries of ₹1.86 crore: examine supporting evidence, cut-off and who posted them |

**Conclusion.** Data analytics has located the exceptions; it has not resolved them. Items 1, 4, 6 and 7 need audit evidence, possible adjustments and communication of the control deficiencies found; the seventh use, evaluating the impact of control deficiencies, would measure what the wrong rate master or the missing duplicate-invoice check has cost across all assets and vendors. Items 3 and 5 support the related balances.
:::
::::

## Exam angle

::: exam What ICAI asked
In the 3 new-scheme ICAI documents read for this lesson, this topic was examined 3 times; in the 5 old-scheme documents read, 6 times.

- **New scheme.** Tools and techniques used in applying data analytics, and the areas where auditors can use it: RTP September 2024 Q11. Analyse the functions an auditor can perform using data analytics tools and techniques: MTP May 2025 Series II Q6(b), 5 marks. Explain the use of digital technology in the conduct of an audit, for a company digitising its operations: September 2024 Q5(c), 3 marks.
- **Old scheme** (Paper 6, similar wording): functions using data analytics, November 2020 Q3(b), 4 marks; how data analytics tests electronic records with spreadsheets and audit tools, May 2023 Q2(d), 3 marks; explain CAATs and data analytics (with other terms such as database), MTP November 2022 Series II Q2(d), 3 marks, and RTP May 2023 Q13; the full form of CAAT, RTP May 2023 MCQ 4; "evaluating impact of control deficiencies" as a use of data analytics, RTP May 2022 MCQ 1.5.
- The Study Material's own theoretical question asks in what areas data analytics can be useful in an automated environment (SM 3.81).
:::

::: exam How the marks are earned
The Suggested Answers read for this lesson follow the Study Material's order: the meaning of data analytics (MTP May 2025 Series II; RTP September 2024 starts directly with CAATs), CAATs as the auditor's tools, "spreadsheets and specialised audit tools viz., IDEA and ACL", then the uses as a list. RTP September 2024 prints journal entries and fraud investigation as one bullet ("Analysis of journal entries of fraud investigation"); the Study Material (SM 3.62) and MTP May 2025 Series II list them separately, so write all seven. For digital audit, the answer is the Study Material's paragraph: digitisation, technology used from planning to the final opinion, AI and data analytics to understand business processes, more attention to areas requiring greater focus, better identification of risks.
:::

::: trick Seven uses: "Complete Samples Rebuild, Redo, Journal, Fraud, Fix"
**C**ompleteness of population; **S**ample selection; **R**e-computation of balances; **R**eperformance of calculations; **J**ournal entry analysis; **F**raud investigation; impact of control de**f**iciencies ("Fix"). ICAI's order, all seven.
:::

## Answer frame

### "Analyse the functions an auditor can perform using data analytics"

1. **Meaning** of data analytics, in the Study Material's words, with its opening point: companies benefit (increased profitability, better customer service, competitive advantage, more efficient operations), and auditors can use similar tools and techniques in the audit process and obtain good results.
2. **Tools**: CAATs; testing of electronic records and data residing in IT systems using spreadsheets and specialised audit tools viz. IDEA and ACL.
3. **The seven uses**, in order, each with its example (random or systematic sampling; trial balance reconstruction; depreciation and bank interest).

### "Explain the use of digital technology in the conduct of an audit"

The points, from SM 3.62:

| Point | What to write |
|---|---|
| Context | Entities digitise; business models restructured around technology; automation is key |
| When | Right from planning to the expression of the final opinion |
| What | Artificial intelligence, data analytics and other latest technologies |
| Why | Understand business processes better; conduct the audit better |
| Result | More attention to areas requiring greater focus; risks identified better |

## Common mistakes

::: mistake Hall of Shame: the incomplete file, perfectly tested
Bunty runs every test on a sales extract that is ₹4,54,400 short of the ledger. **Fix:** the first use in ICAI's list is checking completeness of data and population used in tests; until the population agrees, every later result is unreliable (SM 3.62, 3.61).
:::

::: mistake "The software found nothing, so there is nothing"
**Fix:** analytics locates exceptions; the auditor still investigates them and obtains audit evidence. CAATs are tools for applying data analytics in the audit process, not a substitute for it (SM 3.62).
:::

::: mistake Writing only "IDEA and ACL"
**Fix:** name CAATs, and both kinds of tool: spreadsheets and specialised audit tools such as IDEA and ACL (SM 3.62).
:::

## Practice

::: quiz Check yourself
Q: Case scenario. CA Rhea, auditor of Kanha Dairy Ltd, uses ACL to rebuild the closing trade receivables balance from the year's opening balance, sales invoices, receipts and credit notes, and compares it with the ledger. Which use of data analytics is this?
- [ ] Check completeness of data and population
- [x] Re-computation of balances
- [ ] Reperformance of mathematical calculations
- [ ] Evaluating impact of control deficiencies
> Reconstructing a balance from transaction data is re-computation of balances (SM 3.62). Reperformance of calculations is for computations such as depreciation or bank interest.

Q: Tapri's ERP let café staff give discounts above the approved limit without a supervisor's approval from October to March. Bunty runs IDEA over every invoice of those six months to total the excess discounts given. Which use of data analytics is this?
- [ ] Fraud investigation
- [ ] Analysis of journal entries
- [x] Evaluating impact of control deficiencies
- [ ] Re-computation of balances
> The weakness is already known; the test measures what it cost across the whole population, which is evaluating the impact of a control deficiency (SM 3.62). Fraud investigation would follow up particular suspicious discounts the test turns up.

Q: A population of 18,42,316 invoices is to be sampled systematically for 60 items. What is the sampling interval, rounded down to a whole number?
= 30705
> 18,42,316 ÷ 60 = 30,705.27, so an interval of 30,705 with a random start within the first 30,705 (SM 4.62).

Q: Select all the uses of data analytics listed in the Study Material.
- [x] Selection of audit samples
- [x] Analysis of journal entries
- [ ] Issuing the auditor's report automatically
- [x] Fraud investigation
> The seven uses are completeness of population, sample selection, re-computation of balances, reperformance of calculations, journal entry analysis, fraud investigation and evaluating the impact of control deficiencies (SM 3.62). The opinion is always the auditor's.

Q: According to the Study Material, digital technology is used by auditors at which stage of the audit?
- [ ] Only in testing electronic records
- [ ] Only in planning
- [x] Right from planning to the expression of the final opinion
- [ ] Only after the audit report, for follow-up
> Digital technology is used from planning to the final opinion, to understand business processes and identify risks better (SM 3.62).
:::

## Recap

- Data analytics: the combination of processes, tools and techniques used to tap vast amounts of electronic data to obtain meaningful information.
- CAATs: the tools and techniques auditors use to apply data analytics; spreadsheets and specialised audit tools viz. IDEA and ACL.
- Seven uses: completeness of data and population; sample selection (random, systematic); re-computation of balances (trial balance from transactions); reperformance of calculations (depreciation, interest); journal entry analysis; fraud investigation; impact of control deficiencies.
- Completeness of the population comes before any test that relies on it.
- Digital audit: AI, data analytics and latest technology from planning to final opinion; better understanding of processes, more focus on key areas, better risk identification.
- Analytics finds exceptions; the auditor still investigates them and forms the opinion. (The thali shows every grain; only you can tell the stone from the burnt rice.)

## Flashcards

Q:: Define data analytics as in the Study Material.
A:: The combination of processes, tools and techniques that are used to tap vast amounts of electronic data to obtain meaningful information.

Q:: What are CAATs?
A:: Computer Assisted Auditing Techniques: the tools and techniques that auditors use in applying the principles of data analytics.

Q:: Which tools does the Study Material name for testing electronic records with data analytics?
A:: Spreadsheets and specialised audit tools viz. IDEA and ACL.

Q:: List the seven uses of data analytics in an audit, in ICAI's order.
A:: Check completeness of data and population; selection of audit samples; re-computation of balances; reperformance of mathematical calculations; analysis of journal entries; fraud investigation; evaluating impact of control deficiencies.

Q:: Data analytics: give the Study Material's example of re-computation of balances.
A:: Reconstruction of the trial balance from transaction data.

Q:: Data analytics: give the Study Material's examples of reperformance of mathematical calculations.
A:: Depreciation and bank interest calculation.

Q:: Data analytics: which two sampling methods does the Study Material mention for selecting audit samples?
A:: Random sampling and systematic sampling.

Q:: Digital audit: when, and with what, do auditors use digital technology?
A:: Right from planning to the expression of the final opinion, using artificial intelligence, data analytics and other latest technologies.

Q:: Digital audit: what does it help auditors do?
A:: Understand business processes better, conduct the audit better, devote more attention to areas requiring greater focus, and better identify risks.
