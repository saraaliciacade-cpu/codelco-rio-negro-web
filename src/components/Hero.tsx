import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-industrial.jpg';
import heroImageWebP from '@/assets/hero-industrial.webp';
const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <section id="inicio" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - Optimized for LCP */}
      <picture>
        <source srcSet={heroImageWebP} type="image/webp" />
        <img 
          src={heroImage}
          alt="Industrial facility background"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          loading="eager"
          width="1344"
          height="752"
        />
      </picture>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-20 max-w-4xl text-center text-white">
        <div className="mb-6 flex justify-center">
          <img src="/lovable-uploads/f4475002-d314-4a46-bb95-54b87d2d6b5c.png" alt="Codelco S.A." className="h-24 w-auto" />
        </div>
        
        <h1 className="text-2xl font-bold mb-5 font-ramabhadra" style={{
        color: '#d25840'
      }}>
          UNA EMPRESA REGIONAL
        </h1>
        
        <p className="mb-8 max-w-full mx-auto leading-normal text-white font-nunito text-base">
          Nuestro objetivo es proveerles a nuestros clientes un servicio integral, desde el asesoramiento inicial hasta la entrega final. Para ello, contamos con una planta de 3500m2, totalmente dedicada y equipada a la realización de nuestros productos y todo el personal necesario específicamente para cada sector.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => scrollToSection('servicios')}
            className="bg-primary text-white px-4 py-2 text-body"
          >
            Nuestros Servicios
          </Button>
          <Button 
            onClick={() => scrollToSection('contacto')}
            className="px-4 py-2 text-body text-white" 
            style={{ backgroundColor: '#333333' }}
          >
            Contactanos
          </Button>
        </div>
      </div>
    </section>;
};
export default Hero;