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

  // Gallery images from GitHub organized by category
  const images = [
    // Metalúrgica category images (19 images)
    { id: 1, category: 'metalurgica', src: '/images/metalurgica/metalurgica-01.jpg', alt: 'Equipos metalúrgicos industriales' },
    { id: 2, category: 'metalurgica', src: '/images/metalurgica/metalurgica-02.jpg', alt: 'Estructuras y tanques de acumulación' },
    { id: 3, category: 'metalurgica', src: '/images/metalurgica/metalurgica-03.jpg', alt: 'Piletas para industria petrolera' },
    { id: 4, category: 'metalurgica', src: '/images/metalurgica/metalurgica-04.jpg', alt: 'Choke manifolds especializados' },
    { id: 5, category: 'metalurgica', src: '/images/metalurgica/metalurgica-05.jpg', alt: 'Contenedores tipo volquete' },
    { id: 6, category: 'metalurgica', src: '/images/metalurgica/metalurgica-06.jpg', alt: 'Estructuras sobre skid' },
    { id: 7, category: 'metalurgica', src: '/images/metalurgica/metalurgica-07.jpg', alt: 'Líneas de alta presión' },
    { id: 8, category: 'metalurgica', src: '/images/metalurgica/metalurgica-08.jpg', alt: 'Plantas móviles de petróleo' },
    { id: 9, category: 'metalurgica', src: '/images/metalurgica/metalurgica-09.jpg', alt: 'Circuitos de lodo industriales' },
    { id: 10, category: 'metalurgica', src: '/images/metalurgica/metalurgica-10.jpg', alt: 'Tanques de almacenamiento' },
    { id: 11, category: 'metalurgica', src: '/images/metalurgica/metalurgica-11.jpg', alt: 'Estructuras para decanter' },
    { id: 12, category: 'metalurgica', src: '/images/metalurgica/metalurgica-12.jpg', alt: 'Planchadas industriales' },
    { id: 13, category: 'metalurgica', src: '/images/metalurgica/metalurgica-13.jpg', alt: 'Piletas de ensayo' },
    { id: 14, category: 'metalurgica', src: '/images/metalurgica/metalurgica-14.jpg', alt: 'Equipos de corte y plegado' },
    { id: 15, category: 'metalurgica', src: '/images/metalurgica/metalurgica-15.jpg', alt: 'Subestructuras especiales' },
    { id: 16, category: 'metalurgica', src: '/images/metalurgica/metalurgica-16.jpg', alt: 'Equipos metalúrgicos avanzados' },
    { id: 17, category: 'metalurgica', src: '/images/metalurgica/metalurgica-17.jpg', alt: 'Sistemas de alta tecnología' },
    { id: 18, category: 'metalurgica', src: '/images/metalurgica/metalurgica-18.jpg', alt: 'Instalaciones de producción' },
    { id: 19, category: 'metalurgica', src: '/images/metalurgica/metalurgica-19.jpg', alt: 'Equipamiento especializado' },

    // Rental category images (8 images)
    { id: 20, category: 'rental', src: '/images/rental/rental-01.jpg', alt: 'Flota de vehículos Toyota Hilux' },
    { id: 21, category: 'rental', src: '/images/rental/rental-02.jpg', alt: 'Trailers y equipos móviles' },
    { id: 22, category: 'rental', src: '/images/rental/rental-03.jpg', alt: 'Vehículos 4x4 para rental' },
    { id: 23, category: 'rental', src: '/images/rental/rental-04.jpg', alt: 'Equipos especializados en alquiler' },
    { id: 24, category: 'rental', src: '/images/rental/rental-05.jpg', alt: 'Contenedores para rental' },
    { id: 25, category: 'rental', src: '/images/rental/rental-06.jpg', alt: 'Flota liviana especializada' },
    { id: 26, category: 'rental', src: '/images/rental/rental-07.jpg', alt: 'Vehículos VW Amarok' },
    { id: 27, category: 'rental', src: '/images/rental/rental-08.jpg', alt: 'Equipos porta herramientas' },

    // Fábrica category images (25 images)
    { id: 28, category: 'fabrica', src: '/images/fabrica/fabrica-01.jpg', alt: 'Instalaciones de fábrica' },
    { id: 29, category: 'fabrica', src: '/images/fabrica/fabrica-02.jpg', alt: 'Área de producción modular' },
    { id: 30, category: 'fabrica', src: '/images/fabrica/fabrica-03.jpg', alt: 'Módulos habitacionales' },
    { id: 31, category: 'fabrica', src: '/images/fabrica/fabrica-04.jpg', alt: 'Viviendas en construcción' },
    { id: 32, category: 'fabrica', src: '/images/fabrica/fabrica-05.jpg', alt: 'Línea de ensamblaje' },
    { id: 33, category: 'fabrica', src: '/images/fabrica/fabrica-06.jpg', alt: 'Oficina de ingeniería y diseño' },
    { id: 34, category: 'fabrica', src: '/images/fabrica/fabrica-07.jpg', alt: 'Construcción en seco' },
    { id: 35, category: 'fabrica', src: '/images/fabrica/fabrica-08.jpg', alt: 'Módulos comerciales' },
    { id: 36, category: 'fabrica', src: '/images/fabrica/fabrica-09.jpg', alt: 'Viviendas familiares' },
    { id: 37, category: 'fabrica', src: '/images/fabrica/fabrica-10.jpg', alt: 'Características termo-acústicas' },
    { id: 38, category: 'fabrica', src: '/images/fabrica/fabrica-11.jpg', alt: 'Diseños personalizados' },
    { id: 39, category: 'fabrica', src: '/images/fabrica/fabrica-12.jpg', alt: 'Área de producción completa' },
    { id: 40, category: 'fabrica', src: '/images/fabrica/fabrica-13.jpg', alt: 'Módulos para industria petrolera' },
    { id: 41, category: 'fabrica', src: '/images/fabrica/fabrica-14.jpg', alt: 'Construcción modular avanzada' },
    { id: 42, category: 'fabrica', src: '/images/fabrica/fabrica-15.jpg', alt: 'Instalaciones de manufactura' },
    { id: 43, category: 'fabrica', src: '/images/fabrica/fabrica-16.jpg', alt: 'Procesos de fabricación' },
    { id: 44, category: 'fabrica', src: '/images/fabrica/fabrica-17.jpg', alt: 'Control de calidad' },
    { id: 45, category: 'fabrica', src: '/images/fabrica/fabrica-18.jpg', alt: 'Acabados especializados' },
    { id: 46, category: 'fabrica', src: '/images/fabrica/fabrica-19.jpg', alt: 'Sistemas constructivos' },
    { id: 47, category: 'fabrica', src: '/images/fabrica/fabrica-20.jpg', alt: 'Tecnología de construcción' },
    { id: 48, category: 'fabrica', src: '/images/fabrica/fabrica-21.jpg', alt: 'Productos terminados' },
    { id: 49, category: 'fabrica', src: '/images/fabrica/fabrica-22.jpg', alt: 'Área de almacenamiento' },
    { id: 50, category: 'fabrica', src: '/images/fabrica/fabrica-23.jpg', alt: 'Logística de productos' },
    { id: 51, category: 'fabrica', src: '/images/fabrica/fabrica-24.jpg', alt: 'Entrega de proyectos' },
    { id: 52, category: 'fabrica', src: '/images/fabrica/fabrica-25.jpg', alt: 'Instalación final' }
  ];

  const filteredImages = activeFilter === 'todas' ? images : images.filter(img => img.category === activeFilter);

  return (
    <section className="py-15 bg-background">
      <div className="container mx-auto px-20 max-w-4xl">
        <div>
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{ color: '#333333' }}>GALERÍA DE </span>
            <span style={{ color: '#d25840' }}>IMÁGENES</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {filters.map(filter => (
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
          {filteredImages.map(image => (
            <div key={image.id} className="group relative overflow-hidden aspect-square">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                loading="lazy"
              />
              <div className="mt-2">
                <p className="text-body font-normal text-foreground">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-body text-foreground">No hay imágenes disponibles para esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;