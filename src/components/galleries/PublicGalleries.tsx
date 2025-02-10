
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
}

const PublicGalleries = () => {
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
        .eq("is_private", false)
        .is("collection_id", null);

      if (error) throw error;
      setGalleries(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load galleries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-square bg-charcoal/10 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="w-full py-12"
        >
          {galleries.map((gallery) => (
            <SwiperSlide key={gallery.id} className="w-full aspect-[4/3]">
              <Link
                to={`/galleries/${gallery.id}`}
                className="block relative w-full h-full overflow-hidden rounded-lg transform transition-transform duration-500 hover:scale-[1.02]"
              >
                <img
                  src={gallery.image_url}
                  alt={gallery.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl text-offwhite font-playfair mb-2">
                      {gallery.title}
                    </h3>
                    {gallery.description && (
                      <p className="text-offwhite/80 mb-4">{gallery.description}</p>
                    )}
                    <Button variant="outline" className="bg-gold hover:bg-gold/80 text-charcoal border-none">
                      View Gallery
                    </Button>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-6 md:hidden">
        {galleries.map((gallery) => (
          <Link
            key={gallery.id}
            to={`/galleries/${gallery.id}`}
            className="block bg-white dark:bg-charcoal/50 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="aspect-[3/2] relative">
              <img
                src={gallery.image_url}
                alt={gallery.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-playfair text-charcoal dark:text-offwhite mb-2">
                {gallery.title}
              </h3>
              <Button className="w-full bg-gold hover:bg-gold/80 text-charcoal">
                View Album
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PublicGalleries;
