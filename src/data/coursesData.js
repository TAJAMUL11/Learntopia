import math from "../assets/CourseImg/math.png";
import paint from "../assets/CourseImg/paint.png";
import finance from "../assets/CourseImg/finance.png";
import Dmarket from "../assets/CourseImg/Dmarket.png";
import coding from "../assets/CourseImg/coding.png";
import python from "../assets/CourseImg/python.png";

import one from "../assets/Icons/one.jpg";
import two from "../assets/Icons/two.jpg";
import three from "../assets/Icons/three.jpg";
import four from "../assets/Icons/four.jpg";

// Each syllabus module now carries real reading `content` and a single-question
// `exercise`. A module is only completed when its exercise is answered correctly,
// and a course can only be marked complete once every module is done.
export const COURSES = [
  {
    id: 1,
    category: "Programming",
    title: "Python for Kids: Build Your First Game!",
    rating: "4.9",
    image: python,
    students: "1,200",
    desc: "Learn to code by building real games. Perfect for beginners aged 10-16. No experience needed!",
    avatars: [one, two, three, four],
    syllabus: [
      {
        title: "Module 1: Hello Python!",
        desc: "Learn what Python is and write your very first lines of code.",
        content:
          "Python is a programming language — a way of giving instructions to a computer using words that look a bit like English. People use Python to build games, websites, and even robots. The most famous first program is printing a message to the screen. In Python you write it like this: print(\"Hello!\"). The word print tells the computer to show whatever is inside the quotation marks.",
        exercise: {
          question: "Which Python command shows a message on the screen?",
          options: ["show()", "print()", "say()", "display()"],
          answer: "print()",
        },
      },
      {
        title: "Module 2: Variables & Math",
        desc: "Store numbers, text, and make the computer do math for you.",
        content:
          "A variable is like a labelled box where you keep a value so you can use it later. For example, age = 10 puts the number 10 into a box called age. You can do math with variables too: score = 5 + 3 stores 8 in score. Computers are brilliant at math and never make mistakes with it, so variables let you build calculators, scoreboards, and game points.",
        exercise: {
          question: "What is stored in the variable after: points = 4 + 6 ?",
          options: ["46", "10", "4 + 6", "Nothing"],
          answer: "10",
        },
      },
      {
        title: "Module 3: Logic & Loops",
        desc: "Teach the computer how to make decisions and repeat actions.",
        content:
          "Sometimes you want the computer to choose. An if statement runs code only when something is true, like: if score > 10: print(\"You win!\"). Other times you want to repeat something without copying it many times. A loop does that — a for loop can repeat an action 10 times in just two lines. Decisions and loops are what make programs feel smart.",
        exercise: {
          question: "What do we use to make the computer repeat an action?",
          options: ["A variable", "A loop", "A print", "A quote"],
          answer: "A loop",
        },
      },
      {
        title: "Module 4: Build a Guessing Game",
        desc: "Put it all together and build an interactive game to play with friends!",
        content:
          "Now we combine everything. A guessing game picks a secret number, then asks the player to guess. We use input() to read the player's guess, an if statement to check if it is correct, and a loop to keep asking until they get it right. That is variables, logic, and loops working together — a real, playable game built by you!",
        exercise: {
          question: "Which command reads what the player types in?",
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
    desc: "Math isn't just numbers—it's magic! Solve fun puzzles, learn cool tricks, and master logic.",
    avatars: [one, two, three],
    syllabus: [
      {
        title: "Module 1: The Magic of Numbers",
        desc: "Discover cool number patterns that look like magic tricks.",
        content:
          "Numbers hide secret patterns. Even numbers (2, 4, 6, 8) can always be split into two equal groups, while odd numbers (1, 3, 5) always have one left over. Spotting patterns is the first superpower of a mathematician — once you see a pattern, you can predict what comes next without counting everything.",
        exercise: {
          question: "Which of these is an even number?",
          options: ["7", "3", "8", "5"],
          answer: "8",
        },
      },
      {
        title: "Module 2: Geometry in the Wild",
        desc: "Find shapes in nature, architecture, and video games.",
        content:
          "Geometry is the study of shapes. A triangle has 3 sides, a square has 4 equal sides, and a circle has none — it is perfectly round. You can find these shapes everywhere: pizza slices are triangles, windows are squares, and wheels are circles. Learning shapes helps you understand how things are built.",
        exercise: {
          question: "How many sides does a triangle have?",
          options: ["2", "3", "4", "5"],
          answer: "3",
        },
      },
      {
        title: "Module 3: Logic Puzzles",
        desc: "Solve riddles that will bend your brain and make you smarter.",
        content:
          "Logic means thinking in careful steps to reach an answer. In a logic puzzle you use clues to rule things out. For example: if a fruit is red and round and grows on a tree, it is probably an apple. Each clue removes wrong answers until only the right one is left. Good detectives and good mathematicians both use logic.",
        exercise: {
          question: "In logic, what do we use clues to do?",
          options: ["Guess randomly", "Rule out wrong answers", "Skip the question", "Count to ten"],
          answer: "Rule out wrong answers",
        },
      },
      {
        title: "Module 4: Master Problem Solver",
        desc: "Learn the secret steps to solving ANY math problem easily.",
        content:
          "Every hard problem gets easier with a plan. Step 1: read carefully and find what is being asked. Step 2: pick out the important numbers. Step 3: choose the operation (add, subtract, multiply, or divide). Step 4: check your answer makes sense. Breaking a big problem into small steps is the real secret of every math master.",
        exercise: {
          question: "What is the FIRST step to solving a problem?",
          options: ["Guess the answer", "Read carefully and find what's asked", "Write it down neatly", "Ask a friend"],
          answer: "Read carefully and find what's asked",
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
    desc: "Learn how money works, how to save your allowance, and what investing really means.",
    avatars: [one, two, three, four],
    syllabus: [
      {
        title: "Module 1: What is Money?",
        desc: "Learn where money comes from and how people use it every day.",
        content:
          "Money is something everyone agrees has value, so we can trade it for things we need. Long ago people swapped goods directly — a chicken for some bread — but that was tricky. Money makes trading easy: you earn it by doing work, then spend it on food, toys, or games. It is really just a helpful tool for exchange.",
        exercise: {
          question: "Why did people invent money?",
          options: ["To make trading easier", "To decorate homes", "To play games", "To feed animals"],
          answer: "To make trading easier",
        },
      },
      {
        title: "Module 2: Saving & Spending",
        desc: "How to budget your allowance so you can buy the things you really want.",
        content:
          "A budget is a simple plan for your money: some to spend now, and some to save for later. If you want a toy that costs more than this week's allowance, saving a little each week gets you there. The trick is patience — spending everything instantly means you can never afford the bigger things you really want.",
        exercise: {
          question: "What is a budget?",
          options: ["A type of coin", "A plan for your money", "A shop", "A bank robber"],
          answer: "A plan for your money",
        },
      },
      {
        title: "Module 3: What is a Bank?",
        desc: "Learn how banks keep your money safe and even pay you to keep it there!",
        content:
          "A bank is a safe place to keep your money instead of under your bed. Banks protect your cash and keep a record of exactly how much is yours. Amazingly, they can even pay you a little extra, called interest, just for keeping your money with them. That means your money can slowly grow while it sits safely in the bank.",
        exercise: {
          question: "The extra money a bank pays you for saving is called…",
          options: ["A fee", "Interest", "A fine", "Change"],
          answer: "Interest",
        },
      },
      {
        title: "Module 4: The Idea of Investing",
        desc: "A simple, kid-friendly look at how money can grow over time.",
        content:
          "Investing means using your money to try to make more money over time — like planting a seed that grows into a tree. Instead of spending, you put money into something that can grow, and you wait patiently. Investing can grow your money more than saving, but it also has more risk, so smart investors are patient and careful.",
        exercise: {
          question: "Investing is most like…",
          options: ["Spending it all today", "Planting a seed that grows over time", "Hiding money in a sock", "Giving it away"],
          answer: "Planting a seed that grows over time",
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
    desc: "Love making videos or designing? Learn how creators safely share their ideas with the world.",
    avatars: [one, two, three],
    syllabus: [
      {
        title: "Module 1: What is a Brand?",
        desc: "Learn why you recognize your favorite toys, games, and snacks instantly.",
        content:
          "A brand is the personality of a product — its name, logo, colors, and the feeling it gives you. You can spot your favorite snack or game from far away because its brand is consistent everywhere. A strong brand helps people remember and trust something, which is why companies design their logos and colors so carefully.",
        exercise: {
          question: "A logo is part of a company's…",
          options: ["Homework", "Brand", "Lunch", "Password"],
          answer: "Brand",
        },
      },
      {
        title: "Module 2: Telling a Story",
        desc: "How to make a poster or a video that tells a great story.",
        content:
          "The best posters and videos tell a little story: they grab your attention, show why something matters, and end with a clear message. A good story has a beginning, a middle, and an end. When you make something, ask: what do I want people to feel, and what do I want them to do next?",
        exercise: {
          question: "A good story needs a beginning, a middle, and a…",
          options: ["Colour", "End", "Price", "Song"],
          answer: "End",
        },
      },
      {
        title: "Module 3: Safe Sharing",
        desc: "How to safely share ideas online while protecting your privacy.",
        content:
          "Sharing online is fun, but staying safe matters most. Never share private details like your home address, school, or passwords with strangers. A good rule: only post things you would be happy for a teacher or parent to see, and always ask a trusted adult if you are unsure. Being safe online keeps the fun going.",
        exercise: {
          question: "Which of these should you NEVER share with strangers online?",
          options: ["Your favorite color", "Your home address", "A drawing", "A joke"],
          answer: "Your home address",
        },
      },
      {
        title: "Module 4: Your First Campaign",
        desc: "Design a fun campaign for a fake product of your choice!",
        content:
          "A campaign is a plan to tell people about something. It has a goal (what you want to happen), a message (what you want to say), and an audience (who you want to reach). Imagine inventing a new juice: your goal might be to get kids excited, your message 'super fruity and fun', and your audience other kids your age.",
        exercise: {
          question: "Who you want to reach with your message is called the…",
          options: ["Audience", "Budget", "Logo", "Weather"],
          answer: "Audience",
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
    desc: "Learn the languages of the internet. Build and style your very own custom webpage!",
    avatars: [one, two, three],
    syllabus: [
      {
        title: "Module 1: Skeleton of the Web",
        desc: "Learn HTML and build the bones of your first website.",
        content:
          "HTML is the language that builds the structure of every webpage — its skeleton. It uses tags written in angle brackets, like <h1> for a big heading and <p> for a paragraph. Each tag tells the browser what a piece of content is. Just like bones hold up your body, HTML holds up a website.",
        exercise: {
          question: "What does HTML build on a webpage?",
          options: ["The colors", "The structure (skeleton)", "The music", "The internet"],
          answer: "The structure (skeleton)",
        },
      },
      {
        title: "Module 2: Painting with CSS",
        desc: "Add colors, fonts, and backgrounds to make your site pop.",
        content:
          "If HTML is the skeleton, CSS is the paint and clothes. CSS controls how things look: colors, fonts, sizes, and spacing. For example, color: blue makes text blue. With CSS you take a plain page and turn it into something beautiful and colorful, without changing the structure underneath.",
        exercise: {
          question: "What is CSS mainly used for?",
          options: ["Building structure", "Making the page look good (styling)", "Storing data", "Sending email"],
          answer: "Making the page look good (styling)",
        },
      },
      {
        title: "Module 3: Adding Images & Links",
        desc: "Learn how to connect pages together and add cool pictures.",
        content:
          "Websites are connected by links. The <a> tag creates a link you can click to jump to another page. To show a picture, the <img> tag points to an image file. Links and images turn a single boring page into a connected, colorful website you can explore.",
        exercise: {
          question: "Which tag is used to add a clickable link?",
          options: ["<img>", "<a>", "<h1>", "<p>"],
          answer: "<a>",
        },
      },
      {
        title: "Module 4: Publish Your Page",
        desc: "Put everything together into a final project you can show off.",
        content:
          "Publishing means putting your webpage on the internet so others can visit it. You combine your HTML structure and CSS styling into a finished page, then upload it using a hosting service. Once it is live, anyone with the link can see the website you built — your very own corner of the internet!",
        exercise: {
          question: "What does 'publishing' a webpage mean?",
          options: ["Deleting it", "Putting it online for others to see", "Printing it", "Hiding it"],
          answer: "Putting it online for others to see",
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
    desc: "Turn your computer into a canvas! Learn colors, shapes, and digital drawing tools.",
    avatars: [one, two, three, four],
    syllabus: [
      {
        title: "Module 1: The Digital Brush",
        desc: "Learn how to use digital drawing tools and layers.",
        content:
          "Digital art is drawing on a screen with special tools instead of paper. One superpower is layers — like clear sheets stacked on top of each other. You can draw the background on one layer and a character on another, then move or fix one without ruining the rest. Layers make mistakes easy to undo.",
        exercise: {
          question: "What do layers let a digital artist do?",
          options: ["Change one part without ruining the rest", "Print faster", "Save money", "Turn off the screen"],
          answer: "Change one part without ruining the rest",
        },
      },
      {
        title: "Module 2: Color Theory Basics",
        desc: "Discover which colors look great together and why.",
        content:
          "Color theory helps you choose colors that look good together. The three primary colors — red, blue, and yellow — can be mixed to make all other colors. Colors opposite each other on the color wheel, like blue and orange, create exciting contrast. Understanding color makes your art feel balanced and lively.",
        exercise: {
          question: "Which of these is a primary color?",
          options: ["Green", "Purple", "Red", "Pink"],
          answer: "Red",
        },
      },
      {
        title: "Module 3: Drawing Characters",
        desc: "Learn simple shapes to create cool, cartoon-style characters.",
        content:
          "Every character starts with simple shapes. A circle for a head, ovals for a body and arms, and lines for legs. Artists sketch these basic shapes first, then add details like eyes and clothes on top. Starting with shapes makes even tricky characters easy to draw.",
        exercise: {
          question: "What do artists usually start a character with?",
          options: ["Tiny details", "Simple shapes", "The background", "Their name"],
          answer: "Simple shapes",
        },
      },
      {
        title: "Module 4: Your Masterpiece",
        desc: "Create a final digital painting using all the skills you've learned.",
        content:
          "Now you bring it all together: use layers to stay organized, color theory to pick a great palette, and simple shapes to build your subject. Take your time, zoom in for details, and remember that every artist improves with practice. Your finished piece is a masterpiece made with real skills you learned step by step.",
        exercise: {
          question: "Which skills do you combine for your final piece?",
          options: ["Only color", "Layers, color theory, and shapes", "Just shapes", "None"],
          answer: "Layers, color theory, and shapes",
        },
      },
    ],
  },
];
