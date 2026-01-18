import { LayoutDashboard, Package, Tags, BarChart3, Hexagon, X } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useRef, useState } from "react";

const Sidebar = ({ activeView, setActiveView, isOpen, onClose, onOpen }) => {
  const sidebarRef = useRef(null);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "listings", label: "My Listings", icon: Package },
    { id: "offers", label: "Offers", icon: Tags },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleNavClick = (id) => {
    setActiveView(id);
    if (!isDesktop) {
      onClose();
    }
  };

  // Touch handlers for swipe gestures (mobile only)
  useEffect(() => {
    if (isDesktop) return;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchCurrentX.current = touch.clientX;

      if (!isOpen && touch.clientX < 30) {
        isDragging.current = true;
      } else if (isOpen) {
        isDragging.current = true;
      }
    };

    const handleTouchMove = (e) => {
      if (!isDragging.current) return;

      const touch = e.touches[0];
      touchCurrentX.current = touch.clientX;

      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const deltaX = touchCurrentX.current - touchStartX.current;

      if (isOpen) {
        const translateX = Math.min(0, Math.max(-240, deltaX));
        sidebar.style.transform = `translateX(${translateX}px)`;
        sidebar.style.transition = 'none';
      } else {
        const translateX = Math.min(0, Math.max(-240, -240 + deltaX));
        sidebar.style.transform = `translateX(${translateX}px)`;
        sidebar.style.transition = 'none';
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const deltaX = touchCurrentX.current - touchStartX.current;
      const threshold = 80;

      sidebar.style.transition = 'transform 300ms ease-in-out';
      sidebar.style.transform = '';

      if (isOpen && deltaX < -threshold) {
        onClose();
      } else if (!isOpen && deltaX > threshold) {
        onOpen();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isOpen, onClose, onOpen, isDesktop]);

  // Determine if sidebar should be visible
  const shouldShow = isDesktop || isOpen;

  return (
    <>
      {/* Overlay for mobile */}
      {!isDesktop && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        style={{
          transform: shouldShow ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 300ms ease-in-out'
        }}
        className="w-60 h-screen fixed left-0 top-0 flex flex-col bg-card border-r border-border z-50"
      >
        {/* Close button for mobile */}
        {!isDesktop && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>
        )}

        {/* Logo */}
        <div className="h-16 px-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Hexagon className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Tortoise</h1>
            <p className="text-sm text-muted-foreground">Supplier Portal</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
              VK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium text-foreground truncate">Vikas Kaushik</p>
              <p className="text-sm text-muted-foreground">Supplier</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
