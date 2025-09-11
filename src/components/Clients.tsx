const Clients = () => {
  const clients = [
    "Oilstone", "Compañía TSB", "Emergencias", "San Antonio Internacional", 
    "Servicios Especiales San Antonio S.A.", "Tetra Tecnologies", "Transportes Crexell S.A.", 
    "Net Log S.A.", "Prodeng S.A.", "Rakiduam S.A.", "Ranger Oil S.A.", 
    "Tuboscope Vetco de Argentina", "Hidromec SRL", "Flargent S.A.", 
    "SL Group Oil Solutions", "Tacker SRL", "Tecpetrol S.A.", "Hot Hed S.A.", 
    "Edvsa", "Quimpe SRL", "E&G Servicios SRL", "Wintershall", "25 de Mayo S.A.", 
    "LyG Servicios SRL", "Tomrel S.A.", "Transporte Ferra S.A.", 
    "Ingenieria Terra S.A.", "Indasyc", "Datum S.A.", "Technip FMC", "Compresco"
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-8 max-w-8xl">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Nuestros Clientes
          </h2>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
            Empresas que confían en nuestros servicios industriales de calidad
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 max-w-8xl mx-auto">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 hover:shadow-soft transition-all duration-300 hover:scale-105 min-h-[100px] flex items-center justify-center"
            >
              <p className="text-base font-medium text-foreground text-center leading-tight">
                {client}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;