import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Music2, Video, School, Mic2, Wrench } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const services = [
  {
    title: "Professional Photography",
    description: "Events, portraits, and commercial photography",
    link: "/photography-services",
    action: "Learn More",
    icon: <Camera className="w-8 h-8 text-gold" />
  },
  {
    title: "Sound Services",
    description: "Professional sound engineering and stereo rentals",
    link: "/sound-services",
    action: "Learn More",
    icon: <Music2 className="w-8 h-8 text-gold" />
  },
  {
    title: "Podcast Studio",
    description: "Professional podcast recording at affordable rates",
    link: "/podcast-services",
    action: "Book Now",
    icon: <Mic2 className="w-8 h-8 text-gold" />
  },
  {
    title: "Photography School",
    description: "Learn from professional photographers",
    link: "/photography-school",
    action: "Join Now",
    icon: <School className="w-8 h-8 text-gold" />
  },
  {
    title: "Video Editing",
    description: "Professional video editing services",
    link: "/video-services",
    action: "Get Started",
    icon: <Video className="w-8 h-8 text-gold" />
  }
];

const ServicesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {services.map((service, index) => (
        <Link
          key={index}
          to={service.link}
          className="block transform transition-all duration-300 hover:-translate-y-1"
        >
          <Card className="h-full bg-white dark:bg-charcoal/50 border-gold/20">
            <CardHeader className="flex items-center justify-center pt-8">
              {service.icon}
            </CardHeader>
            <CardContent className="text-center px-4 py-6">
              <h3 className="text-xl font-playfair text-charcoal dark:text-offwhite mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-charcoal/80 dark:text-offwhite/80">
                {service.description}
              </p>
            </CardContent>
            <CardFooter className="justify-center pb-8">
              <Button variant="outline" className="bg-gold hover:bg-gold/80 text-charcoal border-none">
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