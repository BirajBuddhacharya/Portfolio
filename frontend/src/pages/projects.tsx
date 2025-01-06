import FadeInSection from "../components/fadeIn"; // Make sure the path is correct
import "../assets/css/spinningProjects.css";
import rightArrow from "../assets/icons/rightArrow.png";
import { useState } from "react";
import dockerLogo from "../assets/icons/docker.svg";

function SpinningCard({
  imgUrl,
  heading,
  discription,
  buttonLink,
  CardId,
}: {
  imgUrl: string;
  heading: string;
  discription: string;
  buttonLink: string;
  CardId: string;
}) {
  return (
    <>
      <div
        className="flex flex-col justify-center items-center spinningCard text-black"
        id={CardId}
      >
        <img src={imgUrl} className="h-20 w-20 bg-cover bg-no-repeat" />
        <h2 className="text-xl">{heading}</h2>
        <p className="text-sm">{discription}</p>
        <a
          target="_blank"
          className="text-base py-2 px-5 bg-primary rounded-md text-white hover:text-white"
          href={buttonLink}
        >
          Learn More
        </a>
      </div>
    </>
  );
}

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
        <div id="roundedDivWrapper">
          <div className="relative">
            <div className="absolute top-1/2 w-[61rem] h-[61rem] blur-3xl bg-primary opacity-90 shadow-[0_0_30px_60px_rgba(255,255,255)] rounded-full"></div>
            <div
              id="roundedDiv"
              className=""
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div>
                <SpinningCard
                  CardId="spinningCard1"
                  heading="ABC BOOKS"
                  discription="ecommerce website"
                  buttonLink="https://www.github.com/BirajBuddhacharya/ABC-Books"
                  imgUrl={dockerLogo}
                />
              </div>
              <div>
                <SpinningCard
                  CardId="spinningCard2"
                  heading="ABC BOOKS"
                  discription="ecommerce website"
                  buttonLink="https://www.github.com/BirajBuddhacharya/ABC-Books"
                  imgUrl={dockerLogo}
                />
              </div>
              <div>
                <SpinningCard
                  CardId="spinningCard3"
                  heading="ABC BOOKS"
                  discription="ecommerce website"
                  buttonLink="https://www.github.com/BirajBuddhacharya/ABC-Books"
                  imgUrl={dockerLogo}
                />
              </div>
              <div>
                {/* <div id="spinningCard4" className="spinningCard"></div> */}
              </div>
              <div>
                {/* <div id="spinningCard5" className="spinningCard"></div> */}
              </div>
              <div>
                {/* <div id="spinningCard6" className="spinningCard"></div> */}
              </div>
              <div>
                {/* <div id="spinningCard7" className="spinningCard"></div> */}
              </div>
              <div>
                {/* <div id="spinningCard8" className="spinningCard"></div> */}
              </div>
              <div>
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
