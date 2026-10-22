---
id: aud.evid.trail
title: Audit trail
minutes: 15
needs: aud.evid.sa500
tags: audit trail, edit log, audit logs, accounting software, Rule 11, authentication of transactions
labs:
summary: What an audit trail (edit log) is, why entities and auditors value it, what it costs, and what the company auditor reports on accounting software with an audit trail feature under Rule 11.
---

## In plain words

### Who changed the discount at 11:52 pm?

On the night of 31 March, a sales voucher for a bulk order of Tapri premix shows a discount of ₹48,000. Bunty finds it while testing cut-off.

> **Bunty:** Ma'am, the bill says ₹4,800 discount, but the books say ₹48,000. Maybe a typing mistake?
> **Lakshmi:** Ask the software, not the people. Open the edit log.
> **Bunty:** *(scrolling)* Edited at 11:52 pm by a sales executive... and approved by the same login three minutes later.
> **Lakshmi:** Now it is not a typing mistake. It is a question with a name and a time on it.

That edit log is an **audit trail**: a step-by-step record that traces an entry in the books back to the bill it came from, with every change on the way: who, when, and what. For the entity it is a control: it discourages fraud and errors and shows who did what when something goes wrong. For the auditor it is evidence: did the controls actually work, and was the person who entered or approved a transaction allowed to?

A company's auditor also reports whether its accounting software has such a feature, whether it worked all year for all transactions, was not tampered with, and was preserved.

::: analogy The CCTV over the cash counter
A shop's CCTV does not stop a cashier pocketing a note, but everyone behaves better knowing it records, and when the till is short the owner can rewind and see who opened the drawer at 9:14. Recordings take storage and someone has to watch them, so smart shops use software that flags the odd moments. An auditor trusts a shop with working, untouched recordings more than one whose camera was "off for repairs" last week.
:::

::: key
An audit trail is a documented flow of a transaction from the source document to the financial statements, with a record of system and user activity. It reduces fraud, material errors and unauthorised use, helps fix responsibility and rebuild events, and lets the auditor verify whether controls operated effectively and transactions were performed by authorised persons, which increases the reliability of audit evidence.
:::

## How it works

### 1. What an audit trail is

::: definition Audit trail
An audit trail is a documented flow of a transaction. It is used to investigate how a source document was translated into an account entry and from there inserted into the financial statements of an entity. It is used as audit evidence to establish authentication and integrity of a transaction (SM 4.27–4.28).
:::

It is a step-by-step record by which accounting, trade details or other financial data can be traced to their source, and it is used to verify and track many types of transactions, including accounting and financial transactions. Audit trails also maintain a record of **system and user activity**: in banks, for example, an audit trail keeps track of log-on activity, recording log-on attempts and the device used (SM 4.28).

::: diagram Tracing a transaction both ways
{"type": "flow", "w": 420, "gapY": 64, "nodes": [{"id": "s", "kind": "start", "label": "Source document\n(bill, invoice)"}, {"id": "e", "kind": "process", "label": "Account entry\n(voucher)"}, {"id": "l", "kind": "process", "label": "Ledger account"}, {"id": "f", "kind": "end", "label": "Financial statements"}], "edges": [["s", "e", "recorded"], ["e", "l", "posted"], ["l", "f", "reported"], ["f", "s", "traced back"]], "caption": "The audit trail shows how a source document became an account entry and then a figure in the financial statements, and lets the auditor trace a figure back to its source, with every change logged on the way (SM 4.27–4.28)."}
:::

### 2. Why an entity keeps one

Audit trails (or **audit logs**) act as record-keepers that document evidence of certain events, procedures or operations, because their purpose is ==to reduce fraud, material errors, and unauthorized use== (SM 4.28). They:

- help to **enhance internal controls and data security**;
- help in **fixing responsibility**, for example by tracking the activities of users;
- help in **rebuilding events** when a problem occurs, and in thorough analysis of problem areas: audit trail analysis can specify the reason for the problem;
- help in ensuring the **operation of the system as intended**, and so help entities in their regular system operations (SM 4.28).

**The cost.** Audit trails involve costs: not only system expenditure but also the time involved in analysing the data they make available. Automated tools can be used to analyse the large volume of data thrown up by audit trails (SM 4.28; [[aud.risk.digital|digital audit and data analytics]]).

### 3. Why the auditor values one

Systems which have a feature of audit trail ==inspire confidence in auditors== (SM 4.28). An audit trail:

1. helps the auditor verify whether the **controls devised by management were operating effectively** or not;
2. aids in verifying whether a transaction was indeed **performed by a person authorised** to do it;
3. enhances data security and can be used by the auditor while performing audit procedures, thus **increasing the reliability of audit evidence** obtained (SM 4.28; [[aud.evid.sa500|SA 500]]).

The opposite case shows its value: for internal controls that **leave no audit trail**, the auditor must rely on inquiries about, and observation of, the controls, for example to determine who actually performs each function and not merely who is supposed to perform it (SM 3.53; [[aud.risk.testing|testing internal control]]).

### 4. What the company auditor reports

Under section 143(3)(j) of the Companies Act, 2013, the auditor's report states the other matters prescribed in Rule 11 of the Companies (Audit and Auditors) Rules, 2014. One of them is (SM 8.72; illustrative report at SM 8.33):

> Whether the company has used such accounting software for maintaining its books of account which has a feature of recording audit trail (edit log) facility and the same has been operated throughout the year for all transactions recorded in the software and the audit trail feature has not been tampered with and the audit trail has been preserved by the company as per the statutory requirements for record retention.

Where any of the matters required to be included in the audit report is answered in the negative or with a qualification, the report shall state the reasons for it, in terms of section 143(4) (SM 8.72). The report on Rule 11 matters is covered with the other section 143 matters in [[aud.report.companies|company auditor's reporting]].

::: diagram The four questions behind the Rule 11 audit-trail line
{"type": "flow", "w": 420, "nodes": [{"id": "q1", "kind": "decision", "label": "Software has an audit\ntrail (edit log) facility?"}, {"id": "q2", "kind": "decision", "label": "Operated all year,\nall transactions?"}, {"id": "q3", "kind": "decision", "label": "Feature not\ntampered with?"}, {"id": "q4", "kind": "decision", "label": "Trail preserved as\nper retention rules?"}, {"id": "ok", "kind": "end", "label": "Report in the affirmative", "color": "ok"}, {"id": "n1", "kind": "end", "label": "Negative, with\nreasons", "color": "bad"}, {"id": "n2", "kind": "end", "label": "Negative, with\nreasons", "color": "bad"}, {"id": "n3", "kind": "end", "label": "Negative, with\nreasons", "color": "bad"}, {"id": "n4", "kind": "end", "label": "Negative, with\nreasons", "color": "bad"}], "edges": [["q1", "n1", "no"], ["q1", "q2", "yes"], ["q2", "n2", "no"], ["q2", "q3", "yes"], ["q3", "n3", "no"], ["q3", "q4", "yes"], ["q4", "n4", "no"], ["q4", "ok", "yes"]], "caption": "Green: all four limbs satisfied; rose: any limb fails, and the report states the reasons (section 143(4); SM 8.72)."}
:::

::: warning Version-sensitive
The wording above is the Study Material's (SM 8.72), which lists this matter last among the Rule 11 matters; ICAI's November 2023 paper cites it as Rule 11(g). The Study Material gives only the reporting requirement: it does not set out which entities must keep their books in such software, or the retention period for the trail. Verify against the Study Material and Statutory Update for your attempt.
:::

## Worked examples

:::: example The edit log of 2025-26
Tapri's policy requires discounts above ₹10,000 to be approved by a regional manager, and no voucher of a financial year to be altered after the books are closed on 30 April. While auditing Tapri's 2025-26 financial statements, Iyer & Associates obtain the following extract from the edit log of Tapri's accounting software (the login cafe.mgr17 belongs to a café manager):

| When (2026) | User | Action | Voucher: change |
|---|---|---|---|
| 12 Feb, 10:05 | it.admin | Trail switched off | – |
| 15 Feb, 18:40 | it.admin | Trail switched on | – |
| 31 Mar, 22:14 | sales.exec9 | Edited | SV-90457: discount ₹6,200 → ₹62,000 |
| 31 Mar, 22:20 | cafe.mgr17 | Approved | SV-90457 |
| 6 May, 11:20 | acc.head | Edited | JV-7741 dated 28 Mar: ₹2,10,000 → ₹1,20,000 |

Required:

(i) What does the extract tell the auditor, and how should the auditor use it?

(ii) How does it affect the auditor's report under Rule 11 of the Companies (Audit and Auditors) Rules, 2014?

::: answer Model answer
**(i) Relevant provision.** An audit trail is a documented flow of a transaction, used as audit evidence to establish the authentication and integrity of a transaction; it helps in fixing responsibility and rebuilding events. It helps the auditor verify whether controls devised by management were operating effectively, and whether a transaction was performed by a person authorised to do it.

**Facts and analysis.**

1. **SV-90457**: on the last evening of the year, a discount was raised to ten times the amount on the bill (₹6,200 to ₹62,000) and approved six minutes later by a café manager, although the policy requires a regional manager's approval for discounts above ₹10,000. The transaction was not approved by a person authorised to do it, so the approval control did not operate; the trail fixes responsibility on the logins sales.exec9 (edit) and cafe.mgr17 (approval).
2. **JV-7741**: a voucher dated 28 March 2026 was altered on 6 May 2026, after the books were closed on 30 April, contrary to the policy. The trail shows who altered it and by how much (₹90,000).
3. **12 to 15 February 2026**: the audit trail was switched off for 3 days, 8 hours and 35 minutes. Changes made in that period are not logged at all.

**Conclusion.** The auditor should rebuild the events from the trail: obtain the original bill and the reasons for the discount on SV-90457, and the reasons and approval for altering JV-7741; treat the failed controls as deficiencies and reconsider reliance on the related controls; and perform additional procedures on the transactions recorded between 12 and 15 February, for which no edit log exists. Significant findings are communicated to management and those charged with governance.

**(ii) Relevant provision.** The auditor's report shall state whether the company has used accounting software with an audit trail (edit log) facility, operated throughout the year for all transactions, not tampered with, and preserved as per the statutory requirements for record retention. Where a matter is answered in the negative or with a qualification, the report shall state the reasons (section 143(4)).

**Conclusion.** The feature was not operated throughout the year: it was switched off from 12 February 2026 10:05 to 15 February 2026 18:40. The auditor cannot report in the affirmative on that limb, and should report the matter, stating the period and the reasons. Whether the switching-off also amounts to tampering with the feature is a further question for the auditor's evaluation.
:::
::::

:::: example Kesar's cost-cutting memo
Kesar sends Tapri's IT head a memo with three instructions on the edit log of the accounting software:

1. Switch the edit log off for the three festival weeks every year, when the servers are busiest.
2. Every April, delete the logs that are more than twelve months old, "since nobody reads them".
3. Stop the IT team's weekly review of the logs, which takes two people a full day.

> **Kesar:** Storage costs money, people cost money. Sab adjust ho jayega.

Advise Kesar on each instruction, with reference to the purpose and cost of audit trails and to the auditor's reporting under Rule 11 of the Companies (Audit and Auditors) Rules, 2014.

::: answer Model answer
**Relevant provision.** Audit trails act as record-keepers whose purpose is to reduce fraud, material errors and unauthorised use; they enhance internal controls and data security, help fix responsibility, rebuild events and ensure that the system operates as intended. They involve costs, not only of system expenditure but also of the time involved in analysing the data they make available; automated tools can be used to analyse the large volume of data thrown up by audit trails. The auditor's report states whether the company has used accounting software with an audit trail (edit log) facility, operated throughout the year for all transactions recorded in the software, not tampered with, and preserved as per the statutory requirements for record retention; a negative or qualified answer states the reasons (section 143(4)).

**Analysis.**

1. **Switching off in festival weeks.** These are the weeks of the highest volumes and the most discounts, when unauthorised changes are most likely to go unnoticed. The facility would not be operated throughout the year for all transactions, and the auditor could not report in the affirmative on that limb.
2. **Deleting old logs.** The trail must be preserved as per the statutory requirements for record retention, whatever Kesar's view of who reads it; the retention period comes from those requirements, not from management's convenience. Deleted logs have not been preserved, and the auditor's report would say so, with reasons.
3. **Stopping the review.** The time spent analysing the data is a cost the Study Material recognises; its answer is automated tools that analyse the volume and flag unusual changes, not abandoning the review, without which the trail can neither fix responsibility nor rebuild events in time.

**Conclusion.** Kesar should withdraw instructions 1 and 2 and replace the manual weekly review with automated analysis of the logs. Capacity problems are solved with servers and tools, not by switching off a control.
:::
::::

## Exam angle

::: exam Where the audit trail appeared
Audit trail was asked directly in 5 of the ICAI documents read for this lesson; several more use the phrase "controls which leave no audit trail" in tests-of-controls answers (for example, September 2024 Q2(a)).

- **Reporting, 3 to 5 marks.** The Rule 11 reporting requirements for software with an audit trail (edit log) facility: November 2023 (old scheme) Q2(d), 3 marks; the suggested answer lists the facility and its three limbs (operated throughout the year for all transactions, not tampered with, preserved). An auditor wanting software that tracks user activity and changes to entries: what is he looking for, and what does he report? MTP November 2023 Series II (old scheme) Q3(d), 3 marks. The Rule 11 matters other than the intermediaries representations: September 2026 Q3(a), 5 marks (answers not yet published); RTP November 2023 (old scheme) carried the full Rule 11 list as a Study Material update.
- **Multiple choice, 2 marks.** Are audit trails useful only for auditors, and must an LLP keep its accounts in software with an audit trail? MTP January 2025 Series I MCQ 7: ICAI's key is that audit trails are useful for businesses as well as auditors, and that keeping accounts in such software is not compulsory for LLPs.
- **In the Study Material**, Test Your Knowledge asks for the advantages of the feature for auditors (SM 4.125).
:::

::: exam How the marks are earned
For "advantages for the auditor", write the three SM points (controls operating effectively; transaction performed by an authorised person; reliability of evidence) after the definition. For the reporting question, quote the Rule 11 line and split it into its limbs. In a case, name the feature ("audit trail (edit log)") before reporting on it.
:::

## Answer frame

### "Discuss the advantages of an audit trail feature for the auditor"

1. **Definition**: a documented flow of a transaction, from the source document to the account entry to the financial statements; audit evidence of authentication and integrity.
2. **For the entity**: reduces fraud, material errors and unauthorised use; enhances internal control and data security; fixes responsibility; rebuilds events.
3. **For the auditor**: inspires confidence; verifies whether controls operated effectively; whether a transaction was performed by an authorised person; increases the reliability of evidence.
4. **Cost, and the answer to it**: system expenditure and analysis time; automated tools.

### "What are the reporting requirements?"

Software with an audit trail (edit log) facility, and: (1) operated throughout the year for all transactions; (2) feature not tampered with; (3) trail preserved as per statutory record retention requirements. A negative or qualified answer states the reasons (section 143(4)).

## Common mistakes

::: mistake Hall of Shame: "the audit trail is the auditor's working papers"
Confusing the entity's audit trail with [[aud.doc.sa230|audit documentation]]. **Fix:** the audit trail is a record kept in the entity's system of how transactions flowed and who changed what; audit documentation is the auditor's own record of procedures, evidence and conclusions.
:::

::: mistake Reporting only "the software has an audit trail"
**Fix:** the Rule 11 line has more limbs: operated throughout the year for all transactions, not tampered with, and preserved as per record retention requirements. A feature that exists but was switched off for a week fails the "operated throughout the year for all transactions" limb.
:::

::: mistake "Audit trails are only for auditors"
**Fix:** their purpose is the entity's: reducing fraud, material errors and unauthorised use, enhancing internal control and data security, fixing responsibility and rebuilding events. The auditor benefits as a user of that evidence.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. CA Ira Menon audits Bhopal Biscuit Works Ltd. Its accounting software records every change to sales and purchase vouchers with the user and the time, all year, and the feature was never tampered with and the logs are preserved. The IT team, however, never enabled the feature for journal vouchers, which are also recorded in the software. Which statement is correct for her report under Rule 11?
- [ ] She reports in the affirmative, because the feature existed and operated all year
- [ ] She reports in the affirmative, because journal vouchers are not transactions with outside parties
- [ ] Rule 11 requires no reporting on accounting software
- [x] She cannot report in the affirmative that the feature operated for all transactions recorded in the software, and must state the reasons
> The line requires the feature to have been operated throughout the year for all transactions recorded in the software; journal vouchers are among them. A negative or qualified answer states the reasons (SM 8.72). Each limb is checked separately: existence, operation for the whole year and all transactions, no tampering, preservation.

Q: Which of the following is NOT a benefit of an audit trail described in the Study Material?
- [ ] Helping fix responsibility by tracking the activities of users
- [ ] Rebuilding events when a problem occurs
- [x] Removing the need for the auditor to test internal controls
- [ ] Helping verify whether a transaction was performed by an authorised person
> An audit trail helps the auditor test whether controls operated effectively; it does not replace the testing.

Q: According to the Study Material, an audit trail is used as audit evidence to establish:
- [ ] the valuation and allocation of every asset
- [x] the authentication and integrity of a transaction
- [ ] the going concern status of the entity
- [ ] the independence of the auditor
> SM 4.28: "used as audit evidence to establish authentication and integrity of a transaction".

Q: For a control that leaves no audit trail, such as who actually counts the café cash at closing, the auditor's test of control is mainly:
- [ ] Inspection of the edit log
- [x] Inquiry about, and observation of, the control
- [ ] External confirmation from the bank
- [ ] Recalculation of the cash book totals
> SM 3.53: controls that leave no audit trail are tested by inquiry and observation, to find who actually performs each function.
:::

## Recap

- Audit trail: a documented flow of a transaction, from source document to account entry to financial statements; audit evidence of the authentication and integrity of a transaction.
- It is also a record of system and user activity (in banks, log-on attempts and the device used).
- Purpose: to reduce fraud, material errors and unauthorised use; it enhances internal control and data security, fixes responsibility, rebuilds events and shows whether the system operates as intended.
- Cost: system expenditure and analysis time; automated tools analyse the volume.
- For the auditor: confidence; checks whether controls operated effectively and whether transactions were performed by authorised persons; more reliable evidence.
- Rule 11 reporting: software with an audit trail (edit log) facility, operated throughout the year for all transactions, not tampered with, preserved as per retention requirements; reasons for any negative answer (section 143(4)).
- Controls that leave no audit trail are tested by inquiry and observation. (A camera "off for repairs" is itself a finding.)

## Flashcards

Q:: What is an audit trail, as per the Study Material?
A:: A documented flow of a transaction, used to investigate how a source document was translated into an account entry and from there into the financial statements; used as audit evidence to establish the authentication and integrity of a transaction.

Q:: What is the purpose of audit trails (audit logs)?
A:: To reduce fraud, material errors and unauthorised use, by documenting evidence of events, procedures or operations.

Q:: How do audit trails help an entity?
A:: They enhance internal controls and data security, fix responsibility, rebuild events and analyse problem areas, and help ensure the system operates as intended.

Q:: What costs do audit trails involve, and how are they reduced?
A:: System expenditure and the time to analyse their data; automated tools can analyse the large volumes of data.

Q:: How does an audit trail help the auditor?
A:: It helps verify whether controls devised by management operated effectively and whether a transaction was performed by an authorised person, and increases the reliability of audit evidence.

Q:: Rule 11: what does the auditor report about accounting software and the audit trail?
A:: Whether the company used software with an audit trail (edit log) facility, operated throughout the year for all transactions, not tampered with, and preserved as per statutory record retention requirements.

Q:: What must the auditor's report contain if a Rule 11 matter is answered in the negative?
A:: The reasons for the negative or qualified answer, in terms of section 143(4).

Q:: How does the auditor test a control that leaves no audit trail?
A:: By inquiry about, and observation of, the control, to determine who actually performs each function and not merely who is supposed to.
