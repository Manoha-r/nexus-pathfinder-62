import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ExternalLink,
  Lightbulb,
  Target,
  Clock,
  Star,
  Zap,
  Trophy,
  ArrowRight,
  Play,
  GraduationCap
} from "lucide-react";

interface Resource {
  title: string;
  url: string;
  type: "video" | "article" | "course" | "practice";
}

interface SubTopic {
  name: string;
  description: string;
  resources: Resource[];
  tips: string[];
}

interface RoadmapLetter {
  letter: string;
  title: string;
  subtitle: string;
  duration: string;
  topics: SubTopic[];
}

const roadmapAZ: RoadmapLetter[] = [
  {
    letter: "A",
    title: "Absolute Basics",
    subtitle: "Start your journey with the fundamentals",
    duration: "1 Week",
    topics: [
      {
        name: "What is Programming?",
        description: "Understanding how computers work and what programming means",
        resources: [
          { title: "What is Programming? (CS50)", url: "https://www.youtube.com/watch?v=jjqgP9dpD1k", type: "video" },
          { title: "Introduction to Computer Science", url: "https://www.khanacademy.org/computing/computer-science", type: "course" },
        ],
        tips: ["Don't rush - take your time to understand concepts", "Ask questions - there are no silly questions!"]
      },
      {
        name: "How the Internet Works",
        description: "Learn about browsers, servers, and how websites are displayed",
        resources: [
          { title: "How the Internet Works", url: "https://www.youtube.com/watch?v=zN8YNNHcaZc", type: "video" },
          { title: "MDN: How the Web Works", url: "https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works", type: "article" },
        ],
        tips: ["Draw diagrams to visualize the flow", "Practice explaining to friends"]
      }
    ]
  },
  {
    letter: "B",
    title: "Browser & Basic Tools",
    subtitle: "Set up your development environment",
    duration: "2-3 Days",
    topics: [
      {
        name: "Text Editor Setup",
        description: "Install and configure VS Code - your coding workspace",
        resources: [
          { title: "VS Code Download", url: "https://code.visualstudio.com/", type: "article" },
          { title: "VS Code Tutorial for Beginners", url: "https://www.youtube.com/watch?v=VqCgcpAypFQ", type: "video" },
        ],
        tips: ["Install helpful extensions: Live Server, Prettier, ESLint", "Learn keyboard shortcuts - they save time!"]
      },
      {
        name: "Browser Developer Tools",
        description: "Learn to use Chrome DevTools to inspect and debug",
        resources: [
          { title: "Chrome DevTools Guide", url: "https://developer.chrome.com/docs/devtools/", type: "article" },
          { title: "Inspect Element Tutorial", url: "https://www.youtube.com/watch?v=wcFnnxfA70g", type: "video" },
        ],
        tips: ["Right-click → Inspect is your best friend", "Use Console to test code snippets"]
      }
    ]
  },
  {
    letter: "C",
    title: "Core HTML",
    subtitle: "The skeleton of every website",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "HTML Basics",
        description: "Learn tags, elements, and document structure",
        resources: [
          { title: "freeCodeCamp HTML Course", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "course" },
          { title: "MDN HTML Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML", type: "article" },
        ],
        tips: ["Start with <html>, <head>, <body>", "Practice building simple pages"]
      },
      {
        name: "Semantic HTML",
        description: "Use meaningful tags like <header>, <nav>, <main>, <footer>",
        resources: [
          { title: "HTML5 Semantic Elements", url: "https://www.w3schools.com/html/html5_semantic_elements.asp", type: "article" },
          { title: "Semantic HTML Tutorial", url: "https://www.youtube.com/watch?v=kGW8Al_cga4", type: "video" },
        ],
        tips: ["Semantic HTML improves accessibility and SEO", "Think about page structure before coding"]
      },
      {
        name: "Forms & Inputs",
        description: "Create interactive forms for user input",
        resources: [
          { title: "HTML Forms Guide", url: "https://www.w3schools.com/html/html_forms.asp", type: "article" },
          { title: "Form Validation Basics", url: "https://developer.mozilla.org/en-US/docs/Learn/Forms", type: "article" },
        ],
        tips: ["Always use labels for accessibility", "Validate user input"]
      }
    ]
  },
  {
    letter: "D",
    title: "Design with CSS",
    subtitle: "Make your websites beautiful",
    duration: "2-3 Weeks",
    topics: [
      {
        name: "CSS Fundamentals",
        description: "Colors, fonts, spacing, and basic styling",
        resources: [
          { title: "CSS Basics - MDN", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps", type: "article" },
          { title: "CSS Crash Course", url: "https://www.youtube.com/watch?v=yfoY53QXEnI", type: "video" },
        ],
        tips: ["Start simple - color, font-size, padding, margin", "Use browser DevTools to experiment"]
      },
      {
        name: "Box Model",
        description: "Understand content, padding, border, and margin",
        resources: [
          { title: "The CSS Box Model", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model", type: "article" },
          { title: "Box Model Explained", url: "https://www.youtube.com/watch?v=rIO5326FgPE", type: "video" },
        ],
        tips: ["Every element is a box!", "Use box-sizing: border-box;"]
      },
      {
        name: "Flexbox Layout",
        description: "Create flexible and responsive layouts easily",
        resources: [
          { title: "Flexbox Froggy Game", url: "https://flexboxfroggy.com/", type: "practice" },
          { title: "CSS Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", type: "article" },
        ],
        tips: ["display: flex; is magic!", "Practice with Flexbox Froggy"]
      },
      {
        name: "CSS Grid",
        description: "Master two-dimensional layouts",
        resources: [
          { title: "Grid Garden Game", url: "https://cssgridgarden.com/", type: "practice" },
          { title: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/", type: "article" },
        ],
        tips: ["Grid is perfect for complex layouts", "Combine with Flexbox for best results"]
      }
    ]
  },
  {
    letter: "E",
    title: "Essential JavaScript",
    subtitle: "Add interactivity to your websites",
    duration: "4-6 Weeks",
    topics: [
      {
        name: "Variables & Data Types",
        description: "Store and work with data: strings, numbers, booleans",
        resources: [
          { title: "JavaScript.info - Basics", url: "https://javascript.info/first-steps", type: "article" },
          { title: "JavaScript for Beginners", url: "https://www.youtube.com/watch?v=W6NZfCO5SIk", type: "video" },
        ],
        tips: ["Use let and const, avoid var", "console.log() is your debugging friend"]
      },
      {
        name: "Functions",
        description: "Create reusable blocks of code",
        resources: [
          { title: "JavaScript Functions", url: "https://javascript.info/function-basics", type: "article" },
          { title: "Functions Explained", url: "https://www.youtube.com/watch?v=N8ap4k_1QEQ", type: "video" },
        ],
        tips: ["Start with small, single-purpose functions", "Use descriptive function names"]
      },
      {
        name: "Arrays & Objects",
        description: "Store and organize collections of data",
        resources: [
          { title: "JavaScript Arrays", url: "https://javascript.info/array", type: "article" },
          { title: "Objects in JavaScript", url: "https://javascript.info/object", type: "article" },
        ],
        tips: ["Arrays for lists, Objects for structured data", "Learn array methods: map, filter, reduce"]
      },
      {
        name: "DOM Manipulation",
        description: "Make your pages interactive and dynamic",
        resources: [
          { title: "DOM Manipulation", url: "https://javascript.info/document", type: "article" },
          { title: "DOM Tutorial", url: "https://www.youtube.com/watch?v=0ik6X4DJKCc", type: "video" },
        ],
        tips: ["querySelector and addEventListener are essential", "Practice with small projects"]
      }
    ]
  },
  {
    letter: "F",
    title: "First Projects",
    subtitle: "Apply what you've learned",
    duration: "2-3 Weeks",
    topics: [
      {
        name: "Project 1: Personal Portfolio",
        description: "Build your own portfolio website",
        resources: [
          { title: "Portfolio Website Tutorial", url: "https://www.youtube.com/watch?v=ldwlOzRvYOU", type: "video" },
          { title: "Portfolio Ideas", url: "https://www.freecodecamp.org/news/how-to-build-a-portfolio-website/", type: "article" },
        ],
        tips: ["Keep it simple and clean", "Showcase your best work"]
      },
      {
        name: "Project 2: Calculator",
        description: "Create a functional calculator",
        resources: [
          { title: "JavaScript Calculator", url: "https://www.youtube.com/watch?v=j59qQ7YWLxw", type: "video" },
          { title: "Calculator Project Guide", url: "https://www.freecodecamp.org/news/how-to-build-a-calculator-app/", type: "article" },
        ],
        tips: ["Handle edge cases (division by zero)", "Focus on user experience"]
      },
      {
        name: "Project 3: Todo List",
        description: "Build a task management app",
        resources: [
          { title: "Todo App Tutorial", url: "https://www.youtube.com/watch?v=W7FaYfuwu70", type: "video" },
          { title: "Todo List Guide", url: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning", type: "article" },
        ],
        tips: ["Add, edit, delete, mark complete", "Save to localStorage"]
      }
    ]
  },
  {
    letter: "G",
    title: "Git & GitHub",
    subtitle: "Track changes and collaborate",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "Git Basics",
        description: "Learn version control fundamentals",
        resources: [
          { title: "Git & GitHub Crash Course", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", type: "video" },
          { title: "Git Documentation", url: "https://git-scm.com/doc", type: "article" },
        ],
        tips: ["Commit often with clear messages", "Learn: init, add, commit, push, pull"]
      },
      {
        name: "GitHub Workflow",
        description: "Host your code and contribute to open source",
        resources: [
          { title: "GitHub Skills", url: "https://skills.github.com/", type: "course" },
          { title: "GitHub Quickstart", url: "https://docs.github.com/en/get-started/quickstart", type: "article" },
        ],
        tips: ["Create a strong GitHub profile", "Contribute to open source projects"]
      }
    ]
  },
  {
    letter: "H",
    title: "HTTP & APIs",
    subtitle: "Connect to the world",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "HTTP Fundamentals",
        description: "Understand requests, responses, and status codes",
        resources: [
          { title: "HTTP Explained", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", type: "article" },
          { title: "HTTP Crash Course", url: "https://www.youtube.com/watch?v=iYM2zFP3Zn0", type: "video" },
        ],
        tips: ["Know your status codes: 200, 404, 500", "GET for fetching, POST for sending"]
      },
      {
        name: "Fetch API",
        description: "Make HTTP requests from JavaScript",
        resources: [
          { title: "Fetch API Guide", url: "https://javascript.info/fetch", type: "article" },
          { title: "Async/Await Tutorial", url: "https://www.youtube.com/watch?v=V_Kr9OSfDeU", type: "video" },
        ],
        tips: ["Use async/await for cleaner code", "Always handle errors with try/catch"]
      },
      {
        name: "Working with JSON",
        description: "Parse and work with API data",
        resources: [
          { title: "JSON Tutorial", url: "https://www.w3schools.com/js/js_json_intro.asp", type: "article" },
          { title: "Free APIs for Practice", url: "https://github.com/public-apis/public-apis", type: "article" },
        ],
        tips: ["JSON.parse() and JSON.stringify()", "Practice with free public APIs"]
      }
    ]
  },
  {
    letter: "I",
    title: "Intermediate JavaScript",
    subtitle: "Level up your JS skills",
    duration: "2-3 Weeks",
    topics: [
      {
        name: "ES6+ Features",
        description: "Modern JavaScript syntax and features",
        resources: [
          { title: "ES6 Features", url: "https://www.freecodecamp.org/news/javascript-es6-promises-for-beginners-resolve-reject-and-chaining-explained/", type: "article" },
          { title: "ES6 Tutorial", url: "https://www.youtube.com/watch?v=NCwa_xi0Uuc", type: "video" },
        ],
        tips: ["Arrow functions, destructuring, spread operator", "Template literals for cleaner strings"]
      },
      {
        name: "Promises & Async/Await",
        description: "Handle asynchronous operations elegantly",
        resources: [
          { title: "Promises Explained", url: "https://javascript.info/promise-basics", type: "article" },
          { title: "Async JavaScript", url: "https://www.youtube.com/watch?v=PoRJizFvM7s", type: "video" },
        ],
        tips: ["Promises represent future values", "async/await makes code readable"]
      },
      {
        name: "Error Handling",
        description: "Write robust code that handles errors gracefully",
        resources: [
          { title: "Error Handling", url: "https://javascript.info/try-catch", type: "article" },
          { title: "JavaScript Errors", url: "https://www.youtube.com/watch?v=cFTFtuEQ-10", type: "video" },
        ],
        tips: ["Always use try/catch with async code", "Provide helpful error messages"]
      }
    ]
  },
  {
    letter: "J",
    title: "JavaScript Frameworks",
    subtitle: "Build powerful applications",
    duration: "4-6 Weeks",
    topics: [
      {
        name: "React Fundamentals",
        description: "Learn the most popular UI library",
        resources: [
          { title: "React Official Tutorial", url: "https://react.dev/learn", type: "course" },
          { title: "React Crash Course", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8", type: "video" },
        ],
        tips: ["Start with functional components", "Understand props and state"]
      },
      {
        name: "React Hooks",
        description: "useState, useEffect, and custom hooks",
        resources: [
          { title: "React Hooks Guide", url: "https://react.dev/reference/react", type: "article" },
          { title: "Hooks Explained", url: "https://www.youtube.com/watch?v=TNhaISOUy6Q", type: "video" },
        ],
        tips: ["useState for local state", "useEffect for side effects"]
      },
      {
        name: "Component Architecture",
        description: "Build reusable and maintainable components",
        resources: [
          { title: "React Patterns", url: "https://www.patterns.dev/react", type: "article" },
          { title: "Component Design", url: "https://www.youtube.com/watch?v=vPRdY87_SH0", type: "video" },
        ],
        tips: ["Keep components small and focused", "Lift state up when needed"]
      }
    ]
  },
  {
    letter: "K",
    title: "Keeping Code Clean",
    subtitle: "Write professional quality code",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "Clean Code Principles",
        description: "Write readable and maintainable code",
        resources: [
          { title: "Clean Code JavaScript", url: "https://github.com/ryanmcdermott/clean-code-javascript", type: "article" },
          { title: "Code Quality Tips", url: "https://www.youtube.com/watch?v=b9c5GmmS7ks", type: "video" },
        ],
        tips: ["Meaningful variable names", "DRY - Don't Repeat Yourself"]
      },
      {
        name: "Code Formatting",
        description: "Use tools like Prettier and ESLint",
        resources: [
          { title: "Prettier Documentation", url: "https://prettier.io/docs/en/index.html", type: "article" },
          { title: "ESLint Guide", url: "https://eslint.org/docs/user-guide/getting-started", type: "article" },
        ],
        tips: ["Set up formatting on save", "Consistent style across projects"]
      }
    ]
  },
  {
    letter: "L",
    title: "Layout & Responsiveness",
    subtitle: "Design for all screen sizes",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "Responsive Design",
        description: "Make websites work on mobile, tablet, and desktop",
        resources: [
          { title: "Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", type: "course" },
          { title: "Media Queries", url: "https://css-tricks.com/a-complete-guide-to-css-media-queries/", type: "article" },
        ],
        tips: ["Mobile-first approach", "Use relative units (rem, %, vh/vw)"]
      },
      {
        name: "CSS Frameworks",
        description: "Accelerate development with Tailwind CSS",
        resources: [
          { title: "Tailwind CSS", url: "https://tailwindcss.com/docs", type: "article" },
          { title: "Tailwind Tutorial", url: "https://www.youtube.com/watch?v=pfaSUYaSgRo", type: "video" },
        ],
        tips: ["Utility-first approach", "Customize with config file"]
      }
    ]
  },
  {
    letter: "M",
    title: "Modern Development",
    subtitle: "Professional tools and workflows",
    duration: "2 Weeks",
    topics: [
      {
        name: "Package Managers",
        description: "npm and managing dependencies",
        resources: [
          { title: "npm Documentation", url: "https://docs.npmjs.com/", type: "article" },
          { title: "npm Tutorial", url: "https://www.youtube.com/watch?v=2V1UUhBJ62Y", type: "video" },
        ],
        tips: ["npm install, npm start, npm run build", "Check package.json for scripts"]
      },
      {
        name: "Build Tools",
        description: "Vite, bundlers, and module systems",
        resources: [
          { title: "Vite Documentation", url: "https://vitejs.dev/guide/", type: "article" },
          { title: "Why Vite", url: "https://www.youtube.com/watch?v=KCrXgy8qtjM", type: "video" },
        ],
        tips: ["Vite for fast development", "Understand imports and exports"]
      },
      {
        name: "TypeScript Basics",
        description: "Add type safety to JavaScript",
        resources: [
          { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html", type: "article" },
          { title: "TypeScript Crash Course", url: "https://www.youtube.com/watch?v=d56mG7DezGs", type: "video" },
        ],
        tips: ["Types catch bugs early", "Start with basic types, then interfaces"]
      }
    ]
  },
  {
    letter: "N",
    title: "Node.js Basics",
    subtitle: "JavaScript on the server",
    duration: "2-3 Weeks",
    topics: [
      {
        name: "Node.js Fundamentals",
        description: "Run JavaScript outside the browser",
        resources: [
          { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/", type: "article" },
          { title: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4", type: "video" },
        ],
        tips: ["Understand the event loop", "Use built-in modules like fs, path"]
      },
      {
        name: "Express.js",
        description: "Build web servers and APIs",
        resources: [
          { title: "Express Guide", url: "https://expressjs.com/en/guide/routing.html", type: "article" },
          { title: "Express Tutorial", url: "https://www.youtube.com/watch?v=SccSCuHhOw0", type: "video" },
        ],
        tips: ["Routes, middleware, and handlers", "RESTful API design"]
      }
    ]
  },
  {
    letter: "O",
    title: "Online Deployment",
    subtitle: "Put your projects live",
    duration: "1 Week",
    topics: [
      {
        name: "Frontend Deployment",
        description: "Deploy static sites for free",
        resources: [
          { title: "Vercel Guide", url: "https://vercel.com/docs", type: "article" },
          { title: "Netlify Tutorial", url: "https://www.youtube.com/watch?v=sGBdp9r2GSg", type: "video" },
        ],
        tips: ["Connect to GitHub for auto-deploy", "Use custom domains"]
      },
      {
        name: "Backend Deployment",
        description: "Host servers and databases",
        resources: [
          { title: "Railway App", url: "https://railway.app/", type: "article" },
          { title: "Deployment Guide", url: "https://www.youtube.com/watch?v=DQk9TqO5ets", type: "video" },
        ],
        tips: ["Environment variables for secrets", "Monitor logs for errors"]
      }
    ]
  },
  {
    letter: "P",
    title: "Practice & Portfolio",
    subtitle: "Build real-world projects",
    duration: "4-6 Weeks",
    topics: [
      {
        name: "Full-Stack Project",
        description: "Build a complete application end-to-end",
        resources: [
          { title: "Project Ideas", url: "https://www.freecodecamp.org/news/full-stack-project-tutorial/", type: "article" },
          { title: "MERN Stack Tutorial", url: "https://www.youtube.com/watch?v=CvCiNeLnZ00", type: "video" },
        ],
        tips: ["Pick a project you're passionate about", "Include authentication and database"]
      },
      {
        name: "Portfolio Enhancement",
        description: "Showcase your work professionally",
        resources: [
          { title: "Portfolio Tips", url: "https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/", type: "article" },
          { title: "Portfolio Examples", url: "https://www.youtube.com/watch?v=oMBXdZzYqEk", type: "video" },
        ],
        tips: ["Quality over quantity", "Include live demos and source code"]
      }
    ]
  },
  {
    letter: "Q",
    title: "Quality Assurance",
    subtitle: "Test your code",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "Testing Basics",
        description: "Write tests to ensure code quality",
        resources: [
          { title: "Jest Documentation", url: "https://jestjs.io/docs/getting-started", type: "article" },
          { title: "Testing Tutorial", url: "https://www.youtube.com/watch?v=FgnxcUQ5vho", type: "video" },
        ],
        tips: ["Start with unit tests", "Test critical functionality first"]
      },
      {
        name: "Debugging Skills",
        description: "Find and fix bugs efficiently",
        resources: [
          { title: "Chrome DevTools", url: "https://developer.chrome.com/docs/devtools/javascript/", type: "article" },
          { title: "Debugging Guide", url: "https://www.youtube.com/watch?v=H0XScE08hy8", type: "video" },
        ],
        tips: ["Use breakpoints and console.log", "Read error messages carefully"]
      }
    ]
  },
  {
    letter: "R",
    title: "Real-World Skills",
    subtitle: "Prepare for professional work",
    duration: "2-3 Weeks",
    topics: [
      {
        name: "Agile & Scrum",
        description: "Work in professional development teams",
        resources: [
          { title: "Agile Manifesto", url: "https://agilemanifesto.org/", type: "article" },
          { title: "Scrum Explained", url: "https://www.youtube.com/watch?v=9TycLR0TxFA", type: "video" },
        ],
        tips: ["Sprints, standups, retrospectives", "Focus on delivering value"]
      },
      {
        name: "Code Reviews",
        description: "Give and receive feedback effectively",
        resources: [
          { title: "Code Review Best Practices", url: "https://google.github.io/eng-practices/review/", type: "article" },
          { title: "PR Review Guide", url: "https://www.youtube.com/watch?v=8fx-EaOUK2E", type: "video" },
        ],
        tips: ["Be constructive and kind", "Learn from feedback"]
      }
    ]
  },
  {
    letter: "S",
    title: "State Management",
    subtitle: "Handle complex application data",
    duration: "2 Weeks",
    topics: [
      {
        name: "React Context",
        description: "Share state across components",
        resources: [
          { title: "Context API", url: "https://react.dev/reference/react/useContext", type: "article" },
          { title: "Context Tutorial", url: "https://www.youtube.com/watch?v=35lXWvCuM8o", type: "video" },
        ],
        tips: ["Great for theme, auth, language", "Combine with useReducer for complex state"]
      },
      {
        name: "State Libraries",
        description: "Redux, Zustand, and alternatives",
        resources: [
          { title: "Redux Toolkit", url: "https://redux-toolkit.js.org/", type: "article" },
          { title: "Zustand Guide", url: "https://github.com/pmndrs/zustand", type: "article" },
        ],
        tips: ["Start with Context, add libraries when needed", "Keep state normalized"]
      }
    ]
  },
  {
    letter: "T",
    title: "TypeScript Advanced",
    subtitle: "Master type safety",
    duration: "2 Weeks",
    topics: [
      {
        name: "Advanced Types",
        description: "Generics, unions, and utility types",
        resources: [
          { title: "Advanced Types", url: "https://www.typescriptlang.org/docs/handbook/advanced-types.html", type: "article" },
          { title: "TypeScript Tips", url: "https://www.youtube.com/watch?v=hBk4nV7q6-w", type: "video" },
        ],
        tips: ["Generics for reusable code", "Utility types: Partial, Pick, Omit"]
      },
      {
        name: "TypeScript with React",
        description: "Type your React applications",
        resources: [
          { title: "React TypeScript Cheatsheet", url: "https://react-typescript-cheatsheet.netlify.app/", type: "article" },
          { title: "TS React Tutorial", url: "https://www.youtube.com/watch?v=TPACABQTHvM", type: "video" },
        ],
        tips: ["Type props and state", "Use FC type or explicit return types"]
      }
    ]
  },
  {
    letter: "U",
    title: "UI/UX Fundamentals",
    subtitle: "Design user-friendly interfaces",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "Design Principles",
        description: "Create visually appealing interfaces",
        resources: [
          { title: "Design for Developers", url: "https://www.freecodecamp.org/news/learn-ui-design-fundamentals-with-this-free-one-hour-course/", type: "course" },
          { title: "UI Design Tips", url: "https://www.youtube.com/watch?v=_Hp_dI0DzY4", type: "video" },
        ],
        tips: ["Consistency is key", "White space is your friend"]
      },
      {
        name: "Accessibility (a11y)",
        description: "Make websites usable for everyone",
        resources: [
          { title: "Web Accessibility", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/", type: "article" },
          { title: "A11y Guide", url: "https://www.youtube.com/watch?v=1A6SrPwmGpg", type: "video" },
        ],
        tips: ["Use semantic HTML", "Test with keyboard navigation"]
      }
    ]
  },
  {
    letter: "V",
    title: "Version Control Advanced",
    subtitle: "Master Git workflows",
    duration: "1 Week",
    topics: [
      {
        name: "Branching Strategies",
        description: "Git Flow and feature branches",
        resources: [
          { title: "Git Branching", url: "https://learngitbranching.js.org/", type: "practice" },
          { title: "Git Flow Tutorial", url: "https://www.youtube.com/watch?v=1SXpE08hvGs", type: "video" },
        ],
        tips: ["main/develop/feature branches", "Never commit directly to main"]
      },
      {
        name: "Conflict Resolution",
        description: "Handle merge conflicts confidently",
        resources: [
          { title: "Merge Conflicts", url: "https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts", type: "article" },
          { title: "Conflict Resolution", url: "https://www.youtube.com/watch?v=xNVM5UxlFSA", type: "video" },
        ],
        tips: ["Don't panic!", "Understand both sides before resolving"]
      }
    ]
  },
  {
    letter: "W",
    title: "Web Security",
    subtitle: "Protect your applications",
    duration: "1-2 Weeks",
    topics: [
      {
        name: "Security Fundamentals",
        description: "Common vulnerabilities and prevention",
        resources: [
          { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/", type: "article" },
          { title: "Web Security Basics", url: "https://www.youtube.com/watch?v=b91XVg1LtaI", type: "video" },
        ],
        tips: ["Validate all inputs", "Never trust user data"]
      },
      {
        name: "Authentication",
        description: "Implement secure login systems",
        resources: [
          { title: "JWT Explained", url: "https://jwt.io/introduction", type: "article" },
          { title: "Auth Tutorial", url: "https://www.youtube.com/watch?v=mbsmsi7l3r4", type: "video" },
        ],
        tips: ["Use established auth libraries", "Hash passwords properly"]
      }
    ]
  },
  {
    letter: "X",
    title: "eXtra Skills",
    subtitle: "Stand out from the crowd",
    duration: "Ongoing",
    topics: [
      {
        name: "Soft Skills",
        description: "Communication, teamwork, problem-solving",
        resources: [
          { title: "Developer Soft Skills", url: "https://www.freecodecamp.org/news/important-soft-skills-for-software-developers/", type: "article" },
          { title: "Communication Tips", url: "https://www.youtube.com/watch?v=AzDnC0kz4tY", type: "video" },
        ],
        tips: ["Ask questions effectively", "Document your work"]
      },
      {
        name: "Continuous Learning",
        description: "Stay updated with new technologies",
        resources: [
          { title: "Dev.to Community", url: "https://dev.to/", type: "article" },
          { title: "Tech YouTube Channels", url: "https://www.youtube.com/results?search_query=web+development+tutorials", type: "video" },
        ],
        tips: ["Follow tech blogs and podcasts", "Join developer communities"]
      }
    ]
  },
  {
    letter: "Y",
    title: "Your Career",
    subtitle: "Land your first job",
    duration: "2-4 Weeks",
    topics: [
      {
        name: "Resume & LinkedIn",
        description: "Create a compelling professional profile",
        resources: [
          { title: "Developer Resume Tips", url: "https://www.freecodecamp.org/news/how-to-write-a-developer-resume-recruiters-will-read/", type: "article" },
          { title: "LinkedIn Optimization", url: "https://www.youtube.com/watch?v=Ox_ohqsIMAM", type: "video" },
        ],
        tips: ["Quantify achievements", "Keywords matter for ATS"]
      },
      {
        name: "Interview Preparation",
        description: "Technical and behavioral interview skills",
        resources: [
          { title: "LeetCode", url: "https://leetcode.com/", type: "practice" },
          { title: "Interview Tips", url: "https://www.youtube.com/watch?v=1qw5ITr3k9E", type: "video" },
        ],
        tips: ["Practice coding problems daily", "Prepare STAR stories"]
      },
      {
        name: "Job Search Strategy",
        description: "Find and apply to the right roles",
        resources: [
          { title: "Job Hunting Guide", url: "https://www.freecodecamp.org/news/how-to-get-a-developer-job/", type: "article" },
          { title: "Job Search Tips", url: "https://www.youtube.com/watch?v=2nQ5LB9l8Ys", type: "video" },
        ],
        tips: ["Network actively", "Apply consistently"]
      }
    ]
  },
  {
    letter: "Z",
    title: "Zero to Hero Complete",
    subtitle: "You did it! What's next?",
    duration: "Lifetime",
    topics: [
      {
        name: "Specialization Paths",
        description: "Choose your focus area",
        resources: [
          { title: "Frontend Specialist", url: "https://roadmap.sh/frontend", type: "article" },
          { title: "Backend Specialist", url: "https://roadmap.sh/backend", type: "article" },
        ],
        tips: ["T-shaped skills: broad + deep", "Follow your passion"]
      },
      {
        name: "Give Back",
        description: "Help others on their journey",
        resources: [
          { title: "Open Source Contributing", url: "https://opensource.guide/how-to-contribute/", type: "article" },
          { title: "Start a Blog/Channel", url: "https://www.youtube.com/watch?v=rpg1jOvGCtQ", type: "video" },
        ],
        tips: ["Teaching reinforces learning", "Build community connections"]
      },
      {
        name: "Never Stop Learning",
        description: "Technology evolves, so should you",
        resources: [
          { title: "Developer Roadmaps", url: "https://roadmap.sh/", type: "article" },
          { title: "Stay Updated", url: "https://www.youtube.com/c/Fireship", type: "video" },
        ],
        tips: ["Embrace new technologies", "The journey never ends!"]
      }
    ]
  }
];

const getResourceIcon = (type: string) => {
  switch (type) {
    case "video": return <Play className="h-3 w-3" />;
    case "course": return <GraduationCap className="h-3 w-3" />;
    case "practice": return <Target className="h-3 w-3" />;
    default: return <BookOpen className="h-3 w-3" />;
  }
};

const getResourceColor = (type: string) => {
  switch (type) {
    case "video": return "text-red-400";
    case "course": return "text-purple-400";
    case "practice": return "text-green-400";
    default: return "text-blue-400";
  }
};

const BeginnerRoadmapAZ = () => {
  const [completedLetters, setCompletedLetters] = useState<string[]>([]);
  const [expandedLetters, setExpandedLetters] = useState<string[]>(["A"]);

  const toggleComplete = (letter: string) => {
    setCompletedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  const toggleExpand = (letter: string) => {
    setExpandedLetters((prev) =>
      prev.includes(letter)
        ? prev.filter((l) => l !== letter)
        : [...prev, letter]
    );
  };

  const progress = (completedLetters.length / roadmapAZ.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl p-6 border border-primary/30"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-xl font-bold">A to Z Progress</h3>
              <p className="text-sm text-muted-foreground">Complete all letters to become job-ready!</p>
            </div>
          </div>
          <motion.span
            key={progress}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        
        {/* Letter Progress Bar */}
        <div className="flex gap-1 flex-wrap mb-4">
          {roadmapAZ.map((item, index) => (
            <motion.div
              key={item.letter}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.02, type: "spring", stiffness: 200 }}
              whileHover={{ 
                scale: 1.3, 
                rotate: 10,
                boxShadow: completedLetters.includes(item.letter) 
                  ? "0 0 25px rgba(34, 197, 94, 0.8)" 
                  : "0 0 25px rgba(59, 130, 246, 0.6)"
              }}
              whileTap={{ scale: 0.9 }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all cursor-pointer relative ${
                completedLetters.includes(item.letter)
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/50"
                  : "bg-secondary text-muted-foreground hover:bg-primary/20"
              }`}
              onClick={() => toggleExpand(item.letter)}
            >
              {item.letter}
              {/* Pulse ring for completed */}
              {completedLetters.includes(item.letter) && (
                <motion.div
                  className="absolute inset-0 rounded-lg bg-green-500/30"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="relative w-full bg-secondary rounded-full h-3 overflow-hidden group">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden"
          >
            <motion.div
              animate={{ x: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
          />
        </div>
      </motion.div>

      {/* Roadmap Letters */}
      <div className="relative">
        {/* Animated Vertical Line */}
        <motion.div 
          className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-green-500 rounded-full"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.3 }}
          transition={{ duration: 1 }}
          style={{ originY: 0 }}
        />
        
        {/* Animated pulse on the line */}
        <motion.div
          className="absolute left-5 w-3 h-3 rounded-full bg-primary"
          animate={{ 
            y: [0, 1000],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="space-y-6">
          {roadmapAZ.map((item, index) => {
            const isCompleted = completedLetters.includes(item.letter);
            const isExpanded = expandedLetters.includes(item.letter);

            return (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, x: -50, rotateY: -30 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: index * 0.05, type: "spring" }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
                style={{ perspective: 1000 }}
              >
                {/* Letter Circle with enhanced animations */}
                <motion.button
                  onClick={() => toggleComplete(item.letter)}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.85, rotate: -10 }}
                  className="absolute left-0 top-4 z-10"
                >
                  <motion.div
                    animate={{
                      scale: isCompleted ? [1, 1.15, 1] : 1,
                      boxShadow: isCompleted 
                        ? ["0 0 20px rgba(34, 197, 94, 0.6)", "0 0 40px rgba(34, 197, 94, 0.8)", "0 0 20px rgba(34, 197, 94, 0.6)"]
                        : "0 0 15px rgba(59, 130, 246, 0.4)"
                    }}
                    transition={{ duration: 1.5, repeat: isCompleted ? Infinity : 0 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black relative ${
                      isCompleted
                        ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                        : "bg-gradient-to-br from-primary to-accent text-white"
                    }`}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckCircle2 className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      item.letter
                    )}
                    {/* Rotating ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-dashed border-white/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                </motion.button>

                {/* Connector Line with animation */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                  className="absolute left-12 top-9 w-8 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
                />
                
                {/* Pulse dot on connector */}
                <motion.div
                  className="absolute left-16 top-8 w-2 h-2 rounded-full bg-accent"
                  animate={{ 
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />

                {/* Content Card with enhanced hover */}
                <div className="ml-20">
                  <motion.div
                    whileHover={{ 
                      scale: 1.01,
                      rotateX: 2,
                      rotateY: -2,
                      boxShadow: isCompleted 
                        ? "0 25px 50px -12px rgba(34, 197, 94, 0.25)"
                        : "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className={`overflow-hidden transition-all duration-300 ${
                      isCompleted 
                        ? "bg-green-500/10 border-green-500/30" 
                        : "bg-card/80 backdrop-blur-sm"
                    }`}>
                      {/* Header with hover effect */}
                      <motion.div
                        className="p-5 cursor-pointer relative overflow-hidden group"
                        onClick={() => toggleExpand(item.letter)}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      >
                        {/* Hover shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        
                        <div className="flex items-start justify-between relative z-10">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <motion.span 
                                className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                                whileHover={{ scale: 1.1 }}
                              >
                                {item.letter}
                              </motion.span>
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                              </motion.div>
                              <motion.h3 
                                className="text-2xl font-bold"
                                whileHover={{ x: 5 }}
                                transition={{ type: "spring" }}
                              >
                                {item.title}
                              </motion.h3>
                            </div>
                            <p className="text-muted-foreground mb-3">{item.subtitle}</p>
                            <div className="flex gap-2">
                              <motion.div whileHover={{ scale: 1.1 }}>
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {item.duration}
                                </Badge>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }}>
                                <Badge variant="outline" className="text-xs">
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  {item.topics.length} topics
                                </Badge>
                              </motion.div>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            whileHover={{ scale: 1.2, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                            className="p-2 rounded-lg transition-colors"
                          >
                            <ChevronDown className="h-6 w-6" />
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Expandable Content with enhanced animations */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 space-y-4">
                              {item.topics.map((topic, topicIndex) => (
                                <motion.div
                                  key={topicIndex}
                                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                  transition={{ delay: topicIndex * 0.1, type: "spring" }}
                                  whileHover={{ 
                                    scale: 1.02, 
                                    y: -3,
                                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
                                  }}
                                  className="border border-border/50 rounded-xl p-4 hover:border-primary/50 transition-all bg-background/50 cursor-pointer"
                                >
                                  <div className="flex items-start gap-3 mb-3">
                                    <motion.div 
                                      className="p-2 rounded-lg bg-primary/20"
                                      whileHover={{ rotate: 360, scale: 1.1 }}
                                      transition={{ duration: 0.4 }}
                                    >
                                      <Zap className="h-4 w-4 text-primary" />
                                    </motion.div>
                                    <div>
                                      <motion.h4 
                                        className="font-bold text-lg"
                                        whileHover={{ x: 3 }}
                                      >
                                        {topic.name}
                                      </motion.h4>
                                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                                    </div>
                                  </div>

                                  {/* Resources with enhanced hover */}
                                  <div className="ml-11 space-y-3">
                                    <div className="space-y-2">
                                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</p>
                                      <div className="grid gap-2">
                                        {topic.resources.map((resource, resIndex) => (
                                          <motion.a
                                            key={resIndex}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: resIndex * 0.05 }}
                                            whileHover={{ 
                                              x: 8, 
                                              scale: 1.02,
                                              backgroundColor: "rgba(59, 130, 246, 0.1)"
                                            }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all group"
                                          >
                                            <motion.span 
                                              className={`p-1 rounded ${getResourceColor(resource.type)}`}
                                              whileHover={{ rotate: 20, scale: 1.1 }}
                                            >
                                              {getResourceIcon(resource.type)}
                                            </motion.span>
                                            <span className="text-sm flex-1">{resource.title}</span>
                                            <motion.div
                                              initial={{ opacity: 0, x: -5 }}
                                              whileHover={{ opacity: 1, x: 0 }}
                                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                              <ExternalLink className="h-3 w-3" />
                                            </motion.div>
                                          </motion.a>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Tips with enhanced animations */}
                                    <div className="space-y-2">
                                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                        <motion.div
                                          animate={{ rotate: [0, 10, -10, 0] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                        >
                                          <Lightbulb className="h-3 w-3 text-yellow-500" />
                                        </motion.div>
                                        Pro Tips
                                      </p>
                                      <div className="space-y-1">
                                        {topic.tips.map((tip, tipIndex) => (
                                          <motion.div
                                            key={tipIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: tipIndex * 0.05 }}
                                            whileHover={{ x: 5, scale: 1.01 }}
                                            className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer"
                                          >
                                            <motion.div
                                              whileHover={{ rotate: 360, scale: 1.2 }}
                                              transition={{ duration: 0.3 }}
                                            >
                                              <Star className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                                            </motion.div>
                                            <span>{tip}</span>
                                          </motion.div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BeginnerRoadmapAZ;
