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

  // Import roles data
  const branchRolesMap: Record<string, any[]> = {
    cse: [
      { id: 1, title: "Full Stack Developer", level: "Intermediate", description: "Build complete web applications from frontend to backend with modern frameworks", avgSalary: "$85k - $130k", demand: "Very High", skills: ["React", "Node.js", "PostgreSQL", "Docker", "TypeScript", "REST APIs"], timeToLearn: "6-12 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 2, title: "Data Scientist", level: "Advanced", description: "Analyze complex datasets and build predictive models using machine learning", avgSalary: "$100k - $160k", demand: "Very High", skills: ["Python", "Machine Learning", "Statistics", "SQL", "TensorFlow", "Data Visualization"], timeToLearn: "12-18 months", color: "rgba(168, 85, 247, 0.8)" },
      { id: 3, title: "AI/ML Engineer", level: "Advanced", description: "Develop artificial intelligence systems and deploy machine learning models at scale", avgSalary: "$110k - $180k", demand: "Extreme", skills: ["PyTorch", "Deep Learning", "NLP", "Computer Vision", "MLOps", "Python"], timeToLearn: "12-24 months", color: "rgba(139, 92, 246, 0.8)" },
      { id: 4, title: "DevOps Engineer", level: "Intermediate", description: "Automate deployment pipelines and manage cloud infrastructure", avgSalary: "$90k - $140k", demand: "Very High", skills: ["AWS", "Kubernetes", "CI/CD", "Linux", "Terraform", "Docker"], timeToLearn: "8-14 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 5, title: "Mobile App Developer", level: "Intermediate", description: "Create native and cross-platform mobile applications for iOS and Android", avgSalary: "$80k - $125k", demand: "High", skills: ["React Native", "Flutter", "iOS", "Android", "Firebase", "Mobile UI/UX"], timeToLearn: "6-12 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 6, title: "Cybersecurity Analyst", level: "Intermediate", description: "Protect systems and networks from security threats and vulnerabilities", avgSalary: "$85k - $135k", demand: "Very High", skills: ["Network Security", "Penetration Testing", "SIEM", "Threat Analysis", "Linux", "Cryptography"], timeToLearn: "8-14 months", color: "rgba(239, 68, 68, 0.8)" },
      { id: 7, title: "Cloud Architect", level: "Advanced", description: "Design and implement scalable cloud infrastructure solutions", avgSalary: "$120k - $190k", demand: "Very High", skills: ["AWS", "Azure", "GCP", "Microservices", "System Design", "DevOps"], timeToLearn: "18-24 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 8, title: "Frontend Developer", level: "Beginner", description: "Create interactive and responsive user interfaces for web applications", avgSalary: "$70k - $115k", demand: "Very High", skills: ["React", "JavaScript", "CSS", "HTML", "Responsive Design", "TypeScript"], timeToLearn: "4-8 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 9, title: "Backend Developer", level: "Intermediate", description: "Build server-side logic, APIs, and database systems", avgSalary: "$85k - $130k", demand: "Very High", skills: ["Node.js", "Python", "Java", "PostgreSQL", "MongoDB", "REST APIs"], timeToLearn: "6-12 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 10, title: "Software Architect", level: "Advanced", description: "Design high-level software structure and make technical decisions", avgSalary: "$130k - $200k", demand: "High", skills: ["System Design", "Architecture Patterns", "Microservices", "Scalability", "Cloud", "Leadership"], timeToLearn: "5+ years exp", color: "rgba(168, 85, 247, 0.8)" },
      { id: 11, title: "Database Administrator", level: "Intermediate", description: "Manage, optimize, and secure database systems", avgSalary: "$75k - $120k", demand: "High", skills: ["SQL", "PostgreSQL", "MySQL", "Database Tuning", "Backup & Recovery", "Data Security"], timeToLearn: "8-12 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 12, title: "Blockchain Developer", level: "Advanced", description: "Develop decentralized applications and smart contracts", avgSalary: "$100k - $175k", demand: "High", skills: ["Solidity", "Ethereum", "Web3", "Smart Contracts", "Cryptography", "DeFi"], timeToLearn: "12-18 months", color: "rgba(249, 115, 22, 0.8)" },
      { id: 13, title: "Game Developer", level: "Intermediate", description: "Create interactive games for various platforms", avgSalary: "$70k - $130k", demand: "Medium", skills: ["Unity", "Unreal Engine", "C++", "C#", "3D Graphics", "Game Physics"], timeToLearn: "10-16 months", color: "rgba(168, 85, 247, 0.8)" },
      { id: 14, title: "Computer Vision Engineer", level: "Advanced", description: "Develop systems that interpret visual information", avgSalary: "$105k - $170k", demand: "Very High", skills: ["OpenCV", "Deep Learning", "Python", "Image Processing", "PyTorch", "CNN"], timeToLearn: "12-20 months", color: "rgba(139, 92, 246, 0.8)" },
      { id: 15, title: "NLP Engineer", level: "Advanced", description: "Build systems that process human language", avgSalary: "$110k - $175k", demand: "Very High", skills: ["NLP", "Transformers", "Python", "BERT", "LLMs", "Text Processing"], timeToLearn: "12-20 months", color: "rgba(168, 85, 247, 0.8)" },
      { id: 16, title: "Site Reliability Engineer", level: "Advanced", description: "Ensure system reliability and performance", avgSalary: "$110k - $165k", demand: "Very High", skills: ["Kubernetes", "Monitoring", "Linux", "Automation", "Incident Response", "Cloud"], timeToLearn: "15-24 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 17, title: "UI/UX Designer", level: "Beginner", description: "Design intuitive user interfaces and experiences", avgSalary: "$65k - $110k", demand: "High", skills: ["Figma", "User Research", "Prototyping", "Design Systems", "Wireframing", "Usability"], timeToLearn: "6-10 months", color: "rgba(236, 72, 153, 0.8)" },
      { id: 18, title: "QA Engineer", level: "Beginner", description: "Test software to ensure quality", avgSalary: "$60k - $100k", demand: "High", skills: ["Test Automation", "Selenium", "Jest", "API Testing", "Bug Tracking", "CI/CD"], timeToLearn: "4-8 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 19, title: "Data Engineer", level: "Intermediate", description: "Build data pipelines and infrastructure", avgSalary: "$90k - $145k", demand: "Very High", skills: ["Apache Spark", "SQL", "Python", "ETL", "Data Warehousing", "Airflow"], timeToLearn: "8-14 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 20, title: "Business Intelligence Analyst", level: "Intermediate", description: "Analyze business data and create insights", avgSalary: "$70k - $115k", demand: "High", skills: ["SQL", "Tableau", "Power BI", "Data Analysis", "Excel", "Data Visualization"], timeToLearn: "6-10 months", color: "rgba(249, 115, 22, 0.8)" },
      { id: 21, title: "Embedded Software Engineer", level: "Advanced", description: "Develop software for embedded systems", avgSalary: "$85k - $135k", demand: "High", skills: ["C", "C++", "RTOS", "Embedded Linux", "Hardware Interfacing", "ARM"], timeToLearn: "12-18 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 22, title: "Security Engineer", level: "Advanced", description: "Design security measures to protect systems", avgSalary: "$95k - $155k", demand: "Very High", skills: ["Security Architecture", "Cryptography", "IAM", "Security Auditing", "Cloud Security", "Zero Trust"], timeToLearn: "12-18 months", color: "rgba(239, 68, 68, 0.8)" },
      { id: 23, title: "Network Engineer", level: "Intermediate", description: "Design and manage computer networks", avgSalary: "$70k - $115k", demand: "High", skills: ["TCP/IP", "Cisco", "Network Security", "Routing", "Switching", "VPN"], timeToLearn: "8-12 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 24, title: "Systems Administrator", level: "Beginner", description: "Maintain computer systems and servers", avgSalary: "$55k - $90k", demand: "Medium", skills: ["Linux", "Windows Server", "Active Directory", "Scripting", "Backup", "Monitoring"], timeToLearn: "6-10 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 25, title: "Technical Writer", level: "Beginner", description: "Create technical documentation and guides", avgSalary: "$55k - $95k", demand: "Medium", skills: ["Technical Writing", "Documentation", "Markdown", "API Docs", "User Guides", "Git"], timeToLearn: "3-6 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 26, title: "Product Manager (Technical)", level: "Advanced", description: "Define product strategy for technical products", avgSalary: "$110k - $180k", demand: "High", skills: ["Product Strategy", "Roadmapping", "Agile", "Technical Knowledge", "Stakeholder Management", "Analytics"], timeToLearn: "3+ years exp", color: "rgba(168, 85, 247, 0.8)" },
      { id: 27, title: "Scrum Master", level: "Intermediate", description: "Facilitate agile development processes", avgSalary: "$75k - $120k", demand: "Medium", skills: ["Agile", "Scrum", "Facilitation", "JIRA", "Stakeholder Management", "Coaching"], timeToLearn: "6-12 months", color: "rgba(249, 115, 22, 0.8)" },
      { id: 28, title: "Performance Engineer", level: "Advanced", description: "Optimize application performance", avgSalary: "$90k - $145k", demand: "Medium", skills: ["Performance Testing", "JMeter", "Profiling", "Database Optimization", "Caching", "CDN"], timeToLearn: "10-16 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 29, title: "Solutions Architect", level: "Advanced", description: "Design technical solutions for business needs", avgSalary: "$115k - $180k", demand: "High", skills: ["System Design", "Cloud", "Integration", "Architecture", "Business Analysis", "Communication"], timeToLearn: "4+ years exp", color: "rgba(168, 85, 247, 0.8)" },
      { id: 30, title: "Platform Engineer", level: "Advanced", description: "Build internal platforms for development teams", avgSalary: "$100k - $160k", demand: "High", skills: ["Kubernetes", "Infrastructure as Code", "CI/CD", "Developer Tools", "Automation", "Cloud"], timeToLearn: "12-20 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 31, title: "API Developer", level: "Intermediate", description: "Design and implement APIs", avgSalary: "$80k - $125k", demand: "Very High", skills: ["REST APIs", "GraphQL", "Node.js", "API Design", "Documentation", "Testing"], timeToLearn: "6-10 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 32, title: "Automation Engineer", level: "Intermediate", description: "Automate testing and deployment", avgSalary: "$75k - $120k", demand: "High", skills: ["Selenium", "Python", "CI/CD", "Test Automation", "Scripting", "Jenkins"], timeToLearn: "6-12 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 33, title: "Research Scientist (AI)", level: "Advanced", description: "Conduct AI research and publish papers", avgSalary: "$120k - $200k+", demand: "Medium", skills: ["Research", "Machine Learning", "Mathematics", "Deep Learning", "Python", "Publications"], timeToLearn: "PhD + exp", color: "rgba(139, 92, 246, 0.8)" },
      { id: 34, title: "IoT Developer", level: "Intermediate", description: "Develop IoT applications and systems", avgSalary: "$75k - $125k", demand: "High", skills: ["IoT Protocols", "Embedded Systems", "Python", "MQTT", "Edge Computing", "Sensors"], timeToLearn: "8-14 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 35, title: "AR/VR Developer", level: "Advanced", description: "Create AR/VR experiences", avgSalary: "$85k - $145k", demand: "Medium", skills: ["Unity", "Unreal Engine", "AR Kit", "VR SDK", "3D Graphics", "C#"], timeToLearn: "12-18 months", color: "rgba(168, 85, 247, 0.8)" },
      { id: 36, title: "Compiler Engineer", level: "Advanced", description: "Develop compilers and language tools", avgSalary: "$110k - $175k", demand: "Low", skills: ["Compilers", "LLVM", "C++", "Parsing", "Optimization", "Language Design"], timeToLearn: "15-24 months", color: "rgba(239, 68, 68, 0.8)" },
      { id: 37, title: "Release Engineer", level: "Intermediate", description: "Manage software releases", avgSalary: "$80k - $130k", demand: "Medium", skills: ["CI/CD", "Version Control", "Build Systems", "Release Management", "Automation", "Git"], timeToLearn: "8-12 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 38, title: "Technical Support Engineer", level: "Beginner", description: "Provide technical support for products", avgSalary: "$50k - $85k", demand: "High", skills: ["Troubleshooting", "Customer Service", "Technical Knowledge", "Communication", "Ticketing Systems", "Documentation"], timeToLearn: "3-6 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 39, title: "Build Engineer", level: "Intermediate", description: "Maintain build systems", avgSalary: "$75k - $120k", demand: "Medium", skills: ["Build Systems", "Make", "CMake", "CI/CD", "Scripting", "Version Control"], timeToLearn: "8-12 months", color: "rgba(34, 197, 94, 0.8)" },
      { id: 40, title: "Graphics Programmer", level: "Advanced", description: "Develop graphics engines", avgSalary: "$95k - $160k", demand: "Low", skills: ["OpenGL", "DirectX", "Vulkan", "C++", "Shaders", "3D Math"], timeToLearn: "12-20 months", color: "rgba(168, 85, 247, 0.8)" },
      { id: 41, title: "Integration Engineer", level: "Intermediate", description: "Connect systems through integrations", avgSalary: "$80k - $125k", demand: "High", skills: ["API Integration", "Middleware", "ETL", "Data Mapping", "Web Services", "SQL"], timeToLearn: "8-12 months", color: "rgba(59, 130, 246, 0.8)" },
      { id: 42, title: "Security Analyst", level: "Intermediate", description: "Monitor and respond to security incidents", avgSalary: "$70k - $115k", demand: "Very High", skills: ["SIEM", "Incident Response", "Security Monitoring", "Threat Intelligence", "Log Analysis", "Forensics"], timeToLearn: "8-12 months", color: "rgba(239, 68, 68, 0.8)" },
      { id: 43, title: "MLOps Engineer", level: "Advanced", description: "Deploy ML models in production", avgSalary: "$105k - $165k", demand: "Very High", skills: ["MLOps", "Kubernetes", "ML Pipelines", "Model Deployment", "Docker", "Python"], timeToLearn: "12-18 months", color: "rgba(168, 85, 247, 0.8)" },
      { id: 44, title: "Quantum Computing Engineer", level: "Advanced", description: "Develop quantum algorithms", avgSalary: "$120k - $190k", demand: "Low", skills: ["Quantum Computing", "Qiskit", "Linear Algebra", "Python", "Quantum Algorithms", "Physics"], timeToLearn: "PhD + exp", color: "rgba(139, 92, 246, 0.8)" },
      { id: 45, title: "Engineering Manager", level: "Advanced", description: "Lead engineering teams", avgSalary: "$130k - $210k", demand: "High", skills: ["Leadership", "Team Management", "Technical Strategy", "Mentoring", "Project Management", "Communication"], timeToLearn: "5+ years exp", color: "rgba(249, 115, 22, 0.8)" },
    ],
    // Add more branches...
  };

  const roles = branchRolesMap[branchId || "cse"] || [];

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
          <p className="text-xl text-muted-foreground mb-4">
            Explore {roles.length}+ career opportunities in this field
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <AnimatedCard glowColor="rgba(59, 130, 246, 0.6)">
              <div className="p-4 text-center">
                <p className="text-3xl font-bold text-primary mb-2">45+</p>
                <p className="text-sm text-muted-foreground">Career Roles</p>
              </div>
            </AnimatedCard>
            <AnimatedCard glowColor="rgba(34, 197, 94, 0.6)">
              <div className="p-4 text-center">
                <p className="text-3xl font-bold text-green-500 mb-2">$95k-$180k</p>
                <p className="text-sm text-muted-foreground">Avg Salary Range</p>
              </div>
            </AnimatedCard>
            <AnimatedCard glowColor="rgba(168, 85, 247, 0.6)">
              <div className="p-4 text-center">
                <p className="text-3xl font-bold text-purple-500 mb-2">22%</p>
                <p className="text-sm text-muted-foreground">Job Growth</p>
              </div>
            </AnimatedCard>
          </div>
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
              <AnimatedCard glowColor={role.color || "rgba(59, 130, 246, 0.8)"}>
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