import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Clients from '@/components/Clients';
import Company from '@/components/Company';
import Services from '@/components/Services';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Map from '@/components/Map';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Clients />
        <Company />
        <Services />
        <Gallery />
        <Contact />
        <div id="ubicacion">
          <Map />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
