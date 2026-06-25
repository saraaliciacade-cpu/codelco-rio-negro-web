import LogoCarousel from './LogoCarousel';

const Clients = () => {
  return (
    <section id="clientes" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center mb-10 md:mb-14">
        <p className="text-xs md:text-sm font-mono tracking-widest text-[#E84E1B] mb-4">
          PRUEBA SOCIAL
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4">
          +30 empresas del sector petrolero confían en nosotros
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          Operadoras, contratistas y empresas de servicios trabajan con Codelco en Vaca Muerta y toda la Patagonia.
        </p>
      </div>

      <LogoCarousel />

      <div className="max-w-3xl mx-auto px-4 text-center mt-10 md:mt-14">
        <p className="text-sm md:text-base text-gray-500">
          Construimos relaciones basadas en confianza y resultados sostenidos, acompañando a cada cliente en cada etapa de su operación.
        </p>
      </div>
    </section>
  );
};

export default Clients;
