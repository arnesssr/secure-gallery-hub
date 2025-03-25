
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
      
      {/* Increased hero height for better spacing */}
      <ShapeLandingHero 
        height="40vh" 
        customContent={
          <div className="max-w-lg w-full px-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-offwhite text-center mb-6">
              Capture the Moment
            </h1>
            <p className="text-offwhite/80 text-center mb-6 text-lg">
              Professional photography that tells your story
            </p>
            {/* Search bar moved below the tagline as requested */}
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
