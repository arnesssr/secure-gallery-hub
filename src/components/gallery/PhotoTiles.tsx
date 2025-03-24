
import { useState } from "react";
import { cn } from "@/lib/utils";

type PhotoTilesProps = {
  photos: string[];
  className?: string;
  frameStyle?: "classic" | "modern" | "polaroid" | "vintage" | "none";
}

const PhotoTiles = ({
  photos,
  className,
  frameStyle = "classic"
}: PhotoTilesProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Frame styles for different aesthetics
  const frameStyles = {
    classic: "border-8 border-white shadow-lg",
    modern: "border-4 border-charcoal/90 shadow-xl",
    polaroid: "border-8 border-b-[40px] border-white shadow-md",
    vintage: "border-8 border-gold/60 shadow-md",
    none: ""
  };

  // Generate a random tilt for each photo
  const getTilt = (index: number) => {
    const tilts = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-0"];
    return tilts[index % tilts.length];
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8", className)}>
      {/* First column - taller layout */}
      <div className="space-y-8">
        {photos.slice(0, 2).map((photo, idx) => (
          <div 
            key={`col1-${idx}`}
            className={cn(
              "relative overflow-hidden rounded-lg aspect-[3/4] group transform transition-transform duration-500",
              getTilt(idx),
              frameStyles[frameStyle],
              hoveredIndex === idx ? "scale-[1.02] z-10" : "z-0"
            )}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={photo}
              alt={`Photography showcase ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-playfair text-lg">Washikadau Photography</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second column - varied layout */}
      <div className="space-y-8 md:mt-12">
        {photos.slice(2, 4).map((photo, idx) => (
          <div 
            key={`col2-${idx}`}
            className={cn(
              "relative overflow-hidden rounded-lg aspect-square group transform transition-transform duration-500",
              getTilt(idx + 2),
              frameStyles[frameStyle],
              hoveredIndex === (idx + 2) ? "scale-[1.02] z-10" : "z-0"
            )}
            onMouseEnter={() => setHoveredIndex(idx + 2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={photo}
              alt={`Photography showcase ${idx + 3}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-playfair text-lg">Washikadau Photography</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Third column - special layout */}
      <div className="space-y-8 md:-mt-8">
        {photos.slice(4, 6).map((photo, idx) => (
          <div 
            key={`col3-${idx}`}
            className={cn(
              "relative overflow-hidden rounded-lg aspect-[4/5] group transform transition-transform duration-500",
              getTilt(idx + 4),
              frameStyles[frameStyle],
              hoveredIndex === (idx + 4) ? "scale-[1.02] z-10" : "z-0"
            )}
            onMouseEnter={() => setHoveredIndex(idx + 4)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={photo}
              alt={`Photography showcase ${idx + 5}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="font-playfair text-lg">Washikadau Photography</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoTiles;
