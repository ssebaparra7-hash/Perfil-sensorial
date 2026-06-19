// js/survey.js
const Survey = {
  render() {
    const p = Storage.getById(App.selectedId);
    if (!p) return;

    // Topbar + child bar
    document.getElementById('survey-topbar-title').textContent = `${p.nombres} ${p.apellidos}`;
    document.getElementById('survey-child-bar').innerHTML =
      `<strong>${p.nombres} ${p.apellidos}</strong> · ${p.edadTexto || ''}` +
      (p.examinador ? ` · ${p.examinador}` : '') +
      (p.aplicacion ? ` · ${p.aplicacion}` : '');

    this.renderTabs(p);
    this.renderSection(App.sectionIdx, p);
  },

  renderTabs(p) {
    const wrap = document.getElementById('section-tabs');
    wrap.innerHTML = '';
    SECTIONS.forEach((s, i) => {
      const done = p.scores && p.scores[s.id] ? Object.keys(p.scores[s.id]).length : 0;
      const full = done === s.items.length;
      const btn  = document.createElement('button');
      btn.className = 's-tab' + (i === App.sectionIdx ? ' active' : '');
      btn.innerHTML = `${s.emoji} ${s.label}${full ? '<span class="done-dot"></span>' : ''}`;
      btn.onclick = () => { App.sectionIdx = i; Survey.render(); };
      wrap.appendChild(btn);
    });
  },

  renderSection(idx, p) {
    const s = SECTIONS[idx];
    if (!p.scores)       p.scores = {};
    if (!p.scores[s.id]) p.scores[s.id] = {};
    if (!p.obs)          p.obs = {};
    const scores = p.scores[s.id];

    const sTotal    = Object.values(scores).reduce((a, b) => a + b, 0);
    const answered  = Object.keys(scores).length;

    // Rows
    const rows = s.items.map(item => {
      const qBadge = item.q ? `<span class="item-quad q-${item.q}">${item.q}</span>` : '';
      const btns = SCORE_OPTIONS.map(opt => {
        const sel = scores[item.n] === opt.value;
        const cls = sel ? (opt.value === 0 ? 'sc-btn sel-na' : 'sc-btn sel') : 'sc-btn';
        return `<button class="${cls}" title="${opt.label}"
          onclick="Survey.setScore('${s.id}',${item.n},${opt.value})">${opt.abbr}</button>`;
      }).join('');
      return `<tr>
        <td class="item-col">
          <span class="item-num">${item.n}.</span>${item.text}${qBadge}
        </td>
        <td class="score-cell"><div class="score-btns">${btns}</div></td>
      </tr>`;
    }).join('');

    // Status
    const st = Results.getStatus(sTotal, s.ranges);

    const prev = idx > 0 ? `<button class="btn btn-ghost" onclick="Survey.nav(${idx-1})">← Anterior</button>` : '';
    const next = idx < SECTIONS.length - 1
      ? `<button class="btn btn-primary" onclick="Survey.nav(${idx+1})">Siguiente →</button>`
      : `<button class="btn btn-teal" onclick="viewResults()">Ver resultados →</button>`;

    // Scale legend
    const legendItems = SCORE_OPTIONS.map(o =>
      `<span class="scale-legend-item"><span class="scale-dot">${o.abbr}</span>${o.label}</span>`
    ).join('');

    document.getElementById('survey-body').innerHTML = `
      <div class="section-heading">
        <h2>${s.emoji} ${s.label}</h2>
        <p>${s.desc}</p>
      </div>

      <div class="scale-legend">${legendItems}</div>

      <table class="items-table">
        <thead><tr>
          <th class="item-col">El niño...</th>
          <th style="width:210px;text-align:center">S &nbsp; F &nbsp; M &nbsp; O &nbsp; N &nbsp; NA</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>

      <div class="section-total">
        <div>
          <div class="total-lbl">${s.emoji} Puntuación directa · ${s.label}</div>
          <div class="total-sub">${answered} / ${s.items.length} ítems completados</div>
        </div>
        <div>
          <div class="total-num">${sTotal} <small>/ ${s.ranges.max}</small></div>
          <span class="interp-badge s-${st.key}">${st.label}</span>
        </div>
      </div>

      <div class="obs-label">Observaciones</div>
      <textarea class="obs" id="obs-field" placeholder="Notas adicionales sobre esta sección..."
        onchange="Survey.saveObs('${s.id}',this.value)">${p.obs[s.id]||''}</textarea>

      <div class="survey-nav">${prev}${next}</div>
    `;
  },

  setScore(sectionId, itemNum, val) {
    const p = Storage.getById(App.selectedId);
    if (!p) return;
    if (!p.scores)            p.scores = {};
    if (!p.scores[sectionId]) p.scores[sectionId] = {};
    // Toggle
    if (p.scores[sectionId][itemNum] === val) delete p.scores[sectionId][itemNum];
    else p.scores[sectionId][itemNum] = val;
    Storage.update(p);
    Survey.renderTabs(p);
    Survey.renderSection(App.sectionIdx, p);
  },

  saveObs(sectionId, text) {
    const p = Storage.getById(App.selectedId);
    if (!p) return;
    if (!p.obs) p.obs = {};
    p.obs[sectionId] = text;
    Storage.update(p);
  },

  nav(idx) {
    App.sectionIdx = idx;
    Survey.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.Survey = Survey;
