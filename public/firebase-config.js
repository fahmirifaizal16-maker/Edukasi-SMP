// Isi dengan konfigurasi web app dari Firebase Console:
// Project settings > General > Your apps > Web app > SDK setup and configuration.
// Nilai ini boleh publik. Keamanan data dijaga oleh Firebase Authentication
// dan aturan di firestore.rules, bukan oleh kerahasiaan apiKey.
//
// Yang perlu kamu ganti hanya apiKey dan appId. projectId dan authDomain di bawah
// diambil dari alamat konsolmu (console.firebase.google.com/.../project/game-edukasi-smp/...).
// Kalau di Project settings ternyata Project ID-nya berbeda, pakai yang di sana.
export const firebaseConfig = {
  apiKey: 'AIzaSyBy0D_DuuG724R4JO4jeWw-AuTF1E74NvI',
   authDomain: "game-edukasi-smp.firebaseapp.com",
  projectId: "game-edukasi-smp",
  appId: '1:266334264693:web:600126c82943522ba6873c'
};

// Tempat data disimpan:
//   'local' = localStorage di browser (untuk saat ini). Login tetap lewat Google,
//             tetapi skor dan progres hanya ada di perangkat itu. Tidak perlu Firestore.
//   'cloud' = Firestore. Progres ikut pindah antarperangkat. Perlu database dan
//             firestore.rules dari README.
export const storageMode = 'local';

// Email yang boleh membuka menu "Riwayat login". Ganti dengan emailmu sendiri.
// Contoh: ['guruku@gmail.com']. Kalau dikosongkan, menu tidak muncul untuk siapa pun.
export const adminEmails = ['fahmirifaizal16@gmail.com'];

// Opsional: batasi login ke satu domain email sekolah, misalnya 'sekolahku.sch.id'.
// Biarkan kosong ('') untuk mengizinkan semua akun Google.
// Pembatasan yang sebenarnya dipasang juga di firestore.rules (lihat README).
export const allowedEmailDomain = '';
