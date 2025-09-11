import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('todas');

  const filters = [
    { id: 'todas', label: 'Todas' },
    { id: 'fabrica', label: 'Fábrica' },
    { id: 'metalurgica', label: 'Metalúrgica' },
    { id: 'rental', label: 'Rental' }
  ];

  // Placeholder for future images - will be populated when user sends images
  const images = [
    // Placeholder structure for when images are added
    // { id: 1, category: 'fabrica', src: 'path/to/image', alt: 'Description' },
  ];

  const filteredImages = activeFilter === 'todas' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <section className="py-32 bg-secondary/30">
      <div className="container mx-auto px-8 max-w-8xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Galería de Imágenes
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
            Conoce nuestros proyectos y capacidades industriales
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`px-8 py-3 rounded-lg transition-all duration-300 text-lg ${
                activeFilter === filter.id
                  ? 'bg-gradient-primary text-white shadow-md'
                  : 'border-primary text-primary hover:bg-primary/10'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-8xl mx-auto">
          {filteredImages.length === 0 ? (
            // Placeholder cards when no images are available
            Array.from({ length: 8 }, (_, index) => (
              <div 
                key={index}
                className="bg-card border rounded-lg p-8 hover:shadow-soft transition-all duration-300 hover:scale-105 aspect-square flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Imagen {index + 1}
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    {filters.find(f => f.id === activeFilter)?.label}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // Actual images when available
            filteredImages.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-strong transition-all duration-300 hover:scale-105 aspect-square"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground">
              Las imágenes se añadirán próximamente
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;