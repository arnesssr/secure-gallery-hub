const Gallery = () => {
  const services = [
    {
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80",
      title: "Professional Photography",
      description: "Events, portraits, and commercial photography"
    },
    {
      url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80",
      title: "Stereo Systems Rental",
      description: "High-end audio equipment for events"
    },
    {
      url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80",
      title: "Sound Engineering",
      description: "Professional sound mixing and setup"
    },
    {
      url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80",
      title: "Video Editing",
      description: "Professional post-production services"
    },
    {
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80",
      title: "Photography Classes",
      description: "Learn from experienced professionals"
    },
    {
      url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80",
      title: "Equipment Rental",
      description: "Professional camera and lighting gear"
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-offwhite dark:bg-charcoal transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-playfair text-charcoal dark:text-offwhite text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-square transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <img
                src={service.url}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-8 px-4 text-center">
                <span className="text-xl text-offwhite font-playfair tracking-wider mb-2">
                  {service.title}
                </span>
                <p className="text-sm text-offwhite/90 font-roboto">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;