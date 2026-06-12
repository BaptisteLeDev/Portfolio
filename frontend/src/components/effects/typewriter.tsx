import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface TypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  caret?: boolean;
}

export function Typewriter({ text, speed = 45, startDelay = 200, caret = true }: TypewriterProps) {
  const [shown, setShown] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    let id: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      id = setInterval(() => {
        i++;
        setShown(text.slice(0, i));
        if (i >= text.length && id) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [text, speed, startDelay, reduce]);

  return (
    <>
      {shown}
      {caret && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "0.06em",
            height: "0.9em",
            marginLeft: "0.04em",
            verticalAlign: "-0.08em",
            background: "currentColor",
            animation: "caret-blink 1s steps(2) infinite",
          }}
        />
      )}
    </>
  );
}
