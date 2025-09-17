import React from 'react';

const Company = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="titulo-seccion">NUESTRA EMPRESA</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image with animation */}
          <div className="animate-slide-in-left">
            <img 
              src="/nuestra-empresa.jpg" 
              alt="Nuestra empresa - Operaciones industriales" 
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Nuestra empresa</strong> se especializa en la prestación de servicios industriales de alta calidad, 
                con más de una década de experiencia en el sector minero e industrial.
              </p>
              <p>
                Nos destacamos por nuestra capacidad de adaptación a las necesidades específicas de cada cliente, 
                ofreciendo soluciones integrales que van desde el mantenimiento preventivo hasta proyectos de gran envergadura.
              </p>
              <p>
                Nuestro equipo de profesionales altamente capacitados y nuestra moderna flota de equipos nos 
                permiten garantizar la excelencia en cada proyecto que emprendemos.
              </p>
              <p>
                Comprometidos con la seguridad, la calidad y el respeto por el medio ambiente, trabajamos 
                bajo los más altos estándares de la industria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;