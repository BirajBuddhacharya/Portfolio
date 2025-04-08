import FooterCard from "../components/footerCard";
import phone from "/public/icons/phone.svg";
import email from "/public/icons/email.svg";
import address from "/public/icons/address.svg";
import githubLogo from "/public/icons/github.png";
import linkedinLogo from "/public/icons/linkedin.png";
import ContactForm from "../components/contactForm";
import FadeInSection from "../components/fadeIn"; // Make sure the path is correct
import Image from 'next/image'

function Footer() {
  const github: string = "https://www.github.com/BirajBuddhacharya";
  const linkedin: string = 'https://www.linkedin.com/in/biraj-buddhacharya'
  return (
    <FadeInSection idTrack="contact">
      <footer className="flex flex-col gap-5" id="contact">
        <h1 className="text-3xl font-bold">
          Lets <span className="text-primary">Connect!</span>
        </h1>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="px-20 flex flex-col justify-center items-center lg:items-start">
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
              <a href={github} target="blank">
                <Image
                  src={githubLogo}
                  alt="github logo"
                  className="h-6 w-auto"
                />
              </a>
              <a
                href={linkedin}
                target="blank"
              >
                <Image
                  src={linkedinLogo}
                  alt="Linked in logo"
                  className="h-7 w-auto"
                />
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </footer>
    </FadeInSection>
  );
}

export default Footer;
