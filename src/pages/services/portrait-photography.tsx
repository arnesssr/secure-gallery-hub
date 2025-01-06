import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PortraitPhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Portrait Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Capture your personality with our professional portrait photography.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Sessions from KES 15,000</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>Individual Portraits</li>
                <li>Family Portraits</li>
                <li>Professional Headshots</li>
                <li>Location Shoots</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/portrait-photography/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914" alt="Portrait photo" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt="Professional headshot" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300" alt="Family portrait" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9" alt="Location portrait" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortraitPhotography;