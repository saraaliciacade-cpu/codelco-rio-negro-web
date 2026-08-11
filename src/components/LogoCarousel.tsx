import { clientsRow1, clientsRow2, clientsRow3 } from '@/data/clients';


const renderCarouselRow = (
  clients: typeof clientsRow1,
  animationDelay = 0,
  startFromMiddle = false,
  reverse = false,
  fullColor = false
) => {
  return (
    <div className="clients-row group/row relative overflow-x-hidden overflow-y-visible w-full py-4">
      <div
        className={`flex ${reverse ? 'animate-infinite-scroll-reverse' : 'animate-infinite-scroll-smooth'} clients-carousel`}
        style={{
          animationDelay: `${animationDelay}s`,
          transform: startFromMiddle ? 'translateX(-50%)' : 'translateX(0)',
        }}
      >
        {[...Array(2)].map((_, setIndex) =>
          clients.map((client, index) => (
            <div
              key={`${setIndex}-${index}`}
              className={`flex-shrink-0 w-40 md:w-56 mx-4 md:mx-8 flex flex-col items-center justify-center group/item transition-all duration-300 ease-out opacity-100 hover:!opacity-100 ${fullColor ? '' : 'group-hover/row:opacity-40'}`}
            >
              <div className="h-20 md:h-24 w-36 md:w-48 p-4 md:p-6 mb-3 md:mb-4 flex items-center justify-center bg-white rounded-xl shadow-lg border-2 border-gray-200 transition-all duration-300 ease-out group-hover/item:border-[#e65b2a] group-hover/item:scale-105">
                <img
                  src={client.logo}
                  alt={`${client.name} — cliente de Codelco S.A.`}
                  className={`max-h-full max-w-full object-contain transition-all duration-300 ease-out ${fullColor ? '' : 'grayscale group-hover/item:grayscale-0'}`}
                />
              </div>
              <p className="text-xs md:text-sm text-foreground text-center font-bold leading-tight px-2 transition-colors duration-300 group-hover/item:text-[#e65b2a]">
                {client.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


const LogoCarousel = ({ fullColor = false }: { fullColor?: boolean }) => {
  return (
    <div className="space-y-6 md:space-y-8 overflow-x-hidden overflow-y-visible">
      {renderCarouselRow(clientsRow1, 0, false, false, fullColor)}
      {renderCarouselRow(clientsRow2, 0, true, true, fullColor)}
      {renderCarouselRow(clientsRow3, 0, false, false, fullColor)}
    </div>
  );
};

export default LogoCarousel;
