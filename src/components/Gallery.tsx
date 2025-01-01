const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80",
      title: "Corporate Events"
    },
    {
      url: "https://images.unsplash.com/photo-1551216223-37c8d1dbec5c?q=80",
      title: "Product Photography"
    },
    {
      url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80",
      title: "Portrait Sessions"
    },
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80",
      title: "Wedding Photography"
    },
    {
      url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80",
      title: "Studio Sessions"
    },
    {
      url: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80",
      title: "Architectural Photography"
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-offwhite">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-playfair text-charcoal text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg aspect-square transform transition-all duration-500 hover:-translate-y-2"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-xl text-offwhite font-playfair tracking-wider">
                  {image.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;