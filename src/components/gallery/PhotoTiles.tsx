
import { useState } from "react";
import { cn } from "@/lib/utils";

type PhotoTilesProps = {
  photos: string[];
  className?: string;
}

const PhotoTiles = ({
  photos,
  className
}: PhotoTilesProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", className)}>
      {photos.map((photo, index) => (
        <div 
          key={index}
          className="relative overflow-hidden rounded-lg aspect-square group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={photo}
            alt={`Photography showcase ${index + 1}`}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              hoveredIndex === index ? "scale-110" : "scale-100"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="font-playfair text-lg">Washikadau Photography</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoTiles;
