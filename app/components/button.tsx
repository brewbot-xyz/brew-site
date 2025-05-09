import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "text-md inline-flex items-center justify-center whitespace-nowrap font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer",
    {
        variants: {
            variant: {
                primary: "border-1 border-primary-accent bg-gradient-to-b from-primary-accent/50 to-primary/50 text-primary-foreground backdrop-blur-xs",
                secondary:
                    "border-1 border-secondary-accent bg-gradient-to-b from-secondary-accent/50 to-secondary/50 text-secondary-foreground backdrop-blur-xs",
                tertiary: "bg-zinc-800 text-secondary-foreground hover:bg-zinc-700",
                ghost: "border-none bg-transparent text-zinc-400 hover:text-secondary-foreground",
                link: "border-none text-primary-foreground underline-offset-4 hover:underline",
                blue: "bg-blue-600 text-blue-50 hover:bg-blue-400",
                success: "border-1 border-green-700 bg-gradient-to-b from-green-500/50 to-green-900/50 text-green-300 backdrop-blur-xs",
                danger: "border-1 border-red-700 bg-gradient-to-b from-red-500/50 to-red-900/50 text-red-300 backdrop-blur-xs",
            },
            size: {
                sm: "rounded-md px-2 py-1",
                md: "h-10 px-6 py-4",
                lg: "h-11 text-lg px-4.5 py-6.5",
                icon: "size-10 p-2",
            },
            rounded: {
                xl: "rounded-2xl",
                none: "rounded-none",
            }
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            rounded: "xl",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, rounded, ...props }, ref) => {
    size = variant === "link" ? null : size
    return <button className={cn(buttonVariants({ variant, size, rounded, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
