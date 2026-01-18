import { cn } from "../../lib/utils";

export const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      "rounded-xl bg-card border border-border",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("px-5 py-4", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-base sm:text-lg font-semibold text-foreground", className)} {...props} />
);

export const CardDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground mt-1", className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("px-5 pb-5", className)} {...props} />
);
