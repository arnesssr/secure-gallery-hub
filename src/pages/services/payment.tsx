import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, Wallet } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import QuoteRequestForm from "@/components/QuoteRequestForm";

const PaymentPage = () => {
  const { service } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'bank_transfer'>('mpesa');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    mpesaNumber: '',
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

      if (paymentMethod === 'mpesa') {
        const response = await supabase.functions.invoke('initiate-mpesa', {
          body: {
            amount: 1000,
            phone: formData.mpesaNumber,
            bookingId: booking.id,
          },
        });

        if (!response.data.success) {
          throw new Error(response.data.error);
        }

        toast({
          title: "Payment Initiated",
          description: "Please check your phone for the M-Pesa prompt",
        });
      } else {
        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            booking_id: booking.id,
            amount: 1000,
            payment_method: paymentMethod,
            status: 'pending',
          });

        if (paymentError) throw paymentError;

        toast({
          title: "Payment Initiated",
          description: `Please complete your ${paymentMethod} payment`,
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to={`/services/${service}`} 
          className="inline-flex items-center text-gray-600 dark:text-gray-300 mb-8 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {formatServiceName(service)}
        </Link>
        
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
            <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Complete Your Booking
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Choose your preferred payment method and enter your details below
            </p>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-6 border rounded-xl text-center transition-all ${
                    paymentMethod === 'mpesa' 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <Wallet className="h-6 w-6 mx-auto mb-2" />
                  M-Pesa
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-6 border rounded-xl text-center transition-all ${
                    paymentMethod === 'card' 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <CreditCard className="h-6 w-6 mx-auto mb-2" />
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-6 border rounded-xl text-center transition-all ${
                    paymentMethod === 'bank_transfer' 
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <svg 
                    className="h-6 w-6 mx-auto mb-2" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                  Bank Transfer
                </button>
              </div>
            </div>

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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {paymentMethod === 'mpesa' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">M-PESA Number</label>
                    <Input
                      type="tel"
                      name="mpesaNumber"
                      value={formData.mpesaNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                      placeholder="254..."
                    />
                  </div>
                )}
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
                  `Pay with ${paymentMethod === 'bank_transfer' ? 'Bank Transfer' : paymentMethod.toUpperCase()}`
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
