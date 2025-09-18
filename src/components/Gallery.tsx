import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filters = [
    { id: 'todas', label: 'Todas' },
    { id: 'fabrica', label: 'Fábrica' },
    { id: 'metalurgica', label: 'Metalúrgica' },
    { id: 'rental', label: 'Rental' }
  ];

  // Gallery images with direct paths
  const images = [
    // Metalúrgica category images (19 images)
    { id: 1, category: 'metalurgica', src: '/metalurgica-01.jpg', alt: 'Piletas de ensayo y acumulación' },
    { id: 2, category: 'metalurgica', src: '/metalurgica-02.jpg', alt: 'Choke manifolds y líneas de alta' },
    { id: 3, category: 'metalurgica', src: '/metalurgica-08.jpg', alt: 'Equipos metalúrgicos industriales' },
    { id: 4, category: 'metalurgica', src: '/metalurgica-09.jpg', alt: 'Transporte de estructuras prefabricadas' },
    { id: 5, category: 'metalurgica', src: '/metalurgica-10.jpg', alt: 'Tanque de acumulación naranja sobre skid' },
    { id: 6, category: 'metalurgica', src: '/metalurgica-11.jpg', alt: 'Tanques cilíndricos en proceso de fabricación' },
    { id: 7, category: 'metalurgica', src: '/metalurgica-12.jpg', alt: 'Estructuras azules para equipos industriales' },
    { id: 8, category: 'metalurgica', src: '/metalurgica-13.jpg', alt: 'Contenedores tipo volquete amarillos' },
    { id: 9, category: 'metalurgica', src: '/metalurgica-14.jpg', alt: 'Equipos rojos especializados para petróleo' },
    { id: 10, category: 'metalurgica', src: '/metalurgica-15.jpg', alt: 'Mesa de corte y plegado de chapas' },
    { id: 11, category: 'metalurgica', src: '/metalurgica-16.jpg', alt: 'Trailer especializado para transporte' },
    { id: 12, category: 'metalurgica', src: '/metalurgica-17.jpg', alt: 'Contenedor azul para almacenamiento' },
    { id: 13, category: 'metalurgica', src: '/images/metalurgica/metalurgica-03.jpg', alt: 'Estructuras metálicas especializadas' },
    { id: 14, category: 'metalurgica', src: '/images/metalurgica/metalurgica-04.jpg', alt: 'Tanques de almacenamiento industrial' },
    { id: 15, category: 'metalurgica', src: '/images/metalurgica/metalurgica-05.jpg', alt: 'Equipos de procesamiento metalúrgico' },
    { id: 16, category: 'metalurgica', src: '/images/metalurgica/metalurgica-06.jpg', alt: 'Sistemas de tuberías industriales' },
    { id: 17, category: 'metalurgica', src: '/images/metalurgica/metalurgica-07.jpg', alt: 'Instalaciones de metalurgia avanzada' },
    { id: 18, category: 'metalurgica', src: '/images/metalurgica/metalurgica-18.jpg', alt: 'Equipos de fabricación metálica' },
    { id: 19, category: 'metalurgica', src: '/images/metalurgica/metalurgica-19.jpg', alt: 'Procesos de soldadura industrial' },

    // Rental category images (8 images)
    { id: 18, category: 'rental', src: '/rental-01.jpg', alt: 'Flota de vehículos Toyota Hilux en base operativa' },
    { id: 19, category: 'rental', src: '/rental-02.jpg', alt: 'Instalaciones de rental y equipos especializados' },
    { id: 20, category: 'rental', src: '/rental-03.jpg', alt: 'Módulos habitacionales para rental temporal' },
    { id: 21, category: 'rental', src: '/rental-04.jpg', alt: 'Flota de vehículos 4x4 equipados para trabajo' },
    { id: 22, category: 'rental', src: '/rental-05.jpg', alt: 'Trailers y contenedores móviles' },
    { id: 23, category: 'rental', src: '/rental-06.jpg', alt: 'Módulos de alojamiento temporal' },
    { id: 24, category: 'rental', src: '/rental-07.jpg', alt: 'Trailers especializados para campo petrolero' },
    { id: 25, category: 'rental', src: '/rental-08.jpg', alt: 'Equipos modulares para proyectos temporales' },

    // Fábrica category images (25 images)
    { id: 26, category: 'fabrica', src: '/images/fabrica/fabrica-01.jpg', alt: 'Instalaciones de fábrica' },
    { id: 27, category: 'fabrica', src: '/images/fabrica/fabrica-02.jpg', alt: 'Área de producción modular' },
    { id: 28, category: 'fabrica', src: '/images/fabrica/fabrica-03.jpg', alt: 'Módulos habitacionales' },
    { id: 29, category: 'fabrica', src: '/images/fabrica/fabrica-04.jpg', alt: 'Viviendas en construcción' },
    { id: 30, category: 'fabrica', src: '/images/fabrica/fabrica-05.jpg', alt: 'Línea de ensamblaje' },
    { id: 31, category: 'fabrica', src: '/images/fabrica/fabrica-06.jpg', alt: 'Oficina de ingeniería y diseño' },
    { id: 32, category: 'fabrica', src: '/images/fabrica/fabrica-07.jpg', alt: 'Construcción en seco' },
    { id: 33, category: 'fabrica', src: '/images/fabrica/fabrica-08.jpg', alt: 'Módulos comerciales' },
    { id: 34, category: 'fabrica', src: '/images/fabrica/fabrica-09.jpg', alt: 'Viviendas familiares' },
    { id: 35, category: 'fabrica', src: '/images/fabrica/fabrica-10.jpg', alt: 'Características termo-acústicas' },
    { id: 36, category: 'fabrica', src: '/images/fabrica/fabrica-11.jpg', alt: 'Diseños personalizados' },
    { id: 37, category: 'fabrica', src: '/images/fabrica/fabrica-12.jpg', alt: 'Área de producción completa' },
    { id: 38, category: 'fabrica', src: '/images/fabrica/fabrica-13.jpg', alt: 'Módulos para industria petrolera' },
    { id: 39, category: 'fabrica', src: '/images/fabrica/fabrica-14.jpg', alt: 'Construcción modular avanzada' },
    { id: 40, category: 'fabrica', src: '/images/fabrica/fabrica-15.jpg', alt: 'Instalaciones de manufactura' },
    { id: 41, category: 'fabrica', src: '/images/fabrica/fabrica-16.jpg', alt: 'Procesos de fabricación' },
    { id: 42, category: 'fabrica', src: '/images/fabrica/fabrica-17.jpg', alt: 'Control de calidad' },
    { id: 43, category: 'fabrica', src: '/images/fabrica/fabrica-18.jpg', alt: 'Acabados especializados' },
    { id: 44, category: 'fabrica', src: '/images/fabrica/fabrica-19.jpg', alt: 'Sistemas constructivos' },
    { id: 45, category: 'fabrica', src: '/images/fabrica/fabrica-20.jpg', alt: 'Tecnología de construcción' },
    { id: 46, category: 'fabrica', src: '/images/fabrica/fabrica-21.jpg', alt: 'Productos terminados' },
    { id: 47, category: 'fabrica', src: '/images/fabrica/fabrica-22.jpg', alt: 'Área de almacenamiento' },
    { id: 48, category: 'fabrica', src: '/images/fabrica/fabrica-23.jpg', alt: 'Logística de productos' },
    { id: 49, category: 'fabrica', src: '/images/fabrica/fabrica-24.jpg', alt: 'Entrega de proyectos' },
    { id: 50, category: 'fabrica', src: '/images/fabrica/fabrica-25.jpg', alt: 'Instalación final' }
  ];

  const filteredImages = activeFilter === 'todas' ? images : images.filter(img => img.category === activeFilter);

  const downloadImage = (imageSrc: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-15 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{ color: '#333333' }}>GALERÍA DE </span>
            <span style={{ color: '#d25840' }}>IMÁGENES</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <Button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 text-body font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-white text-primary border border-primary hover:bg-primary/10'
              }`}
            >
              {filter.label} ({filter.id === 'todas' ? images.length : images.filter(img => img.category === filter.id).length})
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full mx-auto">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="gallery-item group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button
                  onClick={() => downloadImage(selectedImage.src, `codelco-${selectedImage.category}-${selectedImage.id}.jpg`)}
                  className="bg-primary hover:bg-primary/90 text-white p-2"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setSelectedImage(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2"
                  size="sm"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg text-gray-800">{selectedImage.alt}</h3>
                <p className="text-sm text-gray-600 capitalize">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center mt-12 py-12">
            <p className="text-lg text-foreground">No hay imágenes disponibles para esta categoría.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;