
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import PhotoTiles from "./PhotoTiles";
import PhotoCarousel from "./PhotoCarousel";
import { getPhotosByCategory } from "@/utils/imageCategories";

type GalleryDisplayStylesProps = {
  categoryId: string;
  title: string;
  description?: string;
}

const GalleryDisplayStyles = ({ categoryId, title, description }: GalleryDisplayStylesProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load photos on component mount
  useEffect(() => {
    try {
      const categoryPhotos = getPhotosByCategory(categoryId);
      console.log(`Loading photos for category ${categoryId}:`, categoryPhotos.length);
      
      if (categoryPhotos.length === 0) {
        console.warn(`No photos found for category ${categoryId}`);
      }
      
      setPhotos(categoryPhotos);
      setErrorMsg(null);
    } catch (error) {
      console.error(`Error loading photos for ${categoryId}:`, error);
      setErrorMsg(`Failed to load photos for ${title}`);
    } finally {
      setLoading(false);
    }
  }, [categoryId, title]);

  // Different frame styles for masonry display
  const frameStyles = ["classic", "modern", "vintage", "polaroid", "none"];

  // Generate random rotations
  const getRandomRotation = () => {
    const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-0"];
    return rotations[Math.floor(Math.random() * rotations.length)];
  };

  if (loading) {
    return <div className="animate-pulse h-64 bg-charcoal/10 rounded-lg"></div>;
  }

  if (errorMsg) {
    return <div className="text-center py-8 text-red-500">{errorMsg}</div>;
  }

  if (photos.length === 0) {
    return <div className="text-center py-8">No photos available for this category</div>;
  }

  return (
    <div className="mb-20">
      <div className="mb-10">
        <h2 className="text-3xl font-playfair mb-4 text-charcoal dark:text-offwhite">{title}</h2>
        {description && (
          <p className="text-charcoal/80 dark:text-offwhite/80 max-w-3xl">{description}</p>
        )}
      </div>

      <Tabs defaultValue="carousel" className="mb-10">
        <TabsList className="mb-8">
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
          <TabsTrigger value="tiles">Photo Tiles</TabsTrigger>
          <TabsTrigger value="masonry">Masonry</TabsTrigger>
          <TabsTrigger value="grid">Grid</TabsTrigger>
        </TabsList>

        <TabsContent value="carousel" className="py-4">
          <div className="relative aspect-[16/9] max-h-[70vh] w-full overflow-hidden rounded-xl">
            <PhotoCarousel 
              photos={photos.slice(0, Math.min(10, photos.length))}
              autoplayInterval={5000}
              className="rounded-xl"
            />
          </div>
        </TabsContent>

        <TabsContent value="tiles" className="py-4">
          <PhotoTiles 
            photos={photos.slice(0, Math.min(6, photos.length))} 
            frameStyle="classic" 
          />
        </TabsContent>

        <TabsContent value="masonry" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.slice(0, Math.min(12, photos.length)).map((photo, idx) => {
              const frameStyle = frameStyles[idx % frameStyles.length];
              const rotation = getRandomRotation();
              
              return (
                <div 
                  key={idx}
                  className={cn(
                    "group relative overflow-hidden rounded-lg transition-all duration-500",
                    rotation,
                    idx % 3 === 0 ? "aspect-[3/4]" : idx % 3 === 1 ? "aspect-square" : "aspect-[4/3]",
                    hoveredId === `masonry-${idx}` ? "scale-[1.02] z-10" : "z-0"
                  )}
                  onMouseEnter={() => setHoveredId(`masonry-${idx}`)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className={cn(
                    "absolute inset-0 z-10 pointer-events-none",
                    frameStyle === 'classic' ? 'border-8 border-white' : 
                    frameStyle === 'modern' ? 'border-4 border-charcoal/90' : 
                    frameStyle === 'vintage' ? 'border-8 border-gold/60' : 
                    frameStyle === 'polaroid' ? 'border-8 border-b-[40px] border-white' : ''
                  )}></div>
                  
                  <img
                    src={photo}
                    alt={`${title} ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      console.error(`Failed to load photo at index ${idx}: ${photo}`);
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="font-playfair text-lg">Washikadau Photography</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="grid" className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.slice(0, Math.min(16, photos.length)).map((photo, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-lg aspect-square shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={photo}
                  alt={`${title} ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    console.error(`Failed to load photo at index ${idx}: ${photo}`);
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <span className="text-sm font-medium">{title} - {idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GalleryDisplayStyles;
