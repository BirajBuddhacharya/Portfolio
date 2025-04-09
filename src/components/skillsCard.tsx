'use client';

import { useState } from "react";
import { motion } from 'framer-motion'

type SkillsCardProps = {
  img: string;
  content: string;
  glowColor: string;
};

const SkillsCard = ({ img, content, glowColor }: SkillsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center w-20 gap-4 ">
      <motion.div
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative hover:cursor-pointer"
        onMouseEnter={() => setIsHovered(true)} // Set hover state
        onMouseLeave={() => setIsHovered(false)} // Reset hover state"
      >
        <div
          className="absolute top-1/2 left-1/2 transform transition-all duration-200 -translate-x-1/2 -translate-y-1/2 w-[8rem] h-[8rem] blur-3xl rounded-full z-10 opacity-70"
          style={{ backgroundColor: isHovered ? glowColor : "transparent" }}
        ></div>

        <img
          src={img}
          alt="Skills image"
          className="h-auto w-full relative z-20"
        />
      </motion.div>
      <div className="text-sm text-center">{content}</div>
    </div>
  );
};

export default SkillsCard;