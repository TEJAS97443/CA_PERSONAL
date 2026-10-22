"""rev_series: voice every PassBook, Out Loud episode as soon as its script is approved, in episode order (P4, P5, P6A, P6B).

    cd ~/CA_PERSONAL/ca_revision && nohup caffeinate -ims python3 tools/rev_series.py >> logs/runner.out 2>&1 &

For each script/<EP>.ready: synth -> mix -> Narrate library, using ~/HLD_PERSONAL/bms_podcast/tools/render.py with voice dm_hi (Arjun in
Hindi). Waits while another narration job is voicing on the GPU, or while the disk has less than MIN_FREE_GB. Re-voices an
episode whose script changed since it was voiced (line caches are kept, so only changed lines are voiced again; REV_PRUNE=1
deletes the chunks after publishing). Progress goes to logs/series.log and out/README.md.
"""
import hashlib
import json
import os
import shutil
import subprocess
import time
from pathlib import Path

ROOT = Path.home() / "CA_PERSONAL/ca_revision"
PY = str(Path.home() / "narrate/.venv/bin/python")
RENDER = Path.home() / "HLD_PERSONAL/bms_podcast/tools"
LOG = ROOT / "logs" / "series.log"
VOICE = "dm_hi"
MIN_FREE_GB = 2.0
PRUNE = os.environ.get("REV_PRUNE", "0") == "1"
INDEX = json.loads((ROOT / "briefs" / "INDEX.json").read_text())
EPS = [x["ep"] for x in INDEX]
BY = {x["ep"]: x for x in INDEX}
PAPER = {"P4": "Paper 4 · Costing", "P5": "Paper 5 · Audit", "P6A": "Paper 6A · FM", "P6B": "Paper 6B · SM"}
# other narration jobs: a synth of any course holds the GPU (their runners wait for ours the same way)
OTHERS = ["render.py synth", "tools/series.py", "tools/hld_series.py"]


def log(m):
    LOG.parent.mkdir(exist_ok=True)
    with open(LOG, "a") as f:
        f.write(time.strftime("%m-%d %H:%M:%S ") + m + "\n")


def gpu_busy():
    return any(subprocess.run(["pgrep", "-f", p], capture_output=True).returncode == 0 for p in OTHERS)


def free_gb():
    return shutil.disk_usage(Path.home()).free / 1e9


def hi_title(ep):
    first = (ROOT / "script" / f"{ep}.txt").read_text().splitlines()[0]
    parts = [p.strip() for p in first.lstrip("#").split("·")]
    return parts[2] if len(parts) > 2 else BY[ep]["name"]


def sha(p):
    return hashlib.sha1(p.read_bytes()).hexdigest()


def render(ep):
    x = BY[ep]
    script = ROOT / "script" / f"{ep}.txt"
    b = ROOT / "build" / ep
    title = hi_title(ep)
    env = dict(os.environ, HF_HUB_OFFLINE="1", BMS_ROUNDS="3", BMS_SCRIPT=str(script), BMS_BUILD=str(b),
               BMS_OUT=str(ROOT / "out"), BMS_LANG="hi", BMS_TITLE=f"PassBook, Out Loud · {ep} · {title}",
               BMS_SHOW="PassBook, Out Loud", BMS_STEM=f"{ep} - {x['name'].replace(':', ' -')}", BMS_COVER="dm",
               BMS_COVER_SHOW="PASSBOOK, OUT LOUD", BMS_COVER_TITLE=x["name"],
               BMS_COVER_SUB=f"{PAPER[x['paper']]} · Chapter {x['chapter']}",
               BMS_SOURCE=f"ca_revision_{ep}", BMS_LIB_TITLE=f"{ep} · {x['name']}")
    for cmd in ([PY, "render.py", "synth", VOICE], [PY, "render.py", "mix", VOICE], [PY, "render.py", "narrate", VOICE]):
        t = time.time()
        p = subprocess.run(cmd, cwd=RENDER, env=env, capture_output=True, text=True)
        with open(ROOT / "logs" / f"{ep}.log", "a") as f:
            f.write(f"\n===== {' '.join(cmd[1:])} ({time.time() - t:.0f}s)\n" + "\n".join(
                l for l in (p.stdout + p.stderr).splitlines() if "RuntimeWarning" not in l and "kernel = np" not in l) + "\n")
        if p.returncode:
            log(f"{ep}: {cmd[2]} FAILED (exit {p.returncode}); see logs/{ep}.log")
            return False
        log(f"{ep}: {cmd[2]} done in {time.time() - t:.0f}s")
    if PRUNE:
        d = b / VOICE
        shutil.rmtree(d / "chunks", ignore_errors=True)
        shutil.rmtree(d / "narrate" / "out", ignore_errors=True)
        (d / "master.wav").unlink(missing_ok=True)
    return True


def index():
    rows = ["# PassBook, Out Loud · CA Inter Group II chapter-wise revision", "",
            "Forty Hinglish revision episodes, one per syllabus chapter (P4, P5, P6A, P6B), narrated by Arjun. "
            "Story: a year at Tapri Tea Co. Ltd. Facts from the PassBook lessons (ICAI Study Material, Jan 2027).", "",
            "| Episode | Chapter | Length |", "|---|---|---|"]
    total = 0.0
    for ep in EPS:
        rep = ROOT / "build" / ep / VOICE / "report.json"
        name = BY[ep]["name"]
        if rep.exists() and (ROOT / "build" / ep / "done.sha").exists():
            m = json.loads(rep.read_text())["dur_min"]
            total += m
            rows.append(f"| {ep} | {name} · {hi_title(ep)} | {m:.1f} min |")
        else:
            rows.append(f"| {ep} | {name} | … |")
    rows += ["", f"Total so far: {int(total // 60)} h {total % 60:.0f} min.", "",
             "Files: `<EP> - <chapter> - Hindi · Arjun.mp3` (chapters + cover) and a transcript per episode.",
             "Also in the Narrate app (http://127.0.0.1:3300) as `<EP> · <chapter>`, with a live transcript."]
    (ROOT / "out" / "README.md").write_text("\n".join(rows) + "\n")


def main():
    log("runner started")
    fails, waiting = {}, False
    while True:
        todo = []
        for ep in EPS:
            s = ROOT / "script" / f"{ep}.txt"
            done = ROOT / "build" / ep / "done.sha"
            if ((ROOT / "script" / f"{ep}.ready").exists() and s.exists() and fails.get(ep, 0) < 3
                    and not (done.exists() and done.read_text() == sha(s))):
                todo.append((ep, s, done))
        if not todo:
            if all((ROOT / "build" / ep / "done.sha").exists() for ep in EPS):
                index()
                log("all 40 done")
                return
            time.sleep(60)
            continue
        if gpu_busy():
            # poll often: another course's runner mixes and publishes between its episodes without voicing, and that gap is
            # our turn (its runner then waits for our synth the same way), so the courses take turns instead of one starving
            if not waiting:
                log("another narration job holds the GPU; waiting")
            waiting = True
            time.sleep(4)
            continue
        waiting = False
        if free_gb() < MIN_FREE_GB:
            log(f"only {free_gb():.1f} GB free (need {MIN_FREE_GB}); waiting")
            time.sleep(300)
            continue
        ep, s, done = todo[0]
        h = sha(s)
        log(f"{ep}: start ({free_gb():.1f} GB free)")
        if render(ep):
            done.parent.mkdir(parents=True, exist_ok=True)
            done.write_text(h)
            index()
        else:
            fails[ep] = fails.get(ep, 0) + 1
            time.sleep(120)


if __name__ == "__main__":
    main()
