import LogoCarousel from './LogoCarousel';

const Clients = () => {
  return (
    <section id="clientes" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center mb-10 md:mb-14">
        <p className="eyebrow text-xs md:text-sm text-[#E84E1B] mb-4 font-bold">
          PRUEBA SOCIAL
        </p>
        <h2 className="heading text-3xl md:text-5xl text-[#1A1A1A] leading-tight mb-4">
          <span className="text-[#e65b2a]">+30 empresas</span> del sector petrolero <span className="text-[#e65b2a]">confían en nosotros</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
          Operadoras, contratistas y empresas de servicios trabajan con Codelco en Vaca Muerta y toda la Patagonia.
        </p>
      </div>

      <LogoCarousel />

      <div className="max-w-5xl mx-auto px-4 text-center mt-10 md:mt-14">
        <h3 className="heading text-3xl md:text-5xl text-[#1A1A1A] leading-tight">
          Construimos relaciones basadas en confianza acompañando a cada cliente{" "}
          <span className="text-[#e65b2a]">¿Tu empresa será la próxima?</span>
        </h3>
      </div>

    </section>
  );
};

export default Clients;
