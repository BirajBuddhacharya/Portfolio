import FadeInSection from "../components/fadeIn"; // Make sure the path is correct

function Projects() {
  return (
    <FadeInSection idTrack="projects">
      <section id="projects" className=" w-full">
        <h1 className="text-3xl m-10">
          My <br />
          <span className="text-primary">Projects</span>
        </h1>
        <div className="flex gap-4 justify-center items-center">
          <div className="bg-primary h-72 w-64 rounded-2xl ">
            This is a test
          </div>
          <div className="bg-primary h-96 w-72 rounded-2xl">This is a test</div>
          <div className="bg-primary h-72 w-64 rounded-2xl">This is a test</div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default Projects;
