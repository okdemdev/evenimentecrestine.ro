'use client';

import Image from 'next/image';

interface CityHeroImageProps {
  src: string;
  alt: string;
}

const CityHeroImage = ({ src, alt }: CityHeroImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover brightness-50"
      priority
      onError={(e) => {
        // Fallback to default image if city image doesn't exist
        const target = e.target as HTMLImageElement;
        target.src = '/images/cities/default.jpg';
      }}
    />
  );
};

export default CityHeroImage; 