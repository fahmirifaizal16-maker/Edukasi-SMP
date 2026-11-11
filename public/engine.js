// Mesin simulasi: calc (slider + gambar SVG), steps (alur), sort (klasifikasi), build (susun kalimat).
import { h, sv, slider, reduced } from './sim.js';

export function fmt(n, d) { return String(+Number(n).toFixed(d == null ? 2 : d)).replace('.', ','); }

export function mkG(svg) {
  function add(e) { svg.appendChild(e); return e; }
  return {
    svg: svg,
    L: function (x1, y1, x2, y2, c, w, dash, op) {
      var e = sv('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: c || 'var(--edge)', 'stroke-width': w || 2, 'stroke-linecap': 'round' });
      if (dash) e.setAttribute('stroke-dasharray', dash); if (op != null) e.setAttribute('opacity', op); return add(e);
    },
    R: function (x, y, w, hh, f, s, op, rx) {
      return add(sv('rect', { x: x, y: y, width: Math.max(0, w), height: Math.max(0, hh), fill: f || 'none', stroke: s || 'none', opacity: op == null ? 1 : op, rx: rx || 0, 'stroke-width': 2 }));
    },
    C: function (cx, cy, r, f, s, op) {
      return add(sv('circle', { cx: cx, cy: cy, r: Math.max(0, r), fill: f || 'none', stroke: s || 'none', opacity: op == null ? 1 : op, 'stroke-width': 2 }));
    },
    E: function (cx, cy, rx, ry, f, s, op) {
      return add(sv('ellipse', { cx: cx, cy: cy, rx: Math.max(0, rx), ry: Math.max(0, ry), fill: f || 'none', stroke: s || 'none', opacity: op == null ? 1 : op, 'stroke-width': 2 }));
    },
    T: function (x, y, t, size, c, anchor, wt) {
      return add(sv('text', { x: x, y: y, fill: c || 'var(--ink)', 'font-size': (size || 12) * 1.15, 'font-weight': wt || 700, 'text-anchor': anchor || 'middle', text: t }));
    },
    P: function (pts, f, s, op) {
      return add(sv('polygon', { points: pts.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '), fill: f || 'none', stroke: s || 'none', opacity: op == null ? 1 : op, 'stroke-width': 2, 'stroke-linejoin': 'round' }));
    },
    D: function (d, s, f, w, dash) {
      var e = sv('path', { d: d, stroke: s || 'var(--edge)', fill: f || 'none', 'stroke-width': w || 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
      if (dash) e.setAttribute('stroke-dasharray', dash); return add(e);
    }
  };
}

// bidang koordinat: mengembalikan {g (bagian terpotong), X, Y}
export function plot(G, x0, x1, y0, y1, step) {
  var W = 320, H = 190, ox = 20, oy = 10;
  var X = function (x) { return (x - x0) / (x1 - x0) * W; };
  var Y = function (y) { return H - (y - y0) / (y1 - y0) * H; };
  G.R(ox, oy, W, H, 'var(--bg)', 'var(--edge)');
  var inner = sv('svg', { x: ox, y: oy, width: W, height: H, viewBox: '0 0 ' + W + ' ' + H });
  G.svg.appendChild(inner);
  var g = mkG(inner), i;
  for (i = Math.ceil(x0 / step) * step; i <= x1; i += step) g.L(X(i), 0, X(i), H, 'var(--edge)', i === 0 ? 2 : 1, null, i === 0 ? .8 : .12);
  for (i = Math.ceil(y0 / step) * step; i <= y1; i += step) g.L(0, Y(i), W, Y(i), 'var(--edge)', i === 0 ? 2 : 1, null, i === 0 ? .8 : .12);
  return { g: g, X: X, Y: Y };
}
export function curve(p, f, x0, x1, col, w) {
  var d = '', n = 160;
  for (var i = 0; i <= n; i++) { var x = x0 + (x1 - x0) * i / n; d += (i ? 'L' : 'M') + p.X(x).toFixed(1) + ' ' + p.Y(f(x)).toFixed(1); }
  return p.g.D(d, col || 'var(--c-mat)', 'none', w || 3);
}

function playBtn(label) { return h('button', { type: 'button', class: 'btn small', text: label }); }

/* ===== calc: slider + gambar. cfg = {label, ctl:[[nama,min,max,awal,step]], draw(v,G,t)->teks, live, play, vb} ===== */
export function calc(cfg) {
  return function (el) {
    var v = cfg.ctl.map(function (c) { return c[3]; });
    var svg = sv('svg', { viewBox: cfg.vb || '0 0 360 220', class: 'simsvg', role: 'img', 'aria-label': cfg.label || 'Simulasi' });
    var info = h('p', { class: 'siminfo' });
    var sls = cfg.ctl.map(function (c, i) { return slider(c[0], c[1], c[2], c[3], c[4] || 1, function (x) { v[i] = x; draw(tNow); }); });
    var raf = 0, t0 = performance.now(), tNow = 0, sweep = false, live = !!cfg.live && !reduced();
    var btn = playBtn(cfg.live ? (live ? 'Jeda' : 'Lanjut') : 'Putar animasi');
    function draw(t) {
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var txt = cfg.draw(v, mkG(svg), t || 0);
      if (txt !== info.textContent) info.textContent = txt;
    }
    function loop(ts) {
      tNow = (ts - t0) / 1000;
      if (sweep) {
        var k = cfg.play || 0, c = cfg.ctl[k], st = c[4] || 1;
        var val = c[1] + (c[2] - c[1]) * (.5 - .5 * Math.cos(tNow * .9));
        val = +(Math.round(val / st) * st).toFixed(3);
        v[k] = val; sls[k].inp.value = val; sls[k].out.textContent = val;
      }
      draw(tNow);
      if (sweep || live) raf = requestAnimationFrame(loop);
    }
    btn.addEventListener('click', function () {
      if (cfg.live) { live = !live; btn.textContent = live ? 'Jeda' : 'Lanjut'; cancelAnimationFrame(raf); if (live) raf = requestAnimationFrame(loop); }
      else { sweep = !sweep; btn.textContent = sweep ? 'Berhenti' : 'Putar animasi'; cancelAnimationFrame(raf); if (sweep) { t0 = performance.now(); raf = requestAnimationFrame(loop); } }
    });
    var ctl = h('div', { class: 'simctl' }, sls.map(function (s) { return s.box; }).concat([btn, info]));
    el.appendChild(h('div', { class: 'simbody' }, [svg, ctl]));
    draw(0);
    if (live) raf = requestAnimationFrame(loop);
    return function () { sweep = false; live = false; cancelAnimationFrame(raf); };
  };
}

/* ===== steps: alur/urutan yang bisa diputar. cfg = {steps:[[judul, uraian]]} ===== */
export function steps(cfg) {
  return function (el) {
    var idx = 0, timer = 0, playing = false, S = cfg.steps;
    var flow = h('div', { class: 'flow', role: 'list' });
    var dots = S.map(function (s, i) {
      var d = h('button', { type: 'button', class: 'fstep', role: 'listitem' }, [h('i', { text: String(i + 1) }), h('span', { text: s[0] })]);
      d.addEventListener('click', function () { stop(); go(i); });
      flow.appendChild(d); return d;
    });
    var bar = h('div', { class: 'fbar' }, [h('i')]);
    var card = h('div', { class: 'tlcard', 'aria-live': 'polite' });
    var btn = playBtn('Putar urutan');
    var prev = h('button', { type: 'button', class: 'btn ghost small', text: 'Sebelumnya' });
    var next = h('button', { type: 'button', class: 'btn ghost small', text: 'Berikutnya' });
    function go(i) {
      idx = i;
      dots.forEach(function (d, j) { d.classList.toggle('on', j === i); d.classList.toggle('past', j < i); });
      bar.firstChild.style.width = ((i + 1) / S.length * 100) + '%';
      card.innerHTML = '';
      card.appendChild(h('b', { text: (i + 1) + '. ' + S[i][0] }));
      card.appendChild(h('span', { text: S[i][1] }));
      card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
    }
    function stop() { playing = false; clearInterval(timer); btn.textContent = 'Putar urutan'; }
    btn.addEventListener('click', function () {
      if (playing) { stop(); return; }
      playing = true; btn.textContent = 'Berhenti';
      if (idx >= S.length - 1) go(0);
      timer = setInterval(function () { if (idx >= S.length - 1) stop(); else go(idx + 1); }, 3000);
    });
    prev.addEventListener('click', function () { stop(); go((idx + S.length - 1) % S.length); });
    next.addEventListener('click', function () { stop(); go((idx + 1) % S.length); });
    el.appendChild(h('div', { class: 'simbody col' }, [flow, bar, card, h('div', { class: 'simrow' }, [prev, btn, next])]));
    go(0);
    return stop;
  };
}

/* ===== sort: klasifikasi. cfg = {cats:[..], items:[[teks, indeksKategori]], ask} ===== */
export function sort(cfg) {
  return function (el) {
    var order, n, score, tries;
    var ask = h('p', { class: 'siminfo', text: cfg.ask || 'Masukkan ke kelompok yang tepat.' });
    var card = h('div', { class: 'sortcard', 'aria-live': 'polite' });
    var cats = h('div', { class: 'seg' });
    var info = h('p', { class: 'siminfo' });
    var again = h('button', { type: 'button', class: 'btn small', text: 'Ulangi', hidden: '' });
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function show() {
      if (n >= order.length) {
        card.textContent = 'Selesai! Benar ' + score + ' dari ' + order.length;
        cats.hidden = true; again.hidden = false; info.textContent = ''; return;
      }
      card.textContent = order[n][0];
      card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
    }
    function start() { order = shuffle(cfg.items); n = 0; score = 0; tries = 0; cats.hidden = false; again.hidden = true; info.textContent = 'Soal 1 dari ' + order.length; show(); }
    cfg.cats.forEach(function (c, i) {
      var b = h('button', { type: 'button', text: c });
      b.addEventListener('click', function () {
        if (n >= order.length) return;
        if (order[n][1] === i) {
          if (!tries) score++;
          tries = 0; n++;
          info.textContent = 'Benar! ' + (n < order.length ? 'Soal ' + (n + 1) + ' dari ' + order.length : '');
          show();
        } else {
          tries++; info.textContent = 'Belum tepat, coba kelompok lain.';
          card.classList.remove('bad'); void card.offsetWidth; card.classList.add('bad');
        }
      });
      cats.appendChild(b);
    });
    again.addEventListener('click', start);
    el.appendChild(h('div', { class: 'simbody col' }, [ask, card, cats, info, again]));
    start();
    return function () {};
  };
}

/* ===== build: susun kalimat dari pilihan. cfg = {groups:[[label,[opsi]]], make(sel)->[kalimat, catatan]} ===== */
export function build(cfg) {
  return function (el) {
    var sel = cfg.groups.map(function () { return 0; });
    var out = h('div', { class: 'sent', 'aria-live': 'polite' });
    var note = h('p', { class: 'siminfo' });
    var boxes = cfg.groups.map(function (g, gi) {
      var box = h('div', { class: 'seg', role: 'group', 'aria-label': g[0] });
      box.appendChild(h('span', { class: 'seglab', text: g[0] }));
      g[1].forEach(function (o, oi) {
        var b = h('button', { type: 'button', text: o, 'aria-pressed': String(oi === 0) });
        b.addEventListener('click', function () {
          sel[gi] = oi;
          Array.prototype.forEach.call(box.querySelectorAll('button'), function (x, k) { x.setAttribute('aria-pressed', String(k === oi)); });
          draw();
        });
        box.appendChild(b);
      });
      return box;
    });
    function draw() {
      var r = cfg.make(sel);
      out.textContent = r[0]; note.textContent = r[1] || '';
      out.classList.remove('flash'); void out.offsetWidth; out.classList.add('flash');
    }
    el.appendChild(h('div', { class: 'simbody col' }, boxes.concat([out, note])));
    draw();
    return function () {};
  };
}

export function custom(fn) { return fn; }
