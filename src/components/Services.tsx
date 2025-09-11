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
    <section id="servicios" className="py-15 bg-background">
      <div className="container mx-auto px-20 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-h1 font-bold mb-5 text-foreground">
            Nuestras Áreas
          </h2>
        </div>

        <div className="space-y-10 max-w-full mx-auto px-6">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white p-2.5 my-10">
              <div className="text-center mb-4">
                <h3 className="text-h2 font-bold mb-2">
                  {service.title}
                </h3>
                <h4 className="text-body font-normal" style={{ color: '#FFAB40' }}>
                  {service.subtitle}
                </h4>
              </div>

              <p className="text-body leading-normal mb-4 text-center text-foreground">
                {service.description}
              </p>

              <div className="text-center">
                {service.id === 'fabrica' && (
                  <Button 
                    onClick={() => scrollToSection('contacto')}
                    className="bg-white text-primary border border-primary px-4 py-2 text-body"
                  >
                    Contáctanos
                  </Button>
                )}
                {service.id === 'metalurgica' && (
                  <Button 
                    onClick={() => scrollToSection('ubicacion')}
                    className="bg-primary text-white px-4 py-2 text-body"
                  >
                    Nuestra Ubicación
                  </Button>
                )}
                {service.id === 'rental' && (
                  <Button 
                    onClick={() => scrollToSection('galeria')}
                    className="bg-white text-primary border border-primary px-4 py-2 text-body"
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