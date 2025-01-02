import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SoundServices = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Sound Engineering & Equipment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Professional sound solutions for events of all sizes. Our services include:
            </p>
            <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
              <li>High-end Stereo System Rental</li>
              <li>Professional Sound Mixing</li>
              <li>Live Event Sound Setup</li>
              <li>Audio Equipment Rental</li>
              <li>Acoustic Consultation</li>
            </ul>
            <Button className="mt-6">Request Quote</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625" alt="Sound equipment" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04" alt="Sound mixing" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0" alt="Live sound" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1626126525134-fbbc07afb32c" alt="Studio setup" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoundServices;