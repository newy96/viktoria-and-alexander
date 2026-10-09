
import React from "react";
import { HeartDivider } from "../ui/HeartDivider";
import { Reveal } from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { useCountdown } from "../../hooks/useCountdown";
import { couple } from "../../data/wedding";

const pad = (value: number) =>
  String(value).padStart(2, "0");

export function Countdown() {
  const {
    days,
    hours,
    minutes,
    seconds,
    done,
  } = useCountdown(couple.dateISO);

  const units = [
    { value: days, label: "Дни" },
    { value: hours, label: "Часа" },
    { value: minutes, label: "Мин" },
    { value: seconds, label: "Сек" },
  ];

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="relative overflow-hidden bg-wine-950"
    >
      {/* RESPONSIVE BACKGROUND */}
      <picture className="absolute inset-0 block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet="/countdown_mobile.png"
        />

        <img
          src="/countdown.png"
          alt=""
          draggable={false}
          className="block h-full w-full object-cover object-center select-none"
        />
      </picture>

      {/* SOFT DARK OVERLAY */}
      <div
        className="pointer-events-none absolute inset-0 bg-wine-950/65"
        aria-hidden="true"
      />

      {/* COUNTDOWN CONTENT */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">

        <Reveal>
          {/* <SectionLabel>Финал</SectionLabel> */}

          <h2
            id="countdown-title"
            className="mt-6 text-gold-light"
          >
            <span className="block font-display text-3xl uppercase tracking-[0.35em] md:text-4xl">
              The
            </span>

            <span className="-mt-2 block font-script text-8xl md:text-9xl">
              Countdown
            </span>
          </h2>
        </Reveal>

        {done ? (
          <p
            className="mt-12 font-script text-6xl text-cream"
            role="status"
          >
            Днес е денят!
          </p>
        ) : (
          <Reveal
            delay={0.2}
            className="mt-12 grid w-full max-w-3xl grid-cols-4 gap-2 sm:gap-6"
          >
            {units.map((unit) => (
              <div key={unit.label}>
                <p className="font-display text-5xl tabular-nums text-cream sm:text-7xl md:text-8xl">
                  {pad(unit.value)}
                </p>

                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-gold-light/80 sm:text-[11px]">
                  {unit.label}
                </p>
              </div>
            ))}
          </Reveal>
        )}

        <p className="sr-only" aria-live="off">
          Остават {days} дни, {hours} часа и {minutes} минути.
        </p>

        <HeartDivider
          className="mt-12 text-gold/70"
          lineWidth="w-24 md:w-40"
        />

        <Reveal delay={0.3}>
          <p className="mt-10 font-script text-5xl text-cream md:text-6xl">
            До скоро!
          </p>

          {/* <p className="mt-4 font-sans text-[11px] uppercase tracking-[0.4em] text-cream/70">
            {couple.bride} & {couple.groom} ·{" "}
            {couple.dateShort} · {couple.venue}
          </p> */}
        </Reveal>
      </div>
    </section>
  );
}
