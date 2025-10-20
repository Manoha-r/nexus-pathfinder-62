import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    setIsDark(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const newTheme = isDark ? "light" : "dark";
    
    // Create cascading overlay effect element by element
    const allElements = Array.from(document.querySelectorAll('body *'));
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 200vmax;
      height: 200vmax;
      border-radius: 50%;
      background: ${isDark ? "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 50%, transparent 100%)" : "radial-gradient(circle, rgba(10,15,36,0.95) 0%, rgba(10,15,36,0.8) 50%, transparent 100%)"};
      z-index: 9999;
      pointer-events: none;
      transition: transform 2.5s cubic-bezier(0.4, 0, 0.2, 1);
    `;
    document.body.appendChild(overlay);

    // Cascade through elements
    allElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('theme-transitioning');
      }, (index / allElements.length) * 1500);
    });

    // Expand overlay
    requestAnimationFrame(() => {
      overlay.style.transform = "translate(-50%, -50%) scale(1)";
    });

    // Apply theme change
    setTimeout(() => {
      setIsDark(!isDark);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", !isDark);
    }, 800);

    // Cleanup
    setTimeout(() => {
      overlay.remove();
      allElements.forEach(el => {
        el.classList.remove('theme-transitioning');
      });
      setIsTransitioning(false);
    }, 3000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      disabled={isTransitioning}
      className="rounded-full relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Moon className="h-5 w-5 drop-shadow-[0_0_10px_rgba(147,197,253,0.9)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Sun className="h-5 w-5 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Pulsing glow */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: isDark 
            ? "radial-gradient(circle, rgba(147,197,253,0.5) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251,191,36,0.5) 0%, transparent 70%)",
        }}
      />
      
      {/* Ripple on transition */}
      {isTransitioning && (
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1.5 }}
          className={`absolute inset-0 rounded-full ${
            isDark ? "bg-white" : "bg-black"
          }`}
        />
      )}
    </Button>
  );
};

export default ThemeToggle;