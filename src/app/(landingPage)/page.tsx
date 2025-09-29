import "../App.css";
import Home from "./sections/home";
import About from "./sections/about";
import Projects from "./sections/projects";
import Skills from "./sections/skills";
import Footer from "./sections/footer";

function App() {
  return (
    <>
      <main 
        className="
          bg-neutral sm:px-[2rem] 
           lg:px-[10rem] 2xl:px-[20rem] 
           py-[2rem] w-screen font-body 
           flex flex-col gap-40 relative 
           overflow-hidden text-white
          "
      >
        <Home />
        <About />
        <Projects />
        <Skills />
        <Footer />
      </main>
    </>
  );
}

export default App;