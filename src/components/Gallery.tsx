import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const Gallery = () => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState("");

  const services = [
    {
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80",
      title: "Professional Photography",
      description: "Events, portraits, and commercial photography",
      link: "/photography-services",
      action: "Learn More"
    },
    {
      url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80",
      title: "Stereo Systems Rental",
      description: "High-end audio equipment for events",
      link: "/sound-services",
      action: "Rent Now"
    },
    {
      url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80",
      title: "Sound Engineering",
      description: "Professional sound mixing and setup",
      link: "/sound-services",
      action: "Book Now"
    },
    {
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80",
      title: "Photography School",
      description: "Learn from professional photographers",
      link: "/photography-services",
      action: "Join Now"
    },
    {
      url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80",
      title: "Video Editing",
      description: "Professional video editing services",
      link: "/video-services",
      action: "Get Started"
    },
  ];

  const collections = [
    {
      id: "wedding-2024",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      title: "Smith Wedding Collection",
      description: "March 2024 - 500 photos",
      password: "demo123"
    },
    {
      id: "corporate-2024",
      url: "https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1",
      title: "Tech Corp Event",
      description: "February 2024 - 300 photos",
      password: "demo123"
    },
    {
      id: "portrait-2024",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      title: "Portrait Collection",
      description: "January 2024 - 200 photos",
      password: "demo123"
    },
    {
      id: "fashion-2024",
      url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
      title: "Fashion Photoshoot",
      description: "March 2024 - 150 photos",
      password: "demo123"
    },
  ];

  const handleCollectionClick = (collectionId: string) => {
    setSelectedCollection(collectionId);
    setIsDialogOpen(true);
  };

  const handlePasswordSubmit = () => {
    const collection = collections.find(c => c.id === selectedCollection);
    if (collection?.password === password) {
      // Here you would typically redirect to the full collection
      alert("Access granted! Redirecting to collection...");
      setIsDialogOpen(false);
      setPassword("");
    } else {
      alert("Incorrect password");
    }
  };

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
              className="relative group overflow-hidden rounded-lg aspect-square transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={service.url}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-8 px-4 text-center">
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
          Client Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => handleCollectionClick(collection.id)}
              className="relative group overflow-hidden rounded-lg aspect-video cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={collection.url}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-100 flex flex-col items-center justify-end pb-8 px-4 text-center">
                <Lock className="w-6 h-6 text-gold mb-2" />
                <span className="text-xl text-offwhite font-playfair tracking-wider mb-2">
                  {collection.title}
                </span>
                <p className="text-sm text-offwhite/90 font-roboto">
                  {collection.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Protected Collection</DialogTitle>
            <DialogDescription>
              Please enter the password to view this collection
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              type="password"
              placeholder="Enter collection password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handlePasswordSubmit}>Access Collection</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;