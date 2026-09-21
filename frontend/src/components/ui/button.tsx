import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body font-medium transition-[transform,background,box-shadow] duration-200 ease-[var(--ease-signature)] hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        "solid-dark": "bg-bg text-fg",
        "solid-cream": "bg-cream text-bg",
        gradient:
          "bg-[linear-gradient(135deg,var(--color-indigo),var(--color-pink))] text-fg shadow-[0_8px_24px_-8px_color-mix(in_oklch,var(--color-pink)_60%,transparent)] hover:shadow-[0_12px_32px_-8px_color-mix(in_oklch,var(--color-pink)_70%,transparent)]",
        "glass-dark": "bg-bg/10 text-bg backdrop-blur-md hover:bg-bg/20",
        "glass-cream": "bg-fg/10 text-fg backdrop-blur-md hover:bg-fg/20",
        ghost: "bg-transparent text-fg hover:bg-fg/10",
        link: "bg-transparent text-fg underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-sm",
        md: "h-11 rounded-full px-6 text-base",
        lg: "h-14 rounded-full px-8 text-lg",
        icon: "size-11 rounded-full",
      },
    },
    defaultVariants: { variant: "solid-dark", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
