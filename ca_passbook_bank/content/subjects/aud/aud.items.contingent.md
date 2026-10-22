---
id: aud.items.contingent
title: Audit of contingent liabilities
minutes: 24
needs: aud.items.liabilities, aud.evid.sa501
tags: contingent liabilities, AS 29, provisions, litigation and claims, guarantees, commitments, Schedule III, legal counsel
labs:
summary: How the auditor hunts for liabilities that are not in the ledger, grades each claim, guarantee and dispute as probable, possible or remote with expert evidence, and checks the Schedule III and AS 29 disclosure.
---

## In plain words

### The lawsuit nobody mentioned

Tapri's legal department hands Iyer & Associates a list of two pending cases. Bunty, for once, reads the vouchers before ticking them.

> **Kesar:** Lakshmi-ji, no court has said we owe a rupee. Why write anything in the accounts?
> **Lakshmi:** Because a court might, Kesar-ji. Readers are entitled to know what might.
> **Bunty:** Ma'am, the list has two cases, but the legal fees ledger pays a lawyer for a third: "Sharma vs Tapri", ₹1.2 crore.
> **Lakshmi:** Now you are auditing, Bunty.

A **contingent liability** is a liability that may or may not become real, depending on a future event the company does not control: the court's verdict, the tribunal's decision on an appeal, a franchisee repaying the bank loan that Tapri guaranteed. Because nothing has been paid or settled, it sits in **no ledger**. That is the auditor's whole problem: vouching entries can never find an entry that was never made. So the audit of contingent liabilities is a **search** (agreements, litigation, minutes, lawyers' bills, the lawyers themselves) followed by a **judgement** on each item found: is an outflow **probable** (then it is a provision, recorded in the books), **possible** (then it is a contingent liability, disclosed in the notes) or **remote** (then nothing is said)?

::: analogy Standing guarantor for a friend's bike loan
You have paid nothing, and you may never pay anything. But when your father asks whether you owe money to anyone, the honest answer mentions the guarantee: "nothing yet, but up to ₹80,000 if Rohan stops paying". That sentence is a contingent liability note. And if Rohan has already stopped paying and the bank has written to you, it is no longer a footnote: it is a debt you must plan for, which is a provision.
:::

::: key
Contingent liabilities are found, not vouched. The auditor searches for every claim, guarantee and dispute, obtains evidence (often a legal expert's assessment) of whether an outflow is probable, possible or remote, and checks that probable obligations are provided for, possible ones are disclosed as Schedule III and AS 29 require, and remote ones are left out.
:::

## How it works

### 1. Provision or contingent liability?

The Study Material defines both side by side (SM 5.85).

::: definition Provision
A provision is a liability which can be measured only by using a substantial degree of estimation. A provision is recognised when (SM 5.85):

- (i) an entity has a present obligation (legal or constructive) as a result of a past event;
- (ii) it is probable that an outflow of resources embodying economic benefits will be required to settle the obligation; and
- (iii) a reliable estimate can be made of the amount of the obligation.

If these conditions are not met, no provision is recognised. Examples: provision for litigation, provision for warranties.
:::

::: definition Contingent liability
A contingent liability is (SM 5.85):

- (i) a **possible obligation** that arises from past events and whose existence will be confirmed only by the occurrence or non-occurrence of one or more uncertain future events not wholly within the control of the entity; or
- (ii) a **present obligation** that arises from past events but is not recognised because:
  - it is not probable that an outflow of resources embodying economic benefits will be required to settle the obligation; or
  - the amount of the obligation cannot be measured with sufficient reliability.
:::

A contingent liability is disclosed **unless the possibility of any outflow in settlement is remote** (SM 5.89). So every claim the auditor finds lands in one of three places:

::: diagram Where does a claim belong?
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "A claim, dispute\nor guarantee"}, {"id": "d1", "kind": "decision", "label": "Present obligation,\noutflow probable,\nreliable estimate?"}, {"id": "p", "kind": "end", "label": "Provision:\nrecord it", "color": "f"}, {"id": "d2", "kind": "decision", "label": "Possibility of\noutflow remote?"}, {"id": "n", "kind": "end", "label": "No disclosure", "color": "mute"}, {"id": "c", "kind": "end", "label": "Contingent liability:\ndisclose", "color": "c"}], "edges": [["s", "d1"], ["d1", "p", "yes"], ["d1", "d2", "no"], ["d2", "n", "yes"], ["d2", "c", "no"]], "caption": "Violet: recognise a provision (see the audit of provisions). Amber: disclose as a contingent liability, by Schedule III class and with the AS 29 particulars. Grey: no disclosure. The middle question is answered with evidence, usually a legal expert's assessment of whether the outflow is probable, possible or remote (SM 5.86)."}
:::

The audit of the provisions themselves (their working, Schedule III heads and the AS 29 movement of each class) is in [[aud.items.liabilities|the audit of provisions and other liabilities]]; this lesson follows the items that fail the first question.

### 2. The procedures in the Study Material

The Study Material gives one table for provisions and contingent liabilities together (SM 5.85–5.87). ICAI examines it in that joint form, so learn it in this order:

::: steps
1. **Existence.** Obtain a list of all provisions and compare them with the balances in the ledger.
2. **Completeness.** Inspect the underlying agreements, such as agreements with customers, to assess warranty commitments, and any legal and other claims on the entity, that is, litigations.
3. **Valuation: the working.** Obtain management's working and the basis for each provision, and verify that it is complete and accurate.
4. **Valuation: the expert.** Where required, obtain the expert's report, calculation and working: for a warranty involving complex calculations, an **actuarial valuation report**; for any matter under legal dispute, the **assessment made by a legal expert** of the likelihood of a liability devolving on the entity, that is, whether it is **probable, possible or remote**. Then verify the expert's underlying assumptions with the data shared by management.
5. **Evaluate the management's expert** as SA 500 requires (below).
6. **Written representation** from management that it has made all the provisions which were required to be made as per the recognised accounting principles.
:::

**Using the work of a management's expert** (SA 500; SM 5.86–5.87). The audit evidence the auditor should obtain:

- evaluate the **competence, capabilities and objectivity** of that expert: whether the expert is employed by the entity or is an outside party; whether the expert is independent in respect of the entity; the auditor's previous experience of the work of the expert; the knowledge of the expert, his qualification, membership of a professional body or industry association;
- obtain an **understanding of the work** of that expert: whether the auditor has the expertise to evaluate the work of the expert; evaluating the assumptions and methods used; evaluating the nature of internal or external data used by the expert;
- evaluate the **appropriateness of the expert's work as audit evidence** for the relevant assertion: the relevance and reasonableness of the expert's findings or conclusions; evaluating the relevance, completeness and accuracy of the source data used by the expert.

### 3. Searching for litigation: SA 501

Most contingent liabilities are claims and litigation, and [[aud.evid.sa501|SA 501]] tells the auditor how to find them. The auditor shall design and perform procedures to identify litigation and claims that may give rise to a risk of material misstatement, including (SM 4.72–4.73):

- (a) **inquiry of management** and, where applicable, others within the entity, including in-house legal counsel;
- (b) **reviewing minutes** of meetings of those charged with governance and **correspondence** between the entity and its external legal counsel;
- (c) **reviewing legal expense accounts** (which is how Bunty found "Sharma vs Tapri").

If the auditor assesses a risk of material misstatement regarding identified litigation or claims, or procedures indicate that other material litigation or claims may exist, the auditor shall seek **direct communication with the entity's external legal counsel**, through a letter of inquiry requesting the counsel to communicate directly with the auditor (SM 4.73).

::: diagram Talking to the entity's lawyers
{"type": "seq", "lanes": ["Auditor", "Management", "External counsel"], "events": [{"lane": "Auditor", "text": "assesses a risk of material misstatement"}, {"from": "Auditor", "to": "Management", "text": "seeks permission"}, {"from": "Management", "to": "Auditor", "text": "permission"}, {"from": "Auditor", "to": "External counsel", "text": "letter of inquiry"}, {"from": "External counsel", "to": "Auditor", "text": "replies directly"}, {"lane": "Auditor", "text": "evaluates against management's assessment", "kind": "ok"}], "caption": "If counsel is unlikely to answer a letter of general inquiry, the auditor may send a letter of specific inquiry. If management refuses permission, or counsel refuses or is prohibited from responding, and alternative procedures give no sufficient appropriate evidence, the auditor modifies the opinion under SA 705 (SM 4.74–4.75)."}
:::

A **letter of specific inquiry** includes (SM 4.74): (a) a list of litigation and claims; (b) where available, management's assessment of the outcome of each and its estimate of the financial implications, including costs; and (c) a request that the counsel confirm the reasonableness of management's assessments and give further information if the list is incomplete or incorrect. The auditor may also need to **meet** the counsel, for example where the matter is a significant risk, is complex, or management and counsel disagree; such meetings ordinarily need management's permission and are held with a representative of management present. If law, regulation or the counsel's professional body prohibits direct communication, the auditor performs alternative procedures.

### 4. Two more sources of evidence

- **Subsequent events** ([[aud.complete.sa560|SA 560]]). A legal claim settled after the balance sheet date (for example, outside the court at a reduced amount, where a provision was made) gives evidence of conditions that existed at the balance sheet date and requires adjustment (SM 7.4–7.5). The Study Material's own case: a claim made after the year end for injury caused by goods shipped during the year, with management agreeing to an out-of-court settlement before the report, requires adjustment in the financial statements (SM 7.13, 7.57–7.58).
- **Written representations** ([[aud.complete.sa580|SA 580]]). Beyond the representation that all required provisions have been made, the auditor may request representations that liabilities, **both actual and contingent**, have been recognised, measured, presented or disclosed in accordance with the framework (SM 7.33). A representation supplements the evidence above; it never replaces the search.

## Formats and formulas

### Schedule III: "Contingent liabilities and commitments (to the extent not provided for)" (SM 5.88)

*Reproduce the heads in this order; the class decides where each item goes.*

| (i) Contingent liabilities | (ii) Commitments |
|---|---|
| (a) Claims against the company not acknowledged as debt | (a) Estimated amount of contracts remaining to be executed on capital account and not provided for |
| (b) Guarantees | (b) Uncalled liability on shares and other investments partly paid |
| (c) Other money for which the company is contingently liable | (c) Other commitments (specify nature) |

### AS 29: what each class of contingent liability must say (SM 5.89)

Unless the possibility of any outflow in settlement is remote, for **each class** of contingent liability at the balance sheet date, a brief **description of its nature** and, where practicable:

1. an **estimate of its financial effect**;
2. an **indication of the uncertainties** relating to any outflow; and
3. the **possibility of any reimbursement**.

Where any of this is not disclosed because it is not practicable, ==that fact should be stated==.

::: warning
Schedule III and AS 29 requirements are stated as the Study Material gives them. Verify against the Study Material and Statutory Update for your attempt.
:::

## Worked examples

:::: example Tapri's claims register, sorted
At 31 March 2026 Tapri Tea Co. Ltd's legal and claims register and contract files show (₹ crore):

(a) A GST demand of 3.40, under appeal before the Appellate Tribunal; tax counsel considers an outflow possible, not probable.

(b) A guarantee given to a bank for a loan of 5.00 to Chai Junction Pvt Ltd, a franchisee, which is repaying on schedule.

(c) "Sharma vs Tapri", a consumer case claiming 1.20 for a scalding from a cracked kulhad, missing from the legal department's list of pending cases and found by the auditors in the legal expenses ledger; Tapri's lawyer considers it probable that 0.40 will be awarded and the possibility of any higher award remote.

(d) A supplier's claim of 0.12 for late-payment interest, disputed by Tapri; legal advice: an outflow is possible.

(e) A notice from a rival café owner claiming 2.00 for defamation; counsel considers the possibility of any outflow remote.

(f) The Guwahati plant contract: 6.50 remains to be executed on capital account and is not provided for.

(g) Partly paid shares in an associate: uncalled liability 0.75.

Required:

(i) State how each item should be treated, and prepare the note on contingent liabilities and commitments.

(ii) State the evidence Iyer & Associates should obtain for items (a), (c) and (e).

::: answer Model answer
**(i) Treatment**

| Item | Treatment | Head |
|---|---|---|
| (a) GST demand, 3.40 | Contingent liability: outflow possible | Claims not acknowledged as debt |
| (b) Guarantee, 5.00 | Contingent liability: depends on the franchisee | Guarantees |
| (c) Consumer case | Provision of 0.40: present obligation, probable, reliably estimated; nothing more, as a higher award is remote | Provisions, not this note |
| (d) Supplier claim, 0.12 | Contingent liability: outflow possible | Claims not acknowledged as debt |
| (e) Defamation notice | No disclosure: outflow remote | None |
| (f) Capital contract, 6.50 | Commitment | Contracts on capital account |
| (g) Uncalled on shares, 0.75 | Commitment | Uncalled liability on partly paid shares |

**Contingent liabilities and commitments (to the extent not provided for)**, ₹ crore:

| Particulars | Amount |
|---|---:|
| (i) Contingent liabilities | |
| (a) Claims against the company not acknowledged as debt (3.40 + 0.12) | 3.52 |
| (b) Guarantees | 5.00 |
| (c) Other money for which the company is contingently liable | – |
| **Total contingent liabilities** | **8.52** |
| (ii) Commitments | |
| (a) Estimated amount of contracts remaining to be executed on capital account and not provided for | 6.50 |
| (b) Uncalled liability on shares and other investments partly paid | 0.75 |
| **Total commitments** | **7.25** |

For each class the note also gives, as AS 29 requires, a brief description of the nature (the GST appeal, the supplier's interest claim, the guarantee to Chai Junction's bank) and, where practicable, the estimate of financial effect, the uncertainties relating to any outflow and the possibility of any reimbursement.

**(ii) Evidence**

- **(a) GST demand.** The demand order, the appeal filed and its status; tax counsel's assessment of the likelihood (possible); evaluation of counsel's competence, capabilities and objectivity, of the assumptions and of the source data used.
- **(c) Consumer case.** Found through the legal expense account, so the auditor should ask why it was missing from the list, extend the search (minutes, correspondence with counsel) and seek direct communication with Tapri's external counsel by a letter of inquiry; obtain the lawyer's assessment supporting the ₹0.40 crore provision and the remote possibility of more.
- **(e) Defamation notice.** The notice and counsel's assessment that the possibility of outflow is remote, evaluated like any expert's work; no disclosure follows if the assessment is reasonable.

Finally, a written representation that all required provisions have been made and that liabilities, actual and contingent, are recognised or disclosed as the framework requires.
:::
::::

:::: example The caterer who would not let the auditor call its lawyers
CA Farhan Qureshi audits Dum Dum Caterers Ltd, an airline caterer in Kolkata, for 2025-26. The legal expense account shows fees paid every month to a labour law firm. Inquiry reveals that 140 dismissed workers have claimed ₹3.60 crore of back wages before the labour court. The financial statements neither provide for nor disclose the claim. Management refuses to give its own assessment of the outcome, and refuses permission for Farhan to write to or meet the law firm: "Our lawyers are confidential, and it will scare the bank." No other procedure gives evidence of the likely outcome. Overall materiality is ₹1 crore; total assets are ₹80 crore; nothing else is affected.

Advise CA Farhan Qureshi.

::: answer Model answer
**Relevant provision.** As per SA 501, the auditor shall design and perform procedures to identify litigation and claims, including inquiry of management, reviewing minutes and correspondence with external legal counsel, and reviewing legal expense accounts. If the auditor assesses a risk of material misstatement regarding identified litigation or claims, the auditor shall seek direct communication with the entity's external legal counsel through a letter of inquiry. If management refuses permission to communicate or meet with the counsel, and the auditor is unable to obtain sufficient appropriate audit evidence by alternative procedures, the auditor shall modify the opinion in accordance with SA 705. As per AS 29, a contingent liability is disclosed unless the possibility of outflow is remote; a provision is recognised when an outflow is probable and reliably estimable. As per SA 705, when, after acceptance, management imposes a limitation on the scope of the audit, the auditor shall request its removal and, if refused, communicate with those charged with governance and determine whether alternative procedures can provide sufficient appropriate audit evidence.

**Facts of the case.** A labour claim of ₹3.60 crore, found through the legal expense account, is neither provided for nor disclosed. Management will neither assess it nor allow contact with its lawyers, and no alternative evidence exists. Materiality is ₹1 crore; the claim is 4.5% of total assets.

**Analysis.** The claim is a risk of material misstatement: depending on its likely outcome it needs a provision (if probable) or disclosure as a contingent liability (unless remote), and either is material at 3.6 times overall materiality. Direct communication with external counsel is required, and its refusal by management is a management-imposed limitation on the scope of the audit. Farhan should request management to remove it and, if it refuses, inform those charged with governance; since no alternative procedure gives evidence of the likely outcome, sufficient appropriate audit evidence about the claim cannot be obtained. The possible effects are material but confined to one claim of ₹3.60 crore in a balance sheet of ₹80 crore: they are not pervasive.

**Conclusion.** CA Farhan Qureshi should express a **qualified opinion** ("except for the possible effects of the matter described in the Basis for Qualified Opinion section"), describing in that section the unprovided and undisclosed labour claim and the reasons for the inability to obtain evidence. A written representation from management cannot replace the counsel's evidence. The circumstances and the wording of the modification are first communicated to those charged with governance.
:::
::::

## Under the hood

### An older ICAI answer worth knowing

The current Study Material's list is the joint one above. ICAI's own answer to "How will you vouch/verify contingent liabilities?" in the old-scheme RTP for November 2020 (old Paper 6, Q19(c)) gave a wider search list: inspect the **minute books**; examine **contracts** for liabilities that may emanate from them; scrutinise **lawyers' bills** for unreported claims; examine **bank letters** for bills discounted and not matured and for **guarantees** given on behalf of others; discuss with the functional officers; obtain a **certificate from management** that all known contingent liabilities are included and disclosed; and check the Schedule III and AS 29 disclosure. Most of these are now inside SA 501 (minutes, legal expenses) and SA 580 (representations). Use the current list first; the extra points strengthen a "how will you verify" answer.

### "No contingent liabilities" is still a claim

A note saying there are no contingent liabilities is an **expressed negative assertion** (SM 4.27). The search procedures apply exactly as they would to a long note: the auditor must have evidence that nothing was found because nothing exists, not because nobody looked.

### Commitments are not contingent

A commitment (a capital contract still to be executed, an uncalled amount on partly paid shares) is a future outflow the company has agreed to; a contingent liability depends on an uncertain future event. Schedule III puts both in one note, under separate heads (SM 5.88).

## Exam angle

::: exam Where this topic appeared
In the ICAI documents read for this lesson (listed in the report):

- **Procedures, 4 marks.** "State the audit procedures (any five points) generally required to be undertaken while auditing provisions and contingent liabilities", on a warranty provision, a consumer litigation provision and a tax demand under appeal disclosed as a contingent liability (MTP May 2026 Series I Q5(c)). The answer is the Study Material's joint list (SM 5.85–5.86), point by point.
- **SA 501, 3 to 5 marks.** While reviewing contingent liabilities, management's explanations of significant litigation are unconvincing: the contents of a letter of specific inquiry (3 marks) and the auditor's responsibility if management refuses permission to communicate with counsel (1 mark) (January 2026 Q1(c)). Counsel's professional rules prohibit replies to a general inquiry: the other option (MTP January 2025 Series II Q5(b), 5 marks).
- **Scope of audit, 4 marks.** A material consumer claim of ₹50 lakh not disclosed, with management arguing that a possible future outcome is outside the auditor's responsibility (September 2026 Q4(c); answers not yet published).
- **Multiple choice, 2 marks.** A ₹10 lakh tax litigation below materiality but with doubtful disclosure: a letter of inquiry to external counsel **with management's permission** (RTP September 2026 MCQ 3). Old scheme: the definition of a possible obligation (MTP May 2022 Series II), and a court claim the company's lawyers say it is not likely to lose, as a contingent liability (RTP November 2023 MCQ 5).
- **Disclosure.** AS 29 particulars for each class of contingent liability (old-scheme MTPs July 2021, Series I and II).
:::

::: trick "Probable provides, possible prints, remote rests"
A **probable** outflow with a present obligation and a reliable estimate is **provided** in the books; a **possible** one is **printed** in the notes as a contingent liability; a **remote** one **rests**, with no disclosure. Condition: "probable" also needs the present obligation and the reliable estimate; a present obligation that cannot be measured reliably is printed, not provided.
:::

## Answer frame

### "How will you verify contingent liabilities?"

1. One line: contingent liabilities are not recorded, so the audit is a search plus an assessment.
2. The Study Material's joint list in order: list of provisions against the ledger; agreements, warranty commitments and legal claims; management's working; the expert's report (actuary, legal expert: probable, possible or remote); evaluation of the management's expert under SA 500; the written representation.
3. The SA 501 search: inquiry, minutes and correspondence with counsel, legal expense accounts; direct communication with external counsel.
4. Disclosure: the Schedule III heads and the AS 29 particulars.

### A case on an undisclosed claim

| Step | What to write |
|---|---|
| Relevant provision | AS 29 (provision or contingent liability, disclosed unless remote); SA 501 (search, direct communication with counsel, refusal leads to SA 705) |
| Facts of the case | The claim, its amount, materiality, what management has done or refused |
| Analysis | Probable, possible or remote, on what evidence; material or not; pervasive or not |
| Conclusion | The treatment management must adopt and, if it does not or evidence is denied, the modification |

## Common mistakes

::: mistake Hall of Shame: vouching the litigation list and stopping there
Bunty ticks the two cases on management's list and signs off completeness. **Fix:** the list is where the search starts, not ends. Inquiry, minutes, correspondence with counsel and the legal expense accounts are how unlisted claims are found.
:::

::: mistake Calling every claim a contingent liability
A claim with a probable outflow and a reliable estimate is a **provision**, recorded in the books; disclosing it only as a contingent liability understates liabilities. **Fix:** ask the three recognition questions first; only what fails them is disclosed, and then only if not remote.
:::

::: mistake Disclosing the remote ones "to be safe"
**Fix:** AS 29 requires disclosure unless the possibility of outflow is remote. A remote claim is left out; the auditor's work is to check that "remote" is supported by the expert's assessment.
:::

::: mistake Putting capital commitments under contingent liabilities
**Fix:** contracts remaining to be executed on capital account and uncalled liability on partly paid shares are **commitments**, a separate head in the same Schedule III note.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Kanpur Kettles Ltd has guaranteed a ₹4 crore bank loan taken by its associate, which is repaying every instalment on time. The company's notes are silent on the guarantee. Which of the following is correct?
- [ ] A provision of ₹4 crore should be recognised
- [x] It should be disclosed as a contingent liability under "Guarantees"
- [ ] It should be disclosed under commitments as "Other commitments"
- [ ] No disclosure is required because the associate is not in default
> Any outflow depends on a future event outside the company's control (the associate's default) and is not probable, so no provision; Schedule III lists guarantees as a class of contingent liability, to be disclosed.

Q: Which of the following is NOT one of the procedures SA 501 requires to identify litigation and claims?
- [ ] Inquiry of management and others within the entity, including in-house legal counsel
- [ ] Reviewing minutes of meetings of those charged with governance and correspondence with external legal counsel
- [ ] Reviewing legal expense accounts
- [x] Obtaining a list of cases filed against the entity from the court registry
> SA 501 names the first three. Direct communication with external counsel follows when a risk of material misstatement is assessed.

Q: Raipur Rolls Ltd's register at 31 March 2026 (₹ lakh): an income-tax demand under appeal, 80 (outflow possible); a customer's claim, 25 (outflow probable, reliably estimated at 25); a vendor's disputed claim, 15 (outflow possible); a capital contract still to be executed, 60; a claim of 40 that counsel considers remote. What amount (₹ lakh) goes under "Claims against the company not acknowledged as debt"?
= 95
> 80 + 15 = 95. The customer's claim is a provision, the capital contract a commitment, and the remote claim is not disclosed.

Q: Kesar wants the note to say "There are no contingent liabilities". Which statement is correct?
- [ ] The note is a negative statement, so the auditor has nothing to verify
- [x] It is an expressed negative assertion, and the auditor must obtain evidence that no contingent liabilities exist
- [ ] Such a note is prohibited by Schedule III
- [ ] A written representation from Kesar alone is sufficient evidence for it
> "No contingent liability" is an expressed negative assertion (SM 4.27). The search procedures apply in full; a representation supplements them but never replaces them.

Q: For each class of contingent liability (outflow not remote), which particulars does AS 29 require, where practicable? Select all that apply.
- [x] An estimate of its financial effect
- [x] An indication of the uncertainties relating to any outflow
- [x] The possibility of any reimbursement
- [ ] The carrying amount at the beginning and end of the period
> The carrying amount at the beginning and end of the period belongs to the disclosure for each class of provision. A contingent liability gets a brief description of its nature plus the three particulars.
:::

## Recap

- Contingent liability: a possible obligation that uncertain future events outside the entity's control will confirm, or a present obligation not recognised (outflow not probable, or not reliably measurable).
- Present obligation, probable outflow, reliable estimate: provision. Possible: disclose. Remote: nothing.
- Procedures: list against the ledger, agreements and claims, management's working, the expert's report (probable, possible, remote), SA 500 evaluation, written representation.
- SA 501 search: inquiry (including in-house counsel), minutes and correspondence with external counsel, legal expense accounts; then a letter of inquiry to external counsel, with management's permission.
- Refusal of permission and no alternative evidence: modify the opinion under SA 705.
- Schedule III: claims not acknowledged as debt; guarantees; other money contingently liable. Commitments: capital contracts, uncalled liability on partly paid shares, others.
- AS 29, each class: nature, and where practicable the financial effect, uncertainties and reimbursement; if impracticable, say so. ("Nothing has happened yet" is exactly when the note is needed.)

## Flashcards

Q:: What is a contingent liability?
A:: (i) A possible obligation arising from past events whose existence will be confirmed only by uncertain future events not wholly within the entity's control; or (ii) a present obligation from past events not recognised because an outflow is not probable or the amount cannot be measured with sufficient reliability.

Q:: When is a provision recognised?
A:: When there is a present obligation (legal or constructive) from a past event, an outflow of resources embodying economic benefits is probable, and a reliable estimate can be made of the amount.

Q:: When is a contingent liability not disclosed at all?
A:: When the possibility of any outflow in settlement is remote.

Q:: State the Study Material's audit procedures for provisions and contingent liabilities, in order.
A:: List of provisions compared with the ledger; inspect agreements (warranty commitments) and legal and other claims; obtain management's working and basis; obtain the expert's report (actuary; legal expert: probable, possible or remote) and verify its assumptions; evaluate the management's expert under SA 500; obtain a written representation that all required provisions are made.

Q:: SA 500: what does the auditor evaluate about a management's expert?
A:: Competence, capabilities and objectivity; an understanding of the expert's work (assumptions, methods, data); the appropriateness of the work as audit evidence (reasonableness of findings, relevance, completeness and accuracy of source data).

Q:: SA 501: the three procedures to identify litigation and claims?
A:: Inquiry of management and others within the entity, including in-house legal counsel; reviewing minutes of meetings of those charged with governance and correspondence with external legal counsel; reviewing legal expense accounts.

Q:: SA 501: what does a letter of specific inquiry include?
A:: A list of litigation and claims; where available, management's assessment of each outcome and its estimate of the financial implications, including costs; a request that counsel confirm the reasonableness of the assessments and add information if the list is incomplete or incorrect.

Q:: SA 501: what if management refuses permission to communicate with external counsel?
A:: If the auditor cannot obtain sufficient appropriate audit evidence by alternative procedures, the auditor shall modify the opinion in accordance with SA 705.

Q:: Schedule III: how are contingent liabilities classified?
A:: Claims against the company not acknowledged as debt; guarantees; other money for which the company is contingently liable.

Q:: Schedule III: how are commitments classified?
A:: Estimated amount of contracts remaining to be executed on capital account and not provided for; uncalled liability on shares and other investments partly paid; other commitments (specify nature).

Q:: AS 29: what is disclosed for each class of contingent liability?
A:: Unless the outflow is remote: a brief description of its nature and, where practicable, an estimate of its financial effect, an indication of the uncertainties relating to any outflow, and the possibility of any reimbursement; if not practicable, that fact is stated.
