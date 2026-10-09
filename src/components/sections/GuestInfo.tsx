
import React, { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

export function GuestInfo() {
  const sectionRef = useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  // Наблюдаваме секцията, а не изображението.
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  const paperAnimation = {
    opacity: reduceMotion || isInView ? 1 : 0,
    filter:
      reduceMotion || isInView
        ? "blur(0px)"
        : "blur(7px)",
    scale: reduceMotion || isInView ? 1 : 0.98,
  };

  const paperTransition = {
    duration: reduceMotion ? 0 : 1.8,
    ease: [0.22, 1, 0.36, 1] as [
      number,
      number,
      number,
      number
    ],
  };

  return (
    <section
      ref={sectionRef}
      id="guest-info"
      aria-labelledby="guest-info-title"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-wine-900"
    >
      {/* DESKTOP BACKGROUND */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{
          backgroundImage: "url('/intro.png')",
        }}
        aria-hidden="true"
      />

      {/* MOBILE BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{
          backgroundImage: "url('/intro_mobile.png')",
        }}
        aria-hidden="true"
      />

      <h2
        id="guest-info-title"
        className="sr-only"
      >
        Информация за гостите
      </h2>

      <div className="relative z-10 flex min-h-[100svh] w-full items-center justify-center px-3 py-12 sm:px-6 md:py-20">

        {/* DESKTOP INFO */}
        <motion.div
          className="relative hidden w-full max-w-[1000px] md:block"
          initial={false}
          animate={paperAnimation}
          transition={paperTransition}
        >
          <img
            src="/info.png"
            alt="Информация и пожелания към гостите"
            className="mx-auto block h-auto w-full select-none"
            draggable={false}
            loading="eager"
          />
        </motion.div>

        {/* MOBILE INFO */}
        <motion.div
          className="relative mx-auto block w-full max-w-[480px] md:hidden"
          initial={false}
          animate={paperAnimation}
          transition={paperTransition}
        >
          <img
            src="/info_mobile.png"
            alt="Информация и пожелания към гостите"
            className="mx-auto block h-auto w-full select-none"
            draggable={false}
            loading="eager"
          />
        </motion.div>

      </div>
    </section>
  );
}
