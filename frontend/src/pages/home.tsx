import Nav from "../components/Nav";
import mainPic from "../assets/img/mainPic.png";

function Home() {
  return (
    <section id="home" className="w-full h-full flex flex-col overflow-hid">
      <div
        id="radientEffect"
        className="h-[50rem] w-[50rem] bg-primary rounded-full -translate-x-1/2 -translate-y-1/2  absolute top-[-10rem] left-1/2 blur-3xl opacity-25 z-10"
      ></div>
      <Nav />
      <div id="hero" className="w-full h-full flex py-16">
        <div className="px-16 w-1/2 flex items-center justify-center">
          <div className="text-left">
            <h1 className="font-heading">Hello I'm, </h1>
            <h1 className="text-primary font-heading">Biraj</h1>
            <p className="text-neutral-light text-sm tracking-tighter my-2">
              Aspiring software engineer and Deep Learning Enthiguist aiming to
              solve real world problem with tech.
            </p>  
          </div>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <img
            src={mainPic}
            alt="Profile Picture"
            className="w-full h-[31rem]"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
