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
    
    // Contact
    'contact.title': 'CONTACTO',
    'contact.info': 'Información de Contacto',
    'contact.address.label': 'Dirección',
    'contact.address.value': 'Ruta 22 Km.1114, Cipolletti - Río Negro\nDías: Lunes a viernes\nHorario: 8-12hs / 15-19hs',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Teléfonos',
    'contact.phone.rental': 'Rental: (299) 571 4217',
    'contact.phone.compras': 'Compras: (299) 571 4661',
    'contact.form.title': 'Envíanos un Mensaje',
    'contact.form.name': 'Nombre y apellido *',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Teléfono',
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
    
    // Contact
    'contact.title': 'CONTACT',
    'contact.info': 'Contact Information',
    'contact.address.label': 'Address',
    'contact.address.value': 'Route 22 Km.1114, Cipolletti - Río Negro\nDays: Monday to Friday\nSchedule: 8-12am / 3-7pm',
    'contact.email.label': 'Email',
    'contact.phone.label': 'Phones',
    'contact.phone.rental': 'Rental: (299) 571 4217',
    'contact.phone.compras': 'Purchases: (299) 571 4661',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full name *',
    'contact.form.email': 'Email *',
    'contact.form.phone': 'Phone',
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