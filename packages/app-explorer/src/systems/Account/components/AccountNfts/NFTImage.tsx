import { Skeleton } from '@fuels/ui';
import { IconFileOff } from '@fuels/ui';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { shortAddress } from '~portal/systems/Core';

interface NFTImageProps {
  assetId: string;
  image: string | undefined;
}

export const NFTImage = ({ assetId, image }: NFTImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const [fallback, setFallback] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (imgRef.current?.complete) {
      if (imgRef.current.naturalWidth) {
        setLoading(false);
        return;
      }

      setFallback(true);
    }
  }, []);

  if (image && !fallback) {
    return (
      <div className="relative aspect-square w-full overflow-hidden">
        {/* The skeleton sits under the image, which fades in over it once loaded. */}
        {isLoading && (
          <div className="absolute inset-0">
            <Skeleton width="100%" height="100%" />
          </div>
        )}
        <img
          className={clsx(
            'relative h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none',
            { 'opacity-0': isLoading },
          )}
          ref={imgRef}
          src={image}
          alt={shortAddress(assetId)}
          onLoad={() => setLoading(false)}
          onError={() => {
            setFallback(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-square w-[100%] items-center justify-center border border-[var(--fuel-border)]">
      <IconFileOff className="text-[var(--fuel-element-low-em)]" size={36} />
    </div>
  );
};
