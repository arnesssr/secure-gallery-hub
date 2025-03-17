
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FolderOpen, Image, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Collection {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  image_count: number;
  is_private: boolean;
}

const CollectionsList = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .is("collection_id", null)
        .eq("type", "collection")
        .eq("is_private", false);

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load collections",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="aspect-[3/2] bg-charcoal/10 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="w-12 h-12 mx-auto mb-4 text-charcoal/50 dark:text-offwhite/50" />
        <h3 className="text-xl font-playfair mb-4">No Collections</h3>
        <p className="text-charcoal/70 dark:text-offwhite/70">
          There are no collections available yet
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <Link
          key={collection.id}
          to={`/galleries/${collection.id}`}
          className="group bg-white dark:bg-charcoal/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="aspect-[3/2] relative">
            <img
              src={collection.image_url}
              alt={collection.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl text-offwhite font-playfair mb-2">
                  {collection.title}
                </h3>
                {collection.description && (
                  <p className="text-offwhite/80 text-sm mb-4">{collection.description}</p>
                )}
                <Button variant="outline" className="w-full bg-gold hover:bg-gold/80 text-charcoal border-none">
                  View Collection
                </Button>
              </div>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-charcoal/80 text-offwhite px-3 py-1 rounded-full">
              <Image className="w-4 h-4" />
              <span className="text-sm">{collection.image_count || 0}</span>
            </div>
            {collection.is_private && (
              <div className="absolute top-4 left-4">
                <Lock className="w-5 h-5 text-gold" />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionsList;
