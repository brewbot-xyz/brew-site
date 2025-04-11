import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "text-md inline-flex items-center justify-center whitespace-nowrap font-normal ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer",
    {
        variants: {
            variant: {
                primary: "border-2 border-primary-accent bg-primary text-primary-foreground hover:bg-primary-accent",
                secondary:
                    "border-2 border-muted bg-secondary text-secondary-foreground hover:bg-muted",
                tertiary: "bg-zinc-800 text-secondary-foreground hover:bg-zinc-700",
                ghost: "border-none bg-transparent text-zinc-400 hover:text-secondary-foreground",
                link: "border-none text-primary-foreground underline-offset-4 hover:underline",
                blue: "bg-blue-600 text-blue-50 hover:bg-blue-400",
            },
            size: {
                sm: "rounded-md px-2 py-1",
                md: "h-10 px-4 py-3",
                lg: "h-11 p-6",
                icon: "size-10 p-2",
            },
            rounded: {
                xl: "rounded-xl border-1 border-white/10",
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
