import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { roadmapsData } from "@/data/roadmapsData";
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
  Clock,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import RoadmapTree from "@/components/RoadmapTree";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";

const Roadmap = () => {
  const { roleId } = useParams();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  // Get roadmap data based on roleId
  const roadmap = roadmapsData[roleId || "default"] || roadmapsData["default"];

  const progress =
    roadmap.steps.length > 0
      ? (completedSteps.length / roadmap.steps.length) * 100
      : 0;

  return (
    <>
      <PreloadAnimation type="roadmap" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
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
                  <Award className="h-8 w-8 text-accent drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
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
                      <Award className="h-5 w-5 text-accent mt-0.5 flex-shrink-0 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                    </motion.div>
                    <span className="text-lg">{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        {/* Skills Breakdown */}
        <ScrollReveal delay={0.7}>
          <AnimatedCard glowColor="rgba(59, 130, 246, 0.8)">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-lg bg-blue-500/20"
                >
                  <Target className="h-6 w-6 text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                </motion.div>
                Essential Skills Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { skill: "Frontend Development", percentage: 30, color: "from-blue-500 to-cyan-500" },
                  { skill: "Backend Development", percentage: 30, color: "from-green-500 to-emerald-500" },
                  { skill: "Database Management", percentage: 20, color: "from-purple-500 to-pink-500" },
                  { skill: "DevOps & Deployment", percentage: 20, color: "from-orange-500 to-red-500" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.skill}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="relative w-full bg-secondary rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-3 bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden shadow-lg`}
                      >
                        <motion.div
                          animate={{ x: ["0%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        {/* Career Timeline */}
        <ScrollReveal delay={0.8}>
          <AnimatedCard glowColor="rgba(249, 115, 22, 0.8)">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="p-2 rounded-lg bg-orange-500/20"
                >
                  <Clock className="h-6 w-6 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                </motion.div>
                Career Progression Timeline
              </h2>
              <div className="space-y-6">
                {[
                  { period: "0-2 Years", title: "Junior Developer", salary: "$60k - $85k", focus: "Learn fundamentals, work under mentorship, build portfolio projects" },
                  { period: "2-5 Years", title: "Mid-Level Developer", salary: "$85k - $130k", focus: "Lead small projects, mentor juniors, specialize in key technologies" },
                  { period: "5-8 Years", title: "Senior Developer", salary: "$130k - $180k", focus: "Architect solutions, lead teams, make strategic technical decisions" },
                  { period: "8+ Years", title: "Tech Lead / Architect", salary: "$180k - $250k+", focus: "Drive technical vision, influence company strategy, mentor leadership" },
                ].map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="relative pl-8 pb-6 border-l-2 border-orange-500/30 last:pb-0 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className="absolute -left-2 top-0 w-4 h-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-lg shadow-orange-500/50"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">{stage.period}</Badge>
                        <h3 className="text-xl font-bold">{stage.title}</h3>
                      </div>
                      <p className="text-lg font-semibold text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]">{stage.salary}</p>
                      <p className="text-muted-foreground">{stage.focus}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        {/* Interview Preparation */}
        <ScrollReveal delay={0.9}>
          <AnimatedCard glowColor="rgba(34, 197, 94, 0.8)">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="p-2 rounded-lg bg-green-500/20"
                >
                  <BookOpen className="h-6 w-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                </motion.div>
                Interview Preparation Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { 
                    title: "Technical Skills", 
                    items: ["Data Structures & Algorithms", "System Design Basics", "Code Review Best Practices", "Testing Strategies"],
                    color: "blue"
                  },
                  { 
                    title: "Behavioral Skills", 
                    items: ["STAR Method Stories", "Team Collaboration Examples", "Conflict Resolution", "Leadership Experiences"],
                    color: "purple"
                  },
                  { 
                    title: "Common Questions", 
                    items: ["Tell me about yourself", "Why this company?", "Greatest challenge faced", "Future career goals"],
                    color: "green"
                  },
                  { 
                    title: "Resources", 
                    items: ["LeetCode Practice", "Mock Interview Sessions", "System Design Primers", "Company Research"],
                    color: "orange"
                  },
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className={`p-6 rounded-lg border-2 border-${section.color}-500/20 bg-${section.color}-500/5`}
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-${section.color}-500 shadow-lg shadow-${section.color}-500/50`} />
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-2 text-muted-foreground cursor-pointer"
                        >
                          <ChevronRight className="h-4 w-4 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </ScrollReveal>

        {/* Learning Resources Hub */}
        <ScrollReveal delay={1.0}>
          <AnimatedCard glowColor="rgba(236, 72, 153, 0.8)">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="p-2 rounded-lg bg-pink-500/20"
                >
                  <Rocket className="h-6 w-6 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                </motion.div>
                Learning Resources Hub
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { platform: "YouTube Channels", count: "50+ Videos", icon: "🎥", url: "https://www.youtube.com/" },
                  { platform: "Online Courses", count: "20+ Platforms", icon: "📚", url: "https://www.coursera.org/" },
                  { platform: "Documentation", count: "100+ Guides", icon: "📖", url: "https://developer.mozilla.org/" },
                  { platform: "Practice Sites", count: "15+ Platforms", icon: "💻", url: "https://www.leetcode.com/" },
                  { platform: "Communities", count: "30+ Groups", icon: "👥", url: "https://discord.com/" },
                  { platform: "Newsletters", count: "25+ Sources", icon: "📧", url: "https://newsletter.pragmaticengineer.com/" },
                ].map((resource, index) => (
                  <motion.a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 rounded-lg border-2 border-pink-500/20 bg-pink-500/5 text-center cursor-pointer block"
                  >
                    <div className="text-4xl mb-3">{resource.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{resource.platform}</h3>
                    <p className="text-sm text-muted-foreground">{resource.count}</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </AnimatedCard>
        </ScrollReveal>
      </div>
      </div>
        </PageTransition>
      )}
    </>
  );
};

export default Roadmap;