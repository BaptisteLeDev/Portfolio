import { cva, type VariantProps } from "@/lib/cva";
import { cn } from "@/lib/cn";

const cardVariants = cva(
  "relative overflow-hidden transition-[transform,box-shadow] duration-300 ease-[var(--ease-signature)]",
  {
    variants: {
      tone: {
        cream: "bg-cream text-bg",
        glass: "bg-fg/5 text-fg backdrop-blur-md border border-fg/10",
        outline: "bg-transparent text-fg border border-fg/20",
      },
      radius: {
        md: "rounded-[16px]",
        lg: "rounded-[32px]",
        xl: "rounded-[64px]",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 hover:shadow-2xl",
        false: "",
      },
    },
    defaultVariants: { tone: "glass", radius: "lg", interactive: false },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, tone, radius, interactive, ...props }: CardProps) {
  return <div className={cn(cardVariants({ tone, radius, interactive }), className)} {...props} />;
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 md:p-8", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-2xl font-bold tracking-[-0.015em]", className)} {...props} />;
}
