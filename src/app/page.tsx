import "./App.css";

import Home from "../pages/home";
import About from "../pages/about";
import Projects from "../pages/projects";
import Skills from "../pages/skills";
import Footer from "../pages/footer";

export const metadata = {
  title: 'Biraj Buddhacharya | Software & AI Engineer',
  description:
    'I\'m Biraj Buddhacharya, a Software and AI Engineer passionate about solving real-world problems with Python and machine learning. Explore my projects and contact me.',
  keywords:
    'Biraj Buddhacharya, Software Engineer, AI Engineer, Machine Learning, Deep Learning, PyTorch, Python, Portfolio',
  authors: [{ name: 'Biraj Buddhacharya' }],
  robots: 'index, follow',
  metadataBase: new URL('https://birajbuddhacharya.com.np'),
  verification: {
    google: 'MfMgvrHxXGqKqKNEvhpvELHqDe7tx5nX-T6quHavP2Q'
  }
};

function App() {
  return (
    <main className="bg-neutral sm:px-[2rem] lg:px-[10rem] 2xl:px-[20rem] py-[2rem] w-screen font-body flex flex-col gap-48 relative overflow-hidden text-white">
      <Home />
      <About />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}

export default App;
