import { Link } from 'react-router-dom';
import { ArrowRight, Home, Building2, UtensilsCrossed, FlaskConical, Package, PenTool, Thermometer } from 'lucide-react';
import { Phone, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DivisionGallery, { DivisionGalleryImage } from '@/components/DivisionGallery';
import HeroImageCarousel from '@/components/HeroImageCarousel';

const BRAND_ORANGE = '#E84E1B';
const BRAND_CREAM = '#F5F3EF';
const BRAND_BLACK = '#1A1A1A';

// Fábrica images — sorted newest → oldest (mirrors Gallery.tsx ordering)
const fabricaImages: DivisionGalleryImage[] = [
  // NEW (isNew=true)
  { src: '/images/fabrica/fabrica-30.jpg', name: 'Interior modular con entrepiso y cocina integrada', isNew: true },
  { src: '/images/fabrica/fabrica-36.jpg', name: 'Dormitorio con vista panorámica', isNew: true },
  { src: '/images/fabrica/fabrica-39.jpg', name: 'Módulo habitacional al atardecer', isNew: true },
  { src: '/images/fabrica/fabrica-33.jpg', name: 'Módulo con escalera de acceso listo para transporte', isNew: true },
  { src: '/images/fabrica/fabrica-31.jpg', name: 'Módulo transportable blanco terminado', isNew: true },
  { src: '/images/fabrica/fabrica-40.jpg', name: 'Dormitorio moderno con piso de madera', isNew: true },
  { src: '/images/fabrica/fabrica-41.jpg', name: 'Living comedor integrado con grandes ventanales', isNew: true },
  { src: '/images/fabrica/fabrica-32.jpg', name: 'Izaje de módulo prefabricado con grúa', isNew: true },
  { src: '/images/fabrica/fabrica-34.jpg', name: 'Interior moderno con grandes ventanales y terraza', isNew: true },
  { src: '/images/fabrica/fabrica-35.jpg', name: 'Render de módulo habitacional moderno', isNew: true },
  { src: '/images/novedad/novedad-01.jpg', name: 'Trailer autoportante sobre viga - Módulo en construcción', isNew: true },
  { src: '/images/fabrica/fabrica-37.jpg', name: 'Unidad móvil para servicios con generador', isNew: true },
  { src: '/images/novedad/novedad-02.jpg', name: 'Trailer autoportante - Vista frontal', isNew: true },
  { src: '/images/fabrica/fabrica-38.jpg', name: 'Estructura Steel Frame en construcción', isNew: true },
  { src: '/images/novedad/novedad-03.jpg', name: 'Trailer autoportante - Estructura', isNew: true },
  { src: '/images/novedad/novedad-04.jpg', name: 'Trailer autoportante - Interior en construcción', isNew: true },
  { src: '/images/novedad/novedad-05.jpg', name: 'Trailer autoportante - Vista lateral', isNew: true },
  // Crexell (medium age, no badge)
  { src: '/images/fabrica/fabrica-26.jpg', name: 'Interior terminado con piso de madera y LED' },
  { src: '/images/fabrica/fabrica-27.jpg', name: 'Instalación eléctrica con equipamiento Siemens' },
  { src: '/images/fabrica/fabrica-28.jpg', name: 'Montaje de módulos en planta industrial' },
  // Older fabrica (oldest)
  { src: '/fabrica-01.jpg', name: 'Módulo habitacional terminado' },
  { src: '/fabrica-02.jpg', name: 'Vista exterior de módulo industrial' },
  { src: '/fabrica-03.jpg', name: 'Trailer autoportante en planta' },
  { src: '/fabrica-04.jpg', name: 'Módulo Company Man' },
  { src: '/fabrica-05.jpg', name: 'Interior de comedor industrial' },
  { src: '/fabrica-06.jpg', name: 'Cocina industrial integrada' },
  { src: '/fabrica-07.jpg', name: 'Laboratorio móvil' },
  { src: '/fabrica-08.jpg', name: 'Izaje de módulo en obra' },
  { src: '/fabrica-09.jpg', name: 'Módulo habitacional en transporte' },
  { src: '/fabrica-10.jpg', name: 'Fabricación en planta Cipolletti' },
  { src: '/fabrica-11.jpg', name: 'Proceso de soldadura en estructura' },
  { src: '/fabrica-12.jpg', name: 'Aislación termo-acústica' },
  { src: '/fabrica-13.jpg', name: 'Revestimiento exterior de módulo' },
  { src: '/fabrica-14.jpg', name: 'Estructura metálica autoportante' },
  { src: '/fabrica-15.jpg', name: 'Línea de producción de módulos' },
  { src: '/fabrica-16.jpg', name: 'Módulo terminado para entrega' },
  { src: '/fabrica-17.jpg', name: 'Interior con instalaciones eléctricas' },
  { src: '/fabrica-18.jpg', name: 'Sanitarios de módulo habitacional' },
  { src: '/fabrica-19.jpg', name: 'Dormitorios de Company Man' },
  { src: '/fabrica-20.jpg', name: 'Comedor industrial en obra' },
  { src: '/fabrica-21.jpg', name: 'Cocina industrial equipada' },
  { src: '/fabrica-22.jpg', name: 'Módulo de oficinas en obra' },
  { src: '/fabrica-23.jpg', name: 'Contenedor habitacional adaptado' },
  { src: '/fabrica-24.jpg', name: 'Vivienda en seco lista para montaje' },
];

const specs = [
  { text: 'Trailers autoportantes', icon: Home },
  { text: 'Módulos Company Man', icon: Building2 },
  { text: 'Comedor y cocina industrial', icon: UtensilsCrossed },
  { text: 'Laboratorios móviles', icon: FlaskConical },
  { text: 'Contenedores habitacionales', icon: Package },
  { text: 'Viviendas en seco', icon: Home },
  { text: 'Aislación termo-acústica', icon: Thermometer },
  { text: 'Ingeniería y diseño propios', icon: PenTool },
];

const otherDivisions = [
  { to: '/metalurgica', badge: 'METALÚRGICA', title: 'Equipos, tanques y estructuras', img: '/metalurgica-01.jpg' },
  { to: '/rental', badge: 'RENTAL', title: 'Vehículos, trailers y equipos', img: '/rental-01.jpg' },
  { to: '/grupos-electrogenos', badge: 'GRUPOS ELECTRÓGENOS', title: 'Alquiler y mantenimiento', img: '/rental-03.jpg' },
];

const FabricaPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Fábrica de Módulos Habitacionales e Industriales | Codelco S.A."
        description="Diseñamos y fabricamos módulos habitacionales, oficinas, comedores, laboratorios y campamentos llave en mano para la industria energética y minera en Argentina."
        path="/fabrica"
        keywords="módulos habitacionales, campamentos petroleros, oficinas modulares, viviendas industriales, Vaca Muerta, Codelco"
      />
      <Header />


      {/* Hero */}
      <section
        className="relative w-full"
        style={{ minHeight: '380px' }}
      >
        <HeroImageCarousel
          images={[
            { src: '/images/fabrica/fabrica-32.jpg', alt: 'Izaje de módulo prefabricado con grúa en planta de Cipolletti' },
            { src: '/images/fabrica/fabrica-41.jpg', alt: 'Living comedor integrado con grandes ventanales' },
            { src: '/fabrica-01.jpg', alt: 'Módulo habitacional terminado' },
          ]}
        />


        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />
        <div className="relative container mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-16 min-h-[380px] flex flex-col justify-end">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 text-xs sm:text-sm text-white/70">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link to="/" className="hover:text-white">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><a href="/#servicios" className="hover:text-white">Divisiones</a></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">Fábrica</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
            <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
              FÁBRICA · PLANTA PROPIA DE 3.500 M²
            </span>
          </div>

          <h1 className="heading text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl">
            Módulos Habitacionales y Viviendas para la Industria Petrolera
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
            Trailers autoportantes, módulos Company Man, comedores, cocinas, laboratorios y viviendas en seco.
            Diseño, ingeniería y fabricación bajo un mismo techo en Cipolletti.
          </p>
        </div>
      </section>

      {/* Qué fabricamos */}
      <section style={{ backgroundColor: BRAND_CREAM }} className="py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
              <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
                QUÉ FABRICAMOS
              </span>
            </div>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" style={{ color: BRAND_BLACK }}>
              Línea de producción integral, de la ingeniería a la entrega
            </h2>
            <p className="mt-5 text-base lg:text-lg text-gray-700 leading-relaxed">
              Controlamos cada etapa del proceso productivo: diseño, corte de chapa, plegado CNC, soldadura,
              aislación, instalaciones, terminaciones y entrega. Sin intermediarios, sin tiempos muertos.
            </p>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {specs.map((spec) => (
              <li
                key={spec.text}
                className="flex items-start lg:items-center gap-4 lg:gap-5 bg-white p-5 lg:p-6 border border-black/5"
              >
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

      {/* Galería */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
              <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
                GALERÍA
              </span>
            </div>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" style={{ color: BRAND_BLACK }}>
              Obras y módulos fabricados en nuestra planta
            </h2>
          </div>

          <DivisionGallery images={fabricaImages} />
        </div>
      </section>

      {/* CTA banda negra */}
      <section style={{ backgroundColor: BRAND_BLACK }} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="heading text-white text-2xl sm:text-3xl lg:text-4xl leading-tight md:whitespace-nowrap">
            ¿Necesitás un módulo para tu próxima obra?
          </h2>
          <p className="mt-4 text-base lg:text-lg text-white/75 max-w-2xl mx-auto">
            Contanos los plazos y especificaciones. Te respondemos con disponibilidad real y un presupuesto en menos de 48 hs.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <Phone className="w-4 h-4" />
              Consultar disponibilidad
            </Link>
            <a
              href="https://wa.me/5492994136453"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-4 h-4" />
              Escribir por WhatsApp
            </a>

          </div>
        </div>
      </section>

      {/* Otras divisiones */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-12">
            <span className="eyebrow inline-block text-xs sm:text-sm mb-3" style={{ color: BRAND_ORANGE }}>
              OTRAS DIVISIONES
            </span>
            <h2 className="heading text-2xl sm:text-3xl lg:text-4xl" style={{ color: BRAND_BLACK }}>
              Conocé el resto de nuestras áreas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {otherDivisions.map((d) => (
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

export default FabricaPage;
