import React, { useEffect } from 'react';

const Company = () => {
  useEffect(() => {
    const imageDiv = document.querySelector('.animate-slide-in-right');
    if (imageDiv) {
      imageDiv.classList.add('opacity-0');
      setTimeout(() => {
        if (imageDiv) imageDiv.classList.remove('opacity-0');
      }, 100);
    }
  }, []);

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-8">
        <div className="text-center mb-8">
          <h2 className="titulo-seccion font-ramabhadra inline-block text-4xl"> {/* Aumentado text-4xl para título más grande */}
            <span style={{ color: '#333333' }}>NUESTRA </span>
            <span style={{ color: '#d25840' }}>EMPRESA</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto px-8"> {/* Aumentado gap-6 a gap-12 para más espacio en el medio */}
          {/* Company Text */}
          <div className="space-y-4 order-1 text-center lg:text-left max-w-md">
            <h3 className="font-bold text-foreground mb-4 font-montserrat text-2xl"> {/* Aumentado text-xl a text-2xl */}
              CODELCO S.A.
            </h3>
            <div className="space-y-4 text-foreground leading-normal text-body font-nunito">
              <p className="text-justify text-base"> {/* Aumentado text-xs a text-base para texto más grande */}
                Comenzamos nuestra actividad en el año 2012, coincidiendo con el crecimiento acelerado
                de las necesidades de la industria petrolera (perforaciones de pozos no convencionales- Vaca Muerta).
                Para ese momento, nuestra empresa ya había incursionado en el sector Rental de Trailers,
                piletas de almacenamiento y Pick Ups.
              </p>
              <p className="text-justify text-base">
                Teniendo en cuenta la demanda, tanto de unidades como mejoras en calidad, tomamos la decisión
                de incorporar tecnología como Panelera, guillotina, plegadora, corte de plasma por CNC,
                soldadoras semiautomáticas, etc., que con el acompañamiento de personal capacitado,
                nos llevó a posicionarnos muy bien en el mercado de fabricación de Módulos Habitacionales
                orientados al sector petrolero, como así también en la fabricación de Piletas de Acumulación,
                Tanques API, Contenedores y trabajos especiales como equipos de control de sólidos integrados
                y un equipo automatizado de verificación técnica.
              </p>
              <p className="text-justify text-base">
                Actualmente, junto a nuestro equipo de Ingeniería y Desarrollo (I+D) estamos incursionando
                en el tema de soluciones habitacionales tanto para familias como para oficinas.
              </p>
            </div>
          </div>
          {/* Company Image */}
          <div className="order-2 animate-slide-in-right flex justify-center">
            <div className="relative w-full max-w-lg">
              <img src="/nuestra-empresa.jpg" alt="Flota de vehículos Codelco" className="w-full h-auto object-contain rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;