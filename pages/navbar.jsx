import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("main");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const sections = ["main", "skills", "projects"];
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition > offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }

    setIsScrolled(window.scrollY > 100); 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(section);
  };

  return (
    <div
      className={`flex fixed w-full p-7 items-center transition-colors duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="flex-1 ml-10 font-bold text-4xl pl-4">
        <a
          href="#main"
          className={`cursor-pointer ${activeSection === "main" ? "text-white" : "text-white"}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick("main");
          }}
        >
          TUGU.
        </a>
      </div>
      <div className="flex flex-1 gap-48">
        <div className="flex gap-14 text-lg justify-center items-center font-fjalla">
          <a
            href="#main"
            className={`cursor-pointer ${activeSection === "main" ? "text-white" : "text-gray-300"}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick("main");
            }}
          >
            Home
          </a>
          <a
            href="#skills"
            className={`cursor-pointer ${activeSection === "skills" ? "text-white" : "text-gray-300"}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick("skills");
            }}
          >
            Skills
          </a>
          <a
            href="#projects"
            className={`cursor-pointer ${activeSection === "projects" ? "text-white" : "text-gray-300"}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick("projects");
            }}
          >
            Projects
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-[#333232] border rounded-full transition-transform transform hover:scale-110">
            <Link
              href="https://www.linkedin.com/in/turgut-muradl%C4%B1-9714522b1/"
              target="_blank"
              className="text-white flex items-center justify-center"
            >
              <FaLinkedinIn size={17} />
            </Link>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-[#333232] border rounded-full transition-transform transform hover:scale-110">
            <Link
              href="https://github.com/turgutTM"
              target="_blank"
              className="text-white flex items-center justify-center"
            >
              <FaGithub size={17} />
            </Link>
          </div>
          <div className="w-10 h-10 flex items-center justify-center bg-[#333232] border rounded-full transition-transform transform hover:scale-110">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-white flex items-center justify-center"
            >
              <IoLogoInstagram size={17} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
