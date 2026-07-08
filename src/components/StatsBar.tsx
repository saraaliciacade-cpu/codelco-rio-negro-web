const BRAND_ORANGE = '#e04d1c';
const BRAND_BLACK = '#1A1A1A';

const stats = [
  { label: '// ANTIGÜEDAD', value: '+14', desc: 'años en la industria' },
  { label: '// CAPACIDAD', value: '3.500', desc: 'm² de planta propia' },
  { label: '// FLOTA', value: '+60', desc: 'unidades Hilux y Amarok' },
  { label: '// CARTERA', value: '+30', desc: 'empresas activas del sector' },
];

const StatsBar = () => {
  return (
    <section
      aria-label="Codelco en números"
      style={{ backgroundColor: 'transparent', borderTop: `2px solid ${BRAND_ORANGE}` }}
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 lg:divide-y-0 lg:divide-x lg:divide-white/10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 sm:py-8 lg:py-10 px-4 sm:px-6 ${
                i % 2 === 1 ? 'border-l border-white/10 lg:border-l-0' : ''
              }`}
            >
              <p
                className="eyebrow text-[10px] sm:text-xs mb-2 sm:mb-3"
                style={{ color: BRAND_ORANGE }}
              >
                {s.label}
              </p>
              <p className="stat-number text-white leading-none text-3xl sm:text-4xl lg:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
