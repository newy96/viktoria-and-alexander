import React from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { typedNote } from "../../data/wedding";

interface TypedNoteProps {
  active: boolean;
}

export function TypedNote({ active }: TypedNoteProps) {
  const { typed, done } = useTypewriter(typedNote, active);

  return (
    <div className="paper relative min-h-[420px] px-6 py-8 shadow-2xl">
      <p className="sr-only">{typedNote}</p>
      <p aria-hidden="true" className="whitespace-pre-line font-news text-[13px] leading-relaxed text-neutral-800">
        {typed}
        <span className={`ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-neutral-800 ${done ? "animate-pulse" : ""}`} />
      </p>
    </div>);

}