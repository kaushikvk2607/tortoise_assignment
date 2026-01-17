import { cn } from "../../lib/utils";

const Button = ({ className, variant = "default", size = "default", ...props }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
    ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:shadow-md active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};

export default Button;
