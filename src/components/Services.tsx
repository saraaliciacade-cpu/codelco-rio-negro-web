const Services = () => {
  const divisions = [
    {
      badge: "FÁBRICA",
      image: "/images/fabrica/fabrica-02.jpg",
      title: "Módulos Habitacionales y Viviendas",
      kicker: "Construcción en seco · Termo-acústica",
      text: (
        <>
          Diseñamos y fabricamos <strong>trailers autoportantes, módulos Company Man, comedores, cocinas, laboratorios y viviendas en seco</strong>, con línea de producción integral desde ingeniería hasta entrega final.
        </>
      ),
      cta: "Consultar disponibilidad →",
      ctaLink: "#contacto",
    },
    {
      badge: "METALÚRGICA",
      image: "/images/metalurgica/metalurgica-01.jpg",
      title: "Equipos, Tanques y Estructuras",
      kicker: "Corte y plegado de chapa · Trazabilidad total",
      text: (
        <>
          Fabricamos <strong>piletas de acumulación, tanques API, choke manifolds, líneas de alta presión y estructuras para decanter</strong>, con calidad y precisión certificada en cada proceso.
        </>
      ),
      cta: "Solicitar presupuesto →",
      ctaLink: "#contacto",
    },
    {
      badge: "RENTAL",
      image: "/rental-01.jpg",
      title: "Vehículos, Trailers y Equipos",
      kicker: "+60 unidades · Mantenimiento incluido",
      text: (
        <>
          Flota liviana <strong>Toyota Hilux y VW Amarok</strong>, trailers rodantes de 6, 9 y 12 metros, piletas y contenedores. Incluye torres de iluminación LED con stock inmediato.
        </>
      ),
      cta: "Ver equipos disponibles →",
      ctaLink: "#contacto",
    },
    {
      badge: "GRUPOS ELECTRÓGENOS",
      image: "/rental-03.jpg",
      title: "Alquiler y Mantenimiento",
      kicker: "55 a 180 kVA · Monitoreo técnico",
      text: (
        <>
          Energía confiable y continua para operaciones críticas. Equipos de <strong>55 a 180 kVA</strong> con soporte técnico especializado y disponibilidad permanente.
        </>
      ),
      cta: "Consultar equipos →",
      ctaLink: "#contacto",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="servicios" style={{ backgroundColor: "#F5F3EF" }} className="py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="eyebrow inline-block text-xs md:text-sm text-[#E84E1B] mb-3">
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
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={div.image}
                  alt={div.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-4 left-4 text-xs font-bold tracking-wider text-white px-3 py-1 rounded-sm"
                  style={{ backgroundColor: "#E84E1B" }}
                >
                  {div.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3
                  className="text-lg md:text-xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  {div.title}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-[#E84E1B] mb-4 tracking-wide uppercase">
                  {div.kicker}
                </p>
                <p
                  className="text-sm md:text-base text-gray-300 leading-relaxed mb-6"
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  {div.text}
                </p>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="inline-flex items-center text-sm font-semibold text-[#E84E1B] hover:text-white transition-colors duration-300 group/btn"
                >
                  <span className="border-b border-[#E84E1B] group-hover/btn:border-white transition-colors duration-300">
                    {div.cta}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
