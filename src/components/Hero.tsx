import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
const Hero = () => {
  const {
    t
  } = useLanguage();
  const heroImages = ['/images/hero/portada1.jpg', '/images/hero/portada2.jpg', '/images/hero/portada3.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
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
        {heroImages.map((image, index) => <img key={index} src={image} alt={`Industrial facility ${index + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} fetchPriority={index === 0 ? "high" : "low"} loading={index === 0 ? "eager" : "lazy"} decoding={index === 0 ? "sync" : "async"} width="1920" height="1080" />)}
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-20 max-w-4xl text-center text-white">
        <div className="mb-6 flex justify-center">
          <img src="/lovable-uploads/f4475002-d314-4a46-bb95-54b87d2d6b5c.png" alt="Codelco S.A." className="h-16 sm:h-24 w-auto object-contain" />
        </div>
        
        <h1 className="text-2xl font-bold mb-5 font-ramabhadra" style={{
        color: '#d25840'
      }}>
          {t('hero.title')}
        </h1>
        
        <p className="mb-8 max-w-full mx-auto leading-normal font-nunito text-base text-white text-center">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button onClick={() => scrollToSection('servicios')} className="bg-primary text-white px-4 py-2 text-body">
            {t('hero.button.services')}
          </Button>
          <Button onClick={() => scrollToSection('contacto')} className="px-4 py-2 text-body text-white" style={{
          backgroundColor: '#333333'
        }}>
            {t('hero.button.contact')}
          </Button>
        </div>
      </div>
    </section>;
};
export default Hero;