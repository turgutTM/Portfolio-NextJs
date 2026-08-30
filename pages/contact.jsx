import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram, IoMailOutline } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="relative py-28 md:py-36 px-6 bg-black text-white overflow-hidden">
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <span className="text-sm tracking-[0.3em] uppercase text-white/40">
          Get in touch
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
          Let&apos;s build something{" "}
          <span className="bg-white text-black rounded-full px-4 inline-block">
            great
          </span>{" "}
          together
        </h2>
        <p className="text-white/50 max-w-lg">
          Have a project in mind or just want to say hi? My inbox is always
          open.
        </p>

        <Link
          href="mailto:turgutmuradli04@gmail.com"
          className="inline-flex items-center gap-2 mt-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-white/85 transition-colors duration-300"
        >
          <IoMailOutline size={20} />
          turgutmuradli04@gmail.com
        </Link>

        <div className="flex gap-4 mt-6">
          <Link
            href="https://www.linkedin.com/in/turgut-muradl%C4%B1-9714522b1/"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
          >
            <FaLinkedinIn size={18} />
          </Link>
          <Link
            href="https://github.com/turgutTM"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
          >
            <IoLogoInstagram size={18} />
          </Link>
        </div>
      </motion.div>

      <div className="relative z-10 mt-20 pt-8 border-t border-white/10 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Turgut Muradlı. Built with Next.js.
      </div>
    </div>
  );
};

export default Contact;
