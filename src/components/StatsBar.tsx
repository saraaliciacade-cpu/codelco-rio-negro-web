const BRAND_ORANGE = '#E84E1B';
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
      style={{ backgroundColor: BRAND_BLACK, borderTop: `2px solid ${BRAND_ORANGE}` }}
    >
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 lg:divide-y-0 lg:divide-x lg:divide-white/10">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 sm:py-10 lg:py-12 px-4 sm:px-6 ${
                i % 2 === 1 ? 'border-l border-white/10 lg:border-l-0' : ''
              }`}
            >
              <p
                className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] mb-3"
                style={{ color: BRAND_ORANGE }}
              >
                {s.label}
              </p>
              <p className="text-white font-bold leading-none text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                {s.value}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-white/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
