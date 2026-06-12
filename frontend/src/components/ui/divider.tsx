import { cn } from "@/lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "line" | "brackets";
}

export function Divider({ variant = "line", className, ...props }: DividerProps) {
  if (variant === "brackets") {
    return (
      <div
        aria-hidden="true"
        className={cn("flex items-center justify-center gap-4 text-fg/40", className)}
        {...props}
      >
        <span className="font-display text-2xl">[</span>
        <span className="h-px flex-1 bg-fg/20" />
        <span className="font-display text-2xl">]</span>
      </div>
    );
  }
  return <div aria-hidden="true" className={cn("h-px w-full bg-fg/20", className)} {...props} />;
}
