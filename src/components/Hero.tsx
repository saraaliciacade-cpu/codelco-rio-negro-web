import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const BRAND_ORANGE = '#E84E1B';

const stats = [
  { label: '// ANTIGÜEDAD', value: '+14', desc: 'años en la industria' },
  { label: '// CAPACIDAD', value: '3.500', desc: 'm² de planta propia' },
  { label: '// FLOTA', value: '+60', desc: 'unidades Hilux y Amarok' },
  { label: '// CARTERA', value: '+30', desc: 'empresas activas del sector' },
];

const HERO_IMAGES = [
  {
    src: '/images/fabrica/fabrica-08.jpg',
    alt: 'Módulo habitacional Codelco siendo izado por grúa en planta de Cipolletti',
  },
  {
    src: '/metalurgica-05.jpg',
    alt: 'Soldadura de estructura metálica en planta Codelco — fabricación a medida',
  },
  {
    src: '/rental-01.jpg',
    alt: 'Flota de equipos de rental Codelco operando en Vaca Muerta',
  },
];

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Preload remaining hero images so transitions are instant
    HERO_IMAGES.slice(1).forEach((img) => {
      const i = new Image();
      i.src = img.src;
    });
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % HERO_IMAGES.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-black flex flex-col"
      style={{ minHeight: 'calc(100dvh - 57px)' }}
    >


      {/* Background carousel — cross-fade */}
      {HERO_IMAGES.map((img, idx) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: active === idx ? 1 : 0 }}
          aria-hidden={active === idx ? undefined : true}
        >
          <img
            src={img.src}
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover object-center blur-sm"
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding={idx === 0 ? 'sync' : 'async'}
            width={1920}
            height={1080}
            aria-hidden="true"
          />
          <img
            src={img.src}
            alt={img.alt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading={idx === 0 ? 'eager' : 'lazy'}
            decoding={idx === 0 ? 'sync' : 'async'}
            width={1920}
            height={1080}
          />
        </div>
      ))}


      {/* Gradient overlay 55% top -> 92% bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content - bottom-left aligned */}
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col justify-center">

          <div className="container mx-auto px-6 sm:px-10 lg:px-16 pb-3 sm:pb-4 pt-4 sm:pt-6">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span
                className="h-px w-10"
                style={{ backgroundColor: BRAND_ORANGE }}
                aria-hidden="true"
              />
              <span
                className="eyebrow text-[11px] sm:text-xs font-bold"
                style={{ color: BRAND_ORANGE }}
              >
                Cipolletti, Río Negro · Desde 2012
              </span>
            </div>

            {/* H1 */}
            <h1 className="heading text-white leading-[1.03] text-[30px] sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
              Módulos Habitacionales, Metalúrgica y{' '}
              <span style={{ color: BRAND_ORANGE }}>Rental</span>{' '}
              para la Industria Petrolera
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              Fabricamos en planta propia y alquilamos la flota que tu obra
              necesita. <span className="font-bold text-white">+14 años</span>{' '}
              resolviendo infraestructura para Vaca Muerta sin que la operación
              se detenga.
            </p>

            {/* CTAs */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection('servicios')}
                className="h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold rounded-none text-white border-0 hover:opacity-90 transition"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                Ver nuestros equipos →
              </Button>
              <Button
                onClick={() => scrollToSection('contacto')}
                variant="outline"
                className="h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold rounded-none bg-transparent text-white border border-white/70 hover:bg-white hover:text-black transition"
              >
                Solicitar presupuesto
              </Button>
            </div>
          </div>
        </div>
        </div>

        {/* Stats Bar - integrated into hero over the background image */}
        <div
          className="relative z-10 w-full flex-shrink-0"
          style={{ borderTop: `2px solid ${BRAND_ORANGE}`, backgroundColor: '#0a0a0a' }}
        >
          <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative">
            <div className="relative grid grid-cols-2 lg:grid-cols-4 items-stretch">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-6 sm:py-8 lg:py-10 px-4 sm:px-6 hover:bg-[#1A1A1A] transition-colors duration-300 flex flex-col justify-center ${
                    i > 0 ? 'lg:border-l lg:border-white/10' : ''
                  } ${i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''} ${
                    i % 2 === 1 ? 'border-l border-white/10 lg:border-l-0' : ''
                  }`}
                >
                  <p
                    className="eyebrow text-[10px] sm:text-xs mb-3"
                    style={{ color: BRAND_ORANGE }}
                  >
                    {s.label}
                  </p>
                  <p className="stat-number text-white leading-none text-3xl sm:text-4xl lg:text-[44px]">
                    {s.value}
                  </p>
                  <p className="mt-4 text-xs sm:text-sm text-white/75 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
