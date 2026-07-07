import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import heroVideo from '@/assets/hero-codelco.mp4.asset.json';
import heroPoster from '@/assets/hero-codelco-poster.jpg.asset.json';

const BRAND_ORANGE = '#E84E1B';

const stats = [
  { label: '// ANTIGÜEDAD', value: '+14', desc: 'años en la industria' },
  { label: '// CAPACIDAD', value: '3.500', desc: 'm² de planta propia' },
  { label: '// FLOTA', value: '+60', desc: 'unidades Hilux y Amarok' },
  { label: '// CARTERA', value: '+30', desc: 'empresas activas del sector' },
];

const scrollToSection = (sectionId: string) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 767px)').matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Defer video load so the poster paints instantly.
    // On mobile (narrow screens or coarse pointer) wait longer / until idle
    // to avoid competing with critical resources on slow connections.
    const isMobileDevice =
      window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;

    const load = () => setVideoSrc(heroVideo.url);

    if (isMobileDevice) {
      const w = window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
      if (typeof w.requestIdleCallback === 'function') {
        w.requestIdleCallback(load, { timeout: 3000 });
      } else {
        window.setTimeout(load, 1500);
      }
    } else {
      // Desktop: load right after first paint
      window.setTimeout(load, 200);
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-black flex flex-col"
      style={{ minHeight: 'calc(100dvh - 57px)' }}
    >
      {/* Background: poster image shows instantly; video loads on top and autoplays */}
      <div className="absolute inset-0">
        <img
          src={heroPoster.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center blur-sm"
          width={1920}
          height={1080}
        />
        <img
          src={heroPoster.url}
          alt="Módulo habitacional Codelco siendo izado por grúa en planta de Cipolletti"
          className="absolute inset-0 h-full w-full object-cover object-center"
          width={1920}
          height={1080}
        />
        {videoSrc && (
          <video
            src={videoSrc}
            poster={heroPoster.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isMobile
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.70) 100%)'
            : 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content - bottom-left aligned */}
      <div className="relative z-10 flex flex-1 flex-col">
        <div className={`flex min-h-0 flex-1 flex-col ${isMobile ? 'justify-end pb-6' : 'justify-center'}`}>

          <div className="container mx-auto px-5 sm:px-10 lg:px-16 pb-3 sm:pb-4 pt-4 sm:pt-6">
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
            <h1 className="heading text-white leading-[1.03] text-[20px] sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
              {/* Mobile: 4 forced lines */}
              <span className="block sm:hidden">Módulos</span>
              <span className="block sm:hidden">Habitacionales,</span>
              <span className="block sm:hidden">Metalúrgica y <span style={{ color: BRAND_ORANGE }}>Rental</span></span>
              <span className="block sm:hidden">para la Industria Petrolera</span>
              {/* Desktop: 4 forced lines */}
              <span className="hidden sm:block">
                Módulos<br />
                Habitacionales,<br />
                Metalúrgica y <span style={{ color: BRAND_ORANGE }}>Rental</span><br />
                para la Industria Petrolera
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
              +14 años resolviendo infraestructura para Vaca Muerta{' '}
              <br className="hidden sm:block" />
              sin que la operación se detenga.
            </p>

            {/* CTAs */}
            <div className="mt-4 sm:mt-5 flex flex-row gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection('servicios')}
                className="h-11 sm:h-12 flex-1 px-4 sm:px-7 text-xs sm:text-base font-semibold rounded-none text-white border-0 hover:opacity-90 transition"
                style={{ backgroundColor: BRAND_ORANGE }}
              >
                Ver nuestros equipos →
              </Button>
              <Button
                onClick={() => scrollToSection('contacto')}
                variant="outline"
                className="h-11 sm:h-12 flex-1 px-4 sm:px-7 text-xs sm:text-base font-semibold rounded-none bg-transparent text-white border border-white/70 hover:bg-white hover:text-black transition"
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
          style={{ borderTop: `2px solid ${BRAND_ORANGE}`, backgroundColor: 'transparent' }}
        >
          <div className="container mx-auto px-6 sm:px-10 lg:px-16 relative">
            <div className="relative grid grid-cols-2 lg:grid-cols-4 items-stretch">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`py-5 sm:py-8 lg:py-10 px-4 sm:px-6 hover:bg-[#1A1A1A] transition-colors duration-300 flex flex-col justify-center ${
                    i > 0 ? 'lg:border-l lg:border-white/10' : ''
                  } ${i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''} ${
                    i % 2 === 1 ? 'border-l border-white/10 lg:border-l-0' : ''
                  }`}
                >
                  <p
                    className="eyebrow text-[10px] sm:text-xs mb-2 sm:mb-3"
                    style={{ color: BRAND_ORANGE }}
                  >
                    {s.label}
                  </p>
                  <p className="stat-number text-white leading-none text-3xl sm:text-4xl lg:text-[44px]">
                    {s.value}
                  </p>
                  <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-white/75 leading-snug">{s.desc}</p>
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
