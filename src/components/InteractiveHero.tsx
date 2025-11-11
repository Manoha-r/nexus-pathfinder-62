import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface FloatingCard {
  id: number;
  title: string;
  icon: string;
  x: number;
  y: number;
  rotation: number;
}

const InteractiveHero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
  const y = useSpring(useTransform(mouseY, [0, window.innerHeight], [-20, 20]), springConfig);

  const [cards] = useState<FloatingCard[]>([
    { id: 1, title: "AI", icon: "🤖", x: 15, y: 20, rotation: -15 },
    { id: 2, title: "Code", icon: "💻", x: 75, y: 15, rotation: 12 },
    { id: 3, title: "Design", icon: "🎨", x: 10, y: 70, rotation: 8 },
    { id: 4, title: "Cloud", icon: "☁️", x: 80, y: 65, rotation: -10 },
    { id: 5, title: "Data", icon: "📊", x: 45, y: 10, rotation: 5 },
    { id: 6, title: "Mobile", icon: "📱", x: 85, y: 40, rotation: -8 },
  ]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div className="relative w-full">
      {/* Floating cards */}
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          style={{
            x: useTransform(x, (value) => value * (index % 2 === 0 ? 1 : -1) * 0.5),
            y: useTransform(y, (value) => value * (index % 2 === 0 ? -1 : 1) * 0.5),
            left: `${card.x}%`,
            top: `${card.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [card.rotation, card.rotation + 5, card.rotation],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          className="absolute hidden lg:block"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: card.rotation + 15 }}
            className="bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-4 shadow-lg hover:shadow-primary/20 transition-shadow cursor-pointer"
          >
            <div className="text-4xl mb-2">{card.icon}</div>
            <div className="text-sm font-semibold text-foreground">{card.title}</div>
          </motion.div>
        </motion.div>
      ))}

      {/* Central magnetic element */}
      <motion.div
        style={{ x, y }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="relative"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-20 blur-2xl" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        {cards.map((card, index) => (
          <motion.line
            key={`line-${card.id}`}
            x1="50%"
            y1="50%"
            x2={`${card.x}%`}
            y2={`${card.y}%`}
            stroke="url(#gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default InteractiveHero;
