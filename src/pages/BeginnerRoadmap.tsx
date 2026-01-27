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
  Zap,
  Star,
  Trophy,
} from "lucide-react";
import BeginnerRoadmapAZ from "@/components/BeginnerRoadmapAZ";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCard from "@/components/AnimatedCard";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";
import AnimatedBackground from "@/components/AnimatedBackground";

const BeginnerRoadmap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Floating particles animation
  const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <>
      <PreloadAnimation type="roadmap" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <AnimatedBackground />
          
          {/* Floating Particles */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {floatingParticles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.left}%`,
                  bottom: -20,
                }}
                animate={{
                  y: [0, -window.innerHeight - 100],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1, 1, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <div className="min-h-screen bg-background py-20 px-4 pt-24 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Back Button with enhanced hover */}
              <Link to="/">
                <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="mb-8 group relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                    />
                    <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                  </Button>
                </motion.div>
              </Link>

              {/* Header with enhanced animations */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                {/* Animated Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6 cursor-pointer"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-sm font-medium">Complete Beginner Guide</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Zap className="h-4 w-4 text-yellow-500" />
                  </motion.div>
                </motion.div>

                {/* Animated Title */}
                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-4 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.span 
                    className="bg-gradient-to-r from-primary via-accent to-green-500 bg-clip-text text-transparent inline-block"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ backgroundSize: "200% 200%" }}
                  >
                    A to Z Roadmap
                  </motion.span>
                  {/* Decorative stars */}
                  <motion.div
                    className="absolute -top-4 -right-4 text-yellow-500"
                    animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="h-6 w-6 fill-yellow-500" />
                  </motion.div>
                </motion.h1>

                <motion.p 
                  className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your complete journey from absolute beginner to job-ready developer. 
                  Follow each letter step-by-step for the clearest learning path.
                </motion.p>

                {/* Enhanced Stats with 3D hover effects */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[
                    { icon: GraduationCap, label: "26 Learning Steps", color: "text-primary", glow: "shadow-primary/50" },
                    { icon: Clock, label: "6-12 Months", color: "text-accent", glow: "shadow-accent/50" },
                    { icon: Target, label: "Job Ready", color: "text-green-500", glow: "shadow-green-500/50" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ 
                        scale: 1.08, 
                        rotateY: 10,
                        rotateX: -5,
                        boxShadow: `0 20px 40px -10px var(--tw-shadow-color)`,
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-card/80 border border-border cursor-pointer transition-all ${stat.glow}`}
                      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </motion.div>
                      <span className="font-medium">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* How to Use - Enhanced */}
              <ScrollReveal delay={0.2}>
                <AnimatedCard glowColor="rgba(59, 130, 246, 0.6)">
                  <div className="p-6">
                    <motion.h2 
                      className="text-2xl font-bold mb-4 flex items-center gap-2"
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Rocket className="h-6 w-6 text-primary" />
                      </motion.div>
                      How to Use This Roadmap
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { num: 1, title: "Follow A to Z", desc: "Start with A and work through each letter in order. Each builds on the previous.", color: "primary" },
                        { num: 2, title: "Complete Topics", desc: "Click on each letter to expand. Study all topics and resources before moving on.", color: "accent" },
                        { num: 3, title: "Mark Complete", desc: "Click the letter circle to mark as complete. Track your progress to stay motivated!", color: "green-500" },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          whileHover={{ 
                            y: -8, 
                            scale: 1.02,
                            rotateX: 5,
                            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
                          }}
                          className={`p-4 rounded-xl bg-${step.color}/10 border border-${step.color}/20 cursor-pointer transition-all duration-300`}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <motion.span 
                              className={`w-8 h-8 rounded-full bg-${step.color} text-white flex items-center justify-center font-bold`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                            >
                              {step.num}
                            </motion.span>
                            <h3 className="font-semibold">{step.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {step.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              </ScrollReveal>

              {/* Key Features - Enhanced with staggered animations */}
              <ScrollReveal delay={0.3}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                  {[
                    { icon: CheckCircle2, label: "Step-by-Step", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
                    { icon: Target, label: "Beginner Friendly", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/30" },
                    { icon: Sparkles, label: "Free Resources", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
                    { icon: Rocket, label: "Project Based", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -5,
                        rotate: [0, -2, 2, 0],
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl ${item.bg} border ${item.border} cursor-pointer transition-all group`}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                        {/* Glow effect on hover */}
                        <motion.div
                          className={`absolute inset-0 ${item.color} blur-lg opacity-0 group-hover:opacity-50 transition-opacity`}
                        />
                      </motion.div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>

              {/* A-Z Roadmap Component */}
              <ScrollReveal delay={0.4}>
                <BeginnerRoadmapAZ />
              </ScrollReveal>

              {/* Completion Message - Enhanced */}
              <ScrollReveal delay={0.5}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-green-500/20 via-blue-500/20 to-purple-500/20 border border-primary/30 relative overflow-hidden cursor-pointer group"
                >
                  {/* Animated shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  />
                  
                  {/* Floating trophy */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="inline-block mb-4 relative"
                  >
                    <Trophy className="h-16 w-16 text-yellow-500" />
                    <motion.div
                      className="absolute inset-0 text-yellow-500 blur-xl opacity-50"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Trophy className="h-16 w-16" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.h2 
                    className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative z-10"
                    whileHover={{ scale: 1.05 }}
                  >
                    Complete All 26 Steps!
                  </motion.h2>
                  <p className="text-muted-foreground max-w-xl mx-auto relative z-10">
                    By the time you finish this roadmap, you'll have the skills and knowledge 
                    needed to start your career as a web developer. Remember: consistency beats intensity!
                  </p>
                  
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-4 left-4 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-4 right-4 opacity-20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-8 w-8 text-primary" />
                  </motion.div>
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
