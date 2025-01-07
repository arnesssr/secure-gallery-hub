import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

const EncryptedGallery = () => {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { toast } = useToast();

  const encryptedImages = [
    {
      url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      title: "Private Event 1",
      password: "demo123"
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      title: "Private Event 2",
      password: "demo123"
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      title: "Private Event 3",
      password: "demo123"
    }
  ];

  const handleUnlock = (imageIndex: number) => {
    const image = encryptedImages[imageIndex];
    if (password === image.password) {
      setSelectedImage(imageIndex);
      setPassword("");
      toast({
        title: "Image Unlocked",
        description: "You now have access to view this image.",
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
          <Button onClick={() => setIsUnlocked(true)}>Unlock Gallery</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {encryptedImages.map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <Card className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-gold" />
                  </div>
                  {selectedImage === index ? (
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-charcoal/20" />
                  )}
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{image.title}</DialogTitle>
              <DialogDescription>
                Enter the password to view this image
              </DialogDescription>
            </DialogHeader>
            <div className="flex space-x-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <Button onClick={() => handleUnlock(index)}>Unlock</Button>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default EncryptedGallery;