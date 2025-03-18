import { lazy, Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PhotoCarousel from "./gallery/PhotoCarousel";
import PhotoTiles from "./gallery/PhotoTiles";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));

const Gallery = () => {
  // Organize the photos by category
  const carouselPhotos = [
    // Original photos (keeping 7 of them, replacing the 6th one)
    "/lovable-uploads/ba435b40-e58d-4056-941b-b678d94161b2.png", 
    "/lovable-uploads/ac897cb9-aed5-49a1-b7d4-30683af25521.png",
    "/lovable-uploads/425b89e7-4e02-4b46-be24-3b31564fe22d.png",
    "/lovable-uploads/b8d1a9ee-bb1c-464b-ad90-06476ae1c855.png",
    "/lovable-uploads/21cc20b6-f76c-47c7-8233-d99e64bfb0bf.png",
    // Replace the 6th photo with one of the new uploads
    "/lovable-uploads/36a4622e-c19d-4aac-ac60-e671c68783d3.png", // New image replacing 6th photo
    "/lovable-uploads/1d8280c9-97c6-4820-8ea9-fd36d6d9541f.png",
    "/lovable-uploads/284c8945-aeed-4a5b-9f09-4daf1032ca4c.png",
    // Adding the rest of the new uploads
    "/lovable-uploads/bff532b6-93c8-455e-a183-e47cb400ff26.png",
    "/lovable-uploads/4ab351f1-4d52-4d41-9bae-a48f8dc3d3e6.png",
    "/lovable-uploads/b771e612-6000-4c2d-b932-84540b6408b2.png",
    "/lovable-uploads/4de73100-2c66-42da-bf9a-2c01e5da3608.png",
    "/lovable-uploads/0f6cb452-fc0c-4b59-9602-8e319085b405.png",
    "/lovable-uploads/52a73045-7993-452f-892e-36508e529e45.png"
  ];

  // Use the same photos for tiles, but we'll display them differently
  const tilePhotos = [
    "/lovable-uploads/ba435b40-e58d-4056-941b-b678d94161b2.png", 
    "/lovable-uploads/ac897cb9-aed5-49a1-b7d4-30683af25521.png",
    "/lovable-uploads/425b89e7-4e02-4b46-be24-3b31564fe22d.png",
    "/lovable-uploads/b8d1a9ee-bb1c-464b-ad90-06476ae1c855.png",
    "/lovable-uploads/21cc20b6-f76c-47c7-8233-d99e64bfb0bf.png",
    "/lovable-uploads/36a4622e-c19d-4aac-ac60-e671c68783d3.png" 
  ];

  return (
    <>
      {/* Featured Carousel as Header - Reduced height from 80vh to 65vh */}
      <section className="w-full h-[65vh] relative">
        <PhotoCarousel photos={carouselPhotos} autoplayInterval={1500} className="h-full" />
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
