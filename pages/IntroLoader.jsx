import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "TUGU.";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: "easeOut" },
  }),
};

const IntroLoader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.2,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          <div className="flex overflow-hidden">
            {NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl md:text-2xl font-extrabold tracking-[0.3em] bg-gradient-to-r from-white via-purple-200 to-blue-300 bg-clip-text text-transparent"
              >
                {char}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xs md:text-sm tracking-[0.4em] uppercase text-gray-400"
          >
          </motion.p>

         
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
