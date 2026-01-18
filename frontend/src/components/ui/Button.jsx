import { cn } from "../../lib/utils";

const Button = ({ className, variant = "default", size = "default", ...props }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary\/90",
    destructive: "bg-destructive text-white hover:bg-destructive\/90",
    outline: "border border-border bg-transparent hover:bg-secondary text-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
    ghost: "hover:bg-secondary text-foreground",
  };

  const sizes = {
    default: "h-10 px-4",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-6 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export default Button;
