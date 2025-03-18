
import { lazy, Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PhotoCarousel from "./gallery/PhotoCarousel";
import PhotoTiles from "./gallery/PhotoTiles";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));

const Gallery = () => {
  // Use the newly uploaded photos
  const carouselPhotos = [
    "/lovable-uploads/ba435b40-e58d-4056-941b-b678d94161b2.png", 
    "/lovable-uploads/ac897cb9-aed5-49a1-b7d4-30683af25521.png",
    "/lovable-uploads/425b89e7-4e02-4b46-be24-3b31564fe22d.png",
    "/lovable-uploads/b8d1a9ee-bb1c-464b-ad90-06476ae1c855.png",
    "/lovable-uploads/21cc20b6-f76c-47c7-8233-d99e64bfb0bf.png",
    "/lovable-uploads/8469600f-9e5b-4794-9302-d272e67af0b8.png",
    "/lovable-uploads/1d8280c9-97c6-4820-8ea9-fd36d6d9541f.png",
    "/lovable-uploads/284c8945-aeed-4a5b-9f09-4daf1032ca4c.png"
  ];

  // Use the same photos for tiles, but we'll display them differently
  const tilePhotos = [
    "/lovable-uploads/ba435b40-e58d-4056-941b-b678d94161b2.png", 
    "/lovable-uploads/ac897cb9-aed5-49a1-b7d4-30683af25521.png",
    "/lovable-uploads/425b89e7-4e02-4b46-be24-3b31564fe22d.png",
    "/lovable-uploads/b8d1a9ee-bb1c-464b-ad90-06476ae1c855.png",
    "/lovable-uploads/21cc20b6-f76c-47c7-8233-d99e64bfb0bf.png",
    "/lovable-uploads/8469600f-9e5b-4794-9302-d272e67af0b8.png" 
  ];

  return (
    <>
      {/* Featured Carousel as Header */}
      <section className="w-full h-[80vh] relative">
        <PhotoCarousel photos={carouselPhotos} autoplayInterval={5000} className="h-full" />
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="bg-black/50 px-8 py-6 rounded-lg backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white text-center">
              <span className="text-gold">click it or miss it</span>
            </h1>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-charcoal via-charcoal/95 to-offwhite dark:to-charcoal">
        <div className="container mx-auto px-4">
          {/* Photo Tiles */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-playfair text-offwhite text-center mb-8">
              Our Work
            </h2>
            <PhotoTiles photos={tilePhotos} />
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
    </>
  );
};

export default Gallery;
