import { calc, steps, sort, build, fmt } from './engine.js';

/* =================== IPS =================== */
var S = steps, O = sort;
var IPS = {
  7: [
    O({ ask: 'Ciri letak ini termasuk letak apa?', cats: ['Astronomis', 'Geografis', 'Geologis'], items: [
      ['6° LU – 11° LS', 0], ['95° BT – 141° BT', 0], ['Antara Benua Asia dan Australia', 1], ['Antara Samudra Hindia dan Pasifik', 1],
      ['Dilalui jalur Cincin Api Pasifik', 2], ['Pertemuan lempeng Eurasia, Indo-Australia, dan Pasifik', 2]] }),
    O({ ask: 'Bentuk interaksi ini asosiatif atau disosiatif?', cats: ['Asosiatif', 'Disosiatif'], items: [
      ['Kerja bakti membersihkan kampung', 0], ['Dua tim berlomba menjadi juara', 1], ['Pendatang dan warga asli saling menyesuaikan diri', 0], ['Pertikaian antarkelompok', 1], ['Gotong royong membangun mushala', 0], ['Persaingan memperebutkan pembeli', 1]] }),
    S({ steps: [
      ['Produksi', 'Menghasilkan barang dan jasa, misalnya petani menanam padi dan pabrik membuat tekstil.'],
      ['Distribusi', 'Menyalurkan barang dari produsen ke konsumen lewat pedagang, toko, atau pasar.'],
      ['Konsumsi', 'Menggunakan barang dan jasa untuk memenuhi kebutuhan.'],
      ['Kembali ke produksi', 'Permintaan konsumen mendorong produsen berproduksi lagi. Siklus ini disebut perputaran kegiatan ekonomi.']] }),
    S({ steps: [
      ['Paleolitikum', 'Zaman batu tua. Manusia berburu dan meramu, hidup berpindah (nomaden), alat batu kasar.'],
      ['Mesolitikum', 'Zaman batu tengah. Mulai semi-menetap di gua dan tepi pantai, ada kjokkenmoddinger.'],
      ['Neolitikum', 'Zaman batu muda. Bercocok tanam, menetap, alat batu halus seperti kapak persegi.'],
      ['Megalitikum', 'Zaman batu besar. Muncul bangunan batu besar seperti menhir, dolmen, dan sarkofagus.'],
      ['Zaman logam', 'Manusia membuat alat dari perunggu dan besi, contohnya nekara dan kapak corong.']] }),
    S({ steps: [
      ['Kutai (abad ke-4)', 'Kerajaan Hindu tertua di Indonesia, di Kalimantan Timur. Rajanya Mulawarman; bukti: prasasti Yupa.'],
      ['Tarumanegara (abad ke-5)', 'Di Jawa Barat dengan raja Purnawarman; bukti: prasasti Ciaruteun dan Tugu.'],
      ['Sriwijaya (abad ke-7)', 'Kerajaan Buddha maritim di Sumatra Selatan, pusat perdagangan dan pendidikan agama Buddha.'],
      ['Mataram Kuno (abad ke-8)', 'Di Jawa Tengah; membangun Borobudur (Buddha) dan Prambanan (Hindu).'],
      ['Majapahit (1293)', 'Kerajaan di Jawa Timur, mencapai puncak pada masa Hayam Wuruk dan Mahapatih Gajah Mada.']] }),
    S({ steps: [
      ['Pedagang muslim', 'Islam masuk lewat jalur perdagangan yang ramai di pesisir Nusantara.'],
      ['Samudra Pasai', 'Kerajaan Islam pertama di Nusantara, terletak di pesisir utara Sumatra.'],
      ['Demak', 'Kerajaan Islam pertama di Jawa; berkembang di pesisir utara Jawa.'],
      ['Wali Songo', 'Sembilan wali menyebarkan Islam dengan cara damai melalui seni dan budaya.'],
      ['Kerajaan Islam lain', 'Aceh, Banten, Mataram Islam, Gowa-Tallo, serta Ternate dan Tidore.']] }),
    S({ steps: [
      ['1967: berdiri', 'Lima negara pendiri menandatangani Deklarasi Bangkok: Indonesia, Malaysia, Filipina, Singapura, dan Thailand.'],
      ['1984: Brunei Darussalam', 'Menjadi anggota keenam.'],
      ['1995: Vietnam', 'Bergabung sebagai anggota ketujuh.'],
      ['1997: Laos dan Myanmar', 'Bergabung sebagai anggota kedelapan dan kesembilan.'],
      ['1999: Kamboja', 'Bergabung sehingga seluruh sepuluh negara Asia Tenggara menjadi anggota.']] })
  ],
  8: [
    S({ steps: [
      ['1596: Cornelis de Houtman', 'Pelaut Belanda pertama yang tiba di Banten untuk mencari rempah-rempah.'],
      ['1602: VOC dibentuk', 'Kongsi dagang Belanda dengan hak monopoli, hak mencetak uang, dan membentuk pasukan.'],
      ['1619: Batavia', 'Jan Pieterszoon Coen menjadikan Batavia pusat kekuasaan VOC.'],
      ['Monopoli dan hak ekstirpasi', 'VOC memaksa rakyat menjual rempah dengan harga murah dan memusnahkan tanaman yang melebihi kuota.'],
      ['1799: VOC bubar', 'VOC dibubarkan karena korupsi dan utang besar; wilayahnya diambil alih pemerintah Belanda.']] }),
    S({ steps: [
      ['Daendels (1808–1811)', 'Membangun jalan Anyer–Panarukan dengan kerja paksa, memperkuat pertahanan Jawa.'],
      ['Raffles (1811–1816)', 'Menerapkan sistem sewa tanah (landrente) dan membagi Jawa menjadi karesidenan.'],
      ['Tanam Paksa (1830)', 'Gubernur Jenderal Van den Bosch mewajibkan rakyat menanam tanaman ekspor untuk Belanda.'],
      ['Dampak', 'Rakyat menderita kelaparan dan kemiskinan, sementara Belanda memperoleh keuntungan besar.'],
      ['1870: Undang-Undang Agraria', 'Mulai membuka Hindia Belanda bagi modal swasta dan menandai berakhirnya tanam paksa secara bertahap.']] }),
    O({ ask: 'Kegiatan ini termasuk Trias Politika (Trias van Deventer) yang mana?', cats: ['Irigasi', 'Edukasi', 'Emigrasi'], items: [
      ['Membangun bendungan dan saluran air untuk sawah', 0], ['Mendirikan sekolah bagi anak pribumi', 1], ['Memindahkan penduduk Jawa ke luar Jawa', 2],
      ['Memperbaiki pengairan lahan pertanian', 0], ['Memberi pendidikan keterampilan dan guru', 1], ['Mengirim buruh ke perkebunan di Sumatra', 2]] }),
    O({ ask: 'Kerajaan ini bercorak apa?', cats: ['Hindu-Buddha', 'Islam'], items: [
      ['Majapahit', 0], ['Demak', 1], ['Sriwijaya', 0], ['Aceh Darussalam', 1], ['Kutai', 0], ['Banten', 1], ['Tarumanegara', 0], ['Gowa-Tallo', 1]] }),
    O({ ask: 'Tokoh ini berjuang di daerah mana?', cats: ['Maluku', 'Jawa', 'Sumatra', 'Sulawesi'], items: [
      ['Pattimura', 0], ['Pangeran Diponegoro', 1], ['Tuanku Imam Bonjol', 2], ['Sultan Hasanuddin', 3], ['Cut Nyak Dhien', 2], ['Martha Christina Tiahahu', 0], ['Sisingamangaraja XII', 2], ['Untung Surapati', 1]] }),
    S({ steps: [
      ['1908: Budi Utomo', 'Organisasi modern pertama, lahir 20 Mei yang diperingati sebagai Hari Kebangkitan Nasional.'],
      ['1911: Sarekat Dagang Islam', 'Dibentuk Samanhudi di Solo untuk melindungi pedagang pribumi; kemudian menjadi Sarekat Islam.'],
      ['1912: Indische Partij', 'Partai politik pertama yang menuntut Indonesia merdeka (Tiga Serangkai).'],
      ['1927: PNI', 'Didirikan Soekarno dengan tujuan Indonesia merdeka.'],
      ['1928: Sumpah Pemuda', 'Kongres Pemuda II menghasilkan ikrar satu tanah air, satu bangsa, satu bahasa.']] })
  ],
  9: [
    S({ steps: [
      ['6 dan 9 Agustus 1945', 'Bom atom dijatuhkan di Hiroshima dan Nagasaki.'],
      ['14 Agustus 1945', 'Jepang menyerah kepada Sekutu.'],
      ['16 Agustus 1945', 'Peristiwa Rengasdengklok: golongan muda membawa Soekarno dan Hatta agar segera memproklamasikan kemerdekaan.'],
      ['16 Agustus malam', 'Naskah proklamasi disusun di rumah Laksamana Maeda.'],
      ['17 Agustus 1945', 'Soekarno membacakan Proklamasi di Jalan Pegangsaan Timur 56, Jakarta.']] }),
    S({ steps: [
      ['18 Agustus 1945', 'PPKI mengesahkan Pancasila dan UUD 1945 sebagai dasar negara.'],
      ['Memilih pemimpin', 'Soekarno dipilih sebagai Presiden dan Mohammad Hatta sebagai Wakil Presiden.'],
      ['Membentuk KNIP', 'Komite Nasional Indonesia Pusat membantu tugas presiden sebelum ada MPR dan DPR.'],
      ['19 Agustus 1945', 'Wilayah dibagi menjadi 8 provinsi dan dibentuk 12 kementerian.']] }),
    S({ steps: [
      ['10 November 1945', 'Pertempuran Surabaya; diperingati sebagai Hari Pahlawan.'],
      ['Maret 1946', 'Bandung Lautan Api: rakyat membakar kota sebelum ditinggalkan.'],
      ['Juli 1947', 'Agresi Militer Belanda I.'],
      ['Desember 1948', 'Agresi Militer Belanda II; Yogyakarta diduduki.'],
      ['1 Maret 1949', 'Serangan Umum di Yogyakarta membuktikan TNI masih kuat.']] }),
    S({ steps: [
      ['1946: Linggarjati', 'Belanda mengakui Jawa, Sumatra, dan Madura sebagai wilayah de facto Indonesia.'],
      ['1948: Renville', 'Perundingan di atas kapal USS Renville; wilayah Indonesia semakin sempit.'],
      ['1949: Roem–Royen', 'Belanda setuju menghentikan operasi militer dan mengembalikan Yogyakarta.'],
      ['1949: Konferensi Meja Bundar', 'Dilaksanakan di Den Haag untuk menyelesaikan sengketa.'],
      ['27 Desember 1949', 'Belanda mengakui kedaulatan Indonesia.']] }),
    O({ ask: 'Dampak globalisasi ini positif atau negatif?', cats: ['Positif', 'Negatif'], items: [
      ['Informasi menyebar cepat', 0], ['Gaya hidup konsumtif', 1], ['Peluang kerja lintas negara', 0], ['Budaya lokal mulai luntur', 1], ['Teknologi membantu belajar', 0], ['Sikap individualis', 1]] }),
    O({ ask: 'Kegiatan perdagangan ini ekspor atau impor?', cats: ['Ekspor', 'Impor'], items: [
      ['Menjual minyak sawit ke India', 0], ['Membeli gandum dari Australia', 1], ['Mengirim karet ke Tiongkok', 0], ['Mendatangkan mesin pabrik dari Jepang', 1], ['Menjual kopi ke Eropa', 0], ['Membeli suku cadang dari Jerman', 1]] })
  ]
};

/* =================== Bahasa Indonesia =================== */
var INDO = {
  7: [
    O({ ask: 'Tanda baca apa yang tepat?', cats: ['Titik (.)', 'Koma (,)', 'Tanya (?)', 'Seru (!)'], items: [
      ['Adik membaca buku di perpustakaan__', 0], ['Kapan kamu akan pulang__', 2], ['Awas ada ular__', 3], ['Ibu membeli apel__ jeruk, dan mangga', 1], ['Siapa nama temanmu__', 2], ['Tolong ambilkan bukuku__', 0]] }),
    O({ ask: 'Kata ini baku atau tidak baku?', cats: ['Baku', 'Tidak baku'], items: [
      ['apotek', 0], ['apotik', 1], ['risiko', 0], ['resiko', 1], ['analisis', 0], ['analisa', 1], ['izin', 0], ['ijin', 1], ['nasihat', 0], ['nasehat', 1], ['kualitas', 0], ['kwalitas', 1]] }),
    O({ ask: 'Kalimat ini memakai majas apa?', cats: ['Personifikasi', 'Hiperbola', 'Metafora', 'Simile'], items: [
      ['Angin membisikkan rahasia', 0], ['Kakiku mau copot berjalan seharian', 1], ['Perpustakaan itu gudang ilmu', 2], ['Ia bagai singa di arena', 3], ['Matahari tersenyum pagi ini', 0], ['Tangisannya membanjiri seluruh kota', 1], ['Dia bunga desa', 2], ['Wajahnya secerah bulan purnama', 3]] }),
    S({ steps: [
      ['Identifikasi', 'Mengenalkan objek yang dideskripsikan. Contoh: "Danau Toba adalah danau vulkanik terbesar di Asia Tenggara."'],
      ['Deskripsi bagian', 'Menguraikan ciri objek memakai pancaindra: bentuk, warna, ukuran, suara, aroma.'],
      ['Simpulan atau kesan', 'Menegaskan kembali kesan keseluruhan terhadap objek.']] }),
    S({ steps: [
      ['Orientasi', 'Pengenalan tokoh, tempat, dan waktu.'],
      ['Komplikasi', 'Munculnya masalah atau konflik yang dihadapi tokoh.'],
      ['Resolusi', 'Penyelesaian masalah.'],
      ['Koda', 'Pesan atau amanat di akhir cerita.']] }),
    O({ ask: 'Unsur puisi ini termasuk unsur apa?', cats: ['Unsur fisik', 'Unsur batin'], items: [
      ['Diksi', 0], ['Rima', 0], ['Tema', 1], ['Amanat', 1], ['Tipografi', 0], ['Perasaan penyair', 1], ['Imaji', 0], ['Nada', 1]] })
  ],
  8: [
    S({ steps: [
      ['Judul', 'Singkat, menarik, dan menggambarkan isi berita.'],
      ['Teras berita', 'Berisi unsur pokok 5W+1H: apa, siapa, kapan, di mana, mengapa, dan bagaimana.'],
      ['Tubuh berita', 'Rincian peristiwa, kronologi, dan keterangan narasumber.'],
      ['Penutup', 'Informasi tambahan atau penegasan akhir.']] }),
    S({ steps: [
      ['Pengenalan', 'Memperkenalkan tokoh, latar, dan suasana awal.'],
      ['Munculnya konflik', 'Awal pertentangan atau masalah.'],
      ['Klimaks', 'Puncak ketegangan cerita.'],
      ['Antiklimaks', 'Ketegangan mulai menurun.'],
      ['Penyelesaian', 'Konflik selesai dan cerita berakhir.']] }),
    O({ ask: 'Bagian naskah drama ini termasuk apa?', cats: ['Dialog', 'Petunjuk lakuan (kramagung)'], items: [
      ['Ibu: Kamu mau ke mana, Nak?', 0], ['(sambil menangis)', 1], ['(Masuk dari pintu kanan)', 1], ['Rani: Aku pergi dulu, Bu!', 0], ['(Rani menunduk dan berjalan pelan)', 1], ['Ayah: Hati-hati di jalan.', 0]] }),
    S({ steps: [
      ['Orientasi', 'Pengenalan karya yang diulas: judul, pengarang, jenis, dan ringkasan.'],
      ['Tafsiran isi', 'Penjelasan isi atau jalan cerita.'],
      ['Evaluasi', 'Penilaian kelebihan dan kekurangan karya.'],
      ['Rangkuman', 'Simpulan dan saran.']] }),
    O({ ask: 'Kalimat ini memakai majas apa?', cats: ['Ironi', 'Sarkasme', 'Litotes', 'Paradoks'], items: [
      ['Rajin sekali kamu, jam sepuluh baru bangun.', 0], ['Dasar otak udang, begitu saja tidak bisa!', 1], ['Terimalah gubuk kecil kami ini.', 2], ['Dia kesepian di tengah keramaian kota.', 3], ['Pintar sekali kamu, ujian saja gagal.', 0], ['Mampirlah ke gubuk saya.', 2], ['Perilakumu tidak lebih baik dari sampah!', 1]] }),
    O({ ask: 'Apa arti idiom ini?', cats: ['Orang yang disalahkan', 'Bekerja keras', 'Menjadi populer', 'Keras kepala', 'Bahan pembicaraan'], items: [
      ['kambing hitam', 0], ['banting tulang', 1], ['naik daun', 2], ['kepala batu', 3], ['buah bibir', 4]] })
  ],
  9: [
    S({ steps: [
      ['Tesis', 'Pernyataan pendapat atau sudut pandang penulis.'],
      ['Argumen', 'Alasan, data, dan fakta yang mendukung tesis.'],
      ['Penegasan ulang', 'Menegaskan kembali tesis sebagai simpulan.']] }),
    S({ steps: [
      ['Pengenalan isu', 'Memperkenalkan masalah yang menjadi topik.'],
      ['Rangkaian argumen', 'Alasan logis dan data yang meyakinkan pembaca.'],
      ['Pernyataan ajakan', 'Ajakan atau saran agar pembaca bertindak.'],
      ['Penegasan ulang', 'Menegaskan kembali ajakan.']] }),
    S({ steps: [
      ['Salam pembuka', 'Menyapa pendengar dan mengucap salam.'],
      ['Pendahuluan', 'Pengantar topik dan tujuan pidato.'],
      ['Isi', 'Gagasan utama dan penjelasannya.'],
      ['Penutup', 'Simpulan, harapan, dan salam penutup.']] }),
    O({ ask: 'Kalimat ini efektif atau tidak efektif?', cats: ['Efektif', 'Tidak efektif'], items: [
      ['Naik ke atas', 1], ['Hadirin dimohon berdiri', 0], ['Para guru-guru', 1], ['Meskipun hujan, tetapi dia berangkat', 1], ['Saya menunggu di sini', 0], ['Mundur ke belakang', 1], ['Dia berangkat ke sekolah', 0], ['Ibu pergi ke pasar membeli sayur', 0]] }),
    S({ steps: [
      ['Judul', 'Menggambarkan masalah yang diteliti.'],
      ['Latar belakang', 'Alasan dan pentingnya masalah dipilih.'],
      ['Rumusan masalah dan tujuan', 'Pertanyaan yang ingin dijawab.'],
      ['Metode', 'Cara pengumpulan dan pengolahan data.'],
      ['Hasil dan pembahasan', 'Temuan serta analisisnya.'],
      ['Simpulan dan daftar pustaka', 'Jawaban atas masalah dan sumber rujukan.']] }),
    build({
      groups: [['Jenis kutipan', ['Langsung', 'Tidak langsung']], ['Bagian', ['Cara menulis', 'Daftar pustaka (buku)']]],
      make: function (s) {
        if (s[1] === 1) return ['Nama Belakang, Inisial. Tahun. Judul Buku. Kota: Penerbit.', 'Urutan daftar pustaka buku: nama penulis, tahun, judul (dicetak miring), kota terbit, penerbit. Disusun menurut abjad nama penulis.'];
        return s[0] === 0 ? ['Menurut Nama (Tahun: halaman), "kalimat yang dikutip persis sama".', 'Kutipan langsung memakai tanda petik dan sama persis dengan aslinya.'] : ['Nama (Tahun) menyatakan bahwa isi pendapat ditulis dengan kalimat sendiri.', 'Kutipan tidak langsung tanpa tanda petik, isi disampaikan dengan bahasa sendiri.'];
      }
    })
  ]
};

/* =================== Bahasa Inggris =================== */
var ING = {
  7: [
    build({
      groups: [['Subjek', ['I', 'You', 'He', 'She', 'It', 'We', 'They']], ['Bentuk', ['Positif', 'Negatif', 'Tanya']]],
      make: function (s) {
        var P = ['I', 'You', 'He', 'She', 'It', 'We', 'They'][s[0]], be = ['am', 'are', 'is', 'is', 'is', 'are', 'are'][s[0]], c = be.charAt(0).toUpperCase() + be.slice(1);
        var pred = s[0] === 0 || s[0] === 1 || s[0] > 4 ? 'happy' : 'happy';
        if (s[1] === 0) return [P + ' ' + be + ' ' + pred + '.', 'Gunakan ' + be + ' setelah ' + P + '.'];
        if (s[1] === 1) return [P + ' ' + be + ' not ' + pred + '.', 'Negatif: tambahkan not setelah to be.'];
        return [c + ' ' + P.toLowerCase().replace(/^i$/, 'I') + ' ' + pred + '?', 'Tanya: to be dipindah ke depan subjek.'];
      }
    }),
    build({
      groups: [['Subjek', ['I', 'She', 'They']], ['Kata kerja', ['play', 'study', 'watch', 'go']], ['Bentuk', ['Positif', 'Negatif', 'Tanya']]],
      make: function (s) {
        var V = [['play', 'plays'], ['study', 'studies'], ['watch', 'watches'], ['go', 'goes']][s[1]], third = s[0] === 1, S = ['I', 'She', 'They'][s[0]];
        var pr = third ? V[1] : V[0], aux = third ? 'does' : 'do';
        if (s[2] === 0) return [S + ' ' + pr + ' every day.', third ? 'Subjek he/she/it: verba ditambah -s/-es (' + V[1] + ').' : 'Subjek I/you/we/they memakai bentuk dasar verba.'];
        if (s[2] === 1) return [S + ' ' + aux + ' not ' + V[0] + ' every day.', 'Negatif: ' + aux + ' not + verba bentuk dasar (tanpa -s).'];
        return [aux.charAt(0).toUpperCase() + aux.slice(1) + ' ' + S.toLowerCase().replace(/^i$/, 'I') + ' ' + V[0] + ' every day?', 'Tanya: ' + aux + ' + subjek + verba bentuk dasar.'];
      }
    }),
    O({ ask: 'Pilih preposisi yang tepat untuk waktu ini.', cats: ['in', 'on', 'at'], items: [
      ['___ Monday', 1], ['___ 7 o\'clock', 2], ['___ July', 0], ['___ the morning', 0], ['___ night', 2], ['___ 17 August 1945', 1], ['___ 2020', 0], ['___ Sunday morning', 1], ['___ noon', 2]] }),
    calc({
      label: 'Jam dan cara mengucapkan waktu', play: 0,
      ctl: [['Jam', 1, 12, 3], ['Menit (0/15/30/45)', 0, 45, 15, 15]],
      draw: function (v, G) {
        var hr = v[0], mn = v[1], cx = 110, cy = 110, r = 90, W = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
        G.C(cx, cy, r, 'var(--surface)', 'var(--edge)');
        for (var i = 1; i <= 12; i++) { var a = i * Math.PI / 6 - Math.PI / 2; G.T(cx + 74 * Math.cos(a), cy + 74 * Math.sin(a) + 5, String(i), 13); }
        var ah = ((hr % 12) + mn / 60) * Math.PI / 6 - Math.PI / 2, am = mn * Math.PI / 30 - Math.PI / 2;
        G.L(cx, cy, cx + 48 * Math.cos(ah), cy + 48 * Math.sin(ah), 'var(--c-indo)', 6); G.L(cx, cy, cx + 70 * Math.cos(am), cy + 70 * Math.sin(am), 'var(--c-mat)', 4); G.C(cx, cy, 5, 'var(--edge)');
        var nxt = W[hr % 12 + 1], txt = mn === 0 ? W[hr] + " o'clock" : mn === 15 ? 'a quarter past ' + W[hr] : mn === 30 ? 'half past ' + W[hr] : 'a quarter to ' + nxt;
        G.T(280, 100, (hr < 10 ? hr : hr) + ':' + (mn < 10 ? '0' + mn : mn), 26, 'var(--c-mat)', 'middle');
        return "It's " + txt + '. Menit 0 = o\'clock, 15 = quarter past, 30 = half past, 45 = quarter to (jam berikutnya).';
      }
    }),
    O({ ask: 'Kata ganti ini termasuk jenis apa?', cats: ['Subject (I, we...)', 'Object (me, us...)', 'Possessive (my, our...)'], items: [
      ['I', 0], ['me', 1], ['my', 2], ['we', 0], ['us', 1], ['our', 2], ['they', 0], ['them', 1], ['their', 2], ['he', 0], ['him', 1]] }),
    O({ ask: 'Kata ini termasuk kosakata apa?', cats: ['Keluarga (family)', 'Tempat (places)'], items: [
      ['mother', 0], ['library', 1], ['uncle', 0], ['hospital', 1], ['grandfather', 0], ['market', 1], ['cousin', 0], ['school', 1], ['brother', 0], ['bank', 1]] })
  ],
  8: [
    build({
      groups: [['Kata kerja', ['go', 'play', 'eat', 'study', 'buy']], ['Bentuk', ['Positif', 'Negatif', 'Tanya']]],
      make: function (s) {
        var V = [['go', 'went'], ['play', 'played'], ['eat', 'ate'], ['study', 'studied'], ['buy', 'bought']][s[0]];
        if (s[1] === 0) return ['She ' + V[1] + ' yesterday.', 'Past tense: verba bentuk kedua (V2). ' + (['went', 'ate', 'bought'].indexOf(V[1]) >= 0 ? V[0] + ' tidak beraturan → ' + V[1] : V[0] + ' beraturan → ' + V[1]) + '.'];
        if (s[1] === 1) return ['She did not ' + V[0] + ' yesterday.', 'Negatif: did not + verba bentuk dasar (V1).'];
        return ['Did she ' + V[0] + ' yesterday?', 'Tanya: Did + subjek + verba bentuk dasar (V1).'];
      }
    }),
    build({
      groups: [['Subjek', ['I', 'She', 'They']], ['Kata kerja', ['read', 'run', 'write', 'study']], ['Bentuk', ['Positif', 'Negatif', 'Tanya']]],
      make: function (s) {
        var S = ['I', 'She', 'They'][s[0]], be = ['am', 'is', 'are'][s[0]], ing = ['reading', 'running', 'writing', 'studying'][s[1]];
        if (s[2] === 0) return [S + ' ' + be + ' ' + ing + ' now.', 'Present continuous: am/is/are + V-ing untuk kegiatan yang sedang berlangsung.'];
        if (s[2] === 1) return [S + ' ' + be + ' not ' + ing + ' now.', 'Negatif: not setelah am/is/are.'];
        return [be.charAt(0).toUpperCase() + be.slice(1) + ' ' + S.toLowerCase().replace(/^i$/, 'I') + ' ' + ing + ' now?', 'Tanya: am/is/are dipindah ke depan subjek.'];
      }
    }),
    build({
      groups: [['Subjek', ['I', 'She', 'They']], ['Penghubung', ['when', 'while']]],
      make: function (s) {
        var S = ['I', 'She', 'They'][s[0]], was = s[0] === 2 ? 'were' : 'was';
        return s[1] === 0 ? [S + ' ' + was + ' reading when the phone rang.', 'Past continuous (was/were + V-ing) = kegiatan yang sedang berlangsung, lalu dipotong kejadian singkat (past simple) dengan when.'] : [S + ' ' + was + ' reading while it was raining.', 'While dipakai untuk dua kegiatan yang berlangsung bersamaan di masa lampau.'];
      }
    }),
    build({
      groups: [['Kata sifat', ['tall', 'big', 'beautiful', 'good']], ['Tingkat', ['Equal (sama)', 'Comparative', 'Superlative']]],
      make: function (s) {
        var A = [['tall', 'taller', 'the tallest'], ['big', 'bigger', 'the biggest'], ['beautiful', 'more beautiful', 'the most beautiful'], ['good', 'better', 'the best']][s[0]];
        if (s[1] === 0) return ['Rina is as ' + A[0] + ' as Budi.', 'Sama: as + adjektiva + as.'];
        if (s[1] === 1) return ['Rina is ' + A[1] + ' than Budi.', 'Perbandingan dua hal: ' + (s[0] === 2 ? 'more + adjektiva panjang' : s[0] === 3 ? 'good → better (tidak beraturan)' : 'adjektiva pendek + -er') + ' + than.'];
        return ['Rina is ' + A[2] + ' in the class.', 'Paling di antara banyak hal: the + ' + (s[0] === 2 ? 'most + adjektiva panjang' : s[0] === 3 ? 'best (tidak beraturan)' : 'adjektiva + -est') + '.'];
      }
    }),
    O({ ask: 'Modal verb ini menyatakan apa?', cats: ['Kemampuan', 'Kewajiban', 'Izin', 'Saran'], items: [
      ['She can swim.', 0], ['You must wear a helmet.', 1], ['May I come in?', 2], ['You should sleep early.', 3], ['He could read at the age of four.', 0], ['Students must obey the rules.', 1], ['Can I borrow your pen?', 2], ['You ought to see a doctor.', 3]] }),
    S({ steps: [
      ['Goal (tujuan)', 'Judul/tujuan teks. Contoh: How to Make Tea.'],
      ['Materials (bahan)', 'Daftar alat dan bahan: a cup, tea bag, hot water, sugar.'],
      ['Steps (langkah)', 'Urutan dengan kata penghubung First, Then, Next, After that, Finally.'],
      ['Contoh langkah', 'First, put a tea bag into the cup. Then, pour hot water. Finally, add sugar and stir.']] })
  ],
  9: [
    build({
      groups: [['Subjek', ['I', 'She', 'They']], ['Kata kerja', ['eat', 'finish', 'see', 'write']], ['Bentuk', ['Positif', 'Negatif', 'Tanya']]],
      make: function (s) {
        var S = ['I', 'She', 'They'][s[0]], hv = s[0] === 1 ? 'has' : 'have', V3 = ['eaten', 'finished', 'seen', 'written'][s[1]];
        if (s[2] === 0) return [S + ' ' + hv + ' ' + V3 + ' already.', 'Present perfect: have/has + V3. Dipakai untuk kejadian lampau yang masih berhubungan dengan sekarang.'];
        if (s[2] === 1) return [S + ' ' + hv + ' not ' + V3 + ' yet.', 'Negatif: have/has not + V3, sering dengan yet.'];
        return [hv.charAt(0).toUpperCase() + hv.slice(1) + ' ' + S.toLowerCase().replace(/^i$/, 'I') + ' ' + V3 + ' yet?', 'Tanya: Have/Has + subjek + V3.'];
      }
    }),
    build({
      groups: [['Waktu', ['Present', 'Past', 'Future']], ['Kalimat', ['write a letter', 'eat an apple', 'clean the room']]],
      make: function (s) {
        var V = [['writes', 'wrote', 'write', 'written', 'A letter'], ['eats', 'ate', 'eat', 'eaten', 'An apple'], ['cleans', 'cleaned', 'clean', 'cleaned', 'The room']][s[1]];
        var obj = [' a letter', ' an apple', ' the room'][s[1]];
        if (s[0] === 0) return ['Active: Ani ' + V[0] + obj + '.  Passive: ' + V[4] + ' is ' + V[3] + ' by Ani.', 'Present: is/am/are + V3.'];
        if (s[0] === 1) return ['Active: Ani ' + V[1] + obj + '.  Passive: ' + V[4] + ' was ' + V[3] + ' by Ani.', 'Past: was/were + V3.'];
        return ['Active: Ani will ' + V[2] + obj + '.  Passive: ' + V[4] + ' will be ' + V[3] + ' by Ani.', 'Future: will be + V3.'];
      }
    }),
    build({
      groups: [['Tipe', ['Zero', 'Type 1']], ['Contoh', ['Contoh A', 'Contoh B', 'Contoh C']]],
      make: function (s) {
        var Z = ['If you heat water to 100°C, it boils.', 'If you mix red and blue, you get purple.', 'If you freeze water, it becomes ice.'];
        var F = ['If it rains tomorrow, I will stay at home.', 'If you study hard, you will pass the exam.', 'If she calls, I will answer.'];
        return s[0] === 0 ? [Z[s[1]], 'Zero conditional: If + simple present, simple present. Dipakai untuk fakta ilmiah/kebiasaan.'] : [F[s[1]], 'Type 1: If + simple present, will + V1. Dipakai untuk kemungkinan nyata di masa depan.'];
      }
    }),
    build({
      groups: [['Tipe', ['Type 2', 'Type 3']], ['Contoh', ['Contoh A', 'Contoh B', 'Contoh C']]],
      make: function (s) {
        var T2 = ['If I had a lot of money, I would buy a house.', 'If I were a bird, I would fly to you.', 'If I were you, I would study harder.'];
        var T3 = ['If I had studied, I would have passed the test.', 'If it had not rained, we would have gone to the beach.', 'If she had left earlier, she would not have missed the bus.'];
        return s[0] === 0 ? [T2[s[1]], 'Type 2: If + simple past, would + V1. Pengandaian yang tidak nyata di masa kini.'] : [T3[s[1]], 'Type 3: If + past perfect, would have + V3. Penyesalan tentang masa lalu.'];
      }
    }),
    build({
      groups: [['Direct speech', ['Present simple', 'Present continuous', 'Past simple', 'Will']], ['Pelaku', ['Tono', 'Rina']]],
      make: function (s) {
        var N = ['Tono', 'Rina'][s[1]], p = s[1] === 0 ? 'he' : 'she';
        var D = ['"I like football."', '"I am reading a book."', '"I visited Bali."', '"I will come tomorrow."'][s[0]];
        var R = ['liked football.', 'was reading a book.', 'had visited Bali.', 'would come the next day.'][s[0]];
        return [N + ' said, ' + D + '  →  ' + N + ' said that ' + p + ' ' + R, 'Kata kerja mundur satu tingkat (backshift) dan pronomina ikut menyesuaikan.'];
      }
    }),
    build({
      groups: [['Direct question', ['Do you like music?', 'Where do you live?', 'Are you tired?', 'What are you doing?']]],
      make: function (s) {
        var R = ['Ani asked if I liked music.', 'Ani asked where I lived.', 'Ani asked if I was tired.', 'Ani asked what I was doing.'][s[0]];
        return ['Ani asked, "' + ['Do you like music?', 'Where do you live?', 'Are you tired?', 'What are you doing?'][s[0]] + '"  →  ' + R, 'Yes/No question memakai if/whether; WH-question mempertahankan kata tanyanya. Susunan kembali seperti kalimat berita (tanpa do/does/did).'];
      }
    })
  ]
};

export { IPS, INDO, ING };
