import { cn } from "@/lib/cn";

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-sm uppercase tracking-[0.08em] opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
