import React from "react";
import { HeartIcon } from "lucide-react";

interface HeartDividerProps {
  className?: string;
  lineWidth?: string;
}

export function HeartDivider({ className = "text-gold", lineWidth = "w-20" }: HeartDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className={`h-px ${lineWidth} bg-current opacity-60`} />
      <HeartIcon className="h-3 w-3" strokeWidth={1.5} />
      <span className={`h-px ${lineWidth} bg-current opacity-60`} />
    </div>);

}