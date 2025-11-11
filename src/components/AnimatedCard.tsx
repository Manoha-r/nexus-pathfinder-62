import { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

const AnimatedCard = ({ children, className = "", glowColor = "rgba(59, 130, 246, 0.5)" }: AnimatedCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="relative"
    >
      {/* Animated border with mixed colors moving through */}
      <motion.div
        className="absolute -inset-[2px] rounded-xl pointer-events-none overflow-hidden"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from 0deg, 
              ${glowColor} 0deg,
              rgba(168, 85, 247, 0.8) 60deg,
              rgba(34, 197, 94, 0.8) 120deg, 
              rgba(249, 115, 22, 0.8) 180deg,
              rgba(59, 130, 246, 0.8) 240deg,
              rgba(234, 179, 8, 0.8) 300deg,
              ${glowColor} 360deg)`,
          }}
        />
        <div className="absolute inset-[2px] bg-card rounded-xl" />
      </motion.div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 blur-2xl pointer-events-none"
        animate={{
          opacity: isHovered ? 0.7 : 0,
        }}
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 60%)`,
        }}
      />

      {/* Pulse glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 blur-md pointer-events-none"
        animate={{
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
          scale: isHovered ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 50%)`,
        }}
      />

      <Card className={`relative ${className} hover:shadow-2xl hover:shadow-[${glowColor}]/20 transition-all duration-500`}>
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;