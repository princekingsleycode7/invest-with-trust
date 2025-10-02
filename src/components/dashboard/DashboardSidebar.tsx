import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Building2, ChevronLeft, ChevronRight, LayoutDashboard, FolderOpen, Mail, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  onSignOut: () => void;
}

export function DashboardSidebar({ onSignOut }: DashboardSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard"
    },
    {
      title: "Projects",
      icon: FolderOpen,
      href: "/projects"
    },
    {
      title: "Contact",
      icon: Mail,
      href: "/contact"
    }
  ];

  return (
    <div className={cn(
      "flex flex-col h-screen border-r bg-background transition-all duration-300",
      isCollapsed ? "w-[70px]" : "w-[240px]"
    )}>
      {/* Logo Section */}
      <Link 
        to="/"
        className={cn(
          "flex items-center gap-2 p-4 h-16 border-b",
          isCollapsed && "justify-center"
        )}
      >
        <Building2 className="h-8 w-8 text-primary flex-shrink-0" />
        {!isCollapsed && (
          <span className="text-xl font-bold text-foreground">RehobothBank</span>
        )}
      </Link>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-2 border-t">
        <button
          onClick={onSignOut}
          className={cn(
            "flex items-center gap-3 px-3 py-2 w-full rounded-md transition-colors",
            "hover:bg-destructive/10 hover:text-destructive",
            "text-muted-foreground",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span>Log Out</span>}
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full mt-2"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}