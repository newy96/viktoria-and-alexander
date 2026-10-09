
import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

export function Intro() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.35,
  });

  const reduceMotion = useReducedMotion();

  const softEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-label="Покана"
      className="
        relative
        z-20
        flex
        min-h-[100dvh]
        w-full
        overflow-hidden
        bg-wine-900
        shadow-[0_-35px_80px_rgba(20,0,5,0.45)]
      "
    >
      {/* BACKGROUND */}
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet="/iintro_mobile.png"
        />

        <img
          src="/iintro.png"
          alt=""
          draggable={false}
          className="
            block
            h-full
            w-full
            object-cover
          "
        />
      </picture>

      {/* МЕКО ПРЕЛИВАНЕ В ГОРНАТА ЧАСТ */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-[1]
          h-40
          bg-gradient-to-b
          from-[#210205]/90
          via-[#210205]/35
          to-transparent
        "
        aria-hidden="true"
      />

      {/* HANDS — ПЛАВНО И ЕФИРНО ПОЯВЯВАНЕ */}
      <motion.picture
        className="
          pointer-events-none
          absolute
          inset-0
          z-[2]
          block
          h-full
          w-full
          will-change-[opacity,transform,filter]
        "
        initial={false}
        animate={{
          opacity: reduceMotion || isInView ? 1 : 0,
          y: reduceMotion || isInView ? 0 : 35,
          filter:
            reduceMotion || isInView
              ? "blur(0px)"
              : "blur(10px)",
        }}
        transition={{
          opacity: {
            duration: 2.2,
            delay: 0.2,
            ease: softEase,
          },
          y: {
            duration: 2.4,
            delay: 0.2,
            ease: softEase,
          },
          filter: {
            duration: 2.1,
            delay: 0.2,
            ease: softEase,
          },
        }}
      >
        <source
          media="(max-width: 767px)"
          srcSet="/hands_mobile.png"
        />

        <img
          src="/hands.png"
          alt=""
          draggable={false}
          className="
            block
            h-full
            w-full
            object-cover
          "
        />
      </motion.picture>

      {/* DARK OVERLAY */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[3]
          bg-wine-950/20
        "
        aria-hidden="true"
      />

      {/* TEXT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-3xl
          flex-col
          items-center
          px-6
          pt-[25dvh]
          pb-[20vh]
          text-center
          md:block
          md:pt-32
          md:pb-[45vh]
        "
      >
        {/* ОСНОВНО ЗАГЛАВИЕ */}
        <motion.h2
          initial={false}
          animate={{
            opacity: reduceMotion || isInView ? 1 : 0,
            y: reduceMotion || isInView ? 0 : 14,
            filter:
              reduceMotion || isInView
                ? "blur(0px)"
                : "blur(4px)",
          }}
          transition={{
            duration: 1.5,
            delay: 0.4,
            ease: softEase,
          }}
          className="
            font-script
            text-5xl
            leading-tight
            text-cream
            drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]
            md:text-7xl
          "
        >
          Каним Ви да споделите радостта
        </motion.h2>

        {/* ОПИСАНИЕ */}
        <motion.p
          initial={false}
          animate={{
            opacity: reduceMotion || isInView ? 1 : 0,
            y: reduceMotion || isInView ? 0 : 12,
            filter:
              reduceMotion || isInView
                ? "blur(0px)"
                : "blur(4px)",
          }}
          transition={{
            duration: 1.6,
            delay: 0.65,
            ease: softEase,
          }}
          className="
            mx-auto
            mt-6
            max-w-xl
            font-serif
            text-[25px]
            leading-[1.5]
            text-cream/95
            md:text-[30px]
          "
        >
          от този специален за нас ден и да станете част от началото на
          нашата семейна история!
        </motion.p>
      </div>
    </section>
  );
}
