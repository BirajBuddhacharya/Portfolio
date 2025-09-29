'use client';

import SkillsCard from "../components/skillsCard";
import { useRef } from "react";
import { useInView } from "framer-motion";
import CountUp from "@/components/ui/countUp";

const skillsData = [
  {
    img: "/icons/tensorflow.svg",
    content: "Deep Learning with TensorFlow",
    glowColor: "#F8BF3C"
  },
  {
    img: "/icons/django.svg",
    content: "Backend Development with Django",
    glowColor: "#2BA977"
  },
  {
    img: "/icons/react.svg",
    content: "Frontend Development with React",
    glowColor: "#53C1DE"
  },
  {
    img: "/icons/docker.svg",
    content: "Contanarization with Docker",
    glowColor: "#1D63ED"
  },
  {
    img: "/icons/tailwindcss.svg",
    content: "Styling with TailwindCSS",
    glowColor: "#2197BC"
  }
];

function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
      <section
        id="skills"
        className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-12"
        ref={ref}
      >
        <div className="px-10">
          <h3 className="text-4xl font-bold text-center ">

            <span className="text-primary">
              <CountUp
                from={0}
                to={10}
                separator=","
                direction="up"
                duration={0.05}
                className="count-up-text"
              />+ </span>
            <span className="block mt-3">Skills</span>
          </h3>
        </div>
        <div className="lg:col-span-2 flex gap-x-16 sm:gap-x-40 gap-y-20 flex-wrap justify-center items-center">
          {skillsData.map((skill, index) => (
            <SkillsCard
              key={index}
              img={skill.img}
              content={skill.content}
              glowColor={skill.glowColor}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </section>
  );
}

export default Skills;
