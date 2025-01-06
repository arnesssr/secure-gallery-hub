import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CorporatePhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Corporate Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Professional corporate photography services for your business needs.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Starting at KES 30,000 per session</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>Corporate Events</li>
                <li>Business Portraits</li>
                <li>Team Photos</li>
                <li>Office Environment</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/corporate-photography/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" alt="Corporate event" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df" alt="Business portrait" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978" alt="Team photo" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c" alt="Office environment" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporatePhotography;