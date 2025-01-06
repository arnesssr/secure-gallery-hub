import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ProductPhotography = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/photography-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Product Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Professional product photography for e-commerce and marketing.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Starting at KES 20,000 per session</h3>
              <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
                <li>E-commerce Photography</li>
                <li>Packshot Photography</li>
                <li>360° Product Views</li>
                <li>Lifestyle Product Photos</li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/product-photography/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1532372320572-cda25653a26d" alt="Product photo" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30" alt="E-commerce product" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1491553895911-0055eca6402d" alt="Product packshot" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e" alt="Lifestyle product" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPhotography;