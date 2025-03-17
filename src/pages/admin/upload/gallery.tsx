
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Loader2, X, Image as ImageIcon } from "lucide-react";

const UploadToGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    // Create preview URLs for selected files
    if (files.length > 0) {
      const newPreviewUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
      
      // Cleanup function to revoke object URLs to avoid memory leaks
      return () => {
        newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
      };
    }
  }, [files]);

  const fetchGalleries = async () => {
    const { data, error } = await supabase
      .from('galleries')
      .select('id, title')
      .order('title', { ascending: true });
      
    if (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch galleries",
        variant: "destructive",
      });
      return;
    }
    
    setGalleries(data || []);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGallery || files.length === 0) {
      toast({
        title: "Missing fields",
        description: "Please select a gallery and at least one image",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // 1. Upload image
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `gallery_images/${selectedGallery}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery_images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // 2. Get public URL
        const { data: urlData } = supabase.storage
          .from('gallery_images')
          .getPublicUrl(filePath);

        const publicUrl = urlData.publicUrl;

        // 3. Create gallery image entry
        const { error: insertError } = await supabase
          .from('gallery_images')
          .insert({
            gallery_id: selectedGallery,
            title: title || file.name,
            description,
            image_url: publicUrl,
            order_index: i
          });

        if (insertError) throw insertError;

        // Update progress
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }

      toast({
        title: "Upload successful",
        description: `${files.length} images uploaded to gallery`,
      });

      navigate('/admin');
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal/90 py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back to Admin
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Upload Images to Gallery</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="gallery">Select Gallery</Label>
                <Select 
                  value={selectedGallery} 
                  onValueChange={setSelectedGallery}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a gallery" />
                  </SelectTrigger>
                  <SelectContent>
                    {galleries.map(gallery => (
                      <SelectItem key={gallery.id} value={gallery.id}>
                        {gallery.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Image Title (Optional)</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter image title"
                />
                <p className="text-sm text-gray-500">Leave blank to use filenames</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter image description"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images">Upload Images</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="mb-4"
                />
                
                {previewUrls.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={url} 
                          alt={`Preview ${index}`} 
                          className="rounded-md h-24 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {previewUrls.length === 0 && (
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">No images selected</p>
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Upload Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
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
              disabled={isUploading || !selectedGallery || files.length === 0}
              className="flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Upload Images
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UploadToGallery;
