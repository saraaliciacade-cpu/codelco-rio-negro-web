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
import wintershallLogo from '@/assets/clients/wintershall-new.png';
import technipFmcLogo from '@/assets/clients/technip-fmc.webp';
import tecpetrolLogo from '@/assets/clients/tecpetrol-new.png';
import tetraLogo from '@/assets/clients/tetra.png';
import tomrelLogo from '@/assets/clients/tomrel.png';
import tackerLogo from '@/assets/clients/tacker-new.png';
import transporteFerraLogo from '@/assets/clients/transporte-ferra.png';
import tsbLogo from '@/assets/clients/tsb-new.png';
import tuboscopeLogo from '@/assets/clients/tuboscope.jpg';
import veinticincoMayoLogo from '@/assets/clients/25-de-mayo-new.png';

const ClientsPage = () => {
  // All clients combined
  const allClients = [
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

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="text-[#333333]">Nuestros </span>
          <span className="text-[#d25840]">Clientes</span>
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {allClients.map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div className="h-28 w-48 p-4 flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-200">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-sm text-gray-800 text-center font-bold leading-tight px-2 mt-3">
                {client.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
