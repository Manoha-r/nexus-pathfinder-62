import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search, Sparkles, Globe2, TrendingUp, Users, Award, Code, Server, Cpu, Cog, Building2, FlaskConical, Zap, Plane, BookOpen, Target, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import AnimatedCard from "@/components/AnimatedCard";
import ScrollReveal from "@/components/ScrollReveal";
import PageTransition from "@/components/PageTransition";
import PreloadAnimation from "@/components/PreloadAnimation";

// Tech city coordinates (latitude, longitude)
const techCities = [
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, color: "#00d4ff" },
  { name: "New York", lat: 40.7128, lng: -74.0060, color: "#00ff88" },
  { name: "London", lat: 51.5074, lng: -0.1278, color: "#ff00ff" },
  { name: "Berlin", lat: 52.5200, lng: 13.4050, color: "#ffee00" },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946, color: "#ff9900" },
  { name: "Shenzhen", lat: 22.5431, lng: 114.0579, color: "#ff0066" },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#aa00ff" },
  { name: "Singapore", lat: 1.3521, lng: 103.8198, color: "#00ffaa" },
  { name: "Seoul", lat: 37.5665, lng: 126.9780, color: "#0099ff" },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, color: "#00ccff" },
  { name: "Toronto", lat: 43.6532, lng: -79.3832, color: "#ff3366" },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333, color: "#66ff00" },
  { name: "Dubai", lat: 25.2048, lng: 55.2708, color: "#ffaa00" },
  { name: "Shanghai", lat: 31.2304, lng: 121.4737, color: "#cc00ff" },
  { name: "Austin", lat: 30.2672, lng: -97.7431, color: "#00ffcc" },
  { name: "Tel Aviv", lat: 32.0853, lng: 34.7818, color: "#ff6600" },
  { name: "Paris", lat: 48.8566, lng: 2.3522, color: "#ff66ff" },
  { name: "Amsterdam", lat: 52.3676, lng: 4.9041, color: "#66ffff" },
  { name: "Stockholm", lat: 59.3293, lng: 18.0686, color: "#ffff66" },
  { name: "Munich", lat: 48.1351, lng: 11.5820, color: "#66ff66" },
];

// Convert lat/lng to 3D coordinates
const latLngToVector3 = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

const CityMarker = ({ position, name, color }: { position: THREE.Vector3; name: string; color: string }) => {
  const labelPosition = position.clone().multiplyScalar(1.15);
  
  return (
    <group position={position}>
      {/* Glowing marker dot */}
      <mesh>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>
      {/* City name label */}
      <Text
        position={labelPosition}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.005}
        outlineColor="#000000"
        fontWeight="bold"
      >
        {name}
      </Text>
    </group>
  );
};

const Globe = () => {
  const textureLoader = new THREE.TextureLoader();
  
  // Load high-quality natural earth texture with realistic colors
  const earthTexture = textureLoader.load(
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  );
  
  // Load specular map for shiny ocean water
  const specularMap = textureLoader.load(
    'https://unpkg.com/three-globe/example/img/earth-water.png'
  );
  
  // Load bump map for terrain elevation
  const bumpMap = textureLoader.load(
    'https://unpkg.com/three-globe/example/img/earth-topology.png'
  );

  return (
    <group>
      {/* Natural bright lighting */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-3, 1, -2]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffeedd" />
      
      {/* Realistic Earth Sphere with natural colors */}
      <Sphere args={[2.2, 128, 128]}>
        <meshPhongMaterial
          map={earthTexture}
          specularMap={specularMap}
          bumpMap={bumpMap}
          bumpScale={0.02}
          shininess={25}
          specular="#88ccff"
        />
      </Sphere>
      
      {/* Atmosphere glow - soft blue */}
      <Sphere args={[2.3, 64, 64]}>
        <meshBasicMaterial
          color="#88ccff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Tech City Markers with glowing dots */}
      {techCities.map((city, index) => {
        const position = latLngToVector3(city.lat, city.lng, 2.24);
        return <CityMarker key={index} position={position} name={city.name} color={city.color} />;
      })}
    </group>
  );
};

const AnimatedCounter = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGlobe, setShowGlobe] = useState(true);

  const stats = [
    { label: "Students Guided", value: 10000, icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "Career Paths", value: 50, icon: TrendingUp, color: "from-purple-500 to-pink-500" },
    { label: "Success Rate", value: 95, icon: Award, suffix: "%", color: "from-green-500 to-emerald-500" },
    { label: "Engineering Branches", value: 8, icon: BookOpen, suffix: "+", color: "from-orange-500 to-red-500" },
  ];

  const features = [
    {
      title: "Smart Career Mapping",
      description: "AI-powered roadmaps tailored to your engineering branch",
      icon: Sparkles,
    },
    {
      title: "Industry Insights",
      description: "Real-time updates on trending skills and technologies",
      icon: TrendingUp,
    },
    {
      title: "Global Opportunities",
      description: "Explore career paths across different countries and industries",
      icon: Globe2,
    },
  ];

  const branches = [
    {
      id: "cse",
      name: "Computer Science",
      icon: Code,
      color: "rgba(59, 130, 246, 0.8)",
      gradient: "from-blue-500 to-cyan-500",
      roles: 45,
      description: "Software, AI, ML, Data Science",
    },
    {
      id: "it",
      name: "Information Technology",
      icon: Server,
      color: "rgba(168, 85, 247, 0.8)",
      gradient: "from-purple-500 to-pink-500",
      roles: 38,
      description: "Cloud, DevOps, Networking",
    },
    {
      id: "ece",
      name: "Electronics & Comm.",
      icon: Cpu,
      color: "rgba(34, 197, 94, 0.8)",
      gradient: "from-green-500 to-emerald-500",
      roles: 35,
      description: "Embedded, VLSI, IoT",
    },
    {
      id: "me",
      name: "Mechanical",
      icon: Cog,
      color: "rgba(249, 115, 22, 0.8)",
      gradient: "from-orange-500 to-red-500",
      roles: 32,
      description: "Design, Manufacturing, Robotics",
    },
    {
      id: "ce",
      name: "Civil",
      icon: Building2,
      color: "rgba(234, 179, 8, 0.8)",
      gradient: "from-yellow-500 to-amber-500",
      roles: 28,
      description: "Construction, Structural Design",
    },
    {
      id: "che",
      name: "Chemical",
      icon: FlaskConical,
      color: "rgba(20, 184, 166, 0.8)",
      gradient: "from-teal-500 to-cyan-500",
      roles: 25,
      description: "Process Engineering, R&D",
    },
    {
      id: "ee",
      name: "Electrical",
      icon: Zap,
      color: "rgba(139, 92, 246, 0.8)",
      gradient: "from-indigo-500 to-purple-500",
      roles: 30,
      description: "Power Systems, Control",
    },
    {
      id: "ae",
      name: "Aerospace",
      icon: Plane,
      color: "rgba(244, 63, 94, 0.8)",
      gradient: "from-rose-500 to-pink-500",
      roles: 22,
      description: "Aircraft Design, Propulsion",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Choose Your Branch",
      description: "Select your engineering discipline from 8+ branches",
      icon: Target,
    },
    {
      step: "2",
      title: "Explore Careers",
      description: "Browse 50+ career paths with detailed insights",
      icon: Search,
    },
    {
      step: "3",
      title: "Follow Roadmap",
      description: "Get step-by-step guidance with courses and projects",
      icon: BookOpen,
    },
    {
      step: "4",
      title: "Land Your Dream Job",
      description: "Build skills, gain experience, and succeed",
      icon: Rocket,
    },
  ];

  return (
    <>
      <PreloadAnimation type="home" onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <PageTransition>
          <div className="min-h-screen bg-background pt-16">
      {/* Hero Section with 3D Globe */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        
        {/* 3D Globe - Clickable to toggle */}
        <AnimatePresence>
          {showGlobe && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.85, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setShowGlobe(!showGlobe)}
            >
              <Canvas 
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                gl={{ antialias: true, alpha: true, precision: "highp" }}
                dpr={[2, 3]}
              >
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
                <Globe />
              </Canvas>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Toggle button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setShowGlobe(!showGlobe)}
          className="absolute top-8 right-8 z-20 bg-card/80 backdrop-blur-sm border border-border rounded-full p-3 hover:bg-card transition-colors"
        >
          <Globe2 className="h-6 w-6 text-primary" />
        </motion.button>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            Your Engineering Career Starts Here
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Navigate from your branch to your dream career with AI-powered guidance
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-2 max-w-2xl mx-auto mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search branches, roles, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <Button size="lg" className="px-8">
              Search
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <Link to="/branches">
              <Button size="lg" className="group">
                Explore Branches
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <AnimatedCard glowColor={stat.color}>
                  <div className="p-8 text-center">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-block bg-gradient-to-br ${stat.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                    <div className="text-4xl font-bold mb-2">
                      <AnimatedCounter end={stat.value} />
                      {stat.suffix || "+"}
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                How NextStep Works
              </h2>
              <p className="text-xl text-muted-foreground">
                Your journey to a successful career in 4 simple steps
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction="up">
                <div className="relative">
                  <AnimatedCard>
                    <div className="p-8 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + 0.3, type: "spring" }}
                        className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto"
                      >
                        {item.step}
                      </motion.div>
                      <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </AnimatedCard>
                  {index < howItWorks.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                      className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-accent"
                    />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Explore Engineering Branches
              </h2>
              <p className="text-xl text-muted-foreground">
                Find your perfect career path across diverse engineering disciplines
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((branch, index) => (
              <ScrollReveal key={branch.id} delay={index * 0.1} direction="up">
                <Link to={`/branch/${branch.id}`}>
                  <AnimatedCard glowColor={branch.color}>
                    <div className="p-6 h-full">
                      <motion.div
                        whileHover={{ rotate: 360 }}
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
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </AnimatedCard>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="text-center mt-12">
              <Link to="/branches">
                <Button size="lg" variant="outline" className="group">
                  View All Branches
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose NextStep?
              </h2>
              <p className="text-xl text-muted-foreground">
                Your personalized journey to engineering success
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} delay={index * 0.15} direction="up">
                <AnimatedCard>
                  <div className="p-8 h-full">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                      className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    >
                      <feature.icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </AnimatedCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedCard glowColor="rgba(168, 85, 247, 0.8)">
              <div className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <Rocket className="h-20 w-20 mx-auto mb-6 text-primary" />
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Start Your Journey?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of students who found their dream career path
                </p>
                <Link to="/branches">
                  <Button size="lg" className="text-lg px-8 py-6 group">
                    Get Started Now
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </AnimatedCard>
          </div>
        </ScrollReveal>
      </section>
      </div>
        </PageTransition>
      )}
    </>
  );
};

export default Index;