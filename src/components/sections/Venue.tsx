
import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPinIcon } from "lucide-react";

import { HeartDivider } from "../ui/HeartDivider";
import { Reveal } from "../ui/Reveal";
import { couple } from "../../data/wedding";

export function Venue() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  const startedRef = useRef(false);

  // Стартира, когато 35% от секцията е видима
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.35,
  });

  useEffect(() => {
    if (!isInView || startedRef.current) return;

    const isMobile = window.matchMedia(
      "(max-width: 767px)"
    ).matches;

    const video = isMobile
      ? mobileVideoRef.current
      : desktopVideoRef.current;

    if (!video) return;

    startedRef.current = true;

    video.currentTime = 0;

    video.play().catch((error) => {
      console.warn(
        "Venue video could not autoplay:",
        error
      );
    });
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="venue"
      aria-labelledby="venue-title"
      className="
        relative
        isolate
        flex
        h-[100svh]
        w-full
        items-center
        overflow-hidden
        bg-black
      "
    >
      {/* DESKTOP VIDEO */}
      <video
        ref={desktopVideoRef}
        src="/venue.mp4"
        className="
          pointer-events-none
          absolute
          inset-0
          hidden
          h-full
          w-full
          object-cover
          md:block
        "
        autoPlay={false}
        muted
        loop={false}
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        onEnded={(event) => {
          event.currentTarget.pause();
        }}
      />

      {/* MOBILE VIDEO */}
      <video
        ref={mobileVideoRef}
        src="/venue_mobile.mp4"
        className="
          pointer-events-none
          absolute
          inset-0
          block
          h-full
          w-full
          object-cover
          md:hidden
        "
        autoPlay={false}
        muted
        loop={false}
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden="true"
        onEnded={(event) => {
          event.currentTarget.pause();
        }}
      />

      {/* DARK OVERLAY */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          bg-black/35
        "
        aria-hidden="true"
      />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          w-full
          max-w-7xl
          items-center
          px-8
          py-8
          lg:px-16
        "
      >
        <div className="w-full max-w-xl">
          <Reveal className="w-full text-center lg:text-left">
            {/* TITLE */}
            <h2
              id="venue-title"
              className="mt-8 text-cream"
            >
              <span
                className="
                  block
                  font-display
                  text-4xl
                  uppercase
                  tracking-[0.2em]
                  md:text-5xl
                "
              >
                The
              </span>

              <span
                className="
                  -mt-4
                  block
                  font-script
                  text-8xl
                  md:text-9xl
                  lg:ml-16
                "
              >
                Venue
              </span>
            </h2>

            {/* VENUE NAME */}
            <p
              className="
                mt-8
                font-display
                text-xl
                uppercase
                tracking-[0.25em]
                text-cream
                md:text-2xl
              "
            >
              {couple.venue}
            </p>

            {/* DECORATIVE LINE */}
            <span
              className="
                mx-auto
                my-6
                block
                h-10
                w-px
                bg-cream/60
                lg:mx-0
                lg:ml-2
              "
              aria-hidden="true"
            />

            {/* MAP BUTTON — ELEGANT GOLD & VELVET */}
            <motion.a
              href={couple.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="
                group
                relative
                mx-auto
                mt-6
                inline-flex
                min-h-[56px]
                items-center
                justify-center
                gap-3
                overflow-hidden
                rounded-full

                border
                border-[#dfc69a]/75
                bg-[#30080d]/75

                px-8
                py-4

                font-sans
                text-[11px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[#f2dfb8]

                shadow-[0_8px_28px_rgba(0,0,0,0.25)]
                backdrop-blur-md

                transition-colors
                duration-500

                hover:border-[#f3dfb2]
                hover:bg-[#4b1018]

                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#dfc69a]

                lg:mx-0
              "
            >
              {/* INNER GOLD BORDER */}
              <span
                className="
                  pointer-events-none
                  absolute
                  inset-[4px]
                  rounded-full
                  border
                  border-[#dfc69a]/20
                  transition-colors
                  duration-500
                  group-hover:border-[#dfc69a]/45
                "
                aria-hidden="true"
              />

              {/* SOFT GOLD SHIMMER */}
              <motion.span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-transparent
                  via-[#f3dfb2]/10
                  to-transparent
                "
                initial={{ x: "-120%" }}
                whileHover={{ x: "120%" }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
                aria-hidden="true"
              />

              {/* MAP ICON */}
              <MapPinIcon
                className="
                  relative
                  z-10
                  h-[19px]
                  w-[19px]
                  shrink-0
                  text-[#dfc69a]
                  transition-transform
                  duration-500
                  group-hover:scale-110
                "
                strokeWidth={1.4}
              />

              {/* BUTTON TEXT */}
              <span
                className="
                  relative
                  z-10
                  whitespace-nowrap
                "
              >
                Вижте на картата
              </span>
            </motion.a>

            {/* HEART DIVIDER */}
            <HeartDivider
              className="
                mt-7
                text-cream/70
                lg:justify-start
              "
              lineWidth="w-14"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
