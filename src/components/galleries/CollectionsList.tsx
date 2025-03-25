
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FolderOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { getPhotosByCategory } from "@/utils/imageCategories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Collection {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  image_count: number;
  is_private: boolean;
}

const CollectionsList = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .is("collection_id", null)
        .eq("type", "collection")
        .eq("is_private", false);

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load collections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get cover images for each category, using newly uploaded images for portraits
  const getCoverImage = (categoryName: string) => {
    const normalizedName = categoryName.toLowerCase().replace(/\s+/g, "-");
    const photos = getPhotosByCategory(normalizedName);
    
    // Use first uploaded portrait image for portrait category
    if (normalizedName === "portraits") {
      return "/lovable-uploads/85bc1a59-4427-4850-950a-5887ab28c9a3.png"; // Use one of the new portrait images
    }
    
    // For baby photography, ensure it has a cover
    if (normalizedName === "baby-photography" && photos.length > 0) {
      return photos[0];
    }
    
    return photos.length > 0 ? photos[0] : "/lovable-uploads/b771e612-6000-4c2d-b932-84540b6408b2.png";
  };

  // Get a default set of categories to display
  const defaultCollections = [
    { 
      id: "portraits", 
      title: "Portraits", 
      description: "Professional portrait photography capturing personality and emotion",
      image_url: "/lovable-uploads/85bc1a59-4427-4850-950a-5887ab28c9a3.png", // Using one of the new uploads
      image_count: getPhotosByCategory("portraits").length,
      is_private: false
    },
    { 
      id: "wedding-portfolio", 
      title: "Wedding Portfolio", 
      description: "Beautiful moments from wedding ceremonies and celebrations",
      image_url: getCoverImage("wedding-portfolio"),
      image_count: getPhotosByCategory("wedding-portfolio").length,
      is_private: false
    },
    { 
      id: "baby-photography", 
      title: "Baby Photography", 
      description: "Adorable moments captured with our baby photography sessions",
      image_url: getCoverImage("baby-photography"),
      image_count: getPhotosByCategory("baby-photography").length,
      is_private: false
    },
    { 
      id: "product-photography", 
      title: "Product Photography", 
      description: "Stunning product images that highlight details and features",
      image_url: getCoverImage("product-photography"),
      image_count: getPhotosByCategory("product-photography").length,
      is_private: false
    },
    { 
      id: "sports", 
      title: "Sports Photography", 
      description: "Dynamic sports photography capturing action and emotion",
      image_url: getCoverImage("sports"),
      image_count: getPhotosByCategory("sports").length,
      is_private: false
    },
    { 
      id: "performances", 
      title: "Performances", 
      description: "Live performances captured with professional photography",
      image_url: getCoverImage("performances"),
      image_count: getPhotosByCategory("performances").length,
      is_private: false
    }
  ];

  // Combine database collections with default ones
  const displayCollections = loading 
    ? defaultCollections 
    : collections.length > 0 
      ? collections 
      : defaultCollections;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[3/2] bg-charcoal/10 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  // Collection detail view with interactive display styles
  if (selectedCollection) {
    const collection = displayCollections.find(c => c.id === selectedCollection);
    if (!collection) return null;
    
    return (
      <div className="mb-12">
        <Button 
          variant="outline" 
          onClick={() => setSelectedCollection(null)}
          className="flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Button>
        
        <h2 className="text-3xl font-playfair mb-4 text-charcoal dark:text-offwhite">{collection.title}</h2>
        {collection.description && (
          <p className="text-charcoal/80 dark:text-offwhite/80 max-w-3xl mb-8">{collection.description}</p>
        )}
        
        <CollectionGalleryDisplay categoryId={collection.id} />
      </div>
    );
  }

  // Get randomly selected frame styles for each collection in grid view
  const getRandomFrameStyle = () => {
    const styles = ["classic", "modern", "vintage", "polaroid"];
    return styles[Math.floor(Math.random() * styles.length)];
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCollections.map((collection, index) => {
          // Assign a random frame style to each collection
          const frameStyle = getRandomFrameStyle();
          
          return (
            <div
              key={collection.id}
              className={`group relative bg-white dark:bg-charcoal/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} cursor-pointer`}
              onClick={() => setSelectedCollection(collection.id)}
            >
              <div className="aspect-[4/3] relative">
                <div className={`absolute inset-0 ${frameStyle === 'classic' ? 'border-8 border-white' : 
                  frameStyle === 'modern' ? 'border-4 border-charcoal/90' : 
                  frameStyle === 'vintage' ? 'border-8 border-gold/60' : 
                  'border-8 border-b-[40px] border-white'} z-10 pointer-events-none`}></div>
                
                <img
                  src={collection.image_url}
                  alt={collection.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl text-offwhite font-playfair mb-2">
                      {collection.title}
                    </h3>
                    {collection.description && (
                      <p className="text-offwhite/80 text-sm mb-4">{collection.description}</p>
                    )}
                    <Button variant="outline" className="w-full bg-gold hover:bg-gold/80 text-charcoal border-none">
                      View Interactive Gallery
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Component for displaying interactive gallery styles within a collection
const CollectionGalleryDisplay = ({ categoryId }: { categoryId: string }) => {
  const photos = getPhotosByCategory(categoryId);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Different frame styles for masonry display
  const frameStyles = ["classic", "modern", "vintage", "polaroid", "none"];

  // Generate random rotations
  const getRandomRotation = () => {
    const rotations = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-0"];
    return rotations[Math.floor(Math.random() * rotations.length)];
  };

  return (
    <div>
      <Tabs defaultValue="carousel" className="mb-10">
        <TabsList className="mb-8">
          <TabsTrigger value="carousel">Carousel</TabsTrigger>
          <TabsTrigger value="tiles">Photo Tiles</TabsTrigger>
          <TabsTrigger value="masonry">Masonry</TabsTrigger>
          <TabsTrigger value="grid">Grid</TabsTrigger>
        </TabsList>

        <TabsContent value="carousel" className="py-4">
          <div className="relative aspect-[16/9] max-h-[70vh] w-full overflow-hidden rounded-xl">
            <Carousel photos={photos.slice(0, Math.min(10, photos.length))} />
          </div>
        </TabsContent>

        <TabsContent value="tiles" className="py-4">
          <PhotoTiles photos={photos.slice(0, Math.min(6, photos.length))} />
        </TabsContent>

        <TabsContent value="masonry" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.slice(0, Math.min(9, photos.length)).map((photo, idx) => {
              const frameStyle = frameStyles[idx % frameStyles.length];
              const rotation = getRandomRotation();
              
              return (
                <div 
                  key={idx}
                  className={`group relative overflow-hidden rounded-lg transition-all duration-500 ${rotation} ${
                    idx % 3 === 0 ? "aspect-[3/4]" : idx % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                  } ${hoveredId === `masonry-${idx}` ? "scale-[1.02] z-10" : "z-0"}`}
                  onMouseEnter={() => setHoveredId(`masonry-${idx}`)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className={`absolute inset-0 z-10 pointer-events-none ${
                    frameStyle === 'classic' ? 'border-8 border-white' : 
                    frameStyle === 'modern' ? 'border-4 border-charcoal/90' : 
                    frameStyle === 'vintage' ? 'border-8 border-gold/60' : 
                    frameStyle === 'polaroid' ? 'border-8 border-b-[40px] border-white' : ''
                  }`}></div>
                  
                  <img
                    src={photo}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            {photos.slice(0, Math.min(12, photos.length)).map((photo, idx) => (
              <div 
                key={idx}
                className="group relative overflow-hidden rounded-lg aspect-square shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <span className="text-sm font-medium">Photo {idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-8">
        <Link to={`/galleries/${categoryId}`}>
          <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
            View Full Collection
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Simple Carousel component
const Carousel = ({ photos }: { photos: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={photo}
            alt={`Carousel photo ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

// Simple PhotoTiles component
const PhotoTiles = ({ photos }: { photos: string[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo, idx) => (
        <div key={idx} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
          <img
            src={photo}
            alt={`Tile photo ${idx + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  );
};

export default CollectionsList;
