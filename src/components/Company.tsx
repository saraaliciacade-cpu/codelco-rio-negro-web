import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
const Company = () => {
  const { t } = useLanguage();
  useEffect(() => {
    // Use requestAnimationFrame to prevent forced reflow
    requestAnimationFrame(() => {
      const imageDiv = document.querySelector('.animate-slide-in-right');
      if (imageDiv) {
        imageDiv.classList.add('opacity-0');
        requestAnimationFrame(() => {
          if (imageDiv) imageDiv.classList.remove('opacity-0');
        });
      }
    });
  }, []);
  return <section className="py-8 md:py-12 bg-background" style={{ contentVisibility: 'auto' }}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-6 md:mb-8">
          <h2 className="titulo-seccion font-ramabhadra inline-block text-2xl sm:text-3xl md:text-4xl"> {/* Responsive: más pequeño en móvil */}
            <span style={{
            color: '#333333'
          }}>{t('company.title').split(' ')[0]} </span>
            <span style={{
            color: '#d25840'
          }}>{t('company.title').split(' ')[1]}</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center max-w-5xl mx-auto"> {/* Gaps responsive */}
          {/* Company Text */}
          <div className="space-y-3 md:space-y-4 order-1 text-left px-2 sm:px-4 lg:px-8"> {/* Alineado a la izquierda en móvil, espacios optimizados */}
            <h3 className="font-bold text-foreground mb-3 md:mb-4 font-montserrat text-xl sm:text-2xl md:text-3xl"> {/* Texto responsive */}
              {t('company.subtitle')}
            </h3>
            <div className="space-y-3 md:space-y-4 text-foreground leading-relaxed text-body font-nunito">
              <p className="text-justify text-sm sm:text-base"> {/* Texto más legible en móvil */}
                {t('company.paragraph1')}
              </p>
              <p className="text-justify text-sm sm:text-base">
                {t('company.paragraph2')}
              </p>
              <p className="text-justify text-sm sm:text-base">
                {t('company.paragraph3')}
              </p>
            </div>
          </div>
          {/* Company Image */}
          <div className="order-2 animate-slide-in-right flex justify-center px-2 sm:px-4 lg:px-0">
            <div className="relative w-full max-w-sm lg:max-w-lg"> {/* Imagen más pequeña en móvil */}
              <picture>
                <source srcSet="/nuestra-empresa.webp" type="image/webp" />
                <img 
                  src="/nuestra-empresa.jpg" 
                  alt="Flota de vehículos Codelco" 
                  className="w-full h-auto object-contain rounded-lg shadow-lg" 
                  loading="lazy"
                  decoding="async"
                  width="284"
                  height="285"
                  sizes="(max-width: 640px) 90vw, (max-width: 768px) 85vw, (max-width: 1024px) 50vw, 284px"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Company;