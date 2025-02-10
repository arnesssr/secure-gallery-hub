
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, Edit, Film, Upload, Share, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VideoEditing = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <Link to="/video-services" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Video Services
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Video Editing Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Professional video editing services to transform your raw footage into compelling content.
            </p>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-charcoal dark:text-offwhite">4 Weeks Complete Package (15k KES)</h3>
              <ul className="list-none space-y-4">
                <li className="flex items-center gap-3 text-charcoal/80 dark:text-offwhite/80">
                  <Edit className="h-5 w-5 text-gold" />
                  Professional Video Editing
                </li>
                <li className="flex items-center gap-3 text-charcoal/80 dark:text-offwhite/80">
                  <Film className="h-5 w-5 text-gold" />
                  Color Grading
                </li>
                <li className="flex items-center gap-3 text-charcoal/80 dark:text-offwhite/80">
                  <Upload className="h-5 w-5 text-gold" />
                  Sound Design
                </li>
                <li className="flex items-center gap-3 text-charcoal/80 dark:text-offwhite/80">
                  <Share className="h-5 w-5 text-gold" />
                  Motion Graphics
                </li>
                <li className="flex items-center gap-3 text-charcoal/80 dark:text-offwhite/80">
                  <Download className="h-5 w-5 text-gold" />
                  Final Export in Multiple Formats
                </li>
              </ul>
            </div>
            <Button asChild>
              <Link to="/services/video-editing/payment">Book Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d" alt="Video editing" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1535016120720-40c646be5580" alt="Color grading" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1536240478700-b869070f9279" alt="Motion graphics" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4" alt="Video production" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VideoEditing;
