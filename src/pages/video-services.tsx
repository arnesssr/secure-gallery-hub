import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const VideoServices = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Video Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Professional video production services for all your needs:
            </p>
            <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
              <li>Wedding Videography</li>
              <li>Corporate Videos</li>
              <li>Music Videos</li>
              <li>Event Coverage</li>
              <li>Aerial Videography</li>
            </ul>
            <Button asChild>
              <Link to="/services/video-services/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" alt="Video production" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1579187707643-35646d22b596" alt="Video editing" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4" alt="Video equipment" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b" alt="Video studio" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoServices;