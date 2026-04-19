import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/our-team", label: "Our Team" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin } = useAuth();

  const isHome = location === "/";
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent py-6"
          : "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <img
                src="/images/logo.png"
                alt="Enitan Afolabi & Co. Logo"
                className="w-9 h-9 object-contain flex-shrink-0"
              />
              <span className={`text-xl font-serif font-bold tracking-tight transition-colors ${
                isTransparent ? "text-white" : "text-foreground"
              }`}>
                Enitan Afolabi <span className="font-sans font-semibold tracking-normal">&</span> Co.
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === link.href
                      ? "text-secondary"
                      : isTransparent
                      ? "text-white/90"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            
            <div className="flex items-center gap-4">
              {(isAdmin && localStorage.getItem("is_admin_authenticated") === "true") && (
                <Link href="/admin">
                  <Button variant="outline" className={isTransparent ? "border-white/20 text-white hover:bg-white/10" : ""}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
              <Link href="/contact">
                <Button variant={isTransparent ? "secondary" : "default"} className="font-semibold">
                  Contact Us
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            {(isAdmin && localStorage.getItem("is_admin_authenticated") === "true") && (
               <Link href="/admin">
                <Button variant="outline" size="sm" className={isTransparent ? "border-white/20 text-white" : ""}>
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
              </Link>
            )}
            <button
              className="p-2 text-current"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={isTransparent ? "text-white" : "text-foreground"} size={24} />
              ) : (
                <Menu className={isTransparent ? "text-white" : "text-foreground"} size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-4 flex flex-col space-y-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <div
                className={`text-lg font-medium p-2 rounded-md transition-colors cursor-pointer ${
                  location === link.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </div>
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            {(isAdmin && localStorage.getItem("is_admin_authenticated") === "true") && (
              <Link href="/admin">
                <Button variant="outline" className="w-full font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Link href="/contact">
              <Button className="w-full font-semibold" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
