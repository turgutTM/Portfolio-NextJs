import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <div
      id="projects"
      className="
        bg-gradient-to-b
        starry-bg
        from-black
        to-[#131212]
        py-20
        px-5
        text-white
      "
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
        <motion.h2
          className="text-5xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <motion.div
          className="w-full md:w-[40rem] text-center font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            I have previously developed many projects, but some of these were
            solely frontend or backend. Below are example projects where I
            handled the entire development of the website.
            <br />
            If you want to see more, check my{" "}
            <Link
              href="https://github.com/turgutTM?tab=repositories"
              target="_blank"
              className="underline text-purple-400 hover:text-purple-300"
            >
              GitHub
            </Link>
            .
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-[#1b1a1a] rounded-lg p-5 flex flex-col gap-4">
            <div className="relative group">
              <Link
                href="https://github.com/turgutTM/Note-ReactNative"
                target="_blank"
              >
                <video
                  className="
                    w-full
                    h-48
                    md:h-60
                    rounded-lg
                    object-cover
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                  src="/notenative.mov"
                  alt="React Native Notes App"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Link>
              <div
                className="
                  absolute inset-0
                  bg-black/60
                  opacity-0
                  group-hover:opacity-100
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  transition
                  duration-300
                "
              >
                <p className="text-lg font-semibold">React Native Notes App</p>
                <p className="text-sm text-gray-300 mt-1 px-4">
                  Mobile note-taking with Appwrite
                </p>
              </div>
            </div>
            <p className="text-xl font-medium text-center">
              React Native Notes App
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              A cross-platform mobile application for note-taking with real-time
              synchronization. Built with React Native and Appwrite for backend
              services, authentication, and storage.
            </p>
            <div className="flex gap-2 mt-2 justify-center">
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                React Native
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Appwrite
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Mobile
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Expo
              </span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <Link
                href="https://github.com/turgutTM/Note-ReactNative"
                target="_blank"
                className="
                  bg-purple-600
                  px-4
                  py-2
                  rounded-md
                  hover:bg-purple-500
                  transition
                "
              >
                GitHub Repo
              </Link>
            </div>
          </div>

          <div className="bg-[#1b1a1a] rounded-lg p-5 flex flex-col gap-4">
            <div className="relative group">
              <Link
                href="https://github.com/turgutTM/Social-Media-App"
                target="_blank"
              >
                <img
                  className="
                    w-full
                    h-48
                    md:h-60
                    rounded-lg
                    object-cover
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                  src="/Socialmediaphoto.png"
                  alt="Social Media App"
                />
              </Link>
              <div
                className="
                  absolute inset-0
                  bg-black/60
                  opacity-0
                  group-hover:opacity-100
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  transition
                  duration-300
                "
              >
                <p className="text-lg font-semibold">Social Media App</p>
                <p className="text-sm text-gray-300 mt-1 px-4">
                  Real-time posts & interactive comments
                </p>
              </div>
            </div>
            <p className="text-xl font-medium text-center">Social Media App</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              A full-stack social media platform with user authentication,
              real-time posts, and interactive comments. Built using React,
              Node.js, and MongoDB.
            </p>
            <div className="flex gap-2 mt-2 justify-center">
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                React
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Node.js
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                MongoDB
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Tailwind
              </span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <Link
                href="https://github.com/turgutTM/Social-Media-App"
                target="_blank"
                className="
                  bg-purple-600
                  px-4
                  py-2
                  rounded-md
                  hover:bg-purple-500
                  transition
                "
              >
                GitHub Repo
              </Link>
            </div>
          </div>

          <div className="bg-[#1b1a1a] rounded-lg p-5 flex flex-col gap-4">
            <div className="relative group">
              <Link
                href="https://github.com/turgutTM/Science-Blog-App"
                target="_blank"
              >
                <img
                  className="
                    w-full
                    h-48
                    md:h-60
                    rounded-lg
                    object-cover
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                  src="/Scienceproject-photo.png"
                  alt="Science Blog App"
                />
              </Link>
              <div
                className="
                  absolute inset-0
                  bg-black/60
                  opacity-0
                  group-hover:opacity-100
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  transition
                  duration-300
                "
              >
                <p className="text-lg font-semibold">Science Blog App</p>
                <p className="text-sm text-gray-300 mt-1 px-4">
                  Scientific articles & discussions
                </p>
              </div>
            </div>
            <p className="text-xl font-medium text-center">Science Blog App</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              A platform dedicated to scientific articles and discussions, where
              users can explore, comment, and share insights. Implemented with
              Next.js, Node.js, and a responsive layout.
            </p>
            <div className="flex gap-2 mt-2 justify-center">
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Next.js
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Node.js
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Express
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Tailwind
              </span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <Link
                href="https://github.com/turgutTM/Science-Blog-App"
                target="_blank"
                className="
                  bg-purple-600
                  px-4
                  py-2
                  rounded-md
                  hover:bg-purple-500
                  transition
                "
              >
                GitHub Repo
              </Link>
            </div>
          </div>

          <div className="bg-[#1b1a1a] rounded-lg p-5 flex flex-col gap-4">
            <div className="relative group">
              <Link
                href="https://github.com/turgutTM/E-commerce-AI"
                target="_blank"
              >
                <img
                  className="
                    w-full
                    h-48
                    md:h-60
                    rounded-lg
                    object-cover
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                  src="/e-commercephoto.png"
                  alt="E-commerce AI"
                />
              </Link>
              <div
                className="
                  absolute inset-0
                  bg-black/60
                  opacity-0
                  group-hover:opacity-100
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  transition
                  duration-300
                "
              >
                <p className="text-lg font-semibold">E-commerce AI</p>
                <p className="text-sm text-gray-300 mt-1 px-4">
                  AI-driven product recommendations
                </p>
              </div>
            </div>
            <p className="text-xl font-medium text-center">E-commerce AI</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              A modern e-commerce platform enhanced with AI-driven product
              recommendations. Built using React, Node.js, MongoDB, and
              integrated AI features to improve user experience.
            </p>
            <div className="flex gap-2 mt-2 justify-center">
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                React
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Node.js
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                AI
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Tailwind
              </span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <Link
                href="https://github.com/turgutTM/E-commerce-AI"
                target="_blank"
                className="
                  bg-purple-600
                  px-4
                  py-2
                  rounded-md
                  hover:bg-purple-500
                  transition
                "
              >
                GitHub Repo
              </Link>
            </div>
          </div>

          <div
            className="
              bg-[#1b1a1a]
              rounded-lg
              p-5
              flex
              flex-col
              gap-4
              md:col-span-2
            "
          >
            <div className="relative group">
              <Link
                href="https://github.com/turgutTM/Chat-App-Socket"
                target="_blank"
              >
                <img
                  className="
                    w-full
                    h-60
                    rounded-lg
                    object-cover
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                  src="/chatappphoto.png"
                  alt="Chat App"
                />
              </Link>
              <div
                className="
                  absolute inset-0
                  bg-black/60
                  opacity-0
                  group-hover:opacity-100
                  flex
                  flex-col
                  justify-center
                  items-center
                  text-center
                  transition
                  duration-300
                "
              >
                <p className="text-lg font-semibold">Chat App Socket</p>
                <p className="text-sm text-gray-300 mt-1 px-4">
                  Real-time chat with Socket.IO
                </p>
              </div>
            </div>
            <p className="text-xl font-medium text-center">Chat App Socket</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              A real-time chat application utilizing Socket.IO for seamless
              communication. Features user authentication, group chats, and
              private channels. Built with React, Node.js, and Express.
            </p>
            <div className="flex gap-2 mt-2 justify-center">
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                React
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Node.js
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Socket.IO
              </span>
              <span className="px-2 py-1 text-xs font-semibold bg-gray-700 rounded-full">
                Tailwind
              </span>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <Link
                href="https://github.com/turgutTM/Chat-App-Socket"
                target="_blank"
                className="
                  bg-purple-600
                  px-4
                  py-2
                  rounded-md
                  hover:bg-purple-500
                  transition
                "
              >
                GitHub Repo
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link href="https://github.com/turgutTM" target="_blank">
            <button
              className="
                inline-block
                bg-purple-600
                px-6
                py-3
                rounded-md
                text-white
                font-semibold
                tracking-wide
                hover:bg-purple-500
                transition
              "
            >
              More
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;