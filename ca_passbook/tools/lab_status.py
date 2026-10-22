#!/usr/bin/env python3
"""Change content/labs.json safely when several agents work at once.

    python3 -I tools/lab_status.py <lab-id> ready|planned        set one lab's status (nothing else in the file is touched)
    python3 -I tools/lab_status.py add '<json entry>'            register a new lab (status "planned" unless the entry says otherwise)
    python3 -I tools/lab_status.py add path/to/entry.json         the same, the entry read from a file
    python3 -I tools/lab_status.py set <lab-id> '<json fields>'   merge fields into one lab's entry (title, blurb, keywords, topics, status)
    python3 -I tools/lab_status.py list                          the ids and statuses

An entry is {"id", "title", "subject" (cma | aud | fm | sm), "topics": [topic ids], "blurb", "keywords": [...], "status"}; the id must be
the lab file's name (app/js/labs/<id>.js). Every command takes an exclusive lock, re-reads the file and writes it atomically, so two
agents never overwrite each other's entries. `add` refuses an id that is already registered (change it with the status command, or edit
your own entry by hand while holding no other change).
"""
import fcntl, json, os, re, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATH = os.path.join(ROOT, 'content', 'labs.json')
KEYS = ('id', 'title', 'subject', 'topics', 'blurb', 'keywords', 'status')


def _write(labs):
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(PATH), suffix='.tmp')
    with os.fdopen(fd, 'w', encoding='utf-8') as out:
        json.dump(labs, out, indent=1, ensure_ascii=False)
        out.write('\n')
    os.chmod(tmp, 0o644)
    os.replace(tmp, PATH)


def _entry(arg):
    raw = open(arg, encoding='utf-8').read() if os.path.isfile(arg) else arg
    e = json.loads(raw)
    if not isinstance(e, dict):
        raise ValueError('the entry must be a JSON object')
    e.setdefault('status', 'planned')
    e.setdefault('keywords', [])
    missing = [k for k in ('id', 'title', 'subject', 'topics', 'blurb') if not e.get(k)]
    if missing:
        raise ValueError('the entry needs ' + ', '.join(missing))
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', e['id']):
        raise ValueError('id must be lower-case words joined by hyphens (the file name app/js/labs/<id>.js)')
    if e['status'] not in ('ready', 'planned'):
        raise ValueError('status is "ready" or "planned"')
    if not isinstance(e['topics'], list) or not isinstance(e['keywords'], list):
        raise ValueError('topics and keywords are lists')
    return {k: e[k] for k in KEYS if k in e} | {k: v for k, v in e.items() if k not in KEYS}


def set_fields(lab_id, raw):
    """merge {title, blurb, keywords, topics, status, ...} into one entry, under the lock (the id and subject never change here)"""
    try:
        upd = json.loads(open(raw, encoding='utf-8').read() if os.path.isfile(raw) else raw)
    except (ValueError, OSError) as err:
        print('not changed: ' + str(err))
        return 1
    if not isinstance(upd, dict) or 'id' in upd or 'subject' in upd:
        print('not changed: give a JSON object of fields other than id and subject')
        return 1
    if 'status' in upd and upd['status'] not in ('ready', 'planned'):
        print('not changed: status is "ready" or "planned"')
        return 1
    with open(PATH + '.lock', 'w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        with open(PATH, encoding='utf-8') as f:
            labs = json.load(f)
        hit = [l for l in labs if l.get('id') == lab_id]
        if not hit:
            print('no such lab: ' + lab_id)
            return 1
        hit[0].update(upd)
        _write(labs)
    print(lab_id + ': ' + ', '.join(sorted(upd)) + ' updated')
    return 0


def main(argv):
    if len(argv) == 2 and argv[1] == 'list':
        for l in json.load(open(PATH, encoding='utf-8')):
            print(f"{l.get('id')}\t{l.get('status')}\t{l.get('subject')}\t{l.get('title')}")
        return 0
    if len(argv) == 4 and argv[1] == 'set':
        return set_fields(argv[2], argv[3])
    if len(argv) != 3 or (argv[1] != 'add' and argv[2] not in ('ready', 'planned')):
        print(__doc__)
        return 2
    with open(PATH + '.lock', 'w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        with open(PATH, encoding='utf-8') as f:
            labs = json.load(f)
        if argv[1] == 'add':
            try:
                e = _entry(argv[2])
            except (ValueError, OSError) as err:
                print('not added: ' + str(err))
                return 1
            if any(l.get('id') == e['id'] for l in labs):
                print('already registered: ' + e['id'] + ' (use: tools/lab_status.py ' + e['id'] + ' ready|planned)')
                return 1
            labs.append(e)
            _write(labs)
            print('added ' + e['id'] + ' (' + e['status'] + ')')
            return 0
        lab_id, status = argv[1], argv[2]
        hit = [l for l in labs if l.get('id') == lab_id]
        if not hit:
            print('no such lab: ' + lab_id + ' (known: ' + (', '.join(l['id'] for l in labs) or 'none yet; register it with add') + ')')
            return 1
        hit[0]['status'] = status
        _write(labs)
    print(lab_id + ' -> ' + status)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
