import SkillsCard from "../components/skillsCard";
import FadeInSection from "../components/fadeIn"; // Make sure the path is correct

// global vairables 
const reactLogo = "/icons/react.svg";
const djangoLogo = "/icons/django.svg";
const dockerLogo = "/icons/docker.svg";
const tailwindLogo = "/icons/tailwindcss.svg";
const tensorflowLogo = "/icons/tensorflow.svg";

function Skills() {
  return (
    <FadeInSection idTrack="skills">
      <section
        id="skills"
        className="w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center gap-12"
      >
        <div className="px-10">
          <h3 className="text-2xl font-bold">
            <span className="text-primary">10+ </span>
            <br /> Skills
          </h3>
        </div>
        <div className="lg:col-span-2 flex gap-x-16 sm:gap-x-40 gap-y-20 flex-wrap justify-center items-center">
          <SkillsCard
            img={tensorflowLogo}
            content="Deep Learning with TensorFlow"
            glowColor="#F8BF3C"
          />
          <SkillsCard
            img={djangoLogo}
            content="Backend Development with Django"
            glowColor="#2BA977"
          />
          <SkillsCard
            img={reactLogo}
            content="Frontend Development with React"
            glowColor="#53C1DE"
          />
          <SkillsCard
            img={dockerLogo}
            content="Contanarization with Docker"
            glowColor="#1D63ED"
          />
          <SkillsCard
            img={tailwindLogo}
            content="Styling with TailwindCSS"
            glowColor="#2197BC"
          />
        </div>
      </section>
    </FadeInSection>
  );
}
export default Skills;
