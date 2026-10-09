import React, { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "text-gold-light/80" }: SectionLabelProps) {
  return (
    <p className={`font-sans text-[10px] font-medium uppercase tracking-[0.45em] md:text-[11px] ${className}`}>
      {children}
    </p>);

}