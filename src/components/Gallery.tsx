import { useState } from 'react';
import { Button } from '@/components/ui/button';
const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const filters = [{
    id: 'todas',
    label: 'Todas'
  }, {
    id: 'fabrica',
    label: 'Fábrica'
  }, {
    id: 'metalurgica',
    label: 'Metalúrgica'
  }, {
    id: 'rental',
    label: 'Rental'
  }];

  // Gallery images organized by category
  const images = [
    // Metalúrgica category images - Real images from GitHub
    {
      id: 1,
      category: 'metalurgica',
      src: '/images/metalurgica/metalurgica-1.jpg',
      alt: 'Equipos de metalurgia y estructuras industriales'
    },
    {
      id: 2,
      category: 'metalurgica',
      src: '/images/metalurgica/metalurgica-2.jpg',
      alt: 'Piletas de acumulación y tanques industriales'
    },
    {
      id: 3,
      category: 'metalurgica',
      src: '/images/metalurgica/metalurgica-3.jpg',
      alt: 'Estructuras metalúrgicas para industria petrolera'
    },
    {
      id: 4,
      category: 'metalurgica',
      src: '/images/metalurgica/metalurgica-4.jpg',
      alt: 'Choke manifolds y equipos especializados'
    },
    {
      id: 5,
      category: 'metalurgica',
      src: '/images/metalurgica/metalurgica-5.jpg',
      alt: 'Contenedores y estructuras sobre skid'
    },
    {
      id: 6,
      category: 'metalurgica',
      src: '/images/metalurgica/metalurgica-6.jpg',
      alt: 'Plantas móviles y circuitos industriales'
    },
    
    // Fábrica category images - Using existing images as placeholders
    {
      id: 7,
      category: 'fabrica',
      src: '/nuestra-empresa.jpg',
      alt: 'Instalaciones de fábrica y área de producción'
    },
    {
      id: 8,
      category: 'fabrica',
      src: '/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png',
      alt: 'Módulos habitacionales en proceso de fabricación'
    },
    {
      id: 9,
      category: 'fabrica',
      src: '/codelco-logo-new.png',
      alt: 'Área de ensamblaje de viviendas modulares'
    },
    
    // Rental category images - Using existing images as placeholders
    {
      id: 10,
      category: 'rental',
      src: '/nuestra-empresa.jpg',
      alt: 'Flota de vehículos Toyota Hilux para rental'
    },
    {
      id: 11,
      category: 'rental',
      src: '/lovable-uploads/f4475002-d314-4a46-bb95-54b87d2d6b5c.png',
      alt: 'Trailers y equipos especializados'
    },
    {
      id: 12,
      category: 'rental',
      src: '/logo24.png',
      alt: 'Contenedores tipo volquete para alquiler'
    }
  ];
  const filteredImages = activeFilter === 'todas' ? images : images.filter(img => img.category === activeFilter);
  return <section className="py-15 bg-background">
      <div className="container mx-auto px-20 max-w-4xl">
        <div>
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{
            color: '#333333'
          }}>GALERÍA DE </span>
            <span style={{
            color: '#d25840'
          }}>IMÁGENES</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filters.map(filter => <Button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-4 py-2 text-body ${activeFilter === filter.id ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}>
              {filter.label}
            </Button>)}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-full mx-auto my-12.5 px-6">
          {filteredImages.length === 0 ?
        // Placeholder cards when no images are available
        Array.from({
          length: 6
        }, (_, index) => <div key={index} className="bg-card aspect-square flex items-center justify-center">
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
              </div>) :
        // Actual images when available
        filteredImages.map(image => <div key={image.id} className="group relative overflow-hidden aspect-square">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                <div className="mt-2">
                  <p className="text-body font-normal text-foreground">
                    {image.alt}
                  </p>
                </div>
              </div>)}
        </div>

        {filteredImages.length === 0 && <div className="text-center mt-8">
            
          </div>}
      </div>
    </section>;
};
export default Gallery;