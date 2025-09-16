import { MapPin, Mail, Phone } from 'lucide-react';
import codelcoLogo from '@/assets/codelco-logo.png';

const Footer = () => {
  return (
    <footer className="text-white py-12" style={{backgroundColor: '#333333'}}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/4e9dfae6-c0eb-4f51-b236-7cf5da74d7a9.png" 
              alt="Codelco S.A." 
              className="h-16 w-auto"
            />
            <p className="text-white/80 leading-relaxed font-nunito">
              Empresa argentina especializada en servicios industriales, productos y rental de equipos para el sector industrial.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">Nuestros Servicios</h3>
            <ul className="space-y-2 text-white/80 font-nunito">
              <li>• Servicios Industriales</li>
              <li>• Productos Especializados</li>
              <li>• Rental de Equipos</li>
              <li>• Consultoría Técnica</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 font-montserrat">Información de Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-light" />
                <span className="text-white/80 font-nunito">Ruta 22 Km.1114, Cipolletti - Río Negro</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-light" />
                <span className="text-white/80 font-nunito">ventas@codelco.com.ar</span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-primary-light mt-0.5" />
                <div className="text-white/80 font-nunito">
                  <div>Rental: (299) 571 4217</div>
                  <div>Compras: (299) 571 4661</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="font-nunito text-white">
            © {new Date().getFullYear()} Codelco S.A. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;