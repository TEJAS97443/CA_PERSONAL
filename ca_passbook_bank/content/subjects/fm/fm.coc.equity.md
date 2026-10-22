---
id: fm.coc.equity
title: Cost of equity and of retained earnings
minutes: 35
needs: fm.coc.debt
tags: cost of equity, Gordon's model, CAPM, beta, realised yield, cost of retained earnings, dividend price approach, earnings price approach
labs:
summary: Why equity and retained earnings are not free: the five ICAI approaches to the cost of equity (dividend price, earnings price, growth, realised yield, CAPM) and the cost of retained earnings.
---

## In plain words

### "Shareholders don't send us an interest bill"

Dev is pricing every source of money for Tapri's expansion. Kesar thinks he has spotted a short cut.

> **Kesar:** Debt has interest, preference has a fixed dividend. Equity? We pay what we like, or nothing. And the profits we kept back are our own money. Both are free!
> **Dev:** Our shareholders paid ₹240 a share. They are not being charitable: they expect a return on that ₹240, and if we stop delivering it the price falls until the new, lower price gives them the return they want.
> **Kesar:** And the profits we kept?
> **Dev:** Every rupee we kept is a dividend they did not get. They could have invested it themselves. Free money has the longest invoice.

The **cost of equity (Ke)** is the return equity shareholders expect from the company. Nobody prints it on the share, because the dividend is not fixed, so it is found as a balancing figure: value is performance divided by expectations, so if you know the value (the share price) and the performance (the dividends or earnings), the expectation drops out (SM 4.19). Different assumptions about the performance give different methods; a fifth method, CAPM, builds the expectation from risk instead.

The **cost of retained earnings (Kr)** is the opportunity cost of the dividends shareholders gave up (SM 4.28).

::: analogy The flat that pays rent
A flat earns ₹3 lakh of rent a year and sells for ₹60 lakh. Buyers paying ₹60 lakh are telling you they expect 5% a year. If the rent is expected to rise 4% every year, they are content with a 5% rent yield because the rising rent adds the other 4%: they expect 9%. That is Gordon's model: Ke = next dividend ÷ price + growth. The share is the flat, the dividend is the rent, and the price says what the market expects.
:::

::: key
Equity has a cost even though no payment is fixed: it is the return shareholders expect, read off the share price (dividend or earnings approaches, Gordon's model, realised yield) or built from risk (CAPM). Retained earnings cost the shareholders' forgone return, normally a little below Ke because there is no flotation cost.
:::

## How it works

### Five approaches, and when ICAI uses each

The Study Material ties the method to the data (SM 4.19):

::: diagram Which approach for the cost of equity?
{"type": "flow", "w": 400, "nodes": [
  {"id": "s", "kind": "start", "label": "What can be forecast?"},
  {"id": "q1", "kind": "decision", "label": "Dividend constant?"},
  {"id": "dp", "kind": "end", "label": "Dividend price\napproach", "color": "a"},
  {"id": "q2", "kind": "decision", "label": "EPS constant?"},
  {"id": "ep", "kind": "end", "label": "Earnings price\napproach", "color": "b"},
  {"id": "q3", "kind": "decision", "label": "Constant growth?"},
  {"id": "gm", "kind": "end", "label": "Growth approach\n(Gordon's model)", "color": "c"},
  {"id": "q4", "kind": "decision", "label": "Risk and beta\ngiven?"},
  {"id": "cp", "kind": "end", "label": "CAPM", "color": "d"},
  {"id": "ry", "kind": "end", "label": "Realised yield\n(looks into past)", "color": "f"}],
 "edges": [["s", "q1"], ["q1", "dp", "yes"], ["q1", "q2", "no"], ["q2", "ep", "yes"], ["q2", "q3", "no"], ["q3", "gm", "yes"], ["q3", "q4", "no"], ["q4", "cp", "yes"], ["q4", "ry", "no"]],
 "caption": "ICAI's guide (SM 4.19): constant dividend, dividend price; constant EPS, earnings price; constant growth, Gordon's model; hard to forecast, realised yield; expectation driven by risk, CAPM. The first four find Ke as a balancing figure from the price; CAPM builds it from risk."}
:::

### The approaches one by one

::: steps
1. **Dividend price approach** (the dividend valuation model): the dividend per share is expected to stay constant forever, so Ke = expected dividend ÷ market price (ex-dividend) (SM 4.20).
2. **Earnings price approach**: each investor expects a certain earning, distributed or not, so Ke = EPS ÷ market price, assuming EPS stays constant forever. It is similar to the dividend price approach, but it seeks to nullify the effect of changes in the dividend policy (SM 4.20–4.21). ICAI's example: an investor wanting 20% pays ₹150 for a ₹100 share expected to earn 30%.
3. **Growth approach (Gordon's model)**: earnings, dividends and share price all grow at a constant rate g, so Ke = D1 ÷ P0 + g, with D1 = D0(1 + g), the next expected dividend. For a new issue, deduct the flotation cost per share from the price (SM 4.21).
4. **Realised yield approach**: the average return realised in the past few years is taken as the expected return: the IRR that equates the purchase price with the dividends received and the sale price (SM 4.24).
5. **CAPM**: the return investors require for the risk they cannot diversify away: Ke = Rf + β(Rm − Rf) (SM 4.26).
:::

### Where g comes from

Two methods (SM 4.22–4.23):

- **Average method**: the current dividend D0 = Dn(1 + g)ⁿ, where Dn is the dividend n years ago, so g = ⁿ√(D0 ÷ Dn) − 1. Without a calculator: divide D0 by Dn, find the result in the FVIF table's row for n years, and read the rate at the top of that column. ICAI's Example 4: ₹16.10 ÷ ₹10 = 1.61 in the 5-year row sits under 10%, so g = 10%.
- **Gordon's growth model**: g = b × r, where b is the earnings retention rate (the share of earnings available to equity shareholders not paid as dividend) and r the rate of return on funds invested. Reinvested earnings are what make future dividends grow.

### CAPM: paid only for the risk you cannot shake off

A security's risk has two parts (SM 4.26). **Unsystematic risk** is company specific (a strike or lockdown in the company, labour not available); it can be reduced or eliminated by diversification. **Systematic risk** is macro-economic or market specific (inflation, government policy, interest rates) and cannot be diversified away. So under CAPM a business should be concerned solely with the non-diversifiable risk, measured by **beta (β)**, from a regression of the security's returns on the market portfolio's returns.

Investors want two rewards: time value of money (the risk-free rate) and risk (beta times the market risk premium, Rm − Rf) (SM 4.27). Its shortcomings: estimating beta from historical data is unrealistic, and market imperfections may expose investors to unsystematic risk. Despite them, CAPM is useful in calculating the cost of equity even when the entity is suffering losses (SM 4.28).

::: diagram CAPM: required return rises in a straight line with beta
{"type": "plot", "h": 300, "x": [0, 2], "y": [0, 22],
 "xlabel": "beta (β)", "ylabel": "required return (%)",
 "xticks": [0, 0.5, 1, 1.5, 2], "yticks": [0, 5, 10, 15, 20],
 "series": [
  {"label": "Ke = 6.5% + β × 7%", "fn": "6.5 + 7*x", "color": "a"},
  {"label": "risk-free rate", "fn": "6.5", "color": "mute", "dash": true}
 ],
 "points": [{"x": 0, "y": 6.5, "label": "Rf 6.5%", "pos": "right"}, {"x": 1, "y": 13.5, "label": "market, β = 1: 13.5%", "pos": "left"}, {"x": 1.5, "y": 17, "label": "β 1.5: 17%", "pos": "left"}],
 "caption": "An illustration with Rf = 6.5% and Rm = 13.5%: the market risk premium is 7%. A share with β = 1 moves with the market and needs the market's return; β = 1.5 needs 6.5% + 1.5 × 7% = 17%. The grey dashed line is the time-value part; the gap above it is the risk premium."}
:::

### Retained earnings: the dividend that stayed home

When a company keeps profit instead of paying it out, shareholders lose the chance to invest that cash themselves in financial assets. The return they could have earned there is the cost of the retained earnings (SM 4.28–4.29).

::: diagram Retained earnings: keep and invest, or pay out
{"type": "graph", "w": 360, "h": 370, "r": 40, "nodes": [
  {"id": "f", "label": "Firm", "x": 180, "y": 55, "shape": "square", "fill": "a"},
  {"id": "p", "label": "Project\n(real asset)", "x": 65, "y": 185, "shape": "square", "fill": "c"},
  {"id": "s", "label": "Share-\nholders", "x": 290, "y": 185, "shape": "square", "fill": "b"},
  {"id": "m", "label": "Financial\nasset", "x": 175, "y": 320, "shape": "square", "fill": "e"}],
 "edges": [{"from": "f", "to": "p", "label": "invest"}, {"from": "f", "to": "s", "label": "pay dividend"}, {"from": "s", "to": "m", "label": "invest for\nthemselves"}],
 "caption": "Each box in its own colour. Cash the firm keeps goes into a project (a real asset); paid out as dividend, it lets shareholders invest for themselves in a financial asset. The return they could have earned there is Kr (after the Study Material's figure, SM 4.29)."}
:::

The same formulas serve for Kr, with one difference: for Ke on a new issue, P is the net proceeds (issue price less flotation cost); for Kr, P is the current market price (sometimes the issue price), and flotation cost is not used (SM 4.29). Kr is often used interchangeably with Ke, but ==cost of equity remains higher than the cost of retained earnings== normally, because new shares are issued below the market price and carry flotation costs.

## Formats and formulas

*Reproduce each formula and what its symbols mean from memory.*

::: formula Dividend price approach (SM 4.20)
$$K_e = \frac{D}{P_0}$$
D = expected dividend (also written D1); $P_0$ = market price of equity (ex-dividend).
:::

::: formula Earnings price approach (SM 4.21)
$$K_e = \frac{E}{P}$$
E = current earnings per share; P = market price per share.
:::

::: formula Growth approach, Gordon's model (SM 4.21)
$$K_e = \frac{D_1}{P_0} + g \qquad K_e = \frac{D_1}{P_0 - F} + g$$
$D_1 = D_0(1+g)$, the next expected dividend; $P_0$ = current market price per share; g = constant growth rate of dividend; F = flotation cost per share (second form, for newly issued shares).
:::

::: formula Growth rate (SM 4.22–4.23)
$$g = \sqrt[n]{\frac{D_0}{D_n}} - 1 \qquad g = b \times r$$
$D_0$ = current dividend; $D_n$ = dividend n years ago; b = earnings retention rate; r = rate of return on funds invested.
:::

::: formula Realised yield, year-by-year data (SM 4.25)
$$1 + Y_t = \frac{D_t + P_t}{P_{t-1}} \qquad K_e = \big[(1+Y_1)(1+Y_2)\cdots(1+Y_n)\big]^{1/n} - 1$$
Each year's yield is dividend plus closing price over opening price; Ke is their geometric mean. With a purchase price, a series of dividends and a sale price instead, Ke is the IRR of those flows.
:::

::: formula CAPM (SM 4.26–4.27)
$$K_e = R_f + \beta\,(R_m - R_f)$$
$R_f$ = risk-free rate of return; β = beta coefficient; $R_m$ = rate of return on market portfolio; $(R_m - R_f)$ = market risk premium.
:::

::: formula Cost of retained earnings (SM 4.29)
$$K_r = \frac{D}{P} \qquad K_r = \frac{EPS}{P} \qquad K_r = \frac{D_1}{P_0} + g$$
P = current market price (sometimes the issue price); no flotation cost.
:::

::: definition Systematic and unsystematic risk
Unsystematic risk: company-specific risk related to the company's performance, which can be reduced or eliminated by diversification (diversifiable risk). Systematic risk: the macro-economic or market-specific risk under which a company operates, which cannot be eliminated by diversification (non-diversifiable risk). (SM 4.26)
:::

::: definition Cost of retained earnings
The opportunity cost of dividends foregone by shareholders: the expected rate of return shareholders could have obtained by investing in financial assets. (SM 4.28)
:::

## Worked examples

:::: example Tapri's share, read three ways
Tapri Tea Co. Ltd's equity shares of ₹10 each are quoted at ₹240 (ex-dividend). The dividend just paid is ₹12 per share; five years ago it was ₹8.17, and the growth is expected to continue. EPS is ₹30. Tapri plans to raise part of its expansion by a new issue at ₹230 per share, with a flotation cost of ₹14 per share, and the rest from retained earnings. FVIF (8%, 5 years) = 1.469.

**Required:**

(i) Estimate the growth rate of dividends.

(ii) Calculate the cost of the existing equity by Gordon's model.

(iii) Calculate the cost of the new equity shares.

(iv) Calculate the cost of retained earnings.

(v) Calculate the cost of equity by the earnings price approach, and comment on the difference.

::: answer Show the working
**(i) Growth rate (average method)**

D0 ÷ D5 = ₹12 ÷ ₹8.17 = 1.469. In the FVIF table's 5-year row, 1.469 sits under 8%, so **g = 8%**. Check: (1.469)^(1/5) − 1 = 8.0%.

**(ii) Existing equity**

D1 = ₹12 × 1.08 = ₹12.96.

$$K_e = \frac{D_1}{P_0} + g = \frac{12.96}{240} + 0.08 \qquad = 0.054 + 0.08 = 0.134 \text{ or } 13.40\%$$

**(iii) New equity shares**

$$K_e = \frac{D_1}{P_0 - F} + g = \frac{12.96}{230 - 14} + 0.08 \qquad = \frac{12.96}{216} + 0.08 = 0.06 + 0.08 = 14.00\%$$

**(iv) Retained earnings**: current market price, no flotation cost:

$$K_r = \frac{12.96}{240} + 0.08 = 13.40\%$$

**(v) Earnings price approach**

$$K_e = \frac{E}{P} = \frac{30}{240} = 12.50\%$$

**Comment.** The earnings price approach assumes EPS will stay at ₹30 forever and ignores the 8% growth Tapri's dividends show, so it understates the expectation; with constant growth, Gordon's model is the method the Study Material prescribes (SM 4.19). New equity (14.00%) costs more than retained earnings (13.40%) because it is sold ₹10 below the market price and carries ₹14 of flotation cost.
:::
::::

:::: example Kulhad Crafts: what the past says, what risk says
Kulhad Crafts Ltd makes Tapri's clay cups. Kesar's aunt, Pushpa Mehra, bought its shares at ₹500 each five years ago, received a dividend of ₹40 per share at the end of each of the five years, and has just sold them at ₹628.

The government bond rate and the market return are not published in the brief Dev received, but two listed peers are priced by CAPM: Matka Pottery Ltd (β 1.5) has an expected return of 16%, and Diya Ceramics Ltd (β 0.8) of 11.8%. Kulhad Crafts' beta is 0.9.

PV factors: PVAF (11%, 5 years) 3.696 and PVF (11%, year 5) 0.593; PVAF (13%, 5 years) 3.517 and PVF (13%, year 5) 0.543.

**Required:**

(i) Calculate the cost of equity of Kulhad Crafts by the realised yield approach.

(ii) Find the risk-free rate and the market risk premium from the two peers.

(iii) Calculate the cost of equity of Kulhad Crafts by CAPM, and comment.

::: answer Show the working
**(i) Realised yield**: the rate that equates the ₹500 paid with the present value of the dividends and the sale price.

| Year | Cash flow (₹) | PV @ 11% (₹) | PV @ 13% (₹) |
|---|---:|---:|---:|
| 0 | (500.00) | (500.00) | (500.00) |
| 1 to 5 | 40.00 | 147.84 | 140.68 |
| 5 | 628.00 | 372.40 | 341.00 |
| **NPV** | | **+20.24** | **−18.32** |

$$K_e = 11\% + \frac{20.24}{20.24 - (-18.32)} \times (13\% - 11\%) \qquad = 11\% + 1.05\% = 12.05\%$$

**(ii) Rf and the market risk premium**: both peers lie on the same CAPM line.

16% = Rf + 1.5 × (Rm − Rf) and 11.8% = Rf + 0.8 × (Rm − Rf). Subtracting: 4.2% = 0.7 × (Rm − Rf), so the **market risk premium = 6%**, and Rf = 16% − 1.5 × 6% = **7%** (Rm = 13%).

**(iii) CAPM**

$$K_e = R_f + \beta (R_m - R_f) = 7\% + 0.9 \times 6\% = 12.40\%$$

**Comment.** The two estimates are close (12.05% and 12.40%) but not the same: realised yield looks into the past and assumes the company's risk, the shareholders' expected return and their reinvestment rate all stay as they were (SM 4.24); CAPM prices only today's systematic risk. A financial calculator puts the realised yield at 12.03%.
:::
::::

## Under the hood

### The year-by-year realised yield

When the data are yearly dividends and opening prices, ICAI computes each year's yield and takes their geometric mean (Illustration 11, SM 4.25): with 5 years of prices you get 4 yields, (1 + Y1) = (D1 + P1) ÷ P0 and so on, and Ke = [(1 + Y1) × … × (1 + Y4)]^(1/4) − 1. ICAI's own figures give 15%. The method is not practical if earnings are unstable (SM 4.24).

### Why equity costs most

The Study Material's risk–return figure ranks government bonds, corporate debt, preference shares and equity shares in rising order of both risk and return (SM 4.27). Interest and preference dividend are fixed and the preference dividend has priority over the equity dividend (SM 4.16), while the equity return is uncertain (SM 4.19), so equity holders expect the most; this is why ICAI's chapter MCQ marks "generally lower than the before-tax cost of debt" as the one false statement about the cost of equity.

### Next door

Gordon's model also values a share, P0 = D1 ÷ (Ke − g), and the dividend discount model with changing growth rates is taught in [[fm.div.models|dividend theories]] (SM 4.22). How Ke reacts when a company adds debt is the subject of [[fm.cs.theories|capital structure theories]]. The costs from this lesson and [[fm.coc.debt|the cost of debt]] are combined in [[fm.coc.wacc|WACC]].

## Exam angle

::: exam Where the cost of equity appeared, May 2024 to September 2026
In the ICAI documents read for this lesson, Ke or Kr was computed or discussed 18 times in 15 documents:
- **CAPM**, the most frequent: May 2024 Q2(a)(i) (18.32%), January 2025 Q2(a)(i) (18%), May 2025 Q2(a)(i) (20%), January 2026 MCQ 1, May 2026 MCQ 7 (a required return compared with a project's 25%), RTP May 2026 Q5 (Rf and the market risk premium found from two peers, as in the Kulhad Crafts example, then the company's beta), MTP Series II for September 2026 Q2(a) (4 marks, a company and two competitors).
- **Gordon's model**: September 2025 Q1(a)(i) (2 marks, new issue with ₹4 flotation, 8.75%), May 2025 MCQ 8 (with flotation, 12%), RTP January 2025 Q5 (last year's dividend ₹4, ₹5 flotation, 26.44%), RTP May 2024 Q2 (g of 11% from an EPS trend, Kr 16%), MTP Series II for May 2026 Q3(a) (dividend "@24%" on a ₹100 share), MTP Series I for September 2024 MCQs 1–2 (g from the share price; Gordon and CAPM averaged with weights 0.6 and 0.4, 17.82%).
- **Theory**: "DISCUSS the dividend-price approach" (MTP Series I for May 2024 Q3(b), 2 marks); the dividend price and earnings price approaches (MTP Series II for May 2026 Q4(c), 2 marks); "EXPLAIN any four methods" (RTP January 2025 Q11(b)).
:::

::: exam The traps ICAI used
- **Cum-dividend price** (September 2024 MCQ 7): a share at ₹75 cum-dividend with ₹6 about to be paid is ₹69 ex-dividend, and g = ₹7.59 ÷ ₹6 − 1 = 26.5%, so Ke = 7.59 ÷ 69 + 26.5% = 37.5%.
- **D0 or D1?** "Paid last year", "just paid" or "this year" is D0: multiply by (1 + g). "Expected", "next year" is D1.
- **Dividend as a percentage** is of the face value: 24% on ₹100 is ₹24 (MTP Series II for May 2026).
- **Personal tax on retained earnings**: May 2024 Q2(a)(iv) gave a personal tax rate of 20% and the Suggested Answer computed Kr = Ke × (1 − 0.20) = 14.66%, adding that Kr = Ke (18.32%) may also be taken. The Study Material gives no such adjustment (SM 4.28–4.29), and when RTP January 2026 Q6 repeated the question without the personal tax rate, its answer took Kr = Ke = 18.32%. Show the adjustment only if the question gives the rate.
- **The price for Ke**: new issue, issue price less flotation; for Kr, the market price.
:::

::: trick Gordon's two pieces
Ke = dividend yield + growth: 12.96 ÷ 240 = 5.4% yield plus 8% growth = 13.4%. If an MCQ's options include the bare yield (5.4%), it is the "forgot g" distractor. Condition: constant growth forever, with g below Ke.
:::

## Answer frame

**DISCUSS the dividend price approach and the earnings price approach** (2 marks; SM 4.20–4.21):

1. Dividend price approach (dividend valuation model): assumes the dividend per share remains constant forever; cost of equity = expected dividend ÷ market price per share (ex-dividend); Ke = D1 ÷ P0, symbols defined.
2. Earnings price approach: co-relates the earnings of the company with the market price of its share; each investor expects a certain earning, distributed or not; Ke = E ÷ P (EPS ÷ market price); assumes EPS constant forever.
3. The difference: the earnings price approach seeks to nullify the effect of changes in the dividend policy.

**EXPLAIN any four methods of computing the cost of equity**: RTP January 2025's answer opens with one line, "the rate of return which equates the present value of expected dividends with the market share price", then gives a heading, one or two lines and the formula for each method. Choose four of the dividend price, earnings price, growth (Gordon) and realised yield approaches and CAPM, and add when each is used (SM 4.19).

## Common mistakes

::: mistake Hall of Shame: last year's dividend in Gordon's numerator
₹12 ÷ ₹240 + 8% = 13.0%. The ₹12 was just paid; Gordon's model needs the next one. **Fix:** D1 = D0 × (1 + g) = ₹12.96, and Ke = 13.40%.
:::

::: mistake Flotation cost charged to retained earnings
Writing Kr = 12.96 ÷ (240 − 14) + 8%. **Fix:** retained earnings involve no issue, so no flotation: use the current market price. Flotation belongs only to the new-issue Ke.
:::

::: mistake The cum-dividend price used as P0
Dividing by a price that still includes a dividend about to be paid overstates P0. **Fix:** P0 is ex-dividend: subtract the dividend payable from the cum-dividend price first.
:::

::: mistake Beta times the market return
Ke = Rf + β × Rm (7% + 0.9 × 13% = 18.7%). **Fix:** beta multiplies the premium, Rm − Rf: 7% + 0.9 × 6% = 12.40%. Read the question: "market risk premium" or "equity risk premium" is already Rm − Rf; "market return" is Rm.
:::

## Practice

::: quiz Check yourself
Q: A share is quoted at ₹106 ex-dividend. The dividend just paid is ₹5 and dividends grow at 6% a year. What is the cost of equity by Gordon's model, in %?
= 10.9..11.1
> D1 = ₹5 × 1.06 = ₹5.30; Ke = 5.30 ÷ 106 + 6% = 5% + 6% = 11%. Using ₹5 instead of D1 gives 10.72%.

Q: Case scenario. Tapri's share is quoted at ₹252 cum-dividend, the board having declared a dividend of ₹12 that will be paid next week. Next year's dividend is expected to be ₹12.96, and dividends grow at 8% a year. Ritu must state the cost of equity in the board note. Which figure is correct?
- [x] 13.40%
- [ ] 13.14%
- [ ] 5.40%
- [ ] 14.00%
> The ex-dividend price is ₹252 − ₹12 = ₹240, so Ke = 12.96 ÷ 240 + 8% = 13.40%. 13.14% divides by the cum-dividend ₹252; 5.40% forgets the growth; 14.00% is the new-issue cost after flotation.

Q: Why is the cost of retained earnings normally lower than the cost of new equity?
- [ ] Retained earnings belong to the company, not the shareholders
- [x] New shares are issued below the market price and carry flotation costs, which retained earnings do not
- [ ] Retained earnings are taxed at a lower rate
- [ ] Retained earnings earn no dividend
> Both are the shareholders' expected return; new equity is dearer only because of the lower issue price and the flotation cost (SM 4.29). Retained earnings are the shareholders' forgone dividends, so they do have a cost.

Q: A company retains 40% of its earnings and earns 15% on the funds it invests. By Gordon's growth model, what is its growth rate?
- [ ] 15%
- [ ] 9%
- [x] 6%
- [ ] 40%
> g = b × r = 0.40 × 15% = 6%. 9% uses the payout ratio (60%) instead of the retention ratio.

Q: Which of these risks does a share's beta capture under CAPM? Select all that apply.
- [x] A rise in interest rates
- [ ] A strike at the company's factory
- [x] Inflation
- [x] A change in government policy
> Beta measures systematic risk (inflation, government policy, interest rates), which diversification cannot remove. A strike is company-specific, unsystematic risk, diversified away in a portfolio (SM 4.26).
:::

## Recap

- Ke = what equity shareholders expect; found as a balancing figure from the price, or from risk (CAPM).
- Dividend price: D ÷ P0; earnings price: EPS ÷ P (nullifies dividend policy); both assume constancy forever.
- Gordon: Ke = D1 ÷ P0 + g; new issue D1 ÷ (P0 − F) + g; D1 = D0(1 + g).
- g = ⁿ√(D0 ÷ Dn) − 1 (or the FVIF table), or g = b × r.
- Realised yield: the IRR of purchase price, dividends and sale price, or the geometric mean of yearly yields.
- CAPM: Ke = Rf + β(Rm − Rf); beta prices systematic risk only; usable even when the entity is suffering losses.
- Kr: same formulas at the market price, no flotation; normally Kr < Ke. (Free money has the longest invoice.)

## Flashcards

Q:: Formula: cost of equity by the dividend price approach, and its assumption?
A:: Ke = D ÷ P0 (expected dividend ÷ ex-dividend market price); assumes the dividend per share stays constant forever.

Q:: Earnings price approach: formula and how it differs from the dividend price approach?
A:: Ke = E ÷ P (current EPS ÷ market price), assuming constant EPS forever; it seeks to nullify the effect of changes in the dividend policy.

Q:: Gordon's model for the cost of equity, existing and new shares?
A:: Ke = D1 ÷ P0 + g; for new shares Ke = D1 ÷ (P0 − F) + g, where F is the flotation cost per share and D1 = D0(1 + g).

Q:: Two methods of estimating g?
A:: Average method: g = ⁿ√(D0 ÷ Dn) − 1 (or via the FVIF table); Gordon's growth model: g = b × r (retention rate × return on funds invested).

Q:: Formula: CAPM cost of equity?
A:: Ke = Rf + β(Rm − Rf); Rm − Rf is the market risk premium.

Q:: Which risk does CAPM reward, and why?
A:: Only systematic (non-diversifiable) risk, measured by beta; unsystematic risk can be eliminated by diversification.

Q:: Two shortcomings of CAPM in the Study Material?
A:: Estimation of beta with historical data is unrealistic; market imperfections may lead investors to unsystematic risk.

Q:: Realised yield approach: its assumptions that ICAI calls unrealistic?
A:: The risks faced by the company remain the same; shareholders continue to expect the same rate of return; their reinvestment opportunity rate equals the realised yield.

Q:: What is the cost of retained earnings?
A:: The opportunity cost of dividends foregone by shareholders: the return they could have earned by investing in financial assets.

Q:: Kr versus Ke: which price, and why is Ke normally higher?
A:: Kr uses the current market price with no flotation cost; Ke on a new issue uses net proceeds (issue price less flotation), so Ke is normally higher.
