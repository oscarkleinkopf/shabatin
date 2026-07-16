/**
 * Base de datos educativa de las Parashiot para Shabateinu NBI.
 * Contiene las 54 Parashiot de la Torá del año agrupadas por libro,
 * permitiendo su navegación completa en el selector de la plataforma.
 * Incluye resúmenes interactivos, sopa de letras, trivias y guiones de títeres
 * para las porciones más destacadas de la Torá, además de un motor de fallback inteligente.
 */

const PARASHOT_DB = {
  // ==========================================================================
  // LIBRO 1: BERESHIT (GÉNESIS)
  // ==========================================================================
  "Bereshit": {
    name: "Bereshit",
    hebrew: "בראשית",
    book: "Bereshit (Génesis)",
    summary: "¡El comienzo de todo! Dios crea nuestro hermoso mundo en seis días: la luz, el cielo, la tierra, los mares, el sol, las estrellas, las plantas, los animales y finalmente a los primeros seres humanos, Adán y Eva. El séptimo día, Dios descansa y nos regala el Shabat, un día especial para detenernos, agradecer y disfrutar en familia de toda la creación.",
    words: ["CREACION", "SHABAT", "MUNDO", "ADAN", "EVA", "EDEN", "LUZ", "ESTRELLAS"],
    trivia: [
      {
        question: "¿En cuántos días creó Dios todo lo que existe en el mundo?",
        options: ["En 6 días", "En 7 días", "En 10 días"],
        answer: 0
      },
      {
        question: "¿Qué hizo Dios el séptimo día y cómo lo llamamos hoy?",
        options: ["Siguió trabajando", "Descansó y nos regaló el Shabat", "Creó la luna"],
        answer: 1
      },
      {
        question: "¿Cómo se llamaba el hermoso lugar donde vivían Adán y Eva?",
        options: ["El Monte Sinaí", "La ciudad de Jerusalén", "El Jardín del Edén"],
        answer: 2
      }
    ],
    activities: {
      puppets: "**Guión - La Fiesta de la Creación:**\n*Personajes:* Títere de Sol (brillante), Títere de León (tierno) y Títere de Flor.\n- *Flor:* ¡Qué lindo es mi color verde!\n- *Sol:* Yo te doy luz para que crezcas. ¡Dios me creó el cuarto día!\n- *León:* ¡Grrr! Y a mí me creó el sexto día junto con los humanos. ¡Hola amigos de Shabateinu!\n- *Flor:* Qué bueno que Dios creó todo con amor. Y ahora que es viernes, ¡vamos a descansar en Shabat!",
      costumes: "**Taller de Disfraces:**\nDiseña diademas de papel con dibujos hechos por los niños de soles, flores, lunas o animales para representar los días de la creación. Cada niño representa un elemento y dice una Brajá (bendición) agradeciendo por su día.",
      song: "**Canción - El Regalo del Shabat (Tonada alegre):**\n*Letra:*\nEn el día uno, la luz brilló.\nEn el día dos, el cielo se abrió.\nAnimales y plantas en el seis creó...\n¡Y el séptimo día el Shabat llegó!\n*Coro:*\n¡Shabat Shalom, Shabateinu NBI!\nUn día de paz para ti y para mí."
    },
    storyPages: [
      { title: "Día 1: ¡Que se haga la Luz!", text: "Al principio todo estaba oscuro y vacío. Entonces Dios dijo: '¡Que haya luz!' Y una luz maravillosa iluminó todo. Dios separó la luz de la oscuridad y las llamó Día y Noche.", emoji: "💡" },
      { title: "Día 3: La Tierra y las Plantas", text: "Dios juntó las aguas y apareció la tierra seca. Luego la llenó de árboles frutales, flores de colores y pasto verde. ¡El mundo se volvió un jardín hermoso!", emoji: "🌿" },
      { title: "Día 5 y 6: Los Animales y el Ser Humano", text: "Los mares se llenaron de peces y el cielo de pájaros. La tierra se llenó de animales. Y al final, Dios creó al ser humano con mucho amor para cuidar todo.", emoji: "🦁" },
      { title: "Día 7: ¡El Shabat!", text: "El séptimo día, Dios terminó su obra y descansó. Bendijo ese día y lo hizo especial. Por eso cada viernes celebramos Shabat: un regalo de paz, familia y alegría.", emoji: "🕯️" }
    ],
    alefBetLetters: [
      { letter: "ב", name: "Bet", sound: "B", word: "בראשית", wordMeaning: "En el principio" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אור", wordMeaning: "Luz" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שבת", wordMeaning: "Shabat" }
    ]
  },
  "Noach": {
    name: "Noaj",
    hebrew: "נח",
    book: "Bereshit (Génesis)",
    summary: "La historia de Noaj y el Arca. Dios le pide a Noaj, un hombre muy bueno, que construya un barco gigante llamado Arca, porque vendrá una gran lluvia (el diluvio). Noaj sube a su familia y a una pareja de cada animal del planeta. Después de muchos días de lluvia, el sol vuelve a brillar y Dios coloca un hermoso Arcoíris en el cielo como una promesa de que cuidará el mundo para siempre.",
    words: ["ARCA", "NOAJ", "LLUVIA", "ANIMALES", "PALOMA", "ARCOIRIS", "PROMESA"],
    trivia: [
      {
        question: "¿Qué construyó Noaj para salvar a su familia y a los animales?",
        options: ["Un gran castillo", "Una balsa de madera", "Un barco gigante llamado Arca"],
        answer: 2
      },
      {
        question: "@¿Qué animal trajo una ramita de olivo demostrando que el agua había bajado?",
        options: ["Una palomita", "Un león", "Un elefante"],
        answer: 0
      },
      {
        question: "¿Qué señal puso Dios en el cielo como símbolo de su promesa?",
        options: ["Una gran nube blanca", "Un hermoso Arcoíris", "Una estrella fugaz"],
        answer: 1
      }
    ],
    activities: {
      puppets: "**Guión - El Viaje en el Arca:**\n*Personajes:* Títere de Noaj, Títere de Jirafa y Títere de Cebra.\n- *Noaj:* ¡Sujétense fuerte, amigos! Está lloviendo mucho.\n- *Jirafa:* ¡Ay! Mi cuello largo choca con el techo.\n- *Cebra:* No te preocupes Jirafa, Noaj nos cuida y Dios nos protege. ¡Mira! Ha dejado de llover.\n- *Noaj:* ¡Miren el cielo! Un arcoíris lleno de colores. ¡Dios nos promete paz!",
      costumes: "**Taller de Disfraces:**\nPintarse la carita como animales (gatos, leones, osos) y desfilar de dos en dos como entraban al Arca de Noaj. ¡Un desfile de Shabat muy salvaje y divertido!",
      song: "**Canción - Los Animales del Arca:**\n*Letra:*\nDos a dos subieron al Arca de Noaj,\nel elefante grande y el mono con su compás.\nLa lluvia caía, mas dentro había paz,\ny al ver el arcoíris supimos la verdad.\n*Coro:*\n¡El mundo cuidaremos, promesa de amistad!"
    },
    storyPages: [
      { title: "Noaj, el Hombre Bueno", text: "En un tiempo en que la gente no se portaba bien, había un hombre llamado Noaj que siempre hacía lo correcto. Dios le tenía mucho cariño y le dijo: 'Construye un arca grande.'", emoji: "🔨" },
      { title: "Los Animales Suben al Arca", text: "Noaj construyó un barco enorme. Luego, de dos en dos, llegaron todos los animales: leones, jirafas, pajaritos, tortugas... ¡Todos subieron ordenadamente al arca!", emoji: "🦒" },
      { title: "La Gran Lluvia", text: "Empezó a llover mucho, mucho. El agua cubría todo. Pero dentro del arca, Noaj y su familia cuidaban a cada animal con amor. Estaban seguros y protegidos.", emoji: "🌧️" },
      { title: "El Arcoíris de la Promesa", text: "Cuando dejó de llover, una palomita trajo una ramita verde. ¡La tierra estaba seca! Dios puso un hermoso arcoíris en el cielo como promesa de que siempre cuidaría el mundo.", emoji: "🌈" }
    ],
    alefBetLetters: [
      { letter: "נ", name: "Nun", sound: "N", word: "נח", wordMeaning: "Noaj (descanso)" },
      { letter: "ת", name: "Tav", sound: "T", word: "תבה", wordMeaning: "Arca" },
      { letter: "ק", name: "Kuf", sound: "K", word: "קשת", wordMeaning: "Arcoíris" }
    ]
  },
  "Lech-Lecha": {
    name: "Lej Leja",
    hebrew: "לך־לך",
    book: "Bereshit (Génesis)",
    summary: "Dios le dice a Abraham (el primer patriarca del pueblo judío): '¡Lej Lejá! Emprende un viaje a una nueva y hermosa tierra que te mostraré'. Abraham y su esposa Sara confían plenamente en Dios y viajan con fe. Dios les promete que su familia crecerá tanto como las incontables estrellas que brillan en el cielo nocturno y que serán de bendición para todo el mundo.",
    words: ["VIAJE", "ABRAHAM", "SARA", "FE", "ESTRELLAS", "BENDICION", "PROMESA"],
    trivia: [
      {
        question: "¿Qué significa 'Lej Lejá'?",
        options: ["Ve a dormir", "Quédate aquí", "Ve por ti mismo / Emprende el viaje"],
        answer: 2
      },
      {
        question: "¿Cómo se llamaba la esposa de Abraham que viajó con él?",
        options: ["Rebeca", "Sara", "Raquel"],
        answer: 1
      },
      {
        question: "¿Con qué comparó Dios la cantidad de descendientes que tendría Abraham?",
        options: ["Con las estrellas del cielo", "Con los peces del mar", "Con las hojas de los árboles"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Mirando las Estrellas:**\n*Personajes:* Títere de Abraham y Títere de Sara.\n- *Sara:* Abraham, el viaje ha sido largo, pero la tierra es hermosa.\n- *Abraham:* Mira las estrellas, Sara. Son brillantes e incontables.\n- *Sara:* ¡Sí! Dios nos prometió que nuestra familia será tan grande como ellas.\n- *Abraham:* Llenaremos el mundo de buenas acciones y bendiciones. ¡Hagamos una Brajá de agradecimiento!",
      costumes: "**Taller de Disfraces:**\nCrear 'binoculares de explorador' con rollos de papel higiénico decorados con estrellas doradas para 'buscar las estrellas de Abraham' en la sinagoga.",
      song: "**Canción - Camina con Fe (Ritmo folclórico chileno):**\n*Letra:*\nCamina, Abraham, camina con fe,\na una tierra hermosa que Dios te mostraré.\nSara te acompaña, sonríe al mirar,\nlas estrellas del cielo que van a brillar.\n*Coro:*\nBendición del cielo, luz en la oscuridad,\nviajamos unidos cantando en Shabat."
    }
  },
  "Vayeira": {
    name: "Vayera",
    hebrew: "וירא",
    book: "Bereshit (Génesis)",
    summary: "En esta Parashá aprendemos el hermoso valor de la hospitalidad (Ajnasat Orjim). Abraham y Sara están en su tienda en medio del desierto. Aunque hace mucho calor, Abraham ve a tres viajeros cansados e inmediatamente corre a invitarlos a descansar, les ofrece agua fresca para lavarse los pies y Sara amasa panes deliciosos para alimentarlos. ¡Resulta que los viajeros eran mensajeros de Dios que traían hermosas noticias!",
    words: ["TIENDA", "DESIERTO", "VIAJEROS", "HOSPITALIDAD", "AGUA", "PAN", "MENSAJE"],
    trivia: [
      {
        question: "¿Qué gran valor nos enseña Abraham en esta Parashá?",
        options: ["Hacer trampas", "La hospitalidad (recibir con amor a los invitados)", "Dormir la siesta"],
        answer: 1
      },
      {
        question: "¿Dónde vivían Abraham y Sara en el desierto?",
        options: ["En una tienda con las cuatro paredes abiertas", "En un castillo de piedra", "En un edificio moderno"],
        answer: 0
      },
      {
        question: "¿Cómo demostraron Abraham y Sara amor hacia los tres desconocidos?",
        options: ["Les cerraron la puerta", "Les ofrecieron agua, pan recién horneado y descanso", "Les pidieron monedas"],
        answer: 1
      }
    ],
    activities: {
      puppets: "**Guión - La Tienda Abierta:**\n*Personajes:* Abraham, Sara y un Títere de Ovejita del desierto.\n- *Abraham:* ¡Uf, qué calor! Pero miren, ¡tres personas vienen cansadas!\n- *Sara:* Rápido, ovejita, ayúdame a traer harina. ¡Amasaremos pan fresco!\n- *Ovejita:* ¡Beeee! Yo traigo agua fresca para sus pies.\n- *Abraham:* ¡Pasen adelante, amigos! Nuestra tienda está abierta para todos.\n- *Sara:* En Shabateinu NBI abrimos las puertas con una gran sonrisa.",
      costumes: "**Taller de Disfraces:**\nMontar una 'tienda de campaña' en la sala con una sábana. Los niños usan túnicas simples (telas con un cordón) y actúan alternándose entre ser anfitriones que sirven jugo y galletas de Shabat, y viajeros cansados.",
      song: "**Canción - Tienda Abierta (Melodía de bienvenida):**\n*Letra:*\nCuatro lados abiertos tiene mi hogar,\npara que el viajero pueda descansar.\nPan con cariño, agua y amor,\n¡bienvenidos todos, es un día mejor!\n*Coro:*\nAjnasat Orjim, valor celestial,\nrecibir con sonrisas a todos en Shabat."
    }
  },
  "ChayeiSara": { name: "Jayei Sara", hebrew: "חיי שרה", book: "Bereshit (Génesis)" },
  "Toldot": { name: "Toledot", hebrew: "תולדות", book: "Bereshit (Génesis)" },
  "Vayetzei": { name: "Vayetze", hebrew: "ויצא", book: "Bereshit (Génesis)" },
  "Vayishlach": { name: "Vayishlaj", hebrew: "וישלח", book: "Bereshit (Génesis)" },
  "Vayeshev": { name: "Vayeshev", hebrew: "וישב", book: "Bereshit (Génesis)" },
  "Miketz": { name: "Miketz", hebrew: "מקץ", book: "Bereshit (Génesis)" },
  "Vayigash": { name: "Vayigash", hebrew: "ויגש", book: "Bereshit (Génesis)" },
  "Vayechi": { name: "Vayeji", hebrew: "ויחי", book: "Bereshit (Génesis)" },

  // ==========================================================================
  // LIBRO 2: SHEMOT (ÉXODO)
  // ==========================================================================
  "Shemot": {
    name: "Shemot",
    hebrew: "שמות",
    book: "Shemot (Éxodo)",
    summary: "¡Comienza el libro del Éxodo! El pueblo de Israel está en Egipto y trabaja muy duro bajo las órdenes del Faraón. Un bebé muy especial nace y su mamá lo coloca en una cestita en el río Nilo para protegerlo. La hija del Faraón lo encuentra y lo llama Moisés, que significa 'salvado de las aguas'. Moisés crece y Dios le habla a través de una Zarza Ardiente (un arbusto que brilla con fuego pero no se quema), pidiéndole que libere a su pueblo.",
    words: ["BEBE", "MOISES", "CESTA", "EGIPTO", "ZARZA", "LIBERTAD", "RIVER"],
    trivia: [
      {
        question: "¿Qué significa el nombre Moisés?",
        options: ["El rey de Egipto", "Salvado de las aguas", "Aquel que tiene fuerza"],
        answer: 1
      },
      {
        question: "¿Cómo se comunicó Dios con Moisés en el desierto por primera vez?",
        options: ["A través de una Zarza Ardiente que no se consumía", "En un mensaje escrito en piedra", "En un sueño"],
        answer: 0
      },
      {
        question: "¿Qué misión le encomendó Dios a Moisés?",
        options: ["Construir pirámides gigantes", "Liderar y liberar al pueblo de Israel de la esclavitud", "Ser el nuevo Faraón"],
        answer: 1
      }
    ],
    activities: {
      puppets: "**Guión - El Arbusto que Brilla:**\n*Personajes:* Títere de Moisés (con un bastón), Títere de Zarza Ardiente (decorado con cintas rojas/amarillas) y Títere de Ovejita.\n- *Moisés:* He caminado mucho con mis ovejas... ¡Pero miren! Ese arbusto brilla.\n- *Ovejita:* ¡Beeee! ¡Tiene fuego pero no se quema! ¡Es un milagro!\n- *Zarza:* ¡Moisés! Quítate las sandalias, estás en un lugar sagrado. Ve a Egipto y dile al Faraón: ¡Deja ir a mi pueblo!\n- *Moisés:* Con la ayuda de Dios, ¡traeremos libertad!",
      costumes: "**Taller de Disfraces:**\nLos niños usan un bastón de cartón y sandalias hechas de papel craft, representando a Moisés guiando al grupo a través de la sala.",
      song: "**Canción - Deja Ir a mi Pueblo (Gospel alegre):**\n*Letra:*\nMoisés en el desierto a una zarza se acercó,\nuna luz muy brillante del cielo descendió.\n'Quita tus sandalias, escucha mi voz,\nlibera a mi pueblo con la fuerza de Dios'.\n*Coro:*\n¡Libertad, libertad, cantamos con amor,\nen este Shabat levantamos la voz!"
    },
    storyPages: [
      { title: "Un Bebé en el Río", text: "El faraón de Egipto no quería a los israelitas. Pero una mamá valiente puso a su bebé en una canasta en el río Nilo para salvarlo. La princesa lo encontró y lo llamó Moshé.", emoji: "🧒" },
      { title: "La Zarza que Ardía sin Quemarse", text: "Moshé creció y un día vio algo increíble: un arbusto que ardía con fuego pero no se quemaba. Era Dios hablándole: '¡Moshé! Quítate las sandalias, estás en tierra sagrada.'", emoji: "🔥" },
      { title: "La Misión de Libertad", text: "Dios le dijo a Moshé: 'Ve al faraón y dile: ¡Shalaj et amí! ¡Deja ir a mi pueblo!' Moshé tenía miedo, pero Dios le prometió que estaría con él siempre.", emoji: "✊" },
      { title: "El Coraje de Creer", text: "Con la ayuda de Dios y su hermano Aarón, Moshé se presentó ante el faraón. Aunque era difícil, confió en Dios. La libertad estaba por llegar para todo el pueblo.", emoji: "⭐" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "משה", wordMeaning: "Moshé (Moisés)" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שמות", wordMeaning: "Nombres" },
      { letter: "פ", name: "Pe", sound: "P", word: "פרעה", wordMeaning: "Faraón" }
    ]
  },
  "Vaera": { name: "Vaera", hebrew: "וארא", book: "Shemot (Éxodo)" },
  "Bo": { name: "Bo", hebrew: "בא", book: "Shemot (Éxodo)" },
  "Beshalach": {
    name: "Beshalaj",
    hebrew: "בשלח",
    book: "Shemot (Éxodo)",
    summary: "¡El gran milagro del Mar Rojo! El pueblo de Israel sale de Egipto, pero el Faraón y su ejército los persiguen. Al llegar al mar, se sienten atrapados. Dios le dice a Moisés que levante su bastón, ¡y el mar se divide en dos murallas de agua, permitiendo que crucen a salvo por camino seco! Al llegar al otro lado, Miriam (la hermana de Moisés) saca su pandereta y lidera a todos en una hermosa danza de agradecimiento y alegría.",
    words: ["MAR", "MILAGRO", "BASTON", "MIRIAM", "DANZA", "PANDERETA", "LIBERTAD"],
    trivia: [
      {
        question: "¿Qué milagro ocurrió cuando Moisés levantó su bastón frente al mar?",
        options: ["El mar se congeló", "El agua se dividió en dos partes abriendo un camino seco", "Empezó a llover chocolate"],
        answer: 1
      },
      {
        question: "¿Quién lideró el canto y baile de agradecimiento después de cruzar a salvo?",
        options: ["El Faraón", "Moisés solo", "Miriam con su pandereta y las mujeres"],
        answer: 2
      },
      {
        question: "¿Cómo se llama la hermosa canción de agradecimiento que cantaron?",
        options: ["Shabat Shalom", "Shirat Hayam (Canto del Mar)", "Hatikvá"],
        answer: 1
      }
    ],
    activities: {
      puppets: "**Guión - El Canto del Mar:**\n*Personajes:* Títere de Moisés, Títere de Miriam y Títere de Pececito alegre.\n- *Moisés:* ¡El mar se abrió! ¡Cruzamos a salvo!\n- *Pececito:* ¡Hola amigos! Los vi pasar caminando y no se mojaron los pies. ¡Qué gran milagro!\n- *Miriam:* ¡Sí! Dios nos cuidó. ¡Suelten sus panderetas! ¡Vamos a cantar y bailar de alegría!\n- *Moisés y Miriam:* ¡Canten a Dios, que hizo grandes maravillas!",
      costumes: "**Taller de Disfraces:**\nLos niños decoran platos de cartón con cascabeles y cintas de colores para hacer sus propias 'panderetas de Miriam' y bailar alrededor de la sala simulando cruzar el mar.",
      song: "**Canción - Shirat Hayam (Canto del Mar infantil):**\n*Letra:*\nMira el mar, se abrió el portal,\npor el camino seco vamos a caminar.\nMiriam canta, saca el tambor,\n¡agradecemos a Dios con todo el corazón!\n*Coro:*\n¡Sing a song, danza ya, en Shabateinu NBI!\nLibres somos hoy, cantando en Shabat aquí."
    },
    storyPages: [
      { title: "¡Salimos de Egipto!", text: "El pueblo de Israel caminó libre por el desierto. ¡Por fin eran libres! Pero atrás venía el ejército del faraón persiguiéndolos. El pueblo tenía miedo.", emoji: "🏃" },
      { title: "El Mar se Abre en Dos", text: "Llegaron al Mar Rojo y no podían cruzar. Moshé levantó su bastón y ¡el mar se abrió en dos! Caminaron por tierra seca entre dos paredes de agua. ¡Un milagro!", emoji: "🌊" },
      { title: "El Canto de Miriam", text: "Al llegar al otro lado, todos estaban a salvo. Miriam, la hermana de Moshé, tomó su pandereta y todas las mujeres bailaron y cantaron de alegría: ¡Shirat Hayam!", emoji: "🪘" },
      { title: "Dios Siempre Cuida", text: "En el desierto, Dios les envió maná del cielo para comer y agua de una roca. Aprendieron que Dios siempre cuida a su pueblo, especialmente en Shabat.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "ש", name: "Shin", sound: "Sh", word: "שירה", wordMeaning: "Canción" },
      { letter: "י", name: "Yod", sound: "Y", word: "ים", wordMeaning: "Mar" },
      { letter: "מ", name: "Mem", sound: "M", word: "מן", wordMeaning: "Maná" }
    ]
  },
  "Yitro": {
    name: "Yitro",
    hebrew: "יתרו",
    book: "Shemot (Éxodo)",
    summary: "¡El momento más emocionante en el Monte Sinaí! Dios entrega los Diez Mandamientos (los Aséret Hadibrot) escritos en dos tablas de piedra a Moisés y a todo el pueblo. Estos mandamientos nos enseñan a amar a Dios y a tratar a todas las personas con respeto, honestidad y cariño. Es el nacimiento de nuestras leyes como pueblo, y entre ellas, ¡Dios nos recuerda cuidar y santificar el Shabat!",
    words: ["SINAI", "TABLAS", "LEYES", "MANDAMIENTOS", "RESPETO", "PUEBLO", "MONTE"],
    trivia: [
      {
        question: "¿En qué montaña se entregaron los Diez Mandamientos?",
        options: ["En el Monte Sinaí", "En la cordillera de los Andes", "En el Monte Hermón"],
        answer: 0
      },
      {
        question: "¿Quién subió a la montaña para recibir las Tablas de la Ley?",
        options: ["Abraham", "Noaj", "Moisés"],
        answer: 2
      },
      {
        question: "¿Cuál de estos mandamientos está relacionado con el viernes por la noche?",
        options: ["Cuidar y recordar el Shabat", "Comer manzanas", "Correr velozmente"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Las Tablas del Sinaí:**\n*Personajes:* Títere de Moisés, Títere de Monte Sinaí (humilde con flores) y Títere de Ovejita.\n- *Ovejita:* Moisés, ¿por qué Dios eligió esta montaña tan bajita?\n- *Moisés:* Porque al Monte Sinaí le gusta ser humilde, ovejita. Dios ama la humildad.\n- *Monte Sinaí:* ¡Sí! Y en mi cumbre Dios nos dio el regalo de los Mandamientos.\n- *Moisés:* Mandamientos de amor, respeto y... ¡Shabat! ¡Qué gran alegría!",
      costumes: "**Taller de Disfraces:**\nLos niños confeccionan con cartulina gris sus propias 'Tablas de la Ley' y dibujan con marcador dorado las letras hebreas (Alef a Yod) que representan los 10 mandamientos.",
      song: "**Canción - En el Monte Sinaí:**\n*Letra:*\nEn el Monte Sinaí Dios nos dio la Torá,\ndiez leyes hermosas para actuar con bondad.\nRespeta a tus padres, di siempre la verdad,\ny nunca te olvides de amar el Shabat.\n*Coro:*\n¡La Torá es nuestro faro, luz y libertad!\nLa cantamos juntos en este Shabat."
    },
    storyPages: [
      { title: "Yitró Visita a Moshé", text: "Yitró, el suegro de Moshé, vino al campamento en el desierto. Vio que Moshé trabajaba mucho solo ayudando a la gente y le dijo: 'Necesitas ayuda, ¡organiza equipos!'", emoji: "👴" },
      { title: "El Monte Sinaí Tembló", text: "Todo el pueblo llegó al Monte Sinaí. El cielo se llenó de nubes, truenos y relámpagos. La montaña temblaba. ¡Dios iba a hablar con todo su pueblo!", emoji: "⛰️" },
      { title: "Los Diez Mandamientos", text: "Dios habló y les dio las Diez Reglas de Oro escritas en dos tablas de piedra: honrar a papá y mamá, no robar, no mentir, descansar en Shabat y muchas más.", emoji: "📜" },
      { title: "Haremos y Escucharemos", text: "El pueblo respondió unido: '¡Na'asé Venishmá! ¡Haremos y escucharemos!' Prometieron seguir la Torá con amor. Ese día recibimos el regalo más grande.", emoji: "💎" }
    ],
    alefBetLetters: [
      { letter: "ת", name: "Tav", sound: "T", word: "תורה", wordMeaning: "Torá" },
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "עשרת", wordMeaning: "Diez" },
      { letter: "ה", name: "He", sound: "H", word: "הר", wordMeaning: "Montaña" }
    ]
  },
  "Mishpatim": { name: "Mishpatim", hebrew: "משפטים", book: "Shemot (Éxodo)" },
  "Terumah": {
    name: "Terumah",
    hebrew: "תרומה",
    book: "Shemot (Éxodo)",
    summary: "Dios le pide al pueblo de Israel que construya un lugar muy especial para rezar y estar unidos: el Mishkán (Tabernáculo). Cada persona ayuda trayendo una ofrenda amorosa llamada 'Terumah', que puede ser oro, plata, maderas, telas de colores hermosos o aceite. Dios les dice: 'Construyan un santuario para mí, y yo habitaré en el corazón de cada uno de ustedes'. Aprendemos que cuando unimos nuestros esfuerzos, creamos cosas maravillosas.",
    words: ["OFRENDA", "MISHKAN", "CORAZON", "UNIDAD", "ORO", "TELAS", "DONACION"],
    trivia: [
      {
        question: "¿Qué significa la palabra 'Terumah'?",
        options: ["Una gran fiesta", "Una ofrenda o donación hecha con el corazón", "Una carrera"],
        answer: 1
      },
      {
        question: "¿Qué lugar especial construyeron los israelitas con sus ofrendas en el desierto?",
        options: ["Una gran sinagoga de ladrillo", "El Mishkán (Tabernáculo móvil)", "Un laberinto de arena"],
        answer: 1
      },
      {
        question: "¿Dónde prometió Dios habitar si hacían este santuario?",
        options: ["En el oro brillante", "Solo en el cielo lejano", "En el corazón de cada uno de ellos"],
        answer: 2
      }
    ],
    activities: {
      puppets: "**Guión - Ofrendas de Corazón:**\n*Personajes:* Títere de Costurera (con hilos), Títere de Carpintero (con martillo de papel) y Títere de Niño alegre.\n- *Costurera:* Yo traje telas azules y celestes preciosas para las cortinas.\n- *Carpintero:* Y yo maderas firmes para las columnas.\n- *Niño:* Yo no tengo oro ni plata... ¿Qué puedo dar yo?\n- *Costurera:* ¡Tu alegría y tus ganas de ayudar! Esa es la mejor Terumah.\n- *Niño:* ¡Siiii! Con mi corazón alegre, ¡Dios estará muy feliz de habitar con nosotros!",
      costumes: "**Taller de Disfraces:**\nTaller de manualidades cooperativo. Construir un mini-Mishkán con cajas de cartón recicladas, papeles dorados y telas. Cada niño es un 'constructor del santuario' y decora una parte con dibujos de amor y paz.",
      song: "**Canción - Terumah de Amor:**\n*Letra:*\nUn poquito de oro, un trozo de madera,\nponemos las manos todos de primera.\nEl Mishkán construimos con mucho fervor,\n¡ofrendas felices de puro amor!\n*Coro:*\nQue Dios habite en el corazón,\nen Shabateinu NBI cantamos la canción."
    }
  },
  "Tetzaveh": { name: "Tetzaveh", hebrew: "תצוה", book: "Shemot (Éxodo)" },
  "KiTisa": { name: "Ki Tisa", hebrew: "כי תשא", book: "Shemot (Éxodo)" },
  "Vayakhel": { name: "Vayakhel", hebrew: "ויקהל", book: "Shemot (Éxodo)" },
  "Pekudei": { name: "Pekudei", hebrew: "פקודי", book: "Shemot (Éxodo)" },

  // ==========================================================================
  // LIBRO 3: VAYIKRA (LEVÍTICO)
  // ==========================================================================
  "Vayikra": {
    name: "Vayikra",
    hebrew: "ויקרא",
    book: "Vayikra (Levítico)",
    summary: "¡Entramos al libro de Vayikra! Dios nos enseña a ser 'Kadosh' (santos o especiales) a través de nuestras acciones diarias. Dios nos pide realizar mitzvot (buenas acciones) como respetar a los ancianos, dejar alimentos para quienes lo necesitan, no decir mentiras y, sobre todo, 'Amarás a tu prójimo como a ti mismo' (Veahavtá Lereajá Kamoja). ¡Eso significa tratar a los demás exactamente como queremos que nos traten a nosotros!",
    words: ["KADOSH", "MITZVA", "AMOR", "PROJIMO", "RESPETO", "AYUDA", "VERDAD"],
    trivia: [
      {
        question: "¿Qué significa ser 'Kadosh' según la Torá?",
        options: ["Ser muy fuerte físicamente", "Ser especial y actuar con bondad y santidad", "Saber volar"],
        answer: 1
      },
      {
        question: "¿Cuál es el mandamiento de amor más importante de esta sección?",
        options: ["Comer galletas rápido", "Amarás a tu prójimo como a ti mismo", "Correr en la plaza"],
        answer: 1
      },
      {
        question: "¿Cómo podemos aplicar 'Veahavtá Lereajá Kamoja' en Shabateinu?",
        options: ["Compartiendo los juguetes y siendo amables con todos", "Ignorando a los nuevos", "Peleando por los lápices"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Compartir es una Mitzvá:**\n*Personajes:* Títere de Osito (con una manzana) y Títere de Conejito triste.\n- *Osito:* ¡Qué rica está mi manzana dulce!\n- *Conejito:* Hola Osito... Tengo un poquito de hambre y no tengo colación.\n- *Osito:* Mmm... La Torá dice 'Amarás a tu prójimo como a ti mismo'. ¡Eso significa que compartiré mi manzana contigo!\n- *Conejito:* ¡Muchas gracias, Osito! Eres un gran amigo de Shabateinu. ¡Qué dulce mitzvá!",
      costumes: "**Taller de Disfraces:**\nLos niños se colocan 'medallas de campeones de Mitzvot' hechas con círculos de cartulina y cintas, donde dibujan una buena acción que prometen realizar esa semana.",
      song: "**Canción - Veahavtá Lereajá:**\n*Letra:*\nSi a tu amigo tratas con amor,\nel mundo entero se llena de color.\nComparte tus juguetes, habla con la verdad,\n'Ama a tu prójimo', ¡ley de santidad!\n*Coro:*\n¡Veahavtá Lereajá Kamoja, sí!\nVivimos la Torá en la NBI aquí."
    }
  },
  "Tzav": { name: "Tzav", hebrew: "צו", book: "Vayikra (Levítico)" },
  "Shemini": { name: "Shemini", hebrew: "שמיני", book: "Vayikra (Levítico)" },
  "Tazria": { name: "Tazria", hebrew: "תזריע", book: "Vayikra (Levítico)" },
  "Metzora": { name: "Metzora", hebrew: "מצורע", book: "Vayikra (Levítico)" },
  "AchreiMot": { name: "Ajarei Mot", hebrew: "אחרי מות", book: "Vayikra (Levítico)" },
  "Kedoshim": { name: "Kedoshim", hebrew: "קדושים", book: "Vayikra (Levítico)" },
  "Emor": { name: "Emor", hebrew: "אמור", book: "Vayikra (Levítico)" },
  "Behar": { name: "Behar", hebrew: "בהר", book: "Vayikra (Levítico)" },
  "Bechukotai": { name: "Bechukotai", hebrew: "בחוקתי", book: "Vayikra (Levítico)" },

  // ==========================================================================
  // LIBRO 4: BAMIDBAR (NÚMEROS)
  // ==========================================================================
  "Bamidbar": {
    name: "Bamidbar",
    hebrew: "במדבר",
    book: "Bamidbar (Números)",
    summary: "¡Empezamos el libro de Bamidbar, que significa 'En el Desierto'! El pueblo de Israel está acampando de forma muy organizada alrededor del Mishkán. Cada una de las doce tribus de Israel tiene su propia bandera de color hermoso con su símbolo especial, y su propio lugar asignado para marchar en unidad. Aprendemos que aunque todos somos diferentes y tenemos nuestras propias banderas y características únicas, marchamos juntos como una sola gran familia.",
    words: ["DESIERTO", "TRIBUS", "BANDERAS", "UNIDAD", "CAMPAMENTO", "FAMILIA", "MARCHA"],
    trivia: [
      {
        question: "¿Qué significa la palabra hebrea 'Bamidbar'?",
        options: ["En el desierto", "En la playa", "En la montaña alta"],
        answer: 0
      },
      {
        question: "¿Qué tenía cada una de las 12 tribus para identificarse?",
        options: ["Un auto diferente", "Su propia bandera de color con su símbolo", "Un sombrero gigante"],
        answer: 1
      },
      {
        question: "¿Qué gran lección nos deja el campamento en Bamidbar?",
        options: ["Que debemos estar peleados", "Que la desorganización es buena", "Que aunque somos diferentes, cooperamos en unidad como una familia"],
        answer: 2
      }
    ],
    activities: {
      puppets: "**Guión - Nuestras Banderas:**\n*Personajes:* Títere de León (Tribu de Yehudá), Títere de Venado (Tribu de Naftalí) y Títere de Barquito (Tribu de Zabulón).\n- *León:* ¡Mi bandera tiene un león fuerte!\n- *Venado:* ¡Y la mía un venado veloz! Somos diferentes.\n- *Barquito:* Y la mía un barco para navegar por los mares. ¡Pero miren!\n- *León y Venado:* ¡Marchamos juntos en círculo alrededor de nuestra hermosa Torá!\n- *Barquito:* Sí, la diversidad nos hace fuertes. ¡Unidos en Shabateinu!",
      costumes: "**Taller de Disfraces:**\nLos niños diseñan y colorean su propia 'Bandera Personal / Familiar' en una hoja de papel pegada a un palito de helado, dibujando su animal, color o símbolo favorito, y luego marchan juntos cantando.",
      song: "**Canción - Marchando en Bamidbar:**\n*Letra:*\nBamidbar, Bamidbar, en el desierto van,\ndoce tribus unidas marchando bajo el sol.\nCada una con su color y su estandarte fiel,\njuntos caminamos como pueblo de Israel.\n*Coro:*\n¡Diversidad y unión en nuestra NBI!\nTodos de la mano, cantamos Shabat feliz."
    }
  },
  "Nasso": {
    name: "Nasso",
    hebrew: "נשא",
    book: "Bamidbar (Números)",
    summary: "¡Esta semana leemos Nasso, la porción más larga de toda la Torá! En esta maravillosa Parashá encontramos la Birkat Kohanim, la Bendición Sacerdotal que los sacerdotes (kohanim) recitan para bendecir a todo el pueblo de Israel con las hermosas palabras: 'Que Dios te bendiga y te guarde, que Dios haga brillar su rostro sobre ti y te dé paz'. También aprendemos cómo los líderes de cada tribu trajeron ofrendas especiales e iguales para inaugurar el Mishkán. ¡Cada ofrenda fue igual de importante, así como cada niño y cada familia en nuestra comunidad!",
    words: ["BENDICION", "KOHANIM", "PAZ", "OFRENDA", "TRIBU", "LIDERES", "MISHKAN", "SHALOM"],
    trivia: [
      {
        question: "¿Cómo se llama la bendición especial que los sacerdotes (kohanim) dan al pueblo?",
        options: ["Birkat Hamazon", "Birkat Kohanim (Bendición Sacerdotal)", "Kiddush de Shabat"],
        answer: 1
      },
      {
        question: "¿Qué deseo especial incluye la Birkat Kohanim para todos nosotros?",
        options: ["Que tengamos mucho dinero", "Que Dios nos bendiga, nos guarde y nos dé Shalom (paz)", "Que llueva chocolate"],
        answer: 1
      },
      {
        question: "¿Qué lección nos enseñan las ofrendas iguales de los líderes de las tribus?",
        options: ["Que unos son más importantes que otros", "Que cada persona y cada aporte es igual de valioso ante Dios", "Que solo los grandes pueden participar"],
        answer: 1
      }
    ],
    activities: {
      puppets: "**Guión - La Bendición de los Kohanim:**\n*Personajes:* Títere de Kohén (con manos levantadas), Títere de Niña curiosa y Títere de Palomita de Paz.\n- *Niña:* ¡Mira! El Kohén levanta las manos. ¿Qué está haciendo?\n- *Palomita:* Está bendiciendo a todo el pueblo con palabras muy especiales.\n- *Kohén:* '¡Que Dios te bendiga y te proteja! ¡Que Dios haga brillar su rostro sobre ti y te dé Shalom!'\n- *Niña:* ¡Qué hermoso! ¿Yo también puedo bendecir a mis amigos de Shabateinu?\n- *Kohén:* ¡Claro! Cuando deseas el bien a otros con amor, ¡estás bendiciendo el mundo!\n- *Palomita:* ¡Shabat Shalom para todos en la NBI!",
      costumes: "**Taller de Disfraces:**\nLos niños extienden sus manos como los Kohanim y practican bendiciendo a sus compañeros con las palabras de la Birkat Kohanim. Se pueden hacer 'mantas de bendición' con telas blancas (sábanas cortadas) decoradas con estrellas doradas, representando el Talit de los Kohanim.",
      song: "**Canción - Shalom Alejem Shabateinu (Melodía suave):**\n*Letra:*\nLevanto mis manos al cielo azul,\nbendigo a mis amigos con toda plenitud.\nQue Dios nos cuide, que brille su luz,\n¡y que la paz del Shabat nos llene de virtud!\n*Coro:*\n¡Shalom, Shalom, Shabateinu NBI!\nBendiciones y sonrisas compartimos aquí."
    },
    storyPages: [
      { title: "El Censo del Pueblo", text: "Dios le pidió a Moshé que contara a todas las familias de la tribu de Leví. Cada persona era importante y tenía una misión especial en el Tabernáculo sagrado.", emoji: "📋" },
      { title: "El Nazir: Una Promesa Especial", text: "Algunas personas hacían una promesa especial llamada Nazir: no cortarse el pelo y dedicarse completamente a Dios por un tiempo. Era una forma de acercarse a lo sagrado.", emoji: "✡️" },
      { title: "La Bendición de los Sacerdotes", text: "Dios enseñó a los sacerdotes (Kohanim) una bendición muy hermosa: 'Que Dios te bendiga y te guarde. Que haga brillar su rostro sobre ti y te dé paz.'", emoji: "🖖" },
      { title: "Regalos para el Tabernáculo", text: "Los líderes de cada tribu trajeron hermosos regalos para inaugurar el Tabernáculo: carros, animales y ofrendas. Cada regalo fue dado con amor y generosidad.", emoji: "🎁" }
    ],
    alefBetLetters: [
      { letter: "כ", name: "Kaf", sound: "K", word: "כהן", wordMeaning: "Sacerdote" },
      { letter: "ב", name: "Bet", sound: "B", word: "ברכה", wordMeaning: "Bendición" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שלום", wordMeaning: "Paz" }
    ]
  },
  "Beha'alotcha": { name: "Beha'alotja", hebrew: "בהעלותך", book: "Bamidbar (Números)" },
  "Sh'lach": { name: "Sh'lach", hebrew: "שלח־לך", book: "Bamidbar (Números)" },
  "Korach": { name: "Koraj", hebrew: "קרח", book: "Bamidbar (Números)" },
  "Chukat": { name: "Jukat", hebrew: "חקת", book: "Bamidbar (Números)" },
  "Balak": { name: "Balak", hebrew: "בלק", book: "Bamidbar (Números)" },
  "Pinchas": { name: "Pinjas", hebrew: "פנחס", book: "Bamidbar (Números)" },
  "Matot": { name: "Matot", hebrew: "מטות", book: "Bamidbar (Números)" },
  "Masei": { name: "Masei", hebrew: "מסעי", book: "Bamidbar (Números)" },

  // ==========================================================================
  // LIBRO 5: DEVARIM (DEUTERONOMIO)
  // ==========================================================================
  "Devarim": {
    name: "Devarim",
    hebrew: "דברים",
    book: "Devarim (Deuteronomio)",
    summary: "¡Llegamos al último libro de la Torá, Devarim! Moisés reúne a todo el pueblo para recordarles con mucho cariño todas las aventuras que vivieron en el desierto y repasar las hermosas enseñanzas de Dios. Les pide que guarden la Torá en su memoria y en sus corazones, y que les enseñen a sus hijos las bellas historias y mitzvot cuando estén en casa, cuando caminen por el trayecto, al acostarse y al levantarse. ¡Aquí encontramos las bellas palabras del Shemá Israel!",
    words: ["PALABRAS", "RECORDAR", "CORAZON", "SHEMA", "HISTORIAS", "ENSEÑAR", "AMOR"],
    trivia: [
      {
        question: "¿Qué hace Moisés en el libro de Devarim?",
        options: ["Pelear con los israelitas", "Reunir al pueblo para recordar las historias y leyes de Dios con amor", "Irse de vacaciones"],
        answer: 1
      },
      {
        question: "¿A quiénes les debemos enseñar las bellas palabras de la Torá?",
        options: ["A los gatitos de la calle", "A nuestros hijos y amigos más pequeños", "A nadie"],
        answer: 1
      },
      {
        question: "¿Qué oración muy importante del pueblo judío se encuentra en Devarim?",
        options: ["El Shemá Israel", "El feliz cumpleaños", "El cantar de los cantares"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Palabras del Corazón:**\n*Personajes:* Moisés anciano (con barba blanca muy tierna) y un Títere de Niño atento.\n- *Moisés:* Querido niño, he guiado al pueblo por 40 años... Ahora les toca a ustedes.\n- *Niño:* Moisés, ¿cómo recordaremos todo en la nueva tierra?\n- *Moisés:* Guarda estas palabras en tu corazón, enséñalas al levantarte y acostarte. ¡Escucha Israel, Dios es uno!\n- *Niño:* ¡El Shemá Israel! Lo cantaremos siempre con orgullo en Shabateinu.",
      costumes: "**Taller de Disfraces:**\nFabricar un 'Estuche de Mezuzá' de cartulina donde los niños escriban o dibujen su valor o bendición favorita en un minipergamino interior para colgar en la puerta de su habitación.",
      song: "**Canción - Shemá Infantil:**\n*Letra:*\nEscucha Israel, Dios es nuestro Dios,\nDios es Uno solo, nos da su bendición.\nEn el corazón guardo su Torá,\ncanto Shabateinu lleno de hermandad.\n*Coro:*\n¡Shemá Israel, cantamos con amor!\nUnidos en Santiago, un solo corazón."
    },
    storyPages: [
      { title: "Las Últimas Palabras de Moshé", text: "Moisés reúne a todo el pueblo de Israel en el desierto para darles sus últimos y más cariñosos consejos. Les recuerda todas las aventuras y milagros que vivieron juntos durante su viaje hacia la Tierra Prometida.", emoji: "👴" },
      { title: "El Shemá Israel: Dios es Uno", text: "Moisés les enseña la oración más importante: ¡Shemá Israel! Les pide que amen a Dios con todo su corazón y con toda su alma, y que recuerden que Dios siempre nos acompaña.", emoji: "❤️" },
      { title: "Enseñar a los Más Pequeños", text: "Moisés les dice a los padres: 'Enseñen estas hermosas palabras e historias a sus niños cuando estén en casa, cuando caminen por el camino, al acostarse y al levantarse.' Así, las enseñanzas vivirán por siempre.", emoji: "🧒" },
      { title: "Cuidar las Mezuzot en las Puertas", text: "También les pide escribir estas palabras en los marcos de las puertas de sus casas (Mezuzá) para recordar siempre actuar con bondad y amor en su hogar y con cada persona.", emoji: "🚪" }
    ],
    alefBetLetters: [
      { letter: "ד", name: "Dalet", sound: "D", word: "דברים", wordMeaning: "Devarim (Palabras)" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שמע", wordMeaning: "Shemá (Escucha)" },
      { letter: "מ", name: "Mem", sound: "M", word: "מזוזה", wordMeaning: "Mezuzá" }
    ]
  },
  "Vaetchanan": { name: "Vaetjanan", hebrew: "ואתחנן", book: "Devarim (Deuteronomio)" },
  "Eikev": { name: "Eikev", hebrew: "עקב", book: "Devarim (Deuteronomio)" },
  "Re'eh": { name: "Re'eh", hebrew: "ראה", book: "Devarim (Deuteronomio)" },
  "Shoftim": { name: "Shoftim", hebrew: "שופטים", book: "Devarim (Deuteronomio)" },
  "KiTeitzei": { name: "Ki Teitzei", hebrew: "כי teitzei", book: "Devarim (Deuteronomio)" },
  "KiTavo": { name: "Ki Tavo", hebrew: "כי תבוא", book: "Devarim (Deuteronomio)" },
  "Nitzavim": { name: "Nitzavim", hebrew: "נצבים", book: "Devarim (Deuteronomio)" },
  "Vayeilech": { name: "Vayeilej", hebrew: "וילך", book: "Devarim (Deuteronomio)" },
  "Ha'azinu": { name: "Ha'azinu", hebrew: "האזינו", book: "Devarim (Deuteronomio)" },
  "VZotHaBerachah": { name: "V'Zot HaBerajot", hebrew: "וזאת הברכה", book: "Devarim (Deuteronomio)" }
};

/**
 * Función que genera dinámicamente datos de fallback completos para cualquier Parashá.
 * Mantiene la plataforma activa en su totalidad, incluso para esqueletos de la Torá.
 */
function getParashaData(parashaName) {
  // 1. Intento directo por clave exacta
  let base = PARASHOT_DB[parashaName];
  
  if (!base) {
    // 2. Buscar por nombre display (p.name) con normalización
    const normalize = (s) => s.replace(/[\u0300-\u036f''`\-\s]/g, '').toLowerCase();
    const normalized = normalize(parashaName);
    
    for (const key in PARASHOT_DB) {
      const entry = PARASHOT_DB[key];
      const keyNorm = normalize(key);
      const nameNorm = normalize(entry.name);
      
      if (keyNorm === normalized || nameNorm === normalized) {
        base = entry;
        break;
      }
    }
  }
  
  if (!base) {
    // 3. Búsqueda parcial (contiene) para nombres compuestos como "Ki Tisa" → "KiTisa"
    const partialNorm = parashaName.replace(/[\s\-''`]/g, '').toLowerCase();
    for (const key in PARASHOT_DB) {
      const keyClean = key.replace(/[\s\-''`]/g, '').toLowerCase();
      if (keyClean.includes(partialNorm) || partialNorm.includes(keyClean)) {
        base = PARASHOT_DB[key];
        break;
      }
    }
  }

  // 2. Si no existe en absoluto, crear un esqueleto genérico por defecto
  if (!base) {
    base = {
      name: parashaName,
      hebrew: parashaName,
      book: "Torá (Enseñanzas de Shabat)"
    };
  }

  // 3. Rellenar campos faltantes con pedagogía y valores didácticos (Jésed, Mitzvot, Tzedaká)
  const pName = base.name || parashaName;
  const pHeb = base.hebrew || parashaName;
  const pBook = base.book || "Torá (Enseñanzas de Shabat)";

  return {
    name: pName,
    hebrew: pHeb,
    book: pBook,
    summary: base.summary || `¡Esta semana leemos la Parashá ${pName}! En esta hermosa porción de la Torá, Dios nos enseña valiosas mitzvot (buenas acciones) y nos recuerda actuar con amor, paciencia y empatía hacia cada persona de nuestro entorno. En Shabateinu NBI nos reunimos para conversar sobre estas leyes, cantar juntos las bendiciones y llenar la sinagoga de risas y alegría en Shabat.`,
    words: base.words || ["BONDAD", "MITZVA", "SHABAT", "TORAH", "NBI", "SANTIAGO", "AMISTAD", "ALEGRIA"],
    trivia: base.trivia || [
      {
        question: `¿Qué hermosa enseñanza recordamos especialmente en la Parashá ${pName}?`,
        options: ["Actuar siempre con bondad, respeto y empatía hacia todos", "Estar enojados con los compañeros", "Hacer travesuras en el patio"],
        answer: 0
      },
      {
        question: "¿Cómo podemos demostrar los valores de nuestra Torá en Shabateinu?",
        options: ["Compartiendo con alegría, jugando unidos y cantando juntos", "Comiendo dulces a escondidas", "Ignorando a los demás"],
        answer: 0
      },
      {
        question: "¿Qué es una 'Mitzvá'?",
        options: ["Una buena acción que ayuda a mejorar el mundo y hacer felices a otros", "Un juego de cartas del desierto", "Una comida típica"],
        answer: 0
      }
    ],
    activities: base.activities || {
      puppets: `**Guión - La Luz de la Parashá:**\n*Personajes:* Títere de Sabio (con lentes graciosos) y Títere de Niño curioso.\n- *Niño:* ¡Profesor! Esta semana leemos la Parashá ${pName}. ¿De qué se trata?\n- *Sabio:* ¡Ah! Nos enseña que cada pequeña buena acción que haces brilla como una vela en la oscuridad.\n- *Niño:* ¡Qué lindo! Entonces si comparto mis juguetes y soy amable en la NBI hoy, ¿estoy encendiendo una luz?\n- *Sabio:* ¡Absolutamente! Eso es vivir nuestra Torá. ¡Shabat Shalom!`,
      costumes: "**Taller de Disfraces:**\nLos niños diseñan 'Coronas de Luz' con cartulina y papel celofán brillante para representar la luz espiritual que cada uno aporta a la comunidad de Shabateinu al hacer Mitzvot.",
      song: `**Canción - La Luz de ${pName}:**\n*Letra:*\nEsta semana leemos con afán,\nla bella Parashá que nos guiará.\nCon buenas acciones el mundo brilla más,\n¡unidos como hermanos cantando en Shabat!\n*Coro:*\n¡Shabateinu NBI, cantamos con pasión!\nLlenando el desierto de risas y unión.`
    },
    storyPages: base.storyPages || [
      { title: "El Comienzo de Nuestra Historia", text: `Esta semana leemos la Parashá ${pName}. Es una porción especial de la Torá que nos enseña valores importantes para nuestra vida.`, emoji: "📖" },
      { title: "La Enseñanza Principal", text: "Cada Parashá nos recuerda ser buenos, amables y generosos con todos. Las mitzvot (buenas acciones) hacen del mundo un lugar mejor.", emoji: "💡" },
      { title: "Viviendo los Valores", text: "Podemos practicar las enseñanzas de la Torá cada día: ayudando en casa, compartiendo con amigos y siendo respetuosos con todos.", emoji: "🌟" },
      { title: "¡Shabat Shalom!", text: "Y cuando llega el viernes, encendemos las velas, bendecimos el pan y el vino, y disfrutamos juntos en familia este día tan especial.", emoji: "🕯️" }
    ],
    alefBetLetters: base.alefBetLetters || [
      { letter: "ש", name: "Shin", sound: "Sh", word: "שבת", wordMeaning: "Shabat" },
      { letter: "ת", name: "Tav", sound: "T", word: "תורה", wordMeaning: "Torá" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אהבה", wordMeaning: "Amor" }
    ]
  };
}
