
import { Button } from "@/components/ui/button";
import { ArrowLeft, Camera, Users, Building2, Frame } from "lucide-react";
import { Link } from "react-router-dom";
import PhotographyTypes from "@/components/gallery/PhotographyTypes";

const PhotographyServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-offwhite to-gold/5 dark:from-charcoal dark:to-charcoal/95 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <Link 
          to="/" 
          className="inline-flex items-center text-charcoal/80 dark:text-offwhite/80 mb-8 hover:text-gold transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-playfair text-charcoal dark:text-offwhite mb-6 text-center">
            Professional Photography
          </h1>
          <p className="text-lg md:text-xl text-charcoal/80 dark:text-offwhite/80 text-center mb-12">
            Capturing life's most precious moments with artistic flair and technical excellence
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-charcoal/50 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform">
              <Camera className="w-8 h-8 text-gold mb-3" />
              <h3 className="text-sm font-medium text-charcoal dark:text-offwhite">Premium Equipment</h3>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-charcoal/50 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform">
              <Users className="w-8 h-8 text-gold mb-3" />
              <h3 className="text-sm font-medium text-charcoal dark:text-offwhite">Expert Team</h3>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-charcoal/50 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform">
              <Building2 className="w-8 h-8 text-gold mb-3" />
              <h3 className="text-sm font-medium text-charcoal dark:text-offwhite">Studio Access</h3>
            </div>
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-charcoal/50 rounded-lg backdrop-blur-sm hover:scale-105 transition-transform">
              <Frame className="w-8 h-8 text-gold mb-3" />
              <h3 className="text-sm font-medium text-charcoal dark:text-offwhite">Custom Framing</h3>
            </div>
          </div>
        </div>

        <div className="space-y-16 animate-fadeIn delay-200">
          <section>
            <h2 className="text-3xl font-playfair text-charcoal dark:text-offwhite mb-8 text-center">
              Our Photography Services
            </h2>
            <PhotographyTypes />
          </section>

          <section className="max-w-4xl mx-auto bg-white/50 dark:bg-charcoal/50 p-8 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl font-playfair text-charcoal dark:text-offwhite mb-6 text-center">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-playfair text-charcoal dark:text-offwhite mb-2">
                  Professional Excellence
                </h3>
                <p className="text-charcoal/80 dark:text-offwhite/80">
                  Our team of experienced photographers brings technical expertise and creative vision to every project.
                </p>
                <ul className="list-disc list-inside space-y-2 text-charcoal/80 dark:text-offwhite/80">
                  <li>State-of-the-art equipment</li>
                  <li>Professional editing services</li>
                  <li>Flexible booking options</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e" 
                  alt="Professional photography" 
                  className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                  alt="Portrait photography" 
                  className="rounded-lg w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PhotographyServices;
