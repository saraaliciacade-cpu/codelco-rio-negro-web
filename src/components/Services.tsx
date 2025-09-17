import { Building2, Settings, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Services = () => {
  const services = [{
    id: 'fabrica',
    icon: Building2,
    title: 'FÁBRICA',
    subtitle: 'Unidad, Módulos, Habitaciones y viviendas',
    description: 'El sector de fabricación de módulos y viviendas esta preparado para cubrir todas las necesidades del cliente al momento de realizar su proyecto. Cuenta con una línea de producción completa, desde la oficina de ingeniería y diseño hasta las distintas áreas de producción que componen cada unidad, lo cual le proveerá asesoramiento competo en todas las etapas de construcción. Este sector produce todo tipo de módulos habitacionales ya sea con fines comerciales o de vivienda para las distintas industrias y además la modalidad de construcción "en seco" de viviendas familiares con las mejores características termo-acústicas disponibles en el mercado y la posibilidad de elegir el diseño a gusto del cliente.'
  }, {
    id: 'metalurgica',
    icon: Settings,
    title: 'METALÚRGICA',
    subtitle: 'Equipos, Tanques, Subestructuras',
    description: 'La división Metalúrgica está orientada a la fabricación de equipos para la industria petrolera y afines y todo el asesoramiento necesario para su proyecto. Contamos con una amplia gama de productos, para cubrir todas sus necesidades: Piletas de acumulación para agua, lodo y petróleo sobre skid y auto-portantes. Contenedores tipo volquete. Estructuras y subestructuras especiales. Choke manifolds. Lineas de alta. Estructuras para decanter. Planchadas. Tanques sobre patín para almacenamiento. Plantas móviles de petróleo. Piletas de ensayo. Circuitos de lodo. Además contamos con servicio de corte y plegado de chapas, para trabajos en general'
  }, {
    id: 'rental',
    icon: Truck,
    title: 'RENTAL',
    subtitle: 'Vehículos, Trailers, Plataformas',
    description: 'La división Rental está compuesta por los sectores "Flota Liviana" y "Trailers y Equipos". **Flota Liviana:** contamos actualmente con más de 60 unidades entre Toyota Hilux cabina doble y simple 4x2 y 4x4, VW Amarok y vehículos livianos. Todas estas unidades están equipadas según la necesidad de cada cliente, ya se para uso Gerencial, recorredores, porta herramientas, personal general, etc. **Trailers y Equipos:** en este sector se proveen equipos para alquileres temporarios: Piletas de acumulación. Trailers rodantes y sobre patín en 6, 9 y 12 metros, con configuraciones variadas del tipo "Company Man", comedor, habitación, cocina, laboratorio, etc. Contenedores tipo volquete.'
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
      <div className="container mx-auto px-20 max-w-6xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 max-w-full mx-auto">
          {services.map((service, index) => {
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
          return <div key={service.id} className="bg-white border border-gray-200 overflow-hidden">
                {/* Header with colored background */}
                <div className="px-6 py-8 text-center" style={{
              backgroundColor: getHeaderColor(service.id)
            }}>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide font-ramabhadra">
                    {service.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-500 mb-6 text-center leading-relaxed font-montserrat">
                    {getSubtitleText(service.id)}
                  </h4>

                  <div className="text-sm leading-relaxed text-gray-600 text-left mb-8 font-nunito">
                    {service.description.split('**').map((part, index) => index % 2 === 1 ? <strong key={index} className="font-montserrat">{part}</strong> : part)}
                  </div>

                  <div className="text-center">
                    {service.id === 'fabrica' && <Button onClick={() => scrollToSection('contacto')} className="border border-zinc-800 px-6 py-2 transition-all duration-300 text-sm text-slate-50 bg-zinc-800 hover:bg-zinc-700">
                        Contáctanos
                      </Button>}
                    {service.id === 'metalurgica' && <Button onClick={() => scrollToSection('ubicacion')} className="text-white px-6 py-2 text-sm transition-all duration-300 bg-orange-700 hover:bg-orange-600">
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