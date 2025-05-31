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
    }, 3000);
    return () => clearInterval(interval);
  }, [textList.length]);

  const skills = [
    {
      title: "Frontend Development",
      description: "Expert in React, Next.js, TypeScript, and modern CSS frameworks. Building responsive, high-performance web applications with clean architecture.",
      icon: "💻",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Backend Development", 
      description: "Proficient in Node.js, Express, MongoDB, and REST APIs. Creating scalable server-side solutions with proper authentication and security.",
      icon: "⚙️",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive user interfaces with modern design principles. Experienced with Figma, user research, and design systems.",
      icon: "🎨",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Mobile Development",
      description: "Cross-platform mobile development with React Native. Building native-like experiences for iOS and Android with optimized performance.",
      icon: "📱",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      title: "AI Integration",
      description: "Implementing machine learning models and AI features. Experience with modern AI APIs and intelligent application development.",
      icon: "🤖",
      gradient: "from-indigo-500/20 to-purple-500/20"
    },
    {
      title: "Cybersecurity",
      description: "Web application security, vulnerability assessment, and best practices. Ensuring robust protection against modern security threats.",
      icon: "🔒",
      gradient: "from-gray-500/20 to-slate-500/20"
    },
    {
      title: "DevOps & Docker",
      description: "Containerization with Docker, CI/CD pipelines, and cloud deployment. Streamlining development workflows and production environments.",
      icon: "🐳",
      gradient: "from-cyan-500/20 to-blue-500/20"
    },
    {
      title: "3D Design & Blender",
      description: "3D modeling, animation, and rendering with Blender. Creating visual assets and interactive 3D experiences for web applications.",
      icon: "🎯",
      gradient: "from-yellow-500/20 to-orange-500/20"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Skills &
            </span>
            <br />
            <div className="h-16 flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={textList[currentIndex]}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                >
                  {textList[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h2>
          
          <motion.p
            className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Building modern applications with cutting-edge technologies. 
            From responsive web interfaces to scalable backend systems, 
            I create solutions that combine performance, security, and exceptional user experience.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              className={`group relative bg-gradient-to-br ${skill.gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{skill.icon}</span>
                  <h3 className="text-xl font-semibold text-white">
                    {skill.title}
                  </h3>
                </div>
                
                <p className="text-gray-300 leading-relaxed text-sm">
                  {skill.description}
                </p>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <span className="text-gray-400">Want to see more?</span>
            <a 
              href="https://github.com/turgutTM" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              Visit GitHub
            </a>
            <span className="text-gray-400">or</span>
            <a 
              href="https://www.linkedin.com/in/turgut-muradlı-9714522b1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;