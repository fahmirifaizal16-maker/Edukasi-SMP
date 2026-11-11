import { adminEmails } from './firebase-config.js';
import { NEWQ, MATERI } from './content.js';
import { simFor } from './sims.js';

(function () {
  var TIME = 20, TOTAL = 20, LIVES = 5;
  var $ = function (id) { return document.getElementById(id); };
  var Q = function (q, a, w, e) { return { q: q, a: a, w: w, e: e }; };

  var SUBJECTS = [
    { id: 'mat', abbr: 'MTK', name: 'Matematika', topics: 'Bilangan bulat, pecahan, aljabar, perbandingan, bangun datar', bank: [
      Q('Hasil dari −8 + 15 adalah ...', '7', ['−7', '23', '−23'], 'Bilangan berbeda tanda dijumlahkan dengan mengurangkan: 15 − 8 = 7. Tandanya mengikuti bilangan yang nilainya lebih besar, yaitu positif.'),
      Q('(−6) × (−4) = ...', '24', ['−24', '10', '−10'], 'Negatif dikali negatif hasilnya positif. 6 × 4 = 24.'),
      Q('3/4 + 1/8 = ...', '7/8', ['4/12', '5/8', '4/8'], 'Samakan penyebutnya dulu. 3/4 = 6/8, jadi 6/8 + 1/8 = 7/8.'),
      Q('Nilai x pada persamaan 2x + 5 = 17 adalah ...', '6', ['11', '5', '12'], 'Kurangi kedua ruas dengan 5: 2x = 12. Bagi dengan 2: x = 6.'),
      Q('Umur Adi dan Budi berbanding 3 : 5. Jumlah umur mereka 40 tahun. Umur Budi adalah ...', '25 tahun', ['15 tahun', '24 tahun', '30 tahun'], 'Jumlah bagian 3 + 5 = 8. Satu bagian = 40 : 8 = 5. Umur Budi = 5 × 5 = 25 tahun.'),
      Q('Keliling persegi panjang berukuran 12 cm × 7 cm adalah ...', '38 cm', ['84 cm', '19 cm', '26 cm'], 'K = 2 × (p + l) = 2 × (12 + 7) = 38 cm. Angka 84 adalah luasnya.'),
      Q('Segitiga beralas 10 cm dan tinggi 6 cm memiliki luas ...', '30 cm²', ['60 cm²', '16 cm²', '36 cm²'], 'L = ½ × alas × tinggi = ½ × 10 × 6 = 30 cm².'),
      Q('Jika A = {1, 2, 3, 4} dan B = {3, 4, 5}, maka A ∩ B = ...', '{3, 4}', ['{1, 2, 3, 4, 5}', '{1, 2}', '{5}'], 'Irisan (∩) berisi anggota yang ada di kedua himpunan, yaitu 3 dan 4.'),
      Q('Nilai ulangan Dina: 70, 80, 90, 60, 100. Rata-ratanya adalah ...', '80', ['75', '85', '90'], 'Jumlah nilai = 400. Dibagi banyak data (5) hasilnya 80.'),
      Q('Dua sudut saling berpelurus. Jika satu sudut 65°, sudut yang lain adalah ...', '115°', ['25°', '295°', '125°'], 'Sudut berpelurus berjumlah 180°. 180° − 65° = 115°. Kalau berjumlah 90° namanya berpenyiku.'),
      Q('Tas seharga Rp150.000 mendapat diskon 20%. Harga yang dibayar adalah ...', 'Rp120.000', ['Rp130.000', 'Rp30.000', 'Rp170.000'], 'Diskon = 20% × 150.000 = 30.000. Harga bayar = 150.000 − 30.000 = 120.000.'),
      Q('Bentuk paling sederhana dari 3a + 2b − a + 5b adalah ...', '2a + 7b', ['4a + 7b', '2a + 3b', '2a + 10b'], 'Gabungkan suku sejenis. 3a − a = 2a, dan 2b + 5b = 7b.'),
      Q('Hasil dari 4 + 6 × 3 adalah ...', '22', ['30', '18', '13'], 'Perkalian dikerjakan lebih dulu: 6 × 3 = 18. Lalu 4 + 18 = 22.'),
      Q('Pada peta berskala 1 : 500.000, jarak dua kota 4 cm. Jarak sebenarnya adalah ...', '20 km', ['2 km', '200 km', '125 km'], '4 × 500.000 = 2.000.000 cm. Karena 100.000 cm = 1 km, jaraknya 20 km.'),
      Q('Suhu di puncak gunung −3 °C, lalu turun 5 °C. Suhu sekarang adalah ...', '−8 °C', ['2 °C', '−2 °C', '8 °C'], 'Turun berarti dikurangi: −3 − 5 = −8 °C.')
    ] },
    { id: 'ipa', abbr: 'IPA', name: 'IPA', topics: 'Pengukuran, klasifikasi, zat dan kalor, ekosistem, tata surya', bank: [
      Q('Satuan baku (SI) untuk massa adalah ...', 'kilogram', ['gram', 'newton', 'liter'], 'Satuan dasar SI untuk massa adalah kilogram (kg). Gram hanyalah satuan turunannya.'),
      Q('Pada tekanan normal, air mendidih pada suhu ...', '100 °C', ['0 °C', '50 °C', '212 °C'], 'Titik didih air 100 °C. Angka 212 adalah nilainya dalam Fahrenheit, dan 0 °C adalah titik beku.'),
      Q('Gas yang diserap tumbuhan hijau untuk fotosintesis adalah ...', 'karbon dioksida', ['oksigen', 'nitrogen', 'hidrogen'], 'Tumbuhan menyerap karbon dioksida (CO₂) dan air, lalu menghasilkan glukosa dan oksigen.'),
      Q('Dalam rantai makanan, rumput berperan sebagai ...', 'produsen', ['konsumen I', 'pengurai', 'konsumen II'], 'Rumput membuat makanan sendiri lewat fotosintesis, jadi ia produsen.'),
      Q('Planet yang paling dekat dengan Matahari adalah ...', 'Merkurius', ['Venus', 'Mars', 'Bumi'], 'Urutan dari Matahari: Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus.'),
      Q('Perubahan wujud dari padat langsung menjadi gas disebut ...', 'menyublim', ['mencair', 'menguap', 'mengembun'], 'Menyublim terjadi tanpa melewati wujud cair, contohnya kapur barus yang mengecil di lemari.'),
      Q('Perpindahan kalor tanpa zat perantara disebut ...', 'radiasi', ['konduksi', 'konveksi', 'evaporasi'], 'Panas Matahari sampai ke Bumi melewati ruang hampa udara, jadi perpindahannya radiasi.'),
      Q('Hewan yang hanya memakan tumbuhan disebut ...', 'herbivora', ['karnivora', 'omnivora', 'insektivora'], 'Herbivora pemakan tumbuhan, karnivora pemakan daging, omnivora pemakan keduanya.'),
      Q('Alat ukur panjang yang paling teliti (ketelitian 0,1 mm) adalah ...', 'jangka sorong', ['mistar', 'meteran gulung', 'penggaris segitiga'], 'Mistar teliti sampai 1 mm, sedangkan jangka sorong sampai 0,1 mm.'),
      Q('Tingkatan takson yang paling kecil dalam klasifikasi makhluk hidup adalah ...', 'spesies', ['genus', 'famili', 'kingdom'], 'Urutan dari terbesar: kingdom, filum, kelas, ordo, famili, genus, spesies.'),
      Q('Emas murni termasuk ...', 'unsur', ['senyawa', 'campuran homogen', 'campuran heterogen'], 'Emas murni hanya terdiri dari satu jenis atom (Au), sehingga digolongkan sebagai unsur.'),
      Q('Rotasi Bumi menyebabkan ...', 'pergantian siang dan malam', ['pergantian musim', 'gerhana bulan', 'perubahan bentuk Bulan'], 'Bumi berputar pada porosnya sekali dalam sekitar 24 jam, sehingga bagian yang terkena sinar Matahari bergantian.'),
      Q('Revolusi Bumi mengelilingi Matahari memerlukan waktu sekitar ...', '365 hari', ['24 jam', '30 hari', '7 hari'], 'Satu kali revolusi Bumi sekitar 365¼ hari. Itulah dasar satu tahun.'),
      Q('Rumus massa jenis suatu benda adalah ...', 'massa : volume', ['volume : massa', 'massa × volume', 'massa − volume'], 'Massa jenis (ρ) = m / V. Satuannya kg/m³ atau g/cm³.'),
      Q('Es batu yang dibiarkan di ruang terbuka mencair karena ...', 'menerima kalor', ['melepas kalor', 'tekanannya turun', 'massanya bertambah'], 'Mencair membutuhkan kalor. Es menyerap kalor dari udara sekitar.')
    ] },
    { id: 'ips', abbr: 'IPS', name: 'IPS', topics: 'Letak Indonesia, interaksi sosial, ekonomi, sejarah awal, ASEAN', bank: [
      Q('Indonesia terletak di antara dua benua, yaitu ...', 'Asia dan Australia', ['Asia dan Afrika', 'Eropa dan Asia', 'Australia dan Amerika'], 'Indonesia juga berada di antara dua samudra, yaitu Hindia dan Pasifik.'),
      Q('Garis khatulistiwa (ekuator) berada pada garis lintang ...', '0°', ['23,5° LU', '90° LS', '66,5° LU'], 'Khatulistiwa adalah garis lintang 0° yang membagi Bumi menjadi belahan utara dan selatan.'),
      Q('Selisih waktu antara WIB dan WIT adalah ...', '2 jam', ['1 jam', '3 jam', '4 jam'], 'WIB = UTC+7, WITA = UTC+8, WIT = UTC+9. Selisih WIB dan WIT = 2 jam.'),
      Q('Syarat terjadinya interaksi sosial adalah ...', 'kontak sosial dan komunikasi', ['kontak fisik dan uang', 'hubungan darah', 'kesamaan pekerjaan'], 'Interaksi sosial hanya terjadi jika ada kontak sosial dan komunikasi.'),
      Q('Kebutuhan primer manusia meliputi ...', 'pangan, sandang, dan papan', ['rekreasi, hiburan, dan hobi', 'kendaraan, gawai, dan perhiasan', 'wisata, olahraga, dan seni'], 'Kebutuhan primer adalah kebutuhan pokok: makanan, pakaian, dan tempat tinggal.'),
      Q('Fosil Pithecanthropus erectus pertama kali ditemukan oleh Eugene Dubois di ...', 'Trinil, Jawa Timur', ['Sangiran, Jawa Tengah', 'Wajak, Jawa Timur', 'Ngandong, Jawa Tengah'], 'Eugene Dubois menemukannya di Trinil (daerah Ngawi) pada 1891.'),
      Q('Sumpah Pemuda diikrarkan pada tahun ...', '1928', ['1908', '1945', '1950'], 'Sumpah Pemuda lahir pada Kongres Pemuda II, 28 Oktober 1928.'),
      Q('ASEAN didirikan pada tahun ...', '1967', ['1945', '1955', '1977'], 'ASEAN dideklarasikan di Bangkok pada 8 Agustus 1967. Indonesia salah satu pendirinya.'),
      Q('Bagian peta yang menjelaskan arti simbol-simbol disebut ...', 'legenda', ['skala', 'judul peta', 'inset'], 'Legenda (keterangan) menjelaskan arti simbol, warna, dan garis pada peta.'),
      Q('Puncak tertinggi di Indonesia adalah ...', 'Puncak Jaya', ['Gunung Kerinci', 'Gunung Rinjani', 'Gunung Semeru'], 'Puncak Jaya di Papua setinggi sekitar 4.884 m di atas permukaan laut.'),
      Q('Semboyan Bhinneka Tunggal Ika berarti ...', 'berbeda-beda tetapi tetap satu', ['bersatu kita teguh', 'satu nusa satu bangsa', 'gotong royong'], 'Semboyan ini menggambarkan persatuan dalam keberagaman suku, agama, dan budaya.'),
      Q('Gotong royong termasuk bentuk interaksi sosial berupa ...', 'kerja sama', ['persaingan', 'pertentangan', 'kontravensi'], 'Gotong royong adalah kerja sama untuk mencapai tujuan bersama.'),
      Q('Jumlah pulau di Indonesia adalah ...', 'lebih dari 17.000', ['sekitar 1.000', 'sekitar 5.000', 'sekitar 50.000'], 'Indonesia adalah negara kepulauan dengan lebih dari 17.000 pulau.'),
      Q('Penduduk di daerah pesisir pada umumnya bermata pencaharian sebagai ...', 'nelayan', ['petani padi sawah', 'penambang batu bara', 'peternak sapi perah'], 'Dekat dengan laut, penduduk pesisir banyak yang menangkap ikan.'),
      Q('Tanah, air, dan hutan termasuk faktor produksi ...', 'alam', ['modal', 'tenaga kerja', 'keahlian'], 'Faktor produksi alam adalah sumber daya yang tersedia dari alam, tanpa dibuat manusia.')
    ] },
    { id: 'indo', abbr: 'IND', name: 'Bahasa Indonesia', topics: 'Ejaan, kata baku, majas, teks deskripsi dan narasi, puisi', bank: [
      Q('Penulisan kata baku yang benar adalah ...', 'apotek', ['apotik', 'apotheek', 'appotek'], 'Bentuk baku menurut KBBI adalah apotek.'),
      Q('Kalimat dengan tanda baca yang benar adalah ...', 'Ibu membeli apel, jeruk, dan mangga di pasar.', ['Ibu membeli apel jeruk dan mangga, di pasar.', 'Ibu, membeli apel jeruk, dan mangga di pasar.', 'Ibu membeli, apel, jeruk dan, mangga di pasar.'], 'Koma dipakai untuk memisahkan unsur dalam perincian. Tanda koma ditaruh sebelum kata dan pada unsur terakhir.'),
      Q('Urutan struktur teks narasi yang tepat adalah ...', 'orientasi, komplikasi, resolusi, koda', ['komplikasi, orientasi, koda, resolusi', 'resolusi, orientasi, komplikasi, koda', 'koda, resolusi, orientasi, komplikasi'], 'Cerita dibuka dengan pengenalan (orientasi), muncul masalah (komplikasi), masalah selesai (resolusi), lalu pesan penutup (koda).'),
      Q('"Angin berbisik di telingaku." Majas pada kalimat itu adalah ...', 'personifikasi', ['hiperbola', 'metafora', 'ironi'], 'Angin diberi sifat manusia (berbisik). Itulah personifikasi.'),
      Q('"Aku sudah menunggu seribu tahun." Majas pada kalimat itu adalah ...', 'hiperbola', ['personifikasi', 'litotes', 'metafora'], 'Hiperbola adalah majas yang melebih-lebihkan keadaan.'),
      Q('Antonim kata "rajin" adalah ...', 'malas', ['tekun', 'giat', 'ulet'], 'Antonim berarti lawan kata. Tekun, giat, dan ulet adalah sinonim rajin.'),
      Q('Tokoh utama dalam cerita fabel adalah ...', 'binatang yang berperilaku seperti manusia', ['manusia biasa', 'dewa dan dewi', 'benda mati'], 'Fabel adalah cerita dengan tokoh binatang yang bisa berbicara dan berpikir seperti manusia, biasanya membawa pesan moral.'),
      Q('Persamaan bunyi pada akhir baris puisi disebut ...', 'rima', ['bait', 'larik', 'diksi'], 'Rima adalah pengulangan bunyi. Bait adalah kelompok baris, larik adalah satu baris, diksi adalah pilihan kata.'),
      Q('Tujuan utama teks deskripsi adalah ...', 'menggambarkan objek sehingga pembaca seolah melihatnya', ['mengajak pembaca membeli sesuatu', 'menceritakan peristiwa secara berurutan', 'membujuk pembaca agar setuju'], 'Teks deskripsi melukiskan ciri objek dengan rinci lewat kata-kata.'),
      Q('Imbuhan me- + kata dasar "sapu" menjadi ...', 'menyapu', ['mesapu', 'mensapu', 'memsapu'], 'Jika kata dasar berawalan s, huruf s luluh dan awalan menjadi meny-.'),
      Q('Penulisan kata baku yang benar adalah ...', 'nasihat', ['nasehat', 'nasikhat', 'nasihad'], 'Bentuk baku menurut KBBI adalah nasihat.'),
      Q('Gagasan utama yang dibahas dalam sebuah paragraf disebut ...', 'ide pokok', ['kesimpulan', 'judul', 'kalimat penjelas'], 'Ide pokok adalah inti yang dibahas, biasanya terdapat dalam kalimat utama.'),
      Q('Kalimat dengan penulisan di yang benar adalah ...', 'Buku itu diletakkan di atas meja.', ['Buku itu di letakkan di atas meja.', 'Buku itu diletakkan diatas meja.', 'Buku itu di letakkan diatas meja.'], 'Di- sebagai awalan ditulis serangkai (diletakkan). Di sebagai kata depan penunjuk tempat dipisah (di atas).'),
      Q('Teks yang berisi langkah-langkah membuat sesuatu disebut teks ...', 'prosedur', ['deskripsi', 'narasi', 'eksposisi'], 'Teks prosedur menjelaskan urutan langkah, contohnya resep dan cara merakit.'),
      Q('Tanda baca yang tepat di akhir kalimat "Siapa nama guru barumu" adalah ...', 'tanda tanya (?)', ['tanda titik (.)', 'tanda seru (!)', 'tanda koma (,)'], 'Kalimat tanya diakhiri dengan tanda tanya.')
    ] },
    { id: 'ing', abbr: 'ING', name: 'Bahasa Inggris', topics: 'To be, simple present, preposisi, angka, kosakata sehari-hari', bank: [
      Q('She ___ a student.', 'is', ['am', 'are', 'be'], 'She adalah orang ketiga tunggal, jadi memakai is.'),
      Q('My father ___ to work by car every day.', 'goes', ['go', 'going', 'gone'], 'Pada simple present, subjek he/she/it/singular menambahkan -s atau -es pada kata kerja: goes.'),
      Q('The opposite of "big" is ...', 'small', ['tall', 'long', 'heavy'], 'Big (besar) lawan katanya small (kecil).'),
      Q('I put my pencils ___ the pencil case.', 'in', ['on', 'at', 'of'], 'In berarti di dalam. Pensil dimasukkan ke dalam kotak pensil.'),
      Q('The plural of "child" is ...', 'children', ['childs', 'childes', 'childrens'], 'Child memiliki bentuk jamak tak beraturan: children.'),
      Q('There ___ three books on the desk.', 'are', ['is', 'am', 'be'], 'Books itu jamak, jadi there are. Untuk tunggal: there is.'),
      Q('What day comes after Monday?', 'Tuesday', ['Sunday', 'Wednesday', 'Friday'], 'Urutan hari: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.'),
      Q('It is 07.30. We say: "It is ..."', 'half past seven', ['half to seven', 'seven past half', 'thirty to seven'], 'Setengah jam setelah jam tujuh disebut half past seven.'),
      Q('I ___ breakfast at 6 a.m. every day.', 'have', ['has', 'having', 'am'], 'Subjek I memakai have. Has dipakai untuk he, she, dan it.'),
      Q('This is Rina. ___ bag is blue.', 'Her', ['She', 'Him', 'His'], 'Her adalah kata ganti kepemilikan untuk perempuan (her bag = tasnya).'),
      Q('Bahasa Inggris dari "kursi" adalah ...', 'chair', ['table', 'door', 'board'], 'Chair = kursi, table = meja, door = pintu, board = papan.'),
      Q('At 7 p.m. you meet your teacher. You say, "Good ___!"', 'evening', ['morning', 'afternoon', 'night'], 'Good evening dipakai saat bertemu di sore menjelang malam. Good night dipakai untuk berpamitan tidur.'),
      Q('He ___ not like spicy food.', 'does', ['do', 'is', 'are'], 'Bentuk negatif simple present untuk he/she/it memakai does not.'),
      Q('Which one is 13?', 'thirteen', ['thirty', 'three', 'fifteen'], 'Thirteen = 13, thirty = 30, fifteen = 15.'),
      Q('My mother\'s brother is my ...', 'uncle', ['aunt', 'cousin', 'grandfather'], 'Saudara laki-laki dari ibu atau ayah disebut uncle.')
    ] }
  ];
    var EXTRA = {
    mat: {
      8: [
        Q('Segitiga siku-siku memiliki sisi tegak 6 cm dan 8 cm. Panjang sisi miringnya adalah ...', '10 cm', ['14 cm', '12 cm', '7 cm'], 'Pythagoras: c² = 6² + 8² = 36 + 64 = 100, sehingga c = 10 cm.'),
        Q('Gradien garis y = 3x − 5 adalah ...', '3', ['−5', '5', '1/3'], 'Pada bentuk y = mx + c, gradiennya adalah m, yaitu koefisien x.'),
        Q('Dari x + y = 10 dan x − y = 2, nilai x adalah ...', '6', ['4', '8', '12'], 'Jumlahkan kedua persamaan: 2x = 12, jadi x = 6. Lalu y = 4.'),
        Q('Keliling lingkaran berjari-jari 7 cm (π = 22/7) adalah ...', '44 cm', ['154 cm', '22 cm', '14 cm'], 'K = 2πr = 2 × 22/7 × 7 = 44 cm. Angka 154 adalah luasnya.'),
        Q('Luas lingkaran berjari-jari 14 cm (π = 22/7) adalah ...', '616 cm²', ['88 cm²', '44 cm²', '308 cm²'], 'L = πr² = 22/7 × 14 × 14 = 616 cm².'),
        Q('Volume kubus dengan rusuk 5 cm adalah ...', '125 cm³', ['25 cm³', '75 cm³', '150 cm³'], 'V = s³ = 5 × 5 × 5 = 125 cm³.'),
        Q('Luas permukaan kubus dengan rusuk 4 cm adalah ...', '96 cm²', ['64 cm²', '16 cm²', '48 cm²'], 'Kubus punya 6 sisi persegi. L = 6 × 4² = 96 cm².'),
        Q('Peluang muncul mata dadu genap pada pelemparan satu dadu adalah ...', '1/2', ['1/3', '1/6', '2/3'], 'Mata dadu genap ada 3 (2, 4, 6) dari 6 kemungkinan, jadi 3/6 = 1/2.'),
        Q('Titik (3, −2) terletak pada kuadran ...', 'IV', ['I', 'II', 'III'], 'x positif dan y negatif berada di kuadran IV (kanan bawah).'),
        Q('Jika f(x) = 2x + 3, maka f(4) = ...', '11', ['9', '14', '8'], 'Substitusi x = 4: 2(4) + 3 = 11.'),
        Q('Tiga bilangan yang merupakan tripel Pythagoras adalah ...', '5, 12, 13', ['4, 5, 7', '6, 7, 8', '7, 8, 9'], '5² + 12² = 25 + 144 = 169 = 13². Pasangan lain tidak memenuhi.'),
        Q('Persamaan garis dengan gradien 2 yang melalui titik (0, 3) adalah ...', 'y = 2x + 3', ['y = 3x + 2', 'y = 2x − 3', 'y = −2x + 3'], 'Titik (0, 3) adalah titik potong sumbu y, sehingga c = 3. Gradien m = 2.'),
        Q('Volume balok berukuran 8 cm × 5 cm × 4 cm adalah ...', '160 cm³', ['17 cm³', '80 cm³', '320 cm³'], 'V = p × l × t = 8 × 5 × 4 = 160 cm³.'),
        Q('Banyak rusuk pada sebuah balok adalah ...', '12', ['8', '6', '10'], 'Balok punya 12 rusuk, 8 titik sudut, dan 6 sisi.'),
        Q('Juring dengan sudut pusat 90° memiliki luas ... luas lingkaran.', 'seperempat', ['setengah', 'sepertiga', 'tiga perempat'], '90°/360° = 1/4. Luas juring sebanding dengan sudut pusatnya.')
      ],
      9: [
        Q('Nilai dari 2⁵ adalah ...', '32', ['10', '25', '16'], '2⁵ = 2 × 2 × 2 × 2 × 2 = 32.'),
        Q('Nilai dari 5⁰ adalah ...', '1', ['0', '5', 'tidak terdefinisi'], 'Bilangan tidak nol berpangkat nol hasilnya 1.'),
        Q('Hasil dari √144 adalah ...', '12', ['14', '72', '11'], '12 × 12 = 144.'),
        Q('Bentuk sederhana dari √50 adalah ...', '5√2', ['25√2', '10√5', '5√10'], '√50 = √(25 × 2) = √25 × √2 = 5√2.'),
        Q('Akar-akar persamaan x² − 5x + 6 = 0 adalah ...', '2 dan 3', ['−2 dan −3', '1 dan 6', '−1 dan −6'], 'Faktorkan: (x − 2)(x − 3) = 0. Jumlah akar 5 dan hasil kali 6.'),
        Q('Volume tabung berjari-jari 7 cm dan tinggi 10 cm (π = 22/7) adalah ...', '1.540 cm³', ['154 cm³', '440 cm³', '3.080 cm³'], 'V = πr²t = 22/7 × 49 × 10 = 1.540 cm³.'),
        Q('Volume bola berjari-jari 3 cm adalah ...', '36π cm³', ['12π cm³', '27π cm³', '108π cm³'], 'V = 4/3 πr³ = 4/3 × π × 27 = 36π cm³.'),
        Q('Volume kerucut berjari-jari 3 cm dan tinggi 4 cm adalah ...', '12π cm³', ['36π cm³', '24π cm³', '4π cm³'], 'V = 1/3 πr²t = 1/3 × π × 9 × 4 = 12π cm³.'),
        Q('Titik A(2, 3) digeser 4 satuan ke kanan dan 1 satuan ke bawah. Bayangannya adalah ...', '(6, 2)', ['(−2, 4)', '(6, 4)', '(3, 7)'], 'Kanan menambah x: 2 + 4 = 6. Ke bawah mengurangi y: 3 − 1 = 2.'),
        Q('Bayangan titik (3, 5) setelah dicerminkan terhadap sumbu x adalah ...', '(3, −5)', ['(−3, 5)', '(−3, −5)', '(5, 3)'], 'Pencerminan terhadap sumbu x mengubah tanda y saja.'),
        Q('Segitiga ABC sebangun dengan PQR. AB = 6, PQ = 9, BC = 8. Panjang QR adalah ...', '12', ['16', '10', '6'], 'Perbandingan sisi 9/6 = 3/2. QR = 8 × 3/2 = 12.'),
        Q('Modus dari data 5, 6, 6, 7, 8, 6, 9 adalah ...', '6', ['7', '8', '5'], 'Modus adalah nilai yang paling sering muncul. Angka 6 muncul tiga kali.'),
        Q('Peluang terambil kartu As dari satu set kartu bridge (52 kartu) adalah ...', '1/13', ['1/52', '1/4', '4/13'], 'Ada 4 kartu As. Peluangnya 4/52 = 1/13.'),
        Q('Pada barisan 3, 7, 11, 15, ... suku ke-10 adalah ...', '39', ['43', '37', '41'], 'Beda b = 4. Un = a + (n − 1)b = 3 + 9 × 4 = 39.'),
        Q('Persamaan x² + 2x + 5 = 0 memiliki ...', 'tidak ada akar real', ['dua akar real berbeda', 'dua akar real kembar', 'tepat satu akar rasional'], 'Diskriminan D = b² − 4ac = 4 − 20 = −16. Karena D < 0, tidak ada akar real.')
      ]
    },
    ipa: {
      8: [
        Q('Enzim amilase dalam air liur berfungsi mencerna ...', 'karbohidrat', ['protein', 'lemak', 'vitamin'], 'Amilase memecah amilum (karbohidrat) menjadi gula yang lebih sederhana.'),
        Q('Organ tempat penyerapan sari makanan paling banyak adalah ...', 'usus halus', ['lambung', 'usus besar', 'kerongkongan'], 'Dinding usus halus berlipat dan berjonjot (vili) sehingga permukaan serapnya sangat luas.'),
        Q('Bagian darah yang mengangkut oksigen adalah ...', 'sel darah merah', ['sel darah putih', 'keping darah', 'plasma darah'], 'Sel darah merah mengandung hemoglobin yang mengikat oksigen.'),
        Q('Satuan frekuensi adalah ...', 'hertz', ['newton', 'joule', 'pascal'], 'Satu hertz berarti satu getaran per sekon.'),
        Q('Rumus tekanan adalah ...', 'P = F / A', ['P = F × A', 'P = A / F', 'P = F − A'], 'Tekanan = gaya dibagi luas bidang tekan. Satuannya pascal (N/m²).'),
        Q('Sifat bayangan pada cermin cembung adalah ...', 'maya, tegak, diperkecil', ['nyata, terbalik, diperbesar', 'nyata, tegak, sama besar', 'maya, terbalik, diperbesar'], 'Cermin cembung selalu membentuk bayangan maya, tegak, dan lebih kecil. Karena itu dipakai pada spion.'),
        Q('Keuntungan mekanis pada tuas sama dengan ...', 'lengan kuasa : lengan beban', ['lengan beban : lengan kuasa', 'beban × kuasa', 'kuasa − beban'], 'KM = w/F = lengan kuasa / lengan beban. Makin panjang lengan kuasa, makin ringan usahanya.'),
        Q('Bunyi tidak dapat merambat melalui ...', 'ruang hampa', ['air', 'besi', 'udara'], 'Bunyi adalah gelombang mekanik yang membutuhkan zat perantara.'),
        Q('Hukum I Newton juga disebut hukum ...', 'kelembaman', ['aksi-reaksi', 'percepatan', 'gravitasi'], 'Benda cenderung mempertahankan keadaannya jika resultan gaya nol. Itulah kelembaman (inersia).'),
        Q('Gaya gesek selalu bekerja ...', 'berlawanan arah dengan gerak benda', ['searah dengan gerak benda', 'tegak lurus ke atas', 'menuju pusat Bumi'], 'Gaya gesek menghambat gerak, sehingga arahnya berlawanan dengan arah gerak.'),
        Q('Bagian mata yang mengatur banyak sedikitnya cahaya yang masuk adalah ...', 'iris', ['retina', 'lensa', 'kornea'], 'Iris mengatur lebar pupil. Retina menangkap bayangan.'),
        Q('Benda bergetar 20 kali dalam 5 sekon. Frekuensinya adalah ...', '4 Hz', ['100 Hz', '0,25 Hz', '15 Hz'], 'f = n / t = 20 / 5 = 4 Hz.'),
        Q('Mobil menempuh 120 km dalam 2 jam. Kecepatannya adalah ...', '60 km/jam', ['240 km/jam', '122 km/jam', '30 km/jam'], 'v = s / t = 120 / 2 = 60 km/jam.'),
        Q('Kekurangan vitamin C dapat menyebabkan ...', 'skorbut', ['rabun senja', 'beri-beri', 'rakitis'], 'Skorbut (sariawan parah) disebabkan kurang vitamin C. Rabun senja kurang A, beri-beri kurang B1, rakitis kurang D.'),
        Q('Gaya 10 N memindahkan benda sejauh 5 m searah gaya. Usahanya adalah ...', '50 J', ['2 J', '15 J', '5 J'], 'W = F × s = 10 × 5 = 50 joule.')
      ],
      9: [
        Q('Pembuahan sel telur oleh sperma pada manusia umumnya terjadi di ...', 'tuba falopi', ['rahim', 'ovarium', 'vagina'], 'Sel telur dibuahi di saluran telur (tuba falopi), lalu zigot bergerak ke rahim.'),
        Q('Hormon utama yang mengatur ciri kelamin sekunder pria adalah ...', 'testosteron', ['estrogen', 'progesteron', 'insulin'], 'Testosteron dihasilkan testis dan memicu suara berat, tumbuh kumis, serta otot membesar.'),
        Q('Persilangan Tt × Tt menghasilkan keturunan bergenotipe tt sebanyak ...', '25%', ['50%', '75%', '100%'], 'Keturunannya TT : Tt : tt = 1 : 2 : 1, jadi tt = 1/4 = 25%.'),
        Q('Rasio fenotipe F2 pada persilangan monohibrid dengan dominansi penuh adalah ...', '3 : 1', ['1 : 1', '9 : 3 : 3 : 1', '1 : 2 : 1'], 'Tiga bersifat dominan dan satu bersifat resesif. Rasio 9 : 3 : 3 : 1 adalah untuk dihibrid.'),
        Q('Hukum Ohm dinyatakan dengan rumus ...', 'V = I × R', ['V = I / R', 'V = R / I', 'V = I + R'], 'Tegangan = kuat arus × hambatan.'),
        Q('Arus 2 A mengalir pada hambatan 5 Ω. Tegangannya adalah ...', '10 V', ['2,5 V', '7 V', '0,4 V'], 'V = I × R = 2 × 5 = 10 volt.'),
        Q('Hambatan 3 Ω dan 6 Ω disusun seri. Hambatan penggantinya adalah ...', '9 Ω', ['2 Ω', '18 Ω', '4,5 Ω'], 'Pada susunan seri, hambatan dijumlahkan: 3 + 6 = 9 Ω. Nilai 2 Ω adalah hasil susunan paralel.'),
        Q('Dua kutub magnet yang senama akan ...', 'tolak-menolak', ['tarik-menarik', 'diam saja', 'saling menghilangkan'], 'Utara dengan utara (atau selatan dengan selatan) saling tolak. Kutub berbeda saling tarik.'),
        Q('Alat yang digunakan untuk menaikkan atau menurunkan tegangan listrik AC adalah ...', 'transformator', ['generator', 'motor listrik', 'baterai'], 'Transformator bekerja dengan induksi elektromagnetik, memakai kumparan primer dan sekunder.'),
        Q('Lampu 20 W menyala selama 10 jam. Energi listrik yang dipakai adalah ...', '0,2 kWh', ['2 kWh', '20 kWh', '0,02 kWh'], 'W = 20 W × 10 jam = 200 Wh = 0,2 kWh.'),
        Q('Gerhana matahari terjadi ketika ...', 'Bulan berada di antara Matahari dan Bumi', ['Bumi berada di antara Matahari dan Bulan', 'Matahari berada di antara Bumi dan Bulan', 'Bulan berada jauh dari Bumi'], 'Bayangan Bulan menutupi sebagian permukaan Bumi, sehingga Matahari tampak tertutup.'),
        Q('Pasang surut air laut terutama dipengaruhi oleh gaya gravitasi ...', 'Bulan', ['Mars', 'Venus', 'Jupiter'], 'Bulan paling dekat dengan Bumi, sehingga gravitasinya paling kuat memengaruhi air laut. Matahari ikut berperan.'),
        Q('Pembuatan tempe dengan jamur Rhizopus termasuk bioteknologi ...', 'konvensional', ['modern', 'rekayasa genetika', 'kloning'], 'Bioteknologi konvensional memakai mikroorganisme tanpa mengubah materi genetiknya.'),
        Q('Efek rumah kaca terutama diperkuat oleh meningkatnya gas ...', 'karbon dioksida', ['oksigen', 'nitrogen', 'argon'], 'Karbon dioksida dari pembakaran bahan bakar fosil menahan panas di atmosfer.'),
        Q('Kromosom yang membawa gen terletak di bagian sel yang disebut ...', 'inti sel', ['ribosom', 'membran sel', 'vakuola'], 'Kromosom tersusun dari DNA yang terdapat di inti sel (nukleus).')
      ]
    },
    ips: {
      8: [
        Q('VOC didirikan pada tahun ...', '1602', ['1596', '1799', '1830'], 'VOC (Vereenigde Oostindische Compagnie) berdiri tahun 1602 dan dibubarkan pada 1799.'),
        Q('Sistem tanam paksa (Cultuurstelsel) diterapkan oleh gubernur jenderal ...', 'Johannes van den Bosch', ['Daendels', 'Raffles', 'Snouck Hurgronje'], 'Van den Bosch menerapkannya mulai 1830 untuk menambah kas pemerintah Belanda.'),
        Q('Perang Jawa yang dipimpin Pangeran Diponegoro berlangsung pada tahun ...', '1825–1830', ['1808–1811', '1873–1904', '1945–1949'], 'Perang Jawa berlangsung lima tahun dan menguras kas Belanda.'),
        Q('Budi Utomo, organisasi pergerakan nasional pertama, berdiri pada tahun ...', '1908', ['1912', '1928', '1945'], 'Budi Utomo berdiri 20 Mei 1908. Tanggal itu diperingati sebagai Hari Kebangkitan Nasional.'),
        Q('Tiga program Politik Etis (Balas Budi) adalah ...', 'irigasi, edukasi, dan emigrasi', ['tanam paksa, rodi, dan pajak tanah', 'irigasi, edukasi, dan eksploitasi', 'monopoli, blokade, dan perjanjian'], 'Politik Etis dicetuskan C. Th. van Deventer: pengairan, pendidikan, dan perpindahan penduduk.'),
        Q('Revolusi Industri pertama kali terjadi di negara ...', 'Inggris', ['Prancis', 'Jerman', 'Amerika Serikat'], 'Revolusi Industri dimulai di Inggris pada abad ke-18, ditandai penemuan mesin uap.'),
        Q('Pasar yang hanya memiliki satu penjual disebut pasar ...', 'monopoli', ['oligopoli', 'persaingan sempurna', 'monopsoni'], 'Monopoli: satu penjual. Monopsoni: satu pembeli. Oligopoli: beberapa penjual.'),
        Q('Ekspor adalah kegiatan ...', 'menjual barang ke luar negeri', ['membeli barang dari luar negeri', 'menjual barang di dalam negeri', 'menukar barang tanpa uang'], 'Ekspor menjual ke luar negeri, sedangkan impor membeli dari luar negeri.'),
        Q('Perjanjian Giyanti (1755) membagi Kerajaan Mataram menjadi ...', 'Surakarta dan Yogyakarta', ['Banten dan Cirebon', 'Demak dan Pajang', 'Jakarta dan Bandung'], 'Perjanjian ini menghasilkan Kasunanan Surakarta dan Kesultanan Yogyakarta.'),
        Q('Kerajaan Hindu tertua di Indonesia adalah ...', 'Kutai', ['Sriwijaya', 'Majapahit', 'Mataram Kuno'], 'Kutai di Kalimantan Timur, dikenal dari prasasti Yupa (sekitar abad ke-4).'),
        Q('Gajah Mada terkenal dengan sumpahnya yang bernama ...', 'Sumpah Palapa', ['Sumpah Pemuda', 'Trikora', 'Dwikora'], 'Gajah Mada bersumpah tidak akan memakan palapa sebelum menyatukan Nusantara. Ia patih Majapahit.'),
        Q('Candi Borobudur dibangun pada masa pemerintahan dinasti ...', 'Syailendra', ['Sanjaya', 'Isyana', 'Warmadewa'], 'Borobudur adalah candi Buddha peninggalan dinasti Syailendra di Kerajaan Mataram Kuno.'),
        Q('Perlawanan Pattimura (Thomas Matulessy) terjadi di ...', 'Maluku', ['Aceh', 'Sulawesi Selatan', 'Sumatera Barat'], 'Pattimura memimpin perlawanan rakyat Maluku pada 1817 terhadap Belanda.'),
        Q('Kumpulan surat R.A. Kartini diterbitkan dengan judul ...', 'Habis Gelap Terbitlah Terang', ['Max Havelaar', 'Layar Terkembang', 'Siti Nurbaya'], 'Surat-surat Kartini dibukukan oleh J.H. Abendanon dan menjadi simbol emansipasi perempuan.'),
        Q('Buku Max Havelaar yang mengkritik tanam paksa ditulis oleh ...', 'Multatuli', ['Raffles', 'Daendels', 'Van den Bosch'], 'Multatuli adalah nama pena Eduard Douwes Dekker.')
      ],
      9: [
        Q('Naskah proklamasi kemerdekaan dibacakan di ...', 'Jalan Pegangsaan Timur 56, Jakarta', ['Rengasdengklok', 'Lapangan Ikada', 'Gedung Sate, Bandung'], 'Proklamasi dibacakan Soekarno pada 17 Agustus 1945 di rumahnya di Pegangsaan Timur 56.'),
        Q('Naskah proklamasi diketik oleh ...', 'Sayuti Melik', ['Soekarno', 'Mohammad Hatta', 'Ahmad Soebardjo'], 'Naskah ditulis tangan Soekarno, lalu diketik Sayuti Melik dengan beberapa perubahan.'),
        Q('Jepang mulai menduduki Indonesia pada tahun ...', '1942', ['1939', '1945', '1950'], 'Jepang mengalahkan Belanda pada Maret 1942 dan berkuasa sampai 1945.'),
        Q('Badan yang bersidang pada 29 Mei–1 Juni 1945 untuk membahas dasar negara adalah ...', 'BPUPKI', ['PPKI', 'KNIP', 'PETA'], 'BPUPKI (Badan Penyelidik Usaha-usaha Persiapan Kemerdekaan Indonesia) membahas dasar negara dan rancangan UUD.'),
        Q('Pidato Soekarno tentang dasar negara pada 1 Juni 1945 diperingati sebagai ...', 'Hari Lahir Pancasila', ['Hari Kebangkitan Nasional', 'Hari Sumpah Pemuda', 'Hari Pahlawan'], 'Soekarno menyebut lima dasar negara dan menamainya Pancasila.'),
        Q('Pertempuran 10 November 1945 yang diperingati sebagai Hari Pahlawan terjadi di ...', 'Surabaya', ['Bandung', 'Semarang', 'Ambarawa'], 'Rakyat Surabaya melawan pasukan Sekutu (Inggris) setelah tewasnya Brigjen Mallaby.'),
        Q('Dalam Perundingan Linggarjati, Belanda mengakui secara de facto wilayah RI yang meliputi ...', 'Jawa, Madura, dan Sumatra', ['seluruh Indonesia', 'Jawa dan Bali', 'Kalimantan dan Sulawesi'], 'Hasil Linggarjati (1946): RI diakui de facto atas Jawa, Madura, dan Sumatra.'),
        Q('Belanda menyerahkan kedaulatan kepada Republik Indonesia Serikat pada tanggal ...', '27 Desember 1949', ['17 Agustus 1945', '5 Juli 1959', '28 Oktober 1928'], 'Hasil Konferensi Meja Bundar di Den Haag, penyerahan kedaulatan dilakukan 27 Desember 1949.'),
        Q('Konferensi Asia Afrika di Bandung diselenggarakan pada tahun ...', '1955', ['1945', '1961', '1965'], 'KAA 1955 mendorong solidaritas negara-negara Asia dan Afrika yang baru merdeka.'),
        Q('Salah satu dampak positif globalisasi adalah ...', 'kemudahan memperoleh informasi', ['lunturnya nilai budaya lokal', 'gaya hidup konsumtif', 'meningkatnya sikap individualis'], 'Teknologi komunikasi mempermudah akses informasi. Tiga pilihan lain termasuk dampak negatif.'),
        Q('Contoh mobilitas sosial vertikal naik adalah ...', 'buruh pabrik diangkat menjadi manajer', ['manajer dipindah ke kantor cabang', 'manajer diturunkan menjadi staf', 'warga pindah ke kota lain'], 'Mobilitas vertikal naik berarti berpindah ke lapisan sosial lebih tinggi.'),
        Q('Inflasi adalah ...', 'kenaikan harga barang secara umum dan terus-menerus', ['penurunan harga barang secara umum', 'naiknya harga satu jenis barang', 'bertambahnya jumlah penduduk'], 'Akibat inflasi, nilai uang menurun karena daya belinya berkurang.'),
        Q('Bapak Koperasi Indonesia adalah ...', 'Mohammad Hatta', ['Soekarno', 'Sutan Sjahrir', 'Ki Hajar Dewantara'], 'Hatta mengembangkan koperasi sebagai wujud ekonomi kekeluargaan sesuai Pasal 33 UUD 1945.'),
        Q('Sekretariat ASEAN berkedudukan di ...', 'Jakarta', ['Bangkok', 'Singapura', 'Kuala Lumpur'], 'Sekretariat ASEAN berada di Jakarta, sedangkan ASEAN dideklarasikan di Bangkok.'),
        Q('Tujuan golongan muda membawa Soekarno dan Hatta ke Rengasdengklok adalah ...', 'mendesak agar proklamasi segera dilaksanakan', ['menolak kemerdekaan Indonesia', 'menyerahkan keduanya kepada Jepang', 'memindahkan ibu kota negara'], 'Golongan muda ingin proklamasi dilakukan segera, lepas dari pengaruh Jepang, tanpa menunggu janji Jepang.')
      ]
    },
    indo: {
      8: [
        Q('Unsur “mengapa” dalam teks berita menjawab pertanyaan tentang ...', 'sebab terjadinya peristiwa', ['waktu kejadian', 'pelaku peristiwa', 'tempat kejadian'], 'Unsur berita 5W + 1H: apa, siapa, kapan, di mana, mengapa, bagaimana. “Mengapa” menyangkut sebab.'),
        Q('Unsur yang membangun cerpen dari dalam, seperti tokoh, alur, dan latar, disebut unsur ...', 'intrinsik', ['ekstrinsik', 'eksposisi', 'kronologis'], 'Unsur ekstrinsik berasal dari luar karya, misalnya latar belakang pengarang.'),
        Q('Sudut pandang orang pertama pelaku utama menggunakan kata ganti ...', 'aku', ['ia', 'mereka', 'beliau'], 'Tokoh “aku” menceritakan kisahnya sendiri.'),
        Q('Cerita yang urutan kejadiannya dimulai dari peristiwa terakhir lalu kembali ke masa lalu beralur ...', 'mundur', ['maju', 'simultan', 'tersirat'], 'Alur maju dimulai dari awal, alur mundur (flashback) dimulai dari akhir.'),
        Q('Konjungsi yang menyatakan hubungan pertentangan adalah ...', 'tetapi', ['dan', 'karena', 'sehingga'], '“Tetapi” menghubungkan dua hal yang berlawanan.'),
        Q('Kalimat yang berisi ajakan untuk membeli suatu produk terdapat pada teks ...', 'iklan', ['berita', 'laporan', 'biografi'], 'Iklan bertujuan memengaruhi calon pembeli.'),
        Q('Tujuan utama teks eksposisi adalah ...', 'memaparkan gagasan disertai argumen dan fakta', ['menghibur dengan kisah fiksi', 'mengajak membeli produk', 'menceritakan pengalaman pribadi'], 'Teks eksposisi berisi tesis, argumentasi, dan penegasan ulang.'),
        Q('Bagian teks ulasan yang memuat penilaian kelebihan dan kekurangan karya disebut ...', 'evaluasi', ['orientasi', 'identitas karya', 'sinopsis'], 'Evaluasi memberi penilaian. Orientasi atau sinopsis hanya memperkenalkan isi karya.'),
        Q('“Wajahnya secerah bulan purnama.” Majas pada kalimat itu adalah ...', 'simile (perumpamaan)', ['hiperbola', 'ironi', 'litotes'], 'Simile membandingkan dua hal secara langsung memakai kata seperti, bagai, atau se-.'),
        Q('“Pagi sekali kamu datang!” (diucapkan kepada orang yang terlambat). Majas yang dipakai adalah ...', 'ironi', ['litotes', 'hiperbola', 'repetisi'], 'Ironi menyatakan sesuatu yang berlawanan dengan kenyataan, biasanya untuk menyindir.'),
        Q('Bagian naskah drama yang berisi petunjuk gerak dan ekspresi tokoh disebut ...', 'petunjuk lakuan (kramagung)', ['dialog', 'prolog', 'epilog'], 'Petunjuk lakuan ditulis dalam tanda kurung dan membantu pemain memerankan tokoh.'),
        Q('Penulisan kata baku yang benar adalah ...', 'analisis', ['analisa', 'analisys', 'analsis'], 'Menurut KBBI bentuk bakunya adalah analisis.'),
        Q('Penulisan kata baku yang benar adalah ...', 'risiko', ['resiko', 'risco', 'rissiko'], 'Menurut KBBI bentuk bakunya adalah risiko.'),
        Q('Makna ungkapan “panjang tangan” adalah ...', 'suka mencuri', ['suka menolong', 'tangannya panjang', 'rajin bekerja'], 'Idiom adalah ungkapan yang maknanya berbeda dari arti tiap katanya.'),
        Q('Pilihan kata yang digunakan penyair dalam puisi disebut ...', 'diksi', ['larik', 'tipografi', 'amanat'], 'Diksi menentukan keindahan dan makna puisi.')
      ],
      9: [
        Q('Pendapat penulis yang akan dibuktikan dalam teks argumentasi terdapat pada bagian ...', 'tesis', ['orientasi', 'resolusi', 'koda'], 'Struktur argumentasi: tesis, argumentasi, penegasan ulang.'),
        Q('Teks persuasi bertujuan untuk ...', 'mengajak pembaca melakukan sesuatu', ['menceritakan kisah fiktif', 'memerintahkan dengan paksaan', 'menjelaskan langkah kerja'], 'Persuasi membujuk pembaca dengan alasan yang meyakinkan.'),
        Q('Kalimat yang efektif adalah ...', 'Para guru sedang rapat di aula.', ['Para guru-guru sedang rapat di aula.', 'Semua guru-guru sedang rapat di aula.', 'Banyak guru-guru sedang rapat di aula.'], 'Kata “para”, “semua”, dan “banyak” sudah menyatakan jamak, jadi “guru-guru” membuatnya berlebihan (pleonasme).'),
        Q('Tanda baca yang digunakan untuk mengapit kutipan langsung adalah ...', 'tanda petik (“ ”)', ['tanda kurung', 'tanda hubung', 'tanda titik dua'], 'Kutipan langsung ditulis persis seperti ucapan atau tulisan aslinya, dalam tanda petik.'),
        Q('Penulisan kata serapan yang baku adalah ...', 'kualitas', ['kwalitas', 'kualites', 'qualitas'], 'Bentuk baku menurut KBBI adalah kualitas.'),
        Q('Makna ungkapan “kambing hitam” adalah ...', 'orang yang dipersalahkan', ['kambing berwarna hitam', 'hewan untuk kurban', 'orang yang sangat kaya'], 'Kambing hitam dipakai untuk orang yang dijadikan sasaran kesalahan.'),
        Q('Dua baris pertama pada pantun disebut ...', 'sampiran', ['isi', 'amanat', 'rima'], 'Sampiran tidak berhubungan langsung dengan makna, dua baris terakhir adalah isi.'),
        Q('Bagian pidato yang berisi salam dan sapaan kepada hadirin disebut ...', 'pembukaan', ['isi', 'penutup', 'kesimpulan'], 'Struktur pidato: pembukaan, isi, penutup.'),
        Q('Kalimat berikut yang merupakan opini adalah ...', 'Pemandangan pantai itu paling indah di dunia.', ['Bumi mengelilingi Matahari.', 'Indonesia merdeka pada 17 Agustus 1945.', 'Air membeku pada suhu 0 °C.'], 'Opini berupa penilaian pribadi dan tidak bisa dibuktikan. Fakta bisa dibuktikan kebenarannya.'),
        Q('“Adik dikenal sebagai kutu buku.” Makna kiasan kutu buku adalah ...', 'orang yang gemar membaca', ['serangga pemakan kertas', 'penjual buku', 'orang yang malas belajar'], 'Kutu buku bermakna kiasan untuk orang yang sangat suka membaca.'),
        Q('Bagian akhir karya tulis ilmiah yang memuat sumber rujukan adalah ...', 'daftar pustaka', ['kata pengantar', 'abstrak', 'pendahuluan'], 'Daftar pustaka mencantumkan buku, jurnal, atau situs yang dikutip.'),
        Q('Pesan moral yang ingin disampaikan pengarang melalui cerita disebut ...', 'amanat', ['tema', 'alur', 'latar'], 'Tema adalah gagasan pokok, amanat adalah pesan untuk pembaca.'),
        Q('Penulisan huruf kapital yang benar adalah ...', 'Kami berlibur ke Pulau Bali pada bulan Agustus.', ['kami berlibur ke pulau bali pada bulan agustus.', 'Kami berlibur ke pulau Bali pada Bulan Agustus.', 'Kami berlibur ke Pulau bali pada bulan Agustus.'], 'Nama diri geografi (Pulau Bali) dan nama bulan (Agustus) diawali huruf kapital. Kata “bulan” tidak.'),
        Q('Kata penghubung antarkalimat yang menyatakan pertentangan adalah ...', 'Namun', ['Oleh karena itu', 'Selanjutnya', 'Misalnya'], 'Namun menghubungkan kalimat dengan makna berlawanan. “Oleh karena itu” menyatakan akibat.'),
        Q('Kisah hidup seseorang yang ditulis oleh dirinya sendiri disebut ...', 'otobiografi', ['biografi', 'novel', 'resensi'], 'Biografi ditulis oleh orang lain, otobiografi ditulis oleh tokohnya sendiri.')
      ]
    },
    ing: {
      8: [
        Q('She ___ TV now.', 'is watching', ['watches', 'watched', 'watch'], 'Kata “now” menunjukkan present continuous: is/am/are + V-ing.'),
        Q('Yesterday I ___ to the market.', 'went', ['go', 'goes', 'going'], 'Yesterday berarti past tense. Bentuk lampau go adalah went.'),
        Q('They ___ football last Sunday.', 'played', ['play', 'plays', 'playing'], 'Last Sunday menunjukkan simple past. Kata kerja beraturan ditambah -ed.'),
        Q('This bag is ___ than that one.', 'cheaper', ['cheap', 'cheapest', 'more cheap'], 'Comparative untuk kata sifat pendek: adjective + -er + than.'),
        Q('Mount Everest is the ___ mountain in the world.', 'highest', ['higher', 'high', 'more high'], 'Superlative memakai the + adjective + -est.'),
        Q('I ___ visit my grandmother tomorrow.', 'will', ['did', 'was', 'am'], 'Tomorrow menunjukkan masa depan. Gunakan will + verb.'),
        Q('You ___ smoke here. It is forbidden.', 'mustn’t', ['must', 'should', 'will'], 'Mustn’t menyatakan larangan.'),
        Q('The past form of “eat” is ...', 'ate', ['eaten', 'eated', 'eating'], 'Eat adalah kata kerja tak beraturan: eat, ate, eaten.'),
        Q('The post office is ___ the bank and the school.', 'between', ['among', 'under', 'at'], 'Between dipakai untuk posisi di antara dua benda.'),
        Q('I have a toothache. I should ...', 'go to the dentist', ['go to the bank', 'go to the library', 'go to the post office'], 'Sakit gigi diperiksa oleh dokter gigi (dentist).'),
        Q('Which word is usually used to start the steps in a procedure text?', 'First', ['However', 'Because', 'Although'], 'Procedure text memakai urutan: first, then, next, finally.'),
        Q('A: Would you like some tea? B: ___, please.', 'Yes', ['No', 'Sorry', 'Excuse me'], 'Untuk menerima tawaran: Yes, please. Untuk menolak: No, thank you.'),
        Q('There ___ some water in the glass.', 'is', ['are', 'were', 'be'], 'Water tidak dapat dihitung (uncountable), jadi memakai is.'),
        Q('She ___ her homework when I called her.', 'was doing', ['is doing', 'do', 'will do'], 'Kegiatan yang sedang berlangsung di masa lalu memakai past continuous: was/were + V-ing.'),
        Q('The opposite of “expensive” is ...', 'cheap', ['costly', 'high', 'rich'], 'Costly bersinonim dengan expensive. Lawan katanya adalah cheap.')
      ],
      9: [
        Q('She ___ here since 2020.', 'has lived', ['lives', 'lived', 'is living'], 'Since menunjukkan present perfect: has/have + past participle.'),
        Q('The window ___ by the boy yesterday.', 'was broken', ['broke', 'is broken', 'breaks'], 'Kalimat pasif lampau: was/were + past participle.'),
        Q('If it rains tomorrow, we ___ at home.', 'will stay', ['stay', 'stayed', 'would stayed'], 'Conditional type 1: If + simple present, will + verb.'),
        Q('Ani is the girl ___ won the contest.', 'who', ['which', 'whose', 'where'], 'Who dipakai untuk orang sebagai subjek.'),
        Q('In a narrative text, the problem of the story appears in the ...', 'complication', ['orientation', 'resolution', 'coda'], 'Struktur narrative: orientation, complication, resolution.'),
        Q('I have ___ three letters this week.', 'written', ['wrote', 'write', 'writing'], 'Present perfect memakai past participle: write, wrote, written.'),
        Q('The cake ___ by my mother every Sunday.', 'is made', ['makes', 'made', 'is making'], 'Pasif simple present: is/are + past participle.'),
        Q('The coffee is ___ hot to drink.', 'too', ['enough', 'such', 'very'], '“Too + adjective + to + verb” berarti terlalu … untuk ….'),
        Q('Which sentence declines an invitation politely?', 'I’m sorry, I can’t come because I have an exam.', ['I would love to come.', 'Sure, I will be there.', 'Thank you, I accept.'], 'Menolak sopan: minta maaf dan beri alasan.'),
        Q('He said, “I am tired.” → He said that ___.', 'he was tired', ['I am tired', 'he were tired', 'he will tired'], 'Dalam reported speech, kata ganti ikut berubah dan tenses mundur satu tingkat: am menjadi was.'),
        Q('I wish I ___ a bird.', 'were', ['am', 'will be', 'have been'], 'Pengandaian yang tidak nyata memakai were.'),
        Q('A: I love music. B: ___', 'So do I.', ['So am I.', 'Neither do I.', 'Me neither.'], 'Setuju dengan pernyataan positif memakai So + auxiliary + subject. Auxiliary-nya do.'),
        Q('She enjoys ___ novels.', 'reading', ['read', 'to read', 'reads'], 'Enjoy diikuti gerund (V-ing).'),
        Q('The main purpose of an announcement is to ...', 'give information to the public', ['tell a fictional story', 'describe a person', 'persuade people to buy'], 'Pengumuman menyampaikan informasi singkat dan jelas.'),
        Q('If I had a million dollars, I ___ travel the world.', 'would', ['will', 'did', 'am'], 'Conditional type 2: If + simple past, would + verb.')
      ]
    }
  };
  var TOPICS = {
    8: {
      mat: 'Pythagoras, SPLDV, garis lurus, lingkaran, bangun ruang, peluang',
      ipa: 'Pencernaan, darah, getaran, tekanan, cahaya, pesawat sederhana',
      ips: 'VOC, tanam paksa, kerajaan, perlawanan daerah, pergerakan nasional',
      indo: 'Berita, cerpen, drama, ulasan, majas, idiom',
      ing: 'Past tense, continuous, perbandingan, modal, procedure text'
    },
    9: {
      mat: 'Perpangkatan, bentuk akar, kuadrat, transformasi, bangun ruang lengkung',
      ipa: 'Reproduksi, genetika, listrik, kemagnetan, gerhana, bioteknologi',
      ips: 'Proklamasi, perang kemerdekaan, globalisasi, ekonomi, ASEAN',
      indo: 'Argumentasi, persuasi, pidato, kalimat efektif, karya ilmiah',
      ing: 'Present perfect, passive, conditional, reported speech'
    }
  };
  var MORE = {
    mat: {
      7: [
        Q('Faktor prima dari 12 adalah ...', '2 dan 3', ['2, 3, dan 4', '3 dan 4', '1, 2, 3, 4, 6, 12'], '12 = 2 × 2 × 3, jadi faktor primanya hanya 2 dan 3. Faktor 4 dan 6 bukan bilangan prima.'),
        Q('KPK dari 6 dan 8 adalah ...', '24', ['48', '12', '2'], 'Kelipatan 6: 6, 12, 18, 24. Kelipatan 8: 8, 16, 24. Kelipatan persekutuan terkecilnya 24.'),
        Q('FPB dari 12 dan 18 adalah ...', '6', ['36', '3', '12'], 'Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. Faktor persekutuan terbesarnya 6.'),
        Q('Pecahan 2/5 jika dinyatakan dalam persen adalah ...', '40%', ['25%', '4%', '52%'], '2/5 = 40/100 = 40%.'),
        Q('Luas persegi dengan panjang sisi 9 cm adalah ...', '81 cm²', ['36 cm²', '18 cm²', '27 cm²'], 'L = s × s = 9 × 9 = 81 cm². Angka 36 adalah kelilingnya.')
      ],
      8: [
        Q('Jika f(x) = x² − 1, maka f(3) = ...', '8', ['6', '10', '5'], 'f(3) = 3² − 1 = 9 − 1 = 8.'),
        Q('Garis y = −x + 4 memotong sumbu y di titik ...', '(0, 4)', ['(4, 0)', '(0, −4)', '(−4, 0)'], 'Titik potong sumbu y terjadi saat x = 0, sehingga y = 4.'),
        Q('Luas permukaan balok berukuran 5 cm × 4 cm × 3 cm adalah ...', '94 cm²', ['60 cm²', '47 cm²', '188 cm²'], 'L = 2(pl + pt + lt) = 2(20 + 15 + 12) = 94 cm².'),
        Q('Besar sudut-sudut segitiga siku-siku sama kaki adalah ...', '90°, 45°, 45°', ['90°, 60°, 30°', '60°, 60°, 60°', '100°, 40°, 40°'], 'Sudut siku-siku 90°, sisanya 90° dibagi dua sama besar menjadi 45° dan 45°.'),
        Q('Dua koin dilempar bersamaan. Peluang muncul dua angka adalah ...', '1/4', ['1/2', '1/3', '3/4'], 'Ruang sampel: AA, AG, GA, GG (4 kemungkinan). Dua angka hanya 1, jadi peluangnya 1/4.')
      ],
      9: [
        Q('Hasil dari (2³)² adalah ...', '64', ['32', '12', '128'], 'Pangkat dikalikan: 2^(3×2) = 2⁶ = 64.'),
        Q('Hasil dari √9 × √4 adalah ...', '6', ['36', '13', '5'], '√9 = 3 dan √4 = 2, jadi 3 × 2 = 6.'),
        Q('Luas permukaan bola berjari-jari 7 cm (π = 22/7) adalah ...', '616 cm²', ['154 cm²', '308 cm²', '1.436 cm²'], 'L = 4πr² = 4 × 22/7 × 49 = 616 cm².'),
        Q('Titik (2, 3) didilatasi dengan pusat O(0, 0) dan faktor skala 2. Bayangannya adalah ...', '(4, 6)', ['(2, 6)', '(4, 3)', '(8, 12)'], 'Dilatasi mengalikan kedua koordinat dengan faktor skala: (2 × 2, 3 × 2) = (4, 6).'),
        Q('Median dari data 2, 4, 6, 8, 10, 12 adalah ...', '7', ['6', '8', '5'], 'Data berjumlah genap. Median = rata-rata dua data tengah = (6 + 8) / 2 = 7.')
      ]
    },
    ipa: {
      7: [
        Q('Bagian tumbuhan yang berfungsi menyerap air dan mineral dari tanah adalah ...', 'akar', ['batang', 'daun', 'bunga'], 'Akar menyerap air dan mineral, lalu batang mengangkutnya ke bagian lain.'),
        Q('Bahan yang menghantarkan listrik dengan baik adalah ...', 'tembaga', ['kayu', 'plastik', 'karet'], 'Logam seperti tembaga adalah konduktor. Kayu, plastik, dan karet adalah isolator.'),
        Q('Partikel terkecil suatu unsur yang masih memiliki sifat unsur itu adalah ...', 'atom', ['molekul', 'sel', 'senyawa'], 'Atom adalah penyusun terkecil unsur. Molekul terbentuk dari dua atom atau lebih.'),
        Q('Bagian sel yang mengatur seluruh kegiatan sel adalah ...', 'inti sel', ['membran sel', 'vakuola', 'kloroplas'], 'Inti sel (nukleus) menyimpan materi genetik dan mengendalikan aktivitas sel.'),
        Q('Alat untuk mengukur suhu adalah ...', 'termometer', ['barometer', 'higrometer', 'dinamometer'], 'Barometer mengukur tekanan udara, higrometer mengukur kelembapan, dinamometer mengukur gaya.')
      ],
      8: [
        Q('Jantung manusia memiliki ... ruang.', 'empat', ['dua', 'tiga', 'lima'], 'Jantung terdiri dari dua serambi dan dua bilik.'),
        Q('Pembuluh darah yang membawa darah dari jantung ke seluruh tubuh adalah ...', 'arteri', ['vena', 'kapiler', 'limfa'], 'Arteri membawa darah keluar dari jantung. Vena membawa darah kembali ke jantung.'),
        Q('Gelombang yang arah getarnya tegak lurus dengan arah rambatnya disebut gelombang ...', 'transversal', ['longitudinal', 'bunyi', 'tekan'], 'Contoh gelombang transversal adalah gelombang pada tali. Gelombang longitudinal bergetar searah rambatannya.'),
        Q('Lensa cembung bersifat ...', 'mengumpulkan cahaya', ['menyebarkan cahaya', 'memantulkan cahaya', 'menyerap cahaya'], 'Lensa cembung adalah lensa konvergen, yaitu mengumpulkan sinar yang melaluinya.'),
        Q('Benda akan tenggelam di dalam air jika massa jenisnya ...', 'lebih besar dari massa jenis air', ['lebih kecil dari massa jenis air', 'sama dengan massa jenis air', 'tidak berpengaruh'], 'Massa jenis lebih besar membuat benda tenggelam, sama membuatnya melayang, lebih kecil membuatnya terapung.')
      ],
      9: [
        Q('Hormon estrogen dihasilkan oleh ...', 'ovarium', ['testis', 'kelenjar tiroid', 'pankreas'], 'Ovarium (indung telur) menghasilkan estrogen dan progesteron.'),
        Q('Satuan daya listrik adalah ...', 'watt', ['volt', 'ampere', 'ohm'], 'Volt satuan tegangan, ampere satuan kuat arus, ohm satuan hambatan.'),
        Q('Pada rumah, jika satu lampu mati, lampu lain tetap menyala karena dirangkai secara ...', 'paralel', ['seri', 'hubung singkat', 'tanpa sumber'], 'Pada rangkaian paralel setiap lampu punya jalur sendiri ke sumber.'),
        Q('Planet terbesar di tata surya adalah ...', 'Jupiter', ['Saturnus', 'Bumi', 'Neptunus'], 'Jupiter adalah planet raksasa gas terbesar di tata surya.'),
        Q('Buta warna dan hemofilia termasuk penyakit ...', 'keturunan (genetik)', ['menular', 'akibat infeksi bakteri', 'akibat kekurangan gizi'], 'Keduanya diturunkan lewat gen pada kromosom, bukan menular.')
      ]
    },
    ips: {
      7: [
        Q('Benua terkecil di dunia adalah ...', 'Australia', ['Eropa', 'Afrika', 'Antartika'], 'Australia adalah benua dengan luas daratan paling kecil.'),
        Q('Candi Prambanan merupakan peninggalan agama ...', 'Hindu', ['Buddha', 'Islam', 'Kristen'], 'Prambanan adalah kompleks candi Hindu, dipersembahkan untuk Trimurti.'),
        Q('Daratan luas yang datar dan terletak lebih dari 200 m di atas permukaan laut disebut ...', 'dataran tinggi', ['dataran rendah', 'lembah', 'delta'], 'Dataran rendah berada di bawah 200 m dpl, dataran tinggi di atasnya.'),
        Q('Kerajaan Islam pertama di Pulau Jawa adalah ...', 'Demak', ['Majapahit', 'Sriwijaya', 'Singasari'], 'Kesultanan Demak berdiri sekitar akhir abad ke-15 dengan Raden Patah sebagai raja pertama.'),
        Q('Keluarga termasuk kelompok sosial ...', 'primer', ['sekunder', 'formal', 'patembayan'], 'Kelompok primer ditandai hubungan akrab dan langsung, seperti keluarga.')
      ],
      8: [
        Q('Jalan Raya Pos yang dibangun Daendels membentang dari Anyer sampai ...', 'Panarukan', ['Batavia', 'Cirebon', 'Surabaya'], 'Jalan Raya Pos membentang sepanjang Pulau Jawa, dari Anyer (Banten) sampai Panarukan (Jawa Timur).'),
        Q('Perang Padri terjadi di wilayah ...', 'Sumatera Barat', ['Aceh', 'Jawa Tengah', 'Maluku'], 'Perang Padri berlangsung di Minangkabau dan dipimpin Imam Bonjol di pihak Padri.'),
        Q('Kesultanan Aceh mencapai puncak kejayaan pada masa pemerintahan ...', 'Sultan Iskandar Muda', ['Sultan Agung', 'Sultan Hasanuddin', 'Sultan Ageng Tirtayasa'], 'Iskandar Muda berkuasa pada awal abad ke-17 dan memperluas pengaruh Aceh.'),
        Q('Bangsa Eropa pertama yang tiba di Indonesia adalah ...', 'Portugis', ['Belanda', 'Inggris', 'Prancis'], 'Portugis menguasai Malaka pada 1511 dan tiba di Maluku tak lama kemudian.'),
        Q('Pejuang perempuan dari Aceh yang gigih melawan Belanda adalah ...', 'Cut Nyak Dien', ['R.A. Kartini', 'Dewi Sartika', 'Martha Christina Tiahahu'], 'Cut Nyak Dien berjuang melawan Belanda di Aceh. Martha Christina Tiahahu berasal dari Maluku.')
      ],
      9: [
        Q('Pancasila dan UUD 1945 disahkan sebagai dasar negara dan konstitusi pada tanggal ...', '18 Agustus 1945', ['17 Agustus 1945', '1 Juni 1945', '22 Juni 1945'], 'PPKI mengesahkannya sehari setelah proklamasi.'),
        Q('Rancangan Piagam Jakarta dirumuskan oleh ...', 'Panitia Sembilan', ['Panitia Lima', 'Panitia Tujuh', 'Panitia Sepuluh'], 'Panitia Sembilan dibentuk dari anggota BPUPKI dan menyusun Piagam Jakarta pada 22 Juni 1945.'),
        Q('Presiden dan wakil presiden pertama Republik Indonesia adalah ...', 'Soekarno dan Mohammad Hatta', ['Soekarno dan Sutan Sjahrir', 'Mohammad Hatta dan Ahmad Soebardjo', 'Soeharto dan Mohammad Hatta'], 'Keduanya dipilih PPKI pada 18 Agustus 1945.'),
        Q('Agresi Militer Belanda I terjadi pada tahun ...', '1947', ['1945', '1949', '1950'], 'Agresi Militer I dimulai 21 Juli 1947, Agresi Militer II pada Desember 1948.'),
        Q('Perundingan Renville dilaksanakan di atas kapal milik ...', 'Amerika Serikat', ['Inggris', 'Belanda', 'Australia'], 'Perundingan Renville berlangsung di atas kapal USS Renville milik Angkatan Laut Amerika Serikat.')
      ]
    },
    indo: {
      7: [
        Q('Penulisan kata baku yang benar adalah ...', 'objek', ['obyek', 'objeg', 'ovjek'], 'Bentuk baku menurut KBBI adalah objek.'),
        Q('Sinonim kata “pandai” adalah ...', 'cerdas', ['bodoh', 'malas', 'nakal'], 'Sinonim adalah kata yang maknanya sama atau mirip. Lawan katanya bodoh.'),
        Q('Kalimat berikut yang termasuk kalimat deskripsi adalah ...', 'Rambutnya hitam legam dan panjang sebahu.', ['Ayo beli sekarang juga!', 'Pertama, siapkan semua bahan.', 'Kemarin Dika pergi ke Bali.'], 'Kalimat deskripsi melukiskan ciri atau keadaan suatu objek.'),
        Q('Kata yang termasuk kata kerja adalah ...', 'berlari', ['indah', 'meja', 'cepat'], 'Kata kerja menyatakan perbuatan. Indah dan cepat kata sifat, meja kata benda.'),
        Q('Kata ulang “rumah-rumah” bermakna ...', 'banyak rumah', ['saling berumah', 'bermacam-macam rumah', 'seperti rumah'], 'Pengulangan bentuk dasar yang berarti jamak.')
      ],
      8: [
        Q('Kata penghubung “karena” menyatakan hubungan ...', 'sebab', ['tujuan', 'pertentangan', 'waktu'], '“Karena” menghubungkan klausa yang menjelaskan sebab suatu peristiwa.'),
        Q('Kalimat majemuk bertingkat terdapat pada ...', 'Ia tidak masuk sekolah karena sakit.', ['Ani menyapu dan Budi mengepel.', 'Ibu memasak nasi.', 'Adik belajar lalu tidur.'], 'Kalimat majemuk bertingkat memiliki induk kalimat dan anak kalimat yang dihubungkan konjungsi subordinatif, seperti karena.'),
        Q('Teks yang melaporkan hasil pengamatan terhadap suatu objek secara sistematis disebut teks ...', 'laporan hasil observasi', ['fabel', 'iklan', 'puisi'], 'Teks laporan hasil observasi berisi pernyataan umum, deskripsi bagian, dan deskripsi manfaat.'),
        Q('Penulisan kata baku yang benar adalah ...', 'jadwal', ['jadual', 'jadwall', 'jaddwal'], 'Bentuk baku menurut KBBI adalah jadwal.'),
        Q('“Dialah bintang kelas kami.” Majas pada kalimat itu adalah ...', 'metafora', ['simile', 'litotes', 'personifikasi'], 'Metafora membandingkan langsung tanpa kata seperti atau bagai.')
      ],
      9: [
        Q('Penulisan kata baku yang benar adalah ...', 'standar', ['setandar', 'standart', 'standard'], 'Bentuk baku menurut KBBI adalah standar.'),
        Q('Kalimat yang efektif adalah ...', 'Mereka saling membantu.', ['Mereka saling membantu satu sama lain.', 'Mereka saling tolong-menolong satu sama lain.', 'Para mereka saling membantu.'], '“Saling” sudah berarti timbal balik, sehingga “satu sama lain” berlebihan.'),
        Q('Puisi lama empat baris yang bersajak a-b-a-b dan terdiri atas sampiran dan isi adalah ...', 'pantun', ['syair', 'gurindam', 'talibun'], 'Syair bersajak a-a-a-a dan tidak punya sampiran.'),
        Q('Kalimat yang bersifat persuasif adalah ...', 'Mari bersama menjaga kebersihan lingkungan sekolah kita!', ['Kebersihan adalah keadaan bebas dari kotoran.', 'Kemarin sekolah kami mengadakan kerja bakti.', 'Sampah plastik sulit terurai.'], 'Kalimat persuasif mengajak atau membujuk pembaca melakukan sesuatu.'),
        Q('Cerpen yang menggunakan kata “dia” atau “ia” untuk tokohnya bersudut pandang ...', 'orang ketiga', ['orang pertama', 'orang kedua', 'campuran'], 'Pengarang menceritakan tokoh dari luar, tidak sebagai pelaku “aku”.')
      ]
    },
    ing: {
      7: [
        Q('I ___ a student.', 'am', ['is', 'are', 'be'], 'Subjek I selalu berpasangan dengan am.'),
        Q('How many days are there in a week?', 'seven', ['five', 'six', 'eight'], 'Seminggu ada tujuh hari: seven.'),
        Q('The plural of “book” is ...', 'books', ['bookes', 'bookies', 'book'], 'Kebanyakan kata benda ditambah -s untuk bentuk jamak.'),
        Q('What color is the sky on a clear day?', 'blue', ['red', 'green', 'black'], 'Blue berarti biru.'),
        Q('Which one is a fruit?', 'apple', ['chair', 'pencil', 'shirt'], 'Apple adalah apel. Chair kursi, pencil pensil, shirt kemeja.')
      ],
      8: [
        Q('I am ___ than my brother.', 'taller', ['tall', 'tallest', 'more tall'], 'Perbandingan dua orang memakai comparative: tall + -er + than.'),
        Q('She can ___ the piano.', 'play', ['plays', 'played', 'playing'], 'Setelah modal can, kata kerja memakai bentuk dasar (V1).'),
        Q('We ___ dinner when the phone rang.', 'were having', ['are having', 'have had', 'will have'], 'Kegiatan yang sedang berlangsung ketika sesuatu terjadi memakai past continuous.'),
        Q('The opposite of “left” is ...', 'right', ['straight', 'west', 'back'], 'Left berarti kiri, right berarti kanan.'),
        Q('The question “How much is this shirt?” asks about ...', 'the price', ['the size', 'the color', 'the owner'], 'How much dipakai untuk menanyakan harga.')
      ],
      9: [
        Q('I have lived here ___ ten years.', 'for', ['since', 'at', 'in'], 'For dipakai untuk lamanya waktu, since untuk titik awal waktu.'),
        Q('This book ___ by a famous author.', 'was written', ['wrote', 'is write', 'writes'], 'Kalimat pasif lampau: was + past participle.'),
        Q('She said, “I like pizza.” → She said that she ___ pizza.', 'liked', ['likes', 'like', 'will like'], 'Pada reported speech, simple present berubah menjadi simple past.'),
        Q('The girl ___ bag is red is my sister.', 'whose', ['who', 'which', 'whom'], 'Whose menyatakan kepemilikan: tas milik gadis itu.'),
        Q('She is good at ___.', 'singing', ['sing', 'to sing', 'sang'], 'Setelah preposisi at, kata kerja memakai bentuk gerund (V-ing).')
      ]
    }
  };
  SUBJECTS.forEach(function (s) {
    s.bank = s.bank.concat(MORE[s.id][7]);
    EXTRA[s.id][8] = EXTRA[s.id][8].concat(MORE[s.id][8]);
    EXTRA[s.id][9] = EXTRA[s.id][9].concat(MORE[s.id][9]);
  });
  SUBJECTS.forEach(function (s) {
    function conv(a) { return a.map(function (x) { return Q(x.q, x.a, x.w, x.e); }); }
    s.bank = s.bank.concat(conv(NEWQ[s.id][7]));
    EXTRA[s.id][8] = EXTRA[s.id][8].concat(conv(NEWQ[s.id][8]));
    EXTRA[s.id][9] = EXTRA[s.id][9].concat(conv(NEWQ[s.id][9]));
  });
  var MIX = { id: 'campur', abbr: 'MIX', name: 'Campuran', topics: 'Soal acak dari kelima mata pelajaran' };

  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.1 6.6 7.2.9-5.3 5 1.4 7.2L12 18.1 5.6 21.7l1.4-7.2-5.3-5 7.2-.9z"/></svg>';
  var HEART = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-4.5-9.5-9C.8 8.8 2.6 5 6.2 5c2 0 3.3 1 5.8 3.2C14.5 6 15.8 5 17.8 5c3.6 0 5.4 3.800 3.700 7-2.500 4.500-9.500 9-9.500 9z"/></svg>';

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function fmt(n) { return Number(n).toLocaleString('id-ID'); }

  /* ---------- Penyesuaian perangkat, tema, dan animasi ---------- */
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mqTouch = window.matchMedia('(pointer: coarse)');
  // Menandai jenis layar dan cara input di <html> supaya CSS bisa menyesuaikan tampilan.
  function syncDevice() {
    var w = window.innerWidth, h = window.innerHeight, de = document.documentElement;
    de.setAttribute('data-device', w < 640 ? 'phone' : w < 1024 ? 'tablet' : 'desktop');
    de.setAttribute('data-input', mqTouch.matches ? 'touch' : 'mouse');
    de.setAttribute('data-orient', w > h ? 'landscape' : 'portrait');
  }
  syncDevice();
  var devTimer = null;
  window.addEventListener('resize', function () { clearTimeout(devTimer); devTimer = setTimeout(syncDevice, 120); });
  window.addEventListener('orientationchange', syncDevice);

  function themeNow() {
    var t = document.documentElement.getAttribute('data-theme');
    return t || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function paintTheme() {
    $('themebtn').setAttribute('data-mode', themeNow());
    var m = document.getElementById('tcolor');
    if (m) m.setAttribute('content', getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0F1A2D');
  }
  $('themebtn').addEventListener('click', function () {
    var n = themeNow() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', n);
    try { localStorage.setItem('jsmp-theme', n); } catch (e) {}
    paintTheme();
  });
  paintTheme();
  try { window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paintTheme); } catch (e) {}

  function pulse(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function buzz(p) { if (!REDUCE && mqTouch.matches && navigator.vibrate) { try { navigator.vibrate(p); } catch (e) {} } }

  // Angka naik dari 0 ke nilai akhir untuk elemen ber-atribut data-n.
  function countUps(root) {
    var els = root.querySelectorAll('[data-n]');
    for (var i = 0; i < els.length; i++) (function (el) {
      var to = Number(el.getAttribute('data-n')), suf = el.getAttribute('data-suf') || '';
      if (!isFinite(to)) return;
      el.textContent = fmt(to) + suf;
      if (REDUCE || to === 0) return;
      var t0 = performance.now(), dur = 700;
      (function tick(t) {
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(Math.round(to * e)) + suf;
        if (k < 1 && el.isConnected) requestAnimationFrame(tick);
      })(t0);
    })(els[i]);
  }

  function confetti() {
    if (REDUCE) return;
    var cv = document.createElement('canvas');
    cv.className = 'confetti'; cv.setAttribute('aria-hidden', 'true');
    var w = cv.width = window.innerWidth, h = cv.height = window.innerHeight;
    document.body.appendChild(cv);
    var cx = cv.getContext('2d'), cols = ['#FFD43B', '#2F5BEA', '#12805C', '#C2255C', '#6741D9'], ps = [], i;
    for (i = 0; i < 100; i++) ps.push({ x: w / 2 + (Math.random() - .5) * w * .3, y: h * .35, vx: (Math.random() - .5) * 12, vy: -Math.random() * 12 - 3, s: 6 + Math.random() * 7, c: cols[i % cols.length], r: Math.random() * 6, vr: (Math.random() - .5) * .4 });
    var t0 = performance.now(), life = 2600;
    (function f(t) {
      var el = t - t0;
      cx.clearRect(0, 0, w, h);
      ps.forEach(function (p) {
        p.vy += .3; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.r += p.vr;
        cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
        cx.globalAlpha = Math.max(0, 1 - el / life); cx.fillStyle = p.c;
        cx.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * .6); cx.restore();
      });
      if (el < life) requestAnimationFrame(f); else cv.remove();
    })(t0);
  }
  function starsFor(c) { var r = c / TOTAL; return r >= 0.9 ? 3 : r >= 0.7 ? 2 : r >= 0.4 ? 1 : 0; }
  function starsHTML(n) {
    var h = '';
    for (var i = 0; i < 3; i++) h += i < n ? STAR : STAR.replace('<svg', '<svg class="off"');
    return h;
  }
  function lsKey(base) { return base + (typeof cloud !== 'undefined' && cloud && cloud.uid ? ':' + cloud.uid : ''); }
  function loadBest() {
    try { return JSON.parse(localStorage.getItem(lsKey('jsmp-best')) || '{}') || {}; } catch (e) { return {}; }
  }
  function saveBest(b) {
    try { localStorage.setItem(lsKey('jsmp-best'), JSON.stringify(b)); } catch (e) {}
  }

  var G = null, timer = null, lastId = null, grade = 7;
  function bankOf(s) { return grade === 7 ? s.bank : EXTRA[s.id][grade]; }
  function topicsOf(s) { return grade === 7 || !TOPICS[grade][s.id] ? s.topics : TOPICS[grade][s.id]; }
  function setGrade(g, skipSave) {
    grade = g;
    $('gmark').textContent = 'Kelas ' + g;
    var bs = document.querySelectorAll('.gbtn');
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', String(Number(bs[i].getAttribute('data-g')) === g));
    if (!skipSave) { try { localStorage.setItem('jsmp-grade', String(g)); } catch (e) {} }
    renderHome();
    renderBoard();
  }

  var enterTimer = null;
  function showView(name) {
    ['login', 'dash', 'home', 'play', 'result', 'logins', 'materi'].forEach(function (v) { $(v).hidden = v !== name; });
    document.body.setAttribute('data-view', name);
    var sec = $(name);
    sec.classList.remove('enter'); void sec.offsetWidth; sec.classList.add('enter');
    clearTimeout(enterTimer);
    enterTimer = setTimeout(function () { sec.classList.remove('enter'); }, 1300);
    var nb = document.querySelectorAll('[data-go]');
    for (var i = 0; i < nb.length; i++) {
      if (nb[i].getAttribute('data-go') === name) nb[i].setAttribute('aria-current', 'page'); else nb[i].removeAttribute('aria-current');
    }
    countUps(sec);
    window.scrollTo(0, 0);
  }
  function goView(v) { G = null; clearInterval(timer); if (typeof simStop === 'function') simStop(); renderHome(); showView(v); }
  var navb = document.querySelectorAll('[data-go]');
  for (var ni = 0; ni < navb.length; ni++) navb[ni].addEventListener('click', function () { goView(this.getAttribute('data-go')); });
  $('brand').addEventListener('click', function () { goView('dash'); });

  function id_topics(s) { return s.id === 'campur' ? s.topics : topicsOf(s); }
  function renderHome() {
    var best = loadBest(), grid = $('subjects');
    grid.innerHTML = '';
    SUBJECTS.concat([MIX]).forEach(function (s, idx) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'subj' + (s.id === 'campur' ? ' wide' : '');
      b.style.setProperty('--c', 'var(--c-' + s.id + ')');
      b.style.setProperty('--i', idx);
      var badge = document.createElement('span'); badge.className = 'badge'; badge.textContent = s.abbr;
      var h = document.createElement('h3'); h.textContent = s.name;
      var t = document.createElement('span'); t.className = 'topics'; t.textContent = id_topics(s);
      var r = document.createElement('span'); r.className = 'best';
      var rec = best[grade + ':' + s.id];
      if (rec) {
        r.innerHTML = starsHTML(rec.stars).replace(/<svg( class="off")?/g, function (m, off) { return '<svg' + (off ? ' class="off"' : '') + ' style="fill:' + (off ? 'var(--bg)' : 'var(--hl)') + ';stroke:var(--edge);stroke-width:1.5"'; });
        var sp = document.createElement('span'); sp.textContent = 'Terbaik ' + fmt(rec.score);
        r.appendChild(sp);
      } else {
        r.textContent = 'Belum dimainkan';
      }
      b.appendChild(badge); b.appendChild(h); b.appendChild(t); b.appendChild(r);
      b.addEventListener('click', function () { startGame(s.id); });
      grid.appendChild(b);
    });
    var lr = $('learn'); lr.innerHTML = '';
    SUBJECTS.forEach(function (s) {
      var c = document.createElement('button'); c.type = 'button'; c.className = 'chip learnchip';
      c.style.setProperty('--c', 'var(--c-' + s.id + ')'); c.textContent = s.name;
      c.addEventListener('click', function () { openMateri(s.id); });
      lr.appendChild(c);
    });
    renderResume(); renderHistory(); renderDash();
  }

  var cleaners = [], simStop = function () { cleaners.forEach(function (f) { f(); }); cleaners = []; }, mSubj = 'mat';
  function openMateri(id) {
    mSubj = id; simStop();
    var s = SUBJECTS.filter(function (x) { return x.id === id; })[0];
    showView('materi');
    $('mkick').textContent = 'Kelas ' + grade + ' \u00b7 ' + topicsOf(s);
    $('mtitle').textContent = 'Materi ' + s.name;
    var tabs = $('mtabs'); tabs.innerHTML = '';
    SUBJECTS.forEach(function (x) {
      var c = document.createElement('button'); c.type = 'button'; c.className = 'chip learnchip';
      c.style.setProperty('--c', 'var(--c-' + x.id + ')'); c.textContent = x.name;
      c.setAttribute('aria-pressed', String(x.id === id));
      c.addEventListener('click', function () { openMateri(x.id); });
      tabs.appendChild(c);
    });
    var list = $('mlist'); list.innerHTML = '';
    (MATERI[id][grade] || []).forEach(function (t, i) {
      var d = document.createElement('details'); d.className = 'topic'; d.style.setProperty('--c', 'var(--c-' + id + ')');
      d.style.setProperty('--i', i);
      var sm = document.createElement('summary'); sm.textContent = t.title; d.appendChild(sm);
      var ul = document.createElement('ul');
      t.points.forEach(function (p) { var li = document.createElement('li'); li.textContent = p; ul.appendChild(li); });
      d.appendChild(ul);
      if (t.example) { var ex = document.createElement('p'); ex.className = 'example'; var b = document.createElement('b'); b.textContent = 'Contoh: '; ex.appendChild(b); ex.appendChild(document.createTextNode(t.example)); d.appendChild(ex); }
      var mk = simFor(id, grade, i);
      if (mk) {
        var box = document.createElement('div'); box.className = 'simcard';
        var ht = document.createElement('p'); ht.className = 'simhead'; ht.textContent = 'Simulasi interaktif'; box.appendChild(ht);
        var slot = document.createElement('div'); box.appendChild(slot); d.insertBefore(box, ul);
        (function (mk, slot, d) {
          var stop = null;
          function sync() {
            if (d.open && !stop) { try { stop = mk(slot) || function () {}; } catch (e) { slot.textContent = 'Simulasi belum bisa dimuat.'; stop = function () {}; } }
            else if (!d.open && stop) { stop(); stop = null; slot.innerHTML = ''; }
          }
          d.addEventListener('toggle', sync);
          cleaners.push(function () { if (stop) { stop(); stop = null; } });
          if (i === 0) { d.open = true; sync(); }
        })(mk, slot, d);
      } else if (i === 0) d.open = true;
      list.appendChild(d);
    });
    window.scrollTo(0, 0);
  }
  $('mback').addEventListener('click', function () { simStop(); goView('home'); });
  $('mplay').addEventListener('click', function () { simStop(); startGame(mSubj); });

  function buildQuestions(id) {
    var pool;
    if (id === 'campur') {
      pool = [];
      SUBJECTS.forEach(function (s) { bankOf(s).forEach(function (q) { pool.push(q); }); });
    } else {
      pool = SUBJECTS.filter(function (s) { return s.id === id; })[0];
      pool = bankOf(pool);
    }
    return shuffle(pool).slice(0, TOTAL).map(function (q) {
      return { q: q.q, a: q.a, e: q.e, opts: shuffle([q.a].concat(q.w)) };
    });
  }

  function startGame(id) {
    var meta = id === 'campur' ? MIX : SUBJECTS.filter(function (s) { return s.id === id; })[0];
    launch({ id: id, grade: grade, name: meta.name, qs: buildQuestions(id), i: 0, hearts: LIVES, score: 0, streak: 0, bestStreak: 0, correct: 0, log: [], locked: false, left: TIME, t0: 0 });
  }
  function launch(g) {
    G = g; lastId = g.id;
    $('play').style.setProperty('--c', 'var(--c-' + g.id + ')');
    $('who').textContent = 'Kelas ' + g.grade + ' \u00b7 ' + g.name;
    var prog = $('prog'); prog.innerHTML = '';
    G.qs.forEach(function () { prog.appendChild(document.createElement('i')); });
    renderHearts();
    $('score').textContent = fmt(G.score);
    showView('play');
    renderQ();
  }

  function renderHearts() {
    var h = $('hearts'); h.innerHTML = '';
    for (var i = 0; i < LIVES; i++) {
      var s = document.createElement('span');
      s.className = 'heart' + (i < G.hearts ? '' : ' off');
      s.innerHTML = HEART;
      h.appendChild(s);
    }
    h.setAttribute('aria-label', 'Nyawa tersisa ' + G.hearts + ' dari ' + LIVES);
  }

  function markProgress() {
    var items = $('prog').children;
    for (var i = 0; i < items.length; i++) {
      var st = G.log[i];
      items[i].className = st ? (st.ok ? 'ok' : 'no') : (i === G.i ? 'now' : '');
    }
  }

  function renderQ() {
    var q = G.qs[G.i];
    G.locked = false;
    $('qnum').textContent = 'Soal ' + (G.i + 1) + ' dari ' + G.qs.length;
    $('qtext').textContent = q.q;
    var box = $('opts'); box.innerHTML = '';
    q.opts.forEach(function (text, idx) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'opt';
      var k = document.createElement('span'); k.className = 'k'; k.textContent = 'ABCD'.charAt(idx);
      var t = document.createElement('span'); t.textContent = text;
      b.appendChild(k); b.appendChild(t);
      b.addEventListener('click', function () { answer(idx); });
      box.appendChild(b);
    });
    $('fb').hidden = true;
    markProgress();
    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    G.t0 = performance.now();
    G.left = TIME;
    paintTimer();
    timer = setInterval(function () {
      G.left = Math.max(0, TIME - (performance.now() - G.t0) / 1000);
      paintTimer();
      if (G.left <= 0) answer(-1);
    }, 100);
  }
  function paintTimer() {
    $('tfill').style.width = (G.left / TIME * 100) + '%';
    $('tleft').textContent = Math.ceil(G.left) + 's';
    $('timer').className = 'timer' + (G.left <= 5 ? ' low' : '');
  }

  function answer(idx) {
    if (!G || G.locked) return;
    G.locked = true;
    clearInterval(timer);
    var q = G.qs[G.i];
    var right = q.opts.indexOf(q.a);
    var ok = idx === right;
    var gain = 0;
    if (ok) {
      G.streak++;
      G.bestStreak = Math.max(G.bestStreak, G.streak);
      G.correct++;
      gain = 100 + Math.round(G.left / TIME * 50) + (G.streak >= 2 ? Math.min(G.streak - 1, 5) * 10 : 0);
      G.score += gain;
    } else {
      G.streak = 0;
      G.hearts--;
    }
    G.log.push({ q: q, picked: idx >= 0 ? q.opts[idx] : null, ok: ok });
    saveRun();

    var buttons = $('opts').children;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
      if (i === right) buttons[i].classList.add('right');
      else if (i === idx) buttons[i].classList.add('wrong');
      else buttons[i].classList.add('dim');
    }
    var fb = $('fb');
    fb.className = 'fb ' + (ok ? 'ok' : 'no');
    $('verdict').textContent = ok ? ('Benar! +' + gain + ' poin' + (G.streak >= 3 ? ' (beruntun ' + G.streak + ')' : '')) : (idx === -1 ? 'Waktu habis' : 'Kurang tepat');
    $('correctline').textContent = ok ? '' : 'Jawaban yang benar: ' + q.a;
    $('correctline').hidden = ok;
    $('why').textContent = q.e;
    var finished = G.hearts <= 0 || G.i >= G.qs.length - 1;
    $('next').textContent = finished ? 'Lihat hasil' : 'Soal berikutnya';
    fb.hidden = false;
    $('score').textContent = fmt(G.score);
    if (ok) pulse($('score'), 'bump');
    renderHearts();
    if (!ok) { var lostH = $('hearts').children[G.hearts]; if (lostH) lostH.classList.add('lost'); }
    buzz(ok ? 15 : [40, 40, 40]);
    markProgress();
    $('next').focus({ preventScroll: true });
    fb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function showResult() {
    if (!G || G.done) return;
    G.done = true;
    var stars = starsFor(G.correct);
    var best = loadBest();
    var key = G.grade + ':' + G.id;
    var prev = best[key] ? best[key].score : 0;
    var isBest = G.score > prev;
    if (isBest) { best[key] = { score: G.score, stars: Math.max(stars, best[key] ? best[key].stars : 0) }; saveBest(best); }
    else if (best[key] && stars > best[key].stars) { best[key].stars = stars; saveBest(best); }

    $('rsubj').textContent = 'Kelas ' + G.grade + ' · ' + G.name;
    var out = G.hearts <= 0 && G.log.length < G.qs.length;
    $('rtitle').textContent = out ? 'Nyawa habis' : ((G.correct / G.qs.length) >= 0.9 ? 'Misi tuntas dengan gemilang' : (G.correct / G.qs.length) >= 0.7 ? 'Misi tuntas' : 'Misi selesai');
    var rs = $('rstars'); rs.innerHTML = starsHTML(stars); rs.setAttribute('aria-label', stars + ' dari 3 bintang');
    $('rscore').textContent = fmt(G.score);
    $('rscore').setAttribute('data-n', G.score);
    $('newbest').hidden = !(isBest && G.score > 0);
    $('fcorrect').textContent = G.correct + '/' + G.qs.length;
    $('fhearts').textContent = G.hearts;
    $('fstreak').textContent = G.bestStreak;
    $('rmsg').textContent = (G.correct / G.qs.length) >= 0.9 ? 'Luar biasa. Kamu siap menghadapi ulangan.' : (G.correct / G.qs.length) >= 0.7 ? 'Bagus. Tinggal sedikit lagi untuk nilai sempurna.' : (G.correct / G.qs.length) >= 0.4 ? 'Lumayan. Baca penjelasan di bawah, lalu coba lagi.' : 'Jangan menyerah. Pelajari penjelasan di bawah dan ulangi misinya.';

    var wrong = G.log.filter(function (l) { return !l.ok; });
    var list = $('revlist'); list.innerHTML = '';
    wrong.forEach(function (l) {
      var d = document.createElement('div'); d.className = 'rev';
      var a = document.createElement('p'); a.className = 'rq'; a.textContent = l.q.q;
      var b = document.createElement('p'); b.className = 'mine'; b.textContent = l.picked === null ? 'Kamu tidak sempat menjawab.' : 'Jawabanmu: ' + l.picked;
      var c = document.createElement('p'); c.className = 'real'; c.textContent = 'Jawaban benar: ' + l.q.a;
      var e = document.createElement('p'); e.className = 'why'; e.textContent = l.q.e;
      d.appendChild(a); d.appendChild(b); d.appendChild(c); d.appendChild(e);
      list.appendChild(d);
    });
    $('review').hidden = wrong.length === 0;
    pushScore();
    finishRun({ kind: 'done', grade: G.grade, id: G.id, name: G.name, score: G.score, correct: G.correct, total: G.qs.length, stars: stars, hearts: G.hearts, updated: Date.now() });
    showView('result');
    if (stars >= 2) setTimeout(confetti, 250);
  }

  $('next').addEventListener('click', function () {
    if (!G) return;
    if (G.hearts <= 0 || G.i >= G.qs.length - 1) { showResult(); return; }
    G.i++;
    renderQ();
    window.scrollTo(0, 0);
  });
  $('quit').addEventListener('click', function () {
    clearInterval(timer);
    G = null;
    renderHome();
    showView('dash');
  });
  $('again').addEventListener('click', function () { startGame(lastId); });
  $('home2').addEventListener('click', function () { G = null; renderHome(); showView('home'); });

  document.addEventListener('keydown', function (e) {
    if (!G || $('play').hidden || G.locked || e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key.toLowerCase();
    var n = '1234'.indexOf(k);
    if (n < 0) n = 'abcd'.indexOf(k);
    if (n > -1 && n < G.qs[G.i].opts.length) answer(n);
  });

  /* ---------- Hasil pengerjaan langsung tersimpan di akun ---------- */
  var runChain = Promise.resolve();
  function runsRef() { return cloud.db.collection('users/' + cloud.uid + '/runs'); }
  function markReadonly() { cloud.readonly = true; setAccount('readonly'); }

  function saveRun() {
    if (!cloud.db || cloud.readonly || !G) return;
    var snap = {
      grade: G.grade, id: G.id, name: G.name, qs: G.qs, hearts: G.hearts, score: G.score,
      streak: G.streak, bestStreak: G.bestStreak, correct: G.correct,
      log: G.log.map(function (l) { return { p: l.picked, ok: l.ok }; }),
      updated: Date.now()
    };
    runChain = runChain.then(function () { return runsRef().doc('current').set(snap); }).catch(markReadonly);
  }
  function finishRun(rec) {
    if (!cloud.db || cloud.readonly) return;
    runChain = runChain.then(function () {
      return runsRef().doc('r_' + rec.updated).set(rec);
    }).then(function () { return runsRef().doc('current').delete(); }).catch(markReadonly);
  }
  function dropRun() {
    if (!cloud.db || cloud.readonly) return;
    runChain = runChain.then(function () { return runsRef().doc('current').delete(); }).catch(markReadonly);
  }

  function renderResume() {
    var box = $('resume'), c = cloud.cur;
    if (!cloud.db || !c || !c.qs || !c.log || c.hearts <= 0 || c.log.length >= c.qs.length) { box.hidden = true; return; }
    $('rtext').textContent = 'Lanjutkan misi: Kelas ' + c.grade + ' · ' + c.name;
    $('rsub').textContent = 'Soal ' + (c.log.length + 1) + ' dari ' + c.qs.length + ' · ' + fmt(c.score) + ' poin · ' + c.hearts + ' nyawa';
    box.hidden = false;
  }
  function renderHistory() {
    var box = $('hist'), list = $('hlist');
    if (!cloud.db || !cloud.hist || !cloud.hist.length) { box.hidden = true; return; }
    box.hidden = false;
    list.innerHTML = '';
    cloud.hist.slice(0, 6).forEach(function (h) {
      var li = document.createElement('li');
      var a = document.createElement('span'); a.className = 'hn';
      a.textContent = 'Kelas ' + h.grade + ' · ' + h.name;
      var sm = document.createElement('small');
      sm.textContent = new Date(h.updated).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' · ' + h.correct + '/' + h.total + ' benar';
      a.appendChild(sm);
      var sc = document.createElement('span'); sc.className = 'hs'; sc.textContent = fmt(h.score);
      li.appendChild(a); li.appendChild(sc);
      list.appendChild(li);
    });
  }
  function resumeRun() {
    var c = cloud.cur;
    if (!c || !c.qs) return;
    if (c.grade !== grade) setGrade(c.grade, true);
    var log = c.log.map(function (l, idx) { return { q: c.qs[idx], picked: l.p, ok: l.ok }; });
    launch({ id: c.id, grade: c.grade, name: c.name, qs: c.qs, i: log.length, hearts: c.hearts, score: c.score, streak: c.streak || 0, bestStreak: c.bestStreak || 0, correct: c.correct || 0, log: log, locked: false, left: TIME, t0: 0 });
  }

  /* ---------- Dasbor ---------- */
  function greeting() {
    var h = new Date().getHours();
    return h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam';
  }
  function sumBest(best, prefix) {
    var o = { score: 0, stars: 0, played: 0 };
    for (var k in best) {
      if (prefix && k.indexOf(prefix) !== 0) continue;
      var b = best[k];
      if (b && b.score > 0) { o.score += b.score; o.stars += b.stars || 0; o.played++; }
    }
    return o;
  }
  function renderDash() {
    $('greet').textContent = greeting();
    var best = loadBest(), all = sumBest(best, '');
    var rank = '\u2013';
    if (cloud.db && cloud.rows.length) {
      var totals = cloud.rows.map(function (r) { return { id: r.id, t: sumBest(r.best, '').score }; })
        .filter(function (r) { return r.t > 0; })
        .sort(function (a, b) { return b.t - a.t; });
      var at = totals.findIndex(function (r) { return r.id === cloud.uid; });
      if (at >= 0) rank = '#' + (at + 1) + ' dari ' + totals.length;
    }
    var tiles = [['Total poin', fmt(all.score), all.score, ''], ['Bintang', all.stars + ' / 54', all.stars, ' / 54'], ['Mapel dimainkan', all.played + ' / 18', all.played, ' / 18'], ['Peringkat', rank]];
    var tb = $('tiles'); tb.innerHTML = '';
    tiles.forEach(function (t, ti) {
      var d = document.createElement('div'); d.className = 'tile';
      d.style.setProperty('--i', ti);
      var b = document.createElement('b'); b.textContent = t[1];
      if (t.length > 2) { b.setAttribute('data-n', t[2]); b.setAttribute('data-suf', t[3]); }
      var sp = document.createElement('span'); sp.textContent = t[0];
      d.appendChild(b); d.appendChild(sp); tb.appendChild(d);
    });
    var pr = $('prows'); pr.innerHTML = '';
    [7, 8, 9].forEach(function (g, gi2) {
      var x = sumBest(best, g + ':');
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'prow';
      btn.style.setProperty('--i', gi2);
      var a = document.createElement('span'); a.className = 'pg'; a.textContent = 'Kelas ' + g;
      var bar = document.createElement('span'); bar.className = 'pbar';
      var i = document.createElement('i'); i.style.width = Math.round(x.played / 6 * 100) + '%'; bar.appendChild(i);
      var m = document.createElement('span'); m.className = 'pm';
      m.textContent = x.played + ' dari 6 misi \u00b7 ' + x.stars + ' bintang \u00b7 ' + fmt(x.score) + ' poin';
      btn.appendChild(a); btn.appendChild(bar); btn.appendChild(m);
      btn.addEventListener('click', function () { setGrade(g); showView('home'); });
      pr.appendChild(btn);
    });
  }

  /* ---------- Nama samaran (data sintesis, bukan nama akun) ---------- */
  var NICK_ANIMAL = ['Elang', 'Harimau', 'Kancil', 'Komodo', 'Banteng', 'Penyu', 'Lumba', 'Merak', 'Badak', 'Macan'];
  var NICK_TRAIT = ['Gesit', 'Cerdas', 'Berani', 'Ceria', 'Tangkas', 'Cermat', 'Lincah', 'Sakti'];
  var AV_COLORS = ['#2F5BEA', '#12805C', '#C2255C', '#6741D9', '#C2410C', '#0B7285'];
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function randNick() { return pick(NICK_ANIMAL) + pick(NICK_TRAIT) + (10 + Math.floor(Math.random() * 90)); }
  function validNick(n) { return /^[A-Za-z0-9][A-Za-z0-9 _.-]{2,19}$/.test(n); }
  function avatarUrl(nick, av) {
    var ch = /^[A-Za-z0-9]/.test(nick || '') ? nick.charAt(0).toUpperCase() : '?';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="' + AV_COLORS[(av | 0) % AV_COLORS.length] + '"/><circle cx="52" cy="12" r="12" fill="#ffffff" fill-opacity="0.25"/><text x="32" y="43" font-family="Arial,sans-serif" font-size="30" font-weight="700" text-anchor="middle" fill="#ffffff">' + ch + '</text></svg>';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  function loadProf() {
    try {
      var p = JSON.parse(localStorage.getItem(lsKey('jsmp-prof')) || 'null');
      if (p && validNick(p.nick)) return { nick: p.nick, av: (p.av | 0) % AV_COLORS.length };
    } catch (e) {}
    return null;
  }
  function saveProf() { try { localStorage.setItem(lsKey('jsmp-prof'), JSON.stringify(prof)); } catch (e) {} }
  var prof = loadProf();
  if (!prof) { prof = { nick: randNick(), av: Math.floor(Math.random() * AV_COLORS.length) }; saveProf(); }

  /* ---------- Riwayat login (hanya admin) ---------- */
  var LOGIN_KEY = 'jsmp-logins';
  var pendingLogin = false;
  function loadLogins() {
    try { var a = JSON.parse(localStorage.getItem(LOGIN_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  function saveLogins(a) { try { localStorage.setItem(LOGIN_KEY, JSON.stringify(a)); } catch (e) {} }
  function isAdmin(user) {
    var em = ((user && user.email) || '').toLowerCase();
    return !!em && (adminEmails || []).some(function (a) { return String(a).toLowerCase() === em; });
  }
  // Mencatat akun yang masuk. "count" hanya bertambah saat pemain menekan tombol masuk,
  // bukan setiap halaman dibuka ulang.
  function recordLogin(user) {
    if (!user || !user.uid) return;
    var list = loadLogins(), now = Date.now();
    var e = list.filter(function (x) { return x.uid === user.uid; })[0];
    if (!e) { e = { uid: user.uid, first: now, last: now, count: 0 }; list.push(e); }
    e.email = user.email || e.email || '';
    e.name = user.name || e.name || '';
    e.seen = now;
    if (pendingLogin || !e.count) { e.count = (e.count || 0) + 1; e.last = now; }
    pendingLogin = false;
    saveLogins(list);
  }
  function fmtTime(ms) {
    return new Date(ms).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function nickOf(uid) {
    try { var p = JSON.parse(localStorage.getItem('jsmp-prof:' + uid) || 'null'); return p && p.nick ? p.nick : ''; } catch (e) { return ''; }
  }
  function renderLogins() {
    var list = loadLogins().sort(function (a, b) { return b.last - a.last; });
    var ul = $('lglist'); ul.innerHTML = '';
    $('lgnote').textContent = list.length
      ? list.length + ' akun pernah masuk lewat browser ini.'
      : 'Belum ada akun yang masuk di browser ini.';
    list.forEach(function (x) {
      var li = document.createElement('li');
      var a = document.createElement('span'); a.className = 'hn';
      a.textContent = x.name || x.email || 'Tanpa nama';
      var s1 = document.createElement('small'); s1.textContent = x.email || '';
      var nk = nickOf(x.uid);
      var s2 = document.createElement('small');
      s2.textContent = (nk ? 'Nama samaran: ' + nk + ' \u00b7 ' : '') + 'Masuk ' + x.count + 'x \u00b7 Terakhir ' + fmtTime(x.last) + ' \u00b7 Pertama ' + fmtTime(x.first);
      a.appendChild(s1); a.appendChild(s2);
      li.appendChild(a);
      ul.appendChild(li);
    });
  }
  function csvCell(v) {
    v = String(v == null ? '' : v);
    if (/^[=+\-@\t\r]/.test(v)) v = "'" + v;
    return '"' + v.replace(/"/g, '""') + '"';
  }
  function downloadCsv() {
    var rows = [['Nama', 'Email', 'Nama samaran', 'Jumlah masuk', 'Pertama masuk', 'Terakhir masuk']];
    loadLogins().sort(function (a, b) { return b.last - a.last; }).forEach(function (x) {
      rows.push([x.name, x.email, nickOf(x.uid), x.count, new Date(x.first).toISOString(), new Date(x.last).toISOString()]);
    });
    var text = '\ufeff' + rows.map(function (r) { return r.map(csvCell).join(','); }).join('\r\n');
    var url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url; a.download = 'riwayat-login.csv';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  /* ---------- Akun & papan peringkat online ---------- */
  var cloud = { db: null, backend: null, uid: null, readonly: false, rows: [], cur: null, hist: [] };
  var chain = Promise.resolve(), boardTok = 0;

  function mergeBest(a, b) {
    var out = {}, k;
    [a || {}, b || {}].forEach(function (src) {
      for (k in src) {
        if (!src[k] || typeof src[k].score !== 'number') continue;
        var cur = out[k];
        if (!cur) out[k] = { score: src[k].score, stars: src[k].stars || 0 };
        else out[k] = { score: Math.max(cur.score, src[k].score), stars: Math.max(cur.stars, src[k].stars || 0) };
      }
    });
    return out;
  }
  function sameBest(a, b) { return JSON.stringify(mergeBest(a, {})) === JSON.stringify(mergeBest(b, {})); }

  var accMode = 'wait';
  function setAccount(mode) {
    accMode = mode;
    var el = $('acct');
    el.hidden = false;
    el.setAttribute('data-mode', mode);
    var gu = (mode === 'online' || mode === 'readonly') && cloud.user && cloud.user.name ? cloud.user : null;
    var img = $('aimg');
    img.referrerPolicy = 'no-referrer';
    img.onerror = function () { img.onerror = null; img.src = avatarUrl(prof.nick, prof.av); };
    img.src = gu && gu.photo ? gu.photo : avatarUrl(prof.nick, prof.av);
    $('aname').textContent = gu ? gu.name : prof.nick;
    $('astat').textContent = mode === 'offline' ? 'Mode tamu. Skor hanya tersimpan di perangkat ini.'
      : mode === 'readonly' ? 'Skor belum bisa disimpan online. Coba keluar, lalu masuk lagi.'
      : mode === 'online' ? (cloud.backend && cloud.backend.mode === 'local' ? 'Masuk dengan Google. Skormu tersimpan di browser ini.' : 'Masuk dengan Google. Skormu tersimpan online.')
      : 'Menghubungkan...';
    $('logout').hidden = !(mode === 'online' || mode === 'readonly');
    $('loginlink').hidden = mode !== 'offline';
  }

  function pushScore() {
    if (!cloud.db || cloud.readonly) return;
    chain = chain.then(async function () {
      var ref = cloud.db.doc('leaderboard/' + cloud.uid);
      var snap = await ref.get();
      var remote = snap.exists ? ((snap.data() || {}).best || {}) : {};
      var merged = mergeBest(remote, loadBest());
      saveBest(merged);
      await ref.set({ best: merged, nick: prof.nick, av: prof.av, updated: Date.now() });
    }).catch(markReadonly);
  }

  async function renderBoard() {
    var box = $('board');
    if (!cloud.db) { box.hidden = true; return; }
    var tok = ++boardTok;
    box.hidden = false;
    $('bt').textContent = 'Papan peringkat Kelas ' + grade;
    var rows = cloud.rows.map(function (r) {
      var total = 0, stars = 0, n = 0;
      for (var k in r.best) {
        if (k.indexOf(grade + ':') === 0) { total += r.best[k].score || 0; stars += r.best[k].stars || 0; n++; }
      }
      return { id: r.id, total: total, stars: stars, n: n, nick: r.nick, av: r.av };
    }).filter(function (r) { return r.total > 0; });
    rows.sort(function (a, b) { return b.total - a.total || b.stars - a.stars; });
    var list = $('blist');
    if (!rows.length) {
      list.innerHTML = '';
      $('bnote').textContent = 'Belum ada skor di kelas ini. Selesaikan satu misi untuk jadi yang pertama.';
      return;
    }
    var top = rows.slice(0, 10);
    var mine = rows.findIndex(function (r) { return r.id === cloud.uid; });
    if (tok !== boardTok) return;
    list.innerHTML = '';
    top.forEach(function (r, i) {
      var li = document.createElement('li');
      li.className = 'brow' + (r.id === cloud.uid ? ' me' : '');
      li.style.setProperty('--i', i);
      var rk = document.createElement('span'); rk.className = 'rk'; rk.textContent = String(i + 1);
      var im = document.createElement('img'); im.alt = ''; im.width = 32; im.height = 32; im.src = avatarUrl(r.nick, r.av);
      var nm = document.createElement('span'); nm.className = 'nm';
      nm.textContent = (r.nick || 'Pemain') + (r.id === cloud.uid ? ' (kamu)' : '');
      var sub = document.createElement('small'); sub.textContent = r.n + ' mapel · ' + r.stars + ' bintang';
      nm.appendChild(sub);
      var sc = document.createElement('span'); sc.className = 'sc'; sc.textContent = fmt(r.total);
      li.appendChild(rk); li.appendChild(im); li.appendChild(nm); li.appendChild(sc);
      list.appendChild(li);
    });
    $('bnote').textContent = mine >= 0
      ? (mine < 10 ? 'Skor = jumlah skor terbaik semua mapel di kelas ini.' : 'Peringkatmu: #' + (mine + 1) + ' dari ' + rows.length + '. Skor = jumlah skor terbaik semua mapel.')
      : 'Mainkan satu misi untuk masuk papan peringkat.';
  }

  var cloudSubs = [], guestMode = false;
  try { guestMode = sessionStorage.getItem('jsmp-guest') === '1'; } catch (e) {}

  function stopCloud() {
    cloudSubs.forEach(function (u) { try { u(); } catch (e) {} });
    cloudSubs = [];
    cloud.db = null; cloud.uid = null; cloud.rows = []; cloud.cur = null; cloud.hist = []; cloud.readonly = false;
    $('board').hidden = true;
  }

  async function startCloud(be, user) {
    cloud.db = be.db; cloud.uid = user.uid;
    var uid = user.uid;
    prof = loadProf() || { nick: randNick(), av: Math.floor(Math.random() * AV_COLORS.length) };
    saveProf();
    setAccount('online');
    var snap = await cloud.db.doc('leaderboard/' + uid).get();
    if (cloud.uid !== uid) return;
    var rdoc = snap.exists ? (snap.data() || {}) : {};
    var remote = rdoc.best || {};
    var hadNick = validNick(rdoc.nick || '');
    if (hadNick) { prof = { nick: rdoc.nick, av: (rdoc.av | 0) % AV_COLORS.length }; saveProf(); setAccount('online'); }
    var merged = mergeBest(remote, loadBest());
    saveBest(merged);
    renderHome();
    if (!$('login').hidden) showView('dash');
    if (!hadNick || (!sameBest(merged, remote) && Object.keys(merged).length)) pushScore();
    cloudSubs.push(cloud.db.collection('leaderboard').limit(200).onSnapshot(function (s) {
      if (cloud.uid !== uid) return;
      cloud.rows = s.docs.map(function (d) { var v = d.data() || {}; return { id: d.id, best: v.best || {}, nick: v.nick, av: v.av }; });
      // Skor dari perangkat lain masuk otomatis.
      var mine = cloud.rows.filter(function (r) { return r.id === uid; })[0];
      var rem = mine ? mine.best : {};
      if (mine && validNick(mine.nick || '') && (mine.nick !== prof.nick || (mine.av | 0) !== prof.av)) {
        prof = { nick: mine.nick, av: (mine.av | 0) % AV_COLORS.length }; saveProf(); setAccount(accMode);
      }
      var local = loadBest();
      var mg = mergeBest(rem, local);
      if (!sameBest(mg, local)) { saveBest(mg); if (!G) renderHome(); }
      if (!sameBest(mg, rem) && Object.keys(mg).length) pushScore();
      renderBoard();
      renderDash();
    }, function () { $('board').hidden = true; }));
    cloudSubs.push(runsRef().orderBy('updated', 'desc').limit(8).onSnapshot(function (s2) {
      if (cloud.uid !== uid) return;
      cloud.cur = null; cloud.hist = [];
      s2.docs.forEach(function (d) { var v = d.data() || {}; if (d.id === 'current') cloud.cur = v; else cloud.hist.push(v); });
      renderResume(); renderHistory();
    }, function () {}));
  }

  function handleAuth(user) {
    stopCloud();
    cloud.user = user || null;
    $('loginstate').hidden = true;
    $('loginbtns').hidden = false;
    $('loginsbtn').hidden = !isAdmin(user);
    if (user) {
      guestMode = false;
      try { sessionStorage.removeItem('jsmp-guest'); } catch (e) {}
      recordLogin(user);
      startCloud(cloud.backend, user).catch(function () { setAccount('readonly'); });
    } else {
      prof = loadProf() || { nick: randNick(), av: Math.floor(Math.random() * AV_COLORS.length) };
      saveProf();
      renderHome();
      if (guestMode) { setAccount('offline'); showView('dash'); } else { setAccount('wait'); showView('login'); }
    }
  }

  function loginMsg(text) { var m = $('loginmsg'); m.textContent = text; m.hidden = !text; }

  async function initCloud() {
    var be = null, failed = false;
    try {
      var mod = await import(location.search.indexOf('demo') >= 0 ? './backend-mock.js' : './backend-firebase.js');
      be = await mod.createBackend();
    } catch (e) { console.error(e); failed = true; }
    if (!be) {
      $('loginstate').hidden = true;
      $('gsignin').hidden = true;
      $('loginbtns').hidden = false;
      loginMsg(failed
        ? 'Firebase gagal dimuat. Periksa koneksi internet dan buka halaman lewat http://localhost, bukan dengan klik dua kali file. Sementara itu kamu bisa main sebagai tamu.'
        : 'Login Google belum dihubungkan. Isi public/firebase-config.js dulu (lihat README). Sementara itu kamu bisa main sebagai tamu.');
      showView('login');
      return;
    }
    cloud.backend = be;
    be.onAuth(handleAuth);
  }

  $('gsignin').addEventListener('click', async function () {
    loginMsg('');
    $('gsignin').disabled = true;
    pendingLogin = true;
    try { await cloud.backend.signIn(); }
    catch (e) {
      var c = (e && e.code) || '';
      if (c !== 'auth/popup-closed-by-user' && c !== 'auth/cancelled-popup-request') {
        loginMsg(c === 'app/domain-not-allowed' ? 'Akun ini tidak diizinkan. Pakai akun Google sekolah.' : 'Gagal masuk. Periksa koneksi, lalu coba lagi.' + (c ? ' (' + c + ')' : ''));
      }
    }
    $('gsignin').disabled = false;
  });
  $('guestbtn').addEventListener('click', function () {
    guestMode = true;
    try { sessionStorage.setItem('jsmp-guest', '1'); } catch (e) {}
    setAccount('offline');
    showView('dash');
  });
  $('loginsbtn').addEventListener('click', function () { renderLogins(); showView('logins'); });
  $('lgback').addEventListener('click', function () { renderDash(); showView('dash'); });
  $('lgcsv').addEventListener('click', downloadCsv);
  var clearTimer = null;
  $('lgclear').addEventListener('click', function () {
    var b = $('lgclear');
    if (b.getAttribute('data-sure') !== '1') {
      b.setAttribute('data-sure', '1'); b.textContent = 'Yakin? Klik lagi untuk menghapus';
      clearTimer = setTimeout(function () { b.removeAttribute('data-sure'); b.textContent = 'Hapus riwayat'; }, 4000);
      return;
    }
    clearTimeout(clearTimer);
    b.removeAttribute('data-sure'); b.textContent = 'Hapus riwayat';
    saveLogins([]); renderLogins();
  });
  $('loginlink').addEventListener('click', function () { loginMsg(''); showView('login'); });
  $('logout').addEventListener('click', async function () {
    try { await cloud.backend.signOut(); } catch (e) {}
  });

  function nickMsg(text, err) { var m = $('nickmsg'); m.textContent = text; m.className = 'nickmsg' + (err ? ' err' : ''); }
  function setNick(n) {
    prof = { nick: n, av: prof.av };
    saveProf(); setAccount(accMode); pushScore(); renderBoard(); renderDash();
  }

  $('editnick').addEventListener('click', function () {
    var f = $('nickform'); f.hidden = !f.hidden;
    if (!f.hidden) { $('nickin').value = prof.nick; $('nickin').focus(); }
  });
  $('nickrnd').addEventListener('click', function () { $('nickin').value = randNick(); nickMsg('Nama acak dibuat. Tekan Simpan untuk memakainya.', false); });
  $('nickform').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = $('nickin').value.trim();
    if (!validNick(v)) { nickMsg('Pakai 3 sampai 20 karakter: huruf, angka, spasi, titik, strip, atau garis bawah.', true); return; }
    setNick(v);
    $('nickform').hidden = true;
    nickMsg('Nama samaran disimpan. Jangan pakai nama aslimu.', false);
  });
  $('go').addEventListener('click', function () { showView('home'); });
  $('back').addEventListener('click', function () { renderDash(); showView('dash'); });
  $('dash2').addEventListener('click', function () { G = null; renderHome(); showView('dash'); });
  $('rgo').addEventListener('click', resumeRun);
  $('rdrop').addEventListener('click', function () { cloud.cur = null; dropRun(); renderResume(); });
  var gb = document.querySelectorAll('.gbtn');
  for (var gi = 0; gi < gb.length; gi++) gb[gi].addEventListener('click', function () { setGrade(Number(this.getAttribute('data-g'))); });
  var saved = 7;
  try { saved = Number(localStorage.getItem('jsmp-grade')) || 7; } catch (e) {}
  setGrade(saved >= 7 && saved <= 9 ? saved : 7, true);
  setAccount('wait');
  showView('login');
  initCloud();
})();