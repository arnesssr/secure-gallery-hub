
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GalleryHorizontal, Lock, FolderOpen, Plus, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import PrivateGalleries from "@/components/galleries/PrivateGalleries";
import PublicGalleries from "@/components/galleries/PublicGalleries";
import CollectionsList from "@/components/galleries/CollectionsList";

const GalleriesPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite">
            Our Galleries
          </h1>
          <div className="flex gap-4">
            {user && (
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link to="/galleries/new">
                  <Plus className="w-4 h-4" />
                  New Gallery
                </Link>
              </Button>
            )}
            {user ? (
              <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            ) : (
              <Button asChild variant="outline">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="public" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="public" className="flex items-center gap-2">
              <GalleryHorizontal className="w-4 h-4" />
              Public
            </TabsTrigger>
            <TabsTrigger value="collections" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="private" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Private
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="public">
            <PublicGalleries />
          </TabsContent>
          
          <TabsContent value="collections">
            <CollectionsList />
          </TabsContent>
          
          <TabsContent value="private">
            <PrivateGalleries user={user} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default GalleriesPage;
