// Backend sungguhan: Firebase Authentication (Google) untuk login.
// Data disimpan di localStorage (storageMode 'local') atau Cloud Firestore ('cloud').
// Token ID Google diverifikasi oleh Firebase. Untuk mode 'cloud', firestore.rules
// membaca request.auth untuk menentukan siapa boleh membaca atau menulis apa.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
  signInWithRedirect, signOut as fbSignOut
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { firebaseConfig, allowedEmailDomain, storageMode } from './firebase-config.js';
import { createLocalDb } from './local-db.js';

function configured() {
  return firebaseConfig && firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId &&
    !/^ISI_/.test(firebaseConfig.apiKey) && !/^ISI_/.test(firebaseConfig.projectId) && !/^ISI_/.test(firebaseConfig.appId);
}

async function createFirestoreDb(app) {
  const {
    getFirestore, doc: fsDoc, getDoc, setDoc, deleteDoc, collection: fsCollection,
    query, orderBy: fsOrderBy, limit: fsLimit, onSnapshot: fsOnSnapshot
  } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
  const fs = getFirestore(app);
  const wrapSnap = (d) => ({ id: d.id, exists: d.exists(), data: () => d.data() });

  function docRef(path) {
    const ref = fsDoc(fs, path);
    return {
      id: ref.id, path,
      get: async () => wrapSnap(await getDoc(ref)),
      set: (data) => setDoc(ref, data),
      delete: () => deleteDoc(ref),
      collection: (name) => colRef(path + '/' + name)
    };
  }
  function colRef(path, constraints = []) {
    return {
      doc: (id) => docRef(path + '/' + id),
      orderBy: (field, dir) => colRef(path, [...constraints, fsOrderBy(field, dir || 'asc')]),
      limit: (n) => colRef(path, [...constraints, fsLimit(n)]),
      onSnapshot: (next, error) =>
        fsOnSnapshot(
          query(fsCollection(fs, path), ...constraints),
          (snap) => next({ docs: snap.docs.map(wrapSnap) }),
          error
        )
    };
  }
  return { doc: docRef, collection: colRef };
}

export async function createBackend() {
  if (!configured()) return null;
  // Di Vercel, login memakai domain situs sendiri (jalur /__/auth/ diteruskan oleh vercel.json)
  // agar tidak terblokir pemisahan penyimpanan antardomain di browser.
  const cfg = Object.assign({}, firebaseConfig);
  if (/\.vercel\.app$/.test(location.hostname)) cfg.authDomain = location.host;
  const app = initializeApp(cfg);
  const auth = getAuth(app);
  auth.languageCode = 'id';
  const db = storageMode === 'cloud' ? await createFirestoreDb(app) : createLocalDb('jsmp-localdb');

  function domainOk(user) {
    if (!allowedEmailDomain) return true;
    const email = (user && user.email) || '';
    return email.toLowerCase().endsWith('@' + allowedEmailDomain.toLowerCase());
  }

  return {
    db,
    mode: storageMode === 'cloud' ? 'cloud' : 'local',
    // Nama dan email dikirim hanya agar menu riwayat login (admin) bisa mencatatnya.
    // Game sendiri hanya memakai uid dan tidak menampilkannya ke pemain lain.
    onAuth(cb) {
      return onAuthStateChanged(auth, async (user) => {
        if (user && !domainOk(user)) {
          await fbSignOut(auth);
          return; // onAuthStateChanged akan terpanggil lagi dengan user null
        }
        cb(user ? { uid: user.uid, email: user.email || '', name: user.displayName || '', photo: user.photoURL || '' } : null);
      });
    },
    async signIn() {
      const provider = new GoogleAuthProvider();
      const params = { prompt: 'select_account' };
      if (allowedEmailDomain) params.hd = allowedEmailDomain;
      provider.setCustomParameters(params);
      let cred;
      try {
        cred = await signInWithPopup(auth, provider);
      } catch (e) {
        if (e && e.code === 'auth/popup-blocked') { await signInWithRedirect(auth, provider); return; }
        throw e;
      }
      if (!domainOk(cred.user)) {
        await fbSignOut(auth);
        const err = new Error('Domain email tidak diizinkan');
        err.code = 'app/domain-not-allowed';
        throw err;
      }
    },
    signOut: () => fbSignOut(auth)
  };
}