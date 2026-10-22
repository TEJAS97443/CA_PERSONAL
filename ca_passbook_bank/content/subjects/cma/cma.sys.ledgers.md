---
id: cma.sys.ledgers
title: Non-integrated and integrated accounting systems
minutes: 38
needs: cma.sheet.mfg, cma.oh.underover
tags: non-integrated accounts, integrated accounts, cost ledger control account, control accounts, journal entries, cost ledger
labs:
summary: How a separate cost ledger keeps its double entry through the Cost Ledger Control Account, the control accounts and journal entries ICAI expects, and how integrated accounts replace that account with real assets and liabilities in one set of books.
---

## In plain words

### Two sets of books for one samosa

At Tapri's samosa factory, Dev's finance team keeps the financial books: bank, debtors, creditors, fixed assets, share capital, interest, bad debts. Ritu keeps a separate **cost ledger** with only what concerns the product: materials, wages, overheads, work-in-process, finished goods and cost of sales.

> **Kesar:** Ritu, your ledger has no bank account. How do you pay for potatoes?
> **Ritu:** I don't; Dev does. When his books buy potatoes, mine debit the Stores Ledger Control Account and credit one account that stands for everything outside my ledger: the Cost Ledger Control Account.
> **Kesar:** One account for the whole outside world? Sab adjust ho jayega in that.
> **Ritu:** That is exactly its job.

This is the **non-integrated system**: two separate sets of books. The cost ledger leaves out purely financial items (interest, bad debts, income from anything other than selling the product) and balance sheet items (fixed assets, debtors, creditors). Every entry that would need one of them uses the **Cost Ledger Control Account** instead, so the cost ledger still balances on its own. Because the two sets of books treat some items differently, they show two different profits, which must later be reconciled.

The **integrated system** keeps cost and financial accounts in the same set of books. The Cost Ledger Control Account disappears: the real accounts (bank, debtors, creditors, provision for depreciation, fixed assets, share capital) take its place. One set of books, one profit, nothing to reconcile.

::: analogy The embassy
The Cost Ledger Control Account is an embassy. Inside the cost ledger it represents the whole country of the financial books: every rupee arriving from outside (a purchase, wages paid, an expense) enters through it, sales leave through it, and the costing profit is finally sent back to it. Integrated accounts merge the two countries, so no embassy is needed.
:::

::: key
In a non-integrated system the cost ledger is made self-balancing by the Cost Ledger Control Account, which stands in for every account kept only in the financial books. Integrated accounts use the real accounts instead, in one set of books, so no reconciliation is needed.
:::

## How it works

### The non-integrated system

::: definition Non-integrated accounting system
A system of accounting under which separate ledgers are maintained for both cost and financial accounts; also known as the cost ledger accounting system. The cost accounts restrict themselves to recording only those transactions which relate to the product or service being supplied. (SM 7.2)
:::

It excludes expenses like interest and bad debts, and revenue or income from "other than the sale of product or service". It has fewer accounts than the financial books because purchases, expenses and balance sheet items like fixed assets, debtors and creditors are excluded; the excluded items are represented by the **Cost Ledger Control Account** (SM 7.2–7.3). With no common books, the two profits differ and must be reconciled ([[cma.sys.recon|reconciling cost and financial profit]]).

The important **ledgers** maintained under the non-integrated system (SM 7.3):

1. **Cost ledger**: the principal ledger of the cost department, in which impersonal accounts are recorded; made self-balancing by maintaining a control account for each subsidiary ledger.
2. **Stores ledger**: an account for each item of stores, posted from invoices, goods received notes and material requisitions; shows receipt, issue and balance in quantity and value.
3. **Work-in-process ledger** (job ledger): accounts of unfinished jobs and processes; all material costs, wages and overheads for each job are posted to its job account.
4. **Finished goods ledger**: an account for each finished product or completed job; a transfer to stock is credited in the work-in-process ledger and debited here.

### The principal accounts

What each control account in the cost ledger records (SM 7.3–7.5):

| Account | Debited with | Credited with |
|---|---|---|
| 1. Cost Ledger Control A/c (General Ledger Adjustment A/c) | Sales; costing loss | All items of expenditure; costing profit (from Costing P&L) |
| 2. Stores Ledger Control A/c | Purchase of materials; abnormal gain (to Costing P&L) | Issues; abnormal loss to Costing P&L |
| 3. Wages Control A/c | Total wages paid, direct and indirect | Direct wages to WIP; indirect wages to the overhead controls; abnormal idle time wages to Costing P&L |
| 4. Production Overhead Control A/c | Indirect material, employee cost and expenses (carriage inward etc.) | Overhead recovered (absorbed); the difference to Overhead Adjustment A/c |
| 5. Work-in-Process Control A/c | Direct materials, direct employee cost, direct expenses, production overhead recovered | Finished goods completed and transferred |
| 6. Administrative Overhead Control A/c | Overheads incurred | Overhead recovered (to Finished Goods if production-related, else to Cost of Sales); the difference to Overhead Adjustment A/c |
| 7. Finished Goods Control A/c | Goods from WIP; administration overhead recovered if production-related | Cost of Sales A/c |
| 8. Selling and Distribution Overhead Control A/c | Overheads incurred | Overheads recovered; the difference usually to Overhead Adjustment A/c |
| 9. Cost of Sales A/c | Finished goods sold; general administration and S&D overhead recovered | Balance to Sales A/c or Costing P&L A/c |
| 10. Costing Profit & Loss A/c | Cost of sales; under-absorbed overheads; abnormal losses | Sales; over-absorbed overheads; abnormal gains; the net profit or loss goes to the Cost Ledger Control A/c |
| 11. Overhead Adjustment A/c | Under-recovery of overhead | Over-recovery of overhead; net balance to Costing P&L |

The balances mean something. Stores Ledger Control shows the total of all individual stores accounts; WIP Control the total of the jobs in process; Finished Goods Control the goods unsold; the **Cost Ledger Control A/c** ==the net total of all the balances of the impersonal accounts== (SM 7.4–7.5). The Overhead Adjustment A/c is sometimes dispensed with, and under- or over-absorbed overheads are transferred straight to the Costing P&L A/c (SM 7.5). Abnormal idle time and abnormal losses follow [[cma.emp.idle|idle time]] and [[cma.oh.underover|under- and over-absorption]].

::: diagram Non-integrated accounting system: how costs flow through the control accounts
{"type": "graph", "w": 440, "h": 500, "nodes": [{"id": "m", "label": "Materials", "x": 220, "y": 40, "shape": "square", "fill": "a"}, {"id": "w", "label": "Wages", "x": 70, "y": 125, "shape": "square", "fill": "a"}, {"id": "wip", "label": "Work-in-\nProcess", "x": 220, "y": 125, "shape": "square", "fill": "b"}, {"id": "p", "label": "Production\noverhead", "x": 370, "y": 125, "shape": "square", "fill": "c"}, {"id": "a", "label": "Admin.\noverhead", "x": 70, "y": 215, "shape": "square", "fill": "c"}, {"id": "fg", "label": "Finished\ngoods", "x": 220, "y": 215, "shape": "square", "fill": "b"}, {"id": "cg", "label": "Cost of\ngoods sold", "x": 220, "y": 305, "shape": "square", "fill": "b"}, {"id": "sd", "label": "S & D\noverhead", "x": 370, "y": 395, "shape": "square", "fill": "c"}, {"id": "cs", "label": "Cost of\nsales", "x": 220, "y": 395, "shape": "square", "fill": "b"}, {"id": "pl", "label": "Costing\nP & L", "x": 220, "y": 475, "shape": "square", "fill": "g"}], "edges": [{"from": "m", "to": "wip"}, {"from": "w", "to": "wip"}, {"from": "p", "to": "wip"}, {"from": "wip", "to": "fg"}, {"from": "a", "to": "fg"}, {"from": "fg", "to": "cg"}, {"from": "cg", "to": "cs"}, {"from": "sd", "to": "cs"}, {"from": "cs", "to": "pl"}], "caption": "Each box is a control account. Blue: materials and wages; amber: the three overhead controls; teal: the product's path from WIP to cost of sales; green: the Costing P&L. Administration overhead joins finished goods when it relates to production; general administration joins cost of sales instead. Based on the flowchart at SM 7.9."}
:::

### The journal entries

ICAI's scheme of entries in the cost books (SM 7.6–7.9). "CLC" is the Cost Ledger Control A/c.

| Transaction | Debit | Credit |
|---|---|---|
| (a) Materials purchased (cash or credit) | Material Control, then Stores Ledger Control (or Stores Ledger Control directly) | CLC (Material Control in the second step) |
| (b) Purchased for a special job | WIP Ledger Control | CLC |
| (c) Returned to vendor | CLC | Stores Ledger Control |
| (d) Direct material issued; indirect material issued | WIP Control; Production OH Control | Stores Ledger Control |
| (e) Returned from shop to stores; transferred Job 1 to Job 2 | Stores Ledger Control; Job 2 | WIP Control; Job 1 |
| (f) Issued for repairs | Production OH Control | Stores Ledger Control |
| (g) Wages paid | Wages Control | CLC |
| (h)–(j) Indirect wages: production, administration, selling | Production, Administration, S&D OH | Wages Control |
| (k) Direct expenses for a job | Job (WIP Control) | CLC |
| (l)–(m) Overheads incurred; carriage inward | Production, Administrative, S&D OH Control | CLC |
| (n) Production overhead recovered | WIP Ledger Control | Production OH Control |
| (o)–(p) Administration recovered from finished goods; S&D recovered from sales | Cost of Sales | Administrative OH; S&D OH Control |
| (q) Under-recovery of overheads | Costing P&L | the overhead control |
| (r) Over-recovery of overheads | the overhead control | Costing P&L |
| (s) Sales | CLC | Costing P&L |
| (t) Profit; (u) loss | Costing P&L; CLC | CLC; Costing P&L |

Every entry that involves the outside world, purchases, payments, sales, the final profit, touches the CLC. Entries between two cost accounts never do.

Entry (o) as printed debits Cost of Sales with the administrative overhead recovered. When the administrative overhead relates to production, principal account (6) sends the recovery to the Finished Goods Control A/c instead, and Illustration 2 does exactly that: ₹52,900 to Finished Goods, ₹14,800 to Cost of Sales (SM 7.4, 7.17). Follow the question's wording ("allocated to production", "absorbed in cost of sales").

### The integrated system

::: definition Integrated (integral) accounts
A system of accounting whereby cost and financial accounts are kept in the same set of books. There are no separate sets of books for costing and financial records. Integrated accounts meet fully the information requirement for costing as well as for financial accounts. (SM 7.19)
:::

**Advantages** (SM 7.20):

1. **No need for reconciliation**: there is only one figure of profit.
2. **Less efforts**: one set of books means a significant saving in efforts.
3. **Less time consuming**: no delay in obtaining information, as it is provided from books of original entry.
4. **Economical process**: it is based on the concept of "centralisation of accounting function".

**Essential pre-requisites** (SM 7.20):

1. The management's decision about the extent of integration of the two sets of books: some integrate up to prime cost or factory cost, others fully.
2. A suitable coding system serving the purposes of both financial and cost accounts.
3. An agreed routine for the treatment of provision for accruals, prepaid expenses and other adjustments for interim accounts.
4. Perfect coordination between the staff responsible for the financial and cost aspects of the accounts, and efficient processing of accounting documents.

There is no separate cost ledger, but there are subsidiary ledgers: besides the customers' ledger and the purchase ledger, a stores ledger, a stock ledger and a job ledger (SM 7.20).

**Features** (SM 7.21): (a) complete analysis of cost and sales is kept; (b) complete details of all payments in cash are kept; (c) complete details of all assets and liabilities are kept, and the system does not use a notional account to represent all impersonal accounts. The Cost Ledger Control A/c is replaced by the **bank account, receivables (debtors), payables (creditors), provision for depreciation, fixed assets and share capital** accounts (SM 7.21).

## Formats and formulas

*Reproduce the two-sided control account and the cost-ledger trial balance from memory: ICAI asks for both, and for "what each balance represents".*

::: cols Stores Ledger Control Account (format)
| Dr. | ₹ |
|---|---:|
| To Balance b/d | xxx |
| To Cost Ledger Control A/c (purchases) | xxx |
| To WIP Control A/c (returns from shop) | xxx |
---
| Cr. | ₹ |
|---|---:|
| By WIP Control A/c (direct issues) | xxx |
| By Production OH Control A/c (indirect issues) | xxx |
| By Cost Ledger Control A/c (returns to vendor) | xxx |
| By Balance c/d | xxx |
:::

**Trial balance of the cost ledger**: debit balances are Stores Ledger Control, WIP Control and Finished Goods Control (plus any overhead control left open with an under-absorbed balance, and the Cost of Sales A/c if it has not been closed to Costing P&L, as in Illustration 1, SM 7.14); the credit balance is the Cost Ledger Control A/c (plus any over-absorbed balance). The Cost Ledger Control balance equals the net of all the others.

**Missing figures in incomplete control accounts** (SM 7.28–7.30, 7.51–7.53):

| To find | Use |
|---|---|
| Materials purchased | Payments to creditors + closing creditors − opening creditors |
| Cost of goods completed | Cost of goods sold + closing finished goods − opening finished goods |
| Overhead applied | Hours worked × predetermined rate (budgeted overheads ÷ budgeted hours) |
| Closing WIP | Materials + labour hours × wage rate + labour hours × overhead rate, for the unfinished jobs |
| Materials consumed | Balancing figure of the WIP Control A/c |
| Closing stores | Opening stores + purchases − materials consumed |

## Worked examples

::::: example The samosa factory's quarter in the cost ledger
Tapri's samosa factory keeps a cost ledger not integrated with the financial accounts. Balances on 1 July: Stores Ledger Control ₹2,40,000 (Dr), WIP Control ₹80,000 (Dr), Finished Goods Control ₹1,60,000 (Dr) and Cost Ledger Control ₹4,80,000 (Cr). Transactions for the quarter:

| Particulars | ₹ |
|---|---:|
| Materials purchased | 5,20,000 |
| Materials returned to suppliers | 12,000 |
| Materials issued to production | 4,60,000 |
| Materials issued to factory maintenance | 18,000 |
| Wages paid (direct ₹2,20,000; indirect factory ₹80,000) | 3,00,000 |
| Other production overheads incurred | 1,40,000 |
| Production overheads absorbed | 2,60,000 |
| Administrative overheads incurred; absorbed in cost of sales | 60,000; 55,000 |
| Selling and distribution overheads incurred; recovered on sales | 45,000; 50,000 |
| Finished goods produced (works cost) | 9,40,000 |
| Finished goods sold (works cost) | 9,00,000 |
| Sales | 12,50,000 |

Under- or over-absorbed overheads are transferred to the Costing P&L A/c.

**Required:**

(i) Pass journal entries in the cost books.

(ii) Prepare the Production Overhead Control A/c, the Costing P&L A/c and the Cost Ledger Control A/c.

(iii) Prepare the trial balance on 30 September and state what each balance represents.

:::: answer Show the working
**(i) Journal entries**

| Particulars | Dr. (₹) | Cr. (₹) |
|---|---:|---:|
| Stores Ledger Control A/c Dr. / To Cost Ledger Control A/c (purchases) | 5,20,000 | 5,20,000 |
| Cost Ledger Control A/c Dr. / To Stores Ledger Control A/c (returns) | 12,000 | 12,000 |
| WIP Control A/c Dr. / To Stores Ledger Control A/c (direct issues) | 4,60,000 | 4,60,000 |
| Production OH Control A/c Dr. / To Stores Ledger Control A/c (maintenance) | 18,000 | 18,000 |
| Wages Control A/c Dr. / To Cost Ledger Control A/c (wages paid) | 3,00,000 | 3,00,000 |
| WIP Control A/c Dr. / To Wages Control A/c (direct wages) | 2,20,000 | 2,20,000 |
| Production OH Control A/c Dr. / To Wages Control A/c (indirect wages) | 80,000 | 80,000 |
| Production OH Control A/c Dr. / To Cost Ledger Control A/c | 1,40,000 | 1,40,000 |
| Administrative OH Control A/c Dr. / To Cost Ledger Control A/c | 60,000 | 60,000 |
| S&D OH Control A/c Dr. / To Cost Ledger Control A/c | 45,000 | 45,000 |
| WIP Control A/c Dr. / To Production OH Control A/c (absorbed) | 2,60,000 | 2,60,000 |
| Finished Goods Control A/c Dr. / To WIP Control A/c | 9,40,000 | 9,40,000 |
| Cost of Sales A/c Dr. / To Finished Goods Control A/c | 9,00,000 | 9,00,000 |
| Cost of Sales A/c Dr. / To Administrative OH Control A/c | 55,000 | 55,000 |
| Cost of Sales A/c Dr. / To S&D OH Control A/c | 50,000 | 50,000 |
| Cost Ledger Control A/c Dr. / To Costing P&L A/c (sales) | 12,50,000 | 12,50,000 |
| Costing P&L A/c Dr. / To Cost of Sales A/c | 10,05,000 | 10,05,000 |
| Production OH Control A/c Dr. / To Costing P&L A/c (over-absorbed) | 22,000 | 22,000 |
| Costing P&L A/c Dr. / To Administrative OH Control A/c (under-absorbed) | 5,000 | 5,000 |
| S&D OH Control A/c Dr. / To Costing P&L A/c (over-recovered) | 5,000 | 5,000 |
| Costing P&L A/c Dr. / To Cost Ledger Control A/c (profit) | 2,67,000 | 2,67,000 |

**(ii) Accounts**

::: cols Production Overhead Control A/c
| Dr. | ₹ |
|---|---:|
| To Stores Ledger Control A/c | 18,000 |
| To Wages Control A/c | 80,000 |
| To Cost Ledger Control A/c | 1,40,000 |
| To Costing P&L A/c (over-absorbed) | 22,000 |
| **Total** | **2,60,000** |
---
| Cr. | ₹ |
|---|---:|
| By WIP Control A/c (absorbed) | 2,60,000 |
| **Total** | **2,60,000** |
:::

::: cols Costing Profit & Loss A/c
| Dr. | ₹ |
|---|---:|
| To Cost of Sales A/c | 10,05,000 |
| To Administrative OH Control A/c (under-absorbed) | 5,000 |
| To Cost Ledger Control A/c (profit) | 2,67,000 |
| **Total** | **12,77,000** |
---
| Cr. | ₹ |
|---|---:|
| By Cost Ledger Control A/c (sales) | 12,50,000 |
| By Production OH Control A/c (over-absorbed) | 22,000 |
| By S&D OH Control A/c (over-recovered) | 5,000 |
| **Total** | **12,77,000** |
:::

Working: cost of sales = ₹9,00,000 + ₹55,000 + ₹50,000 = ₹10,05,000.

::: cols Cost Ledger Control A/c
| Dr. | ₹ |
|---|---:|
| To Stores Ledger Control A/c (returns) | 12,000 |
| To Costing P&L A/c (sales) | 12,50,000 |
| To Balance c/d | 5,50,000 |
| **Total** | **18,12,000** |
---
| Cr. | ₹ |
|---|---:|
| By Balance b/d | 4,80,000 |
| By Stores Ledger Control A/c | 5,20,000 |
| By Wages Control A/c | 3,00,000 |
| By Production OH Control A/c | 1,40,000 |
| By Administrative OH Control A/c | 60,000 |
| By S&D OH Control A/c | 45,000 |
| By Costing P&L A/c (profit) | 2,67,000 |
| **Total** | **18,12,000** |
:::

**(iii) Trial balance as on 30 September**

| Particulars | Dr. (₹) | Cr. (₹) | What the balance represents |
|---|---:|---:|---|
| Stores Ledger Control A/c | 2,70,000 | | Materials in stores |
| WIP Control A/c | 80,000 | | Jobs in process |
| Finished Goods Control A/c | 2,00,000 | | Finished goods unsold |
| Cost Ledger Control A/c | | 5,50,000 | Net of all the cost ledger balances |
| **Total** | **5,50,000** | **5,50,000** | |

Workings: stores = 2,40,000 + 5,20,000 − 12,000 − 4,60,000 − 18,000; WIP = 80,000 + 4,60,000 + 2,20,000 + 2,60,000 − 9,40,000; finished goods = 1,60,000 + 9,40,000 − 9,00,000.
::::
:::::

:::: example The kulhad workshop, integrated
Tapri's kulhad workshop operates an integrated system of accounting. Transactions for the year:

| Particulars | ₹ |
|---|---:|
| Raw materials purchased (60% on credit) | 4,00,000 |
| Materials issued to production | 3,20,000 |
| Wages paid (one-third indirect) | 1,80,000 |
| Wages charged to production | 1,20,000 |
| Factory overheads incurred (paid) | 70,000 |
| Factory overheads charged to production | 1,25,000 |
| Selling and distribution overheads incurred (paid) | 30,000 |
| Finished goods at cost | 5,65,000 |
| Sales (75% on credit) | 7,20,000 |
| Receipts from debtors | 3,00,000 |
| Payments to creditors | 2,00,000 |

There is no opening stock, and no work-in-process or finished goods remain at the year-end; under- or over-absorbed overhead goes to the Costing P&L A/c.

**Required:**

(i) Pass the journal entries (narrations not required).

(ii) State which entries would not appear, and how the others would change, if the books were not integrated.

::: answer Show the working
**(i) Journal entries**

| Particulars | Dr. (₹) | Cr. (₹) |
|---|---:|---:|
| Stores Ledger Control A/c Dr. | 4,00,000 | |
| To Payables (Creditors) A/c | | 2,40,000 |
| To Bank A/c | | 1,60,000 |
| WIP Control A/c Dr. / To Stores Ledger Control A/c | 3,20,000 | 3,20,000 |
| Wages Control A/c Dr. / To Bank A/c | 1,80,000 | 1,80,000 |
| Factory OH Control A/c Dr. / To Wages Control A/c (indirect, one-third) | 60,000 | 60,000 |
| WIP Control A/c Dr. / To Wages Control A/c | 1,20,000 | 1,20,000 |
| Factory OH Control A/c Dr. / To Bank A/c | 70,000 | 70,000 |
| WIP Control A/c Dr. / To Factory OH Control A/c | 1,25,000 | 1,25,000 |
| S&D OH Control A/c Dr. / To Bank A/c | 30,000 | 30,000 |
| Finished Goods Control A/c Dr. / To WIP Control A/c | 5,65,000 | 5,65,000 |
| Cost of Sales A/c Dr. | 5,95,000 | |
| To Finished Goods Control A/c | | 5,65,000 |
| To S&D OH Control A/c | | 30,000 |
| Receivables (Debtors) A/c Dr. | 5,40,000 | |
| Bank A/c Dr. | 1,80,000 | |
| To Sales A/c | | 7,20,000 |
| Costing P&L A/c Dr. / To Factory OH Control A/c (under-absorbed: 1,30,000 − 1,25,000) | 5,000 | 5,000 |
| Bank A/c Dr. / To Receivables (Debtors) A/c | 3,00,000 | 3,00,000 |
| Payables (Creditors) A/c Dr. / To Bank A/c | 2,00,000 | 2,00,000 |

**(ii)** Without integration, the receipts from debtors and payments to creditors would not appear in the cost books at all: they touch only financial accounts. In the purchase, the wages paid and the two overheads paid, the credit to Payables or Bank would be a credit to the **Cost Ledger Control A/c**. Sales would be recorded as Cost Ledger Control A/c Dr. / To Costing P&L A/c. Entries between cost accounts (issues, absorption, transfers to finished goods and cost of sales, the under-absorption) are the same in both systems.
:::
::::

:::: example Bunty's chai spill
On an audit visit from Iyer & Associates, Bunty knocked a cup of chai over the cost ledger of Tapri's premix plant for September. What survives:

| Particulars | ₹ |
|---|---:|
| Stores Ledger Control A/c, 1 September | 60,000 (Dr) |
| WIP Control A/c, 1 September | 12,000 (Dr) |
| Finished Goods Control A/c, 1 September; 30 September | 90,000; 1,02,000 |
| Creditors for purchases, 1 September; 30 September | 40,000; 25,000 (Cr) |
| Payments to creditors in September | 1,35,000 |
| Factory overheads actually incurred (all posted) | 1,26,500 |
| Cost of goods sold in September | 4,10,000 |

Factory overheads are applied at a budgeted rate per direct labour hour: budgeted overheads for the year ₹14,40,000 and budgeted hours 36,000. Workers worked 3,000 direct labour hours in September at ₹60 an hour. On 30 September one job was unfinished: ₹9,000 of direct materials and 200 direct labour hours had been charged to it.

**Required:** Find (a) materials purchased; (b) cost of goods completed; (c) overheads applied; (d) closing WIP; (e) direct materials consumed; (f) closing stores balance; (g) the under- or over-absorbed overhead.

::: answer Show the working
**Working note:** overhead rate = ₹14,40,000 ÷ 36,000 hours = ₹40 per direct labour hour; wages charged = 3,000 × ₹60 = ₹1,80,000.

| Item | Working | ₹ |
|---|---|---:|
| (a) Materials purchased | 1,35,000 + 25,000 − 40,000 | 1,20,000 |
| (b) Cost of goods completed | 4,10,000 + 1,02,000 − 90,000 | 4,22,000 |
| (c) Overheads applied | 3,000 hours × ₹40 | 1,20,000 |
| (d) Closing WIP | 9,000 + (200 × ₹60) + (200 × ₹40) | 29,000 |
| (e) Materials consumed | Balancing figure in WIP Control (below) | 1,39,000 |
| (f) Closing stores | 60,000 + 1,20,000 − 1,39,000 | 41,000 |
| (g) Under-absorbed overhead | 1,26,500 − 1,20,000, to Costing P&L | 6,500 |

**WIP Control A/c:** debits: balance b/d ₹12,000 + wages ₹1,80,000 + overheads ₹1,20,000 + materials consumed (balancing figure) ₹1,39,000 = ₹4,51,000; credits: finished goods ₹4,22,000 + balance c/d ₹29,000 = ₹4,51,000.
:::
::::

## Under the hood

### Material Control and Stores Ledger Control

ICAI's first purchase entry goes through two accounts: Material Control A/c Dr. / To Cost Ledger Control, then Stores Ledger Control Dr. / To Material Control. "Sometimes Material Control Account is dispensed with" and the purchase is debited to Stores Ledger Control directly (SM 7.6); the September 2025 suggested answer accepted both. The two names are used for the same account in Illustration 2 (SM 7.16).

### Stock gains, transfers between batches and non-productive time

ICAI's Illustration 4, on an integrated batch-costing system (SM 7.24–7.27), settles three points: materials transferred between batches do not affect the control accounts; non-productive time of direct workers is a production overhead, not charged to WIP; and when the physical value of closing WIP exceeds the book balance, the excess is a stock gain credited to the Costing P&L A/c. Its opening prepaid production overhead is simply a debit balance brought forward in the Production Overhead Control A/c.

## Exam angle

::: exam How ICAI asked this, May 2024 to September 2026
In the documents read for this lesson, cost accounting systems (other than the reconciliation) appeared in 6 questions:

- **Journal entries, non-integrated**: September 2025 Q4(b), 5 marks: materials purchased on credit, materials issued, direct wages allocated, factory overheads over-absorbed, administration overheads under-absorbed. The answer showed both forms of the purchase entry (via Material Control, or straight to Stores Ledger Control).
- **Ledgers**: MTP May 2024 Series I Q3(a), 4 marks: "What are the important ledgers to be maintained under non-integrated accounting system?" (the four ledgers of SM 7.3).
- **Pre-requisites**: MTP September 2024 Series I Q6(c), 4 marks: "What are the essential pre-requisites for integrated accounts?"
- **Reconciliation under integration**: RTP May 2024 Q13(a): "Is reconciliation of cost accounts and financial accounts necessary in case of integrated accounting system?" ICAI's answer: one set of books, so no.
- **Integrated control accounts**: RTP May 2025 Q12: Amy Ltd's batch costing fully integrated with the financial accounts; prepare six accounts from Stores Ledger Control to Costing P&L, with non-productive time and a physical WIP value.
- **MCQ**: RTP September 2025 MCQ 4: the journal entry for overheads incurred (Production and Administrative OH Control Dr. / To Cost Ledger Control A/c).
:::

::: exam The traps
- Under a non-integrated system nothing is credited to Bank or Creditors: the credit goes to the Cost Ledger Control A/c (SM MCQ 5: purchases are debited to Material or Stores Ledger Control).
- Materials bought for a special job go straight to WIP (job) A/c, and returns to vendor are a debit to the Cost Ledger Control A/c (SM MCQs 6 and 7).
- Notional costs may be included in non-integrated accounts (SM MCQ 2); the cost ledger can carry them because it is separate.
- Over-absorbed: debit the overhead control, credit Costing P&L; under-absorbed: the reverse (September 2025 Q4(b)).
:::

::: trick Does it cross the border?
For each transaction ask: does it involve anything kept only in the financial books (cash, bank, debtors, creditors, sales, the final profit)? If yes, one side of the entry is the Cost Ledger Control A/c in a non-integrated system, or that real account in an integrated one. If no, both sides are cost accounts and the entry is identical in both systems. Condition: the cost ledger in question records the item at all (purely financial items such as interest are not recorded in the cost ledger).
:::

## Answer frame

### "Distinguish between integrated and non-integrated accounting systems"

::: compare
| Point | Non-integrated system | Integrated system |
|---|---|---|
| Books | Separate ledgers for cost and financial accounts (SM 7.2) | Cost and financial accounts in the same set of books (SM 7.19) |
| Linking account | Cost Ledger Control A/c (General Ledger Adjustment A/c) completes the double entry (SM 7.3) | No notional account; bank, debtors, creditors, provision for depreciation, fixed assets and share capital accounts used instead (SM 7.21) |
| Coverage | Only transactions relating to the product or service; excludes purely financial items and balance sheet items (SM 7.2–7.3) | Complete analysis of cost and sales; complete details of cash payments, assets and liabilities (SM 7.21) |
| Profit | Two profits; reconciliation necessary (SM 7.2) | One profit; no reconciliation (SM 7.2, 7.20) |
| Effort | Two sets of books to maintain | Less effort, less time, economical: centralisation of accounting function (SM 7.20) |
:::

### Other questions, in ICAI's order

- **Ledgers under non-integrated accounts** (4 marks): cost ledger, stores ledger, work-in-process ledger, finished goods ledger, each with ICAI's one-line description.
- **Advantages of integrated accounts**: no need for reconciliation; less efforts; less time consuming; economical process.
- **Essential pre-requisites**: extent of integration; suitable coding system; agreed routine for accruals, prepaid expenses and adjustments; perfect coordination between cost and financial staff.

## Common mistakes

::: mistake Hall of Shame: the bank account in the cost ledger
"Wages Control A/c Dr. / To Bank A/c" in a non-integrated answer. **Fix:** the cost ledger has no bank account; the credit is the Cost Ledger Control A/c. Bank appears only when the books are integrated.
:::

::: mistake Receipts from debtors in the cost books
Recording receipts from debtors or payments to creditors in a non-integrated cost ledger. **Fix:** these touch only financial accounts and are not recorded at all; in integrated accounts they are Bank Dr. / To Receivables, and Payables Dr. / To Bank.
:::

::: mistake Under- and over-absorption the wrong way round
Crediting the overhead control when overhead was over-absorbed. **Fix:** over-absorbed means the control has a credit balance (absorbed > incurred); close it by debiting the control and crediting Costing P&L. Under-absorbed: Costing P&L Dr. / To the control.
:::

::: mistake Non-productive time charged to WIP
**Fix:** non-productive (idle) time of direct workers is a production overhead: debit Production OH Control, not WIP (SM 7.27); abnormal idle time goes to Costing P&L (SM 7.4).
:::

## Practice

::: quiz Check yourself
Q: A cost ledger (non-integrated) has these closing balances: Stores Ledger Control ₹1,85,000 (Dr), WIP Control ₹62,000 (Dr), Finished Goods Control ₹1,48,000 (Dr) and Production Overhead Control ₹9,000 (Cr, over-absorbed, not yet transferred). What is the balance of the Cost Ledger Control A/c (₹)?
= 386000
> The CLC balances the ledger: Dr balances 1,85,000 + 62,000 + 1,48,000 = 3,95,000, less the 9,000 credit balance = ₹3,86,000, a credit balance.

Q: Case scenario. Ritu's cost ledger is not integrated with Dev's financial books. The samosa factory buys packing film worth ₹48,000 on credit specially for an export job. Which entry appears in the cost books?
- [ ] Stores Ledger Control A/c Dr. / To Creditors A/c ₹48,000
- [x] WIP (Export Job) A/c Dr. / To Cost Ledger Control A/c ₹48,000
- [ ] Material Control A/c Dr. / To Bank A/c ₹48,000
- [ ] Cost Ledger Control A/c Dr. / To WIP (Export Job) A/c ₹48,000
> Purchases for a special job go straight to the job (WIP) account; in a non-integrated ledger the credit is the Cost Ledger Control A/c, never Creditors or Bank (SM 7.6).

Q: Which of the following replace the Cost Ledger Control A/c in an integrated system? Select all that apply.
- [x] Bank account
- [x] Payables (creditors) account
- [x] Provision for depreciation account
- [ ] Overhead Adjustment account
> SM 7.21 lists bank, receivables, payables, provision for depreciation, fixed assets and share capital. The Overhead Adjustment A/c is a cost account found in both systems.

Q: Production overheads incurred are ₹2,38,000 and absorbed ₹2,60,000; the balance is transferred to Costing P&L. Which entry is correct?
- [ ] Costing P&L A/c Dr. / To Production OH Control A/c ₹22,000
- [x] Production OH Control A/c Dr. / To Costing P&L A/c ₹22,000
- [ ] WIP Control A/c Dr. / To Production OH Control A/c ₹22,000
- [ ] Production OH Control A/c Dr. / To Cost Ledger Control A/c ₹22,000
> Absorbed exceeds incurred by ₹22,000: over-absorbed, a credit balance in the control. Close it by debiting the control and crediting Costing P&L.

Q: Which is NOT an essential pre-requisite of integrated accounts in the Study Material?
- [ ] A decision about the extent of integration
- [ ] A suitable coding system
- [x] A Cost Ledger Control A/c to make the cost ledger self-balancing
- [ ] Perfect coordination between cost and financial staff
> The Cost Ledger Control A/c belongs to the non-integrated system; integrated accounts have no separate cost ledger and use the real accounts (bank, debtors, creditors) instead. The other three are among ICAI's four pre-requisites (SM 7.20).
:::

## Recap

- Non-integrated: separate cost ledger; records only product-related transactions; excludes purely financial items and balance sheet items.
- Cost Ledger Control A/c (General Ledger Adjustment A/c): credited with all expenditure, debited with sales, receives the costing profit; its balance is the net of all impersonal account balances.
- Four ledgers: cost ledger, stores ledger, work-in-process (job) ledger, finished goods ledger.
- Over-absorbed: overhead control Dr. / To Costing P&L; under-absorbed: the reverse; Overhead Adjustment A/c may be dispensed with.
- Integrated: one set of books; bank, debtors, creditors, provision for depreciation, fixed assets, share capital replace the CLC.
- Advantages: no reconciliation, less effort, less time, economical. Pre-requisites: extent of integration, coding system, agreed routine for accruals, coordination of staff.
- Incomplete records: purchases from creditors; goods completed from finished goods; materials consumed as the WIP balancing figure. (No bank account in the embassy.)

## Flashcards

Q:: Under the non-integrated system, which account completes the double entry, and what else is it called?
A:: The Cost Ledger Control Account, also known as the General Ledger Adjustment Account.

Q:: Cost Ledger Control A/c: what is debited and credited to it, and what does its balance represent?
A:: Credited with all items of expenditure; debited with sales; the costing profit or loss is transferred to it. Its balance is the net total of all the balances of the impersonal accounts.

Q:: The four important ledgers under the non-integrated system?
A:: Cost ledger, stores ledger, work-in-process (job) ledger, finished goods ledger.

Q:: Non-integrated system: journal entry for materials returned to the vendor?
A:: Cost Ledger Control A/c Dr. / To Stores Ledger Control A/c.

Q:: Non-integrated system: journal entry for materials purchased for a special job?
A:: Work-in-Process (Job) Ledger Control A/c Dr. / To Cost Ledger Control A/c.

Q:: Journal entry for over-absorbed production overhead transferred to Costing P&L?
A:: Production Overhead Control A/c Dr. / To Costing Profit & Loss A/c.

Q:: Four advantages of integrated accounts?
A:: No need for reconciliation; less efforts; less time consuming; economical process (centralisation of accounting function).

Q:: Four essential pre-requisites for integrated accounts?
A:: Management's decision on the extent of integration; a suitable coding system; an agreed routine for accruals, prepaid expenses and other adjustments; perfect coordination between cost and financial staff.

Q:: Which accounts replace the Cost Ledger Control A/c in integrated accounts?
A:: Bank, receivables (debtors), payables (creditors), provision for depreciation, fixed assets and share capital accounts.

Q:: Integrated accounts: entry for credit sales?
A:: Receivables (Debtors) A/c Dr. / To Sales A/c.

Q:: Incomplete control accounts: how are materials purchased found from the creditors' data?
A:: Payments to creditors + closing creditors − opening creditors.
