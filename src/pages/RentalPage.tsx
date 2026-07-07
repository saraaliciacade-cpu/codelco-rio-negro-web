import { Link } from 'react-router-dom';
import { ArrowRight, Car, Truck, Package, Lightbulb, Battery, Wrench } from 'lucide-react';
import { Phone, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DivisionGallery, { DivisionGalleryImage } from '@/components/DivisionGallery';
import HeroImageCarousel from '@/components/HeroImageCarousel';
import torresIluminacionAsset from '@/assets/rental-torres-iluminacion-codelco.png.asset.json';

const BRAND_ORANGE = '#E84E1B';
const BRAND_CREAM = '#F5F3EF';
const BRAND_BLACK = '#1A1A1A';

const rentalImages: DivisionGalleryImage[] = [
  { src: torresIluminacionAsset.url, name: 'Torres de iluminación LED Codelco en yacimiento', isNew: true },
  { src: '/rental-01.jpg', name: 'Flota Toyota Hilux en base operativa' },
  { src: '/rental-02.jpg', name: 'Camionetas VW Amarok listas para servicio' },
  { src: '/rental-03.jpg', name: 'Trailer rodante de gran porte' },
  { src: '/rental-04.jpg', name: 'Torre de iluminación LED en yacimiento' },
  { src: '/rental-05.jpg', name: 'Flota liviana en operación' },
  { src: '/rental-06.jpg', name: 'Trailer rodante en obra' },
  { src: '/rental-07.jpg', name: 'Equipos de iluminación autónoma' },
  { src: '/rental-08.jpg', name: 'Camionetas y trailers en base Codelco' },
];


const specs = [
  { text: '+60 unidades Hilux y Amarok', icon: Car },
  { text: 'Trailers rodantes de 6, 9 y 12 metros', icon: Truck },
  { text: 'Piletas y contenedores', icon: Package },
  { text: 'Torres de iluminación LED (stock inmediato)', icon: Lightbulb },
  { text: 'Abastecimiento autónomo de energía', icon: Battery },
  { text: 'Mantenimiento y gestión incluidos', icon: Wrench },
];

const otherDivisions = [
  { to: '/fabrica', badge: 'FÁBRICA', title: 'Módulos y viviendas industriales', img: '/fabrica-01.jpg' },
  { to: '/metalurgica', badge: 'METALÚRGICA', title: 'Equipos, tanques y estructuras', img: '/metalurgica-01.jpg' },
  { to: '/grupos-electrogenos', badge: 'GRUPOS ELECTRÓGENOS', title: 'Alquiler y mantenimiento', img: '/rental-03.jpg' },
];

const RentalPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="relative w-full" style={{ minHeight: '380px' }}>
        <HeroImageCarousel
          images={[
            { src: '/rental-01.jpg', alt: 'Flota Toyota Hilux y VW Amarok en base operativa' },
            { src: '/rental-03.jpg', alt: 'Trailer rodante de gran porte' },
            { src: torresIluminacionAsset.url, alt: 'Torres de iluminación LED Codelco en yacimiento' },
          ]}
        />


        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.8) 100%)' }}
        />
        <div className="relative container mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-16 min-h-[380px] flex flex-col justify-end">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs sm:text-sm text-white/70">
            <ol className="flex items-center gap-2 flex-wrap">
              <li><Link to="/" className="hover:text-white">Inicio</Link></li>
              <li aria-hidden="true">/</li>
              <li><a href="/#servicios" className="hover:text-white">Servicios</a></li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-semibold">Rental</li>
            </ol>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
            <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
              RENTAL · +60 UNIDADES EN FLOTA
            </span>
          </div>

          <h1 className="heading text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl">
            Vehículos, Trailers y Equipos en Alquiler para Vaca Muerta
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed">
            Flota liviana Toyota Hilux y VW Amarok, trailers rodantes y torres de iluminación LED con
            disponibilidad inmediata. Mantenimiento y gestión permanente incluidos.
          </p>
        </div>
      </section>

      <section style={{ backgroundColor: BRAND_CREAM }} className="py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10" style={{ backgroundColor: BRAND_ORANGE }} aria-hidden="true" />
              <span className="eyebrow text-[11px] sm:text-xs" style={{ color: BRAND_ORANGE }}>
                QUÉ ALQUILAMOS
              </span>
            </div>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1]" style={{ color: BRAND_BLACK }}>
              Flota lista para operar, con gestión y mantenimiento incluidos
            </h2>
            <p className="mt-5 text-base lg:text-lg text-gray-700 leading-relaxed">
              Más de 60 unidades en flota propia, mantenimiento programado y soporte permanente
              para que tu operación no se detenga. Disponibilidad real al instante.
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
              Equipos y flota en operación
            </h2>
          </div>

          <DivisionGallery images={rentalImages} />
        </div>
      </section>

      <section style={{ backgroundColor: BRAND_BLACK }} className="py-16 lg:py-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <h2 className="heading text-white text-2xl sm:text-3xl lg:text-4xl leading-tight md:whitespace-nowrap">
            ¿Necesitás flota disponible para tu operación?
          </h2>
          <p className="mt-4 text-base lg:text-lg text-white/75 max-w-2xl mx-auto">
            Contanos cantidad de unidades y plazo. Te confirmamos disponibilidad real al instante.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm sm:text-base font-semibold rounded-sm text-white transition hover:opacity-90"
              style={{ backgroundColor: BRAND_ORANGE }}
            >
              <Phone className="w-4 h-4" />
              Ver equipos disponibles
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

export default RentalPage;
