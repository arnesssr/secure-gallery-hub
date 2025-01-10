import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BookingModal from "@/components/booking/BookingModal";

const PodcastServices = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Podcast Studio Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Professional podcast recording services at affordable rates:
            </p>
            <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
              <li>Professional Recording Studio</li>
              <li>High-Quality Equipment</li>
              <li>Sound Engineering Support</li>
              <li>Post-Production Services</li>
              <li>Flexible Booking Options</li>
            </ul>
            <Button asChild className="mt-4">
              <Link to="#quote">Get a Quote</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618" alt="Podcast studio" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1581368135153-a506cf13531c" alt="Recording equipment" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1589903308904-1010c2294adc" alt="Microphone setup" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1603963888171-c69ad52b0517" alt="Studio room" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastServices;