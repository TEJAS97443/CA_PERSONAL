## Unit 3 — Methods of Costing

The method follows the shape of the output: identical continuous units give **unit costing**,
customer orders give **job costing**, identifiable lots give **batch costing**, a continuous
sequence of operations whose output cannot be told apart gives **process or operation costing**, and
an intangible output gives **service costing**.

### Single output or unit costing

One product, one cost unit — a tonne of cement, a thousand bricks, a litre of paint. The statement is
the cost sheet of Unit 1 carried down to cost of sales, with a cost-per-unit column beside the total
column. Where output comes in grades, it is converted into equivalent units of the standard grade
before dividing.

### Job costing

Each order is a cost object with its own **job cost card** or record in a job database: material from
stores requisitions at the issue price in force, wages from job cards, direct expenses as incurred,
and overhead at the absorption rate of each department the job passes through. The card totals to a
job cost, compared with the quotation to give profit on the job. It suits printing, repairs, one-off
construction and professional assignments — work done to customer specification, so no two cost
objects are alike.

### Batch costing

A batch is the cost unit while it is made, accumulated on a **batch cost sheet** and then divided by
good units produced to give cost per unit. **Spoiled work** within the normal rate is absorbed by the good units of the batch;
beyond it, the abnormal loss goes to Costing P&L. Rectification cost of **defectives** is added to
the batch when normal, and charged to Costing P&L when abnormal.

:::formula Economic Batch Quantity
@what: EOQ logic applied to production: the batch size minimising set-up plus carrying cost.
@formula: EBQ = sqrt( (2 x D x S) / C )
@terms: D = annual demand in units. S = set-up cost per batch. C = carrying cost per unit per annum.
@watch: S is set-up cost per *batch*, not per unit. On D = 24,000 units, S = ₹360 and C = ₹3, EBQ =
sqrt(57,60,000) = **2,400 units**, so 10 batches a year: set-up cost 10 x 360 = ₹3,600 and carrying
cost 1,200 x 3 = ₹3,600. Equal, as at the EOQ.
:::

### Process and operation costing

Cost is collected process by process in a **process account** and transferred on. Three loss
situations, and the whole topic turns on telling them apart:

- **Normal loss** — the expected, unavoidable loss. Its units are entered on the credit side at
  scrap or realisable value only, never at cost, so the cost of the lost units is borne by the good
  units. This is what raises cost per unit.
- **Abnormal loss** — actual loss beyond normal. Valued at the **full cost per good unit** and
  taken out of the process to the Abnormal Loss Account, which recovers scrap value and sends the
  balance to Costing P&L.
- **Abnormal gain** — actual loss less than normal. Valued at the same full cost per good unit,
  debited to the process and credited to the Abnormal Gain Account; that account is debited with
  the scrap value the entity failed to realise on the shortfall in normal loss, and the balance
  goes to Costing P&L.

:::formula Cost per good unit in a process
@formula: Cost per unit = (Total process cost − Scrap value of normal loss) / (Units introduced − Normal loss units)
@terms: Total process cost is material introduced plus the transfer from the previous process plus
wages plus production overhead. **Units introduced** means the whole input to that process, so for a
second or later process it is the units transferred in plus any material added there.
@watch: The denominator uses **expected** output, not actual. Compute the rate once and value output,
abnormal loss and abnormal gain at that same rate; a rate recomputed on actual output is the standard
error here.
:::

:::estimate Process account with normal and abnormal loss
@given: 10,000 units introduced at ₹5 each; direct wages ₹21,000; production overhead ₹12,000.
Normal loss is 10% of input with a scrap value of ₹2 a unit. Actual output is 8,700 units.
@ask: Compute cost per unit, prepare the process account in units and rupees, and show the Abnormal
Loss Account.
@work: Total cost = 50,000 + 21,000 + 12,000 = ₹83,000. Normal loss = 1,000 units, scrap ₹2,000.

Cost per unit = (83,000 − 2,000) / (10,000 − 1,000) = 81,000 / 9,000 = **₹9**.

Abnormal loss = 10,000 − 1,000 − 8,700 = **300 units**, valued at 300 x 9 = **₹2,700**. Output =
8,700 x 9 = **₹78,300**.

```text
PROCESS A ACCOUNT
Particulars           Units          ₹    Particulars           Units          ₹
To Material          10,000     50,000    By Normal loss         1,000      2,000
To Direct wages           —     21,000    By Abnormal loss         300      2,700
To Production o/h         —     12,000    By Transfer to next
                                            process              8,700     78,300
                     ------     ------                          ------     ------
                     10,000     83,000                          10,000     83,000

ABNORMAL LOSS ACCOUNT
To Process A A/c        300      2,700    By Cash (scrap 300 x 2)  300        600
                                          By Costing P&L A/c        —      2,100
                        ---      -----                            ---      -----
                        300      2,700                            300      2,700
```
@sanity: Both sides agree at 10,000 units and ₹83,000 — the check to run in the hall. The mirror
case: had output been 9,200 units, abnormal **gain** of 200 units would be valued at the same ₹9 =
₹1,800, the Abnormal Gain Account debited with the ₹400 scrap not realised, and ₹1,400 credited to
Costing P&L.
:::

**Equivalent units** convert part-finished work into finished-unit terms so that cost can be split
between output and closing work-in-progress, degree of completion being taken separately for
material, labour and overhead. With 8,000 units completed and 2,000 in closing WIP that are
complete for material but half complete for labour and overhead, equivalent units are 10,000 and
9,000; material of ₹1,00,000 gives ₹10 a unit and labour with overhead of ₹45,000 gives ₹5, so
output is 8,000 x ₹15 = ₹1,20,000 and closing WIP is (2,000 x 10) + (1,000 x 5) = ₹25,000. The two
add back to ₹1,45,000.

> **Verify:** whether your attempt's material works equivalent units on the **FIFO** or the
> **weighted average** basis where opening WIP exists — the two give different answers and the
> question usually names one. Confirm against the current Study Guidelines.

**Inter-process profit** arises where each process transfers output at cost plus a margin, so that
management can compare a process against an outside quotation. It complicates the accounts in one
specific way: the closing stock held in a later process contains **unrealised profit**, which must
be removed to state stock at cost. On a transfer price of ₹1,20,000 that includes ₹20,000 profit,
closing stock of ₹30,000 carries 30,000 x 20,000 / 1,20,000 = **₹5,000** of unrealised profit.

### Joint products and by-products

**Joint products** are two or more products of significant sales value produced together from the
same process; a **by-product** is of minor value beside the main product. The line between them is
relative sales value, and it decides the accounting.

Joint cost is apportioned up to the point of separation by **physical units**, **average unit
cost**, a **survey or weighted points** method scoring products by effort or technical difficulty,
**market value at separation**, **net realisable value** (market value after further processing less
that processing and selling cost), or **contribution margin**, splitting variable joint cost on
physical units and fixed joint cost on contribution. Cost incurred *after* separation is never
joint; it belongs to the product that incurred it.

By-products are handled by **non-cost methods** — net realisable value credited to the main process
cost, or by-product income shown as other income — or by **cost methods**, giving the by-product a
share of joint cost at standard cost, opportunity cost, or a reverse-cost calculation from its
selling price.

:::estimate Apportion joint cost on net realisable value
@given: Joint cost to the separation point ₹1,80,000. Product A: 3,000 kg selling at ₹90, further
processing ₹30,000. Product B: 2,000 kg selling at ₹90, further processing ₹20,000.
@ask: Apportion the joint cost on net realisable value.
@work: NRV of A = (3,000 x 90) − 30,000 = **₹2,40,000**; of B = (2,000 x 90) − 20,000 =
**₹1,60,000**. Total ₹4,00,000, so the ratio is **60:40**.

A takes 1,80,000 x 60% = **₹1,08,000**; B takes **₹72,000**.
@sanity: The shares add back to ₹1,80,000. Physical units would give 3,000:2,000 — 60:40 on these
figures by coincidence — but once further processing cost per kilogram differs the two bases
diverge, so read the question for the basis it wants.
:::

### Costing of service sectors

Service costing has no material or work-in-progress to speak of; the skill is choosing the **cost
unit** and building operating cost by element. Composite units are the core: tonne-kilometre,
passenger-kilometre, patient-day, room-day, kilowatt-hour. Cost is grouped into standing charges,
maintenance charges and running charges, and price is cost per unit plus the required margin.

:::think A lorry carries 10 tonnes for 40 km, then 6 tonnes for 60 km. What are the absolute and the commercial tonne-kilometres?
**Absolute** tonne-km weights each leg by its own load: (10 x 40) + (6 x 60) = 400 + 360 =
**760 tonne-km**. **Commercial** tonne-km uses the average load over the whole distance:
((10 + 6) / 2) x 100 = **800 tonne-km**. The absolute figure is the more accurate and gives the
higher cost per tonne-km; using the wrong one is a favourite one-mark trap.
:::

:::attempt Write the credit side of a process account where output is less than expected, naming every item and how each is valued.
Three items, each with its own valuation rule:

1. **Normal loss** — at scrap or realisable value only. Its units appear, its cost does not, which is
   how the loss gets absorbed by good output.
2. **Abnormal loss** — at full cost per good unit, from (total cost − normal loss scrap) / (input −
   normal loss units).
3. **Output transferred** — the balance of units, at that same rate.

Then check that units and rupees agree with the debit side. If they do not, the cause is usually
normal loss valued at cost, or a rate recomputed on actual rather than expected output. Where output
*exceeds* expectation there is no abnormal loss line and an **abnormal gain** appears on the
*debit* side at the same rate.
:::

:::key Normal loss is valued at scrap value; everything abnormal is valued at full cost per good unit.
That single sentence decides the process account, and the rate must come from expected output. Say
it before you start writing, and the account balances itself.
:::

:::trap Reducing the normal loss entry when there is an abnormal gain
An abnormal gain means fewer units were lost than expected, so less scrap was realised than the
normal-loss line assumes. The normal loss entry is **not** reduced; instead the Abnormal Gain Account
is debited with the scrap lost on the shortfall, and only the net balance reaches Costing P&L.
Netting it off inside the process account gives the right total in the wrong account.
:::
