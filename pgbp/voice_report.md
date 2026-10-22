# Hearing check: Profits and Gains of Business or Profession

Whisper small.en (mlx, unprompted) on 41 cues / 945 words: **WER 5.5%** (52 differences), 7 clean cues. Second opinion (turbo) on the 34 cues with differences: **4.2% confirmed by both models** (40). 85s, 2026-10-03 12:15.

Expected = the spoken text (after the lexicon); heard = the Whisper transcript run through the same lexicon. Confirmed (✓) = both models hear the same difference: likely a real mispronunciation or skip. Fix those in `~/edu2d/lexicon.json` (respelling, or `/phonemes/`), then `story.py retts script.py <ids>` and `story.py hear script.py --ids <ids>`.

## Suspect words (ranked)

| # | expected | heard as | misses | both models | in text | cues |
|---|---|---|---|---|---|---|
| 1 | meera | Mira ×22, Mira's ×10 | 32 | 32 | 41 | a1, b1, e1, e9, f1, f9, g1, g9a, h1, i1, j1, k6, m1, m9, n1, |
| 2 | lakh | lok ×9, -lock ×3, -lock, | 13 | 4 | 117 | c1, f1, k6, m9, o5, r1, z7 |
| 3 | gst | GSD | 1 | 1 | 1 | u11 |
| 4 | meera leases | Mira Lees is | 1 | 1 | 1 | g9 |
| 5 | fifteen | 50 | 1 | 0 | 16 | u6 |
| 6 | pune | Puna. | 1 | 0 | 1 | a1 |
| 7 | a *(minor)* | (skipped) | 1 | 1 | 224 | o1 |

## Per cue (only cues with differences)

| cue | WER small.en | WER turbo | expected → heard (small.en) |
|---|---|---|---|
| a1 | 8% | 4% | "meera" → "Mira" ✓; "pune" → "Puna." |
| b1 | 7% | 7% | "meera" → "Mira" ✓ |
| c1 | 3% | 3% | "lakh" → "-lock" |
| e1 | 5% | 5% | "meera" → "Mira" ✓ |
| e9 | 6% | 6% | "meera" → "Mira's" ✓ |
| f1 | 12% | 4% | "meera" → "Mira" ✓; "lakh" → "lok"; "lakh" → "lok" |
| f9 | 9% | 9% | "meera" → "Mira" ✓ |
| g1 | 7% | 7% | "meera" → "Mira" ✓ |
| g9 | 25% | 8% | "meera leases" → "Mira Lees is" ✓ |
| g9a | 9% | 9% | "meera" → "Mira" ✓ |
| h1 | 5% | 5% | "meera" → "Mira's" ✓ |
| i1 | 5% | 5% | "meera" → "Mira" ✓ |
| j1 | 5% | 5% | "meera" → "Mira" ✓ |
| k6 | 8% | 8% | "meera" → "Mira's" ✓; "lakh" → "-lock" ✓; "lakh" → "-lock" ✓ |
| m1 | 4% | 4% | "meera" → "Mira" ✓ |
| m9 | 11% | 3% | "meera" → "Mira" ✓; "lakh" → "lok"; "lakh" → "lok"; "lakh" → "lok" |
| n1 | 4% | 4% | "meera" → "Mira's" ✓ |
| o1 | 10% | 10% | "meera" → "Mira" ✓; "a" → "∅" ✓ |
| o5 | 10% | 2% | "meera" → "Mira" ✓; "lakh" → "lok"; "lakh" → "lok"; "lakh" → "lok" |
| o8 | 6% | 6% | "meera" → "Mira's" ✓ |
| p1 | 7% | 7% | "meera" → "Mira" ✓ |
| q1 | 6% | 6% | "meera" → "Mira" ✓ |
| q9 | 7% | 7% | "meera" → "Mira's" ✓ |
| r1 | 8% | 8% | "meera" → "Mira" ✓; "lakh" → "lok" ✓ |
| s1 | 3% | 3% | "meera" → "Mira's" ✓ |
| t1 | 4% | 4% | "meera" → "Mira" ✓ |
| t11 | 6% | 6% | "meera" → "Mira" ✓ |
| u1 | 4% | 4% | "meera" → "Mira" ✓ |
| u6 | 5% | 2% | "meera" → "Mira's" ✓; "fifteen" → "50" |
| u11 | 14% | 14% | "meera" → "Mira" ✓; "gst" → "GSD" ✓ |
| v1 | 4% | 4% | "meera" → "Mira" ✓ |
| v10 | 6% | 6% | "meera" → "Mira" ✓ |
| w6 | 3% | 3% | "meera" → "Mira's" ✓ |
| z7 | 6% | 6% | "meera" → "Mira's" ✓; "lakh" → "-lock," ✓ |
