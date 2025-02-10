
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GalleryHorizontal, Lock, ChevronDown, LogOut, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { supabase } from "@/integrations/supabase/client";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  is_private: boolean;
}

const GalleriesPage = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGalleries();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchGalleries = async () => {
    const { data } = await supabase
      .from("galleries")
      .select("*")
      .eq("is_private", false);
    setGalleries(data || []);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite">
            Our Galleries
          </h1>
          {user ? (
            <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          ) : (
            <Button asChild variant="outline">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-charcoal/10 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GalleriesPage;
