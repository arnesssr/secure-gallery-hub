
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PhotoTiles from "./gallery/PhotoTiles";
import { getFeaturedPhotos } from "@/utils/imageCategories";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));

const Gallery = () => {
  // Get photos from the centralized utility
  const carouselPhotos = getFeaturedPhotos();
  
  // Use the same photos for tiles, but we'll display only the first 6
  const tilePhotos = carouselPhotos.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Main Content - Reduced top padding to match where header ends */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-charcoal via-charcoal/95 to-offwhite dark:to-charcoal">
        <div className="container mx-auto px-4">
          {/* Reduced padding to move "Our Work" section up */}
          <div className="pt-8 md:pt-16">
            {/* Photo Tiles with enhanced styling */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair text-offwhite text-center mb-12">
                Our Work
              </h2>
              <PhotoTiles photos={tilePhotos} className="animate-fade-in" />
            </div>
          </div>

          {/* Services Section */}
          <h2 className="text-3xl md:text-4xl font-playfair text-offwhite text-center mb-12">
            Our Services
          </h2>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg animate-pulse bg-charcoal/20" />
              ))}
            </div>
          }>
            <ServicesSection />
          </Suspense>

          <div className="mt-16 md:mt-24 text-center">
            <h2 className="text-3xl md:text-4xl font-playfair text-charcoal dark:text-offwhite mb-8">
              Our Portfolio
            </h2>
            <p className="text-charcoal/80 dark:text-offwhite/80 mb-10 max-w-2xl mx-auto text-lg">
              Explore our extensive collection of professional photography work across various genres and styles.
            </p>
            <Link 
              to="/galleries"
              className="inline-flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1"
            >
              <Button 
                className="bg-gold hover:bg-gold/80 text-charcoal px-8 py-6 text-lg"
                size="lg"
              >
                View Full Gallery
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
