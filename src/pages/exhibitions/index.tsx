
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExhibitionHeader from "@/components/exhibitions/ExhibitionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Share } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchExhibitions();
    fetchPosts();
  }, []);

  const fetchExhibitions = async () => {
    const { data, error } = await supabase
      .from("exhibitions")
      .select("*")
      .order("start_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exhibitions",
        variant: "destructive",
      });
      return;
    }

    setExhibitions(data || []);
    setLoading(false);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("exhibition_posts")
      .select("*, exhibitions(title)")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch exhibition posts",
        variant: "destructive",
      });
      return;
    }

    setPosts(data || []);
  };

  const handleLike = async (postId, currentLikes) => {
    const { error } = await supabase
      .from("exhibition_posts")
      .update({ likes: currentLikes + 1 })
      .eq("id", postId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      });
      return;
    }

    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );

    toast({
      title: "Post liked",
      description: "You have liked this post",
    });
  };

  const handleShare = async (postId, currentShares) => {
    // Increment share count in database
    const { error } = await supabase
      .from("exhibition_posts")
      .update({ shares: currentShares + 1 })
      .eq("id", postId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to share post",
        variant: "destructive",
      });
      return;
    }

    // Update local state
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );

    // Try to use the Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Exhibition Post',
          text: 'Check out this exhibition post!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied",
        description: "Link copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <ExhibitionHeader exhibitions={exhibitions} loading={loading} />

        <section className="mt-16">
          <h2 className="text-3xl font-playfair text-charcoal dark:text-offwhite mb-8">
            Exhibition Posts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={post.image_url || "https://source.unsplash.com/random/600x400?exhibition"}
                    alt={post.exhibitions?.title || "Exhibition post"}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {post.exhibitions?.title || "Exhibition"}
                        </h3>
                        <p className="text-sm text-charcoal/60 dark:text-offwhite/60">
                          {post.created_at
                            ? formatDistanceToNow(new Date(post.created_at), {
                                addSuffix: true,
                              })
                            : "Recently"}
                        </p>
                      </div>
                    </div>

                    <p className="mb-6">{post.content}</p>

                    <div className="flex justify-between items-center text-charcoal/60 dark:text-offwhite/60 text-sm">
                      <div className="flex space-x-6">
                        <button
                          onClick={() => handleLike(post.id, post.likes)}
                          className="flex items-center gap-1 hover:text-gold transition-colors"
                        >
                          <Heart size={18} />
                          <span>{post.likes || 0}</span>
                        </button>
                        <button
                          onClick={() => handleShare(post.id, post.shares)}
                          className="flex items-center gap-1 hover:text-gold transition-colors"
                        >
                          <Share size={18} />
                          <span>{post.shares || 0}</span>
                        </button>
                      </div>
                      <div>
                        <span>{post.views || 0} views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExhibitionsPage;
