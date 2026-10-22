import re, html, sys
for f in sys.argv[1:]:
    s = open(f, encoding='utf-8', errors='replace').read()
    i = s.find('Contact Us')
    body = s[i:] if i >= 0 else s
    body = re.sub(r'<script.*?</script>', '', body, flags=re.S)
    body = re.sub(r'<style.*?</style>', '', body, flags=re.S)
    body = re.sub(r'<a [^>]*href="([^"]*)"[^>]*>', r' [LINK \1] ', body)
    t = re.sub(r'<[^>]+>', ' ', body)
    t = html.unescape(re.sub(r'\s+', ' ', t))
    j = t.find('Follow Us')
    print('=====', f); print(t[:j if j > 0 else 6000])
