
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import PhotoCarousel from "./gallery/PhotoCarousel";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));

const Gallery = () => {
  // Use the uploaded photos for the carousel
  const carouselPhotos = [
    "/lovable-uploads/86f6709d-ee6f-4040-87b8-5a8011c52f1d.png", 
    "/lovable-uploads/faccfc85-da26-4c1a-b08b-96b34353b7c1.png",
    "/lovable-uploads/9a04f7a6-26e2-4979-93a3-3eaec907d3b3.png",
    "/lovable-uploads/e159f82e-c7d8-4fa8-8bfb-4727a4423b8a.png",
    "/lovable-uploads/9a2cdf7f-650f-4da7-8073-855495d22817.png",
    "/lovable-uploads/23268ce3-6a89-46dc-831b-e8396bb12099.png",
    "/lovable-uploads/2d6e5613-3e06-4146-bb0f-439aa0ea71d8.png",
    "/lovable-uploads/ca1ea03c-7702-451e-8205-8fa4d3a17593.png"
  ];

  // Categories for the photography types
  const categoryImages = [
    {
      image: "/lovable-uploads/86f6709d-ee6f-4040-87b8-5a8011c52f1d.png",
      title: "Wedding Photography"
    },
    {
      image: "/lovable-uploads/9a04f7a6-26e2-4979-93a3-3eaec907d3b3.png",
      title: "Portrait Photography"
    },
    {
      image: "/lovable-uploads/23268ce3-6a89-46dc-831b-e8396bb12099.png",
      title: "Product Photography"
    },
    {
      image: "/lovable-uploads/ca1ea03c-7702-451e-8205-8fa4d3a17593.png",
      title: "Food Photography"
    }
  ];

  return (
    <section 
      id="gallery" 
      className="py-8 md:py-12 bg-gradient-to-b from-charcoal via-charcoal/95 to-offwhite dark:to-charcoal"
    >
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search galleries..."
              className="w-full pl-10 pr-4 py-2 border border-gold/30 rounded-full bg-white/10 text-offwhite focus:ring-2 focus:ring-gold/50 focus:border-transparent backdrop-blur-sm"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold/70 h-5 w-5" />
          </div>
        </div>
        
        {/* Featured Carousel */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-playfair text-offwhite text-center mb-6">
            Featured Work
          </h2>
          <PhotoCarousel photos={carouselPhotos} />
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-playfair text-offwhite text-center mb-6">
            Photography Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryImages.map((item, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-playfair">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <h2 className="text-2xl md:text-3xl font-playfair text-offwhite text-center mb-8">
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

        <div className="mt-12 md:mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-playfair text-charcoal dark:text-offwhite mb-6">
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
