/**
 * gematria-engine.js - Core Gematria Engine & Torah Concept Database
 * Shabateinu NBI - Gematria Kid Feature
 */

const HEBREW_GEMATRIA_MAP = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40, 'נ': 50, 'ן': 50,
  'ס': 60, 'ע': 70, 'פ': 80, 'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100, 'ר': 200,
  'ש': 300, 'ת': 400
};

const BIBLICAL_NAME_OVERRIDES = {
  'abraham': 'אברהם',
  'isaac': 'יצחק',
  'yitzchak': 'יצחק',
  'jacob': 'יעקב',
  'yaakov': 'יעקב',
  'sara': 'שרה',
  'sarah': 'שרה',
  'rebeca': 'רבקה',
  'rivka': 'רבקה',
  'rivkah': 'רבקה',
  'raquel': 'רחל',
  'rachel': 'רחל',
  'lea': 'לאה',
  'leah': 'לאה',
  'moises': 'משה',
  'moshe': 'משה',
  'aaron': 'אהרן',
  'aharon': 'אהרן',
  'david': 'דוד',
  'shabat': 'שבת',
  'torah': 'תורה',
  'tora': 'תורה',
  'israel': 'ישראל',
  'shalom': 'שלום',
  'emet': 'אמת',
  'or': 'אור',
  'mitzva': 'מצוה',
  'mitzvah': 'מצוה',
  'jerusalen': 'ירושלים',
  'yerushalayim': 'ירושלים',
  'jai': 'חי',
  'chai': 'חי'
};

function calculateHebrewGematria(hebrewText) {
  if (!hebrewText || typeof hebrewText !== 'string') return 0;
  
  let total = 0;
  for (const char of hebrewText) {
    if (HEBREW_GEMATRIA_MAP[char]) {
      total += HEBREW_GEMATRIA_MAP[char];
    }
  }
  return total;
}

function transliterateToHebrew(latinText) {
  if (!latinText || typeof latinText !== 'string') return '';

  // Clean & normalize string
  let cleaned = latinText.toLowerCase().trim()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-zñ\s]/g, '');

  if (!cleaned) return '';

  // 1. Direct Biblical / Torah Name Override Check
  if (BIBLICAL_NAME_OVERRIDES[cleaned]) {
    return BIBLICAL_NAME_OVERRIDES[cleaned];
  }

  // 2. Phonetic Digraph & Multi-character Replacements
  let text = cleaned;
  text = text.replace(/ch/g, 'צ');
  text = text.replace(/ll/g, 'י');
  text = text.replace(/ñ/g, 'ני');
  text = text.replace(/qu/g, 'ק');
  text = text.replace(/gu([ei])/g, 'ג$1');
  text = text.replace(/sh/g, 'ש');

  // Initial Vowels
  if (/^[aeiou]/.test(text)) {
    text = text.replace(/^[aeiou]/, 'א');
  }

  // Consonants and Vowels mapping
  let res = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const prev = i > 0 ? text[i - 1] : '';

    switch (char) {
      case 'א': res += 'א'; break;
      case 'ב': case 'b': case 'v': res += 'ב'; break;
      case 'c':
        const next = i + 1 < text.length ? text[i + 1] : '';
        res += (next === 'e' || next === 'i') ? 'ס' : 'ק';
        break;
      case 'ד': case 'd': res += 'ד'; break;
      case 'f': res += 'פ'; break;
      case 'g':
        const nextG = i + 1 < text.length ? text[i + 1] : '';
        res += (nextG === 'e' || nextG === 'i') ? 'ח' : 'ג';
        break;
      case 'h':
        // Map Spanish 'h' to 'ה' if between vowels or at start
        if (i === 0 || /[aeiou]/.test(prev)) res += 'ה';
        break;
      case 'j': res += 'ח'; break;
      case 'k': res += 'ק'; break;
      case 'l': res += 'ל'; break;
      case 'm': res += 'מ'; break;
      case 'n': res += 'נ'; break;
      case 'p': res += 'פ'; break;
      case 'r': res += 'ר'; break;
      case 's': case 'z': res += 'ס'; break;
      case 't': res += 'ת'; break;
      case 'w': res += 'ו'; break;
      case 'x': res += 'קס'; break;
      case 'y': res += 'י'; break;
      case 'i': res += 'י'; break;
      case 'o': case 'u': res += 'ו'; break;
      case 'a':
        if (i === text.length - 1) res += 'ה';
        break;
      case 'e':
        if (i === text.length - 1) res += 'ה';
        break;
      case 'ש': res += 'ש'; break;
      case 'צ': res += 'צ'; break;
      default:
        break;
    }
  }

  // 3. Convert final letters (Sofiyot)
  if (res.endsWith('מ')) res = res.slice(0, -1) + 'ם';
  if (res.endsWith('נ')) res = res.slice(0, -1) + 'ן';
  if (res.endsWith('פ')) res = res.slice(0, -1) + 'ף';
  if (res.endsWith('כ')) res = res.slice(0, -1) + 'ך';
  if (res.endsWith('צ')) res = res.slice(0, -1) + 'ץ';

  return res;
}

function calculateInputGematria(inputText) {
  if (!inputText || typeof inputText !== 'string') {
    return { hebrewStr: '', value: 0, isTransliterated: false };
  }

  const trimmed = inputText.trim();

  // Check if string contains Hebrew characters
  const containsHebrew = /[\u0590-\u05FF]/.test(trimmed);

  if (containsHebrew) {
    const value = calculateHebrewGematria(trimmed);
    return {
      hebrewStr: trimmed,
      value: value,
      isTransliterated: false
    };
  } else {
    const hebrewStr = transliterateToHebrew(trimmed);
    const value = calculateHebrewGematria(hebrewStr);
    return {
      hebrewStr: hebrewStr,
      value: value,
      isTransliterated: true
    };
  }
}

const TORAH_GEMATRIA_DB = [
  { id: "shabat", hebrew: "שבת", transliteration: "Shabat", spanish: "Sábado / Shabat", value: 702, category: "Festividad", meaning: "El día sagrado de descanso, alegría y unión familiar que celebramos cada semana." },
  { id: "torah", hebrew: "תורה", transliteration: "Torá", spanish: "La Torá", value: 611, category: "Concepto", meaning: "Nuestro libro sagrado con las enseñanzas, historias y leyes de vida del pueblo judío." },
  { id: "israel", hebrew: "ישראל", transliteration: "Israel", spanish: "Pueblo y Tierra de Israel", value: 541, category: "Lugar", meaning: "El hogar espiritual del pueblo judío y el nombre dado a nuestro patriarca Jacob." },
  { id: "shalom", hebrew: "שלום", transliteration: "Shalom", spanish: "Paz y Bienestar", value: 376, category: "Concepto", meaning: "La hermosa palabra en hebreo que significa paz, armonía, salud y plenitud." },
  { id: "emet", hebrew: "אמת", transliteration: "Emet", spanish: "Verdad", value: 441, category: "Valores", meaning: "La verdad y la honestidad, uno de los valores más elevados de la Torá." },
  { id: "or", hebrew: "אור", transliteration: "Or", spanish: "Luz", value: 207, category: "Concepto", meaning: "La luz espiritual creada el primer día que ilumina el mundo con bondad." },
  { id: "mitzvah", hebrew: "מצוה", transliteration: "Mitzvá", spanish: "Buena Acción / Mandamiento", value: 141, category: "Valores", meaning: "Una buena acción o mandamiento que acerca al ser humano a Dios y ayuda a los demás." },
  { id: "abraham", hebrew: "אברהם", transliteration: "Abraham", spanish: "Patriarca Abraham", value: 248, category: "Patriarca", meaning: "El primer patriarca del pueblo judío, famoso por su inmensa hospitalidad y fe." },
  { id: "yitzchak", hebrew: "יצחק", transliteration: "Isaac / Yitzchak", spanish: "Patriarca Isaac", value: 208, category: "Patriarca", meaning: "El segundo patriarca, hijo de Abraham y Sara, símbolo de alegría y devoción." },
  { id: "yaakov", hebrew: "יעקב", transliteration: "Jacob / Yaakov", spanish: "Patriarca Jacob", value: 182, category: "Patriarca", meaning: "El tercer patriarca, padre de las 12 tribus de Israel, también llamado Israel." },
  { id: "sarah", hebrew: "שרה", transliteration: "Sara / Sarah", spanish: "Matriarca Sara", value: 505, category: "Matriarca", meaning: "La primera matriarca, madre de Isaac, destacada por su bondad y fuerza espiritual." },
  { id: "rivkah", hebrew: "רבקה", transliteration: "Rebeca / Rivká", spanish: "Matriarca Rebeca", value: 307, category: "Matriarca", meaning: "La segunda matriarca, esposa de Isaac, admirada por su generosidad en el pozo de agua." },
  { id: "rachel", hebrew: "רחל", transliteration: "Raquel / Rachel", spanish: "Matriarca Raquel", value: 238, category: "Matriarca", meaning: "Matriarca amada, esposa de Jacob y madre de José y Benjamín, símbolo de empatía." },
  { id: "leah", hebrew: "לאה", transliteration: "Lea / Leah", spanish: "Matriarca Lea", value: 36, category: "Matriarca", meaning: "Matriarca madre de seis tribus de Israel, ejemplo de oración profunda y gratitud." },
  { id: "moshe", hebrew: "משה", transliteration: "Moisés / Moshé", spanish: "Líder Moisés", value: 345, category: "Líder", meaning: "El gran maestro y líder que guió al pueblo de Israel fuera de Egipto y recibió la Torá." },
  { id: "aharon", hebrew: "אהרן", transliteration: "Aarón / Aharón", spanish: "Gran Sacerdote Aarón", value: 256, category: "Líder", meaning: "Hermano mayor de Moisés y primer Sumo Sacerdote, amaba la paz y la promovía." },
  { id: "david", hebrew: "דוד", transliteration: "David", spanish: "Rey David", value: 14, category: "Líder", meaning: "El valiente rey de Israel, poeta y autor del Libro de los Salmos (Tehilim)." },
  { id: "chai", hebrew: "חי", transliteration: "Jai / Chai", spanish: "Vida", value: 18, category: "Concepto", meaning: "Significa 'vida' y es el número de la suerte y bendición en la tradición judía." },
  { id: "ahava", hebrew: "אהבה", transliteration: "Ahavá", spanish: "Amor", value: 13, category: "Valores", meaning: "El amor profundo y sincero hacia Dios, la familia, los amigos y toda la creación." },
  { id: "chesed", hebrew: "חסד", transliteration: "Jésed", spanish: "Bondad / Amor Incondicional", value: 72, category: "Valores", meaning: "Realizar actos de bondad amorosa sin esperar nada a cambio." },
  { id: "bereshit", hebrew: "בראשית", transliteration: "Bereshit", spanish: "En el Principio (Génesis)", value: 913, category: "Parashá", meaning: "La primera porción de la Torá que narra la Creación del mundo y del Shabat." },
  { id: "noach", hebrew: "נח", transliteration: "Noé / Noaj", spanish: "Noé", value: 58, category: "Parashá", meaning: "El hombre justo que construyó el Arca para salvar a los animales del Diluvio." },
  { id: "yerushalayim", hebrew: "ירושלים", transliteration: "Jerusalén / Yerushalayim", spanish: "Jerusalén", value: 596, category: "Lugar", meaning: "La capital eterna de Israel, ciudad de paz y templo de nuestra historia." },
  { id: "tzedakah", hebrew: "צדקה", transliteration: "Tzedaká", spanish: "Justicia y Solidaridad", value: 199, category: "Valores", meaning: "Dar a quienes lo necesitan con alegría para hacer justicia en el mundo." },
  { id: "simcha", hebrew: "שמחה", transliteration: "Simjá", spanish: "Alegría", value: 353, category: "Valores", meaning: "La alegría del corazón que compartimos con nuestra familia y comunidad en las fiestas." },
  { id: "kiddush", hebrew: "קידוש", transliteration: "Kidush", spanish: "Santificación del Shabat", value: 420, category: "Festividad", meaning: "La bendición sobre la copa de vino o jugo de uva para dar la bienvenida al Shabat." },
  { id: "challah", hebrew: "חלה", transliteration: "Jalá", spanish: "Pan de Shabat", value: 43, category: "Festividad", meaning: "El delicioso pan trenzado especial que comemos en las cenas y almuerzos de Shabat." },
  { id: "menorah", hebrew: "מנורה", transliteration: "Menorá", spanish: "Candelabro Sagrado", value: 301, category: "Concepto", meaning: "El candelabro de siete brazos símbolo de luz y sabiduría del pueblo judío." },
  { id: "neshama", hebrew: "נשמה", transliteration: "Neshamá", spanish: "Alma", value: 395, category: "Concepto", meaning: "La chispa divina y espiritual dentro de cada persona que nos da vida y bondad." },
  { id: "chanukah", hebrew: "חנוכה", transliteration: "Janucá", spanish: "Fiesta de las Luces", value: 89, category: "Festividad", meaning: "La fiesta de los milagros donde encendemos la Janukiá durante ocho noches." },
  { id: "pesach", hebrew: "פסח", transliteration: "Pésaj", spanish: "Pascua Judía", value: 148, category: "Festividad", meaning: "La festividad de la libertad donde compartimos la cena del Seder y comemos Matzá." },
  { id: "shavuot", hebrew: "שבועות", transliteration: "Shavuot", spanish: "Fiesta de las Semanas", value: 784, category: "Festividad", meaning: "La festividad en que celebramos la entrega de la Torá en el Monte Sinaí." }
];

function findMatchingTorahConcepts(targetValue) {
  if (typeof targetValue !== 'number' || isNaN(targetValue) || targetValue <= 0) {
    return [];
  }
  return TORAH_GEMATRIA_DB.filter(item => item.value === targetValue);
}

// Global Export Guard for Browser & Node environment
if (typeof window !== 'undefined') {
  window.HEBREW_GEMATRIA_MAP = HEBREW_GEMATRIA_MAP;
  window.calculateHebrewGematria = calculateHebrewGematria;
  window.transliterateToHebrew = transliterateToHebrew;
  window.calculateInputGematria = calculateInputGematria;
  window.TORAH_GEMATRIA_DB = TORAH_GEMATRIA_DB;
  window.findMatchingTorahConcepts = findMatchingTorahConcepts;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HEBREW_GEMATRIA_MAP,
    calculateHebrewGematria,
    transliterateToHebrew,
    calculateInputGematria,
    TORAH_GEMATRIA_DB,
    findMatchingTorahConcepts
  };
}
