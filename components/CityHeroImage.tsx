'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CityHeroImageProps {
  src: string;
  alt: string;
}

const CityHeroImage = ({ src, alt }: CityHeroImageProps) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? '/images/cities/default.jpg' : src}
      alt={alt}
      fill
      className="object-cover brightness-50"
      priority
      onError={() => setError(true)}
    />
  );
};

export default CityHeroImage; 