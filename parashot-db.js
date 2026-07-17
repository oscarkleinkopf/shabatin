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
  "ChayeiSara": {
    name: "Jayei Sara",
    hebrew: "חיי שרה",
    book: "Bereshit (Génesis)",
    summary: "Esta parashá relata la búsqueda de una esposa con buen corazón para Isaac. Eliezer, el servidor de Abraham, encuentra a Rebeca junto al pozo porque ella muestra una gran bondad al ofrecerle agua a él y a todos sus camellos.",
    words: ["SARA", "REBECA", "ISAAC", "ELIEZER", "POZO", "CAMELLOS", "BONDAD", "AMOR"],
    trivia: [
      {
        question: "¿Quién fue a buscar una esposa para Isaac?",
        options: ["Eliezer", "Abraham", "Jacob"],
        answer: 0
      },
      {
        question: "¿Por qué destacó Rebeca junto al pozo?",
        options: ["Porque fue muy bondadosa y dio de beber a Eliezer y a sus camellos", "Porque cantaba muy fuerte", "Porque corría rápido"],
        answer: 0
      },
      {
        question: "¿De quién fue esposa Rebeca al final?",
        options: ["Esposa de Isaac", "Esposa de Abraham", "Esposa de Noaj"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Pozo de la Bondad:**\n*Personajes:* Eliezer (viajero cansado), Rebeca (joven alegre) y Camello tierno.\n- *Eliezer:* ¡Uf, qué viaje tan largo por el desierto! Tengo mucha sed y mis camellos también.\n- *Rebeca:* ¡Hola, viajero! No te preocupes, yo sacaré agua fresca del pozo para ti.\n- *Camello:* ¡Glup, glup! ¡Gracias, Rebeca! ¡Qué amable eres!\n- *Eliezer:* Tu gran corazón demuestra que eres la persona especial que estábamos buscando. ¡Qué hermosa mitzvá!",
      costumes: "**Taller de Manualidades:**\nConstruir un pequeño pozo con un vaso de plástico decorado con piedras dibujadas. Los niños usan hilos de lana azul para simular el agua y actúan ofreciendo 'agua de la bondad' a sus compañeros.",
      song: "**Canción - El Pozo de Rebeca:**\n*Letra:*\nJunto al pozo de agua clara Rebeca sonrió,\na los camellos cansados agua les ofreció.\nCon paciencia y cariño a todos ayudó,\n¡y con su bondad el corazón nos alegró!\n*Coro:*\n¡Bondad y alegría, compartir en Shabat!\nEn Shabateinu NBI cantamos en paz."
    },
    storyPages: [
      { title: "El Recuerdo de Sara", text: "Sara, la mamá de Isaac, vivió una vida llena de buenas acciones y amor. Abraham quería que Isaac continuara con este hermoso legado familiar.", emoji: "👵" },
      { title: "El Viaje de Eliezer", text: "Abraham envió a su servidor Eliezer con diez camellos a buscar una esposa especial para Isaac. Eliezer rezó para encontrar a alguien con un corazón generoso.", emoji: "🐪" },
      { title: "Rebeca y los Camellos", text: "Al llegar a un pozo, Eliezer vio a Rebeca. Ella no solo le dio agua a él, sino que con una gran sonrisa sacó agua para todos sus camellos hambrientos.", emoji: "💧" },
      { title: "Una Nueva Familia", text: "Eliezer supo que Rebeca era la indicada por su gran bondad. Rebeca viajó para casarse con Isaac, trayendo nuevamente alegría y paz a su tienda.", emoji: "👰" }
    ],
    alefBetLetters: [
      { letter: "ב", name: "Bet", sound: "B", word: "באר", wordMeaning: "Pozo" },
      { letter: "ג", name: "Gimel", sound: "G", word: "גמל", wordMeaning: "Camello" },
      { letter: "ח", name: "Jet", sound: "J", word: "חסد", wordMeaning: "Bondad" }
    ]
  },
  "Toldot": {
    name: "Toledot",
    hebrew: "תולדות",
    book: "Bereshit (Génesis)",
    summary: "Isaac y Rebeca tienen dos hijos mellizos muy diferentes: Esaú, a quien le gusta el campo, y Jacob, quien prefiere estudiar en la tienda. Nos enseña a valorar y querer a cada hijo y amigo por lo que es, apreciando sus talentos únicos.",
    words: ["MELLIZOS", "JACOB", "ESAU", "TIENDA", "TALENTOS", "BENDICION", "PADRES", "HERMANOS"],
    trivia: [
      {
        question: "¿Cómo se llamaban los dos hijos mellizos de Isaac y Rebeca?",
        options: ["Jacob y Esaú", "Isaac e Ismael", "Efraín y Menashé"],
        answer: 0
      },
      {
        question: "¿Qué le gustaba hacer a Jacob?",
        options: ["Estudiar y estar tranquilo en la tienda", "Cazar animales en el bosque", "Navegar en barcos"],
        answer: 0
      },
      {
        question: "¿Qué nos enseña esta parashá sobre los talentos de las personas?",
        options: ["Que todos somos diferentes y valiosos con nuestros propios dones", "Que todos debemos ser iguales", "Que solo uno es mejor"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Dos Hermanos Diferentes:**\n*Personajes:* Títere de Jacob (tranquilo con un libro de papel), Títere de Esaú (alegre con un arco de juguete) y Títere de Mamá Rebeca.\n- *Esaú:* ¡Hola! Me encanta correr por el bosque y jugar bajo el sol.\n- *Jacob:* A mí me gusta estar en la tienda, leer y conversar en familia.\n- *Rebeca:* Mis queridos hijos, los dos son muy diferentes, ¡pero los amo con todo mi corazón por igual!\n- *Esaú y Jacob:* ¡Sí! Cada uno tiene su propio talento para hacer el bien en Shabateinu NBI.",
      costumes: "**Taller de Clasificación Dinámica:**\n'El árbol de mis talentos'. Los niños dibujan en una manzana de papel su actividad favorita (dibujar, cantar, ayudar, estudiar) y la pegan en un gran árbol dibujado en la pared.",
      song: "**Canción - Somos Diferentes:**\n*Letra:*\nJacob en la tienda prefiere estudiar,\nEsaú por el campo prefiere jugar.\nAunque somos diferentes, nos queremos igual,\n¡cada uno con su don alegra este Shabat!\n*Coro:*\n¡Diferentes y unidos, qué hermoso es convivir!\nEn Shabateinu NBI cantamos al vivir."
    },
    storyPages: [
      { title: "Dos Bebés Especiales", text: "Isaac y Rebeca rezaron mucho y Dios les regaló dos hijos mellizos: Esaú y Jacob. Desde pequeños demostraron tener gustos y personalidades muy distintas.", emoji: "👶" },
      { title: "Esaú, el Explorador", text: "Esaú creció siendo un joven fuerte y activo a quien le encantaba explorar los campos, correr bajo el sol y cazar en el bosque.", emoji: "🏹" },
      { title: "Jacob, el Estudiante", text: "Jacob era un joven tranquilo y reflexivo. Le gustaba quedarse en las tiendas para estudiar, ayudar a sus padres y conversar sobre las enseñanzas de Dios.", emoji: "📚" },
      { title: "El Regalo de la Bendición", text: "A pesar de sus diferencias y algunos desacuerdos, aprendemos que Dios tiene un plan especial para cada uno y que las bendiciones familiares son muy valiosas.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אח", wordMeaning: "Hermano" },
      { letter: "ב", name: "Bet", sound: "B", word: "ברכה", wordMeaning: "Bendición" },
      { letter: "ת", name: "Tav", sound: "T", word: "תולדות", wordMeaning: "Generaciones" }
    ]
  },
  "Vayetzei": {
    name: "Vayetze",
    hebrew: "ויצא",
    book: "Bereshit (Génesis)",
    summary: "Jacob emprende un viaje y se queda a dormir en el desierto usando una piedra como almohada. Sueña con una escalera gigante que llega al cielo por la que suben y bajan ángeles, recordándonos que Dios nos cuida dondequiera que vayamos.",
    words: ["ESCALERA", "ANGELES", "SUEÑO", "PIEDRA", "VIAJE", "CUIDADO", "CIELO", "JACOB"],
    trivia: [
      {
        question: "¿Con qué soñó Jacob mientras dormía en el desierto?",
        options: ["Con una escalera gigante que llegaba al cielo con ángeles", "Con un gran barco en el mar", "Con un banquete de dulces"],
        answer: 0
      },
      {
        question: "¿Qué usó Jacob como almohada para descansar esa noche?",
        options: ["Una piedra lisa del suelo", "Un almohadón de plumas", "Su mochila de viaje"],
        answer: 0
      },
      {
        question: "¿Qué le prometió Dios a Jacob en el sueño?",
        options: ["Que lo cuidaría y lo acompañaría en cualquier lugar a donde fuera", "Que le daría una espada de oro", "Que ganaría una carrera"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Sueño de la Escalera:**\n*Personajes:* Títere de Jacob (con una almohada de cartón), Títere de Ángel 1 y Títere de Ángel 2.\n- *Jacob:* Qué cansado estoy. Usaré esta piedra como almohada... ¡Buenas noches! (Se duerme).\n- *Ángel 1:* ¡Miren! Subamos por esta escalera mágica hacia el cielo.\n- *Ángel 2:* ¡Y bajemos para cuidar el sueño de Jacob! Dios está aquí con él.\n- *Jacob:* (Se despierta). ¡Wow! ¡Qué lugar tan especial! Dios realmente me cuida en todo momento.",
      costumes: "**Taller de Manualidades:**\n'La Escalera de los Ángeles'. Usando palitos de helado, los niños construyen una pequeña escalera y le pegan nubes de algodón y angelitos de papel en los peldaños.",
      song: "**Canción - La Escalera de Jacob:**\n*Letra:*\nUna gran escalera en el sueño apareció,\npor donde suben ángeles con la luz del sol.\nAunque duermas en la piedra o en tu cómodo hogar,\n¡el amor de Dios siempre te va a acompañar!\n*Coro:*\n¡Ángeles de paz, cuidado celestial!\nEn Shabateinu NBI cantamos en Shabat."
    },
    storyPages: [
      { title: "El Viaje de Jacob", text: "Jacob tuvo que viajar a una tierra lejana para visitar a su familia. Al caer la noche en el desierto, tomó una piedra del suelo como almohada y se durmió.", emoji: "🚶" },
      { title: "La Escalera Celestial", text: "En su sueño, Jacob vio una escalera enorme apoyada en la tierra que tocaba el cielo. Ángeles de Dios subían y bajaban por ella con alas brillantes.", emoji: "🪜" },
      { title: "La Promesa de Dios", text: "Desde lo alto, Dios le habló con dulzura: 'Yo soy el Dios de Abraham e Isaac. Estaré contigo, te cuidaré dondequiera que vayas y te traeré de vuelta a casa.'", emoji: "💭" },
      { title: "Un Lugar Asombroso", text: "Al despertar, Jacob exclamó: '¡Qué asombroso es este lugar! Dios está aquí y yo no lo sabía.' Confiado en la promesa, continuó su viaje con gran alegría.", emoji: "⛰️" }
    ],
    alefBetLetters: [
      { letter: "ס", name: "Samej", sound: "S", word: "סולם", wordMeaning: "Escalera" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אבן", wordMeaning: "Piedra" },
      { letter: "מ", name: "Mem", sound: "M", word: "מלאך", wordMeaning: "Ángel" }
    ]
  },
  "Vayishlach": {
    name: "Vayishlaj",
    hebrew: "וישלח",
    book: "Bereshit (Génesis)",
    summary: "Después de muchos años, Jacob regresa a casa y se prepara para reencontrarse con su hermano Esaú. En lugar de pelear, los dos hermanos corren a abrazarse y llorar de alegría, enseñándonos el valor de la reconciliación y la paz familiar.",
    words: ["ABRAZO", "RECONCILIACION", "PAZ", "HERMANOS", "REGRESO", "REGALOS", "ENCUENTRO", "PERDON"],
    trivia: [
      {
        question: "¿Cómo reaccionaron Jacob y Esaú al reencontrarse después de tantos años?",
        options: ["Corrieron a abrazarse, besarse y llorar de alegría", "Se enojaron y gritaron", "Se ignoraron por completo"],
        answer: 0
      },
      {
        question: "¿Qué envió Jacob por delante para demostrarle cariño y respeto a su hermano Esaú?",
        options: ["Muchos regalos y animales del campo", "Una carta de reclamo", "Nada"],
        answer: 0
      },
      {
        question: "¿Qué gran valor nos enseña este reencuentro familiar?",
        options: ["Que el perdón y el amor familiar son más fuertes que cualquier enojo pasado", "A guardar rencor", "A pelear por los juguetes"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Abrazo de la Paz:**\n*Personajes:* Títere de Jacob (nervioso), Títere de Esaú (emocionado) y Títere de Ovejita mediadora.\n- *Jacob:* Ay, tengo miedo. ¿Estará enojado mi hermano Esaú después de tanto tiempo?\n- *Ovejita:* ¡No te preocupes, Jacob! Los hermanos siempre se quieren en el fondo.\n- *Esaú:* ¡Jacob! ¡Hermano mío! (Corre hacia él).\n- *Jacob:* ¡Esaú! ¡Qué alegría verle! ¡Perdóname por el pasado!\n- *Esaú:* ¡Te perdono con todo mi corazón! ¡Démonos un fuerte abrazo de Shabat!",
      costumes: "**Taller de Manualidades / Juego Dinámico:**\n'El círculo del abrazo'. Los niños forman un círculo y se pasan un peluche de ovejita. Al recibirlo, deben decir una palabra bonita o un deseo de paz para el compañero de al lado.",
      song: "**Canción - El Abrazo de Hermanos:**\n*Letra:*\nJacob y Esaú se volvieron a encontrar,\nel miedo y el enojo decidieron olvidar.\nCorrieron a abrazarse con fuerza y con amor,\n¡el perdón es el camino que alegra al Creador!\n*Coro:*\n¡Paz y perdón en este Shabat!\nEn Shabateinu NBI cantamos en hermandad."
    },
    storyPages: [
      { title: "El Temor al Encuentro", text: "Jacob volvía a su hogar con su esposa e hijos. Sabía que se encontraría con Esaú y se sentía nervioso por los viejos problemas del pasado.", emoji: "🚶" },
      { title: "Regalos de Amistad", text: "Para demostrarle a Esaú que venía en paz, Jacob le envió hermosos regalos de ovejas, camellos y vacas, queriendo ablandar el corazón de su hermano.", emoji: "🎁" },
      { title: "El Gran Abrazo", text: "Cuando Esaú vio a Jacob, corrió hacia él con los brazos abiertos. En lugar de discutir, ¡lo abrazó fuerte, lo besó y ambos lloraron de felicidad!", emoji: "🫂" },
      { title: "Hacer las Paces", text: "Esaú y Jacob caminaron juntos en paz. Esta historia nos enseña que el perdón y el amor familiar pueden curar cualquier distancia y traer gran Shalom.", emoji: "🕊️" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "מתנה", wordMeaning: "Regalo" },
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "עשו", wordMeaning: "Esaú" },
      { letter: "י", name: "Yod", sound: "Y", word: "יעקב", wordMeaning: "Jacob" }
    ]
  },
  "Vayeshev": {
    name: "Vayeshev",
    hebrew: "וישב",
    book: "Bereshit (Génesis)",
    summary: "José recibe de su papá una hermosa túnica de muchos colores. Aunque sus hermanos sienten celos de sus sueños y de su túnica, la historia nos enseña que Dios siempre acompaña a José y tiene un plan especial lleno de bondad para él.",
    words: ["TUNICA", "COLORES", "JOSE", "SUEÑOS", "HERMANOS", "ESTRELLAS", "CELES", "PLAN"],
    trivia: [
      {
        question: "¿Qué regalo especial le dio Jacob a su hijo favorito José?",
        options: ["Una hermosa túnica de muchos colores", "Un escudo de plata", "Un libro de cuentos"],
        answer: 0
      },
      {
        question: "¿Con qué soñó José en esta parashá?",
        options: ["Con el sol, la luna y once estrellas que se inclinaban ante él", "Con un gran árbol de manzanas", "Con un viaje en alfombra mágica"],
        answer: 0
      },
      {
        question: "¿Qué valor debemos cuidar cuando sentimos celos de los logros de un amigo?",
        options: ["Aprender a alegrarnos por los éxitos de los demás y cooperar con amor", "Enojarnos más", "No jugar con ellos"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - La Túnica de Colores:**\n*Personajes:* Títere de José (con una túnica de papel de muchos colores), Títere de Hermano celoso y Títere de Ovejita sabia.\n- *José:* ¡Miren qué linda túnica me regaló mi papá! Tiene rojo, azul, verde y amarillo.\n- *Hermano:* ¡Bah! ¿Por qué José tiene una túnica tan colorida y nosotros no?\n- *Ovejita:* ¡Beeee! Los celos no hacen bien al corazón. Cada hermano es especial a su manera.\n- *José:* Sí, hermanos, yo los quiero mucho. Mis sueños significan que todos nos ayudaremos en el futuro.\n- *Hermano:* Tienes razón. Aprendemos a alegrarnos por ti en Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'La túnica de José'. Los niños decoran una silueta de túnica en una cartulina blanca usando papeles de colores rasgados, pegatinas y purpurina para hacerla brillar.",
      song: "**Canción - La Túnica de José:**\n*Letra:*\nRojo, verde, azul y amarillo también,\nes la túnica hermosa que le queda muy bien.\nJosé sueña con estrellas brillando en el edén,\n¡y con la ayuda de Dios todo saldrá muy bien!\n*Coro:*\n¡Muchos colores de amor y amistad!\nEn Shabateinu NBI cantamos en Shabat."
    },
    storyPages: [
      { title: "El Regalo de Jacob", text: "Jacob quería mucho a su hijo José y le regaló una preciosa túnica tejida con hilos de muchos colores. José la usaba con mucha alegría y orgullo.", emoji: "🧥" },
      { title: "Los Sueños de José", text: "José tuvo sueños muy especiales. En uno de ellos, el sol, la luna y once estrellas brillaban y se inclinaban ante él, representando a su familia.", emoji: "⭐" },
      { title: "Los Celos de los Hermanos", text: "Sus hermanos mayores sintieron celos de sus sueños y de su túnica de colores. Los celos son un sentimiento difícil que debemos aprender a calmar con amor.", emoji: "😢" },
      { title: "Dios Acompaña a José", text: "Aunque José tuvo que viajar lejos a Egipto debido a los problemas con sus hermanos, Dios siempre estuvo a su lado protegiéndolo y dándole gran sabiduría.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "כ", name: "Jaf", sound: "J", word: "כתונת", wordMeaning: "Túnica" },
      { letter: "צ", name: "Tzadi", sound: "Tz", word: "צבע", wordMeaning: "Color" },
      { letter: "י", name: "Yod", sound: "Y", word: "יוסף", wordMeaning: "José" }
    ]
  },
  "Miketz": {
    name: "Miketz",
    hebrew: "מקץ",
    book: "Bereshit (Génesis)",
    summary: "José interpreta los extraños sueños del Faraón sobre vacas gordas y vacas flacas. Gracias a su sabiduría, ayuda a Egipto a guardar suficiente trigo durante los años buenos para que nadie pase hambre en los años difíciles.",
    words: ["SUEÑOS", "SABIDURIA", "TRIGO", "VACAS", "EGIPTO", "FARAON", "ALMACEN", "PLANIFICACION"],
    trivia: [
      {
        question: "¿Con qué soñó el Faraón en esta parashá?",
        options: ["Con siete vacas gordas y siete vacas flacas", "Con estrellas de colores", "Con un gran león parlante"],
        answer: 0
      },
      {
        question: "¿Qué solución propuso José para evitar el hambre en Egipto?",
        options: ["Guardar una parte del trigo en almacenes durante los años de abundancia", "Comprar dulces", "Ir a buscar agua al mar"],
        answer: 0
      },
      {
        question: "¿Qué gran talento demostró José ante el Faraón?",
        options: ["La sabiduría para planificar el futuro y ayudar a las personas", "Saber correr muy rápido", "Cantar ópera"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Las Vacas del Faraón:**\n*Personajes:* Faraón confundido (con corona), Títere de José sabio y Títere de Vaquita (graciosa).\n- *Faraón:* ¡Ay! Soñé con siete vacas flacas que se comían a siete vacas gordas. ¿Qué significa?\n- *Vaquita:* ¡Muuu! ¡Yo soy una vaquita gorda y no quiero que me coman!\n- *José:* No te preocupes. Significa que vendrán años con mucho trigo y luego años con poco. Debemos guardar comida.\n- *Faraón:* ¡Qué gran idea! Eres el hombre más sabio de Egipto. Te nombro gobernador.\n- *José:* ¡Gracias! Cuidar el alimento es cuidar la vida en Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'El saquito de trigo de José'. Los niños decoran un saquito de papel craft con dibujos de espigas de trigo y colocan semillas o porotos adentro como símbolo de la previsión.",
      song: "**Canción - El Plan de José:**\n*Letra:*\nSiete vacas gordas y siete flacas vio,\nel Faraón asustado a José le preguntó.\nCon mucha sabiduría un plan organizó,\n¡guardando el trigo el hambre nos salvó!\n*Coro:*\n¡Sabiduría y ayuda en este Shabat!\nEn Shabateinu NBI cantamos en paz."
    },
    storyPages: [
      { title: "El Sueño del Faraón", text: "El Faraón de Egipto tuvo un sueño extraño: vio siete vacas gordas saliendo del río Nilo, y luego siete vacas muy flacas que se comían a las gordas.", emoji: "👑" },
      { title: "José es Convocado", text: "Nadie en el palacio entendía el sueño. Recordaron que José en la prisión sabía interpretar sueños y lo llamaron ante el Faraón con urgencia.", emoji: "🏃" },
      { title: "La Interpretación de José", text: "José explicó: 'Las vacas representan años. Vendrán siete años de abundantes cosechas y luego siete años de sequía. Debemos almacenar trigo ahora.'", emoji: "🌾" },
      { title: "Gobernador de Egipto", text: "El Faraón vio la gran sabiduría de José y lo nombró gobernador de todo Egipto. José organizó los almacenes con éxito y salvó a miles de personas.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "ח", name: "Jet", sound: "J", word: "חלום", wordMeaning: "Sueño" },
      { letter: "פ", name: "Pe", sound: "P", word: "פרה", wordMeaning: "Vaca" },
      { letter: "ח", name: "Jet", sound: "J", word: "חכמה", wordMeaning: "Sabiduría" }
    ]
  },
  "Vayigash": {
    name: "Vayigash",
    hebrew: "ויגש",
    book: "Bereshit (Génesis)",
    summary: "¡El reencuentro más emocionante! José se revela ante sus hermanos, los perdona con todo su amor y les pide traer a su querido papá Jacob a Egipto para vivir todos unidos y felices.",
    words: ["HERMANOS", "PERDON", "REENCUENTRO", "EMOCION", "FAMILIA", "JACOB", "EGIPTO", "UNION"],
    trivia: [
      {
        question: "¿Cómo reaccionó José cuando sus hermanos no sabían quién era él?",
        options: ["Se reveló con lágrimas de emoción y les dio un gran abrazo", "Se enojó y los castigó", "Huyó corriendo"],
        answer: 0
      },
      {
        question: "¿Qué gran valor demostró José al perdonar a sus hermanos?",
        options: ["El perdón sincero y el amor familiar por encima de los errores pasados", "El orgullo", "El olvido"],
        answer: 0
      },
      {
        question: "¿A quién mandaron a buscar con carros reales para traer a Egipto?",
        options: ["Al abuelo Jacob", "Al rey Balak", "A Abraham"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - ¡Soy José su Hermano!:**\n*Personajes:* José (con ropa de gobernador), Títere de Judá (hermano arrepentido) y Títere de Ovejita feliz.\n- *José:* Acérquense, por favor. ¡Yo soy José, su hermano pequeño!\n- *Judá:* ¡Oh, no! ¡José! ¿Nos vas a castigar por lo que te hicimos en el pasado?\n- *José:* ¡Claro que no! Dios me mandó aquí para ayudarlos. Los perdono con todo mi amor.\n- *Ovejita:* ¡Qué hermoso es el perdón! ¡La familia vuelve a estar unida!\n- *Judá:* ¡Gracias, hermano! Corramos a contarle a nuestro papá Jacob que estás vivo.",
      costumes: "**Taller de Manualidades:**\n'El marco del reencuentro'. Los niños hacen un portarretratos con palitos de helado decorados y dibujan adentro a su familia abrazada y feliz.",
      song: "**Canción - La Familia Unida:**\n*Letra:*\n'¡Yo soy José!' el gobernador exclamó,\na sus hermanos con lágrimas perdonó.\nYa no hay rencores, el pasado se fue,\n¡la familia de Jacob muy unida ha de crecer!\n*Coro:*\n¡Perdón y alegría en este Shabat!\nEn Shabateinu NBI cantamos en paz."
    },
    storyPages: [
      { title: "Judá Defiende a su Hermano", text: "Judá habló ante el gobernador de Egipto (José) con gran valentía, ofreciéndose a quedarse como prisionero en lugar de su hermano menor Benjamín.", emoji: "🗣️" },
      { title: "José se Revela", text: "Al ver el gran amor y cambio en sus hermanos, José no pudo contener las lágrimas y exclamó: '¡Yo soy José! ¿Mi papá todavía vive?'", emoji: "😢" },
      { title: "El Perdón Sincero", text: "Sus hermanos tenían miedo, pero José les dijo: 'No se sientan tristes ni enojados. Dios me envió aquí antes para guardar comida y salvar vidas.'", emoji: "🫂" },
      { title: "La Gran Noticia para Jacob", text: "José les dio carros llenos de regalos y comida para traer a su papá Jacob a Egipto. ¡La noticia de que José estaba vivo llenó de luz el corazón de Jacob!", emoji: "🛒" }
    ],
    alefBetLetters: [
      { letter: "ס", name: "Samej", sound: "S", word: "סליחה", wordMeaning: "Perdón" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אח", wordMeaning: "Hermano" },
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "עגלה", wordMeaning: "Carreta" }
    ]
  },
  "Vayechi": {
    name: "Vayeji",
    hebrew: "ויחי",
    book: "Bereshit (Génesis)",
    summary: "Jacob bendice a sus nietos Efraín y Menashé cruzando las manos con amor. Nos enseña la hermosa costumbre familiar de bendecir a nuestros niños en la mesa de Shabat para que crezcan felices y con buenos valores.",
    words: ["BENDICION", "NIETOS", "JACOB", "EFRAIN", "MENASHE", "SHABAT", "FAMILIA", "JAZAK"],
    trivia: [
      {
        question: "¿A quiénes bendijo Jacob cruzando sus manos de forma especial?",
        options: ["A sus nietos Efraín y Menashé", "A las ovejas del desierto", "A los soldados del palacio"],
        answer: 0
      },
      {
        question: "¿Qué hermosa tradición familiar en Shabat nace de esta bendición de Jacob?",
        options: ["Bendecir a los hijos los viernes por la noche deseándoles que sean como Efraín y Menashé", "Comer manzanas", "Cantando canciones de fútbol"],
        answer: 0
      },
      {
        question: "¿Qué frase de aliento y fuerza decimos juntos al terminar de leer todo el libro de Bereshit?",
        options: ["¡Jazak, Jazak, V'nitjazek!", "¡Feliz cumpleaños!", "¡Shalom!"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Las Manos Cruzadas:**\n*Personajes:* Jacob abuelito (con barba y ojos tiernos), José (papá) y los títeres de Efraín y Menashé.\n- *José:* Papá, has puesto tu mano derecha sobre el menor. ¿Estás confundido?\n- *Jacob:* No, José. Dios guía mis manos. Los dos niños serán muy especiales y benditos.\n- *Efraín:* ¡Gracias, abuelito! Cuidaremos la Torá con amor.\n- *Menashé:* ¡Sí! Y seremos buenos hermanos siempre.\n- *Jacob:* Que Dios los bendiga siempre en sus caminos. ¡Shabat Shalom para toda la familia!",
      costumes: "**Taller de Manualidades:**\n'La cajita de las bendiciones'. Los niños decoran una cajita con dibujos de su familia y colocan adentro papelitos con lindos deseos y bendiciones para sus papás y hermanos.",
      song: "**Canción - De Generación en Generación:**\n*Letra:*\nEl abuelito Jacob sus manos cruzó,\na Efraín y Menashé con amor bendijo.\nQue crezcan sanos, que vivan en paz,\n¡y que hagan mitzvot en este Shabat!\n*Coro:*\n¡L'dor Vador, amor sin final!\nEn Shabateinu NBI cantamos en Shabat."
    },
    storyPages: [
      { title: "El Abuelo Jacob en Egipto", text: "Jacob vivió los últimos diecisiete años de su vida en Egipto, rodeado del amor de sus doce hijos y de muchos nietos que lo alegraban cada día.", emoji: "👴" },
      { title: "La Bendición a los Nietos", text: "José trajo a sus hijos Efraín y Menashé para que Jacob los bendijera. Jacob, cruzando sus manos con cariño, los bendijo deseando que fueran un gran ejemplo.", emoji: "👦" },
      { title: "Una Costumbre Hermosa", text: "Hoy en día, cada viernes por la noche en la mesa de Shabat, los padres bendicen a sus hijos usando las mismas dulces palabras que Jacob usó con sus nietos.", emoji: "🕯️" },
      { title: "¡Jazak, Jazak, V'nitjazek!", text: "Con Vayechi terminamos el primer libro de la Torá, Bereshit. Todo el pueblo se alegra y grita: '¡Sé fuerte, sé fuerte, y nos fortaleceremos!' para seguir estudiando.", emoji: "💪" }
    ],
    alefBetLetters: [
      { letter: "ז", name: "Zayin", sound: "Z", word: "זקן", wordMeaning: "Abuelo" },
      { letter: "ב", name: "Bet", sound: "B", word: "ברכה", wordMeaning: "Bendición" },
      { letter: "ח", name: "Jet", sound: "J", word: "חזק", wordMeaning: "Fuerte" }
    ]
  },

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
  "Vaera": {
    name: "Vaera",
    hebrew: "וארא",
    book: "Shemot (Éxodo)",
    summary: "Moisés y Aarón van ante el Faraón para pedir la libertad del pueblo de Israel. Dios realiza grandes milagros y maravillas para demostrar que siempre protege a quienes confían en Él.",
    words: ["MILAGROS", "MOISES", "AARON", "FARAON", "EGIPTO", "LIBERTAD", "AGUA", "BASTON"],
    trivia: [
      {
        question: "¿Quién acompañó a Moisés ante el Faraón?",
        options: ["Su hermano Aarón", "Su abuelo Abraham", "Nadie, fue solo"],
        answer: 0
      },
      {
        question: "¿Qué se convirtió en serpiente cuando Aarón lo arrojó al suelo?",
        options: ["Su bastón", "Una cuerda", "Un pedazo de pan"],
        answer: 0
      },
      {
        question: "¿Qué buscaban obtener Moisés y Aarón para el pueblo?",
        options: ["La libertad para servir a Dios", "Monedas de oro", "Un palacio nuevo"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Bastón de Aarón:**\n*Personajes:* Moisés, Aarón (con bastón) y Faraón terco.\n- *Moisés:* Faraón, venimos en nombre de Dios. ¡Deja ir a mi pueblo!\n- *Faraón:* ¿Quién es Dios? No los dejaré ir. ¡Demuéstrenme su poder!\n- *Aarón:* ¡Mira esto, Faraón! (Lanza su bastón al suelo). ¡Se convirtió en una serpiente!\n- *Faraón:* ¡Ah! ¡Qué susto! Pero sigo siendo muy terco.\n- *Moisés:* Dios es muy fuerte y nos dará la libertad. ¡Confiamos en Él!",
      costumes: "**Taller de Manualidades:**\n'El bastón milagroso'. Decorar un tubo de cartón largo con papel crepé y dibujar una pequeña serpiente de papel que se pueda enrollar alrededor del tubo.",
      song: "**Canción - Confiando en Dios:**\n*Letra:*\nMoisés y Aarón al palacio llegaron,\nla palabra de Dios al Faraón le hablaron.\nAunque el rey es terco y no quiere escuchar,\n¡con fe y milagros la libertad va a llegar!\n*Coro:*\n¡Fuerza y milagros, confianza en Dios!\nEn Shabateinu NBI cantamos a una voz."
    },
    storyPages: [
      { title: "Moisés y Aarón Unidos", text: "Dios le pidió a Aarón que ayudara a su hermano Moisés a hablar ante el Faraón. Juntos demostraron que cuando trabajamos en equipo somos más fuertes.", emoji: "🤝" },
      { title: "El Bastón de la Promesa", text: "Aarón arrojó su bastón al suelo y, por un milagro de Dios, ¡se convirtió en una serpiente! Fue una señal para que el Faraón supiera que Dios es fuerte.", emoji: "🐍" },
      { title: "Las Primeras Señales", text: "El agua del río Nilo se transformó para mostrar el poder de Dios, pero el Faraón seguía con el corazón duro y no quería dejar ir a los israelitas.", emoji: "💧" },
      { title: "Tener Fe en lo Difícil", text: "Moisés y el pueblo aprendieron que cuando las cosas se ponen difíciles, debemos tener mucha paciencia y confiar en que Dios nos ayudará a salir adelante.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "מטה", wordMeaning: "Bastón" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אות", wordMeaning: "Milagro" },
      { letter: "י", name: "Yod", sound: "Y", word: "יאור", wordMeaning: "Río Nilo" }
    ]
  },
  "Bo": {
    name: "Bo",
    hebrew: "בא",
    book: "Shemot (Éxodo)",
    summary: "¡Por fin llega la libertad! Dios envía las últimas plagas y el Faraón decide dejar ir al pueblo. Salen de prisa y cocinan pan sin levadura (Matzá), dando inicio a la hermosa fiesta de Pésaj.",
    words: ["LIBERTAD", "MATZA", "PRISA", "PROMESA", "NOCHE", "SALIDA", "EGIPTO", "PUEBLO"],
    trivia: [
      {
        question: "¿Qué pan especial comemos en Pésaj para recordar que salimos de prisa?",
        options: ["La Matzá (pan sin levadura)", "La Jalá", "El pan de molde"],
        answer: 0
      },
      {
        question: "¿Qué significa la palabra 'Bo'?",
        options: ["Ven", "Corre", "Canta"],
        answer: 0
      },
      {
        question: "¿Qué fiesta tan importante del calendario judío celebra nuestra libertad de Egipto?",
        options: ["Pésaj", "Rosh Hashaná", "Janucá"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - ¡De Prisa, la Matzá!:**\n*Personajes:* Títere de Panadero con gorro, Títere de Niño con mochila y Títere de Ovejita mochilera.\n- *Panadero:* ¡El Faraón por fin dijo que sí! ¡Podemos salir de Egipto!\n- *Niño:* ¡Rápido, empaquemos la masa de pan! ¡No hay tiempo para que crezca!\n- *Ovejita:* ¡Beeee! ¡Entonces comeremos un pan plano y crujiente!\n- *Panadero:* Sí, lo llamaremos Matzá. ¡Será nuestro pan de la libertad!\n- *Niño:* ¡Qué emoción! ¡Vamos cantando por el desierto en Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'Mi propia Matzá'. Usando masa de sal (agua, sal y harina), los niños amasan círculos planos, les hacen agujeros con un tenedor y los hornean (o secan) simulando el pan de Pésaj.",
      song: "**Canción - Crujiente Matzá:**\n*Letra:*\nLa Matzá crujiente vamos a comer,\nsalimos de prisa sin tiempo a crecer.\nPan de la libertad, dulce tradición,\n¡cantamos felices con el corazón!\n*Coro:*\n¡Pésaj de alegría, cantar de Shabat!\nEn Shabateinu NBI festejamos en paz."
    },
    storyPages: [
      { title: "El Faraón Dice Sí", text: "Después de muchas plagas, el Faraón finalmente entendió que debía dejar ir a los israelitas. Les dijo: '¡Váyanse de mi tierra ahora!'", emoji: "👑" },
      { title: "Salida Apresurada", text: "El pueblo empacó sus cosas muy rápido. La masa del pan no alcanzó a leudar (inflarse), por lo que la hornearon plana. Así nació la Matzá.", emoji: "🎒" },
      { title: "La Fiesta de Pésaj", text: "Dios les pidió recordar este gran momento cada año celebrando la fiesta de Pésaj, comiendo Matzá y contando la historia de la libertad a los niños.", emoji: "🍷" },
      { title: "Un Camino de Libertad", text: "El pueblo de Israel cruzó los límites de Egipto, felices de ser libres. Aprendemos que la libertad es el regalo más hermoso para todos los seres humanos.", emoji: "🕊️" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "מצה", wordMeaning: "Matzá" },
      { letter: "ח", name: "Jet", sound: "J", word: "חירות", wordMeaning: "Libertad" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אפייה", wordMeaning: "Hornear" }
    ]
  },
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
  "Mishpatim": {
    name: "Mishpatim",
    hebrew: "משפטים",
    book: "Shemot (Éxodo)",
    summary: "Esta parashá nos enseña leyes muy sabias para convivir en paz y armonía. Aprendemos a cuidar la propiedad ajena, ayudar a devolver objetos perdidos y tratar a los animales y extranjeros con mucho cariño y respeto.",
    words: ["LEYES", "CONVIVIR", "PAZ", "ARMONIA", "RESPETO", "ANIMALES", "PROPIEDAD", "AYUDA"],
    trivia: [
      {
        question: "¿Qué nos enseñan las leyes de Mishpatim?",
        options: ["A convivir con respeto, paz y honestidad en el día a día", "A pelear en el patio", "A esconder los juguetes"],
        answer: 0
      },
      {
        question: "¿Qué debemos hacer si encontramos algo que no es nuestro (Hashavat Avedá)?",
        options: ["Buscar a su dueño y devolvérselo con una sonrisa", "Quedárnoslo sin decir nada", "Tirarlo a la basura"],
        answer: 0
      },
      {
        question: "¿Cómo nos pide la Torá que tratemos a los extranjeros y nuevos amigos?",
        options: ["Con cariño y empatía, recordando que todos somos valiosos", "Ignorándolos", "Gritándoles"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - La Caja de Objetos Perdidos:**\n*Personajes:* Títere de Conejito preocupado, Títere de Ovejita alegre y Títere de Niño honesto.\n- *Conejito:* ¡Ay, no! Perdí mi lápiz de colores brillante. Estoy muy triste.\n- *Niño:* Hola Conejito, ¡mira lo que encontré tirado en la sala! ¿Es este tu lápiz?\n- *Conejito:* ¡Sí! ¡Es mío! ¡Muchas gracias por devolverlo!\n- *Ovejita:* ¡Qué hermosa mitzvá! La parashá Mishpatim nos enseña a devolver lo perdido.\n- *Niño:* Sí, cuidar las cosas de los demás nos ayuda a ser una comunidad muy unida en Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'La alcancía del cuidado'. Los niños decoran una cajita para colocar lápices o juguetes perdidos en el salón, escribiendo en el frente: 'Hashavat Avedá - Devolver lo perdido con amor'.",
      song: "**Canción - Reglas de Amistad:**\n*Letra:*\nSi ves a un amigo que perdió su juguete,\nbúscalo y devuélvelo con un gran billete (¡de amor!).\nAyuda al necesitado, cuida al animal,\n¡reglas hermosas de paz celestial!\n*Coro:*\n¡Mishpatim de justicia, amor sin igual!\nEn Shabateinu NBI cantamos en Shabat."
    },
    storyPages: [
      { title: "Leyes para Convivir", text: "Después de recibir los Diez Mandamientos, Dios le dio al pueblo reglas muy prácticas para el día a día. Estas leyes nos enseñan a ser justos y amables con todos.", emoji: "⚖️" },
      { title: "Devolver lo Perdido", text: "Una ley muy linda es 'Hashavat Avedá': si encuentras un objeto perdido, debes esforzarte por encontrar a su dueño. Así creamos un ambiente de confianza.", emoji: "🔍" },
      { title: "Cuidado de los Animales", text: "La Torá nos enseña a cuidar a los animales. Si ves al burrito de tu enemigo sufriendo bajo una carga pesada, ¡debes ayudarlo a descansar!", emoji: "🐴" },
      { title: "Amor al Extranjero", text: "Dios nos recuerda: 'Traten con cariño a las personas nuevas o de otros lugares, porque ustedes también fueron extranjeros en Egipto.' ¡El amor es para todos!", emoji: "🤝" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "משפט", wordMeaning: "Regla" },
      { letter: "צ", name: "Tzadi", sound: "Tz", word: "צדק", wordMeaning: "Justicia" },
      { letter: "ח", name: "Jet", sound: "J", word: "חבר", wordMeaning: "Amigo" }
    ]
  },
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
  "Tetzaveh": {
    name: "Tetzaveh",
    hebrew: "תצוה",
    book: "Shemot (Éxodo)",
    summary: "Moisés recibe instrucciones para hacer las ropas especiales del Sumo Sacerdote y mantener encendido el aceite de la Menorá. Nos enseña a ser portadores de luz y a brillar con alegría para guiar a los demás.",
    words: ["ACEITE", "MENORA", "LUCES", "SACERDOTE", "ROPA", "SABIDURIA", "ENTUSIASMO", "BRILLAR"],
    trivia: [
      {
        question: "¿Qué debían mantener encendido continuamente los sacerdotes?",
        options: ["La Menorá con aceite de oliva puro", "Una hoguera de campamento", "Una lámpara eléctrica"],
        answer: 0
      },
      {
        question: "¿Cómo debían ser las ropas de Aarón, el Sumo Sacerdote?",
        options: ["Hermosas y coloridas, hechas con hilos de oro, azul y púrpura", "Ropas comunes de lana gris", "No llevaba ropa especial"],
        answer: 0
      },
      {
        question: "¿Qué representa la luz de la Menorá para nosotros?",
        options: ["Que nuestras buenas acciones y palabras amables deben brillar y dar luz a los demás", "Que hace mucho frío", "Que es hora de ir a dormir"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Aceite de la Menorá:**\n*Personajes:* Títere de Aarón (con sombrero sacerdotal), Títere de Niño colaborador y Títere de Ovejita.\n- *Aarón:* ¡Hola amigos! Hoy me toca exprimir las aceitunas para obtener el aceite más puro para la Menorá.\n- *Niño:* Aarón, ¿por qué es tan importante que el aceite sea puro?\n- *Aarón:* Porque la llama de la Menorá debe brillar fuerte y limpia, sin humo, para llenar de luz todo el Mishkán.\n- *Ovejita:* ¡Beeee! ¡Entonces yo seré una ovejita brillante y mantendré encendido mi entusiasmo en Shabateinu NBI!\n- *Niño:* ¡Sí! Ayudemos a los demás con alegría para que nuestra llama brille fuerte.",
      costumes: "**Taller de Manualidades:**\n'La Menorá brillante'. Los niños enrollan una cartulina negra para hacer la base y pegan papeles celofán de colores rojo, naranja y amarillo en la punta simulando la llama que nunca se apaga.",
      song: "**Canción - Mi Llama de Bondad:**\n*Letra:*\nEn el altar del Mishkán un fuego brilló,\nque de día y de noche nunca se apagó.\nAsí en mi alma yo quiero llevar,\nla llama encendida de amor y paz.\n*Coro:*\n¡Siempre brillando, haciendo el bien!\nEn Shabateinu NBI cantamos también."
    },
    storyPages: [
      { title: "El Aceite Puro", text: "Dios le pidió a Moisés recolectar aceite de oliva puro de primera calidad para mantener encendidas las luces de la Menorá del Mishkán de forma permanente.", emoji: "🫒" },
      { title: "Las Ropas del Sumo Sacerdote", text: "Aarón y sus hijos recibieron ropas especiales muy hermosas de color azul, púrpura y escarlata con hilos de oro, diseñadas para traer alegría y esplendor.", emoji: "👑" },
      { title: "El Pectoral de Piedras Preciosas", text: "Aarón llevaba en el pecho el Pectoral del Juicio con doce piedras preciosas brillantes, cada una representando a una de las doce tribus del pueblo de Israel.", emoji: "💎" },
      { title: "Ser Luz para el Mundo", text: "La Menorá encendida nos enseña que cada uno de nosotros debe ser como una pequeña luz en el mundo, haciendo mitzvot y siendo bondadosos con los demás.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "ש", name: "Shin", sound: "Sh", word: "שמן", wordMeaning: "Aceite" },
      { letter: "מ", name: "Mem", sound: "M", word: "מנורה", wordMeaning: "Menorá" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אור", wordMeaning: "Luz" }
    ]
  },
  "KiTisa": {
    name: "Ki Tisa",
    hebrew: "כי תשא",
    book: "Shemot (Éxodo)",
    summary: "El pueblo comete un error al hacer un becerro de oro, pero Moisés reza con mucho amor para pedir el perdón de Dios. Nos enseña el valor de perdonar, aprender de los errores y volver a empezar con el corazón limpio.",
    words: ["PERDON", "ERRORES", "MOISES", "REZO", "CORAZON", "COMPASION", "NUEVO", "SINAÍ"],
    trivia: [
      {
        question: "¿Qué error cometió el pueblo mientras Moisés estaba en la montaña?",
        options: ["Hicieron un becerro de oro", "Se fueron a dormir", "Pintaron las tiendas de azul"],
        answer: 0
      },
      {
        question: "¿Qué hizo Moisés al ver que el pueblo estaba arrepentido?",
        options: ["Rezó con mucho amor para pedirle a Dios que los perdonara", "Se fue solo al desierto", "No hizo nada"],
        answer: 0
      },
      {
        question: "¿Qué recibió Moisés de Dios en su segundo viaje a la montaña?",
        options: ["Un segundo juego de Tablas de la Ley, representando el perdón y una nueva oportunidad", "Un mapa de oro", "Una corona de plata"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Aprender del Error:**\n*Personajes:* Títere de Niño arrepentido, Títere de Moisés y Títere de Conejito pacificador.\n- *Niño:* Moisés, nos asustamos cuando tardaste en bajar de la montaña y cometimos un gran error al hacer ese becerro de oro. Estamos muy tristes.\n- *Moisés:* Sé que cometieron un error, pero lo importante es que su arrepentimiento sea sincero.\n- *Conejito:* ¡Sí! He aprendido que cuando nos equivocamos, podemos pedir perdón y prometer esforzarnos por hacerlo mejor.\n- *Moisés:* Así es. Dios nos ama y nos da segundas oportunidades. ¡Trabajemos unidos con el corazón limpio!\n- *Niño:* ¡Qué alegría es sentir el perdón en la comunidad de Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'El espejo del perdón'. Los niños decoran un cartón con forma de espejo y escriben alrededor: 'Puedo aprender de mis errores y mejorar cada día'.",
      song: "**Canción - Volver a Empezar:**\n*Letra:*\nSi cometí un error, lo puedo enmendar,\npidiendo disculpas y volviendo a empezar.\nDios es compasivo y nos da su perdón,\n¡trayendo alegría a nuestro corazón!\n*Coro:*\n¡Segundas oportunidades en este Shabat!\nEn Shabateinu NBI brillamos en paz."
    },
    storyPages: [
      { title: "La Espera en la Montaña", text: "Moisés subió al Monte Sinaí por 40 días para hablar con Dios. El pueblo se impacientó al ver que tardaba tanto en bajar.", emoji: "⛰️" },
      { title: "El Becerro de Oro", text: "Por miedo a quedarse solos, algunos hicieron una estatua en forma de becerro de oro. Fue un gran error porque olvidaron confiar en Dios.", emoji: "🐂" },
      { title: "El Rezo de Moisés", text: "Moisés defendió con amor al pueblo arrepentido, rezando con fuerza para pedirle a Dios que los perdonara. Dios aceptó su oración con compasión.", emoji: "🙏" },
      { title: "Nuevas Tablas de la Ley", text: "Moisés bajó de nuevo de la montaña con unas segundas Tablas de la Ley. Fue el símbolo del perdón de Dios y de una hermosa y nueva oportunidad.", emoji: "📜" }
    ],
    alefBetLetters: [
      { letter: "ל", name: "Lamed", sound: "L", word: "לוח", wordMeaning: "Tabla" },
      { letter: "ס", name: "Samej", sound: "S", word: "סליחה", wordMeaning: "Perdón" },
      { letter: "ר", name: "Resh", sound: "R", word: "רחמים", wordMeaning: "Compasión" }
    ]
  },
  "Vayakhel": {
    name: "Vayakhel",
    hebrew: "ויקהל",
    book: "Shemot (Éxodo)",
    summary: "Moisés reúne a toda la comunidad de Israel para trabajar unida en la construcción del Mishkán. Nos enseña la importancia de colaborar en equipo, compartir nuestros talentos y celebrar el Shabat como el día sagrado de descanso familiar.",
    words: ["UNIDAD", "COMUNIDAD", "TRABAJO", "EQUIPO", "SHABAT", "SANTUARIO", "TALENTOS", "CONGREGACION"],
    trivia: [
      {
        question: "¿Qué significa la palabra 'Vayakhel'?",
        options: ["Reunió o congregó al pueblo", "Salió corriendo", "Escribió una carta"],
        answer: 0
      },
      {
        question: "¿Qué valor tan importante aprendemos cuando todo el pueblo ayuda a construir el Mishkán?",
        options: ["El valor de la cooperación, el trabajo en equipo y la unión", "Que es mejor trabajar solo", "Que es aburrido ayudar"],
        answer: 0
      },
      {
        question: "¿Qué día especial de descanso familiar les recuerda Moisés respetar antes de construir?",
        options: ["El Shabat", "El día lunes", "El día de cumpleaños"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Mosaico de la Unidad:**\n*Personajes:* Títere de Carpintero (con regla), Títere de Tejedora (con lanas de colores) y Títere de Niño colaborador.\n- *Carpintero:* Yo tengo maderas para las columnas, pero necesito ayuda para levantarlas.\n- *Tejedora:* Yo tejí las hermosas cortinas de colores azul y púrpura para decorar.\n- *Niño:* ¡Y yo puedo ayudar a sostener los clavos y las sogas!\n- *Carpintero:* ¡Excelente! Si cada uno aporta su granito de arena, ¡construiremos un santuario maravilloso!\n- *Tejedora:* La unión hace la fuerza en la comunidad de Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'El bloque del Mishkán'. Los niños decoran una caja de zapatos vacía pintándola de dorado y dibujando símbolos de mitzvot. Luego, apilan todas las cajas juntas en el salón para simular el santuario construido en equipo.",
      song: "**Canción - Unidos en Comunidad:**\n*Letra:*\nCon maderas y telas vamos a construir,\nun hermoso Mishkán donde Dios pueda vivir.\nCada uno aporta su talento especial,\n¡y descansamos unidos en este Shabat!\n*Coro:*\n¡Vayakhel de unión, fuerza comunal!\nEn Shabateinu NBI cantamos en Shabat."
    },
    storyPages: [
      { title: "Moisés Reúne al Pueblo", text: "Moisés convocó a todos los israelitas ('Vayakhel'). Les recordó primero la importancia de respetar y descansar en Shabat antes de comenzar su labor.", emoji: "👥" },
      { title: "Constructores Entusiastas", text: "Hombres y mujeres con corazones generosos trajeron ofrendas: oro, plata, cobre y lanas de colores azul, púrpura y carmesí de primera calidad.", emoji: "🧶" },
      { title: "Artesanos con Sabiduría", text: "Dios eligió a Betzalel y Oholiab como directores del proyecto por su gran talento artístico, su creatividad y su habilidad para enseñar a otros.", emoji: "🎨" },
      { title: "La Unión Hace la Fuerza", text: "Todos trabajaron codo a codo en perfecta armonía. La construcción nos enseña que cuando la comunidad se une con un mismo propósito, ¡logra cosas asombrosas!", emoji: "🏘️" }
    ],
    alefBetLetters: [
      { letter: "ק", name: "Kuf", sound: "K", word: "קהילה", wordMeaning: "Comunidad" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שבת", wordMeaning: "Shabat" },
      { letter: "ח", name: "Jet", sound: "J", word: "חיבור", wordMeaning: "Unión" }
    ]
  },
  "Pekudei": {
    name: "Pekudei",
    hebrew: "פקודי",
    book: "Shemot (Éxodo)",
    summary: "¡El Mishkán está terminado! Moisés presenta una rendición de cuentas muy clara y transparente sobre el oro y la plata utilizados, y la nube de la presencia de Dios llena el santuario, bendiciendo el esfuerzo del pueblo.",
    words: ["TRANSPARENCIA", "CONTABILIDAD", "MISHKAN", "COMPLETO", "NUBE", "BENDICION", "HONESTIDAD", "TRABAJO"],
    trivia: [
      {
        question: "¿Qué hizo Moisés al terminar la construcción para ser transparente con el pueblo?",
        options: ["Una rendición de cuentas de todos los materiales utilizados", "Un dibujo en la arena", "Escondió los materiales sobrantes"],
        answer: 0
      },
      {
        question: "¿Qué señal hermosa del cielo cubrió el Mishkán cuando estuvo terminado?",
        options: ["Una nube brillante que representaba la presencia de Dios", "Una lluvia de estrellas", "Un rayo de sol"],
        answer: 0
      },
      {
        question: "¿Qué frase de aliento y fuerza decimos juntos al terminar de leer todo el libro de Shemot?",
        options: ["¡Jazak, Jazak, V'nitjazek!", "¡Feliz cumpleaños!", "¡Shalom!"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Las Cuentas Claras:**\n*Personajes:* Títere de Moisés (con un pergamino de cuentas), Títere de Niño curioso y Títere de Ovejita mochilera.\n- *Niño:* Moisés, ¿qué es ese gran pergamino que tienes en tus manos?\n- *Moisés:* Es la cuenta exacta de todo el oro y la plata que nos donaron para el Mishkán. La honestidad es fundamental.\n- *Ovejita:* ¡Beeee! ¡Qué bueno es ser transparentes y honestos con las cosas que compartimos!\n- *Moisés:* Así es. Y al ver nuestro esfuerzo, la nube de Dios ha cubierto el Mishkán para bendecirnos.\n- *Niño:* ¡Qué emoción! ¡Sé fuerte, sé fuerte y nos fortaleceremos!",
      costumes: "**Taller de Manualidades:**\n'El cartel de la honestidad'. Los niños dibujan una gran nube brillante en una cartulina y le pegan estrellas plateadas donde escriben acciones honestas (ej. 'Decir la verdad', 'Devolver lo prestado').",
      song: "**Canción - El Santuario del Amor:**\n*Letra:*\nEl Mishkán está listo, hermoso y real,\ncon cuentas muy claras de honestidad total.\nLa nube en el cielo nos viene a guiar,\n¡con mucha alegría en este Shabat!\n*Coro:*\n¡Jazak, Jazak, V'nitjazek, sí!\nTerminamos Shemot en la NBI feliz."
    },
    storyPages: [
      { title: "Cuentas Claras", text: "En la parashá Pekudei, Moisés presenta una lista de todo el oro, plata y bronce donados por el pueblo. Nos enseña el valor de la honestidad y la transparencia.", emoji: "📊" },
      { title: "Las Ropas Listas", text: "Los sastres terminaron de tejer los trajes de los sacerdotes. Cuando Moisés los inspeccionó, vio que estaban hechos exactamente como Dios había ordenado.", emoji: "🎽" },
      { title: "¡Se levanta el Santuario!", text: "En el primer día del primer mes, Moisés armó las paredes del Mishkán. Colocó las cortinas, el altar y la mesa de panes, quedando todo listo y ordenado.", emoji: "🏛️" },
      { title: "La Nube del Viaje", text: "Una gran nube cubrió el Mishkán y la gloria de Dios lo llenó. Al terminar Shemot, todo el pueblo exclamó: '¡Jazak, Jazak, V'nitjazek!' (¡Sé fuerte, sé fuerte y nos fortaleceremos!)", emoji: "💪" }
    ],
    alefBetLetters: [
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "ענן", wordMeaning: "Nube" },
      { letter: "פ", name: "Pe", sound: "P", word: "פקודי", wordMeaning: "Cuentas" },
      { letter: "ח", name: "Jet", sound: "J", word: "חזק", wordMeaning: "Fuerte" }
    ]
  },

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
  "Tzav": {
    name: "Tzav",
    hebrew: "צו",
    book: "Vayikra (Levítico)",
    summary: "Esta parashá nos habla del fuego en el altar que debía mantenerse encendido continuamente. Nos enseña que la llama de la bondad, el entusiasmo y el amor en nuestro corazón por hacer mitzvot nunca debe apagarse.",
    words: ["FUEGO", "ALTAR", "LLAMA", "BONDAD", "ENTUSIASMO", "AMOR", "CORAZON", "SIEMPRE"],
    trivia: [
      {
        question: "¿Qué debía permanecer encendido continuamente en el altar del Mishkán?",
        options: ["Una llama o fuego constante", "Una pequeña fogata de campamento", "Nada, debía apagarse de noche"],
        answer: 0
      },
      {
        question: "¿Qué representa esa llama constante para nosotros?",
        options: ["Que el entusiasmo por ayudar y hacer buenas acciones siempre debe estar encendido en nuestro corazón", "Que debemos tener cuidado con el fuego", "Que hace frío en invierno"],
        answer: 0
      },
      {
        question: "¿Qué significa la palabra 'Tzav'?",
        options: ["Ordenar o pedir con cariño", "Correr", "Cantar una canción"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - La Llama de la Mitzvá:**\n*Personajes:* Títere de Kohén (con una antorcha de papel), Títere de Niño entusiasta y Títere de Ovejita.\n- *Kohén:* ¡Miren! Mi tarea hoy es cuidar que el fuego del altar no se apague nunca.\n- *Niño:* ¿Por qué, Aarón? ¿Hace mucho frío?\n- *Kohén:* No, es para recordar que el amor y la bondad en nuestro corazón deben brillar siempre, día y noche.\n- *Ovejita:* ¡Beeee! ¡Entonces yo seré una ovejita bondadosa y mantendré encendido mi entusiasmo en Shabateinu NBI!\n- *Niño:* ¡Sí! Ayudemos a los demás con alegría para que nuestra llama brille fuerte.",
      costumes: "**Taller de Manualidades:**\n'La antorcha del entusiasmo'. Los niños enrollan una cartulina negra para hacer la base and pegan papeles celofán de colores rojo, naranja y amarillo en la punta simulando la llama que nunca se apaga.",
      song: "**Canción - Mi Llama de Bondad:**\n*Letra:*\nEn el altar del Mishkán un fuego brilló,\nque de día y de noche nunca se apagó.\nAsí en mi alma yo quiero llevar,\nla llama encendida de amor y paz.\n*Coro:*\n¡Siempre brillando, haciendo el bien!\nEn Shabateinu NBI cantamos también."
    },
    storyPages: [
      { title: "El Fuego Sagrado", text: "Dios le dio instrucciones a Aarón para mantener un fuego encendido permanentemente en el altar. Cuidar esta llama era una misión muy especial y sagrada.", emoji: "🔥" },
      { title: "Entusiasmo en el Corazón", text: "Este fuego nos enseña que el entusiasmo y la alegría por ayudar a los demás nunca deben apagarse. Cada buena acción es como poner leña al fuego del amor.", emoji: "❤️" },
      { title: "Agradecer por los Alimentos", text: "En Tzav también aprendemos sobre las ofrendas de agradecimiento (Torá). Nos recuerda la importancia de decir '¡gracias!' por la comida y las cosas lindas que tenemos.", emoji: "🙏" },
      { title: "Unidos en la Misión", text: "Toda la familia de sacerdotes trabajaba unida para cuidar el santuario. Cuando cooperamos y nos apoyamos en familia, todo funciona en perfecta armonía.", emoji: "🤝" }
    ],
    alefBetLetters: [
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אש", wordMeaning: "Fuego" },
      { letter: "צ", name: "Tzadi", sound: "Tz", word: "צו", wordMeaning: "Ordenar" },
      { letter: "ת", name: "Tav", sound: "T", word: "תמיד", wordMeaning: "Siempre" }
    ]
  },
  "Shemini": {
    name: "Shemini",
    hebrew: "שמיני",
    book: "Vayikra (Levítico)",
    summary: "¡El octavo día es de gran celebración en el Mishkán! En esta parashá también aprendemos sobre las leyes de Cashrut, que nos enseñan a comer alimentos saludables y limpios para cuidar nuestro cuerpo como el templo sagrado que es.",
    words: ["CELEBRACION", "OCTAVO", "SALUDABLE", "ALIMENTOS", "CASHRUT", "CUERPO", "TEMPLO", "SABIDURIA"],
    trivia: [
      {
        question: "¿Qué significa la palabra 'Shemini'?",
        options: ["El octavo", "El primero", "El último"],
        answer: 0
      },
      {
        question: "¿Qué nos enseñan las leyes de Cashrut (alimentos kosher)?",
        options: ["A elegir alimentos saludables, limpios y respetuosos con la vida", "A comer solo dulces", "A no comer nada"],
        answer: 0
      },
      {
        question: "¿Por qué es importante cuidar lo que comemos según la Torá?",
        options: ["Para crecer fuertes y tratar a nuestro cuerpo con el respeto que merece", "Para ganar carreras", "Para dormir más"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Menú Saludable:**\n*Personajes:* Títere de Vaquita kosher (tierna), Títere de Pececito con escamas and Títere de Niño curioso.\n- *Niño:* Hola amigos, hoy aprenderemos sobre los alimentos que nos hacen bien.\n- *Vaquita:* ¡Muuu! Yo soy un animalito kosher, soy herbívora y tranquila.\n- *Pececito:* ¡Y yo tengo aletas y escamas para nadar feliz en el agua! También soy kosher.\n- *Niño:* La Torá nos enseña a elegir comida buena y limpia para cuidar el cuerpo que Dios nos regaló.\n- *Vaquita y Pececito:* ¡Sí! A cuidar la salud en Shabateinu NBI.",
      costumes: "**Taller de Clasificación Dinámica:**\n'El supermercado kosher'. Los niños usan dibujos de frutas, verduras, peces con escamas y otros alimentos para clasificarlos en una pizarra bajo la etiqueta: 'Saludable y Kosher'.",
      song: "**Canción - Cuidando mi Cuerpo:**\n*Letra:*\nMi cuerpo es un templo que debo cuidar,\ncon comida sana y agua del mar.\nLeyes de Cashrut nos vienen a guiar,\npara con fuerza y salud estudiar.\n*Coro:*\n¡Kosher y sano, un camino mejor!\nEn Shabateinu NBI cantamos con amor."
    },
    storyPages: [
      { title: "El Octavo Día", text: "Después de siete días de preparación, llegó el octavo día ('Shemini'). Aarón y sus hijos inauguraron oficialmente el Mishkán con una gran alegría del pueblo.", emoji: "🎉" },
      { title: "Cuidar Nuestro Templo", text: "Dios nos dio leyes sobre la comida llamadas Cashrut. Nos enseñan que nuestro cuerpo es sagrado y que debemos elegir alimentos que nos hagan bien y nos den energía.", emoji: "🍏" },
      { title: "Peces y Animales", text: "Aprendemos que los peces kosher tienen aletas y escamas, y que los animales kosher son pacíficos. Esto nos enseña a ser cuidadosos y respetuosos con la naturaleza.", emoji: "🐟" },
      { title: "Salud y Santidad", text: "Comer sano nos ayuda a pensar mejor, jugar con alegría y tener fuerzas para realizar muchas mitzvot. ¡La salud es parte de nuestra santidad!", emoji: "💪" }
    ],
    alefBetLetters: [
      { letter: "ש", name: "Shin", sound: "Sh", word: "שמיני", wordMeaning: "Octavo" },
      { letter: "כ", name: "Kaf", sound: "K", word: "כשר", wordMeaning: "Kosher" },
      { letter: "ד", name: "Dalet", sound: "D", word: "דג", wordMeaning: "Pez" }
    ]
  },
  "Tazria": {
    name: "Tazria",
    hebrew: "תזריע",
    book: "Vayikra (Levítico)",
    summary: "Esta parashá nos habla del milagro del nacimiento de un bebé y cómo la comunidad se alegra junta. Nos enseña a valorar la vida desde su inicio y a dar gracias por el hermoso regalo del crecimiento.",
    words: ["MILAGRO", "NACIMIENTO", "BEBE", "VIDA", "CRECIMIENTO", "FAMILIA", "AGRADECIMIENTO", "COMUNIDAD"],
    trivia: [
      {
        question: "¿Qué hermoso milagro celebramos en la parashá Tazria?",
        options: ["El nacimiento de un nuevo bebé y el inicio de la vida", "La caída de la lluvia", "Un viaje en barco"],
        answer: 0
      },
      {
        question: "¿Cómo debe reaccionar la comunidad ante el nacimiento de un bebé en Shabateinu?",
        options: ["Compartiendo la alegría y apoyando a la familia con amor", "Enojándose", "Ignorándolos"],
        answer: 0
      },
      {
        question: "¿Qué nos enseña el crecimiento de las plantas y los niños?",
        options: ["Que Dios cuida la vida y la ayuda a florecer", "Que todo cambia muy rápido", "Que debemos dormir más"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - ¡Bienvenido al Mundo!:**\n*Personajes:* Mamá ovejita (con un bebé ovejita de juguete) y Títere de Niño alegre.\n- *Mamá:* ¡Miren! Ha nacido mi pequeño corderito. Es tan suave y pequeñito.\n- *Niño:* ¡Oh, qué ternura! ¡Bienvenido a la comunidad de Shabateinu NBI!\n- *Mamá:* Gracias. Es un milagro hermoso de la vida.\n- *Niño:* Haremos una Brajá de agradecimiento por su salud y cantaremos un 'Mazal Tov'.\n- *Mamá:* ¡Qué lindo es sentir el apoyo y el cariño de todos los amigos de Shabat!",
      costumes: "**Taller de Manualidades:**\n'La tarjeta de Mazal Tov'. Los niños diseñan una colorida tarjeta de felicitación para un bebé recién nacido en la comunidad, decorándola con cochecitos de papel y globos.",
      song: "**Canción - El Milagro de la Vida:**\n*Letra:*\nUn pequeño bebé al mundo llegó,\nla familia contenta a Dios agradeció.\nLa vida es un regalo que debemos cuidar,\n¡con cantos de alegría en este Shabat!\n*Coro:*\n¡Mazal Tov, Mazal Tov, cantamos aquí!\nUnidos en familia en la NBI feliz."
    },
    storyPages: [
      { title: "El Nacimiento de un Bebé", text: "Tazria nos habla del milagro de la vida cuando nace un bebé. Es un momento de pura magia que llena de luz y esperanza a toda la familia.", emoji: "👶" },
      { title: "El Cuidado de la Mamá", text: "La Torá nos enseña que debemos mimar y cuidar mucho a la mamá que acaba de tener un bebé, ayudándola a descansar y dándole mucho amor.", emoji: "🌸" },
      { title: "Crecer en Comunidad", text: "Cada niño que nace es parte de nuestro pueblo. La comunidad los recibe con los brazos abiertos y promete enseñarles las hermosas historias de la Torá.", emoji: "🏘️" },
      { title: "Agradecer por Crecer", text: "Damos gracias a Dios por la salud de los más pequeñitos y por verlos crecer día a día con valores de bondad, respeto y amor.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "י", name: "Yod", sound: "Y", word: "ילד", wordMeaning: "Niño" },
      { letter: "ז", name: "Zayin", sound: "Z", word: "זרע", wordMeaning: "Semilla" },
      { letter: "ח", name: "Jet", sound: "J", word: "חיים", wordMeaning: "Vida" }
    ]
  },
  "Metzora": {
    name: "Metzora",
    hebrew: "מצורע",
    book: "Vayikra (Levítico)",
    summary: "Esta parashá nos enseña sobre la importancia del habla limpia (Shmirat Halashón). Evitando hablar mal de los demás (Lashón Hará), mantenemos nuestra comunidad unida, fuerte y llena de paz.",
    words: ["HABLA", "PALABRAS", "CUIDADO", "BONDAD", "AMISTAD", "PAZ", "LASHONHARA", "RESPETO"],
    trivia: [
      {
        question: "¿Qué valor tan importante aprendemos en Metzora con respecto a nuestras palabras?",
        options: ["A cuidar nuestro vocabulario y no hablar mal de los demás (Lashón Hará)", "A gritar muy fuerte", "A guardar secretos"],
        answer: 0
      },
      {
        question: "¿Como son las palabras buenas según esta enseñanza?",
        options: ["Como hermosas flores que traen paz y alegría", "Como piedras pesadas", "Como el viento"],
        answer: 0
      },
      {
        question: "¿Qué debemos hacer si escuchamos a alguien hablar mal de un amigo?",
        options: ["Cambiar de tema amablemente y defender a nuestro amigo", "Unirnos a la conversación", "Enojarnos"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Palabras de Algodón:**\n*Personajes:* Títere de Pajarito (con plumas suaves) and Títere de Niño travieso.\n- *Niño:* Pajarito, ¿sabías que a Juan no le gusta jugar al fútbol?\n- *Pajarito:* ¡Cuidado, amigo! Las palabras son como mis plumas: si las dejas caer al viento, ¡es muy difícil recogerlas! Es Lashón Hará.\n- *Niño:* Oh, no pensé en eso. Solo quiero decir cosas lindas de mis amigos.\n- *Pajarito:* ¡Excelente! Usemos palabras dulces como el algodón para animar y dar felicidad en Shabateinu NBI.\n- *Niño:* ¡Sí, a cuidar nuestra boca para sembrar amistad!",
      costumes: "**Taller de Manualidades:**\n'La alcancía de las buenas palabras'. Decorar una cajita con caritas sonrientes. Cada vez que un niño dice un cumplido o palabra de aliento a otro, coloca un 'token' de cartón dorado en la cajita.",
      song: "**Canción - Palabras Hermosas:**\n*Letra:*\nMis palabras son flores que voy a sembrar,\nen el corazón de mi amigo van a brotar.\nNo diré mentiras, no haré sentir mal,\n¡palabras de bondad en este Shabat!\n*Coro:*\n¡Shmirat Halashón, ley de amistad!\nEn Shabateinu NBI cantamos en paz."
    },
    storyPages: [
      { title: "El Poder de la Palabra", text: "En Metzora aprendemos que nuestras palabras tienen mucho poder. Pueden ser como caricias que hacen feliz a la gente, o como flechas que lastiman.", emoji: "🗣️" },
      { title: "Lashón Hará: Hablar Limpio", text: "La Torá nos pide evitar el Lashón Hará, que significa hablar mal de otras personas a sus espaldas. Es mejor hablar de las cosas lindas y buenas de cada uno.", emoji: "🤫" },
      { title: "La Metáfora de las Plumas", text: "Hablar mal de alguien es como soltar plumas al viento: se esparcen rápido y no se pueden juntar. Por eso, pensamos bien antes de hablar.", emoji: "🪶" },
      { title: "Constructores de Paz", text: "Cuando cuidamos lo que decimos, creamos un ambiente seguro y feliz donde todos en la NBI quieren jugar, compartir y cantar juntos en Shabat.", emoji: "🕊️" }
    ],
    alefBetLetters: [
      { letter: "ל", name: "Lamed", sound: "L", word: "לשון", wordMeaning: "Lengua" },
      { letter: "ד", name: "Dalet", sound: "D", word: "דיבור", wordMeaning: "Palabra" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שלום", wordMeaning: "Paz" }
    ]
  },
  "AchreiMot": {
    name: "Ajarei Mot",
    hebrew: "אחri מות",
    book: "Vayikra (Levítico)",
    summary: "Aprendemos sobre Yom Kipur, el día más sagrado del año, donde reflexionamos sobre nuestras acciones. Nos enseña el valor de pedir disculpas sinceras, perdonar de corazón y comenzar de nuevo con amor.",
    words: ["KIPUR", "SAGRADO", "PERDON", "RECOLECCION", "DISCULPAS", "AMOR", "CORAZON", "NUEVO"],
    trivia: [
      {
        question: "¿De qué día sagrado nos habla principalmente esta parashá?",
        options: ["De Yom Kipur (Día del Perdón)", "De Pésaj", "De Purim"],
        answer: 0
      },
      {
        question: "¿Qué hacemos en Yom Kipur para mejorar nuestro corazón?",
        options: ["Pedir disculpas a quienes pudimos lastimar y perdonar con cariño", "Comer muchos dulces", "Escondernos"],
        answer: 0
      },
      {
        question: "¿Cómo nos sentimos después de perdonar y ser perdonados?",
        options: ["Ligeros, felices y listos para un año lleno de bondad", "Tristes", "Cansados"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Limpiar el Espejo:**\n*Personajes:* Títere de Conejito arrepentido and Títere de Sabio cariñoso.\n- *Conejito:* Profesor, a veces hago cosas sin pensar y mi corazón se siente pesado, como un espejo sucio.\n- *Sabio:* No te preocupes, conejito. Dios nos dio Yom Kipur. Podemos limpiar el espejo pidiendo perdón.\n- *Conejito:* ¡Sí! Le diré a mi amigo que lamento haberle quitado su lápiz. ¡Y le daré un abrazo!\n- *Sabio:* ¡Excelente! El perdón sincero hace que tu corazón vuelva a brillar con toda su luz.\n- *Conejito:* ¡Qué alegría! ¡Hagamos las paces en Shabateinu!",
      costumes: "**Taller de Manualidades:**\n'El mural del perdón'. Los niños escriben en trozos de papel en forma de corazones una disculpa o un deseo de paz, y los pegan en un mural titulado: 'Corazones limpios, manos unidas'.",
      song: "**Canción - El Día del Perdón:**\n*Letra:*\nYom Kipur llegó, día de reflexionar,\nlas cosas del pasado vamos a perdonar.\nLo siento, mi amigo, si te hice llorar,\n¡con un fuerte abrazo volvemos a jugar!\n*Coro:*\n¡Perdón y Shalom, luz en el hogar!\nEn Shabateinu NBI cantamos en Shabat."
    },
    storyPages: [
      { title: "El Día del Perdón", text: "Achrei Mot nos enseña sobre Yom Kipur, el día en que nos detenemos a pensar en cómo nos portamos durante el año para pedir disculpas con el corazón.", emoji: "🕯️" },
      { title: "El Sumo Sacerdote", text: "En el Mishkán, el Sumo Sacerdote entraba al lugar más sagrado una vez al año para rezar por la paz, la salud y la felicidad de todo el pueblo.", emoji: "🏛️" },
      { title: "Pedir Disculpas", text: "Aprendemos que antes de pedirle perdón a Dios, primero debemos pedirle perdón a nuestros amigos y familiares si los tratamos mal o si fuimos egoístas.", emoji: "🫂" },
      { title: "Un Corazón Limpio", text: "Al perdonar y pedir perdón, nuestro corazón se limpia y se llena de luz. ¡Es una hermosa oportunidad para comenzar de nuevo con más alegría!", emoji: "💖" }
    ],
    alefBetLetters: [
      { letter: "כ", name: "Kaf", sound: "K", word: "כפור", wordMeaning: "Kipur" },
      { letter: "ס", name: "Samej", sound: "S", word: "סליחה", wordMeaning: "Perdón" },
      { letter: "ק", name: "Kuf", sound: "K", word: "קדוش", wordMeaning: "Sagrado" }
    ]
  },
  "Kedoshim": {
    name: "Kedoshim",
    hebrew: "קדושים",
    book: "Vayikra (Levítico)",
    summary: "¡Sean santos y especiales! Dios nos da la regla de oro: 'Amarás a tu prójimo como a ti mismo'. Nos enseña a compartir las cosechas, respetar a los mayores y tratar a cada persona con justicia y dulzura.",
    words: ["SANTIDAD", "PROJIMO", "RESPETO", "MAYORES", "COMPARTIR", "JUSTICIA", "AMOR", "ORO"],
    trivia: [
      {
        question: "¿Cuál es la regla de oro que se encuentra en la parashá Kedoshim?",
        options: ["Amarás a tu prójimo como a ti mismo", "Correr rápido", "Comer manzanas"],
        answer: 0
      },
      {
        question: "¿Cómo nos pide la Torá que tratemos a las personas mayores y abuelitos?",
        options: ["Con mucho respeto, escuchando su sabiduría y ayudándolos", "Ignorándolos", "Gritándoles"],
        answer: 0
      },
      {
        question: "¿Qué significa dejar las esquinas de los campos sin cosechar (Peá)?",
        options: ["Compartir comida con quienes lo necesitan de forma digna", "Que somos olvidadizos", "Dejar que los pájaros coman todo"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Compartir los Campos:**\n*Personajes:* Títere de Granjero generoso, Títere de Niño colaborador y Títere de Abuelito.\n- *Granjero:* ¡Qué buena cosecha de uvas! Pero no cosecharé las esquinas del campo.\n- *Niño:* ¿Por qué, papá? ¡Perderemos uvas deliciosas!\n- *Granjero:* La Torá nos enseña el valor de Peá: dejamos comida para que los abuelitos y necesitados puedan recogerla gratis.\n- *Abuelito:* ¡Muchas gracias! Su generosidad me alegra el día y llena mi hogar de paz.\n- *Niño:* ¡Es una mitzvá hermosa! En Shabateinu NBI nos gusta compartir.",
      costumes: "**Taller de Disfraces:**\nLos niños actúan como 'mensajeros del respeto'. Fabrican flores de papel and visitan a los adultos o abuelos presentes para regalarles la flor y decirles: 'Gracias por su sabiduría'.",
      song: "**Canción - Amarás a tu Prójimo:**\n*Letra:*\n'Ama a tu prójimo como a ti mismo',\nes el mandamiento de más optimismo.\nRespeta a los ancianos, comparte tu pan,\n¡y con la justicia el mundo brillará!\n*Coro:*\n¡Veahavtá Lereajá, cantamos en Shabat!\nEn Shabateinu NBI crecemos en bondad."
    },
    storyPages: [
      { title: "Ser Especiales: Kedoshim", text: "Dios nos dice: '¡Sean Kedoshim (santos / especiales) porque Yo soy Santo!' Nos pide brillar a través de buenas acciones en nuestra rutina diaria.", emoji: "⭐" },
      { title: "La Regla de Oro", text: "Aquí leemos: 'Veahavtá Lereajá Kamoja'. Tratar a tu amigo con el mismo cariño, cuidado y respeto con el que te gusta que te traten a ti.", emoji: "❤️" },
      { title: "Compartir la Cosecha", text: "La Torá nos pide dejar las esquinas de los campos (Peá) y las frutas caídas para los pobres y extranjeros. ¡Compartir lo que tenemos es una mitzvá!", emoji: "🌾" },
      { title: "Respetar la Experiencia", text: "También nos enseña a ponernos de pie ante los ancianos y respetar a nuestros padres. Los abuelitos tienen mucha sabiduría para enseñarnos.", emoji: "👵" }
    ],
    alefBetLetters: [
      { letter: "ק", name: "Kuf", sound: "K", word: "קדוش", wordMeaning: "Santo" },
      { letter: "ר", name: "Resh", sound: "R", word: "רע", wordMeaning: "Prójimo" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אהבה", wordMeaning: "Amor" }
    ]
  },
  "Emor": {
    name: "Emor",
    hebrew: "אמור",
    book: "Vayikra (Levítico)",
    summary: "¡Celebramos las festividades del año! Esta parashá nos presenta el calendario judío con Shabat, Pésaj, Shavuot, Rosh Hashaná, Yom Kipur y Sucot, enseñándonos a santificar el tiempo y celebrar en comunidad con alegría.",
    words: ["FIESTAS", "CALENDARIO", "SHABAT", "PESAJ", "SUCOT", "ALEGRIA", "TIEMPO", "COMUNIDAD"],
    trivia: [
      {
        question: "1. ¿Cuál es la primera y más importante fiesta que se menciona en Emor que ocurre todas las semanas?",
        options: ["El Shabat", "Rosh Hashaná", "Janucá"],
        answer: 0
      },
      {
        question: "¿Qué hacemos durante las festividades judías según la Torá?",
        options: ["Celebrar en comunidad con alegría, gratitud y mitzvot", "Estar tristes", "Trabajar más duro"],
        answer: 0
      },
      {
        question: "¿Qué fiesta nos invita a vivir en cabañas decoradas bajo las estrellas?",
        options: ["Sucot", "Pésaj", "Shavuot"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Carrusel de las Fiestas:**\n*Personajes:* Títere de Matzá (Pésaj), Títere de Shofár alegre (Rosh Hashaná) y Títere de Lulav (Sucot).\n- *Matzá:* ¡Hola! Yo traigo libertad en primavera.\n- *Shofár:* ¡Y yo sueno fuerte en otoño para despertarnos a ser mejores! ¡Toot!\n- *Lulav:* ¡Y yo de Sucot agradeciendo por la lluvia!\n- *Matzá:* ¡Qué lindo es el calendario judío! Todas las fiestas nos reunieron en familia.\n- *Shofár:* Sí, y la más dulce de todas es... ¡el Shabat de cada viernes en Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'El reloj de las fiestas'. Los niños hacen un círculo de cartulina dividido en 6 partes correspondientes a las festividades. Le colocan una flecha móvil para marcar la fiesta del momento.",
      song: "**Canción - El Tiempo Especial:**\n*Letra:*\nShabat cada semana nos viene a visitar,\nPésaj nos da la libertad,\nShavuot la Torá, Sucot para cantar...\n¡lindas fiestas que Dios nos vino a dar!\n*Coro:*\n¡Tiempo de alegría, festejar en Shabat!\nEn Shabateinu NBI cantamos en hermandad."
    },
    storyPages: [
      { title: "El Regalo del Tiempo", text: "En Emor, Dios nos enseña que el tiempo es un regalo y que podemos hacerlo especial (Kadosh) celebrando los días de fiesta con nuestra familia.", emoji: "📅" },
      { title: "El Shabat Semanal", text: "La primera fiesta es el Shabat. Cada seis días de trabajo, nos detenemos un día entero para descansar, cantar, comer cosas ricas y agradecer en familia.", emoji: "🕯️" },
      { title: "Las Fiestas del Año", text: "Aprendemos sobre Pésaj (libertad), Shavuot (Torá), Rosh Hashaná (año nuevo), Yom Kipur (perdón) and Sucot (cabañas de gratitud). ¡Qué hermoso calendario!", emoji: "🍋" },
      { title: "La Menorá del Templo", text: "Dios nos recuerda mantener las luces encendidas y traer panes frescos cada Shabat al santuario. Así dejamos viva la calidez de nuestro hogar espiritual.", emoji: "🕯️" }
    ],
    alefBetLetters: [
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אמור", wordMeaning: "Habla" },
      { letter: "ח", name: "Jet", sound: "J", word: "חג", wordMeaning: "Fiesta" },
      { letter: "מ", name: "Mem", sound: "M", word: "מועד", wordMeaning: "Festividad" }
    ]
  },
  "Behar": {
    name: "Behar",
    hebrew: "בהר",
    book: "Vayikra (Levítico)",
    summary: "En el Monte Sinaí, Dios nos enseña sobre la Shmitá: un año de descanso para la tierra cada siete años. Nos enseña a cuidar la naturaleza, confiar en Dios y compartir todo lo que crece con generosidad.",
    words: ["TIERRA", "DESCANSO", "SHMITA", "NATURALEZA", "CONFIANZA", "COMPARTIR", "CUIDADO", "SINAI"],
    trivia: [
      {
        question: "¿Cómo se llama el año especial de descanso para la tierra que ocurre cada siete años?",
        options: ["Shmitá", "Shabatón", "Pésaj"],
        answer: 0
      },
      {
        question: "¿Qué debemos hacer con los frutos que crecen solos en la tierra durante la Shmitá?",
        options: ["Compartirlos libremente con todas las personas y animales", "Venderlos todos", "Tirarlos"],
        answer: 0
      },
      {
        question: "¿Qué nos enseña la Shmitá sobre la naturaleza?",
        options: ["Que la tierra también necesita descansar y que todo lo que existe le pertenece a Dios", "Que debemos destruirla", "Que no sirve"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - La Tierra Descansa:**\n*Personajes:* Títere de Árbol frutal (feliz), Títere de Conejito hambriento y Títere de Granjero.\n- *Árbol:* ¡Ah, por fin es el año de Shmitá! Mis raíces descansarán de dar tantas manzanas.\n- *Granjero:* Sí, querido árbol. Este año no te podaré ni venderé tus frutos.\n- *Conejito:* Tengo hambre, ¿puedo comer de tus manzanas tiradas en el pasto?\n- *Granjero:* ¡Claro, Conejito! En Shmitá todo lo que crece es libre para todos.\n- *Árbol:* ¡Qué alegría! Compartir con los animales nos hace muy felices a todos en Shabat.",
      costumes: "**Taller de Manualidades:**\n'El huerto de Shabat'. Los niños plantan una semillita en un vaso con algodón húmedo, decorando el vasito con dibujos de árboles y la palabra 'Shmitá' (Descanso de la Tierra).",
      song: "**Canción - El Descanso de la Tierra:**\n*Letra:*\nCada siete años la tierra descansará,\nningún agricultor la va a cosechar.\nLos frutos son libres para compartir,\n¡confiamos en Dios para bien vivir!\n*Coro:*\n¡Shmitá de cuidado, amor forestal!\nEn Shabateinu NBI cantamos en Shabat."
    },
    storyPages: [
      { title: "En la Montaña de Sinaí", text: "Dios le habló a Moisés en el Monte Sinaí ('Behar') y le dio leyes hermosas para cuidar la tierra y los campos que recibirían en el futuro.", emoji: "⛰️" },
      { title: "El Shabat de la Tierra", text: "Así como nosotros descansamos en Shabat, la tierra también necesita un descanso. Cada siete años (Shmitá), no se siembra el campo para que la tierra recupere su fuerza.", emoji: "🌱" },
      { title: "Comida Libre para Todos", text: "Durante este año, cualquier fruto que crezca de forma natural es libre. Los pobres, los viajeros y los animalitos del campo pueden comer de ellos gratis.", emoji: "🍎" },
      { title: "Confiar y Compartir", text: "La Shmitá nos enseña que el mundo le pertenece a Dios y que debemos confiar en que Dios nos proveerá, aprendiendo a compartir nuestros recursos con generosidad.", emoji: "🤝" }
    ],
    alefBetLetters: [
      { letter: "ה", name: "He", sound: "H", word: "הר", wordMeaning: "Montaña" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שמיטה", wordMeaning: "Shmitá" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אדמה", wordMeaning: "Tierra" }
    ]
  },
  "Bechukotai": {
    name: "Bechukotai",
    hebrew: "בחוקתי",
    book: "Vayikra (Levítico)",
    summary: "Esta parashá nos promete hermosas lluvias y paz si seguimos los caminos de la Torá. Nos enseña que nuestras buenas acciones (mitzvot) traen bendiciones y alegría a todo nuestro hermoso mundo.",
    words: ["PROMESAS", "LLUVIAS", "PAZ", "BENDICION", "CAMINOS", "MITZVOT", "MUNDO", "ALEGRIA"],
    trivia: [
      {
        question: "¿Qué nos promete Dios en Bechukotai si seguimos los caminos de la Torá?",
        options: ["Lluvias a su tiempo, cosechas abundantes y Shalom (paz)", "Piedras en el camino", "Nubes negras"],
        answer: 0
      },
      {
        question: "¿Qué representa la lluvia en nuestra tradición?",
        options: ["Una hermosa bendición que hace crecer las plantas y nos da vida", "Un día aburrido", "Frío molesto"],
        answer: 0
      },
      {
        question: "¿Qué frase de fortaleza decimos al terminar esta parashá y el libro de Vayikra?",
        options: ["¡Jazak, Jazak, V'nitjazek! (¡Sé fuerte, sé fuerte, y nos fortaleceremos!)", "¡Feliz cumpleaños!", "¡A dormir!"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Gotas de Bendición:**\n*Personajes:* Títere de Flor marchita, Títere de Nube alegre y Títere de Niño agradecido.\n- *Flor:* Oh, tengo mucha sed... Mis pétalos están tristes.\n- *Nube:* ¡No te preocupes, florecita! Aquí vengo con gotas de agua fresca. ¡Plin, plin!\n- *Niño:* ¡Está lloviendo! Haremos una Brajá agradeciendo por la lluvia.\n- *Flor:* ¡Wow! ¡Qué agua tan dulce! Mis colores vuelven a brillar. ¡Gracias Dios!\n- *Niño:* La Torá dice que cuando hacemos Mitzvot, ¡el mundo se llena de lluvia de bendiciones!" ,
      costumes: "**Taller de Manualidades:**\n'El móvil de las bendiciones'. Los niños dibujan una gran nube de cartulina y cuelgan de ella gotitas de papel celeste donde escriben las bendiciones de su vida (familia, amigos, comida, Torá).",
      song: "**Canción - Gotas de Amor:**\n*Letra:*\nSi seguimos las leyes de amor y bondad,\nlas lluvias del cielo a tiempo vendrán.\nLos árboles del campo su fruto darán,\n¡y en toda la tierra reinará la paz!\n*Coro:*\n¡Jazak, Jazak, V'nitjazek, sí!\nTerminamos Vayikra en la NBI feliz."
    },
    storyPages: [
      { title: "Caminar en la Torá", text: "En Bechukotai, Dios nos promete que si caminamos en el sendero de la Torá y hacemos mitzvot, nuestro mundo se llenará de hermosas bendiciones.", emoji: "👣" },
      { title: "Lluvia a su Tiempo", text: "Dios promete enviar lluvia en el moment justo para que los cultivos crezcan verdes y fuertes. La lluvia es una de las bendiciones más lindas de la naturaleza.", emoji: "🌧️" },
      { title: "Paz en la Tierra", text: "También nos promete: 'Pondré paz en la tierra. Se acostarán a dormir sin miedo.' ¡Qué regalo tan hermoso es la paz (Shalom) en nuestro hogar!", emoji: "🕊️" },
      { title: "¡Jazak, Jazak, V'nitjazek!", text: "Con esta parashá completamos el tercer libro de la Torá, Vayikra. Todo el pueblo se alegra y grita: '¡Sé fuerte, sé fuerte, y nos fortaleceremos!' para seguir aprendiendo.", emoji: "💪" }
    ],
    alefBetLetters: [
      { letter: "ג", name: "Gimel", sound: "G", word: "גשם", wordMeaning: "Lluvia" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שלום", wordMeaning: "Paz" },
      { letter: "ח", name: "Jet", sound: "J", word: "חוק", wordMeaning: "Ley" }
    ]
  },

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
  "Beha'alotcha": {
    name: "Beha'alotja",
    hebrew: "בהעלותך",
    book: "Bamidbar (Números)",
    summary: "Moisés enciende la hermosa Menorá para que sus luces brillen hacia el centro. Nos enseña que cada uno de nosotros puede brillar con sus buenas acciones y ayudar a iluminar el camino de los demás con alegría.",
    words: ["LUCES", "MENORA", "ENCENDER", "MOISES", "ORO", "NUBE", "VIAJE", "CAMINO"],
    trivia: [
      {
        question: "¿Qué objeto de oro puro enciende Aarón en esta parashá?",
        options: ["La Menorá de siete brazos", "Una corona", "Un cofre"],
        answer: 0
      },
      {
        question: "¿Qué señal celestial indicaba al pueblo cuándo acampar y cuándo viajar?",
        options: ["La nube sobre el Mishkán de día y el fuego de noche", "Una estrella fugaz", "El viento fuerte"],
        answer: 0
      },
      {
        question: "¿Cómo debían sonar las trompetas de plata que hizo Moisés?",
        options: ["Con sonidos claros para reunir y guiar al pueblo", "Con música de violín", "Con truenos"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Las Luces de la Menorá:**\n*Personajes:* Títere de Aarón (con una Menorá de papel), Títere de Niño alegre y Títere de Ovejita.\n- *Aarón:* ¡Miren! Estoy encendiendo las luces de la Menorá. Cada llama apunta hacia el centro.\n- *Niño:* ¡Qué hermoso brilla Aarón! ¿Nosotros también podemos encender luces?\n- *Aarón:* ¡Claro! Cada vez que ayudas a un amigo o dices palabras dulces, enciendes una luz en el mundo.\n- *Ovejita:* ¡Beeee! ¡Entonces yo seré una ovejita brillante y mantendré encendido mi entusiasmo en Shabateinu NBI!\n- *Niño:* ¡Qué lindo es brillar todos juntos!",
      costumes: "**Taller de Manualidades:**\n'La trompeta de la guía'. Los niños decoran un tubo de cartón con papel aluminio y cintas de colores, simulando las trompetas de plata que guiaban al pueblo.",
      song: "**Canción - Brillando como la Menorá:**\n*Letra:*\nLa Menorá de oro brilla en el santuario,\ncon luces hermosas que alumbran a diario.\nAsí mis mitzvot el camino iluminan,\n¡y con mucha alegría los niños caminan!\n*Coro:*\n¡Brilla, brilla, pequeña luz de amor!\nEn Shabateinu NBI cantamos con fervor."
    },
    storyPages: [
      { title: "Encendiendo la Menorá", text: "Dios le pidió a Aarón que encendiera las siete lámparas de la Menorá de oro, de modo que sus luces iluminaran hacia el centro del Mishkán.", emoji: "🪔" },
      { title: "La Nube Guía", text: "Cuando la nube de Dios se elevaba sobre el Mishkán, el pueblo sabía que era momento de marchar. Si la nube se detenía, ellos acampaban con confianza.", emoji: "☁️" },
      { title: "Trompetas de Plata", text: "Moisés hizo dos trompetas de plata para reunir a los líderes y avisar al pueblo cuándo empezar el viaje. Su sonido traía orden y tranquilidad.", emoji: "🎺" },
      { title: "Compartir la Carga", text: "Moisés sintió que guiar a tanta gente era muy difícil solo. Dios le pidió elegir a 70 sabios para ayudarlo, recordándonos el valor del trabajo en equipo.", emoji: "🤝" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "מנורה", wordMeaning: "Menorá" },
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "ענן", wordMeaning: "Nube" },
      { letter: "ח", name: "Jet", sound: "J", word: "חצוצרה", wordMeaning: "Trompeta" }
    ]
  },
  "Sh'lach": {
    name: "Sh'lach",
    hebrew: "שלח־לך",
    book: "Bamidbar (Números)",
    summary: "Moisés envía doce exploradores a la Tierra Prometida. Josué y Caleb nos enseñan a ser valientes y optimistas, confiando en las promesas de Dios y viendo el lado bueno de las cosas.",
    words: ["EXPLORADORES", "VALIENTES", "TORTA", "UVAS", "CONFIANZA", "FRUTOS", "OPTIMISMO", "PROMESA"],
    trivia: [
      {
        question: "¿Cuántos exploradores envió Moisés a recorrer la tierra de Israel?",
        options: ["Doce exploradores", "Tres exploradores", "Cincuenta exploradores"],
        answer: 0
      },
      {
        question: "¿Qué fruto gigante trajeron de regreso entre dos personas?",
        options: ["Un gran racimo de uvas de Israel", "Una sandía", "Una manzana"],
        answer: 0
      },
      {
        question: "¿Quiénes fueron los dos exploradores valientes que dijeron '¡Con la ayuda de Dios lo lograremos!'?",
        options: ["Josué y Caleb", "Moisés y Aarón", "Abraham e Isaac"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Racimo de Uvas Gigante:**\n*Personajes:* Títere de Josué (valiente), Títere de Caleb (entusiasta) y Títere de Niño curioso.\n- *Niño:* ¡Miren! ¿Qué es ese fruto gigante que traen?\n- *Caleb:* ¡Es un racimo de uvas de la Tierra Prometida! ¡Es una tierra maravillosa y dulce!\n- *Josué:* Algunos tienen miedo de ir, pero nosotros confiamos en que Dios nos ayudará. ¡Es hermosa la tierra!\n- *Caleb:* Sí, con optimismo y fe en Dios, ¡podemos superar cualquier desafío!\n- *Niño:* ¡Yo también quiero ser valiente como ustedes en Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'El racimo de la alegría'. Los niños inflan pequeños globos morados y los pegan juntos sobre una cartulina verde para formar un gran racimo de uvas en 3D.",
      song: "**Canción - Seremos Valientes:**\n*Letra:*\nDoce exploradores a Israel viajaron,\ny uvas gigantes del campo trajeron.\nJosué y Caleb dijeron con valor:\n'¡Lograremos entrar con la ayuda del Creador!'\n*Coro:*\n¡Sé valiente, confía en el bien!\nEn Shabateinu NBI cantamos también."
    },
    storyPages: [
      { title: "Doce Exploradores", text: "Moisés eligió a doce hombres representantes del pueblo para explorar la Tierra Prometida y ver qué tan hermosos eran sus campos y ciudades.", emoji: "🏃" },
      { title: "Frutos Gigantes", text: "Los exploradores regresaron con higos, granadas y un racimo de uvas tan grande que tuvieron que cargarlo entre dos personas sobre un palo.", emoji: "🍇" },
      { title: "El Reporte de la Fe", text: "Aunque diez exploradores tenían miedo y dudaban, Josué y Caleb hablaron con fe: '¡La tierra es sumamente buena, Dios está con nosotros y nos cuidará!'", emoji: "🗣️" },
      { title: "El Regalo de los Tzitzit", text: "Dios nos dio el precepto de colocar flecos (Tzitzit) en los bordes de la ropa para recordarnos siempre seguir los mandamientos con amor y no perder el rumbo.", emoji: "🧵" }
    ],
    alefBetLetters: [
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "ענב", wordMeaning: "Uva" },
      { letter: "צ", name: "Tzadi", sound: "Tz", word: "ציצית", wordMeaning: "Tzitzit" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "ארץ", wordMeaning: "Tierra" }
    ]
  },
  "Korach": {
    name: "Koraj",
    hebrew: "קרח",
    book: "Bamidbar (Números)",
    summary: "Esta parashá nos enseña el valor de la humildad y la resolución pacífica de conflictos. Aprendemos a buscar el diálogo con amor y a evitar discusiones que dañen a nuestra comunidad.",
    words: ["HUMILDAD", "DIALOGO", "PAZ", "AMABILIDAD", "CONVIVENCIA", "PUEBLO", "ARMONIA", "BASTON"],
    trivia: [
      {
        question: "¿Qué brotó milagrosamente del bastón de Aarón para confirmar su liderazgo pacífico?",
        options: ["Flores y almendras dulces", "Monedas", "Hojas de papel"],
        answer: 0
      },
      {
        question: "¿Cuál es la mejor manera de resolver un conflicto según la Torá?",
        options: ["Conversando con respeto y amabilidad", "Gritando muy fuerte", "Ignorando al otro"],
        answer: 0
      },
      {
        question: "¿Qué valor nos enseña la historia de Korach al pedirnos evitar las discusiones egoístas?",
        options: ["El valor de la paz, la cooperación y la humildad", "A ganar siempre", "A tener la razón a la fuerza"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Bastón que Florece:**\n*Personajes:* Títere de Aarón, Títere de Niño dialogante y Títere de Ovejita pacífica.\n- *Niño:* Aarón, tu bastón de madera seca... ¡ha florecido de repente!\n- *Aarón:* Sí, Dios hizo florecer mi bastón con almendras para recordarnos que la paz y el amor florecen cuando somos humildes.\n- *Ovejita:* ¡Beeee! ¡A mí me encanta la paz! No me gusta cuando la gente discute de mala manera.\n- *Niño:* Es verdad, conversar con respeto nos ayuda a solucionar los problemas en Shabateinu NBI.\n- *Aarón:* ¡Exacto! Busquemos siempre el Shalom.",
      costumes: "**Taller de Manualidades:**\n'La vara de Aarón'. Los niños decoran una vara de cartón pegándole flores y hojitas de papel verde junto con almendras de plastilina o cartulina.",
      song: "**Canción - El Camino de la Paz:**\n*Letra:*\nEl bastón de Aarón con flores brotó,\ny un mensaje de paz a todos nos dio.\nEvita las peleas, conversa con amor,\n¡que la humildad agrada al Creador!\n*Coro:*\n¡Shalom en mi aula, Shalom en mi hogar!\nEn Shabateinu NBI cantamos en paz."
    },
    storyPages: [
      { title: "Una Discusión Triste", text: "Koraj discutió con Moisés y Aarón sobre quién debía liderar. Fue un momento triste porque no buscó dialogar con respeto ni humildad.", emoji: "🗣️" },
      { title: "El Bastón que Floreció", text: "Dios le pidió a Moisés colocar bastones secos de cada tribu en el Mishkán. Al día siguiente, ¡el bastón de Aarón floreció y dio almendras dulces!", emoji: "🌱" },
      { title: "El Regalo de la Paz", text: "Las almendras en el bastón demostraron que el liderazgo pacífico trae frutos hermosos. Aprendemos a resolver diferencias hablando con dulzura.", emoji: "🌸" },
      { title: "Cuidar a la Comunidad", text: "Dios nos pide apoyar a los sacerdotes (Cohanim) y levitas que trabajaban cuidando el santuario. Todos debemos valorar el esfuerzo de quienes nos guían.", emoji: "🤝" }
    ],
    alefBetLetters: [
      { letter: "שלום", name: "Shin", sound: "Sh", word: "שלום", wordMeaning: "Paz" },
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "ענווה", wordMeaning: "Humildad" },
      { letter: "שקד", name: "Shin", sound: "Sh", word: "שקד", wordMeaning: "Almendra" }
    ]
  },
  "Chukat": {
    name: "Jukat",
    hebrew: "חקת",
    book: "Bamidbar (Números)",
    summary: "Moisés y el pueblo necesitan agua en el desierto. Aunque hay momentos difíciles, Dios les provee agua de una roca, recordándonos que siempre debemos hablar con dulzura y tener paciencia.",
    words: ["AGUA", "PACIENCIA", "DULZURA", "HABLAR", "ROCA", "POZO", "CUIDADO", "MILAGRO"],
    trivia: [
      {
        question: "¿Qué le pidió Dios a Moisés que hiciera para obtener agua de la roca?",
        options: ["Que le hablara a la roca con dulzura", "Que la golpeara", "Que cantara"],
        answer: 0
      },
      {
        question: "¿Qué brotó en abundancia para calmar la sed del pueblo?",
        options: ["Agua fresca y cristalina", "Jugo de frutas", "Leche"],
        answer: 0
      },
      {
        question: "¿Qué hermosa lección aprendemos sobre cómo pedir las cosas?",
        options: ["Que debemos usar palabras amables y tener mucha paciencia", "Que hay que apurarse", "Que gritar funciona"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Agua Dulce de la Roca:**\n*Personajes:* Títere de Moisés, Títere de Niño sediento y Títere de Ovejita alegre.\n- *Niño:* Moisés, el desierto está muy seco y tenemos sed.\n- *Moisés:* Dios nos proveerá de esta roca. Pero debo recordar hablarle con paciencia.\n- *Ovejita:* ¡Miren, miren! ¡El agua fresca está brotando de la roca! ¡Qué refrescante!\n- *Niño:* ¡Gracias Dios por el agua! Aprendimos que con paciencia y buenas palabras se logran cosas milagrosas.\n- *Moisés:* Sí, el habla dulce abre caminos y corazones en Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'La gota de la paciencia'. Los niños recortan una gran gota de agua de papel celofán celeste y escriben en ella palabras amables que usan para pedir cosas (ej: 'Por favor', 'Gracias').",
      song: "**Canción - Habla con Dulzura:**\n*Letra:*\nEl agua de la roca brotó con amor,\npara calmar la sed y darnos frescor.\nHabla con dulzura, no uses la fuerza,\n¡y verás qué linda la vida comienza!\n*Coro:*\n¡Paciencia y amor en este Shabat!\nEn Shabateinu NBI cantamos en paz."
    },
    storyPages: [
      { title: "Sed en el Desierto", text: "El pueblo caminaba bajo el sol y no encontraba agua. Empezaron a preocuparse y a perder la paciencia, olvidando que Dios los cuidaba.", emoji: "☀️" },
      { title: "La Roca del Milagro", text: "Dios le dijo a Moisés: 'Toma tu bastón, reúne al pueblo y háblale a la roca.' Moisés estaba enojado y en lugar de hablarle, la golpeó.", emoji: "🪨" },
      { title: "Agua en Abundancia", text: "A pesar del error de Moisés, Dios tuvo compasión del pueblo y del ganado, haciendo brotar agua fresca y limpia en gran cantidad para todos.", emoji: "💧" },
      { title: "El Canto al Pozo", text: "Al encontrar una fuente de agua más adelante, el pueblo cantó de alegría para agradecer a Dios por el agua. Agradecer nos llena de optimismo.", emoji: "🎵" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "מים", wordMeaning: "Agua" },
      { letter: "ס", name: "Samej", sound: "S", word: "סלע", wordMeaning: "Roca" },
      { letter: "ס", name: "Samej", sound: "S", word: "סבלנות", wordMeaning: "Paciencia" }
    ]
  },
  "Balak": {
    name: "Balak",
    hebrew: "בלק",
    book: "Bamidbar (Números)",
    summary: "El profeta Bilam intenta hablar mal del pueblo de Israel, pero Dios transforma sus palabras en hermosas bendiciones. Nos enseña que el amor de Dios siempre nos protege y que debemos usar nuestras palabras para bendecir y unir.",
    words: ["BENDICION", "PROTECCION", "BILAM", "BURRITA", "MILAGRO", "PALABRAS", "TIENDAS", "SHALOM"],
    trivia: [
      {
        question: "¿En qué se convirtieron los malos deseos que Bilam quería decir contra Israel?",
        options: ["En hermosas bendiciones de amor", "En nubes de lluvia", "En silencio"],
        answer: 0
      },
      {
        question: "¿Qué animalito inteligente habló milagrosamente para guiar a Bilam en el camino?",
        options: ["Su burrita", "Un pajarito", "Un león"],
        answer: 0
      },
      {
        question: "¿Qué famosa frase de elogio a los hogares judíos dijo Bilam al ver el campamento?",
        options: ["¡Qué hermosas son tus tiendas, oh Jacob! (Ma Tovu)", "¡Qué desierto tan grande!", "¡Hola a todos!"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - La Burrita Sabia:**\n*Personajes:* Títere de Bilam, Títere de Burrita simpática y Títere de Niño de NBI.\n- *Bilam:* Voy camino a decir palabras feas de Israel porque el rey Balak me lo pidió.\n- *Burrita:* ¡Espera, Bilam! ¿No ves que un ángel de Dios nos está cuidando en el camino? ¡No digas cosas feas!\n- *Niño:* ¡Wow, la burrita habló! Bilam, la Torá nos enseña que solo debemos hablar bien de la gente.\n- *Bilam:* Tienen razón. Al ver el campamento tan ordenado y en paz, solo puedo decir: '¡Ma Tovu! ¡Qué hermosas tus tiendas!'\n- *Burrita:* ¡Siiii! ¡Bendiciones para todos en Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'Mi tienda de Shabat'. Los niños doblan papel para hacer una casita o carpa ('tienda') y la decoran por dentro dibujando a su familia alrededor de la mesa de Shabat.",
      song: "**Canción - Ma Tovu (Qué Bellas son tus Tiendas):**\n*Letra:*\nMa tovu ojaléja Ya'akov,\n¡qué hermosas tus tiendas, llenas de amor!\nPalabras de bendición yo quiero cantar,\npara bendecir a todos en este Shabat.\n*Coro:*\n¡Qué lindo es mi hogar, qué dulce es vivir!\nCantamos felices en la NBI."
    },
    storyPages: [
      { title: "El Rey Balak", text: "Balak, el rey de Moab, tenía miedo del pueblo de Israel y contrató a un profeta llamado Bilam para que hablara mal de ellos.", emoji: "👑" },
      { title: "La Burrita de Bilam", text: "En el camino, un ángel se interpuso. La burrita de Bilam vio al ángel y se detuvo. Al final, la burrita habló para pedirle a Bilam que fuera paciente.", emoji: "🐴" },
      { title: "Palabras Transformadas", text: "Cuando Bilam subió a la montaña para maldecir al pueblo, Dios puso hermosas palabras de bendición en su boca. El amor de Dios nos protege siempre.", emoji: "✨" },
      { title: "¡Ma Tovu!", text: "Al ver las tiendas de Israel acampadas en paz y armonía, Bilam exclamó admirado: '¡Qué hermosos son tus hogares, oh Jacob, tus moradas, Israel!'", emoji: "🏕️" }
    ],
    alefBetLetters: [
      { letter: "ב", name: "Bet", sound: "B", word: "ברכה", wordMeaning: "Bendición" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אהל", wordMeaning: "Tienda" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אתון", wordMeaning: "Burrita" }
    ]
  },
  "Pinchas": {
    name: "Pinjas",
    hebrew: "פנחס",
    book: "Bamidbar (Números)",
    summary: "Las cinco hijas de Tzlofjad nos enseñan sobre la valentía y la justicia al pedir su herencia con mucho respeto. Nos recuerda la importancia de escuchar a las niñas y valorar la igualdad de todos en la familia.",
    words: ["HIJAS", "JUSTICIA", "VALENTIA", "RESPETO", "HERENCIA", "IGUALDAD", "PUEBLO", "ESCUCHAR"],
    trivia: [
      {
        question: "¿Cuántas hijas valientes de Tzlofjad pidieron participar de la herencia de la tierra?",
        options: ["Cinco hijas", "Diez hijas", "Ninguna"],
        answer: 0
      },
      {
        question: "¿Qué respondió Dios cuando las hijas de Tzlofjad presentaron su caso ante Moisés?",
        options: ["Que tenían toda la razón y debían recibir su tierra", "Que no", "Que debían esperar cien años"],
        answer: 0
      },
      {
        question: "¿Qué valor tan importante aprendemos de la actitud de estas hermanas?",
        options: ["El valor de la justicia, la igualdad y pedir las cosas con respeto", "Que hay que pelear", "Que el silencio es mejor"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - Las Cinco Hermanas:**\n*Personajes:* Títere de Majlá (hermana mayor), Títere de Noá (hermana menor), Títere de Moisés y Títere de Niño de NBI.\n- *Majlá:* Moisés, venimos con mucho respeto a pedir la porción de tierra de nuestro querido papá.\n- *Noá:* Creemos que es justo que las mujeres también tengamos un lugar en la hermosa tierra de Israel.\n- *Moisés:* Su petición es muy sabia. Preguntaré a Dios cuál es la ley justa.\n- *Niño:* ¡Dios les dijo que sí! ¡Qué alegría! La Torá nos enseña que todos somos iguales y valiosos ante Dios.\n- *Hermanas:* ¡Siiii! Gracias por escucharnos con tanto cariño en Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'El mapa de la justicia'. Los niños dibujan un gran mapa de Israel dividido en parcelas de colores y pegan flores de papel con los nombres de las cinco hermanas como símbolo de igualdad.",
      song: "**Canción - Con Respeto y Valor:**\n*Letra:*\nCinco hermanas valientes a Moisés le hablaron,\ncon respeto y justicia su tierra reclamaron.\nDios escuchó sus voces y les dio la razón,\n¡trayendo alegría a todo el corazón!\n*Coro:*\n¡Justicia e igualdad, cantamos en Shabat!\nEn Shabateinu NBI crecemos en bondad."
    },
    storyPages: [
      { title: "Las Cinco Hermanas", text: "Majlá, Noá, Joglá, Milcá y Tirtzá eran cinco hermanas que querían mucho a la Tierra de Israel. Ellas querían conservar el legado de su padre.", emoji: "👭" },
      { title: "Un Pedido con Respeto", text: "Se presentaron ante Moisés, los líderes y todo el pueblo en la entrada del Mishkán, explicando su situación de manera calmada, lógica y respetuosa.", emoji: "🏛️" },
      { title: "La Respuesta de Dios", text: "Moisés consultó a Dios, y Dios le respondió: 'Las hijas de Tzlofjad tienen razón. Dales una herencia entre los hermanos de su padre.'", emoji: "⚖️" },
      { title: "El Nuevo Líder Josué", text: "En esta parashá, Dios le pide a Moisés que bendiga a Josué como el nuevo líder del pueblo, asegurando que sigan su viaje con amor y guía.", emoji: "👑" }
    ],
    alefBetLetters: [
      { letter: "ב", name: "Bet", sound: "B", word: "בת", wordMeaning: "Hija" },
      { letter: "צ", name: "Tzadi", sound: "Tz", word: "צדק", wordMeaning: "Justicia" },
      { letter: "נ", name: "Nun", sound: "N", word: "נחלה", wordMeaning: "Herencia" }
    ]
  },
  "Matot": {
    name: "Matot",
    hebrew: "מטות",
    book: "Bamidbar (Números)",
    summary: "Esta parashá nos enseña la importancia de cumplir nuestras promesas y mantener nuestra palabra. Cuando decimos que vamos a hacer algo bueno, debemos esforzarnos al máximo por cumplirlo con honestidad.",
    words: ["PROMESAS", "PALABRA", "HONESTIDAD", "CUMPLIR", "VALOR", "DEBER", "SINCERIDAD", "CONFIANZA"],
    trivia: [
      {
        question: "¿Qué nos enseña la Torá sobre la palabra que sale de nuestra boca?",
        options: ["Que debemos cumplir nuestras promesas y compromisos con honestidad", "Que podemos decir mentiras", "Que las palabras no importan"],
        answer: 0
      },
      {
        question: "¿Cómo se llama cuando prometemos hacer una mitzvá o una buena acción?",
        options: ["Un compromiso o promesa (Neder)", "Un chiste", "Un juego"],
        answer: 0
      },
      {
        question: "¿Por qué es importante cumplir la palabra para mantener la amistad?",
        options: ["Porque genera confianza y nos hace personas confiables", "Para recibir premios", "No es importante"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - La Promesa del Shabat:**\n*Personajes:* Títere de Ovejita comprometida, Títere de Conejito impaciente y Títere de Niño sincero.\n- *Ovejita:* Conejito, te prometí que hoy te ayudaría a armar tu rompecabezas de Shabat.\n- *Conejito:* Pero ahora tienes sueño, ¿todavía quieres ayudarme?\n- *Ovejita:* ¡Claro! Matot nos enseña que nuestra palabra es sagrada. Si prometí ayudar, ¡lo haré con alegría!\n- *Niño:* ¡Qué buena amiga eres, ovejita! Cumplir lo que decimos crea una comunidad muy unida en Shabateinu NBI.\n- *Conejito:* ¡Sí! Jugar juntos es hermoso cuando confiamos en la palabra del otro.",
      costumes: "**Taller de Manualidades:**\n'La pulsera del compromiso'. Los niños hacen pulseras trenzadas de hilo de colores. Al terminar, prometen realizar una buena acción y no se quitan la pulsera hasta cumplirla.",
      song: "**Canción - Mi Palabra Vale:**\n*Letra:*\nSi mi boca dice 'te voy a ayudar',\nmi mano trabaja hasta terminar.\nCumplir las promesas trae gran felicidad,\n¡y llena de confianza este lindo Shabat!\n*Coro:*\n¡Mi palabra es oro, sinceridad total!\nEn Shabateinu NBI cantamos en paz."
    },
    storyPages: [
      { title: "El Valor de la Palabra", text: "Matot nos enseña que cuando prometemos hacer algo bueno (Neder), debemos cumplirlo exactamente como lo dijimos. Nuestra palabra tiene mucho valor.", emoji: "🗣️" },
      { title: "Construir Confianza", text: "Cumplir lo que prometemos a nuestros amigos y familia crea confianza. La gente sabe que puede contar con nosotros porque somos honestos.", emoji: "🤝" },
      { title: "Tribus del Desierto", text: "Dos tribus pidieron quedarse en tierras de pastos verdes para sus ovejas, pero prometieron ayudar primero a todo el pueblo a cruzar el río Jordán.", emoji: "🐑" },
      { title: "Cumplir el Compromiso", text: "Moisés aceptó su pedido porque confiaba en su promesa. Al final, las tribus cumplieron con valentía su palabra de ayudar a sus hermanos.", emoji: "💪" }
    ],
    alefBetLetters: [
      { letter: "ד", name: "Dalet", sound: "D", word: "דבר", wordMeaning: "Palabra" },
      { letter: "נ", name: "Nun", sound: "N", word: "נדר", wordMeaning: "Promesa" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אמת", wordMeaning: "Verdad" }
    ]
  },
  "Masei": {
    name: "Masei",
    hebrew: "מסעי",
    book: "Bamidbar (Números)",
    summary: "Moisés escribe un diario con las 42 paradas del viaje por el desierto. Nos enseña a valorar cada paso de nuestro crecimiento y a ver cómo Dios nos acompaña en todo momento de nuestro camino.",
    words: ["VIAJE", "DIARIO", "PARADAS", "CRECIMIENTO", "CAMINAR", "COMPAÑIA", "FUTURO", "HISTORIA"],
    trivia: [
      {
        question: "¿Qué escribió Moisés en esta parashá para recordar el camino?",
        options: ["La lista de todas las paradas y viajes del pueblo por el desierto", "Una receta de maná", "Una carta al faraón"],
        answer: 0
      },
      {
        question: "¿Cuántas estaciones o paradas hicieron los israelitas en su viaje por el desierto?",
        options: ["42 paradas", "5 paradas", "100 paradas"],
        answer: 0
      },
      {
        question: "¿Qué frase feliz decimos al terminar el libro de Bamidbar?",
        options: ["¡Jazak, Jazak, V'nitjazek!", "¡Shalom Aleijem!", "¡Buenas noches!"],
        answer: 0
      }
    ],
    activities: {
      puppets: "**Guión - El Mapa del Viaje:**\n*Personajes:* Títere de Mochilero con mapa, Títere de Ovejita viajera y Títere de Niño sonriente.\n- *Mochilero:* ¡Wow! Hemos recorrido un camino muy largo. ¡Miren este mapa con todas las paradas!\n- *Ovejita:* ¡Beeee! Recuerdo cuando acampamos junto al agua y cuando caminamos entre las rocas.\n- *Niño:* Cada parada nos ayudó a crecer y a ser más unidos. ¡Dios nos acompañó en todo momento!\n- *Mochilero:* Así es. Al terminar de leer Bamidbar decimos: '¡Jazak, Jazak, V'nitjazek!'\n- *Ovejita y Niño:* ¡A ser fuertes y seguir viajando juntos en Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'Mi diario de viaje'. Los niños confeccionan un pequeño cuaderno con hojas dobladas y dibujan en la portada un camino que representa su propio crecimiento desde bebés hasta hoy.",
      song: "**Canción - Caminando Juntos:**\n*Letra:*\nCuarenta y dos paradas en el desierto andamos,\ncon la nube de día y el fuego marchamos.\nCada paso del viaje nos hizo crecer,\n¡y nuevas historias vamos a aprender!\n*Coro:*\n¡Jazak, Jazak, V'nitjazek, sí!\nTerminamos Bamidbar en la NBI feliz."
    },
    storyPages: [
      { title: "El Diario del Viaje", text: "Masei significa 'los viajes'. Moisés escribió un registro de todas las paradas del pueblo en el desierto para recordar cómo Dios los cuidó.", emoji: "📖" },
      { title: "Ciudades de Refugio", text: "Dios ordenó establecer ciudades especiales para proteger a las personas en momentos difíciles, enseñándonos a crear espacios seguros de paz y justicia.", emoji: "🏡" },
      { title: "El Valor de Recordar", text: "Recordar el camino recorrido nos ayuda a dar gracias por las personas que nos ayudaron y las lecciones que aprendimos en el camino de la vida.", emoji: "✨" },
      { title: "¡Jazak, Jazak, V'nitjazek!", text: "Con esta parashá terminamos el cuarto libro de la Torá, Bamidbar. Todo el pueblo celebra unido, dándose fuerzas para comenzar el último libro.", emoji: "💪" }
    ],
    alefBetLetters: [
      { letter: "מ", name: "Mem", sound: "M", word: "מסע", wordMeaning: "Viaje" },
      { letter: "ד", name: "Dalet", sound: "D", word: "דרך", wordMeaning: "Camino" },
      { letter: "ח", name: "Jet", sound: "J", word: "חזק", wordMeaning: "Fuerte" }
    ]
  },

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
  "Vaetchanan": {
    name: "Vaetjanán",
    hebrew: "ואתחנן",
    book: "Devarim (Deuteronomio)",
    summary: "Moisés le pide con mucho amor a Dios poder entrar a la Tierra Prometida. Nos enseña el Shemá Israel, recordándonos que Dios es Uno y que debemos amarlo con todo nuestro corazón, alma y fuerzas. También nos pide colocar la Mezuzá en nuestras puertas.",
    words: ["SHEMA", "ESCUCHA", "REZO", "CORAZON", "DIOS", "AMOR", "SINAI", "MEZUZA"],
    trivia: [
      { question: "¿Qué oración tan importante nos enseña Moisés en Vaetchanan?", options: ["El Shemá Israel", "El Shabat Shalom", "El Adón Olam"], answer: 0 },
      { question: "¿Qué significa la palabra 'Shemá'?", options: ["Escucha", "Canta", "Salta"], answer: 0 },
      { question: "¿Dónde colocamos las palabras sagradas en nuestro hogar?", options: ["En la Mezuzá, en las jambas de las puertas", "En la ventana", "En el techo"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - El Rezo del Shemá:**\n*Personajes:* Títere de Moisés, Títere de Ovejita dormilona y Títere de Niño agradecido.\n- *Moisés:* Escuchen con atención, pueblo de Israel: ¡Dios es Uno y único!\n- *Niño:* Sí, Moisés, y debemos amarlo con todo el corazón y toda nuestra alma.\n- *Ovejita:* ¡Beeee! A mí me gusta taparme los ojos y decir el Shemá antes de ir a dormir.\n- *Niño:* ¡Sí! El Shemá nos llena de paz y dulzura antes de soñar.\n- *Moisés:* Dios los escucha siempre. ¡Shabat Shalom!",
      costumes: "**Taller de Manualidades:**\n'Mi propia Mezuzá'. Los niños decoran una cajita de cartón pequeña, enrollan un pergamino de papel donde escriben el Shemá y lo colocan dentro para colgar en la puerta de su salón.",
      song: "**Canción - Shemá Israel:**\n*Letra:*\nShemá Israel, Hashem es nuestro Dios,\nDios es Uno solo, nos da su bendición.\nEn mi corazón guardo su Torá,\ncanto Shabateinu lleno de hermandad.\n*Coro:*\n¡Shemá Israel, cantamos con amor!\nUnidos en Santiago, un solo corazón."
    },
    storyPages: [
      { title: "El Deseo de Moisés", text: "Moisés le pidió a Dios con todo su corazón poder cruzar el río Jordán y ver la hermosa Tierra Prometida. Dios le permitió verla desde lejos, desde la cima de una montaña.", emoji: "🙏" },
      { title: "Escucha, Israel", text: "Moisés enseñó al pueblo la oración más importante: ¡Shemá Israel! 'Escucha Israel, Dios es nuestro Dios, Dios es Uno.' Nos pide amarlo con todo nuestro ser.", emoji: "❤️" },
      { title: "Enseñar con Amor", text: "Moisés les dijo a los padres: 'Enséñenles estas palabras a sus hijos en casa, caminando, al acostarse y al levantarse.' Las enseñanzas deben vivir en cada momento.", emoji: "👨‍👧" },
      { title: "La Mezuzá en la Puerta", text: "También nos pidió escribir las palabras sagradas en los marcos de las puertas de nuestras casas. Así nació la hermosa costumbre de la Mezuzá.", emoji: "🚪" }
    ],
    alefBetLetters: [
      { letter: "ש", name: "Shin", sound: "Sh", word: "שמע", wordMeaning: "Shemá (Escucha)" },
      { letter: "א", name: "Alef", sound: "(silencio)", word: "אחד", wordMeaning: "Uno" },
      { letter: "מ", name: "Mem", sound: "M", word: "מזוזה", wordMeaning: "Mezuzá" }
    ]
  },
  "Eikev": {
    name: "Eikev",
    hebrew: "עקב",
    book: "Devarim (Deuteronomio)",
    summary: "Moisés le recuerda al pueblo que si cumplen con las mitzvot (buenas acciones), Dios los bendecirá con lluvias, cosechas y abundancia. Aquí aprendemos la hermosa bendición de Birkat Hamazón (después de comer) y que el ser humano no solo vive de pan.",
    words: ["BENDICION", "LLUVIA", "COSECHA", "PAN", "GRATITUD", "ABUNDANCIA", "COMER", "AGRADECER"],
    trivia: [
      { question: "¿Qué nos pide Moisés hacer después de comer?", options: ["Agradecer a Dios con Birkat Hamazón", "Salir a jugar inmediatamente", "Tomar una siesta"], answer: 0 },
      { question: "¿De qué no solo vive el ser humano según la Torá?", options: ["No solo de pan, sino de toda palabra de Dios", "No solo de agua", "No solo de juegos"], answer: 0 },
      { question: "¿Qué promete Dios si el pueblo cumple las mitzvot?", options: ["Lluvias a tiempo y buenas cosechas", "Un palacio de oro", "Vacaciones eternas"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - El Pan y la Gratitud:**\n*Personajes:* Títere de Panadero, Títere de Niño hambriento y Títere de Ovejita agradecida.\n- *Niño:* ¡Mmm, qué rico pan! ¡Ya terminé de comer!\n- *Panadero:* ¡Espera! Antes de irte, ¿no te olvidas de algo?\n- *Ovejita:* ¡Beeee! ¡Hay que dar las gracias! Birkat Hamazón.\n- *Niño:* ¡Cierto! Gracias Dios por la comida, la lluvia que riega los campos y todo lo bueno.\n- *Panadero:* ¡Así se hace! La gratitud es la receta secreta de la felicidad en Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'Mi tarjeta de gratitud'. Los niños decoran una tarjeta con forma de pan (Jalá) donde escriben tres cosas por las que están agradecidos esta semana.",
      song: "**Canción - Gracias por el Pan:**\n*Letra:*\nGracias Dios por el pan de cada día,\npor la lluvia que riega con alegría.\nNo solo de pan vivimos nosotros,\nsino de tu palabra y amor entre todos.\n*Coro:*\n¡Birkat Hamazón, cantar con pasión!\nEn Shabateinu NBI damos la bendición."
    },
    storyPages: [
      { title: "La Promesa de la Tierra", text: "Moisés les contó al pueblo sobre la hermosa tierra que iban a recibir: una tierra con trigo, cebada, uvas, higos, granadas, aceitunas y miel. ¡Siete especies maravillosas!", emoji: "🍇" },
      { title: "No Solo de Pan", text: "Moisés les recordó que en el desierto Dios les dio maná para enseñarles que el ser humano no solo vive de pan, sino también de la palabra de Dios y el amor.", emoji: "🍞" },
      { title: "Agradecer Después de Comer", text: "Cuando comamos y estemos satisfechos, debemos bendecir y agradecer a Dios. Así nació la hermosa oración de Birkat Hamazón que decimos después de las comidas.", emoji: "🙏" },
      { title: "Las Buenas Acciones Traen Bendición", text: "Si cuidamos las mitzvot con amor, Dios enviará lluvias a tiempo para que los campos florezcan y haya comida para todos. ¡La bondad trae abundancia!", emoji: "🌧️" }
    ],
    alefBetLetters: [
      { letter: "ב", name: "Bet", sound: "B", word: "ברכה", wordMeaning: "Bendición" },
      { letter: "ל", name: "Lamed", sound: "L", word: "לחם", wordMeaning: "Pan" },
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "עקב", wordMeaning: "Eikev (Resultado)" }
    ]
  },
  "Re'eh": {
    name: "Re'eh",
    hebrew: "ראה",
    book: "Devarim (Deuteronomio)",
    summary: "Moisés nos dice: '¡Mira! Pongo ante ti bendición y maldición.' Nos enseña que siempre podemos elegir el camino del bien. También aprendemos sobre la Tzedaká (caridad): abrir nuestra mano con generosidad para ayudar a quienes lo necesitan.",
    words: ["ELEGIR", "BENDICION", "CAMINO", "TZEDAKA", "GENEROSIDAD", "BIEN", "MANO", "AYUDAR"],
    trivia: [
      { question: "¿Qué nos pide Moisés que elijamos?", options: ["El camino de la bendición y el bien", "El camino más corto", "El camino con más dulces"], answer: 0 },
      { question: "¿Qué es la Tzedaká?", options: ["Dar caridad y ayudar a los demás con generosidad", "Un juego de mesa", "Una comida especial"], answer: 0 },
      { question: "¿Qué significa el nombre 'Re'eh'?", options: ["Mira / Observa", "Corre", "Duerme"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - El Camino de la Bondad:**\n*Personajes:* Títere de Niño pensativo y Títere de Ángel con alas brillantes.\n- *Niño:* Hoy tengo que elegir: ¿comparto mi merienda o me la como solo?\n- *Ángel:* ¡Piensa con el corazón! La Torá dice que siempre podemos elegir el bien.\n- *Niño:* ¡Tienes razón! Voy a compartir. ¡Eso es Tzedaká!\n- *Ángel:* ¡Maravilloso! Cuando abres tu mano con generosidad, el mundo se llena de luz.\n- *Niño:* ¡En Shabateinu NBI siempre elegimos el camino de la bondad!",
      costumes: "**Taller de Manualidades:**\n'Mi alcancía de Tzedaká'. Los niños decoran un vaso de cartón con brillantina, estrellas y la palabra Tzedaká para guardar moneditas y donar antes de Shabat.",
      song: "**Canción - Elegir el Bien:**\n*Letra:*\nMira, mira, puedo elegir,\nel camino del bien para ser feliz.\nCon Tzedaká abro mi mano y corazón,\n¡compartir es la mejor decisión!\n*Coro:*\n¡Re'eh, mira con amor!\nEn Shabateinu NBI somos luz del Creador."
    },
    storyPages: [
      { title: "Elegir el Camino", text: "Moisés le dijo al pueblo: '¡Mira! Pongo ante ti dos caminos: uno de bendición y otro de maldición. Elige siempre la bendición.' Cada día podemos elegir hacer el bien.", emoji: "🛤️" },
      { title: "La Generosidad del Corazón", text: "La Torá nos enseña a abrir nuestra mano para ayudar a los necesitados. No debemos endurecer nuestro corazón, sino dar con alegría. Eso se llama Tzedaká.", emoji: "🤲" },
      { title: "Las Fiestas de Alegría", text: "También aprendemos sobre las tres fiestas de peregrinaje: Pésaj, Shavuot y Sucot, cuando todo el pueblo se reunía con alegría para celebrar y agradecer juntos.", emoji: "🎉" },
      { title: "El Poder de Elegir", text: "Cada mañana podemos elegir ser amables, generosos y buenos amigos. Esa capacidad de elegir es un regalo de Dios que nos hace especiales.", emoji: "⭐" }
    ],
    alefBetLetters: [
      { letter: "ר", name: "Resh", sound: "R", word: "ראה", wordMeaning: "Mira" },
      { letter: "צ", name: "Tsade", sound: "Ts", word: "צדקה", wordMeaning: "Tzedaká (Caridad)" },
      { letter: "ט", name: "Tet", sound: "T", word: "טוב", wordMeaning: "Bueno" }
    ]
  },
  "Shoftim": {
    name: "Shoftim",
    hebrew: "שופטים",
    book: "Devarim (Deuteronomio)",
    summary: "Moisés nos enseña sobre la justicia y nos pide nombrar jueces y policías honestos. La frase más famosa es: '¡Tzédek, Tzédek tirdof!' — ¡Justicia, justicia perseguirás! También aprendemos a cuidar los árboles y la naturaleza.",
    words: ["JUSTICIA", "JUECES", "VERDAD", "HONESTIDAD", "ARBOLES", "POLICIA", "CUIDAR", "PAZ"],
    trivia: [
      { question: "¿Qué frase famosa sobre la justicia aparece en Shoftim?", options: ["¡Justicia, justicia perseguirás!", "¡Corre, corre sin parar!", "¡Vamos a jugar!"], answer: 0 },
      { question: "¿A quiénes nos pide nombrar Moisés para mantener el orden?", options: ["Jueces y policías honestos", "Payasos y magos", "Cocineros y panaderos"], answer: 0 },
      { question: "¿Qué nos enseña la Torá sobre los árboles?", options: ["Que debemos cuidarlos y no destruirlos", "Que debemos cortarlos todos", "Que no son importantes"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - El Juez Justo:**\n*Personajes:* Títere de Juez con martillo de goma, Títere de Niño y Títere de Niña discutiendo.\n- *Niño:* ¡Ella tomó mi lápiz sin permiso!\n- *Niña:* ¡Pero yo lo necesitaba para mi dibujo!\n- *Juez:* ¡Un momento! Escucharé a los dos con mucho cuidado antes de decidir.\n- *Juez:* La justicia dice que debemos compartir y pedir permiso. ¿Pueden turnarse?\n- *Niño y Niña:* ¡Sí! ¡Gracias, juez justo de Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'El martillo de la justicia'. Los niños construyen un martillo de cartón decorado con la palabra 'Tzédek' (justicia) en hebreo y practican ser jueces justos.",
      song: "**Canción - Justicia para Todos:**\n*Letra:*\nJusticia, justicia voy a perseguir,\ncon verdad y amor quiero vivir.\nCuido los árboles, cuido a mis amigos,\n¡en la NBI somos todos testigos!\n*Coro:*\n¡Tzédek, tzédek, cantamos así!\nJusticia y paz en Shabateinu NBI."
    },
    storyPages: [
      { title: "Jueces Honestos", text: "Moisés pidió al pueblo nombrar jueces y policías honestos en todas las ciudades. Ellos debían escuchar con cuidado a todas las personas antes de decidir, sin favorecer a nadie.", emoji: "⚖️" },
      { title: "¡Justicia, Justicia Perseguirás!", text: "La Torá nos enseña la frase más poderosa: '¡Tzédek, tzédek tirdof!' Debemos buscar la justicia siempre, siendo honestos y tratando a todos con igualdad.", emoji: "🏛️" },
      { title: "Cuidar los Árboles", text: "Incluso en tiempos difíciles, la Torá nos prohíbe destruir los árboles frutales. ¡La naturaleza es un regalo sagrado que debemos proteger siempre!", emoji: "🌳" },
      { title: "Ser Justos Cada Día", text: "Podemos practicar la justicia cada día: escuchando a nuestros amigos, compartiendo, diciendo la verdad y tratando a todos con respeto y cariño.", emoji: "🤝" }
    ],
    alefBetLetters: [
      { letter: "צ", name: "Tsade", sound: "Ts", word: "צדק", wordMeaning: "Justicia" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שופט", wordMeaning: "Juez" },
      { letter: "ע", name: "Ayin", sound: "(silencio)", word: "עץ", wordMeaning: "Árbol" }
    ]
  },
  "KiTeitzei": {
    name: "Ki Teitzei",
    hebrew: "כי תצא",
    book: "Devarim (Deuteronomio)",
    summary: "Esta parashá tiene la mayor cantidad de mitzvot de toda la Torá: ¡74 mandamientos! Aprendemos a devolver objetos perdidos, a cuidar a los animales, a ser honestos en los negocios y a respetar a todos. También aprendemos sobre el Shiluaj Hakén: dejar libre a la madre pájaro.",
    words: ["MITZVOT", "DEVOLVER", "HONESTIDAD", "ANIMALES", "PAJARO", "BONDAD", "RESPETO", "CUIDAR"],
    trivia: [
      { question: "¿Cuántas mitzvot tiene Ki Teitzei, más que cualquier otra parashá?", options: ["74 mitzvot", "10 mitzvot", "3 mitzvot"], answer: 0 },
      { question: "¿Qué debemos hacer si encontramos un objeto perdido?", options: ["Devolverlo a su dueño", "Quedárnoslo", "Esconderlo"], answer: 0 },
      { question: "¿Qué mitzvá nos enseña a cuidar a la madre pájaro?", options: ["Shiluaj Hakén: dejarla ir libre antes de tomar los huevos", "Atraparla y llevarla a casa", "Ignorarla"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - El Tesoro Perdido:**\n*Personajes:* Títere de Niño detective, Títere de Ovejita llorona y Títere de Pajarita.\n- *Ovejita:* ¡Beeee! ¡Perdí mi campana favorita! ¿Alguien la vio?\n- *Niño:* ¡Mira! ¡La encontré aquí debajo de la silla!\n- *Pajarita:* ¡La Torá dice que siempre debemos devolver lo que encontramos!\n- *Niño:* ¡Aquí tienes, Ovejita! Devolver cosas perdidas es una mitzvá hermosa.\n- *Ovejita:* ¡Gracias! ¡En Shabateinu NBI somos honestos y bondadosos!",
      costumes: "**Taller de Manualidades:**\n'El nido del pájaro'. Los niños construyen un nido de papel crepé y ramitas con un pajarito de cartulina, recordando la mitzvá de cuidar a los animales.",
      song: "**Canción - 74 Mitzvot:**\n*Letra:*\nSetenta y cuatro mitzvot para aprender,\ndevolver lo perdido y a todos querer.\nCuidar a los pájaros, ser siempre honesto,\n¡en cada mitzvá ponemos lo nuestro!\n*Coro:*\n¡Ki Teitzei nos enseña a actuar!\nCon bondad y amor en Shabat."
    },
    storyPages: [
      { title: "La Parashá de las Mitzvot", text: "Ki Teitzei tiene más mitzvot que cualquier otra parashá: ¡74 mandamientos! Son reglas de amor que nos enseñan a vivir con bondad, honestidad y respeto.", emoji: "📜" },
      { title: "Devolver lo Perdido", text: "Si encontramos algo que alguien perdió, debemos cuidarlo y devolverlo. No importa si es una moneda pequeña o un animal grande. ¡La honestidad es un tesoro!", emoji: "🔑" },
      { title: "La Madre Pájaro", text: "Si encontramos un nido con una madre pájaro y sus huevos, debemos dejar ir libre a la mamá antes de tomar los huevos. Esto nos enseña compasión por todos los seres vivos.", emoji: "🐦" },
      { title: "Pesos y Medidas Justos", text: "La Torá nos pide usar pesas y medidas honestas. No debemos engañar a nadie. Ser honesto en todo lo que hacemos nos acerca a Dios y a los demás.", emoji: "⚖️" }
    ],
    alefBetLetters: [
      { letter: "כ", name: "Kaf", sound: "K", word: "כי", wordMeaning: "Cuando" },
      { letter: "ה", name: "He", sound: "H", word: "השבה", wordMeaning: "Devolver" },
      { letter: "צ", name: "Tsade", sound: "Ts", word: "ציפור", wordMeaning: "Pájaro" }
    ]
  },
  "KiTavo": {
    name: "Ki Tavo",
    hebrew: "כי תבוא",
    book: "Devarim (Deuteronomio)",
    summary: "Cuando el pueblo entre a la Tierra Prometida, debe traer las primicias (primeros frutos) al Templo con alegría y gratitud. Moisés nos recuerda agradecer siempre por todo lo bueno que tenemos y compartir con los que menos tienen.",
    words: ["PRIMICIAS", "FRUTOS", "GRATITUD", "TEMPLO", "TIERRA", "ALEGRIA", "COMPARTIR", "COSECHA"],
    trivia: [
      { question: "¿Qué son las 'Bikurim' (primicias)?", options: ["Los primeros frutos de la cosecha que se ofrecían en el Templo con alegría", "Los juguetes más nuevos", "Las primeras letras del alfabeto"], answer: 0 },
      { question: "¿Qué debemos sentir cuando recibimos cosas buenas?", options: ["Gratitud y alegría", "Aburrimiento", "Enojo"], answer: 0 },
      { question: "¿Con quiénes debemos compartir nuestras bendiciones?", options: ["Con los que menos tienen", "Con nadie", "Solo con los ricos"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - La Canasta de Frutas:**\n*Personajes:* Títere de Granjero con canasta, Títere de Niño y Títere de Fresa gigante.\n- *Granjero:* ¡Miren mi canasta! Las primeras frutas de mi jardín: uvas, higos y granadas.\n- *Fresa:* ¡Y yo! ¡Soy la más roja y dulce de todas!\n- *Niño:* ¿Qué vas a hacer con ellas, Granjero?\n- *Granjero:* Las llevaré al Templo para agradecer a Dios. ¡Son las Bikurim!\n- *Niño:* ¡Qué lindo! En Shabateinu NBI también agradecemos por todo lo bueno.",
      costumes: "**Taller de Manualidades:**\n'Mi canasta de Bikurim'. Los niños decoran una canasta de papel y le pegan frutas recortadas de cartulina de colores representando las siete especies de Israel.",
      song: "**Canción - Gracias por los Frutos:**\n*Letra:*\nTraigo mis frutos con alegría,\nlas primicias de este hermoso día.\nUvas, granadas e higos también,\n¡agradezco a Dios por todo su bien!\n*Coro:*\n¡Ki Tavo, llegamos con amor!\nFrutos de la tierra para el Creador."
    },
    storyPages: [
      { title: "Los Primeros Frutos", text: "Cuando los israelitas entraran a la Tierra Prometida y cosecharan sus primeros frutos, debían llevarlos en una hermosa canasta al Templo para agradecer a Dios.", emoji: "🧺" },
      { title: "La Oración de Gratitud", text: "Al entregar los frutos, el granjero decía: 'Mi padre fue un arameo errante, bajó a Egipto y Dios nos sacó con mano fuerte.' Recordar nuestra historia nos llena de gratitud.", emoji: "🙏" },
      { title: "Compartir con Todos", text: "La Torá nos pide compartir nuestra cosecha con los levitas, los extranjeros, los huérfanos y las viudas. Cuando compartimos, la bendición se multiplica.", emoji: "🤝" },
      { title: "Un Pueblo Agradecido", text: "Moisés les recordó que son un pueblo especial, elegido para ser ejemplo de bondad y gratitud. Cuando agradecemos, nuestro corazón se llena de alegría.", emoji: "✨" }
    ],
    alefBetLetters: [
      { letter: "ב", name: "Bet", sound: "B", word: "ביכורים", wordMeaning: "Primicias" },
      { letter: "פ", name: "Pe", sound: "P", word: "פרי", wordMeaning: "Fruto" },
      { letter: "ת", name: "Tav", sound: "T", word: "תודה", wordMeaning: "Gracias" }
    ]
  },
  "Nitzavim": {
    name: "Nitzavim",
    hebrew: "נצבים",
    book: "Devarim (Deuteronomio)",
    summary: "Todo el pueblo de Israel, desde los más grandes hasta los más pequeños, se pone de pie ante Dios para renovar su pacto de amor. Moisés les dice que la Torá no está lejos ni en el cielo: ¡está en nuestro corazón y en nuestra boca! También nos enseña a elegir la vida.",
    words: ["PACTO", "CORAZON", "VIDA", "ELEGIR", "UNIDOS", "TODOS", "AMOR", "PROMESA"],
    trivia: [
      { question: "¿Quiénes se pararon ante Dios para renovar el pacto?", options: ["Todo el pueblo: grandes, pequeños, hombres, mujeres y niños", "Solo los adultos", "Solo los reyes"], answer: 0 },
      { question: "¿Dónde dice Moisés que está la Torá?", options: ["En nuestro corazón y en nuestra boca, muy cerca de nosotros", "En el cielo inalcanzable", "Al otro lado del mar"], answer: 0 },
      { question: "¿Qué nos pide Moisés elegir?", options: ["La vida y la bendición", "El camino más fácil", "No elegir nada"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - Todos Juntos:**\n*Personajes:* Títere de Moisés, Títere de Niño pequeño y Títere de Abuelita.\n- *Moisés:* Hoy, todo el pueblo se para junto ante Dios: ¡grandes y chicos!\n- *Niño:* ¿Yo también cuento, Moisés? ¡Soy muy pequeño!\n- *Abuelita:* ¡Claro que sí, mi amor! Cada persona es importante.\n- *Moisés:* La Torá no está lejos. ¡Está en tu corazón! Elige la vida, elige el bien.\n- *Niño:* ¡Elijo la vida y la bondad! ¡Shabat Shalom desde Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'El corazón de la Torá'. Los niños recortan un corazón grande de cartulina roja y escriben dentro su mitzvá favorita o una promesa de bondad para la semana.",
      song: "**Canción - Elige la Vida:**\n*Letra:*\nTodos juntos nos paramos hoy,\ngrandes y chiquitos, ¡aquí estoy!\nLa Torá está en mi corazón,\nelijo la vida con toda pasión.\n*Coro:*\n¡Nitzavim, de pie con amor!\nUnidos en la NBI ante el Creador."
    },
    storyPages: [
      { title: "De Pie Ante Dios", text: "Nitzavim significa 'de pie'. Todo el pueblo de Israel, desde los líderes hasta los niños más pequeños, se paró junto ante Dios para renovar su promesa de amor y fidelidad.", emoji: "🧍" },
      { title: "La Torá en el Corazón", text: "Moisés les dijo: 'Esta enseñanza no está en el cielo ni al otro lado del mar. ¡Está muy cerca de ti, en tu boca y en tu corazón!' La Torá vive dentro de nosotros.", emoji: "❤️" },
      { title: "Elige la Vida", text: "Moisés proclamó: 'Pongo ante ti la vida y la muerte, la bendición y la maldición. ¡Elige la vida!' Cada día podemos elegir hacer el bien y ser felices.", emoji: "🌱" },
      { title: "Un Pacto para Siempre", text: "Este pacto no fue solo para los que estaban presentes ese día, sino también para todas las generaciones futuras. ¡Nosotros también somos parte de esa promesa!", emoji: "🤝" }
    ],
    alefBetLetters: [
      { letter: "ח", name: "Jet", sound: "J", word: "חיים", wordMeaning: "Vida" },
      { letter: "ל", name: "Lamed", sound: "L", word: "לב", wordMeaning: "Corazón" },
      { letter: "ב", name: "Bet", sound: "B", word: "ברית", wordMeaning: "Pacto" }
    ]
  },
  "Vayeilech": {
    name: "Vayeilej",
    hebrew: "וילך",
    book: "Devarim (Deuteronomio)",
    summary: "Moisés tiene 120 años y se despide del pueblo con mucho amor. Le pasa el liderazgo a Josué (Yehoshúa) y le dice: '¡Sé fuerte y valiente!' También nos enseña el Hakhel: reunir a todo el pueblo para leer la Torá juntos cada 7 años.",
    words: ["DESPEDIDA", "JOSUE", "VALIENTE", "FUERTE", "LIDER", "REUNION", "TORA", "AMOR"],
    trivia: [
      { question: "¿Cuántos años tenía Moisés cuando se despidió del pueblo?", options: ["120 años", "50 años", "200 años"], answer: 0 },
      { question: "¿A quién le pasó Moisés el liderazgo del pueblo?", options: ["A Josué (Yehoshúa)", "A Aarón", "A su hijo"], answer: 0 },
      { question: "¿Qué le dijo Moisés a Josué para darle ánimo?", options: ["¡Sé fuerte y valiente!", "¡Ten cuidado!", "¡Buena suerte!"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - Pase de Liderazgo:**\n*Personajes:* Títere de Moisés anciano, Títere de Josué joven y Títere de Ovejita emocionada.\n- *Moisés:* Josué, ha llegado el momento. Tú guiarás al pueblo a la Tierra Prometida.\n- *Josué:* Pero Moisés... ¡tengo un poco de miedo!\n- *Moisés:* ¡Jazak ve'ematz! ¡Sé fuerte y valiente! Dios camina contigo.\n- *Ovejita:* ¡Beeee! ¡Yo confío en ti, Josué! ¡Tú puedes!\n- *Josué:* ¡Gracias! Seré un buen líder con la ayuda de Dios y de Shabateinu NBI.",
      costumes: "**Taller de Manualidades:**\n'Mi medalla de valentía'. Los niños recortan una medalla de cartulina dorada con la frase 'Jazak Ve'ematz' (Sé fuerte y valiente) y se la cuelgan al cuello.",
      song: "**Canción - Sé Fuerte y Valiente:**\n*Letra:*\nJazak ve'ematz, no tengas temor,\nDios camina contigo con todo su amor.\nComo Josué, valiente seré,\ncon fuerza y coraje adelante iré.\n*Coro:*\n¡Vayeilej, caminamos con fe!\nEn Shabateinu NBI siempre de pie."
    },
    storyPages: [
      { title: "La Despedida de Moisés", text: "Moisés tenía 120 años y sabía que su viaje estaba terminando. Con mucho amor, fue a despedirse de cada rincón del campamento, hablando con el pueblo una última vez.", emoji: "👴" },
      { title: "Josué, el Nuevo Líder", text: "Moisés llamó a Josué frente a todo el pueblo y le dijo: '¡Sé fuerte y valiente! Tú llevarás a este pueblo a la hermosa tierra que Dios prometió.' Josué aceptó con valentía.", emoji: "🦁" },
      { title: "El Hakhel: Todos Reunidos", text: "Moisés pidió que cada siete años se reuniera a todo el pueblo, hombres, mujeres y niños, para leer la Torá juntos. Así nadie olvidaría las enseñanzas de Dios.", emoji: "📖" },
      { title: "Dios Nunca nos Abandona", text: "Moisés les prometió: 'Dios mismo irá delante de ustedes. No los abandonará ni los dejará. ¡No tengan miedo!' Esas palabras nos acompañan hasta hoy.", emoji: "🌟" }
    ],
    alefBetLetters: [
      { letter: "י", name: "Yod", sound: "Y", word: "יהושע", wordMeaning: "Josué" },
      { letter: "ח", name: "Jet", sound: "J", word: "חזק", wordMeaning: "Fuerte" },
      { letter: "ו", name: "Vav", sound: "V", word: "וילך", wordMeaning: "Y fue" }
    ]
  },
  "Ha'azinu": {
    name: "Ha'azinu",
    hebrew: "האזינו",
    book: "Devarim (Deuteronomio)",
    summary: "Moisés canta una hermosa canción de despedida dirigida al cielo y la tierra. Compara la Torá con la lluvia y el rocío que hacen florecer los campos. Es un poema de amor que nos recuerda que Dios siempre cuida a su pueblo como un águila protege a sus pichones.",
    words: ["CANCION", "CIELO", "TIERRA", "LLUVIA", "ROCIO", "AGUILA", "POEMA", "CUIDAR"],
    trivia: [
      { question: "¿Qué significa Ha'azinu?", options: ["Escuchen / Presten oído", "Canten fuerte", "Corran rápido"], answer: 0 },
      { question: "¿Con qué compara Moisés las enseñanzas de la Torá?", options: ["Con la lluvia y el rocío que hacen florecer la naturaleza", "Con una piedra dura", "Con un camino oscuro"], answer: 0 },
      { question: "¿Qué ave usa Moisés para describir cómo Dios cuida al pueblo?", options: ["Un águila que protege a sus pichones", "Un pingüino", "Un loro"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - El Canto del Rocío:**\n*Personajes:* Títere de Flor sedienta, Títere de Gota de Rocío y Títere de Niño cantarín.\n- *Flor:* Qué lindo amanecer, pero mis hojitas necesitan agua fresca.\n- *Rocío:* ¡Aquí estoy! Soy la gotita de rocío de la mañana, suave y dulce. ¡Plop!\n- *Niño:* ¡La Torá en Ha'azinu compara las enseñanzas con el rocío que ayuda a crecer!\n- *Flor:* ¡Sí! La Torá me nutre igual que el rocío. ¡Ahora mis pétalos están abiertos y felices!\n- *Niño:* ¡Cantemos juntos una canción de agradecimiento en Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'El móvil de la naturaleza'. Los niños recortan flores de colores y gotitas de lluvia celeste de papel celofán brillante, montándolas en un móvil colgante que simboliza la Torá que nos hace florecer.",
      song: "**Canción - Torá como Rocío:**\n*Letra:*\nComo lluvia en el pasto, como dulce rocío,\nla Torá en mi alma calma el frío.\nNos ayuda a crecer, a florecer con amor,\n¡cantando en Shabat al gran Creador!\n*Coro:*\n¡Ha'azinu, escucha con amor!\nEn Shabateinu NBI crecemos en paz."
    },
    storyPages: [
      { title: "El Canto del Cielo y la Tierra", text: "Ha'azinu significa 'escuchen'. Moisés cantó una hermosa canción de despedida, llamando al cielo y la tierra como testigos de su amor por el pueblo de Israel.", emoji: "🎵" },
      { title: "Torá como Lluvia Suave", text: "Moisés cantó: 'Que mi enseñanza gotee como la lluvia, que mi discurso destile como el rocío.' La Torá nutre nuestra alma como el agua nutre a las plantas.", emoji: "🌧️" },
      { title: "El Águila Protectora", text: "Moisés comparó el cuidado de Dios con un águila que despierta su nido y lleva a sus pichones con cuidado sobre sus alas gigantes. Dios nos protege así.", emoji: "🦅" },
      { title: "El Último Paso de Moisés", text: "Dios le pidió a Moisés subir al Monte Nebó para contemplar toda la hermosa Tierra de Israel desde la cima. Un momento de paz y gratitud por toda una vida de amor.", emoji: "⛰️" }
    ],
    alefBetLetters: [
      { letter: "ש", name: "Shin", sound: "Sh", word: "שירה", wordMeaning: "Canción" },
      { letter: "ט", name: "Tet", sound: "T", word: "טל", wordMeaning: "Rocío" },
      { letter: "ג", name: "Guimel", sound: "G", word: "גשם", wordMeaning: "Lluvia" }
    ]
  },
  "VZotHaBerachah": {
    name: "V'Zot HaBerajá",
    hebrew: "וזאת הברכה",
    book: "Devarim (Deuteronomio)",
    summary: "¡Moisés bendice a cada tribu de Israel con palabras llenas de amor y completamos la lectura de toda la Torá! Celebramos con gran alegría en Simjat Torá, bailando y abrazando los rollos de la Torá para volver a empezar inmediatamente desde Bereshit.",
    words: ["BENDICION", "TRIBUS", "TORA", "SIMJAT", "BAILE", "ABRAZO", "FINAL", "INICIO"],
    trivia: [
      { question: "¿Qué hace Moisés con cada una de las tribus de Israel?", options: ["Las bendice con palabras llenas de amor", "Les da un regalo de oro", "Les pide que corran"], answer: 0 },
      { question: "¿En qué fiesta celebramos la finalización de la lectura de la Torá?", options: ["Simjat Torá", "Pésaj", "Janucá"], answer: 0 },
      { question: "¿Qué hacemos apenas terminamos de leer la Torá en Simjat Torá?", options: ["Comenzamos inmediatamente a leer desde Bereshit", "Cerramos el libro para siempre", "Nos vamos a dormir"], answer: 0 }
    ],
    activities: {
      puppets: "**Guión - La Fiesta de Simjat Torá:**\n*Personajes:* Títere de Rollo de Torá (con carita feliz), Títere de Niño que baila y Títere de Ovejita fiestera.\n- *Torá:* ¡Hola amigos! Hoy terminamos de leer todo mi rollo y estoy muy feliz.\n- *Niño:* ¡Es hora de Simjat Torá! ¡Te abrazaremos fuerte y bailaremos en círculos!\n- *Ovejita:* ¡Beeee! ¡A mí me encanta bailar! Daremos vueltas y vueltas de pura felicidad.\n- *Torá:* Y al terminar... ¡volveremos a abrir mi primer capítulo en Bereshit!\n- *Niño:* ¡La Torá nunca termina en la hermosa familia de Shabateinu NBI!",
      costumes: "**Taller de Manualidades:**\n'Mi mini Torá'. Usando dos pajitas o palitos de madera y una tira de papel larga decorada con dibujos de mitzvot, los niños construyen su propio mini rollo de Torá para bailar en Simjat Torá.",
      song: "**Canción - Simjat Torá de Alegría:**\n*Letra:*\nBaila, baila con la Torá,\nes el regalo de la verdad.\nTerminamos Devarim, empezamos Bereshit,\n¡cantando felices en la NBI!\n*Coro:*\n¡Simjat Torá, fiesta de amor!\n¡Jazak, Jazak, V'nitjazek con fervor!"
    },
    storyPages: [
      { title: "Bendiciones de Amor", text: "V'Zot HaBerajá significa 'y esta es la bendición'. Moisés bendijo a cada una de las doce tribus de Israel con palabras únicas, adaptadas a los talentos especiales de cada una.", emoji: "🙌" },
      { title: "El Monte Nebó", text: "Moisés subió al Monte Nebó. Dios le mostró toda la Tierra Prometida desde allí. Moisés descansó en paz con 120 años, habiendo sido el profeta más grande de la historia.", emoji: "⛰️" },
      { title: "Completar la Torá", text: "Leemos los últimos versículos de la Torá con mucha emoción y agradecimiento. Nos enseña que cada final es la puerta para un nuevo y hermoso comienzo.", emoji: "📖" },
      { title: "¡Simjat Torá: Volver a Empezar!", text: "En Simjat Torá celebramos bailando con los rollos de Torá en los brazos. Al terminar el último verso, abrimos inmediatamente Bereshit. ¡La Torá es eterna y nunca termina!", emoji: "🎉" }
    ],
    alefBetLetters: [
      { letter: "ב", name: "Bet", sound: "B", word: "ברכה", wordMeaning: "Bendición" },
      { letter: "ש", name: "Shin", sound: "Sh", word: "שמחה", wordMeaning: "Alegría" },
      { letter: "ת", name: "Tav", sound: "T", word: "תורה", wordMeaning: "Torá" }
    ]
  }
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
