import React from 'react';

const Company = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nuestra Empresa
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Somos una empresa líder en servicios industriales con más de 20 años de experiencia 
                en el mercado. Nos especializamos en brindar soluciones integrales para la industria 
                minera y manufacturera.
              </p>
              <p>
                Nuestro compromiso con la excelencia y la innovación nos ha posicionado como un 
                socio estratégico de confianza para nuestros clientes. Contamos con un equipo 
                altamente calificado y tecnología de vanguardia.
              </p>
              <p>
                Trabajamos bajo los más altos estándares de calidad y seguridad, garantizando 
                resultados excepcionales en cada proyecto que emprendemos.
              </p>
            </div>
          </div>
          <div className="animate-slide-in-left">
            <img 
              src="/nuestra-empresa.jpg" 
              alt="Nuestra empresa - Instalaciones industriales" 
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;