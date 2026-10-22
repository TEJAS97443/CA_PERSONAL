"""Shared helpers for the PGBP film scenes. Every scene module does `from scenes.common import *`."""
import math, sys
from contextlib import contextmanager
sys.path.insert(0, '/Users/ztejas/edu2d')
import numpy as np
import skia
from eng import *
from props import *
from beats import Beats
from templates import Templates

B = Beats('/Users/ztejas/CA_PERSONAL/pgbp/beats.json')
Q = Cues('/Users/ztejas/CA_PERSONAL/pgbp/cues.json')
Wd = Q.Wd
TPL = Templates(B, Q, None)                               # uml.py code / uml scenes declared with scene= in script.py

def tpl_alpha(t):
    """How visible the template layer is at t (0..1). The spine fades custom scenes out by this much."""
    a = 0.
    for S_ in TPL.scenes:
        if S_.t0 <= t <= S_.t1: a = max(a, win(t, S_.t0, S_.t1, .45, .45))
    return a

# ---------------------------------------------------------------- timing helpers (beat ids, never seconds)
def T(i):  return B.at(i)['start']                       # beat starts speaking
def TE(i): return B.at(i)['end']                          # beat stops speaking
def TP(i): b = B.at(i); return b['end'] + b['pause']      # end + its pause
def TA(i): return B.at(i).get('a_start', TP(i))           # a check's answer starts
def TAE(i): return B.at(i).get('a_end', TP(i))            # a check's answer ends
# words the voice says differently from the text ("uterus" -> "you-ter-us"): cues.json stores the SPOKEN form,
# so a word-time lookup has to try the respelling too, or the label silently lands at the beat start.
_LEX = {k.lower(): v for k, v in (B.meta.get('lex') or {}).items() if not str(v).startswith('/')}

def W(i, n, d=0., occ=0):
    """Absolute time of word/phrase n in beat i. Tries the spoken respelling, then any single token of it,
    and only then falls back to the beat start."""
    tries = [n]
    r = _LEX.get(n.lower())
    if r:
        tries.append(r)
        tries += [w for w in r.replace('-', ' ').split() if len(w) > 2]
    for q in tries:
        try: return Wd(i, q, occ) + d
        except Exception: pass
    return T(i) + d

# ---------------------------------------------------------------- palette (must match SHOTS.md rule 4)
ACC = '#7dd3fc'; GOLD = '#fbbf24'; PINK = '#f472b6'; BLUE = '#60a5fa'
GREEN = '#86efac'; RED = '#f87171'; DIM = '#c9d3ea'; VIO = '#a78bfa'
ORANGE = '#fb923c'

EV = []                                                   # SFX events, filled by scenes
def ev(t, k): EV.append([round(t, 3), k])

# ---------------------------------------------------------------- small drawing helpers
def co(c, t, x, y, dx, dy, t0, t1, title, sub=None, col=ACC, size=30):
    """Callout with a leader line from (x,y), label offset by (dx,dy), alive over [t0,t1]."""
    callout(c, x, y, dx, dy, title, sub, col, seg(t, t0, t0 + 1.1, linr), win(t, t0, t1, .01, .5), size)

def cap(c, t, t0, t1, msg, col=GOLD, y=958, size=38, w=700):
    """One line of caption text, centred, above the subtitle safe area."""
    a = win(t, t0, t1, .35, .35)
    if a > 0: text(c, msg, 960, y + 10 * (1 - seg(t, t0, t0 + .4, eout)), size, w, col, a, 'c', shadow=8)

def lab(c, s, x, y, a, size=28, col=WHITE, w=700, align='c'):
    if a > 0: text(c, s, x, y, size, w, col, a, align, shadow=6)

def panel(c, x, y, w, h, a, title=None, col=ACC):
    if a <= 0: return
    card(c, x, y, w, h, a)
    if title: text(c, title, x + 32, y + 46, 20, 800, col, a, track=3)

def tick(c, x, y, a, r=18, col=GREEN):
    """Green tick in a circle."""
    if a <= 0: return
    c.drawCircle(x, y, r, paint(col, .16 * a))
    c.drawCircle(x, y, r, paint(col, .9 * a, stroke=2.4))
    p = skia.Path(); p.moveTo(x - r * .42, y); p.lineTo(x - r * .08, y + r * .36); p.lineTo(x + r * .45, y - r * .34)
    c.drawPath(p, paint(col, a, stroke=3.4))

def cross(c, x, y, a, r=18, col=RED):
    """Red ✕ in a circle (used for 'this does not happen')."""
    if a <= 0: return
    c.drawCircle(x, y, r, paint(col, .14 * a))
    c.drawCircle(x, y, r, paint(col, .9 * a, stroke=2.4))
    for sx in (-1, 1):
        p = skia.Path(); p.moveTo(x - r * .4 * sx, y - r * .4); p.lineTo(x + r * .4 * sx, y + r * .4)
        c.drawPath(p, paint(col, a, stroke=3.4))

def flowdots(c, P, u, a, col=GREEN, n=7, r=6., tail=.22):
    """n dots travelling along path P; u = 0..1 progress of the lead dot."""
    if a <= 0 or len(P) < 2: return
    P = np.asarray(P, float)
    L = arclen(P)[-1]
    for i in range(n):
        q = u - i * (tail / max(n - 1, 1))
        if q <= 0 or q >= 1: continue
        (x, y), _ = along(P, q * L)
        f = a * (1 - i / n) * min(1, q * 8) * min(1, (1 - q) * 8)
        c.drawCircle(x, y, r, paint(col, .25 * f, blur=10))
        c.drawCircle(x, y, r * .62, paint(col, f))

@contextmanager
def zoom(c, cx, cy, k, a=1.):
    """Scale the drawing about (cx, cy) — used for the macro dives."""
    c.save(); c.translate(cx, cy); c.scale(k, k); c.translate(-cx, -cy)
    try: yield
    finally: c.restore()
