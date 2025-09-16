import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import codelcoLogo from '@/assets/codelco-logo.png';
import searchIcon from '@/assets/search-icon.png';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [{
    name: 'Inicio',
    href: '#inicio'
  }, {
    name: 'Empresa',
    href: '#company'
  }, {
    name: 'Nuestras Areas',
    href: '#servicios'
  }, {
    name: 'Galería',
    href: '#galeria'
  }, {
    name: 'Contacto',
    href: '#contacto'
  }, {
    name: 'Buscar',
    href: '#buscar',
    isSearch: true
  }];
  return <header className="bg-background border-b border-muted sticky top-0 z-50">
      <div className="container mx-auto px-20 max-w-4xl py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png" alt="Codelco S.A." className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative">
            {menuItems.map(item => <a key={item.name} href={item.href} className="relative text-body font-normal text-foreground hover:text-primary transition-all duration-300 ease-in-out group flex items-center space-x-1">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.isSearch ? <img src={searchIcon} alt="Buscar" className="h-3 w-3" /> : <img src={searchIcon} alt="Active" className="h-3 w-3" />}
                </span>
                
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </a>)}
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-2 pb-2 border-t border-muted pt-2">
            <div className="flex flex-col space-y-2">
              {menuItems.map(item => <a key={item.name} href={item.href} className="text-body font-normal text-foreground hover:text-primary transition-colors duration-300 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                  {item.isSearch ? <img src={searchIcon} alt="Buscar" className="h-4 w-4" /> : <span>{item.name}</span>}
                </a>)}
            </div>
          </nav>}
      </div>
    </header>;
};
export default Header;