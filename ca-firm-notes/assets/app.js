/* THE EXCHANGE — MarketFlow
   Reading machinery: scroll progress, nav, sealed gates, attempt persistence,
   concept tracker, notebook export. No dependencies. */
(function () {
  'use strict';

  var NS = 'xchg.';
  var PAGE = (location.pathname.split('/').pop() || 'index').replace('.html', '');

  function get(k, d) {
    try { var v = localStorage.getItem(NS + k); return v === null ? d : v; } catch (e) { return d; }
  }
  function set(k, v) {
    try { localStorage.setItem(NS + k, v); } catch (e) {}
  }

  /* ------------------------------------------------------ scroll progress */
  var bar = document.getElementById('progress');
  function progress() {
    if (!bar) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + '%';
    var best = parseFloat(get('read.' + PAGE, '0'));
    if (pct > best + 1) set('read.' + PAGE, String(Math.round(pct)));
  }

  /* --------------------------------------------------------- mobile nav */
  var toggle = document.getElementById('menu-toggle');
  var sidebar = document.getElementById('sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () { sidebar.classList.toggle('open'); });
    sidebar.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') sidebar.classList.remove('open');
    });
  }

  /* ------------------------------------------------------------ the gates */
  var gates = [].slice.call(document.querySelectorAll('details.gate'));

  gates.forEach(function (g) {
    var id = g.getAttribute('data-id');
    if (!id) return;
    if (get('unlocked.' + id, '') && g.classList.contains('sealed')) unseal(g, true);
  });

  function unseal(g, silent) {
    g.classList.remove('sealed');
    var hint = g.querySelector('.gate-hint');
    if (hint) hint.textContent = 'Seal broken — click to compare';
    if (!silent) g.open = true;
  }

  /* a sealed gate refuses to open */
  gates.forEach(function (g) {
    var s = g.querySelector('summary');
    if (!s) return;
    s.addEventListener('click', function (e) {
      if (g.classList.contains('sealed')) {
        e.preventDefault();
        var work = document.querySelector('.attempt-work[data-for="' + g.getAttribute('data-id') + '"]');
        if (work) {
          var ta = work.querySelector('textarea');
          if (ta) { ta.focus(); ta.classList.add('nudge'); setTimeout(function () { ta.classList.remove('nudge'); }, 500); }
        }
      }
    });
  });

  /* ----------------------------------------------- attempt boxes (writing) */
  var works = [].slice.call(document.querySelectorAll('.attempt-work'));

  works.forEach(function (work) {
    var id = work.getAttribute('data-for');
    var ta = work.querySelector('textarea');
    var btn = work.querySelector('.btn-unseal');
    var skip = work.querySelector('.btn-skip');
    var count = work.querySelector('.attempt-count');
    var gate = document.querySelector('details.gate[data-id="' + id + '"]');
    var min = parseInt(work.getAttribute('data-min') || '40', 10);
    if (!ta) return;

    var saved = get('attempt.' + id, '');
    if (saved) ta.value = saved;

    var t = null;
    function sync() {
      var n = ta.value.trim().length;
      if (count) {
        count.textContent = n + ' / ' + min + ' characters';
        count.classList.toggle('ok', n >= min);
      }
      var ready = n >= min;
      if (btn) {
        btn.classList.toggle('ready', ready);
        btn.textContent = ready ? 'Break the seal →' : 'Sealed';
      }
      clearTimeout(t);
      t = setTimeout(function () { set('attempt.' + id, ta.value); }, 350);
    }
    ta.addEventListener('input', sync);
    sync();

    if (btn) {
      btn.addEventListener('click', function () {
        if (!btn.classList.contains('ready')) return;
        set('unlocked.' + id, 'wrote');
        if (gate) unseal(gate);
      });
    }
    if (skip) {
      skip.addEventListener('click', function () {
        if (!confirm('Open this without attempting it?\n\nThe seal exists because reading an answer you did not reach yourself does not transfer to an interview. It will be marked as skipped.')) return;
        set('unlocked.' + id, 'skipped');
        skip.outerHTML = '<span class="skipped-mark">skipped</span>';
        if (gate) unseal(gate);
      });
    }
    if (get('unlocked.' + id, '') === 'skipped' && skip) {
      skip.outerHTML = '<span class="skipped-mark">skipped</span>';
    }
  });

  /* ------------------------------------------------------- reveal everything */
  var revealBtn = document.getElementById('reveal-all');
  if (revealBtn) {
    var RK = 'revealall.' + PAGE;
    function applyReveal(on) {
      gates.forEach(function (g) { if (on) g.classList.remove('sealed'); g.open = on; });
      revealBtn.classList.toggle('on', on);
      revealBtn.textContent = on ? 'Re-seal this phase' : 'Reveal everything';
    }
    if (get(RK, '0') === '1') applyReveal(true);
    revealBtn.addEventListener('click', function () {
      var next = get(RK, '0') !== '1';
      if (next && !confirm('Reveal every answer on this page?\n\nThis turns the phase into a textbook. Useful on a second read; costly on a first.')) return;
      set(RK, next ? '1' : '0');
      applyReveal(next);
    });
  }

  /* ----------------------------------------------------- notebook export */
  var exportBtn = document.getElementById('export-notebook');
  if (exportBtn) {
    exportBtn.addEventListener('click', function () {
      var lines = ['# My MarketFlow notebook', ''];
      var found = 0;
      var keys = [];
      try { for (var i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i)); } catch (e) {}
      keys.filter(function (k) { return k && k.indexOf(NS + 'attempt.') === 0; }).sort().forEach(function (k) {
        var txt = localStorage.getItem(k);
        if (!txt || !txt.trim()) return;
        found++;
        var id = k.replace(NS + 'attempt.', '');
        var el = document.querySelector('[data-id="' + id + '"] .gate-text, [data-attempt-id="' + id + '"] .callout-title');
        var label = document.querySelector('.attempt-block[data-id="' + id + '"] .callout-title');
        lines.push('## ' + (label ? label.textContent : el ? el.textContent : id));
        lines.push('');
        lines.push(txt.trim());
        lines.push('');
        var state = localStorage.getItem(NS + 'unlocked.' + id);
        if (state) lines.push('_seal: ' + state + '_', '');
      });
      if (!found) { alert('Nothing written yet. The notebook fills up as you answer the attempt boxes.'); return; }
      var blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'marketflow-notebook.md';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  /* ------------------------------------------------------- concept tracker */
  var pills = [].slice.call(document.querySelectorAll('.pill'));
  pills.forEach(function (p) {
    var row = p.getAttribute('data-row');
    var col = parseInt(p.getAttribute('data-col'), 10);
    var lvl = parseInt(get('trk.' + row, '-1'), 10);
    if (col <= lvl) p.classList.add('on');
    p.addEventListener('click', function () {
      var cur = parseInt(get('trk.' + row, '-1'), 10);
      var next = cur === col ? col - 1 : col;
      set('trk.' + row, String(next));
      [].slice.call(document.querySelectorAll('.pill[data-row="' + row + '"]')).forEach(function (q) {
        q.classList.toggle('on', parseInt(q.getAttribute('data-col'), 10) <= next);
      });
      updateTrackerCount();
    });
  });

  function updateTrackerCount() {
    var out = document.getElementById('trk-count');
    if (!out) return;
    var rows = {};
    pills.forEach(function (p) { rows[p.getAttribute('data-row')] = true; });
    var total = Object.keys(rows).length, ready = 0, touched = 0;
    Object.keys(rows).forEach(function (r) {
      var l = parseInt(get('trk.' + r, '-1'), 10);
      if (l >= 0) touched++;
      if (l >= 3) ready++;
    });
    out.textContent = touched + ' of ' + total + ' concepts touched · ' + ready + ' interview-ready';
  }
  updateTrackerCount();

  /* --------------------------------------------------------- scroll spy */
  var links = [].slice.call(document.querySelectorAll('.subtoc a'));
  var targets = links.map(function (a) {
    var el = document.getElementById(a.getAttribute('href').slice(1));
    return el ? { a: a, el: el } : null;
  }).filter(Boolean);

  function spy() {
    if (!targets.length) return;
    var y = window.scrollY + 130;
    var cur = targets[0];
    for (var i = 0; i < targets.length; i++) if (targets[i].el.offsetTop <= y) cur = targets[i];
    links.forEach(function (a) { a.classList.toggle('here', a === cur.a); });
  }

  var queued = false;
  window.addEventListener('scroll', function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { progress(); spy(); queued = false; });
  }, { passive: true });

  progress();
  spy();

  /* landing page: show how far through each phase you are */
  [].slice.call(document.querySelectorAll('[data-progress-for]')).forEach(function (el) {
    var pct = parseInt(get('read.' + el.getAttribute('data-progress-for'), '0'), 10);
    if (pct > 4) el.textContent = pct + '% read';
  });
})();
