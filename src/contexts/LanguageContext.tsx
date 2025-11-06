import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Header
    'nav.inicio': 'Inicio',
    'nav.empresa': 'Empresa',
    'nav.areas': 'Nuestras Areas',
    'nav.galeria': 'Galería',
    'nav.contacto': 'Contacto',
    
    // Hero
    'hero.title': 'UNA EMPRESA REGIONAL',
    'hero.description': 'Nuestro objetivo es proveerles a nuestros clientes un servicio integral, desde el asesoramiento inicial hasta la entrega final. Para ello, contamos con una planta de 3500m2, totalmente dedicada y equipada a la realización de nuestros productos y todo el personal necesario específicamente para cada sector.',
    'hero.button.services': 'Nuestros Servicios',
    'hero.button.contact': 'Contactanos',
    
    // Company
    'company.title': 'NUESTRA EMPRESA',
    'company.subtitle': 'CODELCO S.A.',
    'company.paragraph1': 'Comenzamos nuestra actividad en el año 2012, coincidiendo con el crecimiento acelerado de las necesidades de la industria petrolera (perforaciones de pozos no convencionales- Vaca Muerta). Para ese momento, nuestra empresa ya había incursionado en el sector Rental de Trailers, piletas de almacenamiento y Pick Ups.',
    'company.paragraph2': 'Teniendo en cuenta la demanda, tanto de unidades como mejoras en calidad, tomamos la decisión de incorporar tecnología como Panelera, guillotina, plegadora, corte de plasma por CNC, soldadoras semiautomáticas, etc., que con el acompañamiento de personal capacitado, nos llevó a posicionarnos muy bien en el mercado de fabricación de Módulos Habitacionales orientados al sector petrolero, como así también en la fabricación de Piletas de Acumulación, Tanques API, Contenedores y trabajos especiales como equipos de control de sólidos integrados y un equipo automatizado de verificación técnica.',
    'company.paragraph3': 'Actualmente, junto a nuestro equipo de Ingeniería y Desarrollo (I+D) estamos incursionando en el tema de soluciones habitacionales tanto para familias como para oficinas.',
    
    // Services
    'services.title': 'NUESTRAS ÁREAS',
    'services.factory.title': 'FÁBRICA',
    'services.factory.subtitle': 'Unidad, Módulos, Habitaciones y viviendas',
    'services.factory.description1': 'El sector de fabricación de módulos y viviendas esta preparado para cubrir todas las necesidades del cliente al momento de realizar su proyecto. Cuenta con una línea de producción completa, desde la oficina de ingeniería y diseño hasta las distintas áreas de producción que componen cada unidad, lo cual le proveerá asesoramiento competo en todas las etapas de construcción.',
    'services.factory.description2': 'Este sector produce todo tipo de módulos habitacionales ya sea con fines comerciales o de vivienda para las distintas industrias y además la modalidad de construcción "en seco" de viviendas familiares con las mejores características termo-acústicas disponibles en el mercado y la posibilidad de elegir el diseño a gusto del cliente.',
    'services.factory.button': 'Contáctanos',
    'services.metallurgical.title': 'METALÚRGICA',
    'services.metallurgical.subtitle': 'Equipos, Tanques, Subestructuras',
    'services.metallurgical.description1': 'La división Metalúrgica está orientada a la fabricación de equipos para la industria petrolera y afines y todo el asesoramiento necesario para su proyecto.',
    'services.metallurgical.description2': 'Contamos con una amplia gama de productos, para cubrir todas sus necesidades:',
    'services.metallurgical.description3': 'Piletas de acumulación para agua, lodo y petróleo sobre skid y auto-portantes. Contenedores tipo volquete. Estructuras y subestructuras especiales. Choke manifolds. Lineas de alta. Estructuras para decanter. Planchadas. Tanques sobre patín para almacenamiento. Plantas móviles de petróleo. Piletas de ensayo. Circuitos de lodo. Además contamos con servicio de corte y plegado de chapas, para trabajos en general',
    'services.metallurgical.button': 'Nuestra Ubicación',
    'services.rental.title': 'RENTAL',
    'services.rental.subtitle': 'Vehículos, Trailers, Plataformas',
    'services.rental.description1': 'La división Rental está compuesta por los sectores "Flota Liviana" y "Trailers y Equipos".',
    'services.rental.description2': '**Flota Liviana:** contamos actualmente con más de 60 unidades entre Toyota Hilux cabina doble y simple 4x2 y 4x4, VW Amarok y vehículos livianos. Todas estas unidades están equipadas según la necesidad de cada cliente, ya se para uso Gerencial, recorredores, porta herramientas, personal general, etc.',
    'services.rental.description3': '**Trailers y Equipos:** en este sector se proveen equipos para alquileres temporarios: Piletas de acumulación. Trailers rodantes y sobre patín en 6, 9 y 12 metros, con configuraciones variadas del tipo "Company Man", comedor, habitación, cocina, laboratorio, etc. Contenedores tipo volquete.',
    'services.rental.button': 'Galería de Imágenes',
    'services.generators.title': 'GRUPOS ELECTRÓGENOS',
    'services.generators.subtitle': 'Alquiler y Mantenimiento',
    'services.generators.description1': 'Codelco S.A. ofrece servicios de alquiler y mantenimiento de grupos electrógenos industriales, garantizando energía confiable en todo momento.',
    'services.generators.description2': 'Contamos con **equipos de 55 a 180 kVA**, ideales para obras, instalaciones temporales y respaldo eléctrico en operaciones críticas.',
    'services.generators.description3': 'Nuestro servicio incluye la instalación, monitoreo y mantenimiento preventivo, asegurando un rendimiento óptimo y disponibilidad continua para nuestros clientes.',
    'services.generators.button': 'Solicitar Cotización',
    'services.generators.badge': 'NUEVO',
    
    // Gallery
    'gallery.title': 'GALERÍA DE IMÁGENES',
    'gallery.filter.all': 'Todas',
    'gallery.filter.factory': 'Fábrica',
    'gallery.filter.metallurgical': 'Metalúrgica',
    'gallery.filter.rental': 'Rental',
    'gallery.showMore': 'Ver más Imágenes',
    'gallery.remaining': 'restantes',
    'gallery.noImages': 'No hay imágenes disponibles para esta categoría',
    'gallery.downloadImage': 'Descargando imagen...',
    
    // Footer
    'footer.services.title': 'Nuestros Servicios',
    'footer.services.list1': '• Servicios Industriales',
    'footer.services.list2': '• Productos Especializados',
    'footer.services.list3': '• Rental de Equipos',
    'footer.services.list4': '• Consultoría Técnica',
    'footer.contact.title': 'Información de Contacto',
    'footer.description': 'Empresa argentina especializada en servicios industriales, productos y rental de equipos para el sector industrial.',
    'footer.copyright': 'Todos los derechos reservados.',
    
    // Clients
    'clients.title': 'NUESTROS CLIENTES',
    
    // Contact
    'contact.title': 'CONTACTO',
    'contact.info': 'Información de Contacto',
    'contact.address.label': 'Dirección',
    'contact.address.value': 'Ruta 22 Km.1114, Cipolletti - Río Negro\nDías: Lunes a viernes\nHorario: 8-12hs / 15-19hs',
    
    // Category translations
    'category.fabrica': 'Fábrica',
    'category.metalurgica': 'Metalúrgica',
    'category.rental': 'Rental',
    
    // Image alt texts
    'images.metalurgica.01': 'Contenedores especializados Epersa',
    'images.metalurgica.02': 'Tanques cilíndricos especializados',
    'images.metalurgica.03': 'Cisterna móvil con equipamiento naranja',
    'images.metalurgica.04': 'Sistemas de tuberías industriales complejas',
    'images.metalurgica.05': 'Módulo industrial móvil especializado',
    'images.metalurgica.06': 'Plataforma móvil con escaleras de acceso',
    'images.metalurgica.07': 'Estación de soldadura móvil completa',
    'images.metalurgica.08': 'Equipos metalúrgicos industriales',
    'images.metalurgica.09': 'Transporte de estructuras prefabricadas',
    'images.metalurgica.10': 'Tanque de acumulación naranja sobre skid',
    'images.metalurgica.11': 'Tanques cilíndricos en proceso de fabricación',
    'images.metalurgica.12': 'Estructuras azules para equipos industriales',
    'images.metalurgica.13': 'Contenedores tipo volquete amarillos',
    'images.metalurgica.14': 'Equipos rojos especializados para petróleo',
    'images.metalurgica.15': 'Mesa de corte y plegado de chapas',
    'images.metalurgica.16': 'Trailer especializado para transporte',
    'images.metalurgica.17': 'Contenedor azul para almacenamiento',
    'images.metalurgica.18': 'Grúa móvil en operación de instalación',
    'images.metalurgica.19': 'Operación de elevación con grúas especializadas',
    'images.metalurgica.20': 'Módulos transportables con escaleras metálicas',
    'images.rental.01': 'Flota de vehículos Toyota Hilux en base operativa',
    'images.rental.02': 'Instalaciones de rental y equipos especializados',
    'images.rental.03': 'Módulos habitacionales para rental temporal',
    'images.rental.04': 'Flota de vehículos 4x4 equipados para trabajo',
    'images.rental.05': 'Trailers y contenedores móviles',
    'images.rental.06': 'Módulos de alojamiento temporal',
    'images.rental.07': 'Trailers especializados para campo petrolero',
    'images.rental.08': 'Equipos modulares para proyectos temporales',
    'images.fabrica.01': 'Oficina móvil de control ambiental',
    'images.fabrica.02': 'Módulo industrial especializado',
    'images.fabrica.03': 'Planta de fabricación modular interior',
    'images.fabrica.04': 'Nave industrial con línea de producción',
    'images.fabrica.05': 'Estructura modular en construcción',
    'images.fabrica.06': 'Unidad de emergencias médicas transportable',
    'images.fabrica.07': 'Módulo industrial compacto transportable',
    'images.fabrica.08': 'Proceso de ensamblaje de paneles',
    'images.fabrica.09': 'Interior de módulo de laboratorio equipado',
    'images.fabrica.10': 'Comedor modular con equipamiento completo',
    'images.fabrica.11': 'Sala de capacitación modular equipada',
    'images.fabrica.12': 'Centro de control con ventanas panorámicas',
    'images.fabrica.13': 'Módulo sanitario completo con urinarios',
    'images.fabrica.14': 'Estación de revisión técnica móvil',
    'images.fabrica.15': 'Unidad móvil de revisión técnica RTO',
    'images.fabrica.16': 'Estación de elevación para vehículos',
    'images.fabrica.17': 'Módulo habitacional con ventana panorámica',
    'images.fabrica.18': 'Cocina modular completamente equipada',
    'images.fabrica.19': 'Baños modulares con lavamanos múltiples',
    'images.fabrica.20': 'Kitchenette compacta con electrodomésticos',
    'images.fabrica.21': 'Módulos temporales en terreno nevado con bandera argentina',
    'images.fabrica.22': 'Oficina modular con estaciones de trabajo rojas',
    'images.fabrica.23': 'Módulo en construcción con estructura metálica',
    'images.fabrica.24': 'Vista aérea de instalación modular en operación',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Teléfonos',
    'contact.phone.rental': 'Rental: (299) 571 4217',
    'contact.phone.compras': 'Compras: (299) 571 4661',
    'contact.form.title': 'Envíanos un Mensaje',
    'contact.form.name': 'Nombre y apellido *',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Teléfono',
    'contact.form.subject': 'Asunto *',
    'contact.form.subject.fabrica': 'Fábrica',
    'contact.form.subject.metalurgica': 'Metalúrgica',
    'contact.form.subject.rental': 'Rental',
    'contact.form.subject.generators': 'Grupos Electrógenos',
    'contact.form.subject.question': 'Pregunta',
    'contact.form.message': 'Mensaje *',
    'contact.form.placeholder': 'Describe tu consulta o necesidad...',
    'contact.form.submit': 'Enviar Mensaje',
    'contact.form.success.title': 'Mensaje enviado',
    'contact.form.success.description': 'Gracias por contactarnos. Te responderemos pronto.',
    'contact.form.error.title': 'Error',
    'contact.form.error.description': 'Hubo un problema al enviar tu mensaje. Por favor intenta nuevamente.',
    'contact.map.loading': 'Cargando mapa...',
    'contact.map.directions': 'Cómo llegar',
  },
  en: {
    // Header
    'nav.inicio': 'Home',
    'nav.empresa': 'Company',
    'nav.areas': 'Our Areas',
    'nav.galeria': 'Gallery',
    'nav.contacto': 'Contact',
    
    // Hero
    'hero.title': 'A REGIONAL COMPANY',
    'hero.description': 'Our objective is to provide our clients with comprehensive service, from initial consultation to final delivery. For this, we have a 3500m2 plant, fully dedicated and equipped for the production of our products and all the necessary personnel specifically for each sector.',
    'hero.button.services': 'Our Services',
    'hero.button.contact': 'Contact Us',
    
    // Company
    'company.title': 'OUR COMPANY',
    'company.subtitle': 'CODELCO S.A.',
    'company.paragraph1': 'We began our activity in 2012, coinciding with the accelerated growth of oil industry needs (unconventional well drilling - Vaca Muerta). At that time, our company had already ventured into the Trailer Rental sector, storage pools and Pick Ups.',
    'company.paragraph2': 'Taking into account the demand, both for units and quality improvements, we decided to incorporate technology such as Panel machines, guillotine, press brake, CNC plasma cutting, semi-automatic welders, etc., which with the accompaniment of trained personnel, led us to position ourselves very well in the market for manufacturing Residential Modules oriented to the oil sector, as well as in the manufacture of Accumulation Pools, API Tanks, Containers and special works such as integrated solids control equipment and automated technical verification equipment.',
    'company.paragraph3': 'Currently, together with our Engineering and Development (R&D) team, we are venturing into housing solutions for both families and offices.',
    
    // Services
    'services.title': 'OUR AREAS',
    'services.factory.title': 'FACTORY',
    'services.factory.subtitle': 'Units, Modules, Rooms and housing',
    'services.factory.description1': 'The module and housing manufacturing sector is prepared to cover all customer needs when carrying out their project. It has a complete production line, from the engineering and design office to the different production areas that make up each unit, which will provide complete advice in all construction stages.',
    'services.factory.description2': 'This sector produces all types of residential modules whether for commercial or housing purposes for different industries and also the "dry" construction modality of family homes with the best thermo-acoustic characteristics available in the market and the possibility of choosing the design to the customer\'s taste.',
    'services.factory.button': 'Contact Us',
    'services.metallurgical.title': 'METALLURGICAL',
    'services.metallurgical.subtitle': 'Equipment, Tanks, Substructures',
    'services.metallurgical.description1': 'The Metallurgical division is oriented to the manufacture of equipment for the oil industry and related industries and all the necessary advice for your project.',
    'services.metallurgical.description2': 'We have a wide range of products to cover all your needs:',
    'services.metallurgical.description3': 'Accumulation pools for water, mud and oil on skid and self-supporting. Dump truck type containers. Special structures and substructures. Choke manifolds. High lines. Structures for decanter. Platforms. Skid-mounted tanks for storage. Mobile oil plants. Test pools. Mud circuits. We also have sheet cutting and bending service for general work',
    'services.metallurgical.button': 'Our Location',
    'services.rental.title': 'RENTAL',
    'services.rental.subtitle': 'Vehicles, Trailers, Platforms',
    'services.rental.description1': 'The Rental division is composed of the "Light Fleet" and "Trailers and Equipment" sectors.',
    'services.rental.description2': '**Light Fleet:** we currently have more than 60 units including Toyota Hilux double and single cab 4x2 and 4x4, VW Amarok and light vehicles. All these units are equipped according to each customer\'s needs, whether for Management use, runners, tool carriers, general personnel, etc.',
    'services.rental.description3': '**Trailers and Equipment:** this sector provides equipment for temporary rentals: Accumulation pools. Rolling and skid-mounted trailers in 6, 9 and 12 meters, with varied configurations such as "Company Man", dining room, room, kitchen, laboratory, etc. Dump truck type containers.',
    'services.rental.button': 'Image Gallery',
    'services.generators.title': 'GENERATOR SETS',
    'services.generators.subtitle': 'Rental and Maintenance',
    'services.generators.description1': 'Codelco S.A. offers rental and maintenance services for industrial generator sets, guaranteeing reliable energy at all times.',
    'services.generators.description2': 'We have **equipment from 55 to 180 kVA**, ideal for construction sites, temporary installations and electrical backup in critical operations.',
    'services.generators.description3': 'Our service includes installation, monitoring and preventive maintenance, ensuring optimal performance and continuous availability for our customers.',
    'services.generators.button': 'Request Quote',
    'services.generators.badge': 'NEW',
    
    // Gallery
    'gallery.title': 'IMAGE GALLERY',
    'gallery.filter.all': 'All',
    'gallery.filter.factory': 'Factory',
    'gallery.filter.metallurgical': 'Metallurgical',
    'gallery.filter.rental': 'Rental',
    'gallery.showMore': 'View More Images',
    'gallery.remaining': 'remaining',
    'gallery.noImages': 'No images available for this category',
    'gallery.downloadImage': 'Downloading image...',
    
    // Footer
    'footer.services.title': 'Our Services',
    'footer.services.list1': '• Industrial Services',
    'footer.services.list2': '• Specialized Products',
    'footer.services.list3': '• Equipment Rental',
    'footer.services.list4': '• Technical Consulting',
    'footer.contact.title': 'Contact Information',
    'footer.description': 'Argentine company specialized in industrial services, products and equipment rental for the industrial sector.',
    'footer.copyright': 'All rights reserved.',
    
    // Clients
    'clients.title': 'OUR CLIENTS',
    
    // Contact
    'contact.title': 'CONTACT',
    'contact.info': 'Contact Information',
    'contact.address.label': 'Address',
    'contact.address.value': 'Route 22 Km.1114, Cipolletti - Río Negro\nDays: Monday to Friday\nHours: 8-12am / 3-7pm',
    
    // Category translations
    'category.fabrica': 'Factory',
    'category.metalurgica': 'Metallurgical',
    'category.rental': 'Rental',
    
    // Image alt texts
    'images.metalurgica.01': 'Epersa specialized containers',
    'images.metalurgica.02': 'Specialized cylindrical tanks',
    'images.metalurgica.03': 'Mobile tank with orange equipment',
    'images.metalurgica.04': 'Complex industrial piping systems',
    'images.metalurgica.05': 'Specialized mobile industrial module',
    'images.metalurgica.06': 'Mobile platform with access stairs',
    'images.metalurgica.07': 'Complete mobile welding station',
    'images.metalurgica.08': 'Industrial metallurgical equipment',
    'images.metalurgica.09': 'Transport of prefabricated structures',
    'images.metalurgica.10': 'Orange accumulation tank on skid',
    'images.metalurgica.11': 'Cylindrical tanks in manufacturing process',
    'images.metalurgica.12': 'Blue structures for industrial equipment',
    'images.metalurgica.13': 'Yellow dump truck type containers',
    'images.metalurgica.14': 'Red specialized equipment for oil',
    'images.metalurgica.15': 'Sheet cutting and bending table',
    'images.metalurgica.16': 'Specialized trailer for transport',
    'images.metalurgica.17': 'Blue container for storage',
    'images.metalurgica.18': 'Mobile crane in installation operation',
    'images.metalurgica.19': 'Lifting operation with specialized cranes',
    'images.metalurgica.20': 'Transportable modules with metal stairs',
    'images.rental.01': 'Toyota Hilux vehicle fleet at operational base',
    'images.rental.02': 'Rental facilities and specialized equipment',
    'images.rental.03': 'Residential modules for temporary rental',
    'images.rental.04': '4x4 vehicle fleet equipped for work',
    'images.rental.05': 'Trailers and mobile containers',
    'images.rental.06': 'Temporary accommodation modules',
    'images.rental.07': 'Specialized trailers for oil fields',
    'images.rental.08': 'Modular equipment for temporary projects',
    'images.fabrica.01': 'Mobile environmental control office',
    'images.fabrica.02': 'Specialized industrial module',
    'images.fabrica.03': 'Interior modular manufacturing plant',
    'images.fabrica.04': 'Industrial facility with production line',
    'images.fabrica.05': 'Modular structure under construction',
    'images.fabrica.06': 'Transportable medical emergency unit',
    'images.fabrica.07': 'Compact transportable industrial module',
    'images.fabrica.08': 'Panel assembly process',
    'images.fabrica.09': 'Interior of equipped laboratory module',
    'images.fabrica.10': 'Modular dining room with complete equipment',
    'images.fabrica.11': 'Equipped modular training room',
    'images.fabrica.12': 'Control center with panoramic windows',
    'images.fabrica.13': 'Complete sanitary module with urinals',
    'images.fabrica.14': 'Mobile technical inspection station',
    'images.fabrica.15': 'RTO mobile technical inspection unit',
    'images.fabrica.16': 'Vehicle lifting station',
    'images.fabrica.17': 'Residential module with panoramic window',
    'images.fabrica.18': 'Fully equipped modular kitchen',
    'images.fabrica.19': 'Modular bathrooms with multiple sinks',
    'images.fabrica.20': 'Compact kitchenette with appliances',
    'images.fabrica.21': 'Temporary modules on snowy terrain with Argentine flag',
    'images.fabrica.22': 'Modular office with red workstations',
    'images.fabrica.23': 'Module under construction with metal structure',
    'images.fabrica.24': 'Aerial view of modular installation in operation',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Phones',
    'contact.phone.rental': 'Rental: (299) 571 4217',
    'contact.phone.compras': 'Purchases: (299) 571 4661',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full name *',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Phone',
    'contact.form.subject': 'Subject *',
    'contact.form.subject.fabrica': 'Factory',
    'contact.form.subject.metalurgica': 'Metallurgical',
    'contact.form.subject.rental': 'Rental',
    'contact.form.subject.generators': 'Power Generators',
    'contact.form.subject.question': 'Question',
    'contact.form.message': 'Message *',
    'contact.form.placeholder': 'Describe your inquiry or need...',
    'contact.form.submit': 'Send Message',
    'contact.form.success.title': 'Message sent',
    'contact.form.success.description': 'Thank you for contacting us. We will respond soon.',
    'contact.form.error.title': 'Error',
    'contact.form.error.description': 'There was a problem sending your message. Please try again.',
    'contact.map.loading': 'Loading map...',
    'contact.map.directions': 'Get directions',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};