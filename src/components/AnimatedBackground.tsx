import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  shape: 'cube' | 'sphere' | 'pyramid' | 'torus';
}

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      });
    }

    setParticles(newParticles);

    // Generate 3D floating shapes
    const shapeCount = 8;
    const newShapes: FloatingShape[] = [];
    const shapeTypes: FloatingShape['shape'][] = ['cube', 'sphere', 'pyramid', 'torus'];

    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 40,
        rotation: Math.random() * 360,
        duration: Math.random() * 25 + 20,
        delay: Math.random() * 5,
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      });
    }

    setShapes(newShapes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 -right-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl"
      />

      {/* 3D Floating Shapes */}
      {shapes.map((shape) => {
        const getShapeElement = () => {
          const baseClasses = "absolute backdrop-blur-sm border border-primary/20";
          const style = {
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          };

          switch (shape.shape) {
            case 'cube':
              return (
                <motion.div
                  key={`${shape.id}-cube`}
                  className={`${baseClasses} bg-gradient-to-br from-primary/10 to-accent/10`}
                  style={style}
                  initial={{ rotateX: shape.rotation, rotateY: 0, opacity: 0 }}
                  animate={{
                    rotateX: [shape.rotation, shape.rotation + 360],
                    rotateY: [0, 360],
                    y: [0, -50, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: shape.duration,
                    repeat: Infinity,
                    delay: shape.delay,
                    ease: "easeInOut",
                  }}
                />
              );
            case 'sphere':
              return (
                <motion.div
                  key={`${shape.id}-sphere`}
                  className={`${baseClasses} rounded-full bg-gradient-to-br from-accent/10 to-primary/10`}
                  style={style}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    x: [0, 30, 0],
                    y: [0, -40, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: shape.duration,
                    repeat: Infinity,
                    delay: shape.delay,
                    ease: "easeInOut",
                  }}
                />
              );
            case 'pyramid':
              return (
                <motion.div
                  key={`${shape.id}-pyramid`}
                  className={`${baseClasses} bg-gradient-to-t from-primary/10 to-transparent`}
                  style={{
                    ...style,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  }}
                  initial={{ rotateZ: shape.rotation, opacity: 0 }}
                  animate={{
                    rotateZ: [shape.rotation, shape.rotation + 360],
                    y: [0, -60, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: shape.duration,
                    repeat: Infinity,
                    delay: shape.delay,
                    ease: "easeInOut",
                  }}
                />
              );
            case 'torus':
              return (
                <motion.div
                  key={`${shape.id}-torus`}
                  className="absolute"
                  style={{
                    width: shape.size,
                    height: shape.size,
                    left: `${shape.x}%`,
                    top: `${shape.y}%`,
                  }}
                  initial={{ rotateY: 0, opacity: 0 }}
                  animate={{
                    rotateY: [0, 360],
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: shape.duration,
                    repeat: Infinity,
                    delay: shape.delay,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-full h-full rounded-full border-8 border-primary/20 bg-transparent" />
                  <div className="absolute inset-[30%] rounded-full bg-background" />
                </motion.div>
              );
          }
        };

        return getShapeElement();
      })}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            opacity: 0,
          }}
          animate={{
            y: [`${particle.y}vh`, `${particle.y - 30}vh`, `${particle.y}vh`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]" />
    </div>
  );
};

export default AnimatedBackground;
