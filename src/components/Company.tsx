const Company = () => {
  return (
    <section className="py-32 bg-secondary/30">
      <div className="container mx-auto px-8 max-w-8xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Nuestra Empresa
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-8xl mx-auto items-center">
          {/* Company Text */}
          <div className="space-y-8">
            <h3 className="text-4xl font-bold text-foreground mb-8">CODELCO S.A.</h3>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
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
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/0d0ca016-4bdf-4961-872b-f8420e63a6f1.png" 
                alt="Flota de vehículos Codelco" 
                className="rounded-lg shadow-soft max-w-full h-auto hover:shadow-strong transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;