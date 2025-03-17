
import { Menu, Sun, Moon, Home, Image, Calendar, Info, Mail, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import logo from '../assets/logo.png';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Gallery", href: "/galleries", icon: Image },
    { name: "Exhibitions", href: "/exhibitions", icon: Calendar },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contacts", icon: Mail },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add search functionality here
    setSearchQuery("");
  };

  return (
    <nav className="fixed w-full bg-charcoal/90 dark:bg-charcoal/95 backdrop-blur-md z-50 transition-all duration-300 border-b border-gold/10 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center hover:text-gold transition-colors duration-200">
            <img src={logo} alt="Logo" className="h-8 mr-2" />
          </Link>

          {/* Search Bar for Desktop */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex items-center relative max-w-md w-full mx-4"
          >
            <Input
              type="search"
              placeholder="Search galleries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10 rounded-full border-gold/30 focus-visible:ring-gold/50"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 text-offwhite"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

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
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search galleries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 rounded-full border-gold/30 focus-visible:ring-gold/50"
                    />
                    <Button 
                      type="submit" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-offwhite"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
                
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
