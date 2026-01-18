import { Bell, Search, Moon, Sun, User, Menu } from "lucide-react";

const Header = ({ userRole, onToggleRole, darkMode, onToggleDarkMode, onToggleSidebar }) => {
    return (
        <header className="h-16 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
                {/* Mobile Menu Button */}
                <button
                    onClick={onToggleSidebar}
                    className="lg:hidden h-11 w-11 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6 text-foreground" />
                </button>

                {/* Search */}
                <div className="hidden sm:block flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full h-11 pl-9 pr-4 rounded-lg bg-secondary border-0 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                        />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <button
                    onClick={onToggleDarkMode}
                    className="h-11 w-11 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer"
                    title={darkMode ? "Light mode" : "Dark mode"}
                >
                    {darkMode ? (
                        <Sun className="h-5 w-5 text-foreground" />
                    ) : (
                        <Moon className="h-5 w-5 text-foreground" />
                    )}
                </button>

                {/* Role Toggle */}
                <button
                    onClick={onToggleRole}
                    className="hidden sm:flex items-center gap-2 h-11 px-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                >
                    <span className={`w-2.5 h-2.5 rounded-full ${userRole === "supplier" ? "bg-primary" : "bg-info"}`} />
                    <span className="text-base font-medium text-foreground">
                        {userRole === "supplier" ? "Supplier" : "Admin"}
                    </span>
                </button>

                {/* Notifications */}
                <button className="relative h-11 w-11 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors cursor-pointer">
                    <Bell className="h-5 w-5 text-foreground" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-destructive" />
                </button>

                {/* User */}
                <button className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center ml-1 cursor-pointer hover:bg-primary/20 transition-colors">
                    <User className="h-5 w-5 text-primary" />
                </button>
            </div>
        </header>
    );
};

export default Header;
