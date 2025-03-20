
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
        .in("title", ['Sports', 'Product Photography', 'Portraits', 'Performances'])
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
                    <h3 className="text-2xl text-offwhite font-playfair mb-4">
                      {gallery.title}
                    </h3>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:hidden">
        {galleries.map((gallery) => (
          <Card 
            key={gallery.id} 
            className="overflow-hidden bg-gradient-to-br from-charcoal to-charcoal/90 border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
          >
            <div className="relative aspect-[3/2] overflow-hidden group">
              <img
                src={gallery.image_url}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent opacity-50"></div>
              
              {gallery.title === 'Sports' && (
                <div className="absolute top-3 right-3 bg-gold/90 text-charcoal p-2 rounded-full">
                  <Trophy className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <CardContent className="p-0">
              <h3 className="text-xl font-playfair text-offwhite pt-4 px-4">
                {gallery.title}
              </h3>
            </CardContent>
            
            <CardFooter className="pb-4 px-4 pt-3">
              <Button asChild className="w-full bg-gold/90 hover:bg-gold text-charcoal">
                <Link to={`/galleries/${gallery.id}`}>
                  View Gallery <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PublicGalleries;
