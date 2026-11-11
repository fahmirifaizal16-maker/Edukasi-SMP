import { calc, steps, sort, build, fmt, custom } from './engine.js';
import { simIpa } from './sim.js';

/* ---------- Kelas 7 ---------- */
var ukur = calc({
  label: 'Mistar dan satuan panjang', play: 0,
  ctl: [['Panjang benda (cm)', 0, 20, 7.5, 0.5]],
  draw: function (v, G) {
    var L = v[0], x0 = 20, k = 16;
    G.R(x0, 120, 20 * k, 40, 'var(--hl)', 'var(--edge)', .9, 4);
    for (var i = 0; i <= 80; i++) { var x = x0 + i * k / 4, big = i % 4 === 0; G.L(x, 120, x, 120 + (big ? 22 : (i % 2 === 0 ? 15 : 9)), 'var(--edge)', big ? 2 : 1); if (big && i % 8 === 0) G.T(x, 154, String(i / 4), 11, '#13213A'); }
    G.R(x0, 70, L * k, 36, 'var(--c-ipa)', 'var(--edge)', .85, 4); G.T(x0 + L * k / 2, 93, 'benda', 13, '#fff');
    G.L(x0 + L * k, 60, x0 + L * k, 125, 'var(--c-indo)', 2, '4 3');
    return 'Panjang = ' + fmt(L, 1) + ' cm = ' + fmt(L * 10, 0) + ' mm = ' + fmt(L / 100, 3) + ' m. Skala terkecil mistar 1 mm (0,1 cm), jadi ketelitiannya 0,5 mm.';
  }
});
var klasifikasi = sort({
  ask: 'Hewan ini termasuk kelompok apa?', cats: ['Mamalia', 'Aves', 'Reptil', 'Pisces'],
  items: [['Paus', 0], ['Elang', 2 - 1], ['Komodo', 2], ['Ikan lele', 3], ['Kelelawar', 0], ['Penguin', 1], ['Buaya', 2], ['Hiu', 3], ['Lumba-lumba', 0], ['Kakatua', 1], ['Kadal', 2], ['Ikan nila', 3]]
});
var suhu = calc({
  label: 'Termometer', play: 0,
  ctl: [['Suhu (°C)', -20, 120, 25]],
  draw: function (v, G) {
    var c = v[0], y = function (t) { return 200 - (t + 20) / 140 * 170; };
    G.R(60, 20, 22, 170, 'var(--bg)', 'var(--edge)', 1, 11); G.C(71, 196, 17, 'var(--c-indo)', 'var(--edge)');
    G.R(65, y(c), 12, 200 - y(c), 'var(--c-indo)');
    [0, 100].forEach(function (t) { G.L(52, y(t), 92, y(t), 'var(--edge)', 1.5, '3 3'); G.T(104, y(t) + 4, t + ' °C', 11, 'var(--ink)', 'start'); });
    G.T(215, 70, c + ' °C', 22, 'var(--c-indo)'); G.T(215, 110, fmt(c + 273, 0) + ' K', 22, 'var(--c-mat)'); G.T(215, 150, fmt(c * 9 / 5 + 32, 1) + ' °F', 22, 'var(--c-ips)');
    var st = c < 0 ? 'es (padat)' : c < 100 ? 'air (cair)' : c === 100 ? 'mendidih' : 'uap air (gas)';
    G.T(215, 190, 'Air: ' + st, 13);
    return 'K = °C + 273 dan °F = (9/5 × °C) + 32. Pada ' + c + ' °C = ' + (c + 273) + ' K = ' + fmt(c * 9 / 5 + 32, 1) + ' °F. Kalor untuk menaikkan suhu: Q = m × c × ΔT.';
  }
});
function tri(t) { var a = t % 2; return a < 1 ? a : 2 - a; }
var wujud = calc({
  label: 'Partikel zat berdasarkan suhu', live: true,
  ctl: [['Suhu (°C)', -20, 140, -10, 5]],
  draw: function (v, G, t) {
    var T = v[0], st = T < 0 ? 0 : T <= 100 ? 1 : 2, x0 = 70, y0 = 30, W = 220, H = 150;
    G.R(x0, y0, W, H, 'var(--bg)', 'var(--edge)');
    var col = ['var(--c-mat)', 'var(--c-ipa)', 'var(--c-indo)'][st];
    for (var i = 0; i < 20; i++) {
      var cx = i % 5, cy = Math.floor(i / 5), bx = x0 + 28 + cx * 40, by = y0 + 24 + cy * 34, px, py;
      if (st === 0) { px = bx + 2 * Math.sin(t * 14 + i); py = by + 2 * Math.cos(t * 13 + i * 2); }
      else if (st === 1) { px = bx + 12 * Math.sin(t * 2.2 + i * 1.7); py = by + 10 * Math.cos(t * 1.9 + i * 2.3); }
      else { var sp = 0.5 + (T - 100) / 80; px = x0 + 8 + (W - 16) * tri(t * sp * (0.6 + (i % 7) * .13) + i * .37); py = y0 + 8 + (H - 16) * tri(t * sp * (0.5 + (i % 5) * .17) + i * .61); }
      G.C(px, py, 7, col, 'var(--edge)', .9);
    }
    G.T(180, 205, ['Padat: partikel rapat dan hanya bergetar', 'Cair: partikel bergeser, jarak agak renggang', 'Gas: partikel bebas, jauh, bergerak cepat'][st], 12);
    return T + ' °C → wujud ' + ['padat (es)', 'cair (air)', 'gas (uap)'][st] + '. Es melebur di 0 °C dan air mendidih di 100 °C (tekanan 1 atm). Naikkan suhu untuk melihat partikel bergerak makin cepat.';
  }
});
var rantai = steps({
  steps: [
    ['Matahari', 'Sumber energi utama bagi hampir semua ekosistem.'],
    ['Produsen: padi', 'Tumbuhan hijau membuat makanan sendiri lewat fotosintesis.'],
    ['Konsumen I: belalang', 'Herbivora memakan produsen.'],
    ['Konsumen II: katak', 'Karnivora kecil memakan konsumen I.'],
    ['Konsumen III: ular', 'Memakan konsumen II. Energi yang tersisa makin sedikit (sekitar 10% tiap tingkat).'],
    ['Pengurai: jamur dan bakteri', 'Menguraikan sisa makhluk hidup menjadi zat hara bagi tanah dan produsen.']
  ]
});
var tataSurya = (function () {
  var P = [['Merkurius', .24, '#9aa3ad'], ['Venus', .62, '#e0b46a'], ['Bumi', 1, '#2F5BEA'], ['Mars', 1.88, '#d9534f'], ['Yupiter', 11.86, '#c9a27a'], ['Saturnus', 29.5, '#e3cf8d'], ['Uranus', 84, '#7fd3d8'], ['Neptunus', 165, '#4a6bd6']];
  return calc({
    label: 'Orbit planet mengelilingi Matahari', live: true,
    ctl: [['Kecepatan waktu', 1, 10, 4]],
    draw: function (v, G, t) {
      var cx = 180, cy = 112;
      G.C(cx, cy, 9, '#f6b400', 'var(--edge)');
      P.forEach(function (p, i) {
        var r = 20 + i * 11.6, a = t * v[0] * 2 * Math.PI / (8 * p[1]) + i;
        G.C(cx, cy, r, 'none', 'var(--edge)', .2);
        G.C(cx + r * Math.cos(a), cy + r * Math.sin(a), i === 2 ? 5 : 3.6 + (i > 3 ? 1.4 : 0), p[2], 'var(--edge)');
      });
      G.T(cx + 20 + 2 * 11.6 + 4, cy - 8, 'Bumi', 10, 'var(--c-mat)', 'start');
      return 'Urutan dari Matahari: Merkurius, Venus, Bumi, Mars, Yupiter, Saturnus, Uranus, Neptunus. Makin jauh dari Matahari, makin lama periode revolusinya (Bumi 1 tahun, Mars 1,88 tahun, Neptunus ±165 tahun).';
    }
  });
})();

/* ---------- Kelas 8 ---------- */
var cerna = steps({
  steps: [
    ['Mulut', 'Pencernaan mekanik oleh gigi dan kimiawi oleh enzim ptialin (amilase) dalam air liur yang memecah amilum.'],
    ['Kerongkongan', 'Makanan didorong gerak peristaltik menuju lambung.'],
    ['Lambung', 'Asam lambung (HCl) dan enzim pepsin mencerna protein menjadi bubur makanan (kimus).'],
    ['Usus halus', 'Pencernaan tuntas dan penyerapan sari makanan ke dalam darah. Ada empedu dan enzim pankreas.'],
    ['Usus besar', 'Menyerap air dan membentuk feses.'],
    ['Anus', 'Feses dikeluarkan dari tubuh (defekasi).']
  ]
});
var darah = steps({
  steps: [
    ['Serambi kanan', 'Menerima darah kaya CO₂ dari seluruh tubuh lewat vena cava.'],
    ['Bilik kanan', 'Memompa darah ke paru-paru lewat arteri pulmonalis.'],
    ['Paru-paru', 'CO₂ dilepas dan darah mengikat O₂ (darah menjadi kaya O₂).'],
    ['Serambi kiri', 'Menerima darah kaya O₂ dari paru-paru lewat vena pulmonalis.'],
    ['Bilik kiri', 'Dindingnya paling tebal, memompa darah ke seluruh tubuh lewat aorta.'],
    ['Seluruh tubuh', 'O₂ dan sari makanan dibagikan ke sel. Darah kembali ke serambi kanan.']
  ]
});
var tekanan = calc({
  label: 'Tekanan pada benda', play: 0,
  ctl: [['Gaya F (N)', 10, 200, 100, 10], ['Luas bidang A (cm²)', 1, 20, 10]],
  draw: function (v, G) {
    var F = v[0], A = v[1], P = F / A, w = 10 + A * 10, dep = Math.min(50, P * 2.2);
    G.R(20, 130, 320, 60, 'var(--c-ips)', 'var(--edge)', .35);
    G.P([[180 - w / 2, 130], [180 + w / 2, 130], [180 + w / 2 * .3, 130 + dep], [180 - w / 2 * .3, 130 + dep]], 'var(--bg)', 'var(--edge)', 1);
    G.R(180 - w / 2, 80, w, 50, 'var(--c-mat)', 'var(--edge)', .85, 4);
    G.L(180, 20, 180, 76, 'var(--c-indo)', 4); G.P([[180, 80], [172, 66], [188, 66]], 'var(--c-indo)');
    G.T(180, 14, 'F = ' + F + ' N', 12, 'var(--c-indo)'); G.T(180, 110, 'A = ' + A + ' cm²', 12, '#fff');
    return 'P = F / A = ' + F + ' / ' + A + ' = ' + fmt(P, 1) + ' N/cm² (= ' + fmt(P * 10000, 0) + ' Pa). Luas kecil → tekanan besar (paku, pisau). Luas besar → tekanan kecil (sepatu salju).';
  }
});
var cahaya = calc({
  label: 'Pemantulan cahaya', live: true,
  ctl: [['Sudut datang (°)', 0, 80, 35, 5]],
  draw: function (v, G, t) {
    var a = v[0] * Math.PI / 180, L = 120, cx = 180, cy = 150;
    G.R(40, cy, 280, 14, 'var(--c-mat)', 'var(--edge)', .5);
    G.L(cx, cy - 140, cx, cy, 'var(--edge)', 1.5, '5 4');
    var ix = cx - L * Math.sin(a), iy = cy - L * Math.cos(a), rx = cx + L * Math.sin(a);
    var off = -(t * 40) % 20;
    G.L(ix, iy, cx, cy, 'var(--hl)', 4); G.L(cx, cy, rx, iy, 'var(--hl)', 4);
    var d1 = G.L(ix, iy, cx, cy, 'var(--c-indo)', 2, '6 14'); d1.setAttribute('stroke-dashoffset', off);
    var d2 = G.L(cx, cy, rx, iy, 'var(--c-indo)', 2, '6 14'); d2.setAttribute('stroke-dashoffset', off);
    G.T(cx - 36, cy - 40, 'i = ' + v[0] + '°', 12, 'var(--c-ips)'); G.T(cx + 36, cy - 40, 'r = ' + v[0] + '°', 12, 'var(--c-ipa)');
    G.T(cx + 8, 16, 'garis normal', 10, 'var(--muted)', 'start');
    return 'Hukum pemantulan: sudut datang (i) = sudut pantul (r) = ' + v[0] + '°. Sinar datang, sinar pantul, dan garis normal terletak pada satu bidang.';
  }
});
var tuas = calc({
  label: 'Tuas (pengungkit)', play: 3,
  ctl: [['Beban w (N)', 10, 100, 60, 10], ['Lengan beban lb (cm)', 10, 50, 20, 5], ['Lengan kuasa lk (cm)', 20, 100, 60, 5], ['Gaya kuasa F (N)', 5, 100, 30, 5]],
  draw: function (v, G) {
    var w = v[0], lb = v[1], lk = v[2], F = v[3], k = 2, px = 30 + lb * k, py = 150;
    var tq = F * lk - w * lb, th = Math.max(-.22, Math.min(.22, tq / 4000));
    var lx = px - lb * k * Math.cos(th), ly = py - lb * k * Math.sin(th), rx = px + lk * k * Math.cos(th), ry = py + lk * k * Math.sin(th);
    G.P([[px, py], [px - 18, 196], [px + 18, 196]], 'var(--edge)', 'none', .6);
    G.L(lx, ly, rx, ry, 'var(--edge)', 7);
    G.R(lx - 20, ly - 36, 40, 34, 'var(--c-ips)', 'var(--edge)', .9, 5); G.T(lx, ly - 14, w + ' N', 12, '#fff');
    G.L(rx, ry - 40, rx, ry - 2, 'var(--c-indo)', 4); G.P([[rx, ry], [rx - 7, ry - 14], [rx + 7, ry - 14]], 'var(--c-indo)');
    G.T(rx, ry - 46, 'F = ' + F + ' N', 12, 'var(--c-indo)'); G.C(px, py, 6, 'var(--hl)', 'var(--edge)');
    var need = w * lb / lk;
    return 'Keseimbangan: w × lb = F × lk. Gaya minimum F = ' + fmt(need, 1) + ' N. Keuntungan mekanis KM = lk / lb = ' + fmt(lk / lb, 2) + '. ' + (tq > 0 ? 'Beban terangkat!' : tq === 0 ? 'Seimbang.' : 'Gaya kuasa belum cukup mengangkat beban.');
  }
});

/* ---------- Kelas 9 ---------- */
var reprodManusia = steps({
  steps: [
    ['Ovulasi', 'Sel telur matang dilepas dari ovarium dan masuk ke tuba falopi.'],
    ['Fertilisasi', 'Sperma membuahi sel telur di tuba falopi sehingga terbentuk zigot.'],
    ['Pembelahan zigot', 'Zigot membelah berulang kali menjadi morula lalu blastula sambil bergerak ke rahim.'],
    ['Implantasi', 'Blastula menempel pada dinding rahim (endometrium).'],
    ['Embrio dan janin', 'Plasenta menyalurkan makanan dan oksigen; tali pusat menghubungkan ke janin.'],
    ['Kelahiran', 'Setelah sekitar 9 bulan, bayi lahir melalui persalinan.']
  ]
});
var reprodTumbuhan = steps({
  steps: [
    ['Penyerbukan', 'Serbuk sari dari kepala sari jatuh ke kepala putik (dibantu angin, serangga, atau air).'],
    ['Tabung serbuk sari', 'Serbuk sari tumbuh membentuk tabung menuju bakal biji di dasar putik.'],
    ['Pembuahan', 'Inti sperma bertemu sel telur sehingga terbentuk zigot.'],
    ['Biji dan buah', 'Bakal biji menjadi biji dan bakal buah menjadi buah.'],
    ['Perkecambahan', 'Biji tumbuh menjadi tumbuhan baru (kecambah). Hewan bisa bereproduksi dengan bertelur (ovipar) atau melahirkan (vivipar).']
  ]
});
var G3 = ['TT', 'Tt', 'tt'];
var genetika = calc({
  label: 'Persilangan Punnett', play: 0,
  ctl: [['Induk 1 (1=TT, 2=Tt, 3=tt)', 1, 3, 2], ['Induk 2 (1=TT, 2=Tt, 3=tt)', 1, 3, 2]],
  draw: function (v, G) {
    var a = G3[v[0] - 1], b = G3[v[1] - 1], x0 = 120, y0 = 66, s = 62, cnt = { TT: 0, Tt: 0, tt: 0 }, i, j;
    G.T(60, 30, 'Induk 1: ' + a, 13, 'var(--c-mat)'); G.T(60, 50, 'Induk 2: ' + b, 13, 'var(--c-indo)');
    for (i = 0; i < 2; i++) { G.T(x0 + s / 2 + i * s, y0 - 8, a[i], 16, 'var(--c-mat)'); G.T(x0 - 14, y0 + s / 2 + 6 + i * s, b[i], 16, 'var(--c-indo)'); }
    for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) {
      var g = [a[i], b[j]].sort().join(''); g = g === 'Tt' || g === 'tT' ? 'Tt' : g; if (g === 'tT') g = 'Tt'; cnt[g]++;
      G.R(x0 + i * s, y0 + j * s, s, s, g === 'tt' ? 'var(--c-ips)' : 'var(--c-ipa)', 'var(--edge)', .8, 4); G.T(x0 + i * s + s / 2, y0 + j * s + s / 2 + 6, g, 18, '#fff');
    }
    var tall = cnt.TT + cnt.Tt;
    G.T(180, 214, 'Fenotipe tinggi : pendek = ' + tall + ' : ' + cnt.tt, 12);
    return 'T = tinggi (dominan), t = pendek (resesif). Genotipe: TT ' + cnt.TT + ', Tt ' + cnt.Tt + ', tt ' + cnt.tt + ' (dari 4 kotak). Persilangan Tt × Tt menghasilkan rasio fenotipe 3 : 1.';
  }
});
var listrik = (function () {
  function onRect(u) { // titik pada persegi panjang
    var x0 = 50, y0 = 40, w = 260, hh = 130, per = 2 * (w + hh), d = ((u % 1) + 1) % 1 * per;
    if (d < w) return [x0 + d, y0]; d -= w;
    if (d < hh) return [x0 + w, y0 + d]; d -= hh;
    if (d < w) return [x0 + w - d, y0 + hh]; d -= w;
    return [x0, y0 + hh - d];
  }
  return calc({
    label: 'Rangkaian listrik sederhana (Hukum Ohm)', live: true,
    ctl: [['Tegangan V (volt)', 1, 24, 6], ['Hambatan R (ohm)', 1, 20, 3]],
    draw: function (v, G, t) {
      var V = v[0], R = v[1], I = V / R;
      G.R(50, 40, 260, 130, 'none', 'var(--edge)', 1, 6);
      G.R(20, 90, 60, 30, 'var(--bg)', 'none'); G.L(40, 82, 40, 128, 'var(--edge)', 4); G.L(54, 94, 54, 116, 'var(--edge)', 8); G.T(24, 78, V + ' V', 12, 'var(--c-indo)', 'start');
      var zz = 'M130 40'; for (var i = 0; i < 6; i++) zz += ' L' + (140 + i * 20) + ' ' + (i % 2 ? 48 : 32);
      G.R(125, 28, 130, 24, 'var(--bg)', 'none'); G.D(zz + ' L260 40', 'var(--c-ips)', 'none', 3); G.T(195, 22, 'R = ' + R + ' Ω', 12, 'var(--c-ips)');
      var br = Math.min(1, I / 6);
      G.C(310, 105, 22, '#f6b400', 'var(--edge)', .25 + .75 * br); G.T(310, 109, 'lampu', 10);
      for (var k = 0; k < 14; k++) { var p = onRect(k / 14 + t * I * .07); G.C(p[0], p[1], 3.6, 'var(--c-mat)', 'var(--bg)'); }
      return 'I = V / R = ' + V + ' / ' + R + ' = ' + fmt(I, 2) + ' A, daya P = V × I = ' + fmt(V * I, 1) + ' W. Tegangan naik → arus makin besar (titik makin cepat). Hambatan naik → arus makin kecil.';
    }
  });
})();
var magnet = calc({
  label: 'Elektromagnet', play: 1,
  ctl: [['Jumlah lilitan', 1, 12, 5], ['Kuat arus (A)', 1, 10, 4]],
  draw: function (v, G) {
    var N = v[0], I = v[1], S = N * I, clips = Math.floor(S / 8);
    G.R(70, 88, 220, 18, '#8a94a3', 'var(--edge)', 1, 4);
    for (var i = 0; i < N; i++) G.E(100 + i * (160 / Math.max(N, 1)), 97, 7, 22, 'none', 'var(--c-ips)');
    G.L(70, 97, 40, 97, 'var(--edge)', 2); G.L(40, 97, 40, 165, 'var(--edge)', 2); G.L(40, 165, 130, 165, 'var(--edge)', 2);
    G.R(130, 155, 20, 20, 'var(--hl)', 'var(--edge)'); G.T(140, 192, I + ' A', 11);
    for (var c = 0; c < Math.min(clips, 7); c++) G.R(280 - (c % 2) * 6, 110 + c * 11, 24, 8, 'none', 'var(--c-mat)');
    G.R(40, 28, 220, 14, 'var(--bg)', 'var(--edge)'); G.R(40, 28, Math.min(220, S * 4.6), 14, 'var(--c-ipa)', 'none', .85);
    G.T(40, 22, 'kekuatan medan', 11, 'var(--muted)', 'start');
    return 'Kekuatan elektromagnet ≈ lilitan × arus = ' + N + ' × ' + I + ' = ' + S + '. Klip terangkat: ' + Math.min(clips, 7) + '. Perkuat dengan menambah lilitan, menambah arus, atau memakai inti besi.';
  }
});
var gerhana = calc({
  label: 'Posisi Matahari, Bumi, dan Bulan', play: 0,
  ctl: [['Posisi Bulan (derajat)', 0, 360, 0, 5]],
  draw: function (v, G) {
    var th = v[0] * Math.PI / 180, ex = 250, ey = 110, R = 64;
    G.C(46, 110, 28, '#f6b400', 'var(--edge)');
    G.P([[74, 90], [ex, ey - 12], [ex, ey + 12], [74, 130]], '#f6b400', 'none', .12);
    G.P([[ex, ey - 12], [340, ey - 20], [340, ey + 20], [ex, ey + 12]], 'var(--edge)', 'none', .3);
    G.C(ex, ey, R, 'none', 'var(--edge)', .25);
    G.C(ex, ey, 13, 'var(--c-mat)', 'var(--edge)');
    var mx = ex - R * Math.cos(th), my = ey + R * Math.sin(th);
    G.C(mx, my, 7, '#d6dbe3', 'var(--edge)');
    var dn = Math.min(v[0], 360 - v[0]), df = Math.abs(v[0] - 180);
    var ph = dn <= 20 ? 'Bulan baru' : df <= 20 ? 'Bulan purnama' : (v[0] < 180 ? 'Bulan sabit/kuartal awal' : 'Bulan sabit/kuartal akhir');
    G.T(46, 156, 'Matahari', 11); G.T(ex, ey + 98, 'Bumi', 11);
    var ecl = dn <= 8 ? 'Bulan sejajar di antara Matahari dan Bumi: GERHANA MATAHARI.' : df <= 8 ? 'Bumi di antara Matahari dan Bulan: GERHANA BULAN.' : 'Belum ada gerhana.';
    return ph + '. ' + ecl + ' Gerhana tidak terjadi tiap bulan karena bidang edar Bulan miring ±5° terhadap bidang edar Bumi.';
  }
});

export var IPA = {
  7: [ukur, klasifikasi, suhu, wujud, rantai, tataSurya],
  8: [cerna, darah, custom(simIpa), tekanan, cahaya, tuas],
  9: [reprodManusia, reprodTumbuhan, genetika, listrik, magnet, gerhana]
};
