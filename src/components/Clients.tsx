// Import client logos
import comprescoLogo from '@/assets/clients/compresco.jpeg';
import crexellLogo from '@/assets/clients/crexell.png';
import datumLogo from '@/assets/clients/datum.png';
import egServiciosLogo from '@/assets/clients/eg-servicios.png';
import edvsaLogo from '@/assets/clients/edvsa.png';
import emergenciasLogo from '@/assets/clients/emergencias.png';
import flargentLogo from '@/assets/clients/flargent.jpg';
import hidromecLogo from '@/assets/clients/hidromec.jpeg';
import hotHedLogo from '@/assets/clients/hot-hed.png';
import indasycLogo from '@/assets/clients/indasyc.png';

const Clients = () => {
  // First 10 clients with actual logos
  const clientsRow1 = [
    { name: "Compresco", logo: comprescoLogo },
    { name: "Transportes Crexell S.A.", logo: crexellLogo },
    { name: "Datum S.A.", logo: datumLogo },
    { name: "E&G Servicios SRL", logo: egServiciosLogo },
    { name: "Edvsa", logo: edvsaLogo },
    { name: "Emergencias", logo: emergenciasLogo },
    { name: "Flargent S.A.", logo: flargentLogo },
    { name: "Hidromec SRL", logo: hidromecLogo },
    { name: "Hot Hed S.A.", logo: hotHedLogo },
    { name: "Indasyc", logo: indasycLogo },
  ];

  // Placeholder for next 10 (will be updated when you provide the images)
  const clientsRow2 = [
    { name: "Oilstone", logo: comprescoLogo }, // Placeholder
    { name: "Compañía TSB", logo: crexellLogo }, // Placeholder
    { name: "San Antonio Internacional", logo: datumLogo }, // Placeholder
    { name: "Servicios Especiales San Antonio S.A.", logo: egServiciosLogo }, // Placeholder
    { name: "Tetra Technologies", logo: edvsaLogo }, // Placeholder
    { name: "Net Log S.A.", logo: emergenciasLogo }, // Placeholder
    { name: "Prodeng S.A.", logo: flargentLogo }, // Placeholder
    { name: "Rakiduam S.A.", logo: hidromecLogo }, // Placeholder
    { name: "Ranger Oil S.A.", logo: hotHedLogo }, // Placeholder
    { name: "Tuboscope Vetco de Argentina", logo: indasycLogo }, // Placeholder
  ];

  // Placeholder for last 10 (will be updated when you provide the images)
  const clientsRow3 = [
    { name: "SL Group Oil Solutions", logo: comprescoLogo }, // Placeholder
    { name: "Tacker SRL", logo: crexellLogo }, // Placeholder
    { name: "Tecpetrol S.A.", logo: datumLogo }, // Placeholder
    { name: "Quimpe SRL", logo: egServiciosLogo }, // Placeholder
    { name: "Wintershall", logo: edvsaLogo }, // Placeholder
    { name: "25 de Mayo S.A.", logo: emergenciasLogo }, // Placeholder
    { name: "LyG Servicios SRL", logo: flargentLogo }, // Placeholder
    { name: "Tomrel S.A.", logo: hidromecLogo }, // Placeholder
    { name: "Transporte Ferra S.A.", logo: hotHedLogo }, // Placeholder
    { name: "Ingenieria Terra S.A.", logo: indasycLogo }, // Placeholder
  ];

  const renderCarouselRow = (clients: typeof clientsRow1, animationDelay = 0) => (
    <div className="relative overflow-hidden w-full">
      <div 
        className="flex animate-infinite-scroll"
        style={{
          animationDelay: `${animationDelay}s`,
          animationDuration: '30s'
        }}
      >
        {/* First set */}
        {clients.map((client, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 w-48 mx-6 flex flex-col items-center justify-center"
          >
            <div className="h-20 w-40 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3">
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <p className="text-sm text-gray-600 text-center font-medium leading-tight">
              {client.name}
            </p>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {clients.map((client, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 w-48 mx-6 flex flex-col items-center justify-center"
          >
            <div className="h-20 w-40 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-3">
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <p className="text-sm text-gray-600 text-center font-medium leading-tight">
              {client.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="titulo-seccion font-ramabhadra">
            <span style={{color: '#333333'}}>NUESTROS </span>
            <span style={{color: '#d25840'}}>CLIENTES</span>
          </h2>
        </div>

        <div className="space-y-12">
          {/* Row 1 */}
          {renderCarouselRow(clientsRow1, 0)}
          
          {/* Row 2 - Different animation delay for varied movement */}
          {renderCarouselRow(clientsRow2, 10)}
          
          {/* Row 3 - Different animation delay for varied movement */}
          {renderCarouselRow(clientsRow3, 20)}
        </div>
      </div>
    </section>
  );
};

export default Clients;