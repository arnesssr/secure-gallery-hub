import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExhibitionHeader from "@/components/exhibitions/ExhibitionHeader";
import ExhibitionPosts from "@/components/exhibitions/ExhibitionPosts";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const ExhibitionsPage = () => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);

  const { data: exhibitions, isLoading: exhibitionsLoading } = useQuery({
    queryKey: ['exhibitions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exhibitions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
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
      }
    };

    checkUser();
  }, [toast]);

  if (exhibitionsLoading) {
    return (
      <div className="min-h-screen bg-offwhite dark:bg-charcoal">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="animate-pulse space-y-4">
              <div className="h-[400px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              <div className="h-8 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="pt-20">
        <ExhibitionHeader exhibitions={exhibitions || []} />
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite mb-8">
            Photography Exhibitions
          </h1>
          <ExhibitionPosts user={user} exhibitions={exhibitions || []} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExhibitionsPage;