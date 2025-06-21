import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#007254] text-primary-foreground hover:bg-[#bada55] hover:text-heroHeadline active:bg-[#bada55] active:text-heroHeadline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-[#bada55] hover:text-heroHeadline active:bg-[#bada55] active:text-heroHeadline",
        outline:
          "border border-input bg-background hover:bg-[#bada55] hover:text-heroHeadline active:bg-[#bada55] active:text-heroHeadline",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[#bada55] hover:text-heroHeadline active:bg-[#bada55] active:text-heroHeadline",
        ghost: "hover:bg-[#bada55] hover:text-heroHeadline active:bg-[#bada55] active:text-heroHeadline",
        link: "text-primary underline-offset-4 hover:underline hover:text-[#bada55] active:text-[#bada55]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
