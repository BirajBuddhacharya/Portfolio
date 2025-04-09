import Image from "next/image";
import { motion } from 'framer-motion'

function Nav() {
  return (
    <header>
      <nav className="relative w-full h-10 flex justify-center sm:justify-between z-10 px-6 text-white">
        <div className="h-full w-12 sm:block hidden">
          <Image src="/img/logo.png" alt="Logo" width={100} height={100} />
        </div>
        <div className=" h-full flex gap-4 sm:gap-10 font-semibold lg:gap-16 items-center">
          <motion.a whileHover={{ scale: 1.5 }} className=" hover:text-primary sm:text-base text-sm" href="#home">
            Home
          </motion.a>
          <a className=" hover:text-primary sm:text-base text-sm" href="#about">
            About
          </a>
          <a className=" hover:text-primary sm:text-base text-sm" href="#projects">
            Projects
          </a>
          <a className=" hover:text-primary sm:text-base text-sm" href="#skills">
            Skills
          </a>
          <a className=" hover:text-primary sm:text-base text-sm" href="#contact">
            Contact
          </a>
        </div>
        <a href='/resume.pdf' target='blank' className="h-full flex items-center px-4 py-0 sm:px-7 sm:py-2 rounded-full sm:border-2 border-primary hover:bg-primary transition delay-100 hover:cursor-pointer sm:text-base text-sm font-bold">
          <span className="">Resume</span>
        </a>
      </nav>
    </header>
  );
}

export default Nav;
