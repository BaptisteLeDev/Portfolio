import { cn } from "@/lib/cn";

export function Tag({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-fg/15 bg-fg/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-fg/80",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
