import { useEffect, useState } from "react";

export function useTypewriter(text: string, active: boolean, speed = 38) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || count >= text.length) return;
    const char = text[count];
    const delay = char === "\n" ? speed * 6 : speed;
    const timer = window.setTimeout(() => setCount((c) => c + 1), delay);
    return () => window.clearTimeout(timer);
  }, [active, count, text, speed]);

  return { typed: text.slice(0, count), done: count >= text.length };
}