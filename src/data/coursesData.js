import math from "../assets/CourseImg/math-2.png";
import paint from "../assets/CourseImg/paint.png";
import finance from "../assets/CourseImg/finance-3.png";
import Dmarket from "../assets/CourseImg/Dmarket.png";
import coding from "../assets/CourseImg/coding.png";
import python from "../assets/CourseImg/Python.png";

import one from "../assets/Icons/one.jpg";
import two from "../assets/Icons/two.jpg";
import three from "../assets/Icons/three.jpg";
import four from "../assets/Icons/four.jpg";

export const COURSES = [
  {
    id: 1,
    category: "Programming",
    title: "Python for Kids: Build Your First Game!",
    rating: "4.9",
    image: python,
    students: "1,200",
    desc: "Learn to code by building real games. Perfect for beginners aged 10-16. Dive into Python fundamentals and game mechanics!",
    avatars: [one, two, three, four],
    syllabus: [
      {
        title: "Module 1: Hello Python!",
        desc: "Learn what Python is, how to set up your environment, and write your very first lines of code.",
        content: "Python is a high-level, interpreted programming language known for its readability and beginner-friendly syntax. It’s used by companies like Google, NASA, and Netflix. In Python, you write instructions that the computer reads top-to-bottom. The most fundamental command is the 'print' statement. For example, 'print(\"Hello World!\")' instructs the computer to display text on the screen. Programming is simply the art of giving clear, step-by-step instructions to a machine to solve a problem or perform a task. In this module, we will explore the Python interpreter, learn about strings (text), and run our first script.",
        exercise: {
          question: "Which Python command is used to display a message on the screen?",
          options: ["show()", "print()", "say()", "display()"],
          answer: "print()",
        },
      },
      {
        title: "Module 2: Variables & Data Types",
        desc: "Store numbers and text, and learn how to make the computer perform mathematical operations.",
        content: "A variable is like a labeled container in the computer's memory where you can store data for later use. For example, 'player_score = 10' stores the integer 10 in a variable named player_score. Python handles different 'Data Types' automatically. You have Integers (whole numbers), Floats (decimals), Strings (text), and Booleans (True/False). You can perform arithmetic directly with variables: 'total = 5 + 3' stores 8. Understanding how to store and manipulate these basic data types is crucial for keeping track of game states, like health points, timers, or player names.",
        exercise: {
          question: "What will be stored in the variable after running: points = 4 + 6 ?",
          options: ["46", "10", "4 + 6", "Nothing"],
          answer: "10",
        },
      },
      {
        title: "Module 3: Logic, If-Statements, & Loops",
        desc: "Teach your program to make dynamic decisions and repeat actions using Control Flow.",
        content: "Control Flow dictates how a program makes choices. An 'if' statement evaluates a condition: 'if score > 10: print(\"You win!\")' only runs the code block if the condition evaluates to True. Conversely, loops allow you to repeat code efficiently without copy-pasting. A 'for' loop iterates over a sequence a specific number of times (e.g., 'for i in range(5):'), while a 'while' loop runs continuously as long as a condition remains true. Mastering loops and conditionals is the secret to building AI behaviors, game loops, and responsive applications.",
        exercise: {
          question: "What control structure do we use to make the computer repeat an action?",
          options: ["A variable", "A loop", "A print statement", "A string"],
          answer: "A loop",
        },
      },
      {
        title: "Module 4: Build a Number Guessing Game",
        desc: "Combine variables, loops, logic, and user input to build an interactive, playable game.",
        content: "It's time to build your first game! We will use the 'random' module to generate a secret number. We will use the 'input()' function to capture the player's guess from the keyboard. We then wrap the logic in a 'while' loop, giving the player multiple chances. If their guess is too high, we print 'Too high!'. If it's too low, we print 'Too low!'. When they match the secret number, we break out of the loop and declare them the winner. This project combines all your previous learning into a real, functional software application.",
        exercise: {
          question: "Which function allows us to read text typed by the player?",
          options: ["read()", "input()", "get()", "type()"],
          answer: "input()",
        },
      },
    ],
  },
  {
    id: 2,
    category: "Mathematics",
    title: "Math Magic: Puzzles & Logic",
    rating: "4.8",
    image: math,
    students: "950",
    desc: "Math isn't just numbers—it's magic! Develop critical thinking by solving puzzles, identifying patterns, and mastering logic.",
    avatars: [one, two, three],
    syllabus: [
      {
        title: "Module 1: Number Sequences & Patterns",
        desc: "Discover mathematical patterns that help you predict the future and solve complex problems quickly.",
        content: "Mathematics is often called the science of patterns. Recognizing sequences allows us to predict the next number without manual counting. Consider the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8... where each number is the sum of the two preceding ones. Such patterns appear everywhere in nature, from the spiral of galaxies to the arrangement of leaves on a stem. By identifying whether a pattern relies on addition, multiplication, or powers, you unlock a mathematical superpower to solve problems exponentially faster.",
        exercise: {
          question: "In the sequence 2, 4, 6, 8, what comes next?",
          options: ["9", "10", "12", "16"],
          answer: "10",
        },
      },
      {
        title: "Module 2: Real-World Geometry",
        desc: "Understand spatial reasoning by exploring 2D shapes, 3D solids, and their properties.",
        content: "Geometry explores the properties of space, shapes, and figures. A triangle has 3 sides and its interior angles always add up to 180 degrees. A square is a regular quadrilateral with 4 equal sides and 90-degree angles. Beyond 2D flat shapes, we have 3D solids like spheres, cubes, and pyramids. Geometry is the foundation of architecture, engineering, and 3D video game design. By learning how to calculate perimeters and areas, you learn how to measure the physical world around you.",
        exercise: {
          question: "How many sides does a hexagon have?",
          options: ["5", "6", "7", "8"],
          answer: "6",
        },
      },
      {
        title: "Module 3: Deductive Logic & Puzzles",
        desc: "Enhance your brain's processing power by solving riddles using strict logical deduction.",
        content: "Logic is the systematic process of valid reasoning. Deductive reasoning involves starting with general premises and narrowing down to a specific conclusion. For example: Premise 1: All birds have feathers. Premise 2: A robin is a bird. Conclusion: A robin has feathers. In logic puzzles, you apply constraints to eliminate impossible scenarios. If a treasure is not in the red box or the blue box, and there are only three boxes, deduction tells us it must be in the green box. Mathematicians use logic to write infallible proofs.",
        exercise: {
          question: "If A is taller than B, and B is taller than C, who is the tallest?",
          options: ["A", "B", "C", "They are the same"],
          answer: "A",
        },
      },
      {
        title: "Module 4: Algorithmic Problem Solving",
        desc: "Learn the universal step-by-step framework to tackle and solve ANY complex problem.",
        content: "An algorithm is simply a step-by-step set of instructions to solve a problem. The ultimate problem-solving framework is: 1) Understand the Problem (What is known? What is unknown?). 2) Formulate a Plan (Have I seen a similar problem? Can I draw a diagram?). 3) Execute the Plan (Perform the calculations). 4) Review and Verify (Does the answer make sense?). Breaking a massive, intimidating problem down into tiny, manageable steps is how software engineers and mathematicians tackle the world's hardest challenges.",
        exercise: {
          question: "What is the most important FIRST step when solving a difficult math word problem?",
          options: ["Guess the answer immediately", "Understand the problem and what is being asked", "Write down random numbers", "Skip it"],
          answer: "Understand the problem and what is being asked",
        },
      },
    ],
  },
  {
    id: 3,
    category: "Finance",
    title: "Money Smart: Kids & Cash",
    rating: "4.9",
    image: finance,
    students: "840",
    desc: "Develop financial literacy early. Learn about budgeting, compound interest, banking, and smart investing.",
    avatars: [one, two, three, four],
    syllabus: [
      {
        title: "Module 1: The Evolution of Money",
        desc: "Learn why money was invented, how currency works, and the concept of value.",
        content: "Before money, humans used 'barter'—trading goods directly, like exchanging wheat for a cow. This was inefficient. Money was invented as a universal 'Medium of Exchange'. It acts as a unit of account and a store of value. Whether it is cowrie shells, gold coins, paper bills, or modern digital cryptocurrency, money only works because a society collectively agrees that it has value. Understanding that money is simply a tool to facilitate trade is the first step in mastering personal finance.",
        exercise: {
          question: "What economic problem did the invention of money solve?",
          options: ["The need for decorations", "The difficulty of direct bartering", "The lack of paper", "The need for heavier pockets"],
          answer: "The difficulty of direct bartering",
        },
      },
      {
        title: "Module 2: Budgeting Fundamentals",
        desc: "Take control of your cash flow. Learn how to track expenses and create a realistic budget.",
        content: "A budget is a strategic plan that tells your money where to go, rather than wondering where it went. It involves balancing your Income (money coming in) with your Expenses (money going out). A popular rule is the 50/30/20 rule: 50% for Needs (food, shelter), 30% for Wants (toys, games), and 20% for Savings. Consistently spending less than you earn is the golden rule of wealth building. Without a budget, it is impossible to save for large, meaningful goals.",
        exercise: {
          question: "In personal finance, what do we call the money you earn or receive?",
          options: ["Expense", "Income", "Debt", "Tax"],
          answer: "Income",
        },
      },
      {
        title: "Module 3: Banking & Compound Interest",
        desc: "Discover how banking works and the magical mathematical phenomenon of compound interest.",
        content: "Banks are financial institutions that safeguard your deposits. Instead of letting your money sit idle, banks lend it out to others and charge them interest. In return, the bank pays you a smaller percentage of interest for keeping your money with them. The real magic is 'Compound Interest'—earning interest on your interest. If you save $100 at 10% interest, next year you have $110. The year after, you earn 10% on $110, so you get $11. Over decades, compounding causes wealth to grow exponentially.",
        exercise: {
          question: "Earning interest not just on your initial deposit, but also on past interest is called:",
          options: ["Simple Interest", "Compound Interest", "Tax Deduction", "Inflation"],
          answer: "Compound Interest",
        },
      },
      {
        title: "Module 4: Principles of Investing",
        desc: "Learn how to put your money to work through stocks, bonds, and assets.",
        content: "Saving protects your money, but investing grows it. When you invest, you buy assets that you believe will increase in value or generate income. Buying a 'Stock' means you own a tiny slice of a real company (like Apple or Disney). If the company does well, your slice becomes more valuable. Buying a 'Bond' means you are lending money to a company or government for a fixed return. Investing involves risk, so smart investors diversify—they don't put all their eggs in one basket.",
        exercise: {
          question: "When you buy a 'Stock', what are you actually buying?",
          options: ["A piece of paper", "A small ownership slice of a company", "A loan to the government", "A physical product"],
          answer: "A small ownership slice of a company",
        },
      },
    ],
  },
  {
    id: 4,
    category: "Marketing",
    title: "Future Creators: Digital Marketing",
    rating: "4.7",
    image: Dmarket,
    students: "620",
    desc: "Master the art of attention. Learn branding, storytelling, content creation, and online safety for future creators.",
    avatars: [one, two, three],
    syllabus: [
      {
        title: "Module 1: Brand Identity & Positioning",
        desc: "Learn how companies create recognizable identities using logos, colors, and psychology.",
        content: "A brand is much more than just a logo; it is the emotional response and reputation a company holds in a consumer's mind. Brand Identity includes visual elements (color palettes, typography) and voice (how the brand speaks). For example, red often conveys excitement or urgency, while blue implies trust and calm. Good positioning answers: 'Why should someone choose my product over the competition?' Consistency across all platforms is what makes a brand instantly recognizable.",
        exercise: {
          question: "Which of the following is considered part of a company's Brand Identity?",
          options: ["Office location", "Employee salaries", "Logos, colors, and tone of voice", "Tax returns"],
          answer: "Logos, colors, and tone of voice",
        },
      },
      {
        title: "Module 2: The Art of Storytelling",
        desc: "Discover how to structure narratives that captivate audiences and drive engagement.",
        content: "Humans are hardwired to respond to stories, not just raw facts. In digital marketing, storytelling is used to build a connection. A great marketing story features a Hero (the customer), a Problem (their pain point), a Guide (your product), and a Resolution (success). Whether you are writing a 15-second TikTok script or a blog post, hooking the audience in the first 3 seconds is crucial. A compelling narrative transforms a casual viewer into a loyal fan.",
        exercise: {
          question: "In marketing storytelling, who should typically be the 'Hero' of the story?",
          options: ["The CEO", "The Customer", "The Product", "The Competitor"],
          answer: "The Customer",
        },
      },
      {
        title: "Module 3: Digital Citizenship & Safety",
        desc: "Navigate the digital landscape responsibly. Learn about privacy, digital footprints, and online ethics.",
        content: "As a creator, sharing your work online is exciting, but safety is paramount. Your 'Digital Footprint' is the permanent trail of data you leave behind on the internet. Once something is posted, it can be screenshotted and shared forever. Never share Personally Identifiable Information (PII) like your home address, phone number, or school location. Furthermore, practice good digital citizenship by respecting copyrights, crediting original artists, and treating others with respect in comment sections.",
        exercise: {
          question: "Which of the following should you NEVER share publicly online?",
          options: ["Your favorite movie", "Your home address (PII)", "A drawing you made", "Your opinion on a game"],
          answer: "Your home address (PII)",
        },
      },
      {
        title: "Module 4: Launching Your Campaign",
        desc: "Design, plan, and execute a mock digital marketing campaign for a product.",
        content: "A marketing campaign is a coordinated series of steps to promote a product. First, you define your Objective (e.g., get 100 new sign-ups). Next, you identify your Target Audience (who exactly are you speaking to?). Then, you choose your Channels (YouTube, Instagram, Email). Finally, you craft the Call To Action (CTA)—a clear instruction telling the audience what to do next, like 'Click here to subscribe!'. Understanding these metrics allows creators to measure the success of their campaigns.",
        exercise: {
          question: "What does 'CTA' stand for in digital marketing?",
          options: ["Cost To Advertise", "Call To Action", "Center Text Alignment", "Click To Add"],
          answer: "Call To Action",
        },
      },
    ],
  },
  {
    id: 5,
    category: "Science",
    title: "Web Wonders: HTML & CSS",
    rating: "4.9",
    image: coding,
    students: "1,400",
    desc: "Become a web developer. Master the core markup and styling languages that power the entire internet.",
    avatars: [one, two, three],
    syllabus: [
      {
        title: "Module 1: The DOM & HTML Structure",
        desc: "Learn how the Document Object Model works and write semantic HTML5 markup.",
        content: "HTML (HyperText Markup Language) provides the raw structure of a webpage. Browsers read HTML to construct the DOM (Document Object Model), a tree-like representation of the page. Semantic HTML involves using tags that convey meaning, like <header>, <article>, and <footer>, rather than just generic <div> tags. This not only makes your code easier for humans to read but is crucial for SEO (Search Engine Optimization) and screen readers used by visually impaired users. Every web journey starts with a solid, semantic skeleton.",
        exercise: {
          question: "Why is using Semantic HTML important?",
          options: ["It makes the code colorful", "It improves SEO and Accessibility", "It makes the website load slower", "It replaces the need for CSS"],
          answer: "It improves SEO and Accessibility",
        },
      },
      {
        title: "Module 2: CSS Selectors & Styling",
        desc: "Master Cascading Style Sheets to inject color, typography, and visual flair into your layouts.",
        content: "If HTML is the skeleton, CSS (Cascading Style Sheets) is the skin and clothing. CSS applies styling rules to HTML elements. You use Selectors to target elements: tag selectors (p), class selectors (.btn), or ID selectors (#header). You can adjust properties like color, background, font-family, and padding. The 'Cascade' means that rules read later in the stylesheet can override earlier ones. With CSS, you can completely transform a boring text document into a stunning, professional user interface.",
        exercise: {
          question: "Which CSS selector targets an element with the class name 'box'?",
          options: ["#box", ".box", "box", "*box"],
          answer: ".box",
        },
      },
      {
        title: "Module 3: The Box Model & Layouts",
        desc: "Understand margins, borders, padding, and how to position elements perfectly on screen.",
        content: "The CSS Box Model is the foundation of all web layouts. Every single element on a webpage is a rectangular box. The box consists of four layers: the Content (the actual text/image), the Padding (space inside the box), the Border (the outline), and the Margin (space outside the box pushing other elements away). Understanding the box model prevents elements from overlapping unpredictably. Modern layouts also utilize Flexbox and CSS Grid to align boxes side-by-side easily.",
        exercise: {
          question: "In the CSS Box Model, what represents the transparent space OUTSIDE the border?",
          options: ["Content", "Padding", "Margin", "Outline"],
          answer: "Margin",
        },
      },
      {
        title: "Module 4: Deployment & Hosting",
        desc: "Take your local code and deploy it to a live web server for the world to see.",
        content: "Writing code on your local computer is great, but to share it, you must Deploy it. Web Hosting involves placing your HTML and CSS files on a server—a powerful computer that is always connected to the internet. Services like Vercel, Netlify, or Firebase Hosting make it incredibly easy to upload your files. Once deployed, the host assigns your site a URL (Uniform Resource Locator). You have now successfully transformed from a consumer of the internet into a creator!",
        exercise: {
          question: "What is a server in the context of web hosting?",
          options: ["A waiter in a restaurant", "A computer always connected to the internet that serves your files", "A type of CSS code", "A local folder"],
          answer: "A computer always connected to the internet that serves your files",
        },
      },
    ],
  },
  {
    id: 6,
    category: "Arts",
    title: "Digital Art: Draw on Your Screen",
    rating: "4.6",
    image: paint,
    students: "1,100",
    desc: "Unleash your creativity. Learn industry-standard digital art techniques, composition, and color theory.",
    avatars: [one, two, three, four],
    syllabus: [
      {
        title: "Module 1: Interface & Layer Management",
        desc: "Familiarize yourself with digital canvases, brush settings, and the power of non-destructive layers.",
        content: "Transitioning from traditional to digital art gives you absolute control. The UI of most art software (like Procreate or Photoshop) revolves around the Canvas, the Tool Palette (brushes, erasers), and the Layer Panel. Layers are transparent sheets stacked on top of each other. Drawing a character's sketch on Layer 1 and coloring on Layer 2 ensures that fixing the color won't erase your perfect sketch lines. This non-destructive workflow is the biggest advantage of digital creation.",
        exercise: {
          question: "What is the main advantage of using Layers in digital art?",
          options: ["It makes the file size smaller", "It allows non-destructive editing (changing one part without ruining another)", "It automatically draws for you", "It makes colors brighter"],
          answer: "It allows non-destructive editing (changing one part without ruining another)",
        },
      },
      {
        title: "Module 2: Advanced Color Theory",
        desc: "Master the color wheel, values, saturation, and how to create emotional lighting.",
        content: "Color isn't just about picking what looks pretty; it's a science. The Color Wheel maps out relationships. Analogous colors (next to each other) create harmony, while Complementary colors (opposites, like Blue and Orange) create striking contrast. 'Value' refers to how light or dark a color is, and 'Saturation' refers to its intensity. By mastering values, you can create the illusion of 3D form and dramatic lighting, manipulating where the viewer's eye is drawn first.",
        exercise: {
          question: "In color theory, what are colors opposite each other on the color wheel called?",
          options: ["Analogous", "Complementary", "Primary", "Monochromatic"],
          answer: "Complementary",
        },
      },
      {
        title: "Module 3: Composition & Anatomy",
        desc: "Learn to structure your artwork with the Rule of Thirds and build dynamic character poses.",
        content: "Composition is the arrangement of elements within an artwork. The 'Rule of Thirds' suggests dividing your canvas into a 3x3 grid and placing focal points at the intersections, which feels naturally pleasing to the human eye. When drawing characters, don't focus on outlines first. Instead, break anatomy down into basic 3D shapes: spheres for the head, cylinders for arms, and blocks for the torso. Establishing a solid structural foundation ensures dynamic and believable poses.",
        exercise: {
          question: "When drawing a character, what should you start with to build a solid foundation?",
          options: ["Detailed eyes and hair", "Basic 3D shapes (spheres, cylinders)", "The background", "Perfect outlines"],
          answer: "Basic 3D shapes (spheres, cylinders)",
        },
      },
      {
        title: "Module 4: Rendering & Final Polish",
        desc: "Bring your artwork to life by adding highlights, shadows, textures, and post-processing effects.",
        content: "Rendering is the final stage where flat shapes become 3D masterpieces. First, determine your light source. Surfaces facing the light get Highlights, while surfaces facing away fall into Shadow. 'Ambient Occlusion' occurs in deep crevices where little light reaches. Finally, you can add texture brushes to simulate materials like metal or fur. A final polish pass might include color balancing or adding a subtle glow. Patience in the rendering phase transforms a good sketch into a professional illustration.",
        exercise: {
          question: "What determines where the highlights and shadows fall on your drawing?",
          options: ["The color palette", "The light source", "The layer order", "The canvas size"],
          answer: "The light source",
        },
      },
    ],
  },
];
