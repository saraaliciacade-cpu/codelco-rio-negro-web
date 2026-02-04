import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
const Company = () => {
  const { t } = useLanguage();
  useEffect(() => {
    const imageDiv = document.querySelector('.animate-slide-in-right');
    if (imageDiv) {
      imageDiv.classList.add('opacity-0');
      setTimeout(() => {
        if (imageDiv) imageDiv.classList.remove('opacity-0');
      }, 100);
    }
  }, []);
  return <section className="py-8 md:py-12 bg-background relative overflow-hidden">
      {/* Decorative background image */}
      <img 
        src="/images/company-bg.png" 
        alt="" 
        className="absolute left-0 top-0 opacity-90 hidden lg:block pointer-events-none w-72 h-auto"
      />
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="titulo-seccion font-ramabhadra inline-block text-2xl md:text-4xl">
            <span className="text-foreground">{t('company.title').split(' ')[0]} </span>
            <span className="text-primary">{t('company.title').split(' ')[1]}</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Company Text */}
          <div className="space-y-3 md:space-y-4 order-1 text-left mx-auto lg:mx-0 max-w-md px-2">
            <h3 className="font-bold text-foreground mb-3 md:mb-4 font-montserrat text-xl md:text-2xl lg:text-3xl">
              {t('company.subtitle')}
            </h3>
            <div className="space-y-3 md:space-y-4 text-foreground leading-relaxed font-nunito">
              <p className="text-sm md:text-base text-justify">
                {t('company.paragraph1')}
              </p>
              <p className="text-sm md:text-base text-justify">
                {t('company.paragraph2')}
              </p>
              <p className="text-sm md:text-base text-justify">
                {t('company.paragraph3')}
              </p>
            </div>
          </div>
          {/* Company Image */}
          <div className="order-2 animate-slide-in-right flex justify-center px-2">
            <div className="relative w-full max-w-sm md:max-w-lg">
              <img 
                src="/nuestra-empresa.jpg" 
                alt="Flota de vehículos Codelco" 
                className="w-full h-auto object-contain rounded-lg shadow-lg" 
                loading="lazy"
                width="284"
                height="285"
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 284px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Company;