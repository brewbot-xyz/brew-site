import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-normal text-md ring-offset-background transition-colors hover:cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-1 border-primary-accent/75 bg-gradient-to-b from-primary/75 to-primary/25 text-primary-foreground backdrop-blur-sm",
        secondary:
          "border-1 border-white/10 bg-gradient-to-b from-secondary/50 to-secondary/25 text-secondary-foreground backdrop-blur-sm",
        tertiary: "bg-zinc-800 text-secondary-foreground hover:bg-zinc-700",
        ghost:
          "border-none bg-transparent text-zinc-400 hover:text-secondary-foreground",
        link: "border-none text-primary-foreground underline-offset-4 hover:underline",
        blue: "bg-blue-600 text-blue-50 hover:bg-blue-400",
        success:
          "border-1 border-green-800/75 bg-gradient-to-b from-green-800/50 to-green-800/25 text-green-100 backdrop-blur-sm",
        danger:
          "border-1 border-red-800/75 bg-gradient-to-b from-red-800/50 to-red-800/25 text-red-100 backdrop-blur-sm",
      },
      size: {
        sm: "rounded-md px-2 py-1",
        md: "h-10 px-6 py-4",
        lg: "h-11 px-4.5 py-6.5 text-lg",
        icon: "size-10 p-2",
      },
      rounded: {
        xl: "rounded-lg",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "xl",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, ...props }, ref) => {
    size = variant === "link" ? null : size;
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
