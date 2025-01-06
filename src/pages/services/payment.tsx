import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PaymentPage = () => {
  const { service } = useParams();
  
  const formatServiceName = (service: string) => {
    return service
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to={`/services/${service}`} className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {formatServiceName(service || '')}
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Payment Details</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Complete Your Booking</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Service</label>
                <input
                  type="text"
                  value={formatServiceName(service || '')}
                  disabled
                  className="w-full p-3 border rounded-md bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">M-PESA Number</label>
                <input
                  type="tel"
                  required
                  placeholder="254..."
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <Button type="submit" className="w-full">
                Pay Now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;