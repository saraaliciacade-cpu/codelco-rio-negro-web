import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
const Hero = () => {
  const heroImages = [
    '/images/hero/portada1.jpg',
    '/images/hero/portada2.jpg', 
    '/images/hero/portada3.jpg'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 4500); // Cambia cada 4.5 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <picture key={index}>
            <source srcSet={image.replace('.jpg', '.webp')} type="image/webp" />
            <img
              src={image}
              alt={`Industrial facility ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
              decoding={index === 0 ? "sync" : "async"}
              width="1920"
              height="1080"
            />
          </picture>
        ))}
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-20 max-w-4xl text-center text-white">
        <div className="mb-6 flex justify-center">
          <img 
            src="/lovable-uploads/f4475002-d314-4a46-bb95-54b87d2d6b5c.png" 
            alt="Codelco S.A." 
            className="h-24 w-auto object-contain"
            width="250"
            height="93"
            style={{ aspectRatio: '250/93' }}
          />
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