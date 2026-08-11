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
  // ===================================================================
  // SPANISH
  // ===================================================================
  es: {
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
