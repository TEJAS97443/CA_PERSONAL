# lab-f1 report: capbud, wacc, dividend (Paper 6A)

All three labs are built, tested and marked `ready` in content/labs.json (the entries were set with tools/lab_status.py). `build.py --check` passes, data has been rebuilt, and the shared `labs-` suite passes 119/119 with all three labs in it.

Files I own:
- app/js/labs/capbud.js and tests/lab-capbud.test.js
- app/js/labs/wacc.js and tests/lab-wacc.test.js
- app/js/labs/dividend.js and tests/lab-dividend.test.js

I added no CSS and touched no load-order lists: the engine lazy-loads each lab file.

## 1. capbud — Capital Budgeting Lab (fm.capbud), 33 tests

**What it does.** The first control picks one of five modes:
- **NPV and PI.** A cash-flow bar chart where each year's present-value bar appears with its factor row, then NPV, then PI.
- **Payback and ARR.** Cumulative and discounted-cumulative lines crossing zero, with the part-year shown as "x + still to recover ÷ next inflow". ARR is given three ways: on initial investment, on average investment ½(I − S) + S + WC, and the SM's annual version.
- **IRR by interpolation.**
  1. NPV at the lower rate.
  2. NPV at the higher rate.
  3. The interpolation chord.
  4. The full NPV profile, showing the true IRR, the error the chord makes, and a flag when the flows have several IRRs.

  With equal inflows it does ICAI's "fake payback" PVAF lookup.
- **MIRR.** Each inflow is compounded to year n (bars grow), giving the terminal value and then (TV / PV of outflows)^(1/n) − 1.
- **Two projects (NPV vs IRR).** Both NPV profiles, both interpolated IRRs (each with its own trial rates), the crossover (Fisher) rate, and a ranking table. A conflict is labelled as scale, timing or unequal lives, and the verdict is "choose the higher NPV", as the SM says.

**Controls:**
- Mode, and a cash-flow table (year column renumbers itself; column B is for two projects).
- k, and yearly figures as cash flows or as profits after tax (PAT + straight-line depreciation).
- Salvage and working capital.
- PV factors: 3 decimals (default), 2, 4 or exact.
- An annuity-factor toggle: the PVAF table rounded once, e.g. 4.111, against year-by-year factors that add up, e.g. 4.112.
- Trial rates, 0 = automatic (A, and B for two projects), and a reinvestment rate for MIRR.

**Presets (16):**
- SM Illustrations 3, 6, 7, 9, 2, 10 and 11.
- PYQ May 2025 Q3(a), twice: NPV/PI and MIRR.
- PYQ Jan 2026 Q2(b) Algo Steel (ARR and NPV).
- PYQ Jan 2025 Q3(a) SRT Ltd (NPV/PI with working capital).
- RTP May 2024 Q5 HMR (IRR at 10% and 20%).
- RTP Sep 2026 Q7 (Machines I and II).
- MTP May 2025 S2 Q1(a) (2-decimal factors).
- Two Tapri presets.

**Tests verify:**
- **ICAI's factor tables:** 3-, 2- and 4-decimal PVIF, PVAF and FVIF values.
- **SM worked figures:**
  - NPV 27,340 (Ill. 3); the four NPVs of Ill. 4; the PIs of Ill. 5.
  - IRR 12.98% (Ill. 6), 10.70% (Ill. 7) and 15.74% (Ill. 8, with 2-decimal annuity factors).
  - Examples 8 and 9 (NPV at 46%, 35% and 5%).
  - The conflicts in Ill. 10, 11 and 12: 24.26/21.48, 24.87/17.60, 43.07.
  - Payback in Examples 5 and 10; ARR in Example 7 (37.15/26.67/41.03, and 33.33% with working capital) and Ill. 2 (9.2/17.04).
  - MIRR in Ill. 9 (TV 2,13,587).
- **PYQ May 2025 Q3(a):** NPV 0 at 12%; 13,730; PI 1.0445; DPP 3.845; TV 4,72,100; MIRR 11.20%.
- **PYQ Jan 2026:** ARR 63.07%; NPV 18,86,370.
- **PYQ Jan 2025:** NPV 81,44,884; PI 4.62.
- **RTP May 2024:** NPV 86,543; IRR 14.14%.
- **RTP Sep 2026:** NPVs within ₹2; IRRs 15.46/14.74; DPP 4.49/5.41.
- **MTP May 2025:** NPVs 2,900/18,760; DPP 4.766/1.195; PI 1.01/1.09.
- **Random-input checks:**
  - NPV at the IRR is 0, and NPV > 0 ⇔ PI > 1 ⇔ IRR > k.
  - The automatic bracket holds the IRR, and the chord overstates it by less than 0.1%.
  - Payback interpolates linearly within the year.
  - MIRR equals the IRR when reinvested at the IRR, and lies between k and the IRR otherwise.
  - The crossover rate equalises the two NPVs.
- **The lab itself:** frames, inputs and error messages, and 200 challenge problems per mode.

**Challenge:**
- NPV or PI (flows in thousands with 3-decimal factors, so the answers are exact).
- Payback or discounted payback.
- IRR between the named trial rates.
- MIRR.
- For two projects: "which project?" (choice) or "do NPV and IRR agree?" (yes/no).

## 2. wacc — Cost of Capital Lab (fm.coc), 27 tests

**What it does.** "What to work out" has five parts:
- **Kd.** Irredeemable, redeemable or convertible (RV = the higher of the cash value and shares × P0 × FVIF).
  - Methods: the approximation formula, the variant with the discount/premium deductible, or YTM.
  - YTM uses PVAF/PVIF table factors at two trial rates and interpolates, on an NPV-vs-rate plot that shows the chord against the true yield.
  - The company's cash flows are drawn as bars.
- **Kp.** Irredeemable or redeemable, by approximation or YTM.
- **Ke and Kr.**
  - Dividend growth (D0 or D1), dividend price or earnings price, with Kr on the market price and Ke on the issue price less flotation, drawn as bars split into yield and growth.
  - CAPM, built on the security market line.
- **WACC.** Book and market weights built column by column in ICAI's table layout. An optional split shares the equity's market value between share capital and retained earnings in their book ratio (SM Ill. 16). Grouped bars compare the two sets of weights.
- **Marginal cost of capital.** Break points (amount available ÷ proportion), the MCC in each range, and a step plot.

**Presets (21):**
- SM Ill. 1, 2, 3, 7, 8, 12, 13, 16, 17 (both Kd and WACC) and 18, plus SM Example 2.
- PYQ May 2026 Q2(b): convertible, YTM.
- PYQ Jan 2025 Q2(a): convertible, CAPM and WACC.
- PYQ May 2025 Q2(a): Kp by YTM.
- PYQ Sep 2025 Q1(a): Ke.
- RTP May 2024 Q2: MCC.
- Two Tapri presets.

**Tests verify:**
- **Factor tables:** 7.722, 7.024, 2.487, 3.352/0.497, 8.530/0.744, FVIF 1.403.
- **SM debt:** 8.30% (Ill. 1); 4.28% (Ill. 2); 11.67% (Ill. 3); 12.21% with NPV +6.74/−8.51 (Example 2).
- **SM Ill. 17:** Kd 6.89 and Kp 4.08; WACC 7.74/8.59 (also MTP Sep 2026 S1 Q1(b)).
- **SM Example 3 (convertible):** 16.09/17.43.
- **SM preference and equity:**
  - Kp 10.53, 12.37 and 10.77.
  - Ke 12%, 18.75%, 13.8% and 14.2%.
  - Kr 10% and Ke 10.41% (Ill. 13).
- **SM Ill. 16:** the 1:3 split and 10.10%.
- **SM Ill. 18 (MCC):** 13.85%, break at ₹14,750, then 14.57%.
- **PYQ May 2025:** Kp 12% (+48.82/−48.66).
- **PYQ May 2026:** 11.67% (NPV 5.93/−1.17).
- **PYQ Jan 2025:** CAPM 18%; convertible 19.52%; WACC 17.94%.
- **PYQ Sep 2025:** Ke 8.75%; Kp 17.78%; WACC 11.59%.
- **RTP May 2024 (MCC):** 14.492%, break 3,77,875, then 15.988%.
- **Random-input checks:**
  - YTM: NPV at the yield is 0, and the chord lies in [exact yield, H].
  - Approximation formulas: identities when RV = NP, and closeness to the true yield.
  - WACC lies between the cheapest and the dearest cost.
  - The MCC schedule equals the cost of each source's share computed directly, and never falls.
  - Ke ≥ Kr, and CAPM is linear in β.

**Challenge:** Kd or Kp (the YTM prompt names the trial rates and 3-decimal factors); Ke or Kr; WACC on book or market weights; MCC before or after the break, or the break point itself (always a whole number of rupees).

## 3. dividend — Dividend Models Lab (fm.div.models), 20 tests

**What it does:**
- **Walter and Gordon.** A price-vs-payout plot:
  1. Points at 0, 25, 50, 75 and 100% appear one per frame, each with its working row.
  2. The line or curve.
  3. The other two cases, r > Ke / r = Ke / r < Ke, as dashed lines.
  4. The optimum payout.
  5. Optionally, the payout for a target price, solved backwards.

  Gordon flags payouts where g = br ≥ Ke, so the formula breaks down.
- **MM.** P1 with and without the dividend, retained earnings, funds to raise, new shares Δn, then nP0 = [(n + Δn)P1 − I + E] / (1 + Ke). Both values come out equal, and stacked bars show P1 + D1 = P0(1 + Ke) for an existing shareholder.

**Presets (11):**
- PYQ Jan 2025 Q1(c), PYQ May 2026 Q3(a), PYQ May 2025 Q2(b), PYQ Sep 2025 Q2(b).
- SM Ill. 1, 2 and 4.
- RTP May 2024 Q6.
- Three Tapri presets.

**Tests verify:**
- **SM:** Ill. 2 (120/115/110/105/100); Ill. 3 (D 3.12, payout 52%); Ill. 4 (150/50/37.50); Ill. 6 and 7 (constant-growth form); Ill. 1 and Example 2 (MM).
- **PYQ Jan 2025:** ₹51.33; payout for ₹48 = 85.714%.
- **PYQ May 2026:** ₹45.33; retention 75%; Gordon optimum 0%.
- **PYQ May 2025:** ₹26.67 / ₹20.
- **PYQ Sep 2025:** b 0.30, payout 70%, DPS ₹7.
- **PYQ Jan 2026:** Gordon ₹240; MM P1 ₹288; earnings ₹3,32,000.
- **RTP May 2024:** value ₹20,00,000 both ways; Δn 23,414.63.
- **Random-input checks (thousands of cases):**
  - Walter is linear and its optimum is the best of 101 payouts.
  - Solving backwards for a target price round-trips.
  - Gordon is monotone in the payout and needs Ke > br.
  - MM's nP0 is invariant whatever the dividend.

**Challenge:** a price under Walter or Gordon, the payout for a target price, or MM's P1, Δn or value of the firm.

## Screenshots checked

I took and looked at each lab at 1440 px, in dark mode and at 390 px, for every mode, plus the lesson-embed (compact) view through a scratch harness. The fixes they led to:
- Point labels shortened and flipped so they no longer overprint.
- Round ticks (no 3125 / −0 ticks).
- Truncated segment and select labels shortened.
- A mutation bug fixed: the working tables grew in earlier frames.
- Narrower phone tables.
- Bar colours made distinguishable.
- Zero-valued optional inputs dropped from the Given line through "(0 = none)" labels.

## Recommended embeds (`::: lab …` … `:::`; none have been added to lessons)

**fm.capbud.payback**
- *How it works* (RTP Sep 2026 Machine I: payback 3.32, discounted payback 4.49):
  `::: lab capbud {"mode":"payback","rate":12,"flows":[["0",-1000000],["1",301500],["2",301500],["3",301500],["4",301500],["5",301500]]}`
- *Worked examples* (PYQ Jan 2026 Algo Steel: ARR 63.07%):
  `::: lab capbud {"mode":"payback","rate":12,"basis":"pat","salvage":240000,"flows":[["0",-2400000],["1",495000],["2",1095000],["3",945000],["4",795000]]}`

**fm.capbud.npv**
- *How it works* (SM Ill. 3):
  `::: lab capbud {"mode":"npv","rate":10,"flows":[["0",-100000],["1",55000],["2",80000],["3",15000]]}`
- *Worked examples* (PYQ May 2025 Q3(a)):
  `::: lab capbud {"mode":"npv","rate":10,"salvage":50000,"flows":[["0",-308640],["1",100000],["2",100000],["3",80000],["4",80000]]}`

**fm.capbud.irr**
- *How it works* (SM Ill. 7):
  `::: lab capbud {"mode":"irr","rate":10,"lo":10,"hi":12,"flows":[["0",-136000],["1",30000],["2",40000],["3",60000],["4",30000],["5",20000]]}`
- Section on MIRR:
  `::: lab capbud {"mode":"mirr","rate":10,"salvage":50000,"flows":[["0",-308640],["1",100000],["2",100000],["3",80000],["4",80000]]}`
- NPV-IRR conflict, *How it works* or *Under the hood* (SM Ill. 10):
  `::: lab capbud {"mode":"compare","rate":10,"lo":20,"hi":25,"loB":20,"hiB":25,"flows":[["0",-100000,-300000],["1",50000,140000],["2",60000,190000],["3",40000,100000]]}`

**fm.coc.debt**
- *How it works* (SM Ill. 2):
  `::: lab wacc {"part":"debt","dtype":"red","coupon":10,"issue":110,"rv":100,"years":5,"tax":35,"method":"approx"}`
- YTM, *How it works* / *Formats and formulas* (SM Example 2):
  `::: lab wacc {"part":"debt","dtype":"red","coupon":10,"issue":80,"rv":100,"years":5,"tax":35,"method":"ytm","lo":10,"hi":15}`
- Preference, *Worked examples* (PYQ May 2025):
  `::: lab wacc {"part":"pref","ptype":"red","face":1000,"prate":10,"issue":1000,"rv":1065.4,"years":3,"pmethod":"ytm","lo":10,"hi":14}`

**fm.coc.equity**
- *How it works* (SM Ill. 13):
  `::: lab wacc {"part":"equity","approach":"growth","dkind":"d1","div":10,"g":5,"price":200,"newIssue":190,"flotE":5}`
- CAPM (SM Ill. 12):
  `::: lab wacc {"part":"equity","approach":"capm","rf":10,"beta":1.75,"rmkind":"rm","rm":15}`

**fm.coc.wacc**
- *How it works* (defaults = SM Ill. 17): `::: lab wacc {"part":"wacc"}`
- Marginal cost of capital (defaults = SM Ill. 18): `::: lab wacc {"part":"mcc"}`

**fm.div.models**
- Walter, *How it works* (PYQ Jan 2025 data):
  `::: lab dividend {"model":"walter","eps":7,"r":18,"ke":15,"payout":50,"target":0}`
- Gordon (SM Ill. 4):
  `::: lab dividend {"model":"gordon","eps":6,"r":20,"ke":16,"payout":50,"target":0}`
- MM (SM Ill. 1):
  `::: lab dividend {"model":"mm","shares":10000,"p0":100,"ke":10,"dps":5,"earn":100000,"invest":200000}`

## ICAI figures that do not reproduce

The tests use a tolerance where ICAI's own arithmetic slips. These matter for the question-bank job:
- **SM Ill. 6:** IRR is printed as 12.978%, but 12% + 27,750/28,250 = 12.982%.
- **SM Ill. 9:** MIRR is printed as "9%", but (1.5705)^(1/5) − 1 = 9.45%.
- **SM Example 3:** (153.12 + 100)/2 is printed as 126.53 (it is 126.56), so the answer is 16.10%, not 16.09%.
- **Truncation in Suggested Answers:** 4.28 for 4.2857, 4.08 for 4.0857, 19.52 for 19.526, 10.704 for 10.7048.
- **RTP May 2024 Q5** uses the summed annuity factor at 10% (6.144) but the rounded-once one at 20% (4.192).
- **RTP Sep 2026 Q7** picks Machine I by majority ranking. NPV, and the SM's rule for mutually exclusive projects, pick Machine II; the lab says II.
- **PYQ May 2026 Q2(a):** 1,76,250 × 5.032 is printed as 8,87,890; it is 8,86,890.
- **RTP Sep 2025 Q1(v):** the printed IRR is 24.68%; its own formula gives 22.34%.

## Framework gaps I hit (worked around, not edited)

- **Plot point labels** have only above / below / left / right positions, with no offset or leader line. I shortened labels and flip a crowded label to the other side.
- **No stacked bars.** I emulated them by overlaying bar series.
- **`challenge.tol` is one static number per lab.** I designed the generators so answers are exact: thousands × 3-decimal factors, and whole-rupee break points.
- **Table-control columns cannot be hidden per mode.** Capbud's Project B column shows in single-project modes and is explained in its label.
- **The leak test reads tick labels**, and axes scaled to the answer can leak it. `challenge.view` shows the inputs only.
- **No way to screenshot embeds.** `tools/preview_lesson.py` does not mount labs and `tools/shot.sh` shows only the last frame of the full page. I used a scratch embed harness in $TMPDIR.
- **The Given line** prints zero-valued optional inputs unless the label carries "(0 = …)".
