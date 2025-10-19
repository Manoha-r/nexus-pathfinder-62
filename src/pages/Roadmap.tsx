import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Code,
  Award,
  Target,
  Rocket,
} from "lucide-react";
import RoadmapTree from "@/components/RoadmapTree";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";

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
    <PageTransition>
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
        <ScrollReveal delay={0.2}>
          <AnimatedCard glowColor="rgba(59, 130, 246, 0.8)">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Progress</h3>
                <motion.span
                  key={progress}
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              <div className="relative w-full bg-secondary rounded-full h-4 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full relative overflow-hidden"
                >
                  <motion.div
                    animate={{
                      x: ["0%", "100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        {/* Roadmap Tree */}
        <ScrollReveal delay={0.4}>
          <div className="mb-12">
            <RoadmapTree
              steps={roadmap.steps}
              completedSteps={completedSteps}
              onToggleStep={toggleStep}
            />
          </div>
        </ScrollReveal>

        {/* Projects Section */}
        <ScrollReveal delay={0.5}>
          <AnimatedCard glowColor="rgba(34, 197, 94, 0.8)">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Code className="h-8 w-8 text-green-500" />
                </motion.div>
                <h2 className="text-3xl font-bold">Practice Projects</h2>
              </div>
              <ul className="space-y-3">
                {roadmap.projects.map((project, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Rocket className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <span className="text-lg">{project}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        {/* Certifications */}
        <ScrollReveal delay={0.6}>
          <AnimatedCard glowColor="rgba(168, 85, 247, 0.8)">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Award className="h-8 w-8 text-accent" />
                </motion.div>
                <h2 className="text-3xl font-bold">Recommended Certifications</h2>
              </div>
              <ul className="space-y-3">
                {roadmap.certifications.map((cert, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Award className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <span className="text-lg">{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        </ScrollReveal>
      </div>
      </div>
    </PageTransition>
  );
};

export default Roadmap;