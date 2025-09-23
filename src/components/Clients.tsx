// Import client logos - Row 1
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

// Import client logos - Row 2
import slGroupLogo from '@/assets/clients/sl-group.jpg';
import ingenieriaLogo from '@/assets/clients/ingenieria-terra.png';
import lygServiciosLogo from '@/assets/clients/lyg-servicios.jpeg';
import netlogLogo from '@/assets/clients/netlog.png';
import oilstoneLogo from '@/assets/clients/oilstone.png';
import prodengLogo from '@/assets/clients/prodeng.png';
import quimpeLogo from '@/assets/clients/quimpe.png';
import rakiduamLogo from '@/assets/clients/rakiduam.png';
import rangerOilLogo from '@/assets/clients/ranger-oil.png';
import sanAntonioLogo from '@/assets/clients/san-antonio.png';

// Import client logos - Row 3
import wintershallLogo from '@/assets/clients/wintershall.png';
import technipFmcLogo from '@/assets/clients/technip-fmc.webp';
import tecpetrolLogo from '@/assets/clients/tecpetrol.png';
import tetraLogo from '@/assets/clients/tetra.png';
import tomrelLogo from '@/assets/clients/tomrel.png';
import tackerLogo from '@/assets/clients/tacker.png';
import transporteFerraLogo from '@/assets/clients/transporte-ferra.png';
import tsbLogo from '@/assets/clients/tsb.png';
import tuboscopeLogo from '@/assets/clients/tuboscope.jpg';
import veinticincoMayoLogo from '@/assets/clients/25-de-mayo.png';

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

  // Second row with actual logos
  const clientsRow2 = [
    { name: "SL Group Oil Solutions", logo: slGroupLogo },
    { name: "Ingenieria Terra S.A.", logo: ingenieriaLogo },
    { name: "LyG Servicios SRL", logo: lygServiciosLogo },
    { name: "Net Log S.A.", logo: netlogLogo },
    { name: "Oilstone", logo: oilstoneLogo },
    { name: "Prodeng S.A.", logo: prodengLogo },
    { name: "Quimpe SRL", logo: quimpeLogo },
    { name: "Rakiduam S.A.", logo: rakiduamLogo },
    { name: "Ranger Oil S.A.", logo: rangerOilLogo },
    { name: "San Antonio Internacional", logo: sanAntonioLogo },
  ];

  // Third row with actual logos
  const clientsRow3 = [
    { name: "Wintershall", logo: wintershallLogo },
    { name: "Technip FMC", logo: technipFmcLogo },
    { name: "Tecpetrol S.A.", logo: tecpetrolLogo },
    { name: "Tetra Technologies", logo: tetraLogo },
    { name: "Tomrel S.A.", logo: tomrelLogo },
    { name: "Tacker SRL", logo: tackerLogo },
    { name: "Transportes Ferra S.A.", logo: transporteFerraLogo },
    { name: "Compañía TSB", logo: tsbLogo },
    { name: "Tuboscope Vetco Ar.", logo: tuboscopeLogo },
    { name: "25 de Mayo S.A.", logo: veinticincoMayoLogo },
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