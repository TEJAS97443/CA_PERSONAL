---
id: aud.evid.sa550
title: SA 550: related parties
minutes: 22
needs: aud.risk.sa315, aud.evid.sa500
tags: SA 550, related parties, related party transactions, control, significant influence, dominant influence
labs:
summary: Who counts as a related party, why some related party transactions carry a higher risk of material misstatement, and what SA 550 asks the auditor to inquire about, understand and inspect.
---

## In plain words

### The family rate

Bunty is testing Tapri Tea Co. Ltd's purchases for 2025-26 and finds three things. Tapri buys its chai masala from Mehra Masala Traders, the firm run by Kesar's cousin Pinky, at ₹340 a kilo when other suppliers quote ₹300. Chai Junction Distributors, run by Kesar's brother-in-law, uses a Tapri warehouse and pays no rent. And Tapri's two subsidiaries borrow from Tapri without any written terms.

> **Bunty:** Ma'am, is this fraud?
> **Lakshmi:** Not by itself, Bunty. Families do business. The question is whether the accounts tell the reader who the family is and what the deals were.
> **Kesar:** Pinky is family. The family rate is a gesture of love.
> **Lakshmi:** Then the notes to accounts will be a love letter, Kesar-ji. With amounts.

A **related party** is someone close enough to the entity to bend its decisions, or to have its decisions bent for them: a person or entity that controls or significantly influences the entity, an entity the entity itself controls or influences, or one under common control with it. **Related party transactions** are the deals between them.

Most such deals are ordinary business and carry no more risk than any other. But some are riskier: they may not be at normal market terms (Pinky's ₹40 a kilo extra, or a warehouse for free), they may run through tangled structures, or the accounting system may simply not notice them. The financial statements must identify, account for and disclose them as the reporting framework requires, and the auditor has to find them first.

So the auditor asks management who the related parties are, how they are related and what was done with them; learns what controls management has for identifying and approving such deals; and keeps an eye open for undisclosed relationships while reading documents throughout the audit.

::: analogy The selector's nephew
When a selector's nephew makes the team, nobody assumes he cannot bat. But the scorecard should say who his uncle is, and the committee should check his runs twice. Most such selections are fair. The dangerous ones are those nobody mentions, which is why the first job is to find out who is whose nephew.
:::

::: key
A related party transaction is not wrong in itself. The risk is that it is hidden, or not on normal terms; so the auditor first identifies the relationships, then tests and checks the disclosure of the transactions.
:::

## How it works

### 1. Scope

SA 550, "Related Parties", deals with the auditor's responsibilities regarding related party relationships and transactions when performing an audit of financial statements. Specifically, it applies in relation to risks of material misstatement associated with related party relationships and transactions (SM 4.92).

### 2. Who is a related party

::: definition Related party
A party that is either (SM 4.92):

- (i) a related party as defined in the applicable financial reporting framework; or
- (ii) where the applicable financial reporting framework establishes minimal or no related party requirements:
  - a. a person or other entity that has control or significant influence, directly or indirectly through one or more intermediaries, over the reporting entity;
  - b. another entity over which the reporting entity has control or significant influence, directly or indirectly through one or more intermediaries; or
  - c. another entity that is under common control with the reporting entity through having: (i) common controlling ownership; (ii) owners who are close family members; or (iii) common key management.

However, entities that are under common control by a state (i.e., a national, regional or local government) are not considered related unless they engage in significant transactions or share resources to a significant extent with one another.
:::

::: diagram Route (ii): who is related when the framework is silent
{"type": "tree", "gapX": 14, "gapY": 92, "root": {"label": "Framework minimal\nor silent", "children": [{"label": "a. Controls or\ninfluences\nthe entity", "color": "a"}, {"label": "b. Controlled or\ninfluenced by\nthe entity", "color": "b"}, {"label": "c. Common\ncontrol with\nthe entity", "color": "c"}]}, "caption": "Route (i), the framework's own definition, comes first; this tree applies only where the framework sets minimal or no related party requirements. Under c, common control comes through common controlling ownership, owners who are close family members, or common key management; entities controlled by the same state are not related unless they transact or share resources significantly."}
:::

### 3. Control and significant influence

Many financial reporting frameworks explain that (SM 4.93):

::: definition Control
The power to govern the financial and operating policies of an entity so as to obtain benefits from its activities.
:::

::: definition Significant influence
The power to participate in the financial and operating policy decisions of an entity, but not control over those policies. It may be gained by share ownership, statute or agreement.
:::

The existence of the following relationships may indicate the presence of control or significant influence (SM 4.93):

- (i) direct or indirect equity holdings or other financial interests in the entity;
- (ii) the entity's holdings of direct or indirect equity or other financial interests in other entities;
- (iii) being part of those charged with governance or key management (those members of management who have the authority and responsibility for planning, directing and controlling the activities of the entity);
- (iv) being a close family member of any person referred to in (iii);
- (v) having a significant business relationship with any person referred to in (iii).

### 4. Dominant influence and special-purpose entities

Related parties, by virtue of their ability to exert control or significant influence, may be in a position to exert **dominant influence** over the entity or its management; considering such behaviour is relevant when identifying and assessing the risks of material misstatement due to fraud (SM 4.93). A **special-purpose entity** may be a related party because the entity may in substance control it, even if the entity owns little or none of its equity (SM 4.94).

::: diagram Tapri's related-party map, as Bunty first draws it
{"type": "graph", "w": 380, "h": 330, "r": 34, "nodes": [{"id": "k", "label": "Kesar\n(MD)", "x": 190, "y": 50, "fill": "a"}, {"id": "t", "label": "Tapri", "x": 190, "y": 170, "fill": "c"}, {"id": "m", "label": "Mehra\nMasala", "x": 52, "y": 112, "fill": "mute"}, {"id": "j", "label": "Chai\nJunction", "x": 328, "y": 112, "fill": "mute"}, {"id": "cc", "label": "Tapri\nCold Chain", "x": 80, "y": 280, "fill": "e"}, {"id": "ce", "label": "Chai\nExpress", "x": 300, "y": 280, "fill": "e"}], "edges": [{"from": "k", "to": "t", "label": "key management"}, {"from": "t", "to": "cc", "label": "controls"}, {"from": "t", "to": "ce", "label": "controls"}, {"from": "k", "to": "m", "label": "cousin", "style": "dashed"}, {"from": "k", "to": "j", "label": "brother-in-law", "style": "dashed"}], "caption": "Solid edges: Kesar's place in key management, which may indicate control or significant influence (SM 4.93), and Tapri's control of its two subsidiaries (limb b of the definition). Dashed edges: family links of key management; whether those firms are related parties is decided by the applicable financial reporting framework's definition, so the auditor inquires and finds out rather than assumes either way."}
:::

### 5. Why some related party transactions are riskier

Many related party transactions are in the normal course of business. In such circumstances, they may carry no higher risk of material misstatement of the financial statements than similar transactions with unrelated parties. However, the nature of related party relationships and transactions may, in some circumstances, give rise to higher risks of material misstatement than transactions with unrelated parties. For example (SM 4.94):

- (A) Related parties may operate through an extensive and complex range of relationships and structures, with a corresponding increase in the complexity of related party transactions.
- (B) Information systems may be ineffective at identifying or summarising transactions and outstanding balances between an entity and its related parties.
- (C) Related party transactions may not be conducted under normal market terms and conditions; for example, some related party transactions may be conducted with no exchange of consideration.

### 6. Understanding the entity's related party relationships and transactions

**Inquiries of management.** The auditor shall inquire of management regarding (SM 4.94–4.95):

- (a) the identity of the entity's related parties, including changes from the prior period;
- (b) the nature of the relationships between the entity and these related parties; and
- (c) whether the entity entered into any transactions with these related parties during the period and, if so, the type and purpose of the transactions.

**Understanding controls.** The auditor shall inquire of management and others within the entity, and perform other risk assessment procedures considered appropriate, to obtain an understanding of the controls, if any, that management has established to (SM 4.95):

- (a) identify, account for, and disclose related party relationships and transactions in accordance with the applicable financial reporting framework;
- (b) authorise and approve significant transactions and arrangements with related parties; and
- (c) authorise and approve significant transactions and arrangements outside the normal course of business.

**Staying alert.** During the audit, the auditor should ==maintain alertness for related party information== while reviewing records and documents (SM 4.96). The records listed in section 8 below are where it turns up.

::: diagram What the auditor does about related parties
{"type": "flow", "w": 380, "nodes": [{"id": "s", "kind": "start", "label": "Risk assessment"}, {"id": "i", "kind": "process", "label": "Inquire: identity,\nnature, transactions"}, {"id": "c", "kind": "process", "label": "Understand controls:\nidentify, approve"}, {"id": "a", "kind": "process", "label": "Stay alert: inspect\nrecords and documents"}, {"id": "sr", "kind": "process", "label": "Significant, outside normal\ncourse: a significant risk", "color": "d"}, {"id": "w", "kind": "end", "label": "Written\nrepresentations"}], "edges": [["s", "i"], ["i", "c"], ["c", "a"], ["a", "sr"], ["sr", "w"]], "caption": "The first three steps are SA 550's (SM 4.94–4.96). Significant related party transactions outside the normal course of business are always significant risks under SA 315 (SM 3.42), and SA 580 asks for written representations on related parties (SM 7.37)."}
:::

### 7. Smaller entities

The control environment in smaller entities is likely to be different from larger entities. Those charged with governance may not include an outside member, and the role of governance may be undertaken directly by the owner-manager where no other owner exists. Control activities are likely to be less formal, and there may be no documented processes for dealing with related party relationships and transactions. An owner-manager may mitigate some of the risks, or potentially increase them, through active involvement in all the main aspects of the transactions. For such entities the auditor may obtain the understanding through inquiry of management combined with other procedures, such as observation of management's oversight and review activities, and inspection of available relevant documentation (SM 4.95–4.96).

### 8. Records that reveal related parties

*Reproduce at least ten of these: ICAI asks for the list.* The auditor may inspect the following records or documents that may provide information about related party relationships and transactions (SM 4.96):

1. Entity income tax returns.
2. Information supplied by the entity to regulatory authorities.
3. Shareholder registers to identify the entity's principal shareholders.
4. Statements of conflicts of interest from management and those charged with governance.
5. Records of the entity's investments and those of its pension plans.
6. Contracts and agreements with key management or those charged with governance.
7. Significant contracts and agreements not in the entity's ordinary course of business.
8. Specific invoices and correspondence from the entity's professional advisors.
9. Life insurance policies acquired by the entity.
10. Significant contracts re-negotiated by the entity during the period.
11. Internal auditors' reports.
12. Documents associated with the entity's filings with a securities regulator (e.g., prospectuses).

## Worked examples

:::: example The LLP Tapri says it barely owns
In 2025-26 Tapri contributed ₹5 lakh, 1% of the capital, to Sigdi Ventures LLP; the other 99% was contributed by Kesar's nephew, Arjun Mehra, its designated partner. Sigdi's only business is running Tapri's delivery fleet, and Tapri decides its routes, prices and staffing. Tapri also advanced Sigdi ₹4.50 crore, free of interest and with no repayment date. Kesar says: "We own 1%. Sigdi is not a related party, so Note 38 needs nothing about it."

Required: Advise Iyer & Associates under SA 550 on (i) whether Sigdi Ventures LLP may be a related party of Tapri, and (ii) the inquiries and other procedures they should perform.

::: answer Model answer
**(i) Relevant provision.** As per SA 550, "Related Parties", a related party is a party that is a related party as defined in the applicable financial reporting framework or, where the framework establishes minimal or no requirements, a person or entity that has control or significant influence over the reporting entity, another entity over which the reporting entity has control or significant influence, or another entity under common control with it (SM 4.92). Control is the power to govern the financial and operating policies of an entity so as to obtain benefits from its activities; relationships that may indicate control or significant influence include financial interests in other entities, being part of key management, and being a close family member of key management (SM 4.93). In some circumstances, a special-purpose entity may be a related party because the entity may in substance control it, even if the entity owns little or none of its equity (SM 4.94).

**Facts and analysis.** Tapri owns 1% but decides Sigdi's routes, prices and staffing, which is the power to govern its operating and financial policies, and funds it with ₹4.50 crore; the other 99% belongs to the managing director's nephew. Sigdi may therefore be a related party in substance, and Kesar's 1% test is not decisive. The advance, with no interest and no repayment date, is not on normal market terms: such transactions may give rise to higher risks of material misstatement (SM 4.94). And related parties able to exert dominant influence over the entity or its management are relevant when assessing the risks of material misstatement due to fraud (SM 4.93–4.94).

**(ii) Inquiries and procedures.** Iyer & Associates shall inquire of management regarding the identity of Tapri's related parties, including changes from the prior period; the nature of the relationships; and whether Tapri entered into transactions with them during the period and, if so, their type and purpose (SM 4.94–4.95). They shall also understand the controls management has established to identify, account for and disclose related party relationships and transactions; to authorise and approve significant transactions and arrangements with related parties; and to authorise and approve significant transactions and arrangements outside the normal course of business (SM 4.95). They should inspect the LLP agreement and the advance agreement (significant contracts not in the ordinary course of business), statements of conflicts of interest from management and those charged with governance, the board minutes approving the advance, and information supplied to regulatory authorities, staying alert for related party information throughout the audit (SM 4.96).

**Conclusion.** Kesar's view should not be accepted on the strength of the 1% holding. If the evidence shows that Tapri controls Sigdi in substance, the relationship, the advance and the fleet transactions must be identified, accounted for and disclosed in Note 38 as the framework requires.
:::
::::

:::: example The family rate, in rupees
In 2025-26 Tapri bought 2,00,000 kg of chai masala from Mehra Masala Traders at ₹340 per kg; unrelated suppliers quoted ₹300 per kg for the same grade. Chai Junction Distributors used a Tapri warehouse all year without paying rent; similar warehouses let for ₹2,50,000 a month. Sales to nine distributor LLPs set up by Kesar's relatives are recorded as sales to ordinary customers, because Tapri's ERP has no related party flag. Under the applicable financial reporting framework, Mehra Masala Traders, Chai Junction Distributors and the nine LLPs are related parties of Tapri. Overall materiality is ₹1.50 crore.

Required:

(i) Compute how far the masala purchases and the warehouse arrangement depart from market terms.

(ii) Comment on Bunty's view that "₹1.10 crore is below materiality, so nothing to do".

(iii) How should Iyer & Associates identify the sales to the nine LLPs, and any other related party transactions, when Tapri's ERP cannot flag them?

::: answer Model answer
**(i) Working note**

| Item | Amount (₹) |
|---|---:|
| Masala paid: 2,00,000 kg × ₹340 | 6,80,00,000 |
| At market: 2,00,000 kg × ₹300 | 6,00,00,000 |
| **Paid above market** | **80,00,000** |
| Warehouse rent forgone: ₹2,50,000 × 12 | **30,00,000** |
| **Total departure from market terms** | **1,10,00,000** |

**(ii) Bunty's view is not correct.** ₹1.10 crore is below overall materiality of ₹1.50 crore, but materiality is not only a number: for classes of transactions such as related party transactions, where law, regulation or the financial reporting framework affects users' expectations about measurement or disclosure, misstatements of lesser amounts may reasonably be expected to influence users' decisions (SA 320). Related party transactions not conducted under normal market terms, including one with no exchange of consideration, may also give rise to higher risks of material misstatement (SM 4.94). The auditor should evaluate whether these relationships and transactions are identified, accounted for and disclosed as the framework requires.

**(iii) Identifying the LLP sales.** Information systems that are ineffective at identifying or summarising transactions and outstanding balances with related parties are themselves a reason for higher risk (SM 4.94), so the work cannot rely on the ERP. Iyer & Associates shall inquire of management about the identity of the related parties, the nature of the relationships and the type and purpose of the transactions, and understand the controls (here largely manual) for identifying, accounting for and disclosing them (SM 4.94–4.95). With the names of the nine LLPs, they can match the customer master and the sales and receivables ledgers to that list. To find any parties management has not named, they should inspect records such as the shareholder register, statements of conflicts of interest from management and those charged with governance, contracts with key management, significant contracts not in the ordinary course of business, the entity's income tax returns and information supplied to regulators, and stay alert for related party information throughout the audit (SM 4.96).
:::
::::

## Under the hood

### Related parties across the Study Material

| Where | What it says |
|---|---|
| SA 315 (SM 3.42) | Significant related party transactions outside the normal course of business are always significant risks |
| SA 315 (SM 3.25) | Understanding ownership and complex structures helps determine whether related party transactions are identified and accounted for |
| SA 320 (SM 3.22) | Lower materiality may apply to related party transactions |
| SA 580 (SM 7.36–7.37) | Representations: related parties appropriately accounted for and disclosed; identity of all related parties disclosed |
| Inherent limitations (SM 1.15) | Related party transactions may be paper transactions the auditor is unaware of |
| SA 570 (SM 7.20) | Confirm arrangements for financial support from related and third parties |
| CARO 2020 (SM 8.80–8.81) | Clause (xiii): compliance of related party transactions with sections 177 and 188, and their disclosure |

The two written representations, in the Study Material's illustrative letter (SM 7.36–7.37): "Related party relationships and transactions have been appropriately accounted for and disclosed in accordance with the requirements of applicable accounting standards in India", and "We have disclosed to you the identity of the entity's related parties and all the related party relationships and transactions of which we are aware." See [[aud.complete.sa580|SA 580]] and [[aud.report.caro|CARO 2020]].

::: warning
CARO 2020 clause references and Companies Act section numbers are version-sensitive. Verify against the Study Material and Statutory Update for your attempt.
:::

### The state-controlled exception

Two companies owned by the same state government are not related parties merely because of that common control; they become related only if they engage in significant transactions or share resources to a significant extent with one another (SM 4.92). The Study Material gives no further test: apply those words to the facts.

## Exam angle

::: exam Where SA 550 appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, SA 550 was asked 8 times in 8 new-scheme documents, plus an old-scheme paper:

- **Records or documents that reveal related parties**, 5 marks: MTP September 2024 Series I Q6(b); MTP May 2025 Series II Q6(a); MTP September 2025 Series II Q3(a) ("list any ten"). As an MCQ: January 2025 MCQ 7, where "inventory records" is the suggestion that is not correct.
- **Inquiries of management and understanding controls**, 5 marks: MTP January 2026 Series II Q1(b) (a restructuring brings new related parties); September 2026 Q5(a) (transactions with no exchange of consideration; suggested answers not yet published).
- **Higher risks, with examples**, 4 marks: MTP September 2026 Series I Q3(c) ("do they always involve a higher risk?"); old-scheme November 2023 paper, Q3(d) (3 marks).
- **MCQ on documentation**: MTP September 2025 Series I MCQ 11 (what should not be documented: "transactions at close length basis").
- The Study Material's Test Your Knowledge adds an MCQ: many related party transactions mean a **higher** risk that management overrides controls (SM 4.122, answer (b)).
:::

::: exam The traps
- "Related party transactions always carry a higher risk" is wrong: ICAI's answer starts with "Many related party transactions are in the normal course of business…" and only then gives the three examples.
- "All entities under common control by a state are related parties" is wrong (old-scheme November 2019 Q1(c)).
- A list of records is marked item by item in ICAI's wording: "statements of conflicts of interest", "significant contracts re-negotiated", "life insurance policies acquired by the entity".
:::

::: trick C-I-N for the higher-risk examples
**C**omplex structures; **I**nformation systems that miss them; **N**ot at normal market terms (even no consideration). Condition: these are the Study Material's examples of when risk *may* be higher; open the answer by saying that transactions in the normal course may carry no higher risk.
:::

## Answer frame

### "Explain the risks; do related party transactions always carry higher risk?"

1. **Normal course first**: many related party transactions are in the normal course of business and may carry no higher risk than similar transactions with unrelated parties.
2. **However**: the nature of related party relationships and transactions may, in some circumstances, give rise to higher risks.
3. **Three examples**, in ICAI's words: complex relationships and structures; information systems ineffective at identifying or summarising; not under normal market terms, some with no exchange of consideration.
4. **Facts applied**: match each example to the case.
5. **Conclusion**: not always; here the risk is higher, so the auditor exercises professional skepticism and responds.

### "What should the auditor inquire and understand?"

| Inquire of management about | Understand controls to |
|---|---|
| (a) Identity of related parties, with changes from the prior period | (a) Identify, account for and disclose related parties and transactions |
| (b) Nature of the relationships | (b) Authorise and approve significant related party transactions |
| (c) Transactions in the period: type and purpose | (c) Authorise and approve significant transactions outside the normal course |

## Common mistakes

::: mistake Hall of Shame: "related party means fraud"
Bunty flags every transaction with a subsidiary as suspicious. **Fix:** many related party transactions are in the normal course of business and carry no higher risk; the risk rises with complexity, weak information systems and non-market terms.
:::

::: mistake "Below materiality, so ignore it"
**Fix:** for related party transactions, users' expectations about disclosure may make smaller amounts material (SM 3.22); and the disclosure itself is what users rely on.
:::

::: mistake Taking management's list as the evidence
**Fix:** inquiry of management is the start, not the end. Understand the controls, then stay alert and inspect the records SA 550 lists; obtain written representations at the end.
:::

::: mistake Mixing the two lists of (a), (b), (c)
Students merge the three inquiries with the three control objectives. **Fix:** inquiries are about *who, how related, what transactions*; controls are about *identify and disclose, approve related party deals, approve deals outside the normal course*.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Iyer & Associates audit Indore Dairy Fresh Ltd. Its managing director's husband owns Kanha Cartons Pvt Ltd, which supplies all its packaging at the price list it gives every customer, through the dairy's normal purchase process. Bunty wants to assess every transaction with Kanha Cartons as a significant risk "because it is a related party". Which of the following is most appropriate?
- [ ] Bunty is right: every related party transaction is a significant risk
- [x] Transactions in the normal course of business on normal terms may carry no higher risk; the auditor identifies the relationship, considers the controls and checks that it is accounted for and disclosed as the framework requires
- [ ] The relationship can be ignored because the prices are the same as for other customers
- [ ] The auditor should disclaim an opinion because the managing director has an interest
> SA 315 makes significant related party transactions outside the normal course of business always significant risks; a transaction in the normal course on normal terms may carry no higher risk than one with an unrelated party. It is still disclosed as the framework requires.

Q: Case scenario. Iyer & Associates suspect that Tapri's CFO has an interest in Saffron Packaging Pvt Ltd, a new supplier. Which record is most likely to show such a relationship directly?
- [x] The CFO's statement of conflicts of interest given to the board
- [ ] The goods received notes for packaging bought from Saffron Packaging
- [ ] The stock register for packaging materials
- [ ] The arithmetic of Saffron Packaging's purchase invoices
> Statements of conflicts of interest from management and those charged with governance are among the records the Study Material lists as sources of related party information (SM 4.96). Receipt notes, stock records and invoice arithmetic evidence the purchases themselves, not who stands behind the supplier.

Q: Madhya Pradesh Water Works Ltd and Malwa Road Transport Corporation are both wholly owned by the same state government. They have no transactions with each other and share no resources. Under SA 550, are they related parties?
- [ ] Yes: common control by any party makes entities related
- [x] No: entities under common control by a state are not related unless they engage in significant transactions or share resources to a significant extent
- [ ] Yes, but only if one of them is listed
- [ ] No: government companies are outside SA 550 altogether
> The state-control exception applies; it would end if they transacted significantly or shared resources significantly.

Q: Select all the matters about which SA 550 requires the auditor to inquire of management.
- [x] The identity of the entity's related parties, including changes from the prior period
- [x] The nature of the relationships between the entity and these related parties
- [x] Whether the entity entered into transactions with them during the period and, if so, their type and purpose
- [ ] Whether the related parties' own financial statements have been audited
> Those are the three inquiries (SM 4.94–4.95). The audit status of the related parties' own accounts is not one of them.

Q: Under SA 550's definition, when the framework sets minimal requirements, which of the following is a related party of the reporting entity?
- [ ] A bank that has lent the entity a large term loan on normal terms
- [ ] A competitor in the same city
- [x] An entity under common control with the reporting entity through common key management
- [ ] A customer that buys 15% of the entity's output on normal terms
> Common control through common controlling ownership, owners who are close family members, or common key management makes an entity related. A lender, competitor or customer is not related merely by doing business.
:::

## Recap

- Related party: as defined in the framework; if the framework is minimal, a party that controls or significantly influences the entity, an entity it controls or influences, or one under common control (ownership, close family owners, key management).
- Entities under common control by a state are not related unless they transact or share resources significantly.
- Control: power to govern financial and operating policies to obtain benefits. Significant influence: power to participate in those decisions, not control; by share ownership, statute or agreement.
- Many related party transactions are normal and carry no higher risk; higher risk can arise from complex structures, ineffective information systems, or non-market terms (even no consideration).
- Inquire: identity (and changes), nature of relationships, transactions (type and purpose).
- Understand controls to: identify, account for and disclose; approve significant related party transactions; approve significant transactions outside the normal course.
- Stay alert while reviewing records: tax returns, regulatory filings, shareholder registers, conflict-of-interest statements, contracts with key management, unusual or re-negotiated contracts, internal audit reports.
- Significant related party transactions outside the normal course are always significant risks; obtain written representations. (Check the nephew's runs twice.)

## Flashcards

Q:: SA 550: define a related party where the framework establishes minimal or no requirements.
A:: (a) A person or entity that has control or significant influence over the reporting entity; (b) an entity over which the reporting entity has control or significant influence; or (c) an entity under common control with it through common controlling ownership, owners who are close family members, or common key management (directly or through intermediaries).

Q:: SA 550: are entities under common control by a state related parties?
A:: No, unless they engage in significant transactions or share resources to a significant extent with one another.

Q:: SA 550: what is control?
A:: The power to govern the financial and operating policies of an entity so as to obtain benefits from its activities.

Q:: SA 550: what is significant influence?
A:: The power to participate in the financial and operating policy decisions of an entity, but not control over those policies; it may be gained by share ownership, statute or agreement.

Q:: SA 550: which relationships may indicate control or significant influence?
A:: Equity holdings or financial interests in the entity; the entity's holdings in other entities; being part of TCWG or key management; being a close family member of such a person; a significant business relationship with such a person.

Q:: SA 550: three examples of why related party transactions may carry higher risk?
A:: Complex relationships and structures; information systems ineffective at identifying or summarising them; transactions not under normal market terms, some with no exchange of consideration.

Q:: SA 550: what shall the auditor inquire of management?
A:: The identity of related parties (including changes from the prior period); the nature of the relationships; whether transactions occurred in the period and, if so, their type and purpose.

Q:: SA 550: the controls the auditor shall understand?
A:: Controls to identify, account for and disclose related party relationships and transactions; to authorise and approve significant transactions with related parties; and to authorise and approve significant transactions outside the normal course of business.

Q:: SA 550: how does the auditor obtain the understanding in a smaller entity?
A:: Through inquiry of management combined with other procedures, such as observation of management's oversight and review activities, and inspection of available relevant documentation.

Q:: SA 550: when may a special-purpose entity be a related party?
A:: When the entity in substance controls it, even if it owns little or none of the special-purpose entity's equity.

Q:: SA 550: name six records that may reveal related parties.
A:: Income tax returns; information supplied to regulators; shareholder registers; conflict-of-interest statements; contracts with key management or TCWG; significant contracts not in the ordinary course (also: investment and pension records, advisers' invoices, life insurance policies, re-negotiated contracts, internal audit reports, securities filings).
