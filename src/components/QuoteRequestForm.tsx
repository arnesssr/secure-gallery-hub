import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const QuoteRequestForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDetails: "",
    budget: "",
    timeline: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("quote_requests").insert([
        {
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          project_details: formData.projectDetails,
          budget: formData.budget,
          timeline: formData.timeline,
          service_type: "food-photography",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Quote Request Submitted",
        description: "We'll get back to you soon with a custom quote!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectDetails: "",
        budget: "",
        timeline: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-playfair font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        Request a Custom Quote
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Tell us about your project and we'll create a tailored quote for you
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+254..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget Range (KES)</label>
            <Input
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              placeholder="e.g., 50,000 - 100,000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Project Timeline</label>
          <Input
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            placeholder="e.g., Next month, Q2 2024"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Project Details</label>
          <Textarea
            name="projectDetails"
            value={formData.projectDetails}
            onChange={handleInputChange}
            required
            placeholder="Tell us about your project, requirements, and any specific ideas you have in mind..."
            className="h-32"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl transition-all"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Submit Quote Request"
          )}
        </Button>
      </form>
    </div>
  );
};

export default QuoteRequestForm;