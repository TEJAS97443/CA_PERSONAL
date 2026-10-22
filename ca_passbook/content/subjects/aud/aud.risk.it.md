---
id: aud.risk.it
title: Internal control in an IT environment
minutes: 24
needs: aud.risk.ic
tags: automated environment, general IT controls, application controls, IT-dependent controls, IT risks, manual and automated controls, ERP
labs:
summary: What changes when the books live in an ERP: the IT risks, the three types of control (general IT, application and IT-dependent), when manual controls still suit better, and the audit approach.
---

## In plain words

### "The computer does everything now"

Tapri has moved its accounts, inventory, billing and payroll onto one integrated ERP, joined to the delivery app. Kesar is delighted.

> **Kesar:** Lakshmi-ji, now the computer does everything. No human, no error. Audit khatam in two days?
> **Lakshmi:** A computer repeats a mistake perfectly, Kesar-ji. Ten lakh times before lunch.
> **Bunty:** And if somebody changes the program?
> **Lakshmi:** Then all ten lakh entries are wrong in exactly the same way.

An **automated environment** is a business where processes, operations, accounting and even decisions run on computer systems. It is faster, more accurate and handles huge volumes, but it brings its own risks: wrong processing, people getting into data they should not touch, someone editing the database directly, a "super user" who can change anything, an untested program change, or data simply lost.

So the auditor looks for three kinds of control. **General IT controls** are the IT department's rules that protect every system at once: running the data centre and backups, controlling program changes, controlling who gets access, and developing systems properly. **Application controls** are checks built into each business application: a mandatory field, an invoice-number sequence check, a credit limit. **IT-dependent controls** are people acting on system reports, like a manager chasing the overdue debtors on an ERP printout. The last two can be trusted only if the general IT controls work.

::: analogy The railway
The signalling system, track maintenance and the rule that only certified engineers may change the timetable software protect every train: those are general IT controls. Each train's automatic door lock and speed governor are application controls. The station master who reads the departure board the system prints and then waves the green flag performs an IT-dependent control. If the signalling is faulty, nothing a train does automatically can be trusted, and the station master is reading the wrong board.
:::

::: key
Automated application controls and IT-dependent controls are effective and reliable only if general IT controls are effective. When IT risks are not mitigated, the auditor cannot rely on system data or automated controls, and must test more, not less.
:::

## How it works

### 1. The automated environment

An automated environment is a business environment where the processes, operations, accounting and even decisions are carried out using computer systems, also known as Information Systems (IS) or Information Technology (IT) systems. Its fundamental principle is to carry out business with less manual intervention and more system-driven processing (SM 3.54). Key features (SM 3.54):

- enables faster business operation;
- accuracy in data processing and computation;
- ability to process large volumes of transactions;
- integration amongst business operations;
- better security and controls;
- less prone to human errors;
- provides latest information; and
- connectivity and networking capability.

**More automation, more complexity.** The complexity of a business environment depends on its level of automation: the more automated, the more complex it is likely to be. A company using an integrated ERP (SAP, Oracle) is considered more complex to audit than one using off-the-shelf accounting software (SM 3.54).

### 2. Understanding and documenting it

The auditor is required to understand the entity and its business, **including IT**: how the IT department is organised, IT activities, IT dependencies, and the relevant risks and controls. Points to consider (SM 3.55):

1. information systems being used (one or more application systems, and what they are);
2. their purpose (financial and non-financial);
3. location of IT systems: local or global;
4. architecture: desktop based, client-server, web application, cloud based;
5. version (functions and risks can vary between versions of the same application);
6. interfaces within systems, where multiple systems exist;
7. in-house or packaged;
8. outsourced activities (IT maintenance and support); and
9. key persons (CIO, CISO, administrators).

The understanding obtained should be **documented** (SM 3.55).

### 3. The audit approach in an automated environment

The Study Material sets out the audit in four stages (SM 3.61):

::: diagram Audit approach in an automated environment (SM 3.61)
{"type": "flow", "w": 420, "nodes": [{"id": "a", "kind": "start", "label": "1. Risk assessment"}, {"id": "b", "kind": "process", "label": "2. Understand\nand evaluate"}, {"id": "c", "kind": "process", "label": "3. Test for operating\neffectiveness"}, {"id": "d", "kind": "end", "label": "4. Reporting"}], "edges": [["a", "b"], ["b", "c"], ["c", "d"]], "caption": "What the auditor does at each stage is in the two tables below."}
:::

| Stage one: risk assessment | Stage two: understand and evaluate |
|---|---|
| Identify significant accounts and disclosures | Document the business processes using flowcharts or narratives |
| Qualitative and quantitative considerations | Prepare risk and control matrices (RCM) |
| Relevant financial statement assertions (FSA) | Understand the design of controls by walkthroughs of the end-to-end process |
| Identify likely sources of misstatement | Process-wide considerations: entity level controls, segregation of duties |
| Consider the risk arising from use of IT systems | IT general controls and application controls |

| Stage three: test for operating effectiveness | Stage four: reporting |
|---|---|
| Assess the nature, timing and extent (NTE) of controls testing | Evaluate control deficiencies |
| Assess the reliability of source data; completeness of population | Significant deficiencies, material weaknesses |
| Test key reports and spreadsheets | Remediation of control weaknesses |
| Sample testing | Internal controls memo (ICM) or management letter |
| Consider the competence and independence of the staff performing controls testing | Auditor's report |

How the tests are done and how findings are reported are explained in [[aud.risk.testing|testing internal control]].

### 4. Risks arising from the use of IT systems

Having understood the systems, the auditor considers the risks that arise from their use (SM 3.55–3.56):

1. inaccurate processing of data, processing inaccurate data, or both;
2. unauthorised access to data;
3. direct data changes (backend changes);
4. excessive access or privileged access (super users);
5. lack of adequate segregation of duties;
6. unauthorised changes to systems or programs;
7. failure to make necessary changes to systems or programs; and
8. loss of data.

### 5. If those risks are not mitigated

::: diagram Unmitigated IT risks: three impacts on the audit (SM 3.56)
{"type": "tree", "gapX": 30, "root": {"label": "IT risks not\nmitigated", "children": [{"label": "Substantive:\nmore detailed\nchecking", "color": "d"}, {"label": "Controls:\nno reliance on\nautomated ones", "color": "d"}, {"label": "Reporting:\nreport may be\nmodified", "color": "d"}]}, "caption": "Each impact means more audit work or a different report; the third arises from the regulatory requirement to report on internal financial controls of companies."}
:::

- **Impact on substantive checking.** Data obtained from the systems cannot be relied on, so all information, data and reports have to be tested thoroughly for **completeness and accuracy**: increased substantive (detailed) checking.
- **Impact on controls.** No reliance on automated controls, system calculations and accounting procedures built into applications; additional audit work.
- **Impact on reporting.** Because of the regulatory requirements on [[aud.evid.ifc|internal financial controls]] for companies, it may lead to modification of the auditor's report in some instances (SM 3.56).

### 6. Three types of control

Controls in an automated environment are (SM 3.56): **(A) general IT controls, (B) application controls and (C) IT-dependent controls.**

#### (A) General IT controls

::: definition General IT controls
Policies and procedures that relate to many applications and support the effective functioning of application controls (SM 3.56).
:::

They are implemented to mitigate IT-specific risks and applied commonly across multiple IT systems, applications and business processes; hence they are known as ==pervasive or indirect controls== (SM 3.57). They commonly include controls over four areas (SM 3.57–3.58):

| Area | Objective: to ensure that | Includes |
|---|---|---|
| (a) Data centre and network operations | production systems are processed to meet financial reporting objectives | Managing computer operations, scheduling and running batch jobs, monitoring, storing and retaining backups, performance monitoring, BCP and DRP |
| (b) Program change | modified systems continue to meet financial reporting objectives | Change management process; recording, managing and tracking change requests; making and testing changes |
| (c) Access security | access to programs and data is authenticated and authorised to meet financial reporting objectives | Security organisation and management, security policies and procedures, application, data, operating system, network and physical security |
| (d) Application system acquisition, development and maintenance | systems are developed, configured and implemented to meet financial reporting objectives | Management of development, project initiation, analysis and design, construction, testing and quality assurance |

BCP is the business continuity plan and DRP the disaster recovery plan, which deal with recovery from failures (SM 3.57).

#### (B) Application controls

Application controls include both **automated and manual** controls that operate at a **business process level**. Automated application controls are embedded in IT applications such as ERPs and help ensure the **completeness, accuracy and integrity** of data in those systems. Examples: edit checks and validation of input data, sequence number checks, user limit checks, reasonableness checks, and mandatory data fields (SM 3.58).

#### (C) IT-dependent controls

These are basically **manual controls that use data, information or a report produced by IT systems**. Although performed manually, their design and effectiveness depend on the **reliability of the source data**. Because of this inherent dependency on IT, the effectiveness and reliability of automated application controls and IT-dependent controls **require the general IT controls to be effective** (SM 3.58).

::: diagram How the three types depend on each other
{"type": "nest", "w": 420, "root": {"title": "General IT controls", "note": "pervasive, indirect", "mono": false, "lines": ["data centre and network operations", "program change", "access security", "system acquisition and development"], "color": "a", "children": [{"title": "Application controls", "note": "in each application", "mono": false, "lines": ["edit checks, sequence checks", "limit and reasonableness checks"], "color": "b"}, {"title": "IT-dependent controls", "note": "manual, on system data", "mono": false, "lines": ["a person acting on a system report"], "color": "c"}]}, "caption": "The inner boxes rely on the outer one: general IT controls are needed to support the functioning of application controls, and both are needed for complete and accurate information processing (SM 3.58)."}
:::

**General IT controls vs application controls** (SM 3.58): the two categories are **interrelated**. General IT controls are needed to support the functioning of application controls, and both are needed to ensure complete and accurate information processing through IT systems.

### 7. Testing in an automated environment, in brief

The four audit tests (inquiry, observation, inspection, reperformance), the walkthrough of one end-to-end transaction, observing a user under different scenarios and inspecting an application's configuration are in [[aud.risk.testing|testing internal control]] (SM 3.58–3.59). Two IT-specific points:

- Where general IT controls are **not existing, or existing but ineffective**, the auditor assesses the impact of IT risks and the complexity of the automated environment and **plans alternative audit procedures** in order to rely on system-based information (SM 3.59).
- Because of the inherent consistency of IT processing, determining that an automated control has been implemented may serve as a test of its operating effectiveness, depending on the auditor's assessment and testing of controls such as those over program changes (SM 3.41).

### 8. Manual and automated elements

An entity's internal control contains manual elements and often automated ones; their characteristics matter to the risk assessment. Controls in a **manual system** include approvals and reviews of transactions, and reconciliations and follow-up of reconciling items; with automated procedures, electronic records replace paper documents. Controls in **IT systems** combine automated controls (embedded in computer programs) and manual controls, which may be independent of IT, may use information produced by IT, or may be limited to monitoring IT and automated controls and handling exceptions (SM 3.59–3.60).

**Manual elements may be more suitable** where judgment and discretion are required, such as (SM 3.60):

- large, unusual or non-recurring transactions;
- circumstances where errors are difficult to define, anticipate or predict;
- changing circumstances that require a control response outside the scope of an existing automated control; and
- monitoring the effectiveness of automated controls.

**Manual elements may be less suitable** for (SM 3.60):

- high volume or recurring transactions, or situations where errors that can be anticipated or predicted can be prevented, or detected and corrected, by automated control parameters; and
- control activities where the specific ways to perform the control can be adequately designed and automated.

Manual elements may be **less reliable** than automated ones: they can be more easily bypassed, ignored or overridden and are more prone to simple errors and mistakes, so their consistency of application cannot be assumed. The entity responds to the risks from IT or from manual elements by establishing effective controls suited to its information system (SM 3.60–3.61).

## Worked examples

:::: example One credit limit, three controls
Tapri enforces its distributors' credit limits in three ways:

(a) The ERP blocks any sales order that would take a distributor above the credit limit recorded in the customer master.

(b) Every Monday, the credit manager reviews an ERP report of distributors above 90% of their limit and telephones each one before further supplies are released.

(c) For the Diwali season, the regional head approves on paper, case by case, orders above the limit for 14 festival distributors, after reading each distributor's signed financial statements and payment record in its physical file.

During the walkthrough, Bunty finds that the ERP's nightly batch job, which posts the day's invoices and receipts to distributor balances, failed on 11 nights in March 2026, and that nobody reviews the batch log.

Required:

(i) Identify the type of control in (a), (b) and (c), and the area of general IT control in which Bunty's finding falls.

(ii) Explain how the types of control are related, and what Bunty's finding means for the auditor's reliance on each of (a), (b) and (c).

::: answer Model answer
**(i) Types.** Controls in an automated environment are categorised as general IT controls, application controls and IT-dependent controls.

| Control | Type | Why |
|---|---|---|
| (a) Order block | Application control (automated) | A limit check embedded in the ERP at the business process level |
| (b) Monday review | IT-dependent control | A manual control using a report produced by the IT system |
| (c) Diwali approvals | Manual control, independent of IT | A judgment on each case, using paper records |
| Bunty's finding | General IT control: data centre and network operations | Scheduling and running batch jobs, and monitoring them |

Control (c) is the kind of situation in which manual elements may be more suitable: changing circumstances that need a control response outside the scope of the existing automated control, where judgment and discretion are required.

**(ii) Relationship and reliance.** General IT controls are policies and procedures that relate to many applications and support the effective functioning of application controls; the two are interrelated, and both are needed to ensure complete and accurate information processing. IT-dependent controls, though performed manually, depend on the reliability of the source data, so the effectiveness of automated application controls and IT-dependent controls requires the general IT controls to be effective.

- *Control (a)*: the block compares each order with a balance that, on 11 nights, was not updated. The control may have operated exactly as programmed against incomplete data, so the auditor cannot rely on it for March without alternative procedures.
- *Control (b)*: the report the credit manager reviewed was drawn from the same balances, so its completeness and accuracy, and therefore the review, cannot be relied on either.
- *Control (c)*: it does not use the ERP balances. Its reliability depends on how it was performed, so the auditor tests it directly, for example by inspecting the 14 approvals and the files behind them. Being manual, it can be more easily bypassed or overridden, and its consistency of application cannot be assumed.

Where general IT controls are ineffective, the auditor assesses the impact of the IT risks and plans alternative audit procedures. Here that includes testing the completeness and accuracy of the receivables balances for March directly (more substantive checking), and evaluating the batch-monitoring failure as a control deficiency for reporting.
:::
::::

:::: example When the foundation cracks
For 2025-26, Iyer & Associates planned to rely on two things in Tapri's ERP: the automated three-way match of purchase order, goods received note and supplier invoice before payment, and the system-generated inventory ageing used to provide for slow-moving stock. During the walkthrough, Bunty finds that the ERP vendor's support engineer has a permanent administrator login, which he used on 2 April 2026 to edit 31 March stock quantities directly in the database "so that a report would balance", and that two changes to the purchase module were moved into the live system without testing.

Advise Iyer & Associates on the risks involved, their impact on the audit and the course of action.

::: answer Model answer
**Relevant provision.** Risks arising from the use of IT systems include unauthorised access to data, direct data changes, excessive access, and unauthorised changes to systems or programs. General IT controls, such as access security and program change, support the effective functioning of application controls, and the effectiveness and reliability of automated application controls and IT-dependent controls require general IT controls to be effective. If IT risks are not mitigated, data from the systems cannot be relied on and must be tested thoroughly for completeness and accuracy (increased substantive checking); automated controls, system calculations and accounting procedures cannot be relied on; and, given the reporting requirements on internal financial controls, the auditor's report may be modified. Where general IT controls are not existing or are ineffective, the auditor assesses the impact of IT risks and the complexity of the automated environment and plans alternative audit procedures to rely on system-based information.

**Facts and analysis.** Risks from the list have materialised: excessive or privileged access (a permanent administrator login held by an outsider), which gave unauthorised access to data and allowed a direct data change to year-end stock quantities; and changes to the purchase module moved into the live system without testing, by-passing the change management process. Access security has failed, and so has program change control, whose objective is to ensure that modified systems continue to meet financial reporting objectives. The three-way match is an automated application control and the inventory ageing is a system report used for an IT-dependent control: neither can be relied on while these general IT controls are ineffective.

**Conclusion.** Iyer & Associates should not rely on the automated three-way match; instead they should extend substantive procedures over purchases and payments, for example by vouching a larger sample of payments to purchase orders, goods received notes and invoices. They should test the inventory ageing report for completeness and accuracy before using it, or rebuild it independently from transaction data, and test the year-end stock quantities directly, starting with the edits of 2 April. The deficiencies should be communicated to management and, if significant, in writing to those charged with governance, and their effect on the auditor's reporting on internal financial controls considered.
:::
::::

:::: example The land deal and the "fully digital" board
Kesar wants Tapri to "go fully digital": the ERP should approve every payment that meets policy limits, and the board's manual review should be scrapped, including for the ₹42 crore purchase of land for a new factory near Pithampur. Comment, with reference to manual and automated elements of internal control.

::: answer Model answer
**Relevant provision.** Manual elements in internal control may be more suitable where judgment and discretion are required, such as for large, unusual or non-recurring transactions; where errors are difficult to define, anticipate or predict; in changing circumstances requiring a control response outside an existing automated control; and in monitoring the effectiveness of automated controls. Manual elements may be less suitable for high volume or recurring transactions, where predictable errors can be prevented, or detected and corrected, by automated control parameters.

**Analysis.** Tapri's daily café sales and routine supplier payments are high-volume and recurring: automated controls suit them. The land purchase is large, unusual and non-recurring, and its terms call for judgment about value, title and approvals that an automated limit check cannot exercise.

**Conclusion.** Kesar's plan is not appropriate in full. Routine transactions may be controlled by automated controls, but the land purchase should remain subject to manual review and approval by the board, and someone must still manually monitor whether the automated controls are working.
:::
::::

## Under the hood

### Old knowledge, new places

- **Previous audits.** The effectiveness of general IT controls is one of the matters the auditor considers in deciding whether to use evidence about controls from earlier audits (SM 3.68–3.69; [[aud.risk.sa330|SA 330]]).
- **Banks.** In a computerised environment, the bank's auditor must be satisfied that the RBI norms are built into the system that generates classification, provisioning and income recognition data, and must not assume that system-generated information is correct without evidence (SM 10.8–10.9; [[aud.bank.approach|bank audit approach]]).
- **Audit trails.** A system's audit trail helps the auditor verify whether controls devised by management operated effectively and whether a transaction was performed by a person authorised to do it (SM 4.28); see [[aud.evid.trail|audit trail]].
- **Analytics.** Using the client's electronic data to test whole sets of transactions is [[aud.risk.digital|digital audit and data analytics]].

## Exam angle

::: exam What ICAI asked, May 2024 to September 2026
In the 9 new-scheme ICAI documents read for this lesson, the topic was examined 9 times.

- **Types of control, 3 or 4 marks.** Mention the types of control and classify access security, sequence number checks, data centre and network operations and mandatory data fields: May 2025 Q1(b), 4 marks. Classify reasonableness checks, data centre and network operations, application system acquisition, development and maintenance, and program change controls: MTP May 2024 Series I Q6(d), 3 marks.
- **General IT controls in depth.** Objectives and activities of access security and program change: RTP May 2025 Q11. A control "to ensure that production systems are processed to meet financial reporting objectives" is a data centre and network operations control, not an application control: January 2025 MCQ 5.
- **The automated environment.** How to understand and evaluate it after a shift to a fully automated ERP: January 2026 Q3(c), 4 marks (the answer lists the nine points of SM 3.55 and the "understand and evaluate" column of SM 3.61). Testing methods, and the course of action where general IT controls are ineffective: MTP May 2026 Series II Q6(c), 4 marks.
- **Manual elements.** When are manual elements more suitable? May 2024 Q3(c), 3 marks.
- **Impact of IT risks.** In what ways IT-related risks can affect the audit: RTP May 2024 Q6 (the answer gives the three impacts, on substantive checking, controls and reporting).
- **MCQ.** Unauthorised access to an inventory system by production supervisors indicates control risk: MTP January 2026 Series II MCQ 11.

In the old scheme, the impact of unmitigated IT risks on the audit was asked in November 2020 Q3(d), 3 marks. The Study Material's own MCQs test the same points: automation makes the business environment more complex; "processing of large volumes of data" is not an IT risk; validation of input data is not a general IT control (SM 3.79–3.81).
:::

::: exam How the marks are earned
The Suggested Answers to classification questions are a two-column table with one type against each control: name the type precisely ("General IT controls", "Application controls") and, where asked, the area. Descriptive answers reproduce the Study Material's lists in its order: the nine points for understanding the automated environment, the four general IT control areas with their objective ("to ensure that ... to meet financial reporting objectives"), and the manual-element circumstances, opening with "where judgment and discretion are required".
:::

::: trick Spot the general IT control
If a control protects **many applications at once** (backups, data centre, who may change programs, who may log in, how systems are built), it is a **general IT control**. If it sits **inside one application's transaction screen** (a field, a sequence, a limit, a reasonableness range), it is an **application control**. If a **person** acts on a **system report**, it is **IT-dependent**. Condition: application controls can also be manual at the business-process level (SM 3.58), so read what the control does, not just who does it.
:::

## Answer frame

### "Discuss the relationship between general IT controls and application controls"

1. **Define general IT controls**: policies and procedures relating to many applications that support the effective functioning of application controls; pervasive or indirect; four areas.
2. **Define application controls**: automated or manual at the business process level; embedded in applications; completeness, accuracy, integrity; examples.
3. **The relationship**: interrelated; general IT controls are needed to support application controls; both needed for complete and accurate processing.
4. **Consequence**: if general IT controls fail, application controls and IT-dependent controls cannot be relied on.

### "How would you understand and evaluate the automated environment?"

| Part | What to write |
|---|---|
| Requirement | Understand the entity and its business, including IT: IT organisation, activities, dependencies, risks, controls |
| Points | The nine points: systems used, purpose, location, architecture, version, interfaces, in-house or packaged, outsourcing, key persons |
| Evaluate | Flowcharts or narratives, RCM, walkthroughs, entity level controls and segregation of duties, general IT and application controls |
| Close | Document the understanding |

## Common mistakes

::: mistake Hall of Shame: the computer that cannot err
Writing that an automated environment is simpler and needs less audit work. **Fix:** the more automated the environment, the more complex it is likely to be (SM 3.54, 3.79), and if IT risks are not mitigated the auditor does more substantive checking, not less (SM 3.56).
:::

::: mistake Calling an input validation a general IT control
**Fix:** edit checks and validation of input data are application controls; general IT controls are the four pervasive areas (SM 3.57–3.58). ICAI's own MCQ uses exactly this trap (SM 3.80).
:::

::: mistake Forgetting that IT-dependent controls depend on IT
A manager's review of a system report is "manual", so Bunty ignores IT. **Fix:** its effectiveness depends on the reliability of the source data and so on effective general IT controls (SM 3.58).
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Ojas Foods Ltd bills through an integrated ERP. CA Sneha finds that any of its 40 sales staff can edit the ERP's discount master, and that the edits are not logged. The company asks her to rely on the ERP's automated check that blocks any invoice with a discount above the master's limit. Which of the following is correct?
- [ ] She can rely on the check, since automated controls operate consistently
- [x] She should not rely on it while access security over the master is ineffective; she should plan alternative procedures and increase substantive checking of discounts
- [ ] She should rely on it, because application controls do not depend on general IT controls
- [ ] She should issue a disclaimer of opinion at once
> Access security is a general IT control, and automated application controls require general IT controls to be effective (SM 3.58): a limit check is only as good as the limit anyone can change. With them ineffective, the auditor plans alternative procedures (SM 3.59) and increases substantive checking (SM 3.56). Nothing yet points to a disclaimer.

Q: Case scenario. In Tapri's ERP review, Bunty lists four findings. Which single finding would most likely prevent the auditor from relying on all of Tapri's automated application controls at once?
- [ ] The café billing module does not flag invoice numbers out of sequence
- [ ] The purchase screen lets a user save an order without a delivery date
- [ ] The threshold of one reasonableness check on daily sales is set too high
- [x] Any of the six programmers can move an untested change into the live ERP
> Program change is a general IT control: general IT controls relate to many applications and support the effective functioning of application controls, which is why they are called pervasive (SM 3.56–3.57). A weakness there undermines every automated control the changes could touch. The other three are weaknesses in single application controls (sequence check, mandatory field, reasonableness check) and affect only their own area.

Q: Which statement about manual elements of internal control is correct?
- [ ] They are more reliable than automated elements because humans use judgment
- [x] They may be more suitable for large, unusual or non-recurring transactions
- [ ] They are most suitable for high-volume recurring transactions
- [ ] Their consistency of application can be assumed
> Manual elements suit judgment and discretion; they are less reliable because they can be bypassed, ignored or overridden, and their consistency cannot be assumed (SM 3.60).

Q: Select all the risks arising from the use of IT systems, as the Study Material lists them, that these facts at Tapri show: the Pune café manager, who left in January, still logs in to the ERP; the ERP's tax table was not updated when a GST rate changed; and the IT head can create a vendor, approve its invoices and release its payments.
- [x] Unauthorised access to data
- [x] Failure to make necessary changes to systems or programs
- [x] Lack of adequate segregation of duties
- [ ] Loss of data
- [ ] Direct data changes (backend changes)
> A leaver's live login is unauthorised access; the unchanged tax table is a failure to make necessary changes; one person creating, approving and paying vendors is a lack of segregation of duties (SM 3.55–3.56). Nothing in the facts shows data being lost or edited directly in the database.

Q: Tapri's IT head tells Lakshmi: "Our change board approves and tests every change before it goes live, so our access security is strong." Which of the following is correct?
- [ ] He is right: approving changes is part of access security
- [ ] He is right, provided every change request is also logged
- [x] He has described program change controls; access security is meant to ensure that access to programs and data is authenticated and authorised
- [ ] He has described an application control, since changes are made to applications
> Program change controls ensure that modified systems continue to meet financial reporting objectives, through the change management process and making and testing changes; access security ensures that access to programs and data is authenticated and authorised (SM 3.57–3.58). Both are general IT controls, and strength in one says nothing about the other.
:::

## Recap

- Automated environment: business run on IS/IT systems; faster, accurate, high volume, integrated; more automation means more complexity (ERP more complex than off-the-shelf software).
- Understand IT: nine points (systems, purpose, location, architecture, version, interfaces, in-house or packaged, outsourcing, key persons), and document it.
- Eight IT risks: inaccurate processing (or inaccurate data), unauthorised access to data, direct (backend) data changes, excessive or privileged access (super users), lack of segregation of duties, unauthorised program changes, failure to make necessary program changes, loss of data.
- Unmitigated IT risks: more substantive checking, no reliance on automated controls, possibly a modified report (internal financial controls).
- Three types: general IT controls (pervasive or indirect: data centre and network operations, program change, access security, system acquisition, development and maintenance), application controls, IT-dependent controls.
- General IT controls support application controls; both are needed for complete and accurate processing; ineffective general IT controls mean alternative procedures.
- Manual elements suit judgment: large, unusual or non-recurring items, unpredictable errors, changing circumstances, monitoring automated controls.
- (The computer repeats its mistakes perfectly; the auditor's job is to find out whether anyone can change the program.)

## Flashcards

Q:: What is an automated environment?
A:: A business environment where the processes, operations, accounting and even decisions are carried out using computer systems (Information Systems or IT systems).

Q:: Does more automation make the business environment simpler or more complex?
A:: More complex: the complexity depends on the level of automation. An integrated ERP is more complex to audit than off-the-shelf accounting software.

Q:: Name the three types of control in an automated environment.
A:: General IT controls, application controls and IT-dependent controls.

Q:: Define general IT controls and name their four areas.
A:: Policies and procedures that relate to many applications and support the effective functioning of application controls. Areas: data centre and network operations; program change; access security; application system acquisition, development and maintenance.

Q:: Why are general IT controls called "pervasive" or "indirect" controls?
A:: Because they mitigate IT-specific risks and are applied commonly across multiple IT systems, applications and business processes.

Q:: Objective of access security controls?
A:: To ensure that access to programs and data is authenticated and authorised to meet financial reporting objectives.

Q:: Give the Study Material's examples of automated application controls.
A:: Edit checks and validation of input data, sequence number checks, user limit checks, reasonableness checks and mandatory data fields.

Q:: What are IT-dependent controls, and what do they depend on?
A:: Manual controls that use data, information or reports produced by IT systems; their effectiveness depends on the reliability of the source data, and so on effective general IT controls.

Q:: How can unmitigated IT risks affect the audit?
A:: Increased substantive checking (data tested for completeness and accuracy), no reliance on automated controls (additional work), and possible modification of the auditor's report given the internal financial controls requirements.

Q:: When may manual elements of internal control be more suitable?
A:: Where judgment and discretion are required: large, unusual or non-recurring transactions; errors difficult to define, anticipate or predict; changing circumstances outside an existing automated control; monitoring the effectiveness of automated controls.

Q:: General IT controls are ineffective. What should the auditor do?
A:: Assess the impact of IT risks and the complexity of the automated environment, and plan alternative audit procedures in order to rely on system-based information.
