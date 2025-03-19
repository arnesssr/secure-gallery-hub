
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ShapeLandingHero from "@/components/ShapeLandingHero";

const Index = () => {
  return (
    <div className="min-h-screen bg-charcoal">
      <Navbar />
      
      {/* Adjusted hero height and improved centering of search bar */}
      <ShapeLandingHero 
        height="25vh" 
        customContent={
          <div className="max-w-lg w-full px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search our gallery..." 
                className="pl-10 pr-4 py-2 w-full bg-black/50 text-white border-gold/30 focus:border-gold transition-colors backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/70 h-4 w-4" />
            </div>
          </div>
        }
      />
      
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
