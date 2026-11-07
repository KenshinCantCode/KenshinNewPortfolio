import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
