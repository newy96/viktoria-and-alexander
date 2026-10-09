
import React from "react";

import { FilmStrip } from "../story/FilmStrip";
import { HeartDivider } from "../ui/HeartDivider";
import { Reveal } from "../ui/Reveal";

import {
  couple,
  filmFrames,
  storyParagraphs,
} from "../../data/wedding";

export function OurStory() {
  return (
    <section
      id="story"
      aria-labelledby="story-title"
      className="
        relative isolate z-20
        h-[100svh]
        w-full
        overflow-hidden
        bg-[#300004]
      "
    >
      {/* =====================================
          LAYER 1 — BACKGROUND
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
          srcSet="/story_mobile.png"
        />

        <img
          src="/story.png"
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
          LAYER 2 — FILM STRIP

          Без Reveal wrapper.
          Кинолентата остава постоянно
          монтирана и видима.

          Непрекъснатият loop се управлява
          от FilmStrip.tsx.
      ===================================== */}

      <div
        className="
          pointer-events-none
          absolute inset-0 z-10
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            left-[-7%]
            top-1/2
            w-[38%]
            -translate-y-1/2
            -rotate-[6deg]

            sm:left-[-4%]
            sm:w-[35%]

            md:left-[1%]
            md:w-[34%]

            lg:left-[5%]
            lg:w-[30%]
          "
        >
          <FilmStrip
            frames={filmFrames}
            extendedMobile
          />
        </div>
      </div>

      {/* =====================================
          LAYER 3 — TEXT CONTENT

          MOBILE:
          Slightly larger typography.
          Compact vertical spacing.

          DESKTOP:
          Original positioning preserved.
      ===================================== */}

      <div
        className="
          absolute inset-0 z-20
          grid
          grid-cols-[43%_57%]
          items-start
          pt-[9svh]

          sm:pt-[8svh]

          md:grid-cols-[38%_62%]
          md:items-start
          md:pt-[3svh]

          lg:grid-cols-[39%_61%]
          lg:pt-[4svh]

          xl:grid-cols-[40%_60%]
          xl:pt-[5svh]
        "
      >
        {/* SPACE FOR FILM */}
        <div aria-hidden="true" />

        {/* STORY TEXT */}
        <div
          className="
            relative
            min-w-0
            w-full
            px-2 pr-4
            text-center

            sm:px-5

            md:mx-auto
            md:w-full
            md:max-w-none
            md:px-5
            md:pr-[14%]

            lg:px-8
            lg:pr-[15%]

            xl:px-10
            xl:pr-[17%]
          "
        >
          {/* TITLE */}
          <Reveal y={12}>
            <h2
              id="story-title"
              className="
                mb-3
                font-script
                text-[clamp(25px,6.4vw,44px)]
                leading-[1.15]
                text-[#e5d5bb]

                [text-shadow:0_3px_6px_rgba(0,0,0,0.8)]

                sm:mb-5
                sm:text-5xl

                md:mb-3
                md:text-[clamp(41px,4.4vw,67px)]

                lg:mb-4
                lg:text-[clamp(49px,4.6vw,78px)]

                xl:mb-5
                xl:text-[clamp(56px,4.8vw,87px)]
              "
            >
              Малко за нас:
            </h2>
          </Reveal>

          {/* STORY PARAGRAPHS */}
          <div
            className="
              mx-auto
              w-full
              max-w-none
            "
          >
            {storyParagraphs.map(
              (paragraph, index) => (
                <Reveal
                  key={index}
                  delay={index * 0.05}
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
                    <HeartDivider
                      className="
                        mb-1 mt-1
                        text-[#dbc3a2]/85

                        sm:mb-3

                        md:mb-1
                        md:mt-0

                        lg:mb-2
                        lg:mt-1
                      "
                    />

                    <p
                      className="
                        mx-auto
                        w-full
                        max-w-none

                        font-serif
                        text-[clamp(10px,2.6vw,14px)]
                        leading-[1.4]
                        tracking-[0.01em]

                        text-[#f0e2d3]

                        [text-shadow:0_2px_4px_rgba(0,0,0,0.9)]

                        sm:text-[15px]
                        sm:leading-[1.5]

                        md:text-[clamp(12px,1.05vw,16px)]
                        md:leading-[1.45]

                        lg:text-[clamp(14px,1.1vw,18px)]
                        lg:leading-[1.5]

                        xl:text-[clamp(15px,1.1vw,19px)]
                        xl:leading-[1.55]
                      "
                    >
                      {paragraph}
                    </p>
                  </div>
                </Reveal>
              )
            )}
          </div>

          {/* FINAL DIVIDER */}
          <Reveal delay={0.15} y={10}>
            <HeartDivider
              className="
                mb-2 mt-2
                text-[#dbc3a2]/85

                sm:my-4

                md:my-2

                lg:my-3
              "
            />
          </Reveal>

          {/* SIGNATURE */}
          <Reveal delay={0.2} y={12}>
            <p
              className="
                mx-auto
                w-full
                font-script
                text-[clamp(20px,5vw,39px)]
                leading-[1.2]
                text-[#e5d5bb]

                [text-shadow:0_3px_6px_rgba(0,0,0,0.8)]

                sm:text-4xl

                md:text-[clamp(33px,3.3vw,49px)]

                lg:text-[clamp(39px,3.6vw,59px)]

                xl:text-[clamp(43px,3.8vw,66px)]
              "
            >
              {couple.bride} & {couple.groom}
            </p>
          </Reveal>
        </div>
      </div>

      {/* =====================================
          LAYER 4 — VELVET OVERLAY

          Above everything.
          Maintains 3D effect.
      ===================================== */}

      <picture
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-50
          block h-full w-full
        "
      >
        <source
          media="(max-width: 767px)"
          srcSet="/over_mobile.png"
        />

        <img
          src="/over.png"
          alt=""
          draggable={false}
          className="
            block h-full w-full
            object-cover object-center
            select-none
          "
        />
      </picture>
    </section>
  );
}
