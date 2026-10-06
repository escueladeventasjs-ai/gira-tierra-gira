'use strict';
/* ============================================================
   GIRA, TIERRA, GIRA · Entrenador interactivo de Sociales
   Miniaventura: VER → HACER → ENTENDER → RECORDAR → JUGAR → REPETIR
   ============================================================ */

/* ============================================================
   1. PERFIL DE LA EXPLORADORA (cambiar aquí para otro alumno)
   ============================================================ */
const PERFIL = {
  nombre: 'Daniela',
  nombreCompleto: 'Daniela Brito',
  edad: 8,
  curso: '3.º de Primaria',
  vocativo: 'exploradora',       // Cómo la llama la narradora
  saludos: [
    '¡Hola, Daniela! Hoy vamos a ser exploradoras del espacio.',
    '¡Qué alegría verte, Daniela! Vamos a aprender un montón.',
    'Hola, Daniela. Prepárate, que hoy el espacio nos espera.',
  ],
};

/* ============================================================
   2. CONTENIDO CENTRALIZADO (modificable)
   ============================================================ */
const CONTENT = {
  title: 'Gira, Tierra, gira',
  subtitle: 'Entrena para convertirte en experta en la Tierra y la Luna.',
  earth: {
    rotation: {
      name: 'Rotación',
      desc: 'La Tierra gira sobre sí misma.',
      result: 'Produce el día 🌞 y la noche 🌙.',
      rule: 'ROTACIÓN = gira sobre sí misma = día y noche',
    },
    translation: {
      name: 'Traslación',
      desc: 'La Tierra se mueve alrededor del Sol.',
      result: 'Produce las estaciones 🌸☀️🍂❄️.',
      rule: 'TRASLACIÓN = alrededor del Sol = estaciones',
    },
  },
  moon: [
    { id: 'new',    name: 'Luna nueva',       emoji: '🌑', lit: 'none',  shape: '', phrase: 'la luna nueva',       desc: 'No vemos la Luna iluminada.' },
    { id: 'waxing', name: 'Cuarto creciente', emoji: '🌓', lit: 'right', shape: 'D', phrase: 'el cuarto creciente', desc: 'Se ve iluminada la parte derecha 👉. ¡Tiene forma de D!' },
    { id: 'full',   name: 'Luna llena',       emoji: '🌕', lit: 'all',   shape: 'O', phrase: 'la luna llena',       desc: 'Vemos toda la Luna iluminada. ¡Parece una O!' },
    { id: 'waning', name: 'Cuarto menguante', emoji: '🌗', lit: 'left',  shape: 'C', phrase: 'el cuarto menguante', desc: 'Se ve iluminada la parte izquierda 👈. ¡Tiene forma de C!' },
  ],
  seasons: [
    { id: 'spring', name: 'Primavera', icon: '🌸', days: 92, starts: '21 de marzo',      short: 'marzo',
      months: ['marzo', 'abril', 'mayo'] },
    { id: 'summer', name: 'Verano',    icon: '☀️', days: 92, starts: '21 de junio',      short: 'junio',
      months: ['junio', 'julio', 'agosto'] },
    { id: 'autumn', name: 'Otoño',     icon: '🍂', days: 89, starts: '23 de septiembre', short: 'septiembre',
      months: ['septiembre', 'octubre', 'noviembre'] },
    { id: 'winter', name: 'Invierno',  icon: '❄️', days: 92, starts: '21 de diciembre',  short: 'diciembre',
      months: ['diciembre', 'enero', 'febrero'] },
  ],
  trick: '92 · 92 · 89 · 92',
  trickPhrase: 'Tres duran 92 días. ¡El otoño dura 89!',
};

const CONCEPT_LABELS = {
  rotation: 'Rotación = gira sobre sí misma = día y noche',
  translation: 'Traslación = alrededor del Sol = estaciones',
  moonNew: 'Luna nueva = no se ve iluminada',
  moonWaxing: 'Cuarto creciente = mitad DERECHA iluminada',
  moonFull: 'Luna llena = toda la Luna iluminada',
  moonWaning: 'Cuarto menguante = mitad IZQUIERDA iluminada',
  springDays: 'La primavera dura 92 días',
  summerDays: 'El verano dura 92 días',
  autumnDays: 'El otoño dura 89 días (¡el diferente!)',
  winterDays: 'El invierno dura 92 días',
  seasonOrder: 'Orden: primavera, verano, otoño, invierno',
  springMonths: 'Primavera = marzo, abril y mayo',
  summerMonths: 'Verano = junio, julio y agosto',
  autumnMonths: 'Otoño = septiembre, octubre y noviembre',
  winterMonths: 'Invierno = diciembre, enero y febrero',
};

const CONCEPT_BLOCK = {
  rotation: 'earth', translation: 'earth',
  moonNew: 'moon', moonWaxing: 'moon', moonFull: 'moon', moonWaning: 'moon',
  springDays: 'seasons', summerDays: 'seasons', autumnDays: 'seasons',
  winterDays: 'seasons', seasonOrder: 'seasons',
  springMonths: 'seasons', summerMonths: 'seasons', autumnMonths: 'seasons', winterMonths: 'seasons',
};

const ARTICLE = { spring: 'la', summer: 'el', autumn: 'el', winter: 'el' };

/* ============================================================
   2. BANCO DE PREGUNTAS (tipos: choice, imageChoice, imageIdentify, tf, match)
   ============================================================ */
const BANK = [
  /* ---- TIERRA ---- */
  { id: 'e1', block: 'earth', concept: 'rotation', type: 'choice',
    prompt: '¿Cómo se llama el movimiento en el que la Tierra gira sobre sí misma?',
    options: ['Rotación', 'Traslación', 'Eclipsis', 'Cometa'], answer: 'Rotación',
    explain: '¡Exacto! La Tierra girando sobre sí misma es la ROTACIÓN.' },
  { id: 'e2', block: 'earth', concept: 'rotation', type: 'choice',
    prompt: '¿Qué produce la rotación de la Tierra?',
    options: ['El día y la noche', 'Las estaciones', 'Los eclipses', 'La lluvia'], answer: 'El día y la noche',
    explain: '¡Muy bien! La rotación produce el día 🌞 y la noche 🌙.' },
  { id: 'e3', block: 'earth', concept: 'translation', type: 'choice',
    prompt: '¿Cómo se llama el movimiento de la Tierra alrededor del Sol?',
    options: ['Traslación', 'Rotación', 'Órbita', 'Eclipsis'], answer: 'Traslación',
    explain: '¡Exacto! La Tierra moviéndose alrededor del Sol es la TRASLACIÓN.' },
  { id: 'e4', block: 'earth', concept: 'translation', type: 'choice',
    prompt: '¿Qué produce la traslación de la Tierra?',
    options: ['Las estaciones', 'El día y la noche', 'La Luna llena', 'El viento'], answer: 'Las estaciones',
    explain: '¡Muy bien! La traslación produce las estaciones 🌸☀️🍂❄️.' },
  { id: 'e5', block: 'earth', concept: 'rotation', type: 'imageChoice',
    prompt: '¿Cuál de estos dibujos representa la ROTACIÓN?',
    options: ['spin', 'orbit'], answer: 'spin',
    explain: '¡Sí! La Tierra girando sobre sí misma es la rotación.' },
  { id: 'e6', block: 'earth', concept: 'translation', type: 'imageChoice',
    prompt: '¿Cuál de estos dibujos representa la TRASLACIÓN?',
    options: ['spin', 'orbit'], answer: 'orbit',
    explain: '¡Sí! La Tierra dando vueltas alrededor del Sol es la traslación.' },
  { id: 'e7', block: 'earth', concept: 'rotation', type: 'tf',
    prompt: 'La rotación de la Tierra produce las estaciones.',
    answer: false,
    explain: 'Casi. La rotación produce el DÍA y la NOCHE. Las estaciones las produce la traslación.' },
  { id: 'e8', block: 'earth', concept: 'translation', type: 'tf',
    prompt: 'La Tierra se mueve alrededor del Sol. Eso es la traslación.',
    answer: true,
    explain: '¡Exacto! Moverse alrededor del Sol es la TRASLACIÓN, y produce las estaciones.' },
  { id: 'e9', block: 'earth', concept: 'rotation', type: 'tf',
    prompt: 'La rotación es la Tierra girando alrededor del Sol.',
    answer: false,
    explain: 'Casi. Girar ALREDEDOR DEL SOL es la traslación. La rotación es girar sobre sí misma.' },
  { id: 'e10', block: 'earth', concept: 'rotation', type: 'match',
    prompt: 'Arrastra cada resultado a su movimiento. (O toca una palabra y luego su cuadro.)',
    pairs: [
      { item: '🌞🌙 Día y noche', target: 'ROTACIÓN', concept: 'rotation' },
      { item: 'Gira sobre sí misma', target: 'ROTACIÓN', concept: 'rotation' },
      { item: '🌸☀️🍂❄️ Estaciones', target: 'TRASLACIÓN', concept: 'translation' },
      { item: 'Alrededor del Sol', target: 'TRASLACIÓN', concept: 'translation' },
    ],
    explain: '¡Perfecto! Día y noche → rotación. Estaciones → traslación.' },

  /* ---- LUNA ---- */
  { id: 'm1', block: 'moon', concept: 'moonNew', type: 'imageChoice',
    prompt: '¿Qué fase de la Luna NO vemos iluminada?',
    options: ['new', 'waxing', 'full', 'waning'], answer: 'new',
    explain: '¡Exacto! En la Luna nueva no vemos la Luna iluminada.' },
  { id: 'm2', block: 'moon', concept: 'moonFull', type: 'imageChoice',
    prompt: '¿Qué fase muestra TODA la Luna iluminada?',
    options: ['new', 'waxing', 'full', 'waning'], answer: 'full',
    explain: '¡Muy bien! La Luna llena se ve toda iluminada.' },
  { id: 'm3', block: 'moon', concept: 'moonWaxing', type: 'imageChoice',
    prompt: '¿Qué fase se ve iluminada por la DERECHA?',
    options: ['new', 'waxing', 'full', 'waning'], answer: 'waxing',
    explain: '¡Exacto! Iluminada por la derecha = cuarto CRECIENTE 👉' },
  { id: 'm4', block: 'moon', concept: 'moonWaning', type: 'imageChoice',
    prompt: '¿Qué fase se ve iluminada por la IZQUIERDA?',
    options: ['new', 'waxing', 'full', 'waning'], answer: 'waning',
    explain: '¡Exacto! Iluminada por la izquierda = cuarto MENGUANTE 👈' },
  { id: 'm5', block: 'moon', concept: 'moonWaxing', type: 'choice',
    prompt: 'Si vemos la Luna iluminada por la PARTE DERECHA, ¿qué fase es?',
    options: ['Cuarto creciente', 'Cuarto menguante', 'Luna nueva', 'Luna llena'], answer: 'Cuarto creciente',
    explain: '¡Exacto! Iluminada por la derecha = cuarto CRECIENTE. 👉' },
  { id: 'm6', block: 'moon', concept: 'moonWaning', type: 'choice',
    prompt: 'Si vemos la Luna iluminada por la PARTE IZQUIERDA, ¿qué fase es?',
    options: ['Cuarto menguante', 'Cuarto creciente', 'Luna nueva', 'Luna llena'], answer: 'Cuarto menguante',
    explain: '¡Exacto! Iluminada por la izquierda = cuarto MENGUANTE. 👈' },
  { id: 'm7', block: 'moon', concept: 'moonWaxing', type: 'tf',
    prompt: 'En el cuarto creciente se ve iluminada la parte izquierda de la Luna.',
    answer: false,
    explain: 'Casi. En el cuarto creciente se ilumina la parte DERECHA 👉. La izquierda es el menguante.' },
  { id: 'm8', block: 'moon', concept: 'moonWaning', type: 'tf',
    prompt: 'En el cuarto menguante se ve iluminada la parte izquierda de la Luna.',
    answer: true,
    explain: '¡Exacto! El cuarto menguante se ilumina por la izquierda 👈.' },
  { id: 'm9', block: 'moon', concept: 'moonNew', type: 'tf',
    prompt: 'En la Luna nueva no vemos la Luna iluminada.',
    answer: true,
    explain: '¡Exacto! En la Luna nueva la Luna no se ve iluminada.' },
  { id: 'm10', block: 'moon', concept: 'moonFull', type: 'match',
    prompt: 'Arrastra cada nombre sobre su Luna. (O toca el nombre y luego su Luna.)',
    pairs: [
      { item: 'Luna nueva', target: 'new', concept: 'moonNew' },
      { item: 'Cuarto creciente', target: 'waxing', concept: 'moonWaxing' },
      { item: 'Luna llena', target: 'full', concept: 'moonFull' },
      { item: 'Cuarto menguante', target: 'waning', concept: 'moonWaning' },
    ],
    explain: '¡Perfecto! Ya conoces las cuatro fases de la Luna.' },
  { id: 'm11', block: 'moon', concept: 'moonWaxing', type: 'tf',
    prompt: 'El cuarto creciente tiene forma de D.',
    answer: true,
    explain: '¡Exacto! El cuarto creciente se ve iluminado por la derecha y tiene forma de D 👉' },
  { id: 'm12', block: 'moon', concept: 'moonWaning', type: 'tf',
    prompt: 'El cuarto menguante tiene forma de D.',
    answer: false,
    explain: 'Casi. El cuarto menguante tiene forma de C 👈 (iluminado por la izquierda). El de forma D es el creciente.' },
  { id: 'm13', block: 'moon', concept: 'moonWaning', type: 'choice',
    prompt: '¿Qué fase tiene forma de C?',
    options: ['Cuarto menguante', 'Cuarto creciente', 'Luna llena', 'Luna nueva'], answer: 'Cuarto menguante',
    explain: '¡Muy bien! El cuarto menguante tiene forma de C: se ve iluminado por la izquierda 👈' },

  /* ---- ESTACIONES ---- */
  { id: 's1', block: 'seasons', concept: 'springDays', type: 'choice',
    prompt: '¿Cuántos días dura la PRIMAVERA?',
    options: ['92', '89', '90', '100'], answer: '92',
    explain: '¡Muy bien! La primavera dura 92 días.' },
  { id: 's2', block: 'seasons', concept: 'summerDays', type: 'choice',
    prompt: '¿Cuántos días dura el VERANO?',
    options: ['92', '89', '90', '100'], answer: '92',
    explain: '¡Muy bien! El verano dura 92 días.' },
  { id: 's3', block: 'seasons', concept: 'autumnDays', type: 'choice',
    prompt: '¿Cuántos días dura el OTOÑO?',
    options: ['89', '92', '90', '100'], answer: '89',
    explain: '¡Exacto! El otoño dura 89 días. ¡Es el diferente!' },
  { id: 's4', block: 'seasons', concept: 'winterDays', type: 'choice',
    prompt: '¿Cuántos días dura el INVIERNO?',
    options: ['92', '89', '90', '100'], answer: '92',
    explain: '¡Muy bien! El invierno dura 92 días.' },
  { id: 's5', block: 'seasons', concept: 'autumnDays', type: 'choice',
    prompt: '¿Qué estación dura un número DIFERENTE de días?',
    options: ['Otoño', 'Primavera', 'Verano', 'Invierno'], answer: 'Otoño',
    explain: '¡Exacto! Tres duran 92 días y el OTOÑO dura 89.' },
  { id: 's6', block: 'seasons', concept: 'autumnDays', type: 'choice',
    prompt: 'Completa la serie: 92 · 92 · ___ · 92',
    options: ['89', '90', '91', '92'], answer: '89',
    explain: '¡Muy bien! 92 · 92 · 89 · 92. El otoño es el de 89.' },
  { id: 's7', block: 'seasons', concept: 'autumnDays', type: 'tf',
    prompt: 'El otoño dura 92 días.',
    answer: false,
    explain: 'Casi. El otoño dura 89 días. ¡Es la estación diferente!' },
  { id: 's8', block: 'seasons', concept: 'summerDays', type: 'tf',
    prompt: 'El verano dura 92 días.',
    answer: true,
    explain: '¡Exacto! El verano dura 92 días.' },
  { id: 's9', block: 'seasons', concept: 'springDays', type: 'choice',
    prompt: '¿Cuándo empieza aproximadamente la primavera?',
    options: ['21 de marzo', '21 de junio', '23 de septiembre', '21 de diciembre'], answer: '21 de marzo',
    explain: '¡Exacto! La primavera empieza aproximadamente el 21 de marzo.' },
  { id: 's10', block: 'seasons', concept: 'winterDays', type: 'choice',
    prompt: '¿Cuándo empieza aproximadamente el invierno?',
    options: ['21 de diciembre', '21 de marzo', '21 de junio', '23 de septiembre'], answer: '21 de diciembre',
    explain: '¡Exacto! El invierno empieza aproximadamente el 21 de diciembre.' },
  { id: 's11', block: 'seasons', concept: 'winterMonths', type: 'choice',
    prompt: '¿Qué meses son de INVIERNO?',
    options: ['Diciembre, enero y febrero', 'Marzo, abril y mayo', 'Junio, julio y agosto', 'Septiembre, octubre y noviembre'], answer: 'Diciembre, enero y febrero',
    explain: '¡Muy bien! El invierno va de diciembre a febrero. ¡Ojo: empieza en diciembre y acaba en febrero!' },
  { id: 's12', block: 'seasons', concept: 'springMonths', type: 'choice',
    prompt: '¿En qué mes empieza la primavera?',
    options: ['Marzo', 'Junio', 'Septiembre', 'Diciembre'], answer: 'Marzo',
    explain: '¡Exacto! La primavera empieza aproximadamente el 21 de marzo y dura marzo, abril y mayo.' },
  { id: 's13', block: 'seasons', concept: 'summerMonths', type: 'choice',
    prompt: '¿Qué meses son de VERANO?',
    options: ['Junio, julio y agosto', 'Diciembre, enero y febrero', 'Marzo, abril y mayo', 'Septiembre, octubre y noviembre'], answer: 'Junio, julio y agosto',
    explain: '¡Muy bien! El verano va de junio a agosto. Empieza aproximadamente el 21 de junio.' },
  { id: 's14', block: 'seasons', concept: 'autumnMonths', type: 'choice',
    prompt: '¿Qué meses son de OTOÑO?',
    options: ['Septiembre, octubre y noviembre', 'Marzo, abril y mayo', 'Junio, julio y agosto', 'Diciembre, enero y febrero'], answer: 'Septiembre, octubre y noviembre',
    explain: '¡Muy bien! El otoño va de septiembre a noviembre y dura 89 días.' },
  { id: 's15', block: 'seasons', concept: 'winterMonths', type: 'tf',
    prompt: 'Enero y febrero son meses de invierno.',
    answer: true,
    explain: '¡Exacto! El invierno son los meses de diciembre, enero y febrero.' },
  { id: 's16', block: 'seasons', concept: 'springMonths', type: 'tf',
    prompt: 'Mayo es un mes de verano.',
    answer: false,
    explain: 'Casi. Mayo es el último mes de PRIMAVERA (marzo, abril y mayo). El verano es junio, julio y agosto.' },
  { id: 's17', block: 'seasons', concept: 'autumnDays', type: 'tf',
    prompt: 'El otoño dura 89 días.',
    answer: true,
    explain: '¡Exacto! El otoño dura 89 días. ¡Es la estación diferente!' },
];

/* Retos rápidos dentro de las misiones */
const MINI = {
  rotation: { id: 'mini-rot', block: 'earth', concept: 'rotation', type: 'choice',
    prompt: '¿Qué movimiento produce el día y la noche?',
    options: ['Rotación', 'Traslación'], answer: 'Rotación',
    explain: 'La Tierra gira sobre sí misma: eso es la ROTACIÓN. Por eso tenemos día 🌞 y noche 🌙.',
    hintVisual: 'spin' },
  translation: { id: 'mini-tra', block: 'earth', concept: 'translation', type: 'choice',
    prompt: '¿Qué movimiento produce las estaciones?',
    options: ['Rotación', 'Traslación'], answer: 'Traslación',
    explain: 'La Tierra se mueve alrededor del Sol: eso es la TRASLACIÓN. Por eso tenemos estaciones 🌸☀️🍂❄️.',
    hintVisual: 'orbit' },
};

const MEDALS = {
  m1: { key: 'm1', icon: '🌍', title: 'EXPERTA EN MOVIMIENTOS DE LA TIERRA',
    desc: '¡Ya distingues la rotación y la traslación!',
    next: { label: '🌙 Ir a la Misión 2', screen: 'm2Start' } },
  m2: { key: 'm2', icon: '🌙', title: 'EXPERTA EN LA LUNA',
    desc: '¡Reconoces las cuatro fases y sus formas!',
    next: { label: '🌸 Ir a la Misión 3', screen: 'm3Start' } },
  m3: { key: 'm3', icon: '🌸', title: 'EXPERTA EN LAS ESTACIONES',
    desc: '¡Sabes cuántos días dura cada estación!',
    next: { label: '🚀 ¡Al DESAFÍO FINAL!', screen: 'finalIntro' } },
};

/* Carné de experta: se personaliza con el nombre de la alumna */
function carneHTML() {
  return [
    '<div class="carne">',
      '<div class="carne-cabecera">CARNÉ DE EXPERTA</div>',
      '<div class="carne-foto" aria-hidden="true">🧑‍🚀</div>',
      '<div class="carne-nombre">' + PERFIL.nombreCompleto + '</div>',
      '<div class="carne-curso">' + PERFIL.curso + ' · Ciencias Sociales</div>',
      '<ul class="carne-logros">',
        '<li class="on">🌍 Movimientos de la Tierra</li>',
        '<li class="on">🌙 Fases de la Luna (D y C)</li>',
        '<li class="on">🌸 Estaciones y sus días</li>',
      '</ul>',
      '<div class="carne-sello">92 · 92 · 89 · 92</div>',
    '</div>',
  ].join('');
}

/* ============================================================
   3. UTILIDADES
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;',
}[c]));
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================================================
   4. GUARDADO (localStorage)
   ============================================================ */
const SAVE_KEY = 'gira-tierra-gira-v1';
function defaultSave() {
  return {
    missions: { m1: false, m2: false, m3: false },
    errors: {},
    stats: { correct: 0, wrong: 0, best: 0 },
    /* La VOZ (lectura en voz alta) está apagada por defecto: ella la enciende
       cuando quiera oírla. `sound` son solo los campanitas del juego. */
    settings: { sound: true, voice: false },
  };
}
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    const s = JSON.parse(raw);
    const d = defaultSave();
    return {
      ...d, ...s,
      missions: { ...d.missions, ...(s.missions || {}) },
      stats: { ...d.stats, ...(s.stats || {}) },
      settings: { ...d.settings, ...(s.settings || {}) },
    };
  } catch (e) { return defaultSave(); }
}
let save = loadSave();
function persist() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {}
}
/* Si el navegador no deja guardar (p. ej. opened in private mode), la app sigue
   funcionando igual: solo se pierde el progreso al cerrar. */
let almacenamientoDisponible = true;
try {
  localStorage.setItem(SAVE_KEY + '-test', '1');
  localStorage.removeItem(SAVE_KEY + '-test');
} catch (e) {
  almacenamientoDisponible = false;
}
function recordError(concept) {
  if (!concept) return;
  save.errors[concept] = (save.errors[concept] || 0) + 1;
  persist();
}
function weakConcepts() {
  return Object.keys(save.errors).filter(c => save.errors[c] > 0);
}
function blockErrors(block) {
  return Object.entries(save.errors)
    .filter(([c]) => CONCEPT_BLOCK[c] === block)
    .reduce((sum, [, n]) => sum + n, 0);
}
function resetAll() {
  if (!confirm('¿Empezar de nuevo? Se borrará todo tu progreso.')) return;
  save = defaultSave();
  persist();
  toast('¡Progreso borrado! Nueva misión 🚀');
  go('home');
}

/* ============================================================
   5. AUDIO Y VOZ (opcionales)
   ============================================================ */
let actx = null;
function tone(freq, dur = 0.12, type = 'sine', vol = 0.15, when = 0) {
  if (!save.settings.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator();
    const g = actx.createGain();
    o.type = type;
    o.frequency.value = freq;
    const t0 = actx.currentTime + when;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(actx.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  } catch (e) {}
}
const sfx = {
  good() { tone(523, .12, 'sine', .18); tone(659, .12, 'sine', .18, .09); tone(784, .22, 'sine', .18, .18); },
  bad() { tone(220, .18, 'triangle', .12); tone(175, .26, 'triangle', .10, .1); },
  pop() { tone(700, .06, 'square', .06); },
  flip() { tone(880, .05, 'square', .05); },
  medal() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .18, 'sine', .16, i * .12)); },
};
/* Voz de cuento: preferimos una voz femenina en español si el dispositivo la tiene */
const VOZ_PREFERIDA = ['monica', 'paulina', 'sabina', 'helena', 'laura', 'lucia', 'marta', 'ines', 'elena', 'rosa', 'amparo', 'carmen'];
let narratorVoice = null;
function elegirVoz() {
  if (!('speechSynthesis' in window)) return null;
  const voces = speechSynthesis.getVoices();
  if (!voces.length) return null;
  // "Mónica" no coincide con "monica": quitamos tildes antes de comparar
  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const es = voces.filter(v => /^es/i.test(v.lang || ''));
  const prefiere = v => { const n = norm(v.name); return VOZ_PREFERIDA.some(p => n.includes(p)); };
  const esES = v => /^es[-_]?ES/i.test(v.lang || '');
  // 1) voz preferida en español de España · 2) voz preferida en cualquier español
  // 3) español de España · 4) cualquier español · 5) la primera que haya
  return es.find(v => esES(v) && prefiere(v))
      || es.find(prefiere)
      || es.find(esES)
      || es[0]
      || voces[0]
      || null;
}
/* Un aviso de voz solo se enseña una vez: no llenamos la pantalla de toasts */
let vozAvisada = false;
function avisoVoz(msg) { if (!vozAvisada) { vozAvisada = true; toast(msg); } }

/* Chrome se "duerme" si la locución dura más de ~15 segundos: le recordamos
   que siga hablando mientras haya texto por decir. */
let keepAliveT = null;
function keepAliveVoz() {
  clearInterval(keepAliveT);
  keepAliveT = setInterval(() => {
    if (!('speechSynthesis' in window) || !speechSynthesis.speaking) {
      clearInterval(keepAliveT); keepAliveT = null; return;
    }
    try { speechSynthesis.resume(); } catch (e) {}
  }, 7000);
}

function speak(text, opts) {
  if (!('speechSynthesis' in window)) {
    avisoVoz('🔇 Este navegador no puede hablar en voz alta.');
    return;
  }
  /* Voz apagada por defecto: aquí NUNCA se enciende sola. Solo habla si
     ella ha pulsado el botón 🔊 de la barra superior. */
  if (!save.settings.voice) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    if (!narratorVoice) narratorVoice = elegirVoz();
    /* Solo fijamos la voz si es española; si no la hay, dejamos que el
       navegador elija con el idioma es-ES (mejor que una voz inglesa). */
    if (narratorVoice && /^es/i.test(narratorVoice.lang || '')) {
      u.voice = narratorVoice; u.lang = narratorVoice.lang;
    } else {
      u.lang = 'es-ES';
    }
    const o = opts || {};
    u.rate = o.rate || 0.92;     // ritmo suave, de cuento
    u.pitch = o.pitch || 1.15;   // un poquito más agudo y cercano
    u.volume = 1;
    u.onerror = e => {
      const err = e && e.error;
      if (err && err !== 'interrupted' && err !== 'canceled' && err !== 'synthesis-unavailable') {
        avisoVoz('⚠️ La voz no pudo arrancar (' + err + '). Pulsa 🔊 y prueba otra vez.');
      }
    };
    /* cancel() justo antes de speak() se come la locución en algunos
       navegadores: esperamos un instante antes de lanzarla. */
    setTimeout(() => {
      try {
        speechSynthesis.speak(u);
        keepAliveVoz();
      } catch (e) { avisoVoz('⚠️ Este dispositivo no puede hablar en voz alta.'); }
    }, 40);
  } catch (e) {
    avisoVoz('⚠️ Este dispositivo no puede hablar en voz alta.');
  }
}
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => { narratorVoice = elegirVoz(); };
}
function stopSpeak() {
  try { speechSynthesis.cancel(); } catch (e) {}
  if (keepAliveT) { clearInterval(keepAliveT); keepAliveT = null; }
}

/* Subtítulo del narrador: hace visible lo que se está leyendo, para que el
   botón 🔊 sirva aunque el dispositivo no tenga voces instaladas. */
let narrT = null;
function ocultarNarrador() {
  const el = $('#narrator');
  if (!el) return;
  clearTimeout(narrT);
  el.classList.remove('show');
  el.hidden = true;
}
function narrar(texto, opts) {
  const el = $('#narrator');
  if (el) {
    el.querySelector('.narrator-text').textContent = texto;
    const badge = el.querySelector('.narrator-voz');
    const vozApagada = !save.settings.voice;
    if (badge) {
      const v = (narratorVoice && /^es/i.test(narratorVoice.lang || '')) ? narratorVoice : null;
      const hayVoces = ('speechSynthesis' in window) && speechSynthesis.getVoices().length > 0;
      badge.textContent = vozApagada ? '🔇 Voz apagada · pulsa 🔊'
        : (v ? '🎙️ ' + v.name : '🎙️ voz del sistema');
      badge.hidden = vozApagada ? false : !hayVoces;
    }
    el.hidden = false;
    // fuerza reflow para reiniciar la animación
    void el.offsetWidth;
    el.classList.add('show');
    clearTimeout(narrT);
    narrT = setTimeout(() => {
      el.classList.remove('show');
      el.hidden = true;
    }, Math.min(12000, Math.max(4500, texto.length * 65)));
  }
  if (!save.settings.voice) {
    // Pidió oír algo con la voz apagada: le enseñamos el texto y le decimos
    // exactamente dónde encenderla (sin activársela nosotros).
    toast('🔇 La voz está apagada: pulsa el botón 🔊 de la barra superior para oírla.');
    pulsarBotonVoz();
    return;
  }
  speak(texto, opts);
  /* Si el navegador no tiene voces instaladas, el cartel sigue ahí (a leer,
     no a escuchar) y lo avisamos con claridad. */
  if (!('speechSynthesis' in window)) {
    avisoVoz('🔇 Este dispositivo no tiene voz instalada: lo leemos en el cartel.');
  }
}

/* ============================================================
   6. FONDO ESTRELLADO, CONFETTI, TOAST Y MODAL
   ============================================================ */
function makeStars() {
  const c = $('#stars');
  let html = '';
  for (let i = 0; i < 90; i++) {
    const x = (Math.random() * 100).toFixed(1);
    const y = (Math.random() * 100).toFixed(1);
    const s = Math.random() < .12 ? 3 : (Math.random() < .4 ? 2 : 1);
    html += '<span class="star" style="left:' + x + '%;top:' + y + '%;width:' + s + 'px;height:' + s + 'px;animation-delay:' + (Math.random() * 4).toFixed(1) + 's"></span>';
  }
  c.innerHTML = html;
}
function confetti() {
  const c = document.createElement('div');
  c.className = 'confetti';
  const colors = ['#ffd54a', '#ff9ec7', '#7cc6ff', '#8be0a4', '#b39ddb'];
  for (let i = 0; i < 44; i++) {
    const d = document.createElement('i');
    d.style.left = (Math.random() * 100) + '%';
    d.style.background = colors[i % colors.length];
    d.style.animationDelay = (Math.random() * .8) + 's';
    c.appendChild(d);
  }
  document.body.appendChild(c);
  setTimeout(() => c.remove(), 2700);
}
let toastT = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), 2400);
}
function showModal(html) {
  const r = $('#modal-root');
  r.innerHTML = '<div class="modal-backdrop" role="dialog" aria-modal="true">' + html + '</div>';
  $('.modal-backdrop', r).addEventListener('click', e => {
    if (e.target.classList.contains('modal-backdrop')) closeModal();
  });
}
function closeModal() { $('#modal-root').innerHTML = ''; }
function awardMedal(m) {
  save.missions[m.key] = true;
  persist();
  updateHud();
  sfx.medal();
  confetti();
  speak('¡Medalla conseguida, ' + PERFIL.nombre + '! ' + m.title);
  showModal(
    '<div class="medal-card">' +
      '<div class="medal-icon">' + m.icon + '</div>' +
      '<div class="medal-kicker">⭐ MEDALLA CONSEGUIDA ⭐</div>' +
      '<h2>' + m.title + '</h2>' +
      '<p>' + m.desc + '</p>' +
      '<div class="medal-actions">' +
        '<button class="btn btn-primary btn-big" id="medal-ok">' + (m.next ? m.next.label : '¡Genial!') + '</button>' +
        '<button class="btn btn-ghost btn-small" id="medal-home">🏠 Inicio</button>' +
      '</div>' +
    '</div>');
  $('#medal-ok').onclick = () => {
    closeModal();
    sfx.pop();
    if (m.next) go(m.next.screen);
  };
  $('#medal-home').onclick = () => { closeModal(); sfx.pop(); go('home'); };
}

/* ============================================================
   7. ESTADO, NAVEGACIÓN Y RENDER
   ============================================================ */
const app = $('#app');
const hudMissions = $('#hud-missions');
const state = { screen: 'home', params: null, cleanups: [], quiz: null, lastResult: null };

function runCleanups() {
  state.cleanups.forEach(fn => { try { fn(); } catch (e) {} });
  state.cleanups = [];
}
function go(screen, params) {
  state.screen = screen;
  state.params = params || null;
  render();
  window.scrollTo(0, 0);
}
function render() {
  runCleanups();
  cerrarDrags(null, null, true);
  closeModal();          // una medalla nunca debe quedar tapando la pantalla
  ocultarNarrador();     // ni el cartel del narrador
  stopSpeak();
  app.innerHTML = SCREENS[state.screen](state.params);
  (BIND[state.screen] || (() => {}))(state.params);
  bindNav(app);
  updateHud();
}
function bindNav(root) {
  $$('[data-go]', root).forEach(b => {
    b.addEventListener('click', () => { sfx.pop(); go(b.dataset.go); });
  });
}
function pulsarBotonVoz() {
  const b = $('#btn-sound');
  if (!b) return;
  b.classList.remove('pulsa');
  void b.offsetWidth;
  b.classList.add('pulsa');
  setTimeout(() => b.classList.remove('pulsa'), 2400);
}
function updateHud() {
  const done = (save.missions.m1 ? 1 : 0) + (save.missions.m2 ? 1 : 0) + (save.missions.m3 ? 1 : 0);
  hudMissions.textContent = done + ' de 3 misiones completadas';
  const voz = !!save.settings.voice;
  const b = $('#btn-sound');
  b.textContent = voz ? '🔊' : '🔇';
  b.setAttribute('aria-label', voz ? 'Apagar la voz' : 'Encender la voz');
  b.title = voz ? 'Voz encendida: toca para apagarla' : 'Voz apagada: toca para oírla';
}
function nextMissionScreen() {
  if (!save.missions.m1) return 'm1Start';
  if (!save.missions.m2) return 'm2Start';
  if (!save.missions.m3) return 'm3Start';
  return 'finalIntro';
}

/* ============================================================
   8. CONSTRUCTORES VISUALES
   ============================================================ */
function moonHTML(id, size = 72) {
  const m = CONTENT.moon.find(x => x.id === id);
  if (!m) return '';
  return '<span class="moon vis-' + m.lit + '" style="width:' + size + 'px;height:' + size + 'px" role="img" aria-label="' + m.name + '"></span>';
}
function earthSpinHTML(size = 90) {
  return '<span class="mini-earth spin-anim" style="width:' + size + 'px;height:' + size + 'px" role="img" aria-label="La Tierra girando sobre sí misma"><span class="mini-earth-arrow">↻</span></span>';
}
function earthOrbitHTML(size = 130) {
  return '<span class="mini-orbit" style="width:' + size + 'px;height:' + size + 'px" role="img" aria-label="La Tierra girando alrededor del Sol"><span class="mini-sun">☀️</span><span class="mini-orbit-ring"></span><span class="mini-orbit-earth">🌍</span></span>';
}
function visOptionHTML(o) {
  const moon = CONTENT.moon.find(m => m.id === o);
  if (moon) {
    return '<button class="vis-option" data-value="' + o + '">' + moonHTML(o, 92) +
      '<span class="vis-label">' + moon.name + '</span></button>';
  }
  if (o === 'spin') {
    return '<button class="vis-option" data-value="spin">' + earthSpinHTML(96) +
      '<span class="vis-label">Gira sobre sí misma</span></button>';
  }
  if (o === 'orbit') {
    return '<button class="vis-option" data-value="orbit">' + earthOrbitHTML(132) +
      '<span class="vis-label">Alrededor del Sol</span></button>';
  }
  return '';
}

/* ============================================================
   9. MOTOR DE ARRASTRAR Y SOLTAR (ratón + táctil + teclado)
   ============================================================ */
function onTap(el, fn) {
  let sx = 0, sy = 0, pid = null;
  el.addEventListener('pointerdown', e => { pid = e.pointerId; sx = e.clientX; sy = e.clientY; });
  el.addEventListener('pointerup', e => {
    if (pid !== e.pointerId) return;
    pid = null;
    if (Math.hypot(e.clientX - sx, e.clientY - sy) < 10) fn(e);
  });
  el.addEventListener('pointercancel', () => { pid = null; });
}

/* ------------------------------------------------------------
   RED DE SEGURIDAD DEL ARRASTRE
   Si el navegador no entrega el pointerup al elemento que se
   arrastraba (captura perdida, ventana sin foco, punto de
   anulación...), la ficha se quedaba "pegada" al cursor y la
   pantalla dejaba de responder. Registramos los arrastres vivos
   y un escuchador global los cierra siempre: nada se queda
   colgado ni sobra ningún fantasma en pantalla.
   ------------------------------------------------------------ */
const dragsActivos = new Set();
function registrarDrag(drag) { drag.__actividad = Date.now(); dragsActivos.add(drag); }
function refrescarDrag(drag) { if (dragsActivos.has(drag)) drag.__actividad = Date.now(); }
/* Vigía: si lleva 15 s sin ningún movimiento, el arrastre se cierra solo. */
setInterval(() => {
  const ahora = Date.now();
  [...dragsActivos].forEach(d => {
    if (ahora - (d.__actividad || 0) > 15000) cerrarDrags(null, null, true);
  });
}, 3000);
function cerrarDrags(clientX, clientY, cancelado) {
  if (!dragsActivos.size) { $$('.drag-ghost').forEach(g => g.remove()); return; }
  const pendientes = [...dragsActivos];
  dragsActivos.clear();
  pendientes.forEach(d => { try { d.finish(clientX, clientY, cancelado); } catch (e) {} });
  $$('.drag-ghost').forEach(g => g.remove());
}
window.addEventListener('pointerup', e => {
  const x = e.clientX, y = e.clientY;
  // Damos un turno al escuchador del propio elemento; si no respondió, cerramos nosotros.
  setTimeout(() => { if (dragsActivos.size) cerrarDrags(x, y, false); }, 0);
}, true);
window.addEventListener('pointercancel', () => { if (dragsActivos.size) cerrarDrags(null, null, true); }, true);
window.addEventListener('blur', () => { if (dragsActivos.size) cerrarDrags(null, null, true); });
document.addEventListener('visibilitychange', () => {
  if (document.hidden && dragsActivos.size) cerrarDrags(null, null, true);
});

function enableDrag(root, onDrop) {
  $$('[data-drag]', root).forEach(el => {
    let pid = null, ghost = null, moved = false, sx = 0, sy = 0, gW = 0, gH = 0;

    const drag = {
      finish(x, y, cancelado, evt) {
        if (pid === null) return;
        pid = null;
        dragsActivos.delete(drag);
        el.classList.remove('dragging');
        if (ghost) { ghost.remove(); ghost = null; }
        if (cancelado || x == null) return;
        const ev = evt || { clientX: x, clientY: y };
        if (moved) {
          const t = document.elementFromPoint(x, y);
          const zone = t && t.closest ? t.closest('[data-drop]') : null;
          onDrop(el, zone, ev, false);
        } else {
          onDrop(el, null, ev, true);
        }
      },
    };

    el.addEventListener('pointerdown', e => {
      if (el.classList.contains('placed') || el.disabled) return;
      pid = e.pointerId; sx = e.clientX; sy = e.clientY; moved = false;
      el.classList.add('dragging');
      try { el.setPointerCapture(pid); } catch (err) {}
      ghost = el.cloneNode(true);
      ghost.classList.add('drag-ghost');
      ghost.removeAttribute('id');
      gW = el.offsetWidth; gH = el.offsetHeight;   // se mide una sola vez
      ghost.style.width = gW + 'px';
      ghost.style.height = gH + 'px';
      document.body.appendChild(ghost);
      moveGhost(e.clientX, e.clientY);
      registrarDrag(drag);
      e.preventDefault();
    });
    el.addEventListener('pointermove', e => {
      if (pid !== e.pointerId) return;
      refrescarDrag(drag);
      if (!moved && Math.hypot(e.clientX - sx, e.clientY - sy) > 9) moved = true;
      if (moved) moveGhost(e.clientX, e.clientY);
    });
    el.addEventListener('pointerup', e => {
      if (pid === e.pointerId) drag.finish(e.clientX, e.clientY, false, e);
    });
    el.addEventListener('pointercancel', () => {
      if (pid !== null) drag.finish(null, null, true);
    });
    el.addEventListener('lostpointercapture', () => {
      // El navegador soltó la captura sin avisar con pointerup: cerramos igual.
      setTimeout(() => { if (pid !== null) drag.finish(null, null, true); }, 0);
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDrop(el, null, e, true); }
    });
    function moveGhost(x, y) {
      if (!ghost) return;
      // Solo transform: no obliga al navegador a recalcular el diseño en cada movimiento
      ghost.style.transform = 'translate3d(' + (x - gW / 2) + 'px,' + (y - gH / 2) + 'px,0) rotate(-3deg) scale(1.05)';
    }
  });
}

function setupMatchGame(container, onAllPlaced, onError) {
  let selectedChip = null;
  const chips = $$('[data-drag]', container);
  const zones = $$('[data-drop]', container);
  const total = chips.length;
  function deselect() {
    if (selectedChip) selectedChip.classList.remove('selected');
    selectedChip = null;
  }
  function tryPlace(chip, zone) {
    if (!zone) return;
    if (chip.dataset.target === zone.dataset.target) {
      zone.appendChild(chip);
      chip.classList.add('placed');
      chip.disabled = true;
      deselect();
      sfx.pop();
      if (container.querySelectorAll('.chip.placed').length === total) onAllPlaced();
    } else {
      zone.classList.add('shake');
      setTimeout(() => zone.classList.remove('shake'), 450);
      sfx.bad();
      recordError(chip.dataset.concept);
      if (onError) onError(chip);
      toast('🔑 ' + (CONCEPT_LABELS[chip.dataset.concept] || 'Mira el recuerdo de arriba'));
    }
  }
  enableDrag(container, (chip, zone, e, tap) => {
    if (chip.classList.contains('placed')) return;
    if (tap) {
      if (selectedChip === chip) deselect();
      else { deselect(); selectedChip = chip; chip.classList.add('selected'); sfx.pop(); }
      return;
    }
    tryPlace(chip, zone);
  });
  zones.forEach(zone => {
    zone.setAttribute('role', 'button');
    zone.tabIndex = 0;
    zone.addEventListener('keydown', e => {
      if ((e.key === 'Enter' || e.key === ' ') && selectedChip && !selectedChip.classList.contains('placed')) {
        e.preventDefault();
        tryPlace(selectedChip, zone);
      }
    });
    onTap(zone, () => {
      if (selectedChip && !selectedChip.classList.contains('placed')) tryPlace(selectedChip, zone);
    });
  });
}

/* ============================================================
   10. PANTALLAS
   ============================================================ */
const SCREENS = {

  /* ---------- PORTADA ---------- */
  home() {
    const m = save.missions;
    const done = (m.m1 ? 1 : 0) + (m.m2 ? 1 : 0) + (m.m3 ? 1 : 0);
    const allDone = m.m1 && m.m2 && m.m3;
    const missions = [
      { icon: '🌍', name: 'La Tierra se mueve', sub: 'Rotación y traslación', screen: 'm1Start', done: m.m1 },
      { icon: '🌙', name: 'Descubre la Luna', sub: 'Las fases de la Luna', screen: 'm2Start', done: m.m2 },
      { icon: '🌸', name: 'El reto de las estaciones', sub: 'Cuántos días dura cada una', screen: 'm3Start', done: m.m3 },
    ];
    const saludo = PERFIL.saludos[Math.floor(Math.random() * PERFIL.saludos.length)];
    return [
      '<section class="screen home">',
        '<div class="hero">',
          '<div class="perfil-chip"><span class="perfil-avatar" aria-hidden="true">🧑‍🚀</span>' +
            '<span>Exploradora: <b>' + PERFIL.nombreCompleto + '</b></span></div>',
          '<h1 class="title">🌍 Gira, Tierra, gira</h1>',
          '<p class="subtitle">' + CONTENT.subtitle + '</p>',
          '<p class="saludo">' + saludo + '</p>',
        '</div>',
        '<div class="mission-cards">',
          missions.map(x =>
            '<button class="mission-card ' + (x.done ? 'done' : '') + '" data-go="' + x.screen + '" aria-label="Misión: ' + x.name + '">' +
              '<span class="mission-icon" aria-hidden="true">' + x.icon + '</span>' +
              '<span class="mission-name">' + x.name + '</span>' +
              '<span class="mission-sub">' + x.sub + '</span>' +
              '<span class="mission-state">' + (x.done ? '⭐ ¡Completada!' : '▶️ Empezar') + '</span>' +
            '</button>').join(''),
        '</div>',
        '<button class="btn btn-primary btn-huge" id="btn-start">🚀 ' + (allDone ? 'IR AL DESAFÍO FINAL' : 'EMPEZAR MISIÓN') + '</button>',
        '<p class="hud-counter">' + done + ' de 3 misiones completadas</p>',
        allDone ? '<div class="final-ready"><button class="btn btn-sun btn-big" id="btn-ready-home">✅ ¿Estoy preparada?</button></div>' : '',
        save.stats.best ? '<p class="best-score">🏆 Mejor puntuación: ' + save.stats.best + '%</p>' : '',
        '<div class="final-ready"><button class="btn btn-ghost btn-small" id="btn-reset-home">🔄 Empezar de nuevo</button></div>',
        '<div class="final-ready"><button class="btn btn-ghost btn-small" id="btn-voice-test">🔊 Probar la voz</button></div>',
      '</section>',
    ].join('');
  },

  /* ---------- MISIÓN 1 ---------- */
  m1Start() {
    return [
      '<section class="screen">',
        '<div class="mission-head">',
          '<span class="mission-badge">🌍 MISIÓN 1 DE 3</span>',
          '<h2>La Tierra se mueve</h2>',
          '<p class="lead">Descubre cómo gira la Tierra y qué produce cada movimiento.</p>',
        '</div>',
        '<div class="card" style="display:flex;flex-direction:column;gap:12px;">',
          '<div class="remember-title">🔑 LO QUE VAMOS A APRENDER</div>',
          '<p style="font-size:19px;">🌍↻ <b>ROTACIÓN</b>: la Tierra gira sobre sí misma → <b>día 🌞 y noche 🌙</b>.</p>',
          '<p style="font-size:19px;">🌍→☀️ <b>TRASLACIÓN</b>: la Tierra se mueve alrededor del Sol → <b>estaciones 🌸☀️🍂❄️</b>.</p>',
        '</div>',
        '<button class="btn btn-primary btn-big" data-go="m1Rotation">🌍 ¡A girar!</button>',
      '</section>',
    ].join('');
  },

  m1Rotation() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 1 · Ver y hacer</span>',
          '<h2>🌍↻ ROTACIÓN</h2>',
          '<p class="lead">La Tierra gira sobre sí misma. ¡Gírala con el dedo y mira qué pasa!</p>',
        '</div>',
        '<div class="demo-card">',
          '<div class="rot-stage">',
            '<div class="rot-earth" id="rot-earth" role="button" tabindex="0" aria-label="Arrastra la Tierra para hacerla girar, o usa las flechas del teclado">',
              '<div class="rot-surface" id="rot-surface"><span class="rot-char" aria-hidden="true">🧒</span></div>',
              '<div class="rot-night" aria-hidden="true"></div>',
            '</div>',
            '<div class="rot-sun" aria-hidden="true">☀️</div>',
            '<div class="dn-badge" id="dn-badge">🌞 DÍA</div>',
          '</div>',
          '<div class="demo-controls">',
            '<button class="btn btn-sun" id="rot-auto">▶️ Girar</button>',
            '<button class="btn btn-sky" id="rot-drag-hint">✋ ¿Cómo se juega?</button>',
            '<button class="btn btn-ghost" id="rot-listen">🔊 Escuchar</button>',
          '</div>',
        '</div>',
        '<div class="remember">',
          '<div class="remember-title">🔑 RECUERDA</div>',
          '<div class="remember-rule">ROTACIÓN = gira sobre sí misma = <b>día 🌞 y noche 🌙</b></div>',
        '</div>',
        '<button class="btn btn-primary btn-big" id="rot-continue">¡Lo entiendo! Continuar ➜</button>',
      '</section>',
    ].join('');
  },

  m1Translation() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 1 · Ver y hacer</span>',
          '<h2>🌍→☀️ TRASLACIÓN</h2>',
          '<p class="lead">La Tierra se mueve alrededor del Sol. ¡Arrástrala por su órbita!</p>',
        '</div>',
        '<div class="demo-card">',
          '<div class="orbit-stage" id="orbit-stage">',
            '<div class="orbit-ring" aria-hidden="true"></div>',
            '<div class="orbit-sun" aria-hidden="true">☀️</div>',
            '<div class="orbit-marker" data-angle="45"><span class="mk-icon" aria-hidden="true">🌸</span>Primavera</div>',
            '<div class="orbit-marker" data-angle="135"><span class="mk-icon" aria-hidden="true">☀️</span>Verano</div>',
            '<div class="orbit-marker" data-angle="225"><span class="mk-icon" aria-hidden="true">🍂</span>Otoño</div>',
            '<div class="orbit-marker" data-angle="315"><span class="mk-icon" aria-hidden="true">❄️</span>Invierno</div>',
            '<div class="orbit-earth" id="orbit-earth" role="img" aria-label="La Tierra"></div>',
          '</div>',
          '<div class="season-badge" id="season-badge">🌸 Primavera · 92 días</div>',
          '<div class="demo-controls">',
            '<button class="btn btn-sun" id="orbit-auto">▶️ ¡En órbita!</button>',
            '<button class="btn btn-sky" id="orbit-drag-hint">✋ ¿Cómo se juega?</button>',
            '<button class="btn btn-ghost" id="orbit-listen">🔊 Escuchar</button>',
          '</div>',
        '</div>',
        '<div class="remember">',
          '<div class="remember-title">🔑 RECUERDA</div>',
          '<div class="remember-rule">TRASLACIÓN = alrededor del Sol = <b>estaciones 🌸☀️🍂❄️</b></div>',
        '</div>',
        '<button class="btn btn-primary btn-big" id="tra-continue">¡Lo entiendo! Continuar ➜</button>',
      '</section>',
    ].join('');
  },

  m1Compare() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 1 · Comparar</span>',
          '<h2>¿Rotación o traslación?</h2>',
          '<p class="lead">Mira las dos columnas y diferencialas.</p>',
        '</div>',
        '<div style="display:grid;gap:16px;">',
          '<div class="card" style="border-top:8px solid var(--sky-deep);">',
            '<h3 style="color:#12558f;">🌍↻ ROTACIÓN</h3>',
            '<p style="font-size:19px;">La Tierra <b>gira sobre sí misma</b>.</p>',
            '<p style="font-size:19px;">Produce: <b>el día 🌞 y la noche 🌙</b>.</p>',
          '</div>',
          '<div class="card" style="border-top:8px solid var(--sun-deep);">',
            '<h3 style="color:#8a5200;">🌍→☀️ TRASLACIÓN</h3>',
            '<p style="font-size:19px;">La Tierra <b>se mueve alrededor del Sol</b>.</p>',
            '<p style="font-size:19px;">Produce: <b>las estaciones 🌸☀️🍂❄️</b>.</p>',
          '</div>',
        '</div>',
        '<button class="btn btn-primary btn-big" data-go="m1Drag">¡A jugar! ➜</button>',
      '</section>',
    ].join('');
  },

  m1Drag() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 1 · Jugar</span>',
          '<h2>¿Puedes distinguirlas?</h2>',
          '<p class="lead">Arrastra cada palabra a su movimiento. (O toca una palabra y luego toca su cuadro.)</p>',
        '</div>',
        '<div class="match-game" id="earth-match" style="background:rgba(255,255,255,.06);border-radius:var(--radius);padding:22px;">',
          '<div class="match-targets">',
            '<div class="match-target" data-drop data-target="ROTACIÓN"><span class="mt-icon" aria-hidden="true">🌍↻</span>ROTACIÓN</div>',
            '<div class="match-target" data-drop data-target="TRASLACIÓN"><span class="mt-icon" aria-hidden="true">🌍→☀️</span>TRASLACIÓN</div>',
          '</div>',
          '<div class="match-items">',
            '<button class="chip chip-drag" data-drag data-target="ROTACIÓN" data-concept="rotation">🌞🌙 Día y noche</button>',
            '<button class="chip chip-drag" data-drag data-target="ROTACIÓN" data-concept="rotation">Gira sobre sí misma</button>',
            '<button class="chip chip-drag" data-drag data-target="TRASLACIÓN" data-concept="translation">🌸☀️🍂❄️ Estaciones</button>',
            '<button class="chip chip-drag" data-drag data-target="TRASLACIÓN" data-concept="translation">Alrededor del Sol</button>',
          '</div>',
        '</div>',
      '</section>',
    ].join('');
  },

  /* ---------- MISIÓN 2 ---------- */
  m2Start() {
    return [
      '<section class="screen">',
        '<div class="mission-head">',
          '<span class="mission-badge">🌙 MISIÓN 2 DE 3</span>',
          '<h2>Descubre la Luna</h2>',
          '<p class="lead">La Luna cambia de forma cada noche. Aprende sus cuatro fases.</p>',
        '</div>',
        '<button class="btn btn-primary btn-big" data-go="m2Cards">🌙 ¡A explorar!</button>',
      '</section>',
    ].join('');
  },

  m2Cards() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 2 · Ver</span>',
          '<h2>Las cuatro fases de la Luna</h2>',
          '<p class="lead">Mira cada Luna y recuerda su nombre.</p>',
        '</div>',
        '<div class="moon-cards">',
          CONTENT.moon.map(m => (
            '<div class="moon-card">' +
              moonHTML(m.id, 92) +
              '<div class="shape-circle sm' + (m.shape ? '' : ' empty') + '" aria-hidden="true"><span>' + m.shape + '</span></div>' +
              '<h3>' + m.name + '</h3>' +
              '<p>' + m.desc + '</p>' +
              (m.id === 'waxing' ? '<span class="dir">👉 DERECHA</span>' : '') +
              (m.id === 'waning' ? '<span class="dir">👈 IZQUIERDA</span>' : '') +
            '</div>'
          )).join(''),
        '</div>',
        '<button class="btn btn-primary btn-big" data-go="m2Explorer">¡Las conozco! Continuar ➜</button>',
      '</section>',
    ].join('');
  },

  m2Explorer() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 2 · Hacer</span>',
          '<h2>Explorador de la Luna</h2>',
          '<p class="lead">Mueve la rueda y observa cómo cambia la Luna.</p>',
        '</div>',
        '<div class="demo-card">',
          '<div class="explorer">',
            '<button class="arrow" id="moon-prev" aria-label="Fase anterior">◀</button>',
            '<div class="moon-big" id="moon-big">' + moonHTML('new', 150) + '</div>',
            '<div class="shape-circle" id="moon-shape" role="img" aria-label="Silueta de la Luna"><span id="moon-shape-letter"></span></div>',
            '<button class="arrow" id="moon-next" aria-label="Fase siguiente">▶</button>',
          '</div>',
          '<input type="range" class="moon-slider" id="moon-slider" min="0" max="3" step="1" value="0" aria-label="Elige una fase de la Luna" />',
          '<div class="phase-name" id="phase-name">🌑 LUNA NUEVA</div>',
          '<p class="phase-desc" id="phase-desc">' + CONTENT.moon[0].desc + '</p>',
          '<div class="remember">',
            '<div class="remember-title">🧠 TRUCO DE LAS FORMAS</div>',
            '<div class="mnemonic">',
              '<span class="mn">🌑 nueva: no se ve</span>',
              '<span class="mn">🌓 creciente: <i>D</i> = derecha 👉</span>',
              '<span class="mn">🌕 llena: <i>O</i></span>',
              '<span class="mn">🌗 menguante: <i>C</i> = izquierda 👈</span>',
            '</div>',
            '<div class="remember-rule">Creciente = <b>D</b> · Menguante = <b>C</b></div>',
          '</div>',
          '<div class="demo-controls">',
            '<button class="btn btn-sun" id="moon-auto">▶️ Ver las fases</button>',
            '<button class="btn btn-ghost" id="moon-listen">🔊 Escuchar</button>',
          '</div>',
        '</div>',
        '<button class="btn btn-primary btn-big" data-go="m2Guess">¡A jugar! ➜</button>',
      '</section>',
    ].join('');
  },

  m2Guess() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 2 · Jugar</span>',
          '<h2>¿Qué Luna soy?</h2>',
          '<p class="lead">Mira la Luna y elige su nombre. ¡Y también al revés!</p>',
        '</div>',
        '<div class="mem-stats" id="guess-progress"><span>Ronda 1 de 6</span><span>✅ 0</span></div>',
        '<div id="guess-area" style="display:flex;flex-direction:column;gap:16px;"></div>',
      '</section>',
    ].join('');
  },

  m2Memory() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 2 · Jugar (opcional)</span>',
          '<h2>Memoria Lunar</h2>',
          '<p class="lead">Encuentra cada nombre con su Luna: toca dos cartas. Si son la pareja, se quedan abiertas.</p>',
        '</div>',
        '<div class="mem-stats" id="mem-stats"><span>🎴 Parejas: 0 / 4</span><span>🔄 Movimientos: 0</span><span>👀 Carta elegida: 0 de 2</span></div>',
        '<div class="mem-grid" id="mem-grid"></div>',
        '<div class="demo-controls">',
          '<button class="btn btn-sun" id="mem-peek">👀 Ver todas</button>',
          '<button class="btn btn-sky btn-small" id="mem-restart">🔄 Reiniciar</button>',
          '<button class="btn btn-ghost" id="mem-skip">Saltar</button>',
        '</div>',
      '</section>',
    ].join('');
  },

  /* ---------- MISIÓN 3 ---------- */
  m3Start() {
    return [
      '<section class="screen">',
        '<div class="mission-head">',
          '<span class="mission-badge">🌸 MISIÓN 3 DE 3</span>',
          '<h2>El reto de las estaciones</h2>',
          '<p class="lead">¿Cuántos días dura cada estación? ¡Vamos a descubrirlo!</p>',
        '</div>',
        '<button class="btn btn-primary btn-big" data-go="m3Wheel">🌸 ¡Al reto!</button>',
      '</section>',
    ].join('');
  },

  m3Wheel() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 3 · Ver</span>',
          '<h2>Las estaciones del año</h2>',
          '<p class="lead">La Tierra tarda un año en dar la vuelta al Sol. En ese viaje vivimos 4 estaciones.</p>',
        '</div>',
        '<div class="wheel" id="wheel">',
          '<div class="wheel-center" aria-hidden="true">☀️<span>Sol</span></div>',
          CONTENT.seasons.map((s, i) =>
            '<div class="wheel-card ' + (s.id === 'autumn' ? 'wc-autumn' : '') + '" data-angle="' + (45 + i * 90) + '">' +
              '<span class="wc-icon" aria-hidden="true">' + s.icon + '</span>' +
              '<h3>' + s.name + '</h3>' +
              '<span class="wc-days">' + s.days + ' días</span>' +
              '<span class="wc-start">Empieza: ' + s.starts + '</span>' +
              '<span class="wc-months">' + s.months.join(' · ') + '</span>' +
            '</div>').join(''),
        '</div>',
        '<div class="trick-card">',
          '<div class="remember-title">🗓️ LOS MESES DE CADA ESTACIÓN</div>',
          '<div class="mnemonic">',
            CONTENT.seasons.map(s =>
              '<span class="mn">' + s.icon + ' ' + s.name + ': ' +
              s.months.map(m => '<i>' + m + '</i>').join(', ') + '</span>').join(''),
          '</div>',
          '<p class="trick-phrase">Ojo: el invierno empieza en <b>diciembre</b> y se acaba en <b>febrero</b>.</p>',
        '</div>',
        '<div class="trick-card">',
          '<div class="remember-title">🧠 TRUCO PARA RECORDAR</div>',
          '<div class="trick-nums">',
            '<span class="trick-num">🌸 92</span>',
            '<span class="trick-num">☀️ 92</span>',
            '<span class="trick-num different">🍂 89</span>',
            '<span class="trick-num">❄️ 92</span>',
          '</div>',
          '<p class="trick-phrase">Tres duran <b>92 días</b>. ¡El <b>otoño</b> dura <b>89</b>!</p>',
        '</div>',
        '<button class="btn btn-primary btn-big" data-go="m3Build">¡Lo entiendo! Continuar ➜</button>',
      '</section>',
    ].join('');
  },

  m3Build() {
    return [
      '<section class="screen">',
        '<div class="step-head">',
          '<span class="kicker">Misión 3 · Hacer</span>',
          '<h2>Construye el año</h2>',
          '<p class="lead">Ordena las estaciones y asígnales sus días.</p>',
        '</div>',
        '<div class="remember">',
          '<div class="remember-title">🧠 TRUCO</div>',
          '<div class="remember-rule">' + CONTENT.trick + '</div>',
          '<p style="font-weight:800;font-size:19px;">' + CONTENT.trickPhrase + '</p>',
        '</div>',
        '<div id="build-game" style="display:flex;flex-direction:column;gap:20px;"></div>',
      '</section>',
    ].join('');
  },

  /* ---------- DESAFÍO FINAL ---------- */
  finalIntro() {
    const listo = save.missions.m1 && save.missions.m2 && save.missions.m3;
    return [
      '<section class="screen final-intro">',
        '<span class="big-emoji" aria-hidden="true">🚀</span>',
        '<h2>DESAFÍO FINAL</h2>',
        '<p class="lead">' + PERFIL.nombre + ', vamos a comprobar cuánto sabes.<br><b>13 preguntas</b> de las tres misiones.</p>',
        listo ? carneHTML() : '<p class="lead">Termina las tres misiones para poder empezar.</p>',
        '<button class="btn btn-primary btn-huge" id="btn-final-start">EMPEZAR</button>',
        '<button class="btn btn-ghost" data-go="home">🏠 Volver al inicio</button>',
      '</section>',
    ].join('');
  },

  /* ---------- RESULTADOS ---------- */
  results() {
    const r = state.lastResult;
    if (!r) return SCREENS.home();
    const ratio = r.total ? r.correct / r.total : 0;
    const stars = ratio >= 0.85 ? 3 : ratio >= 0.6 ? 2 : 1;
    const blocks = [
      { key: 'earth', icon: '🌍', name: 'Tierra' },
      { key: 'moon', icon: '🌙', name: 'Luna' },
      { key: 'seasons', icon: '🌸', name: 'Estaciones' },
    ].map(b => Object.assign({}, b, { errors: blockErrors(b.key) }));
    const anyErrors = blocks.some(x => x.errors > 0);
    const ready = r.mode === 'ready';
    let tierHTML = '';
    if (ready) {
      const c = r.correct;
      tierHTML = c >= 9
        ? '<div class="ready-tier tier-great">🏆 ¡Estás preparada!</div>'
        : c >= 7
          ? '<div class="ready-tier tier-almost">⭐ ¡Casi lo tienes! Repasemos un poquito.</div>'
          : '<div class="ready-tier tier-train">🚀 Vamos a entrenar otra misión.</div>';
    }
    const title = ready ? '✅ TU RESULTADO'
      : r.mode === 'review' ? '🎯 ¡PRÁCTICA TERMINADA!'
      : '🎉 ¡MISIÓN COMPLETADA!';
    return [
      '<section class="screen results">',
        '<h2 class="results-title">' + title + '</h2>',
        '<div class="score-card">',
          '<div class="score-avatar" aria-hidden="true">🧑‍🚀</div>',
          '<div class="score-big">' + r.correct + ' / ' + r.total + '</div>',
          '<div class="score-sub">correctas a la primera · ' + PERFIL.nombre + '</div>',
          '<div class="stars" role="img" aria-label="' + stars + ' de 3 estrellas">',
            [1, 2, 3].map(i => '<span class="' + (i <= stars ? 'star-on' : 'star-off') + '" aria-hidden="true">⭐</span>').join(''),
          '</div>',
        '</div>',
        tierHTML,
        '<div class="mastery">',
          blocks.map(x =>
            '<div class="mastery-row ' + (x.errors > 0 ? 'review' : 'ok') + '">' +
              '<span class="mastery-icon" aria-hidden="true">' + x.icon + '</span>' +
              '<span class="mastery-name">' + x.name + '</span>' +
              '<span class="mastery-state">' + (x.errors > 0 ? '🔁 Repasar' : '✅ Dominado') + '</span>' +
            '</div>').join(''),
        '</div>',
        '<div class="result-actions">',
          anyErrors ? '<button class="btn btn-primary btn-big" id="btn-review">🎯 Practicar lo que me cuesta</button>' : '',
          ready ? '' : '<button class="btn btn-sun btn-big" id="btn-ready">✅ ¿Estoy preparada?</button>',
          '<button class="btn btn-sky btn-big" data-go="home">🏠 Volver al inicio</button>',
          '<button class="btn btn-ghost btn-big" id="btn-reset">🔄 Empezar de nuevo</button>',
        '</div>',
      '</section>',
    ].join('');
  },
};

/* ============================================================
   11. LÓGICO DE CADA PANTALLA
   ============================================================ */
const BIND = {

  home() {
    $('#btn-start').onclick = () => { sfx.pop(); go(nextMissionScreen()); };
    const ready = $('#btn-ready-home');
    if (ready) ready.onclick = () => { sfx.pop(); startReady(); };
    $('#btn-reset-home').onclick = () => resetAll();
    const vt = $('#btn-voice-test');
    if (vt) vt.onclick = () => {
      if (!save.settings.voice) {
        toast('🔇 La voz está apagada: pulsa el botón 🔊 de la barra superior para probarla.');
        pulsarBotonVoz();
        return;
      }
      // Campanita + locución: si suena la campana pero no la voz, el problema
      // está en las voces del dispositivo; si no suena nada, está el volumen.
      sfx.good();
      vozAvisada = false;
      if ('speechSynthesis' in window && !speechSynthesis.getVoices().length) {
        try { speechSynthesis.getVoices(); } catch (e) {}
      }
      narrar('¡Hola! Soy la maestra de ' + PERFIL.nombre +
        '. Si me oyes, la voz ya funciona. Vamos a preparar el examen de Sociales.');
    };
  },

  /* ---------- Rotación (WOW 1) ---------- */
  m1Rotation() {
    const earth = $('#rot-earth');
    const surface = $('#rot-surface');
    const badge = $('#dn-badge');
    let angle = 0, playing = false, raf = null, last = 0;
    const SPEED = 55; // grados por segundo

    function apply() {
      surface.style.transform = 'rotate(' + angle + 'deg)';
      updateBadge();
    }
    function updateBadge() {
      // El personaje 🧒 está arriba de la superficie (ángulo -90°).
      // La mitad iluminada mira al Sol (a la derecha, 0°).
      const charAngle = (angle - 90) * Math.PI / 180;
      const day = Math.cos(charAngle) > 0;
      badge.classList.toggle('night', !day);
      badge.innerHTML = day ? '🌞 DÍA' : '🌙 NOCHE';
    }
    function stop() {
      playing = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      const b = $('#rot-auto');
      if (b) b.innerHTML = '▶️ Girar';
    }
    function play() {
      playing = true;
      const b = $('#rot-auto');
      if (b) b.innerHTML = '⏸️ Parar';
      last = performance.now();
      const step = t => {
        if (!playing) return;
        const dt = (t - last) / 1000;
        last = t;
        angle = (angle + SPEED * dt) % 360;
        apply();
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    $('#rot-auto').onclick = () => { sfx.pop(); if (playing) stop(); else play(); };

    let dragging = false, startX = 0, startAngle = 0;
    const dragRot = {
      finish(x, y, cancelado) {
        dragsActivos.delete(dragRot);
        if (!dragging) return;
        dragging = false;
        earth.classList.remove('dragging');
        if (!cancelado && x != null) { angle = startAngle + (x - startX) * 1.4; apply(); }
      },
    };
    earth.addEventListener('pointerdown', e => {
      stop();
      dragging = true;
      startX = e.clientX;
      startAngle = angle;
      try { earth.setPointerCapture(e.pointerId); } catch (err) {}
      earth.classList.add('dragging');
      registrarDrag(dragRot);
      e.preventDefault();
    });
    earth.addEventListener('pointermove', e => {
      if (!dragging) return;
      refrescarDrag(dragRot);
      angle = startAngle + (e.clientX - startX) * 1.4;
      apply();
    });
    earth.addEventListener('pointerup', e => dragRot.finish(e.clientX, e.clientY, false));
    earth.addEventListener('pointercancel', () => dragRot.finish(null, null, true));
    earth.addEventListener('lostpointercapture', () => {
      setTimeout(() => { if (dragging) dragRot.finish(null, null, true); }, 0);
    });
    earth.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { stop(); angle = (angle + 30) % 360; apply(); }
      if (e.key === 'ArrowLeft') { stop(); angle = (angle - 30 + 360) % 360; apply(); }
    });

    $('#rot-drag-hint').onclick = () => {
      toast('¡Arrastra la Tierra con el dedo o el ratón! 👆');
      narrar('Coge la Tierra con el dedito y gírala despacio, ' + PERFIL.vocativo + '. Mira bien: la mitad que mira al Sol es el día, y la otra mitad es la noche. ¿Lo ves?');
    };
    $('#rot-listen').onclick = () => narrar('A ver, ' + PERFIL.nombre + '. La Tierra no está quieta: da vueltas sobre sí misma, igual que una peonza. A ese movimiento le dicen ROTACIÓN. Y gracias a él, un lado está de día mientras el otro está de noche.');
    $('#rot-continue').onclick = () => {
      sfx.pop();
      startQuiz({ mode: 'mini', questions: [MINI.rotation], afterDone: () => go('m1Translation') });
    };

    apply();
    state.cleanups.push(stop);
  },

  /* ---------- Traslación (WOW 2) ---------- */
  m1Translation() {
    const stage = $('#orbit-stage');
    const earthEl = $('#orbit-earth');
    const badge = $('#season-badge');
    const SEASONS = CONTENT.seasons;

    $$('.orbit-marker', stage).forEach(mk => {
      const a = parseFloat(mk.dataset.angle) * Math.PI / 180;
      mk.style.left = 'calc(50% + ' + (Math.cos(a) * 41).toFixed(1) + '%)';
      mk.style.top = 'calc(50% + ' + (Math.sin(a) * 41).toFixed(1) + '%)';
    });

    let angle = 30, playing = false, raf = null, last = 0;

    function layout() {
      const w = stage.clientWidth;
      const r = w / 2 - 30;
      const rad = angle * Math.PI / 180;
      earthEl.style.left = (w / 2 + r * Math.cos(rad)) + 'px';
      earthEl.style.top = (w / 2 + r * Math.sin(rad)) + 'px';
      const idx = Math.floor((((angle % 360) + 360) % 360) / 90) % 4;
      const s = SEASONS[idx];
      badge.innerHTML = s.icon + ' ' + s.name + ' · ' + s.days + ' días';
    }
    function stop() {
      playing = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      const b = $('#orbit-auto');
      if (b) b.innerHTML = '▶️ ¡En órbita!';
    }
    function play() {
      playing = true;
      const b = $('#orbit-auto');
      if (b) b.innerHTML = '⏸️ Parar';
      last = performance.now();
      const step = t => {
        if (!playing) return;
        const dt = (t - last) / 1000;
        last = t;
        angle = (angle + 26 * dt) % 360;
        layout();
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }

    $('#orbit-auto').onclick = () => { sfx.pop(); if (playing) stop(); else play(); };
    $('#orbit-listen').onclick = () => narrar(PERFIL.nombre + ', ahora mira el viaje entero. La Tierra da una vuelta grandísima alrededor del Sol, y por el camino va cambiando el tiempo: primavera, verano, otoño e invierno. A ese viaje se le llama TRASLACIÓN.');
    $('#orbit-drag-hint').onclick = () => {
      toast('Toca la pantalla y arrastra la Tierra 🌍 alrededor del Sol');
      narrar('Lleva la Tierra alrededor del Sol con el dedito, ' + PERFIL.nombre + ', como si fuera una nave. Y fíjate cómo va cambiando la estación.');
    };
    $('#tra-continue').onclick = () => {
      sfx.pop();
      startQuiz({ mode: 'mini', questions: [MINI.translation], afterDone: () => go('m1Compare') });
    };

    let dragging = false;
    function angleFromEvent(e) {
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return (Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 360) % 360;
    }
    const dragOrbit = {
      finish(x, y, cancelado) {
        dragsActivos.delete(dragOrbit);
        dragging = false;
      },
    };
    stage.addEventListener('pointerdown', e => {
      stop();
      dragging = true;
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
      registrarDrag(dragOrbit);
      angle = angleFromEvent(e);
      layout();
      e.preventDefault();
    });
    stage.addEventListener('pointermove', e => {
      if (!dragging) return;
      refrescarDrag(dragOrbit);
      angle = angleFromEvent(e);
      layout();
    });
    stage.addEventListener('pointerup', () => dragOrbit.finish(null, null, false));
    stage.addEventListener('pointercancel', () => dragOrbit.finish(null, null, true));
    stage.addEventListener('lostpointercapture', () => {
      setTimeout(() => { if (dragging) dragOrbit.finish(null, null, true); }, 0);
    });

    layout();
    const onResize = () => layout();
    window.addEventListener('resize', onResize);
    state.cleanups.push(stop, () => window.removeEventListener('resize', onResize));
  },

  m1Drag() {
    setupMatchGame($('#earth-match'), () => {
      setTimeout(() => awardMedal(MEDALS.m1), 450);
    });
  },

  /* ---------- Explorador de la Luna (WOW 3) ---------- */
  m2Explorer() {
    let idx = 0;
    let auto = null;
    const slider = $('#moon-slider');

    function setPhase(i, speakIt) {
      idx = (i + 4) % 4;
      const m = CONTENT.moon[idx];
      $('#moon-big').innerHTML = moonHTML(m.id, 150);
      $('#phase-name').textContent = m.emoji + ' ' + m.name.toUpperCase();
      $('#phase-desc').textContent = m.desc;
      slider.value = idx;
      const letra = $('#moon-shape-letter');
      if (letra) letra.textContent = m.shape;
      if (speakIt !== false) speak('Esta es ' + m.phrase + '.' + (m.shape ? ' Tiene forma de ' + m.shape + '.' : '') + ' ' + m.desc);
    }
    function stopAuto() {
      if (auto) clearInterval(auto);
      auto = null;
      const b = $('#moon-auto');
      if (b) b.innerHTML = '▶️ Ver las fases';
    }
    function playAuto() {
      const b = $('#moon-auto');
      if (b) b.innerHTML = '⏸️ Parar';
      auto = setInterval(() => setPhase(idx + 1), 1800);
    }

    $('#moon-prev').onclick = () => { sfx.pop(); stopAuto(); setPhase(idx - 1); };
    $('#moon-next').onclick = () => { sfx.pop(); stopAuto(); setPhase(idx + 1); };
    slider.addEventListener('input', () => { stopAuto(); setPhase(+slider.value, false); });
    $('#moon-auto').onclick = () => { sfx.pop(); if (auto) stopAuto(); else playAuto(); };
    $('#moon-listen').onclick = () => {
      const m = CONTENT.moon[idx];
      narrar('Esta es ' + m.phrase + '.' + (m.shape ? ' Tiene forma de ' + m.shape + '.' : '') + ' ' + m.desc);
    };

    state.cleanups.push(stopAuto);
  },

  /* ---------- ¿Qué Luna soy? ---------- */
  m2Guess() {
    const area = $('#guess-area');
    const progress = $('#guess-progress');
    const rounds = buildGuessRounds();
    const game = { i: 0, correct: 0 };

    renderRound();

    function renderRound() {
      // Salvaguarda: si ya no quedan rondas, no volvemos a pintar.
      if (!rounds[game.i]) return;
      progress.innerHTML = '<span>Ronda ' + (game.i + 1) + ' de ' + rounds.length + '</span><span>✅ ' + game.correct + '</span>';
      const r = rounds[game.i];
      const m = CONTENT.moon.find(x => x.id === r.id);
      if (r.type === 'name') {
        area.innerHTML = [
          '<div class="card guess-card">',
            '<div class="guess-visual">' + moonHTML(m.id, 150) + '</div>',
            '<h3>¿Qué fase es?</h3>',
            '<div class="quiz-options option-grid">',
              shuffle(CONTENT.moon.slice()).map(x =>
                '<button class="btn option" data-value="' + x.id + '">' + x.name + '</button>').join(''),
            '</div>',
          '</div>',
        ].join('');
      } else {
        area.innerHTML = [
          '<div class="card guess-card">',
            '<h3>Pulsa: ' + m.emoji + ' ' + m.name + '</h3>',
            '<div class="quiz-options vis-grid">',
              shuffle(CONTENT.moon.slice()).map(x =>
                '<button class="vis-option" data-value="' + x.id + '">' + moonHTML(x.id, 96) +
                '<span class="vis-label">' + x.name + '</span></button>').join(''),
            '</div>',
          '</div>',
        ].join('');
      }
      $$('[data-value]', area).forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.disabled) return;                 // evita dobles toques
          const ok = btn.dataset.value === r.id;
          if (ok) {
            sfx.good();
            btn.classList.add('correct');
            $$('[data-value]', area).forEach(b => { b.disabled = true; });
            game.correct++;
            game.i++;
            if (game.i >= rounds.length) setTimeout(() => go('m2Memory'), 800);
            else setTimeout(renderRound, 800);
          } else {
            sfx.bad();
            btn.classList.add('wrong');
            recordError(r.concept);
            const right = $('[data-value="' + r.id + '"]', area);
            if (right) right.classList.add('correct');
            $$('[data-value]', area).forEach(b => { b.disabled = true; });
            area.insertAdjacentHTML('beforeend', [
              '<div class="fb fb-bad">',
                '<div class="fb-title">🌱 ¡Casi! Mira otra vez la Luna.</div>',
                '<div class="fb-text">Es <b>' + m.emoji + ' ' + m.name.toLowerCase() + '</b>. ' + m.desc + '</div>',
                '<div class="fb-actions"><button class="btn btn-sun btn-big" id="guess-retry">🔁 Volver a intentar</button></div>',
              '</div>',
            ].join(''));
            $('#guess-retry').onclick = () => {
              sfx.pop();
              const fb = area.querySelector('.fb');
              if (fb) fb.remove();
              renderRound();
            };
          }
        });
      });
    }
  },

  /* ---------- Memoria lunar ---------- */
  m2Memory() {
    const grid = $('#mem-grid');
    const game = { flipped: [], matched: 0, lock: false, moves: 0 };

    function build() {
      game.flipped = [];
      game.matched = 0;
      game.moves = 0;
      const cards = shuffle(CONTENT.moon.flatMap(m => [
        { id: m.id, type: 'name', label: m.name },
        { id: m.id, type: 'image', label: m.id },
      ]));
      grid.innerHTML = cards.map(c =>
        '<button class="mem-card" data-id="' + c.id + '" data-type="' + c.type + '" aria-label="' +
            (c.type === 'image' ? 'Carta: imagen de ' + esc(c.label) : 'Carta: ' + esc(c.label)) + '">' +
          '<span class="mem-inner">' +
            '<span class="mem-face mem-back" aria-hidden="true">✦</span>' +
            '<span class="mem-face mem-front">' + (c.type === 'image' ? moonHTML(c.id, 58) : esc(c.label)) + '</span>' +
          '</span>' +
        '</button>').join('');
      $$('.mem-card', grid).forEach(card => card.addEventListener('click', () => flip(card)));
      updateStats();
    }
    function updateStats() {
      const abiertas = game.flipped.length;
      $('#mem-stats').innerHTML =
        '<span>🎴 Parejas: ' + game.matched + ' / 4</span>' +
        '<span>🔄 Movimientos: ' + game.moves + '</span>' +
        '<span>👀 Carta elegida: ' + abiertas + ' de 2</span>';
    }
    function flip(card) {
      // Solo se ignoran las dos cartas que ya están dadas la vuelta.
      // Antes había un "candado" global de casi un segundo en el que TODOS
      // los clics se perdían: parecía que el juego no respondía.
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
      sfx.flip();
      card.classList.add('flipped');
      game.flipped.push(card);
      if (game.flipped.length < 2) {
        updateStats();
        return;
      }
      game.moves++;
      const a = game.flipped[0];
      const b = game.flipped[1];
      game.flipped = [];            // el tablero vuelve a estar libre al instante
      updateStats();
      if (a.dataset.id === b.dataset.id && a.dataset.type !== b.dataset.type) {
        a.classList.add('matched');
        b.classList.add('matched');
        game.matched++;
        sfx.pop();
        const fase = CONTENT.moon.find(m => m.id === a.dataset.id);
        toast('✨ ¡Pareja! ' + (fase ? fase.name : ''));
        updateStats();
        if (game.matched === 4) setTimeout(() => awardMedal(MEDALS.m2), 700);
      } else {
        sfx.bad();
        a.classList.add('shake');
        b.classList.add('shake');
        setTimeout(() => { a.classList.remove('shake'); b.classList.remove('shake'); }, 500);
        toast('🔄 No es esa… fíjate bien y sigue buscando');
        // Se quedan boca arriba un momento para poder memorizarlas.
        setTimeout(() => {
          a.classList.remove('flipped');
          b.classList.remove('flipped');
        }, 1000);
      }
    }

    let peekT = null;
    function pararPista() { clearTimeout(peekT); peekT = null; }

    build();
    $('#mem-restart').onclick = () => { sfx.pop(); pararPista(); build(); };
    const peek = $('#mem-peek');
    if (peek) peek.onclick = () => {
      sfx.pop();
      const cartas = $$('.mem-card', grid);
      cartas.forEach(c => c.classList.add('peek'));
      toast('👀 Míralas bien… se van a cerrar');
      pararPista();
      peekT = setTimeout(() => { cartas.forEach(c => c.classList.remove('peek')); peekT = null; }, 1500);
    };
    state.cleanups.push(pararPista);
    $('#mem-skip').onclick = () => {
      if (confirm('¿Saltar el juego de memoria? Puedes volver a jugarlo desde la Misión 2.')) awardMedal(MEDALS.m2);
    };
  },

  /* ---------- Rueda de las estaciones ---------- */
  m3Wheel() {
    $$('.wheel-card').forEach(card => {
      const a = parseFloat(card.dataset.angle) * Math.PI / 180;
      card.style.left = 'calc(50% + ' + (Math.cos(a) * 30).toFixed(1) + '%)';
      card.style.top = 'calc(50% + ' + (Math.sin(a) * 30).toFixed(1) + '%)';
    });
  },

  /* ---------- Construye el año ---------- */
  m3Build() {
    const area = $('#build-game');
    const game = { phase: 1 };

    renderPhase(1);

    function renderPhase(phase) {
      game.phase = phase;
      if (phase === 1) {
        area.innerHTML = [
          '<div class="build-slots" id="build-slots">',
            CONTENT.seasons.map((s, i) =>
              '<div class="build-slot" data-drop data-season="' + s.id + '">' +
                '<span class="slot-badge">' + (i + 1) + '</span>' +
                '<span class="slot-hint">' + s.icon + ' empieza en ' + s.short + '</span>' +
                '<span class="slot-months">' + s.months.join(' · ') + '</span>' +
                '<div class="slot-fill"></div>' +
              '</div>').join(''),
          '</div>',
          '<div class="build-pool" id="build-pool">',
            shuffle(CONTENT.seasons.slice()).map(s =>
              '<button class="chip chip-drag" data-drag data-season="' + s.id + '">' + s.icon + ' ' + s.name + '</button>').join(''),
          '</div>',
        ].join('');
      } else {
        area.innerHTML = [
          '<div class="build-slots" id="build-slots">',
            CONTENT.seasons.map(s =>
              '<div class="build-slot filled" data-drop data-season="' + s.id + '" data-days="' + s.days + '">' +
                '<span class="slot-season">' + s.icon + ' ' + s.name + '</span>' +
                '<span class="slot-months">' + s.months.join(' · ') + '</span>' +
                '<div class="slot-fill"><span class="slot-days-empty">¿cuántos días?</span></div>' +
              '</div>').join(''),
          '</div>',
          '<div class="build-pool" id="build-pool">',
            shuffle([92, 92, 89, 92]).map(d =>
              '<button class="chip chip-drag days-chip" data-drag data-days="' + d + '">' + d + ' días</button>').join(''),
          '</div>',
        ].join('');
      }
      setupBuildDnD();
    }

    function setupBuildDnD() {
      let selectedChip = null;
      const slots = $$('#build-slots .build-slot', area);

      function deselect() {
        if (selectedChip) selectedChip.classList.remove('selected');
        selectedChip = null;
      }
      function tryPlace(chip, slot) {
        if (!slot) return;
        if (slot.querySelector('.chip')) {
          slot.classList.add('shake');
          setTimeout(() => slot.classList.remove('shake'), 400);
          return;
        }
        slot.querySelector('.slot-fill').appendChild(chip);
        chip.classList.add('placed');
        const empty = $('.slot-days-empty', slot);
        if (empty) empty.remove();
        deselect();
        sfx.pop();
        if ($$('#build-slots .chip', area).length === slots.length) validate();
      }
      function validate() {
        let allOk = true;
        slots.forEach(slot => {
          const chip = $('.chip', slot);
          if (!chip) return;
          const ok = game.phase === 1
            ? chip.dataset.season === slot.dataset.season
            : chip.dataset.days === slot.dataset.days;
          if (ok) {
            chip.classList.add('correct');
          } else {
            allOk = false;
            recordError(game.phase === 1 ? 'seasonOrder' : slot.dataset.season + 'Days');
            setTimeout(() => {
              chip.classList.remove('placed', 'correct');
              chip.disabled = false;
              $('#build-pool', area).appendChild(chip);
              slot.querySelector('.slot-fill').innerHTML =
                game.phase === 2 ? '<span class="slot-days-empty">¿cuántos días?</span>' : '';
            }, 700);
          }
        });
        if (allOk) {
          sfx.good();
          if (game.phase === 1) {
            toast('¡Perfecto! Ahora asigna los días 🎯');
            setTimeout(() => renderPhase(2), 900);
          } else {
            setTimeout(() => {
              toast('¡Año construido! 🎉');
              startQuiz({
                mode: 'mini',
                questions: daysChallengeQuestions(),
                afterDone: () => awardMedal(MEDALS.m3),
              });
            }, 700);
          }
        } else {
          sfx.bad();
          toast(game.phase === 1
            ? '🔑 Orden: 🌸 primavera · ☀️ verano · 🍂 otoño · ❄️ invierno'
            : '🔑 Recuerda: 92 · 92 · 89 · 92. ¡El otoño tiene 89!');
        }
      }

      enableDrag(area, (chip, zone, e, tap) => {
        if (chip.classList.contains('placed')) return;
        if (tap) {
          if (selectedChip === chip) deselect();
          else { deselect(); selectedChip = chip; chip.classList.add('selected'); sfx.pop(); }
          return;
        }
        if (zone && zone.classList.contains('build-slot')) tryPlace(chip, zone);
      });
      slots.forEach(slot => {
        slot.setAttribute('role', 'button');
        slot.tabIndex = 0;
        slot.addEventListener('keydown', e => {
          if ((e.key === 'Enter' || e.key === ' ') && selectedChip && !selectedChip.classList.contains('placed')) {
            e.preventDefault();
            tryPlace(selectedChip, slot);
          }
        });
        onTap(slot, () => {
          if (selectedChip && !selectedChip.classList.contains('placed')) tryPlace(selectedChip, slot);
        });
      });
    }
  },

  finalIntro() {
    $('#btn-final-start').onclick = () => { sfx.pop(); startFinal(); };
  },

  results() {
    const review = $('#btn-review');
    if (review) review.onclick = () => { sfx.pop(); startReview(); };
    const ready = $('#btn-ready');
    if (ready) ready.onclick = () => { sfx.pop(); startReady(); };
    const reset = $('#btn-reset');
    if (reset) reset.onclick = () => resetAll();
  },
};

/* ============================================================
   12. GENERADORES DE PREGUNTAS
   ============================================================ */
function moonIdentifyQuestion() {
  const m = CONTENT.moon[Math.floor(Math.random() * CONTENT.moon.length)];
  const concept = 'moon' + cap(m.id);
  return {
    id: 'm-dyn', block: 'moon', concept: concept, type: 'imageIdentify',
    prompt: '¿Cómo se llama esta Luna?',
    visual: m.id,
    options: CONTENT.moon.map(x => x.name),
    answer: m.name,
    explain: 'Esta Luna es ' + m.phrase + '. ' + m.desc,
  };
}
function stratifiedPick(n) {
  const counts = { earth: Math.round(n * 0.38), moon: Math.round(n * 0.31) };
  counts.seasons = n - counts.earth - counts.moon;
  const picked = [];
  Object.keys(counts).forEach(block => {
    const count = counts[block];
    let pool = shuffle(BANK.filter(q => q.block === block)).slice(0, count);
    if (block === 'moon' && count > 0) {
      pool = pool.slice(0, Math.max(0, count - 1)).concat([moonIdentifyQuestion()]);
    }
    picked.push.apply(picked, pool);
  });
  return shuffle(picked);
}
function daysChallengeQuestions() {
  const extra = CONTENT.seasons[Math.floor(Math.random() * CONTENT.seasons.length)];
  return shuffle(CONTENT.seasons.concat([extra])).map(s => ({
    id: 'days-' + s.id, block: 'seasons', concept: s.id + 'Days', type: 'choice',
    prompt: '¿Cuántos días dura ' + ARTICLE[s.id] + ' ' + s.name.toLowerCase() + '?',
    options: shuffle([s.days, 89, 90, 92].filter((v, i, a) => a.indexOf(v) === i)).map(String),
    answer: String(s.days),
    explain: s.icon + ' ' + ARTICLE[s.id] + ' ' + s.name.toLowerCase() + ' dura ' + s.days + ' días.',
  }));
}
function buildGuessRounds() {
  const ids = shuffle(CONTENT.moon.map(m => m.id));
  const rounds = [];
  for (let i = 0; i < 6; i++) {
    const id = ids[i % 4];
    rounds.push({
      id: id,
      type: i % 2 === 0 ? 'name' : 'command',
      concept: 'moon' + cap(id),
    });
  }
  return rounds;
}

/* ============================================================
   13. MOTOR DEL QUIZ (final / repaso / ¿estoy preparada? / retos)
   ============================================================ */
const MODE_LABEL = {
  final: '🚀 DESAFÍO FINAL',
  review: '🎯 PRACTICAMOS LO QUE TE CUESTA',
  ready: '✅ ¿ESTOY PREPARADA?',
  mini: '🎮 RETO',
};
function startQuiz(cfg) {
  state.quiz = {
    mode: cfg.mode,
    questions: cfg.questions,
    i: 0, correct: 0, wrong: 0, attempts: 0,
    afterDone: cfg.afterDone || null,
    showHints: cfg.showHints !== false,
  };
  renderQuestion();
}
function startFinal() { startQuiz({ mode: 'final', questions: stratifiedPick(13) }); }
function startReady() { startQuiz({ mode: 'ready', questions: stratifiedPick(10), showHints: false }); }
function startReview() {
  const weak = weakConcepts();
  if (!weak.length) { toast('¡Lo tienes todo dominado! 🎉'); go('home'); return; }
  const qs = shuffle(BANK.filter(q => weak.indexOf(q.concept) !== -1)).slice(0, 10);
  if (weak.some(c => c.indexOf('moon') === 0) && !qs.some(q => q.type === 'imageIdentify')) {
    qs.push(moonIdentifyQuestion());
  }
  toast('Vamos a practicar un poquito más 💪');
  startQuiz({ mode: 'review', questions: qs });
}

function optionsHTML(q) {
  if (q.type === 'choice' || q.type === 'imageIdentify') {
    return '<div class="quiz-options option-grid">' +
      shuffle(q.options.slice()).map(o =>
        '<button class="btn option" data-value="' + esc(o) + '">' + esc(o) + '</button>').join('') +
      '</div>';
  }
  if (q.type === 'tf') {
    return '<div class="quiz-options tf-grid">' +
      '<button class="btn option option-tf" data-value="true">✅ Verdadero</button>' +
      '<button class="btn option option-tf" data-value="false">❌ Falso</button>' +
      '</div>';
  }
  if (q.type === 'imageChoice') {
    return '<div class="quiz-options vis-grid">' +
      shuffle(q.options.slice()).map(o => visOptionHTML(o)).join('') +
      '</div>';
  }
  if (q.type === 'match') return matchHTML(q);
  return '';
}
function matchHTML(q) {
  const targets = [];
  q.pairs.forEach(p => { if (targets.indexOf(p.target) === -1) targets.push(p.target); });
  return [
    '<div class="match-game">',
      '<div class="match-targets">',
        targets.map(t => {
          const moon = CONTENT.moon.find(m => m.id === t);
          const label = moon ? moon.name : t;
          const icon = moon ? moonHTML(t, 64) : '<span class="mt-icon">🔒</span>';
          return '<div class="match-target" data-drop data-target="' + esc(t) + '">' + icon + '<span>' + esc(label) + '</span></div>';
        }).join(''),
      '</div>',
      '<div class="match-items">',
        shuffle(q.pairs.map((p, i) => Object.assign({}, p, { key: i }))).map(p =>
          '<button class="chip chip-drag" data-drag data-target="' + esc(p.target) + '" data-concept="' + p.concept + '">' + esc(p.item) + '</button>').join(''),
      '</div>',
    '</div>',
  ].join('');
}

function renderQuestion() {
  runCleanups();
  const qz = state.quiz;
  if (!qz) { go('home'); return; }
  const q = qz.questions[qz.i];
  // OJO: no reiniciamos qz.attempts aquí. Ese reinicio ocurre en nextQuestion().
  // Si se reiniciara al reintentar, un fallo no contaría y la puntuación sería falsa.
  const pct = Math.round((qz.i / qz.questions.length) * 100);
  const listenBtn = qz.showHints
    ? '<button class="btn btn-ghost btn-small" id="quiz-listen">🔊 Escuchar la pregunta</button>'
    : '';
  app.innerHTML = [
    '<section class="screen quiz">',
      '<div class="quiz-head">',
        '<span class="quiz-mode">' + MODE_LABEL[qz.mode] + '</span>',
        '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:' + pct + '%"></div></div>',
        '<span class="quiz-count">Pregunta ' + (qz.i + 1) + ' de ' + qz.questions.length + '</span>',
      '</div>',
      '<div class="quiz-card" id="quiz-card">',
        '<h3 class="quiz-prompt">' + q.prompt + '</h3>',
        q.type === 'imageIdentify' ? '<div class="guess-visual">' + moonHTML(q.visual, 150) + '</div>' : '',
        optionsHTML(q),
      '</div>',
      '<div id="quiz-feedback-wrap" style="display:flex;justify-content:center;">' + listenBtn + '</div>',
      '<div class="quiz-feedback" id="quiz-feedback" aria-live="polite"></div>',
    '</section>',
  ].join('');
  updateHud();
  bindQuestion(q);
}

function bindQuestion(q) {
  const listen = $('#quiz-listen');
  if (listen) listen.onclick = () => narrar(q.prompt);
  if (q.type === 'match') {
    bindMatch(q);
    return;
  }
  $$('#quiz-card [data-value]').forEach(btn => {
    btn.addEventListener('click', () => answerQuestion(q, btn.dataset.value, btn));
  });
}
function bindMatch(q) {
  const container = $('#quiz-card .match-game');
  if (!container) return;
  setupMatchGame(container, () => matchSolved(q), () => {
    const qz = state.quiz;
    qz.attempts++;
    qz.wrong++;
    save.stats.wrong++;
    persist();
  });
}
function matchSolved(q) {
  const qz = state.quiz;
  if (qz.attempts === 0) { qz.correct++; save.stats.correct++; }
  sfx.good();
  persist();
  showFeedback(true, q.explain, q);
}
function isCorrectAnswer(q, val) {
  if (q.type === 'tf') return (val === 'true') === (q.answer === true);
  return String(val) === String(q.answer);
}
function answerQuestion(q, val, btn) {
  const qz = state.quiz;
  const ok = isCorrectAnswer(q, val);
  if (ok) {
    sfx.good();
    if (qz.attempts === 0) { qz.correct++; save.stats.correct++; }
    if (btn) btn.classList.add('correct');
    showFeedback(true, q.explain, q);
  } else {
    sfx.bad();
    qz.attempts++;
    qz.wrong++;
    save.stats.wrong++;
    recordError(q.concept);
    if (btn) btn.classList.add('wrong');
    showFeedback(false, q.explain, q);
  }
  persist();
}
function showFeedback(ok, explain, q) {
  const fb = $('#quiz-feedback');
  const qz = state.quiz;
  const last = qz.i === qz.questions.length - 1;
  const title = ok
    ? (qz.attempts === 0 ? '✅ ¡Muy bien!' : '✅ ¡Lo lograste!')
    : '🌱 ¡Casi! Mira esto:';
  // Si la explicación empieza con un "¡...!" de acierto, al fallar lo cambiamos
  // por una neutra para no contradecir el título.
  const texto = !ok ? String(explain).replace(/^¡\s*(Exacto|Muy bien|Perfecto|Sí)[^!]*!\s*/i, '') : explain;
  let hint = '';
  if (!ok) {
    if (q.hintVisual === 'spin') hint = '<div class="fb-visual">' + earthSpinHTML(96) + '</div>';
    if (q.hintVisual === 'orbit') hint = '<div class="fb-visual">' + earthOrbitHTML(132) + '</div>';
    if (q.type === 'imageChoice') {
      const right = $('[data-value="' + q.answer + '"]', $('#quiz-card'));
      if (right) right.classList.add('correct');
    }
  }
  fb.innerHTML = [
    '<div class="fb ' + (ok ? 'fb-ok' : 'fb-bad') + '">',
      '<div class="fb-title">' + title + '</div>',
      '<div class="fb-text">' + texto + '</div>',
      hint,
      '<div class="fb-actions">',
        ok
          ? '<button class="btn btn-primary btn-big" id="fb-next">' + (last ? '🏁 Ver resultado' : 'Siguiente ➜') + '</button>'
          : '<button class="btn btn-sun btn-big" id="fb-retry">🔁 Volver a intentar</button>',
      '</div>',
    '</div>',
  ].join('');
  fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  if (ok) {
    $('#fb-next').onclick = () => { sfx.pop(); nextQuestion(); };
    speak('¡Muy bien, ' + PERFIL.nombre + '! ' + texto);
  } else {
    $('#fb-retry').onclick = () => { sfx.pop(); renderQuestion(); };
    speak('Casi, ' + PERFIL.nombre + '. Vamos a verlo juntas: ' + texto);
  }
}
function nextQuestion() {
  const qz = state.quiz;
  qz.i++;
  qz.attempts = 0;          // ahora sí: pregunta nueva, intentos a cero
  if (qz.i >= qz.questions.length) finishQuiz();
  else renderQuestion();
}
function finishQuiz() {
  const qz = state.quiz;
  if (qz.mode === 'mini') {
    const cb = qz.afterDone;
    state.quiz = null;
    if (cb) cb();
    return;
  }
  state.lastResult = { mode: qz.mode, correct: qz.correct, total: qz.questions.length };
  if (qz.mode !== 'review') {
    save.stats.best = Math.max(save.stats.best, Math.round((qz.correct / qz.questions.length) * 100));
  }
  persist();
  state.quiz = null;
  go('results');
}

/* ============================================================
   14. ARRANQUE
   ============================================================ */
makeStars();
$('#btn-home').onclick = () => { sfx.pop(); go('home'); };
$('#btn-sound').onclick = () => {
  save.settings.voice = !save.settings.voice;
  persist();
  updateHud();
  if (save.settings.voice) {
    sfx.pop();
    speak('¡Perfecto! Ahora te lo leo todo, ' + PERFIL.nombre + '.');
    toast('🔊 Voz encendida: ya puedes oírla 🔈');
  } else {
    stopSpeak();
    toast('🔇 Voz apagada: puedes leer tú. Los campanitas siguen 🔔');
  }
};
render();
if (!save.settings.voice && !save.settings.voiceHint) {
  save.settings.voiceHint = true;
  persist();
  setTimeout(() => {
    toast('🔇 La voz está apagada. Pulsa el botón 🔊 de la barra superior si quieres oírla.');
    pulsarBotonVoz();
  }, 1500);
}
if (!almacenamientoDisponible) {
  setTimeout(() => toast('⚠️ Este navegador no guarda el progreso. Puedes jugar igual.'), 900);
}
