import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Settings, CalendarDays, Monitor, Headphones, Clock } from 'lucide-react';
import { Phone, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import ShareServices from '@/components/ShareServices';
import Footer from '@/components/Footer';
import DivisionGallery, { DivisionGalleryImage } from '@/components/DivisionGallery';
import { useLanguage } from '@/contexts/LanguageContext';

const BRAND_ORANGE = '#E84E1B';
const BRAND_CREAM = '#F5F3EF';
const BRAND_BLACK = '#1A1A1A';

const copy = {
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbServices: 'Servicios',
    breadcrumbCurrent: 'Grupos Electrógenos',
    heroImgAlt: 'Entrega de grupo electrógeno Codelco en obra',
    eyebrowHero: 'GRUPOS ELECTRÓGENOS · 55 A 180 kVA',
    h1: 'Alquiler y Mantenimiento de Grupos Electrógenos Industriales',
    heroParagraph:
      'Energía confiable y continua para operaciones críticas. Equipos de 55 a 180 kVA con monitoreo y soporte técnico especializado.',
    shareTitle: 'Grupos Electrógenos Industriales',
    eyebrowQue: 'QUÉ OFRECEMOS',
    quePlate: 'Disponibilidad permanente para operaciones que no pueden parar',
    queParagraph:
      'Equipos confiables, mantenimiento programado y soporte técnico para garantizar energía continua donde tu operación lo requiera.',
    specs: [
      { text: 'Equipos de 55 a 180 kVA', icon: Zap },
      { text: 'Instalación incluida', icon: Settings },
      { text: 'Mantenimiento programado', icon: CalendarDays },
      { text: 'Monitoreo técnico', icon: Monitor },
      { text: 'Soporte especializado', icon: Headphones },
      { text: 'Disponibilidad permanente 24/7', icon: Clock },
    ],
    eyebrowGaleria: 'GALERÍA',
    galeriaTitle: 'Equipos y unidades en operación',
    galeriaImageName: 'Entrega de grupo electrógeno Codelco en obra',
    ctaTitle: '¿Tu operación necesita energía garantizada?',
    ctaParagraph: 'Contanos el consumo estimado y te recomendamos el equipo adecuado.',
    ctaButton1: 'Consultar equipos',
    ctaButton2: 'Escribir por WhatsApp',
    eyebrowOtras: 'OTRAS DIVISIONES',
    otrasTitle: 'Conocé el resto de nuestras áreas',
    otherDivisions: [
      { to: '/fabrica', badge: 'FÁBRICA', title: 'Módulos y viviendas industriales', img: '/fabrica-01.jpg' },
      { to: '/metalurgica', badge: 'METALÚRGICA', title: 'Equipos, tanques y estructuras', img: '/metalurgica-01.jpg' },
      { to: '/rental', badge: 'RENTAL', title: 'Vehículos, trailers y equipos', img: '/rental-01.jpg' },
    ],
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbServices: 'Services',
    breadcrumbCurrent: 'Generator Sets',
    heroImgAlt: 'Delivery of a Codelco generator set on site',
    eyebrowHero: 'GENERATOR SETS · 55 TO 180 kVA',
    h1: 'Rental and Maintenance of Industrial Generator Sets',
    heroParagraph:
      'Reliable, continuous power for critical operations. Units from 55 to 180 kVA with monitoring and specialized technical support.',
    shareTitle: 'Industrial Generator Sets',
    eyebrowQue: 'WHAT WE OFFER',
    quePlate: 'Permanent availability for operations that cannot stop',
    queParagraph:
      'Reliable equipment, scheduled maintenance and technical support to guarantee continuous power wherever your operation needs it.',
    specs: [
      { text: 'Units from 55 to 180 kVA', icon: Zap },
      { text: 'Installation included', icon: Settings },
      { text: 'Scheduled maintenance', icon: CalendarDays },
      { text: 'Technical monitoring', icon: Monitor },
      { text: 'Specialized support', icon: Headphones },
      { text: 'Permanent 24/7 availability', icon: Clock },
    ],
    eyebrowGaleria: 'GALLERY',
    galeriaTitle: 'Equipment and units in operation',
    galeriaImageName: 'Delivery of a Codelco generator set on site',
    ctaTitle: 'Does your operation need guaranteed power?',
    ctaParagraph: 'Tell us the estimated consumption and we will recommend the right equipment.',
    ctaButton1: 'Ask about equipment',
    ctaButton2: 'Write on WhatsApp',
    eyebrowOtras: 'OTHER DIVISIONS',
    otrasTitle: 'Discover the rest of our areas',
    otherDivisions: [
      { to: '/fabrica', badge: 'FACTORY', title: 'Industrial modules and housing', img: '/fabrica-01.jpg' },
      { to: '/metalurgica', badge: 'METALLURGY', title: 'Equipment, tanks and structures', img: '/metalurgica-01.jpg' },
      { to: '/rental', badge: 'RENTAL', title: 'Vehicles, trailers and equipment', img: '/rental-01.jpg' },
    ],
  },
} as const;

const GruposElectrogenosPage = () => {
  const { language } = useLanguage();
  const c = copy[language];

  const gruposImages: DivisionGalleryImage[] = [
    { src: '/images/novedad/grupo-electrogeno.jpg', name: c.galeriaImageName },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Grupos Electrógenos: Alquiler y Mantenimiento 24/7 | Codelco S.A."
        description="Alquiler de grupos electrógenos con mantenimiento programado, monitoreo y soporte 24/7 para la industria energética, minera y de la construcción en la Patagonia."
        path="/grupos-electrogenos"
        keywords="grupos electrógenos, alquiler generadores, mantenimiento grupos electrógenos, Vaca Muerta, Codelco"
      />
      <Header />


      <section className="relative w-full" style={{ minHeight: '500px' }}>
        <img
          src="/images/novedad/grupo-electrogeno.jpg"
          alt={c.heroImgAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.8) 100%)' }}
        />
        <div className="relative container mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-16 min-h-[500px] flex flex-col justify-end">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs sm:text-sm text-white/70">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link to="/" className="hover:text-white">{c.breadcrumbHome}</Link></li>
              <li aria-hidden="true">/</li>
              <li><a href="/#servicios" className="hover:text-white">{c.breadcrumbServices}</a></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">{c.breadcrumbCurrent}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
            <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
              {c.eyebrowHero}
            </span>
          </div>

          <h1 className="heading text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl">
            {c.h1}
          </h1>
          <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <p className="text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
              {c.heroParagraph}
            </p>
            <ShareServices title={c.shareTitle} path="/grupos-electrogenos" color="light" />
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: BRAND_CREAM }} className="py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
              <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
                {c.eyebrowQue}
              </span>
            </div>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" style={{ color: BRAND_BLACK }}>
              {c.quePlate}
            </h2>
            <p className="mt-5 text-base lg:text-lg text-gray-700 leading-relaxed">
              {c.queParagraph}
            </p>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {c.specs.map((spec) => (
              <li key={spec.text} className="flex items-start lg:items-center gap-4 lg:gap-5 bg-white p-5 lg:p-6 border border-black/5">
                <span
                  className="shrink-0 mt-0.5 lg:mt-0 flex items-center justify-center h-10 w-10 lg:h-14 lg:w-14 rounded-full"
                  style={{ backgroundColor: BRAND_ORANGE }}
                  aria-hidden="true"
                >
                  <spec.icon className="h-5 w-5 lg:h-7 lg:w-7 text-white" strokeWidth={2} />
                </span>
                <span className="text-base lg:text-xl font-medium text-[#1A1A1A]">{spec.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
              <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
                {c.eyebrowGaleria}
              </span>
            </div>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" style={{ color: BRAND_BLACK }}>
              {c.galeriaTitle}
            </h2>
          </div>

          <DivisionGallery images={gruposImages} />
        </div>
      </section>

      <section style={{ backgroundColor: BRAND_BLACK }} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="heading text-white text-2xl sm:text-3xl lg:text-4xl leading-tight md:whitespace-nowrap">
            {c.ctaTitle}
          </h2>
          <p className="mt-4 text-base lg:text-lg text-white/75 max-w-2xl mx-auto">
            {c.ctaParagraph}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <Phone className="w-4 h-4" />
              {c.ctaButton1}
            </Link>
            <a
              href="https://wa.me/5492994136453"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-4 h-4" />
              {c.ctaButton2}
            </a>

          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12">
            <span className="eyebrow inline-block text-xs sm:text-sm mb-3" style={{ color: BRAND_ORANGE }}>
              {c.eyebrowOtras}
            </span>
            <h2 className="heading text-2xl sm:text-3xl lg:text-4xl" style={{ color: BRAND_BLACK }}>
              {c.otrasTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {c.otherDivisions.map((d) => (
              <Link
                key={d.to}
                to={d.to}
                className="group block overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl"
                style={{ backgroundColor: BRAND_BLACK, border: '2px solid transparent' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = BRAND_ORANGE)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="eyebrow absolute top-4 left-4 text-xs text-white px-3 py-1 rounded-sm"
                    style={{ backgroundColor: BRAND_ORANGE }}
                  >
                    {d.badge}
                  </span>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <h3 className="heading text-lg text-white">{d.title}</h3>
                  <ArrowRight className="h-5 w-5 text-[#E84E1B] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GruposElectrogenosPage;
