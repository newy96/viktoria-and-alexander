import React from "react";
import { motion } from "framer-motion";
import type { GiftIdea } from "../../types/wedding";

interface GiftBoxProps {
  gift: GiftIdea;
  index: number;
  widthClass: string;
}

export function GiftBox({ gift, index, widthClass }: GiftBoxProps) {
  const reversed = index % 2 === 1;

  return (
    <motion.li
      className={`relative mx-auto ${widthClass}`}
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}>
      
      <div className="relative -mx-1.5 h-3 rounded-[2px] border-b border-black/10 bg-cream-dark shadow-[0_4px_6px_rgba(0,0,0,0.18)]" aria-hidden="true" />
      <div
        className={`paper flex items-center gap-4 px-4 py-3 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.6)] ${
        reversed ? "flex-row-reverse text-right" : "text-left"}`
        }>
        
        <img src={gift.image} alt="" className="h-20 w-28 flex-none object-cover mix-blend-multiply sm:h-24 sm:w-36" />
        <div>
          <h3 className="font-display text-lg text-ink">{gift.title}</h3>
          <p className="font-serif text-[15px] italic leading-snug text-ink/70">{gift.caption}</p>
        </div>
      </div>
    </motion.li>);

}