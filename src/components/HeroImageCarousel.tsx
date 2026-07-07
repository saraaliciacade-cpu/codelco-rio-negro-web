import { useEffect, useState } from 'react';

export interface HeroImageCarouselItem {
  src: string;
  alt: string;
  objectPosition?: string;
}

interface HeroImageCarouselProps {
  images: HeroImageCarouselItem[];
  intervalMs?: number;
  className?: string;
  imgClassName?: string;
}

const HeroImageCarousel = ({
  images,
  intervalMs = 5000,
  className = '',
  imgClassName = '',
}: HeroImageCarouselProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${imgClassName}`}
          style={{
            opacity: i === index ? 1 : 0,
            objectPosition: img.objectPosition,
          }}
        />
      ))}
    </div>
  );
};

export default HeroImageCarousel;
