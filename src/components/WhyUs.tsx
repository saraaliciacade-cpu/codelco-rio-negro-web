import { Clock, Factory, Wrench } from 'lucide-react';
import vacaMuertaAsset from '@/assets/vaca-muerta-codelco.png.asset.json';
import cipollettiAsset from '@/assets/codelco-cipolletti.png.asset.json';
import patagoniaAsset from '@/assets/patagonia-codelco.jpg.asset.json';

const BRAND_ORANGE = '#E84E1B';
const BRAND_CREAM = '#F5F3EF';
const BRAND_BLACK = '#1A1A1A';

const reasons = [
  {
    num: '01 / ENTREGA',
    title: 'Entrega en tiempo y forma',
    icon: Clock,
    image: vacaMuertaAsset.url,
    imageAlt: 'Camioneta Codelco al atardecer en la Patagonia',
    body:
      'Cumplimos plazos en operaciones críticas. Si tu cronograma depende de un módulo o un equipo, lo tenés cuando lo necesitás — no "cuando se pueda".',
  },
  {
    num: '02 / FABRICACIÓN',
    title: 'Todo se produce en nuestra planta',
    icon: Factory,
    image: cipollettiAsset.url,
    imageAlt: 'Planta de Codelco en Cipolletti, Río Negro',
    body:
      '3.500 m² propios con tecnología CNC, plegadora y soldadoras semiautomáticas. No subcontratamos la fabricación: la controlamos de punta a punta.',
  },
  {
    num: '03 / SOPORTE',
    title: 'Asistencia técnica en campo',
    icon: Wrench,
    image: patagoniaAsset.url,
    imageAlt: 'Mapa de Patagonia con presencia de Codelco',
    body:
      'Mantenimiento y soporte donde esté tu operación, no solo en nuestra planta. Río Negro, Neuquén o cualquier punto de la Patagonia.',
  },
];

const WhyUs = () => {
  return (
    <section id="por-que-elegirnos" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="h-px w-10"
              style={{ backgroundColor: BRAND_ORANGE }}
              aria-hidden="true"
            />
            <span
              className="eyebrow text-[11px] sm:text-xs font-bold"
              style={{ color: BRAND_ORANGE }}
            >
              ¿POR QUÉ ELEGIRNOS?
            </span>
          </div>
          <h2
            className="heading text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
            style={{ color: BRAND_BLACK }}
          >
            Tres razones por las que Vaca Muerta elige <span style={{ color: BRAND_ORANGE }}>Codelco</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <article
                key={r.num}
                className="group relative overflow-hidden p-8 lg:p-10 border transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: BRAND_CREAM, borderColor: 'rgba(26,26,26,0.1)' }}
              >
                {/* Hover image sliding left-to-right */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full opacity-0 transition-all duration-700 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                >
                  <img
                    src={r.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.7) 55%, rgba(26,26,26,0.55) 100%)',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <Icon
                    size={32}
                    strokeWidth={1.5}
                    style={{ color: BRAND_ORANGE }}
                    className="mb-4"
                  />
                  <p
                    className="eyebrow text-xs mb-6 font-bold"
                    style={{ color: BRAND_ORANGE }}
                  >
                    {r.num}
                  </p>
                  <h3 className="heading text-xl lg:text-2xl mb-4 leading-snug transition-colors duration-500 text-[#1A1A1A] group-hover:text-white">
                    {r.title}
                  </h3>
                  <p className="text-sm lg:text-base leading-relaxed font-bold transition-colors duration-500 text-[#444] group-hover:text-white">
                    {r.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
