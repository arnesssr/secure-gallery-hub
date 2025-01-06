import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const WeddingPhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Wedding Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Capture your special day with our professional wedding photography services.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Packages start from KES 50,000</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>Full Day Coverage</li>
                <li>Engagement Session</li>
                <li>Digital Gallery</li>
                <li>Printed Album</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/wedding-photography/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc" alt="Wedding ceremony" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552" alt="Wedding couple" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed" alt="Wedding details" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc" alt="Wedding reception" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingPhotography;