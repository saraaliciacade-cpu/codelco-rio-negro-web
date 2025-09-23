// Import client logos - Row 1
import comprescoLogo from '@/assets/clients/compresco.jpeg';
import crexellLogo from '@/assets/clients/crexell.png';
import datumLogo from '@/assets/clients/datum.png';
import egServiciosLogo from '@/assets/clients/eg-servicios.png';
import edvsaLogo from '@/assets/clients/edvsa.png';
import emergenciasLogo from '@/assets/clients/emergencias-new.png';
import flargentLogo from '@/assets/clients/flargent.jpg';
import hidromecLogo from '@/assets/clients/hidromec-new.jpeg';
import hotHedLogo from '@/assets/clients/hot-hed.png';
import indasycLogo from '@/assets/clients/indasyc-new.png';

// Import client logos - Row 2
import slGroupLogo from '@/assets/clients/sl-group.jpg';
import ingenieriaLogo from '@/assets/clients/ingenieria-terra.png';
import lygServiciosLogo from '@/assets/clients/lyg-servicios-new.jpeg';
import netlogLogo from '@/assets/clients/netlog.png';
import oilstoneLogo from '@/assets/clients/oilstone-new.jpg';
import prodengLogo from '@/assets/clients/prodeng.png';
import quimpeLogo from '@/assets/clients/quimpe-new.png';
import rakiduamLogo from '@/assets/clients/rakiduam.png';
import rangerOilLogo from '@/assets/clients/ranger-oil-new.png';
import sanAntonioLogo from '@/assets/clients/san-antonio-new.png';

// Import client logos - Row 3
import wintershallLogo from '@/assets/clients/wintershall.png';
import technipFmcLogo from '@/assets/clients/technip-fmc.webp';
import tecpetrolLogo from '@/assets/clients/tecpetrol-new.png';
import tetraLogo from '@/assets/clients/tetra.png';
import tomrelLogo from '@/assets/clients/tomrel.png';
import tackerLogo from '@/assets/clients/tacker.png';
import transporteFerraLogo from '@/assets/clients/transporte-ferra.png';
import tsbLogo from '@/assets/clients/tsb-new.png';
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

  const renderCarouselRow = (clients: typeof clientsRow1, animationDelay = 0) => {
    // Calculate total width needed for seamless infinite scroll
    const totalLogos = clients.length;
    const logoWidth = 224; // w-56 = 224px
    const logoMargin = 64; // mx-8 = 32px on each side = 64px total
    const totalWidth = totalLogos * (logoWidth + logoMargin);

    return (
      <div className="relative overflow-hidden w-full">
        <div 
          className="flex animate-infinite-scroll-smooth"
          style={{
            animationDelay: `${animationDelay}s`,
            animationDuration: '80s',
            width: `${totalWidth * 2}px` // Double width for seamless loop
          }}
        >
          {/* Double the logos for seamless infinite scroll */}
          {[...Array(2)].map((_, setIndex) => 
            clients.map((client, index) => (
              <div
                key={`${setIndex}-${index}`}
                className="flex-shrink-0 w-56 mx-8 flex flex-col items-center justify-center group"
              >
                <div className="h-24 w-48 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-4 group-hover:shadow-xl transition-all duration-500 ease-in-out">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 ease-in-out"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center font-semibold leading-tight px-2 group-hover:text-gray-800 transition-colors duration-300">
                  {client.name}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="titulo-seccion font-ramabhadra">
          <span style={{color: '#333333'}}>NUESTROS </span>
          <span style={{color: '#d25840'}}>CLIENTES</span>
        </h2>
      </div>

      <div className="space-y-8">
        {/* Row 1 */}
        {renderCarouselRow(clientsRow1, 0)}
        
        {/* Row 2 - 5 second delay for staggered effect */}
        {renderCarouselRow(clientsRow2, 5)}
        
        {/* Row 3 - 10 second delay for staggered effect */}
        {renderCarouselRow(clientsRow3, 10)}
      </div>
    </section>
  );
};

export default Clients;