import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FoodPhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Food Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Appetizing food photography for restaurants and brands.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Starting at KES 18,000 per session</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>Menu Photography</li>
                <li>Restaurant Ambiance</li>
                <li>Food Packaging</li>
                <li>Social Media Content</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/food-photography/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Food photo" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327" alt="Restaurant food" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94" alt="Menu item" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601" alt="Food styling" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPhotography;