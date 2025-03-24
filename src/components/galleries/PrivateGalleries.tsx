
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  password: string | null;
}

interface PrivateGalleriesProps {
  user: any;
}

const PrivateGalleries = ({ user }: PrivateGalleriesProps) => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchGalleries();
    }
  }, [user]);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .eq("is_private", true)
        .is("collection_id", null);

      if (error) throw error;
      setGalleries(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load private galleries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <Lock className="w-12 h-12 mx-auto mb-4 text-charcoal/50 dark:text-offwhite/50" />
        <h3 className="text-xl font-playfair mb-4">Private Galleries</h3>
        <p className="text-charcoal/70 dark:text-offwhite/70 mb-6">
          Please sign in to view private galleries
        </p>
        <Button asChild>
          <Link to="/auth">Sign In</Link>
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="aspect-square bg-charcoal/10 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (galleries.length === 0) {
    return (
      <div className="text-center py-12">
        <Lock className="w-12 h-12 mx-auto mb-4 text-charcoal/50 dark:text-offwhite/50" />
        <h3 className="text-xl font-playfair mb-4">No Private Galleries</h3>
        <p className="text-charcoal/70 dark:text-offwhite/70">
          You don't have access to any private galleries yet
        </p>
      </div>
    );
  }

  // Get randomly selected frame styles for each gallery
  const getRandomFrameStyle = () => {
    const styles = ["classic", "modern", "vintage", "polaroid"];
    return styles[Math.floor(Math.random() * styles.length)];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleries.map((gallery, index) => {
        // Assign a random frame style to each gallery
        const frameStyle = getRandomFrameStyle();
        
        return (
          <Link
            key={gallery.id}
            to={`/galleries/${gallery.id}`}
            className={`group relative bg-white dark:bg-charcoal/50 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:-translate-y-1 ${index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-1' : 'rotate-0'}`}
          >
            <div className="aspect-square relative">
              <div className={`absolute inset-0 ${frameStyle === 'classic' ? 'border-8 border-white' : 
                frameStyle === 'modern' ? 'border-4 border-charcoal/90' : 
                frameStyle === 'vintage' ? 'border-8 border-gold/60' : 
                'border-8 border-b-[40px] border-white'} z-10 pointer-events-none`}></div>
              
              <img
                src={gallery.image_url}
                alt={gallery.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl text-offwhite font-playfair mb-2">
                    {gallery.title}
                  </h3>
                  {gallery.description && (
                    <p className="text-offwhite/80 text-sm mb-4">{gallery.description}</p>
                  )}
                  <Button variant="outline" className="w-full bg-gold hover:bg-gold/80 text-charcoal border-none">
                    View Gallery
                  </Button>
                </div>
              </div>
              <div className="absolute top-4 right-4 z-30">
                <Lock className="w-5 h-5 text-gold" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PrivateGalleries;
