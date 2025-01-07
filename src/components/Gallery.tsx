import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));
const PhotographyTypes = lazy(() => import("./gallery/PhotographyTypes"));

const Gallery = () => {
  return (
    <section 
      id="gallery" 
      className="py-12 md:py-20 bg-gradient-to-b from-charcoal via-charcoal/95 to-offwhite dark:to-charcoal transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-playfair text-offwhite dark:text-offwhite text-center mb-8 md:mb-12 animate-fadeIn">
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

        <h2 className="text-2xl md:text-4xl font-playfair text-charcoal dark:text-offwhite text-center mt-16 md:mt-20 mb-8 md:mb-12 animate-fadeIn">
          Photography Portfolio
        </h2>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg animate-pulse bg-charcoal/20" />
            ))}
          </div>
        }>
          <PhotographyTypes />
        </Suspense>
      </div>
    </section>
  );
};

export default Gallery;