import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { BookingType } from "@/lib/supabase";

interface BookingModalProps {
  serviceType: BookingType;
  serviceName: string;
}

const BookingModal = ({ serviceType, serviceName }: BookingModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      service_type: serviceType,
      preferred_date: formData.get("date") as string,
      notes: formData.get("notes") as string,
      contact_email: formData.get("email") as string,
      contact_phone: formData.get("phone") as string,
      status: "pending",
    };

    try {
      const { error } = await supabase.from("bookings").insert([data]);
      
      if (error) throw error;

      toast({
        title: "Booking Submitted",
        description: "We'll contact you shortly to confirm your booking.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your booking.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gold hover:bg-gold/80 text-charcoal">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book {serviceName}</DialogTitle>
          <DialogDescription>
            Fill in your details and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+254..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Tell us more about your requirements..."
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gold hover:bg-gold/80 text-charcoal"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Booking"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;