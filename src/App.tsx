
import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import { AnimatePresence } from "framer-motion";

import { Preloader } from "./components/preloader/Preloader";
import { NewspaperHero } from "./components/hero/NewspaperHero";
import { WeddingMusic } from "./components/ui/WeddingMusic";

import { Intro } from "./components/sections/Intro";
import { OurStory } from "./components/sections/OurStory";
import { Kumove } from "./components/sections/Kumove";
import { Venue } from "./components/sections/Venue";
import { Programme } from "./components/sections/Programme";
import { Gifts } from "./components/sections/Gifts";
import { GuestInfo } from "./components/sections/GuestInfo";
import { Rsvp } from "./components/sections/Rsvp";
import { Countdown } from "./components/sections/Countdown";

interface AppProps {
  showPreloader?: boolean;
}

export function App({
  showPreloader = true,
}: AppProps) {
  const [entered, setEntered] = useState(
    !showPreloader
  );

  // Hero става активно при окончателно
  // завършване на Preloader.
  const [heroActive, setHeroActive] = useState(
    !showPreloader
  );

  useEffect(() => {
    setEntered(!showPreloader);
    setHeroActive(!showPreloader);
  }, [showPreloader]);

  // Заключване на скрола до отваряне
  useEffect(() => {
    if (entered) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [entered]);

  const handleEnter = useCallback(() => {
    // Preloader вече е избледнял.
    // Hero е готово и започва Blur разкриването.
    setEntered(true);
    setHeroActive(true);
  }, []);

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-wine-950
        font-serif
        text-cream
        antialiased
      "
    >
      {/* PRELOADER */}
      <AnimatePresence>
        {!entered && (
          <Preloader
            key="preloader"
            onEnter={handleEnter}
          />
        )}
      </AnimatePresence>

      <main className="relative w-full">
        {/* HERO — ВИНАГИ МОНТИРАНО ПОД PRELOADER */}
        <NewspaperHero active={heroActive} />

        {/* BACKGROUND WEDDING MUSIC */}
        <WeddingMusic active={heroActive} />

        {/* =====================================
            CINEMATIC OVERLAP SEQUENCE

            INTRO
              ↓
            OUR STORY
              ↓
            KUMOVE
              ↓
            VENUE
              ↓
            PROGRAMME
              ↓
            GIFTS
              ↓
            GUEST INFO
              ↓
            RSVP
              ↓
            COUNTDOWN
        ===================================== */}

        <div className="relative isolate w-full">

          {/* INTRO */}
          <div className="sticky top-0 z-0 h-[100svh] w-full">
            <Intro />
          </div>

          {/* OUR STORY */}
          <div className="sticky top-0 z-10 h-[100svh] w-full">
            <OurStory />
          </div>

          {/* KUMOVE */}
          <div className="sticky top-0 z-20 h-[100svh] w-full">
            <Kumove />
          </div>

          {/* VENUE */}
          <div className="sticky top-0 z-30 h-[100svh] w-full">
            <Venue />
          </div>

          {/* PROGRAMME */}
          <div className="sticky top-0 z-40 h-[100svh] w-full">
            <Programme />
          </div>

          {/* GIFTS */}
          <div className="sticky top-0 z-50 h-[100svh] w-full">
            <Gifts />
          </div>

          {/* GUEST INFO */}
          <div className="sticky top-0 z-[60] h-[100svh] w-full">
            <GuestInfo />
          </div>

          {/* RSVP — OVERLAPS GUEST INFO */}
          <div className="sticky top-0 z-[70] h-[100svh] w-full">
            <Rsvp />
          </div>

          {/* COUNTDOWN — OVERLAPS RSVP */}
          <div className="relative z-[80] min-h-[100svh] w-full">
            <Countdown />
          </div>

        </div>
      </main>
    </div>
  );
}
