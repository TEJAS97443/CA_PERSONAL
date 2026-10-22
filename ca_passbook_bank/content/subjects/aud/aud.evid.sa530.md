---
id: aud.evid.sa530
title: SA 530: audit sampling
minutes: 32
needs: aud.evid.sa500, aud.risk.model
tags: SA 530, audit sampling, statistical sampling, sampling risk, stratification, systematic sampling, sample size, anomaly, tolerable misstatement
labs:
summary: How an auditor tests less than 100% of a population and still concludes on all of it: population and sampling unit, statistical or not, sample design and size, the five selection methods, and evaluating deviations and misstatements.
---

## In plain words

### Bunty orders pizza for 4.8 lakh invoices

Tapri Tea Co. Ltd's cafés raised 4,80,000 sales invoices in 2025-26. Bunty has a plan.

> **Bunty:** Ma'am, I will check every one. I have ordered pizza for the team.
> **Lakshmi:** At four minutes an invoice that is 32,000 hours, Bunty. We will sign this report in 2031.
> **Bunty:** Then which ones do we check?
> **Lakshmi:** Enough of them, picked so that every invoice had a chance. Then the sample speaks for all of them.

That is **audit sampling**: applying audit procedures to less than 100% of a **population** (here, the invoices) so that every item has a chance of selection, and concluding about the whole population from the sample. It works only if the sample is **representative**: closely similar to the population, not necessarily the same.

Three choices decide it: **how many** (more when the auditor wants more assurance or expects more errors); **which ones** (at random, at an interval or by rupee value, never just the first page or the easy-to-find files); and **what the results mean** (each error is investigated, projected and evaluated). The risk that even a well-picked sample tells a different story from the population is **sampling risk**.

::: analogy Tasting the chai
Kesar's mother tastes one spoon from a whole handi of chai, after stirring it: every part of the pot had a chance of reaching the spoon (random selection). A spoon off the top of an unstirred pot tells you about the top (block sampling). A sugar layer at the bottom gets tasted separately (stratification). And one salty spoon is checked again before the pot is blamed.
:::

::: key
A sample earns the right to speak for the population only if it is representative: an appropriate, complete population; a size that reduces sampling risk to an acceptably low level; a selection that gives every sampling unit a chance; and results that are investigated, projected and evaluated.
:::

## How it works

### 1. Meaning, objective and scope

::: definition Audit sampling
The application of audit procedures to less than 100% of items within a population of audit relevance such that all sampling units have a chance of selection in order to provide the auditor with a reasonable basis on which to draw conclusions about the entire population. (SM 4.137; also SM 4.45, which speaks of an "equal chance")
:::

The objective of the auditor when using audit sampling is ==to provide a reasonable basis for the auditor to draw conclusions about the population from which the sample is selected== (SM 4.45).

SA 530 applies when the auditor has decided to use audit sampling. It deals with the auditor's use of statistical and non-statistical sampling when designing and selecting the audit sample, performing tests of controls and tests of details, and evaluating the results from the sample (SM 4.45–4.46). It complements [[aud.evid.sa500|SA 500]], which lists sampling as one means of selecting items (SM 4.46). Sampling is not obligatory, but an auditor who relies on part checking should use techniques with a recognised basis (SM 4.44–4.45). It is used in tests of controls (to find deviations) and tests of details (to find misstatements) (SM 4.48).

### 2. Population, sampling unit and a representative sample

::: definition Population and sampling unit
**Population** refers to the entire set of data from which a sample is selected and about which the auditor wishes to draw conclusions. The individual items that make up the population are known as **sampling units**. (SM 4.46–4.47)
:::

The population must be (SM 4.46–4.47):

1. **Appropriate** for the specific audit objective, including the direction of testing: to test overstatement of receivables the population could be the receivables listing; to test understatement of payables it is not the payables listing but subsequent disbursements, unpaid invoices, suppliers' statements and unmatched receiving reports.
2. **Complete**: to conclude that a control operated throughout the period, the population must include all relevant items throughout the entire period.
3. **Reliable**: the auditor obtains evidence that the information on which sampling is performed is sufficiently complete and accurate.

The sampling unit suits the objective: for the validity of receivables, customer balances or individual invoices. Whatever the approach, the sample must be representative and large enough to give statistically meaningful results (SM 4.47).

### 3. Sampling risk and non-sampling risk

Detection risk comprises sampling risk and non-sampling risk (SM 3.8; [[aud.risk.model|audit risk]]).

::: definition Sampling risk and non-sampling risk
**Sampling risk** is the risk that the auditor's conclusion based on a sample may be different from the conclusion if the entire population were subjected to the same audit procedure: the sample was not representative of the population. **Non-sampling risk** is the risk that the auditor reaches an erroneous conclusion for any reason not related to sampling risk, for example by applying an inappropriate audit procedure. (SM 3.8)
:::

Sampling risk can lead to two types of erroneous conclusions (SM 4.137–4.138):

| Erroneous conclusion | Test of controls | Test of details | Affects |
|---|---|---|---|
| (i) Too optimistic | Controls are more effective than they actually are | No material misstatement exists when in fact it does | **Audit effectiveness**: more likely to lead to an inappropriate opinion; the auditor is primarily concerned with this type |
| (ii) Too pessimistic | Controls are less effective than they actually are | A material misstatement exists when in fact it does not | **Audit efficiency**: usually leads to additional work to show the initial conclusion was wrong |

### 4. Statistical or non-statistical sampling

::: definition Statistical sampling
An approach to sampling that has the random selection of the sample items; and the use of probability theory to evaluate sample results, including measurement of sampling risk characteristics. A sampling approach that does not have these features is non-statistical sampling. (SM 4.48)
:::

Statistical sampling is **more scientific** (SM 4.49): (1) it uses mathematical laws of probability to determine the sample size; (2) it has wide application where the population is a large number of similar items (compliance testing, trade receivables' confirmation, payroll checking, vouching of invoices and petty cash vouchers); (3) there is no personal bias, so results are evaluated and projected more reliably. For huge numbers of transactions it is always recommended, with random sampling as the method (SM 4.49).

Under **non-statistical sampling**, sample size and composition come from the auditor's personal experience and knowledge (say March, June and September this year, other months next year; or the ten highest values). It is simple, but criticised as neither objective nor scientific: personal bias cannot be eliminated, and the closeness of the sample to the population cannot be measured (SM 4.49–4.50).

The choice between the two is the auditor's judgement, and **sample size is not a valid criterion to distinguish between them** (SM 4.51).

**Advantages of statistical sampling** (SM 4.52), in ICAI's order:

1. The amount of testing (sample size) does not increase in proportion to the increase in the size of the area (universe) tested.
2. The sample selection is more objective and thereby more defensible.
3. It provides a means of estimating the minimum sample size associated with a specified risk and precision.
4. It provides a means for deriving a "calculated risk" and corresponding precision (sampling error), the probable difference in result from using a sample instead of examining all the records.
5. It may provide a better description of a large mass of data than a complete examination, since non-sampling errors such as processing and clerical mistakes are not as large.
6. It is widely accepted as more scientific, without personal bias, with results evaluated and projected more reliably.

Statistical sampling may not be appropriate when another approach is necessary or gives satisfactory information in less time or effort, for instance **when exact accuracy is required or for legal requirements**, or when the audit staff do not know the technique (SM 4.52).

**Factors in deciding the extent of checking** on a sampling plan (SM 4.51): (i) size of the organisation under audit; (ii) state of the internal control; (iii) adequacy and reliability of books and records; (iv) tolerable error range; (v) degree of the desired confidence. Satisfactory internal control allows a much smaller sample (SM 4.51).

### 5. The sampling process

::: diagram The sampling process (SM 4.53)
{"type": "flow", "w": 420, "nodes": [{"id": "a", "kind": "start", "label": "Sample design"}, {"id": "b", "kind": "process", "label": "Sample size"}, {"id": "c", "kind": "process", "label": "Sample selection"}, {"id": "d", "kind": "process", "label": "Perform audit procedures"}, {"id": "e", "kind": "process", "label": "Nature and cause of\ndeviations and misstatements"}, {"id": "f", "kind": "process", "label": "Projecting misstatements"}, {"id": "g", "kind": "end", "label": "Evaluating results"}], "edges": [["a", "b"], ["b", "c"], ["c", "d"], ["d", "e"], ["e", "f"], ["f", "g"]], "caption": "The seven stages in the Study Material's order. The requirements of each are set out below."}
:::

### 6. Sample design, stratification and value-weighted selection

The three requirements (SM 4.53): when designing an audit sample, **the auditor shall consider the purpose of the audit procedure and the characteristics of the population** from which the sample will be drawn; the auditor **shall determine a sample size sufficient to reduce sampling risk to an acceptably low level**; and the auditor **shall select items for the sample in such a way that each sampling unit in the population has a chance of selection**.

The auditor defines exactly what is a deviation or misstatement, so that all, and only, the conditions relevant to the purpose are evaluated. In a confirmation of receivables for existence, a payment made by the customer before the confirmation date but received by the client shortly after it is not a misstatement; and a wrong posting between customer accounts, which does not affect the total, may not be treated as a misstatement for this procedure, though it may matter elsewhere (the risk of fraud, the allowance for doubtful accounts) (SM 4.53–4.54). The auditor also obtains evidence that the population is complete (SM 4.54).

For tests of controls the auditor assesses the **expected rate of deviation**; if it is unacceptably high, the auditor will normally decide not to perform tests of controls. For tests of details the auditor assesses the **expected misstatement**; if it is high, 100% examination or a large sample may be appropriate (SM 4.54).

::: definition Stratification
The process of dividing a population into sub-populations, each of which is a group of sampling units which have similar characteristics (often monetary value). (SM 4.66)
:::

The objective of stratification is ==to reduce the variability of items within each stratum and therefore allow sample size to be reduced without increasing sampling risk== (SM 4.55). For tests of details the population is often stratified by monetary value, or by a risk characteristic (receivables by age, for the allowance for doubtful accounts). Results from a stratum are projected only to that stratum; to conclude on the population, the results of all strata are combined. If 20% of items make up 90% of the value, the auditor concludes on that 90% separately from the remaining 10% (SM 4.55–4.56).

**Value-weighted selection** makes the sampling unit each monetary unit (rupee) of the population and examines the balances that contain the selected units: larger items get a greater chance of selection, samples can be smaller, and the conclusion is in monetary amounts (SM 4.56).

### 7. Sample size

The auditor shall determine a sample size sufficient to reduce sampling risk to an acceptably low level: **the lower the risk the auditor is willing to accept, the greater the sample size** (SM 4.56). Size may come from a statistical formula or professional judgement; each factor has a similar effect under either approach (SM 4.56–4.57).

**Tests of controls** (SM 4.57–4.58): the factors are considered together, assuming the auditor does not change the nature or timing of tests of controls or the approach to substantive procedures.

| Factor (tests of controls) | Effect on sample size |
|---|---|
| Increase in the extent to which the risk assessment takes into account relevant controls (more reliance on operating effectiveness) | Increase |
| Increase in the tolerable rate of deviation | Decrease |
| Increase in the expected rate of deviation of the population | Increase |
| Increase in the desired level of assurance that the tolerable rate is not exceeded by the actual rate | Increase |
| Increase in the number of sampling units in the population | Negligible effect |

**Tests of details** (SM 4.58–4.60): considered together, assuming the auditor does not change the approach to tests of controls or the nature or timing of substantive procedures.

| Factor (tests of details) | Effect on sample size |
|---|---|
| Increase in the assessed risk of material misstatement | Increase |
| Increase in the use of other substantive procedures directed at the same assertion | Decrease |
| Increase in the desired level of assurance that tolerable misstatement is not exceeded by actual misstatement | Increase |
| Increase in tolerable misstatement | Decrease |
| Increase in the amount of misstatement the auditor expects to find | Increase |
| Stratification of the population, when appropriate | Decrease |
| Number of sampling units in the population | Negligible effect (but under monetary unit sampling, a larger monetary value increases sample size unless offset by a proportional increase in materiality) |

::: definition Tolerable misstatement and tolerable rate of deviation
**Tolerable misstatement**: a monetary amount set by the auditor in respect of which the auditor seeks to obtain an appropriate level of assurance that the monetary amount set by the auditor is not exceeded by the actual misstatement in the population. **Tolerable rate of deviation**: a rate of deviation from prescribed internal control procedures set by the auditor in respect of which the auditor seeks to obtain an appropriate level of assurance that the rate set is not exceeded by the actual rate of deviation in the population. (SM 4.67)
:::

### 8. Selecting the items: five methods

The auditor shall select items so that each sampling unit has a chance of selection. With statistical sampling each unit has a known probability of selection; with non-statistical sampling judgement is used, but the sample must still be representative and free of bias (SM 4.60).

| Method (SM 4.60–4.64) | How it works | Watch out |
|---|---|---|
| **Random**: simple random | Each unit has an equal chance; random number tables or a random number generator | Suits a homogeneous population within a reasonable range |
| **Random**: stratified | Divide the population into strata; take a sample (different proportions) from each, randomly | An extension of simple random sampling for a diversified population |
| **Systematic** (interval) | Units in the population ÷ sample size = sampling interval; pick a starting point in the first interval, then every interval-th unit | The interval must not match a pattern in the population; use more than one random starting point |
| **Monetary unit** | Value-weighted selection: sample size, selection and evaluation give a conclusion in monetary amounts | Larger items are more likely to be picked |
| **Haphazard** | No structured technique, but no conscious bias or predictability (not avoiding hard-to-find items, not always the first or last entry on a page) | Not appropriate when using statistical sampling |
| **Block** | A block of contiguous items, e.g. the first 200 sales invoices of September | Rarely appropriate for inferences about the whole population; risk of bias and a pattern the client can notice |

::: formula Sampling interval (systematic selection)
$$\text{Sampling interval} = \frac{\text{Units in the population}}{\text{Sample size}}$$
From a starting point within the first interval, every interval-th sampling unit is selected (SM 4.62).
:::

### 9. Performing the procedures

The auditor shall perform procedures appropriate to the purpose on each selected item. If a procedure is not applicable to an item, it is performed on a **replacement item** (a properly cancelled cheque picked while testing payment authorisation is replaced). If neither the designed procedure nor a suitable alternative (such as subsequent cash receipts for an unanswered positive confirmation) can be applied, for example because documents are lost, the item is treated as a **deviation** or a **misstatement** (SM 4.64–4.65).

::: diagram What happens to each selected item (SM 4.64–4.65)
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "Item selected"}, {"id": "d1", "kind": "decision", "label": "Procedure applicable\nto the item?"}, {"id": "r", "kind": "process", "label": "Perform it on a\nreplacement item"}, {"id": "d2", "kind": "decision", "label": "Designed or alternative\nprocedure possible?"}, {"id": "x", "kind": "end", "label": "Treat as deviation\nor misstatement", "color": "bad"}, {"id": "e", "kind": "end", "label": "Perform it;\nevaluate the result", "color": "ok"}], "edges": [["s", "d1"], ["d1", "r", "no"], ["d1", "d2", "yes"], ["d2", "x", "no"], ["d2", "e", "yes"]], "caption": "Green: the normal path; rose: an item the auditor cannot test counts against the population: a deviation in a test of controls, a misstatement in a test of details."}
:::

### 10. Deviations, anomalies, projection and evaluation

- **Nature and cause.** The auditor shall investigate the nature and causes of any deviations or misstatements and evaluate their possible effect on the purpose of the procedure and on other areas of the audit. A common feature (type of transaction, location, product line, period) may call for extending procedures to all items with it; deviations may indicate fraud (SM 4.65).
- **Anomaly**: a misstatement or deviation that is demonstrably not representative of misstatements or deviations in a population. In extremely rare circumstances the auditor may treat one as an anomaly, but only after obtaining a high degree of certainty, through additional procedures, that it does not affect the remainder of the population (SM 4.65–4.66).
- **Projection.** For tests of details the auditor shall project misstatements found in the sample to the population, for a broad view of their scale (not necessarily the amount to record). An anomaly may be excluded from the projection, but its effect, if uncorrected, is considered in addition. For tests of controls no explicit projection is necessary: **the sample deviation rate is also the projected deviation rate** for the population (SM 4.66).
- **Evaluation.** The auditor shall evaluate (a) the results of the sample and (b) whether the use of audit sampling has provided a reasonable basis for conclusions about the population that has been tested (SM 4.66).

## Worked examples

:::: example The café that was sampled 120 times
Tapri's 40 flagship cafés each send a daily cash-sales summary. For the 120 days from December to March there are 4,800 summaries, filed in a fixed rotation: café 1, café 2, … café 40, then café 1 again the next day. Bunty wants 120 summaries by systematic selection and picks a random start of 17.

Required:

(i) Compute the sampling interval and list the first four and the last item selected.

(ii) Comment on the sample with reference to SA 530.

(iii) Advise how the selection should be made.

::: answer Show the working
**(i)** Sampling interval = number of sampling units in the population ÷ sample size = 4,800 ÷ 120 = **40**. Items selected: 17, 57, 97, 137, … and the 120th is 17 + 40 × 119 = **4,777**.

**(ii)** Under systematic selection the auditor must determine that the sampling units are not structured so that the sampling interval corresponds with a particular pattern in the population. The rotation repeats every 40 items and the interval is 40, so all 120 summaries are café 17's. The sample is not representative of the 40 cafés.

**(iii)** More than one random starting point reduces this risk, but here four starts (17, 52, 91, 138) with an interval of 160 still reach only cafés 11, 12, 17 and 18. Better: random selection over items 1 to 4,800, or stratify by café (40 strata) and pick three summaries from each at random, so every café is covered.
:::
::::

:::: example Bunty's three shortcuts
Comment on each of the following with reference to SA 530.

(a) To save time, Bunty tests the first 200 purchase invoices of April and concludes on purchases for the whole year.

(b) Selecting "haphazardly", Bunty skips the invoices stored in the basement because they are hard to reach.

(c) In his sample of 60 sales invoices, one has a wrong GST rate. Bunty calls it an anomaly and leaves it out, without further work.

::: answer Model answer
**(a)** Block sampling selects a block of contiguous items. It would rarely be an appropriate selection technique when the auditor intends to draw valid inferences about the entire population, because items in a sequence share characteristics that differ from items elsewhere. April's first 200 invoices are not representative of twelve months: no reasonable basis for a conclusion on the year.

**(b)** Haphazard selection uses no structured technique, but the auditor avoids any conscious bias or predictability, such as avoiding difficult-to-locate items, so that all items have a chance of selection. Skipping the basement is exactly that bias.

**(c)** The auditor shall investigate the nature and cause of every misstatement. An anomaly is accepted only in extremely rare circumstances, after obtaining a high degree of certainty through additional procedures that it is not representative of the population. Without that work it is included in the projection; and if the wrong rate has a common feature (a product, a location), procedures are extended to all items with that feature.
:::
::::

::::: example Two results, two conclusions
(a) **Test of controls.** Purchase orders above ₹5 lakh must be approved by Tapri's CFO. Iyer & Associates test 60 orders, with a tolerable rate of deviation of 4%, and find 3 unapproved orders.

(b) **Test of details.** Tapri's institutional receivables (hotels, airlines and offices) comprise 1,200 balances of ₹60.00 crore. The auditors tested all 48 balances above ₹50 lakh (stratum A, ₹40.20 crore) and found overstatements of ₹18 lakh. From the other 1,152 balances (stratum B, ₹19.80 crore) a random sample of 72 balances worth ₹1.32 crore showed overstatements of ₹4.40 lakh. Tolerable misstatement is ₹75 lakh.

Required: evaluate each result. For (b), project the stratum B misstatement in proportion to the value sampled.

:::: answer Show the working
**(a)** For tests of controls no explicit projection is needed: the sample deviation rate, 3 ÷ 60 = **5%**, is also the projected deviation rate for the population. It exceeds the tolerable rate of 4%, so the sample does not support the planned reliance on the control. The auditor shall investigate the nature and cause of the deviations (SA 530). Under SA 330 the auditor makes specific inquiries into the deviations and determines whether the tests of controls provide an appropriate basis for reliance, whether additional tests of controls are necessary, or whether the risks need to be addressed using substantive procedures; where the assessed control risk must be revised, the nature, timing and extent of planned substantive procedures for purchases are modified (SM 3.53–3.54, 3.69–3.70).

**(b)** Stratum A is 4.0% of the items (48 of 1,200) but 67.0% of the value (₹40.20 crore of ₹60.00 crore).

::: diagram Stratum A: few balances, most of the value
{"type": "plot", "h": 260, "x": [0.4, 2.6], "y": [0, 110], "xticks": [[1, "Stratum A"], [2, "Stratum B"]], "yticks": [0, 25, 50, 75, 100], "ylabel": "share of the population (%)", "legend": "outside", "series": [{"label": "share of the 1,200 balances", "bars": true, "bw": 0.34, "values": true, "color": "a", "pts": [[0.82, 4.0, "4%"], [1.82, 96.0, "96%"]]}, {"label": "share of the ₹60 crore", "bars": true, "bw": 0.34, "values": true, "color": "c", "pts": [[1.18, 67.0, "67%"], [2.18, 33.0, "33%"]]}], "caption": "Blue: share of the number of balances; amber: share of the rupee value. Testing all of stratum A covers two-thirds of the value with 48 balances."}
:::

| Stratum | Value (₹ lakh) | Found (₹ lakh) | For the stratum (₹ lakh) |
|---|---:|---:|---:|
| A: 48 balances above ₹50 lakh, all tested | 4,020 | 18.00 | 18.00 actual |
| B: 1,152 balances; sample of 72 worth ₹132 lakh | 1,980 | 4.40 | 66.00 projected |
| **Total** | **6,000** | | **84.00** |

Working: stratum B = 1,980 × 4.40 ÷ 132 = ₹66 lakh (a 3.33% rate). Each stratum's result is projected only to that stratum; the strata are then combined.

The combined ₹84 lakh exceeds the tolerable misstatement of ₹75 lakh, so the sample does not provide a reasonable basis for concluding that receivables are not materially misstated. The auditor investigates the nature and causes of the misstatements, may request management, on the basis of this projection, to examine the receivables and correct the misstatements, and then performs additional procedures to determine whether misstatements remain (SM 7.25; [[aud.complete.sa450|SA 450]] evaluates the misstatements).

*Conventions:* the Study Material requires projection but prescribes no method; this example projects in proportion to rupee value sampled (a count-based projection would differ). It requires the auditor to evaluate whether sampling has provided a reasonable basis for conclusions (SM 4.66) without a numerical test; comparing projected with tolerable misstatement is how ICAI's MTP September 2024 Series I MCQ 9 frames that evaluation.
::::
:::::

## Under the hood

### Precautions while applying test check techniques (SM 4.138)

The Study Material's eight points, in its order:

1. A thorough study of the accounting system before adopting sampling.
2. A proper study of the internal control systems.
3. Careful consideration of the areas not suitable for sampling, e.g. compliance with statutory provisions and transactions of an unusual nature.
4. Proper planning of the sampling methods to be used, and explaining them to the staff.
5. Proper classification (stratification) of transactions and balances.
6. Appropriate determination of the sample size.
7. Choosing the sample in an unbiased way.
8. Proper analysis of the errors located in the sample.

## Exam angle

::: exam Where SA 530 appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, SA 530 was examined in 16 questions across 10 documents.

- **Descriptive, 3 to 5 marks.** Statistical sampling "more scientific": September 2024 Q3(d) (3 marks); with random sampling for over a lakh of sales, September 2025 Q4(c) (4 marks). Systematic sampling, its pattern risk and multiple starts, plus "the first 150 accounts" as block sampling: May 2026 Q1(b) (5 marks) and MTP September 2024 Series II Q1(b) (5 marks). Desired assurance and stratification as sample-size factors: MTP May 2026 Series I Q3(a) (5 marks). Projecting misstatements: November 2020 (old scheme) Q2(c) (3 marks).
- **Multiple choice, 2 marks each.** Naming the method: RTP January 2025 MCQ 1; MTP May 2025 Series II MCQ 3 (every 11th of 550 creditors); MTP September 2025 Series I MCQs 4–5 (population 100, interval 5, sample 20). Sample-size factors: September 2025 MCQ 5; MTP September 2024 Series I MCQ 8. Sampling and non-sampling risk: September 2025 MCQ 3, May 2026 MCQ 2. Anomalies: May 2026 MCQ 3; MTP September 2024 Series I MCQ 9 (projected plus anomalous misstatement as the best estimate; its wrong options say that a sample whose projected misstatement exceeds tolerable misstatement still "provides a reasonable basis").
:::

::: exam A key to know: "transactions exceeding ₹8,000"
In RTP January 2025 MCQ 1, the four selections were random number tables, no structured method, "transactions exceeding ₹8,000" and "the first 200 sales invoices of July", and ICAI's key reads random, haphazard, **monetary unit** and block sampling. In the Study Material, examining all items whose recorded values exceed a certain amount is one of SA 500's ways of *selecting specific items* (SM 4.31), while monetary unit sampling is value-weighted selection of individual monetary units (SM 4.56, 4.63). If an MCQ forces a choice among sampling methods for a value-based selection, monetary unit sampling is the option ICAI keyed; in a descriptive answer, use the Study Material's terms.
:::

::: exam How the marks are earned
Theory answers reproduce the Study Material's lists in order: "more scientific" (three points), the six advantages, the factor tables with "increase / decrease". Method questions want the name, a one-line description and the caution (pattern for systematic, inferences for block, bias for haphazard).
:::

::: trick Sample size: worry up, tolerance down
Anything that makes the auditor **want more assurance or expect more errors** (more reliance on controls, higher expected deviation or misstatement, higher risk of material misstatement, higher desired assurance) **increases** the sample. Anything that makes the auditor **tolerate more or rely on something else** (higher tolerable rate or misstatement, other substantive procedures on the same assertion, stratification) **decreases** it. Population size: negligible for large populations (except monetary unit sampling's value effect).
:::

## Answer frame

### A selection-method case (5 marks)

1. **Name** the method: "CA R is using systematic (interval) sampling."
2. **Explain** it with the case's numbers: "interval = 1,000 ÷ 100 = 10; every 10th account from the start."
3. **Caution**: the interval must not correspond with a pattern in the population.
4. **Remedy**: more than one random starting point.
5. **Second method**: "the first 150 accounts" is block sampling, rarely appropriate for conclusions on the population.

### "Distinguish statistical and non-statistical sampling"

| Point | Statistical | Non-statistical |
|---|---|---|
| Selection | Random selection of sample items | Auditor's experience and knowledge |
| Evaluation | Probability theory, including measurement of sampling risk | Judgement; closeness to the population cannot be measured |
| Bias | No personal bias | Personal bias cannot be eliminated |
| Strength | Objective and defensible; sampling risk and precision can be measured | Simplicity in operation |
| Leans on | Wide application to large populations of similar items | The auditor's experience and knowledge of the client's business to evaluate the findings |

Common to both: the sample must be representative, and sample size is not a valid criterion to distinguish the two (SM 4.47, 4.51).

## Common mistakes

::: mistake Hall of Shame: the 120 samples of café 17
**Fix:** check the population's structure before using an interval; use multiple random starts, random selection or stratification.
:::

::: mistake "Stratified sampling is for homogeneous populations"
**Fix:** the reverse: it divides a heterogeneous population into homogeneous sub-populations (SM 4.55, 4.128).
:::

::: mistake Projecting a stratum's result to the whole population
**Fix:** results from a stratum are projected only to that stratum; the strata are then combined (SM 4.55–4.56, 4.129).
:::

::: mistake Calling the first misstatement an anomaly
**Fix:** an anomaly needs a high degree of certainty, from additional procedures, that it is not representative; otherwise project it.
:::

## Practice

::: quiz Check yourself
Q: Tapri's Ujjain depot has 2,750 goods received notes for the year. Iyer & Associates want a systematic sample of 110. What is the sampling interval?
= 25
> 2,750 ÷ 110 = 25: a start between 1 and 25, then every 25th note.

Q: Case scenario. CA Neha Bose audits Narmada Snacks Ltd. For testing credit approvals she raises the tolerable rate of deviation from 3% to 6%, and decides to place more reliance on the operating effectiveness of the credit controls in her risk assessment. Which statement about sample size is correct?
- [ ] Both changes increase the sample size
- [ ] Both changes reduce the sample size
- [x] The higher tolerable rate reduces the sample size, while greater reliance on controls increases it
- [ ] Neither change affects the sample size, which depends on the size of the population
> A higher tolerable rate of deviation decreases the sample; more reliance on controls increases the extent of tests of controls (SM 4.57). Population size has little effect for large populations.

Q: Which of the following is correct about stratification?
- [ ] It is used for a homogeneous population
- [x] Its objective is to reduce the variability of items within each stratum, allowing sample size to be reduced without increasing sampling risk
- [ ] The result from one stratum can be projected directly to the whole population
- [ ] It increases the sample size needed for a given sampling risk
> Stratification suits a heterogeneous population; each stratum's result is projected only to that stratum.

Q: In a test of controls, Bunty finds 2 deviations in a sample of 50. What is the projected deviation rate for the population, in per cent?
= 4
> The sample deviation rate is also the projected rate: 2 ÷ 50 = 4% (SM 4.66).

Q: Which of the following is the auditor primarily concerned with, among the erroneous conclusions sampling risk can lead to?
- [x] Concluding that controls are more effective than they are, or that no material misstatement exists when it does
- [ ] Concluding that controls are less effective than they are
- [ ] Concluding that a material misstatement exists when it does not
- [ ] Choosing an inappropriate audit procedure
> The first type affects effectiveness and is more likely to lead to an inappropriate opinion; the second affects efficiency; a wrong procedure is non-sampling risk.
:::

## Recap

- Audit sampling: procedures on less than 100% of a population, all sampling units having a chance of selection, to give a reasonable basis for conclusions about the whole.
- Population must be appropriate (direction of testing), complete and reliable; the sample must be representative.
- Sampling risk: the sample's conclusion differs from the population's; type (i) hurts effectiveness (the main concern), type (ii) efficiency. Non-sampling risk: any other reason.
- Statistical sampling: random selection plus probability theory to evaluate results; sample size does not distinguish it.
- Process: design, size, selection, procedures, nature and cause, projection, evaluation.
- Size up: more reliance on controls, higher expected errors, higher risk, more assurance. Size down: higher tolerable rate or misstatement, other substantive procedures, stratification.
- Methods: random (simple, stratified), systematic (interval = population ÷ sample size; watch for patterns), monetary unit, haphazard (no conscious bias), block (rarely appropriate).
- Untestable item: deviation or misstatement. Anomaly only with a high degree of certainty. Tests of controls: sample deviation rate = projected rate. (Stir the chai before you taste it.)

## Flashcards

Q:: SA 530: define audit sampling.
A:: The application of audit procedures to less than 100% of items within a population of audit relevance such that all sampling units have a chance of selection, to provide a reasonable basis on which to draw conclusions about the entire population.

Q:: SA 530: objective of the auditor when using audit sampling?
A:: To provide a reasonable basis for the auditor to draw conclusions about the population from which the sample is selected.

Q:: Define sampling risk and non-sampling risk.
A:: Sampling risk: the auditor's conclusion based on a sample may differ from the conclusion if the entire population were subjected to the same procedure. Non-sampling risk: an erroneous conclusion for any reason not related to sampling risk.

Q:: Which erroneous conclusion from sampling risk is the auditor primarily concerned with, and why?
A:: Controls more effective than they are, or no material misstatement when there is one: it affects audit effectiveness and is more likely to lead to an inappropriate opinion.

Q:: What is statistical sampling?
A:: An approach with random selection of the sample items and the use of probability theory to evaluate sample results, including measurement of sampling risk characteristics.

Q:: SA 530: the three requirements on design, size and selection?
A:: Consider the purpose of the procedure and the characteristics of the population; determine a sample size sufficient to reduce sampling risk to an acceptably low level; select items so that each sampling unit has a chance of selection.

Q:: Objective of stratification?
A:: To reduce the variability of items within each stratum and therefore allow sample size to be reduced without increasing sampling risk.

Q:: Effect on sample size: increase in tolerable misstatement? increase in expected misstatement?
A:: Higher tolerable misstatement decreases the sample size; higher expected misstatement increases it.

Q:: How is the sampling interval computed in systematic selection, and what is its main risk?
A:: Number of sampling units in the population ÷ sample size. Risk: the interval corresponds with a pattern in the population; use more than one random starting point.

Q:: SA 530: what if a designed or alternative procedure cannot be applied to a selected item?
A:: Treat the item as a deviation (tests of controls) or a misstatement (tests of details).

Q:: Define anomaly.
A:: A misstatement or deviation that is demonstrably not representative of misstatements or deviations in a population; accepted only with a high degree of certainty from additional procedures.

Q:: Is explicit projection of deviations needed for tests of controls?
A:: No. The sample deviation rate is also the projected deviation rate for the population as a whole.
