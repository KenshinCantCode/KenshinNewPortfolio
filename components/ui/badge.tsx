import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold leading-5 transition-colors",
  {
    variants: {
      variant: {
        default: "border-primary/40 bg-primary/15 text-sky-100",
        secondary: "border-white/10 bg-white/5 text-foreground/80",
        cyan: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
        outline: "border-white/20 text-foreground/80",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
