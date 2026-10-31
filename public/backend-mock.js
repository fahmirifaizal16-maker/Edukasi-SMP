// Backend contoh untuk uji coba tanpa Firebase. Dibuka lewat index.html?demo
// "Masuk dengan Google" di sini hanya pura-pura: akun dan data disimpan di
// localStorage browser ini, dan tidak aman untuk dipakai sungguhan.
import { createLocalDb } from './local-db.js';

const USER_KEY = 'jsmp-demo-user';

export async function createBackend() {
  const db = createLocalDb('jsmp-demo-db');
  let authCb = null;
  const current = () => { try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null'); } catch (e) { return null; } };
  return {
    db,
    mode: 'local',
    onAuth(cb) { authCb = cb; setTimeout(() => cb(current()), 0); return () => { authCb = null; }; },
    async signIn() {
      const uid = (new URLSearchParams(location.search)).get('as') || 'demo-1';
      const user = { uid, email: uid + '@contoh.test', name: 'Pengguna ' + uid };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      if (authCb) authCb(user);
    },
    async signOut() {
      localStorage.removeItem(USER_KEY);
      if (authCb) authCb(null);
    }
  };
}
