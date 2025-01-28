"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <label className={cn("flex items-center cursor-pointer")}>
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
    <span className="flex items-center justify-center text-current">
      <Check className="h-4 w-4 hidden peer-checked:block" />
    </span>
  </label>
))

Checkbox.displayName = "Checkbox"

export { Checkbox }
