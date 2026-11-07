# Jelajah SMP dengan login Google

Game kuis SMP kelas 7, 8, dan 9 (300 soal, 20 soal per misi). Pemain masuk dengan akun Google, lalu progresnya tersimpan online dan terbaca di perangkat mana pun.

Semuanya JavaScript di browser. Tidak ada server sendiri dan tidak perlu `npm`. Login diverifikasi oleh Firebase Authentication, data disimpan di Cloud Firestore, dan siapa boleh membaca atau menulis apa ditentukan oleh `firestore.rules`.

## Tampilan responsif
Tampilan menyesuaikan perangkat secara otomatis:
- **HP (di bawah 640px):** satu kolom, menu bawah (Dasbor, Pilih mapel), area ketuk besar, panel penjelasan menempel di bawah layar, getar singkat saat menjawab.
- **HP miring:** soal di kiri dan pilihan jawaban di kanan supaya muat tanpa menggulir.
- **Tablet (640px ke atas):** menu atas, kartu statistik empat kolom, pilihan jawaban dua kolom.
- **Desktop (1024px ke atas):** dasbor dua kolom, papan peringkat di samping daftar mapel, hasil misi dengan daftar soal yang perlu diulang di samping, tombol 1 sampai 4 atau A sampai D untuk menjawab.
- Tombol bulan/matahari di bilah atas mengganti tema terang atau gelap, dan pilihannya diingat.
- Animasi dimatikan otomatis bagi pengguna yang memilih "kurangi gerakan" di sistemnya.

## Dua mode penyimpanan

Atur di `public/firebase-config.js` pada `storageMode`:

| Mode | Skor dan progres disimpan di | Pindah antarperangkat | Perlu Firestore |
| --- | --- | --- | --- |
| `'local'` (bawaan) | localStorage di browser | tidak | tidak |
| `'cloud'` | Cloud Firestore | ya | ya (langkah 1.3 dan 3 di bawah) |

Login Google memakai Firebase Authentication pada kedua mode, jadi langkah mengaktifkan Google dan mengisi `apiKey` serta `appId` tetap diperlukan. Di mode `'local'`, progres tiap akun dipisah di browser yang sama, sehingga cocok untuk komputer lab yang dipakai bergantian. Papan peringkat hanya berisi pemain di browser itu.

## Menu Riwayat login

Menu ini mencatat akun Google yang masuk (nama, email, jumlah masuk, waktu pertama dan terakhir masuk) dan menampilkannya sebagai daftar. Ada tombol **Unduh CSV** dan **Hapus riwayat**.

Agar menu muncul, isi `adminEmails` di `public/firebase-config.js` dengan emailmu, misalnya `['emailku@gmail.com']`. Menu hanya tampil untuk email di daftar itu, lalu muncul sebagai tautan **Riwayat login** di dasbor setelah kamu masuk.

Batasannya:
- Daftar disimpan di localStorage, jadi hanya berisi akun yang masuk lewat browser itu. Orang yang masuk dari perangkat lain tidak ikut tercatat.
- Daftar semua akun dari semua perangkat sudah tersedia di **Firebase Console > Authentication > Users** (email, tanggal dibuat, terakhir masuk). Itu sumber yang paling lengkap.
- Karena datanya di browser, pemeriksaan admin hanya mengatur tampilan. Siswa yang paham alat pengembang browser bisa melihat isi localStorage di perangkatnya sendiri. Kalau nanti butuh daftar bersama yang benar-benar tertutup, simpan di Firestore dengan aturan khusus admin.

## Cara kerja login

1. Pemain menekan **Masuk dengan Google**. Browser membuka jendela login Google.
2. Google mengembalikan token ID yang ditandatangani. Firebase Authentication memeriksa tanda tangan, penerbit, penerima, dan masa berlakunya.
3. Setiap permintaan ke Firestore membawa token itu. Firestore menjalankan `firestore.rules` terhadap `request.auth` (uid dan email terverifikasi) sebelum mengizinkan baca atau tulis.
4. Aplikasi hanya memakai `uid` dari akun. Nama, email, dan foto Google tidak ditampilkan dan tidak disimpan di Firestore. Di papan peringkat pemain memakai nama samaran.

Yang tersimpan per pemain:

| Lokasi | Isi | Siapa yang boleh baca |
| --- | --- | --- |
| `leaderboard/{uid}` | nama samaran, avatar, skor terbaik per mapel | semua pemain yang sudah masuk |
| `users/{uid}/runs/current` | misi yang sedang berjalan (untuk dilanjutkan) | hanya pemilik |
| `users/{uid}/runs/r_...` | riwayat misi selesai | hanya pemilik |

## Pemasangan (sekitar 15 menit)

### 1. Buat project Firebase
1. Buka https://console.firebase.google.com dan pilih **Add project**. Google Analytics boleh dimatikan.
2. Di menu **Build > Authentication**, tekan **Get started**, buka tab **Sign-in method**, pilih **Google**, aktifkan, isi email dukungan, lalu simpan.
3. Di menu **Build > Firestore Database**, tekan **Create database**, pilih **Production mode**, dan lokasi `asia-southeast2 (Jakarta)`.

### 2. Hubungkan aplikasi
1. Di **Project settings > General > Your apps**, tekan ikon web `</>`, beri nama, lalu daftarkan.
2. Salin nilai `apiKey`, `authDomain`, `projectId`, dan `appId` ke `public/firebase-config.js`. Nilai ini memang boleh publik.

### 3. Pasang aturan keamanan
Pilih salah satu:
- **Lewat console:** buka **Firestore Database > Rules**, tempel seluruh isi `firestore.rules`, lalu **Publish**.
- **Lewat CLI** (langkah 4).

Tanpa langkah ini data tidak terlindungi sebagaimana mestinya, jadi jangan dilewati.

### 4. Pasang ke internet
**Opsi A, Firebase Hosting (disarankan, gratis):**
```
npm install -g firebase-tools
firebase login
firebase use --add          # pilih project tadi
firebase deploy --only firestore:rules,hosting
```
Alamatnya `https://NAMA-PROJECT.web.app`. Domain ini otomatis diizinkan untuk login.

**Opsi B, hosting lain** (Netlify, GitHub Pages, hosting sekolah): unggah isi folder `public/`. Lalu tambahkan domainnya di **Authentication > Settings > Authorized domains**. Aturan keamanan tetap dipasang lewat console (langkah 3).

### 5. Coba di komputer sendiri
```
python3 -m http.server -d public 8080
```
Buka http://localhost:8080 (localhost sudah diizinkan Firebase). Kalau memakai alamat `127.0.0.1` (misalnya Live Server di VS Code), tambahkan `127.0.0.1` di **Authentication > Settings > Authorized domains**, atau buka lewat `localhost`. Tanpa itu login Google ditolak dengan galat `auth/unauthorized-domain`. Halaman harus dibuka lewat `http://`, bukan dengan klik dua kali file.

Tanpa Firebase, `http://localhost:8080/index.html?demo` membuka mode contoh. Akun dan data pura-pura disimpan di browser itu saja. Jangan dipakai untuk siswa.

## Membatasi ke akun sekolah (opsional)
1. Di `public/firebase-config.js`, isi `allowedEmailDomain` dengan domain sekolah, misalnya `'sekolahku.sch.id'`. Ini hanya mengatur tampilan dan penolakan di layar.
2. Pembatasan yang sebenarnya ada di `firestore.rules`: aktifkan fungsi `schoolOnly()` (hapus tanda `//`) dan tambahkan `&& schoolOnly()` di dalam `signedIn()`. Dengan begitu akun di luar domain tidak bisa membaca atau menulis data sama sekali.

## Melihat siapa saja yang sudah masuk
Daftar akun (email, tanggal masuk) ada di **Firebase Console > Authentication > Users**, dan hanya terlihat oleh pemilik project. Skor ada di **Firestore Database > leaderboard**. Satu dokumen mewakili satu uid, dan uid bisa dicocokkan dengan akun di daftar Users.

## Batasan yang perlu diketahui
- **Skor dikirim dari browser.** Siswa yang paham alat pengembang browser bisa mengubah skornya sendiri. Aturan Firestore hanya memastikan dokumen milik uid-nya sendiri dan bentuknya benar, bukan memeriksa kebenaran skor. Untuk lomba resmi, pindahkan penilaian ke Cloud Functions.
- **Nama samaran tidak disaring.** Aplikasi hanya membatasi karakter dan panjang (3 sampai 20). Siswa bisa mengetik kata yang tidak pantas.
- **Progres tamu tidak ikut pindah ke akun.** Ini disengaja agar perangkat bersama tidak mencampur siswa.
- **Riwayat misi bertambah terus** (satu dokumen per misi selesai). Untuk sekolah kecil ini jauh di bawah batas gratis Firebase.
- **Belum diuji dengan Firebase sungguhan.** Alur login, penyimpanan, pergantian akun, dan sinkron antartab diuji dengan backend contoh. Koneksi ke Google/Firebase dan `firestore.rules` perlu dicoba setelah dipasang (lihat daftar uji di bawah).

## Daftar uji setelah dipasang
1. Buka alamat situs, tekan Masuk dengan Google, dan pastikan dasbor muncul dengan nama samaran.
2. Main satu misi sampai selesai. Di Firestore harus muncul `leaderboard/{uid}` dan `users/{uid}/runs/r_...`.
3. Buka di perangkat lain dengan akun yang sama. Skor dan misi yang belum selesai harus muncul.
4. Keluar, lalu masuk dengan akun lain. Skor akun pertama tidak boleh ikut tampil.
5. Di **Firestore > Rules > Rules Playground**, coba baca `users/uidLain/runs/current` sebagai akun biasa. Harus ditolak.

## Struktur
```
public/
  index.html            halaman dan layar masuk
  styles.css
  app.js                game, dasbor, sinkron, alur login
  backend-firebase.js   Firebase Auth (Google) dan Firestore
  backend-mock.js       backend contoh untuk ?demo
  firebase-config.js    konfigurasi project, mode penyimpanan, daftar admin
  local-db.js           penyimpanan localStorage berbentuk seperti Firestore
firestore.rules         aturan keamanan
firebase.json           pengaturan Hosting dan Rules
```
