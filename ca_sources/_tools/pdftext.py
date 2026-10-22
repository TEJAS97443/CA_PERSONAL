import sys, fitz
for f in sys.argv[1:]:
    d = fitz.open(f)
    print('#####', f, 'pages', d.page_count)
    for i, p in enumerate(d):
        print('=== p.%d ===' % (i + 1))
        print(p.get_text('text'))
