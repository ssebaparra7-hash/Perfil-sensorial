// js/results.js
const INTERP = [
  { key: 'mucho-menos', label: 'Mucho menos que los demás' },
  { key: 'menos',       label: 'Menos que los demás'       },
  { key: 'como',        label: 'Como los demás'            },
  { key: 'mas',         label: 'Más que los demás'         },
  { key: 'mucho-mas',   label: 'Mucho más que los demás'   },
];

const Results = {
  // Devuelve {key, label} para un puntaje dado los rangos de una sección/cuadrante
  getStatus(score, ranges) {
    const keys = ['mucho_menos','menos','como','mas','mucho_mas'];
    for (const k of keys) {
      if (ranges[k] && score >= ranges[k][0] && score <= ranges[k][1]) {
        return INTERP.find(i => i.key === k.replace('_','-'));
      }
    }
    return INTERP[2]; // fallback "como los demás"
  },

  getSectionScore(p, sId) {
    if (!p.scores || !p.scores[sId]) return 0;
    return Object.values(p.scores[sId]).reduce((a, b) => a + b, 0);
  },

  getQuadrantScore(p, q) {
    // Suma los puntajes de todos los ítems que pertenecen al cuadrante
    let total = 0;
    for (const s of SECTIONS) {
      if (!p.scores || !p.scores[s.id]) continue;
      for (const item of s.items) {
        if (item.q === q.abbr && p.scores[s.id][item.n] !== undefined) {
          total += p.scores[s.id][item.n];
        }
      }
    }
    return total;
  },

  render() {
    const p = Storage.getById(App.selectedId);
    const el = document.getElementById('results-body');
    if (!p) { el.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--muted)">Sin perfil seleccionado.</div>'; return; }

    const totalGeneral = SECTIONS.reduce((a, s) => a + this.getSectionScore(p, s.id), 0);
    const maxGeneral   = SECTIONS.reduce((a, s) => a + s.ranges.max, 0);

    // ── CUADRANTES ──────────────────────────────────────────────────────────
    const quadCards = QUADRANTS.map(q => {
      const score = this.getQuadrantScore(p, q);
      const pct   = Math.min(100, Math.round((score / q.ranges.mucho_mas[1]) * 100));
      const st    = this.getStatus(score, q.ranges);
      return `<div class="quad-card">
        <div class="quad-card-label">${q.label}</div>
        <div class="quad-card-score" style="color:${q.color}">${score}<small> pts</small></div>
        <div class="bar-wrap"><div class="bar-fill" style="width:${pct}%;background:${q.color}"></div></div>
        <span class="interp-badge s-${st.key}">${st.label}</span>
      </div>`;
    }).join('');

    // Tabla cuadrantes
    const quadRows = QUADRANTS.map(q => {
      const score = this.getQuadrantScore(p, q);
      const st    = this.getStatus(score, q.ranges);
      const rng   = q.ranges;
      return `<tr>
        <td><strong>${q.label}</strong></td>
        <td style="font-weight:700;color:${q.color}">${score}</td>
        <td>${rng.mucho_menos[0]}–${rng.mucho_menos[1]}</td>
        <td>${rng.menos[0]}–${rng.menos[1]}</td>
        <td>${rng.como[0]}–${rng.como[1]}</td>
        <td>${rng.mas[0]}–${rng.mas[1]}</td>
        <td>${rng.mucho_mas[0]}–${rng.mucho_mas[1]}</td>
        <td><span class="interp-badge s-${st.key}">${st.label}</span></td>
      </tr>`;
    }).join('');

    // ── SECCIONES SENSORIALES ───────────────────────────────────────────────
    const sensorSections = SECTIONS.filter((_, i) => i < 6); // auditivo → oral
    const sensorCards = sensorSections.map(s => {
      const score = this.getSectionScore(p, s.id);
      const pct   = Math.min(100, Math.round((score / s.ranges.max) * 100));
      const st    = this.getStatus(score, s.ranges);
      return `<div class="quad-card">
        <div class="quad-card-label">${s.emoji} ${s.label}</div>
        <div class="quad-card-score" style="color:${s.color}">${score}<small>/${s.ranges.max}</small></div>
        <div class="bar-wrap"><div class="bar-fill" style="width:${pct}%;background:${s.color}"></div></div>
        <span class="interp-badge s-${st.key}">${st.label}</span>
      </div>`;
    }).join('');

    const sensorRows = sensorSections.map(s => {
      const score = this.getSectionScore(p, s.id);
      const done  = p.scores && p.scores[s.id] ? Object.keys(p.scores[s.id]).length : 0;
      const st    = this.getStatus(score, s.ranges);
      const r     = s.ranges;
      return `<tr>
        <td>${s.emoji} ${s.label}</td>
        <td style="font-weight:700;color:${s.color}">${score}</td>
        <td>${done}/${s.items.length}</td>
        <td>${r.mucho_menos[0]}–${r.mucho_menos[1]}</td>
        <td>${r.menos[0]}–${r.menos[1]}</td>
        <td>${r.como[0]}–${r.como[1]}</td>
        <td>${r.mas[0]}–${r.mas[1]}</td>
        <td>${r.mucho_mas[0]}–${r.mucho_mas[1]}</td>
        <td><span class="interp-badge s-${st.key}">${st.label}</span></td>
      </tr>`;
    }).join('');

    // ── SECCIONES CONDUCTUALES ──────────────────────────────────────────────
    const behavSections = SECTIONS.filter((_, i) => i >= 6); // conductual → atencional
    const behavCards = behavSections.map(s => {
      const score = this.getSectionScore(p, s.id);
      const pct   = Math.min(100, Math.round((score / s.ranges.max) * 100));
      const st    = this.getStatus(score, s.ranges);
      return `<div class="quad-card">
        <div class="quad-card-label">${s.emoji} ${s.label}</div>
        <div class="quad-card-score" style="color:${s.color}">${score}<small>/${s.ranges.max}</small></div>
        <div class="bar-wrap"><div class="bar-fill" style="width:${pct}%;background:${s.color}"></div></div>
        <span class="interp-badge s-${st.key}">${st.label}</span>
      </div>`;
    }).join('');

    const behavRows = behavSections.map(s => {
      const score = this.getSectionScore(p, s.id);
      const done  = p.scores && p.scores[s.id] ? Object.keys(p.scores[s.id]).length : 0;
      const st    = this.getStatus(score, s.ranges);
      const r     = s.ranges;
      return `<tr>
        <td>${s.emoji} ${s.label}</td>
        <td style="font-weight:700;color:${s.color}">${score}</td>
        <td>${done}/${s.items.length}</td>
        <td>${r.mucho_menos[0]}–${r.mucho_menos[1]}</td>
        <td>${r.menos[0]}–${r.menos[1]}</td>
        <td>${r.como[0]}–${r.como[1]}</td>
        <td>${r.mas[0]}–${r.mas[1]}</td>
        <td>${r.mucho_mas[0]}–${r.mucho_mas[1]}</td>
        <td><span class="interp-badge s-${st.key}">${st.label}</span></td>
      </tr>`;
    }).join('');

    // Observaciones
    const obsAll = SECTIONS.filter(s => p.obs && p.obs[s.id]).map(s =>
      `<p style="margin-bottom:.4rem"><strong>${s.emoji} ${s.label}:</strong> ${p.obs[s.id]}</p>`
    ).join('');

    // ── RENDER ──────────────────────────────────────────────────────────────
    el.innerHTML = `
      <div class="results-header">
        <div>
          <div class="results-name">${p.nombres} ${p.apellidos}</div>
          <div class="results-meta">
            ${p.sexo ? p.sexo + ' · ' : ''}${p.edadTexto || ''}
            ${p.aplicacion ? ' · Aplicación: ' + p.aplicacion : ''}
            ${p.examinador ? '<br>' + p.examinador + (p.profesion ? ' — ' + p.profesion : '') : ''}
            ${p.escuela ? '<br>' + p.escuela + (p.curso ? ' · ' + p.curso : '') : ''}
          </div>
        </div>
        <div class="grand-total">
          <div class="grand-total-lbl">Puntaje total</div>
          <div class="grand-total-val">${totalGeneral}<span style="font-size:1rem;font-weight:400;color:var(--muted)">/${maxGeneral}</span></div>
          <div class="grand-total-sub">${Math.round((totalGeneral/maxGeneral)*100)}% del máximo</div>
        </div>
      </div>

      <div class="interp-legend">
        <strong>Interpretación:</strong>
        <span class="interp-badge s-mucho-menos">Mucho menos que los demás</span>
        <span class="interp-badge s-menos">Menos que los demás</span>
        <span class="interp-badge s-como">Como los demás</span>
        <span class="interp-badge s-mas">Más que los demás</span>
        <span class="interp-badge s-mucho-mas">Mucho más que los demás</span>
      </div>

      <!-- CUADRANTES -->
      <div class="block-title">Cuadrantes del procesamiento sensorial</div>
      <div class="quad-grid">${quadCards}</div>
      <div style="overflow-x:auto">
      <table class="summary-table">
        <thead><tr>
          <th>Cuadrante</th><th>Punt.</th>
          <th>Mucho menos</th><th>Menos</th><th>Como los demás</th><th>Más</th><th>Mucho más</th>
          <th>Interpretación</th>
        </tr></thead>
        <tbody>${quadRows}</tbody>
      </table>
      </div>

      <!-- SECCIONES SENSORIALES -->
      <div class="block-title">Secciones sensoriales</div>
      <div class="quad-grid">${sensorCards}</div>
      <div style="overflow-x:auto">
      <table class="summary-table">
        <thead><tr>
          <th>Sección</th><th>Punt.</th><th>Ítems</th>
          <th>Mucho menos</th><th>Menos</th><th>Como los demás</th><th>Más</th><th>Mucho más</th>
          <th>Interpretación</th>
        </tr></thead>
        <tbody>${sensorRows}</tbody>
      </table>
      </div>

      <!-- SECCIONES CONDUCTUALES -->
      <div class="block-title">Secciones conductuales</div>
      <div class="quad-grid">${behavCards}</div>
      <div style="overflow-x:auto">
      <table class="summary-table">
        <thead><tr>
          <th>Sección</th><th>Punt.</th><th>Ítems</th>
          <th>Mucho menos</th><th>Menos</th><th>Como los demás</th><th>Más</th><th>Mucho más</th>
          <th>Interpretación</th>
        </tr></thead>
        <tbody>${behavRows}</tbody>
      </table>
      </div>

      ${obsAll ? `<div class="block-title">Observaciones</div>
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:1rem;font-size:.85rem;line-height:1.7;color:var(--muted)">${obsAll}</div>` : ''}

      <div class="disclaimer">
        ⚠️ <strong>Uso profesional:</strong> Adaptación española del Sensory Profile 2 © 2016 NCS Pearson, Inc.
        Los resultados deben ser interpretados por un terapeuta ocupacional o especialista en integración sensorial,
        en el contexto de una evaluación clínica completa.
      </div>

      <div class="results-actions no-print">
        <button class="btn btn-ghost" onclick="showScreen('survey')">← Editar encuesta</button>
        <button class="btn btn-primary" onclick="window.print()">🖨️ Imprimir / PDF</button>
      </div>
    `;
  }
};
