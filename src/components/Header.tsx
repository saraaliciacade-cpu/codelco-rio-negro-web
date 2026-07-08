import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, Factory, Wrench, Truck, Zap, ChevronRight } from 'lucide-react';
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

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const servicesSubmenu = [
    { name: t('nav.sub.fabrica'), href: '/fabrica', Icon: Factory },
    { name: t('nav.sub.metalurgica'), href: '/metalurgica', Icon: Wrench },
    { name: t('nav.sub.rental'), href: '/rental', Icon: Truck },
    { name: t('nav.sub.generators'), href: '/grupos-electrogenos', Icon: Zap },
  ];

  const menuItems = [
    { name: t('nav.services'), href: '/#servicios', submenu: servicesSubmenu },
    { name: t('nav.whyUs'), href: '/#por-que-elegirnos' },
    { name: t('nav.clients'), href: '/#clientes' },
    { name: t('nav.news'), href: '/novedades' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-white/10 transition-colors duration-300 ${
        isScrolled ? 'bg-[#1A1A1A]/90 backdrop-blur-sm' : 'bg-[#1A1A1A]'
      }`}
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Language Selector */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png" alt="Codelco S.A." className="h-8 w-auto brightness-0 invert" />
            </Link>

            {/* Desktop language selector (mobile has its own inside the drawer) */}
            <div className="relative hidden md:block">
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
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="relative text-sm font-medium text-white/85 hover:text-white transition-all duration-300 ease-in-out flex items-center overflow-hidden"
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
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-[#1A1A1A] border border-white/10 rounded-md shadow-xl overflow-hidden min-w-[200px]">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-4 py-2.5 text-sm text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                          style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/#contacto"
              className="ml-2 inline-flex items-center justify-center rounded-sm bg-[#e04d1c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c94418] transition-colors"
              style={{ fontFamily: 'Nunito Sans, sans-serif' }}
            >
              {t('nav.quote')}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ml-auto text-white hover:bg-white/10 hover:text-white z-[60] relative ${isMenuOpen ? 'invisible pointer-events-none' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Drawer — slides in from the right, full screen */}
      {/* Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />
      {/* Panel */}
      <aside
        aria-hidden={!isMenuOpen}
        className={`md:hidden fixed top-0 right-0 z-50 h-[100dvh] w-full sm:w-[86%] max-w-sm bg-[#0f0f0f] text-white shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
        style={{ fontFamily: 'Nunito Sans, sans-serif' }}
      >
        {/* Header row inside drawer */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <img
            src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png"
            alt="Codelco S.A."
            className="h-7 w-auto brightness-0 invert"
          />
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label={t('nav.closeMenu')}
            className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Services group with icons */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#e04d1c] mb-3">
            {t('nav.services')}
          </p>
          <ul className="space-y-1 mb-8">
            {servicesSubmenu.map((sub, idx) => (
              <li
                key={sub.href}
                className={`transform transition-all duration-500 ease-out ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? `${120 + idx * 60}ms` : '0ms' }}
              >
                <Link
                  to={sub.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-between py-3 border-b border-white/5 hover:text-[#e04d1c] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <sub.Icon className="h-5 w-5 text-[#e04d1c]" strokeWidth={1.75} />
                    <span className="text-base font-medium">{sub.name}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Rest of the nav (no icons) */}
          <ul className="space-y-1 mb-8">
            {menuItems.slice(1).map((item, idx) => (
              <li
                key={item.href}
                className={`transform transition-all duration-500 ease-out ${
                  isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
                }`}
                style={{ transitionDelay: isMenuOpen ? `${360 + idx * 60}ms` : '0ms' }}
              >
                <Link
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 text-lg font-semibold hover:text-[#e04d1c] transition-colors border-b border-white/5"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/#contacto"
            onClick={() => setIsMenuOpen(false)}
            className={`inline-flex w-full items-center justify-center rounded-sm bg-[#e04d1c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#c94418] transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }}
          >
            {t('nav.quote')}
          </Link>
        </div>

        {/* Language selector pinned at the bottom */}
        <div className="border-t border-white/10 px-6 py-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            {t('nav.language')}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLanguage('es')}
              className={`px-3 py-2.5 rounded-sm text-sm font-medium transition-colors text-left ${
                language === 'es'
                  ? 'bg-[#e04d1c] text-white'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              <span className="block text-[10px] uppercase tracking-wider opacity-70">ARG</span>
              Español
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-2.5 rounded-sm text-sm font-medium transition-colors text-left ${
                language === 'en'
                  ? 'bg-[#e04d1c] text-white'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              <span className="block text-[10px] uppercase tracking-wider opacity-70">USA</span>
              English
            </button>
          </div>
        </div>
      </aside>
    </header>
  );
};

export default Header;
