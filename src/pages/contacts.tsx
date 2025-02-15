
import Navbar from "@/components/Navbar";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactsPage = () => {
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
      const { error } = await supabase
        .from('feedback')
        .insert([{
          name: feedbackForm.name,
          email: feedbackForm.email,
          message: feedbackForm.message,
          status: 'unread'
        }]);

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
    <div className="min-h-screen bg-offwhite dark:bg-charcoal">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-playfair text-charcoal dark:text-offwhite mb-12">Contact Us</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-charcoal/50 rounded-xl p-8 shadow-lg">
                <h2 className="font-playfair text-2xl mb-8 text-charcoal dark:text-offwhite">Get in Touch</h2>
                <div className="space-y-6">
                  <p className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-gold" />
                    <a href="mailto:philiprundu@gmail.com" className="hover:text-gold transition-colors">
                      philiprundu@gmail.com
                    </a>
                  </p>
                  <p className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-gold" />
                    <a href="tel:0721217933" className="hover:text-gold transition-colors">
                      0721 217 933
                    </a>
                  </p>
                  <p className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                    <span>
                      Washikadau Entertainment Studios<br />
                      Amber House, Baricho Road<br />
                      Nairobi, Kenya
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-charcoal/50 rounded-xl p-8 shadow-lg">
                <h2 className="font-playfair text-2xl mb-8 text-charcoal dark:text-offwhite">Follow Us</h2>
                <div className="flex space-x-8">
                  <a 
                    href="https://facebook.com/WashikadauPikchaz" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <Facebook className="w-6 h-6" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="https://www.threads.net/@washikadaupikchaz" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <Instagram className="w-6 h-6" />
                    <span>Threads</span>
                  </a>
                  <a 
                    href="#" 
                    className="hover:text-gold transition-colors flex items-center gap-2"
                  >
                    <Twitter className="w-6 h-6" />
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Feedback Form */}
            <div className="bg-white dark:bg-charcoal/50 rounded-xl p-8 shadow-lg">
              <h2 className="font-playfair text-2xl mb-8 flex items-center gap-2 text-charcoal dark:text-offwhite">
                <MessageSquare className="w-6 h-6 text-gold" />
                Send us Feedback
              </h2>
              <form onSubmit={handleSubmitFeedback} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      name="name"
                      value={feedbackForm.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white/50 dark:bg-white/5"
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
                      className="bg-white/50 dark:bg-white/5"
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
                    className="bg-white/50 dark:bg-white/5 h-32"
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
        </div>
      </main>
    </div>
  );
};

export default ContactsPage;
