import { Search } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  searchIcon?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, searchIcon = false, ...props }, ref) => {
    return (
      <div
        tabIndex={0}
        className={cn(
          "flex h-10 w-full items-center rounded-md border border-stone-200 bg-white pl-3 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-stone-950 focus-within:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-emerald-700 dark:placeholder:text-stone-400 dark:focus-within:ring-emerald-700",
          className
        )}>
        {searchIcon && <Search className="-ml-1 mr-2 size-4 text-stone-400" />}
        <input
          type={type}
          className="flex h-full w-full bg-transparent focus-visible:outline-none"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
