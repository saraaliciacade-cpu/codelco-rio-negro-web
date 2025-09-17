const Company = () => {
  return (
    <section className="py-15 bg-background">
      <div className="container mx-auto px-20 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-5 font-ramabhadra">
            <span style={{color: '#333333'}}>NUESTRA </span>
            <span style={{color: '#d25840'}}>EMPRESA</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 max-w-full mx-auto items-center px-6">
          {/* Company Text */}
          <div className="space-y-5">
            <h3 className="text-h2 font-bold text-foreground mb-5 font-montserrat">CODELCO S.A.</h3>
            
            <div className="space-y-5 text-foreground leading-normal text-body font-nunito">
              <p>
                Comenzamos nuestra actividad en el año 2012, coincidiendo con el crecimiento acelerado 
                de las necesidades de la industria petrolera (perforaciones de pozos no convencionales- Vaca Muerta). 
                Para ese momento, nuestra empresa ya había incursionado en el sector Rental de Trailers, 
                piletas de almacenamiento y Pick Ups.
              </p>
              
              <p>
                Teniendo en cuenta la demanda, tanto de unidades como mejoras en calidad, tomamos la decisión 
                de incorporar tecnología como Panelera, guillotina, plegadora, corte de plasma por CNC, 
                soldadoras semiautomáticas, etc., que con el acompañamiento de personal capacitado, 
                nos llevó a posicionarnos muy bien en el mercado de fabricación de Módulos Habitacionales 
                orientados al sector petrolero, como así también en la fabricación de Piletas de Acumulación, 
                Tanques API, Contenedores y trabajos especiales como equipos de control de sólidos integrados 
                y un equipo automatizado de verificación técnica.
              </p>
              
              <p>
                Actualmente, junto a nuestro equipo de Ingeniería y Desarrollo (I+D) estamos incursionando 
                en el tema de soluciones habitacionales tanto para familias como para oficinas.
              </p>
            </div>
          </div>

          {/* Company Image */}
          <div className="flex justify-center lg:justify-start lg:pl-8">
            <div className="relative">
              <img 
                src="/nuestra-empresa.jpg" 
                alt="Flota de vehículos Codelco" 
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;