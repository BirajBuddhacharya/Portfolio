'use client';
import FooterCard from "../components/footerCard";
import phone from "/public/icons/phone.svg";
import email from "/public/icons/email.svg";
import address from "/public/icons/address.svg";
import githubLogo from "/public/icons/github.png";
import linkedinLogo from "/public/icons/linkedin.png";
import ContactForm from "../components/contactForm";
import Image from 'next/image'
import { motion } from 'framer-motion'
import SplitText from "@/components/ui/splitText";

function Footer() {
  const github: string = "https://www.github.com/BirajBuddhacharya";
  const linkedin: string = 'https://www.linkedin.com/in/biraj-buddhacharya'
  return (
    <footer className="flex flex-col gap-5" id="contact">
      <h1 className="text-3xl font-bold">
        <SplitText
          text="Lets "
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        {' '}
        <span className="text-primary">
          <SplitText
        text="Connect!"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
          />
        </span>
      </h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 3xl:gap-0">
        <div className="px-20 flex flex-col justify-center items-center">
          <FooterCard
            img={phone}
            heading="Call me"
            content="+977 9841056800"
          />
          <FooterCard
            img={email}
            heading="Email me"
            content="birajbuddhacharya@gmail.com"
          />
          <FooterCard
            img={address}
            heading="Address"
            content="Tripureshwor, Kathmandu"
          />
          <div className="w-full flex justify-center p-2 gap-4 items-center my-2">
            <motion.a href={github} target="blank" whileHover={{ scale: 1.3 }}>
              <Image
                src={githubLogo}
                alt="github logo"
                className="h-6 w-auto"
              />
            </motion.a>
            <motion.a
              href={linkedin}
              target="blank"
              whileHover={{ scale: 1.3 }}
            >
              <Image
                src={linkedinLogo}
                alt="Linked in logo"
                className="h-7 w-auto"
              />
            </motion.a>
          </div>
        </div>
        <ContactForm />
      </div>
    </footer>
  );
}

export default Footer;
