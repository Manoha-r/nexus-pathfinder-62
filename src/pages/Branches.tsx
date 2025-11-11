import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Code, Server, Cpu, Cog, Building2, FlaskConical, Zap, Plane } from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";
import AnimatedBackground from "@/components/AnimatedBackground";

const Branches = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const initialSearch = urlParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [isLoaded, setIsLoaded] = useState(false);

  const branches = [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      icon: Code,
      color: "rgba(59, 130, 246, 0.8)",
      gradient: "from-blue-500 to-cyan-500",
      roles: 45,
      description: "Software, AI, ML, Data Science, Cybersecurity",
    },
    {
      id: "it",
      name: "Information Technology",
      icon: Server,
      color: "rgba(168, 85, 247, 0.8)",
      gradient: "from-purple-500 to-pink-500",
      roles: 38,
      description: "Cloud, Networking, DevOps, System Administration",
    },
    {
      id: "ece",
      name: "Electronics & Communication",
      icon: Cpu,
      color: "rgba(34, 197, 94, 0.8)",
      gradient: "from-green-500 to-emerald-500",
      roles: 35,
      description: "Embedded Systems, VLSI, IoT, Telecom",
    },
    {
      id: "me",
      name: "Mechanical Engineering",
      icon: Cog,
      color: "rgba(249, 115, 22, 0.8)",
      gradient: "from-orange-500 to-red-500",
      roles: 32,
      description: "Design, Manufacturing, Robotics, Automotive",
    },
    {
      id: "ce",
      name: "Civil Engineering",
      icon: Building2,
      color: "rgba(234, 179, 8, 0.8)",
      gradient: "from-yellow-500 to-amber-500",
      roles: 28,
      description: "Construction, Structural Design, Project Management",
    },
    {
      id: "che",
      name: "Chemical Engineering",
      icon: FlaskConical,
      color: "rgba(20, 184, 166, 0.8)",
      gradient: "from-teal-500 to-cyan-500",
      roles: 25,
      description: "Process Engineering, Chemical Plants, R&D",
    },
    {
      id: "ee",
      name: "Electrical Engineering",
      icon: Zap,
      color: "rgba(139, 92, 246, 0.8)",
      gradient: "from-indigo-500 to-purple-500",
      roles: 30,
      description: "Power Systems, Control, Renewable Energy",
    },
    {
      id: "ae",
      name: "Aerospace Engineering",
      icon: Plane,
      color: "rgba(244, 63, 94, 0.8)",
      gradient: "from-rose-500 to-pink-500",
      roles: 22,
      description: "Aircraft Design, Propulsion, Avionics",
    },
  ];

  const filteredBranches = branches.filter((branch) => {
    const query = searchQuery.toLowerCase();
    return (
      branch.name.toLowerCase().includes(query) ||
      branch.description.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <PreloadAnimation type="branches" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <AnimatedBackground />
          <div className="min-h-screen bg-background py-20 px-4 pt-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Explore Engineering Branches
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose your branch to discover career opportunities
            </p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search branches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </motion.div>
          </motion.div>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBranches.map((branch, index) => (
              <ScrollReveal key={branch.id} delay={index * 0.1} direction="up">
                <Link to={`/branch/${branch.id}`}>
                  <AnimatedCard glowColor={branch.color}>
                    <div className="p-6 h-full">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`bg-gradient-to-br ${branch.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
                      >
                        <branch.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {branch.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          {branch.roles}+ Roles
                        </span>
                        <motion.span
                          whileHover={{ x: 5 }}
                          className="text-sm text-muted-foreground"
                        >
                          →
                        </motion.span>
                      </div>
                    </div>
                  </AnimatedCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          </div>
        </div>
        </PageTransition>
      )}
    </>
  );
};

export default Branches;