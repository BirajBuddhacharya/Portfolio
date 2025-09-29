"use client";

import Image from "next/image";
import { motion } from 'framer-motion'
import Button from "./button";

function Nav() {
  return (
    <header>
      <nav className="relative w-full h-10 flex justify-center sm:justify-between z-10 px-6 text-white">
        <div className="h-full w-12 sm:block hidden">
          <Image src="/img/logo.png" alt="Biraj Buddhacharya Logo" width={100} height={100} priority/>
        </div>
        <div className=" h-full flex gap-4 sm:gap-10 font-semibold lg:gap-16 items-center">
          <motion.a
            whileHover={{ scale: 1.4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="sm:text-base text-sm hidden sm:inline"
            href="#home"
          >
            Home
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="sm:text-base text-sm"
            href="#about"
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="sm:text-base text-sm"
            href="#projects"
          >
            Projects
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="sm:text-base text-sm"
            href="#skills"
          >
            Skills
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="sm:text-base text-sm"
            href="#contact"
          >
            Contact
          </motion.a>
        </div>
        <Button content="Resume" href="/resume.pdf" className="mx-10 sm:mx-4" />
      </nav>
    </header>
  );
}

export default Nav;
