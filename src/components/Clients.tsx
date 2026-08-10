import LogoCarousel from './LogoCarousel';
import { useLanguage } from '@/contexts/LanguageContext';

const copy = {
  es: {
    eyebrow: 'PRUEBA SOCIAL',
    heading: (
      <>
        <span className="text-[#e65b2a]">+30 empresas</span> del sector petrolero <span className="text-[#e65b2a]">confían en nosotros</span>
      </>
    ),
    subtitle: 'Operadoras, contratistas y empresas de servicios trabajan con Codelco en Vaca Muerta y toda la Patagonia.',
    closing: (
      <>
        Construimos relaciones basadas en confianza acompañando a cada cliente{" "}
        <span className="text-[#e65b2a]">¿Tu empresa será la próxima?</span>
      </>
    ),
  },
  en: {
    eyebrow: 'SOCIAL PROOF',
    heading: (
      <>
        <span className="text-[#e65b2a]">+30 companies</span> in the oil sector <span className="text-[#e65b2a]">trust us</span>
      </>
    ),
    subtitle: 'Operators, contractors and service companies work with Codelco in Vaca Muerta and throughout Patagonia.',
    closing: (
      <>
        We build relationships based on trust, accompanying every client{" "}
        <span className="text-[#e65b2a]">Will your company be next?</span>
      </>
    ),
  },
} as const;

const Clients = () => {
  const { language } = useLanguage();
  const c = copy[language];
  return (
    <section id="clientes" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center mb-10 md:mb-14">
        <p className="eyebrow text-xs md:text-sm text-[#E84E1B] mb-4 font-bold">
          {c.eyebrow}
        </p>
        <h2 className="heading text-3xl md:text-5xl text-[#1A1A1A] leading-tight mb-4">
          {c.heading}
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          {c.subtitle}
        </p>
      </div>

      <LogoCarousel />

      <div className="max-w-5xl mx-auto px-4 text-center mt-10 md:mt-14">
        <h3 className="heading text-xl md:text-3xl text-[#1A1A1A] leading-tight">
          {c.closing}
        </h3>
      </div>

    </section>
  );
};

export default Clients;
