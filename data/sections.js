// data/sections.js — Perfil Sensorial 2 (Dunn)
// Datos extraídos del cuestionario oficial DATOS 2

// ── Escala de respuesta ──────────────────────────────────────────────────────
const SCORE_OPTIONS = [
  { label: 'Casi siempre',   abbr: 'S', value: 5 },
  { label: 'Frecuentemente', abbr: 'F', value: 4 },
  { label: 'Mitad de veces', abbr: 'M', value: 3 },
  { label: 'Ocasionalmente', abbr: 'O', value: 2 },
  { label: 'Casi nunca',     abbr: 'N', value: 1 },
  { label: 'No aplicable',   abbr: 'NA', value: 0 },
];

// ── Cuadrantes ───────────────────────────────────────────────────────────────
// BU = Búsqueda/Buscador
// EV = Evitación/Evitativo
// SE = Sensibilidad/Sensitivo
// RE = Registro/Espectador

// ── Secciones sensoriales (ítems + cuadrante) ────────────────────────────────
const SECTIONS = [
  {
    id: 'auditivo',
    label: 'Auditivo',
    emoji: '👂',
    color: '#185FA5',
    desc: 'Procesamiento auditivo — respuestas a sonidos del entorno.',
    items: [
      { n:  1, q: 'BU', text: 'Reacciona intensamente a sonidos fuertes o inesperados (p. ej., sirena, ladridos de perro, secador de pelo).' },
      { n:  2, q: 'EV', text: 'Se tapa los oídos con las manos para protegerlos de los sonidos.' },
      { n:  3, q: 'SE', text: 'Le cuesta terminar las tareas cuando está puesta la música o la televisión.' },
      { n:  4, q: 'SE', text: 'Se distrae cuando hay mucho ruido a su alrededor.' },
      { n:  5, q: 'EV', text: 'Rinde poco cuando hay ruido ambiental (p. ej., ventilador, frigorífico).' },
      { n:  6, q: 'SE', text: 'No me hace caso o parece ignorarme.' },
      { n:  7, q: 'SE', text: 'Parece que no oye cuando lo llamo por su nombre (aunque oye bien).' },
      { n:  8, q: 'RE', text: 'Disfruta con los ruidos extraños o hace ruidos por diversión.' },
    ],
    ranges: { min: 0, max: 40,
      mucho_menos:  [0,  2],
      menos:        [3,  9],
      como:         [10, 22],
      mas:          [23, 29],
      mucho_mas:    [30, 40],
    }
  },
  {
    id: 'visual',
    label: 'Visual',
    emoji: '👁️',
    color: '#533AB7',
    desc: 'Procesamiento visual — respuestas a estímulos del entorno visual.',
    items: [
      { n:  9, q: 'SE', text: 'Prefiere jugar o trabajar con poca luz.' },
      { n: 10, q: '',   text: 'Prefiere ropa de colores vivos o estampada.' },
      { n: 11, q: '',   text: 'Disfruta observando los detalles de los objetos.' },
      { n: 12, q: 'RE', text: 'Necesita ayuda para encontrar objetos que son evidentes para otras personas.' },
      { n: 13, q: 'SE', text: 'Le molestan las luces brillantes más que a otros niños de su edad.' },
      { n: 14, q: 'BU', text: 'Mira a las personas que se mueven por la habitación.' },
      { n: 15, q: 'EV', text: 'Le molestan las luces brillantes (p. ej., se esconde de la luz que entra por la ventana del coche).' },
    ],
    ranges: { min: 0, max: 30,
      mucho_menos:  [0,  2],
      menos:        [3,  6],
      como:         [7, 16],
      mas:          [17, 20],
      mucho_mas:    [21, 30],
    }
  },
  {
    id: 'tactil',
    label: 'Táctil',
    emoji: '✋',
    color: '#993556',
    desc: 'Procesamiento táctil — respuestas al tacto y texturas.',
    items: [
      { n: 16, q: 'SE', text: 'Se muestra angustiado cuando lo arreglan (p. ej., pelea o llora cuando le cortan el pelo, le lavan la cara, le cortan las uñas).' },
      { n: 17, q: '',   text: 'Se irrita por tener que llevar zapatos o calcetines.' },
      { n: 18, q: 'EV', text: 'Reacciona impulsiva o agresivamente cuando alguien lo toca.' },
      { n: 19, q: 'SE', text: 'Se pone nervioso cuando está de pie cerca de otras personas (p. ej., hacer cola).' },
      { n: 20, q: 'SE', text: 'Se frota o rasca la parte del cuerpo que alguien le ha tocado.' },
      { n: 21, q: 'BU', text: 'Toca tanto a las personas o las cosas que llega a molestar a los demás.' },
      { n: 22, q: 'BU', text: 'Muestra la necesidad de tocar juguetes, superficies o texturas (p. ej., quiere tocarlo todo).' },
      { n: 23, q: 'RE', text: 'Parece no darse cuenta del dolor.' },
      { n: 24, q: 'RE', text: 'Parece no darse cuenta de los cambios de temperatura.' },
      { n: 25, q: 'BU', text: 'Toca a las personas o las cosas más que otros niños de su edad.' },
      { n: 26, q: 'RE', text: 'Parece no darse cuenta de que tiene las manos o la cara sucias.' },
    ],
    ranges: { min: 0, max: 55,
      mucho_menos:  [0,  2],
      menos:        [3,  8],
      como:         [9, 20],
      mas:          [21, 26],
      mucho_mas:    [27, 55],
    }
  },
  {
    id: 'movimiento',
    label: 'Movimiento',
    emoji: '🤸',
    color: '#F47B3E',
    desc: 'Procesamiento del movimiento — respuestas al movimiento y equilibrio.',
    items: [
      { n: 27, q: 'BU', text: 'Se mueve tanto que afecta a sus actividades diarias (p. ej., no puede estar sentado sin moverse, quedarse quieto).' },
      { n: 28, q: 'BU', text: 'Se balancea mientras está sentado en la silla, en el suelo o de pie.' },
      { n: 29, q: '',   text: 'Vacila al subir o bajar aceras o escaleras (p. ej., es cauteloso, se detiene antes de moverse).' },
      { n: 30, q: 'BU', text: 'Se muestra entusiasmado mientras realiza tareas que implican movimiento.' },
      { n: 31, q: 'BU', text: 'Realiza movimientos o trepa de manera arriesgada y peligrosa.' },
      { n: 32, q: 'BU', text: 'Busca oportunidades para caerse sin tener en cuenta su seguridad (p. ej., se tira al suelo a propósito).' },
      { n: 33, q: 'RE', text: 'Pierde el equilibrio inesperadamente cuando camina por una superficie irregular.' },
      { n: 34, q: 'RE', text: 'Choca con las cosas, sin darse cuenta de los objetos o personas que hay en su camino.' },
    ],
    ranges: { min: 0, max: 40,
      mucho_menos:  [0,  2],
      menos:        [3,  7],
      como:         [8, 18],
      mas:          [19, 23],
      mucho_mas:    [24, 40],
    }
  },
  {
    id: 'corporal',
    label: 'Corporal',
    emoji: '💪',
    color: '#1D9E75',
    desc: 'Procesamiento corporal — respuestas al tono y postura.',
    items: [
      { n: 35, q: 'RE', text: 'Se mueve con rigidez.' },
      { n: 36, q: 'RE', text: 'Se cansa fácilmente, en especial cuando está de pie o mantiene el cuerpo en una misma posición.' },
      { n: 37, q: 'RE', text: 'Parece tener músculos débiles.' },
      { n: 38, q: 'RE', text: 'Se apoya para sostenerse (p. ej., sostiene la cabeza con las manos, se apoya en una pared).' },
      { n: 39, q: 'RE', text: 'Se agarra a cosas, paredes o barandillas más que otros niños de su edad.' },
      { n: 40, q: 'RE', text: 'Camina haciendo ruido, como si le pesaran los pies.' },
      { n: 41, q: 'BU', text: 'Se estira echándose sobre los muebles o las personas.' },
      { n: 42, q: '',   text: 'Necesita mantas gruesas para dormir.' },
    ],
    ranges: { min: 0, max: 40,
      mucho_menos:  [0,  0],
      menos:        [1,  4],
      como:         [5, 14],
      mas:          [15, 18],
      mucho_mas:    [19, 40],
    }
  },
  {
    id: 'oral',
    label: 'Oral',
    emoji: '👄',
    color: '#BA7517',
    desc: 'Procesamiento oral — respuestas a sabores, olores y texturas orales.',
    items: [
      { n: 43, q: '',   text: 'Tiene arcadas fácilmente con determinadas texturas de los alimentos o al ponerse los cubiertos en la boca.' },
      { n: 44, q: 'SE', text: 'Rechaza ciertos sabores u olores de alimentos que son habituales en la dieta infantil.' },
      { n: 45, q: 'SE', text: 'Solo toma comidas con ciertos sabores (p. ej., dulce, salado).' },
      { n: 46, q: 'SE', text: 'Se limita a determinadas texturas de los alimentos.' },
      { n: 47, q: 'SE', text: 'Es escrupuloso con la comida, en especial con las texturas de los alimentos.' },
      { n: 48, q: 'BU', text: 'Huele cosas que no son comida.' },
      { n: 49, q: 'BU', text: 'Muestra una clara preferencia por ciertos sabores.' },
      { n: 50, q: 'BU', text: 'Tiene antojos de ciertos alimentos, sabores u olores.' },
      { n: 51, q: 'BU', text: 'Se mete cosas en la boca (p. ej., lápiz, manos).' },
      { n: 52, q: 'SE', text: 'Se muerde más la lengua o los labios que otros niños de su edad.' },
    ],
    ranges: { min: 0, max: 50,
      mucho_menos:  [0,  0],
      menos:        [1,  8],
      como:         [9, 24],
      mas:          [25, 32],
      mucho_mas:    [33, 50],
    }
  },
  {
    id: 'conductual',
    label: 'Conductual',
    emoji: '🧩',
    color: '#5B4FCF',
    desc: 'Respuesta conductual — comportamientos observables en el día a día.',
    items: [
      { n: 53, q: 'RE', text: 'Parece propenso a tener accidentes.' },
      { n: 54, q: 'RE', text: 'Pinta, escribe o dibuja apresuradamente.' },
      { n: 55, q: 'BU', text: 'Corre riesgos excesivos (p. ej., trepa hasta lo alto de un árbol, salta desde un mueble alto) que comprometen su seguridad.' },
      { n: 56, q: 'BU', text: 'Parece más activo que otros niños de su edad.' },
      { n: 57, q: 'RE', text: 'Hace las cosas de una forma más complicada de lo necesario (p. ej., pierde el tiempo, se mueve lentamente).' },
      { n: 58, q: 'EV', text: 'Puede ser terco y poco dispuesto a colaborar.' },
      { n: 59, q: 'EV', text: 'Coge berrinches.' },
      { n: 60, q: 'BU', text: 'Parece que disfruta cuando se cae.' },
      { n: 61, q: 'EV', text: 'Se muestra reacio a tener contacto visual conmigo o con otras personas.' },
    ],
    ranges: { min: 0, max: 45,
      mucho_menos:  [0,  2],
      menos:        [3,  7],
      como:         [8, 19],
      mas:          [20, 24],
      mucho_mas:    [25, 45],
    }
  },
  {
    id: 'socioemocional',
    label: 'Socioemocional',
    emoji: '💛',
    color: '#D85A30',
    desc: 'Respuesta socioemocional — relaciones, emociones y autoestima.',
    items: [
      { n: 62, q: 'RE', text: 'Parece que tiene la autoestima baja (p. ej., dificultad para sentirse bien consigo mismo).' },
      { n: 63, q: 'EV', text: 'Requiere refuerzo positivo para volver a enfrentarse a los retos.' },
      { n: 64, q: 'EV', text: 'Es sensible a las críticas.' },
      { n: 65, q: 'EV', text: 'Tiene miedos explícitos y previsibles.' },
      { n: 66, q: 'EV', text: 'Manifiesta que se siente un fracasado.' },
      { n: 67, q: 'EV', text: 'Es muy serio.' },
      { n: 68, q: 'EV', text: 'Tiene fuertes arrebatos emocionales cuando no puede terminar una tarea.' },
      { n: 69, q: 'SE', text: 'Le cuesta interpretar el lenguaje corporal o las expresiones faciales.' },
      { n: 70, q: 'EV', text: 'Se frustra fácilmente.' },
      { n: 71, q: 'EV', text: 'Tiene miedos que afectan a sus actividades diarias.' },
      { n: 72, q: 'EV', text: 'Se angustia cuando cambian los planes, las rutinas o las expectativas.' },
      { n: 73, q: 'SE', text: 'Necesita más protección en la vida que otros niños de su edad (p. ej., es indefenso física o emocionalmente).' },
      { n: 74, q: 'EV', text: 'Interactúa o participa menos en los grupos que otros niños de su edad.' },
      { n: 75, q: 'EV', text: 'Tiene dificultades con las amistades (p. ej., hacer o conservar amigos).' },
    ],
    ranges: { min: 0, max: 70,
      mucho_menos:  [0,  3],
      menos:        [4, 12],
      como:         [13, 30],
      mas:          [31, 38],
      mucho_mas:    [39, 70],
    }
  },
  {
    id: 'atencional',
    label: 'Atencional',
    emoji: '🎯',
    color: '#0F6E56',
    desc: 'Respuesta atencional — atención y procesamiento de información.',
    items: [
      { n: 76, q: 'RE', text: 'Pierde el contacto visual conmigo cuando interactúo con él en el día a día.' },
      { n: 77, q: 'SE', text: 'Le cuesta prestar atención.' },
      { n: 78, q: 'SE', text: 'Aparta la mirada de sus tareas para observar lo que sucede a su alrededor.' },
      { n: 79, q: 'RE', text: 'Se muestra indiferente en ambientes con mucha actividad (p. ej., ajeno a todo lo que ocurre).' },
      { n: 80, q: 'RE', text: 'Mira muy fijamente las cosas.' },
      { n: 81, q: 'EV', text: 'Mira muy fijamente a las personas.' },
      { n: 82, q: 'BU', text: 'Observa a todas las personas que se mueven por la habitación.' },
      { n: 83, q: 'BU', text: 'Pasa de hacer una cosa a hacer otra, tanto que afecta a sus actividades.' },
      { n: 84, q: 'SE', text: 'Se pierde fácilmente.' },
      { n: 85, q: 'RE', text: 'Lo pasa mal cuando ha de buscar algo en un entorno complejo (p. ej., zapatos en una habitación desordenada, un lápiz en un cajón lleno de trastos).' },
      { n: 86, q: 'RE', text: 'Parece no darse cuenta de que alguien entra en la habitación.' },
    ],
    ranges: { min: 0, max: 50,
      mucho_menos:  [0,  2],
      menos:        [3,  9],
      como:         [10, 23],
      mas:          [24, 30],
      mucho_mas:    [31, 50],
    }
  },
];

// ── Cuadrantes (tabla de resumen) ─────────────────────────────────────────────
// Los ítems de cada cuadrante están distribuidos entre las secciones
const QUADRANTS = [
  {
    id: 'busqueda', label: 'Búsqueda / Buscador', abbr: 'BU',
    color: '#F47B3E',
    items: [14,21,22,25,27,28,30,31,32,41,48,49,50,51,55,56,60,82,83],
    ranges: { mucho_menos:[0,8], menos:[9,20], como:[21,46], mas:[47,59], mucho_mas:[60,95] }
  },
  {
    id: 'evitacion', label: 'Evitación / Evitativo', abbr: 'EV',
    color: '#E24B4A',
    items: [1,2,5,15,18,58,59,61,63,64,65,66,67,68,70,71,72,74,75,81],
    ranges: { mucho_menos:[0,10], menos:[11,20], como:[21,42], mas:[43,53], mucho_mas:[54,100] }
  },
  {
    id: 'sensibilidad', label: 'Sensibilidad / Sensitivo', abbr: 'SE',
    color: '#993556',
    items: [3,4,6,7,9,13,16,19,20,44,45,46,47,52,69,73,77,78,84],
    ranges: { mucho_menos:[0,8], menos:[9,18], como:[19,40], mas:[41,50], mucho_mas:[51,95] }
  },
  {
    id: 'registro', label: 'Registro / Espectador', abbr: 'RE',
    color: '#185FA5',
    items: [8,12,23,24,26,33,34,35,36,37,38,39,40,53,54,57,62,76,79,80,85,86],
    ranges: { mucho_menos:[0,8], menos:[9,18], como:[19,39], mas:[40,49], mucho_mas:[50,110] }
  },
];
