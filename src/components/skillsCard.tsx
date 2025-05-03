'use client';

import { useState } from "react";
import { motion } from 'framer-motion'
import Image from 'next/image'

type SkillsCardProps = {
  img: string;
  content: string;
  glowColor: string;
};

const SkillsCard = ({ img, content, glowColor }: SkillsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex flex-col items-center w-20 gap-4"
      onMouseEnter={() => setIsHovered(true)} // Set hover state
      onMouseLeave={() => setIsHovered(false)} // Reset hover state
    >
      <div className="relative hover:cursor-pointer">
      <div
        className="absolute top-1/2 left-1/2 transform transition-all duration-200 -translate-x-1/2 -translate-y-1/2 w-[8rem] h-[8rem] blur-3xl rounded-full z-10 opacity-70"
        style={{ backgroundColor: isHovered ? glowColor : "transparent" }}
      ></div>

      <Image
        src={img}
        alt="Skills image"
        width={100}
        height={100}
        className="h-auto w-full relative z-20"
      />
      </div>
      <div className="text-sm text-center">{content}</div>
    </motion.div>
  );
};

export default SkillsCard;