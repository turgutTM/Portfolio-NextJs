import React from "react"
import { motion } from "framer-motion"
import TypingEffect from "../pages/typingeffect"

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) element.scrollIntoView({ behavior: "smooth" })
}

const Main = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-20 bg-white text-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "url('/grid-dark.svg')" }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          <span className="text-sm font-medium tracking-wide text-black/60">
            Available for freelance work
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Hi, I&apos;m Turgut.
          <br />
          Building on the{" "}
          <span className="inline-flex items-center gap-3 align-middle bg-black text-white rounded-full px-5 py-1 md:py-2">
            web
          </span>
          <br />
          &amp; beyond.
        </motion.h1>

        <motion.div
          className="mt-8 h-8 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-lg md:text-xl font-semibold tracking-wide text-black/50 uppercase">
            <TypingEffect />
          </span>
          <span className="w-[2px] h-5 bg-black ml-1 animate-pulse" />
        </motion.div>

        <motion.p
          className="mt-6 text-lg leading-relaxed text-black/60 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          22-year-old full-stack developer with 2 years of experience building
          modern applications with React, Next.js, and Node.js. Focused on
          clean, fast, and thoughtful user experiences.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-3.5 bg-black text-white font-semibold rounded-full hover:bg-black/85 transition-colors duration-300"
          >
            View my work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3.5 border border-black/20 text-black font-semibold rounded-full hover:border-black hover:bg-black/5 transition-colors duration-300"
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      <motion.div
        className="hidden lg:block absolute right-10 xl:right-20 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="relative w-56 h-56 xl:w-72 xl:h-72 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-black/15" />
          <div className="absolute inset-6 rounded-full border border-black/10 border-dashed" />
          <div className="absolute inset-0 animate-spin-slow">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full" />
          </div>
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-black/40">
            TM
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default Main
