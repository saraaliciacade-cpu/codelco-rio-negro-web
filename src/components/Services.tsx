import { Building2, Settings, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      id: 'fabrica',
      icon: Building2,
      title: 'FÁBRICA',
      subtitle: 'Unidad, Módulos, Habitaciones y viviendas',
      description: 'Nuestra división se especializa en la fabricación de módulos habitacionales y de vivienda, diseñados para satisfacer las necesidades del sector petrolero y afines en la región de Vaca Muerta. Contamos con una planta industrial de 3500 m² equipada para el diseño, producción y montaje de soluciones modulares que incluyen desde viviendas temporales hasta estructuras comerciales e industriales. Nuestro enfoque integral abarca desde el asesoramiento inicial con ingeniería personalizada hasta la entrega final en sitio, garantizando eficiencia y adaptabilidad a las demandas del cliente. Entre nuestras ofertas destacan módulos para alojamiento de personal, oficinas móviles y espacios de trabajo, todos construidos con materiales de alta durabilidad y estándares de seguridad certificados, ideales para entornos remotos y exigentes como los de Cipolletti y Río Negro.'
    },
    {
      id: 'metalurgica',
      icon: Settings,
      title: 'METALÚRGICA',
      subtitle: 'Equipos, Tanques, Subestructuras',
      description: 'Nuestra división está orientada a la fabricación de equipos especializados para la industria petrolera, gasífera y el sector afín, proporcionando soluciones robustas y personalizadas para optimizar operaciones en el campo. Ofrecemos una amplia gama de productos, incluyendo tanques de acumulación para agua, lodo y petróleo sobre skid, autotanques, contenedores tipo volquete, estructuras y subestructuras especiales, así como chutes manifolds para líneas de alta presión. Además, realizamos servicios de corte y plegado de chapas para trabajos en general, extracciones subterráneas y plantas móviles de petróleo. Nuestros desarrollos innovadores, como decanters para control de sólidos y verificaciones técnicas móviles, reducen la dependencia de importaciones y mejoran la eficiencia operativa, todo respaldado por un equipo de expertos en Cipolletti que asegura calidad y cumplimiento normativo para proyectos en Río Negro y Patagonia.'
    },
    {
      id: 'rental',
      icon: Truck,
      title: 'RENTAL',
      subtitle: 'Vehículos, Trailers, Plataformas',
      description: 'Nuestro servicio se enfoca en el alquiler de vehículos livianos, plataformas y trailers equipados, ofreciendo flotas flexibles para el mantenimiento y operaciones en el sector petrolero. Nuestra división está compuesta por sectores como "Flota Liviana", "Trailers y Equipos" y "Flota Pesada", donde proporcionamos camionetas Toyota Hilux cabina doble y simple 4x4 y 4x2, vehículos livianos 4x4 para uso general, y trailers rodantes sobre patín en 9 y 12 metros. Estos equipos están configurados para contenedores, con manifolds, comedores, laboratorios, camiones y contenedores tipo volquete, adaptados a necesidades específicas como recorridos, port Herramientas, personal general y más. Con un compromiso en la disponibilidad y mantenimiento preventivo, aseguramos soluciones rentables y seguras para clientes en Cipolletti, Río Negro, facilitando la movilidad y logística en entornos desafiantes de la industria energética.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-8 max-w-8xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Nuestras Áreas
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
            Soluciones integrales para la industria petrolera y energética
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-8xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="group bg-card border rounded-xl p-8 hover:shadow-soft transition-all duration-300 hover:scale-[1.02] flex flex-col min-h-[600px]"
            >
              {/* Icon */}
              <div className="bg-gradient-primary p-6 rounded-xl flex-shrink-0 mb-8 self-center">
                <service.icon className="h-16 w-16 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6 text-center">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <h4 className="text-xl font-semibold text-primary mb-6">
                    {service.subtitle}
                  </h4>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-base">
                  {service.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 pt-6 mt-auto">
                  {service.id === 'fabrica' && (
                    <Button 
                      onClick={() => scrollToSection('contacto')}
                      className="bg-white text-primary px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full text-lg font-semibold"
                    >
                      Contáctanos
                    </Button>
                  )}
                  {service.id === 'metalurgica' && (
                    <Button 
                      onClick={() => scrollToSection('ubicacion')}
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full text-lg"
                    >
                      Nuestra Ubicación
                    </Button>
                  )}
                  {service.id === 'rental' && (
                    <Button 
                      onClick={() => scrollToSection('galeria')}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg transition-all duration-300 w-full text-lg"
                    >
                      La Galería de Imágenes
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;