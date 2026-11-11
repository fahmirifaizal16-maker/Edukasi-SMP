import { calc, plot, curve, fmt, custom } from './engine.js';
import { h, sv, simMat } from './sim.js';

var COL = ['var(--c-mat)', 'var(--c-ipa)', 'var(--c-indo)', 'var(--c-ips)', 'var(--c-ing)'];
var SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
function sup(n) { return String(n).split('').map(function (c) { return SUP[c]; }).join(''); }
function pyth() { return simMat; }

/* ---------- Kelas 7 ---------- */
var bilBulat = calc({
  label: 'Garis bilangan', play: 1,
  ctl: [['Mulai (a)', -8, 8, 2], ['Tambah (b)', -8, 8, -5]],
  draw: function (v, G) {
    var a = v[0], b = v[1], r = a + b, X = function (x) { return 20 + (x + 10) * 16; };
    G.L(20, 130, 340, 130, 'var(--edge)', 3);
    for (var i = -10; i <= 10; i++) { G.L(X(i), 124, X(i), 136, 'var(--edge)', i === 0 ? 3 : 1.5); if (i % 2 === 0) G.T(X(i), 154, String(i), 11); }
    G.C(X(a), 130, 8, 'var(--c-mat)', 'var(--edge)');
    var mid = (X(a) + X(r)) / 2, up = Math.max(24, Math.abs(X(r) - X(a)) / 2);
    if (b !== 0) {
      G.D('M' + X(a) + ' 122 Q' + mid + ' ' + (122 - up * 1.3) + ' ' + X(r) + ' 122', b > 0 ? 'var(--c-ipa)' : 'var(--c-indo)', 'none', 3);
      G.P([[X(r), 124], [X(r) - 6, 112], [X(r) + 6, 112]], b > 0 ? 'var(--c-ipa)' : 'var(--c-indo)');
    }
    G.C(X(r), 130, 8, 'var(--hl)', 'var(--edge)');
    G.T(X(a), 176, 'a', 12, 'var(--c-mat)'); G.T(X(r), 176, 'hasil', 12);
    return a + ' + (' + b + ') = ' + r + (b < 0 ? '  → sama dengan ' + a + ' − ' + Math.abs(b) : '') + '. Geser ke kanan jika b positif, ke kiri jika b negatif.';
  }
});
var pecahan = calc({
  label: 'Diagram lingkaran pecahan', play: 0,
  ctl: [['Pembilang', 0, 10, 3], ['Penyebut', 2, 10, 4]],
  draw: function (v, G) {
    var d = v[1], n = Math.min(v[0], d), cx = 110, cy = 110, r = 84;
    for (var i = 0; i < d; i++) {
      var a0 = -Math.PI / 2 + 2 * Math.PI * i / d, a1 = -Math.PI / 2 + 2 * Math.PI * (i + 1) / d;
      var p = 'M' + cx + ' ' + cy + ' L' + (cx + r * Math.cos(a0)) + ' ' + (cy + r * Math.sin(a0)) + ' A' + r + ' ' + r + ' 0 0 1 ' + (cx + r * Math.cos(a1)) + ' ' + (cy + r * Math.sin(a1)) + ' Z';
      G.D(p, 'var(--edge)', i < n ? 'var(--c-mat)' : 'var(--bg)', 2);
    }
    G.R(230, 60, 100, 100, 'var(--bg)', 'var(--edge)');
    G.R(230, 160 - 100 * n / d, 100, 100 * n / d, 'var(--c-mat)', 'none', .85);
    G.T(280, 182, 'bagian terisi', 11);
    return n + '/' + d + ' = ' + fmt(n / d, 3) + ' = ' + fmt(n / d * 100, 1) + '%. Pecahan, desimal, dan persen adalah tiga cara menulis bilangan yang sama.';
  }
});
var aljabar = calc({
  label: 'Substitusi bentuk aljabar', play: 0,
  ctl: [['Nilai x', -5, 5, 3], ['Koefisien a', 1, 4, 2], ['Konstanta b', -5, 5, 1]],
  draw: function (v, G) {
    var x = v[0], a = v[1], b = v[2], k = 22, base = 40;
    for (var i = 0; i < a; i++) {
      G.R(base, 14 + i * 34, Math.abs(x) * k, 26, x >= 0 ? 'var(--c-mat)' : 'var(--c-indo)', 'var(--edge)', .85, 4);
      G.T(base + Math.abs(x) * k / 2 + 1, 32 + i * 34, 'x = ' + x, 12, '#fff');
    }
    var yb = 14 + a * 34 + 6;
    G.R(base, yb, Math.abs(b) * k, 26, b >= 0 ? 'var(--c-ips)' : 'var(--c-indo)', 'var(--edge)', .85, 4);
    G.T(base + Math.abs(b) * k / 2 + 1, yb + 18, 'b = ' + b, 12, '#fff');
    return a + 'x + b dengan x = ' + x + ': ' + a + '(' + x + ') + (' + b + ') = ' + (a * x + b) + '. Ada ' + a + ' kotak x ditambah konstanta b.';
  }
});
var plsv = calc({
  label: 'Timbangan persamaan 2x + 3 = 11', play: 0,
  ctl: [['Coba nilai x', 0, 10, 1]],
  draw: function (v, G) {
    var x = v[0], L = 2 * x + 3, R = 11, diff = Math.max(-1, Math.min(1, (L - R) / 10)), th = diff * 0.28;
    var px = 180, py = 120, len = 130;
    var lx = px - len * Math.cos(th), ly = py + len * Math.sin(th), rx = px + len * Math.cos(th), ry = py - len * Math.sin(th);
    G.P([[px, py], [px - 28, 200], [px + 28, 200]], 'var(--edge)', 'none', .5);
    G.L(lx, ly, rx, ry, 'var(--edge)', 6);
    G.L(lx, ly, lx, ly + 34, 'var(--edge)', 2); G.L(rx, ry, rx, ry + 34, 'var(--edge)', 2);
    G.R(lx - 42, ly + 34, 84, 28, L === R ? 'var(--c-ipa)' : 'var(--c-mat)', 'var(--edge)', .9, 6); G.T(lx, ly + 53, '2x + 3 = ' + L, 12, '#fff');
    G.R(rx - 30, ry + 34, 60, 28, L === R ? 'var(--c-ipa)' : 'var(--c-ips)', 'var(--edge)', .9, 6); G.T(rx, ry + 53, '11', 12, '#fff');
    G.C(px, py, 7, 'var(--hl)', 'var(--edge)');
    return L === R ? 'Seimbang! x = ' + x + ' adalah penyelesaian: 2(' + x + ') + 3 = 11.' : (L > R ? 'Ruas kiri lebih berat (' + L + ' > 11). Kurangi x.' : 'Ruas kiri lebih ringan (' + L + ' < 11). Tambah x.') + ' Cari nilai x agar timbangan seimbang.';
  }
});
var skala = calc({
  label: 'Skala peta', play: 0,
  ctl: [['Jarak di peta (cm)', 1, 10, 4], ['Skala 1 : (×100.000)', 1, 10, 5]],
  draw: function (v, G) {
    var d = v[0], s = v[1], km = d * s;
    G.T(180, 24, 'PETA', 12, 'var(--muted)'); G.R(20, 36, d * 30, 24, 'var(--c-mat)', 'var(--edge)', .85, 4); G.T(20 + d * 15, 53, d + ' cm', 12, '#fff');
    for (var i = 0; i < d; i++) G.L(20 + i * 30, 36, 20 + i * 30, 60, '#fff', 1, null, .6);
    G.D('M180 68 L180 112', 'var(--edge)', 'none', 2, '4 4'); G.P([[180, 120], [174, 108], [186, 108]], 'var(--edge)');
    G.T(180, 146, 'SEBENARNYA', 12, 'var(--muted)');
    G.R(20, 156, Math.min(320, km * 15), 30, 'var(--c-ips)', 'var(--edge)', .85, 4); G.T(20 + Math.min(320, km * 15) / 2, 176, km + ' km', 13, '#fff');
    return 'Skala 1 : ' + (s * 100000).toLocaleString('id-ID') + ' → ' + d + ' cm × ' + (s * 100000).toLocaleString('id-ID') + ' = ' + (d * s * 100000).toLocaleString('id-ID') + ' cm = ' + km + ' km.';
  }
});
var datar = calc({
  label: 'Luas segitiga dan persegi panjang', play: 0,
  ctl: [['Alas', 2, 12, 8], ['Tinggi', 2, 10, 6]],
  draw: function (v, G) {
    var a = v[0], t = v[1], k = 18, x0 = 24, y0 = 200 - t * k;
    G.R(x0, y0, a * k, t * k, 'var(--c-mat)', 'var(--edge)', .18);
    G.P([[x0, y0 + t * k], [x0 + a * k, y0 + t * k], [x0 + a * k / 2, y0]], 'var(--hl)', 'var(--edge)', .95);
    G.L(x0 + a * k / 2, y0, x0 + a * k / 2, y0 + t * k, 'var(--edge)', 1.5, '4 3');
    G.T(x0 + a * k / 2, 214, 'alas = ' + a, 11); G.T(x0 + a * k / 2 + 22, y0 + t * k / 2, 't = ' + t, 11);
    return 'Persegi panjang: ' + a + ' × ' + t + ' = ' + a * t + '. Segitiga (alas sama, tinggi sama): ½ × ' + a + ' × ' + t + ' = ' + fmt(a * t / 2, 1) + '. Luas segitiga selalu setengah persegi panjangnya.';
  }
});

/* ---------- Kelas 8 ---------- */
var spldv = calc({
  label: 'Dua garis berpotongan', play: 0,
  ctl: [['Nilai k pada x − y = k', -5, 9, 1]],
  draw: function (v, G) {
    var k = v[0], p = plot(G, -2, 10, -4, 10, 2);
    curve(p, function (x) { return 7 - x; }, -2, 10, 'var(--c-mat)');
    curve(p, function (x) { return x - k; }, -2, 10, 'var(--c-indo)');
    var x = (7 + k) / 2, y = (7 - k) / 2;
    p.g.C(p.X(x), p.Y(y), 7, 'var(--hl)', 'var(--edge)');
    G.T(60, 28, 'x + y = 7', 12, 'var(--c-mat)'); G.T(300, 28, 'x − y = ' + k, 12, 'var(--c-indo)');
    return 'Sistem x + y = 7 dan x − y = ' + k + ' berpotongan di (' + fmt(x, 1) + ', ' + fmt(y, 1) + '). Titik potong = penyelesaian SPLDV (x = ' + fmt(x, 1) + ', y = ' + fmt(y, 1) + ').';
  }
});
var garis = calc({
  label: 'Grafik garis lurus', play: 0,
  ctl: [['Gradien m', -3, 3, 1, 0.5], ['Konstanta c', -4, 4, 1]],
  draw: function (v, G) {
    var m = v[0], c = v[1], p = plot(G, -6, 6, -6, 6, 1);
    curve(p, function (x) { return m * x + c; }, -6, 6, 'var(--c-mat)', 4);
    p.g.C(p.X(0), p.Y(c), 6, 'var(--hl)', 'var(--edge)');
    return 'y = ' + fmt(m, 1) + 'x ' + (c < 0 ? '− ' : '+ ') + Math.abs(c) + '. Gradien ' + fmt(m, 1) + ' (' + (m > 0 ? 'naik' : m < 0 ? 'turun' : 'mendatar') + '), memotong sumbu y di (0, ' + c + ').';
  }
});
var lingkaran = calc({
  label: 'Lingkaran dan kelilingnya', play: 0,
  ctl: [['Jari-jari r', 1, 10, 5]],
  draw: function (v, G) {
    var r = v[0], cx = 120, cy = 95, k = 8, C = 2 * Math.PI * r;
    G.C(cx, cy, r * k, 'var(--c-mat)', 'var(--edge)', .25);
    G.L(cx, cy, cx + r * k, cy, 'var(--c-indo)', 3); G.C(cx, cy, 4, 'var(--edge)');
    G.T(cx + r * k / 2, cy - 8, 'r', 12, 'var(--c-indo)');
    G.L(20, 195, 20 + C * 5, 195, 'var(--c-ips)', 6); G.T(20 + C * 2.5, 214, 'keliling = ' + fmt(C, 1), 11);
    G.L(20, 187, 20, 203, 'var(--edge)', 2); G.L(20 + C * 5, 187, 20 + C * 5, 203, 'var(--edge)', 2);
    return 'K = 2πr = ' + fmt(C, 2) + ', L = πr² = ' + fmt(Math.PI * r * r, 2) + ' (π ≈ 3,14). Garis oranye adalah keliling yang "dibentangkan".';
  }
});
var ruangDatar = calc({
  label: 'Balok', play: 0,
  ctl: [['Panjang p', 2, 10, 6], ['Lebar l', 2, 8, 4], ['Tinggi t', 2, 8, 3]],
  draw: function (v, G) {
    var p = v[0], l = v[1], t = v[2], k = 15, dx = l * k * .5, dy = l * k * .45, x0 = 30, y0 = 205 - t * k;
    G.P([[x0, y0], [x0 + p * k, y0], [x0 + p * k + dx, y0 - dy], [x0 + dx, y0 - dy]], 'var(--c-ipa)', 'var(--edge)', .5);
    G.P([[x0 + p * k, y0], [x0 + p * k + dx, y0 - dy], [x0 + p * k + dx, y0 - dy + t * k], [x0 + p * k, y0 + t * k]], 'var(--c-ips)', 'var(--edge)', .55);
    G.R(x0, y0, p * k, t * k, 'var(--c-mat)', 'var(--edge)', .8);
    G.T(x0 + p * k / 2, y0 + t * k + 14, 'p = ' + p, 11); G.T(x0 - 12, y0 + t * k / 2 + 4, 't = ' + t, 11);
    G.T(x0 + p * k + dx + 12, y0 - dy / 2 + 4, 'l = ' + l, 11, 'var(--ink)', 'start');
    return 'Volume = p × l × t = ' + p * l * t + '. Luas permukaan = 2(pl + pt + lt) = ' + 2 * (p * l + p * t + l * t) + '. Jumlah rusuk = 4(p + l + t) = ' + 4 * (p + l + t) + '.';
  }
});
var peluang = custom(function (el) {
  var cnt = [0, 0, 0, 0, 0, 0], n = 0, run = false, timer = 0, last = 1;
  var svg = sv('svg', { viewBox: '0 0 360 220', class: 'simsvg', role: 'img', 'aria-label': 'Percobaan lempar dadu' });
  var info = h('p', { class: 'siminfo', 'aria-live': 'polite' });
  var b1 = h('button', { type: 'button', class: 'btn small', text: 'Lempar 1×' });
  var b2 = h('button', { type: 'button', class: 'btn small', text: 'Lempar otomatis' });
  var b3 = h('button', { type: 'button', class: 'btn ghost small', text: 'Ulangi' });
  function roll() { var r = Math.floor(Math.random() * 6); cnt[r]++; n++; last = r + 1; draw(); }
  function draw() {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    var mx = Math.max.apply(null, cnt.concat([1]));
    for (var i = 0; i < 6; i++) {
      var hh = 130 * cnt[i] / mx, x = 28 + i * 52;
      svg.appendChild(sv('rect', { x: x, y: 170 - hh, width: 38, height: hh, fill: i % 2 ? 'var(--c-ipa)' : 'var(--c-mat)', rx: 4, stroke: 'var(--edge)', 'stroke-width': 2 }));
      var t = sv('text', { x: x + 19, y: 190, 'text-anchor': 'middle', fill: 'var(--ink)', 'font-size': 12, 'font-weight': 700 }); t.textContent = String(i + 1); svg.appendChild(t);
      var c = sv('text', { x: x + 19, y: 164 - hh, 'text-anchor': 'middle', fill: 'var(--ink)', 'font-size': 11 }); c.textContent = String(cnt[i]); svg.appendChild(c);
    }
    var d = sv('text', { x: 180, y: 26, 'text-anchor': 'middle', fill: 'var(--ink)', 'font-size': 18, 'font-weight': 700 }); d.textContent = n ? 'Muncul: ' + last : 'Lempar dadu!'; svg.appendChild(d);
    var ev = cnt[1] + cnt[3] + cnt[5];
    info.textContent = n ? 'Lemparan ke-' + n + '. Mata dadu genap muncul ' + ev + ' kali: ' + (ev / n * 100).toFixed(1).replace('.', ',') + '%. Teori: 3/6 = 50%. Makin banyak lemparan, makin mendekati 50%.' : 'Peluang mata dadu genap = 3/6 = ½. Coba percobaan dan lihat hasilnya.';
  }
  b1.addEventListener('click', roll);
  b2.addEventListener('click', function () { run = !run; b2.textContent = run ? 'Berhenti' : 'Lempar otomatis'; clearInterval(timer); if (run) timer = setInterval(roll, 90); });
  b3.addEventListener('click', function () { cnt = [0, 0, 0, 0, 0, 0]; n = 0; draw(); });
  el.appendChild(h('div', { class: 'simbody' }, [svg, h('div', { class: 'simctl' }, [b1, b2, b3, info])]));
  draw();
  return function () { clearInterval(timer); };
});

/* ---------- Kelas 9 ---------- */
var notasi = calc({
  label: 'Notasi ilmiah', play: 1,
  ctl: [['Mantisa (1–9,9)', 1, 9.9, 4.5, 0.1], ['Pangkat 10', -4, 6, 4]],
  draw: function (v, G) {
    var m = v[0], e = v[1], val = m * Math.pow(10, e);
    G.T(180, 70, fmt(m, 1) + ' × 10' + sup(e), 34, 'var(--c-mat)');
    G.L(80, 92, 280, 92, 'var(--edge)', 1.5, '4 4');
    G.T(180, 140, val.toLocaleString('id-ID', { maximumFractionDigits: 8 }), 28, 'var(--c-ipa)');
    var dir = e >= 0 ? 'kanan' : 'kiri';
    for (var i = 0; i < Math.min(Math.abs(e), 6); i++) G.P(e >= 0 ? [[150 + i * 14, 168], [150 + i * 14, 184], [162 + i * 14, 176]] : [[210 - i * 14, 168], [210 - i * 14, 184], [198 - i * 14, 176]], 'var(--c-indo)');
    return 'Koma bergeser ' + Math.abs(e) + ' angka ke ' + dir + ': ' + fmt(m, 1) + ' × 10' + sup(e) + ' = ' + val.toLocaleString('id-ID', { maximumFractionDigits: 8 }) + '.';
  }
});
var akar = calc({
  label: 'Persegi dan akar kuadrat', play: 0,
  ctl: [['Luas persegi (n)', 1, 100, 50]],
  draw: function (v, G) {
    var n = v[0], s = Math.sqrt(n), k = 17, kk = 1, m = n;
    for (var f = Math.floor(s); f >= 2; f--) if (n % (f * f) === 0) { kk = f; m = n / (f * f); break; }
    G.R(30, 205 - s * k, s * k, s * k, 'var(--c-mat)', 'var(--edge)', .5);
    G.T(30 + s * k / 2, 205 - s * k / 2 + 5, 'luas = ' + n, 14);
    G.T(30 + s * k / 2, 222, 'sisi = √' + n + ' = ' + fmt(s, 2), 12);
    var txt = Number.isInteger(s) ? '√' + n + ' = ' + s + ' (bilangan kuadrat sempurna).' : (kk > 1 ? '√' + n + ' = √(' + kk * kk + ' × ' + m + ') = ' + kk + '√' + m + '.' : '√' + n + ' tidak bisa disederhanakan lagi.');
    return 'Sisi persegi berluas ' + n + ' adalah akar kuadrat dari ' + n + '. ' + txt;
  }
});
var kuadrat = calc({
  label: 'Akar-akar persamaan kuadrat', play: 0,
  ctl: [['Akar p', -6, 6, 2], ['Akar q', -6, 6, 3]],
  draw: function (v, G) {
    var p = v[0], q = v[1], pl = plot(G, -8, 8, -12, 24, 4);
    curve(pl, function (x) { return (x - p) * (x - q); }, -8, 8, 'var(--c-mat)', 4);
    pl.g.C(pl.X(p), pl.Y(0), 7, 'var(--hl)', 'var(--edge)'); pl.g.C(pl.X(q), pl.Y(0), 7, 'var(--hl)', 'var(--edge)');
    var b = -(p + q), c = p * q;
    return 'x² ' + (b < 0 ? '− ' : '+ ') + Math.abs(b) + 'x ' + (c < 0 ? '− ' : '+ ') + Math.abs(c) + ' = 0 punya akar x = ' + p + ' dan x = ' + q + '. Jumlah akar = ' + (p + q) + ', hasil kali = ' + c + '.';
  }
});
var fungsiKuadrat = calc({
  label: 'Grafik fungsi kuadrat', play: 0,
  ctl: [['a', -3, 3, 1, 0.5], ['b', -6, 6, -2], ['c', -6, 6, -3]],
  draw: function (v, G) {
    var a = v[0] === 0 ? 0.5 : v[0], b = v[1], c = v[2], p = plot(G, -8, 8, -12, 12, 2);
    curve(p, function (x) { return a * x * x + b * x + c; }, -8, 8, 'var(--c-mat)', 4);
    var xp = -b / (2 * a), yp = c - b * b / (4 * a), D = b * b - 4 * a * c;
    p.g.C(p.X(xp), p.Y(yp), 7, 'var(--hl)', 'var(--edge)');
    return 'y = ' + fmt(a, 1) + 'x² ' + (b < 0 ? '− ' : '+ ') + Math.abs(b) + 'x ' + (c < 0 ? '− ' : '+ ') + Math.abs(c) + ' → parabola membuka ke ' + (a > 0 ? 'atas' : 'bawah') + ', titik puncak (' + fmt(xp, 2) + ', ' + fmt(yp, 2) + '), D = ' + fmt(D, 2) + (D > 0 ? ' (2 titik potong sumbu x)' : D === 0 ? ' (menyinggung sumbu x)' : ' (tidak memotong sumbu x)') + '.';
  }
});
var JENIS = ['Translasi (+4, +2)', 'Refleksi terhadap sumbu x', 'Rotasi 90° berlawanan jarum jam', 'Dilatasi faktor 2'];
var transformasi = calc({
  label: 'Transformasi geometri segitiga', play: 1,
  ctl: [['Jenis (1–4)', 1, 4, 1], ['Progres (%)', 0, 100, 100, 5]],
  draw: function (v, G) {
    var j = v[0], t = v[1] / 100, pl = plot(G, -7, 7, -5, 5, 1);
    var tri = [[1, 1], [3, 1], [1, 3]];
    function tr(pt) {
      var x = pt[0], y = pt[1];
      if (j === 1) return [x + 4 * t, y + 2 * t];
      if (j === 2) return [x, y * (1 - 2 * t)];
      if (j === 3) { var a = t * Math.PI / 2; return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)]; }
      return [x * (1 + t), y * (1 + t)];
    }
    var q = function (pt) { return [pl.X(pt[0]), pl.Y(pt[1])]; };
    pl.g.P(tri.map(q), 'var(--c-mat)', 'var(--edge)', .3);
    pl.g.P(tri.map(tr).map(q), 'var(--c-indo)', 'var(--edge)', .8);
    return JENIS[j - 1] + '. Segitiga biru = bayangan awal, merah = hasil. Titik A(1,1) menjadi ' + '(' + fmt(tri.map(tr)[0][0], 1) + ', ' + fmt(tri.map(tr)[0][1], 1) + ') pada progres ' + Math.round(v[1]) + '%.';
  }
});
var lengkung = calc({
  label: 'Tabung dan kerucut', play: 0,
  ctl: [['Jari-jari r', 1, 8, 4], ['Tinggi t', 1, 12, 6]],
  draw: function (v, G) {
    var r = v[0], t = v[1], k = 8, ry = r * k * .3, base = 200;
    function cyl(cx, cone) {
      var w = r * k, top = base - t * k;
      G.E(cx, base, w, ry, 'var(--c-mat)', 'var(--edge)', .6);
      if (!cone) { G.R(cx - w, top, 2 * w, t * k, 'var(--c-mat)', 'none', .6); G.L(cx - w, top, cx - w, base, 'var(--edge)', 2); G.L(cx + w, top, cx + w, base, 'var(--edge)', 2); G.E(cx, top, w, ry, 'var(--c-ipa)', 'var(--edge)', .8); }
      else { G.P([[cx - w, base], [cx, top], [cx + w, base]], 'var(--c-indo)', 'var(--edge)', .6); G.E(cx, base, w, ry, 'var(--c-indo)', 'var(--edge)', .5); }
    }
    cyl(95, false); cyl(260, true);
    G.T(95, 218, 'tabung', 11); G.T(260, 218, 'kerucut', 11);
    var vt = Math.PI * r * r * t;
    return 'Tabung: V = πr²t = ' + fmt(vt, 1) + '. Kerucut (r, t sama): V = ⅓πr²t = ' + fmt(vt / 3, 1) + '. Volume tabung = 3 × volume kerucut. Bola berjari-jari ' + r + ': V = ' + fmt(4 / 3 * Math.PI * r * r * r, 1) + '.';
  }
});

export var MAT = {
  7: [bilBulat, pecahan, aljabar, plsv, skala, datar],
  8: [custom(pyth()), spldv, garis, lingkaran, ruangDatar, peluang],
  9: [notasi, akar, kuadrat, fungsiKuadrat, transformasi, lengkung]
};
