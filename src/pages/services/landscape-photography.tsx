import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LandscapePhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Landscape Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Stunning landscape photography capturing nature's beauty.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Prints starting at KES 15,000</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>Nature Landscapes</li>
                <li>Urban Landscapes</li>
                <li>Aerial Photography</li>
                <li>Fine Art Prints</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/landscape-photography/payment">Order Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e" alt="Nature landscape" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1480497490787-505ec076689f" alt="Urban landscape" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" alt="Scenic view" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" alt="Mountain landscape" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandscapePhotography;