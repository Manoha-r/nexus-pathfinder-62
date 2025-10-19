import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Code,
  Award,
  Target,
} from "lucide-react";

const Roadmap = () => {
  const { roleId } = useParams();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  // Sample roadmap data
  const roadmap = {
    role: "Full Stack Developer",
    description:
      "Master both frontend and backend development to build complete web applications",
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
              {
                title: "freeCodeCamp - Responsive Web Design",
                url: "https://www.freecodecamp.org/",
              },
              {
                title: "MDN Web Docs",
                url: "https://developer.mozilla.org/",
              },
            ],
          },
          {
            name: "JavaScript Fundamentals",
            resources: [
              {
                title: "JavaScript.info",
                url: "https://javascript.info/",
              },
            ],
          },
          {
            name: "Git & GitHub",
            resources: [
              { title: "Git Documentation", url: "https://git-scm.com/doc" },
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
            ],
          },
          {
            name: "State Management (Redux/Context)",
            resources: [
              { title: "Redux Toolkit", url: "https://redux-toolkit.js.org/" },
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
              { title: "Node.js Docs", url: "https://nodejs.org/" },
            ],
          },
          {
            name: "RESTful APIs",
            resources: [
              { title: "REST API Tutorial", url: "https://restfulapi.net/" },
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
            ],
          },
          {
            name: "NoSQL (MongoDB)",
            resources: [
              { title: "MongoDB University", url: "https://university.mongodb.com/" },
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
            ],
          },
          {
            name: "Cloud Deployment (AWS/Heroku)",
            resources: [
              { title: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
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
  };

  const progress =
    roadmap.steps.length > 0
      ? (completedSteps.length / roadmap.steps.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-background py-20 px-4 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/branches">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Roles
          </Button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {roadmap.role}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {roadmap.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary" className="text-sm">
              <Target className="mr-2 h-4 w-4" />
              {roadmap.duration}
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <Award className="mr-2 h-4 w-4" />
              {roadmap.difficulty}
            </Badge>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <span className="text-2xl font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
              />
            </div>
          </Card>
        </motion.div>

        {/* Roadmap Steps */}
        <div className="space-y-8 mb-12">
          {roadmap.steps.map((step, stepIndex) => (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: stepIndex * 0.1 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-card/80 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleStep(stepIndex)}
                    className="mt-1 flex-shrink-0 transition-transform hover:scale-110"
                  >
                    {completedSteps.includes(stepIndex) ? (
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    ) : (
                      <Circle className="h-8 w-8 text-muted-foreground" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                    <Badge variant="outline" className="mb-4">
                      {step.duration}
                    </Badge>
                    <div className="space-y-4">
                      {step.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="border-l-2 border-primary/30 pl-4"
                        >
                          <h4 className="font-semibold mb-2">{item.name}</h4>
                          <div className="space-y-2">
                            {item.resources.map((resource, resIndex) => (
                              <a
                                key={resIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                              >
                                <BookOpen className="h-4 w-4" />
                                {resource.title}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Code className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Practice Projects</h2>
            </div>
            <ul className="space-y-3">
              {roadmap.projects.map((project, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{project}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold">Recommended Certifications</h2>
            </div>
            <ul className="space-y-3">
              {roadmap.certifications.map((cert, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{cert}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap;