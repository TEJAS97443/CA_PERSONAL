"""Profits and Gains of Business or Profession (CA Inter, A.Y. 2026-27).
Spine only: backdrop, template layer (uml.py code / uml scenes from script.py), hand-drawn chapter scenes
(scenes/ch_<k>.py, faded out while a template is on screen), beat cards, kickers.
    ~/edu2d/.venv/bin/python film.py sheet 12 [t0 t1]   contact sheet at 1/3 res (CH=abc: only those chapters)
    ~/edu2d/.venv/bin/python film.py events            events.json only
    ~/edu2d/.venv/bin/python film.py video             video.mp4
"""
import importlib, os, sys
sys.path.insert(0, '/Users/ztejas/edu2d')
sys.path.insert(0, '/Users/ztejas/CA_PERSONAL/pgbp')
from scenes.common import *
from templates import beat_events

DUR = max(TPL.end, B.list[-1]['end'] + 3.6)
CH = [ch['key'] for ch in B.chapters]

SCENES = {}
ONLY = os.environ.get('CH')                               # CH=def: import only these chapters (parallel agents)
for k in CH:
    if ONLY and k not in ONLY: continue
    try:
        m = importlib.import_module(f'scenes.ch_{k}')
        if hasattr(m, f'ch_{k}'): SCENES[k] = getattr(m, f'ch_{k}')
        EV.extend(getattr(m, 'EVENTS', []))
    except ModuleNotFoundError as e:
        if f'scenes.ch_{k}' not in str(e): raise
EV.extend(TPL.events())
EV.extend(beat_events(B))

def draw(c, t):
    backdrop(c, t, None, top='#0b1433', bot='#03050d', glow='#1e3a8a', ga=.42, bc='#8fb4ff', seed=3)
    grid(c, None, 90, .035)
    ta = tpl_alpha(t)
    for k in CH:
        if k not in SCENES: continue
        s, e = B.span(k)
        if k == CH[-1]: e = DUR + 1
        if s - .45 <= t <= e + .45:
            a = (1 if k == CH[0] else seg(t, s - .45, s + .45, linr)) * (1 - seg(t, e - .45, e + .45, linr)) * (1 - ta)
            if a >= .999: SCENES[k](c, t)
            elif a > .003:
                with layer(c, a): SCENES[k](c, t)
    TPL.draw(c, t)
    vignette(c, .5)
    B.draw(c, t); B.kicker(c, t)
    c.drawPaint(paint(BLACK, 1 - seg(t, 0, .8) * (1 - seg(t, DUR - 1.4, DUR - .1))))

if __name__ == '__main__':
    main(draw, DUR, EV)
