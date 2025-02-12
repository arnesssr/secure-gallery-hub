
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, Film, PlayCircle, Share2, MonitorPlay, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VideoServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal/95 to-charcoal/90">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-offwhite/80 mb-8 hover:text-gold transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-playfair text-offwhite mb-6 bg-gradient-to-r from-gold via-coral to-gold bg-clip-text text-transparent">
            Livestreaming & Videography
          </h1>
          <p className="text-lg md:text-xl text-offwhite/80 max-w-2xl mx-auto">
            Professional video production and live streaming services that bring your events to life
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <Video className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-playfair text-offwhite mb-3">Event Coverage</h3>
            <p className="text-offwhite/70 mb-4">Full event coverage with multi-camera setup and professional editing</p>
            <p className="text-gold font-semibold">From KES 50,000</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <PlayCircle className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-playfair text-offwhite mb-3">Live Streaming</h3>
            <p className="text-offwhite/70 mb-4">Professional live streaming to multiple platforms with real-time graphics</p>
            <p className="text-gold font-semibold">From KES 30,000</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1">
            <Share2 className="w-12 h-12 text-gold mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-playfair text-offwhite mb-3">Social Media Content</h3>
            <p className="text-offwhite/70 mb-4">Short-form video content optimized for social media platforms</p>
            <p className="text-gold font-semibold">From KES 20,000</p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-white/5 to-transparent p-8 rounded-2xl mb-16">
          <h2 className="text-3xl font-playfair text-offwhite text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <MonitorPlay className="w-16 h-16 text-gold mb-4" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">4K Quality</h3>
              <p className="text-offwhite/70">Ultra HD video quality for crystal clear footage</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Film className="w-16 h-16 text-gold mb-4" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Expert Team</h3>
              <p className="text-offwhite/70">Professional videographers with years of experience</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Globe2 className="w-16 h-16 text-gold mb-4" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Global Reach</h3>
              <p className="text-offwhite/70">Stream to multiple platforms simultaneously</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-gold hover:bg-gold/80 text-charcoal px-8 py-6 text-lg">
            <Link to="/services/video-services/payment">Book Now</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoServices;
