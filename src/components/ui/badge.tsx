import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-blue-200 bg-blue-50 text-blue-700 font-semibold border",
    secondary: "border-slate-200 bg-slate-100 text-slate-700 font-medium border",
    destructive: "border-rose-200 bg-rose-50 text-rose-700 font-medium border",
    outline: "text-slate-700 border border-slate-200 bg-white",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700 font-semibold border",
    warning: "border-amber-200 bg-amber-50 text-amber-800 font-semibold border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg px-2.5 py-1 text-xs transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
