import { LayoutDashboard, Package, Tags, BarChart3 } from "lucide-react";
import { cn } from "../lib/utils";

const Sidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "listings", label: "My Listings", icon: Package },
    { id: "offers", label: "Offers", icon: Tags },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Tortoise Supplier</h1>
        <p className="text-sm text-muted-foreground mt-1">Device Management</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                activeView === item.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:scale-105"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
