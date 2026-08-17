import Navbar from "./navbar";
import Main from "./main";
import Skills from "./skills";
import Projects from "./projects";
import Contact from "./contact";
import SpaceBackground from "./SpaceBackground";
import MeteorShower from "./MeteorShower";
import IntroLoader from "./IntroLoader";

export default function Home() {
  return (
    <div className="relative bg-black">
      <IntroLoader />
      <SpaceBackground />
      <MeteorShower />

      <div className="relative z-10">
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
    </div>
  );
}
