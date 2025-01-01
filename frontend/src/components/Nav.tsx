import mainPic from "../assets/img/mainPic.png";
import resume from '../assets/resume.pdf';

function Nav() {
  return (
    <header>
      <nav className="relative w-full h-10 flex justify-between text-lg z-10">
        <div className="h-full w-20">
          <img src={mainPic} alt="Logo" />
        </div>
        <div className=" h-full flex gap-16 items-center">
          <a className="text-neutral hover:text-primary font-bold" href="#home">
            Home
          </a>
          <a className="text-neutral hover:text-primary font-bold" href="#about">
            About
          </a>
          <a className="text-neutral hover:text-primary font-bold" href="#projects">
            Projects
          </a>
          <a className="text-neutral hover:text-primary font-bold" href="#skills">
            Skills
          </a>
        </div>
        <a href={resume} target='blank' className="h-full flex items-center px-7 py-2 rounded-full border-2 border-primary hover:bg-primary transition delay-100 hover:cursor-pointer">
          <span className="text-neutral">Resume</span>
        </a>
      </nav>
    </header>
  );
}

export default Nav;
