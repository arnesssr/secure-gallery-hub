
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedbackForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("feedback").insert([
        {
          name: feedbackForm.name,
          email: feedbackForm.email,
          message: feedbackForm.message,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "We appreciate your input and will get back to you if needed.",
      });

      // Reset form
      setFeedbackForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-charcoal text-offwhite py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="font-playfair text-2xl mb-6">Contact Us</h3>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold" />
                  <a href="mailto:philiprundu@gmail.com" className="hover:text-gold transition-colors">
                    philiprundu@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold" />
                  <a href="tel:0721217933" className="hover:text-gold transition-colors">
                    0721 217 933
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                  <span>
                    Washikadau Entertainment Studios<br />
                    Amber House, Baricho Road<br />
                    Nairobi, Kenya
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-playfair text-xl mb-4">Follow Us</h3>
              <div className="flex space-x-6">
                <a 
                  href="https://facebook.com/WashikadauPikchaz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="https://www.threads.net/@washikadaupikchaz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="hover:text-gold transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
            <h3 className="font-playfair text-2xl mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-gold" />
              Send us Feedback
            </h3>
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-offwhite"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-offwhite"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  name="message"
                  value={feedbackForm.message}
                  onChange={handleInputChange}
                  required
                  className="bg-white/10 border-white/20 text-offwhite h-32"
                  placeholder="Your feedback or message..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/80 text-charcoal"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Feedback"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-offwhite/10 pt-8 text-center text-sm text-offwhite/60">
          <p>© {new Date().getFullYear()} Washikadau Entertainment Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
