---
id: aud.bank.approach
title: Bank accounting system and audit approach
minutes: 28
needs: aud.plan.sa300, aud.risk.sa315, aud.risk.it
tags: bank audit, core banking solution, RBI, audit plan, engagement team discussion, risk management process, Banking Regulation Act
labs:
summary: Why a bank audit is different, what the auditor must check in a core banking system, the four bases of the audit plan, the six control questions, the team discussion and the stages of conducting a bank audit.
---

## In plain words

### Iyer & Associates go to the bank

Iyer & Associates have audited Tapri Tea Co. Ltd for years. This year they are also appointed statutory branch auditors of the Indore Main Branch of **Narmada Bank of India**, a nationalised bank, the same branch where Tapri keeps its current account.

> **Bunty:** Ma'am, a bank audit is the easiest audit in the world. The system prints the NPA list, the provisions and the interest. I just tick.
> **Lakshmi:** And who checked that the system knows the RBI's rules?
> **Bunty:** The RBI?
> **Lakshmi:** We do, Bunty. Evidence first, ticks later.

A bank lives on a simple sum. It accepts deposits and pays interest on them; it lends that money at a higher rate. The gap, the **spread**, pays salaries and rent and leaves the profit. The loans it gives, called **advances**, are its biggest asset, and a loan that stops earning is a **non-performing asset** (NPA).

What makes a bank audit special is scale and machinery: lakhs of transactions a day, branches across the country, dozens of products, almost everything run on one central computer system, the **Core Banking Solution** (CBS), and a strict regulator, the Reserve Bank of India (RBI), watching all of it.

So the auditor does three things before ticking anything. First, check that the system has the RBI's rules built into it, because the system decides which loans are NPAs, what provision they need and how much interest is income. Second, plan the audit around the bank's risks and controls. Third, sit the whole team down to discuss where errors and fraud could hide.

::: analogy One recipe, forty cities
Tapri's kulhad cafés in 40 cities all brew from one recipe that Indore uploads to every machine. If the recipe says 3 spoons of sugar instead of 1, every cup in every city is wrong in the same way, and tasting one cup in Bhopal will not tell you why. So a careful inspector reads the recipe first, then tastes a few cups to see that the machines follow it. A bank's CBS is that recipe: the auditor checks the settings first, then re-works a sample by hand.
:::

::: key
In a bank, the system produces the numbers that matter most: asset classification, provisions and interest income. The auditor must obtain evidence that the RBI's norms are built into that system, never assume that system-generated information is correct, and plan the audit around the bank's risks and controls.
:::

## How it works

### 1. Banks and their regulator

India has six kinds of banking institutions (SM 10.4–10.5):

| Type | What sets it apart |
|---|---|
| Commercial banks | Most widespread; two main functions: accepting deposits and granting advances |
| Regional Rural Banks (RRBs) | Set up in rural areas to serve rural communities' basic banking needs |
| Co-operative banks | Work like commercial banks, but on co-operative principles, under the State or Multi-State Co-operative Societies Act |
| Payments banks | Accept restricted deposits; cannot issue loans and credit cards |
| Development banks | Fund infrastructure for growth ("term-lending institutions"), e.g. IFCI, IDBI, SIDBI |
| Small finance banks | Basic banking for the unserved and unorganised: small and marginal farmers, small and micro units |

The **RBI**, India's central bank, regulates the banking industry. It is responsible for (SM 10.5): the development and supervision of the Indian financial system (banks and non-banking financial institutions); determining, with the Central Government, the monetary and credit policies; and regulating the activities of commercial and other banks. Its functions include issuing currency and regulating its issue, and acting as banker to the Central and State Governments and to commercial and other banks, including term-lending institutions. **No bank can commence banking business or open new branches without a licence from the RBI**, and the RBI can inspect any bank (SM 10.6).

**Banking operations are conducted only at the branches.** The other offices are controlling or administrative offices: they lay down policies, systems and internal control procedures, fix delegation of powers, responsibility and accountability, and supervise, monitor and control the branches' business, dealing with deviations from the bank's procedures (SM 10.6).

**Peculiarities of banking** that shape the audit (SM 10.7):

1. Huge volumes and complexity of transactions.
2. Wide geographical spread of the banks' network.
3. Large range of products and services offered.
4. Extensive use of technology.
5. Strict vigilance by the banking regulator.

### 2. The accounting system: what the auditor must not assume

Banks run on Core Banking Solution platforms, so that customers can bank anytime and anywhere, with their data stored on the bank's servers. With such volumes, the bank must ensure that the recording, transmission and storage of data keep their integrity, and that controls keep the data free of errors, omissions, irregularities and frauds (SM 10.8).

For the auditor, the Study Material sets three duties in a computerised environment (SM 10.8–10.9):

::: steps
1. **Be familiar with and satisfied** that all the norms and parameters of the latest applicable RBI guidelines are incorporated and built into the system that generates information bearing on **classification, provisions and income recognition**.
2. **Do not assume** that system-generated information is correct and can be relied on, without evidence that it is based on the required parameters.
3. **Use professional skepticism and prudence**: wherever something needs to be performed manually to check the authenticity and consistency of the system's information, perform it, and **document** the results.
:::

::: diagram Relying on a system-generated report
{"type": "flow", "w": 420, "nodes": [{"id": "s", "kind": "start", "label": "System report:\nNPAs, provisions, interest"}, {"id": "p", "kind": "process", "label": "Understand the\nparameters built in"}, {"id": "d1", "kind": "decision", "label": "Match the latest\nRBI norms?"}, {"id": "x", "kind": "end", "label": "Do not rely;\nre-work it", "color": "bad"}, {"id": "m", "kind": "process", "label": "Re-work a sample\nmanually"}, {"id": "d2", "kind": "decision", "label": "Results agree\nwith the system?"}, {"id": "e", "kind": "end", "label": "Extend checks;\nfind the error", "color": "warn"}, {"id": "r", "kind": "end", "label": "Rely, and\ndocument", "color": "ok"}], "edges": [["s", "p"], ["p", "d1"], ["d1", "x", "no"], ["d1", "m", "yes"], ["m", "d2"], ["d2", "e", "no"], ["d2", "r", "yes"]], "caption": "Green: the system's information can be used, with the manual checks documented; amber: differences found, so the checks are extended to find the cause; rose: the parameters do not match the RBI norms, so the auditor works out the classification, provision or income independently and considers the effect on the report."}
:::

### 3. The form of a bank's financial statements

Sub-sections (1) and (2) of **section 29 of the Banking Regulation Act, 1949** deal with the form and content of a banking company's financial statements and their authentication; they also apply to **nationalised banks, the State Bank of India and Regional Rural Banks**. Every banking company prepares its Balance Sheet and Profit and Loss Account in the forms set out in the **Third Schedule** to the Act, or as near thereto as circumstances admit: **Form A** is the Balance Sheet and **Form B** the Profit and Loss Account (SM 10.11). It also complies with the Accounting Standards specified under section 133 of the Companies Act, 2013, read with Rule 7 of the Companies (Accounts) Rules, 2014, in so far as they apply to banking companies (SM 10.12). The Form B items are in [[aud.bank.revenue|audit of revenue items in banks]].

The **income recognition policy** should be objective and based on the record of recovery rather than on subjective considerations: income from an NPA is not accrued but booked only when actually received (SM 10.11).

### 4. The bank audit approach

The Study Material's "bank audit approach" has three parts (SM 10.9–10.11).

**(1) Drawing an audit plan.** An audit plan should be drawn up based on:

- the nature and level of operations,
- the nature of adverse features,
- the level of compliance based on previous reports, and
- audit risks based on inadequacy in or breach of internal controls and the familiarisation exercise carried out.

**(2) Control environment at the bank.** A bank should have appropriate controls to mitigate its risks, including ==effective segregation of duties (particularly, between front and back offices)==, accurate measurement and reporting of positions, verification and approval of transactions, reconciliation of positions and results, setting up limits, reporting and approval of exceptions, physical security and contingency planning. For any control activity, the auditor keeps six questions in mind (SM 10.9–10.10):

| Question | What the auditor asks |
|---|---|
| Who | Who performs the control? Has that person the knowledge and authority to perform it? |
| What | What evidence shows that the control is performed? |
| When | When, and how often, is it performed? Is that often enough to prevent, detect and correct risks of material misstatement? |
| Where | Where is the evidence of performance kept, for how long, and is it available for audit? |
| Why | Why is the control performed? What errors does it prevent or detect? |
| How | How is it performed, and what are its activities? Can they be bypassed, and would a bypass be detected? How, and how fast, are exceptions resolved? |

**(3) Engagement team discussions.** All personnel performing an engagement, including any experts contracted by the firm for it, are the **engagement team**. The team should hold discussions to gain a better understanding of the bank and its environment, including internal control, and to assess the potential for material misstatement of the financial statements; the discussions are documented. The partner and the team discuss the **susceptibility of the bank's branch financial statements to material misstatement**, ordinarily at the planning stage.

::: definition Matters ordinarily discussed by the engagement team (SM 10.10–10.11)
(a) errors that may be more likely to occur; (b) errors identified in prior years; (c) the method by which fraud might be perpetrated by bank personnel or others within particular account balances and/or disclosures; (d) audit responses to engagement risk, pervasive risks and specific risks; (e) the need to maintain professional skepticism throughout the engagement; (f) the need to be alert for information or conditions indicating that a material misstatement may have occurred (for example, the bank's application of accounting policies in the given facts and circumstances).
:::

**Advantages of the discussion** (SM 10.11): it puts specific emphasis on the susceptibility of the financial statements to material misstatement due to fraud, so the team can plan a response to fraud risks, including those related to engagement, pervasive and specific risks; it enables the partner to delegate the work to experienced team members and to set the procedures to follow when fraud is identified; and the partner may review the need to involve specialists on fraud issues.

### 5. Conducting the audit, stage by stage

The audit of a bank or its branches runs through these stages (SM 10.15–10.21). The picture groups them; the list keeps the Study Material's numbering.

::: diagram The stages of a bank audit, grouped
{"type": "layers", "layers": [{"label": "Before you start", "note": "indebtedness, internal work, terms", "right": "1 (i)–(viii)"}, {"label": "Understand the bank", "note": "controls, accounts, risk process", "right": "1 (ix), 2–5"}, {"label": "Plan as a team", "note": "discussion, strategy, plan, materiality", "right": "6–10"}, {"label": "Assess the risks", "note": "going concern, fraud, outsourcing", "right": "11–14"}, {"label": "Respond", "note": "SA 330, stress testing, Basel III", "right": "15–17"}, {"label": "Read other reports", "note": "inspection and audit reports", "right": "18"}], "caption": "Top to bottom: the order in which a bank audit is built; the right-hand column gives the Study Material's stage numbers."}
:::

1. **Initial consideration by the statutory auditor**:
   - (i) **Declaration of indebtedness**: before appointing their statutory central or branch auditors, banks obtain a declaration of indebtedness; indebtedness means owing money to the bank in any case whatsoever.
   - (ii) **Internal assignments**: an audit firm should not undertake the statutory audit while it is associated with internal assignments in the bank during the same year, like concurrent audits (internal audit conducted monthly). Both are in [[aud.bank.auditor|the bank auditor's appointment]].
   - (iii) **Planning**: SA 300 requires, before an initial audit, the SA 220 procedures on accepting the client relationship and the engagement, and an understanding of the terms of engagement under SA 210.
   - (iv) **Communication with the previous auditor** in writing, under Clause (8) of Part I of the First Schedule to the Chartered Accountants Act, 1949, to know whether there is any objection.
   - (v) **Terms of audit engagement** agreed under SA 210 before significant fieldwork, and documented.
   - (vi) **Initial engagements**: SA 510 procedures on opening balances; misstatements that materially affect the current period and are not properly accounted for and disclosed lead to a qualified or an adverse opinion.
   - (vii) **Assessment of engagement risk**, before acceptance, because it affects the decision to accept and the planning.
   - (viii) **Establish the engagement team**: qualified and experienced people; size and composition depend on the size, nature and complexity of the bank's operations.
   - (ix) **Understanding the bank and its environment** under SA 315.
2. **Identifying and assessing the risks of material misstatement** at the financial statement level and the assertion level (SA 315).
3. **Understanding the bank and its environment, including internal control**, to identify and assess risk and to develop an audit plan that determines the operating effectiveness of controls and addresses specific risks.
4. **Understanding the bank's accounting process**, which produces information for management and contributes to internal control.
5. **Understanding the risk management process** (see the definition below).
6. **Engagement team discussions** (part 4 above).
7. **Establish the overall audit strategy** (SA 300) before the audit begins, involving key team members and specialists.
8. **Develop the audit plan** (SA 300), involving all key members of the team.
9. **Audit planning memorandum**, summarising the plan: the expected scope and extent of procedures; the significant issues and risks identified, and the decisions on reliance on controls; and evidence that the engagement was planned appropriately and responds to engagement, pervasive and specific risks.
10. **Determine audit materiality**, considering its relationship with audit risk: a matter of professional judgement, depending on the knowledge of the bank, the engagement risk and the reporting requirements.
11. **Consider going concern**: events and conditions that may cast significant doubt on the bank's ability to continue as a going concern.
12. **Assess the risk of fraud, including money laundering** (SA 240), with professional skepticism; the RBI's "Know Your Customer" and anti-money-laundering guidelines require banks to have policies, procedures and controls to deter, recognise and report money laundering.
13. **Assess specific risks**: risks of material misstatement at the financial statement level, which relate pervasively to the financial statements as a whole and potentially affect many assertions.
14. **Risk associated with outsourcing of activities**: banks outsource heavily to cut costs and use outside experts, and must manage the risks this brings.
15. **Response to the assessed risks** (SA 330): overall responses at the financial statement level; further procedures whose nature, timing and extent respond to the assessed risks at the assertion level.
16. **Stress testing**: the RBI requires every commercial bank to put in place a Board-approved stress testing framework that suits it and integrates into its risk management systems.
17. **Basel III framework**: the international banking regulations of the Basel Committee on Banking Supervision, which, among other things, propose minimum criteria for instruments to count as regulatory capital.
18. **Reliance on, and review of, other reports** (see below).

::: definition An effective risk management system in a bank requires (SM 10.17–10.18)
(a) **Oversight and involvement by those charged with governance**: the Board of Directors/Managing Director approve written risk management policies, consistent with the bank's objectives and strategies, capital strength, management expertise, regulatory requirements and the types and amounts of risk it accepts. (b) **Identification, measurement and monitoring of risks** against pre-approved limits and criteria. (c) **Control activities**: segregation of duties (particularly between front and back offices), measurement and reporting of positions, verification and approval of transactions, reconciliations, limits, exception reporting, physical security and contingency planning. (d) **Monitoring activities**: risk models, methods and assumptions regularly assessed and updated, possibly by an independent risk management unit. (e) **Reliable information systems** giving timely and consistent financial, operational and compliance information that is easily understood.
:::

**Reports to review (stage 18).** The auditor takes into account the adverse comments, if any, on advances in (SM 10.21):

1. previous year's audit reports;
2. latest internal inspection reports of bank officials;
3. the Reserve Bank's latest inspection report;
4. concurrent / internal audit reports;
5. the report on verification of security;
6. any other internal reports specially related to particular accounts;
7. the manager's charge-handing-over report when the incumbent is changed.

These are reviewed in detail. The **Statutory Central Auditors** must review the RBI's Annual Financial Inspection report on the bank and ensure that the variations in provisions etc. reported by the RBI have been properly considered by management.

## Worked examples

:::: example The NPA report that was "RBI-compliant"
During the year, Narmada Bank of India moved its branches to an upgraded version of its CBS. At the Indore Main Branch, the system-generated list of non-performing assets as on 31 March 2026 shows 14 accounts, and the system has worked out their provisions and stopped interest on them. Bunty wants to tick the classification against the list: "The IT department's circular says the new version is RBI-compliant." Lakshmi notices that two cash credit accounts with no credits since November are not on the list.

Advise Iyer & Associates on their responsibility regarding the system-generated information and the procedures they should perform.

::: answer Model answer
**Relevant provision.** In a computerised environment, the auditor must be familiar with, and satisfied that, all the norms and parameters of the latest applicable RBI guidelines are incorporated and built into the system that generates information having a bearing on classification, provisions and income recognition. The auditor should not assume that system-generated information is correct and can be relied upon without evidence that it is based on the required parameters, and should use professional skepticism and prudence, perform manually whatever is needed to check the authenticity and consistency of the information, and document the results (SM 10.8–10.9).

**Facts of the case.** The CBS was upgraded during the year; the NPA list, the provisions and the stopping of interest all come from it; the only support is an internal circular; two cash credit accounts without credits since November are missing from the list.

**Analysis.** A circular from the bank's own IT department is not evidence that the parameters match the RBI norms. The two missing accounts suggest that a parameter may not be working, for example the out-of-order test for cash credit accounts. Since classification drives both the provision and the interest income, an error in the parameters would misstate advances, provisions and income across the branch.

**Conclusion.** Iyer & Associates should not rely on the list as it stands. They should:

1. obtain an understanding of the parameters set in the upgraded CBS for classification, provisioning and income recognition, and compare them with the latest RBI norms;
2. re-work the classification manually for a sample of accounts, including the two cash credit accounts and accounts near the thresholds, and compare the results with the system;
3. extend the manual checks if differences appear, and work out the correct classification, provision and income for the accounts affected;
4. document the checks and their results, and report the matter as required.
:::
::::

:::: example Planning the Indore Main Branch audit
Before fieldwork, Lakshmi collects these facts about the branch:

- Advances of ₹840 crore, mostly cash credits to traders and small manufacturers; deposits of ₹1,260 crore.
- Last year's audit report and the concurrent auditor's reports comment on irregular cash credit accounts and on stock statements received late.
- The branch manager changed in December 2025.
- ATM cash replenishment has been outsourced to an agency since July 2025.
- A valuation expert has been contracted by the firm for this engagement.

Required:

(i) On what bases should the audit plan for the branch be drawn up?

(ii) Which reports should the team review before examining the branch's advances?

(iii) Who should attend the engagement team discussion, and what matters should it ordinarily cover?

::: answer Model answer
**(i) Bases of the audit plan.** As per the Study Material, an audit plan should be drawn up based on the nature and level of operations, the nature of adverse features, the level of compliance based on previous reports, and audit risks based on inadequacy in or breach of internal controls and the familiarisation exercise carried out (SM 10.9). Here: a large advances portfolio dominated by cash credits; adverse features on irregular accounts and late stock statements; the compliance shown in last year's audit report and the concurrent audit reports; and the control risks of a change of manager and of outsourced ATM cash handling (an outsourcing risk the bank must manage, SM 10.20).

**(ii) Reports to review.** The auditor should take into account the adverse comments on advances in the previous year's audit reports, the latest internal inspection reports of bank officials, the Reserve Bank's latest inspection report, the concurrent/internal audit reports, the report on verification of security, any other internal reports on particular accounts and, since the incumbent changed in December, the **manager's charge-handing-over report** (SM 10.21).

**(iii) Engagement team discussion.** The engagement team is all personnel performing the engagement, including experts contracted by the firm, so the valuation expert should take part with the partner and the team (SM 10.10). The discussion should ordinarily cover: errors more likely to occur; errors identified in prior years; how fraud might be perpetrated by bank personnel or others within particular balances or disclosures; audit responses to engagement, pervasive and specific risks; the need for professional skepticism throughout; and the need to be alert for conditions indicating a material misstatement. It should be held at the planning stage and documented.
:::
::::

:::: example Lakshmi's six questions
The branch's CBS changes a deposit interest rate only after a second officer approves it on screen (a maker-checker control). Bunty must document his understanding of this control for the audit file.

State the questions he should answer, applying them to this control.

::: answer Model answer
| Question | Applied to the maker-checker control on rate changes |
|---|---|
| Who | Who is the checker? Has that officer the knowledge and the authority (under the delegation of powers) to approve rates? |
| What | What evidence shows the approval: the system log of maker, checker and time? |
| When | Is every change approved before it takes effect, and is that often enough to prevent a wrong rate being applied? |
| Where | Where is the log kept, for how long, and can the auditor access it? |
| Why | What error does it prevent: a wrong rate on deposits, and so a misstatement of interest expense? |
| How | How is it performed? Can one user act as both maker and checker, or can a rate be changed outside this screen? Would such a bypass be detected, and how quickly are exceptions resolved? |

These are the Study Material's questions for control activities (SM 10.9–10.10); the answers decide how much the auditor can rely on the control.
:::
::::

## Under the hood

### The laws a bank answers to

The regulatory framework for banks (SM 10.6–10.7): the Banking Regulation Act, 1949; the State Bank of India Act, 1955; the Companies Act, 2013; the Banking Companies (Acquisition and Transfer of Undertakings) Acts of 1970 and 1980; the Regional Rural Banks Act, 1976; the Information Technology Act, 2000; the Prevention of Money Laundering Act, 2002; the Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act, 2002; the Credit Information Companies Regulation Act, 2005; and the Payment and Settlement Systems Act, 2007. The Reserve Bank of India Act, 1934 also affects banks, because it gives the RBI wide powers to give directions to them.

### Where this links to the general Standards

The bank audit uses the same Standards as any audit: [[aud.plan.sa300|SA 300 planning]] for the strategy, plan and memorandum; [[aud.risk.sa315|SA 315]] for understanding the bank; [[aud.risk.sa330|SA 330]] for the responses; [[aud.risk.it|internal control in an IT environment]] for the CBS. What is special is the content: RBI norms built into the system, the inspection and concurrent audit reports, and the RBI's KYC and anti-money-laundering guidelines.

## Exam angle

::: exam What ICAI asked, May 2024 to September 2026
In the ICAI documents read for this lesson, the bank audit approach was asked in four papers, each time as a 4–5 mark descriptive question built on a short bank scenario:

- **CBS and reliance on controls**: MTP January 2026 Series I Q1(a) (5 marks): a bank whose CBS processes deposits, interest and loans; when tests of controls are needed and what evidence supports reliance.
- **Risk management process**: MTP January 2025 Series II Q3(a) (5 marks): how to evaluate the adequacy of a bank's risk management controls (the five requirements (a) to (e)).
- **Engagement team discussion**: MTP January 2026 Series II Q2(b) (5 marks): a branch audit meeting with a valuation expert; purpose, three matters, two advantages.
- **KYC and going concern**: MTP May 2024 Series I Q3(b) (4 marks): a payments bank barred from new deposits for KYC and money-laundering failures, with an undisclosed material uncertainty.

The chapter's own Test Your Knowledge asks for four peculiarities of banking, the RBI's role, the importance of KYC norms and the engagement team discussion, and has correct/incorrect statements on relying on system-generated information.
:::

::: exam How the marks are earned
Suggested answers reproduce the Study Material's lists in its order and words ("nature and level of operations", "segregation of duties (particularly between front and back offices)", "susceptibility of the bank's branch financial statements to material misstatements"), then apply them in one line each to the scenario. For an "Explain … engagement team discussion" question, the marks sit in three blocks: purpose, matters, advantages.
:::

::: trick Plan on N-A-C-R
The four bases of the audit plan: **N**ature and level of operations, **A**dverse features, **C**ompliance in previous reports, **R**isks from weak or breached internal controls. It works for the audit plan of a bank or a branch; it is not the list for the overall audit strategy under SA 300.
:::

## Answer frame

### "Explain the auditor's approach in a CBS environment"

1. The duty: be familiar with and satisfied that the latest RBI norms and parameters are built into the system generating classification, provisioning and income recognition data.
2. The prohibition: do not assume system-generated information is correct without evidence.
3. The method: professional skepticism and prudence; manual checks of authenticity and consistency; documentation of the results.
4. Applied to the facts, then the conclusion (rely, or do not rely and re-work).

### "Discuss the engagement team discussion in a bank audit"

| Block | Points that earn marks |
|---|---|
| Purpose | Understand the bank and its environment, including internal control; assess the potential for material misstatement; documented; at the planning stage |
| Who | All personnel on the engagement, including experts contracted by the firm, with the engagement partner |
| Matters | (a) to (f): likely errors; prior-year errors; how fraud might be perpetrated; responses to engagement, pervasive and specific risks; professional skepticism; alertness to signs of misstatement |
| Advantages | Emphasis on fraud risk and the response; delegation to experienced members and procedures when fraud is found; need for specialists reviewed |

## Common mistakes

::: mistake Hall of Shame: "the system is RBI-compliant, so I ticked it"
Bunty's tick, bank edition. **Fix:** the Study Material says the opposite: the auditor should not assume system-generated information is correct without evidence that it is based on the required parameters; check the parameters, re-work a sample by hand, document it.
:::

::: mistake Leaving the expert out of the team
Writing that the engagement team discussion is "between the partner and the article assistants". **Fix:** the engagement team is all personnel performing the engagement, including any experts contracted by the firm in connection with it.
:::

::: mistake Mixing up the plan's bases with SA 300's strategy factors
For "on what basis is a bank audit plan drawn up", writing the SA 300 list (characteristics of the engagement, reporting objectives, significant factors). **Fix:** the bank answer is the Study Material's four bases: nature and level of operations, adverse features, compliance in previous reports, internal control risks.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Iyer & Associates are statutory branch auditors of a nationalised bank's Ujjain branch. The branch manager hands Bunty the system-generated list of NPAs and says the software vendor has certified it. Bunty has seen that three overdue term loans are tagged "standard". Which of the following is the most appropriate course?
- [ ] Accept the list, because a vendor certificate is external evidence
- [ ] Accept the list, but mention the three loans in the Long Form Audit Report
- [x] Check the parameters against the latest RBI norms, re-work a sample including the three loans manually, and document the results
- [ ] Reclassify every loan in the branch manually and ignore the system
> The Study Material requires the auditor to be satisfied that the RBI norms are built into the system and not to assume system information is correct without evidence; manual checks are performed where needed and documented. Re-doing everything is not required; a certificate does not show that the parameters work.

Q: Which of the following is NOT one of the bases on which a bank audit plan should be drawn up?
- [ ] The nature and level of operations
- [ ] The level of compliance based on previous reports
- [x] The budgeted targets of deposits and advances set by the bank's head office
- [ ] The nature of adverse features
> The four bases are the nature and level of operations, the nature of adverse features, compliance shown in previous reports, and audit risks from inadequate or breached internal controls. Budget targets are management's business goals.

Q: A branch's new manager took charge on 1 January. Which report specially listed by the Study Material should the auditor review because of this?
- [ ] The stress testing framework
- [x] The manager's charge-handing-over report
- [ ] The Basel III capital report
- [ ] The declaration of indebtedness
> The manager's charge-handing-over report, prepared when the incumbent is changed, is one of the seven reports whose adverse comments on advances the auditor takes into account.

Q: Select all the matters that the engagement team discussion in a bank audit ordinarily includes.
- [x] The method by which fraud might be perpetrated by bank personnel within particular account balances
- [x] Errors which have been identified in prior years
- [ ] The audit fee and the billing schedule for the branch
- [x] The need to maintain professional skepticism throughout the engagement
> The Study Material's six matters are: likely errors, prior-year errors, how fraud might be perpetrated, responses to engagement, pervasive and specific risks, professional skepticism, and alertness to signs of misstatement. Fees are not part of it.

Q: "Payments banks may accept deposits and issue credit cards, but cannot grant loans." Is this statement correct?
- [ ] Correct
- [x] Incorrect: payments banks accept restricted deposits and can issue neither loans nor credit cards
- [ ] Incorrect: payments banks cannot accept any deposits
- [ ] Correct, but only with the RBI's prior approval for each card
> They accept restricted deposits; customers can have current and savings accounts, ATM-cum-debit cards and internet and mobile banking, but payments banks cannot issue loans and credit cards (SM 10.4).
:::

## Recap

- A bank audit is shaped by huge volumes, a wide network, many products, heavy technology and strict RBI vigilance.
- In a CBS environment the auditor must be satisfied that the latest RBI norms are built into the system that generates classification, provisioning and income data; never assume system information is correct; check manually where needed and document.
- Banking operations happen only at branches; controlling offices set policies, delegation and supervision.
- Audit plan bases: nature and level of operations, adverse features, compliance in previous reports, internal control risks.
- Six control questions: who, what, when, where, why, how.
- Engagement team (experts included) discusses six matters at planning: likely errors, prior errors, fraud methods, responses to risks, skepticism, alertness; documented.
- Review the adverse comments on advances in seven reports, including the RBI's inspection report, concurrent audit reports and the manager's charge-handing-over report.
- Financial statements: section 29 of the Banking Regulation Act; Third Schedule Form A (Balance Sheet) and Form B (Profit and Loss Account). (Read the recipe before you taste the chai.)

## Flashcards

Q:: Bank audit: list the five peculiarities of banking operations.
A:: Huge volumes and complexity of transactions; wide geographical spread of the network; large range of products and services; extensive use of technology; strict vigilance by the banking regulator.

Q:: Bank audit: what must the auditor be satisfied about in a computerised (CBS) environment?
A:: That all the norms and parameters of the latest applicable RBI guidelines are built into the system that generates information on classification, provisions and income recognition; system information is not assumed correct without evidence.

Q:: Bank audit: on what four bases is the audit plan drawn up?
A:: The nature and level of operations; the nature of adverse features; the level of compliance based on previous reports; audit risks based on inadequacy in or breach of internal controls and the familiarisation exercise.

Q:: Bank audit: the six questions for a control activity?
A:: Who performs it; what evidence shows it is performed; when and how often; where the evidence is kept (and for how long, and is it accessible); why it is performed; how it is performed (can it be bypassed, and how are exceptions resolved).

Q:: Bank audit: who forms the engagement team?
A:: All personnel performing the engagement, including any experts contracted by the firm in connection with that engagement.

Q:: Bank audit: what matters does the engagement team discussion ordinarily include?
A:: Errors likely to occur; errors identified in prior years; how fraud might be perpetrated; audit responses to engagement, pervasive and specific risks; the need for professional skepticism; alertness to conditions indicating a material misstatement.

Q:: Bank audit: which seven reports' adverse comments on advances should the auditor consider?
A:: Previous year's audit reports; latest internal inspection reports; the RBI's latest inspection report; concurrent/internal audit reports; report on verification of security; other internal reports on particular accounts; the manager's charge-handing-over report.

Q:: Banking Regulation Act: which section and schedule govern the form of a bank's financial statements?
A:: Section 29(1) and (2); the Third Schedule: Form A for the Balance Sheet, Form B for the Profit and Loss Account (also applicable to nationalised banks, SBI and RRBs).

Q:: Bank audit: what are the five requirements of an effective risk management system?
A:: Oversight and involvement by those charged with governance; identification, measurement and monitoring of risks; control activities; monitoring activities; reliable information systems.

Q:: Bank audit: what three purposes does the audit planning memorandum serve?
A:: It describes the expected scope and extent of procedures; highlights the significant issues and risks and the decisions on reliance on controls; and evidences that the audit was planned appropriately and responds to engagement, pervasive and specific risks.
