import React, { useState, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  fixedSize?: boolean;
}

const LazyImage = ({ src, alt, fixedSize }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setIsLoaded(true);
    };

    img.onerror = () => {
      setIsError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <>
      {src && fixedSize && isLoaded && (
        <img
          src={src}
          alt={alt}
          style={{ width: '10px', height: '10px', objectFit: 'cover' }}
        />
      )}
      {src && !fixedSize && isLoaded && (
        <img
          src={src}
          alt={alt}
          style={{ maxWidth: '10%', maxHeight: '10%' }}
        />
      )}
      {isError && <div>try a different png</div>}
    </>
  );
};

export default LazyImage;
