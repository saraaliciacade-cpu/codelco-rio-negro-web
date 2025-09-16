import { Building2, Settings, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      id: 'fabrica',
      icon: Building2,
      title: 'FÁBRICA',
      subtitle: 'Unidad, Módulos, Habitaciones y viviendas',
      description: 'El sector de fabricación de módulos y viviendas esta preparado para cubrir todas las necesidades del cliente al momento de realizar su proyecto. Cuenta con una línea de producción completa, desde la oficina de ingeniería y diseño hasta las distintas áreas de producción que componen cada unidad, lo cual le proveerá asesoramiento competo en todas las etapas de construcción. Este sector produce todo tipo de módulos habitacionales ya sea con fines comerciales o de vivienda para las distintas industrias y además la modalidad de construcción "en seco" de viviendas familiares con las mejores características termo-acústicas disponibles en el mercado y la posibilidad de elegir el diseño a gusto del cliente.'
    },
    {
      id: 'metalurgica',
      icon: Settings,
      title: 'METALÚRGICA',
      subtitle: 'Equipos, Tanques, Subestructuras',
      description: 'La división Metalúrgica está orientada a la fabricación de equipos para la industria petrolera y afines y todo el asesoramiento necesario para su proyecto. Contamos con una amplia gama de productos, para cubrir todas sus necesidades: Piletas de acumulación para agua, lodo y petróleo sobre skid y auto-portantes. Contenedores tipo volquete. Estructuras y subestructuras especiales. Choke manifolds. Lineas de alta. Estructuras para decanter. Planchadas. Tanques sobre patín para almacenamiento. Plantas móviles de petróleo. Piletas de ensayo. Circuitos de lodo. Además contamos con servicio de corte y plegado de chapas, para trabajos en general'
    },
    {
      id: 'rental',
      icon: Truck,
      title: 'RENTAL',
      subtitle: 'Vehículos, Trailers, Plataformas',
      description: 'La división Rental está compuesta por los sectores "Flota Liviana" y "Trailers y Equipos". **Flota Liviana:** contamos actualmente con más de 60 unidades entre Toyota Hilux cabina doble y simple 4x2 y 4x4, VW Amarok y vehículos livianos. Todas estas unidades están equipadas según la necesidad de cada cliente, ya se para uso Gerencial, recorredores, porta herramientas, personal general, etc. **Trailers y Equipos:** en este sector se proveen equipos para alquileres temporarios: Piletas de acumulación. Trailers rodantes y sobre patín en 6, 9 y 12 metros, con configuraciones variadas del tipo "Company Man", comedor, habitación, cocina, laboratorio, etc. Contenedores tipo volquete.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-15 bg-white">
      <div className="container mx-auto px-20 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-h1 font-bold mb-5 text-gray-800">
            Nuestras Áreas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-full mx-auto px-6">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:border-orange-400 hover:-translate-y-1"
            >
              <div className="text-center mb-4">
                <h3 className="text-h2 font-bold mb-2 text-gray-800 uppercase tracking-wide">
                  {service.title}
                </h3>
                <h4 className="text-body font-semibold text-orange-400 mb-4">
                  {service.subtitle}
                </h4>
              </div>

              <div className="text-body leading-relaxed mb-6 text-gray-600 text-left">
                {service.description.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                )}
              </div>

              <div className="text-center">
                {service.id === 'fabrica' && (
                  <Button 
                    onClick={() => scrollToSection('contacto')}
                    className="bg-white text-red-600 border border-red-600 px-4 py-2 text-body hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    Contáctanos
                  </Button>
                )}
                {service.id === 'metalurgica' && (
                  <Button 
                    onClick={() => scrollToSection('ubicacion')}
                    className="bg-red-600 text-white px-4 py-2 text-body hover:bg-red-700 transition-all duration-300"
                  >
                    Nuestra Ubicación
                  </Button>
                )}
                {service.id === 'rental' && (
                  <Button 
                    onClick={() => scrollToSection('galeria')}
                    className="bg-white text-red-600 border border-red-600 px-4 py-2 text-body hover:bg-red-600 hover:text-white transition-all duration-300"
                  >
                    La Galería de Imágenes
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;