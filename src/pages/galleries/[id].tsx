
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { getPhotosByCategory, photoCategories } from "@/utils/imageCategories";

interface Gallery {
  id: string;
  title: string;
  description: string;
  image_url: string;
  is_private: boolean;
}

const GalleryView = () => {
  const { id } = useParams();
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
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite mb-4">
          {gallery.title}
        </h1>
        <p className="text-lg text-charcoal/80 dark:text-offwhite/80 mb-8">
          {gallery.description}
        </p>
        
        {/* Gallery Images - Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {galleryPhotos.map((photo, index) => (
            <div 
              key={index} 
              className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ${
                index % 3 === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="group relative aspect-square sm:aspect-auto overflow-hidden">
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
      </main>
      <Footer />
    </div>
  );
};

export default GalleryView;
