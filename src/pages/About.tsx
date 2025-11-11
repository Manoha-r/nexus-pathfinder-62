import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Target, Eye, Award, Users } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useState } from "react";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower every engineering student with clear, actionable career guidance tailored to their unique aspirations.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "A world where no engineering graduate feels lost about their career path, with accessible guidance for all.",
    },
    {
      icon: Award,
      title: "Our Values",
      description:
        "Excellence, Innovation, Accessibility, and Student Success drive everything we do.",
    },
    {
      icon: Users,
      title: "Our Community",
      description:
        "Join 10,000+ students and professionals building successful engineering careers together.",
    },
  ];

  return (
    <>
      <PreloadAnimation type="about" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <AnimatedBackground />
          <div className="min-h-screen bg-background py-20 px-4 pt-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            About NextStep
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted companion in navigating the journey from engineering
            student to successful professional
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <Card className="p-12 bg-card/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              NextStep was born from a simple observation: thousands of talented
              engineering students graduate every year, yet many struggle to
              find their ideal career path. The gap between academic knowledge
              and industry requirements often leaves students confused and
              overwhelmed.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We created NextStep to bridge this gap, providing clear,
              actionable roadmaps for every engineering branch and career role.
              Our AI-powered platform combines industry insights, expert
              guidance, and real success stories to help you make informed
              decisions about your future.
            </p>
          </Card>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {values.map((value, index) => (
            <ScrollReveal key={index} delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
              <AnimatedCard>
                <div className="p-8 h-full">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                  >
                    <value.icon className="h-8 w-8 text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Team Section */}
        <ScrollReveal>
          <AnimatedCard glowColor="rgba(168, 85, 247, 0.8)">
            <div className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6">Built by Engineers, for Engineers</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our team combines decades of industry experience, technical
                expertise, and a passion for education to create the best career
                guidance platform for engineering students.
              </p>
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

export default About;