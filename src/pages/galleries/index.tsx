import { useState } from "react";
import { Link } from "react-router-dom";
import { GalleryHorizontal, Lock, Camera, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import EncryptedGallery from "@/components/EncryptedGallery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GalleriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("general");

  const categories = [
    {
      id: "general",
      title: "General Galleries",
      icon: <GalleryHorizontal className="w-6 h-6" />,
      description: "Browse our collection of public galleries",
    },
    {
      id: "encrypted",
      title: "Encrypted Galleries",
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

  const generalGalleries = [
    {
      title: "Events",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      link: "/services/events",
    },
    {
      title: "Portraits",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      link: "/services/portraits",
    },
    {
      title: "Commercial",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
      link: "/services/commercial",
    },
  ];

  const photographyTypes = [
    {
      title: "Wedding Photography",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      price: "From KES 89,999",
      link: "/services/wedding-photography",
    },
    {
      title: "Portrait Photography",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      price: "From KES 29,999",
      link: "/services/portrait-photography",
    },
    {
      title: "Commercial Photography",
      image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
      price: "From KES 49,999",
      link: "/services/commercial-photography",
    },
  ];

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-playfair text-center mb-12 text-charcoal dark:text-offwhite">
          Our Galleries
        </h1>

        {/* Mobile Dropdown Menu */}
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

        {/* Desktop Category Buttons */}
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
              {generalGalleries.map((gallery, index) => (
                <Link
                  key={index}
                  to={gallery.link}
                  className="group relative overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={gallery.image}
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
              {photographyTypes.map((type, index) => (
                <Link
                  key={index}
                  to={type.link}
                  className="group relative overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                    <h3 className="text-xl text-offwhite font-playfair mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gold font-semibold mb-4">{type.price}</p>
                    <Button variant="outline" className="bg-gold hover:bg-gold/80 text-charcoal border-none">
                      Learn More
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GalleriesPage;