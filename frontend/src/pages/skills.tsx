import SkillsCard from "../components/skillsCard";
import reactLogo from "../assets/icons/react.svg";
import djangoLogo from "../assets/icons/django.svg";
import dockerLogo from "../assets/icons/docker.svg";
import tailwindLogo from "../assets/icons/tailwindcss.svg";
import tensorflowLogo from "../assets/icons/tensorflow.svg";

function Skills() {
  return (
    <section
      id="skills"
      className="w-full flex items-center justify-center gap-12"
    >
      <div className="px-10">
        <h3 className="text-2xl">
          <span className="text-primary">10+ </span>
          <br /> Skills
        </h3>
      </div>
      <div className="flex gap-x-40 gap-y-20 flex-wrap justify-center items-center">
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
  );
}
export default Skills;
