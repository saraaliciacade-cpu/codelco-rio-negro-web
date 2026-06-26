import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BRAND_ORANGE = '#E84E1B';

export interface DivisionGalleryImage {
  src: string;
  name: string;
  isNew?: boolean;
}

interface DivisionGalleryProps {
  images: DivisionGalleryImage[];
  /** Optional fixed step. Defaults to 2. */
  step?: number;
}

const DivisionGallery = ({ images, step = 2 }: DivisionGalleryProps) => {
  const [index, setIndex] = useState(0);

  // Visible window is 4 on desktop / 2 on tablet / 1 on mobile (CSS),
  // but we paginate logically by `step` items.
  const maxIndex = Math.max(0, images.length - 1);

  const goPrev = () => setIndex((i) => Math.max(0, i - step));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + step));

  const atStart = index === 0;
  const atEnd = index >= images.length - 4; // at least 4 visible on desktop

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        type="button"
        aria-label="Imágenes anteriores"
        onClick={goPrev}
        disabled={atStart}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2 sm:-ml-4 lg:-ml-6
          flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12 rounded-full
          text-white shadow-lg transition
          disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
        style={{ backgroundColor: BRAND_ORANGE }}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Viewport */}
      <div className="overflow-hidden px-2 sm:px-6 lg:px-10">
        <div
          className="flex transition-transform duration-500 ease-out gap-4 sm:gap-5 lg:gap-6"
          style={{
            // Slide by (100% / visible) per item. Use CSS var by breakpoint via inline math:
            // We translate by index * (item width + gap). Because widths vary per breakpoint,
            // we set each item to flex-basis matching the breakpoint and translate by index/visible*100%.
            transform: `translateX(calc(${index} * (-100% / var(--visible, 4) - 0px)))`,
          }}
        >
          {images.map((img, i) => (
            <article
              key={`${img.src}-${i}`}
              className="shrink-0 basis-full sm:basis-[calc((100%-1.25rem)/2)] lg:basis-[calc((100%-4.5rem)/4)]"
            >
              <div className="relative bg-white border border-black/5 overflow-hidden group">
                {img.isNew && (
                  <span
                    className="eyebrow absolute top-3 right-3 z-10 text-[10px] text-white px-2.5 py-1 rounded-sm shadow"
                    style={{ backgroundColor: BRAND_ORANGE }}
                  >
                    NUEVO
                  </span>
                )}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={img.src}
                    alt={img.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center min-h-[64px] flex items-center justify-center">
                  <h3 className="text-sm font-semibold text-[#1A1A1A] line-clamp-2">
                    {img.name}
                  </h3>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Imágenes siguientes"
        onClick={goNext}
        disabled={atEnd}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2 sm:-mr-4 lg:-mr-6
          flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12 rounded-full
          text-white shadow-lg transition
          disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
        style={{ backgroundColor: BRAND_ORANGE }}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Responsive visible-count variable */}
      <style>{`
        @media (max-width: 639px)  { .division-gallery-root { --visible: 1; } }
        @media (min-width: 640px) and (max-width: 1023px) { .division-gallery-root { --visible: 2; } }
        @media (min-width: 1024px) { .division-gallery-root { --visible: 4; } }
      `}</style>
    </div>
  );
};

export default DivisionGallery;
