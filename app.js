/**
 * Lógica de la aplicación Shabateinu NBI.
 * Controla la navegación, consulta a la API de Hebcal, generación de invitaciones
 * en Canvas y email copiable, y los motores de los minijuegos (Trivia, Sopa de Letras y Pizarra).
 * v2.0 - Mejoras de estabilidad, UX y motor gráfico
 */

// Exponer navigateTo globalmente para los onclick en HTML
let navigateTo;
let openShabateinuYoutube;
let openYogaShabatYoutube;
let openSongYoutube;


// Función para obtener una voz en español neutro (Latinoamericano) en lugar de España
function getNeutralSpanishVoice(voices) {
  if (!voices || voices.length === 0) return null;
  
  // 1. Buscar una voz de es-419 (Latinoamérica)
  let voice = voices.find(v => v.lang.toLowerCase() === 'es-419');
  if (voice) return voice;
  
  // 2. Buscar voces de países americanos: México, EE.UU., Colombia, Argentina, Chile, Perú, Venezuela, etc.
  const amCodes = ['es-mx', 'es-us', 'es-co', 'es-ar', 'es-cl', 'es-pe', 'es-ve', 'es-uy', 'es-ec'];
  for (const code of amCodes) {
    voice = voices.find(v => v.lang.toLowerCase().startsWith(code));
    if (voice) return voice;
  }
  
  // 3. Buscar voces por nombres/descripciones que apunten a español latino
  const neutralNames = ['sabina', 'paulina', 'soledad', 'francisca', 'diego', 'juan', 'mexico', 'mexican', 'latina', 'america'];
  voice = voices.find(v => {
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase();
    return lang.startsWith('es') && neutralNames.some(n => name.includes(n));
  });
  if (voice) return voice;
  
  // 4. Buscar cualquier voz en español que NO sea de España (es-es)
  voice = voices.find(v => v.lang.toLowerCase().startsWith('es') && !v.lang.toLowerCase().includes('es-es'));
  if (voice) return voice;
  
  // 5. Fallback a cualquier voz en español (incluyendo es-ES)
  return voices.find(v => v.lang.toLowerCase().startsWith('es'));
}

document.addEventListener('DOMContentLoaded', () => {
  // Pre-carga de imágenes e ilustraciones premium AI (Nano Banana Engine Assets)
  const imageCache = {
    nasso_color: new Image(),
    nasso_outline: new Image(),
    shabbat_outline: new Image(),
    challah_outline: new Image(),
    torah_outline: new Image(),
    bereshit_outline: new Image(),
    noaj_outline: new Image(),
    shemot_outline: new Image(),
    beshalaj_outline: new Image(),
    yitro_outline: new Image(),
    bereshit_color: new Image(),
    noaj_color: new Image(),
    shemot_color: new Image(),
    beshalaj_color: new Image(),
    yitro_color: new Image()
  };
  imageCache.nasso_color.src = 'assets/nasso_color.png';
  imageCache.nasso_outline.src = 'assets/nasso_outline.png';
  imageCache.shabbat_outline.src = 'assets/shabbat_outline.png';
  imageCache.challah_outline.src = 'assets/challah_outline.png';
  imageCache.torah_outline.src = 'assets/torah_outline.png';
  imageCache.bereshit_outline.src = 'assets/bereshit_outline.png';
  imageCache.noaj_outline.src = 'assets/noaj_outline.png';
  imageCache.shemot_outline.src = 'assets/shemot_outline.png';
  imageCache.beshalaj_outline.src = 'assets/beshalaj_outline.png';
  imageCache.yitro_outline.src = 'assets/yitro_outline.png';
  imageCache.bereshit_color.src = 'assets/bereshit_color.png';
  imageCache.noaj_color.src = 'assets/noaj_color.png';
  imageCache.shemot_color.src = 'assets/shemot_color.png';
  imageCache.beshalaj_color.src = 'assets/beshalaj_color.png';
  imageCache.yitro_color.src = 'assets/yitro_color.png';

  // Asignar IDs y onload para redibujar cuando terminen de cargar
  Object.keys(imageCache).forEach(key => {
    imageCache[key].id = key;
    if (key.endsWith('_color')) {
      imageCache[key].onload = () => {
        // Redibujar la invitación y las actividades
        updateInvitationPreview();
        drawActivitiesIllustration();
      };
    }
  });

  // ==========================================================================
  // 1. ESTADO GLOBAL DE LA APLICACIÓN
  // ==========================================================================
  const state = {
    activeTab: 'inicio',
    currentDate: new Date(),
    selectedParasha: 'Bereshit',
    shabbatData: {
      dateStr: '',
      parasha: 'Bereshit',
      candles: '--:--',
      havdalah: '--:--',
      loading: false
    },
    // Estado del juego Sopa de Letras
    wordsearch: {
      grid: [],
      words: [],
      foundWords: [],
      selectedCells: [],
      isSelecting: false
    },
    // Estado del juego Trivia
    trivia: {
      questions: [],
      currentQuestionIdx: 0,
      score: 0,
      answersHistory: []
    },
    // Estado del Lienzo
    paint: {
      isDrawing: false,
      color: '#0b1a30', // Azul NBI por defecto
      size: 6,
      mode: 'draw', // 'draw' o 'erase'
      currentTemplate: 'parasha' // 'parasha', 'velas', 'challa', 'torah', 'blank'
    }
  };

  // --- MÚSICA K-POP: CANCIONES EXCLUSIVAS DE CADA PARASHÁ (LETRAS Y COROS PEGADIZOS) ---
  const KPOP_TRACKS = [
    {
      id: "bereshit",
      title: "¡Bara, Bara! (Creación K-POP)",
      parasha: "Bereshit",
      phonetics: "¡Bereshit bará, bará, bará! / Vayeji or, vayeji or!",
      translation: "\"En el comienzo creó... / ¡Que se haga la luz!\" Agradecemos la creación y el regalo del Shabat.",
      lyrics: [
        { type: "intro", text: "⭐ [INTRO] (Upbeat Synth Chords) ¡1, 2, 3, Let's go! ¡Shabateinu K-POP style! ⭐" },
        { type: "verse", text: "La luz brilló, el cielo se vistió, 🌟\ny en seis días todo Dios creó." },
        { type: "verse", text: "Los mares cantan, el sol sonrió, ☀️\n¡y el Shabat en familia nos regaló!" },
        { type: "chorus", text: "✨ [CORO EN HEBREO] ✨\n¡Bereshit bará, bará, bará! (Hey!)\n¡El mundo hermoso Dios nos dará! (Ho!)" },
        { type: "chorus", text: "¡Vayeji or, vayeji or! (Light!)\n¡Shabat Shalom con todo el amor! 🕯️" },
        { type: "outro", text: "💖 [OUTRO] ¡Bara, Bara! ¡Shabat Shalom! 💖" }
      ]
    },
    {
      id: "noaj",
      title: "¡Tzadik en el Arca! (Noaj Pop)",
      parasha: "Noaj",
      phonetics: "¡Noaj Tzadik, Tzadik, Tzadik! / Covenant, ot habrit!",
      translation: "\"Noaj el justo... / ¡La señal del pacto!\" La promesa del arcoíris y el cuidado del planeta.",
      lyrics: [
        { type: "intro", text: "☔ [INTRO] (Raining Synth Drops) ¡Raining, raining! ¡Pero dentro hay paz! Let's dance! ☔" },
        { type: "verse", text: "Llueve, llueve sin parar, 🌧️\nen el gran barco vamos a viajar." },
        { type: "verse", text: "Dos a dos los animales van, 🦁🦒\n¡y en el arcoíris la promesa verán!" },
        { type: "chorus", text: "🌈 [CORO EN HEBREO] 🌈\n¡Noaj Tzadik, Tzadik, Tzadik! (Yeah!)\n¡En la tevá vamos a vivir! (Fly!)" },
        { type: "chorus", text: "¡Covenant, ot habrit! (Rainbow!)\n¡Shabat Shalom, let's keep it sweet! 🕯️" },
        { type: "outro", text: "🕊️ [OUTRO] ¡Ot Habrit! ¡Arcoíris del amor! 🕊️" }
      ]
    },
    {
      id: "shemot",
      title: "¡Salvado de las Aguas! (Shemot K-Dance)",
      parasha: "Shemot",
      phonetics: "¡Moshé Rabbenu! / ¡Shalaj et amí, shalaj et amí!",
      translation: "\"Moisés nuestro maestro... / ¡Deja ir a mi pueblo!\" La llamada de libertad de la Zarza Ardiente.",
      lyrics: [
        { type: "intro", text: "⚡ [INTRO] (Electric Bass Pulse) ¡Shalaj et amí! Let my people go! K-POP drop! ⚡" },
        { type: "verse", text: "En el río Nilo flotando va, 🌊\nun pequeño cesto que flotando está." },
        { type: "verse", text: "Moisés creció, la zarza vio brillar, 🔥\n¡y la libertad vamos a cantar!" },
        { type: "chorus", text: "✊ [CORO EN HEBREO] ✊\n¡Shemot, Shemot, Shemot! (Go!)\n¡Moshé Rabbenu nos lideró! (Brave!)" },
        { type: "chorus", text: "¡Shalaj et amí, shalaj et amí! (Now!)\n¡Libres cantamos en Shabat aquí! 🕯️" },
        { type: "outro", text: "✨ [OUTRO] ¡Libertad con la fuerza de Dios! ✨" }
      ]
    },
    {
      id: "beshalaj",
      title: "¡Shirat Hayam! (El Gran Cruce)",
      parasha: "Beshalaj",
      phonetics: "¡Shirat Hayam, shir, shir, shir! / ¡Mi jamoja ba'elim, Adonai!",
      translation: "\"El Canto del Mar... / ¿Quién es como tú, Señor?\" La hermosa danza de alegría liderada por Miriam.",
      lyrics: [
        { type: "intro", text: "🥁 [INTRO] (Synth Claps & Beats) ¡Miriam con la pandereta! Dance, dance, dance! 🥁" },
        { type: "verse", text: "El mar se abre, murallas de agua, 🌊\ncaminamos secos, ¡milagro del alma!" },
        { type: "verse", text: "Miriam toca su pandereta, 🪘\n¡la danza de alegría ya está completa!" },
        { type: "chorus", text: "💃 [CORO EN HEBREO] 💃\n¡Shirat Hayam, shir, shir, shir! (Sing!)\n¡Az yashir Moshé para ti! (Joy!)" },
        { type: "chorus", text: "¡Mi jamoja ba'elim, Adonai!\n¡Bailamos libres, Shabat shanei! 🕯️" },
        { type: "outro", text: "🌊 [OUTRO] ¡El Canto del Mar y de la Libertad! 🌊" }
      ]
    },
    {
      id: "yitro",
      title: "¡Aseret Hadibrot! (Sinaí Beat)",
      parasha: "Yitro",
      phonetics: "¡Aseret Hadibrot! / ¡Na'asé venishmá, na'asé venishmá!",
      translation: "\"Los Diez Mandamientos... / ¡Haremos y escucharemos!\" Recibiendo la Torá con amor y compromiso.",
      lyrics: [
        { type: "intro", text: "⚡ [INTRO] (Heavy Synth Bass) ¡Thunders and lightning! ¡Diez mandamientos! Let's go! ⚡" },
        { type: "verse", text: "En el Sinaí la tierra tembló, 🏔️\ny en las dos tablas Dios nos entregó:" },
        { type: "verse", text: "Diez sabias reglas llenas de luz, 📜\n¡para guiar a toda nuestra juventud!" },
        { type: "chorus", text: "👑 [CORO EN HEBREO] 👑\n¡Aseret Hadibrot, rot, rot! (Ten!)\n¡Torá sagrada en el corazón! (Forever!)" },
        { type: "chorus", text: "¡Na'asé venishmá, na'asé venishmá! (We do!)\n¡Shabat bendito, paz y bondad! 🕯️" },
        { type: "outro", text: "🌟 [OUTRO] ¡Torá de luz para todo el mundo! 🌟" }
      ]
    },
    {
      id: "nasso",
      title: "¡Yevarejejá! (Bendición Sacerdotal)",
      parasha: "Nasso",
      phonetics: "¡Yevarejejá Adonai veyishmereja! / ¡Shalom, Shabat Shalom!",
      translation: "\"Que el Señor te bendiga y te guarde... / ¡Paz, Shabat de Paz!\" La bendición de amor de los sacerdotes.",
      lyrics: [
        { type: "intro", text: "🔔 [INTRO] (Bell Chimes Pop) ¡Sacerdotes del amor! ¡Birkat Kohanim! Let's shine! 🔔" },
        { type: "verse", text: "Levanta tus manos, haz la bendición, 🖖\ncon amor y paz en el corazón." },
        { type: "verse", text: "Que Dios te cuide, te dé su favor, 💖\n¡y llene tu vida de luz y esplendor!" },
        { type: "chorus", text: "✨ [CORO EN HEBREO] ✨\n¡Yevarejejá Adonai veyishmereja! (Hey!)\n¡Ya'er panav eleja vijuneka! (Shine!)" },
        { type: "chorus", text: "¡Yisá panav eleja veyasem lejá... (Peace!)\n¡Shalom, shalom, Shabat Shalom! 🕯️" },
        { type: "outro", text: "🕊️ [OUTRO] ¡Paz y amor en Shabat en la comunidad! 🕊️" }
      ]
    }
  ];

  const DEFAULT_TRACK = {
    id: "shabbat",
    title: "¡Shabateinu Dance! (K-POP Mix)",
    parasha: "Shabateinu",
    phonetics: "¡Shabbat Shalom, Shabat Shalom! / ¡Velas, jalá y kidush de amor!",
    translation: "\"Sábado de Paz...\" La canción oficial de Shabateinu para bailar y cantar todos los viernes.",
    lyrics: [
      { type: "intro", text: "✨ [INTRO] ¡Bienvenidos a la Estación K-POP de Shabateinu NBI! ¡Sube el volumen! ✨" },
      { type: "verse", text: "Las velas brillan con suave fulgor, 🕯️\nllenando la casa de paz y de amor." },
      { type: "verse", text: "La copa vertemos del dulce Kidush, 🍷\ny la Jalá comemos con gratitud." },
      { type: "chorus", text: "🕺 [CORO DE SHABAT] 🕺\n¡Shabbat Shalom, Shabat Shalom! (Hey!)\n¡Baila en familia con el corazón! (Yeah!)" },
      { type: "chorus", text: "¡Shabbat Shalom, Shabat Shalom! (Sing!)\n¡Un hermoso regalo de bendición! 💖" },
      { type: "outro", text: "✨ [OUTRO] ¡Shabat Shalom, Shabateinu NBI! ¡Nos vemos el próximo viernes! ✨" }
    ]
  };

  const musicState = {
    isPlaying: false,
    currentTrackIdx: 0,
    bpm: 125,
    activeLineIdx: 0,
    audioCtx: null,
    sequencerTimer: null,
    step: 0,
    tracks: [...KPOP_TRACKS, DEFAULT_TRACK],
    vocalGuide: true
  };

  // ==========================================================================
  // 2. ENRUTADOR DE NAVEGACIÓN (SPA)
  // ==========================================================================
  const navButtons = document.querySelectorAll('.nav-item button');
  const sections = document.querySelectorAll('.app-section');

  openShabateinuYoutube = function() {
    const pName = state.selectedParasha || "Bereshit";
    const query = encodeURIComponent(`Comunidad NBI Shabateinu ${pName}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  openYogaShabatYoutube = function() {
    window.open('https://www.youtube.com/results?search_query=Comunidad+NBI+Shabateinu+Yoga+Shabat', '_blank');
  };

  openSongYoutube = function(type) {
    let query = 'Comunidad NBI Shabateinu';
    if (type === 'israel') {
      query += ' Le cantamos a Israel';
    } else if (type === 'yoga') {
      query += ' Yoga Shabat';
    }
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
  };

  navigateTo = function(tabId) {
    state.activeTab = tabId;
    
    // Actualizar botones de navegación
    navButtons.forEach(btn => {
      const parent = btn.parentElement;
      if (parent.dataset.tab === tabId) {
        parent.classList.add('active');
      } else {
        parent.classList.remove('active');
      }
    });

    // Actualizar secciones visibles
    sections.forEach(sec => {
      if (sec.id === `section-${tabId}`) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Scroll al inicio de la sección
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Lógicas específicas de reinicio al entrar a una sección
    if (tabId === 'juegos') {
      initializeGamesTab();
    } else if (tabId === 'brajot') {
      loadBrajotProgress();
    } else if (tabId === 'musica') {
      initializeMusicTab();
    } else if (tabId === 'cuento') {
      initStorybook();
    } else if (tabId === 'alefbet') {
      initFlashcards();
    } else if (tabId === 'colorear') {
      initColoringBook();
    } else if (tabId === 'mitzvot') {
      initMitzvot();
    } else if (tabId === 'cofre') {
      initCofre();
    } else if (tabId === 'tzedaka') {
      initTzedaka();
    } else if (tabId === 'memoria') {
      initMemory();
    } else if (tabId === 'cocina') {
      initCocina();
    } else if (tabId === 'festividades') {
      initFestividades();
    } else if (tabId === 'sionista') {
      initSionista();
    } else if (tabId === 'havdala') {
      initHavdala();
    } else if (tabId === 'pasaporte') {
      initPasaporte();
    } else if (tabId === 'manualidades') {
      initManualidades();
    } else if (tabId === 'jardin') {
      initJardin();
    }

    // Detener el secuenciador de música si salimos de la pestaña de música
    if (tabId !== 'musica') {
      stopMusicSequencer();
    }
    // Detener la animación del Tzedakómetro si salimos
    if (tabId !== 'tzedaka' && tzedakaAnimationId) {
      cancelAnimationFrame(tzedakaAnimationId);
      tzedakaAnimationId = null;
    }
    // Detener la animación del Jardín de Paz si salimos
    if (tabId !== 'jardin') {
      stopJardin();
    }
    // Detener animación de Havdalá si salimos
    if (tabId !== 'havdala') {
      stopHavdala();
    }
    // Detener voz de SpeechSynthesis si cambiamos de sección
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      navigateTo(btn.parentElement.dataset.tab);
    });
  });

  // ==========================================================================
  // 3. CONSULTA A LA API DE HEBCAL (CALENDARIO Y HORARIOS)
  // ==========================================================================
  const dateInput = document.getElementById('search-date');
  const btnSearchDate = document.getElementById('btn-search-date');
  const parashaSelector = document.getElementById('parasha-manual-select');

  // Rellenar selector de Parashá manual
  function populateParashaSelector() {
    if (!parashaSelector) return;
    parashaSelector.innerHTML = '';
    
    // Agrupar por libro para ordenar
    const books = {
      "Bereshit (Génesis)": [],
      "Shemot (Éxodo)": [],
      "Vayikra (Levítico)": [],
      "Bamidbar (Números)": [],
      "Devarim (Deuteronomio)": []
    };

    // Llenar agrupaciones con la clave original del DB como valor
    const keysByBook = {};
    Object.keys(PARASHOT_DB).forEach(key => {
      const p = PARASHOT_DB[key];
      const bookName = p.book || "Bereshit (Génesis)";
      if (!keysByBook[bookName]) keysByBook[bookName] = [];
      keysByBook[bookName].push({ key, name: p.name, hebrew: p.hebrew });
    });

    // Agregar opciones al select agrupadas por libro
    Object.keys(books).forEach(bookName => {
      const optGroup = document.createElement('optgroup');
      optGroup.label = bookName;
      const entries = keysByBook[bookName] || [];
      entries.forEach(entry => {
        const opt = document.createElement('option');
        opt.value = entry.name;
        opt.textContent = `${entry.name} (${entry.hebrew})`;
        optGroup.appendChild(opt);
      });
      parashaSelector.appendChild(optGroup);
    });

    // Añadir manejador de cambio manual
    parashaSelector.addEventListener('change', (e) => {
      state.selectedParasha = e.target.value;
      updateParashaUI();
    });
  }

  // Obtener el próximo viernes a partir de una fecha dada (sin mutar la fecha original)
  function getFridayOfDate(d) {
    const result = new Date(d.getTime()); // Clonar para no mutar
    const day = result.getDay();
    // Si hoy es sábado (6), avanzar 6 días al próximo viernes
    // Si hoy es viernes (5), mantener
    // Cualquier otro día, avanzar al viernes de esta semana
    let daysToFriday;
    if (day <= 5) {
      daysToFriday = 5 - day;
    } else {
      daysToFriday = 6; // Sábado -> próximo viernes
    }
    result.setDate(result.getDate() + daysToFriday);
    return result;
  }

  // Formatear fecha bonita en español chileno
  function formatDateSpanish(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-CL', options);
  }

  async function fetchShabbatData(date) {
    const friday = getFridayOfDate(new Date(date));
    const year = friday.getFullYear();
    const month = friday.getMonth() + 1;
    const day = friday.getDate();
    
    state.shabbatData.loading = true;
    updateShabbatTimesUI(true);

    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    state.shabbatData.dateStr = dateStr;

    // URL Hebcal API para Santiago de Chile
    const url = `https://www.hebcal.com/shabbat?cfg=json&geonameid=3871336&M=on&gy=${year}&gm=${month}&gd=${day}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('API Hebcal falló');
      
      const data = await response.json();
      
      // Procesar items devueltos
      let parashaName = '';
      let candlesTime = '--:--';
      let havdalahTime = '--:--';

      data.items.forEach(item => {
        if (item.category === 'parashat') {
          // Extraer nombre limpio quitando "Parashat "
          parashaName = item.title.replace('Parashat ', '');
        } else if (item.category === 'candles') {
          // Formatear hora de encendido (ej: 2026-05-29T17:42:00 -> 17:42)
          const t = new Date(item.date);
          candlesTime = t.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
        } else if (item.category === 'havdalah') {
          const t = new Date(item.date);
          havdalahTime = t.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
        }
      });

      state.shabbatData.parasha = parashaName || 'Bereshit';
      state.shabbatData.candles = candlesTime;
      state.shabbatData.havdalah = havdalahTime;
      state.selectedParasha = state.shabbatData.parasha;

      if (parashaSelector) {
        // Verificar si la Parashá ya existe en las opciones
        let optionExists = false;
        for (let i = 0; i < parashaSelector.options.length; i++) {
          if (parashaSelector.options[i].value === state.selectedParasha) {
            optionExists = true;
            break;
          }
        }
        
        // Si es una Parashá externa no listada, la agregamos dinámicamente al final
        if (!optionExists) {
          const opt = document.createElement('option');
          opt.value = state.selectedParasha;
          const pData = getParashaData(state.selectedParasha);
          opt.textContent = `⭐ ${state.selectedParasha} (${pData.hebrew})`;
          parashaSelector.appendChild(opt);
        }
        
        parashaSelector.value = state.selectedParasha;
      }

    } catch (error) {
      console.warn("Error cargando Hebcal API. Usando estimación offline.", error);
      // Fallback offline: calcular Parashá estimada o mantener la última seleccionada
      state.shabbatData.candles = '17:40'; // Horario promedio
      state.shabbatData.havdalah = '18:45';
      // Mantenemos la parashá seleccionada en el dropdown
      state.shabbatData.parasha = state.selectedParasha;
    } finally {
      state.shabbatData.loading = false;
      updateShabbatTimesUI(false);
      updateParashaUI();
    }
  }

  function updateShabbatTimesUI(isLoading) {
    const parashaEl = document.getElementById('active-parasha-title');
    const candlesEl = document.getElementById('candles-time-val');
    const havdalahEl = document.getElementById('havdalah-time-val');
    const displayDateEl = document.getElementById('shabbat-display-date');

    if (isLoading) {
      if (parashaEl) parashaEl.textContent = 'Cargando...';
      if (candlesEl) candlesEl.textContent = 'Cargando...';
      if (havdalahEl) havdalahEl.textContent = 'Cargando...';
    } else {
      const friday = getFridayOfDate(new Date(state.currentDate));
      if (displayDateEl) displayDateEl.textContent = formatDateSpanish(friday);
      
      const pData = getParashaData(state.shabbatData.parasha);
      if (parashaEl) parashaEl.textContent = `${pData.name} (${pData.hebrew})`;
      if (candlesEl) candlesEl.textContent = `${state.shabbatData.candles} hrs`;
      if (havdalahEl) havdalahEl.textContent = `${state.shabbatData.havdalah} hrs`;
    }
  }

  function updateParashaUI() {
    const pData = getParashaData(state.selectedParasha);
    
    // Actualizar paneles informativos de la Parashá
    document.querySelectorAll('.parasha-title-dyn').forEach(el => el.textContent = pData.name);
    document.querySelectorAll('.parasha-hebrew-dyn').forEach(el => el.textContent = pData.hebrew);
    document.querySelectorAll('.parasha-book-dyn').forEach(el => el.textContent = pData.book);
    document.querySelectorAll('.parasha-summary-dyn').forEach(el => el.textContent = pData.summary);

    // Actualizar Guía de Actividades en Vivo
    const titeresEl = document.getElementById('act-titeres-content');
    const disfracesEl = document.getElementById('act-disfraces-content');
    const cancionesEl = document.getElementById('act-canciones-content');

    if (titeresEl) titeresEl.innerHTML = pData.activities.puppets.replace(/\n/g, '<br>');
    if (disfracesEl) disfracesEl.innerHTML = pData.activities.costumes.replace(/\n/g, '<br>');
    if (cancionesEl) cancionesEl.innerHTML = pData.activities.song.replace(/\n/g, '<br>');

    // Actualizar formulario de invitación
    const invTitleInput = document.getElementById('inv-parasha');
    if (invTitleInput) invTitleInput.value = pData.name;
    updateInvitationPreview();
    drawActivitiesIllustration();

    // Actualizar storybook, flashcards, colorear y cofre si los elementos existen
    if (document.getElementById('story-page-content')) initStorybook();
    if (document.getElementById('flashcard-main')) initFlashcards();
    if (document.getElementById('coloring-canvas')) initColoringBook();
    if (document.getElementById('cofre-card')) initCofre();

    // Reiniciar juegos para la nueva Parashá si estamos en la pestaña
    if (state.activeTab === 'juegos') {
      initializeGamesTab();
    }
  }

  // Eventos de búsqueda (Forzar zona horaria local al crear el objeto Date)
  if (btnSearchDate && dateInput) {
    btnSearchDate.addEventListener('click', () => {
      if (dateInput.value) {
        // Añadir 'T00:00:00' para evitar desfase de huso horario UTC al parsear
        state.currentDate = new Date(dateInput.value + 'T00:00:00');
        fetchShabbatData(state.currentDate);
      }
    });
  }

  // ==========================================================================
  // 4. GENERADOR DE INVITACIONES (IMAGEN PNG Y EMAIL COPIABLE)
  // ==========================================================================
  const invForm = document.getElementById('invitation-form');
  const themeOptions = document.querySelectorAll('.theme-option');
  const btnDownloadInv = document.getElementById('btn-download-invitation');
  const btnCopyEmail = document.getElementById('btn-copy-email');

  // Inicializar Preview de invitación
  function initInvitationEngine() {
    if (!invForm) return;

    // Escuchar cambios en campos del formulario
    const inputs = invForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('input', updateInvitationPreview);
    });

    // Selector de Temas
    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        themeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        
        const preview = document.getElementById('invitation-preview-card');
        if (preview) {
          preview.className = 'invitation-card-preview';
          preview.classList.add(`theme-${opt.dataset.theme}`);
        }
        updateInvitationPreview();
      });
    });

    // Botón descargar PNG
    if (btnDownloadInv) {
      btnDownloadInv.addEventListener('click', generateInvitationPNG);
    }

    // Botón copiar Email
    if (btnCopyEmail) {
      btnCopyEmail.addEventListener('click', copyEmailToClipboard);
    }
  }

  function getActiveTheme() {
    const activeOpt = document.querySelector('.theme-option.active');
    return activeOpt ? activeOpt.dataset.theme : 'stars';
  }

  function updateInvitationPreview() {
    const titleVal = document.getElementById('inv-title').value;
    const parashaVal = document.getElementById('inv-parasha').value;
    const dateVal = document.getElementById('inv-date').value;
    const timeVal = document.getElementById('inv-time').value;
    const activitiesVal = document.getElementById('inv-activities').value;
    
    // Tiempos velas
    const candlesTime = state.shabbatData.candles;

    // Actualizar elementos visuales en pantalla
    const cardTitle = document.getElementById('card-title-val');
    const cardParasha = document.getElementById('card-parasha-val');
    const cardDescription = document.getElementById('card-description-val');
    const cardDate = document.getElementById('card-date-val');
    const cardTime = document.getElementById('card-time-val');
    const cardCandles = document.getElementById('card-candles-val');

    const formattedDate = dateVal ? formatDateSpanish(new Date(dateVal + 'T00:00:00')) : '--';

    if (cardTitle) cardTitle.textContent = titleVal;
    if (cardParasha) {
      const pData = getParashaData(parashaVal);
      cardParasha.textContent = `Parashá ${parashaVal} (${pData.hebrew})`;
    }
    if (cardDescription) cardDescription.textContent = activitiesVal;
    if (cardDate) cardDate.textContent = formattedDate;
    if (cardTime) cardTime.textContent = `${timeVal} hrs`;
    if (cardCandles) cardCandles.textContent = `${candlesTime} hrs`;

    // Actualizar el Canvas de Previsualización en Tiempo Real (Nano Banana Engine)
    const previewCanvas = document.getElementById('invitation-preview-canvas');
    if (previewCanvas) {
      const pCtx = previewCanvas.getContext('2d');
      // Limpiar canvas
      pCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      
      // Dibujar la ilustración del tema activo de la parashá
      pCtx.save();
      pCtx.translate(150, 100);
      pCtx.scale(1.2, 1.2);
      drawParashaIllustration(pCtx, parashaVal, 0, 0, false);
      pCtx.restore();
    }

    // Generar Plantilla de Email
    generateEmailTemplate(titleVal, parashaVal, formattedDate, timeVal, candlesTime, activitiesVal);
  }

  function drawActivitiesIllustration() {
    const actCanvas = document.getElementById('activities-illustration-canvas');
    if (!actCanvas) return;
    const actCtx = actCanvas.getContext('2d');
    
    // Limpiar canvas con el fondo oscuro del contenedor
    actCtx.fillStyle = '#050b14';
    actCtx.fillRect(0, 0, actCanvas.width, actCanvas.height);
    
    // Dibujar la ilustración en modo color
    actCtx.save();
    actCtx.translate(110, 110);
    actCtx.scale(1.5, 1.5);
    drawParashaIllustration(actCtx, state.selectedParasha, 0, 0, false);
    actCtx.restore();
  }

  function generateEmailTemplate(title, parasha, dateStr, time, candles, activities) {
    const emailBox = document.getElementById('email-template-text');
    if (!emailBox) return;

    const pData = getParashaData(parasha);

    const template = `Asunto: 🕯️ ¡Te invitamos a una nueva edición de Shabateinu NBI! - ${dateStr}

Estimada Comunidad NBI,

Este viernes nos volvemos a reunir con inmensa alegría en nuestro querido espacio infantil: ¡Shabateinu! ✨

Nos encontraremos para compartir, jugar, cantar y aprender sobre la maravillosa porción de la Torá de esta semana: la Parashá ${parasha} (${pData.hebrew}).

📅 Fecha: Este viernes, ${dateStr}
⏰ Hora de Shabateinu: ${time} hrs
🕯️ Encendido de velas de Shabat: ${candles} hrs
📍 Lugar: Comunidad NBI (Mar Jónico 8880, Vitacura)

Nuestras actividades incluirán:
🎈 ${activities}
🧸 Guiones de títeres, canciones de bendiciones y talleres creativos de disfraces en vivo.
🎨 Kit de juegos imprimibles y pizarra digital para pintar la Parashá.

¡Los esperamos a todos con los brazos abiertos para llenar la sinagoga de risas y hermosos momentos de comunidad!

¡Shabat Shalom! 🕯️🍷🍞
Equipo Shabateinu - Comunidad Israelita Nueva Bnei Israel (NBI)`;

    emailBox.textContent = template;
  }

  function copyEmailToClipboard() {
    const emailText = document.getElementById('email-template-text').textContent;
    navigator.clipboard.writeText(emailText).then(() => {
      const originalText = btnCopyEmail.innerHTML;
      btnCopyEmail.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
      btnCopyEmail.style.background = '#10b981';
      showToast('✅ Texto del email copiado al portapapeles');
      
      setTimeout(() => {
        btnCopyEmail.innerHTML = originalText;
        btnCopyEmail.style.background = '';
      }, 2000);
    });
  }

  // Sistema de notificaciones Toast
  function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
  }

  // Dibujante de ilustraciones temáticas para cada Parashá (Estilo Nano Banana / Vector premium)
  function drawParashaIllustration(ctx, parashaName, cx, cy, isOutline = false) {
    ctx.save();
    ctx.translate(cx, cy);
    
    // Si es modo COLOR (para invitaciones y actividades), intentamos cargar la ilustración fotorrealista de la IA
    if (!isOutline) {
      const norm = parashaName.toLowerCase();
      let colorImg = null;
      
      if (norm.includes('nasso')) {
        colorImg = imageCache.nasso_color;
      } else if (norm.includes('bereshit')) {
        colorImg = imageCache.bereshit_color;
      } else if (norm.includes('noach') || norm.includes('noaj')) {
        colorImg = imageCache.noaj_color;
      } else if (norm.includes('shemot') || norm.includes('exodo')) {
        colorImg = imageCache.shemot_color;
      } else if (norm.includes('beshalach') || norm.includes('beshalaj')) {
        colorImg = imageCache.beshalaj_color;
      } else if (norm.includes('yitro')) {
        colorImg = imageCache.yitro_color;
      }
      
      if (colorImg && colorImg.complete && colorImg.naturalWidth !== 0) {
        ctx.save();
        // Dibujarla centrada en el cuadro
        ctx.drawImage(colorImg, -70, -70, 140, 140);
        ctx.restore();
        ctx.restore(); // restaurar translate
        return; // Salir de la función
      }
    }
    
    // Configuración base de dibujo infantil premium
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = isOutline ? 0 : 20;
    ctx.shadowColor = isOutline ? 'transparent' : 'rgba(255, 255, 255, 0.15)';

    const normalized = parashaName.toLowerCase();
    
    // Helper local para aplicar color de forma adaptable
    const setColors = (fillColor, strokeColor = '#000000', strokeWidth = 3) => {
      ctx.fillStyle = isOutline ? '#ffffff' : fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
    };
    
    if (normalized.includes('bereshit')) {
      // TEMA: Creación (Tierra, hojas y estrellas) - Diseño Premium Sofisticado
      ctx.shadowColor = isOutline ? 'transparent' : 'rgba(56, 189, 248, 0.35)';
      
      // 1. Resplandor atmosférico de fondo (Aura)
      if (!isOutline) {
        let earthAura = ctx.createRadialGradient(0, 0, 30, 0, 0, 75);
        earthAura.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
        earthAura.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = earthAura;
        ctx.beginPath();
        ctx.arc(0, 0, 75, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // 2. Océanos de la Tierra (Gradiente radial)
      let seaGrad = ctx.createRadialGradient(-15, -15, 10, 0, 0, 50);
      seaGrad.addColorStop(0, '#38bdf8'); // Celeste brillante
      seaGrad.addColorStop(0.6, '#0284c7'); // Azul medio
      seaGrad.addColorStop(1, '#0f172a'); // Azul oscuro NBI profundo
      setColors(isOutline ? '#ffffff' : seaGrad, '#000000', 3);
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      // 3. Continentes con gradiente de vegetación
      let landGrad = ctx.createLinearGradient(-30, -30, 30, 30);
      landGrad.addColorStop(0, '#4ade80'); // Verde claro brillante
      landGrad.addColorStop(0.5, '#10b981'); // Esmeralda
      landGrad.addColorStop(1, '#065f46'); // Bosque profundo
      setColors(isOutline ? '#ffffff' : landGrad, '#000000', 2.5);
      
      ctx.beginPath();
      ctx.arc(-15, -15, 20, 0, Math.PI * 2);
      ctx.arc(15, 10, 22, 0, Math.PI * 2);
      ctx.arc(-10, 20, 15, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      // 4. Anillo de la atmósfera (Brillo exterior)
      ctx.strokeStyle = isOutline ? '#000000' : 'rgba(56, 189, 248, 0.75)';
      ctx.lineWidth = isOutline ? 3 : 4;
      ctx.beginPath();
      ctx.arc(0, 0, 53, 0, Math.PI * 2);
      ctx.stroke();
      
      // 5. Estrellitas de la creación (Con aura mágica)
      if (!isOutline) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.beginPath();
        ctx.arc(-70, -40, 15, 0, Math.PI * 2);
        ctx.arc(70, 30, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      setColors('#f59e0b', '#000000', 2);
      drawStar(ctx, -70, -40, 5, 10, 5);
      if (isOutline) ctx.stroke();
      drawStar(ctx, 70, 30, 4, 8, 4);
      if (isOutline) ctx.stroke();
      
      // 6. Hojas verdes (Símbolo de la naturaleza) con gradientes
      let leafGrad = ctx.createLinearGradient(-75, 30, -45, 50);
      leafGrad.addColorStop(0, '#86efac');
      leafGrad.addColorStop(1, '#15803d');
      setColors(isOutline ? '#ffffff' : leafGrad, '#000000', 2);
      ctx.beginPath();
      ctx.ellipse(-60, 40, 16, 9, 0.5, 0, Math.PI * 2);
      ctx.ellipse(60, -40, 16, 9, -0.5, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
    } else if (normalized.includes('noach') || normalized.includes('noaj')) {
      // TEMA: Arca de Noaj y Arcoíris - Premium Sofisticado
      ctx.shadowBlur = 0;
      
      // 1. Arcoíris con colores suaves y mezclados
      const rainbowColors = [
        'rgba(239, 68, 68, 0.85)',   // Rojo
        'rgba(249, 115, 22, 0.85)',  // Naranja
        'rgba(234, 179, 8, 0.85)',   // Amarillo
        'rgba(16, 185, 129, 0.85)',  // Verde
        'rgba(56, 189, 248, 0.85)'   // Celeste
      ];
      rainbowColors.forEach((c, idx) => {
        ctx.strokeStyle = isOutline ? '#000000' : c;
        ctx.lineWidth = isOutline ? 3 : 6;
        ctx.beginPath();
        ctx.arc(0, 30, 82 - (idx * 6), Math.PI, 0);
        ctx.stroke();
      });

      // Sombra del Arca
      if (!isOutline) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
        ctx.beginPath();
        ctx.moveTo(-64, 34);
        ctx.lineTo(64, 34);
        ctx.lineTo(48, 68);
        ctx.lineTo(-48, 68);
        ctx.closePath();
        ctx.fill();
      }

      // 2. El Arca de madera (Gradiente tridimensional)
      let woodGrad = ctx.createLinearGradient(0, 30, 0, 65);
      woodGrad.addColorStop(0, '#a16207'); // Madera clara
      woodGrad.addColorStop(1, '#451a03'); // Madera muy oscura
      setColors(isOutline ? '#ffffff' : woodGrad, '#000000', 3);
      ctx.beginPath();
      ctx.moveTo(-60, 30);
      ctx.lineTo(60, 30);
      ctx.lineTo(45, 65);
      ctx.lineTo(-45, 65);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Líneas decorativas de madera en el Arca
      if (!isOutline) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-52, 42); ctx.lineTo(52, 42);
        ctx.moveTo(-48, 52); ctx.lineTo(48, 52);
        ctx.stroke();
      }
      
      // 3. Casita del Arca (Gradiente)
      let houseGrad = ctx.createLinearGradient(-25, 5, 25, 30);
      houseGrad.addColorStop(0, '#ca8a04');
      houseGrad.addColorStop(1, '#78350f');
      setColors(isOutline ? '#ffffff' : houseGrad, '#000000', 2.5);
      ctx.fillRect(-25, 5, 50, 25);
      ctx.strokeRect(-25, 5, 50, 25);
      
      // Ventanita redonda de la casita
      setColors(isOutline ? '#ffffff' : '#fef08a', '#000000', 2);
      ctx.beginPath();
      ctx.arc(0, 17, 6, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      
      // Techo inclinado
      let roofGrad = ctx.createLinearGradient(-35, -15, 35, 5);
      roofGrad.addColorStop(0, '#dc2626');
      roofGrad.addColorStop(1, '#7f1d1d');
      setColors(isOutline ? '#ffffff' : roofGrad, '#000000', 2.5);
      ctx.beginPath();
      ctx.moveTo(-35, 5);
      ctx.lineTo(0, -15);
      ctx.lineTo(35, 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // 4. Nubes acolchadas al pie del arca
      setColors(isOutline ? '#ffffff' : '#f8fafc', '#000000', 2.5);
      ctx.beginPath();
      // Nube izquierda
      ctx.arc(-55, 45, 14, 0, Math.PI * 2);
      ctx.arc(-38, 40, 18, 0, Math.PI * 2);
      ctx.arc(-22, 45, 14, 0, Math.PI * 2);
      // Nube derecha
      ctx.arc(22, 45, 14, 0, Math.PI * 2);
      ctx.arc(38, 40, 18, 0, Math.PI * 2);
      ctx.arc(55, 45, 14, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      
    } else if (normalized.includes('lech') || normalized.includes('lej')) {
      // TEMA: Viaje y estrellas de Abraham - Premium Sofisticado
      ctx.shadowColor = isOutline ? 'transparent' : 'rgba(234, 179, 8, 0.2)';
      
      // Resplandor cósmico
      if (!isOutline) {
        let spaceGlow = ctx.createRadialGradient(0, 0, 10, 0, 0, 75);
        spaceGlow.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
        spaceGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = spaceGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 75, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Círculo orbital punteado fino
      ctx.strokeStyle = isOutline ? '#000000' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 70, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // 1. Luna creciente dorada (Gradiente y brillo)
      let moonGrad = ctx.createLinearGradient(0, -35, 25, 15);
      moonGrad.addColorStop(0, '#fffde6');
      moonGrad.addColorStop(0.5, '#fef08a');
      moonGrad.addColorStop(1, '#eab308');
      setColors(isOutline ? '#ffffff' : moonGrad, '#000000', 2.5);
      
      ctx.beginPath();
      ctx.arc(10, -10, 40, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      ctx.fillStyle = isOutline ? '#ffffff' : '#0b1a30'; // Tapado para efecto creciente
      ctx.beginPath();
      ctx.arc(-2, -10, 38, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      // 2. Estrellas brillantes de varios tamaños
      setColors('#f59e0b', '#000000', 2);
      
      // Brillos de fondo para las estrellas
      if (!isOutline) {
        ctx.fillStyle = 'rgba(253, 224, 71, 0.25)';
        ctx.beginPath();
        ctx.arc(-35, -30, 8, 0, Math.PI * 2);
        ctx.arc(45, 25, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      
      drawStar(ctx, -35, -30, 6, 12, 4);
      if (isOutline) ctx.stroke();
      drawStar(ctx, 45, 25, 5, 10, 3.5);
      if (isOutline) ctx.stroke();
      drawStar(ctx, -20, 35, 4, 8, 3);
      if (isOutline) ctx.stroke();
      drawStar(ctx, 35, -35, 4, 6, 2.5);
      if (isOutline) ctx.stroke();
      
    } else if (normalized.includes('vayeira') || normalized.includes('vayera')) {
      // TEMA: Tienda de Abraham (Hospitalidad) - Premium Sofisticado
      
      // 1. Suelo desértico
      let sandGrad = ctx.createLinearGradient(-80, 50, 80, 60);
      sandGrad.addColorStop(0, '#fef08a');
      sandGrad.addColorStop(1, '#ca8a04');
      setColors(isOutline ? '#ffffff' : sandGrad, '#000000', 3);
      ctx.beginPath();
      ctx.ellipse(0, 50, 80, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      // 2. Tienda (Gradiente suave)
      let tentGrad = ctx.createLinearGradient(0, -30, 0, 50);
      tentGrad.addColorStop(0, '#fffbeb'); // Muy clara arriba
      tentGrad.addColorStop(1, '#fde047'); // Amarilla suave abajo
      setColors(isOutline ? '#ffffff' : tentGrad, '#78350f', 4);
      ctx.beginPath();
      ctx.moveTo(-60, 50);
      ctx.lineTo(0, -30);
      ctx.lineTo(60, 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Pliegues decorativos de la tienda
      if (!isOutline) {
        ctx.strokeStyle = 'rgba(120, 53, 15, 0.2)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-30, 50); ctx.lineTo(0, -30);
        ctx.moveTo(30, 50); ctx.lineTo(0, -30);
        ctx.stroke();
      }
      
      // 3. Entrada oscura de la hospitalidad
      let insideGrad = ctx.createLinearGradient(0, 5, 0, 50);
      insideGrad.addColorStop(0, '#451a03');
      insideGrad.addColorStop(1, '#1c0d02');
      setColors(isOutline ? '#ffffff' : insideGrad, '#78350f', 3);
      ctx.beginPath();
      ctx.moveTo(-25, 50);
      ctx.lineTo(0, 5);
      ctx.lineTo(25, 50);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // 4. Farolito brillante (Menorah / Luz)
      if (!isOutline) {
        let lampGlow = ctx.createRadialGradient(0, -10, 2, 0, -10, 15);
        lampGlow.addColorStop(0, '#ffffff');
        lampGlow.addColorStop(0.3, '#f59e0b');
        lampGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = lampGlow;
        ctx.beginPath();
        ctx.arc(0, -10, 15, 0, Math.PI * 2);
        ctx.fill();
      }
      setColors('#fde047', '#000000', 2);
      ctx.beginPath();
      ctx.arc(0, -10, 8, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
    } else if (normalized.includes('shemot') || normalized.includes('exodo')) {
      // TEMA: Zarza Ardiente - Premium Sofisticado
      ctx.shadowColor = isOutline ? 'transparent' : 'rgba(239, 68, 68, 0.4)';
      
      // 1. Hojas de la Zarza (Esferas superpuestas)
      let bushGrad = ctx.createRadialGradient(0, 0, 10, 0, 10, 50);
      bushGrad.addColorStop(0, '#22c55e');
      bushGrad.addColorStop(1, '#14532d');
      setColors(isOutline ? '#ffffff' : bushGrad, '#000000', 3);
      
      ctx.beginPath();
      ctx.arc(0, 15, 45, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(-25, 0, 30, 0, Math.PI * 2);
      ctx.arc(25, -5, 30, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      // 2. Fuego sagrado (Llamas vectoriales en gradiente)
      // Llama trasera naranja
      let fireGrad1 = ctx.createLinearGradient(0, 0, 0, -60);
      fireGrad1.addColorStop(0, '#f97316');
      fireGrad1.addColorStop(1, '#ef4444');
      setColors(isOutline ? '#ffffff' : fireGrad1, '#000000', 2.5);
      ctx.beginPath();
      ctx.moveTo(-18, 0);
      ctx.quadraticCurveTo(-38, -40, -18, -60);
      ctx.quadraticCurveTo(0, -30, -18, 0);
      ctx.fill(); ctx.stroke();
      
      // Llama trasera roja
      ctx.beginPath();
      ctx.moveTo(18, -5);
      ctx.quadraticCurveTo(38, -45, 18, -65);
      ctx.quadraticCurveTo(0, -35, 18, -5);
      ctx.fill(); ctx.stroke();
      
      // Llama central amarilla brillante
      let fireGrad2 = ctx.createLinearGradient(0, 10, 0, -70);
      fireGrad2.addColorStop(0, '#fef08a');
      fireGrad2.addColorStop(1, '#f59e0b');
      setColors(isOutline ? '#ffffff' : fireGrad2, '#000000', 2.5);
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.quadraticCurveTo(-8, -40, 5, -70);
      ctx.quadraticCurveTo(18, -30, 0, 10);
      ctx.fill(); ctx.stroke();
      
    } else if (normalized.includes('beshalach') || normalized.includes('beshalaj')) {
      // TEMA: División del mar Rojo - Premium Sofisticado
      ctx.shadowColor = isOutline ? 'transparent' : 'rgba(56, 189, 248, 0.45)';
      
      // 1. Camino de Arena seca (Gradiente y textura)
      let sandGrad = ctx.createLinearGradient(-30, 60, 30, 60);
      sandGrad.addColorStop(0, '#ca8a04');
      sandGrad.addColorStop(0.5, '#fef08a');
      sandGrad.addColorStop(1, '#a16207');
      setColors(isOutline ? '#ffffff' : sandGrad, '#000000', 3);
      ctx.beginPath();
      ctx.moveTo(-30, 60);
      ctx.lineTo(-12, -60);
      ctx.lineTo(12, -60);
      ctx.lineTo(30, 60);
      ctx.closePath();
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      // 2. Ola Izquierda gigante (Fuerza del agua)
      let waterGrad1 = ctx.createLinearGradient(-75, 60, -25, -60);
      waterGrad1.addColorStop(0, '#1d4ed8'); // Azul rey
      waterGrad1.addColorStop(0.6, '#2563eb');
      waterGrad1.addColorStop(1, '#60a5fa'); // Celeste
      setColors(isOutline ? '#ffffff' : waterGrad1, '#000000', 3);
      ctx.beginPath();
      ctx.moveTo(-30, 60);
      ctx.lineTo(-75, 60);
      ctx.bezierCurveTo(-90, 0, -60, -40, -25, -60);
      ctx.bezierCurveTo(-45, -30, -40, 10, -30, 60);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      
      // 3. Ola Derecha gigante (Fuerza del agua)
      let waterGrad2 = ctx.createLinearGradient(75, 60, 25, -60);
      waterGrad2.addColorStop(0, '#1e3a8a');
      waterGrad2.addColorStop(0.6, '#3b82f6');
      waterGrad2.addColorStop(1, '#93c5fd');
      setColors(isOutline ? '#ffffff' : waterGrad2, '#000000', 3);
      ctx.beginPath();
      ctx.moveTo(30, 60);
      ctx.lineTo(75, 60);
      ctx.bezierCurveTo(90, 0, 60, -40, 25, -60);
      ctx.bezierCurveTo(45, -30, 40, 10, 30, 60);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      
      // 4. Cresta de espuma de mar decorativa
      setColors(isOutline ? '#ffffff' : '#e0f2fe', '#000000', 2.5);
      ctx.beginPath();
      ctx.arc(-30, -55, 12, 0, Math.PI*2);
      ctx.arc(30, -55, 12, 0, Math.PI*2);
      ctx.fill(); ctx.stroke();
      
    } else if (normalized.includes('yitro')) {
      // TEMA: Monte Sinaí y Tablas - Premium Sofisticado
      ctx.shadowColor = isOutline ? 'transparent' : 'rgba(34, 197, 94, 0.2)';
      
      // 1. Monte Sinaí (Gradiente de montaña con pico iluminado)
      let mtGrad = ctx.createLinearGradient(0, -35, 0, 50);
      mtGrad.addColorStop(0, '#86efac'); // Cima iluminada verde claro
      mtGrad.addColorStop(0.5, '#22c55e'); // Verde
      mtGrad.addColorStop(1, '#14532d'); // Bosque profundo
      setColors(isOutline ? '#ffffff' : mtGrad, '#000000', 3);
      ctx.beginPath();
      ctx.moveTo(-75, 50);
      ctx.lineTo(0, -35);
      ctx.lineTo(75, 50);
      ctx.closePath();
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      // 2. Tablas de la Ley (Sombreadas en gradiente de piedra)
      let stoneGrad = ctx.createLinearGradient(-30, -40, 30, 8);
      stoneGrad.addColorStop(0, '#f1f5f9'); // Piedra clara
      stoneGrad.addColorStop(1, '#94a3b8'); // Piedra grisácea
      setColors(isOutline ? '#ffffff' : stoneGrad, '#000000', 3);
      
      ctx.beginPath();
      ctx.roundRect(-30, -40, 26, 48, 6);
      ctx.fill(); ctx.stroke();
      
      ctx.beginPath();
      ctx.roundRect(4, -40, 26, 48, 6);
      ctx.fill(); ctx.stroke();
      
      // 3. Mandamientos (Hebreo de oro o negro nítido)
      ctx.fillStyle = isOutline ? '#000000' : '#d97706';
      ctx.font = 'bold 11px Outfit, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText("I-V", -17, -25);
      ctx.fillText("VI-X", 17, -25);
      
    } else if (normalized.includes('terumah') || normalized.includes('teruma')) {
      // TEMA: El Mishkán (Tabernáculo) - Premium Sofisticado
      
      // Plataforma del Mishkán
      setColors('#eab308', '#a16207', 3);
      ctx.fillRect(-60, 35, 120, 15);
      ctx.strokeRect(-60, 35, 120, 15);
      
      // Columnas doradas radiales
      let goldGrad = ctx.createLinearGradient(-45, -25, -33, 35);
      goldGrad.addColorStop(0, '#fffbeb');
      goldGrad.addColorStop(0.5, '#eab308');
      goldGrad.addColorStop(1, '#ca8a04');
      
      ctx.fillStyle = isOutline ? '#ffffff' : goldGrad;
      ctx.fillRect(-45, -25, 12, 60);
      ctx.fillRect(33, -25, 12, 60);
      ctx.strokeRect(-45, -25, 12, 60);
      ctx.strokeRect(33, -25, 12, 60);
      
      // Cortinajes del santuario (Púrpura real con gradiente)
      let purpleGrad = ctx.createLinearGradient(-33, -15, 33, 35);
      purpleGrad.addColorStop(0, '#c084fc');
      purpleGrad.addColorStop(1, '#581c87');
      setColors(isOutline ? '#ffffff' : purpleGrad, '#000000', 3);
      ctx.fillRect(-33, -15, 66, 50);
      ctx.strokeRect(-33, -15, 66, 50);
      
      // Velo de la entrada (Azul real)
      let veilGrad = ctx.createLinearGradient(-15, -15, 15, 35);
      veilGrad.addColorStop(0, '#60a5fa');
      veilGrad.addColorStop(1, '#1d4ed8');
      setColors(isOutline ? '#ffffff' : veilGrad, '#000000', 3);
      ctx.fillRect(-15, -15, 30, 50);
      ctx.strokeRect(-15, -15, 30, 50);
      
      // Techo del Santuario (Pieles de tejas)
      setColors(isOutline ? '#ffffff' : '#b45309', '#000000', 3);
      ctx.beginPath();
      ctx.moveTo(-55, -25);
      ctx.lineTo(0, -50);
      ctx.lineTo(55, -25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
    } else if (normalized.includes('nasso')) {
      // TEMA EXCLUSIVO NASSO: Birkat Kohanim (Bendición Sacerdotal) - Nano Banana Premium AI Assets 🖖✨
      const imgKey = isOutline ? 'nasso_outline' : 'nasso_color';
      const img = imageCache[imgKey];
      
      if (img && img.complete && img.naturalWidth !== 0) {
        ctx.save();
        // Dibujarla centrada y proporcional en la caja de -70 a 70
        ctx.drawImage(img, -70, -70, 140, 140);
        ctx.restore();
      } else {
        // FALLBACK: Dibujo vectorial de reserva (Nano Banana original) si la imagen no ha cargado
        ctx.shadowColor = isOutline ? 'transparent' : 'rgba(245, 158, 11, 0.4)';
        
        // 1. Resplandor Aura de fondo (Solo en modo Color)
        if (!isOutline) {
          let auraGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 85);
          auraGrad.addColorStop(0, 'rgba(56, 189, 248, 0.3)'); // Resplandor celeste
          auraGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.18)'); // Resplandor dorado
          auraGrad.addColorStop(1, 'rgba(11, 26, 48, 0)'); // Fuga
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(0, 0, 85, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // 2. Sol radiante de fondo (Glow radial premium)
        let sunGrad = ctx.createRadialGradient(0, -10, 5, 0, -10, 45);
        sunGrad.addColorStop(0, '#ffffff'); // Blanco puro central
        sunGrad.addColorStop(0.3, '#fff9db'); // Amarillo muy claro
        sunGrad.addColorStop(0.7, '#fde047'); // Amarillo
        sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)'); // Fuga
        
        setColors(isOutline ? '#ffffff' : sunGrad, isOutline ? '#000000' : 'transparent', 2);
        ctx.beginPath();
        ctx.arc(0, -10, 45, 0, Math.PI * 2);
        if (isOutline) {
          ctx.stroke();
        } else {
          ctx.fill();
        }
        
        // Rayos de sol mágicos (Broad Glowing Rays)
        if (!isOutline) {
          ctx.fillStyle = 'rgba(253, 224, 71, 0.16)';
          for (let i = 0; i < 8; i++) {
            let angle = (i * Math.PI) / 4;
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.lineTo(Math.cos(angle - 0.15) * 85, -10 + Math.sin(angle - 0.15) * 85);
            ctx.lineTo(Math.cos(angle + 0.15) * 85, -10 + Math.sin(angle + 0.15) * 85);
            ctx.closePath();
            ctx.fill();
          }
        } else {
          // En outline, hacer rayos discontinuos sencillos
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([5, 5]);
          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 6) {
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * 50, -10 + Math.sin(angle) * 50);
            ctx.lineTo(Math.cos(angle) * 75, -10 + Math.sin(angle) * 75);
            ctx.stroke();
          }
          ctx.setLineDash([]); // Restablecer
        }
        
        // 3. Palomita blanca de la paz volando (Detallada con alas superpuestas y sombras)
        if (!isOutline) {
          // Sombra proyectada por la paloma
          ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
          ctx.beginPath();
          ctx.ellipse(-42, -30, 16, 10, 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Ala trasera (detrás del cuerpo)
        setColors(isOutline ? '#ffffff' : '#e2e8f0', '#000000', 2.5);
        ctx.beginPath();
        ctx.ellipse(-32, -48, 8, 14, -0.6, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // Cuerpo + Cola en gradiente
        let doveGrad = ctx.createLinearGradient(-60, -45, -30, -25);
        doveGrad.addColorStop(0, '#ffffff');
        doveGrad.addColorStop(1, '#f1f5f9');
        setColors(isOutline ? '#ffffff' : doveGrad, '#000000', 2.5);
        
        // Cuerpo
        ctx.beginPath();
        ctx.ellipse(-45, -35, 16, 10, 0.2, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // Plumas de la Cola
        ctx.beginPath();
        ctx.moveTo(-30, -32);
        ctx.lineTo(-20, -26);
        ctx.lineTo(-22, -34);
        ctx.lineTo(-18, -38);
        ctx.lineTo(-32, -38);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        
        // Cabeza
        ctx.beginPath();
        ctx.arc(-58, -40, 7.5, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // Pico naranja
        setColors(isOutline ? '#ffffff' : '#f97316', '#000000', 2);
        ctx.beginPath();
        ctx.moveTo(-65, -39);
        ctx.lineTo(-71, -37);
        ctx.lineTo(-64, -35);
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        
        // Ojito tierno
        if (!isOutline) {
          ctx.fillStyle = '#0f172a';
          ctx.beginPath();
          ctx.arc(-59, -41, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Ala delantera superpuesta (Blanca nítida)
        setColors(isOutline ? '#ffffff' : '#ffffff', '#000000', 2.5);
        ctx.beginPath();
        ctx.ellipse(-40, -44, 9, 15, -0.3, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // Ramita de olivo verde
        ctx.strokeStyle = isOutline ? '#000000' : '#16a34a';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-65, -37);
        ctx.quadraticCurveTo(-72, -37, -76, -42);
        ctx.stroke();
        
        // Hojas de olivo detalladas
        setColors(isOutline ? '#ffffff' : '#22c55e', '#000000', 1.5);
        ctx.beginPath();
        ctx.ellipse(-72, -43, 4.5, 2.5, -0.4, 0, Math.PI * 2);
        ctx.ellipse(-77, -40, 4.5, 2.5, 0.3, 0, Math.PI * 2);
        ctx.ellipse(-68, -36, 4, 2, 0.6, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        
        // 4. Manos Kohanim haciendo la bendición sacerdotal (🖖)
        // Sombras de las mangas
        if (!isOutline) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
          ctx.beginPath();
          ctx.roundRect(-45, 29, 20, 30, [3, 3, 0, 0]);
          ctx.roundRect(31, 29, 20, 30, [3, 3, 0, 0]);
          ctx.fill();
        }
        
        // Mangas sacerdotales (Estilo Talit con franjas azules)
        setColors('#ffffff', '#000000', 3);
        ctx.beginPath();
        ctx.roundRect(-48, 25, 20, 30, [3, 3, 0, 0]);
        ctx.fill(); ctx.stroke();
        ctx.beginPath();
        ctx.roundRect(28, 25, 20, 30, [3, 3, 0, 0]);
        ctx.fill(); ctx.stroke();
        
        if (!isOutline) {
          // Franjas de Talit en las mangas
          ctx.fillStyle = '#1d4ed8'; // Azul real
          ctx.fillRect(-48, 35, 20, 4);
          ctx.fillRect(28, 35, 20, 4);
          ctx.fillStyle = '#38bdf8'; // Celeste
          ctx.fillRect(-48, 41, 20, 2);
          ctx.fillRect(28, 41, 20, 2);
          
          // Flecos (Tzitzit) colgando de las mangas
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(-44, 55); ctx.quadraticCurveTo(-45, 63, -43, 67);
          ctx.moveTo(-32, 55); ctx.quadraticCurveTo(-30, 64, -33, 68);
          ctx.moveTo(32, 55); ctx.quadraticCurveTo(30, 63, 31, 67);
          ctx.moveTo(44, 55); ctx.quadraticCurveTo(46, 64, 45, 68);
          ctx.stroke();
        }
        
        // Mano izquierda (del Kohén) en gradiente de piel cálido
        let skinGrad = ctx.createLinearGradient(0, 25, 0, -25);
        skinGrad.addColorStop(0, '#fdba74'); // Piel cálida
        skinGrad.addColorStop(1, '#ffedd5'); // Piel clara
        
        // Sombra de la mano izquierda
        if (!isOutline) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
          ctx.beginPath();
          ctx.moveTo(-34, 28);
          ctx.lineTo(-44, 23);
          ctx.quadraticCurveTo(-56, 13, -48, -2);
          ctx.lineTo(-38, 8);
          ctx.quadraticCurveTo(-43, -22, -30, -22);
          ctx.lineTo(-25, -2);
          ctx.quadraticCurveTo(-18, -22, -5, -22);
          ctx.quadraticCurveTo(3, 8, -14, 28);
          ctx.closePath();
          ctx.fill();
        }
        
        setColors(isOutline ? '#ffffff' : skinGrad, '#000000', 3);
        ctx.beginPath();
        ctx.moveTo(-38, 25);
        ctx.lineTo(-48, 20); // base pulgar
        ctx.quadraticCurveTo(-60, 10, -52, -5); // pulgar
        ctx.lineTo(-42, 5); // comisura
        ctx.quadraticCurveTo(-47, -25, -34, -25); // índice y medio
        ctx.lineTo(-29, -5); // separación dedos
        ctx.quadraticCurveTo(-22, -25, -9, -25); // anular y meñique
        ctx.quadraticCurveTo(-1, 5, -18, 25); // palma
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        
        // Sombra de la mano derecha
        if (!isOutline) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
          ctx.beginPath();
          ctx.moveTo(34, 28);
          ctx.lineTo(44, 23);
          ctx.quadraticCurveTo(56, 13, 48, -2);
          ctx.lineTo(38, 8);
          ctx.quadraticCurveTo(43, -22, 30, -22);
          ctx.lineTo(25, -2);
          ctx.quadraticCurveTo(18, -22, 5, -22);
          ctx.quadraticCurveTo(-3, 8, 14, 28);
          ctx.closePath();
          ctx.fill();
        }
        
        // Mano derecha (del Kohén)
        ctx.beginPath();
        ctx.moveTo(38, 25);
        ctx.lineTo(48, 20); // base pulgar
        ctx.quadraticCurveTo(60, 10, 52, -5); // pulgar
        ctx.lineTo(42, 5); // comisura
        ctx.quadraticCurveTo(47, -25, 34, -25); // índice y medio
        ctx.lineTo(29, -5); // separación dedos
        ctx.quadraticCurveTo(22, -25, 9, -25); // anular y meñique
        ctx.quadraticCurveTo(1, 5, 18, 25); // palma
        ctx.closePath();
        ctx.fill(); ctx.stroke();
        
        // Brillos de uñas en color
        if (!isOutline) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(-49, -2, 1, 0, Math.PI * 2);
          ctx.arc(-39, -21, 1, 0, Math.PI * 2);
          ctx.arc(-14, -21, 1, 0, Math.PI * 2);
          ctx.arc(49, -2, 1, 0, Math.PI * 2);
          ctx.arc(39, -21, 1, 0, Math.PI * 2);
          ctx.arc(14, -21, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // 5. Corazón flotante con brillo (en medio de las manos)
        let heartGrad = ctx.createLinearGradient(0, 5, 0, 20);
        heartGrad.addColorStop(0, '#f87171'); // Rojo claro
        heartGrad.addColorStop(1, '#dc2626'); // Rojo oscuro
        setColors(isOutline ? '#ffffff' : heartGrad, isOutline ? '#000000' : 'transparent', 2);
        
        // Sombra del corazón
        if (!isOutline) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
          ctx.beginPath();
          ctx.moveTo(2, 7);
          ctx.bezierCurveTo(-3, 2, -8, 2, -8, 7);
          ctx.bezierCurveTo(-8, 12, -3, 17, 2, 22);
          ctx.bezierCurveTo(7, 17, 12, 12, 12, 7);
          ctx.bezierCurveTo(12, 2, 7, 2, 2, 7);
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.bezierCurveTo(-5, 0, -10, 0, -10, 5);
        ctx.bezierCurveTo(-10, 10, -5, 15, 0, 20);
        ctx.bezierCurveTo(5, 15, 10, 10, 10, 5);
        ctx.bezierCurveTo(10, 0, 5, 0, 0, 5);
        ctx.closePath();
        if (isOutline) {
          ctx.stroke();
        } else {
          ctx.fillStyle = heartGrad;
          ctx.fill();
        }
        
        // 6. Estrellitas doradas con brillo radial
        if (!isOutline) {
          ctx.fillStyle = 'rgba(253, 224, 71, 0.25)';
          ctx.beginPath();
          ctx.arc(-22, 10, 9, 0, Math.PI * 2);
          ctx.arc(22, 10, 9, 0, Math.PI * 2);
          ctx.fill();
        }
        setColors('#fde047', '#000000', 1.5);
        drawStar(ctx, -22, 10, 4, 6, 3);
        if (isOutline) ctx.stroke();
        drawStar(ctx, 22, 10, 4, 6, 3);
        if (isOutline) ctx.stroke();
        
        // Brillos de destello blancos
        if (!isOutline) {
          ctx.fillStyle = '#ffffff';
          drawStar(ctx, -5, -45, 4, 4, 1.5);
          drawStar(ctx, 50, -25, 4, 5, 2);
        }
      }
      
    } else if (normalized.includes('beha') || normalized.includes('bamidbar') || normalized.includes('shelach') || normalized.includes('sh\'lach') || normalized.includes('korach') || normalized.includes('koraj') || normalized.includes('chukat') || normalized.includes('jukat')) {
      // TEMA: Banderas de las Tribus en el desierto (Bamidbar / Otras de Números) - Premium Sofisticado
      let earthGrad = ctx.createLinearGradient(0, 35, 0, 55);
      earthGrad.addColorStop(0, '#fef08a');
      earthGrad.addColorStop(1, '#d97706');
      setColors(isOutline ? '#ffffff' : earthGrad, '#000000', 3);
      ctx.beginPath();
      ctx.ellipse(0, 45, 75, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
      
      const drawFlag = (x, color, sym) => {
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, 45);
        ctx.lineTo(x, -35);
        ctx.stroke();
        
        let flagGrad = ctx.createLinearGradient(x, -35, x + 45, -5);
        flagGrad.addColorStop(0, color);
        flagGrad.addColorStop(1, 'rgba(0,0,0,0.15)'); // Sombreado de pliegue
        
        setColors(isOutline ? '#ffffff' : flagGrad, '#000000', 2.5);
        ctx.beginPath();
        ctx.roundRect(x, -35, 45, 30, [0, 5, 5, 0]);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = isOutline ? '#000000' : '#ffffff';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText(sym, x + 22, -15);
      };
      
      ctx.textAlign = 'center';
      drawFlag(-45, '#ef4444', '🦁'); 
      drawFlag(-10, '#38bdf8', '⛵'); 
      drawFlag(25, '#22c55e', '🦌'); 
      
    } else if (normalized.includes('devarim') || normalized.includes('eikev') || normalized.includes('shoftim')) {
      // TEMA: Pergamino de Torá Abierto (Devarim) - Premium Sofisticado
      let paperGrad = ctx.createLinearGradient(-60, -35, 60, 35);
      paperGrad.addColorStop(0, '#ffedd5'); // Pergamino claro
      paperGrad.addColorStop(0.5, '#fed7aa');
      paperGrad.addColorStop(1, '#ffedd5');
      setColors(isOutline ? '#ffffff' : paperGrad, '#78350f', 4);
      ctx.beginPath();
      ctx.roundRect(-60, -35, 120, 70, 8);
      ctx.fill();
      ctx.stroke();
      
      // Rodillos de madera con gradientes
      let rollerGrad = ctx.createLinearGradient(-70, -45, -60, 45);
      rollerGrad.addColorStop(0, '#f97316');
      rollerGrad.addColorStop(1, '#7c2d12');
      setColors(isOutline ? '#ffffff' : rollerGrad, '#78350f', 3);
      ctx.fillRect(-70, -45, 10, 90);
      ctx.fillRect(60, -45, 10, 90);
      ctx.strokeRect(-70, -45, 10, 90);
      ctx.strokeRect(60, -45, 10, 90);
      
      // Puntas de madera (pomos)
      setColors(isOutline ? '#ffffff' : '#ea580c', '#78350f', 2.5);
      ctx.beginPath();
      ctx.arc(-65, -45, 7, 0, Math.PI * 2);
      ctx.arc(-65, 45, 7, 0, Math.PI * 2);
      ctx.arc(65, -45, 7, 0, Math.PI * 2);
      ctx.arc(65, 45, 7, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      
      // Estrella de David de oro en el centro
      ctx.strokeStyle = isOutline ? '#000000' : '#ca8a04';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(-12, 6);
      ctx.lineTo(12, 6);
      ctx.closePath();
      ctx.moveTo(0, 12);
      ctx.lineTo(-12, -12);
      ctx.lineTo(12, -12);
      ctx.closePath();
      ctx.stroke();
      
      // Líneas de texto falso simulando escrituras de Torá
      ctx.strokeStyle = isOutline ? 'rgba(0,0,0,0.25)' : 'rgba(120, 53, 15, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-45, -20); ctx.lineTo(-20, -20);
      ctx.moveTo(-45, -10); ctx.lineTo(-25, -10);
      ctx.moveTo(20, 15); ctx.lineTo(45, 15);
      ctx.moveTo(25, 23); ctx.lineTo(45, 23);
      ctx.stroke();
      
    } else {
      // DEFAULT FALLBACK: Velas de Shabat - Premium Sofisticado
      // Sombreado de las Velas
      let candleGrad = ctx.createLinearGradient(-22, -10, -10, 50);
      candleGrad.addColorStop(0, '#ffffff');
      candleGrad.addColorStop(1, '#cbd5e1');
      setColors(isOutline ? '#ffffff' : candleGrad, '#0f172a', 3);
      
      ctx.beginPath();
      ctx.roundRect(-22, -10, 12, 60, 2);
      ctx.roundRect(10, -10, 12, 60, 2);
      ctx.fill();
      ctx.stroke();
      
      // Flamas brillantes con aura de calor
      if (!isOutline) {
        let flameGlow = ctx.createRadialGradient(-16, -18, 2, -16, -18, 14);
        flameGlow.addColorStop(0, '#ffffff');
        flameGlow.addColorStop(0.3, '#f59e0b');
        flameGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
        ctx.fillStyle = flameGlow;
        ctx.beginPath();
        ctx.arc(-16, -18, 14, 0, Math.PI * 2);
        ctx.arc(16, -18, 14, 0, Math.PI * 2);
        ctx.fill();
      }
      
      let flameGrad = ctx.createLinearGradient(-16, -24, -16, -12);
      flameGrad.addColorStop(0, '#ffffff');
      flameGrad.addColorStop(0.4, '#fde047');
      flameGrad.addColorStop(1, '#ea580c');
      
      setColors(isOutline ? '#ffffff' : flameGrad, '#000000', 2);
      ctx.beginPath();
      ctx.arc(-16, -18, 6, 0, Math.PI * 2);
      ctx.arc(16, -18, 6, 0, Math.PI * 2);
      ctx.fill();
      if (isOutline) ctx.stroke();
    }
    ctx.restore();
  }

  // Dibujador de estrellas para canvas
  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function generateInvitationPNG() {
    const canvas = document.getElementById('invitation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Dimensiones HD
    canvas.width = 800;
    canvas.height = 1000;

    const titleVal = document.getElementById('inv-title').value;
    const parashaVal = document.getElementById('inv-parasha').value;
    const dateVal = document.getElementById('inv-date').value;
    const timeVal = document.getElementById('inv-time').value;
    const activitiesVal = document.getElementById('inv-activities').value;
    const candlesTime = state.shabbatData.candles;
    const theme = getActiveTheme();

    const formattedDate = dateVal ? formatDateSpanish(new Date(dateVal + 'T00:00:00')) : '--';

    // 1. Dibujar Fondo
    let gradient = ctx.createLinearGradient(0, 0, 0, 1000);
    if (theme === 'stars') {
      gradient.addColorStop(0, '#081121');
      gradient.addColorStop(1, '#1e293b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 1000);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 35; i++) {
        ctx.fillRect(Math.random() * 800, Math.random() * 600, 2, 2);
      }
      ctx.fillStyle = 'rgba(245, 158, 11, 0.5)';
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * 800, Math.random() * 600, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (theme === 'nature') {
      gradient.addColorStop(0, '#022c22');
      gradient.addColorStop(1, '#065f46');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 1000);
    } else if (theme === 'party') {
      gradient.addColorStop(0, '#451a03');
      gradient.addColorStop(1, '#9a3412');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 1000);
    } else { // modern
      gradient.addColorStop(0, '#0b1329');
      gradient.addColorStop(1, '#172554');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 1000);
      
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 16;
      ctx.strokeRect(20, 20, 760, 960);
    }

    let accentColor = '#38bdf8';
    if (theme === 'stars') accentColor = '#f59e0b';
    else if (theme === 'nature') accentColor = '#34d399';
    else if (theme === 'party') accentColor = '#fde047';

    // 2. Encabezado
    ctx.textAlign = 'center';
    ctx.font = '800 24px Outfit, sans-serif';
    ctx.fillStyle = accentColor;
    ctx.fillText("COMUNIDAD NBI SANTIAGO", 400, 80);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.roundRect(290, 120, 220, 40, 20);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText("¡SHABAT INFANTIL EN VIVO!", 400, 145);

    // 3. Título
    ctx.font = '800 60px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    
    const words = titleVal.split(' ');
    let line = '';
    let y = 210;
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      ctx.font = '800 60px Outfit, sans-serif';
      let metrics = ctx.measureText(testLine);
      if (metrics.width > 700 && n > 0) {
        ctx.fillText(line, 400, y);
        line = words[n] + ' ';
        y += 65;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 400, y);

    // 4. Parashá
    y += 55;
    const pData = getParashaData(parashaVal);
    ctx.font = '700 26px Outfit, sans-serif';
    
    const parashaText = `Parashá ${parashaVal} (${pData.hebrew})`;
    const textWidth = ctx.measureText(parashaText).width;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(400 - (textWidth/2) - 24, y - 26, textWidth + 48, 42, 21);
    ctx.fill();
    
    ctx.fillStyle = accentColor;
    ctx.fillText(parashaText, 400, y);

    // DIBUJAR LA ILUSTRACIÓN TEMÁTICA EXCLUSIVA (Nano Banana / NBI Engine)
    // Escalamos a 2.5x para que se vea grande, nítido y sumamente premium en la invitación HD final!
    ctx.save();
    ctx.scale(2.5, 2.5);
    drawParashaIllustration(ctx, parashaVal, 400 / 2.5, 500 / 2.5);
    ctx.restore();

    // 5. Descripción/Actividades
    let descY = 690;
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillStyle = '#f1f5f9';
    
    const descWords = activitiesVal.split(' ');
    let descLine = '';
    for (let n = 0; n < descWords.length; n++) {
      let testLine = descLine + descWords[n] + ' ';
      let metrics = ctx.measureText(testLine);
      if (metrics.width > 640 && n > 0) {
        ctx.fillText(descLine, 400, descY);
        descLine = descWords[n] + ' ';
        descY += 32;
      } else {
        descLine = testLine;
      }
    }
    ctx.fillText(descLine, 400, descY);

    // 6. Pie de Página
    const cardY = 760;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(80, cardY, 640, 180, 20);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText(`🗓️ Fecha:`, 120, cardY + 45);
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(formattedDate, 230, cardY + 45);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText(`⏰ Hora Shabateinu:`, 120, cardY + 90);
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`${timeVal} hrs`, 355, cardY + 90);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText(`🕯️ Encendido Velas:`, 120, cardY + 135);
    ctx.font = '500 22px Inter, sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`${candlesTime} hrs (Santiago)`, 355, cardY + 135);

    ctx.textAlign = 'center';
    ctx.font = '600 18px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("📍 Dirección: Mar Jónico 8880, Vitacura", 400, 975);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Invitacion_Shabateinu_${parashaVal}.png`;
    link.href = dataURL;
    link.click();
    showToast('📥 Invitación descargada correctamente');
  }

  // ==========================================================================
  // 5. KIT DE JUEGOS Y MINIJUEGOS INTERACTIVOS
  // ==========================================================================
  const gameTabBtns = document.querySelectorAll('.game-tab-btn');
  const gameViews = document.querySelectorAll('.game-view');
  const btnPrintGame = document.getElementById('btn-print-game');

  function initializeGamesTab() {
    // Activar primer juego por defecto si no hay ninguno activo
    const activeBtn = document.querySelector('.game-tab-btn.active');
    if (activeBtn) {
      switchGame(activeBtn.dataset.game);
    } else if (gameTabBtns.length > 0) {
      switchGame(gameTabBtns[0].dataset.game);
    }
  }

  function switchGame(gameId) {
    gameTabBtns.forEach(btn => {
      if (btn.dataset.game === gameId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    gameViews.forEach(view => {
      if (view.id === `game-view-${gameId}`) {
        view.classList.add('active');
        // Inicialización específica del juego al mostrarlo
        if (gameId === 'wordsearch') {
          initWordSearchGame();
        } else if (gameId === 'trivia') {
          initTriviaGame();
        } else if (gameId === 'paint') {
          initPaintCanvas();
        }
      } else {
        view.classList.remove('active');
      }
    });
  }

  gameTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switchGame(btn.dataset.game);
    });
  });

  // Botón general de impresión de juego
  if (btnPrintGame) {
    btnPrintGame.addEventListener('click', () => {
      window.print();
    });
  }

  // --- A. JUEGO: SOPA DE LETRAS ---
  const gridContainer = document.getElementById('ws-grid');
  const wordsListContainer = document.getElementById('ws-words-list');

  function initWordSearchGame() {
    const pData = getParashaData(state.selectedParasha);
    state.wordsearch.words = [...pData.words];
    state.wordsearch.foundWords = [];
    state.wordsearch.selectedCells = [];
    
    generateWordSearchGrid();
    renderWordSearchUI();
  }

  function generateWordSearchGrid() {
    const size = 10;
    const grid = Array(size).fill(null).map(() => Array(size).fill(''));
    const words = state.wordsearch.words;

    // Colocar las palabras en la cuadrícula (horizontal o vertical)
    words.forEach(word => {
      const w = word.toUpperCase();
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        attempts++;
        const direction = Math.random() > 0.5 ? 'H' : 'V'; // Horizontal o Vertical
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (direction === 'H') {
          if (col + w.length <= size) {
            let fits = true;
            for (let i = 0; i < w.length; i++) {
              if (grid[row][col + i] !== '' && grid[row][col + i] !== w[i]) {
                fits = false;
                break;
              }
            }
            if (fits) {
              for (let i = 0; i < w.length; i++) {
                grid[row][col + i] = w[i];
              }
              placed = true;
            }
          }
        } else {
          if (row + w.length <= size) {
            let fits = true;
            for (let i = 0; i < w.length; i++) {
              if (grid[row + i][col] !== '' && grid[row + i][col] !== w[i]) {
                fits = false;
                break;
              }
            }
            if (fits) {
              for (let i = 0; i < w.length; i++) {
                grid[row + i][col] = w[i];
              }
              placed = true;
            }
          }
        }
      }
    });

    // Rellenar espacios vacíos con letras aleatorias (incluyendo letras hebreas o letras clave)
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c] === '') {
          grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    state.wordsearch.grid = grid;
  }

  function renderWordSearchUI() {
    if (!gridContainer || !wordsListContainer) return;

    // Renderizar grilla
    gridContainer.innerHTML = '';
    state.wordsearch.grid.forEach((row, rIdx) => {
      row.forEach((letter, cIdx) => {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.textContent = letter;
        cell.dataset.row = rIdx;
        cell.dataset.col = cIdx;
        
        // Eventos mouse/táctiles para selección
        cell.addEventListener('mousedown', () => startWordSelection(cell, rIdx, cIdx));
        cell.addEventListener('mouseenter', () => continueWordSelection(cell, rIdx, cIdx));
        
        gridContainer.appendChild(cell);
      });
    });

    // Evento ratón arriba a nivel documento para finalizar selección
    const endSelectionHandler = () => {
      if (state.wordsearch.isSelecting) {
        state.wordsearch.isSelecting = false;
        checkSelectedWord();
      }
    };
    document.removeEventListener('mouseup', endSelectionHandler);
    document.addEventListener('mouseup', endSelectionHandler);
    
    // Soporte pantallas táctiles móviles
    gridContainer.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.classList.contains('grid-cell')) {
        state.wordsearch.isSelecting = true;
        const r = parseInt(element.dataset.row);
        const c = parseInt(element.dataset.col);
        startWordSelection(element, r, c);
      }
    }, { passive: true });

    gridContainer.addEventListener('touchmove', (e) => {
      if (!state.wordsearch.isSelecting) return;
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element.classList.contains('grid-cell')) {
        const r = parseInt(element.dataset.row);
        const c = parseInt(element.dataset.col);
        continueWordSelection(element, r, c);
      }
    }, { passive: true });

    gridContainer.addEventListener('touchend', () => {
      if (state.wordsearch.isSelecting) {
        state.wordsearch.isSelecting = false;
        checkSelectedWord();
      }
    });

    // Renderizar palabras a buscar
    wordsListContainer.innerHTML = '';
    state.wordsearch.words.forEach(word => {
      const tag = document.createElement('li');
      tag.className = 'word-tag';
      tag.id = `ws-word-${word}`;
      tag.textContent = word;
      
      if (state.wordsearch.foundWords.includes(word)) {
        tag.classList.add('found');
      }
      wordsListContainer.appendChild(tag);
    });
  }

  function startWordSelection(cell, r, c) {
    state.wordsearch.isSelecting = true;
    state.wordsearch.selectedCells = [{ element: cell, r, c }];
    cell.classList.add('selected');
  }

  function continueWordSelection(cell, r, c) {
    if (!state.wordsearch.isSelecting) return;
    
    // Evitar añadir la misma celda consecutivamente
    const exists = state.wordsearch.selectedCells.find(cellObj => cellObj.r === r && cellObj.c === c);
    if (!exists) {
      state.wordsearch.selectedCells.push({ element: cell, r, c });
      cell.classList.add('selected');
    }
  }

  function checkSelectedWord() {
    // Formar la palabra seleccionada
    const word = state.wordsearch.selectedCells.map(cell => cell.element.textContent).join('');
    const reversedWord = word.split('').reverse().join('');
    
    const matchedWord = state.wordsearch.words.find(w => w === word || w === reversedWord);

    if (matchedWord && !state.wordsearch.foundWords.includes(matchedWord)) {
      // ¡Encontrada!
      state.wordsearch.foundWords.push(matchedWord);
      
      // Marcar celdas como encontradas permanently
      state.wordsearch.selectedCells.forEach(cell => {
        cell.element.classList.remove('selected');
        cell.element.classList.add('found');
      });

      // Marcar etiqueta de palabra
      const tag = document.getElementById(`ws-word-${matchedWord}`);
      if (tag) tag.classList.add('found');

      // Animación de destello
      playSuccessSoundVisual();
    } else {
      // No coincide, desmarcar
      state.wordsearch.selectedCells.forEach(cell => {
        cell.element.classList.remove('selected');
      });
    }
    state.wordsearch.selectedCells = [];
  }

  function playSuccessSoundVisual() {
    // Sonido sutil sintetizado usando Web Audio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.15); // G5
      
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch(e) {}
  }

  // --- B. JUEGO: TRIVIA INTERACTIVA ---
  const triviaCard = document.getElementById('trivia-game-card');

  function initTriviaGame() {
    const pData = getParashaData(state.selectedParasha);
    state.trivia.questions = [...pData.trivia];
    state.trivia.currentQuestionIdx = 0;
    state.trivia.score = 0;
    state.trivia.answersHistory = [];
    
    renderTriviaUI();
  }

  function renderTriviaUI() {
    if (!triviaCard) return;

    const idx = state.trivia.currentQuestionIdx;
    const questions = state.trivia.questions;

    // Verificar si finalizó el cuestionario
    if (idx >= questions.length) {
      renderTriviaScoreScreen();
      return;
    }

    const q = questions[idx];
    const progressPercent = (idx / questions.length) * 100;

    triviaCard.innerHTML = `
      <div class="trivia-container">
        <div class="trivia-progress-bar">
          <div class="trivia-progress" style="width: ${progressPercent}%"></div>
        </div>
        <p style="color: var(--nbi-cyan); font-weight: bold; font-size: 0.85rem; margin-bottom: 0.5rem; text-transform: uppercase;">Pregunta ${idx + 1} de ${questions.length}</p>
        <h3 class="trivia-question">${q.question}</h3>
        <div class="trivia-options">
          ${q.options.map((opt, oIdx) => `
            <button class="option-btn" data-index="${oIdx}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    // Escuchar clics en opciones
    const btns = triviaCard.querySelectorAll('.option-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => handleTriviaAnswer(parseInt(btn.dataset.index), btns));
    });
  }

  function handleTriviaAnswer(selectedIndex, buttons) {
    const idx = state.trivia.currentQuestionIdx;
    const q = state.trivia.questions[idx];
    const correctIdx = q.answer;

    // Bloquear otros botones
    buttons.forEach(btn => btn.disabled = true);

    const selectedBtn = buttons[selectedIndex];
    const correctBtn = buttons[correctIdx];

    if (selectedIndex === correctIdx) {
      selectedBtn.classList.add('correct');
      state.trivia.score++;
      playCorrectSound();
      awardXP(10, '¡Respuesta correcta!');
      incrementStat('triviaCorrect');
    } else {
      selectedBtn.classList.add('incorrect');
      correctBtn.classList.add('correct');
      playErrorSound();
    }

    // Avanzar después de una pausa
    setTimeout(() => {
      state.trivia.currentQuestionIdx++;
      renderTriviaUI();
    }, 1500);
  }

  function renderTriviaScoreScreen() {
    const score = state.trivia.score;
    const total = state.trivia.questions.length;
    let feedbackMsg = "¡Sigue aprendiendo de nuestra Torá! 📚";
    if (score === total) {
      feedbackMsg = "¡Excelente! Eres un experto en la Torá 🌟";
      triggerCelebration('🌟 ¡Perfecto!');
    } else if (score > 0) feedbackMsg = "¡Muy bien hecho! Gran esfuerzo 🎈";

    triviaCard.innerHTML = `
      <div class="trivia-container score-screen">
        <div class="score-circle">
          <span class="score-num">${score}</span>
          <span class="score-label">De ${total}</span>
        </div>
        <h3 style="font-family: var(--font-title); font-size: 1.8rem; margin-bottom: 0.8rem;">¡Felicidades!</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.8rem;">${feedbackMsg}</p>
        <button id="btn-restart-trivia" class="btn-primary">
          <i class="lucide lucide-rotate-ccw"></i> Jugar de nuevo
        </button>
      </div>
    `;

    const btnRestart = document.getElementById('btn-restart-trivia');
    if (btnRestart) {
      btnRestart.addEventListener('click', initTriviaGame);
    }
  }

  function playCorrectSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch(e) {}
  }

  function playErrorSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
      osc.frequency.setValueAtTime(147, audioCtx.currentTime + 0.1); // D3
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch(e) {}
  }

  // --- C. JUEGO: PIZARRA Y LIENZO DE PINTURA DIGITAL ---
  const canvasPaint = document.getElementById('paint-canvas');
  const paletteItems = document.querySelectorAll('.color-palette-item');
  const sizeBtns = document.querySelectorAll('.brush-size-btn');
  const btnClearPaint = document.getElementById('btn-clear-paint');
  const btnDownloadPaint = document.getElementById('btn-download-paint');
  const templateBtns = document.querySelectorAll('.template-card-btn');


  function drawDiscreetColorLabels(ctx, templateName) {
    ctx.save();
    ctx.font = 'bold 10px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const w = canvasPaint.width;
    const h = canvasPaint.height;
    const midX = w / 2;
    const midY = h / 2;

    const labels = {
      velas: [
        { text: "FUEGO", x: midX - 90, y: midY - 110 },
        { text: "FUEGO", x: midX + 90, y: midY - 110 },
        { text: "BLANCO", x: midX - 90, y: midY - 40 },
        { text: "BLANCO", x: midX + 90, y: midY - 40 },
        { text: "ORO", x: midX - 90, y: midY + 90 },
        { text: "ORO", x: midX + 90, y: midY + 90 },
        { text: "PLATA", x: midX - 90, y: midY + 40 },
        { text: "PLATA", x: midX + 90, y: midY + 40 }
      ],
      challa: [
        { text: "MADERA", x: midX, y: midY + 70 },
        { text: "MARRÓN", x: midX - 100, y: midY - 10 },
        { text: "DORADO", x: midX - 50, y: midY - 20 },
        { text: "DORADO", x: midX, y: midY - 22 },
        { text: "DORADO", x: midX + 50, y: midY - 20 },
        { text: "MARRÓN", x: midX + 100, y: midY - 10 }
      ],
      torah: [
        { text: "CREMA", x: midX - 80, y: midY },
        { text: "CREMA", x: midX + 80, y: midY },
        { text: "MADERA", x: midX - 160, y: midY - 150 },
        { text: "MADERA", x: midX + 160, y: midY - 150 },
        { text: "MADERA", x: midX - 160, y: midY + 150 },
        { text: "MADERA", x: midX + 160, y: midY + 150 },
        { text: "ORO", x: midX, y: midY - 5 }
      ],
      nasso: [
        { text: "BLANCO", x: midX - 70, y: midY - 60 },
        { text: "VERDE", x: midX - 130, y: midY - 70 },
        { text: "AMARILLO", x: midX, y: midY - 30 },
        { text: "BLANCO", x: midX - 80, y: midY + 70 },
        { text: "AZUL", x: midX - 80, y: midY + 90 },
        { text: "BLANCO", x: midX + 80, y: midY + 70 },
        { text: "AZUL", x: midX + 80, y: midY + 90 },
        { text: "PIEL", x: midX - 70, y: midY },
        { text: "PIEL", x: midX + 70, y: midY },
        { text: "ROJO", x: midX, y: midY + 20 },
        { text: "ORO", x: midX - 45, y: midY + 20 },
        { text: "ORO", x: midX + 45, y: midY + 20 }
      ],
      bereshit: [
        { text: "AZUL", x: midX, y: midY },
        { text: "VERDE", x: midX - 30, y: midY - 30 },
        { text: "VERDE", x: midX + 30, y: midY + 20 },
        { text: "AMARILLO", x: midX - 120, y: midY - 80 },
        { text: "OSCURO", x: midX + 120, y: midY + 80 },
        { text: "VERDE", x: midX - 100, y: midY + 80 }
      ],
      noaj: [
        { text: "MARRÓN", x: midX, y: midY + 70 },
        { text: "ROJO", x: midX, y: midY - 15 },
        { text: "AMARILLO", x: midX, y: midY + 25 },
        { text: "ROJO", x: midX, y: midY - 125 },
        { text: "AMARILLO", x: midX, y: midY - 110 },
        { text: "AZUL", x: midX, y: midY - 95 },
        { text: "CELESTE", x: midX - 80, y: midY + 110 },
        { text: "BLANCO", x: midX - 100, y: midY + 80 }
      ],
      shemot: [
        { text: "VERDE", x: midX, y: midY + 30 },
        { text: "AMARILLO", x: midX, y: midY - 70 },
        { text: "ROJO", x: midX - 40, y: midY - 50 },
        { text: "NARANJA", x: midX + 40, y: midY - 50 },
        { text: "AMARILLO", x: midX, y: midY + 90 }
      ],
      beshalaj: [
        { text: "AZUL", x: midX - 110, y: midY },
        { text: "AZUL", x: midX + 110, y: midY },
        { text: "ARENA", x: midX, y: midY + 60 },
        { text: "BLANCO", x: midX - 70, y: midY - 105 }
      ],
      yitro: [
        { text: "VERDE", x: midX, y: midY + 60 },
        { text: "GRIS", x: midX - 35, y: midY - 30 },
        { text: "GRIS", x: midX + 35, y: midY - 30 },
        { text: "ORO", x: midX - 35, y: midY - 10 }
      ]
    };

    const activeLabels = labels[templateName];
    if (activeLabels) {
      activeLabels.forEach(lbl => {
        // Círculo base de gran legibilidad
        ctx.fillStyle = 'rgba(255, 255, 255, 0.78)';
        ctx.beginPath();
        ctx.arc(lbl.x, lbl.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Texto discreto
        ctx.fillStyle = 'rgba(15, 23, 42, 0.65)';
        ctx.fillText(lbl.text, lbl.x, lbl.y);
      });
    }
    ctx.restore();
  }

  function drawImageCentered(ctx, img, titleText, fallbackFn) {
    ctx.save();
    // Limpiar canvas a blanco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasPaint.width, canvasPaint.height);
    
    if (img && img.complete && img.naturalWidth !== 0) {
      // Ajustar escala manteniendo la relación de aspecto
      const padding = 60;
      const scale = Math.min((canvasPaint.width - padding) / img.width, (canvasPaint.height - padding - 60) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvasPaint.width - w) / 2;
      const y = (canvasPaint.height - h) / 2 + 25;
      ctx.drawImage(img, x, y, w, h);

      // Dibujar las etiquetas discretas de color
      const templateName = img.id.replace('_outline', '');
      const actualKey = (templateName === 'shabbat') ? 'velas' : (templateName === 'challah' ? 'challa' : templateName);
      drawDiscreetColorLabels(ctx, actualKey);

    } else if (img) {
      // Si la imagen existe pero no ha terminado de cargar, escuchar evento onload
      img.onload = () => {
        // Redibujar sólo si el usuario sigue en esta plantilla
        const activeTemplate = state.paint.currentTemplate;
        const targetTemplate = img.id.replace('_outline', '');
        if (activeTemplate === targetTemplate || (activeTemplate === 'velas' && targetTemplate === 'shabbat')) {
          drawImageCentered(ctx, img, titleText, fallbackFn);
        }
      };
      // Mientras tanto, usar el fallback vectorial
      fallbackFn(ctx);
    } else {
      fallbackFn(ctx);
    }
    
    // Dibujar el título de la plantilla con estilo elegante
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(titleText, canvasPaint.width / 2, 40);
    ctx.restore();
  }

  function drawActiveTemplateOutline() {
    const ctx = canvasPaint.getContext('2d');
    const template = state.paint.currentTemplate;
    
    if (template === 'velas') {
      drawImageCentered(ctx, imageCache.shabbat_outline, "¡Pinta las velas de Shabat!", drawCandlesOutlineFallback);
    } else if (template === 'challa') {
      drawImageCentered(ctx, imageCache.challah_outline, "¡Pinta la hermosa Jalá de Shabat!", drawChallahOutlineFallback);
    } else if (template === 'torah') {
      drawImageCentered(ctx, imageCache.torah_outline, "¡Pinta nuestra Torá Sagrada!", drawTorahOutlineFallback);
    } else if (template === 'parasha') {
      drawParashaOutline(ctx);
    }
    // Si es 'blank' no dibuja nada
  }

  // Dibuja el contorno limpio de la Parashá seleccionada para colorear (Nano Banana Engine)
  function drawParashaOutline(ctx) {
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasPaint.width, canvasPaint.height);
    
    const midX = canvasPaint.width / 2;
    const midY = canvasPaint.height / 2;
    
    const normalized = state.selectedParasha.toLowerCase();
    let img = null;
    let portionKey = '';
    
    if (normalized.includes('nasso')) {
      img = imageCache.nasso_outline;
      portionKey = 'nasso';
    } else if (normalized.includes('bereshit')) {
      img = imageCache.bereshit_outline;
      portionKey = 'bereshit';
    } else if (normalized.includes('noach') || normalized.includes('noaj')) {
      img = imageCache.noaj_outline;
      portionKey = 'noaj';
    } else if (normalized.includes('shemot') || normalized.includes('exodo')) {
      img = imageCache.shemot_outline;
      portionKey = 'shemot';
    } else if (normalized.includes('beshalach') || normalized.includes('beshalaj')) {
      img = imageCache.beshalaj_outline;
      portionKey = 'beshalaj';
    } else if (normalized.includes('yitro')) {
      img = imageCache.yitro_outline;
      portionKey = 'yitro';
    }
    
    if (img && img.complete && img.naturalWidth !== 0) {
      const padding = 60;
      const scale = Math.min((canvasPaint.width - padding) / img.width, (canvasPaint.height - padding - 60) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (canvasPaint.width - w) / 2;
      const y = (canvasPaint.height - h) / 2 + 25;
      ctx.drawImage(img, x, y, w, h);

      // Dibujar las etiquetas discretas de color
      if (portionKey) {
        drawDiscreetColorLabels(ctx, portionKey);
      }
    } else if (img) {
      // Si está cargando asíncronamente, escuchar onload para redibujar
      img.onload = () => {
        if (state.paint.currentTemplate === 'parasha' && state.selectedParasha.toLowerCase() === normalized) {
          drawParashaOutline(ctx);
        }
      };
      // Fallback temporal vectorial
      ctx.save();
      ctx.translate(midX, midY);
      ctx.scale(1.8, 1.8);
      drawParashaIllustration(ctx, state.selectedParasha, 0, 0, true);
      ctx.restore();
    } else {
      // Centrar, escalar a 1.8x y dibujar en outline vectorial
      ctx.save();
      ctx.translate(midX, midY);
      ctx.scale(1.8, 1.8);
      drawParashaIllustration(ctx, state.selectedParasha, 0, 0, true);
      ctx.restore();
    }
    
    // Título superior
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.textAlign = 'center';
    const pData = getParashaData(state.selectedParasha);
    ctx.fillText(`¡Pinta la Parashat ${pData.name}!`, midX, 45);
    ctx.restore();
  }

  // Dibujar sutiles outlines matemáticos en vectores en el canvas
  function drawCandlesOutlineFallback(ctx) {
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Dibujar dos Velas de Shabat bonitas
    const w = canvasPaint.width;
    const h = canvasPaint.height;
    const midX = w / 2;
    const base = h - 60;

    // Portavelas izquierdo
    ctx.beginPath();
    ctx.moveTo(midX - 120, base);
    ctx.lineTo(midX - 60, base);
    ctx.moveTo(midX - 90, base);
    ctx.lineTo(midX - 90, base - 60);
    // Platito
    ctx.ellipse(midX - 90, base - 60, 40, 10, 0, 0, Math.PI * 2);
    // Vela izquierda
    ctx.roundRect(midX - 105, base - 260, 30, 200, 5);
    ctx.stroke();

    // Flama izquierda
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(midX - 90, base - 270);
    ctx.quadraticCurveTo(midX - 75, base - 290, midX - 90, base - 320);
    ctx.quadraticCurveTo(midX - 105, base - 290, midX - 90, base - 270);
    ctx.fill();
    ctx.stroke();

    // Portavelas derecho
    ctx.beginPath();
    ctx.moveTo(midX + 60, base);
    ctx.lineTo(midX + 120, base);
    ctx.moveTo(midX + 90, base);
    ctx.lineTo(midX + 90, base - 60);
    // Platito
    ctx.ellipse(midX + 90, base - 60, 40, 10, 0, 0, Math.PI * 2);
    // Vela derecha
    ctx.roundRect(midX + 75, base - 260, 30, 200, 5);
    ctx.stroke();

    // Flama derecha
    ctx.beginPath();
    ctx.moveTo(midX + 90, base - 270);
    ctx.quadraticCurveTo(midX + 105, base - 290, midX + 90, base - 320);
    ctx.quadraticCurveTo(midX + 75, base - 290, midX + 90, base - 270);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawChallahOutlineFallback(ctx) {
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const w = canvasPaint.width;
    const h = canvasPaint.height;
    const midX = w / 2;
    const midY = h / 2;

    // Tabla de Jalá
    ctx.beginPath();
    ctx.ellipse(midX, midY + 40, 240, 60, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Trenza de Jalá (varias elipses cruzadas simulando panes trenzados)
    ctx.fillStyle = '#fef08a'; // Color base sutil
    
    // Gajos
    const gajos = [
      { x: midX - 120, y: midY - 10, rX: 45, rY: 30, rot: 0.3 },
      { x: midX - 60, y: midY - 20, rX: 55, rY: 35, rot: -0.2 },
      { x: midX, y: midY - 22, rX: 60, rY: 40, rot: 0.1 },
      { x: midX + 60, y: midY - 20, rX: 55, rY: 35, rot: 0.3 },
      { x: midX + 120, y: midY - 10, rX: 45, rY: 30, rot: -0.3 }
    ];

    gajos.forEach(g => {
      ctx.beginPath();
      ctx.ellipse(g.x, g.y, g.rX, g.rY, g.rot, 0, Math.PI * 2);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawTorahOutlineFallback(ctx) {
    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#000000';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const w = canvasPaint.width;
    const h = canvasPaint.height;
    const midX = w / 2;
    const midY = h / 2;

    // Rodillo izquierdo
    ctx.beginPath();
    ctx.moveTo(midX - 160, midY - 140);
    ctx.lineTo(midX - 160, midY + 140);
    // Mango superior e inferior izquierdo
    ctx.roundRect(midX - 170, midY - 170, 20, 30, 4);
    ctx.roundRect(midX - 170, midY + 140, 20, 30, 4);

    // Rodillo derecho
    ctx.moveTo(midX + 160, midY - 140);
    ctx.lineTo(midX + 160, midY + 140);
    // Mango superior e inferior derecho
    ctx.roundRect(midX + 150, midY - 170, 20, 30, 4);
    ctx.roundRect(midX + 150, midY + 140, 20, 30, 4);
    ctx.stroke();

    // Pergaminos
    ctx.beginPath();
    // Lado izquierdo
    ctx.moveTo(midX - 160, midY - 120);
    ctx.lineTo(midX - 10, midY - 120);
    ctx.quadraticCurveTo(midX - 10, midY + 120, midX - 10, midY + 120);
    ctx.lineTo(midX - 160, midY + 120);

    // Lado derecho
    ctx.moveTo(midX + 160, midY - 120);
    ctx.lineTo(midX + 10, midY - 120);
    ctx.quadraticCurveTo(midX + 10, midY + 120, midX + 10, midY + 120);
    ctx.lineTo(midX + 160, midY + 120);
    ctx.stroke();

    // Símbolo Estrella de David en el pergamino
    ctx.beginPath();
    ctx.moveTo(midX, midY - 40);
    ctx.lineTo(midX - 25, midY + 10);
    ctx.lineTo(midX + 25, midY + 10);
    ctx.closePath();
    ctx.moveTo(midX, midY + 25);
    ctx.lineTo(midX - 25, midY - 25);
    ctx.lineTo(midX + 25, midY - 25);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  // Variable para evitar agregar listeners duplicados al canvas de pintura
  let paintListenersAttached = false;

  function initPaintCanvas() {
    if (!canvasPaint) return;
    const ctx = canvasPaint.getContext('2d');
    
    // Adaptar tamaño interno al de la visualización
    canvasPaint.width = canvasPaint.offsetWidth;
    canvasPaint.height = canvasPaint.offsetHeight;
    
    // Limpieza
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasPaint.width, canvasPaint.height);
    
    drawActiveTemplateOutline();

    if (paintListenersAttached) return;
    paintListenersAttached = true;

    // --- LÓGICA DE DIBUJO ---
    function startDrawing(e) {
      state.paint.isDrawing = true;
      draw(e);
    }

    function stopDrawing() {
      state.paint.isDrawing = false;
      ctx.beginPath(); // Reiniciar camino
    }

    function draw(e) {
      if (!state.paint.isDrawing) return;

      // Obtener coordenadas correctas relativas al canvas
      let x, y;
      if (e.touches && e.touches[0]) {
        // Soporte táctil
        const rect = canvasPaint.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
        e.preventDefault(); // Evitar scroll
      } else {
        // Soporte ratón
        x = e.offsetX;
        y = e.offsetY;
      }

      // Escalar coordenadas si el canvas tiene diferente tamaño CSS vs interno
      const scaleX = canvasPaint.width / canvasPaint.offsetWidth;
      const scaleY = canvasPaint.height / canvasPaint.offsetHeight;
      x *= scaleX;
      y *= scaleY;

      ctx.lineWidth = state.paint.size;
      ctx.lineCap = 'round';
      
      if (state.paint.mode === 'erase') {
        ctx.strokeStyle = '#ffffff';
      } else {
        ctx.strokeStyle = state.paint.color;
      }

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    // Eventos Mouse
    canvasPaint.addEventListener('mousedown', startDrawing);
    canvasPaint.addEventListener('mousemove', draw);
    canvasPaint.addEventListener('mouseup', stopDrawing);
    canvasPaint.addEventListener('mouseleave', stopDrawing);

    // Eventos Touch
    canvasPaint.addEventListener('touchstart', startDrawing, { passive: false });
    canvasPaint.addEventListener('touchmove', draw, { passive: false });
    canvasPaint.addEventListener('touchend', stopDrawing);
  }

  // Cambiar Color
  paletteItems.forEach(item => {
    item.addEventListener('click', () => {
      paletteItems.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
      state.paint.color = item.dataset.color;
      state.paint.mode = 'draw'; // Salir de modo borrador
    });
  });

  // Cambiar Tamaño de Pincel
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.paint.size = parseInt(btn.dataset.size);
    });
  });

  // Limpiar Lienzo
  if (btnClearPaint) {
    btnClearPaint.addEventListener('click', () => {
      initPaintCanvas();
    });
  }

  // Descargar Pintura
  if (btnDownloadPaint) {
    btnDownloadPaint.addEventListener('click', () => {
      const dataURL = canvasPaint.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Dibujo_Shabateinu_${state.selectedParasha}.png`;
      link.href = dataURL;
      link.click();
      showToast('🎨 ¡Tu dibujo fue guardado!');
      awardXP(10, '¡Dibujo guardado!');
      incrementStat('paintsSaved');
    });
  }

  // Cambiar Plantilla de Fondo
  templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      templateBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.paint.currentTemplate = btn.dataset.template;
      initPaintCanvas();
    });
  });

  // ==========================================================================
  // 6. EL RINCÓN DE LAS BRAJOT (BENDICIONES DE SHABAT)
  // ==========================================================================
  function loadBrajotProgress() {
    const checkboxes = document.querySelectorAll('.braja-check');
    checkboxes.forEach(chk => {
      // Cargar del localStorage si existe
      const saved = localStorage.getItem(`braja_${chk.id}`);
      if (saved === 'true') {
        chk.checked = true;
      }
      
      // Escuchar cambios
      chk.addEventListener('change', () => {
        localStorage.setItem(`braja_${chk.id}`, chk.checked);
        if (chk.checked) {
          playSuccessSoundVisual(); // Reutilizar sonido bonito de éxito
          awardXP(10, '¡Brajá aprendida!');
          incrementStat('brajotLearned');
          // Check if all 4 are learned
          const allChecked = document.querySelectorAll('.braja-check:checked').length;
          if (allChecked >= 4) {
            triggerCelebration('🕯️ ¡Todas las Brajot!');
          }
        }
      });
    });
  }

  // ==========================================================================
  // 7. SHABAT QUEST — GAMIFICACIÓN (XP, INSIGNIAS, NIVEL)
  // ==========================================================================
  const BADGES = [
    { id: 'trivia_master', name: 'Maestro Torah', icon: '📜', desc: 'Responde 3 trivias correctas', condition: (s) => s.triviaCorrect >= 3 },
    { id: 'singer', name: 'Cantante Shabat', icon: '🎤', desc: 'Escucha 3 canciones K-POP', condition: (s) => s.songsPlayed >= 3 },
    { id: 'artist', name: 'Artista Creativo', icon: '🎨', desc: 'Pinta 2 dibujos', condition: (s) => s.paintsSaved >= 2 },
    { id: 'braja_pro', name: 'Bendición de Oro', icon: '🕯️', desc: 'Aprende las 4 Brajot', condition: (s) => s.brajotLearned >= 4 },
    { id: 'reader', name: 'Lector de Torah', icon: '📖', desc: 'Lee 3 cuentos completos', condition: (s) => s.storiesRead >= 3 },
    { id: 'hebrew_hero', name: 'Héroe del Hebreo', icon: '✡️', desc: 'Aprende 6 letras Alef-Bet', condition: (s) => s.lettersLearned >= 6 }
  ];

  const LEVELS = [
    { min: 0, name: 'Principiante de Shabat', emoji: '🌱' },
    { min: 50, name: 'Estudiante de Torah', emoji: '📚' },
    { min: 120, name: 'Explorador NBI', emoji: '🔭' },
    { min: 200, name: 'Campeón de Shabateinu', emoji: '🏆' },
    { min: 350, name: 'Leyenda del Shabat', emoji: '👑' }
  ];

  function getQuestState() {
    try {
      return JSON.parse(localStorage.getItem('shabat_quest') || '{}');
    } catch { return {}; }
  }

  function saveQuestState(qs) {
    localStorage.setItem('shabat_quest', JSON.stringify(qs));
  }

  function initQuestState() {
    const defaults = { xp: 0, triviaCorrect: 0, songsPlayed: 0, paintsSaved: 0, brajotLearned: 0, storiesRead: 0, lettersLearned: 0, unlockedBadges: [] };
    const saved = getQuestState();
    return { ...defaults, ...saved };
  }

  function awardXP(amount, reason) {
    const qs = initQuestState();
    const oldLevel = getLevel(qs.xp);
    qs.xp += amount;
    saveQuestState(qs);
    updateXPUI(qs);
    checkBadges(qs);
    const newLevel = getLevel(qs.xp);
    if (newLevel.name !== oldLevel.name) {
      showLevelUp(newLevel);
    }
    showToast(`⭐ +${amount} XP: ${reason}`);
  }

  function incrementStat(statName, amount = 1) {
    const qs = initQuestState();
    qs[statName] = (qs[statName] || 0) + amount;
    saveQuestState(qs);
    checkBadges(qs);
  }

  function getLevel(xp) {
    let current = LEVELS[0];
    for (const l of LEVELS) {
      if (xp >= l.min) current = l;
    }
    return current;
  }

  function getNextLevel(xp) {
    for (const l of LEVELS) {
      if (xp < l.min) return l;
    }
    return LEVELS[LEVELS.length - 1];
  }

  function updateXPUI(qs) {
    if (!qs) qs = initQuestState();
    const xpText = document.getElementById('xp-points-text');
    const xpBarFill = document.getElementById('xp-bar-fill');
    const levelText = document.getElementById('xp-level-text');

    if (xpText) xpText.textContent = `${qs.xp} ⭐`;

    const current = getLevel(qs.xp);
    const next = getNextLevel(qs.xp);
    if (levelText) levelText.textContent = `${current.emoji} Nivel: ${current.name}`;

    if (xpBarFill) {
      const progress = next.min > current.min ? ((qs.xp - current.min) / (next.min - current.min)) * 100 : 100;
      xpBarFill.style.width = `${Math.min(progress, 100)}%`;
    }
  }

  function checkBadges(qs) {
    if (!qs.unlockedBadges) qs.unlockedBadges = [];
    let newBadge = false;
    BADGES.forEach(b => {
      if (!qs.unlockedBadges.includes(b.id) && b.condition(qs)) {
        qs.unlockedBadges.push(b.id);
        newBadge = true;
        showToast(`🏅 ¡Insignia desbloqueada: ${b.name}!`);
        triggerConfetti();
      }
    });
    if (newBadge) saveQuestState(qs);
    renderBadgesGrid(qs);
  }

  function renderBadgesGrid(qs) {
    const grid = document.getElementById('badges-grid');
    if (!grid) return;
    if (!qs) qs = initQuestState();
    grid.innerHTML = BADGES.map(b => {
      const unlocked = qs.unlockedBadges && qs.unlockedBadges.includes(b.id);
      return `<div class="badge-item ${unlocked ? 'unlocked' : ''}">
        <span class="badge-icon">${b.icon}</span>
        <span class="badge-name">${b.name}</span>
        <span class="badge-desc">${unlocked ? '✅ Desbloqueada' : b.desc}</span>
      </div>`;
    }).join('');
  }

  function showLevelUp(level) {
    let overlay = document.querySelector('.level-up-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'level-up-overlay';
      overlay.innerHTML = `<div class="level-up-text"></div>`;
      document.body.appendChild(overlay);
    }
    overlay.querySelector('.level-up-text').textContent = `${level.emoji} ¡Nivel: ${level.name}!`;
    overlay.classList.add('visible');
    triggerConfetti();
    setTimeout(() => overlay.classList.remove('visible'), 3000);
  }

  function setupQuestUI() {
    const xpDisplay = document.getElementById('xp-display');
    if (xpDisplay) {
      xpDisplay.addEventListener('click', () => {
        const modal = document.getElementById('badges-modal');
        if (modal) modal.classList.toggle('visible');
      });
    }
    const closeBtn = document.getElementById('btn-close-badges');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const modal = document.getElementById('badges-modal');
        if (modal) modal.classList.remove('visible');
      });
    }
    const qs = initQuestState();
    updateXPUI(qs);
    renderBadgesGrid(qs);
  }

  // ==========================================================================
  // 8. CUENTO INTERACTIVO (STORYBOOK)
  // ==========================================================================
  const storyState = { currentPage: 0, pages: [] };

  function initStorybook() {
    const pData = getParashaData(state.selectedParasha);
    storyState.pages = pData.storyPages || [];
    storyState.currentPage = 0;
    renderStoryPage();
    renderStoryDots();
    setupStoryListeners();
  }

  let storyListenersBound = false;
  function setupStoryListeners() {
    if (storyListenersBound) return;
    storyListenersBound = true;

    const prevBtn = document.getElementById('btn-story-prev');
    const nextBtn = document.getElementById('btn-story-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (storyState.currentPage > 0) {
          storyState.currentPage--;
          renderStoryPage();
          renderStoryDots();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (storyState.currentPage < storyState.pages.length - 1) {
          storyState.currentPage++;
          renderStoryPage();
          renderStoryDots();
        } else {
          // Finished story!
          awardXP(15, '¡Cuento completo!');
          unlockStamp('cuentos');
          incrementStat('storiesRead');
          showToast('📖 ¡Terminaste el cuento de la Parashá!');
          triggerConfetti();
        }
      });
    }
  }

  function renderStoryPage() {
    const page = storyState.pages[storyState.currentPage];
    if (!page) return;

    const titleEl = document.getElementById('story-page-title');
    const textEl = document.getElementById('story-page-text');
    const emojiEl = document.getElementById('story-emoji');
    const contentEl = document.getElementById('story-page-content');

    if (titleEl) titleEl.textContent = page.title;
    if (textEl) textEl.textContent = page.text;
    if (emojiEl) emojiEl.textContent = page.emoji;

    // Animation
    if (contentEl) {
      contentEl.classList.remove('story-page-transition');
      void contentEl.offsetWidth;
      contentEl.classList.add('story-page-transition');
    }

    // Update nav buttons
    const prevBtn = document.getElementById('btn-story-prev');
    const nextBtn = document.getElementById('btn-story-next');
    if (prevBtn) prevBtn.style.opacity = storyState.currentPage === 0 ? '0.3' : '1';
    if (nextBtn) {
      const isLast = storyState.currentPage >= storyState.pages.length - 1;
      nextBtn.innerHTML = isLast ? '¡Terminar! <i class="fa-solid fa-check"></i>' : 'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    }
  }

  function renderStoryDots() {
    const dotsContainer = document.getElementById('story-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = storyState.pages.map((_, i) =>
      `<div class="story-dot ${i === storyState.currentPage ? 'active' : ''}"></div>`
    ).join('');
  }

  // ==========================================================================
  // 9. ALEF-BET FLASHCARDS
  // ==========================================================================
  const flashcardState = { letters: [], currentIdx: 0, flipped: false };

  function initFlashcards() {
    const pData = getParashaData(state.selectedParasha);
    flashcardState.letters = pData.alefBetLetters || [];
    flashcardState.currentIdx = 0;
    flashcardState.flipped = false;
    renderFlashcard();
    setupFlashcardListeners();
  }

  let flashcardListenersBound = false;
  function setupFlashcardListeners() {
    if (flashcardListenersBound) return;
    flashcardListenersBound = true;

    const card = document.getElementById('flashcard-main');
    const prevBtn = document.getElementById('btn-fc-prev');
    const nextBtn = document.getElementById('btn-fc-next');
    const speakBtn = document.getElementById('btn-fc-speak');

    if (card) {
      card.addEventListener('click', () => {
        flashcardState.flipped = !flashcardState.flipped;
        card.classList.toggle('flipped', flashcardState.flipped);
        if (flashcardState.flipped) {
          incrementStat('lettersLearned');
          awardXP(5, 'Letra aprendida');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (flashcardState.currentIdx > 0) {
          flashcardState.currentIdx--;
          flashcardState.flipped = false;
          renderFlashcard();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (flashcardState.currentIdx < flashcardState.letters.length - 1) {
          flashcardState.currentIdx++;
          flashcardState.flipped = false;
          renderFlashcard();
        }
      });
    }

    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        const letter = flashcardState.letters[flashcardState.currentIdx];
        if (letter && window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(`${letter.name}. Suena como ${letter.sound}. La palabra es ${letter.wordMeaning}.`);
          const voices = window.speechSynthesis.getVoices();
          const esVoice = getNeutralSpanishVoice(voices);
          if (esVoice) utterance.voice = esVoice;
          utterance.pitch = 1.2;
          utterance.rate = 0.9;
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  }

  function renderFlashcard() {
    const letter = flashcardState.letters[flashcardState.currentIdx];
    if (!letter) return;

    const card = document.getElementById('flashcard-main');
    const fcLetter = document.getElementById('fc-letter');
    const fcName = document.getElementById('fc-name');
    const fcSound = document.getElementById('fc-sound');
    const fcWord = document.getElementById('fc-word');
    const fcMeaning = document.getElementById('fc-meaning');
    const fcCounter = document.getElementById('fc-counter');

    if (card) card.classList.remove('flipped');
    flashcardState.flipped = false;

    if (fcLetter) fcLetter.textContent = letter.letter;
    if (fcName) fcName.textContent = letter.name;
    if (fcSound) fcSound.textContent = `Sonido: ${letter.sound}`;
    if (fcWord) fcWord.textContent = letter.word;
    if (fcMeaning) fcMeaning.textContent = letter.wordMeaning;
    if (fcCounter) fcCounter.textContent = `${flashcardState.currentIdx + 1} / ${flashcardState.letters.length}`;
  }

  // ==========================================================================
  // 10. CONFETTI Y CELEBRACIONES
  // ==========================================================================
  let confettiCanvas, confettiCtx, confettiParticles = [], confettiAnimating = false;

  function initConfetti() {
    confettiCanvas = document.getElementById('confetti-canvas');
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    resizeConfettiCanvas();
    window.addEventListener('resize', resizeConfettiCanvas);
  }

  function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  function triggerConfetti() {
    if (!confettiCanvas || !confettiCtx) return;
    const colors = ['#f59e0b', '#38bdf8', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#fef3c7'];
    for (let i = 0; i < 80; i++) {
      confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: -10 - Math.random() * 50,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }
    if (!confettiAnimating) {
      confettiAnimating = true;
      animateConfetti();
    }
  }

  function animateConfetti() {
    if (!confettiCtx || confettiParticles.length === 0) {
      confettiAnimating = false;
      return;
    }
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.vy += 0.05;
      p.opacity -= 0.003;

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rotation * Math.PI / 180);
      confettiCtx.globalAlpha = Math.max(0, p.opacity);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      confettiCtx.restore();
    });
    confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height + 20 && p.opacity > 0);
    requestAnimationFrame(animateConfetti);
  }

  function triggerCelebration(text) {
    triggerConfetti();
    let celText = document.querySelector('.celebration-text');
    if (!celText) {
      celText = document.createElement('div');
      celText.className = 'celebration-text';
      document.body.appendChild(celText);
    }
    celText.textContent = text;
    celText.classList.add('visible');
    setTimeout(() => celText.classList.remove('visible'), 3000);
  }

  // ==========================================================================
  // 11. MODO TV (PANTALLA COMPLETA PARA SINAGOGA)
  // ==========================================================================
  function initTVMode() {
    const btn = document.getElementById('btn-tv-mode');
    if (!btn) return;

    btn.addEventListener('click', () => {
      document.body.classList.toggle('tv-mode');
      const isTV = document.body.classList.contains('tv-mode');

      if (isTV) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
        btn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        showToast('📺 Modo TV activado. ¡Perfecto para la sinagoga!');
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
        btn.innerHTML = '<i class="fa-solid fa-tv"></i>';
        showToast('🖥️ Modo normal restaurado');
      }
    });

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        document.body.classList.remove('tv-mode');
        if (btn) btn.innerHTML = '<i class="fa-solid fa-tv"></i>';
      }
    });
  }

  // ==========================================================================
  // 12. LIBRO DE COLOREAR INTERACTIVO (PINTA PARASHOT)
  // ==========================================================================
  let coloringCanvas = null;
  let coloringCtx = null;
  let isColoring = false;
  let lastColorX = 0;
  let lastColorY = 0;
  let currentColor = '#000000';
  let currentBrushSize = 6;
  let outlineImage = new Image();
  let hasDrawnSomething = false;

  function initColoringBook() {
    coloringCanvas = document.getElementById('coloring-canvas');
    if (!coloringCanvas) return;
    coloringCtx = coloringCanvas.getContext('2d');
    
    // Configurar pincel por defecto
    currentColor = '#000000';
    currentBrushSize = 6;
    hasDrawnSomething = false;

    // Registrar eventos del mouse
    coloringCanvas.addEventListener('mousedown', startDrawing);
    coloringCanvas.addEventListener('mousemove', draw);
    coloringCanvas.addEventListener('mouseup', stopDrawing);
    coloringCanvas.addEventListener('mouseout', stopDrawing);

    // Registrar eventos táctiles para móviles
    coloringCanvas.addEventListener('touchstart', startDrawingTouch, { passive: false });
    coloringCanvas.addEventListener('touchmove', drawTouch, { passive: false });
    coloringCanvas.addEventListener('touchend', stopDrawing);

    // Configurar selectores y botones
    const imageSelect = document.getElementById('select-coloring-image');
    if (imageSelect) {
      // Limpiar opciones estáticas y reconstruir la lista completa con todas las parashot
      imageSelect.innerHTML = '';
      
      // 1. Agregar las ilustraciones premium de la IA primero
      const premiumOptions = [
        { value: 'bereshit', text: 'Día 7: Shabat (Bereshit) 🌟' },
        { value: 'noaj', text: 'El Arcoíris (Noach) 🌈' },
        { value: 'shemot', text: 'Moisés en el Nilo (Shemot) 🧒' },
        { value: 'beshalaj', text: 'El Cruce del Mar (Beshalach) 🌊' },
        { value: 'yitro', text: 'Tablas de la Ley (Yitro) 📜' },
        { value: 'nasso', text: 'Bendición Sacerdotal (Nasso) 🖖' },
        { value: 'challah', text: 'Jalá de Shabat 🍞' },
        { value: 'torah', text: 'Libro de la Torá 📖' },
        { value: 'shabbat', text: 'Velas de Shabat 🕯️' }
      ];
      
      premiumOptions.forEach(opt => {
        const el = document.createElement('option');
        el.value = opt.value;
        el.textContent = opt.text;
        imageSelect.appendChild(el);
      });
      
      // 2. Agregar el resto de las 54 parashot dinámicamente como plantillas vectoriales
      const premiumKeys = ['bereshit', 'noach', 'shemot', 'beshalach', 'yitro', 'nasso'];
      Object.keys(PARASHOT_DB).forEach(key => {
        const normKey = key.toLowerCase();
        const isPremium = premiumKeys.some(pk => normKey.includes(pk));
        if (!isPremium) {
          const el = document.createElement('option');
          el.value = `vector_${key}`;
          const pData = getParashaData(key);
          el.textContent = `Pintar Parashat ${pData.name} (${pData.hebrew}) 🎨`;
          imageSelect.appendChild(el);
        }
      });

      // Registrar listener de cambio
      imageSelect.removeEventListener('change', loadColoringOutline); // Prevenir duplicados
      imageSelect.addEventListener('change', loadColoringOutline);
      
      // Auto-seleccionar según la parashá activa
      const currentParashaKey = state.selectedParasha.toLowerCase();
      let matched = false;
      for (let option of imageSelect.options) {
        // Para coincidir premium
        if (!option.value.startsWith('vector_') && currentParashaKey.includes(option.value)) {
          imageSelect.value = option.value;
          matched = true;
          break;
        }
        // Para coincidir vectoriales
        if (option.value.startsWith('vector_') && option.value.toLowerCase().includes(currentParashaKey)) {
          imageSelect.value = option.value;
          matched = true;
          break;
        }
      }
      if (!matched) {
        // Fallback por defecto si no coincide
        imageSelect.value = 'shabbat';
      }
    }

    const clearBtn = document.getElementById('btn-coloring-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearColoringCanvas);
    }

    const downloadBtn = document.getElementById('btn-coloring-download');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', downloadDrawing);
    }

    const xpBtn = document.getElementById('btn-coloring-xp');
    if (xpBtn) {
      xpBtn.addEventListener('click', claimColoringXP);
    }

    const brushInput = document.getElementById('input-brush-size');
    const brushText = document.getElementById('brush-size-text');
    if (brushInput) {
      brushInput.addEventListener('input', (e) => {
        currentBrushSize = parseInt(e.target.value);
        if (brushText) brushText.textContent = `${currentBrushSize}px`;
      });
    }

    // Configurar paleta de colores
    const swatches = document.querySelectorAll('.coloring-palette .color-swatch');
    swatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        swatches.forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        currentColor = e.target.getAttribute('data-color');
      });
    });

    // Cargar imagen de contorno inicial
    loadColoringOutline();
  }

  function loadColoringOutline() {
    const imageSelect = document.getElementById('select-coloring-image');
    if (!imageSelect || !coloringCtx || !coloringCanvas) return;
    
    const key = imageSelect.value;
    
    if (key.startsWith('vector_')) {
      outlineImage.src = ''; // Vaciar la imagen física
      clearColoringCanvas(false);
    } else {
      outlineImage.src = `assets/${key}_outline.png`;
      outlineImage.onload = () => {
        clearColoringCanvas(false); // Limpiar canvas pero no vaciar si es una recarga
      };
    }
    
    // Habilitar botón de XP de nuevo cuando cambie la ilustración
    const xpBtn = document.getElementById('btn-coloring-xp');
    if (xpBtn) {
      xpBtn.disabled = true;
    }
    hasDrawnSomething = false;
  }

  function clearColoringCanvas(resetDrawnState = true) {
    if (!coloringCtx || !coloringCanvas) return;
    coloringCtx.clearRect(0, 0, coloringCanvas.width, coloringCanvas.height);
    
    // Rellenar fondo blanco
    coloringCtx.fillStyle = '#ffffff';
    coloringCtx.fillRect(0, 0, coloringCanvas.width, coloringCanvas.height);
    
    const imageSelect = document.getElementById('select-coloring-image');
    const key = imageSelect ? imageSelect.value : '';
    
    if (key && key.startsWith('vector_')) {
      // Dibujar la ilustración vectorial centrada y con tamaño apropiado (escala 2.0x)
      const parashaKey = key.replace('vector_', '');
      coloringCtx.save();
      drawParashaIllustration(coloringCtx, parashaKey, 250, 250, true);
      coloringCtx.restore();
    } else {
      // Dibujar la imagen de contorno centrada
      if (outlineImage.complete && outlineImage.naturalWidth > 0) {
        // Ajustar la escala de la imagen para que quepa en el canvas de 500x500
        const scale = Math.min(coloringCanvas.width / outlineImage.width, coloringCanvas.height / outlineImage.height) * 0.95;
        const w = outlineImage.width * scale;
        const h = outlineImage.height * scale;
        const x = (coloringCanvas.width - w) / 2;
        const y = (coloringCanvas.height - h) / 2;
        coloringCtx.drawImage(outlineImage, x, y, w, h);
      }
    }
    
    if (resetDrawnState) {
      hasDrawnSomething = false;
      const xpBtn = document.getElementById('btn-coloring-xp');
      if (xpBtn) xpBtn.disabled = true;
    }
  }

  function startDrawing(e) {
    isColoring = true;
    const rect = coloringCanvas.getBoundingClientRect();
    // Calcular escala en caso de que el canvas esté redimensionado por CSS responsive
    const scaleX = coloringCanvas.width / rect.width;
    const scaleY = coloringCanvas.height / rect.height;
    lastColorX = (e.clientX - rect.left) * scaleX;
    lastColorY = (e.clientY - rect.top) * scaleY;
  }

  function startDrawingTouch(e) {
    e.preventDefault();
    if (e.touches.length === 0) return;
    isColoring = true;
    const touch = e.touches[0];
    const rect = coloringCanvas.getBoundingClientRect();
    const scaleX = coloringCanvas.width / rect.width;
    const scaleY = coloringCanvas.height / rect.height;
    lastColorX = (touch.clientX - rect.left) * scaleX;
    lastColorY = (touch.clientY - rect.top) * scaleY;
  }

  function draw(e) {
    if (!isColoring || !coloringCtx) return;
    const rect = coloringCanvas.getBoundingClientRect();
    const scaleX = coloringCanvas.width / rect.width;
    const scaleY = coloringCanvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    drawSegment(lastColorX, lastColorY, x, y);
    lastColorX = x;
    lastColorY = y;
  }

  function drawTouch(e) {
    e.preventDefault();
    if (!isColoring || !coloringCtx || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = coloringCanvas.getBoundingClientRect();
    const scaleX = coloringCanvas.width / rect.width;
    const scaleY = coloringCanvas.height / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    drawSegment(lastColorX, lastColorY, x, y);
    lastColorX = x;
    lastColorY = y;
  }

  function drawSegment(x1, y1, x2, y2) {
    coloringCtx.beginPath();
    coloringCtx.moveTo(x1, y1);
    coloringCtx.lineTo(x2, y2);
    coloringCtx.strokeStyle = currentColor;
    coloringCtx.lineWidth = currentBrushSize;
    coloringCtx.lineCap = 'round';
    coloringCtx.lineJoin = 'round';
    coloringCtx.stroke();
    
    if (!hasDrawnSomething) {
      hasDrawnSomething = true;
      const xpBtn = document.getElementById('btn-coloring-xp');
      if (xpBtn) xpBtn.disabled = false;
    }
  }

  function stopDrawing() {
    isColoring = false;
  }

  function downloadDrawing() {
    if (!coloringCanvas) return;
    const imageSelect = document.getElementById('select-coloring-image');
    const key = imageSelect ? imageSelect.value : 'dibujo';
    
    // Crear un enlace temporal para descargar la imagen
    const link = document.createElement('a');
    link.download = `shabateinu_${key}_coloreado.png`;
    link.href = coloringCanvas.toDataURL('image/png');
    link.click();
    showToast('💾 ¡Dibujo guardado en tus descargas!');
  }

  function claimColoringXP() {
    const xpBtn = document.getElementById('btn-coloring-xp');
    if (xpBtn && !xpBtn.disabled) {
      awardXP(20, '¡Pintar parashá de la semana! 🎨');
      triggerCelebration('🎨 ¡Hermoso Dibujo!');
      xpBtn.disabled = true;
    }
  }

  // ==========================================================================
  // 13. INICIALIZACIÓN GLOBAL AL CARGAR LA PÁGINA
  // ==========================================================================
  // Estimador de Parashá local para inicio instantáneo de carga en 2026 (Offline / Snappy UX)
  function getLocalEstimatedParasha(date) {
    const time = date.getTime();
    
    // Fechas de Shabat de 2026 mapeadas en orden cronológico exacto
    const schedule = [
      { date: new Date('2026-02-07T23:59:59'), name: 'Yitro' },
      { date: new Date('2026-02-14T23:59:59'), name: 'Mishpatim' },
      { date: new Date('2026-02-21T23:59:59'), name: 'Terumah' },
      { date: new Date('2026-02-28T23:59:59'), name: 'Tetzaveh' },
      { date: new Date('2026-03-07T23:59:59'), name: 'Ki Tisa' },
      { date: new Date('2026-03-14T23:59:59'), name: 'Vayakhel' }, 
      { date: new Date('2026-03-21T23:59:59'), name: 'Vayikra' },
      { date: new Date('2026-03-28T23:59:59'), name: 'Tzav' },
      { date: new Date('2026-04-11T23:59:59'), name: 'Shemini' },
      { date: new Date('2026-04-18T23:59:59'), name: 'Tazria' }, 
      { date: new Date('2026-04-25T23:59:59'), name: 'Achrei Mot' }, 
      { date: new Date('2026-05-02T23:59:59'), name: 'Emor' }, 
      { date: new Date('2026-05-09T23:59:59'), name: 'Behar' }, 
      { date: new Date('2026-05-16T23:59:59'), name: 'Bamidbar' },
      { date: new Date('2026-05-23T23:59:59'), name: 'Nasso' },
      { date: new Date('2026-05-30T23:59:59'), name: 'Nasso' }, 
      { date: new Date('2026-06-06T23:59:59'), name: 'Beha\'alotcha' }, 
      { date: new Date('2026-06-13T23:59:59'), name: 'Sh\'lach' }, 
      { date: new Date('2026-06-20T23:59:59'), name: 'Korach' }, 
      { date: new Date('2026-06-27T23:59:59'), name: 'Chukat' }, 
      { date: new Date('2026-07-04T23:59:59'), name: 'Pinchas' }, 
      { date: new Date('2026-07-11T23:59:59'), name: 'Matot' }, 
      { date: new Date('2026-07-18T23:59:59'), name: 'Devarim' },
      { date: new Date('2026-07-25T23:59:59'), name: 'Vaetchanan' }, 
      { date: new Date('2026-08-01T23:59:59'), name: 'Eikev' }, 
      { date: new Date('2026-08-08T23:59:59'), name: 'Re\'eh' }, 
      { date: new Date('2026-08-15T23:59:59'), name: 'Shoftim' }, 
      { date: new Date('2026-08-22T23:59:59'), name: 'KiTeitzei' }, 
      { date: new Date('2026-08-29T23:59:59'), name: 'KiTavo' }, 
      { date: new Date('2026-09-05T23:59:59'), name: 'Nitzavim' }, 
      { date: new Date('2026-09-19T23:59:59'), name: 'Ha\'azinu' }, 
      { date: new Date('2026-10-10T23:59:59'), name: 'Bereshit' },
      { date: new Date('2026-10-17T23:59:59'), name: 'Noach' },
      { date: new Date('2026-10-24T23:59:59'), name: 'Lech-Lecha' },
      { date: new Date('2026-10-31T23:59:59'), name: 'Vayeira' }
    ];

    // Buscar coincidencia cronológica
    for (const item of schedule) {
      if (time <= item.date.getTime()) {
        return item.name;
      }
    }
    return 'Bereshit'; // Default
  }

  function init() {
    // 1. Estimar Parashá del próximo viernes e inicializar UI inmediatamente (Carga de Siguiente Shabat)
    const upcomingFriday = getFridayOfDate(new Date());
    state.selectedParasha = getLocalEstimatedParasha(upcomingFriday);
    state.shabbatData.parasha = state.selectedParasha;
    
    populateParashaSelector();
    if (parashaSelector) {
      parashaSelector.value = state.selectedParasha;
    }
    updateParashaUI();
    
    // 2. Cargar Asincrónicamente desde la API de Hebcal (Actualización fina)
    fetchShabbatData(state.currentDate);
    
    // 3. Inicializar motores gráficos de invitación
    initInvitationEngine();
    
    // Configurar por defecto la fecha del formulario al próximo viernes
    const dateInputInv = document.getElementById('inv-date');
    if (dateInputInv) {
      const nextFri = getFridayOfDate(new Date());
      const year = nextFri.getFullYear();
      const month = String(nextFri.getMonth() + 1).padStart(2, '0');
      const day = String(nextFri.getDate()).padStart(2, '0');
      dateInputInv.value = `${year}-${month}-${day}`;
    }

    // 4. Crear partículas flotantes decorativas en el fondo
    createFloatingParticles();

    // 5. Crear botón de menú móvil
    createMobileMenuToggle();

    // 6. Pre-calentar motor de voz de Gemini
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }

    // 7. Inicializar Shabat Quest (Gamificación)
    setupQuestUI();

    // 8. Inicializar Confetti Engine
    initConfetti();

    // 9. Inicializar Modo TV
    initTVMode();

    // 10. Inicializar Cuento, Flashcards y Cofre con datos de la Parashá actual
    initStorybook();
    initFlashcards();
    initCofre();
  }

  // Partículas flotantes decorativas para el fondo
  function createFloatingParticles() {
    const container = document.querySelector('.main-content');
    if (!container) return;
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;';
    document.body.appendChild(particleContainer);

    const symbols = ['✡', '🕯️', '⭐', '🌙', '📜'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('span');
      p.textContent = symbols[i % symbols.length];
      p.style.cssText = `
        position:absolute;
        font-size:${Math.random() * 14 + 10}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        opacity:${Math.random() * 0.15 + 0.05};
        animation:float ${Math.random() * 6 + 6}s ease-in-out ${Math.random() * 4}s infinite;
        pointer-events:none;
      `;
      particleContainer.appendChild(p);
    }
  }

  // Botón flotante de menú móvil
  // Botón flotante de menú móvil y overlay
  function createMobileMenuToggle() {
    const btn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!btn || !sidebar || !overlay) return;

    const closeMenu = () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
      btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    };

    btn.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      overlay.classList.toggle('visible', isOpen);
      btn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    overlay.addEventListener('click', closeMenu);

    // Cerrar menú al navegar
    document.querySelectorAll('.nav-item button').forEach(navBtn => {
      navBtn.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });
  }

  // --- D. ESTACIÓN MÚSICA K-POP INTERACTIVA (WEB AUDIO SEQUENCER) ---
  let musicListenersBound = false;

  function initializeMusicTab() {
    // Si la parashá seleccionada coincide con alguno de nuestros tracks, autoseleccionar ese
    const activeParasha = state.selectedParasha.toLowerCase();
    let matchedIdx = -1;
    for (let i = 0; i < KPOP_TRACKS.length; i++) {
      if (activeParasha.includes(KPOP_TRACKS[i].parasha.toLowerCase())) {
        matchedIdx = i;
        break;
      }
    }
    
    if (matchedIdx !== -1) {
      musicState.currentTrackIdx = matchedIdx;
    } else {
      // Default a track de shabbat (el último del array tracks)
      musicState.currentTrackIdx = musicState.tracks.length - 1;
    }
    
    musicState.step = 0;
    musicState.activeLineIdx = 0;
    
    updateMusicTrackUI();
    setupMusicControlsListeners();
  }

  function updateMusicTrackUI() {
    const track = musicState.tracks[musicState.currentTrackIdx];
    
    // Actualizar metadatos
    const trackTitle = document.getElementById('music-track-title');
    const trackSubtitle = document.getElementById('music-track-subtitle');
    const translationText = document.getElementById('lyrics-translation-text');
    
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackSubtitle) trackSubtitle.textContent = `Parashat ${track.parasha}`;
    if (translationText) translationText.textContent = track.translation;
    
    // Renderizar letras en el scroller
    const lyricsScroller = document.getElementById('lyrics-scroller');
    if (lyricsScroller) {
      lyricsScroller.innerHTML = track.lyrics.map((l, idx) => {
        const isChorus = l.type === 'chorus';
        const activeClass = idx === 0 ? 'active' : '';
        const chorusClass = isChorus ? 'chorus' : '';
        return `
          <div class="lyric-line ${activeClass} ${chorusClass}" data-index="${idx}">
            ${l.text.replace(/\n/g, '<br>')}
          </div>
        `;
      }).join('');
      musicState.activeLineIdx = 0;
      lyricsScroller.scrollTop = 0;
    }
    
    // Dibujar arte del álbum en el canvas circular
    drawMusicAlbumCanvas(track.parasha);
    
    // Actualizar lista de selección
    renderMusicTracksSelector();
  }

  function drawMusicAlbumCanvas(parashaName) {
    const canvas = document.getElementById('music-album-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Rellenar fondo azul oscuro
    ctx.fillStyle = '#050b14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar la ilustración de la parashá en color
    ctx.save();
    ctx.translate(50, 50);
    ctx.scale(0.7, 0.7); // Escalar al tamaño de 100x100
    drawParashaIllustration(ctx, parashaName, 0, 0, false);
    ctx.restore();
  }

  function renderMusicTracksSelector() {
    const listContainer = document.getElementById('musica-tracks-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = musicState.tracks.map((t, idx) => {
      const activeClass = idx === musicState.currentTrackIdx ? 'active' : '';
      return `
        <div class="track-select-card ${activeClass}" data-index="${idx}">
          <div class="track-thumb">
            <canvas id="music-thumb-canvas-${t.id}" width="44" height="44" style="display: block; width: 100%; height: 100%; border-radius: 50%;"></canvas>
          </div>
          <div class="track-info-mini">
            <span class="track-title-mini">${t.title.split(' (')[0]}</span>
            <span class="track-parasha-mini">Parashat ${t.parasha}</span>
          </div>
        </div>
      `;
    }).join('');
    
    // Asignar clics a las tarjetas
    const cards = listContainer.querySelectorAll('.track-select-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index);
        selectTrack(idx);
      });
    });
    
    // Dibujar miniaturas en cada canvas de miniatura
    musicState.tracks.forEach(t => {
      const thumbCanvas = document.getElementById(`music-thumb-canvas-${t.id}`);
      if (thumbCanvas) {
        const thumbCtx = thumbCanvas.getContext('2d');
        thumbCtx.clearRect(0, 0, 44, 44);
        thumbCtx.fillStyle = '#050b14';
        thumbCtx.fillRect(0, 0, 44, 44);
        thumbCtx.save();
        thumbCtx.translate(22, 22);
        thumbCtx.scale(0.3, 0.3); // escala miniatura
        drawParashaIllustration(thumbCtx, t.parasha, 0, 0, false);
        thumbCtx.restore();
      }
    });
  }

  function selectTrack(idx) {
    const playingBefore = musicState.isPlaying;
    if (musicState.isPlaying) {
      stopMusicSequencer();
    }
    musicState.currentTrackIdx = idx;
    musicState.step = 0;
    musicState.activeLineIdx = 0;
    updateMusicTrackUI();
    
    if (playingBefore) {
      setTimeout(() => {
        startMusicSequencer();
      }, 200);
    }
  }

  function setupMusicControlsListeners() {
    if (musicListenersBound) return;
    musicListenersBound = true;
    
    const playBtn = document.getElementById('btn-music-play');
    const prevBtn = document.getElementById('btn-music-prev');
    const nextBtn = document.getElementById('btn-music-next');
    const tempoInput = document.getElementById('input-music-tempo');
    const tempoText = document.getElementById('tempo-val-text');
    
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        if (musicState.isPlaying) {
          stopMusicSequencer();
        } else {
          startMusicSequencer();
        }
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let prevIdx = musicState.currentTrackIdx - 1;
        if (prevIdx < 0) prevIdx = musicState.tracks.length - 1;
        selectTrack(prevIdx);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let nextIdx = (musicState.currentTrackIdx + 1) % musicState.tracks.length;
        selectTrack(nextIdx);
      });
    }
    
    if (tempoInput && tempoText) {
      tempoInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        musicState.bpm = val;
        let speedText = "Normal (125 BPM)";
        if (val < 110) speedText = `Chill Pop (${val} BPM)`;
        else if (val > 140) speedText = `Súper K-Pop Baile 🔥 (${val} BPM)`;
        else speedText = `Pegajoso (${val} BPM)`;
        tempoText.textContent = speedText;
      });
    }

    const vocalCheck = document.getElementById('check-vocal-guide');
    if (vocalCheck) {
      vocalCheck.addEventListener('change', (e) => {
        musicState.vocalGuide = e.target.checked;
        if (!e.target.checked && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      });
    }
  }

  function startMusicSequencer() {
    try {
      if (!musicState.audioCtx) {
        musicState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      if (musicState.audioCtx.state === 'suspended') {
        musicState.audioCtx.resume();
      }
      
      musicState.isPlaying = true;
      musicState.step = 0;
      musicState.activeLineIdx = 0;
      
      // Actualizar UI del botón
      const playBtn = document.getElementById('btn-music-play');
      if (playBtn) {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        playBtn.classList.remove('btn-gold');
        playBtn.style.background = '#ef4444'; // Rojo vibrante para pausar
        playBtn.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.4)';
      }
      
      // Activar rotación del disco
      const disc = document.getElementById('music-vinyl-disc');
      if (disc) disc.classList.add('playing');
      
      // Activar visualizador
      const bars = document.querySelectorAll('.visualizer-container .v-bar');
      bars.forEach(b => b.classList.add('active'));
      
      // Iniciar el programador de notas
      let nextTickTime = musicState.audioCtx.currentTime;
      const lookahead = 0.1; // 100ms
      
      musicState.sequencerTimer = setInterval(() => {
        if (!musicState.audioCtx || !musicState.isPlaying) return;
        const secondsPerTick = 60.0 / musicState.bpm / 4.0;
        
        while (nextTickTime < musicState.audioCtx.currentTime + lookahead) {
          playTick(nextTickTime, musicState.step, musicState.bpm);
          nextTickTime += secondsPerTick;
          musicState.step++;
          
          const track = musicState.tracks[musicState.currentTrackIdx];
          const lineIdx = Math.floor(musicState.step / 64) % track.lyrics.length;
          if (lineIdx !== musicState.activeLineIdx) {
            musicState.activeLineIdx = lineIdx;
            highlightActiveLyric(lineIdx);
          }
        }
      }, 25);
      
      showToast('🔊 ¡Reproduciendo Estación K-POP Shabateinu!');
      incrementStat('songsPlayed');
      awardXP(5, '¡Canción K-POP reproducida!');
    } catch (e) {
      console.error(e);
      showToast('❌ Error iniciando el motor de audio.');
    }
  }

  function stopMusicSequencer() {
    musicState.isPlaying = false;
    
    if (musicState.sequencerTimer) {
      clearInterval(musicState.sequencerTimer);
      musicState.sequencerTimer = null;
    }
    
    // Pausar audio context si existe
    if (musicState.audioCtx && musicState.audioCtx.state === 'running') {
      musicState.audioCtx.suspend();
    }
    
    // Actualizar UI del botón
    const playBtn = document.getElementById('btn-music-play');
    if (playBtn) {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      playBtn.style.background = ''; // Restablecer
      playBtn.style.boxShadow = '';
      playBtn.classList.add('btn-gold');
    }
    
    // Detener rotación del disco
    const disc = document.getElementById('music-vinyl-disc');
    if (disc) disc.classList.remove('playing');
    
    // Detener visualizador
    const bars = document.querySelectorAll('.visualizer-container .v-bar');
    bars.forEach(b => b.classList.remove('active'));
    
    // Detener voz si existe
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    showToast('⏸️ Música pausada');
  }

  function highlightActiveLyric(lineIdx) {
    const scroller = document.getElementById('lyrics-scroller');
    if (!scroller) return;
    
    const lines = scroller.querySelectorAll('.lyric-line');
    let lineText = '';
    lines.forEach(l => {
      if (parseInt(l.dataset.index) === lineIdx) {
        l.classList.add('active');
        lineText = l.textContent;
        // Desplazar suavemente para centrar la línea activa
        const scrollerHeight = scroller.clientHeight;
        const lineTop = l.offsetTop;
        const lineHeight = l.clientHeight;
        scroller.scrollTo({
          top: lineTop - (scrollerHeight / 2) + (lineHeight / 2),
          behavior: 'smooth'
        });
      } else {
        l.classList.remove('active');
      }
    });

    // Vocalizar la letra si la guía vocal está activa
    if (musicState.isPlaying && musicState.vocalGuide && lineText) {
      speakLyricLine(lineText);
    }
  }

  function speakLyricLine(text) {
    if (!window.speechSynthesis) return;
    
    // Cancelar cualquier discurso previo para evitar colisiones
    window.speechSynthesis.cancel();
    
    // Limpiar emojis, corchetes y etiquetas para mejor pronunciación
    let cleanText = text.replace(/⭐|🌟|☀️|✨|🕯️|💖|☔|🌧️|🦁|🦒|🌈|🕊️|⚡|🌊|🔥|✊|🥁|🪘|💃|🏔️|📜|👑|🖖|🔔|🕺|/g, '')
                        .replace(/\[INTRO\]|\[CORO EN HEBREO\]|\[OUTRO\]|\[CORO DE SHABAT\]/g, '')
                        .trim();
                        
    if (!cleanText) return;
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Forzar voz en español neutro (Latinoamericano)
    const voices = window.speechSynthesis.getVoices();
    let spanishVoice = getNeutralSpanishVoice(voices);
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }
    
    // Modular tono para hacerlo tierno/infantil
    utterance.pitch = 1.35; 
    utterance.rate = (musicState.bpm / 125) * 1.05; // La velocidad se sincroniza con el ritmo K-POP
    utterance.volume = 0.95;
    
    window.speechSynthesis.speak(utterance);
  }

  function playTick(time, step, tempo) {
    if (!musicState.audioCtx) return;
    const ctx = musicState.audioCtx;
    
    const barStep = step % 16;
    const barIndex = Math.floor(step / 16) % 4; // 0, 1, 2, 3
    
    // --- Chord Roots based on classic Pop Progression: C - Am - F - G ---
    let rootFreq = 130.81; // C
    let chordNotes = [130.81, 164.81, 196.00]; // C major
    if (barIndex === 1) {
      rootFreq = 110.00; // A
      chordNotes = [110.00, 130.81, 164.81]; // A minor
    } else if (barIndex === 2) {
      rootFreq = 87.31; // F
      chordNotes = [87.31, 110.00, 130.81]; // F major
    } else if (barIndex === 3) {
      rootFreq = 98.00; // G
      chordNotes = [98.00, 123.47, 146.83]; // G major
    }

    // 1. DRUMS SEQUENCER (Kick, Snare, Hi-hat)
    if (barStep % 4 === 0) {
      triggerSynthKick(ctx, time);
    }
    
    if (barStep === 4 || barStep === 12) {
      triggerSynthSnare(ctx, time);
    }
    
    if (barStep % 4 === 2) {
      triggerSynthHihat(ctx, time);
    }

    // 2. RETRO DANCE BASS SEQUENCER (Octave jumps on 8th notes)
    if (barStep % 2 === 0) {
      const isHighOctave = (barStep % 4 === 2 || barStep % 4 === 0);
      const freq = isHighOctave ? rootFreq * 2 : rootFreq;
      triggerBassSynth(ctx, freq, time);
    }

    // 3. HAPPY CHIPTUNE LEAD SYNTH (Happy K-POP Arpeggio)
    const melStep = barStep % 4;
    const note = chordNotes[melStep % chordNotes.length] * 4; // shift up 2 octaves
    if (barStep % 2 === 1) { // Syncopation
      triggerLeadSynth(ctx, note, time);
    }
  }

  function triggerSynthKick(ctx, time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.1);

    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.12);

    osc.start(time);
    osc.stop(time + 0.12);
  }

  function triggerSynthSnare(ctx, time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(280, time);
    osc.frequency.exponentialRampToValueAtTime(100, time + 0.15);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  function triggerSynthHihat(ctx, time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(8000, time);

    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);
  }

  function triggerBassSynth(ctx, freq, time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  function triggerLeadSynth(ctx, freq, time) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);

    osc.start(time);
    osc.stop(time + 0.08);
  }

  // ==========================================================================
  // 14. LÓGICA DE NUEVOS MÓDULOS (MITZVOT, COFRE, TZEDAKÁ, MEMORIA, COCINA)
  // ==========================================================================

  // --- MÓDULO 1: EL ÁRBOL DE LAS MITZVOT ---
  let mitzvotListenersBound = false;

  function getMitzvotRecords() {
    try {
      return JSON.parse(localStorage.getItem('shabat_mitzvot') || '[]');
    } catch { return []; }
  }

  function saveMitzvah(category, desc) {
    const records = getMitzvotRecords();
    records.push({
      category: category,
      desc: desc,
      timestamp: Date.now()
    });
    localStorage.setItem('shabat_mitzvot', JSON.stringify(records));
    
    // XP and UI feedback
    awardXP(25, '¡Hiciste una mitzvá! 🌳');
    unlockStamp('mitzvot');
    triggerCelebration('🌳 ¡Mitzvá registrada!');
    renderMitzvotHistory();
    drawMitzvotTree();
  }

  function renderMitzvotHistory() {
    const container = document.getElementById('mitzvot-history-list');
    if (!container) return;
    const records = getMitzvotRecords();
    
    if (records.length === 0) {
      container.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem; text-align: center; padding: 1rem;">No hay mitzvot registradas aún. ¡Añade tu primera buena acción!</p>';
      return;
    }
    
    const catEmojis = {
      familia: '🏠',
      comunidad: '🤝',
      naturaleza: '🌿',
      general: '✨'
    };
    
    container.innerHTML = records.slice().reverse().map(r => {
      const emoji = catEmojis[r.category] || '✨';
      return `<div class="attendance-history-item">
        <span class="att-date">${emoji} ${r.category.toUpperCase()}</span>
        <span class="att-notes" style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${r.desc}">${r.desc}</span>
      </div>`;
    }).join('');
  }

  function drawMitzvotTree() {
    const canvas = document.getElementById('mitzvot-tree-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const records = getMitzvotRecords();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background glow
    const grad = ctx.createRadialGradient(250, 420, 50, 250, 420, 300);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.1)');
    grad.addColorStop(1, 'rgba(5, 11, 20, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grass
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.ellipse(250, 415, 200, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Soil
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(250, 418, 120, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    const catColors = {
      familia: '#10b981', // Verde
      comunidad: '#38bdf8', // Celeste
      naturaleza: '#ec4899', // Rosa
      general: '#fbbf24' // Dorado
    };

    let leafCount = 0;
    const maxLeaves = records.length;
    
    function drawBranch(x1, y1, angle, depth) {
      if (depth > 5) return;
      
      const len = 75 - depth * 11;
      const x2 = x1 + Math.cos(angle) * len;
      const y2 = y1 + Math.sin(angle) * len;
      
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 12 - depth * 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      if (depth < 3) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = (12 - depth * 2.2) / 3;
        ctx.beginPath();
        ctx.moveTo(x1 + 2, y1);
        ctx.lineTo(x2 + 2, y2);
        ctx.stroke();
      }

      if (depth >= 3) {
        const numNodeLeaves = depth === 5 ? 4 : 2;
        for (let l = 0; l < numNodeLeaves; l++) {
          let color = '#047857';
          let isMitzvahLeaf = false;
          
          if (leafCount < maxLeaves) {
            const m = records[leafCount];
            color = catColors[m.category] || '#10b981';
            leafCount++;
            isMitzvahLeaf = true;
          }
          
          if (isMitzvahLeaf || maxLeaves === 0) {
            ctx.save();
            ctx.translate(x2, y2);
            const leafAngle = angle + (l - (numNodeLeaves-1)/2) * 0.6 + (isMitzvahLeaf ? Math.sin(leafCount) * 0.2 : 0);
            ctx.rotate(leafAngle);
            
            ctx.fillStyle = color;
            ctx.strokeStyle = '#050b14';
            ctx.lineWidth = 1.5;
            
            ctx.beginPath();
            ctx.ellipse(12, 0, isMitzvahLeaf ? 14 : 9, isMitzvahLeaf ? 8 : 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            if (isMitzvahLeaf) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
              ctx.beginPath();
              ctx.arc(6, -2, 2, 0, Math.PI * 2);
              ctx.fill();
            }
            
            ctx.restore();
          }
        }
      }
      
      const angleOffset = 0.35 + Math.sin(depth + maxLeaves) * 0.05;
      drawBranch(x2, y2, angle - angleOffset, depth + 1);
      drawBranch(x2, y2, angle + angleOffset, depth + 1);
    }
    
    drawBranch(250, 410, -Math.PI / 2, 0);
  }
  
  function initMitzvot() {
    renderMitzvotHistory();
    drawMitzvotTree();
    
    if (mitzvotListenersBound) return;
    mitzvotListenersBound = true;
    
    const saveMitzvahBtn = document.getElementById('btn-save-mitzvah');
    if (saveMitzvahBtn) {
      saveMitzvahBtn.addEventListener('click', () => {
        const catSelect = document.getElementById('mitzvah-category');
        const descTextarea = document.getElementById('mitzvah-desc');
        if (!catSelect || !descTextarea) return;
        
        const category = catSelect.value;
        const desc = descTextarea.value.trim();
        
        if (!desc) {
          showToast('⚠️ Escribe la descripción de tu mitzvá');
          return;
        }
        
        saveMitzvah(category, desc);
        descTextarea.value = '';
      });
    }
  }


  // --- MÓDULO 2: EL COFRE DE PREGUNTAS DE SHABAT ---
  const GENERAL_COFRE_QUESTIONS = [
    "¿Qué es lo que más te gustó o agradeces de esta semana que termina?",
    "Si pudieras regalarle una mitzvá (buena acción) a alguien en la mesa, ¿cuál sería?",
    "¿Cuál es tu comida de Shabat favorita y por qué nos hace sentir tan felices?",
    "¿Cómo podemos traer más paz (Shalom) a nuestra casa esta semana?",
    "Si pudieras invitar a un personaje de la Torá a cenar con nosotros hoy, ¿a quién elegirías?",
    "¿Qué buena acción (mitzvá) hiciste esta semana que te hizo sentir orgulloso?",
    "¿Qué significa el Shabat para ti en una sola palabra?"
  ];

  const PARASHA_COFRE_QUESTIONS = {
    "Bereshit": [
      "Si pudieras crear un animal completamente nuevo, ¿cómo sería y qué nombre le pondrías?",
      "Dios creó el mundo en seis días y descansó el séptimo. ¿Por qué crees que descansar es tan importante?",
      "¿Qué parte de la naturaleza (animales, plantas, estrellas) te maravilla más y agradeces hoy?"
    ],
    "Noach": [
      "Si tuvieras que cuidar a todos los animales en el Arca como hizo Noaj, ¿cuál sería el más difícil de cuidar?",
      "El arcoíris es una promesa de paz de Dios. ¿Qué promesa de bondad te gustaría hacer tú hoy?",
      "Noaj trabajó duro construyendo el Arca aunque otros no le creían. ¿Cuándo has hecho algo correcto aunque fuera difícil?"
    ],
    "Shemot": [
      "Moisés fue salvado en una canasta en el río. ¿Quién te cuida y te hace sentir a salvo en tu hogar?",
      "La zarza ardía pero no se quemaba. Si pudieras tener un 'superpoder' para ayudar a los demás, ¿cuál elegirías?",
      "Moisés defendió a su pueblo. ¿Cómo podemos defender a un amigo o compañero cuando lo necesita?"
    ],
    "Beshalach": [
      "El pueblo cruzó el mar y Miriam cantó con alegría. ¿Qué canción te pone tan feliz que te da ganas de bailar?",
      "En el desierto, Dios envió el maná (pan del cielo). ¿Qué alimento consideras un regalo especial en tu mesa?",
      "Cruzar el Mar Rojo requirió mucha valentía. ¿Cuándo te has sentido valiente esta semana?"
    ],
    "Yitro": [
      "Recibimos los Diez Mandamientos en el Sinaí. ¿Cuál regla de convivencia crees que es la más importante en casa?",
      "Honrar a papá y mamá es un mandamiento clave. ¿Cómo puedes demostrarles tu amor y respeto hoy?",
      "El Monte Sinaí era pequeño y humilde. ¿Por qué crees que ser humilde y saber escuchar es valioso?"
    ],
    "Nasso": [
      "La bendición sacerdotal desea paz (Shalom). ¿A quién te gustaría darle una bendición de paz hoy?",
      "Los líderes trajeron ofrendas iguales para el Mishkán. ¿Cómo podemos colaborar todos juntos en la comunidad?",
      "Nasso significa 'elevar'. ¿Cómo podemos elevar el ánimo de alguien que está triste o cansado?"
    ]
  };

  let cofreListenersBound = false;
  let activeCofreIndex = 0;
  let activeCofreQuestions = [];

  function initCofre() {
    const pName = state.selectedParasha;
    const pQuestions = PARASHA_COFRE_QUESTIONS[pName] || [];
    
    activeCofreQuestions = [...pQuestions, ...GENERAL_COFRE_QUESTIONS];
    activeCofreIndex = 0;
    
    const badge = document.getElementById('cofre-badge');
    if (badge) {
      badge.textContent = pQuestions.length > 0 ? `Parashá ${pName}` : 'Pregunta de Shabat';
    }

    renderCofreQuestion();
    setupCofreListeners();
  }

  function renderCofreQuestion() {
    const textEl = document.getElementById('cofre-question-text');
    const categoryEl = document.getElementById('cofre-card-category');
    const card = document.getElementById('cofre-card');

    if (!textEl) return;
    if (card) card.classList.remove('flipped');

    const q = activeCofreQuestions[activeCofreIndex];
    textEl.textContent = q || '¿Qué te gustaría agradecer hoy?';
    
    if (categoryEl) {
      const pName = state.selectedParasha;
      const isParashaQ = activeCofreIndex < (PARASHA_COFRE_QUESTIONS[pName] || []).length;
      categoryEl.textContent = isParashaQ ? `Pregunta de Parashá` : `Conversación en Familia`;
      categoryEl.style.color = isParashaQ ? 'var(--nbi-cyan)' : 'var(--nbi-gold)';
    }
  }

  function setupCofreListeners() {
    const card = document.getElementById('cofre-card');
    if (card && !cofreListenersBound) {
      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
          awardXP(5, '¡Abriste el Cofre de Shabat! 📦');
        }
      });
    }

    if (cofreListenersBound) return;
    cofreListenersBound = true;

    const prevBtn = document.getElementById('btn-cofre-prev');
    const nextBtn = document.getElementById('btn-cofre-next');
    const shuffleBtn = document.getElementById('btn-cofre-shuffle');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeCofreQuestions.length === 0) return;
        activeCofreIndex = (activeCofreIndex - 1 + activeCofreQuestions.length) % activeCofreQuestions.length;
        renderCofreQuestion();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeCofreQuestions.length === 0) return;
        activeCofreIndex = (activeCofreIndex + 1) % activeCofreQuestions.length;
        renderCofreQuestion();
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeCofreQuestions.length <= 1) return;
        for (let i = activeCofreQuestions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [activeCofreQuestions[i], activeCofreQuestions[j]] = [activeCofreQuestions[j], activeCofreQuestions[i]];
        }
        activeCofreIndex = 0;
        renderCofreQuestion();
        showToast('🔀 Preguntas del cofre mezcladas');
      });
    }
  }


  // --- MÓDULO 3: EL TZEDAKÓMETRO INTERACTIVO ---
  let tzedakaListenersBound = false;
  let tzedakaTotal = 0;
  const tzedakaGoal = 150;
  let tzedakaCoins = [];
  let tzedakaAnimationId = null;
  let tzedakaXPClamped = 0;

  function playCoinClink() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(3000, now + 0.04);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(800, now);
      osc2.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      gain2.gain.setValueAtTime(0.1, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      
      osc1.start(now);
      osc1.stop(now + 0.2);
      osc2.start(now);
      osc2.stop(now + 0.1);
    } catch (e) {
      console.warn(e);
    }
  }

  class TzedakaCoin {
    constructor(value) {
      this.value = value;
      this.radius = value === 1 ? 16 : (value === 2 ? 18 : (value === 5 ? 20 : 23));
      this.color = value === 10 ? '#d97706' : '#eab308';
      this.innerColor = value === 10 ? '#cbd5e1' : '#fef08a';
      this.x = 145 + Math.random() * 30;
      this.y = 10;
      this.vy = 2;
      this.vx = (Math.random() - 0.5) * 3;
      this.rotation = Math.random() * Math.PI * 2;
      this.vRotation = (Math.random() - 0.5) * 0.1;
      this.isResting = false;
    }
    
    update(canvasHeight, existingCoins) {
      if (this.isResting) return;
      
      this.vy += 0.45;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.vRotation;
      
      const margin = 20;
      if (this.x - this.radius < margin) {
        this.x = margin + this.radius;
        this.vx = -this.vx * 0.5;
      }
      if (this.x + this.radius > 320 - margin) {
        this.x = 320 - margin - this.radius;
        this.vx = -this.vx * 0.5;
      }
      
      const floorY = 320 - this.radius;
      if (this.y >= floorY) {
        this.y = floorY;
        this.vy = -this.vy * 0.35;
        this.vx *= 0.6;
        
        if (Math.abs(this.vy) < 1.5) {
          this.vy = 0;
          this.vx = 0;
          this.isResting = true;
        }
      }
      
      existingCoins.forEach(other => {
        if (other === this || !other.isResting) return;
        
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const minDist = this.radius + other.radius;
        
        if (dist < minDist) {
          const angle = Math.atan2(dy, dx);
          this.x = other.x + Math.cos(angle) * minDist;
          this.y = other.y + Math.sin(angle) * minDist;
          
          this.vy = -this.vy * 0.25;
          this.vx = (this.vx + Math.cos(angle) * 2) * 0.4;
          
          if (Math.abs(this.vy) < 1.0) {
            this.vy = 0;
            this.vx = 0;
            this.isResting = true;
          }
        }
      });
    }
    
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetY = 3;
      
      ctx.fillStyle = this.color;
      ctx.strokeStyle = '#3e2723';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = this.innerColor;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * (this.value === 10 ? 0.65 : 0.8), 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#1e293b';
      ctx.font = `bold ${this.value === 10 ? 10 : 12}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${this.value}₪`, 0, 0);
      
      ctx.restore();
    }
  }

  function drawTzedakaBox() {
    const canvas = document.getElementById('tzedaka-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    tzedakaCoins.forEach(coin => {
      coin.update(H, tzedakaCoins);
      coin.draw(ctx);
    });
    
    ctx.save();
    
    const glassGrad = ctx.createLinearGradient(15, 60, 305, 330);
    glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    glassGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
    glassGrad.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
    ctx.fillStyle = glassGrad;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(15, 60, 290, 270, 15);
    ctx.fill();
    ctx.stroke();
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(35, 75); ctx.lineTo(150, 75);
    ctx.moveTo(35, 75); ctx.lineTo(35, 180);
    ctx.stroke();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.beginPath();
    ctx.roundRect(W/2 - 45, 140, 90, 45, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.stroke();
    
    ctx.fillStyle = 'var(--nbi-gold)';
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('צadaka', W/2, 168);
    
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(W/2 - 40, 52, 80, 10, 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.stroke();
    
    ctx.restore();
  }

  function loopTzedaka() {
    drawTzedakaBox();
    tzedakaAnimationId = requestAnimationFrame(loopTzedaka);
  }

  function addTzedakaCoin(val) {
    playCoinClink();

    const coin = new TzedakaCoin(val);
    tzedakaCoins.push(coin);
    tzedakaTotal += val;

    persistTzedakaAdd(val);
    updateTzedakaUI();
    
    if (tzedakaXPClamped < 30) {
      tzedakaXPClamped += 5;
      awardXP(5, 'Depositó Tzedaká 🪙');
    }
    
    if (tzedakaTotal >= tzedakaGoal) {
      triggerCelebration('🪙 ¡Meta de Tzedaká Alcanzada!');
    }
  }

  // Tzedaká comunitaria: el total se guarda en la base de datos de Netlify y
  // es el mismo para todos. localStorage actúa como respaldo sin conexión.
  async function loadTzedakaTotal() {
    try {
      const res = await fetch('/api/tzedaka');
      if (!res.ok) throw new Error('respuesta no válida');
      const data = await res.json();
      const total = Number(data.total) || 0;
      localStorage.setItem('shabat_tzedaka_total', total);
      return total;
    } catch {
      return parseInt(localStorage.getItem('shabat_tzedaka_total') || '0');
    }
  }

  // Registra un depósito en el servidor y reconcilia el total compartido.
  function persistTzedakaAdd(val) {
    localStorage.setItem('shabat_tzedaka_total', tzedakaTotal);
    fetch('/api/tzedaka', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: val })
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && typeof data.total === 'number') {
          tzedakaTotal = data.total;
          localStorage.setItem('shabat_tzedaka_total', tzedakaTotal);
          updateTzedakaUI();
        }
      })
      .catch(() => {});
  }

  // Vacía la caja de tzedaká, tanto local como en el servidor.
  function resetTzedaka() {
    tzedakaTotal = 0;
    tzedakaCoins = [];
    localStorage.setItem('shabat_tzedaka_total', '0');
    updateTzedakaUI();
    fetch('/api/tzedaka', { method: 'DELETE' }).catch(() => {});
  }

  function updateTzedakaUI() {
    const totalEl = document.getElementById('tzedaka-total');
    const barFill = document.getElementById('tzedaka-progress-bar');
    if (totalEl) totalEl.textContent = tzedakaTotal;
    if (barFill) {
      const pct = Math.min(100, (tzedakaTotal / tzedakaGoal) * 100);
      barFill.style.width = `${pct}%`;
    }
  }

  async function initTzedaka() {
    tzedakaTotal = await loadTzedakaTotal();
    tzedakaXPClamped = 0;
    updateTzedakaUI();
    
    if (tzedakaAnimationId) {
      cancelAnimationFrame(tzedakaAnimationId);
    }
    
    tzedakaCoins = [];
    let tempTotal = tzedakaTotal;
    while (tempTotal > 0) {
      let val = 1;
      if (tempTotal >= 10) val = 10;
      else if (tempTotal >= 5) val = 5;
      else if (tempTotal >= 2) val = 2;
      
      const c = new TzedakaCoin(val);
      c.x = 30 + Math.random() * 260;
      c.y = 310 - Math.random() * 25;
      c.isResting = true;
      c.rotation = Math.random() * Math.PI * 2;
      tzedakaCoins.push(c);
      tempTotal -= val;
    }
    
    loopTzedaka();
    
    if (tzedakaListenersBound) return;
    tzedakaListenersBound = true;
    
    const coinButtons = [
      { id: 'coin-val-1', val: 1 },
      { id: 'coin-val-2', val: 2 },
      { id: 'coin-val-5', val: 5 },
      { id: 'coin-val-10', val: 10 }
    ];
    
    coinButtons.forEach(b => {
      const btn = document.getElementById(b.id);
      if (btn) {
        btn.addEventListener('click', () => addTzedakaCoin(b.val));
      }
    });
    
    const resetBtn = document.getElementById('btn-reset-tzedaka');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        resetTzedaka();
        showToast('🪙 Caja de Tzedaká reiniciada');
      });
    }

    const realBtn = document.getElementById('btn-real-tzedaka');
    if (realBtn) {
      realBtn.addEventListener('click', () => {
        if (tzedakaTotal >= tzedakaGoal) {
          awardXP(30, '¡Meta de Tzedaká Cumplida! 🌟');
          triggerCelebration('💖 ¡Mitzvá de Tzedaká hecha!');
          showToast('🎁 ¡Gracias por dar Tzedaká!');
          resetTzedaka();
        } else {
          showToast(`⚠️ Aún falta para la meta. Meta: ${tzedakaGoal}₪`);
        }
      });
    }
  }


  // --- MÓDULO 4: JUEGO DE MEMORIA DE SÍMBOLOS JUDÍOS ---
  const MEMORY_SYMBOLS = [
    { emoji: '🕯️', name: 'Velas de Shabat', desc: 'Las encendemos el viernes por la tarde para recibir el Shabat, trayendo paz, luz y armonía a nuestro hogar.' },
    { emoji: '🥖', name: 'Jalá', desc: 'El pan trenzado dulce especial que bendecimos y compartimos en la cena familiar de Shabat. Representa la unión.' },
    { emoji: '🍷', name: 'Copa de Kidush', desc: 'La copa especial con la que bendecimos el jugo de uva o vino, agradeciendo a Dios por el día de descanso.' },
    { emoji: '📜', name: 'Torá', desc: 'El rollo sagrado que contiene las enseñanzas, historias y mandamientos para vivir de forma buena y honesta.' },
    { emoji: '⭐', name: 'Estrella de David', desc: 'El Maguén David, un antiguo símbolo del pueblo judío que representa la protección divina y la identidad de nuestra comunidad.' },
    { emoji: '🚪', name: 'Mezuzá', desc: 'La cajita colocada en los marcos de las puertas de casa que guarda un texto sagrado de la Torá para proteger el hogar.' }
  ];

  let memoryListenersBound = false;
  let memoryFirstCard = null;
  let memorySecondCard = null;
  let memoryIsLock = false;
  let memoryPairsFound = 0;
  let memoryTries = 0;
  let memoryVoiceEnabled = true;

  function initMemory() {
    memoryPairsFound = 0;
    memoryTries = 0;
    memoryFirstCard = null;
    memorySecondCard = null;
    memoryIsLock = false;
    
    updateMemoryUI();
    
    const emptyBox = document.getElementById('mem-learning-empty');
    const contentBox = document.getElementById('mem-learning-content');
    if (emptyBox) emptyBox.style.display = 'block';
    if (contentBox) contentBox.style.display = 'none';
    
    const doubledSymbols = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS];
    for (let i = doubledSymbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubledSymbols[i], doubledSymbols[j]] = [doubledSymbols[j], doubledSymbols[i]];
    }
    
    const grid = document.getElementById('memory-grid');
    if (!grid) return;
    grid.innerHTML = doubledSymbols.map((sym, idx) => {
      const symbolIdx = MEMORY_SYMBOLS.findIndex(s => s.name === sym.name);
      return `<div class="memory-card" data-index="${idx}" data-symbol-index="${symbolIdx}">
        <div class="memory-card-inner">
          <div class="memory-card-face memory-card-front">❓</div>
          <div class="memory-card-face memory-card-back">${sym.emoji}</div>
        </div>
      </div>`;
    }).join('');
    
    const cards = grid.querySelectorAll('.memory-card');
    cards.forEach(card => {
      card.addEventListener('click', () => flipMemoryCard(card));
    });
    
    setupMemoryControls();
  }

  function flipMemoryCard(card) {
    if (memoryIsLock) return;
    if (card === memoryFirstCard) return;
    if (card.classList.contains('matched')) return;
    
    card.querySelector('.memory-card-inner').style.transform = 'rotateY(180deg)';
    
    if (!memoryFirstCard) {
      memoryFirstCard = card;
      return;
    }
    
    memorySecondCard = card;
    memoryTries++;
    updateMemoryUI();
    
    checkMemoryMatch();
  }

  function checkMemoryMatch() {
    const idx1 = parseInt(memoryFirstCard.dataset.symbolIndex);
    const idx2 = parseInt(memorySecondCard.dataset.symbolIndex);
    
    if (idx1 === idx2) {
      memoryFirstCard.classList.add('matched');
      memorySecondCard.classList.add('matched');
      memoryPairsFound++;
      updateMemoryUI();
      
      const symbol = MEMORY_SYMBOLS[idx1];
      showMemoryLearningSymbol(symbol);
      
      memoryFirstCard = null;
      memorySecondCard = null;
      
      if (memoryPairsFound === 6) {
        awardXP(50, '¡Juego de Memoria Completado! 🧠');
        triggerCelebration('🧠 ¡Felicidades! Ganaste');
        showToast('🧠 ¡Completaste el Juego de Memoria!');
      } else {
        awardXP(10, '¡Pareja encontrada!');
      }
    } else {
      memoryIsLock = true;
      setTimeout(() => {
        if (memoryFirstCard) memoryFirstCard.querySelector('.memory-card-inner').style.transform = '';
        if (memorySecondCard) memorySecondCard.querySelector('.memory-card-inner').style.transform = '';
        
        memoryFirstCard = null;
        memorySecondCard = null;
        memoryIsLock = false;
      }, 1000);
    }
  }

  function showMemoryLearningSymbol(sym) {
    const emptyBox = document.getElementById('mem-learning-empty');
    const contentBox = document.getElementById('mem-learning-content');
    const emojiEl = document.getElementById('mem-symbol-emoji');
    const titleEl = document.getElementById('mem-symbol-title');
    const descEl = document.getElementById('mem-symbol-desc');
    
    if (emptyBox) emptyBox.style.display = 'none';
    if (contentBox) {
      contentBox.style.display = 'block';
      if (emojiEl) emojiEl.textContent = sym.emoji;
      if (titleEl) titleEl.textContent = sym.name;
      if (descEl) descEl.textContent = sym.desc;
    }
    
    if (memoryVoiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${sym.name}. ${sym.desc}`);
      const voices = window.speechSynthesis.getVoices();
      const esVoice = getNeutralSpanishVoice(voices);
      if (esVoice) utterance.voice = esVoice;
      utterance.pitch = 1.3;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }

  function updateMemoryUI() {
    const pairsEl = document.getElementById('mem-pairs-found');
    const triesEl = document.getElementById('mem-tries');
    if (pairsEl) pairsEl.textContent = `${memoryPairsFound} / 6`;
    if (triesEl) triesEl.textContent = memoryTries;
  }

  function setupMemoryControls() {
    if (memoryListenersBound) return;
    memoryListenersBound = true;
    
    const resetBtn = document.getElementById('btn-reset-memory');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        initMemory();
        showToast('🧠 Juego de memoria reiniciado');
      });
    }
    
    const voiceBtn = document.getElementById('btn-mem-voice-toggle');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        memoryVoiceEnabled = !memoryVoiceEnabled;
        const icon = document.getElementById('mem-voice-icon');
        if (icon) {
          icon.className = memoryVoiceEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
        }
        showToast(memoryVoiceEnabled ? '🔊 Voz activada' : '🔇 Voz silenciada');
        if (!memoryVoiceEnabled && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      });
    }
  }


  // --- MÓDULO 5: LA COCINA DE SHABAT ---
  let cocinaListenersBound = false;
  let currentBraidStep = 0;
  const maxBraidSteps = 6;
  let challahBaked = false;

  const RECIPES_DATA = {
    challah: {
      title: "Jalá Tradicional de Shabat",
      body: `<h4>Ingredientes para Niños:</h4>
      <ul>
        <li>🍞 500g de harina de trigo</li>
        <li>🥄 1 sobre de levadura seca (7g)</li>
        <li>🍯 3 cucharadas de miel dulce</li>
        <li>🥚 2 huevos enteros + 1 yema para pintar</li>
        <li>🥛 1 taza de agua tibia</li>
        <li>🌻 4 cucharadas de aceite</li>
        <li>🧂 1 cucharadita de sal</li>
        <li>🌾 Semillas de sésamo o amapola</li>
      </ul>
      <h4>Preparación en Familia:</h4>
      <ol>
        <li><strong>Activar la levadura:</strong> En un vaso con agua tibia, añade la miel y la levadura. Revuelve con una cuchara y espera 5 minutos hasta que salgan burbujas.</li>
        <li><strong>Mezclar:</strong> En un bol grande, pon la harina y haz un hueco al medio. Añade los huevos, el aceite, la sal y la mezcla de levadura. ¡A mezclar con las manos limpias!</li>
        <li><strong>Amasar:</strong> Pon la masa en la mesa y amasa durante 10 minutos. Es un gran ejercicio para las manos. Debe quedar suave y estirable.</li>
        <li><strong>Leudar:</strong> Pon la masa en un bol aceitado, tápala con un paño y déjala descansar 1 hora en un lugar tibio hasta que duplique su tamaño.</li>
        <li><strong>Trenzar:</strong> Divide la masa en 3 porciones iguales, haz 3 tiras largas y realiza el trenzado (¡como en nuestro simulador!).</li>
        <li><strong>Pintar y Hornear:</strong> Pinta la trenza con la yema de huevo batida, ponle semillas por encima y llévala al horno a 180°C durante 25-30 minutos hasta que esté dorada y huela delicioso.</li>
      </ol>`
    },
    cookies: {
      title: "Galletas de la Estrella de David",
      body: `<h4>Ingredientes para Niños:</h4>
      <ul>
        <li>🧈 200g de mantequilla blanda</li>
        <li>🍬 150g de azúcar</li>
        <li>🥚 1 huevo</li>
        <li>🍦 1 cucharadita de vainilla</li>
        <li>🌾 350g de harina</li>
        <li>🥣 Glaseado celeste y blanco para decorar</li>
      </ul>
      <h4>Preparación en Familia:</h4>
      <ol>
        <li><strong>Batir:</strong> Con ayuda de una batidora, mezcla la mantequilla y el azúcar hasta que quede cremosa. Añade el huevo y la vainilla.</li>
        <li><strong>Masa:</strong> Agrega la harina poco a poco y amasa con las manos hasta unir todo. Envuelve en papel film y enfría en el refrigerador por 30 minutos.</li>
        <li><strong>Cortar:</strong> Estira la masa con un uslero. Con cortadores con forma de Estrella de David, corta las galletitas y ponlas en una bandeja para horno.</li>
        <li><strong>Hornear:</strong> Hornea a 180°C por 10-12 minutos hasta que los bordes estén ligeramente dorados. ¡Deja enfriar!</li>
        <li><strong>Decorar:</strong> ¡La parte más divertida! Decora tus estrellas con glaseado celeste y blanco.</li>
      </ol>`
    },
    hummus: {
      title: "Hummus Súper Rápido y Rico",
      body: `<h4>Ingredientes para Niños:</h4>
      <ul>
        <li>🥫 1 lata de garbanzos cocidos (escurridos)</li>
        <li>🍋 Jugo de 1 limón</li>
        <li>🥣 2 cucharadas de tahini (pasta de sésamo)</li>
        <li>🧄 1 diente de ajo pequeño</li>
        <li>🫒 3 cucharadas de aceite de oliva</li>
        <li>🧂 Una pizca de sal y comino</li>
      </ul>
      <h4>Preparación en Familia:</h4>
      <ol>
        <li><strong>Lavar:</strong> Enjuaga los garbanzos de la lata en un colador con agua fría.</li>
        <li><strong>Procesar:</strong> Pon los garbanzos, el jugo de limón, el ajo, el tahini, el comino y la sal en una procesadora de alimentos.</li>
        <li><strong>Licuar:</strong> Pídele ayuda a un adulto para encender la máquina y licuar todo hasta que quede una pasta suave. Si está muy espesa, añade 2 cucharadas de agua fría.</li>
        <li><strong>Servir:</strong> Pon el hummus en un plato hondo, haz un caminito al centro con una cuchara y añade el aceite de oliva. ¡Sírvelo con trozos de Jalá!</li>
      </ol>`
    }
  };

  function initCocina() {
    challahBaked = false;
    currentBraidStep = 0;
    
    const oven = document.getElementById('oven-overlay');
    if (oven) oven.style.display = 'none';
    
    const bakeBtn = document.getElementById('btn-bake-challah');
    if (bakeBtn) {
      bakeBtn.style.display = 'none';
      bakeBtn.disabled = true;
    }
    
    const actions = document.getElementById('braid-actions-container');
    if (actions) actions.style.display = 'flex';
    
    updateBraidUI();
    drawChallah();
    setupCocinaListeners();
  }

  function updateBraidUI() {
    const stepInd = document.getElementById('braid-step-indicator');
    const instText = document.getElementById('braid-instruction-text');
    const bakeBtn = document.getElementById('btn-bake-challah');
    
    if (currentBraidStep < maxBraidSteps) {
      if (stepInd) stepInd.textContent = `Paso ${currentBraidStep + 1} de 6`;
      
      const nextMove = currentBraidStep % 2 === 0 ? 'Izquierdo (1)' : 'Derecho (3)';
      if (instText) instText.textContent = `Cruza el cabo ${nextMove} sobre el del Centro (2)`;
      
      if (bakeBtn) bakeBtn.style.display = 'none';
    } else {
      if (stepInd) stepInd.textContent = '¡Trenzado Completo!';
      if (instText) instText.textContent = '¡Excelente! Tu Jalá está lista. Presiona "Hornear Jalá" para meterla al horno.';
      
      const actions = document.getElementById('braid-actions-container');
      if (actions) actions.style.display = 'none';
      
      if (bakeBtn) {
        bakeBtn.style.display = 'flex';
        bakeBtn.disabled = false;
      }
    }
  }

  function makeBraidMove(moveType) {
    const expectedMoveType = currentBraidStep % 2 === 0 ? 'L' : 'R';
    
    if (moveType === expectedMoveType) {
      currentBraidStep++;
      awardXP(5, '¡Buen cruce! 🥖');
      updateBraidUI();
      drawChallah();
    } else {
      const correction = expectedMoveType === 'L' ? 'Izquierdo (1)' : 'Derecho (3)';
      showToast(`⚠️ ¡Ups! Te toca mover el cabo ${correction}`);
    }
  }

  function drawChallah() {
    const canvas = document.getElementById('challah-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    ctx.clearRect(0, 0, W, H);
    
    ctx.fillStyle = '#451a03';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 4;
    for (let i = 20; i < H; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(W, i);
      ctx.stroke();
    }
    
    ctx.fillStyle = '#78350f';
    ctx.strokeStyle = '#a16207';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(W/2, H/2 + 20, 190, 110, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    const midX = W / 2;
    const startY = 80;
    
    if (challahBaked) {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetY = 10;
      
      const bodyGrad = ctx.createLinearGradient(midX - 100, H/2, midX + 100, H/2);
      bodyGrad.addColorStop(0, '#78350f');
      bodyGrad.addColorStop(0.3, '#d97706');
      bodyGrad.addColorStop(0.5, '#f59e0b');
      bodyGrad.addColorStop(0.7, '#d97706');
      bodyGrad.addColorStop(1, '#78350f');
      
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.ellipse(midX, H/2, 130, 65, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 3;
      
      const segments = [
        { x: midX - 90, y: H/2, rx: 25, ry: 40, rot: 0.3 },
        { x: midX - 45, y: H/2 - 10, rx: 28, ry: 45, rot: -0.2 },
        { x: midX, y: H/2 - 15, rx: 30, ry: 48, rot: 0.1 },
        { x: midX + 45, y: H/2 - 10, rx: 28, ry: 45, rot: 0.3 },
        { x: midX + 90, y: H/2, rx: 25, ry: 40, rot: -0.2 }
      ];
      
      segments.forEach((s, idx) => {
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, s.rx, s.ry, s.rot, 0, Math.PI * 2);
        ctx.stroke();
        
        if (idx !== 0 && idx !== 4) {
          const shineGrad = ctx.createRadialGradient(s.x - 5, s.y - 15, 2, s.x, s.y, 25);
          shineGrad.addColorStop(0, 'rgba(255,255,255,0.4)');
          shineGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = shineGrad;
          ctx.beginPath();
          ctx.ellipse(s.x, s.y - 5, s.rx * 0.7, s.ry * 0.7, s.rot, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      ctx.fillStyle = '#fef08a';
      ctx.strokeStyle = '#ca8a04';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 40; i++) {
        const sx = midX - 80 + Math.random() * 160;
        const sy = H/2 - 35 + Math.random() * 60;
        
        ctx.beginPath();
        ctx.ellipse(sx, sy, 3, 1.2, Math.random() * Math.PI, 0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
      }
      
      ctx.restore();
    } else {
      ctx.save();
      ctx.fillStyle = '#fef3c7';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      ctx.arc(midX, startY, 25, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      
      const braidYStep = 28;
      let currentY = startY;
      
      for (let i = 0; i < currentBraidStep; i++) {
        ctx.beginPath();
        const xOffset = i % 2 === 0 ? -12 : 12;
        ctx.ellipse(midX + xOffset, currentY + 20, 22, 16, i % 2 === 0 ? 0.35 : -0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(midX, currentY + 5);
        ctx.lineTo(midX, currentY + 35);
        ctx.stroke();
        
        currentY += braidYStep;
      }
      
      const endY = 270;
      const leftEndX = midX - 90;
      const centerEndX = midX;
      const rightEndX = midX + 90;
      const strandStartPointY = currentY + 10;
      
      ctx.beginPath();
      ctx.moveTo(midX - 10, strandStartPointY);
      ctx.bezierCurveTo(midX - 40, strandStartPointY + 30, leftEndX - 20, endY - 40, leftEndX, endY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(midX, strandStartPointY);
      ctx.bezierCurveTo(midX + (currentBraidStep % 2 === 0 ? 20 : -20), strandStartPointY + 35, centerEndX + (currentBraidStep % 2 === 0 ? -10 : 10), endY - 45, centerEndX, endY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(midX + 10, strandStartPointY);
      ctx.bezierCurveTo(midX + 40, strandStartPointY + 30, rightEndX + 20, endY - 40, rightEndX, endY);
      ctx.stroke();
      
      ctx.font = 'bold 16px Outfit, sans-serif';
      ctx.textAlign = 'center';
      
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(leftEndX, endY + 18, 12, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText("1", leftEndX, endY + 23);
      
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(centerEndX, endY + 18, 12, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText("2", centerEndX, endY + 23);
      
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(rightEndX, endY + 18, 12, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText("3", rightEndX, endY + 23);
      
      ctx.restore();
    }
  }

  function bakeChallah() {
    const oven = document.getElementById('oven-overlay');
    const timer = document.getElementById('oven-timer');
    const progress = document.getElementById('oven-progress');
    
    if (!oven) return;
    
    oven.style.display = 'flex';
    
    let countdown = 5;
    if (timer) timer.textContent = `${countdown}s`;
    if (progress) progress.style.width = '0%';
    
    let audioCtx = null;
    let osc = null;
    let gain = null;
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      osc = audioCtx.createOscillator();
      gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
    } catch(e) {}
    
    const interval = setInterval(() => {
      countdown--;
      if (timer) timer.textContent = `${countdown}s`;
      if (progress) {
        progress.style.width = `${((5 - countdown) / 5) * 100}%`;
      }
      
      if (countdown <= 0) {
        clearInterval(interval);
        
        if (osc) {
          try {
            osc.stop();
            audioCtx.close();
          } catch(e) {}
        }
        
        oven.style.display = 'none';
        challahBaked = true;
        drawChallah();
        
        const stepInd = document.getElementById('braid-step-indicator');
        const instText = document.getElementById('braid-instruction-text');
        if (stepInd) stepInd.textContent = '¡Jalá Horneada! 🥖✨';
        if (instText) instText.textContent = '¡Felicidades! Tu Jalá está crujiente, dorada y huele increíble. ¡Shabat Shalom!';
        
        const bakeBtn = document.getElementById('btn-bake-challah');
        if (bakeBtn) bakeBtn.style.display = 'none';
        
        awardXP(50, '¡Jalá Horneada con éxito! 🥖');
        unlockStamp('chef');
        triggerCelebration('🥖 ¡Jalá Crujiente y Lista!');
        showToast('🥖 ¡Horneado completado con éxito!');
      }
    }, 1000);
  }

  function setupCocinaListeners() {
    if (cocinaListenersBound) return;
    cocinaListenersBound = true;
    
    const recipesTab = document.getElementById('tab-kitchen-recipes');
    const braidTab = document.getElementById('tab-kitchen-braid');
    const recipesContent = document.getElementById('kitchen-recipes-content');
    const braidContent = document.getElementById('kitchen-braid-content');
    
    if (recipesTab && braidTab) {
      recipesTab.addEventListener('click', () => {
        recipesTab.classList.add('active');
        braidTab.classList.remove('active');
        if (recipesContent) recipesContent.style.display = 'block';
        if (braidContent) braidContent.style.display = 'none';
      });
      
      braidTab.addEventListener('click', () => {
        braidTab.classList.add('active');
        recipesTab.classList.remove('active');
        if (recipesContent) recipesContent.style.display = 'none';
        if (braidContent) braidContent.style.display = 'grid';
        drawChallah();
      });
    }
    
    const leftBtn = document.getElementById('btn-braid-left');
    const rightBtn = document.getElementById('btn-braid-right');
    const resetBraidBtn = document.getElementById('btn-reset-braid');
    const bakeChallahBtn = document.getElementById('btn-bake-challah');
    
    if (leftBtn) {
      leftBtn.addEventListener('click', () => makeBraidMove('L'));
    }
    if (rightBtn) {
      rightBtn.addEventListener('click', () => makeBraidMove('R'));
    }
    if (resetBraidBtn) {
      resetBraidBtn.addEventListener('click', () => {
        initCocina();
        showToast('🥖 Simulador de trenzado reiniciado');
      });
    }
    if (bakeChallahBtn) {
      bakeChallahBtn.addEventListener('click', bakeChallah);
    }
    
    const recipeTriggers = [
      { id: 'btn-recipe-challah', key: 'challah' },
      { id: 'btn-recipe-cookies', key: 'cookies' },
      { id: 'btn-recipe-hummus', key: 'hummus' }
    ];
    
    recipeTriggers.forEach(t => {
      const btn = document.getElementById(t.id);
      if (btn) {
        btn.addEventListener('click', () => {
          const data = RECIPES_DATA[t.key];
          const modal = document.getElementById('recipe-modal');
          const title = document.getElementById('recipe-modal-title');
          const body = document.getElementById('recipe-modal-body');
          
          if (modal && title && body && data) {
            title.textContent = data.title;
            body.innerHTML = data.body;
            modal.classList.add('visible');
          }
        });
      }
    });
    
    const closeModalBtn = document.getElementById('btn-close-recipe');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        const modal = document.getElementById('recipe-modal');
        if (modal) modal.classList.remove('visible');
      });
    }
  }

  // ==========================================================================
  // RUEDA DE LAS FESTIVIDADES (HAGIM WHEEL)
  // ==========================================================================
  const HOLIDAYS_DATA = [
    { key: 'shabat', emoji: '🕯️', title: 'Shabat', hebrew: 'שבת', desc: 'El día de descanso semanal. Nos reunimos en familia, encendemos velas, bendecimos la Jalá y el vino, y descansamos de la tecnología.', symbols: 'Velas de Shabat, Copa de Kidush, Jalá', value: 'Unidad Familiar y Paz (+50 XP)' },
    { key: 'rosh-hashana', emoji: '🍎', title: 'Rosh Hashaná', hebrew: 'ראש השנה', desc: 'El año nuevo judío. Escuchamos el sonido del Shofar (un cuerno de carnero) y comemos manzana sumergida en miel para desearnos un año dulce.', symbols: 'Shofar, Manzana con Miel, Granada', value: 'Dulzura y Nuevos Comienzos (+50 XP)' },
    { key: 'yom-kippur', emoji: '🕊️', title: 'Yom Kipur', hebrew: 'יום כיפור', desc: 'El día del perdón. Es un día de ayuno para los adultos, donde reflexionamos sobre nuestras acciones, pedimos disculpas a quienes pudimos haber lastimado y prometemos ser mejores.', symbols: 'Ropa blanca, Zapatillas de lona, Ayuno', value: 'Reflexión y Perdón (+50 XP)' },
    { key: 'sukkot', emoji: '🍋', title: 'Sucot', hebrew: 'סוכות', desc: 'La fiesta de las cabañas. Construimos una cabaña temporal afuera (Sucá) con techo de hojas, y jugamos y comemos adentro bajo las estrellas para recordar cómo Dios protegió al pueblo en el desierto.', symbols: 'Sucá, Etrog (cidra), Lulav (palmera)', value: 'Hospitalidad y Gratitud (+50 XP)' },
    { key: 'hanukkah', emoji: '🕎', title: 'Janucá', hebrew: 'חנוכה', desc: 'La fiesta de las luces. Celebramos el milagro del aceite que duró 8 días encendiendo la Januquiá, jugando al Sevivón (trompo) y comiendo sufganiot (donas).', symbols: 'Januquiá, Sevivón, Aceite y Donas', value: 'Luz, Milagro y Valentía (+50 XP)' },
    { key: 'purim', emoji: '🎭', title: 'Purim', hebrew: 'פורים', desc: 'La fiesta más alegre del año. Nos disfrazamos, leemos la historia de Ester, hacemos ruido con matracas para borrar el nombre de Amán, y nos regalamos comida (Mishlóaj Manot).', symbols: 'Disfraces, Matraca, Orejas de Amán', value: 'Alegría y Generosidad (+50 XP)' },
    { key: 'pesach', emoji: '🫓', title: 'Pésaj', hebrew: 'פסח', desc: 'La fiesta de la libertad. Celebramos la salida de la esclavitud en Egipto. Durante 8 días no comemos harina leudada, sino Matsá (pan plano sin leudar), y hacemos el Séder en familia.', symbols: 'Matsá, Séder, Keará (plato ritual)', value: 'Libertad y Memoria Histórica (+50 XP)' },
    { key: 'shavuot', emoji: '🧀', title: 'Shavuot', hebrew: 'שבועות', desc: 'La fiesta de la entrega de la Torá en el Monte Sinaí. Decoramos todo con flores y hojas verdes, comemos lácteos (como pastel de queso) y pasamos la noche estudiando.', symbols: 'Flores, Torá, Productos lácteos', value: 'Estudio y Conexión Espiritual (+50 XP)' }
  ];

  let wheelState = {
    angle: 0,
    angularVelocity: 0,
    isSpinning: false,
    selectedIdx: -1
  };

  function initFestividades() {
    const canvas = document.getElementById('wheel-canvas');
    if (!canvas) return;
    drawWheel();
    
    const spinBtn = document.getElementById('btn-spin-wheel');
    const speakBtn = document.getElementById('btn-speak-holiday');
    
    if (spinBtn) {
      spinBtn.replaceWith(spinBtn.cloneNode(true));
      document.getElementById('btn-spin-wheel').addEventListener('click', spinWheel);
    }
    
    if (speakBtn) {
      speakBtn.replaceWith(speakBtn.cloneNode(true));
      document.getElementById('btn-speak-holiday').addEventListener('click', () => {
        if (wheelState.selectedIdx !== -1) {
          const h = HOLIDAYS_DATA[wheelState.selectedIdx];
          speakNeutralText(`${h.title}. ${h.desc}`);
        }
      });
    }
  }

  function drawWheel() {
    const canvas = document.getElementById('wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const r = w / 2;
    const numSections = HOLIDAYS_DATA.length;
    const arcSize = (2 * Math.PI) / numSections;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(r, r);
    ctx.rotate(wheelState.angle);

    for (let i = 0; i < numSections; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r - 5, i * arcSize, (i + 1) * arcSize);
      ctx.closePath();

      ctx.fillStyle = i % 2 === 0 ? 'rgba(30, 58, 138, 0.7)' : 'rgba(56, 189, 248, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(i * arcSize + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 11px "Outfit", sans-serif';
      ctx.fillText(HOLIDAYS_DATA[i].title, r - 45, 4);
      
      ctx.font = '14px "Apple Color Emoji"';
      ctx.fillText(HOLIDAYS_DATA[i].emoji, r - 15, 6);
      ctx.restore();
    }
    
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, 2 * Math.PI);
    ctx.fillStyle = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#f59e0b';
    ctx.fill();
    ctx.restore();
  }

  function spinWheel() {
    if (wheelState.isSpinning) return;
    
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    
    wheelState.isSpinning = true;
    wheelState.angularVelocity = 0.25 + Math.random() * 0.2;
    
    function animate() {
      if (wheelState.angularVelocity > 0.002) {
        wheelState.angle += wheelState.angularVelocity;
        wheelState.angularVelocity *= 0.982;
        drawWheel();
        requestAnimationFrame(animate);
      } else {
        wheelState.isSpinning = false;
        wheelState.angularVelocity = 0;
        
        const numSections = HOLIDAYS_DATA.length;
        const arcSize = (2 * Math.PI) / numSections;
        
        let normalizedAngle = (1.5 * Math.PI - wheelState.angle) % (2 * Math.PI);
        if (normalizedAngle < 0) normalizedAngle += 2 * Math.PI;
        
        const winningIdx = Math.floor(normalizedAngle / arcSize) % numSections;
        wheelState.selectedIdx = winningIdx;
        
        showHolidayDetails(winningIdx);
      }
    }
    animate();
  }

  function showHolidayDetails(idx) {
    const h = HOLIDAYS_DATA[idx];
    
    const emojiEl = document.getElementById('wheel-detail-emoji');
    const titleEl = document.getElementById('wheel-detail-title');
    const hebrewEl = document.getElementById('wheel-detail-hebrew');
    const bodyEl = document.getElementById('wheel-detail-body');
    const infoEl = document.getElementById('wheel-detail-info');
    const symbolsEl = document.getElementById('wheel-detail-symbols');
    const valuesEl = document.getElementById('wheel-detail-values');
    const speakBtn = document.getElementById('btn-speak-holiday');
    
    if (emojiEl) emojiEl.textContent = h.emoji;
    if (titleEl) titleEl.textContent = h.title;
    if (hebrewEl) hebrewEl.textContent = h.hebrew;
    if (bodyEl) bodyEl.textContent = h.desc;
    if (symbolsEl) symbolsEl.textContent = h.symbols;
    if (valuesEl) valuesEl.textContent = h.value;
    if (infoEl) infoEl.style.display = 'flex';
    if (speakBtn) speakBtn.style.display = 'inline-flex';
    
    awardXP(20, `Explorar Rueda Hagim (${h.title})`);
    unlockStamp('hagim');
    speakNeutralText(`${h.title}. ${h.desc}`);
  }

  function speakNeutralText(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = getNeutralSpanishVoice(voices);
    if (voice) utterance.voice = voice;
    utterance.pitch = 1.25;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  // ==========================================================================
  // CONEXIÓN ISRAEL & CALENDARIO SIONISTA
  // ==========================================================================
  const ZIONIST_HITOS = [
    { emoji: '💭', title: 'El Sueño de Herzl', date: '1897 - Basilea', story: 'Teodoro Herzl era un escritor que soñaba con que los judíos volvieran a tener un hogar seguro en su propia tierra, la tierra de Israel. Él organizó el primer congreso y escribió una frase famosa: "Si lo quieren, no será una leyenda". Nos enseñó que cuando deseamos algo bueno con mucha fuerza y trabajamos por ello, ¡los sueños se hacen realidad!', question: '¿Qué gran sueño tienes tú y cómo te gustaría trabajar para lograrlo?' },
    { emoji: '✍️', title: 'Eliezer Ben-Yehuda', date: '1881 - El Hebreo Vivo', story: 'Durante casi dos mil años, el hebreo solo se usaba para rezar y estudiar la Torá. Pero Eliezer Ben-Yehuda creía que si el pueblo judío volvía a su tierra, tenía que hablar en hebreo. Él inventó palabras modernas que no existían antes (como helado o bicicleta) y enseñó a su hijo a ser el primer niño que habló hebreo de forma laica. ¡Gracias a él, hoy en Israel todos los niños juegan y hablan en hebreo!', question: '¿Cómo crees que un idioma ayuda a que las personas se sientan unidas en una misma familia o país?' },
    { emoji: '📜', title: 'La Declaración Balfour', date: '1917 - Reconocimiento', story: 'Hace más de cien años, el gobierno de Gran Bretaña escribió una carta histórica prometiendo ayudar al pueblo judío a reconstruir su hogar nacional en la tierra de Israel. Esta carta, llamada Declaración Balfour, fue una chispa de esperanza que mostró al mundo que las naciones apoyaban nuestro derecho a vivir libres y seguros en nuestra tierra ancestral.', question: '¿Qué significa para ti tener un hogar donde siempre eres bienvenido?' },
    { emoji: '🇮🇱', title: 'Yom Haatzmaut', date: '5 de Iyar 1948', story: '¡El momento más esperado! El 14 de mayo de 1948, David Ben-Gurión leyó la Declaración de Independencia y el Estado de Israel volvió a nacer formalmente. La gente bailó en las calles de alegría de norte a sur. Desde entonces, cada año celebramos Yom Haatzmaut ondeando banderas celestes y blancas, bailando la Horá en familia y festejando que somos libres.', question: 'Si tuvieras que organizar una fiesta para el cumpleaños de Israel, ¿cómo la decorarías y qué bailarías?' },
    { emoji: '🎺', title: 'Yom Hazikaron', date: 'Memoria y Respeto', story: 'Justo antes del cumpleaños de Israel, recordamos con mucho cariño y respeto a todos los soldados que defendieron el país y a las personas que perdieron su vida para que Israel pudiera vivir en paz. Se toca una sirena en todo Israel y la gente se detiene en silencio. Nos enseña a agradecer a quienes protegen la paz y la seguridad.', question: '¿Qué palabras de agradecimiento les darías a quienes nos cuidan cada día?' },
    { emoji: '👑', title: 'Yom Yerushalayim', date: '28 de Iyar - Jerusalén', story: 'Jerusalén es la capital eterna y el corazón del pueblo judío. Hace muchos años, la ciudad vieja estaba dividida y no podíamos ir al Muro de los Lamentos. Pero en 1967, Jerusalén volvió a unirse. Ahora la celebramos cantando canciones alegres y paseando por sus calles de piedra dorada.', question: 'Si viajaras hoy a Jerusalén, ¿qué deseo o nota escribirías para colocar en las grietas del Muro de los Lamentos?' },
    { emoji: '✈️', title: 'Yom HaAliyah', date: '10 de Nisán - El Retorno', story: 'Aliyá significa subir, y es la palabra que usamos cuando un judío viaja a vivir a Israel desde cualquier lugar del mundo. Yom HaAliyah celebra la llegada de millones de personas de diferentes países (Chile, Marruecos, Rusia, EE.UU.) que traen sus culturas, comidas y canciones para formar un solo mosaico hermoso en Israel.', question: 'Si hicieras las maletas para mudarte a Israel, ¿cuál sería el juguete o recuerdo más especial que llevarías contigo?' }
  ];

  let selectedZionistIdx = -1;

  function initSionista() {
    const timelineEl = document.getElementById('zionist-timeline');
    if (!timelineEl) return;
    timelineEl.innerHTML = '';

    const readHistory = JSON.parse(localStorage.getItem('shabateinu_read_zionist') || '[]');

    ZIONIST_HITOS.forEach((h, idx) => {
      const isRead = readHistory.includes(idx);
      const activeClass = idx === selectedZionistIdx ? 'active' : '';
      const readClass = isRead ? 'read' : '';
      
      const item = document.createElement('div');
      item.className = `zionist-timeline-item ${activeClass} ${readClass}`;
      item.innerHTML = `
        <div class="zionist-marker">${idx + 1}</div>
        <div class="zionist-timeline-content">
          <h4>${h.emoji} ${h.title}</h4>
          <span>${h.date}</span>
        </div>
      `;
      item.addEventListener('click', () => selectZionistHito(idx));
      timelineEl.appendChild(item);
    });

    const speakBtn = document.getElementById('btn-speak-zionist');
    const readBtn = document.getElementById('btn-complete-zionist');
    
    if (speakBtn) {
      speakBtn.replaceWith(speakBtn.cloneNode(true));
      document.getElementById('btn-speak-zionist').addEventListener('click', () => {
        if (selectedZionistIdx !== -1) {
          speakNeutralText(ZIONIST_HITOS[selectedZionistIdx].story);
        }
      });
    }

    if (readBtn) {
      readBtn.replaceWith(readBtn.cloneNode(true));
      document.getElementById('btn-complete-zionist').addEventListener('click', () => {
        if (selectedZionistIdx !== -1) {
          completeZionistHito(selectedZionistIdx);
        }
      });
    }
  }

  function selectZionistHito(idx) {
    selectedZionistIdx = idx;
    
    document.querySelectorAll('.zionist-timeline-item').forEach((item, index) => {
      if (index === idx) item.classList.add('active');
      else item.classList.remove('active');
    });

    const h = ZIONIST_HITOS[idx];
    
    const emojiEl = document.getElementById('zionist-emoji');
    const titleEl = document.getElementById('zionist-title');
    const dateEl = document.getElementById('zionist-date');
    const storyEl = document.getElementById('zionist-story-text');
    const guideEl = document.getElementById('zionist-parent-guide');
    const questionEl = document.getElementById('zionist-question');
    const speakBtn = document.getElementById('btn-speak-zionist');
    const readBtn = document.getElementById('btn-complete-zionist');

    if (emojiEl) emojiEl.textContent = h.emoji;
    if (titleEl) titleEl.textContent = h.title;
    if (dateEl) dateEl.textContent = h.date;
    if (storyEl) storyEl.innerHTML = h.story;
    if (questionEl) questionEl.textContent = h.question;
    if (guideEl) guideEl.style.display = 'block';
    
    if (speakBtn) speakBtn.style.display = 'inline-flex';
    if (readBtn) {
      const readHistory = JSON.parse(localStorage.getItem('shabateinu_read_zionist') || '[]');
      if (readHistory.includes(idx)) {
        readBtn.style.display = 'none';
      } else {
        readBtn.style.display = 'inline-flex';
      }
    }
    
    speakNeutralText(h.story);
  }

  function completeZionistHito(idx) {
    const readHistory = JSON.parse(localStorage.getItem('shabateinu_read_zionist') || '[]');
    if (!readHistory.includes(idx)) {
      readHistory.push(idx);
      localStorage.setItem('shabateinu_read_zionist', JSON.stringify(readHistory));
    }

    awardXP(10, `Hito Sionista (${ZIONIST_HITOS[idx].title})`);
    
    if (readHistory.length === ZIONIST_HITOS.length) {
      unlockStamp('israel');
      showToast('🎉 ¡Felicidades! Desbloqueaste el Sello de Israel');
    }

    initSionista();
    const readBtn = document.getElementById('btn-complete-zionist');
    if (readBtn) readBtn.style.display = 'none';
  }

  // ==========================================================================
  // CEREMONIA DE HAVDALÁ SENSORIAL
  // ==========================================================================
  let havdalaState = {
    candleLit: false,
    spicesSmelled: false,
    extinguished: false,
    particleInterval: null,
    particles: []
  };

  function initHavdala() {
    const canvas = document.getElementById('havdala-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    havdalaState.candleLit = false;
    havdalaState.spicesSmelled = false;
    havdalaState.extinguished = false;
    havdalaState.particles = [];
    
    const overlay = document.getElementById('havdala-shavua-tov');
    if (overlay) overlay.style.display = 'none';
    
    const extinguishBtn = document.getElementById('btn-extinguish-candle');
    if (extinguishBtn) extinguishBtn.style.display = 'none';
    
    updateHavdalaHint();

    const cupBtn = document.getElementById('havdala-item-cup');
    const spicesBtn = document.getElementById('havdala-item-spices');
    const candleBtn = document.getElementById('havdala-item-candle');
    const resetBtn = document.getElementById('btn-reset-havdala');
    const extBtn = document.getElementById('btn-extinguish-candle');

    if (candleBtn) {
      candleBtn.replaceWith(candleBtn.cloneNode(true));
      document.getElementById('havdala-item-candle').addEventListener('click', () => {
        if (!havdalaState.candleLit) {
          havdalaState.candleLit = true;
          speakNeutralText("Encendemos la vela trenzada. Representa la luz creada al principio del mundo.");
          showToast('🕯️ Vela encendida');
          updateHavdalaHint();
        }
      });
    }

    if (spicesBtn) {
      spicesBtn.replaceWith(spicesBtn.cloneNode(true));
      document.getElementById('havdala-item-spices').addEventListener('click', () => {
        if (!havdalaState.spicesSmelled) {
          havdalaState.spicesSmelled = true;
          speakNeutralText("Holemos las especias para darnos consuelo porque el Shabat se termina.");
          showToast('🌿 Especias aromatizadas');
          triggerSpicesParticles();
          updateHavdalaHint();
        }
      });
    }

    if (extBtn) {
      extBtn.replaceWith(extBtn.cloneNode(true));
      document.getElementById('btn-extinguish-candle').addEventListener('click', extinguishHavdalaCandle);
    }

    if (resetBtn) {
      resetBtn.replaceWith(resetBtn.cloneNode(true));
      document.getElementById('btn-reset-havdala').addEventListener('click', initHavdala);
    }

    if (havdalaState.particleInterval) clearInterval(havdalaState.particleInterval);
    havdalaState.particleInterval = setInterval(() => {
      updateAndDrawHavdalaScene(canvas, ctx);
    }, 40);
  }

  function updateHavdalaHint() {
    const hint = document.getElementById('havdala-hint');
    const extBtn = document.getElementById('btn-extinguish-candle');
    if (!hint) return;
    
    if (!havdalaState.candleLit) {
      hint.textContent = 'Presiona el botón de la Vela (🕯️) para encender la luz de Havdalá.';
      if (extBtn) extBtn.style.display = 'none';
    } else if (!havdalaState.spicesSmelled) {
      hint.textContent = 'Presiona el botón de las Especias (🌿) para oler su perfume.';
      if (extBtn) extBtn.style.display = 'none';
    } else if (!havdalaState.extinguished) {
      hint.textContent = '¡Todo listo! Pulsa el botón "Apagar Vela en Copa" para finalizar el Shabat.';
      if (extBtn) extBtn.style.display = 'inline-flex';
    } else {
      hint.textContent = '¡Shavua Tov! Que tengas una dulce semana.';
      if (extBtn) extBtn.style.display = 'none';
    }
  }

  function triggerSpicesParticles() {
    for (let i = 0; i < 25; i++) {
      havdalaState.particles.push({
        x: 160 + Math.random() * 40,
        y: 200,
        vx: Math.random() * 3 - 1.5,
        vy: -Math.random() * 2 - 1,
        emoji: ['🌿', '🌸', '✨', '🍃'][Math.floor(Math.random() * 4)],
        size: 14 + Math.random() * 8,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.01
      });
    }
  }

  function extinguishHavdalaCandle() {
    if (havdalaState.extinguished) return;
    
    havdalaState.extinguished = true;
    havdalaState.candleLit = false;
    
    playSizzleSound();
    for (let i = 0; i < 35; i++) {
      havdalaState.particles.push({
        x: 290 + Math.random() * 20,
        y: 120,
        vx: Math.random() * 5 - 2.5,
        vy: -Math.random() * 3 - 1.5,
        emoji: ['💨', '💭', '✨'][Math.floor(Math.random() * 3)],
        size: 16 + Math.random() * 10,
        alpha: 1,
        decay: 0.018 + Math.random() * 0.015
      });
    }
    
    updateHavdalaHint();
    
    setTimeout(() => {
      const overlay = document.getElementById('havdala-shavua-tov');
      if (overlay) overlay.style.display = 'flex';
      
      awardXP(40, 'Finalizar ceremonia de Havdalá');
      unlockStamp('havdala');
      triggerConfetti();
      speakNeutralText("¡Shavua Tov! Que tengas una hermosa y dulce semana.");
    }, 1500);
  }

  function updateAndDrawHavdalaScene(canvas, ctx) {
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#050b14';
    ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 15; i++) {
      const sx = (Math.sin(Date.now() * 0.0008 + i) * 0.5 + 0.5) * w;
      const sy = ((i * 21) % h);
      ctx.fillRect(sx, sy, 2, 2);
    }
    
    ctx.save();
    ctx.font = '6.5rem "Apple Color Emoji"';
    ctx.fillText('🍷', 50, 260);
    ctx.restore();
    
    ctx.save();
    ctx.font = '6.5rem "Apple Color Emoji"';
    ctx.fillText('🌿', 150, 260);
    ctx.restore();
    
    ctx.save();
    ctx.font = '7.5rem "Apple Color Emoji"';
    ctx.fillText('🕯️', 250, 250);
    ctx.restore();

    if (havdalaState.candleLit) {
      const time = Date.now() * 0.025;
      const xBase = 315;
      const yBase = 110;
      
      for (let i = 0; i < 3; i++) {
        const xOffset = (i - 1) * 9;
        const flameHeight = 30 + Math.sin(time + i * 4) * 8;
        
        ctx.beginPath();
        ctx.moveTo(xBase + xOffset, yBase);
        ctx.bezierCurveTo(xBase + xOffset - 10, yBase - 12, xBase + xOffset - 5, yBase - flameHeight, xBase + xOffset, yBase - flameHeight - 6);
        ctx.bezierCurveTo(xBase + xOffset + 5, yBase - flameHeight, xBase + xOffset + 10, yBase - 12, xBase + xOffset, yBase);
        ctx.closePath();
        
        const grad = ctx.createRadialGradient(xBase + xOffset, yBase - 12, 1, xBase + xOffset, yBase - 12, 22);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, '#f59e0b');
        grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }
    
    for (let i = havdalaState.particles.length - 1; i >= 0; i--) {
      const p = havdalaState.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.decay;
      
      if (p.alpha <= 0) {
        havdalaState.particles.splice(i, 1);
        continue;
      }
      
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.font = `${p.size}px "Apple Color Emoji"`;
      ctx.fillText(p.emoji, p.x, p.y);
      ctx.restore();
    }
  }

  function stopHavdala() {
    if (havdalaState.particleInterval) {
      clearInterval(havdalaState.particleInterval);
      havdalaState.particleInterval = null;
    }
  }

  // ==========================================================================
  // PASAPORTE DE SHABAT
  // ==========================================================================
  function initPasaporte() {
    const kidNameEl = document.getElementById('pass-kid-name');
    const kidLevelEl = document.getElementById('pass-kid-level');
    const kidXpEl = document.getElementById('pass-kid-xp');
    
    const qs = initQuestState();
    const currentLvl = getLevel(qs.xp);

    if (kidNameEl) kidNameEl.textContent = 'Javer de Shabat';
    if (kidLevelEl) kidLevelEl.textContent = `Nivel ${currentLvl.min === 0 ? 1 : (currentLvl.min === 50 ? 2 : (currentLvl.min === 120 ? 3 : (currentLvl.min === 200 ? 4 : 5)))} — ${currentLvl.name}`;
    if (kidXpEl) kidXpEl.textContent = `${qs.xp} ⭐`;

    const stamps = ['chef', 'mitzvot', 'cuentos', 'hagim', 'havdala', 'israel'];
    stamps.forEach(s => {
      const unlocked = localStorage.getItem(`shabateinu_stamp_${s}`) === 'true';
      const slot = document.getElementById(`stamp-${s}`);
      if (slot) {
        if (unlocked) {
          slot.classList.add('unlocked');
        } else {
          slot.classList.remove('unlocked');
        }
      }
    });

    const printBtn = document.getElementById('btn-print-passport');
    if (printBtn) {
      printBtn.replaceWith(printBtn.cloneNode(true));
      document.getElementById('btn-print-passport').addEventListener('click', () => {
        document.body.classList.add('printing-passport');
        window.print();
      });
    }
    
    window.addEventListener('afterprint', () => {
      document.body.classList.remove('printing-passport');
    });
  }

  function unlockStamp(stampName) {
    localStorage.setItem(`shabateinu_stamp_${stampName}`, 'true');
  }

  // ==========================================================================
  // TALLER DE MANUALIDADES & PAPIROFLEXIA
  // ==========================================================================
  const CRAFTS_DATA = {
    velas: [
      { text: 'Toma dos rectángulos de papel blanco o amarillo y enróllalos como dos tubitos.', tip: 'Representa las dos velas tradicionales de Shabat.', emoji: '📄' },
      { text: 'Corta dos pedacitos de papel dorado con forma de gotita de fuego.', tip: '¡Será nuestro fuego seguro para jugar!', emoji: '🔥' },
      { text: 'Pega las gotitas en la parte superior de cada rollito.', tip: 'Ya tienes tus velas listas para tu mesa de Shabat infantil.', emoji: '🕯️' },
      { text: 'Decora los portavelas dibujando flores o estrellas de David.', tip: '¡Pídele a tus papás que las pongan en la mesa el viernes!', emoji: '🎨' }
    ],
    copa: [
      { text: 'Toma un papel cuadrado y dóblalo por la mitad formando un triángulo.', tip: 'Usa papel brillante o de color azul si tienes.', emoji: '📐' },
      { text: 'Dobla la punta derecha hacia el borde izquierdo, y la izquierda hacia el derecho.', tip: 'Formará un pequeño sobre abierto por arriba.', emoji: '✉️' },
      { text: 'Dobla las pestañas superiores hacia abajo en lados opuestos.', tip: 'Esto abrirá la copa de papel.', emoji: '🍷' },
      { text: 'Abre la copa y decórala con estrellas de David o lentejuelas.', tip: '¡Puedes usarla para llenarla de pasas o dulces para Kidush!', emoji: '🍇' }
    ],
    corona: [
      { text: 'Corta una tira larga de cartulina amarilla de unos 6 cm de ancho.', tip: 'Mide la cabeza del niño antes de cortar.', emoji: '✂️' },
      { text: 'Dibuja y recorta picos en la parte superior.', tip: 'Para que parezca una corona de rey o reina de Shabat.', emoji: '👑' },
      { text: 'Dibuja símbolos como una Menorá o Jalot y adórnala.', tip: 'Puedes pegar lentejuelas o pintar con purpurina dorada.', emoji: '✨' },
      { text: 'Pega los extremos con cinta adhesiva para ajustar la corona.', tip: '¡Listo! Póntela el viernes al recibir el Shabat en familia.', emoji: '⭐' }
    ],
    tzedaka: [
      { text: 'Toma una caja de cartón pequeña vacía (como una de té o leche).', tip: 'Límpiala bien por dentro primero.', emoji: '📦' },
      { text: 'Pide ayuda a tus papás para hacer una ranura en la tapa con tijeras.', tip: 'Debe ser lo suficientemente grande para meter monedas.', emoji: '🪙' },
      { text: 'Fórrala con papel de regalo o pintala con témpera azul.', tip: 'Escribe la palabra "TZEDAKÁ" en letras grandes y decoradas.', emoji: '🖌️' },
      { text: 'Colócala en un lugar visible de la casa.', tip: 'Pon una moneda real o de papel cada viernes antes de que empiece Shabat.', emoji: '❤️' }
    ]
  };

  let craftState = {
    project: 'velas',
    step: 0
  };

  function initManualidades() {
    const projectBtns = document.querySelectorAll('.craft-select-btn');
    projectBtns.forEach(btn => {
      btn.replaceWith(btn.cloneNode(true));
    });
    
    document.querySelectorAll('.craft-select-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        document.querySelectorAll('.craft-select-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');
        craftState.project = target.dataset.project;
        craftState.step = 0;
        renderCraftStep();
      });
    });

    const prevBtn = document.getElementById('btn-craft-prev');
    const nextBtn = document.getElementById('btn-craft-next');
    const finishBtn = document.getElementById('btn-craft-finish');

    if (prevBtn) {
      prevBtn.replaceWith(prevBtn.cloneNode(true));
      document.getElementById('btn-craft-prev').addEventListener('click', () => {
        if (craftState.step > 0) {
          craftState.step--;
          renderCraftStep();
        }
      });
    }

    if (nextBtn) {
      nextBtn.replaceWith(nextBtn.cloneNode(true));
      document.getElementById('btn-craft-next').addEventListener('click', () => {
        const steps = CRAFTS_DATA[craftState.project];
        if (craftState.step < steps.length - 1) {
          craftState.step++;
          renderCraftStep();
        }
      });
    }

    if (finishBtn) {
      finishBtn.replaceWith(finishBtn.cloneNode(true));
      document.getElementById('btn-craft-finish').addEventListener('click', () => {
        awardXP(30, `Manualidad de Shabat (${projectNames[craftState.project]})`);
        triggerConfetti();
        craftState.step = 0;
        renderCraftStep();
      });
    }

    renderCraftStep();
  }

  const projectNames = { velas: 'Velas de Shabat', copa: 'Copa de Kidush', corona: 'Corona de Shabat', tzedaka: 'Caja de Tzedaká' };

  function renderCraftStep() {
    const steps = CRAFTS_DATA[craftState.project];
    const step = steps[craftState.step];
    
    const titleEl = document.getElementById('craft-title');
    const stepCounterEl = document.getElementById('craft-step-counter');
    const illustrationEl = document.getElementById('craft-step-illustration');
    const textEl = document.getElementById('craft-step-text');
    const tipEl = document.getElementById('craft-step-tip');
    const progressBar = document.getElementById('craft-progress-bar');
    
    const prevBtn = document.getElementById('btn-craft-prev');
    const nextBtn = document.getElementById('btn-craft-next');
    const finishBtn = document.getElementById('btn-craft-finish');

    if (titleEl) titleEl.textContent = projectNames[craftState.project];
    if (stepCounterEl) stepCounterEl.textContent = `Paso ${craftState.step + 1} / ${steps.length}`;
    if (illustrationEl) illustrationEl.textContent = step.emoji;
    if (textEl) textEl.textContent = step.text;
    if (tipEl) tipEl.textContent = step.tip;
    
    const progressPercent = ((craftState.step + 1) / steps.length) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;

    if (prevBtn) prevBtn.disabled = craftState.step === 0;
    
    if (craftState.step === steps.length - 1) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (finishBtn) finishBtn.style.display = 'inline-flex';
    } else {
      if (nextBtn) nextBtn.style.display = 'inline-flex';
      if (finishBtn) finishBtn.style.display = 'none';
    }
  }

  // ==========================================================================
  // JARDÍN DE PAZ (SHABBAT SOUNDSCAPE BUILDER)
  // ==========================================================================
  const jardinState = {
    audioCtx: null,
    isPlaying: false,
    nodes: {
      masterGain: null,
      windNoise: null,
      windFilter: null,
      windGain: null,
      windLfo: null,
      riverNoise: null,
      riverFilter: null,
      riverGain: null,
      birdsOsc: null,
      birdsGain: null,
      musicOsc: null,
      musicGain: null,
      glowOsc: null,
      glowGain: null
    },
    timers: {
      birds: null,
      music: null
    },
    canvasInterval: null,
    starPulse: 0
  };

  function initJardin() {
    const canvas = document.getElementById('jardin-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const sliders = ['birds', 'wind', 'river', 'glow', 'music'];
    sliders.forEach(s => {
      const el = document.getElementById(`slider-${s}`);
      const txt = document.getElementById(`vol-txt-${s}`);
      if (el && txt) {
        el.addEventListener('input', (e) => {
          const val = e.target.value;
          txt.textContent = `${val}%`;
          updateJardinVolumes();
        });
      }
    });

    const toggleBtn = document.getElementById('btn-jardin-toggle');
    if (toggleBtn) {
      toggleBtn.replaceWith(toggleBtn.cloneNode(true));
      document.getElementById('btn-jardin-toggle').addEventListener('click', toggleJardinPlay);
    }

    updateJardinUI();

    if (jardinState.canvasInterval) clearInterval(jardinState.canvasInterval);
    jardinState.canvasInterval = setInterval(() => {
      drawJardinScene(canvas, ctx);
    }, 40);
  }

  function updateJardinUI() {
    const toggleBtn = document.getElementById('btn-jardin-toggle');
    if (!toggleBtn) return;
    if (jardinState.isPlaying) {
      toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      toggleBtn.style.background = 'rgba(239, 68, 68, 0.8)';
    } else {
      toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      toggleBtn.style.background = 'var(--nbi-gold)';
    }
  }

  function toggleJardinPlay() {
    if (jardinState.isPlaying) {
      stopJardinAudio();
      jardinState.isPlaying = false;
      showToast('🧘 Jardín de Paz en pausa');
    } else {
      startJardinAudio();
      jardinState.isPlaying = true;
      showToast('🧘 Creador de Paisaje Sonoro activo');
    }
    updateJardinUI();
  }

  function startJardinAudio() {
    try {
      if (!window.AudioContext && !window.webkitAudioContext) return;
      
      jardinState.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = jardinState.audioCtx;
      
      jardinState.nodes.masterGain = ctx.createGain();
      jardinState.nodes.masterGain.gain.setValueAtTime(0.5, ctx.currentTime);
      jardinState.nodes.masterGain.connect(ctx.destination);
      
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      jardinState.nodes.windNoise = ctx.createBufferSource();
      jardinState.nodes.windNoise.buffer = buffer;
      jardinState.nodes.windNoise.loop = true;
      
      jardinState.nodes.windFilter = ctx.createBiquadFilter();
      jardinState.nodes.windFilter.type = 'lowpass';
      jardinState.nodes.windFilter.frequency.value = 400;
      
      jardinState.nodes.windGain = ctx.createGain();
      jardinState.nodes.windGain.gain.value = 0;
      
      jardinState.nodes.windLfo = ctx.createOscillator();
      jardinState.nodes.windLfo.frequency.value = 0.15;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 150;
      
      jardinState.nodes.windLfo.connect(lfoGain);
      lfoGain.connect(jardinState.nodes.windFilter.frequency);
      
      jardinState.nodes.windNoise.connect(jardinState.nodes.windFilter);
      jardinState.nodes.windFilter.connect(jardinState.nodes.windGain);
      jardinState.nodes.windGain.connect(jardinState.nodes.masterGain);
      
      jardinState.nodes.windLfo.start();
      jardinState.nodes.windNoise.start();

      const riverBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const rData = riverBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        rData[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = rData[i];
        rData[i] *= 3.5;
      }
      
      jardinState.nodes.riverNoise = ctx.createBufferSource();
      jardinState.nodes.riverNoise.buffer = riverBuffer;
      jardinState.nodes.riverNoise.loop = true;
      
      jardinState.nodes.riverFilter = ctx.createBiquadFilter();
      jardinState.nodes.riverFilter.type = 'lowpass';
      jardinState.nodes.riverFilter.frequency.value = 250;
      
      jardinState.nodes.riverGain = ctx.createGain();
      jardinState.nodes.riverGain.gain.value = 0;
      
      jardinState.nodes.riverNoise.connect(jardinState.nodes.riverFilter);
      jardinState.nodes.riverFilter.connect(jardinState.nodes.riverGain);
      jardinState.nodes.riverGain.connect(jardinState.nodes.masterGain);
      
      jardinState.nodes.riverNoise.start();

      jardinState.nodes.birdsGain = ctx.createGain();
      jardinState.nodes.birdsGain.gain.value = 0;
      jardinState.nodes.birdsGain.connect(jardinState.nodes.masterGain);
      
      jardinState.timers.birds = setInterval(() => {
        const sliderVol = parseFloat(document.getElementById('slider-birds').value) / 100;
        if (sliderVol === 0) return;
        
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800 + Math.random() * 500, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1500 + Math.random() * 800, ctx.currentTime + 0.15);
        
        oscGain.gain.setValueAtTime(sliderVol * 0.15, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        
        osc.connect(oscGain);
        oscGain.connect(jardinState.nodes.birdsGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      }, 1200);

      jardinState.nodes.glowOsc = ctx.createOscillator();
      jardinState.nodes.glowOsc.type = 'triangle';
      jardinState.nodes.glowOsc.frequency.value = 65;
      
      const glowFilter = ctx.createBiquadFilter();
      glowFilter.type = 'lowpass';
      glowFilter.frequency.value = 80;
      
      jardinState.nodes.glowGain = ctx.createGain();
      jardinState.nodes.glowGain.gain.value = 0;
      
      jardinState.nodes.glowOsc.connect(glowFilter);
      glowFilter.connect(jardinState.nodes.glowGain);
      jardinState.nodes.glowGain.connect(jardinState.nodes.masterGain);
      
      jardinState.nodes.glowOsc.start();

      jardinState.nodes.musicGain = ctx.createGain();
      jardinState.nodes.musicGain.gain.value = 0;
      jardinState.nodes.musicGain.connect(jardinState.nodes.masterGain);
      
      const arpeggioNotes = [261.63, 329.63, 392.00, 523.25, 493.88, 392.00, 329.63];
      let noteIdx = 0;
      
      jardinState.timers.music = setInterval(() => {
        const sliderVol = parseFloat(document.getElementById('slider-music').value) / 100;
        if (sliderVol === 0) return;
        
        const noteFreq = arpeggioNotes[noteIdx];
        noteIdx = (noteIdx + 1) % arpeggioNotes.length;
        
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);
        
        oscGain.gain.setValueAtTime(sliderVol * 0.2, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);
        
        osc.connect(oscGain);
        oscGain.connect(jardinState.nodes.musicGain);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.9);
      }, 950);

      updateJardinVolumes();

    } catch (e) {
      console.warn("AudioContext error: ", e);
    }
  }

  function updateJardinVolumes() {
    if (!jardinState.audioCtx) return;
    
    const vBirds = parseFloat(document.getElementById('slider-birds').value) / 100;
    const vWind = parseFloat(document.getElementById('slider-wind').value) / 100;
    const vRiver = parseFloat(document.getElementById('slider-river').value) / 100;
    const vGlow = parseFloat(document.getElementById('slider-glow').value) / 100;
    const vMusic = parseFloat(document.getElementById('slider-music').value) / 100;

    const ctx = jardinState.audioCtx;
    
    if (jardinState.nodes.windGain) {
      jardinState.nodes.windGain.gain.setTargetAtTime(vWind * 0.18, ctx.currentTime, 0.2);
    }
    if (jardinState.nodes.riverGain) {
      jardinState.nodes.riverGain.gain.setTargetAtTime(vRiver * 0.22, ctx.currentTime, 0.2);
    }
    if (jardinState.nodes.birdsGain) {
      jardinState.nodes.birdsGain.gain.setTargetAtTime(vBirds, ctx.currentTime, 0.1);
    }
    if (jardinState.nodes.glowGain) {
      jardinState.nodes.glowGain.gain.setTargetAtTime(vGlow * 0.28, ctx.currentTime, 0.2);
    }
    if (jardinState.nodes.musicGain) {
      jardinState.nodes.musicGain.gain.setTargetAtTime(vMusic, ctx.currentTime, 0.1);
    }
  }

  function stopJardinAudio() {
    if (jardinState.timers.birds) clearInterval(jardinState.timers.birds);
    if (jardinState.timers.music) clearInterval(jardinState.timers.music);
    jardinState.timers.birds = null;
    jardinState.timers.music = null;

    if (jardinState.audioCtx) {
      try {
        if (jardinState.nodes.windNoise) {
          jardinState.nodes.windNoise.stop();
          jardinState.nodes.windLfo.stop();
        }
        if (jardinState.nodes.riverNoise) jardinState.nodes.riverNoise.stop();
        if (jardinState.nodes.glowOsc) jardinState.nodes.glowOsc.stop();
        
        jardinState.audioCtx.close();
      } catch (e) {}
      jardinState.audioCtx = null;
    }
  }

  function drawJardinScene(canvas, ctx) {
    const w = canvas.width;
    const h = canvas.height;
    
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#050b14');
    grad.addColorStop(1, '#0e1d35');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    jardinState.starPulse += 0.05;
    for (let i = 0; i < 25; i++) {
      const sx = ((i * 37) % (w - 20)) + 10;
      const sy = ((i * 13) % (h - 120)) + 10;
      const pulse = Math.sin(jardinState.starPulse + i) * 0.4 + 0.6;
      
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5 * pulse, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.fillStyle = '#081222';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h - 80);
    ctx.quadraticCurveTo(w * 0.25, h - 110, w * 0.5, h - 70);
    ctx.quadraticCurveTo(w * 0.75, h - 50, w, h - 90);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#040a14';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, h - 40);
    ctx.quadraticCurveTo(w * 0.35, h - 70, w * 0.6, h - 45);
    ctx.quadraticCurveTo(w * 0.8, h - 30, w, h - 50);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#02060e';
    ctx.fillRect(w - 100, h - 90, 8, 50);
    ctx.beginPath();
    ctx.arc(w - 96, h - 100, 30, 0, 2 * Math.PI);
    ctx.fill();

    const vGlow = parseFloat(document.getElementById('slider-glow').value);
    if (vGlow > 0) {
      const radius = (vGlow / 100) * 140;
      const pulse = Math.sin(Date.now() * 0.003) * 10;
      
      ctx.save();
      const glowGrad = ctx.createRadialGradient(w/2, h - 40, 10, w/2, h - 40, radius + pulse);
      glowGrad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
      glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.1)');
      glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(w/2, h - 40, radius + pulse, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.font = '2rem "Apple Color Emoji"';
      ctx.fillText('🕯️', w/2 - 16, h - 40);
      ctx.restore();
    }
  }

  function stopJardin() {
    stopJardinAudio();
    if (jardinState.canvasInterval) {
      clearInterval(jardinState.canvasInterval);
      jardinState.canvasInterval = null;
    }
    jardinState.isPlaying = false;
    updateJardinUI();
  }


  init();
});
