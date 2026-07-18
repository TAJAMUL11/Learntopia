export const quizzes = [
  {
    id: "python",
    title: "Python: Programming for Beginners",
    subject: "IT Software",
    description: "Test your knowledge of basic Python syntax, data types, and core concepts.",
    questions: [
      {
        id: 1,
        questionText: "Who developed the Python programming language?",
        options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Bjarne Stroustrup"],
        correctAnswer: "Guido van Rossum"
      },
      {
        id: 2,
        questionText: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        correctAnswer: "def"
      },
      {
        id: 3,
        questionText: "What is the output of print(type([])) in Python?",
        options: ["<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'array'>"],
        correctAnswer: "<class 'list'>"
      },
      {
        id: 4,
        questionText: "Which of the following is an immutable data type in Python?",
        options: ["list", "dict", "set", "tuple"],
        correctAnswer: "tuple"
      },
      {
        id: 5,
        questionText: "How do you start a single-line comment in Python?",
        options: ["//", "/*", "#", "--"],
        correctAnswer: "#"
      }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Development: Core Concepts",
    subject: "IT Software",
    description: "Verify your understanding of HTML, CSS, React Hooks, and compilation tools.",
    questions: [
      {
        id: 1,
        questionText: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "HyperTabular Markup Language",
          "HyperTech Media Language"
        ],
        correctAnswer: "HyperText Markup Language"
      },
      {
        id: 2,
        questionText: "Which CSS property is used to change the text size of an element?",
        options: ["text-size", "font-size", "font-weight", "size"],
        correctAnswer: "font-size"
      },
      {
        id: 3,
        questionText: "Which React hook is used to perform side effects in functional components?",
        options: ["useState", "useContext", "useEffect", "useMemo"],
        correctAnswer: "useEffect"
      },
      {
        id: 4,
        questionText: "What is the primary purpose of the 'key' prop in React lists?",
        options: [
          "To style the list elements uniquely",
          "To bind event handlers to elements",
          "To help React identify which items have changed, been added, or been removed",
          "To secure the list data from injection"
        ],
        correctAnswer: "To help React identify which items have changed, been added, or been removed"
      },
      {
        id: 5,
        questionText: "Which tool/command is configured in Vite projects to run the local development server?",
        options: ["npm run build", "npm run dev", "npm run start", "npm run serve"],
        correctAnswer: "npm run dev"
      }
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing: Strategy & Analytics",
    subject: "Marketing",
    description: "Assess your marketing knowledge including SEO metrics, PPC campaigns, and conversion funnels.",
    questions: [
      {
        id: 1,
        questionText: "What does SEO stand for?",
        options: [
          "Search Engine Optimization",
          "Social Engagement Optimization",
          "Search Engine Operations",
          "Sales Excellence Organization"
        ],
        correctAnswer: "Search Engine Optimization"
      },
      {
        id: 2,
        questionText: "Which of the following is a key performance indicator (KPI) primarily used in email marketing?",
        options: ["Bounce Rate", "Open Rate", "Cost Per Click", "Impressions"],
        correctAnswer: "Open Rate"
      },
      {
        id: 3,
        questionText: "What does PPC stand for in digital advertising?",
        options: ["Pay-Per-Click", "Price-Per-Campaign", "Post-Purchase-Conversion", "Payment-Protocol-Client"],
        correctAnswer: "Pay-Per-Click"
      },
      {
        id: 4,
        questionText: "Which social media platform is primarily tailored towards business networking and professional B2B marketing?",
        options: ["Instagram", "Pinterest", "LinkedIn", "TikTok"],
        correctAnswer: "LinkedIn"
      },
      {
        id: 5,
        questionText: "What is the primary objective of a landing page in digital marketing?",
        options: [
          "To host the entire company website map",
          "To explain the company's historical background",
          "To convert visitors into leads or customers through a call-to-action",
          "To list all open jobs in the organization"
        ],
        correctAnswer: "To convert visitors into leads or customers through a call-to-action"
      }
    ]
  }
];
