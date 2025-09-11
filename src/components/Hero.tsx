import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-industrial.jpg';

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImage})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-20 max-w-4xl text-center text-white">
        <div className="mb-6 flex justify-center">
          <img 
            src="/lovable-uploads/f4475002-d314-4a46-bb95-54b87d2d6b5c.png" 
            alt="Codelco S.A." 
            className="h-16 w-auto"
          />
        </div>
        
        <h1 className="text-h1 font-bold mb-5 text-white">
          Una empresa regional
        </h1>
        
        <p className="text-body mb-8 max-w-full mx-auto leading-normal text-white">
          Nuestro objetivo es proveerles a nuestros clientes un servicio integral, desde el asesoramiento inicial hasta la entrega final. Para ello, contamos con una planta de 3500m2, totalmente dedicada y equipada a la realización de nuestros productos y todo el personal necesario específicamente para cada sector.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            className="bg-primary text-white px-4 py-2 text-body"
          >
            Nuestros Servicios
          </Button>
          <Button 
            className="bg-white text-primary px-4 py-2 text-body"
          >
            Contactanos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;