import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const shellVariants = cva(
  "relative h-full p-1.5 bg-fg/[0.04] ring-1 ring-fg/[0.08] transition-[transform,box-shadow] duration-300 ease-[var(--ease-signature)]",
  {
    variants: {
      radius: {
        md: "rounded-[16px]",
        lg: "rounded-[32px]",
        xl: "rounded-[64px]",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.5)]",
        false: "",
      },
    },
    defaultVariants: { radius: "lg", interactive: false },
  },
);

const coreVariants = cva(
  "relative h-full overflow-hidden transition-[transform,box-shadow] duration-300 ease-[var(--ease-signature)]",
  {
    variants: {
      tone: {
        cream: "bg-cream text-bg",
        glass: "bg-fg/5 text-fg backdrop-blur-md border border-fg/10",
        outline: "bg-transparent text-fg border border-fg/20",
      },
      radius: {
        md: "rounded-[calc(1rem-0.375rem)]",
        lg: "rounded-[calc(2rem-0.375rem)]",
        xl: "rounded-[calc(4rem-0.375rem)]",
      },
    },
    defaultVariants: { tone: "glass", radius: "lg" },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants>,
    VariantProps<typeof coreVariants> {}

export function Card({ className, tone, radius, interactive, ...props }: CardProps) {
  return (
    <div className={cn(shellVariants({ radius, interactive }))}>
      <div className={cn(coreVariants({ tone, radius }), className)} {...props} />
    </div>
  );
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 md:p-8", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-bold tracking-[-0.015em]", className)} {...props} />;
}
