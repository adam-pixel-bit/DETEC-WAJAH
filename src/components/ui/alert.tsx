import * as React from "react";
import { cn } from "@/lib/utils";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" | "warning" | "info" }
>(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-white border-slate-200 text-slate-800",
    destructive: "border-rose-200 bg-rose-50 text-rose-800 [&>svg]:text-rose-600",
    warning: "border-amber-200 bg-amber-50 text-amber-900 [&>svg]:text-amber-600",
    info: "border-blue-200 bg-blue-50 text-blue-900 [&>svg]:text-blue-600",
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-3.5 text-xs [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-2px] [&>svg]:absolute [&>svg]:left-3.5 [&>svg]:top-3.5",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-xs [&_p]:leading-relaxed opacity-95", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
