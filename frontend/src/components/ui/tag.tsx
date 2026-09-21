import { cn } from "@/lib/cn";

export function Tag({
  className,
  children,
  noise,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { noise?: boolean }) {
  return (
    <span
      className={cn(
        "relative overflow-hidden inline-flex items-center rounded-full border border-fg/15 bg-fg/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.1em] text-fg/80",
        className,
      )}
      {...props}
    >
      {noise && <span aria-hidden="true" className="noise-overlay" />}
      {children}
    </span>
  );
}
