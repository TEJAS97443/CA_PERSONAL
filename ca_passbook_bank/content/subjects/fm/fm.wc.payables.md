---
id: fm.wc.payables
title: Management of payables
minutes: 25
needs: fm.wc.basics
tags: trade credit, payables, creditors, cash discount, cost of not taking discount, spontaneous source of finance
labs:
summary: Trade credit as a spontaneous source of finance, its hidden costs and the costs of not using it, and how to price a supplier's cash discount: ICAI's simple and compound formulas and the refuse-or-accept comparison.
---

## In plain words

### "Free money", said Kesar

Tapri buys elaichi from a spice trader in Kochi on terms of 3% off if it pays within 15 days, otherwise the full amount within 60 days. Kesar always pays on day 60.

> **Kesar:** Trade credit is free money. The trader waits two months and charges nothing.
> **Dev:** He charges 3%. Whenever we skip the discount, we are borrowing ₹97 from him for 45 days and paying ₹3 for it.
> **Kesar:** 3% only. The bank charges 12%.
> **Dev:** The bank's 12% is for a year. His 3% is for 45 days. Same shop, very different price tag.

When a supplier delivers goods and lets you pay later, he is lending to you: that is **trade credit**, and the amount you owe him is a **payable** (a creditor). It arises on its own, out of ordinary buying, which is why it is called a **spontaneous** source of finance, and it often looks free.

It is free only when there is no discount for paying early. Once there is, every day you hold on to the supplier's money after the discount period costs you the discount. Turn that cost into a yearly rate and compare it with what your own money costs (the cash credit rate) or earns: if skipping the discount is dearer, pay early and take it; if it is cheaper, keep the cash and pay on the last day of the credit period, never later, because paying late costs goodwill and supplies.

Managing payables also means looking after the supplier. Slow payment creates ill-feeling, can disrupt supplies and spoils the firm's image.

::: analogy Two prices at the sweet shop
The halwai says: "₹97 today, or ₹100 when you settle your account in six weeks." Settling later is not free: you are paying ₹3 to keep ₹97 for six weeks. Six weeks fit into a year more than eight times, so that ₹3 is a very expensive loan, far dearer than a credit card.
:::

::: key
Trade credit costs nothing only when no discount is lost. When there is a cash discount, convert it into an annual rate for the extra days of credit and compare it with the cost (or return) of your own funds: take the discount when forgoing it is dearer; otherwise pay on the last day of credit.
:::

## How it works

### Why payables need managing

"If you can buy well then you can sell well": management of creditors and suppliers is just as important as the management of debtors (SM 9.98). **Trade creditor** is a spontaneous, short-term source of finance, in the sense that it arises from ordinary business transactions. But slow payment by you may create ill-feeling, your supplies could be disrupted, and it creates a bad image for your company; creditors are a vital part of effective cash management and should be managed carefully to enhance the cash position (SM 9.98). Used judiciously, trade credit reduces the burden that growth places on investment in working capital (SM 9.99).

Trade credit matters more than its informality suggests: ICAI says it contributes about one-third of the total short-term requirements, and credit obtained without much formality is called **open account trade credit** (SM 9.103). The other spontaneous sources, bills payable and accrued expenses, are in [[fm.wc.banking|financing of working capital and bank credit]].

### Both sides of the ledger: costs of availing and of not availing

ICAI lists the costs on each side (SM 9.98–9.99), and the lists are asked as they stand:

| Cost of availing trade credit | Cost of not taking trade credit |
|---|---|
| **Price**: the discount the firm forgoes, since it is available only for prompt payment; it can translate into a high implicit cost | **Impact of inflation**: borrowers gain over lenders, as a fixed amount paid later is worth less; later purchases are at higher prices anyway |
| **Loss of goodwill**: if credit is overstepped, suppliers may discriminate against delinquent customers when supplies are short; the effect depends on the relative market strengths | **Interest**: trade credit is a type of interest free loan, so failing to use it has an interest cost, higher when interest rates are higher |
| **Cost of managing**: administrative and accounting costs of managing creditors | **Inconvenience**: it may inconvenience a supplier geared to deferred payment |
| **Conditions**: suppliers may insist on a minimum order size, or on orders on a regular basis | |

### Pricing the discount: two formulas

The question is the cost of **not** taking the discount. ICAI gives the nominal annual cost first (SM 9.99):

$$\text{Nominal annual cost} = \frac{d}{100 - d} \times \frac{365 \text{ days}}{t}$$

That formula ignores compounding, so the true cost is higher still; the **cost of lost cash discount** is estimated by (SM 9.99):

$$\text{Cost of lost cash discount} = \left(\frac{100}{100 - d}\right)^{365/t} - 1$$

Here **d** is the size of the discount (for 6%, d = 6) and **t** is the reduction in the payment period, in days, necessary to obtain the early discount: days credit outstanding − discount period (SM 9.99).

Why d ÷ (100 − d) and not d ÷ 100? Because the money you keep by not paying early is the discounted amount (₹97 on ₹100), and the price of keeping it is the discount (₹3). And why t and not the whole credit period? Because the first 15 days are free either way; only the extra days are bought with the discount.

The price falls as the payment day moves out, which is the temptation to pay late. For the elaichi trader's 3/15 net 60:

::: diagram Cost of forgoing a 3% discount (3/15 net 60), by the day Tapri pays
{"type": "plot", "h": 300, "x": [30, 180], "y": [0, 120], "clip": true, "legend": "outside",
 "xlabel": "day of payment", "ylabel": "annual cost of forgoing (%)",
 "xticks": [[30, "30"], [60, "60"], [90, "90"], [120, "120"], [150, "150"], [180, "180"]],
 "yticks": [[0, "0"], [12, "12"], [28, "28"], [60, "60"], [90, "90"], [120, "120"]],
 "series": [
  {"label": "cost of lost discount (compound)", "fn": "(100/97)^(365/(x-15))*100-100", "color": "a"},
  {"label": "cash credit 12%", "fn": "12", "color": "mute", "dash": true},
  {"pts": [[60, 0], [60, 28.03]], "color": "d", "dash": true, "legend": false}],
 "points": [{"x": 60, "y": 28.03, "label": "due date: 28.03%", "pos": "right"}],
 "caption": "Blue: the compound cost of forgoing the discount, ((100 ÷ 97)^(365 ÷ (day − 15)) − 1). At the due date, day 60, it is 28.03%, far above the grey dashed 12% cash credit: take the discount. It sinks below 12% only after about day 113, long past the due date (orange dashed line): a figure reached only by stretching the supplier, at the price of his goodwill."}
:::

### The decision

::: diagram Take the discount or not?
{"type": "flow", "w": 430, "nodes": [
 {"id": "s", "kind": "start", "label": "Supplier offers d/x net y"},
 {"id": "c", "kind": "process", "label": "Annualise the discount for t = y − x days"},
 {"id": "q", "kind": "decision", "label": "Cost above the cost of funds?"},
 {"id": "a", "kind": "end", "label": "Pay by day x, take discount", "color": "ok"},
 {"id": "b", "kind": "end", "label": "Pay on day y, not later", "color": "c"}],
 "edges": [["s", "c"], ["c", "q"], ["q", "a", "yes"], ["q", "b", "no"]],
 "caption": "The cost of funds is the borrowing rate (if early payment needs a loan) or the return the cash would earn if kept. Green: take the discount; amber: use the full credit period."}
:::

ICAI's two illustrations make the two halves of the rule:

- **Compare like with like.** A 2% discount must not be compared with a 12% annual bank rate: the 2% is earned for a few days' earlier payment, while the 12% is for a year. Annualise the discount first (Illustration 18(a), SM 9.100–9.101).
- **If the discount is not taken, use the maximum credit period.** When bank finance is not available and the firm must rely on trade credit, it should pay on the last day of the credit period to reduce the annual cost (Illustration 18(b), SM 9.101).
- **The refuse-or-accept comparison.** For an invoice, compare the payment if the discount is accepted with the payment if it is refused, less the return from investing the discounted amount between the discount day and the due date (Illustration 17, SM 9.100). The layout is under Formats and formulas.

## Formats and formulas

*Reproduce both formulas and the comparison statement from memory.*

::: formula Nominal annual cost of not taking the discount (SM 9.99)
$$\frac{d}{100 - d} \times \frac{365 \text{ days}}{t}$$
d = size of the discount (for 6%, d = 6); t = days credit outstanding − discount period. Multiply by 100 for a percentage.
:::

::: formula Cost of lost cash discount, with compounding (SM 9.99)
$$\left(\frac{100}{100 - d}\right)^{365/t} - 1$$
Always above the nominal cost. Use 360 for 365 when the question says so.
:::

::: formula Funds needed to take a discount
$$\text{Average extra funds} = \text{Annual purchases} \qquad \times \left(1 - \frac{d}{100}\right) \times \frac{t}{365}$$
Paying t days earlier on every invoice ties up t days of discounted purchases. Net benefit = discount earned − cost of these funds.
:::

### The refuse-or-accept statement (ICAI Illustration 17 layout, SM 9.100)

| Particulars | Refuse discount (₹) | Accept discount (₹) |
|---|---:|---:|
| Payment to supplier | invoice value | invoice value × (1 − d%) |
| Less: return from investing the discounted amount between the discount day and the due date | (xxx) | — |
| **Net cost** | **xxx** | **xxx** |

The lower net cost wins. The return is on the discounted amount (₹98 out of ₹100), for t days, at the rate the firm can earn (or saves on borrowing).

::: definition Trade credit
A spontaneous source of finance normally extended to the purchaser organisation by the sellers or service providers; credit obtained without completing much formality is open account trade credit. (SM 9.103)
:::

::: definition t in the discount formulas
The reduction in the payment period in days, necessary to obtain the early discount, or days credit outstanding − discount period. (SM 9.99)
:::

## Worked examples

:::: example Four suppliers, one cash credit limit
Tapri's premix division buys from four suppliers. The unused limit on its cash credit, which costs 12% a year, is ₹90 lakh; the division has no other spare funds. Assume 365 days in a year.

| Supplier | Item | Terms | Annual purchases (₹) |
|---|---|---|---:|
| S | Packaging | 1.5/10 net 30 | 3,65,00,000 |
| P | Cardamom | 2/12 net 50 | 5,47,50,000 |
| Q | Milk powder | 1/15 net 45 | 4,38,00,000 |
| R | Sugar | 1/10 net 90 | 2,92,00,000 |

At present the division takes no discounts and pays every supplier on the last day of credit.

**Required:**

(i) Calculate the nominal annual cost and the cost of lost cash discount (compound) of not taking each supplier's discount.

(ii) If funds were unlimited at 12%, which discounts should the division take?

(iii) With only ₹90 lakh available, which discounts should it take, and what is the annual net benefit? Comment.

::: answer Show the working
**(i) Cost of not taking each discount**

| Supplier | d | t (days) | Nominal (%) | Compound (%) |
|---|---:|---:|---:|---:|
| S, 1.5/10 net 30 | 1.5 | 20 | 27.79 | 31.76 |
| P, 2/12 net 50 | 2 | 38 | 19.60 | 21.42 |
| Q, 1/15 net 45 | 1 | 30 | 12.29 | 13.01 |
| R, 1/10 net 90 | 1 | 80 | 4.61 | 4.69 |

For S: nominal = 1.5 ÷ 98.5 × 365 ÷ 20 = 27.79%; compound = (100 ÷ 98.5)^(365 ÷ 20) − 1 = 31.76%. The others follow in the same way.

**(ii) Unlimited funds at 12%.** Take the discounts whose cost of forgoing exceeds 12%: **S, P and Q**. Do not take R's: forgoing it costs only about 4.6% a year, so its 80 extra days of credit are cheaper than the cash credit.

**(iii) Funds needed and the benefit of each**

| Supplier | Extra funds (₹) | Discount earned (₹) | Interest at 12% (₹) | Net benefit (₹) |
|---|---:|---:|---:|---:|
| S | 19,70,000 | 5,47,500 | 2,36,400 | 3,11,100 |
| P | 55,86,000 | 10,95,000 | 6,70,320 | 4,24,680 |
| Q | 35,64,000 | 4,38,000 | 4,27,680 | 10,320 |
| R | 63,36,000 | 2,92,000 | 7,60,320 | (4,68,320) |

Extra funds = annual purchases × (1 − d%) × t ÷ 365; for S, ₹3,65,00,000 × 0.985 × 20 ÷ 365 = ₹19,70,000.

Each rupee of headroom should go first where forgoing the discount is dearest: S (27.79%), then P (19.60%), then Q (12.29%). S and P together need ₹75,56,000, leaving ₹14,44,000 of the ₹90 lakh; Q would need ₹35,64,000.

**Advice.** Take the discounts of **S and P** in full: annual net benefit ₹3,11,100 + ₹4,24,680 = **₹7,35,780**. Q's discount earns only 0.29% a year above the cash credit rate: on the ₹14,44,000 left it would add about ₹4,181. That is not worth using up the last of the cash credit, which is better kept as the division's liquidity cushion. Never take R's discount on these rates.
:::
::::

:::: example The potters' co-operative and the day-60 habit
The Gwalior Kumhar Sahkari Samiti, a potters' co-operative, supplies Tapri's cafés with kulhads on terms of 1.5/7 net 30. Each monthly invoice is ₹5,00,000. The cafés' surplus cash is kept in a liquid fund yielding 9% a year. Kesar suggests paying on day 60 instead of day 30, because "the samiti never complains". Assume 365 days in a year.

**Required:**

(i) Calculate the nominal annual cost and the cost of lost cash discount if Tapri pays on day 30.

(ii) Recalculate both if it pays on day 60.

(iii) Prepare ICAI's comparison of net cost for one invoice: accept the discount, refuse and pay on day 30, refuse and pay on day 60.

(iv) Advise Tapri, including the factors the figures leave out.

(v) At what return on the liquid fund would refusing the discount and paying on day 30 cost the same as accepting it? Use simple interest.

::: answer Show the working
**(i) Paying on day 30:** t = 30 − 7 = 23 days.

$$\text{Nominal} = \frac{1.5}{98.5} \times \frac{365}{23} = 24.17\% \qquad \text{Compound} = \left(\frac{100}{98.5}\right)^{365/23} - 1 = 27.11\%$$

**(ii) Paying on day 60:** t = 60 − 7 = 53 days; nominal = 1.5 ÷ 98.5 × 365 ÷ 53 = **10.49%**; compound = (100 ÷ 98.5)^(365 ÷ 53) − 1 = **10.97%**.

**(iii) Net cost of one invoice**

The discounted amount is ₹5,00,000 × 98.5% = ₹4,92,500.

| Particulars | Accept (pay day 7) (₹) | Refuse, pay day 30 (₹) | Refuse, pay day 60 (₹) |
|---|---:|---:|---:|
| Payment to the samiti | 4,92,500 | 5,00,000 | 5,00,000 |
| Less: return on ₹4,92,500 at 9% | — | (2,793) | (6,436) |
| **Net cost** | **4,92,500** | **4,97,207** | **4,93,564** |

Return for 23 days = ₹4,92,500 × 9% × 23 ÷ 365 = ₹2,793; for 53 days, ₹6,436.

**(iv) Advice.** Accept the discount and pay within 7 days. Refusing costs ₹4,707 more per invoice if Tapri pays on day 30, and still ₹1,064 more even if it stretches to day 60, because 9% is below both 24.17% and 10.49%. Stretching to day 60 also oversteps the agreed credit: ICAI's costs of availing trade credit include the **loss of goodwill** (a supplier may discriminate against delinquent customers when supplies are short) and possible **conditions** on future supply. A small co-operative of potters depends on prompt payment; "never complains" is not the same as "does not mind".

**(v) Break-even return** (simple): ₹7,500 ÷ (₹4,92,500 × 23 ÷ 365) = **24.17%**, which is the nominal cost from (i). Refusing would pay only if the cafés could earn more than 24.17% a year, risk-free, on their cash.
:::
::::

## Under the hood

### Simple or compound: which does ICAI use?

Both appear. Illustration 17 and the suggested answer to MTP January 2026 Series II Q2 used the compound formula ("cost of lost cash discount"), the latter with 360 days; Illustration 18 used the simple annualisation (2 ÷ 98 × 365 ÷ 5 = 149%) (SM 9.100–9.101). Use the formula the question names; if it names none, show the compound cost and say so, since ICAI calls the simple one a nominal cost that understates the true cost. The decision rarely changes, because both are compared with the same cost of funds.

### The other end of the same discount

To the supplier the same terms are a credit policy: a cash discount to speed up collections, judged by the release of funds in debtors against the discount paid. That side is in [[fm.wc.receivables|management of receivables]]. One supplier's "2/10 net 45" is the receivables lesson's incentive and this lesson's implicit interest rate.

### Payables in the operating cycle

The credit period from suppliers is the **C** subtracted in the operating cycle R + W + F + D − C (SM 9.19). Taking a discount shortens C and lengthens the cycle; the extra funds in Example 1 are exactly that lengthening priced in rupees. The cycle is built in [[fm.wc.basics|working capital and the operating cycle]], and its cash effect in [[fm.wc.cash|treasury and cash management]].

### Why inflation favours paying later

Under inflation the borrower is better off paying a fixed outstanding amount later than sooner (SM 9.99). That is ICAI's first cost of **not** taking trade credit, and the reason trade credit is still worth having when no discount is on offer.

## Exam angle

::: exam How payables appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, payables came up 5 times in 5 new-scheme documents:

- **Numerical.** MTP January 2026 Series II Q2(ii)–(iii), inside a 10-mark working capital question: the implied annual cost of forgoing a 2/15 net 60 discount (compound formula, 360 days) against the firm's return of 20%, then the refuse-or-accept statement for a ₹10,000 invoice. The firm refused the discount: its return was higher.
- **Theory, 2 to 4 marks.** "DISCUSS the costs of availing trade credit": MTP September 2024 Series I Q4(a) (4 marks), answered with ICAI's four costs word for word. "EXPLAIN the importance of trade credit and accruals as source of working capital. What is the cost of these sources?": RTP May 2024 Q8(ii). "SHOW the difference between trade credit and bank overdraft": RTP September 2025 Q9(b). Spontaneous sources of finance: RTP January 2026 Q11(b).
- **Old scheme, for practice:** RTP December 2021 Q8: the real annual cost of trade credit (3/30 net 90) compared with a bank loan with a compensating balance and factoring.
:::

::: exam Wording that decides the answer
- "Implied cost", "cost of lost cash discount": the compound formula. "Nominal cost": the simple one.
- "Net 60" means payment not later than day 60 (SM 9.110, MCQ 2); "3/15 net 60" means 3% off within 15 days, otherwise full payment within 60 days (SM 9.110, MCQ 1).
- Read whether the firm would borrow to pay early (compare with the borrowing rate) or would invest the cash if it pays late (compare with the return).
:::

::: trick The rule of thumb for a quick check
The nominal cost ≈ d% × 365 ÷ t: 2% for 20 days is about 2 × 18 = 36% a year. Use it only to check the size of an answer; write ICAI's formula in the exam. Condition: small discounts (the d ÷ (100 − d) correction is then minor).
:::

## Answer frame

### "Discuss the costs of availing trade credit" (4 marks)

Open with ICAI's sentence: "Normally it is considered that the trade credit does not carry any cost. However, it carries the following costs:" then the four, each with one line: **(i) Price** (forgone discount, a high implicit cost), **(ii) Loss of goodwill** (discrimination against delinquent customers when supplies are short), **(iii) Cost of managing** (administrative and accounting costs), **(iv) Conditions** (minimum order size or regular orders). If the question asks for both sides, add the three costs of not taking trade credit: inflation, interest, inconvenience.

### "Show the difference between trade credit and bank overdraft" (RTP September 2025 Q9(b))

| Point | Trade credit | Bank overdraft |
|---|---|---|
| Meaning | Credit extended by suppliers, allowing the firm to delay payment for goods or services | Customers may withdraw in excess of the credit balance in their current account |
| Duration | Usually 15 to 90 days | Repayable on demand, but generally continued for long periods by annual renewal of limits |
| Cost | A type of interest free loan; failure to use it has an interest cost | Interest charged on daily balances |
| How it arises | Generated automatically in the course of business | Borrower applies to the bank; operated like cash credit and current accounts |
| Size | Grows automatically with the volume of business | A fixed limit is granted within which the borrower may overdraw |

### "Explain the importance of trade credit and accruals, and their cost"

1. Credit from suppliers in the normal course of trade; a short-term source; small firms depend heavily on it.
2. Advantages: easy availability, flexibility, informality.
3. Not cost-free: the supplier's opportunity cost of funds in receivables is passed on as a higher price or as a cash discount not extended; the forgone discount is an implicit cost.
4. Accrued expenses (wages, salaries, taxes paid at the end of the period) are built-in and automatic, with no explicit or implicit cost (SM 9.103–9.104).

## Common mistakes

::: mistake Hall of Shame: the 2% that was compared with 12%
"The discount is only 2%; the bank charges 12%, so we skip it." The 2% buys a few days of credit, the 12% a whole year. **Fix:** annualise the discount over t days first, then compare.
:::

::: mistake t taken as the whole credit period
For 1.5/7 net 30, using t = 30 gives a nominal cost of 18.53% instead of 24.17%. **Fix:** t = days credit outstanding − discount period = 23; the first 7 days are free either way.
:::

::: mistake d ÷ 100 instead of d ÷ (100 − d)
The firm keeps the discounted amount, not the invoice value. **Fix:** 1.5 ÷ 98.5, not 1.5 ÷ 100; and in the comparison statement, the return is on ₹4,92,500, not on ₹5,00,000.
:::

::: mistake Stretching sold as a saving
Paying on day 60 on net-30 terms lowers the annualised cost on paper (10.49% instead of 24.17%) and the answer recommends it. **Fix:** a payment beyond the agreed period oversteps the credit; ICAI lists the loss of goodwill and supply discrimination as costs. If the discount is not taken, pay on the last day of credit, not later.
:::

## Practice

::: quiz Check yourself
Q: A supplier of paper cups offers 1.5/15 net 30. Using ICAI's nominal formula and 365 days, what is the annual cost of not taking the discount, in % (two decimals)?
= 37.0..37.1
> t = 30 − 15 = 15 days; 1.5 ÷ 98.5 × 365 ÷ 15 × 100 = 37.06%. Using t = 30 gives 18.53%, the commonest slip.

Q: Case scenario. Tapri's cash credit costs 14% a year. Its packaging supplier changes its terms from 2/10 net 30 to 2/10 net 60, to win business from BrewBucks. Using ICAI's compound formula and 365 days, which of the following is correct?
- [ ] Under the new terms Tapri should forgo the discount, since 2% for 50 days is cheaper than 14%
- [ ] The discount is 2% under both terms, so the decision cannot change
- [ ] Under the old terms Tapri should forgo the discount and under the new terms take it
- [x] Tapri should take the discount under both terms, although the new terms make forgoing it far cheaper
> Old terms, t = 20: (100 ÷ 98)^(365 ÷ 20) − 1 = 44.59%. New terms, t = 50: (100 ÷ 98)^(7.3) − 1 = 15.89%. Both exceed 14%, so take the discount; the longer credit period has cut the cost of forgoing it by almost two-thirds.

Q: Which of the following is NOT one of ICAI's costs of availing trade credit?
- [ ] Loss of goodwill, if the credit is overstepped
- [x] Impact of inflation
- [ ] Conditions such as a minimum order size
- [ ] Cost of managing creditors
> Inflation appears on the other list: it is a cost of NOT taking trade credit, since under inflation borrowers gain from paying a fixed amount later (SM 9.99). The costs of availing are price, loss of goodwill, cost of managing and conditions (SM 9.98).

Q: For credit terms of 2/15 net 45, what is t in ICAI's formulas?
- [ ] 45 days
- [ ] 15 days
- [x] 30 days
- [ ] 60 days
> t = days credit outstanding − discount period = 45 − 15 = 30 days: the days of credit bought by forgoing the discount.

Q: Which of these are spontaneous sources of finance in ICAI's classification? Select all that apply.
- [x] Trade credit
- [x] Bills payable
- [ ] Commercial paper
- [x] Accrued expenses
- [ ] Cash credit
> Spontaneous sources arise naturally in the course of business: trade credit, bills payable, accrued expenses (SM 9.102–9.104). Commercial paper and cash credit have to be specifically negotiated.
:::

## Recap

- Trade creditor: a spontaneous short-term source arising from ordinary business; slow payment causes ill-feeling, disrupted supplies and a bad image (SM 9.98).
- Costs of availing trade credit: price (forgone discount), loss of goodwill, cost of managing, conditions.
- Costs of not taking trade credit: impact of inflation, interest, inconvenience.
- Nominal cost of not taking the discount = d ÷ (100 − d) × 365 ÷ t; cost of lost cash discount = (100 ÷ (100 − d))^(365/t) − 1; t = credit days − discount days.
- Take the discount when forgoing it costs more than the cost (or return) of your funds; otherwise pay on the last day of credit, not later.
- Refuse-or-accept: payment refused less the return on the discounted amount for t days, against the discounted payment.
- Never compare a period discount with an annual rate. (₹3 to keep ₹97 for six weeks is not cheap money.)

## Flashcards

Q:: Why is trade credit called a spontaneous source of finance?
A:: Because it arises from ordinary business transactions, naturally, in the course of business operations.

Q:: ICAI's four costs of availing trade credit?
A:: Price (the discount forgone, a high implicit cost), loss of goodwill, cost of managing, conditions (minimum order size or regular orders).

Q:: ICAI's three costs of not taking trade credit?
A:: Impact of inflation, interest (trade credit is an interest free loan), inconvenience to a supplier geared to deferred payment.

Q:: Formula: nominal annual cost of not taking a cash discount?
A:: d ÷ (100 − d) × 365 ÷ t, where d = discount % and t = days credit outstanding − discount period.

Q:: Formula: cost of lost cash discount with compounding?
A:: (100 ÷ (100 − d))^(365/t) − 1.

Q:: In the discount formulas, what is t?
A:: The reduction in the payment period, in days, necessary to obtain the early discount: days credit outstanding − discount period.

Q:: Illustration 18: what is wrong with comparing a 2% discount with a 12% bank rate?
A:: The 2% is earned for paying a few days earlier, the 12% is for a year; the discount must be annualised before comparing.

Q:: If a firm cannot borrow and must rely on trade credit, when should it pay?
A:: On the last day of the credit period, to reduce the annual cost of the forgone discount.

Q:: What does "3/15 net 60" mean?
A:: A 3% discount if payment is made within 15 days; otherwise full payment within 60 days.

Q:: About what share of total short-term requirements does trade credit contribute, per ICAI?
A:: About one-third.
