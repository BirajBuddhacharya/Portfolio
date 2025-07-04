'use client';

import Image from "next/image";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ui/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current && imageRef.current) {
        gsap.to(textRef.current, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current, // use image section as scroll zone
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(imageRef.current, {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative w-full grid grid-cols-1 sm:grid-cols-2 sm:gap-0 gap-10 justify-items-center min-h-[100vh]">
      {/* Glowing backgrounds */}
      <div className="bg-accent h-32 w-32 absolute top-[-6rem] left-0 rounded-full blur-3xl opacity-50"></div>
      <div className="bg-primary h-32 w-32 absolute right-0 bottom-[-6rem] rounded-full blur-3xl opacity-50"></div>

      {/* Text Section */}
      <div className="flex flex-col text-left lg:px-20 px-10 justify-center" ref={textRef}>
        <h2 className="font-heading text-4xl font-semibold my-5">
          About <span className="text-primary">Me!</span>
        </h2>
        <p className="text-base font-extralight">
          Software Engineer. Skilled in Python and machine learning. Passionate about creating impactful tech solutions and eager to connect with like-minded
          professionals.
        </p>
      </div>

      {/* Image Section */}
      <div className="px-6 flex items-center justify-center" ref={imageRef}>
        <div className="relative h-[350px]">
          <Image
            className="relative z-10 rounded-2xl object-cover"
            src="/img/aboutMe.png"
            alt="About Me Image"
            width={290}
            height={300}
          />
          {/* <div className="absolute left-4 top-4 w-full h-full border-4 border-primary z-0 rounded-2xl"></div> */}
        </div>
      </div>
    </section >
  );
}

export default About;
