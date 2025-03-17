
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, FolderPlus, ImagePlus, Settings, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Check if user is admin
        const { data: adminData, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', user.email)
          .single();
        
        if (!error && adminData) {
          setIsAdmin(true);
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6">
              You don't have permission to access the admin area.
            </p>
            <Button onClick={handleSignOut} variant="outline" className="w-full">
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal/90">
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-playfair">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="galleries" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="galleries">Galleries</TabsTrigger>
            <TabsTrigger value="uploads">Upload Images</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="galleries">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/admin/galleries/new">
                <Card className="h-full border-dashed border-2 hover:border-gold transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center h-full py-12">
                    <FolderPlus size={48} className="text-gray-400 mb-4" />
                    <p className="text-xl font-medium">Create New Gallery</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/admin/collections/new">
                <Card className="h-full border-dashed border-2 hover:border-gold transition-colors cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center h-full py-12">
                    <PlusCircle size={48} className="text-gray-400 mb-4" />
                    <p className="text-xl font-medium">Create New Collection</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="uploads">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/admin/upload/gallery">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <ImagePlus size={48} className="text-gold mb-4" />
                    <p className="text-xl font-medium">Upload to Gallery</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/admin/upload/exhibition">
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <ImagePlus size={48} className="text-gold mb-4" />
                    <p className="text-xl font-medium">Upload to Exhibition</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage your admin account settings and preferences.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings size={16} />
                  Edit Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
