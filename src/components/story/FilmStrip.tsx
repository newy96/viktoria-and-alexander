
import React, { useRef } from "react";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import type { FilmFrame } from "../../types/wedding";

interface FilmStripProps {
  frames: FilmFrame[];
  extendedMobile?: boolean;
}

const sprocketPattern =
  "repeating-linear-gradient(to bottom, transparent 0 8px, rgba(236,226,206,0.85) 8px 18px, transparent 18px 26px)";

// Скорост на кинолентата
// По-голяма стойност = по-бавно движение
const FILM_DURATION = 90;

// Брой повторения в един цикъл
const REPEAT_COUNT = 6;

export function FilmStrip({
  frames,
  extendedMobile = false,
}: FilmStripProps) {
  const ref = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
  });

  const rotate = useTransform(
    smooth,
    [0, 1],
    reduceMotion ? [0, 0] : [-2, 2]
  );

  const y = useTransform(
    smooth,
    [0, 1],
    reduceMotion ? [0, 0] : [18, -18]
  );

  const renderFilmCopy = (copy: number) => (
    <div
      key={copy}
      className="
        relative
        w-full
        shrink-0
        px-[12%]
      "
      aria-hidden={copy === 1}
    >
      {/* LEFT SPROCKETS */}
      <span
        className="
          absolute
          bottom-0
          left-[3%]
          top-0
          w-[5%]
        "
        style={{
          backgroundImage: sprocketPattern,
        }}
      />

      {/* RIGHT SPROCKETS */}
      <span
        className="
          absolute
          bottom-0
          right-[3%]
          top-0
          w-[5%]
        "
        style={{
          backgroundImage: sprocketPattern,
        }}
      />

      {/* PHOTO FRAMES */}
      {Array.from({
        length: REPEAT_COUNT,
      }).map((_, repetition) =>
        frames.map((frame, index) => (
          <div
            key={`${copy}-${repetition}-${index}`}
            className="
              relative
              py-1
              md:py-1.5
            "
          >
            <img
              src={frame.src}
              alt={
                copy === 0 && repetition === 0
                  ? frame.alt
                  : ""
              }
              draggable={false}
              loading="eager"
              decoding="async"
              className="
                block
                aspect-[4/3]
                w-full
                object-cover
                grayscale
                contrast-110
                transition-[filter]
                duration-700
                hover:sepia-[.35]
              "
            />

            {/* KODAK LABEL */}
            <span
              className="
                absolute
                left-[-11%]
                top-1/2
                -translate-y-1/2
                font-sans
                text-[5px]
                tracking-[0.12em]
                text-gold/70
                [writing-mode:vertical-rl]
                md:text-[7px]
              "
            >
              KODAK PORTRA 400
            </span>

            {/* FRAME NUMBER */}
            <span
              className="
                absolute
                right-[-11%]
                top-1/2
                -translate-y-1/2
                font-sans
                text-[5px]
                tracking-[0.1em]
                text-gold/70
                [writing-mode:vertical-rl]
                md:text-[7px]
              "
            >
              {`${index * 2 + 12}A ▸`}
            </span>
          </div>
        ))
      )}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      style={{
        rotate,
        y,
      }}
      className="
        film-window
        relative
        mx-auto
        w-full
        max-w-[340px]
        transform-gpu
      "
    >
      {/* FILM BODY */}
      <div
        className={`
          relative
          w-full
          overflow-hidden
          bg-[#0b0908]
          shadow-[0_30px_65px_rgba(0,0,0,0.7)]

          ${
            extendedMobile
              ? "h-[150svh]"
              : "h-[min(78svh,650px)]"
          }

          md:h-[160svh]
        `}
      >
        {/* CONTINUOUS FILM LOOP */}
        <div
          className="
            film-continuous-roll
            flex
            w-full
            flex-col
          "
          style={{
            animationDuration: `${FILM_DURATION}s`,
            animationPlayState: reduceMotion
              ? "paused"
              : "running",
          }}
        >
          {renderFilmCopy(0)}
          {renderFilmCopy(1)}
        </div>
      </div>

      {/* CSS АНИМАЦИЯ */}
      <style>
        {`
          @keyframes filmContinuousMovement {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(0, -50%, 0);
            }
          }

          .film-continuous-roll {
            animation-name: filmContinuousMovement;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            animation-fill-mode: both;
            will-change: transform;
            backface-visibility: hidden;
          }
        `}
      </style>
    </motion.div>
  );
}
