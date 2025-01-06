import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PhotographySchool = () => {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-charcoal dark:text-offwhite mb-8 hover:text-gold transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-playfair text-charcoal dark:text-offwhite mb-8">Photography School</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-charcoal/80 dark:text-offwhite/80">
              Learn photography from experienced professionals. Our comprehensive courses cover:
            </p>
            <ul className="list-disc list-inside space-y-3 text-charcoal/80 dark:text-offwhite/80">
              <li>Basic Photography</li>
              <li>Advanced Techniques</li>
              <li>Digital Editing</li>
              <li>Studio Lighting</li>
              <li>Business of Photography</li>
            </ul>
            <Button asChild>
              <Link to="/services/photography-school/payment">Join Now</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Photography class" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" alt="Photography workshop" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Photography equipment" className="rounded-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1552168324-d612d77725e3" alt="Photography studio" className="rounded-lg w-full h-48 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographySchool;