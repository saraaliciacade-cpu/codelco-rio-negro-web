import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import WhyUs from '@/components/WhyUs';


// Lazy load below-the-fold components for better bundle splitting
const Clients = lazy(() => import('@/components/Clients'));

const Services = lazy(() => import('@/components/Services'));
const Contact = lazy(() => import('@/components/Contact'));

const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://codelco.com.ar/" />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <WhyUs />
        <Services />
        <Suspense fallback={<div className="py-8"><div className="animate-pulse rounded-lg bg-muted h-32 mx-auto max-w-4xl"></div></div>}>
          <Clients />
        </Suspense>
        <Suspense fallback={<div className="py-8 text-center">
          <div className="animate-pulse rounded-lg bg-muted h-96 mx-auto max-w-4xl"></div>
        </div>}>
          <div id="ubicacion">
            <Contact />
          </div>
        </Suspense>
      </main>
        <Suspense fallback={<div className="py-8 text-center">
          <div className="animate-pulse rounded-lg bg-muted h-96 mx-auto max-w-4xl"></div>
        </div>}>
          <div id="ubicacion">
            <Contact />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-16 bg-muted animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
