// Penyimpanan dokumen di localStorage dengan bentuk yang sama seperti Firestore
// (doc, collection, get, set, delete, orderBy, limit, onSnapshot). Dengan begitu
// game tidak perlu tahu data disimpan di mana. Data hanya ada di browser ini.
export function createLocalDb(storageKey) {
  let store = {};
  const load = () => { try { store = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (e) { store = {}; } };
  const persist = () => { try { localStorage.setItem(storageKey, JSON.stringify(store)); } catch (e) {} };
  load();
  const subs = new Set();
  const fire = () => subs.forEach((f) => f());
  // Perubahan dari tab lain di browser yang sama ikut terbaca.
  window.addEventListener('storage', (e) => { if (e.key === storageKey) { load(); fire(); } });

  const snapOf = (path) => ({
    id: path.split('/').pop(),
    exists: path in store,
    data: () => (path in store ? JSON.parse(JSON.stringify(store[path])) : undefined)
  });

  function docRef(path) {
    return {
      id: path.split('/').pop(), path,
      get: async () => snapOf(path),
      set: async (d) => { store[path] = JSON.parse(JSON.stringify(d)); persist(); fire(); },
      delete: async () => { delete store[path]; persist(); fire(); },
      collection: (name) => colRef(path + '/' + name)
    };
  }
  function colRef(path, o) {
    o = o || {};
    return {
      doc: (id) => docRef(path + '/' + id),
      orderBy: (f, d) => colRef(path, Object.assign({}, o, { ord: [f, d || 'asc'] })),
      limit: (n) => colRef(path, Object.assign({}, o, { lim: n })),
      onSnapshot(next) {
        const run = () => {
          let keys = Object.keys(store).filter((k) => k.startsWith(path + '/') && k.slice(path.length + 1).indexOf('/') < 0);
          if (o.ord) {
            const [f, d] = o.ord;
            keys.sort((a, b) => ((store[a][f] || 0) - (store[b][f] || 0)) * (d === 'desc' ? -1 : 1));
          }
          if (o.lim) keys = keys.slice(0, o.lim);
          next({ docs: keys.map(snapOf) });
        };
        subs.add(run); run();
        return () => subs.delete(run);
      }
    };
  }
  return { doc: docRef, collection: colRef };
}
