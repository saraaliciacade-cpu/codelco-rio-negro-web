import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BRAND_ORANGE = '#E84E1B';

export interface DivisionGalleryImage {
  src: string;
  name: string;
  isNew?: boolean;
}

interface DivisionGalleryProps {
  images: DivisionGalleryImage[];
}

const getVisibleColumns = () => {
  if (typeof window === 'undefined') return 4;
  if (window.matchMedia('(min-width: 1024px)').matches) return 3;
  if (window.matchMedia('(min-width: 640px)').matches) return 2;
  return 1;
};

const DivisionGallery = ({ images }: DivisionGalleryProps) => {
  const [index, setIndex] = useState(0);
  const [visibleCols, setVisibleCols] = useState<number>(() => getVisibleColumns());

  useEffect(() => {
    const onResize = () => setVisibleCols(getVisibleColumns());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Chunk into columns of 2 (top/bottom)
  const columns = useMemo(() => {
    const cols: DivisionGalleryImage[][] = [];
    for (let i = 0; i < images.length; i += 2) {
      cols.push(images.slice(i, i + 2));
    }
    return cols;
  }, [images]);

  const maxIndex = Math.max(0, columns.length - visibleCols);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const atStart = index === 0;
  const atEnd = index >= maxIndex;

  const colBasis = `${100 / visibleCols}%`;
  const translate = `translateX(-${(index * 100) / visibleCols}%)`;

  return (
    <div className="relative">
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

      <div className="overflow-hidden px-2 sm:px-6 lg:px-10">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: translate }}
        >
          {columns.map((col, ci) => (
            <div
              key={ci}
              className="shrink-0 px-2 sm:px-2.5 lg:px-3 flex flex-col gap-4"
              style={{ flexBasis: colBasis, maxWidth: colBasis }}
            >
              {col.map((img, i) => (
                <article
                  key={`${img.src}-${i}`}
                  className="relative bg-white border border-black/5 overflow-hidden group"
                >
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
                  <div className="p-3 text-center min-h-[56px] flex items-center justify-center">
                    <h3 className="text-sm font-semibold text-[#1A1A1A] line-clamp-2">
                      {img.name}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default DivisionGallery;
