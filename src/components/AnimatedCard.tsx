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
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${glowColor} 25%, 
            transparent 50%, 
            ${glowColor} 75%, 
            transparent 100%)`,
          backgroundSize: "200% 100%",
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      >
        <motion.div
          animate={{
            backgroundPosition: isHovered ? ["0% 0%", "200% 0%"] : "0% 0%",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${glowColor} 25%, 
              transparent 50%, 
              ${glowColor} 75%, 
              transparent 100%)`,
            backgroundSize: "200% 100%",
          }}
        />
      </motion.div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 blur-xl pointer-events-none"
        animate={{
          opacity: isHovered ? 0.6 : 0,
        }}
        style={{
          background: `radial-gradient(circle at center, ${glowColor}, transparent 70%)`,
        }}
      />

      <Card className={`relative ${className} hover:shadow-2xl transition-all duration-500`}>
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;