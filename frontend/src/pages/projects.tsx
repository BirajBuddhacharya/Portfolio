import FadeInSection from "../components/fadeIn"; // Make sure the path is correct
import "../assets/css/spinningProjects.css";
import rightArrow from "../assets/icons/rightArrow.png";
import { useState } from "react";

function Projects() {
  const [rotation, setRotation] = useState(0);

  const handleRightClick = () => {
    setRotation(rotation - 45);
  };
  const handleLeftClick = () => {
    setRotation(rotation + 45);
  };

  return (
    <FadeInSection idTrack="projects">
      <section id="projects" className="w-full flex flex-col gap-4">
        <h1 className="text-3xl font-bold m-10">
          My <br />
          <span className="text-primary">Projects</span>
        </h1>
        <div className="flex justify-center items-center gap-10">
          <button
            className="p-3 rotate-180 bg-transparent border-primary rounded-full"
            onClick={handleLeftClick}
          >
            <div
              className="h-6 w-6"
              style={{
                backgroundImage: `url(${rightArrow})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </button>
          <button
            className="p-3 rotate-180 bg-transparent border-primary rounded-full"
            onClick={handleRightClick}
          >
            <div
              className="h-6 w-6 rotate-180"
              style={{
                backgroundImage: `url(${rightArrow})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </button>
        </div>
        <div id="roundedDivWrapper">
          <div className="relative">
            <div className="absolute top-1/2 w-[61rem] h-[61rem] blur-3xl bg-primary opacity-90 shadow-[0_0_30px_60px_rgba(255,255,255)] rounded-full"></div>
            <div
              id="roundedDiv"
              className=""
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div>
                <div id="spinningCard1" className="spinningCard"></div>
              </div>
              <div>
                <div id="spinningCard2" className="spinningCard"></div>
              </div>
              <div>
                <div id="spinningCard3" className="spinningCard"></div>
              </div>
              <div>
                <div id="spinningCard4" className="spinningCard"></div>
              </div>
              <div>
                {/* <div id="spinningCard5" className="spinningCard"></div> */}
              </div>
              <div>
                <div id="spinningCard6" className="spinningCard"></div>
              </div>
              <div>
                <div id="spinningCard7" className="spinningCard"></div>
              </div>
              <div>
                <div id="spinningCard8" className="spinningCard"></div>
              </div>
              <div>
                <div id="spinningCard9" className="spinningCard"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default Projects;
