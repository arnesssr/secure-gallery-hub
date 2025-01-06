import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Music2, Video, School, ShoppingBag, Wrench } from "lucide-react";

const Gallery = () => {
  const services = [
    {
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80",
      title: "Professional Photography",
      description: "Events, portraits, and commercial photography",
      link: "/photography-services",
      action: "Learn More",
      icon: <Camera className="w-6 h-6" />
    },
    {
      url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80",
      title: "Stereo Systems Rental",
      description: "High-end audio equipment for events",
      link: "/sound-services",
      action: "Rent Now",
      icon: <Music2 className="w-6 h-6" />
    },
    {
      url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80",
      title: "Sound Engineering",
      description: "Professional sound mixing and setup",
      link: "/sound-services",
      action: "Book Now",
      icon: <Wrench className="w-6 h-6" />
    },
    {
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80",
      title: "Photography School",
      description: "Learn from professional photographers",
      link: "/photography-services",
      action: "Join Now",
      icon: <School className="w-6 h-6" />
    },
    {
      url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80",
      title: "Video Editing",
      description: "Professional video editing services",
      link: "/video-services",
      action: "Get Started",
      icon: <Video className="w-6 h-6" />
    },
    {
      url: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80",
      title: "Equipment Sales",
      description: "Professional photography and audio equipment",
      link: "/equipment-sales",
      action: "Shop Now",
      icon: <ShoppingBag className="w-6 h-6" />
    }
  ];

  const photographyTypes = [
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      title: "Wedding Photography",
      description: "Capturing your special moments",
      category: "wedding",
      price: "From $1,999"
    },
    {
      url: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1",
      title: "Corporate Events",
      description: "Professional business photography",
      category: "corporate",
      price: "From $899"
    },
    {
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      title: "Portrait Photography",
      description: "Professional portraits and headshots",
      category: "portrait",
      price: "From $299"
    },
    {
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Fashion Photography",
      description: "Fashion and model photography",
      category: "fashion",
      price: "From $599"
    },
    {
      url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
      title: "Product Photography",
      description: "Showcase your products professionally",
      category: "product",
      price: "From $399"
    },
    {
      url: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
      title: "Food Photography",
      description: "Appetizing food photography",
      category: "food",
      price: "From $499"
    },
    {
      url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      title: "Sports Photography",
      description: "Action-packed sports moments",
      category: "sports",
      price: "From $699"
    },
    {
      url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
      title: "Landscape Photography",
      description: "Breathtaking landscape shots",
      category: "landscape",
      price: "From $799"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-playfair text-charcoal dark:text-offwhite text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="relative group overflow-hidden rounded-lg aspect-square transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl bg-white dark:bg-charcoal/50"
            >
              <img
                src={service.url}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-8 px-4 text-center">
                <div className="mb-4 p-3 bg-gold rounded-full">
                  {service.icon}
                </div>
                <span className="text-xl text-offwhite font-playfair tracking-wider mb-2">
                  {service.title}
                </span>
                <p className="text-sm text-offwhite/90 font-roboto mb-4">
                  {service.description}
                </p>
                <Button variant="outline" className="bg-gold hover:bg-gold/80 text-charcoal border-none">
                  {service.action}
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-playfair text-charcoal dark:text-offwhite text-center mt-20 mb-12">
          Photography Portfolio
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photographyTypes.map((type, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl bg-white dark:bg-charcoal/50"
            >
              <img
                src={type.url}
                alt={type.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-8 px-4 text-center">
                <span className="text-xl text-offwhite font-playfair tracking-wider mb-2">
                  {type.title}
                </span>
                <p className="text-sm text-offwhite/90 font-roboto mb-2">
                  {type.description}
                </p>
                <p className="text-gold font-semibold mb-4">
                  {type.price}
                </p>
                <Button variant="outline" className="bg-gold hover:bg-gold/80 text-charcoal border-none">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;