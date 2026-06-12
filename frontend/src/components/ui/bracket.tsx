import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const bracketVariants = cva("bracket select-none", {
  variants: {
    size: {
      md: "text-6xl",
      lg: "text-8xl",
      giant: "text-[length:var(--text-bracket)]",
    },
    float: { true: "absolute", false: "" },
  },
  defaultVariants: { size: "md", float: false },
});

export interface BracketProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof bracketVariants> {
  side: "left" | "right";
}

export function Bracket({ side, size, float, className, ...props }: BracketProps) {
  return (
    <span aria-hidden="true" className={cn(bracketVariants({ size, float }), className)} {...props}>
      {side === "left" ? "[" : "]"}
    </span>
  );
}
