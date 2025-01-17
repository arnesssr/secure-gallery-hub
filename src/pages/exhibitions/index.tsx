import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExhibitionHeader from "@/components/exhibitions/ExhibitionHeader";
import ExhibitionPosts from "@/components/exhibitions/ExhibitionPosts";
import { supabase } from "@/integrations/supabase/client";

const ExhibitionsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Error checking user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check authentication status.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="pt-20">
        <ExhibitionHeader />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite mb-8">
            Photography Exhibitions
          </h1>
          <ExhibitionPosts user={user} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExhibitionsPage;