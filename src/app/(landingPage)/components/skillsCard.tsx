'use client';

import { useState } from "react";
import { motion } from 'framer-motion'
import Image from 'next/image'

type SkillsCardProps = {
  img: string;
  content: string;
  glowColor: string;
  index: number;
  isInView: boolean;
};

const SkillsCard = ({ img, content, glowColor, index, isInView }: SkillsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.15,
          duration: 0.5,
          ease: "easeOut"
        }
      } : {}}
      whileHover={{ 
        scale: 1.1,
        transition: {
          duration: 0.2,
          ease: "easeInOut"
        }
      }}
      className="flex flex-col items-center w-20 gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative hover:cursor-pointer"
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[8rem] h-[8rem] blur-3xl rounded-full z-10 opacity-70"
          animate={{
            backgroundColor: isHovered ? glowColor : "transparent",
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>

        <Image
          src={img}
          alt="Skills image"
          width={100}
          height={100}
          className="h-auto w-full relative z-20"
        />
      </motion.div>
      <div className="text-sm text-center">{content}</div>
    </motion.div>
  );
};

export default SkillsCard;