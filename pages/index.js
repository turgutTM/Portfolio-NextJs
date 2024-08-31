import Navbar from "./navbar";
import Main from "./main";
import Skills from "./skills";
import Projects from "./projects";

export default function Home() {
  return (
    <div>
      <div className="relative min-h-screen bg-astronaut bg-cover bg-center">
        <div className="absolute inset-0 bg-black/55 z-10"></div>
        <div className="relative z-20">
          <Navbar />

          <div id="main">
            <Main />
          </div>
        </div>
        <div id="skills" className="relative z-10 mt-16">
          {" "}
          <Skills />
        </div>
        
      </div>
      <div id="projects">
        <Projects></Projects>
      </div>
    </div>
  );
}
