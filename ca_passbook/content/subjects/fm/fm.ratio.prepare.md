---
id: fm.ratio.prepare
title: Building financial statements from ratios; limitations of ratios
minutes: 40
needs: fm.ratio.liquidity, fm.ratio.activity, fm.ratio.profit
tags: preparation of balance sheet from ratios, ratio analysis, limitations of ratios, window dressing, users of financial analysis, horizontal analysis, vertical analysis
labs: ratios
summary: Rebuilding the trading and profit and loss account and balance sheet from a set of ratios and one rupee figure; who uses ratios and for what; and ICAI's eight limitations of financial ratios.
---

## In plain words

### The night of the masala chai

It is 11 pm before Tapri's board meeting. Kesar knocks a full glass of masala chai over the only printout of Kshipra Spice Mills' accounts, the supplier Tapri wants to buy. One page survives: a list of ratios and a single rupee figure.

> **Kesar:** It is gone. The balance sheet, the profit and loss account, everything. Tell the board we will present next month.
> **Dev:** We still have the ratios and one rupee figure. Each ratio is an equation. Give me twenty minutes and I will give you both statements back.
> **Kesar:** You can rebuild a balance sheet from ratios?
> **Dev:** Ratios are just accounts with the rupees taken out. I will put them back in.

A ratio links two figures. Suppose a sheet says "fixed assets are 0.75 of the proprietary fund" and "fixed assets are ₹30 lakh": together they give the proprietary fund, ₹40 lakh. If it also says "the proprietary fund is half of total assets", total assets follow: ₹80 lakh. Each step uses one ratio and one figure already known to find one new figure. When two figures are unknown and two ratios link them (a current ratio and a quick ratio, say), the two equations are solved together. And the last figure, usually cash, is whatever makes the balance sheet balance: the **balancing figure**.

The same evening Ananya, Tapri's head of strategy, warns Kesar about the other half of this lesson: ratios can be computed exactly and still mislead. Kshipra's plant was bought fifteen years ago, its stock of dried chillies peaks after the harvest, and it values that stock on a different method from Tapri's. ICAI lists eight such **limitations of financial ratios**, and ends with a line worth memorising: ==financial ratios provide clues but not conclusions==.

::: analogy Sudoku with rupees
A ratio question is a Sudoku. The rupee figure is the number printed in the grid; each ratio is a rule that fills one more cell once its neighbour is known. You never start with the cell that has two unknowns: you start where only one is missing, and the last cell is forced by the totals.
:::

::: key
Rebuilding statements from ratios is solving equations: start from a rupee figure, use each ratio to find one new figure, solve two ratios together when they share two unknowns, call sales "x" when no chain starts from the figure you have, and let total assets = total liabilities fix the balancing figure. Then remember that a ratio, however exact, is a clue for an expert, not a conclusion.
:::

## How it works

### Seven steps from a ratio sheet to a balance sheet

::: steps
1. **Sort the data.** Separate the rupee figures (the anchors) from the ratios. Note the basis of each ratio: on sales or on cost of goods sold; closing or average balance; 360 or 365 days; gross profit on sales or on cost.
2. **Write each ratio as an equation** and mark the two figures it links: current ratio = CA ÷ CL links current assets and current liabilities.
3. **Start from an anchor** and use the ratio that links it to exactly one unknown. Keep going: every new figure is an anchor for the next step.
4. **Two unknowns, two equations.** When two ratios share the same two unknowns, solve them together: a current ratio with a quick ratio, a current ratio with working capital, a debt-equity ratio with the total of the balance sheet.
5. **No chain from the anchor?** Let sales be x, write every balance sheet item in terms of x, and solve total assets = total liabilities for x.
6. **Use the identities** that hold in every set of accounts: gross profit = sales − COGS; COGS = opening stock + purchases − closing stock; net worth = share capital + reserves; average = (opening + closing) ÷ 2; and the balance sheet balances.
7. **Balancing figure last, then check.** Let one item (cash, other current assets, purchases, operating expenses) be the balancing figure and label it "(balancing figure)" or "(bal. fig.)". Prepare the statements in the format asked, then recompute two of the given ratios from your statements.
:::

::: diagram Choosing the route through a ratio question
{"type": "flow", "w": 420, "nodes": [
 {"id": "s", "kind": "start", "label": "Ratios and one\nrupee figure"},
 {"id": "d1", "kind": "decision", "label": "A ratio links it\nto one unknown?"},
 {"id": "c", "kind": "process", "label": "Chain: one ratio,\none new figure"},
 {"id": "x", "kind": "end", "label": "Let sales\nbe x"},
 {"id": "d2", "kind": "decision", "label": "Two unknowns on\ntwo ratios?"},
 {"id": "j", "kind": "end", "label": "Solve the two\ntogether"},
 {"id": "b", "kind": "end", "label": "Balancing figure,\nthen check"}
 ],
 "edges": [["s", "d1"], ["d1", "c", "yes"], ["d1", "x", "no"], ["c", "d2"], ["d2", "j", "yes"], ["d2", "b", "no"]],
 "caption": "Most questions take the left route from a rupee figure. The right route (let sales be x, write every item in terms of x and solve total assets = total liabilities) is for an anchor such as cash or an investment that enters the balance sheet only through the totals; once x is found, the chain continues as usual. Every route ends with the balancing figure and a check."}
:::

### A small rebuild, step by step

Tapri's kiosk division has lost its balance sheet. What survives (₹ lakh): sales 36; gross profit 25% of sales; stock turnover 9 (on COGS, closing stock); debtors collection period 30 days (360-day year, all sales on credit); fixed assets turnover 3 (on sales); current ratio 2; cash 2; no long-term debt.

::: diagram Kiosk division: which ratio gives which figure (₹ lakh)
{"type": "graph", "w": 440, "h": 470, "r": 30, "nodes": [
 {"id": "s", "label": "Sales\n36 given", "x": 220, "y": 40, "shape": "square", "fill": "a"},
 {"id": "g", "label": "COGS\n27", "x": 70, "y": 140, "shape": "square"},
 {"id": "d", "label": "Debtors\n3", "x": 250, "y": 140, "shape": "square"},
 {"id": "f", "label": "Fixed\nassets 12", "x": 370, "y": 140, "shape": "square"},
 {"id": "k", "label": "Stock\n3", "x": 95, "y": 240, "shape": "square"},
 {"id": "c", "label": "Cash\n2 given", "x": 290, "y": 240, "shape": "square", "fill": "a"},
 {"id": "ca", "label": "CA\n8", "x": 145, "y": 335, "shape": "square"},
 {"id": "cl", "label": "CL\n4", "x": 60, "y": 430, "shape": "square"},
 {"id": "ta", "label": "Total\nassets 20", "x": 320, "y": 335, "shape": "square"},
 {"id": "nw", "label": "Net worth\n16", "x": 355, "y": 430, "shape": "square", "fill": "c"}
 ],
 "edges": [
  {"from": "s", "to": "g", "label": "GP 25%"},
  {"from": "s", "to": "d", "label": "30 days"},
  {"from": "s", "to": "f", "label": "÷ 3"},
  {"from": "g", "to": "k", "label": "÷ 9"},
  {"from": "k", "to": "ca"}, {"from": "d", "to": "ca"}, {"from": "c", "to": "ca"},
  {"from": "ca", "to": "cl", "label": "÷ 2"},
  {"from": "ca", "to": "ta"}, {"from": "f", "to": "ta"},
  {"from": "ta", "to": "nw", "label": "− CL"}
 ],
 "caption": "Blue boxes: the two rupee figures given (sales and cash). Each arrow is one ratio or one addition; amber: net worth, the balancing figure (total assets 20 − current liabilities 4)."}
:::

Sales ₹36 lakh give COGS of 75% = ₹27 lakh, then closing stock 27 ÷ 9 = ₹3 lakh; debtors 36 × 30 ÷ 360 = ₹3 lakh; fixed assets 36 ÷ 3 = ₹12 lakh. Current assets = 3 + 3 + 2 = ₹8 lakh, so current liabilities = 8 ÷ 2 = ₹4 lakh. Total assets = 12 + 8 = ₹20 lakh, and with no long-term debt, net worth = 20 − 4 = ₹16 lakh. Check: current ratio 8 ÷ 4 = 2.

### Two equations, two unknowns

| Given | Write | Solve |
|---|---|---|
| Current ratio r and working capital W | CA = r × CL; CA − CL = W | CL = W ÷ (r − 1) |
| Current ratio r, quick ratio q, inventory I (no prepaid) | CA = r × CL; CA − I = q × CL | CL = I ÷ (r − q) |
| Long-term debt to equity d, balance sheet total T, CL (no preference capital) | Debt = d × Equity | Equity = (T − CL) ÷ (1 + d) |
| Opening stock O, average stock A | (O + closing) ÷ 2 = A | Closing = 2A − O |
| Gross profit g% on cost | GP = g% × COGS | GP ÷ sales = g ÷ (100 + g) |

### Who reads ratios, and for what

Ratio analysis presents facts on a comparative basis and enables inferences about the performance of a firm. ICAI lists the aspects it is relevant to, in this order (SM 3.34–3.36):

- (a) **Liquidity position**: whether the firm can meet its obligations when they become due; particularly useful in credit analysis by banks and other suppliers of short-term loans.
- (b) **Long-term solvency**: the long-term financial viability of a firm, of concern to long-term creditors, security analysts and present and potential owners; measured by leverage and profitability ratios.
- (c) **Operating efficiency**: the degree of efficiency in the management and utilisation of assets, measured by the activity ratios.
- (d) **Overall profitability**: management's integrated view of all the ratios together.
- (e) **Inter-firm comparison**: comparison with competitors and industry averages, a stepping stone to remedial measures. Ratios not only perform a post mortem of operations but also serve as a barometer for the future.
- (f) **Financial ratios for budgeting**: estimating budgeted figures and measuring actual performance against them.

**Financial analysis** may be horizontal or vertical (SM 3.37). **Horizontal analysis** compares the financial statements of one year with another year or years. **Vertical analysis** analyses the statements of a single year: every item of the profit and loss account is expressed as a percentage of gross sales and every item of the balance sheet as a percentage of total assets; it is useful in inter-firm comparison. Tapri's margins table in [[fm.ratio.profit|the profitability lesson]] is a vertical analysis.

### Limitations of financial ratios

ICAI's list, in ICAI's order (SM 3.36–3.37), each with the Tapri case it fits:

1. **Diversified product lines.** Many businesses operate divisions in quite different industries; ratios on aggregate data cannot be used for inter-firm comparison. Tapri's group ratios mix cafés, premix, a samosa factory and a cold-chain fleet: no single competitor has that mix.
2. **Financial data are badly distorted by inflation.** Historical cost values may be substantially different from true values, and the distortion is carried into the ratios. A café bought in 2015 sits at its 2015 cost.
3. **Seasonal factors** may influence financial data. ICAI's example: a cotton garment company keeps a high inventory from October to January and about a quarter of it the rest of the year, so year-end liquidity and inventory ratios give a biased picture; monthly averages are suggested, but outsiders rarely get them. Tapri's Diwali gift-box stock is the same story.
4. **To give a good shape to the popularly used financial ratios** (window dressing). To flatter ratios such as the current ratio and the debt-equity ratio, a business may make year-end adjustments; such window dressing changes the character of the ratios from what they would have been without it. Repaying ₹10 crore of creditors from the bank on 30 March lifts Tapri's current ratio from 2.14 to 2.33 for one night.
5. **Differences in accounting policies and accounting period** make the data, and the ratios, of two firms non-comparable. BrewBucks India closes its books on 31 December and depreciates on a different method.
6. **No standard set of ratios against which a firm's ratios can be compared.** The industry average is a low standard for a firm that wants to be above average, and too high a standard for a below-average firm.
7. **Difficulty to generalise whether a particular ratio is good or bad.** A low current ratio may be "bad" for liquidity, but a high current ratio may not be "good": it may result from inefficient working capital management.
8. **Financial ratios are inter-related, not independent.** One ratio viewed in isolation may highlight efficiency, while the set may speak differently; such interdependence can be handled through multivariate analysis (analysing the relationship between several variables simultaneously).

Financial ratios provide clues but not conclusions. They are tools only in the hands of experts, because there is no standard ready-made interpretation of financial ratios (SM 3.37).

## Formats and formulas

*Reproduce the two formats from memory; ICAI's suggested answers present the rebuilt statements in these layouts, with each balancing figure labelled (bal. fig. = balancing figure).*

::: cols Trading and Profit and Loss Account for the year ended …
| Dr. Particulars | ₹ |
|---|---:|
| To Opening stock | xxx |
| To Purchases (balancing figure) | xxx |
| To Gross profit c/d | xxx |
| | **xxx** |
| To Operating expenses (balancing figure) | xxx |
| To Interest | xxx |
| To Provision for tax | xxx |
| To Net profit | xxx |
| | **xxx** |
---
| Cr. Particulars | ₹ |
|---|---:|
| By Sales | xxx |
| By Closing stock | xxx |
| | |
| | **xxx** |
| By Gross profit b/d | xxx |
| | |
| | |
| | |
| | **xxx** |
:::

| Liabilities | ₹ | Assets | ₹ |
|---|---:|---|---:|
| Share capital | xxx | Fixed assets | xxx |
| Reserves and surplus | xxx | Current assets: | |
| Long-term debt | xxx | Stock | xxx |
| Current liabilities | xxx | Debtors | xxx |
| | | Cash (bal. fig.) | xxx |
| **Total** | **xxx** | **Total** | **xxx** |

::: formula The identities behind every rebuild
$$\text{Total assets} = \text{Total liabilities} \qquad \text{GP} = \text{Sales} - \text{COGS}$$
$$\text{COGS} = \text{Opening stock} + \text{Purchases} \qquad - \text{Closing stock}$$
$$\text{Net worth} = \text{Share capital} + \text{Reserves} \qquad \text{Average} = \frac{\text{Opening} + \text{Closing}}{2}$$
Net worth here means equity shareholders' funds; total liabilities include capital unless the question says otherwise.
:::

::: formula Balances from ratios
$$\text{Debtors} = \frac{\text{Credit sales} \times \text{Days}}{360} \qquad \text{Stock} = \frac{\text{COGS}}{\text{Stock turnover}}$$
$$\text{CL} = \frac{\text{Working capital}}{\text{Current ratio} - 1} \qquad \text{Fixed assets} = \frac{\text{Sales}}{\text{Fixed assets turnover}}$$
Days = the collection period in days. Use the basis the question gives (sales or COGS; closing or average; 360 or 365 days).
:::

## Worked examples

::::: example Kshipra Spice Mills: rebuild both statements
From the surviving ratio sheet of Kshipra Spice Mills Pvt Ltd for the year ended 31 March 2026:

| Particulars | Figure |
|---|---|
| Fixed assets (net) | ₹48,00,000 |
| Fixed assets to proprietary fund | 0.80 |
| Share capital to reserves and surplus | 2 : 1 |
| Proprietary ratio (proprietary fund ÷ total assets) | 0.60 |
| Current ratio | 2.6 : 1 |
| Quick ratio | 1.4 : 1 |
| Stock turnover (on COGS and average stock) | 6 times |
| Opening stock | ₹20,00,000 |
| Gross profit ratio | 20% of sales |
| Debtors collection period (all sales on credit; closing debtors; 360 days) | 36 days |
| Interest coverage ratio | 5 times |

The only long-term debt is a 12% term loan. There are no preference shares and no prepaid expenses; current assets are stock, debtors and cash. The tax rate is 25%.

**Required:**

(i) Prepare the Trading and Profit and Loss Account for the year ended 31 March 2026.

(ii) Prepare the Balance Sheet as at 31 March 2026.

(iii) Verify the current ratio and the interest coverage ratio from your statements.

:::: answer Show the working
**Working notes** (₹)

1. Proprietary fund = 48,00,000 ÷ 0.80 = **60,00,000**; share capital = 60,00,000 × 2/3 = **40,00,000**; reserves = **20,00,000**.
2. Total assets = 60,00,000 ÷ 0.60 = **1,00,00,000**; current assets = 1,00,00,000 − 48,00,000 = **52,00,000**.
3. Current liabilities = 52,00,000 ÷ 2.6 = **20,00,000**.
4. Term loan = total liabilities − proprietary fund − current liabilities = 1,00,00,000 − 60,00,000 − 20,00,000 = **20,00,000**; interest at 12% = **2,40,000**.
5. Quick assets = 1.4 × 20,00,000 = 28,00,000; closing stock = 52,00,000 − 28,00,000 = **24,00,000**.
6. Average stock = (20,00,000 + 24,00,000) ÷ 2 = 22,00,000; COGS = 6 × 22,00,000 = **1,32,00,000**.
7. Sales = 1,32,00,000 ÷ 80% = **1,65,00,000**; gross profit = **33,00,000**.
8. Debtors = 1,65,00,000 × 36 ÷ 360 = **16,50,000**; cash = 28,00,000 − 16,50,000 = **11,50,000**.
9. EBIT = 5 × 2,40,000 = **12,00,000**; operating expenses = 33,00,000 − 12,00,000 = **21,00,000**.
10. PBT = 12,00,000 − 2,40,000 = 9,60,000; tax at 25% = 2,40,000; net profit = **7,20,000**.
11. Purchases = COGS + closing stock − opening stock = 1,32,00,000 + 24,00,000 − 20,00,000 = **1,36,00,000**.

**(i) Trading and Profit and Loss Account of Kshipra Spice Mills Pvt Ltd for the year ended 31 March 2026**

::: cols
| Dr. Particulars | ₹ |
|---|---:|
| To Opening stock | 20,00,000 |
| To Purchases (balancing figure) | 1,36,00,000 |
| To Gross profit c/d | 33,00,000 |
| | **1,89,00,000** |
| To Operating expenses (balancing figure) | 21,00,000 |
| To Interest on term loan | 2,40,000 |
| To Provision for tax | 2,40,000 |
| To Net profit | 7,20,000 |
| | **33,00,000** |
---
| Cr. Particulars | ₹ |
|---|---:|
| By Sales | 1,65,00,000 |
| By Closing stock | 24,00,000 |
| | |
| | **1,89,00,000** |
| By Gross profit b/d | 33,00,000 |
| | |
| | |
| | |
| | **33,00,000** |
:::

**(ii) Balance Sheet of Kshipra Spice Mills Pvt Ltd as at 31 March 2026**

::: cols
| Liabilities | ₹ |
|---|---:|
| Share capital | 40,00,000 |
| Reserves and surplus | 20,00,000 |
| 12% Term loan | 20,00,000 |
| Current liabilities | 20,00,000 |
| **Total** | **1,00,00,000** |
---
| Assets | ₹ |
|---|---:|
| Fixed assets (net) | 48,00,000 |
| Stock | 24,00,000 |
| Debtors | 16,50,000 |
| Cash (balancing figure) | 11,50,000 |
| **Total** | **1,00,00,000** |
:::

**(iii) Verification**

Current ratio = (24,00,000 + 16,50,000 + 11,50,000) ÷ 20,00,000 = 52,00,000 ÷ 20,00,000 = **2.6**. Interest coverage = 12,00,000 ÷ 2,40,000 = **5 times**. Both agree with the data.
::::
:::::

::: lab ratios {"mode":"build","group":"all","ydays":360,"given":"equity share capital = 6,00,000\nreserves and surplus = 3,00,000\ncreditors = 3,00,000\ninventory turnover = 7.5\ntotal assets turnover = 2.5\nlong term debt / shareholders funds = 0.6\ncollection period = 30 days\ngross profit ratio = 25%\ncurrent ratio = 2.9"}
Here is September 2024 Q1(c): the balance sheet fills one line per step, each caption naming the ratio or identity it used, and ends with the balance check.
:::

::::: example Indore Namkeen: when the only rupee figure is an investment
Indore Namkeen Co. Ltd sells snacks through Tapri's kiosks. Its accountant has left Dev the following for the year ended 31 March 2026:

| Particulars | Figure |
|---|---|
| Gross profit ratio | 20% of sales |
| Credit sales | 75% of sales |
| Closing stock | 1.5 months' cost of goods sold |
| Closing debtors | 2 months' credit sales |
| Creditors | 1 month's cost of goods sold |
| Fixed assets turnover (on cost of goods sold) | 2.4 times |
| Current ratio | 2.5 : 1 |
| Quick ratio | 1.5 : 1 |
| Long-term debt to total assets | 0.25 |
| Proprietary ratio (proprietary fund ÷ total assets) | 0.60 |
| Share capital to reserves | 5 : 3 |
| Non-current investments | ₹6,00,000 |

Current assets are stock, debtors and cash; current liabilities are creditors and a bank overdraft. There are no preference shares.

**Required:**

(i) Calculate the sales for the year.

(ii) Prepare the summarised Balance Sheet as at 31 March 2026, showing working notes.

(iii) Verify the current ratio and the proprietary ratio from your balance sheet.

:::: answer Show the working
No ratio links the investments of ₹6,00,000 to any other single figure: they enter only through total assets. So let sales be **₹x** and write every item in terms of x.

::: diagram Indore Namkeen: the balance sheet in terms of sales x
{"type": "table", "head": ["Item", "In terms of x", "From"], "rows": [
 ["Fixed assets", "x/3", "0.8x ÷ 2.4"],
 ["Stock", "0.10x", "0.8x × 1.5 ÷ 12"],
 ["Debtors", "0.125x", "0.75x × 2 ÷ 12"],
 ["Current liabilities", "0.10x", "stock ÷ (2.5 − 1.5)"],
 ["Current assets", "0.25x", "2.5 × CL"],
 ["Cash", "0.025x", "CA − stock − debtors"],
 ["Total assets", "7x/12 + 6,00,000", "FA + investments + CA"],
 ["Same CL, from totals", "0.15 × total assets", "1 − 0.60 − 0.25"]
 ], "align": ["left", "right", "left"], "rowClass": {"6": "hl", "7": "hl"}}
:::

**Working notes** (₹)

1. Cost of goods sold = 80% of sales = 0.8x; credit sales = 0.75x.
2. Fixed assets = COGS ÷ 2.4 = 0.8x ÷ 2.4 = x/3. Stock = 0.8x × 1.5 ÷ 12 = 0.10x. Debtors = 0.75x × 2 ÷ 12 = 0.125x.
3. Current ratio: CA = 2.5 CL. Quick ratio: CA − stock = 1.5 CL. So CL = stock ÷ (2.5 − 1.5) = 0.10x, CA = 0.25x and cash = 0.25x − 0.10x − 0.125x = 0.025x.
4. Total assets = x/3 + 6,00,000 + 0.25x = 7x/12 + 6,00,000.
5. Proprietary fund = 0.60 × total assets and long-term debt = 0.25 × total assets, so current liabilities = (1 − 0.60 − 0.25) × total assets = 0.15 × total assets.
6. Equating the two expressions for current liabilities: $0.10x = 0.15\left(\frac{7x}{12} + 6{,}00{,}000\right)$, so $0.0125x = 90{,}000$ and $x = 72{,}00{,}000$.
7. **(i) Sales = ₹72,00,000**; COGS = ₹57,60,000; credit sales = ₹54,00,000.
8. Fixed assets = 24,00,000; stock = 7,20,000; debtors = 9,00,000; cash = 1,80,000; current assets = 18,00,000; total assets = 24,00,000 + 6,00,000 + 18,00,000 = 48,00,000.
9. Proprietary fund = 0.60 × 48,00,000 = 28,80,000: share capital 5/8 = 18,00,000, reserves 3/8 = 10,80,000. Long-term debt = 0.25 × 48,00,000 = 12,00,000.
10. Current liabilities = 0.10 × 72,00,000 = 7,20,000; creditors = 57,60,000 ÷ 12 = 4,80,000; bank overdraft = 7,20,000 − 4,80,000 = 2,40,000 (balancing figure).

**(ii) Summarised Balance Sheet of Indore Namkeen Co. Ltd as at 31 March 2026**

::: cols
| Liabilities | ₹ |
|---|---:|
| Share capital | 18,00,000 |
| Reserves and surplus | 10,80,000 |
| Long-term debt | 12,00,000 |
| Creditors | 4,80,000 |
| Bank overdraft (balancing figure) | 2,40,000 |
| **Total** | **48,00,000** |
---
| Assets | ₹ |
|---|---:|
| Fixed assets | 24,00,000 |
| Non-current investments | 6,00,000 |
| Stock | 7,20,000 |
| Debtors | 9,00,000 |
| Cash | 1,80,000 |
| **Total** | **48,00,000** |
:::

**(iii) Verification:** current ratio = 18,00,000 ÷ 7,20,000 = 2.5; proprietary ratio = 28,80,000 ÷ 48,00,000 = 0.60. Also quick ratio = (18,00,000 − 7,20,000) ÷ 7,20,000 = 1.5, and fixed assets turnover = 57,60,000 ÷ 24,00,000 = 2.4.
::::
:::::

:::: example The board slide that compared too much
Kesar's board slide says: "Tapri beats BrewBucks India on every ratio. Our current ratio is 2.33 against their 1.6, our fixed assets turnover 2.54 against 1.9, and our ROCE is above the industry average, so we are the better company." Ananya points out that:

(a) Tapri's figures are for the whole group: cafés, packaged premix, the samosa factory and the cold-chain fleet; BrewBucks India runs only coffee shops.

(b) Most of Tapri's cafés and the samosa factory were bought between 2012 and 2016 and stand at historical cost; BrewBucks India's outlets are three years old.

(c) Tapri's year ends on 31 March, when its Diwali stock has long been sold; BrewBucks India's ends on 31 December, at the peak of its winter stock. BrewBucks also uses a different depreciation method.

(d) On 30 March Tapri paid ₹10 crore of creditors from the bank, which is why its current ratio is 2.33 and not 2.14.

(e) The "industry average" was taken from a report on café chains, and Tapri's other ratios (inventory turnover, interest coverage) were left off the slide.

**Required:** Identify the limitations of financial ratios that make Kesar's comparison unreliable, and state what an analyst should do.

::: answer Model answer
Financial ratios provide clues but not conclusions; they are tools only in the hands of experts, because there is no standard ready-made interpretation of them. Applying the limitations listed in the Study Material to the facts:

1. **Diversified product lines (a).** Ratios calculated on the aggregate data of divisions in different industries cannot be used for inter-firm comparison. Tapri's group ratios should be compared segment by segment: the cafés with BrewBucks India.
2. **Distortion by inflation (b).** Historical cost values may be substantially different from true values. Tapri's old assets at historical cost inflate its fixed assets turnover (2.54) and its ROCE relative to a company with recently acquired outlets.
3. **Seasonal factors (c).** The year-end figures of the two companies fall at different points of the season, so their liquidity and inventory ratios do not represent the average position; average or monthly figures should be used where available.
4. **Giving a good shape to popular ratios: window dressing (d).** The year-end payment to creditors gives a good shape to the current ratio; without it the ratio would be 2.14, not 2.33. The ratio should be read with the reason for the change.
5. **Differences in accounting policies and accounting period (c).** Different year-ends and depreciation methods make the accounting data of the two firms, and their ratios, non-comparable.
6. **No standard set of ratios (e).** An industry average from a different business is not a valid benchmark; even a proper industry average is a low standard for a firm that aims to be above average.
7. **Difficulty to generalise (e).** A high current ratio is not necessarily good; it may reflect inefficient working capital management.
8. **Ratios are inter-related (e).** Selected ratios in isolation may highlight efficiency while the full set speaks differently; all ratios, including inventory turnover and interest coverage, should be analysed together.

**Conclusion:** the claim that Tapri is "the better company" does not follow from the slide. The analyst should compare like with like (segment figures, the same period and adjusted accounting policies), use average figures to remove seasonal effects, disclose year-end adjustments, choose a relevant benchmark, and read the whole set of ratios together before drawing a conclusion.
:::
::::

## Under the hood

### The eleven ratios a company now discloses

The Study Material notes that a company is now also required to disclose these ratios in the notes to accounts while preparing its financial statements (SM 3.43): (a) current ratio, (b) debt-equity ratio, (c) debt service coverage ratio, (d) return on equity ratio, (e) inventory turnover ratio, (f) trade receivables turnover ratio, (g) trade payables turnover ratio, (h) net capital turnover ratio, (i) net profit ratio, (j) return on capital employed, (k) return on investment.

::: warning
The list is reproduced as the Study Material gives it. Verify against the Study Material and Statutory Update for your attempt before quoting the disclosure requirement itself.
:::

### Words that change the answer

- **"Total liabilities".** In Illustration 4 (SM 3.53), "capital to total liabilities 1/2" was solved with the note "It is assumed that total liabilities do not include capital". When a question's wording is ambiguous, state your reading as an assumption, as ICAI does.
- **"Gross profit 25% of cost".** Convert before using it on sales: 25 ÷ 125 = 20% of sales.
- **Exact fractions.** Carry unrounded figures through the chain and round only when you present them: in Practical Problem 3 (SM 3.78) debtors came to ₹12,82,191.78, shown in the balance sheet as ₹12,82,192.
- **Closing or average.** "Stock turnover 10" with no opening stock uses closing stock; with an opening stock given, the average must be found first (Kshipra, working note 6).

### Who uses which ratios

The Study Material's bird's eye view of users (SM 3.30–3.33), condensed:

| User | Main interest | Ratios used in general |
|---|---|---|
| Shareholders | Profitability and growth | Profitability (EPS, DPS, P/E, pay-out) |
| Investors | Overall financial health, future | Profitability, capital structure, solvency, turnover |
| Lenders | Safety of money lent | Coverage, solvency, turnover, profitability |
| Creditors | Short-term liability position | Liquidity, short-term solvency |
| Employees | Overall financial wealth | Liquidity, long-term solvency, profitability, ROI |
| Regulator / Government | Taxation and dues | Profitability |
| Managers | Production, sales, finance, whole firm | Input-output; turnover and expenses; ROI, turnover, capital structure; all ratios |

Industries add their own: telecom (ratios related to calls, revenue and expenses per customer), banks (loan to deposit, operating expenses and income ratios), hotels (room and bed occupancy) and transport (passenger-kilometre, operating cost per passenger-kilometre) (SM 3.33).

## Exam angle

::: exam Where these questions appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, questions that rebuild or complete statements from ratios appeared in four past papers and seven RTPs:

- **Past papers, 5 marks each.** May 2024 Q1(a) (interest coverage, gross profit ratio and current assets, the last from the balance sheet identity); September 2024 Q1(c) (complete a balance sheet from inventory turnover, total assets turnover, long-term debt to shareholders' fund, collection period, gross profit ratio and current ratio); May 2025 Q1(a) (a balance sheet in a given format from raw material and finished goods holding periods, collection period, proprietary ratio and fixed assets turnover); September 2026 Q1(b) (credit sales, COGS, average inventory and debtors and proprietary fund, with a capital gearing ratio of 40%).
- **RTPs.** May 2024 Q1 (balance sheet and income statement from margins, PBIT to PBT and turnovers); September 2024 Q4 (complete a balance sheet from debt to total assets, quick ratio and holding periods); May 2025 Q4 (balance sheet with a capital gearing ratio and depreciation on opening WDV); September 2025 Q4 (operating expenses, then the balance sheet) and May 2026 Q4 (operating expenses, share capital and reserves, closing stock and fixed assets), both starting from a return on net worth; January 2026 Q5 (a balance sheet from capital-structure percentages, then a table of ratios for a bank); September 2026 Q4 (profit and loss statement and balance sheet from percentages of cost of goods sold, the Study Material's Practical Problem 3 set again).
- **MTPs and MCQs.** MTP Series I for January 2025 Q2(a) (trading, profit and loss account and balance sheet); MTP Series I for September 2025 Q1(b) (quick ratio, fixed assets turnover, proprietary ratio and EPS); MTP Series I for September 2026 Q3(b) (a summarised balance sheet from net working capital, bank overdraft, fixed assets to proprietors' fund and the current and quick ratios, 3 marks: the figures of the Study Material's Practical Problem 6); January 2025 MCQ 7 (current assets and liabilities from two ratios).
- **Limitations.** "Explain briefly the limitations of financial ratios" is the chapter's own theory question 5 (SM 3.65); in the old scheme it was asked as MTP Series II for May 2022 Q6(b) for 4 marks, answered with the list of limitations and the closing line on clues and conclusions.
:::

::: exam The traps ICAI set
- A ratio on cost of goods sold used on sales (or the reverse); gross profit given on cost.
- An opening stock that forces the average-stock route (Kshipra).
- An absolute figure that only enters through the totals, forcing "let sales be x" (the Study Material's Practical Problem 11).
- Items that must be classified before the balance sheet balances: outstanding interest as a current liability, preference capital outside debt-equity, bills receivable with debtors.
:::

::: lab ratios {"mode":"build","group":"all","ydays":360,"given":"sales = 150 lakh\ncredit sales = 80% of sales\ncurrent ratio = 1.5 : 1\nquick ratio = 1 : 1\ninventory turnover = 6\ncollection period = 2 months\ngross profit ratio = 20%"}
Here is January 2025 MCQs 6 and 7: stock and debtors from the turnovers, then the current and quick ratios solved together for the current assets.
:::

::: trick DISWANDI: the eight limitations in ICAI's order
**D**iversified product lines, **I**nflation, **S**easonal factors, **W**indow dressing, **A**ccounting policies and period, **N**o standard set of ratios, **D**ifficulty to generalise, **I**nter-related ratios. The magic wand that does not work: ratios give clues, not conclusions.
:::

## Answer frame

### "Explain briefly the limitations of financial ratios"

1. One line for each of the eight limitations, in ICAI's order, with its explanation (aggregate data of diverse divisions; historical cost under inflation; seasonal stock and year-end figures; year-end window dressing of popular ratios; non-comparable policies and periods; no standard set of ratios; a high or low ratio not good or bad in itself; inter-related ratios and multivariate analysis).
2. The closing line: financial ratios provide clues but not conclusions; they are tools only in the hands of experts, as there is no standard ready-made interpretation.
3. For a case ("Comment", "Advise"), apply each relevant limitation to the facts, then conclude what the analyst should do.

### Three answers to a "prepare the balance sheet" question

::: cols
**Loses marks**

A balance sheet with the right figures and no working notes.

If one figure is wrong, nothing in the chain earns method marks, and the examiner cannot see which ratio was used.
---
**Passes**

Working notes for most figures, but the balancing figure is not labelled and the statement is not in the format asked.

The examiner has to search for how cash was found.
---
**Full marks**

Numbered working notes in the order of the chain, each with the ratio, the figures and the result; assumptions stated (closing or average, 360 days); statements in the asked format with "(balancing figure)" labelled; two ratios re-checked.
:::

## Common mistakes

::: mistake Hall of Shame: the balance sheet that balanced by accident
Making cash the balancing figure before checking the other ratios: the sheet balances, but the current ratio no longer agrees with the data. **Fix:** find every figure a ratio gives first; only the one figure no ratio gives may balance the sheet, and recompute two ratios at the end.
:::

::: mistake Gross profit on cost used as gross profit on sales
With sales of ₹30,00,000 and "gross profit 25% of cost", reading 25% as a share of sales gives COGS of ₹22,50,000 instead of ₹24,00,000, and a stock turnover of 8 then gives stock of ₹2,81,250 instead of ₹3,00,000. **Fix:** convert first: 25 ÷ (100 + 25) = 20% of sales, so COGS = 80% of sales.
:::

::: mistake Closing stock where the ratio uses the average
Kshipra's stock turnover of 6 applies to the average stock of ₹22,00,000, so COGS = ₹1,32,00,000. Multiplying the closing stock instead (6 × 24,00,000 = ₹1,44,00,000) overstates COGS, sales (₹1,80,00,000) and debtors (₹18,00,000), and understates cash (₹10,00,000). **Fix:** when an opening stock is given, work with the average, (opening + closing) ÷ 2; when the average is what you find, closing = 2 × average − opening.
:::

::: mistake The limitations answer that listed but did not apply
In a case, a memorised list of eight limitations earns little if the facts are never used. **Fix:** name the limitation, quote the fact from the case that shows it, and say what the analyst should do.
:::

## Practice

::: quiz Check yourself
Q: A company's balance sheet total is ₹80 lakh, of which current liabilities are ₹16 lakh. Its long-term debt to equity ratio is 0.6 : 1, its share capital to reserves ratio 3 : 1, and it has no preference shares. What are its reserves, in rupees?
= 1000000
> Equity + long-term debt = 80 − 16 = ₹64 lakh, and debt = 0.6 × equity, so equity = 64 ÷ 1.6 = ₹40 lakh (debt ₹24 lakh). Reserves = 1/4 × 40 = ₹10 lakh. Forgetting to take out the current liabilities gives equity of ₹50 lakh and reserves of ₹12.5 lakh.

Q: Case scenario. A supplier's ratio sheet says: sales ₹40,00,000; gross profit 25% on cost; stock turnover (on cost of goods sold and average stock) 8 times; opening stock ₹3,00,000. Bunty, the article assistant checking the figures for the audit file, writes closing stock = ₹4,00,000 "because COGS ÷ 8". Which closing stock should go into the balance sheet?
- [ ] ₹4,00,000
- [ ] ₹4,50,000
- [x] ₹5,00,000
- [ ] ₹7,00,000
> Gross profit 25% on cost is 20% of sales, so COGS = 80% × 40,00,000 = ₹32,00,000; average stock = 32,00,000 ÷ 8 = ₹4,00,000; closing = 2 × 4,00,000 − 3,00,000 = ₹5,00,000. Bunty's ₹4,00,000 is the average, not the closing stock; ₹4,50,000 reads 25% as a share of sales (COGS ₹30,00,000, average ₹3,75,000); ₹7,00,000 uses sales instead of COGS (average ₹5,00,000).

Q: Which of the following is not one of ICAI's limitations of financial ratios?
- [ ] Seasonal factors may influence financial data
- [x] Ratios cannot be calculated from interim financial statements
- [ ] Financial data are badly distorted by inflation
- [ ] Financial ratios are inter-related, not independent
> Interim financial statements are one of ICAI's sources of financial data (SM 3.4); the other three are in its list of limitations (SM 3.36–3.37).

Q: Case scenario. For the board, Ananya takes the 2025-26 accounts of Tapri and of BrewBucks India and expresses every item of each profit and loss account as a percentage of gross sales, and every balance sheet item as a percentage of total assets. Which statement about her work is correct?
- [ ] It is horizontal analysis, useful mainly for studying trends over the years
- [ ] It is horizontal analysis, because two companies are compared
- [x] It is vertical analysis, which is useful in inter-firm comparison
- [ ] It is multivariate analysis of inter-related ratios
> Analysing the statements of a single year, with each item as a percentage of gross sales or of total assets, is vertical analysis, and ICAI notes it is useful in inter-firm comparison (SM 3.37). Horizontal analysis compares one year's statements with another year or years.

Q: Gross profit is 20% of cost. What percentage of sales is it? Give the answer to two decimals.
= 16.66..16.67
> GP ÷ sales = 20 ÷ (100 + 20) = 16.67%.
:::

## Recap

- Method: sort anchors from ratios; one ratio, one new figure; two ratios for two unknowns; "let sales be x" when the anchor enters only through the totals; balancing figure last; verify two ratios.
- CL = working capital ÷ (current ratio − 1); with inventory I, CL = I ÷ (current ratio − quick ratio).
- Closing stock = 2 × average stock − opening stock; GP g% on cost = g ÷ (100 + g) of sales.
- Present the rebuilt statements in the asked format with every balancing figure labelled.
- ICAI's six uses of ratio analysis: liquidity, long-term solvency, operating efficiency, overall profitability, inter-firm comparison, budgeting.
- Horizontal analysis compares years; vertical analysis expresses one year's items as % of gross sales or total assets.
- Eight limitations (DISWANDI): diversified lines, inflation, seasonal factors, window dressing, accounting policies and period, no standard set, difficulty to generalise, inter-related ratios.
- Ratios provide clues, not conclusions. (Even after the masala chai.)

## Flashcards

Q:: ICAI's eight limitations of financial ratios, in order?
A:: Diversified product lines; distortion by inflation; seasonal factors; window dressing of popular ratios; differences in accounting policies and accounting period; no standard set of ratios to compare with; difficulty to generalise whether a ratio is good or bad; ratios are inter-related, not independent.

Q:: What closing line does ICAI give after the limitations of ratios?
A:: Financial ratios provide clues but not conclusions; they are tools only in the hands of experts, as there is no standard ready-made interpretation of financial ratios.

Q:: What is window dressing, in ICAI's limitation?
A:: Year-end adjustments made to give a good shape to popular ratios such as the current ratio and debt-equity ratio, changing the character of the ratios.

Q:: How does ICAI suggest dealing with the interdependence of ratios?
A:: Through multivariate analysis: analysing the relationship between several variables simultaneously.

Q:: Horizontal vs vertical analysis?
A:: Horizontal: one year's statements compared with another year or years. Vertical: a single year analysed, P&L items as % of gross sales and balance sheet items as % of total assets; useful for inter-firm comparison.

Q:: The six aspects of a firm's performance for which ratio analysis is relevant?
A:: Liquidity position; long-term solvency; operating efficiency; overall profitability; inter-firm comparison; financial ratios for budgeting.

Q:: Current liabilities from working capital and current ratio?
A:: CL = working capital ÷ (current ratio − 1); CA = CL × current ratio.

Q:: Closing stock from average stock and opening stock?
A:: Closing stock = 2 × average stock − opening stock.

Q:: Gross profit of g% on cost as a percentage of sales?
A:: g ÷ (100 + g) × 100; e.g. 25% on cost = 20% of sales.

Q:: Which ratios does the Study Material say a company must now disclose in the notes to accounts?
A:: Current ratio, debt-equity, DSCR, ROE, inventory turnover, trade receivables turnover, trade payables turnover, net capital turnover, net profit ratio, ROCE and return on investment.

Q:: When must you let sales be x in a ratio question?
A:: When the only rupee figure (for example cash) enters the balance sheet only through the totals: write every item in terms of x and solve total assets = total liabilities.
