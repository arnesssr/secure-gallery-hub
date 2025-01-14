import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
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
      // First create a service booking
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
        // Initiate M-Pesa payment
        const response = await supabase.functions.invoke('initiate-mpesa', {
          body: {
            amount: 1000, // Replace with actual amount
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
        // Handle alternative payment methods
        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            booking_id: booking.id,
            amount: 1000, // Replace with actual amount
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
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-4 border rounded-lg text-center ${
                    paymentMethod === 'mpesa' ? 'border-primary bg-primary/10' : 'border-gray-200'
                  }`}
                >
                  M-Pesa
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 border rounded-lg text-center ${
                    paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-gray-200'
                  }`}
                >
                  Card
                </button>
                <button
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 border rounded-lg text-center ${
                    paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/10' : 'border-gray-200'
                  }`}
                >
                  Bank Transfer
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>
              {paymentMethod === 'mpesa' && (
                <div>
                  <label className="block text-sm font-medium mb-2">M-PESA Number</label>
                  <input
                    type="tel"
                    name="mpesaNumber"
                    value={formData.mpesaNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="254..."
                    className="w-full p-3 border rounded-md"
                  />
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : `Pay with ${paymentMethod === 'bank_transfer' ? 'Bank Transfer' : paymentMethod.toUpperCase()}`}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;