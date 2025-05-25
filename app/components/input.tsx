import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full rounded-lg border border-secondary-accent bg-secondary text-lg ring-offset-background transition-shadow placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibrant focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "text-md h-10 rounded-md px-4 py-2",
        md: "h-12 px-6 py-3",
        lg: "h-14 rounded-xl px-8 py-4 text-xl",
      },
      hasIcon: {
        true: "pl-10",
      },
    },
    defaultVariants: {
      size: "md",
      hasIcon: false,
    },
  },
);

const iconVariants = cva(
  "absolute left-3 top-1/2 -translate-y-1/2 stroke-[4px] text-muted-foreground",
  {
    variants: {
      size: {
        sm: "text-md",
        md: "text-lg",
        lg: "text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, startIcon, hasIcon, ...props }, ref) => {
    return (
      <div className="relative flex w-full flex-col">
        {startIcon && <span className={cn(iconVariants({ size }))}>{startIcon}</span>}
        <input
          type={type}
          className={cn(
            inputVariants({ size, hasIcon: startIcon ? true : hasIcon, className }),
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
