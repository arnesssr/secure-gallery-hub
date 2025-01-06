import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FashionPhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Fashion Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Creative fashion photography for models, designers, and brands.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Starting at KES 25,000 per session</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>Editorial Shoots</li>
                <li>Lookbook Photography</li>
                <li>Campaign Shoots</li>
                <li>Fashion Shows</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/fashion-photography/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b" alt="Fashion editorial" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" alt="Fashion model" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b" alt="Fashion shoot" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe" alt="Fashion show" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionPhotography;