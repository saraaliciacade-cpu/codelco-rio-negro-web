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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Nuestros Clientes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empresas que confían en nuestros servicios industriales de calidad
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-lg p-6 hover:shadow-soft transition-all duration-300 hover:scale-105 min-h-[120px] flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-3 mx-auto">
                  <span className="text-white font-bold text-lg">
                    {client.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground leading-tight">
                  {client}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;