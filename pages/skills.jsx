import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Skills = () => {
  const textList = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Backend Development",
    "AI Integration",
    "Cybersecurity",
    "DevOps",
    "3D Design",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textList.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [textList.length]);

  const skills = [
    {
      title: "Frontend Development",
      description:
        "Expert in React, Next.js, TypeScript, and modern CSS frameworks. Building responsive, high-performance web applications with clean architecture.",
      tag: "01",
    },
    {
      title: "Backend Development",
      description:
        "Proficient in Node.js, Express, MongoDB, and REST APIs. Creating scalable server-side solutions with proper authentication and security.",
      tag: "02",
    },
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive user interfaces with modern design principles. Experienced with Figma, user research, and design systems.",
      tag: "03",
    },
    {
      title: "Mobile Development",
      description:
        "Cross-platform mobile development with React Native. Building native-like experiences for iOS and Android with optimized performance.",
      tag: "04",
    },
    {
      title: "AI Integration",
      description:
        "Implementing machine learning models and AI features. Experience with modern AI APIs and intelligent application development.",
      tag: "05",
    },
    {
      title: "Cybersecurity",
      description:
        "Web application security, vulnerability assessment, and best practices. Ensuring robust protection against modern security threats.",
      tag: "06",
    },
    {
      title: "DevOps & Docker",
      description:
        "Containerization with Docker, CI/CD pipelines, and cloud deployment. Streamlining development workflows and production environments.",
      tag: "07",
    },
    {
      title: "3D Design & Blender",
      description:
        "3D modeling, animation, and rendering with Blender. Creating visual assets and interactive 3D experiences for web applications.",
      tag: "08",
    },
  ];

  return (
    <div className="relative bg-white text-black py-24 md:py-32 px-6 md:px-10 border-t border-black/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Skills &amp;
            <br />
            <span className="inline-block h-[1.15em] overflow-hidden align-bottom">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textList[currentIndex]}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="inline-block bg-black text-white rounded-full px-5 py-1 md:py-2"
                >
                  {textList[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          <p className="mt-6 text-black/50 text-lg max-w-2xl leading-relaxed">
            Building modern applications with cutting-edge technologies —
            from responsive interfaces to scalable backend systems, combining
            performance, security, and exceptional user experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 border-t border-l border-black/10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className="group relative p-7 border-r border-b border-black/10 hover:bg-black transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] text-black/30 group-hover:text-white/40 transition-colors">
                {skill.tag}
              </span>
              <h3 className="mt-4 text-lg font-bold text-black group-hover:text-white transition-colors">
                {skill.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/55 group-hover:text-white/70 transition-colors">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-wrap items-center gap-3 mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="text-black/50">Want to see more?</span>
          <a
            href="https://github.com/turgutTM"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 font-semibold hover:text-black/60 transition-colors"
          >
            GitHub
          </a>
          <span className="text-black/30">/</span>
          <a
            href="https://www.linkedin.com/in/turgut-muradlı-9714522b1/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 font-semibold hover:text-black/60 transition-colors"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
