'use client';

import { motion } from "framer-motion";
import Nav from "../components/Nav";
import mainPic from "/public/img/mainPic.png";
import Image from "next/image";

function Home() {
  return (
    <section id="home" className="w-full h-full flex flex-col overflow-hidden">
      <div
        id="radientEffect"
        className="h-[50rem] w-[50rem] bg-primary rounded-full -translate-x-1/2 -translate-y-1/2  absolute top-[-20rem] left-1/2 blur-3xl opacity-90 z-10 shadow-[0_0_10px_10px_black]"
      ></div>
      <Nav />
      <div id="hero" className="w-full h-full grid grid-cols-1 sm:grid-cols-2 justify-items-center py-4 lg:py-16">
        <div className="px-16 w-full flex items-center justify-center row-start-2 sm:row-start-auto">
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="font-semibold" style={{ textAlign: "left" }}>
              Hello I'm,
            </h1>
            <div className="inline">
              <h1 className="text-primary typewrite font-semibold" style={{ textAlign: "left" }}>
                <span>Biraj</span>
              </h1>
            </div>
            <p className="text-neutral-light text-sm tracking-tighter my-2">
              Software Engineer and AI Engineer aiming to
              solve real world problem with tech.
            </p>
            <div className="flex justify-center items-center gap-6 mt-8">
              <motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="bg-primary border-primary border-2 text-white rounded-md px-5 py-1 hover:cursor-pointer hover:text-white"
                href="#contact"
              >
                Contact
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="border-primary border-2 rounded-md px-5 py-1 text-white hover:cursor-pointer hover:text-white"
                href="#projects"
              >
                Projects
              </motion.a>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="flex-grow flex items-center justify-center row-start-1 sm:row-start-auto"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src={mainPic}
            alt="Profile Picture"
            className="w-[28rem] h-[31rem]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Home;
