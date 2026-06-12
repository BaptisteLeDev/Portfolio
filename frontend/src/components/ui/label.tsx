import { cn } from "@/lib/cn";

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefix?: "//" | "_" | "[]" | "";
}

export function Label({ prefix = "//", className, children, ...props }: LabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-sm uppercase tracking-[0.08em] opacity-70",
        className,
      )}
      {...props}
    >
      {prefix && <span className="mr-2">{prefix}</span>}
      {children}
    </span>
  );
}
