import { Card, CardContent, CardFooter } from "@/components/ui/card";
import BookingModal from "@/components/booking/BookingModal";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const photographyTypes = [
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    title: "Wedding Photography",
    description: "Capturing your special moments",
    category: "photography",
    price: "From KES 199,999",
    serviceType: "photography" as const,
    link: "/services/wedding-photography"
  },
  {
    url: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1",
    title: "Corporate Events",
    description: "Professional business photography",
    category: "photography",
    price: "From KES 89,999",
    serviceType: "photography" as const,
    link: "/services/corporate-photography"
  },
  {
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    title: "Portrait Photography",
    description: "Professional portraits and headshots",
    category: "photography",
    price: "From KES 29,999",
    serviceType: "photography" as const,
    link: "/services/portrait-photography"
  },
  {
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    title: "Fashion Photography",
    description: "Fashion and model photography",
    category: "photography",
    price: "From KES 59,999",
    serviceType: "photography" as const,
    link: "/services/fashion-photography"
  },
  {
    url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    title: "Product Photography",
    description: "Showcase your products professionally",
    category: "photography",
    price: "From KES 39,999",
    serviceType: "photography" as const,
    link: "/services/product-photography"
  },
  {
    url: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa",
    title: "Food Photography",
    description: "Appetizing food photography",
    category: "photography",
    price: "From KES 49,999",
    serviceType: "photography" as const,
    link: "/services/food-photography"
  },
  {
    url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    title: "Sports Photography",
    description: "Action-packed sports moments",
    category: "photography",
    price: "From KES 69,999",
    serviceType: "photography" as const,
    link: "/services/sports-photography"
  },
  {
    url: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99",
    title: "Landscape Photography",
    description: "Breathtaking landscape shots",
    category: "photography",
    price: "From KES 79,999",
    serviceType: "photography" as const,
    link: "/services/landscape-photography"
  }
];

const PhotographyTypes = () => {
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {photographyTypes.map((type, index) => (
        <Link to={type.link} key={index}>
          <Card className="h-full overflow-hidden bg-white dark:bg-charcoal/50 border-gold/20 hover:border-gold transition-colors duration-300">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={type.url}
                alt={type.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              {!isMobile && (
                <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <BookingModal
                    serviceType={type.serviceType}
                    serviceName={type.title}
                    className="bg-gold hover:bg-gold/80 text-charcoal"
                  />
                </div>
              )}
            </div>
            <CardContent className="text-center p-4">
              <h3 className="text-lg font-playfair text-charcoal dark:text-offwhite mb-1">
                {type.title}
              </h3>
              <p className="text-sm text-charcoal/80 dark:text-offwhite/80 mb-2">
                {type.description}
              </p>
              <p className="text-gold font-semibold">
                {type.price}
              </p>
            </CardContent>
            {isMobile && (
              <CardFooter className="justify-center pb-4">
                <BookingModal
                  serviceType={type.serviceType}
                  serviceName={type.title}
                  className="bg-gold hover:bg-gold/80 text-charcoal w-full"
                />
              </CardFooter>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PhotographyTypes;