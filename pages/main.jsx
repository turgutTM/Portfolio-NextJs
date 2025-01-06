import React from "react"
import { motion } from "framer-motion"
import TypingEffect from "../pages/typingeffect"

const Main = () => {
  return (
    <div className="futuristic-bg relative min-h-screen flex justify-center items-center px-10 py-20 text-white overflow-hidden">
      <style jsx>{`
        .futuristic-bg {
          background: linear-gradient(-45deg, #131313, #3b2274, #f39b9b, #21047a);
          background-size: 400% 400%;
          animation: gradientShift 18s ease infinite;
        }
        @keyframes gradientShift {
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
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-6 md:w-2/3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-lg tracking-widest text-[#c4c4c4] font-light">
              WELCOME TO MY PORTFOLIO
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-6xl font-extrabold leading-tight drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]">
              Hi! I'm Turgut <TypingEffect />
            </h1>
          </motion.div>
          <motion.div
            className="mt-4 font-light text-base leading-relaxed text-gray-300"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Hello, I'm Turgut Muradlı, I am 20 years old, and I've been
            developing myself in the field of web development for almost 2
            years. This is my portfolio. I have developed many projects before
            and have also been involved in several collaborative projects. If
            you want to learn more about me, you can visit my social media
            platforms.
          </motion.div>
        </div>
        <div className="flex justify-center items-center md:w-1/3">
          <motion.img
            src="/asteroid.png"
            alt="Asteroid"
            className="w-60 h-60 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Main
