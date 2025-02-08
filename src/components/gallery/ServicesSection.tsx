
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Speaker, Plane, School, Video, Wrench, Camera } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const services = [
  {
    title: "Equipment Rentals",
    description: "P.A systems and professional camera equipment rentals",
    link: "/equipment-rentals",
    action: "View Equipment",
    icon: <Speaker className="w-8 h-8 text-gold" />
  },
  {
    title: "Drone Services",
    description: "Professional aerial photography and videography",
    link: "/drone-services",
    action: "Learn More",
    icon: <Plane className="w-8 h-8 text-gold" />
  },
  {
    title: "Professional Photography",
    description: "Expert photography services for all occasions",
    link: "/photography-services",
    action: "View Services",
    icon: <Camera className="w-8 h-8 text-gold" />
  },
  {
    title: "Photography School",
    description: "8 weeks beginner (30k KES), 4 weeks intermediate (18k KES)",
    link: "/photography-school",
    action: "Join Now",
    icon: <School className="w-8 h-8 text-gold" />
  },
  {
    title: "Livestreaming & Videography",
    description: "Professional video production and live streaming services",
    link: "/video-services",
    action: "Get a Quote",
    icon: <Video className="w-8 h-8 text-gold" />
  },
  {
    title: "Video Editing",
    description: "4 weeks complete package (15k KES)",
    link: "/services/video-editing",
    action: "Get Started",
    icon: <Wrench className="w-8 h-8 text-gold" />
  }
];

const ServicesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {services.map((service, index) => (
        <Link
          key={index}
          to={service.link}
          className="block transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <Card className="h-full bg-white/95 dark:bg-charcoal/95 border-gold/20 backdrop-blur-sm transition-all duration-300">
            <CardHeader className="flex items-center justify-center pt-8">
              {service.icon}
            </CardHeader>
            <CardContent className="text-center px-6 py-6">
              <h3 className="text-xl font-playfair text-charcoal dark:text-offwhite mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-charcoal/80 dark:text-offwhite/80">
                {service.description}
              </p>
            </CardContent>
            <CardFooter className="justify-center pb-8">
              <Button 
                variant="outline" 
                className="bg-gold hover:bg-gold/80 text-charcoal border-none transition-colors duration-300"
              >
                {service.action}
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ServicesSection;
