import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.99]";
    
    const variants = {
      default: "bg-[#0B63E5] hover:bg-[#0952C2] text-white shadow-sm hover:shadow",
      destructive: "bg-rose-600 hover:bg-rose-500 text-white shadow-sm",
      outline: "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300",
      secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
      link: "text-[#0B63E5] underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-11 px-5 py-2.5",
      sm: "h-9 rounded-lg px-3.5 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-9 w-9 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
