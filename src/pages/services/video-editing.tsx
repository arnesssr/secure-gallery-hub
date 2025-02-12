
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scissors, Layers, Clock, Sparkles, Share2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VideoEditing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-[#2C2F36] to-charcoal/90">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-offwhite/80 mb-8 hover:text-gold transition-colors group">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-playfair text-offwhite mb-6 bg-gradient-to-r from-gold via-coral to-gold bg-clip-text text-transparent">
            Professional Video Editing
          </h1>
          <p className="text-lg md:text-xl text-offwhite/80 max-w-2xl mx-auto">
            Transform your raw footage into captivating stories with our expert editing services
          </p>
        </div>

        {/* Course Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-playfair text-offwhite mb-4">4 Weeks Complete Package</h2>
              <p className="text-offwhite/70 mb-6">
                Master the art of video editing with our comprehensive course. Learn industry-standard software and techniques.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-offwhite/70">
                  <Clock className="w-5 h-5 text-gold mr-3" />
                  20 hours of hands-on training
                </li>
                <li className="flex items-center text-offwhite/70">
                  <Layers className="w-5 h-5 text-gold mr-3" />
                  Professional editing software included
                </li>
                <li className="flex items-center text-offwhite/70">
                  <Sparkles className="w-5 h-5 text-gold mr-3" />
                  Certificate upon completion
                </li>
              </ul>
              <div className="mt-8">
                <p className="text-2xl font-playfair text-gold">KES 15,000</p>
              </div>
            </div>

            <Button asChild className="w-full bg-gold hover:bg-gold/80 text-charcoal py-6 text-lg">
              <Link to="/services/video-editing/payment">Enroll Now</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300">
              <Scissors className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Basic Editing</h3>
              <p className="text-offwhite/70">Learn essential cutting and trimming techniques</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300">
              <Layers className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Color Grading</h3>
              <p className="text-offwhite/70">Master color correction and grading</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300">
              <Share2 className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Effects & Transitions</h3>
              <p className="text-offwhite/70">Create stunning visual effects</p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:border-gold/30 transition-all duration-300">
              <Download className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-playfair text-offwhite mb-2">Export & Delivery</h3>
              <p className="text-offwhite/70">Optimize for different platforms</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoEditing;
