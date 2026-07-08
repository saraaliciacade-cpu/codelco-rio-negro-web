interface ShareServicesProps {
  title: string;
  path: string;
  label?: string;
  color?: 'light' | 'dark';
}

const BRAND_ORANGE = '#E84E1B';

const ShareServices = ({ title, path, label = 'Comparte nuestros Servicios', color = 'light' }: ShareServicesProps) => {
  const shareUrl = `https://codelco.com.ar${path}`;
  const shareText = `${title} — Codelco S.A.`;
  const enc = encodeURIComponent;

  const isLight = color === 'light';
  const textColor = isLight ? 'text-white/80' : 'text-gray-600';
  const iconColor = isLight ? 'text-white' : 'text-gray-800';
  const borderColor = isLight ? 'border-white/40' : 'border-gray-300';

  const links = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${enc(shareText + ' ' + shareUrl)}`,
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.09.55 4.13 1.6 5.93L0 24l6.35-1.66a11.86 11.86 0 0 0 5.7 1.45h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.17-1.24-6.15-3.42-8.43ZM12.06 21.6h-.01a9.7 9.7 0 0 1-4.94-1.35l-.36-.21-3.77.99 1.01-3.68-.23-.38a9.72 9.72 0 0 1-1.49-5.09c0-5.38 4.37-9.75 9.79-9.75 2.61 0 5.07 1.02 6.91 2.87a9.7 9.7 0 0 1 2.86 6.9c0 5.38-4.37 9.7-9.77 9.7Zm5.36-7.28c-.29-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.19.29-.76.96-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.49-.66-.5l-.56-.01c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44 0 1.44 1.05 2.83 1.2 3.02.15.19 2.06 3.14 4.99 4.4.7.3 1.24.48 1.66.62.7.22 1.33.19 1.84.11.56-.08 1.74-.71 1.98-1.4.24-.68.24-1.27.17-1.4-.07-.13-.27-.2-.56-.35Z" />
        </svg>
      ),
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`,
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.7c0-.9.3-1.6 1.6-1.6h1.7V4.2c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.4V14h2.7v8h3.4Z" />
        </svg>
      ),
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${enc(shareText)}&url=${enc(shareUrl)}`,
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2H21l-6.52 7.45L22 22h-6.28l-4.92-6.44L5.1 22H2.34l6.97-7.97L2 2h6.44l4.45 5.88L18.24 2Zm-1.1 18h1.53L7.02 4H5.4l11.74 16Z" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: `mailto:?subject=${enc(title)}&body=${enc(shareText + '\n\n' + shareUrl)}`,
      svg: (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 8.5L4 7.2V18h16V7.2l-8 5.3ZM12 11 20 6H4l8 5Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
      <span className={`text-[11px] font-bold tracking-widest uppercase ${textColor}`}>
        {label}
      </span>
      <div className="flex items-center gap-2">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${l.label}`}
            className={`w-9 h-9 rounded-full border ${borderColor} ${iconColor} flex items-center justify-center transition-colors hover:text-white hover:border-transparent`}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND_ORANGE)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {l.svg}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareServices;
