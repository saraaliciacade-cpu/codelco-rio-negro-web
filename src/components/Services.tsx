import { Building2, Settings, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
const Services = () => {
  const {
    t
  } = useLanguage();
  const services = [{
    id: 'fabrica',
    icon: Building2,
    title: 'FÁBRICA',
    subtitle: 'Unidad, Módulos, Habitaciones y viviendas',
    description: ['El sector de fabricación de módulos y viviendas esta preparado para cubrir todas las necesidades del cliente al momento de realizar su proyecto. Cuenta con una línea de producción completa, desde la oficina de ingeniería y diseño hasta las distintas áreas de producción que componen cada unidad, lo cual le proveerá asesoramiento competo en todas las etapas de construcción.', 'Este sector produce todo tipo de módulos habitacionales ya sea con fines comerciales o de vivienda para las distintas industrias y además la modalidad de construcción "en seco" de viviendas familiares con las mejores características termo-acústicas disponibles en el mercado y la posibilidad de elegir el diseño a gusto del cliente.'],
    images: ['/images/services/fabrica-01.jpg', '/images/services/fabrica-02.jpg', '/images/services/fabrica-03.jpg', '/images/services/fabrica-04.jpg', '/images/services/fabrica-05.jpg']
  }, {
    id: 'metalurgica',
    icon: Settings,
    title: 'METALÚRGICA',
    subtitle: 'Equipos, Tanques, Subestructuras',
    description: ['La división Metalúrgica está orientada a la fabricación de equipos para la industria petrolera y afines y todo el asesoramiento necesario para su proyecto.', 'Contamos con una amplia gama de productos, para cubrir todas sus necesidades:', 'Piletas de acumulación para agua, lodo y petróleo sobre skid y auto-portantes. Contenedores tipo volquete. Estructuras y subestructuras especiales. Choke manifolds. Lineas de alta. Estructuras para decanter. Planchadas. Tanques sobre patín para almacenamiento. Plantas móviles de petróleo. Piletas de ensayo. Circuitos de lodo. Además contamos con servicio de corte y plegado de chapas, para trabajos en general'],
    images: ['/images/services/metalurgica-01.jpg', '/images/services/metalurgica-02.jpg']
  }, {
    id: 'rental',
    icon: Truck,
    title: 'RENTAL',
    subtitle: 'Vehículos, Trailers, Plataformas',
    description: ['La división Rental está compuesta por los sectores "Flota Liviana" y "Trailers y Equipos".', '**Flota Liviana:** contamos actualmente con más de 60 unidades entre Toyota Hilux cabina doble y simple 4x2 y 4x4, VW Amarok y vehículos livianos. Todas estas unidades están equipadas según la necesidad de cada cliente, ya se para uso Gerencial, recorredores, porta herramientas, personal general, etc.', '**Trailers y Equipos:** en este sector se proveen equipos para alquileres temporarios: Piletas de acumulación. Trailers rodantes y sobre patín en 6, 9 y 12 metros, con configuraciones variadas del tipo "Company Man", comedor, habitación, cocina, laboratorio, etc. Contenedores tipo volquete.'],
    images: ['/images/services/rental-01.jpg', '/images/services/rental-02.jpg', '/images/services/rental-03.jpg']
  }, {
    id: 'generators',
    icon: Zap,
    title: 'GRUPOS ELECTRÓGENOS',
    subtitle: 'Alquiler y Mantenimiento',
    description: ['Codelco S.A. ofrece servicios de alquiler y mantenimiento de grupos electrógenos industriales, garantizando energía confiable en todo momento.', 'Contamos con **equipos de 55 a 180 kVA**, ideales para obras, instalaciones temporales y respaldo eléctrico en operaciones críticas.', 'Nuestro servicio incluye la instalación, monitoreo y mantenimiento preventivo, asegurando un rendimiento óptimo y disponibilidad continua para nuestros clientes.'],
    isNew: true,
    image: '/generadores.png'
  }];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="servicios" className="py-8 md:py-12 lg:py-15 bg-white">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 max-w-6xl">
        <div>
          <h2 className="titulo-seccion font-ramabhadra text-2xl md:text-4xl">
            <span className="text-foreground">{t('services.title').split(' ')[0]} </span>
            <span className="text-primary">{t('services.title').split(' ')[1]}</span>
          </h2>
        </div>

        {/* Nueva sección de Novedad */}
        <div className="mb-8 md:mb-12">
          <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
            {/* Tarjeta unificada con las dos secciones */}
            <div className="bg-white border border-border shadow-lg hover:shadow-xl transition-shadow duration-300 flex-1 overflow-hidden">
              {/* Header que ocupa todo el ancho */}
              <div className="bg-primary text-white px-6 py-4">
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-center font-ramabhadra">
                  TRAILERS AUTOPORTANTES Y EQUIPOS SOBRE VIGA
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Trailers Autoportantes */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-ramabhadra">Trailers Autoportantes</h3>
                  <p className="text-sm mb-4 font-nunito text-card-foreground">
                    Construidos con estructuras de acero de alta resistencia, soportan el peso total del módulo sin apoyos externos.
                  </p>
                  <h4 className="text-sm font-bold text-primary mb-2 font-montserrat">Características:</h4>
                  <ul className="text-sm text-foreground space-y-2 font-nunito">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Estructura robusta y segura</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Listos para traslado inmediato</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Oficinas, módulos operativos y habitacionales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Configuración adaptable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Uso industrial, petrolero y de obra</span>
                    </li>
                  </ul>
                </div>

                {/* Equipos sobre Viga */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3 font-ramabhadra">Equipos sobre Viga</h3>
                  <p className="text-sm mb-4 font-nunito text-secondary-foreground">
                    Sistemas sobre vigas de acero para estabilidad y eficiencia en aplicaciones industriales de alta exigencia.
                  </p>
                  <h4 className="text-sm font-bold text-primary mb-2 font-montserrat">Ventajas:</h4>
                  <ul className="text-sm text-foreground space-y-2 font-nunito">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Mayor estabilidad estructural</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Soporta cargas pesadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Instalación modular y rápida</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Flexibilidad para obras temporales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Optimiza tiempos y costos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

            {/* Carousel de imágenes */}
            <div className="lg:w-96 flex-shrink-0">
              <NovedadCarousel />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-4 md:gap-6 max-w-full mx-auto">
          {services.map((service, index) => {
          // Inclinación sutil: primera arriba, segunda un poco más abajo, tercera un poco más abajo, cuarta aún más abajo
          const getStaggerClass = (index: number) => {
            switch (index) {
              case 0:
                return 'lg:mt-0';
              // Fábrica arriba
              case 1:
                return 'lg:mt-8';
              // Metalúrgica ligeramente más abajo
              case 2:
                return 'lg:mt-16';
              // Rental un poco más abajo
              case 3:
                return 'lg:mt-24';
              // Generadores aún más abajo
              default:
                return '';
            }
          };
          const getHeaderColor = (id: string) => {
            switch (id) {
              case 'fabrica':
                return '#333333';
              case 'metalurgica':
                return '#d25840';
              case 'rental':
                return '#333333';
              case 'generators':
                return '#d25840';
              default:
                return '#333333';
            }
          };
          const getSubtitleText = (id: string) => {
            switch (id) {
              case 'fabrica':
                return 'Unidad Módulos Habitacionales y Vivienda';
              case 'metalurgica':
                return 'Corte y Plegado';
              case 'rental':
                return 'Alquiler de vehículos livianos, piletas de almacenamiento y contenedores';
              default:
                return service.subtitle;
            }
          };
          return <div key={service.id} className={`bg-white border border-border overflow-hidden transition-all duration-300 ease-in-out md:hover:scale-105 hover:shadow-xl hover:shadow-black/10 hover:z-10 relative group lg:w-80 lg:flex-shrink-0 ${getStaggerClass(index)}`}>
                {/* NEW Badge */}
                {service.isNew && <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                    <Badge className="bg-neutral-800 text-white hover:bg-neutral-700 rounded-full px-2 py-0.5 md:px-3 md:py-1 text-xs font-bold shadow-lg">
                      {t('services.generators.badge')}
                    </Badge>
                  </div>}
                
                {/* Header with colored background */}
                <div className={`px-4 py-6 md:px-6 md:py-8 text-center ${service.id === 'fabrica' || service.id === 'rental' ? 'bg-stone-600' : 'bg-primary'}`}>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white uppercase tracking-wide font-ramabhadra">
                    {service.id === 'fabrica' ? t('services.factory.title') : service.id === 'metalurgica' ? t('services.metallurgical.title') : service.id === 'rental' ? t('services.rental.title') : t('services.generators.title')}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <h4 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-4 text-center leading-relaxed font-montserrat transition-colors duration-300 group-hover:text-primary">
                    {service.id === 'fabrica' ? t('services.factory.subtitle') : service.id === 'metalurgica' ? t('services.metallurgical.subtitle') : service.id === 'rental' ? t('services.rental.subtitle') : t('services.generators.subtitle')}
                  </h4>

                  {/* Línea separadora */}
                  <div className="w-16 md:w-24 h-0.5 bg-border mx-auto mb-4 md:mb-6 rounded-full"></div>

                  <div className="text-xs md:text-sm leading-relaxed text-foreground font-medium text-center mb-6 md:mb-8 font-nunito space-y-3 md:space-y-4">
                    {service.id === 'fabrica' && <>
                        <p>{t('services.factory.description1')}</p>
                        <p>{t('services.factory.description2')}</p>
                      </>}
                    {service.id === 'metalurgica' && <>
                        <p>{t('services.metallurgical.description1')}</p>
                        <p>{t('services.metallurgical.description2')}</p>
                        <p>{t('services.metallurgical.description3')}</p>
                      </>}
                    {service.id === 'rental' && <>
                        <p>{t('services.rental.description1')}</p>
                        <p>
                          {t('services.rental.description2').split('**').map((part, partIndex) => partIndex % 2 === 1 ? <strong key={partIndex} className="font-montserrat">{part}</strong> : part)}
                        </p>
                        <p>
                          {t('services.rental.description3').split('**').map((part, partIndex) => partIndex % 2 === 1 ? <strong key={partIndex} className="font-montserrat">{part}</strong> : part)}
                        </p>
                      </>}
                    {service.id === 'generators' && <>
                        <p>{t('services.generators.description1')}</p>
                        <p>
                          {t('services.generators.description2').split('**').map((part, partIndex) => partIndex % 2 === 1 ? <strong key={partIndex} className="font-montserrat font-black">{part}</strong> : part)}
                        </p>
                        <p>{t('services.generators.description3')}</p>
                        {service.image && <div className="mt-4 md:mt-6">
                            <img src={service.image} alt="Grupos Electrógenos - Codelco" className="w-full h-auto rounded-lg shadow-md" loading="lazy" />
                          </div>}
                      </>}
                    
                    {/* Carousel de imágenes para Fábrica, Metalúrgica y Rental */}
                    {(service.id === 'fabrica' || service.id === 'metalurgica' || service.id === 'rental') && service.images && <ImageCarousel images={service.images} serviceId={service.id} />}
                  </div>

                  <div className="text-center">
                    {service.id === 'fabrica' && <Button onClick={() => scrollToSection('contacto')} className="border border-foreground px-4 md:px-6 py-2 transition-all duration-300 text-xs md:text-sm text-primary-foreground bg-foreground hover:bg-foreground/90">
                        {t('services.factory.button')}
                      </Button>}
                    {service.id === 'metalurgica' && <Button onClick={() => scrollToSection('map')} className="text-primary-foreground px-4 md:px-6 py-2 text-xs md:text-sm transition-all duration-300 bg-primary hover:bg-primary/90 rounded-lg">
                        {t('services.metallurgical.button')}
                      </Button>}
                    {service.id === 'rental' && <Button onClick={() => scrollToSection('galeria')} className="border border-foreground px-4 md:px-6 py-2 text-xs md:text-sm transition-all duration-300 text-primary-foreground bg-foreground hover:bg-foreground/90">
                        {t('services.rental.button')}
                      </Button>}
                    {service.id === 'generators' && <Button onClick={() => scrollToSection('map')} className="text-primary-foreground px-4 md:px-6 py-2 text-xs md:text-sm transition-all duration-300 bg-primary hover:bg-primary/90 rounded-lg">
                        {t('services.generators.button')}
                      </Button>}
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};

// Componente de Carousel para las imágenes
const ImageCarousel = ({
  images,
  serviceId
}: {
  images: string[];
  serviceId: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);
  return <div className="mt-4 md:mt-6 relative overflow-hidden rounded-lg shadow-md">
      <div className="relative aspect-video">
        {images.map((image, index) => <img key={index} src={image} alt={`${serviceId} - imagen ${index + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} loading="lazy" />)}
      </div>
    </div>;
};

// Componente de Carousel para Novedad
const NovedadCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/images/novedad/novedad-01.jpg',
    '/images/novedad/novedad-02.jpg',
    '/images/novedad/novedad-03.jpg',
    '/images/novedad/novedad-04.jpg',
    '/images/novedad/novedad-05.jpg'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg h-full min-h-[300px]">
      {/* Badge NUEVO dentro del carousel, arriba a la derecha */}
      <Badge className="absolute top-3 right-3 z-10 bg-primary text-white font-semibold px-3 py-1 text-xs shadow-lg">
        NOVEDADES
      </Badge>
      <div className="relative h-full">
        {images.map((image, index) => (
          <img 
            key={index} 
            src={image} 
            alt={`Novedad - imagen ${index + 1}`} 
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`} 
            loading="lazy" 
          />
        ))}
      </div>
    </div>
  );
};
export default Services;