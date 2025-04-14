"use client";

import { motion } from 'framer-motion'

interface FadeInSection {
  children: React.ReactNode; // The children to be wrapped inside the fade-in effect
}

const FadeInOnScroll: React.FC<FadeInSection> = ({ children }) => {
  return (
    <motion.div
      initial={{opacity: 0, y: 50}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.5, ease: 'easeInOut'}}
      viewport={{once: true, amount: 0.6}}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
