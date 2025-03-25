
import { useState, useEffect } from "react";
import { FolderOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { getPhotosByCategory } from "@/utils/imageCategories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryDisplayStyles from "@/components/gallery/GalleryDisplayStyles";

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
    
    // For food photography category, use one of the new images
    if (normalizedName === "food-photography" && photos.length > 0) {
      return "/lovable-uploads/b41bdb0b-c2a0-4d32-a9db-aa564133fc42.png"; // Coffee with latte art
    }
    
    // For baby photography, ensure it has a cover
    if (normalizedName === "baby-photography" && photos.length > 0) {
      return photos[0];
    }
    
    return photos.length > 0 ? photos[0] : "/lovable-uploads/b771e612-6000-4c2d-b932-84540b6408b2.png";
  };

  // Get a default set of categories to display - Ensuring Portrait is included
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
      id: "food-photography", 
      title: "Food Photography", 
      description: "Delicious cuisine and beverages photographed with exquisite detail",
      image_url: "/lovable-uploads/b41bdb0b-c2a0-4d32-a9db-aa564133fc42.png",
      image_count: getPhotosByCategory("food-photography").length,
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

  // Combine database collections with default ones, ensuring we have portraits even if it doesn't exist in the database
  const displayCollections = loading 
    ? defaultCollections 
    : collections.length > 0 
      ? [...collections, ...defaultCollections.filter(dc => 
          !collections.some(c => c.id === dc.id || c.title.toLowerCase() === dc.title.toLowerCase())
        )]
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

  // Collection detail view with GalleryDisplayStyles component
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
        
        <GalleryDisplayStyles 
          categoryId={collection.id} 
          title={collection.title} 
          description={collection.description || ''} 
        />
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

export default CollectionsList;
