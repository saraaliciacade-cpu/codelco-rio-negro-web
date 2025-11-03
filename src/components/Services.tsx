import { Building2, Settings, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
const Services = () => {
  const { t } = useLanguage();
  
  const services = [{
    id: 'fabrica',
    icon: Building2,
    title: 'FÁBRICA',
    subtitle: 'Unidad, Módulos, Habitaciones y viviendas',
    description: [
      'El sector de fabricación de módulos y viviendas esta preparado para cubrir todas las necesidades del cliente al momento de realizar su proyecto. Cuenta con una línea de producción completa, desde la oficina de ingeniería y diseño hasta las distintas áreas de producción que componen cada unidad, lo cual le proveerá asesoramiento competo en todas las etapas de construcción.',
      'Este sector produce todo tipo de módulos habitacionales ya sea con fines comerciales o de vivienda para las distintas industrias y además la modalidad de construcción "en seco" de viviendas familiares con las mejores características termo-acústicas disponibles en el mercado y la posibilidad de elegir el diseño a gusto del cliente.'
    ]
  }, {
    id: 'metalurgica',
    icon: Settings,
    title: 'METALÚRGICA',
    subtitle: 'Equipos, Tanques, Subestructuras',
    description: [
      'La división Metalúrgica está orientada a la fabricación de equipos para la industria petrolera y afines y todo el asesoramiento necesario para su proyecto.',
      'Contamos con una amplia gama de productos, para cubrir todas sus necesidades:',
      'Piletas de acumulación para agua, lodo y petróleo sobre skid y auto-portantes. Contenedores tipo volquete. Estructuras y subestructuras especiales. Choke manifolds. Lineas de alta. Estructuras para decanter. Planchadas. Tanques sobre patín para almacenamiento. Plantas móviles de petróleo. Piletas de ensayo. Circuitos de lodo. Además contamos con servicio de corte y plegado de chapas, para trabajos en general'
    ]
  }, {
    id: 'rental',
    icon: Truck,
    title: 'RENTAL',
    subtitle: 'Vehículos, Trailers, Plataformas',
    description: [
      'La división Rental está compuesta por los sectores "Flota Liviana" y "Trailers y Equipos".',
      '**Flota Liviana:** contamos actualmente con más de 60 unidades entre Toyota Hilux cabina doble y simple 4x2 y 4x4, VW Amarok y vehículos livianos. Todas estas unidades están equipadas según la necesidad de cada cliente, ya se para uso Gerencial, recorredores, porta herramientas, personal general, etc.',
      '**Trailers y Equipos:** en este sector se proveen equipos para alquileres temporarios: Piletas de acumulación. Trailers rodantes y sobre patín en 6, 9 y 12 metros, con configuraciones variadas del tipo "Company Man", comedor, habitación, cocina, laboratorio, etc. Contenedores tipo volquete.'
    ]
  }, {
    id: 'generators',
    icon: Zap,
    title: 'GRUPOS ELECTRÓGENOS',
    subtitle: 'Alquiler y Mantenimiento',
    description: [
      'Codelco S.A. ofrece servicios de alquiler y mantenimiento de grupos electrógenos industriales, garantizando energía confiable en todo momento.',
      'Contamos con **equipos de 55 a 180 kVA**, ideales para obras, instalaciones temporales y respaldo eléctrico en operaciones críticas.',
      'Nuestro servicio incluye la instalación, monitoreo y mantenimiento preventivo, asegurando un rendimiento óptimo y disponibilidad continua para nuestros clientes.'
    ],
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
  return <section id="servicios" className="py-15 bg-white">
      <div className="container mx-auto px-4 sm:px-20 max-w-6xl">
        <div>
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{
            color: '#333333'
          }}>{t('services.title').split(' ')[0]} </span>
            <span style={{
            color: '#d25840'
          }}>{t('services.title').split(' ')[1]}</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-6 lg:gap-6 max-w-full mx-auto px-2 sm:px-0">
          {services.map((service, index) => {
            // Inclinación sutil: primera arriba, segunda un poco más abajo, tercera un poco más abajo, cuarta aún más abajo
            const getStaggerClass = (index: number) => {
              switch (index) {
                case 0: return 'lg:mt-0'; // Fábrica arriba
                case 1: return 'lg:mt-8'; // Metalúrgica ligeramente más abajo
                case 2: return 'lg:mt-16'; // Rental un poco más abajo
                case 3: return 'lg:mt-24'; // Generadores aún más abajo
                default: return '';
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
          return <div key={service.id} className={`bg-white border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-black/20 hover:z-10 relative group min-h-[600px] sm:min-h-[500px] lg:w-80 lg:flex-shrink-0 ${getStaggerClass(index)}`}>
                {/* NEW Badge */}
                {service.isNew && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-neutral-800 text-white hover:bg-neutral-700 rounded-full px-3 py-1 text-xs font-bold shadow-lg">
                      {t('services.generators.badge')}
                    </Badge>
                  </div>
                )}
                
                {/* Header with colored background */}
                <div className="px-6 py-8 text-center" style={{
              backgroundColor: getHeaderColor(service.id)
            }}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide font-ramabhadra">
                    {service.id === 'fabrica' ? t('services.factory.title') : 
                     service.id === 'metalurgica' ? t('services.metallurgical.title') : 
                     service.id === 'rental' ? t('services.rental.title') :
                     t('services.generators.title')}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-6 lg:p-4 xl:p-6">
                  <h4 className="text-lg font-bold text-gray-500 mb-4 text-center leading-relaxed font-montserrat transition-colors duration-300 group-hover:text-[#e65a29]">
                    {service.id === 'fabrica' ? t('services.factory.subtitle') : 
                     service.id === 'metalurgica' ? t('services.metallurgical.subtitle') : 
                     service.id === 'rental' ? t('services.rental.subtitle') :
                     t('services.generators.subtitle')}
                  </h4>

                  {/* Línea separadora */}
                  <div className="w-24 h-0.5 bg-gray-300 mx-auto mb-6 rounded-full"></div>

                  <div className="text-sm leading-relaxed text-gray-600 text-center mb-8 font-nunito space-y-4">
                    {service.id === 'fabrica' && (
                      <>
                        <p>{t('services.factory.description1')}</p>
                        <p>{t('services.factory.description2')}</p>
                      </>
                    )}
                    {service.id === 'metalurgica' && (
                      <>
                        <p>{t('services.metallurgical.description1')}</p>
                        <p>{t('services.metallurgical.description2')}</p>
                        <p>{t('services.metallurgical.description3')}</p>
                      </>
                    )}
                    {service.id === 'rental' && (
                      <>
                        <p>{t('services.rental.description1')}</p>
                        <p>
                          {t('services.rental.description2').split('**').map((part, partIndex) => 
                            partIndex % 2 === 1 ? <strong key={partIndex} className="font-montserrat">{part}</strong> : part
                          )}
                        </p>
                        <p>
                          {t('services.rental.description3').split('**').map((part, partIndex) => 
                            partIndex % 2 === 1 ? <strong key={partIndex} className="font-montserrat">{part}</strong> : part
                          )}
                        </p>
                      </>
                    )}
                    {service.id === 'generators' && (
                      <>
                        <p>{t('services.generators.description1')}</p>
                        <p>
                          {t('services.generators.description2').split('**').map((part, partIndex) => 
                            partIndex % 2 === 1 ? <strong key={partIndex} className="font-montserrat font-black">{part}</strong> : part
                          )}
                        </p>
                        <p>{t('services.generators.description3')}</p>
                        {service.image && (
                          <div className="mt-6">
                            <img 
                              src={service.image} 
                              alt="Grupos Electrógenos - Codelco" 
                              className="w-full h-auto rounded-lg shadow-md"
                              width="1248"
                              height="832"
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="text-center">
                    {service.id === 'fabrica' && <Button onClick={() => scrollToSection('contacto')} className="border border-zinc-800 px-6 py-2 transition-all duration-300 text-sm text-slate-50 bg-zinc-800 hover:bg-zinc-700">
                        {t('services.factory.button')}
                      </Button>}
                    {service.id === 'metalurgica' && <Button onClick={() => scrollToSection('map')} className="text-white px-6 py-2 text-sm transition-all duration-300 bg-orange-700 hover:bg-orange-600 rounded-lg">
                        {t('services.metallurgical.button')}
                      </Button>}
                    {service.id === 'rental' && <Button onClick={() => scrollToSection('galeria')} className="border border-zinc-800 px-6 py-2 text-sm transition-all duration-300 text-slate-50 bg-neutral-800 hover:bg-neutral-700">
                        {t('services.rental.button')}
                      </Button>}
                    {service.id === 'generators' && <Button onClick={() => scrollToSection('map')} className="text-white px-6 py-2 text-sm transition-all duration-300 bg-orange-700 hover:bg-orange-600 rounded-lg">
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
export default Services;