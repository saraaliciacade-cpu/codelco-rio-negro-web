import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Download, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Gallery = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('todas');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(24);
  const filters = [{
    id: 'todas',
    label: t('gallery.filter.all')
  }, {
    id: 'fabrica',
    label: t('gallery.filter.factory')
  }, {
    id: 'metalurgica',
    label: t('gallery.filter.metallurgical')
  }, {
    id: 'rental',
    label: t('gallery.filter.rental')
  }];

  // Gallery images - manually uploaded photos
  const images = [
  // NEW Fábrica images and video (FIRST 4)
  {
    id: 1000,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-29.mp4',
    alt: 'Video de proceso de fabricación en planta industrial (Crexell)',
    isNew: true,
    isVideo: true
  }, {
    id: 999,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-26.jpg',
    alt: 'Interior terminado con piso de madera y luces LED (Crexell)',
    isNew: true
  }, {
    id: 998,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-27.jpg',
    alt: 'Instalación eléctrica profesional con equipamiento Siemens (Crexell)',
    isNew: true
  }, {
    id: 997,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-28.jpg',
    alt: 'Proceso de montaje de módulos en nuestra planta industrial (Crexell)',
    isNew: true
  }, {
    id: 996,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-30.jpg',
    alt: 'Interior modular con entrepiso y cocina integrada - Módulo habitacional completo',
    isNew: true
  }, {
    id: 995,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-31.jpg',
    alt: 'Módulo transportable blanco terminado - Vista exterior con entrada',
    isNew: true
  }, {
    id: 994,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-32.jpg',
    alt: 'Izaje de módulo prefabricado con grúa - Montaje industrial',
    isNew: true
  }, {
    id: 993,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-33.jpg',
    alt: 'Módulo habitacional exterior con escalera de acceso - Listo para transporte',
    isNew: true
  }, {
    id: 992,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-34.jpg',
    alt: 'Interior moderno con grandes ventanales y terraza - Módulo premium',
    isNew: true
  }, {
    id: 991,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-35.jpg',
    alt: 'Render 3D de módulo habitacional con revestimiento exterior moderno',
    isNew: true
  }, {
    id: 990,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-36.jpg',
    alt: 'Dormitorio con vista panorámica - Interior de módulo de vivienda',
    isNew: true
  }, {
    id: 989,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-37.jpg',
    alt: 'Unidad móvil para servicios con generador eléctrico incorporado',
    isNew: true
  }, {
    id: 988,
    category: 'fabrica',
    src: '/images/fabrica/fabrica-38.jpg',
    alt: 'Estructura metálica en proceso de construcción - Sistema Steel Frame',
    isNew: true
  },
  // Metalúrgica category images (18 images total)
  {
    id: 1,
    category: 'metalurgica',
    src: '/metalurgica-01.jpg',
    alt: t('images.metalurgica.01')
  }, {
    id: 2,
    category: 'metalurgica',
    src: '/metalurgica-02.jpg',
    alt: t('images.metalurgica.02')
  }, {
    id: 3,
    category: 'metalurgica',
    src: '/metalurgica-03.jpg',
    alt: t('images.metalurgica.03')
  }, {
    id: 4,
    category: 'metalurgica',
    src: '/metalurgica-04.jpg',
    alt: t('images.metalurgica.04')
  }, {
    id: 5,
    category: 'metalurgica',
    src: '/metalurgica-05.jpg',
    alt: t('images.metalurgica.05')
  }, {
    id: 6,
    category: 'metalurgica',
    src: '/metalurgica-06.jpg',
    alt: t('images.metalurgica.06')
  }, {
    id: 7,
    category: 'metalurgica',
    src: '/metalurgica-07.jpg',
    alt: t('images.metalurgica.07')
  }, {
    id: 8,
    category: 'metalurgica',
    src: '/metalurgica-08.jpg',
    alt: t('images.metalurgica.08')
  }, {
    id: 9,
    category: 'metalurgica',
    src: '/metalurgica-09.jpg',
    alt: t('images.metalurgica.09')
  }, {
    id: 10,
    category: 'metalurgica',
    src: '/metalurgica-10.jpg',
    alt: t('images.metalurgica.10')
  }, {
    id: 11,
    category: 'metalurgica',
    src: '/metalurgica-11.jpg',
    alt: t('images.metalurgica.11')
  }, {
    id: 12,
    category: 'metalurgica',
    src: '/metalurgica-12.jpg',
    alt: t('images.metalurgica.12')
  }, {
    id: 13,
    category: 'metalurgica',
    src: '/metalurgica-13.jpg',
    alt: t('images.metalurgica.13')
  }, {
    id: 14,
    category: 'metalurgica',
    src: '/metalurgica-14.jpg',
    alt: t('images.metalurgica.14')
  }, {
    id: 15,
    category: 'metalurgica',
    src: '/metalurgica-15.jpg',
    alt: t('images.metalurgica.15')
  }, {
    id: 16,
    category: 'metalurgica',
    src: '/metalurgica-16.jpg',
    alt: t('images.metalurgica.16')
  }, {
    id: 17,
    category: 'metalurgica',
    src: '/metalurgica-17.jpg',
    alt: t('images.metalurgica.17')
  }, {
    id: 18,
    category: 'metalurgica',
    src: '/metalurgica-18.jpg',
    alt: t('images.metalurgica.18')
  }, {
    id: 19,
    category: 'metalurgica',
    src: '/metalurgica-19.jpg',
    alt: t('images.metalurgica.19')
  }, {
    id: 20,
    category: 'metalurgica',
    src: '/metalurgica-20.jpg',
    alt: t('images.metalurgica.20')
  },
  // Rental category images (8 images)
  {
    id: 21,
    category: 'rental',
    src: '/rental-01.jpg',
    alt: t('images.rental.01')
  }, {
    id: 22,
    category: 'rental',
    src: '/rental-02.jpg',
    alt: t('images.rental.02')
  }, {
    id: 23,
    category: 'rental',
    src: '/rental-03.jpg',
    alt: t('images.rental.03')
  }, {
    id: 24,
    category: 'rental',
    src: '/rental-04.jpg',
    alt: t('images.rental.04')
  }, {
    id: 25,
    category: 'rental',
    src: '/rental-05.jpg',
    alt: t('images.rental.05')
  }, {
    id: 26,
    category: 'rental',
    src: '/rental-06.jpg',
    alt: t('images.rental.06')
  }, {
    id: 27,
    category: 'rental',
    src: '/rental-07.jpg',
    alt: t('images.rental.07')
  }, {
    id: 28,
    category: 'rental',
    src: '/rental-08.jpg',
    alt: t('images.rental.08')
  },
  // Fábrica category images (24 images)
  {
    id: 29,
    category: 'fabrica',
    src: '/fabrica-01.jpg',
    alt: t('images.fabrica.01')
  }, {
    id: 30,
    category: 'fabrica',
    src: '/fabrica-02.jpg',
    alt: t('images.fabrica.02')
  }, {
    id: 31,
    category: 'fabrica',
    src: '/fabrica-03.jpg',
    alt: t('images.fabrica.03')
  }, {
    id: 32,
    category: 'fabrica',
    src: '/fabrica-04.jpg',
    alt: t('images.fabrica.04')
  }, {
    id: 33,
    category: 'fabrica',
    src: '/fabrica-05.jpg',
    alt: t('images.fabrica.05')
  }, {
    id: 34,
    category: 'fabrica',
    src: '/fabrica-06.jpg',
    alt: t('images.fabrica.06')
  }, {
    id: 35,
    category: 'fabrica',
    src: '/fabrica-07.jpg',
    alt: t('images.fabrica.07')
  }, {
    id: 36,
    category: 'fabrica',
    src: '/fabrica-08.jpg',
    alt: t('images.fabrica.08')
  }, {
    id: 37,
    category: 'fabrica',
    src: '/fabrica-09.jpg',
    alt: t('images.fabrica.09')
  }, {
    id: 38,
    category: 'fabrica',
    src: '/fabrica-10.jpg',
    alt: t('images.fabrica.10')
  }, {
    id: 39,
    category: 'fabrica',
    src: '/fabrica-11.jpg',
    alt: t('images.fabrica.11')
  }, {
    id: 40,
    category: 'fabrica',
    src: '/fabrica-12.jpg',
    alt: t('images.fabrica.12')
  }, {
    id: 41,
    category: 'fabrica',
    src: '/fabrica-13.jpg',
    alt: t('images.fabrica.13')
  }, {
    id: 42,
    category: 'fabrica',
    src: '/fabrica-14.jpg',
    alt: t('images.fabrica.14')
  }, {
    id: 43,
    category: 'fabrica',
    src: '/fabrica-15.jpg',
    alt: t('images.fabrica.15')
  }, {
    id: 44,
    category: 'fabrica',
    src: '/fabrica-16.jpg',
    alt: t('images.fabrica.16')
  }, {
    id: 45,
    category: 'fabrica',
    src: '/fabrica-17.jpg',
    alt: t('images.fabrica.17')
  }, {
    id: 46,
    category: 'fabrica',
    src: '/fabrica-18.jpg',
    alt: t('images.fabrica.18')
  }, {
    id: 47,
    category: 'fabrica',
    src: '/fabrica-19.jpg',
    alt: t('images.fabrica.19')
  }, {
    id: 48,
    category: 'fabrica',
    src: '/fabrica-20.jpg',
    alt: t('images.fabrica.20')
  }, {
    id: 49,
    category: 'fabrica',
    src: '/fabrica-21.jpg',
    alt: t('images.fabrica.21')
  }, {
    id: 50,
    category: 'fabrica',
    src: '/fabrica-22.jpg',
    alt: t('images.fabrica.22')
  }, {
    id: 51,
    category: 'fabrica',
    src: '/fabrica-23.jpg',
    alt: t('images.fabrica.23')
  }, {
    id: 52,
    category: 'fabrica',
    src: '/fabrica-24.jpg',
    alt: t('images.fabrica.24')
  }];
  const filteredImages = activeFilter === 'todas' ? images : images.filter(img => img.category === activeFilter);
  const displayedImages = activeFilter === 'todas' ? filteredImages.slice(0, visibleCount) : filteredImages;
  const hasMoreImages = activeFilter === 'todas' && visibleCount < filteredImages.length;

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 24);
  };
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
          }}>{t('gallery.title').split(' ')[0]} {t('gallery.title').split(' ')[1]} </span>
            <span style={{
            color: '#d25840'
          }}>{t('gallery.title').split(' ')[2]}</span>
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => <Button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-6 py-3 text-body font-medium transition-all duration-300 ${activeFilter === filter.id ? 'bg-primary text-white shadow-lg transform scale-105' : 'bg-white text-primary border border-primary hover:bg-primary/10'}`}>
              {filter.label} ({filter.id === 'todas' ? images.length : images.filter(img => img.category === filter.id).length})
            </Button>)}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 max-w-full mx-auto">
          {displayedImages.map(image => <div key={image.id} className="gallery-item group relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => setSelectedImage(image)}>
              {(image as any).isNew && (
                <Badge className="absolute top-2 right-2 z-10 bg-primary text-white font-semibold px-2 py-1 text-xs shadow-lg">
                  NUEVO
                </Badge>
              )}
              <div className="aspect-square overflow-hidden relative">
                {(image as any).isVideo ? (
                  <>
                    <video 
                      src={image.src} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      muted
                      loop
                      playsInline
                      onError={(e) => {
                        console.warn('Video failed to load:', image.src);
                        (e.target as HTMLVideoElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 group-hover:bg-black/30">
                      <div className="bg-white/90 rounded-full p-4 shadow-lg">
                        <Play className="w-8 h-8 text-primary fill-primary" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    loading="lazy"
                    width="507"
                    height="380"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                )}
              </div>
              <div className="p-4 text-center">
                <h3 className="font-bold text-sm text-foreground">{image.alt}</h3>
              </div>
            </div>)}
        </div>

        {/* Show More Button */}
        {hasMoreImages && (
          <div className="text-center mt-8">
            <div 
              onClick={handleShowMore}
              className="inline-block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 p-6 border border-gray-200"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  +
                </div>
                <p className="text-primary font-semibold">
                  {t('gallery.showMore')} ({filteredImages.length - visibleCount} {t('gallery.remaining')})
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden animate-scale-in transform transition-all duration-300" onClick={e => e.stopPropagation()}>
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <Button onClick={() => downloadImage(selectedImage.src, `codelco-${selectedImage.category}-${selectedImage.id}.jpg`)} className="bg-primary hover:bg-primary/90 text-white p-2 transition-colors duration-200" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button onClick={() => setSelectedImage(null)} className="bg-gray-500 hover:bg-gray-600 text-white p-2 transition-colors duration-200" size="sm">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {selectedImage.isVideo ? (
                <video 
                  src={selectedImage.src} 
                  className="w-full h-auto max-h-[80vh] object-contain"
                  controls
                  autoPlay
                  loop
                  playsInline
                  onError={(e) => {
                    console.warn('Video failed to load in modal:', selectedImage.src);
                  }}
                />
              ) : (
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="w-full h-auto max-h-[80vh] object-contain transition-transform duration-300"
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              )}
              <div className="p-4 bg-white text-center">
                <h3 className="font-bold text-lg text-foreground">{selectedImage.alt}</h3>
                <p className="text-sm text-orange-700">{t(`category.${selectedImage.category}`)}</p>
              </div>
            </div>
          </div>}

        {filteredImages.length === 0 && <div className="text-center mt-12 py-12">
            <p className="text-lg text-foreground">{t('gallery.noImages')}</p>
          </div>}
      </div>
    </section>;
};
export default Gallery;
