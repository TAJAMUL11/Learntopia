import math from "../assets/CourseImg/math-2.png";
import paint from "../assets/CourseImg/paint.png";
import finance from "../assets/CourseImg/finance-3.png";
import Dmarket from "../assets/CourseImg/Dmarket.png";
import coding from "../assets/CourseImg/coding.png";
import python from "../assets/CourseImg/python.png";

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
    duration: "4 hours",
    difficulty: "Beginner",
    prerequisites: ["A computer with internet access", "Basic typing skills"],
    learningObjectives: [
      "Understand core programming concepts",
      "Write scripts using Python syntax",
      "Use loops, variables, and logic",
      "Build a fully playable text-based game"
    ],
    aiTutor: {
      name: "Robo-Py",
      role: "AI Coding Buddy",
      avatar: one
    },
    syllabus: [
      {
        title: "Module 1: Hello Python!",
        desc: "Learn what Python is and write your first lines of code.",
        contentSections: [
          {
            type: "concept",
            title: "What is Python?",
            content: "Python is a super smart computer language. Imagine you have a robot friend but it only speaks one language: Python! If you want the robot to do something cool, you just have to learn its language. The best part? Python is designed to be super easy for humans to read."
          },
          {
            type: "fact",
            title: "Fun Fact!",
            content: "Python wasn't named after the snake! It was named after a funny British comedy show called 'Monty Python's Flying Circus'."
          },
          {
            type: "concept",
            title: "Your First Command",
            content: "To make our computer talk, we use the `print()` command. If you type `print('Hello World!')`, the computer will show the words 'Hello World!' on the screen. It's like magic!"
          }
        ],
        exercises: [
          {
            question: "What is Python?",
            options: ["A type of snake", "A computer language", "A video game", "A web browser"],
            answer: "A computer language"
          },
          {
            question: "Which command makes the computer display text?",
            options: ["show()", "speak()", "print()", "display()"],
            answer: "print()"
          },
          {
            question: "Python is known for being...",
            options: ["Super hard to read", "Only for scientists", "Easy to read for humans", "Only for calculators"],
            answer: "Easy to read for humans"
          }
        ]
      },
      {
        title: "Module 2: Variables & Data Types",
        desc: "Store numbers and text in memory.",
        contentSections: [
          {
            type: "concept",
            title: "What is a Variable?",
            content: "Think of a variable as a labeled box where you can keep things. If you have a box labeled 'Score' and you put the number 10 inside it, your variable `score` is now equal to 10!"
          },
          {
            type: "concept",
            title: "Different Types of Stuff",
            content: "Computers need to know what kind of stuff is in the box. A whole number like 5 is an 'Integer'. Words like 'Hello' are called 'Strings'. We can even do math with variables, like `score = 5 + 5`!"
          }
        ],
        exercises: [
          {
            question: "What is a variable?",
            options: ["A labeled box for storing data", "A type of error", "A math problem", "A printer"],
            answer: "A labeled box for storing data"
          },
          {
            question: "What do we call text like 'Hello' in programming?",
            options: ["Integer", "String", "Number", "Robot Text"],
            answer: "String"
          },
          {
            question: "If score = 4 + 6, what is inside the score variable?",
            options: ["46", "4 + 6", "10", "Error"],
            answer: "10"
          }
        ]
      },
      {
        title: "Module 3: If-Statements & Logic",
        desc: "Make your code smart with decisions.",
        contentSections: [
          {
            type: "concept",
            title: "Making Choices",
            content: "Computers aren't naturally smart; they only do exactly what you tell them! We use 'if statements' to give them a brain. For example: `if score > 10:` then print 'You Win!'."
          },
          {
            type: "fact",
            title: "Did You Know?",
            content: "Video games use millions of 'if statements'. If Mario hits a Goomba, he loses a life. If he grabs a mushroom, he grows big!"
          }
        ],
        exercises: [
          {
            question: "What do 'if statements' allow a program to do?",
            options: ["Crash", "Make decisions", "Print text", "Store variables"],
            answer: "Make decisions"
          },
          {
            question: "In code, what does the '>' symbol mean?",
            options: ["Equal to", "Less than", "Greater than", "Plus"],
            answer: "Greater than"
          },
          {
            question: "Which of these is a correct if statement?",
            options: ["if score is 10 then win", "if score > 10:", "score if 10", "if (10) score"],
            answer: "if score > 10:"
          }
        ]
      },
      {
        title: "Module 4: Build a Guessing Game",
        desc: "Combine everything to build your first game.",
        contentSections: [
          {
            type: "concept",
            title: "Putting it all together",
            content: "Now we will use loops and variables to build a game. The computer will pick a secret number, and you will use the `input()` command to guess it. If you guess too high, it will say 'Too High!'."
          },
          {
            type: "concept",
            title: "Loops",
            content: "A loop lets us run the same code over and over until you guess the right answer. Without a loop, you'd only get one try!"
          }
        ],
        exercises: [
          {
            question: "Which command lets the user type in an answer?",
            options: ["print()", "type()", "input()", "read()"],
            answer: "input()"
          },
          {
            question: "Why do we use a loop in our game?",
            options: ["To make it colorful", "To let the player guess multiple times", "To stop the game", "To make it harder"],
            answer: "To let the player guess multiple times"
          },
          {
            question: "If the secret is 5 and the player guesses 8, what should the if-statement do?",
            options: ["Say 'Too Low!'", "Say 'Too High!'", "Say 'You Win!'", "Crash"],
            answer: "Say 'Too High!'"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    category: "Mathematics",
    title: "Math Magic: Puzzles & Logic",
    rating: "4.8",
    image: math,
    students: "950",
    desc: "Develop critical thinking by solving puzzles, identifying patterns, and mastering logic.",
    avatars: [one, two, three],
    duration: "3.5 hours",
    difficulty: "All Levels",
    prerequisites: ["Basic arithmetic"],
    learningObjectives: [
      "Identify numerical patterns",
      "Understand basic geometry",
      "Solve deductive logic puzzles",
      "Apply algorithmic thinking"
    ],
    aiTutor: {
      name: "Count AI-Cula",
      role: "AI Math Genius",
      avatar: two
    },
    syllabus: [
      {
        title: "Module 1: Number Patterns",
        desc: "Discover patterns to predict the future.",
        contentSections: [
          {
            type: "concept",
            title: "The Magic of Sequences",
            content: "Math isn't just about adding big numbers. It's about finding patterns! If you have the sequence 2, 4, 6, 8, you know the next number is 10 because the pattern is 'add 2'. Patterns are everywhere in nature!"
          },
          {
            type: "fact",
            title: "Fibonacci Sequence",
            content: "The Fibonacci sequence (1, 1, 2, 3, 5, 8...) is found in sunflower seeds, pinecones, and even galaxies!"
          }
        ],
        exercises: [
          {
            question: "What is the next number in: 5, 10, 15, 20...?",
            options: ["22", "25", "30", "100"],
            answer: "25"
          },
          {
            question: "What is the next number in: 1, 3, 5, 7...?",
            options: ["8", "9", "10", "11"],
            answer: "9"
          },
          {
            question: "What do we call a list of numbers that follows a rule?",
            options: ["A mess", "A sequence", "A variable", "A loop"],
            answer: "A sequence"
          }
        ]
      },
      {
        title: "Module 2: 2D and 3D Geometry",
        desc: "Explore shapes in the real world.",
        contentSections: [
          {
            type: "concept",
            title: "Flat vs Solid",
            content: "A square is a flat 2D shape. But if you give it depth, it becomes a 3D Cube! Geometry is how architects design buildings and how artists create 3D video games."
          },
          {
            type: "concept",
            title: "Angles",
            content: "A triangle always has 3 sides and 3 angles. The corners of a square are always exactly 90 degrees, called a 'Right Angle'."
          }
        ],
        exercises: [
          {
            question: "How many sides does a hexagon have?",
            options: ["4", "5", "6", "8"],
            answer: "6"
          },
          {
            question: "What do we call a 3D square?",
            options: ["Sphere", "Cube", "Pyramid", "Cylinder"],
            answer: "Cube"
          },
          {
            question: "What type of angle is exactly 90 degrees?",
            options: ["Cute Angle", "Right Angle", "Wrong Angle", "Left Angle"],
            answer: "Right Angle"
          }
        ]
      },
      {
        title: "Module 3: Logic Puzzles",
        desc: "Solve mysteries using deduction.",
        contentSections: [
          {
            type: "concept",
            title: "Being a Detective",
            content: "Logic means using clues to find the one true answer. If a toy is NOT in the red box, and it's NOT in the blue box, and there's only a green box left... it MUST be in the green box! This is called Deduction."
          }
        ],
        exercises: [
          {
            question: "If A is taller than B, and B is taller than C. Who is the tallest?",
            options: ["A", "B", "C", "They are equal"],
            answer: "A"
          },
          {
            question: "I have 4 legs but cannot walk. What am I?",
            options: ["A dog", "A chair", "A bird", "A snake"],
            answer: "A chair"
          },
          {
            question: "What is deductive reasoning?",
            options: ["Guessing wildly", "Using clues to eliminate wrong answers", "Adding numbers", "Drawing shapes"],
            answer: "Using clues to eliminate wrong answers"
          }
        ]
      },
      {
        title: "Module 4: Algorithms",
        desc: "Learn to solve problems step-by-step.",
        contentSections: [
          {
            type: "concept",
            title: "What is an Algorithm?",
            content: "An algorithm is just a fancy word for a recipe or a set of step-by-step instructions. To make a sandwich, you first get bread, then spread peanut butter, then put bread on top. If you do it out of order, you get a mess!"
          },
          {
            type: "fact",
            title: "Everyday Algorithms",
            content: "Google uses algorithms to find websites, and YouTube uses them to recommend videos you might like!"
          }
        ],
        exercises: [
          {
            question: "What is an algorithm?",
            options: ["A math error", "A type of dinosaur", "A step-by-step list of instructions", "A 3D shape"],
            answer: "A step-by-step list of instructions"
          },
          {
            question: "Why does the order of steps matter in an algorithm?",
            options: ["It doesn't", "So the computer doesn't get confused and fail", "Because it looks pretty", "To save electricity"],
            answer: "So the computer doesn't get confused and fail"
          },
          {
            question: "What is the best way to solve a massive, hard problem?",
            options: ["Cry", "Break it down into tiny, easy steps", "Guess", "Give up"],
            answer: "Break it down into tiny, easy steps"
          }
        ]
      }
    ]
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
    duration: "5 hours",
    difficulty: "Beginner",
    prerequisites: ["Basic math skills (percentages, addition)"],
    learningObjectives: [
      "Understand the history of money",
      "Create a personal budget",
      "Grasp compound interest",
      "Learn the basics of investing"
    ],
    aiTutor: {
      name: "Penny Bot",
      role: "AI Financial Advisor",
      avatar: three
    },
    syllabus: [
      {
        title: "Module 1: What is Money?",
        desc: "Learn why money was invented.",
        contentSections: [
          {
            type: "concept",
            title: "Before Money",
            content: "A long time ago, people traded items directly. 'I'll give you a chicken for that sword!' This was called bartering. But what if the person with the sword doesn't want a chicken? That's why money was invented—it's something everyone agrees is valuable!"
          }
        ],
        exercises: [
          {
            question: "What is bartering?",
            options: ["Using credit cards", "Trading goods directly", "Investing in stocks", "Saving in a bank"],
            answer: "Trading goods directly"
          },
          {
            question: "Why was money invented?",
            options: ["Because coins are shiny", "To make trading easier", "To make wallets heavy", "Because chickens ran away"],
            answer: "To make trading easier"
          },
          {
            question: "Money only works if...",
            options: ["It's made of gold", "It's printed on green paper", "Everyone agrees it has value", "It has a president's face"],
            answer: "Everyone agrees it has value"
          }
        ]
      },
      {
        title: "Module 2: Budgets",
        desc: "Tell your money where to go.",
        contentSections: [
          {
            type: "concept",
            title: "Income and Expenses",
            content: "Income is money coming IN (like allowance). Expenses are money going OUT (buying toys). A budget is a plan that makes sure your Expenses are never higher than your Income!"
          },
          {
            type: "fact",
            title: "The Golden Rule",
            content: "The golden rule of building wealth is: Always spend less than you earn."
          }
        ],
        exercises: [
          {
            question: "Money that comes IN to your pocket is called:",
            options: ["Expense", "Income", "Tax", "Debt"],
            answer: "Income"
          },
          {
            question: "Money that goes OUT (when you buy something) is called:",
            options: ["Expense", "Income", "Profit", "Dividend"],
            answer: "Expense"
          },
          {
            question: "A good budget ensures that...",
            options: ["You spend everything", "Your expenses are higher than income", "Your expenses are lower than income", "You buy toys every day"],
            answer: "Your expenses are lower than income"
          }
        ]
      },
      {
        title: "Module 3: Compound Interest",
        desc: "The magic of growing money.",
        contentSections: [
          {
            type: "concept",
            title: "Interest on Interest",
            content: "When you put money in a bank, they pay you 'interest' as a thank you. Compound interest means you earn interest on your original money PLUS on the interest you already earned! Over a long time, it makes your money grow incredibly fast."
          }
        ],
        exercises: [
          {
            question: "When a bank pays you for keeping money with them, it's called:",
            options: ["Taxes", "Interest", "Fines", "Loans"],
            answer: "Interest"
          },
          {
            question: "What is Compound Interest?",
            options: ["Earning interest on interest", "Losing money", "Paying the bank", "Simple interest"],
            answer: "Earning interest on interest"
          },
          {
            question: "Compound interest works best when you...",
            options: ["Take your money out immediately", "Leave your money in the bank for a long time", "Spend it all", "Hide it under a bed"],
            answer: "Leave your money in the bank for a long time"
          }
        ]
      },
      {
        title: "Module 4: Investing",
        desc: "Making your money work for you.",
        contentSections: [
          {
            type: "concept",
            title: "Stocks and Shares",
            content: "Investing means buying something that you hope will become more valuable over time. When you buy a 'Stock', you are actually buying a tiny piece of a real company, like Apple or Disney!"
          }
        ],
        exercises: [
          {
            question: "When you buy a stock, what are you buying?",
            options: ["A piece of paper", "A tiny slice of a company", "A loan to the government", "A product"],
            answer: "A tiny slice of a company"
          },
          {
            question: "The goal of investing is to...",
            options: ["Make your money grow", "Lose money", "Keep it exactly the same", "Pay taxes"],
            answer: "Make your money grow"
          },
          {
            question: "Is investing risky?",
            options: ["No, it's guaranteed", "Yes, companies can lose value", "Only for old people", "No, you always win"],
            answer: "Yes, companies can lose value"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    category: "Marketing",
    title: "Future Creators: Digital Marketing",
    rating: "4.7",
    image: Dmarket,
    students: "620",
    desc: "Master branding, storytelling, content creation, and online safety.",
    avatars: [one, two, three],
    duration: "4.5 hours",
    difficulty: "Intermediate",
    prerequisites: ["Familiarity with social media"],
    learningObjectives: [
      "Build a strong brand identity",
      "Structure compelling narratives",
      "Understand digital citizenship",
      "Design a mock campaign"
    ],
    aiTutor: {
      name: "Viral AI",
      role: "AI Marketing Strategist",
      avatar: four
    },
    syllabus: [
      {
        title: "Module 1: Branding",
        desc: "Learn how companies create recognizable identities.",
        contentSections: [
          {
            type: "concept",
            title: "More than a logo",
            content: "A brand is how people FEEL when they think about a company. McDonald's uses red and yellow to make you feel happy and hungry. Apple uses clean white to feel modern and premium. Colors matter!"
          }
        ],
        exercises: [
          {
            question: "What is a brand?",
            options: ["Just a logo", "The feeling and reputation of a company", "The building they work in", "The CEO's name"],
            answer: "The feeling and reputation of a company"
          },
          {
            question: "Why do companies use specific colors?",
            options: ["Because they are cheap", "To trigger specific emotions (like trust or hunger)", "Because it's random", "To hide dirt"],
            answer: "To trigger specific emotions (like trust or hunger)"
          },
          {
            question: "Which of these is part of a brand's identity?",
            options: ["Logos, colors, and fonts", "Employee salaries", "The office chairs", "Tax returns"],
            answer: "Logos, colors, and fonts"
          }
        ]
      },
      {
        title: "Module 2: Storytelling",
        desc: "Hook your audience with great stories.",
        contentSections: [
          {
            type: "concept",
            title: "The Hero's Journey",
            content: "People love stories! In marketing, the Customer should always be the Hero, and the Product should be their Guide. If you are selling running shoes, don't just talk about the rubber... tell a story about a hero running their first marathon!"
          }
        ],
        exercises: [
          {
            question: "In marketing, who should be the Hero of the story?",
            options: ["The CEO", "The Product", "The Customer", "The Competitor"],
            answer: "The Customer"
          },
          {
            question: "Why do we use storytelling in marketing?",
            options: ["To put people to sleep", "To build an emotional connection", "To fill up space", "To confuse people"],
            answer: "To build an emotional connection"
          },
          {
            question: "A good story needs to hook the viewer in the first...",
            options: ["3 seconds", "3 minutes", "1 hour", "3 days"],
            answer: "3 seconds"
          }
        ]
      },
      {
        title: "Module 3: Online Safety",
        desc: "Protect your digital footprint.",
        contentSections: [
          {
            type: "concept",
            title: "The Permanent Ink",
            content: "The internet is written in permanent ink. Your 'Digital Footprint' is the trail of everything you post. You should never share PII (Personally Identifiable Information) like your home address or school."
          }
        ],
        exercises: [
          {
            question: "What is your Digital Footprint?",
            options: ["Your shoe size", "The trail of data you leave online", "Your printer ink", "Your computer screen"],
            answer: "The trail of data you leave online"
          },
          {
            question: "Which of the following is PII and should NEVER be shared?",
            options: ["Your favorite movie", "Your home address", "A drawing", "A game review"],
            answer: "Your home address"
          },
          {
            question: "Can things easily be deleted forever from the internet?",
            options: ["Yes, instantly", "No, people can screenshot and save them", "Yes, by asking nicely", "Yes, if you turn off the computer"],
            answer: "No, people can screenshot and save them"
          }
        ]
      },
      {
        title: "Module 4: The Campaign",
        desc: "Launch your big idea.",
        contentSections: [
          {
            type: "concept",
            title: "Call to Action",
            content: "A marketing campaign always ends with a CTA (Call To Action). It's a clear instruction telling the audience what to do next, like 'Click Here to Subscribe!' or 'Buy Now!'."
          }
        ],
        exercises: [
          {
            question: "What does CTA stand for?",
            options: ["Call To Action", "Center Text Alignment", "Cost To Advertise", "Click To Add"],
            answer: "Call To Action"
          },
          {
            question: "What is an example of a CTA?",
            options: ["'We sell shoes.'", "'Subscribe for more videos!'", "'Apples are red.'", "'Hello.'"],
            answer: "'Subscribe for more videos!'"
          },
          {
            question: "Before launching a campaign, you need to know your...",
            options: ["Favorite color", "Target Audience", "Shoe size", "Lunch order"],
            answer: "Target Audience"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    category: "Science",
    title: "Web Wonders: HTML & CSS",
    rating: "4.9",
    image: coding,
    students: "1,400",
    desc: "Master the core markup and styling languages that power the internet.",
    avatars: [one, two, three],
    duration: "6 hours",
    difficulty: "Beginner",
    prerequisites: ["A computer with a web browser"],
    learningObjectives: [
      "Write semantic HTML5 markup",
      "Style pages with modern CSS",
      "Understand the CSS Box Model",
      "Deploy your website"
    ],
    aiTutor: {
      name: "WebWeaver",
      role: "AI Frontend Master",
      avatar: one
    },
    syllabus: [
      {
        title: "Module 1: HTML Structure",
        desc: "The skeleton of the web.",
        contentSections: [
          {
            type: "concept",
            title: "Tags and Elements",
            content: "HTML uses 'tags' wrapped in angle brackets to build the structure of a webpage. The `<h1>` tag makes a big heading, and the `<p>` tag makes a paragraph. It's like stacking building blocks!"
          }
        ],
        exercises: [
          {
            question: "What does HTML provide for a webpage?",
            options: ["Colors", "Animations", "The raw structure (skeleton)", "The database"],
            answer: "The raw structure (skeleton)"
          },
          {
            question: "Which tag is used for the biggest heading?",
            options: ["<p>", "<h1>", "<h6>", "<div>"],
            answer: "<h1>"
          },
          {
            question: "Which tag is used for a paragraph of text?",
            options: ["<text>", "<p>", "<para>", "<h>"],
            answer: "<p>"
          }
        ]
      },
      {
        title: "Module 2: CSS Styling",
        desc: "Make it look beautiful.",
        contentSections: [
          {
            type: "concept",
            title: "The Paint on the Walls",
            content: "If HTML is the skeleton, CSS is the skin and clothes. CSS lets you change colors, fonts, and sizes. You select an HTML element in CSS and give it rules, like `color: red;`."
          }
        ],
        exercises: [
          {
            question: "What does CSS do?",
            options: ["Builds the structure", "Styles the webpage with colors and layouts", "Stores passwords", "Runs the server"],
            answer: "Styles the webpage with colors and layouts"
          },
          {
            question: "How would you make text red in CSS?",
            options: ["text: red;", "color: red;", "font-color: red;", "make-red;"],
            answer: "color: red;"
          },
          {
            question: "Can CSS change the font of your text?",
            options: ["Yes", "No", "Only on Tuesdays", "Only if it's blue"],
            answer: "Yes"
          }
        ]
      },
      {
        title: "Module 3: Box Model",
        desc: "Spacing things out.",
        contentSections: [
          {
            type: "concept",
            title: "Everything is a Box",
            content: "On a webpage, every single element is a rectangular box. The Box Model has Margin (space outside), Border (the outline), Padding (space inside), and Content (the actual text or image)."
          },
          {
            type: "fact",
            title: "Margin vs Padding",
            content: "Margin pushes OTHER things away. Padding pushes things INSIDE away from the border!"
          }
        ],
        exercises: [
          {
            question: "In the CSS Box model, what is the space INSIDE the border called?",
            options: ["Margin", "Padding", "Content", "Outline"],
            answer: "Padding"
          },
          {
            question: "What is the space OUTSIDE the border called?",
            options: ["Margin", "Padding", "Content", "Outline"],
            answer: "Margin"
          },
          {
            question: "Are circular images actually boxes in CSS?",
            options: ["Yes, everything is a box", "No, circles are circles", "No, they are triangles", "Only if they are red"],
            answer: "Yes, everything is a box"
          }
        ]
      },
      {
        title: "Module 4: Deployment",
        desc: "Put it on the internet.",
        contentSections: [
          {
            type: "concept",
            title: "Servers and URLs",
            content: "To show your website to the world, you must 'Deploy' it to a Server. A server is just a powerful computer that stays on 24/7. Once deployed, you get a URL (like google.com) so anyone can visit!"
          }
        ],
        exercises: [
          {
            question: "What is a server?",
            options: ["A waiter", "A computer that stays online to host your files", "A type of CSS", "A broken computer"],
            answer: "A computer that stays online to host your files"
          },
          {
            question: "What do you get so people can visit your site?",
            options: ["A URL", "A USB drive", "A password", "A book"],
            answer: "A URL"
          },
          {
            question: "What does 'Deploying' mean?",
            options: ["Deleting your code", "Putting your code on a live server for the world to see", "Writing HTML", "Playing a game"],
            answer: "Putting your code on a live server for the world to see"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    category: "Arts",
    title: "Digital Art: Draw on Your Screen",
    rating: "4.6",
    image: paint,
    students: "1,100",
    desc: "Unleash your creativity with digital art techniques.",
    avatars: [one, two, three, four],
    duration: "4 hours",
    difficulty: "All Levels",
    prerequisites: ["A digital drawing tablet"],
    learningObjectives: [
      "Navigate digital canvas software",
      "Apply advanced color theory",
      "Structure dynamic character poses",
      "Render and polish illustrations"
    ],
    aiTutor: {
      name: "Pixel Bot",
      role: "AI Concept Artist",
      avatar: two
    },
    syllabus: [
      {
        title: "Module 1: Layers",
        desc: "The magic of digital art.",
        contentSections: [
          {
            type: "concept",
            title: "Non-Destructive Drawing",
            content: "In digital art, you use Layers. Layers are like clear sheets of glass stacked on top of each other. You can draw your sketch on Layer 1, and color on Layer 2. If you mess up the color, your sketch is still perfectly safe!"
          }
        ],
        exercises: [
          {
            question: "What are layers in digital art similar to?",
            options: ["Heavy rocks", "Clear sheets of glass stacked on each other", "A single piece of paper", "A paintbrush"],
            answer: "Clear sheets of glass stacked on each other"
          },
          {
            question: "Why do artists use layers?",
            options: ["To make the file heavy", "To color without ruining the sketch (non-destructive)", "To break the computer", "To draw slower"],
            answer: "To color without ruining the sketch (non-destructive)"
          },
          {
            question: "If you erase on Layer 2, does it erase Layer 1?",
            options: ["Yes", "No", "Only if it's red", "Always"],
            answer: "No"
          }
        ]
      },
      {
        title: "Module 2: Color Theory",
        desc: "Picking the perfect palette.",
        contentSections: [
          {
            type: "concept",
            title: "The Color Wheel",
            content: "Colors opposite each other on the color wheel (like Blue and Orange) are called 'Complementary'. They create maximum contrast and look super exciting when placed next to each other!"
          }
        ],
        exercises: [
          {
            question: "Colors opposite each other on the wheel are called:",
            options: ["Analogous", "Complementary", "Primary", "Boring"],
            answer: "Complementary"
          },
          {
            question: "What is an example of complementary colors?",
            options: ["Red and Pink", "Blue and Orange", "Green and Green", "Black and White"],
            answer: "Blue and Orange"
          },
          {
            question: "What do complementary colors create?",
            options: ["Boredom", "Maximum contrast and excitement", "A gray mess", "Invisibility"],
            answer: "Maximum contrast and excitement"
          }
        ]
      },
      {
        title: "Module 3: Composition",
        desc: "Placing things perfectly.",
        contentSections: [
          {
            type: "concept",
            title: "Rule of Thirds",
            content: "Don't put your main character dead in the center! The 'Rule of Thirds' says you should divide your canvas into a 3x3 grid and place your subject on one of the intersections. It looks much more natural and cinematic."
          }
        ],
        exercises: [
          {
            question: "What is the Rule of Thirds?",
            options: ["Dividing the canvas into a 3x3 grid", "Drawing 3 circles", "Using only 3 colors", "Taking 3 hours to draw"],
            answer: "Dividing the canvas into a 3x3 grid"
          },
          {
            question: "Where should you place your main subject for cinematic composition?",
            options: ["Dead center", "Off the canvas", "At the grid intersections", "In the bottom corner always"],
            answer: "At the grid intersections"
          },
          {
            question: "Is dead-center always the best place for a character?",
            options: ["Yes", "No, Rule of Thirds is usually better", "Always", "Only on Mondays"],
            answer: "No, Rule of Thirds is usually better"
          }
        ]
      },
      {
        title: "Module 4: Rendering",
        desc: "Making it look 3D.",
        contentSections: [
          {
            type: "concept",
            title: "Light and Shadow",
            content: "Rendering is when you add light and shadow to make a flat drawing look 3D. The part facing the sun gets a 'Highlight', and the part facing away gets a 'Shadow'."
          }
        ],
        exercises: [
          {
            question: "What is rendering?",
            options: ["Adding light and shadow to make it look 3D", "Erasing the drawing", "Adding a signature", "Saving the file"],
            answer: "Adding light and shadow to make it look 3D"
          },
          {
            question: "The part of the object facing the sun gets a:",
            options: ["Shadow", "Highlight", "Outline", "Signature"],
            answer: "Highlight"
          },
          {
            question: "The part facing away from the light gets a:",
            options: ["Highlight", "Shadow", "Bright color", "White spot"],
            answer: "Shadow"
          }
        ]
      }
    ]
  }
];
