import "./App.css";
import Home from "./pages/home.tsx";
import About from "./pages/about.tsx";
import Projects from "./pages/projects.tsx";
import Skills from './pages/skills.tsx'
import Footer from './pages/footer.tsx'

function App() {
  return (
    <div className="bg-neutral px-[10rem] py-[2rem] min-w-screen font-body flex flex-col gap-48">
      <Home />
      <About />
      <Projects />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;
