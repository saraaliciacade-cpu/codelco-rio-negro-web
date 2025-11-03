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
  return <section className="py-12 bg-background">
      <div className="container mx-auto px-8">
        <div className="text-center mb-8">
          <h2 className="titulo-seccion font-ramabhadra inline-block text-4xl"> {/* Aumentado text-4xl para título más grande */}
            <span style={{
            color: '#333333'
          }}>{t('company.title').split(' ')[0]} </span>
            <span style={{
            color: '#d25840'
          }}>{t('company.title').split(' ')[1]}</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto px-8"> {/* Aumentado gap-6 a gap-12 para más espacio en el medio */}
          {/* Company Text */}
          <div className="space-y-4 order-1 text-center lg:text-left max-w-md">
            <h3 className="font-bold text-foreground mb-4 font-montserrat text-3xl"> {/* Aumentado text-xl a text-2xl */}
              {t('company.subtitle')}
            </h3>
            <div className="space-y-4 text-foreground leading-normal text-body font-nunito">
              <p className="text-justify text-sm"> {/* Aumentado text-xs a text-base para texto más grande */}
                {t('company.paragraph1')}
              </p>
              <p className="text-justify text-sm">
                {t('company.paragraph2')}
              </p>
              <p className="text-justify text-sm">
                {t('company.paragraph3')}
              </p>
            </div>
          </div>
          {/* Company Image */}
          <div className="order-2 animate-slide-in-right flex justify-center">
            <div className="relative w-full max-w-lg">
              <picture>
                <source srcSet="/nuestra-empresa.webp" type="image/webp" />
                <img 
                  src="/nuestra-empresa.jpg" 
                  alt="Flota de vehículos Codelco" 
                  className="w-full h-auto object-contain rounded-lg shadow-lg" 
                  loading="lazy"
                  width="284"
                  height="285"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 284px"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Company;