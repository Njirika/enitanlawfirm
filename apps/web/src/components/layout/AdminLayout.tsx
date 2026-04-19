import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { useAdminLogout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  FileEdit, 
  LogOut,
  Menu,
  X,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const logout = useAdminLogout();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin-sidebar-collapsed") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("admin-sidebar-collapsed", String(isCollapsed));
  }, [isCollapsed]);

  useEffect(() => {
    if (!isLoading && !isAdmin && location !== "/login") {
      setLocation("/login");
    }
  }, [isAdmin, isLoading, location, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse text-slate-500 font-serif text-lg text-primary">Loading Admin Portal...</div>
    </div>;
  }

  if (!isAdmin && location !== "/login") {
    return null; // Will redirect
  }

  if (location === "/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/admin/login";
      }
    });
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/applications", label: "Applications", icon: FileText },
    { href: "/blog", label: "Blog Posts", icon: FileEdit },
    { href: "/profile", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 bg-slate-950 text-slate-300 border-r border-slate-800 transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
        isCollapsed ? "w-20" : "w-64",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Toggle Button - Circular Floating at Top Edge */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-6 -right-4 z-[60] hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-primary hover:border-primary shadow-xl transition-all duration-300 group"
          title={isCollapsed ? "Expand menu" : "Collapse menu"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          )}
        </button>

        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-6 -right-4 z-[60] hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground shadow-xl transition-all duration-300 group hover:scale-110"
          title={isCollapsed ? "Expand menu" : "Collapse menu"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          ) : (
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          )}
        </button>

        <div className="h-full flex flex-col relative">
          {/* Logo Section */}
          <div className={cn(
            "p-6 border-b border-slate-800 flex items-center justify-between",
            isCollapsed && "px-4 justify-center"
          )}>
            {!isCollapsed && (
              <Link href="/">
                <span className="text-xl font-serif font-bold text-white tracking-tight cursor-pointer">Admin Portal</span>
              </Link>
            )}
            {isCollapsed && <LayoutDashboard className="w-8 h-8 text-secondary" />}
            <button className="lg:hidden" onClick={() => setIsMobileOpen(false)}>
              <X className="w-5 h-5 text-slate-500 hover:text-white" />
            </button>
          </div>
          
          {/* Nav Section */}
          <nav className={cn(
            "flex-1 p-4 space-y-2 mt-2",
            isCollapsed ? "overflow-hidden" : "overflow-y-auto"
          )}>
            {navItems.map((item) => {
              const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/");
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-xl cursor-pointer transition-all duration-200 group relative",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-100",
                    isCollapsed && "justify-center px-0"
                  )}>
                    <item.icon className={cn(
                      "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                      !isCollapsed && "mr-3"
                    )} />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                    {isCollapsed && (
                      <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all whitespace-nowrap z-50 shadow-xl border border-slate-700">
                        {item.label}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer Section */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/50">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-400/10 p-2",
                isCollapsed && "justify-center p-0 h-10"
              )}
              onClick={handleLogout}
              disabled={logout.isPending}
            >
              <LogOut className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && (logout.isPending ? "Logging out..." : "Log out")}
            </Button>
            
            {!isCollapsed && (
              <div className="mt-4 pt-4 border-t border-slate-800 text-center">
                <Link href="/">
                  <span className="text-xs text-secondary hover:text-white transition-colors cursor-pointer flex items-center justify-center">
                    <ChevronLeft className="w-3 h-3 mr-1" />
                    Back to Website
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center px-6 lg:hidden shrink-0">
          <button onClick={() => setIsMobileOpen(true)} className="p-2 -ml-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-3 font-serif font-bold text-slate-900">Enitan Afolabi & Co.</span>
        </header>
        
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
