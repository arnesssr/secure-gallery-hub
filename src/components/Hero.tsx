import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const images = [
    "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
  ];

  useEffect(() => {
    const preloadImages = images.map((src) => {
      const img = new Image();
      img.src = src + '&w=1920';
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
      {/* Gradient overlay with new colors */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1A1F2C]/80 via-[#9b87f5]/40 to-transparent z-10"
        style={{
          background: `
            linear-gradient(
              135deg,
              rgba(26, 31, 44, 0.9) 0%,
              rgba(155, 135, 245, 0.4) 50%,
              rgba(217, 70, 239, 0.2) 100%
            )
          `
        }}
      />
      
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`${image}&w=1920`}
            alt={`Hero ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            onLoad={() => {
              if (index === 0) setIsLoaded(true);
            }}
          />
        </div>
      ))}
      
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-playfair text-white mb-6 leading-tight">
            Capturing Life's
            <span className="block bg-gradient-to-r from-[#D946EF] to-[#9b87f5] bg-clip-text text-transparent">
              Precious Moments
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-roboto max-w-2xl mx-auto leading-relaxed">
            Professional photography and multimedia services that bring your vision to life
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <button
              onClick={scrollToGallery}
              className="px-8 py-3 bg-gradient-to-r from-[#9b87f5] to-[#D946EF] text-white rounded-full 
                       hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 
                       transform hover:-translate-y-1"
            >
              Explore Our Work
            </button>
            <button
              onClick={scrollToGallery}
              className="text-white/90 hover:text-white flex items-center gap-2 transition-colors duration-300"
            >
              <span>View Gallery</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;