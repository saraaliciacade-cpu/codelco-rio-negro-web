import { Link } from 'react-router-dom';
import codelcoLogo from '@/assets/codelco-logo-footer.png';
import organicLogo from '@/assets/logo-organic.png';
import { useLanguage } from '@/contexts/LanguageContext';

const copy = {
  es: {
    description: 'Servicios industriales para el sector petrolero en la Patagonia argentina. Fabricación, metalúrgica y rental desde 2012.',
    divisiones: 'DIVISIONES',
    modulos: 'Módulos Habitacionales',
    metalurgica: 'Metalúrgica',
    rental: 'Rental',
    generadores: 'Grupos Electrógenos',
    empresa: 'EMPRESA',
    porQueElegirnos: 'Por qué elegirnos',
    clientes: 'Clientes',
    novedades: 'Novedades',
    contacto: 'Contacto',
    personalCodelco: 'Personal Codelco',
    rights: '© 2026 Codelco S.A. — Ruta 22 Km 1214, Cipolletti, Río Negro, Argentina',
    creador: 'Creador del Sitio Web:',
  },
  en: {
    description: 'Industrial services for the oil sector in Argentine Patagonia. Manufacturing, metalworking and rental since 2012.',
    divisiones: 'DIVISIONS',
    modulos: 'Housing Modules',
    metalurgica: 'Metalworking',
    rental: 'Rental',
    generadores: 'Generator Sets',
    empresa: 'COMPANY',
    porQueElegirnos: 'Why choose us',
    clientes: 'Clients',
    novedades: 'News',
    contacto: 'Contact',
    personalCodelco: 'Codelco Staff',
    rights: '© 2026 Codelco S.A. — Ruta 22 Km 1214, Cipolletti, Río Negro, Argentina',
    creador: 'Website by:',
  },
} as const;

const Footer = () => {
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <footer className="text-white" style={{ backgroundColor: '#0f0f0f' }}>
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 max-w-7xl py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img src={codelcoLogo} alt="Codelco" className="h-10 w-auto" />
            <p className="text-white/50 font-nunito text-sm leading-relaxed max-w-xs">
              {c.description}
            </p>
          </div>

          {/* Divisiones */}
          <div>
            <h3 className="text-white font-extrabold font-montserrat text-sm tracking-widest mb-5">{c.divisiones}</h3>
            <ul className="space-y-3 font-nunito text-sm">
              <li><Link to="/fabrica" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.modulos}</Link></li>
              <li><Link to="/metalurgica" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.metalurgica}</Link></li>
              <li><Link to="/rental" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.rental}</Link></li>
              <li><Link to="/grupos-electrogenos" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.generadores}</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-white font-extrabold font-montserrat text-sm tracking-widest mb-5">{c.empresa}</h3>
            <ul className="space-y-3 font-nunito text-sm">
              <li><Link to="/#por-que-elegirnos" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.porQueElegirnos}</Link></li>
              <li><Link to="/clientes" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.clientes}</Link></li>
              <li><Link to="/novedades" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.novedades}</Link></li>
              <li><Link to="/#contacto" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.contacto}</Link></li>
              <li><a href="https://webmail.codelco.com.ar" target="_blank" rel="noopener noreferrer nofollow" className="text-white/60 hover:text-[#e04d1c] transition-colors">{c.personalCodelco}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-nunito text-white/40">
            <p>{c.rights}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://organicdesign.com.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 transition-colors"
              >
                {c.creador}
              </a>
              <a href="https://organicdesign.com.ar/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={organicLogo} alt="Organic Design" className="h-8 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
