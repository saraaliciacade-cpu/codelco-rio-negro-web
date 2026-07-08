import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Database, Gauge, Waves, Truck, Hammer, Package, Scissors } from 'lucide-react';
import { Phone, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import ShareServices from '@/components/ShareServices';
import Footer from '@/components/Footer';
import DivisionGallery, { DivisionGalleryImage } from '@/components/DivisionGallery';
import HeroImageCarousel from '@/components/HeroImageCarousel';

const BRAND_ORANGE = '#E84E1B';
const BRAND_CREAM = '#F5F3EF';
const BRAND_BLACK = '#1A1A1A';

const metalurgicaImages: DivisionGalleryImage[] = [
  { src: '/metalurgica-01.jpg', name: 'Equipo metalúrgico fabricado en planta' },
  { src: '/metalurgica-02.jpg', name: 'Pileta de acumulación' },
  { src: '/metalurgica-03.jpg', name: 'Tanque API en proceso' },
  { src: '/metalurgica-04.jpg', name: 'Estructura metálica especial' },
  { src: '/metalurgica-05.jpg', name: 'Choke manifold ensamblado' },
  { src: '/metalurgica-06.jpg', name: 'Líneas de alta presión' },
  { src: '/metalurgica-07.jpg', name: 'Planta móvil para yacimiento' },
  { src: '/metalurgica-08.jpg', name: 'Estructura para decanter' },
  { src: '/metalurgica-09.jpg', name: 'Contenedor industrial reforzado' },
  { src: '/metalurgica-10.jpg', name: 'Corte y plegado de chapa' },
  { src: '/metalurgica-11.jpg', name: 'Tanque API terminado' },
  { src: '/metalurgica-12.jpg', name: 'Pileta de acumulación de gran capacidad' },
  { src: '/metalurgica-13.jpg', name: 'Equipo metalúrgico en taller' },
  { src: '/metalurgica-14.jpg', name: 'Soldadura de estructura especial' },
  { src: '/metalurgica-15.jpg', name: 'Choke manifold en planta' },
  { src: '/metalurgica-16.jpg', name: 'Estructura metálica para operación' },
  { src: '/metalurgica-17.jpg', name: 'Líneas y cañerías de alta presión' },
  { src: '/metalurgica-18.jpg', name: 'Planta móvil lista para entrega' },
  { src: '/metalurgica-19.jpg', name: 'Estructura para decanter armada' },
  { src: '/metalurgica-20.jpg', name: 'Contenedor industrial fabricado a medida' },
];

const specs = [
  { text: 'Piletas de acumulación', icon: Droplets },
  { text: 'Tanques API', icon: Database },
  { text: 'Choke manifolds', icon: Gauge },
  { text: 'Líneas de alta presión', icon: Waves },
  { text: 'Plantas móviles', icon: Truck },
  { text: 'Estructuras para decanter', icon: Hammer },
  { text: 'Contenedores industriales', icon: Package },
  { text: 'Corte y plegado de chapas', icon: Scissors },
];

const otherDivisions = [
  { to: '/fabrica', badge: 'FÁBRICA', title: 'Módulos y viviendas industriales', img: '/fabrica-01.jpg' },
  { to: '/rental', badge: 'RENTAL', title: 'Vehículos, trailers y equipos', img: '/rental-01.jpg' },
  { to: '/grupos-electrogenos', badge: 'GRUPOS ELECTRÓGENOS', title: 'Alquiler y mantenimiento', img: '/rental-03.jpg' },
];

const MetalurgicaPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Metalúrgica Industrial: Tanques, Piletas y Estructuras | Codelco S.A."
        description="Taller metalúrgico especializado en tanques, piletas, estructuras metálicas y equipos a medida para la industria petrolera y de servicios en Vaca Muerta."
        path="/metalurgica"
        keywords="metalúrgica industrial, tanques, piletas, estructuras metálicas, Vaca Muerta, Codelco"
      />
      <Header />


      {/* Hero */}
      <section className="relative w-full" style={{ minHeight: '500px' }}>
        <HeroImageCarousel
          images={[
            { src: '/metalurgica-05.jpg', alt: 'Equipo metalúrgico fabricado en planta Codelco' },
            { src: '/metalurgica-09.jpg', alt: 'Contenedor industrial reforzado' },
            { src: '/metalurgica-04.jpg', alt: 'Estructura metálica especial' },
          ]}
        />


        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.8) 100%)' }}
        />
        <div className="relative container mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-16 min-h-[500px] flex flex-col justify-end">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs sm:text-sm text-white/70">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link to="/" className="hover:text-white">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><a href="/#servicios" className="hover:text-white">Servicios</a></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">Metalúrgica</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
            <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
              METALÚRGICA · CORTE Y PLEGADO DE CHAPA
            </span>
          </div>

          <h1 className="heading text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl">
            Tanques, Piletas y Estructuras para la Industria Petrolera
          </h1>
          <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <p className="text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
              Fabricación de equipos metalúrgicos con trazabilidad y precisión certificada en cada proceso:
              piletas de acumulación, tanques API, choke manifolds y estructuras especiales.
            </p>
            <ShareServices title="Metalúrgica — Tanques, Piletas y Estructuras" path="/metalurgica" color="light" />
          </div>
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
              Equipos metalúrgicos con calidad y trazabilidad certificada
            </h2>
            <p className="mt-5 text-base lg:text-lg text-gray-700 leading-relaxed">
              Diseñamos y fabricamos equipos a medida para la industria petrolera, con procesos certificados
              de corte, plegado, soldadura y armado. Trazabilidad completa desde la chapa hasta el equipo final.
            </p>
          </div>

          <ul className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {specs.map((spec) => (
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
              Equipos fabricados en nuestra planta metalúrgica
            </h2>
          </div>

          <DivisionGallery images={metalurgicaImages} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: BRAND_BLACK }} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="heading text-white text-2xl sm:text-3xl lg:text-4xl leading-tight md:whitespace-nowrap">
            ¿Tenés un proyecto que necesita equipos a medida?
          </h2>
          <p className="mt-4 text-base lg:text-lg text-white/75 max-w-2xl mx-auto">
            Contanos las especificaciones técnicas y te enviamos un presupuesto detallado.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <Phone className="w-4 h-4" />
              Solicitar presupuesto
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

export default MetalurgicaPage;
