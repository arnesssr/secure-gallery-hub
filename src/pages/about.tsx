import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center mb-12">
            <h1 className="text-4xl font-playfair mb-4">About Washikadau Entertainment Studios</h1>
            <p className="text-lg text-muted-foreground">
              Capturing moments, creating memories, and delivering excellence since 2010
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-playfair mb-4">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Founded in 2010, Washikadau Entertainment Studios has grown from a small photography studio 
              to a comprehensive media production house. Our journey began with a passion for capturing 
              life's precious moments and has evolved into a full-service creative studio offering 
              photography, videography, sound production, and educational services.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-playfair mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We strive to deliver exceptional quality in every project we undertake, whether it's 
              capturing wedding memories, producing corporate content, or teaching the next generation 
              of photographers. Our commitment to excellence and attention to detail sets us apart in 
              the industry.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-playfair mb-4">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Photography</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Professional photography services for weddings, corporate events, portraits, fashion, 
                  products, and more.
                </p>
              </div>
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Videography</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  High-quality video production services for events, commercials, and corporate needs.
                </p>
              </div>
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Sound Production</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Professional audio recording, mixing, and production services.
                </p>
              </div>
              <div className="p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Photography School</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Educational programs and workshops for aspiring photographers.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-playfair mb-4">Our Team</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Our team consists of passionate professionals with years of experience in their respective 
              fields. From photographers and videographers to sound engineers and instructors, each 
              member brings unique expertise and creativity to every project.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;