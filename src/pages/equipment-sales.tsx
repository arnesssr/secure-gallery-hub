import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EquipmentSales = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Equipment Sales</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Quality photography and video equipment for professionals:
            </p>
            <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
              <li>Cameras</li>
              <li>Lenses</li>
              <li>Lighting Equipment</li>
              <li>Audio Equipment</li>
              <li>Accessories</li>
            </ul>
            <Button asChild>
              <Link to="/services/equipment-sales/payment">Shop Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32" alt="Camera equipment" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd" alt="Photography gear" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1581591524425-c7e0978865fc" alt="Lenses" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618" alt="Studio equipment" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentSales;