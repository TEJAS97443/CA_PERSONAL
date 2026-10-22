---
id: fm.div.models
title: Dividend theories: traditional, Walter, Gordon and Modigliani-Miller
minutes: 45
needs: fm.div.basics, fm.coc.equity
tags: Walter's model, Gordon's model, Modigliani-Miller, MM hypothesis, dividend irrelevance, bird-in-hand, Graham and Dodd, dividend discount model
labs: dividend
summary: Does the payout change the share price? Walter and Gordon say yes, through r against Ke; Graham and Dodd weight dividends more; Modigliani and Miller say no, in a perfect market.
---

## In plain words

### Pay it out, or plant it?

Tapri's board has ₹10 of earnings per share to decide on.

> **Kesar:** Pay it all out. Shareholders like cash in hand.
> **Dev:** Every rupee we keep, we invest in new cafés at 18%. Our shareholders expect only 15%. A rupee kept is worth more to them than a rupee paid.
> **Ritu:** And if the cafés earned only 12%?
> **Dev:** Then pay it all out, and let them invest it themselves at 15%.

That exchange is **Walter's model** in four lines. Two numbers decide: **r**, the return the company earns on retained earnings (its internal rate of return), and **Ke**, the return shareholders expect (the cost of equity, or capitalisation rate). If r > Ke, retaining adds value and the best payout is zero; if r < Ke, paying out adds value and the best payout is 100%; if r = Ke, the payout does not matter. **Gordon's model** reaches the same conclusions with growth built in: retained earnings make dividends grow at g = b × r. Both say the dividend decision is **relevant** to the share price.

**Modigliani and Miller (MM)** disagree. In a perfect capital market, with no taxes and no issue costs, a shareholder who wants cash can sell a few shares (a "home-made dividend"), and a company that pays a dividend must raise the money back by issuing shares. The value of the firm depends only on its earning power and its investment policy, not on how the earnings are split: the dividend decision is **irrelevant**. The **traditional approach** of Graham and Dodd stands at the other end: the market puts considerable weight on dividends, so paying more raises the price.

::: analogy The mango tree
You own a mango tree. Eat this year's mangoes, or plant the seeds? If the seeds grow into more mangoes than the same money buys at the market (r > Ke), plant them all; if the market gives you more (r < Ke), eat them all and buy elsewhere. MM add: if there is a perfect market for mango trees, you can always sell a branch when you want mangoes, so how the tree splits its fruit cannot make you richer.
:::

::: key
Walter and Gordon: dividend policy is relevant; compare r with Ke. r > Ke: zero payout is optimum; r < Ke: 100%; r = Ke: no optimum (Walter: every payout is optimum). MM: dividend policy is irrelevant; value depends on earnings and investment policy. Graham and Dodd: P = m(D + E/3), so dividends weigh more than retained earnings.
:::

## How it works

Dividend theories fall under two categories: **irrelevance theory** (the MM approach) and **relevance theory** (Walter's, Gordon's and Lintner's models) (SM 8.2, 8.14). The Study Material also studies **Graham and Dodd's model**, by which the stock market places considerable weight on dividends than on retained earnings (SM 8.39), and [[fm.div.basics|Lintner's model]] of how dividends adjust to a target payout.

::: diagram The dividend theories
{"type": "tree", "gapX": 26, "gapY": 92, "root": {"label": "Theories of\ndividend", "color": "mute", "children": [
  {"label": "Irrelevance", "color": "a", "children": [{"label": "MM\napproach", "color": "a"}]},
  {"label": "Relevance", "color": "d", "children": [{"label": "Walter's\nmodel", "color": "d"}, {"label": "Gordon's\nmodel", "color": "d"}]},
  {"label": "Also\nstudied", "color": "mute", "children": [{"label": "Graham\nand Dodd", "color": "c"}, {"label": "Lintner", "color": "c"}]}]},
 "caption": "Blue: dividend policy has no effect on value (MM). Orange: it does (Walter, Gordon). Amber: the other two models in the chapter: Graham and Dodd's traditional weighting of dividends, and Lintner's target payout (SM 8.2, 8.14, 8.39)."}
:::

### 1. The traditional approach: Graham and Dodd

According to Graham and Dodd, the stock market places considerable weight on dividends than on retained earnings (SM 8.39):

$$P = m\left(D + \frac{E}{3}\right)$$

P = market price per share, D = dividend per share, E = earnings per share, m = a multiplier. Writing E as D plus retained earnings R, P = m(4D + R) ÷ 3: a rupee paid out adds four times as much to the price as a rupee retained. With EPS of ₹12 and m = 10, a 50% payout gives P = 10(6 + 4) = ₹100, and a 75% payout ₹130.

### 2. Walter's model (SM 8.21–8.24)

**Assumptions:**

- All investment proposals of the firm are financed through retained earnings only.
- r (rate of return) and Ke (cost of capital) are constant.
- Perfect capital markets: all investors are rational and information is freely available to all.
- No taxes, or no tax discrimination between dividend income and capital appreciation (capital gain).
- No floatation or transaction cost.
- The firm has perpetual life.

$$P = \frac{D + \dfrac{r}{K_e}(E - D)}{K_e}$$

P = market price of the share, E = earnings per share, D = dividend per share, Ke = cost of equity (rate of capitalisation, discount rate), r = internal rate of return (return on investment). Prof. James E. Walter argues that in the long run share prices reflect only the present value of expected dividends, and retentions influence prices only through their effect on future dividends. Two factors drive the price: the **dividend per share**, and the **relationship between r and Ke**.

| Company | r vs Ke | Size of dividend and market price | Optimum payout |
|---|---|---|---|
| Growth | r > Ke | Negative correlation | Zero |
| Constant | r = Ke | No correlation | Every payout ratio is optimum |
| Decline | r < Ke | Positive correlation | 100% |

A growth company uses the funds better than its shareholders could, so they accept a low dividend; a declining company cannot cover its cost of capital, so shareholders prefer a higher dividend to invest elsewhere (SM 8.23). The model explains why shares of growing companies are priced high though their payout is low, and why some high-payout companies are also priced high. Retention involves an **opportunity cost**: the benefits shareholders forgo by leaving the funds in the business.

::: diagram Walter's model: price against payout (EPS ₹10, Ke 12%)
{"type": "plot", "h": 300, "x": [0, 100], "y": [50, 120], "legend": "outside",
 "xlabel": "dividend payout (%)", "ylabel": "price per share (₹)",
 "xticks": [0, 20, 40, 60, 80, 100], "yticks": [50, 60, 70, 80, 90, 100, 110, 120],
 "series": [
  {"label": "growth, r = 16%", "fn": "(0.1*x+(0.16/0.12)*(10-0.1*x))/0.12", "color": "f"},
  {"label": "constant, r = 12%", "fn": "(0.1*x+(0.12/0.12)*(10-0.1*x))/0.12", "color": "mute", "dash": true},
  {"label": "declining, r = 9%", "fn": "(0.1*x+(0.09/0.12)*(10-0.1*x))/0.12", "color": "d"}
 ],
 "caption": "Violet (r > Ke): the price falls from ₹111.11 at zero payout to ₹83.33 at 100%. Grey dashed (r = Ke): ₹83.33 whatever the payout. Orange (r < Ke): the price rises from ₹62.50 to ₹83.33. At 100% payout every firm is worth E ÷ Ke."}
:::

**Advantages** (SM 8.23–8.24): the formula is simple to understand and easy to compute; it can envisage different market prices in different situations, considering the internal rate of return, the market capitalisation rate and the payout ratio. **Limitations**: it does not consider all the factors affecting dividend policy and share prices, and the market capitalisation rate is difficult to determine; it ignores taxation, legal and contractual obligations, management policy and attitude towards dividend policy.

::: lab dividend {"model":"walter","eps":7,"r":18,"ke":15,"payout":50,"target":0}
Plot Walter's line yourself on January 2025 Q1(c)'s data: five payouts one by one, the r = Ke and r < Ke lines, then the optimum payout.
:::

### 3. Gordon's model (SM 8.26–8.33)

According to Gordon's model, dividend is relevant and dividend policy affects the value of the company. **Assumptions:**

- The firm is an all-equity firm (no debt).
- IRR remains constant, since a change in IRR would change the growth rate and the value.
- Ke remains constant, since a change in the discount rate would change the present value.
- The retention ratio (b), once decided upon, is constant: a constant dividend payout ratio is followed.
- The growth rate (g = br) is constant, since b and r are unchanged.
- **Ke > g**, necessary on the principle of the sum of a geometric progression for n years.
- All investment proposals are financed through retained earnings only.

$$P_0 = \frac{E_1(1 - b)}{K_e - br}$$

P₀ = price per share, E₁ = earnings per share, b = retention ratio (1 − b = payout ratio), Ke = cost of capital, r = IRR, br = growth rate (g). When IRR is greater than the cost of capital, the price per share increases and dividend payout decreases (SM 8.27; MCQ 9); when IRR is lower, the price is highest at a 100% payout, as the table shows.

| Company | r vs Ke | Optimum dividend payout ratio |
|---|---|---|
| Growth | r > Ke | Zero |
| Constant | r = Ke | There is no optimum ratio |
| Declining | r < Ke | 100% |

::: diagram Gordon's model: price against payout (EPS ₹10, Ke 12%)
{"type": "plot", "h": 300, "x": [40, 100], "y": [50, 170], "legend": "outside",
 "xlabel": "dividend payout (%)", "ylabel": "price per share (₹)",
 "xticks": [40, 50, 60, 70, 80, 90, 100], "yticks": [60, 80, 100, 120, 140, 160],
 "series": [
  {"label": "growth, r = 16%", "fn": "10*(x/100)/(0.12-(1-x/100)*0.16)", "color": "f"},
  {"label": "constant, r = 12%", "fn": "10*(x/100)/(0.12-(1-x/100)*0.12)", "color": "mute", "dash": true},
  {"label": "declining, r = 9%", "fn": "10*(x/100)/(0.12-(1-x/100)*0.09)", "color": "d"}
 ],
 "caption": "The same three firms as Walter's chart. Violet (r > Ke): ₹166.67 at a 40% payout, falling to ₹83.33 at 100%; the curve shoots up as retention approaches Ke ÷ r (75%), where g would equal Ke and the formula fails. Grey dashed: ₹83.33 throughout. Orange: ₹60.61 at 40%, rising to ₹83.33."}
:::

**The bird-in-hand theory: Gordon's revised model.** Gordon later considered risk and uncertainty, with two arguments: (i) investors are risk averse, and (ii) they put a premium on a certain return and a discount on an uncertain return. What is available at present is preferable to what may be available in the future, so investors pay a higher price for shares that pay current dividends and discount shares of a firm that postpones dividends (SM 8.28):

$$P_0 = \frac{D_0(1 + g)}{K_e - g}$$

P₀ = market price per share (ex-dividend), D₀ = current year dividend, g = constant annual growth rate of dividends, Ke = cost of equity (expected rate of return).

**The dividend discount model (DDM)** values a share at the discounted value of its future dividends, at an appropriate risk-adjusted rate: intrinsic value = PV of dividends + PV of the sale price (SM 8.29):

$$\text{Intrinsic value} = \frac{D_1}{(1+K_e)^1} + \frac{D_2}{(1+K_e)^2} \qquad + \dots + \frac{D_n}{(1+K_e)^n} + \frac{RV_n}{(1+K_e)^n}$$

Three situations (SM 8.30–8.31):

- **Zero growth**: every dividend the same, P₀ = D ÷ Ke (a ₹5 dividend at 10% is worth ₹50).
- **Constant growth** (Gordon's growth model): P = D₀(1 + g) ÷ (Ke − g), with g = b × r.
- **Variable growth** (multi-stage): most commonly three stages, an initial high growth, a transition to slower growth, then a sustainable steady rate. Each phase is valued with the constant-growth method and the present values are added.

**Advantages of Gordon's model** (SM 8.32): the dividend discount model is a useful heuristic model that relates the present stock price to the present value of its future cash flows; and it is easy to understand. **Limitations of Gordon's model**: it depends on projections about the company's growth rate and future capitalisation rates, which may be difficult to calculate accurately; and the true intrinsic value of a stock is difficult to determine realistically.

**Important considerations** (SM 8.32–8.33): with dividends growing at g, the share price also grows at g; g is also called capital appreciation or capital yield; and the dividend yield D₁ ÷ P₀ stays constant.

::: lab dividend {"model":"gordon","eps":6,"r":20,"ke":16,"payout":50,"target":0}
Step through Study Material Illustration 4 on the price-against-payout curve, with the payouts where g = br reaches Ke flagged.
:::

### 4. The Modigliani-Miller hypothesis (SM 8.14–8.21)

Proposed by Franco Modigliani and Merton Miller in 1961, the MM approach supports the **irrelevance** of dividends: a firm's dividend policy has no effect on either the price of its stock or its cost of capital. According to MM, ==the market value of equity shares depends solely on its earning power== and is not influenced by the manner in which earnings are split between dividends and retained earnings; it is not affected by dividend size; and there is no meaningful distinction between dividends and share repurchases, both ways of returning cash to shareholders.

**Assumptions:**

- **Perfect capital markets**: all investors are rational and information is freely available to all.
- **No taxes**, or no tax discrimination between dividend income and capital gains.
- **Fixed investment policy**: all investment is financed through equity only.
- **No floatation or transaction cost.**
- **Risk of uncertainty does not exist**: investors forecast future prices and dividends with certainty, and one discount rate is appropriate for all securities and periods.

**Three situations**, in each of which the value of the firm is unchanged:

1. **Cash dividend from reserves and surplus**: cash moves from one pocket of the shareholders to another, with no net gain or loss.
2. **Cash dividend from a new issue of shares**: shareholders receive cash but suffer an equal capital loss through dilution of control and of earnings per share.
3. **No dividend**: a shareholder who wants cash sells part of the holding, the **home-made dividend**, a capital receipt matched by a capital loss through dilution.

MM's case rests on the **arbitrage argument**. The share price at the start equals the year-end price plus dividend, discounted at Ke:

$$P_0 = \frac{P_1 + D_1}{1 + K_e}$$

Multiplying by n shares and allowing for the Δn new shares issued to fund the investment I from earnings E, the value of the firm is the same whether or not dividends are paid:

$$nP_0 = \frac{(n + \Delta n)P_1 - I + E}{1 + K_e} \qquad \Delta n = \frac{I - (E - nD_1)}{P_1}$$

D₁ disappears from the value of the firm: the dividend raises the funds to be found by new shares by exactly the dividend paid (SM 8.17–8.18).

::: diagram MM: the shareholder's pocket stays the same
{"type": "flow", "w": 420, "nodes": [
  {"id": "s", "kind": "start", "label": "Earnings E;\ninvestment I", "color": "mute"},
  {"id": "d", "kind": "decision", "label": "Dividend\npaid?", "color": "c"},
  {"id": "p", "kind": "process", "label": "Cash in hand;\nP₁ lower by D₁", "color": "a"},
  {"id": "n", "kind": "process", "label": "No cash; P₁\nhigher by D₁", "color": "e"},
  {"id": "pi", "kind": "process", "label": "More new\nshares issued", "color": "a"},
  {"id": "ni", "kind": "process", "label": "Fewer new\nshares issued", "color": "e"},
  {"id": "v", "kind": "end", "label": "Same value\nof the firm", "color": "ok"}],
 "edges": [["s", "d"], ["d", "p", "yes"], ["d", "n", "no"], ["p", "pi"], ["n", "ni"], ["pi", "v"], ["ni", "v"]],
 "caption": "Blue: the dividend route; sky blue: no dividend. Either way the year-end value (n + Δn)P₁ plus dividends paid, less the investment, is the same, so nP₀ does not change."}
:::

**Advantages** (SM 8.19): the model is logically consistent, and it provides a satisfactory framework on dividend policy with the concept of the arbitrage process. **Limitations**: the validity of its assumptions is questionable, and it may not be valid under uncertainty. In the real world, market imperfections create problems for MM's irrelevance proposition (SM 8.21).

::: lab dividend {"model":"mm","shares":10000,"p0":100,"ke":10,"dps":5,"earn":100000,"invest":200000}
Step through Study Material Illustration 1: P1 with and without the dividend, the new shares needed, and the same value of the firm both ways.
:::

### The theories side by side

| Point | Walter | Gordon | MM |
|---|---|---|---|
| Dividend policy | Relevant | Relevant | Irrelevant |
| Growth | Not compounded | g = br | – |
| Optimum, r > Ke | Zero | Zero | None |
| Optimum, r = Ke | Any payout | No optimum | None |
| Optimum, r < Ke | 100% | 100% | None |

The formulas are in Formats and formulas below.

## Formats and formulas

*Reproduce these from memory; write the formula, then the figures.*

::: formula Graham and Dodd (traditional approach)
$$P = m\left(D + \frac{E}{3}\right)$$
m = a multiplier (SM 8.39).
:::

::: formula Walter's model
$$P = \frac{D + \dfrac{r}{K_e}(E - D)}{K_e}$$
r = return on investment; Ke = capitalisation rate (SM 8.22).
:::

::: formula Gordon's model
$$P_0 = \frac{E_1(1 - b)}{K_e - br} \qquad P_0 = \frac{D_0(1 + g)}{K_e - g} = \frac{D_1}{K_e - g}$$
b = retention ratio; g = br; valid only if Ke > g (SM 8.27, 8.29).
:::

::: formula Zero growth and multi-stage DDM
$$P_0 = \frac{D}{K_e} \qquad P_0 = \sum_{t=1}^{n} \frac{D_t}{(1+K_e)^t} \qquad + \frac{D_{n+1}}{K_e - g} \times \frac{1}{(1+K_e)^n}$$
The second term is the price at the end of the high-growth years, discounted (SM 8.30; 8.51 and 8.54).
:::

::: formula Modigliani-Miller
$$P_0 = \frac{P_1 + D_1}{1 + K_e} \qquad nP_0 = \frac{(n + \Delta n)P_1 - I + E}{1 + K_e}$$
Δn = funds required ÷ P₁, where funds required = I − (E − nD₁) (SM 8.17–8.18).
:::

**The MM four steps** (SM 8.19–8.21, Illustration 1)

| Step | Dividend paid | Dividend not paid |
|---|---|---|
| 1. Year-end price | P₁ = P₀(1 + Ke) − D₁ | P₁ = P₀(1 + Ke) |
| 2. Funds required | I − (E − nD₁) | I − E |
| 3. New shares | Δn = funds required ÷ P₁ | Δn = funds required ÷ P₁ |
| 4. Value of firm | [(n + Δn)P₁ − I + E] ÷ (1 + Ke) | Same formula: same value |

## Worked examples

:::: example Walter and Gordon, before and after the boom
Tapri's figures for 2026-27: profit after tax ₹72 crore; 9% preference share capital ₹200 crore; 6 crore equity shares; cost of equity 14%; dividend payout ratio 50%. While the new cafés are being built, Tapri earns 21% on retained earnings; once they mature, Dev expects only 10%.

**Required:**

(i) Calculate EPS, and the price per share by Walter's model and by Gordon's model, at a return of 21%.

(ii) Recalculate both prices at a return of 10%, and state the optimum payout ratio under each model at each return.

(iii) At what return on retained earnings would the payout ratio not affect the price, and what would the price then be?

(iv) While the return is 21%, Kesar wants to cut the payout to 30%. Calculate the price by Walter's model, and explain why Gordon's model cannot be applied.

::: answer Show the working
**Working note: EPS**

| Particulars | ₹ crore |
|---|---:|
| Profit after tax | 72 |
| Less: Preference dividend (9% of ₹200 crore) | 18 |
| Earnings for equity shareholders | 54 |
| **EPS** (₹54 crore ÷ 6 crore shares) | **₹9** |

At a 50% payout, D = ₹4.50 and b = 0.5.

**(i) At r = 21%**

$$\text{Walter: } P = \frac{4.50 + \dfrac{0.21}{0.14}(9 - 4.50)}{0.14} \qquad = \frac{4.50 + 6.75}{0.14} = \text{₹}80.36$$

$$\text{Gordon: } P_0 = \frac{9(1 - 0.5)}{0.14 - 0.5 \times 0.21} \qquad = \frac{4.50}{0.035} = \text{₹}128.57$$

**(ii) At r = 10%**

$$\text{Walter: } P = \frac{4.50 + \dfrac{0.10}{0.14}(9 - 4.50)}{0.14} \qquad = \frac{4.50 + 3.214}{0.14} = \text{₹}55.10$$

$$\text{Gordon: } P_0 = \frac{4.50}{0.14 - 0.5 \times 0.10} \qquad = \frac{4.50}{0.09} = \text{₹}50.00$$

| Return (r) | Walter: optimum payout | Gordon: optimum payout |
|---|---:|---:|
| 21%, r > Ke | Zero | Zero |
| 10%, r < Ke | 100% | 100% |

At 21%, Walter's price at zero payout is (1.5 × 9) ÷ 0.14 = ₹96.43. At 10%, both models give ₹9 ÷ 0.14 = ₹64.29 at a 100% payout.

**(iii)** When r = Ke = 14%, the payout does not affect the price: Walter's model gives every payout ratio as optimum and Gordon's has no optimum ratio. Both then give P = E ÷ Ke = ₹9 ÷ 0.14 = **₹64.29** at any payout.

**(iv) Payout 30%** (D = ₹2.70, b = 0.7):

$$\text{Walter: } P = \frac{2.70 + 1.5 \times 6.30}{0.14} \qquad = \frac{12.15}{0.14} = \text{₹}86.79$$

Under Gordon's model, g = br = 0.7 × 21% = 14.7%, which exceeds Ke of 14%. The model assumes Ke > g; with g above Ke the denominator is negative and the formula gives no meaningful price. Gordon's model can be applied here only while b stays below Ke ÷ r = 0.14 ÷ 0.21, a retention ratio of two-thirds.
:::
::::

:::: example Two sister companies, two limits
Two listed companies in the Tapri group report the following. The risk-free rate is 6% and the market return 11%; each company's cost of equity is found by CAPM.

| Particulars | Chai Express Ltd | Chulha Foods Ltd |
|---|---:|---:|
| EPS (₹) | 15 | 12 |
| Dividend per share (₹) | 9 | 3 |
| Return on retained earnings (r) | 18% | 9% |
| Beta | 1.2 | 1.8 |

**Required (Walter's model):**

(i) Calculate each company's cost of equity and its price per share at the present payout.

(ii) State each company's optimum payout ratio and the price at it.

(iii) Chai Express's board will not let the payout fall below 30%, and Chulha Foods' lenders will not let it pay out more than 60% of its earnings. Calculate the highest price each can reach within its limit, and comment.

::: answer Show the working
**(i) Cost of equity and present price**

Chai Express: Ke = 6% + 1.2 × (11% − 6%) = **12%**; r ÷ Ke = 18 ÷ 12 = 1.5.

$$P = \frac{9 + 1.5 \times (15 - 9)}{0.12} \qquad = \frac{9 + 9}{0.12} = \text{₹}150.00$$

Chulha Foods: Ke = 6% + 1.8 × 5% = **15%**; r ÷ Ke = 9 ÷ 15 = 0.6.

$$P = \frac{3 + 0.6 \times (12 - 3)}{0.15} \qquad = \frac{3 + 5.40}{0.15} = \text{₹}56.00$$

**(ii) Optimum payout**

- Chai Express (r 18% > Ke 12%, a growth firm): the optimum payout is **zero**; P = (1.5 × 15) ÷ 0.12 = **₹187.50**.
- Chulha Foods (r 9% < Ke 15%, a declining firm): the optimum payout is **100%**; P = ₹12 ÷ 0.15 = **₹80.00**.

**(iii) Within the limits**

Chai Express at the 30% floor (D = ₹4.50):

$$P = \frac{4.50 + 1.5 \times 10.50}{0.12} \qquad = \frac{20.25}{0.12} = \text{₹}168.75$$

Chulha Foods at the 60% cap (D = ₹7.20):

$$P = \frac{7.20 + 0.6 \times 4.80}{0.15} \qquad = \frac{10.08}{0.15} = \text{₹}67.20$$

**Comment.** Under Walter's model the price moves in one direction with the payout: down for a growth firm, up for a declining firm. So each company should go as far towards its optimum as its limit allows: Chai Express to the 30% floor (₹168.75, against ₹150 now), Chulha Foods to the 60% cap (₹67.20, against ₹56 now). The limits cost ₹18.75 and ₹12.80 a share against the unconstrained optimum.
:::
::::

:::: example Fading growth: the DDM, forwards and backwards
Tapri paid a dividend of ₹6 per share for the year just ended. Dev expects dividends to grow by 15% next year, 12% the year after and 9% in the third year, and by 6% a year thereafter, indefinitely. Equity shareholders require 12%. The share is quoted at ₹120. PV factors at 12%: 0.893, 0.797, 0.712.

**Required:**

(i) Calculate the intrinsic value per share by the dividend discount model and state whether the share is over- or underpriced.

(ii) Keeping Dev's forecast for the first three years, calculate the long-run growth rate that the market price of ₹120 implies.

::: answer Show the working
**(i) PV of the dividends of the first three years**

| Year | Dividend (₹) | PVF @ 12% | PV (₹) |
|---|---:|---:|---:|
| 1 | 6 × 1.15 = 6.900 | 0.893 | 6.162 |
| 2 | 6.900 × 1.12 = 7.728 | 0.797 | 6.159 |
| 3 | 7.728 × 1.09 = 8.424 | 0.712 | 5.998 |
| | **PV of dividends** | | **18.319** |

**Price at the end of year 3** (constant growth from year 4):

$$P_3 = \frac{D_4}{K_e - g} = \frac{8.424 \times 1.06}{0.12 - 0.06} \qquad = \frac{8.929}{0.06} = \text{₹}148.82$$

PV of P₃ = ₹148.82 × 0.712 = ₹105.96.

**Intrinsic value** = ₹18.32 + ₹105.96 = **₹124.28** (three-decimal PV factors; with unrounded factors, ₹124.24).

The share is quoted at ₹120, below its intrinsic value: it is **underpriced** by ₹4.28.

**(ii) Implied long-run growth.** At the market price, the PV of P₃ must be ₹120 − ₹18.319 = ₹101.681, so P₃ = ₹101.681 ÷ 0.712 = ₹142.81. Then

$$142.81 = \frac{8.424 (1 + g)}{0.12 - g} \qquad \Rightarrow 17.137 - 142.81g = 8.424 + 8.424g$$

so 151.234g = 8.713 and **g = 5.76%**. The market is pricing long-run growth of about 5.8% against Dev's 6%: a quarter of a percentage point of growth explains the whole ₹4.28 gap, which shows how sensitive the value is to g when g is close to Ke.
:::
::::

:::: example MM: three ways to spend one year's profit
Sheetal Cold Chain Ltd, a listed refrigerated-transport company, has 4,00,000 equity shares quoted at ₹125. The capitalisation rate for its risk class is 12%. It expects net income of ₹70,00,000 for the year and plans new investments of ₹56,00,000. The board is choosing between three policies for the end of the year:

- Policy A: pay out only the surplus, ₹14,00,000, as a dividend of ₹3.50 per share.
- Policy B: pay a dividend of ₹15 per share and issue new shares for the shortfall.
- Policy C: pay no dividend and use the surplus to buy back shares at the year-end price.

**Required (MM approach):**

(i) Calculate the market price per share at the end of the year under each policy.

(ii) Calculate the number of shares issued or bought back under each policy.

(iii) Show that the value of the firm is the same under all three.

(iv) Kesar holds 1,000 shares and wants ₹7,000 in cash this year. Show his position at the year end under Policies B and C.

::: answer Show the working
**(i) Year-end price**: P₁ = P₀ (1 + Ke) − D₁ = ₹125 × 1.12 − D₁ = ₹140 − D₁.

| Policy | Dividend per share (₹) | P₁ (₹) |
|---|---:|---:|
| A | 3.50 | 136.50 |
| B | 15.00 | 125.00 |
| C | nil | 140.00 |

**(ii) Shares issued or bought back**: ΔnP₁ = I − (E − nD₁).

| Particulars | A (₹) | B (₹) | C (₹) |
|---|---:|---:|---:|
| Investment (I) | 56,00,000 | 56,00,000 | 56,00,000 |
| Net income (E) | 70,00,000 | 70,00,000 | 70,00,000 |
| Less: Total dividend (nD₁) | 14,00,000 | 60,00,000 | nil |
| Retained earnings | 56,00,000 | 10,00,000 | 70,00,000 |
| ΔnP₁ = I − retained earnings | nil | 46,00,000 | (14,00,000) |
| Δn | **nil** | **36,800 issued** | **10,000 bought back** |

Δn: B ₹46,00,000 ÷ ₹125 = 36,800 new shares; C ₹14,00,000 ÷ ₹140 = 10,000 shares bought back.

**(iii) Value of the firm**: nP₀ = [(n + Δn) P₁ − I + E] ÷ (1 + Ke).

| Particulars | A | B | C |
|---|---:|---:|---:|
| Shares at the year end | 4,00,000 | 4,36,800 | 3,90,000 |
| (n + Δn) P₁ (₹) | 5,46,00,000 | 5,46,00,000 | 5,46,00,000 |
| Add: E − I (₹) | 14,00,000 | 14,00,000 | 14,00,000 |
| Total (₹) | 5,60,00,000 | 5,60,00,000 | 5,60,00,000 |
| **Value today (÷ 1.12) (₹)** | **5,00,00,000** | **5,00,00,000** | **5,00,00,000** |

The value of the firm is ₹5 crore (4,00,000 × ₹125) under every policy: the dividend decision does not change it.

**(iv) Kesar's home-made dividend**

- Policy B: he receives ₹15,000, keeps ₹7,000 and reinvests ₹8,000 in 64 new shares at ₹125. He ends with 1,064 shares × ₹125 = ₹1,33,000 plus ₹7,000 cash = **₹1,40,000**.
- Policy C: he receives nothing and sells 50 shares at ₹140 for ₹7,000. He ends with 950 shares × ₹140 = ₹1,33,000 plus ₹7,000 cash = **₹1,40,000**.

His holding is 1,064 ÷ 4,36,800 = 950 ÷ 3,90,000 = 0.2436% of the company either way. (Under Policy A his wealth is also 1,000 × ₹136.50 + ₹3,500 = ₹1,40,000.) He makes his own dividend, which is why MM call the policy irrelevant.
:::
::::

## Under the hood

### Walter and Gordon, the same idea with and without compounding

Walter's formula is two perpetuities: D ÷ Ke for the dividend, and (r ÷ Ke)(E − D) ÷ Ke for the retained earnings, each rupee of which earns r for ever. It does not let the earnings on retained earnings be retained again. Gordon's model does: dividends grow at g = br, so its prices react more strongly to retention, and the price explodes as br approaches Ke. That is why Gordon needs Ke > g, and why, for the growth firm in the chart, a payout of 25% (b = 0.75, br = 12%) has no Gordon price at all.

### Ke from the P/E ratio, and P/E from Gordon

When a Walter question gives a P/E ratio and no Ke, ICAI takes Ke as the inverse of the P/E ratio (SM 8.49, problem 2; RTP January 2025 Q8), which is the earnings price approach of [[fm.coc.equity|the cost of equity]]. Dividing Gordon's formula by E gives P/E = (1 − b) ÷ (Ke − br), the "justified P/E ratio" that ICAI's suggested answer to May 2025 Q1(b) used to find the retention ratio (70%) for a target P/E of 12.

### Beyond the Study Material

RTP September 2026 Q6 asks for share prices "if the radical position holds", with dividends taxed at 25% and capital gains at 12%: each price is the one at which the post-tax return equals 18% (₹83.02 for the non-paying firm, ₹81.79 for the paying firm, in the RTP's answer). The Study Material's MM model assumes no tax discrimination and does not discuss this view. MM's better-known propositions on capital structure are a different theory: [[fm.cs.theories|capital structure theories]].

### Printed figures, checked

The Study Material's answer to problem 2 writes "Ke is 8 (i.e., 1/12.5)": read 8%. Illustration 8 rounds Δn of 5,882.35 up to 5,883 shares; ICAI's answers keep fractional shares or round them; either way the value of the firm does not change.

## Exam angle

::: exam Where the theories appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, a dividend model appeared in every past paper from May 2024 to May 2026 (the OCR text of the September 2026 paper shows none):

- **Walter**: January 2025 Q1(c) (5 marks: price ₹51.33, then the payout of 85.714% for a price of ₹48); May 2025 Q2(b) (2 marks: maximum price ₹26.67 at zero payout, minimum ₹20 at 100%); May 2026 Q3(a) (4 marks: price ₹45.33 at retention 20%, retention of 75% for a price of ₹60, Gordon's optimum payout zero). With a P/E ratio for Ke, in the same three parts each time (is the policy optimal; the P/E ratio at which dividend policy has no effect; does the decision change at another P/E ratio): RTP January 2025 Q8, MTP Series II for May 2025, MTP Series II for September 2026. Limitations: MTP Series I for January 2026 Q4(c) (2 marks).
- **Gordon and DDM**: May 2024 Q3(b) (Vista Ltd, two-stage DDM, ₹86.33); May 2025 Q1(b) (5 marks, retention for a target P/E); September 2025 Q2(b) (3 marks, DPS of ₹7 from a price of ₹159.09; no optimum when r = Ke); four assumptions of Gordon's model (September 2024 Q4(b), 4 marks); effect of a higher payout on price (RTP January 2025 MCQ 2: a fall of ₹444.45; MTP Series II for September 2025 MCQ 8).
- **MM**: January 2026 Q1(c) (5 marks: Gordon price ₹240, then MM year-end price ₹288 and the earnings required, ₹3,32,000); assumptions of MM (May 2026 Q4(a), 4 marks); value with and without dividend (RTP May 2024 Q6; MTP Series I for May 2025; MTP Series I for September 2026); retaining instead of paying leaves wealth unchanged (MTP Series I for January 2025 MCQ 8).
- **Graham and Dodd**: old scheme November 2023 Q1(c)(i) (2 marks, P = 5(36 + 20) = ₹280); the Study Material's MCQ 10.
:::

::: exam The traps ICAI used
- Preference dividend first: EPS = (net profit − preference dividend) ÷ equity shares (May 2026 Q3(a); Illustrations 3 and 4).
- "Retention ratio of 20%" means payout 80%: D = 0.8 × EPS (May 2026 Q3(a)).
- Gordon in its D form needs D₁ = D₀(1 + g): January 2026 Q1(c) took 10 × 1.2 ÷ (0.25 − 0.20) = ₹240.
- Walter's optimum when r = Ke is "every payout ratio"; Gordon's is "no optimum ratio" (September 2025 Q2(b)).
- MM funds required subtract retained earnings (E − nD₁), not total earnings, when a dividend is paid.
- "The P/E ratio at which the dividend policy will have no effect": the one at which Ke = r, so P/E = 1 ÷ r (for r = 15%, a P/E of 6.67; SM 8.50).
:::

::: trick The r-versus-Ke switch
One comparison answers every "optimum payout" question in Walter and Gordon: r > Ke, zero; r < Ke, 100%; r = Ke, payout does not matter. At 100% payout both models give P = E ÷ Ke. Condition: the models' assumptions (r and Ke constant, retained earnings the only finance).
:::

## Answer frame

**"MM hypothesis is based on certain assumptions. What are they?"** (May 2026 Q4(a), 4 marks): the five, in ICAI's order and words: perfect capital markets; no taxes (with the reason: universal applicability, since tax rates differ between countries); fixed investment policy; no floatation or transaction cost; no risk of uncertainty, one discount rate for all securities and periods.

**"List any four assumptions of Gordon's model"** (September 2024 Q4(b), 4 marks): all-equity firm; IRR constant; Ke constant; retention ratio constant; growth rate g = br constant; Ke > g; investments financed by retained earnings only. Give the reason ICAI attaches to each.

**"Briefly explain the assumptions of Walter's model"** (old scheme May 2022 Q6(b), 4 marks): the six assumptions above.

**"State the limitations of Walter's model"** (MTP Series I for January 2026, 2 marks): does not consider all factors, and Ke is difficult to determine; ignores taxation, legal and contractual obligations, management policy and attitude.

**Numerical answers**: working notes first (EPS after preference dividend, DPS, r and Ke, including Ke from a P/E ratio), then the formula, the figures and the result; end with the r against Ke conclusion in one sentence.

## Common mistakes

::: mistake Hall of Shame: forgetting the preference dividend
Dividing Tapri's ₹72 crore by 6 crore shares gives EPS of ₹12 and every price after it wrong. **Fix:** deduct the preference dividend first: (72 − 18) ÷ 6 = ₹9.
:::

::: mistake Last year's dividend in Gordon's numerator
P = 10 ÷ (0.25 − 0.20) = ₹200 for January 2026's PQR Ltd. **Fix:** the formula needs next year's dividend, D₀(1 + g) = ₹12, so P = ₹240.
:::

::: mistake MM with the wrong funds required
With a dividend paid, the funds to be raised are I − (E − nD₁), not I − E. **Fix:** in Sheetal Cold Chain's Policy B, ₹56,00,000 − (₹70,00,000 − ₹60,00,000) = ₹46,00,000, at the dividend-case price of ₹125; I − E would even say ₹14,00,000 is left over.
:::

::: mistake The optimum payout as a "balanced" 50%
Under Walter and Gordon the optimum is a corner: zero or 100%. **Fix:** compare r with Ke and write the corner; only r = Ke makes the payout irrelevant.
:::

## Practice

::: quiz Check yourself
Q: A company has EPS of ₹8 and pays a dividend of ₹4. Its return on investment is 15% and its cost of equity 12%. What is the price per share by Walter's model (₹)?
= 75
> P = [4 + (0.15 ÷ 0.12) × (8 − 4)] ÷ 0.12 = (4 + 5) ÷ 0.12 = ₹75.

Q: EPS is ₹10, the retention ratio 40%, the return on retained earnings 15% and the cost of equity 12%. What is the price per share by Gordon's model (₹)?
= 100
> g = 0.4 × 15% = 6%; P₀ = 10 × 0.6 ÷ (0.12 − 0.06) = 6 ÷ 0.06 = ₹100.

Q: Case scenario. Masala Mills Ltd earns 11% on the funds it retains; its shareholders expect 14%. Its EPS is ₹20 and it pays out 50%. The managing director asks the CFO what Walter's model recommends. Which of the following is correct?
- [ ] Retain all earnings, since retention always adds growth
- [ ] Keep the 50% payout, since it balances growth and income
- [x] Pay out 100% of earnings, since r is less than Ke
- [ ] The payout does not matter, since dividend policy is irrelevant
> r (11%) < Ke (14%): a declining firm in Walter's terms; positive correlation between dividend and price, so the optimum payout is 100%. Irrelevance is MM's view, not Walter's.

Q: Under the MM approach, a share is quoted at ₹200 at the start of the year, the capitalisation rate is 10% and a dividend of ₹12 is expected at the year end. What is the year-end price if the dividend is paid (₹)?
= 208
> P₀ = (P₁ + D₁) ÷ (1 + Ke): 200 × 1.10 = P₁ + 12, so P₁ = ₹208 (₹220 with no dividend).

Q: Which of the following are assumptions of the MM dividend irrelevance hypothesis? Select all that apply.
- [x] Perfect capital markets, with information freely available to all
- [x] No floatation or transaction costs
- [ ] All investment financed by retained earnings only, with r and Ke constant
- [x] No risk of uncertainty: one discount rate for all securities and periods
> The third is Walter's (and Gordon's) assumption. MM's five: perfect markets, no taxes, fixed investment policy, no floatation or transaction cost, no uncertainty.

Q: By Graham and Dodd's model, with a multiplier of 8, EPS of ₹24 and a payout of 25%, what is the price per share (₹)?
= 112
> D = 25% × ₹24 = ₹6; P = m(D + E ÷ 3) = 8 × (6 + 8) = ₹112.
:::

## Recap

- Relevance: Walter and Gordon; irrelevance: MM; Graham and Dodd weight dividends more: P = m(D + E/3).
- Walter: P = [D + (r ÷ Ke)(E − D)] ÷ Ke; r > Ke zero payout, r < Ke 100%, r = Ke every payout optimum.
- Gordon: P₀ = E₁(1 − b) ÷ (Ke − br) = D₁ ÷ (Ke − g); needs Ke > g; r = Ke has no optimum ratio.
- Bird-in-hand: risk-averse investors prefer certain current dividends. DDM: zero growth D ÷ Ke; constant growth; multi-stage = PV of dividends + PV of the price at the end of the high-growth phase.
- MM: value depends on earning power and investment policy; P₀ = (P₁ + D₁) ÷ (1 + Ke); nP₀ = [(n + Δn)P₁ − I + E] ÷ (1 + Ke); Δn = [I − (E − nD₁)] ÷ P₁.
- MM assumptions: perfect markets, no taxes, fixed investment policy, no floatation or transaction cost, no uncertainty; dividends and repurchases are equivalent.
- Walter limitations: not all factors, Ke hard to determine, ignores taxes, legal and contractual obligations, management attitude.
- Preference dividend before EPS; D₁, not D₀, in Gordon; Ke = 1 ÷ P/E when only P/E is given. (Plant the seeds only if they beat the market.)

## Flashcards

Q:: Walter's model: formula?
A:: P = [D + (r ÷ Ke)(E − D)] ÷ Ke, where D = DPS, E = EPS, r = return on investment, Ke = cost of equity (capitalisation rate).

Q:: Walter's model: optimum payout for growth, constant and declining firms?
A:: Growth (r > Ke): zero. Constant (r = Ke): every payout ratio is optimum. Declining (r < Ke): 100%.

Q:: Six assumptions of Walter's model?
A:: Investments financed by retained earnings only; r and Ke constant; perfect capital markets; no taxes or tax discrimination; no floatation or transaction cost; perpetual life.

Q:: Gordon's model: formula (earnings form)?
A:: P₀ = E₁(1 − b) ÷ (Ke − br), where b = retention ratio and br = g.

Q:: Gordon's model: optimum payout when r > Ke, r = Ke, r < Ke?
A:: Zero; there is no optimum ratio; 100%.

Q:: Seven assumptions of Gordon's model?
A:: All-equity firm; IRR constant; Ke constant; retention ratio constant; growth (br) constant; Ke > g; investments financed by retained earnings only.

Q:: Bird-in-hand theory (Gordon's revised model): its two arguments?
A:: Investors are risk averse; they put a premium on a certain return and a discount on an uncertain return, so they prefer current dividends.

Q:: Dividend discount model: zero-growth and constant-growth price?
A:: Zero growth: P₀ = D ÷ Ke. Constant growth: P₀ = D₀(1 + g) ÷ (Ke − g).

Q:: MM hypothesis: the central claim?
A:: The market value of equity shares depends solely on the firm's earning power, not on how earnings are split between dividends and retained earnings; dividend policy is irrelevant.

Q:: Five assumptions of the MM dividend hypothesis?
A:: Perfect capital markets; no taxes (or no tax discrimination); fixed investment policy (equity financing); no floatation or transaction cost; no risk of uncertainty.

Q:: MM: formulas for P₀ and for the value of the firm?
A:: P₀ = (P₁ + D₁) ÷ (1 + Ke); nP₀ = [(n + Δn)P₁ − I + E] ÷ (1 + Ke), with Δn = [I − (E − nD₁)] ÷ P₁.

Q:: Graham and Dodd's model?
A:: P = m(D + E/3): the market places considerable weight on dividends than on retained earnings; m is a multiplier.
