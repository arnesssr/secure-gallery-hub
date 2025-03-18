
import { useState, useEffect, useRef } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type PhotoCarouselProps = {
  photos: string[];
  autoplayInterval?: number;
  className?: string;
}

const PhotoCarousel = ({
  photos,
  autoplayInterval = 1500, // Changed from 5000 to 1500 (1.5 seconds)
  className
}: PhotoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const carouselRef = useRef<any>(null);

  // Ensure autoplay works correctly
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isHovering && autoplayInterval > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const newIndex = (prev + 1) % photos.length;
          // Programmatically move the carousel
          if (carouselRef.current && carouselRef.current.scrollNext) {
            carouselRef.current.scrollNext();
          }
          return newIndex;
        });
      }, autoplayInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, photos.length, autoplayInterval]);

  const handleSetApi = (api: any) => {
    carouselRef.current = api;
  };

  return (
    <div 
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Carousel className="w-full h-full" setApi={handleSetApi}>
        <CarouselContent className="h-full">
          {photos.map((photo, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative overflow-hidden w-full h-full">
                <img 
                  src={photo}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
                  style={{ objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-70"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/30 border-none text-white backdrop-blur-sm" />
        <CarouselNext className="right-4 bg-white/10 hover:bg-white/30 border-none text-white backdrop-blur-sm" />
      </Carousel>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {photos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index 
                ? "bg-white w-6" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => {
              setCurrentIndex(index);
              // Move to the clicked slide
              if (carouselRef.current && index > currentIndex) {
                for (let i = currentIndex; i < index; i++) {
                  carouselRef.current.scrollNext();
                }
              } else if (carouselRef.current && index < currentIndex) {
                for (let i = index; i < currentIndex; i++) {
                  carouselRef.current.scrollPrev();
                }
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;
