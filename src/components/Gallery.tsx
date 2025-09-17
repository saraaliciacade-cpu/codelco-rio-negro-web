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
    <section className="py-15 bg-background">
      <div className="container mx-auto px-20 max-w-4xl">
        <div>
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{color: '#333333'}}>GALERÍA DE </span>
            <span style={{color: '#d25840'}}>IMÁGENES</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 text-body ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border border-primary'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-full mx-auto my-12.5 px-6">
          {filteredImages.length === 0 ? (
            // Placeholder cards when no images are available
            Array.from({ length: 6 }, (_, index) => (
              <div 
                key={index}
                className="bg-card aspect-square flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2 mx-auto">
                    <span className="text-white font-bold text-body">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-body text-foreground">
                    Imagen {index + 1}
                  </p>
                </div>
              </div>
            ))
          ) : (
            // Actual images when available
            filteredImages.map((image) => (
              <div 
                key={image.id}
                className="group relative overflow-hidden aspect-square"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="mt-2">
                  <p className="text-body font-normal text-foreground">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-body text-foreground">
              Las imágenes se añadirán próximamente
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;