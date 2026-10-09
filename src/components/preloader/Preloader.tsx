
import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onEnter: () => void;
}

export function Preloader({ onEnter }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const leavingRef = useRef(false);
  const onEnterRef = useRef(onEnter);

  const [started, setStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  // Mobile / Desktop
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

  // Заключване на скрола
  useEffect(() => {
    const previousBodyOverflow =
      document.body.style.overflow;
    const previousBodyHeight =
      document.body.style.height;
    const previousHtmlOverflow =
      document.documentElement.style.overflow;
    const previousHtmlHeight =
      document.documentElement.style.height;

    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100%";

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;
      document.body.style.height =
        previousBodyHeight;

      document.documentElement.style.overflow =
        previousHtmlOverflow;
      document.documentElement.style.height =
        previousHtmlHeight;
    };
  }, []);

  const finishPreloader = () => {
    if (leavingRef.current) return;

    leavingRef.current = true;
    setLeaving(true);
  };

  // Backup при липсващ ended event
  useEffect(() => {
    if (!started || leaving) return;

    const fallbackTimer = window.setTimeout(() => {
      finishPreloader();
    }, 5000);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [started, leaving]);

  const handleStart = async () => {
    if (started || leavingRef.current) return;

    const video = videoRef.current;
    if (!video) return;

    setStarted(true);

    try {
      video.currentTime = 0;
      await video.play();
    } catch (error) {
      console.error(
        "Preloader video could not start:",
        error
      );
      finishPreloader();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Отвори поканата"
      onClick={handleStart}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          handleStart();
        }
      }}
      className="
        fixed
        inset-0
        z-[99999]
        h-[100dvh]
        w-screen
        overflow-hidden
        overscroll-none
        bg-black
        touch-none
        cursor-pointer
      "
      initial={{ opacity: 1 }}
      animate={{
        opacity: leaving ? 0 : 1,
      }}
      transition={{
        duration: 0.65,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        if (leavingRef.current) {
          onEnterRef.current();
        }
      }}
      style={{
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      {/* PRELOADER VIDEO */}
      <video
        ref={videoRef}
        key={isMobile ? "mobile" : "desktop"}
        className="
          absolute
          inset-0
          block
          h-full
          w-full
          object-cover
        "
        playsInline
        muted
        preload="auto"
        loop={false}
        controls={false}
        disablePictureInPicture
        onEnded={finishPreloader}
      >
        <source
          src={
            isMobile
              ? "/preloader_mobile.mp4"
              : "/preloader.mp4"
          }
          type="video/mp4"
        />
      </video>

      {/* CLICK TO OPEN */}
      <motion.div
        className="
          pointer-events-none
          absolute
          bottom-[10%]
          left-1/2
          z-20
          w-max
          max-w-[90vw]
          -translate-x-1/2
          text-center

          md:bottom-[9%]
        "
        initial={{ opacity: 0 }}
        animate={{
          opacity: started ? 0 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        aria-hidden="true"
      >
        <motion.span
          className="
            block
            font-script
            text-[clamp(29px,8vw,42px)]
            leading-tight
            text-[#692D25]
            drop-shadow-[0_1px_2px_rgba(255,240,210,0.35)]

            md:text-[48px]
          "
          animate={
            started
              ? { opacity: 0 }
              : {
                  opacity: [0.8, 1, 0.8],
                  y: [0, -3, 0],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Click to open
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
