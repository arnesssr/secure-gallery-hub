
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plane, Camera, Mountain, Building2, Film, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DroneServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal to-[#1A1F2C]">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-offwhite/80 mb-8 hover:text-gold transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-playfair text-offwhite mb-6 bg-gradient-to-r from-gold via-coral to-gold bg-clip-text text-transparent">
            Aerial Photography & Videography
          </h1>
          <p className="text-lg md:text-xl text-offwhite/80 max-w-2xl mx-auto">
            Capture breathtaking aerial shots with our professional drone services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <Mountain className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-playfair text-offwhite mb-3">Landscape Photography</h3>
            <p className="text-offwhite/70 mb-4">Stunning aerial views of landscapes and nature</p>
            <p className="text-gold font-semibold">From KES 25,000</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <Building2 className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-playfair text-offwhite mb-3">Real Estate</h3>
            <p className="text-offwhite/70 mb-4">Aerial photography and video for property marketing</p>
            <p className="text-gold font-semibold">From KES 35,000</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <Film className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-playfair text-offwhite mb-3">Event Coverage</h3>
            <p className="text-offwhite/70 mb-4">Dynamic aerial footage for events and celebrations</p>
            <p className="text-gold font-semibold">From KES 40,000</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-playfair text-offwhite text-center mb-12">Equipment & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <Plane className="w-16 h-16 text-gold mb-4" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Professional Drones</h3>
              <p className="text-offwhite/70">Latest DJI drones for highest quality</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Camera className="w-16 h-16 text-gold mb-4" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">4K Cameras</h3>
              <p className="text-offwhite/70">Ultra HD aerial photography</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="w-16 h-16 text-gold mb-4" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Licensed Pilots</h3>
              <p className="text-offwhite/70">KCAA certified drone operators</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-gold hover:bg-gold/80 text-charcoal px-8 py-6 text-lg">
            <Link to="/services/drone-services/payment">Book Now</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DroneServices;
