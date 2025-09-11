import { MapPin, Mail, Phone } from 'lucide-react';
import codelcoLogo from '@/assets/codelco-logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-hero text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src={codelcoLogo} 
              alt="Codelco S.A." 
              className="h-12 w-auto filter brightness-0 invert"
            />
            <p className="text-white/80 leading-relaxed">
              Empresa argentina especializada en servicios industriales, productos y rental de equipos para el sector industrial.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Información de Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-light" />
                <span className="text-white/80">Ruta 22 Km.1114, Cipolletti - Río Negro</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-light" />
                <span className="text-white/80">ventas@codelco.com.ar</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-light" />
                <span className="text-white/80">Rental: (299) 571 4217</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-light" />
                <span className="text-white/80">Compras: (299) 571 4661</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Nuestros Servicios</h3>
            <ul className="space-y-2 text-white/80">
              <li>• Servicios Industriales</li>
              <li>• Productos Especializados</li>
              <li>• Rental de Equipos</li>
              <li>• Consultoría Técnica</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} Codelco S.A. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;