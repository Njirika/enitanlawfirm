import { useEffect } from "react";
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
  X
} from "lucide-react";
import { useState } from "react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const logout = useAdminLogout();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAdmin && location !== "/admin/login") {
      setLocation("/admin/login");
    }
  }, [isAdmin, isLoading, location, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAdmin && location !== "/admin/login") {
    return null; // Will redirect
  }

  if (location === "/admin/login") {
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
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/applications", label: "Applications", icon: FileText },
    { href: "/admin/blog", label: "Blog Posts", icon: FileEdit },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:block
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <Link href="/admin">
              <span className="text-xl font-serif font-bold text-primary cursor-pointer">Admin Portal</span>
            </Link>
            <button className="lg:hidden" onClick={() => setIsMobileOpen(false)}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location === item.href || (location.startsWith(item.href) && item.href !== "/admin");
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg cursor-pointer transition-colors
                    ${isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  `}>
                    <item.icon className="w-5 h-5 mr-3 shrink-0" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 border-transparent"
              onClick={handleLogout}
              disabled={logout.isPending}
            >
              <LogOut className="w-5 h-5 mr-3 shrink-0" />
              {logout.isPending ? "Logging out..." : "Log out"}
            </Button>
            <div className="mt-4 pt-4 border-t border-border text-center">
              <Link href="/">
                <span className="text-sm text-primary hover:underline cursor-pointer">← Back to Website</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card flex items-center px-4 lg:hidden">
          <button onClick={() => setIsMobileOpen(true)} className="p-2 -ml-2 text-muted-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-2 font-serif font-bold text-primary">Enitan Afolabi & Co.</span>
        </header>
        
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
