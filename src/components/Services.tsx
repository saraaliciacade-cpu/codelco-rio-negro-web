import { Building2, Settings, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Services = () => {
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
          }}>NUESTRAS </span>
            <span style={{
            color: '#d25840'
          }}>ÁREAS</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-6 lg:gap-6 max-w-full mx-auto px-2 sm:px-0">
          {services.map((service, index) => {
            // Inclinación sutil: primera arriba, segunda un poco más abajo, tercera un poco más abajo
            const getStaggerClass = (index: number) => {
              switch (index) {
                case 0: return 'lg:mt-0'; // Fábrica arriba
                case 1: return 'lg:mt-6'; // Metalúrgica ligeramente más abajo
                case 2: return 'lg:mt-12'; // Rental un poco más abajo
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
                {/* Header with colored background */}
                <div className="px-6 py-8 text-center" style={{
              backgroundColor: getHeaderColor(service.id)
            }}>
                  <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide font-ramabhadra">
                    {service.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-6 lg:p-4 xl:p-6">
                  <h4 className="text-lg font-bold text-gray-500 mb-4 text-center leading-relaxed font-montserrat transition-colors duration-300 group-hover:text-[#e65a29]">
                    {getSubtitleText(service.id)}
                  </h4>

                  {/* Línea separadora */}
                  <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>

                  <div className="text-sm leading-relaxed text-gray-600 text-center mb-8 font-nunito space-y-4">
                    {service.description.map((paragraph, index) => (
                      <p key={index}>
                        {paragraph.split('**').map((part, partIndex) => 
                          partIndex % 2 === 1 ? <strong key={partIndex} className="font-montserrat">{part}</strong> : part
                        )}
                      </p>
                    ))}
                  </div>

                  <div className="text-center">
                    {service.id === 'fabrica' && <Button onClick={() => scrollToSection('contacto')} className="border border-zinc-800 px-6 py-2 transition-all duration-300 text-sm text-slate-50 bg-zinc-800 hover:bg-zinc-700">
                        Contáctanos
                      </Button>}
                    {service.id === 'metalurgica' && <Button onClick={() => scrollToSection('ubicacion')} className="text-white px-6 py-2 text-sm transition-all duration-300 bg-orange-700 hover:bg-orange-600 rounded-lg">
                        Nuestra Ubicación
                      </Button>}
                    {service.id === 'rental' && <Button onClick={() => scrollToSection('galeria')} className="border border-zinc-800 px-6 py-2 text-sm transition-all duration-300 text-slate-50 bg-neutral-800 hover:bg-neutral-700">
                        La Galería de Imágenes
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