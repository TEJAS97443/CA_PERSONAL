---
id: cma.mat.procure
title: Procurement procedure, GeM, ERP and stock verification
minutes: 32
needs: cma.intro.classify
tags: material control, bill of materials, purchase requisition, goods received note, GeM, bin card, stores ledger, stock verification
labs:
summary: How material travels from the bill of materials to the store shelf and out again: every document and who prepares it, GeM, ERP, store records and surprise stock checks.
---

## In plain words

### Who ordered 40 kg of cardamom?

Monday, 9 a.m., Tapri's samosa factory in Indore. The line has stopped: no potatoes. The store holds 40 kg of cardamom nobody remembers asking for.

> **Kesar:** Potatoes zero, cardamom forty kilos. Who ordered cardamom?
> **Ritu:** You did, on the phone, from a wedding. No requisition, no purchase order, no goods received note. Nobody compared the rate, nobody inspected the bags, and accounts cannot pass the bill.
> **Kesar:** Sab adjust ho jayega.
> **Ritu:** Forty kilos of cardamom do not adjust. They sit.

Material is usually a factory's biggest cost, so every step happens only against a **document** from the department that owns the step.

The **bill of materials** lists what a product needs. Production asks the store for material with a **material requisition**. When stock falls to its re-order level, the store keeper asks the buyers for more with a **purchase requisition**. The purchase department invites quotations and sends the chosen supplier a **purchase order**. Arriving goods are inspected and recorded on a **goods received note**; accounts check the bill against both papers.

Government buyers do the inviting and picking on **GeM**, the Government e-Marketplace. In an **ERP** system the documents become screens. And somebody independent of the store counts the shelves without warning: **stock verification**.

::: analogy The wedding kitchen
A big Indian wedding kitchen runs on paper. The caterer's menu sheet says how much of everything 500 guests need (the bill of materials). The cook sends a slip to the storeroom for today's dal (the requisition). The storeroom tells the buyer what to fetch from the mandi (the purchase requisition), and the buyer confirms price and quantity with one vendor (the purchase order). At the gate someone checks the sacks before signing for them (the goods received note). And the bride's uncle counts the ghee tins at midnight, unannounced (stock verification).
:::

::: key
No material moves without the right document from the right department: bill of materials, material requisition, purchase requisition, purchase order, goods received note, then the bill passed against them. Someone independent checks the records against the shelves, without prior notice.
:::

## How it works

### Material control: three gates

**Material control** is "a systematic control over the procurement, storage and usage of material so as to maintain an even flow of material" (SM 2.5). It involves the efficient functioning of purchasing, receiving, inspection, storage and issuing of materials, maintenance of inventory records and stock audit (SM 2.6).

ICAI's five objectives of a system of material control (SM 2.4):

1. **Minimising interruption in production process**: every item that may be needed must be available, however small its cost.
2. **Optimisation of material cost**: price, ordering cost and holding cost together.
3. **Reduction in wastages** from deterioration due to defective or long storage, or from obsolescence.
4. **Adequate information**: reliable records for all items, which also help to detect losses and pilferage and to plan production.
5. **Completion of order in time**, which adds to the goodwill of the firm.

::: diagram How this lesson groups the documents
{"type": "tree", "gapX": 16, "root": {"label": "Material control", "children": [
  {"label": "Procurement\ncontrol", "children": [
    {"label": "Bill of materials\nRequisitions\nPurchase order\nGoods received\nnote"}]},
  {"label": "Storage\ncontrol", "children": [
    {"label": "Bin card\nStock control\ncard\nStores ledger\nStock checks"}]},
  {"label": "Usage\ncontrol", "children": [
    {"label": "Requisition note\nTransfer note\nShop credit note"}]}]},
 "caption": "ICAI's three elements of material control, with the documents and records this lesson covers under each."}
:::

### The procurement relay

ICAI draws the procedure as 13 numbered documents passing between departments (SM 2.6; the names are illustrative). Read each picture top to bottom: first the request inside the factory, then the order out and the goods in.

::: diagram Procurement procedure (1): asking for material
{"type": "seq", "w": 440, "lanes": ["Planning", "Production", "Store", "Purchase"], "laneColors": {"Planning": "a", "Production": "b", "Store": "c", "Purchase": "d"},
 "events": [
  {"from": "Planning", "to": "Production", "text": "1 Bill of materials"},
  {"from": "Production", "to": "Store", "text": "2 Material requisition"},
  {"lane": "Store", "text": "re-order level reached"},
  {"from": "Store", "to": "Purchase", "text": "3 Purchase requisition"}
 ],
 "caption": "Planning is the engineering or planning department."}
:::

::: diagram Procurement procedure (2): buying and receiving
{"type": "seq", "w": 440, "lanes": ["Store", "Purchase", "Supplier", "Cost dept"], "laneColors": {"Store": "c", "Purchase": "d", "Supplier": "e", "Cost dept": "f"},
 "events": [
  {"from": "Purchase", "to": "Supplier", "text": "4 Tender or RFP"},
  {"from": "Supplier", "to": "Purchase", "text": "5 Quotation"},
  {"lane": "Purchase", "text": "comparative statement"},
  {"from": "Purchase", "to": "Supplier", "text": "6 Purchase order"},
  {"from": "Supplier", "to": "Cost dept", "text": "7 Proforma invoice"},
  {"from": "Cost dept", "to": "Supplier", "text": "8 Payment etc."},
  {"from": "Supplier", "to": "Cost dept", "text": "9 Invoice"},
  {"from": "Supplier", "to": "Store", "text": "10 Goods + challan"},
  {"lane": "Store", "text": "inspection"},
  {"from": "Store", "to": "Cost dept", "text": "11 Goods received note"},
  {"from": "Store", "to": "Supplier", "text": "12 Material returned note"},
  {"from": "Store", "to": "Cost dept", "text": "13 Material abstract"}
 ],
 "caption": "Cost dept is the cost or accounting department; the store acts as the receiving department. The material returned note also goes to the cost department."}
:::

::: steps
1. **Bill of materials** (materials specification list): "a detailed list specifying the standard quantities and qualities of materials and components required for producing a product or carrying out of any job", prepared by the engineering or planning department (SM 2.7).
2. **Material requisition note** (material requisition slip): "==a voucher of authority used to get materials issued from store==", generally prepared by the production department (SM 2.7).
3. **Purchase requisition**: the formal request to the purchasing department to purchase materials. Filled up by the **store keeper** for regular materials, the **departmental head** for special materials (SM 2.8).
4. **Inviting quotations**: an enquiry, **request for proposal (RFP)** or **notification inviting tender (NIT)**, offline or online, for example on GeM (SM 2.11).
5. **Selection of quotation**: a **comparative statement** weighing price, quantity, quality, delivery time, mode of transport, payment terms and the supplier's reputation (SM 2.11).
6. **Purchase order**: "a written request to the supplier to supply specified materials at specified rates and within a specified period" (SM 2.11).
7. **Receipt and inspection**: the receiving (store) department inspects the goods against the purchase order and issues a **goods received note**; goods not in good condition or not as ordered go back with a **material returned note** (SM 2.12).
8. **Checking and passing of bills**: accounts check the invoice for authenticity and arithmetic, ==the quantity against the goods received note and the price against the purchase order==, then pass it for payment (SM 2.13).
:::

### Five questions before buying, and GeM

The purchase department answers **what** to buy, **when** ([[cma.mat.levels|the re-order level]]), **how much** ([[cma.mat.eoq|the economic order quantity]]), **from where** and **at what price**: the lowest, **L1 bidder** is selected (SM 2.9–2.11). Where public money is spent, ICAI ties "from where" to the Preamble's "Equality of status and of opportunity": every supplier must get an equal chance in the tender.

::: definition Government e-Marketplace (GeM)
A dedicated e-market for different goods & services procured by Government Organisations / Departments / PSUs. It aims to enhance transparency, efficiency and speed in public procurement. It provides the tools of e-bidding, reverse e-auction and demand aggregation to facilitate the government users, achieve the best value for their money. The purchases through GeM by Government users have been authorised and made mandatory by Ministry of Finance. (SM 2.11)
:::

### Returns to the supplier: timing decides

Goods sent back travel with a **material returned note** (material outward return note). Returned **before** the receiving report is prepared, they never enter the report or the stores ledger: no adjustment is needed. Returned **after** the entry, the note supports the entry that takes their value out of the stores account (SM 2.12).

### In the store and out of it

ICAI's seven duties of the store keeper (SM 2.18–2.19):

1. **General control over store**: checking quantities against the goods received note and arranging storage in appropriate places.
2. **Safe custody of materials** in the condition and environment that preserve their quality.
3. **Maintaining records** of quantity received, issued, in hand and transferred.
4. **Initiate purchase requisition** for regular items whenever stock approaches the re-order level.
5. **Maintaining adequate level of stock**, stopping further purchases as stock approaches the maximum level, and reserving material for a specific job when required.
6. **Issue of materials** only against an approved material requisition, with reference to the bill of materials.
7. **Stock verification and reconciliation** of book balances with physical stock at frequent intervals, checking irregular issues and pilferage.

The records are the **bin card** and **stock control card** (quantities, stores department) and the **stores ledger** (quantity and value, cost department).

Issues are made only against an authorised **material requisition note**, out of the earliest lot in hand. Surplus too bulky, heavy or brittle to go back may move straight to another job with a **material transfer note**; ICAI stresses that such job-to-job transfer is generally "irregular, if not improper" and should be made only in these circumstances (SM 2.47–2.48). Surplus that goes back to the store travels with a **shop credit note** (stores debit note), so the job is credited. From these three, the store keeper prepares the **material abstract**, the value charged to each product and to overheads (SM 2.71).

::: diagram Where the copies of the issue-side documents go
{"type": "tree", "gapX": 14, "root": {"label": "Material leaving\nor coming back", "children": [
  {"label": "Material\nrequisition note", "children": [{"label": "Store keeps\na copy; also\nto cost dept"}]},
  {"label": "Material\ntransfer note", "children": [{"label": "Duplicate:\ncost accounting\ndept making\ntransfer"}]},
  {"label": "Shop credit\nnote", "children": [{"label": "Triplicate:\nstore room\ncost accounting\ndept returning"}]}]},
 "caption": "No copy of the material transfer note goes to the store: the material never passes through it (SM 2.48)."}
:::

### ERP: the same documents, fewer copies

With **Enterprise Resource Planning (ERP)** (SM 1.17–1.18; more in [[cma.intro.methods|digital costing]]) one entry gives reports for every purpose; bills of material, requisitions and goods received notes are no longer made in multiple copies (each department takes an e-copy); and purchase orders reach suppliers over an extranet, a step towards [[cma.mat.techniques|just-in-time]].

### Stock verification: count without warning

"The checking of physical inventory is an essential feature of every sound system of material control" (SM 2.46). Under **continuous stock verification**, items are counted at appropriate intervals ==without prior notice==, by staff independent of the store and production (for example internal audit): "the element of surprise is essential". **Annual or periodic stock-taking** must cover every item in a given number of days, so production is shut down or the count is of a limited character.

::: diagram A day of continuous stock verification
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Pick items by rotation,\nno prior notice"},
  {"id": "c", "kind": "process", "label": "Count physically\n(independent staff)"},
  {"id": "d", "kind": "decision", "label": "Agrees with\nbin card and\nstores ledger?"},
  {"id": "ok", "kind": "end", "label": "Next items", "color": "ok"},
  {"id": "e", "kind": "process", "label": "Explain the cause\npromptly"},
  {"id": "f", "kind": "process", "label": "Make the\ncorrective entry"},
  {"id": "g", "kind": "end", "label": "Remove the cause", "color": "c"}],
 "edges": [["s", "c"], ["c", "d"], ["d", "ok", "yes"], ["d", "e", "no"], ["e", "f"], ["f", "g"]],
 "caption": "Steps (d) to (g) of the perpetual inventory system (SM 2.45): count by rotation, explain, correct, remove the cause."}
:::

## Formats and formulas

Asked as "distinguish" questions. *Reproduce the points, in this order, from memory.*

::: compare Bill of materials vs material requisition note (SM 2.8)
| Bill of materials | Material requisition note |
|---|---|
| Prepared by the engineering or planning department. | Prepared by the production or other consuming department. |
| A complete schedule of component parts and raw materials required for a particular job or work order. | A document asking the store keeper to issue materials to the consuming department. |
| Often serves as a material requisition: it can replace material requisitions. | Cannot replace a bill of materials. |
| Can be used for the purpose of quotations. | Useful in arriving at historical cost only. |
| Helps in keeping a quantitative control on materials drawn through material requisitions. | Shows the material actually drawn from stores. |
:::

::: compare Bin card vs stores ledger (SM 2.21)
| Bin card | Stores ledger |
|---|---|
| Maintained by the store keeper in the store. | Maintained in the cost accounting department. |
| Contains only quantitative details of material received, issued and returned to stores. | Contains information both in quantity and value. |
| Entries are made when the transaction takes place. | Always posted after the transaction. |
| Each transaction is individually posted. | Transactions may be summarised and then posted. |
| Inter-department transfers do not appear. | Material transfers from one job to another are recorded for costing purposes. |
:::

| Document | Usually prepared by | Copies |
|---|---|---|
| Purchase requisition | Store keeper (regular); departmental head (special) | — |
| Purchase order | Purchase manager or concerned officer | Store or indenting dept, receiving dept, cost accounting dept; one on file with the requisitions |
| Goods received note | Receiving department | Quadruplicate: purchase, store or indenting, receiving, accounting |
| Material transfer note | Not named by ICAI; made at the time of transfer | Duplicate: cost accounting dept, department making the transfer |
| Shop credit note | Department returning the surplus | Triplicate: store room, cost accounting dept, department returning it |

::: definition Stores ledger
A ledger containing a separate account for each item of material and component stocked in store giving details of the receipts, issues and balance both in terms of quantity and value. A subsidiary ledger to the main cost ledger, posted from goods received notes, material requisition notes etc. (SM 2.20, 2.73)
:::

::: formula Consumption of materials in the financial accounts
$$\text{Consumption} = \text{Opening stock} + \text{Purchases} \qquad - \text{Closing stock}$$
Stock is taken at cost or net realisable value, whichever is less (SM 2.72).
:::

## Worked examples

:::: example The samosa factory's paper trail
For a Diwali order, Tapri's samosa factory buys potatoes, a regular item:

(a) Planning lists the potatoes, maida and spices needed per batch of 1,000 samosas.

(b) Production asks the store for 1,200 kg of potatoes for Monday.

(c) After the issue, stock falls below the re-order level, so the store keeper asks the purchase department to buy 5,000 kg.

(d) The purchase department invites offers from farmers' co-operatives on its website.

(e) It tabulates the three offers and orders 5,000 kg from Malwa Kisan Co-operative at ₹22 a kg, in writing.

(f) 5,000 kg arrive with a challan and an invoice. At the gate 150 kg are rotten and sent straight back; 4,850 kg are accepted and recorded.

(g) Two days after the receipt was recorded, 100 kg more are found sprouted and sent back.

**Required:**

(i) Name the document at each of (a) to (g) and the department that prepares it.

(ii) How many copies of the receipt document at (f) are usually prepared, and who gets them?

(iii) Do the returns at (f) and (g) need the same treatment in the stores ledger?

(iv) For what quantity and amount should accounts pass the invoice, and against which documents is it checked?

::: answer Model answer
**(i) Documents**

| Step | Document | Prepared by |
|---|---|---|
| (a) | Bill of materials | Engineering or planning department |
| (b) | Material requisition note | Production department |
| (c) | Purchase requisition | Store keeper (regular material) |
| (d) | Request for proposal / enquiry | Purchase department |
| (e) | Comparative statement, then purchase order | Purchase department |
| (f) | Goods received note (4,850 kg); material returned note (150 kg) | Receiving (store) department |
| (g) | Material returned note (100 kg) | Receiving (store) department |

**(ii)** Generally four (quadruplicate): purchase department, store or order indenting department, receiving department and accounting department.

**(iii)** No. The 150 kg went back before the receiving report was prepared: never in the stores ledger, no adjustment. The 100 kg went back after their entry, so the material returned note supports an entry excluding their value from the stores account.

**(iv)** Quantity is checked against the goods received note and price against the purchase order. Accepted quantity = 5,000 − 150 − 100 = **4,750 kg**; amount = 4,750 × ₹22 = **₹1,04,500**. The invoice for ₹1,10,000 is passed only for this amount; the difference of 250 kg (₹5,500) is taken up with the supplier.
:::
::::

:::: example Bunty and the Saturday stock count
Tapri's Dewas store holds about 1,400 items. Kesar proposes closing the store and packing line for four days every March for a full count. The store keeper offers: "Give me Friday the list of 20 items you will count on Saturday." Ritu proposes that the internal audit cell count a rotating set of items every day, without notice.

On one such count, 36 cartons of kulhads are short against the bin card. (Bunty, attending for the statutory auditors, had copied the bin card figure onto his count sheet before counting. Ms. Iyer was not amused.)

**Required:**

(i) Advise on the two proposals.

(ii) Comment on the store keeper's offer.

(iii) State what should follow the shortage.

::: answer Model answer
**(i)** Kesar's proposal is annual stock-taking. Since all items have to be covered in a given number of days, either production has to be shut down to enable a thorough check, or the verification must be of a limited character (SM 2.46). Ritu's proposal, continuous stock verification, is advisable because:

1. Closure of normal functioning is not necessary.
2. Stock discrepancies are likely to be brought to notice and corrected much earlier.
3. The element of surprise has a sobering influence on the stores staff.
4. The stores auditor can watch the movement of items more closely, so the chances of obsolescence buying are reduced.
5. Final accounts can be ready quickly, and interim accounts are possible quite conveniently.

**(ii)** The offer defeats the purpose. Stock verification should be done by staff independent of the store and production staff, at appropriate intervals and without prior notice; the element of surprise is essential for effective control.

**(iii)** The cause of the discrepancy should be explained promptly, a corrective entry made and the cause removed (SM 2.45). The shortage is entered in the issue column of the stores ledger at the rate of the pricing method in use (SM 2.63). If its cause is abnormal (pilferage, mishandling) it is charged to the costing profit and loss account; if normal, its cost is absorbed by the good units (SM 2.15).
:::
::::

::::: example State with reasons: true or false
State with reasons whether each statement is true or false. (5 marks)

(i) A bill of materials can serve as a material requisition, but a material requisition note cannot replace a bill of materials.

(ii) A purchase requisition for a special material not stocked as a regular item is filled up by the store keeper.

(iii) Material returned to the supplier before the receiving report is prepared must be adjusted in the stores ledger.

(iv) Purchases through GeM by Government users are optional.

(v) The bin card is maintained by the cost accounting department and shows the value of the stock.

:::: answer Model answer
**(i) True.** A bill of materials is a complete schedule of the materials required for a particular job, so it often serves as a material requisition. A material requisition note only shows the material actually drawn from stores and cannot replace a bill of materials.

**(ii) False.** The store keeper fills up the purchase requisition for regular materials; for special materials not stocked as regular items, the departmental head does.

**(iii) False.** Such material is not included in the receiving report and hence not shown in the stores ledger, so no adjustment in the books is necessary.

**(iv) False.** Purchases through GeM by Government users have been authorised and made mandatory by the Ministry of Finance.

**(v) False.** The bin card is maintained by the store keeper in the store and contains only quantitative details. The stores ledger, maintained in the cost accounting department, records both quantity and value.
::::
:::::

## Under the hood

### Bin card or stock control card? (SM 2.19–2.20)

| | Bin card | Stock control card |
|---|---|---|
| Advantages | (i) Fewer mistakes: entries made when goods are received or issued, by the person handling them. (ii) More effective control: actual quantity can be compared with the book balance at any time. (iii) Easier identification of items, by reference to the card at the bin. | (i) Records kept compactly, so reference is easy. (ii) Kept neat and clean by clerical staff, dividing record keeping from material handling. (iii) An overall idea of the stock position without going round the stores. |
| Disadvantages | (i) Records dispersed over a wide area. (ii) Cards smeared with dirt and grease. (iii) Material handlers not suited to clerical work. | (i) No on-the-spot comparison of physical stock with book balance. (ii) Physical identification less easy, as cards are kept in cabinets or trays. |

### Ten requirements of material control (SM 2.4–2.5)

1. Proper co-ordination of all departments involved: finance, purchasing, receiving, inspection, storage, accounting and payment.
2. A purchase procedure under which purchases are made, after suitable enquiries, at the most favourable terms.
3. Standard forms for placing orders, noting receipt of goods, authorising issue of materials etc.
4. Budgets for materials, supplies and equipment, to ensure economy in purchasing and use.
5. A system of internal check, so that all transactions involving materials are properly approved and automatically checked.
6. Storage of all materials in a well-designated location with proper safeguards.
7. A perpetual inventory with continuous stock checking, so that the amount and value of each material in stock can be known at any time.
8. Stores control and issue that deliver the right amount of material, on requisition, when needed.
9. Controlling accounts and subsidiary records showing summary and detailed material costs at receipt and consumption.
10. Regular reports of materials purchased and issued, inventory balances, obsolete stock, goods returned to vendors, and spoiled or defective units.

### Why material needs such control (SM 2.3)

ICAI's six reasons: the quality of the final product depends on the inputs; material is a significant part of the price of the product; production must not pause for want of material; stock-holding and stock-out both cost money; wastage and losses arise in handling; and regular information on availability and use is needed for decisions. The principle is the 3Es: economy in procurement, efficiency in handling and processing, effectiveness in producing the desired output.

### Next door and across the papers

The rupee value of a goods received note is [[cma.mat.receipts|valuing material receipts]]; the rate on each requisition, and how returns and shortages enter the ledger, is [[cma.mat.issues|pricing material issues]]; discrepancies and turnover ratios are in [[cma.mat.ratios|inventory ratios]]. The statutory auditor's attendance at inventory counting is Paper 5: [[aud.evid.sa501|SA 501]].

## Exam angle

### What ICAI asks from this topic

::: exam Where these documents appeared, May 2024 to September 2026 (and the old scheme)
- **Bill of materials vs material requisition note**: MTP Series II for May 2025 Q6(b) (5 marks); September 2026 Q6(c) OR, "in terms of their contents and utility" (4 marks); old-scheme MTPs for November 2019 and November 2020, Q6(b).
- **Uses of the bill of materials** by department: September 2025 Q6(c) OR (4 marks); December 2021 (old scheme) Q4(c), with the definition (5 marks).
- **Bin card vs stores ledger**: old-scheme MTPs for May 2022 Q6(a) and May 2023 Q6(e).
- **True or false with reasons**: November 2023 (old scheme) Q6(b) (5 marks): "Material requisition note is prepared by the store keeper" and "Bin card and stores ledger are maintained by the purchasing department", both false.
- **Impact of IT on cost accounting** (ERP): MTP Series I for May 2024 Q6(b) (5 marks); RTP May 2024; January 2021 (old scheme) Q6(e).
- **GeM and stock verification**: in none of the documents read; they are in the syllabus and the Study Material, so expect a short note or an MCQ.
:::

::: exam The traps
- The store keeper prepares the **purchase** requisition (regular items), never the material requisition.
- Bin card: quantity, store keeper. Stores ledger: quantity and value, cost department.
- Two returns, two papers: to the **supplier**, a material returned note; back to the **store**, a shop credit note (which ICAI's summary also calls a material return note). Name the direction.
- The invoice: quantity against the goods received note, price against the purchase order.
:::

::: trick Plan, Pull, Push, Promise, Proof
The first five documents in order: **Plan** (bill of materials), **Pull** from the store (material requisition), **Push** to the buyer (purchase requisition), **Promise** to the supplier (purchase order), **Proof** of receipt (goods received note). Holds for a regular item bought for stock; for a special item the purchase requisition comes from the departmental head.
:::

## Answer frame

### "Distinguish" and "uses" questions

For "distinguish", use the two tables in *Formats and formulas*: five points each, starting with who prepares or maintains it. For "uses of the bill of materials" (SM 2.7), open with the definition, then:

| Department | Use |
|---|---|
| Marketing (purchase) | Materials are procured on the basis of the specifications mentioned in it. |
| Production | Production is planned according to the nature and volume of materials required; material requisition lists are prepared accordingly. |
| Stores | A reference document while issuing materials to the requisitioning department. |
| Cost / accounting | Used to estimate cost and profit; purchase, issue and usage are compared and verified against it. |

### "Write a note on continuous stock verification"

1. Definition: physical verification at appropriate intervals, without prior notice, by staff independent of the store and production; the element of surprise is essential.
2. The shortcoming of annual stock-taking: shutdown, or a count of limited character.
3. The five advantages, in ICAI's order (Example 2).

### "State with reasons whether true or false"

Verdict first, then the provision or definition that decides it, then the correct position (Example 3). Five statements, one mark each, as in November 2023 (old scheme) Q6(b).

### Three answers to "Material requisition note is prepared by the store keeper. True or false?"

::: cols
**Loses marks**

"False."

The reason carries the mark.
---
**Passes**

"False. It is prepared by the production department."

Correct, but says nothing of what the document is.
---
**Full marks**

"False. The material requisition note is a voucher of authority used to get materials issued from store; it is prepared by the production or other consuming department. The store keeper prepares the purchase requisition for regular materials."
:::

## Common mistakes

::: mistake Hall of Shame: the store keeper who wrote his own permission slip
Writing that the store keeper prepares the material requisition note. If the person holding the stock also writes the authority to release it, there is no control. **Fix:** the consuming department prepares the material requisition; the store keeper issues against it.
:::

::: mistake The return that got the wrong paper
Sending shop-floor surplus back to the store "with a material returned note", or adjusting the stores ledger for goods rejected at the gate. **Fix:** to the supplier, a material returned note, with a books adjustment only if the goods were already in the receiving report; to the store, a shop credit note (stores debit note) in triplicate, made out by the returning department. ICAI's summary calls the note for returns to the store a "material return note", so always name the direction.
:::

::: mistake The surprise check that was announced
Writing that stock verification is done "by the store keeper at year end, after informing the store". **Fix:** continuous verification is by independent staff, at intervals, without notice.
:::

## Practice

::: quiz Check yourself
Q: Case scenario. Malwa District Hospital, a government hospital, needs 2,00,000 paper cups. Its purchase officer plans to phone three local vendors he knows and buy from the cheapest. The finance head objects. Which of the following is correct?
- [ ] The plan is fine: a phone enquiry of three vendors is a comparative statement.
- [x] The hospital should buy through GeM, the e-market for government buyers with e-bidding, reverse e-auction and demand aggregation; it is mandatory for government users.
- [ ] GeM covers only services, so the officer should float a newspaper tender.
- [ ] The highest bidder should be selected, as a higher price signals better quality.
> GeM is the e-market for goods and services procured by government buyers, mandatory for them. Phoning known vendors fails the equality-of-opportunity test; the L1 (lowest) bidder is selected.

Q: Which document authorises the purchase department to order materials?
- [ ] Material requisition note
- [x] Purchase requisition
- [ ] Goods received note
- [ ] Bill of materials
> The purchase requisition is the formal request to purchase; the material requisition asks the store to issue.

Q: The goods received note is generally prepared in quadruplicate. Which of these does NOT get a copy?
- [ ] Purchase department
- [ ] Store or order indenting department
- [ ] Accounting department
- [x] The supplier
> The four copies go to the purchase, store or indenting, receiving and accounting departments.

Q: Which of these receive a copy of a material transfer note? Select all that apply.
- [x] Cost accounting department
- [x] Department making the transfer
- [ ] Store
- [ ] Purchase department
> Duplicate; the material never passes through the store.

Q: Tapri's chai premix plant had raw material of ₹4,20,000 on 1 April, bought ₹18,60,000 in the year and held ₹3,90,000 on 31 March (all at cost, below net realisable value). What was the consumption of materials for the year, in rupees?
= 1890000
> Consumption = ₹4,20,000 + ₹18,60,000 − ₹3,90,000 = ₹18,90,000.

Q: "The material requisition note is prepared by the store keeper, and the bin card is maintained by the cost accounting department." Which parts are correct?
- [x] Neither
- [ ] Only the first
- [ ] Only the second
- [ ] Both
> The consuming department prepares the material requisition note, and the store keeper keeps the bin card. The cost accounting department keeps the stores ledger.
:::

## Recap

- Material control: systematic control over procurement, storage and usage to keep an even flow of material.
- A supplier's invoice is passed after checking quantity against the goods received note and price against the purchase order.
- Bin card: quantity only, kept by the store keeper. Stores ledger: quantity and value, kept by the cost department.
- Documents in order: bill of materials (planning) → material requisition (production) → purchase requisition (store keeper, or departmental head for special items) → RFP / NIT → comparative statement → purchase order → goods received note or material returned note → bill passed.
- GeM: e-market for government buyers; e-bidding, reverse e-auction, demand aggregation; mandatory for government users; L1 bidder selected.
- Copies: GRN quadruplicate; material transfer note duplicate (no store copy); shop credit note triplicate.
- ERP: one entry for all departments; e-copies instead of multiple copies.
- Continuous stock verification: independent staff, intervals, no prior notice; annual counts mean shutdown or a limited count. (Cardamom does not adjust.)

## Flashcards

Q:: ICAI's definition of a bill of materials?
A:: A detailed list specifying the standard quantities and qualities of materials and components required for producing a product or carrying out of any job; also called materials specification list. Prepared by the engineering or planning department.

Q:: What is a material requisition note, and who prepares it?
A:: A voucher of authority used to get materials issued from store (material requisition slip). Generally prepared by the production or other consuming department.

Q:: Who fills up the purchase requisition?
A:: The store keeper for regular materials; the departmental head for special materials not stocked as regular items.

Q:: ICAI's definition of a purchase order?
A:: A written request to the supplier to supply specified materials at specified rates and within a specified period.

Q:: GeM: what is it, what tools does it provide, and is it optional for government users?
A:: Government e-Marketplace, a dedicated e-market for goods and services procured by government organisations, departments and PSUs; e-bidding, reverse e-auction and demand aggregation. Purchases through GeM by government users are authorised and made mandatory by the Ministry of Finance.

Q:: How many copies of a goods received note, and who gets them?
A:: Generally four: purchase department, store or order indenting department, receiving department and accounting department.

Q:: Material returned to the supplier before the receiving report is prepared: is a stores ledger adjustment needed?
A:: No: it is not in the receiving report or the stores ledger. A return after the entry needs a material returned note to exclude its value from the stores account.

Q:: Copies of a material transfer note and of a shop credit note?
A:: Transfer note: duplicate, to the cost accounting department and the department making the transfer (no store copy). Shop credit note: triplicate, to the store room, the cost accounting department and the department returning it.

Q:: Bin card vs stores ledger: who maintains each, and what does each show?
A:: Bin card: store keeper, in the store; quantities only. Stores ledger: cost accounting department; quantity and value.

Q:: Against which documents is a supplier's invoice checked before it is passed?
A:: Quantity against the goods received note; price against the purchase order.

Q:: Continuous stock verification: by whom, how often, with what notice?
A:: By staff independent of the store and production staff (for example internal audit), at appropriate intervals, without prior notice; the element of surprise is essential.

Q:: Advantages of continuous stock-taking (five)?
A:: No closure of normal functioning; discrepancies noticed and corrected earlier; sobering influence on stores staff; closer watch on movement, so less obsolescence buying; final accounts ready quickly and interim accounts possible.
