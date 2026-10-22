"""Writing data/ safely while the app and the tests read it (audit WP13 notes; P1-58 versioned files).

Stage    build.py writes the whole data/ tree into a sibling staging directory and then swaps it in with one atomic rename (macOS
         renamex_np RENAME_SWAP, Linux renameat2 RENAME_EXCHANGE; elsewhere two quick renames), so a reader never sees a half-written data/.
hashes   manifest.files = {project path: sha8} for every file the app can request (app/, data/ except the manifest itself, vendor/) and
         manifest.ver = one stamp over all of them and the manifest, so U.verUrl / GA.data.figUrl can append ?v=<sha8> on a hosted copy.
"""
from __future__ import annotations

import ctypes
import ctypes.util
import hashlib
import json
import os
import shutil
import sys
from pathlib import Path

SKIP_NAMES = {".DS_Store", "Thumbs.db"}


def js(obj) -> str:
    return json.dumps(obj, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


def reg_text(ns: str, key: str, obj) -> str:
    return f"GAD.reg({js(ns)},{js(key)},{js(obj)});\n"


def sha8(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()[:8]


class Stage:
    """a fresh data tree next to the live one; commit() swaps it in"""

    def __init__(self, live: Path):
        self.live = live
        self.dir = live.parent / f".{live.name}-build-{os.getpid()}"
        shutil.rmtree(self.dir, ignore_errors=True)
        self.dir.mkdir(parents=True)

    def path(self, rel: str | Path) -> Path:
        p = self.dir / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        return p

    def write(self, rel: str | Path, text: str) -> None:
        self.path(rel).write_text(text)

    def reg(self, rel: str | Path, ns: str, key: str, obj) -> None:
        self.write(rel, reg_text(ns, key, obj))

    def files(self, prefix: str) -> dict[str, str]:
        """{prefix/rel: sha8} for every file in the stage"""
        return hash_tree(self.dir, prefix)

    def abort(self) -> None:
        shutil.rmtree(self.dir, ignore_errors=True)

    def commit(self) -> None:
        if not self.live.exists():
            os.rename(self.dir, self.live)
            return
        if not _swap(self.dir, self.live):
            old = self.live.parent / f".{self.live.name}-old-{os.getpid()}"
            os.rename(self.live, old)
            os.rename(self.dir, self.live)
            self.dir = old
        shutil.rmtree(self.dir, ignore_errors=True)        # after the swap the staging path holds the previous tree


def _swap(a: Path, b: Path) -> bool:
    """exchange two directory entries atomically; False when the platform has no such call"""
    try:
        libc = ctypes.CDLL(ctypes.util.find_library("c"), use_errno=True)
        if sys.platform == "darwin" and hasattr(libc, "renamex_np"):
            return libc.renamex_np(os.fsencode(a), os.fsencode(b), ctypes.c_uint(0x2)) == 0         # RENAME_SWAP
        if sys.platform.startswith("linux") and hasattr(libc, "renameat2"):
            AT = -100                                                                              # AT_FDCWD
            return libc.renameat2(AT, os.fsencode(a), AT, os.fsencode(b), ctypes.c_uint(0x2)) == 0  # RENAME_EXCHANGE
    except (OSError, AttributeError):
        return False
    return False


def hash_tree(base: Path, prefix: str, skip: set[str] = frozenset()) -> dict[str, str]:
    out: dict[str, str] = {}
    if not base.exists():
        return out
    for p in sorted(base.rglob("*")):
        if not p.is_file() or p.name in SKIP_NAMES or any(part.startswith(".") for part in p.relative_to(base).parts):
            continue
        rel = f"{prefix}/{p.relative_to(base).as_posix()}"
        if rel in skip:
            continue
        out[rel] = sha8(p.read_bytes())
    return out


def stamp(manifest: dict, files: dict[str, str]) -> str:
    """manifest.ver: one sha8 over the manifest's content (its build date excluded, so an unchanged rebuild keeps its stamp) and every file hash"""
    body = {k: v for k, v in manifest.items() if k not in ("built", "files", "ver")}
    h = hashlib.sha256(json.dumps(body, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode())
    for k in sorted(files):
        h.update(f"\n{k}:{files[k]}".encode())
    return h.hexdigest()[:8]


def write_atomic(path: Path, text: str) -> bool:
    """replace a file in one step when its content changed; True when written"""
    if path.exists() and path.read_text() == text:
        return False
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(f".{path.name}.tmp{os.getpid()}")
    tmp.write_text(text)
    os.replace(tmp, path)
    return True
