// js/storage.js
const Storage = {
  KEY: 'ps2_profiles',
  getAll()       { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch { return []; } },
  save(list)     { localStorage.setItem(this.KEY, JSON.stringify(list)); },
  getById(id)    { return this.getAll().find(p => p.id === id) || null; },
  add(profile)   { const l = this.getAll(); l.push(profile); this.save(l); },
  update(p)      { this.save(this.getAll().map(x => x.id === p.id ? p : x)); },
  remove(id)     { this.save(this.getAll().filter(p => p.id !== id)); },
};
