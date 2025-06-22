"use client";
import React, { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/components/lib/utils";

export const Cover = ({
  children,
  className,
  hovered
}: {
  children?: React.ReactNode;
  className?: string;
  hovered: boolean; // React state type
}) => {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative group/cover inline-block bg-transparent px-2 py-2  transition duration-200 rounded-sm"
    >
      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.8 : 1,
          x: hovered ? [0, -20, 20, -20, 20, 0] : 0,
          y: hovered ? [0, 20, -20, 20, -20, 0] : 0,
        }}
        exit={{
          filter: "none",
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.2,
          x: {
            duration: 0.2,
            repeat: Infinity,
            repeatType: "loop",
          },
          y: {
            duration: 0.3,
            repeat: Infinity,
            repeatType: "loop",
          },
          scale: {
            duration: 0.1,
          },
          filter: {
            duration: 0.2,
          },
        }}
        className={cn(
          "dark:text-white inline-block text-neutral-900 relative z-20 group-hover/cover:text-white transition duration-200",
          className
        )}
      >
        {children}
      </motion.span>
    </div>
  );
};

