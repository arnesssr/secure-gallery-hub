import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PhotographyServices = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Professional Photography</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              We specialize in capturing life's most precious moments with artistic flair and technical excellence.
              Our professional photography services cover a wide range of needs:
            </p>
            <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
              <li>Wedding Photography</li>
              <li>Corporate Events</li>
              <li>Portrait Sessions</li>
              <li>Product Photography</li>
              <li>Real Estate Photography</li>
            </ul>
            <Button className="mt-6">Book a Session</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745" alt="Event photography" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1604017011826-d3b4c23f8914" alt="Portrait photography" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc" alt="Wedding photography" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1532372320572-cda25653a26d" alt="Product photography" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyServices;