import { cn } from "../../lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({
    title,
    value,
    change,
    changeType = "neutral",
    icon: Icon,
    className
}) => {
    return (
        <div className={cn(
            "rounded-xl bg-card border border-border p-5",
            className
        )}>
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary\/10 flex items-center justify-center">
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                </div>

                {change && (
                    <div className={cn(
                        "flex items-center gap-1 text-xs font-medium",
                        changeType === "positive" ? "text-success" :
                            changeType === "negative" ? "text-destructive" : "text-muted-foreground"
                    )}>
                        {changeType === "positive" && <TrendingUp className="h-3 w-3" />}
                        {changeType === "negative" && <TrendingDown className="h-3 w-3" />}
                        {change}
                    </div>
                )}
            </div>

            <div className="mt-4">
                <p className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">{value}</p>
                <p className="text-sm sm:text-base text-muted-foreground mt-0.5">{title}</p>
            </div>
        </div>
    );
};

export default StatsCard;
