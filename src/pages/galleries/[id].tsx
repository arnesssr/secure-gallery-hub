import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

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
          <Skeleton className="h-96 w-full rounded-lg" />
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
        <div className="aspect-video relative rounded-lg overflow-hidden">
          <img
            src={gallery.image_url}
            alt={gallery.title}
            className="w-full h-full object-cover"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleryView;