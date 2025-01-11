import FadeInSection from "../components/fadeIn"; // Make sure the path is correct
import "../assets/css/spinningProjects.css";
import rightArrow from "../assets/icons/rightArrow.png";
import { useState } from "react";
import dockerLogo from "../assets/icons/docker.svg";
import SpinningCard from "../components/SpinningCard";

function Projects() {
  const [rotation, setRotation] = useState(0);
  const [minRotation, maxRotation] = [-45, 45];

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
          <div className="h-12 w-12">
            {rotation < maxRotation && (
              <button
                className="h-full w-full p-3 rotate-180 bg-transparent border-primary rounded-full"
                onClick={handleLeftClick}
              >
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `url(${rightArrow})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </button>
            )}
          </div>
          <div className="h-12 w-12">
            {rotation > minRotation && (
              <button
                className="h-full w-full p-3 rotate-180 bg-transparent border-primary rounded-full"
                onClick={handleRightClick}
              >
                <div
                  className="h-full w-full rotate-180"
                  style={{
                    backgroundImage: `url(${rightArrow})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-[30rem] flex justify-center overflow-y-clip">
          <div className="relative">
            <div className="absolute top-1/2 w-[61rem] h-[61rem] blur-3xl bg-primary opacity-90 shadow-[0_0_30px_60px_rgba(255,255,255)] rounded-full"></div>
            <div
              id="roundedDiv"
              className="h-[67rem] w-[67rem] relative top-[40%] rounded-full grid grid-cols-3 grid-rows-3 gap-[6rem] ease delay-500"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="relative">
                <SpinningCard
                  CardId="spinningCard1"
                  heading="ABC BOOKS"
                  discription="ecommerce website"
                  buttonLink="https://www.github.com/BirajBuddhacharya/ABC-Books"
                  imgUrl={dockerLogo}
                />
              </div>
              <div className="relative">
                <SpinningCard
                  CardId="spinningCard2"
                  heading="ABC BOOKS"
                  discription="ecommerce website"
                  buttonLink="https://www.github.com/BirajBuddhacharya/ABC-Books"
                  imgUrl={dockerLogo}
                />
              </div>
              <div className="relative">
                <SpinningCard
                  CardId="spinningCard3"
                  heading="ABC BOOKS"
                  discription="ecommerce website"
                  buttonLink="https://www.github.com/BirajBuddhacharya/ABC-Books"
                  imgUrl={dockerLogo}
                />
              </div>
              <div className="relative">
                {/* <div id="spinningCard4" className="spinningCard"></div> */}
              </div>
              <div className="relative">
                {/* <div id="spinningCard5" className="spinningCard"></div> */}
              </div>
              <div className="relative">
                {/* <div id="spinningCard6" className="spinningCard"></div> */}
              </div>
              <div className="relative">
                {/* <div id="spinningCard7" className="spinningCard"></div> */}
              </div>
              <div className="relative">
                {/* <div id="spinningCard8" className="spinningCard"></div> */}
              </div>
              <div className="relative">
                {/* <div id="spinningCard9" className="spinningCard"></div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default Projects;
