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
    <section className="py-15 bg-background">
      <div className="container mx-auto px-4 w-full"> {/* px-4 para espacio en bordes */}
        <div>
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{ color: '#333333' }}>NUESTRA </span>
            <span style={{ color: '#d25840' }}>EMPRESA</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 items-center px-4 max-w-full mx-auto"> {/* gap-8 para espacio entre texto e imagen, px-4 para bordes */}
          {/* Company Text */}
          <div className="space-y-6 order-1 lg:pr-8 max-w-prose"> {/* space-y-6 para espacio interno en texto */}
            <h3 className="font-bold text-foreground mb-5 font-montserrat text-xl">CODELCO S.A.</h3>
            <div className="space-y-5 text-foreground leading-normal text-body font-nunito">
              <p className="text-justify text-xs">
                Comenzamos nuestra actividad en el año 2012, coincidiendo con el crecimiento acelerado
                de las necesidades de la industria petrolera (perforaciones de pozos no convencionales- Vaca Muerta).
                Para ese momento, nuestra empresa ya había incursionado en el sector Rental de Trailers,
                piletas de almacenamiento y Pick Ups.
              </p>
              <p className="text-justify text-xs">
                Teniendo en cuenta la demanda, tanto de unidades como mejoras en calidad, tomamos la decisión
                de incorporar tecnología como Panelera, guillotina, plegadora, corte de plasma por CNC,
                soldadoras semiautomáticas, etc., que con el acompañamiento de personal capacitado,
                nos llevó a posicionarnos muy bien en el mercado de fabricación de Módulos Habitacionales
                orientados al sector petrolero, como así también en la fabricación de Piletas de Acumulación,
                Tanques API, Contenedores y trabajos especiales como equipos de control de sólidos integrados
                y un equipo automatizado de verificación técnica.
              </p>
              <p className="text-justify text-xs">
                Actualmente, junto a nuestro equipo de Ingeniería y Desarrollo (I+D) estamos incursionando
                en el tema de soluciones habitacionales tanto para familias como para oficinas.
              </p>
            </div>
          </div>
          {/* Company Image */}
          <div className="order-2 animate-slide-in-right">
            <div className="relative">
              <img src="/nuestra-empresa.jpg" alt="Flota de vehículos Codelco" className="w-full max-w-none h-auto object-contain rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;