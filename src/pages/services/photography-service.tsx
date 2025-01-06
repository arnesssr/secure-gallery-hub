import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const PhotographyService = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { toast } = useToast();

  const packages = [
    {
      id: "basic",
      name: "Basic Package",
      price: "KES 29,999",
      features: [
        "2 Hour Session",
        "50 Digital Photos",
        "Basic Retouching",
        "Online Gallery"
      ]
    },
    {
      id: "premium",
      name: "Premium Package",
      price: "KES 49,999",
      features: [
        "4 Hour Session",
        "100 Digital Photos",
        "Advanced Retouching",
        "Online Gallery",
        "10 Printed Photos"
      ]
    },
    {
      id: "professional",
      name: "Professional Package",
      price: "KES 89,999",
      features: [
        "Full Day Session",
        "200 Digital Photos",
        "Premium Retouching",
        "Online Gallery",
        "20 Printed Photos",
        "Photo Album"
      ]
    }
  ];

  const handleBooking = (packageId: string) => {
    setSelectedPackage(packageId);
    toast({
      title: "Package Selected",
      description: "You've selected the " + packages.find(p => p.id === packageId)?.name,
    });
    // Here you would typically integrate with a payment system
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <div className="container mx-auto px-4 py-20">
        <Link to="/galleries" className="inline-flex items-center text-charcoal dark:text-offwhite hover:text-gold transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Galleries
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-12">
          Professional Photography Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-lg transition-all duration-300 ${
                selectedPackage === pkg.id
                  ? "bg-gold text-charcoal"
                  : "bg-white dark:bg-charcoal/50 text-charcoal dark:text-offwhite"
              }`}
            >
              <h3 className="text-2xl font-playfair mb-4">{pkg.name}</h3>
              <p className="text-xl font-bold mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleBooking(pkg.id)}
                className="w-full bg-charcoal text-offwhite hover:bg-charcoal/90 dark:bg-gold dark:text-charcoal dark:hover:bg-gold/90"
              >
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotographyService;