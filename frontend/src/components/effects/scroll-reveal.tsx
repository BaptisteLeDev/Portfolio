import { cn } from "@/lib/cn";

type Effect = "fade" | "rise" | "slide-left" | "slide-right" | "scale";

const effectStyles: Record<Effect, React.CSSProperties> = {
  fade:          { opacity: 0, filter: "blur(3px)", animation: "rise-in linear both",  animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
  rise:          { opacity: 0, transform: "translateY(48px)", filter: "blur(4px)", animation: "rise-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 22%" },
  "slide-left":  { opacity: 0, transform: "translateX(-32px)", animation: "rise-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
  "slide-right": { opacity: 0, transform: "translateX(32px)", animation: "rise-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
  scale:         { opacity: 0, transform: "scale(0.96)", animation: "scale-in linear both", animationTimeline: "view()", animationRange: "entry 0% cover 30%" },
};

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  effect?: Effect;
  delay?: number;
}

export function ScrollReveal({
  effect = "rise",
  delay = 0,
  className,
  style,
  ...props
}: ScrollRevealProps) {
  return (
    <div
      className={cn(className)}
      style={{ ...effectStyles[effect], animationDelay: `${delay}ms`, ...style }}
      {...props}
    />
  );
}
