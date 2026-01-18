import { cn } from "../../lib/utils";

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-primary\/10 text-primary",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive\/10 text-destructive",
    success: "bg-success\/10 text-success",
    warning: "bg-warning\/10 text-warning",
    info: "bg-info\/10 text-info",
    outline: "border border-border text-muted-foreground bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export default Badge;
