import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const images = [
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  ];

  useEffect(() => {
    // Preload images for smoother transitions
    const preloadImages = images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    Promise.all(preloadImages.map(img => img.decode()))
      .then(() => setIsLoaded(true))
      .catch(err => console.log("Image preload error:", err));

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
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-transparent transition-opacity duration-500" />
      
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-all duration-1000 transform ${
            index === currentImageIndex 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={image}
            alt={`Hero ${index + 1}`}
            className="w-full h-full object-cover"
            loading="eager"
            onLoad={() => {
              if (index === 0) setIsLoaded(true);
            }}
          />
        </div>
      ))}
      
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair text-offwhite mb-6 animate-fadeIn">
          Capturing Moments
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-offwhite/90 font-roboto max-w-2xl mb-8 animate-fadeIn delay-200">
          Professional multimedia services for all your needs
        </p>
        <button
          onClick={scrollToGallery}
          className="text-offwhite hover:text-gold transition-colors duration-300 animate-fadeIn delay-300"
          aria-label="Scroll to gallery section"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default Hero;