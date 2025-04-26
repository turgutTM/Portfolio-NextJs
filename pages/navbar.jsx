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
        if (
          scrollPosition > offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
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
      className={`
        fixed top-0 w-full z-50 flex items-center justify-between px-8 py-5
        transition-all duration-300
        ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md shadow-md border-b border-gray-800"
            : "bg-transparent"
        }
      `}
    >
      <div className="ml-4 font-extrabold text-xl md:text-2xl text-white">
        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            handleClick("main");
          }}
          className="cursor-pointer tracking-wide"
        >
          TUGU.
        </a>
      </div>

      <div className="hidden md:flex gap-10 font-semibold text-lg tracking-wide">
        <a
          href="#main"
          className={`cursor-pointer hover:text-white/80 transition-colors ${
            activeSection === "main"
              ? "text-[#f5f5f5] underline underline-offset-4 decoration-2"
              : "text-gray-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleClick("main");
          }}
        >
          Home
        </a>
        <a
          href="#skills"
          className={`cursor-pointer hover:text-white/80 transition-colors ${
            activeSection === "skills"
              ? "text-[#f5f5f5] underline underline-offset-4 decoration-2"
              : "text-gray-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleClick("skills");
          }}
        >
          Skills
        </a>
        <a
          href="#projects"
          className={`cursor-pointer hover:text-white/80 transition-colors ${
            activeSection === "projects"
              ? "text-[#f5f5f5] underline underline-offset-4 decoration-2"
              : "text-gray-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleClick("projects");
          }}
        >
          Projects
        </a>
      </div>

      <div className="flex gap-2 md:gap-4 items-center">
        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#333232] border border-gray-600 hover:border-purple-500 transition-transform transform hover:scale-110">
          <Link
            href="https://www.linkedin.com/in/turgut-muradl%C4%B1-9714522b1/"
            target="_blank"
            className="text-white flex items-center justify-center"
          >
            <FaLinkedinIn size={17} />
          </Link>
        </div>
        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#333232] border border-gray-600 hover:border-purple-500 transition-transform transform hover:scale-110">
          <Link
            href="https://github.com/turgutTM"
            target="_blank"
            className="text-white flex items-center justify-center"
          >
            <FaGithub size={17} />
          </Link>
        </div>
        <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-[#333232] border border-gray-600 hover:border-purple-500 transition-transform transform hover:scale-110">
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
  );
};

export default Navbar;
