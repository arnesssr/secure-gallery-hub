
import { Menu, Sun, Moon, Home, Image, Calendar, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Gallery", href: "/galleries", icon: Image },
    { name: "Exhibitions", href: "/exhibitions", icon: Calendar },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contacts", icon: Mail },
  ];

  return (
    <nav className="fixed w-full bg-charcoal/90 dark:bg-charcoal/95 backdrop-blur-md z-50 transition-all duration-300 border-b border-gold/10 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center hover:text-gold transition-colors duration-200">
            <img src="/public/lovable-uploads/914d8476-67eb-4b27-ab79-ec12fb60e2b5.png" alt="Logo" className="h-8 mr-2" />
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-offwhite hover:text-gold transition-colors duration-200 font-roboto relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-gold after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-offwhite hover:text-gold"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-offwhite hover:text-gold">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-charcoal/95 backdrop-blur-md border-gold/10">
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-offwhite hover:text-gold transition-colors duration-200 font-roboto text-lg flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-offwhite hover:text-gold w-fit"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                
                <div className="pt-4 mt-auto">
                  <Link to="/auth" className="w-full block">
                    <Button variant="outline" className="w-full">
                      Sign In / Admin
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
