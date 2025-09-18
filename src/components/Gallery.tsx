import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download } from 'lucide-react';
const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedImage, setSelectedImage] = useState<any>(null);
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

  // Gallery images - manually uploaded photos
  const images = [
  // Metalúrgica category images (18 images total)
  {
    id: 1,
    category: 'metalurgica',
    src: '/metalurgica-01.jpg',
    alt: 'Contenedores especializados Epersa'
  }, {
    id: 2,
    category: 'metalurgica',
    src: '/metalurgica-02.jpg',
    alt: 'Tanques cilíndricos especializados'
  }, {
    id: 3,
    category: 'metalurgica',
    src: '/metalurgica-03.jpg',
    alt: 'Cisterna móvil con equipamiento naranja'
  }, {
    id: 4,
    category: 'metalurgica',
    src: '/metalurgica-04.jpg',
    alt: 'Sistemas de tuberías industriales complejas'
  }, {
    id: 5,
    category: 'metalurgica',
    src: '/metalurgica-05.jpg',
    alt: 'Módulo industrial móvil especializado'
  }, {
    id: 6,
    category: 'metalurgica',
    src: '/metalurgica-06.jpg',
    alt: 'Plataforma móvil con escaleras de acceso'
  }, {
    id: 7,
    category: 'metalurgica',
    src: '/metalurgica-07.jpg',
    alt: 'Estación de soldadura móvil completa'
  }, {
    id: 8,
    category: 'metalurgica',
    src: '/metalurgica-08.jpg',
    alt: 'Equipos metalúrgicos industriales'
  }, {
    id: 9,
    category: 'metalurgica',
    src: '/metalurgica-09.jpg',
    alt: 'Transporte de estructuras prefabricadas'
  }, {
    id: 10,
    category: 'metalurgica',
    src: '/metalurgica-10.jpg',
    alt: 'Tanque de acumulación naranja sobre skid'
  }, {
    id: 11,
    category: 'metalurgica',
    src: '/metalurgica-11.jpg',
    alt: 'Tanques cilíndricos en proceso de fabricación'
  }, {
    id: 12,
    category: 'metalurgica',
    src: '/metalurgica-12.jpg',
    alt: 'Estructuras azules para equipos industriales'
  }, {
    id: 13,
    category: 'metalurgica',
    src: '/metalurgica-13.jpg',
    alt: 'Contenedores tipo volquete amarillos'
  }, {
    id: 14,
    category: 'metalurgica',
    src: '/metalurgica-14.jpg',
    alt: 'Equipos rojos especializados para petróleo'
  }, {
    id: 15,
    category: 'metalurgica',
    src: '/metalurgica-15.jpg',
    alt: 'Mesa de corte y plegado de chapas'
  }, {
    id: 16,
    category: 'metalurgica',
    src: '/metalurgica-16.jpg',
    alt: 'Trailer especializado para transporte'
  }, {
    id: 17,
    category: 'metalurgica',
    src: '/metalurgica-17.jpg',
    alt: 'Contenedor azul para almacenamiento'
  }, {
    id: 18,
    category: 'metalurgica',
    src: '/metalurgica-18.jpg',
    alt: 'Grúa móvil en operación de instalación'
  }, {
    id: 19,
    category: 'metalurgica',
    src: '/metalurgica-19.jpg',
    alt: 'Operación de elevación con grúas especializadas'
  }, {
    id: 20,
    category: 'metalurgica',
    src: '/metalurgica-20.jpg',
    alt: 'Módulos transportables con escaleras metálicas'
  },
  // Rental category images (8 images)
  {
    id: 21,
    category: 'rental',
    src: '/rental-01.jpg',
    alt: 'Flota de vehículos Toyota Hilux en base operativa'
  }, {
    id: 22,
    category: 'rental',
    src: '/rental-02.jpg',
    alt: 'Instalaciones de rental y equipos especializados'
  }, {
    id: 23,
    category: 'rental',
    src: '/rental-03.jpg',
    alt: 'Módulos habitacionales para rental temporal'
  }, {
    id: 24,
    category: 'rental',
    src: '/rental-04.jpg',
    alt: 'Flota de vehículos 4x4 equipados para trabajo'
  }, {
    id: 25,
    category: 'rental',
    src: '/rental-05.jpg',
    alt: 'Trailers y contenedores móviles'
  }, {
    id: 26,
    category: 'rental',
    src: '/rental-06.jpg',
    alt: 'Módulos de alojamiento temporal'
  }, {
    id: 27,
    category: 'rental',
    src: '/rental-07.jpg',
    alt: 'Trailers especializados para campo petrolero'
  }, {
    id: 28,
    category: 'rental',
    src: '/rental-08.jpg',
    alt: 'Equipos modulares para proyectos temporales'
  },
  // Fábrica category images (24 images)
  {
    id: 29,
    category: 'fabrica',
    src: '/fabrica-01.jpg',
    alt: 'Oficina móvil de control ambiental'
  }, {
    id: 30,
    category: 'fabrica',
    src: '/fabrica-02.jpg',
    alt: 'Módulo industrial especializado'
  }, {
    id: 31,
    category: 'fabrica',
    src: '/fabrica-03.jpg',
    alt: 'Planta de fabricación modular interior'
  }, {
    id: 32,
    category: 'fabrica',
    src: '/fabrica-04.jpg',
    alt: 'Nave industrial con línea de producción'
  }, {
    id: 33,
    category: 'fabrica',
    src: '/fabrica-05.jpg',
    alt: 'Estructura modular en construcción'
  }, {
    id: 34,
    category: 'fabrica',
    src: '/fabrica-06.jpg',
    alt: 'Unidad de emergencias médicas transportable'
  }, {
    id: 35,
    category: 'fabrica',
    src: '/fabrica-07.jpg',
    alt: 'Módulo industrial compacto transportable'
  }, {
    id: 36,
    category: 'fabrica',
    src: '/fabrica-08.jpg',
    alt: 'Proceso de ensamblaje de paneles'
  }, {
    id: 37,
    category: 'fabrica',
    src: '/fabrica-09.jpg',
    alt: 'Interior de módulo de laboratorio equipado'
  }, {
    id: 38,
    category: 'fabrica',
    src: '/fabrica-10.jpg',
    alt: 'Comedor modular con equipamiento completo'
  }, {
    id: 39,
    category: 'fabrica',
    src: '/fabrica-11.jpg',
    alt: 'Sala de capacitación modular equipada'
  }, {
    id: 40,
    category: 'fabrica',
    src: '/fabrica-12.jpg',
    alt: 'Centro de control con ventanas panorámicas'
  }, {
    id: 41,
    category: 'fabrica',
    src: '/fabrica-13.jpg',
    alt: 'Módulo sanitario completo con urinarios'
  }, {
    id: 42,
    category: 'fabrica',
    src: '/fabrica-14.jpg',
    alt: 'Estación de revisión técnica móvil'
  }, {
    id: 43,
    category: 'fabrica',
    src: '/fabrica-15.jpg',
    alt: 'Unidad móvil de revisión técnica RTO'
  }, {
    id: 44,
    category: 'fabrica',
    src: '/fabrica-16.jpg',
    alt: 'Estación de elevación para vehículos'
  }, {
    id: 45,
    category: 'fabrica',
    src: '/fabrica-17.jpg',
    alt: 'Módulo habitacional con ventana panorámica'
  }, {
    id: 46,
    category: 'fabrica',
    src: '/fabrica-18.jpg',
    alt: 'Cocina modular completamente equipada'
  }, {
    id: 47,
    category: 'fabrica',
    src: '/fabrica-19.jpg',
    alt: 'Baños modulares con lavamanos múltiples'
  }, {
    id: 48,
    category: 'fabrica',
    src: '/fabrica-20.jpg',
    alt: 'Kitchenette compacta con electrodomésticos'
  }, {
    id: 49,
    category: 'fabrica',
    src: '/fabrica-21.jpg',
    alt: 'Módulos temporales en terreno nevado con bandera argentina'
  }, {
    id: 50,
    category: 'fabrica',
    src: '/fabrica-22.jpg',
    alt: 'Oficina modular con estaciones de trabajo rojas'
  }, {
    id: 51,
    category: 'fabrica',
    src: '/fabrica-23.jpg',
    alt: 'Módulo en construcción con estructura metálica'
  }, {
    id: 52,
    category: 'fabrica',
    src: '/fabrica-24.jpg',
    alt: 'Vista aérea de instalación modular en operación'
  }];
  const filteredImages = activeFilter === 'todas' ? images : images.filter(img => img.category === activeFilter);
  const downloadImage = (imageSrc: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return <section className="py-15 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => <Button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-6 py-3 text-body font-medium transition-all duration-300 ${activeFilter === filter.id ? 'bg-primary text-white shadow-lg transform scale-105' : 'bg-white text-primary border border-primary hover:bg-primary/10'}`}>
              {filter.label} ({filter.id === 'todas' ? images.length : images.filter(img => img.category === filter.id).length})
            </Button>)}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full mx-auto">
          {filteredImages.map(image => <div key={image.id} className="gallery-item group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setSelectedImage(image)}>
              <div className="aspect-square overflow-hidden">
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-sm text-gray-800">{image.alt}</h3>
              </div>
            </div>)}
        </div>

        {/* Image Modal */}
        {selectedImage && <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden animate-scale-in transform transition-all duration-300" onClick={(e) => e.stopPropagation()}>
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button onClick={() => downloadImage(selectedImage.src, `codelco-${selectedImage.category}-${selectedImage.id}.jpg`)} className="bg-primary hover:bg-primary/90 text-white p-2 transition-colors duration-200" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button onClick={() => setSelectedImage(null)} className="bg-gray-500 hover:bg-gray-600 text-white p-2 transition-colors duration-200" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <img src={selectedImage.src} alt={selectedImage.alt} className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-300" />
              <div className="p-4 bg-white text-center">
                <h3 className="font-semibold text-lg text-gray-800">{selectedImage.alt}</h3>
                <p className="text-sm text-gray-600 capitalize">{selectedImage.category}</p>
              </div>
            </div>
          </div>}

        {filteredImages.length === 0 && <div className="text-center mt-12 py-12">
            <p className="text-lg text-foreground">No hay imágenes disponibles para esta categoría.</p>
          </div>}
      </div>
    </section>;
};
export default Gallery;