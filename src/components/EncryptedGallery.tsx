import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const EncryptedGallery = () => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const encryptedImages = [
    {
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      title: "Private Event 1"
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      title: "Private Event 2"
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      title: "Private Event 3"
    }
  ];

  const handleUnlock = () => {
    // This is a simple example. In a real app, you'd verify against a backend
    if (password === "demo123") {
      setIsUnlocked(true);
      toast({
        title: "Gallery Unlocked",
        description: "You now have access to the private gallery.",
      });
    } else {
      toast({
        title: "Invalid Password",
        description: "Please check your password and try again.",
        variant: "destructive",
      });
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 p-8">
        <Lock className="w-16 h-16 text-gold" />
        <h2 className="text-2xl font-playfair text-charcoal dark:text-offwhite">
          This Gallery is Password Protected
        </h2>
        <p className="text-center max-w-md text-charcoal/80 dark:text-offwhite/80">
          Please enter the password provided to you to access this private gallery.
        </p>
        <div className="flex space-x-4 w-full max-w-md">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="flex-1"
          />
          <Button onClick={handleUnlock}>Unlock</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {encryptedImages.map((image, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-lg aspect-square"
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <h3 className="text-xl text-offwhite font-playfair">{image.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EncryptedGallery;