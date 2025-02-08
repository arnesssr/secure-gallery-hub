
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BookingModal from "@/components/booking/BookingModal";

const EquipmentRentals = () => {
  const equipmentList = [
    {
      category: "P.A Systems",
      items: [
        { name: "Professional Speaker System", rate: "KES 5,000/day" },
        { name: "Wireless Microphone Set", rate: "KES 2,000/day" },
        { name: "Mixing Console", rate: "KES 3,000/day" },
        { name: "Amplifier System", rate: "KES 2,500/day" }
      ]
    },
    {
      category: "Camera Equipment",
      items: [
        { name: "Professional DSLR Camera", rate: "KES 4,000/day" },
        { name: "Camera Lenses Set", rate: "KES 3,000/day" },
        { name: "Tripod", rate: "KES 1,000/day" },
        { name: "Lighting Kit", rate: "KES 2,500/day" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-all duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8 animate-fade-in">
          Equipment Rentals
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6 animate-fade-in">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              We offer professional-grade equipment rentals for all your audio and photography needs. Our equipment is well-maintained and ready for your next project.
            </p>
            <BookingModal 
              serviceType="equipment_rental"
              serviceName="Equipment Rental"
              className="bg-gold hover:bg-gold/80 text-charcoal"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <img 
              src="https://images.unsplash.com/photo-1547910577-d3cd89fb3ff5" 
              alt="Professional camera equipment" 
              className="rounded-lg w-full h-48 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1519683109079-d5f539e1542f" 
              alt="Audio equipment" 
              className="rounded-lg w-full h-48 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04" 
              alt="Sound system" 
              className="rounded-lg w-full h-48 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1461151304267-38535e780c79" 
              alt="Professional setup" 
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {equipmentList.map((category, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-charcoal/50 p-6 rounded-lg shadow-md animate-fade-in"
            >
              <h2 className="text-2xl font-playfair text-charcoal dark:text-offwhite mb-4">
                {category.category}
              </h2>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li 
                    key={itemIndex}
                    className="flex justify-between items-center text-charcoal/80 dark:text-offwhite/80 border-b border-gold/20 pb-2"
                  >
                    <span>{item.name}</span>
                    <span className="text-gold font-medium">{item.rate}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentRentals;
