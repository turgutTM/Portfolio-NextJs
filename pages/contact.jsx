import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram, IoMailOutline } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="relative py-24 px-6 bg-gradient-to-b from-[#131212]/90 via-black/90 to-black text-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-purple-700/10 rounded-full blur-3xl"></div>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="text-sm tracking-[0.3em] uppercase text-purple-400">
          Get in touch
        </span>
        <h2 className="text-4xl md:text-5xl font-bold">
          Let&apos;s build something{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            great
          </span>{" "}
          together
        </h2>
        <p className="text-gray-400 max-w-lg">
          Have a project in mind or just want to say hi? My inbox is always open.
        </p>

        <Link
          href="mailto:turgutmuradli04@gmail.com"
          className="inline-flex items-center gap-2 mt-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-bold shadow-lg shadow-purple-500/30 transition-all duration-300"
        >
          <IoMailOutline size={20} />
          turgutmuradli04@gmail.com
        </Link>

        <div className="flex gap-4 mt-6">
          <Link
            href="https://www.linkedin.com/in/turgut-muradl%C4%B1-9714522b1/"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-purple-500 hover:scale-110 transition-all duration-300"
          >
            <FaLinkedinIn size={18} />
          </Link>
          <Link
            href="https://github.com/turgutTM"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-purple-500 hover:scale-110 transition-all duration-300"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-purple-500 hover:scale-110 transition-all duration-300"
          >
            <IoLogoInstagram size={18} />
          </Link>
        </div>
      </motion.div>

      <div className="relative z-10 mt-20 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Turgut Muradlı. Built with Next.js &amp; Three.js.
      </div>
    </div>
  );
};

export default Contact;
