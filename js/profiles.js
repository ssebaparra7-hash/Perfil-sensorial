// js/profiles.js
const PALETTE = [
  { bg:'#EEEDFE', color:'#3B2F8F' }, { bg:'#FEF0E7', color:'#c45f22' },
  { bg:'#E1F5EE', color:'#0F6E56' }, { bg:'#E6F1FB', color:'#185FA5' },
  { bg:'#FBEAF0', color:'#72243E' }, { bg:'#FAEEDA', color:'#BA7517' },
  { bg:'#EAF3DE', color:'#3B6D11' }, { bg:'#FCEBEB', color:'#A32D2D' },
];

const Profiles = {
  render() {
    const grid    = document.getElementById('profile-grid');
    const actions = document.getElementById('profile-actions');
    const list    = Storage.getAll();
    const totalItems = SECTIONS.reduce((a, s) => a + s.items.length, 0);

    grid.innerHTML = '';

    list.forEach((p, i) => {
      const pal = PALETTE[i % PALETTE.length];
      const initials = ((p.nombres||'?')[0] + (p.apellidos||'?')[0]).toUpperCase();
      const answered = SECTIONS.reduce((a, s) =>
        a + (p.scores && p.scores[s.id] ? Object.keys(p.scores[s.id]).length : 0), 0);
      const pct = Math.round((answered / totalItems) * 100);
      const isSelected = App.selectedId === p.id;

      const card = document.createElement('div');
      card.className = 'profile-card' + (isSelected ? ' selected' : '');
      card.innerHTML = `
        <div class="profile-avatar" style="background:${pal.bg};color:${pal.color}">${initials}</div>
        <div class="profile-name">${p.nombres} ${p.apellidos}</div>
        <div class="profile-age">${p.edadTexto || ''} · ${p.sexo || ''}</div>
        <div class="profile-prog">${answered}/${totalItems} ítems</div>
        <div class="profile-prog-bar"><div class="profile-prog-fill" style="width:${pct}%"></div></div>
      `;
      card.onclick = () => { App.selectedId = p.id; Profiles.render(); };
      grid.appendChild(card);
    });

    // Botón agregar
    const add = document.createElement('div');
    add.className = 'add-card';
    add.innerHTML = '<span class="add-card-icon">＋</span>Nuevo perfil';
    add.onclick = Profiles.openNew;
    grid.appendChild(add);

    actions.className = 'profile-actions' + (App.selectedId ? ' visible' : '');
  },

  openNew() {
    document.getElementById('f-aplicacion').value = new Date().toISOString().split('T')[0];
    ['f-nombres','f-apellidos','f-examinador','f-profesion','f-cuidador','f-escuela','f-curso','f-nacimiento']
      .forEach(id => document.getElementById(id).value = '');
    ['f-sexo','f-relacion','f-hermanos','f-convivencia']
      .forEach(id => document.getElementById(id).value = '');
    document.getElementById('edad-calculada').textContent = '— años — meses';
    App.openModal('modal-profile');
  },

  save() {
    const nombres   = document.getElementById('f-nombres').value.trim();
    const apellidos = document.getElementById('f-apellidos').value.trim();
    const nacimiento = document.getElementById('f-nacimiento').value;
    if (!nombres || !apellidos || !nacimiento) {
      alert('Los campos marcados con * son obligatorios.'); return;
    }
    const profile = {
      id:          Date.now().toString(),
      nombres, apellidos,
      sexo:        document.getElementById('f-sexo').value,
      nacimiento,
      aplicacion:  document.getElementById('f-aplicacion').value,
      edadTexto:   document.getElementById('edad-calculada').textContent,
      examinador:  document.getElementById('f-examinador').value.trim(),
      profesion:   document.getElementById('f-profesion').value.trim(),
      cuidador:    document.getElementById('f-cuidador').value.trim(),
      relacion:    document.getElementById('f-relacion').value,
      escuela:     document.getElementById('f-escuela').value.trim(),
      curso:       document.getElementById('f-curso').value.trim(),
      hermanos:    document.getElementById('f-hermanos').value,
      convivencia: document.getElementById('f-convivencia').value,
      scores:      {},
      obs:         {},
    };
    Storage.add(profile);
    App.selectedId = profile.id;
    App.closeModal('modal-profile');
    Profiles.render();
  },

  delete() {
    if (!App.selectedId) return;
    Storage.remove(App.selectedId);
    App.selectedId = null;
    App.closeModal('modal-delete');
    Profiles.render();
  }
};
