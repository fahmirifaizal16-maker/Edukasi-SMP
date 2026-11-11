// Simulasi interaktif per mata pelajaran. mountSim(id, el) mengembalikan fungsi pembersih.
var NS = 'http://www.w3.org/2000/svg';
function h(tag, attrs, kids) {
  var e = document.createElement(tag);
  for (var k in attrs || {}) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
  (kids || []).forEach(function (c) { e.appendChild(c); });
  return e;
}
function sv(tag, attrs) {
  var e = document.createElementNS(NS, tag);
  for (var k in attrs || {}) { if (k === 'text') e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); }
  return e;
}
function slider(label, min, max, val, step, onInput) {
  var out = h('output', { text: String(val) });
  var inp = h('input', { type: 'range', min: min, max: max, value: val, step: step || 1, 'aria-label': label });
  inp.addEventListener('input', function () { out.textContent = inp.value; onInput(Number(inp.value)); });
  return { box: h('label', { class: 'ctl' }, [h('span', { text: label }), inp, out]), inp: inp, out: out };
}
function reduced() { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; }

/* ---------- Matematika: Pythagoras ---------- */
function simMat(el) {
  var a = 3, b = 4, auto = false, raf = 0, t0 = 0;
  var svg = sv('svg', { viewBox: '0 0 360 260', class: 'simsvg', role: 'img', 'aria-label': 'Segitiga siku-siku dengan persegi di tiap sisi' });
  var info = h('p', { class: 'siminfo', 'aria-live': 'polite' });
  var sa = slider('Sisi a', 3, 12, a, 1, function (v) { a = v; draw(); });
  var sb = slider('Sisi b', 3, 12, b, 1, function (v) { b = v; draw(); });
  var btn = h('button', { type: 'button', class: 'btn small', text: 'Putar otomatis' });
  function draw() {
    var c = Math.sqrt(a * a + b * b), k = 14;
    var ox = 130, oy = 175; // titik siku-siku
    var A = [ox, oy], B = [ox + b * k, oy], C = [ox, oy - a * k];
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    // persegi sisi b (bawah), a (kiri), c (miring)
    svg.appendChild(sv('rect', { x: ox, y: oy, width: b * k, height: b * k, fill: 'var(--c-mat)', opacity: .25, stroke: 'var(--c-mat)' }));
    svg.appendChild(sv('rect', { x: ox - a * k, y: oy - a * k, width: a * k, height: a * k, fill: 'var(--c-ipa)', opacity: .25, stroke: 'var(--c-ipa)' }));
    var dx = B[0] - C[0], dy = B[1] - C[1];
    var nx = dy, ny = -dx; // normal keluar segitiga
    svg.appendChild(sv('polygon', { points: [C, B, [B[0] + nx, B[1] + ny], [C[0] + nx, C[1] + ny]].map(function (p) { return p.join(','); }).join(' '), fill: 'var(--c-indo)', opacity: .25, stroke: 'var(--c-indo)' }));
    svg.appendChild(sv('polygon', { points: [A, B, C].map(function (p) { return p.join(','); }).join(' '), fill: 'var(--hl)', stroke: 'var(--edge)', 'stroke-width': 2 }));
    svg.appendChild(sv('rect', { x: ox, y: oy - 10, width: 10, height: 10, fill: 'none', stroke: 'var(--edge)' }));
    function lab(x, y, t, col) { svg.appendChild(sv('text', { x: x, y: y, 'text-anchor': 'middle', fill: col, 'font-size': 14, 'font-weight': 700, text: t })); }
    lab(ox + b * k / 2, oy + b * k / 2 + 5, 'b² = ' + b * b, 'var(--c-mat)');
    lab(ox - a * k / 2, oy - a * k / 2 + 5, 'a² = ' + a * a, 'var(--c-ipa)');
    var mx = (C[0] + B[0]) / 2 + nx / 2, my = (C[1] + B[1]) / 2 + ny / 2;
    lab(mx, my + 5, 'c² = ' + (a * a + b * b), 'var(--c-indo)');
    var bb = svg.getBBox(); svg.setAttribute('viewBox', [bb.x - 12, bb.y - 12, bb.width + 24, bb.height + 24].join(' '));
    var cs = Number.isInteger(c) ? String(c) : c.toFixed(2).replace('.', ',');
    info.textContent = a + '² + ' + b + '² = ' + (a * a + b * b) + ', maka c = √' + (a * a + b * b) + ' = ' + cs + (Number.isInteger(c) ? '  (tripel Pythagoras!)' : '');
  }
  function tick(ts) {
    if (!auto) return;
    if (ts - t0 > 900) {
      t0 = ts;
      a = a >= 12 ? 3 : a + 1; b = b >= 12 ? 3 : (a % 2 ? b + 1 : b);
      sa.inp.value = a; sa.out.textContent = a; sb.inp.value = b; sb.out.textContent = b; draw();
    }
    raf = requestAnimationFrame(tick);
  }
  btn.addEventListener('click', function () {
    auto = !auto; btn.textContent = auto ? 'Berhenti' : 'Putar otomatis';
    if (auto) raf = requestAnimationFrame(tick); else cancelAnimationFrame(raf);
  });
  el.appendChild(h('div', { class: 'simbody' }, [svg, h('div', { class: 'simctl' }, [sa.box, sb.box, btn, info])]));
  draw();
  return function () { auto = false; cancelAnimationFrame(raf); };
}

/* ---------- IPA: gelombang ---------- */
function simIpa(el) {
  var amp = 40, freq = 2, raf = 0, run = true, ph = 0, last = 0;
  var svg = sv('svg', { viewBox: '0 0 360 200', class: 'simsvg', role: 'img', 'aria-label': 'Gelombang transversal bergerak' });
  var axis = sv('line', { x1: 0, y1: 100, x2: 360, y2: 100, stroke: 'var(--edge)', 'stroke-dasharray': '4 4', opacity: .5 });
  var path = sv('path', { fill: 'none', stroke: 'var(--c-ipa)', 'stroke-width': 4, 'stroke-linecap': 'round' });
  var dot = sv('circle', { r: 7, fill: 'var(--hl)', stroke: 'var(--edge)', 'stroke-width': 2, cx: 40 });
  svg.appendChild(axis); svg.appendChild(path); svg.appendChild(dot);
  var info = h('p', { class: 'siminfo', 'aria-live': 'polite' });
  var sA = slider('Amplitudo', 10, 80, amp, 5, function (v) { amp = v; upd(); });
  var sF = slider('Frekuensi (Hz)', 1, 5, freq, 1, function (v) { freq = v; upd(); });
  var btn = h('button', { type: 'button', class: 'btn small', text: 'Jeda' });
  function upd() {
    info.textContent = 'f = ' + freq + ' Hz, jadi periode T = 1/f = ' + (1 / freq).toFixed(2).replace('.', ',') + ' s. Makin besar amplitudo, makin besar energi gelombang.';
  }
  function draw() {
    var d = '', len = 180 / freq; // panjang gelombang (px) menurun saat frekuensi naik
    for (var x = 0; x <= 360; x += 4) {
      var y = 100 - amp * Math.sin((x / len) * 2 * Math.PI - ph);
      d += (x ? 'L' : 'M') + x + ' ' + y.toFixed(1);
    }
    path.setAttribute('d', d);
    dot.setAttribute('cy', (100 - amp * Math.sin((40 / len) * 2 * Math.PI - ph)).toFixed(1));
  }
  function tick(ts) {
    if (run) { ph += (ts - (last || ts)) / 1000 * freq * 2 * Math.PI * .5; draw(); }
    last = ts; raf = requestAnimationFrame(tick);
  }
  btn.addEventListener('click', function () { run = !run; btn.textContent = run ? 'Jeda' : 'Lanjut'; });
  el.appendChild(h('div', { class: 'simbody' }, [svg, h('div', { class: 'simctl' }, [sA.box, sF.box, btn, info])]));
  upd(); draw();
  if (!reduced()) raf = requestAnimationFrame(tick); else { run = false; btn.textContent = 'Lanjut'; }
  return function () { cancelAnimationFrame(raf); };
}

export { h, sv, slider, reduced, simMat, simIpa };
