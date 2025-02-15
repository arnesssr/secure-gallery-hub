
const Footer = () => {
  return (
    <footer className="bg-charcoal text-offwhite py-8">
      <div className="container mx-auto px-4">
        <div className="border-t border-offwhite/10 pt-8 text-center text-sm text-offwhite/60">
          <p>© {new Date().getFullYear()} Washikadau Entertainment Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
