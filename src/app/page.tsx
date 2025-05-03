import "./App.css";
import Home from "../pages/home";
import About from "../pages/about";
import Projects from "../pages/projects";
import Skills from "../pages/skills";
import Footer from "../pages/footer";

function App() {
  return (
    <>
      <main className="bg-neutral sm:px-[2rem] lg:px-[10rem] 2xl:px-[20rem] py-[2rem] w-screen font-body flex flex-col gap-48 relative overflow-hidden text-white">
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