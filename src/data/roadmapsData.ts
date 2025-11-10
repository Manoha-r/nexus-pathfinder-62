// Comprehensive roadmaps for all roles across branches
export interface Resource {
  title: string;
  url: string;
}

export interface RoadmapItem {
  name: string;
  resources: Resource[];
}

export interface RoadmapStep {
  title: string;
  duration: string;
  items: RoadmapItem[];
}

export interface RoadmapData {
  role: string;
  description: string;
  duration: string;
  difficulty: string;
  steps: RoadmapStep[];
  projects: string[];
  certifications: string[];
}

export const roadmapsData: Record<string, RoadmapData> = {
  "1": { // Full Stack Developer
    role: "Full Stack Developer",
    description: "Master both frontend and backend development to build complete web applications",
    duration: "6-12 months",
    difficulty: "Intermediate",
    steps: [
      {
        title: "1. Master the Fundamentals",
        duration: "2-3 months",
        items: [
          {
            name: "HTML & CSS Basics",
            resources: [
              { title: "freeCodeCamp - Responsive Web Design", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
              { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn" },
            ],
          },
          {
            name: "JavaScript Fundamentals",
            resources: [
              { title: "JavaScript.info", url: "https://javascript.info/" },
              { title: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" },
            ],
          },
          {
            name: "Git & GitHub",
            resources: [
              { title: "Git Documentation", url: "https://git-scm.com/doc" },
              { title: "GitHub Learning Lab", url: "https://lab.github.com/" },
            ],
          },
        ],
      },
      {
        title: "2. Frontend Development",
        duration: "2-3 months",
        items: [
          {
            name: "React.js",
            resources: [
              { title: "React Official Docs", url: "https://react.dev/" },
              { title: "React Tutorial - Scrimba", url: "https://scrimba.com/learn/learnreact" },
            ],
          },
          {
            name: "State Management",
            resources: [
              { title: "Redux Toolkit", url: "https://redux-toolkit.js.org/" },
              { title: "React Context API", url: "https://react.dev/reference/react/useContext" },
            ],
          },
        ],
      },
      {
        title: "3. Backend Development",
        duration: "2-3 months",
        items: [
          {
            name: "Node.js & Express",
            resources: [
              { title: "Node.js Docs", url: "https://nodejs.org/en/docs/" },
              { title: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html" },
            ],
          },
          {
            name: "RESTful APIs",
            resources: [
              { title: "REST API Tutorial", url: "https://restfulapi.net/" },
              { title: "HTTP Status Codes", url: "https://httpstatuses.com/" },
            ],
          },
        ],
      },
      {
        title: "4. Databases",
        duration: "1-2 months",
        items: [
          {
            name: "SQL (PostgreSQL/MySQL)",
            resources: [
              { title: "PostgreSQL Tutorial", url: "https://www.postgresql.org/docs/" },
              { title: "SQL Zoo", url: "https://sqlzoo.net/" },
            ],
          },
          {
            name: "NoSQL (MongoDB)",
            resources: [
              { title: "MongoDB University", url: "https://university.mongodb.com/" },
              { title: "MongoDB Manual", url: "https://docs.mongodb.com/manual/" },
            ],
          },
        ],
      },
      {
        title: "5. DevOps & Deployment",
        duration: "1-2 months",
        items: [
          {
            name: "Docker Basics",
            resources: [
              { title: "Docker Documentation", url: "https://docs.docker.com/" },
              { title: "Docker Curriculum", url: "https://docker-curriculum.com/" },
            ],
          },
          {
            name: "Cloud Deployment",
            resources: [
              { title: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
              { title: "Heroku Dev Center", url: "https://devcenter.heroku.com/" },
            ],
          },
        ],
      },
    ],
    projects: [
      "Build a personal portfolio website",
      "Create a full-stack e-commerce application",
      "Develop a real-time chat application",
      "Build a task management system with authentication",
    ],
    certifications: [
      "AWS Certified Developer - Associate",
      "Meta Front-End Developer Professional Certificate",
      "MongoDB Associate Developer Certification",
    ],
  },
  "2": { // Data Scientist
    role: "Data Scientist",
    description: "Analyze complex datasets and build predictive models using machine learning",
    duration: "12-18 months",
    difficulty: "Advanced",
    steps: [
      {
        title: "1. Programming & Statistics Foundations",
        duration: "3-4 months",
        items: [
          {
            name: "Python Programming",
            resources: [
              { title: "Python for Data Science - DataCamp", url: "https://www.datacamp.com/courses/intro-to-python-for-data-science" },
              { title: "Real Python", url: "https://realpython.com/" },
            ],
          },
          {
            name: "Statistics & Probability",
            resources: [
              { title: "Khan Academy Statistics", url: "https://www.khanacademy.org/math/statistics-probability" },
              { title: "Think Stats", url: "https://greenteapress.com/thinkstats/" },
            ],
          },
        ],
      },
      {
        title: "2. Data Analysis & Visualization",
        duration: "2-3 months",
        items: [
          {
            name: "Pandas & NumPy",
            resources: [
              { title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" },
              { title: "NumPy Quickstart", url: "https://numpy.org/doc/stable/user/quickstart.html" },
            ],
          },
          {
            name: "Data Visualization",
            resources: [
              { title: "Matplotlib Tutorials", url: "https://matplotlib.org/stable/tutorials/index.html" },
              { title: "Seaborn Gallery", url: "https://seaborn.pydata.org/examples/index.html" },
            ],
          },
        ],
      },
      {
        title: "3. Machine Learning",
        duration: "4-6 months",
        items: [
          {
            name: "ML Fundamentals",
            resources: [
              { title: "Scikit-learn Documentation", url: "https://scikit-learn.org/stable/tutorial/index.html" },
              { title: "Andrew Ng's ML Course", url: "https://www.coursera.org/learn/machine-learning" },
            ],
          },
          {
            name: "Deep Learning",
            resources: [
              { title: "TensorFlow Tutorials", url: "https://www.tensorflow.org/tutorials" },
              { title: "Fast.ai Course", url: "https://www.fast.ai/" },
            ],
          },
        ],
      },
      {
        title: "4. Advanced Topics",
        duration: "3-5 months",
        items: [
          {
            name: "Model Deployment",
            resources: [
              { title: "MLOps Guide", url: "https://ml-ops.org/" },
              { title: "Flask for ML", url: "https://flask.palletsprojects.com/" },
            ],
          },
        ],
      },
    ],
    projects: [
      "Customer churn prediction model",
      "Sentiment analysis on social media data",
      "Recommendation system for e-commerce",
      "Time series forecasting for sales data",
    ],
    certifications: [
      "Google Professional Data Analyst Certificate",
      "IBM Data Science Professional Certificate",
      "Microsoft Certified: Azure Data Scientist Associate",
    ],
  },
  "8": { // Frontend Developer
    role: "Frontend Developer",
    description: "Create interactive and responsive user interfaces for web applications",
    duration: "4-8 months",
    difficulty: "Beginner",
    steps: [
      {
        title: "1. Core Web Technologies",
        duration: "2-3 months",
        items: [
          {
            name: "HTML5 Fundamentals",
            resources: [
              { title: "HTML MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
              { title: "HTML5 Tutorial", url: "https://www.w3schools.com/html/" },
            ],
          },
          {
            name: "CSS3 & Responsive Design",
            resources: [
              { title: "CSS Tricks", url: "https://css-tricks.com/" },
              { title: "Flexbox Froggy", url: "https://flexboxfroggy.com/" },
            ],
          },
          {
            name: "JavaScript ES6+",
            resources: [
              { title: "JavaScript.info", url: "https://javascript.info/" },
              { title: "You Don't Know JS", url: "https://github.com/getify/You-Dont-Know-JS" },
            ],
          },
        ],
      },
      {
        title: "2. Modern Frameworks",
        duration: "2-3 months",
        items: [
          {
            name: "React.js",
            resources: [
              { title: "React Official Tutorial", url: "https://react.dev/learn" },
              { title: "React Hooks Guide", url: "https://react.dev/reference/react" },
            ],
          },
          {
            name: "TypeScript",
            resources: [
              { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
              { title: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript/" },
            ],
          },
        ],
      },
      {
        title: "3. Tools & Build Systems",
        duration: "1-2 months",
        items: [
          {
            name: "Version Control (Git)",
            resources: [
              { title: "Git Documentation", url: "https://git-scm.com/doc" },
              { title: "Learn Git Branching", url: "https://learngitbranching.js.org/" },
            ],
          },
          {
            name: "Build Tools",
            resources: [
              { title: "Vite Guide", url: "https://vitejs.dev/guide/" },
              { title: "Webpack Concepts", url: "https://webpack.js.org/concepts/" },
            ],
          },
        ],
      },
    ],
    projects: [
      "Personal portfolio website",
      "Weather app with API integration",
      "Todo app with local storage",
      "E-commerce product catalog",
    ],
    certifications: [
      "Meta Front-End Developer Certificate",
      "freeCodeCamp Responsive Web Design",
      "Frontend Masters Certificate",
    ],
  },
  // Add default for other roles
  "default": {
    role: "Tech Professional",
    description: "Comprehensive learning path for your chosen career",
    duration: "6-12 months",
    difficulty: "Intermediate",
    steps: [
      {
        title: "1. Foundation Building",
        duration: "2-3 months",
        items: [
          {
            name: "Core Concepts",
            resources: [
              { title: "Online Learning Platform", url: "https://www.coursera.org/" },
              { title: "Udemy Courses", url: "https://www.udemy.com/" },
            ],
          },
        ],
      },
      {
        title: "2. Skill Development",
        duration: "3-4 months",
        items: [
          {
            name: "Practical Skills",
            resources: [
              { title: "LinkedIn Learning", url: "https://www.linkedin.com/learning/" },
              { title: "Pluralsight", url: "https://www.pluralsight.com/" },
            ],
          },
        ],
      },
      {
        title: "3. Advanced Topics",
        duration: "2-3 months",
        items: [
          {
            name: "Specialization",
            resources: [
              { title: "edX Courses", url: "https://www.edx.org/" },
              { title: "Udacity Nanodegrees", url: "https://www.udacity.com/" },
            ],
          },
        ],
      },
    ],
    projects: [
      "Build a portfolio project",
      "Contribute to open source",
      "Create a case study",
    ],
    certifications: [
      "Industry-recognized certification",
      "Platform-specific certification",
    ],
  },
};
