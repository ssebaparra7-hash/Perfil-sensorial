// js/app.js
const App = {
  selectedId: null,
  sectionIdx: 0,

  showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + id).classList.add('active');
    window.scrollTo(0, 0);
    if (id === 'profiles') Profiles.render();
    if (id === 'survey')   Survey.render();
    if (id === 'results')  Results.render();
  },

  openModal(id)  { document.getElementById(id).classList.add('open'); },
  closeModal(id) { document.getElementById(id).classList.remove('open'); },
};

// globals used from HTML
function showScreen(id)  { App.showScreen(id); }
function closeModal(id)  { App.closeModal(id); }
function startSurvey()   { App.sectionIdx = 0; App.showScreen('survey'); }
function viewResults()   { App.showScreen('results'); }
function confirmDelete() { App.openModal('modal-delete'); }

// Auto-calcular edad cronológica en el modal
function calcEdad() {
  const nac = document.getElementById('f-nacimiento').value;
  const apl = document.getElementById('f-aplicacion').value;
  const box = document.getElementById('edad-calculada');
  if (!nac || !apl) { box.textContent = '— años — meses'; return; }
  const d1 = new Date(nac), d2 = new Date(apl);
  let years  = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days   = d2.getDate() - d1.getDate();
  if (days < 0)   { months--; }
  if (months < 0) { years--; months += 12; }
  box.textContent = `${years} años ${months} meses`;
}

window.addEventListener('DOMContentLoaded', () => {
  Profiles.render();
  document.getElementById('f-nacimiento').addEventListener('change', calcEdad);
  document.getElementById('f-aplicacion').addEventListener('change', calcEdad);
});
