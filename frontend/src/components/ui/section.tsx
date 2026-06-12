import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";
import { NoiseOverlay } from "@/components/effects/noise-overlay";

const sectionVariants = cva("relative overflow-hidden py-20 md:py-[var(--spacing-section)]", {
  variants: {
    tone: {
      cream: "bg-cream text-bg",
      dark: "bg-bg text-fg",
      gradient: "bg-transparent text-fg",
      glass: "bg-fg/5 text-fg backdrop-blur-xl",
    },
    rounded: {
      none: "",
      xl: "rounded-[64px] max-md:rounded-[32px]",
      "2xl": "rounded-[100px] max-md:rounded-[64px] max-sm:rounded-[32px]",
    },
    overlap: {
      true: "-mt-20 max-md:-mt-10",
      false: "",
    },
  },
  defaultVariants: { tone: "dark", rounded: "none", overlap: false },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  noise?: boolean;
}

export function Section({
  className,
  tone,
  rounded,
  overlap,
  noise = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone, rounded, overlap }), className)} {...props}>
      {noise && <NoiseOverlay />}
      {children}
    </section>
  );
}
