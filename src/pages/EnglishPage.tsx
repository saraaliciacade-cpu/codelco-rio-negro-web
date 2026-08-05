import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Wrench, Truck, Zap, MapPin, Mail, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import HeroImageCarousel from '@/components/HeroImageCarousel';

const divisions = [
  {
    id: 'factory',
    eyebrow: 'MODULAR FACTORY',
    title: 'Residential and Industrial Modules',
    description: 'We design and manufacture Company Man modules, dining rooms, kitchens, laboratories, offices and turnkey camps at our 3,500 m² plant in Cipolletti.',
    image: '/images/fabrica/fabrica-32.jpg',
    alt: 'Codelco prefabricated residential module lifted by crane in Cipolletti',
    icon: Factory,
  },
  {
    id: 'metallurgy',
    eyebrow: 'METALLURGICAL DIVISION',
    title: 'Tanks, Equipment and Steel Structures',
    description: 'Custom API tanks, accumulation pools, choke manifolds, high-pressure lines and special structures for oil, gas, mining and construction operations.',
    image: '/metalurgica-05.jpg',
    alt: 'Industrial steel equipment manufactured by Codelco for the oil and gas industry',
    icon: Wrench,
  },
  {
    id: 'rental',
    eyebrow: 'EQUIPMENT RENTAL',
    title: 'Vehicles, Trailers and LED Light Towers',
    description: 'Toyota Hilux and Volkswagen Amarok vehicles, 6, 9 and 12 metre trailers, containers and LED light towers with maintenance and operational support included.',
    image: '/rental-01.jpg',
    alt: 'Codelco Toyota Hilux rental fleet for Vaca Muerta operations',
    icon: Truck,
  },
  {
    id: 'generators',
    eyebrow: 'GENERATOR SETS',
    title: 'Industrial Power from 55 to 180 kVA',
    description: 'Generator set rental, installation, monitoring and preventive maintenance for critical operations throughout Patagonia.',
    image: '/images/novedad/grupo-electrogeno.jpg',
    alt: 'Codelco industrial generator set delivered to an energy sector client',
    icon: Zap,
  },
];

const EnglishPage = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Codelco S.A. — Industrial Services in Vaca Muerta"
      description="Residential modules, steel fabrication, vehicle and equipment rental, LED light towers and generator sets for oil and gas operations in Patagonia, Argentina."
      path="/en"
      language="en"
      alternatePath="/"
      keywords="Vaca Muerta industrial services, residential modules Argentina, oilfield equipment rental, generator sets Patagonia"
    />
    <Header />
    <main>
      <section className="relative min-h-[calc(100dvh-57px)] overflow-hidden bg-foreground flex items-end">
        <HeroImageCarousel
          images={[
            { src: '/images/fabrica/fabrica-32.jpg', alt: 'Codelco prefabricated module being installed by crane' },
            { src: '/rental-01.jpg', alt: 'Codelco vehicle rental fleet in Patagonia' },
            { src: '/metalurgica-05.jpg', alt: 'Codelco metallurgical manufacturing plant' },
          ]}
        />
        <div className="absolute inset-0 bg-foreground/75" aria-hidden="true" />
        <div className="relative container mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
          <p className="eyebrow text-primary text-xs font-bold mb-5">CIPOLLETTI, RÍO NEGRO · SINCE 2012</p>
          <h1 className="heading text-primary-foreground text-4xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-5xl">
            Industrial infrastructure for oil and gas operations in Vaca Muerta
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-primary-foreground/85 max-w-3xl leading-relaxed">
            We manufacture modular buildings and steel equipment, and provide the vehicles, trailers, lighting and power your operation needs across Patagonia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#services" className="inline-flex h-12 items-center gap-2 bg-primary px-6 font-semibold text-primary-foreground">
              Explore our services <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="inline-flex h-12 items-center border border-primary-foreground/70 px-6 font-semibold text-primary-foreground">
              Request a quote
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 lg:py-24 bg-muted">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow text-primary text-xs font-bold mb-4">OUR DIVISIONS</p>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl text-foreground">Manufacturing, rental and field support under one roof</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {divisions.map((division) => (
              <article id={division.id} key={division.id} className="bg-background border border-border overflow-hidden scroll-mt-24">
                <img src={division.image} alt={division.alt} className="h-64 lg:h-80 w-full object-cover" loading="lazy" />
                <div className="p-7 lg:p-9">
                  <div className="flex items-center gap-3 text-primary mb-4">
                    <division.icon className="h-5 w-5" aria-hidden="true" />
                    <p className="eyebrow text-xs font-bold">{division.eyebrow}</p>
                  </div>
                  <h2 className="heading text-2xl lg:text-3xl text-foreground">{division.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{division.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-20 lg:py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12 items-center">
          <img src="/images/fabrica/fabrica-41.jpg" alt="Interior of a fully equipped Codelco modular building" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          <div>
            <p className="eyebrow text-primary text-xs font-bold mb-4">WHY CODELCO</p>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl text-foreground">Local production and dependable support in the field</h2>
            <ul className="mt-7 space-y-4 text-muted-foreground leading-relaxed">
              <li><strong className="text-foreground">14+ years of experience</strong> serving energy, mining and construction companies.</li>
              <li><strong className="text-foreground">3,500 m² owned plant</strong> with CNC cutting, bending and complete modular production.</li>
              <li><strong className="text-foreground">60+ fleet units</strong> available with maintenance and operational assistance.</li>
              <li><strong className="text-foreground">Coverage across Patagonia</strong>, including Río Negro and Neuquén.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="clients" className="py-16 bg-foreground text-primary-foreground scroll-mt-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <p className="eyebrow text-primary text-xs font-bold mb-4">TRUSTED IN THE FIELD</p>
          <h2 className="heading text-3xl lg:text-5xl">More than 30 oil and gas companies work with Codelco</h2>
          <Link to="/clientes" className="mt-7 inline-flex items-center gap-2 text-primary font-semibold">View our clients <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section id="contact" className="py-20 lg:py-24 bg-background scroll-mt-20">
        <div className="container mx-auto px-6 sm:px-10 lg:px-16 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="eyebrow text-primary text-xs font-bold mb-4">CONTACT</p>
            <h2 className="heading text-3xl sm:text-4xl lg:text-5xl text-foreground">Tell us what your operation needs</h2>
            <p className="mt-5 text-muted-foreground text-lg">Our team will help you define availability, technical scope and delivery options.</p>
          </div>
          <address className="not-italic space-y-5 text-foreground">
            <p className="flex gap-3"><MapPin className="h-5 w-5 text-primary shrink-0" /> Ruta 22 Km 1214, Cipolletti, Río Negro, Argentina</p>
            <p className="flex gap-3"><Phone className="h-5 w-5 text-primary shrink-0" /> +54 299 413 6453 · +54 299 571 4703</p>
            <a className="flex gap-3 hover:text-primary" href="mailto:ventas@codelco.com.ar"><Mail className="h-5 w-5 text-primary shrink-0" /> ventas@codelco.com.ar</a>
            <a className="inline-flex h-12 items-center bg-primary px-6 font-semibold text-primary-foreground" href="https://wa.me/5492994136453" target="_blank" rel="noopener noreferrer">Contact us on WhatsApp</a>
          </address>
        </div>
      </section>
    </main>
    <footer className="bg-foreground py-10 text-primary-foreground/60">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row gap-4 justify-between">
        <p>© 2026 Codelco S.A. · Industrial services for Patagonia</p>
        <Link to="/" className="text-primary-foreground hover:text-primary">Versión en español</Link>
      </div>
    </footer>
  </div>
);

export default EnglishPage;