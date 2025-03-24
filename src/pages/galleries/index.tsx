
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FolderOpen, Lock, Plus, LogOut, Image } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import PrivateGalleries from "@/components/galleries/PrivateGalleries";
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
      <main className="container mx-auto px-4 py-32">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite">
            Photography Collections
          </h1>
          <div className="flex gap-4">
            {user && (
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link to="/galleries/new">
                  <Plus className="w-4 h-4" />
                  New Collection
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

        <div className="mb-12">
          <p className="text-charcoal/80 dark:text-offwhite/80 text-lg max-w-3xl">
            Explore our curated collections of professional photography across various genres. Each collection showcases our best work and artistic vision.
          </p>
        </div>

        {/* Using Tabs for better navigation between Collections and Private */}
        <Tabs defaultValue="collections" className="mt-12">
          <TabsList className="mb-8 w-full max-w-md mx-auto grid grid-cols-2">
            <TabsTrigger value="collections" className="text-lg flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-gold" />
              Collections
            </TabsTrigger>
            <TabsTrigger value="private" className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-gold" />
              Private Galleries
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="collections" className="mt-6">
            <CollectionsList />
          </TabsContent>
          
          <TabsContent value="private" className="mt-6">
            {user ? (
              <PrivateGalleries user={user} />
            ) : (
              <div className="text-center py-16 bg-charcoal/5 dark:bg-charcoal/30 rounded-lg">
                <Lock className="w-12 h-12 mx-auto mb-4 text-gold/50" />
                <h3 className="text-xl font-playfair mb-4">Private Galleries</h3>
                <p className="text-charcoal/70 dark:text-offwhite/70 mb-6 max-w-md mx-auto">
                  Please sign in to access your private galleries and exclusive content.
                </p>
                <Button asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default GalleriesPage;
