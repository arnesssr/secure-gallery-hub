import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const ServicesSection = lazy(() => import("./gallery/ServicesSection"));
const PhotographyTypes = lazy(() => import("./gallery/PhotographyTypes"));

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  is_private: boolean;
}

const Gallery = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setGalleries(data || []);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load galleries. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="gallery" 
      className="py-12 md:py-20 bg-gradient-to-b from-charcoal via-charcoal/95 to-offwhite dark:to-charcoal transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-playfair text-offwhite dark:text-offwhite text-center mb-8 md:mb-12 animate-fadeIn">
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

        <h2 className="text-2xl md:text-4xl font-playfair text-charcoal dark:text-offwhite text-center mt-16 md:mt-20 mb-8 md:mb-12 animate-fadeIn">
          Photography Portfolio
        </h2>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg animate-pulse bg-charcoal/20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                to={`/galleries/${gallery.id}`}
                className="group relative overflow-hidden rounded-lg aspect-square bg-charcoal/10"
              >
                <img
                  src={gallery.image_url}
                  alt={gallery.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                  <h3 className="text-xl text-offwhite font-playfair mb-2">
                    {gallery.title}
                  </h3>
                  {gallery.is_private && (
                    <div className="flex items-center gap-2 text-gold mb-4">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm">Private Gallery</span>
                    </div>
                  )}
                  <Button variant="outline" className="bg-gold hover:bg-gold/80 text-charcoal border-none">
                    View Gallery
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg animate-pulse bg-charcoal/20" />
            ))}
          </div>
        }>
          <PhotographyTypes />
        </Suspense>
      </div>
    </section>
  );
};

export default Gallery;