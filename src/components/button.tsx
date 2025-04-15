'use client';
import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  content: string;
  href: string;
  className?: string;
}

const buttonAnimationSpeed = 0.3;

const buttonVariants = {
  initial: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  hover: {
    backgroundColor: 'rgba(255, 112, 105, 1)',
    scale: 1.05,
    transition: { duration: buttonAnimationSpeed },
  },
};

const textVariantsA = {
  initial: { y: 0, opacity: 1 },
  hover: {
    y: -10,
    opacity: 0,
    transition: { duration: buttonAnimationSpeed },
  },
};

const textVariantsB = {
  initial: { y: 10, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: buttonAnimationSpeed },
  },
};

function Button({ content, href, className }: ButtonProps) {
  return (
    <motion.a
      href={href}
      target="blank"
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.9 }}
      className={`h-full flex justify-center items-center sm:h-10 sm:w-30 rounded-full sm:border-2 border-primary hover:cursor-pointer sm:text-base text-sm font-bold ${className}`}
    >
      <div className="relative h-full w-full flex justify-center items-center">
        <motion.span
          variants={textVariantsA}
          className="absolute"
        >
          {content}
        </motion.span>
        <motion.span
          variants={textVariantsB}
          className="absolute"
        >
          {content}
        </motion.span>
      </div>
    </motion.a>
  );
}

export default Button;
