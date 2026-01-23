import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  GraduationCap,
  Rocket,
  Target,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import BeginnerRoadmapAZ from "@/components/BeginnerRoadmapAZ";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";
import AnimatedBackground from "@/components/AnimatedBackground";

const BeginnerRoadmap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PreloadAnimation type="roadmap" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <AnimatedBackground />
          <div className="min-h-screen bg-background py-20 px-4 pt-24 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Back Button */}
              <Link to="/">
                <Button variant="ghost" className="mb-8 group">
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </Link>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Complete Beginner Guide</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary via-accent to-green-500 bg-clip-text text-transparent">
                    A to Z Roadmap
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Your complete journey from absolute beginner to job-ready developer. 
                  Follow each letter step-by-step for the clearest learning path.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 border border-border"
                  >
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="font-medium">26 Learning Steps</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 border border-border"
                  >
                    <Clock className="h-5 w-5 text-accent" />
                    <span className="font-medium">6-12 Months</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 border border-border"
                  >
                    <Target className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Job Ready</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* How to Use */}
              <ScrollReveal delay={0.2}>
                <AnimatedCard glowColor="rgba(59, 130, 246, 0.6)">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <Rocket className="h-6 w-6 text-primary" />
                      How to Use This Roadmap
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="p-4 rounded-xl bg-primary/10 border border-primary/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
                          <h3 className="font-semibold">Follow A to Z</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Start with A and work through each letter in order. Each builds on the previous.
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="p-4 rounded-xl bg-accent/10 border border-accent/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">2</span>
                          <h3 className="font-semibold">Complete Topics</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click on each letter to expand. Study all topics and resources before moving on.
                        </p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">3</span>
                          <h3 className="font-semibold">Mark Complete</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Click the letter circle to mark as complete. Track your progress to stay motivated!
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollReveal>

              {/* Key Features */}
              <ScrollReveal delay={0.3}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                  {[
                    { icon: CheckCircle2, label: "Step-by-Step", color: "text-green-500" },
                    { icon: Target, label: "Beginner Friendly", color: "text-blue-500" },
                    { icon: Sparkles, label: "Free Resources", color: "text-purple-500" },
                    { icon: Rocket, label: "Project Based", color: "text-orange-500" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
                    >
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* A-Z Roadmap Component */}
              <ScrollReveal delay={0.4}>
                <BeginnerRoadmapAZ />
              </ScrollReveal>

              {/* Completion Message */}
              <ScrollReveal delay={0.5}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 border border-primary/30"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="inline-block mb-4"
                  >
                    <GraduationCap className="h-16 w-16 text-primary" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Complete All 26 Steps!
                  </h2>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    By the time you finish this roadmap, you'll have the skills and knowledge 
                    needed to start your career as a web developer. Remember: consistency beats intensity!
                  </p>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </PageTransition>
      )}
    </>
  );
};

export default BeginnerRoadmap;
