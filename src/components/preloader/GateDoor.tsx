import React from "react";
import { motion } from "framer-motion";
import { images } from "../../data/wedding";

interface GateDoorProps {
  side: "left" | "right";
  opening: boolean;
}

export function GateDoor({ side, opening }: GateDoorProps) {
  const isLeft = side === "left";

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute inset-y-0 w-1/2 bg-wine-800 ${isLeft ? "left-0 border-r" : "right-0 border-l"} border-gold/50`}
      style={{
        backgroundImage: `url(${images.velvet})`,
        backgroundSize: "200% 100%",
        backgroundPosition: isLeft ? "left center" : "right center"
      }}
      initial={{ x: "0%" }}
      animate={{ x: opening ? isLeft ? "-101%" : "101%" : "0%" }}
      transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}>
      
      <div className="absolute inset-0 bg-wine-950/45" />
      <div
        className={`absolute bottom-6 top-6 border border-gold/40 md:bottom-10 md:top-10 ${
        isLeft ? "left-6 right-3 md:left-10 md:right-5" : "left-3 right-6 md:left-5 md:right-10"}`
        }>
        
        <div className="absolute inset-2 border border-gold/20" />
      </div>
    </motion.div>);

}