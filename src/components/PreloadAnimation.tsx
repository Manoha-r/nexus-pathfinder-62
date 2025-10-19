import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Code, Info, Mail, BookOpen, Building2 } from "lucide-react";

interface PreloadAnimationProps {
  type: "home" | "branches" | "about" | "contact" | "roadmap" | "branchDetail";
  onComplete: () => void;
}

const PreloadAnimation = ({ type, onComplete }: PreloadAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const animations = {
    home: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      >
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Center logo animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 60px rgba(168, 85, 247, 0.6)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <Sparkles className="w-20 h-20 text-primary" />
          </motion.div>
        </motion.div>

        {/* Text animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-1/3 text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          NextStep
        </motion.div>
      </motion.div>
    ),

    branches: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      >
        {/* Cards sliding in diagonally */}
        <div className="grid grid-cols-4 gap-4 rotate-12">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: -100,
                y: -100,
                rotateZ: -45,
              }}
              animate={{
                opacity: [0, 1, 0],
                x: 0,
                y: 0,
                rotateZ: 0,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
              style={{
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute"
        >
          <Building2 className="w-16 h-16 text-primary" />
        </motion.div>
      </motion.div>
    ),

    about: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      >
        {/* Writing text effect */}
        <div className="text-center">
          <motion.h1
            className="text-6xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {["About", "NextStep"].map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4">
                {word.split("").map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: wordIndex * 0.5 + charIndex * 0.05,
                      duration: 0.3,
                    }}
                    className="inline-block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Expanding circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
          >
            <Info className="w-12 h-12 text-white" />
          </motion.div>
        </div>
      </motion.div>
    ),

    contact: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
      >
        {/* Network connection effect */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8;
            const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
            const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
            
            return (
              <motion.g key={i}>
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />
                <motion.circle
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="8"
                  fill="hsl(var(--primary))"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: i * 0.15 + 0.5,
                    duration: 0.3,
                  }}
                />
              </motion.g>
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Mail className="w-20 h-20 text-primary" />
        </motion.div>
      </motion.div>
    ),

    roadmap: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      >
        {/* Pathway building animation */}
        <div className="relative w-96 h-96">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `${i * 20}%` }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: i * 0.3,
                  duration: 0.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                style={{
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                }}
              >
                <span className="text-white font-bold text-xl">{i + 1}</span>
              </motion.div>
              
              {i < 4 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{
                    delay: i * 0.3 + 0.3,
                    duration: 0.3,
                  }}
                  className="absolute left-1/2 -translate-x-1/2 top-16 w-1 h-20 bg-gradient-to-b from-primary to-accent origin-top"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-1/4"
        >
          <BookOpen className="w-16 h-16 text-primary" />
        </motion.div>
      </motion.div>
    ),

    branchDetail: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      >
        {/* Code blocks appearing */}
        <div className="relative w-full max-w-2xl px-8">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, rotateY: 90 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                delay: i * 0.2,
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className="mb-4 p-4 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm"
              style={{
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
              }}
            >
              <div className="h-4 bg-primary/50 rounded w-3/4 mb-2" />
              <div className="h-4 bg-accent/50 rounded w-1/2" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute"
        >
          <Code className="w-20 h-20 text-primary" />
        </motion.div>
      </motion.div>
    ),
  };

  return (
    <AnimatePresence>
      {isVisible && animations[type]}
    </AnimatePresence>
  );
};

export default PreloadAnimation;