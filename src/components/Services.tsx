import { Link } from "react-router-dom";
import HeroImageCarousel from "@/components/HeroImageCarousel";
import torresIluminacionAsset from "@/assets/rental-torres-iluminacion-codelco.png.asset.json";

const Services = () => {
  const divisions = [
    {
      badge: "FÁBRICA",
      images: [
        { src: "/images/fabrica/fabrica-32.jpg", alt: "Izaje de módulo prefabricado con grúa en planta de Cipolletti" },
        { src: "/images/fabrica/fabrica-41.jpg", alt: "Living comedor integrado con grandes ventanales" },
        { src: "/fabrica-01.jpg", alt: "Módulo habitacional terminado" },
      ],
      title: "Módulos Habitacionales y Viviendas",
      kicker: "Construcción en seco · Termo-acústica",
      text: (
        <>
          Diseñamos y fabricamos <strong>trailers autoportantes, módulos Company Man, comedores, cocinas, laboratorios y viviendas en seco</strong>, con línea de producción integral desde ingeniería hasta entrega final.
        </>
      ),
      cta: "Consultar disponibilidad →",
      ctaLink: "/fabrica",
    },
    {
      badge: "METALÚRGICA",
      images: [
        { src: "/metalurgica-05.jpg", alt: "Equipo metalúrgico fabricado en planta Codelco" },
        { src: "/metalurgica-09.jpg", alt: "Contenedor industrial reforzado" },
        { src: "/metalurgica-04.jpg", alt: "Estructura metálica especial" },
      ],
      title: "Equipos, Tanques y Estructuras",
      kicker: "Corte y plegado de chapa · Trazabilidad total",
      text: (
        <>
          Fabricamos <strong>piletas de acumulación, tanques API, choke manifolds, líneas de alta presión y estructuras para decanter</strong>, con calidad y precisión certificada en cada proceso.
        </>
      ),
      cta: "Solicitar presupuesto →",
      ctaLink: "/metalurgica",
    },
    {
      badge: "RENTAL",
      images: [
        { src: "/rental-01.jpg", alt: "Flota Toyota Hilux y VW Amarok en base operativa" },
        { src: "/rental-03.jpg", alt: "Trailer rodante de gran porte" },
        { src: torresIluminacionAsset.url, alt: "Torres de iluminación LED Codelco en yacimiento" },
      ],
      title: "Vehículos, Trailers y Equipos de Torres LED",
      kicker: "+60 unidades · Mantenimiento incluido",
      text: (
        <>
          Flota liviana <strong>Toyota Hilux y VW Amarok</strong>, trailers rodantes de 6, 9 y 12 metros, piletas y contenedores. Incluye torres de iluminación LED con stock inmediato.
        </>
      ),
      cta: "Ver equipos disponibles →",
      ctaLink: "/rental",
    },
    {
      badge: "GRUPOS ELECTRÓGENOS",
      images: [
        { src: "/images/novedad/grupo-electrogeno.jpg", alt: "Entrega de grupo electrógeno Codelco en obra", objectPosition: "center 40%" },
      ],
      title: "Alquiler y Mantenimiento",
      kicker: "55 a 180 kVA · Monitoreo técnico",
      text: (
        <>
          Energía confiable y continua para operaciones críticas. Equipos de <strong>55 a 180 kVA</strong> con soporte técnico especializado y disponibilidad permanente.
        </>
      ),
      cta: "Consultar equipos →",
      ctaLink: "/grupos-electrogenos",
    },
  ];


  return (
    <section id="servicios" style={{ backgroundColor: "#F5F3EF" }} className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow inline-block text-xs md:text-sm text-[#E84E1B] mb-3 font-bold">
            NUESTRAS DIVISIONES
          </span>
          <h2 className="heading text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] mb-4 leading-tight">
            Fabricación, metalúrgica y rental bajo un mismo techo
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Tres áreas que cubren infraestructura completa para una operación petrolera, industrial o de construcción.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {divisions.map((div) => (
            <div
              key={div.badge}
              className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              style={{
                backgroundColor: "#1A1A1A",
                border: "2px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#E84E1B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              {/* Image + Badge */}
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden" style={{ backgroundColor: "#1A1A1A" }}>
                <HeroImageCarousel
                  images={div.images}
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient blend into card */}
                <div
                  className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(26,26,26,0) 0%, rgba(26,26,26,0.75) 60%, #1A1A1A 100%)",
                  }}
                />
                <span
                  className="eyebrow absolute top-4 left-4 text-xs text-white px-3 py-1 rounded-sm"
                  style={{ backgroundColor: "#E84E1B" }}
                >
                  {div.badge}
                </span>
              </div>

              {/* Content */}
              <div className="px-6 md:px-8 pt-4 pb-6 md:pb-8">
                <h3 className="heading text-lg md:text-xl text-white mb-2">
                  {div.title}
                </h3>
                <p className="eyebrow text-xs md:text-sm text-[#E84E1B] mb-4 font-bold">
                  {div.kicker}
                </p>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  {div.text}
                </p>
                <div className="border-t border-white/30 mb-4" />
                <Link
                  to={div.ctaLink}
                  className="inline-flex items-center text-sm font-semibold text-white group-hover:text-[#E84E1B] transition-colors duration-300"
                >
                  <span className="border-b border-white group-hover:border-[#E84E1B] transition-colors duration-300">
                    {div.cta}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
