// Import client logos - Row 1
import comprescoLogo from '@/assets/clients/compresco.jpeg';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
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

const Clients = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
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

  const renderCarouselRow = (clients: typeof clientsRow1, animationDelay = 0, startFromMiddle = false, reverse = false, duration = '45s') => {
    // Calculate total width needed for seamless infinite scroll - responsive sizes
    const totalLogos = clients.length;
    const logoWidth = isMobile ? 160 : 224; // w-40 (160px) mobile, w-56 (224px) desktop
    const logoMargin = isMobile ? 32 : 64; // mx-4 (32px) mobile, mx-8 (64px) desktop
    const totalWidth = totalLogos * (logoWidth + logoMargin);
    const adjustedDuration = isMobile ? '35s' : duration; // Faster on mobile

    return (
      <div className="relative overflow-hidden w-full">
        <div 
          className={`flex ${reverse ? 'animate-infinite-scroll-reverse' : 'animate-infinite-scroll-smooth'}`}
          style={{
            animationDelay: `${animationDelay}s`,
            animationDuration: adjustedDuration,
            width: `${totalWidth * 2}px`, // Double width for seamless loop
            transform: startFromMiddle ? 'translateX(-50%)' : 'translateX(0)'
          }}
        >
          {/* Double the logos for seamless infinite scroll */}
          {[...Array(2)].map((_, setIndex) => 
            clients.map((client, index) => (
              <div
                key={`${setIndex}-${index}`}
                className={`flex-shrink-0 ${isMobile ? 'w-40 mx-4' : 'w-56 mx-8'} flex flex-col items-center justify-center group`}
              >
                <div className={`${isMobile ? 'h-20 w-36 p-4 mb-3' : 'h-24 w-48 p-6 mb-4'} flex items-center justify-center bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-500 ease-in-out`}>
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[2000ms] ease-in-out"
                  />
                </div>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 text-center font-semibold leading-tight px-2 group-hover:text-gray-800 transition-colors duration-300`}>
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
    <section className={`${isMobile ? 'py-8' : 'py-12'} bg-white overflow-hidden`}>
      <div className={`text-center ${isMobile ? 'mb-8' : 'mb-16'}`}>
        <h2 className={`titulo-seccion font-ramabhadra ${isMobile ? 'text-3xl' : ''}`}>
          <span style={{color: '#333333'}}>{t('clients.title').split(' ')[0]} </span>
          <span style={{color: '#d25840'}}>{t('clients.title').split(' ')[1]}</span>
        </h2>
      </div>

      <div className={isMobile ? 'space-y-6' : 'space-y-8'}>
        {/* Row 1 - normal speed */}
        {renderCarouselRow(clientsRow1, 0, false, false, '45s')}
        
        {/* Row 2 - normal speed, reverse direction */}
        {renderCarouselRow(clientsRow2, 0, true, true, '45s')}
        
        {/* Row 3 - normal speed */}
        {renderCarouselRow(clientsRow3, 0, false, false, '45s')}
      </div>
    </section>
  );
};

export default Clients;