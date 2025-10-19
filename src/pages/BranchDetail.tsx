import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Briefcase,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Star,
  Clock,
} from "lucide-react";
import AnimatedCard from "@/components/AnimatedCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";

const BranchDetail = () => {
  const { branchId } = useParams();
  const [filter, setFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample roles data - in real app, this would come from API/database
  const roles = [
    {
      id: 1,
      title: "Full Stack Developer",
      level: "Intermediate",
      description:
        "Build end-to-end web applications using modern frameworks and technologies",
      avgSalary: "$85k - $130k",
      demand: "Very High",
      skills: ["React", "Node.js", "PostgreSQL", "Docker"],
      timeToLearn: "6-12 months",
    },
    {
      id: 2,
      title: "Data Scientist",
      level: "Advanced",
      description:
        "Analyze complex datasets and build predictive models using ML",
      avgSalary: "$100k - $160k",
      demand: "Very High",
      skills: ["Python", "Machine Learning", "Statistics", "SQL"],
      timeToLearn: "12-18 months",
    },
    {
      id: 3,
      title: "DevOps Engineer",
      level: "Intermediate",
      description: "Automate deployment pipelines and manage cloud infrastructure",
      avgSalary: "$90k - $140k",
      demand: "High",
      skills: ["AWS", "Kubernetes", "CI/CD", "Linux"],
      timeToLearn: "8-14 months",
    },
    {
      id: 4,
      title: "Mobile App Developer",
      level: "Intermediate",
      description: "Create native and cross-platform mobile applications",
      avgSalary: "$80k - $125k",
      demand: "High",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      timeToLearn: "6-12 months",
    },
  ];

  const filteredRoles =
    filter === "all"
      ? roles
      : roles.filter((role) => role.level.toLowerCase() === filter);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "intermediate":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "advanced":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <PreloadAnimation type="branchDetail" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <div className="min-h-screen bg-background py-20 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link to="/branches">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to Branches
          </Button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            Computer Science & Engineering
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore {roles.length}+ career opportunities in this field
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {["all", "beginner", "intermediate", "advanced"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </motion.div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoles.map((role, index) => (
            <ScrollReveal key={role.id} delay={index * 0.1} direction="up">
              <AnimatedCard glowColor="rgba(59, 130, 246, 0.8)">
                <div className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                      <Badge className={`${getLevelColor(role.level)} border`}>
                        {role.level}
                      </Badge>
                    </div>
                    <motion.div whileHover={{ scale: 1.2, rotate: 360 }} transition={{ duration: 0.5 }}>
                      <Briefcase className="h-8 w-8 text-primary" />
                    </motion.div>
                  </div>

                <p className="text-muted-foreground mb-6">{role.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Demand:</span>
                    <span className="font-semibold text-green-500">
                      {role.demand}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-muted-foreground">Avg. Salary:</span>
                    <span className="font-semibold">{role.avgSalary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-muted-foreground">Time to Learn:</span>
                    <span className="font-semibold">{role.timeToLearn}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">
                    Key Skills:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link to={`/roadmap/${role.id}`}>
                  <Button className="w-full group">
                    View Roadmap
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                </div>
              </AnimatedCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={0.5}>
          <AnimatedCard glowColor="rgba(168, 85, 247, 0.8)">
            <div className="p-12 text-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <BookOpen className="h-16 w-16 mx-auto mb-6 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Choose a role above to access detailed roadmaps, courses,
                projects, and interview preparation resources.
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

export default BranchDetail;