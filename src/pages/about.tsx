'use client';

import FadeInSection from "../components/fadeIn"; // Make sure the path is correct
import Image from "next/image"

function About() {
  return (
    <FadeInSection>
      <section id="about" className="w-full grid grid-cols-1 sm:grid-cols-2 sm:gap-0 gap-10 justify-items-center relative">
        <div className="bg-accent h-32 w-32 absolute top-[-6rem] left-0 rounded-full blur-3xl opacity-50"></div>
        <div className="bg-primary h-32 w-32 absolute right-0 bottom-[-6rem] rounded-full blur-3xl opacity-50"></div>
        <div className="flex flex-col text-left lg:px-20 px-10">
          <div className="font-heading text-4xl font-semibold my-5">
            About <span className="text-primary">Me!</span>
          </div>
          <p className="text-base text-left font-extralight">
            Software Engineer. Skilled in Python and machine learning. Passionate about creating impactful tech solutions and eager to connect with like-minded
            professionals.
          </p>
        </div>
        <div className="px-6">
          <div className="relative">
            <Image
              className="relative bg-cover bg-no-repeat z-10 rounded-2xl"
              src="/img/aboutMe.png" 
              alt="About Me Image"
              width={290} // Adjust width as per your design
              height={300}
            />
            <div className="absolute left-4 top-4 w-full h-full border-4 border-primary z-0 rounded-2xl"></div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default About;
