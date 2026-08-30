import Navbar from "./navbar";
import Main from "./main";
import Skills from "./skills";
import Projects from "./projects";
import Contact from "./contact";
import IntroLoader from "./IntroLoader";

export default function Home() {
  return (
    <div className="relative bg-white text-black">
      <IntroLoader />

      <Navbar />

      <div id="main">
        <Main />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
