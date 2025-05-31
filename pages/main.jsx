import React from "react"
import { motion } from "framer-motion"
import TypingEffect from "../pages/typingeffect"

const Main = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center px-6 py-20 text-white overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 backdrop-blur-sm">
              👋 Welcome to my portfolio
            </span>
          </motion.div>
          
          <motion.h1
            className="text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hi! I am{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Turgut
            </span>
            <br />
            <TypingEffect />
          </motion.h1>
          
          <motion.p
            className="text-lg leading-relaxed text-gray-300 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            I am a 20-year-old full-stack developer with 2 years of experience in web development. 
            I build modern applications using React, Next.js, and Node.js. 
            Passionate about creating seamless user experiences and scalable solutions.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
              View My Work
            </button>
            <button className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
              Get in Touch
            </button>
          </motion.div>
          
          <motion.div
            className="flex items-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">Available for freelance</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-xl"></div>
            <motion.div
              className="relative w-80 h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-white/10"
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <motion.img
                src="/asteroid.png"
                alt="Profile"
                className="w-48 h-48 object-cover rounded-full"
                animate={{ 
                  rotate: [0, -360],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
            
            <div className="absolute -top-4 -left-4 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-4 -right-4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute top-1/2 -right-8 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Main