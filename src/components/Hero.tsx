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
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            CODELCO S.A.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-2 font-light opacity-90">
          SERVICIOS INDUSTRIALES
        </p>
        
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-80">
          Soluciones integrales en servicios industriales, productos especializados y rental de equipos para el sector industrial en Argentina.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-strong transition-all duration-300 text-lg px-8 py-6"
          >
            Conoce Nuestros Servicios
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-8 py-6"
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