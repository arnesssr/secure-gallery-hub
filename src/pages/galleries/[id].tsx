
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getPhotosByCategory, photoCategories } from "@/utils/imageCategories";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Gallery {
  id: string;
  title: string;
  description: string;
  image_url: string;
  is_private: boolean;
}

const GalleryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchGallery();
  }, [id]);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setGallery(data);
      
      // Get photos based on gallery title
      if (data) {
        const normalizedTitle = data.title.toLowerCase().replace(/\s+/g, '-');
        const category = photoCategories.find(cat => 
          cat.id.toLowerCase() === normalizedTitle || 
          cat.name.toLowerCase() === data.title.toLowerCase()
        );
        
        if (category) {
          setGalleryPhotos(category.photos);
        } else {
          // If no direct match, try to find by gallery title
          const matchingCategory = photoCategories.find(cat => 
            cat.name.toLowerCase() === data.title.toLowerCase()
          );
          
          if (matchingCategory) {
            setGalleryPhotos(matchingCategory.photos);
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load gallery",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Go back function
  const goBack = () => {
    navigate(-1);
  };

  // Function to get a random frame style for each photo
  const getFrameStyle = (index: number) => {
    const styles = [
      "border-8 border-white shadow-lg", // classic
      "border-4 border-charcoal/90 shadow-xl", // modern
      "border-8 border-b-[40px] border-white shadow-md", // polaroid
      "border-8 border-gold/60 shadow-md" // vintage
    ];
    
    // Use modulo to cycle through styles, but also add some randomness
    return styles[(index + Math.floor(Math.random() * 2)) % styles.length];
  };

  // Function to get a random tilt angle for each photo
  const getTilt = (index: number) => {
    const tilts = ["rotate-1", "-rotate-1", "rotate-2", "-rotate-2", "rotate-0"];
    return tilts[index % tilts.length];
  };

  // Function to get a random layout size for the photo
  const getPhotoSize = (index: number) => {
    // Create different size variations for the masonry layout
    const sizes = [
      "col-span-1 row-span-1", // regular
      "col-span-1 row-span-2", // tall
      "col-span-2 row-span-1", // wide
      "col-span-2 row-span-2", // large
    ];
    
    // Make large photos less common
    if (index % 7 === 0) return sizes[3]; // large
    if (index % 5 === 0) return sizes[2]; // wide
    if (index % 3 === 0) return sizes[1]; // tall
    return sizes[0]; // regular
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-offwhite dark:bg-charcoal">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full max-w-2xl mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen bg-offwhite dark:bg-charcoal">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-playfair text-charcoal dark:text-offwhite">
            Gallery not found
          </h1>
          <Button 
            onClick={goBack} 
            className="mt-8 bg-gold hover:bg-gold/80 text-charcoal"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="flex items-center mb-6">
          <Button 
            onClick={goBack} 
            variant="outline" 
            className="mr-4 border-gold/50 hover:bg-gold/10 text-gold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite">
            {gallery.title}
          </h1>
        </div>
        <p className="text-lg text-charcoal/80 dark:text-offwhite/80 mb-12 max-w-3xl">
          {gallery.description}
        </p>
        
        {/* Gallery Images - Dynamic Masonry Grid with Frame Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-6 sm:gap-8">
          {galleryPhotos.map((photo, index) => (
            <div 
              key={index} 
              className={`overflow-hidden group ${
                getPhotoSize(index)
              } transform transition-all duration-500 hover:-translate-y-1 ${
                getTilt(index)
              }`}
            >
              <div className={`relative aspect-square sm:aspect-auto h-full overflow-hidden rounded-lg bg-white dark:bg-charcoal/30 ${
                getFrameStyle(index)
              }`}>
                <img 
                  src={photo} 
                  alt={`${gallery.title} photo ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Back button at the bottom */}
        <div className="mt-12 text-center">
          <Button 
            onClick={goBack} 
            className="bg-gold hover:bg-gold/80 text-charcoal"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Galleries
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryView;
