import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  id: string;
  author: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: "John Doe",
    content: "Amazing exhibition! The urban landscapes were breathtaking.",
    likes: 24,
    comments: 5,
    shares: 3,
    createdAt: "2024-01-17",
  },
  {
    id: "2",
    author: "Jane Smith",
    content: "The cultural heritage section really moved me. Beautiful work!",
    likes: 18,
    comments: 3,
    shares: 2,
    createdAt: "2024-01-16",
  },
];

const ExhibitionPosts = ({ user }: { user: any }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

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

    const post: Post = {
      id: String(Date.now()),
      author: user.email,
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Success",
      description: "Your post has been published!",
    });
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

    setPosts(posts.map(post => {
      if (post.id === postId) {
        switch (type) {
          case "like":
            return { ...post, likes: post.likes + 1 };
          case "comment":
            return { ...post, comments: post.comments + 1 };
          case "share":
            return { ...post, shares: post.shares + 1 };
          default:
            return post;
        }
      }
      return post;
    }));

    toast({
      title: "Success",
      description: `Post ${type}d successfully!`,
    });
  };

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
                <h3 className="font-playfair text-lg">{post.author}</h3>
                <span className="text-sm text-muted-foreground">
                  {post.createdAt}
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