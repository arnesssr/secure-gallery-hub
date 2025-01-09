import { useState, useEffect } from "react";
import { Lock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import PasswordRequestModal from "./PasswordRequestModal";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface Gallery {
  id: string;
  title: string;
  image_url: string;
  password: string | null;
  is_private: boolean;
}

const EncryptedGallery = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .eq("is_private", true);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch galleries",
        variant: "destructive",
      });
      return;
    }

    setGalleries(data || []);
  };

  const handleUnlock = (gallery: Gallery) => {
    if (password === gallery.password) {
      setSelectedImage(gallery.id);
      setPassword("");
      toast({
        title: "Gallery Unlocked",
        description: "You now have access to view this gallery.",
      });
    } else {
      toast({
        title: "Invalid Password",
        description: "Please check your password and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {galleries.map((gallery) => (
        <Dialog key={gallery.id}>
          <DialogTrigger asChild>
            <Card className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 bg-charcoal/60 flex items-center justify-center">
                    {selectedImage === gallery.id ? (
                      <Key className="w-8 h-8 text-gold" />
                    ) : (
                      <Lock className="w-8 h-8 text-gold" />
                    )}
                  </div>
                  {selectedImage === gallery.id ? (
                    <img
                      src={gallery.image_url}
                      alt={gallery.title}
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
              <DialogTitle>{gallery.title}</DialogTitle>
              <DialogDescription>
                Enter the password to view this gallery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <Button onClick={() => handleUnlock(gallery)}>Unlock</Button>
              </div>
              <div className="text-center">
                <p className="text-sm text-charcoal/80 dark:text-offwhite/80 mb-2">
                  Don't have the password?
                </p>
                <PasswordRequestModal
                  galleryId={gallery.id}
                  galleryTitle={gallery.title}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default EncryptedGallery;