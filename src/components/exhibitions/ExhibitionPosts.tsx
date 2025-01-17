import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Exhibition {
  id: string;
  title: string;
}

interface ExhibitionPostsProps {
  user: any;
  exhibitions: Exhibition[];
}

const ExhibitionPosts = ({ user, exhibitions }: ExhibitionPostsProps) => {
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['exhibition_posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exhibition_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      const { data, error } = await supabase
        .from('exhibition_posts')
        .insert([
          {
            content,
            author_id: user?.id,
            exhibition_id: exhibitions[0]?.id // Default to first exhibition for now
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exhibition_posts'] });
      toast({
        title: "Success",
        description: "Your post has been published!",
      });
      setNewPost("");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create post. Please try again.",
      });
    }
  });

  const handlePostSubmit = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post comments.",
        variant: "destructive",
      });
      return;
    }

    if (!newPost.trim()) {
      toast({
        title: "Empty Post",
        description: "Please write something before posting.",
        variant: "destructive",
      });
      return;
    }

    createPostMutation.mutate(newPost);
  };

  const handleInteraction = (type: "like" | "comment" | "share", postId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to interact with posts.",
        variant: "destructive",
      });
      return;
    }

    // Implement interactions here
    toast({
      title: "Success",
      description: `Post ${type}d successfully!`,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="border-gold/20">
        <CardContent className="pt-6">
          <Textarea
            placeholder="Share your thoughts about the exhibition..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            onClick={handlePostSubmit}
            className="bg-gold hover:bg-gold/80 text-charcoal"
          >
            Post
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="border-gold/20">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="font-playfair text-lg">
                  {post.author_id === user?.id ? "You" : "Anonymous"}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base">{post.content}</p>
            </CardContent>
            <CardFooter className="flex gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInteraction("like", post.id)}
                className="flex gap-2"
              >
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInteraction("comment", post.id)}
                className="flex gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleInteraction("share", post.id)}
                className="flex gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>{post.shares}</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionPosts;