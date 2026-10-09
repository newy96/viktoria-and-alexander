
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface WeddingMusicProps {
  active: boolean;
}

const MUSIC_START_TIME = 20;

export function WeddingMusic({
  active,
}: WeddingMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;

    const prepareAudio = () => {
      if (!startedRef.current) {
        audio.currentTime = MUSIC_START_TIME;
      }
    };

    audio.addEventListener(
      "loadedmetadata",
      prepareAudio
    );

    if (audio.readyState >= 1) {
      prepareAudio();
    }

    return () => {
      audio.removeEventListener(
        "loadedmetadata",
        prepareAudio
      );
    };
  }, []);

  useEffect(() => {
    if (!active || startedRef.current) return;

    const audio = audioRef.current;
    if (!audio) return;

    startedRef.current = true;

    const startMusic = async () => {
      try {
        if (audio.readyState < 1) {
          await new Promise<void>((resolve, reject) => {
            const ready = () => {
              cleanup();
              resolve();
            };

            const failed = () => {
              cleanup();
              reject(new Error("Audio loading failed"));
            };

            const cleanup = () => {
              audio.removeEventListener(
                "loadedmetadata",
                ready
              );
              audio.removeEventListener(
                "error",
                failed
              );
            };

            audio.addEventListener(
              "loadedmetadata",
              ready,
              { once: true }
            );

            audio.addEventListener(
              "error",
              failed,
              { once: true }
            );
          });
        }

        audio.currentTime = MUSIC_START_TIME;
        await audio.play();

        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    };

    startMusic();
  }, [active]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding_music.mp3"
        preload="auto"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {active && (
        <motion.button
          type="button"
          onClick={toggleMusic}
          aria-label={
            playing
              ? "Изключи музиката"
              : "Включи музиката"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
            fixed bottom-6 right-5
            z-[9999]
            flex h-12 w-12
            items-center justify-center
            rounded-full
            border border-[#dfc69a]/70
            bg-[#30080d]/80
            text-[#dfc69a]
            shadow-lg
            backdrop-blur-md
            transition-colors
            hover:bg-[#4b1018]
          "
        >
          {playing ? (
            <Volume2 size={19} strokeWidth={1.5} />
          ) : (
            <VolumeX size={19} strokeWidth={1.5} />
          )}
        </motion.button>
      )}
    </>
  );
}
