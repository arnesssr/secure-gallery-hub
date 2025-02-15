
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charcoal text-offwhite py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-playfair text-xl mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                philiprundu@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +254 721 217 933
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-playfair text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
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
          
          <div>
            <h3 className="font-playfair text-xl mb-4">Location</h3>
            <p className="text-offwhite/80">
              Washikadau Entertainment Studios<br />
              Amber House, Baricho Road<br />
              Nairobi, Kenya
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-offwhite/10 text-center text-sm text-offwhite/60">
          <p>© {new Date().getFullYear()} Washikadau Entertainment Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
