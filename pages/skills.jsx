import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Skills = () => {
  const textList = [
    "Web Development",
    "Mobile Development",
    "UI/UX",
    "Backend",

    "AI Integration",

    "Cybersecurity",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [textList.length]);

  return (
    <div className="gradient-bg relative min-h-screen flex justify-center items-center px-10 py-20 text-white overflow-hidden">
      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(
            -45deg,
            #3b2274,
            #9f5f80,
            #114362,
            #2d2b79
          );
          background-size: 400% 400%;
          animation: gradient-animate 18s ease infinite;
        }
        @keyframes gradient-animate {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div className="relative w-full max-w-[1200px] mx-auto rounded-[3rem] bg-[#131212]/40 backdrop-blur-xl shadow-xl p-10 flex flex-col items-center border border-gray-800">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white">Skills</h2>
          <div className="mt-2 h-12 flex justify-center items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={textList[currentIndex]}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="block text-2xl font-semibold text-purple-300"
              >
                {textList[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
        <motion.div
          className="text-white max-w-[700px] mb-10 text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-light leading-relaxed">
            Proficient in a range of modern tools and frameworks, capable of
            building robust and responsive web applications with a focus on
            clean design and efficient performance. I have explored everything
            from frontend libraries to mobile frameworks, always striving to
            produce the best user experience. In addition to core development
            work, I have delved into DevOps practices and cloud deployments.
            Learning new technologies has become a core part of my daily
            routine, helping me stay ahead in this ever-evolving field. If you
            want to see more, feel free to check my
            <span className="ml-1 text-purple-400">GitHub</span> or LinkedIn.
          </p>
        </motion.div>
        <div className="flex flex-wrap gap-8 justify-center">
          <motion.div
            className="bg-[#2a2929]/80 w-[330px] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Frontend Development
            </h3>
            <p className="font-light text-gray-300 leading-relaxed">
              Skilled in React, Next.js, and Angular. Experienced with Tailwind
              CSS, Sass/SCSS, Redux, Context API, and API integration using
              Axios, React Router, and Vite.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#2a2929]/80 w-[330px] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Backend Development
            </h3>
            <p className="font-light text-gray-300 leading-relaxed">
              While focused on frontend, I also have a solid understanding of
              backend technologies including Node.js, Express, and database
              management with MongoDB and SQL.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#2a2929]/80 w-[330px] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">UI/UX Design</h3>
            <p className="font-light text-gray-300 leading-relaxed">
              Experienced in creating user-friendly interfaces with a focus on
              simplicity and usability, using tools like Figma and Adobe XD.
            </p>
          </motion.div>
          <motion.div
            className="bg-[#2a2929]/80 w-[330px] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Mobile Development
            </h3>
            <p className="font-light text-gray-300 leading-relaxed">
              Able to develop cross-platform mobile apps using React Native.
              Familiar with using APIs, state management, and UI libraries to
              deliver responsive, native-like experiences on both iOS and
              Android.
            </p>
          </motion.div>

          <motion.div
            className="bg-[#2a2929]/80 w-[330px] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              AI Integration
            </h3>
            <p className="font-light text-gray-300 leading-relaxed">
              Integrating machine learning models and AI-driven features into
              applications. Experienced with TensorFlow, PyTorch, and natural
              language processing.
            </p>
          </motion.div>

          <motion.div
            className="bg-[#2a2929]/80 w-[330px] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Cybersecurity
            </h3>
            <p className="font-light text-gray-300 leading-relaxed">
              Knowledgeable in securing web applications, performing
              vulnerability assessments, and implementing best security
              practices. Experienced with tools like OWASP, Metasploit, and
              various encryption techniques.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
