import hashlib, json, os, runpy, subprocess, sys, time
HOME = os.path.expanduser('~')
ROOT = os.path.join(HOME, 'CA_PERSONAL/ca_sources', 'sm')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Safari/537.36'
ITEMS = runpy.run_path(os.path.join(HOME, 'CA_PERSONAL/ca_sources', '_tools', 'manifest_sm.py'))['ITEMS']
out = []
logp = os.path.join(ROOT, '_downloads.json')
prev = {}
if os.path.exists(logp):
    for r in json.load(open(logp)):
        prev[r['local']] = r
for paper, ed, name, url, label in ITEMS:
    d = os.path.join(ROOT, paper, 'pdf') if ed == 'jan2027' else os.path.join(ROOT, paper, 'pdf', 'may2027-edition')
    os.makedirs(d, exist_ok=True)
    dest = os.path.join(d, name)
    rel = os.path.relpath(dest, ROOT)
    if os.path.exists(dest) and rel in prev and prev[rel].get('ok'):
        out.append(prev[rel]); continue
    for attempt in range(3):
        r = subprocess.run(['curl', '-sS', '-L', '-A', UA, '--retry', '2', '-o', dest, '-w', '%{http_code} %{content_type}', url],
                           capture_output=True, text=True)
        code = r.stdout.split(' ')[0] if r.stdout else '000'
        ok = code == '200' and os.path.exists(dest) and open(dest, 'rb').read(5) == b'%PDF-'
        if ok: break
        time.sleep(2)
    rec = {'paper': paper, 'edition_set': ed, 'local': rel, 'url': url, 'label': label, 'http': code,
           'content_type': r.stdout.partition(' ')[2], 'ok': ok, 'fetched': time.strftime('%Y-%m-%d')}
    if os.path.exists(dest):
        b = open(dest, 'rb').read()
        rec['size'] = len(b); rec['sha256'] = hashlib.sha256(b).hexdigest()
    print(('OK ' if ok else 'FAIL ') + rel, code, rec.get('size'), flush=True)
    out.append(rec)
json.dump(out, open(logp, 'w'), indent=1)
print('done', sum(1 for r in out if r['ok']), '/', len(out))
