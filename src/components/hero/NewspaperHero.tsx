
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface NewspaperHeroProps {
  active: boolean;
}

export function NewspaperHero({
  active,
}: NewspaperHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const transitionDoneRef = useRef(false);

  const [videoFinished, setVideoFinished] =
    useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [transitionDone, setTransitionDone] =
    useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener(
      "change",
      updateDevice
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDevice
      );
    };
  }, []);

  // Стартиране на видеото само веднъж
  useEffect(() => {
    if (!active || !isMobile || !videoReady) return;
    if (!transitionDoneRef.current) return;
    if (startedRef.current || videoFinished) return;

    const video = videoRef.current;
    if (!video) return;

    startedRef.current = true;
    video.currentTime = 0;

    video.play().catch(() => {
      setVideoFinished(true);
    });
  }, [
    active,
    isMobile,
    videoReady,
    videoFinished,
    transitionDone,
  ]);

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="
        sticky
        top-0
        z-0
        h-[100dvh]
        w-full
        overflow-hidden
        bg-black
      "
    >
      {/* HERO Е ВИНАГИ ВИДИМО ПОД PRELOADER */}
      <motion.div
        className="
          relative
          h-full
          w-full
          overflow-hidden
        "
        initial={{
          filter: "blur(5px)",
        }}
        animate={{
          filter: active
            ? "blur(0px)"
            : "blur(5px)",
        }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        onAnimationComplete={() => {
          if (!active || transitionDoneRef.current) return;

          transitionDoneRef.current = true;
          setTransitionDone(true);
        }}
      >
        {/* ОСНОВНО ИЗОБРАЖЕНИЕ */}
        <picture className="block h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet="/hero_mobile.png"
          />

          <img
            src="/hero.png"
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

        {/* МОБИЛНО HERO ВИДЕО */}
        {!videoFinished && (
          <video
            ref={videoRef}
            src="/hero_video_mobile.mp4"
            poster="/hero_mobile.png"
            muted
            playsInline
            preload="auto"
            loop={false}
            controls={false}
            disablePictureInPicture
            onLoadedData={() => {
              const video = videoRef.current;
              if (!video || startedRef.current) return;

              video.pause();
              video.currentTime = 0;
              setVideoReady(true);
            }}
            onEnded={() => {
              setVideoFinished(true);
            }}
            onError={() => {
              setVideoFinished(true);
            }}
            className="
              absolute
              inset-0
              z-[5]
              h-full
              w-full
              object-cover
              hidden
              max-[767px]:block
            "
          />
        )}
      </motion.div>

      {/* МЕКО ЗАТЪМНЯВАНЕ В ДОЛНАТА ЧАСТ */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-10
          h-40
          bg-gradient-to-b
          from-transparent
          via-black/5
          to-black/30
        "
        aria-hidden="true"
      />

      {/* ЗЛАТИСТА СТРЕЛКА ЗА СКРОЛ */}
      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-[max(24px,env(safe-area-inset-bottom))]
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          justify-center
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: active && transitionDone ? 1 : 0,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: 0.3,
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            y: [0, 8, 0],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex
            flex-col
            items-center
            gap-1
          "
        >
          <span
            className="
              mb-1
              font-sans
              text-[9px]
              uppercase
              tracking-[0.35em]
              text-[#d9bd83]
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]
            "
          >
          </span>

          <ChevronDown
            className="
              h-7
              w-7
              text-[#d9bd83]
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
            "
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
