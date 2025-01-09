import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GalleryHorizontal, Lock, Camera, ChevronDown, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import EncryptedGallery from "@/components/EncryptedGallery";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GalleriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [publicGalleries, setPublicGalleries] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicGalleries();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchPublicGalleries = async () => {
    const { data } = await supabase
      .from("galleries")
      .select("*")
      .eq("is_private", false);
    setPublicGalleries(data || []);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const categories = [
    {
      id: "general",
      title: "Public Galleries",
      icon: <GalleryHorizontal className="w-6 h-6" />,
      description: "Browse our collection of public galleries",
    },
    {
      id: "encrypted",
      title: "Private Galleries",
      icon: <Lock className="w-6 h-6" />,
      description: "Access password-protected private galleries",
    },
    {
      id: "photography",
      title: "Photography Types",
      icon: <Camera className="w-6 h-6" />,
      description: "Explore different photography styles and services",
    },
  ];

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

        <div className="md:hidden mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {categories.find(cat => cat.id === selectedCategory)?.title || "Select Gallery"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  <span>{category.title}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 rounded-lg transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gold text-charcoal"
                  : "bg-white dark:bg-charcoal/50 text-charcoal dark:text-offwhite hover:bg-gold/10"
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {category.icon}
                <h3 className="text-xl font-playfair">{category.title}</h3>
                <p className="text-sm opacity-80">{category.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8">
          {selectedCategory === "encrypted" && <EncryptedGallery />}

          {selectedCategory === "general" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {publicGalleries.map((gallery: any) => (
                <Link
                  key={gallery.id}
                  to={`/galleries/${gallery.id}`}
                  className="group relative overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={gallery.image_url}
                    alt={gallery.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                    <h3 className="text-xl text-offwhite font-playfair mb-4">
                      {gallery.title}
                    </h3>
                    <Button variant="outline" className="bg-gold hover:bg-gold/80 text-charcoal border-none">
                      View Gallery
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {selectedCategory === "photography" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Photography types grid */}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleriesPage;
