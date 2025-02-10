
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));

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

        <div className="mt-16 md:mt-24 text-center">
          <h2 className="text-2xl md:text-4xl font-playfair text-charcoal dark:text-offwhite mb-6 animate-fadeIn">
            Our Portfolio
          </h2>
          <p className="text-charcoal/80 dark:text-offwhite/80 mb-8 max-w-2xl mx-auto">
            Explore our extensive collection of professional photography work across various genres and styles.
          </p>
          <Link 
            to="/galleries"
            className="inline-flex items-center gap-2 transform transition-all duration-300 hover:-translate-y-1"
          >
            <Button 
              className="bg-gold hover:bg-gold/80 text-charcoal px-6 py-3 text-lg"
            >
              View Gallery
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
