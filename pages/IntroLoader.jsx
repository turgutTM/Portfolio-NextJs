import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "TUGU.";

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: "easeOut" },
  }),
};

const IntroLoader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 1600);
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
            transition: { duration: 0.5, ease: "easeInOut" },
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
                className="text-3xl md:text-4xl font-extrabold tracking-[0.3em] text-white"
              >
                {char}
              </motion.span>
            ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
            className="h-px w-16 bg-white origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
