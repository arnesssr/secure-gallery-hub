import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SportsPhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Sports Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Dynamic sports photography capturing the intensity of the moment.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Starting at KES 22,000 per event</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>Sports Events</li>
                <li>Team Photos</li>
                <li>Action Shots</li>
                <li>Tournament Coverage</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/sports-photography/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211" alt="Sports action" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b" alt="Team sports" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1526676037777-05a232554f77" alt="Sports event" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1530549387789-4c1017266635" alt="Tournament" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsPhotography;