
import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

export function Gifts() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  const softEase = [0.22, 1, 0.36, 1] as const;

  const revealed = reduceMotion || isInView;

  return (
    <section
      ref={sectionRef}
      id="gifts"
      aria-label="Подаръци"
      className="
        relative
        h-[100svh]
        w-full
        overflow-hidden
        bg-wine-900
      "
    >
      {/* НЕЖНО ПОЯВЯВАНЕ НА ЦЯЛАТА ВИЗИЯ */}
      <motion.div
        className="
          absolute
          inset-0
          h-full
          w-full
        "
        initial={false}
        animate={{
          opacity: revealed ? 1 : 0,
          filter: revealed
            ? "blur(0px)"
            : "blur(8px)",
        }}
        transition={{
          opacity: {
            duration: 1.4,
            ease: softEase,
          },
          filter: {
            duration: 1.6,
            ease: softEase,
          },
        }}
      >
        {/* BACKGROUND IMAGE */}
        <picture
          className="
            absolute
            inset-0
            block
            h-full
            w-full
          "
        >
          <source
            media="(max-width: 767px)"
            srcSet="/gift_mobile.png"
          />

          <img
            src="/gift.png"
            alt="Подаръци"
            draggable={false}
            className="
              block
              h-full
              w-full
              object-cover
              object-center
              select-none
            "
          />
        </picture>

        {/* SOFT OVERLAY */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
            bg-black/10
          "
          aria-hidden="true"
        />

        {/* LIGHT GLINTS */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[2]
            overflow-hidden
          "
          aria-hidden="true"
        >
          <motion.div
            className="
              absolute
              left-[-12%]
              top-[10%]
              h-[24vh]
              w-[38vw]
              rounded-full
              bg-white/18
              blur-3xl
            "
            animate={{
              x: [0, 30, 0],
              y: [0, -10, 0],
              opacity: [0.18, 0.32, 0.18],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="
              absolute
              right-[-10%]
              top-[24%]
              h-[18vh]
              w-[26vw]
              rounded-full
              bg-[#fff4d6]/16
              blur-3xl
            "
            animate={{
              x: [0, -24, 0],
              y: [0, 12, 0],
              opacity: [0.1, 0.24, 0.1],
            }}
            transition={{
              duration: 7.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />

          <motion.div
            className="
              absolute
              bottom-[10%]
              left-[12%]
              h-[16vh]
              w-[22vw]
              rounded-full
              bg-white/14
              blur-[80px]
            "
            animate={{
              x: [0, 18, 0],
              y: [0, -14, 0],
              opacity: [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />

          <motion.div
            className="
              absolute
              bottom-[18%]
              right-[8%]
              h-[20vh]
              w-[28vw]
              rounded-full
              bg-[#ffe9b8]/14
              blur-[90px]
            "
            animate={{
              x: [0, -20, 0],
              y: [0, 10, 0],
              opacity: [0.07, 0.16, 0.07],
            }}
            transition={{
              duration: 8.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* THIN MOVING SHINE */}
          <motion.div
            className="
              absolute
              top-[-15%]
              left-[-20%]
              h-[140%]
              w-[22%]
              rotate-[18deg]
              bg-gradient-to-b
              from-transparent
              via-white/14
              to-transparent
              blur-2xl
            "
            animate={{
              x: ["0%", "520%"],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.5,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
