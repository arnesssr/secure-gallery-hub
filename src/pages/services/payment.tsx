
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import QuoteRequestForm from "@/components/QuoteRequestForm";

const PaymentPage = () => {
  const { service } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const formatServiceName = (service: string) => {
    return service
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ') || '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: booking, error: bookingError } = await supabase
        .from('service_bookings')
        .insert({
          service_type: service,
          client_name: formData.fullName,
          client_email: formData.email,
          client_phone: formData.phone,
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          booking_id: booking.id,
          amount: 1000,
          payment_method: 'bank_transfer',
          status: 'pending',
        });

      if (paymentError) throw paymentError;

      toast({
        title: "Booking Successful",
        description: "Please complete your bank transfer using the provided details",
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Determine the correct back link - handle both services/service-name and specific service pages
  const getBackLink = () => {
    if (service === 'drone-services') {
      return '/drone-services';
    } else if (service?.includes('photography')) {
      return `/services/${service}`;
    } else {
      return `/services/${service}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link 
            to={getBackLink()} 
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to {formatServiceName(service)}
          </Link>
          
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Complete Your Booking
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Please fill in your details below to proceed with bank transfer payment
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="+254..."
                />
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-medium mb-2">Bank Transfer Details</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Bank: Example Bank<br />
                  Account Name: Washikadau Entertainment<br />
                  Account Number: XXXX-XXXX-XXXX<br />
                  Branch: Main Branch
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl transition-all"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Proceed with Bank Transfer'
                )}
              </Button>
            </form>
          </div>

          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">
                Or
              </span>
            </div>
          </div>

          <QuoteRequestForm />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
