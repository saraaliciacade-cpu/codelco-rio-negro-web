import { allClients } from '@/data/clients';


import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Services from '@/components/Services';
import LogoCarousel from '@/components/LogoCarousel';
import { useLanguage } from '@/contexts/LanguageContext';

const copy = {
  es: {
    trustHeading: 'Construimos relaciones basadas en confianza acompañando a cada cliente',
    trustCta: '¿Tu empresa será la próxima?',
  },
  en: {
    trustHeading: 'We build relationships based on trust, supporting every client',
    trustCta: 'Will your company be next?',
  },
} as const;

const ClientsPage = () => {
  const { t, language } = useLanguage();
  const c = copy[language];
  const [introVisible, setIntroVisible] = useState(true);
  const [introFading, setIntroFading] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setIntroFading(true), 1800);
    const hide = setTimeout(() => setIntroVisible(false), 3000);
    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  const allClients = [
    { name: "Compressco LP", logo: comprescoLogo },
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
    <div className="min-h-screen bg-white">
      {introVisible && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#e65b2a] transition-opacity duration-1000 ${introFading ? 'opacity-0' : 'opacity-100'}`}
        >
          <img
            src="/codelco-logo-footer.png"
            alt=""
            className="w-72 md:w-[30rem] max-w-[80vw] brightness-0 invert animate-scale-in"
          />
        </div>
      )}

      <Helmet>
        <title>+30 empresas del sector petrolero confían en Codelco S.A.</title>
        <meta name="description" content="Operadoras, contratistas y empresas de servicios de Vaca Muerta y la Patagonia trabajan con Codelco S.A. en fabricación, metalúrgica, rental y grupos electrógenos." />
        <link rel="canonical" href="https://codelco.com.ar/clientes" />
        <meta property="og:title" content="+30 empresas del sector petrolero confían en Codelco S.A." />
        <meta property="og:description" content="Conocé a los clientes que eligen a Codelco S.A. en la industria petrolera de Vaca Muerta y la Patagonia." />
        <meta property="og:url" content="https://codelco.com.ar/clientes" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Clientes de Codelco S.A.",
          "url": "https://codelco.com.ar/clientes",
          "about": allClients.map(c => ({ "@type": "Organization", "name": c.name }))
        })}</script>
      </Helmet>

      <Header />

      {/* Hero / Prueba Social */}
      <section className="pt-28 md:pt-32 pb-10 md:pb-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="eyebrow text-xs md:text-sm text-[#E84E1B] mb-4 font-bold">
            {t('clients.hero.eyebrow')}
          </p>
          <h1 className="heading text-3xl md:text-5xl text-[#1A1A1A] leading-tight mb-4">
            {t('clients.hero.title')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            {t('clients.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Carrusel de clientes (a todo color) */}
      <section className="pb-16 md:pb-20 bg-white overflow-hidden">
        <LogoCarousel fullColor />

        {/* Nombres de empresas como encabezados H2 para indexación SEO en Google */}
        <div className="max-w-6xl mx-auto px-4 mt-14 md:mt-20">
          <p className="eyebrow text-xs md:text-sm text-[#E84E1B] mb-3 font-bold text-center">
            +30 empresas del sector petrolero y energético
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {allClients.map((client) => (
              <h2
                key={client.name}
                className="text-sm md:text-base text-[#1A1A1A] font-medium border border-gray-200 px-4 py-4 text-center hover:border-[#e65b2a] hover:text-[#e65b2a] transition-colors"
              >
                {client.name}
              </h2>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center mt-14 md:mt-20">
          <h2 className="heading text-3xl md:text-5xl text-[#1A1A1A] leading-tight">
            {c.trustHeading}{" "}
            <span className="text-[#e65b2a]">{c.trustCta}</span>
          </h2>
        </div>
      </section>



      {/* Nuestras Divisiones */}
      <Services />

      {/* Contacto */}
      <Contact />

      <Footer />
    </div>
  );
};

export default ClientsPage;
