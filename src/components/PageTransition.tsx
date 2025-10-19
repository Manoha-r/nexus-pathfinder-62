import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, rotateX: -2 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.98, rotateX: 2 }}
      transition={{
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      style={{ transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;