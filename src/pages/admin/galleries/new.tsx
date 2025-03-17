
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

const NewGallery = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      toast({
        title: "Missing fields",
        description: "Please provide a title and cover image",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // 1. Upload cover image
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `galleries/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery_images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('gallery_images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // 3. Create gallery entry
      const { data, error } = await supabase
        .from('galleries')
        .insert({
          title,
          description,
          is_private: isPrivate,
          password: isPrivate ? password : null,
          image_url: publicUrl
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Gallery created",
        description: "Your gallery has been created successfully",
      });

      navigate('/admin');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to create gallery",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal/90 py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Gallery Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter gallery title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter gallery description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cover">Cover Image</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="private"
                  checked={isPrivate}
                  onCheckedChange={setIsPrivate}
                />
                <Label htmlFor="private">Private Gallery</Label>
              </div>

              {isPrivate && (
                <div className="space-y-2">
                  <Label htmlFor="password">Gallery Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password for private gallery"
                    required={isPrivate}
                  />
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Create Gallery
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NewGallery;
