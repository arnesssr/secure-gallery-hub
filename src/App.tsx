
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import AuthPage from "@/components/auth/AuthPage";
import Index from "./pages/Index";
import PhotographyServices from "./pages/photography-services";
import SoundServices from "./pages/sound-services";
import PodcastServices from "./pages/podcast-services";
import GalleriesPage from "./pages/galleries";
import PhotographySchool from "./pages/photography-school";
import VideoServices from "./pages/video-services";
import DroneServices from "./pages/drone-services";
import VideoEditing from "./pages/services/video-editing";
import AboutPage from "./pages/about";
import GalleryView from "./pages/galleries/[id]";
import PaymentPage from "./pages/services/payment";
import ExhibitionsPage from "./pages/exhibitions";
import EquipmentRentals from "./pages/equipment-rentals";

// Photography service pages
import WeddingPhotography from "./pages/services/wedding-photography";
import CorporatePhotography from "./pages/services/corporate-photography";
import PortraitPhotography from "./pages/services/portrait-photography";
import FashionPhotography from "./pages/services/fashion-photography";
import ProductPhotography from "./pages/services/product-photography";
import FoodPhotography from "./pages/services/food-photography";
import SportsPhotography from "./pages/services/sports-photography";
import LandscapePhotography from "./pages/services/landscape-photography";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="washikadau-theme">
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/galleries" element={<GalleriesPage />} />
            <Route path="/galleries/:id" element={<GalleryView />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/exhibitions" element={<ExhibitionsPage />} />
            <Route path="/photography-services" element={<PhotographyServices />} />
            <Route path="/sound-services" element={<SoundServices />} />
            <Route path="/podcast-services" element={<PodcastServices />} />
            <Route path="/photography-school" element={<PhotographySchool />} />
            <Route path="/video-services" element={<VideoServices />} />
            <Route path="/equipment-rentals" element={<EquipmentRentals />} />
            <Route path="/drone-services" element={<DroneServices />} />
            
            {/* Services routes */}
            <Route path="/services/video-editing" element={<VideoEditing />} />
            <Route path="/services/wedding-photography" element={<WeddingPhotography />} />
            <Route path="/services/corporate-photography" element={<CorporatePhotography />} />
            <Route path="/services/portrait-photography" element={<PortraitPhotography />} />
            <Route path="/services/fashion-photography" element={<FashionPhotography />} />
            <Route path="/services/product-photography" element={<ProductPhotography />} />
            <Route path="/services/food-photography" element={<FoodPhotography />} />
            <Route path="/services/sports-photography" element={<SportsPhotography />} />
            <Route path="/services/landscape-photography" element={<LandscapePhotography />} />
            
            {/* Payment routes */}
            <Route path="/services/:service/payment" element={<PaymentPage />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
