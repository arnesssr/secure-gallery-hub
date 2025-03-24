
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FolderOpen, Lock, Plus, LogOut } from "lucide-react";
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
      <main className="container mx-auto px-4 py-24">
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

        {/* Single tab for Collections only */}
        <div className="mb-8">
          <h2 className="text-2xl font-playfair flex items-center text-charcoal dark:text-offwhite mb-8">
            <FolderOpen className="w-6 h-6 mr-2 text-gold" />
            Featured Collections
          </h2>
          <CollectionsList />
        </div>
        
        {/* Private section only if logged in */}
        {user && (
          <div className="mt-16">
            <h2 className="text-2xl font-playfair flex items-center text-charcoal dark:text-offwhite mb-8">
              <Lock className="w-6 h-6 mr-2 text-gold" />
              Private Galleries
            </h2>
            <PrivateGalleries user={user} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GalleriesPage;
