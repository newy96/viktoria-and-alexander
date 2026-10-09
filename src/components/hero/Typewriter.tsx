import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  children: ReactNode;
  active: boolean;
  paperDelay?: number;
}

const keyRows = ["1234567890", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

export function Typewriter({ children, active, paperDelay = 0 }: TypewriterProps) {
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <div className="relative mx-auto w-[82%] overflow-hidden pt-2">
        <motion.div
          initial={{ y: "88%" }}
          animate={{ y: active ? "0%" : "88%" }}
          transition={{ duration: 2.4, delay: paperDelay, ease: [0.22, 1, 0.36, 1] }}>
          
          {children}
        </motion.div>
      </div>

      <div className="relative -mt-3" aria-hidden="true">
        <div className="relative mx-auto flex h-7 w-[96%] items-center">
          <span className="h-8 w-4 rounded-md border border-neutral-600 bg-neutral-800" />
          <span className="h-5 flex-1 rounded-full border-y border-neutral-700 bg-neutral-900 shadow-[inset_0_2px_4px_rgba(255,255,255,0.08)]" />
          <span className="h-8 w-4 rounded-md border border-neutral-600 bg-neutral-800" />
        </div>
        <div className="relative rounded-b-2xl rounded-t-[36px] border-t border-white/10 bg-wine-600 px-4 pb-5 pt-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)] sm:px-5">
          <div className="mx-auto mb-4 h-8 w-28 rounded-b-full border border-neutral-700 bg-neutral-900" />
          <div className="space-y-1.5 rounded-xl bg-neutral-950 px-2 py-3 sm:px-3">
            {keyRows.map((row, rowIndex) =>
            <div key={row} className="flex justify-center gap-1 sm:gap-1.5" style={{ paddingLeft: rowIndex * 6 }}>
                {row.split("").map((key) =>
              <span
                key={key}
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-700 bg-cream font-news text-[7px] font-bold text-neutral-800 shadow-[0_2px_0_#000] sm:h-6 sm:w-6 sm:text-[8px]">
                
                    {key}
                  </span>
              )}
              </div>
            )}
            <div className="mx-auto mt-2 h-4 w-1/2 rounded-full border-2 border-neutral-700 bg-cream" />
          </div>
        </div>
      </div>
    </div>);

}