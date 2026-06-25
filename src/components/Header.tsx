import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Divisiones', href: '#servicios' },
    { name: '¿Por qué elegirnos?', href: '#por-que-elegirnos' },
    { name: 'Clientes', href: '#clientes' },
    { name: 'Novedades', href: '/novedades' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 transition-colors duration-300 ${
        isScrolled ? 'bg-[#1A1A1A]/90 backdrop-blur-sm' : 'bg-[#1A1A1A]'
      }`}
    >
      <div className="container mx-auto px-8 max-w-7xl py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Language Selector */}
          <div className="flex items-center space-x-6">
            <a href="#inicio" className="flex items-center">
              <img src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png" alt="Codelco S.A." className="h-8 w-auto brightness-0 invert" />
            </a>

            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 font-medium text-white/80 hover:text-primary transition-colors duration-300"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                aria-label={t('nav.changeLanguage')}
                aria-expanded={isLanguageMenuOpen}
              >
                <Globe className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs leading-none">{language === 'es' ? 'ARG' : 'EEUU'}</span>
                  <span className="text-sm leading-none">{language === 'es' ? 'Español' : 'English'}</span>
                </div>
              </button>

              {isLanguageMenuOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[#1A1A1A] border border-white/10 rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]">
                  <button
                    onClick={() => { setLanguage('es'); setIsLanguageMenuOpen(false); }}
                    className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${language === 'es' ? 'bg-white/10 text-primary' : 'text-white/90'}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs leading-none">ARG</span>
                      <span className="text-sm leading-none">Español</span>
                    </div>
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setIsLanguageMenuOpen(false); }}
                    className={`block w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${language === 'en' ? 'bg-white/10 text-primary' : 'text-white/90'}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs leading-none">EEUU</span>
                      <span className="text-sm leading-none">English</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-white/85 hover:text-white transition-all duration-300 ease-in-out group flex items-center overflow-hidden"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                <img
                  src="/logo24.png"
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 mr-2 opacity-0 transform -translate-x-4 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                />
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            ))}
            <a
              href="#contacto"
              className="ml-2 inline-flex items-center justify-center rounded-sm bg-[#e04d1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c94418] transition-colors"
              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
            >
              Solicitar presupuesto
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-auto text-white hover:bg-white/10 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 pb-2 border-t border-white/10 pt-2">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-white/85 hover:text-primary transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex w-fit items-center justify-center rounded-sm bg-[#e04d1c] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c94418] transition-colors"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                Solicitar presupuesto
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
