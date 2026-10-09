
import React, { useRef } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { Reveal } from "../ui/Reveal";
import { HeartDivider } from "../ui/HeartDivider";

import {
  godparentLines,
  godparents,
} from "../../data/wedding";

export function Kumove() {
  const [kuma, kum] = godparents;

  const sectionRef = useRef<HTMLElement>(null);

  const reduceMotion = useReducedMotion();

  /*
    SCROLL-BASED ANIMATION

    Starts when Kumove reaches 45%
    of the viewport.

    Completes when Kumove reaches
    the top of the viewport.

    Unlike useInView, the animation
    cannot finish behind OurStory.
  */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [
      "start 45%",
      "start start",
    ],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 85,
      damping: 25,
      mass: 0.65,
    }
  );

  /*
    LEFT PORTRAIT
    Enters from left.
  */

  const kumaX = useTransform(
    smoothProgress,
    [0, 1],
    ["-115%", "0%"]
  );

  const kumaOpacity = useTransform(
    smoothProgress,
    [0, 0.45, 1],
    [0, 0.8, 1]
  );

  /*
    RIGHT PORTRAIT
    Enters from right.

    Slightly delayed relative
    to the left portrait.
  */

  const kumX = useTransform(
    smoothProgress,
    [0, 0.2, 1],
    ["115%", "115%", "0%"]
  );

  const kumOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 1],
    [0, 0.15, 1]
  );

  return (
    <section
      ref={sectionRef}
      id="kumove"
      aria-labelledby="kumove-title"
      className="
        relative isolate
        h-[100svh]
        w-full
        overflow-hidden
        bg-[#300004]
      "
    >
      {/* =====================================
          BACKGROUND
      ===================================== */}

      <picture
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-0
          block h-full w-full
        "
      >
        <source
          media="(max-width: 767px)"
          srcSet="/kumove_mobile.png"
        />

        <img
          src="/kumove.png"
          alt=""
          draggable={false}
          className="
            block h-full w-full
            object-cover object-center
            select-none
          "
        />
      </picture>

      {/* =====================================
          LEFT IMAGE — KUMA

          Scroll-controlled entrance
          from the left edge.
      ===================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute z-20

          left-[-3%]
          top-[8%]
          w-[41%]

          sm:left-[-4%]
          sm:top-[9%]
          sm:w-[38%]

          md:left-[-6%]
          md:top-[12%]
          md:w-[34%]

          lg:left-[-6%]
          lg:top-[14%]
          lg:w-[33%]

          xl:left-[-5%]
          xl:top-[15%]
          xl:w-[32%]

          2xl:left-[-4%]
          2xl:w-[30%]
        "
        style={
          reduceMotion
            ? {
                opacity: 1,
              }
            : {
                x: kumaX,
                opacity: kumaOpacity,
              }
        }
      >
        <img
          src="/kuma.png"
          alt={kuma.name}
          draggable={false}
          className="
            block
            h-auto w-full
            object-contain
            select-none
            drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]
          "
        />
      </motion.div>

      {/* =====================================
          RIGHT IMAGE — KUM

          Scroll-controlled entrance
          from the right edge.

          Mobile position stays lower.
      ===================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute z-20

          right-[-3%]
          bottom-[-4%]
          w-[41%]

          sm:right-[-4%]
          sm:bottom-[8%]
          sm:w-[38%]

          md:right-[-6%]
          md:bottom-[10%]
          md:w-[34%]

          lg:right-[-6%]
          lg:bottom-[12%]
          lg:w-[33%]

          xl:right-[-5%]
          xl:bottom-[12%]
          xl:w-[32%]

          2xl:right-[-4%]
          2xl:w-[30%]
        "
        style={
          reduceMotion
            ? {
                opacity: 1,
              }
            : {
                x: kumX,
                opacity: kumOpacity,
              }
        }
      >
        <img
          src="/kum.png"
          alt={kum.name}
          draggable={false}
          className="
            block
            h-auto w-full
            object-contain
            select-none
            drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]
          "
        />
      </motion.div>

      {/* =====================================
          CENTERED TEXT COLUMN
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-0 z-10
          flex
          items-center
          justify-center
          text-center
        "
      >
        <div
          className="
            relative
            flex
            w-[44%]
            max-w-[440px]
            flex-col
            items-center

            sm:w-[42%]

            md:w-[38%]
            md:max-w-[540px]

            lg:w-[36%]
            lg:max-w-[580px]

            xl:w-[35%]
          "
        >
          {/* TITLE */}

          <Reveal y={12}>
            <h2
              id="kumove-title"
              className="
                mb-2
                font-script
                text-[clamp(26px,7vw,42px)]
                leading-[1.1]
                text-[#e5d5bb]

                [text-shadow:0_3px_6px_rgba(0,0,0,0.8)]

                md:mb-4
                md:text-[clamp(52px,6vw,90px)]
              "
            >
              Кумове:
            </h2>
          </Reveal>

          {/* HEART + SUBTITLE */}

          <Reveal delay={0.05} y={10}>
            <HeartDivider
              className="
                mb-2 mt-1
                text-[#dbc3a2]/85
                md:mb-3
              "
              lineWidth="w-12 md:w-20"
            />

            <p
              className="
                font-serif
                text-[clamp(9px,2.3vw,12px)]
                leading-[1.45]
                tracking-[0.035em]
                text-[#f0e2d3]

                [text-shadow:0_2px_4px_rgba(0,0,0,0.9)]

                md:text-[clamp(13px,1.2vw,18px)]
              "
            >
              Хората, които ще са до нас
            </p>
          </Reveal>

          {/* GODPARENTS */}

          <Reveal delay={0.1} y={12}>
            <div
              className="
                mt-5
                text-center
                md:mt-8
              "
            >
              <p
                className="
                  font-display
                  text-[clamp(13px,3.1vw,19px)]
                  uppercase
                  leading-[1.2]
                  tracking-[0.025em]
                  text-[#f0e2d3]

                  md:text-[clamp(22px,2.3vw,37px)]
                "
              >
                {kuma.name}
              </p>

              <p
                className="
                  my-2
                  font-script
                  text-[clamp(25px,5vw,38px)]
                  leading-[1.1]
                  text-[#e5d5bb]

                  md:my-3
                  md:text-[clamp(40px,4vw,60px)]
                "
              >
                &
              </p>

              <p
                className="
                  font-display
                  text-[clamp(13px,3.1vw,19px)]
                  uppercase
                  leading-[1.2]
                  tracking-[0.025em]
                  text-[#f0e2d3]

                  md:text-[clamp(22px,2.3vw,37px)]
                "
              >
                {kum.name}
              </p>
            </div>
          </Reveal>

          {/* STORY PARAGRAPHS */}

          <div
            className="
              mt-6
              flex w-full
              flex-col
              items-center

              md:mt-8
            "
          >
            {godparentLines.map(
              (line, index) => (
                <Reveal
                  key={index}
                  delay={0.15 + index * 0.05}
                  y={10}
                >
                  <div
                    className="
                      flex
                      w-full
                      flex-col
                      items-center
                    "
                  >
                    {index > 0 && (
                      <HeartDivider
                        className="
                          my-2
                          text-[#dbc3a2]/85

                          md:my-3
                        "
                        lineWidth="w-12 md:w-20"
                      />
                    )}

                    <p
                      className="
                        mx-auto
                        w-full
                        font-serif

                        text-[clamp(9px,2.4vw,12px)]
                        leading-[1.5]
                        tracking-[0.025em]

                        text-[#f0e2d3]

                        [text-shadow:0_2px_4px_rgba(0,0,0,0.9)]

                        md:text-[clamp(13px,1.2vw,18px)]
                        md:leading-[1.65]
                      "
                    >
                      {line}
                    </p>
                  </div>
                </Reveal>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
