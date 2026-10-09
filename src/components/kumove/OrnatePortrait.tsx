import React from "react";
import { motion } from "framer-motion";
import type { Godparent } from "../../types/wedding";

interface OrnatePortraitProps {
  person: Godparent;
  tilt: number;
}

export function OrnatePortrait({ person, tilt }: OrnatePortraitProps) {
  return (
    <motion.figure
      className="mx-auto w-full max-w-[250px]"
      initial={{ opacity: 0, y: 40, rotate: tilt * 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
      
      <div className="rounded-[50%] bg-gold-dark p-1.5 shadow-[0_30px_60px_rgba(0,0,0,0.65)]">
        <div className="rounded-[50%] border-[5px] border-dotted border-gold-light bg-gold p-2">
          <div className="rounded-[50%] bg-gold-dark p-1">
            <img src={person.image} alt={person.name} className="aspect-[4/5] w-full rounded-[50%] object-cover" />
          </div>
        </div>
      </div>
      <figcaption className="mt-5 text-center font-sans text-[10px] uppercase tracking-[0.4em] text-gold-light/80">
        {person.role}
      </figcaption>
    </motion.figure>);

}