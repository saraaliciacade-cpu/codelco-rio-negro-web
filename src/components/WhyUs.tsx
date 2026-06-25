const BRAND_ORANGE = '#E84E1B';
const BRAND_CREAM = '#F5F3EF';
const BRAND_BLACK = '#1A1A1A';

const reasons = [
  {
    num: '01 / ENTREGA',
    title: 'Entrega en tiempo y forma',
    body:
      'Cumplimos plazos en operaciones críticas. Si tu cronograma depende de un módulo o un equipo, lo tenés cuando lo necesitás — no "cuando se pueda".',
  },
  {
    num: '02 / FABRICACIÓN',
    title: 'Todo se produce en nuestra planta',
    body:
      '3.500 m² propios con tecnología CNC, plegadora y soldadoras semiautomáticas. No subcontratamos la fabricación: la controlamos de punta a punta.',
  },
  {
    num: '03 / SOPORTE',
    title: 'Asistencia técnica en campo',
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
              className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em]"
              style={{ color: BRAND_ORANGE }}
            >
              Por qué elegirnos
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
            style={{ color: BRAND_BLACK }}
          >
            Tres razones por las que Vaca Muerta no espera por nosotros
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((r) => (
            <article
              key={r.num}
              className="p-8 lg:p-10 border transition hover:-translate-y-1 hover:shadow-lg duration-300"
              style={{ backgroundColor: BRAND_CREAM, borderColor: 'rgba(26,26,26,0.1)' }}
            >
              <p
                className="text-xs font-mono uppercase tracking-[0.2em] mb-6"
                style={{ color: BRAND_ORANGE }}
              >
                {r.num}
              </p>
              <h3
                className="text-xl lg:text-2xl font-bold mb-4 leading-snug"
                style={{ color: BRAND_BLACK }}
              >
                {r.title}
              </h3>
              <p className="text-sm lg:text-base leading-relaxed" style={{ color: '#444' }}>
                {r.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
