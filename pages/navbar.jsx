import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("main");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const sections = ["main", "skills", "projects", "contact"];
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

    setIsScrolled(window.scrollY > 40);
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

  const navItems = [
    { id: "main", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      className={`
        fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-10 py-4
        transition-all duration-300 bg-white
        ${isScrolled ? "border-b border-black/10" : "border-b border-transparent"}
      `}
    >
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          handleClick("main");
        }}
        className="font-black text-lg md:text-xl tracking-tight text-black cursor-pointer"
      >
        TUGU.
      </a>

      <div className="hidden md:flex gap-8 font-medium text-sm tracking-wide">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`relative cursor-pointer pb-1 transition-colors ${
              activeSection === item.id
                ? "text-black"
                : "text-black/40 hover:text-black"
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.id);
            }}
          >
            {item.label}
            {activeSection === item.id && (
              <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-black" />
            )}
          </a>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <Link
          href="https://www.linkedin.com/in/turgut-muradl%C4%B1-9714522b1/"
          target="_blank"
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border border-black/15 text-black hover:bg-black hover:text-white transition-colors"
        >
          <FaLinkedinIn size={14} />
        </Link>
        <Link
          href="https://github.com/turgutTM"
          target="_blank"
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border border-black/15 text-black hover:bg-black hover:text-white transition-colors"
        >
          <FaGithub size={14} />
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border border-black/15 text-black hover:bg-black hover:text-white transition-colors"
        >
          <IoLogoInstagram size={14} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
