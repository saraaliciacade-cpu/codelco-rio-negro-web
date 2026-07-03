import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const BRAND_ORANGE = '#E84E1B';

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
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(680px, 90vh, 880px)' }}
    >
      {/* Background carousel — cross-fade */}
      {HERO_IMAGES.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: active === idx ? 1 : 0 }}
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding={idx === 0 ? 'sync' : 'async'}
          width={1920}
          height={1080}
          aria-hidden={active === idx ? undefined : true}
        />
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
      <div className="relative z-10 flex flex-col justify-end h-full min-h-[inherit]" style={{ minHeight: 'clamp(680px, 90vh, 880px)' }}>
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24 pt-28">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
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
            <h1 className="heading text-white leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
              Módulos Habitacionales, Metalúrgica y{' '}
              <span style={{ color: BRAND_ORANGE }}>Rental</span>{' '}
              para la Industria Petrolera
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              Fabricamos en planta propia y alquilamos la flota que tu obra
              necesita. <span className="font-bold text-white">+14 años</span>{' '}
              resolviendo infraestructura para Vaca Muerta sin que la operación
              se detenga.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection('servicios')}
                className="h-12 px-7 text-sm sm:text-base font-semibold rounded-none text-white border-0 hover:opacity-90 transition"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                Ver nuestros equipos →
              </Button>
              <Button
                onClick={() => scrollToSection('contacto')}
                variant="outline"
                className="h-12 px-7 text-sm sm:text-base font-semibold rounded-none bg-transparent text-white border border-white/70 hover:bg-white hover:text-black transition"
              >
                Solicitar presupuesto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
