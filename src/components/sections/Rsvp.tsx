
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RsvpDialog } from "../rsvp/RsvpDialog";

export function Rsvp() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="rsvp"
      aria-label="Потвърждение на присъствие"
      className="relative h-[100svh] w-full overflow-hidden bg-wine-950"
    >
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Потвърди присъствие"
        className="absolute inset-0 h-full w-full cursor-pointer border-0 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-light"
        initial={reduceMotion ? false : {
          opacity: 0.65,
          filter: "blur(5px)"
        }}
        whileInView={{
          opacity: 1,
          filter: "blur(0px)"
        }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.2,
          ease: "easeOut"
        }}
      >
        <picture className="block h-full w-full">
          <source
            media="(max-width: 767px)"
            srcSet="/rsvp.png"
          />
          <img
            src="/rsvp_mobile.png"
            alt="Потвърждение на присъствие"
            className="block h-full w-full object-cover object-center"
            draggable={false}
          />
        </picture>
      </motion.button>

      <RsvpDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  );
}
