
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));

const Gallery = () => {
  const miniGalleryItems = [
    {
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      title: "Business Photography",
      description: "Professional corporate imagery",
      price: "From KES 89,999"
    },
    {
      image: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1",
      title: "Corporate Events",
      description: "Professional business photography",
      price: "From KES 89,999"
    },
    {
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      title: "Landscape Photography",
      description: "Capturing nature's beauty",
      price: "From KES 29,999"
    },
    {
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
      title: "Drone Photography",
      description: "Aerial photography services",
      price: "From KES 59,999"
    }
  ];

  return (
    <section 
      id="gallery" 
      className="py-12 md:py-20 bg-gradient-to-b from-charcoal via-charcoal/95 to-offwhite dark:to-charcoal"
    >
      <div className="container mx-auto px-4">
        {/* Mini Gallery */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-playfair text-offwhite text-center mb-12">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {miniGalleryItems.map((item, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-playfair mb-2">{item.title}</h3>
                    <p className="text-sm text-white/80 mb-2">{item.description}</p>
                    <p className="text-gold font-semibold">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <h2 className="text-2xl md:text-4xl font-playfair text-offwhite text-center mb-8 md:mb-12">
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
          <h2 className="text-2xl md:text-4xl font-playfair text-charcoal dark:text-offwhite mb-6">
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
              View Full Gallery
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
