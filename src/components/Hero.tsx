import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-screen">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-charcoal/50" />
          <img
            src={image}
            alt={`Hero ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-playfair text-offwhite mb-6 animate-fadeIn">
          Capturing Moments
        </h1>
        <p className="text-xl md:text-2xl text-offwhite/90 font-roboto max-w-2xl mb-8 animate-fadeIn">
          Professional photography services that tell your story
        </p>
        <button
          onClick={scrollToGallery}
          className="text-offwhite hover:text-gold transition-colors duration-200 animate-fadeIn"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default Hero;