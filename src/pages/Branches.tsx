import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Code, Server, Cpu, Cog, Building2, FlaskConical, Zap, Plane } from "lucide-react";

const branches = [
  {
    id: "cse",
    name: "Computer Science & Engineering",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    roles: 45,
    description: "Software, AI, ML, Data Science, Cybersecurity",
  },
  {
    id: "it",
    name: "Information Technology",
    icon: Server,
    color: "from-purple-500 to-pink-500",
    roles: 38,
    description: "Cloud, Networking, DevOps, System Administration",
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
    roles: 35,
    description: "Embedded Systems, VLSI, IoT, Telecom",
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    icon: Cog,
    color: "from-orange-500 to-red-500",
    roles: 32,
    description: "Design, Manufacturing, Robotics, Automotive",
  },
  {
    id: "ce",
    name: "Civil Engineering",
    icon: Building2,
    color: "from-yellow-500 to-amber-500",
    roles: 28,
    description: "Construction, Structural Design, Project Management",
  },
  {
    id: "che",
    name: "Chemical Engineering",
    icon: FlaskConical,
    color: "from-teal-500 to-cyan-500",
    roles: 25,
    description: "Process Engineering, Chemical Plants, R&D",
  },
  {
    id: "ee",
    name: "Electrical Engineering",
    icon: Zap,
    color: "from-indigo-500 to-purple-500",
    roles: 30,
    description: "Power Systems, Control, Renewable Energy",
  },
  {
    id: "ae",
    name: "Aerospace Engineering",
    icon: Plane,
    color: "from-rose-500 to-pink-500",
    roles: 22,
    description: "Aircraft Design, Propulsion, Avionics",
  },
];

const Branches = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBranches = branches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-20 px-4 pt-24">
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
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </motion.div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBranches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group"
            >
              <Link to={`/branch/${branch.id}`}>
                <Card className="p-6 h-full hover:shadow-2xl transition-all duration-300 bg-card/80 backdrop-blur-sm border-2 border-transparent hover:border-primary">
                  <div className={`bg-gradient-to-br ${branch.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <branch.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{branch.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {branch.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      {branch.roles}+ Roles
                    </span>
                    <span className="text-sm text-muted-foreground group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;