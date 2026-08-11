/**
 * Bulk content translations for course + quiz DATA (kept separate from the UI
 * dictionary in translations.js to keep both files manageable).
 *
 * Consumed via LanguageContext, which shallow-merges each language block onto
 * the base UI dictionary. English is intentionally absent: t() and the
 * localization utils fall back to the original English data files.
 *
 * Structure mirrors what src/utils/localizationUtils.js looks up:
 *   quizzesData.<quizId>.title | description | subject
 *   quizzesData.<quizId>.questions[i].questionText | options[j]
 *   courseData.<courseId>.title | desc | category | difficulty
 *   courseData.<courseId>.modules[i].title | desc
 *   courseData.<courseId>.modules[i].contentSections[j].title | content
 *   courseData.<courseId>.modules[i].exercises[k].question | options[] | answer | pairs[]
 *
 * NOTE on quiz/exercise answers: options are translated IN ORDER. The correct
 * answer is re-derived by index in localizationUtils, so it always matches a
 * translated option — never translate answers to a different order.
 *
 * courseData (lesson content) is added in follow-up batches; until then the
 * existing courseData metadata in translations.js remains in effect and lesson
 * bodies fall back to English.
 */

export const contentTranslations = {
  // UI strings that were hardcoded in components, now routed through t().
  // These deep-merge onto the base dictionaries in translations.js.
  en: {
    common: { sfx: "SFX", off: "Off" },
    quiz: {
      start: "Start",
      notSignedInTitle: "You're not signed in",
      notSignedInMsg: "Your high scores won't be saved to your student profile.",
      quitTitle: "Quit Quiz?",
      quitMsg: "Are you sure you want to leave? Your progress won't be saved and this attempt won't be logged.",
      quitConfirm: "Quit",
    },
    contact: {
      formHeading: "Send a message",
      formSubtitle: "Fill in the details below — we read every message.",
      namePlaceholder: "John Doe",
      emailPlaceholder: "you@example.com",
      subjectPlaceholder: "Subject...",
      agreementPre: "By submitting, you agree to our",
      privacyLink: "Privacy Policy",
      agreementPost: "We only use your email to respond to your message.",
    },
  },

  // ===================================================================
  // SPANISH
  // ===================================================================
  es: {
    common: { sfx: "SFX", off: "Apagado" },
    quiz: {
      start: "Empezar",
      notSignedInTitle: "No has iniciado sesión",
      notSignedInMsg: "Tus mejores puntuaciones no se guardarán en tu perfil de estudiante.",
      quitTitle: "¿Salir del Cuestionario?",
      quitMsg: "¿Seguro que quieres salir? No se guardará tu progreso y este intento no se registrará.",
      quitConfirm: "Salir",
    },
    contact: {
      formHeading: "Enviar un mensaje",
      formSubtitle: "Completa los datos a continuación — leemos cada mensaje.",
      namePlaceholder: "Juan Pérez",
      emailPlaceholder: "tu@ejemplo.com",
      subjectPlaceholder: "Asunto...",
      agreementPre: "Al enviar, aceptas nuestra",
      privacyLink: "Política de Privacidad",
      agreementPost: "Solo usamos tu correo para responder a tu mensaje.",
    },
    quizzesData: {
      python: {
        title: "Python para Niños",
        subject: "Programación",
        description: "¡Pon a prueba tus conocimientos de Python básico, variables y bucles!",
        questions: [
          { questionText: "¿Qué es Python?", options: ["Un tipo de serpiente", "Un lenguaje de computadora", "Un videojuego", "Una calculadora"] },
          { questionText: "¿Qué comando hace que la computadora muestre texto?", options: ["show()", "speak()", "print()", "display()"] },
          { questionText: "Python es famoso por ser:", options: ["Muy difícil de leer", "Solo para científicos", "Fácil de leer para humanos", "Solo para computadoras viejas"] },
          { questionText: "¿Qué es una variable?", options: ["Una caja etiquetada para guardar datos", "Un tipo de error", "Un problema de matemáticas", "Una impresora"] },
          { questionText: "¿Cómo llamamos al texto como 'Hola' en programación?", options: ["Entero", "Cadena (String)", "Número", "Texto de robot"] },
          { questionText: "Si score = 4 + 6, ¿qué hay dentro de la variable score?", options: ["46", "4 + 6", "10", "Error"] },
          { questionText: "¿Qué permiten hacer las 'sentencias if' a un programa?", options: ["Fallar", "Tomar decisiones", "Mostrar texto", "Guardar variables"] },
          { questionText: "En código, ¿qué significa el símbolo '>'?", options: ["Igual a", "Menor que", "Mayor que", "Más"] },
          { questionText: "¿Cuál de estas es una sentencia if correcta?", options: ["if score is 10 then win", "if score > 10:", "score if 10", "if (10) score"] },
          { questionText: "¿Qué comando permite al usuario escribir una respuesta?", options: ["print()", "type()", "input()", "read()"] },
          { questionText: "¿Por qué usamos un bucle en un juego?", options: ["Para hacerlo colorido", "Para dejar que el jugador adivine varias veces", "Para detener el juego", "Para hacerlo más difícil"] },
          { questionText: "Si el secreto es 5 y adivinas 8, el programa debería decir:", options: ["¡Muy bajo!", "¡Muy alto!", "¡Ganaste!", "Error"] },
          { questionText: "¿En qué programa de TV se inspiró el nombre de Python?", options: ["Python Rangers", "Monty Python's Flying Circus", "The Daily Python", "Snake TV"] },
          { questionText: "¿Qué tipo de dato es un número entero como 5?", options: ["Cadena (String)", "Entero (Integer)", "Decimal (Float)", "Booleano"] },
          { questionText: "Si Mario golpea a un Goomba, ¿qué tipo de sentencia maneja que pierda una vida?", options: ["Una sentencia print", "Una sentencia if", "Un bucle", "Una cadena"] }
        ]
      },
      math: {
        title: "Magia Matemática",
        subject: "Matemáticas",
        description: "Pon a prueba tus habilidades en secuencias, geometría y acertijos lógicos.",
        questions: [
          { questionText: "¿Cuál es el siguiente número en: 5, 10, 15, 20...?", options: ["22", "25", "30", "100"] },
          { questionText: "¿Cuál es el siguiente número en: 1, 3, 5, 7...?", options: ["8", "9", "10", "11"] },
          { questionText: "¿Cómo llamamos a una lista de números que sigue una regla?", options: ["Un desorden", "Una secuencia", "Una variable", "Un bucle"] },
          { questionText: "¿Cuántos lados tiene un hexágono?", options: ["4", "5", "6", "8"] },
          { questionText: "¿Cómo llamamos a un cuadrado en 3D?", options: ["Esfera", "Cubo", "Pirámide", "Cilindro"] },
          { questionText: "¿Qué tipo de ángulo mide exactamente 90 grados?", options: ["Ángulo lindo", "Ángulo recto", "Ángulo incorrecto", "Ángulo izquierdo"] },
          { questionText: "Si A es más alto que B, y B es más alto que C. ¿Quién es el más alto?", options: ["A", "B", "C", "Son iguales"] },
          { questionText: "Tengo 4 patas pero no puedo caminar. ¿Qué soy?", options: ["Un perro", "Una silla", "Un pájaro", "Una serpiente"] },
          { questionText: "¿Qué es el razonamiento deductivo?", options: ["Adivinar al azar", "Usar pistas para eliminar respuestas incorrectas", "Sumar números", "Dibujar formas"] },
          { questionText: "¿Qué es un algoritmo?", options: ["Un error matemático", "Un tipo de dinosaurio", "Una lista de instrucciones paso a paso", "Una figura 3D"] },
          { questionText: "¿Por qué importa el orden de los pasos en un algoritmo?", options: ["No importa", "Para que la computadora no se confunda y falle", "Porque se ve bonito", "Para ahorrar electricidad"] },
          { questionText: "¿Cuál es la mejor forma de resolver un problema enorme y difícil?", options: ["Llorar", "Dividirlo en pasos pequeños y fáciles", "Adivinar", "Rendirse"] },
          { questionText: "La secuencia de Fibonacci se encuentra en:", options: ["Solo en libros de texto", "Semillas de girasol y galaxias", "Solo en computadoras", "En ningún lugar"] },
          { questionText: "Si tienes un triángulo, ¿cuántos ángulos tiene?", options: ["2", "3", "4", "5"] },
          { questionText: "¿Qué empresa usa algoritmos para encontrar sitios web para ti?", options: ["Nintendo", "Google", "McDonald's", "Ford"] }
        ]
      },
      finance: {
        title: "Dinero Inteligente",
        subject: "Finanzas",
        description: "Presupuestos, inversiones y la historia del dinero.",
        questions: [
          { questionText: "¿Qué es el trueque?", options: ["Usar tarjetas de crédito", "Intercambiar bienes directamente", "Invertir en acciones", "Ahorrar en un banco"] },
          { questionText: "¿Por qué se inventó el dinero?", options: ["Porque las monedas brillan", "Para facilitar el comercio", "Para hacer las carteras pesadas", "Porque las gallinas se escaparon"] },
          { questionText: "El dinero solo funciona si...", options: ["Está hecho de oro", "Está impreso en papel verde", "Todos acuerdan que tiene valor", "Tiene la cara de un presidente"] },
          { questionText: "El dinero que ENTRA a tu bolsillo se llama:", options: ["Gasto", "Ingreso", "Impuesto", "Deuda"] },
          { questionText: "El dinero que SALE (cuando compras algo) se llama:", options: ["Gasto", "Ingreso", "Ganancia", "Dividendo"] },
          { questionText: "Un buen presupuesto asegura que...", options: ["Gastes todo", "Tus gastos sean mayores que tus ingresos", "Tus gastos sean menores que tus ingresos", "Compres juguetes cada día"] },
          { questionText: "Cuando un banco te paga por guardar dinero con ellos, se llama:", options: ["Impuestos", "Interés", "Multas", "Préstamos"] },
          { questionText: "¿Qué es el interés compuesto?", options: ["Ganar interés sobre el interés", "Perder dinero", "Pagar al banco", "Interés simple"] },
          { questionText: "El interés compuesto funciona mejor cuando...", options: ["Sacas tu dinero de inmediato", "Dejas tu dinero en el banco por mucho tiempo", "Lo gastas todo", "Lo escondes bajo la cama"] },
          { questionText: "Cuando compras una acción, ¿qué estás comprando?", options: ["Un trozo de papel", "Una pequeña parte de una empresa", "Un préstamo al gobierno", "Un producto"] },
          { questionText: "El objetivo de invertir es...", options: ["Hacer crecer tu dinero", "Perder dinero", "Mantenerlo exactamente igual", "Pagar impuestos"] },
          { questionText: "¿Es arriesgado invertir?", options: ["No, está garantizado", "Sí, las empresas pueden perder valor", "Solo para personas mayores", "No, siempre ganas"] },
          { questionText: "La regla de oro para crear riqueza es:", options: ["Siempre gastar menos de lo que ganas", "Gastar todo lo que tienes", "Pedir prestado lo máximo posible", "Nunca usar un banco"] },
          { questionText: "¿Qué es un presupuesto?", options: ["Un tipo de animal", "Un plan para tu dinero", "Un tipo de cuenta bancaria", "Un préstamo"] },
          { questionText: "Si compras acciones de Disney, eres dueño de:", options: ["Toda la empresa", "Una pequeña parte de Disney", "Todas sus películas", "Nada"] }
        ]
      },
      marketing: {
        title: "Creadores del Futuro",
        subject: "Marketing",
        description: "Marca, narrativa y seguridad digital para creadores.",
        questions: [
          { questionText: "¿Qué es una marca?", options: ["Solo un logo", "El sentimiento y la reputación de una empresa", "El edificio donde trabajan", "El nombre del director"] },
          { questionText: "¿Por qué las empresas usan colores específicos?", options: ["Porque son baratos", "Para provocar emociones específicas", "Porque es al azar", "Para esconder la suciedad"] },
          { questionText: "¿Cuál de estos es parte de la identidad de una marca?", options: ["Logos, colores y tipografías", "Salarios de empleados", "Las sillas de oficina", "Declaraciones de impuestos"] },
          { questionText: "En marketing, ¿quién debe ser el Héroe de la historia?", options: ["El director", "El producto", "El cliente", "El competidor"] },
          { questionText: "¿Por qué usamos la narrativa en marketing?", options: ["Para dormir a la gente", "Para crear una conexión emocional", "Para llenar espacio", "Para confundir a la gente"] },
          { questionText: "Una buena historia debe enganchar al espectador en los primeros...", options: ["3 segundos", "3 minutos", "1 hora", "3 días"] },
          { questionText: "¿Qué es tu huella digital?", options: ["Tu talla de zapato", "El rastro de datos que dejas en línea", "La tinta de tu impresora", "La pantalla de tu computadora"] },
          { questionText: "¿Cuál de los siguientes es información personal (PII) que NUNCA debes compartir?", options: ["Tu película favorita", "Tu dirección de casa", "Un dibujo", "Una reseña de un juego"] },
          { questionText: "¿Se pueden borrar fácilmente las cosas para siempre de internet?", options: ["Sí, al instante", "No, la gente puede tomar capturas y guardarlas", "Sí, pidiéndolo amablemente", "Sí, si apagas la computadora"] },
          { questionText: "¿Qué significa CTA?", options: ["Llamada a la acción (Call To Action)", "Alineación central del texto", "Costo de publicidad", "Clic para añadir"] },
          { questionText: "¿Cuál es un ejemplo de un CTA?", options: ["'Vendemos zapatos.'", "'¡Suscríbete para más videos!'", "'Las manzanas son rojas.'", "'Hola.'"] },
          { questionText: "Antes de lanzar una campaña, necesitas conocer tu...", options: ["Color favorito", "Público objetivo", "Talla de zapato", "Pedido de almuerzo"] },
          { questionText: "¿Qué colores usa McDonald's para hacerte sentir feliz y con hambre?", options: ["Azul y verde", "Rojo y amarillo", "Negro y blanco", "Morado y naranja"] },
          { questionText: "En una historia de marketing, el producto debe actuar como el:", options: ["Héroe", "Villano", "Guía", "Fondo"] },
          { questionText: "¿Cuál es la mejor forma de practicar la ciudadanía digital?", options: ["Ser grosero en los comentarios", "Respetar a los demás y dar crédito", "Robar arte", "Compartir contraseñas"] }
        ]
      },
      web: {
        title: "Maravillas Web",
        subject: "Ciencia",
        description: "Pon a prueba tus habilidades de HTML, CSS y diseño.",
        questions: [
          { questionText: "¿Qué proporciona HTML a una página web?", options: ["Colores", "Animaciones", "La estructura básica (esqueleto)", "La base de datos"] },
          { questionText: "¿Qué etiqueta se usa para el encabezado más grande?", options: ["<p>", "<h1>", "<h6>", "<div>"] },
          { questionText: "¿Qué etiqueta se usa para un párrafo de texto?", options: ["<text>", "<p>", "<para>", "<h>"] },
          { questionText: "¿Qué hace CSS?", options: ["Construye la estructura", "Da estilo a la página con colores y diseños", "Guarda contraseñas", "Ejecuta el servidor"] },
          { questionText: "¿Cómo harías el texto rojo en CSS?", options: ["text: red;", "color: red;", "font-color: red;", "make-red;"] },
          { questionText: "¿Puede CSS cambiar la tipografía de tu texto?", options: ["Sí", "No", "Solo los martes", "Solo si es azul"] },
          { questionText: "En el modelo de caja de CSS, ¿cómo se llama el espacio DENTRO del borde?", options: ["Margen (Margin)", "Relleno (Padding)", "Contenido (Content)", "Contorno (Outline)"] },
          { questionText: "¿Cómo se llama el espacio FUERA del borde?", options: ["Margen (Margin)", "Relleno (Padding)", "Contenido (Content)", "Contorno (Outline)"] },
          { questionText: "¿Las imágenes circulares son en realidad cajas en CSS?", options: ["Sí, todo es una caja", "No, los círculos son círculos", "No, son triángulos", "Solo si son rojas"] },
          { questionText: "¿Qué es un servidor?", options: ["Un camarero", "Una computadora que se mantiene en línea para alojar tus archivos", "Un tipo de CSS", "Una computadora rota"] },
          { questionText: "¿Qué obtienes para que la gente visite tu sitio?", options: ["Una URL", "Una memoria USB", "Una contraseña", "Un libro"] },
          { questionText: "¿Qué significa 'Desplegar' (Deploying)?", options: ["Borrar tu código", "Poner tu código en un servidor en vivo para que el mundo lo vea", "Escribir HTML", "Jugar un juego"] },
          { questionText: "¿Qué es el DOM?", options: ["Modelo de Objetos del Documento", "Matemática Directa de Objetos", "Creador de Esquemas Digitales", "Perro en la Luna"] },
          { questionText: "¿Por qué es importante el HTML semántico?", options: ["Hace el sitio colorido", "Ayuda a usuarios ciegos y a los buscadores", "Hace el código más corto", "No es importante"] },
          { questionText: "¿Qué capa del modelo de caja contiene el texto real?", options: ["Margen (Margin)", "Borde (Border)", "Relleno (Padding)", "Contenido (Content)"] }
        ]
      },
      art: {
        title: "Arte Digital",
        subject: "Artes",
        description: "Capas, teoría del color y herramientas de dibujo.",
        questions: [
          { questionText: "¿A qué se parecen las capas en el arte digital?", options: ["Rocas pesadas", "Láminas de vidrio transparentes apiladas una sobre otra", "Una sola hoja de papel", "Un pincel"] },
          { questionText: "¿Por qué los artistas usan capas?", options: ["Para hacer el archivo pesado", "Para colorear sin arruinar el boceto (no destructivo)", "Para romper la computadora", "Para dibujar más lento"] },
          { questionText: "Si borras en la Capa 2, ¿se borra la Capa 1?", options: ["Sí", "No", "Solo si es roja", "Siempre"] },
          { questionText: "Los colores opuestos en la rueda cromática se llaman:", options: ["Análogos", "Complementarios", "Primarios", "Aburridos"] },
          { questionText: "¿Cuál es un ejemplo de colores complementarios?", options: ["Rojo y rosa", "Azul y naranja", "Verde y verde", "Negro y blanco"] },
          { questionText: "¿Qué crean los colores complementarios?", options: ["Aburrimiento", "Máximo contraste y emoción", "Un desastre gris", "Invisibilidad"] },
          { questionText: "¿Qué es la regla de los tercios?", options: ["Dividir el lienzo en una cuadrícula de 3x3", "Dibujar 3 círculos", "Usar solo 3 colores", "Tardar 3 horas en dibujar"] },
          { questionText: "¿Dónde debes colocar tu sujeto principal para una composición cinematográfica?", options: ["En el centro exacto", "Fuera del lienzo", "En las intersecciones de la cuadrícula", "Siempre en la esquina inferior"] },
          { questionText: "¿El centro exacto es siempre el mejor lugar para un personaje?", options: ["Sí", "No, la regla de los tercios suele ser mejor", "Siempre", "Solo los lunes"] },
          { questionText: "¿Qué es el renderizado?", options: ["Añadir luz y sombra para que parezca 3D", "Borrar el dibujo", "Añadir una firma", "Guardar el archivo"] },
          { questionText: "La parte del objeto que mira al sol recibe un:", options: ["Sombra", "Brillo (Highlight)", "Contorno", "Firma"] },
          { questionText: "La parte que da la espalda a la luz recibe una:", options: ["Brillo (Highlight)", "Sombra", "Color brillante", "Punto blanco"] },
          { questionText: "Al dibujar un personaje, ¿qué debes dibujar primero?", options: ["Ojos detallados", "Formas 3D básicas como esferas y cilindros", "El fondo", "El cabello"] },
          { questionText: "¿Qué significa 'valor' en la teoría del color?", options: ["Cuánto cuesta una pintura", "Qué tan claro u oscuro es un color", "Cuántos colores usas", "Qué tan grande es el pincel"] },
          { questionText: "¿Dónde ocurre la 'Oclusión Ambiental'?", options: ["A la luz directa del sol", "En hendiduras profundas donde la luz no llega", "En el cielo", "En el brillo"] }
        ]
      }
    },
    courseData: {
      "1": {
        title: "Python para Niños: ¡Crea tu Primer Juego!",
        desc: "Aprende a programar creando juegos reales. Perfecto para principiantes de 7 a 14 años. ¡Sumérgete en los fundamentos de Python y la mecánica de los juegos!",
        category: "Programación",
        difficulty: "Principiante",
        modules: [
          {
            title: "Módulo 1: ¡Hola Python!",
            desc: "Aprende qué es Python y escribe tus primeras líneas de código.",
            contentSections: [
              { title: "Conoce a Alex el Inventor", content: "Alex tiene 11 años y le encantan los videojuegos. Un día Alex pensó: '¿Y si pudiera CREAR mi propio juego en lugar de solo jugarlos?' Su profesora le dijo: '¡Puedes! Solo necesitas un lenguaje llamado Python.' Esta también es TU historia: al final de este curso, ¡crearás tu propio juego desde cero!" },
              { title: "¿Qué es Python?", content: "Python es un lenguaje de programación: un conjunto especial de palabras y reglas que usas para hablar con las computadoras. ¡Imagina que tienes un amigo robot, pero solo entiende un idioma: Python! Si quieres que el robot baile, dibuje o resuelva problemas de matemáticas, tienes que escribir instrucciones en Python. ¿Lo mejor? Python fue diseñado para parecerse casi al inglés normal, así que es uno de los lenguajes más fáciles de aprender." },
              { title: "¡Dato Curioso!", content: "¡Python no recibió su nombre por la serpiente! 🐍 Fue nombrado por un divertido programa de comedia británico llamado 'Monty Python's Flying Circus'. El creador, Guido van Rossum, lo estaba viendo mientras programaba Python y pensó que el nombre era divertido." },
              { title: "Tu Primer Comando: print()", content: "El comando print() le dice a la computadora que muestre texto en la pantalla. Prueba esto:\n\nprint('Hello World!')\n\nCuando lo ejecutes, la computadora mostrará: Hello World!\n\nPuedes imprimir lo que quieras:\nprint('My name is Alex!')\nprint('I am learning Python!')\n\n¿Notas cómo el texto siempre va entre comillas? ¡Eso le dice a Python: 'Oye, esto es texto, no un comando!'" },
              { title: "Consejo Pro: ¡No Olvides las Comillas!", content: "Un error muy común de los principiantes es olvidar las comillas alrededor del texto. Si escribes print(Hello) sin comillas, Python se confundirá y mostrará un error. ¡Envuelve siempre tu texto en comillas simples ('Hello') o dobles (\"Hello\") — ambas funcionan!" },
              { title: "¡Inténtalo Tú Mismo!", content: "Si tienes Python en tu computadora, ábrelo y prueba escribir estos comandos uno por uno:\n\n1. print('Hello World!')\n2. print('My name is [TU NOMBRE]!')\n3. print('I am learning to code!')\n4. print('Python is awesome!')\n\nObserva qué pasa después de cada uno. ¡Acabas de hacer que una computadora hable! 🎉" },
              { title: "Resumen del Módulo 1", content: "Repasemos lo que aprendiste:\n\n• Python es un lenguaje de programación usado para dar instrucciones a las computadoras\n• ¡Fue nombrado por un programa de comedia, no por la serpiente!\n• El comando print() muestra texto en la pantalla\n• El texto debe ir entre comillas (simples o dobles)\n• Acabas de escribir tu primer código real — ¡ya eres oficialmente programador!" }
            ],
            exercises: [
              { question: "¿Qué es Python?", options: ["Un tipo de serpiente", "Un lenguaje de programación para hablar con las computadoras", "Un motor de videojuegos", "Un navegador web"] },
              { question: "Python recibió su nombre por la serpiente." },
              { question: "El comando ___ muestra texto en la pantalla en Python." },
              { question: "¿Por qué necesitamos comillas alrededor del texto en print()?", options: ["Para que se vea bonito", "Para que Python sepa que es texto, no un comando", "Las comillas son opcionales", "Para agrandar el texto"] },
              { question: "Relaciona los términos de Python con sus significados:", pairs: [ { term: "Python", definition: "Un lenguaje de programación" }, { term: "print()", definition: "Muestra texto en la pantalla" }, { term: "Comillas", definition: "Envuelven el texto en el código" } ] }
            ]
          },
          {
            title: "Módulo 2: Variables y Tipos de Datos",
            desc: "Almacena números y texto en la memoria como un profesional.",
            contentSections: [
              { title: "Alex Necesita un Marcador", content: "El juego de Alex avanza, pero hay un problema: ¿cómo recuerda la computadora la puntuación del jugador? Cuando un jugador consigue 10 puntos, ¿a dónde va ese número? Alex necesita una forma de GUARDAR información. ¡Eso es exactamente lo que hacen las variables!" },
              { title: "¿Qué es una Variable?", content: "Piensa en una variable como una caja etiquetada donde puedes guardar cosas. Si tienes una caja etiquetada 'score' y pones el número 10 dentro, ¡tu variable score ahora es igual a 10!\n\nEn Python, creas una variable así:\nscore = 10\nplayer_name = 'Alex'\n\nEl signo = no significa 'igual' como en matemáticas — significa 'pon este valor dentro de esta caja'. Así que score = 10 significa 'crea una caja llamada score y pon 10 dentro'." },
              { title: "Diferentes Tipos de Datos", content: "Las computadoras son exigentes: necesitan saber QUÉ TIPO de cosa hay en cada caja:\n\n• Enteros (int): Números enteros como 5, 42 o 1000. ¡Ideales para puntuaciones!\n• Cadenas (str): Texto entre comillas como 'Hello' o 'Alex'. ¡Se usan para nombres y mensajes!\n• Decimales (float): Números con decimales como 3.14 o 99.9. ¡Se usan para precios y medidas precisas!\n• Booleanos (bool): Solo True o False. Como un interruptor de luz: encendido o apagado.\n\nPython es lo bastante inteligente para averiguar el tipo automáticamente cuando creas una variable." },
              { title: "Variables en Acción", content: "Mira cómo Alex usa variables en el juego:\n\nplayer_name = 'Alex'\nscore = 0\nlives = 3\n\nscore = score + 10\nprint('Score:', score)\n\nLa computadora mostrará: Score: 10\n\n¡Fíjate cómo funciona score = score + 10: Python mira el valor ANTERIOR de score (0), le suma 10 y pone el NUEVO valor (10) de vuelta en la caja!" },
              { title: "¡Tu Cerebro Está Lleno de Variables!", content: "¡Tu cerebro funciona igual que una computadora con variables! Ahora mismo, tu cerebro tiene una variable llamada 'mi_nombre' que guarda tu nombre, una variable 'mi_edad' que guarda tu edad y una variable 'color_favorito' que guarda tu color favorito. Simplemente no las piensas como 'variables', ¡pero eso es exactamente lo que son! 🧠" },
              { title: "Cómo Nombrar tus Variables", content: "Los buenos nombres de variables describen lo que hay dentro de la caja:\n\n✅ Bien: player_score, user_name, lives_remaining\n❌ Mal: x, thing, abc123\n\nReglas para los nombres de variables en Python:\n• ¡Sin espacios! Usa guiones bajos: player_name (no player name)\n• No pueden empezar con número: 1score está mal, score1 está bien\n• Python distingue mayúsculas: ¡Score y score son variables DIFERENTES!" },
              { title: "Resumen del Módulo 2", content: "Repasemos lo que aprendiste:\n\n• Las variables son cajas etiquetadas que guardan datos\n• El signo = significa 'pon este valor en la caja'\n• Los enteros son números enteros, las cadenas son texto, los decimales tienen coma, los booleanos son True/False\n• Puedes actualizar una variable: score = score + 10\n• Usa nombres descriptivos: player_score es mejor que x\n• ¡Python distingue mayúsculas: score y Score son diferentes!" }
            ],
            exercises: [
              { question: "¿Qué es una variable en programación?", options: ["Un tipo de mensaje de error", "Una caja etiquetada para guardar datos", "Una fórmula matemática", "Un comando de Python"] },
              { question: "Relaciona cada tipo de dato con su ejemplo:", pairs: [ { term: "Entero", definition: "El número 42" }, { term: "Cadena", definition: "El texto 'Hello'" }, { term: "Decimal", definition: "El número 3.14" }, { term: "Booleano", definition: "True o False" } ] },
              { question: "Si score = 4 + 6, el valor guardado en score es ___." },
              { question: "En Python, los nombres de variable 'Score' y 'score' son exactamente lo mismo." },
              { question: "¿Cuál de estos es un BUEN nombre de variable?", options: ["1player", "my score", "player_score", "p"] }
            ]
          },
          {
            title: "Módulo 3: Condicionales (if) y Lógica",
            desc: "Haz tu código inteligente con decisiones y condiciones.",
            contentSections: [
              { title: "El Juego de Alex Necesita un Cerebro", content: "El juego de Alex ya puede guardar puntuaciones, ¡genial! Pero hay un nuevo problema. Cuando un jugador llega a 100 puntos, el juego debería decir '¡GANASTE!' Y cuando el jugador pierde todas sus vidas, debería decir 'FIN DEL JUEGO'. Pero ¿cómo sabe la computadora CUÁNDO hacer estas cosas? Necesita la capacidad de tomar decisiones. ¡Para eso sirven los condicionales (if)!" },
              { title: "Tomar Decisiones con 'if'", content: "Un condicional (if) permite que tu código tome decisiones, ¡igual que hace tu cerebro cada día!\n\nEn la vida real: 'SI está lloviendo, ENTONCES lleva un paraguas.'\nEn Python: if score > 100:\n              print('You win!')\n\nLa computadora revisa la condición (¿es score mayor que 100?). Si es VERDADERA, ejecuta el código de abajo. Si es FALSA, lo omite por completo." },
              { title: "Añadir 'else' y 'elif'", content: "¿Y si quieres hacer algo DIFERENTE cuando la condición es falsa?\n\nif score > 100:\n    print('You win!')\nelse:\n    print('Keep trying!')\n\n¿Y si tienes VARIAS condiciones?\n\nif score > 100:\n    print('Amazing!')\nelif score > 50:\n    print('Getting close!')\nelse:\n    print('Keep going!')\n\n'elif' es la abreviatura de 'else if' — revisa otra condición si la primera fue falsa." },
              { title: "¡Los Condicionales Están POR TODAS PARTES!", content: "¡Los videojuegos usan MILLONES de condicionales! 🎮\n\n• SI Mario golpea a un Goomba → pierde una vida\n• SI Mario agarra un hongo → crece\n• SI el temporizador llega a cero → ¡Fin del juego!\n• SI el jugador presiona el botón de salto → Mario salta\n\n¡Cada cosa que ocurre en un juego está controlada por condicionales trabajando juntos!" },
              { title: "Operadores de Comparación", content: "Para escribir condiciones, necesitas operadores de comparación:\n\n>  significa 'mayor que'        (10 > 5 es True)\n<  significa 'menor que'        (3 < 7 es True)\n== significa 'igual a'          (5 == 5 es True)\n!= significa 'distinto de'      (5 != 3 es True)\n>= significa 'mayor o igual'    (10 >= 10 es True)\n<= significa 'menor o igual'    (4 <= 9 es True)\n\n⚠️ Fíjate: comprobar la igualdad usa == (doble igual), NO = (un solo igual). ¡El = simple es para asignar variables!" },
              { title: "¡Los Dos Puntos Son Cruciales!", content: "Cada línea if, elif y else DEBE terminar con dos puntos (:)\n\n✅ Correcto: if score > 10:\n❌ Incorrecto: if score > 10\n\nAdemás, el código que se ejecuta dentro del condicional debe estar indentado (desplazado a la derecha con espacios). ¡Python usa la indentación para saber qué código pertenece dentro del condicional!" },
              { title: "Resumen del Módulo 3", content: "Repasemos lo que aprendiste:\n\n• Los condicionales (if) permiten que el código tome decisiones según condiciones\n• Usa 'else' cuando quieras que algo ocurra si la condición es falsa\n• Usa 'elif' para comprobar varias condiciones\n• Operadores de comparación: > < == != >= <=\n• El doble igual (==) comprueba igualdad, el igual simple (=) asigna variables\n• Termina siempre if/elif/else con dos puntos (:)\n• ¡Indenta el código dentro de tu condicional!" }
            ],
            exercises: [
              { question: "¿Qué permiten hacer los condicionales (if) a un programa?", options: ["Colapsar la computadora", "Tomar decisiones según condiciones", "Solo imprimir texto", "Guardar variables"] },
              { question: "Cada línea de condicional (if) en Python debe terminar con dos puntos (:)." },
              { question: "Relaciona cada operador de comparación con su significado:", pairs: [ { term: ">", definition: "Mayor que" }, { term: "==", definition: "Igual a" }, { term: "!=", definition: "Distinto de" }, { term: "<", definition: "Menor que" } ] },
              { question: "La palabra clave ___ es la abreviatura de 'else if' en Python." },
              { question: "Si score es 75, ¿qué imprimirá este código?\nif score > 100:\n    print('Winner!')\nelif score > 50:\n    print('Almost there!')\nelse:\n    print('Keep going!')", options: ["Winner!", "Almost there!", "Keep going!", "Nada"] }
            ]
          },
          {
            title: "Módulo 4: ¡Crea un Juego de Adivinanzas!",
            desc: "¡Combina todo para crear tu primer juego real desde cero!",
            contentSections: [
              { title: "El Gran Momento de Alex", content: "Por fin llegó el día. Alex conoce print(), las variables y los condicionales. ¡Ahora es momento de combinar TODAS estas habilidades para crear un juego real y jugable! El juego se llama 'Adivina el Número': la computadora elige un número secreto y el jugador tiene que adivinarlo. Después de cada intento, la computadora da pistas: '¡Muy alto!' o '¡Muy bajo!' ¡Vamos a crearlo!" },
              { title: "¿Qué Son los Bucles?", content: "Un bucle te permite ejecutar el mismo código una y otra vez. Sin un bucle, ¡el jugador solo tendría UN intento — eso no es divertido!\n\nEl bucle 'while' sigue ejecutándose mientras una condición sea True:\n\nwhile guess != secret:\n    guess = input('Try again: ')\n\nEsto sigue pidiendo intentos hasta que el jugador acierte. ¡Cuando por fin adivina correctamente, el bucle se detiene!" },
              { title: "Obtener la Entrada del Usuario", content: "El comando input() permite que el jugador escriba algo en el juego:\n\nguess = input('Enter your guess: ')\n\nLo que sea que el jugador escriba se guarda en la variable 'guess'. Sin embargo, hay algo complicado: ¡input() siempre te da una Cadena (texto), incluso si el jugador escribe un número! Para convertirlo en número y poder compararlo, usamos int():\n\nguess = int(input('Enter your guess: '))" },
              { title: "El Código Completo del Juego", content: "Aquí está el juego de adivinanzas completo:\n\nimport random\n\nsecret = random.randint(1, 20)\nprint('I picked a number between 1 and 20!')\n\nguess = 0\nattempts = 0\n\nwhile guess != secret:\n    guess = int(input('Your guess: '))\n    attempts = attempts + 1\n    \n    if guess > secret:\n        print('Too High! Try lower.')\n    elif guess < secret:\n        print('Too Low! Try higher.')\n    else:\n        print('YOU GOT IT! 🎉')\n        print('It took you', attempts, 'guesses!')\n\n¡Cada concepto que aprendiste — print, variables, if/elif/else, bucles, input — se usa aquí!" },
              { title: "Números Aleatorios en los Juegos", content: "La función random.randint(1, 20) elige un número aleatorio entre 1 y 20. ¡Cada juego que has jugado usa números aleatorios! Minecraft los usa para generar mundos, Pokémon los usa para decidir si atrapas un Pokémon y los juegos de cartas los usan para barajar el mazo. ¡La aleatoriedad hace que los juegos sean emocionantes porque nunca sabes qué pasará! 🎲" },
              { title: "¡Mejora tu Juego!", content: "Cuando tu juego básico funcione, prueba estas mejoras:\n\n🌟 Fácil: Cambia el rango de 1-20 a 1-100 para un juego más difícil\n🌟 Medio: Limita al jugador a solo 5 intentos. Si se le acaban, imprime '¡Fin del juego!'\n🌟 Difícil: Añade un sistema de puntuación — ¡menos intentos = más puntos!\n🌟 Experto: ¡Pregunta al jugador si quiere jugar de nuevo tras ganar!\n\n¡Cada mejora usa las mismas habilidades que ya aprendiste, solo combinadas de formas creativas!" },
              { title: "¡Resumen Final del Curso!", content: "Felicidades — ¡has aprendido todos los fundamentos de Python! 🎉\n\n• print() muestra texto en la pantalla\n• Las variables guardan datos en cajas etiquetadas\n• Tipos de datos: Enteros, Cadenas, Decimales, Booleanos\n• If/elif/else toman decisiones según condiciones\n• Operadores de comparación: > < == != >= <=\n• Los bucles while repiten código hasta que una condición es falsa\n• input() obtiene información del usuario\n• int() convierte texto en número\n• random.randint() genera números aleatorios\n\n¡Estás listo para crear tus propios juegos — el cielo es el límite! 🚀" }
            ],
            exercises: [
              { question: "El comando ___ permite al jugador escribir una respuesta durante un juego." },
              { question: "¿Por qué usamos un bucle 'while' en el juego de adivinanzas?", options: ["Para poner la pantalla colorida", "Para dejar que el jugador adivine varias veces hasta acertar", "Para detener el juego de inmediato", "Para hacer el juego más difícil de leer"] },
              { question: "Si el número secreto es 5 y el jugador adivina 8, ¿qué debería decir el juego?", options: ["¡Muy bajo!", "¡Muy alto!", "¡Ganaste!", "¡Error!"] },
              { question: "La función input() siempre devuelve un número, así que nunca necesitas int()." },
              { question: "Relaciona cada concepto de Python con lo que hace en el juego:", pairs: [ { term: "bucle while", definition: "Se repite hasta que el jugador acierta" }, { term: "input()", definition: "Obtiene el intento del jugador" }, { term: "random.randint()", definition: "Elige el número secreto" }, { term: "if/elif/else", definition: "Comprueba si el intento es muy alto o bajo" } ] }
            ]
          }
        ]
      }
    }
  },

  // ===================================================================
  // FRENCH
  // ===================================================================
  fr: {
    quizzesData: {
      python: {
        title: "Python pour les Enfants",
        subject: "Programmation",
        description: "Teste tes connaissances sur les bases de Python, les variables et les boucles !",
        questions: [
          { questionText: "Qu'est-ce que Python ?", options: ["Un type de serpent", "Un langage informatique", "Un jeu vidéo", "Une calculatrice"] },
          { questionText: "Quelle commande fait afficher du texte par l'ordinateur ?", options: ["show()", "speak()", "print()", "display()"] },
          { questionText: "Python est célèbre pour être :", options: ["Très difficile à lire", "Réservé aux scientifiques", "Facile à lire pour les humains", "Seulement pour les vieux ordinateurs"] },
          { questionText: "Qu'est-ce qu'une variable ?", options: ["Une boîte étiquetée pour stocker des données", "Un type d'erreur", "Un problème de maths", "Une imprimante"] },
          { questionText: "Comment appelle-t-on un texte comme 'Bonjour' en programmation ?", options: ["Entier", "Chaîne (String)", "Nombre", "Texte de robot"] },
          { questionText: "Si score = 4 + 6, que contient la variable score ?", options: ["46", "4 + 6", "10", "Erreur"] },
          { questionText: "Que permettent de faire les 'instructions if' à un programme ?", options: ["Planter", "Prendre des décisions", "Afficher du texte", "Stocker des variables"] },
          { questionText: "En code, que signifie le symbole '>' ?", options: ["Égal à", "Inférieur à", "Supérieur à", "Plus"] },
          { questionText: "Laquelle est une instruction if correcte ?", options: ["if score is 10 then win", "if score > 10:", "score if 10", "if (10) score"] },
          { questionText: "Quelle commande permet à l'utilisateur de saisir une réponse ?", options: ["print()", "type()", "input()", "read()"] },
          { questionText: "Pourquoi utilise-t-on une boucle dans un jeu ?", options: ["Pour le rendre coloré", "Pour laisser le joueur deviner plusieurs fois", "Pour arrêter le jeu", "Pour le rendre plus difficile"] },
          { questionText: "Si le secret est 5 et que tu devines 8, le programme devrait dire :", options: ["Trop bas !", "Trop haut !", "Tu as gagné !", "Erreur"] },
          { questionText: "Quelle émission de télé a inspiré le nom de Python ?", options: ["Python Rangers", "Monty Python's Flying Circus", "The Daily Python", "Snake TV"] },
          { questionText: "Quel type de donnée est un nombre entier comme 5 ?", options: ["Chaîne (String)", "Entier (Integer)", "Décimal (Float)", "Booléen"] },
          { questionText: "Si Mario touche un Goomba, quel type d'instruction gère la perte d'une vie ?", options: ["Une instruction print", "Une instruction if", "Une boucle", "Une chaîne"] }
        ]
      },
      math: {
        title: "Magie des Maths",
        subject: "Mathématiques",
        description: "Teste tes compétences en séquences, géométrie et énigmes logiques.",
        questions: [
          { questionText: "Quel est le nombre suivant dans : 5, 10, 15, 20... ?", options: ["22", "25", "30", "100"] },
          { questionText: "Quel est le nombre suivant dans : 1, 3, 5, 7... ?", options: ["8", "9", "10", "11"] },
          { questionText: "Comment appelle-t-on une liste de nombres qui suit une règle ?", options: ["Un désordre", "Une séquence", "Une variable", "Une boucle"] },
          { questionText: "Combien de côtés a un hexagone ?", options: ["4", "5", "6", "8"] },
          { questionText: "Comment appelle-t-on un carré en 3D ?", options: ["Sphère", "Cube", "Pyramide", "Cylindre"] },
          { questionText: "Quel type d'angle mesure exactement 90 degrés ?", options: ["Angle mignon", "Angle droit", "Angle faux", "Angle gauche"] },
          { questionText: "Si A est plus grand que B, et B plus grand que C. Qui est le plus grand ?", options: ["A", "B", "C", "Ils sont égaux"] },
          { questionText: "J'ai 4 pieds mais je ne peux pas marcher. Que suis-je ?", options: ["Un chien", "Une chaise", "Un oiseau", "Un serpent"] },
          { questionText: "Qu'est-ce que le raisonnement déductif ?", options: ["Deviner au hasard", "Utiliser des indices pour éliminer les mauvaises réponses", "Additionner des nombres", "Dessiner des formes"] },
          { questionText: "Qu'est-ce qu'un algorithme ?", options: ["Une erreur mathématique", "Un type de dinosaure", "Une liste d'instructions étape par étape", "Une forme 3D"] },
          { questionText: "Pourquoi l'ordre des étapes est-il important dans un algorithme ?", options: ["Ça n'a pas d'importance", "Pour que l'ordinateur ne s'embrouille pas et n'échoue pas", "Parce que c'est joli", "Pour économiser de l'électricité"] },
          { questionText: "Quelle est la meilleure façon de résoudre un problème énorme et difficile ?", options: ["Pleurer", "Le diviser en petites étapes faciles", "Deviner", "Abandonner"] },
          { questionText: "La suite de Fibonacci se trouve dans :", options: ["Seulement les manuels", "Les graines de tournesol et les galaxies", "Seulement les ordinateurs", "Nulle part"] },
          { questionText: "Si tu as un triangle, combien d'angles a-t-il ?", options: ["2", "3", "4", "5"] },
          { questionText: "Quelle entreprise utilise des algorithmes pour te trouver des sites web ?", options: ["Nintendo", "Google", "McDonald's", "Ford"] }
        ]
      },
      finance: {
        title: "Argent Malin",
        subject: "Finance",
        description: "Budget, investissement et histoire de l'argent.",
        questions: [
          { questionText: "Qu'est-ce que le troc ?", options: ["Utiliser des cartes de crédit", "Échanger des biens directement", "Investir en bourse", "Épargner à la banque"] },
          { questionText: "Pourquoi l'argent a-t-il été inventé ?", options: ["Parce que les pièces brillent", "Pour faciliter les échanges", "Pour alourdir les portefeuilles", "Parce que les poules se sont enfuies"] },
          { questionText: "L'argent ne fonctionne que si...", options: ["Il est fait d'or", "Il est imprimé sur du papier vert", "Tout le monde s'accorde sur sa valeur", "Il a le visage d'un président"] },
          { questionText: "L'argent qui ENTRE dans ta poche s'appelle :", options: ["Dépense", "Revenu", "Impôt", "Dette"] },
          { questionText: "L'argent qui SORT (quand tu achètes) s'appelle :", options: ["Dépense", "Revenu", "Bénéfice", "Dividende"] },
          { questionText: "Un bon budget garantit que...", options: ["Tu dépenses tout", "Tes dépenses sont supérieures à tes revenus", "Tes dépenses sont inférieures à tes revenus", "Tu achètes des jouets tous les jours"] },
          { questionText: "Quand une banque te paie pour garder ton argent, cela s'appelle :", options: ["Impôts", "Intérêt", "Amendes", "Prêts"] },
          { questionText: "Qu'est-ce que l'intérêt composé ?", options: ["Gagner des intérêts sur les intérêts", "Perdre de l'argent", "Payer la banque", "Intérêt simple"] },
          { questionText: "L'intérêt composé fonctionne le mieux quand tu...", options: ["Retires ton argent immédiatement", "Laisses ton argent à la banque longtemps", "Dépenses tout", "Le caches sous le lit"] },
          { questionText: "Quand tu achètes une action, qu'achètes-tu ?", options: ["Un bout de papier", "Une petite part d'une entreprise", "Un prêt au gouvernement", "Un produit"] },
          { questionText: "Le but d'investir est de...", options: ["Faire fructifier ton argent", "Perdre de l'argent", "Le garder exactement pareil", "Payer des impôts"] },
          { questionText: "Investir est-il risqué ?", options: ["Non, c'est garanti", "Oui, les entreprises peuvent perdre de la valeur", "Seulement pour les personnes âgées", "Non, tu gagnes toujours"] },
          { questionText: "La règle d'or pour bâtir sa richesse est :", options: ["Toujours dépenser moins que ce que tu gagnes", "Dépenser tout ce que tu as", "Emprunter le plus possible", "Ne jamais utiliser de banque"] },
          { questionText: "Qu'est-ce qu'un budget ?", options: ["Un type d'animal", "Un plan pour ton argent", "Un type de compte bancaire", "Un prêt"] },
          { questionText: "Si tu achètes des actions Disney, tu possèdes :", options: ["Toute l'entreprise", "Une petite part de Disney", "Tous leurs films", "Rien"] }
        ]
      },
      marketing: {
        title: "Créateurs du Futur",
        subject: "Marketing",
        description: "Image de marque, storytelling et sécurité numérique pour les créateurs.",
        questions: [
          { questionText: "Qu'est-ce qu'une marque ?", options: ["Juste un logo", "Le ressenti et la réputation d'une entreprise", "Le bâtiment où ils travaillent", "Le nom du PDG"] },
          { questionText: "Pourquoi les entreprises utilisent-elles des couleurs spécifiques ?", options: ["Parce qu'elles sont bon marché", "Pour déclencher des émotions précises", "Parce que c'est aléatoire", "Pour cacher la saleté"] },
          { questionText: "Lequel fait partie de l'identité d'une marque ?", options: ["Logos, couleurs et polices", "Salaires des employés", "Les chaises de bureau", "Les déclarations d'impôts"] },
          { questionText: "En marketing, qui doit être le Héros de l'histoire ?", options: ["Le PDG", "Le produit", "Le client", "Le concurrent"] },
          { questionText: "Pourquoi utilise-t-on le storytelling en marketing ?", options: ["Pour endormir les gens", "Pour créer un lien émotionnel", "Pour remplir de l'espace", "Pour embrouiller les gens"] },
          { questionText: "Une bonne histoire doit accrocher le spectateur dans les premières...", options: ["3 secondes", "3 minutes", "1 heure", "3 jours"] },
          { questionText: "Qu'est-ce que ton empreinte numérique ?", options: ["Ta pointure", "La trace de données que tu laisses en ligne", "L'encre de ton imprimante", "L'écran de ton ordinateur"] },
          { questionText: "Lequel est une donnée personnelle (PII) à ne JAMAIS partager ?", options: ["Ton film préféré", "Ton adresse de domicile", "Un dessin", "Un avis sur un jeu"] },
          { questionText: "Peut-on facilement supprimer des choses pour toujours d'internet ?", options: ["Oui, instantanément", "Non, les gens peuvent faire des captures et les garder", "Oui, en demandant gentiment", "Oui, en éteignant l'ordinateur"] },
          { questionText: "Que signifie CTA ?", options: ["Appel à l'action (Call To Action)", "Alignement central du texte", "Coût de la publicité", "Cliquer pour ajouter"] },
          { questionText: "Quel est un exemple de CTA ?", options: ["'Nous vendons des chaussures.'", "'Abonne-toi pour plus de vidéos !'", "'Les pommes sont rouges.'", "'Bonjour.'"] },
          { questionText: "Avant de lancer une campagne, tu dois connaître ton...", options: ["Couleur préférée", "Public cible", "Pointure", "Commande du déjeuner"] },
          { questionText: "Quelles couleurs McDonald's utilise-t-il pour te rendre heureux et affamé ?", options: ["Bleu et vert", "Rouge et jaune", "Noir et blanc", "Violet et orange"] },
          { questionText: "Dans une histoire de marketing, le produit doit jouer le rôle de :", options: ["Héros", "Méchant", "Guide", "Arrière-plan"] },
          { questionText: "Quelle est la meilleure façon de pratiquer la citoyenneté numérique ?", options: ["Être impoli dans les commentaires", "Respecter les autres et créditer les sources", "Voler des œuvres d'art", "Partager des mots de passe"] }
        ]
      },
      web: {
        title: "Merveilles du Web",
        subject: "Science",
        description: "Teste tes compétences en HTML, CSS et mise en page.",
        questions: [
          { questionText: "Que fournit le HTML à une page web ?", options: ["Les couleurs", "Les animations", "La structure de base (squelette)", "La base de données"] },
          { questionText: "Quelle balise est utilisée pour le plus grand titre ?", options: ["<p>", "<h1>", "<h6>", "<div>"] },
          { questionText: "Quelle balise est utilisée pour un paragraphe de texte ?", options: ["<text>", "<p>", "<para>", "<h>"] },
          { questionText: "Que fait le CSS ?", options: ["Construit la structure", "Met en forme la page avec couleurs et mises en page", "Stocke les mots de passe", "Fait tourner le serveur"] },
          { questionText: "Comment rendre le texte rouge en CSS ?", options: ["text: red;", "color: red;", "font-color: red;", "make-red;"] },
          { questionText: "Le CSS peut-il changer la police de ton texte ?", options: ["Oui", "Non", "Seulement le mardi", "Seulement si c'est bleu"] },
          { questionText: "Dans le modèle de boîte CSS, comment s'appelle l'espace À L'INTÉRIEUR de la bordure ?", options: ["Marge (Margin)", "Remplissage (Padding)", "Contenu (Content)", "Contour (Outline)"] },
          { questionText: "Comment s'appelle l'espace À L'EXTÉRIEUR de la bordure ?", options: ["Marge (Margin)", "Remplissage (Padding)", "Contenu (Content)", "Contour (Outline)"] },
          { questionText: "Les images rondes sont-elles en réalité des boîtes en CSS ?", options: ["Oui, tout est une boîte", "Non, les cercles sont des cercles", "Non, ce sont des triangles", "Seulement si elles sont rouges"] },
          { questionText: "Qu'est-ce qu'un serveur ?", options: ["Un serveur de restaurant", "Un ordinateur qui reste en ligne pour héberger tes fichiers", "Un type de CSS", "Un ordinateur cassé"] },
          { questionText: "Que faut-il obtenir pour que les gens visitent ton site ?", options: ["Une URL", "Une clé USB", "Un mot de passe", "Un livre"] },
          { questionText: "Que signifie 'Déployer' (Deploying) ?", options: ["Supprimer ton code", "Mettre ton code sur un serveur en ligne pour que le monde le voie", "Écrire du HTML", "Jouer à un jeu"] },
          { questionText: "Qu'est-ce que le DOM ?", options: ["Document Object Model", "Direct Object Math", "Digital Outline Maker", "Dog On Moon"] },
          { questionText: "Pourquoi le HTML sémantique est-il important ?", options: ["Il rend le site coloré", "Il aide les utilisateurs aveugles et les moteurs de recherche", "Il raccourcit le code", "Ce n'est pas important"] },
          { questionText: "Quelle couche du modèle de boîte contient le texte réel ?", options: ["Marge (Margin)", "Bordure (Border)", "Remplissage (Padding)", "Contenu (Content)"] }
        ]
      },
      art: {
        title: "Art Numérique",
        subject: "Arts",
        description: "Calques, théorie des couleurs et outils de dessin.",
        questions: [
          { questionText: "À quoi ressemblent les calques en art numérique ?", options: ["Des rochers lourds", "Des feuilles de verre transparentes empilées", "Une seule feuille de papier", "Un pinceau"] },
          { questionText: "Pourquoi les artistes utilisent-ils des calques ?", options: ["Pour alourdir le fichier", "Pour colorier sans abîmer le croquis (non destructif)", "Pour casser l'ordinateur", "Pour dessiner plus lentement"] },
          { questionText: "Si tu effaces sur le Calque 2, cela efface-t-il le Calque 1 ?", options: ["Oui", "Non", "Seulement si c'est rouge", "Toujours"] },
          { questionText: "Les couleurs opposées sur la roue chromatique s'appellent :", options: ["Analogues", "Complémentaires", "Primaires", "Ennuyeuses"] },
          { questionText: "Quel est un exemple de couleurs complémentaires ?", options: ["Rouge et rose", "Bleu et orange", "Vert et vert", "Noir et blanc"] },
          { questionText: "Que créent les couleurs complémentaires ?", options: ["De l'ennui", "Un contraste et une intensité maximum", "Un fouillis gris", "L'invisibilité"] },
          { questionText: "Qu'est-ce que la règle des tiers ?", options: ["Diviser la toile en une grille de 3x3", "Dessiner 3 cercles", "Utiliser seulement 3 couleurs", "Prendre 3 heures pour dessiner"] },
          { questionText: "Où placer ton sujet principal pour une composition cinématographique ?", options: ["En plein centre", "Hors de la toile", "Aux intersections de la grille", "Toujours dans le coin inférieur"] },
          { questionText: "Le centre exact est-il toujours le meilleur endroit pour un personnage ?", options: ["Oui", "Non, la règle des tiers est souvent meilleure", "Toujours", "Seulement le lundi"] },
          { questionText: "Qu'est-ce que le rendu (rendering) ?", options: ["Ajouter lumière et ombre pour un effet 3D", "Effacer le dessin", "Ajouter une signature", "Enregistrer le fichier"] },
          { questionText: "La partie de l'objet face au soleil reçoit un :", options: ["Ombre", "Reflet (Highlight)", "Contour", "Signature"] },
          { questionText: "La partie opposée à la lumière reçoit une :", options: ["Reflet (Highlight)", "Ombre", "Couleur vive", "Point blanc"] },
          { questionText: "En dessinant un personnage, que faut-il dessiner en premier ?", options: ["Des yeux détaillés", "Des formes 3D de base comme des sphères et cylindres", "L'arrière-plan", "Les cheveux"] },
          { questionText: "Que signifie 'valeur' en théorie des couleurs ?", options: ["Le prix d'une peinture", "À quel point une couleur est claire ou foncée", "Combien de couleurs tu utilises", "La taille du pinceau"] },
          { questionText: "Où se produit l'『occlusion ambiante』 ?", options: ["En plein soleil", "Dans les creux profonds où la lumière n'atteint pas", "Dans le ciel", "Sur le reflet"] }
        ]
      }
    }
  },

  // ===================================================================
  // GERMAN
  // ===================================================================
  de: {
    quizzesData: {
      python: {
        title: "Python für Kinder",
        subject: "Programmierung",
        description: "Teste dein Wissen über Python-Grundlagen, Variablen und Schleifen!",
        questions: [
          { questionText: "Was ist Python?", options: ["Eine Schlangenart", "Eine Computersprache", "Ein Videospiel", "Ein Taschenrechner"] },
          { questionText: "Welcher Befehl lässt den Computer Text anzeigen?", options: ["show()", "speak()", "print()", "display()"] },
          { questionText: "Python ist bekannt dafür, dass es:", options: ["Sehr schwer zu lesen ist", "Nur für Wissenschaftler ist", "Leicht für Menschen zu lesen ist", "Nur für alte Computer ist"] },
          { questionText: "Was ist eine Variable?", options: ["Eine beschriftete Box zum Speichern von Daten", "Eine Art Fehler", "Eine Matheaufgabe", "Ein Drucker"] },
          { questionText: "Wie nennt man Text wie 'Hallo' in der Programmierung?", options: ["Ganzzahl", "Zeichenkette (String)", "Zahl", "Robotertext"] },
          { questionText: "Wenn score = 4 + 6, was steht in der Variable score?", options: ["46", "4 + 6", "10", "Fehler"] },
          { questionText: "Was ermöglichen 'if-Anweisungen' einem Programm?", options: ["Abstürzen", "Entscheidungen treffen", "Text anzeigen", "Variablen speichern"] },
          { questionText: "Was bedeutet das Symbol '>' im Code?", options: ["Gleich", "Kleiner als", "Größer als", "Plus"] },
          { questionText: "Welche davon ist eine korrekte if-Anweisung?", options: ["if score is 10 then win", "if score > 10:", "score if 10", "if (10) score"] },
          { questionText: "Welcher Befehl lässt den Nutzer eine Antwort eingeben?", options: ["print()", "type()", "input()", "read()"] },
          { questionText: "Warum benutzen wir eine Schleife in einem Spiel?", options: ["Um es bunt zu machen", "Damit der Spieler mehrmals raten kann", "Um das Spiel zu stoppen", "Um es schwerer zu machen"] },
          { questionText: "Wenn das Geheimnis 5 ist und du 8 rätst, sollte das Programm sagen:", options: ["Zu niedrig!", "Zu hoch!", "Gewonnen!", "Fehler"] },
          { questionText: "Nach welcher TV-Show wurde Python benannt?", options: ["Python Rangers", "Monty Python's Flying Circus", "The Daily Python", "Snake TV"] },
          { questionText: "Welcher Datentyp ist eine ganze Zahl wie 5?", options: ["Zeichenkette (String)", "Ganzzahl (Integer)", "Kommazahl (Float)", "Boolescher Wert"] },
          { questionText: "Wenn Mario einen Goomba trifft, welche Anweisung behandelt den Verlust eines Lebens?", options: ["Eine print-Anweisung", "Eine if-Anweisung", "Eine Schleife", "Eine Zeichenkette"] }
        ]
      },
      math: {
        title: "Mathe-Magie",
        subject: "Mathematik",
        description: "Teste deine Fähigkeiten in Zahlenfolgen, Geometrie und Logikrätseln.",
        questions: [
          { questionText: "Was ist die nächste Zahl in: 5, 10, 15, 20...?", options: ["22", "25", "30", "100"] },
          { questionText: "Was ist die nächste Zahl in: 1, 3, 5, 7...?", options: ["8", "9", "10", "11"] },
          { questionText: "Wie nennt man eine Liste von Zahlen, die einer Regel folgt?", options: ["Ein Durcheinander", "Eine Folge (Sequenz)", "Eine Variable", "Eine Schleife"] },
          { questionText: "Wie viele Seiten hat ein Sechseck?", options: ["4", "5", "6", "8"] },
          { questionText: "Wie nennt man ein 3D-Quadrat?", options: ["Kugel", "Würfel", "Pyramide", "Zylinder"] },
          { questionText: "Welcher Winkel ist genau 90 Grad?", options: ["Süßer Winkel", "Rechter Winkel", "Falscher Winkel", "Linker Winkel"] },
          { questionText: "Wenn A größer als B ist und B größer als C. Wer ist am größten?", options: ["A", "B", "C", "Sie sind gleich"] },
          { questionText: "Ich habe 4 Beine, kann aber nicht laufen. Was bin ich?", options: ["Ein Hund", "Ein Stuhl", "Ein Vogel", "Eine Schlange"] },
          { questionText: "Was ist deduktives Denken?", options: ["Wildes Raten", "Hinweise nutzen, um falsche Antworten auszuschließen", "Zahlen addieren", "Formen zeichnen"] },
          { questionText: "Was ist ein Algorithmus?", options: ["Ein Mathefehler", "Eine Dinosaurierart", "Eine Schritt-für-Schritt-Liste von Anweisungen", "Eine 3D-Form"] },
          { questionText: "Warum ist die Reihenfolge der Schritte in einem Algorithmus wichtig?", options: ["Ist sie nicht", "Damit der Computer nicht durcheinanderkommt und versagt", "Weil es hübsch aussieht", "Um Strom zu sparen"] },
          { questionText: "Was ist der beste Weg, ein riesiges, schweres Problem zu lösen?", options: ["Weinen", "Es in winzige, einfache Schritte zerlegen", "Raten", "Aufgeben"] },
          { questionText: "Die Fibonacci-Folge findet man in:", options: ["Nur in Lehrbüchern", "Sonnenblumenkernen und Galaxien", "Nur in Computern", "Nirgendwo"] },
          { questionText: "Wenn du ein Dreieck hast, wie viele Winkel hat es?", options: ["2", "3", "4", "5"] },
          { questionText: "Welches Unternehmen nutzt Algorithmen, um Webseiten für dich zu finden?", options: ["Nintendo", "Google", "McDonald's", "Ford"] }
        ]
      },
      finance: {
        title: "Clever mit Geld",
        subject: "Finanzen",
        description: "Budgetierung, Investieren und die Geschichte des Geldes.",
        questions: [
          { questionText: "Was ist Tauschhandel?", options: ["Kreditkarten benutzen", "Waren direkt tauschen", "In Aktien investieren", "Bei einer Bank sparen"] },
          { questionText: "Warum wurde Geld erfunden?", options: ["Weil Münzen glänzen", "Um den Handel zu erleichtern", "Um Geldbörsen schwer zu machen", "Weil die Hühner weggelaufen sind"] },
          { questionText: "Geld funktioniert nur, wenn...", options: ["Es aus Gold ist", "Es auf grünem Papier gedruckt ist", "Alle sich einig sind, dass es Wert hat", "Es das Gesicht eines Präsidenten hat"] },
          { questionText: "Geld, das in deine Tasche HEREINKOMMT, nennt man:", options: ["Ausgabe", "Einkommen", "Steuer", "Schulden"] },
          { questionText: "Geld, das HINAUSGEHT (wenn du etwas kaufst), nennt man:", options: ["Ausgabe", "Einkommen", "Gewinn", "Dividende"] },
          { questionText: "Ein gutes Budget stellt sicher, dass...", options: ["Du alles ausgibst", "Deine Ausgaben höher als dein Einkommen sind", "Deine Ausgaben niedriger als dein Einkommen sind", "Du jeden Tag Spielzeug kaufst"] },
          { questionText: "Wenn eine Bank dich dafür bezahlt, dass du Geld bei ihr lässt, nennt man das:", options: ["Steuern", "Zinsen", "Bußgelder", "Kredite"] },
          { questionText: "Was ist Zinseszins?", options: ["Zinsen auf Zinsen verdienen", "Geld verlieren", "Die Bank bezahlen", "Einfacher Zins"] },
          { questionText: "Zinseszins funktioniert am besten, wenn du...", options: ["Dein Geld sofort abhebst", "Dein Geld lange in der Bank lässt", "Alles ausgibst", "Es unter dem Bett versteckst"] },
          { questionText: "Wenn du eine Aktie kaufst, was kaufst du?", options: ["Ein Stück Papier", "Einen winzigen Teil eines Unternehmens", "Einen Kredit an den Staat", "Ein Produkt"] },
          { questionText: "Das Ziel des Investierens ist es,...", options: ["Dein Geld wachsen zu lassen", "Geld zu verlieren", "Es genau gleich zu halten", "Steuern zu zahlen"] },
          { questionText: "Ist Investieren riskant?", options: ["Nein, es ist garantiert", "Ja, Unternehmen können an Wert verlieren", "Nur für alte Leute", "Nein, du gewinnst immer"] },
          { questionText: "Die goldene Regel zum Vermögensaufbau lautet:", options: ["Immer weniger ausgeben, als du verdienst", "Alles ausgeben, was du hast", "So viel wie möglich leihen", "Nie eine Bank benutzen"] },
          { questionText: "Was ist ein Budget?", options: ["Eine Tierart", "Ein Plan für dein Geld", "Eine Art Bankkonto", "Ein Kredit"] },
          { questionText: "Wenn du Disney-Aktien kaufst, besitzt du:", options: ["Das ganze Unternehmen", "Einen winzigen Teil von Disney", "Alle ihre Filme", "Nichts"] }
        ]
      },
      marketing: {
        title: "Zukünftige Kreative",
        subject: "Marketing",
        description: "Markenbildung, Storytelling und digitale Sicherheit für Kreative.",
        questions: [
          { questionText: "Was ist eine Marke?", options: ["Nur ein Logo", "Das Gefühl und der Ruf eines Unternehmens", "Das Gebäude, in dem sie arbeiten", "Der Name des Chefs"] },
          { questionText: "Warum verwenden Unternehmen bestimmte Farben?", options: ["Weil sie billig sind", "Um bestimmte Emotionen auszulösen", "Weil es zufällig ist", "Um Schmutz zu verstecken"] },
          { questionText: "Welches davon gehört zur Identität einer Marke?", options: ["Logos, Farben und Schriftarten", "Gehälter der Mitarbeiter", "Die Bürostühle", "Steuererklärungen"] },
          { questionText: "Wer sollte im Marketing der Held der Geschichte sein?", options: ["Der Chef", "Das Produkt", "Der Kunde", "Der Konkurrent"] },
          { questionText: "Warum nutzen wir Storytelling im Marketing?", options: ["Um Leute einzuschläfern", "Um eine emotionale Verbindung aufzubauen", "Um Platz zu füllen", "Um Leute zu verwirren"] },
          { questionText: "Eine gute Geschichte muss den Zuschauer in den ersten... fesseln", options: ["3 Sekunden", "3 Minuten", "1 Stunde", "3 Tagen"] },
          { questionText: "Was ist dein digitaler Fußabdruck?", options: ["Deine Schuhgröße", "Die Datenspur, die du online hinterlässt", "Deine Druckertinte", "Dein Computerbildschirm"] },
          { questionText: "Welches davon ist eine persönliche Info (PII), die man NIEMALS teilen sollte?", options: ["Dein Lieblingsfilm", "Deine Wohnadresse", "Eine Zeichnung", "Eine Spielrezension"] },
          { questionText: "Kann man Dinge leicht für immer aus dem Internet löschen?", options: ["Ja, sofort", "Nein, Leute können Screenshots machen und speichern", "Ja, durch höfliches Fragen", "Ja, wenn man den Computer ausschaltet"] },
          { questionText: "Wofür steht CTA?", options: ["Handlungsaufruf (Call To Action)", "Zentrale Textausrichtung", "Werbekosten", "Klicken zum Hinzufügen"] },
          { questionText: "Was ist ein Beispiel für einen CTA?", options: ["'Wir verkaufen Schuhe.'", "'Abonniere für mehr Videos!'", "'Äpfel sind rot.'", "'Hallo.'"] },
          { questionText: "Bevor du eine Kampagne startest, musst du deine... kennen", options: ["Lieblingsfarbe", "Zielgruppe", "Schuhgröße", "Mittagsbestellung"] },
          { questionText: "Welche Farben nutzt McDonald's, um dich glücklich und hungrig zu machen?", options: ["Blau und Grün", "Rot und Gelb", "Schwarz und Weiß", "Lila und Orange"] },
          { questionText: "In einer Marketing-Geschichte sollte das Produkt die Rolle des... spielen", options: ["Helden", "Bösewichts", "Ratgebers", "Hintergrunds"] },
          { questionText: "Was ist der beste Weg, digitale Bürgerschaft zu praktizieren?", options: ["Unhöflich in Kommentaren sein", "Andere respektieren und Quellen nennen", "Kunst stehlen", "Passwörter teilen"] }
        ]
      },
      web: {
        title: "Web-Wunder",
        subject: "Wissenschaft",
        description: "Teste deine HTML-, CSS- und Layout-Fähigkeiten.",
        questions: [
          { questionText: "Was liefert HTML für eine Webseite?", options: ["Farben", "Animationen", "Die Grundstruktur (Skelett)", "Die Datenbank"] },
          { questionText: "Welches Tag wird für die größte Überschrift verwendet?", options: ["<p>", "<h1>", "<h6>", "<div>"] },
          { questionText: "Welches Tag wird für einen Textabsatz verwendet?", options: ["<text>", "<p>", "<para>", "<h>"] },
          { questionText: "Was macht CSS?", options: ["Baut die Struktur", "Gestaltet die Webseite mit Farben und Layouts", "Speichert Passwörter", "Betreibt den Server"] },
          { questionText: "Wie würdest du Text in CSS rot machen?", options: ["text: red;", "color: red;", "font-color: red;", "make-red;"] },
          { questionText: "Kann CSS die Schriftart deines Textes ändern?", options: ["Ja", "Nein", "Nur dienstags", "Nur wenn er blau ist"] },
          { questionText: "Wie heißt im CSS-Boxmodell der Raum INNERHALB des Rahmens?", options: ["Außenabstand (Margin)", "Innenabstand (Padding)", "Inhalt (Content)", "Umriss (Outline)"] },
          { questionText: "Wie heißt der Raum AUSSERHALB des Rahmens?", options: ["Außenabstand (Margin)", "Innenabstand (Padding)", "Inhalt (Content)", "Umriss (Outline)"] },
          { questionText: "Sind runde Bilder in CSS eigentlich Boxen?", options: ["Ja, alles ist eine Box", "Nein, Kreise sind Kreise", "Nein, es sind Dreiecke", "Nur wenn sie rot sind"] },
          { questionText: "Was ist ein Server?", options: ["Ein Kellner", "Ein Computer, der online bleibt, um deine Dateien zu hosten", "Eine Art CSS", "Ein kaputter Computer"] },
          { questionText: "Was brauchst du, damit Leute deine Seite besuchen können?", options: ["Eine URL", "Einen USB-Stick", "Ein Passwort", "Ein Buch"] },
          { questionText: "Was bedeutet 'Deployen' (Deploying)?", options: ["Deinen Code löschen", "Deinen Code auf einen Live-Server stellen, damit die Welt ihn sieht", "HTML schreiben", "Ein Spiel spielen"] },
          { questionText: "Was ist das DOM?", options: ["Document Object Model", "Direct Object Math", "Digital Outline Maker", "Dog On Moon"] },
          { questionText: "Warum ist semantisches HTML wichtig?", options: ["Es macht die Seite bunt", "Es hilft blinden Nutzern und Suchmaschinen", "Es macht den Code kürzer", "Es ist nicht wichtig"] },
          { questionText: "Welche Schicht des Boxmodells enthält den eigentlichen Text?", options: ["Außenabstand (Margin)", "Rahmen (Border)", "Innenabstand (Padding)", "Inhalt (Content)"] }
        ]
      },
      art: {
        title: "Digitale Kunst",
        subject: "Kunst",
        description: "Ebenen, Farbtheorie und Zeichenwerkzeuge.",
        questions: [
          { questionText: "Womit sind Ebenen in der digitalen Kunst vergleichbar?", options: ["Schwere Steine", "Klare Glasscheiben, übereinander gestapelt", "Ein einzelnes Blatt Papier", "Ein Pinsel"] },
          { questionText: "Warum benutzen Künstler Ebenen?", options: ["Um die Datei schwer zu machen", "Um zu colorieren, ohne die Skizze zu ruinieren (nicht-destruktiv)", "Um den Computer kaputt zu machen", "Um langsamer zu zeichnen"] },
          { questionText: "Wenn du auf Ebene 2 radierst, löscht das Ebene 1?", options: ["Ja", "Nein", "Nur wenn sie rot ist", "Immer"] },
          { questionText: "Farben, die sich auf dem Farbkreis gegenüberliegen, nennt man:", options: ["Analog", "Komplementär", "Primär", "Langweilig"] },
          { questionText: "Was ist ein Beispiel für Komplementärfarben?", options: ["Rot und Rosa", "Blau und Orange", "Grün und Grün", "Schwarz und Weiß"] },
          { questionText: "Was erzeugen Komplementärfarben?", options: ["Langeweile", "Maximalen Kontrast und Spannung", "Ein graues Chaos", "Unsichtbarkeit"] },
          { questionText: "Was ist die Drittel-Regel?", options: ["Die Leinwand in ein 3x3-Raster teilen", "3 Kreise zeichnen", "Nur 3 Farben benutzen", "3 Stunden zum Zeichnen brauchen"] },
          { questionText: "Wo solltest du dein Hauptmotiv für eine filmische Komposition platzieren?", options: ["Genau in der Mitte", "Außerhalb der Leinwand", "An den Rasterschnittpunkten", "Immer in der unteren Ecke"] },
          { questionText: "Ist die exakte Mitte immer der beste Platz für eine Figur?", options: ["Ja", "Nein, die Drittel-Regel ist meist besser", "Immer", "Nur montags"] },
          { questionText: "Was ist Rendering?", options: ["Licht und Schatten hinzufügen, damit es 3D aussieht", "Die Zeichnung löschen", "Eine Signatur hinzufügen", "Die Datei speichern"] },
          { questionText: "Der Teil des Objekts, der zur Sonne zeigt, bekommt ein:", options: ["Schatten", "Glanzlicht (Highlight)", "Umriss", "Signatur"] },
          { questionText: "Der Teil, der vom Licht abgewandt ist, bekommt einen:", options: ["Glanzlicht (Highlight)", "Schatten", "Helle Farbe", "Weißen Punkt"] },
          { questionText: "Was solltest du beim Zeichnen einer Figur zuerst zeichnen?", options: ["Detaillierte Augen", "Grundlegende 3D-Formen wie Kugeln und Zylinder", "Den Hintergrund", "Die Haare"] },
          { questionText: "Was bedeutet 'Wert' (Value) in der Farbtheorie?", options: ["Wie viel ein Gemälde kostet", "Wie hell oder dunkel eine Farbe ist", "Wie viele Farben du benutzt", "Wie groß der Pinsel ist"] },
          { questionText: "Wo tritt 'Ambient Occlusion' auf?", options: ["Im direkten Sonnenlicht", "In tiefen Spalten, wo das Licht nicht hinkommt", "Am Himmel", "Auf dem Glanzlicht"] }
        ]
      }
    }
  },

  // ===================================================================
  // ARABIC (RTL)
  // ===================================================================
  ar: {
    quizzesData: {
      python: {
        title: "بايثون للأطفال",
        subject: "البرمجة",
        description: "اختبر معرفتك بأساسيات بايثون والمتغيرات والحلقات!",
        questions: [
          { questionText: "ما هي لغة بايثون؟", options: ["نوع من الثعابين", "لغة حاسوب", "لعبة فيديو", "آلة حاسبة"] },
          { questionText: "أي أمر يجعل الحاسوب يعرض نصًا؟", options: ["show()", "speak()", "print()", "display()"] },
          { questionText: "بايثون مشهورة بأنها:", options: ["صعبة القراءة جدًا", "للعلماء فقط", "سهلة القراءة للبشر", "لأجهزة الحاسوب القديمة فقط"] },
          { questionText: "ما هو المتغير؟", options: ["صندوق موسوم لتخزين البيانات", "نوع من الأخطاء", "مسألة رياضية", "طابعة"] },
          { questionText: "ماذا نسمّي نصًا مثل 'مرحبا' في البرمجة؟", options: ["عدد صحيح", "سلسلة نصية (String)", "رقم", "نص الروبوت"] },
          { questionText: "إذا كان score = 4 + 6، فماذا يوجد داخل المتغير score؟", options: ["46", "4 + 6", "10", "خطأ"] },
          { questionText: "ماذا تتيح 'جمل if' للبرنامج أن يفعل؟", options: ["الانهيار", "اتخاذ القرارات", "طباعة النص", "تخزين المتغيرات"] },
          { questionText: "في الكود، ماذا يعني الرمز '>'؟", options: ["يساوي", "أصغر من", "أكبر من", "زائد"] },
          { questionText: "أي من هذه جملة if صحيحة؟", options: ["if score is 10 then win", "if score > 10:", "score if 10", "if (10) score"] },
          { questionText: "أي أمر يسمح للمستخدم بكتابة إجابة؟", options: ["print()", "type()", "input()", "read()"] },
          { questionText: "لماذا نستخدم الحلقة (loop) في لعبة؟", options: ["لجعلها ملونة", "للسماح للاعب بالتخمين عدة مرات", "لإيقاف اللعبة", "لجعلها أصعب"] },
          { questionText: "إذا كان الرقم السري 5 وخمّنت 8، يجب أن يقول البرنامج:", options: ["منخفض جدًا!", "مرتفع جدًا!", "لقد فزت!", "خطأ"] },
          { questionText: "على اسم أي برنامج تلفزيوني سُمّيت بايثون؟", options: ["Python Rangers", "Monty Python's Flying Circus", "The Daily Python", "Snake TV"] },
          { questionText: "ما نوع البيانات لرقم صحيح مثل 5؟", options: ["سلسلة نصية (String)", "عدد صحيح (Integer)", "عدد عشري (Float)", "قيمة منطقية"] },
          { questionText: "إذا اصطدم ماريو بعدو، أي نوع من الجمل يتعامل مع خسارته حياة؟", options: ["جملة print", "جملة if", "حلقة", "سلسلة نصية"] }
        ]
      },
      math: {
        title: "سحر الرياضيات",
        subject: "الرياضيات",
        description: "اختبر مهاراتك في المتتاليات والهندسة وألغاز المنطق.",
        questions: [
          { questionText: "ما الرقم التالي في: 5، 10، 15، 20...؟", options: ["22", "25", "30", "100"] },
          { questionText: "ما الرقم التالي في: 1، 3، 5، 7...؟", options: ["8", "9", "10", "11"] },
          { questionText: "ماذا نسمّي قائمة أرقام تتبع قاعدة؟", options: ["فوضى", "متتالية", "متغير", "حلقة"] },
          { questionText: "كم عدد أضلاع الشكل السداسي؟", options: ["4", "5", "6", "8"] },
          { questionText: "ماذا نسمّي المربع في ثلاثة أبعاد؟", options: ["كرة", "مكعب", "هرم", "أسطوانة"] },
          { questionText: "أي زاوية تساوي 90 درجة تمامًا؟", options: ["زاوية لطيفة", "زاوية قائمة", "زاوية خاطئة", "زاوية يسرى"] },
          { questionText: "إذا كان A أطول من B، وB أطول من C. من الأطول؟", options: ["A", "B", "C", "متساوون"] },
          { questionText: "لديّ 4 أرجل لكنني لا أستطيع المشي. ما أنا؟", options: ["كلب", "كرسي", "طائر", "ثعبان"] },
          { questionText: "ما هو الاستدلال الاستنتاجي؟", options: ["التخمين العشوائي", "استخدام الأدلة لاستبعاد الإجابات الخاطئة", "جمع الأرقام", "رسم الأشكال"] },
          { questionText: "ما هي الخوارزمية؟", options: ["خطأ رياضي", "نوع من الديناصورات", "قائمة تعليمات خطوة بخطوة", "شكل ثلاثي الأبعاد"] },
          { questionText: "لماذا يهمّ ترتيب الخطوات في الخوارزمية؟", options: ["لا يهمّ", "حتى لا يرتبك الحاسوب ويفشل", "لأنه يبدو جميلًا", "لتوفير الكهرباء"] },
          { questionText: "ما أفضل طريقة لحل مشكلة ضخمة وصعبة؟", options: ["البكاء", "تقسيمها إلى خطوات صغيرة وسهلة", "التخمين", "الاستسلام"] },
          { questionText: "توجد متتالية فيبوناتشي في:", options: ["الكتب المدرسية فقط", "بذور دوّار الشمس والمجرّات", "أجهزة الحاسوب فقط", "لا مكان"] },
          { questionText: "إذا كان لديك مثلث، كم عدد زواياه؟", options: ["2", "3", "4", "5"] },
          { questionText: "أي شركة تستخدم الخوارزميات لإيجاد المواقع لك؟", options: ["نينتندو", "جوجل", "ماكدونالدز", "فورد"] }
        ]
      },
      finance: {
        title: "ذكاء المال",
        subject: "المال والأعمال",
        description: "الميزانية والاستثمار وتاريخ المال.",
        questions: [
          { questionText: "ما هي المقايضة؟", options: ["استخدام بطاقات الائتمان", "تبادل السلع مباشرة", "الاستثمار في الأسهم", "الادخار في البنك"] },
          { questionText: "لماذا اختُرع المال؟", options: ["لأن العملات لامعة", "لتسهيل التجارة", "لجعل المحافظ ثقيلة", "لأن الدجاج هرب"] },
          { questionText: "لا يعمل المال إلا إذا...", options: ["كان مصنوعًا من الذهب", "طُبع على ورق أخضر", "اتفق الجميع على أن له قيمة", "حمل وجه رئيس"] },
          { questionText: "المال الذي يدخل إلى جيبك يُسمّى:", options: ["مصروف", "دخل", "ضريبة", "دَيْن"] },
          { questionText: "المال الذي يخرج (عندما تشتري شيئًا) يُسمّى:", options: ["مصروف", "دخل", "ربح", "توزيعات أرباح"] },
          { questionText: "الميزانية الجيدة تضمن أن...", options: ["تنفق كل شيء", "تكون مصروفاتك أعلى من دخلك", "تكون مصروفاتك أقل من دخلك", "تشتري ألعابًا كل يوم"] },
          { questionText: "عندما يدفع لك البنك مقابل حفظ أموالك لديه، يُسمّى ذلك:", options: ["ضرائب", "فائدة", "غرامات", "قروض"] },
          { questionText: "ما هي الفائدة المركبة؟", options: ["كسب فائدة على الفائدة", "خسارة المال", "الدفع للبنك", "فائدة بسيطة"] },
          { questionText: "تعمل الفائدة المركبة بشكل أفضل عندما...", options: ["تسحب أموالك فورًا", "تترك أموالك في البنك لفترة طويلة", "تنفقها كلها", "تخبئها تحت السرير"] },
          { questionText: "عندما تشتري سهمًا، ماذا تشتري؟", options: ["قطعة ورق", "جزءًا صغيرًا من شركة", "قرضًا للحكومة", "منتجًا"] },
          { questionText: "الهدف من الاستثمار هو...", options: ["تنمية أموالك", "خسارة المال", "إبقاؤها كما هي تمامًا", "دفع الضرائب"] },
          { questionText: "هل الاستثمار محفوف بالمخاطر؟", options: ["لا، إنه مضمون", "نعم، قد تفقد الشركات قيمتها", "لكبار السن فقط", "لا، تربح دائمًا"] },
          { questionText: "القاعدة الذهبية لبناء الثروة هي:", options: ["أنفق دائمًا أقل مما تكسب", "أنفق كل ما لديك", "اقترض أكبر قدر ممكن", "لا تستخدم البنك أبدًا"] },
          { questionText: "ما هي الميزانية؟", options: ["نوع من الحيوانات", "خطة لأموالك", "نوع من الحسابات البنكية", "قرض"] },
          { questionText: "إذا اشتريت أسهم ديزني، فأنت تملك:", options: ["الشركة بأكملها", "جزءًا صغيرًا من ديزني", "كل أفلامهم", "لا شيء"] }
        ]
      },
      marketing: {
        title: "صنّاع المستقبل",
        subject: "التسويق",
        description: "العلامة التجارية ورواية القصص والأمان الرقمي للمبدعين.",
        questions: [
          { questionText: "ما هي العلامة التجارية؟", options: ["مجرد شعار", "شعور وسمعة الشركة", "المبنى الذي يعملون فيه", "اسم المدير التنفيذي"] },
          { questionText: "لماذا تستخدم الشركات ألوانًا محددة؟", options: ["لأنها رخيصة", "لإثارة مشاعر محددة", "لأنه أمر عشوائي", "لإخفاء الأوساخ"] },
          { questionText: "أي مما يلي جزء من هوية العلامة التجارية؟", options: ["الشعارات والألوان والخطوط", "رواتب الموظفين", "كراسي المكتب", "الإقرارات الضريبية"] },
          { questionText: "في التسويق، من يجب أن يكون بطل القصة؟", options: ["المدير التنفيذي", "المنتج", "العميل", "المنافس"] },
          { questionText: "لماذا نستخدم رواية القصص في التسويق؟", options: ["لتنويم الناس", "لبناء رابط عاطفي", "لملء الفراغ", "لإرباك الناس"] },
          { questionText: "يجب أن تجذب القصة الجيدة المشاهد في أول...", options: ["3 ثوانٍ", "3 دقائق", "ساعة واحدة", "3 أيام"] },
          { questionText: "ما هي بصمتك الرقمية؟", options: ["مقاس حذائك", "أثر البيانات الذي تتركه على الإنترنت", "حبر طابعتك", "شاشة حاسوبك"] },
          { questionText: "أي مما يلي معلومة شخصية (PII) يجب ألا تشاركها أبدًا؟", options: ["فيلمك المفضل", "عنوان منزلك", "رسمة", "مراجعة لعبة"] },
          { questionText: "هل يمكن حذف الأشياء بسهولة إلى الأبد من الإنترنت؟", options: ["نعم، فورًا", "لا، يمكن للناس التقاط صورة وحفظها", "نعم، بالطلب بلطف", "نعم، بإطفاء الحاسوب"] },
          { questionText: "ماذا يعني CTA؟", options: ["دعوة لاتخاذ إجراء (Call To Action)", "محاذاة النص للوسط", "تكلفة الإعلان", "انقر للإضافة"] },
          { questionText: "ما مثال على CTA؟", options: ["'نبيع الأحذية.'", "'اشترك للمزيد من الفيديوهات!'", "'التفاح أحمر.'", "'مرحبا.'"] },
          { questionText: "قبل إطلاق حملة، تحتاج إلى معرفة...", options: ["لونك المفضل", "جمهورك المستهدف", "مقاس حذائك", "طلب غدائك"] },
          { questionText: "ما الألوان التي يستخدمها ماكدونالدز ليجعلك سعيدًا وجائعًا؟", options: ["الأزرق والأخضر", "الأحمر والأصفر", "الأسود والأبيض", "البنفسجي والبرتقالي"] },
          { questionText: "في قصة تسويقية، يجب أن يقوم المنتج بدور:", options: ["البطل", "الشرير", "المرشد", "الخلفية"] },
          { questionText: "ما أفضل طريقة لممارسة المواطنة الرقمية؟", options: ["أن تكون فظًا في التعليقات", "احترام الآخرين ونسب الفضل لأصحابه", "سرقة الأعمال الفنية", "مشاركة كلمات المرور"] }
        ]
      },
      web: {
        title: "عجائب الويب",
        subject: "العلوم",
        description: "اختبر مهاراتك في HTML وCSS والتخطيط.",
        questions: [
          { questionText: "ماذا يوفّر HTML لصفحة الويب؟", options: ["الألوان", "الرسوم المتحركة", "البنية الأساسية (الهيكل)", "قاعدة البيانات"] },
          { questionText: "أي وسم يُستخدم لأكبر عنوان؟", options: ["<p>", "<h1>", "<h6>", "<div>"] },
          { questionText: "أي وسم يُستخدم لفقرة نصية؟", options: ["<text>", "<p>", "<para>", "<h>"] },
          { questionText: "ماذا يفعل CSS؟", options: ["يبني البنية", "ينسّق الصفحة بالألوان والتخطيطات", "يخزّن كلمات المرور", "يشغّل الخادم"] },
          { questionText: "كيف تجعل النص أحمر في CSS؟", options: ["text: red;", "color: red;", "font-color: red;", "make-red;"] },
          { questionText: "هل يستطيع CSS تغيير خط نصك؟", options: ["نعم", "لا", "أيام الثلاثاء فقط", "فقط إذا كان أزرق"] },
          { questionText: "في نموذج الصندوق في CSS، ماذا يُسمّى الفراغ داخل الحدود؟", options: ["الهامش (Margin)", "الحشو (Padding)", "المحتوى (Content)", "المخطط (Outline)"] },
          { questionText: "ماذا يُسمّى الفراغ خارج الحدود؟", options: ["الهامش (Margin)", "الحشو (Padding)", "المحتوى (Content)", "المخطط (Outline)"] },
          { questionText: "هل الصور الدائرية هي في الحقيقة صناديق في CSS؟", options: ["نعم، كل شيء صندوق", "لا، الدوائر دوائر", "لا، إنها مثلثات", "فقط إذا كانت حمراء"] },
          { questionText: "ما هو الخادم (Server)؟", options: ["نادل", "حاسوب يبقى متصلاً لاستضافة ملفاتك", "نوع من CSS", "حاسوب معطّل"] },
          { questionText: "ماذا تحصل عليه ليتمكن الناس من زيارة موقعك؟", options: ["رابط (URL)", "ذاكرة USB", "كلمة مرور", "كتاب"] },
          { questionText: "ماذا يعني 'النشر' (Deploying)؟", options: ["حذف الكود", "وضع الكود على خادم مباشر ليراه العالم", "كتابة HTML", "لعب لعبة"] },
          { questionText: "ما هو DOM؟", options: ["Document Object Model", "Direct Object Math", "Digital Outline Maker", "Dog On Moon"] },
          { questionText: "لماذا HTML الدلالي (Semantic) مهم؟", options: ["يجعل الموقع ملونًا", "يساعد المستخدمين المكفوفين ومحركات البحث", "يجعل الكود أقصر", "ليس مهمًا"] },
          { questionText: "أي طبقة من نموذج الصندوق تحتوي على النص الفعلي؟", options: ["الهامش (Margin)", "الحدود (Border)", "الحشو (Padding)", "المحتوى (Content)"] }
        ]
      },
      art: {
        title: "الفن الرقمي",
        subject: "الفنون",
        description: "الطبقات ونظرية الألوان وأدوات الرسم.",
        questions: [
          { questionText: "بماذا تشبه الطبقات في الفن الرقمي؟", options: ["صخور ثقيلة", "ألواح زجاجية شفافة مكدّسة فوق بعضها", "ورقة واحدة", "فرشاة"] },
          { questionText: "لماذا يستخدم الفنانون الطبقات؟", options: ["لجعل الملف ثقيلًا", "للتلوين دون إفساد الرسم التخطيطي (بدون تدمير)", "لتعطيل الحاسوب", "للرسم ببطء"] },
          { questionText: "إذا مسحت على الطبقة 2، هل تُمسح الطبقة 1؟", options: ["نعم", "لا", "فقط إذا كانت حمراء", "دائمًا"] },
          { questionText: "الألوان المتقابلة على عجلة الألوان تُسمّى:", options: ["متناظرة", "متكاملة", "أساسية", "مملة"] },
          { questionText: "ما مثال على الألوان المتكاملة؟", options: ["الأحمر والوردي", "الأزرق والبرتقالي", "الأخضر والأخضر", "الأسود والأبيض"] },
          { questionText: "ماذا تُنشئ الألوان المتكاملة؟", options: ["الملل", "أقصى تباين وإثارة", "فوضى رمادية", "الاختفاء"] },
          { questionText: "ما هي قاعدة الأثلاث؟", options: ["تقسيم اللوحة إلى شبكة 3×3", "رسم 3 دوائر", "استخدام 3 ألوان فقط", "قضاء 3 ساعات في الرسم"] },
          { questionText: "أين يجب أن تضع موضوعك الرئيسي لتكوين سينمائي؟", options: ["في المنتصف تمامًا", "خارج اللوحة", "عند تقاطعات الشبكة", "دائمًا في الزاوية السفلية"] },
          { questionText: "هل المنتصف تمامًا هو دائمًا أفضل مكان للشخصية؟", options: ["نعم", "لا، قاعدة الأثلاث عادةً أفضل", "دائمًا", "أيام الإثنين فقط"] },
          { questionText: "ما هو التصيير (Rendering)؟", options: ["إضافة الضوء والظل ليبدو ثلاثي الأبعاد", "مسح الرسم", "إضافة توقيع", "حفظ الملف"] },
          { questionText: "الجزء من الجسم المواجه للشمس يحصل على:", options: ["ظل", "إضاءة ساطعة (Highlight)", "مخطط خارجي", "توقيع"] },
          { questionText: "الجزء المعاكس للضوء يحصل على:", options: ["إضاءة ساطعة (Highlight)", "ظل", "لون زاهٍ", "بقعة بيضاء"] },
          { questionText: "عند رسم شخصية، ماذا يجب أن ترسم أولًا؟", options: ["عيون مفصّلة", "أشكال ثلاثية الأبعاد أساسية مثل الكرات والأسطوانات", "الخلفية", "الشعر"] },
          { questionText: "ماذا تعني 'القيمة' (Value) في نظرية الألوان؟", options: ["كم تكلّف اللوحة", "مدى فتح أو غمق اللون", "كم لونًا تستخدم", "حجم الفرشاة"] },
          { questionText: "أين يحدث 'الانسداد المحيط' (Ambient Occlusion)؟", options: ["في ضوء الشمس المباشر", "في الشقوق العميقة حيث لا يصل الضوء", "في السماء", "على الإضاءة الساطعة"] }
        ]
      }
    }
  }
};
