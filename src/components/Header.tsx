import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  const menuItems = [
    { name: t('nav.inicio'), href: '#inicio' },
    { name: t('nav.empresa'), href: '#company' },
    { name: t('nav.areas'), href: '#servicios' },
    { name: t('nav.galeria'), href: '#galeria' },
    { name: t('nav.contacto'), href: '#contacto' },
  ];

  return (
    <header className="bg-background/60 backdrop-blur-md border-b border-muted/50 sticky top-0 z-50"> {/* Cambiado a /60 para más transparencia */}
      <div className="container mx-auto px-8 max-w-7xl py-3 bg-transparent">
        <div className="flex items-center justify-between">
          {/* Language Selector and Logo */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="flex items-center space-x-2 font-medium text-foreground hover:text-primary transition-colors duration-300"
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
                <div className="absolute top-full left-0 mt-2 bg-background border border-muted rounded-lg shadow-lg overflow-hidden z-50 min-w-[140px]">
                  <button
                    onClick={() => {
                      setLanguage('es');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left hover:bg-muted transition-colors ${language === 'es' ? 'bg-muted text-primary' : 'text-foreground'}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs leading-none">ARG</span>
                      <span className="text-sm leading-none">Español</span>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left hover:bg-muted transition-colors ${language === 'en' ? 'bg-muted text-primary' : 'text-foreground'}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs leading-none">EEUU</span>
                      <span className="text-sm leading-none">English</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            <img src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png" alt="Codelco S.A." className="h-8 w-auto" />
          </div>
          {/* Desktop Navigation - positioned more to the right with more spacing */}
          <nav className="hidden md:flex items-center space-x-8 ml-auto">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium text-foreground hover:text-primary transition-all duration-300 ease-in-out group flex items-center overflow-hidden"
                style={{ fontFamily: 'Nunito Sans, sans-serif' }}
              >
                {/* Animated icon */}
                <img
                  src="/logo24.png"
                  alt="Icon"
                  className="h-4 w-4 mr-2 opacity-0 transform -translate-x-4 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                />
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden ml-auto" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 pb-2 border-t border-muted pt-2">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ fontFamily: 'Nunito Sans, sans-serif' }}
                >
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;