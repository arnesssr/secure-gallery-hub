
import { Link } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-charcoal/90 backdrop-blur-sm py-3 shadow-sm" // Increased padding from py-1 to py-3
          : "bg-transparent py-4" // Increased padding from py-2 to py-4
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/* Logo removed as requested */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 text-charcoal dark:text-offwhite">
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <Link to="/about" className="hover:text-gold transition-colors">
            About
          </Link>
          <Link to="/galleries" className="hover:text-gold transition-colors">
            Galleries
          </Link>
          <Link to="/exhibitions" className="hover:text-gold transition-colors">
            Exhibitions
          </Link>
          <Link to="/photography-services" className="hover:text-gold transition-colors">
            Services
          </Link>
          <Link to="/photography-school" className="hover:text-gold transition-colors">
            School
          </Link>
          <Link to="/contacts" className="hover:text-gold transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center pb-4 border-b">
                  <Link to="/" className="flex items-center">
                    {/* Logo removed as requested */}
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </SheetTrigger>
                </div>
                <nav className="flex flex-col space-y-4 pt-4">
                  <Link to="/" className="hover:text-gold transition-colors py-2">
                    Home
                  </Link>
                  <Link to="/about" className="hover:text-gold transition-colors py-2">
                    About
                  </Link>
                  <Link to="/galleries" className="hover:text-gold transition-colors py-2">
                    Galleries
                  </Link>
                  <Link to="/exhibitions" className="hover:text-gold transition-colors py-2">
                    Exhibitions
                  </Link>
                  <Link to="/photography-services" className="hover:text-gold transition-colors py-2">
                    Services
                  </Link>
                  <Link to="/photography-school" className="hover:text-gold transition-colors py-2">
                    School
                  </Link>
                  <Link to="/contacts" className="hover:text-gold transition-colors py-2">
                    Contact
                  </Link>
                </nav>
                <div className="mt-auto pt-4 border-t">
                  <Link to="/auth" className="block w-full">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
