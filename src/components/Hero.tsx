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
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="mb-6 flex justify-center">
          <img 
            src="/lovable-uploads/f4475002-d314-4a46-bb95-54b87d2d6b5c.png" 
            alt="Codelco S.A." 
            className="h-20 md:h-24 w-auto"
          />
        </div>
        
        <p className="text-xl md:text-2xl mb-2 font-light opacity-90">
          Una empresa regional
        </p>
        
        <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto opacity-80 leading-relaxed">
          Nuestro objetivo es proveerles a nuestros clientes un servicio integral, desde el asesoramiento inicial hasta la entrega final. Para ello, contamos con una planta de 3500m2, totalmente dedicada y equipada a la realización de nuestros productos y todo el personal necesario específicamente para cada sector.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-strong transition-all duration-300 text-lg px-8 py-6"
          >
            Nuestros Servicios
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            className="text-lg px-8 py-6"
          >
            Contactanos
          </Button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;